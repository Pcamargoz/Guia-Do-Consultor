/* Validadores do contrato (v1 + ajustes da v2: texto em trechos, sem HTML, href seguro) e os JSON de exemplo
   (dados fictícios) entregues ao UI/UX. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validarDetalhe, validarItemAdmin, validarListaAdmin, validarMaterial, validarResumo, validarVisibilidadeEfetiva } from '../../lib/conteudo/contrato.js';
import { criarClassificadorTelas, hrefSeguro, MARCAS, paraInline, textoPuro, validarInline } from '../../lib/conteudo/texto-inline.js';
import { legendasUrlValida } from '../../lib/conteudo/contrato.js';
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
    assert.ok(validarDetalhe(secaoCom({ tipo: 'video', titulo: 'x', url: '/v.mp4', legenda: '/v.vtt' })).some((e) => e.includes('legendas_url')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'fluxo', etapas: ['ok', '<b>'] })).some((e) => e.includes('etapas')));
    assert.ok(validarDetalhe(secaoCom({ tipo: 'html', texto: [{ t: 'x' }] })).some((e) => e.includes('tipo')));
  });
  it('validarMaterial recusa url insegura e título com HTML', () => {
    assert.ok(validarMaterial({ ...materialOk, url: 'javascript:alert(1)' }).some((e) => e.includes('insegura')));
    assert.ok(validarMaterial({ ...materialOk, titulo: '<img src=x onerror=alert(1)>' }).some((e) => e.includes('HTML')));
  });
  it('conversor: Markdown leve → trechos; nada de HTML passa', () => {
    assert.deepEqual(paraInline('**A** e *b* e `c` e [d](/x) e [e](javascript:alert(1)) <f>'), [
      { t: 'A', marca: 'negrito' }, { t: ' e ' }, { t: 'b', marca: 'italico' }, { t: ' e ' }, { t: 'c', marca: 'codigo' }, { t: ' e ' }, { t: 'd', marca: 'link', href: '/x' }, { t: ' e e ‹f›' },
    ]);
    assert.deepEqual(validarInline(paraInline('<script>alert(1)</script> **<b>x</b>**'), 'x'), []);
    assert.equal(paraInline(''), null);
    assert.equal(paraInline(null), null);
    assert.equal(textoPuro('**Vendas** › `Pedidos` <número>'), 'Vendas › Pedidos ‹número›');
  });
});

describe('marcas "tela" e "codigo" para o que vinha entre crases (v3, item 1)', () => {
  const GLOSSARIO = [
    { nome: 'Pedidos de Venda', caminho: 'Vendas › Pedidos de Venda' },
    { nome: 'Novo Pedido', caminho: 'Vendas › Pedidos de Venda › + Novo Pedido' },
    { nome: 'Contas a Pagar', caminho: 'Financeiro › Contas a Pagar' },
  ];
  const marca = criarClassificadorTelas(GLOSSARIO);
  it('o contrato aceita as marcas novas e só elas', () => {
    assert.deepEqual([...MARCAS], ['negrito', 'italico', 'link', 'tela', 'codigo']);
    assert.deepEqual(validarInline([{ t: 'Pedidos de Venda', marca: 'tela' }, { t: ' e o campo ' }, { t: 'CFOP', marca: 'codigo' }], 'x'), []);
    assert.ok(validarInline([{ t: 'x', marca: 'code' }], 'x').some((e) => e.includes('marca')));
    assert.ok(validarInline([{ t: 'x', marca: 'tela', href: '/x' }], 'x').some((e) => e.includes('href')));
    assert.ok(validarInline([{ t: '   ', marca: 'codigo' }], 'x').some((e) => e.includes('sem texto')));
    assert.ok(validarInline([{ t: '`CFOP`', marca: 'codigo' }], 'x').some((e) => e.includes('Markdown')));
    assert.ok(validarInline([{ t: '<b>CFOP</b>', marca: 'codigo' }], 'x').some((e) => e.includes('HTML')));
  });
  it('tela = nome ou caminho do glossário (">" ou "›", sem diferença de caixa, "+ " ignorado); o resto é codigo', () => {
    for (const t of ['Pedidos de Venda', 'pedidos de venda', 'Vendas > Pedidos de Venda', 'Vendas›Pedidos de Venda', 'Vendas > Pedidos de Venda > + Novo Pedido', '+ Novo Pedido', 'Financeiro > Contas a Pagar', '⋯ > Novo Pedido']) assert.equal(marca(t), 'tela', t);
    for (const t of ['CFOP', 'Situação', 'APROVADO', 'Salvar', 'Vendas', 'Estoque > Saldo', 'PC-nnnn/2', '⋯', 'Contas']) assert.equal(marca(t), 'codigo', t);
    assert.equal(criarClassificadorTelas()('Pedidos de Venda'), 'codigo');
  });
  it('paraInline usa o classificador; sem classificador tudo vira codigo; crase nunca sobra', () => {
    const tr = paraInline('Abra `Vendas > Pedidos de Venda`, clique em `+ Novo Pedido` e preencha `CFOP` (`5102`). Vazio: `` e ` solta.', { marcaDaCrase: marca });
    assert.deepEqual(tr, [
      { t: 'Abra ' }, { t: 'Vendas > Pedidos de Venda', marca: 'tela' }, { t: ', clique em ' }, { t: '+ Novo Pedido', marca: 'tela' },
      { t: ' e preencha ' }, { t: 'CFOP', marca: 'codigo' }, { t: ' (' }, { t: '5102', marca: 'codigo' }, { t: '). Vazio:  e  solta.' },
    ]);
    assert.ok(tr.every((x) => !x.t.includes('`')));
    assert.deepEqual(paraInline('`Pedidos de Venda`'), [{ t: 'Pedidos de Venda', marca: 'codigo' }]);
    assert.deepEqual(paraInline('**`Salvar`** e [`ver`](/x)'), [{ t: 'Salvar', marca: 'negrito' }, { t: ' e ' }, { t: 'ver', marca: 'link', href: '/x' }]);
  });
});

describe('vídeo: legendas_url (v3, item 4)', () => {
  const comVideo = (bloco) => ({ modulo: { id: 'vendas', titulo: 'Vendas' }, jornada: 'consultor', secoes: Array(10).fill({ id: 'a', titulo: 'A', status: 'disponivel', blocos: [{ tipo: 'video', titulo: 'x', url: '/v.mp4', fontes: ['guia:x'], ...bloco }], fontes: ['guia:x'] }) });
  it('aceita caminho relativo do site ou https, terminando em .vtt (ou null)', () => {
    for (const v of ['/videos/fluxo-1.vtt', '/videos/FLUXO.VTT', 'https://cdn.faktory.com.br/legendas/a.vtt', '/videos/a.vtt?v=2']) assert.equal(legendasUrlValida(v), true, v);
    for (const v of ['/videos/fluxo-1.vtt', null]) assert.deepEqual(validarDetalhe(comVideo({ legendas_url: v })), [], String(v));
  });
  it('recusa http, javascript:, data:, //host, #rota e o que não termina em .vtt', () => {
    for (const v of ['http://cdn.faktory.com.br/a.vtt', 'javascript:alert(1)//.vtt', 'JavaScript:alert(1)', 'data:text/vtt,WEBVTT', '//evil.com/a.vtt', '#videos/a.vtt', 'videos/a.vtt', '/videos/a.srt', '/videos/a.vtt.mp4', '/videos/a.mp4#.vtt', 'https://x.com/a.vtt/', '', 1]) {
      assert.equal(legendasUrlValida(v), false, String(v));
      assert.ok(validarDetalhe(comVideo({ legendas_url: v })).some((e) => e.includes('legendas_url')), String(v));
    }
  });
  it('"legenda" no vídeo é recusada (nome antigo); legendas_url fora de vídeo também; legenda da tela segue texto', () => {
    assert.ok(validarDetalhe(comVideo({ legenda: '/v.vtt' })).some((e) => e.includes('no vídeo o campo é "legendas_url"')));
    const tela = comVideo({});
    tela.secoes = tela.secoes.map((s) => ({ ...s, blocos: [{ tipo: 'tela', titulo: 'T', legenda: 'Fala da cena', url: '/telas/a.png', fontes: ['guia:x'] }] }));
    assert.deepEqual(validarDetalhe(tela), []);
    const link = comVideo({});
    link.secoes = link.secoes.map((s) => ({ ...s, blocos: [{ tipo: 'link', titulo: 'L', url: '/x', legendas_url: null, fontes: ['guia:x'] }] }));
    assert.ok(validarDetalhe(link).some((e) => e.includes('só bloco de vídeo')));
  });
});

describe('v3.1 — caminho de menu: glossário, inferido pelo módulo ou codigo', () => {
  const GLOSSARIO = [{ nome: 'Pedidos de Venda (fictício)', caminho: 'Vendas > Pedidos de Venda (fictício)' }];
  const MODULOS = [
    { id: 'estoque', titulo: 'Estoque' },
    { id: 'expedicao', titulo: 'Expedição' },
    { id: 'fundacao', titulo: 'Cadastros e Fundação' },
    { id: 'servicos', titulo: 'Serviços e Instalação' },
    { id: 'alumina', titulo: 'Alumina — IA' },
    { id: 'vendas', titulo: 'Vendas' },
  ];
  const marca = criarClassificadorTelas(GLOSSARIO, MODULOS);

  it('glossário continua igual (origem "glossario")', () => {
    assert.equal(marca('Vendas > Pedidos de Venda (fictício)'), 'tela');
    assert.equal(marca('Pedidos de Venda (fictício)'), 'tela');
    assert.deepEqual(marca.origem('Vendas › Pedidos de Venda (fictício)'), { tipo: 'glossario' });
  });

  it('inferido pelo módulo: 1º segmento é módulo do índice (sem acento/caixa; título até " e "/" — ")', () => {
    assert.equal(marca('Estoque > Locais (fictício)'), 'tela');
    assert.deepEqual(marca.origem('Estoque > Locais (fictício)'), { tipo: 'modulo', modulo: 'estoque' });
    assert.deepEqual(marca.origem('EXPEDICAO >  Montar carga (fictício)'), { tipo: 'modulo', modulo: 'expedicao' });
    assert.deepEqual(marca.origem('Cadastros > Clientes (fictício)'), { tipo: 'modulo', modulo: 'fundacao' });
    assert.deepEqual(marca.origem('Serviços › Medições (fictício)'), { tipo: 'modulo', modulo: 'servicos' });
    assert.deepEqual(marca.origem('Alumina > Conversas (fictício)'), { tipo: 'modulo', modulo: 'alumina' });
  });

  it('1º segmento desconhecido, sem separador ou sem módulos → codigo', () => {
    assert.equal(marca('Configurações > Empresas'), 'codigo');
    assert.equal(marca('⋯ > Faturar'), 'codigo');
    assert.equal(marca('Segurança > Perfis de Acesso'), 'codigo');
    assert.equal(marca('Estoque'), 'codigo', 'só o nome do módulo não é caminho de menu');
    assert.equal(marca('Estoque >'), 'codigo');
    assert.equal(marca.origem('Configurações > Empresas'), null);
    assert.equal(criarClassificadorTelas(GLOSSARIO)('Estoque > Locais (fictício)'), 'codigo', 'sem módulos não infere');
  });
});
