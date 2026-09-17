-- Dúvidas enviadas ao sistema e seu atendimento por consultores/administradores.
CREATE TABLE IF NOT EXISTS estudo_duvidas (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  marcacao_id   bigint NOT NULL UNIQUE REFERENCES estudo_marcacoes (id) ON DELETE CASCADE,
  autor_id      bigint NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  padrinho_id   bigint REFERENCES usuarios (id) ON DELETE SET NULL,
  status        text NOT NULL DEFAULT 'aberta' CHECK (status IN ('aberta', 'respondida')),
  resposta      text NOT NULL DEFAULT '',
  enviada_em    timestamptz NOT NULL DEFAULT now(),
  assumida_em   timestamptz,
  respondida_em timestamptz,
  atualizado_em timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS estudo_duvidas_por_autor ON estudo_duvidas (autor_id, enviada_em DESC);
CREATE INDEX IF NOT EXISTS estudo_duvidas_abertas ON estudo_duvidas (status, enviada_em DESC) WHERE status = 'aberta';
CREATE INDEX IF NOT EXISTS estudo_duvidas_por_padrinho ON estudo_duvidas (padrinho_id, status, enviada_em DESC);
