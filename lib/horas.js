/* Validação de durações (em minutos inteiros). */
import { ErroHttp } from './http.js';

export const MAX_MINUTOS = 1000 * 60; // 1000h por tarefa
export const ID_PACOTE = /^[a-z0-9-]{1,40}$/;

export const FAIXAS_USUARIOS = ['até 5 usuários', '6 a 10 usuários', '11 a 15 usuários', '16 a 20 usuários', '21 a 25 usuários', '26 a 30 usuários'];
export const FLUXOS = ['Premium', 'Rápida'];

export function validarMinutos(valor) {
  const n = Number(valor);
  if (!Number.isInteger(n) || n < 0 || n > MAX_MINUTOS) {
    throw new ErroHttp(400, 'Duração inválida: informe um valor entre 0 e 1000 horas.');
  }
  return n;
}

export function formatarDuracao(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (!h) return `${m}min`;
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
}

/** Mantém só chaves de pacote válidas com minutos inteiros. */
export function limparMinutosPorPacote(valor) {
  if (!valor || typeof valor !== 'object' || Array.isArray(valor)) return {};
  const saida = {};
  for (const [pacote, minutos] of Object.entries(valor)) {
    if (ID_PACOTE.test(pacote) && Number.isInteger(minutos) && minutos >= 0 && minutos <= MAX_MINUTOS) saida[pacote] = minutos;
  }
  return saida;
}
