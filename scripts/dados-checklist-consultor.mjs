/* Checklist do consultor: teste funcional do fluxo completo, do lead ao resultado da obra.
   Mesmos selos de origem da Trilha do Estagiário ('v' conferido no sistema, 'd' documentação, 'n' não validado).
   `campo` cria um campo de texto ao lado da etapa para anotar o número/ID do registro criado. */

export const CONSULTOR = {
  id: 'fluxo-completo', arquivo: 'teste-fluxo-pedido-ate-gestao.html', etiqueta: 'Consultor · Teste de fluxo',
  titulo: 'Teste do fluxo completo: do pedido à gestão',
  rodape: 'Teste de Fluxo · Consultor · Faktory Flow v1.22.11 · roteiro conferido em 16 e 19/10/2026 (dev METALURGICA TEST e staging FESQUA 2026)',
  subtitulo: 'Roteiro para o consultor provar, num ambiente de teste, que um pedido atravessa todos os módulos e chega aos indicadores de gestão com os números certos. Anote o número de cada registro criado: ele serve para conferir os reflexos e para a limpeza no fim.',
  objetivo: 'Executar o ciclo comercial e operacional completo com registros "TESTE FLUXO CONSULTOR" — lead, pedido, obra, medição, produção, estoque, expedição, nota, títulos e resultado — e confirmar em cada passagem que o módulo seguinte recebeu a informação.',
  prerequisitos: [
    { t: 'Ambiente de **teste** (dev ou staging) aberto em **uma única aba** logada. Várias abas logadas ao mesmo tempo derrubam a sessão.', s: 'v' },
    { t: 'Selo da empresa no topo e versão no rodapé do menu anotados.', s: 'v', campo: 'Empresa / versão' },
    { t: 'Ambiente fiscal em **Homologação** (coluna AMBIENTE em Faturamento > Notas Fiscais). Mesmo assim, a nota **não** será transmitida.', s: 'v' },
    { t: 'Caixa de e-mail de teste para o cliente (ex.: endereço @tuamaeaquelaursa.com, que é público e apaga sozinho — só dados fictícios).', s: 'v', campo: 'E-mail de teste' },
    { t: 'Um produto simples com estrutura e processo de produção cadastrados (ou de revenda, se a empresa não fabrica) **e com unidade de medida cadastrada para a empresa** — sem isso o pedido só falha no Salvar ("Unidade de Medida "PÇ" não está cadastrada para esta empresa").', s: 'v', campo: 'Código do produto' },
    { t: 'Condição de pagamento, meio de pagamento, portador e conta de fluxo de caixa de venda definidos com o financeiro (são exigidos no pedido).', s: 'v' },
    { t: 'Equipe de campo ativa e usuário vinculado como conferente, se a empresa usa medição com conferência.', s: 'v' },
  ],
  fluxos: [
    {
      titulo: '1. CRM: lead até a conversão', onde: '`CRM > Vendas > Leads`',
      passos: [
        { t: '`Novo Lead`: Tipo PF/PJ e Razão Social começando por "TESTE FLUXO CONSULTOR"; CPF/CNPJ de teste; CEP e número; contato com o e-mail de teste e as chaves de e-mail (Notas Fiscais, Boletos, Vendas) ligadas.', r: '"Registro salvo com sucesso!" e lead com Status "Novo".', s: 'v', campo: 'Nome / código do lead' },
        { t: 'Se o bairro preenchido pelo CEP tiver menos de 3 letras, o sistema recusa ao salvar: registre como defeito e ajuste o bairro.', s: 'v' },
        { t: 'Conferir na lista se a Temperatura escolhida ficou gravada.', s: 'v' },
        { t: 'No `Kanban de Leads`, levar o lead até uma etapa de **60% ou mais** (MQL, SQL ou Demo agendada), confirmando cada diálogo "Mover lead".', r: 'Cada mudança entra no histórico do lead.', s: 'v' },
        { t: 'Em `Editar Lead`, completar o **BANT**: Budget Estimado e as chaves Autoridade, Necessidade e Prazo/timeline. Salvar.', s: 'v' },
        { t: '`⋮ > Converter` e confirmar "Converter Lead".', r: '"Lead convertido com sucesso!"; o participante continua o mesmo ("Participante já vinculado").', s: 'v' },
        { t: 'Conferir em `Cadastros > Participantes` o cadastro convertido.', r: '"É Cliente?" ligado e "Prospect/Lead" desligado. "Conta a Receber" continua desligada: confira se a empresa exige.', s: 'v' },
        { t: 'Conferir de novo a Temperatura do lead: ela mudou sozinha ao salvar o BANT (Morno → Frio) no teste.', s: 'v' },
      ],
    },
    {
      titulo: '2. Vendas: pedido e aprovação', onde: '`Vendas > Pedidos de Venda`',
      passos: [
        { t: '`+ Novo Pedido`: Empresa, Cliente, Vendedor, Condição de Pagamento (gera as parcelas) e Projeto/obra (opcional).', s: 'v' },
        { t: 'Escolher o **CFOP** (só libera depois de empresa e cliente e vem filtrado pelo estado do cliente; ex.: 6101 para outro estado).', s: 'v' },
        { t: 'Adicionar o item: produto, quantidade e valor. Produtos de esquadria abrem "Dados do Item" (altura, largura, comprimento, peso, cor) — confira a unidade (mm).', r: 'O item aparece com o total; os impostos podem aparecer como "não calculados" até salvar.', s: 'v' },
        { t: 'Nas parcelas, informar Meio de Pagamento e Portador; no Resumo, a **Conta de Fluxo de Caixa** de venda.', r: 'Com "Boleto" sem conta emissora configurada, aparece aviso de emissão de boletos.', s: 'v' },
        { t: 'Clicar em **Salvar e Permanecer** logo depois de incluir o item (para não perder o pedido se a sessão cair) e depois Salvar.', r: 'Pedido numerado na lista com Status "Em Aberto".', s: 'n', campo: 'Nº do pedido (PV-)' },
        { t: 'Trocar o filtro Status para "Todos" e localizar o pedido.', r: 'A lista carrega todos os status (no staging esse filtro deu erro "Não foi possível consultar os pedidos": registre se acontecer).', s: 'v' },
        { t: 'Se houver desconto acima da alçada, conferir a pendência em `Vendas > Aprovações` e aprovar só o pedido de teste.', s: 'd' },
        { t: 'Conferir as colunas TÍTULOS e NOTA FISCAL do pedido.', r: 'Anote se os títulos já nascem "Gerados" antes do faturamento.', s: 'v', campo: 'Títulos / NF (antes)' },
      ],
    },
    {
      titulo: '3. Projetos: a obra do pedido', onde: 'módulo `Projetos`',
      passos: [
        { t: 'Abrir a obra vinculada ao pedido (ou criar uma obra "TESTE FLUXO CONSULTOR" se o pedido exigir).', s: 'd', campo: 'Código da obra' },
        { t: 'Conferir se o pedido aparece na obra e no Painel Financeiro de Projetos.', s: 'd' },
      ],
    },
    {
      titulo: '4. Serviços: medição', onde: '`Serviços > Medições`',
      passos: [
        { t: '`+ Nova Medição` > escolher o pedido de teste > `Usar este registro`.', r: 'Medição criada com cliente, obra e itens do pedido.', s: 'v', campo: 'Nº da medição (MED-)' },
        { t: 'Definir técnico, equipe e data; lançar os vãos; finalizar.', r: 'Status passa por Em Execução e, se a conferência estiver ligada, "Aguardando Conferência".', s: 'd' },
        { t: 'Aprovar a medição com um conferente diferente de quem mediu (se a regra estiver ligada).', r: 'Medição "Aprovada" aparece no Dashboard em "Aprovadas sem instalação".', s: 'd' },
      ],
    },
    {
      titulo: '5. Produção: ordem de produção', onde: '`Produção > Ordens de Produção`',
      passos: [
        { t: 'Gerar a OP a partir do pedido de teste.', s: 'd', campo: 'Nº da OP' },
        { t: 'Liberar a OP e conferir as requisições de material geradas.', s: 'd' },
        { t: 'Apontar as etapas e concluir a OP.', r: 'Em `Estoque > Movimentos` aparecem "Baixa de componente em OP" e "Entrada de produto acabado (OP)" citando a OP.', s: 'v' },
      ],
    },
    {
      titulo: '6. Estoque: conferir reflexos', onde: '`Estoque > Saldo` e `Estoque > Movimentos`',
      passos: [
        { t: 'Antes da OP, anotar o saldo do produto e de um insumo no local da obra.', s: 'v', campo: 'Saldo antes' },
        { t: 'Depois da OP, conferir o novo saldo e o histórico do produto (aba Histórico).', r: 'Saldo do insumo diminui, saldo do produto acabado aumenta, motivo cita a OP.', s: 'v', campo: 'Saldo depois' },
        { t: 'Conferir a coluna RESERVADA, se a empresa reserva material para o pedido.', s: 'd' },
      ],
    },
    {
      titulo: '7. Expedição: carga e entrega', onde: 'módulo `Expedição`',
      passos: [
        { t: 'Liberar o pedido para expedição.', r: 'Pedido com Status "Lib. Expedição".', s: 'd' },
        { t: 'Montar uma carga com o pedido de teste (veículo, motorista, data) e avançar o ciclo até a entrega.', s: 'd', campo: 'Nº da carga' },
        { t: 'Conferir na Carteira de Pedidos (Vendas > Demonstrativos) a passagem por Em carga → Expedido → Entregue.', s: 'd' },
      ],
    },
    {
      titulo: '8. Faturamento: nota sem transmitir', onde: '`Faturamento > Notas Fiscais`',
      passos: [
        { t: 'Gerar a nota do pedido de teste e conferir cliente, itens, CFOP e impostos calculados.', s: 'n', campo: 'Nº da nota' },
        { t: 'Usar `... > Finalizar NF` para simular o fechamento. **Não usar Transmitir** (avião de papel na linha).', s: 'v' },
        { t: 'Abrir `... > Ver Timeline` e `Preview da DANFE`.', s: 'v' },
        { t: 'Voltar à lista de pedidos e conferir a coluna NOTA FISCAL.', s: 'v' },
      ],
    },
    {
      titulo: '9. Financeiro: títulos e baixa', onde: '`Financeiro > Contas a Receber`',
      passos: [
        { t: 'Localizar os títulos do pedido de teste.', r: 'Valor e parcelas conferem com a condição de pagamento.', s: 'n', campo: 'Nº dos títulos' },
        { t: 'Baixar um título de teste (recebimento simulado).', s: 'n' },
        { t: 'Conferir o reflexo em Fluxo de Caixa e no Resumo do negócio da tela Início (Recebido no mês).', s: 'd' },
      ],
    },
    {
      titulo: '10. Gestão: o pedido nos indicadores',
      passos: [
        { t: '`Vendas > Dashboard Vendas` (período de hoje, clicar em Aplicar): o pedido entra em Total em vendas.', s: 'v' },
        { t: '`Serviços > Dashboard Serviços`: a medição aparece no pipeline operacional.', s: 'v' },
        { t: 'Painel Financeiro de Projetos e DRE: receita da nota e custos aparecem na obra de teste.', s: 'd' },
      ],
    },
    {
      titulo: '11. E-mails e limpeza',
      passos: [
        { t: 'Abrir a caixa de e-mail de teste e anotar quais etapas enviaram e-mail (proposta, nota, boleto, aviso de entrega, serviço).', s: 'n', campo: 'E-mails recebidos' },
        { t: 'Listar todos os registros "TESTE FLUXO CONSULTOR" criados e combinar com o time a limpeza (excluir lead/participante, cancelar pedido etc.).', s: 'v' },
      ],
    },
  ],
  resultado: [
    { t: 'Cada módulo mostrou o reflexo da etapa anterior (pedido → obra → medição → OP → estoque → carga → nota → títulos).', s: 'd' },
    { t: 'Os valores conferem entre pedido, nota, títulos e painel da obra.', s: 'd' },
    { t: 'Nenhuma nota foi transmitida e nenhum registro real foi alterado.', s: 'v' },
    { t: 'Os defeitos encontrados foram anotados com os passos para reproduzir.', s: 'v' },
  ],
  atencao: [
    'A sessão do ambiente de teste caiu várias vezes durante a preparação deste roteiro (inclusive com uma aba só e em atualizações do sistema). Use **Salvar e Permanecer** com frequência e anote os números dos registros conforme avança. O login bloqueia por 15 minutos após muitas tentativas.',
    'Não use **Sair**, não troque de empresa e não abra a tela de login no meio do teste.',
    '**Transmitir** a nota é irreversível, mesmo em homologação: este roteiro só finaliza.',
    'Converter o lead **não** cria pedido: o pedido é feito em Vendas.',
    'No Kanban de leads, o card pode cair uma coluna antes de onde foi solto; confira a etapa antes de confirmar.',
    'Números de pedido podem se repetir na lista (séries/empresas diferentes): identifique o seu pelo cliente de teste.',
  ],
  naoValidado: [
    'Até 19/10/2026 o teste foi executado até a conversão do lead e o preenchimento do pedido: o salvamento do pedido foi bloqueado porque a unidade "PÇ" do produto não estava cadastrada na empresa METALURGICA TEST (dev), e a sessão caiu em seguida. As etapas a partir do salvamento do pedido seguem os roteiros de validação e precisam da primeira execução completa.',
    'Defeitos encontrados no teste: bairro curto preenchido pelo CEP recusado ao salvar; Temperatura do lead muda sozinha; erro de unidade de medida só aparece no Salvar do pedido; aviso de boleto continua após trocar o meio de pagamento; dimensões do item rotuladas em mm com valores em metros; Budget "100000" vira R$ 100.000,00.',
  ],
};
