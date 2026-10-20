-- Progresso dos checklists por usuário (marcações, registros, problemas e anotações) e imagens anexadas às etapas.
CREATE TABLE IF NOT EXISTS checklist_progresso (
  usuario_id    bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  chave         text        NOT NULL CHECK (chave ~ '^[a-z0-9:_-]{3,80}$'),
  dados         jsonb       NOT NULL DEFAULT '{}'::jsonb,
  pct           smallint    NOT NULL DEFAULT 0 CHECK (pct BETWEEN 0 AND 100),
  atualizado_em timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (usuario_id, chave)
);

CREATE TABLE IF NOT EXISTS checklist_anexos (
  id         bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  chave      text        NOT NULL CHECK (chave ~ '^[a-z0-9:_-]{3,80}$'),
  item       text        NOT NULL CHECK (item ~ '^[A-Za-z0-9_.:-]{1,80}$'),
  nome       text        NOT NULL DEFAULT '',
  tipo       text        NOT NULL CHECK (tipo IN ('image/jpeg', 'image/png', 'image/webp')),
  tamanho    integer     NOT NULL CHECK (tamanho > 0),
  dados      bytea       NOT NULL,
  criado_em  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS checklist_anexos_usuario_chave ON checklist_anexos (usuario_id, chave);
