/* Cache-Control: private, no-store em conteúdo controlado e APIs (v3.5 / Lead M2). */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../lib/http.js';
import { next } from '@vercel/functions';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

describe('Cache-Control private, no-store (v3.5)', () => {
  it('json() das APIs envia private, no-store', () => {
    const r = json(200, { ok: true });
    assert.equal(r.headers.get('Cache-Control'), 'private, no-store');
  });

  it('next({ headers }) do @vercel/functions propaga Cache-Control', () => {
    const r = next({ headers: { 'Cache-Control': 'private, no-store' } });
    assert.equal(r.headers.get('Cache-Control'), 'private, no-store');
    assert.equal(r.headers.get('x-middleware-next'), '1');
  });

  it('middleware.js aplica private, no-store no next() de caminhos controlados', () => {
    const src = readFileSync(path.join(REPO, 'middleware.js'), 'utf8');
    assert.match(src, /Cache-Control['"]:\s*['"]private, no-store['"]/);
    assert.match(src, /return next\(\{\s*headers:\s*SEM_CACHE\s*\}\)/);
    assert.match(src, /caminhoControlado/);
  });
});
