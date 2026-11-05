/* Carrega public/plataforma-dados.js num contexto vm com window/location/fetch de mentira (sem navegador). */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ARQUIVO = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../../public/plataforma-dados.js');
const CODIGO = readFileSync(ARQUIVO, 'utf8');

export function carregarPlataforma({ hash = '', fetch: fetchFalso, ffIrParaLogin } = {}) {
  const ouvintes = {};
  const eventos = [];
  const location = { hash };
  const window = {
    addEventListener: (tipo, fn) => { (ouvintes[tipo] ||= []).push(fn); },
    dispatchEvent: (ev) => { eventos.push(ev); for (const fn of ouvintes[ev.type] || []) fn(ev); return true; },
    ffIrParaLogin,
    history: { state: null, chamadas: [], replaceState(estado, _titulo, url) { this.chamadas.push(url); location.hash = String(url).startsWith('#') ? url : location.hash; } },
  };
  class CustomEvent { constructor(type, init = {}) { this.type = type; this.detail = init.detail; } }
  const contexto = {
    window, location, CustomEvent, AbortController, setTimeout, clearTimeout,
    fetch: fetchFalso || (async () => { throw new Error('sem rede'); }),
    addEventListener: window.addEventListener,
  };
  contexto.window.location = location;
  vm.createContext(contexto);
  vm.runInContext(CODIGO, contexto, { filename: 'plataforma-dados.js' });
  const mudarHash = (novo) => { location.hash = novo; for (const fn of ouvintes.hashchange || []) fn({ type: 'hashchange' }); };
  return { Plataforma: window.Plataforma, eventos, location, mudarHash, history: window.history };
}
