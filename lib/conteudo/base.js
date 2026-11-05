/* Acesso à base de conhecimento gerada (lib/conteudo/base/, um JSON por módulo + índice).
   Tudo sob demanda (review v1 do Lead, item 7): nada é lido na carga do módulo, então a função da Vercel
   não paga o parse da base inteira no cold start. O índice (~resumo) é lido na 1ª chamada a /api/conteudo;
   o conteúdo de cada módulo só quando alguém abre aquele módulo. O import() de cada arquivo é estático
   (lib/conteudo/base/carregar.js, gerado), para o rastreador de arquivos da Vercel incluir os JSON no deploy. */
import { carregarIndiceJson, MODULOS } from './base/carregar.js';

let indice = null;
const conteudos = new Map();

const padrao = (m) => m.default;

/** Índice: { versao, gerado_de, modulos: [cabeçalho + materiais, sem jornadas], caminhos, pendencias }. */
export function carregarIndice() {
  if (!indice) indice = carregarIndiceJson().then(padrao).catch((e) => { indice = null; throw e; });
  return indice;
}

/** Conteúdo de um módulo: { versao, id, jornadas, retido? } ou null se o id não existe na base (sem tocar no disco). */
export function carregarConteudoModulo(id) {
  if (typeof id !== 'string' || !Object.hasOwn(MODULOS, id)) return Promise.resolve(null);
  if (!conteudos.has(id)) conteudos.set(id, MODULOS[id]().then(padrao).catch((e) => { conteudos.delete(id); throw e; }));
  return conteudos.get(id);
}

/** Base completa em memória (índice + jornadas de todos os módulos): testes e scripts, nunca a rota. */
export async function carregarBaseCompleta() {
  const ind = await carregarIndice();
  const modulos = await Promise.all(ind.modulos.map(async (m) => {
    const c = await carregarConteudoModulo(m.id);
    return { ...m, jornadas: c.jornadas, ...(c.retido ? { retido: c.retido } : {}) };
  }));
  return { ...ind, modulos };
}
