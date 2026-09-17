/* Pacotes de implantação: dados da planilha de horas + etapas/recursos editáveis.
   O total previsto de um pacote é calculado no front-end somando:
   etapas e recursos do pacote + minutos (daquele pacote) de cada item da checklist dos módulos incluídos. */
import { consulta, transacao } from './db.js';
import { ErroHttp } from './http.js';
import { FAIXAS_USUARIOS, FLUXOS, ID_PACOTE, formatarDuracao, validarMinutos } from './horas.js';

const MAX_HISTORICO = 20;

const formatar = (linha) => ({
  id: linha.id,
  ordem: linha.ordem,
  nome: linha.nome,
  nivel: linha.nivel,
  precos: linha.precos,
  modulos: linha.modulos,
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

export async function listarPacotes() {
  const { rows } = await consulta(`${SELECT_COM_HISTORICO} ORDER BY p.ordem`);
  return { pacotes: rows.map(formatar), faixas: FAIXAS_USUARIOS, fluxos: FLUXOS, base: { fluxo: 'Premium', faixa: 0 } };
}

/** Altera a duração de uma etapa fixa ou recurso de um pacote. */
export async function definirMinutosEtapa(pacoteId, { etapaId, minutos }, usuario) {
  if (!ID_PACOTE.test(pacoteId)) throw new ErroHttp(400, 'Pacote inválido.');
  const novo = validarMinutos(minutos);
  return transacao(async (client) => {
    const { rows } = await client.query('SELECT * FROM pacotes WHERE id = $1 FOR UPDATE', [pacoteId]);
    const pacote = rows[0];
    if (!pacote) throw new ErroHttp(404, 'Pacote não encontrado.');
    const etapas = structuredClone(pacote.etapas);
    const etapa = etapas.find((e) => e.id === etapaId);
    if (!etapa) throw new ErroHttp(404, 'Etapa não encontrada neste pacote.');
    const buscar = async () => formatar((await client.query(`${SELECT_COM_HISTORICO} WHERE p.id = $1`, [pacoteId])).rows[0]);
    if (etapa.minutos === novo) return buscar();
    const anterior = etapa.minutos;
    etapa.minutos = novo;
    await client.query('UPDATE pacotes SET etapas = $2, rev = rev + 1, atualizado_em = now() WHERE id = $1', [pacoteId, JSON.stringify(etapas)]);
    await client.query(
      'INSERT INTO pacotes_historico (pacote_id, detalhe, autor, usuario_id) VALUES ($1, $2, $3, $4)',
      [pacoteId, `“${etapa.texto}”: ${formatarDuracao(anterior)} → ${formatarDuracao(novo)}`, (usuario.nome || usuario.login).slice(0, 80), usuario.id],
    );
    return buscar();
  });
}

/** Confere se o pacote existe e inclui o módulo (usado ao editar horas de itens da checklist). */
export async function pacoteIncluiModulo(client, pacoteId, moduloId) {
  if (!ID_PACOTE.test(pacoteId)) throw new ErroHttp(400, 'Pacote inválido.');
  const { rows } = await client.query('SELECT nome, modulos FROM pacotes WHERE id = $1', [pacoteId]);
  if (!rows[0]) throw new ErroHttp(404, 'Pacote não encontrado.');
  if (!rows[0].modulos.includes(moduloId)) throw new ErroHttp(400, `O módulo não faz parte do pacote ${rows[0].nome}.`);
  return rows[0].nome;
}
