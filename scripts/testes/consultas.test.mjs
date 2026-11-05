/* Respostas de /api/conteudo filtradas por perfil (contrato §1), com a base fictícia. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { montarBase } from '../../lib/conteudo/montar.js';
import { COR_PADRAO, montarDetalhe, montarResumo } from '../../lib/conteudo/consultas.js';
import { validarDetalhe, validarResumo } from '../../lib/conteudo/contrato.js';
import { guiaFicticio, harnessFicticio, MAPA_FICTICIO, VERSAO_FICTICIA } from './fixtures/fontes-ficticias.mjs';

const base = montarBase({ harness: harnessFicticio(), guia: guiaFicticio(), versao: VERSAO_FICTICIA, mapa: MAPA_FICTICIO });
const so = (chave, perfis) => [{ chave, visivel: true, perfis }];
const oculto = (chave) => [{ chave, visivel: false, perfis: ['estagiario', 'consultor'] }];

describe('montarResumo', () => {
  it('admin vê tudo, em ordem, e o campo interno "modulo" não vaza', () => {
    const r = montarResumo(base, { papel: 'admin', itens: [] });
    assert.deepEqual(r.modulos.map((m) => m.id), ['vendas', 'estoque', 'relatorios']);
    assert.equal(r.versao, VERSAO_FICTICIA);
    for (const m of r.modulos) for (const x of m.materiais) assert.equal('modulo' in x, false);
    assert.deepEqual(validarResumo(r, { admin: true }), []);
  });
  it('não-admin não recebe módulo oculto; admin recebe com oculto=true', () => {
    const itens = oculto('modulo:estoque');
    assert.equal(montarResumo(base, { papel: 'consultor', itens }).modulos.some((m) => m.id === 'estoque'), false);
    assert.equal(montarResumo(base, { papel: 'admin', itens }).modulos.find((m) => m.id === 'estoque').oculto, true);
  });
  it('módulo restrito a consultor some só para estagiário', () => {
    const itens = so('modulo:estoque', ['consultor']);
    assert.equal(montarResumo(base, { papel: 'estagiario', itens }).modulos.some((m) => m.id === 'estoque'), false);
    assert.equal(montarResumo(base, { papel: 'consultor', itens }).modulos.some((m) => m.id === 'estoque'), true);
    assert.equal(montarResumo(base, { papel: 'admin', itens }).modulos.find((m) => m.id === 'estoque').oculto, false);
  });
  it('tipo oculto remove os materiais daquele tipo', () => {
    const r = montarResumo(base, { papel: 'estagiario', itens: oculto('tipo:video') });
    assert.equal(r.modulos.flatMap((m) => m.materiais).some((x) => x.tipo === 'video'), false);
    assert.deepEqual(validarResumo(r, { admin: false }), []);
  });
  it('área do consultor oculta remove materiais da jornada consultor', () => {
    const r = montarResumo(base, { papel: 'estagiario', itens: so('area:guia-consultor', ['consultor']) });
    assert.equal(r.modulos.flatMap((m) => m.materiais).some((x) => x.jornada === 'consultor'), false);
  });
  it('módulo sem material disponível = em-preparacao; cor/ícone com padrão quando o seed não tem', () => {
    const r = montarResumo(base, { papel: 'admin', itens: [] });
    assert.equal(r.modulos.find((m) => m.id === 'relatorios').status, 'em-preparacao');
    assert.equal(r.modulos.find((m) => m.id === 'vendas').status, 'disponivel');
    const semSeed = montarResumo({ ...base, modulos: base.modulos.map((m) => ({ ...m, cor: null, icone: null })) }, { papel: 'admin', itens: [] });
    assert.equal(semSeed.modulos[0].cor, COR_PADRAO);
    assert.equal(semSeed.modulos[0].icone, 'vendas');
  });
  it('todos os módulos ocultos → lista vazia (válida)', () => {
    const itens = ['vendas', 'estoque', 'relatorios'].flatMap((id) => oculto(`modulo:${id}`));
    const r = montarResumo(base, { papel: 'estagiario', itens });
    assert.deepEqual(r.modulos, []);
    assert.deepEqual(validarResumo(r, { admin: false }), []);
  });
});

describe('montarDetalhe', () => {
  it('400 jornada inválida, 404 módulo inexistente, 403 módulo ou área oculta', () => {
    assert.equal(montarDetalhe(base, { modulo: 'vendas', jornada: 'x', papel: 'admin' }).status, 400);
    assert.equal(montarDetalhe(base, { modulo: 'nao-existe', jornada: 'inicial', papel: 'admin' }).status, 404);
    assert.equal(montarDetalhe(base, { modulo: 'vendas', jornada: 'inicial', papel: 'estagiario', itens: oculto('modulo:vendas') }).status, 403);
    assert.equal(montarDetalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'estagiario', itens: so('area:guia-consultor', ['consultor']) }).status, 403);
    assert.equal(montarDetalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'admin', itens: oculto('modulo:vendas') }).status, 200);
  });
  it('Guia Inicial tem 8 seções e Guia do Consultor 10, válidas no contrato', () => {
    for (const [jornada, n] of [['inicial', 8], ['consultor', 10]]) {
      for (const modulo of ['vendas', 'estoque', 'relatorios']) {
        const r = montarDetalhe(base, { modulo, jornada, papel: 'admin' });
        assert.equal(r.corpo.secoes.length, n);
        assert.deepEqual(validarDetalhe(r.corpo), [], `${modulo}/${jornada}`);
      }
    }
  });
  it('tipo oculto tira o bloco e a seção vazia vira em-preparacao', () => {
    const r = montarDetalhe(base, { modulo: 'vendas', jornada: 'inicial', papel: 'estagiario', itens: oculto('tipo:video') }).corpo;
    const video = r.secoes.find((s) => s.id === 'video');
    assert.equal(video.status, 'em-preparacao');
    assert.deepEqual(video.blocos, []);
    assert.equal(r.secoes.flatMap((s) => s.blocos).some((b) => b.tipo === 'video'), false);
  });
  it('link da apostila só aparece quando area:apostila está visível para o perfil', () => {
    const temApostila = (corpo) => corpo.secoes.flatMap((s) => s.blocos).some((b) => b.visibilidade === 'area:apostila');
    assert.equal(temApostila(montarDetalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'consultor' }).corpo), false);
    assert.equal(temApostila(montarDetalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'admin' }).corpo), true);
    assert.equal(temApostila(montarDetalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'consultor', itens: so('area:apostila', ['consultor']) }).corpo), true);
  });
  it('não altera a base (função pura)', () => {
    const antes = JSON.stringify(base);
    montarDetalhe(base, { modulo: 'vendas', jornada: 'inicial', papel: 'estagiario', itens: oculto('tipo:video') });
    montarResumo(base, { papel: 'estagiario', itens: oculto('tipo:checklist') });
    assert.equal(JSON.stringify(base), antes);
  });
});
