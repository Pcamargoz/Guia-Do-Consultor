import { rota, json, cookieSessaoExpirado } from '../../http.js';
import { COOKIE_SESSAO, lerCookie, verificarSessao } from '../../token.js';
import { consulta } from '../../db.js';

/* Encerra a sessão: apaga o cookie e invalida o token no servidor
   (incrementa sessao_versao, o que também desconecta os outros dispositivos do usuário). */
export const POST = rota(async (request) => {
  const sessao = await verificarSessao(lerCookie(request, COOKIE_SESSAO));
  if (sessao) {
    await consulta('UPDATE usuarios SET sessao_versao = sessao_versao + 1 WHERE id = $1 AND sessao_versao = $2', [sessao.sub, sessao.v]);
  }
  return json(200, { ok: true }, { 'Set-Cookie': cookieSessaoExpirado(request) });
});
