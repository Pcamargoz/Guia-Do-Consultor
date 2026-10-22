# Roteiros dos vídeos de fluxo

Gerado de `roteiros/*.json` (a fonte de verdade é o JSON; regenere este arquivo depois de editar). Ordem = ordem da fila de produção. Cada regra cita a fonte na base do Harness de Documentação.

## 1. Fluxo 1 · Vendas — O ciclo do pedido de venda

`fluxo-1-vendas` · Fluxos principais do estagiário · 17 trechos · ~430 palavras (~3.1 min de fala) · próximo: Fluxo 2 · Faturamento

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Toda venda da empresa começa num pedido. Neste vídeo, você vai entender o ciclo do pedido de venda no Faktory Flow, e como evitar os tropeços mais comuns. | Logo, trilha e título |
| 02 | Conceito | O pedido é o combinado da venda: quem compra, o quê, por quanto e como vai pagar. Ele nasce Em aberto. Enquanto está assim, você ainda pode mudar tudo. | Linha do tempo: Em aberto → Faturado → Lib. Expedição → Entregue |
| 03 | Conceito | Quando a nota fiscal é salva, ele passa a Faturado. Depois, pode ser liberado para expedição e, por fim, entregue. Cada status abre e fecha portas. Vamos ver quais. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. No Novo Pedido, o CFOP só libera depois que você escolhe a Empresa e o Cliente. E ele já vem filtrado pelo estado do cliente. | Cartão "Regra 1: CFOP depois de Empresa e Cliente" · fonte `regra-vendas-cfop-depende-de-empresa-e-cliente` |
| 05 | Regra | Segunda. No Resumo do Pedido, a Conta de Fluxo de Caixa é obrigatória. | Cartão "Regra 2: Conta de Fluxo de Caixa é obrigatória" · fonte `regra-vendas-cfop-depende-de-empresa-e-cliente` |
| 06 | Regra | Terceira. Só o pedido Em aberto pode ser editado, pelo lápis da coluna Ações. Depois de faturado, você só consegue visualizar. Por isso, ajuste projeto, itens e parcelas antes de faturar. | Cartão "Regra 3: Só o pedido Em aberto é editado" · fonte `regra-vendas-editar-pedido-somente-em-aberto` |
| 07 | Regra | Quarta. O pedido fica Faturado assim que a nota é salva, mesmo que a nota ainda esteja em aberto. Faturado não quer dizer nota autorizada. Confira sempre em Faturamento. | Cartão "Regra 4: Faturado não é nota autorizada" · fonte `regra-vendas-pedido-fica-faturado-ao-salvar-a-nota` |
| 08 | Na tela | Agora, na prática. Abra Vendas, Pedidos de Venda. A lista já abre filtrada nos pedidos Em aberto. | Tela `01-lista` · rótulo "Vendas › Pedidos de Venda" |
| 09 | Na tela | Clique em Novo Pedido e comece escolhendo a Empresa. Repare que o CFOP ainda está bloqueado. | Tela `02-novo-vazio` · rótulo "+ Novo Pedido" |
| 10 | Na tela | Escolha o Cliente, o Vendedor e a Condição de Pagamento. Agora, sim, o CFOP libera. | Tela `03-cabecalho` · rótulo "Cliente, Vendedor e Condição de Pagamento" |
| 10b | Na tela | E a lista já vem filtrada pelo estado do cliente. Aqui, só aparecem as operações interestaduais. | Tela `03b-cfop` · rótulo "CFOP" |
| 11 | Na tela | Adicione o produto. Abre o quadro Dados do Item, com os campos que o tipo do material pede. Preencha e clique em Aplicar. | Tela `04-item` · rótulo "Dados do Item" |
| 12 | Na tela | Na parcela, escolha o Meio Pagamento e o Portador. No Resumo, confira a Conta de Fluxo de Caixa: ela é obrigatória, e pode já vir do cadastro do cliente. | Tela `05-parcelas` · rótulo "Parcelas do Pedido e Resumo" |
| 13 | Na tela | Clique em Salvar e Permanecer. Pronto: o pedido ganha um número, e a tela passa a ser Editar Pedido de Venda. | Tela `06-salvo-b` · rótulo "Salvar e Permanecer" |
| 14 | Na tela | Na lista, ele está Em aberto, sem títulos e sem nota fiscal. Precisa ajustar? Use o lápis. Para mudar as parcelas, troque a Condição de Pagamento: as parcelas se refazem sozinhas. | Tela `07-lista-novo` · rótulo "Em aberto · Sem títulos" |
| 15 | Cuidados | Três cuidados. As lixeiras do item e da parcela apagam na hora, sem pedir confirmação. O botão Recalcular Parcelas só redivide os valores: ele não cria datas novas. E, se o item tiver desconto, o pedido vai para Vendas, Aprovações, e outra pessoa, com perfil de aprovação, precisa aprovar. | As lixeiras do item e da parcela apagam sem confirmação.; Recalcular Parcelas só redivide os valores: não cria datas novas.; Item com desconto vai para Vendas › Aprovações: outra pessoa aprova. |
| 16 | Fechamento | Resumindo: Empresa e Cliente antes do CFOP. Conta de Fluxo de Caixa sempre. E ajuste tudo antes de faturar. No próximo vídeo, você vai faturar este pedido. | Empresa e Cliente antes do CFOP; Conta de Fluxo de Caixa sempre; Ajuste tudo antes de faturar |

## 2. Fluxo comercial — Do lead ao pedido de venda

`consultor-03-comercial` · Fluxos dos consultores · 17 trechos · ~517 palavras (~3.7 min de fala) · próximo: Fluxo de faturamento e fiscal

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | No Faktory Flow, a venda começa bem antes do pedido: ela começa num lead. Neste vídeo, vamos seguir o fluxo comercial inteiro, do primeiro contato até o pedido de venda, e ver onde ele costuma travar. | Logo, trilha e título |
| 02 | Conceito | Tudo começa no lead: um contato que ainda não é cliente. Você registra as atividades com ele e qualifica o interesse. | Linha do tempo: Lead → Oportunidade → Proposta → Ganha → Pedido de venda |
| 03 | Conceito | Quando o lead está pronto, você converte. Ele vira uma oportunidade no Pipeline, recebe itens e uma proposta. Se o cliente fechar, a oportunidade é ganha e gera o pedido de venda. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. O lead só converte se estiver numa etapa do Kanban de sessenta por cento ou mais, como MQL ou SQL, e com o BANT completo: budget, autoridade, necessidade e prazo. As duas condições valem juntas. O BANT fica na seção Informações CRM. | Cartão "Regra 1: Converter exige 60% e BANT completo" · fonte `regra-crm-converter-lead-exige-etapa-60-e-bant-completo` |
| 05 | Regra | Segunda. A conversão cria a oportunidade sozinha, sem avisar. Ela aparece no Pipeline, na etapa Novo Lead, com o valor do budget. E atenção: as atividades do lead não migram para a oportunidade. | Cartão "Regra 2: A conversão cria a oportunidade sozinha" · fonte `regra-crm-conversao-cria-a-oportunidade-sozinha` |
| 06 | Regra | Terceira. Na aba Itens da oportunidade, aplique o quadro Dados do Item antes de salvar. A partir daí, o valor estimado passa a ser a soma dos itens, e não mais o budget. | Cartão "Regra 3: Itens viram o valor da oportunidade" · fonte `funcional-crm-leads-pipeline-e-oportunidades` |
| 07 | Regra | Quarta, e a mais importante. Na oportunidade ganha, o Gerar Pedido de Venda pede só a Empresa e o CFOP. Se o CFOP gera financeiro, o sistema recusa, porque faltam condição de pagamento e parcelas. O contorno: gere com um CFOP sem financeiro e, depois, abra o pedido, troque o CFOP e escolha a condição de pagamento. | Cartão "Regra 4: Gerar o pedido: use um CFOP sem financeiro" · fonte `regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro` |
| 08 | Na tela | Na prática: em CRM, Vendas, Leads, abra o Kanban. Cada coluna mostra o percentual da etapa. O lead novo começa em Inbound, com dez por cento. | Tela `01-kanban` · rótulo "CRM › Vendas › Leads › Kanban" |
| 08b | Na tela | Arraste o card até MQL, de sessenta por cento. O sistema pede uma observação opcional: confirme o movimento. | Tela `01b-mover` · rótulo "Mover lead" |
| 09 | Na tela | No Editar Lead, em Informações CRM, preencha o budget estimado e ligue as três chaves do BANT: autoridade, necessidade e prazo. Salve. | Tela `02-bant` · rótulo "Editar Lead › Informações CRM" |
| 10 | Na tela | Agora, no menu do lead, use Converter e confirme em Converter Lead. | Tela `03b-dialogo` · rótulo "⋯ › Converter" |
| 10b | Na tela | A mensagem diz só que o lead foi convertido. Ela não fala da oportunidade: você a encontra no Pipeline. | Tela `03c-convertido` · rótulo "Lead convertido" |
| 11 | Na tela | No Pipeline, a oportunidade já está lá, na etapa Novo Lead, com o valor do budget. Abra o card. | Tela `04-pipeline` · rótulo "CRM › Vendas › Pipeline" |
| 12 | Na tela | Em Gerar Proposta, escolha o template, a empresa emitente, que vem vazia, a validade e uma condição de pagamento cadastrada, e gere o PDF. Depois, mova a etapa à mão: a proposta não muda a etapa sozinha. | Tela `05b-proposta` · rótulo "Gerar Proposta" |
| 13 | Na tela | Com o sim do cliente, clique em Ganha e, em seguida, em Gerar Pedido de Venda. Escolha a Empresa e um CFOP sem financeiro, e confirme. | Tela `05-painel` · rótulo "Ganha › Gerar Pedido de Venda" |
| 14 | Cuidados | Três cuidados. O botão Ganha não pede confirmação: se clicar sem querer, use Reverter ganho. Desconto em reais acima da alçada vai para aprovação, e quem aprova precisa ser outro usuário. E, se precisar reverter o ganho, faça isso antes de gerar o pedido, nunca depois. | Ganha não pede confirmação: se clicar sem querer, use Reverter ganho.; Desconto em R$ acima da alçada vai para aprovação de outro usuário.; Reverta o ganho antes de gerar o pedido, nunca depois. |
| 15 | Fechamento | Resumindo: sessenta por cento e BANT completo para converter. A oportunidade nasce sozinha no Pipeline. E o pedido sai com um CFOP sem financeiro, que você ajusta depois. No próximo vídeo, o faturamento e o fiscal. | Sessenta por cento e BANT para converter; A oportunidade nasce sozinha no Pipeline; Pedido com CFOP sem financeiro, depois ajuste |

## 3. Faturamento e fiscal — Do pedido à nota finalizada, sem transmitir

`consultor-07-faturamento` · Fluxos dos consultores · 16 trechos · ~459 palavras (~3.3 min de fala) · próximo: Fluxo financeiro

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Depois do pedido vem a nota fiscal. Neste vídeo, vamos faturar um pedido, conferir a nota e entender o que é do consultor e o que é decisão do responsável fiscal. | Logo, trilha e título |
| 02 | Conceito | O ponto de partida é um pedido em aberto, já com itens, parcelas e CFOP certos. | Linha do tempo: Pedido em aberto → Faturar → Nota salva → Finalizada → Transmitida |
| 03 | Conceito | Faturar abre uma nota nova ligada ao pedido. Você salva, confere e finaliza. A transmissão para a SEFAZ é a última etapa, e ela não é do consultor: é do responsável fiscal. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. Faturar abre uma nova NF-e com empresa, cliente, CFOP, condição e parcelas do pedido, e o número do pedido fica vinculado. A nota vem vazia até você importar os itens, com recalcular impostos. | Cartão "Regra 1: Faturar abre uma NF-e ligada ao pedido" · fonte `regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido` |
| 05 | Regra | Segunda. Assim que a nota é salva, o pedido passa a Faturado, mesmo com a nota ainda em aberto. Por isso, o status real da nota você confere em Faturamento, Notas Fiscais. | Cartão "Regra 2: Salvou a nota, o pedido é Faturado" · fonte `regra-vendas-pedido-fica-faturado-ao-salvar-a-nota` |
| 06 | Regra | Terceira. Para finalizar, a empresa precisa de um almoxarifado central ativo, ou o projeto precisa de um local de estoque. Sem isso, o Finalizar NF recusa. E, ao finalizar, a nota baixa o estoque. | Cartão "Regra 3: Finalizar exige almoxarifado ativo" · fonte `regra-faturamento-finalizar-nf-requisitos` |
| 07 | Regra | Quarta. A lista de notas abre filtrada em Em Aberto, e os cartões de totais seguem esse filtro. Uma nota finalizada só aparece quando você troca o filtro de status. | Cartão "Regra 4: A lista abre só com as notas Em Aberto" · fonte `regra-faturamento-lista-de-notas-filtro-padrao-e-menu` |
| 08 | Na tela | Na prática: no menu do pedido em aberto, clique em Faturar. | Tela `01-menu-faturar` · rótulo "Pedido › ⋯ › Faturar" |
| 09 | Na tela | A nova NF-e abre com o diálogo para importar os itens do pedido. Deixe marcado recalcular impostos e importe. | Tela `02-importar` · rótulo "Selecionar Itens para Importar" |
| 10 | Na tela | Repare na faixa de homologação: a nota não tem validade fiscal. E aqui está o aviso de impostos não calculados, com o motivo: falta o CST de PIS e COFINS na NCM. Mesmo assim, dá para salvar em Salvar e Permanecer. | Tela `03-nova-nfe` · rótulo "Nova NF-e › Homologação" |
| 11 | Na tela | Em Faturamento, Notas Fiscais, aba NF-e, a nota aparece em aberto. No menu dela estão o Finalizar NF e o Preview da DANFE, para conferir. E, ao lado, o avião de papel: esse é o Transmitir. | Tela `04-lista-notas` · rótulo "Faturamento › Notas Fiscais" |
| 11b | Na tela | Com a autorização, clique em Finalizar NF e confirme. A nota fica só para visualização, e o pedido sai da lista de em aberto: agora ele está faturado. | Tela `05-finalizar` · rótulo "Finalizar NF" |
| 11c | Na tela | E a finalização mexe no estoque: nasce uma saída do tipo expedição, com origem na nota, no almoxarifado central. | Tela `06-saida-estoque` · rótulo "Estoque › Movimentos" |
| 11d | Na tela | Atenção: nesta versão, ela baixa mesmo sem saldo. Aqui o item ficou negativo. Por isso, confira o saldo antes de finalizar. | Tela `07-saldo-negativo` · rótulo "Estoque › Saldo" |
| 12 | Cuidados | Três cuidados. O avião de papel na linha da nota é o Transmitir, e ele é irreversível, mesmo em homologação. O Excluir fica no mesmo menu do Ver Timeline. E transmitir, cancelar ou inutilizar numeração é sempre decisão do responsável fiscal. | O avião de papel na linha é Transmitir: é irreversível, mesmo em homologação.; Excluir fica no mesmo menu de Ver Timeline e Anexos.; Transmitir, cancelar e inutilizar: só o responsável fiscal. |
| 13 | Fechamento | Resumindo: importe os itens com recalcular impostos. A nota salva já deixa o pedido faturado. E a transmissão é do responsável fiscal. No próximo vídeo, o financeiro: títulos, baixa e fluxo de caixa. | Importe os itens com recalcular impostos; Nota salva já deixa o pedido Faturado; Transmitir é do responsável fiscal |

## 4. Fluxo financeiro — Títulos, baixa e saldos

`consultor-08-financeiro` · Fluxos dos consultores · 15 trechos · ~445 palavras (~3.2 min de fala) · próximo: Fluxo de suprimentos

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | O pedido foi faturado. Agora o dinheiro precisa entrar. Neste vídeo, vamos ver de onde nascem os títulos, como receber, inclusive em parte, e como conferir o saldo da conta. | Logo, trilha e título |
| 02 | Conceito | Tudo começa nas parcelas do pedido: a condição de pagamento define quantas são e quando vencem. | Linha do tempo: Parcelas do pedido → Títulos → Receber → Saldo da conta |
| 03 | Conceito | As parcelas viram títulos em Contas a Receber. Quando o cliente paga, você recebe o título, e o saldo da conta bancária sobe na hora. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. O Gerar Títulos do pedido só fica habilitado em pedido em aberto ou entregue que ainda não tem títulos. E, quando você finaliza a nota fiscal, os títulos são gerados sozinhos, com o número da nota como documento. | Cartão "Regra 1: Os títulos nascem do pedido ou da nota" · fonte `regra-faturamento-finalizar-nf-gera-os-titulos` |
| 05 | Regra | Segunda. Se o meio de pagamento da parcela é do tipo boleto, o sistema exige uma conta bancária emissora. Sem ela, os títulos não saem. Confira o tipo do meio antes, e não troque sem falar com o fiscal. | Cartão "Regra 2: Boleto exige conta emissora" · fonte `regra-financeiro-meio-de-pagamento-boleto-exige-conta-emissora` |
| 06 | Regra | Terceira. Se você recebe menos que o valor do título, o original fica recebido e nasce um título novo com o saldo, no mesmo vencimento. Não é duplicidade: a soma dos dois dá o valor original. | Cartão "Regra 3: Baixa parcial cria um título residual" · fonte `regra-financeiro-baixa-parcial-cria-titulo-residual` |
| 07 | Regra | Quarta. Contas a Receber abre filtrada em em aberto. Para achar um título já recebido, limpe o filtro de status. | Cartão "Regra 4: A lista abre só com os títulos Em aberto" · fonte `regra-financeiro-contas-a-receber-filtro-padrao-em-aberto` |
| 08 | Na tela | Veja o pedido depois de faturado: a coluna títulos mostra gerados, e a nota fiscal está ligada. No menu, o Gerar Títulos não aparece mais: ele virou pedido já faturado. | Tela `00-pedido-faturado` · rótulo "Pedido faturado › títulos gerados" |
| 09 | Na tela | Em Financeiro, Contas a Receber, os títulos da nota estão lá: uma linha por parcela, em aberto. Vamos receber o primeiro. | Tela `01-contas-receber` · rótulo "Financeiro › Contas a Receber" |
| 10 | Na tela | Antes, anote o saldo da conta em Financeiro, Saldos. A conta de teste está com mil duzentos e trinta reais e setenta e seis centavos. | Tela `02-saldo-antes` · rótulo "Financeiro › Saldos (antes)" |
| 11 | Na tela | No Receber, escolha a conta bancária, que é obrigatória e não vem preenchida, o meio de pagamento e o valor recebido. Aqui, cinquenta reais de um título de cento e vinte e cinco. | Tela `03-receber` · rótulo "Receber" |
| 12 | Na tela | O sistema confirma a baixa parcial e cria o título residual de setenta e cinco reais. Repare no número: ele pega a próxima parcela livre, aqui a zero zero três. | Tela `03b-parcial` · rótulo "Baixa parcial" |
| 13 | Na tela | De volta aos saldos: a conta subiu exatamente os cinquenta reais, na hora. | Tela `04-saldo-depois` · rótulo "Financeiro › Saldos (depois)" |
| 14 | Cuidados | Três cuidados. Receber, pagar e estornar movem o saldo de verdade: use só conta e valor de teste. Um título manual e um gerado para o mesmo pedido duplicam a receita nos painéis. E o card recebido no mês pode somar o valor cheio numa baixa parcial: confira contra o extrato. | Receber, pagar e estornar movem saldo: só conta e valor de teste.; Título manual e título gerado do mesmo pedido duplicam a receita.; Confira o card Recebido no mês contra o Extrato. |
| 15 | Fechamento | Resumindo: os títulos nascem do pedido ou da nota. A baixa parcial cria um residual. E confira o saldo antes e depois de cada baixa. No próximo vídeo, o fluxo de suprimentos, da solicitação ao pagamento. | Títulos nascem do pedido ou da nota; Baixa parcial cria o residual; Confira o saldo antes e depois |

## 5. Fluxo de suprimentos — Da solicitação ao pagamento

`consultor-01-suprimentos` · Fluxos dos consultores · 15 trechos · ~459 palavras (~3.3 min de fala) · próximo: Fluxo de serviços de campo

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Comprar bem é tão importante quanto vender bem. Neste vídeo, vamos seguir um material desde a necessidade até o pagamento ao fornecedor, passando pelo estoque. | Logo, trilha e título |
| 02 | Conceito | Tudo começa numa solicitação de compra: alguém precisa de um material, numa quantidade e numa data. | Linha do tempo: Solicitação → Cotação → Pedido de compra → Nota de recebimento → Título pago |
| 03 | Conceito | A cotação compara fornecedores e gera o pedido de compra. Quando o material chega, a nota de recebimento dá entrada no estoque e cria o título a pagar, que você paga no financeiro. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. A cotação é opcional. No menu da solicitação, o Gerar Pedido de Compra não grava direto: ele abre o novo pedido, já com o produto, para você informar fornecedor, comprador, condição, CFOP e valor. | Cartão "Regra 1: A cotação é opcional" · fonte `regra-compras-gerar-pedido-de-compra-abre-o-novo-pedido` |
| 05 | Regra | Segunda. Na cotação, a natureza da operação, consumo, produção, revenda ou ativo, define sozinha o CFOP do pedido de compra, conforme a origem do fornecedor. Escolha com cuidado. | Cartão "Regra 2: A natureza da operação define o CFOP" · fonte `regra-compras-natureza-da-operacao-define-o-cfop` |
| 06 | Regra | Terceira, e a que mais confunde. A mesma nota de recebimento tem dois números. Na lista de recebimento ela aparece como NF, com o número do fornecedor. Na conferência, no pedido e no título, aparece como NR, o número interno. É a mesma nota. | Cartão "Regra 3: A mesma nota tem dois números" · fonte `regra-recebimento-a-mesma-nota-tem-dois-numeros` |
| 07 | Regra | Quarta. A entrada do material cai no almoxarifado central. Sem um almoxarifado central ativo em Estoque, Locais, o sistema bloqueia a finalização. Confira antes de começar. | Cartão "Regra 4: Sem almoxarifado central, nada entra" · fonte `regra-estoque-almoxarifado-central-ativo-e-pre-requisito` |
| 08 | Na tela | Na prática: em Compras, Solicitações de Compra, a Nova Solicitação pede a empresa, a data de necessidade, o produto e a quantidade. Esta aqui já está concluída: ela virou pedido. | Tela `00-solicitacao` · rótulo "Compras › Solicitações de Compra" |
| 09 | Na tela | A cotação é um assistente em quatro passos: dados gerais, itens, propostas e comparação. Nos dados gerais, repare na natureza da operação: é ela que vai definir o CFOP. | Tela `01b-cotacao` · rótulo "Cotação · Dados Gerais" |
| 10 | Na tela | Na comparação, você escolhe o critério, como menor preço ou menor prazo, e aplica a melhor opção. Daí sai o pedido de compra, um por fornecedor vencedor. | Tela `01c-comparacao` · rótulo "Cotação · Comparação" |
| 11 | Na tela | E aqui está a melhor forma de conferir tudo: a linha do tempo do pedido de compra. Solicitação concluída, cotação concluída, pedido recebido, nota finalizada e título pago, em ordem. | Tela `01-linha-do-tempo` · rótulo "Pedido de compra › Linha do tempo" |
| 12 | Na tela | Na lista de recebimento, a mesma nota aparece como NF nove nove zero zero zero um, o número do fornecedor. Na linha do tempo, ela era a NR treze. | Tela `02-notas-recebimento` · rótulo "Recebimento › Notas de Recebimento" |
| 13 | Na tela | E no estoque, o movimento de entrada do tipo recebimento, no almoxarifado central, com o valor da nota. | Tela `03-entrada-estoque` · rótulo "Estoque › Movimentos" |
| 14 | Cuidados | Três cuidados. Finalizar a nota de recebimento não pode ser desfeito, e depois dela o pedido de compra não pode mais ser cancelado. O meio de pagamento da parcela não chega ao diálogo de pagamento: informe de novo. E a sugestão de compra só mostra itens com estoque mínimo cadastrado. | Finalizar a nota de recebimento não pode ser desfeito.; O meio de pagamento da parcela não chega ao Pagar: informe de novo.; A Sugestão de Compra só lista itens com estoque mínimo. |
| 15 | Fechamento | Resumindo: a cotação é opcional, e a natureza da operação define o CFOP. NF e NR são a mesma nota. E a linha do tempo do pedido mostra a cadeia inteira. No próximo vídeo, os serviços de campo. | Cotação é opcional; a natureza define o CFOP; NF e NR são a mesma nota; Confira tudo na linha do tempo do pedido |

## 6. Serviços de campo — Da medição à assistência técnica

`consultor-02-servicos` · Fluxos dos consultores · 13 trechos · ~380 palavras (~2.7 min de fala) · próximo: Fluxo comercial

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Esquadria vendida ainda precisa ser medida, instalada e aceita pelo cliente. Neste vídeo, vamos seguir os serviços de campo, da medição até a assistência técnica. | Logo, trilha e título |
| 02 | Conceito | Tudo começa na medição, que nasce do pedido de venda: o técnico mede os vãos e o responsável da obra assina. | Linha do tempo: Medição → Instalação → Vistoria → Assistência técnica |
| 03 | Conceito | Aprovada a medição, vem a instalação, depois a vistoria com o cliente e, se houver problema, a assistência técnica. E atenção: quase todas essas passagens são por botão. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. Na nova medição, usar o pedido traz o cliente e o projeto, mas a empresa e o técnico responsável você preenche. E o botão agendar só aparece depois que a medição é salva. | Cartão "Regra 1: Empresa e técnico não vêm do pedido" · fonte `regra-servicos-medicao-nasce-do-pedido` |
| 05 | Regra | Segunda. A medição concluída fica aguardando conferência, e quem aprova precisa ser um conferente diferente de quem mediu. É a trava de qualidade do fluxo. | Cartão "Regra 2: Quem confere não pode ser quem mediu" · fonte `regra-servicos-aprovacao-da-medicao-exige-conferente-diferente` |
| 06 | Regra | Terceira. Aprovar a medição não cria a instalação: você clica em gerar instalação. A assistência também é gerada por botão, a partir da vistoria. Só a vistoria pode nascer sozinha, se a geração automática estiver ligada nos parâmetros. | Cartão "Regra 3: As passagens são por botão" · fonte `regra-servicos-passagens-por-botao-e-ordem-dos-aceites` |
| 07 | Regra | Quarta, e ela pega muita gente. Na vistoria, o aceite do cliente vem depois de concluir. Na assistência técnica é o contrário: registre o aceite antes de resolver. | Cartão "Regra 4: A ordem dos aceites muda" · fonte `regra-servicos-passagens-por-botao-e-ordem-dos-aceites` |
| 08 | Na tela | Na prática: esta medição está aprovada. Repare no botão gerar instalação, no alto. É ele que leva o serviço para a próxima etapa. | Tela `01-medicao-aprovada` · rótulo "Serviços › Medições" |
| 09 | Na tela | A instalação concluída mostra o checklist conferido e conforme, os vínculos com a medição e o pedido, e o botão ver vistoria. Com equipe interna, ela não gera pagamento ao instalador. | Tela `02-instalacao` · rótulo "Serviços › Instalações" |
| 10 | Na tela | Na lista de vistorias, cada uma aponta para a instalação vistoriada. Aqui o cliente registra o aceite, depois de concluir. | Tela `03-vistorias` · rótulo "Serviços › Vistorias" |
| 11 | Na tela | E a assistência técnica gerada da vistoria já vem com o nome dela, e termina como resolvida, com o aceite registrado antes. | Tela `04-assistencias` · rótulo "Serviços › Assistência Técnica" |
| 12 | Cuidados | Três cuidados. Datas e horas aparecem em UTC em vários pontos, como no cockpit: confira antes de achar que há atraso. O template de checklist entra em toda instalação nova da empresa, então desative o de teste. E as mensagens podem cobrir os botões do cabeçalho: feche antes de clicar. | Datas e horas aparecem em UTC em vários pontos: confira antes de achar que há atraso.; O template de checklist entra em toda instalação nova da empresa.; Mensagens podem cobrir os botões do cabeçalho: feche antes de clicar. |
| 13 | Fechamento | Resumindo: na medição, a empresa e o técnico você preenche. Gerar instalação e gerar assistência são botões. E o aceite vem depois na vistoria, e antes na assistência. No próximo vídeo, o fluxo comercial. | Empresa e técnico você preenche na medição; Gerar Instalação e Gerar AT são botões; Aceite: vistoria depois, assistência antes |

## 7. Fluxo de estoque — Movimento, transferência, inventário e empréstimo

`consultor-04-estoque` · Fluxos dos consultores · 15 trechos · ~403 palavras (~2.9 min de fala) · próximo: Fluxo de produção

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | O estoque é onde todos os outros módulos se encontram: compra, produção, nota e expedição. Neste vídeo, vamos entender de onde vem o saldo e as quatro regras que mais pegam o consultor. | Logo, trilha e título |
| 02 | Conceito | No Faktory Flow, ninguém digita o saldo: ele nasce dos movimentos. Entrada, ajuste, transferência, requisição, empréstimo e descarte. | Linha do tempo: Movimento → Saldo → Disponível → Inventário |
| 03 | Conceito | Os movimentos formam o saldo de cada local. Do saldo sai o disponível, que desconta as reservas. E o inventário confere tudo contra a contagem física. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. O saldo nasce de movimentos. No novo movimento, a empresa é obrigatória e não vem preenchida, e você escolhe o local de destino. Recebimento e produção também lançam movimentos sozinhos. | Cartão "Regra 1: O saldo nasce de movimentos" · fonte `regra-estoque-saldo-nasce-de-movimentos` |
| 05 | Regra | Segunda. Uma transferência em rascunho não baixa o saldo da origem, mas reserva a quantidade: o disponível cai e o saldo fica igual. Confirmar movimenta de verdade. Excluir libera a reserva. | Cartão "Regra 2: Transferência pendente reserva o disponível" · fonte `regra-estoque-transferencia-pendente-reserva-o-disponivel` |
| 06 | Regra | Terceira. Iniciar um inventário fotografa o saldo e congela o local: nenhum movimento entra ali. A segunda contagem e a aprovação precisam ser de outra pessoa, regra que vale até para o Super Usuário. | Cartão "Regra 3: Inventário congela o local" · fonte `regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa` |
| 07 | Regra | Quarta, e ela é nova nesta versão. Quando a nota fiscal é finalizada, o sistema lança uma saída do tipo expedição. E ele faz isso mesmo sem saldo: o item pode ficar negativo. Confira o saldo antes de faturar. | Cartão "Regra 4: A nota finalizada baixa o estoque" · fonte `regra-faturamento-finalizar-nf-requisitos` |
| 08 | Na tela | Na prática: no novo movimento, escolha o tipo, a empresa, que vem vazia, e o local de destino. | Tela `01-novo-movimento` · rótulo "Estoque › Movimentos › Novo" |
| 09 | Na tela | Em Saldo, você vê o saldo e o disponível de cada material, por local. Repare neste item negativo, e no aviso no alto: foi a saída da nota fiscal. | Tela `02-saldo` · rótulo "Estoque › Saldo" |
| 10 | Na tela | Nos movimentos, lá está ela: saída de expedição, com origem na nota, no almoxarifado central. | Tela `03-saida-nf` · rótulo "Estoque › Movimentos" |
| 11 | Na tela | Em Transferências, a própria tela explica: confirme para movimentar o saldo, ou exclua para liberar a reserva. | Tela `06-transferencias` · rótulo "Estoque › Transferências" |
| 12 | Na tela | Estes inventários foram cancelados com motivo: cancelar libera o local sem gerar ajuste. Para aprovar, seria preciso uma segunda pessoa. | Tela `04-inventarios` · rótulo "Estoque › Inventários" |
| 13 | Na tela | E o empréstimo sai de um local para outro com data de devolução. Ele pode voltar em partes, e aqui já está devolvido. | Tela `05-emprestimo` · rótulo "Estoque › Empréstimos" |
| 14 | Cuidados | Três cuidados. Sem almoxarifado central ativo, recebimento, produção e nota fiscal travam. A segunda contagem do inventário pode dizer prossiga e depois recusar o mesmo usuário. E, nesta versão, uma saída ainda passa por cima de material reservado: confira o disponível. | Sem almoxarifado central ativo, recebimento, produção e nota travam.; A segunda contagem do inventário diz prossiga, mas recusa o mesmo usuário.; Material reservado ainda pode sair: confira o disponível. |
| 15 | Fechamento | Resumindo: o saldo nasce de movimentos. A transferência pendente reserva o disponível. E o inventário pede outra pessoa para contar e aprovar. No próximo vídeo, a produção. | Saldo nasce de movimentos; Transferência pendente reserva; Inventário e aprovação: outra pessoa |

## 8. Fluxo de produção — Da estrutura ao produto acabado

`consultor-05-producao` · Fluxos dos consultores · 13 trechos · ~400 palavras (~2.9 min de fala) · próximo: Fluxo de expedição

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Na fábrica, o pedido vira ordem de produção, consome material e entrega o produto acabado no estoque, com custo. Neste vídeo, vamos ver o que precisa existir antes e o que cada botão grava. | Logo, trilha e título |
| 02 | Conceito | Tudo começa na estrutura do produto: a lista de materiais e quantidades de cada item. | Linha do tempo: Estrutura → Ordem de produção → Baixa de material → Produzido → Estoque e custo |
| 03 | Conceito | A ordem de produção nasce do pedido e já traz as requisições da estrutura. O material é baixado, a ordem é marcada como produzida, e o produto acabado entra no estoque com o custo real. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. Na nova ordem de produção, o item do pedido traz o produto, a cor e as medidas, mas não a quantidade, que você informa. A empresa também é obrigatória, apesar da dica dizer que vem do pedido. E não use a tecla esc: ela fecha o painel e perde o que foi digitado. | Cartão "Regra 1: A OP copia o item, não a quantidade" · fonte `regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade` |
| 05 | Regra | Segunda. Se o produto tem estrutura, as requisições de material nascem sozinhas ao salvar a ordem: a quantidade da estrutura vezes a da ordem. Sem estrutura, o sistema avisa que a ordem está sem requisições. | Cartão "Regra 2: As requisições nascem da estrutura" · fonte `regra-producao-requisicoes-nascem-da-estrutura-ao-salvar` |
| 06 | Regra | Terceira. Material paramétrico, como perfil e chapa, precisa de cor na estrutura. Sem ela, o sistema recusa. E a entrada de estoque do material também precisa ter a cor, senão o saldo não bate. | Cartão "Regra 3: Item paramétrico exige cor" · fonte `regra-producao-item-parametrico-da-estrutura-exige-cor` |
| 07 | Regra | Quarta. Marcar produzido leva a ordem ao estado final e lança a entrada de produto acabado no almoxarifado central, com a quantidade e o custo. Sem almoxarifado ativo, a conclusão fica bloqueada. | Cartão "Regra 4: Produzido gera a entrada do acabado" · fonte `regra-producao-marcar-produzido-gera-entrada-do-produto-acabado` |
| 08 | Na tela | Na prática: esta ordem de fabricação já está produzida. Repare que os botões de apontar e excluir ficam travados: produzido é o estado final. | Tela `01-op-lista` · rótulo "Produção › Ordens de produção" |
| 09 | Na tela | No custo da ordem, você compara o estimado com o realizado, e vê o detalhe por etapa. | Tela `03-custo` · rótulo "Mais ações › Custo da OP" |
| 10 | Na tela | Na linha do tempo, o tempo planejado e o real. Aqui o real ficou zerado, porque o apontamento não chegou a ser finalizado: uma limitação conhecida desta versão. | Tela `04-linha-tempo` · rótulo "Mais ações › Linha do tempo" |
| 11 | Na tela | E, no estoque, a entrada de produto acabado da ordem, com o custo real. | Tela `05-entrada-acabado` · rótulo "Estoque › Movimentos" |
| 12 | Cuidados | Três cuidados. O iniciar produção da lista muda a ordem para em execução com um clique só. O apontamento de horas pode recusar a finalização por causa do horário: anote e avise o suporte. E, na fila de exceções, não reprocesse nada sem o suporte. | Iniciar produção muda a OP para Em execução com um clique.; O apontamento pode não finalizar: anote o horário e avise o suporte.; Fila de exceções: não reprocesse sem o suporte. |
| 13 | Fechamento | Resumindo: na ordem de produção, a quantidade e a empresa você informa. As requisições nascem da estrutura. E marcar produzido lança o acabado no estoque, com custo. No próximo vídeo, a expedição. | Quantidade e Empresa você informa na OP; Requisições nascem da estrutura; Produzido lança o acabado com custo |

## 9. Fluxo de expedição — Da carga à entrega

`consultor-06-expedicao` · Fluxos dos consultores · 13 trechos · ~353 palavras (~2.5 min de fala) · próximo: Fluxo de faturamento e fiscal

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | O pedido faturado ainda precisa chegar ao cliente. Neste vídeo, vamos montar a carga, passar pelos checkpoints do pátio e entregar, com tudo registrado no histórico. | Logo, trilha e título |
| 02 | Conceito | Tudo começa liberando o pedido faturado para a expedição. Só assim ele aparece para montar a carga. | Linha do tempo: Liberar → Carga fechada → Checkpoints → Em rota → Entregue |
| 03 | Conceito | A carga é fechada, passa pela separação, pela conferência e pelo carregamento, sai em rota e termina entregue. Cada passo fica no histórico, com horário. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. O liberar para expedição só aparece no menu do pedido faturado. Antes de faturar, ele não existe. E, depois de liberado, o mesmo lugar vira reverter liberação. | Cartão "Regra 1: Liberar só existe em pedido Faturado" · fonte `regra-vendas-liberar-para-expedicao-so-em-pedido-faturado` |
| 05 | Regra | Segunda. Os checkpoints de separação, conferência e carregamento são ligados nos parâmetros da expedição. Ligue só as etapas que a empresa realmente usa: cada uma vira uma bipagem obrigatória. | Cartão "Regra 2: Os checkpoints são os da empresa" · fonte `manual-09-expedicao` |
| 06 | Regra | Terceira. Fechar a carga libera os checkpoints. Em cada um, você bipa a etiqueta de cada volume. Quando os três chegam a cem por cento, aparece que todos os checkpoints foram concluídos, e o iniciar rota coloca a carga em rota. | Cartão "Regra 3: Fechou a carga, começa a bipagem" · fonte `manual-09-expedicao` |
| 07 | Regra | Quarta. Uma ocorrência bloqueante na rota devolve o pedido para a fila de re-expedição. E, se a mercadoria volta, a devolução confirmada cria pendências por produto para o estoque: o saldo não sobe sozinho. | Cartão "Regra 4: Ocorrência bloqueante volta à fila" · fonte `roteiro-expedicao-05-re-expedicao-e-devolucoes` |
| 08 | Na tela | Na prática: este pedido está faturado, e o menu dele agora mostra o liberar para expedição. | Tela `00-liberar` · rótulo "Pedido faturado › ⋯" |
| 09 | Na tela | Em Expedição, Cargas, o quadro mostra as cargas em montagem, separadas, em rota e entregues. O montar nova carga lista só os pedidos faturados ou liberados. | Tela `01-quadro-cargas` · rótulo "Expedição › Cargas" |
| 10 | Na tela | No detalhe da carga, você vê o status, a ocupação do veículo contra a capacidade, as entregas, e os documentos: romaneio e etiquetas. | Tela `02-carga-detalhe` · rótulo "Carga #20261000001" |
| 11 | Na tela | E o histórico da carga registra cada passo, com o horário: criada, fechada, separação, conferência, carregamento e a saída para a rota. | Tela `03-historico` · rótulo "Histórico da Carga" |
| 12 | Cuidados | Três cuidados. Motorista com CNH vencida exige justificativa para fechar a carga. A carga pode avisar produção pendente mesmo com a ordem vinculada. E a devolução não devolve o saldo sozinha: trate a pendência de estoque. | Motorista com CNH vencida exige justificativa para fechar a carga.; A carga pode avisar produção pendente mesmo com a OP vinculada.; Devolução não sobe o saldo: trate a pendência de estoque. |
| 13 | Fechamento | Resumindo: libere o pedido só depois de faturar. Fechar a carga libera os checkpoints. E a devolução vira pendência de estoque. No próximo vídeo, o faturamento e o fiscal. | Liberar só depois de faturar; Fechar a carga libera os checkpoints; Devolução vira pendência de estoque |

## 10. Projetos e obras — A obra que amarra todos os documentos

`consultor-09-projetos` · Fluxos dos consultores · 12 trechos · ~334 palavras (~2.4 min de fala) · próximo: Fluxo de tarefas

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Para o cliente de esquadrias, tudo gira em torno da obra. Neste vídeo, vamos ver como o projeto amarra pedido, produção, compras, serviços e financeiro, e como acompanhar a obra num painel só. | Logo, trilha e título |
| 02 | Conceito | Tudo começa no cadastro do projeto: nome, código, cliente e status da obra. | Linha do tempo: Projeto → Estágios e etapas → Documentos ligados → Painel da obra |
| 03 | Conceito | O projeto ganha estágios e etapas, os documentos são ligados a ele pelo campo projeto, e o painel da obra junta tudo: vendido, faturado, a receber, a pagar e as pendências. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. É o campo projeto que liga cada documento à obra: pedido, ordem de produção, solicitação de compra, medição. Sem ele, o documento não aparece no painel da obra. | Cartão "Regra 1: O campo Projeto liga os documentos" · fonte `funcional-cadastros-participante-produto-e-projeto` |
| 05 | Regra | Segunda. Ligue o pedido à obra enquanto ele está em aberto. Depois de faturado ou entregue, o pedido só pode ser visualizado, e o vínculo não entra mais. | Cartão "Regra 2: Ligue o projeto antes de faturar" · fonte `regra-vendas-editar-pedido-somente-em-aberto` |
| 06 | Regra | Terceira. Estágios são as fases macro da obra, como levantamento de material. Etapas são os passos acompanhados, como medição dos vãos, produção e instalação. Cada etapa pode pertencer a um estágio. | Cartão "Regra 3: Estágios são fases; etapas são passos" · fonte `manual-12-projetos-e-tarefas` |
| 07 | Regra | Quarta. Se a obra tem local de estoque próprio, ele precisa estar ativo. Sem isso, a finalização da nota e a conclusão da produção da obra são recusadas. | Cartão "Regra 4: Obra com estoque próprio precisa de local ativo" · fonte `regra-estoque-almoxarifado-central-ativo-e-pre-requisito` |
| 08 | Na tela | Na prática: na lista de pedidos, a coluna projeto mostra a obra de cada pedido. Este aqui está ligado à obra comercial de teste. | Tela `00-pedido-projeto` · rótulo "Vendas › Pedidos de Venda" |
| 09 | Na tela | Em Cadastros, Projetos, cada obra tem status e, na linha, os botões etapas e estágios, onde você monta as fases e os passos acompanhados. | Tela `01-projetos` · rótulo "Cadastros › Projetos" |
| 10 | Na tela | E o painel financeiro do projeto junta tudo: avisos automáticos, pendências, como este pedido ainda sem faturamento, e os cartões de vendido, faturado e a faturar. | Tela `02-painel-obra` · rótulo "Painel Financeiro de Projetos" |
| 11 | Cuidados | Três cuidados. Pedido sem projeto não aparece no painel da obra. Um título manual e um gerado para o mesmo pedido duplicam os números do painel. E o painel separa vendido, faturado e recebido: diferença entre eles não é erro. | Pedido sem projeto não aparece no painel da obra.; Título manual e gerado do mesmo pedido duplicam o painel.; O painel conta o que foi faturado e recebido, não só o vendido. |
| 12 | Fechamento | Resumindo: o campo projeto liga tudo à obra. Ligue o pedido antes de faturar. E acompanhe a obra no painel financeiro. No próximo vídeo, as tarefas. | O campo Projeto liga tudo à obra; Ligue o pedido antes de faturar; Acompanhe no painel financeiro da obra |

## 11. Fluxo de tarefas — Quadro, cartão e responsável

`consultor-10-tarefas` · Fluxos dos consultores · 14 trechos · ~350 palavras (~2.5 min de fala) · próximo: Teste do fluxo completo

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Implantação tem muita coisa para acompanhar: pendências, cadastros, treinamentos. Neste vídeo, vamos ver como o módulo de tarefas organiza isso em quadros e cartões, e o detalhe que faz o cartão aparecer para a pessoa certa. | Logo, trilha e título |
| 02 | Conceito | Tudo começa num quadro, que agrupa as tarefas de um projeto, de um cliente ou de uma equipe. | Linha do tempo: Quadro → Listas → Cartão → Responsável → Arquivado |
| 03 | Conceito | O quadro ganha listas, como a fazer e feito. Cada tarefa vira um cartão, com prioridade, prazo e responsável. E, quando termina, o cartão pode ser arquivado. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra. O quadro novo nasce sem listas. Você cria as listas em adicionar lista, e as tarefas em adicionar tarefa, dentro de cada lista. | Cartão "Regra 1: O quadro nasce sem listas" · fonte `regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel` |
| 05 | Regra | Segunda, e a mais importante. O cartão nasce pendente, com prioridade média e sem responsável. E ele só aparece em minhas tarefas depois que alguém é adicionado como responsável. Sem isso, a tarefa fica esquecida no quadro. | Cartão "Regra 2: Sem responsável, ninguém vê o cartão" · fonte `regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel` |
| 06 | Regra | Terceira. Não procure um campo prazo: a data limite do cartão se chama término previsto. | Cartão "Regra 3: O prazo é o Término Previsto" · fonte `funcional-tarefas-quadros-listas-e-cartoes` |
| 07 | Regra | Quarta. Arquivar não apaga. O cartão arquivado sai das listagens e vai para arquivadas, onde o botão restaurar traz ele de volta. | Cartão "Regra 4: Arquivar não apaga" · fonte `funcional-tarefas-quadros-listas-e-cartoes` |
| 08 | Na tela | Na prática: em Meus Quadros ficam os seus quadros, e o novo quadro pede só o nome e o tipo. | Tela `01-meus-quadros` · rótulo "Tarefas › Meus Quadros" |
| 09 | Na tela | Dentro do quadro, as listas aparecem em colunas, no kanban, mas também em lista, tabela, calendário e Gantt. Em cada lista, adicionar tarefa cria um cartão. | Tela `02-quadro` · rótulo "Quadro · Kanban" |
| 10 | Na tela | O cartão novo está pendente e sem responsável. Clique em adicionar responsável e escolha a pessoa. No cartão também ficam os checklists e os comentários. | Tela `03-cartao` · rótulo "Cartão" |
| 11 | Na tela | Com o responsável definido, o cartão aparece em minhas tarefas, para quem foi atribuído. | Tela `04-minhas-tarefas` · rótulo "Tarefas › Minhas Tarefas" |
| 12 | Na tela | E, depois de arquivado, ele fica aqui, com a data, e pode ser restaurado a qualquer momento. | Tela `05-arquivadas` · rótulo "Tarefas › Arquivadas" |
| 13 | Cuidados | Três cuidados. A busca do control K não encontra o módulo de tarefas: abra pelo menu de módulos. Todo cartão novo nasce sem responsável: atribua sempre. E o autor de um comentário pode aparecer apenas como usuário. | A busca Ctrl+K não encontra o módulo: abra pelo menu de módulos.; O cartão novo não tem responsável: atribua sempre.; O autor de comentário pode aparecer como Usuário. |
| 14 | Fechamento | Resumindo: crie as listas do quadro. Sem responsável, ninguém vê o cartão. E arquivar não apaga, dá para restaurar. No próximo vídeo, o teste do fluxo completo, do pedido à gestão. | Crie as listas do quadro; Sem responsável, ninguém vê o cartão; Arquivar não apaga: restaura |

## 12. O fluxo completo — Do lead à gestão, módulo por módulo

`consultor-fluxo-completo` · Fluxos dos consultores · 16 trechos · ~370 palavras (~2.6 min de fala) · próximo: Vídeos de cada módulo

| Trecho | Cena | Narração | Visual |
|---|---|---|---|
| 01 | Abertura | Cada módulo do Faktory Flow conversa com o próximo. Neste vídeo, vamos ver o caminho inteiro de uma venda, do lead até a gestão, e o que cada módulo entrega para o seguinte. | Logo, trilha e título |
| 02 | Conceito | Tudo começa no CRM, com o lead e a oportunidade. | Linha do tempo: CRM → Vendas → Serviços → Produção → Faturamento → Expedição → Financeiro |
| 03 | Conceito | A oportunidade ganha vira pedido. O pedido gera medição e ordem de produção, depois a nota fiscal, a carga e, no fim, os títulos no financeiro. E tudo chega ao painel da obra. | Linha do tempo: (mesma do trecho anterior) |
| 04 | Regra | Primeira regra do fluxo completo: quase toda passagem é um botão. Gerar pedido de venda, gerar instalação, faturar, liberar para expedição. Saber qual botão leva para o próximo módulo é metade do trabalho. | Cartão "Regra 1: Cada passagem tem um botão" · fonte `regra-servicos-passagens-por-botao-e-ordem-dos-aceites` |
| 05 | Regra | Segunda: o que nasce sozinho. A oportunidade nasce da conversão do lead. As requisições nascem da ordem de produção. Os títulos e a baixa de estoque nascem da nota finalizada. E a entrada do produto acabado nasce do produzido. | Cartão "Regra 2: O que nasce sozinho" · fonte `regra-faturamento-finalizar-nf-gera-os-titulos` |
| 06 | Regra | Terceira: a ordem importa. Ajuste o pedido e ligue a obra antes de faturar. Libere para expedição só depois de faturar. E, no CRM, reverta o ganho antes de gerar o pedido, nunca depois. | Cartão "Regra 3: A ordem importa" · fonte `regra-vendas-editar-pedido-somente-em-aberto` |
| 07 | Na tela | No CRM, a oportunidade nasce da conversão do lead, já com o valor do budget. | Tela `01-crm` · rótulo "1 · CRM › Pipeline" |
| 08 | Na tela | Em vendas, o pedido em aberto, ainda sem títulos e sem nota. | Tela `02-pedido` · rótulo "2 · Vendas › Pedido" |
| 09 | Na tela | Em serviços, a medição aprovada leva à instalação pelo botão gerar instalação. | Tela `03-medicao` · rótulo "3 · Serviços › Medição" |
| 10 | Na tela | Na produção, a ordem produzida lança o acabado no estoque, com custo. | Tela `04-producao` · rótulo "4 · Produção › OP" |
| 11 | Na tela | No faturamento, a nota em homologação é finalizada, e o avião de papel, o transmitir, fica com o responsável fiscal. | Tela `05-nota` · rótulo "5 · Faturamento › Nota" |
| 12 | Na tela | Na expedição, o histórico da carga mostra cada checkpoint, até a saída para a rota. | Tela `06-expedicao` · rótulo "6 · Expedição › Carga" |
| 13 | Na tela | No financeiro, os títulos da nota são recebidos, inclusive em parte. | Tela `07-financeiro` · rótulo "7 · Financeiro › Contas a Receber" |
| 14 | Na tela | E, na gestão, o painel da obra junta vendido, faturado e as pendências de cada documento. | Tela `08-gestao` · rótulo "8 · Gestão › Painel da obra" |
| 15 | Cuidados | Três cuidados no teste completo. Transmitir, cancelar e inutilizar nota é decisão do responsável fiscal. Confira o saldo antes de finalizar a nota, porque ela baixa o estoque mesmo sem saldo. E use só dados de teste, registrando tudo o que criou para limpar depois. | Transmitir, cancelar e inutilizar nota: só o responsável fiscal.; Confira o saldo antes de finalizar a nota: ela baixa mesmo sem estoque.; Use só dados de teste, e registre o que criou para limpar depois. |
| 16 | Fechamento | Resumindo: cada passagem tem um botão, saiba o que nasce sozinho, e respeite a ordem antes de faturar. Para o detalhe de cada módulo, veja os vídeos de cada fluxo. | Cada passagem tem um botão; Saiba o que nasce sozinho; Respeite a ordem antes de faturar |
