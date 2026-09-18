-- Textos editáveis das seções fixas do Guia do Consultor.
CREATE TABLE IF NOT EXISTS guia_textos (
  id             text PRIMARY KEY CHECK (id = 'principal'),
  dados          jsonb NOT NULL DEFAULT '{}'::jsonb,
  rev            integer NOT NULL DEFAULT 1,
  atualizado_em  timestamptz NOT NULL DEFAULT now(),
  atualizado_por text NOT NULL DEFAULT ''
);

INSERT INTO guia_textos (id) VALUES ('principal') ON CONFLICT (id) DO NOTHING;
