/* /api/pacotes
   GET                                  lista pacotes, módulos, horas, tarefas, preços e faixas (todos os perfis)
   POST ?id=PACOTE&acao=minutos         duração de uma etapa/recurso (consultor/admin) — body { etapaId, minutos }
   POST ?id=PACOTE&acao=modulo          horas de um módulo no pacote (consultor/admin) — body { moduloId, minutos }
   POST ?id=PACOTE&acao=total           novo total do pacote, dividido entre os módulos (consultor/admin)
                                        — body { total, modulos: [{ moduloId, minutos }], fluxo, faixa }
   PUT  ?id=PACOTE                   módulos (com horas), tarefas e durações das etapas (consultor/admin)
                                        — body { rev, modulos: [{ moduloId, minutos }], funcionalidades: [...], etapas: [{ id, minutos }] } */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../http.js';
import { listarPacotes, definirMinutosEtapa, definirHorasModulo, definirTotalPacote, salvarConteudo } from '../pacotes.js';

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'ver');
  return json(200, await listarPacotes());
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const acao = url.searchParams.get('acao');
  if (acao === 'minutos') return json(200, { pacote: await definirMinutosEtapa(id, await lerJson(request), usuario) });
  if (acao === 'modulo') return json(200, { pacote: await definirHorasModulo(id, await lerJson(request), usuario) });
  if (acao === 'total') return json(200, { pacote: await definirTotalPacote(id, await lerJson(request), usuario) });
  throw new ErroHttp(400, 'Ação inválida.');
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const id = new URL(request.url).searchParams.get('id') || '';
  return json(200, { pacote: await salvarConteudo(id, await lerJson(request), usuario) });
});
