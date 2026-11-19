/* Processo de Líderes — Visão Gerencial: indicadores, comparativo e alertas (lib/lideres-gerencial.js), sem banco.
   E as permissões granulares do estagiário (lib/lideres-regras.js). */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ALERTAS_PADRAO, calcularAlertas, desempenhoEquipe, montarGerencial, periodoValido, validarAlertas, vencidaEm } from '../../lib/lideres-gerencial.js';
import {
  PERMISSOES_PADRAO, TETO_PADRAO, camposEditaveis, permissoesEfetivas, podeComentar, podeCriarTarefa, podeGerirEquipe, podeMover,
  validarPermissoes, validarTeto,
} from '../../lib/lideres-regras.js';

const HOJE = '2026-11-19';
const ts = (dia, h = 15) => new Date(`${dia}T${String(h).padStart(2, '0')}:00:00Z`).toISOString();
const quadro = (id, extra = {}) => ({ id, nome: `Quadro ${id}`, cor: '#3478A7', status: 'ativo', lider_id: `L${id}`, lider_nome: `Líder ${id}`, estagiarios: ['e1', 'e2'], ...extra });
let seq = 0;
const ts0 = (dia, h = 15) => new Date(`${dia}T${String(h).padStart(2, '0')}:00:00Z`).toISOString();
const tarefa = (q, extra = {}) => ({ id: String(++seq), quadro_id: q, titulo: `T${seq}`, responsavel_id: 'e1', prioridade: 'media', status: 'a_fazer', prazo: null, criado_em: ts('2026-11-01'), concluido_em: null, ultima_atividade: ts(HOJE), bloqueada: false, ...extra });

describe('período', () => {
  it('padrão: últimos 30 dias até hoje, com período anterior do mesmo tamanho', () => {
    const p = periodoValido({}, HOJE);
    assert.deepEqual([p.de, p.ate, p.dias, p.anterior.de, p.anterior.ate], ['2026-10-21', HOJE, 30, '2026-09-21', '2026-10-20']);
  });
  it('não passa de hoje e inverte datas trocadas', () => {
    const p = periodoValido({ de: '2026-12-01', ate: '2026-12-31' }, HOJE);
    assert.equal(p.ate, HOJE);
    assert.ok(p.de <= p.ate);
  });
});

describe('alertas (regras explicáveis)', () => {
  it('vencidas: atenção com 1, crítico ao atingir o limite', () => {
    const q = quadro('1');
    const uma = calcularAlertas({ quadros: [q], tarefas: [tarefa('1', { prazo: '2026-11-18' })], config: ALERTAS_PADRAO, hoje: HOJE });
    const a = uma.find((x) => x.tipo === 'vencidas');
    assert.equal(a.nivel, 'atencao');
    for (const k of ['titulo', 'porque', 'impacto', 'acao']) assert.ok(a[k].length > 10, `alerta explica: ${k}`);
    assert.deepEqual(a.tarefas.length, 1);
    const tres = calcularAlertas({ quadros: [q], tarefas: [1, 2, 3].map(() => tarefa('1', { prazo: '2026-11-18' })), config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(tres.find((x) => x.tipo === 'vencidas').nivel, 'critico');
  });
  it('alta prioridade vencida há muitos dias vira crítico mesmo sozinha', () => {
    const r = calcularAlertas({ quadros: [quadro('1')], tarefas: [tarefa('1', { prazo: '2026-11-10', prioridade: 'alta' })], config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(r[0].nivel, 'critico');
  });
  it('concluída não gera alerta de vencida', () => {
    const r = calcularAlertas({ quadros: [quadro('1')], tarefas: [tarefa('1', { prazo: '2026-11-10', status: 'concluido', concluido_em: ts('2026-11-12') })], config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(r.length, 0);
  });
  it('alta prioridade vencendo nos próximos dias; urgente vencendo hoje é crítico', () => {
    const r = calcularAlertas({ quadros: [quadro('1')], tarefas: [tarefa('1', { prazo: '2026-11-21', prioridade: 'alta' })], config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(r.find((x) => x.tipo === 'alta_vencendo').nivel, 'atencao');
    const r2 = calcularAlertas({ quadros: [quadro('1')], tarefas: [tarefa('1', { prazo: HOJE, prioridade: 'urgente' })], config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(r2.find((x) => x.tipo === 'alta_vencendo').nivel, 'critico');
    const longe = calcularAlertas({ quadros: [quadro('1')], tarefas: [tarefa('1', { prazo: '2026-11-30', prioridade: 'alta' })], config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(longe.length, 0);
  });
  it('acúmulo respeita o limite por estagiário e o limite é configurável', () => {
    const muitas = Array.from({ length: 13 }, () => tarefa('1'));
    assert.ok(calcularAlertas({ quadros: [quadro('1')], tarefas: muitas, config: ALERTAS_PADRAO, hoje: HOJE }).some((x) => x.tipo === 'acumulo'));
    assert.ok(!calcularAlertas({ quadros: [quadro('1')], tarefas: muitas, config: { ...ALERTAS_PADRAO, cargaPorEstagiario: 10 }, hoje: HOJE }).some((x) => x.tipo === 'acumulo'));
  });
  it('tarefa parada: em andamento sem atividade há N dias', () => {
    const r = calcularAlertas({ quadros: [quadro('1')], tarefas: [tarefa('1', { status: 'em_andamento', ultima_atividade: ts('2026-11-10') }), tarefa('1', { status: 'em_andamento' })], config: ALERTAS_PADRAO, hoje: HOJE });
    const a = r.find((x) => x.tipo === 'parada');
    assert.equal(a.tarefas.length, 1);
    assert.equal(a.nivel, 'informativo'); // 9 dias < 2 × 5 e menos de 3 paradas
  });
  it('concentração desproporcional exige volume mínimo e dois estagiários', () => {
    const lista = [...Array.from({ length: 4 }, () => tarefa('1', { responsavel_id: 'e1' })), tarefa('1', { responsavel_id: 'e2' })];
    const r = calcularAlertas({ quadros: [quadro('1')], tarefas: lista, nomes: { e1: 'Ana' }, config: ALERTAS_PADRAO, hoje: HOJE });
    const a = r.find((x) => x.tipo === 'concentracao');
    assert.equal(a.pessoa.nome, 'Ana');
    assert.equal(a.metrica, 80);
    const umEst = calcularAlertas({ quadros: [quadro('1', { estagiarios: ['e1'] })], tarefas: lista, config: ALERTAS_PADRAO, hoje: HOJE });
    assert.ok(!umEst.some((x) => x.tipo === 'concentracao'));
  });
  it('atrasos crescendo há duas semanas seguidas', () => {
    const t = [
      tarefa('1', { prazo: '2026-11-01', criado_em: ts('2026-10-20') }), // vencida desde 02/11
      tarefa('1', { prazo: '2026-11-08', criado_em: ts('2026-10-20') }), // vencida desde 09/11
      tarefa('1', { prazo: '2026-11-15', criado_em: ts('2026-10-20') }),
      tarefa('1', { prazo: '2026-11-16', criado_em: ts('2026-10-20') }),
    ];
    assert.equal(vencidaEm(t[0], '2026-11-05'), true);
    assert.equal(vencidaEm(t[2], '2026-11-12'), false);
    const r = calcularAlertas({ quadros: [quadro('1')], tarefas: t, config: ALERTAS_PADRAO, hoje: HOJE });
    const a = r.find((x) => x.tipo === 'atraso_crescente');
    assert.deepEqual(a.serie, [1, 2, 4]);
  });
  it('ordena crítico antes de atenção antes de informativo; quadro arquivado não alerta', () => {
    const r = calcularAlertas({ quadros: [quadro('1'), quadro('2'), quadro('3', { status: 'arquivado' })], tarefas: [
      tarefa('1', { status: 'em_andamento', ultima_atividade: ts('2026-11-10') }),
      ...[1, 2, 3].map(() => tarefa('2', { prazo: '2026-11-18' })),
      tarefa('3', { prazo: '2026-11-01' }),
    ], config: ALERTAS_PADRAO, hoje: HOJE });
    assert.equal(r[0].nivel, 'critico');
    assert.equal(r.at(-1).nivel, 'informativo');
    assert.ok(!r.some((x) => x.quadro.id === '3'));
  });
  it('limites validados', () => {
    assert.equal(validarAlertas({ diasParada: 0 }).ok, false);
    assert.equal(validarAlertas({ desconhecido: 2 }).ok, false);
    assert.equal(validarAlertas({ diasParada: 7 }).dados.diasParada, 7);
    assert.equal(validarAlertas({ diasParada: 7 }).dados.atrasoCritico, ALERTAS_PADRAO.atrasoCritico);
  });
});

describe('indicadores', () => {
  const qs = [quadro('1'), quadro('2', { estagiarios: ['e3'] })];
  const base = [
    tarefa('1', { status: 'concluido', criado_em: ts('2026-11-02'), concluido_em: ts('2026-11-06'), prazo: '2026-11-10', prioridade: 'alta' }),
    tarefa('1', { status: 'concluido', criado_em: ts('2026-11-02'), concluido_em: ts('2026-11-12'), prazo: '2026-11-10' }),
    tarefa('1', { status: 'em_andamento', prazo: '2026-11-15', prioridade: 'urgente' }),
    tarefa('1', { status: 'a_fazer', prazo: '2026-11-20' }),
    tarefa('2', { responsavel_id: 'e3', status: 'em_revisao', criado_em: ts('2026-10-01') }),
    tarefa('2', { responsavel_id: 'e3', status: 'concluido', criado_em: ts('2026-09-25'), concluido_em: ts('2026-10-05') }),
  ];
  const g = montarGerencial({ quadros: qs, tarefas: base, nomes: { e1: 'Ana', e3: 'Caio' }, config: ALERTAS_PADRAO, periodo: {}, hoje: HOJE });
  it('resumo com dados reais do período', () => {
    const r = g.resumo;
    assert.deepEqual(r.abertas, { total: 3, a_fazer: 1, em_andamento: 1, em_revisao: 1 });
    assert.deepEqual(r.concluidas, { periodo: 2, anterior: 1 });
    assert.equal(r.atrasadas, 1);
    assert.equal(r.proximas, 1);
    assert.equal(r.noPrazo.pct, 50); // uma no prazo, outra depois
    assert.equal(r.tempoMedio.periodo, 7); // 4 e 10 dias
    assert.equal(r.altaPrioridade.abertas, 1);
  });
  it('comparativo justo: carga e ritmo ponderados por prioridade e por estagiário', () => {
    const q1 = g.quadros.find((q) => q.id === '1');
    assert.equal(q1.cargaPonderada, 4 + 2); // urgente + média abertas
    assert.equal(q1.cargaPorEstagiario, 3);
    assert.equal(q1.concluidas, 2);
    assert.equal(q1.nivel, 'critico'); // urgente vencida há 4 dias (limite: 3)
    assert.equal(g.destaques.maisPendencias.id, '1');
    assert.equal(g.destaques.melhorEvolucao, null, 'sem volume mínimo, não elege "melhor evolução"');
  });
  it('série por semana no período de 30 dias e distribuição por pessoa', () => {
    assert.equal(g.serie.length, 5);
    assert.equal(g.serie.reduce((s, b) => s + b.concluidas, 0), 2);
    const ana = g.pessoas.find((p) => p.id === 'e1');
    assert.equal(ana.abertas, 2);
    assert.equal(ana.participacao, 75); // 6 de 8 de peso aberto
  });
});

describe('desempenho individual da equipe do quadro', () => {
  it('líder e cada estagiário (inclusive sem tarefas), só com dados reais do quadro', () => {
    const q = quadro('9', { estagiarios: ['e1', 'e2', 'e3'] });
    const ts = [
      tarefa('9', { responsavel_id: 'e1', status: 'em_andamento', prazo: '2026-11-10', bloqueada: true }),
      tarefa('9', { responsavel_id: 'e1', status: 'concluido', criado_em: ts0('2026-11-01'), concluido_em: ts0('2026-11-05'), prazo: '2026-11-08' }),
      tarefa('9', { responsavel_id: 'e1', status: 'concluido', criado_em: ts0('2026-11-01'), concluido_em: ts0('2026-11-09'), prazo: '2026-11-08' }),
      tarefa('9', { responsavel_id: 'e2', status: 'em_revisao' }),
      tarefa('9', { responsavel_id: null, status: 'a_fazer' }),
      tarefa('99', { responsavel_id: 'e1', status: 'a_fazer' }), // outro quadro: não entra
    ];
    const e = desempenhoEquipe({ quadro: q, tarefas: ts, nomes: { e1: 'Ana', e2: 'Bia', e3: 'Caio' }, periodo: {}, hoje: HOJE });
    assert.deepEqual(e.pessoas.map((p) => p.papel), ['lider', 'estagiario', 'estagiario', 'estagiario']);
    const ana = e.pessoas.find((p) => p.id === 'e1');
    assert.deepEqual([ana.em_andamento, ana.atrasadas, ana.impedimentos, ana.concluidas, ana.noPrazo, ana.tempoMedio, ana.a_fazer], [1, 1, 1, 2, 50, 6, 0]);
    const caio = e.pessoas.find((p) => p.id === 'e3');
    assert.deepEqual([caio.abertas, caio.concluidas, caio.noPrazo], [0, 0, null], 'sem tarefas: zerado, sem número inventado');
    assert.equal(e.semResponsavel, 1);
    assert.equal(desempenhoEquipe({ quadro: null, tarefas: ts }), null);
  });
});

describe('permissões granulares do estagiário', () => {
  const est = { id: '20', papel: 'estagiario' };
  const q = { id: '5', lider_id: '10', status: 'ativo' };
  const minha = { id: '7', responsavel_id: '20', criado_por: '10', status: 'em_andamento' };
  it('padrão mantém o comportamento anterior', () => {
    assert.deepEqual(permissoesEfetivas({}), { ...PERMISSOES_PADRAO });
    assert.equal(podeMover(est, q, minha, 'em_revisao', ['20']).ok, true);
    assert.equal(podeMover(est, q, minha, 'concluido', ['20']).ok, false);
  });
  it('teto do administrador limita o que vale, mesmo se salvo', () => {
    assert.equal(permissoesEfetivas({ concluir: true }, TETO_PADRAO).concluir, false);
    assert.equal(permissoesEfetivas({ concluir: true }, { ...TETO_PADRAO, concluir: true }).concluir, true);
    assert.equal(permissoesEfetivas({}, { ...TETO_PADRAO, comentar: false }).comentar, false);
  });
  it('líder não concede acima do teto (403) e valida formato (400)', () => {
    assert.equal(validarPermissoes({ concluir: true }, TETO_PADRAO).status, 403);
    assert.equal(validarPermissoes({ voar: true }).status, 400);
    assert.equal(validarPermissoes({ criar: 'sim' }).status, 400);
    assert.equal(validarPermissoes({ criar: true, mover: false }).ok, true);
    assert.equal(validarTeto({ concluir: true }).dados.concluir, true);
  });
  it('cada permissão abre exatamente o que diz', () => {
    const p = (x) => permissoesEfetivas(x, { ...TETO_PADRAO, concluir: true });
    assert.equal(podeMover(est, q, minha, 'em_revisao', ['20'], p({ mover: false })).ok, false);
    assert.equal(podeMover(est, q, minha, 'concluido', ['20'], p({ concluir: true })).ok, true);
    assert.equal(podeComentar(est, q, ['20'], p({ comentar: false })), false);
    assert.equal(podeCriarTarefa(est, q, ['20'], p({ criar: true })), true);
    assert.equal(podeCriarTarefa(est, q, ['20'], p({})), false);
    assert.deepEqual(camposEditaveis(est, q, minha, ['20'], p({ editar: true, prioridade: true, atribuir: true })).sort(), ['bloqueada', 'descricao', 'motivo_bloqueio', 'prazo', 'prioridade', 'responsavel_id', 'titulo'].sort());
    assert.deepEqual(camposEditaveis(est, q, { ...minha, responsavel_id: '21' }, ['20'], p({ editar: true })), [], 'tarefa de outro (que ele não criou) continua fechada');
  });
  it('gerenciar equipe: líder do quadro e admin; nunca outro consultor ou estagiário', () => {
    assert.equal(podeGerirEquipe({ id: '10', papel: 'consultor' }, q), true);
    assert.equal(podeGerirEquipe({ id: '1', papel: 'admin' }, q), true);
    assert.equal(podeGerirEquipe({ id: '11', papel: 'consultor' }, q), false);
    assert.equal(podeGerirEquipe(est, q), false);
    assert.equal(podeGerirEquipe({ id: '10', papel: 'consultor' }, { ...q, status: 'arquivado' }), false);
  });
});
