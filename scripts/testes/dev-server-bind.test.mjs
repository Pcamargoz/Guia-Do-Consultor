/* Bind do scripts/dev-server.mjs: 127.0.0.1 por padrão; HOST sobrescreve (v3.6). */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), '../dev-server.mjs');

describe('dev-server bind (v3.6)', () => {
  it('escuta em HOST com default 127.0.0.1 (não em todas as interfaces)', () => {
    const src = readFileSync(SRC, 'utf8');
    assert.match(src, /const HOST = \(process\.env\.HOST && String\(process\.env\.HOST\)\.trim\(\)\) \|\| '127\.0\.0\.1'/);
    assert.match(src, /\.listen\(PORTA, HOST,/);
    assert.doesNotMatch(src, /\.listen\(PORTA, \(\) =>/);
  });
});
