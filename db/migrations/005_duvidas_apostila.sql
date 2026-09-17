-- Classificação das dúvidas pessoais e destinatários compartilhados do Modo Estudo.
ALTER TABLE estudo_marcacoes
  ADD COLUMN IF NOT EXISTS rotulo text;

ALTER TABLE estudo_marcacoes
  ADD CONSTRAINT estudo_marcacoes_rotulo_valido
  CHECK (rotulo IS NULL OR rotulo IN ('comentario', 'duvida'));

CREATE INDEX IF NOT EXISTS estudo_duvidas_por_usuario
  ON estudo_marcacoes (usuario_id, documento, pagina, id)
  WHERE tipo = 'comentario' AND rotulo = 'duvida';

CREATE TABLE IF NOT EXISTS configuracoes_estudo (
  id             boolean PRIMARY KEY DEFAULT true CHECK (id),
  destinatarios  text[] NOT NULL DEFAULT '{}',
  atualizado_em  timestamptz NOT NULL DEFAULT now(),
  atualizado_por bigint REFERENCES usuarios (id) ON DELETE SET NULL
);
