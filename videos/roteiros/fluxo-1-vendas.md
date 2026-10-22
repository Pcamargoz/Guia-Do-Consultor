# Roteiro — Fluxo principal 1 · Vendas (o ciclo do pedido)

- Trilha: Fluxos principais do estagiário · Fluxo 1 · Vendas
- Público: estagiários e consultores
- Duração estimada: ~3:00 (cerca de 430 palavras de narração)
- Próximo vídeo: Fluxo principal 2 · Faturamento
- Roteiro escrito com o workflow `roteirizar-video` do Harness de Documentação (fontes de `conhecimento/produto/`, Flow v1.22.12) e ajustado à gravação no DEV em 22/10/2026 (Flow v1.22.13). O texto que vai para a voz está em `fluxo-1-vendas.json`.
- Diferenças achadas na gravação (já registradas na base): a Empresa não vem mais preenchida; Dados do Item muda conforme o material; a Conta de Fluxo de Caixa pode vir do cliente.

## Cenas

| # | Cena | Duração | Narração | Na tela | Fonte |
|---|---|---|---|---|---|
| 1 | Abertura | 0:08 | Toda venda da empresa começa num pedido. Neste vídeo, você vai entender o ciclo do pedido de venda no Faktory Flow, e como evitar os tropeços mais comuns. | Logo, título "Fluxo 1 · Vendas", ícone de pedido | — |
| 2 | Conceito | 0:35 | O pedido é o combinado da venda: quem compra, o quê, por quanto e como vai pagar. Ele nasce Em aberto. Enquanto está assim, você ainda pode mudar tudo. Quando a nota fiscal é salva, ele passa a Faturado. Depois, pode ser liberado para expedição e, por fim, entregue. Cada status abre e fecha portas. Vamos ver quais. | Linha do tempo animada dos status: Em aberto → Faturado → Lib. Expedição → Entregue; "cadeado" fechando a edição depois de Em aberto | `funcional-vendas-pedidos-de-venda` |
| 3a | Regra: CFOP | 0:12 | Primeira regra. No Novo Pedido, o CFOP só libera depois que você escolhe a Empresa e o Cliente. E ele já vem filtrado pelo estado do cliente. | Cartão: Empresa + Cliente → CFOP | `regra-vendas-cfop-depende-de-empresa-e-cliente` (B — revisar) |
| 3b | Regra: Conta de Fluxo de Caixa | 0:08 | Segunda. No Resumo do Pedido, a Conta de Fluxo de Caixa é obrigatória. | Cartão com o campo destacado | `regra-vendas-cfop-depende-de-empresa-e-cliente` (B — revisar) |
| 3c | Regra: editar só em aberto | 0:14 | Terceira. Só o pedido Em aberto pode ser editado, pelo lápis da coluna Ações. Depois de faturado, você só consegue visualizar. Por isso, ajuste projeto, itens e parcelas antes de faturar. | Cartão: lápis ✓ em Em aberto, olho em Faturado | `regra-vendas-editar-pedido-somente-em-aberto` (B — revisar) |
| 3d | Regra: Faturado ao salvar a nota | 0:14 | Quarta. O pedido fica Faturado assim que a nota é salva, mesmo que a nota ainda esteja em aberto. Faturado não quer dizer nota autorizada. Confira sempre em Faturamento. | Cartão: nota salva → pedido Faturado; selo "nota ainda Em Aberto" | `regra-vendas-pedido-fica-faturado-ao-salvar-a-nota` (B — revisar) |
| 4 | Na tela | 1:30 | Agora, na prática. Abra Vendas, Pedidos de Venda. A lista já abre filtrada nos pedidos Em aberto. Clique em Novo Pedido e comece escolhendo a Empresa. Repare que o CFOP ainda está bloqueado. Escolha o Cliente, o Vendedor e a Condição de Pagamento. Agora, sim, o CFOP libera. E a lista já vem filtrada pelo estado do cliente. Aqui, só aparecem as operações interestaduais. Adicione o produto. Abre o quadro Dados do Item, com os campos que o tipo do material pede. Preencha e clique em Aplicar. Na parcela, escolha o Meio Pagamento e o Portador. No Resumo, confira a Conta de Fluxo de Caixa: ela é obrigatória, e pode já vir do cadastro do cliente. Clique em Salvar e Permanecer. Pronto: o pedido ganha um número, e a tela passa a ser Editar Pedido de Venda. Na lista, ele está Em aberto, sem títulos e sem nota fiscal. Precisa ajustar? Use o lápis. Para mudar as parcelas, troque a Condição de Pagamento: as parcelas se refazem sozinhas. | Gravação do ambiente de teste com cursor, destaque e zoom em cada campo | `procedimento-criar-pedido-de-venda`, `procedimento-ajustar-o-pedido-antes-de-faturar` |
| 5 | Armadilhas | 0:25 | Três cuidados. As lixeiras do item e da parcela apagam na hora, sem pedir confirmação. O botão Recalcular Parcelas só redivide os valores: ele não cria datas novas. E, se o item tiver desconto, o pedido vai para Vendas, Aprovações, e outra pessoa, com perfil de aprovação, precisa aprovar. | Três cartões de alerta | `funcional-vendas-pedidos-de-venda`, `regra-vendas-parcelas-recalcular-e-recalcular-parcelas`, `regra-vendas-aprovacoes-cobrem-comissao-e-desconto` (B — revisar) |
| 6 | Fechamento | 0:12 | Resumindo: Empresa e Cliente antes do CFOP. Conta de Fluxo de Caixa sempre. E ajuste tudo antes de faturar. No próximo vídeo, você vai faturar este pedido. | Três tópicos; "Próximo: Fluxo 2 · Faturamento" | — |

## Gravações necessárias (ambiente de teste)

| # | Tela (nome exato) | Ação a gravar | Dados fictícios |
|---|---|---|---|
| 1 | Vendas › Pedidos de Venda | Lista com o filtro Status Em Aberto | Pesquisar "TESTE FLUXO CONSULTOR" (sem nomes de outros clientes) |
| 2 | Novo Pedido | Página vazia; CFOP bloqueado ("Selecione a empresa e o cliente primeiro") | — |
| 3 | Novo Pedido | Cliente, Vendedor e Condição de Pagamento escolhidos; CFOP liberado | Cliente de teste da empresa METALURGICA TEST |
| 4 | Dados do Item | Medidas preenchidas e Aplicar | Produto de teste |
| 5 | Parcelas do Pedido / Resumo do Pedido | Meio Pagamento, Portador e Conta de Fluxo de Caixa | — |
| 6 | Novo Pedido | Salvar e Permanecer; mensagem "Pedido PV-… criado" | Observação: TESTE FLUXO CONSULTOR |
| 7 | Vendas › Pedidos de Venda | Pedido novo Em aberto, "Sem títulos", Nota Fiscal "—"; lápis da coluna Ações | — |

## Pendências para revisão humana

| Item | Motivo | Fonte |
|---|---|---|
| Todas as regras | Confiança B (verificadas no DEV em 19–21/10/2026, sem revisão formal) | `conhecimento/produto/` |
| Número do pedido na mensagem | Não falar nem mostrar legível o código do pedido do ambiente de teste | `harness/regras/videos-de-fluxo.md` |
