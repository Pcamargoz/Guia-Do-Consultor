/* Regras dos módulos do Guia: validação, CRUD, status (Rever/Aprovado/Reprovado) e histórico.
   O conteúdo editável fica em "dados" (jsonb); status, revisão e datas ficam em colunas próprias. */
import { randomBytes } from 'node:crypto';
import { consulta, transacao } from './db.js';
import { ErroHttp } from './http.js';
import { formatarDuracao, limparMinutosPorPacote, validarMinutos } from './horas.js';
import { pacoteIncluiModulo } from './pacotes.js';

const STATUS = new Set(['rever', 'aprovado', 'reprovado']);
const ROTULOS = { rever: 'Rever', aprovado: 'Aprovado', reprovado: 'Reprovado' };
const LISTAS = ['fluxo', 'boasPraticas', 'checklist'];
const NOMES_LISTAS = { fluxo: 'Etapas', boasPraticas: 'Boas práticas', checklist: 'Checklist' };
const CAMPOS_TEXTO = {
  nome: 80, subtitulo: 60, objetivo: 2000, papel: 2000, quando: 2000,
  prerequisito: 2000, fluxoDesc: 500, treinamento: 4000, icone: 40, cor: 9,
};
const TAGS = new Set(['vendas', 'fiscal', 'operacao', 'gestao']);
const MAX_ITENS = 60;
const MAX_TEXTO_ITEM = 400;
const MAX_HISTORICO = 50;
const ID_VALIDO = /^[\w-]{1,40}$/;

const novoId = () => randomBytes(6).toString('hex');
const autorDe = (usuario) => (usuario.nome || usuario.login || '').slice(0, 80);

function texto(valor, max) {
  if (valor == null) return '';
  if (typeof valor !== 'string') throw new ErroHttp(400, 'Campo de texto inválido.');
  return valor.trim().slice(0, max);
}

function limparItens(lista, anterioresPorId) {
  if (!Array.isArray(lista)) return [];
  return lista.slice(0, MAX_ITENS).map((bruto) => {
    const conteudo = texto(typeof bruto === 'string' ? bruto : bruto?.texto, MAX_TEXTO_ITEM);
    if (!conteudo) return null;
    const id = typeof bruto?.id === 'string' && ID_VALIDO.test(bruto.id) ? bruto.id : novoId();
    const antigo = anterioresPorId.get(id);
    return {
      id, texto: conteudo,
      status: antigo?.status ?? null, statusEm: antigo?.statusEm ?? null, statusPor: antigo?.statusPor ?? '',
      // duração prevista por pacote (minutos): preservada nas edições de conteúdo; itens novos começam sem horas
      minutos: limparMinutosPorPacote(antigo?.minutos),
    };
  }).filter(Boolean);
}

function limparModulo(entrada, anterior) {
  if (!entrada || typeof entrada !== 'object') throw new ErroHttp(400, 'Módulo inválido.');
  const dados = {};
  for (const [campo, max] of Object.entries(CAMPOS_TEXTO)) dados[campo] = texto(entrada[campo], max);
  if (!dados.nome) throw new ErroHttp(400, 'Informe o nome do módulo.');
  dados.cor = /^#[0-9a-fA-F]{6}$/.test(dados.cor) ? dados.cor.toLowerCase() : '#3478a7';
  dados.tags = Array.isArray(entrada.tags) ? [...new Set(entrada.tags.filter((t) => TAGS.has(t)))] : [];
  if (!dados.tags.length) dados.tags = ['gestao'];

  const anteriores = new Map();
  if (anterior) for (const chave of LISTAS) for (const item of anterior[chave] || []) anteriores.set(item.id, item);
  for (const chave of LISTAS) dados[chave] = limparItens(entrada[chave], anteriores);
  return dados;
}

function descreverMudancas(anterior, novo) {
  const partes = [];
  for (const chave of LISTAS) {
    const antes = new Map((anterior[chave] || []).map((i) => [i.id, i.texto]));
    const depois = new Map(novo[chave].map((i) => [i.id, i.texto]));
    const adicionados = [...depois.keys()].filter((id) => !antes.has(id)).length;
    const removidos = [...antes.keys()].filter((id) => !depois.has(id)).length;
    const editados = [...depois.keys()].filter((id) => antes.has(id) && antes.get(id) !== depois.get(id)).length;
    const reordenado = !adicionados && !removidos && [...antes.keys()].join() !== [...depois.keys()].join();
    const bits = [];
    if (adicionados) bits.push(`+${adicionados}`);
    if (removidos) bits.push(`−${removidos}`);
    if (editados) bits.push(`${editados} editada(s)`);
    if (reordenado) bits.push('reordenado');
    if (bits.length) partes.push(`${NOMES_LISTAS[chave]}: ${bits.join(', ')}`);
  }
  const campos = Object.keys(CAMPOS_TEXTO).filter((c) => (c === 'cor'
    ? (anterior.cor || '').toLowerCase() !== novo.cor
    : (anterior[c] || '') !== novo[c]));
  if (campos.length) partes.push(`Campos: ${campos.join(', ')}`);
  if ((anterior.tags || []).join() !== novo.tags.join()) partes.push('Categorias');
  return partes.join(' · ') || 'Sem alterações de conteúdo';
}

/** Linha do banco → objeto usado pelo front-end (mesmo formato de antes). */
function formatar(linha, historico = []) {
  return {
    id: linha.id,
    ...linha.dados,
    status: linha.status,
    statusEm: linha.status_em,
    statusPor: linha.status_por || '',
    rev: linha.rev,
    criadoEm: linha.criado_em,
    atualizadoEm: linha.atualizado_em,
    historico,
  };
}

const SELECT_COM_HISTORICO = `
  SELECT m.*, COALESCE((
    SELECT json_agg(json_build_object('em', h.em, 'acao', h.acao, 'detalhe', h.detalhe, 'autor', h.autor) ORDER BY h.em DESC, h.id DESC)
    FROM (SELECT * FROM modulos_historico WHERE modulo_id = m.id ORDER BY em DESC, id DESC LIMIT ${MAX_HISTORICO}) h
  ), '[]'::json) AS historico
  FROM modulos m`;

export async function listarModulos() {
  const { rows } = await consulta(`${SELECT_COM_HISTORICO} ORDER BY m.ordem, m.criado_em`);
  return rows.map((r) => formatar(r, r.historico));
}

async function buscarComHistorico(db, id) {
  const { rows } = await db.query(`${SELECT_COM_HISTORICO} WHERE m.id = $1`, [id]);
  if (!rows[0]) throw new ErroHttp(404, 'Módulo não encontrado.');
  return formatar(rows[0], rows[0].historico);
}

async function bloquear(client, id) {
  const { rows } = await client.query('SELECT * FROM modulos WHERE id = $1 FOR UPDATE', [id]);
  if (!rows[0]) throw new ErroHttp(404, 'Módulo não encontrado.');
  return rows[0];
}

const registrar = (client, moduloId, acao, detalhe, usuario) => client.query(
  'INSERT INTO modulos_historico (modulo_id, acao, detalhe, autor, usuario_id) VALUES ($1, $2, $3, $4, $5)',
  [moduloId, acao, detalhe, autorDe(usuario), usuario.id],
);

export async function criarModulo(entrada, usuario) {
  const dados = limparModulo(entrada);
  return transacao(async (client) => {
    const id = novoId();
    await client.query(
      `INSERT INTO modulos (id, ordem, dados) VALUES ($1, (SELECT COALESCE(MAX(ordem), 0) + 1 FROM modulos), $2)`,
      [id, dados],
    );
    await registrar(client, id, 'criado', 'Módulo criado', usuario);
    return buscarComHistorico(client, id);
  });
}

export async function atualizarModulo(id, rev, entrada, usuario) {
  return transacao(async (client) => {
    const atual = await bloquear(client, id);
    if (rev !== atual.rev) {
      const err = new ErroHttp(409, 'Este módulo foi alterado por outra pessoa. Recarregamos a versão mais recente.');
      err.modulo = await buscarComHistorico(client, id);
      throw err;
    }
    const dados = limparModulo(entrada, atual.dados);
    await client.query('UPDATE modulos SET dados = $2, rev = rev + 1, atualizado_em = now() WHERE id = $1', [id, dados]);
    await registrar(client, id, 'editado', descreverMudancas(atual.dados, dados), usuario);
    return buscarComHistorico(client, id);
  });
}

export async function marcarStatus(id, { alvo, status }, usuario) {
  const novo = status == null ? null : String(status);
  if (novo !== null && !STATUS.has(novo)) throw new ErroHttp(400, 'Status inválido.');
  if (typeof alvo !== 'string' || !alvo) throw new ErroHttp(400, 'Informe o alvo da marcação.');

  return transacao(async (client) => {
    const atual = await bloquear(client, id);
    const quem = autorDe(usuario);
    let descricao = 'Módulo';

    if (alvo === 'modulo') {
      await client.query(
        'UPDATE modulos SET status = $2, status_em = CASE WHEN $2::text IS NULL THEN NULL ELSE now() END, status_por = $3, atualizado_em = now() WHERE id = $1',
        [id, novo, novo ? quem : ''],
      );
    } else {
      const dados = structuredClone(atual.dados);
      const item = LISTAS.flatMap((chave) => dados[chave] || []).find((i) => i.id === alvo);
      if (!item) throw new ErroHttp(404, 'Item não encontrado.');
      Object.assign(item, { status: novo, statusEm: novo ? new Date().toISOString() : null, statusPor: novo ? quem : '' });
      descricao = `“${item.texto}”`;
      await client.query('UPDATE modulos SET dados = $2, atualizado_em = now() WHERE id = $1', [id, dados]);
    }
    await registrar(client, id, novo || 'limpo', `${descricao}: ${novo ? ROTULOS[novo] : 'status removido'}`, usuario);
    return buscarComHistorico(client, id);
  });
}

/** Altera a duração prevista (em minutos) de um item da checklist para um pacote. */
export async function definirMinutos(id, { itemId, pacote, minutos }, usuario) {
  const novo = validarMinutos(minutos);
  if (typeof itemId !== 'string' || !itemId) throw new ErroHttp(400, 'Informe o item da checklist.');
  return transacao(async (client) => {
    const atual = await bloquear(client, id);
    const nomePacote = await pacoteIncluiModulo(client, pacote, id);
    const dados = structuredClone(atual.dados);
    const item = (dados.checklist || []).find((i) => i.id === itemId);
    if (!item) throw new ErroHttp(404, 'Item da checklist não encontrado.');
    const anterior = item.minutos?.[pacote] ?? 0;
    if (anterior === novo) return buscarComHistorico(client, id);
    item.minutos = { ...limparMinutosPorPacote(item.minutos), [pacote]: novo };
    await client.query('UPDATE modulos SET dados = $2, atualizado_em = now() WHERE id = $1', [id, dados]);
    await registrar(client, id, 'horas', `“${item.texto}” (${nomePacote}): ${formatarDuracao(anterior)} → ${formatarDuracao(novo)}`, usuario);
    return buscarComHistorico(client, id);
  });
}

export async function excluirModulo(id) {
  const { rowCount } = await consulta('DELETE FROM modulos WHERE id = $1', [id]);
  if (!rowCount) throw new ErroHttp(404, 'Módulo não encontrado.');
}
