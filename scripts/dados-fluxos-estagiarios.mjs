/* Fluxos principais da Trilha do Estagiário: os módulos mais maduros do Faktory Flow (Vendas, Faturamento e Financeiro).
   Diferente dos checklists 01 a 15 (que ensinam a ler cada módulo), estes seguem o fluxo do começo ao fim com os registros do
   próprio estagiário. Origem dos passos: fluxos dos consultores validados no DEV (METALURGICA TEST, v1.22.12) em 19 a 21/10/2026.
   Selos: 'v' = conferido no sistema · 'd' = vem dos roteiros ou só o rótulo foi visto · 'n' = não validado. */

const AVISO_PERMISSAO = ' Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, conta bancária, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.';

export const FLUXOS_PRINCIPAIS = [
  /* ------------------------------------------------------------------ 16 · Vendas */
  {
    id: 'fluxo-vendas', arquivo: '16-fluxo-principal-vendas.html', etiqueta: 'Fluxo principal · Vendas',
    titulo: 'Fluxo principal de Vendas: do pedido à operação', resumo: 'Criar, ajustar e acompanhar o seu pedido de venda até a carteira.',
    subtitulo: 'O ciclo do pedido na prática: ter um pedido, ajustá-lo, entender o menu de ações e achá-lo nos painéis. Vendas é um dos módulos mais maduros do Faktory Flow: siga a ordem.',
    objetivo: 'Conduzir um pedido de venda de treino do cadastro até a porta da operação, sabendo o que cada status e cada botão do menu `⋯` fazem, e conferir o pedido nos painéis comerciais.',
    prerequisitos: [
      { t: 'Checklists 01, 02 e 04 concluídos (o 04 cria o seu primeiro pedido).', s: 'v' },
      { t: 'Cliente, produto e obra de treino do checklist 02, e um **Vendedor** e uma **Condição de Pagamento** cadastrados pelo consultor.', s: 'd' },
      { t: 'Autorização do supervisor para qualquer botão que grave: aqui você grava só registros "TESTE ESTAGIÁRIO".', s: 'v' },
    ],
    fluxos: [
      {
        preparar: true,
        titulo: '1. Preparar seus dados: ter um pedido em aberto', onde: '`Vendas > Pedidos de Venda`',
        intro: 'A sua empresa de treino começa **zerada**: sem pedido não há o que acompanhar. Use o pedido do checklist 04; se ainda não tem, crie agora.' + AVISO_PERMISSAO,
        passos: [
          { t: 'Abrir `Vendas > Pedidos de Venda`, trocar o Status para **Todos** e procurar o seu pedido pelo número.', r: 'A lista começa filtrada em "Em Aberto" e volta a esse filtro quando você sai e entra de novo.', s: 'v', campo: 'Nº do pedido (PV-)' },
          { t: 'Se ainda não tem pedido, criar um: **+ Novo Pedido** (é uma página), **Empresa**, **Cliente**, **Vendedor**, **Condição de Pagamento** e **CFOP**; ao escolher o produto, **Dados do Item** > **Aplicar**; na parcela, **Meio Pagamento** e **Portador**; no Resumo, a **Conta de Fluxo de Caixa**; **Salvar e Permanecer**.', r: 'Mensagem "Pedido PV-xxxxxx criado". O CFOP só libera depois de Empresa e Cliente.', s: 'v' },
          { t: 'Conferir na lista: Status **Em aberto**, TÍTULOS "Sem títulos" e NOTA FISCAL "—".', s: 'v' },
        ],
      },
      {
        titulo: '2. Ajustar o pedido', onde: 'lápis **Editar pedido** na coluna Ações',
        passos: [
          { t: 'Abrir o pedido pelo **lápis** (Editar pedido). Pedido Faturado ou Entregue só tem **Visualizar** (o olho): ajuste antes de faturar.', r: 'O menu `⋯` do pedido não tem "Editar".', s: 'v' },
          { t: 'Preencher o campo **Projeto (opcional)** com a sua obra de treino e clicar em **Salvar e Permanecer**.', r: 'A coluna PROJETO da lista passa a mostrar a obra, sem pedir CFOP nem condição.', s: 'v' },
          { t: 'Adicionar um segundo item e conferir o **Resumo do Pedido** (subtotal e total).', r: 'Visto no PV-000034: um item de 2 × R$ 100,00 elevou Subtotal e Total de R$ 8.653,80 para R$ 8.853,80 e a parcela acompanhou. Os botões de lixeira do item e da parcela não têm rótulo e removem **sem confirmação**.', s: 'v' },
          { t: 'Trocar a **Condição de Pagamento** (ex.: "30/60 Dias") e depois testar os dois botões: **Recalcular** e **Recalcular Parcelas** (no Resumo).', r: 'Trocar a condição já regenera as parcelas sozinho. **Recalcular** redivide o total por igual e mostra "Parcelas recalculadas com base no total do pedido", mantendo datas e quantidade. **Recalcular Parcelas** só redivide os valores, sem aviso e sem regenerar datas nem quantidade, apesar do tooltip "conforme a condição de pagamento".', s: 'v' },
        ],
      },
      {
        titulo: '3. Aprovações', onde: '`Vendas > Aprovações`',
        passos: [
          { t: 'Conferir que o seu pedido, sem desconto, **não** gera aprovação.', r: 'A tela cobre só aprovações de comissão e de desconto.', s: 'v' },
          { t: 'Saber que um desconto acima da faixa de alçada pede a aprovação de **outro usuário** (Supervisor de Vendas ou Gerente Geral). **Nunca aprove o seu próprio.**', r: 'O desconto do item é o campo **Desconto**, em R$; no Resumo aparece como "Descontos − R$ …" e reduz o Total. `Vendas > Aprovações` não tem abas: colunas DOCUMENTO, SOLICITANTE, VALOR, TIPO, ESPERA e AÇÕES, e a lista estava vazia. A mensagem de desconto acima da faixa não foi vista, porque a única faixa (nível 1, "A partir de 5%") está Inativa.', s: 'd' },
        ],
      },
      {
        titulo: '4. O menu de ações e os status', onde: 'menu `⋯` do pedido',
        passos: [
          { t: 'Abrir o menu `⋯` do pedido em aberto e reconhecer: Baixar PDF, Faturar, Dividir em partes, Gerar Títulos, Encerrar, Cancelar e Excluir. Feche **sem clicar**.', r: 'Num pedido Entregue o menu mostra "Já faturado" desabilitado.', s: 'v' },
          { t: 'Entender o caminho dos status: **Em aberto → Faturado → Lib. Expedição → Entregue**. O faturamento é o checklist 17; **Liberar para Expedição** só aparece no menu de pedido **Faturado**.', s: 'v' },
          { t: 'Baixar o **PDF** do pedido e conferir cliente, itens e total.', s: 'd' },
          { t: 'Saber o que **não** usar em treino: Encerrar, Cancelar, Excluir e Dividir em partes alteram o pedido sem desfazer.', s: 'd' },
        ],
      },
      {
        titulo: '5. Achar o pedido nos painéis', onde: '`Vendas > Dashboard Vendas` e `Vendas > Demonstrativos`',
        passos: [
          { t: 'Em `Vendas > Dashboard Vendas`, escolher o período do dia do pedido, clicar em **Aplicar** e achar o pedido em "Pipeline de Vendas (pedidos em aberto)".', r: 'A data no dashboard pode aparecer 1 dia antes da lista (fuso). Os cartões somam o pedido.', s: 'v' },
          { t: 'Em `Vendas > Demonstrativos > Carteira de Pedidos`, achar o pedido no recorte **A faturar** e anotar valor e dias.', s: 'v' },
          { t: 'Em `Vendas por Período`, conferir o valor e o peso do pedido.', s: 'v' },
        ],
      },
      {
        titulo: '6. Do CRM ao pedido (com o supervisor)', onde: 'painel da oportunidade > `Ganha` > `Gerar Pedido de Venda`',
        passos: [
          { t: 'Saber que **Gerar Pedido de Venda** a partir de uma oportunidade ganha só funciona com um CFOP que **não** gera financeiro (ex.: 5910-1); com CFOP de venda o sistema pede condição, plano de conta e parcelas que a tela não tem. O contorno é trocar o CFOP e a condição no próprio pedido, depois.', r: 'O pedido gerado não herda o vendedor nem a condição da proposta; o vínculo com a oportunidade fica só na Obs. Interna.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Tenho um pedido de treino em aberto com cliente, item, parcelas e obra, e sei dizer em que status ele está e o que o próximo botão faz.', s: 'd' },
      { t: 'Achei o pedido no Dashboard Vendas e na Carteira de Pedidos.', s: 'v' },
    ],
    atencao: [
      'O formulário de pedido tem **três botões que gravam**: dois "Salvar" (topo e rodapé) e "Salvar e Permanecer".',
      'Pedido **Faturado** ou **Entregue** só pode ser visualizado: faça os ajustes antes de faturar.',
      'O botão **Aprovar** fica direto na linha em `Vendas > Aprovações`: um clique aprova.',
      'Não use **Fechamento** nem **Comissão manual** em treino: gravam títulos e comissão.',
      'Um pedido pode estar "Em Aberto" e já ter títulos "Gerados": confira as colunas TÍTULOS e NOTA FISCAL.',
    ],
    naoValidado: ['Aprovação de desconto por outro usuário (a empresa de teste só tem um), Dividir em partes, Encerrar e baixar o PDF não foram executados.'],
  },

  /* ------------------------------------------------------------------ 17 · Faturamento */
  {
    id: 'fluxo-faturamento-estagiario', arquivo: '17-fluxo-principal-faturamento.html', etiqueta: 'Fluxo principal · Faturamento',
    titulo: 'Fluxo principal de Faturamento: do pedido à nota finalizada', resumo: 'Faturar o seu pedido em homologação e conferir a nota, sem transmitir.',
    subtitulo: 'Do pedido à nota fiscal em ambiente de homologação: faturar, conferir, finalizar sem transmitir e ver o reflexo no pedido e no estoque. Faturamento é um dos módulos mais maduros do Faktory Flow.',
    objetivo: 'Faturar o seu pedido de treino, conferir a nota antes de finalizar, finalizar **sem transmitir** com a autorização do supervisor e saber o que fica por conta do responsável fiscal.',
    prerequisitos: [
      { t: 'Checklists 04, 12 e 16 concluídos.', s: 'v' },
      { t: 'Ambiente fiscal em **Homologação**: a nota mostra a faixa "Ambiente NF-e: HOMOLOGAÇÃO". Nesta trilha a nota **nunca** é transmitida.', s: 'v' },
      { t: 'Produto com **NCM** com CST de PIS/COFINS de saída (senão a nota sai com "Impostos não calculados no item") e **almoxarifado central ativo** (sem ele "Finalizar NF" recusa).', s: 'v' },
      { t: 'Autorização do supervisor para **Finalizar NF**. Transmitir, cancelar, excluir e inutilizar numeração ficam com o responsável fiscal.', s: 'v' },
    ],
    fluxos: [
      {
        preparar: true,
        titulo: '1. Preparar seus dados: o pedido e o ponto de partida', onde: '`Vendas > Pedidos de Venda` e `Estoque > Saldo`',
        intro: 'A nota nasce de um pedido. Use o pedido em aberto do checklist 04 ou 16 e anote o ponto de partida: no fim você compara o antes e o depois.' + AVISO_PERMISSAO,
        passos: [
          { t: 'Achar o seu pedido em aberto e anotar o número, o valor e as colunas TÍTULOS e NOTA FISCAL.', s: 'v', campo: 'Nº do pedido (PV-)' },
          { t: 'Em `Estoque > Saldo`, anotar o saldo do produto do pedido.', s: 'v', campo: 'Saldo antes' },
        ],
      },
      {
        titulo: '2. Faturar o pedido', onde: 'menu `⋯ > Faturar` do pedido',
        passos: [
          { t: 'No `⋯` do pedido, clicar em **Faturar** e importar os itens no diálogo **Selecionar Itens para Importar** (com "Recalcular impostos").', r: 'Abre a "Nova NF-e — Venda de Mercadoria" com empresa, cliente, vendedor, CFOP, condição e parcelas do pedido; o nº do pedido fica vinculado e não pode ser alterado.', s: 'v' },
          { t: 'Ler o quadro **"Impostos não calculados no item"**, se aparecer.', r: 'Mostra o motivo por tributo (ex.: CST de PIS/COFINS ausente na NCM). A nota pode ser salva assim. Pode aparecer também o aviso "NCM-Estado não configurado para o produto": peça ao supervisor.', s: 'v' },
          { t: 'Conferir o transporte (padrão "9 - Sem Transporte") e o botão **Dados da NF-e** (destinatário, referências, informações adicionais). Em **Observações e Informações Adicionais**, preencher as **Observações Internas**.', s: 'v' },
          { t: 'Clicar em **Salvar e Permanecer**.', r: 'A nota é criada em "Editar NF-e" e o pedido passa a **Faturado**, com a coluna NOTA FISCAL preenchida, mesmo com a nota ainda Em Aberto.', s: 'v', campo: 'Nº da nota' },
        ],
      },
      {
        titulo: '3. Conferir a nota antes de finalizar', onde: '`Faturamento > Notas Fiscais`',
        passos: [
          { t: 'Escolher a aba **NF-e** (produto) e ler os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas.', r: 'O filtro padrão é Status "Em Aberto": uma nota finalizada só aparece trocando o filtro, e os cartões seguem o filtro.', s: 'v' },
          { t: 'Abrir o menu `⋯` da nota e reconhecer: Editar, **Finalizar NF**, Preview da DANFE, Duplicar, Ver Timeline, Anexos e Excluir. O avião de papel na linha é **Transmitir**: **não clique**.', s: 'v' },
          { t: '`⋯ > Preview da DANFE`.', r: 'Abre a prévia em **nova aba** (libere pop-ups): confira emitente, destinatário, itens e totais.', s: 'v' },
          { t: 'Conferir se o ambiente da nota é o esperado (coluna **Ambiente** = Homologação).', s: 'v' },
        ],
      },
      {
        titulo: '4. Finalizar sem transmitir (com autorização)', onde: 'menu `⋯ > Finalizar NF`',
        passos: [
          { t: 'Com a autorização do supervisor, clicar em **Finalizar NF** e confirmar ("a nota ficará disponível apenas para visualização").', r: 'A nota fica "Finalizada". Sem almoxarifado ativo: "Não foi possível resolver o local de estoque…". Com projeto sem local de estoque: "O projeto … não tem local de estoque ativo".', s: 'v' },
          { t: 'Se a finalização falhar, conferir a lista e o **número da nota**.', r: 'A lista pode quebrar com "Algo deu errado… Tentar Novamente" e o número já foi consumido mesmo sem finalizar. Avise o supervisor.', s: 'v' },
          { t: '`⋯ > Ver Timeline` da nota.', r: 'Deveria listar o histórico; no ambiente de teste a timeline apareceu vazia.', s: 'v' },
        ],
      },
      {
        titulo: '5. Conferir o reflexo da nota', onde: '`Vendas > Pedidos de Venda` e `Estoque > Movimentos`',
        passos: [
          { t: 'No pedido, conferir a coluna **NOTA FISCAL** e o status **Faturado**.', s: 'v' },
          { t: 'Em `Estoque > Movimentos` e no saldo do produto, comparar com o "Saldo antes" que você anotou.', r: 'Deveria haver saída de estoque ligada à nota; no ambiente de teste a finalização **não** gerou movimento: anote o que você viu.', s: 'v', campo: 'Saldo depois' },
          { t: 'Saber que o pedido segue para `Liberar para Expedição` (menu `⋯` do pedido Faturado) e para os títulos no Financeiro (checklist 18).', s: 'v' },
        ],
      },
      {
        titulo: '6. O que fica com o responsável fiscal', onde: 'módulo `Fiscal` e `Faturamento > Configurações` (só leitura)',
        passos: [
          { t: 'No módulo `Fiscal`, abrir **NCM**, **CFOP** e **Textos Fiscais** **só lendo**. **CEST** fica em **Editar NCM**, aba ICMS; **CST ICMS** e **CSOSN** ficam em **NCM por Estado** e em **Editar CFOP**.', r: 'CST/CSOSN e CEST não são telas separadas. São mantidos com o contador: alterar afeta todas as notas.', s: 'v' },
          { t: 'Saber que **Transmitir**, **Carta de correção**, **Cancelar** e **Inutilizar numeração** são decisões do responsável fiscal, só em homologação e com certificado válido.', r: 'Carta de correção e cancelamento só aparecem depois da autorização da nota.', s: 'n' },
        ],
      },
    ],
    resultado: [
      { t: 'O pedido ficou **Faturado** e a nota foi finalizada em homologação, sem transmitir.', s: 'v' },
      { t: 'Anotei o que o estoque e a timeline mostraram depois da finalização, mesmo quando divergiu do esperado.', s: 'v' },
    ],
    atencao: [
      '**Transmitir** fica a um clique na linha e é irreversível, mesmo em homologação. **Excluir** está no mesmo menu de Ver Timeline e Anexos.',
      'O pedido fica "Faturado" assim que a nota é **salva**, mesmo Em Aberto: confira o status da nota em Faturamento, não só o do pedido.',
      'Faturar não depende de a OP estar concluída nem de haver saldo.',
      'Em janelas estreitas a tabela de notas fica espremida e a coluna Ambiente é cortada.',
    ],
    naoValidado: ['Transmissão, rejeição, carta de correção, cancelamento e inutilização de numeração não foram executados (dependem do responsável fiscal e de certificado).'],
  },

  /* ------------------------------------------------------------------ 18 · Financeiro */
  {
    id: 'fluxo-financeiro-estagiario', arquivo: '18-fluxo-principal-financeiro.html', etiqueta: 'Fluxo principal · Financeiro',
    titulo: 'Fluxo principal do Financeiro: do título ao fluxo de caixa', resumo: 'Gerar os títulos do pedido, receber, conferir saldos e ler o fluxo de caixa.',
    subtitulo: 'Os títulos nascem do pedido, a baixa move o saldo da conta e o fluxo de caixa mostra o resultado. Financeiro é um dos módulos mais maduros do Faktory Flow. Só com conta bancária e valores de teste.',
    objetivo: 'Gerar os títulos do seu pedido, receber (baixa parcial, total e estorno) numa conta de teste, conferir saldos e extrato e ler o fluxo de caixa, a DRE e o painel da obra sabendo onde os números divergem.',
    prerequisitos: [
      { t: 'Checklists 04, 13 e 17 concluídos.', s: 'v' },
      { t: 'Uma **conta bancária de teste** cadastrada pelo consultor (`Financeiro > Configurações > Contas Bancárias`) e um meio de pagamento que **não** seja do tipo Boleto (Boleto exige conta emissora).', s: 'v' },
      { t: 'Autorização do supervisor para **receber** e **pagar**, só com valores de teste e só na conta de teste. Nunca em produção.', s: 'v' },
    ],
    fluxos: [
      {
        preparar: true,
        titulo: '1. Preparar seus dados: o pedido, a conta e os saldos de partida', onde: '`Vendas > Pedidos de Venda` e `Financeiro > Saldos`',
        intro: 'Os títulos nascem de um pedido e a baixa precisa de uma conta bancária. Anote o ponto de partida para conferir o efeito de cada baixa.' + AVISO_PERMISSAO,
        passos: [
          { t: 'Achar o seu pedido (checklist 04 ou 16) e anotar o número, o valor e a coluna TÍTULOS.', s: 'v', campo: 'Nº do pedido (PV-)' },
          { t: 'Em `Financeiro > Saldos`, anotar o saldo de cada conta antes de começar.', s: 'v', campo: 'Saldo antes' },
          { t: 'Abrir `Configurações > Meios de Pagamento` e ver o **Tipo** do meio da parcela do seu pedido (só leitura).', r: 'No ambiente de teste, até "Duplicata Mercantil" estava como tipo Boleto, e o Gerar Títulos exigia conta emissora. Se for o caso, avise o supervisor: a troca do tipo é decisão do fiscal.', s: 'v' },
        ],
      },
      {
        titulo: '2. Gerar os títulos do pedido', onde: 'menu `⋯ > Gerar Títulos` do pedido',
        passos: [
          { t: 'No menu `⋯` do seu pedido, clicar em **Gerar Títulos** e confirmar.', r: 'Um título por parcela. O item fica habilitado em pedido Em aberto ou Entregue sem títulos; desabilitado quando o pedido está Faturado ("Pedido já faturado") ou já tem títulos (sem explicação na tela). Se o meio da parcela for Boleto sem conta emissora, o sistema recusa.', s: 'v' },
          { t: 'Abrir `Financeiro > Contas a Receber`, limpar o filtro **Status** (ele vem em "Em aberto") e pesquisar o **Documento** do seu pedido.', r: 'Valor e vencimento iguais à parcela; a coluna TÍTULOS do pedido passa a "Gerados".', s: 'v', campo: 'Nº dos títulos' },
        ],
      },
      {
        titulo: '3. Receber: baixa parcial, total e estorno', onde: '`Financeiro > Contas a Receber`',
        intro: 'Receber, estornar e pagar movimentam o saldo de verdade: só na conta de teste, com valor de teste e com a autorização do supervisor.',
        passos: [
          { t: 'Abrir o título e clicar em **Receber**: conta bancária (obrigatória, não tem padrão), data, desconto/acréscimo/juros/multa, meio e **Valor Recebido**; use **Pré-visualizar**.', s: 'v' },
          { t: '**Baixa parcial**: informar um valor menor que o do título e confirmar.', r: '"Baixa parcial realizada; título residual criado": o original fica Recebido e nasce o título /002 com o saldo, no mesmo vencimento.', s: 'v' },
          { t: '**Baixa total** do título residual.', r: '"Título recebido com sucesso"; a soma dos dois é o valor original.', s: 'v' },
          { t: '**Estornar** uma baixa (a parcial de teste).', r: 'O título volta a "Em aberto", os dados de recebimento são limpos e o residual /002 some.', s: 'v' },
        ],
      },
      {
        titulo: '4. Saldos e extrato', onde: '`Financeiro > Saldos` e `Extrato`',
        passos: [
          { t: 'Depois de cada baixa, conferir `Financeiro > Saldos`.', r: 'O saldo da conta sobe ou desce exatamente o valor baixado, na hora.', s: 'v', campo: 'Saldo depois' },
          { t: 'Abrir o **Extrato** da conta e achar o crédito do dia.', r: 'Não existe item "Conciliação" no menu: o mais próximo é o Extrato.', s: 'v' },
        ],
      },
      {
        titulo: '5. Contas a Pagar (só ler o diálogo)', onde: '`Financeiro > Contas a Pagar`',
        passos: [
          { t: 'Localizar um título a pagar (ex.: o de um recebimento de compra) e abrir o diálogo **Pagar**, **sem confirmar**.', r: 'Campos: Conta Bancária*, Data Pagamento*, valores, Meio de Pagamento e Valor Pago*. O meio informado na parcela da nota não vem preenchido.', s: 'v' },
          { t: 'Saber que **Pagamentos** é uma aba de Contas a Pagar e que **Confirmar Pagamento** tira o título de "Em aberto", diminui o saldo e cria o débito no Extrato. Quem paga é o consultor.', s: 'v' },
        ],
      },
      {
        titulo: '6. Fluxo de caixa, DRE e painel da obra', onde: '`Financeiro > Fluxo de Caixa`, `DRE` e `Painel Financeiro de Projetos`',
        passos: [
          { t: 'Abrir o **Fluxo de Caixa** do mês (Ambos, Hierarquias) e achar as linhas dos seus lançamentos.', r: 'Receitas em "Vendas" e pagamentos na conta de despesa do fornecedor.', s: 'v' },
          { t: 'Comparar **Saldo Inicial** e **Saldo Final** com os Saldos.', r: 'No ambiente de teste o saldo inicial absorveu o movimento do mês (inicial negativo, final R$ 0,00): anote os números, é um defeito conhecido.', s: 'v' },
          { t: 'Abrir a **DRE** e o **Painel Financeiro de Projetos** da sua obra.', r: 'A receita vem do que foi recebido e faturado. Sem projeto no pedido o painel mostra "A faturar" negativo; título manual e título gerado do mesmo pedido duplicam a receita.', s: 'v' },
          { t: 'Conferir "Recebido no mês", "A receber" e "A pagar" no **Resumo do negócio** da tela Início.', r: 'Numa baixa parcial o card "Recebido no mês" soma o valor original do título (baixa de 400 de um título de 865 somou 865): confira contra o Extrato.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Os títulos do meu pedido foram gerados com valor e vencimento certos.', s: 'v' },
      { t: 'A baixa (parcial, total e estorno) refletiu em Contas a Receber e nos Saldos, e eu anotei onde o Fluxo de Caixa e o card "Recebido no mês" divergiram.', s: 'v' },
    ],
    atencao: [
      'Baixar, pagar, estornar e gerar boleto movimentam dinheiro de verdade: só em conta de teste e com valor de teste.',
      'Excluir um título (lixeira) é permanente: estorne antes e só exclua o que você criou.',
      'Baixa parcial cria um **título residual** /002: não é duplicidade, e o estorno da parcial faz o /002 sumir.',
      'Título manual e título gerado do mesmo pedido **duplicam** DRE, painel e "Recebido no mês": use um só.',
      'Contas Bancárias, Boleto e Webservice de bancos são configurações sensíveis: só leitura.',
    ],
    naoValidado: ['Transferências, boleto/PIX, Budget vs Realizado e a conciliação não foram concluídos no sistema.'],
  },
];
