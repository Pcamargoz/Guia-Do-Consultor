/* Progresso dos checklists por usuário e imagens anexadas às etapas.
   Cada pessoa só enxerga e altera os próprios dados. Os anexos ficam no PostgreSQL (bytea), com limites
   por imagem, por etapa, por checklist e por usuário para não encher o banco. */
import { consulta, transacao } from './db.js';
import { ErroHttp } from './http.js';

export const MAX_IMAGEM = 1_500_000; // 1,5 MB por imagem (o front reduz antes de enviar; o limite do Vercel é 4,5 MB)
const MAX_POR_ETAPA = 6;
const MAX_POR_CHECKLIST = 40;
const MAX_TOTAL_USUARIO = 60_000_000; // 60 MB por usuário
const MAX_DADOS = 200_000; // caracteres do JSON de progresso
const CHAVE = /^[a-z0-9:_-]{3,80}$/;
const ITEM = /^[A-Za-z0-9_.:-]{1,80}$/;

const texto = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');

export function validarChave(chave) {
  if (typeof chave !== 'string' || !CHAVE.test(chave)) throw new ErroHttp(400, 'Checklist inválido.');
  return chave;
}

/** Mantém só o que o checklist grava: etapas marcadas, registros, problemas, validador e anotações. */
export function limparDados(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) throw new ErroHttp(400, 'Dados do checklist inválidos.');
  const mapa = (origem, limiteTexto) => {
    const saida = {};
    if (!origem || typeof origem !== 'object' || Array.isArray(origem)) return saida;
    for (const [k, v] of Object.entries(origem).slice(0, 600)) {
      if (!ITEM.test(k)) continue;
      saida[k] = limiteTexto ? texto(v, limiteTexto) : 1;
    }
    return saida;
  };
  const limpo = {
    marcados: mapa(dados.marcados, 0),
    regs: mapa(dados.regs, 500),
    obs: mapa(dados.obs, 4000),
    validador: texto(dados.validador, 120),
    notas: texto(dados.notas, 20000),
    t: Number.isFinite(dados.t) ? Math.trunc(dados.t) : Date.now(),
  };
  if (JSON.stringify(limpo).length > MAX_DADOS) throw new ErroHttp(413, 'O progresso deste checklist ficou grande demais.');
  return limpo;
}

const anexoPublico = (l) => ({ id: String(l.id), item: l.item, nome: l.nome, tipo: l.tipo, tamanho: l.tamanho });

export async function obterProgresso(usuario, chave) {
  validarChave(chave);
  const [prog, anexos] = await Promise.all([
    consulta('SELECT dados, pct, atualizado_em FROM checklist_progresso WHERE usuario_id = $1 AND chave = $2', [usuario.id, chave]),
    consulta('SELECT id, item, nome, tipo, tamanho FROM checklist_anexos WHERE usuario_id = $1 AND chave = $2 ORDER BY id', [usuario.id, chave]),
  ]);
  const p = prog.rows[0];
  return {
    usuario: String(usuario.id),
    dados: p ? p.dados : null,
    pct: p ? p.pct : null,
    atualizadoEm: p ? p.atualizado_em : null,
    anexos: anexos.rows.map(anexoPublico),
  };
}

/** Resumo de todos os checklists do usuário (progresso e nº de imagens), para a biblioteca e o onboarding. */
export async function listarProgresso(usuario) {
  const { rows } = await consulta(
    `SELECT p.chave, p.pct, p.atualizado_em,
            (SELECT count(*)::int FROM checklist_anexos a WHERE a.usuario_id = p.usuario_id AND a.chave = p.chave) AS anexos
       FROM checklist_progresso p WHERE p.usuario_id = $1 ORDER BY p.chave`,
    [usuario.id],
  );
  return { usuario: String(usuario.id), itens: rows.map((r) => ({ chave: r.chave, pct: r.pct, atualizadoEm: r.atualizado_em, anexos: r.anexos })) };
}

/** Checklists do usuário com algum problema registrado (dados completos e imagens), para o relatório do desenvolvimento. */
export async function listarProblemas(usuario) {
  const { rows } = await consulta(
    `SELECT chave, dados, pct, atualizado_em FROM checklist_progresso
      WHERE usuario_id = $1 AND jsonb_typeof(dados->'obs') = 'object' AND dados->'obs' <> '{}'::jsonb ORDER BY chave`,
    [usuario.id],
  );
  const anexos = rows.length
    ? (await consulta('SELECT id, chave, item, nome, tipo, tamanho FROM checklist_anexos WHERE usuario_id = $1 AND chave = ANY($2) ORDER BY id', [usuario.id, rows.map((r) => r.chave)])).rows
    : [];
  return {
    usuario: String(usuario.id),
    itens: rows.map((r) => ({ chave: r.chave, dados: r.dados, pct: r.pct, atualizadoEm: r.atualizado_em, anexos: anexos.filter((a) => a.chave === r.chave).map(anexoPublico) })),
  };
}

export async function salvarProgresso(usuario, chave, { dados, pct }) {
  validarChave(chave);
  const limpo = limparDados(dados);
  const n = Number(pct);
  const percentual = Number.isInteger(n) && n >= 0 && n <= 100 ? n : 0;
  const { rows } = await consulta(
    `INSERT INTO checklist_progresso (usuario_id, chave, dados, pct, atualizado_em) VALUES ($1, $2, $3::jsonb, $4, now())
     ON CONFLICT (usuario_id, chave) DO UPDATE SET dados = EXCLUDED.dados, pct = EXCLUDED.pct, atualizado_em = now()
     RETURNING atualizado_em`,
    [usuario.id, chave, JSON.stringify(limpo), percentual],
  );
  return { atualizadoEm: rows[0].atualizado_em };
}

/** "Recomeçar": apaga o progresso e as imagens deste checklist (só as do próprio usuário). */
export async function apagarProgresso(usuario, chave) {
  validarChave(chave);
  return transacao(async (client) => {
    await client.query('DELETE FROM checklist_anexos WHERE usuario_id = $1 AND chave = $2', [usuario.id, chave]);
    await client.query('DELETE FROM checklist_progresso WHERE usuario_id = $1 AND chave = $2', [usuario.id, chave]);
    return { ok: true };
  });
}

/** Tipo real da imagem pelos primeiros bytes (não confia no Content-Type enviado). */
export function tipoDaImagem(b) {
  if (b.length > 12 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length > 12 && b.toString('latin1', 0, 4) === 'RIFF' && b.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  return null;
}

export async function adicionarAnexo(usuario, chave, item, nome, bytes) {
  validarChave(chave);
  if (typeof item !== 'string' || !ITEM.test(item)) throw new ErroHttp(400, 'Etapa inválida.');
  if (!bytes.length) throw new ErroHttp(400, 'Nenhuma imagem enviada.');
  if (bytes.length > MAX_IMAGEM) throw new ErroHttp(413, 'Imagem grande demais (máximo 1,5 MB).');
  const tipo = tipoDaImagem(bytes);
  if (!tipo) throw new ErroHttp(415, 'Envie uma imagem PNG, JPEG ou WebP.');
  const nomeLimpo = texto(nome, 120).replace(/[\r\n\\/]/g, ' ').trim();
  return transacao(async (client) => {
    // Serializa os envios do mesmo usuário para os limites valerem mesmo com várias imagens ao mesmo tempo.
    await client.query('SELECT pg_advisory_xact_lock(hashtext($1))', [`checklist-anexos:${usuario.id}`]);
    const { rows } = await client.query(
      `SELECT count(*) FILTER (WHERE chave = $2 AND item = $3)::int AS da_etapa,
              count(*) FILTER (WHERE chave = $2)::int AS do_checklist,
              COALESCE(sum(tamanho), 0)::bigint AS total
         FROM checklist_anexos WHERE usuario_id = $1`,
      [usuario.id, chave, item],
    );
    const c = rows[0];
    if (c.da_etapa >= MAX_POR_ETAPA) throw new ErroHttp(409, `Cada etapa aceita até ${MAX_POR_ETAPA} imagens.`);
    if (c.do_checklist >= MAX_POR_CHECKLIST) throw new ErroHttp(409, `Cada checklist aceita até ${MAX_POR_CHECKLIST} imagens.`);
    if (Number(c.total) + bytes.length > MAX_TOTAL_USUARIO) throw new ErroHttp(409, 'Você atingiu o limite de espaço para imagens. Remova algumas para anexar novas.');
    const ins = await client.query(
      'INSERT INTO checklist_anexos (usuario_id, chave, item, nome, tipo, tamanho, dados) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, item, nome, tipo, tamanho',
      [usuario.id, chave, item, nomeLimpo, tipo, bytes.length, bytes],
    );
    return anexoPublico(ins.rows[0]);
  });
}

export async function lerAnexo(usuario, id) {
  if (!/^\d{1,15}$/.test(String(id))) throw new ErroHttp(404, 'Imagem não encontrada.');
  const { rows } = await consulta('SELECT tipo, nome, dados FROM checklist_anexos WHERE id = $1 AND usuario_id = $2', [id, usuario.id]);
  if (!rows[0]) throw new ErroHttp(404, 'Imagem não encontrada.');
  return rows[0];
}

export async function removerAnexo(usuario, id) {
  if (!/^\d{1,15}$/.test(String(id))) throw new ErroHttp(404, 'Imagem não encontrada.');
  const { rowCount } = await consulta('DELETE FROM checklist_anexos WHERE id = $1 AND usuario_id = $2', [id, usuario.id]);
  if (!rowCount) throw new ErroHttp(404, 'Imagem não encontrada.');
  return { ok: true };
}
