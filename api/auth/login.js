import { assinarSessao } from '../../lib/token.js';
import { rota, json, lerJson, cookieSessao, usuarioPublico } from '../../lib/http.js';
import { autenticar } from '../../lib/usuarios.js';

export const POST = rota(async (request) => {
  const { login, senha } = await lerJson(request);
  const usuario = await autenticar(login, senha);
  const token = await assinarSessao({ sub: usuario.id, papel: usuario.papel, v: usuario.sessao_versao });
  return json(200, { usuario: usuarioPublico(usuario) }, { 'Set-Cookie': cookieSessao(request, token) });
});
