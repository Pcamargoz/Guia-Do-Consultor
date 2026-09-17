/* Conexão com o PostgreSQL (Neon em produção, Postgres local no Docker).
   Um pool por instância da função, reaproveitado entre requisições. */
import pg from 'pg';

let pool;

export function obterPool() {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) throw new Error('Defina a variável de ambiente DATABASE_URL (string de conexão do Neon).');

  pool = new pg.Pool({ connectionString, max: 5, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 10_000 });
  pool.on('error', (err) => console.error('Erro no pool do PostgreSQL:', err.message));

  // No Vercel (Fluid compute) fecha conexões ociosas antes de a instância ser suspensa.
  import('@vercel/functions').then(({ attachDatabasePool }) => attachDatabasePool?.(pool)).catch(() => {});
  return pool;
}

export const consulta = (texto, valores) => obterPool().query(texto, valores);

/** Executa fn(client) dentro de uma transação. */
export async function transacao(fn) {
  const client = await obterPool().connect();
  try {
    await client.query('BEGIN');
    const resultado = await fn(client);
    await client.query('COMMIT');
    return resultado;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}
