/* Fluxo de atendimento das dúvidas da apostila. O e-mail é apenas uma notificação. */
import { consulta } from './db.js';
import { ErroHttp } from './http.js';

const CONSULTA_BASE = `
  SELECT d.id, d.marcacao_id, d.autor_id, d.padrinho_id, d.status, d.resposta,
         d.enviada_em, d.assumida_em, d.respondida_em,
         m.pagina, m.secao, m.trecho, m.texto,
         a.nome AS autor_nome, a.login AS autor_login,
         p.nome AS padrinho_nome, p.login AS padrinho_login
  FROM estudo_duvidas d
  JOIN estudo_marcacoes m ON m.id = d.marcacao_id
  JOIN usuarios a ON a.id = d.autor_id
  LEFT JOIN usuarios p ON p.id = d.padrinho_id`;

const formatar = (x) => ({
  id: String(x.id), marcacaoId: String(x.marcacao_id), autorId: String(x.autor_id),
  autor: x.autor_nome || x.autor_login, padrinhoId: x.padrinho_id ? String(x.padrinho_id) : null,
  padrinho: x.padrinho_nome || x.padrinho_login || null,
  status: x.status, resposta: x.resposta, pagina: x.pagina, secao: x.secao,
  trecho: x.trecho, texto: x.texto, enviadaEm: x.enviada_em,
  assumidaEm: x.assumida_em, respondidaEm: x.respondida_em,
});

export async function minhasDuvidas(usuarioId) {
  const { rows } = await consulta(`${CONSULTA_BASE} WHERE d.autor_id = $1 ORDER BY d.enviada_em DESC, d.id DESC LIMIT 2000`, [usuarioId]);
  return rows.map(formatar);
}

export async function filaDuvidas(id = null) {
  const { rows } = await consulta(`${CONSULTA_BASE}
    ${id ? 'WHERE d.id = $1' : ''}
    ORDER BY CASE WHEN d.status = 'aberta' THEN 0 ELSE 1 END, d.enviada_em DESC, d.id DESC
    LIMIT 500`, id ? [id] : []);
  return rows.map(formatar);
}

/** Envio idempotente: dúvidas já enviadas não voltam para a fila nem geram novo aviso. */
export async function enviarDuvidas(usuarioId) {
  const { rows } = await consulta(`
    WITH novas AS (
      INSERT INTO estudo_duvidas (marcacao_id, autor_id)
      SELECT m.id, m.usuario_id FROM estudo_marcacoes m
      WHERE m.usuario_id = $1 AND m.documento = 'apostila'
        AND m.tipo = 'comentario' AND m.rotulo = 'duvida'
      ON CONFLICT (marcacao_id) DO NOTHING
      RETURNING id, marcacao_id
    )
    SELECT n.id AS duvida_id, m.id, m.pagina, m.secao, m.trecho, m.texto
    FROM novas n JOIN estudo_marcacoes m ON m.id = n.marcacao_id
    ORDER BY m.pagina NULLS LAST, m.id`, [usuarioId]);
  return rows.map((x) => ({ id: String(x.duvida_id), marcacaoId: String(x.id), pagina: x.pagina, secao: x.secao, trecho: x.trecho, texto: x.texto }));
}

export async function assumirDuvida(id, usuarioId) {
  const { rows } = await consulta(`
    UPDATE estudo_duvidas SET padrinho_id = $2, assumida_em = COALESCE(assumida_em, now()), atualizado_em = now()
    WHERE id = $1 AND status = 'aberta' AND autor_id <> $2
      AND (padrinho_id IS NULL OR padrinho_id = $2)
    RETURNING id`, [id, usuarioId]);
  if (!rows[0]) throw new ErroHttp(409, 'Esta dúvida já foi assumida ou respondida. Atualize a lista.');
}

export async function liberarDuvida(id, usuarioId, admin) {
  const { rows } = await consulta(`
    UPDATE estudo_duvidas SET padrinho_id = NULL, assumida_em = NULL, atualizado_em = now()
    WHERE id = $1 AND status = 'aberta' AND (padrinho_id = $2 OR $3::boolean)
    RETURNING id`, [id, usuarioId, admin]);
  if (!rows[0]) throw new ErroHttp(409, 'Não foi possível liberar esta dúvida. Atualize a lista.');
}

export async function responderDuvida(id, usuarioId, resposta) {
  const texto = typeof resposta === 'string' ? resposta.trim() : '';
  if (!texto || texto.length > 4000) throw new ErroHttp(400, 'Escreva uma resposta de até 4.000 caracteres.');
  const { rows } = await consulta(`
    UPDATE estudo_duvidas SET resposta = $3, status = 'respondida', respondida_em = now(), atualizado_em = now()
    WHERE id = $1 AND padrinho_id = $2 AND status = 'aberta'
    RETURNING id`, [id, usuarioId, texto]);
  if (!rows[0]) throw new ErroHttp(409, 'Assuma esta dúvida antes de responder.');
}
