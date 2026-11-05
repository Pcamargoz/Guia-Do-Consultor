/* /api/conteudo (contrato-componentes.md §1). Base gerada do Harness (lib/conteudo/base/: índice + um JSON
   por módulo, lidos sob demanda), filtrada pela visibilidade do usuário logado.
   GET                          → { versao, modulos: [...] }                 (lê só o índice)
   GET ?modulo=<id>&jornada=…   → { modulo, jornada, secoes } | 400 | 403 (oculto) | 404
                                  (o JSON do módulo só é lido depois de validar jornada, módulo e visibilidade) */
import { exigirUsuario, json, rota } from '../http.js';
import { carregarConteudoModulo, carregarIndice } from '../conteudo/base.js';
import { checarDetalhe, montarDetalhe, montarResumo } from '../conteudo/consultas.js';
import { carregarLinhas } from '../visibilidade-dados.js';

export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const [itens, indice] = await Promise.all([carregarLinhas(), carregarIndice()]);
  const params = new URL(request.url).searchParams;
  const modulo = params.get('modulo');
  if (!modulo) return json(200, montarResumo(indice, { papel: usuario.papel, itens }));
  const pedido = { modulo, jornada: params.get('jornada'), papel: usuario.papel, itens };
  const recusa = checarDetalhe(indice, pedido);
  if (recusa) return json(recusa.status, recusa.corpo);
  const conteudo = await carregarConteudoModulo(modulo);
  const r = montarDetalhe(indice, { ...pedido, conteudo });
  return json(r.status, r.corpo);
});
