/* Grava os cenários reais da exploração nos planos de validação existentes (public/checklists/validacao-*.html),
   usando os campos que os próprios planos já suportam:
     - achado prévio da etapa (5º elemento do item: { data, txt }) — aparece em destaque, tem filtro "⚑ Com achado"
       e entra na tabela de achados da Conclusão;
     - linhas extras em `preparacao`, prefixadas com "Cenário real", com a massa de dados disponível hoje.
   Idempotente: rodar de novo substitui os achados/linhas gerados antes. Os dados ficam em
   scripts/dados-cenarios-checklists.mjs. A cópia de trabalho Checklists/ (se existir) recebe os mesmos arquivos.
   Uso: node scripts/atualizar-cenarios-checklists.mjs */
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { DATA, CENARIOS } from './dados-cenarios-checklists.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEM = path.join(RAIZ, 'public/checklists');
const COPIA = path.join(RAIZ, 'Checklists');
const PREFIXO_PREP = 'Cenário real';

function trechoDoRoteiro(html, codigo) {
  const inicio = html.indexOf(`c: "${codigo}", n: `);
  if (inicio < 0) throw new Error(`roteiro ${codigo} não encontrado`);
  const proximo = html.slice(inicio + 10).search(/\n\s*c: "\d{2}", n: /);
  const fimModulo = html.indexOf('\n});', inicio);
  const fim = proximo < 0 ? fimModulo : Math.min(inicio + 10 + proximo, fimModulo);
  return [inicio, fim];
}

function gravarAchado(html, { roteiro, item, txt, data = DATA }) {
  const [ini, fim] = trechoDoRoteiro(html, roteiro);
  const pos = html.indexOf(`["${item}","`, ini);
  if (pos < 0 || pos > fim) throw new Error(`item ${roteiro}/${item} não encontrado`);
  /* o item termina em ,0] / ,1] ou, se já tiver achado, em ,0|1,{ ... }] */
  const resto = html.slice(pos);
  const m = resto.match(/,([01])(,\{[^\n]*?\})?\]/);
  if (!m) throw new Error(`fim do item ${roteiro}/${item} não reconhecido`);
  const achado = `,{ data: ${JSON.stringify(data)}, txt: ${JSON.stringify(txt)} }`;
  const troca = `,${m[1]}${achado}]`;
  return html.slice(0, pos + m.index) + troca + html.slice(pos + m.index + m[0].length);
}

function gravarPreparacao(html, linhas) {
  const ini = html.indexOf('  preparacao: [');
  if (ini < 0) throw new Error('preparacao não encontrada');
  const fim = html.indexOf('\n  ],', ini);
  const atuais = html.slice(ini, fim).split('\n').slice(1)
    .filter((l) => !l.includes(`"${PREFIXO_PREP}`))
    .map((l) => l.replace(/,\s*$/, ''))
    .filter((l) => l.trim());
  const novas = linhas.map((l) => `    ${JSON.stringify(`${PREFIXO_PREP}: ${l}`)}`);
  return `${html.slice(0, ini)}  preparacao: [\n${[...atuais, ...novas].join(',\n')}${html.slice(fim)}`;
}

let total = 0;
for (const c of CENARIOS) {
  const arquivo = path.join(ORIGEM, c.arquivo);
  let html = await readFile(arquivo, 'utf8');
  for (const a of c.achados || []) { html = gravarAchado(html, a); total++; }
  if (c.preparacao?.length) html = gravarPreparacao(html, c.preparacao);
  await writeFile(arquivo, html, 'utf8');
  if (existsSync(COPIA)) await copyFile(arquivo, path.join(COPIA, c.arquivo));
  console.log(`${c.arquivo}: ${(c.achados || []).length} achado(s), ${(c.preparacao || []).length} linha(s) de cenário`);
}
console.log(`Total: ${total} achados gravados.`);
