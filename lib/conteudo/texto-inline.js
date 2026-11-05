/* Texto estruturado da base (decisão 4 da review v1 do Lead): nenhum HTML vem dos dados.
   O texto corrido vira uma lista de trechos [{ t, marca?, href? }]; o UI monta com textContent.
   Marcas: 'negrito', 'italico', 'link' (link exige href seguro), 'tela' e 'codigo' (v3). Sem marca = texto normal.
   O Markdown leve das fontes é convertido aqui, uma vez, no gerador:
     **x** → negrito · *x* → italico · [x](href) → link (href inseguro → texto sem link)
     `x`  → 'tela' se x é uma tela do glossário do Harness (conhecimento/glossario/telas.yaml; ver
            criarClassificadorTelas), senão 'codigo' (campo, valor, código como CFOP). A crase nunca chega ao cliente.
     <x>  → ‹x› (placeholder das fontes, como "<número>": nunca chega "<" ao cliente) */

export const MARCAS = Object.freeze(['negrito', 'italico', 'link', 'tela', 'codigo']);

const normalizarTela = (s) => String(s).replace(/\s*(?:›|>)\s*/g, ' › ').replace(/\s+/g, ' ').replace(/^\+\s*/, '').trim().toLowerCase();
const segmentos = (s) => normalizarTela(s).split(' › ').map((x) => x.replace(/^\+\s*/, '').trim()).filter(Boolean);

/** Normalização para comparar com módulos: sem acento, minúsculas, "-"/"_" viram espaço, espaços colapsados. */
export const normalizarNomeModulo = (s) => String(s).normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Nomes pelos quais um módulo do índice pode aparecer como 1º segmento de um caminho de menu
 * (todos passam por normalizarNomeModulo):
 *   - o id ("fluxo-completo" → "fluxo completo");
 *   - o título inteiro ("Relatórios e Análises");
 *   - o título até o primeiro " e " ou " — " ("Cadastros e Fundação" → "cadastros", "Alumina — IA" → "alumina",
 *     "Serviços e Instalação" → "servicos"), que é como o menu do sistema mostra o módulo.
 */
export function nomesDoModulo(m) {
  const nomes = new Set();
  if (typeof m?.id === 'string') nomes.add(normalizarNomeModulo(m.id));
  if (typeof m?.titulo === 'string') {
    nomes.add(normalizarNomeModulo(m.titulo));
    nomes.add(normalizarNomeModulo(m.titulo.split(/\s+(?:e|—|-)\s+/)[0]));
  }
  nomes.delete('');
  return nomes;
}

/**
 * Classificador de trechos entre crases.
 * `glossario` = telas do Harness ([{ nome, caminho? }]); `modulos` = módulos do índice ([{ id, titulo }]).
 * Comparação sem diferença de caixa/espaços, com ">" ou "›" como separador e "+ " inicial ignorado.
 *   1. Glossário (origem "glossario"): o trecho é o `nome` de uma tela, o `caminho` inteiro dela, ou um caminho
 *      de menu cujo último segmento é o `nome` de uma tela (ex.: "Vendas > Pedidos de Venda", "+ Novo Pedido").
 *   2. Inferido pelo módulo (origem "modulo", v3.1): fora do glossário, o trecho é um caminho de menu (tem ao menos
 *      um separador e 2+ segmentos) e o 1º segmento é um módulo do índice (ver nomesDoModulo; sem acento).
 *      Ex.: "Estoque > Movimentos" → tela (módulo estoque). Estes casos saem numa seção própria do relatório do
 *      gerador para conferir depois com o telas.yaml.
 *   3. O resto é 'codigo' (campos, botões, valores, códigos, "⋯ > Faturar", "Configurações > Empresas").
 * A função devolvida tem `.origem(trecho)` → { tipo: 'glossario' } | { tipo: 'modulo', modulo } | null.
 */
export function criarClassificadorTelas(glossario = [], modulos = []) {
  const nomes = new Set();
  const caminhos = new Set();
  for (const t of glossario || []) {
    if (typeof t?.nome === 'string' && t.nome.trim()) nomes.add(normalizarTela(t.nome));
    if (typeof t?.caminho === 'string' && t.caminho.trim()) caminhos.add(segmentos(t.caminho).join(' › '));
  }
  const moduloPorNome = new Map();
  for (const m of modulos || []) for (const n of nomesDoModulo(m)) if (!moduloPorNome.has(n)) moduloPorNome.set(n, m.id);

  const origem = (trecho) => {
    const segs = segmentos(trecho);
    if (!segs.length) return null;
    if (caminhos.has(segs.join(' › ')) || nomes.has(segs.join(' › ')) || nomes.has(segs[segs.length - 1])) return { tipo: 'glossario' };
    if (segs.length >= 2 && /›|>/.test(String(trecho))) {
      const modulo = moduloPorNome.get(normalizarNomeModulo(segs[0]));
      if (modulo) return { tipo: 'modulo', modulo };
    }
    return null;
  };
  const marca = (trecho) => (origem(trecho) ? 'tela' : 'codigo');
  marca.origem = origem;
  return marca;
}

const SEM_GLOSSARIO = () => 'codigo';
/** Crase solta (sem par) não vira marca nenhuma: é removida para nunca chegar ao cliente. */
const semCrase = (t) => t.replace(/`/g, '');

/** Campos de texto corrido (viram trechos) e campos de rótulo (texto puro). */
export const CAMPOS_INLINE = Object.freeze(['texto', 'intro', 'nota', 'onde', 'confirmar', 'resumo']);
export const CAMPOS_ROTULO = Object.freeze(['titulo', 'rotulo', 'selo']);

const CONTROLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const ENTIDADE = /&(?:[a-z][a-z0-9]*|#\d+|#x[0-9a-f]+);/i;

/**
 * href aceito nos dados: caminho do próprio site ("/x", sem "//"), hash ("#rota") ou https://.
 * Recusa javascript:, data:, vbscript:, http:, "//host", barras invertidas, espaços e caracteres de controle,
 * inclusive disfarçados com maiúsculas, espaços ou entidades.
 */
export function hrefSeguro(href) {
  if (typeof href !== 'string' || href === '' || href.length > 2000) return false;
  if (/[\s\\<>"'`]/.test(href) || CONTROLE.test(href) || ENTIDADE.test(href)) return false;
  if (href.startsWith('#')) return /^#[A-Za-z0-9/_.-]*$/.test(href);
  if (href.startsWith('/')) return !href.startsWith('//') && /^\/[A-Za-z0-9/_.~%+-]*(?:\?[A-Za-z0-9=&_.~%+-]*)?(?:#[A-Za-z0-9/_.-]*)?$/.test(href);
  try {
    const u = new URL(href);
    return u.protocol === 'https:' && !u.username && !u.password && href.toLowerCase().startsWith('https://');
  } catch { return false; }
}

/** Texto puro para rótulos: sem marcas de Markdown e sem "<" (placeholders viram ‹x›). */
export function textoPuro(texto) {
  if (typeof texto !== 'string') return texto ?? null;
  return limparAngulos(texto)
    .replace(/\[([^\]]+)\]\((?:[^()\s]|\([^()\s]*\))*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1');
}

function limparAngulos(texto) {
  return texto.replace(/<([^<>]*)>/g, '‹$1›').replace(/</g, '‹');
}

const juntar = (trechos) => {
  const saida = [];
  for (const tr of trechos) {
    if (!tr.t) continue;
    const ant = saida[saida.length - 1];
    if (ant && ant.marca === tr.marca && ant.href === tr.href) ant.t += tr.t;
    else saida.push({ ...tr });
  }
  return saida.map((tr) => {
    const o = { t: tr.t };
    if (tr.marca) o.marca = tr.marca;
    if (tr.href) o.href = tr.href;
    return o;
  });
};

/** Markdown leve → trechos. null/'' → null. Já-trechos passam direto (idempotente). */
export function paraInline(texto, { marcaDaCrase = SEM_GLOSSARIO } = {}) {
  if (Array.isArray(texto)) return texto;
  if (typeof texto !== 'string' || texto.trim() === '') return null;
  const fonte = limparAngulos(texto).replace(new RegExp(CONTROLE.source, 'g'), '');
  const trechos = [];
  // link | negrito | itálico (*x*, sem espaço colado no asterisco) | código
  const RE = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))*)\)|\*\*([^*]+?)\*\*|(?<![*\w])\*(?![\s*])([^*]+?)(?<!\s)\*(?![*\w])|`([^`]*)`/g;
  let fim = 0;
  for (const m of fonte.matchAll(RE)) {
    if (m.index > fim) trechos.push({ t: semCrase(fonte.slice(fim, m.index)) });
    if (m[1] !== undefined) {
      const rotulo = m[1].replace(/\*\*|`/g, '');
      trechos.push(hrefSeguro(m[2]) ? { t: rotulo, marca: 'link', href: m[2] } : { t: rotulo });
    } else if (m[3] !== undefined) trechos.push({ t: m[3].replace(/`/g, ''), marca: 'negrito' });
    else if (m[4] !== undefined) trechos.push({ t: m[4].replace(/`/g, ''), marca: 'italico' });
    else if (m[5].trim()) trechos.push({ t: m[5], marca: marcaDaCrase(m[5]) === 'tela' ? 'tela' : 'codigo' });
    fim = m.index + m[0].length;
  }
  if (fim < fonte.length) trechos.push({ t: semCrase(fonte.slice(fim)) });
  const r = juntar(trechos);
  return r.length ? r : null;
}

/** Texto corrido dos trechos (busca, aria-label, testes). */
export const textoDosTrechos = (trechos) => (Array.isArray(trechos) ? trechos.map((x) => x.t).join('') : '');

/** Problemas de um texto que vai ao cliente (rótulo ou trecho). */
export function problemasDoTexto(t) {
  const p = [];
  if (t.includes('<')) p.push('contém "<" (HTML não é aceito)');
  if (ENTIDADE.test(t)) p.push('contém entidade HTML');
  if (CONTROLE.test(t)) p.push('contém caractere de controle');
  if (/\*\*|`/.test(t)) p.push('sobrou marcação Markdown');
  if (/\[[^\]]*\]\([^)]*\)/.test(t)) p.push('sobrou link Markdown');
  return p;
}

/** Valida uma lista de trechos. Devolve lista de erros ("onde: problema"). */
export function validarInline(trechos, onde) {
  const erros = [];
  if (!Array.isArray(trechos) || !trechos.length) return [`${onde}: lista de trechos [{ t, marca?, href? }] não vazia`];
  trechos.forEach((tr, i) => {
    const o = `${onde}[${i}]`;
    if (!tr || typeof tr !== 'object' || Array.isArray(tr)) { erros.push(`${o}: deveria ser objeto`); return; }
    for (const k of Object.keys(tr)) if (!['t', 'marca', 'href'].includes(k)) erros.push(`${o}: campo fora do contrato "${k}"`);
    if (typeof tr.t !== 'string' || tr.t === '') erros.push(`${o}.t: texto não vazio`);
    else for (const pr of problemasDoTexto(tr.t)) erros.push(`${o}.t: ${pr}`);
    if ('marca' in tr && !MARCAS.includes(tr.marca)) erros.push(`${o}.marca: inválida "${tr.marca}"`);
    if ((tr.marca === 'tela' || tr.marca === 'codigo') && typeof tr.t === 'string' && tr.t.trim() === '') erros.push(`${o}.t: marca "${tr.marca}" sem texto`);
    if (tr.marca === 'link') {
      if (!hrefSeguro(tr.href)) erros.push(`${o}.href: inseguro ou ausente`);
    } else if ('href' in tr) erros.push(`${o}.href: só com marca "link"`);
  });
  return erros;
}

/** Valida um rótulo de texto puro (string ou null). */
export function validarRotulo(v, onde, { obrigatorio = false } = {}) {
  if (v === null || v === undefined) return obrigatorio ? [`${onde}: obrigatório`] : [];
  if (typeof v !== 'string') return [`${onde}: texto puro ou null`];
  if (obrigatorio && v.trim() === '') return [`${onde}: obrigatório`];
  return problemasDoTexto(v).map((p) => `${onde}: ${p}`);
}

/** Converte os campos de texto de um bloco (e de itens/passos) para trechos; rótulos para texto puro. */
export function estruturarBloco(bloco, opcoes = {}) {
  const conv = (obj) => {
    const novo = { ...obj };
    for (const c of CAMPOS_INLINE) if (c in novo) novo[c] = paraInline(novo[c], opcoes);
    for (const c of CAMPOS_ROTULO) if (typeof novo[c] === 'string') novo[c] = textoPuro(novo[c]);
    return novo;
  };
  const b = conv(bloco);
  if (b.tipo === 'tela' && typeof b.legenda === 'string') b.legenda = textoPuro(b.legenda);
  if (Array.isArray(b.itens)) b.itens = b.itens.map(conv);
  if (Array.isArray(b.passos)) b.passos = b.passos.map(conv);
  if (Array.isArray(b.etapas)) b.etapas = b.etapas.map(textoPuro);
  return b;
}
