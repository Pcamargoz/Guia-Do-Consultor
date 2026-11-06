/* /api/checklists-admin — painel do administrador (somente administradores; só leitura)
   GET              progresso dos checklists de todos os usuários e os problemas registrados
   GET ?anexo=ID    imagem anexada a um problema, de qualquer usuário */
import { rota, json, exigirUsuario } from '../http.js';
import { painelAdmin, lerAnexoAdmin } from '../checklists-admin.js';

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'gerenciar_usuarios');
  const anexo = new URL(request.url).searchParams.get('anexo');
  if (anexo) {
    const img = await lerAnexoAdmin(anexo);
    return new Response(img.dados, {
      headers: {
        'Content-Type': img.tipo,
        'Content-Length': String(img.dados.length),
        'Cache-Control': 'private, no-store',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; sandbox",
        'Content-Disposition': 'inline',
      },
    });
  }
  return json(200, await painelAdmin());
});
