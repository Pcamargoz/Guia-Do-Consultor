/* Perfis de acesso e o que cada um pode fazer. */

export const PAPEIS = {
  admin: {
    nome: 'Administrador',
    permissoes: ['ver', 'exportar', 'editar', 'gerenciar_usuarios'],
  },
  consultor: {
    nome: 'Consultor',
    permissoes: ['ver', 'exportar', 'editar'],
  },
  estagiario: {
    nome: 'Estagiário',
    permissoes: ['ver', 'exportar'],
  },
};

export const PAPEIS_VALIDOS = Object.keys(PAPEIS);

export const pode = (papel, permissao) => Boolean(PAPEIS[papel]?.permissoes.includes(permissao));
