# Brief: fluxo comercial — da oportunidade ganha ao pedido

**Relatório:** `42-fluxo-comercial-handoff.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

Fechar o que o teste de 19/10 deixou em aberto: **Gerar Pedido de Venda** a partir da oportunidade falha com "O CFOP do pedido gera financeiro, então estes campos são obrigatórios: Condição de Pagamento, Plano de Conta, Parcelas", e a aprovação de desconto nunca foi vista por um segundo usuário.

## Critério de aceite

1. Um pedido de venda **gerado pela oportunidade** (OPO-000012 ou uma nova) existe em `Vendas > Pedidos de Venda`, com cliente, itens e valor corretos e o vínculo com a oportunidade identificado (ou a ausência do vínculo documentada).
2. A condição que faz o handoff funcionar está descrita: CFOP que não gera financeiro, cadastro a completar (condição, plano de contas, parcelas) ou correção necessária no produto. Se nenhuma configuração resolver, o status é `blocked` com a evidência.
3. Fluxo de desconto: solicitação criada por um usuário e **aprovada por outro**, com o item recebendo o desconto. Se só existir um usuário de teste, registre como `blocked` e liste o que falta (usuário aprovador).
4. **Criar Projeto de Obra** a partir da oportunidade ganha testado (menu `⋮` do card ganho).

## Roteiro

1. Ler o relatório `33-fluxo-comercial.md` (etapas 5 e 6).
2. Em `Cadastros > Participantes`, completar o cliente (conta de fluxo receita, IE/RG, forma de pagamento padrão se existir). Em `Configurações`, listar CFOPs e identificar um que **não gere financeiro** (apenas leitura; não altere CFOP).
3. Na oportunidade ganha: Gerar Pedido de Venda com cada variação (CFOP sem financeiro; CFOP com financeiro depois de preencher o que o cadastro pedir). Registre mensagem, campos e resultado de cada tentativa.
4. Reabrir a faixa de alçada (`Vendas > Configurações > Alçadas de Desconto`) se precisar, solicitar o desconto e tentar aprovar com outro usuário (se não houver, registre). **Desative a faixa ao final.**
5. Conferir `Vendas > Dashboard`, `Carteira de Pedidos` e `CRM > Resultado do Mês` com o pedido gerado.

## Entrega

Relatório conforme as regras comuns.
