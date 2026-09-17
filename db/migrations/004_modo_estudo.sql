-- Faktory Flow — Modo Estudo: marcações, checklists e progresso individuais por usuário.
-- Entidades próprias (não guardam nada dentro de usuarios nem do conteúdo da apostila).
-- A coluna "documento" permite reaproveitar a estrutura para outros materiais no futuro.

CREATE TABLE IF NOT EXISTS estudo_marcacoes (
  id            bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id    bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  documento     text        NOT NULL DEFAULT 'apostila',
  tipo          text        NOT NULL CHECK (tipo IN ('grifo', 'nota', 'comentario', 'favorito')),
  cor           text        NOT NULL DEFAULT 'amarelo' CHECK (cor IN ('amarelo', 'verde', 'azul', 'rosa')),
  -- Âncora do trecho: {"bloco": "4.12", "inicio": 10, "fim": 48}
  ancora        jsonb       NOT NULL,
  trecho        text        NOT NULL DEFAULT '',  -- texto selecionado (confere a âncora e aparece no painel)
  texto         text        NOT NULL DEFAULT '',  -- conteúdo da anotação/comentário
  pagina        integer,
  secao         text        NOT NULL DEFAULT '',
  criado_em     timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS estudo_marcacoes_por_usuario ON estudo_marcacoes (usuario_id, documento, pagina, id);

CREATE TABLE IF NOT EXISTS estudo_itens (
  id            bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id    bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  documento     text        NOT NULL DEFAULT 'apostila',
  chave         text        NOT NULL,             -- id estável do item da checklist no conteúdo
  concluido     boolean     NOT NULL DEFAULT false,
  observacao    text        NOT NULL DEFAULT '',
  texto         text        NOT NULL DEFAULT '',  -- texto do item, para o painel "Minhas Anotações"
  pagina        integer,
  secao         text        NOT NULL DEFAULT '',
  concluido_em  timestamptz,
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  UNIQUE (usuario_id, documento, chave)
);

CREATE TABLE IF NOT EXISTS estudo_progresso (
  usuario_id    bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  documento     text        NOT NULL DEFAULT 'apostila',
  modo_estudo   boolean     NOT NULL DEFAULT false,
  ultima_pagina integer,
  ultima_secao  text        NOT NULL DEFAULT '',
  ultimo_bloco  text        NOT NULL DEFAULT '',
  paginas_lidas jsonb       NOT NULL DEFAULT '[]'::jsonb,
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (usuario_id, documento)
);
