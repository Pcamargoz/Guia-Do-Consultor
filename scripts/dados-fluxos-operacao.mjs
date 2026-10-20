/* Fluxos de operação para VALIDAÇÃO MANUAL por pessoas: estoque, produção e expedição.
   Escritos a partir dos roteiros dos planos de QA (public/checklists/validacao-*.html) e do que já foi visto no sistema.
   Selos: 'v' = visto no sistema nas explorações de 16 e 19/10/2026; 'd' = vem dos roteiros, ainda não executado por uma pessoa; 'n' = por confirmar.
   Mesma estrutura de dados-fluxos-consultor.mjs. */

const AVISO_MANUAL = 'Roteiro escrito a partir dos planos de validação: a execução por uma pessoa é a primeira validação. Marque o que confere e use "Problema" no que divergir.';

export const FLUXOS_OPERACAO = [
  /* ------------------------------------------------------------------ Estoque */
  {
    id: 'fluxo-estoque', arquivo: 'fluxo-04-estoque.html', etiqueta: 'Consultor · Fluxo de estoque',
    titulo: 'Fluxo de estoque: movimento, transferência, reserva, inventário e empréstimo',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22.12 · transferência, reserva, inventário (até a contagem), empréstimo, reposição e balanço executados em 20/10/2026 (dev); auditoria e aprovação do inventário pendentes',
    subtitulo: 'O saldo nunca é digitado: ele nasce de movimentos. Este roteiro leva um produto de teste por entrada, ajuste, transferência, reserva, inventário e empréstimo, conferindo saldo, reservado e disponível a cada passo.',
    objetivo: 'Provar que cada operação de estoque muda o saldo (e o disponível) do jeito certo, respeita as travas (saldo, reserva, inventário, mês encerrado) e deixa rastro no extrato — e que o balanço fecha ao final.',
    prerequisitos: [
      { t: 'Produto de teste de **uso controlado em estoque** (ex.: um insumo) e dois locais ativos em `Estoque > Locais`: o **almoxarifado central** e um segundo local (obra ou almoxarifado de teste).', s: 'v', campo: 'Produto / locais' },
      { t: 'Parâmetros de estoque anotados antes de começar (`Estoque > Configurações > Parâmetros`). No v1.22.12 só existe "bloquear saída sem saldo"; os parâmetros "bloquear saída que invade reserva" e "empenhar material de OP" citados nos planos antigos não existem.', s: 'v' },
      { t: 'Dois usuários de teste para as regras de segregação: quem cria × quem confirma a transferência, e quem conta × quem audita/aprova o inventário.', s: 'd' },
      { t: 'Anotar o **saldo inicial** (quantidade e valor) do produto nos dois locais: o balanço do fim depende dele.', s: 'v', campo: 'Saldo inicial' },
    ],
    fluxos: [
      {
        titulo: '1. Movimento manual e estorno', onde: '`Estoque > Movimentos > + Novo Movimento`',
        passos: [
          { t: 'Escolher o tipo **Entrada manual**, o local de destino, o item e o **custo unitário**; salvar (cuidado: **Ctrl+S salva**).', r: 'Movimento numerado na lista; saldo e custo médio do produto atualizados.', s: 'v', campo: 'Nº do movimento' },
          { t: 'Lançar um **Ajuste positivo** (sobra) e um **Ajuste negativo** (quebra/perda).', r: 'Cada ajuste aparece no extrato com o sentido certo e o saldo acompanha.', s: 'd' },
          { t: 'Tentar uma **saída maior que o saldo**, com a trava "bloquear saída sem saldo" ligada e depois desligada.', r: 'Ligada: recusa. Desligada: passa e o saldo pode ficar negativo.', s: 'd' },
          { t: 'Tentar um movimento com **data em mês encerrado** e em local congelado por inventário.', r: 'Os dois são recusados com mensagem que explica a trava. Visto no teste: o local congelado por inventário recusou o movimento; o mês encerrado não foi testado.', s: 'd' },
          { t: 'Abrir o movimento e usar **Estornar**; informar o motivo.', r: 'Nasce o movimento "Estorno" e o original passa a "Estornado"; o saldo volta ao anterior.', s: 'v' },
        ],
      },
      {
        titulo: '2. Transferência entre locais', onde: '`Estoque > Transferências`',
        passos: [
          { t: 'Criar uma transferência de 5 un do almoxarifado central para o segundo local (rascunho).', r: 'Nasce pendente com número TRF-. O saldo da origem **não** desce ainda, mas o disponível desce (ex.: saldo 20, reservado 5, disponível 15). Visto: TRF-000001, 5 un de ALM-TESTE para ALM-TESTE-2.', s: 'v', campo: 'Nº da transferência (TRF-)' },
          { t: 'Na tela de Saldo, clicar no número da coluna **Reservada** da origem.', r: 'O detalhe aponta exatamente essa transferência.', s: 'v' },
          { t: 'Tentar origem igual ao destino, quantidade zero/negativa e transferência sem item.', r: 'As três são recusadas.', s: 'v' },
          { t: '**Confirmar** a transferência (com o usuário que tem permissão de confirmar).', r: 'A origem desce 5, o destino sobe 5 e a reserva é consumida. Nada fica "em trânsito". O custo médio acompanha o material. Visto: origem 5 / R$ 250 e destino 5 / R$ 250.', s: 'v' },
          { t: 'Abrir o extrato dos dois locais.', r: 'Saída na origem e entrada no destino, com o mesmo número TRF-. No teste havia um movimento único (000006) com origem e destino, e não duas linhas com o mesmo número.', s: 'd' },
          { t: 'Tentar confirmar de novo e excluir a transferência já confirmada.', r: 'As duas ações são recusadas ("só rascunho pode ser confirmado"). Depois de confirmada, os botões Confirmar e Excluir somem: não há como tentar.', s: 'd' },
          { t: 'Criar outra transferência pendente e **excluí-la**.', r: 'A reserva é liberada, o disponível volta ao que era e nenhum movimento foi gerado.', s: 'v' },
        ],
      },
      {
        titulo: '3. Reserva e disponibilidade', onde: 'coluna `Reservada` do Saldo e aba `Reservas` do produto',
        passos: [
          { t: 'Com o produto sem reserva, comparar Saldo e Disponível. Depois criar uma reserva de 5 un.', r: 'Saldo continua igual; reservado = 5; disponível = saldo − 5. No teste a reserva nasceu da transferência pendente; não há botão para reservar à mão.', s: 'd' },
          { t: 'Conferir que a reserva é por **variação física** (cor e medidas) e por **local**.', r: 'O disponível de outra cor ou de outro local não muda.', s: 'd' },
          { t: 'Tentar reservar mais que o disponível.', r: 'É recusado. Visto: reservar 6 com 5 disponíveis foi recusado.', s: 'v' },
          { t: 'Liberar a reserva; criar outra e consumi-la parcialmente (ex.: 3 de 5) e depois o restante.', r: 'Liberar devolve o disponível; consumir baixa o estoque e reduz o pendente; consumir mais que o pendente é recusado.', s: 'd' },
          { t: 'Tentar uma saída (requisição) que consumiria material reservado.', r: 'No v1.22.12 não existe o parâmetro "bloquear saída que invade reserva": a saída passou (requisição de 4 un sobre 3 reservadas: saldo 1, disponível −2), inclusive com "bloquear saída sem saldo" ligado. Anote o disponível antes e depois.', s: 'v' },
        ],
      },
      {
        titulo: '4. Inventário (contagem física)', onde: '`Estoque > Inventário` e `Estoque > Aprovações > Inventários`',
        passos: [
          { t: 'Abrir um inventário (empresa, local e tipo) e **iniciar**.', r: 'Número sequencial; o sistema fotografa o saldo (um item por variação) e **congela o local**. Visto: inventário 000001 (Completo).', s: 'v', campo: 'Nº do inventário' },
          { t: 'Com o inventário em andamento, tentar um movimento ou transferência naquele local e abrir um segundo inventário no mesmo local.', r: 'Os movimentos são bloqueados e não existem dois inventários ativos no mesmo local.', s: 'v' },
          { t: 'Contar na **tela do conferente** (contagem cega): um item com o valor igual ao do sistema e outro com valor diferente.', r: 'A tela não mostra o saldo do sistema. Igual: aprovado direto. Diferente: vai para a 2ª contagem (e, persistindo, para a 3ª e a auditoria). Visto: a 1ª contagem (4 contra 5 no sistema) funcionou; a 2ª contagem pelo mesmo usuário foi recusada ("deve ser feita por outra pessoa"), embora a tela diga "prossiga se não houver alternativa".', s: 'v' },
          { t: 'Com **outra pessoa**, auditar os itens que divergiram nas três contagens (quantidade final e justificativa).', r: 'O mesmo usuário da contagem é impedido ou avisado; a justificativa tem mínimo de caracteres. Precisa de um segundo usuário; no teste só havia um.', s: 'd' },
          { t: 'Revisar o resumo e informar o custo das entradas pendentes (sobras e itens avulsos); **aprovar**.', r: 'Cada diferença vira um ajuste de estoque com origem "inventário"; o saldo bate com a contagem e o local é descongelado. No inventário Simples o botão Aprovar ficou desabilitado: a regra de separação vale até para Super Usuário.', s: 'd' },
          { t: 'Cancelar um segundo inventário (com motivo) antes de aprovar.', r: 'Nenhum ajuste é gerado e o local é liberado. Visto: inventários 000001 e 000002 cancelados, sem ajuste.', s: 'v' },
        ],
      },
      {
        titulo: '5. Empréstimo entre locais', onde: '`Estoque > Empréstimos` ou tipo "Empréstimo" no Novo Movimento',
        passos: [
          { t: 'Registrar um empréstimo com **data prevista de devolução** (ex.: 20 un).', r: 'Sai do local de origem; aparece como aberto, sem devolução.', s: 'v', campo: 'Nº do empréstimo' },
          { t: 'Devolver parte (ex.: 10 de 20) e depois o restante; tentar devolver mais do que foi emprestado.', r: 'Parcial: progresso 50% e saldo de retorno +10. Total: "devolvido" 100%. Excesso é recusado. Visto: devolução de 5 com 4 emprestados foi recusada; 2 un (50%) e depois 2 un (100%).', s: 'v' },
          { t: 'Deixar um empréstimo passar do prazo.', r: 'Aparece destacado como vencido na lista e em "Pendências de hoje" da Visão geral. Atenção: em "Pendências de hoje" o contador de vencidos mostrou 0 enquanto o "Controle operacional" mostrou 1 vencido, e um empréstimo 100% devolvido ainda mostrou "1 dia atrasada".', s: 'v' },
          { t: 'Comparar o valor total do material antes do empréstimo e depois da devolução completa.', r: 'O valor volta igual: a devolução usa o custo médio correto. Visto: voltou a R$ 250 nos dois locais.', s: 'v' },
        ],
      },
      {
        titulo: '6. Reposição e balanço final', onde: '`Estoque > Reposição` e `Compras > Sugestão de Compra`',
        passos: [
          { t: 'Definir **estoque mínimo** para o produto de teste e abrir `Estoque > Reposição` e `Compras > Sugestão de Compra`.', r: 'O item aparece com a falta líquida = mínimo − disponível. Sem mínimo, não aparece em nenhuma das duas telas.', s: 'v' },
          { t: 'Fazer o **balanço** do produto: saldo inicial + entradas − saídas ± ajustes ± transferências − estornos.', r: 'O resultado é igual ao saldo final do Estoque, em quantidade e em valor. Qualquer diferença é defeito. Visto: fechou em 10 PT / R$ 500 no ALM-TESTE.', s: 'v', campo: 'Saldo final' },
          { t: 'Filtrar saldos com reserva maior que zero e abrir o detalhe de cada um.', r: 'Toda quantidade reservada tem um documento pendente correspondente (nenhuma reserva órfã).', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'Cada operação mudou saldo, reservado e disponível exatamente como o roteiro descreve.', s: 'd' },
      { t: 'As travas (saldo, reserva, inventário, mês encerrado) recusaram o que deviam, com mensagem clara.', s: 'd' },
      { t: 'O balanço do produto fechou em quantidade e valor e não sobraram reservas órfãs.', s: 'd' },
    ],
    atencao: [
      'Não existe item "Reservas" no menu: a reserva está na coluna Reservada do Saldo e na aba Reservas do produto.',
      '**Ctrl+S** salva o movimento no formulário. **Importar saldo**, **Estornar**, **Ajustar saldo** e **Aprovar inventário** alteram o estoque e não têm "desfazer".',
      'Transferência e Empréstimo existem como tipo de movimento **e** como telas próprias: use um só caminho por teste.',
      'O inventário congela o local: não deixe um inventário aberto na empresa de produção.',
      'No v1.22.12 a saída **passa sobre material reservado** (o disponível pode ficar negativo): não há trava para isso.',
      'Os avisos na tela (toasts) não somem sozinhos e podem cobrir botões; feche-os antes de continuar.',
      'A 2ª contagem e a aprovação do inventário exigem **outra pessoa**, até para Super Usuário: crie um segundo usuário antes.',
      'O produto precisa de **Origem da Mercadoria** preenchida para salvar (o aviso só aparece depois de Salvar).',
      'Aprovar **Encerramentos** (fechamento do mês) bloqueia lançamentos retroativos: neste roteiro só leia a tela.',
      'Pontos já vistos no ambiente de teste: vidros com área em mm² rotulada como m²; saldo negativo valorizado de forma inconsistente; encerramento de set/2026 duplicado.',
    ],
    naoValidado: [AVISO_MANUAL, 'Faltam, por exigirem um segundo usuário ou dados que o teste não tinha: auditoria e aprovação do inventário, a regra criar × confirmar da transferência, ajustes positivo e negativo, mês encerrado, reserva por cor e local e o consumo parcial da reserva.'],
  },

  /* ------------------------------------------------------------------ Produção */
  {
    id: 'fluxo-producao', arquivo: 'fluxo-05-producao.html', etiqueta: 'Consultor · Fluxo de produção',
    titulo: 'Fluxo de produção: estrutura, ordem, apontamento e entrada do produto acabado',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22 · roteiro de validação manual baseado nos planos de QA de Produção (documentos 01 a 05 e 15) e na execução da OP-000109',
    subtitulo: 'Cadastros-base → estrutura de produto → ordem de produção → requisição e baixa de material → apontamento → conclusão → entrada no estoque → custo. Mostra o que precisa existir antes e o que cada botão grava.',
    objetivo: 'Provar que uma OP nasce com processo e materiais corretos, baixa os insumos, registra as horas, e entrega o produto acabado no estoque com custo real — e conhecer os alertas que travam a conclusão.',
    prerequisitos: [
      { t: '**Etapas**, **processo** e **linha de produção** cadastrados (`Produção > Configurações`): ex.: Corte, Usinagem e Montagem com custo/hora; processo "Janela padrão" com as 3 etapas na ordem.', s: 'd' },
      { t: 'Produto de teste com **estrutura de produto** (itens e quantidades anotadas) e o processo padrão definido. Sem estrutura, a OP nasce sem requisições ("OP sem requisições da estrutura").', s: 'v', campo: 'Produto' },
      { t: 'Insumos da estrutura **com saldo** no almoxarifado central, e **almoxarifado central ativo** (ou local da obra). Sem local ativo a OP não conclui ("Conclusão bloqueada").', s: 'v' },
      { t: 'Funcionário cadastrado para apontar e, para a aprovação, um usuário com permissão de aprovar apontamento.', s: 'v' },
      { t: 'Anotar o saldo dos insumos e do produto acabado antes de começar.', s: 'v', campo: 'Saldos antes' },
    ],
    fluxos: [
      {
        titulo: '1. Cadastros-base e estrutura', onde: '`Produção > Configurações > Etapas / Processos / Linhas / Estrutura de produto`',
        passos: [
          { t: 'Criar 3 etapas com custo/hora diferentes e um processo com elas em ordem e tempo padrão.', r: 'A lista do processo mostra a soma do tempo total.', s: 'd' },
          { t: 'Criar a **estrutura** do produto com 3 itens (perfil com cor e comprimento, vidro com dimensões, componente) e anotar as quantidades.', r: 'Item paramétrico sem cor/comprimento é recusado.', s: 'd' },
          { t: 'Tentar uma segunda estrutura para o mesmo produto com período sobreposto.', r: 'É impedido com mensagem clara.', s: 'd' },
          { t: 'Abrir o calendário de produção e conferir os feriados nacionais; cadastrar um feriado da empresa.', r: 'Só os feriados do tipo Empresa podem ser removidos.', s: 'd' },
        ],
      },
      {
        titulo: '2. Ordem de produção', onde: '`Produção > Ordens de produção > Nova OP`',
        intro: 'O pedido não tem "Gerar OP": a OP é criada à mão e vinculada ao pedido.',
        passos: [
          { t: 'Preencher **Pedido de venda**, **Item do pedido** (copia produto e medidas, **não** a quantidade), **Quantidade**, **Empresa** (obrigatória) e o processo. Não use **Esc** no painel: ele fecha e perde o formulário.', r: '"Registro salvo com sucesso!". OP "Em aberto" na lista.', s: 'v', campo: 'Nº da OP' },
          { t: 'Abrir `Mais ações > Etapas de execução da OP` e `Materiais necessários`.', r: 'As etapas são cópia do processo; os materiais vêm da estrutura (compare com as quantidades anotadas). Mudar o processo depois não altera a OP já criada.', s: 'v' },
          { t: 'Reimportar da estrutura numa OP que já tem item manual.', r: 'Os itens de origem Estrutura são refeitos sem duplicar; os manuais ficam.', s: 'd' },
          { t: 'Tentar criar requisição numa OP já Produzida ou Cancelada.', r: 'Nenhuma das duas aceita.', s: 'd' },
        ],
      },
      {
        titulo: '3. Baixa de material', onde: '`Mais ações > Materiais necessários`',
        passos: [
          { t: 'Baixar **parcialmente** uma requisição (ex.: 30 de 60) e conferir `Estoque > Movimentos` e Saldo.', r: 'Status "Atendida parcialmente"; o saldo do insumo desceu 30; movimento "Baixa de componente em OP".', s: 'd' },
          { t: 'Baixar o restante.', r: 'Status "Atendida".', s: 'd' },
          { t: 'Estornar uma baixa informando o motivo.', r: 'O saldo volta, o status recalcula e o custo da OP desconta o estornado.', s: 'd' },
        ],
      },
      {
        titulo: '4. Apontamento', onde: 'botão `▶` da linha da OP e `Mais ações > Apontamentos`',
        passos: [
          { t: '**Iniciar** o apontamento escolhendo etapa e funcionário.', r: '"Apontamento iniciado com sucesso!"; a OP passa de "Em aberto" para "Em execução" na hora.', s: 'v', campo: 'Nº do apontamento' },
          { t: '**Finalizar** informando a quantidade produzida (primeiro zero, depois a quantidade válida).', r: 'Zero é recusado; quantidade válida registra. Excedendo o saldo da OP, o sistema pede confirmação. **No ambiente de teste de 19/10 a finalização foi recusada com "A data/hora de fim não pode ser no futuro"**: anote se ocorrer.', s: 'v' },
          { t: 'Com o apontamento em aberto, tentar iniciar outro para o mesmo funcionário na mesma OP.', r: 'É impedido.', s: 'd' },
          { t: 'Submeter e **aprovar** o apontamento com quem tem permissão; rejeitar outro com motivo.', r: 'Aprovar acumula as horas reais e dispara a baixa de materiais; rejeitar volta a rascunho.', s: 'd' },
          { t: 'Reabrir um apontamento encerrado há pouco.', r: 'Exige motivo; estorna horas, custo e baixa. Depois de 24 h o apontamento fica travado (🔒).', s: 'd' },
        ],
      },
      {
        titulo: '5. Conclusão e entrada no estoque', onde: '`Mais ações > Marcar produzido`',
        passos: [
          { t: '**Marcar produzido** com a quantidade total.', r: 'OP "Produzido". Sem almoxarifado ativo da empresa/obra o sistema bloqueia (selo "Conclusão bloqueada").', s: 'v' },
          { t: 'Abrir `Estoque > Movimentos` e o extrato do produto acabado.', r: 'Movimento "Entrada de produto acabado (OP)" com a OP no motivo; o custo unitário = custo real ÷ quantidade.', s: 'v', campo: 'Saldo depois' },
          { t: 'Abrir `Mais ações > Custo da OP` e `Linha do tempo`.', r: 'Custo estimado × realizado, separado em mão de obra e materiais; tempo planejado × real por etapa.', s: 'v' },
          { t: 'Conferir os selos de alerta da lista: Conclusão bloqueada, Conclusão travada, Material não baixado, Estoque não creditado.', r: 'Cada selo explica a causa ao passar o mouse; "Estoque não creditado" pede acionar o suporte.', s: 'v' },
        ],
      },
      {
        titulo: '6. Separação de materiais e painéis', onde: '`Produção > Separação de materiais` e `Produção > Painel de fábrica`',
        passos: [
          { t: 'Gerar uma lista de separação para a OP e abrir o detalhe (necessário, separado, falta, pendente).', r: 'A quantidade bate com a requisição da OP. Item paramétrico aparece com cor e dimensões.', s: 'd' },
          { t: 'Separar um item (no app `/separacao`) e conferir requisição e saldo do estoque.', r: 'A quantidade separada sobe, a requisição é baixada e o saldo desce; duplo clique não baixa em dobro.', s: 'd' },
          { t: 'Registrar falta com motivo do catálogo e reverter.', r: 'Falta sem motivo é recusada; a reversão preserva o histórico.', s: 'd' },
          { t: 'Abrir o Painel de fábrica nas visões Cards, Lista e Timeline.', r: 'Contadores Ordens / No prazo / Atrasadas; cada card tem o botão "Apontar <ETAPA>" (grava apontamento).', s: 'v' },
        ],
      },
    ],
    resultado: [
      { t: 'A OP gerou requisições a partir da estrutura e as baixas bateram com o saldo do estoque.', s: 'd' },
      { t: 'O apontamento acumulou horas e o custo real da OP é mão de obra + materiais.', s: 'd' },
      { t: 'A conclusão creditou o produto acabado no estoque com a quantidade e o custo certos.', s: 'd' },
    ],
    atencao: [
      'Na lista, **Iniciar produção** muda a OP para "Em execução" com um clique. Em OP "Em aberto" o lugar do olho (Visualizar) é ocupado por **Editar OP**.',
      '**Marcar produzido**, **Pausar OP**, **Cancelar OP**, **Replicar OP** e **Gerar OS de instalação** alteram dados. Cancelar OP com movimentos de estoque os estorna.',
      'Um apontamento aberto continua aberto mesmo depois da OP "Produzido" (visto no ambiente de teste).',
      'A **Fila de exceções** mostra erros técnicos e o botão **Reprocessar**: não reprocesse sem o suporte.',
      'A Empresa da OP é obrigatória, apesar da dica dizer que ela herda do pedido.',
      'No PCP, arrastar OPs muda a programação da fábrica; o Terminal e o app de separação têm botão **Sair**.',
    ],
    naoValidado: [AVISO_MANUAL, 'Estrutura de produto, requisição/baixa com estrutura, aprovação de apontamento e separação ainda não foram executadas no sistema.'],
  },

  /* ------------------------------------------------------------------ Expedição */
  {
    id: 'fluxo-expedicao', arquivo: 'fluxo-06-expedicao.html', etiqueta: 'Consultor · Fluxo de expedição',
    titulo: 'Fluxo de expedição: da carga à entrega, ocorrência e devolução',
    rodape: 'Fluxos do Consultor · Faktory Flow v1.22 · caminho feliz executado em 19/10/2026 (carga 20261000001); ocorrências e devolução baseadas no plano de QA de Expedição (documentos 07, 09 e 10)',
    subtitulo: 'Liberar o pedido → montar e fechar a carga → separação, conferência e carregamento → rota → entrega. Depois o que dá errado: ocorrência, devolução e re-expedição.',
    objetivo: 'Provar que um pedido faturado vira carga, passa pelos checkpoints do pátio e é entregue com histórico — e que ocorrências e devoluções devolvem o pedido à fila sem duplicar saldo.',
    prerequisitos: [
      { t: 'Pedido de venda **faturado** (a opção "Liberar para Expedição" só aparece depois de faturar; a tela de carga só lista pedidos Faturados/Liberados).', s: 'v', campo: 'Nº do pedido' },
      { t: 'Cadastros da frota em `Expedição > Cadastros`: **veículo** (peso e volume), **motorista com CNH válida** (CNH vencida exige justificativa para fechar a carga) e tipos de ocorrência.', s: 'v' },
      { t: 'Endereço de entrega no cadastro do cliente (aparece no resumo da carga) e, se a empresa usa, o gate de produção (a carga avisa "produção pendente" mesmo com a OP vinculada).', s: 'v' },
    ],
    fluxos: [
      {
        titulo: '1. Liberar e montar a carga', onde: 'menu `⋯ > Liberar para Expedição` do pedido e `Expedição > Montar Nova Carga`',
        passos: [
          { t: 'Liberar o pedido.', r: 'Mensagem "Pedido liberado para expedição"; status "Lib. Expedição".', s: 'v' },
          { t: 'Montar Nova Carga: marcar o pedido, escolher **veículo**, **Data prevista de saída** e **motorista**; **Montar Carga**.', r: 'O resumo mostra o peso/volume contra a capacidade do veículo. Carga "Em Montagem". Pode avisar "item sem ordem de produção vinculada".', s: 'v', campo: 'Nº da carga' },
          { t: '**Fechar Carga** (se o motorista estiver com CNH vencida, informar a justificativa).', r: 'Carga "Fechada"; a justificativa fica nas observações.', s: 'v' },
        ],
      },
      {
        titulo: '2. Checkpoints, rota e entrega', onde: 'detalhe da carga',
        passos: [
          { t: 'Apontar **Separação**, **Conferência** e **Carregamento** (bipar o volume ou confirmar).', r: 'Cada etapa mostra o progresso do volume; ao fim: "Todos os checkpoints concluídos! Carga pronta para sair".', s: 'v' },
          { t: '**Iniciar Rota** e confirmar a saída.', r: 'Carga "Em Rota"; os checkpoints ficam travados.', s: 'v' },
          { t: 'Em "Apontamentos do Motorista", **Entregue** com nome do recebedor (e motivo, se não há comprovante).', r: 'Carga e pedido "Entregue"; o Histórico da Carga mostra cada passo com autor e horário.', s: 'v' },
          { t: 'Conferir `Vendas > Demonstrativos > Carteira de Pedidos`.', r: 'O pedido passa por A expedir → Em carga → Expedido → Entregue, com o número da carga.', s: 'v' },
        ],
      },
      {
        titulo: '3. Ocorrência na rota', onde: '`Apontamentos do Motorista > Ocorrência` e `Expedição > Ocorrências`',
        passos: [
          { t: 'Em outra carga, registrar uma ocorrência de **Cliente Ausente** (não exige foto).', r: 'Aceita; fica no histórico da entrega.', s: 'd' },
          { t: 'Registrar **Mercadoria Avariada** sem foto e depois com foto.', r: 'Sem foto é recusado ("foto obrigatória"); com foto é aceito e a foto abre no ERP.', s: 'd' },
          { t: 'Registrar uma ocorrência **bloqueante**.', r: 'A entrega vira "com ocorrência" e o pedido volta para "Aguardando Re-Expedição".', s: 'd' },
          { t: 'Registrar **Entrega Parcial** (não bloqueante).', r: 'A entrega não volta para re-expedição.', s: 'd' },
          { t: 'Filtrar `Expedição > Ocorrências` por tipo e período e conferir o resumo por tipo.', r: 'Os números do resumo batem com a lista.', s: 'd' },
        ],
      },
      {
        titulo: '4. Devolução e re-expedição', onde: '`Expedição > Aguardando Re-Expedição` e `Expedição > Pendências de Estoque (Devolução)`',
        passos: [
          { t: 'Numa entrega com ocorrência bloqueante, usar **Confirmar devolução**.', r: 'A entrega passa a "Devolvida"; confirmar de novo não duplica pendência nem estorno.', s: 'd' },
          { t: 'Abrir `Pendências de Estoque (Devolução)` e o saldo do produto no Estoque.', r: 'Existe uma pendência por produto devolvido; o saldo **não subiu sozinho**.', s: 'd' },
          { t: 'Dar a entrada manual pelo Estoque e marcar a pendência como resolvida.', r: 'Ela sai da lista de pendentes e registra quem resolveu e quando; resolver duas vezes é recusado.', s: 'd' },
          { t: 'Remontar o pedido numa nova carga.', r: 'Os volumes da entrega anterior saem de circulação e o saldo por item não dobra.', s: 'd' },
        ],
      },
      {
        titulo: '5. Documentos e rastreamento', onde: 'botões do detalhe da carga',
        passos: [
          { t: 'Abrir **Romaneio**, **Romaneio de itens** e **Etiquetas** (prévia).', r: 'Romaneio: cliente, endereço, pedido, nota, volumes e totais; etiquetas = uma por volume ("volume 2 de 5"), com código de barras legível.', s: 'd' },
          { t: 'Gerar o **Link de rastreamento** (e-mail de teste) e revogá-lo em seguida.', r: 'O link aparece e some ao revogar.', s: 'd' },
          { t: 'Exportar a lista de cargas filtrada.', r: 'O arquivo tem exatamente as linhas filtradas na tela.', s: 'd' },
        ],
      },
    ],
    resultado: [
      { t: 'O pedido foi entregue e todo o caminho está no Histórico da Carga.', s: 'v' },
      { t: 'A ocorrência bloqueante devolveu o pedido à fila e a devolução gerou pendência de estoque sem mexer no saldo.', s: 'd' },
    ],
    atencao: [
      '**Liberar para Expedição** só aparece depois do pedido faturado, e o aviso da tela de carga não diz isso.',
      'Montar, fechar, **Iniciar Rota**, **Entregue** e **Cancelar Carga** alteram a operação real. O **Link de rastreamento** e os avisos podem chegar ao cliente.',
      'Confirmar a entrega pelo painel pede "motivo da confirmação sem comprovante": o normal é o motorista confirmar pelo app.',
      'A carga pode avisar "produção pendente"/"item sem ordem de produção vinculada" mesmo existindo OP: confira antes de carregar.',
      'A devolução **não** devolve o saldo ao estoque sozinha: depende de ação manual.',
    ],
    naoValidado: [AVISO_MANUAL, 'Ocorrências, devolução, re-expedição, app do motorista, roteirização e exportações ainda não foram executadas no sistema.'],
  },
];
