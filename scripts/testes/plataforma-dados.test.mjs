/* public/plataforma-dados.js (contrato §3) num vm com window/fetch de mentira. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
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
      '#desconhecida': { area: 'inicio' }, '#inicial/<script>': { area: 'inicial' }, '#pacotes/vendas': { area: 'pacotes' }, '#%E0%A4%A': { area: 'inicio' },
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
