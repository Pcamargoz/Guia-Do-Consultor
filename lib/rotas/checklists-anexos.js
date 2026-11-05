/* /api/checklists-anexos — imagens anexadas às etapas dos checklists (só o dono enxerga)
   GET    ?id=N                    devolve a imagem
   POST   ?chave=KEY&item=ID       corpo = bytes da imagem (PNG/JPEG/WebP, até 1,5 MB); cabeçalho X-Nome com o nome do arquivo
   DELETE ?id=N                    remove a imagem */
import { rota, json, exigirUsuario, ErroHttp } from '../http.js';
import { MAX_IMAGEM, adicionarAnexo, lerAnexo, removerAnexo } from '../checklists-progresso.js';

const param = (request, nome) => new URL(request.url).searchParams.get(nome) || '';

export const GET = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const anexo = await lerAnexo(usuario, param(request, 'id'));
  return new Response(anexo.dados, {
    headers: {
      'Content-Type': anexo.tipo,
      'Content-Length': String(anexo.dados.length),
      // private, no-store: não reaproveitar a imagem entre sessões/perfis no mesmo navegador
      // (antes havia max-age de 24 h; v3.5 alinhou ao conteúdo controlado).
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox",
      'Content-Disposition': 'inline',
    },
  });
});

export const POST = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  const declarado = Number(request.headers.get('content-length'));
  if (declarado > MAX_IMAGEM) throw new ErroHttp(413, 'Imagem grande demais (máximo 1,5 MB).');
  const bytes = Buffer.from(await request.arrayBuffer());
  let nome = '';
  try { nome = decodeURIComponent(request.headers.get('x-nome') || ''); } catch { nome = ''; }
  return json(201, { anexo: await adicionarAnexo(usuario, param(request, 'chave'), param(request, 'item'), nome, bytes) });
});

export const DELETE = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'ver');
  return json(200, await removerAnexo(usuario, param(request, 'id')));
});
