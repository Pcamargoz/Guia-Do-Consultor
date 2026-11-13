-- Metodologia (refatoracao-guia-do-consultor/14-metodologia.md): as quatro seções e um controle por recurso de módulo.
-- Só acrescenta: não apaga nem altera nenhuma decisão já gravada pelo admin. Reexecutar é seguro.
-- As chaves antigas (area:guia-inicial, area:guia-consultor, area:acervo, area:checklists, area:apostila) ficam no banco.

-- 1. A chave passa a aceitar o prefixo "recurso:" (recurso:<modulo>-<video|checklist|manual>).
DO $$
DECLARE c record;
BEGIN
  FOR c IN
    SELECT con.conname FROM pg_constraint con
     WHERE con.conrelid = 'visibilidade'::regclass AND con.contype = 'c' AND pg_get_constraintdef(con.oid) LIKE '%chave%'
  LOOP
    EXECUTE format('ALTER TABLE visibilidade DROP CONSTRAINT %I', c.conname);
  END LOOP;
END $$;
ALTER TABLE visibilidade ADD CONSTRAINT visibilidade_chave_check CHECK (chave ~ '^(area|tipo|modulo|recurso):[a-z0-9-]{2,40}$');

-- 2. Seções novas da Metodologia (area:videos já existe e passa a ser a Biblioteca de Vídeos).
INSERT INTO visibilidade (chave, visivel, perfis) VALUES
  ('area:metodologia', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:manuais', true, ARRAY['estagiario', 'consultor']::text[]),
  ('area:metodologia-ff', true, ARRAY['estagiario', 'consultor']::text[])
ON CONFLICT (chave) DO NOTHING;

-- 3. Um controle por recurso (vídeo, checklist e manual de cada módulo), todos publicados no início.
INSERT INTO visibilidade (chave, visivel, perfis)
SELECT format('recurso:%s-%s', m, t), true, ARRAY['estagiario', 'consultor']::text[]
  FROM unnest(ARRAY['primeiros-passos', 'fundacao', 'crm', 'cem', 'vendas', 'compras', 'recebimento', 'estoque', 'producao',
                    'servicos', 'projetos', 'expedicao', 'faturamento', 'fiscal', 'financeiro', 'tarefas', 'relatorios',
                    'alumina', 'fluxo-completo']) AS m
 CROSS JOIN unnest(ARRAY['video', 'checklist', 'manual']) AS t
ON CONFLICT (chave) DO NOTHING;
