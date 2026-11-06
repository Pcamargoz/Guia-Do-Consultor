/* /api/visibilidade (contrato-componentes.md §2).
   GET            → { itens: { chave: boolean } } efetivo para o usuário logado
   GET ?todos=1   → [ { chave, visivel, perfis, atualizado_por_nome, atualizado_em } ] (só admin)
   PUT { chave, visivel, perfis } → item salvo (só admin; 400 chave/perfis inválidos) */
import { ErroHttp, exigirUsuario, json, lerJson, rota } from '../http.js';
import { listaAdmin, mapaEfetivo, itemAdmin, validarAtualizacao } from '../visibilidade.js';
import { carregarLinhas, salvarLinha } from '../visibilidade-dados.js';

const SO_ADMIN = 'Apenas administradores podem alterar a visibilidade.';

export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const todos = new URL(request.url).searchParams.get('todos') === '1';
  if (todos) {
    if (usuario.papel !== 'admin') throw new ErroHttp(403, SO_ADMIN);
    return json(200, listaAdmin(await carregarLinhas({ semCache: true })));
  }
  return json(200, { itens: mapaEfetivo(await carregarLinhas(), usuario.papel) });
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  if (usuario.papel !== 'admin') throw new ErroHttp(403, SO_ADMIN);
  const validacao = validarAtualizacao(await lerJson(request));
  if (!validacao.ok) throw new ErroHttp(400, validacao.erro);
  return json(200, itemAdmin(await salvarLinha(validacao.item, usuario)));
});
