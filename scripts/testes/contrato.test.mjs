/* Validadores do contrato (v1 + ajustes da v2: texto em trechos, sem HTML, href seguro) e os JSON de exemplo
   (dados fictícios) entregues ao UI/UX. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validarDetalhe, validarItemAdmin, validarListaAdmin, validarMaterial, validarResumo, validarVisibilidadeEfetiva } from '../../lib/conteudo/contrato.js';
import { hrefSeguro, paraInline, textoPuro, validarInline } from '../../lib/conteudo/texto-inline.js';
import { montarExemplos } from '../gerar-exemplos-conteudo.mjs';

const ex = montarExemplos();
const materialOk = { id: 'vendas:video-inicial', tipo: 'video', jornada: 'inicial', titulo: 'Vídeo (fictício)', status: 'disponivel', url: '/videos/x.mp4', duracao_s: 60, fontes: ['guia:x'] };

describe('exemplos fictícios respeitam o contrato', () => {
  for (const nome of ['resumo-admin', 'resumo-consultor', 'resumo-estagiario', 'resumo-estagiario-sem-videos', 'resumo-vazio']) {
    it(nome, () => assert.deepEqual(validarResumo(ex[nome], { admin: nome === 'resumo-admin' }), []));
  }
  for (const nome of Object.keys(ex).filter((n) => n.startsWith('modulo-'))) {
    it(nome, () => assert.deepEqual(validarDetalhe(ex[nome]), []));
  }
  for (const nome of ['visibilidade-estagiario', 'visibilidade-consultor', 'visibilidade-admin']) {
    it(nome, () => assert.deepEqual(validarVisibilidadeEfetiva(ex[nome]), []));
  }
  it('visibilidade-todos-admin', () => assert.deepEqual(validarListaAdmin(ex['visibilidade-todos-admin']), []));
  it('visibilidade-put-200', () => assert.deepEqual(validarItemAdmin(ex['visibilidade-put-200']), []));
  it('erros na forma { erro: { status, mensagem } }', () => {
    for (const [nome, status] of [['erro-403-modulo-oculto', 403], ['erro-404-modulo-inexistente', 404], ['erro-400-jornada-invalida', 400], ['erro-0-sem-conexao', 0], ['visibilidade-put-400', 400], ['visibilidade-put-403', 403]]) {
      assert.equal(ex[nome].erro.status, status, nome);
      assert.equal(typeof ex[nome].erro.mensagem, 'string', nome);
    }
  });
  it('cobrem os casos de visibilidade', () => {
    assert.ok(ex['resumo-admin'].modulos.some((m) => m.oculto === true), 'admin vê módulo oculto marcado');
    assert.equal(ex['resumo-estagiario'].modulos.some((m) => m.id === 'estoque'), false);
    assert.equal(ex['resumo-consultor'].modulos.some((m) => m.id === 'estoque'), true);
    assert.equal(ex['resumo-estagiario-sem-videos'].modulos.flatMap((m) => m.materiais).some((x) => x.tipo === 'video'), false);
    assert.deepEqual(ex['resumo-vazio'].modulos, []);
    assert.equal(ex['visibilidade-estagiario'].itens['area:apostila'], false);
    assert.equal(ex['visibilidade-admin'].itens['area:apostila'], true);
    assert.ok(ex['modulo-relatorios-inicial-admin'].secoes.every((s) => s.status === 'em-preparacao'));
  });
  it('dados fictícios: todo texto de conteúdo é marcado "(fictício)" ou é rótulo fixo', () => {
    const titulos = ex['resumo-admin'].modulos.flatMap((m) => m.materiais).filter((x) => x.status === 'disponivel').map((x) => x.titulo);
    assert.ok(titulos.every((t) => /fictício/.test(t) || ['Principais telas', 'Regras de negócio'].includes(t)), titulos.join(' | '));
  });
});

describe('validadores recusam o que está fora do contrato', () => {
  it('material', () => {
    assert.deepEqual(validarMaterial(materialOk), []);
    assert.ok(validarMaterial({ ...materialOk, extra: 1 }).some((e) => e.includes('fora do contrato')));
    assert.ok(validarMaterial({ ...materialOk, modulo: 'vendas' }).length > 0);
    assert.ok(validarMaterial({ ...materialOk, tipo: 'podcast' }).length > 0);
    assert.ok(validarMaterial({ ...materialOk, fontes: [] }).some((e) => e.includes('sem fonte')));
    assert.ok(validarMaterial({ ...materialOk, url: null }).some((e) => e.includes('sem url')));
    assert.ok(validarMaterial({ ...materialOk, status: 'em-preparacao' }).some((e) => e.includes('url null')));
    assert.ok(validarMaterial({ ...materialOk, tipo: 'checklist' }).some((e) => e.includes('só vídeo')));
    assert.ok(validarMaterial({ ...materialOk, duracao_s: 1.5 }).length > 0);
  });
  it('resumo', () => {
    const modulo = { id: 'vendas', ordem: 1, titulo: 'Vendas', subtitulo: null, cor: '#123456', icone: 'vendas', status: 'disponivel', oculto: false, materiais: [materialOk] };
    assert.deepEqual(validarResumo({ versao: '2026-11-04', modulos: [modulo] }), []);
    assert.ok(validarResumo({ versao: '2026-11-04', modulos: [modulo, modulo] }).some((e) => e.includes('repetido')));
    assert.ok(validarResumo({ versao: '2026-11-04', modulos: [{ ...modulo, cor: 'azul' }] }).length > 0);
    assert.ok(validarResumo({ versao: '2026-11-04', modulos: [{ ...modulo, oculto: true }] }, { admin: false }).some((e) => e.includes('só admin')));
    assert.ok(validarResumo({ modulos: [] }).length > 0);
  });
  it('detalhe', () => {
    const secao = { id: 'a', titulo: 'A', status: 'disponivel', blocos: [{ tipo: 'texto', texto: [{ t: 'x' }], fontes: ['guia:x'] }], fontes: ['guia:x'] };
    const d = { modulo: { id: 'vendas', titulo: 'Vendas' }, jornada: 'consultor', secoes: Array(10).fill(secao) };
    assert.deepEqual(validarDetalhe(d), []);
    assert.ok(validarDetalhe({ ...d, secoes: d.secoes.slice(0, 9) }).some((e) => e.includes('10')));
    assert.ok(validarDetalhe({ ...d, jornada: 'outra' }).length > 0);
    assert.ok(validarDetalhe({ ...d, secoes: [...Array(9).fill(secao), { ...secao, blocos: [] }] }).some((e) => e.includes('sem blocos')));
    assert.ok(validarDetalhe({ ...d, secoes: [...Array(9).fill(secao), { ...secao, blocos: [{ tipo: 'texto', fontes: [] }] }] }).some((e) => e.includes('sem fonte')));
  });
  it('visibilidade', () => {
    assert.ok(validarVisibilidadeEfetiva({ itens: { 'area:x': 'sim' } }).length > 0);
    assert.ok(validarVisibilidadeEfetiva({ itens: { qualquer: true } }).length > 0);
    assert.ok(validarItemAdmin({ chave: 'area:apostila', visivel: true, perfis: ['admin'], atualizado_por_nome: null, atualizado_em: null }).length > 0);
    assert.ok(validarItemAdmin({ chave: 'area:apostila', visivel: true, perfis: [], atualizado_por_nome: null, atualizado_em: 'ontem' }).length > 0);
    assert.deepEqual(validarListaAdmin('x'), ['lista: deveria ser array']);
  });
});

describe('texto em trechos [{ t, marca?, href? }]: nenhum HTML vem dos dados (review v1, item 4)', () => {
  const secaoCom = (bloco) => ({ modulo: { id: 'vendas', titulo: 'Vendas' }, jornada: 'consultor', secoes: Array(10).fill({ id: 'a', titulo: 'A', status: 'disponivel', blocos: [{ fontes: ['guia:x'], ...bloco }], fontes: ['guia:x'] }) });
  it('aceita texto normal, negrito, itálico e link seguro', () => {
    assert.deepEqual(validarInline([{ t: 'Abra ' }, { t: 'Vendas', marca: 'negrito' }, { t: ' e ' }, { t: 'veja', marca: 'italico' }, { t: ' o vídeo', marca: 'link', href: '/videos/x.mp4' }], 'x'), []);
    assert.deepEqual(validarInline([{ t: 'rota', marca: 'link', href: '#inicial/vendas' }, { t: 'site', marca: 'link', href: 'https://faktory.com.br/ajuda' }], 'x'), []);
  });
  it('recusa HTML ou script em t (inclusive disfarçado)', () => {
    for (const t of ['<script>alert(1)</script>', '<img src=x onerror=alert(1)>', 'a <b>negrito</b>', '<!-- x -->', '&lt;script&gt;', '&#60;script&#62;', 'x\u0000y', '**sobrou markdown**', 'crase `x`', '[link](/x)']) {
      assert.ok(validarInline([{ t }], 'x').length > 0, t);
    }
  });
  it('recusa href inseguro e href fora de link', () => {
    for (const href of ['javascript:alert(1)', 'JavaScript:alert(1)', ' javascript:alert(1)', 'java\tscript:alert(1)', 'jav&#x61;script:alert(1)', 'data:text/html,<script>alert(1)</script>', 'vbscript:msgbox(1)', 'http://inseguro.com', '//outro-site.com', '/\\outro-site.com', 'https://usuario:senha@site.com', 'file:///etc/passwd', '', null]) {
      assert.equal(hrefSeguro(href), false, String(href));
      assert.ok(validarInline([{ t: 'x', marca: 'link', href }], 'x').some((e) => e.includes('href')), String(href));
    }
    assert.ok(validarInline([{ t: 'x', href: '/ok' }], 'x').some((e) => e.includes('só com marca')));
    assert.ok(validarInline([{ t: 'x', marca: 'sublinhado' }], 'x').some((e) => e.includes('marca')));
    assert.ok(validarInline([{ t: 'x', html: '<b>' }], 'x').some((e) => e.includes('fora do contrato')));
    assert.ok(validarInline('texto solto', 'x').length > 0);
    assert.ok(validarInline([], 'x').length > 0);
  });
  it('validarDetalhe aplica as regras em todo bloco, item e passo', () => {
    assert.deepEqual(validarDetalhe(secaoCom({ tipo: 'texto', rotulo: 'Objetivo', texto: [{ t: 'ok' }] })), []);
    assert.ok(validarDetalhe(secaoCom({ tipo: 'texto', texto: 'string crua' })).some((e) => e.includes('trechos')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'texto', texto: [{ t: '<script>alert(1)</script>' }] })).some((e) => e.includes('HTML')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'texto', rotulo: '<b>x</b>', texto: [{ t: 'ok' }] })).some((e) => e.includes('rotulo')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'lista', itens: [{ texto: [{ t: 'a', marca: 'link', href: 'javascript:alert(1)' }] }] })).some((e) => e.includes('href')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'passos', passos: [{ texto: [{ t: 'ok' }], nota: [{ t: '<iframe>' }] }] })).some((e) => e.includes('nota')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'link', titulo: 'x', url: 'javascript:alert(1)' })).some((e) => e.includes('url')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'video', titulo: 'x', url: '/v.mp4', legenda: 'javascript:x' })).some((e) => e.includes('legenda')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'fluxo', etapas: ['ok', '<b>'] })).some((e) => e.includes('etapas')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'html', texto: [{ t: 'x' }] })).some((e) => e.includes('tipo')));
  });
  it('validarMaterial recusa url insegura e título com HTML', () => {
    assert.ok(validarMaterial({ ...materialOk, url: 'javascript:alert(1)' }).some((e) => e.includes('insegura')));
    assert.ok(validarMaterial({ ...materialOk, titulo: '<img src=x onerror=alert(1)>' }).some((e) => e.includes('HTML')));
  });
  it('conversor: Markdown leve → trechos; nada de HTML passa', () => {
    assert.deepEqual(paraInline('**A** e *b* e `c` e [d](/x) e [e](javascript:alert(1)) <f>'), [
      { t: 'A', marca: 'negrito' }, { t: ' e ' }, { t: 'b', marca: 'italico' }, { t: ' e c e ' }, { t: 'd', marca: 'link', href: '/x' }, { t: ' e e ‹f›' },
    ]);
    assert.deepEqual(validarInline(paraInline('<script>alert(1)</script> **<b>x</b>**'), 'x'), []);
    assert.equal(paraInline(''), null);
    assert.equal(paraInline(null), null);
    assert.equal(textoPuro('**Vendas** › `Pedidos` <número>'), 'Vendas › Pedidos ‹número›');
  });
});
