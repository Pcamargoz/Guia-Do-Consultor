/* Fluxos de faturamento, financeiro, projetos e tarefas para VALIDAÇÃO MANUAL por pessoas.
   Escritos a partir dos planos de QA (public/checklists/validacao-*.html), do Guia do Consultor e do que já foi visto no sistema.
   Selos: 'v' = visto no sistema nas explorações de 16, 19 e 20/10/2026; 'd' = vem dos roteiros, ainda não executado por uma pessoa; 'n' = por confirmar. */

const AVISO_MANUAL = 'Roteiro escrito a partir dos planos de validação: a execução por uma pessoa é a primeira validação. Marque o que confere e use "Problema" no que divergir.';

export const FLUXOS_GESTAO = [
  /* ------------------------------------------------------------------ Faturamento e Fiscal */
  {
    id: 'fluxo-faturamento', arquivo: 'fluxo-07-faturamento-fiscal.html', etiqueta: 'Consultor · Fluxo de faturamento e fiscal',
    titulo: 'Fluxo de faturamento e fiscal: do pedido à nota finalizada',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22 · NF-019 gerada e finalizada em 19/10/2026 (homologação, sem transmitir); cancelamento, carta de correção e transmissão aguardam validação por quem responde pelo fiscal',
    subtitulo: 'Pedido de venda → Faturar → conferir impostos → salvar a nota → finalizar → conferir pedido, estoque e timeline. O que for fiscal de verdade (transmitir, cancelar, inutilizar) é marcado como decisão de quem responde pelo fiscal.',
    video: { id: 'consultor-07-faturamento', titulo: 'Do pedido à nota finalizada', resumo: 'Faturar, importar os itens, entender o aviso de impostos, finalizar sem transmitir e saber o que é do responsável fiscal.' },
    objetivo: 'Provar que o pedido vira nota com cliente, CFOP, parcelas e impostos corretos, que a finalização trava a nota e atualiza pedido e estoque, e reconhecer o que só o responsável fiscal pode fazer.',
    prerequisitos: [
      { t: 'Ambiente fiscal em **Homologação** (a nota mostra a faixa "Ambiente NF-e: HOMOLOGAÇÃO — sem validade fiscal").', s: 'v' },
      { t: 'Pedido de venda de teste e **almoxarifado central ativo** (ou local de estoque da obra): sem eles "Finalizar NF" recusa.', s: 'v', campo: 'Nº do pedido' },
      { t: 'NCM do produto com **CST de PIS/COFINS de saída**; sem isso a nota sai com o quadro "Impostos não calculados" (o salvamento ainda é permitido).', s: 'v' },
      { t: 'Certificado digital válido e CFOP/Textos fiscais definidos pelo contador (só leitura para quem não é do fiscal).', s: 'd' },
      { t: 'Combinar quem **autoriza** transmitir, cancelar ou inutilizar numeração. Nada disso é feito sem o responsável fiscal.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Faturar o pedido', onde: 'menu `⋯ > Faturar` do pedido',
        passos: [
          { t: 'No `⋯` do pedido, clicar em **Faturar** e importar os itens (com "Recalcular impostos").', r: 'Abre "Nova NF-e — Venda de Mercadoria" com empresa, cliente, vendedor, CFOP, condição e parcelas do pedido; o nº do pedido fica vinculado e não pode ser alterado.', s: 'v' },
          { t: 'Ler o quadro **"Impostos não calculados no item"** se aparecer.', r: 'Mostra o motivo por tributo (ex.: CST de PIS/COFINS ausente na NCM; DIFAL não aplicável a Simples Nacional). A nota pode ser salva assim.', s: 'v' },
          { t: 'Conferir o transporte (padrão "9 - Sem Transporte") e o botão "Dados da NF-e" (destinatário, referências, informações adicionais).', s: 'v' },
          { t: '**Salvar e Permanecer**.', r: 'Nota criada em "Editar NF-e". O pedido passa a **"Faturado"** e a coluna NOTA FISCAL é preenchida — mesmo com a nota ainda Em Aberto.', s: 'v', campo: 'Nº da nota' },
        ],
      },
      {
        titulo: '2. Conferir a nota antes de finalizar', onde: '`Faturamento > Notas Fiscais`',
        passos: [
          { t: 'Escolher a aba **NF-e** (produto) ou **NFS-e** (serviço) e ler os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas.', r: 'O filtro padrão é Status "Em Aberto". Com ele, "Valor Total" e "Canceladas" podem confundir: confirme com o supervisor antes de usar os números.', s: 'v' },
          { t: 'Abrir o menu `⋯` da nota.', r: 'Editar, **Finalizar NF**, Preview da DANFE, Duplicar, Ver Timeline, Anexos e Excluir. O avião de papel na linha é **Transmitir**.', s: 'v' },
          { t: '`⋯ > Preview da DANFE`.', r: 'Abre a prévia em **nova aba** (libere pop-ups); confira emitente, destinatário, itens e totais.', s: 'v' },
          { t: 'Conferir se o ambiente da nota é o esperado (coluna Ambiente = Homologação).', s: 'v' },
        ],
      },
      {
        titulo: '3. Finalizar sem transmitir', onde: '`⋯ > Finalizar NF`',
        passos: [
          { t: 'Clicar em **Finalizar NF** e confirmar ("a nota ficará disponível apenas para visualização").', r: 'Nota "Finalizada". Sem almoxarifado ativo: "Não foi possível resolver o local de estoque…". Com projeto sem local de estoque: "O projeto … não tem local de estoque ativo".', s: 'v' },
          { t: 'Se a finalização falhar, conferir a lista e o **número da nota**.', r: 'A lista pode quebrar com "Algo deu errado… Tentar Novamente" e o número da nota já foi consumido mesmo sem finalizar.', s: 'v' },
          { t: '`⋯ > Ver Timeline`.', r: 'Deveria listar o histórico da nota; no ambiente de teste a timeline apareceu vazia.', s: 'v' },
          { t: 'Conferir o **estoque**: `Estoque > Movimentos` e o saldo do produto.', r: 'Deveria haver saída de estoque ligada à nota; no ambiente de teste a finalização não gerou movimento.', s: 'v' },
          { t: 'Conferir o pedido: coluna NOTA FISCAL e status.', s: 'v' },
        ],
      },
      {
        titulo: '4. Decisões do responsável fiscal (só com autorização)', onde: 'ações com efeito fiscal',
        passos: [
          { t: '**Transmitir** a nota (avião de papel) **somente** em homologação, com certificado válido e autorização do responsável fiscal.', r: 'A nota recebe retorno de autorização/rejeição; acompanhe o status e o XML/DANFE.', s: 'n' },
          { t: 'Rejeição: ler o motivo, corrigir a nota (ou o cadastro fiscal) e retransmitir.', s: 'n' },
          { t: 'Carta de correção e cancelamento de uma nota **autorizada de teste**.', r: 'Não aparecem no menu de uma nota "Em Aberto": só depois da autorização.', s: 'n' },
          { t: 'Inutilização de numeração (`Faturamento > Configurações > Inutilização de Numeração`).', s: 'n' },
        ],
      },
      {
        titulo: '5. Cadastros fiscais (leitura)', onde: 'módulo `Fiscal` e `Faturamento > Configurações`',
        passos: [
          { t: 'Percorrer NCM, CFOP, CST/CSOSN, CEST e Textos Fiscais **só lendo**.', r: 'São mantidos com o contador; alterar afeta todas as notas.', s: 'd' },
          { t: 'Abrir Painel Fiscal, Diagnóstico e Onboarding Fiscal.', s: 'n' },
        ],
      },
    ],
    resultado: [
      { t: 'A nota nasceu do pedido com cliente, itens, CFOP e parcelas corretos.', s: 'v' },
      { t: 'A finalização travou a nota e o pedido, o estoque e a timeline refletiram (ou os desvios foram anotados).', s: 'v' },
      { t: 'Nenhuma nota foi transmitida sem autorização do responsável fiscal.', s: 'v' },
    ],
    atencao: [
      '**Transmitir** fica a um clique na linha e é irreversível, mesmo em homologação. **Excluir** está no mesmo menu de Ver Timeline e Anexos.',
      'O pedido fica "Faturado" assim que a nota é **salva**, mesmo Em Aberto: confira o status da nota em Documentos Fiscais, não só o do pedido.',
      'Faturar não depende de a OP estar concluída nem de haver saldo.',
      'Os cartões de totais seguem o filtro de status (padrão "Em Aberto"): uma nota finalizada ou autorizada só aparece trocando o filtro.',
      'Em janelas estreitas a tabela de notas fica espremida e a coluna Ambiente é cortada.',
    ],
    naoValidado: [AVISO_MANUAL, 'Transmissão, rejeição, carta de correção, cancelamento, NFS-e, Vendas futuras e Controle de Terceiros não foram executados.'],
  },

  /* ------------------------------------------------------------------ Financeiro */
  {
    id: 'fluxo-financeiro', arquivo: 'fluxo-08-financeiro.html', etiqueta: 'Consultor · Fluxo financeiro',
    titulo: 'Fluxo financeiro: títulos, baixa, saldos e fluxo de caixa',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22 · geração de títulos, baixa parcial/total, estorno, saldos, fluxo de caixa, DRE e painel executados em 20/10/2026 (dev); "Gerar Títulos" exigiu trocar o tipo do meio "Duplicata Mercantil" de Boleto para Outros',
    subtitulo: 'Pedido → Gerar Títulos → Contas a Receber → baixa (parcial e total) → estorno → Saldos → Fluxo de Caixa → DRE e painel da obra. Inclui o pagamento de um título a pagar.',
    video: { id: 'consultor-08-financeiro', titulo: 'Títulos, baixa e saldos', resumo: 'De onde nascem os títulos (pedido ou nota), a baixa parcial com o título residual e o saldo da conta antes e depois.' },
    objetivo: 'Provar que os títulos nascem do pedido (ou da nota/recebimento), que a baixa move o saldo da conta e o fluxo de caixa, e que os painéis de gestão mostram o mesmo número.',
    prerequisitos: [
      { t: '**Meios de pagamento** conferidos em `Configurações > Meios de Pagamento`: o **Tipo** de cada meio. Meios de tipo **Boleto** exigem conta emissora; no ambiente de teste, até "Duplicata Mercantil" estava como Boleto.', s: 'v', campo: 'Meio usado / tipo' },
      { t: '**Conta bancária** cadastrada (`Configurações > Contas Bancárias`) para receber e pagar; para boleto, uma conta **emissora** (conta padrão não basta).', s: 'v' },
      { t: 'Participante com **Conta de Fluxo de Caixa Receita/Despesa** preenchida (ela decide em que linha do fluxo o valor cai).', s: 'v' },
      { t: 'Pedido de teste entregue ou faturado e, se possível, vinculado a uma obra (para o painel financeiro da obra).', s: 'v', campo: 'Nº do pedido' },
      { t: 'Anotar o saldo de cada conta em `Financeiro > Saldos` antes de começar.', s: 'v', campo: 'Saldo antes' },
    ],
    fluxos: [
      {
        titulo: '1. Gerar os títulos do pedido', onde: 'menu `⋯ > Gerar Títulos` em `Vendas > Pedidos de Venda`',
        passos: [
          { t: 'Conferir quando **Gerar Títulos** está habilitado no menu do pedido.', r: 'Fica desabilitado em Faturado/Lib. Expedição ("Pedido já faturado") e volta depois de Entregue.', s: 'v' },
          { t: 'Clicar em **Gerar Títulos** e confirmar.', r: 'Um título por parcela. Se o meio da parcela for de tipo Boleto: "Parcela 1: meio de pagamento Boleto exige uma conta bancária…" (a mensagem diz Boleto mesmo quando o meio é Duplicata Mercantil).', s: 'v' },
          { t: 'Em `Configurações > Meios de Pagamento`, abrir o meio da parcela e ver o **Tipo**.', r: 'Os tipos são Cartão de Crédito/Débito, Dinheiro, PIX, Boleto, Transferência, Cheque e Outros. Mudar o tipo altera o que sai na nota: decisão do fiscal.', s: 'v' },
          { t: 'Depois de resolver o bloqueio, gerar os títulos e abrir `Financeiro > Contas a Receber`.', r: 'Valor e vencimento iguais à parcela do pedido; a coluna TÍTULOS do pedido passa a "Gerados". Com o tipo do meio trocado para Outros, o PV-000033 gerou o título /001 de R$ 865,38 (vencimento 18/11/2026), sem conta emissora.', s: 'v', campo: 'Nº dos títulos' },
        ],
      },
      {
        titulo: '2. Contas a Receber e baixa', onde: '`Financeiro > Contas a Receber`',
        passos: [
          { t: 'Ler os filtros (padrão "Em aberto"), os cartões e abrir um título.', r: 'Documento, parcela, vencimento, valor e situação.', s: 'v' },
          { t: '**Receber** o título: conta bancária (obrigatória), data, desconto/acréscimo/juros/multa, meio e **Valor Recebido**.', r: 'Dialogo "Receber Contas a Receber" com "Pré-visualizar". A conta bancária não tem padrão.', s: 'v' },
          { t: '**Baixa parcial**: informar um valor menor que o do título.', r: '"Baixa parcial realizada; título residual criado": o original fica Recebido e nasce o título /002 com o saldo, no mesmo vencimento.', s: 'v' },
          { t: '**Baixa total** do título residual.', r: '"Título recebido com sucesso"; soma dos dois = valor original.', s: 'v' },
          { t: '**Estornar** uma baixa.', r: 'O título volta a "Em aberto" e os dados de recebimento são limpos.', s: 'v' },
          { t: 'Conferir `Financeiro > Saldos` depois de cada baixa.', r: 'O saldo da conta sobe/desce exatamente o valor baixado, na hora.', s: 'v', campo: 'Saldo depois' },
        ],
      },
      {
        titulo: '3. Contas a Pagar', onde: '`Financeiro > Contas a Pagar`',
        passos: [
          { t: 'Localizar um título a pagar (ex.: o de um recebimento de compra) e clicar em **Pagar**.', r: 'Campos: Conta Bancária*, Data Pagamento*, valores, Meio de Pagamento e Valor Pago*. O meio informado na parcela da nota não vem preenchido.', s: 'v' },
          { t: '**Confirmar Pagamento** e conferir a lista, os Saldos e o Extrato da conta.', r: 'O título sai de "Em aberto"; o saldo da conta diminui; o Extrato mostra o débito.', s: 'v' },
          { t: 'Saber que **Pagamentos** é uma aba de Contas a Pagar e que não há item "Conciliação" no menu: o mais próximo é **Extrato**.', s: 'v' },
        ],
      },
      {
        titulo: '4. Fluxo de caixa e demonstrativos', onde: '`Financeiro > Fluxo de Caixa`, `DRE`, `Budget vs Realizado`',
        passos: [
          { t: 'Abrir o **Fluxo de Caixa** do mês (Ambos, Hierarquias) e achar as linhas dos lançamentos de teste.', r: 'Receitas em "Vendas" e pagamentos na conta de despesa do fornecedor (ex.: Compra de Matéria Prima).', s: 'v' },
          { t: 'Comparar **Saldo Inicial** e **Saldo Final** com `Financeiro > Saldos`.', r: 'Deveriam bater com o saldo real das contas. No ambiente de teste o saldo inicial absorveu o movimento do mês (inicial negativo, final R$ 0,00): anote os números.', s: 'v' },
          { t: 'Abrir a **DRE** e o **Painel Financeiro de Projetos** da obra do pedido.', r: 'A receita vem do que foi recebido/faturado; sem projeto no pedido o painel mostra "A faturar" negativo e andamento incoerente.', s: 'v' },
          { t: 'Conferir "Recebido no mês", "A receber" e "A pagar" no **Resumo do negócio** da tela Início.', r: 'O valor baixado hoje entra em "Recebido no mês", mas numa baixa parcial o card soma o valor original do título (baixa de 400,00 de um título de 865,38 somou +865): confira o card contra o Extrato.', s: 'v' },
        ],
      },
      {
        titulo: '5. Configurações (leitura)', onde: '`Financeiro > Configurações`',
        passos: [
          { t: 'Ler Contas Bancárias, Meios de Pagamento, Planos de Conta, Portadores, Instruções Bancárias e Boleto **sem alterar**.', r: 'São configurações da empresa inteira: mexer afeta notas, boletos e fluxo de caixa.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Os títulos do pedido foram gerados com valor e vencimento certos.', s: 'v' },
      { t: 'A baixa (parcial, total e estorno) refletiu em Contas a Receber, Saldos e "Recebido no mês".', s: 'v' },
      { t: 'O Fluxo de Caixa e a DRE mostram os mesmos valores que os Saldos; as diferenças estão anotadas.', s: 'v' },
    ],
    atencao: [
      'Baixar, pagar, estornar e gerar boleto movimentam dinheiro de verdade: só em conta de teste e com valor de teste.',
      'Em janelas estreitas, o diálogo de **Estornar** pode abrir fora da área visível.',
      'Excluir um título (lixeira) é permanente: estorne antes e só exclua o que você criou para o teste.',
      'Baixa parcial cria um **título residual** com número /002: não é duplicidade. Estornar a baixa parcial devolve o título ao valor original e o /002 some.',
      'Título manual e título gerado do mesmo pedido **duplicam** DRE, painel e "Recebido no mês": use um só.',
    ],
    naoValidado: [AVISO_MANUAL, 'Boleto/PIX, Transferências, Budget vs Realizado e a conciliação não foram concluídos no sistema. O pedido Entregue não tem "Editar": não foi possível ligá-lo à obra antes de gerar os títulos (o projeto foi informado no título).'],
  },

  /* ------------------------------------------------------------------ Projetos e obras */
  {
    id: 'fluxo-projetos', arquivo: 'fluxo-09-projetos-obra.html', etiqueta: 'Consultor · Fluxo de projetos e obras',
    titulo: 'Fluxo de projetos e obras: cadastro, estágios, painéis e diário',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22 · roteiro de validação manual baseado no plano de QA de Projetos (roteiros 01 a 12); cadastro de projeto visto em 19/10/2026',
    subtitulo: 'A obra é o projeto que amarra pedido, produção, compras, estoque, serviços, notas e financeiro. Este roteiro cria uma obra, a liga a um pedido e percorre os painéis para ver se tudo chega a ela.',
    video: { id: 'consultor-09-projetos', titulo: 'A obra que amarra todos os documentos', resumo: 'O campo Projeto, ligar o pedido antes de faturar, estágios e etapas, e o painel financeiro da obra.' },
    objetivo: 'Provar que a obra de teste recebe os documentos dos outros módulos, que estágios e etapas filtram as listagens e que os painéis (financeiro, progresso, resultado) mostram números coerentes.',
    prerequisitos: [
      { t: 'Cliente de teste e permissão para criar projetos, estágios e etapas.', s: 'd' },
      { t: 'Um **local de estoque do projeto** em `Estoque > Locais` se for finalizar nota com a obra (a nota com projeto movimenta só o local do projeto).', s: 'v' },
      { t: 'Para os painéis fazerem sentido: pedido de venda, nota e títulos **ligados à obra** (campo Projeto do pedido).', s: 'v', campo: 'Obra / código' },
    ],
    fluxos: [
      {
        titulo: '1. Cadastrar a obra', onde: '`Cadastros > Projetos > Novo Projeto`',
        passos: [
          { t: 'Preencher **Nome**, **Código**, status, cliente e responsável; salvar.', r: '"Registro salvo com sucesso!". Código repetido é recusado; vários projetos sem código são aceitos.', s: 'v', campo: 'Código da obra' },
          { t: 'Tentar salvar sem nome e com data de fim anterior à de início.', r: 'Os dois são recusados sem perder o que foi digitado.', s: 'd' },
          { t: 'Acrescentar o resultado previsto (linhas de receita e despesa com categoria e conta), salvar e reabrir.', r: 'Valores e classificações voltam iguais; editar uma linha não a recria.', s: 'd' },
          { t: 'Comparar `Todos os Projetos` (cartões e indicadores) com a lista de gestão.', r: 'Os números do topo batem com a contagem filtrada; a gestão mostra obras ativas e inativas, os seletores só as ativas.', s: 'd' },
        ],
      },
      {
        titulo: '2. Estágios e etapas', onde: 'ações da linha do projeto: `Estágios` e `Etapas`',
        passos: [
          { t: 'Criar três estágios com peso (ex.: 20, 30, 50) e reordená-los.', r: 'A nova ordem persiste; ao marcar "feito" a data de conclusão é preenchida e ao reabrir é limpa.', s: 'd' },
          { t: 'Criar etapas dentro dos estágios.', r: 'Entram no fim da lista, com a ordem correta.', s: 'd' },
          { t: 'Em Solicitações de Compra e Ordens de Produção, escolher a obra e usar a cascata Estágio → Etapa.', r: 'O estágio só habilita depois da obra, a etapa só depois do estágio; trocar a obra limpa os dois filtros.', s: 'd' },
          { t: 'Tentar excluir um estágio ou etapa com solicitação de compra, OP ou transferência vinculada.', r: 'É recusado listando o que trava.', s: 'd' },
        ],
      },
      {
        titulo: '3. Ligar a obra aos documentos', onde: 'campo `Projeto` dos documentos',
        passos: [
          { t: 'Criar um **pedido de venda** com a obra no campo Projeto.', r: 'A coluna PROJETO da lista de pedidos mostra a obra; a Nova Medição mostra a obra do pedido ("Sem obra vinculada" quando não há).', s: 'v' },
          { t: 'Criar medição, OP, solicitação de compra e nota com a mesma obra.', r: 'Cada documento aparece nas abas da obra (Produção, Campo, Compras) e nas listas filtradas por Projeto.', s: 'd' },
          { t: 'Finalizar a nota com a obra.', r: 'Exige local de estoque **do projeto**: "O projeto … não tem local de estoque ativo" até cadastrar o local.', s: 'v' },
        ],
      },
      {
        titulo: '4. Painéis da obra', onde: '`Financeiro > Painel Financeiro de Projetos` (`/projetos/painel`) e módulo `Projetos`',
        passos: [
          { t: 'Abrir o **Painel Financeiro** escolhendo a obra (e copiar a URL para outra aba).', r: 'Sem obra: estado inicial convidando a escolher. Com obra: vendido, faturado, a receber e a pagar batem com os documentos de origem.', s: 'v' },
          { t: 'Ler pendências, avisos inteligentes e o andamento (Venda, Faturamento, Recebido, Campo/Entrega).', r: 'Títulos vencidos abrem o título específico; pendências somem após a baixa. Obra saudável não mostra aviso alarmista.', s: 'd' },
          { t: 'Abrir **Progresso da Obra e Material**, **Plano de Resultado** (previsto × realizado) e **Comparar Obras**.', r: 'Material mostra o que entrou, foi consumido e falta consumir; o plano compara por categoria e projeta estouro.', s: 'd' },
          { t: 'Conferir a regra: **custo = destinado/comprometido** (não caixa) e **receita = nota autorizada** (não pedido).', r: 'Diferenças entre o painel e o financeiro por causa dessa regra não são erro.', s: 'd' },
        ],
      },
      {
        titulo: '5. Diário de obra e ciclo de vida', onde: '`Projetos > Diário de Obra` e ações da linha',
        passos: [
          { t: 'Fazer uma postagem de teste no **Diário de Obra** e abri-la a partir de Serviços.', r: 'O diário recebe também os serviços de campo da obra (só obras com projeto no pedido).', s: 'd' },
          { t: '**Inativar** a obra e procurá-la nos seletores (pedido, títulos, OP, solicitação).', r: 'Some de todos os seletores e de Todos os Projetos; os documentos já emitidos continuam apontando para ela. Reativar traz tudo de volta.', s: 'd' },
          { t: 'Tentar **excluir** uma obra com documentos e depois uma sem nenhum.', r: 'A primeira recusa listando os vínculos; a segunda exclui e leva junto endereços, estágios, etapas e resultado previsto.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'A obra de teste recebeu pedido, medição, OP, compra e nota, e as abas e filtros mostram esses documentos.', s: 'd' },
      { t: 'O Painel Financeiro, o progresso e o plano de resultado mostram números coerentes com os documentos.', s: 'd' },
    ],
    atencao: [
      'Excluir uma obra é definitivo e leva junto estágios, etapas e resultado previsto. Prefira inativar.',
      'Pedido **sem projeto**: o painel da obra mostra "A faturar" negativo e andamento incoerente.',
      'Trocar o cliente de uma obra que já tem pedido e nota: confirme com o time se é permitido.',
      '"Materializar peças a partir do pedido" e postar no Diário de Obra gravam dados.',
    ],
    naoValidado: [AVISO_MANUAL, 'O módulo Projetos (Todos os Projetos, painéis, plano de resultado, andamento e diário) não foi aberto no sistema; só o cadastro de projeto e o painel financeiro foram vistos.'],
  },

  /* ------------------------------------------------------------------ Tarefas */
  {
    id: 'fluxo-tarefas', arquivo: 'fluxo-10-tarefas.html', etiqueta: 'Consultor · Fluxo de tarefas',
    titulo: 'Fluxo de tarefas: quadro, cartão, regras e colaboração',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22 · roteiro de validação manual baseado no plano de QA de Tarefas (roteiros 01, 02, 04 e 05)',
    subtitulo: 'Quadro com listas → cartão com responsável e prazo → limite de trabalho (WIP) → status → dependências → comentários, checklist e anexos → visões e vínculos com o ERP.',
    video: { id: 'consultor-10-tarefas', titulo: 'Quadro, cartão e responsável', resumo: 'O quadro sem listas, o cartão que só aparece com responsável, o Término Previsto e o arquivar que não apaga.' },
    objetivo: 'Provar que um quadro respeita as regras de lista, WIP, status e dependência por todas as telas, e que a colaboração (comentário, menção, anexo) funciona sem duplicar nem vazar entre empresas.',
    prerequisitos: [
      { t: 'Usuários de teste: gestor, executor e observador (cada um com uma permissão diferente) e uma segunda sessão para ver a atualização em tempo real.', s: 'd' },
      { t: 'Licença do módulo Tarefas (e plano PRO, se anexos, automações ou Gantt dependerem dele).', s: 'd' },
      { t: 'Quadro de teste com listas Backlog, Em andamento, Revisão e Concluído, algumas etiquetas e tarefas com e sem prazo.', s: 'd', campo: 'Quadro' },
    ],
    fluxos: [
      {
        titulo: '1. Quadros e listas', onde: '`Tarefas > Meus Quadros`',
        passos: [
          { t: 'Criar um quadro em branco com nome e descrição (e, depois, um vinculado a um projeto).', r: 'Nome vazio ou só espaços é recusado; cliques repetidos não duplicam.', s: 'd' },
          { t: 'Criar as listas, renomear e reordenar por arrastar; recarregar.', r: 'A ordem final é a mesma em outra sessão.', s: 'd' },
          { t: 'Tentar excluir uma lista com cartões e depois uma vazia.', r: 'A com cartões é bloqueada ou exige transferência; a vazia some.', s: 'd' },
          { t: 'Arquivar e restaurar um quadro; conferir o quadro padrão de tarefas avulsas.', r: 'O padrão não pode ser renomeado nem arquivado.', s: 'd' },
        ],
      },
      {
        titulo: '2. Limite de trabalho (WIP)', onde: 'configuração da lista `Em andamento`',
        passos: [
          { t: 'Definir WIP = 2 na lista Em andamento e tentar mover um terceiro cartão para ela.', r: 'O limite aparece na lista e o terceiro movimento é bloqueado com mensagem clara; o cartão não some.', s: 'd' },
          { t: 'Liberar uma vaga e mover de novo; digitar 0, negativo, decimal e texto no campo.', r: 'O terceiro entra depois da vaga; valores inválidos são recusados.', s: 'd' },
          { t: 'Tentar estourar o WIP por arrastar, pelo menu Mover, pelo detalhe e por ação em lote.', r: 'Nenhuma rota contorna o limite.', s: 'd' },
        ],
      },
      {
        titulo: '3. Cartão e status', onde: 'detalhe da tarefa',
        passos: [
          { t: 'Criar uma tarefa com título, descrição, prioridade, início, prazo, horas, responsáveis e etiquetas.', r: 'Título vazio, datas invertidas e horas negativas são recusados. Datas próximas da meia-noite ficam no dia escolhido.', s: 'd', campo: 'Tarefa' },
          { t: 'Percorrer Pendente → Em andamento → Em revisão → Concluída e reabrir.', r: 'A data de conclusão é preenchida ao concluir e retirada ao reabrir; o histórico registra cada transição.', s: 'd' },
          { t: 'Cancelar uma tarefa e tentar reabri-la.', r: '"Cancelada" é terminal: a reabertura é impedida.', s: 'd' },
          { t: 'Tentar concluir uma tarefa com **predecessora aberta** e uma tarefa-pai com subtarefa aberta.', r: 'A conclusão é impedida e o sistema diz qual dependência falta; a mesma regra vale em Kanban, lista, tabela e detalhe.', s: 'd' },
        ],
      },
      {
        titulo: '4. Colaboração', onde: 'abas do detalhe da tarefa',
        passos: [
          { t: 'Publicar um comentário simples e outro com **@menção**.', r: 'A pessoa mencionada é notificada uma única vez; o autor não recebe a própria notificação. Menção de usuário de outra empresa é recusada.', s: 'd' },
          { t: 'Criar dois checklists, marcar itens e excluir um item.', r: 'O percentual atualiza na hora; um checklist não afeta o vizinho.', s: 'd' },
          { t: 'Anexar um arquivo válido e tentar um acima de 10 MB e um executável.', r: 'Os dois últimos são recusados; arquivo em análise não pode ser baixado.', s: 'd' },
          { t: 'Duplicar a tarefa (duplo clique no botão) e arquivá-la.', r: 'A cópia vem "(cópia)" em Pendente, sem comentários nem anexos; o duplo clique não cria duas; a arquivada abre só para leitura.', s: 'd' },
        ],
      },
      {
        titulo: '5. Visões, vínculos e automação', onde: '`Tarefas` e roteiros 03, 06, 07 e 09 do plano de QA',
        passos: [
          { t: 'Alternar as visões do quadro (Kanban, lista, tabela, calendário e Gantt) e aplicar filtros.', r: 'O mesmo cartão mostra a mesma informação em todas as visões; com filtro ativo, reordenar é bloqueado.', s: 'd' },
          { t: 'Vincular uma tarefa a um Pedido de Venda, a um registro do CRM e a um Projeto.', r: 'O vínculo leva ao registro certo; o ERP de outra empresa não é aceito.', s: 'n' },
          { t: 'Criar uma recorrência e uma automação de teste (notificação) e conferir o disparo.', r: 'A ação acontece uma única vez, no horário correto, e só para os destinatários da empresa.', s: 'n' },
          { t: 'Conferir `Minhas Tarefas`, o dashboard e a exportação.', r: 'Mostram o mesmo total do quadro.', s: 'n' },
        ],
      },
    ],
    resultado: [
      { t: 'O quadro respeitou lista, WIP, status e dependência em todas as telas.', s: 'd' },
      { t: 'Comentário, menção, checklist e anexo funcionaram sem duplicar nem vazar entre empresas.', s: 'd' },
    ],
    atencao: [
      'A busca global (Ctrl+K) **não** encontra o módulo Tarefas pelo nome: abra pelo menu de módulos.',
      'Automações e recorrências criam cartões e enviam notificações sozinhas: teste só com destinatários de teste.',
      'Mover ou comentar em cartão de outra pessoa avisa os responsáveis.',
      'Arquivar uma tarefa só se desfaz pela restauração.',
    ],
    naoValidado: [AVISO_MANUAL, 'O módulo Tarefas ainda não foi aberto no sistema; os passos vêm dos roteiros 01, 02, 04 e 05 do plano de QA.'],
  },
];
