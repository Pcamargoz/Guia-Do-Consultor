// Gravador de telas do Faktory Flow (ambiente de teste) para os vídeos de fluxo.
//
// Abre uma janela do Chrome com um perfil só desta pasta (.perfil-gravacao). A PESSOA faz o login
// na janela; o script nunca digita senha. Depois, recebe comandos por HTTP local (127.0.0.1) e
// salva capturas em alta resolução com a posição dos elementos destacados (para o cursor e o zoom
// da animação).
//
// Uso:  node scripts/gravar-telas.mjs [--url https://dev.flow.faktory.com.br] [--porta 3999]
// Comando: POST http://127.0.0.1:3999/  corpo JSON {"acao": "...", ...}
//   goto {url} · url · texto · arvore {seletor?} · clicar {alvo} · preencher {alvo, valor}
//   escolher {alvo, valor} · tecla {tecla} · esperar {ms} · rolar {y}
//   captura {fluxo, nome, alvos?: [alvo], ocultar?: [alvo], mascarar?: [alvo]} · fechar
// alvo: {role, name, exact?} | {text, exact?} | {label} | {placeholder} | {css}, com {nth?} opcional.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const URL_INICIAL = arg('url', 'https://dev.flow.faktory.com.br');
const PORTA = Number(arg('porta', 3999));
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ESCALA = 1.2; // 1600×900 CSS → captura 1920×1080
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const ctx = await chromium.launchPersistentContext(path.join(RAIZ, '.perfil-gravacao'), {
  executablePath: CHROME, headless: false, viewport: { width: 1600, height: 900 },
  deviceScaleFactor: ESCALA, locale: 'pt-BR', args: ['--window-size=1640,1020'],
});
const page = ctx.pages()[0] ?? await ctx.newPage();
await page.goto(URL_INICIAL, { waitUntil: 'domcontentloaded' }).catch(() => {});

function localizar(a) {
  let l;
  if (a.role) l = page.getByRole(a.role, { name: a.name, exact: a.exact });
  else if (a.text) l = page.getByText(a.text, { exact: a.exact });
  else if (a.label) l = page.getByLabel(a.label, { exact: a.exact });
  else if (a.placeholder) l = page.getByPlaceholder(a.placeholder, { exact: a.exact });
  else if (a.css) l = page.locator(a.css);
  else throw new Error('alvo sem role/text/label/placeholder/css');
  if (a.todos) return l;
  return a.nth === undefined ? l.first() : l.nth(a.nth);
}

async function caixa(a) {
  const b = await localizar(a).boundingBox();
  return b && { x: Math.round(b.x * ESCALA), y: Math.round(b.y * ESCALA), w: Math.round(b.width * ESCALA), h: Math.round(b.height * ESCALA) };
}

const ACOES = {
  goto: async ({ url }) => { await page.goto(url, { waitUntil: 'domcontentloaded' }); await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {}); return { url: page.url() }; },
  url: async () => ({ url: page.url(), titulo: await page.title() }),
  texto: async () => ({ url: page.url(), texto: (await page.locator('body').innerText()).slice(0, 12000) }),
  arvore: async ({ seletor = 'body' }) => ({ url: page.url(), arvore: (await page.locator(seletor).first().ariaSnapshot()).slice(0, 20000) }),
  clicar: async ({ alvo }) => { await localizar(alvo).click({ timeout: 8000 }); await page.waitForTimeout(600); return { url: page.url() }; },
  preencher: async ({ alvo, valor }) => { await localizar(alvo).fill(String(valor), { timeout: 8000 }); return { ok: true }; },
  escolher: async ({ alvo, valor }) => { await localizar(alvo).selectOption(String(valor), { timeout: 8000 }); return { ok: true }; },
  tecla: async ({ tecla }) => { await page.keyboard.press(tecla); await page.waitForTimeout(300); return { ok: true }; },
  esperar: async ({ ms = 1000 }) => { await page.waitForTimeout(ms); return { ok: true }; },
  // arrastar com o mouse em passos (funciona com bibliotecas de arrastar e soltar que escutam pointer events)
  // nativo: arrastar HTML5 (dragTo); senão, mouse em passos até o centro do destino deslocado por dy (ex.: o corpo da coluna)
  arrastar: async ({ de, para, nativo = false, dy = 0 }) => {
    if (nativo) { await localizar(de).dragTo(localizar(para), { timeout: 8000 }); await page.waitForTimeout(800); return { ok: true }; }
    const a = await localizar(de).boundingBox(), b = await localizar(para).boundingBox();
    if (!a || !b) throw new Error('origem ou destino fora da tela');
    const x0 = a.x + a.width / 2, y0 = a.y + a.height / 2, x1 = b.x + b.width / 2, y1 = b.y + b.height / 2 + dy;
    await page.mouse.move(x0, y0);
    await page.mouse.down();
    await page.mouse.move(x0 + 12, y0 + 6, { steps: 4 });
    await page.waitForTimeout(150);
    await page.mouse.move(x1, y1, { steps: 30 });
    await page.waitForTimeout(250);
    await page.mouse.up();
    await page.waitForTimeout(800);
    return { ok: true };
  },
  // traz o elemento para a tela (funciona também quando a página rola dentro de um contêiner próprio)
  rolarAte: async ({ alvo, bloco = 'start' }) => {
    await localizar(alvo).evaluate((e, b) => e.scrollIntoView({ block: b, behavior: 'instant' }), bloco);
    await page.waitForTimeout(500);
    return { ok: true };
  },
  rolar: async ({ y = 0 }) => { await page.mouse.wheel(0, y); await page.waitForTimeout(400); return { ok: true }; },
  captura: async ({ fluxo, nome, alvos = [], ocultar = [], mascarar = [] }) => {
    const pasta = path.join(RAIZ, 'capturas', fluxo);
    fs.mkdirSync(pasta, { recursive: true });
    await page.mouse.move(1599, 899); // tira o cursor real de cima dos elementos
    await page.waitForTimeout(350);
    const caixas = [];
    for (const a of alvos) caixas.push({ alvo: a, caixa: await caixa(a).catch(() => null) });
    // ocultar: esconde o elemento (visibility) em vez de pintar por cima, para não cobrir avisos que fiquem na frente
    const escondidos = [];
    for (const a of ocultar) {
      const els = await localizar({ ...a, todos: true }).elementHandles().catch(() => []);
      for (const el of els) { await el.evaluate((e) => { e.dataset.vis = e.style.visibility; e.style.visibility = 'hidden'; }); escondidos.push(el); }
    }
    const arq = path.join(pasta, `${nome}.png`);
    // mascarar (Playwright `mask`): pinta o dado pessoal já no print, sem depender do `borrar` do roteiro; caret: 'hide'
    // tira o cursor de texto piscando dos campos (no print ele aparecia ou não conforme o instante)
    await page.screenshot({ path: arq, animations: 'disabled', caret: 'hide',
      mask: mascarar.map((a) => localizar({ ...a, todos: true })), maskColor: '#E9ECF1' });
    for (const el of escondidos) await el.evaluate((e) => { e.style.visibility = e.dataset.vis || ''; }).catch(() => {});
    const meta = { nome, url: page.url(), largura: 1920, altura: 1080, caixas, em: new Date().toISOString() };
    fs.writeFileSync(path.join(pasta, `${nome}.json`), JSON.stringify(meta, null, 1));
    return { arquivo: arq, caixas };
  },
  fechar: async () => { setTimeout(() => ctx.close().then(() => process.exit(0)), 100); return { ok: true }; },
};

http.createServer((req, res) => {
  let corpo = '';
  req.on('data', (c) => { corpo += c; });
  req.on('end', async () => {
    let r;
    try {
      const cmd = JSON.parse(corpo || '{}');
      const f = ACOES[cmd.acao];
      if (!f) throw new Error(`ação desconhecida: ${cmd.acao}`);
      r = { ok: true, ...(await f(cmd)) };
    } catch (e) { r = { ok: false, erro: String(e.message || e).split('\n')[0] }; }
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(r));
  });
}).listen(PORTA, '127.0.0.1', () => console.log(`gravador pronto em http://127.0.0.1:${PORTA} (faça o login na janela do Chrome)`));
