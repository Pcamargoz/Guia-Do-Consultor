/* Leitura das fontes da base de conhecimento (só Node, usado pelo gerador; nunca pela API).
   Harness Faktory Flow: SOMENTE LEITURA — este módulo só usa readFile/readdir/stat.
   Cada fonte é devolvida com o caminho que vai para `fontes` na base:
     harness:<caminho relativo à raiz do Harness>   (ex.: harness:conhecimento/produto/regras-negocio/regra-x.md)
     guia:<caminho relativo à raiz do repositório>[#id] */
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ehLixoMac = (nome) => nome.startsWith('._') || nome === '.DS_Store';

async function existe(caminho) {
  try { await stat(caminho); return true; } catch { return false; }
}

async function listar(pasta, filtro = () => true) {
  if (!(await existe(pasta))) return [];
  const nomes = await readdir(pasta);
  return nomes.filter((n) => !ehLixoMac(n) && filtro(n)).sort();
}

/* ---------- Markdown com frontmatter (formato do Harness) ---------- */

function valorYaml(bruto) {
  const v = bruto.trim();
  if (v === 'null' || v === '~' || v === '') return null;
  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  }
  return v.replace(/^["']|["']$/g, '');
}

/** Frontmatter simples (chave: valor, listas em [a, b]) + corpo. Sem dependência de YAML. */
export function lerFrontmatter(texto) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(texto);
  if (!m) return { meta: {}, corpo: texto };
  const meta = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(linha);
    if (kv) meta[kv[1]] = valorYaml(kv[2]);
  }
  return { meta, corpo: m[2] };
}

/** Seções `## Título` → texto (parágrafos juntados por \n\n, sem o título). */
export function secoesMarkdown(corpo) {
  const secoes = {};
  let atual = null;
  for (const linha of corpo.split(/\r?\n/)) {
    const t = /^##\s+(.+?)\s*$/.exec(linha);
    if (t) { atual = t[1]; secoes[atual] = []; continue; }
    if (/^#\s/.test(linha)) { atual = null; continue; }
    if (atual) secoes[atual].push(linha);
  }
  for (const k of Object.keys(secoes)) secoes[k] = secoes[k].join('\n').trim();
  return secoes;
}

async function lerDocumentos(raiz, relativa) {
  const pasta = path.join(raiz, relativa);
  const docs = [];
  for (const nome of await listar(pasta, (n) => n.endsWith('.md') && n !== 'LEIA-ME.md')) {
    const { meta, corpo } = lerFrontmatter(await readFile(path.join(pasta, nome), 'utf8'));
    if (!meta.id || meta.status !== 'vigente') continue; // mesma regra de ingestão do Harness
    docs.push({
      id: meta.id,
      titulo: meta.titulo || meta.id,
      tipo: meta.tipo || null,
      modulos: Array.isArray(meta.modulos) ? meta.modulos : [],
      confianca: meta.confianca || null,
      versao: meta.versao || null,
      secoes: secoesMarkdown(corpo),
      fonte: `harness:${relativa}/${nome}`,
    });
  }
  return docs;
}

/** Glossário de telas (YAML em lista): extrai id, nome, modulo, caminho, confianca. */
export function lerGlossarioTelas(texto) {
  const telas = [];
  let atual = null;
  for (const linha of texto.split(/\r?\n/)) {
    const novo = /^- id:\s*(.+)$/.exec(linha);
    if (novo) { atual = { id: valorYaml(novo[1]) }; telas.push(atual); continue; }
    if (!atual) continue;
    const campo = /^ {2}(nome|modulo|caminho|confianca):\s*(.+)$/.exec(linha);
    if (campo) atual[campo[1]] = valorYaml(campo[2]);
  }
  return telas.filter((t) => t.id && t.nome && t.modulo);
}

/** Mapa "prefixo/pasta → módulo(s)" dos _pasta.meta.yaml (bloco indentado sob `chave:`). */
export function lerMapaMeta(texto, chave) {
  const mapa = {};
  const linhas = texto.split(/\r?\n/);
  const i = linhas.findIndex((l) => l.trim() === `${chave}:`);
  if (i < 0) return mapa;
  for (const linha of linhas.slice(i + 1)) {
    const m = /^\s{2,}"?([^":]+)"?:\s*(.+)$/.exec(linha);
    if (!m) break;
    const v = valorYaml(m[2]);
    mapa[m[1]] = Array.isArray(v) ? v : [v];
  }
  return mapa;
}

/** Lê o Harness (somente leitura). `raiz` = pasta Harness-Arquitetura-Flow. */
export async function carregarHarness(raiz) {
  const C = 'conhecimento';
  if (!(await existe(path.join(raiz, C)))) throw new Error(`Harness não encontrado em ${raiz} (falta a pasta ${C}/).`);

  const [regras, funcional, procedimentos, faq, metodologia] = await Promise.all([
    lerDocumentos(raiz, `${C}/produto/regras-negocio`),
    lerDocumentos(raiz, `${C}/produto/funcional`),
    lerDocumentos(raiz, `${C}/produto/procedimentos`),
    lerDocumentos(raiz, `${C}/produto/faq`),
    lerDocumentos(raiz, `${C}/implantacao`),
  ]);

  const telasYaml = path.join(raiz, C, 'glossario', 'telas.yaml');
  const glossario = (await existe(telasYaml))
    ? lerGlossarioTelas(await readFile(telasYaml, 'utf8')).map((t) => ({ ...t, fonte: `harness:${C}/glossario/telas.yaml#${t.id}` }))
    : [];

  const pastaManuais = `${C}/Manuais_Faktory_Flow_Timbrados`;
  const metaManuais = path.join(raiz, pastaManuais, '_pasta.meta.yaml');
  const porPrefixo = (await existe(metaManuais)) ? lerMapaMeta(await readFile(metaManuais, 'utf8'), 'modulo_por_arquivo') : {};
  const manuais = (await listar(path.join(raiz, pastaManuais), (n) => n.endsWith('.docx') && !n.startsWith('~$')))
    .map((arquivo) => {
      const prefixo = Object.keys(porPrefixo).find((p) => arquivo.startsWith(p));
      return { arquivo, modulos: prefixo ? porPrefixo[prefixo] : [], fonte: `harness:${pastaManuais}/${arquivo}` };
    });

  const pastaRoteiros = `${C}/Roteiros Treinamento`;
  const metaRoteiros = path.join(raiz, pastaRoteiros, '_pasta.meta.yaml');
  const porPasta = (await existe(metaRoteiros)) ? lerMapaMeta(await readFile(metaRoteiros, 'utf8'), 'modulo_por_pasta') : {};
  const roteirosTreinamento = [];
  for (const pasta of await listar(path.join(raiz, pastaRoteiros), (n) => !n.includes('.'))) {
    for (const arquivo of await listar(path.join(raiz, pastaRoteiros, pasta), (n) => n.endsWith('.docx') && !n.startsWith('~$'))) {
      roteirosTreinamento.push({ pasta, arquivo, modulos: porPasta[pasta] || [], fonte: `harness:${pastaRoteiros}/${pasta}/${arquivo}` });
    }
  }

  return { regras, funcional, procedimentos, faq, metodologia, glossario, manuais, roteirosTreinamento };
}

/* ---------- Dados do Guia (repositório) ---------- */

/** Seed dos módulos no banco: db/migrations/002_modulos_iniciais.sql (id → dados). */
export function lerSeedModulos(sql) {
  const modulos = {};
  const re = /INSERT INTO modulos \(id, ordem, dados, status\) VALUES \('([a-z0-9-]+)', (\d+), '((?:[^']|'')*)'::jsonb/g;
  for (const m of sql.matchAll(re)) modulos[m[1]] = { ordem: Number(m[2]), ...JSON.parse(m[3].replace(/''/g, "'")) };
  return modulos;
}

/** Lê os dados já gerados do Harness que estão no repositório do Guia. */
export async function carregarGuia(raiz) {
  const importar = (rel) => import(pathToFileURL(path.join(raiz, rel)).href);
  const [estagiarios, fluxos, implantacao] = await Promise.all([
    importar('scripts/dados-checklists-estagiarios.mjs'),
    importar('scripts/dados-fluxos-estagiarios.mjs'),
    importar('scripts/dados-checklists-implantacao.mjs'),
  ]);
  const lerJson = async (rel) => JSON.parse(await readFile(path.join(raiz, rel), 'utf8'));
  const roteiros = {};
  for (const nome of await listar(path.join(raiz, 'videos/roteiros'), (n) => n.endsWith('.json'))) {
    const r = await lerJson(`videos/roteiros/${nome}`);
    roteiros[r.id || nome.replace(/\.json$/, '')] = { ...r, fonte: `guia:videos/roteiros/${nome}` };
  }
  const publicos = new Set();
  for (const pasta of ['videos', 'checklists/consultores', 'checklists/estagiarios', 'downloads']) {
    for (const nome of await listar(path.join(raiz, 'public', pasta))) publicos.add(`/${pasta}/${nome}`);
  }
  for (const video of await listar(path.join(raiz, 'public/telas'))) {
    for (const nome of await listar(path.join(raiz, 'public/telas', video))) publicos.add(`/telas/${video}/${nome}`);
  }
  return {
    estagiarios: { CHECKLISTS: estagiarios.CHECKLISTS, ONBOARDING: estagiarios.ONBOARDING },
    fluxosPrincipais: fluxos.FLUXOS_PRINCIPAIS,
    implantacao: implantacao.CHECKLISTS_IMPLANTACAO,
    roteiros,
    manifestVideos: await lerJson('public/videos/manifest.json'),
    seed: lerSeedModulos(await readFile(path.join(raiz, 'db/migrations/002_modulos_iniciais.sql'), 'utf8')),
    publicos: [...publicos].sort(),
  };
}
