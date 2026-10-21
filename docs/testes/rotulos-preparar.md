# Brief — conferir os rótulos dos blocos "Preparar seus dados"

Regras comuns: [_regras-comuns.md](_regras-comuns.md). Relatório: `scratchpad\relatorio-qa\46-rotulos-preparar-<A|B>.md`, gravado a cada checklist.

**Objetivo.** Os blocos "1. Preparar seus dados" dos checklists do estagiário foram escritos a partir dos fluxos dos consultores. Já houve texto errado por nome de seção (Origem do Lead fica em "Informações CRM", não em "Dados CRM"). Aqui só se **lê a tela**: abra cada formulário ou menu, compare **cada rótulo, botão, menu e mensagem** citado abaixo com o que aparece, e devolva o texto corrigido.

**Regras desta rodada.** **Não salve, não confirme, não finalize, não gere nada**: abra e feche (Cancelar ou o X; evite Esc em painéis que perdem o formulário). Não crie nem altere registros. Registros de apoio que já existem no DEV: PV-000033 (Entregue), PV-000034 (Em aberto, com obra), PC-000010 (Em Aberto), SC-000290, produtos 3638 e 3639, obra "TESTE FLUXO CONSULTOR - Obra Comercial". Navegue pelos menus (sem digitar URL completa). Aba `seed` apenas.

**Como responder (por passo):** `OK` ou `DIVERGE`, e se diverge o texto corrigido com os rótulos **copiados da tela** (maiúsculas, acentos, pontuação, `*` de obrigatório). Anote também: campos obrigatórios que o texto não cita, o que o estagiário precisaria saber (permissão, cadastro-base) e qualquer menu que não existe com aquele nome.

## Parte A — checklists 02, 04, 07 e 06

### 02 · Cadastros (`Cadastros > Participantes`, `Produtos`, `Projetos`)
1. Novo participante: **Tipo (PF/PJ)**, **Razão Social / Nome**, CPF/CNPJ, CEP, número, chave **É Cliente?**, e-mail de contato, botão **Salvar**. Em que seção cada um fica?
2. Mesmo participante: **Conta de Fluxo de Caixa Receita** e **Inscrição Estadual/RG**. Em que seção? Há valor "ISENTO"?
3. Novo produto: **unidade de medida**, **NCM**, **Origem da Mercadoria**, **Salvar**. Quais campos são obrigatórios? Onde fica cada um?
4. Novo projeto: **Nome**, **Código**, status, cliente, responsável, **Salvar**.

### 04 · Vendas (`Vendas > Pedidos de Venda > + Novo Pedido`)
1. **Empresa**, **Cliente**, **Vendedor**, **Condição de Pagamento**, **Projeto**, **CFOP** (só libera depois de empresa e cliente?).
2. Adicionar item: diálogo **Dados do Item** (altura, largura, comprimento, peso, cor) e botão **Aplicar**.
3. Parcela: **Meio de Pagamento**, **Portador**; no Resumo, **Conta de Fluxo de Caixa**.
4. Botão **Salvar e Permanecer** (e os outros botões de salvar).

### 07 · Estoque (`Estoque > Movimentos > + Novo Movimento`)
1. Tipo **Entrada manual**, local de destino, item, **custo unitário**, atalho **Ctrl+S**. Liste os tipos de movimento disponíveis e os rótulos dos campos.
2. `Estoque > Saldo`: busca por código/descrição e as colunas SALDO e VALOR TOTAL.

### 06 · Recebimento (menu `⋯` do PC-000010 em `Compras > Pedidos de Compra`)
1. Item **Gerar Nota de Recebimento** (existe com esse nome? o PC "Em Aberto" permite?). Abra o formulário, liste os campos e **cancele**. Onde aparece depois a nota "NF-" / "NR-"?

## Parte B — checklists 09, 11, 12 e 13

### 09 · Serviços (`Serviços > Medições > + Nova Medição`)
1. Escolha do **pedido de venda**, **Empresa**, **Técnico**, equipe, data, botões **Salvar** e **Agendar** (quando aparece o Agendar?). Cancele.

### 11 · Expedição
1. No menu `⋯` do PV-000033 e do PV-000034: o item **Liberar para Expedição** existe, está habilitado ou desabilitado e com que texto?
2. `Expedição > Montar Nova Carga`: campos (pedido, veículo, data de saída, motorista) e botão **Montar Carga**. Abra a tela e saia sem montar.

### 12 · Faturamento
1. No menu `⋯` do PV-000034: item **Faturar**. Abra o formulário (**Observações Internas**, botões **Salvar e Permanecer** etc.), liste os campos e **cancele sem salvar**. Mostra a faixa "Ambiente NF-e: HOMOLOGAÇÃO"?

### 13 · Financeiro
1. No menu `⋯` do PV-000034 e do PV-000033: item **Gerar Títulos** (habilitado? com que texto quando desabilitado?). **Não confirme.**
2. `Financeiro > Contas a Receber`: nomes das colunas (documento, parcela, vencimento, valor, situação) e como achar o título do PV-000033.

## Entrega
`Status: done | partial | blocked`, `Result`, `Evidence`, `Open items`, e por passo `OK`/`DIVERGE` com o **texto corrigido sugerido**; defeitos novos; confirme que nada foi salvo, confirmado ou gerado.
