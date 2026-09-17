/* Regras de usuários: login, admin definido por variável de ambiente e CRUD do painel. */
import { consulta } from './db.js';
import { conferirSenha, conferirSenhaFalsa, gerarHash, validarSenhaNova } from './senha.js';
import { PAPEIS_VALIDOS } from './permissoes.js';
import { ErroHttp } from './http.js';

const MAX_FALHAS = 5;
const BLOQUEIO_MIN = 15;
const LOGIN_VALIDO = /^[a-zA-Z0-9._@-]{3,60}$/;

const normalizarLogin = (v) => String(v ?? '').trim();

/**
 * Garante que o usuário administrador das variáveis ADMIN_USERNAME / ADMIN_PASSWORD
 * exista, esteja ativo e com a senha atual. Chamado na migração e no login.
 */
export async function sincronizarAdmin(db = { query: consulta }) {
  const login = normalizarLogin(process.env.ADMIN_USERNAME);
  const senha = process.env.ADMIN_PASSWORD;
  if (!login || !senha) return null;
  const erroSenha = validarSenhaNova(senha);
  if (erroSenha) throw new Error(`ADMIN_PASSWORD inválida: ${erroSenha}`);
  if (!LOGIN_VALIDO.test(login)) throw new Error('ADMIN_USERNAME inválido: use 3 a 60 letras, números, ponto, hífen, _ ou @.');
  const nome = (process.env.ADMIN_NOME || 'Administrador').trim().slice(0, 80);

  const { rows } = await db.query('SELECT id, senha_hash, papel, ativo, nome FROM usuarios WHERE lower(login) = lower($1)', [login]);
  const atual = rows[0];
  if (!atual) {
    const { rows: novos } = await db.query(
      `INSERT INTO usuarios (login, nome, senha_hash, papel, gerenciado_por_env)
       VALUES ($1, $2, $3, 'admin', true) RETURNING id`,
      [login, nome, await gerarHash(senha)],
    );
    return novos[0].id;
  }
  const senhaMudou = !(await conferirSenha(senha, atual.senha_hash));
  if (senhaMudou || atual.papel !== 'admin' || !atual.ativo || atual.nome !== nome) {
    await db.query(
      `UPDATE usuarios SET papel = 'admin', ativo = true, gerenciado_por_env = true, nome = $2,
         senha_hash = CASE WHEN $3::text IS NULL THEN senha_hash ELSE $3 END,
         sessao_versao = sessao_versao + CASE WHEN $3::text IS NULL THEN 0 ELSE 1 END,
         atualizado_em = now()
       WHERE id = $1`,
      [atual.id, nome, senhaMudou ? await gerarHash(senha) : null],
    );
  }
  return atual.id;
}

export async function autenticar(loginInformado, senha) {
  const login = normalizarLogin(loginInformado);
  if (!login || typeof senha !== 'string' || !senha) throw new ErroHttp(400, 'Informe login e senha.');

  if (process.env.ADMIN_USERNAME && login.toLowerCase() === process.env.ADMIN_USERNAME.trim().toLowerCase()) {
    await sincronizarAdmin();
  }

  const { rows } = await consulta(
    'SELECT id, login, nome, papel, ativo, senha_hash, sessao_versao, falhas_login, bloqueado_ate FROM usuarios WHERE lower(login) = lower($1)',
    [login],
  );
  const usuario = rows[0];
  const recusa = new ErroHttp(401, 'Login ou senha incorretos.');

  if (!usuario) { await conferirSenhaFalsa(senha); throw recusa; }
  if (usuario.bloqueado_ate && new Date(usuario.bloqueado_ate) > new Date()) {
    const minutos = Math.ceil((new Date(usuario.bloqueado_ate) - new Date()) / 60000);
    throw new ErroHttp(429, `Muitas tentativas incorretas. Tente novamente em ${minutos} min.`);
  }
  if (!(await conferirSenha(senha, usuario.senha_hash))) {
    await consulta(
      `UPDATE usuarios SET falhas_login = falhas_login + 1,
         bloqueado_ate = CASE WHEN falhas_login + 1 >= $2 THEN now() + ($3 || ' minutes')::interval ELSE bloqueado_ate END
       WHERE id = $1`,
      [usuario.id, MAX_FALHAS, String(BLOQUEIO_MIN)],
    );
    throw recusa;
  }
  if (!usuario.ativo) throw new ErroHttp(403, 'Usuário desativado. Fale com o administrador.');

  await consulta('UPDATE usuarios SET falhas_login = 0, bloqueado_ate = NULL, ultimo_login_em = now() WHERE id = $1', [usuario.id]);
  return usuario;
}

/* ---------- Painel de usuários (somente admin) ---------- */

const colunasPublicas = 'id, login, nome, papel, ativo, gerenciado_por_env, ultimo_login_em, criado_em, atualizado_em';

const formatar = (u) => ({
  id: String(u.id),
  login: u.login,
  nome: u.nome,
  papel: u.papel,
  ativo: u.ativo,
  gerenciadoPorEnv: u.gerenciado_por_env,
  ultimoLoginEm: u.ultimo_login_em,
  criadoEm: u.criado_em,
  atualizadoEm: u.atualizado_em,
});

export async function listarUsuarios() {
  const { rows } = await consulta(`SELECT ${colunasPublicas} FROM usuarios ORDER BY gerenciado_por_env DESC, lower(nome), lower(login)`);
  return rows.map(formatar);
}

function validarDados({ login, nome, papel }, { criando }) {
  if (criando && !LOGIN_VALIDO.test(normalizarLogin(login))) {
    throw new ErroHttp(400, 'Login inválido: use 3 a 60 caracteres (letras, números, ponto, hífen, _ ou @), sem espaços.');
  }
  if (nome !== undefined && (typeof nome !== 'string' || nome.trim().length > 80)) throw new ErroHttp(400, 'Nome inválido (máximo 80 caracteres).');
  if (papel !== undefined && !PAPEIS_VALIDOS.includes(papel)) throw new ErroHttp(400, 'Perfil de acesso inválido.');
}

export async function criarUsuario(dados) {
  validarDados(dados, { criando: true });
  const erroSenha = validarSenhaNova(dados.senha);
  if (erroSenha) throw new ErroHttp(400, erroSenha);
  const papel = dados.papel || 'estagiario';
  try {
    const { rows } = await consulta(
      `INSERT INTO usuarios (login, nome, senha_hash, papel) VALUES ($1, $2, $3, $4) RETURNING ${colunasPublicas}`,
      [normalizarLogin(dados.login), (dados.nome || '').trim(), await gerarHash(dados.senha), papel],
    );
    return formatar(rows[0]);
  } catch (err) {
    if (err.code === '23505') throw new ErroHttp(409, 'Já existe um usuário com esse login.');
    throw err;
  }
}

async function buscarGerenciavel(id, admin) {
  const { rows } = await consulta(`SELECT ${colunasPublicas} FROM usuarios WHERE id = $1`, [id]);
  const alvo = rows[0];
  if (!alvo) throw new ErroHttp(404, 'Usuário não encontrado.');
  if (alvo.gerenciado_por_env) throw new ErroHttp(403, 'Este administrador é definido pelas variáveis de ambiente do Vercel.');
  return { alvo, proprio: String(alvo.id) === String(admin.id) };
}

export async function atualizarUsuario(id, dados, admin) {
  validarDados(dados, { criando: false });
  const { proprio } = await buscarGerenciavel(id, admin);
  if (proprio && ((dados.papel && dados.papel !== 'admin') || dados.ativo === false)) {
    throw new ErroHttp(400, 'Você não pode remover o próprio acesso de administrador.');
  }
  let senhaHash = null;
  if (dados.senha) {
    const erroSenha = validarSenhaNova(dados.senha);
    if (erroSenha) throw new ErroHttp(400, erroSenha);
    senhaHash = await gerarHash(dados.senha);
  }
  const { rows } = await consulta(
    `UPDATE usuarios SET
       nome = COALESCE($2, nome),
       papel = COALESCE($3, papel),
       ativo = COALESCE($4, ativo),
       senha_hash = COALESCE($5, senha_hash),
       falhas_login = CASE WHEN $5::text IS NULL THEN falhas_login ELSE 0 END,
       bloqueado_ate = CASE WHEN $5::text IS NULL THEN bloqueado_ate ELSE NULL END,
       sessao_versao = sessao_versao + CASE
         WHEN $5::text IS NOT NULL OR ($3::text IS NOT NULL AND $3 <> papel) OR ($4::boolean IS NOT NULL AND $4 <> ativo) THEN 1 ELSE 0 END,
       atualizado_em = now()
     WHERE id = $1 RETURNING ${colunasPublicas}`,
    [id, dados.nome === undefined ? null : dados.nome.trim(), dados.papel ?? null, typeof dados.ativo === 'boolean' ? dados.ativo : null, senhaHash],
  );
  return formatar(rows[0]);
}

export async function excluirUsuario(id, admin) {
  const { proprio } = await buscarGerenciavel(id, admin);
  if (proprio) throw new ErroHttp(400, 'Você não pode excluir o próprio usuário.');
  await consulta('DELETE FROM usuarios WHERE id = $1', [id]);
}
