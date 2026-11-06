-- Visibilidade da plataforma de conhecimento (refatoracao-guia-do-consultor/04-visibilidade-e-permissoes.md).
-- Regra efetiva (lib/visibilidade.js): visível se papel = admin OU (visivel E papel = ANY(perfis)).
-- Só cria tabelas e valores iniciais: não apaga nem altera nada existente. Reexecutar é seguro.
-- FE-20261104-01: escrita, NÃO executada (banco local aguarda aprovação).

CREATE TABLE IF NOT EXISTS visibilidade (
  chave          text        PRIMARY KEY CHECK (chave ~ '^(area|tipo|modulo):[a-z0-9-]{2,40}$'),
  visivel        boolean     NOT NULL DEFAULT true,
  perfis         text[]      NOT NULL DEFAULT ARRAY['estagiario', 'consultor']::text[]
                             CHECK (perfis <@ ARRAY['estagiario', 'consultor']::text[]),
  atualizado_por bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  atualizado_em  timestamptz NOT NULL DEFAULT now()
);

-- Histórico de cada alteração feita pelo admin (auditoria; nunca é apagado pela aplicação).
CREATE TABLE IF NOT EXISTS visibilidade_historico (
  id             bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  chave          text        NOT NULL,
  visivel_antes  boolean,
  perfis_antes   text[],
  visivel        boolean     NOT NULL,
  perfis         text[]      NOT NULL,
  alterado_por   bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  alterado_em    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS visibilidade_historico_chave ON visibilidade_historico (chave, alterado_em DESC);

-- Valores iniciais do doc 04: apostila oculta (standby); acervo só consultor; o resto para os dois perfis.
-- ON CONFLICT DO NOTHING: nunca sobrescreve o que o admin já decidiu.
INSERT INTO visibilidade (chave, visivel, perfis) VALUES
  ('area:guia-inicial', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:guia-consultor', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:pacotes', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:checklists', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:videos', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:apostila', false, ARRAY['estagiario', 'consultor']::text[]),
  ('area:acervo', true, ARRAY['consultor']::text[]),
  ('tipo:video', true, ARRAY['estagiario', 'consultor']::text[]),
  ('tipo:manual', true, ARRAY['estagiario', 'consultor']::text[]),
  ('tipo:checklist', true, ARRAY['estagiario', 'consultor']::text[]),
  ('tipo:fluxo', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:primeiros-passos', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:fundacao', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:crm', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:cem', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:vendas', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:compras', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:recebimento', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:estoque', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:producao', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:servicos', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:projetos', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:expedicao', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:faturamento', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:fiscal', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:financeiro', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:tarefas', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:relatorios', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:alumina', true, ARRAY['estagiario', 'consultor']::text[]),
  ('modulo:fluxo-completo', true, ARRAY['estagiario', 'consultor']::text[])
ON CONFLICT (chave) DO NOTHING;
