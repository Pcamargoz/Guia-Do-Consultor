/* Downloads autenticados dos checklists HTML independentes. */
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { exigirUsuario, json, rota } from '../http.js';

/* Planos de QA na raiz de public/checklists; trilha do estagiário e teste do consultor nas subpastas.
   O padrão impede qualquer caminho fora dessas pastas (sem "..", barras extras ou outras extensões). */
const ARQUIVO_VALIDO = /^(?:(?:estagiarios|consultores)\/)?[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;

export const GET = rota(async (request) => {
  await exigirUsuario(request);

  const arquivo = new URL(request.url).searchParams.get('arquivo') || '';
  if (!ARQUIVO_VALIDO.test(arquivo)) return json(404, { erro: 'Checklist não encontrado.' });

  let conteudo;
  try {
    conteudo = await readFile(join(process.cwd(), 'public', 'checklists', arquivo));
  } catch {
    return json(404, { erro: 'Checklist não encontrado.' });
  }
  const nome = arquivo.split('/').pop();
  return new Response(conteudo, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="${nome}"; filename*=UTF-8''${encodeURIComponent(nome)}`,
      'Content-Length': String(conteudo.byteLength),
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
});
