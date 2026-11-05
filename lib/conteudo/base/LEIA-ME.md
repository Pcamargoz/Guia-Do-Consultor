# Base de conhecimento (GERADA — não edite à mão)

Gerada por `node scripts/gerar-base-conhecimento.mjs --harness <pasta do Harness>` (versão 2026-11-04).
Fontes: Harness Faktory Flow (conhecimento/) e dados do Guia gerados do Harness. Cada bloco cita `fontes`.

- `indice.json`: versão, módulos (cabeçalho + materiais), caminhos protegidos e pendências. Basta para o resumo.
- `<modulo>.json`: as jornadas (seções e blocos) de um módulo, lidas só quando o módulo é aberto.
  `retido` = conteúdo semente de módulo em preparação, guardado e nunca servido.
- Leitura: `lib/conteudo/base.js` (fs.readFileSync + JSON.parse, sob demanda, id conferido contra o índice).

Conferir sem gravar: `node scripts/gerar-base-conhecimento.mjs --harness <pasta> --verificar`.

## Marcas de crase (tela / codigo)

- tela pelo glossário de telas do Harness: 113
- tela inferida pelo módulo (caminho de menu fora do glossário cujo 1º segmento é um módulo do índice): 198
- codigo: 217

## Telas inferidas pelo módulo — conferir com conhecimento/glossario/telas.yaml

| texto | módulo | ocorrências |
|---|---|---|
| Compras > Pedidos de Compra | compras | 7 |
| Compras > Aprovações | compras | 4 |
| Compras > Sugestão de Compra | compras | 4 |
| Compras > Configurações > Parâmetros de Compras | compras | 2 |
| Compras > Solicitações de Compra > Nova Solicitação | compras | 2 |
| Compras > Configurações > Faixas de Alçada | compras | 1 |
| Compras > Configurações > Parâmetros | compras | 1 |
| Compras > Cotações de Compra | compras | 1 |
| Compras > Follow-up de Entregas | compras | 1 |
| Compras > Pedidos de Compra > ⋯ | compras | 1 |
| CRM > Vendas > Leads > Kanban de Leads | crm | 3 |
| CRM > Painéis > Visão Geral | crm | 2 |
| CRM > Vendas > Atividades | crm | 2 |
| CRM > Vendas > Leads > Lista de Leads | crm | 2 |
| CRM > Configurações | crm | 1 |
| CRM > Painéis | crm | 1 |
| CRM > Vendas > Leads > Novo Lead | crm | 1 |
| CRM > Visão Geral | crm | 1 |
| Estoque > Movimentos | estoque | 11 |
| Estoque > Locais | estoque | 8 |
| Estoque > Saldo | estoque | 8 |
| Estoque > Inventário | estoque | 2 |
| Estoque > Visão geral | estoque | 2 |
| Estoque > Aprovações > Inventários | estoque | 1 |
| Estoque > Configurações > Locais | estoque | 1 |
| Estoque > Configurações > Parâmetros de Estoque | estoque | 1 |
| Estoque > Empréstimos | estoque | 1 |
| Estoque > Inventários | estoque | 1 |
| Estoque > Reposição | estoque | 1 |
| Estoque > Reservas órfãs | estoque | 1 |
| Estoque > Saldo > Mais > Importar saldo | estoque | 1 |
| Estoque > Transferências | estoque | 1 |
| Expedição > Montar Nova Carga | expedicao | 5 |
| Expedição > Configurações | expedicao | 2 |
| Expedição > Visão Geral > + Montar Nova Carga | expedicao | 2 |
| Expedição > Aguardando Re-Expedição | expedicao | 1 |
| Expedição > Cadastros | expedicao | 1 |
| Expedição > Configurações > Parâmetros | expedicao | 1 |
| Expedição > Configurações > Veículos | expedicao | 1 |
| Expedição > Ocorrências | expedicao | 1 |
| Expedição > Pendências de Estoque (Devolução) | expedicao | 1 |
| Faturamento > Configurações > Certificados | faturamento | 2 |
| Faturamento > Configurações > CFOP | faturamento | 2 |
| Financeiro > Painel Financeiro de Projetos | financeiro | 3 |
| Financeiro > Configurações | financeiro | 2 |
| Financeiro > Saldos | financeiro | 2 |
| Financeiro > Configurações > Boleto | financeiro | 1 |
| Financeiro > DRE | financeiro | 1 |
| Financeiro > Extrato | financeiro | 1 |
| Financeiro > Fluxo de Caixa | financeiro | 1 |
| Financeiro > PIX | financeiro | 1 |
| Fiscal > Configurações > NCM | fiscal | 3 |
| Fiscal > Configurações > CFOP | fiscal | 2 |
| Fiscal > Configurações > Textos Fiscais | fiscal | 1 |
| Fiscal > Diagnóstico Fiscal | fiscal | 1 |
| Fiscal > Escrituração SPED | fiscal | 1 |
| Fiscal > GNRE | fiscal | 1 |
| Fiscal > Onboarding Fiscal | fiscal | 1 |
| Fiscal > Regras Fiscais de Serviço | fiscal | 1 |
| Fiscal > Sintegra | fiscal | 1 |
| Produção > Painel de fábrica | producao | 3 |
| Produção > Visão geral | producao | 3 |
| Produção > Integração de Produção | producao | 2 |
| Produção > Ordens de produção | producao | 2 |
| Produção > Configurações | producao | 1 |
| Produção > Configurações > Estrutura de produto | producao | 1 |
| Produção > Separação de materiais | producao | 1 |
| Produção > Terminal de apontamento | producao | 1 |
| Projetos > Diário de Obra | projetos | 2 |
| Recebimento > Aprovações | recebimento | 4 |
| Recebimento > Notas de Recebimento | recebimento | 3 |
| Recebimento > Conferências | recebimento | 2 |
| Recebimento > Dashboard Recebimento | recebimento | 2 |
| Recebimento > Aguardando manifestação | recebimento | 1 |
| Recebimento > Configurações > CFOP | recebimento | 1 |
| Recebimento > Configurações > Parâmetros de Recebimento | recebimento | 1 |
| Recebimento > Distribuição DFe | recebimento | 1 |
| Recebimento > Notas de Recebimento > ⋮ | recebimento | 1 |
| Recebimento > Notas de Recebimento > ⋮ > Finalizar | recebimento | 1 |
| Recebimento > Notas de Recebimento > Importar XML | recebimento | 1 |
| Serviços > Medições | servicos | 4 |
| Serviços > Configurações > Equipes de Campo | servicos | 3 |
| Serviços > Dashboard Serviços | servicos | 3 |
| Serviços > Cockpit de Campo | servicos | 1 |
| Serviços > Configurações > Conferentes | servicos | 1 |
| Serviços > Instalações | servicos | 1 |
| Serviços > Minha Equipe Agora | servicos | 1 |
| Serviços > Vistorias > + Nova Vistoria | servicos | 1 |
| Tarefas > Arquivadas | tarefas | 2 |
| Tarefas > Dashboard | tarefas | 1 |
| Tarefas > Minhas Tarefas | tarefas | 1 |
| Vendas > Aprovações | vendas | 4 |
| Vendas > Configurações > Configurar integração | vendas | 3 |
| Vendas > Controle de Comissão | vendas | 3 |
| Vendas > Dashboard Vendas | vendas | 3 |
| Vendas > Metas de Vendas | vendas | 3 |
| Vendas > Demonstrativos > Carteira de Pedidos | vendas | 2 |
| Vendas > Pedidos de Venda > Importar CEM | vendas | 2 |
| Vendas > Configurações > Alçadas de Desconto | vendas | 1 |
| Vendas > Configurações > Padrões de Integração | vendas | 1 |
| Vendas > Contratos de Fornecimento | vendas | 1 |
| Vendas > Integrações > Níveis de Faturamento | vendas | 1 |
| Vendas > Pedidos de Venda > Importar CEM Mobi | vendas | 1 |
