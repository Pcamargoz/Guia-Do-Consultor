/* /api/pacotes
   GET                                  lista pacotes, etapas, preços e faixas (todos os perfis)
   POST ?id=PACOTE&acao=minutos         altera a duração de uma etapa/recurso (consultor/admin) — body { etapaId, minutos } */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../lib/http.js';
import { listarPacotes, definirMinutosEtapa } from '../lib/pacotes.js';

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'ver');
  return json(200, await listarPacotes());
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const url = new URL(request.url);
  if (url.searchParams.get('acao') !== 'minutos') throw new ErroHttp(400, 'Ação inválida.');
  const pacote = await definirMinutosEtapa(url.searchParams.get('id') || '', await lerJson(request), usuario);
  return json(200, { pacote });
});
