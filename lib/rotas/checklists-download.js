/* Downloads autenticados dos checklists HTML independentes. */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { exigirUsuario, json, rota } from '../http.js';

const ARQUIVOS = new Set([
  'validacao-compras-faktory-flow.html',
  'validacao-crm-v2-faktory-flow.html',
  'validacao-estoque-faktory-flow.html',
  'validacao-expedicao-faktory-flow.html',
  'validacao-producao-v2-faktory-flow.html',
  'validacao-projetos-faktory-flow.html',
  'validacao-recebimento-faktory-flow.html',
  'validacao-servicos-v2-faktory-flow.html',
  'validacao-tarefas-faktory-flow.html',
]);

export const GET = rota(async (request) => {
  await exigirUsuario(request);

  const arquivo = new URL(request.url).searchParams.get('arquivo');
  if (!ARQUIVOS.has(arquivo)) return json(404, { erro: 'Checklist não encontrado.' });

  const conteudo = await readFile(join(process.cwd(), 'public', 'checklists', arquivo));
  return new Response(conteudo, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="${arquivo}"; filename*=UTF-8''${encodeURIComponent(arquivo)}`,
      'Content-Length': String(conteudo.byteLength),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
});
