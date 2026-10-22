# Brief — passos em documentação dos fluxos principais 1, 2 e 3 (Vendas, Faturamento, Financeiro)

Regras comuns: [_regras-comuns.md](_regras-comuns.md). Relatório: `scratchpad\relatorio-qa\47-fluxos-principais.md`, gravado a cada passo.

**Objetivo.** Os fluxos principais 1 (Vendas), 2 (Faturamento) e 3 (Financeiro) da trilha do estagiário foram montados a partir dos fluxos dos consultores. Os passos abaixo ainda estão como *documentação* (`s: 'd'`). Execute-os no DEV (METALURGICA TEST), copie os rótulos exatamente como aparecem na tela e devolva o texto corrigido de cada passo.

**Não execute (decisão do usuário):** Faturar, Finalizar NF, Transmitir, Gerar Títulos, Receber, Pagar, Cancelar, Encerrar, Excluir, Dividir em partes, Aprovar. Esses passos já estão verificados por outras rodadas ou dependem de autorização que não foi dada agora. Se um clique for negado pelo sistema de permissões, registre como não conferido e siga.

Registros de apoio no DEV: PV-000034 (Em aberto, obra "TESTE FLUXO CONSULTOR - Obra Comercial", CFOP 6101, condição 30 Dias, 1 item JAN-ALU-120X150 × 10), PV-000033 (Entregue). Altere só o PV-000034, e registre antes → depois de cada mudança (para desfazer).

## 16 · Vendas
1. **Segundo item.** `Vendas > Pedidos de Venda`, lápis (Editar pedido) do PV-000034: adicionar um segundo item (o produto 3639 ou outro de teste). Rótulos do bloco de itens, diálogo Dados do Item, e o **Resumo do Pedido** (subtotal e total antes → depois). Salve com **Salvar e Permanecer** e depois remova o item e salve de novo, para devolver o pedido ao estado anterior (anote se a remoção funcionou).
2. **Recalcular Parcelas × Recalcular.** No mesmo pedido, troque a Condição de Pagamento por uma de 2 parcelas, clique **Recalcular Parcelas** e depois **Recalcular**; descreva o que cada um faz (valores, datas) com os rótulos exatos. Restaure a condição "30 Dias" e confirme as parcelas (ou saia sem salvar, se o resultado já estiver claro).
3. **PDF.** Menu `⋯` do pedido > **Baixar PDF**: o que acontece (download, nova aba), nome do arquivo, e o que o PDF mostra (cliente, itens, total) se der para ver.
4. **Aprovações.** `Vendas > Aprovações`: rótulos das abas, colunas e botões, **sem clicar em Aprovar/Reprovar**. Leia (sem alterar) `Vendas > Configurações > Alçadas de Desconto` e descreva as faixas e se estão ativas. Confirme se o desconto do item (campo, em R$ ou %) aparece no item do pedido e o que o sistema diz quando excede a faixa, **sem salvar**.

## 17 · Faturamento (somente leitura)
5. **Cadastros fiscais.** Módulo `Fiscal`: abra as telas **NCM**, **CFOP**, **CST/CSOSN**, **CEST** e **Textos Fiscais** (e `Faturamento > Configurações`), só lendo: nome exato de cada menu, colunas e botões. Não altere nada.

## Entrega
`Status: done | partial | blocked`, `Result`, `Evidence`, `Open items`; por passo `OK`/`DIVERGE` com o **texto corrigido sugerido** e o selo recomendado (`v` ou `d`); defeitos novos; registros alterados (antes → depois) e como desfazer; confirmação de que nenhum botão proibido foi clicado.
