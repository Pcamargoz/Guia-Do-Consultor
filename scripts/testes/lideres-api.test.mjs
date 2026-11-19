/* Processo de Líderes — teste ponta a ponta da API /api/lideres com banco, nos três papéis.
   Precisa do app rodando (docker compose -p faktory-manual up -d) e do administrador do .env:
     node --env-file=.env --test scripts/testes/lideres-api.test.mjs
   Sem ADMIN_USERNAME/ADMIN_PASSWORD ou sem servidor no ar, o teste é pulado (o `npm run testar` continua offline).
   Cria usuários descartáveis (prefixo lt-<sufixo>, senhas aleatórias só em memória), um quadro e tarefas; no fim arquiva
   e exclui o quadro e exclui os usuários. Usa um IP inventado (x-real-ip) para não esbarrar no limite do IP local. */
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { after, before, describe, it } from 'node:test';

const BASE = process.env.TESTE_URL || 'http://localhost:8081';
const IP = `198.51.100.${Math.floor(Math.random() * 250) + 1}`;
const SUF = randomBytes(3).toString('hex');

async function servidorNoAr() {
  try { return (await fetch(`${BASE}/login`, { redirect: 'manual', signal: AbortSignal.timeout(3000) })).status < 500; } catch { return false; }
}
const pular = !process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD || !(await servidorNoAr())
  ? 'sem servidor local ou sem ADMIN_USERNAME/ADMIN_PASSWORD (rode com node --env-file=.env)' : false;

function cliente(cookie = '') {
  const pedir = async (metodo, caminho, corpo) => {
    const r = await fetch(`${BASE}/api/${caminho}`, {
      method: metodo,
      headers: { 'x-real-ip': IP, origin: BASE, ...(cookie ? { cookie } : {}), ...(corpo !== undefined ? { 'content-type': 'application/json' } : {}) },
      body: corpo === undefined ? undefined : JSON.stringify(corpo),
    });
    let dados = null;
    try { dados = await r.json(); } catch { dados = null; }
    return { status: r.status, dados };
  };
  return { get: (c) => pedir('GET', c), post: (c, b = {}) => pedir('POST', c, b), patch: (c, b) => pedir('PATCH', c, b), del: (c) => pedir('DELETE', c) };
}
async function entrar(login, senha) {
  const r = await fetch(`${BASE}/api/auth/login`, { method: 'POST', headers: { 'x-real-ip': IP, origin: BASE, 'content-type': 'application/json' }, body: JSON.stringify({ login, senha }) });
  assert.equal(r.status, 200, `login de ${login}`);
  const cookie = (r.headers.get('set-cookie') || '').split(';')[0];
  return cliente(cookie);
}

describe('API /api/lideres (ponta a ponta, três papéis)', { skip: pular }, () => {
  const u = {};
  let admin, lider, outro, est, fora, anonimo;
  let quadroId, tarefaId, tarefaOutraId;

  before(async () => {
    admin = await entrar(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    const criar = async (chave, papel, nome) => {
      const senha = randomBytes(12).toString('base64url');
      const r = await admin.post('usuarios', { login: `lt-${chave}-${SUF}`, nome, papel, senha });
      assert.equal(r.status, 201, `criar ${chave}: ${r.dados?.erro}`);
      u[chave] = { ...r.dados.usuario, senha };
    };
    await criar('lider', 'consultor', `Líder Teste ${SUF}`);
    await criar('outro', 'consultor', `Consultor Teste ${SUF}`);
    await criar('est', 'estagiario', `Estagiária Teste ${SUF}`);
    await criar('fora', 'estagiario', `Estagiário Fora ${SUF}`);
    lider = await entrar(u.lider.login, u.lider.senha);
    outro = await entrar(u.outro.login, u.outro.senha);
    est = await entrar(u.est.login, u.est.senha);
    fora = await entrar(u.fora.login, u.fora.senha);
    anonimo = cliente();
  });

  after(async () => {
    if (!admin) return;
    if (quadroId) {
      await admin.patch(`lideres?quadro=${quadroId}`, { status: 'arquivado' });
      await admin.del(`lideres?quadro=${quadroId}`);
    }
    for (const x of Object.values(u)) await admin.del(`usuarios?id=${x.id}`);
  });

  it('sem sessão: 401', async () => {
    assert.equal((await anonimo.get('lideres')).status, 401);
  });

  it('só o admin cria quadro; validação no servidor', async () => {
    assert.equal((await lider.post('lideres?acao=quadro', { nome: 'Quadro do líder', lider_id: u.lider.id })).status, 403);
    assert.equal((await est.post('lideres?acao=quadro', { nome: 'Quadro', lider_id: u.lider.id })).status, 403);
    assert.equal((await admin.post('lideres?acao=quadro', { nome: 'x', lider_id: u.lider.id })).status, 400);
    assert.equal((await admin.post('lideres?acao=quadro', { nome: 'Líder estagiário', lider_id: u.est.id })).status, 400, 'líder precisa ser consultor');
    assert.equal((await admin.post('lideres?acao=quadro', { nome: 'Integrante consultor', lider_id: u.lider.id, estagiarios: [u.outro.id] })).status, 400, 'integrante precisa ser estagiário');
    const us = await admin.get('lideres?acao=usuarios');
    assert.equal(us.status, 200);
    assert.ok(us.dados.consultores.some((c) => c.papel === 'admin'), 'administrador aparece como opção de líder');
    assert.equal((await lider.get('lideres?acao=usuarios')).status, 403);
    const r = await admin.post('lideres?acao=quadro', { nome: `Implantação ${SUF}`, descricao: 'Teste automatizado', lider_id: u.lider.id, estagiarios: [u.est.id], cor: '#3478A7', icone: 'foguete' });
    assert.equal(r.status, 201, r.dados?.erro);
    quadroId = r.dados.quadro.id;
  });

  it('visibilidade: consultores veem; estagiário de fora recebe 404 na lista e por URL direta', async () => {
    for (const c of [admin, lider, outro, est]) assert.ok((await c.get('lideres')).dados.quadros.some((q) => q.id === quadroId));
    assert.equal((await fora.get('lideres')).dados.quadros.some((q) => q.id === quadroId), false);
    assert.equal((await fora.get(`lideres?quadro=${quadroId}`)).status, 404);
    assert.equal((await fora.get(`lideres?acao=pulso&quadro=${quadroId}`)).status, 404);
    const q = await est.get(`lideres?quadro=${quadroId}`);
    assert.equal(q.status, 200);
    assert.deepEqual(q.dados.permissoes, { gerir: false, operar: false, comentar: true, lider: false });
    assert.equal((await lider.get(`lideres?quadro=${quadroId}`)).dados.permissoes.operar, true);
    assert.equal((await outro.get(`lideres?quadro=${quadroId}`)).dados.permissoes.operar, false);
  });

  it('só o líder (ou admin) cria tarefa; responsável precisa ser integrante', async () => {
    const nova = { titulo: 'Cadastrar produtos', prioridade: 'alta', responsavel_id: u.est.id, prazo: '2020-01-10', checklist: ['Planilha', 'Importar'] };
    assert.equal((await outro.post(`lideres?acao=tarefa&quadro=${quadroId}`, nova)).status, 403);
    assert.equal((await est.post(`lideres?acao=tarefa&quadro=${quadroId}`, nova)).status, 403);
    assert.equal((await fora.post(`lideres?acao=tarefa&quadro=${quadroId}`, nova)).status, 404);
    assert.equal((await lider.post(`lideres?acao=tarefa&quadro=${quadroId}`, { ...nova, responsavel_id: u.fora.id })).status, 400);
    const r = await lider.post(`lideres?acao=tarefa&quadro=${quadroId}`, nova);
    assert.equal(r.status, 201, r.dados?.erro);
    tarefaId = r.dados.tarefa.id;
    assert.equal(r.dados.tarefa.atrasada, true);
    const r2 = await admin.post(`lideres?acao=tarefa&quadro=${quadroId}`, { titulo: 'Tarefa do líder' });
    assert.equal(r2.status, 201);
    tarefaOutraId = r2.dados.tarefa.id;
  });

  it('notificações: atribuição chega ao estagiário com link (quadro e tarefa)', async () => {
    const n = await est.get('lideres?acao=notificacoes');
    assert.equal(n.status, 200);
    const atrib = n.dados.itens.find((i) => i.tipo === 'atribuicao' && i.tarefaId === tarefaId);
    assert.ok(atrib, 'notificação de atribuição');
    assert.equal(atrib.quadroId, quadroId);
    assert.ok(n.dados.itens.some((i) => i.tipo === 'entrada'), 'entrada no quadro');
    assert.ok(n.dados.itens.some((i) => i.tipo === 'atraso' && i.tarefaId === tarefaId), 'aviso de atraso gerado');
    assert.ok(n.dados.naoLidas >= 3);
    const l = await est.post('lideres?acao=lidas', { ids: [atrib.id] });
    assert.equal(l.dados.naoLidas, n.dados.naoLidas - 1);
  });

  it('estagiário: atualiza só a própria tarefa, sem campos críticos', async () => {
    assert.equal((await est.patch(`lideres?tarefa=${tarefaId}`, { prazo: '2030-01-01' })).status, 403);
    assert.equal((await est.patch(`lideres?tarefa=${tarefaId}`, { prioridade: 'baixa' })).status, 403);
    assert.equal((await est.del(`lideres?tarefa=${tarefaId}`)).status, 403);
    assert.equal((await est.patch(`lideres?tarefa=${tarefaId}`, { bloqueada: true, motivo_bloqueio: 'Aguardando acesso do cliente' })).status, 200);
    assert.equal((await est.patch(`lideres?tarefa=${tarefaOutraId}`, { bloqueada: true, motivo_bloqueio: 'x' })).status, 403);
    assert.equal((await est.post(`lideres?acao=mover&tarefa=${tarefaOutraId}`, { status: 'em_andamento' })).status, 403);
    const t = await est.get(`lideres?tarefa=${tarefaId}`);
    assert.equal(t.status, 200);
    const item = t.dados.checklist[0];
    assert.equal((await est.patch(`lideres?item=${item.id}`, { feito: true })).dados.item.feito, true);
    assert.equal((await est.patch(`lideres?item=${item.id}`, { texto: 'Mudar texto' })).status, 403);
    assert.equal((await outro.patch(`lideres?item=${item.id}`, { feito: false })).status, 403);
    assert.equal((await fora.get(`lideres?tarefa=${tarefaId}`)).status, 404);
  });

  it('fluxo: andamento → revisão (avisa o líder) → ajuste → revisão → aprovação; estagiário nunca conclui', async () => {
    assert.equal((await est.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'concluido' })).status, 403);
    assert.equal((await est.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'em_andamento' })).status, 200);
    assert.equal((await est.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'em_revisao' })).status, 200);
    assert.equal((await est.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'em_andamento' })).status, 403, 'em revisão aguarda o líder');
    assert.ok((await lider.get('lideres?acao=notificacoes')).dados.itens.some((i) => i.tipo === 'revisao' && i.tarefaId === tarefaId));
    assert.equal((await outro.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'concluido' })).status, 403, 'consultor que não é líder não aprova');
    assert.equal((await lider.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'em_andamento', comentario: 'Faltou a planilha final' })).status, 200);
    assert.ok((await est.get('lideres?acao=notificacoes')).dados.itens.some((i) => i.tipo === 'ajuste' && i.tarefaId === tarefaId));
    await est.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'em_revisao' });
    const ok = await lider.post(`lideres?acao=mover&tarefa=${tarefaId}`, { status: 'concluido', posicao: 0 });
    assert.equal(ok.status, 200);
    assert.equal(ok.dados.tarefa.status, 'concluido');
    assert.ok((await est.get('lideres?acao=notificacoes')).dados.itens.some((i) => i.tipo === 'aprovada' && i.tarefaId === tarefaId));
    const hist = (await lider.get(`lideres?tarefa=${tarefaId}`)).dados.historico.map((h) => h.acao);
    for (const a of ['criada', 'atribuida', 'bloqueada', 'checklist', 'movida', 'ajuste', 'aprovada']) assert.ok(hist.includes(a), `histórico: ${a}`);
  });

  it('comentário com menção avisa quem vê o quadro (e ignora estagiário de fora)', async () => {
    const r = await outro.post(`lideres?acao=comentario&tarefa=${tarefaId}`, { texto: `Bom trabalho @${u.est.login} — @${u.fora.login} não deveria saber` });
    assert.equal(r.status, 201);
    assert.ok((await est.get('lideres?acao=notificacoes')).dados.itens.some((i) => i.tipo === 'mencao'));
    assert.equal((await fora.get('lideres?acao=notificacoes')).dados.itens.some((i) => i.tipo === 'mencao'), false);
    assert.equal((await fora.post(`lideres?acao=comentario&tarefa=${tarefaId}`, { texto: 'oi' })).status, 404);
  });

  it('dashboard e polling por versão', async () => {
    const q = await lider.get(`lideres?quadro=${quadroId}`);
    const d = q.dados.dashboard;
    assert.equal(d.total, 2);
    assert.equal(d.concluidas, 1);
    assert.equal(d.pctConclusao, 50);
    assert.equal(d.porEstagiario.find((p) => p.id === u.est.id).concluidas, 1);
    const p1 = (await est.get(`lideres?acao=pulso&quadro=${quadroId}`)).dados.versao;
    await lider.patch(`lideres?tarefa=${tarefaOutraId}`, { prioridade: 'urgente' });
    const p2 = (await est.get(`lideres?acao=pulso&quadro=${quadroId}`)).dados.versao;
    assert.ok(p2 > p1, 'versão do quadro sobe a cada mudança');
  });

  it('saída do quadro: estagiário perde o acesso e é avisado; arquivado vira só leitura', async () => {
    assert.equal((await lider.patch(`lideres?quadro=${quadroId}`, { estagiarios: [] })).status, 403);
    assert.equal((await admin.patch(`lideres?quadro=${quadroId}`, { estagiarios: [u.fora.id] })).status, 200);
    assert.equal((await est.get(`lideres?quadro=${quadroId}`)).status, 404);
    assert.ok((await est.get('lideres?acao=notificacoes')).dados.itens.some((i) => i.tipo === 'saida'));
    assert.equal((await fora.get(`lideres?quadro=${quadroId}`)).status, 200);
    assert.equal((await admin.del(`lideres?quadro=${quadroId}`)).status, 409, 'excluir exige arquivar antes');
    assert.equal((await admin.patch(`lideres?quadro=${quadroId}`, { status: 'arquivado' })).status, 200);
    assert.equal((await lider.post(`lideres?acao=tarefa&quadro=${quadroId}`, { titulo: 'Depois de arquivar' })).status, 409);
    assert.equal((await fora.get(`lideres?quadro=${quadroId}`)).status, 404, 'estagiário não vê quadro arquivado');
    assert.equal((await outro.get(`lideres?quadro=${quadroId}`)).status, 200);
  });
});
