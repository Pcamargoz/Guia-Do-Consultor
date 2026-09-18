/* Destinatários compartilhados das dúvidas da apostila. Leitura para todos; edição para consultores/admins. */
import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../http.js';
import { consulta } from '../db.js';

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'ver');
  const { rows } = await consulta('SELECT destinatarios FROM configuracoes_estudo WHERE id = true');
  return json(200, { destinatarios: rows[0]?.destinatarios || [] });
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const { destinatarios } = await lerJson(request);
  if (!Array.isArray(destinatarios) || destinatarios.length > 20) throw new ErroHttp(400, 'Informe até 20 endereços de e-mail.');
  const emails = [...new Set(destinatarios.map((x) => String(x).trim().toLowerCase()).filter(Boolean))];
  if (emails.some((x) => x.length > 254 || !/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(x))) {
    throw new ErroHttp(400, 'Confira os endereços de e-mail informados.');
  }
  const { rows } = await consulta(
    `INSERT INTO configuracoes_estudo (id, destinatarios, atualizado_por)
     VALUES (true, $1, $2)
     ON CONFLICT (id) DO UPDATE SET destinatarios = EXCLUDED.destinatarios,
       atualizado_por = EXCLUDED.atualizado_por, atualizado_em = now()
     RETURNING destinatarios`,
    [emails, usuario.id],
  );
  return json(200, { destinatarios: rows[0].destinatarios });
});
