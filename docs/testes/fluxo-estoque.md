# Brief: fluxo de estoque (transferência, reserva, inventário, empréstimo)

**Relatório:** `43-fluxo-estoque.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

Provar os movimentos manuais e controlados de estoque, com o saldo conferido antes e depois de cada passo. O trio saldo → movimento → estorno já foi mapeado; faltam as telas de Transferências, Inventário, Empréstimos, Encerramentos, Reposição e Locais.

## Critério de aceite

1. **Transferência** do almoxarifado central para outro local: rascunho → confirmação, com saldo da origem e do destino conferidos e o número do documento.
2. **Reserva/disponibilidade:** coluna RESERVADA e aba Reservas do produto conferidas; o efeito de "bloquear saída que invade reserva" (Parâmetros de Estoque) registrado nos dois estados.
3. **Inventário:** contagem → auditoria (por outra pessoa, se a regra exigir) → aprovação, com o ajuste de saldo gerado. Se a segregação exigir um segundo usuário, registre `blocked` e o que falta.
4. **Empréstimo** com data de devolução e a devolução; alerta de vencimento conferido em `Visão geral`.
5. **Reposição/Sugestão:** definir estoque mínimo de um insumo de teste e ver o item aparecer em `Estoque > Reposição` e em `Compras > Sugestão de Compra`.
6. **Estorno** de um movimento de teste e o saldo voltando ao valor anterior.

## Roteiro

1. Ler `03-estoque-producao-expedicao.md` (mapa de menu e Novo movimento) e o saldo atual do produto de teste (`P-PAR-431PH`, 10 PT no ALM-TESTE, e `JAN-ALU-120X150`).
2. Cadastrar um segundo local em `Estoque > Locais` (almoxarifado de teste) se não houver.
3. Executar os itens do critério de aceite na ordem 1, 6, 5, 4, 2, 3. Anotar o saldo antes/depois em cada um.
4. **Encerramento mensal:** apenas ler a tela e os rascunhos existentes (set/2026 duplicado); não aprovar nem encerrar.
5. Conferir `Demonstrativos` e a Visão geral depois dos movimentos.

## Entrega

Relatório conforme as regras comuns, com a tabela saldo antes → depois por passo.
