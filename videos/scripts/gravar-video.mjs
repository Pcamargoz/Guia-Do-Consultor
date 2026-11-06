// Gravador de VÍDEO bruto do Faktory Flow (ambiente de teste) para os intros de módulo.
//
// Complementa gravar-telas.mjs, que só tira prints. Usa o mesmo perfil (.perfil-gravacao): a PESSOA faz o
// login na janela; o script nunca digita senha. Saída no padrão de midia/brutos/<modulo>/, 1920×1080, 30 fps.
//
// Uso:  node scripts/gravar-video.mjs [--url https://staging.flow.faktory.com.br] [--porta 3998]
// Comando: POST http://127.0.0.1:3998/  corpo JSON {"acao": "...", ...}
//   estado                      → url, título e se há gravação em andamento
//   goto {url}                  → navega
//   clicar {alvo} · passar {alvo} · rolar {y} · tecla {tecla} · esperar {ms}
//   ler {css?} · ver {arquivo}   → lê os controles visíveis; tira um print de conferência
//   iniciar {modulo, cena}      → grava em ../midia/brutos/<modulo>/<modulo>_bruto_<cena>_v01.mp4
//   parar                       → fecha o arquivo e devolve caminho e duração
//   fechar
// alvo: {role, name, exact?} | {text, exact?} | {css}, com {nth?} opcional.
// Este script não preenche campos de propósito: gravar com dados novos é decisão da pessoa, feita na janela.
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const URL_INICIAL = arg('url', 'https://staging.flow.faktory.com.br');
const PORTA = Number(arg('porta', 3998));
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FPS = 30;

const ctx = await chromium.launchPersistentContext(path.join(RAIZ, '.perfil-gravacao'), {
  executablePath: CHROME, headless: false, viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1, locale: 'pt-BR', args: ['--window-size=1960,1200'],
});
const page = ctx.pages()[0] ?? await ctx.newPage();
await page.goto(URL_INICIAL, { waitUntil: 'domcontentloaded' }).catch(() => {});

function localizar(a) {
  let l;
  if (a.role) l = page.getByRole(a.role, { name: a.name, exact: a.exact });
  else if (a.text) l = page.getByText(a.text, { exact: a.exact });
  else if (a.css) l = page.locator(a.css);
  else throw new Error('alvo sem role/text/css');
  return a.nth === undefined ? l.first() : l.nth(a.nth);
}

/* Sem deviceScaleFactor: com escala 1,2 o quadro do screencast vinha espremido, com faixa vazia à direita.
   Gravação: o Chrome manda quadros só quando a tela muda; um relógio de 30 fps repete o último quadro,
   para o arquivo sair com ritmo constante e a duração real. */
let g = null;
async function iniciar({ modulo, cena = 'c01' }) {
  if (g) throw new Error('já existe gravação em andamento');
  if (!/^[a-z0-9-]{2,40}$/.test(String(modulo)) || !/^[a-z0-9-]{1,20}$/.test(String(cena))) throw new Error('modulo ou cena inválidos');
  const pasta = path.resolve(RAIZ, '..', 'midia', 'brutos', modulo);
  fs.mkdirSync(pasta, { recursive: true });
  const arquivo = path.join(pasta, `${modulo}_bruto_${cena}_v01.mp4`);
  if (fs.existsSync(arquivo)) throw new Error(`não sobrescrevo gravação existente: ${arquivo}`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=1920:1080:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-r', String(FPS), arquivo], { stdio: ['pipe', 'ignore', 'inherit'] });
  const cdp = await ctx.newCDPSession(page);
  let ultimo = null;
  cdp.on('Page.screencastFrame', (f) => { ultimo = Buffer.from(f.data, 'base64'); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
  const t0 = Date.now();
  let quadros = 0;
  const relogio = setInterval(() => {
    const devidos = Math.floor(((Date.now() - t0) / 1000) * FPS);
    while (ultimo && quadros < devidos) { ff.stdin.write(ultimo); quadros++; }
  }, 1000 / FPS);
  g = { ff, cdp, relogio, arquivo, t0 };
  return { gravando: arquivo };
}
async function parar() {
  if (!g) throw new Error('nenhuma gravação em andamento');
  const { ff, cdp, relogio, arquivo, t0 } = g; g = null;
  clearInterval(relogio);
  await cdp.send('Page.stopScreencast').catch(() => {});
  await cdp.detach().catch(() => {});
  await new Promise((r) => { ff.on('close', r); ff.stdin.end(); });
  return { arquivo, segundos: Math.round((Date.now() - t0) / 100) / 10 };
}

const ACOES = {
  estado: async () => ({ url: page.url(), titulo: await page.title(), gravando: !!g }),
  goto: async ({ url }) => { await page.goto(url, { waitUntil: 'domcontentloaded' }); return { url: page.url() }; },
  clicar: async ({ alvo }) => { await localizar(alvo).click({ timeout: 8000 }); return { ok: true }; },
  passar: async ({ alvo }) => { await localizar(alvo).hover({ timeout: 8000 }); return { ok: true }; },
  rolar: async ({ y }) => { await page.mouse.move(900, 500); await page.mouse.wheel(0, Number(y) || 0); return { ok: true }; },
  tecla: async ({ tecla }) => { await page.keyboard.press(String(tecla)); return { ok: true }; },
  esperar: async ({ ms }) => { await page.waitForTimeout(Math.min(Number(ms) || 0, 30000)); return { ok: true }; },
  // Leitura para roteirizar: rótulos dos controles visíveis e print de conferência (sem clicar em nada).
  ler: async ({ css = 'button, a, [role="button"], [role="menuitem"], input' }) => page.$$eval(css, (els) => els
    .filter((e) => e.getClientRects().length).slice(0, 120)
    .map((e) => ({ t: e.tagName.toLowerCase(), r: e.getAttribute('aria-label') || e.title || e.placeholder || '', x: (e.textContent || '').trim().slice(0, 40), h: e.getAttribute('href') || '', i: e.querySelector('svg')?.getAttribute('class')?.match(/lucide-[a-z0-9-]+/)?.[0] || '' }))),
  ver: async ({ arquivo }) => { await page.screenshot({ path: arquivo, scale: 'css' }); return { arquivo }; },
  iniciar, parar,
  fechar: async () => { if (g) await parar(); setTimeout(async () => { await ctx.close(); process.exit(0); }, 100); return { ok: true }; },
};

http.createServer(async (req, res) => {
  let corpo = ''; for await (const c of req) corpo += c;
  let r, s = 200;
  try {
    const d = JSON.parse(corpo || '{}');
    if (!Object.hasOwn(ACOES, d.acao)) throw new Error(`ação desconhecida: ${d.acao}`);
    r = await ACOES[d.acao](d);
  } catch (e) { s = 400; r = { erro: e.message }; }
  res.writeHead(s, { 'content-type': 'application/json' }); res.end(JSON.stringify(r));
}).listen(PORTA, '127.0.0.1', () => console.log(`gravador em http://127.0.0.1:${PORTA}`));
