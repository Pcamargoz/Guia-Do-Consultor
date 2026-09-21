-- Horas por módulo passam a poder ser diferentes por fluxo (Premium/Rápida) e faixa de
-- usuários, e não só na base (Premium · até 5 usuários).
-- Formato novo: horas_modulos = {"moduloId": {"Premium": {"0": minutos, "2": minutos}, "Rápida": {...}}}.
-- Migra o formato antigo {"moduloId": minutos} (sempre a base) para o formato novo.
-- Idempotente: só mexe nas chaves que ainda são number.

UPDATE pacotes
SET horas_modulos = (
  SELECT COALESCE(jsonb_object_agg(chave, CASE
    WHEN jsonb_typeof(valor) = 'number' THEN jsonb_build_object('Premium', jsonb_build_object('0', valor))
    ELSE valor
  END), '{}'::jsonb)
  FROM jsonb_each(horas_modulos) AS t(chave, valor)
)
WHERE EXISTS (
  SELECT 1 FROM jsonb_each(horas_modulos) AS t(chave, valor) WHERE jsonb_typeof(valor) = 'number'
);
