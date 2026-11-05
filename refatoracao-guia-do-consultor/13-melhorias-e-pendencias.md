# 13 — Melhorias implementadas e pendências reais (05/11/2026)

Continuação do [12](12-diagnostico-e-plano-v2.md). Tudo na worktree `HTML-MANUAL-centralizado` (branch
`fe/FE-20261104-01/centralizado`), **sem commit** até ordem do responsável. Ambiente de teste: Docker isolado
`127.0.0.1:8082` (banco `faktory_centralizado`).

## 1. Interface (redesign v2.2)

| Área | Antes | Agora | Arquivos |
|---|---|---|---|
| Navegação | Menu lateral + barra com as mesmas 9 abas; seções do guia antigo sempre no menu | Menu lateral único (Aprender / Ferramentas / Acervo); barra do topo mostra onde a pessoa está (área › módulo); celular: barra inferior (Início, Guia Inicial, Consultor, Menu) + gaveta | `public/plataforma-shell.css`, `public/guia-abas.js` |
| Página Inicial | Título + números; cards metade vazios; no celular 15.000 px | Caminhos de aprendizagem (Guia Inicial × Guia do Consultor) com o que contém e quanto está publicado; cards compactos com folha de materiais flutuante; celular 5.900 px | `public/plataforma-ui.js`, `public/plataforma.css` |
| Trilha (Guia Inicial) | Lista simples | Fases do processo da empresa, progresso total, botão Começar/Continuar, etiquetas de material por módulo | idem + `public/plataforma-guia.css` |
| Guia do Consultor (índice) | Lista simples | Mesmas fases + filtro de módulos | idem |
| Página do módulo | Caixas brancas iguais, trilha de navegação duplicada | Cabeçalho na cor do módulo com fatos (seções, telas ilustradas, passos), troca de jornada no mesmo módulo, leitura em coluna editorial, sumário que acompanha a leitura (faixa rolável no celular) | idem |
| **Guia visual ilustrado** | — | Conceitos ("Entenda primeiro"), mapa no fluxo, palavras da tela, capítulos com passos numerados e **capturas reais anotadas v2** (moldura no elemento + número fora dele + zoom numerado + legenda com explicação), ampliar imagem, bloco "Para o consultor", aviso de rascunho | idem + `refatoracao-guia-do-consultor/contrato-guia-visual.md` |
| Acabamento | Rótulos acima de títulos, faixas laterais grossas, formas decorativas sobre o texto | Removidos (detector Impeccable); formas só na Página Inicial; seleção e rolagem com as cores da marca | — |
| Segurança | `/manuais/*` só respeitava o tipo | Também respeita a visibilidade do módulo pela pasta (404 se oculto) + testes | `lib/visibilidade.js`, `scripts/testes/visibilidade.test.mjs` |

Validação: navegador em 1440, 1280 e 375 px; `npm run testar` = 190/191 (a falha é anterior: depende de
`/workspace/estudio-audiovisual`, que só existia na nuvem).

## 2. Conteúdo

- Guias visuais em `public/manuais/<modulo>/guia.json` para os 19 módulos, produzidos por 3 especialistas a partir do
  MCP `faktory-doc`, checklists, roteiros e capturas reais, e revisados no padrão **v2 dos marcadores** (moldura +
  número fora + zoom numerado + explicação), pedido do responsável em 05/11. Registros: `descobertas/documentacao-{a,b,c}.md`.
- Conferência final (05/11): **200 passos, 148 com imagem, 116 telas reais, 544 marcadores — 0 no formato antigo,
  0 imagens faltando**; as 116 imagens respondem 200 `image/webp` pelo servidor (com a regra de visibilidade); as 38
  páginas de módulo (19 × 2 jornadas) abrem sem erro. Relatórios e Alumina só com conceitos (base sem regra/tela).
  6,7 MB no total.

| Módulo | Passos | c/ imagem | Imagens | Marcadores |
|---|---|---|---|---|
| primeiros-passos | 9 | 5 | 3 | 22 |
| fundacao | 11 | 3 | 3 | 12 |
| crm | 13 | 11 | 11 | 41 |
| cem | 13 | 6 | 4 | 16 |
| vendas | 20 | 12 | 11 | 39 |
| compras | 13 | 9 | 8 | 36 |
| recebimento | 14 | 11 | 6 | 38 |
| estoque | 13 | 13 | 7 | 47 |
| producao | 9 | 6 | 4 | 25 |
| servicos | 11 | 8 | 4 | 34 |
| projetos | 9 | 7 | 3 | 24 |
| expedicao | 9 | 6 | 4 | 24 |
| faturamento | 12 | 12 | 10 | 40 |
| fiscal | 13 | 9 | 8 | 36 |
| financeiro | 14 | 14 | 14 | 55 |
| tarefas | 7 | 7 | 7 | 25 |
| fluxo-completo | 10 | 9 | 9 | 30 |

- Nomes confirmados no staging v1.23.2: "Aguardando manifestação", "Inventários", Projetos › Painel Financeiro de
  Projetos, "+ Montar Nova Carga", Notas Fiscais = Documentos Fiscais (mesma tela), "Diagnóstico Fiscal",
  Configurações › Empresas, + Novo Participante / + Nova Empresa / + Nova Cotação / + Nova Atividade.
- Divergências novas (em `pendencias` de cada guia): inventário Geral × Cíclico/Pontual (tela) vs "congela o local"
  (base); empréstimo Devolvido exibido "3 dias atrasada"; Liberar para Expedição só Faturado × Faturado ou Encerrado;
  aba "Conciliação" no PIX; staging abre Upgrade › Alumina no painel de Serviços.
- Servidor local: `scripts/dev-server.mjs` passou a servir `.webp/.jpg/.mp4/.vtt` com o tipo certo (antes octet-stream).
- 42 capturas novas do **staging v1.23.2** (05/11/2026), só leitura, em `videos/capturas/guias-staging/`
  (ignorada pelo git; cabeçalho com usuário/tenant borrado; demais dados sensíveis borrados ao converter para o guia).

## 3. Vídeo

- Piloto `intro-vendas` (sem narração, 47 s, música sintetizada 120 BPM, −14 LUFS): composição nova
  `videos/src/IntroVideo.tsx` sobre os brutos recortados/borrados; prévia em `videos/out/intro-vendas-previa.mp4`
  (não publicada). Padrão em `videos/INTRO-LEIA-ME.md`.

## 4. Pendências reais

| # | Pendência | Quem |
|---|---|---|
| 1 | Aprovar (ou pedir ajustes) o vídeo-piloto; decidir se valores/nomes fictícios na tela devem ser borrados | Responsável |
| 2 | Remover os rótulos "GUIA INICIAL"/"PRÓXIMO PASSO" acima dos títulos no vídeo (padrão visual) | Vídeo |
| 3 | Capturas que dependem de abrir diálogos/menus (Finalizar, Estornar, Pagar, Faturar, menu ⋯) — exigem cliques; só com autorização por ação, em homologação | Responsável + coordenador |
| 4 | Divergências de nome/caminho entre fontes (lista em `descobertas/documentacao-*.md`) → conferir na tela e levar à `conhecimento/fila-de-correcao.md` do Harness | Funcional |
| 5 | Guias são **rascunho**: validação na tela por passo (`registrar_validacao_tela`) e aprovação humana | Responsável |
| 6 | Intros de CRM e Financeiro (têm bruto); demais 16 módulos sem gravação bruta | Vídeo |
| 7 | Regra do Harness para o formato "introdutório sem narração" (só com pedido explícito — CLAUDE.md item 8) | Responsável |
| 8 | ~~Progresso do Guia Inicial não era salvo~~ **Resolvido 05/11**: o checklist de aprendizado grava em `/api/checklists-progresso` (chave `inicial:<modulo>`) e a trilha lê o resumo — testado (marcar 3/15 em Vendas → recarregar mantém; trilha mostra 20%) | — |
| 9 | `.codex/hooks.json` criado pela atualização do Impeccable dentro da worktree — não commitar; apagar se não for desejado | Responsável |
| 10 | Commit/PR da branch | Responsável |
