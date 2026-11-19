/* Processo de Líderes — Visão Gerencial: indicadores, comparativo entre quadros e alertas (funções PURAS, sem banco).
   lib/lideres.js busca as linhas (tarefas abertas + as que mexeram no período) e chama montarGerencial().
   Princípios:
   - Tudo sai das tarefas reais: status, prazo, prioridade, criação, conclusão e última atividade.
   - Comparação justa: carga e ritmo são PONDERADOS pela prioridade (baixa 1, média 2, alta 3, urgente 4) e divididos pelo
     número de estagiários do quadro; "melhor evolução" só considera quadros com volume mínimo de entregas.
   - Alertas são regras explicáveis com limites configuráveis pelo administrador (ALERTAS_PADRAO). Cada alerta diz o que
     aconteceu, por quê, quem está envolvido, o impacto e a ação sugerida. */

export const PESO_PRIORIDADE = Object.freeze({ baixa: 1, media: 2, alta: 3, urgente: 4 });
export const NIVEIS = Object.freeze(['critico', 'atencao', 'informativo']);

/** Limites dos alertas (o admin ajusta em "Ajustar alertas"). */
export const ALERTAS_PADRAO = Object.freeze({
  diasProximo: 2, // prazo "próximo": vence em até N dias
  atrasoCritico: 3, // quadro com N ou mais vencidas vira crítico
  diasAtrasoCritico: 3, // alta/urgente vencida há N dias ou mais vira crítico
  cargaPorEstagiario: 6, // abertas por estagiário acima disso = acúmulo
  diasParada: 5, // em andamento/revisão sem nenhuma atividade há N dias
  pctConcentracao: 50, // um integrante com mais de N% das abertas do quadro
  minConcentracao: 5, // só avalia concentração com pelo menos N abertas
  crescimentoMin: 3, // atrasos subindo há duas semanas seguidas, com pelo menos +N no total
});
export const LIMITES_ALERTAS = Object.freeze({
  diasProximo: [1, 14, 'Prazo próximo (dias)'], atrasoCritico: [1, 50, 'Vencidas para virar crítico'],
  diasAtrasoCritico: [1, 30, 'Dias de atraso (alta prioridade) para crítico'], cargaPorEstagiario: [1, 50, 'Tarefas abertas por estagiário'],
  diasParada: [1, 60, 'Dias sem atividade'], pctConcentracao: [30, 95, 'Concentração em uma pessoa (%)'],
  minConcentracao: [2, 50, 'Mínimo de abertas para avaliar concentração'], crescimentoMin: [1, 50, 'Crescimento mínimo de atrasos'],
});

export function alertasValidos(salvo) {
  const c = {};
  for (const [k, [min, max]] of Object.entries(LIMITES_ALERTAS)) {
    const v = Number(salvo?.[k]);
    c[k] = Number.isInteger(v) && v >= min && v <= max ? v : ALERTAS_PADRAO[k];
  }
  return c;
}
export function validarAlertas(corpo) {
  if (!corpo || typeof corpo !== 'object' || Array.isArray(corpo)) return { ok: false, erro: 'Envie os limites dos alertas.' };
  for (const [k, v] of Object.entries(corpo)) {
    const lim = LIMITES_ALERTAS[k];
    if (!lim) return { ok: false, erro: `Limite desconhecido: ${k}.` };
    if (!Number.isInteger(v) || v < lim[0] || v > lim[1]) return { ok: false, erro: `${lim[2]}: use um número inteiro de ${lim[0]} a ${lim[1]}.` };
  }
  return { ok: true, dados: alertasValidos(corpo) };
}

/* ---------- datas (AAAA-MM-DD, fuso de São Paulo já resolvido por quem chama) ---------- */
const DIA = 86400000;
const paraData = (s) => new Date(`${s}T12:00:00Z`);
export const somarDias = (s, n) => new Date(paraData(s).getTime() + n * DIA).toISOString().slice(0, 10);
export const diasEntre = (a, b) => Math.round((paraData(b) - paraData(a)) / DIA);
/** Dia (AAAA-MM-DD) de um instante, em São Paulo. */
export const diaSP = (iso) => (iso ? new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(iso)) : null);

/** Período válido: { de, ate } (inclusive) e o anterior de mesmo tamanho. Padrão: últimos 30 dias. */
export function periodoValido({ de, ate } = {}, hoje) {
  const ok = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(paraData(s).getTime());
  let fim = ok(ate) ? ate : hoje;
  if (fim > hoje) fim = hoje;
  let ini = ok(de) ? de : somarDias(fim, -29);
  if (ini > fim) ini = fim;
  if (diasEntre(ini, fim) > 365) ini = somarDias(fim, -365);
  const dias = diasEntre(ini, fim) + 1;
  return { de: ini, ate: fim, dias, anterior: { de: somarDias(ini, -dias), ate: somarDias(ini, -1) } };
}

const entre = (d, p) => Boolean(d) && d >= p.de && d <= p.ate;
const peso = (t) => PESO_PRIORIDADE[t.prioridade] || 2;
const media = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : null);
const mediana = (xs) => { if (!xs.length) return null; const o = [...xs].sort((a, b) => a - b); const m = Math.floor(o.length / 2); return o.length % 2 ? o[m] : (o[m - 1] + o[m]) / 2; };
const arred = (x, c = 1) => (x == null ? null : Math.round(x * 10 ** c) / 10 ** c);
const pct = (a, b) => (b ? Math.round((a * 100) / b) : null);
const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
const aberta = (t) => t.status !== 'concluido';
const alta = (t) => t.prioridade === 'alta' || t.prioridade === 'urgente';

/** Vencida num dia `d`: já existia, prazo antes de d e não estava concluída em d. */
export function vencidaEm(t, d) {
  if (!t.prazo || t.prazo >= d) return false;
  if (diaSP(t.criado_em) > d) return false;
  const fim = diaSP(t.concluido_em);
  return t.status !== 'concluido' || (fim != null && fim > d);
}

/* ---------- alertas ---------- */
const ORDEM_NIVEL = { critico: 0, atencao: 1, informativo: 2 };

export function calcularAlertas({ quadros, tarefas, nomes = {}, config, hoje }) {
  const c = alertasValidos(config);
  const saida = [];
  for (const q of quadros) {
    if (q.status && q.status !== 'ativo') continue;
    const ts = tarefas.filter((t) => String(t.quadro_id) === String(q.id));
    const abertas = ts.filter(aberta);
    const nEst = (q.estagiarios || []).length;
    const base = { quadro: { id: String(q.id), nome: q.nome, cor: q.cor }, lider: { id: String(q.lider_id), nome: q.lider_nome } };
    const ids = (lista) => lista.map((t) => String(t.id));

    // 1. vencidas sem conclusão
    const vencidas = abertas.filter((t) => t.prazo && t.prazo < hoje);
    if (vencidas.length) {
      const altas = vencidas.filter(alta);
      const maisAntiga = Math.max(...vencidas.map((t) => diasEntre(t.prazo, hoje)));
      const altaAntiga = altas.some((t) => diasEntre(t.prazo, hoje) >= c.diasAtrasoCritico);
      const critico = vencidas.length >= c.atrasoCritico || altaAntiga;
      saida.push({ ...base, id: `vencidas:${q.id}`, tipo: 'vencidas', nivel: critico ? 'critico' : 'atencao',
        titulo: `${plural(vencidas.length, 'tarefa vencida', 'tarefas vencidas')} em ${q.nome}`,
        porque: `O prazo passou e a tarefa não foi concluída. Vira crítico com ${c.atrasoCritico} ou mais vencidas no quadro, ou com tarefa de alta prioridade atrasada há ${c.diasAtrasoCritico} dias ou mais.`,
        impacto: `${altas.length ? `${plural(altas.length, 'é de alta prioridade', 'são de alta prioridade')}. ` : ''}A mais antiga venceu há ${plural(maisAntiga, 'dia', 'dias')}: entregas ao cliente podem atrasar em cadeia.`,
        acao: 'Combinar com o líder novos prazos realistas ou redistribuir as tarefas vencidas.',
        tarefas: ids(vencidas), metrica: vencidas.length });
    }

    // 2. alta prioridade perto de vencer
    const vencendo = abertas.filter((t) => alta(t) && t.prazo && t.prazo >= hoje && t.prazo <= somarDias(hoje, c.diasProximo));
    if (vencendo.length) {
      const hojeUrg = vencendo.some((t) => t.prioridade === 'urgente' && t.prazo === hoje);
      saida.push({ ...base, id: `alta_vencendo:${q.id}`, tipo: 'alta_vencendo', nivel: hojeUrg ? 'critico' : 'atencao',
        titulo: `${plural(vencendo.length, 'tarefa de alta prioridade vence', 'tarefas de alta prioridade vencem')} em até ${plural(c.diasProximo, 'dia', 'dias')}`,
        porque: `Prioridade alta ou urgente com prazo nos próximos ${plural(c.diasProximo, 'dia', 'dias')}. Crítico quando há urgente vencendo hoje.`,
        impacto: `${vencendo.filter((t) => t.status === 'a_fazer').length} ainda nem começaram.`,
        acao: 'Confirmar com o líder se as tarefas estão cobertas ou se alguém precisa de apoio agora.',
        tarefas: ids(vencendo), metrica: vencendo.length });
    }

    // 3. acúmulo de pendências
    const limite = nEst ? c.cargaPorEstagiario * nEst : c.cargaPorEstagiario * 2;
    if (abertas.length > limite) {
      const porEst = nEst ? arred(abertas.length / nEst) : null;
      saida.push({ ...base, id: `acumulo:${q.id}`, tipo: 'acumulo', nivel: abertas.length > limite * 1.5 ? 'critico' : 'atencao',
        titulo: `Acúmulo de pendências em ${q.nome}`,
        porque: nEst ? `${abertas.length} tarefas abertas para ${plural(nEst, 'estagiário', 'estagiários')} (${porEst} por pessoa), acima do limite de ${c.cargaPorEstagiario} por estagiário.`
          : `${abertas.length} tarefas abertas num quadro sem estagiários (limite de ${limite}).`,
        impacto: 'Carga alta tende a gerar atrasos e queda de qualidade nas próximas semanas.',
        acao: nEst ? 'Repriorizar com o líder, adiar o que não é essencial ou reforçar a equipe do quadro.' : 'Incluir estagiários no quadro ou redistribuir as tarefas.',
        tarefas: ids(abertas), metrica: abertas.length });
    }

    // 4. atividade parada (em andamento ou em revisão sem nenhuma movimentação, comentário ou edição)
    const paradas = abertas.filter((t) => ['em_andamento', 'em_revisao'].includes(t.status) && t.ultima_atividade && diasEntre(diaSP(t.ultima_atividade), hoje) >= c.diasParada);
    if (paradas.length) {
      const emRevisao = paradas.filter((t) => t.status === 'em_revisao').length;
      const maxDias = Math.max(...paradas.map((t) => diasEntre(diaSP(t.ultima_atividade), hoje)));
      saida.push({ ...base, id: `parada:${q.id}`, tipo: 'parada', nivel: paradas.length >= 3 || maxDias >= c.diasParada * 2 ? 'atencao' : 'informativo',
        titulo: `${plural(paradas.length, 'tarefa parada', 'tarefas paradas')} em ${q.nome}`,
        porque: `Em andamento ou em revisão sem nenhuma atividade (movimentação, comentário, checklist ou edição) há ${c.diasParada} dias ou mais. A mais antiga está parada há ${plural(maxDias, 'dia', 'dias')}.`,
        impacto: emRevisao ? `${plural(emRevisao, 'aguarda', 'aguardam')} a revisão do líder: o estagiário fica travado esperando.` : 'Pode haver impedimento que ninguém sinalizou.',
        acao: emRevisao ? 'Pedir ao líder que revise as entregas pendentes.' : 'Perguntar ao líder se há impedimentos ou se as tarefas devem ser replanejadas.',
        tarefas: ids(paradas), metrica: paradas.length });
    }

    // 5. concentração desproporcional em um integrante
    if (nEst >= 2 && abertas.length >= c.minConcentracao) {
      const por = new Map();
      for (const t of abertas) if (t.responsavel_id != null) por.set(String(t.responsavel_id), [...(por.get(String(t.responsavel_id)) || []), t]);
      for (const [pid, lista] of por) {
        const fatia = pct(lista.length, abertas.length);
        if (fatia > c.pctConcentracao) {
          saida.push({ ...base, id: `concentracao:${q.id}:${pid}`, tipo: 'concentracao', nivel: 'atencao', pessoa: { id: pid, nome: nomes[pid] || 'Integrante' },
            titulo: `${nomes[pid] || 'Um integrante'} concentra ${fatia}% das tarefas abertas`,
            porque: `${lista.length} de ${abertas.length} tarefas abertas de ${q.nome} estão com a mesma pessoa, acima do limite de ${c.pctConcentracao}% (quadro com ${nEst} estagiários).`,
            impacto: 'Risco de gargalo e de sobrecarga numa pessoa enquanto outras ficam ociosas.',
            acao: 'Sugerir ao líder redistribuir parte das tarefas entre os estagiários do quadro.',
            tarefas: ids(lista), metrica: fatia });
        }
      }
    }

    // 6. atrasos crescendo há duas semanas seguidas
    const v14 = ts.filter((t) => vencidaEm(t, somarDias(hoje, -14))).length;
    const v7 = ts.filter((t) => vencidaEm(t, somarDias(hoje, -7))).length;
    const v0 = vencidas.length;
    if (v0 > v7 && v7 > v14 && v0 - v14 >= c.crescimentoMin) {
      saida.push({ ...base, id: `atraso_crescente:${q.id}`, tipo: 'atraso_crescente', nivel: v0 >= c.atrasoCritico * 2 ? 'critico' : 'atencao',
        titulo: `Atrasos crescendo em ${q.nome}`,
        porque: `Tarefas vencidas no quadro: ${v14} há duas semanas, ${v7} há uma semana e ${v0} hoje (alta de ${v0 - v14}, limite de ${c.crescimentoMin}).`,
        impacto: 'A equipe está perdendo mais prazos do que recupera: tendência de piora.',
        acao: 'Revisar com o líder a capacidade do quadro e o planejamento das próximas entregas.',
        tarefas: ids(vencidas), metrica: v0 - v14, serie: [v14, v7, v0] });
    }
  }
  return saida.sort((a, b) => ORDEM_NIVEL[a.nivel] - ORDEM_NIVEL[b.nivel] || b.metrica - a.metrica || a.quadro.nome.localeCompare(b.quadro.nome, 'pt-BR'));
}

/* ---------- visão gerencial completa ---------- */

/**
 * @param quadros  [{ id, nome, cor, icone, status, lider_id, lider_nome, estagiarios: [ids] }]
 * @param tarefas  [{ id, quadro_id, titulo, responsavel_id, prioridade, status, prazo, criado_em, concluido_em, ultima_atividade, bloqueada }]
 * @param nomes    { usuarioId: nome }
 */
export function montarGerencial({ quadros, tarefas, nomes = {}, config, periodo, hoje }) {
  const c = alertasValidos(config);
  const p = periodoValido(periodo, hoje);
  const ant = p.anterior;
  const diaConc = (t) => diaSP(t.concluido_em);
  const diaCria = (t) => diaSP(t.criado_em);
  const abertas = tarefas.filter(aberta);
  const concP = tarefas.filter((t) => t.status === 'concluido' && entre(diaConc(t), p));
  const concA = tarefas.filter((t) => t.status === 'concluido' && entre(diaConc(t), ant));
  const criadasP = tarefas.filter((t) => entre(diaCria(t), p));
  const duracao = (t) => (new Date(t.concluido_em) - new Date(t.criado_em)) / DIA;
  const comPrazo = concP.filter((t) => t.prazo);
  const vencidas = abertas.filter((t) => t.prazo && t.prazo < hoje);
  const proximas = abertas.filter((t) => t.prazo && t.prazo >= hoje && t.prazo <= somarDias(hoje, c.diasProximo));

  const resumo = {
    abertas: { total: abertas.length, a_fazer: abertas.filter((t) => t.status === 'a_fazer').length, em_andamento: abertas.filter((t) => t.status === 'em_andamento').length, em_revisao: abertas.filter((t) => t.status === 'em_revisao').length },
    concluidas: { periodo: concP.length, anterior: concA.length },
    criadas: { periodo: criadasP.length, concluidasDelas: criadasP.filter((t) => t.status === 'concluido').length },
    pctConclusao: pct(criadasP.filter((t) => t.status === 'concluido').length, criadasP.length),
    atrasadas: vencidas.length,
    atrasadasAlta: vencidas.filter(alta).length,
    proximas: proximas.length,
    altaPrioridade: { abertas: abertas.filter(alta).length, urgentes: abertas.filter((t) => t.prioridade === 'urgente').length },
    tempoMedio: { periodo: arred(media(concP.map(duracao))), mediana: arred(mediana(concP.map(duracao))), anterior: arred(media(concA.map(duracao))) },
    noPrazo: { pct: pct(comPrazo.filter((t) => diaConc(t) <= t.prazo).length, comPrazo.length), base: comPrazo.length },
    bloqueadas: abertas.filter((t) => t.bloqueada).length,
  };

  // evolução: por dia até 14 dias, por semana acima disso (dias quase vazios viram ruído)
  const passo = p.dias <= 14 ? 1 : 7;
  const serie = [];
  for (let ini = p.de; ini <= p.ate; ini = somarDias(ini, passo)) {
    const fim = somarDias(ini, passo - 1) > p.ate ? p.ate : somarDias(ini, passo - 1);
    const b = { de: ini, ate: fim };
    serie.push({ de: ini, ate: fim, concluidas: concP.filter((t) => entre(diaConc(t), b)).length, criadas: criadasP.filter((t) => entre(diaCria(t), b)).length });
  }

  const alertas = calcularAlertas({ quadros, tarefas, nomes, config: c, hoje });
  const semanas = Math.max(1, p.dias / 7);

  const porQuadro = quadros.map((q) => {
    const ts = tarefas.filter((t) => String(t.quadro_id) === String(q.id));
    const ab = ts.filter(aberta);
    const cp = ts.filter((t) => t.status === 'concluido' && entre(diaConc(t), p));
    const ca = ts.filter((t) => t.status === 'concluido' && entre(diaConc(t), ant));
    const nEst = (q.estagiarios || []).length;
    const div = Math.max(1, nEst);
    const cpPrazo = cp.filter((t) => t.prazo);
    const meus = alertas.filter((a) => a.quadro.id === String(q.id));
    const nivel = meus[0]?.nivel || null;
    const ritmo = arred(cp.reduce((s, t) => s + peso(t), 0) / div / semanas);
    const ritmoAnterior = arred(ca.reduce((s, t) => s + peso(t), 0) / div / semanas);
    return {
      id: String(q.id), nome: q.nome, cor: q.cor, icone: q.icone, status: q.status || 'ativo',
      lider: { id: String(q.lider_id), nome: q.lider_nome }, estagiarios: nEst,
      abertas: ab.length, atrasadas: ab.filter((t) => t.prazo && t.prazo < hoje).length,
      criticas: ab.filter(alta).length, bloqueadas: ab.filter((t) => t.bloqueada).length,
      concluidas: cp.length, concluidasAnterior: ca.length,
      noPrazo: pct(cpPrazo.filter((t) => diaConc(t) <= t.prazo).length, cpPrazo.length),
      tempoMedio: arred(media(cp.map(duracao))),
      cargaPonderada: ab.reduce((s, t) => s + peso(t), 0),
      cargaPorEstagiario: arred(ab.reduce((s, t) => s + peso(t), 0) / div),
      ritmo, ritmoAnterior, alertas: meus.length, nivel,
      situacao: nivel === 'critico' ? 'Crítico' : nivel === 'atencao' ? 'Atenção' : cp.length || ab.length ? 'No ritmo' : 'Sem movimento',
    };
  });

  const MIN_VOLUME = 3;
  const topo = (lista, chave, filtro = () => true) => [...lista].filter(filtro).sort((a, b) => b[chave] - a[chave])[0] || null;
  const evoluindo = porQuadro.filter((q) => q.concluidas >= MIN_VOLUME);
  const destaques = {
    maisPendencias: topo(porQuadro, 'cargaPonderada', (q) => q.abertas > 0),
    maisAtrasos: topo(porQuadro, 'atrasadas', (q) => q.atrasadas > 0),
    maisEntregas: topo(porQuadro, 'ritmo', (q) => q.concluidas > 0),
    melhorEvolucao: evoluindo.length ? [...evoluindo].sort((a, b) => (b.ritmo - b.ritmoAnterior) - (a.ritmo - a.ritmoAnterior) || (b.noPrazo ?? 0) - (a.noPrazo ?? 0))[0] : null,
    minimoEvolucao: MIN_VOLUME,
    lideresComCriticas: [...new Map(abertas.filter((t) => alta(t) && t.prazo && t.prazo <= somarDias(hoje, c.diasProximo)).map((t) => {
      const q = quadros.find((x) => String(x.id) === String(t.quadro_id));
      return q ? [String(q.lider_id), { id: String(q.lider_id), nome: q.lider_nome }] : null;
    }).filter(Boolean)).values()].map((l) => ({
      ...l,
      quadros: quadros.filter((q) => String(q.lider_id) === l.id).map((q) => q.nome),
      tarefas: abertas.filter((t) => alta(t) && t.prazo && t.prazo <= somarDias(hoje, c.diasProximo) && quadros.some((q) => String(q.id) === String(t.quadro_id) && String(q.lider_id) === l.id)).length,
    })).sort((a, b) => b.tarefas - a.tarefas),
  };

  // distribuição por responsável (estagiários e líderes que receberam tarefas)
  const pesoTotal = abertas.reduce((s, t) => s + peso(t), 0);
  const ids = [...new Set([...abertas, ...concP].map((t) => t.responsavel_id).filter((x) => x != null).map(String))];
  const pessoas = ids.map((id) => {
    const ab = abertas.filter((t) => String(t.responsavel_id) === id);
    const cp = concP.filter((t) => String(t.responsavel_id) === id);
    const cpPrazo = cp.filter((t) => t.prazo);
    const carga = ab.reduce((s, t) => s + peso(t), 0);
    return {
      id, nome: nomes[id] || 'Integrante',
      quadros: [...new Set([...ab, ...cp].map((t) => quadros.find((q) => String(q.id) === String(t.quadro_id))?.nome).filter(Boolean))],
      abertas: ab.length, atrasadas: ab.filter((t) => t.prazo && t.prazo < hoje).length, concluidas: cp.length,
      noPrazo: pct(cpPrazo.filter((t) => diaConc(t) <= t.prazo).length, cpPrazo.length),
      carga, participacao: pct(carga, pesoTotal) ?? 0,
    };
  }).sort((a, b) => b.carga - a.carga || b.concluidas - a.concluidas);
  const semResponsavel = abertas.filter((t) => t.responsavel_id == null).length;

  return {
    periodo: p, hoje, config: c, resumo, serie, alertas, quadros: porQuadro, destaques, pessoas, semResponsavel,
    contagemAlertas: { critico: alertas.filter((a) => a.nivel === 'critico').length, atencao: alertas.filter((a) => a.nivel === 'atencao').length, informativo: alertas.filter((a) => a.nivel === 'informativo').length },
  };
}

/**
 * Desempenho individual da equipe de UM quadro (Visão Gerencial com o filtro de quadro): o líder e cada estagiário,
 * inclusive quem não tem tarefa (aparece zerado, sem número inventado). Tudo sai dos cartões reais do quadro.
 * concluidas = concluídas no período; noPrazo = % das concluídas no período que tinham prazo e saíram até ele.
 */
export function desempenhoEquipe({ quadro, tarefas, nomes = {}, periodo, hoje }) {
  if (!quadro) return null;
  const p = periodoValido(periodo, hoje);
  const ts = tarefas.filter((t) => String(t.quadro_id) === String(quadro.id));
  const membros = [{ id: String(quadro.lider_id), papel: 'lider' }, ...(quadro.estagiarios || []).filter((id) => String(id) !== String(quadro.lider_id)).map((id) => ({ id: String(id), papel: 'estagiario' }))];
  const duracao = (t) => (new Date(t.concluido_em) - new Date(t.criado_em)) / DIA;
  const totalAbertas = ts.filter(aberta).length;
  const pessoas = membros.map(({ id, papel }) => {
    const minhas = ts.filter((t) => String(t.responsavel_id) === id);
    const ab = minhas.filter(aberta);
    const cp = minhas.filter((t) => t.status === 'concluido' && entre(diaSP(t.concluido_em), p));
    const cpPrazo = cp.filter((t) => t.prazo);
    return {
      id, papel, nome: papel === 'lider' ? quadro.lider_nome || nomes[id] || 'Líder' : nomes[id] || 'Integrante',
      a_fazer: ab.filter((t) => t.status === 'a_fazer').length,
      em_andamento: ab.filter((t) => t.status === 'em_andamento').length,
      em_revisao: ab.filter((t) => t.status === 'em_revisao').length,
      abertas: ab.length,
      atrasadas: ab.filter((t) => t.prazo && t.prazo < hoje).length,
      impedimentos: ab.filter((t) => t.bloqueada).length,
      concluidas: cp.length,
      noPrazo: pct(cpPrazo.filter((t) => diaSP(t.concluido_em) <= t.prazo).length, cpPrazo.length),
      basePrazo: cpPrazo.length,
      tempoMedio: arred(media(cp.map(duracao))),
      fatia: pct(ab.length, totalAbertas) ?? 0,
    };
  });
  return {
    quadro: { id: String(quadro.id), nome: quadro.nome, cor: quadro.cor, lider: { id: String(quadro.lider_id), nome: quadro.lider_nome } },
    pessoas,
    semResponsavel: ts.filter((t) => aberta(t) && t.responsavel_id == null).length,
  };
}
