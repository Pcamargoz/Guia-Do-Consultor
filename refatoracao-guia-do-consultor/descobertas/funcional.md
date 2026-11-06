# Descobertas — Especialista funcional

## 2026-11-04 · funcional · Base do Harness indexada
- Descoberta: `Harness-Arquitetura-Flow` indexado com `faktory-doc kb ingest`: 197 fontes, 5.723 trechos (39 regra_negocio, 13 manual_oficial, 102 roteiro_treinamento, 16 plano_validacao, 12 procedimento, 10 funcional, 3 metodologia, 2 faq).
- Evidência: saída do `kb ingest` e de `harness_contexto(tarefa="video")` em 04/11/2026.
- Impacto: a base de conhecimento da plataforma pode ser gerada e citada por fonte.
- Próximo passo: `scripts/gerar-base-conhecimento.mjs` a partir dos dados de checklists, roteiros e manifestos (ver ../05-mapa-de-modulos.md).

## 2026-11-04 · funcional · Conteúdo verificado já existe no Guia
- Descoberta: checklists de implantação (624 passos com Confira/Fonte), trilha do estagiário (passos `v` conferidos em 16/10/2026, v1.22.11) e 13 roteiros (51 regras com fonte, 90 telas reais, 13 blocos de alertas).
- Evidência: `scripts/dados-checklists-*.mjs`, `videos/roteiros/*.json`, `videos/public/telas/`.
- Impacto: as duas jornadas podem ser preenchidas sem escrever regra de memória.
- Próximo passo: revalidar na tela a versão atual (≥ 1.22.13) quando houver login no staging.
