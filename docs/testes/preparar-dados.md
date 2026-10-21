# Brief — blocos "Preparar seus dados" ainda sem validação

Regras comuns: [_regras-comuns.md](_regras-comuns.md). Relatório: `scratchpad\relatorio-qa\45-preparar-dados.md`, gravado a cada item.

**Objetivo.** Conferir no DEV (METALURGICA TEST) os 4 passos dos blocos "1. Preparar seus dados" dos checklists do estagiário que estão como *documentação* (`s: 'd'`), e anotar o **caminho exato** de cada um (menu, botão, rótulo de campo, mensagem), porque o texto dos checklists será corrigido com o que for visto. Já houve texto errado por nome de seção (Origem do Lead fica em "Informações CRM", não em "Dados CRM"): copie os rótulos como aparecem na tela.

**Critério de aceite (por item).** Passos executados com o resultado esperado ou com a divergência descrita; número do registro criado/alterado; mensagens exatas; o que o estagiário precisaria saber (permissão, cadastro-base).

Nomeie tudo que criar com `TESTE ESTAGIÁRIO - …`. Não aprove, não finalize, não transmita, não exclua.

## 1. Pedido de compra direto da solicitação (checklist 05, bloco 1)
1. `Compras > Solicitações de Compra > Nova Solicitação`: Empresa, data de necessidade, produto (o 3639 ou outro de teste) e quantidade; salvar. Anote os rótulos dos campos e o número da SC.
2. No menu `⋯` da SC, **Gerar Pedido de Compra** *sem* cotação. O que ele pede (fornecedor? natureza? condição de pagamento?) e qual PC nasce? Se **não** for possível sem cotação, descreva o caminho que funciona (Gerar Cotação → assistente → pedido) com os rótulos.
3. Conferir PC "Em Aberto", "Sem títulos", e a linha do tempo (SC/cotação como Concluída).
Texto atual a confirmar: "No menu ⋯ da solicitação, escolher Gerar Pedido de Compra (a cotação é opcional), conferir a Conta de Fluxo de Caixa sugerida e confirmar."

## 2. Ligar a obra ao pedido (checklist 10, bloco 1)
Use um pedido **Em aberto** (ex.: PV-000034) e a obra "TESTE FLUXO CONSULTOR - Obra Comercial" (ou o projeto TESTE-FLUXO-01). Abra o pedido pelo menu `⋯` (Editar), preencha o campo **Projeto**, salve. Confirme na lista a coluna PROJETO. Anote o rótulo exato do campo e se o pedido volta a pedir algo (CFOP, condição). Confirme também que num pedido já **Entregue** (ex.: PV-000033) não há Editar. Texto atual: "Abrir o seu pedido de venda em aberto, escolher no campo Projeto a sua obra de treino e salvar."

## 3. Cartão de tarefas (checklist 14, bloco 1 e bloco "Trabalhar num cartão")
Abra o módulo Tarefas pelo **menu de módulos** (Ctrl+K não acha). Quais quadros existem? Pode criar um quadro de treino? Crie o cartão "TESTE ESTAGIÁRIO - cartão 1", atribua a **você** como responsável, prazo e prioridade; confirme que aparece em **Minhas Tarefas**. Depois: usar o checklist e os comentários do cartão, mover entre listas e arquivar. Anote cada rótulo (botão de novo cartão, campos, menus). Se não houver quadro nenhum, descreva o que um consultor precisa criar antes.

## 4. Segundo lead do CRM (checklist 03, bloco 1)
`CRM > Vendas > Leads > Novo Lead`: crie "TESTE ESTAGIÁRIO - Maria 2" com **outra Temperatura** que o primeiro lead de teste (se não houver, crie também "TESTE ESTAGIÁRIO - Maria 1"). Em **Informações CRM**: Origem do Lead, Temperatura, Responsável (você). Salvar. Confirme: os dois leads aparecem na lista; o filtro **Só minhas** mostra só os seus; o Kanban mostra os dois (em que coluna nascem?). Liste as seções do formulário na ordem em que aparecem.

## Entrega
`Status: done | partial | blocked`, `Result`, `Evidence` (nº dos registros e mensagens), `Open items`, e para cada item o **texto corrigido sugerido** do passo do checklist, mais defeitos novos e registros a limpar.
