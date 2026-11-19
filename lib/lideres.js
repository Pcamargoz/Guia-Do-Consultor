/* Processo de Líderes — acesso ao banco. Toda função recebe o usuário da sessão (lib/http.js exigirUsuario) e confere
   as regras de lib/lideres-regras.js ANTES de ler ou gravar. Quadro que o usuário não pode ver responde 404
   (não revela que existe); ação que o papel não permite responde 403. */
import { consulta, transacao } from './db.js';
import { ErroHttp } from './http.js';
import {
  COLUNAS, NOME_COLUNA, NOME_PRIORIDADE, atrasada, camposEditaveis, ehAdmin, extrairMencoes, hojeSP, montarDashboard,
  podeAtualizarTarefa, podeComentar, podeGerirQuadro, podeMover, podeOperarQuadro, podeVerQuadro, permissoesDaTarefa,
  permissoesDoQuadro, validarQuadro, validarTarefa, permissoesEfetivas, podeCriarTarefa, podeGerirEquipe, tetoValido,
  validarPermissoes, validarTeto, PERMISSOES, PERMISSOES_PADRAO, IDS_PERMISSOES,
} from './lideres-regras.js';
import { montarGerencial, validarAlertas, alertasValidos, periodoValido, LIMITES_ALERTAS, ALERTAS_PADRAO } from './lideres-gerencial.js';

const NAO_ENCONTRADO = 'Quadro não encontrado ou sem acesso para o seu perfil.';
const TAREFA_NAO_ENCONTRADA = 'Tarefa não encontrada ou sem acesso para o seu perfil.';
const corte = (s, n = 90) => (String(s).length > n ? `${String(s).slice(0, n - 1)}…` : String(s));
const iso = (v) => (v instanceof Date ? v.toISOString() : v || null);
const dataTexto = (v) => (v instanceof Date ? `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, '0')}-${String(v.getDate()).padStart(2, '0')}` : v ? String(v).slice(0, 10) : null);
// Nome curto de quem fez a ação (até duas palavras: "Pedro Santos"), para os textos das notificações.
const primeiroNome = (u) => String(u?.nome || u?.login || 'Alguém').split(/\s+/).slice(0, 2).join(' ');

/* ---------- utilidades de gravação ---------- */

async function notificar(db, { usuarioId, tipo, quadroId = null, tarefaId = null, texto, autorId = null, chave = null }) {
  if (!usuarioId || (autorId && String(usuarioId) === String(autorId))) return;
  await db.query(
    `INSERT INTO lideres_notificacoes (usuario_id, tipo, quadro_id, tarefa_id, texto, autor_id, chave)
     VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (chave) DO NOTHING`,
    [usuarioId, tipo, quadroId, tarefaId, corte(texto, 300), autorId, chave],
  );
}

const registrar = (db, { quadroId, tarefaId = null, autorId, acao, detalhes = {} }) => db.query(
  'INSERT INTO lideres_historico (quadro_id, tarefa_id, autor_id, acao, detalhes) VALUES ($1, $2, $3, $4, $5)',
  [quadroId, tarefaId, autorId, acao, JSON.stringify(detalhes)],
);

const tocar = (db, quadroId) => db.query('UPDATE lideres_quadros SET versao = versao + 1, atualizado_em = now() WHERE id = $1', [quadroId]);

/* ---------- carga com checagem de acesso ---------- */

/** Configuração do administrador (teto de permissões e limites dos alertas), com o padrão quando não há linha salva. */
async function lerConfig(db = { query: consulta }) {
  const { rows } = await db.query('SELECT chave, valor FROM lideres_config');
  const v = Object.fromEntries(rows.map((r) => [r.chave, r.valor]));
  return { teto: tetoValido(v.teto), alertas: alertasValidos(v.alertas) };
}

async function carregarQuadro(db, id) {
  if (!/^\d{1,18}$/.test(String(id ?? ''))) return null;
  const { rows } = await db.query('SELECT * FROM lideres_quadros WHERE id = $1', [id]);
  if (!rows[0]) return null;
  const [{ rows: ints }, cfg] = await Promise.all([
    db.query('SELECT usuario_id, permissoes FROM lideres_integrantes WHERE quadro_id = $1', [id]),
    lerConfig(db),
  ]);
  const salvas = new Map(ints.map((r) => [String(r.usuario_id), r.permissoes || {}]));
  // permissões efetivas de quem chama (só valem para estagiário; os demais papéis ignoram)
  const pm = (u) => permissoesEfetivas(salvas.get(String(u?.id)), cfg.teto);
  return { quadro: rows[0], integrantes: ints.map((r) => String(r.usuario_id)), salvas, teto: cfg.teto, pm };
}

/** Quadro visível para o usuário, ou 404. */
async function quadroVisivel(db, usuario, id) {
  const c = await carregarQuadro(db, id);
  if (!c || !podeVerQuadro(usuario, c.quadro, c.integrantes)) throw new ErroHttp(404, NAO_ENCONTRADO);
  return c;
}

/** Tarefa visível (o quadro dela é visível), ou 404. `paraAtualizar` trava a linha (FOR UPDATE). */
async function tarefaVisivel(db, usuario, id, paraAtualizar = false) {
  if (!/^\d{1,18}$/.test(String(id ?? ''))) throw new ErroHttp(400, 'Informe uma tarefa válida.');
  const { rows } = await db.query(`SELECT * FROM lideres_tarefas WHERE id = $1${paraAtualizar ? ' FOR UPDATE' : ''}`, [id]);
  if (!rows[0]) throw new ErroHttp(404, TAREFA_NAO_ENCONTRADA);
  const c = await carregarQuadro(db, rows[0].quadro_id);
  if (!c || !podeVerQuadro(usuario, c.quadro, c.integrantes)) throw new ErroHttp(404, TAREFA_NAO_ENCONTRADA);
  return { tarefa: rows[0], ...c };
}

const exigirAtivo = (quadro) => { if (quadro.status !== 'ativo') throw new ErroHttp(409, 'Este quadro está arquivado: só leitura.'); };

async function pessoas(db, ids) {
  if (!ids.length) return [];
  const { rows } = await db.query('SELECT id, login, nome, papel, ativo FROM usuarios WHERE id = ANY($1::bigint[])', [ids]);
  return rows.map((u) => ({ id: String(u.id), login: u.login, nome: u.nome || u.login, papel: u.papel, ativo: u.ativo }));
}

/* ---------- formato de saída ---------- */

const quadroPublico = (q, extra = {}) => ({
  id: String(q.id), nome: q.nome, descricao: q.descricao, cor: q.cor, icone: q.icone, status: q.status,
  liderId: String(q.lider_id), versao: Number(q.versao), criadoEm: iso(q.criado_em), atualizadoEm: iso(q.atualizado_em), ...extra,
});

const tarefaPublica = (t, hoje) => ({
  id: String(t.id), quadroId: String(t.quadro_id), titulo: t.titulo, descricao: t.descricao,
  responsavelId: t.responsavel_id == null ? null : String(t.responsavel_id), responsavelNome: t.responsavel_nome || null,
  prioridade: t.prioridade, status: t.status, ordem: t.ordem, prazo: dataTexto(t.prazo),
  bloqueada: t.bloqueada, motivoBloqueio: t.motivo_bloqueio, criadoEm: iso(t.criado_em), atualizadoEm: iso(t.atualizado_em),
  concluidoEm: iso(t.concluido_em), atrasada: atrasada({ ...t, prazo: dataTexto(t.prazo) }, hoje),
  checklist: { total: Number(t.ck_total || 0), feitos: Number(t.ck_feitos || 0) }, comentarios: Number(t.n_coment || 0),
});

const SQL_TAREFAS = `
  SELECT t.*, r.nome AS responsavel_nome,
         (SELECT count(*) FROM lideres_checklist c WHERE c.tarefa_id = t.id) AS ck_total,
         (SELECT count(*) FROM lideres_checklist c WHERE c.tarefa_id = t.id AND c.feito) AS ck_feitos,
         (SELECT count(*) FROM lideres_comentarios m WHERE m.tarefa_id = t.id) AS n_coment
    FROM lideres_tarefas t LEFT JOIN usuarios r ON r.id = t.responsavel_id`;

/* ============================================================
   Quadros
   ============================================================ */

/** Lista de quadros que o usuário vê, com números para os cartões. */
export async function listarQuadros(usuario) {
  const hoje = hojeSP();
  const soMeus = usuario.papel === 'estagiario';
  const { rows } = await consulta(
    `SELECT q.*, l.nome AS lider_nome,
            (SELECT count(*) FROM lideres_integrantes i WHERE i.quadro_id = q.id) AS n_estagiarios,
            (SELECT count(*) FROM lideres_tarefas t WHERE t.quadro_id = q.id) AS n_total,
            (SELECT count(*) FROM lideres_tarefas t WHERE t.quadro_id = q.id AND t.status = 'concluido') AS n_concluidas,
            (SELECT count(*) FROM lideres_tarefas t WHERE t.quadro_id = q.id AND t.status = 'em_revisao') AS n_revisao,
            (SELECT count(*) FROM lideres_tarefas t WHERE t.quadro_id = q.id AND t.status <> 'concluido' AND t.prazo < $2::date) AS n_atrasadas,
            (SELECT count(*) FROM lideres_tarefas t WHERE t.quadro_id = q.id AND t.status <> 'concluido' AND t.responsavel_id = $1) AS n_minhas
       FROM lideres_quadros q JOIN usuarios l ON l.id = q.lider_id
      WHERE ($3::boolean = false OR (q.status = 'ativo' AND EXISTS (SELECT 1 FROM lideres_integrantes i WHERE i.quadro_id = q.id AND i.usuario_id = $1)))
      ORDER BY q.status, lower(q.nome)`,
    [usuario.id, hoje, soMeus],
  );
  const quadros = rows.map((q) => quadroPublico(q, {
    liderNome: q.lider_nome, souLider: String(q.lider_id) === String(usuario.id),
    numeros: { estagiarios: Number(q.n_estagiarios), total: Number(q.n_total), concluidas: Number(q.n_concluidas), revisao: Number(q.n_revisao), atrasadas: Number(q.n_atrasadas), minhas: Number(q.n_minhas) },
  }));
  return { quadros, podeCriar: podeGerirQuadro(usuario), hoje };
}

/** Consultores e estagiários ativos, para o modal do admin. */
export async function usuariosParaQuadro(usuario) {
  if (!podeGerirQuadro(usuario)) throw new ErroHttp(403, 'Só o administrador monta os quadros.');
  const { rows } = await consulta(
    "SELECT id, login, nome, papel FROM usuarios WHERE ativo AND papel IN ('admin', 'consultor', 'estagiario') ORDER BY lower(nome), lower(login)",
  );
  const lista = rows.map((u) => ({ id: String(u.id), login: u.login, nome: u.nome || u.login, papel: u.papel }));
  // líder: consultor ou administrador (quem administra também pode conduzir um quadro)
  return { consultores: lista.filter((u) => u.papel === 'consultor' || u.papel === 'admin'), estagiarios: lista.filter((u) => u.papel === 'estagiario') };
}

/** Confere líder (consultor ou administrador ativo) e estagiários (estagiários ativos). */
async function conferirPessoas(db, liderId, estagiarios) {
  if (liderId) {
    const { rows } = await db.query("SELECT 1 FROM usuarios WHERE id = $1 AND ativo AND papel IN ('consultor', 'admin')", [liderId]);
    if (!rows[0]) throw new ErroHttp(400, 'O líder precisa ser um consultor ou administrador ativo.');
  }
  if (estagiarios?.length) {
    const { rows } = await db.query("SELECT count(*)::int AS n FROM usuarios WHERE id = ANY($1::bigint[]) AND ativo AND papel = 'estagiario'", [estagiarios]);
    if (rows[0].n !== estagiarios.length) throw new ErroHttp(400, 'Os integrantes precisam ser estagiários ativos.');
  }
}

export async function criarQuadro(usuario, corpo) {
  if (!podeGerirQuadro(usuario)) throw new ErroHttp(403, 'Só o administrador cria quadros.');
  const v = validarQuadro(corpo);
  if (!v.ok) throw new ErroHttp(400, v.erro);
  const d = v.dados;
  return transacao(async (db) => {
    await conferirPessoas(db, d.lider_id, d.estagiarios);
    const { rows } = await db.query(
      `INSERT INTO lideres_quadros (nome, descricao, lider_id, cor, icone, criado_por) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [d.nome, d.descricao || '', d.lider_id, d.cor || '#D5DD26', d.icone || 'alvo', usuario.id],
    );
    const q = rows[0];
    for (const e of d.estagiarios) {
      await db.query('INSERT INTO lideres_integrantes (quadro_id, usuario_id) VALUES ($1, $2)', [q.id, e]);
      await notificar(db, { usuarioId: e, tipo: 'entrada', quadroId: q.id, texto: `Você entrou no quadro "${q.nome}".`, autorId: usuario.id });
    }
    await notificar(db, { usuarioId: d.lider_id, tipo: 'entrada', quadroId: q.id, texto: `Você é o líder do novo quadro "${q.nome}".`, autorId: usuario.id });
    await registrar(db, { quadroId: q.id, autorId: usuario.id, acao: 'quadro_criado', detalhes: { nome: q.nome, estagiarios: d.estagiarios.length } });
    return quadroPublico(q);
  });
}

export async function editarQuadro(usuario, id, corpo) {
  if (!podeGerirQuadro(usuario)) throw new ErroHttp(403, 'Só o administrador edita quadros.');
  const v = validarQuadro(corpo, { parcial: true });
  if (!v.ok) throw new ErroHttp(400, v.erro);
  const d = v.dados;
  return transacao(async (db) => {
    const c = await carregarQuadro(db, id);
    if (!c) throw new ErroHttp(404, NAO_ENCONTRADO);
    const antes = c.quadro;
    await conferirPessoas(db, d.lider_id && String(d.lider_id) !== String(antes.lider_id) ? d.lider_id : null, d.estagiarios?.filter((e) => !c.integrantes.includes(e)));
    const campos = ['nome', 'descricao', 'lider_id', 'cor', 'icone', 'status'].filter((k) => Object.hasOwn(d, k));
    if (campos.length) {
      await db.query(
        `UPDATE lideres_quadros SET ${campos.map((k, i) => `${k} = $${i + 2}`).join(', ')}, versao = versao + 1, atualizado_em = now() WHERE id = $1`,
        [id, ...campos.map((k) => d[k])],
      );
    }
    const nome = d.nome || antes.nome;
    const mudou = campos.filter((k) => String(d[k]) !== String(antes[k]));
    if (mudou.length) await registrar(db, { quadroId: id, autorId: usuario.id, acao: d.status && d.status !== antes.status ? (d.status === 'arquivado' ? 'quadro_arquivado' : 'quadro_reativado') : 'quadro_editado', detalhes: { campos: mudou } });
    if (d.lider_id && String(d.lider_id) !== String(antes.lider_id)) {
      await notificar(db, { usuarioId: d.lider_id, tipo: 'entrada', quadroId: id, texto: `Você agora é o líder do quadro "${nome}".`, autorId: usuario.id });
      await notificar(db, { usuarioId: antes.lider_id, tipo: 'saida', quadroId: id, texto: `Você deixou de liderar o quadro "${nome}".`, autorId: usuario.id });
    }
    if (d.estagiarios) {
      const entram = d.estagiarios.filter((e) => !c.integrantes.includes(e));
      const saem = c.integrantes.filter((e) => !d.estagiarios.includes(e));
      for (const e of entram) {
        await db.query('INSERT INTO lideres_integrantes (quadro_id, usuario_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [id, e]);
        await notificar(db, { usuarioId: e, tipo: 'entrada', quadroId: id, texto: `Você entrou no quadro "${nome}".`, autorId: usuario.id });
      }
      for (const e of saem) {
        await db.query('DELETE FROM lideres_integrantes WHERE quadro_id = $1 AND usuario_id = $2', [id, e]);
        // tarefas abertas de quem saiu voltam para o líder distribuir de novo (as concluídas ficam no nome da pessoa)
        await db.query("UPDATE lideres_tarefas SET responsavel_id = NULL, atualizado_em = now() WHERE quadro_id = $1 AND responsavel_id = $2 AND status <> 'concluido'", [id, e]);
        await notificar(db, { usuarioId: e, tipo: 'saida', quadroId: id, texto: `Você saiu do quadro "${nome}".`, autorId: usuario.id });
      }
      if (entram.length || saem.length) {
        await registrar(db, { quadroId: id, autorId: usuario.id, acao: 'integrantes', detalhes: { entram, saem } });
        await tocar(db, id);
      }
    }
    const { rows } = await db.query('SELECT * FROM lideres_quadros WHERE id = $1', [id]);
    return quadroPublico(rows[0]);
  });
}

export async function excluirQuadro(usuario, id) {
  if (!podeGerirQuadro(usuario)) throw new ErroHttp(403, 'Só o administrador exclui quadros.');
  const c = await carregarQuadro({ query: consulta }, id);
  if (!c) throw new ErroHttp(404, NAO_ENCONTRADO);
  if (c.quadro.status !== 'arquivado') throw new ErroHttp(409, 'Arquive o quadro antes de excluí-lo.');
  await consulta('DELETE FROM lideres_quadros WHERE id = $1', [id]);
}

/** Quadro completo: integrantes, tarefas, permissões e dashboard. */
export async function obterQuadro(usuario, id) {
  const db = { query: consulta };
  const { quadro, integrantes, pm } = await quadroVisivel(db, usuario, id);
  const perms = pm(usuario);
  const hoje = hojeSP();
  const [gente, { rows }] = await Promise.all([
    pessoas(db, [String(quadro.lider_id), ...integrantes]),
    db.query(`${SQL_TAREFAS} WHERE t.quadro_id = $1 ORDER BY t.status, t.ordem, t.id`, [id]),
  ]);
  const lider = gente.find((p) => p.id === String(quadro.lider_id)) || null;
  const estagiarios = gente.filter((p) => integrantes.includes(p.id)).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  const tarefas = rows.map((t) => tarefaPublica(t, hoje));
  return {
    quadro: quadroPublico(quadro, { liderNome: lider?.nome || '' }),
    lider, estagiarios, tarefas, hoje,
    permissoes: permissoesDoQuadro(usuario, quadro, integrantes, perms),
    // indicadores do quadro: estagiário só com a permissão "Ver indicadores"
    dashboard: usuario.papel !== 'estagiario' || perms.indicadores ? montarDashboard(rows.map((t) => ({ ...t, prazo: dataTexto(t.prazo) })), estagiarios, hoje) : null,
    colunas: COLUNAS.map((c) => ({ id: c, nome: NOME_COLUNA[c] })),
  };
}

/* ============================================================
   Tarefas
   ============================================================ */

/** O responsável precisa ser estagiário do quadro (ou o próprio líder). */
function conferirResponsavel(quadro, integrantes, responsavelId) {
  if (responsavelId == null) return;
  if (!integrantes.includes(String(responsavelId)) && String(responsavelId) !== String(quadro.lider_id)) {
    throw new ErroHttp(400, 'O responsável precisa ser integrante do quadro.');
  }
}

export async function criarTarefa(usuario, quadroId, corpo) {
  const v = validarTarefa(corpo);
  if (!v.ok) throw new ErroHttp(400, v.erro);
  const d = v.dados;
  const status = COLUNAS.includes(corpo?.status) ? corpo.status : 'a_fazer';
  const itens = Array.isArray(corpo?.checklist) ? corpo.checklist.map((x) => String(x || '').trim()).filter(Boolean).slice(0, 30) : [];
  if (itens.some((x) => x.length > 200)) throw new ErroHttp(400, 'Cada item do checklist pode ter até 200 caracteres.');
  return transacao(async (db) => {
    const { quadro, integrantes, pm } = await quadroVisivel(db, usuario, quadroId);
    exigirAtivo(quadro);
    const perms = pm(usuario);
    if (!podeCriarTarefa(usuario, quadro, integrantes, perms)) throw new ErroHttp(403, 'Só o líder do quadro cria tarefas (ou quem ele autorizou).');
    if (!podeOperarQuadro(usuario, quadro)) {
      // estagiário autorizado: a tarefa nasce em A Fazer, para ele mesmo, salvo se puder atribuir; prioridade só com permissão
      if (status !== 'a_fazer') throw new ErroHttp(403, 'Tarefas criadas por estagiários começam em A Fazer.');
      if (d.responsavel_id == null || (String(d.responsavel_id) !== String(usuario.id) && !perms.atribuir)) {
        if (d.responsavel_id != null) throw new ErroHttp(403, 'Seu líder não liberou atribuir tarefas a outras pessoas.');
        d.responsavel_id = String(usuario.id);
      }
      if (d.prioridade && d.prioridade !== 'media' && !perms.prioridade) throw new ErroHttp(403, 'Seu líder não liberou definir prioridade.');
    }
    conferirResponsavel(quadro, integrantes, d.responsavel_id);
    const { rows: [{ prox }] } = await db.query('SELECT COALESCE(max(ordem), -1) + 1 AS prox FROM lideres_tarefas WHERE quadro_id = $1 AND status = $2', [quadroId, status]);
    const { rows } = await db.query(
      `INSERT INTO lideres_tarefas (quadro_id, titulo, descricao, responsavel_id, prioridade, status, ordem, prazo, bloqueada, motivo_bloqueio, criado_por, concluido_em)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CASE WHEN $6 = 'concluido' THEN now() END) RETURNING *`,
      [quadroId, d.titulo, d.descricao || '', d.responsavel_id ?? null, d.prioridade || 'media', status, prox, d.prazo ?? null, d.bloqueada || false, d.motivo_bloqueio || '', usuario.id],
    );
    const t = rows[0];
    for (const [i, texto] of itens.entries()) await db.query('INSERT INTO lideres_checklist (tarefa_id, texto, ordem) VALUES ($1, $2, $3)', [t.id, texto, i]);
    await registrar(db, { quadroId, tarefaId: t.id, autorId: usuario.id, acao: 'criada', detalhes: { titulo: t.titulo, status } });
    if (!podeOperarQuadro(usuario, quadro)) {
      await notificar(db, { usuarioId: quadro.lider_id, tipo: 'atribuicao', quadroId, tarefaId: t.id, texto: `${primeiroNome(usuario)} criou "${corte(t.titulo)}" no quadro.`, autorId: usuario.id });
    }
    if (t.responsavel_id) {
      await registrar(db, { quadroId, tarefaId: t.id, autorId: usuario.id, acao: 'atribuida', detalhes: { para: String(t.responsavel_id) } });
      await notificar(db, { usuarioId: t.responsavel_id, tipo: 'atribuicao', quadroId, tarefaId: t.id, texto: `${primeiroNome(usuario)} atribuiu a você "${corte(t.titulo)}".`, autorId: usuario.id });
    }
    await tocar(db, quadroId);
    return tarefaPublica({ ...t, ck_total: itens.length }, hojeSP());
  });
}

export async function obterTarefa(usuario, id) {
  const db = { query: consulta };
  const { tarefa, quadro, integrantes, pm } = await tarefaVisivel(db, usuario, id);
  const hoje = hojeSP();
  const [{ rows: [t] }, { rows: ck }, { rows: coms }, { rows: hist }, gente] = await Promise.all([
    db.query(`${SQL_TAREFAS} WHERE t.id = $1`, [id]),
    db.query('SELECT c.*, u.nome AS feito_por_nome FROM lideres_checklist c LEFT JOIN usuarios u ON u.id = c.feito_por WHERE c.tarefa_id = $1 ORDER BY c.ordem, c.id', [id]),
    db.query('SELECT m.*, u.nome AS autor_nome, u.login AS autor_login, u.papel AS autor_papel FROM lideres_comentarios m LEFT JOIN usuarios u ON u.id = m.autor_id WHERE m.tarefa_id = $1 ORDER BY m.criado_em, m.id', [id]),
    db.query('SELECT h.*, u.nome AS autor_nome FROM lideres_historico h LEFT JOIN usuarios u ON u.id = h.autor_id WHERE h.tarefa_id = $1 ORDER BY h.criado_em DESC, h.id DESC LIMIT 80', [id]),
    pessoas(db, [String(quadro.lider_id), ...integrantes]),
  ]);
  const nomeDe = (pid) => gente.find((p) => p.id === String(pid))?.nome || null;
  return {
    tarefa: tarefaPublica(t, hoje),
    checklist: ck.map((c) => ({ id: String(c.id), texto: c.texto, feito: c.feito, feitoPor: c.feito_por_nome || null, feitoEm: iso(c.feito_em) })),
    comentarios: coms.map((m) => ({ id: String(m.id), texto: m.texto, autorId: m.autor_id == null ? null : String(m.autor_id), autorNome: m.autor_nome || 'Usuário removido', autorPapel: m.autor_papel || null, criadoEm: iso(m.criado_em) })),
    historico: hist.map((h) => ({ id: String(h.id), acao: h.acao, detalhes: { ...h.detalhes, ...(h.detalhes?.para && h.acao === 'atribuida' ? { paraNome: nomeDe(h.detalhes.para) } : {}) }, autorNome: h.autor_nome || 'Sistema', criadoEm: iso(h.criado_em) })),
    permissoes: permissoesDaTarefa(usuario, quadro, tarefa, integrantes, pm(usuario)),
    mencionaveis: gente.filter((p) => p.ativo).map(({ id: pid, login, nome }) => ({ id: pid, login, nome })),
  };
}

export async function editarTarefa(usuario, id, corpo) {
  const v = validarTarefa(corpo, { parcial: true });
  if (!v.ok) throw new ErroHttp(400, v.erro);
  const d = v.dados;
  return transacao(async (db) => {
    const { tarefa, quadro, integrantes, pm } = await tarefaVisivel(db, usuario, id, true);
    exigirAtivo(quadro);
    const permitidos = camposEditaveis(usuario, quadro, tarefa, integrantes, pm(usuario));
    const pedidos = Object.keys(d);
    if (!pedidos.length) throw new ErroHttp(400, 'Nada para alterar.');
    const negado = pedidos.find((k) => !permitidos.includes(k));
    if (negado) throw new ErroHttp(403, permitidos.length ? 'Seu líder não liberou alterar esse campo nesta tarefa.' : 'Seu perfil não pode alterar esta tarefa.');
    if (Object.hasOwn(d, 'responsavel_id')) conferirResponsavel(quadro, integrantes, d.responsavel_id);
    const mudou = pedidos.filter((k) => String(d[k] ?? '') !== String((k === 'prazo' ? dataTexto(tarefa.prazo) : tarefa[k]) ?? ''));
    if (!mudou.length) return (await obterTarefa(usuario, id)).tarefa;
    await db.query(
      `UPDATE lideres_tarefas SET ${mudou.map((k, i) => `${k} = $${i + 2}`).join(', ')}, atualizado_em = now() WHERE id = $1`,
      [id, ...mudou.map((k) => d[k])],
    );
    const base = { quadroId: quadro.id, tarefaId: id, autorId: usuario.id };
    if (mudou.includes('responsavel_id')) {
      await registrar(db, { ...base, acao: 'atribuida', detalhes: { de: tarefa.responsavel_id == null ? null : String(tarefa.responsavel_id), para: d.responsavel_id } });
      if (d.responsavel_id) await notificar(db, { usuarioId: d.responsavel_id, tipo: 'atribuicao', quadroId: quadro.id, tarefaId: id, texto: `${primeiroNome(usuario)} atribuiu a você "${corte(d.titulo || tarefa.titulo)}".`, autorId: usuario.id });
    }
    if (mudou.includes('prioridade')) await registrar(db, { ...base, acao: 'prioridade', detalhes: { de: NOME_PRIORIDADE[tarefa.prioridade], para: NOME_PRIORIDADE[d.prioridade] } });
    if (mudou.includes('prazo')) await registrar(db, { ...base, acao: 'prazo', detalhes: { de: dataTexto(tarefa.prazo), para: d.prazo } });
    if (mudou.includes('bloqueada')) await registrar(db, { ...base, acao: d.bloqueada ? 'bloqueada' : 'desbloqueada', detalhes: d.bloqueada ? { motivo: d.motivo_bloqueio } : {} });
    else if (mudou.includes('motivo_bloqueio') && tarefa.bloqueada) await registrar(db, { ...base, acao: 'bloqueada', detalhes: { motivo: d.motivo_bloqueio } });
    const outros = mudou.filter((k) => ['titulo', 'descricao'].includes(k));
    if (outros.length) await registrar(db, { ...base, acao: 'editada', detalhes: { campos: outros } });
    await tocar(db, quadro.id);
    const { rows: [t] } = await db.query(`${SQL_TAREFAS} WHERE t.id = $1`, [id]);
    return tarefaPublica(t, hojeSP());
  });
}

/** Move para outra coluna (ou reordena) na posição pedida. Notifica revisão, aprovação e ajuste. */
export async function moverTarefa(usuario, id, corpo) {
  const para = corpo?.status;
  const posicao = Number.isInteger(corpo?.posicao) && corpo.posicao >= 0 ? corpo.posicao : null;
  const nota = typeof corpo?.comentario === 'string' ? corpo.comentario.trim() : '';
  if (nota.length > 2000) throw new ErroHttp(400, 'O comentário pode ter até 2.000 caracteres.');
  return transacao(async (db) => {
    const { tarefa, quadro, integrantes, pm } = await tarefaVisivel(db, usuario, id, true);
    exigirAtivo(quadro);
    const r = podeMover(usuario, quadro, tarefa, para, integrantes, pm(usuario));
    if (!r.ok) throw new ErroHttp(r.motivo === 'Coluna inválida.' ? 400 : 403, r.motivo);
    const de = tarefa.status;
    // reordena a coluna de destino: a tarefa entra na posição pedida (fim, sem posição)
    const { rows } = await db.query('SELECT id FROM lideres_tarefas WHERE quadro_id = $1 AND status = $2 AND id <> $3 ORDER BY ordem, id FOR UPDATE', [quadro.id, para, id]);
    const ids = rows.map((x) => String(x.id));
    ids.splice(posicao == null ? ids.length : Math.min(posicao, ids.length), 0, String(id));
    await db.query(
      `UPDATE lideres_tarefas t SET ordem = n.ord::int FROM unnest($1::bigint[]) WITH ORDINALITY AS n(id, ord) WHERE t.id = n.id`,
      [ids],
    );
    if (de !== para) {
      await db.query(
        `UPDATE lideres_tarefas SET status = $2, atualizado_em = now(), concluido_em = CASE WHEN $2 = 'concluido' THEN now() ELSE NULL END WHERE id = $1`,
        [id, para],
      );
      const aprovou = de === 'em_revisao' && para === 'concluido';
      const devolveu = de === 'em_revisao' && (para === 'em_andamento' || para === 'a_fazer');
      await registrar(db, { quadroId: quadro.id, tarefaId: id, autorId: usuario.id, acao: aprovou ? 'aprovada' : devolveu ? 'ajuste' : 'movida', detalhes: { de, para, ...(nota ? { nota: corte(nota, 200) } : {}) } });
      const titulo = corte(tarefa.titulo);
      if (para === 'em_revisao') {
        await notificar(db, { usuarioId: quadro.lider_id, tipo: 'revisao', quadroId: quadro.id, tarefaId: id, texto: `${primeiroNome(usuario)} enviou "${titulo}" para revisão.`, autorId: usuario.id });
      } else if (aprovou && tarefa.responsavel_id) {
        await notificar(db, { usuarioId: tarefa.responsavel_id, tipo: 'aprovada', quadroId: quadro.id, tarefaId: id, texto: `${primeiroNome(usuario)} aprovou "${titulo}".`, autorId: usuario.id });
      } else if (devolveu && tarefa.responsavel_id) {
        await notificar(db, { usuarioId: tarefa.responsavel_id, tipo: 'ajuste', quadroId: quadro.id, tarefaId: id, texto: `${primeiroNome(usuario)} pediu ajuste em "${titulo}"${nota ? `: ${corte(nota, 120)}` : '.'}`, autorId: usuario.id });
      }
      if (nota) await db.query('INSERT INTO lideres_comentarios (tarefa_id, autor_id, texto) VALUES ($1, $2, $3)', [id, usuario.id, nota]);
    }
    await tocar(db, quadro.id);
    const { rows: [t] } = await db.query(`${SQL_TAREFAS} WHERE t.id = $1`, [id]);
    return tarefaPublica(t, hojeSP());
  });
}

export async function excluirTarefa(usuario, id) {
  return transacao(async (db) => {
    const { tarefa, quadro } = await tarefaVisivel(db, usuario, id, true);
    exigirAtivo(quadro);
    if (!podeOperarQuadro(usuario, quadro)) throw new ErroHttp(403, 'Só o líder do quadro exclui tarefas.');
    await db.query('DELETE FROM lideres_tarefas WHERE id = $1', [id]);
    await registrar(db, { quadroId: quadro.id, tarefaId: id, autorId: usuario.id, acao: 'excluida', detalhes: { titulo: tarefa.titulo } });
    await tocar(db, quadro.id);
  });
}

/* ---------- comentários com menção ---------- */

export async function comentar(usuario, tarefaId, corpo) {
  const texto = typeof corpo?.texto === 'string' ? corpo.texto.trim() : '';
  if (!texto) throw new ErroHttp(400, 'Escreva o comentário.');
  if (texto.length > 2000) throw new ErroHttp(400, 'O comentário pode ter até 2.000 caracteres.');
  return transacao(async (db) => {
    const { tarefa, quadro, integrantes, pm } = await tarefaVisivel(db, usuario, tarefaId);
    exigirAtivo(quadro);
    if (!podeComentar(usuario, quadro, integrantes, pm(usuario))) throw new ErroHttp(403, 'Seu líder não liberou comentários para você neste quadro.');
    const { rows: [m] } = await db.query('INSERT INTO lideres_comentarios (tarefa_id, autor_id, texto) VALUES ($1, $2, $3) RETURNING *', [tarefaId, usuario.id, texto]);
    const logins = extrairMencoes(texto);
    if (logins.length) {
      const { rows: citados } = await db.query('SELECT id, login, nome, papel FROM usuarios WHERE ativo AND lower(login) = ANY($1::text[])', [logins]);
      for (const u of citados) {
        // só avisa quem enxerga o quadro (estagiário de fora não recebe nem descobre o quadro)
        if (!podeVerQuadro({ id: String(u.id), papel: u.papel }, quadro, integrantes)) continue;
        await notificar(db, { usuarioId: u.id, tipo: 'mencao', quadroId: quadro.id, tarefaId, texto: `${primeiroNome(usuario)} mencionou você em "${corte(tarefa.titulo)}": ${corte(texto, 120)}`, autorId: usuario.id });
      }
    }
    await tocar(db, quadro.id);
    return { id: String(m.id), texto: m.texto, autorId: String(usuario.id), autorNome: usuario.nome || usuario.login, autorPapel: usuario.papel, criadoEm: iso(m.criado_em) };
  });
}

/* ---------- checklist ---------- */

export async function adicionarItem(usuario, tarefaId, corpo) {
  const texto = typeof corpo?.texto === 'string' ? corpo.texto.trim() : '';
  if (!texto || texto.length > 200) throw new ErroHttp(400, 'O item precisa ter de 1 a 200 caracteres.');
  return transacao(async (db) => {
    const { quadro } = await tarefaVisivel(db, usuario, tarefaId);
    exigirAtivo(quadro);
    if (!podeOperarQuadro(usuario, quadro)) throw new ErroHttp(403, 'Só o líder do quadro monta o checklist.');
    const { rows: [{ n }] } = await db.query('SELECT count(*)::int AS n FROM lideres_checklist WHERE tarefa_id = $1', [tarefaId]);
    if (n >= 50) throw new ErroHttp(400, 'O checklist pode ter até 50 itens.');
    const { rows: [c] } = await db.query('INSERT INTO lideres_checklist (tarefa_id, texto, ordem) VALUES ($1, $2, $3) RETURNING *', [tarefaId, texto, n]);
    await tocar(db, quadro.id);
    return { id: String(c.id), texto: c.texto, feito: false, feitoPor: null, feitoEm: null };
  });
}

async function itemVisivel(db, usuario, itemId) {
  if (!/^\d{1,18}$/.test(String(itemId ?? ''))) throw new ErroHttp(400, 'Informe um item válido.');
  const { rows } = await db.query('SELECT * FROM lideres_checklist WHERE id = $1', [itemId]);
  if (!rows[0]) throw new ErroHttp(404, 'Item não encontrado.');
  return { item: rows[0], ...(await tarefaVisivel(db, usuario, rows[0].tarefa_id)) };
}

export async function alterarItem(usuario, itemId, corpo) {
  return transacao(async (db) => {
    const { item, tarefa, quadro, integrantes } = await itemVisivel(db, usuario, itemId);
    exigirAtivo(quadro);
    if (Object.hasOwn(corpo || {}, 'texto')) {
      if (!podeOperarQuadro(usuario, quadro)) throw new ErroHttp(403, 'Só o líder do quadro edita os itens do checklist.');
      const texto = String(corpo.texto || '').trim();
      if (!texto || texto.length > 200) throw new ErroHttp(400, 'O item precisa ter de 1 a 200 caracteres.');
      await db.query('UPDATE lideres_checklist SET texto = $2 WHERE id = $1', [itemId, texto]);
    }
    if (Object.hasOwn(corpo || {}, 'feito')) {
      if (typeof corpo.feito !== 'boolean') throw new ErroHttp(400, 'Informe se o item está feito.');
      if (!podeAtualizarTarefa(usuario, quadro, tarefa, integrantes)) throw new ErroHttp(403, 'Só o responsável pela tarefa ou o líder marcam o checklist.');
      if (corpo.feito !== item.feito) {
        await db.query('UPDATE lideres_checklist SET feito = $2, feito_por = CASE WHEN $2 THEN $3::bigint END, feito_em = CASE WHEN $2 THEN now() END WHERE id = $1', [itemId, corpo.feito, usuario.id]);
        await registrar(db, { quadroId: quadro.id, tarefaId: tarefa.id, autorId: usuario.id, acao: 'checklist', detalhes: { item: corte(item.texto, 80), feito: corpo.feito } });
      }
    }
    await tocar(db, quadro.id);
    const { rows: [c] } = await db.query('SELECT c.*, u.nome AS feito_por_nome FROM lideres_checklist c LEFT JOIN usuarios u ON u.id = c.feito_por WHERE c.id = $1', [itemId]);
    return { id: String(c.id), texto: c.texto, feito: c.feito, feitoPor: c.feito_por_nome || null, feitoEm: iso(c.feito_em) };
  });
}

export async function excluirItem(usuario, itemId) {
  return transacao(async (db) => {
    const { quadro } = await itemVisivel(db, usuario, itemId);
    exigirAtivo(quadro);
    if (!podeOperarQuadro(usuario, quadro)) throw new ErroHttp(403, 'Só o líder do quadro remove itens do checklist.');
    await db.query('DELETE FROM lideres_checklist WHERE id = $1', [itemId]);
    await tocar(db, quadro.id);
  });
}

/* ============================================================
   Notificações e polling
   ============================================================ */

/** Gera (uma vez por tarefa e prazo) os avisos de prazo próximo (hoje/amanhã) e de atraso do usuário. */
async function gerarAvisosDePrazo(usuario) {
  const hoje = hojeSP();
  await consulta(
    `INSERT INTO lideres_notificacoes (usuario_id, tipo, quadro_id, tarefa_id, texto, chave)
     SELECT $1::bigint, 'prazo_proximo', t.quadro_id, t.id,
            'O prazo de "' || left(t.titulo, 90) || '" vence ' || CASE WHEN t.prazo = $2::date THEN 'hoje' ELSE 'amanhã' END || '.',
            'prazo:' || t.id || ':' || t.prazo || ':' || $1::bigint
       FROM lideres_tarefas t JOIN lideres_quadros q ON q.id = t.quadro_id AND q.status = 'ativo'
      WHERE t.responsavel_id = $1::bigint AND t.status <> 'concluido' AND t.prazo BETWEEN $2::date AND $2::date + 1
     ON CONFLICT (chave) DO NOTHING`,
    [usuario.id, hoje],
  );
  await consulta(
    `INSERT INTO lideres_notificacoes (usuario_id, tipo, quadro_id, tarefa_id, texto, chave)
     SELECT $1::bigint, 'atraso', t.quadro_id, t.id,
            CASE WHEN t.responsavel_id = $1::bigint THEN 'Sua tarefa "' || left(t.titulo, 90) || '" está atrasada.'
                 ELSE '"' || left(t.titulo, 90) || '" está atrasada no quadro ' || left(q.nome, 60) || '.' END,
            'atraso:' || t.id || ':' || t.prazo || ':' || $1::bigint
       FROM lideres_tarefas t JOIN lideres_quadros q ON q.id = t.quadro_id AND q.status = 'ativo'
      WHERE (t.responsavel_id = $1::bigint OR q.lider_id = $1::bigint) AND t.status <> 'concluido' AND t.prazo < $2::date
     ON CONFLICT (chave) DO NOTHING`,
    [usuario.id, hoje],
  );
}

const contarNaoLidas = async (usuario) => Number((await consulta('SELECT count(*) AS n FROM lideres_notificacoes WHERE usuario_id = $1 AND lida_em IS NULL', [usuario.id])).rows[0].n);

export async function listarNotificacoes(usuario) {
  await gerarAvisosDePrazo(usuario);
  const { rows } = await consulta(
    `SELECT n.*, q.nome AS quadro_nome, q.cor AS quadro_cor, a.nome AS autor_nome
       FROM lideres_notificacoes n LEFT JOIN lideres_quadros q ON q.id = n.quadro_id LEFT JOIN usuarios a ON a.id = n.autor_id
      WHERE n.usuario_id = $1 ORDER BY n.criado_em DESC, n.id DESC LIMIT 40`,
    [usuario.id],
  );
  return {
    naoLidas: await contarNaoLidas(usuario),
    itens: rows.map((n) => ({
      id: String(n.id), tipo: n.tipo, texto: n.texto, lida: Boolean(n.lida_em), criadoEm: iso(n.criado_em),
      quadroId: n.quadro_id == null ? null : String(n.quadro_id), quadroNome: n.quadro_nome || null, quadroCor: n.quadro_cor || null,
      tarefaId: n.tarefa_id == null ? null : String(n.tarefa_id), autorNome: n.autor_nome || null,
    })),
  };
}

export async function marcarLidas(usuario, corpo) {
  const ids = Array.isArray(corpo?.ids) ? corpo.ids.filter((x) => /^\d{1,18}$/.test(String(x))).slice(0, 200) : null;
  if (corpo?.todas === true) await consulta('UPDATE lideres_notificacoes SET lida_em = now() WHERE usuario_id = $1 AND lida_em IS NULL', [usuario.id]);
  else if (ids?.length) await consulta('UPDATE lideres_notificacoes SET lida_em = now() WHERE usuario_id = $1 AND id = ANY($2::bigint[]) AND lida_em IS NULL', [usuario.id, ids]);
  else throw new ErroHttp(400, 'Informe as notificações (ids) ou todas: true.');
  return { naoLidas: await contarNaoLidas(usuario) };
}

/** Polling leve: não lidas e, se pedido, a versão do quadro aberto (a tela só recarrega o quadro quando ela muda). */
export async function pulso(usuario, quadroId) {
  await gerarAvisosDePrazo(usuario);
  const saida = { naoLidas: await contarNaoLidas(usuario), orientacoes: await contarOrientacoesPendentes(usuario) };
  if (quadroId) {
    const { quadro } = await quadroVisivel({ query: consulta }, usuario, quadroId);
    saida.versao = Number(quadro.versao);
    saida.status = quadro.status;
  }
  return saida;
}


/* ============================================================
   Gerenciar Equipe — permissões dos estagiários no quadro
   ============================================================ */

const NOME_PERM = Object.fromEntries(PERMISSOES.map((p) => [p.id, p.nome]));

/** Equipe do quadro com as permissões salvas e efetivas de cada estagiário, o teto e o histórico de alterações. */
export async function obterEquipe(usuario, quadroId) {
  const db = { query: consulta };
  const { quadro, integrantes, salvas, teto } = await quadroVisivel(db, usuario, quadroId);
  if (!podeGerirEquipe(usuario, quadro)) throw new ErroHttp(403, 'Só o líder do quadro (ou o administrador) gerencia a equipe.');
  const hoje = hojeSP();
  const [gente, { rows: carga }, { rows: hist }] = await Promise.all([
    pessoas(db, integrantes),
    db.query(`SELECT responsavel_id,
                     count(*) FILTER (WHERE status <> 'concluido') AS abertas,
                     count(*) FILTER (WHERE status = 'concluido') AS concluidas,
                     count(*) FILTER (WHERE status <> 'concluido' AND prazo < $2::date) AS atrasadas
                FROM lideres_tarefas WHERE quadro_id = $1 AND responsavel_id IS NOT NULL GROUP BY responsavel_id`, [quadroId, hoje]),
    db.query(`SELECT h.*, u.nome AS autor_nome FROM lideres_historico h LEFT JOIN usuarios u ON u.id = h.autor_id
               WHERE h.quadro_id = $1 AND h.acao = 'permissoes' ORDER BY h.criado_em DESC, h.id DESC LIMIT 30`, [quadroId]),
  ]);
  const numeros = new Map(carga.map((r) => [String(r.responsavel_id), { abertas: Number(r.abertas), concluidas: Number(r.concluidas), atrasadas: Number(r.atrasadas) }]));
  return {
    quadro: { id: String(quadro.id), nome: quadro.nome, cor: quadro.cor },
    catalogo: PERMISSOES, padrao: PERMISSOES_PADRAO, teto,
    membros: gente.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')).map((p) => {
      const s = salvas.get(p.id) || {};
      return { id: p.id, nome: p.nome, login: p.login, ativo: p.ativo, salvas: s, efetivas: permissoesEfetivas(s, teto),
        personalizado: IDS_PERMISSOES.some((k) => typeof s[k] === 'boolean' && s[k] !== PERMISSOES_PADRAO[k]),
        numeros: numeros.get(p.id) || { abertas: 0, concluidas: 0, atrasadas: 0 } };
    }),
    historico: hist.map((h) => ({ id: String(h.id), autorNome: h.autor_nome || 'Sistema', criadoEm: iso(h.criado_em), ...h.detalhes })),
  };
}

/** Altera permissões de um estagiário (líder do quadro ou admin), dentro do teto. Audita e avisa o estagiário. */
export async function alterarPermissoes(usuario, quadroId, corpo) {
  const alvo = String(corpo?.usuario_id ?? '');
  if (!/^\d{1,18}$/.test(alvo)) throw new ErroHttp(400, 'Informe o estagiário.');
  return transacao(async (db) => {
    const { quadro, integrantes, salvas, teto } = await quadroVisivel(db, usuario, quadroId);
    if (!podeGerirEquipe(usuario, quadro)) throw new ErroHttp(403, 'Só o líder do quadro (ou o administrador) gerencia a equipe.');
    if (!integrantes.includes(alvo)) throw new ErroHttp(404, 'Esse estagiário não faz parte do quadro.');
    if (corpo?.restaurar === true) {
      await db.query("UPDATE lideres_integrantes SET permissoes = '{}'::jsonb WHERE quadro_id = $1 AND usuario_id = $2", [quadroId, alvo]);
    } else {
      const v = validarPermissoes(corpo?.permissoes, teto);
      if (!v.ok) throw new ErroHttp(v.status, v.erro);
      const novas = { ...(salvas.get(alvo) || {}), ...v.dados };
      await db.query('UPDATE lideres_integrantes SET permissoes = $3 WHERE quadro_id = $1 AND usuario_id = $2', [quadroId, alvo, JSON.stringify(novas)]);
    }
    const { rows: [r] } = await db.query('SELECT permissoes FROM lideres_integrantes WHERE quadro_id = $1 AND usuario_id = $2', [quadroId, alvo]);
    const antes = permissoesEfetivas(salvas.get(alvo), teto);
    const depois = permissoesEfetivas(r.permissoes, teto);
    const ganhou = IDS_PERMISSOES.filter((k) => depois[k] && !antes[k]);
    const perdeu = IDS_PERMISSOES.filter((k) => !depois[k] && antes[k]);
    const [p] = await pessoas(db, [alvo]);
    if (ganhou.length || perdeu.length) {
      await registrar(db, { quadroId, autorId: usuario.id, acao: 'permissoes', detalhes: { usuarioId: alvo, usuarioNome: p?.nome || '', ganhou, perdeu, restaurou: corpo?.restaurar === true } });
      const partes = [ganhou.length ? `liberou ${ganhou.map((k) => NOME_PERM[k].toLowerCase()).join(', ')}` : '', perdeu.length ? `retirou ${perdeu.map((k) => NOME_PERM[k].toLowerCase()).join(', ')}` : ''].filter(Boolean);
      await notificar(db, { usuarioId: alvo, tipo: 'permissoes', quadroId, texto: `${primeiroNome(usuario)} ${partes.join(' e ')} no quadro "${corte(quadro.nome, 60)}".`, autorId: usuario.id });
      await tocar(db, quadroId);
    }
    return { usuarioId: alvo, salvas: r.permissoes, efetivas: depois, ganhou, perdeu };
  });
}

/* ============================================================
   Configuração do administrador (teto de permissões e limites dos alertas)
   ============================================================ */

export async function obterConfig(usuario) {
  if (!ehAdmin(usuario)) throw new ErroHttp(403, 'Só o administrador ajusta o Processo de Líderes.');
  const cfg = await lerConfig();
  return { ...cfg, catalogo: PERMISSOES, limites: LIMITES_ALERTAS, padroes: { alertas: ALERTAS_PADRAO } };
}

export async function salvarConfig(usuario, corpo) {
  if (!ehAdmin(usuario)) throw new ErroHttp(403, 'Só o administrador ajusta o Processo de Líderes.');
  const atual = await lerConfig();
  const mudancas = [];
  if (corpo?.teto !== undefined) {
    const v = validarTeto(corpo.teto);
    if (!v.ok) throw new ErroHttp(400, v.erro);
    mudancas.push(['teto', v.dados, { ganhou: IDS_PERMISSOES.filter((k) => v.dados[k] && !atual.teto[k]), perdeu: IDS_PERMISSOES.filter((k) => !v.dados[k] && atual.teto[k]) }]);
  }
  if (corpo?.alertas !== undefined) {
    const v = validarAlertas(corpo.alertas);
    if (!v.ok) throw new ErroHttp(400, v.erro);
    mudancas.push(['alertas', v.dados, { de: atual.alertas, para: v.dados }]);
  }
  if (!mudancas.length) throw new ErroHttp(400, 'Nada para salvar.');
  await transacao(async (db) => {
    for (const [chave, valor, det] of mudancas) {
      await db.query(`INSERT INTO lideres_config (chave, valor, atualizado_por, atualizado_em) VALUES ($1, $2, $3, now())
                      ON CONFLICT (chave) DO UPDATE SET valor = EXCLUDED.valor, atualizado_por = EXCLUDED.atualizado_por, atualizado_em = now()`, [chave, JSON.stringify(valor), usuario.id]);
      await registrar(db, { quadroId: null, autorId: usuario.id, acao: chave === 'teto' ? 'teto_permissoes' : 'limites_alertas', detalhes: det });
    }
    // baixar o teto muda as permissões efetivas de todos os quadros: as telas abertas recarregam no próximo polling
    if (mudancas.some(([k]) => k === 'teto')) await db.query("UPDATE lideres_quadros SET versao = versao + 1 WHERE status = 'ativo'");
  });
  return obterConfig(usuario);
}

/* ============================================================
   Visão Gerencial (só administrador)
   ============================================================ */

export async function visaoGerencial(usuario, filtros = {}) {
  if (!ehAdmin(usuario)) throw new ErroHttp(403, 'A Visão Gerencial é exclusiva dos administradores.');
  const hoje = hojeSP();
  const p = periodoValido({ de: filtros.de, ate: filtros.ate }, hoje);
  const idOk = (v) => (/^\d{1,18}$/.test(String(v || '')) ? String(v) : null);
  const quadroId = idOk(filtros.quadro);
  const respId = idOk(filtros.responsavel);
  // janela: tudo que está aberto + o que foi criado ou concluído desde o início do período anterior (ou há 15 dias,
  // para a tendência de atrasos). Não lê o histórico inteiro: cresce com o volume do período, não com a idade do sistema.
  const desde = [p.anterior.de, new Date(Date.parse(`${hoje}T12:00:00Z`) - 15 * 864e5).toISOString().slice(0, 10)].sort()[0];
  const [cfg, { rows: qs }, { rows: ts }, { rows: ints }] = await Promise.all([
    lerConfig(),
    consulta(`SELECT q.id, q.nome, q.cor, q.icone, q.status, q.lider_id, u.nome AS lider_nome
                FROM lideres_quadros q JOIN usuarios u ON u.id = q.lider_id
               WHERE q.status = 'ativo' AND ($1::bigint IS NULL OR q.id = $1::bigint) ORDER BY lower(q.nome)`, [quadroId]),
    consulta(`SELECT t.id, t.quadro_id, t.titulo, t.responsavel_id, t.prioridade, t.status, t.bloqueada,
                     to_char(t.prazo, 'YYYY-MM-DD') AS prazo, t.criado_em, t.concluido_em,
                     GREATEST(t.atualizado_em,
                       (SELECT max(h.criado_em) FROM lideres_historico h WHERE h.tarefa_id = t.id),
                       (SELECT max(c.criado_em) FROM lideres_comentarios c WHERE c.tarefa_id = t.id)) AS ultima_atividade
                FROM lideres_tarefas t JOIN lideres_quadros q ON q.id = t.quadro_id AND q.status = 'ativo'
               WHERE ($1::bigint IS NULL OR t.quadro_id = $1::bigint) AND ($2::bigint IS NULL OR t.responsavel_id = $2::bigint)
                 AND (t.status <> 'concluido' OR t.concluido_em >= $3::date OR t.criado_em >= $3::date)`, [quadroId, respId, desde]),
    consulta('SELECT i.quadro_id, i.usuario_id FROM lideres_integrantes i JOIN lideres_quadros q ON q.id = i.quadro_id AND q.status = \'ativo\''),
  ]);
  const quadros = qs.map((q) => ({ ...q, id: String(q.id), lider_id: String(q.lider_id), estagiarios: ints.filter((i) => String(i.quadro_id) === String(q.id)).map((i) => String(i.usuario_id)) }));
  const tarefas = ts.map((t) => ({ ...t, id: String(t.id), quadro_id: String(t.quadro_id), responsavel_id: t.responsavel_id == null ? null : String(t.responsavel_id), criado_em: iso(t.criado_em), concluido_em: iso(t.concluido_em), ultima_atividade: iso(t.ultima_atividade) }));
  const ids = [...new Set([...tarefas.map((t) => t.responsavel_id).filter(Boolean), ...quadros.flatMap((q) => q.estagiarios)])];
  const nomes = Object.fromEntries((await pessoas({ query: consulta }, ids)).map((x) => [x.id, x.nome]));
  const g = montarGerencial({ quadros, tarefas, nomes, config: cfg.alertas, periodo: p, hoje });
  // títulos das tarefas citadas nos alertas (para o administrador vincular na orientação)
  const titulos = Object.fromEntries(tarefas.map((t) => [t.id, t.titulo]));
  g.alertas = g.alertas.map((a) => ({ ...a, tarefasDetalhe: a.tarefas.slice(0, 12).map((id) => ({ id, titulo: titulos[id] || '' })) }));
  // filtros disponíveis (todos os quadros ativos e as pessoas com tarefas), independentes do filtro aplicado
  const { rows: todos } = await consulta(`SELECT q.id, q.nome FROM lideres_quadros q WHERE q.status = 'ativo' ORDER BY lower(q.nome)`);
  const { rows: resp } = await consulta(`SELECT DISTINCT u.id, u.nome FROM lideres_tarefas t JOIN lideres_quadros q ON q.id = t.quadro_id AND q.status = 'ativo'
                                           JOIN usuarios u ON u.id = t.responsavel_id ORDER BY u.nome`);
  const orient = await consulta(`SELECT count(*) FILTER (WHERE tratada_em IS NULL) AS pendentes, count(*) FILTER (WHERE tratada_em IS NULL AND lida_em IS NULL) AS nao_lidas FROM lideres_orientacoes`);
  return {
    ...g,
    filtros: { quadro: quadroId, responsavel: respId, opcoes: { quadros: todos.map((q) => ({ id: String(q.id), nome: q.nome })), responsaveis: resp.map((u) => ({ id: String(u.id), nome: u.nome })) } },
    orientacoes: { pendentes: Number(orient.rows[0].pendentes), naoLidas: Number(orient.rows[0].nao_lidas) },
  };
}

/* ============================================================
   Orientações do administrador ao líder
   ============================================================ */

const PRIORIDADES_ORIENTACAO = ['normal', 'alta', 'critica'];
const NOME_PRIO_ORIENT = { normal: 'Normal', alta: 'Alta', critica: 'Crítica' };

export async function enviarOrientacao(usuario, corpo) {
  if (!ehAdmin(usuario)) throw new ErroHttp(403, 'Só o administrador envia orientações aos líderes.');
  const mensagem = typeof corpo?.mensagem === 'string' ? corpo.mensagem.trim() : '';
  if (mensagem.length < 3 || mensagem.length > 2000) throw new ErroHttp(400, 'Escreva a orientação (de 3 a 2.000 caracteres).');
  const prioridade = PRIORIDADES_ORIENTACAO.includes(corpo?.prioridade) ? corpo.prioridade : null;
  if (!prioridade) throw new ErroHttp(400, 'Escolha a prioridade: normal, alta ou crítica.');
  const tarefas = Array.isArray(corpo?.tarefas) ? [...new Set(corpo.tarefas.map(String))] : [];
  if (tarefas.length > 30 || tarefas.some((x) => !/^\d{1,18}$/.test(x))) throw new ErroHttp(400, 'Tarefas vinculadas inválidas.');
  const alerta = typeof corpo?.alerta === 'string' && /^[a-z_]{3,30}(:\d{1,18}){1,2}$/.test(corpo.alerta) ? corpo.alerta : null;
  return transacao(async (db) => {
    const { quadro } = await quadroVisivel(db, usuario, corpo?.quadro_id);
    exigirAtivo(quadro);
    if (tarefas.length) {
      const { rows: [{ n }] } = await db.query('SELECT count(*)::int AS n FROM lideres_tarefas WHERE quadro_id = $1 AND id = ANY($2::bigint[])', [quadro.id, tarefas]);
      if (n !== tarefas.length) throw new ErroHttp(400, 'As tarefas vinculadas precisam ser deste quadro.');
    }
    const { rows: [o] } = await db.query(
      `INSERT INTO lideres_orientacoes (quadro_id, lider_id, autor_id, prioridade, mensagem, tarefas, alerta)
       VALUES ($1, $2, $3, $4, $5, $6::bigint[], $7) RETURNING *`,
      [quadro.id, quadro.lider_id, usuario.id, prioridade, mensagem, tarefas, alerta],
    );
    await notificar(db, { usuarioId: quadro.lider_id, tipo: 'orientacao', quadroId: quadro.id,
      texto: `${primeiroNome(usuario)} enviou uma orientação${prioridade === 'normal' ? '' : ` de prioridade ${NOME_PRIO_ORIENT[prioridade].toLowerCase()}`} sobre "${corte(quadro.nome, 60)}": ${corte(mensagem, 140)}`, autorId: usuario.id });
    await registrar(db, { quadroId: quadro.id, autorId: usuario.id, acao: 'orientacao_enviada', detalhes: { orientacao: String(o.id), prioridade, tarefas: tarefas.length, alerta } });
    return { id: String(o.id) };
  });
}

const orientacaoPublica = (o, titulos = {}) => ({
  id: String(o.id), quadroId: String(o.quadro_id), quadroNome: o.quadro_nome, quadroCor: o.quadro_cor,
  liderId: String(o.lider_id), liderNome: o.lider_nome, autorNome: o.autor_nome || 'Administrador',
  prioridade: o.prioridade, mensagem: o.mensagem, alerta: o.alerta, nota: o.nota,
  tarefas: (o.tarefas || []).map((id) => ({ id: String(id), titulo: titulos[String(id)] || 'Tarefa removida', status: titulos[`s${id}`] || null })),
  criadoEm: iso(o.criado_em), lidaEm: iso(o.lida_em), tratadaEm: iso(o.tratada_em),
  situacao: o.tratada_em ? 'tratada' : o.lida_em ? 'lida' : 'pendente',
});

/** Recebidas (líder) e, para o administrador, também as enviadas por todos (acompanhamento). */
export async function listarOrientacoes(usuario) {
  const SQL = `SELECT o.*, q.nome AS quadro_nome, q.cor AS quadro_cor, l.nome AS lider_nome, a.nome AS autor_nome
                 FROM lideres_orientacoes o JOIN lideres_quadros q ON q.id = o.quadro_id
                 JOIN usuarios l ON l.id = o.lider_id LEFT JOIN usuarios a ON a.id = o.autor_id`;
  const [{ rows: recebidas }, { rows: enviadas }] = await Promise.all([
    consulta(`${SQL} WHERE o.lider_id = $1 ORDER BY (o.tratada_em IS NULL) DESC, o.criado_em DESC LIMIT 100`, [usuario.id]),
    ehAdmin(usuario) ? consulta(`${SQL} ORDER BY (o.tratada_em IS NULL) DESC, o.criado_em DESC LIMIT 150`) : Promise.resolve({ rows: [] }),
  ]);
  const ids = [...new Set([...recebidas, ...enviadas].flatMap((o) => (o.tarefas || []).map(String)))];
  const titulos = {};
  if (ids.length) {
    const { rows } = await consulta('SELECT id, titulo, status FROM lideres_tarefas WHERE id = ANY($1::bigint[])', [ids]);
    for (const t of rows) { titulos[String(t.id)] = t.titulo; titulos[`s${t.id}`] = t.status; }
  }
  return { recebidas: recebidas.map((o) => orientacaoPublica(o, titulos)), enviadas: enviadas.map((o) => orientacaoPublica(o, titulos)), admin: ehAdmin(usuario) };
}

async function orientacaoDoLider(db, usuario, id) {
  if (!/^\d{1,18}$/.test(String(id ?? ''))) throw new ErroHttp(400, 'Informe a orientação.');
  const { rows: [o] } = await db.query('SELECT o.*, q.nome AS quadro_nome FROM lideres_orientacoes o JOIN lideres_quadros q ON q.id = o.quadro_id WHERE o.id = $1 FOR UPDATE OF o', [id]);
  // só o líder destinatário confirma leitura e trata (o administrador acompanha, não responde por ele)
  if (!o || String(o.lider_id) !== String(usuario.id)) throw new ErroHttp(404, 'Orientação não encontrada.');
  return o;
}

/** Confirmação de leitura (só a primeira vez conta). */
export async function lerOrientacao(usuario, id) {
  return transacao(async (db) => {
    const o = await orientacaoDoLider(db, usuario, id);
    if (!o.lida_em) {
      await db.query('UPDATE lideres_orientacoes SET lida_em = now() WHERE id = $1', [id]);
      await registrar(db, { quadroId: o.quadro_id, autorId: usuario.id, acao: 'orientacao_lida', detalhes: { orientacao: String(id) } });
    }
    return { ok: true };
  });
}

/** Marca como tratada (com nota opcional) e avisa quem enviou. */
export async function tratarOrientacao(usuario, id, corpo) {
  const nota = typeof corpo?.nota === 'string' ? corpo.nota.trim() : '';
  if (nota.length > 1000) throw new ErroHttp(400, 'A nota pode ter até 1.000 caracteres.');
  return transacao(async (db) => {
    const o = await orientacaoDoLider(db, usuario, id);
    if (o.tratada_em) throw new ErroHttp(409, 'Esta orientação já foi tratada.');
    await db.query('UPDATE lideres_orientacoes SET tratada_em = now(), lida_em = COALESCE(lida_em, now()), nota = $2 WHERE id = $1', [id, nota]);
    await registrar(db, { quadroId: o.quadro_id, autorId: usuario.id, acao: 'orientacao_tratada', detalhes: { orientacao: String(id), nota: corte(nota, 200) } });
    if (o.autor_id) await notificar(db, { usuarioId: o.autor_id, tipo: 'orientacao_tratada', quadroId: o.quadro_id, texto: `${primeiroNome(usuario)} tratou a orientação sobre "${corte(o.quadro_nome, 60)}"${nota ? `: ${corte(nota, 140)}` : '.'}`, autorId: usuario.id });
    return { ok: true };
  });
}

/** Pendentes do líder (para o sino e a faixa de aviso): total e quantas são críticas/altas. */
async function contarOrientacoesPendentes(usuario) {
  const { rows: [r] } = await consulta(
    `SELECT count(*) AS total, count(*) FILTER (WHERE prioridade = 'critica') AS criticas, count(*) FILTER (WHERE prioridade = 'alta') AS altas,
            count(*) FILTER (WHERE lida_em IS NULL) AS nao_lidas
       FROM lideres_orientacoes WHERE lider_id = $1 AND tratada_em IS NULL`, [usuario.id]);
  return { total: Number(r.total), criticas: Number(r.criticas), altas: Number(r.altas), naoLidas: Number(r.nao_lidas) };
}

export { ehAdmin };
