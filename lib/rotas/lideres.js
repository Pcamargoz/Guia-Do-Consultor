/* /api/lideres — Processo de Líderes (quadros Kanban). Regras de acesso: lib/lideres-regras.js (checadas no servidor).
   Toda chamada exige sessão e a área visível ao perfil (area:lideres; o admin sempre vê).
   GET                                   quadros visíveis ao usuário (+ podeCriar)
   GET    ?acao=usuarios                 consultores e estagiários ativos (admin, para o modal)
   GET    ?quadro=ID                     quadro: integrantes, tarefas, permissões e dashboard
   GET    ?tarefa=ID                     tarefa: checklist, comentários, histórico, permissões
   GET    ?acao=notificacoes             últimas notificações + não lidas
   GET    ?acao=pulso[&quadro=ID]        polling leve: não lidas e versão do quadro
   POST   ?acao=quadro                   cria quadro (admin)
   PATCH  ?quadro=ID                     edita quadro, integrantes ou status (admin)
   DELETE ?quadro=ID                     exclui quadro arquivado (admin)
   POST   ?acao=tarefa&quadro=ID         cria tarefa (líder/admin)
   PATCH  ?tarefa=ID                     edita campos (líder/admin; responsável: só impedimento)
   POST   ?acao=mover&tarefa=ID          { status, posicao?, comentario? }
   DELETE ?tarefa=ID                     exclui tarefa (líder/admin)
   POST   ?acao=comentario&tarefa=ID     { texto } (com @menção)
   POST   ?acao=checklist&tarefa=ID      { texto } (líder/admin)
   PATCH  ?item=ID                       { feito } (responsável/líder) ou { texto } (líder)
   DELETE ?item=ID                       (líder/admin)
   POST   ?acao=lidas                    { ids } ou { todas: true } */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../http.js';
import { exigirChaveVisivel } from '../visibilidade-guard.js';
import * as L from '../lideres.js';

async function entrar(request) {
  const usuario = await exigirUsuario(request, 'ver');
  if (usuario.papel !== 'admin') await exigirChaveVisivel(usuario, 'area:lideres');
  const p = new URL(request.url).searchParams;
  const id = (nome) => {
    const v = p.get(nome);
    if (v == null) return null;
    if (!/^\d{1,18}$/.test(v)) throw new ErroHttp(400, 'Identificador inválido.');
    return v;
  };
  return { usuario, acao: p.get('acao'), quadro: id('quadro'), tarefa: id('tarefa'), item: id('item') };
}

export const GET = rota(async (request) => {
  const { usuario, acao, quadro, tarefa } = await entrar(request);
  if (acao === 'usuarios') return json(200, await L.usuariosParaQuadro(usuario));
  if (acao === 'notificacoes') return json(200, await L.listarNotificacoes(usuario));
  if (acao === 'pulso') return json(200, await L.pulso(usuario, quadro));
  if (tarefa) return json(200, await L.obterTarefa(usuario, tarefa));
  if (quadro) return json(200, await L.obterQuadro(usuario, quadro));
  return json(200, await L.listarQuadros(usuario));
});

export const POST = rota(async (request) => {
  const { usuario, acao, quadro, tarefa } = await entrar(request);
  const corpo = await lerJson(request);
  if (acao === 'quadro') return json(201, { quadro: await L.criarQuadro(usuario, corpo) });
  if (acao === 'tarefa' && quadro) return json(201, { tarefa: await L.criarTarefa(usuario, quadro, corpo) });
  if (acao === 'mover' && tarefa) return json(200, { tarefa: await L.moverTarefa(usuario, tarefa, corpo) });
  if (acao === 'comentario' && tarefa) return json(201, { comentario: await L.comentar(usuario, tarefa, corpo) });
  if (acao === 'checklist' && tarefa) return json(201, { item: await L.adicionarItem(usuario, tarefa, corpo) });
  if (acao === 'lidas') return json(200, await L.marcarLidas(usuario, corpo));
  throw new ErroHttp(400, 'Ação inválida.');
});

export const PATCH = rota(async (request) => {
  const { usuario, quadro, tarefa, item } = await entrar(request);
  const corpo = await lerJson(request);
  if (item) return json(200, { item: await L.alterarItem(usuario, item, corpo) });
  if (tarefa) return json(200, { tarefa: await L.editarTarefa(usuario, tarefa, corpo) });
  if (quadro) return json(200, { quadro: await L.editarQuadro(usuario, quadro, corpo) });
  throw new ErroHttp(400, 'Informe o quadro, a tarefa ou o item.');
});

export const DELETE = rota(async (request) => {
  const { usuario, quadro, tarefa, item } = await entrar(request);
  if (item) await L.excluirItem(usuario, item);
  else if (tarefa) await L.excluirTarefa(usuario, tarefa);
  else if (quadro) await L.excluirQuadro(usuario, quadro);
  else throw new ErroHttp(400, 'Informe o quadro, a tarefa ou o item.');
  return json(200, { ok: true });
});
