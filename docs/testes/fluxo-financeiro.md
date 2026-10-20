# Brief: fluxo financeiro (títulos do pedido, baixa e gestão)

**Relatório:** `41-fluxo-financeiro.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

Destravar **Gerar Títulos** do pedido PV-000033 e provar o caminho títulos → baixa → saldos → fluxo de caixa → DRE/painel da obra.

## Critério de aceite

1. Títulos do PV-000033 gerados (um por parcela) e visíveis em `Financeiro > Contas a Receber`, com valor e vencimento iguais à parcela do pedido.
2. A causa do bloqueio documentada: o meio **"Duplicata Mercantil"** está cadastrado como tipo Boleto (`Configurações > Meios de Pagamento`) e "Gerar Títulos" exige conta **emissora** de boletos (conta padrão não basta).
3. Uma baixa total e uma **baixa parcial** feitas, com reflexo em Saldos, Fluxo de Caixa e "Recebido no mês" (tela Início); estorno da baixa testado.
4. Divergência do Fluxo de Caixa (saldo inicial negativo e saldo final zero) reproduzida e descrita com os números.
5. DRE e Painel Financeiro de Projetos conferidos para o PV-000033 (ligue o pedido ao projeto TESTE-FLUXO-01 antes, se o pedido ainda aceitar edição; senão registre o impedimento).

## Roteiro

1. Ler o relatório `07-teste-fluxo-consultor.md` (Retomada 3, etapa Financeiro) e anotar o título manual `TESTE-FLUXO-PV33` já baixado (estornar e excluir antes de gerar os títulos do pedido, para não duplicar o recebível).
2. Resolver o bloqueio **pela configuração**, na ordem: (a) conferir o tipo do meio "Duplicata Mercantil"; (b) trocar o tipo desse meio para o correto (Duplicata/Outros) **ou** habilitar a conta de teste como emissora. Registre qual caminho funcionou e por quê.
3. `Gerar Títulos` no pedido; conferir parcelas.
4. Baixar totalmente um título e parcialmente outro (se houver mais de uma parcela, ou editar o valor pago); estornar uma baixa.
5. Conferir `Saldos`, `Extrato` (é a conciliação?), `Fluxo de Caixa` (realizado × previsto), `DRE` e `Painel Financeiro de Projetos`.
6. `Contas a Pagar`: confirmar que o título pago no fluxo de suprimentos (NR-000013/001) aparece no extrato e no fluxo de caixa.

## Entrega

Relatório conforme as regras comuns, com a seção "Configurações feitas" (inclua o que reverter).
