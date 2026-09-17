/* Gera downloads/Apostila-do-Consultor-Faktory-Flow.pdf a partir de apostila.html?pdf=1.
   Executado dentro do docker compose (perfil "pdf"):
     docker compose -p faktory-manual --profile pdf run --rm gerar-pdf
   O Chromium do Gotenberg abre a apostila servida pelo nginx, espera o Paged.js
   terminar a paginação (window.ffPdfPronto) e devolve um PDF A4 vetorial. */
import { writeFile, mkdir } from 'node:fs/promises';

const MOTOR = process.env.PDF_ENGINE_URL || 'http://pdf-engine:3000';
const ORIGEM = process.env.APOSTILA_URL || 'http://apostila/apostila.html?pdf=1';
const DESTINO = process.env.PDF_DESTINO || '/work/downloads/Apostila-do-Consultor-Faktory-Flow.pdf';

async function esperarMotor(tentativas = 30) {
  for (let i = 0; i < tentativas; i++) {
    try { if ((await fetch(`${MOTOR}/health`)).ok) return; } catch { /* ainda subindo */ }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Motor de PDF não respondeu em ${MOTOR}.`);
}

async function main() {
  try {
    const cdn = await fetch('https://cdn.jsdelivr.net/npm/pagedjs@0.4.3/dist/paged.polyfill.js', { method: 'HEAD' });
    if (!cdn.ok) throw new Error(String(cdn.status));
  } catch (err) {
    console.warn(`Aviso: sem acesso ao CDN do Paged.js (${err.message}). O PDF sairá sem cabeçalho/rodapé e sem números no sumário.`);
  }

  await esperarMotor();
  const form = new FormData();
  const campos = {
    url: ORIGEM,
    paperWidth: '8.27', paperHeight: '11.69',
    marginTop: '0', marginBottom: '0', marginLeft: '0', marginRight: '0',
    preferCssPageSize: 'true',
    printBackground: 'true',
    emulatedMediaType: 'print',
    waitForExpression: 'window.ffPdfPronto === true',
    metadata: JSON.stringify({ Title: 'Apostila do Consultor — Faktory Flow', Author: 'Faktory Flow', Subject: 'Apostila do Consultor de Implantação' }),
  };
  for (const [k, v] of Object.entries(campos)) form.append(k, v);

  const inicio = Date.now();
  const res = await fetch(`${MOTOR}/forms/chromium/convert/url`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Falha ao gerar PDF (${res.status}): ${await res.text()}`);
  const pdf = Buffer.from(await res.arrayBuffer());
  if (pdf.subarray(0, 4).toString() !== '%PDF') throw new Error('A resposta não é um PDF válido.');

  const paginas = (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) || []).length;
  await mkdir(DESTINO.slice(0, DESTINO.lastIndexOf('/')), { recursive: true });
  await writeFile(DESTINO, pdf);
  console.log(`PDF gerado: ${DESTINO}`);
  console.log(`${paginas || '?'} páginas · ${(pdf.length / 1024).toFixed(0)} KB · ${((Date.now() - inicio) / 1000).toFixed(1)}s`);
}

main().catch((err) => { console.error(err.message); process.exit(1); });
