# 12 — Diagnóstico v2 e plano de execução (05/11/2026)

Leitura feita na branch `fe/FE-20261104-01/centralizado` (c51f99b), em worktree separada
(`Desktop\HTML-MANUAL-centralizado`), rodando em Docker local isolado (porta 8082, banco
`faktory_centralizado`; o banco do `main` não foi tocado). Revisão visual no navegador em 1440, 1254 e 375 px.

Este documento **atualiza** os docs 00–11 com o 4º prompt-mestre do responsável (05/11): plataforma de
conhecimento + produção audiovisual com equipe de subagentes. Nada dos docs anteriores é descartado; onde
houver mudança de direção, ela está marcada como **Decisão**.

## 1. O que já está implementado (e está bom)

| Área | Situação | Evidência |
|---|---|---|
| Fase 2 — arquitetura | Visibilidade no banco (`013_visibilidade.sql`), middleware e API devolvendo 404/403, `/api/conteudo`, base gerada do Harness (19 módulos), roteador único com aliases, Acervo preservado | `lib/conteudo/**`, `middleware.js`, `scripts/testes/*.test.mjs` |
| Fase 3 — UI v2.1 | Página Inicial dark premium com cards por módulo, painel com materiais das 2 jornadas, trilha com progresso, página de módulo por blocos tipados, painel de Visibilidade com apostila em standby | `public/plataforma-ui.js`, `public/plataforma.css` |
| Qualidade de código | Sem `innerHTML` de dados, URL segura, `prefers-reduced-motion`, foco/teclado na grade, `aria-live`, CSP `script-src 'self'` respeitada | revisão do código |
| Mídia bruta | CRM, Vendas e Financeiro com roteiro de telas, descartes e áreas a borrar | `midia/brutos/**` |

## 2. Problemas encontrados (prioridade)

| # | Problema | Onde | Prioridade |
|---|---|---|---|
| P1 | Cards da Página Inicial reservam a altura do painel aberto: no estado fechado ~50% do card é espaço vazio; a grade fica longa e "oca" | `.pl-card { min-height: --pl-card-min }` + `alturas()` | Alta |
| P2 | No toque (celular/tablet) todos os painéis ficam abertos: a Página Inicial passa de 13.000 px de altura | `ligarCard` (toque = aberto por padrão) | Alta |
| P3 | As seções do guia antigo (Introdução, Módulos, Avançado, Referência) continuam na navegação principal em todas as áreas — contraria R-A91 | `guia-abas.js` `aplicarPerfil` | Alta |
| P4 | A Página Inicial não apresenta os **caminhos de aprendizagem**: só título + números; quem chega não sabe a diferença entre Guia Inicial e Guia do Consultor | `renderPaginaInicial` | Alta |
| P5 | Título da aba do navegador fixo em "Guia do Consultor — Faktory Flow" em todas as áreas | `index.html` | Média |
| P6 | Navegação duplicada (barra de abas + menu lateral com os mesmos 9 itens); abas viram só ícones ≤ 1280 px | `guia-abas.*` | Média (próximo incremento) |
| P7 | Vídeo introdutório "Em preparação" em todos os módulos | base + `videos/` | Alta (piloto em produção) |
| P8 | Motor v6 só monta prints parados (sem `OffthreadVideo`) e todo o tempo vem da narração | `videos/src/FluxoVideoV6.tsx` | Alta para o padrão introdutório |
| P9 | As pastas "Video Production Harness" e "Frontend Design Harness" citadas no doc 08 **não existem** em `Harness-Architecture` | doc 08 × disco | Média (registro) |
| P10 | Gravações brutas só de 3 dos 19 módulos; sem cursor visível (cliques automatizados) | `midia/brutos/README.md` | Pendência de captura |

## 3. Decisões

- **D1 — Vídeo introdutório sem narração (muda R-A52 para o Guia Inicial).** Pedido do responsável em 05/11:
  música instrumental, textos curtos estratégicos, zoom/câmera virtual, indicação visual de clique, 45–75 s.
  A voz L continua sendo o padrão **só** dos vídeos do Guia do Consultor (R-A53, `harness/regras/videos-de-fluxo.md`).
  A regra do Harness para o formato introdutório deve ser escrita em `harness/regras/` **com pedido explícito**
  (CLAUDE.md do Harness, item 8) — por ora o padrão fica em `videos/INTRO-LEIA-ME.md`.
- **D2 — Stack do Guia mantida** (confirma doc 07): HTML/CSS/JS sem build, WAAPI + View Transitions.
  Tailwind/shadcn/Radix/Motion/GSAP ficam como **referência de padrões** (estados, foco, springs), não dependência.
- **D3 — Motor:** o introdutório ganha uma composição nova `IntroVideo` (Remotion `OffthreadVideo` sobre os
  brutos recortados e borrados), sem alterar a V6 dos vídeos do consultor. Música sintetizada (sem direitos de terceiros).
- **D4 — Mídia:** brutos nunca são alterados; cortes/borrões vão para `videos/public/intro/<modulo>/` com `cortes.json`
  (origem, in/out, caixas de borrão, motivo). Módulo sem bruto = pendência registrada, nunca demonstração inventada.

## 4. Equipe e contratos (adapta o doc 10 à execução real)

| Papel | Quem executa | Arquivos que pode alterar |
|---|---|---|
| Coordenador/Arquiteto | sessão principal | `refatoracao-guia-do-consultor/**`, commits, integração |
| Frontend + Motion de interface | sessão principal (incremento 1) | `public/plataforma*.{css,js}`, `public/guia-abas.{css,js}`, `<title>` do `index.html` |
| Produção de vídeo | subagente "vídeo" | `videos/**` (só arquivos novos + registro no `Root.tsx`) |
| Conteúdo/Documentação | subagente sob demanda (com MCP `faktory-doc`) | `lib/conteudo/**` via gerador, `docs/manuais/**` |
| QA/validação funcional | sessão principal + navegador | `scripts/testar-*`, `descobertas/qa-devops.md` |

Um dono por arquivo; pedido cruzado vai para `descobertas/<agente>.md`. Nada publicado no manifesto de vídeos
sem aprovação do responsável (regra do Harness: render/republicação só com ordem explícita).

## 5. Pipeline audiovisual (pastas)

```
midia/brutos/<modulo>/            gravação bruta + roteiro-telas.md + manifesto.md + prints/   (somente leitura)
videos/roteiros/intro-<modulo>.json   roteiro visual (cenas, câmera, cliques, textos, batidas)
videos/public/intro/<modulo>/     clipes recortados/borrados + cortes.json                    (em processamento)
videos/public/musica/             trilhas sintetizadas
videos/out/<id>-previa.mp4        prévia para revisão (não publicada)
public/videos/<id>.mp4|jpg|vtt    publicado (só após aprovação) + manifest.json
```

Status de cada vídeo: `bruto-pendente → roteirizado → em-edicao → previa → aprovado → publicado`.

## 6. Incrementos

1. **Agora:** P1–P5 na interface + piloto `intro-vendas` (prévia).
2. Depois da aprovação do piloto: intro CRM e Financeiro (têm bruto); navegação única (P6); vídeo na página do módulo.
3. Captura dos módulos sem bruto (precisa de sessão no staging, login do responsável).
4. Guia do Consultor: aprofundar seções 4–8 com o MCP `faktory-doc` (regras com fonte, fluxos de implantação).
