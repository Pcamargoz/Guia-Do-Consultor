/* /api/checklists-progresso — progresso do checklist do usuário logado (cada pessoa só vê o próprio)
   GET    ?chave=KEY      progresso salvo, nº do usuário e lista de imagens anexadas
   GET    ?lista=1        resumo de todos os checklists do usuário (pct e nº de imagens)
   GET    ?problemas=1    checklists do usuário com problema registrado (dados e imagens), para o relatório do desenvolvimento
   PUT    ?chave=KEY      grava { dados, pct }
   DELETE ?chave=KEY      "Recomeçar": apaga progresso e imagens deste checklist */
import { rota, json, lerJson, exigirUsuario } from '../http.js';
import { obterProgresso, listarProgresso, listarProblemas, salvarProgresso, apagarProgresso } from '../checklists-progresso.js';

const chaveDe = (request) => new URL(request.url).searchParams.get('chave') || '';

export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const params = new URL(request.url).searchParams;
  if (params.get('problemas')) return json(200, await listarProblemas(usuario));
  if (params.get('lista')) return json(200, await listarProgresso(usuario));
  return json(200, await obterProgresso(usuario, chaveDe(request)));
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  return json(200, await salvarProgresso(usuario, chaveDe(request), await lerJson(request)));
});

export const DELETE = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  return json(200, await apagarProgresso(usuario, chaveDe(request)));
});
