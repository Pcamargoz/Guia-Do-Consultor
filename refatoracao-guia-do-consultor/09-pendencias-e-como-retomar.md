# 09 — Pendências, bloqueios e como retomar

## Bloqueios em 04/11/2026

| # | Bloqueio | Por quê | Como resolver |
|---|---|---|---|
| 1 | **Login no Faktory Flow (staging)** | Regra do Harness: o agente **nunca pede, digita ou guarda senha**; o usuário faz o login. Numa sessão na nuvem, o navegador do agente não tem como receber esse login | Rodar a sessão do Claude Code **no Mac** (app Claude Desktop) e usar o navegador embutido: o responsável abre `https://staging.flow.faktory.com.br` e faz o login; o agente navega e grava |
| 2 | **Voice Studio** | Roda só no Mac do responsável | Mesma sessão no Mac; `videos/scripts/narrar.mjs` |
| 3 | **Pasta `Downloads/flow`** | Está no Mac; nenhuma pasta compartilhada com a sessão na nuvem | O mesmo conteúdo está em `Pcamargoz/Harness-Arquitetura-Flow`; no Mac, abrir a sessão a partir dessa pasta |
| 4 | MCP `faktory-doc` não conectado na sessão | `.mcp.json` sobe o servidor pelo `uv` localmente | No Mac: `instalar.ps1`/`COMO-CONECTAR.md` e aprovar no `/mcp`. Na nuvem já foi possível usar o pacote direto pelo `uv` |
| 5 | Ações que gravam dados no staging | Precisam de autorização do responsável **por ação** | Pedir caso a caso (ex.: criar o pedido de treino) |

Rede: os domínios `staging`, `dev` e `flow.faktory.com.br` **já respondem** a partir do ambiente de nuvem.

## Como retomar (passo a passo)

1. No Mac, abrir o Claude Code (app Claude Desktop) em uma pasta com os três repositórios:
   `Guia-Do-Consultor`, `Harness-Arquitetura-Flow` (ou `Downloads/flow`) e `Harness-Architecture`.
2. No Guia, usar o branch `claude/magical-edison-xe74he` e ler esta pasta (`refatoracao-guia-do-consultor/README.md`).
3. Conectar o MCP `faktory-doc` (`COMO-CONECTAR.md` do Harness) e rodar `faktory-doc kb ingest`.
4. Abrir `https://staging.flow.faktory.com.br` no navegador embutido e **fazer o login** (o agente não vê a senha).
5. Executar as fases de [10](10-fases-agentes-coordenacao.md) a partir da Fase 2.
6. Para o Docker local ao final:
   ```bash
   cp .env.example .env   # preencher SESSION_SECRET e ADMIN_PASSWORD
   docker compose -p faktory-manual up -d
   docker compose -p faktory-manual logs -f app
   ```
   Endereço: http://localhost:8081. **Nunca** usar `down -v` (apaga o volume `faktory-manual-banco`).

## Pendências de conteúdo (precisam de pessoa ou de tela)

- Revalidar na tela (versão atual) os passos `d`/`n` da trilha do estagiário e os itens `naoValidado`.
- Decidir com a gestora de produto o escopo de Relatórios e Alumina.
- Aprovar (humano, CLI do Harness) cada manual antes de publicar.
- Autorizar a renderização/narração de cada vídeo novo ou refeito.
