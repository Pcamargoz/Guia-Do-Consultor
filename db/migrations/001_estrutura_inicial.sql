-- Faktory Flow — estrutura inicial: usuários com perfis de acesso, módulos e histórico.

CREATE TABLE IF NOT EXISTS usuarios (
  id                 bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  login              text        NOT NULL,
  nome               text        NOT NULL DEFAULT '',
  senha_hash         text        NOT NULL,
  papel              text        NOT NULL CHECK (papel IN ('admin', 'consultor', 'estagiario')),
  ativo              boolean     NOT NULL DEFAULT true,
  -- true para o administrador definido em ADMIN_USERNAME / ADMIN_PASSWORD (não editável pelo painel)
  gerenciado_por_env boolean     NOT NULL DEFAULT false,
  -- incrementado ao trocar senha, perfil ou status: invalida as sessões abertas
  sessao_versao      integer     NOT NULL DEFAULT 1,
  falhas_login       integer     NOT NULL DEFAULT 0,
  bloqueado_ate      timestamptz,
  ultimo_login_em    timestamptz,
  criado_em          timestamptz NOT NULL DEFAULT now(),
  atualizado_em      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS usuarios_login_unico ON usuarios (lower(login));

CREATE TABLE IF NOT EXISTS modulos (
  id            text        PRIMARY KEY,
  ordem         integer     NOT NULL,
  -- conteúdo editável: nome, textos, categorias e listas (fluxo, boasPraticas, checklist) com status por item
  dados         jsonb       NOT NULL,
  status        text        CHECK (status IN ('rever', 'aprovado', 'reprovado')),
  status_em     timestamptz,
  status_por    text        NOT NULL DEFAULT '',
  rev           integer     NOT NULL DEFAULT 1,
  criado_em     timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS modulos_ordem ON modulos (ordem);

CREATE TABLE IF NOT EXISTS modulos_historico (
  id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  modulo_id  text        NOT NULL REFERENCES modulos (id) ON DELETE CASCADE,
  em         timestamptz NOT NULL DEFAULT now(),
  acao       text        NOT NULL,
  detalhe    text        NOT NULL DEFAULT '',
  autor      text        NOT NULL DEFAULT '',
  usuario_id bigint      REFERENCES usuarios (id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS modulos_historico_por_modulo ON modulos_historico (modulo_id, em DESC);
