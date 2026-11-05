/* Regra de visibilidade (doc 04) como função pura. Os casos 1–5 do doc 04 rodam aqui sem banco;
   o caso 6 (persistência após reiniciar) e o histórico gravado precisam do PostgreSQL → scripts/testar-visibilidade.mjs (pendente). */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { BASE } from '../../lib/conteudo/base-conhecimento.js';
import { montarResumo } from '../../lib/conteudo/consultas.js';
import {
  CHAVES, VALORES_INICIAIS, caminhoControlado, caminhoVisivel, itemAdmin, itemVisivel, listaAdmin,
  mapaEfetivo, materialVisivel, mesclarComPadrao, ocultoParaOutros, validarAtualizacao,
} from '../../lib/visibilidade.js';

const PDF = '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf';
const ocultar = (chave, perfis = ['estagiario', 'consultor']) => [{ chave, visivel: false, perfis }];

describe('valores iniciais (doc 04)', () => {
  it('apostila oculta, acervo só consultor, resto visível para os dois perfis', () => {
    const est = mapaEfetivo([], 'estagiario');
    const con = mapaEfetivo([], 'consultor');
    assert.equal(est['area:apostila'], false);
    assert.equal(con['area:apostila'], false);
    assert.equal(est['area:acervo'], false);
    assert.equal(con['area:acervo'], true);
    for (const chave of CHAVES) if (!['area:apostila', 'area:acervo'].includes(chave)) assert.equal(est[chave], true, chave);
  });
  it('tem chave modulo: para os 19 módulos da base', () => {
    for (const m of BASE.modulos) assert.ok(CHAVES.has(`modulo:${m.id}`), m.id);
    assert.equal([...CHAVES].filter((c) => c.startsWith('modulo:')).length, BASE.modulos.length);
  });
  it('valores iniciais são imutáveis', () => {
    assert.throws(() => { VALORES_INICIAIS[0].visivel = false; });
    assert.throws(() => { VALORES_INICIAIS[0].perfis.push('admin'); });
  });
});

describe('regra efetiva: admin OU (visivel E papel ∈ perfis)', () => {
  const item = { chave: 'area:videos', visivel: true, perfis: ['consultor'] };
  it('admin sempre vê', () => assert.equal(itemVisivel({ ...item, visivel: false, perfis: [] }, 'admin'), true));
  it('perfil fora da lista não vê', () => assert.equal(itemVisivel(item, 'estagiario'), false));
  it('perfil na lista vê', () => assert.equal(itemVisivel(item, 'consultor'), true));
  it('visivel=false esconde mesmo com perfil na lista', () => assert.equal(itemVisivel({ ...item, visivel: false }, 'consultor'), false));
  it('papel desconhecido ou ausente não vê (falha fechada)', () => {
    assert.equal(itemVisivel(item, 'visitante'), false);
    assert.equal(itemVisivel(item, undefined), false);
    assert.equal(itemVisivel(undefined, 'consultor'), false);
  });
  it('linha do banco vence o padrão; chave desconhecida do banco é ignorada', () => {
    const itens = mesclarComPadrao([{ chave: 'area:apostila', visivel: true, perfis: ['consultor', 'intruso'] }, { chave: 'area:nao-existe', visivel: true, perfis: ['consultor'] }]);
    assert.deepEqual(itens.find((i) => i.chave === 'area:apostila').perfis, ['consultor']);
    assert.equal(itens.some((i) => i.chave === 'area:nao-existe'), false);
  });
  it('chave ausente no mapa = oculta', () => {
    assert.equal(materialVisivel({ modulo: 'nao-existe', jornada: 'inicial', tipo: 'regra' }, mapaEfetivo([], 'consultor')), false);
  });
});

describe('material: área da jornada + módulo + tipo', () => {
  const mat = { modulo: 'vendas', jornada: 'inicial', tipo: 'video' };
  it('visível com tudo ligado', () => assert.equal(materialVisivel(mat, mapaEfetivo([], 'estagiario')), true));
  it('some se a área da jornada some', () => assert.equal(materialVisivel(mat, mapaEfetivo(ocultar('area:guia-inicial'), 'estagiario')), false));
  it('some se o módulo some', () => assert.equal(materialVisivel(mat, mapaEfetivo(ocultar('modulo:vendas'), 'estagiario')), false));
  it('some se o tipo some', () => assert.equal(materialVisivel(mat, mapaEfetivo(ocultar('tipo:video'), 'estagiario')), false));
  it('tipo sem chave (regra, tela) depende só de área e módulo', () => {
    assert.equal(materialVisivel({ ...mat, tipo: 'regra' }, mapaEfetivo(ocultar('tipo:video'), 'estagiario')), true);
  });
  it('jornada inválida = oculto', () => assert.equal(materialVisivel({ ...mat, jornada: 'outra' }, mapaEfetivo([], 'admin')), false));
});

describe('casos obrigatórios do doc 04 (sem banco)', () => {
  it('1. estagiário com area:apostila oculta → /apostila e o PDF não são servidos', () => {
    const mapa = mapaEfetivo([], 'estagiario');
    assert.equal(caminhoVisivel('/apostila', mapa, BASE.caminhos), false);
    assert.equal(caminhoVisivel(PDF, mapa, BASE.caminhos), false);
  });
  it('2. admin → os mesmos caminhos são servidos', () => {
    const mapa = mapaEfetivo([], 'admin');
    assert.equal(caminhoVisivel('/apostila', mapa, BASE.caminhos), true);
    assert.equal(caminhoVisivel(PDF, mapa, BASE.caminhos), true);
  });
  it('3. ocultar modulo:estoque → vídeo do estoque bloqueado e resumo sem Estoque para não-admin', () => {
    const itens = ocultar('modulo:estoque');
    const video = '/videos/consultor-04-estoque.mp4';
    assert.ok(BASE.caminhos[video]?.some((d) => d.modulo === 'estoque'), 'vídeo do estoque registrado na base');
    for (const papel of ['estagiario', 'consultor']) {
      assert.equal(caminhoVisivel(video, mapaEfetivo(itens, papel), BASE.caminhos), false, papel);
      assert.equal(montarResumo(BASE, { papel, itens }).modulos.some((m) => m.id === 'estoque'), false, papel);
    }
    const admin = montarResumo(BASE, { papel: 'admin', itens }).modulos.find((m) => m.id === 'estoque');
    assert.equal(admin.oculto, true);
  });
  it('4. reativar → volta a ser servido', () => {
    const video = '/videos/consultor-04-estoque.mp4';
    const itens = [{ chave: 'modulo:estoque', visivel: true, perfis: ['estagiario', 'consultor'] }];
    assert.equal(caminhoVisivel(video, mapaEfetivo(itens, 'estagiario'), BASE.caminhos), true);
    assert.equal(montarResumo(BASE, { papel: 'estagiario', itens }).modulos.some((m) => m.id === 'estoque'), true);
  });
  it('5. PUT: corpo validado (403 por perfil fica na rota; aqui 400 de chave/perfis inválidos)', () => {
    assert.deepEqual(validarAtualizacao({ chave: 'area:apostila', visivel: true, perfis: ['consultor', 'estagiario'] }), { ok: true, item: { chave: 'area:apostila', visivel: true, perfis: ['estagiario', 'consultor'] } });
    assert.equal(validarAtualizacao({ chave: 'area:xyz', visivel: true, perfis: [] }).ok, false);
    assert.equal(validarAtualizacao({ chave: 'area:apostila', visivel: 'sim', perfis: [] }).ok, false);
    assert.equal(validarAtualizacao({ chave: 'area:apostila', visivel: true, perfis: ['admin'] }).ok, false);
    assert.equal(validarAtualizacao({ chave: 'area:apostila', visivel: true, perfis: ['consultor', 'consultor'] }).ok, false);
    assert.equal(validarAtualizacao(null).ok, false);
    assert.equal(validarAtualizacao([]).ok, false);
  });
});

describe('caminhos de arquivo', () => {
  it('só apostila, downloads, vídeos, checklists e manuais passam pela regra', () => {
    for (const c of ['/apostila', '/apostila.html', PDF, '/videos/x.mp4', '/checklists/estagiarios/vendas.html', '/manuais/x.pdf']) assert.equal(caminhoControlado(c), true, c);
    for (const c of ['/', '/index.html', '/guia.css', '/api/conteudo', '/assets/logo.png']) assert.equal(caminhoControlado(c), false, c);
  });
  it('tipo oculto bloqueia a pasta inteira', () => {
    assert.equal(caminhoVisivel('/checklists/estagiarios/vendas.html', mapaEfetivo(ocultar('tipo:checklist'), 'consultor'), BASE.caminhos), false);
  });
  it('arquivo de dois módulos só some quando os dois estão ocultos', () => {
    const [caminho, donos] = Object.entries(BASE.caminhos).find(([, d]) => new Set(d.map((x) => x.modulo)).size > 1) || [];
    if (!caminho) return; // a base atual pode não ter arquivo compartilhado
    const [a, b] = [...new Set(donos.map((d) => d.modulo))];
    assert.equal(caminhoVisivel(caminho, mapaEfetivo(ocultar(`modulo:${a}`), 'consultor'), BASE.caminhos), true);
    assert.equal(caminhoVisivel(caminho, mapaEfetivo([...ocultar(`modulo:${a}`), ...ocultar(`modulo:${b}`)], 'consultor'), BASE.caminhos), false);
  });
  it('arquivo sem dono na base segue só o tipo', () => {
    assert.equal(caminhoVisivel('/videos/manifest.json', mapaEfetivo([], 'estagiario'), BASE.caminhos), true);
  });
});

describe('formato admin', () => {
  it('ocultoParaOutros', () => {
    assert.equal(ocultoParaOutros([], 'area:apostila'), true);
    assert.equal(ocultoParaOutros([], 'area:acervo'), false);
    assert.equal(ocultoParaOutros([{ chave: 'modulo:crm', visivel: true, perfis: [] }], 'modulo:crm'), true);
  });
  it('itemAdmin normaliza data e perfis; listaAdmin cobre todas as chaves', () => {
    assert.deepEqual(itemAdmin({ chave: 'area:pacotes', visivel: true, perfis: ['consultor', 'estagiario'], atualizado_em: new Date('2026-11-04T12:00:00Z') }),
      { chave: 'area:pacotes', visivel: true, perfis: ['estagiario', 'consultor'], atualizado_por_nome: null, atualizado_em: '2026-11-04T12:00:00.000Z' });
    assert.equal(listaAdmin([]).length, CHAVES.size);
  });
});
