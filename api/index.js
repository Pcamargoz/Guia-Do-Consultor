/* Faktory Flow — função única da API no Vercel.
   O plano Hobby limita a quantidade de funções por deploy, então todas as rotas /api/*
   chegam aqui (rewrite em vercel.json) e são despachadas para os handlers em lib/rotas/.
   Os endereços continuam os mesmos: /api/modulos, /api/auth/login etc. */
import * as authEu from '../lib/rotas/auth/eu.js';
import * as authLogin from '../lib/rotas/auth/login.js';
import * as authLogout from '../lib/rotas/auth/logout.js';
import * as configuracoesEstudo from '../lib/rotas/configuracoes-estudo.js';
import * as checklistsDownload from '../lib/rotas/checklists-download.js';
import * as duvidas from '../lib/rotas/duvidas.js';
import * as estudo from '../lib/rotas/estudo.js';
import * as guiaTextos from '../lib/rotas/guia-textos.js';
import * as manutencao from '../lib/rotas/manutencao.js';
import * as modulos from '../lib/rotas/modulos.js';
import * as pacotes from '../lib/rotas/pacotes.js';
import * as processos from '../lib/rotas/processos.js';
import * as usuarios from '../lib/rotas/usuarios.js';

const ROTAS = {
  'auth/eu': authEu,
  'auth/login': authLogin,
  'auth/logout': authLogout,
  'configuracoes-estudo': configuracoesEstudo,
  'checklists-download': checklistsDownload,
  duvidas,
  estudo,
  'guia-textos': guiaTextos,
  manutencao,
  modulos,
  pacotes,
  processos,
  usuarios,
};

/** Nome da rota: vem do rewrite (?__rota=) ou, sem rewrite, do próprio caminho /api/... */
function nomeDaRota(url) {
  const doRewrite = url.searchParams.get('__rota');
  const bruto = doRewrite ?? url.pathname.replace(/^\/api\/?/, '');
  return bruto.replace(/^\/+|\/+$/g, '').replace(/\.js$/, '');
}

async function despachar(request) {
  const url = new URL(request.url);
  const modulo = ROTAS[nomeDaRota(url)];
  if (!modulo) return Response.json({ erro: 'Rota não encontrada.' }, { status: 404 });
  const handler = modulo[request.method];
  if (!handler) return Response.json({ erro: 'Método não permitido.' }, { status: 405 });
  // O parâmetro interno ?__rota= é ignorado pelos handlers (eles só leem id, acao etc.).
  return handler(request);
}

export const GET = despachar;
export const POST = despachar;
export const PUT = despachar;
export const PATCH = despachar;
export const DELETE = despachar;
