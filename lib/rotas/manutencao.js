/* /api/manutencao — somente administradores.
   GET   resumo das movimentações existentes
   POST  apaga todas as movimentações — body { confirmacao: "LIMPAR" } */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../http.js';
import { resumoMovimentacoes, limparMovimentacoes } from '../manutencao.js';

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'gerenciar_usuarios');
  return json(200, { resumo: await resumoMovimentacoes() });
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'gerenciar_usuarios');
  const { confirmacao } = await lerJson(request);
  if (String(confirmacao || '').trim().toUpperCase() !== 'LIMPAR') {
    throw new ErroHttp(400, 'Digite LIMPAR para confirmar a limpeza.');
  }
  const removidos = await limparMovimentacoes();
  console.log(`Movimentações limpas por ${usuario.login} (${removidos.total} registros).`);
  return json(200, { removidos });
});
