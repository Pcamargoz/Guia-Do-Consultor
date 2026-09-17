/* /api/duvidas — envio e atendimento das dúvidas da apostila. */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../lib/http.js';
import { minhasDuvidas, filaDuvidas, enviarDuvidas, assumirDuvida, liberarDuvida, responderDuvida } from '../lib/duvidas.js';

const contexto = (request) => {
  const params = new URL(request.url).searchParams;
  return { escopo: params.get('escopo'), acao: params.get('acao'), id: params.get('id') };
};
const idValido = (id) => {
  if (!/^\d{1,18}$/.test(id || '')) throw new ErroHttp(400, 'Dúvida inválida.');
  return id;
};

export const GET = rota(async (request) => {
  const { escopo } = contexto(request);
  if (escopo === 'minhas') {
    const usuario = await exigirUsuario(request, 'ver');
    return json(200, { duvidas: await minhasDuvidas(usuario.id) });
  }
  await exigirUsuario(request, 'editar');
  return json(200, { duvidas: await filaDuvidas() });
});

export const POST = rota(async (request) => {
  const { acao, id } = contexto(request);
  if (acao === 'enviar') {
    const usuario = await exigirUsuario(request, 'ver');
    return json(200, { enviadas: await enviarDuvidas(usuario.id), autor: usuario.nome || usuario.login });
  }
  const usuario = await exigirUsuario(request, 'editar');
  if (acao === 'assumir') await assumirDuvida(idValido(id), usuario.id);
  else if (acao === 'liberar') await liberarDuvida(idValido(id), usuario.id, usuario.papel === 'admin');
  else if (acao === 'responder') await responderDuvida(idValido(id), usuario.id, (await lerJson(request)).resposta);
  else throw new ErroHttp(400, 'Ação inválida.');
  return json(200, { ok: true });
});
