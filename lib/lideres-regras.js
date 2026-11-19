/* Processo de Líderes — regras de acesso e validação (funções PURAS, sem banco).
   A API (lib/lideres.js) carrega quadro, tarefa e integrantes e pergunta a estas funções; a tela só esconde botões.

   Papéis (lib/permissoes.js): admin, consultor, estagiario.
   - admin: tudo (cria, edita, arquiva e exclui quadros; faz qualquer operação nas tarefas).
   - consultor: vê todos os quadros. Só o LÍDER do quadro faz as operações críticas: criar, editar e excluir tarefa,
     distribuir (responsável), prioridade e prazo, mover qualquer tarefa, aprovar e devolver para ajuste.
     Os demais consultores leem e comentam.
   - estagiario: vê só os quadros ativos de que é integrante (fora disso: 404, sem revelar que o quadro existe).
     Atualiza só as próprias tarefas: move entre A Fazer e Em Andamento, envia para revisão, marca checklist e
     sinaliza impedimento. Comenta em qualquer tarefa do quadro. Nunca aprova (não leva a Concluído).
   Quadro arquivado: só leitura para todos; o admin pode reativar ou excluir. */

export const COLUNAS = Object.freeze(['a_fazer', 'em_andamento', 'em_revisao', 'concluido']);
export const NOME_COLUNA = Object.freeze({ a_fazer: 'A Fazer', em_andamento: 'Em Andamento', em_revisao: 'Em Revisão', concluido: 'Concluído' });
export const PRIORIDADES = Object.freeze(['baixa', 'media', 'alta', 'urgente']);
export const NOME_PRIORIDADE = Object.freeze({ baixa: 'Baixa', media: 'Média', alta: 'Alta', urgente: 'Urgente' });
export const ICONES = Object.freeze(['alvo', 'foguete', 'engrenagem', 'grafico', 'pessoas', 'escudo', 'raio', 'livro', 'caixa', 'bandeira']);
export const STATUS_QUADRO = Object.freeze(['ativo', 'arquivado']);

/** Transições que o estagiário pode fazer na própria tarefa. */
const TRANSICOES_ESTAGIARIO = Object.freeze({
  a_fazer: ['a_fazer', 'em_andamento'],
  em_andamento: ['a_fazer', 'em_andamento', 'em_revisao'],
  em_revisao: [],
  concluido: [],
});

const mesmoId = (a, b) => a != null && b != null && String(a) === String(b);
export const ehAdmin = (u) => u?.papel === 'admin';

/** É integrante (estagiário) do quadro? `integrantes` = lista de ids. */
export const ehIntegrante = (usuario, integrantes = []) => integrantes.some((id) => mesmoId(id, usuario?.id));
export const ehLider = (usuario, quadro) => usuario?.papel === 'consultor' && mesmoId(quadro?.lider_id, usuario?.id);

/** Pode ver o quadro (e suas tarefas)? false → a API responde 404. */
export function podeVerQuadro(usuario, quadro, integrantes = []) {
  if (!usuario || !quadro) return false;
  if (ehAdmin(usuario)) return true;
  if (usuario.papel === 'consultor') return true;
  if (usuario.papel === 'estagiario') return quadro.status === 'ativo' && ehIntegrante(usuario, integrantes);
  return false;
}

/** Criar, editar, arquivar, excluir quadro e mexer nos integrantes: só admin. */
export const podeGerirQuadro = (usuario) => ehAdmin(usuario);

/** Operações críticas nas tarefas (criar, editar, excluir, distribuir, prioridade/prazo, mover, aprovar). */
export function podeOperarQuadro(usuario, quadro) {
  if (!usuario || !quadro || quadro.status !== 'ativo') return false;
  return ehAdmin(usuario) || ehLider(usuario, quadro);
}

/** É o responsável pela tarefa? */
export const ehResponsavel = (usuario, tarefa) => mesmoId(tarefa?.responsavel_id, usuario?.id);

/** Atualizar a própria tarefa (checklist, impedimento): líder/admin ou o estagiário responsável integrante. */
export function podeAtualizarTarefa(usuario, quadro, tarefa, integrantes = []) {
  if (podeOperarQuadro(usuario, quadro)) return true;
  return quadro?.status === 'ativo' && usuario?.papel === 'estagiario' && ehIntegrante(usuario, integrantes) && ehResponsavel(usuario, tarefa);
}

/** Comentar: quem vê o quadro, se o quadro estiver ativo. */
export const podeComentar = (usuario, quadro, integrantes = []) => quadro?.status === 'ativo' && podeVerQuadro(usuario, quadro, integrantes);

/**
 * Mover a tarefa de `de` para `para`. Líder/admin: qualquer coluna. Estagiário responsável: só as transições
 * permitidas (nunca aprova). Devolve { ok, motivo? }.
 */
export function podeMover(usuario, quadro, tarefa, para, integrantes = []) {
  if (!COLUNAS.includes(para)) return { ok: false, motivo: 'Coluna inválida.' };
  if (podeOperarQuadro(usuario, quadro)) return { ok: true };
  if (!podeAtualizarTarefa(usuario, quadro, tarefa, integrantes)) return { ok: false, motivo: 'Só o líder do quadro ou o responsável pela tarefa podem movê-la.' };
  if (!(TRANSICOES_ESTAGIARIO[tarefa.status] || []).includes(para)) {
    return { ok: false, motivo: tarefa.status === 'em_revisao' ? 'A tarefa está em revisão: aguarde a aprovação ou o ajuste do líder.' : 'Só o líder do quadro aprova e conclui tarefas.' };
  }
  return { ok: true };
}

/** Campos que o usuário pode alterar na tarefa (PATCH). */
export function camposEditaveis(usuario, quadro, tarefa, integrantes = []) {
  if (podeOperarQuadro(usuario, quadro)) return ['titulo', 'descricao', 'responsavel_id', 'prioridade', 'prazo', 'bloqueada', 'motivo_bloqueio'];
  if (podeAtualizarTarefa(usuario, quadro, tarefa, integrantes)) return ['bloqueada', 'motivo_bloqueio'];
  return [];
}

/** Resumo das permissões para a tela (o servidor confere de novo em cada ação). */
export function permissoesDoQuadro(usuario, quadro, integrantes = []) {
  return {
    gerir: podeGerirQuadro(usuario),
    operar: podeOperarQuadro(usuario, quadro),
    comentar: podeComentar(usuario, quadro, integrantes),
    lider: ehLider(usuario, quadro),
  };
}

export function permissoesDaTarefa(usuario, quadro, tarefa, integrantes = []) {
  return {
    editar: camposEditaveis(usuario, quadro, tarefa, integrantes),
    excluir: podeOperarQuadro(usuario, quadro),
    atualizar: podeAtualizarTarefa(usuario, quadro, tarefa, integrantes),
    comentar: podeComentar(usuario, quadro, integrantes),
    mover: COLUNAS.filter((c) => c !== tarefa.status && podeMover(usuario, quadro, tarefa, c, integrantes).ok),
    checklistGerir: podeOperarQuadro(usuario, quadro),
  };
}

/* ---------- validação ---------- */

const texto = (v) => (typeof v === 'string' ? v.replace(/\s+$/g, '').replace(/^\s+/g, '') : '');
const dataValida = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(new Date(`${v}T12:00:00Z`).getTime());
const idValido = (v) => /^\d{1,18}$/.test(String(v ?? ''));

/** Valida o corpo de criação/edição do quadro. `parcial` = PATCH (só os campos enviados). Devolve { ok, erro?, dados }. */
export function validarQuadro(corpo, { parcial = false } = {}) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return { ok: false, erro: 'Envie os dados do quadro.' };
  const dados = {};
  const tem = (k) => Object.hasOwn(corpo, k);
  if (!parcial || tem('nome')) {
    const nome = texto(corpo.nome);
    if (nome.length < 2 || nome.length > 80) return { ok: false, erro: 'O nome do quadro precisa ter de 2 a 80 caracteres.' };
    dados.nome = nome;
  }
  if (tem('descricao')) {
    const d = texto(corpo.descricao);
    if (d.length > 600) return { ok: false, erro: 'A descrição pode ter até 600 caracteres.' };
    dados.descricao = d;
  }
  if (!parcial || tem('lider_id')) {
    if (!idValido(corpo.lider_id)) return { ok: false, erro: 'Escolha o líder (consultor) do quadro.' };
    dados.lider_id = String(corpo.lider_id);
  }
  if (tem('estagiarios')) {
    if (!Array.isArray(corpo.estagiarios) || corpo.estagiarios.length > 40 || corpo.estagiarios.some((x) => !idValido(x))) return { ok: false, erro: 'Lista de estagiários inválida.' };
    dados.estagiarios = [...new Set(corpo.estagiarios.map(String))];
  } else if (!parcial) dados.estagiarios = [];
  if (tem('cor')) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(String(corpo.cor || ''))) return { ok: false, erro: 'Cor inválida.' };
    dados.cor = String(corpo.cor).toUpperCase();
  }
  if (tem('icone')) {
    if (!ICONES.includes(corpo.icone)) return { ok: false, erro: 'Ícone inválido.' };
    dados.icone = corpo.icone;
  }
  if (tem('status')) {
    if (!STATUS_QUADRO.includes(corpo.status)) return { ok: false, erro: 'Status do quadro inválido.' };
    dados.status = corpo.status;
  }
  return { ok: true, dados };
}

/** Valida os campos de tarefa enviados (criação exige título). Devolve { ok, erro?, dados }. */
export function validarTarefa(corpo, { parcial = false } = {}) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return { ok: false, erro: 'Envie os dados da tarefa.' };
  const dados = {};
  const tem = (k) => Object.hasOwn(corpo, k);
  if (!parcial || tem('titulo')) {
    const t = texto(corpo.titulo);
    if (t.length < 2 || t.length > 140) return { ok: false, erro: 'O título precisa ter de 2 a 140 caracteres.' };
    dados.titulo = t;
  }
  if (tem('descricao')) {
    const d = texto(corpo.descricao);
    if (d.length > 4000) return { ok: false, erro: 'A descrição pode ter até 4.000 caracteres.' };
    dados.descricao = d;
  }
  if (tem('responsavel_id')) {
    if (corpo.responsavel_id !== null && corpo.responsavel_id !== '' && !idValido(corpo.responsavel_id)) return { ok: false, erro: 'Responsável inválido.' };
    dados.responsavel_id = corpo.responsavel_id === null || corpo.responsavel_id === '' ? null : String(corpo.responsavel_id);
  }
  if (tem('prioridade')) {
    if (!PRIORIDADES.includes(corpo.prioridade)) return { ok: false, erro: 'Prioridade inválida.' };
    dados.prioridade = corpo.prioridade;
  }
  if (tem('prazo')) {
    if (corpo.prazo !== null && corpo.prazo !== '' && !dataValida(corpo.prazo)) return { ok: false, erro: 'Prazo inválido (use uma data).' };
    dados.prazo = corpo.prazo || null;
  }
  if (tem('bloqueada')) {
    if (typeof corpo.bloqueada !== 'boolean') return { ok: false, erro: 'Informe se a tarefa está bloqueada.' };
    dados.bloqueada = corpo.bloqueada;
  }
  if (tem('motivo_bloqueio')) {
    const m = texto(corpo.motivo_bloqueio);
    if (m.length > 300) return { ok: false, erro: 'O motivo do impedimento pode ter até 300 caracteres.' };
    dados.motivo_bloqueio = m;
  }
  if (dados.bloqueada === true && !dados.motivo_bloqueio) return { ok: false, erro: 'Descreva o impedimento para o líder entender o bloqueio.' };
  if (dados.bloqueada === false) dados.motivo_bloqueio = '';
  return { ok: true, dados };
}

/** Logins mencionados com @ no texto (sem repetição, em minúsculas). */
export function extrairMencoes(txt) {
  const achados = String(txt || '').matchAll(/(^|[^\w.@-])@([a-zA-Z0-9._-]{3,60})/g);
  return [...new Set([...achados].map((m) => m[2].replace(/[.]+$/, '').toLowerCase()))];
}

/* ---------- datas e dashboard ---------- */

/** Data de hoje (AAAA-MM-DD) no fuso de São Paulo. */
export function hojeSP(agora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(agora);
}

const prazoTexto = (p) => (p instanceof Date ? p.toISOString().slice(0, 10) : p ? String(p).slice(0, 10) : null);
export const atrasada = (t, hoje) => t.status !== 'concluido' && Boolean(prazoTexto(t.prazo)) && prazoTexto(t.prazo) < hoje;

/** Números do quadro, a partir das tarefas reais. `pessoas` = { id: nome } para a distribuição. */
export function montarDashboard(tarefas, estagiarios = [], hoje = hojeSP()) {
  const contar = (s) => tarefas.filter((t) => t.status === s).length;
  const total = tarefas.length;
  const concluidas = contar('concluido');
  const porPessoa = new Map(estagiarios.map((e) => [String(e.id), { id: String(e.id), nome: e.nome, total: 0, concluidas: 0, atrasadas: 0, abertas: 0 }]));
  let semResponsavel = 0;
  for (const t of tarefas) {
    const chave = t.responsavel_id == null ? null : String(t.responsavel_id);
    if (!chave) { semResponsavel += 1; continue; }
    const p = porPessoa.get(chave);
    if (!p) continue;
    p.total += 1;
    if (t.status === 'concluido') p.concluidas += 1; else p.abertas += 1;
    if (atrasada(t, hoje)) p.atrasadas += 1;
  }
  return {
    total,
    pendentes: contar('a_fazer'),
    emAndamento: contar('em_andamento'),
    emRevisao: contar('em_revisao'),
    concluidas,
    atrasadas: tarefas.filter((t) => atrasada(t, hoje)).length,
    bloqueadas: tarefas.filter((t) => t.bloqueada && t.status !== 'concluido').length,
    pctConclusao: total ? Math.round((concluidas * 100) / total) : 0,
    semResponsavel,
    porEstagiario: [...porPessoa.values()],
  };
}
