/* Leitura e gravação da tabela `visibilidade` (migration 013). A regra fica em lib/visibilidade.js (pura).
   Cache de 30 s por instância da função (doc 04). Se o banco falhar ou a tabela ainda não existir,
   usa os valores iniciais do doc 04 — a apostila continua oculta (falha segura). */
import { consulta, transacao } from './db.js';
import { VALORES_INICIAIS } from './visibilidade.js';

const CACHE_MS = 30_000;
let cache = null; // { em, linhas }

export function limparCacheVisibilidade() { cache = null; }

/** Linhas da tabela com o nome de quem alterou. Nunca lança: em falha devolve os valores iniciais. */
export async function carregarLinhas({ semCache = false } = {}) {
  if (!semCache && cache && Date.now() - cache.em < CACHE_MS) return cache.linhas;
  try {
    const { rows } = await consulta(
      `SELECT v.chave, v.visivel, v.perfis, v.atualizado_em, COALESCE(u.nome, u.login) AS atualizado_por_nome
         FROM visibilidade v LEFT JOIN usuarios u ON u.id = v.atualizado_por`,
    );
    cache = { em: Date.now(), linhas: rows };
    return rows;
  } catch (err) {
    console.error('Visibilidade indisponível, usando valores iniciais:', err.message);
    return VALORES_INICIAIS;
  }
}

/** Grava uma chave e o histórico na mesma transação. `item` já validado por validarAtualizacao(). */
export async function salvarLinha(item, usuario) {
  const linha = await transacao(async (client) => {
    const { rows: antes } = await client.query('SELECT visivel, perfis FROM visibilidade WHERE chave = $1 FOR UPDATE', [item.chave]);
    const { rows } = await client.query(
      `INSERT INTO visibilidade (chave, visivel, perfis, atualizado_por, atualizado_em)
            VALUES ($1, $2, $3::text[], $4, now())
       ON CONFLICT (chave) DO UPDATE SET visivel = EXCLUDED.visivel, perfis = EXCLUDED.perfis,
             atualizado_por = EXCLUDED.atualizado_por, atualizado_em = now()
       RETURNING chave, visivel, perfis, atualizado_em`,
      [item.chave, item.visivel, item.perfis, usuario.id],
    );
    await client.query(
      `INSERT INTO visibilidade_historico (chave, visivel_antes, perfis_antes, visivel, perfis, alterado_por)
            VALUES ($1, $2, $3::text[], $4, $5::text[], $6)`,
      [item.chave, antes[0]?.visivel ?? null, antes[0]?.perfis ?? null, item.visivel, item.perfis, usuario.id],
    );
    return { ...rows[0], atualizado_por_nome: usuario.nome || usuario.login };
  });
  limparCacheVisibilidade();
  return linha;
}
