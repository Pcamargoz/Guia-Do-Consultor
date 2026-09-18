/* Regras da Biblioteca de Processos do Guia: validação, CRUD, status (Rever/Aprovado/Reprovado) e histórico.
   Mesma dinâmica dos módulos: conteúdo em "dados" (jsonb); status, revisão e datas em colunas próprias. */
import { randomBytes } from 'node:crypto';
import { consulta, transacao } from './db.js';
import { ErroHttp } from './http.js';

const STATUS = new Set(['rever', 'aprovado', 'reprovado']);
const ROTULOS = { rever: 'Rever', aprovado: 'Aprovado', reprovado: 'Reprovado' };
const CAMPOS_TEXTO = { nome: 100, descricao: 500, detalhe: 2000, alertaTitulo: 200, alerta: 1000 };
const MAX_ETAPAS = 30;
const MAX_TEXTO_ETAPA = 120;
const MAX_HISTORICO = 50;
const ID_VALIDO = /^[\w-]{1,40}$/;

const novoId = () => randomBytes(6).toString('hex');
const autorDe = (usuario) => (usuario.nome || usuario.login || '').slice(0, 80);

function texto(valor, max) {
  if (valor == null) return '';
  if (typeof valor !== 'string') throw new ErroHttp(400, 'Campo de texto inválido.');
  return valor.trim().slice(0, max);
}

function limparEtapas(lista, anteriores) {
  if (!Array.isArray(lista)) return [];
  return lista.slice(0, MAX_ETAPAS).map((bruto) => {
    const conteudo = texto(typeof bruto === 'string' ? bruto : bruto?.texto, MAX_TEXTO_ETAPA);
    if (!conteudo) return null;
    const id = typeof bruto?.id === 'string' && ID_VALIDO.test(bruto.id) ? bruto.id : novoId();
    // O rótulo curto do mapa (material original) só vale enquanto o texto da etapa não mudar.
    const antiga = anteriores.get(id);
    return antiga?.curto && antiga.texto === conteudo ? { id, texto: conteudo, curto: antiga.curto } : { id, texto: conteudo };
  }).filter(Boolean);
}

function limparProcesso(entrada, anterior) {
  if (!entrada || typeof entrada !== 'object') throw new ErroHttp(400, 'Processo inválido.');
  const dados = {};
  for (const [campo, max] of Object.entries(CAMPOS_TEXTO)) dados[campo] = texto(entrada[campo], max);
  if (!dados.nome) throw new ErroHttp(400, 'Informe o nome do processo.');
  const anteriores = new Map((anterior?.etapas || []).map((e) => [e.id, e]));
  dados.etapas = limparEtapas(entrada.etapas, anteriores);
  if (dados.etapas.length < 2) throw new ErroHttp(400, 'O processo precisa de pelo menos duas etapas.');
  return dados;
}

function descreverMudancas(anterior, novo) {
  const partes = [];
  const antes = new Map((anterior.etapas || []).map((i) => [i.id, i.texto]));
  const depois = new Map(novo.etapas.map((i) => [i.id, i.texto]));
  const adicionadas = [...depois.keys()].filter((id) => !antes.has(id)).length;
  const removidas = [...antes.keys()].filter((id) => !depois.has(id)).length;
  const editadas = [...depois.keys()].filter((id) => antes.has(id) && antes.get(id) !== depois.get(id)).length;
  const reordenado = !adicionadas && !removidas && [...antes.keys()].join() !== [...depois.keys()].join();
  const bits = [];
  if (adicionadas) bits.push(`+${adicionadas}`);
  if (removidas) bits.push(`−${removidas}`);
  if (editadas) bits.push(`${editadas} editada(s)`);
  if (reordenado) bits.push('reordenado');
  if (bits.length) partes.push(`Etapas: ${bits.join(', ')}`);
  const campos = Object.keys(CAMPOS_TEXTO).filter((c) => (anterior[c] || '') !== novo[c]);
  if (campos.length) partes.push(`Campos: ${campos.join(', ')}`);
  return partes.join(' · ') || 'Sem alterações de conteúdo';
}

function formatar(linha) {
  return {
    id: linha.id,
    ...linha.dados,
    status: linha.status,
    statusEm: linha.status_em,
    statusPor: linha.status_por || '',
    rev: linha.rev,
    criadoEm: linha.criado_em,
    atualizadoEm: linha.atualizado_em,
    historico: linha.historico || [],
  };
}

const SELECT_COM_HISTORICO = `
  SELECT p.*, COALESCE((
    SELECT json_agg(json_build_object('em', h.em, 'acao', h.acao, 'detalhe', h.detalhe, 'autor', h.autor) ORDER BY h.em DESC, h.id DESC)
    FROM (SELECT * FROM processos_historico WHERE processo_id = p.id ORDER BY em DESC, id DESC LIMIT ${MAX_HISTORICO}) h
  ), '[]'::json) AS historico
  FROM processos p`;

export async function listarProcessos() {
  const { rows } = await consulta(`${SELECT_COM_HISTORICO} ORDER BY p.ordem, p.criado_em`);
  return rows.map(formatar);
}

async function buscar(db, id) {
  const { rows } = await db.query(`${SELECT_COM_HISTORICO} WHERE p.id = $1`, [id]);
  if (!rows[0]) throw new ErroHttp(404, 'Processo não encontrado.');
  return formatar(rows[0]);
}

async function bloquear(client, id) {
  const { rows } = await client.query('SELECT * FROM processos WHERE id = $1 FOR UPDATE', [id]);
  if (!rows[0]) throw new ErroHttp(404, 'Processo não encontrado.');
  return rows[0];
}

const registrar = (client, processoId, acao, detalhe, usuario) => client.query(
  'INSERT INTO processos_historico (processo_id, acao, detalhe, autor, usuario_id) VALUES ($1, $2, $3, $4, $5)',
  [processoId, acao, detalhe, autorDe(usuario), usuario.id],
);

export async function criarProcesso(entrada, usuario) {
  const dados = limparProcesso(entrada);
  return transacao(async (client) => {
    const id = novoId();
    await client.query(
      'INSERT INTO processos (id, ordem, dados) VALUES ($1, (SELECT COALESCE(MAX(ordem), 0) + 1 FROM processos), $2)',
      [id, dados],
    );
    await registrar(client, id, 'criado', 'Processo criado', usuario);
    return buscar(client, id);
  });
}

export async function atualizarProcesso(id, rev, entrada, usuario) {
  return transacao(async (client) => {
    const atual = await bloquear(client, id);
    if (rev !== atual.rev) {
      const err = new ErroHttp(409, 'Este processo foi alterado por outra pessoa. Recarregamos a versão mais recente.');
      err.processo = await buscar(client, id);
      throw err;
    }
    const dados = limparProcesso(entrada, atual.dados);
    await client.query('UPDATE processos SET dados = $2, rev = rev + 1, atualizado_em = now() WHERE id = $1', [id, dados]);
    await registrar(client, id, 'editado', descreverMudancas(atual.dados, dados), usuario);
    return buscar(client, id);
  });
}

export async function marcarStatusProcesso(id, { status }, usuario) {
  const novo = status == null ? null : String(status);
  if (novo !== null && !STATUS.has(novo)) throw new ErroHttp(400, 'Status inválido.');
  return transacao(async (client) => {
    await bloquear(client, id);
    await client.query(
      'UPDATE processos SET status = $2, status_em = CASE WHEN $2::text IS NULL THEN NULL ELSE now() END, status_por = $3, atualizado_em = now() WHERE id = $1',
      [id, novo, novo ? autorDe(usuario) : ''],
    );
    await registrar(client, id, novo || 'limpo', `Processo: ${novo ? ROTULOS[novo] : 'status removido'}`, usuario);
    return buscar(client, id);
  });
}

/** Nova ordem dos processos (lista completa de ids). */
export async function reordenarProcessos(ids) {
  if (!Array.isArray(ids) || !ids.every((id) => typeof id === 'string' && ID_VALIDO.test(id)) || new Set(ids).size !== ids.length) throw new ErroHttp(400, 'Ordem inválida.');
  await transacao(async (client) => {
    const { rows } = await client.query('SELECT id FROM processos ORDER BY ordem, criado_em FOR UPDATE');
    if (rows.length !== ids.length || rows.some(({ id }) => !ids.includes(id))) throw new ErroHttp(409, 'A lista de processos mudou. Recarregue a página e tente novamente.');
    for (const [i, id] of ids.entries()) await client.query('UPDATE processos SET ordem = $2 WHERE id = $1', [id, i + 1]);
  });
  return listarProcessos();
}

export async function excluirProcesso(id) {
  const { rowCount } = await consulta('DELETE FROM processos WHERE id = $1', [id]);
  if (!rowCount) throw new ErroHttp(404, 'Processo não encontrado.');
}
