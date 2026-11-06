/* Checklists de implantação do consultor, um por módulo, gerados do Harness Faktory Flow
   (GUIA-CHECKLISTS-IMPLANTACAO/*.json, por tools/guia/gerar_dados_checklists_implantacao.py).
   Fontes: regras oficiais e manuais de implantação da gestora de produto (29/10/2026), Apostila do Consultor e base do Harness.
   Substituem os fluxos do consultor anteriores (preservados no git, tag checklists-consultor-v1).
   Não edite à mão: corrija o JSON no Harness e gere de novo. */

export const CHECKLISTS_IMPLANTACAO = [
 {
  "id": "implantacao-fundacao",
  "arquivo": "implantacao-01-fundacao.html",
  "etiqueta": "Consultor · Implantação · Fundação",
  "titulo": "Implantação da Fundação: roteiro prático com o cliente",
  "subtitulo": "Configure o ambiente junto com o cliente, na ordem em que um cadastro depende do outro: empresa e regime, certificado e série, usuários, participantes, produtos e seus cadastros de apoio, pagamento e CFOP. No fim, prove tudo num pedido de teste.",
  "objetivo": "Ao final, o cliente viu a própria empresa configurada em homologação, cada usuário entrando com o perfil certo e um pedido de teste salvo com o cliente, o produto, a condição de pagamento e o CFOP que ele mesmo cadastrou. O administrador do cliente sabe convidar um usuário, cadastrar um cliente e um produto e corrigir um cadastro recusado.",
  "rodape": "Checklist de implantação · Fundação · fontes: manual de implantação, regras e checklist da Fundação (gestora); trilha do estagiário 02 Cadastros e 04 Vendas; procedimento Cadastrar cliente, produto e obra; Manual 01 Cadastros Base · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "O cliente entregou com antecedência: cartão CNPJ, CNAE, IE, IM e regime de cada empresa (conferidos com o contador), o certificado digital A1 de cada CNPJ emitente, a série e o número da última NF-e, a lista de usuários com e-mail exclusivo e função, e as bases de clientes, fornecedores e produtos.",
    "r": "**Confira:** a lista de documentos pedida antes do kickoff. **Fonte:** Fundação C, pré-requisitos do cliente.",
    "s": "d"
   },
   {
    "t": "A versão contratada aceita o regime de todas as empresas e cabe o número de empresas e de usuários previstos.",
    "r": "**Confira:** em `Minha Assinatura`. Lucro Presumido, Lucro Real e excesso de sublimite não gravam nas versões Starter e Standard; convite pendente ocupa vaga. **Fonte:** CAD-EMP-005, CAD-EMP-019; Fundação D, seção 1.",
    "s": "d"
   },
   {
    "t": "A licença e os módulos foram liberados pela Faktory e o administrador do cliente consegue entrar.",
    "r": "**Confira:** os módulos contratados aparecem sem cadeado no menu. Módulo fora do plano responde “Módulo não contratado” e se resolve no comercial. **Fonte:** Fundação C, pré-requisitos técnicos; Fundação D, seção 1.",
    "s": "d"
   },
   {
    "t": "Decisão tomada com o cliente: como ele vende cada tipo de material (por unidade, por peso ou por área).",
    "r": "**Confira:** a resposta anotada na ata do kickoff. É a decisão que define o “Preço calculado por” de cada categoria. **Fonte:** Fundação C, questionário P1; CAD-PRO-020, CAD-CAT-001.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Empresa e regime",
    "onde": "`Minha Assinatura` e `Configurações > Empresas`",
    "intro": "Tudo começa na empresa: o regime e o endereço dela decidem os impostos de cada pedido e nota. Faça com o cliente e com os dados do contador na mão.",
    "passos": [
     {
      "t": "**Faça:** abra `Minha Assinatura` com o administrador do cliente e leia a versão, o limite de empresas, o limite de usuários e os módulos contratados.",
      "r": "**Explique ao cliente:** a licença limita empresas, usuários e regimes; estourar o limite trava o cadastro no meio da implantação. **Confira:** os números batem com o que foi vendido. **Fonte:** Fundação C, pré-requisitos comerciais; CAD-EMP-019.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra a empresa criada no registro da conta e confira CNPJ, razão social, CNAE, regime de apuração e endereço completo contra o cartão CNPJ. Corrija o CNAE e preencha o regime.",
      "r": "**Explique ao cliente:** a primeira empresa nasce com CNAE fixo e sem regime; o regime define o cálculo de impostos em todo o sistema. O **CNPJ não muda depois de salvo**. **Confira:** a empresa salva sem o aviso “Cadastro da empresa incompleto”. **Fonte:** Fundação C, etapa 1; CAD-EMP-001, CAD-EMP-003, CAD-EMP-011.",
      "s": "d"
     },
     {
      "t": "**Faça:** preencha a IE e, se a empresa emite NFS-e no modelo tradicional, a Inscrição Municipal. Se o cliente quiser, envie o logo e a cor da marca.",
      "r": "**Explique ao cliente:** a Inscrição Municipal é obrigatória para a NFS-e tradicional; o logo sai na nota. **Confira:** os campos salvos na empresa. **Fonte:** Fundação C, etapa 1; CAD-EMP-002, CAD-EMP-013.",
      "s": "d"
     },
     {
      "t": "**Faça:** cadastre as filiais (ou as outras empresas do grupo) com os mesmos cuidados.",
      "r": "**Explique ao cliente:** todo usuário vê todas as empresas; não há restrição por filial. **Confira:** cada empresa ativa aparece na lista e cabe no limite da versão. CNPJ “já cadastrado em outro tenant” indica a empresa em outra conta do Flow: acione o suporte. **Fonte:** Fundação C, etapa 1 e questionário E5; CAD-EMP-004, CAD-EMP-008.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Certificado digital, série e homologação",
    "onde": "`Faturamento > Configurações > Certificados`",
    "intro": "Sem certificado e série não existe nota. Este bloco deixa a empresa pronta para emitir, mas sempre em homologação até o fim dos testes.",
    "passos": [
     {
      "t": "**Faça:** envie o arquivo .pfx do certificado A1 de cada empresa e peça ao cliente para digitar a senha quando a tela pedir.",
      "r": "**Explique ao cliente:** o certificado assina as notas; o sistema avisa o vencimento a partir de 30 dias. A senha é do cliente: o consultor não digita nem guarda. **Confira:** a situação e a validade do certificado na tela; anote o vencimento na ata. Certificado vencido ou senha errada são recusados. **Fonte:** Fundação C, etapa 2; Fundação D, seção 3; CAD-EMP-006.",
      "s": "d",
      "campo": "Vencimento do certificado"
     },
     {
      "t": "**Faça:** abra “Configurar Série NF-e” na mesma tela e informe a série e o próximo número, continuando a numeração do sistema antigo.",
      "r": "**Explique ao cliente:** o número da nota é dado ao transmitir e nunca volta; por isso a série precisa estar certa antes da primeira transmissão. **Confira:** a série gravada. Série repetida responde “Já existe uma série X para esta empresa no ambiente Y”: edite a existente. **Fonte:** Fundação C, etapa 2; CAD-EMP-006; README da cadeia comercial, decisão X5.",
      "s": "d",
      "campo": "Série e próximo número"
     },
     {
      "t": "**Faça:** confirme que o ambiente da empresa está em **homologação**.",
      "r": "**Explique ao cliente:** em homologação a nota vale só para teste; a virada para produção é combinada no fim da cadeia comercial. **Confira:** o ambiente na tela de Certificados ou de Empresas. **Fonte:** Fundação C, etapa 2; Fundação D, seção 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** sincronize o emitente com o provedor de emissão pela opção da própria tela de certificados.",
      "r": "**Explique ao cliente:** a sincronização leva os dados da empresa ao provedor que transmite as notas. **Confira:** a resposta sem aviso pendente; se faltar dado da NFS-e, a resposta avisa e a NFS-e fica de fora. **Fonte:** Fundação C, etapa 2; Fundação D, seção 3.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Perfis e usuários",
    "onde": "`Segurança > Perfis de Acesso` e `Segurança > Usuários`",
    "intro": "Cada pessoa entra com o perfil da sua função. Faça antes dos cadastros para o próprio cliente executar o resto do roteiro com o usuário dele.",
    "passos": [
     {
      "t": "**Faça:** abra `Segurança > Perfis de Acesso` e mostre os perfis prontos; escolha com o cliente o perfil de cada função da lista de usuários.",
      "r": "**Explique ao cliente:** o sistema já traz 32 perfis; crie perfil novo só se nenhum servir. Quem cancela nota precisa de um perfil fiscal com essa permissão (o Faturista emite, mas não cancela). **Confira:** cada função da lista tem um perfil escolhido. **Fonte:** Fundação C, etapa 3; README da cadeia comercial, decisão X8.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Segurança > Usuários`, clique em “Convidar Usuário” e convide cada pessoa já com o perfil.",
      "r": "**Explique ao cliente:** o e-mail é único em todo o Flow; só administrador convida administrador. **Confira:** o usuário na lista com o perfil. **Fonte:** Fundação C, etapa 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente convidar um usuário com um e-mail que já existe no Flow.",
      "r": "**Explique ao cliente:** cada pessoa precisa de e-mail próprio, mesmo que use o Flow em outra empresa. **Confira:** o sistema recusa com “Email já está em uso” (ou “Este email já está cadastrado no sistema”). **Fonte:** Fundação C, questionário U2 e erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira na lista que todo usuário ativo tem perfil e cancele os convites pendentes que não serão usados. Peça a um usuário de cada perfil para entrar e navegar.",
      "r": "**Explique ao cliente:** usuário sem perfil entra e não vê nada; convite pendente ocupa vaga na licença (“Limite de usuários atingido”). **Confira:** cada perfil vê o que deve e não vê o resto; anote por perfil. **Fonte:** Fundação C, etapa 3; Fundação D, seção 4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Participantes: clientes, fornecedores e vendedores",
    "onde": "`Cadastros > Participantes`",
    "intro": "Cliente, fornecedor, vendedor e lead são o mesmo cadastro, com chaves diferentes. Cadastre um cliente real com o cliente olhando e mostre onde cada dado vai parar.",
    "passos": [
     {
      "t": "**Faça:** crie um participante “TESTE FLUXO CONSULTOR - Cliente”: em **Dados Gerais**, **Tipo (PF/PJ)**, **Razão Social / Nome**, **CPF/CNPJ** e **Inscrição Estadual / RG**; em **Endereço**, **CEP** e **Número**; em **Classificação**, ligue **É Cliente?**; em **Contato > Adicionar Contato**, um e-mail de teste. Clique em `Salvar`.",
      "r": "**Explique ao cliente:** o CEP preenche o endereço; IE, Bairro, Estado e Cidade são obrigatórios em papel de negócio (use “ISENTO” quando couber). **Confira:** a mensagem “Registro salvo com sucesso!”. Se o CEP trouxer bairro com menos de 3 letras, digite um bairro mais longo. **Fonte:** trilha do estagiário 02, bloco 1; procedimento Cadastrar cliente, produto e obra; CAD-PAR-003.",
      "s": "v",
      "campo": "Código do cliente"
     },
     {
      "t": "**Faça:** no mesmo participante, preencha a **Conta de Fluxo de Caixa Receita** (seção **Receita / Despesa**).",
      "r": "**Explique ao cliente:** o pedido de venda usa essa conta no financeiro; sem ela o financeiro do pedido fica incompleto. **Confira:** o campo salvo. **Fonte:** trilha do estagiário 02, bloco 1; procedimento Cadastrar cliente, produto e obra.",
      "s": "v"
     },
     {
      "t": "**Faça:** mostre a seção **Classificação** (É Cliente?, É Fornecedor?, É Funcionário?, É Transportadora?, É Vendedor?, Prospect/Lead) e a seção **Contato**, com quem recebe e-mails de Notas Fiscais, Boletos, Vendas e avisos.",
      "r": "**Explique ao cliente:** o lead do CRM vira este mesmo participante; as marcas do contato decidem quem recebe a nota e o boleto. **Confira:** com o cliente, quem recebe a nota e o boleto de cada cliente. **Fonte:** trilha do estagiário 02, bloco 2; CAD-CON-002.",
      "s": "v"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente salvar outro participante com o mesmo CPF/CNPJ.",
      "r": "**Explique ao cliente:** o sistema não aceita documento duplicado; antes de criar, pesquise. Por isso a base precisa ser limpa antes da carga. **Confira:** a recusa “CNPJ/CPF … já está cadastrado” (ou “possui cadastro inativo”: reative o existente). **Fonte:** Fundação C, erros comuns; CAD-PAR-006; trilha do estagiário 02, bloco 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** cadastre um vendedor (participante com **É Vendedor?**) e ligue-o ao usuário dele.",
      "r": "**Explique ao cliente:** a ligação entre vendedor e usuário é de um para um e é usada no pedido e na comissão. **Confira:** o vendedor aparece para escolha no pedido de venda (bloco 9). **Fonte:** Fundação C, questionário U3; CAD-PAR-012; Fundação D, seção 8.",
      "s": "d",
      "campo": "Código do vendedor"
     }
    ]
   },
   {
    "titulo": "5. Categorias, unidades, NCM, cores e produtos",
    "onde": "grupo `Configurações` do módulo (`Categorias de Produto`, `Unidade de Medida`, `Cores`), `Fiscal > Configurações > NCM` e `Cadastros > Produtos`",
    "intro": "A categoria decide como o preço é calculado e o tipo do material. Acerte com o cliente antes de cadastrar produtos e muito antes de lançar saldo.",
    "passos": [
     {
      "t": "**Faça:** abra `Categorias de Produto` e revise com o cliente as categorias de fábrica; crie as que faltarem com o **tipo** e o **Preço calculado por** (unidade, peso ou área) decididos no kickoff.",
      "r": "**Explique ao cliente:** perfil costuma ser por peso e vidro por área; o tipo da categoria fica travado depois que algum produto tem saldo (“Não é possível trocar o tipo desta categoria…”). **Confira:** a lista de categorias aprovada pelo cliente. **Fonte:** Fundação C, etapa 4.1; CAD-CAT-001, CAD-CAT-002, CAD-CAT-004.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Unidade de Medida`, confira as unidades de fábrica e crie só as que faltam, com sigla de até 6 letras.",
      "r": "**Explique ao cliente:** a sigla do produto precisa existir igual na empresa (“PÇ” é diferente de “PC”); senão o pedido falha ao salvar. **Confira:** nenhuma unidade em uso com sigla longa. **Fonte:** Fundação C, etapa 4.2; CAD-UNI-001; trilha do estagiário 02, bloco 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Fiscal > Configurações > NCM`, cadastre os NCMs que o cliente usa e não estão na lista de fábrica. Se o cliente não integra com o CEM, cadastre as cores em `Cores`.",
      "r": "**Explique ao cliente:** o NCM é obrigatório na nota e precisa ter o CST de PIS/COFINS de saída para os impostos saírem calculados. Quem integra com o CEM recebe as cores sozinho. **Confira:** os NCMs da base do cliente aparecem na lista. **Fonte:** Fundação C, etapas 4.3 e 4.5; Manual 01 Cadastros Base; procedimento Cadastrar cliente, produto e obra.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Cadastros > Produtos`, crie um produto “TESTE FLUXO CONSULTOR - Produto” com **Descrição**, **Categoria do Produto** e, em **Classificações Fiscais**, **Unidade de Medida**, **NCM** e **Origem da Mercadoria**. Clique em `Salvar`.",
      "r": "**Explique ao cliente:** são 5 campos obrigatórios; o produto é usado em pedido, compra, estoque, produção e nota. **Confira:** o produto salvo com a categoria e a unidade certas. **Fonte:** trilha do estagiário 02, bloco 1; procedimento Cadastrar cliente, produto e obra.",
      "s": "v",
      "campo": "Código do produto"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente salvar um produto sem NCM ou sem categoria.",
      "r": "**Explique ao cliente:** a planilha de carga aplica a mesma régua; por isso a base precisa ter NCM e categoria em todas as linhas. **Confira:** a recusa “NCM é obrigatório” ou “Categoria do produto é obrigatória”. **Fonte:** Fundação C, erros comuns; CAD-PRO-001, CAD-PRO-002.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Condições e meios de pagamento, contas e portadores",
    "onde": "`Vendas > Configurações > Condições de Pagamento` e o grupo `Configurações` do Financeiro (`Contas Bancárias`, `Portadores`, `Planos de Conta`, `Meios de Pagamento`)",
    "intro": "O pedido já nasce com parcelas, meio de pagamento e conta. Estes cadastros vêm antes do primeiro pedido, mesmo que o Financeiro seja implantado depois.",
    "passos": [
     {
      "t": "**Faça:** em `Condições de Pagamento`, clique em **+ Nova Condição**, informe a **Descrição** (ex.: “28/42/56 dias”), o **Tipo** A Prazo, use **+ Adicionar** até ter as parcelas, informe os **Dias** e clique em **Criar Condição de Pagamento**.",
      "r": "**Explique ao cliente:** cada parcela vira um título; os dias contam da emissão da nota. **Confira:** o selo **Total** em 100,00% e a mensagem “Condição de pagamento criada com sucesso!”. Sem 100% o sistema não grava. **Fonte:** Manual 01 Cadastros Base, 1.4; Fundação C, etapa 5.5.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Meios de Pagamento`, mostre os meios de fábrica e o tipo de cada um que o cliente usa (Boleto ou outro).",
      "r": "**Explique ao cliente:** meio do tipo Boleto exige conta bancária emissora de boletos ao gerar títulos; evite criar meio com tipo digitado livre. **Confira:** o tipo de cada meio que o cliente vai usar. **Fonte:** Fundação C, etapa 5.6; teste do fluxo completo, bloco 7.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Contas Bancárias`, cadastre cada conta do cliente e marque a favorita para boleto, se ele emite boleto.",
      "r": "**Explique ao cliente:** a conta bancária é obrigatória na baixa e a favorita é a emissora do boleto. **Confira:** as contas batem com o extrato do cliente. **Fonte:** Fundação C, etapa 5.2; FIN-CTA-001; Fundação D, seção 6.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Portadores`, crie os bancos que recebem; em `Planos de Conta`, use o de fábrica ou monte o do contador.",
      "r": "**Explique ao cliente:** o portador diz onde o dinheiro entra; o plano de contas classifica receitas e despesas e precisa do aval do contador. **Confira:** o plano aprovado pelo contador. **Fonte:** Fundação C, etapas 5.3 e 5.4; Fundação D, seção 6.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. CFOPs de saída",
    "onde": "`Fiscal > Configurações > CFOP`",
    "intro": "O CFOP decide se o pedido exige condição e parcelas, se a nota gera título e se mexe no estoque. Revise com o contador antes do primeiro pedido.",
    "passos": [
     {
      "t": "**Faça:** abra a lista de CFOPs e localize, com o contador, os de venda que o cliente usa (ex.: 5101 produto fabricado, 5102 revenda, 6101/6102 fora do estado).",
      "r": "**Explique ao cliente:** não existe cadastro de natureza de operação; a natureza é a descrição do CFOP. **Confira:** os CFOPs usados estão ativos na lista. **Fonte:** Manual 03 Vendas, 1.2; README da cadeia comercial, decisão X1.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira em cada CFOP de saída se ele gera financeiro e movimenta estoque, conforme o contador.",
      "r": "**Explique ao cliente:** CFOP de remessa marcado como gerador de financeiro obriga condição, plano e parcelas no pedido; o contrário deixa venda sem título. **Confira:** a decisão de cada CFOP anotada na ata. **Fonte:** Vendas C, etapa 1; VEN-PED-001; README da cadeia comercial, decisão X1.",
      "s": "d"
     },
     {
      "t": "**Faça:** anote quais CFOPs serão o padrão do pedido de venda e da integração com o CEM.",
      "r": "**Explique ao cliente:** esses padrões vão para os Padrões de Integração no módulo de integração. **Confira:** a lista anotada e entregue ao responsável fiscal. **Fonte:** Fundação C, etapa 6.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "8. Carga inicial de produtos e participantes",
    "onde": "listagem de `Cadastros > Produtos` e de `Cadastros > Participantes`, menu “Mais…”",
    "intro": "Com os cadastros de apoio prontos, traga a base do cliente: produtos primeiro, depois participantes e contatos.",
    "passos": [
     {
      "t": "**Faça:** na listagem de Produtos, use “Mais…” › “Importar … via Excel” com a planilha preparada e rode a validação antes de executar.",
      "r": "**Explique ao cliente:** a planilha aplica a mesma régua da tela; linha recusada mostra o motivo. **Confira:** a validação sem linhas recusadas, ou as recusas tratadas na origem. **Fonte:** Fundação C, etapa 7; Fundação D, seção 8.",
      "s": "d"
     },
     {
      "t": "**Faça:** repita com os participantes (todas as linhas com papel, CPF/CNPJ válido, IE ou “Isento”, CEP e endereço) e depois com os contatos.",
      "r": "**Explique ao cliente:** “Selecione pelo menos um papel para o participante…” e “Cadastro do participante incompleto — informe: …” são as recusas mais comuns. **Confira:** a quantidade importada igual à da base de origem. **Fonte:** Fundação C, etapa 7 e erros comuns; CAD-PAR-001, CAD-PAR-003.",
      "s": "d",
      "campo": "Quantidade importada (produtos / participantes)"
     },
     {
      "t": "**Faça:** abra com o cliente uma amostra de 10 clientes e 10 produtos importados.",
      "r": "**Explique ao cliente:** é a última chance de corrigir a base antes do primeiro pedido real. **Confira:** documento, endereço e contatos com marca de nota e boleto; categoria, NCM, unidade e preço dos produtos. **Fonte:** Fundação D, seção 8.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "9. Prova em uso real: obra e pedido de teste",
    "onde": "`Cadastros > Projetos` e `Vendas > Pedidos de Venda > + Novo Pedido`",
    "intro": "Um cadastro só está certo quando funciona no documento. Monte um pedido de teste com tudo o que foi cadastrado; cada erro aqui aponta o cadastro a corrigir.",
    "passos": [
     {
      "t": "**Faça:** em `Cadastros > Projetos`, crie a obra “TESTE FLUXO CONSULTOR - Obra” com **Nome do Projeto**, **Código**, **Status**, **Cliente** (o do bloco 4) e **Responsável**. Clique em `Salvar`.",
      "r": "**Explique ao cliente:** a obra liga pedido, compras, produção e o painel financeiro do projeto. **Confira:** “Registro salvo com sucesso!”; código repetido é recusado. **Fonte:** trilha do estagiário 02, bloco 1; procedimento Cadastrar cliente, produto e obra.",
      "s": "v",
      "campo": "Código da obra"
     },
     {
      "t": "**Faça:** em **Novo Pedido**, preencha **Empresa**, **Cliente**, **Vendedor**, **Condição de Pagamento** e **Projeto (opcional)** com os cadastros do roteiro e escolha o **CFOP**.",
      "r": "**Explique ao cliente:** o CFOP só libera depois de Empresa e Cliente e vem filtrado pelo estado do cliente. **Confira:** o cliente, o vendedor e a condição aparecem para escolha; “Cliente sem IE informado e não marcado como não contribuinte.” aponta o cadastro do cliente. **Fonte:** trilha do estagiário 04, bloco 1; procedimento Criar pedido de venda.",
      "s": "v"
     },
     {
      "t": "**Faça:** adicione o produto do bloco 5: preencha o diálogo **Dados do Item** e clique em **Aplicar**.",
      "r": "**Explique ao cliente:** os campos do diálogo vêm do tipo da categoria. **Confira:** o valor do item pela categoria; se aparecer “Impostos não calculados no item”, leia o motivo (ex.: CST de PIS/COFINS ausente na NCM) e corrija o NCM. O pedido salva mesmo assim. **Fonte:** trilha do estagiário 04, bloco 1; teste do fluxo completo, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** na parcela, escolha o **Meio Pagamento** e o **Portador**; no Resumo, a **Conta de Fluxo de Caixa** de venda. Clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** as parcelas vêm da condição de pagamento cadastrada no bloco 6. **Confira:** a mensagem “Pedido PV-xxxxxx criado” e, na lista, Em aberto, “Sem títulos” e Nota Fiscal “—”. **Fonte:** trilha do estagiário 04, bloco 1; procedimento Criar pedido de venda.",
      "s": "v",
      "campo": "Nº do pedido (PV-)"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) num segundo pedido, use um produto cuja sigla de unidade não esteja cadastrada na empresa e tente salvar.",
      "r": "**Explique ao cliente:** o erro só aparece no salvar; a correção é no cadastro de unidades, não no pedido. **Confira:** a recusa “Item N: Unidade de Medida … não está cadastrada para esta empresa”. **Fonte:** Vendas C, erros comuns; VEN-PED-006; teste do fluxo completo, pré-requisitos.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Cada empresa salva sem aviso, com regime conferido pelo contador, certificado válido, série configurada e ambiente em homologação.",
    "s": "d"
   },
   {
    "t": "Todos os usuários previstos entram com o perfil certo e não há convite pendente esquecido.",
    "s": "d"
   },
   {
    "t": "Categorias aprovadas pelo cliente (tipo e Preço calculado por), unidades, NCMs, condições, meios, contas, portadores e plano de contas cadastrados.",
    "s": "d"
   },
   {
    "t": "Carga de produtos e participantes com a quantidade igual à da origem e amostra conferida.",
    "s": "d"
   },
   {
    "t": "Um pedido de teste salvo com o cliente, o produto, a obra, a condição e o CFOP do roteiro.",
    "s": "d"
   },
   {
    "t": "O administrador do cliente cadastrou sozinho um participante e um produto.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste ou homologação; registros com “TESTE FLUXO CONSULTOR”. Nota fiscal só é transmitida com o responsável fiscal.",
   "Senha do certificado e de usuário quem digita é o cliente; o consultor não pede nem guarda.",
   "O CNPJ da empresa não muda depois de salvo e o tipo da categoria trava quando algum produto tem saldo: confira antes de salvar.",
   "Todo usuário vê todas as empresas; hoje o sistema ainda não restringe acesso por filial. Também não existe tabela de preço por cliente: registre como lacuna na ata.",
   "Não use o NCM “99999999 À classificar” como padrão de nada.",
   "Unidade com sigla diferente da do produto (“PÇ” × “PC”) só aparece como erro ao salvar o pedido.",
   "Cadastro é compartilhado: mudar um participante ou produto afeta notas, títulos, compras e produção.",
   "Convite pendente ocupa vaga na licença: cancele os que não forem usados."
  ],
  "naoValidado": [
   "Nome da opção que sincroniza o emitente com o provedor na tela de Certificados: a gestora marca como não confirmado. Conferir na tela antes de ensinar.",
   "Rótulo do campo do CFOP que diz se ele gera financeiro: a gestora marca como não confirmado. Conferir na tela.",
   "Caminho do NCM: o Manual 01 indica `Fiscal > Configurações > NCM`; a gestora lista a tela no grupo de cadastros. Conferir no menu.",
   "Tipo dos meios de pagamento: a gestora diz que os meios de fábrica já vêm com o código SEFAZ; no teste do fluxo completo “Duplicata Mercantil” foi tratada como boleto ao gerar títulos. Conferir o tipo de cada meio na tela."
  ]
 },
 {
  "id": "implantacao-crm",
  "arquivo": "implantacao-02-crm.html",
  "etiqueta": "Consultor · Implantação · CRM",
  "titulo": "Implantação de CRM: roteiro prático com o cliente",
  "subtitulo": "Junto com o cliente, leve um contato de teste do cadastro do lead até o pedido de venda: qualificação pelo BANT no Kanban de Leads, conversão, oportunidade no Pipeline com itens, atividades e etapas, ganho e geração do pedido.",
  "objetivo": "Ao final, o cliente terá visto um lead virar oportunidade, a oportunidade ganha virar pedido de venda em `Vendas > Pedidos de Venda` e o resultado aparecer nos painéis do CRM. Ele saberá repetir o caminho e conhecerá as três travas do fluxo: BANT e etapa de 60% para converter, item para ganhar e CFOP para gerar o pedido.",
  "rodape": "Checklist de implantação · CRM · fontes: Fluxo comercial e Teste do fluxo completo (passos conferidos em out/2026), procedimento-cadastrar-lead-e-converter-em-oportunidade, regras do CRM, regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro, manual-02-crm, FAQ de limitações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "**Funil de Vendas** com etapas conferidas e **Funil de Leads** cadastrados (sem o primeiro não existe Pipeline; sem o segundo não existe Kanban de Leads). Tipos de Atividade, Origens de Lead, Temperaturas e Motivos de Perda cadastrados.",
    "r": "**Confira:** `CRM > Configurações` e remova etapas de teste esquecidas no fim do funil. **Fonte:** manual-02-crm, Parte 1; Fluxo comercial (pré-requisitos).",
    "s": "d"
   },
   {
    "t": "Dados de contato de teste: razão social começando por \"TESTE FLUXO CONSULTOR\", CNPJ/CPF fictício **ainda não usado** e e-mail de caixa pública temporária.",
    "r": "**Confira:** o sistema recusa documento repetido. **Fonte:** Fluxo comercial (pré-requisitos).",
    "s": "v",
    "campo": "E-mail de teste"
   },
   {
    "t": "Produto de teste com unidade válida e preço de tabela.",
    "r": "**Confira:** `Cadastros > Produtos`. **Fonte:** Fluxo comercial (pré-requisitos).",
    "s": "v",
    "campo": "Código do produto"
   },
   {
    "t": "Para o pedido nascer completo: participante com **Conta de Fluxo de Caixa Receita** e Inscrição Estadual/RG preenchidas (o formulário do lead não exige), condição de pagamento cadastrada e um CFOP que **não** gera financeiro disponível (ex.: 5910-1).",
    "r": "**Confira:** com o consultor responsável pela configuração fiscal. **Fonte:** Fluxo comercial (pré-requisitos); regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
    "s": "v"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Cadastro do lead",
    "onde": "`CRM > Vendas > Leads > Novo Lead`",
    "intro": "Tudo começa no contato ainda não qualificado. Mostre ao cliente que o lead já é o cadastro completo do participante.",
    "passos": [
     {
      "t": "**Faça:** clique em **Novo Lead** e cadastre um lead **PJ** com razão social \"TESTE FLUXO CONSULTOR …\", CNPJ fictício, CEP e número, contato com o e-mail de teste e, em **Informações CRM**, **Origem do Lead**, **Temperatura** e **Responsável**. Clique em **Salvar**.",
      "r": "**Explique ao cliente:** só **Tipo (PF/PJ)** e **Razão Social / Nome** são obrigatórios; o Responsável é o vendedor que vai herdar a oportunidade. **Confira:** \"Registro salvo com sucesso!\" e o lead na lista com Status \"Novo\". **Fonte:** Fluxo comercial, bloco 1; procedimento-cadastrar-lead-e-converter-em-oportunidade.",
      "s": "v",
      "campo": "Código do lead"
     },
     {
      "t": "**Faça:** se o CEP trouxer um bairro com menos de 3 letras (ex.: \"Sé\"), digite um bairro com 3 letras ou mais antes de salvar.",
      "r": "**Explique ao cliente:** hoje o sistema ainda recusa bairro curto ao salvar. **Confira:** o lead salva depois do ajuste. **Fonte:** Teste do fluxo completo, bloco 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra **Editar Lead** e mostre a diferença entre as seções **Dados CRM** (Setor de Atuação, Linha Preferida, Tipo de Vidro Preferido…) e **Informações CRM** (origem, temperatura, responsável, Budget Estimado e BANT).",
      "r": "**Explique ao cliente:** a qualificação mora em Informações CRM. **Confira:** na lista, a **Temperatura** gravada (hoje ela pode mudar sozinha e diferir da escolhida). **Fonte:** regra-crm-formulario-do-lead-secoes-e-campos; FAQ (CRM-5).",
      "s": "d"
     },
     {
      "t": "**Faça:** no menu `⋮ > Atividades > Nova atividade` do lead, registre uma Reunião com data e próxima ação.",
      "r": "**Explique ao cliente:** o histórico de contato começa antes da oportunidade. **Confira:** \"Atividade registrada!\" e a atividade em `CRM > Atividades` e na Agenda da semana (a lista não mostra de qual lead ela é). **Fonte:** Fluxo comercial, bloco 1.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "2. Qualificação: BANT e Kanban de Leads",
    "onde": "`Editar Lead > Informações CRM` e `CRM > Vendas > Leads > Kanban de Leads`",
    "intro": "Antes de converter, o lead precisa provar que é um negócio real. Comece pela trava, para o cliente ver por que a qualificação existe.",
    "passos": [
     {
      "t": "**Faça:** na lista de leads, clique em `⋮ > Converter` no lead recém-criado, ainda sem BANT.",
      "r": "**Explique ao cliente:** o Flow só converte lead qualificado. **Confira:** o sistema bloqueia e avisa o que falta (\"BANT incompleto\"). **Fonte:** manual-02-crm, 2.2; regra-crm-converter-lead-exige-etapa-60-e-bant-completo.",
      "s": "d"
     },
     {
      "t": "**Faça:** em **Editar Lead > Informações CRM**, preencha o **Budget Estimado** (selecione o valor antes de digitar) e ligue as chaves **Autoridade**, **Necessidade** e **Prazo**. Clique em **Salvar**.",
      "r": "**Explique ao cliente:** BANT = verba, fala com quem decide, necessidade real e prazo; o Budget vira o valor inicial da oportunidade. **Confira:** o lead salvo com as quatro informações. **Fonte:** Fluxo comercial, bloco 2; regra-crm-converter-lead-exige-etapa-60-e-bant-completo.",
      "s": "v"
     },
     {
      "t": "**Faça:** no **Kanban de Leads**, arraste o card até uma etapa de **60% ou mais** (MQL, SQL), confirmando cada diálogo \"Mover lead\".",
      "r": "**Explique ao cliente:** a etapa do lead só muda no Kanban (o formulário não tem campo de etapa) e a conversão exige as duas condições juntas, etapa de 60% e BANT completo. **Confira:** o card na coluna escolhida. **Fonte:** Fluxo comercial, bloco 2; regra-crm-converter-lead-exige-etapa-60-e-bant-completo.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "3. Conversão do lead",
    "onde": "`CRM > Vendas > Leads` > `⋮ > Converter`",
    "intro": "A conversão faz três coisas de uma vez, e só uma delas é avisada na tela. Mostre cada reflexo.",
    "passos": [
     {
      "t": "**Faça:** clique em `⋮ > Converter` e, na janela, em **Converter Lead**.",
      "r": "**Explique ao cliente:** a conversão marca o lead como convertido e cria a oportunidade sem avisar. **Confira:** \"Lead convertido com sucesso!\" e o lead com status Convertido. **Fonte:** Fluxo comercial, bloco 2; regra-crm-conversao-cria-a-oportunidade-sozinha.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `CRM > Vendas > Pipeline` e localize a oportunidade criada para o cliente de teste.",
      "r": "**Explique ao cliente:** o valor da oportunidade é o Budget Estimado até que itens sejam lançados. **Confira:** o card com o cliente de teste e o valor do Budget. **Fonte:** Fluxo comercial, bloco 2; regra-crm-conversao-cria-a-oportunidade-sozinha.",
      "s": "v",
      "campo": "Nº da oportunidade (OPO-)"
     },
     {
      "t": "**Faça:** abra o cadastro do participante convertido.",
      "r": "**Explique ao cliente:** o contato passou a ser cliente e pode receber pedido. **Confira:** \"É Cliente?\" ligado e \"Prospect/Lead\" desligado. **Fonte:** Teste do fluxo completo, bloco 1; regra-crm-conversao-cria-a-oportunidade-sozinha.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra a aba **Atividades** da oportunidade e procure a reunião registrada no lead.",
      "r": "**Explique ao cliente:** as atividades do lead **não** migram para a oportunidade; registre as próximas já na oportunidade. **Confira:** a atividade do lead não aparece. **Fonte:** Fluxo comercial, bloco 2; regra-crm-conversao-cria-a-oportunidade-sozinha.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "4. Oportunidade no Pipeline: itens, atividades e etapas",
    "onde": "`CRM > Vendas > Pipeline` > clique no card",
    "intro": "É aqui que o vendedor trabalha o negócio no dia a dia. Os itens são obrigatórios para ganhar e viram os itens do pedido.",
    "passos": [
     {
      "t": "**Faça:** clique no card e percorra as abas do painel: **Detalhes**, **Itens**, **Atividades** e **Histórico**.",
      "r": "**Explique ao cliente:** Detalhes traz cliente, valores, previsão, responsável e etapa; Histórico guarda cada mudança com data e usuário. **Confira:** as quatro abas da oportunidade de teste. **Fonte:** manual-02-crm, 2.3.",
      "s": "d"
     },
     {
      "t": "**Faça:** na aba **Itens**, clique em **+ Adicionar Item**, busque o produto de teste, preencha a janela **Dados do Item** (altura, largura, cor) e clique em **Aplicar**; informe Quantidade e Valor unitário e clique em **Salvar**.",
      "r": "**Explique ao cliente:** sem **Aplicar** o produto não fica selecionado; os itens substituem o Budget no valor. **Confira:** o item na lista e o Valor estimado igual à soma dos itens. **Fonte:** Fluxo comercial, bloco 3; manual-02-crm, 2.4.",
      "s": "v"
     },
     {
      "t": "**Faça:** na aba **Atividades**, clique em **+ Nova atividade**, escolha uma ligação, preencha Tipo, Título, Cliente e Oportunidade vinculada e clique em **Registrar atividade**.",
      "r": "**Explique ao cliente:** a atividade ligada à oportunidade alimenta a agenda do vendedor. **Confira:** a ligação na aba Atividades e em `CRM > Vendas > Atividades`. **Fonte:** manual-02-crm, 2.6.",
      "s": "d"
     },
     {
      "t": "**Faça:** arraste o card para a etapa seguinte do funil e confirme no diálogo \"Mover oportunidade\".",
      "r": "**Explique ao cliente:** a etapa mostra onde o negócio está e alimenta os painéis. **Confira:** o movimento registrado no Histórico; o percentual do card pode só atualizar ao recarregar a página. **Fonte:** Fluxo comercial, bloco 3; manual-02-crm, 2.3.",
      "s": "v"
     },
     {
      "t": "**Faça:** defina a **Previsão de fechamento** e salve.",
      "r": "**Explique ao cliente:** a previsão alimenta a projeção de vendas. **Confira:** a data gravada; hoje ela pode aparecer 1 dia antes do informado. **Fonte:** Fluxo comercial, bloco 3; FAQ de limitações.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "5. Ganhar (e perder) a oportunidade",
    "onde": "`CRM > Vendas > Pipeline` > painel da oportunidade ou `⋯` do card",
    "intro": "Mostre a trava do item numa segunda oportunidade e encerre a principal como ganha. A segunda oportunidade serve também para mostrar a perda.",
    "passos": [
     {
      "t": "**Faça:** em `CRM > Vendas > Pipeline`, crie uma segunda oportunidade com **+ Nova Oportunidade** para o cliente de teste, **sem itens**, e tente marcá-la como ganha.",
      "r": "**Explique ao cliente:** só se ganha o que tem item, porque são os itens que viram o pedido. **Confira:** o aviso de que é preciso ao menos um item para ganhar. **Fonte:** manual-02-crm, 2.2 e 2.5.",
      "s": "d",
      "campo": "Nº da 2ª oportunidade (OPO-)"
     },
     {
      "t": "**Faça:** na oportunidade com itens, clique em **Ganha**.",
      "r": "**Explique ao cliente:** não há confirmação nem pedido de motivo; se clicar sem querer, use **Reverter ganho** (e faça isso antes de gerar o pedido). **Confira:** status \"Ganha\" e o card fora do filtro \"Abertas\" (use Filtros > Ganhas); a etapa e a probabilidade não vão para 100%. **Fonte:** Fluxo comercial, bloco 6; manual-02-crm, 2.5.",
      "s": "v"
     },
     {
      "t": "**Faça:** marque a segunda oportunidade como **Perdida**, escolhendo o motivo (Preço, Concorrência, Timing, Sem Resposta, Outro).",
      "r": "**Explique ao cliente:** o motivo de perda vira indicador para o gestor. **Confira:** a oportunidade perdida; no painel, o campo \"Motivo de perda\" mostra o texto de Detalhes, e o resumo do CRM mostra o motivo certo. **Fonte:** Fluxo comercial, bloco 7.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "6. Gerar o pedido de venda",
    "onde": "painel da oportunidade ganha > `Gerar Pedido de Venda`",
    "intro": "É a passagem do CRM para Vendas. Demonstre de propósito a recusa com CFOP de venda e depois o caminho que funciona.",
    "passos": [
     {
      "t": "**Faça:** clique em **Gerar Pedido de Venda**, escolha a **Empresa** e um CFOP de venda (5101 ou 6101) e clique em **Confirmar**.",
      "r": "**Explique ao cliente:** um CFOP que gera financeiro exige condição de pagamento, plano de conta e parcelas, campos que esta janela não tem. **Confira:** a recusa \"O CFOP do pedido gera financeiro, então estes campos são obrigatórios: Condição de Pagamento, Plano de Conta, Parcelas.\" **Fonte:** Fluxo comercial, bloco 6; regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
      "s": "v"
     },
     {
      "t": "**Faça:** repita com um CFOP que **não** gera financeiro (ex.: 5910-1) e clique em **Confirmar**. Anote o número do pedido e não clique de novo no botão.",
      "r": "**Explique ao cliente:** o pedido nasce com cliente, item e valor da oportunidade; o vínculo com a oportunidade fica só no texto da Obs. Interna. **Confira:** o pedido criado; hoje pode aparecer o aviso \"Erro ao carregar oportunidade\" e o botão continua disponível (um novo clique duplica o pedido). **Fonte:** Fluxo comercial, bloco 6; FAQ (CRM-2).",
      "s": "v",
      "campo": "Nº do pedido (PV-)"
     },
     {
      "t": "**Faça:** abra o pedido em `Vendas > Pedidos de Venda`, troque o CFOP para o de venda e escolha a **condição de pagamento**. Salve.",
      "r": "**Explique ao cliente:** o pedido gerado não herda vendedor nem condição da proposta; complete-os aqui. **Confira:** as parcelas geradas sozinhas. **Fonte:** Fluxo comercial, bloco 6; regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
      "s": "v"
     },
     {
      "t": "**Faça:** procure o pedido no Dashboard Vendas, em Vendas por Período e na Carteira de Pedidos.",
      "r": "**Explique ao cliente:** a partir daqui o negócio segue no módulo Vendas (faturamento, financeiro, produção). **Confira:** o pedido na Carteira de Pedidos como \"A faturar\". **Fonte:** Fluxo comercial, bloco 6.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "7. Resultado nos painéis do CRM",
    "onde": "`CRM > Painéis`, `CRM > Visão Geral` e `Clientes > Visão 360°`",
    "intro": "Feche mostrando ao gestor onde ele acompanha o funil, o ganho e a perda do teste.",
    "passos": [
     {
      "t": "**Faça:** abra `CRM > Painéis > Resultado do Mês`.",
      "r": "**Explique ao cliente:** é a leitura do mês para a reunião comercial. **Confira:** ganhas × perdidas, taxa de ganho e os principais motivos de perda, com o ganho e a perda do teste. **Fonte:** Fluxo comercial, bloco 7.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `CRM > Visão Geral` (jornada) e `Clientes > Visão 360°`.",
      "r": "**Explique ao cliente:** a jornada soma as oportunidades abertas de **todos** os funis. **Confira:** os números da jornada; o cliente de teste pode não aparecer na lista de clientes do CRM. **Fonte:** Fluxo comercial, bloco 7.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra os Demonstrativos do CRM filtrando pelo vendedor responsável.",
      "r": "**Explique ao cliente:** cada vendedor vê o próprio resultado. **Confira:** o ganho do teste no vendedor. **Fonte:** manual-02-crm, 2.10.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O lead de teste foi qualificado (BANT e etapa de 60%), convertido, e o participante ficou marcado como cliente.",
    "s": "v"
   },
   {
    "t": "A oportunidade nasceu sozinha no Pipeline, recebeu item, atividade e mudança de etapa, e foi marcada como ganha.",
    "s": "v"
   },
   {
    "t": "O pedido de venda foi gerado a partir da oportunidade, completado com CFOP de venda e condição de pagamento, e aparece em Vendas como \"A faturar\".",
    "s": "v"
   },
   {
    "t": "O ganho e a perda do teste aparecem nos painéis do CRM.",
    "s": "v"
   }
  ],
  "atencao": [
   "**Segurança do ambiente:** use só ambiente de teste, registros com \"TESTE FLUXO CONSULTOR\" e e-mail de caixa temporária; nota fiscal só é transmitida com o responsável fiscal.",
   "**Gerar Pedido de Venda** recusa CFOP que gera financeiro: use um CFOP sem financeiro e ajuste o pedido depois. Valide a passagem com o consultor responsável pela configuração fiscal antes de treinar o cliente.",
   "Hoje o sistema ainda deixa o botão **Gerar Pedido de Venda** disponível depois de gerar, e o painel da oportunidade pode parar de abrir: anote o nº do pedido e não clique de novo.",
   "**Ganha** não pede confirmação. **Reverter ganho** não remove a oportunidade de Pós-Venda criada ao ganhar, e ganhar de novo cria outra: reverta antes de gerar o pedido.",
   "Recolher e reabrir a seção **Informações CRM** no formulário do lead apaga a origem escolhida.",
   "Hoje datas de fechamento e de previsão podem aparecer 1 dia antes do informado, e a Temperatura do lead pode mudar sozinha: confira na tela.",
   "As atividades do lead não vão para a oportunidade, e o pedido gerado não herda vendedor nem condição de pagamento."
  ],
  "naoValidado": [
   "Janela **Converter Lead**: o manual-02-crm (2.2) diz que ela permite escolher o funil, a etapa inicial (padrão Prospecção) e o valor; no teste de 19/10 (Fluxo comercial) a oportunidade nasceu sozinha na etapa \"Novo Lead\" com o valor do Budget. Conferir na tela qual etapa o cliente verá.",
   "Como ganhar: o manual-02-crm (2.5) indica `⋯ do card > Marcar como Ganha`, com a mensagem \"Oportunidade marcada como ganha!\" e a exigência de ao menos um item; o Fluxo comercial registra o botão **Ganha** no painel da oportunidade, sem citar a exigência do item. Conferir o caminho e a trava antes de demonstrar.",
   "Probabilidade: o manual-02-crm (2.3) diz que ela muda sozinha conforme a etapa; no teste o percentual do card só atualizou ao recarregar e, no ganho, a etapa e a probabilidade não foram para 100%."
  ]
 },
 {
  "id": "implantacao-integracao-cem",
  "arquivo": "implantacao-03-integracao-cem.html",
  "etiqueta": "Consultor · Implantação · Integração CEM",
  "titulo": "Implantação da Integração CEM: roteiro prático com o cliente",
  "subtitulo": "Configure a integração com o sistema que o cliente usa (CEM Desktop, CEM Mobi ou arquivo), importe um orçamento real dele e leia com ele cada dado que chegou ao pedido de venda. Termine com a reimportação de uma revisão e, se contratado, o Faturamento em Nível.",
  "objetivo": "Ao final, o cliente importou sozinho uma obra fechada no CEM e sabe conferir no pedido gerado os itens, os preços, o desconto, os impostos, o cliente e a obra. Ele sabe o que trava uma importação, onde corrigir (no CEM ou nos Padrões) e o que acontece quando o orçamento é revisado depois de integrado.",
  "rodape": "Checklist de implantação · Integração CEM · fontes: manual de implantação, processos e regras da Integração de Vendas (gestora) e README da cadeia comercial; roteiros de treinamento Vendas 01 Pedido de Venda e 06 Configurações e Integrações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação concluída: empresa, CFOPs, plano de contas, condições de pagamento, categorias, NCMs e unidades cadastrados.",
    "r": "**Confira:** o checklist da Fundação assinado. O pedido importado já precisa de condição de pagamento e plano de contas. **Fonte:** README da cadeia comercial, ordem de implantação; Integração B, fluxo de configuração.",
    "s": "d"
   },
   {
    "t": "Decidido com o cliente: qual sistema de origem (CEM Desktop, CEM Mobi, PrefSuite ou arquivo), qual o modo do código dos produtos e se vai usar Faturamento em Nível.",
    "r": "**Confira:** as decisões na ata. O sistema escolhido decide qual botão de importação aparece; o modo do código deve ser decidido antes da primeira obra. **Fonte:** README da cadeia comercial, decisões X3 e X4; INT-DSK-014.",
    "s": "d"
   },
   {
    "t": "CEM Desktop: máquina Windows onde fica o banco do CEM, com acesso de administrador e o agente FaktoryFlow Agent instalado.",
    "r": "**Confira:** o agente aberto mostrando o código de pareamento. **Fonte:** Integração C, etapa 2; Fundação C, etapa 6.",
    "s": "d"
   },
   {
    "t": "Uma obra **fechada** no CEM, real e do cliente, escolhida para a importação de teste; clientes do CEM com CPF/CNPJ e cidade corretos.",
    "r": "**Confira:** com o orçamentista do cliente. A integração só trabalha com obras fechadas; cidade e UF vêm só do CEM. **Fonte:** roteiro Vendas 01, localizar a obra; INT-GER-009, INT-GER-039.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Escolher o sistema de integração",
    "onde": "`Vendas > Configurações > Configurar integração`",
    "intro": "A primeira escolha decide por onde o orçamento entra. Faça com o administrador do cliente, porque só ele acessa esta tela.",
    "passos": [
     {
      "t": "**Faça:** abra `Configurar integração` com o administrador do cliente e escolha no seletor do topo o sistema dele: `CEM Desktop`, `CEM Mobi`, `PrefSuite` ou `Arquivos`.",
      "r": "**Explique ao cliente:** sem escolha, vale `Arquivos`. Esta tela é só do administrador. **Confira:** o sistema selecionado ficou gravado. **Fonte:** Integração C, etapa 1; INT-CFG-001.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Vendas > Pedidos de Venda` e mostre o botão de importação que apareceu.",
      "r": "**Explique ao cliente:** aparece um só botão, conforme o sistema: `Importar CEM`, `Importar CEM Mobi`, `Importar PrefSuite` ou `Importar Arquivo`. **Confira:** o botão certo na lista de pedidos. **Fonte:** Integração C, etapa 1; Manual 03 Vendas, 2.1.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira a empresa selecionada no alto da tela antes de seguir.",
      "r": "**Explique ao cliente:** as configurações de integração valem para a empresa ativa. **Confira:** o nome da empresa no topo. **Fonte:** roteiro Vendas 06, abertura.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Conectar o CEM (Desktop ou Mobi)",
    "onde": "`Vendas > Configurações > Configurar integração` (cards de pareamento ou `Configuração CEM Mobi`)",
    "intro": "O CEM Desktop conversa com o Flow por um agente instalado na empresa; o CEM Mobi, pela configuração da integração. Faça só o caminho do cliente.",
    "passos": [
     {
      "t": "**Faça:** (CEM Desktop) abra o agente na máquina do CEM, anote o código no formato XXX-XXX e, em até 10 minutos, digite em `Código de pareamento` e clique em `Confirmar`.",
      "r": "**Explique ao cliente:** o agente precisa ficar ligado; sem ele nenhuma obra carrega. **Confira:** o dispositivo em `Dispositivos pareados` (botão `Atualizar`) e o banco em `Bancos de Dados Configurados`. **Fonte:** Integração C, etapa 2; roteiro Vendas 06, pareando o CEM Desktop.",
      "s": "d",
      "campo": "Dispositivo pareado"
     },
     {
      "t": "**Faça:** (bloqueio de propósito, CEM Desktop) digite um código vencido ou errado.",
      "r": "**Explique ao cliente:** o código vale 10 minutos; muitos erros seguidos bloqueiam o usuário por 15 minutos. **Confira:** a recusa “Código de pareamento inválido ou expirado. Gere um novo código no agente desktop.” **Fonte:** Integração C, etapa 2 e erros comuns; INT-CFG-002, INT-CFG-004.",
      "s": "d"
     },
     {
      "t": "**Faça:** (CEM Mobi) no card `Configuração CEM Mobi`, informe o endereço, a chave e o código da função fornecidos para o cliente, salve e clique em `Testar Conexão`.",
      "r": "**Explique ao cliente:** sem conexão confirmada não adianta tentar importar. **Confira:** “Conexão realizada com sucesso! N pedido(s) encontrado(s).” e o selo `Conectado`. **Fonte:** Integração C, etapa 3; roteiro Vendas 06, salvando a configuração do CEM Mobi; INT-CFG-009.",
      "s": "d"
     },
     {
      "t": "**Faça:** (arquivo) mostre que não há nada a conectar e que o arquivo aceito é XML (CEM Desktop) ou JSON (CEM Mobi).",
      "r": "**Explique ao cliente:** outros formatos são recusados com “Formato de arquivo não suportado”. **Confira:** o cliente sabe exportar o XML ou o JSON da obra. **Fonte:** Integração C, etapa 1 e erros comuns; INT-ARQ-001.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Padrões de Integração",
    "onde": "`Vendas > Configurações > Padrões de Integração`",
    "intro": "O CEM manda itens que o Flow ainda não conhece. Os Padrões dizem com que NCM, unidade, categoria, CFOP e condição o produto e o pedido nascem. Padrões completos são importação sem parada.",
    "passos": [
     {
      "t": "**Faça:** na aba `Importação`, no card do modo do código (`Cadastrar produto como obra + Tipo`), escolha o modo decidido com o cliente.",
      "r": "**Explique ao cliente:** o modo do código fica gravado na obra; mudar depois não afeta obras já integradas. **Confira:** o modo escolhido salvo. **Fonte:** Integração C, etapa 4; INT-DSK-014, INT-DSK-015, INT-DSK-016.",
      "s": "d"
     },
     {
      "t": "**Faça:** no card `Padrões por tipo de item`, informe NCM, unidade e categoria de cada tipo que o cliente usa (perfil, vidro, componente, esquadria…).",
      "r": "**Explique ao cliente:** produto novo do CEM nasce com esses padrões e só com o preço de custo. Não use o NCM “99999999 À classificar”. **Confira:** o selo `Todos completos`. **Fonte:** Integração C, etapa 4; INT-GER-014, INT-GER-015, INT-GER-016, INT-CFG-019.",
      "s": "d"
     },
     {
      "t": "**Faça:** se o orçamento tem serviço, preencha o `Código de serviço (LC 116)` no bloco `Serviço`.",
      "r": "**Explique ao cliente:** vazio, vale o LC 116 da empresa; sem nenhum, a importação para. **Confira:** o código salvo. **Fonte:** Integração C, etapa 4; INT-GER-035, INT-GER-036.",
      "s": "d"
     },
     {
      "t": "**Faça:** na aba `Pedido de Venda`, preencha `CFOP Padrão`, `Plano de Conta Padrão`, `Condição de Pagamento Padrão` e `Meio de Pagamento Padrão`.",
      "r": "**Explique ao cliente:** esses campos chegam preenchidos na confirmação da importação, mas o usuário confere cada um. **Confira:** os padrões salvos; salvar exige administrador. **Fonte:** Integração C, etapa 4; INT-DSK-012; roteiro Vendas 01, confirmar os dados do pedido.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Importar um orçamento real (CEM Desktop)",
    "onde": "`Vendas > Pedidos de Venda > Importar CEM`",
    "intro": "Agora o cliente importa a obra real escolhida. Ele conduz o mouse; o consultor explica cada etapa da janela `Importar do CEM Desktop`. Para CEM Mobi ou arquivo, use o bloco 5.",
    "passos": [
     {
      "t": "**Faça:** clique em `Importar CEM`; se houver mais de uma base, escolha em **Base** a da obra; atualize a lista e busque a obra pelo código, nome, cliente, cidade ou contato. Confira Código, Nome da Obra, Cliente e Cidade e clique em `Importar`.",
      "r": "**Explique ao cliente:** sem pesquisa, aparecem as obras fechadas mais recentes; obra aberta no CEM não aparece. Obra já integrada vem identificada na lista. **Confira:** a obra certa selecionada. **Fonte:** roteiro Vendas 01, escolher a base e localizar a obra; Integração C, etapa 7.",
      "s": "d"
     },
     {
      "t": "**Faça:** na etapa **Dados do Cliente**, leia nome, CPF/CNPJ, endereço, telefone e e-mail e a situação mostrada: `Será vinculado`, `Será criado` ou `Bloqueado`.",
      "r": "**Explique ao cliente:** o Flow procura o cliente pelo CPF/CNPJ. `Será vinculado` usa o cadastro existente (marque `Atualizar cadastro` só se o CEM estiver mais atual); `Será criado` cria o cliente; `Bloqueado` é cadastro inativo: não gere o pedido, reative o cliente ou corrija o documento no CEM. **Confira:** a situação esperada para esse cliente. **Fonte:** roteiro Vendas 01, conferir o cliente; INT-DSK-005, INT-DSK-022.",
      "s": "d"
     },
     {
      "t": "**Faça:** na etapa **Itens da Obra**, revise com o cliente tipo, descrição, modelo, quantidade, largura e altura (mm), local, peso, valor unitário e total, vidro, cor e linha.",
      "r": "**Explique ao cliente:** a importação traz a obra inteira; não há escolha de itens. O desconto do orçamento aparece com o valor líquido e é distribuído entre os itens que podem receber desconto. **Confira:** os itens batem com o orçamento do CEM. **Fonte:** roteiro Vendas 01, conferir os itens; INT-DSK-013, INT-GER-019.",
      "s": "d"
     },
     {
      "t": "**Faça:** na **Confirmação**, confira Empresa, CFOP, Plano de Conta e Condição de Pagamento (vindos dos Padrões), escolha o Vendedor e use Observações só para o que não veio do CEM.",
      "r": "**Explique ao cliente:** Empresa, CFOP, Plano de Contas e Condição de Pagamento são obrigatórios para gerar o pedido. **Confira:** cliente, obra, quantidade de itens, desconto e valor final na tela de confirmação. **Fonte:** roteiro Vendas 01, confirmar os dados do pedido; INT-DSK-011.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em `Gerar Pedido de Venda` uma única vez e aguarde. Depois clique em `Ver Pedido`.",
      "r": "**Explique ao cliente:** o sistema cria ou aproveita cliente, produtos, cores e o projeto da obra, e só então o pedido. Se algo falhar, nada fica gravado além do cliente: corrigir e repetir é seguro. **Confira:** “Pedido criado com sucesso”, o número do pedido, o cliente, o projeto e quantos produtos novos foram criados. **Fonte:** roteiro Vendas 01, gerar o pedido; INT-GER-041.",
      "s": "d",
      "campo": "Nº do pedido importado (PV-)"
     }
    ]
   },
   {
    "titulo": "5. Importar pelo CEM Mobi ou por arquivo",
    "onde": "`Vendas > Pedidos de Venda > Importar CEM Mobi` ou `Importar Arquivo`",
    "intro": "Faça este bloco no lugar do bloco 4 quando o cliente usa CEM Mobi ou importa arquivo. O resultado é o mesmo: um pedido de venda Em aberto.",
    "passos": [
     {
      "t": "**Faça:** (CEM Mobi) clique em `Importar CEM Mobi` e siga as etapas Selecionar Pedido, Itens da Obra, Decisões e Confirmação.",
      "r": "**Explique ao cliente:** na etapa de decisões, preencha NCM, unidade de medida e categoria para cada tipo novo. **Confira:** os dados de cada etapa antes de avançar; use `Voltar` para corrigir. **Fonte:** roteiro Vendas 01, importação pelo CEM Mobi; Integração C, etapa 7.",
      "s": "d"
     },
     {
      "t": "**Faça:** (CEM Mobi) na confirmação, confira cliente, obra, quantidade de itens, valor total, desconto, valor líquido e as configurações; clique em `Importar Pedido` uma vez e depois em `Ver Pedido`.",
      "r": "**Explique ao cliente:** clicar duas vezes não acelera a importação. **Confira:** “Pedido criado com sucesso”. **Fonte:** roteiro Vendas 01, confirmar a importação do CEM Mobi.",
      "s": "d",
      "campo": "Nº do pedido importado (PV-)"
     },
     {
      "t": "**Faça:** (arquivo) clique em `Importar Arquivo` e siga Upload, Dados, Pagamento, Itens e Confirmação até o fim, sem fechar a aba.",
      "r": "**Explique ao cliente:** o rascunho da importação por arquivo se perde ao fechar a aba. **Confira:** o pedido gerado na lista. **Fonte:** Integração C, etapa 7; INT-ARQ-015.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Ler com o cliente o pedido que nasceu da importação",
    "onde": "`Vendas > Pedidos de Venda` (pedido importado) e `Cadastros`",
    "intro": "É aqui que o cliente entende o que a integração faz. Abra o pedido gerado e compare, campo a campo, com o orçamento no CEM.",
    "passos": [
     {
      "t": "**Faça:** na lista de pedidos, localize o pedido importado e abra os itens. Compare o total do pedido com o valor fechado no CEM.",
      "r": "**Explique ao cliente:** o pedido nasce Em aberto e segue as regras de Vendas. O preço unitário é o preço de venda do orçamento (total ÷ quantidade); o cadastro do produto não interfere. Pode haver pequena diferença de arredondamento no rateio do desconto. **Confira:** todas as esquadrias presentes e o total igual ao do CEM. **Fonte:** roteiro Vendas 01, conferir os itens do pedido; INT-GER-004, INT-DSK-017.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o detalhe de um item e mostre medidas, cor e impostos.",
      "r": "**Explique ao cliente:** o cálculo de impostos roda na criação do pedido; item com falha fica com aviso, sem travar o pedido. Revise os avisos fiscais dos primeiros pedidos com o contador. **Confira:** os impostos do item ou o motivo do aviso. **Fonte:** Integração B, seção 3; INT-GER-024.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o cliente do pedido em `Cadastros > Participantes` e mostre o contato criado.",
      "r": "**Explique ao cliente:** a integração cria o cliente novo ou reaproveita pelo CPF/CNPJ, e cria o contato sem duplicar, com as marcas de e-mail de nota, boleto e vendas. **Confira:** documento, endereço e as marcas do contato. **Fonte:** Integração B, seção 3; INT-DSK-005, INT-MOB-011.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o projeto da obra em `Cadastros > Projetos` e mostre as observações internas e a data de entrega do pedido.",
      "r": "**Explique ao cliente:** o projeto é criado ou reaproveitado pelo código da obra; as observações internas trazem obra, contato, vendedor, previsão e cores; a data de entrega é a previsão do CEM. **Confira:** o código da obra no projeto e na coluna PROJETO da lista. **Fonte:** Integração B, seção 3; INT-GER-011, INT-GER-022.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra em `Cadastros > Produtos` um produto novo criado pela importação.",
      "r": "**Explique ao cliente:** o produto nasce com o NCM, a unidade e a categoria do Padrão do tipo e só com o preço de custo; cores novas também são cadastradas sozinhas. **Confira:** NCM, unidade e categoria iguais aos Padrões do bloco 3. **Fonte:** Integração B, seção 3; INT-GER-013, INT-GER-016.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre o que a importação **não** faz: nada no estoque, no financeiro, na comissão ou na produção.",
      "r": "**Explique ao cliente:** tudo isso nasce depois, do pedido de venda, pelas regras de Vendas, Faturamento e Financeiro. Medida, cor ou vidro errados se corrigem no CEM, não no pedido. **Confira:** o pedido Em aberto, “Sem títulos” e Nota Fiscal “—”. **Fonte:** Integração B, seção 3; roteiro Vendas 01, conferir os itens do pedido.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. O que trava a importação",
    "onde": "janela de importação em `Vendas > Pedidos de Venda`",
    "intro": "Demonstre de propósito os bloqueios mais comuns, para o cliente saber se a correção é no CEM ou nos Padrões.",
    "passos": [
     {
      "t": "**Faça:** (bloqueio de propósito) com o orçamentista, deixe um tipo de item sem padrão (ou use um tipo novo) e tente avançar a importação.",
      "r": "**Explique ao cliente:** produto novo precisa de NCM, unidade e categoria do tipo. **Confira:** a recusa “Cadastre o padrão de importação de <tipos> em Configurações > Padrões de Integração”; complete o bloco 3 e repita. **Fonte:** Integração C, erros comuns; INT-DSK-011.",
      "s": "d"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente importar uma obra com item sem valor de venda no CEM.",
      "r": "**Explique ao cliente:** a correção é o preço de venda no CEM, não no Flow. **Confira:** a recusa “A obra selecionada possui item(s) que não possuem valor de venda cadastrados…”. **Fonte:** Integração C, erros comuns; INT-DSK-010.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre o que acontece com cliente sem CPF/CNPJ válido no CEM.",
      "r": "**Explique ao cliente:** o documento não é digitado no assistente: vincule um cliente já cadastrado ou use `+ Novo cliente`, e corrija o cadastro no CEM. **Confira:** a mensagem “Cliente da obra sem CPF/CNPJ — vincule um cliente já cadastrado”. **Fonte:** Integração C, erros comuns; INT-GER-039.",
      "s": "d"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente importar de novo a obra do bloco 4 sem mudar nada no CEM.",
      "r": "**Explique ao cliente:** obra já importada não gera outro pedido; procure o pedido existente antes de qualquer coisa. **Confira:** a recusa “A obra “X” já está integrada integralmente — não há quantidade pendente para importar…”. **Fonte:** Integração C, erros comuns; INT-RIM-003; roteiro Vendas 01, erros comuns na importação.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "8. Revisão do orçamento e reimportação",
    "onde": "`Vendas > Pedidos de Venda > Importar CEM` (ou `Importar CEM Mobi`)",
    "intro": "Orçamento muda depois de fechado. Mostre ao cliente o que cada tipo de revisão provoca, porque o pedido antigo nunca é alterado sozinho.",
    "passos": [
     {
      "t": "**Faça:** com o orçamentista, aumente a quantidade de um item na obra do bloco 4 e importe de novo pelo CEM Desktop ou Mobi.",
      "r": "**Explique ao cliente:** a reimportação traz só a diferença num novo pedido; o primeiro pedido não muda. O desconto é aplicado na proporção do valor importado. **Confira:** um segundo pedido só com a quantidade a mais. **Fonte:** Integração B, seção 1; INT-RIM-002, INT-RIM-005, INT-GER-020.",
      "s": "d",
      "campo": "Nº do pedido da reimportação (PV-)"
     },
     {
      "t": "**Faça:** explique, sem executar, o que acontece quando a quantidade diminui ou um item sai do orçamento.",
      "r": "**Explique ao cliente:** não há saldo a importar e o pedido antigo continua igual: o ajuste é feito à mão no pedido Em aberto. **Confira:** o cliente sabe onde ajustar. **Fonte:** Integração B, seção 1; INT-RIM-005.",
      "s": "d"
     },
     {
      "t": "**Faça:** explique o caso de troca de cor ou medida no CEM.",
      "r": "**Explique ao cliente:** o item com cor ou medida nova entra como item novo, com saldo cheio, e o pedido antigo segue com a versão anterior: cancele ou ajuste o pedido antigo para não produzir nem faturar em dobro. **Confira:** o cliente entendeu o risco. **Fonte:** Integração B, seção 1; INT-RIM-008.",
      "s": "d"
     },
     {
      "t": "**Faça:** para refazer a obra inteira, cancele (ou exclua, se Em aberto) o pedido de teste e mostre a obra voltar a pendente na lista de importação.",
      "r": "**Explique ao cliente:** na importação por arquivo esse é o único caminho para reimportar uma obra já integrada (“A obra “X” já foi integrada e possui um pedido de venda ativo…”). **Confira:** a obra disponível de novo para importar. **Fonte:** Integração B, seção 1; INT-LIB-001, INT-LIB-002, INT-ARQ-012.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "9. Faturamento em Nível (só quando contratado)",
    "onde": "`Vendas > Configurações > Configurar integração` (card `Faturamento em Nível`), `Níveis de Faturamento` e `Templates de Rateio`",
    "intro": "Faça este bloco só se o cliente vai dividir a obra em níveis (por exemplo, material, esquadria e instalação). A regra de rateio precisa estar definida com o fiscal, o contador e o financeiro.",
    "passos": [
     {
      "t": "**Faça:** no card `Faturamento em Nível`, ligue a chave.",
      "r": "**Explique ao cliente:** os menus de níveis e de templates só aparecem com o recurso ligado; com ele desligado a importação avisa “Faturamento em Nível não está habilitado para esta empresa…”. **Confira:** os menus `Níveis de Faturamento` e `Templates de Rateio` visíveis. **Fonte:** Integração C, etapa 6.3; roteiro Vendas 06, Faturamento em Nível; INT-NIV-001.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Níveis de Faturamento`, crie cada nível com `Código`, `Prefixo dos produtos`, `Nome`, `Tipo do item` (Produto ou Serviço), `Peso da parte`, `Ordem` e `Empresa emissora padrão`.",
      "r": "**Explique ao cliente:** o prefixo entra no código do produto-filho; o nível de serviço gera pedido para NFS-e e o de produto, para NF-e. Precisa haver ao menos um nível do tipo Produto. **Confira:** os níveis ativos na lista. **Fonte:** Integração C, etapa 6.1; INT-NIV-008, INT-NIV-012.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Templates de Rateio`, monte a composição usual do cliente (nível, percentual, empresa, CFOP, plano, condição) somando 100%.",
      "r": "**Explique ao cliente:** nível usado por template ativo não pode ser inativado. **Confira:** o template salvo; soma diferente de 100% é recusada (“A soma dos percentuais deve ser exatamente 100%…”). **Fonte:** Integração C, etapa 6.2; INT-NIV-002, INT-NIV-016.",
      "s": "d"
     },
     {
      "t": "**Faça:** importe uma obra e, na etapa de rateio, escolha `Um pedido por nível`, confira os percentuais e os destinos e conclua.",
      "r": "**Explique ao cliente:** `Um pedido por nível` gera pedidos separados para os níveis com valor; `Pedido único` mantém um pedido com os itens divididos; `Sem rateio` importa normal. O último modo usado vira o padrão para todos os usuários. **Confira:** um pedido por nível, cada um com a empresa, o CFOP e a condição da linha. **Fonte:** roteiro Vendas 01, Faturamento em Nível na importação; Integração C, etapa 6; INT-NIV-004, INT-NIV-010.",
      "s": "d",
      "campo": "Nº dos pedidos por nível (PV-)"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Sistema de integração escolhido e conectado (dispositivo pareado ou CEM Mobi `Conectado`).",
    "s": "d"
   },
   {
    "t": "Padrões de Integração com o selo `Todos completos` e os padrões do pedido de venda preenchidos.",
    "s": "d"
   },
   {
    "t": "Uma obra real importada sem erro, com o total do pedido igual ao do CEM e os produtos novos criados com os padrões certos.",
    "s": "d"
   },
   {
    "t": "O cliente explicou sozinho de onde vêm os itens, o preço, o desconto, os impostos, o cliente e a obra do pedido importado.",
    "s": "d"
   },
   {
    "t": "Uma revisão de orçamento reimportada (Desktop ou Mobi) e o cliente sabe o que fazer com o pedido antigo.",
    "s": "d"
   },
   {
    "t": "Faturamento em Nível, se contratado: níveis e template cadastrados e uma obra importada com um pedido por nível.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste ou homologação; pedidos e registros de teste com “TESTE FLUXO CONSULTOR”. Nota fiscal só é transmitida com o responsável fiscal.",
   "A integração só traz obras **fechadas** no CEM e traz a obra inteira: não há escolha de itens.",
   "Clique uma única vez em `Gerar Pedido de Venda` ou `Importar Pedido` e aguarde.",
   "Revisão que troca cor ou medida duplica o item: o pedido antigo continua e precisa ser cancelado ou ajustado à mão.",
   "Hoje o sistema ainda não reativa sozinho um cliente inativo com o mesmo documento: reative antes de importar.",
   "Saneie o cadastro de clientes no CEM (CPF/CNPJ, cidade e UF) antes do go-live: esses dados vêm só da origem.",
   "Não use o NCM “99999999 À classificar” nos Padrões e não inative uma categoria usada num padrão.",
   "O agente do CEM Desktop precisa ficar ligado: “Nenhum agente desktop online” é máquina desligada ou serviço parado."
  ],
  "naoValidado": [
   "Licença: os roteiros Vendas 01 e 06 dizem que CEM Mobi e Faturamento em Nível são só da versão PRO; a gestora diz que a configuração da integração não é PRO e não marca o Faturamento em Nível como PRO. Conferir na tela e na licença do cliente.",
   "Caminho de `Níveis de Faturamento`: o roteiro Vendas 06 indica `Vendas > Integrações > Níveis de Faturamento`; a gestora indica o grupo `Configurações` de Vendas. Conferir no menu.",
   "Correção de medida, cor ou vidro: o roteiro Vendas 01 orienta cancelar e reimportar o pedido completo; a gestora diz que CEM Desktop e Mobi reimportam só o saldo e que a troca de cor ou medida entra como item novo. Conferir na tela antes de ensinar.",
   "Marcas de e-mail do contato criado pela integração: uma regra diz todas ligadas, inclusive compras (INT-GER-032); outra diz compras desligado (INT-MOB-011). A aba `Contato` dos Padrões só vale para a importação por arquivo. Conferir no contato criado.",
   "Falha durante a importação: uma regra diz que o pedido é cancelado (INT-GER-023); outras dizem que tudo é excluído, sem deixar pedido (INT-GER-041, INT-NIV-013). Conferir na tela.",
   "Tipo de arquivo: a descrição da opção `Arquivos` fala em .txt; a regra aceita só XML e JSON. Conferir a mensagem na tela.",
   "Esquadria sem cor, altura ou largura: a regra diz que a importação recusa antes de gravar; a gestora registra que hoje a recusa vem do pedido. Conferir em qual etapa aparece."
  ]
 },
 {
  "id": "implantacao-vendas",
  "arquivo": "implantacao-04-vendas.html",
  "etiqueta": "Consultor · Implantação · Vendas",
  "titulo": "Implantação de Vendas: roteiro prático com o cliente",
  "subtitulo": "Siga com o cliente a vida de um pedido de venda: do pedido importado ou digitado à alçada de desconto, aos títulos ou à nota, ao financeiro e à nota nascendo, ao encerramento ou cancelamento na ordem certa e à liberação para expedição. Comissões, metas e contrato entram só se contratados.",
  "objetivo": "Ao final, o cliente criou e ajustou um pedido, viu um desconto passar pela aprovação, gerou títulos num pedido e faturou outro, e encontrou o título e a nota em cada módulo. Ele sabe por que o sistema recusa cancelar um pedido faturado ou com títulos e qual a ordem para desfazer.",
  "rodape": "Checklist de implantação · Vendas · fontes: manual de implantação, processos e regras de Vendas (gestora) e README da cadeia comercial; Teste do fluxo completo e Fluxo comercial (Guia antigo); trilha do estagiário 04 Vendas; procedimentos Criar pedido de venda, Ajustar o pedido antes de faturar, Gerar títulos e receber, Faturar o pedido e finalizar a nota · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação concluída: cliente, vendedor, produtos com unidade válida, condições e meios de pagamento, portador, plano de contas e CFOPs de venda revisados com o contador.",
    "r": "**Confira:** o checklist da Fundação assinado e um pedido de teste já salvo. **Fonte:** README da cadeia comercial, ordem de implantação; procedimento Criar pedido de venda.",
    "s": "d"
   },
   {
    "t": "Decidido com o cliente: quem gera o contas a receber, o pedido (Gerar Títulos) ou a nota.",
    "r": "**Confira:** a decisão na ata. Se o pedido gerou os títulos, a nota não gera de novo e o pedido fica com os valores travados. **Fonte:** README da cadeia comercial, decisão X2; Manual 03 Vendas, 2.3.",
    "s": "d"
   },
   {
    "t": "Ambiente fiscal em **homologação** e almoxarifado central ativo em `Estoque > Locais`.",
    "r": "**Confira:** a faixa “Ambiente NF-e: HOMOLOGAÇÃO” na nota e o local ativo. Sem local de estoque a nota não finaliza. **Fonte:** teste do fluxo completo, pré-requisitos; procedimento Faturar o pedido e finalizar a nota.",
    "s": "v"
   },
   {
    "t": "Dois usuários de teste: o vendedor e um aprovador de desconto diferente dele.",
    "r": "**Confira:** os dois entram e o aprovador vê `Vendas > Aprovações`. O vendedor não aprova o próprio desconto. **Fonte:** Vendas C, etapa 3.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. O pedido: importado ou digitado",
    "onde": "`Vendas > Pedidos de Venda` (pedido importado ou `+ Novo Pedido`)",
    "intro": "O pedido é onde a operação começa: dele saem produção, expedição, nota e títulos. Use o pedido importado no roteiro da Integração CEM ou digite um com o cliente, com um item de cada categoria.",
    "passos": [
     {
      "t": "**Faça:** em **Novo Pedido**, preencha **Empresa**, **Cliente**, **Vendedor**, **Condição de Pagamento** e **Projeto (opcional)** e escolha o **CFOP**. Se usar o pedido importado, abra-o e leia os mesmos campos.",
      "r": "**Explique ao cliente:** escolha a Empresa primeiro; o CFOP só libera depois de Empresa e Cliente e vem filtrado pelo estado do cliente. Ligue o pedido à obra desde o início. **Confira:** os campos preenchidos e o CFOP certo para o estado. **Fonte:** trilha do estagiário 04, bloco 1; teste do fluxo completo, bloco 2; procedimento Criar pedido de venda.",
      "s": "v"
     },
     {
      "t": "**Faça:** adicione itens de categorias diferentes (unidade, peso, área e uma esquadria com cor, altura e largura); para cada produto, preencha **Dados do Item** e clique em **Aplicar**.",
      "r": "**Explique ao cliente:** o valor do item é calculado pela categoria; o pedido calcula os impostos no item. **Confira:** o valor de cada item e, se aparecer, o quadro “Impostos não calculados no item” com o motivo (o pedido salva assim). **Fonte:** trilha do estagiário 04, bloco 1; teste do fluxo completo, bloco 2; Vendas C, etapa 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** na parcela, escolha o **Meio Pagamento** e o **Portador**; no Resumo, a **Conta de Fluxo de Caixa** de venda.",
      "r": "**Explique ao cliente:** as parcelas seguem os percentuais da condição de pagamento; a Conta de Fluxo de Caixa é obrigatória e pode vir do cliente. **Confira:** a soma das parcelas igual ao total. **Fonte:** trilha do estagiário 04, bloco 1; procedimento Criar pedido de venda.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** o formulário tem três botões que gravam (dois “Salvar” e “Salvar e Permanecer”). **Confira:** “Pedido PV-xxxxxx criado” e, na lista, Em aberto, “Sem títulos” e Nota Fiscal “—”. **Fonte:** trilha do estagiário 04, bloco 1; teste do fluxo completo, bloco 2.",
      "s": "v",
      "campo": "Nº do pedido A (PV-)"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) num segundo pedido com CFOP que gera financeiro, remova a condição de pagamento e tente salvar.",
      "r": "**Explique ao cliente:** é o CFOP que decide se o pedido exige condição, plano e parcelas. **Confira:** a recusa “O CFOP do pedido gera financeiro, então estes campos são obrigatórios: …”; complete e salve. **Fonte:** Vendas C, erros comuns; VEN-PED-001; Fluxo comercial, bloco 6.",
      "s": "d",
      "campo": "Nº do pedido B (PV-)"
     }
    ]
   },
   {
    "titulo": "2. Ler a lista e ajustar antes de faturar",
    "onde": "`Vendas > Pedidos de Venda`",
    "intro": "Só o pedido Em aberto é editável. Mostre como achar o pedido, ler a situação dele e corrigir enquanto ainda dá.",
    "passos": [
     {
      "t": "**Faça:** mostre que a lista começa filtrada em Status “Em Aberto”; troque para “Todos” e leia os status: Aprovação pendente, Encerrado, Faturado, Lib. Expedição, Entregue e Cancelado.",
      "r": "**Explique ao cliente:** Encerrado é venda fechada sem nota; Faturado é pedido com nota gravada. **Confira:** os pedidos A e B na lista; busque pelo número em `Filtros`. **Fonte:** trilha do estagiário 04, bloco 2; VEN-STA-001.",
      "s": "v"
     },
     {
      "t": "**Faça:** leia as colunas **TÍTULOS** (Gerados / Sem títulos) e **NOTA FISCAL** dos pedidos.",
      "r": "**Explique ao cliente:** é o jeito rápido de saber se o pedido já foi para o financeiro e se tem nota. **Confira:** os dois pedidos “Sem títulos” e sem nota. **Fonte:** trilha do estagiário 04, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** no pedido A, clique no **lápis** (Editar pedido), troque a **Condição de Pagamento** e mostre a diferença entre **Recalcular** e **Recalcular Parcelas**. Clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** trocar a condição regenera as parcelas; Recalcular redivide o total por igual (“Parcelas recalculadas com base no total do pedido”); Recalcular Parcelas, no Resumo, só redivide os valores. O menu `⋯` não tem “Editar”. **Confira:** as parcelas novas somando o total. **Fonte:** procedimento Ajustar o pedido antes de faturar.",
      "s": "d"
     },
     {
      "t": "**Faça:** se o pedido ainda não tem obra, escolha o campo **Projeto (opcional)** e clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** sem a obra no pedido, o painel financeiro do projeto fica incoerente. Se editar parcelas à mão, elas precisam fechar o total (“A soma das parcelas (R$ X) não bate com o total do pedido (R$ Y)…”). **Confira:** a coluna PROJETO da lista mostra a obra, sem pedir CFOP nem condição de novo. **Fonte:** procedimento Ajustar o pedido antes de faturar; teste do fluxo completo, atenção; VEN-PED-014.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Alçada de desconto",
    "onde": "`Vendas > Configurações > Alçadas de Desconto` e `Vendas > Aprovações`",
    "intro": "Se o cliente controla desconto, configure a alçada e faça um desconto passar pela aprovação. Sem faixa cadastrada não há alçada.",
    "passos": [
     {
      "t": "**Faça:** em `Alçadas de Desconto`, cadastre com o gestor as faixas da empresa: limite em percentual ou valor, nível e aprovador (usuários ou um perfil), sem sobrepor faixas.",
      "r": "**Explique ao cliente:** as faixas são por empresa; desconto que vem do CEM, do Mobi ou do arquivo não conta para a alçada. **Confira:** as faixas salvas. **Fonte:** Vendas C, etapa 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** com o usuário vendedor, dê no pedido B um desconto acima da faixa e salve.",
      "r": "**Explique ao cliente:** o pedido vai para Aprovação pendente e espera o aprovador. **Confira:** o status “Aprovação pendente” na lista. **Fonte:** Vendas B, seção 1; VEN-PED-034; README da cadeia comercial, teste ponta a ponta, passo 2.",
      "s": "d"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente faturar ou encerrar o pedido B em Aprovação pendente.",
      "r": "**Explique ao cliente:** pedido em Aprovação pendente não fatura nem encerra. **Confira:** a ação recusada ou indisponível. **Fonte:** Vendas C, etapa 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** entre com o aprovador, abra `Vendas > Aprovações` e aprove o desconto do pedido B (ou use `Aprovar desconto` no menu da linha).",
      "r": "**Explique ao cliente:** `Vendas > Aprovações` cobre desconto e comissão; pedido sem desconto não gera aprovação. O botão **Aprovar** da linha aprova com um clique. **Confira:** o pedido B volta a Em aberto. **Fonte:** Vendas C, etapa 3; Vendas B, seção 1; teste do fluxo completo, bloco 2.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Títulos pelo pedido e o financeiro nascendo",
    "onde": "menu `⋯ > Gerar Títulos` do pedido e `Financeiro > Contas a Receber`",
    "intro": "Use o pedido A para mostrar a venda que gera o contas a receber antes da nota (venda antecipada, sinal). O pedido B será faturado no bloco 5: nunca faça os dois no mesmo pedido.",
    "passos": [
     {
      "t": "**Faça:** no menu `⋯` do pedido A, clique em **Gerar Títulos** e confirme.",
      "r": "**Explique ao cliente:** o sistema gera um título por parcela; só gera em pedido Em aberto, com parcelas e CFOP que gera financeiro. Meio de pagamento do tipo Boleto exige conta emissora de boletos. **Confira:** a coluna TÍTULOS do pedido A passa a “Gerados”. **Fonte:** procedimento Gerar títulos e receber; Vendas B, seção 2; VEN-TIT-001, VEN-TIT-005; teste do fluxo completo, bloco 7.",
      "s": "d",
      "campo": "Nº dos títulos do pedido A"
     },
     {
      "t": "**Faça:** abra `Financeiro > Contas a Receber`, limpe o filtro **Status** (vem em “Em aberto”) e pesquise o **Documento** do pedido A.",
      "r": "**Explique ao cliente:** é aqui que o financeiro acompanha a parcela até o recebimento. **Confira:** valor e vencimento iguais aos da parcela do pedido. **Fonte:** procedimento Gerar títulos e receber.",
      "s": "d"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) volte ao pedido A e tente mudar o valor de um item ou a condição de pagamento.",
      "r": "**Explique ao cliente:** gerar títulos pelo pedido “congela” os valores; só observações e vendedor podem mudar. **Confira:** a recusa “Não é possível alterar campos financeiros (...) pois o pedido possui títulos a receber ativos vinculados…”. **Fonte:** Vendas C, erros comuns; VEN-PED-025.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre, sem executar, que um cliente sem o módulo Financeiro não vê **Gerar Títulos**.",
      "r": "**Explique ao cliente:** sem Financeiro não se exige plano de contas, portador nem conta bancária, mas condição de pagamento e parcelas continuam exigidas quando o CFOP gera financeiro. **Confira:** se o cliente tem o Financeiro contratado. **Fonte:** Vendas A; VEN-PED-041.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Faturar e ver a nota nascer",
    "onde": "menu `⋯ > Faturar` do pedido e `Faturamento > Notas Fiscais`",
    "intro": "Agora o pedido B vira nota. O consultor mostra a nota nascendo do pedido e os títulos nascendo da nota, sem transmitir.",
    "passos": [
     {
      "t": "**Faça:** no menu `⋯` do pedido B, clique em **Faturar** e importe os itens do pedido com “Recalcular impostos”.",
      "r": "**Explique ao cliente:** a nota nasce com cliente, CFOP, parcelas e impostos do pedido. **Confira:** cliente, CFOP, parcelas, impostos e a faixa de Homologação na “Nova NF-e — Venda de Mercadoria”. **Fonte:** teste do fluxo completo, bloco 5; procedimento Faturar o pedido e finalizar a nota.",
      "s": "v"
     },
     {
      "t": "**Faça:** preencha as **Observações Internas** e clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** o pedido passa a Faturado ao **salvar** a nota, mesmo com ela Em Aberto; por isso confira o status da nota, não só o do pedido. **Confira:** pedido B “Faturado” com a coluna NOTA FISCAL preenchida. **Fonte:** teste do fluxo completo, bloco 5; VEN-FAT-006.",
      "s": "v",
      "campo": "Nº da nota do pedido B"
     },
     {
      "t": "**Faça:** em `Faturamento > Notas Fiscais`, aba **NF-e**, abra o menu `⋯` da nota e use **Ver Timeline** e **Preview da DANFE** (abre em nova aba).",
      "r": "**Explique ao cliente:** a lista de notas começa filtrada em “Em Aberto”. **Confira:** a DANFE de pré-visualização com os itens do pedido. **Fonte:** teste do fluxo completo, bloco 5; procedimento Faturar o pedido e finalizar a nota.",
      "s": "v"
     },
     {
      "t": "**Faça:** com a autorização do responsável, clique em **Finalizar NF** e confirme. Não clique no avião de papel (Transmitir).",
      "r": "**Explique ao cliente:** transmitir é irreversível, mesmo em homologação, e só se faz com o responsável fiscal. **Confira:** a nota “Finalizada”, só para visualização. Sem local de estoque o sistema bloqueia e o número da nota é consumido. **Fonte:** teste do fluxo completo, bloco 5; procedimento Faturar o pedido e finalizar a nota.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Financeiro > Contas a Receber` e procure os títulos da nota do pedido B.",
      "r": "**Explique ao cliente:** quando o CFOP gera financeiro e o pedido não tem títulos, é a nota que gera o contas a receber; as parcelas seguem a condição de pagamento. **Confira:** os títulos com valor e vencimento das parcelas. **Fonte:** README da cadeia comercial, caminho de uma venda e teste ponta a ponta, passo 4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Encerrar e cancelar na ordem certa",
    "onde": "menu `⋯` do pedido (`Encerrar`, `Cancelar`) e `Financeiro > Contas a Receber`",
    "intro": "Desfazer tem ordem: nota, depois títulos, depois pedido. Demonstre as recusas de propósito para o cliente nunca ficar travado.",
    "passos": [
     {
      "t": "**Faça:** (bloqueio de propósito) tente cancelar o pedido B, que está Faturado.",
      "r": "**Explique ao cliente:** só cancela pedido Em aberto ou Aprovação pendente; pedido faturado exige cancelar a nota primeiro (com o responsável fiscal), e aí o pedido volta a Em aberto. **Confira:** a recusa “Não é possível cancelar um pedido com status “…”. Apenas pedidos “Em aberto” ou “Aprovação pendente” podem ser cancelados.” **Fonte:** Vendas C, erros comuns; VEN-STA-005, VEN-STA-007; Vendas B, seção 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** (bloqueio de propósito) tente cancelar o pedido A, que tem títulos.",
      "r": "**Explique ao cliente:** títulos em aberto ou recebidos bloqueiam o cancelamento. **Confira:** a recusa “Não é possível cancelar o pedido pois existem títulos a receber vinculados. Exclua os títulos primeiro.” **Fonte:** Vendas C, erros comuns; VEN-STA-008.",
      "s": "d"
     },
     {
      "t": "**Faça:** exclua os títulos do pedido A em `Financeiro > Contas a Receber` e cancele o pedido A informando um motivo curto (menos de 10 caracteres) e depois um motivo completo.",
      "r": "**Explique ao cliente:** o motivo é obrigatório e precisa ter pelo menos 10 caracteres; cancelado é definitivo. Com Produção, a OP ativa não é cancelada: o sistema avisa, pede confirmação e marca a OP. **Confira:** primeiro “Informe o motivo do cancelamento com no mínimo 10 caracteres.” e depois o pedido A “Cancelado”. **Fonte:** Vendas C, erros comuns; VEN-STA-004, VEN-STA-006, VEN-STA-009.",
      "s": "d"
     },
     {
      "t": "**Faça:** crie um terceiro pedido de teste e use **Encerrar**.",
      "r": "**Explique ao cliente:** Encerrar só vale para pedido Em aberto, fecha a venda sem nota, conta como vendido e **não volta nem cancela**. Combine com o cliente quando usar. **Confira:** o pedido “Encerrado”, só para visualização. **Fonte:** Vendas B, seção 1; VEN-STA-003, VEN-STA-005; Manual 03 Vendas, 2.3.",
      "s": "d",
      "campo": "Nº do pedido encerrado (PV-)"
     }
    ]
   },
   {
    "titulo": "7. Liberar para expedição e ver nos indicadores",
    "onde": "menu `⋯ > Liberar para Expedição` do pedido, `Vendas > Dashboard Vendas` e `Vendas > Demonstrativos > Carteira de Pedidos`",
    "intro": "Para quem contratou Expedição, o pedido só entra na fila de carga quando alguém libera. Feche mostrando os pedidos do roteiro nos indicadores.",
    "passos": [
     {
      "t": "**Faça:** no menu `⋯` do pedido B (Faturado), clique em **Liberar para Expedição**.",
      "r": "**Explique ao cliente:** a liberação nunca é automática e exige o módulo Expedição; o pedido entra na fila de carga. **Confira:** o status “Lib. Expedição”. **Fonte:** Vendas B, seções 1 e 2; VEN-EXP-001; teste do fluxo completo, bloco 6.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre **Reverter Liberação** e explique o caso de item sem peso.",
      "r": "**Explique ao cliente:** reverter volta o pedido a Faturado (com nota) ou Encerrado (sem nota); item físico sem peso impede a liberação (“N item(ns) sem peso cadastrado…”). **Confira:** o pedido de volta a Faturado se reverter; libere de novo. **Fonte:** Vendas B, seção 1; Vendas C, erros comuns; VEN-EXP-003.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Vendas > Dashboard Vendas`, escolha o período e clique em **Aplicar**.",
      "r": "**Explique ao cliente:** os cartões Total em vendas, Ticket médio, Em aberto e Pendentes de faturamento são recalculados; o bloco “Crescimento vs. período anterior” não segue o filtro de datas. **Confira:** os pedidos do roteiro nos números. **Fonte:** trilha do estagiário 04, bloco 4; teste do fluxo completo, bloco 8.",
      "s": "v"
     },
     {
      "t": "**Faça:** em `Vendas > Demonstrativos > Carteira de Pedidos`, leia A faturar, A expedir, Em carga, Expedido, Entregue e o aging por dias.",
      "r": "**Explique ao cliente:** a carteira mostra onde cada pedido está parado. **Confira:** o pedido B no recorte do status atual. **Fonte:** trilha do estagiário 04, bloco 4; teste do fluxo completo, bloco 8.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "8. Comissões, metas e contrato (só se contratados)",
    "onde": "`Vendas > Controle de Comissão`, `Vendas > Metas de Vendas` e `Vendas > Contratos de Fornecimento`",
    "intro": "Faça cada passo só se o recurso foi contratado. Regime e base da comissão precisam ser decididos antes da primeira nota real.",
    "passos": [
     {
      "t": "**Faça:** (comissão) em `Controle de Comissão > Configurações`, use “Abrir assistente de configuração” e defina com o cliente “Quando a comissão conta” (No recebimento / No faturamento) e a base; depois crie as regras em `Controle de Comissão > Regras`.",
      "r": "**Explique ao cliente:** regime e base valem só para comissões novas; mudar depois não recalcula. O pagamento da comissão gera título no Contas a Pagar. **Confira:** a configuração salva e uma regra ativa. **Fonte:** Vendas C, etapa 5; VEN-COM-014, VEN-COM-024.",
      "s": "d"
     },
     {
      "t": "**Faça:** (comissão) no **Simulador**, informe valor 10.000 e comissão 5% e clique em Simular.",
      "r": "**Explique ao cliente:** o simulador não grava nada e mostra quando a comissão é liberada. **Confira:** comissão estimada R$ 500,00. **Fonte:** trilha do estagiário 04, bloco 5; Vendas C, etapa 5.4.",
      "s": "v"
     },
     {
      "t": "**Faça:** (metas) em `Metas de Vendas > Cadastro`, cadastre uma meta mensal por empresa ou por vendedor e abra o painel de Metas.",
      "r": "**Explique ao cliente:** o realizado são os pedidos não cancelados pela data do pedido; meta por equipe não existe. Sem meta, o painel mostra “0% da meta — No ritmo”, que não é resultado real. **Confira:** a meta no painel; vigência sobreposta é recusada (“Já existe meta ativa para este escopo com vigência sobreposta…”). **Fonte:** Vendas C, etapa 6; VEN-MET-001, VEN-MET-002; trilha do estagiário 04.",
      "s": "d"
     },
     {
      "t": "**Faça:** (contrato) em `Contratos de Fornecimento`, crie um contrato com empresa, cliente (construtora), valor global e origem do abatimento, ative-o e vincule um pedido Em aberto do mesmo cliente.",
      "r": "**Explique ao cliente:** o valor global só muda em rascunho (depois, aditivo); a origem do abatimento não muda depois do primeiro abatimento; pedido vinculado não cancela e só vira nota pelo `Faturar` do contrato. **Confira:** o pedido na aba do contrato; nota direto do pedido é recusada (“Este pedido está vinculado ao Contrato de Fornecimento #N…”). **Fonte:** Vendas C, etapa 7; VEN-CTR-002, VEN-CTR-004, VEN-CTR-017.",
      "s": "d",
      "campo": "Nº do contrato"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Um pedido criado (ou importado), ajustado e salvo, com parcelas pela condição de pagamento.",
    "s": "d"
   },
   {
    "t": "Um desconto acima da alçada passou por Aprovação pendente e foi aprovado por outro usuário.",
    "s": "d"
   },
   {
    "t": "Um pedido gerou títulos e outro foi faturado; o título e a nota foram encontrados no Financeiro e no Faturamento.",
    "s": "d"
   },
   {
    "t": "As recusas de cancelamento foram demonstradas e um pedido foi cancelado na ordem nota → títulos → pedido.",
    "s": "d"
   },
   {
    "t": "Um pedido faturado foi liberado para expedição (quem tem Expedição) e aparece no Dashboard e na Carteira de Pedidos.",
    "s": "d"
   },
   {
    "t": "Nenhuma nota foi transmitida sem o responsável fiscal.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste ou homologação; pedidos com “TESTE FLUXO CONSULTOR”. Nota fiscal só é transmitida com o responsável fiscal: o roteiro só finaliza.",
   "Não gere títulos pelo pedido e fature o mesmo pedido: escolha um caminho com o cliente (pedido ou nota) e mantenha.",
   "O pedido vira Faturado ao **salvar** a nota, mesmo com ela Em Aberto: confira o status da nota em `Faturamento > Notas Fiscais`.",
   "Encerrado não volta e não cancela: use só quando a venda está fechada sem nota.",
   "Ordem para desfazer: cancelar a nota → excluir ou estornar os títulos → cancelar o pedido (motivo com 10 caracteres ou mais).",
   "Pedido com títulos só aceita mudar observações e vendedor.",
   "Hoje o campo “% Comissão” do vendedor só aparece no participante quando o cliente tem o módulo CRM; sem CRM, use regra por vendedor.",
   "Há pedidos com o mesmo número em empresas ou séries diferentes e pedidos desdobrados (ex.: PV-000395/2): confira cliente e valor."
  ],
  "naoValidado": [
   "Quando aparece **Gerar Títulos**: a gestora diz só em pedido Em aberto; o teste do fluxo completo viu a opção desabilitada em Faturado e Lib. Expedição (“Pedido já faturado”) e de volta depois de Entregue; o procedimento cita Em aberto ou Entregue sem títulos. Conferir na tela.",
   "Quando aparece **Liberar para Expedição**: a gestora diz pedido Faturado ou Encerrado; o teste do fluxo completo diz que a opção só aparece depois de faturado. Conferir com um pedido Encerrado.",
   "Encerrado e nota: a gestora mostra que um pedido Encerrado ainda pode receber nota (vira Faturado); o Manual 03 Vendas diz que Encerrar conclui o pedido sem faturar o saldo. Conferir na tela.",
   "Saída de estoque na nota: a gestora diz que o CFOP que movimenta estoque baixa o estoque na nota; no teste do fluxo completo a finalização da nota não gerou saída de estoque. Conferir em `Estoque > Movimentos`.",
   "Numeração do pedido: a gestora indica, como inferência, que informar à mão o primeiro número faz os seguintes seguirem automáticos. Conferir antes de ensinar."
  ],
  "video": {
   "id": "consultor-03-comercial",
   "titulo": "Do lead ao pedido de venda",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-faturamento",
  "arquivo": "implantacao-05-faturamento.html",
  "etiqueta": "Consultor · Implantação · Faturamento",
  "titulo": "Implantação de Faturamento: roteiro prático com o cliente",
  "subtitulo": "Do pedido de venda à nota: faturar, importar os itens, conferir CFOP, impostos, parcelas e transporte, salvar, transmitir em homologação com o responsável fiscal, ver os reflexos no financeiro e no estoque e cancelar na ordem certa. NFS-e e nota gerencial quando o cliente usar.",
  "objetivo": "Ao final, o faturista do cliente terá visto um pedido virar nota autorizada em homologação, os títulos nascendo da nota e uma segunda nota cancelada na ordem certa. Ele saberá ler o quadro de impostos, o pré-voo e a rejeição, e saberá o que só o responsável fiscal pode fazer.",
  "rodape": "Checklist de implantação · Faturamento · fontes: Faturamento A, B, C e D da metodologia, README da cadeia comercial, fluxo antigo \"Fluxo de faturamento e fiscal\", procedimento faturar o pedido e finalizar a nota · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação concluída: empresa com regime, IE e endereço com cidade do IBGE, certificado A1 válido e **série e próximo número da NF-e** continuando o sistema antigo.",
    "r": "**Confira:** `Configurações > Empresas` e `Faturamento > Configurações > Certificados` (botão \"Configuração Guiada\"). O número é dado na transmissão e nunca volta: série errada colide com a numeração antiga (rejeição 539). **Fonte:** FAT C, pré-requisitos; FAT-TRA-002; README da cadeia, decisão X5.",
    "s": "d"
   },
   {
    "t": "Ambiente fiscal em **Homologação**: a nota mostra a faixa \"Ambiente NF-e: HOMOLOGAÇÃO — sem validade fiscal\".",
    "r": "**Confira:** a faixa na primeira nota e a coluna Ambiente em `Faturamento > Notas Fiscais`. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos; FAT-GER-002.",
    "s": "v"
   },
   {
    "t": "Dois pedidos de venda de teste \"TESTE FLUXO CONSULTOR\" Em aberto, **sem títulos gerados**, com CFOP que gera financeiro, condição de pagamento e plano de contas: um para transmitir, outro para cancelar.",
    "r": "**Confira:** em `Vendas > Pedidos de Venda`, coluna TÍTULOS \"Sem títulos\" e NOTA FISCAL \"—\". **Fonte:** README da cadeia, teste ponta a ponta (passos 3 e 7); FAT-TIT-001.",
    "s": "d",
    "campo": "Nº dos pedidos"
   },
   {
    "t": "**Almoxarifado central ativo** em `Estoque > Locais` (ou local de estoque da obra).",
    "r": "**Confira:** sem ele \"Finalizar NF\" recusa com \"Não foi possível resolver o local de estoque…\". **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos.",
    "s": "v"
   },
   {
    "t": "CFOPs revisados com o contador (\"Gera Financeiro\", \"Movimenta Estoque\", \"Devolução\") e NCM do produto com CST de PIS/COFINS de saída (roteiro de Fiscal feito antes).",
    "r": "**Confira:** `Faturamento > Configurações > CFOP` e o NCM do produto. Sem o CST, a nota sai com o quadro \"Impostos não calculados\". **Fonte:** FAT C, etapa 2; fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos.",
    "s": "d"
   },
   {
    "t": "Responsável fiscal do cliente presente e perfis definidos: o Faturista emite e transmite, mas não cancela, não emite CC-e nem inutiliza; quem cancela usa Supervisor Fiscal (ou perfil próprio).",
    "r": "**Confira:** `Segurança > Perfis de Acesso` e o usuário do responsável fiscal. **Fonte:** README da cadeia, decisão X8; FAT C, etapa 6.",
    "s": "d"
   },
   {
    "t": "Decidido quem gera o contas a receber: o pedido ou a nota.",
    "r": "**Confira:** ata do kickoff. Se o pedido gerou os títulos, a nota não gera de novo. **Fonte:** README da cadeia, decisão X2; FAT-TIT-001.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Faturar o pedido",
    "onde": "`Vendas > Pedidos de Venda`, menu `⋯ > Faturar`",
    "intro": "A nota nasce do pedido: o cliente vê que não redigita nada. Vem primeiro porque tudo o que a nota carrega (cliente, CFOP, parcelas) foi decidido no pedido.",
    "passos": [
     {
      "t": "**Faça:** no primeiro pedido de teste, abra o menu `⋯` e clique em **Faturar**.",
      "r": "**Explique ao cliente:** a nota herda empresa, cliente, vendedor, CFOP, condição e parcelas do pedido; o nº do pedido fica vinculado e não pode ser alterado. **Confira:** abre \"Nova NF-e — Venda de Mercadoria\" com o diálogo **Selecionar Itens para Importar**. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1; procedimento-faturar-o-pedido-e-finalizar-a-nota, passo 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** importe os itens do pedido com \"Recalcular impostos\".",
      "r": "**Explique ao cliente:** os impostos são recalculados na nota pelas regras fiscais cadastradas. Se só parte do pedido for faturada, o restante fica num pedido filho `/2`. **Confira:** itens e quantidades iguais aos do pedido. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1; FAT-NFE-012.",
      "s": "v"
     },
     {
      "t": "**Faça:** antes de seguir, mostre a faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" no topo da nota.",
      "r": "**Explique ao cliente:** cada empresa tem um ambiente de NF-e e outro de NFS-e; a nota herda o da empresa e a transmissão recusa ambiente diferente. A virada para produção é por documento, no go-live. **Confira:** a faixa visível. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos; FAT-GER-002.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "2. Conferir a nota: CFOP, impostos, parcelas e transporte",
    "onde": "tela da nova NF-e",
    "intro": "Aqui o faturista aprende a ler a nota antes de salvar. Erro de cadastro achado agora não vira nota rejeitada nem título errado depois.",
    "passos": [
     {
      "t": "**Faça:** confira o CFOP e a natureza da operação da nota.",
      "r": "**Explique ao cliente:** não existe cadastro de natureza de operação: sai a descrição do CFOP (ou o texto digitado na nota). É o CFOP que decide se a nota gera título e se movimenta estoque. **Confira:** o CFOP de venda do pedido, com a descrição aprovada pelo contador. **Fonte:** FAT-NFE-007; FAT-NFE-002; README da cadeia, decisão X1.",
      "s": "d"
     },
     {
      "t": "**Faça:** leia o quadro **\"Impostos não calculados no item\"**, se ele aparecer.",
      "r": "**Explique ao cliente:** o sistema mostra o motivo por tributo (ex.: CST de PIS/COFINS ausente na NCM) e deixa salvar com o imposto zerado; a correção é no cadastro fiscal, não na nota. **Confira:** o motivo anotado para o roteiro de Fiscal. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1; FIS-CTX-010.",
      "s": "v"
     },
     {
      "t": "**Faça:** confira as parcelas (valor e vencimento) e, se mudou algo na nota, use \"Recalcular\".",
      "r": "**Explique ao cliente:** cada parcela vira um título a receber quando o CFOP gera financeiro. **Confira:** a soma das parcelas igual ao total; senão o sistema avisa \"A soma das parcelas (R$ X) é diferente do total da nota (R$ Y)…\". **Fonte:** FAT-NFE-004; FAT C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira o transporte (padrão \"9 - Sem Transporte\"), abra o botão **Dados da NF-e** (destinatário, referências, informações adicionais) e preencha as **Observações Internas** em \"Observações e Informações Adicionais\".",
      "r": "**Explique ao cliente:** entrega em obra pode usar \"Usar endereço da obra\" no Local de Entrega; Local de Entrega com CNPJ exige endereço completo. **Confira:** destinatário com endereço completo. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1; procedimento-faturar-o-pedido-e-finalizar-a-nota, passo 3; FAT-TRA-014/015.",
      "s": "v"
     },
     {
      "t": "**Faça:** com o CFOP que gera financeiro, tente salvar a nota sem o Plano de Contas (bloqueio de propósito).",
      "r": "**Explique ao cliente:** quando o CFOP gera financeiro, a nota precisa saber em que conta o título vai cair; CFOP de remessa ou retorno dispensa. **Confira:** o sistema recusa com \"Plano de Contas (Conta de Fluxo de Caixa) é obrigatório para salvar a nota fiscal…\". Preencha de novo. **Fonte:** FAT-NFE-001/002; FAT B, quem trava quando falta.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Salvar e ver o pedido virar Faturado",
    "onde": "`Faturamento > Notas Fiscais` e `Vendas > Pedidos de Venda`",
    "intro": "Salvar cria a nota Em Aberto, ainda sem nada enviado à SEFAZ. O cliente vê na hora o reflexo no pedido e aprende a achar a nota na lista.",
    "passos": [
     {
      "t": "**Faça:** clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** a nota nasce Em Aberto; ela ainda pode ser editada e nada foi enviado à SEFAZ. **Confira:** a nota abre em \"Editar NF-e\"; anote o número. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1; procedimento-faturar-o-pedido-e-finalizar-a-nota, passo 4.",
      "s": "v",
      "campo": "Nº da nota"
     },
     {
      "t": "**Faça:** volte a `Vendas > Pedidos de Venda`, troque o Status para \"Todos\" e localize o pedido.",
      "r": "**Explique ao cliente:** o pedido fica \"Faturado\" assim que a nota é salva, mesmo com a nota Em Aberto; por isso o status que vale é o da nota. **Confira:** pedido \"Faturado\" com a coluna NOTA FISCAL preenchida. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1; FAT-NFE-012.",
      "s": "v"
     },
     {
      "t": "**Faça:** em `Faturamento > Notas Fiscais`, aba **NF-e**, leia os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas e troque o filtro Status.",
      "r": "**Explique ao cliente:** a lista abre filtrada em Status \"Em Aberto\"; nota autorizada ou cancelada só aparece trocando o filtro. **Confira:** a nota de teste na lista, com a coluna Ambiente = Homologação. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra o menu `⋯` da nota e mostre as ações, sem executar.",
      "r": "**Explique ao cliente:** Editar, Finalizar NF, Preview da DANFE, Duplicar, Ver Timeline, Anexos e Excluir; o avião de papel na linha é **Transmitir**. Excluir só vale para nota Em aberto ou Rejeitada, sem existência fiscal, e devolve o pedido. **Confira:** as ações que o perfil do usuário enxerga. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 2; FAT-OPE-003/004.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em `⋯ > Preview da DANFE`.",
      "r": "**Explique ao cliente:** é a prévia para conferir antes de transmitir. **Confira:** abre em nova aba (libere pop-ups) com emitente, destinatário, itens e totais. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 2; procedimento-faturar-o-pedido-e-finalizar-a-nota, passo 5.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "4. Transmitir em homologação com o responsável fiscal",
    "onde": "botão **Transmitir** (avião de papel) na linha da nota, em `Faturamento > Notas Fiscais`",
    "intro": "Só com o responsável fiscal ao lado e a faixa de homologação visível. O cliente vê o pré-voo, a autorização e o que fazer numa rejeição.",
    "passos": [
     {
      "t": "**Faça:** numa nota de teste com um item sem NCM (ou cliente sem CEP), clique em **Transmitir** (bloqueio de propósito).",
      "r": "**Explique ao cliente:** antes de enviar, o sistema faz um pré-voo (certificado, ambiente, endereço com IBGE, NCM, CFOP, CST e origem por item) e lista tudo o que falta, sem enviar nada. **Confira:** a lista de pendências, por exemplo \"Item N: NCM obrigatório\" ou \"Endereço do destinatário: CEP obrigatório\". **Fonte:** FAT-TRA-001; FAT D, seção 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** com a autorização do responsável fiscal, transmita a nota do primeiro pedido.",
      "r": "**Explique ao cliente:** número e série são dados na transmissão e nunca voltam. **Confira:** a nota fica \"Autorizada\" com chave e protocolo, e o número segue a série configurada. **Fonte:** FAT-TRA-002; FAT D, seção 4; README da cadeia, passo 3.",
      "s": "d",
      "campo": "Chave / protocolo"
     },
     {
      "t": "**Faça:** enquanto a nota processa, não clique de novo; mostre o que acontece se clicar.",
      "r": "**Explique ao cliente:** uma transmissão por vez; a consulta automática roda a cada 5 minutos. **Confira:** \"Transmissão já em andamento para esta nota. Aguarde a conclusão.\" ou \"Nota ainda em processamento pela SEFAZ…\". **Fonte:** FAT-TRA-004/005/009; FAT C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** se a SEFAZ rejeitar, leia o motivo, corrija a nota ou o cadastro e transmita de novo.",
      "r": "**Explique ao cliente:** rejeição não consome número e não mexe no pedido. A 539 (duplicidade) se resolve avançando a série no botão \"Configuração Guiada\" da tela Certificados. **Confira:** \"Rejeitada\" sem número, pedido ainda \"Faturado\" e, depois de corrigir, \"Autorizada\". **Fonte:** FAT-TRA-007; FAT C, rejeições catalogadas.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira a data de emissão da nota autorizada.",
      "r": "**Explique ao cliente:** a data de emissão é sempre a do dia da transmissão, mesmo que a nota tenha sido criada antes. **Confira:** a data do dia. **Fonte:** FAT-TRA-003; FAT D, seção 4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. DANFE, XML, e-mail e carta de correção",
    "onde": "menu `⋯` da nota autorizada",
    "intro": "Com a nota autorizada, o faturista entrega o documento ao cliente final e aprende a corrigir o que a lei permite sem cancelar.",
    "passos": [
     {
      "t": "**Faça:** use **Baixar PDF/DANFE** e **Baixar XML**.",
      "r": "**Explique ao cliente:** a DANFE mostra o logo da empresa, a natureza da operação (descrição do CFOP) e os textos fiscais ligados ao CFOP. **Confira:** PDF e XML baixados, com natureza e textos certos. **Fonte:** FAT C, etapa 8 (ações da listagem); FAT D, seção 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** use **Reenviar Email** para um contato de teste com a marca \"E-mail Notas Fiscais\".",
      "r": "**Explique ao cliente:** só nota autorizada vai por e-mail, e só para contatos com essa marca. **Confira:** o e-mail recebido. Sem contato marcado: \"Nenhum destinatário encontrado. Cadastre um contato com email e \"E-mail Notas Fiscais\" habilitado no participante da nota.\". **Fonte:** FAT-OPE-005; FAT B, quem trava quando falta.",
      "s": "d"
     },
     {
      "t": "**Faça:** com o responsável fiscal, emita uma **Carta de Correção** com um texto de pelo menos 15 caracteres.",
      "r": "**Explique ao cliente:** a CC-e só existe em nota autorizada (até 20 por nota) e o perfil Faturista não emite. Em nota Em Aberto a ação não aparece. **Confira:** a carta \"Autorizada\" com protocolo, PDF e XML. **Fonte:** FAT-OPE-001/008; FAT D, seção 4; fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Reflexos da nota no financeiro, no estoque e nos painéis",
    "onde": "`Financeiro > Contas a Receber`, `Estoque > Movimentos`, `Vendas > Pedidos de Venda`",
    "intro": "A nota é o documento que movimenta: gera título, baixa estoque e entra nos indicadores. O cliente vê cada efeito no módulo de destino.",
    "passos": [
     {
      "t": "**Faça:** abra `Financeiro > Contas a Receber`, limpe o filtro Status e pesquise o número da nota.",
      "r": "**Explique ao cliente:** com CFOP que gera financeiro, módulo Financeiro contratado e pedido sem títulos, a nota gera um título por parcela. Se o pedido já tinha gerado, a nota não gera de novo. **Confira:** um título \"Em aberto\" por parcela, com o documento da nota, plano e meio da parcela. **Fonte:** FAT-TIT-001/002/007; FIN D, E2E-1.",
      "s": "d",
      "campo": "Nº dos títulos"
     },
     {
      "t": "**Faça:** no pedido faturado, abra o menu `⋯` e mostre **Gerar Títulos**.",
      "r": "**Explique ao cliente:** o pedido não gera título em dobro depois de faturado. **Confira:** a opção desabilitada com \"Pedido já faturado\". **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 1; FAT-TIT-001.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Estoque > Movimentos` e o saldo do produto.",
      "r": "**Explique ao cliente:** se o CFOP marca \"Movimenta Estoque\", a nota dá saída do produto. **Confira:** a saída ligada à nota (anote se não houver). **Fonte:** FAT-TRA-008; FAT B, movimentações; fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** use `⋯ > Ver Timeline` na nota.",
      "r": "**Explique ao cliente:** o histórico guarda os eventos da nota (autorização, CC-e, cancelamento). **Confira:** o evento da autorização (anote se a lista vier vazia). **Fonte:** FAT D, seção 4; fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o Dashboard Faturamento.",
      "r": "**Explique ao cliente:** notas autorizadas e finalizadas contam como faturadas; canceladas ficam fora. **Confira:** a nota de teste no painel. **Fonte:** FAT-IND-001; FAT D, seção 5.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. Cancelamento na ordem certa",
    "onde": "menu `⋯ > Cancelar` da nota autorizada",
    "intro": "Use a segunda nota de teste, autorizada como no bloco 4. A ordem é: estornar o recebimento, tirar o pedido da carga, cancelar a nota e, se for o caso, cancelar o pedido.",
    "passos": [
     {
      "t": "**Faça:** receba um título da segunda nota em `Financeiro > Contas a Receber` e tente cancelar a nota (bloqueio de propósito).",
      "r": "**Explique ao cliente:** nota com título recebido, pedido em carga ou nota em processamento não cancela. Primeiro desfaz o que veio depois dela. **Confira:** o sistema recusa o cancelamento. **Fonte:** FAT-CAN-002; FAT D, seção 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** estorne o recebimento do título e, se o pedido estiver numa carga, tire-o da carga.",
      "r": "**Explique ao cliente:** é a ordem nota → títulos → pedido vista de trás para a frente. Com carga: \"Não é possível cancelar esta NF: o pedido vinculado está na carga de expedição #N…\". **Confira:** título de volta a \"Em aberto\". **Fonte:** FAT-CAN-002; FAT C, erros comuns; README da cadeia, passo 8.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente cancelar com uma justificativa de 10 caracteres (bloqueio de propósito).",
      "r": "**Explique ao cliente:** a lei exige pelo menos 15 caracteres. **Confira:** \"Motivo do cancelamento deve ter no mínimo 15 caracteres conforme legislação\". **Fonte:** FAT-CAN-004; FAT C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** com o responsável fiscal, cancele com uma justificativa de 20 caracteres ou mais e acompanhe em **Status Cancelamento**.",
      "r": "**Explique ao cliente:** o prazo depende da UF do emitente (24h padrão; MT 8h; PR e RS 168h); fora dele o sistema pede confirmação e depende da SEFAZ. **Confira:** \"Canc. Pendente\" e depois \"Cancelada\". **Fonte:** FAT-CAN-001/004/005/006; FAT D, seção 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira os reflexos em `Financeiro > Contas a Receber`, `Estoque > Movimentos` e `Vendas > Pedidos de Venda`; se o teste pede, cancele o pedido em seguida.",
      "r": "**Explique ao cliente:** cancelar a nota exclui os títulos em aberto (e pede a baixa do boleto), estorna estoque e comissão e devolve o pedido. **Confira:** títulos excluídos, estoque estornado e pedido de volta a \"Em aberto\"; depois, pedido \"Cancelado\" com motivo. **Fonte:** FAT-CAN-003; FAT-TIT-004; README da cadeia, passos 7 e 8.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "8. Nota gerencial e NFS-e (quando o cliente usar)",
    "onde": "menu `⋯ > Finalizar NF`, menu `⋯ > Faturar serviços (NFS-e)` do pedido e aba **NFS-e** de `Faturamento > Notas Fiscais`",
    "intro": "Só se o cliente usa nota gerencial (sem SEFAZ) ou presta serviço. A NFS-e segue um passo a mais que a NF-e: salvar, finalizar e transmitir.",
    "passos": [
     {
      "t": "**Faça:** se o cliente usa nota gerencial, numa nota Em Aberto de teste clique em **Finalizar NF** e confirme (\"a nota ficará disponível apenas para visualização\").",
      "r": "**Explique ao cliente:** \"Finalizar NF\" não vai à SEFAZ: vira nota gerencial (`NF - 001`), gera financeiro e comissão e depois só pode ser cancelada. **Confira:** nota \"Finalizada\". Sem almoxarifado ativo: \"Não foi possível resolver o local de estoque…\"; com projeto sem local: \"O projeto … não tem local de estoque ativo\". **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 3; FAT-FIN-001/002/004.",
      "s": "v"
     },
     {
      "t": "**Faça:** se a finalização falhar, confira a lista e o número da nota.",
      "r": "**Explique ao cliente:** anote o número antes de tentar de novo. **Confira:** a lista pode mostrar \"Algo deu errado… Tentar Novamente\" e o número já ter sido consumido. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** num pedido com produto e serviço, use **Faturar** para o produto e **Faturar serviços (NFS-e)** para o serviço.",
      "r": "**Explique ao cliente:** o serviço do pedido sai numa NFS-e vinculada; o ISS vem da Regra Fiscal de Serviço. **Confira:** NF-e com o produto e NFS-e com o serviço, ligadas ao mesmo pedido. **Fonte:** FAT-NFS-012; FAT C, etapa 8; FAT D, seção 4.",
      "s": "d",
      "campo": "Nº da NFS-e"
     },
     {
      "t": "**Faça:** com o responsável fiscal, salve a NFS-e, clique em **Finalizar NF** e depois em **Transmitir**.",
      "r": "**Explique ao cliente:** hoje o sistema ainda numera o RPS só no Finalizar; a consulta da NFS-e roda a cada 15 minutos. Prefeitura não homologada ou por upload é recusada. **Confira:** \"Autorizada\" com número e código de verificação, ISS da regra. **Fonte:** FAT-NFS-001/004/005; FAT B, estados da NFS-e e jobs.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Financeiro > Contas a Receber` e pesquise a NFS-e.",
      "r": "**Explique ao cliente:** serviço sempre gera financeiro (não depende de CFOP), se o cliente tem o módulo Financeiro. **Confira:** títulos com origem na NFS-e. **Fonte:** FAT-NFS-011; FAT-TIT-007.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O pedido virou nota com cliente, itens, CFOP, parcelas e transporte corretos, e o pedido ficou \"Faturado\".",
    "s": "v"
   },
   {
    "t": "A NF-e foi autorizada em homologação com o número da série configurada, com o responsável fiscal presente.",
    "s": "d"
   },
   {
    "t": "Os títulos nasceram da nota (ou do pedido, conforme a decisão X2), sem duplicar, e os reflexos no estoque e nos painéis foram conferidos ou anotados.",
    "s": "d"
   },
   {
    "t": "DANFE, XML, e-mail e CC-e funcionaram na nota autorizada.",
    "s": "d"
   },
   {
    "t": "A segunda nota foi cancelada na ordem certa: títulos excluídos, estoque estornado, pedido de volta.",
    "s": "d"
   },
   {
    "t": "Os bloqueios (plano de contas, pré-voo, cancelamento com título recebido e com justificativa curta) foram demonstrados.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só ambiente de teste (homologação) e registros com \"TESTE FLUXO CONSULTOR\". **Nota fiscal só é transmitida, cancelada ou corrigida com o responsável fiscal do cliente.**",
   "**Transmitir** fica a um clique na linha (avião de papel) e é irreversível, mesmo em homologação. **Excluir** está no mesmo menu de Ver Timeline e Anexos.",
   "O pedido fica \"Faturado\" assim que a nota é **salva**, mesmo Em Aberto: confira sempre o status da nota.",
   "A lista de notas abre filtrada em \"Em Aberto\"; os cartões de totais seguem esse filtro. Nota autorizada ou cancelada só aparece trocando o Status.",
   "Série errada antes da primeira transmissão colide com a numeração antiga (rejeição 539). O número dado na transmissão nunca volta.",
   "Hoje o sistema ainda recalcula a devolução pelas regras atuais, sem espelhar os tributos da nota original: confira os valores com o contador.",
   "Pedido de contrato de fornecimento só vira nota depois do faturamento no contrato: \"Este pedido está vinculado ao Contrato de Fornecimento #N…\".",
   "Transmissão em lote: não venda como PRO; hoje o sistema libera em todas as versões."
  ],
  "naoValidado": [
   "Estoque na nota: a gestora diz que a autorização ou a finalização baixa o estoque (FAT-TRA-008, FAT B). No fluxo antigo (conferido em 19/10/2026), a finalização não gerou movimento em `Estoque > Movimentos`. Conferir na tela.",
   "Finalizar NF: o fluxo antigo trata \"Finalizar NF\" como etapa para encerrar a nota sem transmitir. A gestora diz que a nota finalizada é gerencial, não vai à SEFAZ e depois só pode ser cancelada (FAT-FIN-001/002/004, FAT B). Conferir na tela se uma nota finalizada ainda pode ser transmitida, antes de ensinar a ordem.",
   "Títulos da nota: a gestora diz que a nota gera os títulos na autorização ou na finalização (FAT-TIT-001). No fluxo antigo, a nota finalizada não teve título conferido e os títulos do teste vieram de \"Gerar Títulos\" do pedido depois de Entregue. Conferir na tela.",
   "Histórico da nota: a gestora espera evento no histórico depois da autorização (FAT D). No fluxo antigo, \"Ver Timeline\" apareceu vazia. Conferir na tela.",
   "Transmissão, rejeição, CC-e, cancelamento, reenvio de e-mail, NFS-e e Dashboard Faturamento ainda não foram executados na tela: os nomes de ação vêm do código lido pela gestora."
  ],
  "video": {
   "id": "consultor-07-faturamento",
   "titulo": "Do pedido à nota fiscal",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-fiscal",
  "arquivo": "implantacao-06-fiscal.html",
  "etiqueta": "Consultor · Implantação · Fiscal",
  "titulo": "Implantação do Fiscal: roteiro prático com o cliente e o contador",
  "subtitulo": "Com o contador ao lado: conferir empresa e regime, CFOP e textos fiscais, NCM e regras de tributação por estado, rodar o Onboarding e provar num pedido e numa nota como o imposto é calculado, inclusive o aviso quando falta configuração.",
  "objetivo": "Ao final, o cliente e o contador terão visto cada operação típica (venda interna, interestadual, a não contribuinte, com ST, serviço) calculada sem aviso no item e com valores conferidos. Eles saberão onde cada resposta do contador entra no sistema e como ler o aviso de imposto não calculado.",
  "rodape": "Checklist de implantação · Fiscal · fontes: Fiscal A, B, C e D da metodologia, Faturamento C (CFOP), fluxo antigo \"Fluxo de faturamento e fiscal\", fluxo completo do consultor e trilha dos estagiários · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação concluída: empresas com regime, CNAE, IE e endereço com IBGE; produtos com NCM, origem e categoria; participantes com UF, IE e as marcas \"Não Contribuinte\" e \"Produtor Rural\" revisadas.",
    "r": "**Confira:** checklist da Fundação assinado e uma amostra de 10 clientes. **Fonte:** FIS C, pré-requisitos; FIS D, seção 2 (FIS-CTX-007).",
    "s": "d"
   },
   {
    "t": "**Contador do cliente presente**, com a planilha \"NCM × tributação\" e a lista de CFOPs por operação (CST/CSOSN de ICMS, IPI, PIS, COFINS, CBS, IBS).",
    "r": "**Confira:** documentos recebidos antes da sessão. O consultor não decide tributação: toda alíquota, CST, MVA e benefício vem do contador. **Fonte:** FIS C, \"Do cliente e do contador\".",
    "s": "d"
   },
   {
    "t": "Módulo `fiscal` na licença e versão compatível com o regime de todas as empresas; cliente ciente do que é PRO (Escrituração SPED, Perfil SUFRAMA, Mapa de Apuração, MDF-e).",
    "r": "**Confira:** *Minha Assinatura* e o menu Fiscal sem cadeado. **Fonte:** FIS C, comerciais; FIS D, seção 1.",
    "s": "d"
   },
   {
    "t": "Ambiente fiscal em **Homologação** (faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" na nota).",
    "r": "**Confira:** a faixa na nota de teste. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos.",
    "s": "v"
   },
   {
    "t": "Clientes de teste \"TESTE FLUXO CONSULTOR\" para cada operação: PJ com IE na mesma UF, PJ com IE em outra UF e PF não contribuinte em outra UF.",
    "r": "**Confira:** UF, IE e \"Não Contribuinte\" de cada um. **Fonte:** FIS D, seção 3.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Empresa e regime",
    "onde": "`Configurações > Empresas`",
    "intro": "O regime da empresa é a primeira decisão do motor de impostos: sem ele nada calcula. Vem antes de CFOP e NCM porque muda o caminho inteiro (CSOSN ou CST).",
    "passos": [
     {
      "t": "**Faça:** com o contador, abra cada empresa e confira, em \"Dados Gerais\", o \"Regime de Apuração\" e o \"Tipo de Atividade\".",
      "r": "**Explique ao cliente:** no Simples o ICMS usa CSOSN; no Presumido e no Real usa CST. Tipo \"Industrial\" destaca IPI; empresa comercial não destaca. **Confira:** os dois campos preenchidos em todas as empresas. **Fonte:** FIS C, etapa 1; FIS-APL-002/004.",
      "s": "d"
     },
     {
      "t": "**Faça:** em empresa do Presumido ou do Real, confira na seção \"Configuração Fiscal\" as alíquotas de PIS e COFINS; no Simples, a \"Alíquota Crédito Simples Nacional (%)\".",
      "r": "**Explique ao cliente:** PIS/COFINS usa a alíquota da empresa ou a do regime; o crédito do Simples só vale com CSOSN 101. **Confira:** valores iguais aos do contador. **Fonte:** FIS C, etapa 1; FIS-PCO-001; FIS-ICM-003.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira \"CBS (%)\" e \"IBS (%)\" vazios (ou com a alíquota de teste aprovada pelo contador) e \"Antecipar Reforma (CBS/IBS)\" desligado.",
      "r": "**Explique ao cliente:** vazios, o sistema usa a alíquota de teste da fase (CBS 0,9% e IBS 0,1% em 2026). Os números que aparecem no campo vazio (8,80 e 17,70) são a alíquota plena: preenchidos em 2026, o imposto sai dezenas de vezes maior. **Confira:** campos vazios ou com a alíquota aprovada. **Fonte:** FIS C, etapa 1; FIS-CBS-002/003; FIS-APL-007.",
      "s": "d"
     },
     {
      "t": "**Faça:** em \"Parâmetros\", informe o CPF do contador em \"CPF/CNPJ do Contador\".",
      "r": "**Explique ao cliente:** o SPED exige CPF de 11 dígitos; com CNPJ do escritório a escrituração trava. **Confira:** CPF informado. **Fonte:** FIS C, etapa 1.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. CFOP e textos fiscais",
    "onde": "`Fiscal > Configurações > CFOP` (também em `Faturamento > Configurações > CFOP`) e `Fiscal > Configurações > Textos Fiscais`",
    "intro": "O CFOP carrega os CSTs padrão e liga ou desliga cada imposto. Aqui se completam os campos fiscais dos CFOPs que o Faturamento já revisou quanto a financeiro e estoque.",
    "passos": [
     {
      "t": "**Faça:** abra cada CFOP da lista do contador e confira a descrição e as marcas \"Gera Financeiro\", \"Movimenta Estoque\" e \"Devolução\".",
      "r": "**Explique ao cliente:** a descrição do CFOP vira a natureza da operação na nota; não existe cadastro separado de natureza. **Confira:** descrição e marcas aprovadas pelo contador. **Fonte:** FAT C, etapa 2; FAT-NFE-007; README da cadeia, decisão X1.",
      "s": "d"
     },
     {
      "t": "**Faça:** em cada CFOP tributado, confira \"CST ICMS (Lucro Presumido/Real)\" e \"CSOSN (Simples Nacional)\" e as marcas \"Aplicar ICMS\", \"Aplicar PIS\" e \"Aplicar COFINS\".",
      "r": "**Explique ao cliente:** desmarcadas, essas marcas desligam o imposto. A lista padrão de CFOP vem com CSOSN e CST de IPI, mas sem CST de ICMS, PIS e COFINS: empresa do Presumido ou do Real precisa preencher. **Confira:** CST/CSOSN preenchidos e marcas ligadas. **Fonte:** FIS C, etapa 2; FIS-APL-001; FIS-CFO-007.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira \"CST IPI\", \"CST PIS\", \"CST COFINS\", \"CST CBS\" e \"CST IBS\"; no Simples com crédito, marque \"Gerar Crédito Simples Nacional\".",
      "r": "**Explique ao cliente:** o CST do item segue a ordem: escolhido à mão, NCM × Estado, NCM e por último o CFOP. **Confira:** CSTs iguais aos do contador; nenhum CST de crédito em CFOP de saída. **Fonte:** FIS C, etapa 2; FIS B, ordem das fontes; FIS-PCO-005.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Fiscal > Configurações > Textos Fiscais`, cadastre os textos legais do contador e ligue-os ao CFOP nos campos \"Texto Fiscal ICMS\", \"IPI\", \"PIS\" e \"COFINS\".",
      "r": "**Explique ao cliente:** hoje o sistema ainda só leva para a nota o texto ligado ao CFOP; texto ligado ao NCM, ao estado ou ao perfil SUFRAMA não sai, e texto inativo continua saindo. **Confira:** o texto na DANFE de teste. **Fonte:** FIS C, etapa 6; FIS-TXT-002/003.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. NCM e regras de tributação por estado",
    "onde": "`Fiscal > Configurações > NCM` (modal \"NCM por Estado\" na mesma tela)",
    "intro": "O NCM traz as alíquotas e os CSTs de cada produto; o NCM por Estado traz as exceções por UF de destino (ST, DIFAL, benefício). É a planilha do contador entrando no sistema.",
    "passos": [
     {
      "t": "**Faça:** abra o NCM do produto de teste e confira as alíquotas de ICMS, IPI, PIS e COFINS e os CSTs de saída, em especial o **CST de PIS/COFINS de saída**.",
      "r": "**Explique ao cliente:** sem o CST de PIS/COFINS de saída, o item sai com o quadro \"Impostos não calculados\". **Confira:** valores iguais aos da planilha do contador. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos; FIS C, etapa 3; FIS-NCM-005.",
      "s": "v"
     },
     {
      "t": "**Faça:** no modal \"NCM por Estado\", crie ou confira uma linha para cada UF de destino com exceção: \"Estado Destino\", \"ICMS %\", \"Redução BC ICMS %\", \"IVA ICMS ST %\", \"Modalidade da BC do ST\", \"FCP %\" e \"Código do Benefício Fiscal (cBenef)\".",
      "r": "**Explique ao cliente:** todo NCM com ST precisa de linha com MVA para cada UF de destino, senão o ST sai zerado com aviso. O motor olha só o destino. Para muitas UFs, use a importação de NCM × Estado. **Confira:** uma linha por UF de venda. **Fonte:** FIS C, etapa 3; FIS-IST-002; FIS-NCM-009.",
      "s": "d"
     },
     {
      "t": "**Faça:** nos NCMs com ST, confira o CEST.",
      "r": "**Explique ao cliente:** NCM com ST sem CEST é rejeitado pela SEFAZ (rejeição 806). **Confira:** CEST preenchido. **Fonte:** FIS C, etapa 3; FAT C, rejeições catalogadas.",
      "s": "d"
     },
     {
      "t": "**Faça:** se houver CSOSN 101, cadastre em `Fiscal > Alíquota de Crédito do Simples` a alíquota de cada competência; se vender para ZFM/ALC (Enterprise), crie o perfil em `Fiscal > Configurações > Perfil SUFRAMA` e vincule no participante.",
      "r": "**Explique ao cliente:** sem alíquota da competência nem da empresa, o crédito sai zero. Do perfil SUFRAMA, hoje só a redução de ICMS e o texto automático funcionam. **Confira:** alíquota da competência de teste e o campo \"Perfil SUFRAMA\" no cliente. **Fonte:** FIS C, etapas 4 e 5; FIS-ICM-003; FIS-SUF-004.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Onboarding e Diagnóstico Fiscal",
    "onde": "`Fiscal > Onboarding Fiscal` e `Fiscal > Diagnóstico Fiscal`",
    "intro": "Depois de configurar, o sistema confere a empresa e as tabelas. O cliente aprende que \"liberado\" no Onboarding não garante cálculo certo: só os testes dos blocos seguintes garantem.",
    "passos": [
     {
      "t": "**Faça:** em `Fiscal > Onboarding Fiscal`, escolha cada empresa e zere as pendências obrigatórias.",
      "r": "**Explique ao cliente:** o Onboarding verifica empresa, regime, tabelas de CST/CSOSN, pelo menos uma linha de NCM × Estado, ambiente da NF-e e certificado. Ele não verifica os seus NCMs e CFOPs. A tela ainda fala em \"go-live bloqueado\", mas hoje ela só informa. **Confira:** nenhuma pendência obrigatória. **Fonte:** FIS C, etapa 7; FIS-ONB-001.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Fiscal > Diagnóstico Fiscal`.",
      "r": "**Explique ao cliente:** é tela de suporte; sem a permissão aparece \"Esta tela é restrita à equipe de suporte…\". **Confira:** \"Tabelas fiscais do cliente completas\" (ou chamado aberto). **Fonte:** FIS C, etapa 7; FIS-ONB-003/004.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre ao cliente quais tabelas são da Faktory e quais são dele.",
      "r": "**Explique ao cliente:** estados, CST, CSOSN, CEST e LC 116 são mantidos pela Faktory (pedido de correção vai ao suporte); NCM, NCM × Estado, CFOP, textos fiscais e regras de serviço são do cliente, com o contador. **Confira:** o cliente sabe a quem pedir cada correção. **Fonte:** FIS C, seção 4; FIS-TAB-002.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Provar o cálculo no pedido de venda",
    "onde": "`Vendas > Pedidos de Venda > Novo Pedido`",
    "intro": "O motor de impostos é chamado ao salvar o pedido, ao alterar um item e no \"Recalcular\". O contador confere os valores na aba de impostos do item, operação por operação.",
    "passos": [
     {
      "t": "**Faça:** crie um pedido para o cliente de teste PJ com IE na mesma UF: preencha Empresa e Cliente e escolha o **CFOP**.",
      "r": "**Explique ao cliente:** o CFOP só libera depois de empresa e cliente e vem filtrado pelo estado do cliente. Pode aparecer \"Cliente sem IE informado e não marcado como não contribuinte.\". **Confira:** CFOP de venda interna disponível. **Fonte:** trilha dos estagiários, checklist de Vendas; fluxo antigo \"Fluxo completo\" (dados-checklist-consultor), bloco do pedido.",
      "s": "v"
     },
     {
      "t": "**Faça:** adicione o produto típico (no diálogo **Dados do Item**, preencha as medidas e clique em **Aplicar**) e leia o quadro **\"Impostos não calculados no item\"**, se aparecer.",
      "r": "**Explique ao cliente:** o quadro mostra o motivo por tributo (ex.: CST de PIS/COFINS ausente na NCM). **Confira:** o motivo anotado e corrigido no cadastro. **Fonte:** trilha dos estagiários, checklist de Vendas; fluxo antigo \"Fluxo completo\" (dados-checklist-consultor), bloco do pedido.",
      "s": "v"
     },
     {
      "t": "**Faça:** com o contador, confira os impostos do item: CST/CSOSN, ICMS pela alíquota interna do NCM e PIS/COFINS sem o ICMS na base (Presumido/Real).",
      "r": "**Explique ao cliente:** a venda interna a contribuinte não tem DIFAL; no Simples não há ICMS destacado (salvo CSOSN 101, 201 e 900) nem PIS/COFINS e IPI. **Confira:** valores iguais ao cálculo do contador e nenhum aviso no item. **Fonte:** FIS D, seção 3; FIS B, caminho Simples × Presumido/Real.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **Salvar e Permanecer**.",
      "r": "**Explique ao cliente:** regra de ouro: o pedido salva mesmo com imposto zerado e aviso no item; o teste só passa sem aviso. **Confira:** \"Pedido PV-xxxxxx criado\". **Fonte:** trilha dos estagiários, checklist de Vendas; FIS-CTX-010.",
      "s": "v",
      "campo": "Nº do pedido"
     },
     {
      "t": "**Faça:** repita com o cliente PJ de outra UF e com o cliente PF não contribuinte de outra UF.",
      "r": "**Explique ao cliente:** interestadual a contribuinte não tem DIFAL; a não contribuinte em outra UF tem DIFAL e FCP de destino (só regime normal; o Simples não calcula). Hoje a tabela de estados ainda traz 12% de alíquota interestadual em todas as UFs. **Confira:** alíquota interestadual, DIFAL e FCP conferidos pelo contador. **Fonte:** FIS D, seção 3; FIS-DIF-001/004; FIS-ICM-009.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Provar o cálculo na nota",
    "onde": "menu `⋯ > Faturar` do pedido e `Faturamento > Notas Fiscais`",
    "intro": "Na nota, o cálculo é refeito ao importar os itens e ao trocar o CFOP. O contador vê o ajuste manual e a transmissão em homologação de cada operação.",
    "passos": [
     {
      "t": "**Faça:** fature o pedido de teste e importe os itens com \"Recalcular impostos\".",
      "r": "**Explique ao cliente:** os impostos são recalculados na nota. Se aparecer o quadro \"Impostos não calculados no item\", a nota ainda salva. **Confira:** os mesmos valores do pedido e o motivo de qualquer aviso. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", bloco 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** troque o CFOP de um item e veja o CST mudar; depois use \"Sobrescrever manualmente\" para manter um código.",
      "r": "**Explique ao cliente:** trocar o CFOP resolve o CST de novo; \"Sobrescrever manualmente\" mantém o código escolhido. **Confira:** o CST novo e, com a sobrescrita, o código mantido. **Fonte:** FAT-NFE-016; FIS B, ordem das fontes.",
      "s": "d"
     },
     {
      "t": "**Faça:** sobrescreva a alíquota de ICMS de um item.",
      "r": "**Explique ao cliente:** o valor digitado vale e o PIS/COFINS é recalculado sobre o ICMS digitado. **Confira:** ICMS novo e PIS/COFINS recalculado. **Fonte:** FIS D, seção 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** com o responsável fiscal, transmita em homologação uma NF-e de cada operação testada.",
      "r": "**Explique ao cliente:** se houver item com imposto não calculado, a transmissão pede confirmação (\"X itens com impostos não calculados: [lista]. Transmitir mesmo assim?\"); a resposta certa é não, e corrigir o cadastro. **Confira:** notas \"Autorizadas\", sem rejeição 778 (NCM), 806 (CEST), 600 ou 508 (CST/CSOSN para não contribuinte). **Fonte:** FIS D, seção 3; FIS B, quem trava quando falta.",
      "s": "d"
     },
     {
      "t": "**Faça:** se houver devolução de venda, gere a devolução a partir de uma nota autorizada e confira os valores com o contador.",
      "r": "**Explique ao cliente:** hoje o sistema ainda recalcula a devolução pelas regras atuais, sem espelhar os tributos da nota original. **Confira:** diferença registrada em ata. **Fonte:** FIS D, seção 3; FAT-DEV-007.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. O aviso quando falta configuração",
    "onde": "pedido de venda ou nota de teste, aba de impostos do item",
    "intro": "O consultor provoca a falta de cadastro de propósito para o cliente reconhecer o aviso, saber onde corrigir e ver o \"Recalcular\" funcionar.",
    "passos": [
     {
      "t": "**Faça:** venda um produto com ST para uma UF sem linha de MVA no NCM por Estado (bloqueio de propósito).",
      "r": "**Explique ao cliente:** o documento salva, o ICMS próprio é calculado e o ST sai zerado com o aviso. **Confira:** \"ICMS-ST não calculado: falta a MVA para <UF> …\". **Fonte:** FIS-IST-002; FIS D, seção 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** use um item cujo CFOP e NCM não tenham CST (bloqueio de propósito).",
      "r": "**Explique ao cliente:** sem CST em nenhuma fonte, o imposto não é calculado e a transmissão não deve seguir. **Confira:** o aviso \"Sem CST: …\" no item. **Fonte:** FIS-CST-001; FIS D, seção 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** numa empresa de teste sem regime, tente salvar um pedido (bloqueio de propósito).",
      "r": "**Explique ao cliente:** sem regime nada calcula, e o documento não salva. **Confira:** \"Informe o regime de apuração da empresa\". **Fonte:** FIS-APL-002; FIS-CTX-006; FIS C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** corrija o cadastro que faltava (linha de MVA, CST ou regime) e clique em \"Recalcular\" no documento.",
      "r": "**Explique ao cliente:** o cálculo não se refaz sozinho nos documentos já salvos; \"Recalcular\" aplica o cadastro novo. **Confira:** o aviso some e os valores aparecem. **Fonte:** FIS C, erros comuns; FIS B, onde o motor é chamado.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "8. Serviço, obrigações acessórias e perfis",
    "onde": "`Fiscal > Regras Fiscais de Serviço`, `Fiscal > Escrituração SPED`, `Fiscal > Sintegra`, `Fiscal > GNRE`",
    "intro": "Fecha o roteiro com o que não é cálculo de mercadoria: ISS e retenções do serviço, quem entrega cada obrigação e quem pode mexer nos cadastros fiscais.",
    "passos": [
     {
      "t": "**Faça:** se o cliente presta serviço, confira em `Fiscal > Regras Fiscais de Serviço` uma regra por código LC 116, cidade e tipo de tomador, com ISS, retenções, NBS e IBS/CBS.",
      "r": "**Explique ao cliente:** a NFS-e não passa pelo motor: ISS e retenções vêm da regra; a regra só preenche o que estiver vazio. Prestador do Presumido ou do Real que sofre retenção de PIS/COFINS/CSLL/IRRF: hoje a tela da empresa ainda não tem esses campos (acionar o suporte). **Confira:** ISS da regra numa NFS-e de teste. **Fonte:** FIS C, pré-requisitos e F11/F12; FAT-NFS-003; FIS-RET-003.",
      "s": "d"
     },
     {
      "t": "**Faça:** combine por escrito com o contador quem entrega EFD ICMS/IPI, EFD Contribuições, Sintegra e GNRE.",
      "r": "**Explique ao cliente:** o Flow gera os arquivos, mas o contador valida no PVA e entrega. **Confira:** ata com o responsável por cada obrigação. **Fonte:** FIS D, seção 4; FIS C, etapa 8.",
      "s": "d"
     },
     {
      "t": "**Faça:** se o cliente tem PRO e vai gerar o SPED, abra `Fiscal > Escrituração SPED`, clique em \"Nova Escrituração\" e leia o \"Diagnóstico de prontidão\".",
      "r": "**Explique ao cliente:** o diagnóstico pede IE, UF, IBGE, CPF do contador e responsável fiscal vigente; hoje o responsável fiscal e a configuração de escrituração ainda não têm tela e são cadastrados pelo suporte. **Confira:** diagnóstico sem inconsistências ou chamado aberto. **Fonte:** FIS C, etapa 8.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira que o responsável fiscal tem o perfil Supervisor Fiscal (ou perfil próprio com as permissões do Fiscal).",
      "r": "**Explique ao cliente:** só quem responde pelo fiscal mexe em NCM, CFOP e textos: alterar afeta todas as notas. **Confira:** perfil do usuário em `Segurança > Perfis de Acesso`. **Fonte:** FIS C, etapa 9; FIS D, seção 5.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Todas as empresas com regime, tipo de atividade, PIS/COFINS e CBS/IBS conferidos pelo contador.",
    "s": "d"
   },
   {
    "t": "CFOPs, NCMs e linhas de NCM por Estado das operações do cliente cadastrados conforme a planilha assinada pelo contador.",
    "s": "d"
   },
   {
    "t": "Onboarding Fiscal sem pendência obrigatória em cada empresa.",
    "s": "d"
   },
   {
    "t": "Cada operação típica calculada no pedido e na nota sem aviso no item e com valores conferidos; uma NF-e de cada transmitida em homologação.",
    "s": "d"
   },
   {
    "t": "O cliente reconheceu o quadro \"Impostos não calculados no item\" e os avisos de MVA, CST e regime, e corrigiu com \"Recalcular\".",
    "s": "d"
   },
   {
    "t": "Obrigações acessórias combinadas por escrito e lacunas comunicadas ao contador.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só ambiente de teste (homologação) e registros com \"TESTE FLUXO CONSULTOR\". **Nota fiscal só é transmitida com o responsável fiscal do cliente.** O consultor não decide tributação: tudo vem do contador.",
   "O documento salva com imposto zerado e aviso no item quando falta cadastro: o teste não passa só porque salvou.",
   "\"CBS (%)\" e \"IBS (%)\" preenchidos com 8,80 e 17,70 em 2026 fazem o imposto sair dezenas de vezes maior.",
   "A lista padrão de CFOP não traz CST de ICMS, PIS e COFINS: empresa do Presumido ou do Real fica com aviso \"Sem CST\" até preencher.",
   "O Onboarding ainda diz que as pendências \"bloqueiam a liberação para operar\"; hoje ele só informa, e \"liberado\" não garante cálculo certo.",
   "Hoje o sistema ainda não leva para a nota o texto fiscal ligado ao NCM, ao estado ou ao perfil SUFRAMA, e usa 12% de alíquota interestadual em todas as UFs: conferir com o contador.",
   "Não usar CFOP 59xx/69xx (exceto 5949/6949) em NF-e de mercadoria sem testar: hoje ainda dispara ISS."
  ],
  "naoValidado": [
   "Item sem CST: o checklist D da gestora diz que a transmissão é barrada; o documento B da gestora (D-31344.4) diz que a transmissão pede confirmação (\"Transmitir mesmo assim?\"); o Faturamento C lista \"Item N: ICMS CST/CSOSN obrigatório\" no pré-voo. Conferir na tela qual comportamento vale.",
   "Aviso \"NCM-Estado não configurado para o produto\": visto na tela pela trilha dos estagiários (pode bloquear a nota), mas não está nas mensagens da gestora, que diz que sem NCM × Estado o DIFAL usa a alíquota do NCM. Conferir na tela se bloqueia.",
   "Nenhuma tela do módulo Fiscal (CFOP, NCM, Textos Fiscais, Onboarding, Diagnóstico, SPED) foi aberta nos fluxos antigos: os rótulos de campos vêm do código lido pela gestora. Conferir na tela antes de ensinar."
  ]
 },
 {
  "id": "implantacao-financeiro",
  "arquivo": "implantacao-07-financeiro.html",
  "etiqueta": "Consultor · Implantação · Financeiro",
  "titulo": "Implantação do Financeiro: roteiro prático com o cliente",
  "subtitulo": "Das contas e do plano de contas até o caixa: títulos nascendo do pedido ou da nota, recebimento total e parcial, boleto e PIX em homologação quando contratados, contas a pagar vindas da compra, extrato e conciliação, saldos, fluxo de caixa e estorno.",
  "objetivo": "Ao final, o financeiro do cliente terá visto um título nascer do pedido e outro da nota, recebido um deles em duas partes, pago um título da compra e conferido o mesmo dinheiro em Saldos, Extrato, Fluxo de Caixa e DRE. Ele saberá estornar uma baixa e saberá o que o sistema recusa.",
  "rodape": "Checklist de implantação · Financeiro · fontes: Financeiro A, B, C e D da metodologia, README da cadeia comercial, fluxo antigo \"Fluxo financeiro\", procedimento gerar títulos e receber · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Módulo `financeiro` contratado; versão **PRO** se o cliente quer PIX, pagamentos eletrônicos, DDA ou Open Finance.",
    "r": "**Confira:** menus sem cadeado em `Financeiro`. Sem o módulo, nenhuma nota gera título. **Fonte:** FIN C, comerciais; FAT-TIT-007.",
    "s": "d"
   },
   {
    "t": "Plano de contas analítico, contas bancárias, portadores, condições e meios de pagamento feitos na Fundação; saldo inicial das contas **ainda não preenchido**.",
    "r": "**Confira:** `Financeiro > Configurações`. O saldo inicial entra só na carga, depois dos testes. **Fonte:** FIN C, pré-requisitos e etapa 2; README da cadeia, decisão X7.",
    "s": "d"
   },
   {
    "t": "Participante de teste com **Conta de Fluxo de Caixa Receita/Despesa** preenchida.",
    "r": "**Confira:** no cadastro do participante. Ela decide em que linha do fluxo de caixa o valor cai. **Fonte:** fluxo antigo \"Fluxo financeiro\", pré-requisitos.",
    "s": "v"
   },
   {
    "t": "Pedido de venda de teste \"TESTE FLUXO CONSULTOR\" sem títulos e a nota autorizada do roteiro de Faturamento (de um pedido sem títulos); nota de recebimento finalizada do roteiro de Recebimento.",
    "r": "**Confira:** coluna TÍTULOS \"Sem títulos\" no pedido e o número da nota e da NR. **Fonte:** README da cadeia, teste ponta a ponta; FIN D, E2E-1 e E2E-8.",
    "s": "d",
    "campo": "Nº do pedido / nota / NR"
   },
   {
    "t": "Decisões tomadas: quem gera o contas a receber (pedido ou nota) e como se dá baixa em cada conta (à mão, pelo boleto ou pela conciliação).",
    "r": "**Confira:** ata do kickoff. Escolher um caminho por conta evita baixar duas vezes. **Fonte:** README da cadeia, decisão X2; FIN C, Q5 e Q9.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Contas, meios de pagamento e plano de contas",
    "onde": "`Financeiro > Configurações` (Contas Bancárias, Meios de Pagamento, Planos de Conta) e `Financeiro > Saldos`",
    "intro": "Antes de qualquer título, o cliente vê onde o dinheiro vai cair: a conta bancária, o tipo do meio de pagamento e a conta analítica do plano. Vem primeiro porque é o que trava a geração dos títulos.",
    "passos": [
     {
      "t": "**Faça:** em `Financeiro > Configurações > Contas Bancárias`, mostre a conta de teste e o campo \"Saldo Inicial\" vazio.",
      "r": "**Explique ao cliente:** uma conta por carteira/convênio de cobrança; para boleto, a conta precisa ser **emissora** (conta padrão não basta). O fluxo de caixa parte do saldo inicial da conta, por isso ele só entra na carga, conferido com o banco. **Confira:** conta ativa. **Fonte:** FIN C, etapa 2; FIN-CTA-001; FIN-IND-002; fluxo antigo \"Fluxo financeiro\", pré-requisitos.",
      "s": "d"
     },
     {
      "t": "**Faça:** em `Configurações > Meios de Pagamento`, abra o meio usado na parcela do pedido e mostre o **Tipo**.",
      "r": "**Explique ao cliente:** os tipos são Cartão de Crédito/Débito, Dinheiro, PIX, Boleto, Transferência, Cheque e Outros. Meio de tipo Boleto exige conta emissora para gerar títulos. Mudar o tipo altera o que sai na nota: decisão do fiscal. **Confira:** o tipo de cada meio que o cliente usa. **Fonte:** fluxo antigo \"Fluxo financeiro\", pré-requisitos e bloco 1.",
      "s": "v",
      "campo": "Meio usado / tipo"
     },
     {
      "t": "**Faça:** tente lançar um título de teste numa conta sintética (com contas-filhas) do plano de contas (bloqueio de propósito).",
      "r": "**Explique ao cliente:** todo título precisa de conta analítica; é ela que alimenta o fluxo de caixa e a DRE. **Confira:** \"Movimentações financeiras só podem ser associadas a contas analíticas do fluxo de caixa. Selecione uma conta sem filhos.\". **Fonte:** FIN-CP-002; FIN B, quem trava quando falta.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Financeiro > Saldos` e anote o saldo de cada conta antes de começar.",
      "r": "**Explique ao cliente:** cada baixa do roteiro tem de mexer nesse número exatamente pelo valor baixado. **Confira:** saldo anotado. **Fonte:** fluxo antigo \"Fluxo financeiro\", pré-requisitos.",
      "s": "v",
      "campo": "Saldo antes"
     }
    ]
   },
   {
    "titulo": "2. Títulos nascendo do pedido",
    "onde": "`Vendas > Pedidos de Venda`, menu `⋯ > Gerar Títulos`",
    "intro": "Quando o cliente cobra antes de faturar (decisão X2), os títulos nascem do pedido. O cliente vê uma parcela virar um título e o pedido marcar \"Gerados\".",
    "passos": [
     {
      "t": "**Faça:** no pedido de teste, abra o menu `⋯` e veja quando **Gerar Títulos** está habilitado.",
      "r": "**Explique ao cliente:** a opção fica desabilitada em Faturado e Lib. Expedição (\"Pedido já faturado\") para não gerar título em dobro. **Confira:** a opção habilitada no pedido de teste. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Gerar Títulos** e confirme.",
      "r": "**Explique ao cliente:** sai um título por parcela da condição de pagamento. Se o meio da parcela for de tipo Boleto sem conta emissora, o sistema recusa com \"Parcela 1: meio de pagamento Boleto exige uma conta bancária…\". **Confira:** a confirmação ou a recusa; resolva o meio ou a conta e gere de novo. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 1; procedimento-gerar-titulos-e-receber, passo 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Financeiro > Contas a Receber`, limpe o filtro **Status** (vem em \"Em aberto\") e pesquise o **Documento** do pedido.",
      "r": "**Explique ao cliente:** o título guarda documento, parcela, vencimento, valor e situação. **Confira:** valor e vencimento iguais à parcela do pedido; a coluna TÍTULOS do pedido passa a \"Gerados\". **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 1; procedimento-gerar-titulos-e-receber, passo 2.",
      "s": "v",
      "campo": "Nº dos títulos"
     }
    ]
   },
   {
    "titulo": "3. Títulos nascendo da nota",
    "onde": "`Financeiro > Contas a Receber`",
    "intro": "No caminho mais comum, quem gera o título é a nota. O cliente vê a passagem do Faturamento para o Financeiro e entende por que não há título em dobro.",
    "passos": [
     {
      "t": "**Faça:** pesquise em `Financeiro > Contas a Receber` o número da nota autorizada no roteiro de Faturamento.",
      "r": "**Explique ao cliente:** a nota gera um título por parcela quando o CFOP gera financeiro e o pedido ainda não tinha gerado; se o pedido gerou, a nota não gera de novo. **Confira:** um título \"Em aberto\" por parcela, com o documento da nota. **Fonte:** FIN B, de onde nascem os títulos; FAT-TIT-001/002; FIN D, E2E-1.",
      "s": "d",
      "campo": "Nº dos títulos da nota"
     },
     {
      "t": "**Faça:** abra o título e confira o plano de contas e o meio de pagamento da parcela.",
      "r": "**Explique ao cliente:** o título herda da nota o plano de contas e o meio; é por eles que o valor aparece no fluxo de caixa e na DRE. **Confira:** plano e meio iguais aos da nota. **Fonte:** FIN D, E2E-1.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre `Financeiro > Devoluções` e explique o caminho de uma nota de devolução.",
      "r": "**Explique ao cliente:** a nota de devolução não gera título: vira pendência no Painel de Devoluções, onde o financeiro decide abater ou restituir. **Confira:** o painel abre (vazio no go-live). **Fonte:** FIN B, de onde nascem os títulos; FIN-DEV-001; FIN C, etapa 7.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Receber: total e parcial",
    "onde": "`Financeiro > Contas a Receber`, ação **Receber**",
    "intro": "O recebimento é o momento em que o dinheiro entra. O cliente vê a baixa parcial criar o residual e o saldo da conta subir na hora.",
    "passos": [
     {
      "t": "**Faça:** num título do pedido, clique em **Receber**: escolha a **Conta Bancária**, a data, desconto/acréscimo/juros/multa, o meio e o **Valor Recebido**; use **Pré-visualizar**.",
      "r": "**Explique ao cliente:** o valor recebido é o dinheiro que entrou. A conta bancária é obrigatória e não tem padrão. **Confira:** o diálogo \"Receber Contas a Receber\" com a prévia. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 2; procedimento-gerar-titulos-e-receber, passo 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente receber com a data de amanhã (bloqueio de propósito).",
      "r": "**Explique ao cliente:** não dá para agendar baixa: ela registra o dinheiro que já entrou. **Confira:** \"Data de recebimento não pode ser posterior a hoje\". **Fonte:** FIN-BXA-001; FIN C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** receba com um valor menor que o do título e confirme.",
      "r": "**Explique ao cliente:** baixa parcial: o original fica Recebido pelo valor baixado e nasce um título residual com o saldo, no mesmo vencimento. Não é duplicidade. **Confira:** \"Baixa parcial realizada; título residual criado\" e o título `/002`. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 2; FIN-BXA-003.",
      "s": "v",
      "campo": "Nº do título residual"
     },
     {
      "t": "**Faça:** receba o título residual por inteiro.",
      "r": "**Explique ao cliente:** a soma das duas baixas é o valor original. **Confira:** \"Título recebido com sucesso\". **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 2; procedimento-gerar-titulos-e-receber, passo 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** volte a `Financeiro > Saldos` e abra o **Extrato** da conta.",
      "r": "**Explique ao cliente:** a baixa mexe no saldo na hora, exatamente pelo valor baixado, e o Extrato mostra o crédito do dia. **Confira:** saldo depois = saldo antes + valores recebidos. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 2; procedimento-gerar-titulos-e-receber, passo 6.",
      "s": "v",
      "campo": "Saldo depois"
     }
    ]
   },
   {
    "titulo": "5. Boleto e PIX em homologação (quando contratados)",
    "onde": "`Financeiro > Configurações > Boleto` e `Financeiro > PIX`",
    "intro": "Só se o cliente contratou cobrança registrada ou PIX. Tudo em homologação, banco por banco, antes de virar para produção.",
    "passos": [
     {
      "t": "**Faça:** em `Financeiro > Configurações > Boleto`, percorra a aba \"Assistente de Configuração\" (Empresa, Ambiente em **Homologação**, Credenciais, Conta Bancária, Conclusão) e, em Contas Bancárias, marque a conta favorita para boleto.",
      "r": "**Explique ao cliente:** o Flow é o integrador; o contrato é do cliente com o provedor. Hoje o sistema ainda não sincroniza conta com dígito do beneficiário preenchido: informe o código no formato do banco e deixe o dígito em branco. **Confira:** conta sincronizada; sem isso: \"Conta bancária não está integrada ao PlugBoleto ou ainda não foi sincronizada.\". **Fonte:** FIN C, etapa 3; FIN-BOL-001; FIN-CTA-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** num título de teste com boleto e conta, gere o boleto e aguarde o registro.",
      "r": "**Explique ao cliente:** título com boleto só deixa editar Observação e Conta de fluxo; mudar valor ou vencimento é pela ação do boleto. **Confira:** linha digitável, situação REGISTRADO e e-mail ao contato marcado para boletos. **Fonte:** FIN D, E2E-2; FIN-CR-005/006.",
      "s": "d",
      "campo": "Situação do boleto"
     },
     {
      "t": "**Faça:** liquide o boleto no ambiente de homologação do banco e aguarde o retorno.",
      "r": "**Explique ao cliente:** o retorno do banco dá a baixa sozinho (aviso do banco ou rotina a cada 30 minutos); não baixe à mão o mesmo título. **Confira:** título \"Recebido\" com a data e o valor do banco. **Fonte:** FIN D, E2E-3; FIN B, jobs automáticos.",
      "s": "d"
     },
     {
      "t": "**Faça:** se o cliente tem PRO, em Contas Bancárias use \"Serviços financeiros da conta\" > \"Habilitar PIX\", envie o certificado da conta PIX, gere uma cobrança e pague no sandbox.",
      "r": "**Explique ao cliente:** sem o certificado a conta não cobra; PIX com vencimento não vale no Banco do Brasil. Hoje o sistema ainda não leva o cancelamento do PIX ao provedor. **Confira:** parcela \"Recebido\" após a sincronização (a cada 5 minutos). **Fonte:** FIN C, etapa 4; FIN-PIX-001; FIN D, E2E-5.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Contas a pagar vindas da compra",
    "onde": "`Financeiro > Contas a Pagar`",
    "intro": "O lado da compra: a nota de recebimento finalizada gera os títulos a pagar. O cliente paga um deles e vê o saldo descer.",
    "passos": [
     {
      "t": "**Faça:** pesquise em `Financeiro > Contas a Pagar` o título da nota de recebimento finalizada no roteiro de Recebimento.",
      "r": "**Explique ao cliente:** a NR finalizada gera os títulos a pagar junto com a entrada no estoque (tudo ou nada); cancelar a NR exclui os títulos em aberto. **Confira:** título \"Em aberto\" com origem na NR. **Fonte:** FIN B, de onde nascem os títulos; REC-FIN-006/007; FIN D, E2E-8.",
      "s": "d",
      "campo": "Nº do título a pagar"
     },
     {
      "t": "**Faça:** clique em **Pagar** e preencha Conta Bancária, Data Pagamento, valores, Meio de Pagamento e Valor Pago.",
      "r": "**Explique ao cliente:** o meio informado na parcela da nota não vem preenchido. **Confira:** os campos obrigatórios marcados. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Confirmar Pagamento** e confira a lista, os Saldos e o Extrato da conta.",
      "r": "**Explique ao cliente:** pagar diminui o saldo na hora e cria o débito no Extrato. **Confira:** título fora de \"Em aberto\", saldo menor e débito no Extrato. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** mostre a aba **Pagamentos** dentro de Contas a Pagar.",
      "r": "**Explique ao cliente:** Pagamentos é uma aba de Contas a Pagar, não um menu separado; o pagamento eletrônico pelo banco é PRO. **Confira:** a aba aberta. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 3; FIN C, etapa 4.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "7. Extrato e conciliação",
    "onde": "`Financeiro > Extrato`",
    "intro": "Conciliar é baixar pela data e pela conta do extrato do banco. O cliente vê a Mesa de Conciliação e escolhe, por conta, se baixa à mão ou pela conciliação.",
    "passos": [
     {
      "t": "**Faça:** abra `Financeiro > Extrato` da conta de teste e localize os movimentos das baixas feitas no roteiro.",
      "r": "**Explique ao cliente:** não há item \"Conciliação\" no menu: a conciliação começa no Extrato. **Confira:** o crédito do recebimento e o débito do pagamento. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 3; FIN C, etapa 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** em *Exportar/Importar*, use \"Importar extrato (OFX/CSV)\" com o arquivo do banco; depois importe o mesmo arquivo de novo.",
      "r": "**Explique ao cliente:** a importação abre a **Mesa de Conciliação**; o mesmo extrato não entra duas vezes. Extrato pela API (Open Finance) é PRO. **Confira:** movimentos pendentes na Mesa; na segunda importação, 0 importados. **Fonte:** FIN C, etapa 5; FIN D, E2E-6.",
      "s": "d"
     },
     {
      "t": "**Faça:** na Mesa, concilie um crédito com um título em aberto (use \"Confirmar sugestões fortes\" só para os exatos).",
      "r": "**Explique ao cliente:** conciliar baixa o título na data e na conta do extrato; diferença de valor exige decisão (parcial, desconto, acréscimo); sugestão errada se descarta. **Confira:** movimento conciliado e título recebido na data do extrato. **Fonte:** FIN-EXT-002/004; FIN D, E2E-6.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente vincular um título já baixado à mão por valor diferente do extrato (bloqueio de propósito).",
      "r": "**Explique ao cliente:** por isso se escolhe um caminho de baixa por conta. **Confira:** \"O título … foi baixado por R$ X e o extrato traz R$ Y — estorne a baixa…\". **Fonte:** FIN-EXT-007; FIN C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** desfaça a conciliação do passo anterior.",
      "r": "**Explique ao cliente:** desfazer estorna só o que a conciliação baixou. **Confira:** título de volta a \"Em aberto\" e movimento \"pendente\". **Fonte:** FIN-EXT-003; FIN D, E2E-7.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "8. Saldos, fluxo de caixa e DRE",
    "onde": "`Financeiro > Saldos`, `Financeiro > Fluxo de Caixa`, `Financeiro > DRE`",
    "intro": "O fechamento do roteiro: o mesmo dinheiro tem de aparecer igual nos saldos, no fluxo de caixa, na DRE e nos painéis.",
    "passos": [
     {
      "t": "**Faça:** abra o **Fluxo de Caixa** do mês (Ambos, Hierarquias) e ache as linhas dos lançamentos de teste.",
      "r": "**Explique ao cliente:** a linha vem da conta de fluxo de caixa do título: receitas em \"Vendas\", pagamentos na conta de despesa do fornecedor. **Confira:** os valores do roteiro nas linhas certas. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 4.",
      "s": "v"
     },
     {
      "t": "**Faça:** compare o **Saldo Inicial** e o **Saldo Final** do Fluxo de Caixa com `Financeiro > Saldos`.",
      "r": "**Explique ao cliente:** o fluxo de caixa parte do saldo cadastrado da conta mais os movimentos até a véspera; por isso o saldo inicial da carga precisa estar certo. **Confira:** os números batem (anote se não baterem). **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 4; FIN-IND-002.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra a **DRE** e o **Painel Financeiro de Projetos** da obra do pedido.",
      "r": "**Explique ao cliente:** a DRE pode ser por competência (lançamento) ou por caixa (baixa), agrupada pelo plano de contas; sem projeto no pedido, o painel da obra fica incoerente. **Confira:** a receita de teste na DRE e na obra. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 4; FIN-IND-003.",
      "s": "v"
     },
     {
      "t": "**Faça:** confira \"Recebido no mês\", \"A receber\" e \"A pagar\" no **Resumo do negócio** da tela Início.",
      "r": "**Explique ao cliente:** é o resumo do dia a dia do gestor; confira o card contra o Extrato. **Confira:** o valor recebido no roteiro em \"Recebido no mês\" (anote a diferença na baixa parcial). **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 4.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "9. Estorno e exclusão",
    "onde": "`Financeiro > Contas a Receber`, ações **Estornar** e excluir",
    "intro": "Corrigir é parte da operação. O cliente aprende a diferença entre estornar uma baixa errada e excluir um título, e vê o que o sistema protege.",
    "passos": [
     {
      "t": "**Faça:** estorne a baixa parcial de um título recebido no bloco 4.",
      "r": "**Explique ao cliente:** o estorno volta o título a \"Em aberto\" e limpa os dados do recebimento; estornar a baixa parcial devolve o valor original e o `/002` deixa de existir. **Confira:** título \"Em aberto\" e o saldo da conta reduzido pelo mesmo valor. **Fonte:** fluxo antigo \"Fluxo financeiro\", bloco 2; FIN-EST-001.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente estornar o título pago por boleto registrado ou liquidado (bloqueio de propósito, se houve boleto no bloco 5).",
      "r": "**Explique ao cliente:** boleto no banco protege o título; primeiro se cancela o boleto registrado. **Confira:** \"boleto registrado ou liquidado no PlugBoleto não permite estorno\". **Fonte:** FIN-EST-002; FIN C, erros comuns.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente estornar um título conciliado no bloco 7 (bloqueio de propósito).",
      "r": "**Explique ao cliente:** baixa feita pela conciliação se desfaz pela conciliação. **Confira:** o sistema recusa; desfazendo a conciliação, o estorno volta a ser possível. **Fonte:** plano de validação do Financeiro, Extrato e Conciliação, item 5.",
      "s": "d"
     },
     {
      "t": "**Faça:** exclua um título de teste ainda não baixado, criado só para o roteiro.",
      "r": "**Explique ao cliente:** não existe \"cancelar título\": cancelar é excluir, e só título não baixado pode ser excluído; excluir uma parcela não altera as outras. **Confira:** o título sai da lista. **Fonte:** FIN-CR-007; FIN-EXC-001/002.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Títulos gerados pelo pedido com valor e vencimento iguais às parcelas.",
    "s": "v"
   },
   {
    "t": "Títulos nascidos da nota autorizada, sem duplicar os do pedido.",
    "s": "d"
   },
   {
    "t": "Baixa parcial, baixa total e estorno refletidos em Contas a Receber, Saldos e Extrato.",
    "s": "v"
   },
   {
    "t": "Título a pagar da compra pago e refletido no saldo e no Extrato.",
    "s": "v"
   },
   {
    "t": "Extrato importado, um movimento conciliado e a conciliação desfeita.",
    "s": "d"
   },
   {
    "t": "Fluxo de Caixa, DRE e Saldos conferidos entre si; diferenças anotadas.",
    "s": "v"
   },
   {
    "t": "Boleto e PIX emitidos e baixados em homologação, quando contratados.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só ambiente de teste e conta de teste, com registros \"TESTE FLUXO CONSULTOR\". Baixar, pagar, estornar e gerar boleto ou PIX movimentam dinheiro de verdade. Nota fiscal só é transmitida com o responsável fiscal.",
   "Meio de pagamento de tipo Boleto sem conta emissora trava \"Gerar Títulos\"; a mensagem diz \"Boleto\" mesmo quando o meio se chama \"Duplicata Mercantil\".",
   "Título manual e título gerado do mesmo pedido duplicam DRE, painel e \"Recebido no mês\": use um só caminho.",
   "Baixa parcial cria o residual `/002`: não é duplicidade.",
   "Hoje o card \"Recebido no mês\" ainda soma o valor original do título numa baixa parcial: confira o card contra o Extrato.",
   "O \"Saldo Inicial\" da conta não tem data: com migração de histórico, ele é o saldo antes do primeiro movimento migrado, não o de hoje.",
   "Em janelas estreitas, o diálogo de **Estornar** pode abrir fora da área visível."
  ],
  "naoValidado": [
   "Quando \"Gerar Títulos\" fica habilitado: no fluxo antigo (conferido em 20/10/2026) a opção fica desabilitada em Faturado e Lib. Expedição e volta depois de Entregue. A gestora diz que o pedido gera títulos quando está Em aberto, sem nota ainda (FIN B; VEN-TIT). Conferir na tela antes de ensinar se um pedido Entregue e já faturado pode gerar títulos.",
   "Saldo inicial do Fluxo de Caixa: a gestora diz saldo cadastrado da conta + movimentos até a véspera (FIN-IND-002). No fluxo antigo, o saldo inicial absorveu o movimento do mês (inicial negativo, final zero). Conferir na tela.",
   "Excluir título: o fluxo antigo diz que excluir (lixeira) é permanente; a gestora diz que é exclusão lógica (FIN-EXC-001). Conferir na tela.",
   "Títulos nascendo da nota, boleto, PIX, importação de extrato e Mesa de Conciliação ainda não foram executados na tela; os nomes de botão vêm do código lido pela gestora."
  ],
  "video": {
   "id": "consultor-08-financeiro",
   "titulo": "Títulos, baixa, saldos e fluxo de caixa",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-compras",
  "arquivo": "implantacao-08-compras.html",
  "etiqueta": "Consultor · Implantação · Compras",
  "titulo": "Implantação de Compras: roteiro prático com o cliente",
  "subtitulo": "Junto com o comprador, execute a compra real do cliente: solicitação manual (e sugestão, se usada), cotação com dois fornecedores, pedido de compra, aprovação por alçada (se usada), acompanhamento da entrega e o reflexo no Recebimento e no Financeiro.",
  "objetivo": "Ao final, o cliente viu uma necessidade de material virar pedido de compra aprovado, nota de recebimento e título a pagar, e sabe repetir cada passo sozinho. Ele também viu o sistema recusar o que não pode: preço zero, item sem vencedor, autor aprovando o próprio pedido e cancelamento com nota ativa.",
  "rodape": "Checklist de implantação · Compras · fontes: gestora COM (A, B, C, D) e README de Suprimentos; fluxo antigo de suprimentos (19/10/2026); trilha de estagiários 05; procedimento da solicitação à nota de recebimento; regras de compras do Harness · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação concluída e assinada; módulo Compras ativo (Compras PRO só se usar Contratos de Entrega).",
    "r": "**Confira:** checklist da Fundação assinado e `Minha Assinatura`. **Fonte:** COM D, seção 1; COM-GER-004.",
    "s": "d"
   },
   {
    "t": "Fornecedor de teste com **É Fornecedor?** e **Conta a Pagar** ligados, **Conta de Fluxo de Caixa Despesa** preenchida e contato com **E-mail Compras** (use um e-mail interno da equipe).",
    "r": "**Confira:** o cadastro do participante. **Fonte:** fluxo antigo de suprimentos (pré-requisito); COM-RFQ-004, COM-COT-019.",
    "s": "v"
   },
   {
    "t": "Insumo de teste com NCM, unidade, categoria com \"Preço calculado por\", embalagem e fator; perfil e esquadria com as características da categoria (cor, medidas).",
    "r": "**Confira:** abra o produto. Sem NCM a solicitação não entra na cotação. **Fonte:** COM-COT-003, COM-SC-001, COM-SC-003.",
    "s": "d"
   },
   {
    "t": "CFOPs de entrada (1xxx/2xxx, e 3xxx se importa) das naturezas usadas, com \"gera financeiro\" decidido com o contador; condições de pagamento com parcelas; meios de pagamento.",
    "r": "**Confira:** a lista de CFOPs assinada pelo contador. **Fonte:** README de Suprimentos, decisão S1; COM-COT-010, COM-PC-002.",
    "s": "d"
   },
   {
    "t": "Decisões registradas em ata: títulos a pagar **pelo pedido ou pela nota** (nunca pelos dois) e se haverá **aprovação por alçada**. A alçada vem desligada.",
    "r": "**Confira:** a ata. **Fonte:** README de Suprimentos, decisões S2 e S3; fluxo antigo de suprimentos (pré-requisito).",
    "s": "d"
   },
   {
    "t": "`Compras > Configurações > Parâmetros de Compras` revisados: \"Regras de Melhor Opção\" e \"Critérios de preço na Cotação\". Deixe \"Usar aprovação por alçada\" desligado até o bloco 5.",
    "r": "**Confira:** a tela de parâmetros. **Fonte:** COM C, etapa 2; COM-PAR-001, COM-COT-008.",
    "s": "d"
   },
   {
    "t": "Dois usuários de teste: o comprador e um aprovador (quem cria o pedido não aprova).",
    "r": "**Confira:** `Segurança > Perfis de Acesso`. **Fonte:** COM-ALC-007 (D-661); COM C, etapa 10.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Solicitação de compra manual",
    "onde": "`Compras > Solicitações de Compra > Nova Solicitação`",
    "intro": "A compra começa pela necessidade. Mostre ao cliente que a solicitação registra o que falta, sem fornecedor e sem preço, e que ela não tem etapa de aprovação.",
    "passos": [
     {
      "t": "**Faça:** cadastre uma solicitação com **Empresa**, data de necessidade, o insumo de teste (cor em \"Dados do Item\" > Aplicar) e a quantidade. Deixe o projeto em branco. Salve.",
      "r": "**Explique ao cliente:** projeto em branco faz a entrada cair no almoxarifado central; produto de chapa ou perfil pede a **Cor**. **Confira:** a SC fica \"Em Aberto\" e o painel mostra a última compra do item. **Fonte:** fluxo antigo de suprimentos, bloco 1; procedimento da solicitação à nota de recebimento.",
      "s": "v",
      "campo": "Nº da solicitação (SC-)"
     },
     {
      "t": "**Faça:** tente gravar uma solicitação de perfil sem o comprimento.",
      "r": "**Explique ao cliente:** o documento não grava sem as características que a categoria exige. **Confira:** o sistema recusa e lista a pendência. **Fonte:** COM-SC-001; COM D, 3.1.",
      "s": "d"
     },
     {
      "t": "**Faça:** se o cliente compra em embalagem, crie uma solicitação de um item vendido em caixa de 50 com necessidade de 40.",
      "r": "**Explique ao cliente:** a solicitação arredonda para a embalagem do fornecedor. **Confira:** a quantidade fica 50. **Fonte:** COM-SC-003; COM D, 3.1.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o menu `⋯` da primeira solicitação.",
      "r": "**Explique ao cliente:** daqui a compra segue por cotação ou direto para o pedido; a cotação é opcional. **Confira:** as opções Gerar Cotação, Gerar Pedido de Compra e Excluir. **Fonte:** fluxo antigo de suprimentos, bloco 1; trilha de estagiários 05, bloco 3.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "2. Sugestão de compra (se o cliente usa estoque mínimo)",
    "onde": "`Compras > Sugestão de Compra`",
    "intro": "Para quem repõe insumos por estoque mínimo, a sugestão cria as solicitações sozinha. Pule o bloco se o cliente não usa estoque mínimo.",
    "passos": [
     {
      "t": "**Faça:** defina um estoque mínimo para o insumo de teste e abra `Compras > Sugestão de Compra`.",
      "r": "**Explique ao cliente:** a sugestão calcula a falta líquida = mínimo − disponível e considera o que já vai chegar. **Confira:** o item aparece; sem mínimo cadastrado, não aparece. **Fonte:** fluxo antigo de estoque, bloco 6; COM-SUG-001.",
      "s": "v"
     },
     {
      "t": "**Faça:** escolha a empresa e gere as solicitações sugeridas.",
      "r": "**Explique ao cliente:** a sugestão apura pelo produto, não pela variação (cor e medidas). **Confira:** as novas SCs em `Solicitações de Compra`, \"Em Aberto\". **Fonte:** COM C, etapa 4; D-179.",
      "s": "d",
      "campo": "Nº das SCs sugeridas"
     },
     {
      "t": "**Faça:** gere a sugestão de novo em menos de 5 minutos.",
      "r": "**Explique ao cliente:** o sistema evita solicitações duplicadas. **Confira:** nenhuma SC nova. **Fonte:** COM-SUG-004; COM D, 3.3.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Cotação com fornecedores",
    "onde": "`⋯ > Gerar Cotação` da SC ou `Compras > Cotações de Compra`",
    "intro": "A cotação compara fornecedores e define o vencedor de cada item. É um assistente de quatro passos: Dados Gerais, Itens a Cotar, Cotação e Comparação.",
    "passos": [
     {
      "t": "**Faça:** gere a cotação da SC com **Empresa**, validade e **Natureza da Operação** (Consumo, Produção, Revenda ou Ativo Imobilizado).",
      "r": "**Explique ao cliente:** a natureza define o CFOP do pedido conforme a origem do fornecedor (ex.: Produção → 2101); escolha certa aqui evita CFOP errado no pedido. **Confira:** abre o assistente de 4 passos e a SC passa a \"Em cotação\". **Fonte:** fluxo antigo de suprimentos, bloco 2; regra \"natureza da operação define o CFOP\"; COM-COT-010.",
      "s": "v",
      "campo": "Nº da cotação (COT-)"
     },
     {
      "t": "**Faça:** tente gravar a validade com a data de ontem.",
      "r": "**Explique ao cliente:** cotação vencida não aceita vencedor; renove a validade quando precisar. **Confira:** \"Data de validade da cotação não pode estar no passado.\" **Fonte:** COM-COT-001, COM-COT-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** no passo 3, **Adicionar Fornecedores** (dois fornecedores de teste) e, na linha de cada um, Data de entrega e Condição de pagamento.",
      "r": "**Explique ao cliente:** sem condição de pagamento na proposta do vencedor, o pedido não é gerado. **Confira:** os dois fornecedores na cotação. **Fonte:** fluxo antigo de suprimentos, bloco 2; COM-COT-009.",
      "s": "v"
     },
     {
      "t": "**Faça:** use **Enviar por e-mail** para um fornecedor de teste (com e-mail interno da equipe).",
      "r": "**Explique ao cliente:** o fornecedor recebe PDF e planilha; o link para o fornecedor responder pela internet não existe mais. **Confira:** o envio registrado; sem serviço de e-mail aparece \"Serviço de e-mail indisponível neste ambiente.\" **Fonte:** COM-RFQ-004; COM C, etapa 5.",
      "s": "d"
     },
     {
      "t": "**Faça:** use **Importar resposta do fornecedor**: escolha o fornecedor, envie a planilha devolvida, confira a prévia e confirme.",
      "r": "**Explique ao cliente:** a resposta em planilha, PDF ou imagem vira proposta sem digitação. **Confira:** a proposta gravada para aquele fornecedor; planilha com duas colunas de preço é recusada. **Fonte:** COM-RFQ-005 a 009, COM-RFQ-006.",
      "s": "d"
     },
     {
      "t": "**Faça:** para o segundo fornecedor, use \"Preencher proposta completa\": preço unitário (e frete e impostos, se houver) > Salvar.",
      "r": "**Explique ao cliente:** é o caminho quando o fornecedor responde por telefone ou mensagem. **Confira:** o resumo do fornecedor com o total e o selo \"Recomendado\". **Fonte:** fluxo antigo de suprimentos, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** no passo 4 (Comparação), escolha o critério e clique em **Aplicar Melhor Opção**. Depois troque o vencedor de um item à mão e aplique de novo.",
      "r": "**Explique ao cliente:** o vencedor é por item; a escolha manual é preservada quando se aplica a melhor opção outra vez. **Confira:** vencedor definido em cada item. **Fonte:** fluxo antigo de suprimentos, bloco 2; COM-COT-007, COM-COT-008.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Gerar o pedido de compra",
    "onde": "`Gerar Pedido de Compra` na comparação e `Compras > Pedidos de Compra`",
    "intro": "O pedido é o compromisso com o fornecedor. Mostre os dois caminhos: pela cotação (um pedido por vencedor) e direto da solicitação, sem cotação.",
    "passos": [
     {
      "t": "**Faça:** deixe um item sem vencedor e clique em **Gerar Pedido de Compra**.",
      "r": "**Explique ao cliente:** todo item precisa de vencedor antes de gerar. **Confira:** \"Não é possível gerar o pedido: item(ns) N sem fornecedor vencedor definido.\" e nenhum PC criado. **Fonte:** D-166; COM C, seção 5.",
      "s": "d"
     },
     {
      "t": "**Faça:** com todos os vencedores marcados, clique em **Gerar Pedido de Compra**, confira a **Conta de Fluxo de Caixa** sugerida (vem do fornecedor) e confirme.",
      "r": "**Explique ao cliente:** nasce um pedido por fornecedor vencedor. **Confira:** \"Pedido(s) de compra gerado(s)\", PC \"Em Aberto\" e \"Sem títulos\". **Fonte:** fluxo antigo de suprimentos, bloco 3; COM-COT-009.",
      "s": "v",
      "campo": "Nº do pedido de compra (PC-)"
     },
     {
      "t": "**Faça:** abra o PC e leia CFOP, entrega prevista e parcelas.",
      "r": "**Explique ao cliente:** o CFOP veio da natureza da cotação; as parcelas vêm da condição de pagamento. **Confira:** CFOP de entrada coerente com a origem do fornecedor. **Fonte:** fluxo antigo de suprimentos, bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `⋯ > Linha do tempo` do PC.",
      "r": "**Explique ao cliente:** a linha do tempo mostra a cadeia inteira da compra. **Confira:** SC e cotação aparecem como **Concluída** automaticamente. **Fonte:** fluxo antigo de suprimentos, bloco 3; COM-PC-024.",
      "s": "v"
     },
     {
      "t": "**Faça:** numa segunda SC, use `⋯ > Gerar Pedido de Compra`. No **Novo Pedido de Compra**, informe **Fornecedor**, **Comprador**, **Condição de Pagamento**, **CFOP** e **Valor Unitário**; confira a **Conta de Fluxo de Caixa** e clique em **Salvar**.",
      "r": "**Explique ao cliente:** sem cotação, o pedido não grava direto: abre o formulário para o preço. O CFOP é obrigatório, mesmo sem asterisco. **Confira:** PC \"Em Aberto\" e \"Sem títulos\"; sem CFOP, o aviso \"CFOP é obrigatório\". **Fonte:** procedimento da solicitação à nota de recebimento; regra \"Gerar Pedido de Compra abre o novo pedido\"; trilha de estagiários 05.",
      "s": "v",
      "campo": "Nº do PC direto (PC-)"
     },
     {
      "t": "**Faça:** no mesmo formulário, tente salvar um item com valor unitário zero.",
      "r": "**Explique ao cliente:** pedido de compra não grava item a zero. **Confira:** \"Item 1: Valor Unitário deve ser maior que zero\". **Fonte:** COM-PC-001, COM-GER-003.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Aprovação por alçada (se o cliente usa)",
    "onde": "`Compras > Configurações > Faixas de Alçada` e `Compras > Aprovações`",
    "intro": "A alçada segura o pedido acima de um valor até alguém aprovar. Ligue a chave só depois das faixas cadastradas. Pule o bloco se o cliente não aprova compras.",
    "passos": [
     {
      "t": "**Faça:** em Faixas de Alçada, use **Nova faixa** para criar dois níveis (ex.: até 10 mil no nível 1 e acima no nível 2, com \"Valor até\" em branco na última), com dois aprovadores por faixa. Depois ligue \"Usar aprovação por alçada\" em Parâmetros de Compras.",
      "r": "**Explique ao cliente:** faixas do mesmo nível não se sobrepõem, e faixa com um só aprovador deixa sem aprovador o pedido criado por ele. **Confira:** a tela sem aviso de aprovador único. **Fonte:** COM C, etapa 3; COM-ALC-001, COM-ALC-003, COM-ALC-013.",
      "s": "d"
     },
     {
      "t": "**Faça:** gere um PC de valor acima da primeira faixa.",
      "r": "**Explique ao cliente:** a alçada é um selo paralelo ao status do pedido. **Confira:** \"Aguardando aprovação · nível 1\". **Fonte:** COM-ALC-005; COM D, 3.1.",
      "s": "d",
      "campo": "Nº do PC em aprovação"
     },
     {
      "t": "**Faça:** com o usuário que criou o pedido, tente aprová-lo em `Compras > Aprovações`.",
      "r": "**Explique ao cliente:** quem cria não aprova, nem Super Usuário. **Confira:** \"Você não pode decidir um documento que você mesmo criou.\" **Fonte:** COM-ALC-007 (D-661).",
      "s": "d"
     },
     {
      "t": "**Faça:** com o pedido pendente, tente **Gerar Título a Pagar** ou **Gerar Nota de Recebimento**.",
      "r": "**Explique ao cliente:** pedido pendente ou rejeitado não gera título nem entra em nota. **Confira:** \"Pedido X aguarda aprovação do nível N…\". **Fonte:** COM-ALC-006.",
      "s": "d"
     },
     {
      "t": "**Faça:** entre com o aprovador e aprove o pedido em `Compras > Aprovações` (nível 1 e, se houver, nível 2).",
      "r": "**Explique ao cliente:** desligar a chave libera todos os pendentes de uma vez. **Confira:** o PC passa a \"Aprovado\". **Fonte:** fluxo antigo de suprimentos, bloco 3; COM-ALC-005, COM-ALC-008.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Enviar o pedido e acompanhar a entrega",
    "onde": "`Compras > Pedidos de Compra`, `Compras > Follow-up de Entregas` e `Dashboard Compras`",
    "intro": "Com o pedido aprovado, o comprador envia ao fornecedor e acompanha o prazo até a mercadoria chegar.",
    "passos": [
     {
      "t": "**Faça:** use `⋯ > Baixar PDF` no PC aprovado e mostre como anexar ao e-mail do fornecedor.",
      "r": "**Explique ao cliente:** o PDF sai no modelo de documento do cliente. **Confira:** o PDF com itens, condição e entrega. **Fonte:** COM C, etapa 6; COM D, 3.1.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Compras > Follow-up de Entregas` e localize o PC.",
      "r": "**Explique ao cliente:** o follow-up nasce sozinho com o pedido e é recalculado todo dia de manhã (Aguardando, Próx. Vencimento, Atrasado). **Confira:** o PC na lista com a entrega prevista. **Fonte:** COM C, etapa 9; COM B, seção 4; COM-FUP-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o `Dashboard Compras` e leia os cartões.",
      "r": "**Explique ao cliente:** é a visão do gestor de compras. **Confira:** solicitações em aberto, cotações ativas, pedidos em aberto e total do mês com o teste. **Fonte:** trilha de estagiários 05, bloco 2.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "7. Reflexo no Recebimento e no Financeiro",
    "onde": "`Compras > Pedidos de Compra > ⋯` e `Financeiro > Contas a Pagar`",
    "intro": "O pedido termina no Recebimento. Mostre onde nasce o título a pagar conforme a decisão da ata (pelo pedido ou pela nota) e o que trava o cancelamento.",
    "passos": [
     {
      "t": "**Faça:** se a ata decidiu títulos pelo pedido, use `⋯ > Gerar Título a Pagar` num PC aprovado e abra `Financeiro > Contas a Pagar`. Depois tente gerar de novo.",
      "r": "**Explique ao cliente:** com títulos gerados, itens e parcelas do pedido travam, e a nota desse pedido não gera título. **Confira:** um título por parcela, origem PC; a segunda vez mostra \"Títulos a pagar já foram gerados para este pedido\". **Fonte:** COM-PC-005, COM-PC-010; README de Suprimentos, S2.",
      "s": "d",
      "campo": "Nº dos títulos do PC"
     },
     {
      "t": "**Faça:** no outro PC, use `⋯ > Gerar Nota de Recebimento`, confira o que veio do pedido (empresa, fornecedor, CFOP, itens, conta de fluxo, parcelas), informe Nº da NF, Série e Data de Emissão e salve.",
      "r": "**Explique ao cliente:** a mesma nota tem dois números: \"NF-<número do fornecedor>\" na lista e \"NR-<número interno>\" na conferência, no pedido e no título. **Confira:** a nota em `Recebimento > Notas de Recebimento`. **Fonte:** fluxo antigo de suprimentos, bloco 4; regra \"a mesma nota tem dois números\".",
      "s": "v",
      "campo": "Nº da NR / NF"
     },
     {
      "t": "**Faça:** num PC de 100 unidades, gere a nota com 60 e salve.",
      "r": "**Explique ao cliente:** entrega parcial cria o pedido filho com o saldo; o comprador acompanha o restante nele. **Confira:** o PC original com o recebido e o residual `PC-nnnn/2` em aberto com 40. **Fonte:** COM-PC-004, COM-PC-009; REC-NR-009.",
      "s": "d",
      "campo": "Nº do PC residual (/2)"
     },
     {
      "t": "**Faça:** tente **Cancelar** o PC que tem nota de recebimento ativa.",
      "r": "**Explique ao cliente:** a ordem do desfazer é nota → títulos → pedido. **Confira:** \"Pedido possui Nota de Recebimento ativa vinculada…\". **Fonte:** COM-PC-007.",
      "s": "d"
     },
     {
      "t": "**Faça:** depois que a nota for finalizada no roteiro de Recebimento, abra a lista de Pedidos de Compra e a `Linha do tempo` do PC.",
      "r": "**Explique ao cliente:** o pedido só vira \"Recebido\" pelo Recebimento; o Kanban recusa. **Confira:** PC \"Recebido\", títulos \"Gerados\" e a cadeia SC → COT → PC → NR → título. **Fonte:** fluxo antigo de suprimentos, bloco 6; COM-PC-004.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente **Gerar Título a Pagar** no PC já \"Recebido\".",
      "r": "**Explique ao cliente:** depois do recebimento, os títulos saem da nota, não do pedido. **Confira:** o sistema recusa. **Fonte:** COM-PC-010 (D-138); COM D, 3.2.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Uma SC manual virou cotação com dois fornecedores, vencedor por item e pedido de compra, e outra SC virou pedido direto.",
    "s": "v"
   },
   {
    "t": "Se a alçada é usada: o pedido acima da faixa esperou aprovação, o autor não aprovou e outro usuário aprovou.",
    "s": "d"
   },
   {
    "t": "O pedido gerou a nota de recebimento, e a entrega parcial criou o PC residual.",
    "s": "d"
   },
   {
    "t": "Um título só por parcela nasceu, pelo pedido ou pela nota, conforme a ata.",
    "s": "d"
   },
   {
    "t": "A Linha do tempo do PC mostra SC → COT → PC → NR → título.",
    "s": "v"
   },
   {
    "t": "O cliente viu o sistema recusar: perfil sem comprimento, item sem vencedor, preço zero e cancelamento com nota ativa.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste. Nomeie os registros com \"TESTE FLUXO CONSULTOR\" e use e-mails internos da equipe em **Enviar por e-mail**: o envio chega de verdade ao fornecedor.",
   "Gerar o pedido conclui a SC e a cotação automaticamente. Depois que o pedido é recebido, Cancelar e Excluir ficam desabilitados: planeje a limpeza.",
   "Títulos a pagar nascem **pelo pedido ou pela nota, nunca pelos dois**. Com títulos gerados, os itens e parcelas do pedido travam.",
   "Ligue \"Usar aprovação por alçada\" só depois das faixas e da carga de pedidos em aberto; senão os pedidos importados ficam pendentes. Cadastre dois aprovadores por faixa.",
   "Hoje o sistema ainda mostra o crédito de imposto de entrada com sinal negativo no pedido de compra (COM-PC-018). Avise o cliente que confere impostos no PC.",
   "Hoje o sistema ainda não envia o pedido de compra por e-mail a partir da tela do pedido: use **Baixar PDF**.",
   "A sugestão de compra só lista itens com **estoque mínimo** cadastrado e apura pelo produto, não pela cor ou medida.",
   "A nota fiscal de devolução que nasce do Recebimento só é transmitida com o responsável fiscal do cliente."
  ],
  "naoValidado": [
   "Status do pedido de compra: a trilha de estagiários (conferida na tela) viu \"Em Aberto\" na lista e \"Em Edição\" na tela de edição; a gestora lista só Em aberto, Recebido e Cancelado (COM-PC-004). Conferir na tela antes de ensinar.",
   "Momento do desdobro do PC parcial: a gestora diz que **salvar** a nota já desdobra (REC-NR-009); o checklist D de Compras descreve gerar a nota parcial **e finalizar**. Conferir em que momento o `PC-nnnn/2` aparece.",
   "Caminho dos parâmetros: o fluxo antigo cita `Compras > Configurações > Parâmetros`; a gestora, `Compras > Configurações > Parâmetros de Compras`. Conferir o rótulo do menu.",
   "Não conferidos na tela pelo fluxo antigo: aprovação por alçada ligada (rótulos dos botões da fila de aprovação estão pendentes na gestora), **Enviar por e-mail**, **Importar resposta do fornecedor**, Follow-up de Entregas e a sugestão gerando SCs."
  ],
  "video": {
   "id": "consultor-01-suprimentos",
   "titulo": "Da solicitação ao pagamento",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-recebimento",
  "arquivo": "implantacao-09-recebimento.html",
  "etiqueta": "Consultor · Implantação · Recebimento",
  "titulo": "Implantação de Recebimento: roteiro prático com o cliente",
  "subtitulo": "Junto com quem recebe as notas, execute a chegada real da mercadoria: XML pelo DF-e ou por arquivo, nota vinculada ao pedido de compra, conferência e divergências, finalização com estoque e título a pagar, entrega parcial e devolução ao fornecedor.",
  "objetivo": "Ao final, o cliente viu uma nota de fornecedor entrar, ser vinculada ao pedido, conferida e finalizada, e viu nascer a entrada no estoque e o título a pagar. Ele sabe tratar entrega parcial, cancelar uma nota e gerar a devolução, e sabe o que o sistema recusa.",
  "rodape": "Checklist de implantação · Recebimento · fontes: gestora REC (A, B, C, D) e README de Suprimentos; fluxo antigo de suprimentos, blocos 4 a 6 (19/10/2026); trilha de estagiários 06; regra \"a mesma nota tem dois números\" · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Roteiro de Compras concluído: pelo menos dois pedidos de compra aprovados (um deles de 100 unidades, para a entrega parcial).",
    "r": "**Confira:** `Compras > Pedidos de Compra`, status \"Em Aberto\" e sem alçada pendente. **Fonte:** REC-NR-007; trilha de estagiários 06.",
    "s": "d"
   },
   {
    "t": "**Almoxarifado central ativo** em `Estoque > Locais` na empresa que recebe (é onde a nota dá entrada).",
    "r": "**Confira:** a lista de locais. **Fonte:** fluxo antigo de suprimentos (pré-requisito); README de Suprimentos, S6.",
    "s": "v"
   },
   {
    "t": "CFOPs de entrada com \"Gera Financeiro\" e \"Movimenta Estoque\" decididos com o contador; plano de contas e conta de fluxo no fornecedor ou na empresa.",
    "r": "**Confira:** `Recebimento > Configurações > CFOP`. Sem plano de contas não nasce título. **Fonte:** REC C, etapa 1; REC-NR-016, REC-FIN-007.",
    "s": "d"
   },
   {
    "t": "Produtos comprados com unidade de estoque, **embalagem e fator**; unidades de medida com as siglas que os fornecedores usam no XML.",
    "r": "**Confira:** abra dois produtos e a tela de unidades. **Fonte:** REC-FIN-001, REC-XML-007.",
    "s": "d"
   },
   {
    "t": "Para buscar notas na SEFAZ: Recebimento **PRO** e **certificado A1** da empresa enviado ao Flow. Sem PRO, use só a importação de XML por arquivo.",
    "r": "**Confira:** `Minha Assinatura` e `Configurações > Certificados`. **Fonte:** README de Suprimentos, S4; REC-DFE-001, REC-DFE-009.",
    "s": "d"
   },
   {
    "t": "Decisões da ata: títulos pelo pedido ou pela nota; conferência física sim ou não, e se trava a finalização.",
    "r": "**Confira:** a ata. **Fonte:** README de Suprimentos, S2 e S5; REC C, perguntas R6 e R10.",
    "s": "d"
   },
   {
    "t": "Para devolução: Faturamento com série de NF-e configurada.",
    "r": "**Confira:** a série no Faturamento. **Fonte:** REC-DEV-001/002.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Preparar o recebimento: conferência e busca de notas",
    "onde": "`Recebimento > Configurações > Parâmetros de Recebimento` e `Recebimento > Distribuição DFe`",
    "intro": "Antes da primeira nota, ligue com o cliente só o que ele vai usar. Todos os parâmetros nascem desligados.",
    "passos": [
     {
      "t": "**Faça:** em Parâmetros de Recebimento, ligue \"Usar Conferência Física\" e, se o cliente quer travar, \"Exigir Conferência para Finalizar\". Salve.",
      "r": "**Explique ao cliente:** a conferência registra a contagem; sem PRO os parâmetros ficam inertes. **Confira:** as chaves gravadas. **Fonte:** REC C, etapa 5; REC-CON-001, REC-CON-007; fluxo antigo de suprimentos (pré-requisito).",
      "s": "d"
     },
     {
      "t": "**Faça:** tente ligar \"Usar Registro de Avarias\" com a conferência desligada (numa empresa de teste).",
      "r": "**Explique ao cliente:** avaria e inspeção dependem da conferência. **Confira:** \"Não é possível habilitar registro de avaria sem antes habilitar a conferência física…\". **Fonte:** REC-PAR-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** em Distribuição DFe, marque \"Configuração ativa\" e, se o cliente quiser, \"Buscar automaticamente a cada 30 minutos\". Clique em \"Salvar configuração\".",
      "r": "**Explique ao cliente:** sem certificado o salvar é recusado; certificado vencendo em 30 dias gera aviso. **Confira:** o cartão com \"Última busca automática\". **Fonte:** REC C, etapa 2; REC-DFE-001, REC-DFE-014.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Receber o XML: DF-e ou arquivo",
    "onde": "`Recebimento > Aguardando manifestação` e `Recebimento > Notas de Recebimento > Importar XML`",
    "intro": "A nota do fornecedor chega pelo DF-e (PRO) ou por arquivo XML. Mostre os dois caminhos e como a nota se liga ao pedido de compra.",
    "passos": [
     {
      "t": "**Faça:** na caixa de notas a manifestar, clique em **Atualizar**.",
      "r": "**Explique ao cliente:** a nota pode levar mais de 30 minutos para aparecer; nota em que a empresa é só transportadora não aparece. **Confira:** as notas emitidas contra a empresa. **Fonte:** REC C, etapa 3; REC-DFE-015.",
      "s": "d"
     },
     {
      "t": "**Faça:** com o responsável fiscal ao lado, numa nota de teste, use **Responder à SEFAZ** > **Confirmar que recebi**.",
      "r": "**Explique ao cliente:** a manifestação vai à SEFAZ e não se desfaz; defina quem pode manifestar. **Confira:** a nota manifestada. **Fonte:** REC C, etapa 3; REC-DFE-006.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **Receber**. Na conferência da importação, escolha o produto onde falta, marque \"Lembrar deste código para as próximas notas deste fornecedor\", vincule o pedido de compra e salve.",
      "r": "**Explique ao cliente:** o código lembrado faz a próxima nota do fornecedor casar sozinha; \"Continuar depois\" guarda o rascunho. **Confira:** NR em aberto com empresa, fornecedor, CFOP e o PC vinculado. **Fonte:** REC C, etapa 4; REC D, seção 3.",
      "s": "d",
      "campo": "Nº da NR do DF-e"
     },
     {
      "t": "**Faça:** em Notas de Recebimento, use **Importar XML** com o arquivo de um fornecedor novo.",
      "r": "**Explique ao cliente:** o fornecedor novo é criado pelo XML, sem duplicar pelo CNPJ. **Confira:** NR com empresa, fornecedor e CFOP. **Fonte:** REC-XML-004; REC D, seção 3.",
      "s": "d",
      "campo": "Nº da NR do XML"
     },
     {
      "t": "**Faça:** importe o mesmo XML outra vez.",
      "r": "**Explique ao cliente:** a chave de acesso impede nota em dobro. **Confira:** \"A nota fiscal <chave> já foi importada na NR-nnnnnn…\". **Fonte:** REC-XML-002.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Nota a partir do pedido de compra",
    "onde": "`Compras > Pedidos de Compra > ⋯ > Gerar Nota de Recebimento`",
    "intro": "Sem XML em mãos, a nota nasce do próprio pedido. É o caminho conferido na tela e o mais usado no treinamento.",
    "passos": [
     {
      "t": "**Faça:** no PC aprovado, use `⋯ > Gerar Nota de Recebimento`. Confira **Empresa**, **Fornecedor**, **CFOP**, **Pedido de Compra**, **Condição de Pagamento**, itens e **Conta de Fluxo de Caixa**; informe Nº da NF, Série e Data de Emissão.",
      "r": "**Explique ao cliente:** sem XML, a chave fica em branco; a devolução depois vai exigir a chave. **Confira:** a página **Nova Nota de Recebimento** preenchida pelo pedido. **Fonte:** fluxo antigo de suprimentos, bloco 4; trilha de estagiários 06, bloco 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Salvar**.",
      "r": "**Explique ao cliente:** a mesma nota tem dois números: \"NF-<número do fornecedor>\" na lista e \"NR-<número interno>\" na conferência, no pedido e no título. **Confira:** a nota nas duas telas. **Fonte:** fluxo antigo de suprimentos, bloco 4; regra \"a mesma nota tem dois números\".",
      "s": "v",
      "campo": "Nº da NR / NF"
     },
     {
      "t": "**Faça:** em `Recebimento > Notas de Recebimento`, leia os cartões, troque o filtro **Status** e abra o menu `⋮` da nota.",
      "r": "**Explique ao cliente:** a lista abre em \"Em Aberto\"; nota finalizada só aparece depois de limpar o filtro. **Confira:** opções Finalizar, Imprimir Etiquetas, Cancelar e Excluir. **Fonte:** trilha de estagiários 06, bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** numa nota do pedido, digite uma quantidade maior que o saldo do item do PC e salve.",
      "r": "**Explique ao cliente:** recebeu a mais, o caminho é ajustar o pedido ou abrir outro. **Confira:** \"Item X do pedido de compra: quantidade a excede o saldo disponível de b…\". **Fonte:** REC-NR-008.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente gerar a nota de um PC com alçada pendente.",
      "r": "**Explique ao cliente:** só pedido aprovado entra em nota. **Confira:** \"Pedido X aguarda aprovação do nível N (valor V) — não pode ser importado para recebimento.\" **Fonte:** REC-NR-007; COM-ALC-006.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Entrega parcial: desdobro do pedido",
    "onde": "`Compras > Pedidos de Compra`",
    "intro": "Fornecedor que entrega em partes é comum. Mostre que o saldo não se perde: vira um pedido filho.",
    "passos": [
     {
      "t": "**Faça:** no PC de 100 unidades, gere a nota com 60 e salve.",
      "r": "**Explique ao cliente:** o pedido original fica com o recebido e o saldo vai para `PC-nnnn/2`; se o PC já gerou títulos, o residual e a nota dele não geram. **Confira:** PC original \"Recebido\" com 60 e `PC-nnnn/2` em aberto com 40. **Fonte:** REC-NR-009, REC-NR-010; COM-PC-009.",
      "s": "d",
      "campo": "Nº do PC residual (/2)"
     },
     {
      "t": "**Faça:** na lista de Pedidos de Compra, leia a coluna **NOTA DE RECEBIMENTO**.",
      "r": "**Explique ao cliente:** é por ela que o comprador sabe o que já chegou. **Confira:** \"NR-0000xx\" no pedido recebido. **Fonte:** trilha de estagiários 06, bloco 1.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente gerar outra nota no PC original.",
      "r": "**Explique ao cliente:** o restante se recebe pelo residual. **Confira:** \"Pedido de compra #N não está aberto para recebimento.\" **Fonte:** REC-NR-007.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Conferência física e divergências",
    "onde": "fila de conferências: `Recebimento > Aprovações` (fluxo antigo) ou `Recebimento > Conferências` (gestora)",
    "intro": "Com a conferência ligada, alguém conta o que chegou antes da entrada. Use uma nota com dois itens para mostrar uma contagem igual e uma divergente.",
    "passos": [
     {
      "t": "**Faça:** na fila, clique em **Conferir** na nota.",
      "r": "**Explique ao cliente:** o botão já inicia a conferência e trava a nota com o usuário; o responsável fica registrado. **Confira:** \"Conferência iniciada!\". **Fonte:** fluxo antigo de suprimentos, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** digite a quantidade conferida do primeiro item igual à nota e saia do campo.",
      "r": "**Explique ao cliente:** cada item é salvo ao sair do campo. **Confira:** \"Item salvo\", selo OK e o progresso de itens. **Fonte:** fluxo antigo de suprimentos, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** no segundo item, conte a menos (ex.: 8 de 10).",
      "r": "**Explique ao cliente:** a conferência registra a divergência; a falta volta ao fornecedor por NF-e de devolução. **Confira:** a divergência registrada no item. **Fonte:** REC-CON-003, REC-CON-004; README de Suprimentos, S5.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **Concluir Conferência**.",
      "r": "**Explique ao cliente:** sem concluir, a conferência fica aberta. **Confira:** a nota sai da fila. **Fonte:** fluxo antigo de suprimentos, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** com \"Exigir Conferência para Finalizar\" ligado, tente finalizar outra nota sem conferir.",
      "r": "**Explique ao cliente:** é a trava para ninguém dar entrada sem contar. **Confira:** \"Esta nota não pode ser finalizada sem antes passar pela conferência física…\". **Fonte:** REC-CON-007.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Finalizar: estoque e título a pagar nascem",
    "onde": "`Recebimento > Notas de Recebimento > ⋮ > Finalizar`",
    "intro": "A finalização é o momento que muda o estoque e o financeiro. Faça com o cliente e confira os reflexos nos outros módulos.",
    "passos": [
     {
      "t": "**Faça:** use `⋮ > Finalizar` e confirme.",
      "r": "**Explique ao cliente:** o aviso diz que a finalização movimenta estoque e gera títulos a pagar e não pode ser desfeita; o caminho de volta é cancelar a nota. **Confira:** nota \"Finalizada\" (limpe o filtro para vê-la). **Fonte:** fluxo antigo de suprimentos, bloco 6; trilha de estagiários 06, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Estoque > Movimentos` e `Estoque > Saldo` do insumo.",
      "r": "**Explique ao cliente:** a entrada é no almoxarifado central (projeto em branco) e recalcula o custo médio. **Confira:** a entrada \"Recebimento (NR)\" e o saldo somado; anote a quantidade que entrou na nota com divergência. **Fonte:** fluxo antigo de suprimentos, bloco 6.",
      "s": "v",
      "campo": "Saldo depois"
     },
     {
      "t": "**Faça:** abra `Financeiro > Contas a Pagar`.",
      "r": "**Explique ao cliente:** nasce um título por parcela, salvo quando o PC já gerou títulos ou é por conta do cliente. **Confira:** título com o documento NR-xxxxx, vencimento e valor da parcela. **Fonte:** fluxo antigo de suprimentos, bloco 6; REC-FIN-007.",
      "s": "v",
      "campo": "Nº do título a pagar"
     },
     {
      "t": "**Faça:** abra a lista de Pedidos de Compra e a `Linha do tempo` do PC.",
      "r": "**Explique ao cliente:** a cadeia fica rastreável de ponta a ponta. **Confira:** PC \"Recebido\", títulos \"Gerados\" e SC → COT → PC → NR → título. **Fonte:** fluxo antigo de suprimentos, bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra os dashboards de Compras e de Recebimento.",
      "r": "**Explique ao cliente:** o gestor acompanha o recebido no período e o saldo a receber dos pedidos. **Confira:** \"Recebido no período\" com o valor do teste. **Fonte:** fluxo antigo de suprimentos, bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente editar a nota finalizada.",
      "r": "**Explique ao cliente:** nota finalizada não muda; corrige-se cancelando e relançando. **Confira:** \"…Somente notas em aberto podem ser alteradas.\" **Fonte:** REC-NR-014.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. Cancelamento e devolução ao fornecedor",
    "onde": "`Recebimento > Notas de Recebimento > ⋮`",
    "intro": "Feche mostrando como desfazer uma entrada errada e como devolver mercadoria. A NF-e de devolução só é transmitida com o responsável fiscal.",
    "passos": [
     {
      "t": "**Faça:** numa nota finalizada cujo título já foi pago no roteiro do Financeiro, tente **Cancelar**.",
      "r": "**Explique ao cliente:** primeiro se estorna o pagamento, depois se cancela a nota. **Confira:** \"Existe(m) N Conta(s) a Pagar já paga(s)… Estorne o pagamento em Contas a Pagar antes de cancelar o documento.\" **Fonte:** REC-CAN-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** cancele outra nota finalizada informando o motivo.",
      "r": "**Explique ao cliente:** o cancelamento estorna o estoque, exclui os títulos e reabre o PC; o residual continua. **Confira:** NR \"Cancelada\", estorno em `Estoque > Movimentos` e o título fora de Contas a Pagar. **Fonte:** REC-CAN-001, REC-CAN-004; REC D, seção 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** numa nota importada por XML, use \"Identificar item incorreto\" no bloco \"Itens incorretos\" e depois **Gerar Devolução**.",
      "r": "**Explique ao cliente:** identificar só registra; a devolução cria a NF-e em rascunho no Faturamento. O estoque baixa só na autorização e o título não muda (fica pendência no Financeiro). **Confira:** a NF-e de devolução em rascunho. Não transmita sem o responsável fiscal. **Fonte:** REC-DEV-001, REC-DEV-002, REC-DEV-003.",
      "s": "d",
      "campo": "Nº da NF-e de devolução (rascunho)"
     },
     {
      "t": "**Faça:** tente **Gerar Devolução** na nota digitada sem chave de acesso.",
      "r": "**Explique ao cliente:** a devolução precisa referenciar a NF-e do fornecedor. **Confira:** \"A devolução precisa referenciar a NF-e do fornecedor e esta Nota de Recebimento não tem a chave de acesso…\". **Fonte:** REC-DEV-002.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Uma nota entrou por XML (DF-e ou arquivo) e outra pelo pedido de compra, com os dois números (NF e NR) anotados.",
    "s": "d"
   },
   {
    "t": "A entrega parcial criou o `PC-nnnn/2` com o saldo.",
    "s": "d"
   },
   {
    "t": "A conferência registrou uma contagem igual e uma divergente.",
    "s": "d"
   },
   {
    "t": "A finalização gerou a entrada \"Recebimento (NR)\" no almoxarifado central e o título a pagar com o documento NR.",
    "s": "v"
   },
   {
    "t": "Um título só por parcela, pela nota ou pelo pedido conforme a ata.",
    "s": "d"
   },
   {
    "t": "O cliente viu o sistema recusar: XML repetido, quantidade acima do pedido, finalizar sem conferência e cancelar com título pago.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste. Nomeie os registros com \"TESTE FLUXO CONSULTOR\". Nota fiscal de devolução só é transmitida com o responsável fiscal do cliente.",
   "**Responder à SEFAZ** (manifestação) é fiscal e não se desfaz: faça só com o responsável fiscal e numa nota de teste.",
   "**Finalizar** não pode ser desfeito: movimenta estoque e gera títulos. O caminho de volta é cancelar com motivo, e só depois de estornar pagamentos.",
   "A mesma nota tem dois números: \"NF-<fornecedor>\" na lista e \"NR-<interno>\" na conferência, no pedido e no título. Anote os dois.",
   "A lista de notas abre filtrada em \"Em Aberto\": a nota finalizada some até limpar o filtro.",
   "Iniciar a conferência trava a nota com o seu usuário; para destravar, use **Liberar** na fila.",
   "Hoje o sistema ainda dá entrada com custo cheio (com IPI e ICMS-ST, sem descontar crédito), diferente da decisão de produto. Avise o cliente que confere custo.",
   "Não existe importador de notas antigas: as notas já recebidas no sistema anterior entram como saldo de estoque e título a pagar."
  ],
  "naoValidado": [
   "Nome da fila de conferência: o fluxo antigo e a trilha de estagiários (conferidos na tela) usam `Recebimento > Aprovações`; a gestora usa `Recebimento > Conferências`, visível só com \"Usar Conferência Física\". Conferir o rótulo do menu.",
   "Quantidade que entra no estoque com divergência: a regra oficial diz que entra a quantidade da **nota** (REC-CON-004, D-196); o da gestora indica que o código pode dar entrada na quantidade **conferida**. Conferir na tela com a nota de 8 de 10.",
   "Custo da entrada: REC-FIN-004 diz custo sem o tributo recuperável no regime normal; o README de Suprimentos (S8) e o Estoque dizem que hoje entra cheio (WI #30480). Conferir o custo médio antes de explicar.",
   "Momento do desdobro do PC: REC-NR-009 diz que **salvar** a nota já desdobra; o checklist D de Compras descreve gerar a nota parcial **e finalizar**. Conferir quando o `PC-nnnn/2` aparece.",
   "Nome da caixa do DF-e: a gestora usa \"Aguardando manifestação\"; a trilha de estagiários cita \"Notas pendentes\". Conferir o menu.",
   "Conferência física como PRO: a gestora diz que, sem PRO, os parâmetros ficam inertes (D-198); o fluxo antigo trata só como parâmetro. Conferir a licença do cliente.",
   "Não conferidos na tela pelo fluxo antigo: DF-e, importação de XML, divergência e avaria na conferência, cancelamento e devolução."
  ]
 },
 {
  "id": "implantacao-estoque",
  "arquivo": "implantacao-10-estoque.html",
  "etiqueta": "Consultor · Implantação · Estoque",
  "titulo": "Implantação de Estoque: roteiro prático com o cliente",
  "subtitulo": "Junto com o almoxarife, monte o estoque do cliente e opere um produto de teste: locais e almoxarifado central, saldo inicial na data de corte, entradas e saídas manuais e automáticas, saldo e extrato, transferência, reserva, inventário com ajuste e empréstimo.",
  "objetivo": "Ao final, o cliente sabe que o saldo nunca é digitado: ele nasce de movimentos, e cada um deixa rastro no extrato. Ele viu o saldo inicial entrar, as travas de saldo, reserva e inventário funcionarem e o balanço do produto fechar em quantidade e valor.",
  "rodape": "Checklist de implantação · Estoque · fontes: gestora EST (A, B, C, D) e README de Suprimentos; fluxo antigo de estoque (20/10/2026); trilha de estagiários 07; procedimento \"dar entrada manual no estoque\"; regras de estoque do Harness · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação concluída: **tipo de categoria** final, **unidade de estoque** e **fator de embalagem** de cada produto conferidos, e cores cadastradas.",
    "r": "**Confira:** amostra de produtos. Depois do saldo, o tipo da categoria trava. **Fonte:** README de Suprimentos, ordem 3; CAD-CAT-004, EST-SLD-003.",
    "s": "d"
   },
   {
    "t": "Produto de teste de **uso controlado em estoque**, com **Origem da Mercadoria** preenchida e preço de custo no cadastro.",
    "r": "**Confira:** o cadastro do produto. Sem origem, o salvar avisa só no fim; sem custo, a sobra do inventário trava a aprovação. **Fonte:** fluxo antigo de estoque (pré-requisito e atenção); EST-INV-008.",
    "s": "v"
   },
   {
    "t": "Três usuários de teste: quem cria e quem confirma a transferência; dois contadores e um aprovador do inventário.",
    "r": "**Confira:** `Segurança > Perfis de Acesso`. A regra vale até para Super Usuário. **Fonte:** README de Suprimentos, S9; EST-INV-004 a 007.",
    "s": "d"
   },
   {
    "t": "Data de corte combinada com o cliente, depois da contagem física e das últimas notas do sistema antigo, e a planilha de saldo com custo aceito pela contabilidade.",
    "r": "**Confira:** a ata. **Fonte:** README de Suprimentos, S7; EST C, etapa 4.",
    "s": "d"
   },
   {
    "t": "Saber se o cliente usa inventário (PRO), localizações (PRO) e empréstimo, e quem pode retirar material reservado.",
    "r": "**Confira:** `Minha Assinatura` e a ata. **Fonte:** EST C, etapas 3 e 5; EST-MOV-010.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Locais e almoxarifado central",
    "onde": "`Estoque > Locais` e `Estoque > Configurações > Parâmetros de Estoque`",
    "intro": "Tudo no estoque acontece num local. Comece garantindo o almoxarifado central em cada empresa, porque é nele que a nota de recebimento e a produção dão entrada.",
    "passos": [
     {
      "t": "**Faça:** abra `Estoque > Locais` e confira o almoxarifado central ativo de cada empresa.",
      "r": "**Explique ao cliente:** sem central ativo, a nota não finaliza e a produção não conclui; a instalação inicial só cria o central da primeira empresa. **Confira:** um central ativo por empresa. **Fonte:** fluxo antigo de estoque (pré-requisito); regra \"almoxarifado central ativo é pré-requisito\"; README de Suprimentos, S6.",
      "s": "v"
     },
     {
      "t": "**Faça:** cadastre um segundo local de teste (ex.: depósito).",
      "r": "**Explique ao cliente:** locais de obra não se criam aqui: nascem com o projeto. **Confira:** o local ativo na lista. **Fonte:** EST C, etapa 1; EST-LOC-003.",
      "s": "d",
      "campo": "Código do segundo local"
     },
     {
      "t": "**Faça:** tente marcar o segundo local também como almoxarifado central.",
      "r": "**Explique ao cliente:** é um central por empresa. **Confira:** \"A empresa X já possui um almoxarifado central. Rebaixe-o antes de promover outro.\" **Fonte:** EST-LOC-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra os Parâmetros de Estoque e anote, com o cliente, o estado de \"Bloquear saída sem saldo\" e das regras de movimento retroativo.",
      "r": "**Explique ao cliente:** os parâmetros valem para a empresa inteira; \"Usar localizações por local\" é irreversível. **Confira:** os valores anotados antes de começar. **Fonte:** EST C, etapa 2; fluxo antigo de estoque (pré-requisito).",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Saldo inicial na data de corte",
    "onde": "`Estoque > Saldo > Mais > Importar saldo`",
    "intro": "O saldo de abertura entra por planilha, antes de qualquer compra ou nota no Flow. Faça com um arquivo de teste de poucas linhas.",
    "passos": [
     {
      "t": "**Faça:** no assistente de importação de saldo, baixe o modelo e preencha Empresa, Código do produto, Descrição, Local de estoque, Propriedade, Tipo de movimento (\"Saldo inicial\"), Quantidade, Custo unitário e as medidas e cor que a categoria pede.",
      "r": "**Explique ao cliente:** a quantidade vai na unidade de estoque e o custo vira o custo médio de abertura; perfil leva comprimento e cor, superfície leva altura, largura e cor. **Confira:** o arquivo com as colunas obrigatórias. **Fonte:** EST C, etapa 4; EST-IMP-002, EST-SLD-005.",
      "s": "d"
     },
     {
      "t": "**Faça:** suba a planilha, corrija na Validação até não sobrar linha inválida e execute.",
      "r": "**Explique ao cliente:** a planilha não tem data: o movimento nasce no dia em que é aplicada; reimportar o mesmo conteúdo não duplica. **Confira:** sem \"Planilha com N linha(s) inválida(s)…\" e o assistente em Concluído. **Fonte:** EST-IMP-001, EST-IMP-003; README de Suprimentos, S7.",
      "s": "d"
     },
     {
      "t": "**Faça:** confira em `Mais > Importações de saldo` e em `Estoque > Movimentos` filtrando o tipo \"Importação de saldo inicial\".",
      "r": "**Explique ao cliente:** a importação fica registrada com usuário, data e a planilha original. **Confira:** os totais por local batem com a planilha do cliente. **Fonte:** EST-IMP-004, EST-MOV-014.",
      "s": "d",
      "campo": "Data e usuário da importação"
     },
     {
      "t": "**Faça:** tente lançar um movimento no mesmo produto com data anterior à importação.",
      "r": "**Explique ao cliente:** é por isso que nada se lança antes do saldo inicial. **Confira:** \"Movimento retroativo bloqueado: já existe movimentação posterior a …\". **Fonte:** EST-MOV-006.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Entradas e saídas manuais",
    "onde": "`Estoque > Movimentos > + Novo Movimento`",
    "intro": "Os movimentos manuais cobrem o que não vem de documento: entrada avulsa, ajuste, descarte. Mostre também que movimento não se edita: corrige-se por estorno.",
    "passos": [
     {
      "t": "**Faça:** crie um movimento com **Tipo** \"Entrada manual\", **Empresa**, **Local de destino** e, na linha do item, **Produto**, **Quantidade** e **Custo unit.**. Clique em **Salvar**.",
      "r": "**Explique ao cliente:** a Empresa é obrigatória e não vem preenchida; **Ctrl+S salva**. Os tipos são Entrada manual, Ajuste positivo, Ajuste negativo, Transferência, Requisição, Devolução de uso, Empréstimo e Descarte. **Confira:** o movimento numerado na lista. **Fonte:** procedimento \"dar entrada manual no estoque\"; fluxo antigo de estoque, bloco 1.",
      "s": "v",
      "campo": "Nº do movimento"
     },
     {
      "t": "**Faça:** em `Estoque > Saldo`, pesquise o produto em \"Buscar na lista: produto, código, local...\".",
      "r": "**Explique ao cliente:** saldo e custo médio foram atualizados pelo movimento. **Confira:** **Saldo** igual à entrada e o **Valor total**. **Fonte:** procedimento \"dar entrada manual no estoque\"; trilha de estagiários 07.",
      "s": "v",
      "campo": "Saldo e valor depois da entrada"
     },
     {
      "t": "**Faça:** lance um **Ajuste positivo** (sobra) e um **Ajuste negativo** (perda).",
      "r": "**Explique ao cliente:** cada ajuste deixa o motivo no extrato. **Confira:** o saldo acompanha os dois ajustes. **Fonte:** fluxo antigo de estoque, bloco 1; EST-MOV-002.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente uma saída maior que o saldo, com \"Bloquear saída sem saldo\" ligado e depois desligado.",
      "r": "**Explique ao cliente:** é a decisão do cliente se o saldo pode ficar negativo. **Confira:** ligado, recusa; desligado, passa e o saldo fica negativo. **Fonte:** fluxo antigo de estoque, bloco 1; EST-MOV-010.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra o movimento de entrada e use **Estornar**, informando o motivo.",
      "r": "**Explique ao cliente:** movimento não se edita; o estorno entra na data de hoje e só se faz uma vez. **Confira:** nasce o movimento \"Estorno\", o original fica \"Estornado\" e o saldo volta. **Fonte:** fluxo antigo de estoque, bloco 1; EST-MOV-001, EST-MOV-004.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "4. Entradas e saídas automáticas",
    "onde": "`Estoque > Movimentos`",
    "intro": "A maior parte do estoque se move sozinha, pelos documentos dos outros módulos. Mostre ao cliente onde ver cada origem.",
    "passos": [
     {
      "t": "**Faça:** filtre `Estoque > Movimentos` por produto e data e leia a coluna de tipo.",
      "r": "**Explique ao cliente:** recebimento, baixa de OP, entrada de produto acabado e ajuste de inventário vêm dos documentos, não da tela. **Confira:** origens como Recebimento (NR), Requisição, OP - Conclusão e Estorno. **Fonte:** trilha de estagiários 07, bloco 5; EST-MOV-002.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra o movimento da nota finalizada no roteiro de Recebimento, sem clicar em **Estornar**.",
      "r": "**Explique ao cliente:** a nota dá entrada no almoxarifado central e recalcula o custo médio. **Confira:** a entrada \"Recebimento (NR)\" com origem, destino e itens. **Fonte:** fluxo antigo de suprimentos, bloco 6; trilha de estagiários 07, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** depois de uma NF-e de venda autorizada no roteiro de Faturamento, procure a saída do produto.",
      "r": "**Explique ao cliente:** a saída nasce na autorização da nota; documento emitido antes da contratação do Estoque não movimenta. **Confira:** a saída ligada à nota. **Fonte:** EST C, etapa 7; EST-INT-002.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Saldo e extrato",
    "onde": "`Estoque > Saldo` e o código do produto",
    "intro": "É a tela que o cliente mais vai consultar. Ensine a achar a linha certa e a ler de onde veio cada quantidade.",
    "passos": [
     {
      "t": "**Faça:** pesquise o produto e localize a linha certa.",
      "r": "**Explique ao cliente:** cada produto aparece uma vez por **local** e por **variação** (cor e medidas). **Confira:** a linha do local e da cor do teste. **Fonte:** trilha de estagiários 07, bloco 3; EST-SLD-001.",
      "s": "v"
     },
     {
      "t": "**Faça:** leia SALDO, RESERVADA, CUSTO MÉDIO e VALOR TOTAL e use `Mais filtros` (obra, propriedade, atributos).",
      "r": "**Explique ao cliente:** disponível = saldo − reservado; os filtros ficam salvos no navegador (\"Limpar filtros\" se algo sumir). **Confira:** o número da RESERVADA abre as reservas daquela posição. **Fonte:** trilha de estagiários 07, bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique no código do produto e abra as abas **Posições** e **Histórico**.",
      "r": "**Explique ao cliente:** o histórico é o extrato: data, número, tipo, quantidade e motivo. **Confira:** a entrada manual, o estorno e a entrada da NR no histórico. **Fonte:** trilha de estagiários 07, bloco 4.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "6. Transferência e reserva",
    "onde": "`Estoque > Transferências` e coluna `Reservada` do Saldo",
    "intro": "A transferência mostra a diferença entre saldo e disponível: enquanto pendente, ela reserva a quantidade na origem.",
    "passos": [
     {
      "t": "**Faça:** crie uma transferência de 5 unidades do almoxarifado central para o segundo local, sem confirmar.",
      "r": "**Explique ao cliente:** o saldo da origem não desce ainda, mas o disponível desce. **Confira:** número TRF- pendente; ex.: saldo 20, reservado 5, disponível 15. **Fonte:** fluxo antigo de estoque, bloco 2; regra \"transferência pendente reserva o disponível\".",
      "s": "v",
      "campo": "Nº da transferência (TRF-)"
     },
     {
      "t": "**Faça:** na tela de Saldo, clique no número da coluna **Reservada** da origem.",
      "r": "**Explique ao cliente:** toda reserva aponta o documento que a criou. **Confira:** o detalhe mostra essa transferência. **Fonte:** fluxo antigo de estoque, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente transferir com origem igual ao destino, com quantidade zero e sem item.",
      "r": "**Explique ao cliente:** o sistema só aceita transferência válida entre locais distintos e ativos. **Confira:** as três são recusadas. **Fonte:** fluxo antigo de estoque, bloco 2; EST-TRF-001 a 007.",
      "s": "v"
     },
     {
      "t": "**Faça:** com o usuário que tem permissão de confirmar, clique em **Confirmar**.",
      "r": "**Explique ao cliente:** nada fica em trânsito; o custo médio acompanha o material. **Confira:** origem desce 5, destino sobe 5 e a reserva é consumida; os botões Confirmar e Excluir somem. **Fonte:** fluxo antigo de estoque, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** crie outra transferência pendente e exclua-a.",
      "r": "**Explique ao cliente:** excluir a pendente libera a reserva sem gerar movimento. **Confira:** o disponível volta ao que era. **Fonte:** fluxo antigo de estoque, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente reservar ou transferir mais que o disponível.",
      "r": "**Explique ao cliente:** a reserva é por variação e por local. **Confira:** a operação é recusada. **Fonte:** fluxo antigo de estoque, bloco 3; EST-TRF-003.",
      "s": "d"
     },
     {
      "t": "**Faça:** com material reservado, lance uma requisição que consumiria a parte reservada.",
      "r": "**Explique ao cliente:** é aqui que se decide quem pode retirar material reservado para outro documento. **Confira:** anote se a saída passou ou foi recusada e o disponível antes e depois. **Fonte:** fluxo antigo de estoque, bloco 3; EST-MOV-010.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. Inventário com ajuste",
    "onde": "`Estoque > Inventário` e `Estoque > Aprovações > Inventários`",
    "intro": "O inventário confere o físico contra o sistema e ajusta a diferença. Ele congela o local e exige pessoas diferentes para contar e aprovar.",
    "passos": [
     {
      "t": "**Faça:** abra um inventário (empresa, local e tipo) no segundo local e inicie.",
      "r": "**Explique ao cliente:** o sistema fotografa o saldo, um item por variação, e congela o local; agende fora do expediente. **Confira:** número sequencial do inventário. **Fonte:** fluxo antigo de estoque, bloco 4; regra \"inventário congela o local\".",
      "s": "v",
      "campo": "Nº do inventário"
     },
     {
      "t": "**Faça:** tente um movimento nesse local e um segundo inventário no mesmo local.",
      "r": "**Explique ao cliente:** não existem dois inventários ativos no mesmo local. **Confira:** os dois são recusados (\"Movimento bloqueado: o local … está com o inventário … em andamento.\"). **Fonte:** fluxo antigo de estoque, bloco 4; EST-MOV-007.",
      "s": "v"
     },
     {
      "t": "**Faça:** na tela do conferente, conte um item igual ao sistema e outro diferente.",
      "r": "**Explique ao cliente:** a contagem é cega: a tela não mostra o saldo. Igual aprova direto; diferente vai para a 2ª contagem. **Confira:** o item divergente pendente de nova contagem. **Fonte:** fluxo antigo de estoque, bloco 4; EST-INV-004.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente a 2ª contagem com o mesmo usuário; depois faça-a com outra pessoa.",
      "r": "**Explique ao cliente:** duas de três contagens iguais aprovam o item. **Confira:** o mesmo usuário é recusado (\"deve ser feita por outra pessoa\"); a outra pessoa grava. **Fonte:** fluxo antigo de estoque, bloco 4; EST-INV-005, EST-INV-006.",
      "s": "d"
     },
     {
      "t": "**Faça:** com um terceiro usuário, revise o resumo, informe o custo de sobras sem custo e **aprove**.",
      "r": "**Explique ao cliente:** quem contou não aprova, nem Super Usuário. **Confira:** cada diferença vira ajuste com origem inventário, o saldo bate com a contagem e o local é liberado. **Fonte:** fluxo antigo de estoque, bloco 4; EST-INV-007, EST-INV-008.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra outro inventário e cancele com motivo antes de aprovar.",
      "r": "**Explique ao cliente:** cancelar libera o local sem ajuste. **Confira:** nenhum ajuste gerado. **Fonte:** fluxo antigo de estoque, bloco 4.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "8. Empréstimo entre locais (se o cliente usa)",
    "onde": "`Estoque > Empréstimos`",
    "intro": "Para quem empresta material entre locais ou obras com data de volta. Pule o bloco se o cliente não usa.",
    "passos": [
     {
      "t": "**Faça:** registre um empréstimo de 20 unidades com data prevista de devolução.",
      "r": "**Explique ao cliente:** o material sai do local de origem e fica em aberto até voltar. **Confira:** empréstimo aberto, sem devolução. **Fonte:** fluxo antigo de estoque, bloco 5; regra \"empréstimo, devolução parcial e total\".",
      "s": "v",
      "campo": "Nº do empréstimo"
     },
     {
      "t": "**Faça:** devolva 10, depois o restante, e tente devolver mais do que foi emprestado.",
      "r": "**Explique ao cliente:** a devolução pode ser parcial. **Confira:** parcial 50%, total 100% e o excesso recusado. **Fonte:** fluxo antigo de estoque, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** compare o valor do material antes do empréstimo e depois da devolução completa.",
      "r": "**Explique ao cliente:** a devolução usa o custo médio correto. **Confira:** o valor volta igual nos dois locais. **Fonte:** fluxo antigo de estoque, bloco 5.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "9. Reposição e balanço final",
    "onde": "`Estoque > Reposição`, `Compras > Sugestão de Compra` e `Estoque > Reservas órfãs`",
    "intro": "Feche provando que tudo o que foi feito fecha no saldo e ligando o estoque ao Compras pela reposição.",
    "passos": [
     {
      "t": "**Faça:** defina estoque mínimo para o produto e abra `Estoque > Reposição` e `Compras > Sugestão de Compra`.",
      "r": "**Explique ao cliente:** a falta líquida = mínimo − disponível alimenta as solicitações de compra. **Confira:** o item aparece nas duas telas; sem mínimo, não aparece. **Fonte:** fluxo antigo de estoque, bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** com o cliente, faça o balanço do produto: saldo inicial + entradas − saídas ± ajustes ± transferências − estornos.",
      "r": "**Explique ao cliente:** qualquer diferença é defeito, não ajuste de rotina. **Confira:** o resultado é igual ao saldo final em quantidade e valor. **Fonte:** fluxo antigo de estoque, bloco 6.",
      "s": "v",
      "campo": "Saldo final (quantidade e valor)"
     },
     {
      "t": "**Faça:** abra `Estoque > Reservas órfãs`.",
      "r": "**Explique ao cliente:** toda reserva precisa ter um documento pendente. **Confira:** a lista vazia antes do go-live. **Fonte:** EST C, etapa 7; EST-RES-003.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Cada empresa tem almoxarifado central ativo, e o saldo inicial entrou na data de corte conferido contra a planilha.",
    "s": "d"
   },
   {
    "t": "Entrada manual, ajustes e estorno mudaram o saldo e ficaram no extrato.",
    "s": "d"
   },
   {
    "t": "A entrada da nota de recebimento apareceu como \"Recebimento (NR)\" no almoxarifado central.",
    "s": "v"
   },
   {
    "t": "A transferência pendente reservou o disponível e a confirmada moveu o saldo entre os locais.",
    "s": "v"
   },
   {
    "t": "O inventário congelou o local, exigiu outras pessoas e gerou o ajuste da diferença.",
    "s": "d"
   },
   {
    "t": "O balanço do produto fechou em quantidade e valor e não sobraram reservas órfãs.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste. Nomeie os registros com \"TESTE FLUXO CONSULTOR\" e não deixe inventário aberto em empresa de produção: ele congela o local.",
   "**Ctrl+S salva** o movimento. **Importar saldo**, **Estornar**, **Aprovar inventário** e aprovar **Encerramentos** alteram o estoque e não têm desfazer.",
   "Nada se lança antes do saldo inicial nas mesmas variações: o retroativo é recusado e o custo médio se perde.",
   "A 2ª contagem e a aprovação do inventário exigem **outra pessoa**, até para Super Usuário: crie os usuários antes.",
   "Transferência e Empréstimo existem como tipo de movimento **e** como telas próprias: use um só caminho por teste.",
   "Não existe item \"Reservas\" no menu: a reserva está na coluna RESERVADA do Saldo (vem oculta por padrão) e na aba Reservas do produto.",
   "Hoje o sistema ainda dá entrada da nota com custo cheio (com IPI e ICMS-ST, sem descontar crédito). Avise o cliente que confere custo médio.",
   "Os avisos na tela não somem sozinhos e podem cobrir botões: feche-os antes de continuar."
  ],
  "naoValidado": [
   "Saída sobre material reservado: o fluxo antigo (conferido na tela, v1.22.12) viu a requisição passar sobre 3 unidades reservadas, deixando o disponível negativo; a gestora diz que retirar reserva alheia exige a permissão a permissão de retirar material reservado e mostra mensagem de recusa (EST-MOV-010, D-285). Conferir antes de ensinar.",
   "Parâmetros de Estoque: o fluxo antigo diz que na v1.22.12 só existe \"bloquear saída sem saldo\"; a gestora lista também \"Permitir movimento com data passada\", \"Dias máximos para movimento retroativo\", \"Usar localizações por local\", alerta de fator e retalho mínimo. Conferir a tela.",
   "Caminhos de menu: o fluxo antigo usa `Estoque > Locais` e `Estoque > Inventário`; a gestora usa `Estoque > Configurações > Locais` e `Estoque > Inventários`. Conferir os rótulos.",
   "Extrato da transferência: o fluxo antigo esperava saída e entrada com o mesmo número TRF-, mas viu um movimento único com origem e destino. Conferir como aparece antes de explicar.",
   "Inventário como PRO: a gestora marca inventário e localizações como PRO; o fluxo antigo executou o inventário sem citar licença. Conferir a assinatura do cliente.",
   "Custo da entrada pela nota: hoje entra com IPI e ICMS-ST e sem crédito (EST-SLD-004, README S8), o que diverge das decisões D-199/D-465 (WI #30480). Conferir o custo médio depois da NR.",
   "Não conferidos na tela: importação de saldo inicial, ajustes positivo e negativo, mês encerrado, auditoria e aprovação do inventário, regra criar × confirmar da transferência e Reservas órfãs."
  ],
  "video": {
   "id": "consultor-04-estoque",
   "titulo": "Movimento, transferência, reserva e inventário",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-producao",
  "arquivo": "implantacao-11-producao.html",
  "etiqueta": "Consultor · Implantação · Produção",
  "titulo": "Implantação de Produção: roteiro prático com o cliente",
  "subtitulo": "Junto com o cliente, leve um produto de teste da estrutura de produto até o estoque: OP criada a partir do pedido, requisições e baixa de material, apontamento, marcar produzido e entrada do produto acabado.",
  "objetivo": "Ao final, o cliente terá visto uma OP nascer do pedido com etapas e materiais da estrutura, baixar os insumos, registrar o início do trabalho e creditar o produto acabado no estoque com custo. Ele saberá repetir o caminho e conhecerá os alertas que travam a conclusão.",
  "rodape": "Checklist de implantação · Produção · fontes: Fluxo de produção (passos conferidos em out/2026), procedimento-criar-ordem-de-producao-do-pedido, regras de produção, FAQ de limitações, manual-07-producao · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "**Etapas de produção**, **processo** e **linha de produção** cadastrados, e o processo informado no produto (**Processo de produção padrão**).",
    "r": "**Confira:** `Produção > Configurações` e `Cadastros > Produtos`. Sem processo no produto a OP não tem etapas, não aparece no Painel de fábrica e o terminal não deixa apontar. **Fonte:** manual-07-producao, Parte 1 e 1.1.",
    "s": "d"
   },
   {
    "t": "Insumos da estrutura **com saldo** e **almoxarifado central ativo** na empresa da OP (ou local da obra na mesma empresa).",
    "r": "**Confira:** `Estoque > Saldo` e `Estoque > Locais`. Sem local ativo a OP não conclui (selo \"Conclusão bloqueada\"). **Fonte:** Fluxo de produção (pré-requisitos); manual-07-producao, 2.4.",
    "s": "v"
   },
   {
    "t": "Pedido de venda de teste (\"TESTE FLUXO CONSULTOR\") com o produto de teste, e um funcionário cadastrado para apontar.",
    "r": "**Confira:** o pedido em `Vendas > Pedidos de Venda` e o funcionário em `Cadastros > Participantes`. **Fonte:** Fluxo de produção (pré-requisitos); procedimento-criar-ordem-de-producao-do-pedido.",
    "s": "d",
    "campo": "Nº do pedido (PV-)"
   },
   {
    "t": "Saldo dos insumos e do produto acabado anotados antes de começar.",
    "r": "**Confira:** `Estoque > Saldo`. **Fonte:** Fluxo de produção (pré-requisitos).",
    "s": "v",
    "campo": "Saldos antes"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Estrutura do produto",
    "onde": "`Produção > Configurações > Estrutura de produto`",
    "intro": "A estrutura diz o que cada unidade consome. Sem ela a OP nasce sem requisições e o estoque não sabe o que baixar.",
    "passos": [
     {
      "t": "**Faça:** abra `Produção > Configurações > Etapas de produção` e `Processos de produção` e mostre o processo do produto de teste.",
      "r": "**Explique ao cliente:** o processo é a sequência de etapas que o produto percorre; a OP copia essas etapas. **Confira:** as etapas na ordem e o tempo padrão total no rodapé. **Fonte:** manual-07-producao, 1.1.",
      "s": "d"
     },
     {
      "t": "**Faça:** em **+ Nova Estrutura**, escolha o produto acabado e inclua dois componentes com a quantidade por unidade (ex.: uma chapa e um parafuso), usando **Definir parâmetros** para informar a cor. Clique em **Salvar**.",
      "r": "**Explique ao cliente:** com a estrutura, a OP sabe o que separar e baixar a cada unidade produzida. **Confira:** a estrutura na lista com a quantidade de itens; anote as quantidades. **Fonte:** Fluxo de produção, bloco 1; manual-07-producao, 1.2.",
      "s": "v"
     },
     {
      "t": "**Faça:** inclua um componente paramétrico (perfil ou chapa) **sem cor** e tente salvar.",
      "r": "**Explique ao cliente:** material paramétrico sempre exige cor, inclusive na entrada de estoque, para o saldo bater. **Confira:** a recusa \"Selecione a cor do produto — obrigatória para este tipo de material\" (a mensagem cita um identificador interno em vez do código). **Fonte:** Fluxo de produção, bloco 1; regra-producao-item-parametrico-da-estrutura-exige-cor.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente criar uma segunda estrutura para o mesmo produto com período sobreposto.",
      "r": "**Explique ao cliente:** um produto tem uma estrutura vigente por período. **Confira:** o sistema impede com mensagem. **Fonte:** Fluxo de produção, bloco 1.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Ordem de produção a partir do pedido",
    "onde": "`Produção > Ordens de produção > + Nova OP`",
    "intro": "O pedido não tem botão para gerar OP: ela é criada no módulo Produção e vinculada ao pedido e ao item.",
    "passos": [
     {
      "t": "**Faça:** em **Nova OP**, deixe o **Número da OP** vazio, mantenha **Tipo de operação** \"Fabricação\" e a **Linha de produção**, escolha o **Pedido de venda** e o **Item do pedido**, clique em **Aplicar** em \"Dados do Item\", escolha a **Empresa** e informe a **Quantidade**. Clique em **Salvar** no rodapé (não use Esc).",
      "r": "**Explique ao cliente:** a OP copia produto, cor e medidas do item, mas **não** a quantidade; a Empresa é obrigatória, embora a dica diga que herda do pedido. **Confira:** \"Registro salvo com sucesso!\" e a OP \"Em aberto\" na lista. **Fonte:** Fluxo de produção, bloco 2; procedimento-criar-ordem-de-producao-do-pedido; regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.",
      "s": "v",
      "campo": "Nº da OP"
     },
     {
      "t": "**Faça:** abra `Mais ações > Etapas de execução da OP`.",
      "r": "**Explique ao cliente:** as etapas são uma cópia do processo; mudar o processo depois não altera a OP já criada. **Confira:** as mesmas etapas do processo, na mesma ordem. **Fonte:** Fluxo de produção, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Mais ações > Materiais necessários` e compare com as quantidades anotadas da estrutura.",
      "r": "**Explique ao cliente:** as requisições nascem sozinhas ao salvar a OP (quantidade da estrutura × quantidade da OP). Produto sem estrutura mostra \"OP sem requisições da estrutura\". **Confira:** uma requisição por componente, com a quantidade certa. **Fonte:** Fluxo de produção, bloco 2; regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "3. Requisições e baixa de material",
    "onde": "`Mais ações > Materiais necessários`",
    "intro": "Cada baixa tira o insumo do estoque. Mostre o reflexo em Estoque a cada movimento.",
    "passos": [
     {
      "t": "**Faça:** use a importação da estrutura de novo na mesma OP.",
      "r": "**Explique ao cliente:** reimportar refaz os itens de origem Estrutura sem duplicar. **Confira:** as requisições continuam sem duplicidade. **Fonte:** Fluxo de produção, bloco 2; regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **Baixar** numa requisição informando só parte da quantidade (ex.: 1 de 4). Depois abra `Estoque > Movimentos` e `Estoque > Saldo`.",
      "r": "**Explique ao cliente:** a baixa pode ser parcial, conforme o material sai para a fábrica. **Confira:** status \"Atendida Parcialmente\", movimento \"Baixa de componente em OP\" e o saldo do insumo menor. **Fonte:** Fluxo de produção, bloco 3; regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "v"
     },
     {
      "t": "**Faça:** baixe o restante da requisição.",
      "r": "**Explique ao cliente:** a requisição só fecha quando todo o material foi baixado. **Confira:** status \"Atendida\". **Fonte:** Fluxo de produção, bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Estornar** numa baixa e informe o motivo.",
      "r": "**Explique ao cliente:** o estorno corrige uma baixa errada sem apagar o histórico. **Confira:** o saldo do insumo volta, o status recalcula e o custo da OP desconta o estornado. **Fonte:** Fluxo de produção, bloco 3; regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "4. Apontamento: iniciar e finalizar",
    "onde": "botão `▶` da linha da OP, `Mais ações > Apontamentos` e `Produção > Terminal de apontamento`",
    "intro": "O apontamento registra quem trabalhou, em que etapa e por quanto tempo. Hoje a finalização ainda é recusada: mostre o início e explique o defeito.",
    "passos": [
     {
      "t": "**Faça:** clique em `▶` na linha da OP e **Inicie** o apontamento escolhendo a etapa e o funcionário.",
      "r": "**Explique ao cliente:** o início do apontamento já coloca a OP em produção. **Confira:** \"Apontamento iniciado com sucesso!\" e a OP passando de \"Em aberto\" para \"Em execução\". **Fonte:** Fluxo de produção, bloco 4.",
      "s": "v",
      "campo": "Nº do apontamento"
     },
     {
      "t": "**Faça:** com o apontamento aberto, tente iniciar outro para o mesmo funcionário na mesma OP.",
      "r": "**Explique ao cliente:** um funcionário não aponta duas vezes a mesma OP ao mesmo tempo. **Confira:** o sistema impede. **Fonte:** Fluxo de produção, bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em `▶` de novo e em **Finalizar**, primeiro com quantidade zero e depois com a quantidade produzida.",
      "r": "**Explique ao cliente:** quantidade zero é recusada. Hoje o sistema ainda recusa a finalização com \"A data/hora de fim não pode ser no futuro\", mesmo com o horário certo: anote o horário e avise o suporte. **Confira:** a mensagem que aparecer e o apontamento em `Mais ações > Apontamentos`. **Fonte:** Fluxo de produção, bloco 4; FAQ de limitações (PRO-1).",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Produção > Terminal de apontamento` e mostre o caminho do chão de fábrica: tarefa **Apontar**, operador, OP pelo número, etapa e **Iniciar**.",
      "r": "**Explique ao cliente:** o terminal é feito para tablet ou celular na bancada; ao terminar, o operador informa a quantidade Boa e o Refugo e toca em Finalizar. **Confira:** OP, etapa e operador na tela e o cronômetro rodando; não finalize sem combinar com o responsável pela OP de teste. **Fonte:** manual-07-producao, 2.4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Marcar produzido e entrada do produto acabado",
    "onde": "`Mais ações > Marcar produzido` e `Estoque > Movimentos`",
    "intro": "É a passagem da Produção para o Estoque: o produto acabado entra no almoxarifado com o custo da OP.",
    "passos": [
     {
      "t": "**Faça:** na lista de OPs, passe o mouse sobre os selos de alerta da OP de teste (Conclusão bloqueada, Conclusão travada, Material não baixado, Estoque não creditado).",
      "r": "**Explique ao cliente:** sem almoxarifado ativo da empresa ou da obra a conclusão fica bloqueada; \"Estoque não creditado\" pede acionar o suporte. **Confira:** a causa de cada selo exibido. **Fonte:** Fluxo de produção, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em `Mais ações > Marcar produzido` com a quantidade total.",
      "r": "**Explique ao cliente:** este botão encerra a OP e credita o produto acabado. **Confira:** a OP \"Produzido\". **Fonte:** Fluxo de produção, bloco 5; regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Estoque > Movimentos` e o extrato do produto acabado.",
      "r": "**Explique ao cliente:** o custo unitário do acabado é o custo real da OP dividido pela quantidade. **Confira:** o movimento \"Entrada de produto acabado (OP)\" no almoxarifado central, com a OP no motivo, e o saldo maior que o anotado. **Fonte:** Fluxo de produção, bloco 5; regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "v",
      "campo": "Saldo depois"
     },
     {
      "t": "**Faça:** abra `Mais ações > Custo da OP` e `Linha do tempo`.",
      "r": "**Explique ao cliente:** o gestor compara o que foi orçado com o que a fábrica gastou. **Confira:** custo estimado × realizado, separado em mão de obra e materiais, e tempo planejado × real por etapa. **Fonte:** Fluxo de produção, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Mais ações > Apontamentos` da OP produzida.",
      "r": "**Explique ao cliente:** hoje o apontamento que não finalizou continua aberto mesmo com a OP produzida; por isso, finalize o apontamento antes de marcar produzido quando o defeito for corrigido. **Confira:** o apontamento ainda aberto. **Fonte:** Teste do fluxo completo, bloco 4; regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "v"
     },
     {
      "t": "**Faça:** na OP Produzida, tente criar uma nova requisição de material.",
      "r": "**Explique ao cliente:** OP Produzida ou Cancelada não recebe requisição. **Confira:** o sistema não aceita. **Fonte:** Fluxo de produção, bloco 2.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Acompanhamento da fábrica",
    "onde": "`Produção > Painel de fábrica`, `Produção > Separação de materiais` e `Produção > Visão geral`",
    "intro": "Feche mostrando onde o PCP e o gestor acompanham as OPs no dia a dia.",
    "passos": [
     {
      "t": "**Faça:** abra o **Painel de fábrica** nas visões Cards, Lista e Timeline.",
      "r": "**Explique ao cliente:** o painel mostra a fila da fábrica por etapa. **Confira:** os contadores Ordens / No prazo / Atrasadas; o botão \"Apontar <ETAPA>\" de cada card grava apontamento, então não clique sem querer. **Fonte:** Fluxo de produção, bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** gere uma lista de separação para uma OP em `Produção > Separação de materiais` e abra o detalhe.",
      "r": "**Explique ao cliente:** a separação prepara o material antes de ir para a bancada. **Confira:** necessário, separado, falta e pendente, com a quantidade igual à da requisição e o item paramétrico com cor e dimensões. **Fonte:** Fluxo de produção, bloco 6.",
      "s": "v",
      "campo": "Nº da separação (SEP-)"
     },
     {
      "t": "**Faça:** no app `/separacao`, abra a lista pelo botão **Abrir lista** e separe um item. Depois confira a requisição da OP e `Estoque > Saldo`.",
      "r": "**Explique ao cliente:** separar também baixa a requisição, sem passar por Materiais necessários. **Confira:** a quantidade separada sobe, a requisição é baixada e o saldo do insumo desce; o app mostra a OP pelo identificador interno, não pelo número. **Fonte:** Fluxo de produção, bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Produção > Visão geral`.",
      "r": "**Explique ao cliente:** os insumos que mais travam são a lista de compra do dia para destravar a fábrica. **Confira:** ritmo do dia, OPs bloqueadas por material e o valor travado. **Fonte:** manual-07-producao, 2.5.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "A OP nasceu do pedido com as etapas do processo e as requisições da estrutura.",
    "s": "v"
   },
   {
    "t": "As baixas e o estorno de material bateram com `Estoque > Movimentos` e o saldo dos insumos.",
    "s": "v"
   },
   {
    "t": "Marcar produzido creditou o produto acabado no almoxarifado com a quantidade e o custo da OP.",
    "s": "v"
   },
   {
    "t": "O cliente sabe que hoje a finalização do apontamento ainda é recusada e como registrar o caso para o suporte.",
    "s": "d"
   }
  ],
  "atencao": [
   "**Segurança do ambiente:** use só ambiente de teste e registros com \"TESTE FLUXO CONSULTOR\"; nota fiscal só é transmitida com o responsável fiscal.",
   "Hoje o sistema ainda recusa a finalização do apontamento (\"A data/hora de fim não pode ser no futuro\"): não ensine a finalização como funcionando; anote o horário e avise o suporte.",
   "No painel da Nova OP, **Esc** fecha e perde o formulário. A **Empresa** é obrigatória, apesar da dica dizer que herda do pedido.",
   "**Marcar produzido**, **Pausar OP**, **Cancelar OP**, **Replicar OP** e **Gerar OS de instalação** gravam dados. **Cancelar OP** com movimentos de estoque os estorna e continua habilitado numa OP Produzida.",
   "Na lista, **Iniciar produção** muda a OP para \"Em execução\" com um clique.",
   "Antes da baixa, o selo de disponibilidade pode descontar duas vezes a reserva da própria OP (ex.: \"2 disponível · falta 6\" com 10 em estoque): confira o saldo em `Estoque > Saldo`.",
   "A **Fila de exceções** tem o botão **Reprocessar**: não reprocesse sem o suporte.",
   "OP de produto sem processo não tem etapas, não aparece no Painel de fábrica e não aceita apontamento no terminal."
  ],
  "naoValidado": [
   "Entrada do produto acabado: o manual-07-producao (2.4) diz que o apontamento finalizado na última etapa dá entrada do acabado e baixa os componentes (movimentos \"OP – Conclusão\" e \"Requisição\"); no teste (Fluxo de produção) o apontamento não finalizou e a entrada veio de **Marcar produzido**, com o movimento \"Entrada de produto acabado (OP)\". Conferir na tela qual caminho o cliente vai usar.",
   "Origem da OP: o manual-07-producao (2.1) diz que normalmente as OPs nascem sozinhas pela Integração de Produção (pedido ou projeto vindo do CEM); o procedimento e o teste mostram a OP criada à mão em **Nova OP** com o pedido. Conferir como o cliente recebe os pedidos.",
   "Submeter, aprovar, rejeitar e reabrir apontamento não foram testados, porque dependem de o apontamento finalizar.",
   "Reimportar da estrutura numa OP com item manual não foi testado."
  ],
  "video": {
   "id": "consultor-05-producao",
   "titulo": "Estrutura, ordem, apontamento e entrada do produto",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-servicos",
  "arquivo": "implantacao-12-servicos.html",
  "etiqueta": "Consultor · Implantação · Serviços",
  "titulo": "Implantação de Serviços: roteiro prático com o cliente",
  "subtitulo": "Junto com o cliente, leve um pedido de venda de teste pelo trabalho de campo: medição agendada, vãos medidos, conclusão e aprovação por outro conferente, instalação, vistoria e assistência técnica.",
  "objetivo": "Ao final, o cliente terá visto um pedido virar medição aprovada, instalação concluída com checklist, vistoria com aceite e assistência técnica resolvida, todas ligadas ao mesmo pedido e cliente. Ele saberá que as passagens são por botão e em que ordem registrar os aceites.",
  "rodape": "Checklist de implantação · Serviços · fontes: Fluxo de serviços de campo e Teste do fluxo completo (passos conferidos em out/2026), procedimento-agendar-medicao-do-pedido, regras de serviços, manual-11-servicos · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Dois usuários: o **técnico** (participante Funcionário) que mede e o **conferente**, vinculado a outro participante em **Conferentes**.",
    "r": "**Confira:** a aba Conferentes das configurações de Serviços. Quem confere não pode ser quem mediu. **Fonte:** Fluxo de serviços de campo (pré-requisitos); regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
    "s": "v",
    "campo": "Técnico / conferente"
   },
   {
    "t": "**Equipe de campo** com o técnico como membro. Para testar pagamento de instalação: equipe **Terceirizada** com fornecedor (equipe interna não gera pagamento).",
    "r": "**Confira:** `Serviços > Configurações > Equipes de Campo`. **Fonte:** Fluxo de serviços de campo (pré-requisitos); manual-11-servicos, 1.1.",
    "s": "v",
    "campo": "Equipe"
   },
   {
    "t": "Parâmetros decididos com o cliente: **Exigir conferência de medição**, **Exigir assinatura do responsável pela obra**, **Geração automática de vistoria** (vem vazia = desligada), garantia e prazos. Template de checklist de instalação e, para a assistência, tipos, origens e motivos.",
    "r": "**Confira:** `Configurações > Config. Serviços`, abas Parâmetros, Instalação, Assistência e Geral. **Fonte:** Fluxo de serviços de campo (pré-requisitos); manual-11-servicos, 1.2.",
    "s": "v"
   },
   {
    "t": "Pedido de venda de teste (\"TESTE FLUXO CONSULTOR\") com itens de esquadria e, se quiser ver o Diário de Obra, com **Projeto (obra)**. Nomes fictícios para o responsável da obra e para o cliente nos aceites.",
    "r": "**Confira:** o pedido em `Vendas > Pedidos de Venda`. **Fonte:** Fluxo de serviços de campo (pré-requisitos).",
    "s": "v",
    "campo": "Nº do pedido (PV-)"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Medição: criar e agendar a partir do pedido",
    "onde": "`Serviços > Medições > + Nova Medição`",
    "intro": "O trabalho de campo começa no pedido vendido. A medição traz cliente, obra e vãos do pedido; a empresa e o técnico são preenchidos aqui.",
    "passos": [
     {
      "t": "**Faça:** em **Nova Medição**, busque o pedido de teste (ajuste o Status e desmarque \"Esconder pedidos que já têm medição\" se precisar) e clique em **Usar este registro**.",
      "r": "**Explique ao cliente:** sem pedido existe a **Medição avulsa**, mas o normal é medir o que foi vendido. **Confira:** **Cliente** e **Projeto** preenchidos. **Fonte:** Fluxo de serviços de campo, bloco 1; regra-servicos-medicao-nasce-do-pedido.",
      "s": "v"
     },
     {
      "t": "**Faça:** no diálogo **Importar Itens do Pedido**, marque os itens, confira o **Nº vãos** de cada um e clique em **Importar**.",
      "r": "**Explique ao cliente:** cada vão é uma abertura da obra que será medida e depois instalada. **Confira:** os vãos agrupados por produto na aba **Vãos**. **Fonte:** Fluxo de serviços de campo, bloco 1; manual-11-servicos, 2.2.",
      "s": "v"
     },
     {
      "t": "**Faça:** na aba **Dados Gerais**, preencha **Empresa** e **Técnico Responsável** e, se quiser, **Equipe de Campo**, **Data de Agendamento** e **Duração Prevista**. Antes de salvar, mostre que só existem os botões Voltar, **Salvar** e Trocar pedido. Clique em **Salvar**.",
      "r": "**Explique ao cliente:** Empresa e Técnico Responsável são obrigatórios e não vêm do pedido. **Confira:** a medição numerada. **Fonte:** Fluxo de serviços de campo, bloco 1; regra-servicos-medicao-nasce-do-pedido; regra-servicos-botao-agendar-so-na-medicao-salva.",
      "s": "v",
      "campo": "Nº da medição (MED-)"
     },
     {
      "t": "**Faça:** na medição salva, clique em **Agendar**.",
      "r": "**Explique ao cliente:** mesmo com a data preenchida, a medição só fica agendada por este botão, que aparece depois de salvar. **Confira:** status \"Agendada\". **Fonte:** Fluxo de serviços de campo, bloco 1; procedimento-agendar-medicao-do-pedido.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "2. Medição: medir os vãos e concluir",
    "onde": "aba `Vãos` da medição e ação `Medir vãos` na lista de medições",
    "intro": "O técnico lança as medidas reais. Com a assinatura exigida, a conclusão tem um caminho certo: mostre o errado primeiro.",
    "passos": [
     {
      "t": "**Faça:** na aba **Vãos**, expanda cada vão e informe **Largura** e **Altura** em mm.",
      "r": "**Explique ao cliente:** a medida real é a que segue para a instalação; com tolerância configurada, divergência grande em relação ao vendido pede reaprovação. **Confira:** o contador de vãos medidos subindo. **Fonte:** Fluxo de serviços de campo, bloco 1; manual-11-servicos, 2.2.",
      "s": "v"
     },
     {
      "t": "**Faça:** com \"Exigir assinatura\" ligado, tente **Finalizar** pela tela de edição da medição.",
      "r": "**Explique ao cliente:** a conclusão com assinatura é feita pela ação Medir vãos. **Confira:** o sistema só mostra erro. **Fonte:** Fluxo de serviços de campo, bloco 1; regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
      "s": "v"
     },
     {
      "t": "**Faça:** na lista, clique em **Medir vãos** > **Iniciar medição** > **Concluir medição**, com o nome e a assinatura do responsável pela obra.",
      "r": "**Explique ao cliente:** a assinatura prova que a obra concordou com as medidas. **Confira:** status \"Aguardando Conferência\". **Fonte:** Fluxo de serviços de campo, bloco 1; Teste do fluxo completo, bloco 3.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "3. Medição: aprovar com outro conferente",
    "onde": "`Serviços > Medições` (medição \"Aguardando Conferência\")",
    "intro": "A conferência é o controle de qualidade da medição. Demonstre a trava antes de aprovar.",
    "passos": [
     {
      "t": "**Faça:** tente aprovar a medição com o mesmo técnico que mediu.",
      "r": "**Explique ao cliente:** quem mede não confere a própria medição. **Confira:** a recusa \"O conferente da medição deve ser diferente do técnico responsável que a realizou\". **Fonte:** Teste do fluxo completo, bloco 3; regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
      "s": "v"
     },
     {
      "t": "**Faça:** entre com o usuário conferente e clique em **Aprovar**.",
      "r": "**Explique ao cliente:** aprovar **não** cria a instalação: a passagem é por botão. **Confira:** status \"Aprovada\" e o botão **Gerar Instalação** no cabeçalho. **Fonte:** Fluxo de serviços de campo, bloco 1; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Serviços > Dashboard Serviços` e role até o Pipeline operacional.",
      "r": "**Explique ao cliente:** o pipeline mostra onde os serviços estão parados; estágios em âmbar são gargalos. **Confira:** a medição de teste em \"Aprovadas sem instalação\". **Fonte:** manual-11-servicos, 2.1.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Instalação",
    "onde": "botão `Gerar Instalação` da medição e `Serviços > Instalações`",
    "intro": "A instalação nasce da medição aprovada e leva os vãos medidos como checklist.",
    "passos": [
     {
      "t": "**Faça:** abra `Serviços > Instalações > + Nova Instalação` e mostre a aba **Medição**, sem gerar nada.",
      "r": "**Explique ao cliente:** a instalação pode nascer de Pedido de Venda, Ordem de Produção ou Medição; a aba Medição lista as aprovadas que ainda não têm instalação. **Confira:** a medição de teste na lista. **Fonte:** manual-11-servicos, 2.3.",
      "s": "d"
     },
     {
      "t": "**Faça:** na medição aprovada, clique em **Gerar Instalação**, escolha a equipe, informe a data e salve.",
      "r": "**Explique ao cliente:** o tipo da equipe define se a execução é própria ou terceirizada; o checklist é o template mais os vãos medidos. **Confira:** a instalação \"Agendada\" na lista (a tela de edição só atualiza ao recarregar). **Fonte:** Fluxo de serviços de campo, bloco 2; manual-11-servicos, 2.3.",
      "s": "v",
      "campo": "Nº da instalação (INS-)"
     },
     {
      "t": "**Faça:** clique em **Executar** > **Iniciar instalação**, marque os itens como **Conforme** e clique em **Concluir**.",
      "r": "**Explique ao cliente:** itens obrigatórios precisam estar conformes; a instalação não pede aceite do cliente. **Confira:** status \"Concluída\" com o checklist (Conferidos e Conformes). **Fonte:** Fluxo de serviços de campo, bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** confira o pagamento do instalador e o botão **Ver Vistoria** na instalação concluída.",
      "r": "**Explique ao cliente:** equipe interna não gera pagamento; a vistoria só nasce sozinha se a Geração automática de vistoria estiver preenchida. **Confira:** \"Equipe interna: a instalação não gera pagamento\" e, com a geração ligada, o botão Ver Vistoria. **Fonte:** Fluxo de serviços de campo, bloco 2; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "5. Vistoria",
    "onde": "`Ver Vistoria` na instalação ou `Serviços > Vistorias > + Nova Vistoria`",
    "intro": "A vistoria confere a obra entregue. Na vistoria, o aceite do cliente vem **depois** de concluir.",
    "passos": [
     {
      "t": "**Faça:** abra a vistoria por **Ver Vistoria** ou, com a geração automática desligada, por **+ Nova Vistoria**, escolhendo a instalação concluída.",
      "r": "**Explique ao cliente:** também existe vistoria avulsa, sem instalação. **Confira:** a vistoria ligada à instalação de teste. **Fonte:** manual-11-servicos, 2.4; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "d",
      "campo": "Nº da vistoria (VIST-)"
     },
     {
      "t": "**Faça:** informe o vistoriador, salve, clique em **Iniciar** e registre itens, uma ressalva e uma pendência.",
      "r": "**Explique ao cliente:** ressalvas e pendências seguem para a assistência técnica. **Confira:** a vistoria em execução com os itens registrados. **Fonte:** Fluxo de serviços de campo, bloco 3.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente **Registrar Aceite** do cliente antes de concluir a vistoria.",
      "r": "**Explique ao cliente:** o cliente aceita uma vistoria terminada. **Confira:** o sistema recusa o aceite. **Fonte:** Fluxo de serviços de campo, bloco 3; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "v"
     },
     {
      "t": "**Faça:** conclua a vistoria como **Aprovada c/ Ressalvas**.",
      "r": "**Explique ao cliente:** as opções são Aprovada, Aprovada c/ Ressalvas e Reprovada; as duas últimas abrem caminho para a assistência. **Confira:** o resultado gravado e o botão **Gerar Assistência Técnica**. **Fonte:** Fluxo de serviços de campo, bloco 3; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "v"
     },
     {
      "t": "**Faça:** agora clique em **Registrar Aceite** com o nome fictício do cliente.",
      "r": "**Explique ao cliente:** o aceite fecha a entrega da obra. **Confira:** \"Aceite Registrado\" (o horário pode aparecer em UTC). **Fonte:** Fluxo de serviços de campo, bloco 3.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "6. Assistência técnica",
    "onde": "botão `Gerar Assistência Técnica` da vistoria",
    "intro": "A assistência trata o que ficou pendente. Ela não nasce sozinha, e aqui o aceite vem **antes** de resolver.",
    "passos": [
     {
      "t": "**Faça:** clique em **Gerar Assistência Técnica**, complete **Tipo**, **Origem**, **Motivo** e Cidade/UF e clique em **Salvar**.",
      "r": "**Explique ao cliente:** a descrição já traz as ressalvas e pendências da vistoria. **Confira:** a AT numerada; hoje os campos Instalação e Vistoria vinculadas podem vir vazios e a garantia ser calculada como \"sem instalação\". **Fonte:** Fluxo de serviços de campo, bloco 4; manual-11-servicos, 2.5.",
      "s": "v",
      "campo": "Nº da AT (AT-)"
     },
     {
      "t": "**Faça:** na aba **Agendamento**, clique em **Agendar Atendimento** e depois em **Iniciar Atendimento**; registre um defeito e uma peça.",
      "r": "**Explique ao cliente:** defeitos e peças formam o histórico de qualidade do produto. **Confira:** a AT em atendimento com o defeito e a peça registrados. **Fonte:** Fluxo de serviços de campo, bloco 4.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Aguardar Peça**, depois em **Retomar**, marque a peça como \"Instalada\" e preencha **Solução + Custos**.",
      "r": "**Explique ao cliente:** aguardar peça pausa o prazo do atendimento. **Confira:** o prazo pausado e retomado e a solução com custos gravada. **Fonte:** Fluxo de serviços de campo, bloco 4.",
      "s": "v"
     },
     {
      "t": "**Faça:** registre o aceite do cliente e só então clique em **Resolver**.",
      "r": "**Explique ao cliente:** na assistência a ordem é inversa à da vistoria: aceite antes de resolver. Peça ainda Solicitada ou Em compra exige motivo e é cancelada. **Confira:** status \"Resolvida\". **Fonte:** Fluxo de serviços de campo, bloco 4; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "v"
     }
    ]
   },
   {
    "titulo": "7. Gestão de campo",
    "onde": "`Serviços > Cockpit de Campo`, `Serviços > Dashboard Serviços` e `Serviços > Minha Equipe Agora`",
    "intro": "Feche mostrando ao gestor onde ele acompanha as equipes e o resultado dos serviços.",
    "passos": [
     {
      "t": "**Faça:** abra o **Cockpit de Campo** e localize os serviços de teste na linha da equipe.",
      "r": "**Explique ao cliente:** o cockpit usa a capacidade diária da equipe para não sobrecarregar a agenda. **Confira:** os serviços na equipe; hoje os horários podem aparecer 3 h adiantados (UTC) e a AT pode ficar em \"SEM EQUIPE\". **Fonte:** Fluxo de serviços de campo, bloco 5; manual-11-servicos, 1.1.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra o **Dashboard Serviços**.",
      "r": "**Explique ao cliente:** é o resumo diário da operação de campo. **Confira:** Concluídos, m² instalados, pipeline e estatísticas refletindo o teste. **Fonte:** Fluxo de serviços de campo, bloco 5.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra **Minha Equipe Agora**.",
      "r": "**Explique ao cliente:** a tela lista só usuários do sistema; técnico externo não aparece. **Confira:** os usuários da equipe. **Fonte:** Fluxo de serviços de campo, bloco 5.",
      "s": "v"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Medição, instalação, vistoria e assistência técnica estão ligadas ao mesmo pedido e cliente de teste.",
    "s": "v"
   },
   {
    "t": "A medição foi aprovada por um conferente diferente de quem mediu, e a trava foi demonstrada.",
    "s": "v"
   },
   {
    "t": "Os aceites foram registrados na ordem certa: depois de concluir a vistoria e antes de resolver a assistência.",
    "s": "v"
   },
   {
    "t": "O Dashboard Serviços refletiu as conclusões (quantidade e m²).",
    "s": "v"
   }
  ],
  "atencao": [
   "**Segurança do ambiente:** use só ambiente de teste, registros com \"TESTE FLUXO CONSULTOR\" e nomes fictícios nas assinaturas e aceites; nota fiscal só é transmitida com o responsável fiscal.",
   "Três passagens são **por botão**: Gerar Instalação, Gerar Assistência Técnica e, opcional, Gerar OS de instalação a partir da OP. Só a vistoria pode nascer sozinha, com a Geração automática de vistoria preenchida.",
   "Só se instala vão realmente medido: com todos os vãos cancelados, o sistema avisa que não há vão medido para instalar.",
   "Hoje datas e horas aparecem em UTC em vários pontos (vistoria, aceite, cockpit): confira o horário antes de concluir que há atraso.",
   "O template de checklist entra em **toda** instalação nova da empresa: desative o de teste no fim.",
   "Mensagens (toasts) podem cobrir os botões do cabeçalho: feche-as antes de clicar.",
   "No cadastro do técnico, o CEP preenche o endereço, mas hoje o formulário só aceita depois de redigitar o Endereço."
  ],
  "naoValidado": [
   "Concluir a medição: o manual-11-servicos (2.2) diz para lançar os vãos e clicar em **Salvar**, e então a medição vai para aguardando conferência; o teste (Fluxo de serviços de campo) e a regra de conferência dizem que, com \"Exigir assinatura\", o caminho é **Medir vãos** > **Iniciar medição** > **Concluir medição** e que o Finalizar da edição dá erro. Conferir com os parâmetros do cliente.",
   "Aceite da assistência técnica: o plano de validação de Serviços pede o aceite na AT resolvida; no teste o aceite precisou vir antes de **Resolver**. Conferir na tela antes de ensinar.",
   "Caminho dos conferentes: o Fluxo de serviços de campo cita `Serviços > Configurações > Conferentes`; o manual-11-servicos cita `Configurações > Config. Serviços`, aba **Conferentes**. Conferir o menu na versão do cliente.",
   "Pagamento de instalação com equipe terceirizada, aplicativo de campo `/campo` e Diário de Obra com projeto não foram testados."
  ],
  "video": {
   "id": "consultor-02-servicos",
   "titulo": "Da medição à assistência técnica",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-expedicao",
  "arquivo": "implantacao-13-expedicao.html",
  "etiqueta": "Consultor · Implantação · Expedição",
  "titulo": "Implantação de Expedição: roteiro prático com o cliente",
  "subtitulo": "Executar com o cliente o caminho do pedido faturado até a entrega: liberar o pedido, montar e fechar a carga, separar, conferir e carregar, iniciar a rota e confirmar a entrega. Depois, tratar o que dá errado: ocorrência, devolução e re-expedição.",
  "objetivo": "Ao final, o cliente terá visto um pedido faturado virar carga, passar pelos checkpoints do pátio e chegar a Entregue com histórico, e saberá repetir sozinho. Também terá visto o que acontece numa ocorrência bloqueante e numa devolução, e por que o saldo do estoque não volta sozinho.",
  "rodape": "Checklist de implantação · Expedição · fontes: fluxo antigo \"Fluxo de expedição\", bloco 6 do \"Teste do fluxo completo\", procedimento-montar-carga-e-liberar-para-expedicao, regra-vendas-liberar-para-expedicao-so-em-pedido-faturado, manual-09-expedicao · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Um pedido de venda de teste **Faturado**, com nota finalizada e sem transmitir (marcado \"TESTE FLUXO CONSULTOR\").",
    "r": "**Confira:** em `Vendas > Pedidos de Venda`, o status **Faturado**. A tela de montagem só lista pedidos liberados, e a liberação só existe em pedido faturado. **Fonte:** fluxo antigo \"Fluxo de expedição\" (pré-requisito); regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.",
    "s": "v"
   },
   {
    "t": "Frota cadastrada: pelo menos um **veículo** com capacidade de peso e volume e um **motorista** com CNH válida.",
    "r": "**Confira:** em `Expedição > Configurações > Veículos` e `Motoristas`. CNH vencida exige justificativa para fechar a carga. **Fonte:** fluxo antigo \"Fluxo de expedição\" (pré-requisito); manual-09-expedicao#003 e #004.",
    "s": "v"
   },
   {
    "t": "Endereço de entrega no cadastro do cliente e peso no cadastro do produto.",
    "r": "**Confira:** o endereço aparece no resumo da carga; o peso alimenta a ocupação do veículo. **Fonte:** fluxo antigo \"Fluxo de expedição\" (pré-requisito); manual-09-expedicao#002.",
    "s": "d"
   },
   {
    "t": "Checkpoints da empresa definidos: quais etapas (Separação, Conferência, Carregamento) o cliente vai usar.",
    "r": "**Confira:** em `Expedição > Configurações > Parâmetros`. **Fonte:** manual-09-expedicao#005.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Cadastros da expedição",
    "onde": "`Expedição > Configurações`",
    "intro": "Antes da primeira carga, mostre ao cliente o que a montagem usa: veículo, motorista, checkpoints e tipos de ocorrência. Sem isso a carga não fecha ou a ocupação não aparece.",
    "passos": [
     {
      "t": "**Faça:** abra `Veículos`, clique em **+ Novo Veículo** e cadastre um veículo de teste com **Placa**, **Modelo**, **Tipo de veículo**, capacidade de peso em kg e de volume em m³. Salve.",
      "r": "**Explique ao cliente:** a capacidade é usada na montagem para mostrar a ocupação do veículo; peso e volume são obrigatórios. **Confira:** o veículo aparece na lista com placa e capacidades. **Fonte:** manual-09-expedicao#003.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Motoristas` e confira, em um motorista de teste, CNH, categoria e validade. Se não houver, use **+ Novo Motorista**.",
      "r": "**Explique ao cliente:** o sistema alerta quando a CNH vence, e a carga com motorista de CNH vencida só fecha com justificativa. O motorista registra as entregas pelo app **Minhas Entregas**. **Confira:** a validade da CNH do motorista que será usado. **Fonte:** manual-09-expedicao#004; fluxo antigo \"Fluxo de expedição\".",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Parâmetros` e mostre quais checkpoints estão ligados.",
      "r": "**Explique ao cliente:** ligue só as etapas que a empresa usa. A ordem é Carga fechada → Separação → Conferência → Carregamento → Saída para entrega. **Confira:** as etapas ligadas batem com a operação do pátio do cliente. **Fonte:** manual-09-expedicao#005.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Tipos de Ocorrência` e leia com o cliente os tipos cadastrados.",
      "r": "**Explique ao cliente:** são os motivos que o motorista vai registrar quando a entrega não acontece como previsto (cliente ausente, avaria, recusa). **Confira:** os tipos existem antes da primeira rota. **Fonte:** manual-09-expedicao#002 e #010.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Liberar o pedido faturado",
    "onde": "`Vendas > Pedidos de Venda`, menu `⋯` do pedido",
    "intro": "A expedição começa no pedido. Mostre primeiro que a liberação não existe antes de faturar e depois libere o pedido de teste.",
    "passos": [
     {
      "t": "**Faça:** abra o menu `⋯` de um pedido **Em aberto** e procure **Liberar para Expedição**.",
      "r": "**Explique ao cliente:** a ordem é faturar e depois liberar. O aviso da tela Montar Nova Carga manda clicar nesse botão, mas ele só existe em pedido Faturado. **Confira:** o item não aparece no pedido Em aberto. **Fonte:** regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.",
      "s": "d"
     },
     {
      "t": "**Faça:** no pedido de teste **Faturado**, abra o menu `⋯` e clique em **Liberar para Expedição**.",
      "r": "**Explique ao cliente:** liberar coloca o pedido na fila da expedição. **Confira:** a mensagem \"Pedido liberado para expedição\" e o status **Lib. Expedição**. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 1; \"Teste do fluxo completo\", bloco 6; manual-09-expedicao#007.",
      "s": "v",
      "campo": "Nº do pedido"
     },
     {
      "t": "**Faça:** abra de novo o menu `⋯` do mesmo pedido.",
      "r": "**Explique ao cliente:** enquanto não entra numa carga, a liberação pode ser desfeita. **Confira:** o item virou **Reverter Liberação**. **Fonte:** regra-vendas-liberar-para-expedicao-so-em-pedido-faturado; procedimento-montar-carga-e-liberar-para-expedicao.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Montar a carga",
    "onde": "`Expedição > Visão Geral > + Montar Nova Carga`",
    "intro": "Com o pedido na fila, monte a carga escolhendo o veículo pela ocupação. É aqui que o cliente vê peso e volume contra a capacidade.",
    "passos": [
     {
      "t": "**Faça:** abra `Expedição > Visão Geral` e mostre as abas **Operacional**, **Indicadores** e **Rastreamento** e os cartões do ciclo da carga.",
      "r": "**Explique ao cliente:** toda carga passa por Em montagem → Fechada → Em rota → Entregue. **Confira:** os cartões com as cargas em cada fase. **Fonte:** manual-09-expedicao#006.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **+ Montar Nova Carga** e tente montar marcando o pedido, mas sem informar **Data prevista de saída** nem **Motorista**.",
      "r": "**Explique ao cliente:** data de saída e motorista são obrigatórios para a carga existir. **Confira:** o sistema não monta a carga sem os dois. **Fonte:** procedimento-montar-carga-e-liberar-para-expedicao.",
      "s": "d"
     },
     {
      "t": "**Faça:** marque o pedido em **Pedidos disponíveis**, escolha o **Veículo**, informe a **Data prevista de saída** e o **Motorista** e clique em **Montar Carga**.",
      "r": "**Explique ao cliente:** os filtros por cidade, raio e CEP ajudam a juntar entregas da mesma região. **Confira:** o resumo mostra peso e volume contra a capacidade do veículo; a carga nasce **Em Montagem**. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 1; \"Teste do fluxo completo\", bloco 6; procedimento-montar-carga-e-liberar-para-expedicao.",
      "s": "v",
      "campo": "Nº da carga"
     },
     {
      "t": "**Faça:** se aparecer aviso de produção pendente no pedido, leia o aviso com o cliente antes de seguir.",
      "r": "**Explique ao cliente:** o aviso indica item fabricado sem OP concluída; a montagem pode ser autorizada com justificativa, que fica registrada com o usuário. **Confira:** se a OP do item foi mesmo concluída em `Produção`. **Fonte:** manual-09-expedicao#008; fluxo antigo \"Fluxo de expedição\" (ver `naoValidado`).",
      "s": "d"
     },
     {
      "t": "**Faça:** na tela da carga, abra o **Romaneio** e as **Etiquetas** dos volumes (só a prévia).",
      "r": "**Explique ao cliente:** o romaneio acompanha a carga e as etiquetas identificam cada volume para a bipagem. **Confira:** romaneio com cliente, endereço, pedido, nota e volumes; uma etiqueta por volume. **Fonte:** manual-09-expedicao#008; fluxo antigo \"Fluxo de expedição\", bloco 5.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Fechar a carga e fazer os checkpoints",
    "onde": "detalhe da carga",
    "intro": "Fechar a carga libera os checkpoints do pátio. O cliente executa a bipagem com o consultor, volume a volume.",
    "passos": [
     {
      "t": "**Faça:** clique em **Fechar Carga**. Se o motorista estiver com CNH vencida, informe a justificativa.",
      "r": "**Explique ao cliente:** depois de fechada, a carga não recebe novos pedidos sem reabrir. **Confira:** status **Fechada**; a justificativa fica nas observações; aparecem os checkpoints e o link de rastreamento. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 1; \"Teste do fluxo completo\", bloco 6; manual-09-expedicao#009.",
      "s": "v"
     },
     {
      "t": "**Faça:** clique em **Apontar Separação** e bipe a etiqueta de cada volume (ou confirme o volume na tela).",
      "r": "**Explique ao cliente:** a separação registra a saída do volume do estoque. **Confira:** o contador mostra o progresso dos volumes. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 2; manual-09-expedicao#009.",
      "s": "v"
     },
     {
      "t": "**Faça:** repita em **Apontar Conferência** e **Apontar Carregamento**.",
      "r": "**Explique ao cliente:** a conferência valida o romaneio e o carregamento confirma cada volume no veículo. **Confira:** a mensagem \"Todos os checkpoints concluídos! Carga pronta para sair\". **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 2; \"Teste do fluxo completo\", bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** mostre o botão **Reabrir** sem clicar.",
      "r": "**Explique ao cliente:** reabrir volta a carga para ajustes antes da saída. **Confira:** o botão está disponível enquanto a carga não saiu. **Fonte:** manual-09-expedicao#009.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Rota e entrega",
    "onde": "detalhe da carga e `Apontamentos do Motorista`",
    "intro": "A saída trava os checkpoints e a entrega fecha o ciclo. Termine conferindo o reflexo no pedido de Vendas.",
    "passos": [
     {
      "t": "**Faça:** clique em **Iniciar Rota** e confirme a saída do veículo.",
      "r": "**Explique ao cliente:** a partir daqui o pátio não mexe mais na carga. **Confira:** carga **Em Rota** e checkpoints travados. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 2; \"Teste do fluxo completo\", bloco 6.",
      "s": "v"
     },
     {
      "t": "**Faça:** em \"Apontamentos do Motorista\", clique em **Entregue**, informe o nome de quem recebeu e o motivo da confirmação sem comprovante.",
      "r": "**Explique ao cliente:** o normal é o motorista confirmar pelo app, com foto e assinatura; pelo painel do ERP o sistema pede o motivo. **Confira:** carga e pedido **Entregue**. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 2; \"Teste do fluxo completo\", bloco 6; manual-09-expedicao#010.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra o **Histórico da Carga**.",
      "r": "**Explique ao cliente:** cada passo fica registrado com autor e horário, para auditoria da entrega. **Confira:** liberação, montagem, fechamento, checkpoints, rota e entrega no histórico. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Vendas > Demonstrativos > Carteira de Pedidos` e procure o pedido de teste.",
      "r": "**Explique ao cliente:** Vendas acompanha a entrega sem abrir a Expedição. **Confira:** o pedido passou por A expedir → Em carga → Expedido → Entregue, com o número da carga. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 2.",
      "s": "v"
     },
     {
      "t": "**Faça:** abra `Expedição > Visão Geral`, aba **Indicadores**, e escolha o período do teste.",
      "r": "**Explique ao cliente:** entregas no prazo, taxa de ocorrências, ocupação média dos veículos e entregas por motorista; a análise completa fica em Demonstrativos. **Confira:** a entrega de teste entrou no total. **Fonte:** manual-09-expedicao#011.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Ocorrência na rota",
    "onde": "`Apontamentos do Motorista > Ocorrência` e `Expedição > Ocorrências`",
    "intro": "Use uma segunda carga de teste, já em rota, para mostrar o que acontece quando a entrega não sai como previsto.",
    "passos": [
     {
      "t": "**Faça:** registre uma ocorrência de **Cliente Ausente**.",
      "r": "**Explique ao cliente:** esse tipo não exige foto. **Confira:** a ocorrência é aceita e fica no histórico da entrega. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente registrar **Mercadoria Avariada** sem foto; depois registre com foto.",
      "r": "**Explique ao cliente:** avaria exige prova. **Confira:** sem foto o sistema recusa (\"foto obrigatória\"); com foto aceita e a foto abre no ERP. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** registre uma ocorrência **bloqueante** e, em outra entrega, uma **Entrega Parcial** (não bloqueante).",
      "r": "**Explique ao cliente:** a bloqueante tira a entrega do caminho e devolve o pedido à fila; a parcial não. **Confira:** a bloqueante aparece em `Expedição > Aguardando Re-Expedição`; a parcial não. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** filtre `Expedição > Ocorrências` por tipo e período.",
      "r": "**Explique ao cliente:** é a lista que o gestor usa para cobrar a operação. **Confira:** os números do resumo por tipo batem com a lista. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 3.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. Devolução e re-expedição",
    "onde": "`Expedição > Aguardando Re-Expedição` e `Expedição > Pendências de Estoque (Devolução)`",
    "intro": "Feche o roteiro mostrando a devolução e a passagem para o Estoque, que não é automática.",
    "passos": [
     {
      "t": "**Faça:** na entrega com ocorrência bloqueante, use **Confirmar devolução**. Depois clique de novo.",
      "r": "**Explique ao cliente:** a devolução muda a situação da entrega uma única vez. **Confira:** a entrega passa a **Devolvida**; confirmar de novo não duplica pendência nem estorno. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Pendências de Estoque (Devolução)` e, em seguida, o saldo do produto em `Estoque > Saldo`.",
      "r": "**Explique ao cliente:** a devolução **não** devolve o saldo sozinha; alguém do estoque decide a entrada. **Confira:** existe uma pendência por produto devolvido e o saldo não subiu. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** dê a entrada manual pelo Estoque e marque a pendência como resolvida. Tente resolver de novo.",
      "r": "**Explique ao cliente:** a pendência registra quem resolveu e quando. **Confira:** ela sai da lista de pendentes; resolver duas vezes é recusado. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** monte uma nova carga com o pedido que voltou para re-expedição.",
      "r": "**Explique ao cliente:** os volumes da entrega anterior saem de circulação. **Confira:** o saldo por item não dobra na nova carga. **Fonte:** fluxo antigo \"Fluxo de expedição\", bloco 4.",
      "s": "d",
      "campo": "Nº da nova carga"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O pedido faturado foi liberado, entrou numa carga, passou pelos checkpoints e chegou a **Entregue**, com todo o caminho no Histórico da Carga.",
    "s": "v"
   },
   {
    "t": "A Carteira de Pedidos de Vendas mostra o pedido entregue com o número da carga.",
    "s": "v"
   },
   {
    "t": "Uma ocorrência bloqueante devolveu o pedido à fila de re-expedição e a devolução gerou pendência de estoque sem mexer no saldo.",
    "s": "d"
   },
   {
    "t": "O cliente montou e fechou uma carga sozinho, escolhendo o veículo pela ocupação.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste, com registros \"TESTE FLUXO CONSULTOR\". A nota fiscal do pedido só é transmitida com o responsável fiscal.",
   "**Liberar para Expedição** só aparece no pedido **Faturado**, e o aviso da tela de montagem não diz isso: fature antes.",
   "Montar, fechar, **Iniciar Rota**, **Entregue** e cancelar carga alteram a operação. O link de rastreamento e os avisos podem chegar ao cliente final: use e-mail de teste e revogue o link.",
   "Hoje a carga ainda pode avisar \"item sem ordem de produção vinculada\" mesmo com a OP existente: confira a OP antes de carregar.",
   "A devolução **não** devolve o saldo ao estoque sozinha: depende da entrada manual e da baixa da pendência.",
   "**Gerar Títulos** do pedido fica desabilitado em Faturado e Lib. Expedição (\"Pedido já faturado\") e volta depois de Entregue: combine com o Financeiro quando gerar.",
   "Motorista com CNH vencida trava o fechamento sem justificativa: confira a validade antes do dia da implantação."
  ],
  "naoValidado": [
   "Caminho dos cadastros: o fluxo antigo cita `Expedição > Cadastros`; o manual-09-expedicao usa `Expedição > Configurações` (Veículos, Motoristas, Parâmetros, Tipos de Ocorrência). O menu lateral tem os dois itens: conferir na tela onde fica cada cadastro.",
   "Caminho da montagem: o fluxo antigo e o procedimento citam `Expedição > Montar Nova Carga`; o manual-09-expedicao usa `Expedição > Visão Geral > + Montar Nova Carga`.",
   "Produção pendente: o manual-09-expedicao descreve a opção **Autorizar montagem apesar do bloqueio de produção** com justificativa; o fluxo antigo e o \"Teste do fluxo completo\" registram o aviso \"item sem ordem de produção vinculada\" mesmo com OP (defeito). Conferir na tela qual aviso aparece e se a autorização existe.",
   "Mensagem dos checkpoints: o fluxo antigo registra \"Todos os checkpoints concluídos! Carga pronta para sair\"; o manual-09-expedicao cita só \"Todos os checkpoints concluídos\".",
   "Ocorrências, devolução, re-expedição, pendências de estoque e o app do motorista ainda não foram executados no sistema: os blocos 6 e 7 vêm do plano de QA de Expedição pelo fluxo antigo."
  ],
  "video": {
   "id": "consultor-06-expedicao",
   "titulo": "Da carga à entrega",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-projetos",
  "arquivo": "implantacao-14-projetos.html",
  "etiqueta": "Consultor · Implantação · Projetos",
  "titulo": "Implantação de Projetos: roteiro prático com o cliente",
  "subtitulo": "Executar com o cliente o ciclo da obra: cadastrar a obra, ligar a ela o pedido, a medição, a OP, a nota e os títulos, organizar estágios e etapas e conferir os painéis da obra (previsto × realizado).",
  "objetivo": "Ao final, o cliente terá visto uma obra de teste receber os documentos dos outros módulos e os painéis mostrarem números coerentes com eles. Saberá cadastrar uma obra, ligar o pedido antes de faturar e ler o Painel Financeiro de Projetos.",
  "rodape": "Checklist de implantação · Projetos · fontes: fluxo antigo \"Fluxo de projetos e obras\", procedimento-cadastrar-cliente-produto-e-obra, regra-vendas-editar-pedido-somente-em-aberto, regra-faturamento-finalizar-nf-requisitos, faq-limitacoes-conhecidas-v1-22-12, manual-12-projetos-e-tarefas · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Um cliente de teste cadastrado em `Cadastros > Participantes`, com **É Cliente?** ligado.",
    "r": "**Confira:** o participante aparece no seletor **Cliente** do Novo Projeto. **Fonte:** procedimento-cadastrar-cliente-produto-e-obra.",
    "s": "d"
   },
   {
    "t": "Um **local de estoque do projeto** ativo em `Estoque > Locais`, ou o almoxarifado central ativo, para finalizar a nota com a obra.",
    "r": "**Confira:** o local ativo e da mesma empresa das ordens de produção. A nota com projeto movimenta só o local do projeto. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\" (pré-requisito); regra-estoque-almoxarifado-central-ativo-e-pre-requisito; manual-12-projetos-e-tarefas#002.",
    "s": "v"
   },
   {
    "t": "Produto de teste, condição de pagamento e permissão para criar projetos, estágios e etapas.",
    "r": "**Confira:** o consultor consegue abrir **+ Novo Projeto** e os botões **Estágios** e **Etapas** da lista. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\" (pré-requisito).",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Cadastrar a obra",
    "onde": "`Cadastros > Projetos > Novo Projeto`",
    "intro": "A obra vem antes de qualquer documento: é o guarda-chuva que vai receber pedido, produção, medição, nota e títulos.",
    "passos": [
     {
      "t": "**Faça:** clique em **Novo Projeto** e preencha **Nome do Projeto**, **Código**, **Status**, **Cliente** e **Responsável** de uma obra \"TESTE FLUXO CONSULTOR\". Clique em **Salvar**.",
      "r": "**Explique ao cliente:** Nome do Projeto e Código são obrigatórios; um padrão comum é usar o número do orçamento como código. **Confira:** a mensagem \"Registro salvo com sucesso!\" e a obra na lista com código, cliente e status. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 1; procedimento-cadastrar-cliente-produto-e-obra; manual-12-projetos-e-tarefas#002.",
      "s": "v",
      "campo": "Código da obra"
     },
     {
      "t": "**Faça:** tente salvar outra obra com o mesmo **Código**.",
      "r": "**Explique ao cliente:** o código identifica a obra em todos os seletores, por isso não se repete. **Confira:** o sistema recusa o código repetido. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 1; procedimento-cadastrar-cliente-produto-e-obra.",
      "s": "v"
     },
     {
      "t": "**Faça:** tente salvar uma obra sem nome e outra com a data de fim anterior à de início.",
      "r": "**Explique ao cliente:** o sistema protege o cadastro antes de a obra receber documentos. **Confira:** os dois casos são recusados sem perder o que foi digitado. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** edite a obra pelo lápis e preencha **Datas e Orçamento** (início, fim previsto e valor orçado), **Endereços do Projeto** e **Resultados Previstos**. Salve e reabra.",
      "r": "**Explique ao cliente:** o endereço da obra é usado na medição e na instalação; o orçamento e o resultado previsto são a base do previsto × realizado. **Confira:** os valores voltam iguais ao reabrir. **Fonte:** manual-12-projetos-e-tarefas#002; fluxo antigo \"Fluxo de projetos e obras\", bloco 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Projetos > Todos os Projetos` e filtre pelo status da obra de teste.",
      "r": "**Explique ao cliente:** é a visão em cartões da carteira de obras; **Ver Painel** abre o painel financeiro da obra. **Confira:** os indicadores do topo (Ativos, Em andamento, Concluídos, Planejamento) batem com a contagem filtrada. **Fonte:** manual-12-projetos-e-tarefas#005; fluxo antigo \"Fluxo de projetos e obras\", bloco 1.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Estágios e etapas",
    "onde": "botões `Estágios` e `Etapas` na linha da obra",
    "intro": "Estágios são as fases macro; etapas são os passos acompanhados. Eles servem de filtro nos documentos de compra e produção da obra.",
    "passos": [
     {
      "t": "**Faça:** clique em **Estágios** e crie três estágios de teste com peso (ex.: 20, 30 e 50). Reordene.",
      "r": "**Explique ao cliente:** o estágio organiza a obra em fases. **Confira:** a nova ordem persiste ao reabrir. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 2; manual-12-projetos-e-tarefas#003.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **Etapas**, escolha o **Estágio**, digite a descrição (ex.: \"Medição dos vãos\", \"Produção das esquadrias\", \"Instalação\") e clique em **+**. Reordene pela alça ⋮⋮.",
      "r": "**Explique ao cliente:** cada etapa pode pertencer a um estágio; a etiqueta **Ativa** indica que está em uso. **Confira:** as etapas na ordem escolhida. **Fonte:** manual-12-projetos-e-tarefas#003; fluxo antigo \"Fluxo de projetos e obras\", bloco 2.",
      "s": "d"
     },
     {
      "t": "**Faça:** marque um estágio como feito e depois reabra-o.",
      "r": "**Explique ao cliente:** a conclusão do estágio registra a data automaticamente. **Confira:** a data de conclusão aparece ao marcar e some ao reabrir. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 2.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Ligar o pedido e a medição à obra",
    "onde": "`Vendas > Pedidos de Venda` e `Serviços > Medições > + Nova Medição`",
    "intro": "O pedido é o primeiro documento ligado à obra e precisa receber o projeto antes de faturar. A medição herda a obra do pedido.",
    "passos": [
     {
      "t": "**Faça:** crie um pedido de venda de teste e escolha a obra no campo **Projeto (opcional)**. Salve.",
      "r": "**Explique ao cliente:** o pedido com projeto leva a obra para a medição, a produção, a nota e os títulos. **Confira:** a coluna PROJETO da lista de pedidos mostra a obra. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 3; funcional-cadastros-participante-produto-e-projeto.",
      "s": "v",
      "campo": "Nº do pedido"
     },
     {
      "t": "**Faça:** abra **+ Nova Medição** e escolha o pedido de teste.",
      "r": "**Explique ao cliente:** a medição nasce do pedido e traz a obra dele. **Confira:** a Nova Medição mostra a obra do pedido (\"Sem obra vinculada\" quando o pedido não tem projeto). **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 3.",
      "s": "v",
      "campo": "Nº da medição"
     },
     {
      "t": "**Faça:** abra um pedido já **Faturado** da base de teste e procure como editar o projeto.",
      "r": "**Explique ao cliente:** só o pedido Em aberto tem o lápis (Editar pedido); o Faturado só tem Visualizar. Projeto, itens e parcelas se ajustam antes de faturar. **Confira:** não há edição no pedido faturado. **Fonte:** regra-vendas-editar-pedido-somente-em-aberto.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Produção e compras da obra",
    "onde": "`Produção > Ordens de produção > Nova OP` e `Compras > Solicitações de Compra`",
    "intro": "Mostre que produção e compras também carregam a obra, com o filtro de estágio e etapa, para o custo chegar ao painel.",
    "passos": [
     {
      "t": "**Faça:** crie uma OP de teste escolhendo a obra e, em cascata, o estágio e a etapa.",
      "r": "**Explique ao cliente:** o estágio só habilita depois da obra e a etapa só depois do estágio; trocar a obra limpa os dois. **Confira:** a OP aparece na aba Produção da obra. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", blocos 2 e 3.",
      "s": "d",
      "campo": "Nº da OP"
     },
     {
      "t": "**Faça:** crie uma solicitação de compra de teste com a mesma obra, estágio e etapa.",
      "r": "**Explique ao cliente:** a compra para a obra entra no custo comprometido dela. **Confira:** a solicitação aparece na aba Compras da obra e na lista filtrada por Projeto. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", blocos 2 e 3.",
      "s": "d",
      "campo": "Nº da solicitação"
     },
     {
      "t": "**Faça:** volte a **Estágios** e tente excluir o estágio usado na OP e na solicitação.",
      "r": "**Explique ao cliente:** estágio ou etapa com documento vinculado não pode sumir. **Confira:** o sistema recusa listando o que trava. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 2.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Nota e títulos da obra",
    "onde": "menu `⋯ > Faturar` do pedido e `Financeiro > Contas a Receber`",
    "intro": "A nota com projeto movimenta o estoque da obra. É aqui que aparece o pré-requisito do local de estoque do projeto.",
    "passos": [
     {
      "t": "**Faça:** fature o pedido da obra e clique em **Finalizar NF** (sem transmitir).",
      "r": "**Explique ao cliente:** a nota com projeto movimenta só o local de estoque do projeto, e cada projeto tem um único local, da mesma empresa das OPs. **Confira:** sem local ativo aparece \"O projeto … não tem local de estoque ativo\"; com o local, a nota fica **Finalizada**. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 3; regra-faturamento-finalizar-nf-requisitos; manual-12-projetos-e-tarefas#002.",
      "s": "v",
      "campo": "Nº da nota"
     },
     {
      "t": "**Faça:** gere os títulos do pedido e abra `Financeiro > Contas a Receber` filtrando pela obra.",
      "r": "**Explique ao cliente:** os títulos herdam a obra do pedido e alimentam o \"A receber\" do painel. **Confira:** os títulos aparecem com a obra. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", pré-requisitos; manual-12-projetos-e-tarefas#002.",
      "s": "d",
      "campo": "Nº dos títulos"
     },
     {
      "t": "**Faça:** abra as abas da obra (Produção, Campo, Compras) e confira os documentos criados.",
      "r": "**Explique ao cliente:** a obra junta tudo o que foi feito para ela. **Confira:** pedido, medição, OP, solicitação e nota aparecem nas abas e nos filtros por Projeto. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 3.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Painéis da obra: previsto × realizado",
    "onde": "`Financeiro > Painel Financeiro de Projetos` e módulo `Projetos`",
    "intro": "Com os documentos ligados, leia os painéis com o cliente e prove que os números batem com a origem.",
    "passos": [
     {
      "t": "**Faça:** abra o **Painel Financeiro de Projetos** e escolha a obra de teste no seletor (ou **Ver Painel** no cartão da obra).",
      "r": "**Explique ao cliente:** sem obra o painel convida a escolher uma. **Confira:** Valor vendido, Valor faturado, A faturar, A receber em aberto, A pagar em aberto e Resultado batem com o pedido, a nota e os títulos. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 4; manual-12-projetos-e-tarefas#006.",
      "s": "v"
     },
     {
      "t": "**Faça:** leia com o cliente os **Avisos inteligentes** e as **Pendências do projeto** e clique na seta de uma pendência.",
      "r": "**Explique ao cliente:** as pendências apontam pedido sem faturamento e medição em aberto; a seta leva direto ao documento. **Confira:** a medição de teste aparece como pendência e abre ao clicar. **Fonte:** manual-12-projetos-e-tarefas#006; fluxo antigo \"Fluxo de projetos e obras\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** explique a regra do painel comparando com o Financeiro.",
      "r": "**Explique ao cliente:** no painel, custo é o destinado ou comprometido (não o caixa) e receita é a nota autorizada (não o pedido). **Confira:** diferenças entre painel e Financeiro por causa dessa regra não são erro. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra **Andamento das Obras** e escolha a obra.",
      "r": "**Explique ao cliente:** a linha do tempo mostra quantas peças estão em cada fase, de Vendido a Entregue; Divergências mostra peças sem item de pedido. **Confira:** o avanço físico da obra de teste. **Fonte:** manual-12-projetos-e-tarefas#007.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra **Plano de Resultado**, **Comparar Obras** e **Dashboard Projetos**.",
      "r": "**Explique ao cliente:** o plano compara o previsto com o realizado por categoria; o dashboard mostra Vendido, Não faturado, Lucro e as obras que precisam de atenção. **Confira:** a obra de teste aparece com o previsto informado no cadastro. **Fonte:** manual-12-projetos-e-tarefas#008; fluxo antigo \"Fluxo de projetos e obras\", bloco 4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. Diário e ciclo de vida da obra",
    "onde": "`Projetos > Diário de Obra` e ações da linha da obra",
    "intro": "Termine mostrando como registrar o dia a dia da obra e como encerrá-la sem perder o histórico.",
    "passos": [
     {
      "t": "**Faça:** faça uma postagem de teste no **Diário de Obra**.",
      "r": "**Explique ao cliente:** o diário recebe também os serviços de campo das obras que têm projeto no pedido. **Confira:** a postagem aparece na obra. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 5.",
      "s": "d"
     },
     {
      "t": "**Faça:** inative a obra e procure-a no seletor de um novo pedido. Depois reative.",
      "r": "**Explique ao cliente:** obra inativa some dos seletores, mas os documentos já emitidos continuam apontando para ela. **Confira:** some ao inativar e volta ao reativar. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 5.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente excluir a obra de teste, que já tem documentos.",
      "r": "**Explique ao cliente:** obra com documento não se exclui; para encerrar, prefira inativar. **Confira:** o sistema recusa listando os vínculos. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\", bloco 5.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "A obra de teste foi cadastrada com código único e aparece em Todos os Projetos.",
    "s": "v"
   },
   {
    "t": "Pedido, medição, OP, solicitação de compra, nota e títulos estão ligados à obra e aparecem nas abas e filtros.",
    "s": "d"
   },
   {
    "t": "O Painel Financeiro de Projetos mostra vendido, faturado, a receber e resultado coerentes com os documentos.",
    "s": "d"
   },
   {
    "t": "O cliente sabe que o projeto vai no pedido antes de faturar.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste, com registros \"TESTE FLUXO CONSULTOR\". A nota da obra só é transmitida com o responsável fiscal.",
   "Ligue o projeto no **pedido**, antes de faturar: depois de faturado o pedido só tem Visualizar.",
   "Hoje o painel ainda mostra \"A faturar\" negativo quando só a nota ou o título carrega o projeto e o pedido não.",
   "Cada projeto tem um único local de estoque, e ele precisa ser da mesma empresa das ordens de produção; sem ele a nota não finaliza.",
   "Excluir uma obra é definitivo e leva junto estágios, etapas e resultado previsto: prefira inativar.",
   "Trocar o cliente de uma obra que já tem pedido e nota: confirme com o time antes.",
   "Postar no Diário de Obra grava dados: use só a obra de teste."
  ],
  "naoValidado": [
   "Caminho do cadastro: o fluxo antigo e o procedimento citam `Cadastros > Projetos > Novo Projeto`; o manual-12-projetos-e-tarefas cita o menu lateral do módulo Projetos (`Cadastros > Projetos`) com o botão **+ Novo Projeto**.",
   "Caminho do painel: o fluxo antigo cita `Financeiro > Painel Financeiro de Projetos`; o manual-12-projetos-e-tarefas o coloca no menu do módulo Projetos ou no **Ver Painel** do cartão da obra.",
   "Estágios com peso e conclusão com data vêm só do fluxo antigo (plano de QA); o manual-12-projetos-e-tarefas descreve estágio sem peso e etapa com estágio opcional.",
   "Diário de Obra: o fluxo antigo cita `Projetos > Diário de Obra`, mas o menu de Projetos descrito no manual-12-projetos-e-tarefas não lista esse item.",
   "O módulo Projetos (Todos os Projetos, plano de resultado, andamento, dashboard e diário) não foi aberto no sistema; só o cadastro de projeto, o pedido com projeto, a nota com projeto e o painel financeiro foram vistos."
  ],
  "video": {
   "id": "consultor-09-projetos",
   "titulo": "Cadastro, estágios, painéis e diário da obra",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 },
 {
  "id": "implantacao-tarefas",
  "arquivo": "implantacao-15-tarefas.html",
  "etiqueta": "Consultor · Implantação · Tarefas",
  "titulo": "Implantação de Tarefas: roteiro prático com o cliente",
  "subtitulo": "Executar com o cliente o uso do módulo Tarefas: criar o quadro e as listas, criar o cartão com responsável e prazo, acompanhar em Minhas Tarefas, aplicar as regras de status e colaboração e arquivar.",
  "objetivo": "Ao final, o cliente terá montado um quadro da equipe, distribuído um cartão com responsável e Término Previsto e visto esse cartão chegar a Minhas Tarefas e ao Dashboard. Saberá comentar, mencionar, anexar e arquivar sem perder histórico.",
  "rodape": "Checklist de implantação · Tarefas · fontes: fluxo antigo \"Fluxo de tarefas\", procedimento-criar-quadro-e-cartao-em-tarefas, regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel, faq-limitacoes-conhecidas-v1-22-12, manual-12-projetos-e-tarefas · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Licença do módulo Tarefas ativa para a empresa do cliente.",
    "r": "**Confira:** o módulo **Tarefas** aparece no ícone de grade (menu de módulos). **Fonte:** fluxo antigo \"Fluxo de tarefas\" (pré-requisito); manual-12-projetos-e-tarefas#001.",
    "s": "d"
   },
   {
    "t": "Dois usuários de teste: o gestor que cria o quadro e um executor que será o responsável do cartão, com uma segunda sessão aberta.",
    "r": "**Confira:** os dois aparecem na busca de **+ Adicionar responsável**. **Fonte:** fluxo antigo \"Fluxo de tarefas\" (pré-requisito).",
    "s": "d"
   },
   {
    "t": "Combinado com o cliente como os quadros serão organizados (um por departamento ou por obra) e quais listas cada um terá.",
    "r": "**Confira:** os nomes das listas antes de criar. **Fonte:** manual-12-projetos-e-tarefas#004.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Abrir o módulo e criar o quadro",
    "onde": "`Tarefas > Meus Quadros`",
    "intro": "Comece pelo quadro: é nele que a equipe vai ver o trabalho. Mostre primeiro como chegar ao módulo.",
    "passos": [
     {
      "t": "**Faça:** abra o módulo **Tarefas** pelo ícone de grade (menu de módulos) e entre em **Meus Quadros**.",
      "r": "**Explique ao cliente:** hoje a busca Ctrl+K ainda não encontra o módulo Tarefas; até a correção, abra pelo menu de módulos. **Confira:** a tela Meus Quadros e o que já existe nela. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; faq-limitacoes-conhecidas-v1-22-12; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **Novo Quadro** e tente criar com o nome vazio.",
      "r": "**Explique ao cliente:** o quadro precisa de nome para aparecer nos seletores e na busca. **Confira:** o sistema recusa nome vazio ou só com espaços. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** informe o **Nome do Quadro** (ex.: \"TESTE FLUXO CONSULTOR - Obras\"), escolha o **Tipo** (Avulso) e clique em **Criar Quadro**.",
      "r": "**Explique ao cliente:** um quadro por equipe ou por obra; **A partir de Modelo** copia a estrutura de um quadro-modelo. **Confira:** o quadro aparece em Meus Quadros. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#004.",
      "s": "d",
      "campo": "Nome do quadro"
     },
     {
      "t": "**Faça:** abra o quadro clicando no nome dele.",
      "r": "**Explique ao cliente:** o quadro nasce vazio e as listas são as colunas do trabalho. **Confira:** o quadro novo ainda não tem listas. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Criar as listas",
    "onde": "dentro do quadro, **+ Adicionar lista**",
    "intro": "As listas representam as fases do trabalho. Crie com o cliente as que a equipe vai usar e mostre as regras de lista.",
    "passos": [
     {
      "t": "**Faça:** em **+ Adicionar lista**, crie as listas \"A fazer\", \"Em andamento\", \"Revisão\" e \"Feito\".",
      "r": "**Explique ao cliente:** sem lista não há onde criar o cartão. **Confira:** as quatro colunas aparecem no quadro. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "**Faça:** renomeie uma lista e reordene as listas arrastando. Recarregue a página.",
      "r": "**Explique ao cliente:** a ordem das listas é a mesma para toda a equipe. **Confira:** a ordem final se mantém, inclusive na segunda sessão. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 1.",
      "s": "d"
     },
     {
      "t": "**Faça:** defina limite de trabalho (WIP) = 2 na lista \"Em andamento\" e tente mover um terceiro cartão para ela (faça depois do bloco 3, quando houver cartões).",
      "r": "**Explique ao cliente:** o limite evita que a equipe comece tudo ao mesmo tempo. **Confira:** o limite aparece na lista e o terceiro movimento é bloqueado com mensagem; o cartão não some. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 2.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente excluir uma lista com cartões.",
      "r": "**Explique ao cliente:** os cartões não podem ficar sem lista. **Confira:** a exclusão é bloqueada ou exige transferir os cartões. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 1.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Cartão com responsável e prazo",
    "onde": "lista do quadro e detalhe da tarefa",
    "intro": "O cartão é a atividade distribuída. Sem responsável ele não chega a ninguém; sem Término Previsto não há atraso para cobrar.",
    "passos": [
     {
      "t": "**Faça:** na lista \"A fazer\", clique em **+ Adicionar tarefa**, digite o nome (ex.: \"Agendar vistoria da obra de teste\") e crie o cartão.",
      "r": "**Explique ao cliente:** o cartão aparece na coluna e pode ser arrastado entre as listas. **Confira:** o cartão na lista \"A fazer\". **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009.",
      "s": "d",
      "campo": "Tarefa"
     },
     {
      "t": "**Faça:** abra o cartão e leia com o cliente como ele nasceu.",
      "r": "**Explique ao cliente:** o cartão nasce **Pendente**, prioridade **Média** e sem responsável. **Confira:** status, prioridade e o campo de responsáveis vazio. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "**Faça:** defina **Prioridade** Alta e o **Término Previsto** com data e hora.",
      "r": "**Explique ao cliente:** o prazo é o campo Término Previsto (não existe \"Prazo\"); os atrasos aparecem no Dashboard. Tudo é salvo automaticamente. **Confira:** a mensagem \"Tarefa atualizada!\". **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "**Faça:** tente informar um término anterior ao início do cartão.",
      "r": "**Explique ao cliente:** o sistema protege o prazo contra datas invertidas. **Confira:** a data invertida é recusada. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** clique em **+ Adicionar responsável**, digite parte do nome do executor de teste e escolha o usuário.",
      "r": "**Explique ao cliente:** só com responsável o cartão passa a ser cobrado de alguém. **Confira:** a confirmação \"adicionado como responsável\". **Fonte:** manual-12-projetos-e-tarefas#009; procedimento-criar-quadro-e-cartao-em-tarefas.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Minhas Tarefas e Dashboard",
    "onde": "`Tarefas > Minhas Tarefas` e `Tarefas > Dashboard`",
    "intro": "Mostre o outro lado: o que o executor vê e o que o gestor acompanha.",
    "passos": [
     {
      "t": "**Faça:** na sessão do executor, abra **Minhas Tarefas**. Compare com um cartão de teste ainda sem responsável.",
      "r": "**Explique ao cliente:** Minhas Tarefas mostra só o que está atribuído ao usuário logado; cartão sem responsável não aparece para ninguém. **Confira:** o cartão com responsável aparece; o sem responsável não. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel; manual-12-projetos-e-tarefas#010.",
      "s": "d"
     },
     {
      "t": "**Faça:** mostre os contadores e agrupe por **Status** e por **Prioridade**.",
      "r": "**Explique ao cliente:** os contadores de Em andamento, Atrasadas, Urgentes e Concluídas são a rotina diária do executor; **+ Nova tarefa** cria direto dali. **Confira:** o cartão de teste no grupo certo. **Fonte:** manual-12-projetos-e-tarefas#010.",
      "s": "d"
     },
     {
      "t": "**Faça:** na sessão do gestor, abra o **Dashboard** e filtre pelo quadro de teste.",
      "r": "**Explique ao cliente:** Tarefas Atrasadas, Vencem em 7 dias e Carga por Responsável mostram quem está sobrecarregado; **Exportar** gera a planilha. **Confira:** o cartão de teste conta no quadro e no responsável certos. **Fonte:** manual-12-projetos-e-tarefas#010.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Status e regras do cartão",
    "onde": "detalhe da tarefa",
    "intro": "Percorra o ciclo do cartão e demonstre as regras que impedem concluir trabalho que ainda depende de outro.",
    "passos": [
     {
      "t": "**Faça:** mova o cartão para \"Em andamento\" pelo ícone \"Mover para outra lista\" e, depois, arrastando.",
      "r": "**Explique ao cliente:** as duas formas dão o mesmo resultado e respeitam o limite da lista. **Confira:** o cartão na nova lista. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "**Faça:** leve o cartão até Concluída e reabra.",
      "r": "**Explique ao cliente:** a data de conclusão é preenchida ao concluir e retirada ao reabrir; o histórico registra cada mudança. **Confira:** a data de conclusão e a aba **Histórico**. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 3.",
      "s": "d"
     },
     {
      "t": "**Faça:** crie uma subtarefa no cartão e tente concluir o cartão com ela aberta.",
      "r": "**Explique ao cliente:** o trabalho só fecha quando as partes fecham. **Confira:** a conclusão é impedida e o sistema diz o que falta. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 3; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "**Faça:** cancele um cartão de teste e tente reabri-lo.",
      "r": "**Explique ao cliente:** cancelado é definitivo; para pausar, use outra lista ou status. **Confira:** a reabertura é impedida. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 3.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "6. Colaboração e visões",
    "onde": "abas do detalhe da tarefa e visões do quadro",
    "intro": "Mostre como a equipe conversa dentro do cartão em vez de usar mensagens soltas, e como o gestor vê o mesmo quadro de jeitos diferentes.",
    "passos": [
     {
      "t": "**Faça:** na aba **Comentários**, publique um comentário com @menção ao executor de teste.",
      "r": "**Explique ao cliente:** a pessoa mencionada é notificada uma única vez; o autor não recebe a própria notificação. **Confira:** a notificação na sessão do executor. **Fonte:** manual-12-projetos-e-tarefas#009; fluxo antigo \"Fluxo de tarefas\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** na aba **Checklists**, crie um checklist com três itens e marque dois.",
      "r": "**Explique ao cliente:** o checklist divide a atividade sem criar cartões novos. **Confira:** o percentual atualiza na hora. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; fluxo antigo \"Fluxo de tarefas\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** na aba **Anexos**, anexe um arquivo de teste válido e tente um acima de 10 MB.",
      "r": "**Explique ao cliente:** os anexos ficam com o cartão, mas há limite de tamanho e de tipo. **Confira:** o arquivo válido entra; o grande é recusado. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** use **Vincular** para ligar o cartão ao pedido ou à obra de teste e abra o vínculo.",
      "r": "**Explique ao cliente:** o vínculo leva do cartão direto ao registro do ERP. **Confira:** o vínculo abre o registro certo. **Fonte:** manual-12-projetos-e-tarefas#009; fluxo antigo \"Fluxo de tarefas\", bloco 5.",
      "s": "d"
     },
     {
      "t": "**Faça:** alterne as visões **Kanban**, **Lista**, **Tabela**, **Calendário** e **Gantt** e aplique **Filtros** por responsável.",
      "r": "**Explique ao cliente:** é o mesmo quadro em formatos diferentes. **Confira:** o cartão de teste mostra a mesma informação em todas as visões. **Fonte:** manual-12-projetos-e-tarefas#009; fluxo antigo \"Fluxo de tarefas\", bloco 5.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "7. Arquivar e restaurar",
    "onde": "cabeçalho do cartão e `Tarefas > Arquivadas`",
    "intro": "Feche o roteiro limpando o quadro de teste sem apagar nada.",
    "passos": [
     {
      "t": "**Faça:** arquive o cartão de teste pelo cabeçalho do detalhe.",
      "r": "**Explique ao cliente:** arquivar tira o cartão do quadro, mas não apaga. **Confira:** o cartão some do quadro e de Minhas Tarefas. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "**Faça:** abra `Tarefas > Arquivadas`, abra o cartão e clique em **Restaurar**.",
      "r": "**Explique ao cliente:** o arquivado abre só para leitura até ser restaurado. **Confira:** o cartão volta ao quadro com comentários, checklist e anexos. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; fluxo antigo \"Fluxo de tarefas\", bloco 4.",
      "s": "d"
     },
     {
      "t": "**Faça:** arquive o quadro de teste e restaure; depois tente arquivar o quadro padrão.",
      "r": "**Explique ao cliente:** o quadro padrão de tarefas avulsas é fixo. **Confira:** o quadro de teste volta ao restaurar; o padrão não pode ser renomeado nem arquivado. **Fonte:** fluxo antigo \"Fluxo de tarefas\", bloco 1.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O quadro de teste tem listas criadas pelo cliente e um cartão com responsável, prioridade e Término Previsto.",
    "s": "d"
   },
   {
    "t": "O cartão apareceu em Minhas Tarefas do executor e no Dashboard do gestor.",
    "s": "d"
   },
   {
    "t": "O sistema impediu concluir o cartão com subtarefa aberta e reabrir o cancelado.",
    "s": "d"
   },
   {
    "t": "Comentário com menção, checklist, anexo e vínculo funcionaram, e o cartão arquivado foi restaurado com tudo.",
    "s": "d"
   }
  ],
  "atencao": [
   "Só em ambiente de teste, com quadros e cartões \"TESTE FLUXO CONSULTOR\" e usuários de teste como responsáveis.",
   "Hoje a busca Ctrl+K ainda não encontra o módulo Tarefas: abra pelo menu de módulos (é defeito reportado, não regra).",
   "Cartão sem responsável não aparece em Minhas Tarefas: o erro mais comum na implantação é criar cartões e esquecer o responsável.",
   "O prazo é o **Término Previsto**; sem ele o cartão nunca aparece como atrasado.",
   "Mover, comentar ou mencionar em cartão de outra pessoa avisa os responsáveis: não use usuários reais no teste.",
   "Automações e recorrências criam cartões e enviam notificações sozinhas: só teste com destinatários de teste.",
   "Arquivar só se desfaz por **Restaurar** em `Tarefas > Arquivadas`."
  ],
  "naoValidado": [
   "Quadro padrão: o procedimento registra que numa conta nova aparece \"Nenhum quadro ainda\" e que o quadro nasce sem listas; o manual-12-projetos-e-tarefas diz que o quadro **Tarefas Gerais** (padrão) já existe com as listas A Fazer, Em Andamento e Concluído. Conferir na tela do cliente.",
   "Criar o cartão: o procedimento cita **+ Adicionar tarefa**; o manual-12-projetos-e-tarefas cita o **+** da coluna e o botão **Adicionar**.",
   "Limite de trabalho (WIP), dependências, cancelamento, anexos acima de 10 MB e arquivar o quadro vêm só do fluxo antigo (plano de QA de Tarefas) e não foram executados no sistema.",
   "Vincular o cartão a pedido ou obra: o fluxo antigo marcou como não validado; o manual-12-projetos-e-tarefas descreve o **Vincular**. Conferir na tela antes de ensinar.",
   "Nomes de status: o fluxo antigo usa Pendente, Em andamento, Em revisão, Concluída e Cancelada; o manual-12-projetos-e-tarefas só cita listas (A Fazer, Em Andamento, Concluído). Conferir os status reais no detalhe da tarefa."
  ],
  "video": {
   "id": "consultor-10-tarefas",
   "titulo": "Quadro, cartão, regras e colaboração",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 }
];
