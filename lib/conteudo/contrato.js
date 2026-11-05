/* Validação do formato das respostas contra o contrato-componentes.md (§1 e §2), com os ajustes da v2
   (review v1 do Lead): texto corrido em trechos [{ t, marca?, href? }], nenhum HTML vindo dos dados,
   href/url só seguros (caminho do site, #rota ou https://).
   Usado nos testes e pelo gerador (a base gerada tem de produzir respostas válidas).
   Cada função devolve uma lista de erros ("caminho: problema"); lista vazia = válido. */
import { CAMPOS_INLINE, hrefSeguro, problemasDoTexto, validarInline, validarRotulo } from './texto-inline.js';

const TIPOS_MATERIAL = new Set(['video', 'manual', 'checklist', 'fluxo', 'tela', 'regra']);
const STATUS = new Set(['disponivel', 'em-preparacao']);
const JORNADAS = new Set(['inicial', 'consultor']);
const PERFIS = new Set(['estagiario', 'consultor']);
const CAMPOS_MATERIAL = ['id', 'tipo', 'jornada', 'titulo', 'status', 'url', 'duracao_s', 'fontes'];
const CAMPOS_MODULO = ['id', 'ordem', 'titulo', 'subtitulo', 'cor', 'icone', 'status', 'oculto', 'materiais'];
const CAMPOS_SECAO = ['id', 'titulo', 'status', 'blocos', 'fontes'];

const TIPOS_BLOCO = new Set(['texto', 'lista', 'passos', 'video', 'link', 'tela', 'fluxo', 'etapa', 'regra', 'checklist-aprendizado', 'progresso', 'fontes']);
/** Campos de URL do bloco. A legenda do vídeo é `legendas_url` (v3, .vtt); `legenda` da tela é texto puro. */
const CAMPOS_URL = ['url', 'poster', 'api'];

/** legendas_url: caminho do site ("/x.vtt", sem "//") ou https://…/x.vtt. Nada de http:, javascript:, #, nem outro formato. */
export function legendasUrlValida(v) {
  if (typeof v !== 'string' || !hrefSeguro(v) || !(v.startsWith('/') || v.startsWith('https://'))) return false;
  try { return new URL(v, 'https://base.invalido').pathname.toLowerCase().endsWith('.vtt'); } catch { return false; }
}
const ehTexto = (v) => typeof v === 'string' && v.trim() !== '';
const ehTextoOuNulo = (v) => v === null || typeof v === 'string';

function camposExatos(obj, campos, onde, erros) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) { erros.push(`${onde}: deveria ser objeto`); return false; }
  for (const c of campos) if (!(c in obj)) erros.push(`${onde}: falta o campo "${c}"`);
  for (const c of Object.keys(obj)) if (!campos.includes(c)) erros.push(`${onde}: campo fora do contrato "${c}"`);
  return true;
}

function validarFontes(fontes, onde, erros, exigir) {
  if (!Array.isArray(fontes) || fontes.some((f) => !ehTexto(f))) erros.push(`${onde}.fontes: lista de textos`);
  else if (exigir && !fontes.length) erros.push(`${onde}.fontes: item disponível sem fonte`);
}

export function validarMaterial(m, onde = 'material') {
  const erros = [];
  if (!camposExatos(m, CAMPOS_MATERIAL, onde, erros)) return erros;
  if (!/^[a-z0-9-]+:[a-z0-9-]+$/.test(m.id || '')) erros.push(`${onde}.id: formato <modulo>:<material>`);
  if (!TIPOS_MATERIAL.has(m.tipo)) erros.push(`${onde}.tipo: inválido "${m.tipo}"`);
  if (!JORNADAS.has(m.jornada)) erros.push(`${onde}.jornada: inválida "${m.jornada}"`);
  erros.push(...validarRotulo(m.titulo, `${onde}.titulo`, { obrigatorio: true }));
  if (!STATUS.has(m.status)) erros.push(`${onde}.status: inválido "${m.status}"`);
  if (!ehTextoOuNulo(m.url)) erros.push(`${onde}.url: texto ou null`);
  else if (m.url !== null && !hrefSeguro(m.url)) erros.push(`${onde}.url: insegura "${m.url}"`);
  if (m.status === 'disponivel' && !ehTexto(m.url)) erros.push(`${onde}.url: material disponível sem url`);
  if (m.status === 'em-preparacao' && m.url !== null) erros.push(`${onde}.url: em preparação deve ter url null`);
  if (!(m.duracao_s === null || (Number.isInteger(m.duracao_s) && m.duracao_s > 0))) erros.push(`${onde}.duracao_s: inteiro > 0 ou null`);
  if (m.tipo !== 'video' && m.duracao_s !== null) erros.push(`${onde}.duracao_s: só vídeo tem duração`);
  validarFontes(m.fontes, onde, erros, m.status === 'disponivel');
  return erros;
}

export function validarModuloResumo(m, onde = 'modulo') {
  const erros = [];
  if (!camposExatos(m, CAMPOS_MODULO, onde, erros)) return erros;
  if (!/^[a-z0-9-]+$/.test(m.id || '')) erros.push(`${onde}.id: kebab-case`);
  if (!Number.isInteger(m.ordem) || m.ordem < 0) erros.push(`${onde}.ordem: inteiro ≥ 0`);
  erros.push(...validarRotulo(m.titulo, `${onde}.titulo`, { obrigatorio: true }));
  erros.push(...validarRotulo(m.subtitulo, `${onde}.subtitulo`));
  if (!/^#[0-9a-fA-F]{6}$/.test(m.cor || '')) erros.push(`${onde}.cor: #RRGGBB`);
  if (!ehTexto(m.icone)) erros.push(`${onde}.icone: obrigatório`);
  if (!STATUS.has(m.status)) erros.push(`${onde}.status: inválido "${m.status}"`);
  if (typeof m.oculto !== 'boolean') erros.push(`${onde}.oculto: booleano`);
  if (!Array.isArray(m.materiais)) erros.push(`${onde}.materiais: lista`);
  else m.materiais.forEach((x, i) => erros.push(...validarMaterial(x, `${onde}.materiais[${i}]`)));
  return erros;
}

/** §1 resumo. `opcoes.admin = false` exige oculto=false em todos os módulos. */
export function validarResumo(r, opcoes = {}) {
  const erros = [];
  if (!camposExatos(r, ['versao', 'modulos'], 'resumo', erros)) return erros;
  if (!ehTexto(r.versao)) erros.push('resumo.versao: obrigatório');
  if (!Array.isArray(r.modulos)) { erros.push('resumo.modulos: lista'); return erros; }
  const ids = new Set();
  r.modulos.forEach((m, i) => {
    erros.push(...validarModuloResumo(m, `modulos[${i}]`));
    if (ids.has(m.id)) erros.push(`modulos[${i}].id: repetido "${m.id}"`);
    ids.add(m.id);
    if (opcoes.admin === false && m.oculto) erros.push(`modulos[${i}].oculto: só admin recebe oculto=true`);
  });
  return erros;
}

/** Campos de texto de um objeto do bloco (o próprio bloco, um item ou um passo). */
function validarCamposTexto(obj, onde, erros, { video = false } = {}) {
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'fontes' || k === 'itens' || k === 'passos' || k === 'etapas') continue;
    if (CAMPOS_INLINE.includes(k)) { if (v !== null) erros.push(...validarInline(v, `${onde}.${k}`)); continue; }
    if (k === 'legendas_url') {
      if (!video) erros.push(`${onde}.legendas_url: só bloco de vídeo`);
      else if (v !== null && !legendasUrlValida(v)) erros.push(`${onde}.legendas_url: deve ser /caminho ou https:// terminando em .vtt`);
      continue;
    }
    if (k === 'legenda' && video) { erros.push(`${onde}.legenda: no vídeo o campo é "legendas_url"`); continue; }
    if (CAMPOS_URL.includes(k)) {
      if (v !== null && !hrefSeguro(v)) erros.push(`${onde}.${k}: URL insegura ou inválida`);
      continue;
    }
    if (typeof v === 'string') erros.push(...validarRotulo(v, `${onde}.${k}`));
    else if (v !== null && typeof v === 'object') erros.push(`${onde}.${k}: objeto inesperado no bloco`);
  }
}

function validarBloco(b, onde, erros) {
  if (!b || typeof b !== 'object' || !ehTexto(b.tipo)) { erros.push(`${onde}: bloco sem tipo`); return; }
  if (!TIPOS_BLOCO.has(b.tipo)) erros.push(`${onde}.tipo: inválido "${b.tipo}"`);
  validarFontes(b.fontes, onde, erros, true);
  validarCamposTexto(b, onde, erros, { video: b.tipo === 'video' });
  if (b.tipo === 'texto' && b.texto === null) erros.push(`${onde}.texto: bloco de texto sem texto`);
  for (const lista of ['itens', 'passos']) {
    if (!(lista in b)) continue;
    if (!Array.isArray(b[lista])) { erros.push(`${onde}.${lista}: lista`); continue; }
    b[lista].forEach((it, i) => {
      const o = `${onde}.${lista}[${i}]`;
      if (!it || typeof it !== 'object' || Array.isArray(it)) { erros.push(`${o}: objeto`); return; }
      if (it.texto === null || it.texto === undefined) erros.push(`${o}.texto: obrigatório`);
      if ('fontes' in it) validarFontes(it.fontes, o, erros, false);
      validarCamposTexto(it, o, erros);
    });
  }
  if ('etapas' in b) {
    if (!Array.isArray(b.etapas)) erros.push(`${onde}.etapas: lista`);
    else b.etapas.forEach((e, i) => erros.push(...validarRotulo(e, `${onde}.etapas[${i}]`, { obrigatorio: true })));
  }
}

/** §1 detalhe ?modulo=&jornada= */
export function validarDetalhe(d) {
  const erros = [];
  if (!camposExatos(d, ['modulo', 'jornada', 'secoes'], 'detalhe', erros)) return erros;
  if (!JORNADAS.has(d.jornada)) erros.push(`detalhe.jornada: inválida "${d.jornada}"`);
  const cab = d.modulo && typeof d.modulo === 'object' ? d.modulo : null;
  if (!cab || !ehTexto(cab.id) || !ehTexto(cab.titulo)) erros.push('detalhe.modulo: objeto com id e titulo');
  if (!Array.isArray(d.secoes)) { erros.push('detalhe.secoes: lista'); return erros; }
  const esperado = d.jornada === 'inicial' ? [7, 8] : [10, 10];
  if (d.secoes.length < esperado[0] || d.secoes.length > esperado[1]) erros.push(`detalhe.secoes: ${d.jornada} deve ter ${esperado.join('–')} seções (tem ${d.secoes.length})`);
  d.secoes.forEach((s, i) => {
    const onde = `secoes[${i}]`;
    if (!camposExatos(s, CAMPOS_SECAO, onde, erros)) return;
    if (!ehTexto(s.id) || !ehTexto(s.titulo)) erros.push(`${onde}: id e titulo obrigatórios`);
    else erros.push(...problemasDoTexto(s.titulo).map((p) => `${onde}.titulo: ${p}`));
    if (!STATUS.has(s.status)) erros.push(`${onde}.status: inválido "${s.status}"`);
    if (!Array.isArray(s.blocos)) erros.push(`${onde}.blocos: lista`);
    else {
      if (s.status === 'disponivel' && !s.blocos.length) erros.push(`${onde}: disponível sem blocos`);
      s.blocos.forEach((b, j) => validarBloco(b, `${onde}.blocos[${j}]`, erros));
    }
    validarFontes(s.fontes, onde, erros, s.status === 'disponivel');
  });
  return erros;
}

/** §2 GET /api/visibilidade → { itens: { chave: boolean } } */
export function validarVisibilidadeEfetiva(v) {
  const erros = [];
  if (!camposExatos(v, ['itens'], 'visibilidade', erros)) return erros;
  if (!v.itens || typeof v.itens !== 'object' || Array.isArray(v.itens)) { erros.push('visibilidade.itens: objeto'); return erros; }
  for (const [k, val] of Object.entries(v.itens)) {
    if (!/^(area|tipo|modulo):[a-z0-9-]+$/.test(k)) erros.push(`itens: chave inválida "${k}"`);
    if (typeof val !== 'boolean') erros.push(`itens.${k}: booleano`);
  }
  return erros;
}

/** §2 GET ?todos=1 (admin) → [ { chave, visivel, perfis, atualizado_por_nome, atualizado_em } ] e item do PUT */
export function validarItemAdmin(item, onde = 'item') {
  const erros = [];
  if (!camposExatos(item, ['chave', 'visivel', 'perfis', 'atualizado_por_nome', 'atualizado_em'], onde, erros)) return erros;
  if (!/^(area|tipo|modulo):[a-z0-9-]+$/.test(item.chave || '')) erros.push(`${onde}.chave: inválida`);
  if (typeof item.visivel !== 'boolean') erros.push(`${onde}.visivel: booleano`);
  if (!Array.isArray(item.perfis) || item.perfis.some((p) => !PERFIS.has(p))) erros.push(`${onde}.perfis: estagiario/consultor`);
  if (!ehTextoOuNulo(item.atualizado_por_nome)) erros.push(`${onde}.atualizado_por_nome: texto ou null`);
  if (!(item.atualizado_em === null || (typeof item.atualizado_em === 'string' && !Number.isNaN(Date.parse(item.atualizado_em))))) erros.push(`${onde}.atualizado_em: data ISO ou null`);
  return erros;
}

export function validarListaAdmin(lista) {
  if (!Array.isArray(lista)) return ['lista: deveria ser array'];
  return lista.flatMap((item, i) => validarItemAdmin(item, `[${i}]`));
}
