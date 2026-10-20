/* Conteúdo da Trilha do Estagiário — Faktory Flow.
   Origem de cada etapa (campo s):
     'v' = conferido no sistema na exploração de 16/10/2026 (staging FESQUA 2026 e dev METALURGICA TEST, v1.22.11)
     'd' = vem dos roteiros de validação (public/checklists/validacao-*.html) ou do Guia do Consultor, sem execução
     'n' = não pôde ser conferido; confirmar com o supervisor
   Textos: `Menu > Tela` vira destaque de interface; **negrito** vira ênfase. */

export const META = {
  rodape: 'Trilha do Estagiário · Faktory Flow v1.22 · conteúdo conferido em 16 e 19/10/2026',
};

export const ONBOARDING = {
  arquivo: '00-onboarding-estagiario.html',
  titulo: 'Onboarding do estagiário',
  subtitulo: 'Seu roteiro para aprender o Faktory Flow aos poucos: primeiro a navegação, depois cada módulo na ordem do fluxo da empresa — do primeiro contato com o cliente até o dinheiro no caixa.',
  objetivo: 'Organizar suas primeiras semanas: o que pedir antes de começar, a ordem recomendada dos checklists e os combinados de segurança. Ao final, você deve saber encontrar qualquer tela, consultar registros sem alterar nada e explicar como um pedido passa pelos módulos.',
  atencao: [
    'Treine sempre no ambiente de **testes** (staging ou dev), nunca em produção. Confira o endereço no navegador antes de começar.',
    'Na dúvida, **não clique**. Botões como `Transmitir`, `Aprovar`, `Finalizar`, `Excluir`, `Enviar agora` e `Converter` geram efeito real.',
    'Não use **Sair do Sistema** nem troque de empresa sem combinar com o supervisor: a sessão é compartilhada e o login tem limite de tentativas.',
    'Registros que você criar para treinar devem começar com **TESTE ESTAGIÁRIO** no nome, para serem fáceis de achar e limpar.',
    'Nunca coloque e-mail ou telefone de clientes reais em registros de teste.',
  ],
  etapas: [
    {
      titulo: 'Antes do primeiro dia',
      passos: [
        { t: 'Receber usuário e senha **pessoais** do sistema (não use o login de outra pessoa).', s: 'd' },
        { t: 'Saber qual ambiente usar para treinar (endereço do staging ou do dev) e qual empresa selecionar.', s: 'v' },
        { t: 'Combinar com o supervisor quais módulos fazem parte da sua rotina e qual perfil de acesso você terá.', s: 'd' },
        { t: 'Ter o navegador atualizado e, de preferência, uma tela larga: as listas ficam espremidas em janelas pequenas.', s: 'v' },
      ],
    },
    {
      titulo: 'Semana 1 — Navegação e cadastros',
      intro: 'Objetivo: sentir-se à vontade nas telas, sem alterar nada.',
      passos: [
        { t: 'Concluir o checklist **01 · Primeiros passos e navegação**.', s: 'v' },
        { t: 'Concluir o checklist **02 · Cadastros básicos** (participantes, produtos e projetos).', s: 'd' },
        { t: 'Abrir `GLOBAIS > Treinamento > Minhas Trilhas` e ver se há trilha obrigatória para você.', r: 'A Central de Treinamento mostra trilhas, pontos e progresso.', s: 'v' },
        { t: 'Anotar no campo de dúvidas tudo que não ficou claro e revisar com o supervisor no fim da semana.', s: 'd' },
      ],
    },
    {
      titulo: 'Semana 2 — O lado comercial',
      passos: [
        { t: 'Concluir **03 · CRM** e **04 · Vendas**.', s: 'd' },
        { t: 'Concluir **15 · Visão do fluxo completo** para entender para onde o pedido vai depois.', s: 'd' },
      ],
    },
    {
      titulo: 'Semana 3 — Suprimentos e operação',
      passos: [
        { t: 'Concluir **05 · Compras**, **06 · Recebimento** e **07 · Estoque**.', s: 'd' },
        { t: 'Concluir **08 · Produção**, **09 · Serviços** e **11 · Expedição**.', s: 'd' },
      ],
    },
    {
      titulo: 'Semana 4 — Gestão',
      passos: [
        { t: 'Concluir **10 · Projetos e obras**, **12 · Faturamento e Fiscal** e **13 · Financeiro**.', s: 'd' },
        { t: 'Concluir **14 · Tarefas** e combinar com o supervisor um quadro para acompanhar suas atividades.', s: 'd' },
        { t: 'Explicar ao supervisor, com as telas abertas, o caminho de um pedido real: CRM → Vendas → operação → Faturamento → Financeiro.', r: 'Você consegue mostrar onde cada etapa aparece no sistema.', s: 'd' },
      ],
    },
  ],
};

export const CHECKLISTS = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'navegacao', arquivo: '01-primeiros-passos-navegacao.html', etiqueta: 'Comece por aqui · Navegação',
    titulo: 'Primeiros passos e navegação', resumo: 'Entrar, trocar de módulo, buscar telas e ler listas.',
    subtitulo: 'O básico que vale para todas as telas do Faktory Flow. Nada aqui altera dados.',
    objetivo: 'Encontrar qualquer tela do sistema, entender o que aparece no topo e no menu, e ler uma lista (filtros, colunas, ações) sem alterar nenhum registro.',
    prerequisitos: [
      { t: 'Usuário e senha pessoais funcionando.', s: 'v' },
      { t: 'Saber o endereço do ambiente de treino e qual empresa usar.', s: 'v' },
      { t: 'Navegador em tela cheia (em janelas estreitas as tabelas ficam espremidas e difíceis de ler).', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Entrar e conferir onde você está', onde: 'tela `Início`',
        passos: [
          { t: 'Fazer login e conferir o **selo da empresa** no topo da tela.', r: 'Aparece o aviso "Empresa selecionada automaticamente" e o nome da empresa no selo.', s: 'v' },
          { t: 'Conferir a versão do sistema no rodapé do menu lateral (ex.: `Faktory Flow v1.22.11`).', s: 'v' },
          { t: 'Ler os blocos da tela Início: `Alertas urgentes`, `Tarefas do dia` e `Resumo do negócio`.', r: 'Cada alerta é um atalho para a tela já filtrada (ex.: pedidos aguardando faturamento → Pedidos de Venda).', s: 'v' },
          { t: 'Esperar o aviso "Verificando permissões..." sumir antes de clicar em algo.', s: 'v' },
        ],
      },
      {
        titulo: '2. Trocar de módulo', onde: 'botão de grade `Abrir menu de módulos` (canto superior esquerdo)',
        passos: [
          { t: 'Abrir o menu de módulos, digitar o nome em `Buscar módulo...` e escolher.', r: 'O topo do menu lateral passa a mostrar "MÓDULO" com o nome escolhido. A tecla Esc fecha o painel.', s: 'v' },
          { t: 'Reconhecer os 15 módulos: Vendas, Compras, CRM, Recebimento, Estoque, Produção, Serviços, Financeiro, Fiscal, Faturamento, Expedição, Projetos, Tarefas, Config. Interna e Implantação.', s: 'v' },
          { t: 'Abrir os grupos com seta (`>`) do menu lateral: Configurações, Relatórios e Tabelas Dinâmicas vêm fechados e escondem telas.', s: 'v' },
          { t: 'Usar `Recolher menu` (seta `<`) quando precisar de mais espaço para uma lista.', s: 'v' },
        ],
      },
      {
        titulo: '3. Achar uma tela pela busca', onde: 'campo `Pesquisar funcionalidades...` ou Ctrl+K',
        passos: [
          { t: 'Pressionar Ctrl+K e digitar "pedido".', r: 'Aparecem sugestões como Pedidos de Compra e Pedidos de Venda. Use ↑↓ e Enter.', s: 'v' },
          { t: 'Lembrar que a busca encontra **telas**, não registros: para achar um pedido pelo número, use a pesquisa dentro da lista.', s: 'v' },
        ],
      },
      {
        titulo: '4. Ler uma lista', onde: 'qualquer lista, por exemplo `Vendas > Pedidos de Venda`',
        passos: [
          { t: 'Identificar os botões do topo: `Mais...` (Colunas e Exportar para Excel), `Filtros` e `+ Novo`.', s: 'v' },
          { t: 'Conferir o **filtro padrão** antes de concluir que algo não existe (ex.: Pedidos de Venda abre só com Status "Em Aberto").', r: 'Ao trocar o Status para "Todos", a lista mostra também pedidos faturados e cancelados.', s: 'v' },
          { t: 'Usar `Pesquisar...`, a paginação ("Exibindo 1 a N de N itens") e o botão `Atualizar Página`.', s: 'v' },
          { t: 'Abrir o menu `...` ou `⋮` de uma linha e separar o que é consulta (Histórico, Ver Timeline) do que altera dados (Excluir, Converter, Finalizar). Feche com Esc sem clicar.', s: 'v' },
        ],
      },
      {
        titulo: '5. Notificações, ajuda e preferências',
        passos: [
          { t: 'Abrir o sino de `Notificações` e ver as abas Geral e Solicitações.', r: 'A lista pode mostrar "0 notificações" por um instante antes de carregar; espere.', s: 'v' },
          { t: 'Achar o botão `?` (manuais de ajuda) no canto das listas.', s: 'v' },
          { t: 'No menu do usuário, conhecer `Modo Escuro` e `Densidade`. Não use `Configurar E-mail (SMTP)`.', s: 'v' },
          { t: 'Conhecer a Alumina (Ctrl+Alt+A), a assistente de IA: ela consulta dados e só executa ações depois de confirmação.', s: 'd' },
        ],
      },
      {
        titulo: '6. Saber o que é administração', onde: 'bloco `GLOBAIS` no fim do menu lateral',
        passos: [
          { t: 'Percorrer Painel de Controle, Configurações, Segurança, Treinamento, Aplicativos e Assinatura **só lendo**.', s: 'v' },
          { t: 'Abrir `GLOBAIS > Treinamento > Minhas Trilhas` e ver suas trilhas obrigatórias.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Chego em qualquer módulo pelo menu ou pelo Ctrl+K sem ajuda.', s: 'v' },
      { t: 'Sei explicar por que uma lista "esconde" registros (filtro padrão, período, página).', s: 'v' },
      { t: 'Sei apontar, numa lista, quais botões apenas consultam e quais alteram dados.', s: 'v' },
    ],
    atencao: [
      'Existem **dois grupos "Configurações"** no menu: o do módulo e o de GLOBAIS. Os dois são de administração.',
      '"Tarefas do dia" na tela Início são pendências calculadas (títulos, pedidos). **Não** são o módulo Tarefas.',
      'O app `GLOBAIS > Aplicativos > Aprovações` sai do layout normal. Para voltar, use **Voltar ao sistema**, nunca **Sair**.',
      'Não use **Sair do Sistema**: o login tem limite de tentativas e pode bloquear o acesso por 15 minutos.',
      'Números diferentes para o "mesmo" indicador normalmente são **período diferente** (ex.: Dashboard de Vendas no mês × Início com todos os pedidos em aberto).',
    ],
    naoValidado: ['Assistente Alumina e "Apresentar na TV" não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'cadastros', arquivo: '02-cadastros-basicos.html', etiqueta: 'Base · Cadastros',
    titulo: 'Cadastros básicos', resumo: 'Participantes (clientes, fornecedores), produtos e projetos.',
    subtitulo: 'Clientes, fornecedores, leads, produtos e obras são cadastros compartilhados por todos os módulos.',
    objetivo: 'Localizar e ler os cadastros que todos os processos usam — participante, produto e projeto/obra — e entender por que um erro de cadastro aparece depois na nota fiscal, no financeiro e na produção.',
    prerequisitos: [
      { t: 'Checklist 01 concluído.', s: 'v' },
      { t: 'Saber um nome de cliente, um produto e uma obra existentes para consultar (peça ao supervisor).', s: 'd' },
    ],
    fluxos: [
      {
        titulo: '1. Consultar um participante', onde: '`Cadastros > Participantes` (aparece no menu de vários módulos)',
        passos: [
          { t: 'Abrir a lista e pesquisar pelo nome do cliente.', r: 'Se não existir, a tela mostra "Nenhum participante encontrado".', s: 'v' },
          { t: 'Abrir o participante e percorrer as seções: Dados Gerais, Classificação, Endereço, Contato, Contas bancárias, Documentos e Dados CRM.', s: 'v' },
          { t: 'Na seção **Classificação**, ver as chaves É Cliente?, É Fornecedor?, É Funcionário?, É Transportadora?, É Vendedor? e Prospect/Lead.', r: 'Você entende que cliente, fornecedor e lead do CRM são o **mesmo cadastro**, só com chaves diferentes.', s: 'v' },
          { t: 'Na seção **Contato**, ver quem recebe e-mails de Notas Fiscais, Boletos, Vendas e avisos de entrega/serviços.', s: 'v' },
        ],
      },
      {
        titulo: '2. Conhecer o formulário de novo participante (sem salvar)', onde: 'botão `Novo` da lista de participantes',
        passos: [
          { t: 'Identificar os campos obrigatórios: **Tipo (PF/PJ)** e **Razão Social / Nome**.', r: 'Ao tentar salvar vazio, os campos ficam vermelhos e aparece "Erros de validação".', s: 'v' },
          { t: 'Digitar um CEP e ver o endereço ser preenchido sozinho.', s: 'v' },
          { t: 'Sair sem salvar (seta voltar ou Cancelar).', s: 'v' },
        ],
      },
      {
        titulo: '3. Consultar um produto', onde: '`Cadastros > Produtos`',
        passos: [
          { t: 'Abrir a lista de produtos e pesquisar por código ou descrição.', s: 'n' },
          { t: 'No estoque, abrir o produto pelo código em `Estoque > Saldo` e ler classificação, unidade, categoria, NCM, dimensões e pesos.', r: 'A ficha mostra também o total em estoque, o custo médio e a situação (Ativo).', s: 'v' },
        ],
      },
      {
        titulo: '4. Consultar um projeto/obra', onde: '`Cadastros > Projetos`',
        passos: [
          { t: 'Abrir a lista de projetos e localizar uma obra.', s: 'n' },
          { t: 'Na lista de Pedidos de Venda, ver a coluna PROJETO: ela mostra a obra de cada pedido (ex.: "ORC-26-08-0003 - Obra Le Jardin").', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Encontro um cliente, um produto e uma obra pelo nome ou código.', s: 'v' },
      { t: 'Sei explicar que o lead do CRM vira o mesmo participante usado na nota e no financeiro.', s: 'v' },
    ],
    atencao: [
      'Cadastro é compartilhado: mudar um participante ou produto afeta notas, títulos, compras e produção. **Não altere sem orientação.**',
      'Campos fiscais (CPF/CNPJ, IE, Simples Nacional, NCM) são de responsabilidade do fiscal/contador.',
      'O campo Bairro exige pelo menos 3 letras: bairros como "Sé", preenchidos pelo próprio CEP, são recusados ao salvar.',
      'Confira a chave **Ativo** do cadastro: em um formulário novo ela pode vir desligada.',
      'Antes de criar, pesquise: cadastro duplicado gera retrabalho (o CRM tem até uma tela de Duplicados).',
    ],
    naoValidado: ['Telas de lista e formulário de Produtos e de Projetos ainda não foram abertas na exploração.'],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'crm', arquivo: '03-crm-leads-oportunidades.html', etiqueta: 'Comercial · CRM',
    titulo: 'CRM: leads e oportunidades', resumo: 'Funil, lista e Kanban de leads, conversão.',
    subtitulo: 'A porta de entrada do processo comercial: do primeiro contato até a oportunidade pronta para virar pedido.',
    objetivo: 'Consultar o funil comercial, cadastrar um lead de treino, movimentá-lo no Kanban e entender as regras para converter um lead.',
    prerequisitos: [
      { t: 'Checklists 01 e 02 concluídos.', s: 'v' },
      { t: 'Autorização do supervisor para criar um lead de treino com o nome começando por "TESTE ESTAGIÁRIO".', s: 'd' },
    ],
    fluxos: [
      {
        titulo: '1. Entender o funil', onde: '`CRM > Painéis > Visão Geral`',
        passos: [
          { t: 'Ler a "Jornada do cliente": Leads Novos → Qualificando → Oportunidades → Valor em Jogo.', r: 'Cada cartão leva à lista de leads ou ao Pipeline.', s: 'v' },
          { t: 'Ler a faixa de alerta (leads aguardando qualificação, atividades atrasadas).', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar leads', onde: '`CRM > Vendas > Leads > Lista de Leads`',
        passos: [
          { t: 'Usar os filtros rápidos: Status (Novo, Em Qualificação, Qualificado, Convertido, Desqualificado), Temperatura (Frio a Urgente), Só minhas e Tag.', s: 'v' },
          { t: 'Alternar entre **Lista** e **Kanban** no topo da tela.', s: 'v' },
          { t: 'Abrir o menu `⋮` de um lead e reconhecer: Converter, Histórico, Tags, Atividades, Desqualificar e Excluir. Feche com Esc.', s: 'v' },
        ],
      },
      {
        titulo: '3. Cadastrar um lead de treino', onde: 'botão `Novo Lead`',
        intro: 'O formulário é o cadastro completo de participante. Preencha só o necessário.',
        passos: [
          { t: 'Preencher **Tipo (PF/PJ)** e **Razão Social / Nome** começando por "TESTE ESTAGIÁRIO".', s: 'v' },
          { t: 'Na seção Dados CRM, preencher Origem do Lead, Temperatura e Responsável.', s: 'v' },
          { t: 'Clicar em `Salvar`.', r: 'Mensagem "Registro salvo com sucesso!" e o lead aparece na lista com Status "Novo".', s: 'v' },
          { t: 'Conferir na lista se a Temperatura gravou como você escolheu.', s: 'v' },
        ],
      },
      {
        titulo: '4. Movimentar o lead no Kanban', onde: '`CRM > Vendas > Leads > Kanban de Leads`',
        passos: [
          { t: 'Reconhecer as etapas e seus percentuais: Inbound 10%, Pesquisado 25%, Conectado 40%, MQL 60%, SQL 80%, Demo agendada 90%.', s: 'v' },
          { t: 'Arrastar o card do seu lead para a próxima etapa e clicar em **Confirmar** no diálogo "Mover lead".', r: 'O card fica na nova coluna e a mudança entra no histórico do lead.', s: 'v' },
        ],
      },
      {
        titulo: '5. Entender a conversão (com o supervisor)', onde: 'menu `⋮ > Converter` do lead',
        passos: [
          { t: 'Saber as duas regras: o lead precisa estar numa etapa de **60% ou mais** e com o **BANT completo** (budget, autoridade, necessidade e prazo).', r: 'Sem isso, o sistema avisa o que falta e não converte.', s: 'v' },
          { t: 'Ver com o supervisor onde o BANT é preenchido: `Editar Lead` > Budget Estimado e as chaves Autoridade, Necessidade e Prazo/timeline.', s: 'v' },
          { t: 'Saber o que a conversão faz: o lead fica "convertido", o participante passa a ter **"É Cliente?"** ligado e uma **oportunidade é criada sozinha** no Pipeline (valor = budget). O pedido é criado depois, em Vendas.', r: 'Mensagem "Lead convertido com sucesso!". O aviso não menciona a oportunidade: procure no Pipeline.', s: 'v' },
        ],
      },
      {
        titulo: '6. Oportunidades e atividades', onde: '`CRM > Vendas > Pipeline` e `CRM > Vendas > Atividades`',
        passos: [
          { t: 'Abrir o Pipeline, escolher a aba do funil ("Funil de vendas principal") e ver as oportunidades por etapa.', r: 'Cada card mostra valor, probabilidade, "hoje na etapa" e o menu ⋮ (Editar, Marcar como Ganha, Marcar como Perdida, Pausar, Cancelar).', s: 'v' },
          { t: 'Abrir uma oportunidade (⋮ > Editar) e ver as abas Detalhes, Itens, Atividades e Histórico.', r: 'O Histórico registra a criação na conversão e cada mudança de etapa.', s: 'v' },
          { t: 'Abrir Atividades e Agenda e ver as atividades da semana e as atrasadas.', r: 'A lista de atividades não diz de qual lead/cliente é cada uma.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Meu lead de treino aparece na lista e no Kanban, na etapa para onde o movi.', s: 'v' },
      { t: 'Sei dizer por que um lead não pode ser convertido ainda.', s: 'v' },
    ],
    atencao: [
      '**Excluir** e **Desqualificar** ficam no mesmo menu que Histórico. Leia antes de clicar.',
      'No Kanban, a mudança só grava depois de **Confirmar**; clicar fora do diálogo cancela sem aviso.',
      'O telefone na lista é um link que liga de verdade.',
      'Campanhas, Cadências e Automações (menu Engajamento) **enviam mensagens a clientes**: não mexa.',
      'Os "Filtros Avançados" usam nomes técnicos (ex.: "Origem Id"). Prefira os filtros rápidos e a pesquisa.',
      'A **Temperatura** pode mudar sozinha ao salvar o lead (defeito confirmado no ambiente de teste). Confira depois de salvar.',
      'No campo Budget, digitar "100000" grava R$ 100.000,00: confira o valor antes de salvar.',
      '**Marcar como Ganha** não pede confirmação (há "Reverter ganho"). Gerar proposta e e-mail/link para o cliente só em treino com e-mail de teste.',
    ],
    naoValidado: ['Clientes / Visão 360° (o cliente de teste não apareceu na lista), Projetos de Obra e Dashboard Executivo ainda não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'vendas', arquivo: '04-vendas-pedidos.html', etiqueta: 'Comercial · Vendas',
    titulo: 'Vendas: pedidos de venda', resumo: 'Pedidos, status, novo pedido, metas e comissões.',
    subtitulo: 'O pedido de venda é onde o fluxo operacional começa: dele saem produção, serviços, expedição, nota e títulos.',
    objetivo: 'Encontrar pedidos e entender cada status, conhecer o formulário de pedido sem salvar e ler os indicadores comerciais (dashboard, carteira, metas e comissões).',
    prerequisitos: [
      { t: 'Checklists 01 e 02 concluídos.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Consultar pedidos', onde: '`Vendas > Pedidos de Venda`',
        passos: [
          { t: 'Abrir a lista e notar que ela começa filtrada em Status **"Em Aberto"** (e volta para esse filtro quando você sai e entra de novo).', s: 'v' },
          { t: 'Trocar o Status para "Todos" e conhecer os demais: Aprovação pendente, Encerrado, Faturado, Lib. Expedição, Entregue e Cancelado.', s: 'v' },
          { t: 'Em `Filtros`, buscar por Cliente, Vendedor, Projeto ou Número do Pedido (ex.: PV-000001).', s: 'v' },
          { t: 'Ler as colunas **TÍTULOS** (Gerados / Sem títulos) e **NOTA FISCAL**.', r: 'Você identifica se o pedido já tem títulos no financeiro e nota emitida.', s: 'v' },
        ],
      },
      {
        titulo: '2. Conhecer o formulário de pedido (sem salvar)', onde: 'botão `+ Novo Pedido`',
        passos: [
          { t: 'Clicar em **Salvar** com tudo vazio e ler os avisos de Empresa ("Campo obrigatório") e Cliente ("Cliente é obrigatório").', r: 'Nada é gravado. Empresa e Cliente não têm asterisco: o aviso só aparece ao salvar.', s: 'v' },
          { t: 'Ver que o **CFOP** fica bloqueado até escolher empresa e cliente (e vem filtrado pelo estado do cliente) e que a **Conta de Fluxo de Caixa** é obrigatória.', s: 'v' },
          { t: 'Percorrer os blocos Itens do Pedido, Parcelas do Pedido (meio de pagamento e portador), Informações adicionais e Resumo do Pedido.', s: 'v' },
          { t: 'Sair com **Cancelar** (se o primeiro clique não funcionar, os avisos mudaram o botão de lugar: clique de novo).', s: 'v' },
        ],
      },
      {
        titulo: '3. Ler os indicadores', onde: '`Vendas > Dashboard Vendas`',
        passos: [
          { t: 'Escolher um período (Hoje, Esta semana, Este mês, Este ano) e clicar em **Aplicar**.', r: 'Os cartões (Total em vendas, Ticket médio, Em aberto, Pendentes de faturamento) são recalculados.', s: 'v' },
          { t: 'Saber que o bloco "Crescimento vs. período anterior" **não segue** o filtro de datas.', s: 'v' },
          { t: 'Em `Vendas > Demonstrativos > Carteira de Pedidos`, ler A faturar, A expedir, Em carga, Expedido, Entregue e o aging por dias.', s: 'v' },
        ],
      },
      {
        titulo: '4. Metas e comissões', onde: '`Vendas > Metas de Vendas` e `Vendas > Controle de Comissão`',
        passos: [
          { t: 'Abrir o painel de Metas: % da meta, projeção, ritmo necessário por dia e cenários pessimista/realista/otimista.', s: 'v' },
          { t: 'Usar o **Simulador** de comissão: valor 10.000, comissão 5%, Simular.', r: 'Comissão estimada R$ 500,00, liberada no recebimento. O simulador não grava nada.', s: 'v' },
          { t: 'Ver em `Comissões` os estágios Previstas, A pagar, Em fechamento, Pagas e Estornadas.', s: 'v' },
        ],
      },
      {
        titulo: '5. Ver aprovações pendentes', onde: '`Vendas > Aprovações`',
        passos: [
          { t: 'Ver documento, solicitante, valor, tipo e tempo de espera **sem clicar em Aprovar**.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Encontro qualquer pedido pelo número ou cliente, inclusive faturados e cancelados.', s: 'v' },
      { t: 'Sei quais campos o pedido exige antes de salvar.', s: 'v' },
      { t: 'Sei calcular uma comissão no simulador.', s: 'v' },
    ],
    atencao: [
      'O formulário de pedido tem **três botões que gravam**: dois "Salvar" (topo e rodapé) e "Salvar e Permanecer".',
      '"Recalcular" (parcelas iguais) e "Recalcular Parcelas" (pela condição de pagamento) fazem coisas diferentes.',
      'Na Conta de Fluxo de Caixa aparecem contas como "Empréstimos": em pedido de venda use a conta de venda indicada pelo financeiro.',
      'O botão **Aprovar** fica direto na linha em Vendas > Aprovações: um clique aprova.',
      '**Importar CEM** ("Importar CEM Mobi" em alguns ambientes) traz orçamentos e cria pedidos: só com orientação.',
      '**Fechamento** de comissão gera títulos no Contas a Pagar e **Comissão manual** grava comissão: não use em treino.',
      'Um pedido pode estar "Em Aberto" e já ter títulos "Gerados". Há pedidos com o mesmo número (séries/empresas diferentes) e desdobrados (ex.: PV-000395/2): confira cliente e valor.',
      'Sem meta cadastrada, o painel de Metas mostra "0% da meta — No ritmo". Não é um resultado real.',
    ],
    naoValidado: [
      'Detalhe de um pedido existente (abas e ações do "...") e o caminho do pedido até a nota fiscal ainda não foram conferidos.',
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: 'compras', arquivo: '05-compras.html', etiqueta: 'Suprimentos · Compras',
    titulo: 'Compras: da necessidade ao pedido', resumo: 'Solicitação, cotação, pedido de compra e linha do tempo.',
    subtitulo: 'O caminho do material: alguém precisa → cotação com fornecedores → pedido de compra → entrega no Recebimento.',
    objetivo: 'Entender a sequência de documentos de compra (SC → COT → PC), onde consultar cada um, ler a linha do tempo do pedido e saber o que acontece depois da entrega.',
    prerequisitos: [
      { t: 'Checklists 01 e 02 concluídos (fornecedor é um participante com "É Fornecedor?" ligado).', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Conhecer o menu na ordem do processo', onde: 'módulo `Compras`',
        passos: [
          { t: 'Ver que os itens do menu seguem o processo: Solicitações → Sugestão → Cotações → Pedidos → Aprovações → Contratos de Entrega → Follow-up de Entregas.', s: 'v' },
          { t: 'Abrir o `Dashboard Compras` e ler os cartões (solicitações em aberto, cotações ativas, pedidos em aberto, total do mês) e o bloco de pedidos recentes.', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar os documentos de compra',
        passos: [
          { t: 'Em `Solicitações de Compra`, localizar uma SC e abrir o menu `⋯`.', r: 'Opções Gerar Cotação, Gerar Pedido de Compra e Excluir. A solicitação não tem etapa de aprovação.', s: 'v' },
          { t: 'Em `Cotações de Compra`, abrir uma cotação e percorrer o assistente: Dados Gerais, Itens a Cotar, Cotação (fornecedores) e Comparação.', r: 'A Natureza da Operação escolhida define o CFOP do pedido.', s: 'v' },
          { t: 'Em `Pedidos de Compra`, abrir um pedido e ler fornecedor, itens, CFOP, entrega prevista e parcelas.', r: 'O status da lista ("Em Aberto") pode diferir do da tela de edição ("Em Edição").', s: 'v' },
          { t: 'Abrir `⋯ > Linha do tempo` do pedido.', r: 'Mostra SC, cotação, pedido, nota de recebimento e título, cada um com seu status.', s: 'v' },
        ],
      },
      {
        titulo: '3. Sugestão e aprovação', onde: '`Compras > Sugestão de Compra` e `Compras > Aprovações`',
        passos: [
          { t: 'Em `Sugestão de Compra`, ler a fórmula "falta líquida = mínimo − disponível" **sem gerar solicitações**.', r: 'Só aparecem itens com estoque mínimo cadastrado.', s: 'v' },
          { t: 'Em `Compras > Aprovações`, ver os pedidos aguardando alçada.', r: 'A aprovação por alçada vem desligada: sem ela o pedido já nasce pronto para receber.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Sei explicar a diferença entre solicitação, cotação e pedido de compra.', s: 'v' },
      { t: 'Sei ler a linha do tempo de um pedido e dizer em que etapa ele está.', s: 'v' },
      { t: 'Sei que o pedido entregue vira uma nota de recebimento (NR) no módulo Recebimento.', s: 'v' },
    ],
    atencao: [
      'Gerar Cotação, Gerar Pedido de Compra, Enviar cotação por e-mail e marcar vencedor **criam documentos e enviam mensagens**: só com orientação.',
      'Gerar o pedido conclui a SC e a cotação automaticamente. Cotação ou SC concluída não volta atrás.',
      'Depois que o pedido é recebido, Cancelar e Excluir ficam desabilitados.',
      'Alertas de Compras e Parâmetros (em Configurações) afetam toda a empresa: não altere.',
    ],
    naoValidado: ['Aprovação por alçada ligada, Contratos de Entrega e Follow-up de Entregas ainda não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: 'recebimento', arquivo: '06-recebimento.html', etiqueta: 'Suprimentos · Recebimento',
    titulo: 'Recebimento de mercadorias', resumo: 'Notas de recebimento, conferência e reflexos.',
    subtitulo: 'Quando o fornecedor entrega: a nota entra, o material é conferido e o sistema atualiza estoque e contas a pagar.',
    objetivo: 'Localizar notas de recebimento, entender a conferência física e saber o que a finalização da nota provoca no estoque, no pedido de compra e no financeiro.',
    prerequisitos: [
      { t: 'Checklist 05 concluído.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Ler o painel do recebimento', onde: '`Recebimento > Dashboard Recebimento`',
        passos: [
          { t: 'Ver a fila de notas a conferir, os pedidos esperados e os cartões "Recebido no período" e "Notas em aberto".', s: 'v' },
          { t: 'Ver os cartões "Títulos a gerar" e "Parcelas a vencer".', r: '"Parcelas a vencer" leva a Financeiro > Contas a Pagar.', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar notas de recebimento', onde: '`Recebimento > Notas de Recebimento`',
        passos: [
          { t: 'Ler os cartões Total, Em Aberto, Finalizadas e Canceladas e trocar o filtro **Status** (abre em "Em Aberto").', r: 'Uma nota finalizada só aparece depois de limpar o filtro. Os cartões seguem o filtro.', s: 'v' },
          { t: 'Reconhecer que a mesma nota tem **dois números**: "NF-<número do fornecedor>" na lista e "NR-<número interno>" na conferência, no pedido e no título.', s: 'v' },
          { t: 'Abrir o menu `⋮` de uma nota em aberto.', r: 'Opções Finalizar, Imprimir Etiquetas (só depois da conferência), Cancelar e Excluir.', s: 'v' },
          { t: 'Saber as origens de uma nota: gerada pelo pedido de compra, por XML ou avulsa.', s: 'v' },
        ],
      },
      {
        titulo: '3. Entender a conferência física', onde: 'menu `Recebimento > Aprovações` (é a fila de conferências)',
        passos: [
          { t: 'Abrir a fila e ler os cartões (Aguardando conferência, Em conferência, Conferidas hoje) e as abas **sem iniciar**.', s: 'v' },
          { t: 'Saber que o botão **Conferir** já inicia a conferência e que o responsável fica registrado na nota.', s: 'v' },
          { t: 'Saber que a conferência registra a quantidade de cada item e só termina com **Concluir Conferência**.', s: 'v' },
        ],
      },
      {
        titulo: '4. Saber o que a finalização provoca',
        passos: [
          { t: 'Ler o aviso da finalização: "movimenta estoque e gera títulos a pagar… não pode ser desfeita".', s: 'v' },
          { t: 'Depois de finalizada por outra pessoa, conferir o movimento "Recebimento (NR)" em `Estoque > Movimentos` e o título em `Financeiro > Contas a Pagar`.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Sei explicar o caminho: Pedido de Compra → Nota de Recebimento → Conferência → Finalizar → Estoque + Contas a Pagar.', s: 'v' },
      { t: 'Sei achar uma nota finalizada e o número dela nos dois formatos.', s: 'v' },
    ],
    atencao: [
      'A conferência física aparece no menu com o nome **"Aprovações"**. Quem procura "Conferência" não acha.',
      '**Finalizar** a nota movimenta estoque e gera contas a pagar e não pode ser desfeito. Não finalize em treino.',
      'Iniciar uma conferência trava a nota com o seu usuário.',
      'A conferência só existe se o parâmetro "Usar Conferência Física" estiver ligado na empresa.',
      'Em Notas pendentes, **"Responder à SEFAZ"/manifestação** é fiscal e irreversível: nunca clique.',
    ],
    naoValidado: ['Notas pendentes/DFe, Controle de Terceiros e importação de XML ainda não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 07 */
  {
    id: 'estoque', arquivo: '07-estoque.html', etiqueta: 'Operação · Estoque',
    titulo: 'Estoque: saldo e movimentos', resumo: 'Visão geral, saldo por local, extrato e tipos de movimento.',
    subtitulo: 'O saldo nunca é digitado: ele é a soma das entradas e saídas que vêm de compras, produção, vendas e ajustes.',
    objetivo: 'Consultar quanto existe de cada material, em qual local e variação (cor e medidas), e rastrear de onde veio cada movimento.',
    prerequisitos: [
      { t: 'Checklist 02 concluído (saber achar um produto).', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Ler a visão geral', onde: '`Estoque > Visão geral`',
        passos: [
          { t: 'Escolher empresa, obra e período (Hoje, 7, 30 ou 90 dias).', r: 'Os indicadores (valor em estoque, saúde do estoque, necessidade de reposição) são recalculados.', s: 'v' },
          { t: 'Ler o bloco "Pendências de hoje": saldos negativos, empréstimos vencidos, inventários e encerramentos.', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar o saldo de um material', onde: '`Estoque > Saldo`',
        passos: [
          { t: 'Pesquisar pelo código ou descrição do produto.', s: 'v' },
          { t: 'Achar a linha certa: cada produto aparece uma vez por **local** e por **variação** (cor + comprimento).', s: 'v' },
          { t: 'Ler SALDO, RESERVADA, CUSTO MÉDIO e VALOR TOTAL.', r: 'O número da coluna RESERVADA abre as reservas daquela posição.', s: 'v' },
          { t: 'Usar `Mais filtros` para filtrar por obra, propriedade (Própria/Cliente) e atributos físicos.', r: 'Os filtros ficam salvos no seu navegador; use "Limpar filtros" se algo "sumir".', s: 'v' },
        ],
      },
      {
        titulo: '3. Ver o extrato do produto', onde: 'clique no código do produto na tela Saldo',
        passos: [
          { t: 'Abrir a aba **Posições** e ver o saldo por local.', s: 'v' },
          { t: 'Abrir a aba **Histórico** e ler data, número, tipo, quantidade e motivo de cada movimento.', r: 'Você vê de onde veio o material (ex.: "Entrada de produto acabado por conclusão da OP...").', s: 'v' },
        ],
      },
      {
        titulo: '4. Rastrear movimentos', onde: '`Estoque > Movimentos`',
        passos: [
          { t: 'Filtrar por produto, local ou data.', s: 'v' },
          { t: 'Reconhecer as origens: Recebimento (NR), Requisição (baixa em OP), OP - Conclusão e Estorno.', s: 'v' },
          { t: 'Abrir um movimento e ler origem, destino e itens, **sem clicar em Estornar**.', s: 'v' },
        ],
      },
      {
        titulo: '5. Conhecer os tipos de movimento (sem salvar)', onde: '`+ Novo Movimento`',
        passos: [
          { t: 'Ler a descrição dos 8 tipos: Entrada manual, Ajuste positivo, Ajuste negativo, Transferência, Requisição, Devolução de uso, Empréstimo e Descarte.', s: 'v' },
          { t: 'Sair com **Cancelar (Esc)**.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Informo o saldo de um material num local específico, na variação certa.', s: 'v' },
      { t: 'Explico de onde veio um movimento olhando o histórico.', s: 'v' },
    ],
    atencao: [
      '**Ctrl+S salva** o movimento no formulário de Novo movimento.',
      '**Estornar**, **Ajustar saldo**, **Transferir**, **Emprestar** e **Importar saldo** alteram o estoque. Não use em treino.',
      'Não existe item "Reservas" no menu: as reservas ficam na coluna RESERVADA do Saldo e na aba Reservas do produto.',
      'Em ambiente de teste há muitos saldos negativos: é massa de dados de teste, não erro seu.',
      'A lista de Movimentos mostra "0 itens" por alguns segundos enquanto carrega.',
    ],
    naoValidado: ['Transferências, Inventário, Empréstimos, Encerramentos, Reposição, Locais e Demonstrativos ainda não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 08 */
  {
    id: 'producao', arquivo: '08-producao.html', etiqueta: 'Operação · Produção',
    titulo: 'Produção: ordens e apontamentos', resumo: 'Ordem de produção, painéis, alertas e reflexo no estoque.',
    subtitulo: 'A fábrica: a ordem de produção (OP) nasce do pedido ou da obra, consome material do estoque e entrega o produto acabado.',
    objetivo: 'Consultar ordens de produção, entender status e alertas, acompanhar o chão de fábrica e ver como a produção aparece no estoque — sem apontar nem alterar OPs.',
    prerequisitos: [
      { t: 'Checklists 04 e 07 concluídos.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Ler a visão geral', onde: '`Produção > Visão geral`',
        passos: [
          { t: 'Ler Ritmo do dia, OPs bloqueadas por material e a lista "Insumos que mais travam".', s: 'v' },
          { t: 'Ver Obras em produção, Fila de entrada, Funil de OPs por etapa e OPs em risco.', r: 'A tela se atualiza sozinha a cada 3 minutos ("Atualizar agora" força).', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar ordens de produção', onde: '`Produção > Ordens de produção`',
        passos: [
          { t: 'Filtrar por projeto, tipo de operação (Fabricação, Corte, Beneficiamento) e status (Em aberto, Em execução, Pausada, Produzido, Cancelada).', s: 'v' },
          { t: 'Passar o mouse sobre os selos de alerta: Conclusão bloqueada, Conclusão travada, Material não baixado, Estoque não creditado.', r: 'O texto explica a causa (ex.: obra sem local de estoque ativo).', s: 'v' },
          { t: 'Abrir uma OP em execução pelo **olho (Visualizar OP)** e ler número, produto, projeto, pedido de venda, processo, quantidade e status.', r: 'Abre um painel "somente leitura".', s: 'v' },
        ],
      },
      {
        titulo: '3. Ver os detalhes da OP pelo menu', onde: '`Mais ações` da linha da OP',
        intro: 'A OP não tem abas: cada detalhe abre por um item do menu.',
        passos: [
          { t: 'Abrir **Etapas de execução da OP** e ler o processo e as etapas (ex.: usinagem → montagem → embalagem). Feche sem salvar.', s: 'v' },
          { t: 'Abrir **Apontamentos** e ler quem apontou cada etapa, início e fim. Não use "Iniciar".', s: 'v' },
          { t: 'Abrir **Materiais necessários** e ver as requisições da OP.', s: 'v' },
          { t: 'Abrir **Linha do tempo** (planejado × real por etapa) e **Custo da OP** (estimado × realizado).', s: 'v' },
        ],
      },
      {
        titulo: '4. Acompanhar o chão de fábrica', onde: '`Produção > Painel de fábrica`',
        passos: [
          { t: 'Alternar as visões **Cards**, **Lista** e **Timeline** e ler os contadores Ordens, No prazo e Atrasadas.', s: 'v' },
          { t: 'Em cada card, ler a etapa atual, as unidades e o % de etapas, **sem clicar em "Apontar"**.', s: 'v' },
        ],
      },
      {
        titulo: '5. Entender de onde vêm as OPs', onde: '`Produção > Integração de Produção`',
        passos: [
          { t: 'Abrir uma integração processada e ler o resumo.', r: 'Ex.: "Gerou 1 OP de montagem · 13 OPs de corte (1 por perfil) · 38 requisições de material", a partir das esquadrias de uma obra.', s: 'v' },
        ],
      },
      {
        titulo: '6. Ver a produção no estoque', onde: '`Estoque > Movimentos`',
        passos: [
          { t: 'Encontrar um movimento "Baixa de componente em OP" (origem Requisição).', r: 'É o material consumido pela OP.', s: 'v' },
          { t: 'Encontrar um movimento "Entrada de produto acabado (OP)" (origem OP - Conclusão).', r: 'É o produto pronto entrando no estoque quando a OP é concluída.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Sei dizer em que etapa uma OP está, o que ela já consumiu e por que está com alerta.', s: 'v' },
      { t: 'Sei que concluir a OP gera a entrada do produto acabado no estoque e que a obra precisa de um local de estoque ativo.', s: 'v' },
    ],
    atencao: [
      'Na lista de OPs, **"Iniciar produção"** muda a OP para Em execução com um clique. Em OPs Em aberto, o lugar do "olho" é ocupado por **Editar OP**.',
      'No menu Mais ações, **Marcar produzido**, **Pausar OP**, **Cancelar OP**, **Replicar OP** e **Gerar OS de instalação** alteram dados.',
      '**Apontar** (Painel de fábrica), **▶ Iniciar** (apontamentos), **Importar da estrutura** (materiais) e **Gerar lista** (separação) gravam registros.',
      'A **Fila de exceções** mostra erros técnicos e o botão **Reprocessar**: não use, leve ao supervisor/suporte.',
      'O **Terminal** e o app de **Separação** são usados no chão de fábrica e têm botão **Sair**. Para voltar, use "Voltar ao sistema" ou o menu.',
      'No PCP, arrastar OPs muda a programação da fábrica.',
    ],
    naoValidado: ['Painel do planejamento, Desempenho, Inteligência/Sugestões da IA e o conteúdo dos 10 demonstrativos de Produção ainda não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 09 */
  {
    id: 'servicos', arquivo: '09-servicos-campo.html', etiqueta: 'Operação · Serviços',
    titulo: 'Serviços de campo', resumo: 'Medição → instalação → vistoria → assistência técnica.',
    subtitulo: 'Tudo o que acontece na obra do cliente depois da venda, na sequência Medição → Instalação → Vistoria → Assistência.',
    objetivo: 'Ler o painel de serviços, consultar medições e entender como uma medição nasce de um pedido de venda e o que vem depois dela.',
    prerequisitos: [
      { t: 'Checklist 04 concluído.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Ler o painel de serviços', onde: '`Serviços > Dashboard Serviços`',
        passos: [
          { t: 'Escolher o período (Hoje, 7 dias, 30 dias) e ler os cartões: Agendados, Em execução, Concluídos, Fora do prazo.', s: 'v' },
          { t: 'Ler o **Pipeline operacional**: Medições a executar → Aprovadas sem instalação → Instalações a executar → Concluídas sem vistoria → Vistorias a executar → Assistências abertas.', r: 'Estágios em âmbar são gargalos.', s: 'v' },
          { t: 'Ler os Alertas operacionais e a Carga por equipe.', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar medições', onde: '`Serviços > Medições`',
        passos: [
          { t: 'Filtrar por Status: Em aberto, Agendada, Em Execução, Aguardando Conferência, Aprovada, Reprovada, Cancelada.', s: 'v' },
          { t: 'Ler a coluna **% MEDIDO** (vãos medidos sobre o total).', s: 'v' },
          { t: 'Abrir uma medição e ver os vãos, fotos e histórico.', s: 'n' },
        ],
      },
      {
        titulo: '3. Entender de onde vem a medição (sem salvar)', onde: '`+ Nova Medição`',
        passos: [
          { t: 'Ver que a nova medição começa escolhendo um **pedido de venda**: cliente, obra e itens vêm preenchidos.', s: 'v' },
          { t: 'Ver a opção **Medição avulsa (sem pedido)**: obrigatórios Empresa, Cliente e Técnico Responsável.', s: 'v' },
          { t: 'Sair sem clicar em "Usar este registro" nem em "Salvar".', s: 'v' },
        ],
      },
      {
        titulo: '4. Conhecer as equipes', onde: '`Serviços > Configurações > Equipes de Campo`',
        passos: [
          { t: 'Ver as equipes, o tipo, a capacidade diária e o status.', r: 'Para abrir uma equipe use o lápis (clicar na linha não abre).', s: 'v' },
        ],
      },
      {
        titulo: '5. Instalação, vistoria e assistência',
        passos: [
          { t: 'Saber a sequência: a medição aprovada **não** cria a instalação sozinha (botão "Gerar Instalação"); a instalação concluída gera a vistoria só se a geração automática estiver ligada; a assistência vem do botão "Gerar Assistência Técnica" da vistoria.', s: 'v' },
          { t: 'Abrir as listas de Instalações, Vistorias e Assistência Técnica e ler os status.', r: 'Vistoria: aprovada, aprovada com ressalvas ou reprovada; o aceite do cliente só vale depois de concluir. Assistência: o aceite é registrado antes de resolver.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Sei dizer em que estágio estão os serviços de uma obra.', s: 'v' },
      { t: 'Sei explicar por que uma medição pede um pedido de venda.', s: 'v' },
    ],
    atencao: [
      '**Enviar agora** (resumo do dia) dispara e-mail. Não clique.',
      'Em Nova Medição, **"Usar este registro"** pode criar a medição na hora.',
      'No Cockpit de Campo, arrastar uma visita **agenda** o serviço.',
      'Há dois itens "Aprovações" no menu de Serviços: o do topo são as comissões do instalador.',
      'As Configurações do módulo (chaves Ativo, "Restaurar cadastros padrão") são de administração.',
    ],
    naoValidado: ['Aplicativo de campo (/campo), Diário de Obra e pagamento de instalação de equipe terceirizada ainda não foram abertos. Horários do Cockpit aparecem 3 h adiantados.'],
  },

  /* ------------------------------------------------------------------ 10 */
  {
    id: 'projetos', arquivo: '10-projetos-obras.html', etiqueta: 'Gestão · Projetos',
    titulo: 'Projetos e obras', resumo: 'A obra como centro de custo e resultado.',
    subtitulo: 'Na indústria de esquadrias, o "projeto" é a obra: ele amarra pedido, produção, compras, estoque, serviços, notas e financeiro.',
    objetivo: 'Localizar uma obra, ver o que está ligado a ela e ler os indicadores de progresso e resultado.',
    prerequisitos: [
      { t: 'Checklists 04 e 09 concluídos.', s: 'd' },
    ],
    fluxos: [
      {
        titulo: '1. Achar a obra de um pedido',
        passos: [
          { t: 'Na lista de Pedidos de Venda, ler a coluna PROJETO.', s: 'v' },
          { t: 'Em Nova Medição, ver que cada pedido mostra a obra vinculada (ou "Sem obra vinculada").', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar a carteira de obras', onde: 'módulo `Projetos`',
        passos: [
          { t: 'Abrir a lista/dashboard de projetos e ver as obras que precisam de atenção.', s: 'd' },
          { t: 'Abrir uma obra e ver cliente, responsável, endereços, estágios e etapas.', s: 'd' },
        ],
      },
      {
        titulo: '3. Ler o painel financeiro da obra', onde: '`Financeiro > Painel Financeiro de Projetos`',
        passos: [
          { t: 'Escolher a obra e ler receitas, custos e margem.', s: 'd' },
          { t: 'Ler progresso e material: o que entrou, foi consumido e falta consumir.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Encontro a obra de um pedido e sei onde ver seu resultado.', s: 'd' },
    ],
    atencao: [
      'No painel da obra, **custo** é o valor destinado/comprometido (não é o que saiu do caixa) e **receita** é a nota autorizada (não o pedido). Não ache que é erro.',
      '"Materializar peças a partir do pedido" e postar no Diário de Obra são ações que gravam dados.',
    ],
    naoValidado: ['Nenhuma tela do módulo Projetos foi aberta ainda. As seções 2 e 3 vêm dos roteiros de validação.'],
  },

  /* ------------------------------------------------------------------ 11 */
  {
    id: 'expedicao', arquivo: '11-expedicao.html', etiqueta: 'Operação · Expedição',
    titulo: 'Expedição e entregas', resumo: 'Liberação, carga, checkpoints, rota e entrega.',
    subtitulo: 'Do pedido faturado até a mercadoria na mão do cliente: liberar, montar a carga, conferir no pátio e entregar.',
    objetivo: 'Entender as etapas da expedição e acompanhar o status de cargas e entregas, sabendo o que cada botão faz.',
    prerequisitos: [
      { t: 'Checklists 04 e 12 concluídos (a expedição só aceita pedido faturado).', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Ver o que pode ser expedido',
        passos: [
          { t: 'Em Pedidos de Venda, filtrar o Status "Lib. Expedição".', s: 'v' },
          { t: 'Saber que **Liberar para Expedição** (menu `⋯` do pedido) só aparece depois que o pedido é faturado.', s: 'v' },
          { t: 'Na Carteira de Pedidos (Vendas > Demonstrativos), ler A expedir, Em carga, Expedido e Entregue.', s: 'v' },
        ],
      },
      {
        titulo: '2. Entender a montagem da carga (sem montar)', onde: '`Expedição > Montar Nova Carga`',
        passos: [
          { t: 'Ver as abas "Por pedido de venda" e "Por ordem de produção" e o filtro "Exibir apenas pedidos explicitamente liberados".', s: 'v' },
          { t: 'Ler os campos: veículo (peso e volume), **Data prevista de saída**, **Motorista** e Observações.', r: 'O resumo mostra a ocupação do veículo (ex.: 23/360 kg).', s: 'v' },
          { t: 'Saber que "Autorizar montagem apesar do bloqueio de produção" só se usa com aprovação.', s: 'v' },
        ],
      },
      {
        titulo: '3. Acompanhar uma carga', onde: 'detalhe da carga',
        passos: [
          { t: 'Reconhecer o ciclo: **Em Montagem → Fechada → (Separação, Conferência, Carregamento) → Em Rota → Entregue**.', s: 'v' },
          { t: 'Ler o bloco de checkpoints: cada volume é bipado ou confirmado na Separação, na Conferência e no Carregamento.', s: 'v' },
          { t: 'Ler o **Histórico da Carga** (quem fez cada etapa e quando).', s: 'v' },
          { t: 'Ver os documentos disponíveis: Romaneio, Romaneio de itens, PDF e Etiquetas.', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'Sei dizer se um pedido está liberado, em carga, em rota ou entregue.', s: 'v' },
      { t: 'Sei explicar por que um pedido ainda não aparece para montar carga (não foi faturado/liberado).', s: 'v' },
    ],
    atencao: [
      '**Montar Carga**, **Fechar Carga**, **Iniciar Rota**, **Entregue** e **Ocorrência** alteram a operação real. Só com orientação.',
      'Fechar carga com motorista de CNH vencida exige justificativa, que fica registrada na carga.',
      '**Link de rastreamento** gera um link para o cliente: não gere em treino.',
      'A carga pode avisar "item sem ordem de produção vinculada" mesmo quando existe OP: confira antes de carregar.',
      'Confirmar entrega pelo painel pede um motivo por não ter foto/assinatura: o normal é o motorista confirmar pelo app.',
    ],
    naoValidado: ['Roteirização, ocorrências/devoluções, app do motorista e painéis da expedição ainda não foram abertos.'],
  },

  /* ------------------------------------------------------------------ 12 */
  {
    id: 'faturamento', arquivo: '12-faturamento-fiscal.html', etiqueta: 'Fiscal · Faturamento',
    titulo: 'Faturamento e Fiscal (consulta)', resumo: 'Notas fiscais NF-e/NFS-e, status e cuidados.',
    subtitulo: 'Onde o pedido vira nota fiscal. Aqui o estagiário consulta; emissão e transmissão são feitas por quem é responsável.',
    objetivo: 'Encontrar uma nota fiscal, entender seus status e saber quais ações têm efeito fiscal e nunca devem ser feitas em treino.',
    prerequisitos: [
      { t: 'Checklist 04 concluído.', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Consultar notas fiscais', onde: '`Faturamento > Notas Fiscais` (o módulo já abre nesta tela)',
        passos: [
          { t: 'Escolher a aba **NF-e** (produto) ou **NFS-e** (serviço).', s: 'v' },
          { t: 'Ler os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas.', s: 'v' },
          { t: 'Trocar o filtro **Status** (abre em "Em Aberto") e o filtro **Ambiente** (Homologação/Produção).', r: 'Notas autorizadas e canceladas só aparecem com o Status certo.', s: 'v' },
          { t: 'Pesquisar por número ou cliente.', s: 'v' },
        ],
      },
      {
        titulo: '2. Conhecer as ações de uma nota (sem executar)', onde: 'menu `...` da linha',
        passos: [
          { t: 'Reconhecer as opções: Editar, Finalizar NF, Preview da DANFE, Duplicar, Ver Timeline, Anexos e Excluir.', s: 'v' },
          { t: 'Identificar o botão **Transmitir** (avião de papel) direto na linha e saber que ele envia a nota à SEFAZ.', s: 'v' },
          { t: 'Usar só as opções de consulta (Ver Timeline, Preview da DANFE) quando o supervisor pedir.', s: 'n' },
        ],
      },
      {
        titulo: '3. Saber como o pedido vira nota', onde: 'menu `⋯ > Faturar` do pedido',
        passos: [
          { t: 'Saber que a nota nasce do pedido: `⋯ > Faturar` importa os itens e abre "Nova NF-e" com cliente, CFOP e parcelas do pedido.', s: 'v' },
          { t: 'Saber que, ao salvar a nota, o pedido já aparece como "Faturado" — mesmo com a nota ainda Em Aberto. Confira sempre o status da nota.', s: 'v' },
          { t: 'Reconhecer o quadro "Impostos não calculados no item" e o motivo que ele mostra (ex.: CST de PIS/COFINS ausente na NCM): é assunto do fiscal.', s: 'v' },
        ],
      },
      {
        titulo: '4. Saber onde ficam os cadastros fiscais', onde: 'módulo `Fiscal`',
        passos: [
          { t: 'Saber que NCM, CFOP, CST/CSOSN, CEST e Textos Fiscais são cadastros do Fiscal, mantidos com o contador.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Encontro uma nota pelo cliente e digo se está em aberto, autorizada, cancelada ou rejeitada.', s: 'v' },
      { t: 'Sei apontar os botões que nunca devo usar em treino.', s: 'v' },
    ],
    atencao: [
      '**Transmitir** fica exposto na linha, a um clique: envia a nota à SEFAZ. Nunca clique.',
      '**Excluir** fica no mesmo menu de Ver Timeline e Anexos.',
      'Cancelamento, carta de correção e inutilização de numeração têm efeito fiscal: são feitos só pelo responsável.',
      'Mesmo em ambiente "Homologação" (sem validade fiscal), não transmita.',
      '**Finalizar NF** trava a nota para edição e movimenta estoque: só o responsável. Se falhar, o número da nota pode ser consumido mesmo assim.',
      'Os cartões do topo podem não seguir o filtro escolhido (ex.: Valor Total R$ 0,00 com notas em aberto). Confirme com o supervisor antes de usar esses números.',
    ],
    naoValidado: [
      'O formulário avulso "+ Nova NF-e" e a aba NFS-e ainda não foram conferidos.',
      'Nenhuma tela do módulo Fiscal foi aberta: os itens do menu foram lidos apenas da definição do sistema.',
    ],
  },

  /* ------------------------------------------------------------------ 13 */
  {
    id: 'financeiro', arquivo: '13-financeiro.html', etiqueta: 'Gestão · Financeiro',
    titulo: 'Financeiro (consulta)', resumo: 'Contas a receber e a pagar, fluxo de caixa e DRE.',
    subtitulo: 'O financeiro recebe os títulos que nascem das vendas, das notas e dos recebimentos de compra.',
    objetivo: 'Consultar títulos a receber e a pagar, entender de onde eles vêm e ler o fluxo de caixa e os demonstrativos.',
    prerequisitos: [
      { t: 'Checklists 04, 06 e 12 concluídos.', s: 'd' },
    ],
    fluxos: [
      {
        titulo: '1. Partir dos indicadores da tela Início',
        passos: [
          { t: 'Ler "Títulos a receber em aberto" e "Títulos a pagar em aberto" em Tarefas do dia.', r: 'O atalho leva a Financeiro > Contas a Receber.', s: 'v' },
          { t: 'Ler Recebido no mês, A receber e A pagar no Resumo do negócio.', s: 'v' },
        ],
      },
      {
        titulo: '2. Consultar títulos', onde: '`Financeiro > Contas a Receber` e `Contas a Pagar`',
        passos: [
          { t: 'Filtrar por vencimento e situação e abrir um título.', s: 'n' },
          { t: 'Ver de qual pedido, nota ou recebimento o título veio.', s: 'd' },
          { t: 'Saber que "Pagamentos" é uma aba dentro de Contas a Pagar.', s: 'n' },
        ],
      },
      {
        titulo: '3. Ler a visão de gestão',
        passos: [
          { t: 'Abrir `Fluxo de Caixa` e `DRE`.', s: 'd' },
          { t: 'Abrir `Painel Financeiro de Projetos` para ver o resultado por obra.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Sei explicar de onde vem um título a receber (pedido/nota) e um título a pagar (recebimento de compra).', s: 'd' },
    ],
    atencao: [
      'Baixar, pagar, receber, estornar, transferir, gerar boleto/PIX são ações com valor: **nunca em treino**.',
      'Contas Bancárias, Boleto e Webservice de bancos são configurações sensíveis.',
      'Não há item "Conciliação" no menu; confirme com o supervisor onde a empresa concilia (provavelmente em Extrato).',
    ],
    naoValidado: ['Nenhuma tela do Financeiro foi aberta ainda: os itens do menu foram lidos apenas da definição do sistema.'],
  },

  /* ------------------------------------------------------------------ 14 */
  {
    id: 'tarefas', arquivo: '14-tarefas.html', etiqueta: 'Gestão · Tarefas',
    titulo: 'Tarefas: quadros e cartões', resumo: 'Organizar e acompanhar atividades da equipe.',
    subtitulo: 'Quadros com listas e cartões para acompanhar quem faz o quê e até quando.',
    objetivo: 'Usar o módulo Tarefas para acompanhar suas atividades: achar seus cartões, atualizar o andamento e registrar comentários.',
    prerequisitos: [
      { t: 'Checklist 01 concluído.', s: 'v' },
      { t: 'Saber qual quadro você vai usar (combine com o supervisor).', s: 'd' },
    ],
    fluxos: [
      {
        titulo: '1. Achar suas tarefas',
        passos: [
          { t: 'Abrir o módulo Tarefas pelo menu de módulos (a busca Ctrl+K por "tarefa" não encontra o módulo).', s: 'v' },
          { t: 'Abrir **Minhas Tarefas** e ver o que está atribuído a você.', s: 'd' },
          { t: 'Abrir um quadro e alternar as visões: Kanban, lista, tabela, calendário e Gantt.', s: 'd' },
        ],
      },
      {
        titulo: '2. Trabalhar num cartão',
        passos: [
          { t: 'Criar um cartão "TESTE ESTAGIÁRIO" no quadro combinado.', s: 'd' },
          { t: 'Preencher responsável, prazo e prioridade; usar o checklist e os comentários do cartão.', s: 'd' },
          { t: 'Mover o cartão entre as listas conforme o andamento.', s: 'd' },
          { t: 'Arquivar o cartão de teste no fim.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Meu cartão de teste aparece em Minhas Tarefas e na coluna certa do quadro.', s: 'd' },
    ],
    atencao: [
      'Automações e recorrências do quadro podem criar cartões e enviar notificações sozinhas.',
      'Mover cartões de outras pessoas avisa os responsáveis.',
    ],
    naoValidado: ['O módulo Tarefas ainda não foi aberto na exploração: os passos vêm do roteiro de validação de Tarefas.'],
  },

  /* ------------------------------------------------------------------ 15 */
  {
    id: 'fluxo', arquivo: '15-visao-fluxo-completo.html', etiqueta: 'Integração · Visão geral',
    titulo: 'Visão do fluxo completo', resumo: 'Como um pedido passa por todos os módulos.',
    subtitulo: 'Um mapa para seguir um pedido de verdade pelo sistema e ver onde cada etapa aparece.',
    objetivo: 'Seguir um pedido existente pelos módulos e reconhecer, em cada tela, o sinal de que ele avançou.',
    prerequisitos: [
      { t: 'Checklists 01 a 04 concluídos.', s: 'v' },
      { t: 'Um pedido faturado ou entregue indicado pelo supervisor para servir de exemplo.', s: 'd' },
    ],
    fluxos: [
      {
        titulo: '1. Do contato ao pedido',
        passos: [
          { t: 'CRM: o lead é cadastrado, avança no Kanban e é convertido (vira participante "convertido").', s: 'v' },
          { t: 'Vendas: o pedido de venda é criado para o cliente; a coluna PROJETO mostra a obra.', s: 'v' },
        ],
      },
      {
        titulo: '2. Do pedido à operação',
        passos: [
          { t: 'Serviços: a medição nasce do pedido de venda e mostra a obra.', s: 'v' },
          { t: 'Produção: a OP consome material (movimento "Baixa de componente em OP") e entrega o produto acabado ("Entrada de produto acabado (OP)").', s: 'v' },
          { t: 'Compras e Recebimento: o pedido de compra entregue vira nota de recebimento, entra no estoque e gera contas a pagar.', s: 'v' },
          { t: 'Produção: a OP é criada à mão em Produção > Nova OP, escolhendo o pedido de venda e o item.', s: 'v' },
          { t: 'Expedição: depois de faturado, o pedido é liberado ("Lib. Expedição"), entra numa carga e é entregue.', s: 'v' },
        ],
      },
      {
        titulo: '3. Da nota ao resultado',
        passos: [
          { t: 'Faturamento: `⋯ > Faturar` no pedido gera a nota; ela aparece em Notas Fiscais e a coluna NOTA FISCAL do pedido é preenchida.', s: 'v' },
          { t: 'Financeiro: a coluna TÍTULOS do pedido mostra "Gerados" e os títulos aparecem em Contas a Receber.', s: 'v' },
          { t: 'Projetos: o painel financeiro da obra soma receitas e custos.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Consigo mostrar, com as telas abertas, onde o pedido de exemplo aparece em cada módulo.', s: 'd' },
    ],
    atencao: [
      'No teste de 19/10/2026 a ordem exigida pelo sistema foi: pedido → medição → OP → faturar → liberar para expedição → carga → entrega → títulos. Confirme com o supervisor se a sua empresa usa a mesma sequência.',
      'Siga o pedido só consultando: nenhum botão de avanço deve ser clicado neste exercício.',
    ],
    naoValidado: ['Baixa de título e resultado no painel da obra ainda não foram conferidos no teste de ponta a ponta.'],
  },
];
