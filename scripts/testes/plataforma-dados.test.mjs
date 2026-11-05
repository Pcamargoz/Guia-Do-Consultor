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

describe('window.Plataforma — roteador de hash', () => {
  it('lê as rotas do contrato', () => {
    const { Plataforma } = carregarPlataforma();
    const casos = {
      '': { area: 'inicio' }, '#inicio': { area: 'inicio' }, '#inicial': { area: 'inicial' }, '#inicial/vendas': { area: 'inicial', modulo: 'vendas' },
      '#consultor/fundamentos': { area: 'consultor', modulo: 'fundamentos' }, '#pacotes': { area: 'pacotes' }, '#checklist': { area: 'checklist' },
      '#videos': { area: 'videos' }, '#apostila': { area: 'apostila' }, '#admin': { area: 'admin' }, '#acervo': { area: 'acervo' },
      '#desconhecida': { area: 'inicio' }, '#inicial/<script>': { area: 'inicial' }, '#pacotes/vendas': { area: 'pacotes', secao: 'vendas' }, '#videos/a/b': { area: 'videos', secao: 'a' }, '#inicio/x': { area: 'inicio' }, '#%E0%A4%A': { area: 'inicio' },
    };
    for (const [hash, rota] of Object.entries(casos)) assert.deepEqual({ ...Plataforma.lerRota(hash) }, rota, hash);
  });
  it('rota inicial vem do hash e hashchange dispara plataforma:rota', () => {
    const { Plataforma, eventos, mudarHash } = carregarPlataforma({ hash: '#inicial/vendas' });
    assert.deepEqual({ ...Plataforma.rota }, { area: 'inicial', modulo: 'vendas' });
    mudarHash('#consultor/estoque');
    assert.deepEqual({ ...Plataforma.rota }, { area: 'consultor', modulo: 'estoque' });
    assert.equal(eventos.at(-1).type, 'plataforma:rota');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'consultor', modulo: 'estoque' });
  });
  it('irPara muda o hash (ou reemite a rota se já está nela)', () => {
    const { Plataforma, location, eventos } = carregarPlataforma({ hash: '#inicio' });
    Plataforma.irPara({ area: 'consultor', modulo: 'vendas' });
    assert.equal(location.hash, '#consultor/vendas');
    assert.equal(eventos.length, 0); // no navegador o hashchange é que dispara o evento
    Plataforma.irPara({ area: 'consultor', modulo: 'vendas' }); // já está nela: reemite
    assert.equal(eventos.at(-1).type, 'plataforma:rota');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'consultor', modulo: 'vendas' });
    Plataforma.irPara({ area: 'qualquer' });
    assert.equal(location.hash, '#inicio');
  });
});

describe('window.Plataforma — aliases de hash antigos (review v1, item 6)', () => {
  const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../public');
  const ler = (n) => readFileSync(path.join(PUBLIC, n), 'utf8');
  const { Plataforma } = carregarPlataforma();
  const rota = (h) => ({ ...Plataforma.lerRota(h) });

  it('abas do guia-abas.js: #guia (guia antigo) vai para o Acervo; as ferramentas continuam iguais', () => {
    assert.deepEqual(rota('#guia'), { area: 'acervo' });
    assert.deepEqual(rota('#GUIA'), { area: 'acervo' });
    for (const aba of ['pacotes', 'checklist', 'videos', 'apostila', 'admin']) assert.deepEqual(rota(`#${aba}`), { area: aba });
  });
  it('seções do guia antigo (index.html) abrem o Acervo na seção', () => {
    for (const id of ['dashboard', 'parte1', 'metodo', 'modulos', 'processos', 'diagnostico', 'conclusao']) {
      assert.deepEqual(rota(`#${id}`), { area: 'acervo', secao: id });
      assert.deepEqual(rota(`#acervo/${id}`), { area: 'acervo', secao: id });
    }
  });
  it('âncoras internas que já mudam o hash ficam na área dona (com a seção, sem cair no início)', () => {
    assert.deepEqual(rota('#pc-nome-42'), { area: 'pacotes', secao: 'pc-nome-42' });
    assert.deepEqual(rota('#pc-nome-Ab_9-x'), { area: 'pacotes', secao: 'pc-nome-Ab_9-x' });
    assert.deepEqual(rota('#ck-3'), { area: 'checklist', secao: 'ck-3' });
    for (const h of ['#pc-nome-', '#pc-nome-<x>', '#ck-x', '#ck-12345']) assert.deepEqual(rota(h), { area: 'inicio' }, h);
  });
  it('todo hash antigo encontrado em public/ resolve para uma área (nenhum cai no início por engano)', () => {
    const abas = [...ler('guia-abas.js').matchAll(/\{ id: '([a-z]+)', rotulo:/g)].map((m) => m[1]);
    const secoes = [...ler('index.html').matchAll(/scrollToSection\('([A-Za-z0-9_-]+)'/g)].map((m) => m[1]);
    const hrefs = [...ler('guia-videos.js').matchAll(/href="#([a-z-]+)"/g)].map((m) => m[1]);
    assert.deepEqual(abas, ['guia', 'pacotes', 'checklist', 'videos', 'apostila', 'admin']);
    assert.ok(secoes.length >= 7, secoes.join());
    for (const h of new Set([...abas, ...secoes, ...hrefs])) assert.notEqual(rota(`#${h}`).area, 'inicio', h);
    assert.deepEqual(Object.keys(Plataforma.ALIASES).sort(), ['conclusao', 'dashboard', 'diagnostico', 'guia', 'metodo', 'modulos', 'parte1', 'processos']);
  });
  it('chaves herdadas de Object não viram alias', () => {
    for (const h of ['#__proto__', '#constructor', '#hasOwnProperty', '#toString']) assert.deepEqual(rota(h), { area: 'inicio' }, h);
  });
  it('alias no carregamento e no hashchange dispara plataforma:rota com a rota nova', () => {
    const { Plataforma: P, eventos, mudarHash } = carregarPlataforma({ hash: '#guia' });
    assert.deepEqual({ ...P.rota }, { area: 'acervo' });
    mudarHash('#metodo');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'acervo', secao: 'metodo' });
    mudarHash('#pc-nome-7');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'pacotes', secao: 'pc-nome-7' });
  });
  it('irPara com seção monta o hash canônico', () => {
    const { Plataforma: P, location } = carregarPlataforma({ hash: '' });
    P.irPara({ area: 'acervo', secao: 'metodo' });
    assert.equal(location.hash, '#acervo/metodo');
    P.irPara({ area: 'acervo', secao: '<script>' });
    assert.equal(location.hash, '#acervo');
  });
});

describe('window.Plataforma — roteador usa o perfil de visibilidade (v3, item 2)', () => {
  // Mapas efetivos como o GET /api/visibilidade devolve com os valores iniciais do doc 04.
  const MAPA = { estagiario: mapaEfetivo(VALORES_INICIAIS, 'estagiario'), consultor: mapaEfetivo(VALORES_INICIAIS, 'consultor'), admin: mapaEfetivo(VALORES_INICIAIS, 'admin') };

  it('estagiário: #guia vai para o início, sem mensagem de erro, sem entrada nova no histórico', async () => {
    assert.equal(MAPA.estagiario['area:acervo'], false);
    const { fetch } = comFetch([resposta(200, { itens: MAPA.estagiario })]);
    const { Plataforma, eventos, location, history } = carregarPlataforma({ hash: '#guia', fetch });
    assert.deepEqual({ ...Plataforma.rota }, { area: 'acervo' }); // antes do perfil chegar o roteador não filtra
    const r = await Plataforma.visibilidade();
    assert.equal(r.erro, undefined);
    assert.deepEqual({ ...Plataforma.rota }, { area: 'inicio' });
    assert.equal(eventos.at(-1).type, 'plataforma:rota');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'inicio' });
    assert.ok(!('erro' in eventos.at(-1).detail) && !('mensagem' in eventos.at(-1).detail));
    assert.deepEqual(history.chamadas, ['#inicio']);
    assert.equal(location.hash, '#inicio');
  });
  it('estagiário: seções do guia antigo, #acervo e a apostila (oculta) também vão ao início; o resto abre', () => {
    const { Plataforma } = carregarPlataforma();
    Plataforma.aplicarVisibilidade(MAPA.estagiario);
    for (const h of ['#guia', '#metodo', '#acervo', '#acervo/metodo', '#apostila']) assert.deepEqual({ ...Plataforma.lerRota(h) }, { area: 'inicio' }, h);
    assert.deepEqual({ ...Plataforma.lerRota('#inicial/vendas') }, { area: 'inicial', modulo: 'vendas' });
    assert.deepEqual({ ...Plataforma.lerRota('#pc-nome-3') }, { area: 'pacotes', secao: 'pc-nome-3' });
    Plataforma.irPara({ area: 'acervo', secao: 'metodo' });
    assert.deepEqual({ ...Plataforma.rota }, { area: 'inicio' });
  });
  it('estagiário: hashchange para #guia depois do perfil carregado emite início', () => {
    const { Plataforma, eventos, mudarHash } = carregarPlataforma({ hash: '#inicio' });
    Plataforma.aplicarVisibilidade(MAPA.estagiario);
    assert.equal(eventos.length, 0); // rota não mudou: nada a emitir
    mudarHash('#guia');
    assert.deepEqual({ ...eventos.at(-1).detail }, { area: 'inicio' });
  });
  it('consultor e admin: #guia continua abrindo o Acervo', () => {
    for (const papel of ['consultor', 'admin']) {
      const { Plataforma, history } = carregarPlataforma({ hash: '#guia' });
      Plataforma.aplicarVisibilidade(MAPA[papel]);
      assert.deepEqual({ ...Plataforma.rota }, { area: 'acervo' }, papel);
      assert.deepEqual(history.chamadas, [], papel);
    }
  });
  it('chave ausente no mapa = área fechada; mapa inválido e lista de admin (?todos=1) não mexem no roteador', async () => {
    const { Plataforma } = carregarPlataforma();
    Plataforma.aplicarVisibilidade(null);
    Plataforma.aplicarVisibilidade(['area:acervo']);
    assert.deepEqual({ ...Plataforma.lerRota('#acervo') }, { area: 'acervo' });
    Plataforma.aplicarVisibilidade({ 'area:acervo': 'sim' });
    assert.deepEqual({ ...Plataforma.lerRota('#acervo') }, { area: 'inicio' });
    assert.deepEqual({ ...Plataforma.lerRota('#admin') }, { area: 'admin' }); // admin não tem chave: protegido pelo servidor
    const { fetch } = comFetch([resposta(200, [{ chave: 'area:acervo', visivel: false, perfis: [] }])]);
    const outra = carregarPlataforma({ fetch }).Plataforma;
    await outra.visibilidade({ todos: true });
    assert.deepEqual({ ...outra.lerRota('#acervo') }, { area: 'acervo' });
  });
});
