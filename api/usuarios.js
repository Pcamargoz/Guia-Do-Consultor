/* /api/usuarios — somente administradores.
   GET                lista
   POST               cria — body { login, nome, papel, senha }
   PATCH  ?id=ID      altera — body { nome?, papel?, ativo?, senha? }
   DELETE ?id=ID      exclui */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../lib/http.js';
import { listarUsuarios, criarUsuario, atualizarUsuario, excluirUsuario } from '../lib/usuarios.js';
import { PAPEIS } from '../lib/permissoes.js';

const idDaUrl = (request) => {
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !/^\d{1,18}$/.test(id)) throw new ErroHttp(400, 'Informe um id de usuário válido.');
  return id;
};

const papeis = Object.entries(PAPEIS).map(([id, p]) => ({ id, nome: p.nome, permissoes: p.permissoes }));

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'gerenciar_usuarios');
  return json(200, { usuarios: await listarUsuarios(), papeis });
});

export const POST = rota(async (request) => {
  await exigirUsuario(request, 'gerenciar_usuarios');
  return json(201, { usuario: await criarUsuario(await lerJson(request)) });
});

export const PATCH = rota(async (request) => {
  const admin = await exigirUsuario(request, 'gerenciar_usuarios');
  return json(200, { usuario: await atualizarUsuario(idDaUrl(request), await lerJson(request), admin) });
});

export const DELETE = rota(async (request) => {
  const admin = await exigirUsuario(request, 'gerenciar_usuarios');
  await excluirUsuario(idDaUrl(request), admin);
  return json(200, { ok: true });
});
