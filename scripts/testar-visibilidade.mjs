/* Testes de visibilidade contra o app + PostgreSQL local (migration 013, doc 04).
   Uso (nunca imprime segredos):
     node --env-file=/workspace/equipe-frontend/.env.teste-local \
          --env-file=/workspace/equipe-frontend/trabalho/lead/qa-FE-20261104-01/.env.qa \
          scripts/testar-visibilidade.mjs
   Variáveis: TESTE_URL (default http://127.0.0.1:18800), logins/senhas de QA no .env.qa.
   Cobre estagiário, consultor e admin. */
import pg from 'pg';

const BASE = (process.env.TESTE_URL || 'http://127.0.0.1:18800').replace(/\/$/, '');
const PDF = '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf';
const VIDEO_ESTOQUE = '/videos/consultor-04-estoque.mp4';

const USUARIOS = {
  admin: { login: process.env.ADMIN_USERNAME || 'admin.exemplo', senha: process.env.ADMIN_PASSWORD },
  consultor: { login: 'consultora.exemplo', senha: process.env.QA_SENHA_CONSULTOR },
  estagiario: { login: 'estagiario.exemplo', senha: process.env.QA_SENHA_ESTAGIARIO },
};

let ok = 0;
let falhas = 0;
const conferir = (cond, nome) => {
  if (cond) {
    ok += 1;
    console.log('✔', nome);
  } else {
    falhas += 1;
    console.error('✖', nome);
  }
};

function mascarar(s) {
  if (s == null) return s;
  return String(s).replace(/postgres(ql)?:\/\/[^@\s]+@/gi, 'postgres://***@')
    .replace(/ff_sessao=[^;\s]+/gi, 'ff_sessao=***')
    .replace(/(senha|password|secret)=[^\s&]+/gi, '$1=***');
}

async function login(papel) {
  const u = USUARIOS[papel];
  if (!u?.senha) throw new Error(`Senha de QA ausente para ${papel} (carregue .env.qa).`);
  const r = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: BASE },
    body: JSON.stringify({ login: u.login, senha: u.senha }),
  });
  const set = r.headers.get('set-cookie') || '';
  const m = /ff_sessao=([^;]+)/.exec(set);
  if (!m) throw new Error(`Login ${papel} falhou (status ${r.status}).`);
  return m[1];
}

const cookie = (token) => ({ cookie: `ff_sessao=${token}` });

async function get(caminho, token, { redirect = 'manual' } = {}) {
  return fetch(`${BASE}${caminho}`, { headers: cookie(token), redirect });
}

async function api(caminho, token, { method = 'GET', body } = {}) {
  const r = await fetch(`${BASE}${caminho}`, {
    method,
    headers: {
      ...cookie(token),
      accept: 'application/json',
      ...(body ? { 'content-type': 'application/json', origin: BASE } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  let dados = null;
  try { dados = await r.json(); } catch { /* ignore */ }
  return { status: r.status, dados, headers: r.headers };
}

async function main() {
  console.log(`testar-visibilidade → ${BASE}`);

  // Confere migration 013 no banco local (sem imprimir a URL).
  const url = process.env.DATABASE_URL || '';
  if (!/@127\.0\.0\.1:\d+\//.test(url) && !/localhost:\d+\//.test(url)) {
    console.error('✖ DATABASE_URL não aponta para localhost — abortando (só banco de teste).');
    process.exit(2);
  }
  const client = new pg.Client({ connectionString: url });
  await client.connect();
  try {
    const { rows } = await client.query(
      `SELECT to_regclass('public.visibilidade') AS t, to_regclass('public.visibilidade_historico') AS h`,
    );
    conferir(!!rows[0]?.t && !!rows[0]?.h, 'migration 013: tabelas visibilidade e visibilidade_historico existem');
    const { rows: chaves } = await client.query('SELECT count(*)::int AS n FROM visibilidade');
    conferir(chaves[0].n >= 1, `tabela visibilidade tem linhas (n=${chaves[0].n})`);
  } finally {
    await client.end();
  }

  const tok = {
    admin: await login('admin'),
    consultor: await login('consultor'),
    estagiario: await login('estagiario'),
  };
  conferir(true, 'login dos 3 papéis (estagiário, consultor, admin)');

  // 1. Estagiário + apostila oculta → 404
  {
    const a = await get('/apostila', tok.estagiario);
    const p = await get(PDF, tok.estagiario);
    conferir(a.status === 404, `1. estagiário GET /apostila = 404 (veio ${a.status})`);
    conferir(p.status === 404, `1. estagiário GET PDF apostila = 404 (veio ${p.status})`);
  }

  // 2. Admin → 200 nos mesmos
  {
    const a = await get('/apostila', tok.admin);
    const p = await get(PDF, tok.admin);
    conferir(a.status === 200, `2. admin GET /apostila = 200 (veio ${a.status})`);
    conferir(p.status === 200, `2. admin GET PDF = 200 (veio ${p.status})`);
    const ccA = (a.headers.get('cache-control') || '').toLowerCase();
    const ccP = (p.headers.get('cache-control') || '').toLowerCase();
    conferir(ccA.includes('private') && ccA.includes('no-store'), `2b. /apostila Cache-Control private, no-store (veio "${ccA}")`);
    conferir(ccP.includes('private') && ccP.includes('no-store'), `2b. PDF Cache-Control private, no-store (veio "${ccP}")`);
  }

  // 5 (antes do 3 para poder ocultar): PUT por consultor = 403; por admin = 200
  {
    const c = await api('/api/visibilidade', tok.consultor, {
      method: 'PUT',
      body: { chave: 'modulo:estoque', visivel: false, perfis: ['estagiario', 'consultor'] },
    });
    conferir(c.status === 403, `5. PUT /api/visibilidade por consultor = 403 (veio ${c.status})`);

    const a = await api('/api/visibilidade', tok.admin, {
      method: 'PUT',
      body: { chave: 'modulo:estoque', visivel: false, perfis: ['estagiario', 'consultor'] },
    });
    conferir(a.status === 200 && a.dados?.chave === 'modulo:estoque', `5. PUT por admin = 200 e grava (status ${a.status})`);
  }

  // 3. Ocultar modulo:estoque → vídeo 404 e resumo sem estoque p/ não-admin
  {
    const vEst = await get(VIDEO_ESTOQUE, tok.estagiario);
    const vCon = await get(VIDEO_ESTOQUE, tok.consultor);
    conferir(vEst.status === 404, `3. estagiário vídeo estoque = 404 (veio ${vEst.status})`);
    conferir(vCon.status === 404, `3. consultor vídeo estoque = 404 (veio ${vCon.status})`);

    const resumoEst = await api('/api/conteudo', tok.estagiario);
    const resumoAdm = await api('/api/conteudo', tok.admin);
    const temEst = (r) => (r.dados?.modulos || []).some((m) => m.id === 'estoque');
    const estoqueAdm = (resumoAdm.dados?.modulos || []).find((m) => m.id === 'estoque');
    conferir(resumoEst.status === 200 && !temEst(resumoEst), '3. /api/conteudo estagiário sem módulo estoque');
    conferir(resumoAdm.status === 200 && estoqueAdm?.oculto === true, '3. /api/conteudo admin vê estoque com selo oculto');
  }

  // Rotas API protegidas (pacotes / estudo) — estagiário com valores iniciais: pacotes ok, estudo 403
  {
    const pac = await api('/api/pacotes', tok.estagiario);
    conferir(pac.status === 200, `área pacotes liberada p/ estagiário (GET /api/pacotes = ${pac.status})`);
    const ccPac = (pac.headers.get('cache-control') || '').toLowerCase();
    conferir(ccPac.includes('private') && ccPac.includes('no-store'), `API /api/pacotes Cache-Control private, no-store (veio "${ccPac}")`);
    const est = await api('/api/estudo?documento=apostila', tok.estagiario);
    conferir(est.status === 403, `área apostila oculta → GET /api/estudo = 403 (veio ${est.status})`);
    const duv = await api('/api/duvidas?escopo=minhas', tok.estagiario);
    conferir(duv.status === 403, `área apostila oculta → GET /api/duvidas = 403 (veio ${duv.status})`);
  }

  // 4. Reativar estoque → volta 200
  {
    const a = await api('/api/visibilidade', tok.admin, {
      method: 'PUT',
      body: { chave: 'modulo:estoque', visivel: true, perfis: ['estagiario', 'consultor'] },
    });
    conferir(a.status === 200, `4. reativar modulo:estoque (PUT admin = ${a.status})`);
    const v = await get(VIDEO_ESTOQUE, tok.estagiario);
    conferir(v.status === 200, `4. estagiário vídeo estoque = 200 após reativar (veio ${v.status})`);
    const resumo = await api('/api/conteudo', tok.estagiario);
    conferir((resumo.dados?.modulos || []).some((m) => m.id === 'estoque'), '4. resumo do estagiário volta a listar estoque');
  }

  // 6. Persistência: relê do banco a linha reativada
  {
    const client2 = new pg.Client({ connectionString: url });
    await client2.connect();
    try {
      const { rows } = await client2.query(
        `SELECT visivel, perfis FROM visibilidade WHERE chave = 'modulo:estoque'`,
      );
      conferir(rows[0]?.visivel === true, '6. modulo:estoque persiste visivel=true no banco');
      const { rows: hist } = await client2.query(
        `SELECT count(*)::int AS n FROM visibilidade_historico WHERE chave = 'modulo:estoque'`,
      );
      conferir(hist[0].n >= 1, `6. histórico de modulo:estoque gravado (n=${hist[0].n})`);
    } finally {
      await client2.end();
    }
  }

  console.log(mascarar(`${ok} ok, ${falhas} falhas`));
  process.exit(falhas ? 1 : 0);
}

main().catch((err) => {
  console.error('Falha:', mascarar(err.message || err));
  process.exit(2);
});
