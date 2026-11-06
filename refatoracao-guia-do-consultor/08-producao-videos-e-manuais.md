# 08 — Produção de vídeos e manuais (R-A50 a R-A64, R-B*)

## Regras do Harness para vídeos (`harness/regras/videos-de-fluxo.md`)

- Estrutura: **abertura** (≤ 8 s) → **conceito** (20–40 s, diagrama animado) → **regras** (30–60 s, até 5,
  cada uma com fonte `regra_negocio`) → **na tela** (60–120 s, gravação real com destaque antes do clique)
  → **armadilhas** (15–30 s, limitações conhecidas) → **fechamento** (≤ 10 s, 3 tópicos + próximo vídeo).
- Duração 2–4 min por fluxo (consultor). Para o **Guia Inicial**, proposta: **60–90 s** por módulo,
  sem bloco de regras avançadas (só 1–2 "cuidados"), foco em "o que é / como acessar / a operação básica".
- Narração pt-BR, "você", frases ≤ 20 palavras, ~140 palavras/min, legendas sempre ligadas.
- **Uma voz só: a voz L** (Voice Studio, clonada da amostra do responsável).
- Som: voz ≈ −16 LUFS, música 18–22 dB abaixo com ducking, final **−14 LUFS integrado**, pico ≤ −1 dBFS.
- Imagem: 1920×1080, 30 fps, identidade Faktory Flow, gravações **só do ambiente de teste**, dados
  fictícios, borrar CNPJ/e-mail/valores/códigos legíveis.
- **Sem engasgos**: imagem nunca parada com a voz correndo (> 1 s só como respiro planejado).
- Renderizar, narrar de novo ou republicar **só com ordem explícita do responsável**; mudança visual
  grande passa por prévia aprovada. Nada publicado com `qa.mjs` reprovado.

## Pipeline (motor v6 + Harness)

```
1 harness_contexto(video) → workflow roteirizar-video
2 kb_search / kb_get_source / glossary_lookup  → regras e nomes exatos
3 roteiro (template harness/templates/roteiro-video.md) → videos/roteiros/<id>.json
4 lista de gravação → gravar-telas.mjs no staging (login feito pelo responsável)
5 narrar.mjs (Voice Studio, voz L)  → videos/public/audio/<id>/ + tempos.json
6 preparar.mjs / frases.mjs / engasgos.mjs → timeline guiada pela voz
7 render.mjs (Remotion v6, em partes) → public/videos/<id>.mp4 + .jpg + .vtt
8 qa.mjs → aprovado? senão corrigir e repetir
9 manifest.json + base de conhecimento → aparece na plataforma
```

A voz define a duração das cenas (R-B50). Projeto editável = roteiro JSON + capturas + áudio + composição
Remotion versionados (R-A54).

## Plano de vídeos novos

| Série | Vídeos | Status |
|---|---|---|
| **Guia Inicial — introdutórios** (60–90 s) | Primeiros passos, Cadastros, CRM, Vendas, Compras, Recebimento, Estoque, Produção, Serviços, Projetos, Expedição, Faturamento, Fiscal, Financeiro, Tarefas, Visão do fluxo | A roteirizar → depende de gravação no staging + Voice Studio |
| **Guia do Consultor — avançados** | Os 15 existentes (refazer com `MELHORIAS-PENDENTES.md` só com ordem) + novos: Integração CEM, Fiscal (configuração tributária), Fundação (configuração do ambiente) | Existentes publicados; novos a roteirizar |
| Relatórios, Alumina | — | **Em preparação** (sem base suficiente; Alumina em revisão) |

## Manuais

| Tipo | Formato | Conteúdo |
|---|---|---|
| **Manual visual resumido** (Guia Inicial) | Página HTML na plataforma + PDF (impressão com CSS de página A4) | 2–4 páginas: o que é, como acessar, operação básica em etapas numeradas com prints reais anotados (recorte, zoom, setas, números), cuidados, próximo passo |
| **Manual do consultor** (Guia do Consultor) | HTML + PDF; rascunho via `manual_save_draft` no Harness; aprovação humana pela CLI | Visão, regras verificadas com fonte, fluxograma, mapa de processo, configurações, procedimento de implantação, quadros de atenção, checklist de validação, relação entre módulos |

Prints: só telas reais do staging, na versão registrada (ex.: v1.22.13), sem dados pessoais, com
`registrar_validacao_tela` no Harness. Workflow `gerar-manual` + regra `evidencias.md` + template
`manual-procedimento.md`.

## Arquitetura de skills audiovisual e frontend

O responsável pediu (Prompts 2 e 3) duas arquiteturas reutilizáveis de Agent Skills. Elas ficam no
repositório **`Harness-Architecture`**, nas pastas `Video Production Harness/` e `Frontend Design Harness/`
(skills, matriz de ferramentas, presets de render, checklist de QA, scripts de análise de áudio e QA de
vídeo, demo em ffmpeg, design tokens, padrões de animação, guia de acessibilidade, demo de dashboard).
O motor de produção dos vídeos da plataforma continua sendo o **v6 deste repositório**; as skills
documentam e padronizam o uso.
