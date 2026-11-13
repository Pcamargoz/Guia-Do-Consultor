/* Metodologia (refatoracao-guia-do-consultor/14-metodologia.md): um vídeo, um checklist e um manual por módulo,
   servidos pela base versionada; visibilidade por recurso; manual institucional com fonte. Sem banco. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { montarResumo } from '../../lib/conteudo/consultas.js';
import { capitulosDoVideo, pedeRevisao, versaoDe } from '../../lib/conteudo/montar.js';
import { MAPA_MODULOS } from '../../lib/conteudo/mapa-modulos.js';
import { caminhoVisivel, chaveDoRecurso, mapaEfetivo, recursoVisivel, TIPOS_RECURSO, VALORES_INICIAIS } from '../../lib/visibilidade.js';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const indice = JSON.parse(readFileSync(path.join(RAIZ, 'lib/conteudo/base/indice.json'), 'utf8'));
const linhas = (mudancas = {}) => VALORES_INICIAIS.map((i) => ({ ...i, ...(mudancas[i.chave] || {}) }));

describe('recursos da Metodologia na base', () => {
  it('todo módulo tem exatamente vídeo, checklist e manual', () => {
    for (const m of indice.modulos) assert.deepEqual(Object.keys(m.recursos).sort(), [...TIPOS_RECURSO].sort(), m.id);
  });
  it('nenhum vídeo existente vira vídeo do módulo (decisão de 12/11/2026): todos em preparação', () => {
    for (const m of indice.modulos) {
      assert.equal(MAPA_MODULOS.find((d) => d.id === m.id).video, null);
      assert.equal(m.recursos.video.status, 'em-preparacao', m.id);
    }
  });
  it('a Biblioteca de Vídeos traz os vídeos publicados, com capítulos em ordem e fonte', () => {
    assert.ok(indice.videos.length >= 12);
    for (const v of indice.videos) {
      assert.equal(v.url, `/videos/${v.id}.mp4`);
      assert.ok(v.capitulos.length > 3 && v.capitulos.every((c, i, l) => !i || c.t > l[i - 1].t), `${v.id}: capítulos em ordem`);
      assert.ok(v.fontes.length);
    }
    assert.deepEqual(indice.videos.find((v) => v.id === 'consultor-01-suprimentos').modulos, ['compras', 'recebimento']);
  });
  it('módulos em preparação não expõem recurso', () => {
    for (const m of indice.modulos.filter((x) => x.em_preparacao)) for (const t of TIPOS_RECURSO) assert.equal(m.recursos[t].status, 'em-preparacao');
  });
  it('os arquivos dos recursos são caminhos protegidos', () => {
    const v = indice.modulos.find((m) => m.id === 'estoque').recursos;
    assert.ok(indice.caminhos['/videos/consultor-04-estoque.mp4']?.some((d) => d.modulo === 'estoque' && d.tipo === 'video'));
    assert.ok(indice.caminhos[v.checklist.url]?.some((d) => d.modulo === 'estoque' && d.tipo === 'checklist'));
  });
});

describe('visibilidade por recurso', () => {
  it('ocultar o checklist de um módulo some com ele só ali (e o servidor recusa o arquivo)', () => {
    const itens = linhas({ [chaveDoRecurso('estoque', 'checklist')]: { visivel: false } });
    const r = montarResumo(indice, { papel: 'consultor', itens });
    assert.equal(r.modulos.find((m) => m.id === 'estoque').recursos.checklist, null);
    assert.notEqual(r.modulos.find((m) => m.id === 'producao').recursos.checklist, null);
    const mapa = mapaEfetivo(itens, 'consultor');
    assert.equal(recursoVisivel(mapa, 'estoque', 'checklist'), false);
    assert.equal(caminhoVisivel('/checklists/consultores/implantacao-10-estoque.html', mapa, indice.caminhos), false);
  });
  it('Biblioteca de Vídeos respeita area:videos e o módulo', () => {
    const fechada = montarResumo(indice, { papel: 'consultor', itens: linhas({ 'area:videos': { visivel: false } }) });
    assert.deepEqual(fechada.videos, []);
    const semEstoque = montarResumo(indice, { papel: 'consultor', itens: linhas({ 'modulo:estoque': { visivel: false } }) });
    assert.equal(semEstoque.videos.some((v) => v.id === 'consultor-04-estoque'), false);
    assert.ok(semEstoque.videos.some((v) => v.id === 'consultor-05-producao'));
  });
  it('admin vê o recurso oculto marcado', () => {
    const itens = linhas({ [chaveDoRecurso('estoque', 'manual')]: { visivel: false } });
    const r = montarResumo(indice, { papel: 'admin', itens });
    assert.equal(r.modulos.find((m) => m.id === 'estoque').recursos.manual.oculto, true);
  });
  it('área da Metodologia oculta esconde todos os recursos', () => {
    const r = montarResumo(indice, { papel: 'estagiario', itens: linhas({ 'area:metodologia': { visivel: false } }) });
    assert.ok(r.modulos.every((m) => TIPOS_RECURSO.every((t) => m.recursos[t] === null)));
  });
  it('manual institucional respeita area:metodologia-ff', () => {
    const fechado = mapaEfetivo(linhas({ 'area:metodologia-ff': { visivel: false } }), 'consultor');
    assert.equal(caminhoVisivel('/metodologia/manual-faktory-flow.json', fechado, indice.caminhos), false);
    assert.equal(caminhoVisivel('/metodologia/manual-faktory-flow.json', mapaEfetivo(linhas(), 'consultor'), indice.caminhos), true);
  });
});

describe('utilitários', () => {
  it('versão e revisão', () => {
    assert.equal(versaoDe('1.22.13 (teste); 1.23.2 (staging)'), '1.23.2');
    assert.equal(versaoDe('sem versão'), null);
    assert.equal(pedeRevisao('1.22.13', '1.23.2'), true);
    assert.equal(pedeRevisao('1.23.0', '1.23.2'), false);
    assert.equal(pedeRevisao(null), false);
  });
  it('capítulos: abertura fria desloca 1,1 s e cenas repetidas viram um capítulo', () => {
    const tempos = { duracaoTotal: 100, trechos: [{ cena: 'abertura', inicio: 0 }, { cena: 'status', inicio: 10 }, { cena: 'status', inicio: 20 }, { cena: 'regra', inicio: 30, titulo: 'R1' }, { cena: 'tela', inicio: 40, rotulo: 'A › B' }] };
    assert.deepEqual(capitulosDoVideo(tempos, 101.5).map((c) => [c.t, c.titulo]), [[1.1, 'Abertura'], [11.1, 'Conceito'], [31.1, 'R1'], [41.1, 'A › B']]);
    assert.equal(capitulosDoVideo(tempos, 100)[1].t, 10);
  });
});

describe('manual institucional', () => {
  const manual = JSON.parse(readFileSync(path.join(RAIZ, 'public/metodologia/manual-faktory-flow.json'), 'utf8'));
  it('tem as duas frentes e toda seção disponível cita fonte', () => {
    assert.deepEqual(manual.frentes.map((f) => f.id), ['gestao', 'implantacao']);
    for (const s of manual.frentes.flatMap((f) => f.secoes)) {
      if (s.status === 'disponivel') assert.ok(s.fontes.length && s.blocos.length, s.id);
    }
  });
  it('não tem HTML nos textos', () => {
    assert.doesNotMatch(JSON.stringify(manual), /<[a-z/][^>]*>/i);
  });
});
