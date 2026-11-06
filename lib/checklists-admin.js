/* Painel do administrador: progresso dos checklists de todos os usuários e os problemas que cada um registrou.
   Só leitura. A rota (lib/rotas/checklists-admin.js) exige a permissão `gerenciar_usuarios`, que só o perfil
   Administrador tem. O conteúdo das imagens não vai no resumo: o painel busca cada uma pelo id quando precisa. */
import { consulta } from './db.js';
import { ErroHttp } from './http.js';
import { PAPEIS } from './permissoes.js';

const MAX_TEXTO = 4000;
const corta = (v, max = MAX_TEXTO) => (typeof v === 'string' ? v.slice(0, max) : '');

export async function painelAdmin() {
  const [usuarios, progresso, anexos] = await Promise.all([
    consulta(`SELECT id, login, nome, papel, ativo, ultimo_login_em, criado_em FROM usuarios ORDER BY lower(nome), lower(login)`),
    // marcados: quantas etapas a pessoa marcou; obs e regs só vêm inteiros nos checklists com problema registrado
    consulta(`SELECT usuario_id, chave, pct, atualizado_em,
                     (SELECT count(*) FROM jsonb_object_keys(CASE WHEN jsonb_typeof(dados->'marcados') = 'object' THEN dados->'marcados' ELSE '{}'::jsonb END))::int AS marcados,
                     COALESCE(dados->>'validador', '') AS validador,
                     CASE WHEN jsonb_typeof(dados->'obs') = 'object' AND dados->'obs' <> '{}'::jsonb THEN dados->'obs' END AS obs,
                     CASE WHEN jsonb_typeof(dados->'obs') = 'object' AND dados->'obs' <> '{}'::jsonb THEN dados->'regs' END AS regs
                FROM checklist_progresso ORDER BY usuario_id, chave`),
    consulta('SELECT id, usuario_id, chave, item, nome, tamanho, criado_em FROM checklist_anexos ORDER BY id'),
  ]);

  const anexosDe = new Map();
  for (const a of anexos.rows) {
    const k = `${a.usuario_id}|${a.chave}|${a.item}`;
    if (!anexosDe.has(k)) anexosDe.set(k, []);
    anexosDe.get(k).push({ id: String(a.id), nome: a.nome, tamanho: a.tamanho });
  }
  const anexosPorChecklist = new Map();
  for (const a of anexos.rows) {
    const k = `${a.usuario_id}|${a.chave}`;
    anexosPorChecklist.set(k, (anexosPorChecklist.get(k) || 0) + 1);
  }

  const problemas = [];
  for (const p of progresso.rows) {
    if (!p.obs) continue;
    for (const [item, texto] of Object.entries(p.obs)) {
      const problema = corta(String(texto ?? '')).trim();
      if (!problema) continue;
      problemas.push({
        usuario: String(p.usuario_id),
        chave: p.chave,
        item,
        problema,
        registro: corta(String(p.regs?.[item] ?? ''), 500),
        atualizadoEm: p.atualizado_em,
        anexos: anexosDe.get(`${p.usuario_id}|${p.chave}|${item}`) || [],
      });
    }
  }

  return {
    geradoEm: new Date().toISOString(),
    usuarios: usuarios.rows.map((u) => ({
      id: String(u.id), login: u.login, nome: u.nome || u.login, papel: u.papel, papelNome: PAPEIS[u.papel]?.nome || u.papel,
      ativo: u.ativo, ultimoLoginEm: u.ultimo_login_em, criadoEm: u.criado_em,
    })),
    progresso: progresso.rows.map((p) => ({
      usuario: String(p.usuario_id), chave: p.chave, pct: p.pct, atualizadoEm: p.atualizado_em, marcados: p.marcados,
      validador: corta(p.validador, 120), anexos: anexosPorChecklist.get(`${p.usuario_id}|${p.chave}`) || 0,
    })),
    problemas,
  };
}

/** Imagem de qualquer usuário, para o administrador ver o anexo de um problema. */
export async function lerAnexoAdmin(id) {
  if (!/^\d{1,15}$/.test(String(id))) throw new ErroHttp(404, 'Imagem não encontrada.');
  const { rows } = await consulta('SELECT tipo, nome, dados FROM checklist_anexos WHERE id = $1', [id]);
  if (!rows[0]) throw new ErroHttp(404, 'Imagem não encontrada.');
  return rows[0];
}
