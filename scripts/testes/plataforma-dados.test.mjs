/* public/plataforma-dados.js (contrato §3) num vm com window/fetch de mentira. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import { mapaEfetivo, VALORES_INICIAIS } from '../../lib/visibilidade.js';
import { carregarPlataforma } from './apoio/carregar-plataforma.mjs';

const resposta = (status, corpo) => ({ ok: status >= 200 && status < 300, status, json: async () => corpo });

function comFetch(respostas) {
  const chamadas = [];
  const fetch = async (url, opcoes) => { chamadas.push({ url, ...opcoes }); const r = respostas.shift(); if (r instanceof Error) throw r; return r; };
  return { chamadas, fetch };
}

describe('window.Plataforma — dados', () => {
  it('carregarResumo devolve o corpo da API', async () => {
    const { chamadas, fetch } = comFetch([resposta(200, { versao: '2026-11-04', modulos: [] })]);
    const { Plataforma } = carregarPlataforma({ fetch });
    assert.deepEqual(await Plataforma.carregarResumo(), { versao: '2026-11-04', modulos: [] });
    assert.equal(chamadas[0].url, '/api/conteudo');
    assert.equal(chamadas[0].credentials, 'same-origin');
  });
  it('carregarModulo monta a URL e valida a entrada sem ir à rede', async () => {
    const { chamadas, fetch } = comFetch([resposta(200, { modulo: {}, jornada: 'inicial', secoes: [] })]);
    const { Plataforma } = carregarPlataforma({ fetch });
    await Plataforma.carregarModulo('vendas', 'inicial');
    assert.equal(chamadas[0].url, '/api/conteudo?modulo=vendas&jornada=inicial');
    assert.deepEqual({ ...(await Plataforma.carregarModulo('../x', 'inicial')).erro }, { status: 400, mensagem: 'Módulo ou jornada inválidos.' });
    assert.equal((await Plataforma.carregarModulo('vendas', 'outra')).erro.status, 400);
    assert.equal(chamadas.length, 1);
  });
  it('erro HTTP vira { erro: { status, mensagem } } com a mensagem da API', async () => {
    const { fetch } = comFetch([resposta(403, { erro: 'Este conteúdo não está disponível para o seu perfil.' }), resposta(500, null)]);
    const { Plataforma } = carregarPlataforma({ fetch });
    assert.deepEqual({ ...(await Plataforma.carregarModulo('estoque', 'inicial')).erro }, { status: 403, mensagem: 'Este conteúdo não está disponível para o seu perfil.' });
    const r = await Plataforma.carregarResumo();
    assert.equal(r.erro.status, 500);
    assert.match(r.erro.mensagem, /500/);
  });
  it('falha de rede vira status 0 e nunca rejeita', async () => {
    const { fetch } = comFetch([new Error('offline')]);
    const { Plataforma } = carregarPlataforma({ fetch });
    assert.equal((await Plataforma.visibilidade()).erro.status, 0);
  });
  it('401 chama ffIrParaLogin', async () => {
    let chamado = 0;
    const { fetch } = comFetch([resposta(401, { erro: 'Faça login.' })]);
    const { Plataforma } = carregarPlataforma({ fetch, ffIrParaLogin: () => { chamado += 1; return 'redirecionando'; } });
    assert.equal(await Plataforma.carregarResumo(), 'redirecionando');
    assert.equal(chamado, 1);
  });
  it('visibilidade({ todos: true }) e salvarVisibilidade (PUT só com chave, visivel, perfis)', async () => {
    const { chamadas, fetch } = comFetch([resposta(200, []), resposta(200, { chave: 'area:apostila' })]);
    const { Plataforma } = carregarPlataforma({ fetch });
    await Plataforma.visibilidade({ todos: true });
    await Plataforma.salvarVisibilidade({ chave: 'area:apostila', visivel: true, perfis: ['consultor'], atualizado_por_nome: 'Admin Exemplo' });
    assert.equal(chamadas[0].url, '/api/visibilidade?todos=1');
    assert.equal(chamadas[1].method, 'PUT');
    assert.deepEqual(JSON.parse(chamadas[1].body), { chave: 'area:apostila', visivel: true, perfis: ['consultor'] });
    assert.equal(chamadas[1].headers['Content-Type'], 'application/json');
    assert.equal((await Plataforma.salvarVisibilidade(null)).erro.status, 400);
  });
});

describe('window.Plataforma — roteador da Metodologia, sem rota no endereço (doc 14)', () => {
  it('lê as rotas novas e leva as antigas ao equivalente', () => {
    const { Plataforma } = carregarPlataforma();
    const casos = {
      '': { area: 'metodologia' }, '#metodologia': { area: 'metodologia' }, '#metodologia/vendas': { area: 'metodologia', modulo: 'vendas' },
      '#manuais': { area: 'manuais' }, '#manuais/crm': { area: 'manuais', modulo: 'crm' }, '#videos/estoque': { area: 'videos', modulo: 'estoque' },
      '#metodologia-ff': { area: 'metodologia-ff' }, '#metodologia-ff/treinamentos': { area: 'metodologia-ff', secao: 'treinamentos' },
      '#pacotes': { area: 'pacotes' }, '#pacotes/vendas': { area: 'pacotes', secao: 'vendas' }, '#admin': { area: 'admin' },
      '#inicio': { area: 'metodologia' }, '#inicio/x': { area: 'metodologia', modulo: 'x' }, '#inicial/vendas': { area: 'metodologia', modulo: 'vendas' },
      '#consultor/estoque': { area: 'metodologia', modulo: 'estoque' }, '#checklist': { area: 'metodologia' },
      '#acervo': { area: 'metodologia-ff' }, '#acervo/metodo': { area: 'metodologia-ff' }, '#apostila': { area: 'metodologia-ff' },
      '#consultor/fundamentos': { area: 'metodologia-ff' }, '#Consultor/Fundamentos': { area: 'metodologia-ff' },
      '#desconhecida': { area: 'metodologia' }, '#metodologia/<script>': { area: 'metodologia' }, '#%E0%A4%A': { area: 'metodologia' },
    };
    for (const [hash, rota] of Object.entries(casos)) assert.deepEqual({ ...Plataforma.lerRota(hash) }, rota, hash);
  });
  it('endereço antigo com # abre a tela certa e o endereço fica limpo', () => {
    const { Plataforma, history, location } = carregarPlataforma({ hash: '#inicial/vendas' });
    assert.deepEqual({ ...Plataforma.rota }, { area: 'metodologia', modulo: 'vendas' });
    assert.deepEqual(history.chamadas, [['replace', '/']]);
    assert.equal(location.hash, '');
    assert.deepEqual({ ...history.state.ffRota }, { area: 'metodologia', modulo: 'vendas' });
  });
  it('irPara grava a rota no histórico, nunca no endereço, e emite plataforma:rota', () => {
    const { Plataforma, history, location, eventos } = carregarPlataforma();
    Plataforma.irPara({ area: 'manuais', modulo: 'estoque' });
    assert.deepEqual(history.chamadas.at(-1), ['push', '/']);
    assert.equal(location.hash, '');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'manuais', modulo: 'estoque' });
    const antes = history.chamadas.length;
    Plataforma.irPara({ area: 'manuais', modulo: 'estoque' });
    assert.equal(history.chamadas.length, antes);
    assert.equal(eventos.at(-1).type, 'plataforma:rota');
    Plataforma.irPara({ area: 'qualquer' });
    assert.deepEqual({ ...Plataforma.rota }, { area: 'metodologia' });
  });
  it('voltar do navegador (popstate) volta à rota anterior', () => {
    const { Plataforma, voltar, eventos } = carregarPlataforma();
    Plataforma.irPara({ area: 'videos' });
    Plataforma.irPara({ area: 'videos', modulo: 'crm' });
    voltar();
    assert.deepEqual({ ...Plataforma.rota }, { area: 'videos' });
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'videos' });
  });
  it('link interno com # vira rota e o endereço é limpo', () => {
    const { Plataforma, mudarHash, location } = carregarPlataforma();
    mudarHash('#manuais/crm');
    assert.deepEqual({ ...Plataforma.rota }, { area: 'manuais', modulo: 'crm' });
    assert.equal(location.hash, '');
  });
  it('âncoras antigas e chaves herdadas de Object', () => {
    const { Plataforma } = carregarPlataforma();
    const rota = (h) => ({ ...Plataforma.lerRota(h) });
    assert.deepEqual(rota('#pc-nome-42'), { area: 'pacotes', secao: 'pc-nome-42' });
    assert.deepEqual(rota('#ck-3'), { area: 'metodologia', secao: 'ck-3' });
    for (const h of ['#__proto__', '#constructor', '#hasOwnProperty', '#toString', '#ck-x']) assert.deepEqual(rota(h), { area: 'metodologia' }, h);
    for (const id of ['guia', 'dashboard', 'parte1', 'metodo', 'modulos', 'processos', 'diagnostico', 'conclusao']) assert.deepEqual(rota(`#${id}`), { area: 'metodologia-ff' }, id);
  });
  it('toda aba do guia-abas.js é uma área do roteador', () => {
    const abas = [...readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../public/guia-abas.js'), 'utf8').matchAll(/\{ id: '([a-z-]+)', rotulo:/g)].map((m) => m[1]);
    assert.deepEqual(abas, ['metodologia', 'manuais', 'videos', 'metodologia-ff', 'pacotes', 'admin']);
    const { Plataforma } = carregarPlataforma();
    for (const a of abas) assert.equal(Plataforma.lerRota(`#${a}`).area, a);
  });
});

describe('window.Plataforma — roteador usa o perfil de visibilidade', () => {
  const MAPA = { estagiario: mapaEfetivo(VALORES_INICIAIS, 'estagiario') };
  it('área oculta leva à primeira área liberada, sem entrada nova no histórico', async () => {
    const mapa = { ...MAPA.estagiario, 'area:manuais': false };
    const { fetch } = comFetch([resposta(200, { itens: mapa })]);
    const { Plataforma, history, eventos } = carregarPlataforma({ hash: '#manuais/crm', fetch });
    assert.deepEqual({ ...Plataforma.rota }, { area: 'manuais', modulo: 'crm' });
    await Plataforma.visibilidade();
    assert.deepEqual({ ...Plataforma.rota }, { area: 'metodologia' });
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'metodologia' });
    assert.ok(history.chamadas.every(([tipo]) => tipo === 'replace'));
  });
  it('metodologia oculta: vai para a próxima área liberada', () => {
    const { Plataforma } = carregarPlataforma();
    Plataforma.aplicarVisibilidade({ ...MAPA.estagiario, 'area:metodologia': false });
    assert.deepEqual({ ...Plataforma.lerRota('#metodologia/crm') }, { area: 'manuais' });
  });
  it('chave ausente no mapa = área fechada; admin não tem chave', () => {
    const { Plataforma } = carregarPlataforma();
    Plataforma.aplicarVisibilidade({ 'area:metodologia': true });
    assert.deepEqual({ ...Plataforma.lerRota('#videos') }, { area: 'metodologia' });
    assert.deepEqual({ ...Plataforma.lerRota('#admin') }, { area: 'admin' });
  });
});

describe('window.Plataforma — plataforma:abrir e cache do resumo (v3.4)', () => {
  it('escuta plataforma:abrir, chama irPara e dá preventDefault (a UI não navega de novo)', () => {
    const { Plataforma, emitir } = carregarPlataforma();
    const { ev, seguir } = emitir('plataforma:abrir', { modulo: 'vendas', area: 'metodologia' }, true);
    assert.equal(seguir, false);
    assert.equal(ev.defaultPrevented, true);
    assert.deepEqual({ ...Plataforma.rota }, { area: 'metodologia', modulo: 'vendas' });
  });
  it('plataforma:abrir sem jornada/área é ignorado', () => {
    const { Plataforma, emitir } = carregarPlataforma({ hash: '#manuais' });
    const { seguir } = emitir('plataforma:abrir', { modulo: 'vendas' }, true);
    assert.equal(seguir, false); // ainda preventDefault
    assert.deepEqual({ ...Plataforma.rota }, { area: 'manuais' });
  });
  it('carregarResumo reutiliza o cache; salvarVisibilidade invalida', async () => {
    const corpo = { versao: '2026-11-04', modulos: [{ id: 'vendas' }] };
    const { chamadas, fetch } = comFetch([
      resposta(200, corpo),
      resposta(200, { chave: 'area:apostila', visivel: true, perfis: ['consultor'] }),
      resposta(200, { versao: '2026-11-04', modulos: [] }),
    ]);
    const { Plataforma } = carregarPlataforma({ fetch });
    const a = await Plataforma.carregarResumo();
    const b = await Plataforma.carregarResumo();
    assert.equal(a, b);
    assert.equal(chamadas.filter((c) => c.url === '/api/conteudo').length, 1);
    await Plataforma.salvarVisibilidade({ chave: 'area:apostila', visivel: true, perfis: ['consultor'] });
    const c = await Plataforma.carregarResumo();
    assert.deepEqual(c, { versao: '2026-11-04', modulos: [] });
    assert.equal(chamadas.filter((c) => c.url === '/api/conteudo').length, 2);
  });
  it('invalidarResumo() descarta o cache sem ir à rede', async () => {
    const { chamadas, fetch } = comFetch([
      resposta(200, { versao: 'a', modulos: [] }),
      resposta(200, { versao: 'b', modulos: [] }),
    ]);
    const { Plataforma } = carregarPlataforma({ fetch });
    await Plataforma.carregarResumo();
    Plataforma.invalidarResumo();
    const r = await Plataforma.carregarResumo();
    assert.equal(r.versao, 'b');
    assert.equal(chamadas.length, 2);
  });
});
