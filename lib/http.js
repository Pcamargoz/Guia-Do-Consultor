/* Utilidades HTTP das funções da API: respostas JSON, erros, cookies,
   proteção contra requisições de outros sites e autenticação por perfil. */
import { COOKIE_SESSAO, DURACAO_SESSAO_S, lerCookie, verificarSessao } from './token.js';
import { consulta } from './db.js';
import { PAPEIS, pode } from './permissoes.js';

export class ErroHttp extends Error {
  constructor(status, mensagem) { super(mensagem); this.status = status; }
}

export function json(status, corpo, cabecalhos = {}) {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...cabecalhos },
  });
}

const MAX_CORPO = 1024 * 1024;

export async function lerJson(request) {
  const tipo = request.headers.get('content-type') || '';
  if (!tipo.includes('application/json')) throw new ErroHttp(415, 'Envie os dados em JSON.');
  const texto = await request.text();
  if (texto.length > MAX_CORPO) throw new ErroHttp(413, 'Conteúdo grande demais.');
  if (!texto) return {};
  try { return JSON.parse(texto); } catch { throw new ErroHttp(400, 'JSON inválido.'); }
}

/** Bloqueia alterações vindas de outros sites (defesa contra CSRF, junto com SameSite=Lax). */
export function verificarOrigem(request) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) return;
  const origem = request.headers.get('origin');
  if (!origem) return;
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  let hostOrigem;
  try { hostOrigem = new URL(origem).host; } catch { hostOrigem = ''; }
  if (hostOrigem !== host) throw new ErroHttp(403, 'Origem da requisição não permitida.');
}

const usaHttps = (request) => (request.headers.get('x-forwarded-proto') || new URL(request.url).protocol.replace(':', '')) === 'https';

export function cookieSessao(request, token) {
  return [`${COOKIE_SESSAO}=${token}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${DURACAO_SESSAO_S}`, usaHttps(request) ? 'Secure' : ''].filter(Boolean).join('; ');
}

export function cookieSessaoExpirado(request) {
  return [`${COOKIE_SESSAO}=`, 'Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0', usaHttps(request) ? 'Secure' : ''].filter(Boolean).join('; ');
}

export const usuarioPublico = (u) => ({
  id: String(u.id),
  login: u.login,
  nome: u.nome || u.login,
  papel: u.papel,
  papelNome: PAPEIS[u.papel]?.nome || u.papel,
  permissoes: PAPEIS[u.papel]?.permissoes || [],
});

/**
 * Confere o cookie de sessão e recarrega o usuário do banco (papel e status atuais).
 * Sessões antigas deixam de valer quando a senha, o perfil ou o status do usuário mudam.
 */
export async function exigirUsuario(request, permissao = 'ver') {
  const payload = await verificarSessao(lerCookie(request, COOKIE_SESSAO));
  if (!payload) throw new ErroHttp(401, 'Sessão expirada. Faça login novamente.');
  const { rows } = await consulta(
    'SELECT id, login, nome, papel, ativo, sessao_versao FROM usuarios WHERE id = $1',
    [payload.sub],
  );
  const usuario = rows[0];
  if (!usuario || !usuario.ativo || usuario.sessao_versao !== payload.v) {
    throw new ErroHttp(401, 'Sessão encerrada. Faça login novamente.');
  }
  if (!pode(usuario.papel, permissao)) throw new ErroHttp(403, 'Seu perfil de acesso não permite esta ação.');
  return usuario;
}

/** Envolve um handler: trata erros conhecidos e registra os inesperados. */
export function rota(handler) {
  return async (request) => {
    try {
      verificarOrigem(request);
      return await handler(request);
    } catch (err) {
      if (err instanceof ErroHttp) return json(err.status, { erro: err.message, ...(err.modulo ? { modulo: err.modulo } : {}) });
      if (err?.code === '23505') return json(409, { erro: 'Já existe um registro com esses dados.' });
      console.error(err);
      return json(500, { erro: 'Erro interno. Tente novamente em instantes.' });
    }
  };
}

export const metodoNaoPermitido = () => json(405, { erro: 'Método não permitido.' });
