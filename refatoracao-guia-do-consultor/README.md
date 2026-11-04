# Refatoração do Guia do Consultor → Plataforma de Conhecimento Faktory Flow

Esta pasta reúne **todo o contexto** da reestruturação do Guia do Consultor em uma plataforma de
treinamento, capacitação, documentação e consulta operacional do Faktory Flow. Qualquer pessoa ou
agente que retomar o trabalho deve começar por aqui.

> Situação em 04/11/2026: **planejamento e diagnóstico concluídos**; implementação ainda não iniciada
> no código do Guia. Nada do sistema atual foi alterado. Veja [09 — pendências e como retomar](09-pendencias-e-como-retomar.md).

## Leitura recomendada (nesta ordem)

| # | Documento | Para que serve |
|---|---|---|
| 00 | [Requisitos consolidados](00-requisitos.md) | Os três prompts-mestre do responsável, organizados em requisitos verificáveis |
| 01 | [Diagnóstico](01-diagnostico.md) | Como o Guia é hoje: stack, arquivos, APIs, banco, vídeos, checklists, ambiente |
| 02 | [Fontes de conhecimento](02-fontes-de-conhecimento.md) | O Harness Faktory Flow, a base indexada e as regras que valem para todo conteúdo |
| 03 | [Arquitetura proposta](03-arquitetura-proposta.md) | Navegação, base de conhecimento compartilhada, rotas, APIs, migrações |
| 04 | [Visibilidade e permissões](04-visibilidade-e-permissoes.md) | Controles administrativos, apostila em standby, bloqueio por URL e por API |
| 05 | [Mapa de módulos](05-mapa-de-modulos.md) | Cada módulo da plataforma × fontes reais (checklists, roteiros, vídeos, regras) |
| 06 | [Auditoria dos conteúdos antigos](06-auditoria-conteudos.md) | O que fica, o que é reescrito, o que vai para o acervo |
| 07 | [Design e motion](07-design-e-motion.md) | Direção visual, tokens, cards, animações, acessibilidade, decisão de bibliotecas |
| 08 | [Produção de vídeos e manuais](08-producao-videos-e-manuais.md) | Pipeline audiovisual, regras do Harness, presets, QA, manuais visuais |
| 09 | [Pendências e como retomar](09-pendencias-e-como-retomar.md) | Bloqueios (login, Mac, Voice Studio) e o passo a passo para continuar |
| 10 | [Fases, agentes e coordenação](10-fases-agentes-coordenacao.md) | As 7 fases, os 6 subagentes, quem mexe em qual arquivo |
| 11 | [Critérios de aceite](11-criterios-de-aceite.md) | Checklist de conclusão da refatoração |

A pasta [`descobertas/`](descobertas/) guarda os arquivos estruturados que os agentes usam para
compartilhar o que encontraram (um arquivo por agente, sem edição cruzada).

## Resumo da ideia em uma página

- **Três áreas principais:** **Página Inicial** (a antiga "Guia do Consultor" renomeada, vitrine visual
  dos módulos em cards interativos), **Guia Inicial** (trilha didática para novos colaboradores e
  estagiários) e **Guia do Consultor** (central avançada para implantação, configuração e validação).
- **Uma base de conhecimento, duas apresentações.** O mesmo conteúdo verificado (regras de negócio,
  telas, fluxos, checklists, vídeos) alimenta as duas jornadas com profundidades diferentes, sem
  duplicar arquivos: cada material tem metadados (módulo, tipo, público, nível, versão, status…).
- **Controle administrativo de visibilidade** persistido no banco, com bloqueio real por URL e por API.
  A **apostila antiga fica em standby** (oculta, sem perder dados, reativável).
- **Conteúdo fiel ao sistema.** Tudo vem do **Harness Faktory Flow** (`Pcamargoz/Harness-Arquitetura-Flow`):
  197 fontes, 5.723 trechos, 39 regras de negócio verificadas, roteiros de treinamento, manuais oficiais.
  Prints e vídeos só do ambiente de **staging/homologação**, com dados fictícios. Módulo sem material
  pronto mostra **"Em preparação"** — nunca conteúdo inventado.
- **Vídeos** no motor v6 (Remotion) já existente em `videos/`, com narração na voz L (Voice Studio, no Mac
  do responsável), música sintetizada, legendas e checagem automática (`videos/scripts/qa.mjs`).
- **Design expressivo e acessível:** identidade Faktory Flow (azul `#3478A7`, lima `#D5DD26`), cards com
  hover animado e prévia dos materiais, transições entre páginas, skeletons, `prefers-reduced-motion`.
- **Docker local** ao final, preservando volumes, para homologação conjunta.

## Repositórios envolvidos

| Repositório | Papel |
|---|---|
| `Pcamargoz/Guia-Do-Consultor` (este) | A plataforma: front-end em `public/`, API em `api/` + `lib/`, banco em `db/`, vídeos em `videos/` |
| `Pcamargoz/Harness-Arquitetura-Flow` | **Fonte da verdade** do Faktory Flow: base de conhecimento, regras, workflows, MCP `faktory-doc`, motor de vídeo (docs) |
| `Pcamargoz/Harness-Architecture` | Harness genérico de agentes (vault Hermes); recebe as arquiteturas de skills audiovisual e frontend |
