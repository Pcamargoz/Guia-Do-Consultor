/* Token de sessão assinado (HMAC-SHA256) usando Web Crypto.
   Funciona igual no middleware (Edge) e nas funções da API (Node.js). */

export const COOKIE_SESSAO = 'ff_sessao';
export const DURACAO_SESSAO_S = 12 * 60 * 60; // 12 horas

const encoder = new TextEncoder();

const paraBase64Url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const deBase64Url = (texto) => {
  const base64 = texto.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(texto.length / 4) * 4, '=');
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
};

function segredo() {
  const valor = globalThis.process?.env?.SESSION_SECRET;
  if (!valor || valor.length < 32) {
    throw new Error('Defina a variável de ambiente SESSION_SECRET com pelo menos 32 caracteres.');
  }
  return valor;
}

const chaves = new Map();
function chave() {
  const valor = segredo();
  if (!chaves.has(valor)) {
    chaves.set(valor, crypto.subtle.importKey('raw', encoder.encode(valor), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']));
  }
  return chaves.get(valor);
}

/** Cria o token para { sub, papel, v } com expiração. */
export async function assinarSessao({ sub, papel, v }) {
  const payload = { sub: String(sub), papel, v, exp: Math.floor(Date.now() / 1000) + DURACAO_SESSAO_S };
  const corpo = paraBase64Url(encoder.encode(JSON.stringify(payload)));
  const assinatura = await crypto.subtle.sign('HMAC', await chave(), encoder.encode(corpo));
  return `${corpo}.${paraBase64Url(assinatura)}`;
}

/** Retorna o payload se o token for autêntico e não expirado; senão null. */
export async function verificarSessao(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null;
  const [corpo, assinatura] = token.split('.');
  try {
    const valido = await crypto.subtle.verify('HMAC', await chave(), deBase64Url(assinatura), encoder.encode(corpo));
    if (!valido) return null;
    const payload = JSON.parse(new TextDecoder().decode(deBase64Url(corpo)));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function lerCookie(request, nome) {
  const cabecalho = request.headers.get('cookie') || '';
  for (const parte of cabecalho.split(';')) {
    const [k, ...v] = parte.trim().split('=');
    if (k === nome) return decodeURIComponent(v.join('='));
  }
  return null;
}
