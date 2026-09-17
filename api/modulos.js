/* /api/modulos
   GET                              lista (todos os perfis)
   POST                             cria módulo (consultor/admin)
   PUT    ?id=ID                    edita conteúdo (consultor/admin) — body { rev, modulo }
   DELETE ?id=ID                    exclui (consultor/admin)
   POST   ?id=ID&acao=status        marca status (consultor/admin) — body { alvo, status } */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../lib/http.js';
import { listarModulos, criarModulo, atualizarModulo, marcarStatus, excluirModulo } from '../lib/modulos.js';

const idDaUrl = (request) => {
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !/^[\w-]{1,40}$/.test(id)) throw new ErroHttp(400, 'Informe um id de módulo válido.');
  return id;
};

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'ver');
  return json(200, { modulos: await listarModulos() });
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const url = new URL(request.url);
  const corpo = await lerJson(request);
  if (url.searchParams.get('acao') === 'status') {
    return json(200, { modulo: await marcarStatus(idDaUrl(request), corpo, usuario) });
  }
  return json(201, { modulo: await criarModulo(corpo.modulo, usuario) });
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const corpo = await lerJson(request);
  return json(200, { modulo: await atualizarModulo(idDaUrl(request), corpo.rev, corpo.modulo, usuario) });
});

export const DELETE = rota(async (request) => {
  await exigirUsuario(request, 'editar');
  await excluirModulo(idDaUrl(request));
  return json(200, { ok: true });
});
