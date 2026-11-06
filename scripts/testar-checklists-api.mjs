import fs from 'node:fs';
import crypto from 'node:crypto';
/* Teste de ponta a ponta da API de progresso e anexos dos checklists e do painel do administrador.
   Precisa do app rodando (docker compose up -d → http://localhost:8081) e do .env com o admin local.
   Uso: node scripts/testar-checklists-api.mjs   (TESTE_URL troca o endereço). Cria 2 usuários de teste e os remove no fim. */
const BASE = process.env.TESTE_URL || 'http://localhost:8081';
const env = Object.fromEntries(fs.readFileSync(new URL('../.env', import.meta.url), 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#') && l.includes('=')).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]));
let ok = 0, falhou = 0;
const t = (nome, cond, extra = '') => { if (cond) ok++; else { falhou++; console.log('  ✗', nome, extra); } };
async function req(cookie, metodo, url, { json, corpo, headers = {} } = {}) {
  const h = { ...headers }; if (cookie) h.cookie = cookie;
  let body = corpo; if (json !== undefined) { h['content-type'] = 'application/json'; body = JSON.stringify(json); }
  const r = await fetch(BASE + url, { method: metodo, headers: h, body });
  const tipo = r.headers.get('content-type') || '';
  const dados = tipo.includes('json') ? await r.json() : Buffer.from(await r.arrayBuffer());
  return { s: r.status, d: dados, h: r.headers, cookie: (r.headers.get('set-cookie') || '').split(';')[0] };
}
const login = async (u, s) => (await req(null, 'POST', '/api/auth/login', { json: { login: u, senha: s } }));
const admin = await login(env.ADMIN_USERNAME, env.ADMIN_PASSWORD);
t('login admin', admin.s === 200);
const senha = 'Ck!' + crypto.randomBytes(9).toString('base64url');
const sufixo = crypto.randomBytes(2).toString('hex');
const ids = [];
for (const n of ['a', 'b']) {
  const r = await req(admin.cookie, 'POST', '/api/usuarios', { json: { login: `ck-teste-${n}-${sufixo}`, nome: `Teste ${n}`, papel: 'estagiario', senha } });
  t(`criar usuário ${n}`, r.s === 201, JSON.stringify(r.d));
  ids.push(r.d.usuario?.id);
}
const A = (await login(`ck-teste-a-${sufixo}`, senha)).cookie, B = (await login(`ck-teste-b-${sufixo}`, senha)).cookie;
const CH = 'ff-estagiario:teste-api';
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');

t('sem login → 401', (await req(null, 'GET', `/api/checklists-progresso?chave=${CH}`)).s === 401);
let r = await req(A, 'GET', `/api/checklists-progresso?chave=${CH}`);
t('A: vazio no começo', r.s === 200 && r.d.dados === null && r.d.anexos.length === 0, JSON.stringify(r.d));
t('chave inválida → 400', (await req(A, 'GET', '/api/checklists-progresso?chave=../x')).s === 400);
t('dados inválidos → 400', (await req(A, 'PUT', `/api/checklists-progresso?chave=${CH}`, { json: { dados: [1], pct: 10 } })).s === 400);
const dados = { marcados: { 'f1-1': 1, 'f1-2': 1, 'ruim id': 1 }, regs: { 'f1-1': 'PV-33' }, obs: { 'f1-2': 'não abriu' }, validador: 'Ana', notas: 'oi', t: 111 };
r = await req(A, 'PUT', `/api/checklists-progresso?chave=${CH}`, { json: { dados, pct: 40 } });
t('A: salva', r.s === 200 && r.d.atualizadoEm, JSON.stringify(r.d));
r = await req(A, 'GET', `/api/checklists-progresso?chave=${CH}`);
t('A: lê o que salvou', r.d.dados.marcados['f1-1'] === 1 && r.d.dados.regs['f1-1'] === 'PV-33' && r.d.dados.obs['f1-2'] === 'não abriu' && r.d.dados.validador === 'Ana' && r.d.pct === 40);
t('id inválido descartado', !('ruim id' in r.d.dados.marcados));
t('B não vê o progresso de A', (await req(B, 'GET', `/api/checklists-progresso?chave=${CH}`)).d.dados === null);

const up = (c, item, bytes, tipo = 'image/png') => req(c, 'POST', `/api/checklists-anexos?chave=${CH}&item=${item}`, { corpo: bytes, headers: { 'content-type': tipo, 'x-nome': encodeURIComponent('print ção.png') } });
r = await up(A, 'f1-1', png);
t('A: anexa PNG', r.s === 201 && r.d.anexo.tipo === 'image/png' && r.d.anexo.nome === 'print ção.png', JSON.stringify(r.d));
const idAnexo = r.d.anexo?.id;
r = await req(A, 'GET', `/api/checklists-anexos?id=${idAnexo}`);
t('A: baixa a imagem igual', r.s === 200 && r.h.get('content-type') === 'image/png' && Buffer.compare(r.d, png) === 0);
t('imagem com nosniff/CSP', r.h.get('x-content-type-options') === 'nosniff' && /sandbox/.test(r.h.get('content-security-policy') || ''));
t('B não lê imagem de A', (await req(B, 'GET', `/api/checklists-anexos?id=${idAnexo}`)).s === 404);
t('B não apaga imagem de A', (await req(B, 'DELETE', `/api/checklists-anexos?id=${idAnexo}`)).s === 404);
t('sem login não lê imagem', (await req(null, 'GET', `/api/checklists-anexos?id=${idAnexo}`)).s === 401);
t('texto disfarçado de PNG → 415', (await up(A, 'f1-1', Buffer.from('<svg onload=alert(1)>'))).s === 415);
t('SVG real → 415', (await up(A, 'f1-1', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>'), 'image/svg+xml')).s === 415);
const grande = Buffer.concat([png, Buffer.alloc(1_600_000)]);
t('imagem > 1,5 MB → 413', (await up(A, 'f1-1', grande)).s === 413);
t('etapa inválida → 400', (await up(A, 'a b', png)).s === 400);
let ultimo;
for (let i = 0; i < 5; i++) ultimo = await up(A, 'f1-1', png); // já tem 1: a 6ª passa, a 7ª não
t('limite de 6 por etapa (6ª passa)', ultimo.s === 201, ultimo.s);
t('7ª na mesma etapa → 409', (await up(A, 'f1-1', png)).s === 409);
t('outra etapa continua aceitando', (await up(A, 'f1-2', png)).s === 201);
r = await req(A, 'POST', `/api/checklists-progresso?chave=${CH}`, { json: {} });
t('método não permitido → 405', r.s === 405);
const fora = await fetch(BASE + `/api/checklists-progresso?chave=${CH}`, { method: 'PUT', headers: { cookie: A, origin: 'https://evil.example', 'content-type': 'application/json' }, body: JSON.stringify({ dados, pct: 1 }) });
t('origem de outro site → 403', fora.status === 403);
r = await req(A, 'GET', '/api/checklists-progresso?lista=1');
const linha = r.d.itens.find((i) => i.chave === CH);
t('lista: pct e nº de imagens', linha && linha.pct === 40 && linha.anexos === 7, JSON.stringify(r.d));
r = await req(B, 'GET', '/api/checklists-progresso?lista=1');
t('lista de B vazia', r.d.itens.length === 0);

// Painel do administrador: só o perfil Administrador lê o progresso e os problemas de todos
t('painel: estagiário → 403', (await req(A, 'GET', '/api/checklists-admin')).s === 403);
t('painel: sem login → 401', (await req(null, 'GET', '/api/checklists-admin')).s === 401);
t('painel: imagem sem ser admin → 403', (await req(B, 'GET', `/api/checklists-admin?anexo=${idAnexo}`)).s === 403);
r = await req(admin.cookie, 'GET', '/api/checklists-admin');
const idA = ids[0];
const progA = r.d.progresso?.find((p) => p.usuario === idA && p.chave === CH);
t('painel: admin vê o progresso de A', r.s === 200 && progA && progA.pct === 40 && progA.marcados === 2 && progA.anexos === 7, JSON.stringify(progA));
const probA = r.d.problemas?.find((p) => p.usuario === idA && p.chave === CH);
t('painel: admin vê o problema de A com o registro', probA && probA.item === 'f1-2' && probA.problema === 'não abriu' && probA.anexos.length === 1, JSON.stringify(probA));
t('painel: resumo não traz os bytes das imagens', !JSON.stringify(r.d).includes('"dados"'));
r = await req(admin.cookie, 'GET', `/api/checklists-admin?anexo=${idAnexo}`);
t('painel: admin abre a imagem de A', r.s === 200 && r.h.get('content-type') === 'image/png' && Buffer.compare(r.d, png) === 0);
t('remove 1 imagem', (await req(A, 'DELETE', `/api/checklists-anexos?id=${idAnexo}`)).s === 200);
t('imagem removida some', (await req(A, 'GET', `/api/checklists-anexos?id=${idAnexo}`)).s === 404);
r = await req(A, 'DELETE', `/api/checklists-progresso?chave=${CH}`);
t('Recomeçar apaga tudo', r.s === 200);
r = await req(A, 'GET', `/api/checklists-progresso?chave=${CH}`);
t('depois de recomeçar: vazio', r.d.dados === null && r.d.anexos.length === 0, JSON.stringify(r.d));
for (const id of ids) if (id) await req(admin.cookie, 'DELETE', `/api/usuarios?id=${id}`);
console.log(`${ok} ok, ${falhou} falhas (usuários de teste removidos)`);
process.exit(falhou ? 1 : 0);
