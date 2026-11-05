/* Acesso à base de conhecimento gerada (lib/conteudo/base/: indice.json + um JSON por módulo).
   v3 (Lead): sem import attributes. Leitura com fs.readFileSync + JSON.parse, caminho resolvido com
   new URL('./base/…', import.meta.url). Tudo sob demanda e com cache em memória:
   - o índice (basta para o resumo) é lido na 1ª chamada;
   - o JSON de um módulo só quando alguém abre aquele módulo, e uma vez só por instância da função.
   Segurança: o id do módulo é conferido contra a lista de ids do indice.json ANTES de montar o caminho
   (id fora da lista → null, sem tocar no disco). Assim não há como pedir "../x" ou outro arquivo da pasta.
   Deploy: o rastreador da Vercel pode não seguir o caminho montado em tempo de execução; o vercel.json
   deve incluir "lib/conteudo/base/**" em includeFiles (sugestão ao Lead). */
import { readFileSync } from 'node:fs';

const PASTA_PADRAO = new URL('./base/', import.meta.url);
const ID = /^[a-z0-9-]{1,60}$/;

/**
 * Cria um carregador sobre uma pasta (URL de diretório terminando em "/").
 * `ler(url)` é injetável para os testes contarem leituras de disco.
 */
export function criarCarregador({ pasta = PASTA_PADRAO, ler = (url) => readFileSync(url, 'utf8') } = {}) {
  let indice = null;
  let ids = null;
  const conteudos = new Map();

  const lerJson = (nome) => {
    const url = new URL(nome, pasta);
    if (!url.href.startsWith(pasta.href)) throw new Error('Caminho fora da pasta da base.'); // defesa extra
    return JSON.parse(ler(url));
  };

  function indiceSync() {
    if (!indice) {
      const lido = lerJson('indice.json');
      ids = new Set((lido.modulos || []).map((m) => m.id).filter((id) => typeof id === 'string' && ID.test(id) && id !== 'indice'));
      indice = lido;
    }
    return indice;
  }

  /** Índice: { versao, gerado_de, modulos: [cabeçalho + materiais, sem jornadas], caminhos, pendencias }. */
  async function carregarIndice() {
    return indiceSync();
  }

  /** Conteúdo de um módulo ({ versao, id, jornadas, retido? }) ou null se o id não está no índice. */
  async function carregarConteudoModulo(id) {
    if (typeof id !== 'string' || !ID.test(id)) return null;
    indiceSync();
    if (!ids.has(id)) return null;
    if (!conteudos.has(id)) {
      const c = lerJson(`./${id}.json`);
      if (!c || c.id !== id) throw new Error(`Arquivo do módulo "${id}" não confere com o índice.`);
      conteudos.set(id, c);
    }
    return conteudos.get(id);
  }

  /** Base completa em memória (índice + jornadas de todos os módulos): testes e scripts, nunca a rota. */
  async function carregarBaseCompleta() {
    const ind = indiceSync();
    const modulos = await Promise.all(ind.modulos.map(async (m) => {
      const c = await carregarConteudoModulo(m.id);
      return { ...m, jornadas: c.jornadas, ...(c.retido ? { retido: c.retido } : {}) };
    }));
    return { ...ind, modulos };
  }

  return { carregarIndice, carregarConteudoModulo, carregarBaseCompleta, emCache: () => [...conteudos.keys()] };
}

const padrao = criarCarregador();
export const { carregarIndice, carregarConteudoModulo, carregarBaseCompleta } = padrao;
export const modulosEmCache = padrao.emCache;
