/* As migrations 013 e 014 juntas semeiam exatamente os valores iniciais de lib/visibilidade.js e não apagam nada.
   Teste estático do SQL — sem banco. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { IDS_MODULOS } from '../../lib/conteudo/mapa-modulos.js';
import { TIPOS_RECURSO, VALORES_INICIAIS } from '../../lib/visibilidade.js';

const ler = (nome) => readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '../../db/migrations', nome), 'utf8');
const SQL = ler('013_visibilidade.sql');
const SQL_014 = ler('014_metodologia.sql');
const linhasDe = (sql) => [...sql.matchAll(/\('([a-z]+:[a-z0-9-]+)', (true|false), ARRAY\[([^\]]*)\]::text\[\]\)/g)]
  .map(([, chave, visivel, perfis]) => ({ chave, visivel: visivel === 'true', perfis: perfis.split(',').map((p) => p.trim().replace(/'/g, '')).filter(Boolean) }));
const porChave = (lista) => [...lista].sort((a, b) => a.chave.localeCompare(b.chave));

describe('db/migrations/013_visibilidade.sql + 014_metodologia.sql', () => {
  it('semeiam as mesmas chaves, valores e perfis da função pura', () => {
    // 014: os recursos saem de unnest(módulos) × unnest(tipos), todos visíveis para os dois perfis
    const lista = (re) => (SQL_014.match(re)?.[1] || '').split(',').map((x) => x.trim().replace(/'/g, '')).filter(Boolean);
    const modulos = lista(/unnest\(ARRAY\[([^\]]*)\]\) AS m/);
    const tipos = lista(/unnest\(ARRAY\[([^\]]*)\]\) AS t/);
    assert.deepEqual(modulos, IDS_MODULOS);
    assert.deepEqual(tipos, TIPOS_RECURSO);
    const recursos = modulos.flatMap((m) => tipos.map((t) => ({ chave: `recurso:${m}-${t}`, visivel: true, perfis: ['estagiario', 'consultor'] })));
    const linhas = [...linhasDe(SQL), ...linhasDe(SQL_014), ...recursos];
    assert.deepEqual(porChave(linhas), porChave(VALORES_INICIAIS.map((i) => ({ chave: i.chave, visivel: i.visivel, perfis: [...i.perfis] }))));
  });
  it('013 é idempotente e não destrutiva', () => {
    assert.match(SQL, /ON CONFLICT \(chave\) DO NOTHING/);
    assert.match(SQL, /CREATE TABLE IF NOT EXISTS visibilidade \(/);
    assert.match(SQL, /CREATE TABLE IF NOT EXISTS visibilidade_historico/);
    const semComentarios = SQL.replace(/--.*$/gm, '').replace(/ON DELETE SET NULL/g, '');
    assert.doesNotMatch(semComentarios, /\b(DROP|DELETE|TRUNCATE|UPDATE|ALTER)\b/i);
  });
  it('014 só troca a regra da chave e acrescenta linhas', () => {
    const semComentarios = SQL_014.replace(/--.*$/gm, '');
    assert.equal((semComentarios.match(/ON CONFLICT \(chave\) DO NOTHING/g) || []).length, 2);
    assert.doesNotMatch(semComentarios, /\b(DELETE|TRUNCATE|UPDATE|DROP TABLE)\b/i);
    assert.match(semComentarios, /ADD CONSTRAINT visibilidade_chave_check CHECK \(chave ~ '\^\(area\|tipo\|modulo\|recurso\):\[a-z0-9-\]\{2,40\}\$'\)/);
  });
});
