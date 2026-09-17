/* Hash de senha com scrypt (nativo do Node, sem dependências).
   Formato armazenado: scrypt$N$r$p$salt$hash (salt e hash em base64). */
import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);
const N = 16384;
const R = 8;
const P = 1;
const TAMANHO = 64;

export const SENHA_MINIMA = 8;

export async function gerarHash(senha) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(senha.normalize('NFKC'), salt, TAMANHO, { N, r: R, p: P });
  return ['scrypt', N, R, P, salt.toString('base64'), hash.toString('base64')].join('$');
}

export async function conferirSenha(senha, armazenado) {
  const partes = String(armazenado || '').split('$');
  if (partes.length !== 6 || partes[0] !== 'scrypt') return false;
  const [, n, r, p, saltB64, hashB64] = partes;
  const esperado = Buffer.from(hashB64, 'base64');
  const obtido = await scryptAsync(String(senha).normalize('NFKC'), Buffer.from(saltB64, 'base64'), esperado.length, {
    N: Number(n), r: Number(r), p: Number(p),
  });
  return esperado.length === obtido.length && timingSafeEqual(esperado, obtido);
}

// Hash fixo usado para gastar o mesmo tempo quando o login não existe (evita descobrir usuários pelo tempo de resposta).
let hashFalso;
export async function conferirSenhaFalsa(senha) {
  hashFalso ||= await gerarHash('senha-inexistente-para-tempo-constante');
  await conferirSenha(senha, hashFalso);
  return false;
}

export function validarSenhaNova(senha) {
  if (typeof senha !== 'string' || senha.length < SENHA_MINIMA) {
    return `A senha precisa ter pelo menos ${SENHA_MINIMA} caracteres.`;
  }
  if (senha.length > 200) return 'A senha pode ter no máximo 200 caracteres.';
  return null;
}
