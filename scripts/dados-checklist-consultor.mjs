/* Checklist do consultor: teste funcional do fluxo completo, do lead ao resultado da obra.
   Ordem e regras conferidas na execução real de 19/10/2026 (dev, METALURGICA TEST, v1.22.12): PV-000033, OP-000109,
   MED-000012, NF-019, carga 20261000001. Mesmos selos da Trilha do Estagiário ('v' executado/conferido no sistema,
   'd' documentação, 'n' não validado). `campo` cria um campo de texto para anotar o número do registro criado. */

export const CONSULTOR = {
  id: 'fluxo-completo', arquivo: 'teste-fluxo-pedido-ate-gestao.html', etiqueta: 'Consultor · Teste de fluxo',
  titulo: 'Teste do fluxo completo: do pedido à gestão',
  video: { id: 'consultor-fluxo-completo', titulo: 'Do lead à gestão, módulo por módulo', resumo: 'O que cada módulo entrega ao seguinte, o que nasce sozinho e a ordem que evita retrabalho.' },
  rodape: 'Teste de Fluxo · Consultor · Faktory Flow v1.22.12 · roteiro executado em 16 e 19/10/2026 (dev METALURGICA TEST)',
  subtitulo: 'Roteiro para o consultor provar, num ambiente de teste, que um pedido atravessa todos os módulos e chega aos indicadores de gestão com os números certos. A ordem abaixo é a que o sistema exige na prática. Anote o número de cada registro: ele serve para conferir os reflexos e para a limpeza no fim.',
  objetivo: 'Executar o ciclo completo com registros "TESTE FLUXO CONSULTOR" — lead, pedido, medição, OP, nota, expedição, títulos e indicadores — confirmando em cada passagem que o módulo seguinte recebeu a informação, e registrar os bloqueios e defeitos encontrados.',
  prerequisitos: [
    { t: 'Ambiente de **teste** (dev ou staging) em **uma aba** logada, com a empresa conferida no selo do topo. A sessão do ambiente de teste cai em atualizações do sistema: salve com frequência.', s: 'v', campo: 'Empresa / versão' },
    { t: 'Ambiente fiscal em **Homologação** (faixa "Ambiente NF-e: HOMOLOGAÇÃO" na nota). Mesmo assim, a nota **não** será transmitida.', s: 'v' },
    { t: 'Produto com **unidade de medida cadastrada na empresa com a mesma sigla** do produto ("PÇ" ≠ "PC"). Sem isso o pedido só falha no Salvar.', s: 'v', campo: 'Código do produto' },
    { t: '**Almoxarifado central ativo** em `Estoque > Locais` (ou local de estoque da obra). Sem ele não dá para concluir a OP nem finalizar a nota.', s: 'v' },
    { t: '**Conta bancária emissora/favorita** se o meio de pagamento gerar boleto. No teste, "Duplicata Mercantil" também foi tratada como boleto ao gerar títulos.', s: 'v' },
    { t: 'Consultor **vinculado a um participante** em `Serviços > Configurações > Conferentes` (para aprovar medição). Quem confere não pode ser quem mediu.', s: 'v' },
    { t: 'NCM do produto com CST de PIS/COFINS de saída (senão a nota sai com "Impostos não calculados"), motorista com CNH válida e pop-ups liberados (Preview da DANFE abre em nova aba).', s: 'v' },
    { t: 'Caixa de e-mail de teste para o cliente (ex.: endereço @tuamaeaquelaursa.com, pública e temporária — só dados fictícios).', s: 'v', campo: 'E-mail de teste' },
  ],
  fluxos: [
    {
      titulo: '1. CRM: lead até a conversão', onde: '`CRM > Vendas > Leads`',
      passos: [
        { t: '`Novo Lead`: Tipo PF/PJ e Razão Social começando por "TESTE FLUXO CONSULTOR"; CPF/CNPJ de teste; CEP e número; contato com o e-mail de teste e as chaves de e-mail (Notas Fiscais, Boletos, Vendas) ligadas.', r: '"Registro salvo com sucesso!" e lead com Status "Novo".', s: 'v', campo: 'Código do lead' },
        { t: 'Se o bairro preenchido pelo CEP tiver menos de 3 letras, o sistema recusa ao salvar: registre o defeito e ajuste o bairro.', s: 'v' },
        { t: 'No `Kanban de Leads`, levar o lead a uma etapa de **60% ou mais** (MQL, SQL ou Demo agendada), confirmando cada diálogo "Mover lead".', s: 'v' },
        { t: 'Em `Editar Lead`, completar o **BANT** (Budget Estimado e chaves Autoridade, Necessidade e Prazo/timeline) e salvar. Conferir a Temperatura depois: ela mudou sozinha no teste.', s: 'v' },
        { t: '`⋮ > Converter` e confirmar.', r: '"Lead convertido com sucesso!". No participante, "É Cliente?" ligado e "Prospect/Lead" desligado.', s: 'v' },
      ],
    },
    {
      titulo: '2. Vendas: pedido', onde: '`Vendas > Pedidos de Venda > + Novo Pedido`',
      passos: [
        { t: 'Empresa, Cliente, Vendedor, Condição de Pagamento e Projeto (opcional). Escolher o **CFOP** (só libera depois de empresa e cliente; vem filtrado pelo estado do cliente).', s: 'v' },
        { t: 'Adicionar o item. Produtos de esquadria abrem "Dados do Item" (altura, largura, comprimento, peso, cor).', r: 'Pode aparecer o quadro "Impostos não calculados no item" com o motivo (ex.: CST de PIS/COFINS ausente na NCM). O pedido salva mesmo assim.', s: 'v' },
        { t: 'Na parcela, Meio de Pagamento e Portador; no Resumo, a Conta de Fluxo de Caixa de venda.', s: 'v' },
        { t: '**Salvar e Permanecer**.', r: '"Pedido PV-xxxxxx criado". Na lista: Em aberto, "Sem títulos", Nota Fiscal "—".', s: 'v', campo: 'Nº do pedido (PV-)' },
        { t: 'Conferir `Vendas > Aprovações`: ela cobre só comissão e desconto. Pedido sem desconto não gera aprovação.', s: 'v' },
      ],
    },
    {
      titulo: '3. Serviços: medição', onde: '`Serviços > Medições > + Nova Medição`',
      passos: [
        { t: 'Buscar o pedido > **Usar este registro** > importar os itens (vãos).', r: 'Cliente e pedido vêm preenchidos; **Empresa** e o endereço da obra, não.', s: 'v' },
        { t: 'Preencher Empresa e Técnico Responsável > Salvar.', s: 'v', campo: 'Nº da medição (MED-)' },
        { t: 'Lançar largura e altura (mm) dos vãos > `Medir vãos` > **Iniciar medição** > **Concluir medição** com a assinatura do responsável pela obra.', r: 'Status "Aguardando Conferência".', s: 'v' },
        { t: 'Aprovar a medição com um usuário conferente **diferente de quem mediu**.', r: 'Medição "Aprovada". Com o mesmo usuário o sistema recusa: "O conferente da medição deve ser diferente do técnico responsável que a realizou" (regra confirmada).', s: 'v' },
      ],
    },
    {
      titulo: '4. Produção: ordem de produção', onde: '`Produção > Ordens de produção > Nova OP`',
      intro: 'O pedido não tem "Gerar OP": a OP é criada à mão e vinculada ao pedido.',
      passos: [
        { t: 'Escolher **Pedido de venda** e **Item do pedido** (copia produto, cor e medidas, mas **não** a quantidade), informar **Quantidade** e **Empresa** (obrigatória, apesar da dica de que herda do pedido). Não use Esc: fecha o painel e perde o formulário.', r: '"Registro salvo com sucesso!". Produto sem estrutura avisa "OP sem requisições da estrutura".', s: 'v', campo: 'Nº da OP' },
        { t: 'Anotar o saldo do produto em `Estoque > Saldo` antes de produzir.', s: 'v', campo: 'Saldo antes' },
        { t: '▶ **Iniciar apontamento** escolhendo etapa e funcionário.', r: 'OP passa para "Em execução".', s: 'v' },
        { t: '▶ de novo > **Finalizar** o apontamento com a quantidade produzida.', r: 'No teste de 19/10 o sistema recusou com "A data/hora de fim não pode ser no futuro" (defeito de horário no servidor): se acontecer, registre.', s: 'v' },
        { t: '`Mais ações > Marcar produzido`.', r: 'OP "Produzido" e movimento "Entrada de produto acabado (OP)" no almoxarifado central. Sem almoxarifado ativo, o sistema bloqueia. Um apontamento aberto continua aberto mesmo com a OP produzida.', s: 'v', campo: 'Saldo depois' },
      ],
    },
    {
      titulo: '5. Faturamento: nota sem transmitir', onde: 'menu `⋯ > Faturar` do pedido',
      passos: [
        { t: 'Importar os itens do pedido (com "Recalcular impostos") e conferir a nota: cliente, CFOP, parcelas, impostos e faixa de Homologação.', s: 'v' },
        { t: 'Preencher Observações Internas e **Salvar e Permanecer**.', r: 'O pedido passa a "Faturado" com a coluna NOTA FISCAL preenchida — **mesmo com a nota ainda Em Aberto**.', s: 'v', campo: 'Nº da nota' },
        { t: '`Faturamento > Notas Fiscais` > `⋯ > Finalizar NF`. **Nunca** use o avião de papel (Transmitir).', r: 'Nota "Finalizada", só para visualização. Sem local de estoque o sistema bloqueia (e o número da nota é consumido mesmo assim). No teste a finalização não gerou saída de estoque.', s: 'v' },
        { t: '`⋯ > Ver Timeline` e `Preview da DANFE` (abre em nova aba).', s: 'v' },
      ],
    },
    {
      titulo: '6. Expedição: carga e entrega', onde: '`⋯ > Liberar para Expedição` do pedido e `Expedição > Montar Nova Carga`',
      passos: [
        { t: 'Liberar o pedido para expedição: a opção **só aparece depois de faturado**.', r: 'Status "Lib. Expedição".', s: 'v' },
        { t: 'Montar Nova Carga: marcar o pedido, escolher veículo, data de saída e motorista > **Montar Carga**.', r: 'Carga "Em Montagem". Pode avisar "item sem ordem de produção vinculada" mesmo com OP (defeito).', s: 'v', campo: 'Nº da carga' },
        { t: '**Fechar Carga** (motorista com CNH vencida exige justificativa).', r: 'Carga "Fechada".', s: 'v' },
        { t: 'Apontar **Separação**, **Conferência** e **Carregamento** (bipar ou confirmar o volume).', r: '"Todos os checkpoints concluídos!".', s: 'v' },
        { t: '**Iniciar Rota** > em "Apontamentos do Motorista", **Entregue** com nome do recebedor e motivo da confirmação sem comprovante.', r: 'Carga e pedido "Entregue"; histórico completo da carga.', s: 'v' },
      ],
    },
    {
      titulo: '7. Financeiro: títulos e baixa', onde: '`⋯ > Gerar Títulos` do pedido e `Financeiro > Contas a Receber`',
      passos: [
        { t: 'Gerar os títulos do pedido. A opção fica desabilitada em Faturado/Lib. Expedição ("Pedido já faturado") e volta depois de Entregue.', r: 'Um título por parcela. Se o meio de pagamento estiver cadastrado como tipo Boleto (no teste, até "Duplicata Mercantil" estava), o sistema exige conta **emissora** de boletos — conta padrão não basta.', s: 'v', campo: 'Nº dos títulos' },
        { t: 'Localizar os títulos em Contas a Receber e conferir valor e vencimento com a parcela do pedido.', s: 'n' },
        { t: 'Conferir em `Configurações > Meios de Pagamento` o tipo de cada meio usado no pedido (Boleto × outros).', s: 'v' },
        { t: 'Baixar um título de teste (recebimento simulado) e conferir Contas a Receber, Saldos, Fluxo de Caixa e o "Recebido no mês" da tela Início.', r: 'No teste (título manual de R$ 865,38) os quatro refletiram a baixa; o Fluxo de Caixa mostrou saldo inicial negativo e final zero (a investigar).', s: 'v' },
      ],
    },
    {
      titulo: '8. Gestão: o pedido nos indicadores',
      passos: [
        { t: '`Vendas > Dashboard Vendas`: o pedido entra em Total em vendas, Distribuição por status, Top clientes e produtos.', r: 'No teste a "Taxa de faturamento" mostrou "0 faturados" com o pedido já entregue (defeito).', s: 'v' },
        { t: '`Vendas > Demonstrativos > Carteira de Pedidos`: o pedido aparece no recorte do status atual (ex.: Entregue) com o número da carga.', s: 'v' },
        { t: '`Painel Financeiro de Projetos` e `DRE`: conferir receita e custos da obra.', r: 'No teste o DRE mostrou a receita recebida; o painel da obra mostrou "A faturar" negativo porque o pedido não tinha projeto (só a nota).', s: 'v' },
        { t: '`Estoque > Movimentos`: conferir as entradas da OP e a saída da nota.', r: 'No teste só a conclusão da OP gerou movimento; faturamento e entrega não deram saída de estoque (defeito).', s: 'v' },
      ],
    },
    {
      titulo: '9. E-mails e limpeza',
      passos: [
        { t: 'Abrir a caixa de e-mail de teste e anotar quais etapas enviaram e-mail (nota, boleto, aviso de entrega, serviços).', s: 'n', campo: 'E-mails recebidos' },
        { t: 'Listar todos os registros e configurações "TESTE FLUXO CONSULTOR" criados e combinar com o time a limpeza.', s: 'v' },
      ],
    },
  ],
  resultado: [
    { t: 'Cada módulo mostrou o reflexo da etapa anterior (pedido → medição → OP → nota → carga → títulos).', s: 'd' },
    { t: 'Os valores conferem entre pedido, nota, títulos e painéis.', s: 'd' },
    { t: 'Nenhuma nota foi transmitida e nenhum registro real foi alterado.', s: 'v' },
    { t: 'Os defeitos encontrados foram anotados com os passos para reproduzir.', s: 'v' },
  ],
  atencao: [
    'A ordem que o sistema exige é: pedido → medição → OP (manual) → **faturar** → finalizar nota → liberar para expedição → carga → entrega → títulos. "Liberar para Expedição" e a carga só aceitam pedido faturado.',
    '**Transmitir** a nota é irreversível, mesmo em homologação: este roteiro só finaliza.',
    'O pedido vira "Faturado" ao **salvar** a nota, mesmo com ela Em Aberto. Confira o status da nota em Documentos Fiscais, não só o do pedido.',
    'Faturar não depende de a OP estar concluída nem de haver saldo em estoque.',
    'Configurações de teste (unidade de medida, local de estoque, conta bancária, conferente) também precisam entrar na lista de limpeza.',
    'Vincule o pedido à obra (Projeto) desde o início: sem isso o painel financeiro da obra fica incoerente.',
    'Converter o lead **não** cria pedido, e o pedido **não** gera OP: os dois são feitos à mão.',
  ],
  naoValidado: [
    'Execução de 19/10/2026 (dev): lead convertido → PV-000033 → MED-000012 (aguardando conferente diferente) → OP-000109 produzida → NF-019 finalizada sem transmitir → carga 20261000001 entregue → baixa testada com título manual. "Gerar Títulos" do pedido não foi concluído: depende de conta emissora de boletos ou de corrigir o tipo do meio "Duplicata Mercantil".',
    'Defeitos: bairro curto recusado; Temperatura do lead muda sozinha; apontamento não finaliza ("data/hora de fim no futuro") e fica aberto após a OP produzida; Empresa da OP não herda do pedido; "Duplicata Mercantil" cadastrada como boleto; pedido "Faturado" com nota em aberto; número de nota consumido em finalização com erro; Timeline da nota vazia; carga diz "sem OP vinculada"; "0 faturados" no dashboard; faturamento e entrega sem saída de estoque; Fluxo de Caixa com saldo inicial negativo; "A faturar" negativo no painel da obra.',
  ],
};
