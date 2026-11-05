/* docker-compose.yml serviço app: HOST=0.0.0.0 + porta no loopback do host (v3.7).
   Parse simples por linhas/regex — sem dependência YAML. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPOSE = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../docker-compose.yml');

/** Extrai o bloco indentado do serviço `app:` (linhas com indent > 2 até o próximo serviço de nível 2). */
function blocoServicoApp(yaml) {
  const linhas = yaml.split(/\r?\n/);
  const ini = linhas.findIndex((l) => /^  app:\s*$/.test(l));
  assert.ok(ini >= 0, 'serviço app: não encontrado');
  const out = [];
  for (let i = ini + 1; i < linhas.length; i++) {
    const l = linhas[i];
    if (/^  [a-zA-Z0-9_-]+:\s*$/.test(l) || /^[a-zA-Z]/.test(l)) break;
    out.push(l);
  }
  return out.join('\n');
}

describe('docker-compose.yml — serviço app (v3.7)', () => {
  const yaml = readFileSync(COMPOSE, 'utf8');
  const app = blocoServicoApp(yaml);

  it('HOST do app é 0.0.0.0 (escuta no container para o publish do Docker)', () => {
    assert.match(app, /^\s*HOST:\s*"0\.0\.0\.0"\s*$/m);
  });

  it('porta publicada presa a 127.0.0.1:8081:3000 (não expõe a rede do host)', () => {
    assert.match(app, /ports:\s*\[\s*"127\.0\.0\.1:8081:3000"\s*\]/);
    assert.doesNotMatch(app, /ports:\s*\[\s*"8081:3000"\s*\]/);
  });

  it('ainda sobe o scripts/dev-server.mjs', () => {
    assert.match(app, /node scripts\/dev-server\.mjs/);
  });
});
