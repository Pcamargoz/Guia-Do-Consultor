/* Teste da segurança básica: limite de requisições (429 + Retry-After) e cabeçalhos de segurança.
   Precisa do app rodando (docker compose up -d → http://localhost:8081). Usa um IP inventado (x-real-ip), que o
   servidor local aceita, para não bloquear o IP "local" de quem está desenvolvendo. No Vercel esse cabeçalho vem da
   borda e não dá para forjar. */
const BASE = process.env.TESTE_URL || 'http://localhost:8081';
const IP = `198.51.100.${Math.floor(Math.random() * 250) + 1}`;
let ok = 0, falhas = 0;
const conferir = (cond, nome) => { if (cond) ok++; else { falhas++; console.error('✖', nome); } };

// 1. Cabeçalhos de segurança na página e na API
for (const caminho of ['/login', '/api/auth/eu']) {
  const r = await fetch(BASE + caminho, { headers: { 'x-real-ip': IP }, redirect: 'manual' });
  const csp = r.headers.get('content-security-policy') || '';
  conferir(csp.includes("default-src 'self'") && csp.includes("frame-ancestors 'self'") && csp.includes("object-src 'none'"), `CSP em ${caminho}`);
  conferir(r.headers.get('x-content-type-options') === 'nosniff', `nosniff em ${caminho}`);
  conferir((r.headers.get('strict-transport-security') || '').includes('max-age='), `HSTS em ${caminho}`);
  conferir(!!r.headers.get('permissions-policy'), `Permissions-Policy em ${caminho}`);
}

// 2. Login: 10 tentativas por minuto por IP; a 11ª recebe 429 com Retry-After (usuário inexistente, senha errada)
const tentar = () => fetch(BASE + '/api/auth/login', {
  method: 'POST',
  headers: { 'x-real-ip': IP, 'content-type': 'application/json', origin: BASE },
  body: JSON.stringify({ login: `ninguem.${IP}`, senha: 'senha-errada-de-teste' }),
});
const status = [];
for (let i = 0; i < 10; i++) status.push((await tentar()).status);
conferir(status.every((s) => s !== 429), 'as 10 primeiras tentativas de login não são barradas pelo limite');
const barrada = await tentar();
conferir(barrada.status === 429, `11ª tentativa de login recebe 429 (veio ${barrada.status})`);
const espera = Number(barrada.headers.get('retry-after'));
conferir(espera >= 1 && espera <= 60, `Retry-After entre 1 e 60 s (veio ${espera})`);
conferir(typeof (await barrada.json()).erro === 'string', '429 traz mensagem de erro em JSON');

// 3. O limite é por IP: outro IP continua entrando normalmente
const outro = await fetch(BASE + '/api/auth/login', {
  method: 'POST',
  headers: { 'x-real-ip': `203.0.113.${Math.floor(Math.random() * 250) + 1}`, 'content-type': 'application/json', origin: BASE },
  body: JSON.stringify({ login: 'ninguem.outro', senha: 'senha-errada-de-teste' }),
});
conferir(outro.status !== 429, 'outro IP não é afetado pelo limite');

console.log(`${ok} ok, ${falhas} falhas`);
process.exit(falhas ? 1 : 0);
