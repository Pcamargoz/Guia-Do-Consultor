# Fila de testes: etapas ainda sem "Verificado"

Gerado por `node scripts/lacunas-checklists.mjs` — 148 etapas em 21 checklists. `doc` = vem dos roteiros, `n/v` = não validado.
Ao validar uma etapa, mude `s` para `'v'` no arquivo de dados do checklist e rode `npm run checklists`. Regras e briefs em [README.md](README.md).

## Primeiros passos e navegação  `01-primeiros-passos-navegacao.html` — 1 etapa(s)

**5. Notificações, ajuda e preferências**
- [ ] (doc) Conhecer a Alumina (Ctrl+Alt+A), a assistente de IA: ela consulta dados e só executa ações depois de confirmação.

## Cadastros básicos  `02-cadastros-basicos.html` — 2 etapa(s)

**4. Consultar um produto** · Cadastros > Produtos
- [ ] (n/v) Abrir a lista de produtos e pesquisar por código ou descrição.

**5. Consultar um projeto/obra** · Cadastros > Projetos
- [ ] (n/v) Abrir a lista de projetos e localizar uma obra.

## CRM: leads e oportunidades  `03-crm-leads-oportunidades.html` — 3 etapa(s)

**Pré-requisitos**
- [ ] (doc) Autorização do supervisor para criar um lead de treino com o nome começando por "TESTE ESTAGIÁRIO".

**1. Preparar seus dados: cadastrar leads de treino** · botão Novo Lead
- [ ] (doc) Cadastrar um segundo lead de treino ("TESTE ESTAGIÁRIO - Maria 2") com outra Temperatura (ex.: Quente), repetindo os passos acima. → _Com dois leads de temperaturas diferentes, os filtros, o Kanban e o menu do lead têm o que mostrar._

**Resultado esperado**
- [ ] (doc) Meus dois leads de treino aparecem na lista e no Kanban, o primeiro na etapa para onde o movi.

## Compras: da necessidade ao pedido  `05-compras.html` — 1 etapa(s)

**1. Preparar seus dados: criar uma solicitação e um pedido de compra** · Cadastros > Participantes e Compras > Solicitações de Compra
- [ ] (doc) No menu ⋯ da solicitação, escolher Gerar Pedido de Compra (a cotação é opcional), conferir a Conta de Fluxo de Caixa sugerida e confirmar. → _PC "Em Aberto" e "Sem títulos"; um pedido por fornecedor._

## Serviços de campo  `09-servicos-campo.html` — 1 etapa(s)

**3. Consultar medições** · Serviços > Medições
- [ ] (n/v) Abrir uma medição e ver os vãos, fotos e histórico.

## Projetos e obras  `10-projetos-obras.html` — 7 etapa(s)

**Pré-requisitos**
- [ ] (doc) Checklists 04 e 09 concluídos.

**1. Preparar seus dados: ligar a sua obra ao seu pedido** · Vendas > Pedidos de Venda (pedido em aberto)
- [ ] (doc) Abrir o seu pedido de venda em aberto, escolher no campo Projeto a sua obra de treino e salvar. → _A coluna PROJETO da lista de pedidos passa a mostrar a obra. Pedido já entregue não tem "Editar": faça isto antes._

**3. Consultar a carteira de obras** · módulo Projetos
- [ ] (doc) Abrir a lista/dashboard de projetos e ver as obras que precisam de atenção.
- [ ] (doc) Abrir uma obra e ver cliente, responsável, endereços, estágios e etapas.

**4. Ler o painel financeiro da obra** · Financeiro > Painel Financeiro de Projetos
- [ ] (doc) Escolher a obra e ler receitas, custos e margem.
- [ ] (doc) Ler progresso e material: o que entrou, foi consumido e falta consumir.

**Resultado esperado**
- [ ] (doc) Encontro a obra de um pedido e sei onde ver seu resultado.

## Faturamento e Fiscal (consulta)  `12-faturamento-fiscal.html` — 2 etapa(s)

**3. Conhecer as ações de uma nota (sem executar)** · menu ... da linha
- [ ] (n/v) Usar só as opções de consulta (Ver Timeline, Preview da DANFE) quando o supervisor pedir.

**5. Saber onde ficam os cadastros fiscais** · módulo Fiscal
- [ ] (doc) Saber que NCM, CFOP, CST/CSOSN, CEST e Textos Fiscais são cadastros do Fiscal, mantidos com o contador.

## Financeiro (consulta)  `13-financeiro.html` — 7 etapa(s)

**Pré-requisitos**
- [ ] (doc) Checklists 04, 06 e 12 concluídos.

**3. Consultar títulos** · Financeiro > Contas a Receber e Contas a Pagar
- [ ] (n/v) Filtrar por vencimento e situação e abrir um título.
- [ ] (doc) Ver de qual pedido, nota ou recebimento o título veio.
- [ ] (n/v) Saber que "Pagamentos" é uma aba dentro de Contas a Pagar.

**4. Ler a visão de gestão**
- [ ] (doc) Abrir Fluxo de Caixa e DRE.
- [ ] (doc) Abrir Painel Financeiro de Projetos para ver o resultado por obra.

**Resultado esperado**
- [ ] (doc) Sei explicar de onde vem um título a receber (pedido/nota) e um título a pagar (recebimento de compra).

## Tarefas: quadros e cartões  `14-tarefas.html` — 9 etapa(s)

**Pré-requisitos**
- [ ] (doc) Saber qual quadro você vai usar (combine com o supervisor).

**1. Preparar seus dados: criar o seu primeiro cartão** · módulo Tarefas
- [ ] (doc) Criar um cartão "TESTE ESTAGIÁRIO - cartão 1", atribuir a você como responsável e definir um prazo. → _O cartão aparece em Minhas Tarefas._

**2. Achar suas tarefas**
- [ ] (doc) Abrir Minhas Tarefas e ver o que está atribuído a você.
- [ ] (doc) Abrir um quadro e alternar as visões: Kanban, lista, tabela, calendário e Gantt.

**3. Trabalhar num cartão**
- [ ] (doc) Abrir o cartão de treino que você criou no bloco 1 (se ainda não criou, crie agora no quadro combinado).
- [ ] (doc) Preencher responsável, prazo e prioridade; usar o checklist e os comentários do cartão.
- [ ] (doc) Mover o cartão entre as listas conforme o andamento.
- [ ] (doc) Arquivar o cartão de teste no fim.

**Resultado esperado**
- [ ] (doc) Meu cartão de teste aparece em Minhas Tarefas e na coluna certa do quadro.

## Visão do fluxo completo  `15-visao-fluxo-completo.html` — 7 etapa(s)

**Pré-requisitos**
- [ ] (doc) O seu pedido de treino (checklist 04), de preferência já faturado ou entregue; se o seu ainda não chegou lá, use um pedido indicado pelo supervisor como exemplo.

**1. Preparar seus dados: reunir os registros que você criou** · campos de registro dos checklists 03 a 13
- [ ] (doc) Anotar o lead que você criou (checklist 03) e o pedido de venda (checklist 04).
- [ ] (doc) Anotar o pedido de compra (05) e a nota de recebimento (06).
- [ ] (doc) Anotar o movimento de estoque (07), a OP (08) e a medição (09).
- [ ] (doc) Anotar a obra (10), a carga (11), a nota (12) e os títulos (13).

**4. Da nota ao resultado**
- [ ] (doc) Projetos: o painel financeiro da obra soma receitas e custos.

**Resultado esperado**
- [ ] (doc) Consigo mostrar, com as telas abertas, onde o pedido de exemplo aparece em cada módulo.

## Teste do fluxo completo: do pedido à gestão  `teste-fluxo-pedido-ate-gestao.html` — 4 etapa(s)

**7. Financeiro: títulos e baixa** · ⋯ > Gerar Títulos do pedido e Financeiro > Contas a Receber
- [ ] (n/v) Localizar os títulos em Contas a Receber e conferir valor e vencimento com a parcela do pedido.

**9. E-mails e limpeza**
- [ ] (n/v) Abrir a caixa de e-mail de teste e anotar quais etapas enviaram e-mail (nota, boleto, aviso de entrega, serviços).

**Resultado esperado**
- [ ] (doc) Cada módulo mostrou o reflexo da etapa anterior (pedido → medição → OP → nota → carga → títulos).
- [ ] (doc) Os valores conferem entre pedido, nota, títulos e painéis.

## Fluxo de suprimentos: da solicitação ao pagamento  `fluxo-01-suprimentos.html` — 1 etapa(s)

**3. Pedido de compra** · Gerar Pedido de Compra na comparação
- [ ] (doc) Se a alçada estiver ligada, aprovar em Compras > Aprovações.

## Fluxo comercial: do lead ao pedido de venda  `fluxo-03-comercial.html` — 1 etapa(s)

**5. Desconto e aprovação** · aba Itens da oportunidade
- [ ] (n/v) Aprovar em CRM > Vendas > Aprovações ou Vendas > Aprovações com outro usuário. → _Com o mesmo usuário nada aparece para aprovar (e nada avisa o vendedor)._

## Fluxo de estoque: movimento, transferência, reserva, inventário e empréstimo  `fluxo-04-estoque.html` — 15 etapa(s)

**Pré-requisitos**
- [ ] (doc) Dois usuários de teste para as regras de segregação: quem cria × quem confirma a transferência, e quem conta × quem audita/aprova o inventário.

**1. Movimento manual e estorno** · Estoque > Movimentos > + Novo Movimento
- [ ] (doc) Lançar um Ajuste positivo (sobra) e um Ajuste negativo (quebra/perda). → _Cada ajuste aparece no extrato com o sentido certo e o saldo acompanha._
- [ ] (doc) Tentar uma saída maior que o saldo, com a trava "bloquear saída sem saldo" ligada e depois desligada. → _Ligada: recusa. Desligada: passa e o saldo pode ficar negativo._
- [ ] (doc) Tentar um movimento com data em mês encerrado e em local congelado por inventário. → _Os dois são recusados com mensagem que explica a trava. Visto no teste: o local congelado por inventário recusou o movimento; o mês encerrado não foi testado._

**2. Transferência entre locais** · Estoque > Transferências
- [ ] (doc) Abrir o extrato dos dois locais. → _Saída na origem e entrada no destino, com o mesmo número TRF-. No teste havia um movimento único (000006) com origem e destino, e não duas linhas com o mesmo número._
- [ ] (doc) Tentar confirmar de novo e excluir a transferência já confirmada. → _As duas ações são recusadas ("só rascunho pode ser confirmado"). Depois de confirmada, os botões Confirmar e Excluir somem: não há como tentar._

**3. Reserva e disponibilidade** · coluna Reservada do Saldo e aba Reservas do produto
- [ ] (doc) Com o produto sem reserva, comparar Saldo e Disponível. Depois criar uma reserva de 5 un. → _Saldo continua igual; reservado = 5; disponível = saldo − 5. No teste a reserva nasceu da transferência pendente; não há botão para reservar à mão._
- [ ] (doc) Conferir que a reserva é por variação física (cor e medidas) e por local. → _O disponível de outra cor ou de outro local não muda._
- [ ] (doc) Liberar a reserva; criar outra e consumi-la parcialmente (ex.: 3 de 5) e depois o restante. → _Liberar devolve o disponível; consumir baixa o estoque e reduz o pendente; consumir mais que o pendente é recusado._

**4. Inventário (contagem física)** · Estoque > Inventário e Estoque > Aprovações > Inventários
- [ ] (doc) Com outra pessoa, auditar os itens que divergiram nas três contagens (quantidade final e justificativa). → _O mesmo usuário da contagem é impedido ou avisado; a justificativa tem mínimo de caracteres. Precisa de um segundo usuário; no teste só havia um._
- [ ] (doc) Revisar o resumo e informar o custo das entradas pendentes (sobras e itens avulsos); aprovar. → _Cada diferença vira um ajuste de estoque com origem "inventário"; o saldo bate com a contagem e o local é descongelado. No inventário Simples o botão Aprovar ficou desabilitado: a regra de separação vale até para Super Usuário._

**6. Reposição e balanço final** · Estoque > Reposição e Compras > Sugestão de Compra
- [ ] (doc) Filtrar saldos com reserva maior que zero e abrir o detalhe de cada um. → _Toda quantidade reservada tem um documento pendente correspondente (nenhuma reserva órfã)._

**Resultado esperado**
- [ ] (doc) Cada operação mudou saldo, reservado e disponível exatamente como o roteiro descreve.
- [ ] (doc) As travas (saldo, reserva, inventário, mês encerrado) recusaram o que deviam, com mensagem clara.
- [ ] (doc) O balanço do produto fechou em quantidade e valor e não sobraram reservas órfãs.

## Fluxo de produção: estrutura, ordem, apontamento e entrada do produto acabado  `fluxo-05-producao.html` — 11 etapa(s)

**Pré-requisitos**
- [ ] (doc) Etapas, processo e linha de produção cadastrados (Produção > Configurações): ex.: Corte, Usinagem e Montagem com custo/hora; processo "Janela padrão" com as 3 etapas na ordem.

**1. Cadastros-base e estrutura** · Produção > Configurações > Etapas / Processos / Linhas / Estrutura de produto
- [ ] (doc) Criar 3 etapas com custo/hora diferentes e um processo com elas em ordem e tempo padrão. → _A lista do processo mostra a soma do tempo total._
- [ ] (doc) Tentar uma segunda estrutura para o mesmo produto com período sobreposto. → _É impedido com mensagem clara._
- [ ] (doc) Abrir o calendário de produção e conferir os feriados nacionais; cadastrar um feriado da empresa. → _Só os feriados do tipo Empresa podem ser removidos._

**2. Ordem de produção** · Produção > Ordens de produção > Nova OP
- [ ] (doc) Reimportar da estrutura numa OP que já tem item manual. → _Os itens de origem Estrutura são refeitos sem duplicar; os manuais ficam. Visto: as requisições já nascem ao salvar a OP, e reimportar não duplica; o caso com item manual não foi testado._
- [ ] (doc) Tentar criar requisição numa OP já Produzida ou Cancelada. → _Nenhuma das duas aceita._

**4. Apontamento** · botão ▶ da linha da OP e Mais ações > Apontamentos
- [ ] (doc) Com o apontamento em aberto, tentar iniciar outro para o mesmo funcionário na mesma OP. → _É impedido._
- [ ] (doc) Submeter e aprovar o apontamento com quem tem permissão; rejeitar outro com motivo. → _Aprovar acumula as horas reais e dispara a baixa de materiais; rejeitar volta a rascunho._
- [ ] (doc) Reabrir um apontamento encerrado há pouco. → _Exige motivo; estorna horas, custo e baixa. Depois de 24 h o apontamento fica travado (🔒)._

**6. Separação de materiais e painéis** · Produção > Separação de materiais e Produção > Painel de fábrica
- [ ] (doc) Registrar falta com motivo do catálogo e reverter. → _Falta sem motivo é recusada; a reversão preserva o histórico. Visto: a falta foi registrada, mas o motivo já vem preenchido (não dá para testar falta sem motivo) e não há ação de reverter._

**Resultado esperado**
- [ ] (doc) O apontamento acumulou horas e o custo real da OP é mão de obra + materiais.

## Fluxo de expedição: da carga à entrega, ocorrência e devolução  `fluxo-06-expedicao.html` — 13 etapa(s)

**3. Ocorrência na rota** · Apontamentos do Motorista > Ocorrência e Expedição > Ocorrências
- [ ] (doc) Em outra carga, registrar uma ocorrência de Cliente Ausente (não exige foto). → _Aceita; fica no histórico da entrega._
- [ ] (doc) Registrar Mercadoria Avariada sem foto e depois com foto. → _Sem foto é recusado ("foto obrigatória"); com foto é aceito e a foto abre no ERP._
- [ ] (doc) Registrar uma ocorrência bloqueante. → _A entrega vira "com ocorrência" e o pedido volta para "Aguardando Re-Expedição"._
- [ ] (doc) Registrar Entrega Parcial (não bloqueante). → _A entrega não volta para re-expedição._
- [ ] (doc) Filtrar Expedição > Ocorrências por tipo e período e conferir o resumo por tipo. → _Os números do resumo batem com a lista._

**4. Devolução e re-expedição** · Expedição > Aguardando Re-Expedição e Expedição > Pendências de Estoque (Devolução)
- [ ] (doc) Numa entrega com ocorrência bloqueante, usar Confirmar devolução. → _A entrega passa a "Devolvida"; confirmar de novo não duplica pendência nem estorno._
- [ ] (doc) Abrir Pendências de Estoque (Devolução) e o saldo do produto no Estoque. → _Existe uma pendência por produto devolvido; o saldo não subiu sozinho._
- [ ] (doc) Dar a entrada manual pelo Estoque e marcar a pendência como resolvida. → _Ela sai da lista de pendentes e registra quem resolveu e quando; resolver duas vezes é recusado._
- [ ] (doc) Remontar o pedido numa nova carga. → _Os volumes da entrega anterior saem de circulação e o saldo por item não dobra._

**5. Documentos e rastreamento** · botões do detalhe da carga
- [ ] (doc) Abrir Romaneio, Romaneio de itens e Etiquetas (prévia). → _Romaneio: cliente, endereço, pedido, nota, volumes e totais; etiquetas = uma por volume ("volume 2 de 5"), com código de barras legível._
- [ ] (doc) Gerar o Link de rastreamento (e-mail de teste) e revogá-lo em seguida. → _O link aparece e some ao revogar._
- [ ] (doc) Exportar a lista de cargas filtrada. → _O arquivo tem exatamente as linhas filtradas na tela._

**Resultado esperado**
- [ ] (doc) A ocorrência bloqueante devolveu o pedido à fila e a devolução gerou pendência de estoque sem mexer no saldo.

## Fluxo de faturamento e fiscal: do pedido à nota finalizada  `fluxo-07-faturamento-fiscal.html` — 7 etapa(s)

**Pré-requisitos**
- [ ] (doc) Certificado digital válido e CFOP/Textos fiscais definidos pelo contador (só leitura para quem não é do fiscal).

**4. Decisões do responsável fiscal (só com autorização)** · ações com efeito fiscal
- [ ] (n/v) Transmitir a nota (avião de papel) somente em homologação, com certificado válido e autorização do responsável fiscal. → _A nota recebe retorno de autorização/rejeição; acompanhe o status e o XML/DANFE._
- [ ] (n/v) Rejeição: ler o motivo, corrigir a nota (ou o cadastro fiscal) e retransmitir.
- [ ] (n/v) Carta de correção e cancelamento de uma nota autorizada de teste. → _Não aparecem no menu de uma nota "Em Aberto": só depois da autorização._
- [ ] (n/v) Inutilização de numeração (Faturamento > Configurações > Inutilização de Numeração).

**5. Cadastros fiscais (leitura)** · módulo Fiscal e Faturamento > Configurações
- [ ] (doc) Percorrer NCM, CFOP, CST/CSOSN, CEST e Textos Fiscais só lendo. → _São mantidos com o contador; alterar afeta todas as notas._
- [ ] (n/v) Abrir Painel Fiscal, Diagnóstico e Onboarding Fiscal.

## Fluxo financeiro: títulos, baixa, saldos e fluxo de caixa  `fluxo-08-financeiro.html` — 1 etapa(s)

**5. Configurações (leitura)** · Financeiro > Configurações
- [ ] (doc) Ler Contas Bancárias, Meios de Pagamento, Planos de Conta, Portadores, Instruções Bancárias e Boleto sem alterar. → _São configurações da empresa inteira: mexer afeta notas, boletos e fluxo de caixa._

## Fluxo de projetos e obras: cadastro, estágios, painéis e diário  `fluxo-09-projetos-obra.html` — 17 etapa(s)

**Pré-requisitos**
- [ ] (doc) Cliente de teste e permissão para criar projetos, estágios e etapas.

**1. Cadastrar a obra** · Cadastros > Projetos > Novo Projeto
- [ ] (doc) Tentar salvar sem nome e com data de fim anterior à de início. → _Os dois são recusados sem perder o que foi digitado._
- [ ] (doc) Acrescentar o resultado previsto (linhas de receita e despesa com categoria e conta), salvar e reabrir. → _Valores e classificações voltam iguais; editar uma linha não a recria._
- [ ] (doc) Comparar Todos os Projetos (cartões e indicadores) com a lista de gestão. → _Os números do topo batem com a contagem filtrada; a gestão mostra obras ativas e inativas, os seletores só as ativas._

**2. Estágios e etapas** · ações da linha do projeto: Estágios e Etapas
- [ ] (doc) Criar três estágios com peso (ex.: 20, 30, 50) e reordená-los. → _A nova ordem persiste; ao marcar "feito" a data de conclusão é preenchida e ao reabrir é limpa._
- [ ] (doc) Criar etapas dentro dos estágios. → _Entram no fim da lista, com a ordem correta._
- [ ] (doc) Em Solicitações de Compra e Ordens de Produção, escolher a obra e usar a cascata Estágio → Etapa. → _O estágio só habilita depois da obra, a etapa só depois do estágio; trocar a obra limpa os dois filtros._
- [ ] (doc) Tentar excluir um estágio ou etapa com solicitação de compra, OP ou transferência vinculada. → _É recusado listando o que trava._

**3. Ligar a obra aos documentos** · campo Projeto dos documentos
- [ ] (doc) Criar medição, OP, solicitação de compra e nota com a mesma obra. → _Cada documento aparece nas abas da obra (Produção, Campo, Compras) e nas listas filtradas por Projeto._

**4. Painéis da obra** · Financeiro > Painel Financeiro de Projetos (/projetos/painel) e módulo Projetos
- [ ] (doc) Ler pendências, avisos inteligentes e o andamento (Venda, Faturamento, Recebido, Campo/Entrega). → _Títulos vencidos abrem o título específico; pendências somem após a baixa. Obra saudável não mostra aviso alarmista._
- [ ] (doc) Abrir Progresso da Obra e Material, Plano de Resultado (previsto × realizado) e Comparar Obras. → _Material mostra o que entrou, foi consumido e falta consumir; o plano compara por categoria e projeta estouro._
- [ ] (doc) Conferir a regra: custo = destinado/comprometido (não caixa) e receita = nota autorizada (não pedido). → _Diferenças entre o painel e o financeiro por causa dessa regra não são erro._

**5. Diário de obra e ciclo de vida** · Projetos > Diário de Obra e ações da linha
- [ ] (doc) Fazer uma postagem de teste no Diário de Obra e abri-la a partir de Serviços. → _O diário recebe também os serviços de campo da obra (só obras com projeto no pedido)._
- [ ] (doc) Inativar a obra e procurá-la nos seletores (pedido, títulos, OP, solicitação). → _Some de todos os seletores e de Todos os Projetos; os documentos já emitidos continuam apontando para ela. Reativar traz tudo de volta._
- [ ] (doc) Tentar excluir uma obra com documentos e depois uma sem nenhum. → _A primeira recusa listando os vínculos; a segunda exclui e leva junto endereços, estágios, etapas e resultado previsto._

**Resultado esperado**
- [ ] (doc) A obra de teste recebeu pedido, medição, OP, compra e nota, e as abas e filtros mostram esses documentos.
- [ ] (doc) O Painel Financeiro, o progresso e o plano de resultado mostram números coerentes com os documentos.

## Fluxo de tarefas: quadro, cartão, regras e colaboração  `fluxo-10-tarefas.html` — 24 etapa(s)

**Pré-requisitos**
- [ ] (doc) Usuários de teste: gestor, executor e observador (cada um com uma permissão diferente) e uma segunda sessão para ver a atualização em tempo real.
- [ ] (doc) Licença do módulo Tarefas (e plano PRO, se anexos, automações ou Gantt dependerem dele).
- [ ] (doc) Quadro de teste com listas Backlog, Em andamento, Revisão e Concluído, algumas etiquetas e tarefas com e sem prazo.

**1. Quadros e listas** · Tarefas > Meus Quadros
- [ ] (doc) Criar um quadro em branco com nome e descrição (e, depois, um vinculado a um projeto). → _Nome vazio ou só espaços é recusado; cliques repetidos não duplicam._
- [ ] (doc) Criar as listas, renomear e reordenar por arrastar; recarregar. → _A ordem final é a mesma em outra sessão._
- [ ] (doc) Tentar excluir uma lista com cartões e depois uma vazia. → _A com cartões é bloqueada ou exige transferência; a vazia some._
- [ ] (doc) Arquivar e restaurar um quadro; conferir o quadro padrão de tarefas avulsas. → _O padrão não pode ser renomeado nem arquivado._

**2. Limite de trabalho (WIP)** · configuração da lista Em andamento
- [ ] (doc) Definir WIP = 2 na lista Em andamento e tentar mover um terceiro cartão para ela. → _O limite aparece na lista e o terceiro movimento é bloqueado com mensagem clara; o cartão não some._
- [ ] (doc) Liberar uma vaga e mover de novo; digitar 0, negativo, decimal e texto no campo. → _O terceiro entra depois da vaga; valores inválidos são recusados._
- [ ] (doc) Tentar estourar o WIP por arrastar, pelo menu Mover, pelo detalhe e por ação em lote. → _Nenhuma rota contorna o limite._

**3. Cartão e status** · detalhe da tarefa
- [ ] (doc) Criar uma tarefa com título, descrição, prioridade, início, prazo, horas, responsáveis e etiquetas. → _Título vazio, datas invertidas e horas negativas são recusados. Datas próximas da meia-noite ficam no dia escolhido._
- [ ] (doc) Percorrer Pendente → Em andamento → Em revisão → Concluída e reabrir. → _A data de conclusão é preenchida ao concluir e retirada ao reabrir; o histórico registra cada transição._
- [ ] (doc) Cancelar uma tarefa e tentar reabri-la. → _"Cancelada" é terminal: a reabertura é impedida._
- [ ] (doc) Tentar concluir uma tarefa com predecessora aberta e uma tarefa-pai com subtarefa aberta. → _A conclusão é impedida e o sistema diz qual dependência falta; a mesma regra vale em Kanban, lista, tabela e detalhe._

**4. Colaboração** · abas do detalhe da tarefa
- [ ] (doc) Publicar um comentário simples e outro com @menção. → _A pessoa mencionada é notificada uma única vez; o autor não recebe a própria notificação. Menção de usuário de outra empresa é recusada._
- [ ] (doc) Criar dois checklists, marcar itens e excluir um item. → _O percentual atualiza na hora; um checklist não afeta o vizinho._
- [ ] (doc) Anexar um arquivo válido e tentar um acima de 10 MB e um executável. → _Os dois últimos são recusados; arquivo em análise não pode ser baixado._
- [ ] (doc) Duplicar a tarefa (duplo clique no botão) e arquivá-la. → _A cópia vem "(cópia)" em Pendente, sem comentários nem anexos; o duplo clique não cria duas; a arquivada abre só para leitura._

**5. Visões, vínculos e automação** · Tarefas e roteiros 03, 06, 07 e 09 do plano de QA
- [ ] (doc) Alternar as visões do quadro (Kanban, lista, tabela, calendário e Gantt) e aplicar filtros. → _O mesmo cartão mostra a mesma informação em todas as visões; com filtro ativo, reordenar é bloqueado._
- [ ] (n/v) Vincular uma tarefa a um Pedido de Venda, a um registro do CRM e a um Projeto. → _O vínculo leva ao registro certo; o ERP de outra empresa não é aceito._
- [ ] (n/v) Criar uma recorrência e uma automação de teste (notificação) e conferir o disparo. → _A ação acontece uma única vez, no horário correto, e só para os destinatários da empresa._
- [ ] (n/v) Conferir Minhas Tarefas, o dashboard e a exportação. → _Mostram o mesmo total do quadro._

**Resultado esperado**
- [ ] (doc) O quadro respeitou lista, WIP, status e dependência em todas as telas.
- [ ] (doc) Comentário, menção, checklist e anexo funcionaram sem duplicar nem vazar entre empresas.

## Onboarding do estagiário  `00-onboarding-estagiario.html` — 14 etapa(s)

**Antes do primeiro dia**
- [ ] (doc) Receber usuário e senha pessoais do sistema (não use o login de outra pessoa).
- [ ] (doc) Combinar com o supervisor quais módulos fazem parte da sua rotina e qual perfil de acesso você terá.

**Antes de começar — Por que a sua conta vem zerada**
- [ ] (doc) Entender a ordem: o que você criar no checklist 02 (cliente, produto, obra) é usado no 04 (pedido), que alimenta 05 a 13. Por isso a trilha segue a numeração.
- [ ] (doc) Dar o nome TESTE ESTAGIÁRIO - … a tudo o que você criar e anotar o número de cada registro nos campos dos checklists: o checklist 15 reúne todos.
- [ ] (doc) Se um botão não aparecer ou o sistema negar permissão, anotar em Problema e avisar o supervisor: pode ser permissão do seu perfil ou cadastro-base faltando.

**Semana 1 — Navegação e cadastros**
- [ ] (doc) Concluir o checklist 02 · Cadastros básicos (participantes, produtos e projetos).
- [ ] (doc) Anotar no campo de dúvidas tudo que não ficou claro e revisar com o supervisor no fim da semana.

**Semana 2 — O lado comercial**
- [ ] (doc) Concluir 03 · CRM e 04 · Vendas.
- [ ] (doc) Concluir 15 · Visão do fluxo completo para entender para onde o pedido vai depois.

**Semana 3 — Suprimentos e operação**
- [ ] (doc) Concluir 05 · Compras, 06 · Recebimento e 07 · Estoque.
- [ ] (doc) Concluir 08 · Produção, 09 · Serviços e 11 · Expedição.

**Semana 4 — Gestão**
- [ ] (doc) Concluir 10 · Projetos e obras, 12 · Faturamento e Fiscal e 13 · Financeiro.
- [ ] (doc) Concluir 14 · Tarefas e combinar com o supervisor um quadro para acompanhar suas atividades.
- [ ] (doc) Explicar ao supervisor, com as telas abertas, o caminho de um pedido real: CRM → Vendas → operação → Faturamento → Financeiro. → _Você consegue mostrar onde cada etapa aparece no sistema._
