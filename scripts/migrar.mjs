/* Aplica as migrations SQL de db/migrations (em ordem, uma única vez cada)
   e sincroniza o administrador definido em ADMIN_USERNAME / ADMIN_PASSWORD.
   Roda automaticamente no build do Vercel (npm run vercel-build) e pode ser executado à mão:
     npm run migrar */
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import pg from 'pg';
import { sincronizarAdmin } from '../lib/usuarios.js';

const PASTA = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'db', 'migrations');
const TRAVA = 745_211; // pg_advisory_lock: evita dois deploys migrando ao mesmo tempo

async function main() {
  if (process.env.SKIP_MIGRATIONS === '1') { console.log('SKIP_MIGRATIONS=1 — migrations ignoradas.'); return; }
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) throw new Error('DATABASE_URL não definida. Conecte o Neon ao projeto no Vercel (ou defina no .env).');
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    throw new Error('SESSION_SECRET não definida (mínimo 32 caracteres).');
  }

  const client = new pg.Client({ connectionString });
  await client.connect();
  try {
    await client.query('SELECT pg_advisory_lock($1)', [TRAVA]);
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      nome text PRIMARY KEY, aplicada_em timestamptz NOT NULL DEFAULT now())`);
    const { rows } = await client.query('SELECT nome FROM schema_migrations');
    const aplicadas = new Set(rows.map((r) => r.nome));
    const arquivos = (await readdir(PASTA)).filter((f) => f.endsWith('.sql')).sort();

    let novas = 0;
    for (const arquivo of arquivos) {
      if (aplicadas.has(arquivo)) continue;
      const sql = await readFile(path.join(PASTA, arquivo), 'utf8');
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (nome) VALUES ($1)', [arquivo]);
        await client.query('COMMIT');
        console.log(`✔ ${arquivo}`);
        novas += 1;
      } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Falha na migration ${arquivo}: ${err.message}`);
      }
    }
    console.log(novas ? `${novas} migration(s) aplicada(s).` : 'Banco já está atualizado.');

    const adminId = await sincronizarAdmin(client);
    console.log(adminId
      ? `Administrador "${process.env.ADMIN_USERNAME}" sincronizado.`
      : 'Aviso: ADMIN_USERNAME/ADMIN_PASSWORD não definidos — nenhum administrador criado.');
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [TRAVA]).catch(() => {});
    await client.end();
  }
}

main().catch((err) => { console.error(err.message); process.exit(1); });
