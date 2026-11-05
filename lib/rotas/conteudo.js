/* /api/conteudo (contrato-componentes.md §1). Base gerada do Harness (lib/conteudo/base-conhecimento.js),
   filtrada pela visibilidade do usuário logado.
   GET                          → { versao, modulos: [...] }
   GET ?modulo=<id>&jornada=…   → { modulo, jornada, secoes } | 400 | 403 (oculto) | 404 */
import { exigirUsuario, json, rota } from '../http.js';
import { BASE } from '../conteudo/base-conhecimento.js';
import { montarDetalhe, montarResumo } from '../conteudo/consultas.js';
import { carregarLinhas } from '../visibilidade-dados.js';

export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const itens = await carregarLinhas();
  const params = new URL(request.url).searchParams;
  const modulo = params.get('modulo');
  if (!modulo) return json(200, montarResumo(BASE, { papel: usuario.papel, itens }));
  const r = montarDetalhe(BASE, { modulo, jornada: params.get('jornada'), papel: usuario.papel, itens });
  return json(r.status, r.corpo);
});
