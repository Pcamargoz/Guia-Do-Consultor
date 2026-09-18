/* Pacotes de implantação: dados da planilha de horas + etapas, recursos, módulos e tarefas editáveis.
   O total previsto de um pacote é calculado no front-end somando:
   etapas e recursos do pacote + horas de cada módulo incluído (horas_modulos, definidas por módulo).
   As tarefas (funcionalidades) não têm horas: só descrição, prioridade e nível. */
import { consulta, transacao } from './db.js';
import { ErroHttp } from './http.js';
import { FAIXAS_USUARIOS, FLUXOS, ID_PACOTE, formatarDuracao, validarMinutos } from './horas.js';

const MAX_HISTORICO = 20;
const MAX_MODULOS = 40;
const MAX_TAREFAS = 400;
const PRIORIDADES = { Alta: 3, 'Média': 2, Baixa: 1 };
const NIVEIS = new Set(['Standard', 'Pro']);
const ID_ITEM = /^[\w-]{1,60}$/;

const formatar = (linha) => ({
  id: linha.id,
  ordem: linha.ordem,
  nome: linha.nome,
  nivel: linha.nivel,
  precos: linha.precos,
  modulos: linha.modulos,
  horasModulos: linha.horas_modulos || {},
  funcionalidades: linha.funcionalidades,
  etapas: linha.etapas,
  rev: linha.rev,
  atualizadoEm: linha.atualizado_em,
  historico: linha.historico || [],
});

const SELECT_COM_HISTORICO = `
  SELECT p.*, COALESCE((
    SELECT json_agg(json_build_object('em', h.em, 'detalhe', h.detalhe, 'autor', h.autor) ORDER BY h.em DESC, h.id DESC)
    FROM (SELECT * FROM pacotes_historico WHERE pacote_id = p.id ORDER BY em DESC, id DESC LIMIT ${MAX_HISTORICO}) h
  ), '[]'::json) AS historico
  FROM pacotes p`;

const autorDe = (usuario) => (usuario.nome || usuario.login || '').slice(0, 80);

export async function listarPacotes() {
  const { rows } = await consulta(`${SELECT_COM_HISTORICO} ORDER BY p.ordem`);
  return { pacotes: rows.map(formatar), faixas: FAIXAS_USUARIOS, fluxos: FLUXOS, base: { fluxo: 'Premium', faixa: 0 } };
}

async function bloquear(client, pacoteId) {
  if (!ID_PACOTE.test(pacoteId)) throw new ErroHttp(400, 'Pacote inválido.');
  const { rows } = await client.query('SELECT * FROM pacotes WHERE id = $1 FOR UPDATE', [pacoteId]);
  if (!rows[0]) throw new ErroHttp(404, 'Pacote não encontrado.');
  return rows[0];
}

const buscar = async (client, pacoteId) => formatar((await client.query(`${SELECT_COM_HISTORICO} WHERE p.id = $1`, [pacoteId])).rows[0]);

const registrar = (client, pacoteId, detalhe, usuario) => client.query(
  'INSERT INTO pacotes_historico (pacote_id, detalhe, autor, usuario_id) VALUES ($1, $2, $3, $4)',
  [pacoteId, detalhe.slice(0, 1000), autorDe(usuario), usuario.id],
);

/** Altera a duração de uma etapa fixa ou recurso de um pacote. */
export async function definirMinutosEtapa(pacoteId, { etapaId, minutos }, usuario) {
  const novo = validarMinutos(minutos);
  return transacao(async (client) => {
    const pacote = await bloquear(client, pacoteId);
    const etapas = structuredClone(pacote.etapas);
    const etapa = etapas.find((e) => e.id === etapaId);
    if (!etapa) throw new ErroHttp(404, 'Etapa não encontrada neste pacote.');
    if (etapa.minutos === novo) return buscar(client, pacoteId);
    const anterior = etapa.minutos;
    etapa.minutos = novo;
    await client.query('UPDATE pacotes SET etapas = $2, rev = rev + 1, atualizado_em = now() WHERE id = $1', [pacoteId, JSON.stringify(etapas)]);
    await registrar(client, pacoteId, `“${etapa.texto}”: ${formatarDuracao(anterior)} → ${formatarDuracao(novo)}`, usuario);
    return buscar(client, pacoteId);
  });
}

/** Tempo de implantação de um módulo inteiro dentro do pacote. */
export async function definirHorasModulo(pacoteId, { moduloId, minutos }, usuario) {
  const novo = validarMinutos(minutos);
  return transacao(async (client) => {
    const pacote = await bloquear(client, pacoteId);
    if (!pacote.modulos.includes(moduloId)) throw new ErroHttp(400, `O módulo não faz parte do pacote ${pacote.nome}.`);
    const anterior = pacote.horas_modulos?.[moduloId] ?? 0;
    if (anterior === novo) return buscar(client, pacoteId);
    const { rows } = await client.query("SELECT dados->>'nome' AS nome FROM modulos WHERE id = $1", [moduloId]);
    await client.query(
      'UPDATE pacotes SET horas_modulos = horas_modulos || jsonb_build_object($2::text, $3::int), rev = rev + 1, atualizado_em = now() WHERE id = $1',
      [pacoteId, moduloId, novo],
    );
    await registrar(client, pacoteId, `Módulo ${rows[0]?.nome || moduloId}: ${formatarDuracao(anterior)} → ${formatarDuracao(novo)}`, usuario);
    return buscar(client, pacoteId);
  });
}

function textoObrigatorio(valor, max, mensagem) {
  const t = typeof valor === 'string' ? valor.replace(/\s+/g, ' ').trim() : '';
  if (!t) throw new ErroHttp(400, mensagem);
  return t.slice(0, max);
}

/** Salva de uma vez os módulos do pacote (com horas) e as tarefas agrupadas por módulo. */
export async function salvarConteudo(pacoteId, { rev, modulos, funcionalidades }, usuario) {
  if (!Array.isArray(modulos) || modulos.length > MAX_MODULOS) throw new ErroHttp(400, 'Lista de módulos inválida.');
  if (!Array.isArray(funcionalidades) || funcionalidades.length > MAX_TAREFAS) throw new ErroHttp(400, `Use no máximo ${MAX_TAREFAS} tarefas por pacote.`);

  return transacao(async (client) => {
    const pacote = await bloquear(client, pacoteId);
    if (rev !== pacote.rev) {
      const err = new ErroHttp(409, 'Este pacote foi alterado por outra pessoa. Recarregamos a versão mais recente; revise e salve novamente.');
      throw err;
    }

    // Módulos: só módulos existentes no Guia, sem repetição, cada um com suas horas.
    const { rows: existentes } = await client.query("SELECT id, dados->>'nome' AS nome FROM modulos");
    const nomes = new Map(existentes.map((m) => [m.id, m.nome]));
    const ids = [];
    const horas = {};
    for (const m of modulos) {
      const id = m?.moduloId;
      if (typeof id !== 'string' || !nomes.has(id)) throw new ErroHttp(400, 'Um dos módulos não existe mais no Guia. Recarregue a página.');
      if (ids.includes(id)) throw new ErroHttp(400, `O módulo ${nomes.get(id)} aparece duas vezes.`);
      ids.push(id);
      horas[id] = validarMinutos(m.minutos);
    }

    // Tarefas: descrição, prioridade e nível; ficam em um módulo do pacote ou em um grupo sem módulo no Guia.
    const usados = new Set();
    const tarefas = funcionalidades.map((f, i) => {
      const moduloId = f?.moduloId ?? null;
      if (moduloId !== null && !ids.includes(moduloId)) throw new ErroHttp(400, 'Há tarefas em um módulo que não está no pacote.');
      const prioridade = f?.complexidade;
      if (!(prioridade in PRIORIDADES)) throw new ErroHttp(400, 'Prioridade inválida: use Alta, Média ou Baixa.');
      if (!NIVEIS.has(f?.nivel)) throw new ErroHttp(400, 'Nível inválido: use Standard ou Pro.');
      let id = typeof f?.id === 'string' && ID_ITEM.test(f.id) && !usados.has(f.id) ? f.id : `${pacoteId}-n${Date.now().toString(36)}${i}`;
      usados.add(id);
      return {
        id,
        modulo: textoObrigatorio(f?.modulo, 60, 'Informe o nome do grupo de cada tarefa.'),
        moduloId,
        funcionalidade: textoObrigatorio(f?.funcionalidade, 200, 'Toda tarefa precisa de uma descrição.'),
        nivel: f.nivel,
        complexidade: prioridade,
        peso: PRIORIDADES[prioridade],
      };
    });

    // Histórico: resumo do que mudou.
    const antes = new Map(pacote.funcionalidades.map((f) => [f.id, f]));
    const depois = new Map(tarefas.map((f) => [f.id, f]));
    const partes = [];
    const adicionadosMod = ids.filter((id) => !pacote.modulos.includes(id));
    const removidosMod = pacote.modulos.filter((id) => !ids.includes(id));
    if (adicionadosMod.length) partes.push(`Módulos adicionados: ${adicionadosMod.map((id) => nomes.get(id)).join(', ')}`);
    if (removidosMod.length) partes.push(`Módulos removidos: ${removidosMod.map((id) => nomes.get(id) || id).join(', ')}`);
    const horasMudaram = ids.filter((id) => pacote.modulos.includes(id) && (pacote.horas_modulos?.[id] ?? 0) !== horas[id]);
    if (horasMudaram.length) partes.push(`Horas: ${horasMudaram.map((id) => `${nomes.get(id)} ${formatarDuracao(pacote.horas_modulos?.[id] ?? 0)} → ${formatarDuracao(horas[id])}`).join(', ')}`);
    const novas = tarefas.filter((f) => !antes.has(f.id)).length;
    const excluidas = pacote.funcionalidades.filter((f) => !depois.has(f.id)).length;
    const editadas = tarefas.filter((f) => {
      const a = antes.get(f.id);
      return a && (a.funcionalidade !== f.funcionalidade || a.complexidade !== f.complexidade || a.nivel !== f.nivel || a.modulo !== f.modulo);
    }).length;
    const bits = [];
    if (novas) bits.push(`+${novas}`);
    if (excluidas) bits.push(`−${excluidas}`);
    if (editadas) bits.push(`${editadas} editada(s)`);
    if (!novas && !excluidas && [...antes.keys()].join() !== [...depois.keys()].join()) bits.push('reordenadas');
    if (bits.length) partes.push(`Tarefas: ${bits.join(', ')}`);
    if (!partes.length) return buscar(client, pacoteId);

    await client.query(
      'UPDATE pacotes SET modulos = $2, horas_modulos = $3, funcionalidades = $4, rev = rev + 1, atualizado_em = now() WHERE id = $1',
      [pacoteId, JSON.stringify(ids), JSON.stringify(horas), JSON.stringify(tarefas)],
    );
    await registrar(client, pacoteId, partes.join(' · '), usuario);
    return buscar(client, pacoteId);
  });
}

/** Confere se o pacote existe e inclui o módulo. */
export async function pacoteIncluiModulo(client, pacoteId, moduloId) {
  if (!ID_PACOTE.test(pacoteId)) throw new ErroHttp(400, 'Pacote inválido.');
  const { rows } = await client.query('SELECT nome, modulos FROM pacotes WHERE id = $1', [pacoteId]);
  if (!rows[0]) throw new ErroHttp(404, 'Pacote não encontrado.');
  if (!rows[0].modulos.includes(moduloId)) throw new ErroHttp(400, `O módulo não faz parte do pacote ${rows[0].nome}.`);
  return rows[0].nome;
}
