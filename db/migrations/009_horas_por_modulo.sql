-- Horas por MÓDULO em cada pacote (não mais somadas dos itens da checklist) e tarefas editáveis.
-- 1) horas_modulos: {"moduloId": minutos} — começa com a soma atual dos itens da checklist do módulo
--    naquele pacote, então os totais continuam iguais à tabela de preços.
ALTER TABLE pacotes ADD COLUMN IF NOT EXISTS horas_modulos jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE pacotes p SET horas_modulos = COALESCE((
  SELECT jsonb_object_agg(m.id, (
    SELECT COALESCE(SUM((it -> 'minutos' ->> p.id)::int), 0)
    FROM jsonb_array_elements(COALESCE(m.dados -> 'checklist', '[]'::jsonb)) it
  ))
  FROM modulos m
  WHERE p.modulos @> to_jsonb(m.id)
), '{}'::jsonb)
WHERE p.horas_modulos = '{}'::jsonb;

-- 2) Cada tarefa (funcionalidade) ganha um id estável para edição.
UPDATE pacotes p SET funcionalidades = COALESCE((
  SELECT jsonb_agg(f || jsonb_build_object('id', p.id || '-t' || ord) ORDER BY ord)
  FROM jsonb_array_elements(p.funcionalidades) WITH ORDINALITY AS t(f, ord)
), '[]'::jsonb)
WHERE jsonb_array_length(p.funcionalidades) > 0 AND NOT (p.funcionalidades -> 0) ? 'id';
