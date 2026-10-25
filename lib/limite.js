/* Limite de requisições por IP (rate limit) da API, com contagem no PostgreSQL (tabela limite_requisicoes).
   Janela fixa: cada regra conta as requisições de um IP dentro de um intervalo; passou do limite, a API responde 429
   com Retry-After até a janela virar. Se o banco falhar na contagem, a requisição segue (não derruba o site). */
import { consulta } from './db.js';

/* Regras por tipo de requisição. O login tem duas janelas: uma curta, contra rajada, e uma longa, contra tentativa de
   senha lenta (o bloqueio de 5 senhas erradas por conta, em lib/usuarios.js, continua valendo). */
export const REGRAS = {
  login: [{ nome: 'login-1min', limite: 10, janelaS: 60 }, { nome: 'login-15min', limite: 30, janelaS: 900 }],
  escrita: [{ nome: 'escrita-1min', limite: 120, janelaS: 60 }],
  leitura: [{ nome: 'leitura-1min', limite: 600, janelaS: 60 }],
};

/** Tipo de regra para a rota e o método. */
export function regraPara(rota, metodo) {
  if (rota === 'auth/login') return 'login';
  return ['GET', 'HEAD', 'OPTIONS'].includes(metodo) ? 'leitura' : 'escrita';
}

/** IP de quem chama. No Vercel, x-real-ip e x-forwarded-for vêm da borda do Vercel; localmente, "local". */
export function ipDe(request) {
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim().slice(0, 64);
  const encaminhado = request.headers.get('x-forwarded-for');
  if (encaminhado) return encaminhado.split(',')[0].trim().slice(0, 64);
  return 'local';
}

/**
 * Conta a requisição em cada janela da regra. Devolve null se pode seguir, ou { limite, janelaS, tentarEmS } se passou.
 */
export async function verificarLimite(tipo, ip) {
  const regras = REGRAS[tipo];
  if (!regras) return null;
  try {
    for (const r of regras) {
      const { rows } = await consulta(
        `INSERT INTO limite_requisicoes (chave, janela, contagem)
              VALUES ($1, to_timestamp(floor(extract(epoch FROM now()) / $2) * $2), 1)
         ON CONFLICT (chave, janela) DO UPDATE SET contagem = limite_requisicoes.contagem + 1
         RETURNING contagem, GREATEST(1, ceil(extract(epoch FROM (janela + make_interval(secs => $2) - now()))))::int AS resta`,
        [`${r.nome}:${ip}`, r.janelaS],
      );
      if (rows[0].contagem > r.limite) return { limite: r.limite, janelaS: r.janelaS, tentarEmS: rows[0].resta };
    }
    // limpeza de vez em quando (cerca de 1 a cada 200 requisições): janelas com mais de 2 horas
    if (Math.random() < 0.005) await consulta("DELETE FROM limite_requisicoes WHERE janela < now() - interval '2 hours'");
    return null;
  } catch (err) {
    console.error('limite de requisições indisponível', err);
    return null;
  }
}
