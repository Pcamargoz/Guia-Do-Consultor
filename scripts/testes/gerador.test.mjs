/* Gerador da base: regra "nada inventado" (toda informação cita fonte; sem fonte → em-preparacao),
   com fontes fictícias e, quando o Harness está disponível (HARNESS_DIR ou caminho padrão do box), com as fontes reais. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { BASE } from '../../lib/conteudo/base-conhecimento.js';
import { carregarHarness, lerFrontmatter } from '../../lib/conteudo/fontes.js';
import { MAPA_MODULOS, SECOES } from '../../lib/conteudo/mapa-modulos.js';
import { duracaoEmSegundos, montarBase } from '../../lib/conteudo/montar.js';
import { gerar, hojeBrt, serializarBase, validarBaseContraContrato } from '../gerar-base-conhecimento.mjs';
import { guiaFicticio, harnessFicticio, MAPA_FICTICIO, VERSAO_FICTICIA } from './fixtures/fontes-ficticias.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const HARNESS = process.env.HARNESS_DIR || '/workspace/flow-harness/Harness-Arquitetura-Flow';
const TEM_HARNESS = existsSync(path.join(HARNESS, 'conhecimento'));

/** Percorre a base e devolve todos os nós que deveriam citar fonte. */
function nosComFonte(base) {
  const nos = [];
  for (const m of base.modulos) {
    nos.push({ onde: m.id, fontes: m.fontes, status: 'disponivel' });
    for (const x of m.materiais) nos.push({ onde: x.id, fontes: x.fontes, status: x.status });
    for (const [j, secoes] of Object.entries(m.jornadas)) for (const s of secoes) {
      nos.push({ onde: `${m.id}/${j}/${s.id}`, fontes: s.fontes, status: s.status, blocos: s.blocos.length });
      for (const [i, b] of s.blocos.entries()) {
        nos.push({ onde: `${m.id}/${j}/${s.id}[${i}]`, fontes: b.fontes, status: 'disponivel' });
        for (const it of b.itens || []) if (it.fontes) nos.push({ onde: `${m.id}/${j}/${s.id}[${i}] item`, fontes: it.fontes, status: 'disponivel' });
      }
    }
  }
  return nos;
}

function conferirNadaInventado(base) {
  for (const n of nosComFonte(base)) {
    if (n.status === 'disponivel') assert.ok(Array.isArray(n.fontes) && n.fontes.length > 0, `${n.onde} sem fonte`);
    if (n.blocos === 0) assert.equal(n.status, 'em-preparacao', `${n.onde} vazia deveria estar em preparação`);
  }
}

describe('utilitários', () => {
  it('duracaoEmSegundos', () => {
    assert.equal(duracaoEmSegundos('3 min 08 s'), 188);
    assert.equal(duracaoEmSegundos('45 s'), 45);
    assert.equal(duracaoEmSegundos('2 min'), 120);
    for (const v of ['', 'abc', null, '3:08']) assert.equal(duracaoEmSegundos(v), null);
  });
  it('hojeBrt usa o fuso de São Paulo', () => {
    assert.equal(hojeBrt(new Date('2026-11-05T02:30:00Z')), '2026-11-04'); // 23:30 BRT
    assert.equal(hojeBrt(new Date('2026-11-05T03:30:00Z')), '2026-11-05');
  });
  it('lerFrontmatter lê lista de módulos e corpo', () => {
    const { meta, corpo } = lerFrontmatter('---\nid: regra-x\ntitulo: Regra X (fictício)\nmodulos: [vendas, estoque]\nstatus: vigente\n---\n## Regra\nTexto.');
    assert.equal(meta.id, 'regra-x');
    assert.deepEqual(meta.modulos, ['vendas', 'estoque']);
    assert.match(corpo, /## Regra/);
  });
});

describe('montarBase com fontes fictícias', () => {
  const base = montarBase({ harness: harnessFicticio(), guia: guiaFicticio(), versao: VERSAO_FICTICIA, mapa: MAPA_FICTICIO });
  it('respeita o contrato para todos os perfis/módulos/jornadas', () => assert.deepEqual(validarBaseContraContrato(base), []));
  it('nada inventado: tudo disponível cita fonte; seção vazia = em-preparacao', () => conferirNadaInventado(base));
  it('módulo sem fonte nenhuma fica todo em preparação', () => {
    const rel = base.modulos.find((m) => m.id === 'relatorios');
    assert.ok(rel.materiais.every((x) => x.status === 'em-preparacao' && x.url === null));
    assert.ok(rel.jornadas.inicial.every((s) => s.status === 'em-preparacao'));
  });
  it('seções na ordem do contrato (8 inicial, 10 consultor)', () => {
    for (const m of base.modulos) {
      assert.deepEqual(m.jornadas.inicial.map((s) => s.id), SECOES.inicial.map(([id]) => id));
      assert.deepEqual(m.jornadas.consultor.map((s) => s.id), SECOES.consultor.map(([id]) => id));
    }
  });
  it('vídeo só fica disponível com status pronto e .mp4 publicado; senão vira pendência', () => {
    const est = base.modulos.find((m) => m.id === 'estoque').materiais.find((x) => x.id === 'estoque:video-consultor');
    assert.equal(est.status, 'em-preparacao');
    assert.ok(base.pendencias.some((p) => p.includes('consultor-04-estoque')));
    const ven = base.modulos.find((m) => m.id === 'vendas').materiais.find((x) => x.id === 'vendas:video-inicial');
    assert.equal(ven.duracao_s, 188);
  });
  it('captura de tela só entra se publicada; o resto vira pendência', () => {
    const telas = base.modulos.find((m) => m.id === 'vendas').jornadas.inicial.find((s) => s.id === 'telas').blocos.filter((b) => b.tipo === 'tela');
    assert.deepEqual(telas.map((b) => b.url), ['/telas/fluxo-1-vendas/lista-pedidos.png']);
    assert.ok(base.pendencias.some((p) => p.startsWith('vendas: 1 captura')));
  });
  it('manual do estagiário só usa passos conferidos na tela (selo v)', () => {
    const manual = base.modulos.find((m) => m.id === 'vendas').jornadas.inicial.find((s) => s.id === 'manual');
    assert.ok(manual.blocos.flatMap((b) => b.passos).every((p) => p.selo === 'conferido-na-tela'));
  });
  it('registra caminhos protegidos com dono e tipo', () => {
    assert.deepEqual(base.caminhos['/videos/fluxo-1-vendas.mp4'], [{ modulo: 'vendas', tipo: 'video' }]);
    assert.deepEqual(base.caminhos['/checklists/estagiarios/estoque.html'], [{ modulo: 'estoque', tipo: 'checklist' }]);
  });
  it('é determinística', () => {
    const outra = montarBase({ harness: harnessFicticio(), guia: guiaFicticio(), versao: VERSAO_FICTICIA, mapa: MAPA_FICTICIO });
    assert.equal(serializarBase(outra), serializarBase(base));
  });
});

describe('carregarHarness lê um Harness mínimo em pasta temporária', () => {
  it('regras, funcional e glossário com fonte relativa ao Harness', async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'harness-ficticio-'));
    try {
      const k = path.join(tmp, 'conhecimento');
      await mkdir(path.join(k, 'produto/regras-negocio'), { recursive: true });
      await mkdir(path.join(k, 'glossario'), { recursive: true });
      await writeFile(path.join(k, 'produto/regras-negocio/regra-ficticia.md'), '---\nid: regra-ficticia\ntitulo: Regra fictícia\nmodulos: [vendas]\nconfianca: alta\nstatus: vigente\n---\n## Regra\nTexto fictício.\n## Como confirmar na tela\nAbra a tela fictícia.\n');
      await writeFile(path.join(k, 'produto/regras-negocio/regra-rascunho.md'), '---\nid: regra-rascunho\ntitulo: Rascunho\nmodulos: [vendas]\nstatus: rascunho\n---\n## Regra\nNão deve entrar.\n');
      await writeFile(path.join(k, 'glossario/telas.yaml'), '- id: tela-ficticia\n  nome: Tela fictícia\n  modulo: vendas\n  caminho: Vendas > Fictícia\n');
      const h = await carregarHarness(tmp);
      assert.deepEqual(h.regras.map((r) => r.id), ['regra-ficticia']);
      assert.equal(h.regras[0].fonte, 'harness:conhecimento/produto/regras-negocio/regra-ficticia.md');
      assert.equal(h.regras[0].secoes.Regra, 'Texto fictício.');
      assert.equal(h.glossario[0].nome, 'Tela fictícia');
      assert.match(h.glossario[0].fonte, /^harness:conhecimento\/glossario\/telas\.yaml/);
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
});

describe('base versionada (lib/conteudo/base-conhecimento.js)', () => {
  it('tem os 19 módulos do mapa e respeita o contrato', () => {
    assert.deepEqual(BASE.modulos.map((m) => m.id), MAPA_MODULOS.map((m) => m.id));
    assert.deepEqual(validarBaseContraContrato(BASE), []);
  });
  it('nada inventado', () => conferirNadaInventado(BASE));
  it('toda fonte "guia:" aponta para arquivo que existe no repositório', () => {
    const fontes = new Set(nosComFonte(BASE).flatMap((n) => n.fontes || []));
    for (const f of fontes) if (f.startsWith('guia:')) assert.ok(existsSync(path.join(RAIZ, f.slice(5).split('#')[0])), f);
  });
  it('toda URL de material disponível existe em public/ (ou é rota de hash)', () => {
    for (const m of BASE.modulos) for (const x of m.materiais) {
      if (x.status !== 'disponivel') continue;
      if (x.url.startsWith('#')) continue;
      assert.ok(existsSync(path.join(RAIZ, 'public', x.url)), x.url);
    }
  });
});

describe('Harness real', { skip: TEM_HARNESS ? false : `Harness não encontrado em ${HARNESS} (defina HARNESS_DIR)` }, () => {
  it('toda fonte "harness:" existe no Harness', () => {
    const fontes = new Set(nosComFonte(BASE).flatMap((n) => n.fontes || []));
    for (const f of fontes) if (f.startsWith('harness:')) assert.ok(existsSync(path.join(HARNESS, f.slice(8).split('#')[0])), f);
  });
  it('a base versionada está em dia com o Harness (equivale a --verificar)', async () => {
    const atual = readFileSync(path.join(RAIZ, 'lib/conteudo/base-conhecimento.js'), 'utf8');
    const nova = await gerar({ harness: HARNESS, versao: BASE.versao });
    assert.ok(serializarBase(nova) === atual, 'base desatualizada: rode node scripts/gerar-base-conhecimento.mjs --harness <pasta>');
  });
});
