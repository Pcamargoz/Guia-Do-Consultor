/* Servidor de desenvolvimento local que imita o Vercel:
   middleware.js → funções em /api (exports GET/POST/PUT/PATCH/DELETE) → arquivos de public/.
   Escuta em 127.0.0.1 por padrão (HOST=… para mudar). Uso: npm run dev */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLICO = path.join(RAIZ, 'public');
const PORTA = Number(process.env.PORT || 3000);
/** Loopback por padrão (não escuta em 0.0.0.0). Override: HOST=0.0.0.0 npm run dev */
const HOST = (process.env.HOST && String(process.env.HOST).trim()) || '127.0.0.1';
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.ico': 'image/x-icon', '.json': 'application/json',
};

const { default: middleware } = await import(pathToFileURL(path.join(RAIZ, 'middleware.js')));

// Cabeçalhos do vercel.json (segurança, CSP, cache), para testar localmente como em produção. As fontes de lá são
// simples ("/(.*)", "/(.*)\\.(css|js)", "/downloads/(.*)"), então viram expressão regular direto.
const REGRAS_CABECALHOS = JSON.parse(await readFile(path.join(RAIZ, 'vercel.json'), 'utf8')).headers
  .map((r) => ({ padrao: new RegExp(`^${r.source}$`), cabecalhos: r.headers }));

async function arquivoPublico(pathname) {
  const limpo = path.normalize(decodeURIComponent(pathname)).replace(/^([/\\])+/, '');
  const candidatos = pathname.endsWith('/') ? [path.join(limpo, 'index.html')] : [limpo, `${limpo}.html`];
  for (const c of candidatos) {
    const completo = path.join(PUBLICO, c);
    if (!completo.startsWith(PUBLICO)) return null;
    try { if ((await stat(completo)).isFile()) return completo; } catch { /* tenta o próximo */ }
  }
  return null;
}

async function tratar(request) {
  const url = new URL(request.url);

  // cleanUrls do vercel.json: /pagina.html → /pagina
  if (url.pathname.endsWith('.html')) {
    const destino = url.pathname === '/index.html' ? '/' : url.pathname.slice(0, -5);
    return new Response(null, { status: 308, headers: { Location: destino + url.search } });
  }

  const resposta = await middleware(request);
  if (resposta && !resposta.headers.get('x-middleware-next')) return resposta;

  // Cabeçalhos do next({ headers }) do middleware (ex.: Cache-Control em conteúdo controlado).
  const doMiddleware = {};
  if (resposta) {
    resposta.headers.forEach((v, k) => {
      if (k !== 'x-middleware-next') doMiddleware[k] = v;
    });
  }

  if (url.pathname.startsWith('/api/')) {
    // Como no Vercel: uma única função (api/index.js) despacha todas as rotas /api/*.
    const modulo = await import(pathToFileURL(path.join(RAIZ, 'api', 'index.js')));
    const handler = modulo[request.method];
    return handler ? handler(request) : Response.json({ erro: 'Método não permitido.' }, { status: 405 });
  }

  const arquivo = await arquivoPublico(url.pathname);
  if (!arquivo) return new Response('Não encontrado', { status: 404 });
  // Middleware vence no Cache-Control (Headers.forEach usa minúsculas — não misturar com Cache-Control).
  const { 'cache-control': ccMw, ...restoMw } = doMiddleware;
  const cabecalhos = {
    'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream',
    'Cache-Control': ccMw || 'no-cache',
    ...restoMw,
  };
  if (url.pathname.startsWith('/downloads/')) cabecalhos['Content-Disposition'] = 'attachment';
  return new Response(await readFile(arquivo), { headers: cabecalhos });
}

http.createServer(async (req, res) => {
  try {
    const corpo = ['GET', 'HEAD'].includes(req.method) ? undefined : await new Promise((ok, falha) => {
      const partes = []; req.on('data', (p) => partes.push(p)); req.on('end', () => ok(Buffer.concat(partes))); req.on('error', falha);
    });
    const cabecalhos = new Headers();
    for (const [k, v] of Object.entries(req.headers)) cabecalhos.set(k, Array.isArray(v) ? v.join(', ') : v);
    const request = new Request(`http://${req.headers.host}${req.url}`, { method: req.method, headers: cabecalhos, body: corpo });
    const resposta = await tratar(request);
    const saida = {};
    resposta.headers.forEach((v, k) => { if (k !== 'x-middleware-next') saida[k] = v; });
    const caminho = new URL(request.url).pathname;
    for (const regra of REGRAS_CABECALHOS) {
      if (!regra.padrao.test(caminho)) continue;
      for (const { key, value } of regra.cabecalhos) if (!(key.toLowerCase() in saida)) saida[key.toLowerCase()] = value;
    }
    const cookies = resposta.headers.getSetCookie?.() || [];
    if (cookies.length) saida['set-cookie'] = cookies;
    res.writeHead(resposta.status, saida);
    res.end(req.method === 'HEAD' ? undefined : Buffer.from(await resposta.arrayBuffer()));
  } catch (err) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erro interno no servidor de desenvolvimento.');
  }
}).listen(PORTA, HOST, () => console.log(`Faktory Flow (dev) em http://${HOST}:${PORTA}`));
