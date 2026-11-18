-- Estrutura do setor Faktory Flow (18/11/2026): nova área logo abaixo da Metodologia, com funções, conexões,
-- equipe e processos internos. Só acrescenta a chave; reexecutar é seguro.
INSERT INTO visibilidade (chave, visivel, perfis) VALUES
  ('area:estrutura', true, ARRAY['estagiario', 'consultor']::text[])
ON CONFLICT (chave) DO NOTHING;
