# 10 — Fases, subagentes e coordenação (R-A100 a R-A104)

## Fases

| Fase | Entregas | Situação |
|---|---|---|
| **1 Diagnóstico** | Análise do projeto, Harness e MCP validados, motor de vídeo identificado, módulos mapeados, auditoria, plano | ✅ Concluída — esta pasta |
| **2 Nova arquitetura** | Rotas das 3 áreas, `013_visibilidade.sql`, `/api/visibilidade`, `/api/conteudo`, middleware com visibilidade, gerador da base, acervo preservado | A fazer |
| **3 Redesign** | `plataforma.css`, Página Inicial com cards, Guia Inicial, Guia do Consultor, transições, responsividade, a11y | A fazer |
| **4 Conteúdos didáticos** | Manuais resumidos, vídeos introdutórios, checklists de aprendizado, fluxos básicos | Depende de login no staging + Voice Studio |
| **5 Conteúdos avançados** | Regras extraídas/validadas, manuais completos, fluxos de implantação, vídeos avançados, checklists revisados | Depende de login + aprovação humana |
| **6 Testes e validação** | Páginas, permissões, visibilidade, documentos, vídeos, persistência, testes automáticos, performance, regressões | A fazer |
| **7 Docker local** | Compose analisado, migrações seguras, contêineres, logs, front↔back↔banco, endereços | A fazer |

## Subagentes e responsabilidades

| Agente | Faz | Arquivos que pode alterar | Arquivo de descobertas |
|---|---|---|---|
| **Arquitetura** | Modelagem, rotas, permissões, migração, middleware | `db/migrations/013+`, `lib/visibilidade.js`, `lib/rotas/{conteudo,visibilidade}.js`, `api/index.js`, `middleware.js`, `lib/rotas/pacotes.js` (só a checagem) | `descobertas/arquitetura.md` |
| **UI/UX** | Página Inicial, cards, jornadas, animações, componentes | `public/plataforma*.{css,js}`, `public/guia-abas.js`, `public/index.html` (`<head>` e sidebar), `public/guia-admin.js` (só a seção Visibilidade) | `descobertas/ui-ux.md` |
| **Especialista funcional** | Módulos, fluxos e regras com o MCP `faktory-doc` | `scripts/gerar-base-conhecimento.mjs`, `lib/conteudo/**` | `descobertas/funcional.md` |
| **Documentação** | Manuais iniciais e avançados (rascunhos no Harness) | `public/manuais/**`, `docs/manuais/**` | `descobertas/documentacao.md` |
| **Audiovisual** | Roteiros, gravações, Voice Studio, render, QA | `videos/**`, `public/videos/**` | `descobertas/audiovisual.md` |
| **QA/DevOps** | Testes, Docker, segurança, integração | `scripts/testar-*.mjs`, `docker-compose.yml`, `README.md` | `descobertas/qa-devops.md` |

## Regras de coordenação

1. **Um dono por arquivo** (tabela acima). Precisa mudar arquivo de outro agente → registrar o pedido no
   seu arquivo de descobertas e o dono aplica.
2. **Harness é a fonte central**: toda afirmação funcional cita `fonte_id`/`chunk_id`.
3. Descobertas em formato fixo: data · agente · o que descobriu · evidência (arquivo, fonte, print) · impacto · próximo passo.
4. Ordem de dependência: Funcional (base) → Arquitetura (API) → UI/UX (telas) → Documentação/Audiovisual → QA.
5. Nada de push sem os testes da fase passando (`npm run testar:seguranca`, `testar:checklists-api`, novos testes de visibilidade).
6. Relatório final (R-A104) consolidado a partir dos arquivos de descobertas.
