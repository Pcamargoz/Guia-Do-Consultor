/* Validador da estrutura midia/brutos/ (Lead: pastas <id>/ sem número + mp4 + roteiro-telas.md + manifesto.md + prints/). */
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync, cpSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, it, after } from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  verificarMidiaBrutos,
  parseTempo,
  parseIntervalo,
  extrairTemposDoRoteiro,
  extrairArquivosCitados,
  mapearColunasTempo,
  NOME_MP4,
  citacaoDentroDoModulo,
} from '../verificar-midia-brutos.mjs';

const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const INDICE = JSON.parse(readFileSync(path.join(REPO, 'lib/conteudo/base/indice.json'), 'utf8'));
const IDS = INDICE.modulos.map((m) => m.id);

const temporarios = [];
function tmpRaiz() {
  const dir = mkdtempSync(path.join(tmpdir(), 'midia-brutos-'));
  temporarios.push(dir);
  // índice mínimo apontando para os mesmos ids do repo (cópia do real)
  mkdirSync(path.join(dir, 'lib/conteudo/base'), { recursive: true });
  writeFileSync(
    path.join(dir, 'lib/conteudo/base/indice.json'),
    JSON.stringify({ versao: 'teste', modulos: IDS.map((id, ordem) => ({ id, ordem, titulo: id })) }),
  );
  return dir;
}

function escreverModuloCompleto(raiz, id, { roteiro, manifesto, mp4 = [`${id}_bruto_v01.mp4`], prints = ['p01.png'] } = {}) {
  const pasta = path.join(raiz, 'midia/brutos', id);
  mkdirSync(path.join(pasta, 'prints'), { recursive: true });
  for (const m of mp4) writeFileSync(path.join(pasta, m), '');
  for (const p of prints) writeFileSync(path.join(pasta, 'prints', p), '');
  const roteiroPadrao = [
    '| Início–fim (s) | Tela (glossário) | O que acontece |',
    '|---|---|---|',
    '| 0–10 | Lista | Abre |',
    '| 10–20 | Detalhe | Salva |',
    '',
    `Vídeo \`${mp4[0]}\` e print \`${prints[0]}\`.`,
  ].join('\n');
  writeFileSync(path.join(pasta, 'roteiro-telas.md'), roteiro ?? roteiroPadrao);
  writeFileSync(path.join(pasta, 'manifesto.md'), manifesto ?? `# Manifesto\n\nArquivo \`${mp4[0]}\`.\n`);
  return pasta;
}

after(() => {
  for (const d of temporarios) {
    try { rmSync(d, { recursive: true, force: true }); } catch { /* ignore */ }
  }
});

describe('parseTempo / parseIntervalo', () => {
  it('aceita segundos, vírgula decimal, mm:ss e hh:mm:ss', () => {
    assert.equal(parseTempo('0'), 0);
    assert.equal(parseTempo('44'), 44);
    assert.equal(parseTempo('211,7'), 211.7);
    assert.equal(parseTempo('~55'), 55);
    assert.equal(parseTempo('1:30'), 90);
    assert.equal(parseTempo('01:02:03'), 3723);
    assert.equal(parseTempo('xyz'), null);
  });
  it('quebra intervalos com en-dash ou hífen', () => {
    assert.deepEqual(parseIntervalo('0–44'), { inicioRaw: '0', fimRaw: '44', inicio: 0, fim: 44 });
    assert.deepEqual(parseIntervalo('211,7–216,7').inicio, 211.7);
    assert.equal(parseIntervalo('1:00-1:30').fim, 90);
    assert.equal(parseIntervalo('~45–50').inicio, 45);
  });
});

describe('parser de tabela do roteiro', () => {
  it('detecta coluna combinada Início–fim', () => {
    const m = mapearColunasTempo(['Início–fim (s)', 'Tela', 'O que acontece']);
    assert.ok(m.combinada === 0);
  });
  it('detecta colunas separadas início / fim', () => {
    const m = mapearColunasTempo(['inicio', 'fim', 'tela']);
    assert.equal(m.inicio, 0);
    assert.equal(m.fim, 1);
  });
  it('extrai tempos crescentes do markdown', () => {
    const md = `| Início–fim (s) | Tela |\n|---|---|\n| 0–10 | A |\n| 10–20 | B |\n`;
    const t = extrairTemposDoRoteiro(md);
    assert.equal(t.length, 2);
    assert.equal(t[0].inicio, 0);
    assert.equal(t[1].fim, 20);
  });
  it('extrai arquivos em backticks, links e células', () => {
    const md = 'Vídeo `a_bruto_v01.mp4` e [p](prints/p01.png)\n| Arquivo |\n|---|\n| foto.png |\n';
    const a = extrairArquivosCitados(md);
    assert.ok(a.includes('a_bruto_v01.mp4'));
    assert.ok(a.includes('prints/p01.png'));
    assert.ok(a.includes('foto.png'));
  });
});

describe('verificarMidiaBrutos — regras', () => {
  it('regra 6: sem midia/brutos/ → ok com todas as pendências', () => {
    const raiz = tmpRaiz();
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, true);
    assert.equal(r.erros.length, 0);
    assert.equal(r.pendencias.length, IDS.length);
    assert.ok(r.pendencias.every((p) => p.includes('ainda não existe')));
  });

  it('regra 1: módulo do índice sem pasta = pendência, não erro', () => {
    const raiz = tmpRaiz();
    mkdirSync(path.join(raiz, 'midia/brutos'), { recursive: true });
    writeFileSync(path.join(raiz, 'midia/brutos/README.md'), '# brutos\n');
    escreverModuloCompleto(raiz, 'crm');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, true);
    assert.equal(r.erros.length, 0);
    assert.ok(r.pendencias.some((p) => p.includes('`vendas`')));
    assert.ok(!r.pendencias.some((p) => p.includes('`crm`')));
  });

  it('regra 2: pasta incompleta (sem roteiro / manifesto / prints) = erro; sem .mp4 = pendência', () => {
    const raiz = tmpRaiz();
    mkdirSync(path.join(raiz, 'midia/brutos/crm'), { recursive: true });
    writeFileSync(path.join(raiz, 'midia/brutos/crm/roteiro-telas.md'), '| Início–fim (s) |\n|---|\n| 0–1 |\n');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(!r.erros.some((e) => e.includes('incompleta') && e.includes('.mp4')), r.erros.join('\n'));
    assert.ok(r.pendencias.some((p) => p.includes('`crm`') && p.includes('sem .mp4')), r.pendencias.join('\n'));
    assert.ok(r.erros.some((e) => e.includes('manifesto.md')));
    assert.ok(r.erros.some((e) => e.includes('prints/')));
  });

  it('v3.4: pasta só com roteiro+manifesto+prints (sem mp4) = ok com pendência de mp4', () => {
    const raiz = tmpRaiz();
    const pasta = path.join(raiz, 'midia/brutos/crm');
    mkdirSync(path.join(pasta, 'prints'), { recursive: true });
    writeFileSync(path.join(pasta, 'roteiro-telas.md'), '| Início–fim (s) | Tela |\n|---|---|\n| 0–10 | A |\n\n`p01.png`\n');
    writeFileSync(path.join(pasta, 'manifesto.md'), '# m\n');
    writeFileSync(path.join(pasta, 'prints/p01.png'), '');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, true, r.erros.join('\n'));
    assert.ok(r.pendencias.some((p) => p.includes('sem .mp4')));
  });

  it('v3.4: mp4 com nome fora de <id>_bruto_vNN.mp4 = erro', () => {
    const raiz = tmpRaiz();
    escreverModuloCompleto(raiz, 'crm', { mp4: ['gravação.mp4'] });
    // reescreve roteiro sem citar o nome errado como arquivo existente ok — cita o errado
    writeFileSync(path.join(raiz, 'midia/brutos/crm/roteiro-telas.md'),
      '| Início–fim (s) | Tela |\n|---|---|\n| 0–10 | A |\n\n`gravação.mp4` e `p01.png`.\n');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(r.erros.some((e) => e.includes('grava') && e.includes('padrão')), r.erros.join('\n'));
    assert.ok(NOME_MP4.test('crm_bruto_v01.mp4'));
    assert.ok(!NOME_MP4.test('gravação.mp4'));
  });

  it('v3.4: citação com ../ ou absoluto fora da pasta = erro', () => {
    const raiz = tmpRaiz();
    escreverModuloCompleto(raiz, 'crm');
    writeFileSync(path.join(raiz, 'midia/brutos/crm/roteiro-telas.md'),
      '| Início–fim (s) | Tela |\n|---|---|\n| 0–10 | A |\n\n`../vendas/segredo.mp4` e `/tmp/x.png` e `crm_bruto_v01.mp4`.\n');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(r.erros.some((e) => e.includes('../vendas/segredo.mp4') && e.includes('fora')), r.erros.join('\n'));
    assert.ok(r.erros.some((e) => e.includes('/tmp/x.png') && e.includes('fora')), r.erros.join('\n'));
    assert.equal(citacaoDentroDoModulo(path.join(raiz, 'midia/brutos/crm'), 'prints/p01.png'), true);
    assert.equal(citacaoDentroDoModulo(path.join(raiz, 'midia/brutos/crm'), '../x.mp4'), false);
  });

  it('regra 3: pasta com nome fora do índice (ex. 01-crm) = erro', () => {
    const raiz = tmpRaiz();
    mkdirSync(path.join(raiz, 'midia/brutos/01-crm'), { recursive: true });
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(r.erros.some((e) => e.includes('01-crm') && e.includes('não é id')));
  });

  it('regra 3b: ROTEIRO.md em vez de roteiro-telas.md = erro', () => {
    const raiz = tmpRaiz();
    const pasta = path.join(raiz, 'midia/brutos/crm');
    mkdirSync(path.join(pasta, 'prints'), { recursive: true });
    writeFileSync(path.join(pasta, 'crm_bruto_v01.mp4'), '');
    writeFileSync(path.join(pasta, 'prints/p.png'), '');
    writeFileSync(path.join(pasta, 'manifesto.md'), '# m\n');
    writeFileSync(path.join(pasta, 'ROTEIRO.md'), '| Início | Fim |\n|---|---|\n| 0 | 1 |\n');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(r.erros.some((e) => e.includes('roteiro-telas.md')));
    assert.ok(r.erros.some((e) => e.includes('ROTEIRO.md')));
  });

  it('regra 4: arquivo citado no roteiro que não existe = erro', () => {
    const raiz = tmpRaiz();
    escreverModuloCompleto(raiz, 'crm', {
      roteiro: `| Início–fim (s) | Tela |\n|---|---|\n| 0–10 | A |\n\nVídeo \`ausente_bruto_v01.mp4\`.\n`,
    });
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(r.erros.some((e) => e.includes('ausente_bruto_v01.mp4') && e.includes('não existe')));
  });

  it('regra 5: início >= fim ou tempo inválido ou não crescente = erro', () => {
    const raiz = tmpRaiz();
    escreverModuloCompleto(raiz, 'crm', {
      roteiro: `| Início–fim (s) | Tela |\n|---|---|\n| 10–5 | A |\n| 0–3 | B |\n| foo–bar | C |\n`,
      mp4: ['crm_bruto_v01.mp4'],
    });
    // também precisa citar o mp4 existente ou não citar
    writeFileSync(
      path.join(raiz, 'midia/brutos/crm/roteiro-telas.md'),
      `| Início–fim (s) | Tela |\n|---|---|\n| 10–5 | A |\n| 20–30 | B |\n| 15–25 | C |\n| xyz–10 | D |\n\n\`crm_bruto_v01.mp4\` e \`p01.png\`.\n`,
    );
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, false);
    assert.ok(r.erros.some((e) => e.includes('início deve ser < fim')), r.erros.join('\n'));
    assert.ok(r.erros.some((e) => e.includes('não crescentes')), r.erros.join('\n'));
    assert.ok(r.erros.some((e) => e.includes('tempo inválido')), r.erros.join('\n'));
  });

  it('módulo completo válido = ok (sem erro naquele id)', () => {
    const raiz = tmpRaiz();
    mkdirSync(path.join(raiz, 'midia/brutos'), { recursive: true });
    writeFileSync(path.join(raiz, 'midia/brutos/README.md'), '# índice\n');
    escreverModuloCompleto(raiz, 'vendas');
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, true);
    assert.equal(r.erros.length, 0);
    assert.equal(r.modulos.vendas.status, 'ok');
    assert.ok(r.pendencias.length >= IDS.length - 1);
  });

  it('aceita colunas início/fim separadas e mm:ss', () => {
    const raiz = tmpRaiz();
    escreverModuloCompleto(raiz, 'financeiro', {
      mp4: ['financeiro_bruto_v01.mp4'],
      prints: ['shot.png'],
      roteiro: `| inicio | fim | tela |\n|---|---|---|\n| 0:00 | 0:10 | A |\n| 0:10 | 1:00 | B |\n\n\`financeiro_bruto_v01.mp4\`\n\`shot.png\`\n`,
    });
    const r = verificarMidiaBrutos(raiz);
    assert.equal(r.ok, true, r.erros.join('\n'));
    assert.equal(r.modulos.financeiro.trechos, 2);
  });
});

function materializarRoteiroReal(raiz, id, srcRoteiro) {
  const pasta = path.join(raiz, 'midia/brutos', id);
  mkdirSync(path.join(pasta, 'prints'), { recursive: true });
  cpSync(srcRoteiro, path.join(pasta, 'roteiro-telas.md'));
  writeFileSync(path.join(pasta, 'manifesto.md'), `# Manifesto ${id} (fictício)\n`);
  const md = readFileSync(srcRoteiro, 'utf8');
  const arquivos = extrairArquivosCitados(md);
  for (const a of arquivos) {
    if (a.includes('/')) {
      mkdirSync(path.join(pasta, path.dirname(a)), { recursive: true });
      writeFileSync(path.join(pasta, a), '');
    } else if (/\.(png|jpe?g)$/i.test(a)) {
      writeFileSync(path.join(pasta, 'prints', a), '');
    } else {
      writeFileSync(path.join(pasta, a), '');
    }
  }
  if (!arquivos.some((a) => /\.mp4$/i.test(a) && !a.includes('/'))) {
    writeFileSync(path.join(pasta, `${id}_bruto_v01.mp4`), '');
  }
  return { md, arquivos, tempos: extrairTemposDoRoteiro(md) };
}

describe('roteiros reais do estúdio (CRM e Vendas)', () => {
  it('parser + validador aceitam gi-crm e gi-vendas com arquivos fictícios', () => {
    const estudio = '/workspace/estudio-audiovisual/02-gravacoes-brutas';
    const raiz = tmpRaiz();
    mkdirSync(path.join(raiz, 'midia/brutos'), { recursive: true });
    writeFileSync(path.join(raiz, 'midia/brutos/README.md'), '# brutos\n');

    const crm = materializarRoteiroReal(raiz, 'crm', path.join(estudio, 'gi-crm_geral_roteiro-telas_v01.md'));
    const vendas = materializarRoteiroReal(raiz, 'vendas', path.join(estudio, 'gi-vendas_geral_roteiro-telas_v01.md'));

    assert.ok(crm.arquivos.some((a) => a.endsWith('.mp4')), 'CRM deve citar mp4');
    assert.ok(crm.arquivos.some((a) => a.endsWith('.png')), 'CRM deve citar png');
    assert.ok(crm.tempos.length >= 5, `CRM trechos: ${crm.tempos.length}`);
    assert.ok(vendas.tempos.length >= 5, `Vendas trechos: ${vendas.tempos.length}`);

    const r = verificarMidiaBrutos(raiz);
    const errosCrmVendas = r.erros.filter((e) => e.includes('/crm/') || e.includes('/vendas/'));
    assert.deepEqual(errosCrmVendas, [], errosCrmVendas.join('\n'));
    assert.equal(r.modulos.crm.status, 'ok');
    assert.equal(r.modulos.vendas.status, 'ok');
    assert.ok(r.modulos.crm.trechos >= 5);
    assert.ok(r.modulos.vendas.trechos >= 5);
  });
});
