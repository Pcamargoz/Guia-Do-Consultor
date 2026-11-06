# Descobertas — documentação B (guias visuais: recebimento, estoque, produção, serviços, projetos, expedição)

## 2026-11-05 · documentacao-b · Guias visuais de 6 módulos (rascunho)
- Descoberta: `public/manuais/<modulo>/guia.json` + `img/*.webp` criados para recebimento, estoque, producao, servicos,
  projetos e expedicao, no formato de `contrato-guia-visual.md`. Status `rascunho` em todos (aprovação é humana).
- Evidência: capturas reais de `videos/public/telas/**` (v1.22.13, 19–29/10/2026), tratadas com ffmpeg (1600 px, webp q82,
  borrão em selo do tenant, avatar/nome do usuário, CNPJ/CPF, valores, placa/modelo do veículo, endereço de entrega,
  coluna Empresa). Marcadores medidos na imagem final e conferidos em prévias com caixas desenhadas
  (`%TEMP%\guias-previa\`, fora do repositório). Textos com fonte: MCP `faktory-doc` (kb_search, glossary_lookup),
  `lib/conteudo/base/<modulo>.json`, `scripts/dados-checklists-estagiarios.mjs`, `scripts/dados-checklists-implantacao.mjs`,
  `videos/roteiros/consultor-0{1,2,4,5,6,9}-*.json`.
- Impacto: os 6 módulos passam a ter conceitos, mini-glossário, mapa no fluxo, tour ilustrado (básico + avançado) e bloco do consultor.
- Próximo passo / pedido: capturas listadas abaixo (coordenador, no staging) e validação na tela antes de aprovar.

| Módulo | Conceitos | Palavras | Capítulos (básico/avançado) | Passos | Passos ilustrados | Imagens |
|---|---|---|---|---|---|---|
| recebimento | 5 | 8 | 4 (3/1) | 12 | 8 | 5 |
| estoque | 5 | 9 | 4 (3/1) | 10 | 10 | 7 |
| producao | 5 | 8 | 4 (3/1) | 9 | 6 | 4 |
| servicos | 5 | 8 | 4 (3/1) | 10 | 7 | 4 |
| projetos | 5 | 8 | 4 (3/1) | 8 | 6 | 3 |
| expedicao | 5 | 8 | 4 (3/1) | 9 | 6 | 4 |

Fontes principais por módulo:
- recebimento: regra-recebimento-a-mesma-nota-tem-dois-numeros, funcional-compras-solicitacoes-pedidos-e-recebimento#003,
  manual-05-recebimento#004/#008, roteiro-recebimento-01…#046/#058, oficial-rec-c-implantacao#010; capturas consultor-01-suprimentos e compra-em-nome-do-cliente (36, 37).
- estoque: regras saldo-nasce-de-movimentos, transferencia-pendente-reserva, inventario-congela-o-local, emprestimo-devolucao,
  almoxarifado-central-ativo; roteiro consultor-04-estoque; capturas consultor-04-estoque + consultor-01-suprimentos/03.
- producao: regras op-copia-o-item, requisicoes-nascem-da-estrutura, item-parametrico-exige-cor, marcar-produzido;
  funcional-producao-ordens-de-producao-e-separacao#000; capturas consultor-05-producao.
- servicos: regras medicao-nasce-do-pedido, botao-agendar, conferente-diferente, passagens-por-botao; capturas consultor-02-servicos.
- projetos: manual-12-projetos-e-tarefas#003/#006, plano-projetos#012/#044, regra-vendas-editar-pedido-somente-em-aberto; capturas consultor-09-projetos.
- expedicao: regra-vendas-liberar-para-expedicao-so-em-pedido-faturado, manual-09-expedicao#001/#009, plano-expedicao#019,
  roteiro-expedicao-03…#025; capturas consultor-06-expedicao.

### Capturas pedidas (staging)
- Recebimento: menu ⋯ do pedido de compra com Gerar Nota de Recebimento; janela Finalizar Nota de Recebimento; Dashboard
  Recebimento; fila de conferência e tela de conferência; Parâmetros de Recebimento; Importar XML.
- Estoque: Visão geral; Saldo › Detalhe (Posições/Histórico); Saldo com coluna RESERVADA; Locais; Saldo › Mais › Importar
  saldo; transferência pendente; inventário em contagem e Aprovações › Inventários.
- Produção: painel Nova OP; menu ⋯ da OP; Materiais necessários; Marcar produzido; Painel de fábrica; Visão geral e Estrutura de produto.
- Serviços: Nova Medição (lista de pedidos); Importar Itens do Pedido; lista de Medições com % MEDIDO; Dashboard Serviços;
  Parâmetros e Conferentes; vistoria com Gerar Assistência Técnica; Cockpit de Campo.
- Projetos: Novo Projeto; painéis Etapas e Estágios; Todos os Projetos; pedido em edição com Projeto (opcional); Diário de Obra.
- Expedição: Montar Nova Carga; carga Fechada com checkpoints; bipagem; Iniciar Rota; Configurações › Parâmetros;
  Ocorrências / Aguardando Re-Expedição / Pendências de Estoque (Devolução).

### Divergências registradas (a conferir na tela)
- Recebimento: fila de conferência chamada **Aprovações** (manual-05-recebimento#008, trilha do estagiário) × **Conferências**
  (oficial-rec-c-implantacao#010, roteiro 01 #046 e menu da captura de 19/10).
- Recebimento: menu **Aguardando manifestação** (captura de 19/10) × **Notas pendentes** (captura de 29/10).
- Estoque: menu **Inventários** (captura) × `Estoque › Inventário` (checklist de implantação).
- Produção: marcar Produzido com etapas pendentes — encerradas pela conclusão (roteiro-producao-01#055) × bloqueado (plano-producao#025).
- Projetos: painel em `Financeiro › Painel Financeiro de Projetos` (trilha/checklist) × `Projetos › Painel Financeiro`
  (roteiro-projetos-03#009) × caminho `Projetos › Painel` na captura; `Cadastros › Projetos` (menu) × `Configurações › Projetos` (caminho no topo da captura).
- Serviços: menu **Assistência Técnica** × caminho **Assistencias** no topo da mesma captura.
- Expedição: `Expedição › Visão Geral › + Montar Nova Carga` (checklist de implantação) × botão em `Expedição › Cargas` (captura).

### Não verificado
- Nada foi conferido numa sessão do Flow (validação na tela pendente). Glossário do Harness não tem a maioria dos termos
  destes módulos (glossary_lookup devolve "aparece literalmente na base"); nomes vieram da base e das capturas.
- A captura `consultor-fluxo-completo/04-producao.png` é idêntica a `consultor-05-producao/01-op-lista.png` e
  `03-medicao.png`/`06-expedicao.png` repetem capturas dos módulos; não foram usadas em duplicidade.

## Revisão v2 dos marcadores (05/11/2026)

Guias de recebimento, estoque, producao, servicos, projetos e expedicao convertidos para o padrão "v2 dos marcadores"
(`contrato-guia-visual.md`): todo passo com imagem usa `caixa` + `lado` + `explicacao`, no máximo 5 marcadores, `zoom`
onde os itens são pequenos ou próximos, sem `destaque` combinado com vários marcadores. Textos dos passos reescritos
(o que fazer + o que observar). Status segue `rascunho`.

| Módulo | Passos com imagem | Marcadores v2 | Zooms | Passos novos (divisão ou imagem nova) |
|---|---|---|---|---|
| Recebimento | 11 | 38 | 5 | Nova nota dividida (dados × Salvar); Importar XML separado do menu; manifestação ganhou imagem |
| Estoque | 13 | 47 | 5 | Saldo dividido (linha certa × Saldo/Disponível); Movimentos dividido (filtros × linha); Empréstimos dividido (cartões × linha) |
| Produção | 6 | 25 | 4 | — |
| Serviços | 8 | 34 | 3 | Medição dividida (abas × Dados Gerais) |
| Projetos | 7 | 24 | 3 | Cartões do painel divididos em dois passos |
| Expedição | 6 | 24 | 2 | — |

- Imagem nova: `public/manuais/recebimento/img/06-aguardando-manifestacao.webp` (de `videos/capturas/guias-staging/recebimento-pendentes.png`,
  staging v1.23.2; sem dados pessoais visíveis; 1600 px, webp q82). Não foram gerados recortes de detalhe: os zooms cobrem os itens pequenos.
- Conferência: prévias com as molduras e os números desenhados (ffmpeg) em `%TEMP%\guias-previa-b\` (tela inteira e recorte do zoom), olhadas uma a uma.
- Fontes das explicações: base do Harness (oficial-rec-*, manual-05, regras de estoque/serviços), roteiros `videos/roteiros/consultor-0*.json`,
  `scripts/dados-checklists-*.mjs` e o texto da própria captura.

### Capturas do staging v1.23.2 (05/11/2026) — o que resolveram
- **Recebimento:** menu mostra **Aguardando manifestação** (resolvido; "Notas pendentes" não aparece). Nem Conferências nem Aprovações aparecem
  (conferência física desligada): essa divergência continua aberta.
- **Estoque:** menu mostra **Inventários** e **Inventário — Contagem** (resolvido). **Divergência nova:** a tela Inventários diz que o inventário
  Geral bloqueia o local e que Cíclico/Pontual bloqueiam só os produtos selecionados (a regra da base fala em congelar o local).
- **Projetos:** o painel fica em **Projetos › Painel Financeiro de Projetos** (módulo Projetos; resolvido; trilha/checklist citam Financeiro).
  Cadastros × Configurações › Projetos continua aberta.
- **Serviços:** menu e título **Assistência Técnica**, caminho no topo **Assistencias** (confirmado, segue como observação). A captura
  `servicos-dashboard` abriu Upgrade › Alumina (IA), não o painel.
- **Expedição:** **+ Montar Nova Carga** existe em Visão Geral e em Cargas (resolvido). Menu confirma Ocorrências, Aguardando Re-Expedição e
  Pendências de Estoque (Devolução).
- **Divergência nova (estoque, captura 05-emprestimo de 1.22.13):** PRAZO "3 dias atrasada" num empréstimo já Devolvido (4/4).
- Só como evidência de nome/caminho (não convertidas em imagem nesta rodada): recebimento-dashboard, estoque-visao-geral,
  estoque-inventarios, producao-dashboard, servicos-dashboard, servicos-assistencias, projetos-todos, projetos-painel-financeiro,
  expedicao-visao-geral, expedicao-cargas, expedicao-ocorrencias. Algumas mostram nomes de clientes e valores (ex.: projetos-todos,
  recebimento-dashboard) e exigiriam borrão. As demais capturas da lista não foram abertas.

## Capricho (05–06/11/2026) — iniciante + consultor veterano

Rodada final nos guias de recebimento, estoque, producao, servicos, projetos e expedicao: capturas do staging v1.23.2
(`videos/capturas/guias-staging/`) tratadas com borrão (valores em R$, nomes de clientes/obras/equipes, IDs de cliente/técnico,
placa/veículo/motorista), olhadas antes e depois; webp 1600×900 q82. Todo passo básico tem imagem anotada v2. Bloco `consultor`
v2.1 preenchido (configuracoes, integracoes, roteiroDemonstracao) com fontes do checklist de implantação, da base do Harness e de
`lib/conteudo/base/<modulo>.json`. Status segue `rascunho`.

| Módulo | Passos (com imagem) | Básicos com imagem | Imagens novas | Config. / Integr. / Roteiro / Implant. / Perguntas / Erros |
|---|---|---|---|---|
| Recebimento | 15 (13) | 10/10 | 07-notas-staging, 08-nova-nota-escolher, 09-dashboard | 6 / 7 / 8 / 8 / 7 / 7 |
| Estoque | 17 (17) | 11/11 | 08-visao-geral, 09-movimentos-filtros, 10-inventarios-tipos, 11-reposicao | 6 / 7 / 7 / 7 / 7 / 7 |
| Produção | 13 (11) | 11/11 | 05-nova-op, 06-painel-de-fabrica, 07-separacao-de-materiais, 08-visao-geral | 7 / 8 / 7 / 8 / 5 / 7 |
| Serviços | 17 (14) | 14/14 | 05-nova-medicao, 06-medicoes-lista, 07-instalacoes-lista, 08-cockpit-de-campo | 8 / 7 / 8 / 7 / 6 / 7 |
| Projetos | 13 (12) | 10/10 | 04-lista-de-projetos, 05-todos-os-projetos, 06-painel-escolher-obra, 07-andamento-das-obras | 6 / 6 / 8 / 7 / 5 / 6 |
| Expedição | 14 (13) | 6/6 | 05-visao-geral, 06-cargas-staging, 07-conferencia, 08-ocorrencias, 09-pendencias, 10-roteirizacao | 8 / 7 / 8 / 7 / 5 / 5 |

Sem imagem (sem captura): recebimento — 2 passos da conferência física; produção — requisições e Marcar produzido; serviços —
diálogo de itens, medir vãos, aprovação; projetos — local de estoque da obra; expedição — Parâmetros (checkpoints).
Não usadas: `servicos-dashboard` (abriu Upgrade › Alumina) e `servicos-diario-obra`.

### Divergências novas (a conferir na tela; também em `pendencias` de cada guia)
- Recebimento: lista do staging mostra NR-000004, a regra diz que a lista mostra NF-.
- Estoque: inventário Geral bloqueia o local × Cíclico/Pontual só os produtos (tela) × base "congela o local"; Reposição "até o
  máximo" (tela) × COM-SUG-001 (máximo não usado).
- Produção: dica do campo Empresa da Nova OP ("em branco, herda do pedido") × procedimento/teste (obrigatória); Painel de fábrica
  com Kanban/Timeline/Tabela/Gantt (tela) × Cards/Lista/Timeline (checklist) — guia segue a tela.
- Serviços: staging sem "Aprovações" no menu × erro comum "duas Aprovações"; Configurações › Config. Serviços × Serviços ›
  Configurações; linha de Instalações com número fora do formato INS-.
- Projetos: topo da lista em Configurações › Projetos; menu tem Insumos da Obra e não Diário de Obra; botão Cronograma sem fonte.
- Expedição: telas Separação/Conferência/Carregamento × checkpoints no detalhe da carga (mesmo registro?); Pendências de Expedição
  fora do manual-09; coluna Separado (Cargas) × Fechada (Visão Geral); licença PRO da roteirização não descrita.

### Verificado
JSON dos 6 guias abre; todas as imagens referenciadas existem e nenhuma sobra sem uso; `previa.js` sem problemas nos 6 módulos
(80 prévias em `%TEMP%\guias-capricho-b\previa\`), prévias novas olhadas inclusive zooms. Validação na tela do Flow continua pendente.
