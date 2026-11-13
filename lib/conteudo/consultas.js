/* Respostas de /api/conteudo no formato do contrato-componentes.md §1, já filtradas por perfil e visibilidade.
   Funções puras: recebem o ÍNDICE da base (lib/conteudo/base/indice.json: módulos sem as jornadas), o papel do
   usuário e as linhas da tabela `visibilidade`. O detalhe recebe também o conteúdo do módulo (base/<id>.json),
   carregado sob demanda pela rota só depois de `checarDetalhe` aprovar o pedido.
   Uma base completa (módulos com `jornadas`, como a de montarBase) também serve: o conteúdo sai do próprio módulo.
   `retido` (conteúdo guardado de módulo em preparação) nunca é lido aqui. */
import { CHAVE_DO_TIPO, mapaEfetivo, materialVisivel, moduloVisivel, ocultoParaOutros, chaveVisivel, AREA_DA_JORNADA, TIPOS_RECURSO, chaveDoRecurso, recursoVisivel } from '../visibilidade.js';

export const COR_PADRAO = '#3478A7'; // azul da marca (public/brand-system.css): apresentação, não conteúdo
export const JORNADAS = ['inicial', 'consultor'];

const CAMPOS_MATERIAL = ['id', 'tipo', 'jornada', 'titulo', 'status', 'url', 'duracao_s', 'fontes'];
const recorte = (obj, campos) => Object.fromEntries(campos.map((c) => [c, obj[c] ?? null]));

function cabecalhoModulo(m, materiaisVisiveis, admin, itens) {
  return {
    id: m.id,
    ordem: m.ordem,
    titulo: m.titulo,
    subtitulo: m.subtitulo ?? null,
    cor: m.cor || COR_PADRAO,
    icone: m.icone || m.id,
    status: !m.em_preparacao && materiaisVisiveis.some((x) => x.status === 'disponivel') ? 'disponivel' : 'em-preparacao',
    oculto: admin ? ocultoParaOutros(itens, `modulo:${m.id}`) : false,
  };
}

/**
 * Recursos da Metodologia (doc 14) já filtrados: recurso oculto para o perfil vira null (a tela mostra "indisponível",
 * sem revelar o material). Admin recebe todos, com `oculto` = nenhum perfil não-admin enxerga.
 */
function recursosVisiveis(m, mapa, admin, itens) {
  const saida = {};
  for (const tipo of TIPOS_RECURSO) {
    const r = m.recursos?.[tipo];
    if (!r) { saida[tipo] = null; continue; }
    if (!admin && !recursoVisivel(mapa, m.id, tipo)) { saida[tipo] = null; continue; }
    saida[tipo] = { ...r, fontes: [...(r.fontes || [])], oculto: admin ? ocultoParaOutros(itens, chaveDoRecurso(m.id, tipo)) : false };
  }
  return saida;
}

/** GET /api/conteudo → { versao, modulos: [...] } */
export function montarResumo(base, { papel, itens = [] }) {
  const admin = papel === 'admin';
  const mapa = mapaEfetivo(itens, papel);
  const modulos = [];
  for (const m of [...base.modulos].sort((a, b) => a.ordem - b.ordem)) {
    if (!admin && !moduloVisivel(mapa, m.id)) continue;
    const materiais = m.materiais.filter((x) => admin || materialVisivel(x, mapa));
    modulos.push({
      ...cabecalhoModulo(m, materiais, admin, itens),
      materiais: materiais.map((x) => ({ ...recorte(x, CAMPOS_MATERIAL), fontes: [...(x.fontes || [])] })),
      recursos: recursosVisiveis(m, mapa, admin, itens),
    });
  }
  // Biblioteca de Vídeos: tipo:video + area:videos; vídeo ligado a módulos só aparece se algum deles estiver visível.
  const videosLiberados = admin || (chaveVisivel(mapa, 'area:videos') && chaveVisivel(mapa, 'tipo:video'));
  const videos = !videosLiberados ? [] : (base.videos || [])
    .filter((v) => admin || !v.modulos.length || v.modulos.some((id) => moduloVisivel(mapa, id)))
    .map((v) => ({ ...v, modulos: admin ? [...v.modulos] : v.modulos.filter((id) => moduloVisivel(mapa, id)), fontes: [...(v.fontes || [])] }));
  return { versao: base.versao, modulos, videos };
}

function blocoVisivel(bloco, materiaisPorId, mapa, admin) {
  if (admin) return true;
  if (bloco.visibilidade && !chaveVisivel(mapa, bloco.visibilidade)) return false;
  if (bloco.material) {
    const m = materiaisPorId.get(bloco.material);
    return Boolean(m) && materialVisivel(m, mapa);
  }
  return true;
}

/**
 * Confere o pedido de detalhe SEM ler o conteúdo do módulo (a rota só carrega base/<id>.json se passar).
 * → null (ok) ou { status: 400|403|404, corpo: { erro } }. 403 = módulo ou área da jornada ocultos (contrato §1).
 */
export function checarDetalhe(indice, { modulo, jornada, papel, itens = [] }) {
  if (!JORNADAS.includes(jornada)) return { status: 400, corpo: { erro: 'Jornada inválida: use inicial ou consultor.' } };
  const m = typeof modulo === 'string' ? indice.modulos.find((x) => x.id === modulo) : null;
  if (!m) return { status: 404, corpo: { erro: 'Módulo não encontrado.' } };
  if (papel === 'admin') return null;
  const mapa = mapaEfetivo(itens, papel);
  if (!moduloVisivel(mapa, m.id) || !chaveVisivel(mapa, AREA_DA_JORNADA[jornada])) {
    return { status: 403, corpo: { erro: 'Este conteúdo não está disponível para o seu perfil.' } };
  }
  return null;
}

/**
 * GET /api/conteudo?modulo=<id>&jornada=inicial|consultor
 * → { status: 200, corpo: { modulo, jornada, secoes } } ou { status: 400|403|404, corpo: { erro } }.
 * `conteudo` = base/<id>.json ({ id, jornadas }); omitido → usa m.jornadas (base completa).
 */
export function montarDetalhe(indice, { modulo, jornada, papel, itens = [], conteudo }) {
  const recusa = checarDetalhe(indice, { modulo, jornada, papel, itens });
  if (recusa) return recusa;
  const m = indice.modulos.find((x) => x.id === modulo);
  const jornadas = conteudo ? (conteudo.id === m.id ? conteudo.jornadas : null) : m.jornadas;
  if (!jornadas || !Array.isArray(jornadas[jornada])) return { status: 500, corpo: { erro: 'Conteúdo do módulo indisponível.' } };
  const admin = papel === 'admin';
  const mapa = mapaEfetivo(itens, papel);
  const materiaisPorId = new Map(m.materiais.map((x) => [x.id, x]));
  const materiaisVisiveis = m.materiais.filter((x) => admin || materialVisivel(x, mapa));
  const secoes = jornadas[jornada].map((s) => {
    const blocos = m.em_preparacao ? [] : s.blocos.filter((b) => blocoVisivel(b, materiaisPorId, mapa, admin));
    const fontes = [...new Set(blocos.flatMap((b) => b.fontes || []))];
    return { id: s.id, titulo: s.titulo, status: blocos.length ? s.status : 'em-preparacao', blocos, fontes };
  });
  return { status: 200, corpo: { modulo: cabecalhoModulo(m, materiaisVisiveis, admin, itens), jornada, secoes } };
}

export { CHAVE_DO_TIPO };
