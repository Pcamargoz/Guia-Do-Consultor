/* Regra de visibilidade da plataforma (doc 04 da refatoração) — funções PURAS, sem banco.
   As rotas e o middleware carregam as linhas da tabela `visibilidade` e passam para estas funções.
   Regra efetiva: visível ao usuário se papel = admin OU (visivel E papel ∈ perfis).
   Um material só é visível se a ÁREA da jornada, o MÓDULO e o TIPO (quando o tipo tem chave) forem visíveis.
   Chave desconhecida = oculta para não-admin (falha fechada). */
import { IDS_MODULOS } from './conteudo/mapa-modulos.js';

export const PERFIS = ['estagiario', 'consultor'];
const TODOS = ['estagiario', 'consultor'];

/** Valores iniciais do doc 04 (também usados como fallback quando o banco falha: apostila continua oculta). */
/** Recursos de cada módulo na Metodologia (doc 14): um vídeo, um checklist e um manual. */
export const TIPOS_RECURSO = Object.freeze(['video', 'checklist', 'manual']);
export const chaveDoRecurso = (modulo, tipo) => `recurso:${modulo}-${tipo}`;

export const VALORES_INICIAIS = Object.freeze([
  // Metodologia (doc 14): as quatro seções. area:videos (abaixo) é a Biblioteca de Vídeos.
  { chave: 'area:metodologia', visivel: true, perfis: TODOS },
  { chave: 'area:manuais', visivel: true, perfis: TODOS },
  { chave: 'area:metodologia-ff', visivel: true, perfis: TODOS },
  // Áreas antigas: ficam no banco (nada é apagado), sem uso na navegação desde o doc 14.
  { chave: 'area:guia-inicial', visivel: true, perfis: TODOS },
  { chave: 'area:guia-consultor', visivel: true, perfis: TODOS },
  { chave: 'area:pacotes', visivel: true, perfis: TODOS },
  { chave: 'area:checklists', visivel: true, perfis: TODOS },
  { chave: 'area:videos', visivel: true, perfis: TODOS },
  { chave: 'area:apostila', visivel: false, perfis: TODOS },
  { chave: 'area:acervo', visivel: true, perfis: ['consultor'] },
  { chave: 'tipo:video', visivel: true, perfis: TODOS },
  { chave: 'tipo:manual', visivel: true, perfis: TODOS },
  { chave: 'tipo:checklist', visivel: true, perfis: TODOS },
  { chave: 'tipo:fluxo', visivel: true, perfis: TODOS },
  ...IDS_MODULOS.map((id) => ({ chave: `modulo:${id}`, visivel: true, perfis: TODOS })),
  ...IDS_MODULOS.flatMap((id) => TIPOS_RECURSO.map((tipo) => ({ chave: chaveDoRecurso(id, tipo), visivel: true, perfis: TODOS }))),
].map((i) => Object.freeze({ ...i, perfis: Object.freeze([...i.perfis]) })));

export const CHAVES = new Set(VALORES_INICIAIS.map((i) => i.chave));

/** Área de cada jornada e chave de cada tipo de material (tipos sem chave: tela, regra). */
export const AREA_DA_JORNADA = { inicial: 'area:guia-inicial', consultor: 'area:guia-consultor' };
export const CHAVE_DO_TIPO = { video: 'tipo:video', manual: 'tipo:manual', checklist: 'tipo:checklist', fluxo: 'tipo:fluxo' };

const ehPapel = (p) => p === 'admin' || PERFIS.includes(p);

/** Junta as linhas do banco com os valores iniciais (linha do banco vence; chave que não existe mais é ignorada). */
export function mesclarComPadrao(linhas = []) {
  const porChave = new Map(VALORES_INICIAIS.map((i) => [i.chave, { ...i, perfis: [...i.perfis] }]));
  for (const l of linhas || []) {
    if (!l || !CHAVES.has(l.chave)) continue;
    porChave.set(l.chave, {
      ...porChave.get(l.chave),
      ...l,
      visivel: l.visivel === true,
      perfis: Array.isArray(l.perfis) ? l.perfis.filter((p) => PERFIS.includes(p)) : [],
    });
  }
  return [...porChave.values()];
}

/** Item visível para o papel? (admin sempre vê). */
export function itemVisivel(item, papel) {
  if (papel === 'admin') return true;
  if (!item || !ehPapel(papel)) return false;
  return item.visivel === true && Array.isArray(item.perfis) && item.perfis.includes(papel);
}

/** Mapa efetivo { chave: boolean } para o usuário (formato do GET /api/visibilidade). */
export function mapaEfetivo(itens, papel) {
  const mapa = {};
  for (const item of mesclarComPadrao(itens)) mapa[item.chave] = itemVisivel(item, papel);
  return mapa;
}

/** Consulta segura num mapa efetivo: chave ausente = oculta. */
export const chaveVisivel = (mapa, chave) => mapa?.[chave] === true;

export const moduloVisivel = (mapa, moduloId) => chaveVisivel(mapa, `modulo:${moduloId}`);

/** Material visível: área da jornada + módulo + tipo (quando o tipo tem chave). */
export function materialVisivel(material, mapa) {
  if (!material) return false;
  const area = AREA_DA_JORNADA[material.jornada];
  if (!area || !chaveVisivel(mapa, area)) return false;
  if (!moduloVisivel(mapa, material.modulo)) return false;
  const tipo = CHAVE_DO_TIPO[material.tipo];
  return !tipo || chaveVisivel(mapa, tipo);
}

/** Recurso da Metodologia visível: área da Metodologia + módulo + tipo + o próprio recurso. */
export function recursoVisivel(mapa, modulo, tipo) {
  return chaveVisivel(mapa, 'area:metodologia') && moduloVisivel(mapa, modulo)
    && chaveVisivel(mapa, CHAVE_DO_TIPO[tipo]) && chaveVisivel(mapa, chaveDoRecurso(modulo, tipo));
}

/** "Oculto para os outros perfis": nenhum perfil não-admin enxerga a chave. */
export function ocultoParaOutros(itens, chave) {
  const item = mesclarComPadrao(itens).find((i) => i.chave === chave);
  return !PERFIS.some((p) => itemVisivel(item, p));
}

/** Valida o corpo do PUT /api/visibilidade. Retorna { ok, erro?, item? } (erro → 400). */
export function validarAtualizacao(corpo) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return { ok: false, erro: 'Envie { chave, visivel, perfis }.' };
  const { chave, visivel, perfis } = corpo;
  if (typeof chave !== 'string' || !CHAVES.has(chave)) return { ok: false, erro: 'Chave de visibilidade inválida.' };
  if (typeof visivel !== 'boolean') return { ok: false, erro: 'Informe visivel como verdadeiro ou falso.' };
  if (!Array.isArray(perfis) || perfis.some((p) => !PERFIS.includes(p)) || new Set(perfis).size !== perfis.length) {
    return { ok: false, erro: 'Perfis inválidos: use estagiario e/ou consultor.' };
  }
  return { ok: true, item: { chave, visivel, perfis: PERFIS.filter((p) => perfis.includes(p)) } };
}

/* ---------- Caminhos de arquivo (middleware): 404 em conteúdo oculto ---------- */

/**
 * Arquivos da apostila, um a um (review v1 do Lead, item 2): lista EXPLÍCITA, sem prefixo, para não pegar
 * outro arquivo por acidente. Saem todos de public/: a página (/apostila e /apostila.html, por causa do
 * cleanUrls), o Modo Estudo e a exportação em PDF (js/css) e o PDF baixável. Arquivo novo da apostila tem de
 * entrar aqui (o teste "lista da apostila cobre public/" falha se aparecer um apostila* fora da lista).
 */
export const CAMINHOS_APOSTILA = Object.freeze([
  '/apostila',
  '/apostila.html',
  '/apostila-estudo.js',
  '/apostila-estudo.css',
  '/apostila-pdf.js',
  '/apostila-pdf.css',
  '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf',
]);
const APOSTILA = new Set(CAMINHOS_APOSTILA.map((c) => c.toLowerCase()));
const PREFIXOS_CONTEUDO = { '/videos/': 'tipo:video', '/checklists/': 'tipo:checklist', '/manuais/': 'tipo:manual', '/metodologia/': 'area:metodologia-ff' };

/**
 * Caminho canônico para comparar: sem query/hash, %xx decodificado, "." e ".." resolvidos, "//" colapsado,
 * sem barra final. Caminho malformado → null (quem chama trata como controlado e oculto: falha fechada).
 */
export function normalizarCaminho(caminho) {
  if (typeof caminho !== 'string' || !caminho.startsWith('/')) return null;
  let p = caminho.split(/[?#]/)[0];
  try { p = decodeURIComponent(p); } catch { return null; }
  if (p.includes('\\') || /[\u0000-\u001F]/.test(p)) return null;
  try { p = new URL(p.replace(/\/{2,}/g, '/'), 'https://x.invalid').pathname; } catch { return null; }
  try { p = decodeURIComponent(p); } catch { return null; }
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
}

/** Arquivo da apostila? (comparação sem diferenciar maiúsculas, para não escapar por /Apostila.HTML) */
export const caminhoDaApostila = (caminho) => {
  const p = normalizarCaminho(caminho);
  return p === null || APOSTILA.has(p.toLowerCase());
};

/** Caminho que passa pela regra de visibilidade? (o middleware só consulta o banco para estes). */
export const caminhoControlado = (caminho) => {
  const p = normalizarCaminho(caminho);
  return p === null || APOSTILA.has(p.toLowerCase()) || Object.keys(PREFIXOS_CONTEUDO).some((pre) => p.startsWith(pre));
};

/**
 * Pode servir o arquivo? `caminhos` = indice.caminhos (caminho → [{ modulo, tipo }]) gerado da base.
 * - apostila (CAMINHOS_APOSTILA, lista explícita): area:apostila;
 * - /videos/, /checklists/, /manuais/: tipo do prefixo e, se o arquivo pertence a módulos, ao menos um módulo visível
 *   (vídeo compartilhado por dois módulos só some quando os dois estão ocultos).
 * - caminho malformado: oculto.
 * A área da jornada não entra aqui: o mesmo arquivo também é servido pelas abas Checklists e Vídeos.
 */
export function caminhoVisivel(caminho, mapa, caminhos = {}) {
  const p = normalizarCaminho(caminho);
  if (p === null) return false;
  if (APOSTILA.has(p.toLowerCase())) return chaveVisivel(mapa, 'area:apostila');
  const prefixo = Object.keys(PREFIXOS_CONTEUDO).find((pre) => p.startsWith(pre));
  if (!prefixo) return true;
  if (!chaveVisivel(mapa, PREFIXOS_CONTEUDO[prefixo])) return false;
  // Guias visuais (contrato-guia-visual.md): /manuais/<modulo>/… pertence ao módulo pela própria pasta.
  if (prefixo === '/manuais/') {
    const pasta = p.slice(prefixo.length).split('/')[0];
    if (pasta && Object.hasOwn(mapa, `modulo:${pasta}`) && !moduloVisivel(mapa, pasta)) return false;
    if (pasta && Object.hasOwn(mapa, chaveDoRecurso(pasta, 'manual')) && !chaveVisivel(mapa, chaveDoRecurso(pasta, 'manual'))) return false;
  }
  const donos = caminhos[p];
  if (!donos || !donos.length) return true;
  // Dono que é recurso da Metodologia também respeita a chave do recurso (vídeo oculto só naquele módulo).
  const doRecurso = (d) => !TIPOS_RECURSO.includes(d.tipo) || !Object.hasOwn(mapa, chaveDoRecurso(d.modulo, d.tipo)) || chaveVisivel(mapa, chaveDoRecurso(d.modulo, d.tipo));
  return donos.some((d) => moduloVisivel(mapa, d.modulo) && doRecurso(d));
}

/* ---------- Formato admin (GET ?todos=1 e resposta do PUT) ---------- */

const dataIso = (v) => {
  if (v === null || v === undefined || v === '') return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
};

/** Linha (do banco ou padrão) → item do contrato §2: { chave, visivel, perfis, atualizado_por_nome, atualizado_em }. */
export function itemAdmin(linha) {
  return {
    chave: linha.chave,
    visivel: linha.visivel === true,
    perfis: PERFIS.filter((p) => Array.isArray(linha.perfis) && linha.perfis.includes(p)),
    atualizado_por_nome: typeof linha.atualizado_por_nome === 'string' ? linha.atualizado_por_nome : null,
    atualizado_em: dataIso(linha.atualizado_em),
  };
}

/** Lista completa para o painel admin: todas as chaves conhecidas, na ordem dos valores iniciais. */
export const listaAdmin = (linhas) => mesclarComPadrao(linhas).map(itemAdmin);
