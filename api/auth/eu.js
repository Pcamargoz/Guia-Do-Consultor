import { rota, json, exigirUsuario, usuarioPublico } from '../../lib/http.js';

/** Dados do usuário logado e suas permissões (usado pelo front-end para montar a interface). */
export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  return json(200, { usuario: usuarioPublico(usuario) });
});
