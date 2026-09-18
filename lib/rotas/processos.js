/* /api/processos — Biblioteca de Processos do Guia
   GET                              lista (todos os perfis)
   POST                             cria processo (consultor/admin) — body { processo }
   PUT    ?id=ID                    edita (consultor/admin) — body { rev, processo }
   DELETE ?id=ID                    exclui (consultor/admin)
   POST   ?id=ID&acao=status        marca status (consultor/admin) — body { status }
   POST   ?acao=ordem               reordena (consultor/admin) — body { ids } */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../http.js';
import { listarProcessos, criarProcesso, atualizarProcesso, marcarStatusProcesso, reordenarProcessos, excluirProcesso } from '../processos.js';

const idDaUrl = (request) => {
  const id = new URL(request.url).searchParams.get('id');
  if (!id || !/^[\w-]{1,40}$/.test(id)) throw new ErroHttp(400, 'Informe um id de processo válido.');
  return id;
};

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'ver');
  return json(200, { processos: await listarProcessos() });
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const acao = new URL(request.url).searchParams.get('acao');
  const corpo = await lerJson(request);
  if (acao === 'status') return json(200, { processo: await marcarStatusProcesso(idDaUrl(request), corpo, usuario) });
  if (acao === 'ordem') return json(200, { processos: await reordenarProcessos(corpo.ids) });
  return json(201, { processo: await criarProcesso(corpo.processo, usuario) });
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const corpo = await lerJson(request);
  return json(200, { processo: await atualizarProcesso(idDaUrl(request), corpo.rev, corpo.processo, usuario) });
});

export const DELETE = rota(async (request) => {
  await exigirUsuario(request, 'editar');
  await excluirProcesso(idDaUrl(request));
  return json(200, { ok: true });
});
