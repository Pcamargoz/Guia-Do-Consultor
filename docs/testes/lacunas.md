# Fila de testes: etapas ainda sem "Verificado"

Gerado por `node scripts/lacunas-checklists.mjs` — 455 etapas em 27 checklists. `doc` = vem dos roteiros, `n/v` = não validado.
Ao validar uma etapa, mude `s` para `'v'` no arquivo de dados do checklist e rode `npm run checklists`. Regras e briefs em [README.md](README.md).

## Primeiros passos e navegação  `01-primeiros-passos-navegacao.html` — 1 etapa(s)

**5. Notificações, ajuda e preferências**
- [ ] (doc) Conhecer a Alumina (Ctrl+Alt+A), a assistente de IA: ela consulta dados e só executa ações depois de confirmação.

## Cadastros básicos  `02-cadastros-basicos.html` — 2 etapa(s)

**4. Consultar um produto** · Cadastros > Produtos
- [ ] (n/v) Abrir a lista de produtos e pesquisar por código ou descrição.

**5. Consultar um projeto/obra** · Cadastros > Projetos
- [ ] (n/v) Abrir a lista de projetos e localizar uma obra.

## CRM: leads e oportunidades  `03-crm-leads-oportunidades.html` — 2 etapa(s)

**Pré-requisitos**
- [ ] (doc) Autorização do supervisor para criar um lead de treino com o nome começando por "TESTE ESTAGIÁRIO".

**Resultado esperado**
- [ ] (doc) Meus dois leads de treino aparecem na lista e no Kanban, o primeiro na etapa para onde o movi.

## Serviços de campo  `09-servicos-campo.html` — 1 etapa(s)

**3. Consultar medições** · Serviços > Medições
- [ ] (n/v) Abrir uma medição e ver os vãos, fotos e histórico.

## Projetos e obras  `10-projetos-obras.html` — 6 etapa(s)

**Pré-requisitos**
- [ ] (doc) Checklists 04 e 09 concluídos.

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

## Tarefas: quadros e cartões  `14-tarefas.html` — 4 etapa(s)

**Pré-requisitos**
- [ ] (doc) Saber qual quadro você vai usar (combine com o supervisor).

**2. Achar suas tarefas**
- [ ] (doc) Abrir um quadro e alternar as visões: Kanban, lista, tabela, calendário e Gantt.

**3. Trabalhar num cartão**
- [ ] (doc) Abrir o cartão de treino que você criou no bloco 1 (se ainda não criou, crie agora no quadro combinado).

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

## Fluxo principal de Vendas: do pedido à operação  `fluxo-principal-vendas.html` — 5 etapa(s)

**Pré-requisitos**
- [ ] (doc) Cliente, produto e obra de treino do checklist 02, e um Vendedor e uma Condição de Pagamento cadastrados pelo consultor.

**3. Aprovações** · Vendas > Aprovações
- [ ] (doc) Saber que um desconto acima da faixa de alçada pede a aprovação de outro usuário (Supervisor de Vendas ou Gerente Geral). Nunca aprove o seu próprio. → _O desconto do item é o campo Desconto, em R$; no Resumo aparece como "Descontos − R$ …" e reduz o Total. Vendas > Aprovações não tem abas: colunas DOCUMENTO, SOLICITANTE, VALOR, TIPO, ESPERA e AÇÕES, e a lista estava vazia. A mensagem de desconto acima da faixa não foi vista, porque a única faixa (nível 1, "A partir de 5%") está Inativa._

**4. O menu de ações e os status** · menu ⋯ do pedido
- [ ] (doc) Baixar o PDF do pedido e conferir cliente, itens e total.
- [ ] (doc) Saber o que não usar em treino: Encerrar, Cancelar, Excluir e Dividir em partes alteram o pedido sem desfazer.

**Resultado esperado**
- [ ] (doc) Tenho um pedido de treino em aberto com cliente, item, parcelas e obra, e sei dizer em que status ele está e o que o próximo botão faz.

## Fluxo principal de Faturamento: do pedido à nota finalizada  `fluxo-principal-faturamento.html` — 1 etapa(s)

**6. O que fica com o responsável fiscal** · módulo Fiscal e Faturamento > Configurações (só leitura)
- [ ] (n/v) Saber que Transmitir, Carta de correção, Cancelar e Inutilizar numeração são decisões do responsável fiscal, só em homologação e com certificado válido. → _Carta de correção e cancelamento só aparecem depois da autorização da nota._

## Implantação da Fundação: roteiro prático com o cliente  `implantacao-01-fundacao.html` — 39 etapa(s)

**Pré-requisitos**
- [ ] (doc) O cliente entregou com antecedência: cartão CNPJ, CNAE, IE, IM e regime de cada empresa (conferidos com o contador), o certificado digital A1 de cada CNPJ emitente, a série e o número da última NF-e, a lista de usuários com e-mail exclusivo e função, e as bases de clientes, fornecedores e produtos. → _Confira: a lista de documentos pedida antes do kickoff. Fonte: Fundação C, pré-requisitos do cliente._
- [ ] (doc) A versão contratada aceita o regime de todas as empresas e cabe o número de empresas e de usuários previstos. → _Confira: em Minha Assinatura. Lucro Presumido, Lucro Real e excesso de sublimite não gravam nas versões Starter e Standard; convite pendente ocupa vaga. Fonte: CAD-EMP-005, CAD-EMP-019; Fundação D, seção 1._
- [ ] (doc) A licença e os módulos foram liberados pela Faktory e o administrador do cliente consegue entrar. → _Confira: os módulos contratados aparecem sem cadeado no menu. Módulo fora do plano responde “Módulo não contratado” e se resolve no comercial. Fonte: Fundação C, pré-requisitos técnicos; Fundação D, seção 1._
- [ ] (doc) Decisão tomada com o cliente: como ele vende cada tipo de material (por unidade, por peso ou por área). → _Confira: a resposta anotada na ata do kickoff. É a decisão que define o “Preço calculado por” de cada categoria. Fonte: Fundação C, questionário P1; CAD-PRO-020, CAD-CAT-001._

**1. Empresa e regime** · Minha Assinatura e Configurações > Empresas
- [ ] (doc) Faça: abra Minha Assinatura com o administrador do cliente e leia a versão, o limite de empresas, o limite de usuários e os módulos contratados. → _Explique ao cliente: a licença limita empresas, usuários e regimes; estourar o limite trava o cadastro no meio da implantação. Confira: os números batem com o que foi vendido. Fonte: Fundação C, pré-requisitos comerciais; CAD-EMP-019._
- [ ] (doc) Faça: abra a empresa criada no registro da conta e confira CNPJ, razão social, CNAE, regime de apuração e endereço completo contra o cartão CNPJ. Corrija o CNAE e preencha o regime. → _Explique ao cliente: a primeira empresa nasce com CNAE fixo e sem regime; o regime define o cálculo de impostos em todo o sistema. O CNPJ não muda depois de salvo. Confira: a empresa salva sem o aviso “Cadastro da empresa incompleto”. Fonte: Fundação C, etapa 1; CAD-EMP-001, CAD-EMP-003, CAD-EMP-011._
- [ ] (doc) Faça: preencha a IE e, se a empresa emite NFS-e no modelo tradicional, a Inscrição Municipal. Se o cliente quiser, envie o logo e a cor da marca. → _Explique ao cliente: a Inscrição Municipal é obrigatória para a NFS-e tradicional; o logo sai na nota. Confira: os campos salvos na empresa. Fonte: Fundação C, etapa 1; CAD-EMP-002, CAD-EMP-013._
- [ ] (doc) Faça: cadastre as filiais (ou as outras empresas do grupo) com os mesmos cuidados. → _Explique ao cliente: todo usuário vê todas as empresas; não há restrição por filial. Confira: cada empresa ativa aparece na lista e cabe no limite da versão. CNPJ “já cadastrado em outro tenant” indica a empresa em outra conta do Flow: acione o suporte. Fonte: Fundação C, etapa 1 e questionário E5; CAD-EMP-004, CAD-EMP-008._

**2. Certificado digital, série e homologação** · Faturamento > Configurações > Certificados
- [ ] (doc) Faça: envie o arquivo .pfx do certificado A1 de cada empresa e peça ao cliente para digitar a senha quando a tela pedir. → _Explique ao cliente: o certificado assina as notas; o sistema avisa o vencimento a partir de 30 dias. A senha é do cliente: o consultor não digita nem guarda. Confira: a situação e a validade do certificado na tela; anote o vencimento na ata. Certificado vencido ou senha errada são recusados. Fonte: Fundação C, etapa 2; Fundação D, seção 3; CAD-EMP-006._
- [ ] (doc) Faça: abra “Configurar Série NF-e” na mesma tela e informe a série e o próximo número, continuando a numeração do sistema antigo. → _Explique ao cliente: o número da nota é dado ao transmitir e nunca volta; por isso a série precisa estar certa antes da primeira transmissão. Confira: a série gravada. Série repetida responde “Já existe uma série X para esta empresa no ambiente Y”: edite a existente. Fonte: Fundação C, etapa 2; CAD-EMP-006; README da cadeia comercial, decisão X5._
- [ ] (doc) Faça: confirme que o ambiente da empresa está em homologação. → _Explique ao cliente: em homologação a nota vale só para teste; a virada para produção é combinada no fim da cadeia comercial. Confira: o ambiente na tela de Certificados ou de Empresas. Fonte: Fundação C, etapa 2; Fundação D, seção 3._
- [ ] (doc) Faça: sincronize o emitente com o provedor de emissão pela opção da própria tela de certificados. → _Explique ao cliente: a sincronização leva os dados da empresa ao provedor que transmite as notas. Confira: a resposta sem aviso pendente; se faltar dado da NFS-e, a resposta avisa e a NFS-e fica de fora. Fonte: Fundação C, etapa 2; Fundação D, seção 3._

**3. Perfis e usuários** · Segurança > Perfis de Acesso e Segurança > Usuários
- [ ] (doc) Faça: abra Segurança > Perfis de Acesso e mostre os perfis prontos; escolha com o cliente o perfil de cada função da lista de usuários. → _Explique ao cliente: o sistema já traz 32 perfis; crie perfil novo só se nenhum servir. Quem cancela nota precisa de um perfil fiscal com essa permissão (o Faturista emite, mas não cancela). Confira: cada função da lista tem um perfil escolhido. Fonte: Fundação C, etapa 3; README da cadeia comercial, decisão X8._
- [ ] (doc) Faça: em Segurança > Usuários, clique em “Convidar Usuário” e convide cada pessoa já com o perfil. → _Explique ao cliente: o e-mail é único em todo o Flow; só administrador convida administrador. Confira: o usuário na lista com o perfil. Fonte: Fundação C, etapa 3._
- [ ] (doc) Faça: (bloqueio de propósito) tente convidar um usuário com um e-mail que já existe no Flow. → _Explique ao cliente: cada pessoa precisa de e-mail próprio, mesmo que use o Flow em outra empresa. Confira: o sistema recusa com “Email já está em uso” (ou “Este email já está cadastrado no sistema”). Fonte: Fundação C, questionário U2 e erros comuns._
- [ ] (doc) Faça: confira na lista que todo usuário ativo tem perfil e cancele os convites pendentes que não serão usados. Peça a um usuário de cada perfil para entrar e navegar. → _Explique ao cliente: usuário sem perfil entra e não vê nada; convite pendente ocupa vaga na licença (“Limite de usuários atingido”). Confira: cada perfil vê o que deve e não vê o resto; anote por perfil. Fonte: Fundação C, etapa 3; Fundação D, seção 4._

**4. Participantes: clientes, fornecedores e vendedores** · Cadastros > Participantes
- [ ] (doc) Faça: (bloqueio de propósito) tente salvar outro participante com o mesmo CPF/CNPJ. → _Explique ao cliente: o sistema não aceita documento duplicado; antes de criar, pesquise. Por isso a base precisa ser limpa antes da carga. Confira: a recusa “CNPJ/CPF … já está cadastrado” (ou “possui cadastro inativo”: reative o existente). Fonte: Fundação C, erros comuns; CAD-PAR-006; trilha do estagiário 02, bloco 1._
- [ ] (doc) Faça: cadastre um vendedor (participante com É Vendedor?) e ligue-o ao usuário dele. → _Explique ao cliente: a ligação entre vendedor e usuário é de um para um e é usada no pedido e na comissão. Confira: o vendedor aparece para escolha no pedido de venda (bloco 9). Fonte: Fundação C, questionário U3; CAD-PAR-012; Fundação D, seção 8._

**5. Categorias, unidades, NCM, cores e produtos** · grupo Configurações do módulo (Categorias de Produto, Unidade de Medida, Cores), Fiscal > Configurações > NCM e Cadastros > Produtos
- [ ] (doc) Faça: abra Categorias de Produto e revise com o cliente as categorias de fábrica; crie as que faltarem com o tipo e o Preço calculado por (unidade, peso ou área) decididos no kickoff. → _Explique ao cliente: perfil costuma ser por peso e vidro por área; o tipo da categoria fica travado depois que algum produto tem saldo (“Não é possível trocar o tipo desta categoria…”). Confira: a lista de categorias aprovada pelo cliente. Fonte: Fundação C, etapa 4.1; CAD-CAT-001, CAD-CAT-002, CAD-CAT-004._
- [ ] (doc) Faça: abra Unidade de Medida, confira as unidades de fábrica e crie só as que faltam, com sigla de até 6 letras. → _Explique ao cliente: a sigla do produto precisa existir igual na empresa (“PÇ” é diferente de “PC”); senão o pedido falha ao salvar. Confira: nenhuma unidade em uso com sigla longa. Fonte: Fundação C, etapa 4.2; CAD-UNI-001; trilha do estagiário 02, bloco 1._
- [ ] (doc) Faça: em Fiscal > Configurações > NCM, cadastre os NCMs que o cliente usa e não estão na lista de fábrica. Se o cliente não integra com o CEM, cadastre as cores em Cores. → _Explique ao cliente: o NCM é obrigatório na nota e precisa ter o CST de PIS/COFINS de saída para os impostos saírem calculados. Quem integra com o CEM recebe as cores sozinho. Confira: os NCMs da base do cliente aparecem na lista. Fonte: Fundação C, etapas 4.3 e 4.5; Manual 01 Cadastros Base; procedimento Cadastrar cliente, produto e obra._
- [ ] (doc) Faça: (bloqueio de propósito) tente salvar um produto sem NCM ou sem categoria. → _Explique ao cliente: a planilha de carga aplica a mesma régua; por isso a base precisa ter NCM e categoria em todas as linhas. Confira: a recusa “NCM é obrigatório” ou “Categoria do produto é obrigatória”. Fonte: Fundação C, erros comuns; CAD-PRO-001, CAD-PRO-002._

**6. Condições e meios de pagamento, contas e portadores** · Vendas > Configurações > Condições de Pagamento e o grupo Configurações do Financeiro (Contas Bancárias, Portadores, Planos de Conta, Meios de Pagamento)
- [ ] (doc) Faça: em Condições de Pagamento, clique em + Nova Condição, informe a Descrição (ex.: “28/42/56 dias”), o Tipo A Prazo, use + Adicionar até ter as parcelas, informe os Dias e clique em Criar Condição de Pagamento. → _Explique ao cliente: cada parcela vira um título; os dias contam da emissão da nota. Confira: o selo Total em 100,00% e a mensagem “Condição de pagamento criada com sucesso!”. Sem 100% o sistema não grava. Fonte: Manual 01 Cadastros Base, 1.4; Fundação C, etapa 5.5._
- [ ] (doc) Faça: em Meios de Pagamento, mostre os meios de fábrica e o tipo de cada um que o cliente usa (Boleto ou outro). → _Explique ao cliente: meio do tipo Boleto exige conta bancária emissora de boletos ao gerar títulos; evite criar meio com tipo digitado livre. Confira: o tipo de cada meio que o cliente vai usar. Fonte: Fundação C, etapa 5.6; teste do fluxo completo, bloco 7._
- [ ] (doc) Faça: em Contas Bancárias, cadastre cada conta do cliente e marque a favorita para boleto, se ele emite boleto. → _Explique ao cliente: a conta bancária é obrigatória na baixa e a favorita é a emissora do boleto. Confira: as contas batem com o extrato do cliente. Fonte: Fundação C, etapa 5.2; FIN-CTA-001; Fundação D, seção 6._
- [ ] (doc) Faça: em Portadores, crie os bancos que recebem; em Planos de Conta, use o de fábrica ou monte o do contador. → _Explique ao cliente: o portador diz onde o dinheiro entra; o plano de contas classifica receitas e despesas e precisa do aval do contador. Confira: o plano aprovado pelo contador. Fonte: Fundação C, etapas 5.3 e 5.4; Fundação D, seção 6._

**7. CFOPs de saída** · Fiscal > Configurações > CFOP
- [ ] (doc) Faça: abra a lista de CFOPs e localize, com o contador, os de venda que o cliente usa (ex.: 5101 produto fabricado, 5102 revenda, 6101/6102 fora do estado). → _Explique ao cliente: não existe cadastro de natureza de operação; a natureza é a descrição do CFOP. Confira: os CFOPs usados estão ativos na lista. Fonte: Manual 03 Vendas, 1.2; README da cadeia comercial, decisão X1._
- [ ] (doc) Faça: confira em cada CFOP de saída se ele gera financeiro e movimenta estoque, conforme o contador. → _Explique ao cliente: CFOP de remessa marcado como gerador de financeiro obriga condição, plano e parcelas no pedido; o contrário deixa venda sem título. Confira: a decisão de cada CFOP anotada na ata. Fonte: Vendas C, etapa 1; VEN-PED-001; README da cadeia comercial, decisão X1._
- [ ] (doc) Faça: anote quais CFOPs serão o padrão do pedido de venda e da integração com o CEM. → _Explique ao cliente: esses padrões vão para os Padrões de Integração no módulo de integração. Confira: a lista anotada e entregue ao responsável fiscal. Fonte: Fundação C, etapa 6._

**8. Carga inicial de produtos e participantes** · listagem de Cadastros > Produtos e de Cadastros > Participantes, menu “Mais…”
- [ ] (doc) Faça: na listagem de Produtos, use “Mais…” › “Importar … via Excel” com a planilha preparada e rode a validação antes de executar. → _Explique ao cliente: a planilha aplica a mesma régua da tela; linha recusada mostra o motivo. Confira: a validação sem linhas recusadas, ou as recusas tratadas na origem. Fonte: Fundação C, etapa 7; Fundação D, seção 8._
- [ ] (doc) Faça: repita com os participantes (todas as linhas com papel, CPF/CNPJ válido, IE ou “Isento”, CEP e endereço) e depois com os contatos. → _Explique ao cliente: “Selecione pelo menos um papel para o participante…” e “Cadastro do participante incompleto — informe: …” são as recusas mais comuns. Confira: a quantidade importada igual à da base de origem. Fonte: Fundação C, etapa 7 e erros comuns; CAD-PAR-001, CAD-PAR-003._
- [ ] (doc) Faça: abra com o cliente uma amostra de 10 clientes e 10 produtos importados. → _Explique ao cliente: é a última chance de corrigir a base antes do primeiro pedido real. Confira: documento, endereço e contatos com marca de nota e boleto; categoria, NCM, unidade e preço dos produtos. Fonte: Fundação D, seção 8._

**9. Prova em uso real: obra e pedido de teste** · Cadastros > Projetos e Vendas > Pedidos de Venda > + Novo Pedido
- [ ] (doc) Faça: (bloqueio de propósito) num segundo pedido, use um produto cuja sigla de unidade não esteja cadastrada na empresa e tente salvar. → _Explique ao cliente: o erro só aparece no salvar; a correção é no cadastro de unidades, não no pedido. Confira: a recusa “Item N: Unidade de Medida … não está cadastrada para esta empresa”. Fonte: Vendas C, erros comuns; VEN-PED-006; teste do fluxo completo, pré-requisitos._

**Resultado esperado**
- [ ] (doc) Cada empresa salva sem aviso, com regime conferido pelo contador, certificado válido, série configurada e ambiente em homologação.
- [ ] (doc) Todos os usuários previstos entram com o perfil certo e não há convite pendente esquecido.
- [ ] (doc) Categorias aprovadas pelo cliente (tipo e Preço calculado por), unidades, NCMs, condições, meios, contas, portadores e plano de contas cadastrados.
- [ ] (doc) Carga de produtos e participantes com a quantidade igual à da origem e amostra conferida.
- [ ] (doc) Um pedido de teste salvo com o cliente, o produto, a obra, a condição e o CFOP do roteiro.
- [ ] (doc) O administrador do cliente cadastrou sozinho um participante e um produto.

## Implantação de CRM: roteiro prático com o cliente  `implantacao-02-crm.html` — 7 etapa(s)

**Pré-requisitos**
- [ ] (doc) Funil de Vendas com etapas conferidas e Funil de Leads cadastrados (sem o primeiro não existe Pipeline; sem o segundo não existe Kanban de Leads). Tipos de Atividade, Origens de Lead, Temperaturas e Motivos de Perda cadastrados. → _Confira: CRM > Configurações e remova etapas de teste esquecidas no fim do funil. Fonte: manual-02-crm, Parte 1; Fluxo comercial (pré-requisitos)._

**1. Cadastro do lead** · CRM > Vendas > Leads > Novo Lead
- [ ] (doc) Faça: abra Editar Lead e mostre a diferença entre as seções Dados CRM (Setor de Atuação, Linha Preferida, Tipo de Vidro Preferido…) e Informações CRM (origem, temperatura, responsável, Budget Estimado e BANT). → _Explique ao cliente: a qualificação mora em Informações CRM. Confira: na lista, a Temperatura gravada (hoje ela pode mudar sozinha e diferir da escolhida). Fonte: regra-crm-formulario-do-lead-secoes-e-campos; FAQ (CRM-5)._

**2. Qualificação: BANT e Kanban de Leads** · Editar Lead > Informações CRM e CRM > Vendas > Leads > Kanban de Leads
- [ ] (doc) Faça: na lista de leads, clique em ⋮ > Converter no lead recém-criado, ainda sem BANT. → _Explique ao cliente: o Flow só converte lead qualificado. Confira: o sistema bloqueia e avisa o que falta ("BANT incompleto"). Fonte: manual-02-crm, 2.2; regra-crm-converter-lead-exige-etapa-60-e-bant-completo._

**4. Oportunidade no Pipeline: itens, atividades e etapas** · CRM > Vendas > Pipeline > clique no card
- [ ] (doc) Faça: clique no card e percorra as abas do painel: Detalhes, Itens, Atividades e Histórico. → _Explique ao cliente: Detalhes traz cliente, valores, previsão, responsável e etapa; Histórico guarda cada mudança com data e usuário. Confira: as quatro abas da oportunidade de teste. Fonte: manual-02-crm, 2.3._
- [ ] (doc) Faça: na aba Atividades, clique em + Nova atividade, escolha uma ligação, preencha Tipo, Título, Cliente e Oportunidade vinculada e clique em Registrar atividade. → _Explique ao cliente: a atividade ligada à oportunidade alimenta a agenda do vendedor. Confira: a ligação na aba Atividades e em CRM > Vendas > Atividades. Fonte: manual-02-crm, 2.6._

**5. Ganhar (e perder) a oportunidade** · CRM > Vendas > Pipeline > painel da oportunidade ou ⋯ do card
- [ ] (doc) Faça: em CRM > Vendas > Pipeline, crie uma segunda oportunidade com + Nova Oportunidade para o cliente de teste, sem itens, e tente marcá-la como ganha. → _Explique ao cliente: só se ganha o que tem item, porque são os itens que viram o pedido. Confira: o aviso de que é preciso ao menos um item para ganhar. Fonte: manual-02-crm, 2.2 e 2.5._

**7. Resultado nos painéis do CRM** · CRM > Painéis, CRM > Visão Geral e Clientes > Visão 360°
- [ ] (doc) Faça: abra os Demonstrativos do CRM filtrando pelo vendedor responsável. → _Explique ao cliente: cada vendedor vê o próprio resultado. Confira: o ganho do teste no vendedor. Fonte: manual-02-crm, 2.10._

## Implantação da Integração CEM: roteiro prático com o cliente  `implantacao-03-integracao-cem.html` — 47 etapa(s)

**Pré-requisitos**
- [ ] (doc) Fundação concluída: empresa, CFOPs, plano de contas, condições de pagamento, categorias, NCMs e unidades cadastrados. → _Confira: o checklist da Fundação assinado. O pedido importado já precisa de condição de pagamento e plano de contas. Fonte: README da cadeia comercial, ordem de implantação; Integração B, fluxo de configuração._
- [ ] (doc) Decidido com o cliente: qual sistema de origem (CEM Desktop, CEM Mobi, PrefSuite ou arquivo), qual o modo do código dos produtos e se vai usar Faturamento em Nível. → _Confira: as decisões na ata. O sistema escolhido decide qual botão de importação aparece; o modo do código deve ser decidido antes da primeira obra. Fonte: README da cadeia comercial, decisões X3 e X4; INT-DSK-014._
- [ ] (doc) CEM Desktop: máquina Windows onde fica o banco do CEM, com acesso de administrador e o agente FaktoryFlow Agent instalado. → _Confira: o agente aberto mostrando o código de pareamento. Fonte: Integração C, etapa 2; Fundação C, etapa 6._
- [ ] (doc) Uma obra fechada no CEM, real e do cliente, escolhida para a importação de teste; clientes do CEM com CPF/CNPJ e cidade corretos. → _Confira: com o orçamentista do cliente. A integração só trabalha com obras fechadas; cidade e UF vêm só do CEM. Fonte: roteiro Vendas 01, localizar a obra; INT-GER-009, INT-GER-039._

**1. Escolher o sistema de integração** · Vendas > Configurações > Configurar integração
- [ ] (doc) Faça: abra Configurar integração com o administrador do cliente e escolha no seletor do topo o sistema dele: CEM Desktop, CEM Mobi, PrefSuite ou Arquivos. → _Explique ao cliente: sem escolha, vale Arquivos. Esta tela é só do administrador. Confira: o sistema selecionado ficou gravado. Fonte: Integração C, etapa 1; INT-CFG-001._
- [ ] (doc) Faça: abra Vendas > Pedidos de Venda e mostre o botão de importação que apareceu. → _Explique ao cliente: aparece um só botão, conforme o sistema: Importar CEM, Importar CEM Mobi, Importar PrefSuite ou Importar Arquivo. Confira: o botão certo na lista de pedidos. Fonte: Integração C, etapa 1; Manual 03 Vendas, 2.1._
- [ ] (doc) Faça: confira a empresa selecionada no alto da tela antes de seguir. → _Explique ao cliente: as configurações de integração valem para a empresa ativa. Confira: o nome da empresa no topo. Fonte: roteiro Vendas 06, abertura._

**2. Conectar o CEM (Desktop ou Mobi)** · Vendas > Configurações > Configurar integração (cards de pareamento ou Configuração CEM Mobi)
- [ ] (doc) Faça: (CEM Desktop) abra o agente na máquina do CEM, anote o código no formato XXX-XXX e, em até 10 minutos, digite em Código de pareamento e clique em Confirmar. → _Explique ao cliente: o agente precisa ficar ligado; sem ele nenhuma obra carrega. Confira: o dispositivo em Dispositivos pareados (botão Atualizar) e o banco em Bancos de Dados Configurados. Fonte: Integração C, etapa 2; roteiro Vendas 06, pareando o CEM Desktop._
- [ ] (doc) Faça: (bloqueio de propósito, CEM Desktop) digite um código vencido ou errado. → _Explique ao cliente: o código vale 10 minutos; muitos erros seguidos bloqueiam o usuário por 15 minutos. Confira: a recusa “Código de pareamento inválido ou expirado. Gere um novo código no agente desktop.” Fonte: Integração C, etapa 2 e erros comuns; INT-CFG-002, INT-CFG-004._
- [ ] (doc) Faça: (CEM Mobi) no card Configuração CEM Mobi, informe o endereço, a chave e o código da função fornecidos para o cliente, salve e clique em Testar Conexão. → _Explique ao cliente: sem conexão confirmada não adianta tentar importar. Confira: “Conexão realizada com sucesso! N pedido(s) encontrado(s).” e o selo Conectado. Fonte: Integração C, etapa 3; roteiro Vendas 06, salvando a configuração do CEM Mobi; INT-CFG-009._
- [ ] (doc) Faça: (arquivo) mostre que não há nada a conectar e que o arquivo aceito é XML (CEM Desktop) ou JSON (CEM Mobi). → _Explique ao cliente: outros formatos são recusados com “Formato de arquivo não suportado”. Confira: o cliente sabe exportar o XML ou o JSON da obra. Fonte: Integração C, etapa 1 e erros comuns; INT-ARQ-001._

**3. Padrões de Integração** · Vendas > Configurações > Padrões de Integração
- [ ] (doc) Faça: na aba Importação, no card do modo do código (Cadastrar produto como obra + Tipo), escolha o modo decidido com o cliente. → _Explique ao cliente: o modo do código fica gravado na obra; mudar depois não afeta obras já integradas. Confira: o modo escolhido salvo. Fonte: Integração C, etapa 4; INT-DSK-014, INT-DSK-015, INT-DSK-016._
- [ ] (doc) Faça: no card Padrões por tipo de item, informe NCM, unidade e categoria de cada tipo que o cliente usa (perfil, vidro, componente, esquadria…). → _Explique ao cliente: produto novo do CEM nasce com esses padrões e só com o preço de custo. Não use o NCM “99999999 À classificar”. Confira: o selo Todos completos. Fonte: Integração C, etapa 4; INT-GER-014, INT-GER-015, INT-GER-016, INT-CFG-019._
- [ ] (doc) Faça: se o orçamento tem serviço, preencha o Código de serviço (LC 116) no bloco Serviço. → _Explique ao cliente: vazio, vale o LC 116 da empresa; sem nenhum, a importação para. Confira: o código salvo. Fonte: Integração C, etapa 4; INT-GER-035, INT-GER-036._
- [ ] (doc) Faça: na aba Pedido de Venda, preencha CFOP Padrão, Plano de Conta Padrão, Condição de Pagamento Padrão e Meio de Pagamento Padrão. → _Explique ao cliente: esses campos chegam preenchidos na confirmação da importação, mas o usuário confere cada um. Confira: os padrões salvos; salvar exige administrador. Fonte: Integração C, etapa 4; INT-DSK-012; roteiro Vendas 01, confirmar os dados do pedido._

**4. Importar um orçamento real (CEM Desktop)** · Vendas > Pedidos de Venda > Importar CEM
- [ ] (doc) Faça: clique em Importar CEM; se houver mais de uma base, escolha em Base a da obra; atualize a lista e busque a obra pelo código, nome, cliente, cidade ou contato. Confira Código, Nome da Obra, Cliente e Cidade e clique em Importar. → _Explique ao cliente: sem pesquisa, aparecem as obras fechadas mais recentes; obra aberta no CEM não aparece. Obra já integrada vem identificada na lista. Confira: a obra certa selecionada. Fonte: roteiro Vendas 01, escolher a base e localizar a obra; Integração C, etapa 7._
- [ ] (doc) Faça: na etapa Dados do Cliente, leia nome, CPF/CNPJ, endereço, telefone e e-mail e a situação mostrada: Será vinculado, Será criado ou Bloqueado. → _Explique ao cliente: o Flow procura o cliente pelo CPF/CNPJ. Será vinculado usa o cadastro existente (marque Atualizar cadastro só se o CEM estiver mais atual); Será criado cria o cliente; Bloqueado é cadastro inativo: não gere o pedido, reative o cliente ou corrija o documento no CEM. Confira: a situação esperada para esse cliente. Fonte: roteiro Vendas 01, conferir o cliente; INT-DSK-005, INT-DSK-022._
- [ ] (doc) Faça: na etapa Itens da Obra, revise com o cliente tipo, descrição, modelo, quantidade, largura e altura (mm), local, peso, valor unitário e total, vidro, cor e linha. → _Explique ao cliente: a importação traz a obra inteira; não há escolha de itens. O desconto do orçamento aparece com o valor líquido e é distribuído entre os itens que podem receber desconto. Confira: os itens batem com o orçamento do CEM. Fonte: roteiro Vendas 01, conferir os itens; INT-DSK-013, INT-GER-019._
- [ ] (doc) Faça: na Confirmação, confira Empresa, CFOP, Plano de Conta e Condição de Pagamento (vindos dos Padrões), escolha o Vendedor e use Observações só para o que não veio do CEM. → _Explique ao cliente: Empresa, CFOP, Plano de Contas e Condição de Pagamento são obrigatórios para gerar o pedido. Confira: cliente, obra, quantidade de itens, desconto e valor final na tela de confirmação. Fonte: roteiro Vendas 01, confirmar os dados do pedido; INT-DSK-011._
- [ ] (doc) Faça: clique em Gerar Pedido de Venda uma única vez e aguarde. Depois clique em Ver Pedido. → _Explique ao cliente: o sistema cria ou aproveita cliente, produtos, cores e o projeto da obra, e só então o pedido. Se algo falhar, nada fica gravado além do cliente: corrigir e repetir é seguro. Confira: “Pedido criado com sucesso”, o número do pedido, o cliente, o projeto e quantos produtos novos foram criados. Fonte: roteiro Vendas 01, gerar o pedido; INT-GER-041._

**5. Importar pelo CEM Mobi ou por arquivo** · Vendas > Pedidos de Venda > Importar CEM Mobi ou Importar Arquivo
- [ ] (doc) Faça: (CEM Mobi) clique em Importar CEM Mobi e siga as etapas Selecionar Pedido, Itens da Obra, Decisões e Confirmação. → _Explique ao cliente: na etapa de decisões, preencha NCM, unidade de medida e categoria para cada tipo novo. Confira: os dados de cada etapa antes de avançar; use Voltar para corrigir. Fonte: roteiro Vendas 01, importação pelo CEM Mobi; Integração C, etapa 7._
- [ ] (doc) Faça: (CEM Mobi) na confirmação, confira cliente, obra, quantidade de itens, valor total, desconto, valor líquido e as configurações; clique em Importar Pedido uma vez e depois em Ver Pedido. → _Explique ao cliente: clicar duas vezes não acelera a importação. Confira: “Pedido criado com sucesso”. Fonte: roteiro Vendas 01, confirmar a importação do CEM Mobi._
- [ ] (doc) Faça: (arquivo) clique em Importar Arquivo e siga Upload, Dados, Pagamento, Itens e Confirmação até o fim, sem fechar a aba. → _Explique ao cliente: o rascunho da importação por arquivo se perde ao fechar a aba. Confira: o pedido gerado na lista. Fonte: Integração C, etapa 7; INT-ARQ-015._

**6. Ler com o cliente o pedido que nasceu da importação** · Vendas > Pedidos de Venda (pedido importado) e Cadastros
- [ ] (doc) Faça: na lista de pedidos, localize o pedido importado e abra os itens. Compare o total do pedido com o valor fechado no CEM. → _Explique ao cliente: o pedido nasce Em aberto e segue as regras de Vendas. O preço unitário é o preço de venda do orçamento (total ÷ quantidade); o cadastro do produto não interfere. Pode haver pequena diferença de arredondamento no rateio do desconto. Confira: todas as esquadrias presentes e o total igual ao do CEM. Fonte: roteiro Vendas 01, conferir os itens do pedido; INT-GER-004, INT-DSK-017._
- [ ] (doc) Faça: abra o detalhe de um item e mostre medidas, cor e impostos. → _Explique ao cliente: o cálculo de impostos roda na criação do pedido; item com falha fica com aviso, sem travar o pedido. Revise os avisos fiscais dos primeiros pedidos com o contador. Confira: os impostos do item ou o motivo do aviso. Fonte: Integração B, seção 3; INT-GER-024._
- [ ] (doc) Faça: abra o cliente do pedido em Cadastros > Participantes e mostre o contato criado. → _Explique ao cliente: a integração cria o cliente novo ou reaproveita pelo CPF/CNPJ, e cria o contato sem duplicar, com as marcas de e-mail de nota, boleto e vendas. Confira: documento, endereço e as marcas do contato. Fonte: Integração B, seção 3; INT-DSK-005, INT-MOB-011._
- [ ] (doc) Faça: abra o projeto da obra em Cadastros > Projetos e mostre as observações internas e a data de entrega do pedido. → _Explique ao cliente: o projeto é criado ou reaproveitado pelo código da obra; as observações internas trazem obra, contato, vendedor, previsão e cores; a data de entrega é a previsão do CEM. Confira: o código da obra no projeto e na coluna PROJETO da lista. Fonte: Integração B, seção 3; INT-GER-011, INT-GER-022._
- [ ] (doc) Faça: abra em Cadastros > Produtos um produto novo criado pela importação. → _Explique ao cliente: o produto nasce com o NCM, a unidade e a categoria do Padrão do tipo e só com o preço de custo; cores novas também são cadastradas sozinhas. Confira: NCM, unidade e categoria iguais aos Padrões do bloco 3. Fonte: Integração B, seção 3; INT-GER-013, INT-GER-016._
- [ ] (doc) Faça: mostre o que a importação não faz: nada no estoque, no financeiro, na comissão ou na produção. → _Explique ao cliente: tudo isso nasce depois, do pedido de venda, pelas regras de Vendas, Faturamento e Financeiro. Medida, cor ou vidro errados se corrigem no CEM, não no pedido. Confira: o pedido Em aberto, “Sem títulos” e Nota Fiscal “—”. Fonte: Integração B, seção 3; roteiro Vendas 01, conferir os itens do pedido._

**7. O que trava a importação** · janela de importação em Vendas > Pedidos de Venda
- [ ] (doc) Faça: (bloqueio de propósito) com o orçamentista, deixe um tipo de item sem padrão (ou use um tipo novo) e tente avançar a importação. → _Explique ao cliente: produto novo precisa de NCM, unidade e categoria do tipo. Confira: a recusa “Cadastre o padrão de importação de <tipos> em Configurações > Padrões de Integração”; complete o bloco 3 e repita. Fonte: Integração C, erros comuns; INT-DSK-011._
- [ ] (doc) Faça: (bloqueio de propósito) tente importar uma obra com item sem valor de venda no CEM. → _Explique ao cliente: a correção é o preço de venda no CEM, não no Flow. Confira: a recusa “A obra selecionada possui item(s) que não possuem valor de venda cadastrados…”. Fonte: Integração C, erros comuns; INT-DSK-010._
- [ ] (doc) Faça: mostre o que acontece com cliente sem CPF/CNPJ válido no CEM. → _Explique ao cliente: o documento não é digitado no assistente: vincule um cliente já cadastrado ou use + Novo cliente, e corrija o cadastro no CEM. Confira: a mensagem “Cliente da obra sem CPF/CNPJ — vincule um cliente já cadastrado”. Fonte: Integração C, erros comuns; INT-GER-039._
- [ ] (doc) Faça: (bloqueio de propósito) tente importar de novo a obra do bloco 4 sem mudar nada no CEM. → _Explique ao cliente: obra já importada não gera outro pedido; procure o pedido existente antes de qualquer coisa. Confira: a recusa “A obra “X” já está integrada integralmente — não há quantidade pendente para importar…”. Fonte: Integração C, erros comuns; INT-RIM-003; roteiro Vendas 01, erros comuns na importação._

**8. Revisão do orçamento e reimportação** · Vendas > Pedidos de Venda > Importar CEM (ou Importar CEM Mobi)
- [ ] (doc) Faça: com o orçamentista, aumente a quantidade de um item na obra do bloco 4 e importe de novo pelo CEM Desktop ou Mobi. → _Explique ao cliente: a reimportação traz só a diferença num novo pedido; o primeiro pedido não muda. O desconto é aplicado na proporção do valor importado. Confira: um segundo pedido só com a quantidade a mais. Fonte: Integração B, seção 1; INT-RIM-002, INT-RIM-005, INT-GER-020._
- [ ] (doc) Faça: explique, sem executar, o que acontece quando a quantidade diminui ou um item sai do orçamento. → _Explique ao cliente: não há saldo a importar e o pedido antigo continua igual: o ajuste é feito à mão no pedido Em aberto. Confira: o cliente sabe onde ajustar. Fonte: Integração B, seção 1; INT-RIM-005._
- [ ] (doc) Faça: explique o caso de troca de cor ou medida no CEM. → _Explique ao cliente: o item com cor ou medida nova entra como item novo, com saldo cheio, e o pedido antigo segue com a versão anterior: cancele ou ajuste o pedido antigo para não produzir nem faturar em dobro. Confira: o cliente entendeu o risco. Fonte: Integração B, seção 1; INT-RIM-008._
- [ ] (doc) Faça: para refazer a obra inteira, cancele (ou exclua, se Em aberto) o pedido de teste e mostre a obra voltar a pendente na lista de importação. → _Explique ao cliente: na importação por arquivo esse é o único caminho para reimportar uma obra já integrada (“A obra “X” já foi integrada e possui um pedido de venda ativo…”). Confira: a obra disponível de novo para importar. Fonte: Integração B, seção 1; INT-LIB-001, INT-LIB-002, INT-ARQ-012._

**9. Faturamento em Nível (só quando contratado)** · Vendas > Configurações > Configurar integração (card Faturamento em Nível), Níveis de Faturamento e Templates de Rateio
- [ ] (doc) Faça: no card Faturamento em Nível, ligue a chave. → _Explique ao cliente: os menus de níveis e de templates só aparecem com o recurso ligado; com ele desligado a importação avisa “Faturamento em Nível não está habilitado para esta empresa…”. Confira: os menus Níveis de Faturamento e Templates de Rateio visíveis. Fonte: Integração C, etapa 6.3; roteiro Vendas 06, Faturamento em Nível; INT-NIV-001._
- [ ] (doc) Faça: em Níveis de Faturamento, crie cada nível com Código, Prefixo dos produtos, Nome, Tipo do item (Produto ou Serviço), Peso da parte, Ordem e Empresa emissora padrão. → _Explique ao cliente: o prefixo entra no código do produto-filho; o nível de serviço gera pedido para NFS-e e o de produto, para NF-e. Precisa haver ao menos um nível do tipo Produto. Confira: os níveis ativos na lista. Fonte: Integração C, etapa 6.1; INT-NIV-008, INT-NIV-012._
- [ ] (doc) Faça: em Templates de Rateio, monte a composição usual do cliente (nível, percentual, empresa, CFOP, plano, condição) somando 100%. → _Explique ao cliente: nível usado por template ativo não pode ser inativado. Confira: o template salvo; soma diferente de 100% é recusada (“A soma dos percentuais deve ser exatamente 100%…”). Fonte: Integração C, etapa 6.2; INT-NIV-002, INT-NIV-016._
- [ ] (doc) Faça: importe uma obra e, na etapa de rateio, escolha Um pedido por nível, confira os percentuais e os destinos e conclua. → _Explique ao cliente: Um pedido por nível gera pedidos separados para os níveis com valor; Pedido único mantém um pedido com os itens divididos; Sem rateio importa normal. O último modo usado vira o padrão para todos os usuários. Confira: um pedido por nível, cada um com a empresa, o CFOP e a condição da linha. Fonte: roteiro Vendas 01, Faturamento em Nível na importação; Integração C, etapa 6; INT-NIV-004, INT-NIV-010._

**Resultado esperado**
- [ ] (doc) Sistema de integração escolhido e conectado (dispositivo pareado ou CEM Mobi Conectado).
- [ ] (doc) Padrões de Integração com o selo Todos completos e os padrões do pedido de venda preenchidos.
- [ ] (doc) Uma obra real importada sem erro, com o total do pedido igual ao do CEM e os produtos novos criados com os padrões certos.
- [ ] (doc) O cliente explicou sozinho de onde vêm os itens, o preço, o desconto, os impostos, o cliente e a obra do pedido importado.
- [ ] (doc) Uma revisão de orçamento reimportada (Desktop ou Mobi) e o cliente sabe o que fazer com o pedido antigo.
- [ ] (doc) Faturamento em Nível, se contratado: níveis e template cadastrados e uma obra importada com um pedido por nível.

## Implantação de Vendas: roteiro prático com o cliente  `implantacao-04-vendas.html` — 30 etapa(s)

**Pré-requisitos**
- [ ] (doc) Fundação concluída: cliente, vendedor, produtos com unidade válida, condições e meios de pagamento, portador, plano de contas e CFOPs de venda revisados com o contador. → _Confira: o checklist da Fundação assinado e um pedido de teste já salvo. Fonte: README da cadeia comercial, ordem de implantação; procedimento Criar pedido de venda._
- [ ] (doc) Decidido com o cliente: quem gera o contas a receber, o pedido (Gerar Títulos) ou a nota. → _Confira: a decisão na ata. Se o pedido gerou os títulos, a nota não gera de novo e o pedido fica com os valores travados. Fonte: README da cadeia comercial, decisão X2; Manual 03 Vendas, 2.3._
- [ ] (doc) Dois usuários de teste: o vendedor e um aprovador de desconto diferente dele. → _Confira: os dois entram e o aprovador vê Vendas > Aprovações. O vendedor não aprova o próprio desconto. Fonte: Vendas C, etapa 3._

**1. O pedido: importado ou digitado** · Vendas > Pedidos de Venda (pedido importado ou + Novo Pedido)
- [ ] (doc) Faça: (bloqueio de propósito) num segundo pedido com CFOP que gera financeiro, remova a condição de pagamento e tente salvar. → _Explique ao cliente: é o CFOP que decide se o pedido exige condição, plano e parcelas. Confira: a recusa “O CFOP do pedido gera financeiro, então estes campos são obrigatórios: …”; complete e salve. Fonte: Vendas C, erros comuns; VEN-PED-001; Fluxo comercial, bloco 6._

**2. Ler a lista e ajustar antes de faturar** · Vendas > Pedidos de Venda
- [ ] (doc) Faça: no pedido A, clique no lápis (Editar pedido), troque a Condição de Pagamento e mostre a diferença entre Recalcular e Recalcular Parcelas. Clique em Salvar e Permanecer. → _Explique ao cliente: trocar a condição regenera as parcelas; Recalcular redivide o total por igual (“Parcelas recalculadas com base no total do pedido”); Recalcular Parcelas, no Resumo, só redivide os valores. O menu ⋯ não tem “Editar”. Confira: as parcelas novas somando o total. Fonte: procedimento Ajustar o pedido antes de faturar._
- [ ] (doc) Faça: se o pedido ainda não tem obra, escolha o campo Projeto (opcional) e clique em Salvar e Permanecer. → _Explique ao cliente: sem a obra no pedido, o painel financeiro do projeto fica incoerente. Se editar parcelas à mão, elas precisam fechar o total (“A soma das parcelas (R$ X) não bate com o total do pedido (R$ Y)…”). Confira: a coluna PROJETO da lista mostra a obra, sem pedir CFOP nem condição de novo. Fonte: procedimento Ajustar o pedido antes de faturar; teste do fluxo completo, atenção; VEN-PED-014._

**3. Alçada de desconto** · Vendas > Configurações > Alçadas de Desconto e Vendas > Aprovações
- [ ] (doc) Faça: em Alçadas de Desconto, cadastre com o gestor as faixas da empresa: limite em percentual ou valor, nível e aprovador (usuários ou um perfil), sem sobrepor faixas. → _Explique ao cliente: as faixas são por empresa; desconto que vem do CEM, do Mobi ou do arquivo não conta para a alçada. Confira: as faixas salvas. Fonte: Vendas C, etapa 3._
- [ ] (doc) Faça: com o usuário vendedor, dê no pedido B um desconto acima da faixa e salve. → _Explique ao cliente: o pedido vai para Aprovação pendente e espera o aprovador. Confira: o status “Aprovação pendente” na lista. Fonte: Vendas B, seção 1; VEN-PED-034; README da cadeia comercial, teste ponta a ponta, passo 2._
- [ ] (doc) Faça: (bloqueio de propósito) tente faturar ou encerrar o pedido B em Aprovação pendente. → _Explique ao cliente: pedido em Aprovação pendente não fatura nem encerra. Confira: a ação recusada ou indisponível. Fonte: Vendas C, etapa 3._
- [ ] (doc) Faça: entre com o aprovador, abra Vendas > Aprovações e aprove o desconto do pedido B (ou use Aprovar desconto no menu da linha). → _Explique ao cliente: Vendas > Aprovações cobre desconto e comissão; pedido sem desconto não gera aprovação. O botão Aprovar da linha aprova com um clique. Confira: o pedido B volta a Em aberto. Fonte: Vendas C, etapa 3; Vendas B, seção 1; teste do fluxo completo, bloco 2._

**4. Títulos pelo pedido e o financeiro nascendo** · menu ⋯ > Gerar Títulos do pedido e Financeiro > Contas a Receber
- [ ] (doc) Faça: no menu ⋯ do pedido A, clique em Gerar Títulos e confirme. → _Explique ao cliente: o sistema gera um título por parcela; só gera em pedido Em aberto, com parcelas e CFOP que gera financeiro. Meio de pagamento do tipo Boleto exige conta emissora de boletos. Confira: a coluna TÍTULOS do pedido A passa a “Gerados”. Fonte: procedimento Gerar títulos e receber; Vendas B, seção 2; VEN-TIT-001, VEN-TIT-005; teste do fluxo completo, bloco 7._
- [ ] (doc) Faça: abra Financeiro > Contas a Receber, limpe o filtro Status (vem em “Em aberto”) e pesquise o Documento do pedido A. → _Explique ao cliente: é aqui que o financeiro acompanha a parcela até o recebimento. Confira: valor e vencimento iguais aos da parcela do pedido. Fonte: procedimento Gerar títulos e receber._
- [ ] (doc) Faça: (bloqueio de propósito) volte ao pedido A e tente mudar o valor de um item ou a condição de pagamento. → _Explique ao cliente: gerar títulos pelo pedido “congela” os valores; só observações e vendedor podem mudar. Confira: a recusa “Não é possível alterar campos financeiros (...) pois o pedido possui títulos a receber ativos vinculados…”. Fonte: Vendas C, erros comuns; VEN-PED-025._
- [ ] (doc) Faça: mostre, sem executar, que um cliente sem o módulo Financeiro não vê Gerar Títulos. → _Explique ao cliente: sem Financeiro não se exige plano de contas, portador nem conta bancária, mas condição de pagamento e parcelas continuam exigidas quando o CFOP gera financeiro. Confira: se o cliente tem o Financeiro contratado. Fonte: Vendas A; VEN-PED-041._

**5. Faturar e ver a nota nascer** · menu ⋯ > Faturar do pedido e Faturamento > Notas Fiscais
- [ ] (doc) Faça: abra Financeiro > Contas a Receber e procure os títulos da nota do pedido B. → _Explique ao cliente: quando o CFOP gera financeiro e o pedido não tem títulos, é a nota que gera o contas a receber; as parcelas seguem a condição de pagamento. Confira: os títulos com valor e vencimento das parcelas. Fonte: README da cadeia comercial, caminho de uma venda e teste ponta a ponta, passo 4._

**6. Encerrar e cancelar na ordem certa** · menu ⋯ do pedido (Encerrar, Cancelar) e Financeiro > Contas a Receber
- [ ] (doc) Faça: (bloqueio de propósito) tente cancelar o pedido B, que está Faturado. → _Explique ao cliente: só cancela pedido Em aberto ou Aprovação pendente; pedido faturado exige cancelar a nota primeiro (com o responsável fiscal), e aí o pedido volta a Em aberto. Confira: a recusa “Não é possível cancelar um pedido com status “…”. Apenas pedidos “Em aberto” ou “Aprovação pendente” podem ser cancelados.” Fonte: Vendas C, erros comuns; VEN-STA-005, VEN-STA-007; Vendas B, seção 1._
- [ ] (doc) Faça: (bloqueio de propósito) tente cancelar o pedido A, que tem títulos. → _Explique ao cliente: títulos em aberto ou recebidos bloqueiam o cancelamento. Confira: a recusa “Não é possível cancelar o pedido pois existem títulos a receber vinculados. Exclua os títulos primeiro.” Fonte: Vendas C, erros comuns; VEN-STA-008._
- [ ] (doc) Faça: exclua os títulos do pedido A em Financeiro > Contas a Receber e cancele o pedido A informando um motivo curto (menos de 10 caracteres) e depois um motivo completo. → _Explique ao cliente: o motivo é obrigatório e precisa ter pelo menos 10 caracteres; cancelado é definitivo. Com Produção, a OP ativa não é cancelada: o sistema avisa, pede confirmação e marca a OP. Confira: primeiro “Informe o motivo do cancelamento com no mínimo 10 caracteres.” e depois o pedido A “Cancelado”. Fonte: Vendas C, erros comuns; VEN-STA-004, VEN-STA-006, VEN-STA-009._
- [ ] (doc) Faça: crie um terceiro pedido de teste e use Encerrar. → _Explique ao cliente: Encerrar só vale para pedido Em aberto, fecha a venda sem nota, conta como vendido e não volta nem cancela. Combine com o cliente quando usar. Confira: o pedido “Encerrado”, só para visualização. Fonte: Vendas B, seção 1; VEN-STA-003, VEN-STA-005; Manual 03 Vendas, 2.3._

**7. Liberar para expedição e ver nos indicadores** · menu ⋯ > Liberar para Expedição do pedido, Vendas > Dashboard Vendas e Vendas > Demonstrativos > Carteira de Pedidos
- [ ] (doc) Faça: no menu ⋯ do pedido B (Faturado), clique em Liberar para Expedição. → _Explique ao cliente: a liberação nunca é automática e exige o módulo Expedição; o pedido entra na fila de carga. Confira: o status “Lib. Expedição”. Fonte: Vendas B, seções 1 e 2; VEN-EXP-001; teste do fluxo completo, bloco 6._
- [ ] (doc) Faça: mostre Reverter Liberação e explique o caso de item sem peso. → _Explique ao cliente: reverter volta o pedido a Faturado (com nota) ou Encerrado (sem nota); item físico sem peso impede a liberação (“N item(ns) sem peso cadastrado…”). Confira: o pedido de volta a Faturado se reverter; libere de novo. Fonte: Vendas B, seção 1; Vendas C, erros comuns; VEN-EXP-003._

**8. Comissões, metas e contrato (só se contratados)** · Vendas > Controle de Comissão, Vendas > Metas de Vendas e Vendas > Contratos de Fornecimento
- [ ] (doc) Faça: (comissão) em Controle de Comissão > Configurações, use “Abrir assistente de configuração” e defina com o cliente “Quando a comissão conta” (No recebimento / No faturamento) e a base; depois crie as regras em Controle de Comissão > Regras. → _Explique ao cliente: regime e base valem só para comissões novas; mudar depois não recalcula. O pagamento da comissão gera título no Contas a Pagar. Confira: a configuração salva e uma regra ativa. Fonte: Vendas C, etapa 5; VEN-COM-014, VEN-COM-024._
- [ ] (doc) Faça: (metas) em Metas de Vendas > Cadastro, cadastre uma meta mensal por empresa ou por vendedor e abra o painel de Metas. → _Explique ao cliente: o realizado são os pedidos não cancelados pela data do pedido; meta por equipe não existe. Sem meta, o painel mostra “0% da meta — No ritmo”, que não é resultado real. Confira: a meta no painel; vigência sobreposta é recusada (“Já existe meta ativa para este escopo com vigência sobreposta…”). Fonte: Vendas C, etapa 6; VEN-MET-001, VEN-MET-002; trilha do estagiário 04._
- [ ] (doc) Faça: (contrato) em Contratos de Fornecimento, crie um contrato com empresa, cliente (construtora), valor global e origem do abatimento, ative-o e vincule um pedido Em aberto do mesmo cliente. → _Explique ao cliente: o valor global só muda em rascunho (depois, aditivo); a origem do abatimento não muda depois do primeiro abatimento; pedido vinculado não cancela e só vira nota pelo Faturar do contrato. Confira: o pedido na aba do contrato; nota direto do pedido é recusada (“Este pedido está vinculado ao Contrato de Fornecimento #N…”). Fonte: Vendas C, etapa 7; VEN-CTR-002, VEN-CTR-004, VEN-CTR-017._

**Resultado esperado**
- [ ] (doc) Um pedido criado (ou importado), ajustado e salvo, com parcelas pela condição de pagamento.
- [ ] (doc) Um desconto acima da alçada passou por Aprovação pendente e foi aprovado por outro usuário.
- [ ] (doc) Um pedido gerou títulos e outro foi faturado; o título e a nota foram encontrados no Financeiro e no Faturamento.
- [ ] (doc) As recusas de cancelamento foram demonstradas e um pedido foi cancelado na ordem nota → títulos → pedido.
- [ ] (doc) Um pedido faturado foi liberado para expedição (quem tem Expedição) e aparece no Dashboard e na Carteira de Pedidos.
- [ ] (doc) Nenhuma nota foi transmitida sem o responsável fiscal.

## Implantação de Faturamento: roteiro prático com o cliente  `implantacao-05-faturamento.html` — 33 etapa(s)

**Pré-requisitos**
- [ ] (doc) Fundação concluída: empresa com regime, IE e endereço com cidade do IBGE, certificado A1 válido e série e próximo número da NF-e continuando o sistema antigo. → _Confira: Configurações > Empresas e Faturamento > Configurações > Certificados (botão "Configuração Guiada"). O número é dado na transmissão e nunca volta: série errada colide com a numeração antiga (rejeição 539). Fonte: FAT C, pré-requisitos; FAT-TRA-002; README da cadeia, decisão X5._
- [ ] (doc) Dois pedidos de venda de teste "TESTE FLUXO CONSULTOR" Em aberto, sem títulos gerados, com CFOP que gera financeiro, condição de pagamento e plano de contas: um para transmitir, outro para cancelar. → _Confira: em Vendas > Pedidos de Venda, coluna TÍTULOS "Sem títulos" e NOTA FISCAL "—". Fonte: README da cadeia, teste ponta a ponta (passos 3 e 7); FAT-TIT-001._
- [ ] (doc) CFOPs revisados com o contador ("Gera Financeiro", "Movimenta Estoque", "Devolução") e NCM do produto com CST de PIS/COFINS de saída (roteiro de Fiscal feito antes). → _Confira: Faturamento > Configurações > CFOP e o NCM do produto. Sem o CST, a nota sai com o quadro "Impostos não calculados". Fonte: FAT C, etapa 2; fluxo antigo "Fluxo de faturamento e fiscal", pré-requisitos._
- [ ] (doc) Responsável fiscal do cliente presente e perfis definidos: o Faturista emite e transmite, mas não cancela, não emite CC-e nem inutiliza; quem cancela usa Supervisor Fiscal (ou perfil próprio). → _Confira: Segurança > Perfis de Acesso e o usuário do responsável fiscal. Fonte: README da cadeia, decisão X8; FAT C, etapa 6._
- [ ] (doc) Decidido quem gera o contas a receber: o pedido ou a nota. → _Confira: ata do kickoff. Se o pedido gerou os títulos, a nota não gera de novo. Fonte: README da cadeia, decisão X2; FAT-TIT-001._

**2. Conferir a nota: CFOP, impostos, parcelas e transporte** · tela da nova NF-e
- [ ] (doc) Faça: confira o CFOP e a natureza da operação da nota. → _Explique ao cliente: não existe cadastro de natureza de operação: sai a descrição do CFOP (ou o texto digitado na nota). É o CFOP que decide se a nota gera título e se movimenta estoque. Confira: o CFOP de venda do pedido, com a descrição aprovada pelo contador. Fonte: FAT-NFE-007; FAT-NFE-002; README da cadeia, decisão X1._
- [ ] (doc) Faça: confira as parcelas (valor e vencimento) e, se mudou algo na nota, use "Recalcular". → _Explique ao cliente: cada parcela vira um título a receber quando o CFOP gera financeiro. Confira: a soma das parcelas igual ao total; senão o sistema avisa "A soma das parcelas (R$ X) é diferente do total da nota (R$ Y)…". Fonte: FAT-NFE-004; FAT C, erros comuns._
- [ ] (doc) Faça: com o CFOP que gera financeiro, tente salvar a nota sem o Plano de Contas (bloqueio de propósito). → _Explique ao cliente: quando o CFOP gera financeiro, a nota precisa saber em que conta o título vai cair; CFOP de remessa ou retorno dispensa. Confira: o sistema recusa com "Plano de Contas (Conta de Fluxo de Caixa) é obrigatório para salvar a nota fiscal…". Preencha de novo. Fonte: FAT-NFE-001/002; FAT B, quem trava quando falta._

**4. Transmitir em homologação com o responsável fiscal** · botão Transmitir (avião de papel) na linha da nota, em Faturamento > Notas Fiscais
- [ ] (doc) Faça: numa nota de teste com um item sem NCM (ou cliente sem CEP), clique em Transmitir (bloqueio de propósito). → _Explique ao cliente: antes de enviar, o sistema faz um pré-voo (certificado, ambiente, endereço com IBGE, NCM, CFOP, CST e origem por item) e lista tudo o que falta, sem enviar nada. Confira: a lista de pendências, por exemplo "Item N: NCM obrigatório" ou "Endereço do destinatário: CEP obrigatório". Fonte: FAT-TRA-001; FAT D, seção 4._
- [ ] (doc) Faça: com a autorização do responsável fiscal, transmita a nota do primeiro pedido. → _Explique ao cliente: número e série são dados na transmissão e nunca voltam. Confira: a nota fica "Autorizada" com chave e protocolo, e o número segue a série configurada. Fonte: FAT-TRA-002; FAT D, seção 4; README da cadeia, passo 3._
- [ ] (doc) Faça: enquanto a nota processa, não clique de novo; mostre o que acontece se clicar. → _Explique ao cliente: uma transmissão por vez; a consulta automática roda a cada 5 minutos. Confira: "Transmissão já em andamento para esta nota. Aguarde a conclusão." ou "Nota ainda em processamento pela SEFAZ…". Fonte: FAT-TRA-004/005/009; FAT C, erros comuns._
- [ ] (doc) Faça: se a SEFAZ rejeitar, leia o motivo, corrija a nota ou o cadastro e transmita de novo. → _Explique ao cliente: rejeição não consome número e não mexe no pedido. A 539 (duplicidade) se resolve avançando a série no botão "Configuração Guiada" da tela Certificados. Confira: "Rejeitada" sem número, pedido ainda "Faturado" e, depois de corrigir, "Autorizada". Fonte: FAT-TRA-007; FAT C, rejeições catalogadas._
- [ ] (doc) Faça: confira a data de emissão da nota autorizada. → _Explique ao cliente: a data de emissão é sempre a do dia da transmissão, mesmo que a nota tenha sido criada antes. Confira: a data do dia. Fonte: FAT-TRA-003; FAT D, seção 4._

**5. DANFE, XML, e-mail e carta de correção** · menu ⋯ da nota autorizada
- [ ] (doc) Faça: use Baixar PDF/DANFE e Baixar XML. → _Explique ao cliente: a DANFE mostra o logo da empresa, a natureza da operação (descrição do CFOP) e os textos fiscais ligados ao CFOP. Confira: PDF e XML baixados, com natureza e textos certos. Fonte: FAT C, etapa 8 (ações da listagem); FAT D, seção 4._
- [ ] (doc) Faça: use Reenviar Email para um contato de teste com a marca "E-mail Notas Fiscais". → _Explique ao cliente: só nota autorizada vai por e-mail, e só para contatos com essa marca. Confira: o e-mail recebido. Sem contato marcado: "Nenhum destinatário encontrado. Cadastre um contato com email e "E-mail Notas Fiscais" habilitado no participante da nota.". Fonte: FAT-OPE-005; FAT B, quem trava quando falta._
- [ ] (doc) Faça: com o responsável fiscal, emita uma Carta de Correção com um texto de pelo menos 15 caracteres. → _Explique ao cliente: a CC-e só existe em nota autorizada (até 20 por nota) e o perfil Faturista não emite. Em nota Em Aberto a ação não aparece. Confira: a carta "Autorizada" com protocolo, PDF e XML. Fonte: FAT-OPE-001/008; FAT D, seção 4; fluxo antigo "Fluxo de faturamento e fiscal", bloco 4._

**6. Reflexos da nota no financeiro, no estoque e nos painéis** · Financeiro > Contas a Receber, Estoque > Movimentos, Vendas > Pedidos de Venda
- [ ] (doc) Faça: abra Financeiro > Contas a Receber, limpe o filtro Status e pesquise o número da nota. → _Explique ao cliente: com CFOP que gera financeiro, módulo Financeiro contratado e pedido sem títulos, a nota gera um título por parcela. Se o pedido já tinha gerado, a nota não gera de novo. Confira: um título "Em aberto" por parcela, com o documento da nota, plano e meio da parcela. Fonte: FAT-TIT-001/002/007; FIN D, E2E-1._
- [ ] (doc) Faça: abra Estoque > Movimentos e o saldo do produto. → _Explique ao cliente: se o CFOP marca "Movimenta Estoque", a nota dá saída do produto. Confira: a saída ligada à nota (anote se não houver). Fonte: FAT-TRA-008; FAT B, movimentações; fluxo antigo "Fluxo de faturamento e fiscal", bloco 3._
- [ ] (doc) Faça: use ⋯ > Ver Timeline na nota. → _Explique ao cliente: o histórico guarda os eventos da nota (autorização, CC-e, cancelamento). Confira: o evento da autorização (anote se a lista vier vazia). Fonte: FAT D, seção 4; fluxo antigo "Fluxo de faturamento e fiscal", bloco 3._
- [ ] (doc) Faça: abra o Dashboard Faturamento. → _Explique ao cliente: notas autorizadas e finalizadas contam como faturadas; canceladas ficam fora. Confira: a nota de teste no painel. Fonte: FAT-IND-001; FAT D, seção 5._

**7. Cancelamento na ordem certa** · menu ⋯ > Cancelar da nota autorizada
- [ ] (doc) Faça: receba um título da segunda nota em Financeiro > Contas a Receber e tente cancelar a nota (bloqueio de propósito). → _Explique ao cliente: nota com título recebido, pedido em carga ou nota em processamento não cancela. Primeiro desfaz o que veio depois dela. Confira: o sistema recusa o cancelamento. Fonte: FAT-CAN-002; FAT D, seção 4._
- [ ] (doc) Faça: estorne o recebimento do título e, se o pedido estiver numa carga, tire-o da carga. → _Explique ao cliente: é a ordem nota → títulos → pedido vista de trás para a frente. Com carga: "Não é possível cancelar esta NF: o pedido vinculado está na carga de expedição #N…". Confira: título de volta a "Em aberto". Fonte: FAT-CAN-002; FAT C, erros comuns; README da cadeia, passo 8._
- [ ] (doc) Faça: tente cancelar com uma justificativa de 10 caracteres (bloqueio de propósito). → _Explique ao cliente: a lei exige pelo menos 15 caracteres. Confira: "Motivo do cancelamento deve ter no mínimo 15 caracteres conforme legislação". Fonte: FAT-CAN-004; FAT C, erros comuns._
- [ ] (doc) Faça: com o responsável fiscal, cancele com uma justificativa de 20 caracteres ou mais e acompanhe em Status Cancelamento. → _Explique ao cliente: o prazo depende da UF do emitente (24h padrão; MT 8h; PR e RS 168h); fora dele o sistema pede confirmação e depende da SEFAZ. Confira: "Canc. Pendente" e depois "Cancelada". Fonte: FAT-CAN-001/004/005/006; FAT D, seção 4._
- [ ] (doc) Faça: confira os reflexos em Financeiro > Contas a Receber, Estoque > Movimentos e Vendas > Pedidos de Venda; se o teste pede, cancele o pedido em seguida. → _Explique ao cliente: cancelar a nota exclui os títulos em aberto (e pede a baixa do boleto), estorna estoque e comissão e devolve o pedido. Confira: títulos excluídos, estoque estornado e pedido de volta a "Em aberto"; depois, pedido "Cancelado" com motivo. Fonte: FAT-CAN-003; FAT-TIT-004; README da cadeia, passos 7 e 8._

**8. Nota gerencial e NFS-e (quando o cliente usar)** · menu ⋯ > Finalizar NF, menu ⋯ > Faturar serviços (NFS-e) do pedido e aba NFS-e de Faturamento > Notas Fiscais
- [ ] (doc) Faça: num pedido com produto e serviço, use Faturar para o produto e Faturar serviços (NFS-e) para o serviço. → _Explique ao cliente: o serviço do pedido sai numa NFS-e vinculada; o ISS vem da Regra Fiscal de Serviço. Confira: NF-e com o produto e NFS-e com o serviço, ligadas ao mesmo pedido. Fonte: FAT-NFS-012; FAT C, etapa 8; FAT D, seção 4._
- [ ] (doc) Faça: com o responsável fiscal, salve a NFS-e, clique em Finalizar NF e depois em Transmitir. → _Explique ao cliente: hoje o sistema ainda numera o RPS só no Finalizar; a consulta da NFS-e roda a cada 15 minutos. Prefeitura não homologada ou por upload é recusada. Confira: "Autorizada" com número e código de verificação, ISS da regra. Fonte: FAT-NFS-001/004/005; FAT B, estados da NFS-e e jobs._
- [ ] (doc) Faça: abra Financeiro > Contas a Receber e pesquise a NFS-e. → _Explique ao cliente: serviço sempre gera financeiro (não depende de CFOP), se o cliente tem o módulo Financeiro. Confira: títulos com origem na NFS-e. Fonte: FAT-NFS-011; FAT-TIT-007._

**Resultado esperado**
- [ ] (doc) A NF-e foi autorizada em homologação com o número da série configurada, com o responsável fiscal presente.
- [ ] (doc) Os títulos nasceram da nota (ou do pedido, conforme a decisão X2), sem duplicar, e os reflexos no estoque e nos painéis foram conferidos ou anotados.
- [ ] (doc) DANFE, XML, e-mail e CC-e funcionaram na nota autorizada.
- [ ] (doc) A segunda nota foi cancelada na ordem certa: títulos excluídos, estoque estornado, pedido de volta.
- [ ] (doc) Os bloqueios (plano de contas, pré-voo, cancelamento com título recebido e com justificativa curta) foram demonstrados.

## Implantação do Fiscal: roteiro prático com o cliente e o contador  `implantacao-06-fiscal.html` — 38 etapa(s)

**Pré-requisitos**
- [ ] (doc) Fundação concluída: empresas com regime, CNAE, IE e endereço com IBGE; produtos com NCM, origem e categoria; participantes com UF, IE e as marcas "Não Contribuinte" e "Produtor Rural" revisadas. → _Confira: checklist da Fundação assinado e uma amostra de 10 clientes. Fonte: FIS C, pré-requisitos; FIS D, seção 2 (FIS-CTX-007)._
- [ ] (doc) Contador do cliente presente, com a planilha "NCM × tributação" e a lista de CFOPs por operação (CST/CSOSN de ICMS, IPI, PIS, COFINS, CBS, IBS). → _Confira: documentos recebidos antes da sessão. O consultor não decide tributação: toda alíquota, CST, MVA e benefício vem do contador. Fonte: FIS C, "Do cliente e do contador"._
- [ ] (doc) Módulo fiscal na licença e versão compatível com o regime de todas as empresas; cliente ciente do que é PRO (Escrituração SPED, Perfil SUFRAMA, Mapa de Apuração, MDF-e). → _Confira: *Minha Assinatura* e o menu Fiscal sem cadeado. Fonte: FIS C, comerciais; FIS D, seção 1._
- [ ] (doc) Clientes de teste "TESTE FLUXO CONSULTOR" para cada operação: PJ com IE na mesma UF, PJ com IE em outra UF e PF não contribuinte em outra UF. → _Confira: UF, IE e "Não Contribuinte" de cada um. Fonte: FIS D, seção 3._

**1. Empresa e regime** · Configurações > Empresas
- [ ] (doc) Faça: com o contador, abra cada empresa e confira, em "Dados Gerais", o "Regime de Apuração" e o "Tipo de Atividade". → _Explique ao cliente: no Simples o ICMS usa CSOSN; no Presumido e no Real usa CST. Tipo "Industrial" destaca IPI; empresa comercial não destaca. Confira: os dois campos preenchidos em todas as empresas. Fonte: FIS C, etapa 1; FIS-APL-002/004._
- [ ] (doc) Faça: em empresa do Presumido ou do Real, confira na seção "Configuração Fiscal" as alíquotas de PIS e COFINS; no Simples, a "Alíquota Crédito Simples Nacional (%)". → _Explique ao cliente: PIS/COFINS usa a alíquota da empresa ou a do regime; o crédito do Simples só vale com CSOSN 101. Confira: valores iguais aos do contador. Fonte: FIS C, etapa 1; FIS-PCO-001; FIS-ICM-003._
- [ ] (doc) Faça: confira "CBS (%)" e "IBS (%)" vazios (ou com a alíquota de teste aprovada pelo contador) e "Antecipar Reforma (CBS/IBS)" desligado. → _Explique ao cliente: vazios, o sistema usa a alíquota de teste da fase (CBS 0,9% e IBS 0,1% em 2026). Os números que aparecem no campo vazio (8,80 e 17,70) são a alíquota plena: preenchidos em 2026, o imposto sai dezenas de vezes maior. Confira: campos vazios ou com a alíquota aprovada. Fonte: FIS C, etapa 1; FIS-CBS-002/003; FIS-APL-007._
- [ ] (doc) Faça: em "Parâmetros", informe o CPF do contador em "CPF/CNPJ do Contador". → _Explique ao cliente: o SPED exige CPF de 11 dígitos; com CNPJ do escritório a escrituração trava. Confira: CPF informado. Fonte: FIS C, etapa 1._

**2. CFOP e textos fiscais** · Fiscal > Configurações > CFOP (também em Faturamento > Configurações > CFOP) e Fiscal > Configurações > Textos Fiscais
- [ ] (doc) Faça: abra cada CFOP da lista do contador e confira a descrição e as marcas "Gera Financeiro", "Movimenta Estoque" e "Devolução". → _Explique ao cliente: a descrição do CFOP vira a natureza da operação na nota; não existe cadastro separado de natureza. Confira: descrição e marcas aprovadas pelo contador. Fonte: FAT C, etapa 2; FAT-NFE-007; README da cadeia, decisão X1._
- [ ] (doc) Faça: em cada CFOP tributado, confira "CST ICMS (Lucro Presumido/Real)" e "CSOSN (Simples Nacional)" e as marcas "Aplicar ICMS", "Aplicar PIS" e "Aplicar COFINS". → _Explique ao cliente: desmarcadas, essas marcas desligam o imposto. A lista padrão de CFOP vem com CSOSN e CST de IPI, mas sem CST de ICMS, PIS e COFINS: empresa do Presumido ou do Real precisa preencher. Confira: CST/CSOSN preenchidos e marcas ligadas. Fonte: FIS C, etapa 2; FIS-APL-001; FIS-CFO-007._
- [ ] (doc) Faça: confira "CST IPI", "CST PIS", "CST COFINS", "CST CBS" e "CST IBS"; no Simples com crédito, marque "Gerar Crédito Simples Nacional". → _Explique ao cliente: o CST do item segue a ordem: escolhido à mão, NCM × Estado, NCM e por último o CFOP. Confira: CSTs iguais aos do contador; nenhum CST de crédito em CFOP de saída. Fonte: FIS C, etapa 2; FIS B, ordem das fontes; FIS-PCO-005._
- [ ] (doc) Faça: em Fiscal > Configurações > Textos Fiscais, cadastre os textos legais do contador e ligue-os ao CFOP nos campos "Texto Fiscal ICMS", "IPI", "PIS" e "COFINS". → _Explique ao cliente: hoje o sistema ainda só leva para a nota o texto ligado ao CFOP; texto ligado ao NCM, ao estado ou ao perfil SUFRAMA não sai, e texto inativo continua saindo. Confira: o texto na DANFE de teste. Fonte: FIS C, etapa 6; FIS-TXT-002/003._

**3. NCM e regras de tributação por estado** · Fiscal > Configurações > NCM (modal "NCM por Estado" na mesma tela)
- [ ] (doc) Faça: no modal "NCM por Estado", crie ou confira uma linha para cada UF de destino com exceção: "Estado Destino", "ICMS %", "Redução BC ICMS %", "IVA ICMS ST %", "Modalidade da BC do ST", "FCP %" e "Código do Benefício Fiscal (cBenef)". → _Explique ao cliente: todo NCM com ST precisa de linha com MVA para cada UF de destino, senão o ST sai zerado com aviso. O motor olha só o destino. Para muitas UFs, use a importação de NCM × Estado. Confira: uma linha por UF de venda. Fonte: FIS C, etapa 3; FIS-IST-002; FIS-NCM-009._
- [ ] (doc) Faça: nos NCMs com ST, confira o CEST. → _Explique ao cliente: NCM com ST sem CEST é rejeitado pela SEFAZ (rejeição 806). Confira: CEST preenchido. Fonte: FIS C, etapa 3; FAT C, rejeições catalogadas._
- [ ] (doc) Faça: se houver CSOSN 101, cadastre em Fiscal > Alíquota de Crédito do Simples a alíquota de cada competência; se vender para ZFM/ALC (Enterprise), crie o perfil em Fiscal > Configurações > Perfil SUFRAMA e vincule no participante. → _Explique ao cliente: sem alíquota da competência nem da empresa, o crédito sai zero. Do perfil SUFRAMA, hoje só a redução de ICMS e o texto automático funcionam. Confira: alíquota da competência de teste e o campo "Perfil SUFRAMA" no cliente. Fonte: FIS C, etapas 4 e 5; FIS-ICM-003; FIS-SUF-004._

**4. Onboarding e Diagnóstico Fiscal** · Fiscal > Onboarding Fiscal e Fiscal > Diagnóstico Fiscal
- [ ] (doc) Faça: em Fiscal > Onboarding Fiscal, escolha cada empresa e zere as pendências obrigatórias. → _Explique ao cliente: o Onboarding verifica empresa, regime, tabelas de CST/CSOSN, pelo menos uma linha de NCM × Estado, ambiente da NF-e e certificado. Ele não verifica os seus NCMs e CFOPs. A tela ainda fala em "go-live bloqueado", mas hoje ela só informa. Confira: nenhuma pendência obrigatória. Fonte: FIS C, etapa 7; FIS-ONB-001._
- [ ] (doc) Faça: abra Fiscal > Diagnóstico Fiscal. → _Explique ao cliente: é tela de suporte; sem a permissão aparece "Esta tela é restrita à equipe de suporte…". Confira: "Tabelas fiscais do cliente completas" (ou chamado aberto). Fonte: FIS C, etapa 7; FIS-ONB-003/004._
- [ ] (doc) Faça: mostre ao cliente quais tabelas são da Faktory e quais são dele. → _Explique ao cliente: estados, CST, CSOSN, CEST e LC 116 são mantidos pela Faktory (pedido de correção vai ao suporte); NCM, NCM × Estado, CFOP, textos fiscais e regras de serviço são do cliente, com o contador. Confira: o cliente sabe a quem pedir cada correção. Fonte: FIS C, seção 4; FIS-TAB-002._

**5. Provar o cálculo no pedido de venda** · Vendas > Pedidos de Venda > Novo Pedido
- [ ] (doc) Faça: com o contador, confira os impostos do item: CST/CSOSN, ICMS pela alíquota interna do NCM e PIS/COFINS sem o ICMS na base (Presumido/Real). → _Explique ao cliente: a venda interna a contribuinte não tem DIFAL; no Simples não há ICMS destacado (salvo CSOSN 101, 201 e 900) nem PIS/COFINS e IPI. Confira: valores iguais ao cálculo do contador e nenhum aviso no item. Fonte: FIS D, seção 3; FIS B, caminho Simples × Presumido/Real._
- [ ] (doc) Faça: repita com o cliente PJ de outra UF e com o cliente PF não contribuinte de outra UF. → _Explique ao cliente: interestadual a contribuinte não tem DIFAL; a não contribuinte em outra UF tem DIFAL e FCP de destino (só regime normal; o Simples não calcula). Hoje a tabela de estados ainda traz 12% de alíquota interestadual em todas as UFs. Confira: alíquota interestadual, DIFAL e FCP conferidos pelo contador. Fonte: FIS D, seção 3; FIS-DIF-001/004; FIS-ICM-009._

**6. Provar o cálculo na nota** · menu ⋯ > Faturar do pedido e Faturamento > Notas Fiscais
- [ ] (doc) Faça: troque o CFOP de um item e veja o CST mudar; depois use "Sobrescrever manualmente" para manter um código. → _Explique ao cliente: trocar o CFOP resolve o CST de novo; "Sobrescrever manualmente" mantém o código escolhido. Confira: o CST novo e, com a sobrescrita, o código mantido. Fonte: FAT-NFE-016; FIS B, ordem das fontes._
- [ ] (doc) Faça: sobrescreva a alíquota de ICMS de um item. → _Explique ao cliente: o valor digitado vale e o PIS/COFINS é recalculado sobre o ICMS digitado. Confira: ICMS novo e PIS/COFINS recalculado. Fonte: FIS D, seção 3._
- [ ] (doc) Faça: com o responsável fiscal, transmita em homologação uma NF-e de cada operação testada. → _Explique ao cliente: se houver item com imposto não calculado, a transmissão pede confirmação ("X itens com impostos não calculados: [lista]. Transmitir mesmo assim?"); a resposta certa é não, e corrigir o cadastro. Confira: notas "Autorizadas", sem rejeição 778 (NCM), 806 (CEST), 600 ou 508 (CST/CSOSN para não contribuinte). Fonte: FIS D, seção 3; FIS B, quem trava quando falta._
- [ ] (doc) Faça: se houver devolução de venda, gere a devolução a partir de uma nota autorizada e confira os valores com o contador. → _Explique ao cliente: hoje o sistema ainda recalcula a devolução pelas regras atuais, sem espelhar os tributos da nota original. Confira: diferença registrada em ata. Fonte: FIS D, seção 3; FAT-DEV-007._

**7. O aviso quando falta configuração** · pedido de venda ou nota de teste, aba de impostos do item
- [ ] (doc) Faça: venda um produto com ST para uma UF sem linha de MVA no NCM por Estado (bloqueio de propósito). → _Explique ao cliente: o documento salva, o ICMS próprio é calculado e o ST sai zerado com o aviso. Confira: "ICMS-ST não calculado: falta a MVA para <UF> …". Fonte: FIS-IST-002; FIS D, seção 3._
- [ ] (doc) Faça: use um item cujo CFOP e NCM não tenham CST (bloqueio de propósito). → _Explique ao cliente: sem CST em nenhuma fonte, o imposto não é calculado e a transmissão não deve seguir. Confira: o aviso "Sem CST: …" no item. Fonte: FIS-CST-001; FIS D, seção 3._
- [ ] (doc) Faça: numa empresa de teste sem regime, tente salvar um pedido (bloqueio de propósito). → _Explique ao cliente: sem regime nada calcula, e o documento não salva. Confira: "Informe o regime de apuração da empresa". Fonte: FIS-APL-002; FIS-CTX-006; FIS C, erros comuns._
- [ ] (doc) Faça: corrija o cadastro que faltava (linha de MVA, CST ou regime) e clique em "Recalcular" no documento. → _Explique ao cliente: o cálculo não se refaz sozinho nos documentos já salvos; "Recalcular" aplica o cadastro novo. Confira: o aviso some e os valores aparecem. Fonte: FIS C, erros comuns; FIS B, onde o motor é chamado._

**8. Serviço, obrigações acessórias e perfis** · Fiscal > Regras Fiscais de Serviço, Fiscal > Escrituração SPED, Fiscal > Sintegra, Fiscal > GNRE
- [ ] (doc) Faça: se o cliente presta serviço, confira em Fiscal > Regras Fiscais de Serviço uma regra por código LC 116, cidade e tipo de tomador, com ISS, retenções, NBS e IBS/CBS. → _Explique ao cliente: a NFS-e não passa pelo motor: ISS e retenções vêm da regra; a regra só preenche o que estiver vazio. Prestador do Presumido ou do Real que sofre retenção de PIS/COFINS/CSLL/IRRF: hoje a tela da empresa ainda não tem esses campos (acionar o suporte). Confira: ISS da regra numa NFS-e de teste. Fonte: FIS C, pré-requisitos e F11/F12; FAT-NFS-003; FIS-RET-003._
- [ ] (doc) Faça: combine por escrito com o contador quem entrega EFD ICMS/IPI, EFD Contribuições, Sintegra e GNRE. → _Explique ao cliente: o Flow gera os arquivos, mas o contador valida no PVA e entrega. Confira: ata com o responsável por cada obrigação. Fonte: FIS D, seção 4; FIS C, etapa 8._
- [ ] (doc) Faça: se o cliente tem PRO e vai gerar o SPED, abra Fiscal > Escrituração SPED, clique em "Nova Escrituração" e leia o "Diagnóstico de prontidão". → _Explique ao cliente: o diagnóstico pede IE, UF, IBGE, CPF do contador e responsável fiscal vigente; hoje o responsável fiscal e a configuração de escrituração ainda não têm tela e são cadastrados pelo suporte. Confira: diagnóstico sem inconsistências ou chamado aberto. Fonte: FIS C, etapa 8._
- [ ] (doc) Faça: confira que o responsável fiscal tem o perfil Supervisor Fiscal (ou perfil próprio com as permissões do Fiscal). → _Explique ao cliente: só quem responde pelo fiscal mexe em NCM, CFOP e textos: alterar afeta todas as notas. Confira: perfil do usuário em Segurança > Perfis de Acesso. Fonte: FIS C, etapa 9; FIS D, seção 5._

**Resultado esperado**
- [ ] (doc) Todas as empresas com regime, tipo de atividade, PIS/COFINS e CBS/IBS conferidos pelo contador.
- [ ] (doc) CFOPs, NCMs e linhas de NCM por Estado das operações do cliente cadastrados conforme a planilha assinada pelo contador.
- [ ] (doc) Onboarding Fiscal sem pendência obrigatória em cada empresa.
- [ ] (doc) Cada operação típica calculada no pedido e na nota sem aviso no item e com valores conferidos; uma NF-e de cada transmitida em homologação.
- [ ] (doc) O cliente reconheceu o quadro "Impostos não calculados no item" e os avisos de MVA, CST e regime, e corrigiu com "Recalcular".
- [ ] (doc) Obrigações acessórias combinadas por escrito e lacunas comunicadas ao contador.

## Implantação do Financeiro: roteiro prático com o cliente  `implantacao-07-financeiro.html` — 25 etapa(s)

**Pré-requisitos**
- [ ] (doc) Módulo financeiro contratado; versão PRO se o cliente quer PIX, pagamentos eletrônicos, DDA ou Open Finance. → _Confira: menus sem cadeado em Financeiro. Sem o módulo, nenhuma nota gera título. Fonte: FIN C, comerciais; FAT-TIT-007._
- [ ] (doc) Plano de contas analítico, contas bancárias, portadores, condições e meios de pagamento feitos na Fundação; saldo inicial das contas ainda não preenchido. → _Confira: Financeiro > Configurações. O saldo inicial entra só na carga, depois dos testes. Fonte: FIN C, pré-requisitos e etapa 2; README da cadeia, decisão X7._
- [ ] (doc) Pedido de venda de teste "TESTE FLUXO CONSULTOR" sem títulos e a nota autorizada do roteiro de Faturamento (de um pedido sem títulos); nota de recebimento finalizada do roteiro de Recebimento. → _Confira: coluna TÍTULOS "Sem títulos" no pedido e o número da nota e da NR. Fonte: README da cadeia, teste ponta a ponta; FIN D, E2E-1 e E2E-8._
- [ ] (doc) Decisões tomadas: quem gera o contas a receber (pedido ou nota) e como se dá baixa em cada conta (à mão, pelo boleto ou pela conciliação). → _Confira: ata do kickoff. Escolher um caminho por conta evita baixar duas vezes. Fonte: README da cadeia, decisão X2; FIN C, Q5 e Q9._

**1. Contas, meios de pagamento e plano de contas** · Financeiro > Configurações (Contas Bancárias, Meios de Pagamento, Planos de Conta) e Financeiro > Saldos
- [ ] (doc) Faça: em Financeiro > Configurações > Contas Bancárias, mostre a conta de teste e o campo "Saldo Inicial" vazio. → _Explique ao cliente: uma conta por carteira/convênio de cobrança; para boleto, a conta precisa ser emissora (conta padrão não basta). O fluxo de caixa parte do saldo inicial da conta, por isso ele só entra na carga, conferido com o banco. Confira: conta ativa. Fonte: FIN C, etapa 2; FIN-CTA-001; FIN-IND-002; fluxo antigo "Fluxo financeiro", pré-requisitos._
- [ ] (doc) Faça: tente lançar um título de teste numa conta sintética (com contas-filhas) do plano de contas (bloqueio de propósito). → _Explique ao cliente: todo título precisa de conta analítica; é ela que alimenta o fluxo de caixa e a DRE. Confira: "Movimentações financeiras só podem ser associadas a contas analíticas do fluxo de caixa. Selecione uma conta sem filhos.". Fonte: FIN-CP-002; FIN B, quem trava quando falta._

**3. Títulos nascendo da nota** · Financeiro > Contas a Receber
- [ ] (doc) Faça: pesquise em Financeiro > Contas a Receber o número da nota autorizada no roteiro de Faturamento. → _Explique ao cliente: a nota gera um título por parcela quando o CFOP gera financeiro e o pedido ainda não tinha gerado; se o pedido gerou, a nota não gera de novo. Confira: um título "Em aberto" por parcela, com o documento da nota. Fonte: FIN B, de onde nascem os títulos; FAT-TIT-001/002; FIN D, E2E-1._
- [ ] (doc) Faça: abra o título e confira o plano de contas e o meio de pagamento da parcela. → _Explique ao cliente: o título herda da nota o plano de contas e o meio; é por eles que o valor aparece no fluxo de caixa e na DRE. Confira: plano e meio iguais aos da nota. Fonte: FIN D, E2E-1._
- [ ] (doc) Faça: mostre Financeiro > Devoluções e explique o caminho de uma nota de devolução. → _Explique ao cliente: a nota de devolução não gera título: vira pendência no Painel de Devoluções, onde o financeiro decide abater ou restituir. Confira: o painel abre (vazio no go-live). Fonte: FIN B, de onde nascem os títulos; FIN-DEV-001; FIN C, etapa 7._

**4. Receber: total e parcial** · Financeiro > Contas a Receber, ação Receber
- [ ] (doc) Faça: tente receber com a data de amanhã (bloqueio de propósito). → _Explique ao cliente: não dá para agendar baixa: ela registra o dinheiro que já entrou. Confira: "Data de recebimento não pode ser posterior a hoje". Fonte: FIN-BXA-001; FIN C, erros comuns._

**5. Boleto e PIX em homologação (quando contratados)** · Financeiro > Configurações > Boleto e Financeiro > PIX
- [ ] (doc) Faça: em Financeiro > Configurações > Boleto, percorra a aba "Assistente de Configuração" (Empresa, Ambiente em Homologação, Credenciais, Conta Bancária, Conclusão) e, em Contas Bancárias, marque a conta favorita para boleto. → _Explique ao cliente: o Flow é o integrador; o contrato é do cliente com o provedor. Hoje o sistema ainda não sincroniza conta com dígito do beneficiário preenchido: informe o código no formato do banco e deixe o dígito em branco. Confira: conta sincronizada; sem isso: "Conta bancária não está integrada ao PlugBoleto ou ainda não foi sincronizada.". Fonte: FIN C, etapa 3; FIN-BOL-001; FIN-CTA-002._
- [ ] (doc) Faça: num título de teste com boleto e conta, gere o boleto e aguarde o registro. → _Explique ao cliente: título com boleto só deixa editar Observação e Conta de fluxo; mudar valor ou vencimento é pela ação do boleto. Confira: linha digitável, situação REGISTRADO e e-mail ao contato marcado para boletos. Fonte: FIN D, E2E-2; FIN-CR-005/006._
- [ ] (doc) Faça: liquide o boleto no ambiente de homologação do banco e aguarde o retorno. → _Explique ao cliente: o retorno do banco dá a baixa sozinho (aviso do banco ou rotina a cada 30 minutos); não baixe à mão o mesmo título. Confira: título "Recebido" com a data e o valor do banco. Fonte: FIN D, E2E-3; FIN B, jobs automáticos._
- [ ] (doc) Faça: se o cliente tem PRO, em Contas Bancárias use "Serviços financeiros da conta" > "Habilitar PIX", envie o certificado da conta PIX, gere uma cobrança e pague no sandbox. → _Explique ao cliente: sem o certificado a conta não cobra; PIX com vencimento não vale no Banco do Brasil. Hoje o sistema ainda não leva o cancelamento do PIX ao provedor. Confira: parcela "Recebido" após a sincronização (a cada 5 minutos). Fonte: FIN C, etapa 4; FIN-PIX-001; FIN D, E2E-5._

**6. Contas a pagar vindas da compra** · Financeiro > Contas a Pagar
- [ ] (doc) Faça: pesquise em Financeiro > Contas a Pagar o título da nota de recebimento finalizada no roteiro de Recebimento. → _Explique ao cliente: a NR finalizada gera os títulos a pagar junto com a entrada no estoque (tudo ou nada); cancelar a NR exclui os títulos em aberto. Confira: título "Em aberto" com origem na NR. Fonte: FIN B, de onde nascem os títulos; REC-FIN-006/007; FIN D, E2E-8._

**7. Extrato e conciliação** · Financeiro > Extrato
- [ ] (doc) Faça: em *Exportar/Importar*, use "Importar extrato (OFX/CSV)" com o arquivo do banco; depois importe o mesmo arquivo de novo. → _Explique ao cliente: a importação abre a Mesa de Conciliação; o mesmo extrato não entra duas vezes. Extrato pela API (Open Finance) é PRO. Confira: movimentos pendentes na Mesa; na segunda importação, 0 importados. Fonte: FIN C, etapa 5; FIN D, E2E-6._
- [ ] (doc) Faça: na Mesa, concilie um crédito com um título em aberto (use "Confirmar sugestões fortes" só para os exatos). → _Explique ao cliente: conciliar baixa o título na data e na conta do extrato; diferença de valor exige decisão (parcial, desconto, acréscimo); sugestão errada se descarta. Confira: movimento conciliado e título recebido na data do extrato. Fonte: FIN-EXT-002/004; FIN D, E2E-6._
- [ ] (doc) Faça: tente vincular um título já baixado à mão por valor diferente do extrato (bloqueio de propósito). → _Explique ao cliente: por isso se escolhe um caminho de baixa por conta. Confira: "O título … foi baixado por R$ X e o extrato traz R$ Y — estorne a baixa…". Fonte: FIN-EXT-007; FIN C, erros comuns._
- [ ] (doc) Faça: desfaça a conciliação do passo anterior. → _Explique ao cliente: desfazer estorna só o que a conciliação baixou. Confira: título de volta a "Em aberto" e movimento "pendente". Fonte: FIN-EXT-003; FIN D, E2E-7._

**9. Estorno e exclusão** · Financeiro > Contas a Receber, ações Estornar e excluir
- [ ] (doc) Faça: tente estornar o título pago por boleto registrado ou liquidado (bloqueio de propósito, se houve boleto no bloco 5). → _Explique ao cliente: boleto no banco protege o título; primeiro se cancela o boleto registrado. Confira: "boleto registrado ou liquidado no PlugBoleto não permite estorno". Fonte: FIN-EST-002; FIN C, erros comuns._
- [ ] (doc) Faça: tente estornar um título conciliado no bloco 7 (bloqueio de propósito). → _Explique ao cliente: baixa feita pela conciliação se desfaz pela conciliação. Confira: o sistema recusa; desfazendo a conciliação, o estorno volta a ser possível. Fonte: plano de validação do Financeiro, Extrato e Conciliação, item 5._
- [ ] (doc) Faça: exclua um título de teste ainda não baixado, criado só para o roteiro. → _Explique ao cliente: não existe "cancelar título": cancelar é excluir, e só título não baixado pode ser excluído; excluir uma parcela não altera as outras. Confira: o título sai da lista. Fonte: FIN-CR-007; FIN-EXC-001/002._

**Resultado esperado**
- [ ] (doc) Títulos nascidos da nota autorizada, sem duplicar os do pedido.
- [ ] (doc) Extrato importado, um movimento conciliado e a conciliação desfeita.
- [ ] (doc) Boleto e PIX emitidos e baixados em homologação, quando contratados.

## Implantação de Compras: roteiro prático com o cliente  `implantacao-08-compras.html` — 31 etapa(s)

**Pré-requisitos**
- [ ] (doc) Fundação concluída e assinada; módulo Compras ativo (Compras PRO só se usar Contratos de Entrega). → _Confira: checklist da Fundação assinado e Minha Assinatura. Fonte: COM D, seção 1; COM-GER-004._
- [ ] (doc) Insumo de teste com NCM, unidade, categoria com "Preço calculado por", embalagem e fator; perfil e esquadria com as características da categoria (cor, medidas). → _Confira: abra o produto. Sem NCM a solicitação não entra na cotação. Fonte: COM-COT-003, COM-SC-001, COM-SC-003._
- [ ] (doc) CFOPs de entrada (1xxx/2xxx, e 3xxx se importa) das naturezas usadas, com "gera financeiro" decidido com o contador; condições de pagamento com parcelas; meios de pagamento. → _Confira: a lista de CFOPs assinada pelo contador. Fonte: README de Suprimentos, decisão S1; COM-COT-010, COM-PC-002._
- [ ] (doc) Decisões registradas em ata: títulos a pagar pelo pedido ou pela nota (nunca pelos dois) e se haverá aprovação por alçada. A alçada vem desligada. → _Confira: a ata. Fonte: README de Suprimentos, decisões S2 e S3; fluxo antigo de suprimentos (pré-requisito)._
- [ ] (doc) Compras > Configurações > Parâmetros de Compras revisados: "Regras de Melhor Opção" e "Critérios de preço na Cotação". Deixe "Usar aprovação por alçada" desligado até o bloco 5. → _Confira: a tela de parâmetros. Fonte: COM C, etapa 2; COM-PAR-001, COM-COT-008._
- [ ] (doc) Dois usuários de teste: o comprador e um aprovador (quem cria o pedido não aprova). → _Confira: Segurança > Perfis de Acesso. Fonte: COM-ALC-007 (D-661); COM C, etapa 10._

**1. Solicitação de compra manual** · Compras > Solicitações de Compra > Nova Solicitação
- [ ] (doc) Faça: tente gravar uma solicitação de perfil sem o comprimento. → _Explique ao cliente: o documento não grava sem as características que a categoria exige. Confira: o sistema recusa e lista a pendência. Fonte: COM-SC-001; COM D, 3.1._
- [ ] (doc) Faça: se o cliente compra em embalagem, crie uma solicitação de um item vendido em caixa de 50 com necessidade de 40. → _Explique ao cliente: a solicitação arredonda para a embalagem do fornecedor. Confira: a quantidade fica 50. Fonte: COM-SC-003; COM D, 3.1._

**2. Sugestão de compra (se o cliente usa estoque mínimo)** · Compras > Sugestão de Compra
- [ ] (doc) Faça: escolha a empresa e gere as solicitações sugeridas. → _Explique ao cliente: a sugestão apura pelo produto, não pela variação (cor e medidas). Confira: as novas SCs em Solicitações de Compra, "Em Aberto". Fonte: COM C, etapa 4; D-179._
- [ ] (doc) Faça: gere a sugestão de novo em menos de 5 minutos. → _Explique ao cliente: o sistema evita solicitações duplicadas. Confira: nenhuma SC nova. Fonte: COM-SUG-004; COM D, 3.3._

**3. Cotação com fornecedores** · ⋯ > Gerar Cotação da SC ou Compras > Cotações de Compra
- [ ] (doc) Faça: tente gravar a validade com a data de ontem. → _Explique ao cliente: cotação vencida não aceita vencedor; renove a validade quando precisar. Confira: "Data de validade da cotação não pode estar no passado." Fonte: COM-COT-001, COM-COT-002._
- [ ] (doc) Faça: use Enviar por e-mail para um fornecedor de teste (com e-mail interno da equipe). → _Explique ao cliente: o fornecedor recebe PDF e planilha; o link para o fornecedor responder pela internet não existe mais. Confira: o envio registrado; sem serviço de e-mail aparece "Serviço de e-mail indisponível neste ambiente." Fonte: COM-RFQ-004; COM C, etapa 5._
- [ ] (doc) Faça: use Importar resposta do fornecedor: escolha o fornecedor, envie a planilha devolvida, confira a prévia e confirme. → _Explique ao cliente: a resposta em planilha, PDF ou imagem vira proposta sem digitação. Confira: a proposta gravada para aquele fornecedor; planilha com duas colunas de preço é recusada. Fonte: COM-RFQ-005 a 009, COM-RFQ-006._
- [ ] (doc) Faça: no passo 4 (Comparação), escolha o critério e clique em Aplicar Melhor Opção. Depois troque o vencedor de um item à mão e aplique de novo. → _Explique ao cliente: o vencedor é por item; a escolha manual é preservada quando se aplica a melhor opção outra vez. Confira: vencedor definido em cada item. Fonte: fluxo antigo de suprimentos, bloco 2; COM-COT-007, COM-COT-008._

**4. Gerar o pedido de compra** · Gerar Pedido de Compra na comparação e Compras > Pedidos de Compra
- [ ] (doc) Faça: deixe um item sem vencedor e clique em Gerar Pedido de Compra. → _Explique ao cliente: todo item precisa de vencedor antes de gerar. Confira: "Não é possível gerar o pedido: item(ns) N sem fornecedor vencedor definido." e nenhum PC criado. Fonte: D-166; COM C, seção 5._
- [ ] (doc) Faça: no mesmo formulário, tente salvar um item com valor unitário zero. → _Explique ao cliente: pedido de compra não grava item a zero. Confira: "Item 1: Valor Unitário deve ser maior que zero". Fonte: COM-PC-001, COM-GER-003._

**5. Aprovação por alçada (se o cliente usa)** · Compras > Configurações > Faixas de Alçada e Compras > Aprovações
- [ ] (doc) Faça: em Faixas de Alçada, use Nova faixa para criar dois níveis (ex.: até 10 mil no nível 1 e acima no nível 2, com "Valor até" em branco na última), com dois aprovadores por faixa. Depois ligue "Usar aprovação por alçada" em Parâmetros de Compras. → _Explique ao cliente: faixas do mesmo nível não se sobrepõem, e faixa com um só aprovador deixa sem aprovador o pedido criado por ele. Confira: a tela sem aviso de aprovador único. Fonte: COM C, etapa 3; COM-ALC-001, COM-ALC-003, COM-ALC-013._
- [ ] (doc) Faça: gere um PC de valor acima da primeira faixa. → _Explique ao cliente: a alçada é um selo paralelo ao status do pedido. Confira: "Aguardando aprovação · nível 1". Fonte: COM-ALC-005; COM D, 3.1._
- [ ] (doc) Faça: com o usuário que criou o pedido, tente aprová-lo em Compras > Aprovações. → _Explique ao cliente: quem cria não aprova, nem Super Usuário. Confira: "Você não pode decidir um documento que você mesmo criou." Fonte: COM-ALC-007 (D-661)._
- [ ] (doc) Faça: com o pedido pendente, tente Gerar Título a Pagar ou Gerar Nota de Recebimento. → _Explique ao cliente: pedido pendente ou rejeitado não gera título nem entra em nota. Confira: "Pedido X aguarda aprovação do nível N…". Fonte: COM-ALC-006._
- [ ] (doc) Faça: entre com o aprovador e aprove o pedido em Compras > Aprovações (nível 1 e, se houver, nível 2). → _Explique ao cliente: desligar a chave libera todos os pendentes de uma vez. Confira: o PC passa a "Aprovado". Fonte: fluxo antigo de suprimentos, bloco 3; COM-ALC-005, COM-ALC-008._

**6. Enviar o pedido e acompanhar a entrega** · Compras > Pedidos de Compra, Compras > Follow-up de Entregas e Dashboard Compras
- [ ] (doc) Faça: use ⋯ > Baixar PDF no PC aprovado e mostre como anexar ao e-mail do fornecedor. → _Explique ao cliente: o PDF sai no modelo de documento do cliente. Confira: o PDF com itens, condição e entrega. Fonte: COM C, etapa 6; COM D, 3.1._
- [ ] (doc) Faça: abra Compras > Follow-up de Entregas e localize o PC. → _Explique ao cliente: o follow-up nasce sozinho com o pedido e é recalculado todo dia de manhã (Aguardando, Próx. Vencimento, Atrasado). Confira: o PC na lista com a entrega prevista. Fonte: COM C, etapa 9; COM B, seção 4; COM-FUP-002._

**7. Reflexo no Recebimento e no Financeiro** · Compras > Pedidos de Compra > ⋯ e Financeiro > Contas a Pagar
- [ ] (doc) Faça: se a ata decidiu títulos pelo pedido, use ⋯ > Gerar Título a Pagar num PC aprovado e abra Financeiro > Contas a Pagar. Depois tente gerar de novo. → _Explique ao cliente: com títulos gerados, itens e parcelas do pedido travam, e a nota desse pedido não gera título. Confira: um título por parcela, origem PC; a segunda vez mostra "Títulos a pagar já foram gerados para este pedido". Fonte: COM-PC-005, COM-PC-010; README de Suprimentos, S2._
- [ ] (doc) Faça: num PC de 100 unidades, gere a nota com 60 e salve. → _Explique ao cliente: entrega parcial cria o pedido filho com o saldo; o comprador acompanha o restante nele. Confira: o PC original com o recebido e o residual PC-nnnn/2 em aberto com 40. Fonte: COM-PC-004, COM-PC-009; REC-NR-009._
- [ ] (doc) Faça: tente Cancelar o PC que tem nota de recebimento ativa. → _Explique ao cliente: a ordem do desfazer é nota → títulos → pedido. Confira: "Pedido possui Nota de Recebimento ativa vinculada…". Fonte: COM-PC-007._
- [ ] (doc) Faça: tente Gerar Título a Pagar no PC já "Recebido". → _Explique ao cliente: depois do recebimento, os títulos saem da nota, não do pedido. Confira: o sistema recusa. Fonte: COM-PC-010 (D-138); COM D, 3.2._

**Resultado esperado**
- [ ] (doc) Se a alçada é usada: o pedido acima da faixa esperou aprovação, o autor não aprovou e outro usuário aprovou.
- [ ] (doc) O pedido gerou a nota de recebimento, e a entrega parcial criou o PC residual.
- [ ] (doc) Um título só por parcela nasceu, pelo pedido ou pela nota, conforme a ata.
- [ ] (doc) O cliente viu o sistema recusar: perfil sem comprimento, item sem vencedor, preço zero e cancelamento com nota ativa.

## Implantação de Recebimento: roteiro prático com o cliente  `implantacao-09-recebimento.html` — 30 etapa(s)

**Pré-requisitos**
- [ ] (doc) Roteiro de Compras concluído: pelo menos dois pedidos de compra aprovados (um deles de 100 unidades, para a entrega parcial). → _Confira: Compras > Pedidos de Compra, status "Em Aberto" e sem alçada pendente. Fonte: REC-NR-007; trilha de estagiários 06._
- [ ] (doc) CFOPs de entrada com "Gera Financeiro" e "Movimenta Estoque" decididos com o contador; plano de contas e conta de fluxo no fornecedor ou na empresa. → _Confira: Recebimento > Configurações > CFOP. Sem plano de contas não nasce título. Fonte: REC C, etapa 1; REC-NR-016, REC-FIN-007._
- [ ] (doc) Produtos comprados com unidade de estoque, embalagem e fator; unidades de medida com as siglas que os fornecedores usam no XML. → _Confira: abra dois produtos e a tela de unidades. Fonte: REC-FIN-001, REC-XML-007._
- [ ] (doc) Para buscar notas na SEFAZ: Recebimento PRO e certificado A1 da empresa enviado ao Flow. Sem PRO, use só a importação de XML por arquivo. → _Confira: Minha Assinatura e Configurações > Certificados. Fonte: README de Suprimentos, S4; REC-DFE-001, REC-DFE-009._
- [ ] (doc) Decisões da ata: títulos pelo pedido ou pela nota; conferência física sim ou não, e se trava a finalização. → _Confira: a ata. Fonte: README de Suprimentos, S2 e S5; REC C, perguntas R6 e R10._
- [ ] (doc) Para devolução: Faturamento com série de NF-e configurada. → _Confira: a série no Faturamento. Fonte: REC-DEV-001/002._

**1. Preparar o recebimento: conferência e busca de notas** · Recebimento > Configurações > Parâmetros de Recebimento e Recebimento > Distribuição DFe
- [ ] (doc) Faça: em Parâmetros de Recebimento, ligue "Usar Conferência Física" e, se o cliente quer travar, "Exigir Conferência para Finalizar". Salve. → _Explique ao cliente: a conferência registra a contagem; sem PRO os parâmetros ficam inertes. Confira: as chaves gravadas. Fonte: REC C, etapa 5; REC-CON-001, REC-CON-007; fluxo antigo de suprimentos (pré-requisito)._
- [ ] (doc) Faça: tente ligar "Usar Registro de Avarias" com a conferência desligada (numa empresa de teste). → _Explique ao cliente: avaria e inspeção dependem da conferência. Confira: "Não é possível habilitar registro de avaria sem antes habilitar a conferência física…". Fonte: REC-PAR-002._
- [ ] (doc) Faça: em Distribuição DFe, marque "Configuração ativa" e, se o cliente quiser, "Buscar automaticamente a cada 30 minutos". Clique em "Salvar configuração". → _Explique ao cliente: sem certificado o salvar é recusado; certificado vencendo em 30 dias gera aviso. Confira: o cartão com "Última busca automática". Fonte: REC C, etapa 2; REC-DFE-001, REC-DFE-014._

**2. Receber o XML: DF-e ou arquivo** · Recebimento > Aguardando manifestação e Recebimento > Notas de Recebimento > Importar XML
- [ ] (doc) Faça: na caixa de notas a manifestar, clique em Atualizar. → _Explique ao cliente: a nota pode levar mais de 30 minutos para aparecer; nota em que a empresa é só transportadora não aparece. Confira: as notas emitidas contra a empresa. Fonte: REC C, etapa 3; REC-DFE-015._
- [ ] (doc) Faça: com o responsável fiscal ao lado, numa nota de teste, use Responder à SEFAZ > Confirmar que recebi. → _Explique ao cliente: a manifestação vai à SEFAZ e não se desfaz; defina quem pode manifestar. Confira: a nota manifestada. Fonte: REC C, etapa 3; REC-DFE-006._
- [ ] (doc) Faça: clique em Receber. Na conferência da importação, escolha o produto onde falta, marque "Lembrar deste código para as próximas notas deste fornecedor", vincule o pedido de compra e salve. → _Explique ao cliente: o código lembrado faz a próxima nota do fornecedor casar sozinha; "Continuar depois" guarda o rascunho. Confira: NR em aberto com empresa, fornecedor, CFOP e o PC vinculado. Fonte: REC C, etapa 4; REC D, seção 3._
- [ ] (doc) Faça: em Notas de Recebimento, use Importar XML com o arquivo de um fornecedor novo. → _Explique ao cliente: o fornecedor novo é criado pelo XML, sem duplicar pelo CNPJ. Confira: NR com empresa, fornecedor e CFOP. Fonte: REC-XML-004; REC D, seção 3._
- [ ] (doc) Faça: importe o mesmo XML outra vez. → _Explique ao cliente: a chave de acesso impede nota em dobro. Confira: "A nota fiscal <chave> já foi importada na NR-nnnnnn…". Fonte: REC-XML-002._

**3. Nota a partir do pedido de compra** · Compras > Pedidos de Compra > ⋯ > Gerar Nota de Recebimento
- [ ] (doc) Faça: numa nota do pedido, digite uma quantidade maior que o saldo do item do PC e salve. → _Explique ao cliente: recebeu a mais, o caminho é ajustar o pedido ou abrir outro. Confira: "Item X do pedido de compra: quantidade a excede o saldo disponível de b…". Fonte: REC-NR-008._
- [ ] (doc) Faça: tente gerar a nota de um PC com alçada pendente. → _Explique ao cliente: só pedido aprovado entra em nota. Confira: "Pedido X aguarda aprovação do nível N (valor V) — não pode ser importado para recebimento." Fonte: REC-NR-007; COM-ALC-006._

**4. Entrega parcial: desdobro do pedido** · Compras > Pedidos de Compra
- [ ] (doc) Faça: no PC de 100 unidades, gere a nota com 60 e salve. → _Explique ao cliente: o pedido original fica com o recebido e o saldo vai para PC-nnnn/2; se o PC já gerou títulos, o residual e a nota dele não geram. Confira: PC original "Recebido" com 60 e PC-nnnn/2 em aberto com 40. Fonte: REC-NR-009, REC-NR-010; COM-PC-009._
- [ ] (doc) Faça: tente gerar outra nota no PC original. → _Explique ao cliente: o restante se recebe pelo residual. Confira: "Pedido de compra #N não está aberto para recebimento." Fonte: REC-NR-007._

**5. Conferência física e divergências** · fila de conferências: Recebimento > Aprovações (fluxo antigo) ou Recebimento > Conferências (gestora)
- [ ] (doc) Faça: no segundo item, conte a menos (ex.: 8 de 10). → _Explique ao cliente: a conferência registra a divergência; a falta volta ao fornecedor por NF-e de devolução. Confira: a divergência registrada no item. Fonte: REC-CON-003, REC-CON-004; README de Suprimentos, S5._
- [ ] (doc) Faça: com "Exigir Conferência para Finalizar" ligado, tente finalizar outra nota sem conferir. → _Explique ao cliente: é a trava para ninguém dar entrada sem contar. Confira: "Esta nota não pode ser finalizada sem antes passar pela conferência física…". Fonte: REC-CON-007._

**6. Finalizar: estoque e título a pagar nascem** · Recebimento > Notas de Recebimento > ⋮ > Finalizar
- [ ] (doc) Faça: tente editar a nota finalizada. → _Explique ao cliente: nota finalizada não muda; corrige-se cancelando e relançando. Confira: "…Somente notas em aberto podem ser alteradas." Fonte: REC-NR-014._

**7. Cancelamento e devolução ao fornecedor** · Recebimento > Notas de Recebimento > ⋮
- [ ] (doc) Faça: numa nota finalizada cujo título já foi pago no roteiro do Financeiro, tente Cancelar. → _Explique ao cliente: primeiro se estorna o pagamento, depois se cancela a nota. Confira: "Existe(m) N Conta(s) a Pagar já paga(s)… Estorne o pagamento em Contas a Pagar antes de cancelar o documento." Fonte: REC-CAN-002._
- [ ] (doc) Faça: cancele outra nota finalizada informando o motivo. → _Explique ao cliente: o cancelamento estorna o estoque, exclui os títulos e reabre o PC; o residual continua. Confira: NR "Cancelada", estorno em Estoque > Movimentos e o título fora de Contas a Pagar. Fonte: REC-CAN-001, REC-CAN-004; REC D, seção 3._
- [ ] (doc) Faça: numa nota importada por XML, use "Identificar item incorreto" no bloco "Itens incorretos" e depois Gerar Devolução. → _Explique ao cliente: identificar só registra; a devolução cria a NF-e em rascunho no Faturamento. O estoque baixa só na autorização e o título não muda (fica pendência no Financeiro). Confira: a NF-e de devolução em rascunho. Não transmita sem o responsável fiscal. Fonte: REC-DEV-001, REC-DEV-002, REC-DEV-003._
- [ ] (doc) Faça: tente Gerar Devolução na nota digitada sem chave de acesso. → _Explique ao cliente: a devolução precisa referenciar a NF-e do fornecedor. Confira: "A devolução precisa referenciar a NF-e do fornecedor e esta Nota de Recebimento não tem a chave de acesso…". Fonte: REC-DEV-002._

**Resultado esperado**
- [ ] (doc) Uma nota entrou por XML (DF-e ou arquivo) e outra pelo pedido de compra, com os dois números (NF e NR) anotados.
- [ ] (doc) A entrega parcial criou o PC-nnnn/2 com o saldo.
- [ ] (doc) A conferência registrou uma contagem igual e uma divergente.
- [ ] (doc) Um título só por parcela, pela nota ou pelo pedido conforme a ata.
- [ ] (doc) O cliente viu o sistema recusar: XML repetido, quantidade acima do pedido, finalizar sem conferência e cancelar com título pago.

## Implantação de Estoque: roteiro prático com o cliente  `implantacao-10-estoque.html` — 23 etapa(s)

**Pré-requisitos**
- [ ] (doc) Fundação concluída: tipo de categoria final, unidade de estoque e fator de embalagem de cada produto conferidos, e cores cadastradas. → _Confira: amostra de produtos. Depois do saldo, o tipo da categoria trava. Fonte: README de Suprimentos, ordem 3; CAD-CAT-004, EST-SLD-003._
- [ ] (doc) Três usuários de teste: quem cria e quem confirma a transferência; dois contadores e um aprovador do inventário. → _Confira: Segurança > Perfis de Acesso. A regra vale até para Super Usuário. Fonte: README de Suprimentos, S9; EST-INV-004 a 007._
- [ ] (doc) Data de corte combinada com o cliente, depois da contagem física e das últimas notas do sistema antigo, e a planilha de saldo com custo aceito pela contabilidade. → _Confira: a ata. Fonte: README de Suprimentos, S7; EST C, etapa 4._
- [ ] (doc) Saber se o cliente usa inventário (PRO), localizações (PRO) e empréstimo, e quem pode retirar material reservado. → _Confira: Minha Assinatura e a ata. Fonte: EST C, etapas 3 e 5; EST-MOV-010._

**1. Locais e almoxarifado central** · Estoque > Locais e Estoque > Configurações > Parâmetros de Estoque
- [ ] (doc) Faça: cadastre um segundo local de teste (ex.: depósito). → _Explique ao cliente: locais de obra não se criam aqui: nascem com o projeto. Confira: o local ativo na lista. Fonte: EST C, etapa 1; EST-LOC-003._
- [ ] (doc) Faça: tente marcar o segundo local também como almoxarifado central. → _Explique ao cliente: é um central por empresa. Confira: "A empresa X já possui um almoxarifado central. Rebaixe-o antes de promover outro." Fonte: EST-LOC-002._
- [ ] (doc) Faça: abra os Parâmetros de Estoque e anote, com o cliente, o estado de "Bloquear saída sem saldo" e das regras de movimento retroativo. → _Explique ao cliente: os parâmetros valem para a empresa inteira; "Usar localizações por local" é irreversível. Confira: os valores anotados antes de começar. Fonte: EST C, etapa 2; fluxo antigo de estoque (pré-requisito)._

**2. Saldo inicial na data de corte** · Estoque > Saldo > Mais > Importar saldo
- [ ] (doc) Faça: no assistente de importação de saldo, baixe o modelo e preencha Empresa, Código do produto, Descrição, Local de estoque, Propriedade, Tipo de movimento ("Saldo inicial"), Quantidade, Custo unitário e as medidas e cor que a categoria pede. → _Explique ao cliente: a quantidade vai na unidade de estoque e o custo vira o custo médio de abertura; perfil leva comprimento e cor, superfície leva altura, largura e cor. Confira: o arquivo com as colunas obrigatórias. Fonte: EST C, etapa 4; EST-IMP-002, EST-SLD-005._
- [ ] (doc) Faça: suba a planilha, corrija na Validação até não sobrar linha inválida e execute. → _Explique ao cliente: a planilha não tem data: o movimento nasce no dia em que é aplicada; reimportar o mesmo conteúdo não duplica. Confira: sem "Planilha com N linha(s) inválida(s)…" e o assistente em Concluído. Fonte: EST-IMP-001, EST-IMP-003; README de Suprimentos, S7._
- [ ] (doc) Faça: confira em Mais > Importações de saldo e em Estoque > Movimentos filtrando o tipo "Importação de saldo inicial". → _Explique ao cliente: a importação fica registrada com usuário, data e a planilha original. Confira: os totais por local batem com a planilha do cliente. Fonte: EST-IMP-004, EST-MOV-014._
- [ ] (doc) Faça: tente lançar um movimento no mesmo produto com data anterior à importação. → _Explique ao cliente: é por isso que nada se lança antes do saldo inicial. Confira: "Movimento retroativo bloqueado: já existe movimentação posterior a …". Fonte: EST-MOV-006._

**3. Entradas e saídas manuais** · Estoque > Movimentos > + Novo Movimento
- [ ] (doc) Faça: lance um Ajuste positivo (sobra) e um Ajuste negativo (perda). → _Explique ao cliente: cada ajuste deixa o motivo no extrato. Confira: o saldo acompanha os dois ajustes. Fonte: fluxo antigo de estoque, bloco 1; EST-MOV-002._
- [ ] (doc) Faça: tente uma saída maior que o saldo, com "Bloquear saída sem saldo" ligado e depois desligado. → _Explique ao cliente: é a decisão do cliente se o saldo pode ficar negativo. Confira: ligado, recusa; desligado, passa e o saldo fica negativo. Fonte: fluxo antigo de estoque, bloco 1; EST-MOV-010._

**4. Entradas e saídas automáticas** · Estoque > Movimentos
- [ ] (doc) Faça: depois de uma NF-e de venda autorizada no roteiro de Faturamento, procure a saída do produto. → _Explique ao cliente: a saída nasce na autorização da nota; documento emitido antes da contratação do Estoque não movimenta. Confira: a saída ligada à nota. Fonte: EST C, etapa 7; EST-INT-002._

**6. Transferência e reserva** · Estoque > Transferências e coluna Reservada do Saldo
- [ ] (doc) Faça: tente reservar ou transferir mais que o disponível. → _Explique ao cliente: a reserva é por variação e por local. Confira: a operação é recusada. Fonte: fluxo antigo de estoque, bloco 3; EST-TRF-003._
- [ ] (doc) Faça: com material reservado, lance uma requisição que consumiria a parte reservada. → _Explique ao cliente: é aqui que se decide quem pode retirar material reservado para outro documento. Confira: anote se a saída passou ou foi recusada e o disponível antes e depois. Fonte: fluxo antigo de estoque, bloco 3; EST-MOV-010._

**7. Inventário com ajuste** · Estoque > Inventário e Estoque > Aprovações > Inventários
- [ ] (doc) Faça: tente a 2ª contagem com o mesmo usuário; depois faça-a com outra pessoa. → _Explique ao cliente: duas de três contagens iguais aprovam o item. Confira: o mesmo usuário é recusado ("deve ser feita por outra pessoa"); a outra pessoa grava. Fonte: fluxo antigo de estoque, bloco 4; EST-INV-005, EST-INV-006._
- [ ] (doc) Faça: com um terceiro usuário, revise o resumo, informe o custo de sobras sem custo e aprove. → _Explique ao cliente: quem contou não aprova, nem Super Usuário. Confira: cada diferença vira ajuste com origem inventário, o saldo bate com a contagem e o local é liberado. Fonte: fluxo antigo de estoque, bloco 4; EST-INV-007, EST-INV-008._

**9. Reposição e balanço final** · Estoque > Reposição, Compras > Sugestão de Compra e Estoque > Reservas órfãs
- [ ] (doc) Faça: abra Estoque > Reservas órfãs. → _Explique ao cliente: toda reserva precisa ter um documento pendente. Confira: a lista vazia antes do go-live. Fonte: EST C, etapa 7; EST-RES-003._

**Resultado esperado**
- [ ] (doc) Cada empresa tem almoxarifado central ativo, e o saldo inicial entrou na data de corte conferido contra a planilha.
- [ ] (doc) Entrada manual, ajustes e estorno mudaram o saldo e ficaram no extrato.
- [ ] (doc) O inventário congelou o local, exigiu outras pessoas e gerou o ajuste da diferença.
- [ ] (doc) O balanço do produto fechou em quantidade e valor e não sobraram reservas órfãs.

## Implantação de Produção: roteiro prático com o cliente  `implantacao-11-producao.html` — 10 etapa(s)

**Pré-requisitos**
- [ ] (doc) Etapas de produção, processo e linha de produção cadastrados, e o processo informado no produto (Processo de produção padrão). → _Confira: Produção > Configurações e Cadastros > Produtos. Sem processo no produto a OP não tem etapas, não aparece no Painel de fábrica e o terminal não deixa apontar. Fonte: manual-07-producao, Parte 1 e 1.1._
- [ ] (doc) Pedido de venda de teste ("TESTE FLUXO CONSULTOR") com o produto de teste, e um funcionário cadastrado para apontar. → _Confira: o pedido em Vendas > Pedidos de Venda e o funcionário em Cadastros > Participantes. Fonte: Fluxo de produção (pré-requisitos); procedimento-criar-ordem-de-producao-do-pedido._

**1. Estrutura do produto** · Produção > Configurações > Estrutura de produto
- [ ] (doc) Faça: abra Produção > Configurações > Etapas de produção e Processos de produção e mostre o processo do produto de teste. → _Explique ao cliente: o processo é a sequência de etapas que o produto percorre; a OP copia essas etapas. Confira: as etapas na ordem e o tempo padrão total no rodapé. Fonte: manual-07-producao, 1.1._
- [ ] (doc) Faça: tente criar uma segunda estrutura para o mesmo produto com período sobreposto. → _Explique ao cliente: um produto tem uma estrutura vigente por período. Confira: o sistema impede com mensagem. Fonte: Fluxo de produção, bloco 1._

**3. Requisições e baixa de material** · Mais ações > Materiais necessários
- [ ] (doc) Faça: use a importação da estrutura de novo na mesma OP. → _Explique ao cliente: reimportar refaz os itens de origem Estrutura sem duplicar. Confira: as requisições continuam sem duplicidade. Fonte: Fluxo de produção, bloco 2; regra-producao-requisicoes-nascem-da-estrutura-ao-salvar._

**4. Apontamento: iniciar e finalizar** · botão ▶ da linha da OP, Mais ações > Apontamentos e Produção > Terminal de apontamento
- [ ] (doc) Faça: com o apontamento aberto, tente iniciar outro para o mesmo funcionário na mesma OP. → _Explique ao cliente: um funcionário não aponta duas vezes a mesma OP ao mesmo tempo. Confira: o sistema impede. Fonte: Fluxo de produção, bloco 4._
- [ ] (doc) Faça: abra Produção > Terminal de apontamento e mostre o caminho do chão de fábrica: tarefa Apontar, operador, OP pelo número, etapa e Iniciar. → _Explique ao cliente: o terminal é feito para tablet ou celular na bancada; ao terminar, o operador informa a quantidade Boa e o Refugo e toca em Finalizar. Confira: OP, etapa e operador na tela e o cronômetro rodando; não finalize sem combinar com o responsável pela OP de teste. Fonte: manual-07-producao, 2.4._

**5. Marcar produzido e entrada do produto acabado** · Mais ações > Marcar produzido e Estoque > Movimentos
- [ ] (doc) Faça: na OP Produzida, tente criar uma nova requisição de material. → _Explique ao cliente: OP Produzida ou Cancelada não recebe requisição. Confira: o sistema não aceita. Fonte: Fluxo de produção, bloco 2._

**6. Acompanhamento da fábrica** · Produção > Painel de fábrica, Produção > Separação de materiais e Produção > Visão geral
- [ ] (doc) Faça: abra Produção > Visão geral. → _Explique ao cliente: os insumos que mais travam são a lista de compra do dia para destravar a fábrica. Confira: ritmo do dia, OPs bloqueadas por material e o valor travado. Fonte: manual-07-producao, 2.5._

**Resultado esperado**
- [ ] (doc) O cliente sabe que hoje a finalização do apontamento ainda é recusada e como registrar o caso para o suporte.

## Implantação de Serviços: roteiro prático com o cliente  `implantacao-12-servicos.html` — 3 etapa(s)

**3. Medição: aprovar com outro conferente** · Serviços > Medições (medição "Aguardando Conferência")
- [ ] (doc) Faça: abra Serviços > Dashboard Serviços e role até o Pipeline operacional. → _Explique ao cliente: o pipeline mostra onde os serviços estão parados; estágios em âmbar são gargalos. Confira: a medição de teste em "Aprovadas sem instalação". Fonte: manual-11-servicos, 2.1._

**4. Instalação** · botão Gerar Instalação da medição e Serviços > Instalações
- [ ] (doc) Faça: abra Serviços > Instalações > + Nova Instalação e mostre a aba Medição, sem gerar nada. → _Explique ao cliente: a instalação pode nascer de Pedido de Venda, Ordem de Produção ou Medição; a aba Medição lista as aprovadas que ainda não têm instalação. Confira: a medição de teste na lista. Fonte: manual-11-servicos, 2.3._

**5. Vistoria** · Ver Vistoria na instalação ou Serviços > Vistorias > + Nova Vistoria
- [ ] (doc) Faça: abra a vistoria por Ver Vistoria ou, com a geração automática desligada, por + Nova Vistoria, escolhendo a instalação concluída. → _Explique ao cliente: também existe vistoria avulsa, sem instalação. Confira: a vistoria ligada à instalação de teste. Fonte: manual-11-servicos, 2.4; regra-servicos-passagens-por-botao-e-ordem-dos-aceites._

## Implantação de Expedição: roteiro prático com o cliente  `implantacao-13-expedicao.html` — 24 etapa(s)

**Pré-requisitos**
- [ ] (doc) Endereço de entrega no cadastro do cliente e peso no cadastro do produto. → _Confira: o endereço aparece no resumo da carga; o peso alimenta a ocupação do veículo. Fonte: fluxo antigo "Fluxo de expedição" (pré-requisito); manual-09-expedicao#002._
- [ ] (doc) Checkpoints da empresa definidos: quais etapas (Separação, Conferência, Carregamento) o cliente vai usar. → _Confira: em Expedição > Configurações > Parâmetros. Fonte: manual-09-expedicao#005._

**1. Cadastros da expedição** · Expedição > Configurações
- [ ] (doc) Faça: abra Veículos, clique em + Novo Veículo e cadastre um veículo de teste com Placa, Modelo, Tipo de veículo, capacidade de peso em kg e de volume em m³. Salve. → _Explique ao cliente: a capacidade é usada na montagem para mostrar a ocupação do veículo; peso e volume são obrigatórios. Confira: o veículo aparece na lista com placa e capacidades. Fonte: manual-09-expedicao#003._
- [ ] (doc) Faça: abra Motoristas e confira, em um motorista de teste, CNH, categoria e validade. Se não houver, use + Novo Motorista. → _Explique ao cliente: o sistema alerta quando a CNH vence, e a carga com motorista de CNH vencida só fecha com justificativa. O motorista registra as entregas pelo app Minhas Entregas. Confira: a validade da CNH do motorista que será usado. Fonte: manual-09-expedicao#004; fluxo antigo "Fluxo de expedição"._
- [ ] (doc) Faça: abra Parâmetros e mostre quais checkpoints estão ligados. → _Explique ao cliente: ligue só as etapas que a empresa usa. A ordem é Carga fechada → Separação → Conferência → Carregamento → Saída para entrega. Confira: as etapas ligadas batem com a operação do pátio do cliente. Fonte: manual-09-expedicao#005._
- [ ] (doc) Faça: abra Tipos de Ocorrência e leia com o cliente os tipos cadastrados. → _Explique ao cliente: são os motivos que o motorista vai registrar quando a entrega não acontece como previsto (cliente ausente, avaria, recusa). Confira: os tipos existem antes da primeira rota. Fonte: manual-09-expedicao#002 e #010._

**2. Liberar o pedido faturado** · Vendas > Pedidos de Venda, menu ⋯ do pedido
- [ ] (doc) Faça: abra o menu ⋯ de um pedido Em aberto e procure Liberar para Expedição. → _Explique ao cliente: a ordem é faturar e depois liberar. O aviso da tela Montar Nova Carga manda clicar nesse botão, mas ele só existe em pedido Faturado. Confira: o item não aparece no pedido Em aberto. Fonte: regra-vendas-liberar-para-expedicao-so-em-pedido-faturado._
- [ ] (doc) Faça: abra de novo o menu ⋯ do mesmo pedido. → _Explique ao cliente: enquanto não entra numa carga, a liberação pode ser desfeita. Confira: o item virou Reverter Liberação. Fonte: regra-vendas-liberar-para-expedicao-so-em-pedido-faturado; procedimento-montar-carga-e-liberar-para-expedicao._

**3. Montar a carga** · Expedição > Visão Geral > + Montar Nova Carga
- [ ] (doc) Faça: abra Expedição > Visão Geral e mostre as abas Operacional, Indicadores e Rastreamento e os cartões do ciclo da carga. → _Explique ao cliente: toda carga passa por Em montagem → Fechada → Em rota → Entregue. Confira: os cartões com as cargas em cada fase. Fonte: manual-09-expedicao#006._
- [ ] (doc) Faça: clique em + Montar Nova Carga e tente montar marcando o pedido, mas sem informar Data prevista de saída nem Motorista. → _Explique ao cliente: data de saída e motorista são obrigatórios para a carga existir. Confira: o sistema não monta a carga sem os dois. Fonte: procedimento-montar-carga-e-liberar-para-expedicao._
- [ ] (doc) Faça: se aparecer aviso de produção pendente no pedido, leia o aviso com o cliente antes de seguir. → _Explique ao cliente: o aviso indica item fabricado sem OP concluída; a montagem pode ser autorizada com justificativa, que fica registrada com o usuário. Confira: se a OP do item foi mesmo concluída em Produção. Fonte: manual-09-expedicao#008; fluxo antigo "Fluxo de expedição" (ver naoValidado)._
- [ ] (doc) Faça: na tela da carga, abra o Romaneio e as Etiquetas dos volumes (só a prévia). → _Explique ao cliente: o romaneio acompanha a carga e as etiquetas identificam cada volume para a bipagem. Confira: romaneio com cliente, endereço, pedido, nota e volumes; uma etiqueta por volume. Fonte: manual-09-expedicao#008; fluxo antigo "Fluxo de expedição", bloco 5._

**4. Fechar a carga e fazer os checkpoints** · detalhe da carga
- [ ] (doc) Faça: mostre o botão Reabrir sem clicar. → _Explique ao cliente: reabrir volta a carga para ajustes antes da saída. Confira: o botão está disponível enquanto a carga não saiu. Fonte: manual-09-expedicao#009._

**5. Rota e entrega** · detalhe da carga e Apontamentos do Motorista
- [ ] (doc) Faça: abra Expedição > Visão Geral, aba Indicadores, e escolha o período do teste. → _Explique ao cliente: entregas no prazo, taxa de ocorrências, ocupação média dos veículos e entregas por motorista; a análise completa fica em Demonstrativos. Confira: a entrega de teste entrou no total. Fonte: manual-09-expedicao#011._

**6. Ocorrência na rota** · Apontamentos do Motorista > Ocorrência e Expedição > Ocorrências
- [ ] (doc) Faça: registre uma ocorrência de Cliente Ausente. → _Explique ao cliente: esse tipo não exige foto. Confira: a ocorrência é aceita e fica no histórico da entrega. Fonte: fluxo antigo "Fluxo de expedição", bloco 3._
- [ ] (doc) Faça: tente registrar Mercadoria Avariada sem foto; depois registre com foto. → _Explique ao cliente: avaria exige prova. Confira: sem foto o sistema recusa ("foto obrigatória"); com foto aceita e a foto abre no ERP. Fonte: fluxo antigo "Fluxo de expedição", bloco 3._
- [ ] (doc) Faça: registre uma ocorrência bloqueante e, em outra entrega, uma Entrega Parcial (não bloqueante). → _Explique ao cliente: a bloqueante tira a entrega do caminho e devolve o pedido à fila; a parcial não. Confira: a bloqueante aparece em Expedição > Aguardando Re-Expedição; a parcial não. Fonte: fluxo antigo "Fluxo de expedição", bloco 3._
- [ ] (doc) Faça: filtre Expedição > Ocorrências por tipo e período. → _Explique ao cliente: é a lista que o gestor usa para cobrar a operação. Confira: os números do resumo por tipo batem com a lista. Fonte: fluxo antigo "Fluxo de expedição", bloco 3._

**7. Devolução e re-expedição** · Expedição > Aguardando Re-Expedição e Expedição > Pendências de Estoque (Devolução)
- [ ] (doc) Faça: na entrega com ocorrência bloqueante, use Confirmar devolução. Depois clique de novo. → _Explique ao cliente: a devolução muda a situação da entrega uma única vez. Confira: a entrega passa a Devolvida; confirmar de novo não duplica pendência nem estorno. Fonte: fluxo antigo "Fluxo de expedição", bloco 4._
- [ ] (doc) Faça: abra Pendências de Estoque (Devolução) e, em seguida, o saldo do produto em Estoque > Saldo. → _Explique ao cliente: a devolução não devolve o saldo sozinha; alguém do estoque decide a entrada. Confira: existe uma pendência por produto devolvido e o saldo não subiu. Fonte: fluxo antigo "Fluxo de expedição", bloco 4._
- [ ] (doc) Faça: dê a entrada manual pelo Estoque e marque a pendência como resolvida. Tente resolver de novo. → _Explique ao cliente: a pendência registra quem resolveu e quando. Confira: ela sai da lista de pendentes; resolver duas vezes é recusado. Fonte: fluxo antigo "Fluxo de expedição", bloco 4._
- [ ] (doc) Faça: monte uma nova carga com o pedido que voltou para re-expedição. → _Explique ao cliente: os volumes da entrega anterior saem de circulação. Confira: o saldo por item não dobra na nova carga. Fonte: fluxo antigo "Fluxo de expedição", bloco 4._

**Resultado esperado**
- [ ] (doc) Uma ocorrência bloqueante devolveu o pedido à fila de re-expedição e a devolução gerou pendência de estoque sem mexer no saldo.
- [ ] (doc) O cliente montou e fechou uma carga sozinho, escolhendo o veículo pela ocupação.

## Implantação de Projetos: roteiro prático com o cliente  `implantacao-14-projetos.html` — 24 etapa(s)

**Pré-requisitos**
- [ ] (doc) Um cliente de teste cadastrado em Cadastros > Participantes, com É Cliente? ligado. → _Confira: o participante aparece no seletor Cliente do Novo Projeto. Fonte: procedimento-cadastrar-cliente-produto-e-obra._
- [ ] (doc) Produto de teste, condição de pagamento e permissão para criar projetos, estágios e etapas. → _Confira: o consultor consegue abrir + Novo Projeto e os botões Estágios e Etapas da lista. Fonte: fluxo antigo "Fluxo de projetos e obras" (pré-requisito)._

**1. Cadastrar a obra** · Cadastros > Projetos > Novo Projeto
- [ ] (doc) Faça: tente salvar uma obra sem nome e outra com a data de fim anterior à de início. → _Explique ao cliente: o sistema protege o cadastro antes de a obra receber documentos. Confira: os dois casos são recusados sem perder o que foi digitado. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 1._
- [ ] (doc) Faça: edite a obra pelo lápis e preencha Datas e Orçamento (início, fim previsto e valor orçado), Endereços do Projeto e Resultados Previstos. Salve e reabra. → _Explique ao cliente: o endereço da obra é usado na medição e na instalação; o orçamento e o resultado previsto são a base do previsto × realizado. Confira: os valores voltam iguais ao reabrir. Fonte: manual-12-projetos-e-tarefas#002; fluxo antigo "Fluxo de projetos e obras", bloco 1._
- [ ] (doc) Faça: abra Projetos > Todos os Projetos e filtre pelo status da obra de teste. → _Explique ao cliente: é a visão em cartões da carteira de obras; Ver Painel abre o painel financeiro da obra. Confira: os indicadores do topo (Ativos, Em andamento, Concluídos, Planejamento) batem com a contagem filtrada. Fonte: manual-12-projetos-e-tarefas#005; fluxo antigo "Fluxo de projetos e obras", bloco 1._

**2. Estágios e etapas** · botões Estágios e Etapas na linha da obra
- [ ] (doc) Faça: clique em Estágios e crie três estágios de teste com peso (ex.: 20, 30 e 50). Reordene. → _Explique ao cliente: o estágio organiza a obra em fases. Confira: a nova ordem persiste ao reabrir. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 2; manual-12-projetos-e-tarefas#003._
- [ ] (doc) Faça: clique em Etapas, escolha o Estágio, digite a descrição (ex.: "Medição dos vãos", "Produção das esquadrias", "Instalação") e clique em +. Reordene pela alça ⋮⋮. → _Explique ao cliente: cada etapa pode pertencer a um estágio; a etiqueta Ativa indica que está em uso. Confira: as etapas na ordem escolhida. Fonte: manual-12-projetos-e-tarefas#003; fluxo antigo "Fluxo de projetos e obras", bloco 2._
- [ ] (doc) Faça: marque um estágio como feito e depois reabra-o. → _Explique ao cliente: a conclusão do estágio registra a data automaticamente. Confira: a data de conclusão aparece ao marcar e some ao reabrir. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 2._

**3. Ligar o pedido e a medição à obra** · Vendas > Pedidos de Venda e Serviços > Medições > + Nova Medição
- [ ] (doc) Faça: abra um pedido já Faturado da base de teste e procure como editar o projeto. → _Explique ao cliente: só o pedido Em aberto tem o lápis (Editar pedido); o Faturado só tem Visualizar. Projeto, itens e parcelas se ajustam antes de faturar. Confira: não há edição no pedido faturado. Fonte: regra-vendas-editar-pedido-somente-em-aberto._

**4. Produção e compras da obra** · Produção > Ordens de produção > Nova OP e Compras > Solicitações de Compra
- [ ] (doc) Faça: crie uma OP de teste escolhendo a obra e, em cascata, o estágio e a etapa. → _Explique ao cliente: o estágio só habilita depois da obra e a etapa só depois do estágio; trocar a obra limpa os dois. Confira: a OP aparece na aba Produção da obra. Fonte: fluxo antigo "Fluxo de projetos e obras", blocos 2 e 3._
- [ ] (doc) Faça: crie uma solicitação de compra de teste com a mesma obra, estágio e etapa. → _Explique ao cliente: a compra para a obra entra no custo comprometido dela. Confira: a solicitação aparece na aba Compras da obra e na lista filtrada por Projeto. Fonte: fluxo antigo "Fluxo de projetos e obras", blocos 2 e 3._
- [ ] (doc) Faça: volte a Estágios e tente excluir o estágio usado na OP e na solicitação. → _Explique ao cliente: estágio ou etapa com documento vinculado não pode sumir. Confira: o sistema recusa listando o que trava. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 2._

**5. Nota e títulos da obra** · menu ⋯ > Faturar do pedido e Financeiro > Contas a Receber
- [ ] (doc) Faça: gere os títulos do pedido e abra Financeiro > Contas a Receber filtrando pela obra. → _Explique ao cliente: os títulos herdam a obra do pedido e alimentam o "A receber" do painel. Confira: os títulos aparecem com a obra. Fonte: fluxo antigo "Fluxo de projetos e obras", pré-requisitos; manual-12-projetos-e-tarefas#002._
- [ ] (doc) Faça: abra as abas da obra (Produção, Campo, Compras) e confira os documentos criados. → _Explique ao cliente: a obra junta tudo o que foi feito para ela. Confira: pedido, medição, OP, solicitação e nota aparecem nas abas e nos filtros por Projeto. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 3._

**6. Painéis da obra: previsto × realizado** · Financeiro > Painel Financeiro de Projetos e módulo Projetos
- [ ] (doc) Faça: leia com o cliente os Avisos inteligentes e as Pendências do projeto e clique na seta de uma pendência. → _Explique ao cliente: as pendências apontam pedido sem faturamento e medição em aberto; a seta leva direto ao documento. Confira: a medição de teste aparece como pendência e abre ao clicar. Fonte: manual-12-projetos-e-tarefas#006; fluxo antigo "Fluxo de projetos e obras", bloco 4._
- [ ] (doc) Faça: explique a regra do painel comparando com o Financeiro. → _Explique ao cliente: no painel, custo é o destinado ou comprometido (não o caixa) e receita é a nota autorizada (não o pedido). Confira: diferenças entre painel e Financeiro por causa dessa regra não são erro. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 4._
- [ ] (doc) Faça: abra Andamento das Obras e escolha a obra. → _Explique ao cliente: a linha do tempo mostra quantas peças estão em cada fase, de Vendido a Entregue; Divergências mostra peças sem item de pedido. Confira: o avanço físico da obra de teste. Fonte: manual-12-projetos-e-tarefas#007._
- [ ] (doc) Faça: abra Plano de Resultado, Comparar Obras e Dashboard Projetos. → _Explique ao cliente: o plano compara o previsto com o realizado por categoria; o dashboard mostra Vendido, Não faturado, Lucro e as obras que precisam de atenção. Confira: a obra de teste aparece com o previsto informado no cadastro. Fonte: manual-12-projetos-e-tarefas#008; fluxo antigo "Fluxo de projetos e obras", bloco 4._

**7. Diário e ciclo de vida da obra** · Projetos > Diário de Obra e ações da linha da obra
- [ ] (doc) Faça: faça uma postagem de teste no Diário de Obra. → _Explique ao cliente: o diário recebe também os serviços de campo das obras que têm projeto no pedido. Confira: a postagem aparece na obra. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 5._
- [ ] (doc) Faça: inative a obra e procure-a no seletor de um novo pedido. Depois reative. → _Explique ao cliente: obra inativa some dos seletores, mas os documentos já emitidos continuam apontando para ela. Confira: some ao inativar e volta ao reativar. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 5._
- [ ] (doc) Faça: tente excluir a obra de teste, que já tem documentos. → _Explique ao cliente: obra com documento não se exclui; para encerrar, prefira inativar. Confira: o sistema recusa listando os vínculos. Fonte: fluxo antigo "Fluxo de projetos e obras", bloco 5._

**Resultado esperado**
- [ ] (doc) Pedido, medição, OP, solicitação de compra, nota e títulos estão ligados à obra e aparecem nas abas e filtros.
- [ ] (doc) O Painel Financeiro de Projetos mostra vendido, faturado, a receber e resultado coerentes com os documentos.
- [ ] (doc) O cliente sabe que o projeto vai no pedido antes de faturar.

## Implantação de Tarefas: roteiro prático com o cliente  `implantacao-15-tarefas.html` — 35 etapa(s)

**Pré-requisitos**
- [ ] (doc) Licença do módulo Tarefas ativa para a empresa do cliente. → _Confira: o módulo Tarefas aparece no ícone de grade (menu de módulos). Fonte: fluxo antigo "Fluxo de tarefas" (pré-requisito); manual-12-projetos-e-tarefas#001._
- [ ] (doc) Dois usuários de teste: o gestor que cria o quadro e um executor que será o responsável do cartão, com uma segunda sessão aberta. → _Confira: os dois aparecem na busca de + Adicionar responsável. Fonte: fluxo antigo "Fluxo de tarefas" (pré-requisito)._
- [ ] (doc) Combinado com o cliente como os quadros serão organizados (um por departamento ou por obra) e quais listas cada um terá. → _Confira: os nomes das listas antes de criar. Fonte: manual-12-projetos-e-tarefas#004._

**1. Abrir o módulo e criar o quadro** · Tarefas > Meus Quadros
- [ ] (doc) Faça: abra o módulo Tarefas pelo ícone de grade (menu de módulos) e entre em Meus Quadros. → _Explique ao cliente: hoje a busca Ctrl+K ainda não encontra o módulo Tarefas; até a correção, abra pelo menu de módulos. Confira: a tela Meus Quadros e o que já existe nela. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; faq-limitacoes-conhecidas-v1-22-12; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel._
- [ ] (doc) Faça: clique em Novo Quadro e tente criar com o nome vazio. → _Explique ao cliente: o quadro precisa de nome para aparecer nos seletores e na busca. Confira: o sistema recusa nome vazio ou só com espaços. Fonte: fluxo antigo "Fluxo de tarefas", bloco 1._
- [ ] (doc) Faça: informe o Nome do Quadro (ex.: "TESTE FLUXO CONSULTOR - Obras"), escolha o Tipo (Avulso) e clique em Criar Quadro. → _Explique ao cliente: um quadro por equipe ou por obra; A partir de Modelo copia a estrutura de um quadro-modelo. Confira: o quadro aparece em Meus Quadros. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#004._
- [ ] (doc) Faça: abra o quadro clicando no nome dele. → _Explique ao cliente: o quadro nasce vazio e as listas são as colunas do trabalho. Confira: o quadro novo ainda não tem listas. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel._

**2. Criar as listas** · dentro do quadro, + Adicionar lista
- [ ] (doc) Faça: em + Adicionar lista, crie as listas "A fazer", "Em andamento", "Revisão" e "Feito". → _Explique ao cliente: sem lista não há onde criar o cartão. Confira: as quatro colunas aparecem no quadro. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009._
- [ ] (doc) Faça: renomeie uma lista e reordene as listas arrastando. Recarregue a página. → _Explique ao cliente: a ordem das listas é a mesma para toda a equipe. Confira: a ordem final se mantém, inclusive na segunda sessão. Fonte: fluxo antigo "Fluxo de tarefas", bloco 1._
- [ ] (doc) Faça: defina limite de trabalho (WIP) = 2 na lista "Em andamento" e tente mover um terceiro cartão para ela (faça depois do bloco 3, quando houver cartões). → _Explique ao cliente: o limite evita que a equipe comece tudo ao mesmo tempo. Confira: o limite aparece na lista e o terceiro movimento é bloqueado com mensagem; o cartão não some. Fonte: fluxo antigo "Fluxo de tarefas", bloco 2._
- [ ] (doc) Faça: tente excluir uma lista com cartões. → _Explique ao cliente: os cartões não podem ficar sem lista. Confira: a exclusão é bloqueada ou exige transferir os cartões. Fonte: fluxo antigo "Fluxo de tarefas", bloco 1._

**3. Cartão com responsável e prazo** · lista do quadro e detalhe da tarefa
- [ ] (doc) Faça: na lista "A fazer", clique em + Adicionar tarefa, digite o nome (ex.: "Agendar vistoria da obra de teste") e crie o cartão. → _Explique ao cliente: o cartão aparece na coluna e pode ser arrastado entre as listas. Confira: o cartão na lista "A fazer". Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009._
- [ ] (doc) Faça: abra o cartão e leia com o cliente como ele nasceu. → _Explique ao cliente: o cartão nasce Pendente, prioridade Média e sem responsável. Confira: status, prioridade e o campo de responsáveis vazio. Fonte: regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel._
- [ ] (doc) Faça: defina Prioridade Alta e o Término Previsto com data e hora. → _Explique ao cliente: o prazo é o campo Término Previsto (não existe "Prazo"); os atrasos aparecem no Dashboard. Tudo é salvo automaticamente. Confira: a mensagem "Tarefa atualizada!". Fonte: regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel; manual-12-projetos-e-tarefas#009._
- [ ] (doc) Faça: tente informar um término anterior ao início do cartão. → _Explique ao cliente: o sistema protege o prazo contra datas invertidas. Confira: a data invertida é recusada. Fonte: fluxo antigo "Fluxo de tarefas", bloco 3._
- [ ] (doc) Faça: clique em + Adicionar responsável, digite parte do nome do executor de teste e escolha o usuário. → _Explique ao cliente: só com responsável o cartão passa a ser cobrado de alguém. Confira: a confirmação "adicionado como responsável". Fonte: manual-12-projetos-e-tarefas#009; procedimento-criar-quadro-e-cartao-em-tarefas._

**4. Minhas Tarefas e Dashboard** · Tarefas > Minhas Tarefas e Tarefas > Dashboard
- [ ] (doc) Faça: na sessão do executor, abra Minhas Tarefas. Compare com um cartão de teste ainda sem responsável. → _Explique ao cliente: Minhas Tarefas mostra só o que está atribuído ao usuário logado; cartão sem responsável não aparece para ninguém. Confira: o cartão com responsável aparece; o sem responsável não. Fonte: regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel; manual-12-projetos-e-tarefas#010._
- [ ] (doc) Faça: mostre os contadores e agrupe por Status e por Prioridade. → _Explique ao cliente: os contadores de Em andamento, Atrasadas, Urgentes e Concluídas são a rotina diária do executor; + Nova tarefa cria direto dali. Confira: o cartão de teste no grupo certo. Fonte: manual-12-projetos-e-tarefas#010._
- [ ] (doc) Faça: na sessão do gestor, abra o Dashboard e filtre pelo quadro de teste. → _Explique ao cliente: Tarefas Atrasadas, Vencem em 7 dias e Carga por Responsável mostram quem está sobrecarregado; Exportar gera a planilha. Confira: o cartão de teste conta no quadro e no responsável certos. Fonte: manual-12-projetos-e-tarefas#010._

**5. Status e regras do cartão** · detalhe da tarefa
- [ ] (doc) Faça: mova o cartão para "Em andamento" pelo ícone "Mover para outra lista" e, depois, arrastando. → _Explique ao cliente: as duas formas dão o mesmo resultado e respeitam o limite da lista. Confira: o cartão na nova lista. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009._
- [ ] (doc) Faça: leve o cartão até Concluída e reabra. → _Explique ao cliente: a data de conclusão é preenchida ao concluir e retirada ao reabrir; o histórico registra cada mudança. Confira: a data de conclusão e a aba Histórico. Fonte: fluxo antigo "Fluxo de tarefas", bloco 3._
- [ ] (doc) Faça: crie uma subtarefa no cartão e tente concluir o cartão com ela aberta. → _Explique ao cliente: o trabalho só fecha quando as partes fecham. Confira: a conclusão é impedida e o sistema diz o que falta. Fonte: fluxo antigo "Fluxo de tarefas", bloco 3; manual-12-projetos-e-tarefas#009._
- [ ] (doc) Faça: cancele um cartão de teste e tente reabri-lo. → _Explique ao cliente: cancelado é definitivo; para pausar, use outra lista ou status. Confira: a reabertura é impedida. Fonte: fluxo antigo "Fluxo de tarefas", bloco 3._

**6. Colaboração e visões** · abas do detalhe da tarefa e visões do quadro
- [ ] (doc) Faça: na aba Comentários, publique um comentário com @menção ao executor de teste. → _Explique ao cliente: a pessoa mencionada é notificada uma única vez; o autor não recebe a própria notificação. Confira: a notificação na sessão do executor. Fonte: manual-12-projetos-e-tarefas#009; fluxo antigo "Fluxo de tarefas", bloco 4._
- [ ] (doc) Faça: na aba Checklists, crie um checklist com três itens e marque dois. → _Explique ao cliente: o checklist divide a atividade sem criar cartões novos. Confira: o percentual atualiza na hora. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; fluxo antigo "Fluxo de tarefas", bloco 4._
- [ ] (doc) Faça: na aba Anexos, anexe um arquivo de teste válido e tente um acima de 10 MB. → _Explique ao cliente: os anexos ficam com o cartão, mas há limite de tamanho e de tipo. Confira: o arquivo válido entra; o grande é recusado. Fonte: fluxo antigo "Fluxo de tarefas", bloco 4._
- [ ] (doc) Faça: use Vincular para ligar o cartão ao pedido ou à obra de teste e abra o vínculo. → _Explique ao cliente: o vínculo leva do cartão direto ao registro do ERP. Confira: o vínculo abre o registro certo. Fonte: manual-12-projetos-e-tarefas#009; fluxo antigo "Fluxo de tarefas", bloco 5._
- [ ] (doc) Faça: alterne as visões Kanban, Lista, Tabela, Calendário e Gantt e aplique Filtros por responsável. → _Explique ao cliente: é o mesmo quadro em formatos diferentes. Confira: o cartão de teste mostra a mesma informação em todas as visões. Fonte: manual-12-projetos-e-tarefas#009; fluxo antigo "Fluxo de tarefas", bloco 5._

**7. Arquivar e restaurar** · cabeçalho do cartão e Tarefas > Arquivadas
- [ ] (doc) Faça: arquive o cartão de teste pelo cabeçalho do detalhe. → _Explique ao cliente: arquivar tira o cartão do quadro, mas não apaga. Confira: o cartão some do quadro e de Minhas Tarefas. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel._
- [ ] (doc) Faça: abra Tarefas > Arquivadas, abra o cartão e clique em Restaurar. → _Explique ao cliente: o arquivado abre só para leitura até ser restaurado. Confira: o cartão volta ao quadro com comentários, checklist e anexos. Fonte: procedimento-criar-quadro-e-cartao-em-tarefas; fluxo antigo "Fluxo de tarefas", bloco 4._
- [ ] (doc) Faça: arquive o quadro de teste e restaure; depois tente arquivar o quadro padrão. → _Explique ao cliente: o quadro padrão de tarefas avulsas é fixo. Confira: o quadro de teste volta ao restaurar; o padrão não pode ser renomeado nem arquivado. Fonte: fluxo antigo "Fluxo de tarefas", bloco 1._

**Resultado esperado**
- [ ] (doc) O quadro de teste tem listas criadas pelo cliente e um cartão com responsável, prioridade e Término Previsto.
- [ ] (doc) O cartão apareceu em Minhas Tarefas do executor e no Dashboard do gestor.
- [ ] (doc) O sistema impediu concluir o cartão com subtarefa aberta e reabrir o cancelado.
- [ ] (doc) Comentário com menção, checklist, anexo e vínculo funcionaram, e o cartão arquivado foi restaurado com tudo.

## Onboarding do estagiário  `00-onboarding-estagiario.html` — 18 etapa(s)

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

**Semana 5 — Os fluxos dos módulos mais maduros (grupo "Fluxos principais do estagiário" da biblioteca)**
- [ ] (doc) Concluir o Fluxo principal 1 · Vendas (ajustar o pedido, entender os status e achá-lo nos painéis).
- [ ] (doc) Concluir o Fluxo principal 2 · Faturamento (faturar em homologação, conferir e finalizar a nota sem transmitir, com autorização).
- [ ] (doc) Concluir o Fluxo principal 3 · Financeiro (gerar títulos, receber numa conta de teste, conferir saldos e ler o fluxo de caixa).
- [ ] (doc) Mostrar ao supervisor o mesmo pedido nos três módulos e dizer onde os números divergiram. → _Os pontos de divergência conhecidos estão nos "Pontos de atenção" de cada checklist._
