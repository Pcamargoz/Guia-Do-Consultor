/* Cenários reais encontrados na exploração de 16/10/2026 (Faktory Flow v1.22.11), gravados nos planos de
   validação por scripts/atualizar-cenarios-checklists.mjs.
   Ambientes: STAGING = staging.flow.faktory.com.br, empresa FESQUA 2026; DEV = dev.flow.faktory.com.br,
   empresa METALURGICA TEST. Cada achado diz em que ambiente foi visto e se foi executado ou só observado. */

export const DATA = '16/10/2026';

export const CENARIOS = [
  {
    arquivo: 'validacao-crm-v2-faktory-flow.html',
    preparacao: [
      'DEV — lead "TESTE FLUXO CONSULTOR - Cliente Metalurgica" (PF, CPF de teste 111.444.777-35, e-mail @tuamaeaquelaursa.com) parado na etapa MQL (60%) com o BANT incompleto: serve para o roteiro 01 §4 (conversão).',
      'STAGING — Visão Geral do CRM mostrava 9 leads novos aguardando qualificação, 18 oportunidades e R$ 2.402.615,00 em jogo; 22 leads na lista.',
    ],
    achados: [
      { roteiro: '01', item: '1.1', txt: 'STAGING e DEV, executado: "Novo Lead" abre o cadastro completo de Participante (com dados fiscais, plano de contas e "Prospect/Lead" já ligado). Obrigatórios: Tipo (PF/PJ) e Razão Social / Nome. Salvar vazio mostra "Erros de validação (2 erro(s))". No staging a chave "Ativo" vinha desligada no formulário novo.' },
      { roteiro: '01', item: '1.2', txt: 'DEV, executado: o CEP 01001-000 preenche o bairro "Sé" e o próprio sistema recusa ao salvar ("Bairro deve ter pelo menos 3 caracteres."). Foi preciso trocar o bairro para salvar — defeito a abrir.' },
      { roteiro: '01', item: '1.4', txt: 'DEV, executado: Temperatura "Quente" escolhida no cadastro apareceu como "Morno" na lista e vazia ao reabrir "Editar Lead" (repetir manualmente para confirmar). Na edição, Origem e Responsável ficam bloqueados.' },
      { roteiro: '01', item: '2.5', txt: 'STAGING, verificado: filtros rápidos de Status (Todos, Novo, Em Qualificação, Qualificado, Convertido, Desqualificado), Temperatura (Frio, Morno, Quente, Urgente), "Só minhas" e Tag. Os Filtros Avançados exibem nomes técnicos de coluna ("Origem Id", "Score Ia Modelo Versao").' },
      { roteiro: '01', item: '3.2', txt: 'DEV, executado: o diálogo "Mover lead" (observação opcional) só grava ao clicar em Confirmar; clicar fora cancela sem aviso. Em painel estreito, o card caiu uma coluna antes do ponto de soltura duas vezes.' },
      { roteiro: '01', item: '3.5', txt: 'DEV, verificado: etapas do funil de leads = Inbound 10%, Pesquisado 25%, Conectado 40%, MQL 60%, SQL 80%, Demo agendada 90%.' },
      { roteiro: '01', item: '4.1', txt: 'DEV, executado: a mensagem é "Lead na etapa "Inbound" (10%) não pode ser convertido. Mova o lead para uma etapa com 60% ou mais."' },
      { roteiro: '01', item: '4.2', txt: 'DEV, executado: em MQL (60%) a janela é "Converter Lead em Participante" ("Participante já vinculado. A conversão irá marcar o lead como convertido no sistema.") e não oferece escolha de funil/etapa da oportunidade. Ao confirmar: "BANT incompleto — faltam: budget, autoridade, necessidade, timeline." A conversão não foi concluída (sessão caiu).' },
    ],
  },
  {
    arquivo: 'validacao-compras-faktory-flow.html',
    preparacao: [
      'STAGING — pedidos de compra existentes usados como referência no Dashboard de Recebimento: PC-000009, PC-000025 a PC-000027, PC-000043, PC-000045, PC-000046, PC-000048 e TREINO-PC-20260921-01.',
    ],
    achados: [
      { roteiro: '16', item: '1.6', txt: 'STAGING, observado: o Dashboard Compras tem o link "Ver todas" que leva a /compras/aprovacoes. O menu do módulo segue a ordem do processo: Solicitações → Sugestão → Cotações → Pedidos → Aprovações → Contratos de Entrega → Follow-up de Entregas.' },
    ],
  },
  {
    arquivo: 'validacao-recebimento-faktory-flow.html',
    preparacao: [
      'STAGING — NR-000050 aparece na fila do Dashboard de Recebimento com link direto para /recebimento/conferir/226 (bom ponto de partida para o roteiro 05).',
    ],
    achados: [
      { roteiro: '05', item: '1.1', txt: 'STAGING, observado: a fila de conferência aparece no menu lateral com o nome "Aprovações" (URL /recebimento/conferencias). Quem procura "Conferência" no menu não encontra — confirmar se o rótulo é intencional.' },
      { roteiro: '04', item: '4.1', txt: 'STAGING, observado: o Dashboard de Recebimento tem os cartões "Títulos a gerar · notas finalizadas sem título" (→ /recebimento/notas?status=finalizada) e "Parcelas a vencer · em até 7 dias" (→ /financeiro/contas-pagar), que ajudam a conferir o reflexo financeiro da finalização.' },
    ],
  },
  {
    arquivo: 'validacao-estoque-faktory-flow.html',
    preparacao: [
      'STAGING — massa com muitos saldos negativos (badge "200+ saldo(s) negativo(s)"; Visão geral: 504 negativos, 137 em ruptura), 1 empréstimo vencido (000476, 5 un, 08/09/2026) e encerramentos em rascunho de ago/2026 e set/2026.',
      'STAGING — produto GOL-PCR200 "PORTA DE CORRER - 2 FOLHAS - LINHA GOLD" tem histórico com "Entrada de produto acabado por conclusão da OP OP-000067" (bom exemplo para os roteiros 02 §2 e 10 §2).',
    ],
    achados: [
      { roteiro: '02', item: '1.7', txt: 'STAGING, observado: não existe item "Reservas" no menu. A reserva aparece no número clicável da coluna RESERVADA do Saldo ("Ver reservas desta posição do produto") e na aba "Reservas" do detalhe do produto.' },
      { roteiro: '02', item: '2.3', txt: 'STAGING, verificado: o Histórico do produto (últimos 50/100/200) traz DATA, NÚMERO, TIPO, SENTIDO, VARIAÇÃO, QTD, CUSTO UNIT., VALOR TOTAL e MOTIVO — continua sem coluna de saldo acumulado.' },
      { roteiro: '02', item: '3.6', txt: 'STAGING, verificado: a linha CM060 (Obra – PARQUE SEVILHA, saldo -2) mostrou VALOR TOTAL -R$ 149,22 com custo médio R$ 74,61, enquanto as demais linhas negativas mostram custo "-" e R$ 0,00 — tratamento inconsistente.' },
      { roteiro: '03', item: '1.8', txt: 'STAGING, verificado (sem salvar): o formulário Novo movimento oferece 8 tipos (Entrada manual, Ajuste positivo, Ajuste negativo, Transferência, Requisição, Devolução de uso, Empréstimo, Descarte) e o rodapé Cancelar (Esc), "Salvar e novo" e "Salvar (Ctrl+S)" — atenção: Ctrl+S grava o movimento.' },
      { roteiro: '04', item: '1.1', txt: 'STAGING, observado: a transferência existe em dois caminhos — tipo "Transferência" do Novo movimento e a tela Estoque > Transferências. Definir qual caminho é o oficial. A tela Transferências não chegou a ser aberta (sessão caiu).' },
      { roteiro: '09', item: '3.4', txt: 'STAGING, observado: a Visão geral lista dois encerramentos "set/2026 rascunho" além de "ago/2026 rascunho" — possível duplicidade de período.' },
      { roteiro: '10', item: '2.2', txt: 'STAGING, verificado em Movimentos: a conclusão da OP gera "Entrada de produto acabado (OP)" (origem "OP - Conclusão", motivo cita a OP) e a requisição gera "Baixa de componente em OP" (origem "Requisição"). Movimento 001058 com custo unitário R$ 0,00 / valor R$ 0,01.' },
      { roteiro: '12', item: '3.4', txt: 'STAGING, verificado: o bloco "Vidros por medida e cor" mostra medidas como "902.00 × 868.00 m" e área "-1565872.00 m²" — parece mm² rotulado como m². O gráfico "Entradas, saídas e saldo líquido (30d)" tem eixo de R$ 0,00 a R$ 0,01.' },
    ],
  },
  {
    arquivo: 'validacao-servicos-v2-faktory-flow.html',
    preparacao: [
      'STAGING — Dashboard Serviços: 9 medições a executar, 4 aprovadas sem instalação, 7 instalações a executar, 2 concluídas sem vistoria, 6 assistências abertas; alertas citam MED-000011 (vão pendente de reaprovação), INS-000001 (sem vistoria), VIST-000002 (ressalva sem AT, 46 dias) e AT-000001 (prazo estourado).',
      'STAGING — equipes ALFA (Interna, cap. 5), BETA (Interna, cap. 50) e CHARLIE (Interna, cap. 6); 17 medições em 2 páginas.',
    ],
    achados: [
      { roteiro: '00', item: '1.3', txt: 'STAGING, observado: o aplicativo de campo (/campo) não aparece no menu lateral de Serviços. Há dois itens "Aprovações": o do topo abre Comissões do Instalador (/servicos/comissoes-instalador) e o de Configurações abre /configuracoes/aprovacoes.' },
      { roteiro: '00', item: '2.7', txt: 'STAGING, verificado (só leitura): na aba Conferentes de Config. Serviços nenhum dos 4 usuários (nem o Admin) está vinculado a participante Funcionário — sem esse vínculo ninguém confere medição nem libera pagamento de instalação.' },
      { roteiro: '01', item: '2.4', txt: 'STAGING, verificado (só leitura): os campos aparecem como "TOLERÂNCIA (MM) (HORAS)", "TOLERÂNCIA (%) (HORAS)" e "DIAS APÓS CONCLUSÃO (HORAS)" — sufixo de unidade errado no rótulo.' },
      { roteiro: '02', item: '1.3', txt: 'STAGING, verificado: clicar na linha da equipe não abre o cadastro (é preciso usar o lápis); a edição usa a mesma rota de criação (/servicos/equipes/novo?id=17) e o botão "Desativar" fica ao lado de "Salvar". A equipe ALFA é Interna mas tem Fornecedor "PERFIL ALUMINIO" preenchido.' },
      { roteiro: '03', item: '1.1', txt: 'STAGING, verificado (sem salvar): "+ Nova Medição" lista pedidos de venda em cartões (filtro padrão Status "Em aberto" e "Esconder pedidos que já têm medição" marcado) com "Ver itens" e "Usar este registro"; o pedido mostra a obra ou "Sem obra vinculada" (ex.: PV-000391).' },
      { roteiro: '03', item: '1.3', txt: 'STAGING, verificado (sem salvar): a Medição avulsa exige Empresa, Cliente e Técnico Responsável; Pedido de Venda só libera após escolher o cliente; abas Dados Gerais, Vãos (Adicionar Vão / Importar de um pedido), Fotos e Histórico.' },
      { roteiro: '03', item: '1.6', txt: 'STAGING, observado: na lista de Medições o botão Excluir aparece desabilitado na linha agendada. Há dois botões de lançar vãos por linha ("Lançar medições dos vãos" e "(tela rápida)").' },
      { roteiro: '03', item: '2.2', txt: 'STAGING, verificado: filtros Cliente, Técnico, Status (Todos, Em aberto, Agendada, Em Execução, Aguardando Conferência, Aprovada, Reprovada, Cancelada), Data Inicial e Data Final. Em ~800 px de largura o status quebra em sílabas ("Em Exe cuç ão").' },
    ],
  },
  {
    arquivo: 'validacao-projetos-faktory-flow.html',
    preparacao: [
      'STAGING — obras vinculadas a pedidos e visíveis na Nova Medição: "ORC-26-08-0003 · Obra Le Jardin", "361 · OBRA DO JUSTA", "26.004 · São Paulo Prime" e "26-002 · Grand Tower"; PV-000391 está sem obra vinculada.',
    ],
    achados: [],
  },
  {
    arquivo: 'validacao-producao-v2-faktory-flow.html',
    preparacao: [
      'STAGING — tela Início alerta "2 ordens com prazo vencido" (link /producao/ordem-producao?status=atrasado); OP-000067 concluída gerou entrada de produto acabado no estoque (produto GOL-PCR200).',
    ],
    achados: [
      { roteiro: '04', item: '4.2', txt: 'STAGING, verificado no Estoque: as baixas de material de OP aparecem em Estoque > Movimentos como "Baixa de componente em OP" (origem "Requisição"), saindo do local da obra.' },
    ],
  },
  {
    arquivo: 'validacao-expedicao-faktory-flow.html',
    preparacao: [
      'DEV — Pedidos de Venda com status "Lib. Expedição" (ex.: PV-000023 com NF-008) e "Faturado" (ex.: PV-000032 com NF-018) servem de ponto de partida para os roteiros 03 e 04.',
    ],
    achados: [],
  },
  {
    arquivo: 'validacao-tarefas-faktory-flow.html',
    preparacao: [
      'STAGING — o Calendário da empresa (GLOBAIS > Configurações) tem 86 feriados e informa que eles afetam a carga da equipe em Tarefas.',
    ],
    achados: [
      { roteiro: '01', item: '1.2', txt: 'STAGING, verificado: a busca global (Ctrl+K "Pesquisar funcionalidades...") encontra só telas, não registros; digitando "tarefa" não aparece nenhuma sugestão nem mensagem de "sem resultados".' },
    ],
  },
];
