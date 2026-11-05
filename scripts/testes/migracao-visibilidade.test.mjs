/* A migration 013 (não executada nesta tarefa) semeia exatamente os valores iniciais de lib/visibilidade.js
   e não apaga nada. Teste estático do SQL — sem banco. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { VALORES_INICIAIS } from '../../lib/visibilidade.js';

const SQL = readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../db/migrations/013_visibilidade.sql'), 'utf8');

describe('db/migrations/013_visibilidade.sql', () => {
  it('semeia as mesmas chaves, valores e perfis da função pura', () => {
    const linhas = [...SQL.matchAll(/\('([a-z]+:[a-z0-9-]+)', (true|false), ARRAY\[([^\]]*)\]::text\[\]\)/g)]
      .map(([, chave, visivel, perfis]) => ({ chave, visivel: visivel === 'true', perfis: perfis.split(',').map((p) => p.trim().replace(/'/g, '')).filter(Boolean) }));
    assert.deepEqual(linhas, VALORES_INICIAIS.map((i) => ({ chave: i.chave, visivel: i.visivel, perfis: [...i.perfis] })));
  });
  it('é idempotente e não destrutiva', () => {
    assert.match(SQL, /ON CONFLICT \(chave\) DO NOTHING/);
    assert.match(SQL, /CREATE TABLE IF NOT EXISTS visibilidade \(/);
    assert.match(SQL, /CREATE TABLE IF NOT EXISTS visibilidade_historico/);
    const semComentarios = SQL.replace(/--.*$/gm, '').replace(/ON DELETE SET NULL/g, '');
    assert.doesNotMatch(semComentarios, /\b(DROP|DELETE|TRUNCATE|UPDATE|ALTER)\b/i);
  });
});
