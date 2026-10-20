# Fila de testes: etapas ainda sem "Verificado"

Gerado por `node scripts/lacunas-checklists.mjs` — 50 etapas em 13 checklists. `doc` = vem dos roteiros, `n/v` = não validado.
Ao validar uma etapa, mude `s` para `'v'` no arquivo de dados do checklist e rode `npm run checklists`. Regras e briefs em [README.md](README.md).

## Primeiros passos e navegação  `01-primeiros-passos-navegacao.html` — 1 etapa(s)

**5. Notificações, ajuda e preferências**
- [ ] (doc) Conhecer a Alumina (Ctrl+Alt+A), a assistente de IA: ela consulta dados e só executa ações depois de confirmação.

## Cadastros básicos  `02-cadastros-basicos.html` — 3 etapa(s)

**Pré-requisitos**
- [ ] (doc) Saber um nome de cliente, um produto e uma obra existentes para consultar (peça ao supervisor).

**3. Consultar um produto** · Cadastros > Produtos
- [ ] (n/v) Abrir a lista de produtos e pesquisar por código ou descrição.

**4. Consultar um projeto/obra** · Cadastros > Projetos
- [ ] (n/v) Abrir a lista de projetos e localizar uma obra.

## CRM: leads e oportunidades  `03-crm-leads-oportunidades.html` — 1 etapa(s)

**Pré-requisitos**
- [ ] (doc) Autorização do supervisor para criar um lead de treino com o nome começando por "TESTE ESTAGIÁRIO".

## Serviços de campo  `09-servicos-campo.html` — 1 etapa(s)

**2. Consultar medições** · Serviços > Medições
- [ ] (n/v) Abrir uma medição e ver os vãos, fotos e histórico.

## Projetos e obras  `10-projetos-obras.html` — 6 etapa(s)

**Pré-requisitos**
- [ ] (doc) Checklists 04 e 09 concluídos.

**2. Consultar a carteira de obras** · módulo Projetos
- [ ] (doc) Abrir a lista/dashboard de projetos e ver as obras que precisam de atenção.
- [ ] (doc) Abrir uma obra e ver cliente, responsável, endereços, estágios e etapas.

**3. Ler o painel financeiro da obra** · Financeiro > Painel Financeiro de Projetos
- [ ] (doc) Escolher a obra e ler receitas, custos e margem.
- [ ] (doc) Ler progresso e material: o que entrou, foi consumido e falta consumir.

**Resultado esperado**
- [ ] (doc) Encontro a obra de um pedido e sei onde ver seu resultado.

## Faturamento e Fiscal (consulta)  `12-faturamento-fiscal.html` — 2 etapa(s)

**2. Conhecer as ações de uma nota (sem executar)** · menu ... da linha
- [ ] (n/v) Usar só as opções de consulta (Ver Timeline, Preview da DANFE) quando o supervisor pedir.

**4. Saber onde ficam os cadastros fiscais** · módulo Fiscal
- [ ] (doc) Saber que NCM, CFOP, CST/CSOSN, CEST e Textos Fiscais são cadastros do Fiscal, mantidos com o contador.

## Financeiro (consulta)  `13-financeiro.html` — 7 etapa(s)

**Pré-requisitos**
- [ ] (doc) Checklists 04, 06 e 12 concluídos.

**2. Consultar títulos** · Financeiro > Contas a Receber e Contas a Pagar
- [ ] (n/v) Filtrar por vencimento e situação e abrir um título.
- [ ] (doc) Ver de qual pedido, nota ou recebimento o título veio.
- [ ] (n/v) Saber que "Pagamentos" é uma aba dentro de Contas a Pagar.

**3. Ler a visão de gestão**
- [ ] (doc) Abrir Fluxo de Caixa e DRE.
- [ ] (doc) Abrir Painel Financeiro de Projetos para ver o resultado por obra.

**Resultado esperado**
- [ ] (doc) Sei explicar de onde vem um título a receber (pedido/nota) e um título a pagar (recebimento de compra).

## Tarefas: quadros e cartões  `14-tarefas.html` — 8 etapa(s)

**Pré-requisitos**
- [ ] (doc) Saber qual quadro você vai usar (combine com o supervisor).

**1. Achar suas tarefas**
- [ ] (doc) Abrir Minhas Tarefas e ver o que está atribuído a você.
- [ ] (doc) Abrir um quadro e alternar as visões: Kanban, lista, tabela, calendário e Gantt.

**2. Trabalhar num cartão**
- [ ] (doc) Criar um cartão "TESTE ESTAGIÁRIO" no quadro combinado.
- [ ] (doc) Preencher responsável, prazo e prioridade; usar o checklist e os comentários do cartão.
- [ ] (doc) Mover o cartão entre as listas conforme o andamento.
- [ ] (doc) Arquivar o cartão de teste no fim.

**Resultado esperado**
- [ ] (doc) Meu cartão de teste aparece em Minhas Tarefas e na coluna certa do quadro.

## Visão do fluxo completo  `15-visao-fluxo-completo.html` — 3 etapa(s)

**Pré-requisitos**
- [ ] (doc) Um pedido faturado ou entregue indicado pelo supervisor para servir de exemplo.

**3. Da nota ao resultado**
- [ ] (doc) Projetos: o painel financeiro da obra soma receitas e custos.

**Resultado esperado**
- [ ] (doc) Consigo mostrar, com as telas abertas, onde o pedido de exemplo aparece em cada módulo.

## Teste do fluxo completo: do pedido à gestão  `teste-fluxo-pedido-ate-gestao.html` — 4 etapa(s)

**7. Financeiro: títulos e baixa** · ⋯ > Gerar Títulos do pedido e Financeiro > Contas a Receber
- [ ] (n/v) Localizar os títulos em Contas a Receber e conferir valor e vencimento com a parcela do pedido.

**9. E-mails e limpeza**
- [ ] (n/v) Abrir a caixa de e-mail de teste e anotar quais etapas enviaram e-mail (nota, boleto, aviso de entrega, serviços).

**Resultado esperado**
- [ ] (doc) Cada módulo mostrou o reflexo da etapa anterior (pedido → medição → OP → nota → carga → títulos).
- [ ] (doc) Os valores conferem entre pedido, nota, títulos e painéis.

## Fluxo de suprimentos: da solicitação ao pagamento  `fluxo-01-suprimentos.html` — 1 etapa(s)

**3. Pedido de compra** · Gerar Pedido de Compra na comparação
- [ ] (doc) Se a alçada estiver ligada, aprovar em Compras > Aprovações.

## Fluxo comercial: do lead ao pedido de venda  `fluxo-03-comercial.html` — 2 etapa(s)

**5. Desconto e aprovação** · aba Itens da oportunidade
- [ ] (n/v) Aprovar em CRM > Vendas > Aprovações ou Vendas > Aprovações com outro usuário. → _Com o mesmo usuário nada aparece para aprovar (e nada avisa o vendedor)._

**Resultado esperado**
- [ ] (n/v) O pedido de venda foi gerado a partir da oportunidade e aparece em Vendas.

## Onboarding do estagiário  `00-onboarding-estagiario.html` — 11 etapa(s)

**Antes do primeiro dia**
- [ ] (doc) Receber usuário e senha pessoais do sistema (não use o login de outra pessoa).
- [ ] (doc) Combinar com o supervisor quais módulos fazem parte da sua rotina e qual perfil de acesso você terá.

**Semana 1 — Navegação e cadastros**
- [ ] (doc) Concluir o checklist 02 · Cadastros básicos (participantes, produtos e projetos).
- [ ] (doc) Anotar no campo de dúvidas tudo que não ficou claro e revisar com o supervisor no fim da semana.

**Semana 2 — O lado comercial**
- [ ] (doc) Concluir 03 · CRM e 04 · Vendas.
- [ ] (doc) Concluir 15 · Visão do fluxo completo para entender para onde o pedido vai depois.

**Semana 3 — Suprimentos e operação**
- [ ] (doc) Concluir 05 · Compras, 06 · Recebimento e 07 · Estoque.
- [ ] (doc) Concluir 08 · Produção, 09 · Serviços e 11 · Expedição.

**Semana 4 — Gestão**
- [ ] (doc) Concluir 10 · Projetos e obras, 12 · Faturamento e Fiscal e 13 · Financeiro.
- [ ] (doc) Concluir 14 · Tarefas e combinar com o supervisor um quadro para acompanhar suas atividades.
- [ ] (doc) Explicar ao supervisor, com as telas abertas, o caminho de um pedido real: CRM → Vendas → operação → Faturamento → Financeiro. → _Você consegue mostrar onde cada etapa aparece no sistema._
