/* Checagem de visibilidade nas rotas de API (doc 04).
   Usa o mapa efetivo do perfil logado; 403 com a mesma mensagem de /api/conteudo. */
import { ErroHttp } from './http.js';
import { chaveVisivel, mapaEfetivo } from './visibilidade.js';
import { carregarLinhas } from './visibilidade-dados.js';

const MSG = 'Este conteúdo não está disponível para o seu perfil.';

/** Garante que a chave está visível para o usuário; devolve o mapa efetivo. */
export async function exigirChaveVisivel(usuario, chave) {
  const mapa = mapaEfetivo(await carregarLinhas(), usuario.papel);
  if (!chaveVisivel(mapa, chave)) throw new ErroHttp(403, MSG);
  return mapa;
}
