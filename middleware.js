/* Faktory Flow — Routing Middleware do Vercel.
   Todas as páginas e arquivos (inclusive o PDF da apostila) exigem login.
   Ficam públicos apenas a tela de login e o que ela precisa para carregar.
   As rotas /api fazem a própria verificação (respondem 401/403 em JSON). */
import { next } from '@vercel/functions';
import { COOKIE_SESSAO, lerCookie, verificarSessao } from './lib/token.js';

const PUBLICOS = new Set(['/login', '/login.html', '/login.css', '/login.js', '/brand-system.css', '/brand-motion.js', '/favicon.ico']);
const PREFIXOS_PUBLICOS = ['/assets/', '/api/'];

export const config = {
  matcher: '/:path*',
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const caminho = url.pathname;

  if (PUBLICOS.has(caminho) || PREFIXOS_PUBLICOS.some((p) => caminho.startsWith(p))) return next();

  const sessao = await verificarSessao(lerCookie(request, COOKIE_SESSAO)).catch(() => null);
  if (sessao) return next();

  const login = new URL('/login', url);
  const destino = caminho + url.search + url.hash;
  if (destino && destino !== '/') login.searchParams.set('voltar', destino);
  return Response.redirect(login, 302);
}
