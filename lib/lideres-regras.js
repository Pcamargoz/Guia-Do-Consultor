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

/* ---------- permissões granulares do estagiário (por quadro) ----------
   O líder (ou o admin) liga e desliga cada uma em "Gerenciar Equipe". O administrador define o TETO: o que um líder
   pode conceder. Efetiva = salva (ou padrão) E dentro do teto; baixar o teto revoga na hora, sem mexer no que foi salvo.
   Visualizar as tarefas do quadro não é uma permissão: vem de ser integrante. */
export const PERMISSOES = Object.freeze([
  { id: 'criar', grupo: 'Tarefas', nome: 'Criar tarefas', texto: 'Cria tarefas no quadro, para si (ou para outros, se puder atribuir).' },
  { id: 'editar', grupo: 'Tarefas', nome: 'Editar as próprias tarefas', texto: 'Título, descrição e prazo das tarefas que são suas ou que criou.' },
  { id: 'mover', grupo: 'Fluxo', nome: 'Movimentar cards', texto: 'Leva as próprias tarefas entre A Fazer, Em Andamento e Em Revisão.' },
  { id: 'concluir', grupo: 'Fluxo', nome: 'Concluir sem revisão', texto: 'Leva as próprias tarefas direto a Concluído, sem a aprovação do líder.', critica: true },
  { id: 'prioridade', grupo: 'Organização', nome: 'Definir prioridade', texto: 'Muda a prioridade das tarefas que são suas ou que criou.' },
  { id: 'atribuir', grupo: 'Organização', nome: 'Atribuir a outros', texto: 'Passa tarefas que são suas ou que criou para outro integrante do quadro.', critica: true },
  { id: 'comentar', grupo: 'Colaboração', nome: 'Comentar', texto: 'Escreve comentários e menciona pessoas nas tarefas do quadro.' },
  { id: 'indicadores', grupo: 'Colaboração', nome: 'Ver indicadores do quadro', texto: 'Abre o Painel do quadro com conclusão, atrasos e distribuição.' },
].map((p) => Object.freeze({ critica: false, ...p })));
export const IDS_PERMISSOES = Object.freeze(PERMISSOES.map((p) => p.id));
/** Padrão = o comportamento de antes das permissões granulares. */
export const PERMISSOES_PADRAO = Object.freeze({ criar: false, editar: false, mover: true, concluir: false, prioridade: false, atribuir: false, comentar: true, indicadores: true });
/** Teto padrão: o líder pode conceder tudo, exceto concluir sem revisão (o administrador decide liberar). */
export const TETO_PADRAO = Object.freeze({ criar: true, editar: true, mover: true, concluir: false, prioridade: true, atribuir: true, comentar: true, indicadores: true });

/** Teto válido (o salvo pelo admin sobre o padrão). */
export function tetoValido(salvo) {
  const t = {};
  for (const id of IDS_PERMISSOES) t[id] = typeof salvo?.[id] === 'boolean' ? salvo[id] : TETO_PADRAO[id];
  return t;
}
/** Permissões efetivas do estagiário: as salvas (ou o padrão) limitadas pelo teto do administrador. */
export function permissoesEfetivas(salvas, teto = TETO_PADRAO) {
  const t = tetoValido(teto);
  const p = {};
  for (const id of IDS_PERMISSOES) p[id] = (typeof salvas?.[id] === 'boolean' ? salvas[id] : PERMISSOES_PADRAO[id]) && t[id] === true;
  return p;
}
/** Valida a alteração pedida pelo líder: só ids conhecidos, booleanos, nada acima do teto. Devolve { ok, status?, erro?, dados }. */
export function validarPermissoes(corpo, teto = TETO_PADRAO) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return { ok: false, status: 400, erro: 'Envie as permissões.' };
  const t = tetoValido(teto);
  const dados = {};
  for (const [k, v] of Object.entries(corpo)) {
    if (!IDS_PERMISSOES.includes(k)) return { ok: false, status: 400, erro: `Permissão desconhecida: ${k}.` };
    if (typeof v !== 'boolean') return { ok: false, status: 400, erro: 'Cada permissão é ligada ou desligada (verdadeiro ou falso).' };
    if (v && !t[k]) return { ok: false, status: 403, erro: `"${PERMISSOES.find((p) => p.id === k).nome}" está bloqueada pelo administrador.` };
    dados[k] = v;
  }
  if (!Object.keys(dados).length) return { ok: false, status: 400, erro: 'Nada para alterar.' };
  return { ok: true, dados };
}
/** Valida o teto enviado pelo admin (completa com o padrão o que não veio). */
export function validarTeto(corpo) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return { ok: false, erro: 'Envie o teto de permissões.' };
  for (const [k, v] of Object.entries(corpo)) {
    if (!IDS_PERMISSOES.includes(k) || typeof v !== 'boolean') return { ok: false, erro: 'Teto de permissões inválido.' };
  }
  return { ok: true, dados: tetoValido(corpo) };
}

/** Transições do estagiário na própria tarefa, conforme as permissões (sem `mover`, nenhuma; `concluir` libera Concluído). */
function transicoesEstagiario(status, perms) {
  const base = perms.mover ? ({ a_fazer: ['a_fazer', 'em_andamento'], em_andamento: ['a_fazer', 'em_andamento', 'em_revisao'] })[status] || [] : [];
  return perms.concluir && ['em_andamento', 'em_revisao'].includes(status) ? [...base, 'concluido'] : base;
}

const mesmoId = (a, b) => a != null && b != null && String(a) === String(b);
export const ehAdmin = (u) => u?.papel === 'admin';

/** É integrante (estagiário) do quadro? `integrantes` = lista de ids. */
export const ehIntegrante = (usuario, integrantes = []) => integrantes.some((id) => mesmoId(id, usuario?.id));
// Líder: consultor ou administrador escolhido no quadro (o admin já opera tudo; aqui conta para o selo e os avisos).
export const ehLider = (usuario, quadro) => ['consultor', 'admin'].includes(usuario?.papel) && mesmoId(quadro?.lider_id, usuario?.id);

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

/** Gerenciar a equipe (permissões dos estagiários): o líder do quadro e o admin, com o quadro ativo. */
export const podeGerirEquipe = (usuario, quadro) => quadro?.status === 'ativo' && (ehAdmin(usuario) || ehLider(usuario, quadro));

/** Operações críticas nas tarefas (criar, editar, excluir, distribuir, prioridade/prazo, mover, aprovar). */
export function podeOperarQuadro(usuario, quadro) {
  if (!usuario || !quadro || quadro.status !== 'ativo') return false;
  return ehAdmin(usuario) || ehLider(usuario, quadro);
}

/** É o responsável pela tarefa? */
export const ehResponsavel = (usuario, tarefa) => mesmoId(tarefa?.responsavel_id, usuario?.id);
/** A tarefa é "dele": responsável ou quem criou. */
const ehDono = (usuario, tarefa) => ehResponsavel(usuario, tarefa) || mesmoId(tarefa?.criado_por, usuario?.id);
const estagiarioAtivo = (usuario, quadro, integrantes) => quadro?.status === 'ativo' && usuario?.papel === 'estagiario' && ehIntegrante(usuario, integrantes);

/** Atualizar a própria tarefa (checklist, impedimento): líder/admin ou o estagiário responsável integrante. */
export function podeAtualizarTarefa(usuario, quadro, tarefa, integrantes = []) {
  if (podeOperarQuadro(usuario, quadro)) return true;
  return estagiarioAtivo(usuario, quadro, integrantes) && ehResponsavel(usuario, tarefa);
}

/** Comentar: quem vê o quadro ativo; estagiário só com a permissão `comentar`. */
export function podeComentar(usuario, quadro, integrantes = [], perms = PERMISSOES_PADRAO) {
  if (quadro?.status !== 'ativo' || !podeVerQuadro(usuario, quadro, integrantes)) return false;
  return usuario.papel !== 'estagiario' || perms.comentar === true;
}

/** Criar tarefa: líder/admin, ou estagiário com `criar`. */
export const podeCriarTarefa = (usuario, quadro, integrantes = [], perms = PERMISSOES_PADRAO) =>
  podeOperarQuadro(usuario, quadro) || (estagiarioAtivo(usuario, quadro, integrantes) && perms.criar === true);

/**
 * Mover a tarefa para `para`. Líder/admin: qualquer coluna. Estagiário responsável: as transições das suas permissões
 * (`mover` até Em Revisão; `concluir` direto a Concluído). Devolve { ok, motivo? }.
 */
export function podeMover(usuario, quadro, tarefa, para, integrantes = [], perms = PERMISSOES_PADRAO) {
  if (!COLUNAS.includes(para)) return { ok: false, motivo: 'Coluna inválida.' };
  if (podeOperarQuadro(usuario, quadro)) return { ok: true };
  if (!podeAtualizarTarefa(usuario, quadro, tarefa, integrantes)) return { ok: false, motivo: 'Só o líder do quadro ou o responsável pela tarefa podem movê-la.' };
  if (!transicoesEstagiario(tarefa.status, perms).includes(para)) {
    if (!perms.mover && para !== 'concluido') return { ok: false, motivo: 'Seu líder não liberou a movimentação de cards neste quadro.' };
    return { ok: false, motivo: tarefa.status === 'em_revisao' ? 'A tarefa está em revisão: aguarde a aprovação ou o ajuste do líder.' : 'Só o líder do quadro aprova e conclui tarefas.' };
  }
  return { ok: true };
}

/** Campos que o usuário pode alterar na tarefa (PATCH). */
export function camposEditaveis(usuario, quadro, tarefa, integrantes = [], perms = PERMISSOES_PADRAO) {
  if (podeOperarQuadro(usuario, quadro)) return ['titulo', 'descricao', 'responsavel_id', 'prioridade', 'prazo', 'bloqueada', 'motivo_bloqueio'];
  if (!estagiarioAtivo(usuario, quadro, integrantes)) return [];
  const campos = ehResponsavel(usuario, tarefa) ? ['bloqueada', 'motivo_bloqueio'] : [];
  if (ehDono(usuario, tarefa)) {
    if (perms.editar) campos.push('titulo', 'descricao', 'prazo');
    if (perms.prioridade) campos.push('prioridade');
    if (perms.atribuir) campos.push('responsavel_id');
  }
  return campos;
}

/** Resumo das permissões para a tela (o servidor confere de novo em cada ação). */
export function permissoesDoQuadro(usuario, quadro, integrantes = [], perms = PERMISSOES_PADRAO) {
  const est = usuario?.papel === 'estagiario';
  return {
    gerir: podeGerirQuadro(usuario),
    operar: podeOperarQuadro(usuario, quadro),
    comentar: podeComentar(usuario, quadro, integrantes, perms),
    lider: ehLider(usuario, quadro),
    equipe: podeGerirEquipe(usuario, quadro),
    criar: podeCriarTarefa(usuario, quadro, integrantes, perms),
    indicadores: !est || perms.indicadores === true,
    ...(est ? { minhas: { ...perms } } : {}),
  };
}

export function permissoesDaTarefa(usuario, quadro, tarefa, integrantes = [], perms = PERMISSOES_PADRAO) {
  return {
    editar: camposEditaveis(usuario, quadro, tarefa, integrantes, perms),
    excluir: podeOperarQuadro(usuario, quadro),
    atualizar: podeAtualizarTarefa(usuario, quadro, tarefa, integrantes),
    comentar: podeComentar(usuario, quadro, integrantes, perms),
    mover: COLUNAS.filter((c) => c !== tarefa.status && podeMover(usuario, quadro, tarefa, c, integrantes, perms).ok),
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
    if (!idValido(corpo.lider_id)) return { ok: false, erro: 'Escolha o líder do quadro.' };
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
