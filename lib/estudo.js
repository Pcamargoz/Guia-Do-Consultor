/* Modo Estudo: marcações (grifos, anotações, comentários, favoritos), estado das checklists
   e progresso de leitura — sempre do usuário autenticado.
   Toda consulta e alteração é filtrada por usuario_id: ninguém enxerga ou altera o estudo de outra pessoa. */
import { consulta } from './db.js';
import { ErroHttp } from './http.js';

const DOCUMENTOS = new Set(['apostila']);
const TIPOS = new Set(['grifo', 'nota', 'comentario', 'favorito']);
const CORES = new Set(['amarelo', 'verde', 'azul', 'rosa']);
const MAX_TEXTO = 4000;
const MAX_TRECHO = 600;
const MAX_CHAVE = 80;
const MAX_SECAO = 200;
const MAX_MARCACOES = 2000;   // por usuário e documento
const MAX_ITENS = 2000;
const BLOCO_VALIDO = /^[\w.:-]{1,60}$/;

export function validarDocumento(valor) {
  const documento = String(valor || 'apostila');
  if (!DOCUMENTOS.has(documento)) throw new ErroHttp(400, 'Documento inválido.');
  return documento;
}

const texto = (valor, max) => (typeof valor === 'string' ? valor.trim().slice(0, max) : '');
const inteiroOuNulo = (valor) => (valor !== null && valor !== undefined && valor !== '' && Number.isInteger(Number(valor)) && Number(valor) >= 0 ? Number(valor) : null);

function validarAncora(ancora) {
  if (!ancora || typeof ancora !== 'object') throw new ErroHttp(400, 'Âncora inválida.');
  const bloco = String(ancora.bloco || '');
  if (!BLOCO_VALIDO.test(bloco)) throw new ErroHttp(400, 'Trecho inválido: bloco não identificado.');
  const inicio = Number(ancora.inicio);
  const fim = Number(ancora.fim);
  if (!Number.isInteger(inicio) || !Number.isInteger(fim) || inicio < 0 || fim <= inicio || fim - inicio > MAX_TRECHO) {
    throw new ErroHttp(400, 'Trecho inválido: posição fora dos limites.');
  }
  return { bloco, inicio, fim };
}

const formatarMarcacao = (linha) => ({
  id: String(linha.id),
  tipo: linha.tipo,
  cor: linha.cor,
  ancora: linha.ancora,
  trecho: linha.trecho,
  texto: linha.texto,
  pagina: linha.pagina,
  secao: linha.secao,
  criadoEm: linha.criado_em,
  atualizadoEm: linha.atualizado_em,
});

const formatarItem = (linha) => ({
  chave: linha.chave,
  concluido: linha.concluido,
  observacao: linha.observacao,
  texto: linha.texto,
  pagina: linha.pagina,
  secao: linha.secao,
  concluidoEm: linha.concluido_em,
  atualizadoEm: linha.atualizado_em,
});

const progressoPadrao = { modoEstudo: false, ultimaPagina: null, ultimaSecao: '', ultimoBloco: '', paginasLidas: [], atualizadoEm: null };

const formatarProgresso = (linha) => (linha ? {
  modoEstudo: linha.modo_estudo,
  ultimaPagina: linha.ultima_pagina,
  ultimaSecao: linha.ultima_secao,
  ultimoBloco: linha.ultimo_bloco,
  paginasLidas: linha.paginas_lidas || [],
  atualizadoEm: linha.atualizado_em,
} : { ...progressoPadrao });

/** Estado completo do estudo do usuário naquele documento (uma única ida ao banco por tabela). */
export async function carregarEstudo(usuarioId, documento) {
  const [marcacoes, itens, progresso] = await Promise.all([
    consulta('SELECT * FROM estudo_marcacoes WHERE usuario_id = $1 AND documento = $2 ORDER BY pagina NULLS LAST, id', [usuarioId, documento]),
    consulta('SELECT * FROM estudo_itens WHERE usuario_id = $1 AND documento = $2 ORDER BY pagina NULLS LAST, id', [usuarioId, documento]),
    consulta('SELECT * FROM estudo_progresso WHERE usuario_id = $1 AND documento = $2', [usuarioId, documento]),
  ]);
  return {
    marcacoes: marcacoes.rows.map(formatarMarcacao),
    itens: itens.rows.map(formatarItem),
    progresso: formatarProgresso(progresso.rows[0]),
  };
}

export async function criarMarcacao(usuarioId, documento, dados) {
  const tipo = String(dados.tipo || '');
  if (!TIPOS.has(tipo)) throw new ErroHttp(400, 'Tipo de marcação inválido.');
  const cor = CORES.has(dados.cor) ? dados.cor : 'amarelo';
  const ancora = validarAncora(dados.ancora);
  const conteudo = texto(dados.texto, MAX_TEXTO);
  if ((tipo === 'nota' || tipo === 'comentario') && !conteudo) throw new ErroHttp(400, 'Escreva o conteúdo da anotação.');

  const { rows: total } = await consulta('SELECT count(*)::int AS n FROM estudo_marcacoes WHERE usuario_id = $1 AND documento = $2', [usuarioId, documento]);
  if (total[0].n >= MAX_MARCACOES) throw new ErroHttp(409, 'Limite de marcações atingido neste material.');

  const { rows } = await consulta(
    `INSERT INTO estudo_marcacoes (usuario_id, documento, tipo, cor, ancora, trecho, texto, pagina, secao)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [usuarioId, documento, tipo, cor, ancora, texto(dados.trecho, MAX_TRECHO), conteudo, inteiroOuNulo(dados.pagina), texto(dados.secao, MAX_SECAO)],
  );
  return formatarMarcacao(rows[0]);
}

export async function atualizarMarcacao(usuarioId, documento, id, dados) {
  const cor = dados.cor === undefined ? null : (CORES.has(dados.cor) ? dados.cor : null);
  if (dados.cor !== undefined && !cor) throw new ErroHttp(400, 'Cor inválida.');
  const conteudo = dados.texto === undefined ? null : texto(dados.texto, MAX_TEXTO);
  const { rows } = await consulta(
    `UPDATE estudo_marcacoes SET cor = COALESCE($4, cor), texto = COALESCE($5, texto), atualizado_em = now()
     WHERE id = $1 AND usuario_id = $2 AND documento = $3 RETURNING *`,
    [id, usuarioId, documento, cor, conteudo],
  );
  if (!rows[0]) throw new ErroHttp(404, 'Marcação não encontrada.');
  return formatarMarcacao(rows[0]);
}

export async function excluirMarcacao(usuarioId, documento, id) {
  const { rowCount } = await consulta('DELETE FROM estudo_marcacoes WHERE id = $1 AND usuario_id = $2 AND documento = $3', [id, usuarioId, documento]);
  if (!rowCount) throw new ErroHttp(404, 'Marcação não encontrada.');
}

/** Marca/desmarca um item da checklist e guarda a observação do usuário. */
export async function salvarItem(usuarioId, documento, dados) {
  const chave = texto(dados.chave, MAX_CHAVE);
  if (!chave) throw new ErroHttp(400, 'Item da checklist não identificado.');
  if (typeof dados.concluido !== 'boolean') throw new ErroHttp(400, 'Informe se o item foi concluído.');
  const concluido = dados.concluido;
  const observacao = texto(dados.observacao, MAX_TEXTO);

  const { rows: total } = await consulta('SELECT count(*)::int AS n FROM estudo_itens WHERE usuario_id = $1 AND documento = $2', [usuarioId, documento]);
  if (total[0].n >= MAX_ITENS) {
    const { rowCount } = await consulta('SELECT 1 FROM estudo_itens WHERE usuario_id = $1 AND documento = $2 AND chave = $3', [usuarioId, documento, chave]);
    if (!rowCount) throw new ErroHttp(409, 'Limite de itens atingido neste material.');
  }

  const { rows } = await consulta(
    `INSERT INTO estudo_itens (usuario_id, documento, chave, concluido, observacao, texto, pagina, secao, concluido_em)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CASE WHEN $4 THEN now() END)
     ON CONFLICT (usuario_id, documento, chave) DO UPDATE SET
       concluido = EXCLUDED.concluido,
       observacao = EXCLUDED.observacao,
       texto = CASE WHEN EXCLUDED.texto = '' THEN estudo_itens.texto ELSE EXCLUDED.texto END,
       pagina = COALESCE(EXCLUDED.pagina, estudo_itens.pagina),
       secao = CASE WHEN EXCLUDED.secao = '' THEN estudo_itens.secao ELSE EXCLUDED.secao END,
       concluido_em = CASE WHEN EXCLUDED.concluido AND NOT estudo_itens.concluido THEN now()
                           WHEN EXCLUDED.concluido THEN estudo_itens.concluido_em END,
       atualizado_em = now()
     RETURNING *`,
    [usuarioId, documento, chave, concluido, observacao, texto(dados.texto, MAX_TRECHO), inteiroOuNulo(dados.pagina), texto(dados.secao, MAX_SECAO)],
  );
  return formatarItem(rows[0]);
}

/** Guarda onde o usuário parou, as páginas lidas e se o Modo Estudo está ativo. */
export async function salvarProgresso(usuarioId, documento, dados) {
  const paginas = Array.isArray(dados.paginasLidas)
    ? [...new Set(dados.paginasLidas.map(inteiroOuNulo).filter((n) => n !== null))].slice(0, 500).sort((a, b) => a - b)
    : null;
  const { rows } = await consulta(
    `INSERT INTO estudo_progresso (usuario_id, documento, modo_estudo, ultima_pagina, ultima_secao, ultimo_bloco, paginas_lidas)
     VALUES ($1, $2, COALESCE($3, false), $4, COALESCE($5, ''), COALESCE($6, ''), COALESCE($7, '[]'::jsonb))
     ON CONFLICT (usuario_id, documento) DO UPDATE SET
       modo_estudo = COALESCE($3, estudo_progresso.modo_estudo),
       ultima_pagina = COALESCE($4, estudo_progresso.ultima_pagina),
       ultima_secao = COALESCE($5, estudo_progresso.ultima_secao),
       ultimo_bloco = COALESCE($6, estudo_progresso.ultimo_bloco),
       paginas_lidas = COALESCE($7, estudo_progresso.paginas_lidas),
       atualizado_em = now()
     RETURNING *`,
    [
      usuarioId, documento,
      typeof dados.modoEstudo === 'boolean' ? dados.modoEstudo : null,
      inteiroOuNulo(dados.ultimaPagina),
      dados.ultimaSecao === undefined ? null : texto(dados.ultimaSecao, MAX_SECAO),
      dados.ultimoBloco === undefined ? null : texto(dados.ultimoBloco, MAX_CHAVE),
      paginas ? JSON.stringify(paginas) : null,
    ],
  );
  return formatarProgresso(rows[0]);
}
