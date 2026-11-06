/* Filtragem pura do menu lateral por perfil (FE-20261104-01 v3.8).
   Usada nos testes e como contrato do patch em public/guia-abas.js (Lead).
   Não depende de DOM: recebe grupos + predicado de área permitida. */

/**
 * @typedef {{ id: string, area: string }} ItemMenu
 * @typedef {{ id: string, titulo?: string | null, itens: ItemMenu[] }} GrupoMenu
 */

/**
 * Mantém só itens cuja área está permitida; o título do grupo só permanece
 * se o grupo tiver ao menos um item visível (e se havia título).
 * Grupos que ficam sem itens saem da lista.
 *
 * @param {GrupoMenu[]} grupos
 * @param {(area: string) => boolean} areaPermitida
 * @returns {GrupoMenu[]}
 */
export function filtrarMenuPorPerfil(grupos, areaPermitida) {
  if (!Array.isArray(grupos) || typeof areaPermitida !== 'function') return [];
  const saida = [];
  for (const g of grupos) {
    if (!g || !Array.isArray(g.itens)) continue;
    const itens = g.itens.filter((it) => it && typeof it.area === 'string' && areaPermitida(it.area));
    if (itens.length === 0) continue;
    const titulo = g.titulo ? g.titulo : null;
    saida.push({ id: g.id, ...(titulo ? { titulo } : {}), itens });
  }
  return saida;
}

/** Predicado alinhado ao roteador: inicio/admin sempre; demais via mapa { 'area:…': boolean }. */
export function areaPermitidaComMapa(mapa, chavesDaArea, area) {
  if (area === 'inicio' || area === 'admin') return true;
  if (!mapa) return true; // sem mapa ainda: não filtrar (servidor protege)
  const chave = chavesDaArea[area];
  if (!chave) return true;
  return mapa[chave] === true;
}

export const CHAVES_AREA_MENU = Object.freeze({
  inicial: 'area:guia-inicial',
  consultor: 'area:guia-consultor',
  acervo: 'area:acervo',
  pacotes: 'area:pacotes',
  checklist: 'area:checklists',
  videos: 'area:videos',
  apostila: 'area:apostila',
});

/** Grupos canônicos do menu da plataforma (contrato visual do guia-abas.js). */
export function gruposMenuPadrao() {
  return [
    {
      id: 'principal',
      itens: [
        { id: 'inicio', area: 'inicio' },
        { id: 'inicial', area: 'inicial' },
        { id: 'consultor', area: 'consultor' },
      ],
    },
    {
      id: 'ferramentas',
      titulo: 'Ferramentas',
      itens: [
        { id: 'pacotes', area: 'pacotes' },
        { id: 'checklist', area: 'checklist' },
        { id: 'videos', area: 'videos' },
        { id: 'apostila', area: 'apostila' },
      ],
    },
    {
      id: 'acervo',
      titulo: 'Acervo',
      itens: [
        { id: 'acervo', area: 'acervo' },
        // seções legadas do guia antigo (Introdução / Visão Geral…) compartilham a área acervo
        { id: 'visao-geral', area: 'acervo' },
        { id: 'implantacao', area: 'acervo' },
      ],
    },
  ];
}
