/* Faktory Flow — Routing Middleware do Vercel.
   Todas as páginas e arquivos (inclusive o PDF da apostila) exigem login.
   Ficam públicos apenas a tela de login e o que ela precisa para carregar.
   As rotas /api fazem a própria verificação (respondem 401/403 em JSON).
   Conteúdo controlado (/apostila, /downloads da apostila, /videos, /checklists, /manuais):
   depois do login, confere a visibilidade do perfil e responde 404 se oculto (doc 04).
   Runtime nodejs: precisa de `pg` para ler a tabela visibilidade (cache 30 s em lib/visibilidade-dados.js;
   se o banco falhar, carregarLinhas devolve os valores iniciais — apostila continua oculta). */
import { next } from '@vercel/functions';
import { COOKIE_SESSAO, lerCookie, verificarSessao } from './lib/token.js';
import { carregarIndice } from './lib/conteudo/base.js';
import { caminhoControlado, caminhoVisivel, mapaEfetivo } from './lib/visibilidade.js';
import { carregarLinhas } from './lib/visibilidade-dados.js';

const PUBLICOS = new Set(['/login', '/login.html', '/login.css', '/login.js', '/brand-system.css', '/brand-motion.js', '/favicon.ico']);
const PREFIXOS_PUBLICOS = ['/assets/', '/api/'];

export const config = {
  matcher: '/:path*',
  runtime: 'nodejs',
};

export default async function middleware(request) {
  const url = new URL(request.url);
  const caminho = url.pathname;

  if (PUBLICOS.has(caminho) || PREFIXOS_PUBLICOS.some((p) => caminho.startsWith(p))) return next();

  const sessao = await verificarSessao(lerCookie(request, COOKIE_SESSAO)).catch(() => null);
  if (!sessao) {
    const login = new URL('/login', url);
    const destino = caminho + url.search + url.hash;
    if (destino && destino !== '/') login.searchParams.set('voltar', destino);
    return Response.redirect(login, 302);
  }

  if (caminhoControlado(caminho)) {
    const [linhas, indice] = await Promise.all([carregarLinhas(), carregarIndice()]);
    const mapa = mapaEfetivo(linhas, sessao.papel);
    if (!caminhoVisivel(caminho, mapa, indice.caminhos || {})) {
      return new Response('Não encontrado.', {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'private, no-store' },
      });
    }
  }

  return next();
}
