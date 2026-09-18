/* /api/estudo — Modo Estudo do usuário autenticado (todos os perfis).
   GET    ?documento=apostila                    estado completo (marcações, checklists, progresso)
   GET    ?documento=apostila&acao=duvidas       dúvidas do usuário para o rascunho de e-mail
   POST   ?documento=apostila&acao=marcacao      cria grifo/anotação/comentário/favorito
   PATCH  ?documento=apostila&id=ID              altera cor ou texto de uma marcação
   DELETE ?documento=apostila&id=ID              exclui uma marcação
   PUT    ?documento=apostila&acao=item          marca/desmarca item da checklist e salva observação
   PUT    ?documento=apostila&acao=progresso     salva modo, última posição e páginas lidas */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../http.js';
import { carregarEstudo, carregarDuvidas, criarMarcacao, atualizarMarcacao, excluirMarcacao, salvarItem, salvarProgresso, validarDocumento } from '../estudo.js';

const contexto = (request) => {
  const url = new URL(request.url);
  return { documento: validarDocumento(url.searchParams.get('documento')), acao: url.searchParams.get('acao'), id: url.searchParams.get('id') };
};

const idDaUrl = (id) => {
  if (!id || !/^\d{1,18}$/.test(id)) throw new ErroHttp(400, 'Informe uma marcação válida.');
  return id;
};

export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const { documento, acao } = contexto(request);
  if (acao === 'duvidas') return json(200, { duvidas: await carregarDuvidas(usuario.id, documento), autor: usuario.nome || usuario.login });
  return json(200, await carregarEstudo(usuario.id, documento));
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const { documento, acao } = contexto(request);
  if (acao !== 'marcacao') throw new ErroHttp(400, 'Ação inválida.');
  return json(201, { marcacao: await criarMarcacao(usuario.id, documento, await lerJson(request)) });
});

export const PATCH = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const { documento, id } = contexto(request);
  return json(200, { marcacao: await atualizarMarcacao(usuario.id, documento, idDaUrl(id), await lerJson(request)) });
});

export const DELETE = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const { documento, id } = contexto(request);
  await excluirMarcacao(usuario.id, documento, idDaUrl(id));
  return json(200, { ok: true });
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const { documento, acao } = contexto(request);
  const corpo = await lerJson(request);
  if (acao === 'item') return json(200, { item: await salvarItem(usuario.id, documento, corpo) });
  if (acao === 'progresso') return json(200, { progresso: await salvarProgresso(usuario.id, documento, corpo) });
  throw new ErroHttp(400, 'Ação inválida.');
});
