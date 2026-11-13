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
  const location = { hash, pathname: '/', search: '' };
  const window = {
    addEventListener: (tipo, fn) => { (ouvintes[tipo] ||= []).push(fn); },
    dispatchEvent: (ev) => {
      eventos.push(ev);
      for (const fn of ouvintes[ev.type] || []) fn(ev);
      return !(ev.cancelable && ev.defaultPrevented);
    },
    ffIrParaLogin,
    // Endereço limpo: replace/pushState gravam a rota em state e a URL fica só no caminho (o # some).
    history: {
      state: null, chamadas: [], pilha: [],
      replaceState(estado, _titulo, url) { this.chamadas.push(['replace', url]); this.state = estado; location.hash = String(url).includes('#') ? String(url).slice(String(url).indexOf('#')) : ''; },
      pushState(estado, _titulo, url) { this.chamadas.push(['push', url]); this.pilha.push(this.state); this.state = estado; location.hash = String(url).includes('#') ? String(url).slice(String(url).indexOf('#')) : ''; },
    },
  };
  class CustomEvent {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
      this.cancelable = !!init.cancelable;
      this.defaultPrevented = false;
    }
    preventDefault() { if (this.cancelable) this.defaultPrevented = true; }
  }
  const contexto = {
    window, location, CustomEvent, AbortController, setTimeout, clearTimeout,
    fetch: fetchFalso || (async () => { throw new Error('sem rede'); }),
    addEventListener: window.addEventListener,
  };
  contexto.window.location = location;
  vm.createContext(contexto);
  vm.runInContext(CODIGO, contexto, { filename: 'plataforma-dados.js' });
  const mudarHash = (novo) => { location.hash = novo; for (const fn of ouvintes.hashchange || []) fn({ type: 'hashchange' }); };
  const voltar = () => { window.history.state = window.history.pilha.pop() ?? null; for (const fn of ouvintes.popstate || []) fn({ type: 'popstate' }); };
  const emitir = (tipo, detail, cancelable = false) => {
    const ev = new CustomEvent(tipo, { detail, cancelable });
    return { ev, seguir: window.dispatchEvent(ev) };
  };
  return { Plataforma: window.Plataforma, eventos, location, mudarHash, voltar, history: window.history, window, emitir, CustomEvent };
}
