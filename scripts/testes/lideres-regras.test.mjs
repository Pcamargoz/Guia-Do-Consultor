/* Processo de Líderes: regras de acesso (RBAC) e validações — funções puras de lib/lideres-regras.js, sem banco.
   O teste ponta a ponta da API (com banco, nos três papéis) é scripts/testes/lideres-api.test.mjs. */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  camposEditaveis, extrairMencoes, montarDashboard, permissoesDaTarefa, podeComentar, podeGerirQuadro, podeMover,
  podeOperarQuadro, podeVerQuadro, validarQuadro, validarTarefa,
} from '../../lib/lideres-regras.js';

const admin = { id: '1', papel: 'admin' };
const lider = { id: '10', papel: 'consultor' };
const outroConsultor = { id: '11', papel: 'consultor' };
const est = { id: '20', papel: 'estagiario' };
const estDeFora = { id: '21', papel: 'estagiario' };
const quadro = { id: '5', lider_id: '10', status: 'ativo' };
const arquivado = { ...quadro, status: 'arquivado' };
const integrantes = ['20'];
const tarefaDoEst = { id: '7', responsavel_id: '20', status: 'a_fazer' };
const tarefaDeOutro = { id: '8', responsavel_id: null, status: 'a_fazer' };

describe('quem vê o quadro', () => {
  it('admin e qualquer consultor veem; estagiário só se for integrante', () => {
    assert.equal(podeVerQuadro(admin, quadro, integrantes), true);
    assert.equal(podeVerQuadro(lider, quadro, integrantes), true);
    assert.equal(podeVerQuadro(outroConsultor, quadro, integrantes), true);
    assert.equal(podeVerQuadro(est, quadro, integrantes), true);
    assert.equal(podeVerQuadro(estDeFora, quadro, integrantes), false);
  });
  it('estagiário não vê quadro arquivado; papel desconhecido nunca vê', () => {
    assert.equal(podeVerQuadro(est, arquivado, integrantes), false);
    assert.equal(podeVerQuadro(admin, arquivado, integrantes), true);
    assert.equal(podeVerQuadro({ id: '20', papel: 'visitante' }, quadro, integrantes), false);
    assert.equal(podeVerQuadro(null, quadro, integrantes), false);
  });
});

describe('quem gere e quem opera', () => {
  it('só o admin cria e edita quadros', () => {
    assert.equal(podeGerirQuadro(admin), true);
    for (const u of [lider, outroConsultor, est]) assert.equal(podeGerirQuadro(u), false);
  });
  it('operações críticas: admin e o líder do quadro; nunca outro consultor ou estagiário', () => {
    assert.equal(podeOperarQuadro(admin, quadro), true);
    assert.equal(podeOperarQuadro(lider, quadro), true);
    assert.equal(podeOperarQuadro(outroConsultor, quadro), false);
    assert.equal(podeOperarQuadro(est, quadro), false);
  });
  it('estagiário com o mesmo id do líder não vira líder (papel conta)', () => {
    assert.equal(podeOperarQuadro({ id: '10', papel: 'estagiario' }, quadro), false);
  });
  it('quadro arquivado é só leitura até para o líder', () => {
    assert.equal(podeOperarQuadro(lider, arquivado), false);
    assert.equal(podeOperarQuadro(admin, arquivado), false);
    assert.equal(podeComentar(lider, arquivado, integrantes), false);
  });
});

describe('mover tarefas', () => {
  it('líder move para qualquer coluna, inclusive aprovar', () => {
    assert.equal(podeMover(lider, quadro, { ...tarefaDoEst, status: 'em_revisao' }, 'concluido', integrantes).ok, true);
    assert.equal(podeMover(lider, quadro, tarefaDeOutro, 'em_revisao', integrantes).ok, true);
  });
  it('estagiário: só a própria tarefa, até Em Revisão, nunca Concluído', () => {
    assert.equal(podeMover(est, quadro, tarefaDoEst, 'em_andamento', integrantes).ok, true);
    assert.equal(podeMover(est, quadro, { ...tarefaDoEst, status: 'em_andamento' }, 'em_revisao', integrantes).ok, true);
    assert.equal(podeMover(est, quadro, { ...tarefaDoEst, status: 'em_andamento' }, 'concluido', integrantes).ok, false);
    assert.equal(podeMover(est, quadro, { ...tarefaDoEst, status: 'em_revisao' }, 'em_andamento', integrantes).ok, false);
    assert.equal(podeMover(est, quadro, tarefaDeOutro, 'em_andamento', integrantes).ok, false);
  });
  it('outro consultor não move; coluna inválida é recusada', () => {
    assert.equal(podeMover(outroConsultor, quadro, tarefaDoEst, 'em_andamento', integrantes).ok, false);
    assert.equal(podeMover(lider, quadro, tarefaDoEst, 'lixeira', integrantes).ok, false);
  });
  it('estagiário que saiu do quadro perde a tarefa', () => {
    assert.equal(podeMover(est, quadro, tarefaDoEst, 'em_andamento', []).ok, false);
  });
});

describe('campos editáveis e permissões da tarefa', () => {
  it('líder edita tudo; estagiário responsável só sinaliza impedimento; os demais nada', () => {
    assert.ok(camposEditaveis(lider, quadro, tarefaDoEst, integrantes).includes('prazo'));
    assert.deepEqual(camposEditaveis(est, quadro, tarefaDoEst, integrantes), ['bloqueada', 'motivo_bloqueio']);
    assert.deepEqual(camposEditaveis(est, quadro, tarefaDeOutro, integrantes), []);
    assert.deepEqual(camposEditaveis(outroConsultor, quadro, tarefaDoEst, integrantes), []);
  });
  it('resumo para a tela', () => {
    const p = permissoesDaTarefa(est, quadro, tarefaDoEst, integrantes);
    assert.deepEqual(p.mover, ['em_andamento']);
    assert.equal(p.excluir, false);
    assert.equal(p.comentar, true);
    assert.equal(permissoesDaTarefa(outroConsultor, quadro, tarefaDoEst, integrantes).comentar, true);
  });
});

describe('validação', () => {
  it('quadro: nome, líder e estagiários', () => {
    assert.equal(validarQuadro({ nome: 'x', lider_id: '10' }).ok, false);
    assert.equal(validarQuadro({ nome: 'Implantação Alfa' }).ok, false);
    const ok = validarQuadro({ nome: '  Implantação Alfa ', lider_id: 10, estagiarios: ['20', '20'], cor: '#d5dd26', icone: 'foguete' });
    assert.equal(ok.ok, true);
    assert.deepEqual(ok.dados.estagiarios, ['20']);
    assert.equal(ok.dados.nome, 'Implantação Alfa');
    assert.equal(ok.dados.cor, '#D5DD26');
    assert.equal(validarQuadro({ nome: 'Ok ok', lider_id: '1', icone: '<svg>' }).ok, false);
    assert.equal(validarQuadro({ nome: 'Ok ok', lider_id: '1', cor: 'red' }).ok, false);
    assert.equal(validarQuadro({ status: 'apagado' }, { parcial: true }).ok, false);
  });
  it('tarefa: título, prioridade, prazo e impedimento com motivo', () => {
    assert.equal(validarTarefa({ titulo: 'a' }).ok, false);
    assert.equal(validarTarefa({ titulo: 'Cadastrar produtos', prioridade: 'maxima' }).ok, false);
    assert.equal(validarTarefa({ titulo: 'Cadastrar produtos', prazo: '31/12/2026' }).ok, false);
    assert.equal(validarTarefa({ bloqueada: true }, { parcial: true }).ok, false);
    assert.equal(validarTarefa({ bloqueada: true, motivo_bloqueio: 'Aguardando acesso do cliente' }, { parcial: true }).ok, true);
    assert.equal(validarTarefa({ bloqueada: false }, { parcial: true }).dados.motivo_bloqueio, '');
    assert.equal(validarTarefa({ titulo: 'Cadastrar produtos', prazo: '2026-12-31', responsavel_id: '' }).dados.responsavel_id, null);
  });
  it('menções com @login', () => {
    assert.deepEqual(extrairMencoes('Oi @pedro.santos e @Tauany, veja com @pedro.santos.'), ['pedro.santos', 'tauany']);
    assert.deepEqual(extrairMencoes('email@dominio.com não é menção'), []);
  });
});

describe('dashboard', () => {
  it('conta por coluna, atrasos, conclusão e distribuição por estagiário', () => {
    const tarefas = [
      { status: 'a_fazer', responsavel_id: '20', prazo: '2026-11-01' },
      { status: 'em_andamento', responsavel_id: '20', prazo: null },
      { status: 'em_revisao', responsavel_id: '21', prazo: '2026-12-01' },
      { status: 'concluido', responsavel_id: '20', prazo: '2026-10-01' },
      { status: 'a_fazer', responsavel_id: null, prazo: null, bloqueada: true },
    ];
    const d = montarDashboard(tarefas, [{ id: '20', nome: 'Ana' }, { id: '21', nome: 'Bia' }], '2026-11-19');
    assert.deepEqual([d.total, d.pendentes, d.emAndamento, d.emRevisao, d.concluidas, d.atrasadas, d.bloqueadas, d.pctConclusao, d.semResponsavel], [5, 2, 1, 1, 1, 1, 1, 20, 1]);
    assert.deepEqual(d.porEstagiario.find((p) => p.id === '20'), { id: '20', nome: 'Ana', total: 3, concluidas: 1, atrasadas: 1, abertas: 2 });
  });
  it('quadro vazio: 0%', () => assert.equal(montarDashboard([], []).pctConclusao, 0));
});
