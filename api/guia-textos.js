import { rota, json, lerJson, exigirUsuario, ErroHttp } from '../lib/http.js';
import { consulta, transacao } from '../lib/db.js';

const ID = 'principal';
const CHAVE = /^(dashboard|parte1|metodo|modulos|processos|diagnostico|conclusao)\/[a-z0-9_-]{1,80}$/;
const MAX_CAMPOS = 300;
const MAX_TEXTO = 5000;

export const GET = rota(async (request) => {
  await exigirUsuario(request, 'ver');
  const { rows } = await consulta('SELECT dados, rev, atualizado_em, atualizado_por FROM guia_textos WHERE id = $1', [ID]);
  return json(200, rows[0] || { dados: {}, rev: 1, atualizado_em: null, atualizado_por: '' });
});

export const PUT = rota(async (request) => {
  const usuario = await exigirUsuario(request, 'editar');
  const { rev, alteracoes } = await lerJson(request);
  if (!Number.isInteger(rev) || !alteracoes || typeof alteracoes !== 'object' || Array.isArray(alteracoes)) {
    throw new ErroHttp(400, 'Alterações inválidas.');
  }
  const entradas = Object.entries(alteracoes);
  if (!entradas.length || entradas.length > MAX_CAMPOS || entradas.some(([chave, valor]) => !CHAVE.test(chave) || (valor !== null && (typeof valor !== 'string' || !valor.trim() || valor.trim().length > MAX_TEXTO)))) {
    throw new ErroHttp(400, 'Texto inválido ou grande demais.');
  }
  const atualizado = await transacao(async (client) => {
    const { rows } = await client.query('SELECT dados, rev FROM guia_textos WHERE id = $1 FOR UPDATE', [ID]);
    const atual = rows[0];
    if (!atual) throw new ErroHttp(500, 'Armazenamento de textos indisponível.');
    if (rev !== atual.rev) throw new ErroHttp(409, 'Outra pessoa alterou o Guia. Reabra o editor para ver a versão mais recente.');
    const dados = { ...atual.dados };
    for (const [chave, valor] of entradas) {
      if (valor === null) delete dados[chave];
      else dados[chave] = valor.trim();
    }
    if (Object.keys(dados).length > MAX_CAMPOS) throw new ErroHttp(400, 'O limite de textos editáveis foi atingido.');
    const { rows: salvas } = await client.query(
      'UPDATE guia_textos SET dados = $2, rev = rev + 1, atualizado_em = now(), atualizado_por = $3 WHERE id = $1 RETURNING dados, rev, atualizado_em, atualizado_por',
      [ID, dados, (usuario.nome || usuario.login).slice(0, 80)],
    );
    return salvas[0];
  });
  return json(200, atualizado);
});
