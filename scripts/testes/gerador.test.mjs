/* Gerador da base: regra "nada inventado" (toda informação cita fonte; sem fonte → em-preparacao),
   com fontes fictícias e, quando o Harness está disponível (HARNESS_DIR ou caminho padrão do box), com as fontes reais. */
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { carregarBaseCompleta, carregarConteudoModulo, carregarIndice, criarCarregador, modulosEmCache } from '../../lib/conteudo/base.js';
import { pathToFileURL } from 'node:url';
import { carregarHarness, lerFrontmatter } from '../../lib/conteudo/fontes.js';
import { MAPA_MODULOS, SECOES } from '../../lib/conteudo/mapa-modulos.js';
import { duracaoEmSegundos, montarBase } from '../../lib/conteudo/montar.js';
import { compararPasta, gerar, hojeBrt, indiceDaBase, linhasMarcas, MENSAGEM_SEM_HARNESS, serializarBase, validarBaseContraContrato } from '../gerar-base-conhecimento.mjs';
import { spawnSync } from 'node:child_process';
import { guiaFicticio, harnessFicticio, MAPA_FICTICIO, VERSAO_FICTICIA } from './fixtures/fontes-ficticias.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const HARNESS = process.env.HARNESS_DIR || '/workspace/flow-harness/Harness-Arquitetura-Flow';
const TEM_HARNESS = existsSync(path.join(HARNESS, 'conhecimento'));
const PASTA_BASE = path.join(RAIZ, 'lib/conteudo/base');
const BASE = await carregarBaseCompleta();

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
    assert.equal(ven.duracao_s, 47);
    assert.equal(ven.url, '/videos/intro-vendas.mp4');
  });
  it('intro vira o vídeo do módulo e o narrado segue como vídeo de apoio, sem contar como introdutório', () => {
    const mats = base.modulos.find((m) => m.id === 'vendas').materiais;
    const apoio = mats.find((x) => x.id === 'vendas:video-apoio');
    assert.equal(apoio.url, '/videos/fluxo-1-vendas.mp4');
    assert.equal(apoio.status, 'disponivel');
    assert.match(apoio.titulo, /\(vídeo de apoio\)$/);
    assert.equal(apoio.duracao_s, 188);
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
    assert.deepEqual(serializarBase(outra), serializarBase(base));
  });
  it('serializa em índice + um JSON por módulo (v3: sem carregar.js nem import attributes)', () => {
    const arq = serializarBase(base);
    assert.deepEqual(Object.keys(arq).sort(), ['LEIA-ME.md', 'estoque.json', 'indice.json', 'relatorios.json', 'vendas.json']);
    const indice = JSON.parse(arq['indice.json']);
    assert.deepEqual(indice, JSON.parse(JSON.stringify(indiceDaBase(base))));
    assert.ok(indice.modulos.every((m) => !('jornadas' in m) && !('retido' in m)));
    const vendas = JSON.parse(arq['vendas.json']);
    assert.deepEqual(Object.keys(vendas), ['versao', 'id', 'jornadas']);
    assert.ok('retido' in JSON.parse(arq['relatorios.json']));
  });
  it('recusa id de módulo que viraria caminho de arquivo perigoso', () => {
    for (const id of ['../x', 'indice', 'A B']) assert.throws(() => serializarBase({ ...base, modulos: [{ ...base.modulos[0], id }] }), /inválido/, id);
  });
  it('compararPasta (base do --verificar) acha desatualizado, faltando e sobrando', async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'base-'));
    try {
      const arq = serializarBase(base);
      for (const [n, t] of Object.entries(arq)) await writeFile(path.join(tmp, n), t);
      assert.deepEqual(await compararPasta(tmp, arq), { desatualizados: [], faltando: [], sobrando: [] });
      await writeFile(path.join(tmp, 'vendas.json'), '{}');
      await rm(path.join(tmp, 'estoque.json'));
      await writeFile(path.join(tmp, 'velho.json'), '{}');
      assert.deepEqual(await compararPasta(tmp, arq), { desatualizados: ['vendas.json'], faltando: ['estoque.json'], sobrando: ['velho.json'] });
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
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

describe('base versionada (lib/conteudo/base/)', () => {
  it('um arquivo por módulo + índice, e o resumo só precisa do índice (menor que a base)', () => {
    const nomes = readdirSync(PASTA_BASE).sort();
    assert.deepEqual(nomes, [...MAPA_MODULOS.map((m) => `${m.id}.json`), 'LEIA-ME.md', 'indice.json'].sort());
    const tam = (n) => statSync(path.join(PASTA_BASE, n)).size;
    const total = nomes.filter((n) => n.endsWith('.json')).reduce((a, n) => a + tam(n), 0);
    assert.ok(tam('indice.json') < total / 5, `índice ${tam('indice.json')} B de ${total} B`);
    for (const m of MAPA_MODULOS) assert.ok(tam(`${m.id}.json`) < total / 5, m.id);
  });
  it('carga sob demanda: índice e módulo vêm separados; id desconhecido não toca no disco', async () => {
    const indice = await carregarIndice();
    assert.ok(indice.modulos.every((m) => !('jornadas' in m)));
    const vendas = await carregarConteudoModulo('vendas');
    assert.equal(vendas.id, 'vendas');
    assert.equal(vendas.jornadas.inicial.length, SECOES.inicial.length);
    for (const id of ['../indice', 'indice', 'nao-existe', '__proto__', 'constructor', 'toString', null, 1]) assert.equal(await carregarConteudoModulo(id), null, String(id));
    assert.equal(await carregarConteudoModulo('vendas'), vendas, 'cache por módulo');
    assert.ok(modulosEmCache().includes('vendas'));
  });
  it('sem import attributes: base.js lê com readFileSync + JSON.parse e new URL(..., import.meta.url)', () => {
    const fonte = readFileSync(path.join(RAIZ, 'lib/conteudo/base.js'), 'utf8');
    assert.ok(!/with:\s*\{\s*type/.test(fonte) && !/assert:\s*\{\s*type/.test(fonte));
    assert.ok(fonte.includes("readFileSync") && fonte.includes('JSON.parse') && fonte.includes("new URL('./base/', import.meta.url)"));
    for (const n of readdirSync(PASTA_BASE)) assert.ok(!n.endsWith('.js'), n);
  });
  it('cache por módulo: cada arquivo é lido do disco uma vez só, e só quando pedido', async () => {
    const lidos = [];
    const c = criarCarregador({ pasta: pathToFileURL(PASTA_BASE + path.sep), ler: (url) => { lidos.push(path.basename(fileURLToPath(url))); return readFileSync(url, 'utf8'); } });
    await c.carregarIndice();
    await c.carregarIndice();
    assert.deepEqual(lidos, ['indice.json']);
    const a = await c.carregarConteudoModulo('estoque');
    const b = await c.carregarConteudoModulo('estoque');
    assert.equal(a, b);
    await c.carregarConteudoModulo('vendas');
    assert.deepEqual(lidos, ['indice.json', 'estoque.json', 'vendas.json']);
    assert.deepEqual(c.emCache(), ['estoque', 'vendas']);
  });
  it('path traversal: id é conferido contra o indice.json antes de montar o caminho (nada fora da lista toca o disco)', async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'base-trav-'));
    try {
      const pasta = path.join(tmp, 'base');
      await mkdir(pasta);
      await writeFile(path.join(pasta, 'indice.json'), JSON.stringify({ versao: 'x', modulos: [{ id: 'vendas' }, { id: '../segredo' }, { id: 'indice' }] }));
      await writeFile(path.join(pasta, 'vendas.json'), JSON.stringify({ versao: 'x', id: 'vendas', jornadas: {} }));
      await writeFile(path.join(pasta, 'extra.json'), JSON.stringify({ versao: 'x', id: 'extra', jornadas: {} })); // existe na pasta, mas não no índice
      await writeFile(path.join(tmp, 'segredo.json'), JSON.stringify({ id: '../segredo', segredo: true }));
      const lidos = [];
      const c = criarCarregador({ pasta: pathToFileURL(pasta + path.sep), ler: (url) => { lidos.push(fileURLToPath(url)); return readFileSync(url, 'utf8'); } });
      const tentativas = ['../segredo', '..%2Fsegredo', '../base/vendas', './vendas', 'vendas/../../segredo', '/etc/passwd', 'C:\\x', 'indice', 'extra', 'VENDAS', 'vendas.json', 'vendas\u0000', '__proto__', 'constructor', '', ' ', null, undefined, 1, {}, ['vendas']];
      for (const id of tentativas) assert.equal(await c.carregarConteudoModulo(id), null, String(id));
      assert.deepEqual(lidos.map((f) => path.relative(tmp, f)), [path.join('base', 'indice.json')]);
      assert.equal((await c.carregarConteudoModulo('vendas')).id, 'vendas');
      assert.ok(lidos.every((f) => f.startsWith(pasta + path.sep)));
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
  it('arquivo de módulo que não confere com o índice é recusado (e não fica em cache)', async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'base-conf-'));
    try {
      await writeFile(path.join(tmp, 'indice.json'), JSON.stringify({ versao: 'x', modulos: [{ id: 'vendas' }] }));
      await writeFile(path.join(tmp, 'vendas.json'), JSON.stringify({ versao: 'x', id: 'estoque', jornadas: {} }));
      const c = criarCarregador({ pasta: pathToFileURL(tmp + path.sep) });
      await assert.rejects(c.carregarConteudoModulo('vendas'), /não confere/);
      assert.deepEqual(c.emCache(), []);
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  });
  it('Relatórios e Alumina: em preparação, com a semente guardada em "retido"', () => {
    for (const id of ['relatorios', 'alumina']) {
      const m = BASE.modulos.find((x) => x.id === id);
      assert.equal(m.em_preparacao, true, id);
      assert.equal(m.subtitulo, null, id);
      assert.ok(m.materiais.every((x) => x.status === 'em-preparacao' && x.url === null), id);
      assert.ok([...m.jornadas.inicial, ...m.jornadas.consultor].every((s) => s.status === 'em-preparacao' && !s.blocos.length), id);
      assert.ok(m.retido && m.retido.jornadas, id);
    }
    assert.equal(BASE.modulos.filter((m) => m.em_preparacao).map((m) => m.id).join(), 'relatorios,alumina');
  });
  it('nenhum arquivo da base gerada tem crase, HTML, Markdown leve ou href inseguro (inclusive "retido")', () => {
    for (const n of readdirSync(PASTA_BASE).filter((x) => x.endsWith('.json'))) {
      const texto = readFileSync(path.join(PASTA_BASE, n), 'utf8');
      for (const proibido of ['`', '<', '**', 'javascript:']) assert.equal(texto.includes(proibido), false, `${n} tem ${proibido}`);
    }
  });
  it('crases do Harness viraram marcas: "tela" (glossário de telas) e "codigo" (o resto)', () => {
    const marcas = {};
    const contar = (v) => {
      if (Array.isArray(v)) v.forEach(contar);
      else if (v && typeof v === 'object') { if (typeof v.t === 'string' && v.marca) marcas[v.marca] = (marcas[v.marca] || 0) + 1; Object.values(v).forEach(contar); }
    };
    contar(BASE.modulos.map(({ retido, ...m }) => m));
    assert.ok(marcas.tela > 0 && marcas.codigo > 0, JSON.stringify(marcas));
    const vendas = JSON.stringify(BASE.modulos.find((m) => m.id === 'vendas').jornadas);
    assert.ok(vendas.includes('{"t":"Vendas > Pedidos de Venda","marca":"tela"}'));
  });
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
    const nova = await gerar({ harness: HARNESS, versao: BASE.versao });
    const dif = await compararPasta(PASTA_BASE, serializarBase(nova));
    assert.deepEqual(dif, { desatualizados: [], faltando: [], sobrando: [] }, 'base desatualizada: rode node scripts/gerar-base-conhecimento.mjs --harness <pasta>');
  });
});

describe('v3.1 — relatório de telas inferidas e Harness ausente', () => {
  const base = montarBase({ harness: harnessFicticio(), guia: guiaFicticio(), versao: VERSAO_FICTICIA, mapa: MAPA_FICTICIO });

  it('casos inferidos pelo módulo aparecem no relatório, separados do glossário', () => {
    assert.deepEqual(base.marcas.telas_inferidas, [{ texto: 'Estoque > Locais', modulo: 'estoque', ocorrencias: 1 }]);
    assert.equal(base.marcas.tela_modulo, 1);
    assert.ok(base.marcas.tela_glossario >= 1, 'match do glossário (Vendas > Pedidos) contado à parte');
    const linhas = linhasMarcas(base.marcas);
    assert.match(linhas[0], /pelo glossário · 1 inferidas pelo módulo/);
    assert.ok(linhas.some((l) => l.includes('"Estoque > Locais" · módulo estoque · 1×')));
    assert.ok(!linhas.some((l) => l.includes('Configurações > Empresas')), 'codigo não entra no relatório');
    const leia = serializarBase(base)['LEIA-ME.md'];
    assert.match(leia, /## Telas inferidas pelo módulo/);
    assert.match(leia, /\| Estoque > Locais \| estoque \| 1 \|/);
    assert.ok(!('marcas' in indiceDaBase(base)), 'relatório fica fora do indice.json');
  });

  const rodar = (args, env) => spawnSync(process.execPath, [path.join(RAIZ, 'scripts/gerar-base-conhecimento.mjs'), ...args], { encoding: 'utf8', env, cwd: RAIZ });
  const semHarnessEnv = () => { const e = { ...process.env }; delete e.HARNESS_DIR; return e; };

  it('sem HARNESS_DIR nem --harness: --verificar e geração saem ≠ 0 com mensagem clara (nada gravado)', () => {
    const antes = readFileSync(path.join(PASTA_BASE, 'indice.json'), 'utf8');
    for (const args of [['--verificar'], ['--versao', '2026-01-01']]) {
      const r = rodar(args, semHarnessEnv());
      assert.notEqual(r.status, 0, `${args.join(' ')} deveria falhar`);
      assert.equal(r.status, 2);
      assert.ok(r.stderr.includes(MENSAGEM_SEM_HARNESS), r.stderr);
      assert.match(r.stderr, /HARNESS_DIR=/);
      assert.match(r.stderr, /--harness/);
    }
    assert.equal(readFileSync(path.join(PASTA_BASE, 'indice.json'), 'utf8'), antes);
  });

  it('pasta do Harness sem conhecimento/ também falha com mensagem clara', async () => {
    const tmp = await mkdtemp(path.join(os.tmpdir(), 'sem-harness-'));
    try {
      const r = rodar(['--verificar', '--harness', tmp], semHarnessEnv());
      assert.equal(r.status, 2);
      assert.match(r.stderr, /não tem "conhecimento\/"/);
    } finally { await rm(tmp, { recursive: true, force: true }); }
  });
});
