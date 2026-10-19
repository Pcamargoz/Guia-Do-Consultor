/* Checklists de fluxo por processo (consultor), no formato "fazer → conferir o reflexo no módulo seguinte".
   Mesma estrutura de scripts/dados-checklist-consultor.mjs. Executados no dev (METALURGICA TEST, v1.22.12). */

export const FLUXOS = [
  /* ------------------------------------------------------------------ Suprimentos */
  {
    id: 'fluxo-suprimentos', arquivo: 'fluxo-01-suprimentos.html', etiqueta: 'Consultor · Fluxo de suprimentos',
    titulo: 'Fluxo de suprimentos: da solicitação ao pagamento',
    rodape: 'Teste de Fluxo · Consultor · Faktory Flow v1.22.12 · executado em 19/10/2026 (dev METALURGICA TEST): SC-000289 → COT-000013 → PC-000009 → NR-000013 → título pago',
    subtitulo: 'Solicitação → cotação → pedido de compra → nota de recebimento → conferência → estoque → contas a pagar → pagamento. Cada etapa diz onde conferir o reflexo no módulo seguinte.',
    objetivo: 'Provar que uma necessidade de material vira pedido de compra, entra no estoque pelo recebimento e gera o título a pagar, até o pagamento aparecer no saldo bancário e no fluxo de caixa.',
    prerequisitos: [
      { t: 'Fornecedor com **É Fornecedor?** e **Conta a Pagar** ligados, **Conta de Fluxo de Caixa Despesa** preenchida e contato com **E-mail Compras**. Pessoa jurídica exige CNPJ e IE.', s: 'v', campo: 'Código do fornecedor' },
      { t: 'Insumo com unidade válida e cor (a solicitação abre "Dados do Item" com Cor obrigatória). Anotar o saldo em `Estoque > Saldo`.', s: 'v', campo: 'Insumo / saldo antes' },
      { t: '**Almoxarifado central ativo** em `Estoque > Locais` (é onde a nota dá entrada).', s: 'v' },
      { t: 'Decidir com o cliente: **aprovação por alçada** (`Compras > Configurações > Parâmetros` + Faixas de Alçada) e **conferência física** (`Recebimento > Configurações > Parâmetros`). As duas vêm desligadas.', s: 'v' },
      { t: 'Conta bancária cadastrada para pagar o título.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Solicitação de compra', onde: '`Compras > Solicitações de Compra > Nova Solicitação`',
        passos: [
          { t: 'Empresa, data de necessidade, produto (cor em "Dados do Item") e quantidade. Projeto em branco faz a entrada cair no almoxarifado central.', r: 'SC "Em Aberto". O painel mostra a última compra do item.', s: 'v', campo: 'Nº da SC' },
          { t: 'Abrir o menu `⋯` da SC.', r: 'Opções Gerar Cotação e Gerar Pedido de Compra (a cotação é opcional; a SC não tem etapa de aprovação).', s: 'v' },
        ],
      },
      {
        titulo: '2. Cotação', onde: '`⋯ > Gerar Cotação` da SC',
        passos: [
          { t: 'Nova cotação com Empresa e **Natureza da Operação** (Consumo, Produção, Revenda ou Ativo Imobilizado).', r: 'A natureza define o CFOP do pedido (ex.: Produção → 2101). Abre o assistente de 4 passos.', s: 'v', campo: 'Nº da cotação' },
          { t: 'Passo 3: Adicionar Fornecedores; na linha do fornecedor, Data de entrega e Condição de pagamento.', s: 'v' },
          { t: '"Preencher proposta completa": preço unitário (e frete, impostos se houver) > Salvar.', r: 'Resumo do fornecedor com total e selo "Recomendado".', s: 'v' },
          { t: 'Passo 4: escolher o critério e clicar **Aplicar Melhor Opção**.', r: 'Vencedor definido por item. Um fornecedor só já é aceito. Não use "Enviar por e-mail" com contatos reais.', s: 'v' },
        ],
      },
      {
        titulo: '3. Pedido de compra', onde: '`Gerar Pedido de Compra` na comparação',
        passos: [
          { t: 'Conferir a **Conta de Fluxo de Caixa** sugerida (vem do fornecedor) > Confirmar.', r: '"Pedido(s) de compra gerado(s)": um PC por fornecedor vencedor, "Em Aberto", "Sem títulos".', s: 'v', campo: 'Nº do PC' },
          { t: 'Abrir o PC e conferir CFOP, entrega prevista e parcelas.', s: 'v' },
          { t: '`⋯ > Linha do tempo` do PC.', r: 'SC e cotação aparecem como **Concluída** automaticamente.', s: 'v' },
          { t: 'Se a alçada estiver ligada, aprovar em `Compras > Aprovações`.', s: 'd' },
        ],
      },
      {
        titulo: '4. Nota de recebimento', onde: '`⋯ > Gerar Nota de Recebimento` do PC',
        passos: [
          { t: 'Conferir o que veio do pedido (empresa, fornecedor, CFOP, itens, conta de fluxo, parcelas) e informar Nº da NF, Série e Data de Emissão. Sem XML, a chave fica em branco.', s: 'v' },
          { t: 'Salvar.', r: 'A nota aparece na lista como "NF-<número do fornecedor>" e na fila de conferência como "NR-<número interno>" (são a mesma nota).', s: 'v', campo: 'Nº da NR / NF' },
        ],
      },
      {
        titulo: '5. Conferência física', onde: '`Recebimento > Aprovações` (fila de conferências)',
        passos: [
          { t: 'Clicar em **Conferir** na nota.', r: 'A conferência já começa ("Conferência iniciada!").', s: 'v' },
          { t: 'Digitar a quantidade conferida de cada item e sair do campo.', r: '"Item salvo" e selo OK; progresso "1 de 1 itens".', s: 'v' },
          { t: '**Concluir Conferência**.', s: 'v' },
        ],
      },
      {
        titulo: '6. Finalizar e conferir os reflexos', onde: '`Recebimento > Notas de Recebimento > ⋮ > Finalizar`',
        passos: [
          { t: 'Confirmar a finalização (não pode ser desfeita).', r: 'Nota "Finalizada" (some do filtro padrão "Em Aberto": limpe o filtro).', s: 'v' },
          { t: '`Estoque > Movimentos` e `Saldo`.', r: 'Entrada "Recebimento (NR)" e saldo somado no almoxarifado central.', s: 'v', campo: 'Saldo depois' },
          { t: '`Financeiro > Contas a Pagar`.', r: 'Título com o documento NR-xxxxx, vencimento e valor da parcela.', s: 'v', campo: 'Nº do título' },
          { t: 'Lista de Pedidos de Compra e Linha do tempo do PC.', r: 'PC "Recebido", títulos "Gerados" e a cadeia SC → COT → PC → NR → título.', s: 'v' },
          { t: 'Dashboards de Compras e de Recebimento.', r: 'Total de PC do mês e "Recebido no período" com o valor do teste.', s: 'v' },
        ],
      },
      {
        titulo: '7. Pagamento', onde: '`Financeiro > Contas a Pagar > Pagar`',
        passos: [
          { t: 'Conta bancária, data, meio de pagamento e valor pago > **Confirmar Pagamento**.', r: 'O título sai de "Em aberto".', s: 'v' },
          { t: '`Financeiro > Saldos` e `Fluxo de Caixa`.', r: 'Saldo da conta diminui; a saída aparece na conta de despesa do fornecedor.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'A Linha do tempo do PC mostra a cadeia completa até o título.', s: 'v' },
      { t: 'Estoque, contas a pagar e saldo bancário refletiram o mesmo valor.', s: 'v' },
    ],
    atencao: [
      'A Sugestão de Compra só lista itens com **estoque mínimo** cadastrado.',
      'A mesma nota tem dois números (NF do fornecedor na lista × NR interna no resto do sistema): anote os dois.',
      'O link "Títulos a gerar" do dashboard abre a lista com o filtro errado ("Em Aberto"); os cartões de totais seguem o filtro.',
      'O meio de pagamento da parcela não chega ao diálogo de pagamento: informe de novo.',
      'No Fluxo de Caixa, o saldo inicial absorveu os movimentos do mês (saldo final R$ 0,00): compare com `Financeiro > Saldos`.',
      'Finalizar a nota não pode ser desfeito; depois do recebimento, cancelar/excluir o PC fica desabilitado. Planeje a limpeza.',
    ],
    naoValidado: ['Aprovação por alçada, envio de cotação por e-mail, importação de XML e divergência/avaria na conferência não foram testados.'],
  },

  /* ------------------------------------------------------------------ Serviços de campo */
  {
    id: 'fluxo-servicos', arquivo: 'fluxo-02-servicos-campo.html', etiqueta: 'Consultor · Fluxo de serviços',
    titulo: 'Fluxo de serviços de campo: da medição à assistência',
    rodape: 'Teste de Fluxo · Consultor · Faktory Flow v1.22.12 · executado em 19/10/2026 (dev METALURGICA TEST): MED-000013 → INS-000003 → VIST-000001 → AT-000002',
    subtitulo: 'Medição → conferência → instalação → vistoria → assistência técnica. Cada etapa diz o que gera a próxima — várias passagens são por botão, não automáticas.',
    objetivo: 'Provar que um pedido de venda vira medição aprovada, instalação concluída com checklist, vistoria com aceite e assistência técnica resolvida, e conferir onde cada serviço aparece na gestão de campo.',
    prerequisitos: [
      { t: 'Participante **Funcionário** para ser o técnico, diferente do participante vinculado ao usuário conferente em `Serviços > Configurações > Conferentes` (quem confere não pode ser quem mediu).', s: 'v', campo: 'Técnico / conferente' },
      { t: '**Equipe de campo** com o técnico. Para testar pagamento de instalação: equipe **Terceirizada**, fornecedor e regra de pagamento (equipe interna não gera pagamento).', s: 'v', campo: 'Equipe' },
      { t: 'Em `Configurações > Parâmetros`: decidir Exigir conferência, Exigir assinatura, **Geração automática de vistoria (dias)** (vem vazia = desligada), Garantia e prazos.', s: 'v' },
      { t: 'Em `Configurações > Instalação`: template de checklist (senão só o vão vira item). Em Assistência: tipos, origens e motivos. Em Geral: prioridades.', s: 'v' },
      { t: 'Pedido de venda com **Projeto (obra)** se quiser ver Diário de Obra e painel da obra.', s: 'v', campo: 'Nº do pedido' },
      { t: 'Nome do responsável da obra (assinatura da medição) e do cliente (aceite da vistoria e da AT).', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Medição', onde: '`Serviços > Medições > + Nova Medição`',
        passos: [
          { t: 'Achar o pedido (ajuste o Status e desmarque "Esconder pedidos que já têm medição") > **Usar este registro** > importar os itens.', s: 'v' },
          { t: 'Preencher **Empresa** (não vem do pedido), Técnico, Equipe e Data > Salvar > **Agendar**.', r: 'Medição numerada, "Agendada".', s: 'v', campo: 'Nº da medição' },
          { t: 'Lançar largura × altura (mm) dos vãos > **Iniciar** > na lista, **Medir vãos** > **Concluir medição** com a assinatura.', r: '"Aguardando Conferência". Com "Exigir assinatura", o Finalizar da tela de edição só dá erro: use Medir vãos.', s: 'v' },
          { t: '**Aprovar** com o usuário conferente.', r: '"Aprovada" e botão **Gerar Instalação** (aprovar não cria a instalação sozinho).', s: 'v' },
        ],
      },
      {
        titulo: '2. Instalação', onde: 'botão `Gerar Instalação` da medição',
        passos: [
          { t: 'Escolher a equipe > informar a data > Salvar.', r: 'Na lista, "Agendada" (a tela de edição só atualiza ao recarregar). Checklist = template + vãos medidos.', s: 'v', campo: 'Nº da instalação' },
          { t: '**Executar** > **Iniciar instalação** > marcar os itens como **Conforme** > **Concluir**.', r: '"Concluída". Itens obrigatórios precisam estar conformes. A instalação não pede aceite.', s: 'v' },
          { t: 'Conferir pagamento do instalador e o botão "Ver Vistoria".', r: 'Equipe interna: "não gera pagamento". A vistoria só nasce se a geração automática estiver ligada.', s: 'v' },
        ],
      },
      {
        titulo: '3. Vistoria', onde: '`Ver Vistoria` na instalação',
        passos: [
          { t: 'Informar o vistoriador > Salvar > **Iniciar** > registrar itens, ressalvas e pendências.', s: 'v', campo: 'Nº da vistoria' },
          { t: 'Concluir como **Aprovada**, **Aprovada c/ Ressalvas** ou Reprovada.', s: 'v' },
          { t: '**Depois** de concluir, Registrar Aceite do cliente.', r: '"Aceite Registrado". Antes de concluir o sistema recusa o aceite.', s: 'v' },
        ],
      },
      {
        titulo: '4. Assistência técnica', onde: 'botão `Gerar Assistência Técnica` da vistoria',
        passos: [
          { t: 'Gerar a AT (não nasce sozinha) e completar Tipo, Origem, Motivo, Cidade/UF > Salvar.', r: 'A descrição traz ressalvas e pendências. No teste, Instalação e Vistoria vinculadas vieram vazias e sem opções (defeito: a garantia foi calculada como "sem instalação").', s: 'v', campo: 'Nº da AT' },
          { t: 'Aba Agendamento > **Agendar Atendimento** > **Iniciar Atendimento** > registrar defeitos e peças.', s: 'v' },
          { t: '**Aguardar Peça** (pausa o prazo) > **Retomar** > peça "Instalada" > solução e custos.', s: 'v' },
          { t: 'Registrar o aceite **antes** de **Resolver** (ordem inversa da vistoria).', r: '"Resolvida". Peça ainda Solicitada/Em compra exige motivo e é cancelada.', s: 'v' },
        ],
      },
      {
        titulo: '5. Gestão de campo',
        passos: [
          { t: '`Serviços > Cockpit de Campo`: os serviços aparecem na linha da equipe.', r: 'No teste os horários apareceram 3 h adiantados (UTC) e a AT ficou em "SEM EQUIPE".', s: 'v' },
          { t: '`Serviços > Dashboard Serviços`: Concluídos, m² instalados, pipeline e estatísticas.', s: 'v' },
          { t: '`Minha Equipe Agora`: só lista usuários do sistema (técnico externo não aparece).', s: 'v' },
          { t: 'Diário de Obra e painel da obra: só com projeto no pedido.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Medição, instalação, vistoria e assistência estão ligadas ao mesmo pedido e cliente.', s: 'v' },
      { t: 'O dashboard de serviços refletiu as conclusões (quantidade e m²).', s: 'v' },
    ],
    atencao: [
      'Três passagens são **por botão**: Gerar Instalação, Gerar Assistência Técnica e (opcional) Gerar OS de instalação a partir da OP. Só a vistoria pode ser automática.',
      'Datas e horas aparecem em UTC em vários pontos (vistoria, aceite, cockpit): confira o horário antes de concluir que há atraso.',
      'O template de checklist entra em **toda** instalação nova da empresa: desative o de teste no fim.',
      'Mensagens (toasts) podem cobrir os botões do cabeçalho: feche-as antes de clicar.',
      'No cadastro do técnico, o CEP preenche o endereço mas o formulário só aceita depois de redigitar o Endereço.',
    ],
    naoValidado: ['Pagamento de instalação (equipe terceirizada), aplicativo de campo `/campo` e Diário de Obra com projeto não foram testados.'],
  },
];
