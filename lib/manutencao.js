/* Limpeza das movimentações do sistema (somente administradores).
   Remove o que foi gerado pelo uso — Modo Estudo, dúvidas, histórico e marcações de status —
   e preserva os usuários e o conteúdo dos módulos, pacotes e processos. */
import { consulta, transacao } from './db.js';

const LISTAS = ['fluxo', 'boasPraticas', 'checklist'];

/* Ordem importa: as dúvidas saem antes das marcações de onde vieram. */
export const ALVOS = [
  { chave: 'duvidas', tabela: 'estudo_duvidas', rotulo: 'Dúvidas enviadas e respondidas' },
  { chave: 'marcacoes', tabela: 'estudo_marcacoes', rotulo: 'Grifos, notas e comentários da apostila' },
  { chave: 'itens', tabela: 'estudo_itens', rotulo: 'Itens de checklist do Modo Estudo' },
  { chave: 'progresso', tabela: 'estudo_progresso', rotulo: 'Progresso de leitura da apostila' },
  { chave: 'historico_modulos', tabela: 'modulos_historico', rotulo: 'Histórico de alterações dos módulos' },
  { chave: 'historico_pacotes', tabela: 'pacotes_historico', rotulo: 'Histórico de alterações dos pacotes' },
  { chave: 'historico_processos', tabela: 'processos_historico', rotulo: 'Histórico de alterações dos processos' },
];

const SELECT_CONTAGENS = `SELECT ${ALVOS.map((a) => `(SELECT count(*)::int FROM ${a.tabela}) AS ${a.chave}`).join(',\n  ')},
  (SELECT count(*)::int FROM modulos WHERE status IS NOT NULL) AS status_modulos,
  (SELECT count(*)::int FROM processos WHERE status IS NOT NULL) AS status_processos`;

/** Quantas movimentações existem hoje, por tipo (para mostrar antes de limpar). */
export async function resumoMovimentacoes() {
  const { rows } = await consulta(SELECT_CONTAGENS);
  const contagens = rows[0];
  const itens = ALVOS.map((a) => ({ chave: a.chave, rotulo: a.rotulo, total: contagens[a.chave] }));
  itens.push({ chave: 'status_modulos', rotulo: 'Módulos marcados como Rever/Aprovado/Reprovado', total: contagens.status_modulos });
  itens.push({ chave: 'status_processos', rotulo: 'Processos marcados como Rever/Aprovado/Reprovado', total: contagens.status_processos });
  return { itens, total: itens.reduce((soma, i) => soma + i.total, 0) };
}

/** Limpa o status de aprovação dos itens das listas, mantendo o texto de cada item. */
async function limparStatusDosItens(client) {
  const { rows } = await client.query('SELECT id, dados FROM modulos FOR UPDATE');
  let itens = 0;
  for (const linha of rows) {
    const dados = structuredClone(linha.dados);
    let mudou = false;
    for (const lista of LISTAS) {
      for (const item of dados[lista] || []) {
        if (item.status == null && !item.statusEm && !item.statusPor) continue;
        Object.assign(item, { status: null, statusEm: null, statusPor: '' });
        mudou = true;
        itens += 1;
      }
    }
    if (mudou) await client.query('UPDATE modulos SET dados = $2, atualizado_em = now() WHERE id = $1', [linha.id, dados]);
  }
  return itens;
}

/** Apaga todas as movimentações em uma única transação e devolve o que foi removido. */
export async function limparMovimentacoes() {
  return transacao(async (client) => {
    const removidos = [];
    for (const alvo of ALVOS) {
      const { rowCount } = await client.query(`DELETE FROM ${alvo.tabela}`);
      removidos.push({ chave: alvo.chave, rotulo: alvo.rotulo, total: rowCount });
    }
    const { rowCount: statusModulos } = await client.query(
      `UPDATE modulos SET status = NULL, status_em = NULL, status_por = '', atualizado_em = now()
       WHERE status IS NOT NULL OR status_em IS NOT NULL OR status_por <> ''`,
    );
    removidos.push({ chave: 'status_modulos', rotulo: 'Módulos marcados como Rever/Aprovado/Reprovado', total: statusModulos });
    const { rowCount: statusProcessos } = await client.query(
      `UPDATE processos SET status = NULL, status_em = NULL, status_por = '', atualizado_em = now()
       WHERE status IS NOT NULL OR status_em IS NOT NULL OR status_por <> ''`,
    );
    removidos.push({ chave: 'status_processos', rotulo: 'Processos marcados como Rever/Aprovado/Reprovado', total: statusProcessos });
    const statusItens = await limparStatusDosItens(client);
    removidos.push({ chave: 'status_itens', rotulo: 'Itens de módulo com status de revisão', total: statusItens });
    return { itens: removidos, total: removidos.reduce((soma, i) => soma + i.total, 0) };
  });
}
