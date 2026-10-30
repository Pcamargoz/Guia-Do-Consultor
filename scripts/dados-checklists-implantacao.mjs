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
  "titulo": "Implantação da Fundação",
  "subtitulo": "Checklist do consultor para a primeira etapa de toda implantação: empresa, emissão em homologação, usuários, cadastros-base e carga inicial. Serve ao iniciante como roteiro e ao experiente como padrão.",
  "objetivo": "Ao final, o cliente tem a empresa emitindo em homologação, cada usuário com o perfil certo e a base de produtos, clientes e cadastros financeiros carregada e conferida. O administrador do cliente sabe convidar usuários, cadastrar produto com a categoria certa e corrigir um participante recusado. Sem a Fundação bem feita, todo pedido sai com preço, imposto ou cliente errado nos módulos seguintes.",
  "rodape": "Checklist de implantação · Fundação · fontes: manual de implantação, regras e checklist da Fundação (gestora); Apostila do Consultor (reunião de alinhamento e configuração do ambiente) · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "A versão contratada aceita o regime de apuração de **todas** as empresas do cliente.",
    "r": "**Como validar:** compare `Minha Assinatura` com o regime de cada CNPJ informado pelo contador. **Por quê:** Lucro Presumido, Lucro Real e excesso de sublimite não gravam nas versões Starter e Standard. **Fonte:** CAD-EMP-005.",
    "s": "d"
   },
   {
    "t": "O número de empresas ativas (matriz e filiais) e o número de usuários previstos cabem na licença.",
    "r": "**Como validar:** `Minha Assinatura` mostra o limite de empresas e de usuários; convite pendente conta como vaga. **Por quê:** estourar o limite trava o cadastro no meio da implantação. **Fonte:** CAD-EMP-019; Fundação C, pré-requisitos comerciais.",
    "s": "d"
   },
   {
    "t": "Os módulos contratados aparecem sem cadeado no menu para o administrador do cliente.",
    "r": "**Como validar:** navegue pelo menu com o usuário administrador. **Por quê:** módulo fora do plano aparece com cadeado e a tela responde “Módulo não contratado”; isso se resolve no comercial, não na implantação. **Fonte:** Fundação D, seção 1.",
    "s": "d"
   },
   {
    "t": "O cliente entregou o certificado digital A1 (arquivo e senha) de cada CNPJ emitente e a série e o número da última NF-e emitida.",
    "r": "**Como validar:** confira a lista de documentos pedidos com antecedência. **Por quê:** sem certificado e série não há nota de teste, e a numeração antiga precisa continuar. **Fonte:** Fundação C, pré-requisitos do cliente; CAD-EMP-006.",
    "s": "d",
    "campo": "Vencimento do certificado de cada empresa"
   },
   {
    "t": "O cliente entregou a lista de usuários com nome, função e um e-mail **exclusivo** para cada um.",
    "r": "**Como validar:** confira se nenhum e-mail já é usado em outra empresa que tem Flow (contador e consultor externo costumam repetir). **Por quê:** o e-mail é único em todo o Flow. **Fonte:** Fundação C, pergunta U2.",
    "s": "d"
   },
   {
    "t": "O cliente entregou as bases de clientes, fornecedores e produtos (com NCM, unidade e tipo de material), os bancos usados e o plano de contas do contador.",
    "r": "**Como validar:** abra as planilhas antes da reunião e veja se há CPF/CNPJ, endereço e NCM preenchidos. **Por quê:** a limpeza da base é a etapa mais demorada da carga. **Fonte:** Fundação C, pré-requisitos do cliente.",
    "s": "d"
   },
   {
    "t": "O ambiente está pronto: acesso ao Flow, internet estável, ferramenta de acesso remoto instalada e, se usa CEM Desktop, a máquina Windows do banco do CEM disponível com acesso de administrador.",
    "r": "**Como validar:** teste o acesso remoto e o login antes do primeiro treinamento. **Por quê:** pré-requisito pendente para o treinamento no meio. **Fonte:** Apostila do Consultor, configuração do ambiente; Fundação C, pré-requisitos.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Conduza a reunião de alinhamento com o sponsor, o gerente do projeto e o key user, e chame o contador para a parte fiscal. Apresente o método e os papéis, e use o questionário: cada resposta muda uma configuração. Registre as decisões em ata; o consultor orienta, mas regime, NCM e tributação são decididos pelo cliente e pelo contador.",
    "passos": [
     {
      "t": "O consultor identificou o sponsor, o gerente do projeto e o key user do cliente, e quem será o administrador do sistema.",
      "r": "**Como validar:** os nomes estão na ata da reunião de alinhamento. **Por quê:** o primeiro usuário vira administrador do cliente e é ele quem convida os demais. **Fonte:** Apostila do Consultor, reunião de alinhamento; Fundação C, pergunta U4.",
      "s": "d",
      "campo": "Sponsor, gerente do projeto, key user e administrador"
     },
     {
      "t": "O consultor perguntou: quantos CNPJs emitem nota, se são matriz e filiais ou empresas diferentes, e qual o regime de cada um?",
      "r": "**Como validar:** a ata traz cada CNPJ com regime confirmado pelo contador. **Por quê:** define quantas empresas cadastrar e se cabem na versão. **Fonte:** Fundação C, perguntas E1 e E2; CAD-EMP-005, CAD-EMP-019.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou se algum usuário deve ver só uma filial e explicou que hoje todo usuário vê todas as empresas.",
      "r": "**Como validar:** a resposta e o aviso estão na ata. **Por quê:** não existe restrição de usuário por filial; alinhar a expectativa evita frustração no go-live. **Fonte:** CAD-EMP-008.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: emite NFS-e, por qual prefeitura e modelo? Qual o provedor atual de emissão e vai continuar a numeração do sistema antigo?",
      "r": "**Como validar:** a ata registra a prefeitura, a série e o próximo número. **Por quê:** NFS-e tradicional exige Inscrição Municipal; a série vem antes da primeira transmissão. **Fonte:** Fundação C, perguntas E3 e E4; CAD-EMP-002.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou, para cada tipo de material: o cliente vende por unidade, por quilo ou por m²?",
      "r": "**Como validar:** a lista de categorias com o “Preço calculado por” está aprovada pelo cliente. **Por quê:** é a decisão mais importante da Fundação; categoria errada dá preço errado em todos os pedidos. **Fonte:** CAD-PRO-020, CAD-CAT-001.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou se o cliente usa tabela de preço por cliente e registrou que hoje o sistema não tem essa tabela.",
      "r": "**Como validar:** a lacuna está na ata e foi comunicada. **Por quê:** o produto guarda só custo, venda e margem; prometer tabela de preço quebra a confiança. **Fonte:** CAD-PRO-011.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: os códigos de produto e de cliente do sistema antigo serão mantidos? A base tem NCM em todos os produtos? Há clientes duplicados ou no exterior?",
      "r": "**Como validar:** as respostas estão na ata e viraram tarefa de limpeza da base. **Por quê:** o código não muda depois de criado e o CPF/CNPJ é único, contando inativos. **Fonte:** CAD-PRO-005, CAD-PAR-006, CAD-PAR-007, CAD-PAR-008.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quais contas bancárias usa, se emite boleto e por qual banco, se o contador tem plano de contas próprio e quais condições de pagamento usa.",
      "r": "**Como validar:** a ata lista contas, banco do boleto, plano de contas escolhido e condições que faltam. **Por quê:** o pedido importado já precisa de condição e plano de contas. **Fonte:** Fundação C, perguntas F1 a F3.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou se o cliente usa CEM Desktop, CEM Mobi ou PrefSuite e qual NCM, unidade e categoria padrão quer para material novo vindo do CEM.",
      "r": "**Como validar:** a resposta está na ata e foi repassada para a etapa de integração. **Por quê:** define o agente desktop e os Padrões de Integração. **Fonte:** Fundação C, perguntas I1 a I3.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure na ordem do roteiro: empresa, certificado e série, perfis e usuários, cadastros de produto, cadastros financeiros, padrões de integração, carga e parâmetros. Faça junto com o administrador do cliente, para ele ver onde fica cada coisa. Não pule etapas: a ordem existe porque uma depende da outra.",
    "passos": [
     {
      "t": "A empresa criada no registro da conta foi revisada: CNPJ, razão social, CNAE, regime e endereço completo conferidos com o cartão CNPJ e o contador, e as filiais cadastradas.",
      "r": "**Como validar:** `Configurações > Empresas` salva sem aviso; o CNAE não ficou o de fábrica por engano e o regime está preenchido. **Por quê:** o CNPJ não muda depois de salvo. **Fonte:** CAD-EMP-001, CAD-EMP-003, CAD-EMP-011.",
      "s": "d"
     },
     {
      "t": "O certificado A1 de cada empresa foi enviado, a série e o próximo número da NF-e continuam o sistema antigo e o ambiente está em **homologação**.",
      "r": "**Como validar:** `Faturamento > Configurações > Certificados` mostra situação e validade; o modal de série traz o número combinado. **Por quê:** o número é dado ao transmitir e nunca volta. **Fonte:** CAD-EMP-006; Fundação C, etapa 2.",
      "s": "d"
     },
     {
      "t": "Os usuários foram convidados já com o perfil, partindo dos perfis prontos, e nenhum usuário ativo ficou sem perfil.",
      "r": "**Como validar:** `Segurança > Usuários` mostra perfil em todas as linhas. **Por quê:** usuário sem perfil entra e não vê nada; criar perfil novo só quando nenhum pronto serve. **Fonte:** Fundação C, etapa 3.",
      "s": "d",
      "campo": "Responsável pelo cadastro de usuários"
     },
     {
      "t": "As categorias de produto têm o **tipo** e o “Preço calculado por” aprovados, as unidades têm sigla de até 6 letras e os NCMs usados estão cadastrados.",
      "r": "**Como validar:** confira `Categorias de Produto`, `Unidade de Medida` e `NCM`. Perfil em peso, vidro e superfície em área, ou outra decisão por escrito. **Por quê:** o tipo trava depois que há saldo. **Fonte:** CAD-CAT-002, CAD-CAT-004, CAD-UNI-001.",
      "s": "d"
     },
     {
      "t": "Contas bancárias, portadores, plano de contas, condições e meios de pagamento estão cadastrados e conferidos.",
      "r": "**Como validar:** contas conferidas com o extrato; plano de contas aprovado pelo contador; parcelas de cada condição somam 100%. **Por quê:** Vendas e Financeiro dependem desses cadastros. **Fonte:** FIN-CTA-001; Fundação C, etapa 5.",
      "s": "d"
     },
     {
      "t": "A base foi limpa **antes** da carga: todas as linhas com papel, CPF/CNPJ válido, IE ou “Isento”, CEP e endereço completo, sem duplicados, e-mails como contatos com as marcas de nota e boleto.",
      "r": "**Como validar:** a validação da importação por planilha não recusa linhas, ou as recusas foram tratadas. **Por quê:** a planilha aplica a mesma régua da tela; não há atalho. **Fonte:** CAD-PAR-001, CAD-PAR-003, CAD-PAR-016, CAD-CON-002.",
      "s": "d"
     },
     {
      "t": "A carga seguiu a ordem produtos → participantes → contatos, e os vendedores foram ligados aos usuários depois de criados.",
      "r": "**Como validar:** quantidade importada igual à da origem; cada vendedor tem um usuário. **Por quê:** produto precisa de categoria e padrões antes; o vendedor é ligado a um usuário, um para um. **Fonte:** Fundação C, etapa 7; CAD-PAR-012.",
      "s": "d"
     },
     {
      "t": "O consultor confirmou o que a Fundação precisa entregar aos módulos seguintes: Padrões de Integração completos para quem usa CEM, condição e plano de contas para o pedido, e certificado e série prontos para a nota de teste.",
      "r": "**Como validar:** confira o checklist de pré-requisitos da Integração e de Vendas antes de liberar. **Por quê:** a cadeia comercial começa só com a Fundação assinada. **Fonte:** README da cadeia comercial, ordem de implantação; INT C e VEN C, pré-requisitos.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine o administrador e o key user nos cadastros que eles vão manter sozinhos. Use os dados reais do cliente, não exemplos genéricos, e mostre o efeito de cada cadastro no pedido e na nota. Deixe o cliente operar; o consultor só orienta.",
    "passos": [
     {
      "t": "O consultor mostrou, nesta sequência, empresa → usuários e perfis → categorias → produto → participante → contatos, ligando cada cadastro ao que ele muda no pedido e na nota.",
      "r": "**Como validar:** o key user explica por que a categoria vem antes do produto e o usuário antes do vendedor. **Por quê:** ensinar processo, não tela. **Fonte:** Apostila do Consultor, como conduzir o projeto; Fundação C, roteiro.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "O administrador do cliente convidou um usuário de teste com perfil, e cancelou um convite que não seria usado.",
      "r": "**Como validar:** o convite aparece e some da lista ao cancelar. **Por quê:** convite pendente ocupa vaga na licença; só administrador convida administrador. **Fonte:** Fundação C, etapa 3.",
      "s": "d"
     },
     {
      "t": "O consultor cadastrou com o cliente um perfil de alumínio, um vidro e um componente reais, mostrando que o preço muda por quilo, por m² e por unidade conforme a categoria.",
      "r": "**Como validar:** o cliente explica por que a unidade de medida não decide o preço. **Por quê:** o preço do item é decidido só pela categoria. **Fonte:** CAD-PRO-020, CAD-PRO-021.",
      "s": "d"
     },
     {
      "t": "O consultor cadastrou com o cliente um serviço de instalação com o código LC 116 informado pelo contador.",
      "r": "**Como validar:** o produto de serviço grava sem recusa. **Por quê:** serviço sem LC 116 é recusado e trava a NFS-e. **Fonte:** CAD-PRO-004.",
      "s": "d"
     },
     {
      "t": "O consultor cadastrou com o cliente um cliente real com contatos e mostrou as marcas de e-mail de nota, boleto e entrega.",
      "r": "**Como validar:** o contato tem as marcas certas. **Por quê:** sem marca, a nota e o boleto não chegam ao cliente final; o participante não tem e-mail próprio. **Fonte:** CAD-CON-002, CAD-CON-003, CAD-PAR-015.",
      "s": "d"
     },
     {
      "t": "O consultor provocou com o cliente as recusas mais comuns (participante sem papel, CPF/CNPJ inválido, produto sem NCM) e mostrou como ler a mensagem e corrigir.",
      "r": "**Como validar:** o cliente lê a mensagem e corrige sozinho. **Por quê:** são as principais causas de recusa na carga e no dia a dia. **Fonte:** Fundação C, erros comuns; CAD-PAR-003, CAD-PAR-005, CAD-PRO-001.",
      "s": "d",
      "campo": "Dúvidas registradas"
     },
     {
      "t": "O consultor mostrou o uso de inativar em vez de excluir na limpeza de cadastros com vínculo.",
      "r": "**Como validar:** o cliente inativa um cadastro de teste. **Por quê:** com vínculo, excluir apenas inativa; com documento em aberto, nem inativa. **Fonte:** CAD-PAR-010, CAD-PAR-011.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Peça ao cliente que execute sem a sua ajuda e explique o porquê de cada passo. Se ele erra, volte ao conceito, não à tela. Registre a evidência de cada item; a Fundação só fecha com o cliente executando.",
    "passos": [
     {
      "t": "O cliente emitiu uma NF-e de teste **autorizada em homologação**, com o número na sequência combinada.",
      "r": "**Como validar:** anote o número e a chave da nota. **Por quê:** prova que empresa, certificado, série e ambiente estão certos. **Fonte:** Fundação D, seção 3.",
      "s": "d",
      "campo": "Número e chave da NF-e de teste"
     },
     {
      "t": "Um usuário de cada perfil fez login e viu o que deve, e não viu o resto.",
      "r": "**Como validar:** anote o resultado por perfil. **Por quê:** perfil errado aparece só quando o usuário não acha a tela ou vê o que não devia. **Fonte:** Fundação D, seção 4.",
      "s": "d"
     },
     {
      "t": "O administrador do cliente convidou sozinho um usuário novo com o perfil certo.",
      "r": "**Como validar:** o convite foi feito sem ajuda. **Por quê:** depois do encerramento, novos usuários são responsabilidade do cliente. **Fonte:** Fundação D, seção 4.",
      "s": "d"
     },
     {
      "t": "O cliente cadastrou sozinho um produto novo e explicou por que escolheu aquela categoria.",
      "r": "**Como validar:** a categoria e o NCM estão certos. **Por quê:** é o cadastro que mais gera preço errado no pedido. **Fonte:** CAD-PRO-020, CAD-PRO-002.",
      "s": "d"
     },
     {
      "t": "O cliente conferiu com o consultor uma amostra de 10 clientes e 10 produtos importados: documento, endereço, contatos, categoria, NCM, unidade e preço.",
      "r": "**Como validar:** anote a amostra e as correções feitas. **Por quê:** a contagem bate, mas o dado pode estar errado. **Fonte:** Fundação D, seção 8.",
      "s": "d"
     },
     {
      "t": "O cliente corrigiu sozinho um participante recusado na carga e explicou a causa.",
      "r": "**Como validar:** a linha recusada foi importada depois da correção. **Por quê:** a carga continua depois do go-live com cadastros novos. **Fonte:** CAD-PAR-003, CAD-PAR-016.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "A Fundação não tem go-live próprio: ela libera a cadeia comercial. Feche as pendências, registre as lacunas e deixe claro que o ambiente fiscal segue em homologação. Só libere o próximo módulo com o checklist assinado.",
    "passos": [
     {
      "t": "As lacunas foram registradas e comunicadas ao cliente: tabela de preço por cliente e restrição de usuário por filial, entre outras levantadas.",
      "r": "**Como validar:** estão na ata ou na OS do atendimento. **Por quê:** o consultor não promete funcionalidade que não existe. **Fonte:** Fundação D, aceite; CAD-PRO-011, CAD-EMP-008.",
      "s": "d"
     },
     {
      "t": "O vencimento do certificado de cada empresa está anotado na ata e o cliente sabe que o sistema avisa a partir de 30 dias.",
      "r": "**Como validar:** a data está registrada. **Por quê:** certificado vencido barra a emissão no dia a dia. **Fonte:** Fundação D, seção 3.",
      "s": "d"
     },
     {
      "t": "O cliente sabe que o ambiente segue em **homologação** até a validação da cadeia comercial, e quem decide a virada para produção.",
      "r": "**Como validar:** está na ata. **Por quê:** nota real antes do teste ponta a ponta gera retrabalho fiscal. **Fonte:** Fundação D, aceite; README da cadeia comercial, ordem de implantação.",
      "s": "d"
     },
     {
      "t": "Não há convite pendente esquecido ocupando vaga na licença.",
      "r": "**Como validar:** confira a lista de convites. **Por quê:** convite pendente conta como usuário. **Fonte:** Fundação D, seção 4.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanha os cadastros novos feitos pelo cliente (produtos e clientes) e corrige o que entrou com categoria ou contato errado.",
      "r": "**Como validar:** revise uma amostra semanal com o key user. **Por quê:** o erro de cadastro só aparece no pedido ou na nota. **Fonte:** Apostila do Consultor, go-live; CAD-PRO-020, CAD-CON-002.",
      "s": "d"
     },
     {
      "t": "O checklist da Fundação foi assinado com todos os itens obrigatórios marcados, e só então a Integração com o CEM ou Vendas foi liberada.",
      "r": "**Como validar:** checklist assinado pelo cliente e pelo consultor; tarefas de configuração e cadastros base concluídas no cronograma. **Por quê:** cada etapa depende da anterior. **Fonte:** Fundação D, uso e aceite; README da cadeia comercial.",
      "s": "d",
      "campo": "Data de liberação do módulo seguinte"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Todas as empresas estão cadastradas, com certificado válido, série continuando a numeração antiga e uma NF-e de teste autorizada em homologação.",
    "s": "d"
   },
   {
    "t": "Todo usuário ativo tem e-mail próprio e pelo menos um perfil, e o administrador do cliente convida usuários sozinho.",
    "s": "d"
   },
   {
    "t": "As categorias têm tipo e forma de preço aprovados pelo cliente, e o cliente cadastra produto sozinho com a categoria certa.",
    "s": "d"
   },
   {
    "t": "A carga inicial bate em quantidade com a origem e a amostra de clientes e produtos foi conferida.",
    "s": "d"
   },
   {
    "t": "Os cadastros financeiros de apoio e, quando há CEM, os Padrões de Integração estão completos.",
    "s": "d"
   },
   {
    "t": "As lacunas foram comunicadas e o checklist da Fundação está assinado.",
    "s": "d"
   }
  ],
  "atencao": [
   "Categoria com tipo ou “Preço calculado por” errado dá preço errado em todos os pedidos, e o tipo trava depois que há saldo (CAD-PRO-020, CAD-CAT-004).",
   "O CNPJ da empresa não muda depois de salvo; confira com o cartão CNPJ antes de gravar (CAD-EMP-003).",
   "A empresa criada no registro da conta pode vir com CNAE de fábrica e sem regime; revise sempre (CAD-EMP-011).",
   "E-mail de usuário é único em todo o Flow: contador ou consultor externo que atende outros clientes precisa de outro e-mail.",
   "Convites pendentes ocupam vaga na licença e podem gerar “Limite de usuários atingido”.",
   "Contato sem a marca de e-mail de nota e boleto faz a nota e o boleto não chegarem ao cliente final (CAD-CON-002).",
   "Não use o NCM “99999999 À classificar” como padrão de integração (CAD-PRO-016).",
   "Hoje o sistema ainda não tem tabela de preço por cliente nem restrição de usuário por filial; registre como lacuna (CAD-PRO-011, CAD-EMP-008)."
  ],
  "naoValidado": [
   "O nome do botão que sincroniza o emitente com o provedor, na tela de certificados, não foi confirmado; confira na tela antes de ensinar.",
   "A tela de certificados aparece para perfis que não conseguem enviar o certificado; confira na tela com qual perfil o envio funciona antes de delegar ao cliente.",
   "O meio de pagamento aceita tipo digitado livre; confira na tela se os meios novos aparecem certos na NF-e antes de criar meios além dos de fábrica.",
   "O modelo de implantação cita “tabelas de preço”, mas o sistema não tem essa tela; não procure nem prometa.",
   "A Apostila põe a ordem Vendas → Faturamento → Fiscal → Financeiro, mas também diz que a configuração fiscal vem antes de Vendas; confirme com a coordenação a ordem para o cliente."
  ]
 },
 {
  "id": "implantacao-crm",
  "arquivo": "implantacao-02-crm.html",
  "etiqueta": "Consultor · Implantação · CRM",
  "titulo": "Implantação de CRM",
  "subtitulo": "Checklist para o consultor conduzir a implantação do CRM, do levantamento do processo comercial até o go-live, e para conferir se a equipe de vendas está pronta para operar sozinha.",
  "objetivo": "Ao final, os vendedores cadastram e qualificam leads, convertem em oportunidade, lançam itens, registram atividades e encerram negócios como ganhos ou perdidos, e o gestor acompanha o funil pelos painéis. O CRM é a porta de entrada do processo comercial: o que nasce errado aqui chega errado ao pedido de venda, à produção e ao faturamento.",
  "rodape": "Checklist de implantação · CRM · fontes: apostila do consultor (Módulo CRM; Processo comercial), manual-02-crm, regras e procedimento do CRM, funcional-crm, roteiros de CRM, FAQ de limitações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "O escopo contratado inclui o CRM e está combinado que ele é implantado **antes** de Vendas.",
    "r": "**Como validar:** confira o escopo e o cronograma da Reunião de Alinhamento. **Por quê:** o CRM é a porta de entrada do processo comercial e as oportunidades viram pedidos de venda. **Fonte:** apostila do consultor, Módulo CRM na implantação.",
    "s": "d"
   },
   {
    "t": "Os vendedores e o gestor comercial já têm usuário no Flow com acesso ao CRM.",
    "r": "**Como validar:** peça a cada um que entre no módulo pelo ícone de grade e veja o selo do CRM no menu lateral. **Por quê:** o **Responsável** do lead e da oportunidade é um usuário do sistema. **Fonte:** manual-02-crm, 1.1 e 1.7.",
    "s": "d",
    "campo": "Usuários liberados"
   },
   {
    "t": "Os produtos que a empresa vende estão cadastrados, com os produtos de esquadria prontos para receber altura, largura e cor.",
    "r": "**Como validar:** busque dois produtos reais em `CRM › Cadastros › Produtos`. **Por quê:** sem item a oportunidade não pode ser marcada como ganha. **Fonte:** manual-02-crm, 1.7 e 2.4.",
    "s": "d"
   },
   {
    "t": "A base de participantes foi revisada para evitar duplicidade antes de importar ou cadastrar leads.",
    "r": "**Como validar:** pesquise três clientes ativos e confira se aparecem uma vez só. **Por quê:** o lead convertido vira cliente no cadastro de participantes; cadastro duplicado quebra o histórico. **Fonte:** roteiro CRM 04 (Clientes e Visão 360°); regra-crm-conversao-cria-a-oportunidade-sozinha.",
    "s": "d"
   },
   {
    "t": "Se o cliente vai gerar o pedido a partir da oportunidade, a empresa emissora e os CFOPs de venda já estão configurados em Vendas.",
    "r": "**Como validar:** confirme com quem cuida de Vendas e Fiscal que existe um CFOP que não gera financeiro para o handoff. **Por quê:** **Gerar Pedido de Venda** pede **Empresa** e **CFOP**. **Fonte:** regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
    "s": "d"
   },
   {
    "t": "Existe um ambiente de homologação ou de teste para os exercícios da turma.",
    "r": "**Como validar:** confirme com o gerente de projetos onde a turma vai treinar. **Por quê:** os exercícios criam leads, oportunidades e pedidos de teste que não devem ficar na base de produção. **Fonte:** apostila do consultor, configuração do ambiente.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Converse com o gerente comercial e com um ou dois vendedores, juntos. Peça para contarem como foi a última venda, do primeiro contato ao pedido. Anote os nomes que eles usam para as etapas: é isso que vai virar o funil. Não fale de tela nesta conversa.",
    "passos": [
     {
      "t": "O consultor perguntou: por quais canais os novos contatos chegam hoje (indicação, site, feira, rede social, arquiteto)? Quem recebe e quem distribui esses contatos?",
      "r": "**Como validar:** a lista de canais está anotada com os nomes que a equipe usa. **Por quê:** vira o cadastro de **Origens de Lead**, que mede de onde vêm os negócios. **Fonte:** manual-02-crm, 1.4; apostila, Processo comercial.",
      "s": "d",
      "campo": "Canais de entrada e quem distribui"
     },
     {
      "t": "O consultor perguntou: quais são as etapas reais da venda, na ordem, e qual a chance de fechar em cada uma? Quanto tempo um negócio pode ficar parado em cada etapa?",
      "r": "**Como validar:** etapas, probabilidade e prazo anotados. **Por quê:** a probabilidade calcula o valor ponderado nos painéis e o SLA da etapa gera o alerta de negócio parado. **Fonte:** manual-02-crm, 1.2.",
      "s": "d",
      "campo": "Etapas do funil de vendas"
     },
     {
      "t": "O consultor perguntou: o que faz um contato deixar de ser curiosidade e virar negócio? A equipe confirma verba, quem decide, a necessidade e o prazo da obra?",
      "r": "**Como validar:** o cliente descreveu o critério de qualificação com as palavras dele. **Por quê:** o Flow só converte lead com **BANT** completo e numa etapa de 60% ou mais do funil de leads. **Fonte:** regra-crm-converter-lead-exige-etapa-60-e-bant-completo.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: por que a empresa perde negócios e para quais concorrentes? Alguém registra isso hoje?",
      "r": "**Como validar:** lista curta de motivos objetivos e de concorrentes, sem \"Outros\" genérico. **Por quê:** sem motivo cadastrado não dá para encerrar a oportunidade como perdida. **Fonte:** manual-02-crm, 1.6; roteiro CRM 07.",
      "s": "d",
      "campo": "Motivos de perda e concorrentes"
     },
     {
      "t": "O consultor perguntou: como é feito o orçamento (CEM ou outra ferramenta), quem aprova e em que momento o orçamento vira pedido?",
      "r": "**Como validar:** está anotado quem aprova e o que é obrigatório para aprovar. **Por quê:** o pedido não deve nascer antes da aprovação comercial; o item da oportunidade pode vir de um orçamento do CEM. **Fonte:** apostila, Processo comercial; manual-02-crm, 2.4.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: que tipos de contato o vendedor faz (ligação, visita técnica, reunião, WhatsApp) e como o gestor acompanha hoje a agenda de cada vendedor?",
      "r": "**Como validar:** tipos de atividade listados e forma atual de acompanhamento anotada. **Por quê:** vira o cadastro de **Tipos de Atividade** e define o uso da Agenda e dos Demonstrativos. **Fonte:** manual-02-crm, 1.3, 2.8 e 2.9.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quais números o gestor quer ver toda semana (leads por origem, valor em pipeline, conversão, ranking de vendedores, negócios parados)?",
      "r": "**Como validar:** três a cinco indicadores escolhidos pelo gestor. **Por quê:** orienta o treinamento dos painéis e mostra ao cliente por que o registro diário importa. **Fonte:** manual-02-crm, 2.9.",
      "s": "d",
      "campo": "Indicadores do gestor"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Faça os cadastros de apoio com o key user ao lado, usando o que foi levantado na etapa 1. A ordem importa: o funil de leads precisa existir antes do primeiro lead. Termine a etapa com uma massa de teste pronta para o treinamento.",
    "passos": [
     {
      "t": "O funil de vendas foi cadastrado com as etapas do cliente, na ordem real, com probabilidade e SLA em dias, e marcado como **Funil padrão**.",
      "r": "**Como validar:** abra o Pipeline e confira as colunas. **Por quê:** sem funil de vendas não existe pipeline; o padrão recebe as oportunidades criadas na conversão. O **Tipo** do funil não aparece de novo para edição. **Fonte:** manual-02-crm, 1.2.",
      "s": "d"
     },
     {
      "t": "O funil de leads foi cadastrado **antes** do primeiro lead, com uma etapa de 60% ou mais que represente o lead qualificado.",
      "r": "**Como validar:** abra o **Kanban de Leads** e confira as colunas e percentuais. **Por quê:** lead criado antes do funil de leads fica só na lista e precisa ser recriado; a conversão exige etapa de 60% ou mais. **Fonte:** manual-02-crm, 1.2; regra-crm-converter-lead-exige-etapa-60-e-bant-completo.",
      "s": "d"
     },
     {
      "t": "Tipos de Atividade, Origens de Lead e Temperaturas foram cadastrados com nomes padronizados, sem duplicar o mesmo significado.",
      "r": "**Como validar:** abra o formulário de **Novo Lead** e de nova atividade e confira as listas. **Por quê:** \"Site\", \"Formulário do Site\" e \"Internet\" para a mesma origem estragam as análises. **Fonte:** manual-02-crm, 1.3 a 1.5; roteiro CRM 01.",
      "s": "d"
     },
     {
      "t": "Motivos de Perda e Concorrentes foram cadastrados a partir da lista do cliente.",
      "r": "**Como validar:** marque uma oportunidade de teste como perdida e veja os motivos na lista. **Por quê:** a perda pede motivo e, opcionalmente, o concorrente; essas listas alimentam os demonstrativos. **Fonte:** manual-02-crm, 1.6; roteiro CRM 07.",
      "s": "d"
     },
     {
      "t": "O consultor conferiu as dependências de outros módulos: produtos cadastrados, participantes sem duplicidade, usuários dos vendedores e, para o handoff, empresa e CFOP de Vendas.",
      "r": "**Como validar:** marque cada dependência como pronta, com responsável. **Por quê:** sem produto não há item nem ganho; sem CFOP adequado o pedido não nasce da oportunidade. **Fonte:** manual-02-crm, 1.7; regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
      "s": "d",
      "campo": "Pendências de outros módulos"
     },
     {
      "t": "O consultor preparou, com o key user, dois ou três leads de teste baseados em obras reais do cliente (sem dados pessoais), para usar no treinamento.",
      "r": "**Como validar:** os leads existem no ambiente de treino e estão em etapas diferentes do kanban. **Por quê:** o treinamento com casos da rotina do cliente fixa o processo melhor que exemplos genéricos. **Fonte:** apostila, como conduzir o projeto.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine na sequência do negócio: lead, qualificação, conversão, oportunidade, itens, atividades, encerramento, pedido e painéis. Use os leads de teste montados com o key user. A cada passo, diga o que acontece no módulo seguinte. Deixe os vendedores operarem; você só orienta.",
    "passos": [
     {
      "t": "O consultor mostrou o cadastro do lead em `CRM › Vendas › Leads › Lista de Leads › Novo Lead`, com um contato real da semana, e explicou a diferença entre as seções **Informações CRM** e **Dados CRM**.",
      "r": "**Como validar:** os vendedores sabem onde ficam **Origem do Lead**, **Temperatura**, **Responsável** e o BANT. **Por quê:** é comum procurar a origem em **Dados CRM**. Obrigatórios: **Tipo (PF/PJ)** e **Razão Social / Nome**. **Fonte:** regra-crm-formulario-do-lead-secoes-e-campos.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o **Kanban de Leads**, arrastou um card de etapa e confirmou em \"Mover lead\", ligando cada etapa ao critério de qualificação que o cliente descreveu na etapa 1.",
      "r": "**Como validar:** a turma diz em qual etapa o lead passa a ser qualificado. **Por quê:** a conversão só acontece a partir de uma etapa de 60% ou mais. **Fonte:** funcional-crm-leads-pipeline-e-oportunidades; procedimento-cadastrar-lead-e-converter-em-oportunidade.",
      "s": "d"
     },
     {
      "t": "O consultor tentou converter um lead sem BANT, mostrou o aviso do que falta, completou o BANT em **Informações CRM** e converteu pelo menu `⋯ › Converter`.",
      "r": "**Como validar:** a turma explica as duas condições da conversão. **Por quê:** ver o bloqueio acontecer ensina mais do que ouvir a regra. **Fonte:** regra-crm-converter-lead-exige-etapa-60-e-bant-completo; manual-02-crm, 2.2.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou onde a oportunidade aparece no `CRM › Vendas › Pipeline` depois da conversão e que o lead passou a ser cliente.",
      "r": "**Como validar:** cada vendedor encontra a oportunidade convertida. **Por quê:** a conversão cria a oportunidade sozinha e as atividades do lead não migram para ela. **Fonte:** regra-crm-conversao-cria-a-oportunidade-sozinha.",
      "s": "d"
     },
     {
      "t": "O consultor lançou um item de esquadria na aba **Itens** da oportunidade, preenchendo altura, largura e cor na janela **Dados do Item** e clicando em **Aplicar**, com uma medida de obra real do cliente.",
      "r": "**Como validar:** o total dos itens atualiza. **Por quê:** sem **Aplicar** o produto não fica selecionado; sem item a oportunidade não pode ser ganha; o item segue para o pedido. **Fonte:** manual-02-crm, 2.4.",
      "s": "d"
     },
     {
      "t": "O consultor registrou uma visita na aba **Atividades**, reatribuiu a outro vendedor em `CRM › Vendas › Atividades` e mostrou a atividade na **Agenda** desse vendedor.",
      "r": "**Como validar:** o outro vendedor vê a atividade na própria agenda. **Por quê:** a Agenda mostra só o usuário logado; o gestor acompanha pela lista de atividades com filtro de responsável. **Fonte:** manual-02-crm, 2.6 a 2.8.",
      "s": "d"
     },
     {
      "t": "O consultor encerrou uma oportunidade como ganha e outra como perdida, escolhendo um motivo real da lista do cliente.",
      "r": "**Como validar:** a ganha sai do kanban e vai para os números de ganhos; a perdida registra motivo e concorrente. **Por quê:** encerrar com motivo é o que permite saber onde os negócios travam. **Fonte:** manual-02-crm, 2.5.",
      "s": "d"
     },
     {
      "t": "O consultor gerou o pedido a partir da oportunidade ganha com **Gerar Pedido de Venda** e mostrou o pedido em `Vendas › Pedidos de Venda`, explicando o ajuste de CFOP e condição de pagamento no pedido.",
      "r": "**Como validar:** o pedido nasce com cliente, item e valor da oportunidade. **Por quê:** com CFOP que gera financeiro a geração é recusada; use um CFOP sem financeiro e ajuste depois no pedido. Clique uma vez só. **Fonte:** regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro; FAQ.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao gestor os **Demonstrativos** filtrados por vendedor e a **Visão 360°** de um cliente com oportunidades abertas.",
      "r": "**Como validar:** o gestor encontra o ganho do treino e o ranking de vendedores. **Por quê:** é o retorno do registro diário; ganho não é pedido e pedido não é faturamento. **Fonte:** manual-02-crm, 2.9; roteiros CRM 04 e 08.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Agora o cliente faz e você observa, sem pegar no mouse. Dê um caso novo, de uma obra real, e peça para cada vendedor levar do lead ao pedido. Anote onde travou: isso define o reforço antes do go-live.",
    "passos": [
     {
      "t": "Cada vendedor cadastrou sozinho um lead com origem, temperatura e responsável, e conferiu na lista a temperatura gravada.",
      "r": "**Como validar:** o lead aparece com Status \"Novo\" e os dados corretos. **Por quê:** hoje o sistema ainda pode gravar uma temperatura diferente da escolhida; o hábito de conferir evita filtros errados. **Fonte:** procedimento-cadastrar-lead-e-converter-em-oportunidade; FAQ de limitações.",
      "s": "d"
     },
     {
      "t": "O vendedor converteu um lead e, quando o sistema bloqueou, explicou sozinho o que faltava (etapa ou BANT) e corrigiu.",
      "r": "**Como validar:** a conversão termina com \"Lead convertido com sucesso!\" e a oportunidade é encontrada no Pipeline. **Por quê:** este é o bloqueio que mais gera chamado no suporte. **Fonte:** regra-crm-converter-lead-exige-etapa-60-e-bant-completo.",
      "s": "d"
     },
     {
      "t": "O vendedor lançou itens com medidas e cor, avançou a oportunidade no funil e a marcou como ganha.",
      "r": "**Como validar:** a oportunidade aparece nos ganhos dos Demonstrativos. **Por quê:** item com medida e cor certas é o que segue para o pedido e para a produção. **Fonte:** manual-02-crm, 2.4 e 2.5.",
      "s": "d"
     },
     {
      "t": "O vendedor marcou uma oportunidade como perdida e explicou por que o motivo precisa ser o real, e não um genérico.",
      "r": "**Como validar:** motivo e concorrente gravados. **Por quê:** os demonstrativos de perda só ajudam o gestor se os motivos forem honestos e padronizados. **Fonte:** manual-02-crm, 2.5; roteiro CRM 07.",
      "s": "d"
     },
     {
      "t": "Quem fará o handoff para Vendas gerou o pedido de uma oportunidade ganha e conferiu item a item no pedido.",
      "r": "**Como validar:** descrição, quantidade, valor, cor e medidas batem com a oportunidade. **Por quê:** é o momento em que a negociação vira compromisso de entrega. **Fonte:** regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
      "s": "d"
     },
     {
      "t": "O gestor encontrou sozinho as atividades atrasadas de um vendedor e os negócios parados acima do SLA.",
      "r": "**Como validar:** o gestor mostra a lista de atividades filtrada e o quadro de negócios parados nos Demonstrativos. **Por quê:** sem esse acompanhamento o CRM vira cadastro sem gestão. **Fonte:** manual-02-crm, 2.7 a 2.9.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Combine com o gerente de projetos a data a partir da qual todo contato novo entra no CRM, e só no CRM. Nas primeiras semanas, olhe os painéis com o gestor uma vez por semana. O objetivo é segurança da equipe, não zerar dúvidas.",
    "passos": [
     {
      "t": "Ficou decidido, com data, como entram os negócios em andamento: quais viram lead e quais entram direto como oportunidade no Pipeline.",
      "r": "**Como validar:** decisão registrada na OS com responsável. **Por quê:** a oportunidade também pode ser criada direto, sem lead, por **+ Nova Oportunidade**; misturar critérios distorce a conversão. **Fonte:** manual-02-crm, 2.2.",
      "s": "d",
      "campo": "Data de corte e regra de carga"
     },
     {
      "t": "Os dados de teste do treinamento foram separados ou removidos da base de produção, com autorização do cliente.",
      "r": "**Como validar:** os painéis de produção não mostram leads e oportunidades de treino. **Por quê:** dados de teste distorcem conversão e ranking logo no primeiro mês. **Fonte:** apostila, preparação para o go-live.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou com o gestor: leads sem origem, negócios parados acima do SLA, perdas sem motivo real e pedidos gerados em duplicidade.",
      "r": "**Como validar:** revisão semanal registrada na OS. **Por quê:** hoje o botão de gerar pedido pode continuar disponível depois de gerado, o que permite duplicar o pedido. **Fonte:** FAQ de limitações; manual-02-crm, 2.9.",
      "s": "d",
      "campo": "Pontos da revisão semanal"
     },
     {
      "t": "O gestor sabe usar o ranking de vendedores dos Demonstrativos quando o **Leaderboard** não mostrar dados logo após um ganho.",
      "r": "**Como validar:** o gestor abre o ranking nos Demonstrativos. **Por quê:** no treino o Leaderboard ficou vazio logo após o ganho e parece depender de processamento posterior. **Fonte:** manual-02-crm, 2.9.",
      "s": "d"
     },
     {
      "t": "O critério para liberar o treinamento de Vendas foi cumprido: oportunidades reais ganhas viraram pedidos com itens, medidas e valores corretos, conferidos pelo key user.",
      "r": "**Como validar:** pelo menos alguns pedidos reais gerados do CRM conferidos item a item. **Por quê:** o CRM vem antes de Vendas e entrega o pedido de onde partem faturamento, produção e serviços. **Fonte:** apostila, Módulo CRM e Processo comercial.",
      "s": "d",
      "campo": "Data de liberação para Vendas"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Os vendedores levam um contato real do lead ao pedido de venda sem ajuda do consultor.",
    "s": "d"
   },
   {
    "t": "Funis, origens, temperaturas, tipos de atividade e motivos de perda refletem o processo comercial do cliente, com nomes padronizados.",
    "s": "d"
   },
   {
    "t": "Todo contato novo, a partir da data de corte, entra pelo CRM.",
    "s": "d"
   },
   {
    "t": "O gestor acompanha semanalmente pipeline, negócios parados, perdas e ranking pelos painéis.",
    "s": "d"
   },
   {
    "t": "Os pedidos gerados das oportunidades chegam a Vendas com itens, medidas e valores corretos.",
    "s": "d"
   }
  ],
  "atencao": [
   "Cadastrar leads antes de existir o funil de leads: esses leads ficam fora do kanban e precisam ser recriados.",
   "Mudar a ordem ou as etapas de um funil em uso sem avisar a equipe comercial.",
   "Cadastrar origens, motivos ou concorrentes repetidos com grafias diferentes, o que estraga as análises.",
   "Tentar gerar o pedido com um CFOP que gera financeiro: hoje a geração é recusada; use um CFOP sem financeiro e ajuste no pedido.",
   "Hoje o sistema ainda pode deixar de abrir o painel da oportunidade depois de gerar o pedido e mantém o botão disponível: oriente clicar uma vez e conferir em `Vendas › Pedidos de Venda` antes de tentar de novo.",
   "Hoje a temperatura gravada pode diferir da escolhida e algumas datas aparecem um dia antes em painéis: oriente conferir na lista.",
   "Criar pedido antes da aprovação comercial, pulando o encerramento da oportunidade como ganha."
  ],
  "naoValidado": [
   "Conversão do lead: o manual-02-crm (2.2) descreve uma janela **Converter Lead** em que se escolhe funil, etapa inicial e valor; a regra-crm-conversao-cria-a-oportunidade-sozinha diz que a oportunidade é criada sozinha, sem aviso, na etapa \"Novo Lead\". Confira na tela antes de ensinar.",
   "Caminho das configurações: o manual-02-crm usa `CRM › Configurações › Funis de Vendas`; os roteiros de CRM usam `CRM › Configurar › Pipeline › Funis de Vendas` e `Configurar › Captação › Origens de Lead`. Confira o menu da versão do cliente.",
   "Pedido repetido: o roteiro CRM 02 diz que, se já existe pedido ligado à oportunidade, a tela permite abrir esse pedido em vez de criar outro; a FAQ de limitações diz que o botão continua disponível e permite duplicar. Confira na tela."
  ]
 },
 {
  "id": "implantacao-integracao-cem",
  "arquivo": "implantacao-03-integracao-cem.html",
  "etiqueta": "Consultor · Implantação · Integração com o CEM",
  "titulo": "Implantação da Integração com o CEM",
  "subtitulo": "Checklist do consultor para ligar a importação de obras do CEM Desktop, do CEM Mobi ou por arquivo, incluindo o Faturamento em Nível. Primeira etapa da cadeia comercial, logo depois da Fundação.",
  "objetivo": "Ao final, o cliente importa sozinho uma obra fechada no CEM e gera o pedido de venda certo: cliente reconhecido, produtos com os padrões certos e total igual ao do orçamento. Ele sabe tratar a revisão do orçamento e desfazer uma importação. A integração tira a redigitação do processo comercial, e um erro aqui se repete em todos os pedidos, notas e títulos seguintes.",
  "rodape": "Checklist de implantação · Integração com o CEM · fontes: manual de implantação, regras e checklist da Integração de Vendas (gestora); README da cadeia comercial; Apostila do Consultor · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "O checklist da Fundação está assinado, incluindo a parte de Integração CEM.",
    "r": "**Como validar:** confira o checklist assinado. **Por quê:** empresa, categorias, NCM, unidades, condição e plano de contas são a base dos Padrões de Integração. **Fonte:** INT D, pré-condição; INT C, pré-requisitos.",
    "s": "d"
   },
   {
    "t": "O módulo Vendas está contratado e o cliente sabe que integração e Faturamento em Nível fazem parte dele, em todas as versões.",
    "r": "**Como validar:** `Vendas` sem cadeado no menu. **Por quê:** sem Vendas a importação é recusada; não venda integração como adicional Pro. **Fonte:** INT-GER-001, INT-GER-002, INT-NIV-019.",
    "s": "d"
   },
   {
    "t": "A carga de clientes da Fundação foi feita **antes** da primeira obra, com o mesmo CPF/CNPJ usado no CEM.",
    "r": "**Como validar:** busque três clientes do CEM pelo documento no Flow. **Por quê:** o cliente é reconhecido só pelo CPF/CNPJ; sem a carga, a integração cria cliente novo. **Fonte:** INT-GER-005.",
    "s": "d"
   },
   {
    "t": "CEM Desktop: a máquina Windows do banco do CEM está disponível, com acesso de administrador e a porta do banco liberada pelo TI.",
    "r": "**Como validar:** o TI do cliente confirmou por escrito. **Por quê:** o agente roda nessa máquina; o Flow só lê o banco do CEM, nunca grava, o que ajuda a liberar o acesso. **Fonte:** INT C, pré-requisitos; INT-CFG-006.",
    "s": "d"
   },
   {
    "t": "CEM Mobi: o cliente obteve com o fornecedor do Mobi o endereço de acesso (URL), a chave e o código da função.",
    "r": "**Como validar:** os três dados estão em mãos antes da configuração. **Por quê:** sem eles a conexão não se testa. **Fonte:** INT-CFG-007.",
    "s": "d"
   },
   {
    "t": "O cliente separou três obras reais **fechadas** no CEM para teste: uma simples, uma com desconto e uma com serviço extra.",
    "r": "**Como validar:** as três obras aparecem na importação. **Por quê:** só obra fechada com o cliente aparece; as três cobrem os casos que mais erram. **Fonte:** INT C, pré-requisitos do cliente; INT-DSK-002.",
    "s": "d",
    "campo": "Obras de teste escolhidas"
   },
   {
    "t": "O contador informou o código LC 116 dos serviços que aparecem nos orçamentos (instalação e outros).",
    "r": "**Como validar:** o código está anotado para a configuração. **Por quê:** sem LC 116 a importação de serviço para. **Fonte:** INT-GER-036.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Faça o levantamento com quem orça no CEM e com quem vai importar no Flow, e com o administrador do sistema presente. Peça para ver o CEM aberto: o cadastro de clientes e a forma de fechar a obra mostram mais que a conversa. Registre as decisões em ata, porque algumas ficam gravadas em cada obra.",
    "passos": [
     {
      "t": "O consultor perguntou: o cliente usa CEM Desktop, CEM Mobi, PrefSuite ou só arquivo?",
      "r": "**Como validar:** a escolha está na ata. **Por quê:** só um botão de importação aparece em `Vendas > Pedidos de Venda`; PrefSuite está fora do beta e não se implanta. **Fonte:** INT C, perguntas Q1 e Q2; INT-PRF-001.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cadastro de clientes no CEM tem CPF/CNPJ, IE, cidade e UF corretos? Quem corrige quando está errado?",
      "r": "**Como validar:** confira três clientes no CEM junto com o cliente. **Por quê:** cidade, UF e documento vêm só da origem; sem eles a integração para. **Fonte:** INT-GER-009, INT-GER-034, INT-GER-039.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: os códigos de esquadria (Tipo) se repetem entre obras? O cliente quer o produto com o código da obra junto?",
      "r": "**Como validar:** o modo do código do produto está decidido e na ata. **Por quê:** o modo fica gravado em cada obra; mudar depois não afeta as já integradas. **Fonte:** INT-DSK-014, INT-DSK-015.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quais tipos de material aparecem nos orçamentos (perfil, componente, superfície, vidro, kit, esquadria) e se há serviço extra?",
      "r": "**Como validar:** a lista de tipos e serviços está na ata. **Por quê:** cada tipo precisa de NCM, unidade e categoria padrão; vidro herda de superfície e esconde erro de NCM. **Fonte:** INT-CFG-011, INT-CFG-012, INT-CFG-013.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: qual CFOP, plano de contas, condição e meio de pagamento são os mais usados na venda?",
      "r": "**Como validar:** os valores estão na ata para pré-preencher o pedido. **Por quê:** são obrigatórios na confirmação; o pré-preenchimento evita o bloqueio. **Fonte:** INT-DSK-011, INT-DSK-012.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente costuma revisar o orçamento depois de fechado? Aumenta quantidade, troca cor ou medida?",
      "r": "**Como validar:** a frequência e o tipo de revisão estão na ata. **Por quê:** aumento gera um segundo pedido só com o saldo; troca de cor ou medida duplica o item. **Fonte:** INT-RIM-002, INT-RIM-008.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente fatura a mesma obra em partes (projeto, contramarco, folhas, instalação) ou por empresas diferentes? Um pedido por parte ou um pedido único?",
      "r": "**Como validar:** a decisão de usar o Faturamento em Nível, os níveis e a empresa e documento de cada um estão na ata. **Por quê:** o recurso começa desligado e o modo se escolhe obra a obra. **Fonte:** INT-NIV-004, INT-NIV-010; README da cadeia, decisão X4.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem vai importar no dia a dia e quem é o administrador? O cliente usa o CRM com leads?",
      "r": "**Como validar:** os nomes estão na ata. **Por quê:** quem cria pedido importa, mas salvar os Padrões exige administrador; lead com mesmo telefone ou e-mail é sugerido e vira cliente. **Fonte:** INT-GER-003, INT-GER-007; INT C, pergunta Q12.",
      "s": "d",
      "campo": "Usuários que vão importar"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure com o administrador do cliente presente, na ordem: sistema de integração, agente ou Mobi, Padrões de Integração, clientes e Faturamento em Nível. Mostre cada tela enquanto configura, porque ele vai mantê-las. Não importe a primeira obra antes de os padrões estarem completos.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: empresa com regime, categorias com forma de preço, NCM, unidades, condição, plano de contas e certificado em homologação (Fundação), e contas e plano de contas do Financeiro de apoio.",
      "r": "**Como validar:** checklist da Fundação assinado e cadastros financeiros conferidos. **Por quê:** o pedido importado já nasce com condição e plano; o teste vai até a nota. **Fonte:** INT C, pré-requisitos; README da cadeia comercial, ordem de implantação.",
      "s": "d"
     },
     {
      "t": "O sistema de integração foi escolhido em `Vendas > Configurações > Configurar integração` e o botão certo aparece em `Pedidos de Venda`.",
      "r": "**Como validar:** o botão `Importar CEM`, `Importar CEM Mobi` ou `Importar Arquivo` aparece. **Por quê:** a tela só abre para o administrador do cliente. **Fonte:** INT-CFG-001; INT C, etapa 1.",
      "s": "d"
     },
     {
      "t": "CEM Desktop: o agente foi instalado na máquina do banco do CEM, pareado com o código em até 10 minutos, e o dispositivo e o banco aparecem configurados.",
      "r": "**Como validar:** os cards `Dispositivos pareados` e `Bancos de Dados Configurados` mostram o dispositivo online e o banco. **Por quê:** código vencido ou errado tem a mesma mensagem; muitas tentativas bloqueiam o usuário. **Fonte:** INT-CFG-002, INT-CFG-004.",
      "s": "d"
     },
     {
      "t": "CEM Mobi: os dados de acesso foram salvos e o teste de conexão confirmou sucesso com os orçamentos encontrados.",
      "r": "**Como validar:** `Testar Conexão` mostra a mensagem de sucesso e o selo `Conectado`. **Por quê:** a contagem de orçamentos prova que o CEM Mobi responde. **Fonte:** INT-CFG-009.",
      "s": "d"
     },
     {
      "t": "Os Padrões de Integração estão completos: NCM, unidade e categoria de cada tipo usado, LC 116 do serviço e, na aba do pedido, CFOP, plano de contas, condição e meio de pagamento.",
      "r": "**Como validar:** o card `Padrões por tipo de item` mostra o selo `Todos completos` e o NCM não é o “À classificar”. **Por quê:** padrão incompleto para a importação. **Fonte:** INT-CFG-019, INT-GER-015, INT-DSK-012.",
      "s": "d"
     },
     {
      "t": "Clientes inativos com o mesmo documento de clientes do CEM foram reativados antes da primeira obra.",
      "r": "**Como validar:** busque os documentos das obras de teste entre os inativos. **Por quê:** a regra diz que a integração reativa, mas a fonte registra que a tela não reativa; confira antes. **Fonte:** INT-DSK-022; INT C, etapa 5.",
      "s": "d"
     },
     {
      "t": "Faturamento em Nível (se usado): o recurso foi ligado, os níveis foram cadastrados com código, prefixo, tipo, peso, ordem e empresa, e os templates de rateio somam 100%.",
      "r": "**Como validar:** `Níveis de Faturamento` tem ao menos um nível do tipo Produto; os templates fecham 100%. **Por quê:** os menus de níveis só aparecem com o recurso ligado. **Fonte:** INT-CFG-010, INT-NIV-002, INT-NIV-006, INT-NIV-014.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine com as obras reais do cliente, abrindo o CEM e o Flow lado a lado. Comece pela obra simples, depois desconto, serviço e, por fim, a revisão do orçamento. A cada passo, mostre o que a importação cria (cliente, produtos, projeto, pedido) e o que acontece depois em Vendas.",
    "passos": [
     {
      "t": "O consultor mostrou no CEM como fechar a obra e no Flow que só a obra fechada aparece para importar.",
      "r": "**Como validar:** o cliente fecha uma obra e ela aparece na lista. **Por quê:** a dúvida mais comum é “a obra não aparece”. **Fonte:** INT-DSK-002.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "O consultor importou com o cliente a obra simples, seguindo os passos do assistente até gerar o pedido, e mostrou que não há escolha de itens: entram todos os itens calculados.",
      "r": "**Como validar:** o pedido nasce `Em aberto`, com a etiqueta de importado. **Por quê:** faturamento parcial não se faz escolhendo itens na importação. **Fonte:** INT-DSK-008, INT-DSK-009; INT C, etapa 7.",
      "s": "d"
     },
     {
      "t": "O consultor comparou com o cliente, lado a lado, o total do pedido e o total da obra com desconto, e o preço de três linhas.",
      "r": "**Como validar:** os totais batem; o preço unitário é o total da linha dividido pela quantidade do CEM. **Por quê:** o preço do pedido é o do CEM; o cadastro do produto não interfere. **Fonte:** INT-DSK-013, INT-DSK-017.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou os produtos e o projeto criados pela importação e explicou que cor nova do CEM é cadastrada sozinha.",
      "r": "**Como validar:** os produtos novos têm NCM, unidade e categoria do padrão e só preço de custo. **Por quê:** o cliente não deve criar cores à mão. **Fonte:** INT-GER-011, INT-GER-013, INT-GER-016.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o que acontece com cliente sem CPF/CNPJ ou sem cidade no CEM, e explicou que o cadastro de origem se corrige **no CEM**.",
      "r": "**Como validar:** o cliente vincula um cliente existente ou usa `+ Novo cliente`. **Por quê:** o documento não se digita no assistente; sem cidade a integração para. **Fonte:** INT-GER-034, INT-GER-039.",
      "s": "d"
     },
     {
      "t": "O consultor aumentou com o cliente a quantidade de um item no CEM, reimportou e mostrou o segundo pedido só com o saldo; depois trocou uma cor e mostrou que o item vem de novo inteiro.",
      "r": "**Como validar:** dois pedidos, o primeiro intocado. **Por quê:** na troca de cor ou medida o pedido antigo precisa ser cancelado ou ajustado, ou há risco de faturar em dobro. **Fonte:** INT-RIM-002, INT-RIM-005, INT-RIM-008.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou como desfazer uma importação: cancelar ou excluir o pedido devolve a obra para pendente.",
      "r": "**Como validar:** a obra volta à lista. **Por quê:** é o único jeito de desfazer; quem importa por arquivo precisa cancelar para reimportar. **Fonte:** INT-LIB-001, INT-LIB-002, INT-ARQ-012.",
      "s": "d"
     },
     {
      "t": "Faturamento em Nível (se usado): o consultor importou com o cliente uma obra com rateio, conferiu a prévia e mostrou um pedido por nível com a empresa e o documento certos.",
      "r": "**Como validar:** a soma dos pedidos é o total da obra; o nível de serviço gera produto de serviço. **Por quê:** a prévia é a conferência antes de gravar. **Fonte:** INT-NIV-007, INT-NIV-010, INT-NIV-012.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Peça ao usuário que vai importar no dia a dia para fazer sozinho, com obras que ele escolhe. Observe sem intervir e peça que explique cada conferência. Registre o número de cada pedido como evidência.",
    "passos": [
     {
      "t": "O usuário importou sozinho as três obras de teste e conferiu cliente, produtos, total com desconto e data de entrega.",
      "r": "**Como validar:** anote os números dos pedidos; a data de entrega é a previsão do CEM. **Por quê:** cobre obra simples, desconto e serviço. **Fonte:** INT C, etapa 8; INT D, seção 3.",
      "s": "d",
      "campo": "Números dos pedidos de teste"
     },
     {
      "t": "O cliente levou um pedido importado até a NF-e **autorizada em homologação**.",
      "r": "**Como validar:** anote o número e a chave da nota. **Por quê:** prova que a integração gera pedido que fatura. **Fonte:** INT D, seção 3.",
      "s": "d"
     },
     {
      "t": "O cliente revisou com o contador os avisos fiscais dos itens dos primeiros pedidos.",
      "r": "**Como validar:** a lista de avisos foi tratada. **Por quê:** item sem imposto calculado não impede o pedido, mas fica com aviso. **Fonte:** INT-GER-024.",
      "s": "d"
     },
     {
      "t": "O usuário provocou uma falha (por exemplo, um tipo sem padrão), leu a mensagem, corrigiu e importou de novo.",
      "r": "**Como validar:** depois do erro não ficou pedido, produto nem obra gravados. **Por quê:** importação que falha não grava nada, exceto o cliente; repetir é seguro. **Fonte:** INT-GER-041.",
      "s": "d"
     },
     {
      "t": "O usuário explicou o que fazer quando o cliente final aumenta a quantidade e quando troca a cor de um item depois do pedido.",
      "r": "**Como validar:** a explicação bate com a regra de saldo e de item novo. **Por quê:** é o erro que gera faturamento em dobro. **Fonte:** INT-RIM-002, INT-RIM-008.",
      "s": "d"
     },
     {
      "t": "O usuário cancelou sozinho um pedido de teste e mostrou a obra de volta como pendente.",
      "r": "**Como validar:** a obra reaparece na lista. **Por quê:** é a rotina de desfazer. **Fonte:** INT-LIB-001.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Antes de liberar, limpe os testes, combine com o cliente o saneamento do cadastro no CEM e deixe claro quem corrige o quê. No go-live, acompanhe as primeiras importações reais de perto. Só libere Vendas com o checklist da integração assinado.",
    "passos": [
     {
      "t": "Os pedidos de teste foram cancelados ou excluídos e as obras de teste voltaram a pendente, ou o cliente decidiu mantê-las.",
      "r": "**Como validar:** a lista de pedidos não tem testes perdidos. **Por quê:** pedido de teste esquecido entra nas metas e pode ser faturado. **Fonte:** INT-LIB-001, INT-LIB-002.",
      "s": "d"
     },
     {
      "t": "O cliente assumiu o saneamento do cadastro de clientes no CEM (CPF/CNPJ, IE, cidade) com um responsável.",
      "r": "**Como validar:** o responsável está na ata. **Por quê:** o cadastro de origem se corrige no CEM, não no Flow. **Fonte:** INT-GER-009, INT-GER-034.",
      "s": "d",
      "campo": "Responsável pelo saneamento no CEM"
     },
     {
      "t": "O cliente foi avisado dos comportamentos que afetam o uso: salvar os Padrões exige administrador; as marcas de e-mail do contato padrão valem só para a importação por arquivo; troca de cor ou medida duplica o item.",
      "r": "**Como validar:** os avisos estão na ata. **Por quê:** evita surpresa no dia a dia. **Fonte:** INT D, aceite; INT-RIM-008.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor confere com o key user as primeiras importações reais: total igual ao CEM, cliente sem duplicar e nenhum item faturado em dobro após revisão.",
      "r": "**Como validar:** amostra semanal de pedidos importados. **Por quê:** erro de padrão ou de revisão só aparece com volume. **Fonte:** INT D, seções 2 a 4; Apostila do Consultor, go-live.",
      "s": "d"
     },
     {
      "t": "CEM Desktop: o cliente sabe que o agente precisa ficar ligado na máquina do banco e o que fazer quando aparece “Nenhum agente desktop online”.",
      "r": "**Como validar:** o key user explica onde fica a máquina e como religar o agente. **Por quê:** é a parada mais comum da importação. **Fonte:** INT-DSK-001; INT C, erros comuns.",
      "s": "d"
     },
     {
      "t": "O checklist da integração foi assinado com todos os itens obrigatórios marcados, e só então Vendas foi liberado; o ambiente fiscal segue em homologação até a validação do Faturamento.",
      "r": "**Como validar:** checklist assinado e ciência na ata. **Por quê:** a cadeia segue Integração → Vendas → Faturamento → Financeiro. **Fonte:** INT D, uso e aceite; README da cadeia comercial.",
      "s": "d",
      "campo": "Data de liberação de Vendas"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O botão de importação certo aparece e, no CEM Desktop, o agente está pareado e online; no Mobi, a conexão foi testada.",
    "s": "d"
   },
   {
    "t": "Os Padrões de Integração estão completos para todos os tipos usados e o modo do código do produto está decidido em ata.",
    "s": "d"
   },
   {
    "t": "O usuário importa sozinho uma obra fechada e o total do pedido bate com o total do CEM.",
    "s": "d"
   },
   {
    "t": "Um pedido importado chegou à NF-e autorizada em homologação.",
    "s": "d"
   },
   {
    "t": "O cliente sabe tratar a revisão do orçamento e desfazer uma importação.",
    "s": "d"
   },
   {
    "t": "Faturamento em Nível, quando usado, gera os pedidos por nível com a soma igual ao total da obra.",
    "s": "d"
   }
  ],
  "atencao": [
   "Importar a primeira obra antes da carga de clientes cria clientes duplicados com os dados do CEM (INT-GER-005).",
   "Padrão de vidro herdado de superfície esconde NCM errado; preencha todos os tipos usados (INT-CFG-012).",
   "Troca de cor ou medida no CEM traz o item de novo inteiro e o pedido antigo continua: risco de faturar em dobro (INT-RIM-008).",
   "O modo do código do produto fica gravado em cada obra; decida antes da primeira importação (INT-DSK-014).",
   "Quem importa por arquivo não reimporta a mesma obra: precisa cancelar o pedido antes (INT-ARQ-012).",
   "Salvar os Padrões de Integração exige administrador do cliente, mesmo para quem abre a tela.",
   "Os menus de níveis e templates só aparecem com o Faturamento em Nível ligado: ligue, cadastre níveis e templates e só então libere o uso aos usuários (INT C, etapa 6).",
   "PrefSuite está fora do beta: não implante (INT-PRF-001)."
  ],
  "naoValidado": [
   "As marcas de e-mail do contato criado pela integração divergem entre as regras (todas ligadas, inclusive compras, ou compras desligado); confira na tela o contato criado por cada porta.",
   "Quando a importação falha, uma regra diz que o pedido é cancelado e outras dizem que é excluído; confira na tela antes de explicar ao cliente.",
   "A opção `Arquivos` da tela de integração fala em arquivo .txt, mas a regra aceita só XML e JSON; confira na tela e ensine XML ou JSON.",
   "A regra diz que cliente inativo com o mesmo documento é reativado, mas a fonte registra que hoje a tela não reativa; teste em homologação.",
   "A regra diz para só ligar o Faturamento em Nível depois de cadastrar os níveis, mas o manual registra que os menus de níveis só aparecem com o recurso ligado; confira na tela a ordem possível.",
   "A recusa de esquadria sem cor, altura ou largura pode vir do assistente ou só do pedido, conforme a fonte; confira na tela."
  ]
 },
 {
  "id": "implantacao-vendas",
  "arquivo": "implantacao-04-vendas.html",
  "etiqueta": "Consultor · Implantação · Vendas",
  "titulo": "Implantação de Vendas",
  "subtitulo": "Checklist do consultor para implantar o pedido de venda: cadastro, aprovação de desconto, cancelamento e faturamento, mais comissões, metas e contratos quando contratados. Vem depois da Fundação e, se houver CEM, da integração testada.",
  "objetivo": "Ao final, o cliente lança, aprova, encerra, cancela e fatura pedidos de venda sozinho, em homologação, e entende o que cada ação gera no Faturamento, no Financeiro, na Produção e na Expedição. Vendas inicia o fluxo operacional: um pedido com CFOP, condição ou valor errado leva o erro para a nota, os títulos e a comissão.",
  "rodape": "Checklist de implantação · Vendas · fontes: manual de implantação, regras e checklist de Vendas (gestora); README da cadeia comercial; Apostila do Consultor (Módulo Vendas na implantação; Processo comercial: o que validar) · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "O checklist da Fundação está assinado e, se o cliente usa CEM, o checklist da integração também.",
    "r": "**Como validar:** confira os dois checklists assinados. **Por quê:** Vendas depende de categorias, produtos, clientes e Padrões de Integração prontos. **Fonte:** VEN D, pré-requisitos; Apostila do Consultor, Módulo Vendas na implantação.",
    "s": "d"
   },
   {
    "t": "Todas as empresas têm regime de apuração preenchido.",
    "r": "**Como validar:** `Configurações > Empresas`. **Por quê:** é a única recusa do cálculo de imposto do pedido. **Fonte:** VEN-PED-011.",
    "s": "d"
   },
   {
    "t": "O módulo Vendas está sem cadeado e a versão PRO foi conferida se o cliente vai usar comissão, metas ou contrato de fornecimento.",
    "r": "**Como validar:** `Minha Assinatura` e o menu. **Por quê:** comissões, metas e contratos são PRO; sem eles, não configure essas etapas. **Fonte:** VEN-GER-001.",
    "s": "d"
   },
   {
    "t": "O consultor sabe se o cliente tem os módulos Financeiro e Expedição.",
    "r": "**Como validar:** confira a licença. **Por quê:** sem Financeiro não há `Gerar Títulos` nem título de comissão a pagar; sem Expedição não há `Liberar para Expedição`. **Fonte:** VEN-PED-041, VEN-COM-014, VEN-EXP-002.",
    "s": "d"
   },
   {
    "t": "Os vendedores estão ligados aos usuários e as condições de pagamento usadas pelo cliente existem com os percentuais certos.",
    "r": "**Como validar:** cadastro do participante vendedor e tela de condições. **Por quê:** a comissão depende do vendedor e as parcelas saem dos percentuais da condição. **Fonte:** CAD-PAR-012, VEN-COM-004, VEN-PED-015.",
    "s": "d"
   },
   {
    "t": "O cliente entregou, com antecedência, a política de desconto, os pedidos em aberto do sistema antigo e, se PRO, as regras de comissão, as metas e os contratos com construtoras.",
    "r": "**Como validar:** os materiais estão na pasta do cliente. **Por quê:** sem eles, a configuração vira suposição. **Fonte:** VEN C, pré-requisitos do cliente.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Converse com o gestor comercial, um vendedor e quem fatura, e chame o contador para os CFOPs. Peça para ver como um orçamento vira pedido hoje e quem autoriza desconto. Várias decisões desta etapa atravessam Faturamento e Financeiro: registre em ata e tome junto com os responsáveis desses módulos.",
    "passos": [
     {
      "t": "O consultor perguntou: como a empresa recebe novos clientes, quem faz os orçamentos, quais informações são obrigatórias para aprovar e quando um orçamento vira pedido?",
      "r": "**Como validar:** o fluxo atual está descrito na ata. **Por quê:** evita criar pedido antes da aprovação comercial. **Fonte:** Apostila do Consultor, Processo comercial: o que validar.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou com o contador: quais CFOPs a empresa usa na venda, remessa e bonificação, e quais geram financeiro?",
      "r": "**Como validar:** lista de CFOPs assinada. **Por quê:** é o CFOP que decide se o pedido exige condição, plano de contas e parcelas, e se a nota gera título. **Fonte:** VEN-PED-001, VEN-PED-017; README da cadeia, decisão X1.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o contas a receber nasce no pedido ou na nota? A empresa vende sem emitir nota?",
      "r": "**Como validar:** a decisão está na ata, com o responsável do Financeiro. **Por quê:** se o pedido gerou os títulos, a nota não gera de novo, e o pedido com títulos fica travado. **Fonte:** VEN-TIT-001, VEN-PED-025, VEN-STA-003; README da cadeia, decisão X2.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: existe limite de desconto por vendedor? Até quanto, e quem aprova acima?",
      "r": "**Como validar:** faixas e aprovadores estão na ata, por empresa. **Por quê:** sem faixa cadastrada não há alçada. **Fonte:** VEN-PED-034.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem decide cancelar um pedido e por quê? A empresa usa Produção, e o que acontece com a ordem de produção de um pedido cancelado?",
      "r": "**Como validar:** respostas na ata. **Por quê:** o cancelamento exige motivo e ordem; a ordem de produção não é cancelada junto, fica marcada. **Fonte:** VEN-STA-004, VEN-STA-009.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: a empresa fatura parcial (entrega por etapas) ou divide a esquadria em partes para faturar?",
      "r": "**Como validar:** a decisão está na ata. **Por quê:** faturamento parcial gera pedido filho; a divisão em partes usa os Níveis de Faturamento. **Fonte:** VEN-DES-001, VEN-PAR-001.",
      "s": "d"
     },
     {
      "t": "Se PRO: o consultor perguntou se paga comissão, sobre qual valor, ao faturar ou ao receber, se divide entre vendedor e gerente, se estorna por inadimplência e se o vendedor pode ver a comissão dos outros.",
      "r": "**Como validar:** respostas na ata, aprovadas pelo gestor. **Por quê:** regime e base valem só para comissões novas e precisam estar decididos antes da primeira nota real. **Fonte:** VEN-COM-001, VEN-COM-007, VEN-COM-020, VEN-COM-022, VEN-COM-024, VEN-COM-025.",
      "s": "d"
     },
     {
      "t": "Se PRO: o consultor perguntou se usa metas mensais por empresa ou por vendedor, e se tem contrato global com construtora, com retenção e compras feitas por conta do cliente.",
      "r": "**Como validar:** respostas na ata, com a origem do abatimento do contrato decidida. **Por quê:** a origem do abatimento não muda depois do primeiro. **Fonte:** VEN-MET-001, VEN-CTR-002, VEN-CTR-006, VEN-CTR-008.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure na ordem: CFOPs, pedido de teste e numeração, alçadas, perfis, e só depois comissão, metas e contratos, se contratados. Faça com o gestor comercial ao lado. Teste cada configuração com um pedido antes de passar à próxima.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: empresa com regime, categorias, produtos, clientes e condições (Fundação), Padrões de Integração (Integração), plano de contas e contas do Financeiro de apoio, e certificado e série em homologação para o teste até a nota.",
      "r": "**Como validar:** checklists anteriores assinados e cadastros financeiros conferidos. **Por quê:** o financeiro de apoio vem antes porque o pedido já precisa de condição e plano de contas. **Fonte:** VEN C, pré-requisitos; README da cadeia comercial, ordem de implantação.",
      "s": "d"
     },
     {
      "t": "Cada CFOP de saída usado foi conferido com o contador quanto a gerar financeiro.",
      "r": "**Como validar:** a lista assinada bate com o cadastro de CFOP. **Por quê:** remessa marcada como gera financeiro obriga condição e parcelas; o contrário deixa venda sem título. **Fonte:** VEN-PED-001, VEN-PED-017.",
      "s": "d"
     },
     {
      "t": "Um pedido de teste com um item de cada categoria (unitário, peso, área e esquadria com cor, altura e largura) foi criado e conferido: valor por categoria, impostos e parcelas.",
      "r": "**Como validar:** `Vendas > Pedidos de Venda` mostra o pedido `Em aberto`, sem aviso de configuração tributária incompleta. **Por quê:** o aviso indica pendência fiscal a resolver antes. **Fonte:** VEN-PED-008, VEN-PED-010, VEN-PED-012, VEN-PED-015.",
      "s": "d"
     },
     {
      "t": "Se o cliente continua a numeração antiga, o primeiro número de pedido foi combinado.",
      "r": "**Como validar:** o número está na ata. **Por quê:** número repetido é recusado. **Fonte:** VEN-PED-004.",
      "s": "d",
      "campo": "Primeiro número de pedido"
     },
     {
      "t": "As faixas de alçada de desconto foram cadastradas por empresa, sem sobreposição, com os aprovadores (usuários ou perfil).",
      "r": "**Como validar:** `Vendas > Configurações > Alçadas de Desconto`. **Por quê:** desconto vindo do CEM não conta para a alçada; o vendedor não aprova o próprio desconto. **Fonte:** VEN-PED-034.",
      "s": "d"
     },
     {
      "t": "Os perfis do vendedor e do gestor permitem o que cada um faz: lançar, cancelar, gerar títulos, liberar para expedição, aprovar desconto e, para quem configura, a comissão.",
      "r": "**Como validar:** login de teste com um vendedor e com o gestor. **Por quê:** as telas de regras e configurações da comissão aparecem no menu para quem não consegue abri-las; confira com o usuário real. **Fonte:** VEN C, etapa 4.",
      "s": "d"
     },
     {
      "t": "Se PRO: comissão ativada com regime e base aprovados, regras cadastradas (geral, por vendedor, produto, categoria ou cliente) e conferidas no simulador com uma venda real.",
      "r": "**Como validar:** `Controle de Comissão > Simulador` mostra o valor esperado pelo gestor. **Por quê:** sem o módulo CRM o percentual do vendedor não aparece no participante; use regra por vendedor. **Fonte:** VEN-COM-001, VEN-COM-005, VEN-COM-006.",
      "s": "d"
     },
     {
      "t": "Se PRO: metas mensais cadastradas sem vigência sobreposta e contratos de fornecimento criados com valor global, origem do abatimento e, com retenção, o término previsto.",
      "r": "**Como validar:** `Metas de Vendas > Cadastro` e `Contratos de Fornecimento`. **Por quê:** valor global só muda em rascunho; depois, só por aditivo. **Fonte:** VEN-MET-001, VEN-CTR-002, VEN-CTR-008.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine com pedidos reais do cliente, de preferência os que ele vai faturar na semana. Siga o fluxo da venda: pedido, aprovação, faturamento, títulos e liberação para os outros setores. Mostre sempre o impacto no módulo seguinte e adapte o fluxo ao cliente, por exemplo encerrando o pedido e gerando títulos antes do faturado, quando for o caso.",
    "passos": [
     {
      "t": "O consultor apresentou o fluxo na sequência: orçamento no CEM ou pedido digitado → pedido `Em aberto` → aprovação, se houver → faturar → nota → contas a receber → liberação para Serviços, Produção e Expedição.",
      "r": "**Como validar:** o key user desenha o fluxo com as palavras dele. **Por quê:** Vendas alimenta Faturamento, Fiscal, Financeiro, Produção e Expedição. **Fonte:** Apostila do Consultor, Módulo Vendas na implantação.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "O consultor lançou com o vendedor um pedido real do cliente, com produtos de categorias diferentes, e mostrou como o valor de cada item é calculado.",
      "r": "**Como validar:** o vendedor explica por que o perfil sai por peso e o vidro por área. **Por quê:** o valor do item vem da categoria. **Fonte:** VEN-PED-008, CAD-PRO-020.",
      "s": "d"
     },
     {
      "t": "O consultor explicou os status do pedido e o que cada ação muda: encerrar, cancelar, excluir e faturar.",
      "r": "**Como validar:** o cliente diz quando usar encerrar e quando usar cancelar. **Por quê:** pedido encerrado não cancela depois; só pedido `Em aberto` se exclui. **Fonte:** VEN-STA-003, VEN-STA-005, VEN-EXC-001.",
      "s": "d"
     },
     {
      "t": "O consultor deu, com o vendedor, um desconto acima da faixa livre e mostrou o pedido em `Aprovação pendente`, a aprovação pelo gestor em `Vendas > Aprovações` e a volta a `Em aberto`.",
      "r": "**Como validar:** o pedido pendente não fatura nem encerra. **Por quê:** é o controle de desconto que o cliente pediu. **Fonte:** VEN-PED-034.",
      "s": "d"
     },
     {
      "t": "O consultor faturou com o cliente um pedido de teste até a nota autorizada em homologação, e mostrou os títulos gerados conforme a decisão de pedido ou nota.",
      "r": "**Como validar:** o pedido fica `Faturado` e os títulos aparecem no contas a receber. **Por quê:** é a ligação direta com Faturamento e Financeiro. **Fonte:** VEN-FAT-001, VEN-FAT-006, VEN-TIT-005.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a ordem de cancelamento: cancelar a nota → excluir os títulos → cancelar o pedido com motivo de pelo menos 10 caracteres.",
      "r": "**Como validar:** o cliente vê a recusa quando tenta pular a ordem. **Por quê:** pedido com nota ativa ou títulos vinculados não cancela. **Fonte:** VEN-STA-004, VEN-STA-007, VEN-STA-008.",
      "s": "d"
     },
     {
      "t": "Quando aplicável, o consultor demonstrou o faturamento parcial (pedido filho com o saldo) e a liberação para Expedição de um pedido faturado.",
      "r": "**Como validar:** o pedido filho aparece; item físico sem peso é recusado na liberação. **Por quê:** entrega por etapas é comum em obra. **Fonte:** VEN-DES-001, VEN-EXP-001, VEN-EXP-003.",
      "s": "d"
     },
     {
      "t": "Se PRO: o consultor treinou a rotina mensal da comissão com o gestor (aprovar, fechar o período, extrato e pendências), e o faturamento pelo contrato de fornecimento.",
      "r": "**Como validar:** o gestor fecha um período de teste; o pedido vinculado ao contrato só vira nota pelo `Faturar` do contrato. **Por quê:** é rotina de fim de mês. **Fonte:** VEN-COM-011, VEN-COM-014, VEN-CTR-013, VEN-CTR-017.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Peça a cada perfil que execute a sua parte sem ajuda: o vendedor lança, o gestor aprova, quem fatura fatura e cancela. Use um caso real que passe pelos módulos da cadeia. Registre os números como evidência.",
    "passos": [
     {
      "t": "O vendedor lançou sozinho um pedido completo, que nasceu `Em aberto`, com impostos e parcelas certos.",
      "r": "**Como validar:** anote o número do pedido. **Por quê:** é a operação diária do vendedor. **Fonte:** VEN-PED-001, VEN-PED-015.",
      "s": "d",
      "campo": "Número do pedido de teste"
     },
     {
      "t": "O gestor aprovou sozinho um desconto acima da alçada, e o vendedor confirmou que não vê o próprio pedido na fila de aprovação.",
      "r": "**Como validar:** login de cada um. **Por quê:** prova que a alçada e os perfis estão certos. **Fonte:** VEN-PED-034.",
      "s": "d"
     },
     {
      "t": "O cliente levou um pedido até a nota autorizada em homologação e conferiu os títulos com a condição de pagamento.",
      "r": "**Como validar:** número e chave da nota; parcelas iguais à condição. **Por quê:** é o teste ponta a ponta da cadeia. **Fonte:** VEN-FAT-001; README da cadeia, teste ponta a ponta.",
      "s": "d"
     },
     {
      "t": "O cliente cancelou sozinho um pedido de teste faturado, na ordem nota → títulos → pedido, e explicou por que a ordem importa.",
      "r": "**Como validar:** o pedido fica `Cancelado`, com motivo. **Por quê:** é o erro mais frequente no pós go-live. **Fonte:** VEN-STA-004, VEN-STA-007, VEN-STA-008.",
      "s": "d"
     },
     {
      "t": "O cliente explicou o que acontece com a ordem de produção quando cancela um pedido que já está em produção.",
      "r": "**Como validar:** a explicação bate com a regra. **Por quê:** a ordem não é cancelada; fica marcada e alguém precisa tratar. **Fonte:** VEN-STA-009.",
      "s": "d"
     },
     {
      "t": "Se PRO: o gestor conferiu a comissão prevista de uma nota de teste e achou em pendências um pedido sem vendedor.",
      "r": "**Como validar:** a comissão aparece `Prevista`; o pedido sem vendedor está em pendências. **Por quê:** é a conferência mensal que o gestor fará sozinho. **Fonte:** VEN-COM-003, VEN-COM-004.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Antes de virar, limpe os testes e confira as decisões que não mudam depois, como regime da comissão e origem do abatimento do contrato. No go-live, fique perto dos primeiros pedidos reais. Só libere o Faturamento com o checklist de Vendas assinado.",
    "passos": [
     {
      "t": "Pedidos, notas, títulos e comissões de teste foram cancelados ou excluídos antes do go-live.",
      "r": "**Como validar:** as listas não têm testes. **Por quê:** teste esquecido entra nas metas e no contas a receber. **Fonte:** VEN D, aceite; VEN-MET-002.",
      "s": "d"
     },
     {
      "t": "Se PRO: regime e base da comissão foram confirmados pelo gestor **antes da primeira nota real**.",
      "r": "**Como validar:** ata assinada. **Por quê:** mudar depois vale só para comissões novas e não recalcula as antigas. **Fonte:** VEN-COM-024; README da cadeia, decisão X6.",
      "s": "d"
     },
     {
      "t": "Os pedidos em aberto do sistema antigo foram lançados ou importados, e o cliente sabe que pedidos com data antiga entram nas metas dos meses antigos.",
      "r": "**Como validar:** contagem de pedidos abertos igual à origem. **Por quê:** o realizado das metas usa a data do pedido. **Fonte:** VEN-MET-002; VEN C, pré-requisitos do cliente.",
      "s": "d"
     },
     {
      "t": "O cliente foi avisado dos comportamentos que afetam o uso: o percentual de comissão no vendedor depende do módulo CRM, a chave de reduzir comissão na devolução não tem efeito e o pedido só se vincula a contrato em `Em aberto` ou `Encerrado`.",
      "r": "**Como validar:** os avisos estão na ata. **Por quê:** evita configurar algo que não funciona como o rótulo sugere. **Fonte:** VEN D, aceite; VEN-CTR-004.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanha com o key user os pedidos reais: CFOP certo, títulos sem duplicar entre pedido e nota, cancelamentos na ordem certa e pedidos parados em aprovação.",
      "r": "**Como validar:** amostra semanal de pedidos e títulos. **Por quê:** erro de CFOP e de origem dos títulos só aparece no Financeiro. **Fonte:** README da cadeia, decisões X1 e X2; Apostila do Consultor, go-live.",
      "s": "d"
     },
     {
      "t": "O checklist de Vendas foi assinado com todos os itens obrigatórios marcados, e só então o Faturamento foi liberado; o ambiente segue em homologação até a validação de Faturamento e Financeiro.",
      "r": "**Como validar:** checklist assinado e ciência na ata. **Por quê:** a cadeia segue Vendas → Faturamento → Financeiro. **Fonte:** VEN D, uso e aceite; README da cadeia comercial.",
      "s": "d",
      "campo": "Data de liberação do Faturamento"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Os CFOPs de saída estão revisados com o contador e a origem do contas a receber (pedido ou nota) está decidida em ata.",
    "s": "d"
   },
   {
    "t": "O vendedor lança pedido sozinho, com valor, impostos e parcelas certos.",
    "s": "d"
   },
   {
    "t": "A alçada de desconto funciona, quando usada, e o gestor aprova sozinho.",
    "s": "d"
   },
   {
    "t": "Um pedido chegou à nota autorizada em homologação e os títulos batem com a condição.",
    "s": "d"
   },
   {
    "t": "O cliente cancela na ordem nota → títulos → pedido e sabe a diferença entre encerrar, cancelar e excluir.",
    "s": "d"
   },
   {
    "t": "Comissão, metas e contratos, quando contratados, estão configurados e conferidos com um caso real.",
    "s": "d"
   }
  ],
  "atencao": [
   "CFOP com a marcação de gerar financeiro errada obriga condição e parcelas em remessa, ou deixa venda sem título (VEN-PED-001, VEN-PED-017).",
   "Pedido com títulos gerados fica travado para campos financeiros; para alterar valores, exclua os títulos antes (VEN-PED-025).",
   "Pedido encerrado não pode ser cancelado depois; use encerrar só para venda sem nota (VEN-STA-003, VEN-STA-005).",
   "Cancelar pedido não cancela a ordem de produção, que fica marcada (VEN-STA-009).",
   "Desconto que vem do CEM não passa pela alçada (VEN-PED-034).",
   "Regime e base da comissão decididos depois da primeira nota real não recalculam as comissões antigas (VEN-COM-024).",
   "Pedido vinculado a contrato de fornecimento não cancela e não vira nota sem passar pelo `Faturar` do contrato (VEN-CTR-017).",
   "Na versão 1.22.12, as lixeiras de item e de parcela do pedido removiam sem confirmação; oriente o cliente a conferir antes de clicar."
  ],
  "naoValidado": [
   "O rótulo do campo que marca se o CFOP gera financeiro não foi confirmado; confira na tela de CFOP antes de ensinar.",
   "A continuação da numeração antiga do pedido (informar o primeiro número à mão e os seguintes seguirem) é inferência da fonte; teste em homologação.",
   "Uma regra diz que o pedido vinculado ao contrato pode estar “não faturado”, mas a fonte registra que só `Em aberto` ou `Encerrado` são aceitos; confira na tela.",
   "O rótulo da chave de reduzir a comissão na devolução diverge do status que a comissão assume; confira na tela e não configure essa chave como se tivesse efeito.",
   "A Apostila lista importar, cadastrar e aprovar pedido e faturar; a gestora acrescenta alçada, comissão, metas e contratos. Confira com a coordenação o escopo contratado antes de treinar o PRO.",
   "Os roteiros de vídeo de Vendas não foram conferidos contra a versão atual (alçada de desconto e pedido sem Financeiro são posteriores); confira na tela antes de usá-los no treinamento."
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
  "titulo": "Implantação de Faturamento",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação do Faturamento (NF-e e NFS-e), do levantamento à primeira nota real em produção.",
  "objetivo": "Ao final, o faturista do cliente fatura um pedido, transmite a nota, corrige com CC-e, cancela dentro do prazo e gera devolução sem ajuda, e sabe ler o que o sistema aponta quando a nota não sai. O Faturamento liga o comercial ao fiscal, ao estoque e ao financeiro: um CFOP mal marcado ou uma série errada aparecem como título faltando, estoque errado ou nota rejeitada. Todo teste é em **homologação**, com o responsável fiscal do cliente presente.",
  "rodape": "Checklist de implantação · Faturamento · fontes: Faturamento C, A e D da metodologia, README da cadeia comercial, Apostila do Consultor (Módulo Faturamento; Diagnóstico de nota fiscal), FAQ de limitações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "A Fundação está concluída: empresa com regime, IE, CNAE e endereço com cidade do IBGE, e certificado A1 válido em cada empresa que emite.",
    "r": "**Como validar:** abrir `Configurações > Empresas` e `Faturamento > Configurações > Certificados` com o cliente. **Por quê:** a lista de pendências da transmissão barra endereço sem IBGE e certificado vencido. **Fonte:** CAD-EMP-001, CAD-EMP-006, FAT-TRA-001.",
    "s": "d"
   },
   {
    "t": "A configuração fiscal foi feita com o contador do cliente (CFOP, NCM, CST/CSOSN) antes do primeiro teste de nota.",
    "r": "**Como validar:** checklist do Fiscal com os itens de configuração marcados. **Por quê:** o Faturamento só é implantado depois de Vendas e das regras fiscais; erro fiscal costuma vir de cadastro. **Fonte:** Apostila do Consultor, Módulo Faturamento; Fiscal C.",
    "s": "d"
   },
   {
    "t": "Vendas está implantado e há pelo menos um pedido de venda real do cliente `Em aberto` (digitado ou importado do CEM) para faturar no treinamento.",
    "r": "**Como validar:** abrir `Vendas > Pedidos de Venda` e localizar o pedido. **Por quê:** o fluxo começa no pedido; treinar com nota avulsa não prepara o faturista. **Fonte:** README da cadeia comercial, ordem de implantação.",
    "s": "d"
   },
   {
    "t": "A série e o último número de NF-e (e de RPS, se emite NFS-e) do sistema antigo foram levantados com o cliente.",
    "r": "**Como validar:** número e série anotados, conferidos com a última nota emitida. **Por quê:** o número é dado na transmissão e nunca volta; sem a série certa, a numeração colide com a antiga. **Fonte:** FAT-TRA-002.",
    "s": "d",
    "campo": "Série e último número do sistema antigo"
   },
   {
    "t": "O módulo Faturamento aparece sem cadeado, o cliente sabe o que é PRO (Demonstrativos, Pacote do Contador, Envio de Demonstrativos, MDF-e) e está definido se ele tem o Financeiro.",
    "r": "**Como validar:** navegar no menu com o cliente e registrar em ata. **Por quê:** sem Financeiro a nota não gera título nem pede plano de contas. **Fonte:** FAT-GER-001, FAT-IND-004, FAT-TIT-007.",
    "s": "d"
   },
   {
    "t": "Plano de contas, condições e meios de pagamento e portadores estão cadastrados (cliente com Financeiro).",
    "r": "**Como validar:** abrir os cadastros e conferir que há conta analítica para receita de venda. **Por quê:** a nota exige plano de contas quando o CFOP gera financeiro. **Fonte:** FAT-NFE-001.",
    "s": "d"
   },
   {
    "t": "O ambiente de NF-e e de NFS-e está em homologação e o responsável fiscal do cliente está identificado e agendado para os testes.",
    "r": "**Como validar:** conferir o ambiente no assistente de certificados; nome do responsável na ata. **Por quê:** transmitir nota no treinamento só em homologação e com o responsável fiscal. **Fonte:** FAT-GER-002; Faturamento C, resultado esperado.",
    "s": "d",
    "campo": "Responsável fiscal do cliente"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Faça esta conversa com o faturista e o responsável fiscal juntos; quando o assunto for CFOP e textos legais, chame o contador. Você não decide tributação: registra as respostas e leva a lista de CFOPs para o contador aprovar. Peça uma nota antiga de venda (XML) para comparar depois.",
    "passos": [
     {
      "t": "O consultor perguntou: quais CFOPs o cliente usa em cada operação (venda dentro e fora do estado, remessa, retorno, devolução, bonificação) e qual é o padrão na venda?",
      "r": "**Como validar:** lista de CFOPs por operação registrada e enviada ao contador. **Por quê:** é o CFOP que decide se a nota gera título e mexe no estoque. **Fonte:** FAT-NFE-001, FAT-NFE-002; decisão X1 da cadeia.",
      "s": "d",
      "campo": "Lista de CFOPs por operação"
     },
     {
      "t": "O consultor perguntou: quem gera o contas a receber hoje, o pedido (cobrança antecipada) ou a nota? A resposta foi combinada com quem implanta o Financeiro.",
      "r": "**Como validar:** decisão registrada em ata. **Por quê:** se o pedido gerou os títulos, a nota não gera de novo; decidir errado dá título em dobro ou faltando. **Fonte:** FAT-TIT-001; decisão X2 da cadeia.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente emite NFS-e? Em qual prefeitura, no padrão Nacional ou tradicional? A prefeitura emite por upload de arquivo? Exige código de tributação municipal?",
      "r": "**Como validar:** prefeitura e padrão anotados; cidade conferida como homologada no provedor antes do kickoff. **Por quê:** município por upload não é suportado e a transmissão é recusada. **Fonte:** FAT-NFS-005, FAT-NFS-016.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente vende produto e serviço (instalação) no mesmo pedido? O serviço tem código LC 116 no cadastro do produto?",
      "r": "**Como validar:** exemplo real de pedido com instalação identificado. **Por quê:** o serviço do pedido sai em NFS-e vinculada, por uma ação própria. **Fonte:** FAT-NFS-012, CAD-PRO-004.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente faz remessa para pintura ou beneficiamento, venda para entrega futura, entrega em obra ou tem contrato de fornecimento?",
      "r": "**Como validar:** operações especiais listadas com um exemplo de cada. **Por quê:** cada uma usa tela ou caminho próprio (Controle de Terceiros, Vendas futuras, endereço da obra, faturar pelo contrato). **Fonte:** FAT-TER-001, FAT-TER-011, FAT-TRA-015, VEN-CTR-017.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem emite a nota, quem pode cancelar, emitir CC-e e inutilizar numeração? Quem recebe o aviso de vencimento do certificado?",
      "r": "**Como validar:** nomes e papéis registrados. **Por quê:** o perfil Faturista emite, mas não cancela, não emite CC-e nem inutiliza; o aviso de certificado não vai para o faturista. **Fonte:** FAT-GER-001, FAT-IND-003; decisão X8 da cadeia.",
      "s": "d",
      "campo": "Quem emite, quem cancela"
     },
     {
      "t": "O consultor perguntou: qual é a UF do emitente? O cliente usa nota gerencial (sem SEFAZ)? Vai dividir a obra em níveis de faturamento?",
      "r": "**Como validar:** UF e decisões anotadas em ata. **Por quê:** o prazo de cancelamento muda por UF; nota gerencial e Faturamento em Nível mudam o treinamento. **Fonte:** FAT-CAN-005, FAT-FIN-002, INT-NIV-001; decisão X4 da cadeia.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem recebe a nota por e-mail no cliente final e se o cliente quer logo e cor na DANFE.",
      "r": "**Como validar:** amostra de clientes com o contato definido. **Por quê:** sem contato marcado com \"E-mail Notas Fiscais\", a nota não chega ao cliente final. **Fonte:** FAT-OPE-005, CAD-CON-002, CAD-EMP-013.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure na ordem da metodologia: conferência fiscal, CFOP, textos fiscais, NFS-e, perfis e numeração. Faça com o responsável fiscal ao lado e deixe o cliente executar o que ele vai manter depois. Nada vai para produção nesta etapa.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: Fiscal configurado com o contador, Vendas com pedido real, Financeiro de apoio (plano de contas, condições, portadores) e contatos com \"E-mail Notas Fiscais\".",
      "r": "**Como validar:** checklists de Fundação e Fiscal assinados; cadastros conferidos por amostra. **Por quê:** o financeiro de apoio vem antes porque o pedido e a nota já exigem condição e plano de contas. **Fonte:** README da cadeia, ordem de implantação; Faturamento C, pré-requisitos.",
      "s": "d"
     },
     {
      "t": "O consultor rodou com o cliente o `Fiscal > Onboarding Fiscal` e o `Fiscal > Diagnóstico Fiscal` e corrigiu o que foi apontado antes de mexer em CFOP.",
      "r": "**Como validar:** print das telas sem pendência obrigatória. **Por quê:** evita descobrir falha de empresa ou tabela só na primeira nota. **Fonte:** Faturamento C, etapa 1.",
      "s": "d"
     },
     {
      "t": "Cada CFOP da lista aprovada pelo contador foi conferido em `Faturamento > Configurações > CFOP`: descrição, \"Gera Financeiro\", \"Movimenta Estoque\" e \"Devolução\"; o 6949 existe com as mesmas marcas do 5949.",
      "r": "**Como validar:** abrir CFOP a CFOP com o responsável fiscal. **Por quê:** não existe cadastro de natureza de operação, a descrição do CFOP é o texto da DANFE; CFOP de venda sem \"Gera Financeiro\" não gera título. **Fonte:** FAT-NFE-002, FAT-NFE-007, FAT-DEV-008.",
      "s": "d"
     },
     {
      "t": "Os textos legais exigidos pelo contador foram cadastrados em `Faturamento > Configurações > Textos Fiscais` e ligados aos CFOPs certos.",
      "r": "**Como validar:** conferir na DANFE de teste. **Por quê:** o texto entra na nota pelo CFOP. **Fonte:** Faturamento C, etapa 3.",
      "s": "d"
     },
     {
      "t": "Se o cliente emite NFS-e: a `Configuração Guiada` de `Faturamento > Configurações > Certificados` tem tipo de emissão, Série RPS, Número do RPS/DPS e ambiente em homologação, e as Regras Fiscais de Serviço estão cadastradas por código LC 116, cidade e tipo de tomador.",
      "r": "**Como validar:** assistente revisado e uma regra por serviço vendido. **Por quê:** o número é o do RPS/DPS, não o da prefeitura; a regra preenche o ISS. **Fonte:** FAT-NFS-003, FAT-NFS-005.",
      "s": "d"
     },
     {
      "t": "A série e o próximo número da NF-e foram configurados continuando o sistema antigo **antes da primeira transmissão**.",
      "r": "**Como validar:** conferir no assistente a série e o próximo número. **Por quê:** sem a série, o sistema começa no 1 e a SEFAZ rejeita por duplicidade; o número dado não volta. **Fonte:** FAT-TRA-002; decisão X5 da cadeia.",
      "s": "d",
      "campo": "Série e próximo número configurados"
     },
     {
      "t": "Os perfis estão separados: faturistas com o perfil Faturista e quem cancela, emite CC-e ou inutiliza com Supervisor Fiscal (ou perfil próprio); o responsável fiscal recebe o aviso de vencimento do certificado.",
      "r": "**Como validar:** entrar com o login do faturista e ver que `Transmitir` aparece e o cancelamento na SEFAZ não. **Por quê:** quem decide cancelamento precisa ser definido antes do go-live. **Fonte:** FAT-GER-001, FAT-IND-003.",
      "s": "d"
     },
     {
      "t": "Números pulados pelo sistema antigo foram tratados com o contador em `Faturamento > Configurações > Inutilização de Numeração`, só quando ele pediu.",
      "r": "**Como validar:** inutilização registrada com justificativa, ou registro de que não há buraco. **Por quê:** inutilizar é ato fiscal; só com o contador. **Fonte:** FAT-OPE-002.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Ensine o processo, não a tela: quando faturar, o que o sistema exige, o que acontece em estoque, financeiro e expedição. Use pedidos reais do cliente, em homologação, com o responsável fiscal presente. Grave o treinamento, deixe o faturista conduzir o mouse a partir da segunda nota e registre as dúvidas.",
    "passos": [
     {
      "t": "O consultor apresentou nesta sequência: o que o CFOP decide → faturar o pedido → lista de pendências da transmissão → transmitir → efeitos da autorização → DANFE, XML e e-mail → CC-e → cancelamento → devolução.",
      "r": "**Como validar:** roteiro do treinamento registrado na OS. **Por quê:** é o caminho da nota na operação; ensinar fora de ordem esconde a causa dos erros. **Fonte:** Apostila do Consultor, Módulo Faturamento; Faturamento C, etapa 8.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "Com um pedido real do cliente, o consultor usou `Faturar` em `Vendas > Pedidos de Venda`, salvou a NF-e `Em Aberto` e mostrou o pedido passar a `Faturado`; num faturamento parcial, mostrou a nota com sufixo /2.",
      "r": "**Como validar:** a nota de teste está na lista de `Faturamento > Notas Fiscais`. **Por quê:** é o dia a dia do faturista: a nota nasce do pedido, não é digitada. **Fonte:** FAT-NFE-001; Faturamento D, testes.",
      "s": "d"
     },
     {
      "t": "Antes de transmitir, o consultor leu com o cliente a lista de pendências que o sistema mostra (cliente sem CEP, item sem NCM, CFOP incompleto) e mostrou onde corrigir cada uma.",
      "r": "**Como validar:** o cliente aponta o cadastro certo para cada pendência. **Por quê:** a lista é o checklist técnico da nota; lê-la inteira evita chamado ao suporte. **Fonte:** FAT-TRA-001; Apostila, Diagnóstico de nota fiscal.",
      "s": "d"
     },
     {
      "t": "O consultor transmitiu em homologação e explicou: o número é dado na transmissão e nunca volta, a data de emissão é a do dia, não se clica duas vezes e a resposta pode levar até 5 minutos.",
      "r": "**Como validar:** nota `Autorizada` com chave e protocolo; número igual à série configurada. **Por quê:** clique duplo e pressa geram as principais dúvidas da primeira semana. **Fonte:** FAT-TRA-002, FAT-TRA-003, FAT-TRA-004, FAT-TRA-005.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou os efeitos da autorização na operação real: estoque baixado, títulos em Contas a Receber, comissão prevista e liberação para a expedição.",
      "r": "**Como validar:** abrir o estoque, os títulos e o histórico da nota de teste. **Por quê:** o faturista precisa saber que a nota alimenta outros setores sem digitação. **Fonte:** FAT-TRA-008; Apostila, Módulo Faturamento.",
      "s": "d"
     },
     {
      "t": "O consultor simulou uma rejeição (por exemplo, NCM inválido), corrigiu o cadastro e retransmitiu, mostrando que a rejeição não consome número; explicou o aviso de nota presa há 24h.",
      "r": "**Como validar:** nota passa de `Rejeitada` para `Autorizada`; pedido continua `Faturado`. **Por quê:** rejeição é rotina; o cliente precisa corrigir sem pânico. **Fonte:** FAT-TRA-007, FAT-TRA-017.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a `Carta de Correção` (só em nota autorizada, justificativa de pelo menos 15 caracteres) e o `Reenviar Email` para o contato marcado.",
      "r": "**Como validar:** CC-e autorizada com PDF; e-mail recebido. **Por quê:** são as correções mais pedidas depois que a nota sai. **Fonte:** FAT-OPE-001, FAT-OPE-005.",
      "s": "d"
     },
     {
      "t": "O consultor cancelou uma segunda nota de teste e explicou o prazo da UF do cliente, a justificativa mínima e a ordem: estornar recebimento → tirar da carga de expedição → cancelar; depois gerou uma devolução com `Gerar Devolução`.",
      "r": "**Como validar:** nota `Cancelada`, títulos excluídos, pedido volta a `Em aberto`; devolução com a nota referenciada. **Por quê:** cancelamento fora de ordem é recusado; devolução hoje recalcula impostos e o contador confere. **Fonte:** FAT-CAN-002, FAT-CAN-004, FAT-CAN-005, FAT-DEV-007.",
      "s": "d"
     },
     {
      "t": "Se o cliente presta serviço: o consultor mostrou a NFS-e na ordem salvar → `Finalizar NF` → `Transmitir` e, no pedido com produto e instalação, `Faturar` e `Faturar serviços (NFS-e)`.",
      "r": "**Como validar:** NFS-e autorizada com número e código de verificação; ISS conforme a regra. **Por quê:** hoje o RPS só é numerado no `Finalizar NF`; pular o passo trava a transmissão. **Fonte:** FAT-NFS-001, FAT-NFS-012.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Agora o faturista faz e você só observa. Use um pedido diferente do usado no treinamento. Se ele travar, anote onde e repita o ponto; não marque o item se você precisou conduzir.",
    "passos": [
     {
      "t": "O faturista faturou sozinho um pedido novo, transmitiu em homologação e conferiu que o número saiu na sequência da série configurada.",
      "r": "**Como validar:** nota `Autorizada` feita pelo login do faturista. **Por quê:** é a tarefa diária do módulo. **Fonte:** FAT-TRA-002; Faturamento D, testes.",
      "s": "d"
     },
     {
      "t": "Diante de uma pendência de transmissão preparada pelo consultor (cliente sem CEP ou item sem NCM), o cliente disse qual cadastro corrigir e corrigiu.",
      "r": "**Como validar:** pendência resolvida sem ajuda. **Por quê:** a maioria dos erros de emissão vem de produto, cliente ou dados fiscais. **Fonte:** FAT-TRA-001; Apostila, Diagnóstico de nota fiscal.",
      "s": "d"
     },
     {
      "t": "O cliente baixou a DANFE e o XML e conferiu, com o XML antigo, a natureza da operação, os textos legais e a logo.",
      "r": "**Como validar:** comparação feita com o responsável fiscal. **Por quê:** diferença na natureza ou nos textos aparece para o cliente final e para o contador. **Fonte:** FAT-NFE-007.",
      "s": "d"
     },
     {
      "t": "O cliente emitiu uma CC-e e reenviou a nota por e-mail para o contato marcado.",
      "r": "**Como validar:** CC-e autorizada; e-mail recebido. **Por quê:** correções e reenvio são pedidos frequentes. **Fonte:** FAT-OPE-001, FAT-OPE-005.",
      "s": "d"
     },
     {
      "t": "Quem tem permissão cancelou uma nota de teste e explicou o que acontece com títulos, estoque, comissão e pedido, e qual é o prazo de cancelamento da UF.",
      "r": "**Como validar:** nota `Cancelada` e explicação correta. **Por quê:** cancelar fora do prazo só com deferimento da SEFAZ. **Fonte:** FAT-CAN-003, FAT-CAN-005.",
      "s": "d"
     },
     {
      "t": "O cliente gerou uma devolução de venda a partir de nota autorizada e o contador conferiu os valores.",
      "r": "**Como validar:** valores aprovados pelo contador, diferenças anotadas. **Por quê:** hoje a devolução recalcula pelas regras atuais em vez de espelhar a original. **Fonte:** FAT-DEV-005, FAT-DEV-007.",
      "s": "d",
      "campo": "Conferência do contador"
     },
     {
      "t": "O cliente explicou quem gera o contas a receber (pedido ou nota) e mostrou que a nota de teste não duplicou títulos.",
      "r": "**Como validar:** títulos conferidos em Contas a Receber. **Por quê:** título em dobro é o erro mais caro da cadeia. **Fonte:** FAT-TIT-001.",
      "s": "d"
     },
     {
      "t": "O cliente abriu o Dashboard do Faturamento e viu as notas de teste autorizadas contadas e as canceladas fora.",
      "r": "**Como validar:** print do dashboard. **Por quê:** é como o gestor acompanha o faturado. **Fonte:** FAT-IND-001.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "A virada é por documento (NF-e e NFS-e podem virar em dias diferentes) e com o responsável fiscal presente. Marque a primeira nota real com o cliente e acompanhe em produção assistida. Cada ocorrência vira OS.",
    "passos": [
     {
      "t": "Todos os itens obrigatórios do checklist de validação do Faturamento estão marcados e as notas de teste da homologação foram canceladas ou excluídas.",
      "r": "**Como validar:** checklist assinado pelo cliente. **Por quê:** o go-live do Faturamento e a liberação do Financeiro dependem dele. **Fonte:** Faturamento D.",
      "s": "d"
     },
     {
      "t": "O ambiente foi trocado para produção por documento e o emitente foi sincronizado de novo; a série e o próximo número de produção continuam a numeração do sistema antigo.",
      "r": "**Como validar:** conferir no assistente de certificados. **Por quê:** a numeração é independente por ambiente; série errada colide com notas antigas. **Fonte:** FAT-GER-002, FAT-TRA-002.",
      "s": "d"
     },
     {
      "t": "A primeira NF-e real (e a primeira NFS-e, se houver) foi emitida com o consultor acompanhando, e número e chave foram conferidos com o cliente.",
      "r": "**Como validar:** nota autorizada em produção. **Por quê:** a primeira nota real confirma série, certificado e ambiente. **Fonte:** Faturamento C, etapa 10.",
      "s": "d",
      "campo": "Data e número da primeira nota real"
     },
     {
      "t": "O cliente foi avisado das limitações atuais: a devolução ainda não espelha os tributos da nota original, a NFS-e ainda pede o passo `Finalizar NF` e, na Focus NFe, não há contingência real.",
      "r": "**Como validar:** registro em ata. **Por quê:** evita que o cliente trate limitação conhecida como erro dele. **Fonte:** FAT-DEV-007, FAT-NFS-001, FAT-TRA-016.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou rejeições, notas presas em processamento, cancelamentos perto do prazo, notas que não chegaram por e-mail e títulos duplicados ou faltando.",
      "r": "**Como validar:** ocorrências registradas em OS. **Por quê:** essas são as falhas que aparecem só com volume real. **Fonte:** Apostila do Consultor, go-live com produção assistida.",
      "s": "d",
      "campo": "Ocorrências das primeiras semanas"
     },
     {
      "t": "O faturista sabe o que fazer com o aviso de vencimento do certificado e quem o renova.",
      "r": "**Como validar:** responsável e procedimento registrados. **Por quê:** com o certificado vencido nenhuma nota é transmitida. **Fonte:** FAT-IND-003, FAT-CER-002.",
      "s": "d"
     },
     {
      "t": "Critério para liberar o Financeiro: notas reais autorizando sem rejeição recorrente, títulos nascendo certos da nota (ou do pedido, conforme a decisão) e checklist do Faturamento assinado.",
      "r": "**Como validar:** conferir uma semana de notas contra os títulos gerados. **Por quê:** o Financeiro depende de títulos corretos vindos do Faturamento. **Fonte:** Faturamento D; Apostila, Módulo Financeiro.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O faturista fatura, transmite, corrige com CC-e, cancela dentro do prazo e gera devolução sem ajuda.",
    "s": "d"
   },
   {
    "t": "A primeira nota real saiu na sequência do sistema antigo, no ambiente de produção.",
    "s": "d"
   },
   {
    "t": "Os CFOPs, textos fiscais e regras de serviço usados foram aprovados pelo contador.",
    "s": "d"
   },
   {
    "t": "Os títulos nascem uma vez só, do pedido ou da nota, conforme a decisão registrada.",
    "s": "d"
   },
   {
    "t": "Os perfis separam quem emite de quem cancela, e o responsável fiscal recebe o aviso do certificado.",
    "s": "d"
   }
  ],
  "atencao": [
   "Transmitir a primeira nota sem a série configurada: a numeração começa no 1, colide com a do sistema antigo e o número dado não volta.",
   "CFOP de venda com \"Gera Financeiro\" desligado não gera título; CFOP de remessa ligado pede plano de contas sem necessidade.",
   "Título em dobro quando o pedido já gerou os títulos e ninguém combinou isso com o Financeiro.",
   "Treinar ou transmitir em produção antes do go-live; teste é sempre em homologação, com o responsável fiscal.",
   "Faturista com o perfil Faturista tentando cancelar: o perfil não cancela, não emite CC-e nem inutiliza.",
   "Contato do cliente final sem \"E-mail Notas Fiscais\": a nota sai, mas não chega a ele.",
   "Cancelamento fora da ordem (título recebido ou pedido em carga de expedição) é recusado; e fora do prazo da UF só com deferimento da SEFAZ.",
   "Prefeitura que emite NFS-e por upload ou não homologada no provedor: descobrir no kickoff, não na primeira nota real."
  ],
  "naoValidado": [
   "Transmissão em lote: a página da regra diz que é PRO, mas a leitura do sistema indica que é liberada em todas as versões. Conferir na licença do cliente antes de oferecer (FAT-TRA-011).",
   "Nota gerencial (`Finalizar NF`): a metodologia diz que gera financeiro e comissão; a lista de limitações registra que, nos testes, a finalização não movimentou estoque e que uma finalização com falha pode consumir o número. Conferir na tela antes de ensinar.",
   "A mensagem de falta de Inscrição Municipal manda ir a `Cadastros > Empresas`, mas o caminho é `Configurações > Empresas`. Conferir na tela.",
   "O que o `Diagnóstico Fiscal` verifica não foi detalhado na metodologia. Conferir na tela antes de usá-lo como garantia.",
   "Onde o texto fiscal ligado ao CFOP aparece na DANFE e se soma com as informações complementares não tem regra oficial. Conferir na DANFE de teste.",
   "Não está confirmado se o Dashboard do Faturamento separa notas de homologação e de produção. Conferir antes do go-live."
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
  "titulo": "Implantação do Fiscal",
  "subtitulo": "Checklist para o consultor conduzir a configuração fiscal do Faktory Flow **com o contador do cliente** e verificar se cada operação típica calcula certo antes do primeiro faturamento real.",
  "objetivo": "Ao final, o responsável fiscal do cliente sabe onde cada informação tributária entra no sistema (empresa, CFOP, NCM, NCM por Estado), lê o aviso que aparece no item quando falta cadastro e corrige sozinho. **O contador do cliente é peça central:** ele decide regime, CST, alíquotas, MVA, benefícios e textos legais, e confere os valores calculados. O consultor não define tributação; mostra onde cada resposta do contador entra e conduz os testes.",
  "rodape": "Checklist de implantação · Fiscal · fontes: Fiscal C, A e D da metodologia, Apostila do Consultor (Módulo Fiscal; Processos fiscal, de expedição e de projetos e obras), Apostila de Procedimentos (atenção fiscal), FAQ de limitações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "O contador do cliente está identificado, ciente do projeto e com agenda para a configuração e para os testes de cálculo.",
    "r": "**Como validar:** nome do contador e datas registrados em ata. **Por quê:** toda alíquota, CST, MVA e benefício vem dele; sem o contador, a etapa não começa. **Fonte:** Fiscal C e D; Apostila de Procedimentos, atenção fiscal.",
    "s": "d",
    "campo": "Contador do cliente"
   },
   {
    "t": "A Fundação está concluída: cada empresa com regime, CNAE, IE e endereço com cidade do IBGE, certificado A1 válido e ambiente em homologação.",
    "r": "**Como validar:** checklist da Fundação assinado. **Por quê:** sem regime nada calcula; IE e IBGE entram nas obrigações. **Fonte:** FIS-APL-002, FIS-ONB-001.",
    "s": "d"
   },
   {
    "t": "A versão contratada permite o regime de todas as empresas do cliente, o módulo Fiscal está na licença e o cliente sabe o que é PRO (Escrituração SPED, Perfil SUFRAMA, Mapa de Apuração, MDF-e).",
    "r": "**Como validar:** conferir a assinatura e registrar em ata. **Por quê:** Presumido, Real e excesso de sublimite só em certas versões. **Fonte:** CAD-EMP-005, FIS-ICM-013, FAT-IND-004.",
    "s": "d"
   },
   {
    "t": "Os NCMs usados pelo cliente estão cadastrados e os produtos têm NCM, origem e categoria.",
    "r": "**Como validar:** amostra dos produtos mais vendidos. **Por quê:** sem NCM o imposto não é calculado. **Fonte:** FIS-CTX-002.",
    "s": "d"
   },
   {
    "t": "Os participantes têm UF e as marcas de IE, \"Não Contribuinte\" e \"Produtor Rural\" revisadas na carga.",
    "r": "**Como validar:** amostra de 10 clientes, entre PF e PJ. **Por quê:** essas marcas decidem DIFAL, FCP e CSOSN. **Fonte:** FIS-CTX-007, FIS-CTX-008.",
    "s": "d"
   },
   {
    "t": "O material foi pedido ao contador com antecedência: planilha NCM × tributação, CSTs por CFOP, UFs de venda com ST e exceções, benefícios, textos legais e XML de notas antigas de cada operação.",
    "r": "**Como validar:** material recebido antes da reunião de configuração. **Por quê:** sem ele a configuração vira chute. **Fonte:** Fiscal C, informações do cliente e do contador.",
    "s": "d",
    "campo": "Material recebido do contador"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Faça esta reunião com o responsável fiscal e o **contador** presentes. Seu papel é perguntar e registrar onde cada resposta vai entrar no sistema; quando o cliente pedir sua opinião sobre tributação, devolva a pergunta ao contador. Registre as respostas em ata.",
    "passos": [
     {
      "t": "O consultor perguntou ao contador: qual é o regime de cada CNPJ, há excesso de sublimite e a empresa industrializa (é contribuinte de IPI)?",
      "r": "**Como validar:** regime e tipo de atividade por CNPJ na ata. **Por quê:** o regime separa CSOSN de CST; sem \"Tipo de Atividade\" industrial, o IPI não é destacado como deveria. **Fonte:** FIS-APL-002, FIS-APL-004, FIS-ICM-001.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: para quais UFs o cliente vende, se vende a consumidor final não contribuinte em outra UF (PF, obra, construtora sem IE) e se vende para construtora com IE para uso na obra.",
      "r": "**Como validar:** UFs e tipos de cliente listados. **Por quê:** decide DIFAL e FCP; IPI na base do ICMS para contribuinte consumidor final precisa ser conferido com o contador. **Fonte:** FIS-DIF-001, FIS-DIF-004, FIS-IPI-003.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: algum NCM vendido tem substituição tributária? Para quais UFs, com qual MVA e modalidade? O cliente revende mercadoria que já veio com ST?",
      "r": "**Como validar:** lista de NCMs com ST por UF. **Por quê:** todo NCM com ST precisa de linha por UF de destino, senão o ST sai zerado com aviso. **Fonte:** FIS-IST-001, FIS-IST-002, FIS-IST-008.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: há redução de base, diferimento ou isenção por NCM ou UF, com qual cBenef? No Simples, há crédito de ICMS (CSOSN 101) e qual a alíquota por competência?",
      "r": "**Como validar:** benefícios e alíquota de crédito registrados. **Por quê:** cada um entra num campo diferente (NCM, NCM por Estado, Alíquota de Crédito do Simples). **Fonte:** FIS-ICM-003, FIS-ICM-006, FIS-NCM-007.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: PIS e COFINS seguem as alíquotas do regime ou são próprias? Há NCM monofásico ou alíquota zero? A empresa prestadora no Lucro Presumido ou Real sofre retenções federais?",
      "r": "**Como validar:** alíquotas anotadas. **Por quê:** as retenções federais ainda não têm campo na tela da empresa e exigem o suporte. **Fonte:** FIS-PCO-001, FIS-PCO-007, FIS-RET-003.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente presta serviço (instalação)? Qual código LC 116, município, alíquota de ISS e retenções de ISS e INSS?",
      "r": "**Como validar:** serviços e retenções listados. **Por quê:** alimentam as Regras Fiscais de Serviço, configuradas com o Faturamento. **Fonte:** FIS-ISS-001, FIS-ISS-003, FIS-RET-005.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o cliente vende para Zona Franca ou ALC, importa ou exporta? Algum cliente tem CNPJ alfanumérico?",
      "r": "**Como validar:** respostas em ata. **Por quê:** ZFM exige Perfil SUFRAMA (Enterprise); importação não tem cálculo automático; exportação zera impostos. **Fonte:** FIS-ICM-013, FIS-CTX-009, FIS-GER-002, FIS-GER-005.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou ao contador quais alíquotas de CBS e IBS ele quer em 2026 e se o Simples vai antecipar a reforma.",
      "r": "**Como validar:** decisão do contador registrada. **Por quê:** preencher a alíquota plena em 2026 multiplica a CBS/IBS calculada. **Fonte:** FIS-APL-007, FIS-CBS-002.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem entrega EFD ICMS/IPI, EFD Contribuições, Sintegra e GNRE? O contador gera no sistema dele ou no Flow? A apuração será a do Flow ou a do contador?",
      "r": "**Como validar:** responsável por obrigação definido por escrito. **Por quê:** decide se haverá configuração de SPED, Sintegra e GNRE ou só o envio de arquivos ao contador. **Fonte:** Fiscal C, etapa 8; FIS-APU-003.",
      "s": "d",
      "campo": "Quem entrega cada obrigação"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure na ordem: empresa, CFOP, NCM e NCM por Estado, crédito do Simples, SUFRAMA, textos fiscais, Onboarding e obrigações. Depois de cada etapa, calcule um item de teste. O contador aprova; o responsável fiscal digita, para aprender onde mantém cada cadastro.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: Fundação assinada; CFOPs revisados quanto a financeiro, estoque e descrição (Faturamento); Regras Fiscais de Serviço e NFS-e na empresa (Faturamento). A configuração fiscal termina antes do primeiro teste de NF-e e, de preferência, antes de importar o primeiro orçamento real.",
      "r": "**Como validar:** checklists anteriores conferidos. **Por quê:** o motor fiscal já é usado pelo pedido de venda. **Fonte:** Fiscal C, quando implantar; Apostila do Consultor, Módulo Fiscal.",
      "s": "d"
     },
     {
      "t": "Em `Configurações > Empresas`, cada empresa tem \"Regime de Apuração\" e \"Tipo de Atividade\"; no Lucro Presumido ou Real, as alíquotas de PIS e COFINS; \"CBS (%)\" e \"IBS (%)\" vazios ou com o valor do contador; e o CPF do contador em \"CPF/CNPJ do Contador\".",
      "r": "**Como validar:** tela da empresa revisada com o contador. **Por quê:** CBS/IBS com a alíquota plena em 2026 sai dezenas de vezes maior; o SPED exige CPF. **Fonte:** FIS-APL-002, FIS-APL-004, FIS-PCO-001, FIS-CBS-002.",
      "s": "d"
     },
     {
      "t": "Cada CFOP da lista do contador tem CST de ICMS (Presumido/Real) e/ou CSOSN (Simples), CST de IPI, PIS, COFINS, CBS e IBS, e \"Aplicar ICMS\", \"Aplicar PIS\" e \"Aplicar COFINS\" marcados nos tributados.",
      "r": "**Como validar:** abrir CFOP a CFOP em `Fiscal > Configurações > CFOP` com o contador. **Por quê:** a lista padrão não traz CST de ICMS, PIS e COFINS; desmarcado, o imposto não é aplicado. **Fonte:** FIS-CST-001, FIS-CFO-007, FIS-APL-001.",
      "s": "d"
     },
     {
      "t": "Os NCMs usados têm alíquotas, reduções, IVA-ST, FCP, CSTs e CEST (quando há ST), e cada NCM com ST ou exceção tem uma linha em \"NCM por Estado\" para cada UF de destino.",
      "r": "**Como validar:** conferir com a planilha do contador em `Fiscal > Configurações > NCM`; para muitas UFs, usar a importação. **Por quê:** sem a linha da UF, o ST sai zerado e o DIFAL usa a alíquota errada. **Fonte:** FIS-NCM-005, FIS-IST-002, FIS-DIF-003.",
      "s": "d"
     },
     {
      "t": "Se aplicável: alíquota de crédito do Simples cadastrada por competência em `Fiscal > Alíquota de Crédito do Simples` e Perfil SUFRAMA criado e vinculado aos clientes (Enterprise).",
      "r": "**Como validar:** item de teste com o crédito ou a desoneração esperada. **Por quê:** sem alíquota, o crédito sai zero; o perfil SUFRAMA hoje só aplica a redução de ICMS. **Fonte:** FIS-ICM-003, FIS-SUF-002, FIS-SUF-004.",
      "s": "d"
     },
     {
      "t": "Os textos legais do contador foram cadastrados em `Fiscal > Configurações > Textos Fiscais` e ligados ao **CFOP**.",
      "r": "**Como validar:** texto aparece na DANFE de teste. **Por quê:** hoje o texto ligado ao NCM, ao NCM por Estado ou ao perfil SUFRAMA ainda não sai na nota. **Fonte:** FIS-TXT-002, FIS-TXT-003.",
      "s": "d"
     },
     {
      "t": "O `Fiscal > Onboarding Fiscal` está sem pendência obrigatória em cada empresa e o `Fiscal > Diagnóstico Fiscal` mostra as tabelas do cliente completas (ou há chamado aberto).",
      "r": "**Como validar:** prints das duas telas. **Por quê:** o Onboarding confere empresa e tabelas, não os NCMs e CFOPs do cliente; só os testes garantem o cálculo. **Fonte:** FIS-ONB-001, FIS-ONB-003.",
      "s": "d"
     },
     {
      "t": "O responsável fiscal recebeu o perfil Supervisor Fiscal (ou perfil próprio) e o cliente sabe que as tabelas de estados, CST, CSOSN, CEST e LC 116 são mantidas pela Faktory.",
      "r": "**Como validar:** perfil conferido e ciência registrada em ata. **Por quê:** o cliente não altera tabela global; correção é pedida ao suporte. **Fonte:** FIS-GER-003, FIS-TAB-002.",
      "s": "d"
     },
     {
      "t": "Conforme a decisão sobre obrigações: Sintegra e GNRE configurados em homologação e, se o cliente gera SPED no Flow, chamado aberto para o suporte cadastrar o responsável fiscal e a configuração de escrituração.",
      "r": "**Como validar:** parâmetros salvos ou chamado registrado. **Por quê:** hoje o SPED depende de cadastros que não têm tela; não prometa o SPED antes disso. **Fonte:** Fiscal C, etapa 8.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine o responsável fiscal com o **contador presente** nos testes de cálculo. Use produtos e clientes reais, em pedido ou nota `Em aberto`, lendo a aba de impostos do item. A cada operação, peça ao contador que confirme os valores antes de seguir. Grave e registre as dúvidas.",
    "passos": [
     {
      "t": "O consultor apresentou o fluxo fiscal nesta sequência: configuração fiscal → venda → faturamento → compra → recebimento → conferência dos impostos, mostrando qual cadastro alimenta cada etapa.",
      "r": "**Como validar:** roteiro registrado na OS. **Por quê:** erros fiscais costumam vir de cadastro ou parametrização, não do documento. **Fonte:** Apostila do Consultor, Processos fiscal, de expedição e de projetos e obras.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "Com um produto típico do cliente, o consultor calculou uma venda interna a contribuinte e mostrou, na aba de impostos do item, de onde vem cada valor (CFOP, NCM, NCM por Estado, empresa).",
      "r": "**Como validar:** valores conferidos pelo contador, sem aviso no item. **Por quê:** é a operação mais comum e a base para entender as outras. **Fonte:** FIS-ICM-008; Fiscal D, testes de cálculo.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a regra de ouro: quando falta cadastro, o documento salva com imposto zerado e aviso no item; o cliente aprendeu a procurar o aviso em todo teste.",
      "r": "**Como validar:** provocar um aviso (item sem CST) e lê-lo com o cliente. **Por quê:** imposto zerado sem ninguém ver o aviso vira nota errada. **Fonte:** FIS-CTX-010, FIS-CST-001.",
      "s": "d"
     },
     {
      "t": "O consultor calculou as operações que o cliente usa: interestadual a contribuinte, a não contribuinte (DIFAL e FCP), com ST, com IPI e, se houver, em empresa do Simples, com o contador conferindo cada uma.",
      "r": "**Como validar:** uma linha por operação com o visto do contador. **Por quê:** cada operação depende de um cadastro diferente. **Fonte:** FIS-DIF-002, FIS-IST-004, FIS-IPI-003, FIS-APL-003.",
      "s": "d",
      "campo": "Operações conferidas pelo contador"
     },
     {
      "t": "O consultor mostrou como sobrescrever a alíquota de ICMS de um item e usar `Recalcular`, e quando isso é aceitável.",
      "r": "**Como validar:** valor novo no item e PIS/COFINS recalculado. **Por quê:** ajuste pontual é legítimo; ajuste recorrente indica cadastro errado. **Fonte:** FIS-AJU-002, FIS-AJU-003.",
      "s": "d"
     },
     {
      "t": "O consultor ligou o fiscal às compras: entrada com cálculo de impostos, conferência de divergências no recebimento e, em importação, lançamento manual dos impostos do documento.",
      "r": "**Como validar:** cliente explica o que confere numa entrada. **Por quê:** o fiscal vale também para a compra, não só para a venda. **Fonte:** Apostila do Consultor, Módulo Fiscal; FIS-CTX-009.",
      "s": "d"
     },
     {
      "t": "O consultor percorreu com o cliente as mensagens mais comuns (\"Informe o regime de apuração da empresa\", \"Sem CST\", \"ICMS-ST não calculado: falta a MVA\") e onde corrigir cada uma.",
      "r": "**Como validar:** cliente associa cada mensagem ao cadastro. **Por quê:** é o que ele vai ver quando entrar um produto ou UF nova. **Fonte:** Fiscal C, erros comuns; FIS-APL-002, FIS-IST-002.",
      "s": "d"
     },
     {
      "t": "Se o cliente gera obrigações no Flow, o consultor mostrou com o contador a geração de teste (Sintegra, GNRE ou o diagnóstico de prontidão da Escrituração SPED).",
      "r": "**Como validar:** arquivo ou guia de teste gerado. **Por quê:** o contador precisa validar o arquivo antes da primeira competência real. **Fonte:** Fiscal C, etapa 8.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "O responsável fiscal faz, o contador confere, você observa. Monte casos com produtos e UFs diferentes dos usados no treinamento. Item só marca se o cálculo saiu sem aviso e o contador aprovou.",
    "passos": [
     {
      "t": "O responsável fiscal calculou sozinho cada operação típica do cliente sem aviso no item, e o contador aprovou os valores.",
      "r": "**Como validar:** lista de operações com o visto do contador. **Por quê:** é o resultado esperado da implantação fiscal. **Fonte:** Fiscal C, resultado esperado; Fiscal D, testes de cálculo.",
      "s": "d"
     },
     {
      "t": "Diante de um item com aviso preparado pelo consultor (NCM sem linha para a UF ou CFOP sem CST), o cliente disse qual cadastro corrigir, corrigiu e recalculou.",
      "r": "**Como validar:** aviso some depois do `Recalcular`. **Por quê:** o cliente vai cadastrar produtos e UFs novas sem o consultor. **Fonte:** FIS-IST-002, FIS-CST-001.",
      "s": "d"
     },
     {
      "t": "O cliente transmitiu em homologação uma NF-e de cada operação típica e todas foram autorizadas sem rejeição de NCM ou CEST.",
      "r": "**Como validar:** notas autorizadas na lista. **Por quê:** o cálculo certo precisa passar também pela SEFAZ. **Fonte:** Fiscal D, testes de cálculo; Faturamento D.",
      "s": "d"
     },
     {
      "t": "O contador conferiu os valores de uma devolução de venda e a diferença em relação à nota original foi registrada.",
      "r": "**Como validar:** registro da diferença em ata. **Por quê:** hoje a devolução recalcula pelas regras atuais em vez de espelhar a nota original. **Fonte:** FAT-DEV-007; Fiscal D, testes de cálculo.",
      "s": "d"
     },
     {
      "t": "O contador conferiu CBS e IBS calculados em 2026 numa venda de empresa do Lucro Presumido ou Real e a diferença de base foi anotada.",
      "r": "**Como validar:** valores e observação em ata. **Por quê:** a base de CBS/IBS ainda difere da orientação vigente e o contador precisa saber. **Fonte:** FIS-CBS-001, FIS-APL-007.",
      "s": "d"
     },
     {
      "t": "O cliente explicou que tabelas de estados, CST, CSOSN, CEST e LC 116 são da Faktory e como pedir correção ao suporte.",
      "r": "**Como validar:** explicação correta. **Por quê:** evita que o cliente tente contornar com ajuste manual. **Fonte:** FIS-TAB-002.",
      "s": "d"
     },
     {
      "t": "Se o cliente gera obrigações no Flow: o contador validou o arquivo de teste (Sintegra, SPED no PVA ou guia GNRE).",
      "r": "**Como validar:** evidência da validação. **Por quê:** a primeira entrega real não pode ser o primeiro teste. **Fonte:** Fiscal D, obrigações acessórias.",
      "s": "d",
      "campo": "Validação do contador"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "O primeiro faturamento real só é liberado com a configuração fiscal aprovada pelo contador. Combine com ele a conferência das primeiras notas e da primeira competência. Cada ocorrência vira OS.",
    "passos": [
     {
      "t": "Todos os itens obrigatórios do checklist de validação fiscal estão marcados e assinados pelo cliente e pelo contador; a planilha NCM × tributação e a lista de CFOPs assinadas estão guardadas no projeto.",
      "r": "**Como validar:** documentos na pasta do cliente. **Por quê:** é a condição para liberar o primeiro faturamento real e o registro do que o contador aprovou. **Fonte:** Fiscal D, aceite.",
      "s": "d",
      "campo": "Data da assinatura do contador"
     },
     {
      "t": "O cliente e o contador foram avisados das limitações atuais: devolução sem espelho da nota original, apuração de IPI que lê o crédito pelo sinal, alíquota interestadual hoje fixa na tabela, retenções federais sem campo na empresa e SPED sem tela de configuração.",
      "r": "**Como validar:** registro em ata. **Por quê:** o contador precisa saber o que conferir por fora. **Fonte:** Fiscal D, aceite; FIS-APU-003, FIS-ICM-009, FIS-RET-003.",
      "s": "d"
     },
     {
      "t": "O contador conferiu as primeiras notas reais de cada operação emitidas em produção.",
      "r": "**Como validar:** retorno do contador registrado. **Por quê:** o primeiro volume real mostra cadastros que os testes não cobriram. **Fonte:** Apostila do Consultor, go-live com produção assistida.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou avisos de imposto nos pedidos (como \"NCM-Estado não configurado\"), produtos com NCM novo, vendas para UF nova e rejeições por NCM ou CEST.",
      "r": "**Como validar:** ocorrências registradas em OS. **Por quê:** o aviso de NCM por Estado pode bloquear a emissão da nota. **Fonte:** FAQ de limitações; FIS-IST-002.",
      "s": "d",
      "campo": "Ocorrências das primeiras semanas"
     },
     {
      "t": "O cliente sabe que todo produto novo precisa de NCM e que todo NCM com ST ou exceção precisa de linha para cada UF de destino, combinados com o contador.",
      "r": "**Como validar:** cliente descreve o procedimento de cadastro de produto novo. **Por quê:** a configuração fiscal é contínua, não termina no go-live. **Fonte:** FIS-CTX-002, FIS-IST-002.",
      "s": "d"
     },
     {
      "t": "Na primeira competência fechada, o contador recebeu e conferiu o que foi combinado (pacote do contador, Mapa de Apuração, Sintegra ou SPED).",
      "r": "**Como validar:** confirmação do contador. **Por quê:** fecha o ciclo fiscal com quem responde por ele. **Fonte:** Fiscal C, etapa 8.",
      "s": "d"
     },
     {
      "t": "Critério para liberar o módulo seguinte: Faturamento só emite nota real com o checklist fiscal assinado; Compras e Recebimento seguem depois que uma entrada de teste calculou impostos conferidos pelo contador.",
      "r": "**Como validar:** checklist e entrada de teste conferidos. **Por quê:** a configuração fiscal vem antes de Vendas, Compras e Faturamento. **Fonte:** Apostila do Consultor, Módulo Fiscal; Fiscal D.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Cada operação típica do cliente calcula em homologação sem aviso no item e com valores aprovados pelo contador.",
    "s": "d"
   },
   {
    "t": "Empresa, CFOPs, NCMs e NCM por Estado estão configurados conforme a planilha assinada pelo contador.",
    "s": "d"
   },
   {
    "t": "O responsável fiscal lê os avisos de imposto e sabe qual cadastro corrigir.",
    "s": "d"
   },
   {
    "t": "Está registrado por escrito quem entrega cada obrigação acessória.",
    "s": "d"
   },
   {
    "t": "Cliente e contador conhecem as limitações atuais e o que conferir por fora.",
    "s": "d"
   }
  ],
  "atencao": [
   "Configurar sem o contador ou o consultor decidir CST, alíquota ou benefício: a responsabilidade tributária é do cliente e do contador.",
   "Preencher CBS e IBS com a alíquota plena em 2026: o imposto sai dezenas de vezes maior.",
   "Cliente do Lucro Presumido ou Real com CFOP sem CST de ICMS, PIS e COFINS: a lista padrão não traz esses CSTs e o item fica com aviso.",
   "NCM com ST sem linha para cada UF de destino: o ST sai zerado e a nota pode ser emitida errada.",
   "Tratar o Onboarding Fiscal sem pendência como garantia: ele confere empresa e tabelas, não o cálculo das operações do cliente.",
   "Não olhar o aviso no item: o documento salva com imposto zerado quando falta cadastro.",
   "Prometer a Escrituração SPED antes de o suporte cadastrar o responsável fiscal e a configuração de escrituração.",
   "Escritório contábil informado com CNPJ em \"CPF/CNPJ do Contador\": o SPED exige o CPF."
  ],
  "naoValidado": [
   "Momento do Fiscal na implantação: a Apostila do Consultor dá a ordem Vendas → Faturamento → Fiscal → Financeiro, mas diz no Módulo Fiscal que ele vem antes de Vendas, Compras e Faturamento; a metodologia da gestora o coloca depois da Fundação e antes do primeiro teste de NF-e. Combinar com a coordenação.",
   "A tela do Onboarding Fiscal ainda diz que pendências bloqueiam a liberação para operar, mas a regra vigente diz que ela só informa. Conferir na tela e explicar ao cliente.",
   "A tabela de estados hoje traz 12% de alíquota interestadual em todas as UFs. Conferir com o contador cada UF de venda.",
   "A mensagem de retenção manda preencher as alíquotas em `Configurações > Empresas`, mas a tela da empresa não tem esses campos. Conferir na tela e acionar o suporte.",
   "A alíquota municipal de ISS e os códigos LC 116 não têm item de menu; o ISS pode cair na alíquota padrão do código. Conferir na NFS-e de teste.",
   "O que o Onboarding confere sobre MVA: a metodologia diz que hoje ele não confere a MVA, só a existência da linha. Conferir na tela."
  ]
 },
 {
  "id": "implantacao-financeiro",
  "arquivo": "implantacao-07-financeiro.html",
  "etiqueta": "Consultor · Implantação · Financeiro",
  "titulo": "Implantação do Financeiro",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação do Financeiro: títulos vindos da nota e do recebimento, boleto, baixa, conciliação, carga inicial e saldos.",
  "objetivo": "Ao final, o financeiro do cliente baixa, estorna, concilia o extrato e lê o fluxo de caixa e o DRE sozinho, com títulos nascendo da nota e da compra sem digitação. O módulo fecha a cadeia comercial: se o saldo inicial, a carga de títulos ou o caminho de baixa forem mal combinados, o caixa do cliente fica errado desde o primeiro dia. Boleto e PIX só vão para produção depois dos testes em homologação.",
  "rodape": "Checklist de implantação · Financeiro · fontes: Financeiro C, A e D da metodologia, README da cadeia comercial, Apostila do Consultor (Módulo Financeiro; Processos de compras, produção e financeiro), FAQ de limitações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "A Fundação está concluída: bancos, contas bancárias (ainda sem saldo inicial), portadores, plano de contas analítico aprovado pelo contador, condições e meios de pagamento.",
    "r": "**Como validar:** checklist da Fundação assinado; contas bancárias com saldo inicial em branco. **Por quê:** o saldo inicial depende do tipo de carga, decidido depois. **Fonte:** Financeiro C, pré-requisitos.",
    "s": "d"
   },
   {
    "t": "A NF-e já autoriza em homologação e os CFOPs que geram financeiro foram conferidos com o contador.",
    "r": "**Como validar:** uma nota de teste autorizada com títulos gerados. **Por quê:** o Financeiro só é testado de ponta a ponta quando a nota autoriza. **Fonte:** Financeiro C, quando implantar; FAT-TIT-001.",
    "s": "d"
   },
   {
    "t": "O módulo Financeiro está ativo e foi conferido se o cliente tem PRO, caso queira PIX, pagamentos eletrônicos, DDA ou Open Finance.",
    "r": "**Como validar:** menus `PIX` e `Pagamentos` sem cadeado (se PRO). **Por quê:** sem o módulo, nenhuma nota gera título; sem PRO, esses recursos não aparecem. **Fonte:** FIN-GER-001, FAT-TIT-007.",
    "s": "d"
   },
   {
    "t": "O cliente tem contrato com o provedor de boleto (PlugBoleto/Tecnospeed) ou credenciais do Bradesco Open API, e o banco liberou a cobrança registrada.",
    "r": "**Como validar:** contrato e carta do banco recebidos. **Por quê:** o Flow só integra; sem o provedor e o banco, não há boleto. **Fonte:** Financeiro C, comerciais.",
    "s": "d"
   },
   {
    "t": "O cliente enviou: por banco emissor, carteira, convênio e código do beneficiário; certificado PIX (se PRO); saldo de cada conta na data de corte; relação de títulos em aberto; arquivo OFX de um mês.",
    "r": "**Como validar:** documentos na pasta do cliente. **Por quê:** sem eles a configuração do boleto e a carga inicial param. **Fonte:** Financeiro C, documentos do cliente.",
    "s": "d",
    "campo": "Documentos recebidos"
   },
   {
    "t": "Os contatos dos clientes têm a marca de e-mail de boleto.",
    "r": "**Como validar:** amostra de 10 clientes. **Por quê:** sem a marca, o boleto não chega ao cliente. **Fonte:** CAD-CON-002, CAD-CON-003.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Converse com o responsável financeiro e, nas perguntas de DRE e plano de contas, com o contador. Entenda como o cliente cobra, baixa e concilia hoje antes de propor o caminho no Flow. Registre as decisões em ata: várias delas afetam Vendas e Faturamento.",
    "passos": [
     {
      "t": "O consultor perguntou: em quais bancos o cliente tem conta, quais emitem boleto, com qual carteira e convênio, pelo PlugBoleto ou direto pelo Bradesco? O banco exige o dígito do código do beneficiário?",
      "r": "**Como validar:** lista de contas emissoras com carteira e convênio. **Por quê:** é uma conta por carteira/convênio; hoje a conta com dígito do beneficiário não sincroniza. **Fonte:** FIN-CTA-001, FIN-CTA-002, FIN-BOL-001.",
      "s": "d",
      "campo": "Bancos e convênios de cobrança"
     },
     {
      "t": "O consultor perguntou: o cliente usa protesto, em quantos dias? Baixa por decurso de prazo? Que mensagens saem no boleto?",
      "r": "**Como validar:** padrões aprovados pelo cliente. **Por quê:** viram os Padrões para Boletos de cada conta. **Fonte:** FIN-BOL-006.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o título nasce no pedido (cobrança antecipada) ou na nota? A resposta foi combinada com quem implanta Vendas e Faturamento.",
      "r": "**Como validar:** decisão registrada na ata da cadeia. **Por quê:** se o pedido gerou os títulos, a nota não gera de novo. **Fonte:** VEN-TIT-001, FAT-TIT-001; decisão X2 da cadeia.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: como o cliente dá baixa hoje, à mão, pelo extrato ou pelo retorno do banco? Ficou definido um caminho de baixa por conta.",
      "r": "**Como validar:** caminho por conta registrado. **Por quê:** baixar à mão e conciliar a mesma conta gera recusa ou baixa em dobro. **Fonte:** FIN-EXT-002, FIN-EXT-007.",
      "s": "d",
      "campo": "Caminho de baixa por conta"
     },
     {
      "t": "O consultor perguntou: o cliente recebe por PIX, paga fornecedores por remessa bancária, usa DDA? Importa extrato por OFX ou quer pela API do banco?",
      "r": "**Como validar:** recursos escolhidos e versão conferida. **Por quê:** PIX, pagamentos, DDA e Open Finance são PRO; PIX com vencimento não vale no Banco do Brasil. **Fonte:** FIN-PIX-001, FIN-PAG-001, FIN-EXT-001.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: qual é a data de corte, quantos títulos estão em aberto, o cliente quer histórico de recebidos? O que fazer com boletos já registrados no banco antigo?",
      "r": "**Como validar:** data de corte e tipo de carga registrados. **Por quê:** decide planilha (só em aberto) ou migrador (com histórico) e o saldo inicial. **Fonte:** Financeiro C, carga inicial; decisão X7 da cadeia.",
      "s": "d",
      "campo": "Data de corte"
     },
     {
      "t": "O consultor perguntou ao cliente e ao contador: as despesas são rateadas por obra? O DRE será lido por competência ou por caixa, e com qual estrutura de plano de contas?",
      "r": "**Como validar:** respostas em ata. **Por quê:** rateio exige 100% por projeto no título; o DRE depende do plano de contas analítico. **Fonte:** FIN-CP-002, FIN-IND-003.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem baixa, quem estorna, quem exclui e quem trata devoluções? A comissão dos vendedores é paga no recebimento?",
      "r": "**Como validar:** papéis registrados. **Por quê:** define os perfis; a baixa libera comissão quando o regime é por recebimento. **Fonte:** FIN-GER-001, FIN-BXA-006, FIN-DEV-012.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure na ordem: perfis, contas bancárias, boleto, serviços PRO, extrato e, por último, carga e saldos. Tudo em homologação. Faça a configuração com quem vai manter o financeiro e deixe a carga inicial para o fim, depois dos testes.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: plano de contas e condições de pagamento antes da integração de vendas, CFOPs com \"Gera Financeiro\" conferidos no Faturamento e NF-e autorizando em homologação.",
      "r": "**Como validar:** pedido importado com condição e plano; nota de teste com título. **Por quê:** o financeiro de apoio vem antes da integração porque o pedido já exige condição e plano. **Fonte:** README da cadeia, ordem de implantação; FAT-TIT-001.",
      "s": "d"
     },
     {
      "t": "Os perfis foram montados a partir de \"Financeiro\" e \"Financeiro Básico\", separando quem baixa, quem estorna, quem exclui e quem trata devoluções.",
      "r": "**Como validar:** lista de usuários × perfil conferida com o cliente. **Por quê:** estorno e exclusão mudam o caixa; nem todos devem poder. **Fonte:** FIN-CR-013, FIN-DEV-012.",
      "s": "d"
     },
     {
      "t": "Em `Financeiro > Configurações > Contas Bancárias` há uma conta por carteira/convênio de cobrança e o \"Saldo Inicial\" ainda está em branco.",
      "r": "**Como validar:** lista de contas conferida com o cliente. **Por quê:** o saldo inicial é definido só na carga, conforme o tipo escolhido. **Fonte:** FIN-CTA-001; Financeiro C, etapa 2.",
      "s": "d"
     },
     {
      "t": "O assistente de `Financeiro > Configurações > Boleto` foi concluído em **Homologação** para cada empresa e conta emissora, os Padrões para Boletos foram preenchidos, o dígito do beneficiário ficou em branco e a conta favorita para boleto foi marcada.",
      "r": "**Como validar:** status de credenciais configuradas e conta favorita marcada. **Por quê:** a homologação do boleto é por banco; dígito preenchido bloqueia a sincronização. **Fonte:** FIN-BOL-001, FIN-BOL-006, FIN-CTA-002.",
      "s": "d"
     },
     {
      "t": "Se PRO: em \"Serviços financeiros da conta\" foram ativados Pagamento, DDA e Extrato, o PIX foi habilitado com o certificado da conta e o Open Finance autorizado no banco; a troca de ambiente fica com o administrador.",
      "r": "**Como validar:** serviços ativos na linha da conta. **Por quê:** sem o certificado a conta PIX não cobra. **Fonte:** FIN-PIX-001, FIN-PAG-001, FIN-EXT-001.",
      "s": "d"
     },
     {
      "t": "A planilha de títulos em aberto foi preparada com as colunas obrigatórias, documento com até 10 caracteres, conta de fluxo de caixa analítica e sem duplicidade de empresa, participante, documento e parcela.",
      "r": "**Como validar:** validação da importação sem recusas. **Por quê:** a planilha leva só títulos em aberto; status e baixas são descartados. **Fonte:** FIN-CR-001, FIN-CR-002, FIN-CP-001, FIN-CP-002.",
      "s": "d"
     },
     {
      "t": "Ficou decidido o que fazer com os boletos já registrados no banco antigo: deixar vencer e baixar à mão, ou cancelar no banco e reemitir no Flow.",
      "r": "**Como validar:** decisão registrada em ata. **Por quê:** a importação não traz o boleto; emitir outro gera cobrança em dobro. **Fonte:** Financeiro C, carga inicial.",
      "s": "d",
      "campo": "Decisão sobre boletos antigos"
     },
     {
      "t": "O saldo inicial de cada conta foi definido conforme o tipo de carga: saldo do banco na data de corte (carga só em aberto) ou saldo antes do primeiro movimento migrado (carga com histórico).",
      "r": "**Como validar:** valores conferidos com o extrato bancário. **Por quê:** o campo não tem data e o fluxo de caixa soma todos os movimentos; errar aqui conta dinheiro em dobro. **Fonte:** FIN-IND-002; Financeiro C, carga inicial.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Ensine o ciclo do dinheiro, não as telas soltas: o título nasce da nota ou da compra, é cobrado, recebido ou pago, conciliado e aparece no fluxo e no DRE. Use notas e compras de teste do próprio cliente, em homologação. Grave e deixe o financeiro conduzir a partir do segundo título.",
    "passos": [
     {
      "t": "O consultor apresentou nesta sequência: título nascendo da nota → Contas a Receber → boleto → baixa (manual, retorno ou extrato) → Contas a Pagar da compra → extrato e Mesa de Conciliação → transferências → fluxo de caixa e DRE.",
      "r": "**Como validar:** roteiro registrado na OS. **Por quê:** é o caminho do dinheiro; o cliente entende por que não precisa digitar título. **Fonte:** Apostila do Consultor, Módulo Financeiro; Financeiro C.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "Com uma nota de teste do cliente, o consultor mostrou em `Financeiro > Contas a Receber` um título por parcela, com o número da nota como documento, o plano de contas e o meio da parcela.",
      "r": "**Como validar:** parcelas iguais à condição de pagamento. **Por quê:** é o ponto de ligação com o Faturamento. **Fonte:** FAT-TIT-001, FAT-TIT-002.",
      "s": "d"
     },
     {
      "t": "O consultor gerou um boleto em homologação, acompanhou o registro e o e-mail ao contato, e explicou que o título com boleto só edita Observação e Conta de fluxo de caixa.",
      "r": "**Como validar:** linha digitável e situação de registrado. **Por quê:** editar valor depois do boleto exige cancelar a cobrança. **Fonte:** FIN-CR-005, FIN-CR-006, FIN-BOL-002.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a baixa: data não pode ser futura, o valor informado é o que entrou no caixa, a baixa parcial gera residual, a baixa em lote aplica os mesmos dados e o estorno volta o título a `Em aberto`; num pedido com vendedor, mostrou a comissão liberada.",
      "r": "**Como validar:** títulos recebidos, residual criado e estorno feito. **Por quê:** são as ações diárias do financeiro. **Fonte:** FIN-BXA-001, FIN-BXA-003, FIN-BXA-005, FIN-BXA-006, FIN-EST-001.",
      "s": "d"
     },
     {
      "t": "O consultor explicou que \"cancelar título\" é excluir, que título de nota cancelada é excluído pela própria nota e que baixa manual de título com boleto ativo pede a baixa ao banco.",
      "r": "**Como validar:** cliente repete a regra com as próprias palavras. **Por quê:** evita título excluído à mão e boleto cobrando depois do recebimento. **Fonte:** FIN-CR-007, FAT-CAN-003, FIN-BXA-008.",
      "s": "d"
     },
     {
      "t": "O consultor ligou o Financeiro às compras: títulos a pagar nascendo da nota de recebimento finalizada, rateio por obra fechando 100% e exclusão dos títulos em aberto quando a nota de recebimento é cancelada.",
      "r": "**Como validar:** título a pagar de origem do recebimento conferido. **Por quê:** o contas a pagar também não deve ser digitado. **Fonte:** REC-FIN-007, FIN-CP-002.",
      "s": "d"
     },
     {
      "t": "O consultor importou o OFX do cliente em `Financeiro > Extrato`, conciliou na Mesa de Conciliação, usou `Confirmar sugestões fortes` só para os exatos e mostrou como decidir uma diferença e desfazer uma conciliação.",
      "r": "**Como validar:** movimento conciliado e título recebido na data do extrato; reimportar não duplica. **Por quê:** a conciliação é o controle do caixa real. **Fonte:** FIN-EXT-004, FIN-EXT-007.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o Fluxo de Caixa, o DRE, o Dashboard Financeiro e o painel de `Financeiro > Devoluções`, ligando cada um a uma decisão do dia a dia do cliente.",
      "r": "**Como validar:** cliente localiza saldo previsto, vencidos e resultado do mês. **Por quê:** o módulo existe para o cliente decidir com o caixa certo. **Fonte:** FIN-IND-001, FIN-IND-002, FIN-IND-003, FIN-DEV-012.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "O financeiro do cliente faz e você observa. Use títulos diferentes dos do treinamento. Só marque o item se ele terminou sem você conduzir.",
    "passos": [
     {
      "t": "O financeiro do cliente fez sozinho baixa, baixa em lote, estorno, exclusão e desdobro de títulos de teste.",
      "r": "**Como validar:** acompanhamento da execução. **Por quê:** é a operação diária do módulo. **Fonte:** FIN-BXA-001, FIN-BXA-005, FIN-EST-001, FIN-EXC-001, FIN-DES-003.",
      "s": "d"
     },
     {
      "t": "O cliente conferiu que os títulos da nota de teste batem com a condição de pagamento e não foram gerados em dobro pelo pedido.",
      "r": "**Como validar:** parcelas e valores conferidos. **Por quê:** título em dobro é o erro mais caro da cadeia. **Fonte:** FAT-TIT-001, VEN-TIT-001.",
      "s": "d"
     },
     {
      "t": "Se usa boleto: o cliente emitiu um boleto em homologação, ele foi registrado, liquidado no ambiente de teste e o título ficou `Recebido` sem ação do usuário.",
      "r": "**Como validar:** título recebido com a data e o valor do banco. **Por quê:** a baixa automática é o principal ganho do boleto integrado. **Fonte:** FIN-BOL-001, FIN-BOL-003.",
      "s": "d"
     },
     {
      "t": "O cliente importou um extrato, conciliou um crédito com um título, reimportou o mesmo arquivo sem duplicar e desfez a conciliação.",
      "r": "**Como validar:** movimento conciliado, depois pendente de novo. **Por quê:** o cliente vai conciliar sem o consultor. **Fonte:** FIN-EXT-004, FIN-EXT-007.",
      "s": "d"
     },
     {
      "t": "O cliente fez uma baixa parcial e explicou o residual que ficou para a próxima parcela.",
      "r": "**Como validar:** título original recebido e residual criado. **Por quê:** baixa parcial mal entendida vira título esquecido. **Fonte:** FIN-BXA-003.",
      "s": "d"
     },
     {
      "t": "O cliente fez uma transferência entre contas e conferiu os saldos das duas em `Financeiro > Saldos`.",
      "r": "**Como validar:** saldos corretos. **Por quê:** transferência errada distorce o saldo de duas contas. **Fonte:** FIN-EXT-005.",
      "s": "d"
     },
     {
      "t": "O cliente leu o Fluxo de Caixa e o DRE do mês de teste e o contador confirmou a leitura por competência e por caixa.",
      "r": "**Como validar:** entradas, saídas e saldo explicados pelo cliente. **Por quê:** o DRE só serve se o plano de contas estiver certo. **Fonte:** FIN-IND-003, FIN-IND-004.",
      "s": "d"
     },
     {
      "t": "O cliente explicou por que não deve baixar à mão e conciliar pelo extrato a mesma conta.",
      "r": "**Como validar:** explicação correta, ligada ao caminho decidido na etapa 1. **Por quê:** baixa diferente do extrato é recusada no vínculo. **Fonte:** FIN-EXT-007.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "A carga inicial vem depois dos testes e antes da virada. Reconcilie com o sistema antigo antes de dar o go-live e troque boleto e PIX para produção só depois dos testes aprovados. Acompanhe o primeiro fechamento de mês com o contador.",
    "passos": [
     {
      "t": "Os títulos em aberto foram importados e a quantidade e a soma batem com o relatório do sistema antigo, a receber e a pagar; as recusas da planilha foram tratadas.",
      "r": "**Como validar:** contagem e total da listagem × relatório de origem. **Por quê:** é a reconciliação que libera a virada. **Fonte:** FIN-CR-002, FIN-CP-001; README da cadeia, ordem 7.",
      "s": "d",
      "campo": "Total reconciliado na data de corte"
     },
     {
      "t": "O saldo de cada conta em `Financeiro > Saldos` bate com o extrato do banco na data de corte e o previsto dos primeiros 30 dias no Fluxo de Caixa foi conferido com o cliente.",
      "r": "**Como validar:** comparação conta a conta. **Por quê:** o saldo inicial não tem data e pode contar dinheiro em dobro se o tipo de carga for confundido. **Fonte:** FIN-IND-002.",
      "s": "d"
     },
     {
      "t": "Boleto e PIX foram trocados para produção só depois de emissão, registro, liquidação e baixa aprovados em homologação, e a troca foi feita por quem tem a permissão de administrador.",
      "r": "**Como validar:** ambiente de produção na configuração do boleto e dos serviços da conta. **Por quê:** a homologação é por banco. **Fonte:** Financeiro D, aceite.",
      "s": "d"
     },
     {
      "t": "O cliente foi avisado das limitações atuais: o saldo inicial não tem data, a conta com dígito do beneficiário não sincroniza e o cancelamento do PIX ainda não chega ao provedor.",
      "r": "**Como validar:** registro em ata. **Por quê:** o cliente precisa saber o que conferir por fora. **Fonte:** Financeiro D, aceite; FIN-CTA-002.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou os retornos de boleto baixando títulos, a conciliação diária, títulos duplicados ou faltando e a liberação de comissão no recebimento.",
      "r": "**Como validar:** ocorrências registradas em OS. **Por quê:** essas falhas aparecem só com volume real. **Fonte:** Apostila do Consultor, go-live com produção assistida.",
      "s": "d",
      "campo": "Ocorrências das primeiras semanas"
     },
     {
      "t": "No primeiro fechamento de mês, o Fluxo de Caixa e o DRE foram conferidos com o cliente e o contador.",
      "r": "**Como validar:** confirmação do contador. **Por quê:** fecha o ciclo financeiro com quem usa o resultado. **Fonte:** FIN-IND-002, FIN-IND-003.",
      "s": "d"
     },
     {
      "t": "Critério para encerrar a cadeia comercial e seguir para os próximos módulos do escopo: carga reconciliada, saldos batendo com o banco, checklist do Financeiro assinado e um mês fechado sem divergência.",
      "r": "**Como validar:** checklist assinado e mês conferido. **Por quê:** Vendas → Faturamento → Fiscal → Financeiro são os primeiros; os demais seguem o escopo contratado. **Fonte:** Apostila do Consultor, sequência de módulos; Financeiro D.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O financeiro do cliente baixa, estorna, exclui, desdobra e concilia sozinho.",
    "s": "d"
   },
   {
    "t": "Os títulos nascem da nota e da compra uma vez só, conforme a decisão registrada.",
    "s": "d"
   },
   {
    "t": "Os títulos em aberto e os saldos das contas batem com o sistema antigo e com o banco na data de corte.",
    "s": "d"
   },
   {
    "t": "Boleto (e PIX, se PRO) emite, registra e baixa sozinho em produção.",
    "s": "d"
   },
   {
    "t": "O cliente lê o Fluxo de Caixa e o DRE e o contador aprovou a estrutura.",
    "s": "d"
   }
  ],
  "atencao": [
   "Preencher o saldo inicial no cadastro da conta antes de decidir o tipo de carga: o campo não tem data e o caixa pode contar dinheiro em dobro.",
   "Baixar à mão e conciliar pelo extrato a mesma conta: gera recusa no vínculo ou baixa duplicada.",
   "Título em dobro quando pedido e nota geram títulos sem decisão combinada com Vendas e Faturamento.",
   "Dígito do beneficiário preenchido na conta: a sincronização com o provedor do boleto não acontece.",
   "Trocar boleto ou PIX para produção antes de emitir, registrar e liquidar um boleto de teste por banco.",
   "Reemitir no Flow boletos que já estão registrados no banco antigo: o cliente final recebe duas cobranças.",
   "Plano de contas sintético no título ou na planilha: o sistema exige conta analítica.",
   "Contatos sem a marca de e-mail de boleto: o boleto é emitido e não chega ao cliente."
  ],
  "naoValidado": [
   "Conciliação bancária: a Apostila do Consultor fala em conciliação bancária, mas a metodologia da gestora diz que não há mais menu próprio e que a conciliação é feita na Mesa de Conciliação, a partir de `Financeiro > Extrato`. Conferir na tela.",
   "O card \"Recebido no mês\" da tela Início soma o valor original do título numa baixa parcial. Conferir contra o Extrato antes de usá-lo no treinamento.",
   "Bradesco Open API: a tela que configura credencial e certificado não foi localizada e o Bradesco não pede a baixa do boleto sozinho na baixa manual. Conferir na tela com o cliente Bradesco.",
   "`Instruções Bancárias`: o cadastro existe, mas o uso no boleto não foi confirmado. Conferir antes de ensinar.",
   "O efeito de trocar o ambiente do boleto depois de emitir boletos reais não foi verificado. Conferir com o suporte antes da virada.",
   "Que a importação de títulos não traz o boleto do banco antigo é uma inferência da metodologia. Conferir na carga de teste."
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
  "titulo": "Implantação de Compras",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação de Compras, da solicitação ao pedido aprovado e entregue ao Recebimento.",
  "objetivo": "Ao final, o comprador cria solicitações, cota com fornecedores por e-mail, importa as respostas, gera pedidos e acompanha a entrega sem ajuda. O aprovador decide pela alçada e o financeiro sabe onde nasce o contas a pagar. Compras abre a cadeia de suprimentos: um CFOP ou uma alçada mal decididos aqui viram título duplicado, pedido parado e custo errado no estoque.",
  "rodape": "Checklist de implantação · Compras · fontes: manual de implantação COM (gestora), regras COM, checklist D COM, README de Suprimentos (S1–S10), apostila do consultor · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "A Fundação está concluída e assinada, com os fornecedores principais ativos e com **e-mail de cotação** cadastrado.",
    "r": "**Como validar:** abrir o cadastro de três fornecedores principais e ver o e-mail. **Por quê:** a cotação vai ao fornecedor por e-mail; sem ele, o envio falha. **Fonte:** COM-RFQ-004; checklist D COM.",
    "s": "d"
   },
   {
    "t": "Os insumos comprados têm NCM, unidade, categoria com \"Preço calculado por\" e embalagem com fator; perfis e esquadrias têm as características (cor, medidas) exigidas pela categoria.",
    "r": "**Como validar:** amostra de 10 produtos conferida com o comprador. **Por quê:** SC sem NCM não entra na cotação e documento sem característica não grava. **Fonte:** COM-COT-003, COM-SC-001, COM-SC-003.",
    "s": "d"
   },
   {
    "t": "Os CFOPs de entrada (1xxx, 2xxx e 3xxx se importa) de cada natureza usada (Consumo, Produção, Revenda, Ativo Imobilizado) estão cadastrados, com \"gera financeiro\" conferido pelo contador.",
    "r": "**Como validar:** lista de CFOPs assinada pelo contador. **Por quê:** o CFOP do pedido sai da natureza da operação e da origem do fornecedor, e decide se nasce título. **Fonte:** COM-COT-010, COM-PC-002; decisão S1 do README de Suprimentos.",
    "s": "d"
   },
   {
    "t": "Condições de pagamento com parcelas e meios de pagamento estão cadastrados.",
    "r": "**Como validar:** abrir `Compras > Configurações > Condições de Pagamento` e conferir parcelas e dias. **Por quê:** proposta da cotação e pedido com CFOP que gera financeiro não gravam sem condição. **Fonte:** COM-COT-006, COM-COT-009, COM-PC-002.",
    "s": "d"
   },
   {
    "t": "A Conta de Fluxo de Caixa Despesa está no fornecedor ou nos parâmetros da empresa, e o Financeiro (plano de contas) está configurado se a compra gera título.",
    "r": "**Como validar:** cadastro do fornecedor e checklist do Financeiro assinado. **Por quê:** sem a conta, a cotação não gera pedido e o pedido não gera título. **Fonte:** COM-COT-019, COM-PC-010.",
    "s": "d"
   },
   {
    "t": "O saldo inicial do Estoque já foi importado e conferido na data de corte antes de a primeira compra real entrar.",
    "r": "**Como validar:** checklist do Estoque com a carga de saldo assinada. **Por quê:** entrada lançada antes da data de corte nas mesmas variações bagunça saldo e custo médio. **Fonte:** README de Suprimentos, ordem de implantação; EST-MOV-006.",
    "s": "d"
   },
   {
    "t": "As licenças foram conferidas em `Minha Assinatura`: Compras, Compras PRO (se usar Contratos de Entrega), App Aprovações (se aprovar pelo celular) e Recebimento.",
    "r": "**Como validar:** print de `Minha Assinatura`. **Por quê:** recurso sem licença some da tela e frustra o cliente no treinamento. **Fonte:** COM-GER-004, COM-CE-009, COM-PC-011.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Faça uma reunião com o responsável de compras, quem aprova os gastos e alguém do financeiro. Chame o contador para a parte de CFOP. Ouça como compram hoje antes de mostrar tela: o objetivo é sair com as decisões de Compras escritas em ata.",
    "passos": [
     {
      "t": "O consultor perguntou: quem pede material (obra, produção, almoxarifado) e quem compra? O solicitante é a mesma pessoa que o comprador?",
      "r": "**Como validar:** papéis anotados em ata. **Por quê:** define os perfis de solicitante e comprador. **Fonte:** COM-SC-013, COM-COT-015; pergunta P1 do manual COM.",
      "s": "d",
      "campo": "Quem solicita e quem compra"
     },
     {
      "t": "O consultor perguntou: vocês sempre cotam com mais de um fornecedor ou compram direto? Como escolhem o vencedor: preço, prazo ou pagamento, e em que ordem?",
      "r": "**Como validar:** ordem de desempate escrita. **Por quê:** decide se o fluxo passa pela cotação e alimenta as `Regras de Melhor Opção`. **Fonte:** COM-COT-008, COM-COT-009; P2 e P4.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou, com o contador: a compra é para consumo, produção, revenda ou ativo? Há fornecedores de outro estado ou do exterior? Quais compras não geram financeiro (remessa, bonificação, comodato)?",
      "r": "**Como validar:** lista de naturezas e CFOPs de entrada aprovada pelo contador. **Por quê:** o CFOP decide título, estoque e crédito. **Fonte:** COM-COT-010, COM-PC-002; P3 e P6; decisão S1.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o contas a pagar nasce no pedido (pagamento antecipado) ou na nota recebida? E registrou a resposta como decisão única para Compras e Recebimento.",
      "r": "**Como validar:** decisão em ata, assinada pelo financeiro. **Por quê:** título pelo pedido e pela nota ao mesmo tempo duplica a dívida. **Fonte:** COM-PC-005, COM-PC-010; P5; decisão S2.",
      "s": "d",
      "campo": "Títulos nascem no pedido ou na nota"
     },
     {
      "t": "O consultor perguntou: existe aprovação de compra por valor? Por empresa ou obra? Quantos níveis, quais faixas e quem aprova cada uma? O aprovador aprova pelo celular, até que valor?",
      "r": "**Como validar:** tabela de faixas com dois aprovadores por faixa. **Por quê:** quem criou o pedido não aprova; faixa com um só aprovador trava os pedidos dele. **Fonte:** COM-ALC-001 a 005, COM-ALC-009; D-661; P7 e P8.",
      "s": "d",
      "campo": "Faixas e aprovadores"
     },
     {
      "t": "O consultor perguntou: recebem entregas parciais? Usam estoque mínimo para repor insumos? Compram material em nome da construtora? Têm contrato de volume com fornecedor (kg, t, m²)?",
      "r": "**Como validar:** respostas em ata, com os recursos opcionais marcados. **Por quê:** decide pedido residual, Sugestão de Compra, compra por conta do cliente e Contratos de Entrega. **Fonte:** COM-PC-004, COM-SUG-001, COM-PC-012, COM-CE-001; P9 a P12.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: os fornecedores respondem cotação em planilha, PDF ou foto? Quem deve receber o e-mail diário de alertas de Compras?",
      "r": "**Como validar:** exemplo real de resposta de fornecedor guardado para o treinamento. **Por quê:** a resposta é importada pelo comprador; não existe mais link para o fornecedor responder. **Fonte:** COM-RFQ-015, COM-PAR-002; P13 e P14.",
      "s": "d"
     },
     {
      "t": "O consultor levantou os pedidos de compra em aberto no sistema antigo e a última numeração usada.",
      "r": "**Como validar:** planilha dos pedidos ainda não recebidos recebida do cliente. **Por quê:** só o que ainda vai ser recebido entra no Flow; o resto é saldo de estoque e título no Financeiro. **Fonte:** manual COM, seção 4; decisão S10.",
      "s": "d",
      "campo": "Quantidade de pedidos em aberto"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure no ambiente de homologação com o responsável de compras ao lado. Siga a ordem do README de Suprimentos: parâmetros, faixas e perfis primeiro; carga dos pedidos depois; a alçada é a última coisa a ligar.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: Fundação assinada, CFOPs do Fiscal revisados, Financeiro com plano de contas, saldo inicial do Estoque conferido e Recebimento sendo configurado junto.",
      "r": "**Como validar:** checklists dos módulos anteriores assinados. **Por quê:** o pedido depende do CFOP, gera título no Financeiro e termina no Recebimento. **Fonte:** README de Suprimentos, ordem de implantação; manual COM, pré-requisitos.",
      "s": "d"
     },
     {
      "t": "Os `Parâmetros de Compras` foram revisados: ordem das `Regras de Melhor Opção` conforme o cliente, critérios de preço da cotação e \"Usar aprovação por alçada\" **desligado** por enquanto.",
      "r": "**Como validar:** print da tela de parâmetros. **Por quê:** ligar a alçada agora deixa a carga e os testes pendentes de aprovação. **Fonte:** COM-PAR-001, COM-COT-008, COM-ALC-005.",
      "s": "d"
     },
     {
      "t": "As `Faixas de Alçada` foram cadastradas conforme a ata: sem sobreposição no mesmo escopo e nível, última faixa com \"Valor até\" em branco e dois aprovadores por faixa.",
      "r": "**Como validar:** tela de faixas sem aviso de aprovador único. **Por quê:** centro de custo não é escopo; o escopo é geral, empresa ou projeto. **Fonte:** COM-ALC-001, COM-ALC-002, COM-ALC-003, COM-ALC-013.",
      "s": "d"
     },
     {
      "t": "Os perfis foram montados com o responsável: solicitante, comprador (sem poder de aprovar), aprovador, financeiro (gera títulos) e gestor (parâmetros e alçadas).",
      "r": "**Como validar:** entrar com um usuário de cada perfil e ver só o que ele deve fazer. **Por quê:** comprador que aprova o próprio pedido derruba o controle. **Fonte:** COM-SC-013, COM-COT-015, COM-ALC-007, COM-ALC-010.",
      "s": "d"
     },
     {
      "t": "O envio de e-mail do ambiente foi testado com uma cotação de teste, e o PDF do pedido (`Baixar PDF`) saiu no modelo do cliente.",
      "r": "**Como validar:** fornecedor de teste recebeu PDF e planilha; PDF do pedido revisado pelo cliente. **Por quê:** hoje o pedido vai ao fornecedor pelo PDF baixado. **Fonte:** COM-RFQ-004; manual COM, etapa 6.",
      "s": "d"
     },
     {
      "t": "Os pedidos em aberto do sistema antigo foram importados por planilha em `Pedidos de Compra`: só o que ainda vai ser recebido, com o número antigo no documento e sem gerar títulos que já estão no financeiro antigo.",
      "r": "**Como validar:** quantidade e valor batem com o sistema antigo. **Por quê:** cada pedido importado passa pelas mesmas validações do manual e nasce `Em aberto`. **Fonte:** manual COM, seção 4; decisão S10.",
      "s": "d",
      "campo": "Pedidos importados e conferidos"
     },
     {
      "t": "Se o cliente usa os recursos: estoque mínimo cadastrado nos insumos de reposição e `Alertas de Compras` ligados com os destinatários da ata.",
      "r": "**Como validar:** lista de insumos com mínimo e print dos alertas. **Por quê:** a Sugestão de Compra parte do mínimo; o alerta avisa cotação vencendo. **Fonte:** COM-SUG-001, COM-PAR-002.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Ensine o processo, não a tela. Use um insumo real do cliente (um perfil, um vidro, um componente) e dois fornecedores de verdade. Siga a ordem SC → cotação → resposta → vencedor → pedido → aprovação → recebimento → título, ligando cada passo à rotina que o comprador já tem.",
    "passos": [
     {
      "t": "O consultor apresentou a sequência completa no fluxo do cliente: necessidade → solicitação → cotação → pedido → aprovação → recebimento → entrada no estoque, dizendo quem faz cada passo na empresa dele.",
      "r": "**Como validar:** o cliente desenha o fluxo com os nomes das pessoas. **Por quê:** o módulo só funciona se cada papel souber onde entra. **Fonte:** apostila, Processos de compras; README de Suprimentos, seção 1.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "O cliente criou solicitações com produtos reais de cada tipo: perfil com comprimento e cor, vidro com altura e largura, esquadria com cor e medidas, e viu a embalagem arredondar a quantidade (40 vira 50 numa caixa de 50).",
      "r": "**Como validar:** SCs gravadas; SC de perfil sem comprimento recusada. **Por quê:** é a primeira barreira que o solicitante vai encontrar. **Fonte:** COM-SC-001, COM-SC-003.",
      "s": "d"
     },
     {
      "t": "O comprador gerou uma cotação a partir das SCs, informou a Natureza da Operação, enviou por e-mail a dois fornecedores e importou a resposta real de um deles.",
      "r": "**Como validar:** SCs `Em cotação` e propostas gravadas. **Por quê:** o fornecedor não responde mais por link; a resposta é importada (planilha com uma só coluna de preço). **Fonte:** COM-SC-004, COM-COT-010, COM-RFQ-004, COM-RFQ-006, COM-RFQ-007.",
      "s": "d"
     },
     {
      "t": "O comprador usou `Aplicar Melhor Opção`, marcou um vencedor manual e gerou os pedidos, entendendo que todo item precisa de vencedor e que a proposta vencedora precisa de condição de pagamento.",
      "r": "**Como validar:** um pedido por fornecedor vencedor; cotação e SCs `Concluída`. **Por quê:** o vencedor manual é preservado pela Melhor Opção. **Fonte:** COM-COT-007, COM-COT-009; D-166.",
      "s": "d"
     },
     {
      "t": "O comprador criou um pedido manual com CFOP de entrada e condição, viu o preço sugerido pela última compra do fornecedor e entendeu que o pedido não grava item a zero (inclusive o rascunho aberto a partir da SC).",
      "r": "**Como validar:** pedido gravado; item a zero recusado. **Por quê:** é a compra direta, sem cotação, comum em reposição. **Fonte:** COM-PC-001, COM-PC-021, COM-GER-003.",
      "s": "d"
     },
     {
      "t": "O aprovador abriu `Compras > Aprovações`, aprovou um pedido acima da faixa e viu que o autor do pedido não consegue aprová-lo.",
      "r": "**Como validar:** pedido `Aprovado`; tentativa do autor recusada. **Por quê:** pedido pendente não entra no Recebimento nem gera título. **Fonte:** COM-ALC-005, COM-ALC-006, COM-ALC-007; D-661.",
      "s": "d"
     },
     {
      "t": "O comprador acompanhou a entrega no `Follow-up de Entregas`, gerou uma nota de recebimento parcial e viu o pedido virar `Recebido` com o residual `PC-nnnn/2`.",
      "r": "**Como validar:** residual criado e follow-up transferido. **Por quê:** `Recebido` só vem do Recebimento; o Kanban não muda esse status. **Fonte:** COM-PC-004, COM-PC-009, COM-FUP-004.",
      "s": "d"
     },
     {
      "t": "O financeiro gerou os títulos pelo caminho decidido em ata (pedido **ou** nota) e viu que, com títulos gerados, itens e parcelas do pedido travam.",
      "r": "**Como validar:** um título por parcela, sem duplicar. **Por quê:** pedido já recebido não gera título pelo pedido. **Fonte:** COM-PC-005, COM-PC-010; decisão S2.",
      "s": "d"
     },
     {
      "t": "Se o cliente compra em nome da construtora: o consultor mostrou o vínculo do pedido ao contrato de fornecimento **antes** de gerar títulos e o abatimento só depois do recebimento.",
      "r": "**Como validar:** pedido vinculado não gera título; item recebido abatido. **Por quê:** vincular depois deixa dívida lançada numa compra por conta do cliente. **Fonte:** COM-PC-012, VEN-CTR-006.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Agora o cliente conduz e você só observa. Peça cada tarefa com dados novos, sem roteiro na mão. Se ele travar, anote a dúvida e repita o ponto; não faça por ele.",
    "passos": [
     {
      "t": "O comprador fez sozinho o ciclo completo com um insumo real: SC, cotação com dois fornecedores, resposta importada, vencedor e pedido gerado.",
      "r": "**Como validar:** pedido gerado sem ajuda do consultor. **Por quê:** é a rotina diária de Compras. **Fonte:** checklist D COM, teste 3.1.",
      "s": "d"
     },
     {
      "t": "O comprador explicou por que não pode aprovar o próprio pedido e o que fazer quando o pedido fica parado por falta de aprovador.",
      "r": "**Como validar:** resposta certa: outro aprovador da faixa decide; faixa precisa de dois. **Por quê:** é a dúvida mais comum depois de ligar a alçada. **Fonte:** COM-ALC-007, COM-ALC-013; D-661.",
      "s": "d"
     },
     {
      "t": "O comprador resolveu sozinho os bloqueios mais comuns: cotação vencida (editar a validade), item sem vencedor, proposta sem condição e fornecedor sem Conta de Fluxo de Caixa.",
      "r": "**Como validar:** cada situação provocada e resolvida pelo cliente. **Por quê:** são os erros que chegam ao suporte nas primeiras semanas. **Fonte:** COM-COT-002, COM-COT-009, COM-COT-019; D-166.",
      "s": "d"
     },
     {
      "t": "O financeiro mostrou onde nasce o título de uma compra e explicou por que não pode gerar pelo pedido e pela nota ao mesmo tempo.",
      "r": "**Como validar:** contas a pagar com um título por parcela. **Por quê:** nota finalizada não gera título depois; o caminho é cancelar e relançar. **Fonte:** COM-PC-010; decisão S2.",
      "s": "d"
     },
     {
      "t": "O comprador tentou cancelar um pedido com nota de recebimento ativa e explicou a ordem certa: cancelar a nota antes.",
      "r": "**Como validar:** recusa entendida e cancelamento feito na ordem. **Por quê:** evita pedido cancelado com estoque e título vivos. **Fonte:** COM-PC-007.",
      "s": "d"
     },
     {
      "t": "O cliente usou a `Linha do tempo` de um pedido para rastrear SC, cotação, pedido, nota e títulos.",
      "r": "**Como validar:** cliente encontra a origem de um pedido sem ajuda. **Por quê:** é a resposta rápida para \"quem pediu isso e por quê\". **Fonte:** COM-PC-024.",
      "s": "d"
     },
     {
      "t": "O gestor de compras leu o `Follow-up de Entregas` e o painel de Compras e apontou os pedidos atrasados.",
      "r": "**Como validar:** gestor cita um pedido atrasado e o fornecedor. **Por quê:** o follow-up nasce sozinho com o pedido e é o controle de entrega. **Fonte:** manual COM, etapa 9; apostila, Módulo Compras.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Feche a homologação, limpe os testes e ligue a alçada por último. Combine com o cliente a data de virada e acompanhe de perto as primeiras compras reais.",
    "passos": [
     {
      "t": "SCs, cotações e pedidos de teste foram cancelados ou excluídos, e a carga dos pedidos em aberto foi conferida de novo com o sistema antigo.",
      "r": "**Como validar:** listas sem documentos de teste; quantidade e valor da carga batem. **Por quê:** teste esquecido vira entrega fantasma no follow-up. **Fonte:** checklist D COM, configuração.",
      "s": "d"
     },
     {
      "t": "\"Usar aprovação por alçada\" foi ligado depois das faixas e da carga, e o cliente sabe que desligar a chave libera todos os pedidos pendentes.",
      "r": "**Como validar:** print dos parâmetros com a chave ligada e um pedido real caindo na fila. **Por quê:** é o último passo da ordem de implantação. **Fonte:** COM-ALC-005, COM-ALC-008; decisão S3.",
      "s": "d"
     },
     {
      "t": "O teto do app de aprovações foi definido em `Configurações > Aprovações`, se o aprovador decide pelo celular.",
      "r": "**Como validar:** print com o teto combinado. **Por quê:** acima do teto, a aprovação volta para a tela do Flow. **Fonte:** COM-ALC-009.",
      "s": "d"
     },
     {
      "t": "O checklist D de Compras foi assinado pelo consultor, pelo responsável de compras e pelo aprovador.",
      "r": "**Como validar:** documento assinado. **Por quê:** é a condição para liberar Recebimento e Estoque para operação. **Fonte:** checklist D COM, assinatura.",
      "s": "d",
      "campo": "Data do go-live"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou: pedidos parados na fila de aprovação, entregas atrasadas no follow-up, residuais `PC-nnnn/2` esquecidos e títulos duplicados entre pedido e nota.",
      "r": "**Como validar:** revisão semanal com o comprador e o financeiro. **Por quê:** são os sinais de que uma decisão da ata não pegou na rotina. **Fonte:** COM-PC-009, COM-PC-010, COM-ALC-006.",
      "s": "d",
      "campo": "Pendências das primeiras semanas"
     },
     {
      "t": "O critério para seguir ao Recebimento em produção foi cumprido: os passos 1 a 3 do teste ponta a ponta de Suprimentos (cotação, pedido, aprovação por outro usuário) têm evidência.",
      "r": "**Como validar:** números da cotação e do pedido aprovado anotados. **Por quê:** o Recebimento só importa pedido aprovado e em aberto. **Fonte:** README de Suprimentos, teste ponta a ponta; COM-PC-011.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O comprador faz sozinho SC, cotação por e-mail, importação da resposta, escolha do vencedor e pedido.",
    "s": "d"
   },
   {
    "t": "A alçada está ligada com dois aprovadores por faixa e nenhum pedido real parado sem quem aprove.",
    "s": "d"
   },
   {
    "t": "O contas a pagar de cada compra nasce num só lugar (pedido ou nota), como decidido em ata.",
    "s": "d"
   },
   {
    "t": "Os pedidos em aberto do sistema antigo estão no Flow e batem em quantidade e valor.",
    "s": "d"
   },
   {
    "t": "O checklist D de Compras está assinado e Recebimento e Estoque podem operar.",
    "s": "d"
   }
  ],
  "atencao": [
   "Ligar \"Usar aprovação por alçada\" antes da carga deixa todos os pedidos importados pendentes de aprovação. Ligue por último (COM-ALC-005).",
   "Faixa de alçada com um só aprovador trava os pedidos criados por ele, porque quem cria não aprova (COM-ALC-013, D-661).",
   "Gerar títulos pelo pedido e também pela nota duplica a dívida. Decida um caminho em ata e treine os dois setores nele (decisão S2).",
   "CFOP de entrada mal configurado gera título em remessa ou bonificação, ou trava o pedido por falta de condição. Revise com o contador (COM-PC-002).",
   "Hoje o sistema ainda mostra o crédito de imposto de entrada negativo no pedido de compra. Avise o cliente que confere imposto no pedido (COM-PC-018).",
   "Hoje a Sugestão de Compra ainda apura pelo produto, não pela variação (cor e medida). Perfis da mesma referência em cores diferentes somam juntos (D-179).",
   "Hoje o envio do pedido ao fornecedor por e-mail direto da tela do pedido não foi localizado. Ensine o `Baixar PDF` (manual COM, etapa 6).",
   "Vincular o pedido ao contrato de fornecimento depois de gerar títulos deixa dívida lançada numa compra por conta do cliente. Vincule antes (COM-PC-012)."
  ],
  "naoValidado": [
   "Ordem de implantação: a apostila põe Compras depois de Estoque e Produção; o manual da gestora põe Compras logo após a Fundação, junto do Recebimento, com o saldo inicial do Estoque antes. Confirme a sequência no cronograma do cliente.",
   "A página oficial descreve gerar o pedido direto da SC; o manual da gestora diz que hoje `Gerar Pedido de Compra` na SC abre o rascunho do pedido para informar preço. Confira na tela antes de ensinar (COM-SC-009, COM-SC-010).",
   "Os rótulos dos botões de aprovar e rejeitar na fila `Compras > Aprovações` e o do botão de importar pedidos na lista de pedidos não foram confirmados. Confira na tela.",
   "O rótulo da chave aparece como \"Usa aprovação por alçada\" na página oficial e \"Usar aprovação por alçada\" na tela. Use o da tela.",
   "Em `Alertas de Compras`, o texto fala em contratos de fornecimento próximos do fim, mas o alerta é de contrato de entrega. Confira na tela para não confundir com o contrato de Vendas (COM-PAR-002)."
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
  "titulo": "Implantação de Recebimento",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação do Recebimento, da nota do fornecedor à entrada no estoque e no contas a pagar.",
  "objetivo": "Ao final, o recebedor traz as notas do fornecedor pela SEFAZ ou pelo XML, vincula ao pedido de compra, confere a mercadoria e finaliza com estoque, custo e títulos corretos. Ele também sabe cancelar e devolver na ordem certa. O Recebimento é onde a compra vira saldo e dívida: erro aqui aparece no custo do produto e no caixa.",
  "rodape": "Checklist de implantação · Recebimento · fontes: manual de implantação REC (gestora), regras REC, checklist D REC, README de Suprimentos (S1–S10), apostila do consultor · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação, Fiscal e Financeiro estão assinados, e a empresa tem o regime de apuração (e a condição de contribuinte de IPI, se for indústria) cadastrado.",
    "r": "**Como validar:** print do cadastro da empresa e checklists assinados. **Por quê:** o regime decide crédito e custo da entrada. **Fonte:** REC-NR-020, REC-FIN-004; checklist D REC.",
    "s": "d"
   },
   {
    "t": "Os CFOPs de entrada têm \"Gera Financeiro\", \"Movimenta Estoque\" e o papel de terceiros revisados com o contador.",
    "r": "**Como validar:** lista de CFOPs assinada. **Por quê:** o CFOP de cada item decide título, estoque, crédito e controle de terceiros. **Fonte:** REC-NR-016, REC-FIN-003, REC-FIN-011; decisão S1.",
    "s": "d"
   },
   {
    "t": "Os produtos comprados têm unidade de estoque, embalagem com fator, categoria e \"controla estoque\"; as unidades de medida têm as siglas que os fornecedores usam no XML.",
    "r": "**Como validar:** três XML reais dos principais fornecedores pré-validados sem aviso de unidade. **Por quê:** sigla inexistente para a importação; sem fator, a nota não finaliza. **Fonte:** REC-FIN-001, REC-XML-007.",
    "s": "d"
   },
   {
    "t": "Compras está configurado, com a alçada definida e um pedido de compra de teste aprovado.",
    "r": "**Como validar:** número do pedido aprovado. **Por quê:** pedido pendente de aprovação não entra na nota. **Fonte:** REC-NR-007; checklist D COM.",
    "s": "d"
   },
   {
    "t": "Locais de estoque e o almoxarifado central de cada empresa estão prontos, e plano de contas e conta de fluxo padrão estão no Financeiro.",
    "r": "**Como validar:** checklist do Estoque (locais) e do Financeiro. **Por quê:** sem local a entrada falha; sem plano de contas não nasce título. **Fonte:** REC-FIN-006, REC-FIN-007; decisão S6.",
    "s": "d"
   },
   {
    "t": "Se o cliente contratou Recebimento PRO: licença conferida em `Minha Assinatura` e certificado A1 de cada empresa enviado e válido por mais de 30 dias.",
    "r": "**Como validar:** print da assinatura e de `Configurações > Certificados`. **Por quê:** sem PRO não há busca na SEFAZ nem conferência; sem certificado a busca não liga. **Fonte:** REC-DFE-001, REC-DFE-009, REC-DFE-014; decisão S4.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Vá até a doca ou o almoxarifado e veja um recebimento acontecer antes da reunião. Chame quem recebe a mercadoria, quem lança a nota, o financeiro e o contador para a parte fiscal. Saia com as decisões escritas em ata.",
    "passos": [
     {
      "t": "O consultor perguntou: o cliente tem Recebimento PRO? Quais empresas recebem NF-e e todas têm certificado A1 válido? Querem buscar notas sozinhas a cada 30 minutos ou só quando clicarem `Atualizar`?",
      "r": "**Como validar:** lista de empresas com validade dos certificados. **Por quê:** sem PRO, a entrada é só por XML manual, sem vínculo automático de produto e pedido. **Fonte:** REC-DFE-001, REC-DFE-002, REC-DFE-009; perguntas R1 a R3.",
      "s": "d",
      "campo": "Empresas e validade dos certificados"
     },
     {
      "t": "O consultor perguntou: quem responde à SEFAZ (confirmar, não reconhecer, operação não realizada) e quem dá entrada nas notas? Com que frequência?",
      "r": "**Como validar:** responsável e rotina anotados. **Por quê:** a manifestação é uma obrigação fiscal e precisa de dono. **Fonte:** REC-DFE-006; R4.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: toda compra tem pedido de compra? O fornecedor fatura em caixa ou embalagem diferente da unidade de estoque?",
      "r": "**Como validar:** exemplos de notas com caixa anotados. **Por quê:** decide o vínculo nota × pedido e o cadastro de embalagem e fator. **Fonte:** REC-NR-007, REC-XML-007, REC-FIN-001; R5 e R11.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: fazem conferência física antes de dar entrada? Ela deve travar a finalização? Registram avaria com foto? Têm checklist de qualidade, com aprovador diferente de quem responde? Usam coletor ou celular na doca?",
      "r": "**Como validar:** respostas em ata. **Por quê:** definem os parâmetros de conferência, avaria, inspeção e o app da doca. **Fonte:** REC-CON-001, REC-CON-005, REC-CON-007, REC-CON-008; R6 a R9.",
      "s": "d",
      "campo": "Como conferem a mercadoria hoje"
     },
     {
      "t": "O consultor confirmou a decisão de Compras: o título a pagar nasce no pedido ou na nota? E perguntou quem pode alterar imposto de nota importada.",
      "r": "**Como validar:** decisão igual à ata de Compras. **Por quê:** título nos dois lugares duplica a dívida; alterar imposto é tarefa fiscal. **Fonte:** REC-NR-010, REC-FIN-007, REC-XML-003; R10 e R12; decisão S2.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: fazem beneficiamento por terceiros? Têm contrato de fornecimento com construtora que abate por nota recebida? Imprimem etiqueta nos itens recebidos, com qual leitor?",
      "r": "**Como validar:** respostas em ata, com os recursos opcionais marcados. **Por quê:** definem CFOPs de remessa e retorno, origem do abatimento e formato de etiqueta. **Fonte:** REC-FIN-011, VEN-CTR-002, REC-PAR-001; R13 a R15.",
      "s": "d"
     },
     {
      "t": "O consultor levantou as notas de fornecedor em trânsito (emitidas e ainda não recebidas) e confirmou que as notas já recebidas no sistema antigo não serão relançadas.",
      "r": "**Como validar:** lista das notas em trânsito. **Por quê:** não existe importador de nota de recebimento; o já recebido entra como saldo de estoque e título no Financeiro. **Fonte:** manual REC, seção 4; decisão S10.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure em homologação na ordem do manual: CFOPs, busca de notas, parâmetros, checklists e perfis. Use XML reais dos fornecedores principais desde o início; é com eles que os problemas de cadastro aparecem.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto em outros módulos: Fundação (certificado A1), Fiscal (CFOPs), Financeiro (títulos a pagar), Compras (pedido e alçada) e Estoque (locais e saldo inicial).",
      "r": "**Como validar:** checklists dos módulos anteriores assinados. **Por quê:** a finalização da nota mexe em estoque, custo e contas a pagar ao mesmo tempo. **Fonte:** manual REC, pré-requisitos; README de Suprimentos, ordem de implantação.",
      "s": "d"
     },
     {
      "t": "Os CFOPs de entrada foram revisados um a um com o contador em `Recebimento > Configurações > CFOP`, cobrindo revenda, industrialização, uso e consumo, ativo, remessa e retorno.",
      "r": "**Como validar:** lista assinada. **Por quê:** crédito e custo saem do CFOP do item; uso e consumo lançado como revenda gera crédito indevido. **Fonte:** REC-NR-020; D-465; decisão S1.",
      "s": "d"
     },
     {
      "t": "Se PRO: em `Distribuição DFe`, cada empresa ficou com \"Configuração ativa\" e, se o cliente quis, \"Buscar automaticamente a cada 30 minutos\", salvo sem erro.",
      "r": "**Como validar:** cartão mostra \"Última busca automática\" e nenhuma \"Última falha\". **Por quê:** é a porta de entrada das notas. **Fonte:** REC-DFE-001, REC-DFE-002.",
      "s": "d"
     },
     {
      "t": "Os `Parâmetros de Recebimento` foram ligados conforme a ata: conferência física, exigir conferência, avarias, inspeção, segregação na inspeção e formato da etiqueta.",
      "r": "**Como validar:** print da tela. **Por quê:** todos nascem desligados; avaria e inspeção exigem conferência ligada; sem PRO ficam inertes. **Fonte:** REC-PAR-001, REC-PAR-002, REC-CON-001, REC-CON-007.",
      "s": "d"
     },
     {
      "t": "Se o cliente usa inspeção: um único checklist de inspeção ativo foi cadastrado com o responsável de qualidade.",
      "r": "**Como validar:** print de `Checklists de Inspeção`. **Por quê:** checklist já usado não muda; para alterar, desativa e cria outro. **Fonte:** REC-CON-008, REC-CON-010.",
      "s": "d"
     },
     {
      "t": "Os perfis Recebedor, Conferente e Gestor foram criados, e a permissão de alterar imposto de nota importada ficou só com quem cuida do fiscal.",
      "r": "**Como validar:** entrar com um usuário de cada perfil. **Por quê:** quem recebe não deve mexer em imposto nem manifestar à SEFAZ sem combinar. **Fonte:** REC-NR-017, REC-XML-003, REC-DFE-006.",
      "s": "d"
     },
     {
      "t": "Se usa coletor na doca: o app Recebimento foi instalado no aparelho do conferente e os produtos mais recebidos têm código de barras (EAN) cadastrado.",
      "r": "**Como validar:** conferente abre uma nota de teste no app. **Por quê:** o EAN é o que faz a bipagem funcionar. **Fonte:** REC-CON-006.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine com notas reais dos fornecedores do cliente e com o pedido de compra que ele mesmo criou no treinamento de Compras. Siga a ordem: nota chega → manifestação → importação → vínculo ao pedido → conferência → finalização → conferir estoque e títulos → cancelar e devolver.",
    "passos": [
     {
      "t": "O consultor apresentou o caminho da nota no cliente: fornecedor emite → nota chega ao Flow → alguém confirma à SEFAZ → recebedor importa e vincula ao pedido → conferente confere → nota é finalizada e vira estoque e título.",
      "r": "**Como validar:** o cliente diz quem faz cada passo. **Por quê:** a finalização é o ponto sem volta simples; todos precisam saber o que vem antes. **Fonte:** README de Suprimentos, seção 1; apostila, Módulo Recebimento.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "Se PRO: o recebedor usou `Aguardando manifestação`: clicou `Atualizar`, respondeu à SEFAZ com \"Confirmar que recebi\" e abriu a nota com `Receber`.",
      "r": "**Como validar:** nota real saiu da caixa e virou nota de recebimento. **Por quê:** a nota pode levar mais de 30 minutos para aparecer; isso não é erro. **Fonte:** REC-DFE-006, REC-DFE-012; manual REC, etapa 3.",
      "s": "d"
     },
     {
      "t": "O recebedor usou `Importar XML` com um arquivo real, viu o fornecedor novo ser criado e tentou importar o mesmo XML de novo.",
      "r": "**Como validar:** segunda importação avisa a nota já existente. **Por quê:** é o caminho de quem não tem PRO e de notas fora da SEFAZ. **Fonte:** REC-XML-002, REC-XML-004.",
      "s": "d"
     },
     {
      "t": "Na conferência da importação, o recebedor escolheu o produto do Flow para o código do fornecedor e marcou \"Lembrar deste código para as próximas notas deste fornecedor\".",
      "r": "**Como validar:** a segunda nota do mesmo fornecedor já vem com o produto. **Por quê:** é o que reduz a digitação do dia a dia. **Fonte:** REC-XML-008, REC-XML-009.",
      "s": "d"
     },
     {
      "t": "O recebedor vinculou um pedido de 100 a uma nota de 60, finalizou e viu o pedido virar `Recebido` com o residual `PC-nnnn/2`; viu também que quantidade acima do saldo do pedido é recusada e diferença de preço só gera aviso.",
      "r": "**Como validar:** residual com 40 em aberto. **Por quê:** entrega parcial é a regra em esquadrias. **Fonte:** REC-NR-008, REC-NR-009, REC-XML-006.",
      "s": "d"
     },
     {
      "t": "Se usa conferência: o conferente contou ou bipou os itens em `Conferências` (ou no app), concluiu e entendeu que a conferência registra a divergência, mas quem decide a quantidade que entra é a nota.",
      "r": "**Como validar:** divergência aparece no demonstrativo \"Divergências de conferência\". **Por quê:** falta volta por NF-e de devolução, não por ajuste na conferência. **Fonte:** REC-CON-003, REC-CON-004; decisão S5.",
      "s": "d"
     },
     {
      "t": "O recebedor finalizou uma nota em caixa (10 CX de 12) e conferiu no estoque a entrada em unidades (120 UN) com o custo e, no contas a pagar, um título por parcela com origem na nota.",
      "r": "**Como validar:** movimento de estoque e títulos conferidos com o cliente. **Por quê:** liga a nota à operação real do almoxarifado e do financeiro. **Fonte:** REC-FIN-001, REC-FIN-004, REC-FIN-007.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou cancelar uma nota finalizada com motivo e a ordem quando há título pago ou devolução: estornar o pagamento → cancelar a NF-e de devolução → cancelar a nota.",
      "r": "**Como validar:** estoque estornado, títulos excluídos, pedido volta a aberto. **Por quê:** nota finalizada não se edita; o caminho é cancelar e relançar. **Fonte:** REC-CAN-001, REC-CAN-002, REC-CAN-003, REC-NR-014.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou identificar um item incorreto e `Gerar Devolução`, e explicou que o estoque só baixa quando a NF-e de devolução é autorizada no Faturamento.",
      "r": "**Como validar:** NF-e de devolução em rascunho; título inalterado. **Por quê:** é a saída para falta, avaria ou item errado. **Fonte:** REC-DEV-001, REC-DEV-002, REC-DEV-003.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Entregue ao cliente uma nota real nova e deixe-o conduzir do início ao fim. Provoque os erros comuns com dados preparados e observe se ele sabe sair sozinho.",
    "passos": [
     {
      "t": "O recebedor fez sozinho, com uma nota real, o caminho da chegada à finalização, com o pedido de compra vinculado.",
      "r": "**Como validar:** nota finalizada sem ajuda; pedido atualizado. **Por quê:** é a rotina diária do módulo. **Fonte:** checklist D REC, testes ponta a ponta.",
      "s": "d"
     },
     {
      "t": "O recebedor explicou por que uma nota finalizada nunca gera título depois e qual o caminho quando o título faltou.",
      "r": "**Como validar:** resposta certa: cancelar e relançar. **Por quê:** é a dúvida que mais gera retrabalho no financeiro. **Fonte:** REC-FIN-008; decisão S2.",
      "s": "d"
     },
     {
      "t": "O cliente tentou cancelar uma nota com título já pago e seguiu sozinho a ordem de estorno.",
      "r": "**Como validar:** pagamento estornado no Financeiro antes do cancelamento. **Por quê:** a ordem errada é recusada e trava o recebedor. **Fonte:** REC-CAN-002.",
      "s": "d"
     },
     {
      "t": "O recebedor resolveu sozinho os bloqueios de importação: unidade do XML não cadastrada, embalagem sem fator, fornecedor inativo e duplicatas que não fecham com o total (pedir XML correto ao fornecedor).",
      "r": "**Como validar:** cada caso provocado e resolvido. **Por quê:** são os erros das primeiras semanas. **Fonte:** REC-XML-005, REC-XML-007, REC-FIN-001, REC-NR-002.",
      "s": "d"
     },
     {
      "t": "O conferente explicou a diferença entre a quantidade contada e a quantidade que entra no estoque, e mostrou onde ver as divergências.",
      "r": "**Como validar:** conferente abre o demonstrativo e cita uma divergência. **Por quê:** evita ajuste de estoque por conta própria. **Fonte:** REC-CON-004; decisão S5.",
      "s": "d"
     },
     {
      "t": "O responsável pela manifestação mostrou como e quando vai responder às notas da caixa `Aguardando manifestação`.",
      "r": "**Como validar:** rotina combinada com dia e pessoa. **Por quê:** nota sem resposta fica parada e some da rotina. **Fonte:** REC-DFE-006; checklist D REC, treinamento.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Limpe os testes, ligue a busca de notas no ambiente oficial e acompanhe as primeiras notas reais junto com o contador. O primeiro fechamento de custo é o teste de verdade.",
    "passos": [
     {
      "t": "Notas e pedidos de teste foram cancelados ou excluídos antes do go-live.",
      "r": "**Como validar:** listas sem documentos de teste. **Por quê:** nota de teste finalizada mexe em saldo, custo e contas a pagar. **Fonte:** REC-CAN-006; checklist D REC.",
      "s": "d"
     },
     {
      "t": "A busca de notas está ligada no ambiente oficial para cada empresa, e a renovação dos certificados A1 está na agenda do cliente.",
      "r": "**Como validar:** primeira nota real na caixa; data de vencimento anotada. **Por quê:** certificado vencido para a busca; o aviso vem 30 dias antes. **Fonte:** REC-DFE-014; decisão S4.",
      "s": "d",
      "campo": "Vencimento dos certificados A1"
     },
     {
      "t": "As notas em trânsito do sistema antigo entraram pela caixa de manifestação ou por `Importar XML`, sem relançar notas já recebidas.",
      "r": "**Como validar:** lista de notas em trânsito conferida. **Por quê:** relançar nota já recebida duplica saldo e título. **Fonte:** manual REC, seção 4; REC-FIN-009.",
      "s": "d"
     },
     {
      "t": "O checklist D de Recebimento foi assinado pelo consultor e pelo cliente.",
      "r": "**Como validar:** documento assinado. **Por quê:** é a condição para liberar o Estoque e o go-live de Suprimentos. **Fonte:** checklist D REC, assinatura.",
      "s": "d",
      "campo": "Data do go-live"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou: notas paradas em `Aguardando manifestação`, \"Última falha\" na busca, divergências de conferência, títulos duplicados entre pedido e nota e o custo médio das primeiras entradas com o contador.",
      "r": "**Como validar:** revisão semanal com recebedor e contador. **Por quê:** custo e título errados só aparecem no fechamento. **Fonte:** REC-DFE-002, REC-FIN-004, REC-FIN-007; decisão S8.",
      "s": "d",
      "campo": "Pendências das primeiras semanas"
     },
     {
      "t": "O critério para fechar Suprimentos foi cumprido: os passos 4 a 6 do teste ponta a ponta (nota vinculada ao pedido, finalização com saldo e custo, um título só) têm evidência.",
      "r": "**Como validar:** números da nota, do pedido, do título e do movimento de estoque anotados. **Por quê:** fecha a cadeia Compras → Recebimento → Estoque. **Fonte:** README de Suprimentos, teste ponta a ponta.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O recebedor traz, vincula, confere e finaliza notas reais sem ajuda, com pedido de compra vinculado.",
    "s": "d"
   },
   {
    "t": "A busca de notas e a manifestação à SEFAZ têm responsável e rotina (quando há PRO).",
    "s": "d"
   },
   {
    "t": "Cada nota finalizada gera a entrada certa no estoque e um só conjunto de títulos.",
    "s": "d"
   },
   {
    "t": "O cliente cancela e devolve na ordem certa sem chamar o suporte.",
    "s": "d"
   },
   {
    "t": "O checklist D de Recebimento está assinado e o teste ponta a ponta de Suprimentos tem evidência.",
    "s": "d"
   }
  ],
  "atencao": [
   "CFOP de entrada errado no item gera crédito indevido, título em remessa ou nota que não movimenta estoque. Revise com o contador antes da primeira nota real (REC-NR-016, REC-NR-020).",
   "Títulos pelo pedido e pela nota ao mesmo tempo duplicam a dívida; e nota finalizada não gera título depois. Treine Compras e Recebimento na mesma decisão (REC-FIN-008, decisão S2).",
   "Unidade de medida sem a sigla do XML e produto sem embalagem e fator travam a importação. Teste com XML reais antes do go-live (REC-XML-007, REC-FIN-001).",
   "Hoje o custo de entrada ainda vem com IPI e ICMS-ST e sem descontar crédito. Avise o contador antes de ele conferir o custo médio (decisão S8).",
   "Sem Recebimento PRO não há busca na SEFAZ, vínculo automático de produto nem conferência; os parâmetros de conferência ficam sem efeito. Alinhe a expectativa no levantamento (REC-DFE-009, D-198).",
   "Hoje as mensagens do sistema ainda chamam a busca de notas de \"Recebimento > Dfe > Configuração\" e \"Notas pendentes\"; o menu mostra `Distribuição DFe` e `Aguardando manifestação`. Avise o recebedor.",
   "Certificado A1 vencido para a busca de notas sem que o recebedor perceba. Coloque a renovação na agenda do cliente (REC-DFE-014).",
   "Com um só conferente, a segregação na inspeção trava a aprovação. Decida com o cliente e registre em ata (REC-CON-008)."
  ],
  "naoValidado": [
   "Quantidade que entra no estoque: o README de Suprimentos diz que é a da nota; a regra oficial dizia que hoje entra a quantidade conferida. Faça o teste de divergência em homologação antes de ensinar (REC-CON-004, decisão S5).",
   "Custo da entrada: o checklist D espera custo sem o tributo recuperável no regime normal; o README diz que hoje entra cheio, com IPI e ICMS-ST. Confira na tela com o contador (REC-FIN-004, decisão S8).",
   "A apostila trata registrar divergências e avarias como item para todos; o manual da gestora diz que avaria é PRO e exige a conferência física ligada. Confira a licença do cliente antes de prometer.",
   "A página oficial fala em menu \"Aprovações\" para a conferência; o menu mostra `Conferências`. Use o nome da tela.",
   "Os rótulos das janelas de cadastrar unidade e cadastrar fornecedor durante a importação e os nomes dos campos da tela de CFOP não foram confirmados. Confira na tela.",
   "O roteiro de vídeo de notas pendentes é anterior à troca do provedor de busca e ao nome `Aguardando manifestação`. Não use como material sem revisar."
  ]
 },
 {
  "id": "implantacao-estoque",
  "arquivo": "implantacao-10-estoque.html",
  "etiqueta": "Consultor · Implantação · Estoque",
  "titulo": "Implantação de Estoque",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação do Estoque, com foco na data de corte e no saldo inicial, que sustentam todo o resto de Suprimentos.",
  "objetivo": "Ao final, o cliente tem locais e parâmetros decididos, o saldo inicial carregado e conferido na data de corte, e sabe consultar saldo e disponível, transferir, ajustar, estornar e inventariar sozinho. No Faktory Flow o saldo é controlado por características (cor, comprimento, altura, largura): um saldo inicial errado contamina custo médio, compras, produção e faturamento.",
  "rodape": "Checklist de implantação · Estoque · fontes: manual de implantação EST (gestora), regras EST, checklist D EST, README de Suprimentos (S1–S10), apostila do consultor, limitações conhecidas v1.22.12 · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Fundação e Fiscal estão assinados, e o módulo Estoque está ativo em `Minha Assinatura` (com PRO, se o cliente vai usar inventário ou localizações).",
    "r": "**Como validar:** print de `Minha Assinatura` e checklists assinados. **Por quê:** inventário, app de contagem e localizações são PRO. **Fonte:** EST-GER-001; checklist D EST.",
    "s": "d"
   },
   {
    "t": "As categorias de produto têm o **tipo definitivo** (perfil, superfície, componente, esquadria, kit) revisado com o cliente antes de qualquer saldo.",
    "r": "**Como validar:** lista de categorias assinada. **Por quê:** o tipo decide as características do saldo e **trava** quando há saldo; corrigir depois exige zerar ou criar outra categoria. **Fonte:** CAD-CAT-004, EST-MOV-008.",
    "s": "d"
   },
   {
    "t": "Os produtos que controlam estoque têm unidade de medida, \"controla estoque\" marcado, fator de embalagem e preço de custo.",
    "r": "**Como validar:** amostra de 10 produtos conferida. **Por quê:** sem unidade não movimenta; sem controle é ignorado em silêncio; sem custo a sobra de inventário trava. **Fonte:** EST-MOV-009, EST-SLD-003, EST-INT-006, EST-INV-009.",
    "s": "d"
   },
   {
    "t": "As cores usadas nos perfis e vidros estão cadastradas.",
    "r": "**Como validar:** comparar a lista de cores do cliente com o cadastro. **Por quê:** cor sem cadastro vira \"sem cor\" no saldo. **Fonte:** EST-SLD-002.",
    "s": "d"
   },
   {
    "t": "Os CFOPs com \"movimenta estoque\" foram revisados com o contador.",
    "r": "**Como validar:** lista assinada. **Por quê:** documento com CFOP que não movimenta é ignorado pelo estoque. **Fonte:** EST-INT-006; decisão S1.",
    "s": "d"
   },
   {
    "t": "O cliente recebeu com antecedência o modelo da posição física de estoque: produto, cor, medidas em mm, local, quantidade na unidade de estoque e custo unitário.",
    "r": "**Como validar:** responsável e prazo da contagem combinados. **Por quê:** a contagem física é o insumo da carga e leva dias. **Fonte:** manual EST, informações do cliente.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Visite o almoxarifado e veja como o material está guardado e identificado. Reúna o responsável do estoque, o gestor de produção e o contador. As duas decisões críticas desta etapa são a data de corte e a origem do custo inicial: não avance sem elas escritas.",
    "passos": [
     {
      "t": "O consultor perguntou: quais produtos controlam estoque (perfis, vidros, componentes, esquadria pronta, kits)? Quantas empresas guardam material e quais depósitos cada uma tem?",
      "r": "**Como validar:** lista de produtos controlados e de locais por empresa. **Por quê:** cada empresa precisa do seu almoxarifado central; o resto é local livre. **Fonte:** EST-INT-006, EST-LOC-001, EST-LOC-002; perguntas Q1 e Q2.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: precisam saber em qual prateleira ou endereço está o material? E deixou claro que ligar localizações é **irreversível**.",
      "r": "**Como validar:** decisão escrita do cliente (ata ou e-mail). **Por quê:** ligada, toda entrada passa a exigir localização, inclusive a planilha de saldo. **Fonte:** EST-LOC-006, EST-LOC-012; Q5.",
      "s": "d",
      "campo": "Usa localizações (sim/não)"
     },
     {
      "t": "O consultor perguntou: pode produzir ou faturar sem saldo? Lançam movimento com data passada, até quantos dias? Quem pode retirar material reservado para outra obra ou OP?",
      "r": "**Como validar:** política anotada. **Por quê:** define \"Bloquear saída sem saldo\", o limite retroativo e quem mexe no reservado. **Fonte:** EST-MOV-006, EST-MOV-010, EST-PAR-001; Q3, Q4 e Q11.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: a partir de qual comprimento a sobra de perfil vira retalho? E guardam material de cliente na fábrica?",
      "r": "**Como validar:** comprimento mínimo em mm anotado. **Por quê:** vazio, toda sobra vira sucata; material de cliente entra com propriedade \"Cliente\" e valor zero. **Fonte:** EST-PAR-001 (D-304), EST-SLD-007; Q6 e Q10.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou, com o contador: qual é o custo do estoque atual e de onde vem (último preço, médio do sistema antigo, contábil)?",
      "r": "**Como validar:** origem do custo aprovada por e-mail do contador. **Por quê:** o custo da planilha vira o custo médio de abertura de cada posição. **Fonte:** EST-SLD-004, EST-SLD-005; Q7.",
      "s": "d",
      "campo": "Origem do custo inicial"
     },
     {
      "t": "O consultor perguntou: qual é o último dia do sistema antigo? E definiu com o cliente a **data de corte**, depois das últimas notas lançadas lá e da contagem física.",
      "r": "**Como validar:** data em ata, assinada. **Por quê:** a planilha não tem coluna de data: o saldo nasce no dia da importação, e nada pode ser lançado antes nas mesmas variações. **Fonte:** EST-MOV-006, EST-INT-002; Q8; decisão S7.",
      "s": "d",
      "campo": "Data de corte"
     },
     {
      "t": "O consultor perguntou: vão fazer inventário de abertura, geral ou por categoria? Usam estoque mínimo? Fecham o estoque todo mês com a contabilidade?",
      "r": "**Como validar:** respostas em ata, com as três pessoas do inventário nomeadas. **Por quê:** inventário geral para o local inteiro; reposição e encerramento entram na rotina. **Fonte:** EST-INV-001, EST-REP-001, EST-ENC-001; Q9, Q12 e Q13.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "A ordem aqui é obrigatória: categorias e unidades, locais, parâmetros, localizações, e só então a planilha de saldo. Faça a carga primeiro em homologação, confira com o cliente, e repita no ambiente oficial no dia de corte.",
    "passos": [
     {
      "t": "O consultor confirmou o que precisa estar pronto e o que espera pelo Estoque: Fundação e Fiscal assinados antes; Compras, Recebimento, Faturamento e Produção só movimentam depois do saldo inicial conferido.",
      "r": "**Como validar:** cronograma com a carga de saldo antes da primeira compra real. **Por quê:** entrada antes da data de corte bagunça saldo e custo médio. **Fonte:** manual EST; README de Suprimentos, ordem de implantação.",
      "s": "d"
     },
     {
      "t": "Em `Estoque > Configurações > Locais`, **cada empresa** tem um almoxarifado central ativo, e os locais livres (depósito, pátio) foram cadastrados; locais de obra não foram criados à mão.",
      "r": "**Como validar:** print dos locais filtrado por empresa. **Por quê:** o sistema cria o central só para a primeira empresa; sem central, documento sem projeto é recusado. Local de obra nasce com o projeto. **Fonte:** EST-LOC-002, EST-LOC-003; decisão S6.",
      "s": "d"
     },
     {
      "t": "Os `Parâmetros de Estoque` foram gravados conforme a ata: bloquear saída sem saldo, movimento com data passada, dias máximos retroativos e comprimento mínimo de retalho.",
      "r": "**Como validar:** print da tela de parâmetros. **Por quê:** valem para todo movimento a partir da carga. **Fonte:** EST-PAR-001, EST-MOV-006, EST-MOV-010.",
      "s": "d"
     },
     {
      "t": "Se o cliente decidiu por escrito usar localizações e tem PRO: a chave foi ligada e os endereços de cada local foram cadastrados **antes** da planilha.",
      "r": "**Como validar:** print de `Localizações`. **Por quê:** a chave não volta atrás e a planilha passa a exigir a coluna de localização. **Fonte:** EST-LOC-006, EST-LOC-012.",
      "s": "d"
     },
     {
      "t": "A planilha de saldo foi preenchida pelo cliente no modelo baixado do assistente: quantidades na unidade de estoque, medidas em mm, colunas certas por categoria e material de cliente com propriedade \"Cliente\".",
      "r": "**Como validar:** amostra conferida com o cliente. **Por quê:** perfil leva comprimento e cor; superfície, altura, largura e cor; componente, só cor. **Fonte:** EST-IMP-002, EST-SLD-003, EST-SLD-007.",
      "s": "d"
     },
     {
      "t": "No dia de corte, o saldo foi importado em `Estoque > Saldo` (`Mais` › `Importar saldo`), com a etapa de Validação sem nenhuma linha inválida.",
      "r": "**Como validar:** registro em `Mais` › `Importações de saldo` com a data de corte. **Por quê:** reimportar o mesmo arquivo não duplica, mas qualquer lançamento anterior nas mesmas variações é problema. **Fonte:** EST-IMP-001, EST-IMP-003, EST-IMP-004; decisão S7.",
      "s": "d",
      "campo": "Data da importação do saldo"
     },
     {
      "t": "A carga foi conferida: `Movimentos` filtrado pelo tipo `Importação de saldo inicial`, totais por local em `Saldo` iguais à planilha (quantidade e valor) e `Conferência de saldo` sem diferença.",
      "r": "**Como validar:** prints das três telas guardados. **Por quê:** é a prova de que a abertura bate com a contagem física. **Fonte:** EST-MOV-014, EST-GER-005; checklist D EST, carga.",
      "s": "d"
     },
     {
      "t": "Os perfis de almoxarife (consulta, movimento, transferência, contagem) e de gestor (estorno, reavaliação, importação, aprovação de inventário, encerramento, retirada de reservado) foram criados.",
      "r": "**Como validar:** entrar com um usuário de cada perfil. **Por quê:** reavaliar custo e estornar são decisões do gestor. **Fonte:** EST-GER-002; manual EST, etapa 6.",
      "s": "d"
     },
     {
      "t": "Se o cliente faz inventário de abertura (PRO): um inventário por local foi agendado fora do expediente, com dois contadores e um aprovador diferentes.",
      "r": "**Como validar:** datas e nomes anotados. **Por quê:** com inventário geral aberto, o local inteiro fica sem movimento. **Fonte:** EST-INV-004 a 007; decisão S9.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine com os próprios materiais do cliente: um perfil numa cor, uma chapa de vidro, um componente. Comece pelo saldo que ele mesmo contou. Siga a ordem: saldo e disponível → entrada → saída → transferência → ajuste e estorno → inventário → reposição e encerramento.",
    "passos": [
     {
      "t": "O consultor mostrou o saldo de um perfil real por características (comprimento e cor) e a diferença entre `Saldo` e disponível (descontadas as reservas de obras e OPs).",
      "r": "**Como validar:** cliente encontra o saldo e o disponível de um material dele. **Por quê:** quem olha só o saldo promete material já reservado. **Fonte:** EST-RES-001, EST-IMP-002; apostila, Módulo Estoque.",
      "s": "d",
      "campo": "Data do treinamento"
     },
     {
      "t": "O cliente finalizou uma nota de recebimento e calculou junto o novo custo médio (10 un a R$ 10,00 + 10 un a R$ 14,00 = R$ 12,00).",
      "r": "**Como validar:** custo médio na tela igual ao cálculo. **Por quê:** liga o Estoque ao Recebimento e mostra de onde vem o custo do produto. **Fonte:** EST-SLD-004, EST-INT-001.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a saída por documento (NF-e de venda, requisição da OP, devolução a fornecedor) no local certo, e que o custo médio não muda na saída.",
      "r": "**Como validar:** movimento de saída no extrato do produto. **Por quê:** o almoxarife precisa reconhecer cada origem de baixa. **Fonte:** EST-INT-001, EST-INT-004; README de Suprimentos, seção 1.",
      "s": "d"
     },
     {
      "t": "O almoxarife fez uma `Nova transferência` entre dois locais, viu o rascunho reduzir o disponível sem mexer no saldo e confirmou.",
      "r": "**Como validar:** origem diminui e destino aumenta com o custo da origem. **Por quê:** é a rotina de levar material do depósito à obra ou à produção. **Fonte:** EST-TRF-002, EST-TRF-004, EST-TRF-006.",
      "s": "d"
     },
     {
      "t": "O almoxarife lançou um ajuste negativo em `Movimentos`, estornou e viu que um segundo estorno é recusado; o gestor viu a reavaliação de valor para corrigir custo.",
      "r": "**Como validar:** saldo volta após o estorno. **Por quê:** corrigir lançamento errado sem bagunçar o histórico; reavaliar muda o custo de todas as posições do produto. **Fonte:** EST-MOV-001, EST-MOV-004, EST-MOV-011.",
      "s": "d"
     },
     {
      "t": "Se PRO: o cliente fez um inventário completo num local pequeno: contagem às cegas no app, segunda contagem por outra pessoa e aprovação por um terceiro, gerando o ajuste.",
      "r": "**Como validar:** movimento de ajuste por inventário no extrato. **Por quê:** é o controle periódico do estoque; durante o inventário o local não movimenta. **Fonte:** EST-INV-004 a 008, EST-MOV-007.",
      "s": "d"
     },
     {
      "t": "Se usa estoque mínimo: o consultor mostrou a `Reposição` sugerindo compra e gerando solicitação para Compras.",
      "r": "**Como validar:** solicitação criada em Compras a partir da reposição. **Por quê:** liga o Estoque ao comprador. **Fonte:** EST-REP-001 a 004.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o encerramento do mês (`Encerrar mês` e aprovação) e combinou com o cliente quem fará o primeiro.",
      "r": "**Como validar:** responsável e data do primeiro encerramento anotados. **Por quê:** o fechamento com a contabilidade depende dele. **Fonte:** EST-ENC-001.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Peça ao cliente que conduza com material e locais dele. O ponto principal é ele confiar no saldo inicial e saber explicar a data de corte. Anote cada dúvida.",
    "passos": [
     {
      "t": "O responsável do estoque conferiu sozinho o saldo de um local contra a planilha da contagem, em quantidade e valor.",
      "r": "**Como validar:** cliente aponta que bate, ou acha a diferença. **Por quê:** se ele não confia no saldo, volta para a planilha paralela. **Fonte:** EST-SLD-001; checklist D EST, saldo inicial conferido.",
      "s": "d"
     },
     {
      "t": "O cliente explicou por que nada pode ser lançado antes da data de corte e o que fazer quando aparece o bloqueio de movimento retroativo.",
      "r": "**Como validar:** resposta certa: lançar na data atual. **Por quê:** é a dúvida que mais aparece na virada. **Fonte:** EST-MOV-006; decisão S7.",
      "s": "d"
     },
     {
      "t": "O almoxarife explicou a diferença entre saldo e disponível com um material reservado para uma obra real.",
      "r": "**Como validar:** almoxarife mostra a reserva e o documento que a criou. **Por quê:** evita retirar material de outra obra. **Fonte:** EST-RES-001, EST-MOV-010.",
      "s": "d"
     },
     {
      "t": "O almoxarife fez sozinho uma transferência e um ajuste com estorno.",
      "r": "**Como validar:** movimentos no extrato, sem ajuda. **Por quê:** são as operações do dia a dia do almoxarifado. **Fonte:** EST-TRF-004, EST-MOV-004.",
      "s": "d"
     },
     {
      "t": "O gestor explicou de onde veio o custo médio de um produto que recebeu nota depois da abertura.",
      "r": "**Como validar:** gestor refaz o cálculo com o custo da abertura e o da nota. **Por quê:** é a pergunta que o contador vai fazer no primeiro fechamento. **Fonte:** EST-SLD-004, EST-SLD-005.",
      "s": "d"
     },
     {
      "t": "O gestor abriu `Conferência de saldo` e `Reservas órfãs` e explicou para que serve cada uma.",
      "r": "**Como validar:** gestor usa as duas telas sem ajuda. **Por quê:** são o controle de saúde do estoque depois do go-live. **Fonte:** EST-GER-005, EST-RES-003.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "O go-live do Estoque é a importação no dia de corte. Combine com o cliente que ninguém lança nada nas mesmas variações antes da carga e acompanhe de perto o primeiro mês, até o primeiro encerramento.",
    "passos": [
     {
      "t": "No ambiente oficial, a carga foi feita na data de corte, conferida, e `Conferência de saldo` e `Reservas órfãs` estão sem pendência.",
      "r": "**Como validar:** prints guardados com a data. **Por quê:** é o ponto de partida de todo custo e saldo. **Fonte:** EST-GER-005, EST-RES-003; checklist D EST, carga.",
      "s": "d"
     },
     {
      "t": "Os movimentos de teste da homologação não foram repetidos no ambiente oficial e o cliente parou de lançar no sistema antigo.",
      "r": "**Como validar:** combinado com o cliente e registrado em ata. **Por quê:** dois sistemas vivos geram saldo divergente na primeira semana. **Fonte:** EST-INT-002; manual EST, data de corte.",
      "s": "d"
     },
     {
      "t": "O checklist D de Estoque foi assinado pelo consultor, pelo responsável do estoque e pelo contador (custo inicial).",
      "r": "**Como validar:** documento assinado. **Por quê:** o contador assina porque o custo de abertura vira custo médio. **Fonte:** checklist D EST, assinatura.",
      "s": "d",
      "campo": "Data do go-live"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou: disponível negativo por saída sobre reserva, custo médio das primeiras notas, recusas de local não resolvido e retalhos gerados na produção.",
      "r": "**Como validar:** revisão semanal com o almoxarife. **Por quê:** são os sinais de cadastro, parâmetro ou local mal decidido. **Fonte:** EST-INT-004, EST-PAR-001, EST-SLD-004; limitações conhecidas v1.22.12.",
      "s": "d",
      "campo": "Pendências das primeiras semanas"
     },
     {
      "t": "O primeiro encerramento mensal foi feito e aprovado com o responsável definido.",
      "r": "**Como validar:** encerramento aprovado em `Encerramentos`. **Por quê:** fecha o primeiro ciclo com a contabilidade. **Fonte:** EST-ENC-001.",
      "s": "d"
     },
     {
      "t": "O critério para liberar Compras, Recebimento, Faturamento e Produção movimentando estoque foi cumprido: checklist D do Estoque assinado e saldo inicial conferido em quantidade e valor.",
      "r": "**Como validar:** checklist e prints da conferência. **Por quê:** o saldo vem antes das compras e das notas na ordem de Suprimentos. **Fonte:** checklist D EST; README de Suprimentos, ordem de implantação.",
      "s": "d"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "A data de corte e a origem do custo inicial estão decididas em ata, com o contador.",
    "s": "d"
   },
   {
    "t": "Cada empresa tem almoxarifado central e o saldo inicial bate com a contagem física em quantidade e valor.",
    "s": "d"
   },
   {
    "t": "O almoxarife consulta saldo e disponível, transfere, ajusta e estorna sem ajuda.",
    "s": "d"
   },
   {
    "t": "O gestor explica o custo médio e usa `Conferência de saldo` e `Reservas órfãs`.",
    "s": "d"
   },
   {
    "t": "O checklist D de Estoque está assinado e os módulos que movimentam estoque estão liberados.",
    "s": "d"
   }
  ],
  "atencao": [
   "Trocar o tipo de uma categoria depois do saldo é recusado. Revise os tipos antes da planilha, porque corrigir exige zerar o saldo ou criar outra categoria (CAD-CAT-004).",
   "Qualquer lançamento antes da importação nas mesmas variações bagunça saldo e custo médio, e lançamento retroativo anterior a movimento existente é recusado. Congele o estoque até a carga (EST-MOV-006, decisão S7).",
   "Empresa sem almoxarifado central recusa documento sem projeto. O sistema cria o central só para a primeira empresa; confira as demais (EST-LOC-002, decisão S6).",
   "Ligar localizações não tem volta pela tela. Só ligue com PRO contratado e decisão escrita do cliente, mesmo que a chave apareça sem o PRO (EST-LOC-006).",
   "Inventário geral aberto para o local inteiro. Agende fora do expediente e com três pessoas diferentes (EST-MOV-007, decisão S9).",
   "Hoje a entrada por nota ainda traz custo cheio, com IPI e ICMS-ST e sem descontar crédito. O custo médio vai subir em relação ao contábil; avise o contador (EST-SLD-004, decisão S8).",
   "Hoje, na versão 1.22.12, a saída ainda pode passar sobre material reservado e deixar o disponível negativo. Acompanhe nas primeiras semanas (limitações conhecidas, EST-1)."
  ],
  "naoValidado": [
   "Saída sobre material reservado: o manual da gestora diz que a retirada de reservado é recusada sem permissão; a lista de limitações da versão 1.22.12 diz que a saída passa e deixa o disponível negativo. Confira na tela antes de ensinar (EST-MOV-010).",
   "Saída por nota fiscal: a gestora diz que a NF-e autorizada gera movimento de saída; a lista de limitações registra que, nos testes, finalizar a nota não criou movimento. Teste em homologação antes de afirmar (EST-INT-001; limitações, FAT-4).",
   "A apostila fala em reposição automática; o manual da gestora descreve a `Reposição` sugerindo e gerando a solicitação por ação do usuário. Confira na tela como funciona no cliente (EST-REP-004).",
   "Que o movimento de saldo inicial nasce na data da importação é uma inferência da gestora (a planilha não tem coluna de data). Confira a data do movimento em homologação antes do dia de corte.",
   "Os rótulos do botão de gravar os parâmetros, do botão de novo inventário e dos campos da tela de Locais não foram confirmados. Confira na tela.",
   "Sobre desativar localizações, a tela fala em chamado de suporte e a mensagem do sistema manda zerar os saldos e abrir chamado. Na dúvida, trate como irreversível."
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
  "titulo": "Implantação de Produção",
  "subtitulo": "Checklist para o consultor conduzir a implantação da Produção, do levantamento da fábrica ao go-live, e para conferir se PCP, almoxarifado e chão de fábrica estão prontos para operar.",
  "objetivo": "Ao final, o PCP abre e programa as ordens de produção a partir dos pedidos, o almoxarifado separa e baixa os materiais, os operadores apontam as etapas e a conclusão da OP dá entrada do produto acabado no estoque. A Produção liga a venda ao estoque e às compras: cadastro técnico errado aqui vira material faltando, custo errado e obra atrasada.",
  "rodape": "Checklist de implantação · Produção · fontes: apostila do consultor (Módulo Produção; Processos de produção), manual-07-producao, regras e procedimento de Produção, funcional-producao, roteiros de Produção, FAQ de limitações · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Vendas e Estoque já estão implantados e em uso, como pede a sequência de implantação.",
    "r": "**Como validar:** confira no cronograma que os dois módulos tiveram go-live. **Por quê:** a OP nasce do pedido de venda e baixa e dá entrada no estoque. **Fonte:** apostila do consultor, Módulo Produção na implantação.",
    "s": "d"
   },
   {
    "t": "Os produtos fabricados estão cadastrados com o **Processo de produção padrão** preenchido.",
    "r": "**Como validar:** abra dois produtos fabricados em `Cadastros › Produtos` e veja o processo. **Por quê:** OP de produto sem processo não tem etapas, não aparece no Painel de fábrica e o terminal não deixa apontar. **Fonte:** manual-07-producao, 1.1.",
    "s": "d"
   },
   {
    "t": "Os insumos têm saldo lançado, com a cor informada nos materiais paramétricos, e o almoxarifado central está ativo.",
    "r": "**Como validar:** consulte o saldo de um perfil por cor no Estoque. **Por quê:** a baixa da OP depende do saldo, e sem a cor na entrada o saldo não bate. **Fonte:** procedimento-criar-ordem-de-producao-do-pedido; regra-producao-item-parametrico-da-estrutura-exige-cor.",
    "s": "d"
   },
   {
    "t": "Cada obra (projeto) tem local de estoque ativo na mesma empresa que vai abrir as OPs.",
    "r": "**Como validar:** confira em `Estoque › Configurações › Locais` a empresa do local de uma obra real. **Por quê:** no treino a finalização foi bloqueada porque o local da obra era de outra empresa. **Fonte:** manual-07-producao, Parte 1 e 2.4.",
    "s": "d"
   },
   {
    "t": "Os operadores da fábrica estão cadastrados como participantes e há tablet ou celular disponível na bancada.",
    "r": "**Como validar:** os nomes aparecem na escolha de operador do **Terminal de apontamento**. **Por quê:** o apontamento registra tempo e quantidade por operador. **Fonte:** manual-07-producao, Parte 1 e 2.4.",
    "s": "d"
   },
   {
    "t": "Se o cliente usa CEM Desktop, o agente de integração está instalado e conectado à base do CEM.",
    "r": "**Como validar:** uma obra fechada no CEM aparece na **Integração de Produção**. **Por quê:** as OPs automáticas de montagem e corte são geradas das obras fechadas do CEM Desktop; o CEM Mobi não alimenta essa tela. **Fonte:** roteiro Produção 01 e 05.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Vá até a fábrica com o responsável pela produção e o PCP. Peça para acompanhar uma esquadria do pedido até a embalagem. Anote as etapas pelo nome que os operadores usam. Não fale de sistema antes de entender o caminho físico do material.",
    "passos": [
     {
      "t": "O consultor perguntou: por quais etapas uma esquadria passa na fábrica, em que ordem, e quanto tempo leva cada uma?",
      "r": "**Como validar:** lista de etapas com tempo padrão aproximado. **Por quê:** vira o cadastro de **Etapas de produção** e de **Processos de produção**, base do painel e do apontamento. **Fonte:** manual-07-producao, Parte 1 e 1.1; roteiro Produção 08.",
      "s": "d",
      "campo": "Etapas e tempos da fábrica"
     },
     {
      "t": "O consultor perguntou: como a produção é programada hoje (planilha, quadro, sistema), quem decide o que entra amanhã e quantas linhas ou bancadas existem?",
      "r": "**Como validar:** responsável pelo PCP e linhas de produção anotados. **Por quê:** define o uso de **Linhas de Produção**, do PCP e do Painel de fábrica. **Fonte:** manual-07-producao, 2.2 e 2.3.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: o projeto técnico das obras é feito no CEM Desktop, no CEM Mobi ou em outra ferramenta? A obra é fechada no CEM antes de ir para a fábrica?",
      "r": "**Como validar:** origem do projeto técnico registrada. **Por quê:** decide se as OPs nascem pela **Integração de Produção** ou pela **Nova OP** manual. **Fonte:** roteiro Produção 01 e 05; manual-07-producao, 2.1.",
      "s": "d",
      "campo": "Origem do projeto técnico"
     },
     {
      "t": "O consultor perguntou: os produtos têm lista de materiais definida? Quem conhece o consumo de perfil, vidro e componentes por esquadria?",
      "r": "**Como validar:** responsável pela estrutura de produto definido. **Por quê:** sem estrutura a OP não gera requisições de material sozinha. **Fonte:** regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem separa o material para a fábrica, como é registrada a falta hoje e o que acontece quando falta um insumo no meio da OP?",
      "r": "**Como validar:** fluxo de separação e de falta anotado. **Por quê:** orienta o uso da **Separação de materiais** e mostra a ligação com Compras. **Fonte:** funcional-producao-ordens-de-producao-e-separacao; manual-07-producao, 2.5.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: como a empresa controla hoje refugo, paradas e o tempo gasto por operador? Alguém apura o custo real da OP?",
      "r": "**Como validar:** prática atual e interesse do cliente em custo registrados. **Por quê:** define motivos de refugo e parada e o uso do custo estimado e realizado da OP. **Fonte:** manual-07-producao, Parte 1; regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Faça os cadastros com o responsável pela fábrica, na ordem que o próprio sistema chama de roteiro: etapas, processos e estrutura, depois linhas, calendário e motivos. Escolha antes uma obra real e simples para servir de caso do treinamento.",
    "passos": [
     {
      "t": "As **Etapas de produção** e os **Processos de produção** foram cadastrados com as etapas e tempos levantados, na ordem real da fábrica.",
      "r": "**Como validar:** abra um processo e confira a sequência e o tempo total no rodapé. **Por quê:** o processo é copiado para dentro da OP quando ela é criada. **Fonte:** manual-07-producao, Parte 1 e 1.1; roteiro Produção 01.",
      "s": "d"
     },
     {
      "t": "A **Estrutura de produto** dos principais produtos foi cadastrada, com a cor definida em cada item paramétrico.",
      "r": "**Como validar:** salve uma estrutura sem erro de cor. **Por quê:** item paramétrico sem cor é recusado ao salvar; a estrutura gera as requisições da OP e o cálculo de compra. **Fonte:** regra-producao-item-parametrico-da-estrutura-exige-cor; manual-07-producao, 1.2.",
      "s": "d"
     },
     {
      "t": "Linhas de produção, calendário e motivos de refugo e parada foram cadastrados com o responsável pela fábrica.",
      "r": "**Como validar:** os cadastros aparecem em `Produção › Configurações`. **Por quê:** linhas e calendário alimentam o PCP; motivos padronizados permitem analisar perdas. **Fonte:** manual-07-producao, Parte 1; roteiro Produção 08.",
      "s": "d"
     },
     {
      "t": "O processo foi vinculado ao produto em `Cadastros › Produtos` para todos os produtos que a fábrica vai produzir no go-live.",
      "r": "**Como validar:** crie uma OP de teste e veja se ela aparece no **Painel de fábrica**. **Por quê:** OP sem processo some do quadro e não aceita apontamento. **Fonte:** manual-07-producao, 1.1 e 2.3.",
      "s": "d"
     },
     {
      "t": "O consultor conferiu as dependências de outros módulos: pedidos de venda com itens, saldo de insumos por cor, local de estoque da obra na mesma empresa da OP e, se houver, obra fechada no CEM Desktop.",
      "r": "**Como validar:** cada dependência marcada com responsável. **Por quê:** a Produção só funciona se Vendas e Estoque estiverem corretos. **Fonte:** apostila, Módulo Produção; procedimento-criar-ordem-de-producao-do-pedido; manual-07-producao, 2.4.",
      "s": "d",
      "campo": "Pendências de outros módulos"
     },
     {
      "t": "O consultor separou, com o PCP, um pedido real de um produto com processo e estrutura cadastrados para ser o caso do treinamento.",
      "r": "**Como validar:** o pedido, o produto e a obra atendem a todos os pré-requisitos acima. **Por quê:** treinar o apontamento com produto sem processo ou com obra sem local trava o exercício. **Fonte:** manual-07-producao, 2.4.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine em dois grupos: PCP e almoxarifado na sala, operadores na bancada com o tablet. Siga o caminho físico: OP, materiais, separação, painel, apontamento e conclusão. Use o pedido real escolhido na etapa 2 e mostre no Estoque o efeito de cada passo.",
    "passos": [
     {
      "t": "O consultor criou com o PCP uma OP a partir do pedido real em `Produção › Ordens de produção › Nova OP`, deixando o número vazio e informando **Empresa** e **Quantidade**.",
      "r": "**Como validar:** a OP aparece \"Em aberto\" na lista. **Por quê:** o item do pedido copia produto, cor e medidas, mas não a quantidade nem a empresa. Não use Esc: ele fecha o painel e perde o formulário. **Fonte:** regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.",
      "s": "d"
     },
     {
      "t": "Se o cliente usa CEM Desktop, o consultor processou com o PCP a **Integração de Produção** de uma obra fechada e abriu as OPs de montagem e corte geradas.",
      "r": "**Como validar:** as OPs mostram produto, quantidade, obra, materiais e plano de corte. **Por quê:** normalmente as OPs nascem por essa integração, e revisar as esquadrias antes de processar evita OP errada. **Fonte:** manual-07-producao, 2.1; roteiro Produção 05.",
      "s": "d"
     },
     {
      "t": "O consultor abriu `⋯ › Materiais necessários` da OP, mostrou as requisições geradas pela estrutura e fez a baixa de um material com **Baixar**.",
      "r": "**Como validar:** a requisição fica \"Atendida\" ou \"Atendida Parcialmente\" e nasce a baixa em `Estoque › Movimentos`. **Por quê:** sem estrutura aparece \"OP sem requisições da estrutura\"; o estorno pede motivo e devolve o saldo. **Fonte:** regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao almoxarifado a **Separação de materiais**: gerar a lista, separar os itens e registrar uma falta com motivo.",
      "r": "**Como validar:** a lista de separação é gerada e a falta fica registrada com motivo do catálogo. **Por quê:** a falta registrada é a informação que Compras usa para destravar a fábrica. **Fonte:** funcional-producao-ordens-de-producao-e-separacao; roteiro Produção 04.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao PCP o **Painel de fábrica** e o **Painel do planejamento**, localizando a OP do caso e as OPs atrasadas ou sem plano.",
      "r": "**Como validar:** o PCP encontra a OP na coluna da etapa. **Por quê:** OP sem processo não aparece no quadro; o planejamento mostra o risco da semana. **Fonte:** manual-07-producao, 2.2 e 2.3.",
      "s": "d"
     },
     {
      "t": "O consultor treinou os operadores no **Terminal de apontamento**: escolher o operador, achar a OP, escolher a etapa, **Iniciar** e informar a quantidade boa e o refugo.",
      "r": "**Como validar:** o operador inicia a etapa sozinho. **Por quê:** hoje o sistema ainda recusa a finalização do apontamento com a mensagem de data no futuro; oriente anotar o horário e avisar o suporte. **Fonte:** manual-07-producao, 2.4; FAQ de limitações.",
      "s": "d"
     },
     {
      "t": "O consultor concluiu a OP do caso com `Mais ações › Marcar produzido` e mostrou a entrada do produto acabado e o **Custo da OP**.",
      "r": "**Como validar:** a OP fica **Produzido** e nasce \"Entrada de produto acabado (OP)\" em `Estoque › Movimentos`. **Por quê:** é o elo da Produção com o Estoque e com a Expedição. **Fonte:** regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao gestor a **Visão geral** da Produção, com as OPs bloqueadas por material e os insumos que mais travam, e ligou essa lista à rotina de Compras.",
      "r": "**Como validar:** o gestor lê os insumos que mais travam. **Por quê:** essa é a lista de compra do dia para destravar a fábrica. **Fonte:** manual-07-producao, 2.5.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Dê ao PCP um pedido novo e peça para levar até o produto acabado, chamando almoxarifado e operador em cada passo. Você observa e anota. Se travar por cadastro, corrija junto e registre a causa.",
    "passos": [
     {
      "t": "O PCP criou sozinho uma OP de um pedido novo, com empresa e quantidade corretas, e conferiu etapas e materiais logo depois de salvar.",
      "r": "**Como validar:** a OP tem etapas e requisições. **Por quê:** conferir logo após salvar é o que revela produto sem processo ou sem estrutura antes de a fábrica começar. **Fonte:** roteiro Produção 01; procedimento-criar-ordem-de-producao-do-pedido.",
      "s": "d"
     },
     {
      "t": "O PCP explicou o que fazer quando aparece \"OP sem requisições da estrutura\" ou quando a OP não aparece no Painel de fábrica.",
      "r": "**Como validar:** a resposta aponta o cadastro da estrutura ou do processo no produto. **Por quê:** o cliente precisa distinguir erro de cadastro de defeito do sistema. **Fonte:** regra-producao-requisicoes-nascem-da-estrutura-ao-salvar; manual-07-producao, 1.1.",
      "s": "d"
     },
     {
      "t": "O almoxarife baixou o material de uma OP, estornou uma baixa informando o motivo e mostrou os dois movimentos no Estoque.",
      "r": "**Como validar:** os movimentos \"Baixa de componente em OP\" e o estorno aparecem em `Estoque › Movimentos`. **Por quê:** o saldo correto depende de baixas e estornos feitos na hora. **Fonte:** regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.",
      "s": "d"
     },
     {
      "t": "Cada operador iniciou sozinho o apontamento de uma etapa no terminal e sabe o que fazer se a finalização for recusada.",
      "r": "**Como validar:** o operador repete o caminho sem ajuda. **Por quê:** o apontamento é a base do tempo real e do custo de mão de obra. **Fonte:** manual-07-producao, 2.4; FAQ de limitações.",
      "s": "d",
      "campo": "Operadores treinados"
     },
     {
      "t": "O PCP marcou uma OP como produzida e mostrou a entrada do produto acabado no Estoque.",
      "r": "**Como validar:** a entrada aparece com a quantidade da OP. **Por quê:** sem essa entrada a Expedição e os Serviços não enxergam o produto pronto. **Fonte:** regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Combine a data a partir da qual toda OP nova nasce no Flow. Nas primeiras semanas, passe na fábrica e no PCP com frequência: os problemas de Produção quase sempre são de cadastro e aparecem nos primeiros dias.",
    "passos": [
     {
      "t": "Ficou decidido, com data, o que acontece com as ordens que já estão na fábrica: terminam no controle antigo ou são abertas no Flow.",
      "r": "**Como validar:** decisão registrada na OS. **Por quê:** misturar controles na mesma obra gera saldo de estoque duplicado ou faltando. **Fonte:** apostila, preparação para o go-live.",
      "s": "d",
      "campo": "Data de corte das OPs"
     },
     {
      "t": "Todos os produtos do mix de go-live têm processo e estrutura, conferidos pelo responsável técnico.",
      "r": "**Como validar:** lista de produtos conferida e assinada pelo responsável. **Por quê:** é a causa mais comum de OP sem etapas e sem materiais. **Fonte:** manual-07-producao, 1.1 e 1.2.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou: OPs sem processo ou sem requisições, apontamentos que ficaram abertos, saldos por cor divergentes e OPs produzidas sem entrada no estoque.",
      "r": "**Como validar:** revisão semanal registrada na OS. **Por quê:** um apontamento aberto continua aberto mesmo com a OP produzida, e hoje a saída de estoque ainda pode passar sobre material reservado. **Fonte:** regra-producao-marcar-produzido-gera-entrada-do-produto-acabado; FAQ de limitações.",
      "s": "d",
      "campo": "Pontos da revisão semanal"
     },
     {
      "t": "O PCP sabe que \"Cancelar OP\" continua disponível numa OP já produzida e só cancela com autorização do responsável.",
      "r": "**Como validar:** regra interna combinada e registrada. **Por quê:** cancelar uma OP produzida mexe no estoque já movimentado. **Fonte:** regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
      "s": "d"
     },
     {
      "t": "O critério para liberar Expedição e Serviços foi cumprido: OPs reais foram concluídas com a entrada do produto acabado conferida no Estoque.",
      "r": "**Como validar:** o key user mostra OPs reais produzidas e as entradas correspondentes. **Por quê:** Serviços e Expedição dependem do produto pronto registrado. **Fonte:** apostila, Módulo Produção e Módulo Serviços e Instalação.",
      "s": "d",
      "campo": "Data de liberação dos módulos seguintes"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O PCP abre e programa as OPs dos pedidos reais sem ajuda do consultor.",
    "s": "d"
   },
   {
    "t": "Os produtos do mix têm processo e estrutura, e as OPs nascem com etapas e requisições.",
    "s": "d"
   },
   {
    "t": "O almoxarifado separa, baixa e estorna materiais com o saldo do Estoque coerente.",
    "s": "d"
   },
   {
    "t": "Os operadores apontam as etapas no terminal e sabem a conduta enquanto a finalização for recusada.",
    "s": "d"
   },
   {
    "t": "A conclusão da OP gera a entrada do produto acabado, conferida pelo cliente.",
    "s": "d"
   }
  ],
  "atencao": [
   "Produto sem **Processo de produção padrão**: a OP fica sem etapas, some do Painel de fábrica e não aceita apontamento.",
   "Estrutura com item paramétrico sem cor: é recusada ao salvar, e a mensagem cita um identificador interno em vez do código do item.",
   "Esquecer a **Quantidade** e a **Empresa** na Nova OP: o item do pedido não as traz, embora a dica diga que a empresa vem do pedido.",
   "Usar Esc no painel da Nova OP: fecha e perde o formulário.",
   "Local de estoque da obra em outra empresa: bloqueia a finalização da OP.",
   "Hoje o sistema ainda recusa a finalização do apontamento: oriente anotar o horário e avisar o suporte, sem descrever isso como normal.",
   "Procurar na Integração de Produção uma venda que veio do CEM Mobi: essa tela lê as obras fechadas do CEM Desktop."
  ],
  "naoValidado": [
   "Entrada do produto acabado: o manual-07-producao (2.4) diz que o apontamento da última etapa dá entrada do produto acabado e baixa os componentes; a regra-producao-marcar-produzido-gera-entrada-do-produto-acabado registra a entrada ao usar `Mais ações › Marcar produzido`, e a FAQ diz que hoje a finalização do apontamento é recusada. Confira na tela qual caminho gera o movimento.",
   "Baixa dos componentes: o manual diz que a baixa da estrutura acontece na conclusão; a regra-producao-requisicoes-nascem-da-estrutura-ao-salvar descreve a baixa manual por **Baixar** em Materiais necessários. Confira se as duas formas convivem na versão do cliente.",
   "Ordem dos cadastros: o manual-07-producao começa por etapas, processos e estrutura; o roteiro Produção 08 apresenta primeiro as linhas de produção. Não muda o resultado, mas confira o roteiro de configuração da tela."
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
  "titulo": "Implantação de Serviços",
  "subtitulo": "Checklist para o consultor conduzir a implantação de Serviços (medição, instalação, vistoria e assistência técnica) e para conferir se coordenação e equipes de campo estão prontas para operar.",
  "objetivo": "Ao final, o técnico mede os vãos do pedido, outro técnico confere e aprova, a coordenação gera e agenda a instalação, a equipe executa com checklist, a vistoria registra o aceite do cliente e os problemas viram assistência técnica. Serviços é o que acontece na obra depois da venda: medida errada aqui vira esquadria refeita na fábrica e cliente insatisfeito.",
  "rodape": "Checklist de implantação · Serviços · fontes: apostila do consultor (Módulo Serviços e Instalação), manual-11-servicos, regras e procedimento de Serviços, funcional-servicos, roteiros de Serviços, plano de validação de Serviços · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Vendas, Produção e Expedição já estão implantados, como pede a sequência de implantação.",
    "r": "**Como validar:** confira o cronograma. **Por quê:** a medição nasce do pedido, a instalação pode partir da medição, do pedido ou da OP, e a obra precisa do produto pronto. **Fonte:** apostila do consultor, Módulo Serviços e Instalação na implantação.",
    "s": "d"
   },
   {
    "t": "Clientes, obras (projetos) e pedidos de venda com produtos de esquadria estão cadastrados para as obras que entram no go-live.",
    "r": "**Como validar:** abra um pedido real e confira o projeto vinculado. **Por quê:** antes de medir ou instalar precisam existir cliente, obra e pedido com os produtos. **Fonte:** manual-11-servicos, Parte 1.",
    "s": "d"
   },
   {
    "t": "Os técnicos têm usuário no Flow e existem pelo menos duas pessoas diferentes para medir e para conferir.",
    "r": "**Como validar:** liste quem mede e quem confere. **Por quê:** a aprovação da medição exige um conferente vinculado a um participante e diferente de quem mediu. **Fonte:** regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
    "s": "d",
    "campo": "Técnicos e conferentes"
   },
   {
    "t": "Instaladores autônomos e empresas terceirizadas estão cadastrados como participante fornecedor.",
    "r": "**Como validar:** busque um instalador terceirizado em `Cadastros › Participantes`. **Por quê:** o fornecedor da equipe terceirizada é quem recebe o pagamento pela instalação. **Fonte:** manual-11-servicos, 1.1.",
    "s": "d"
   },
   {
    "t": "As equipes de campo têm celular ou tablet com acesso ao Flow para registrar medidas, fotos e aceites na obra.",
    "r": "**Como validar:** um técnico abre a visita do dia no aparelho. **Por quê:** medição, checklist da instalação e aceite do cliente são registrados no campo. **Fonte:** roteiro Serviços 02 (Equipes de Campo e Aplicativo).",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Converse com o coordenador de obras, um medidor e um líder de instalação. Peça para contarem a última obra que deu problema e onde começou. Anote quem faz cada etapa e quem aprova. Não fale de tela: entenda primeiro o caminho da obra.",
    "passos": [
     {
      "t": "O consultor perguntou: quem mede a obra, em que momento (antes ou depois do pedido) e quem confere a medição antes de ir para a fábrica?",
      "r": "**Como validar:** medidores e conferentes nomeados por função. **Por quê:** define se a conferência de medição fica ligada e quem será cadastrado como conferente. Empresa pequena em que quem mede também valida pode desligar. **Fonte:** manual-11-servicos, 1.2.",
      "s": "d",
      "campo": "Quem mede e quem confere"
     },
     {
      "t": "O consultor perguntou: qual diferença entre a medida vendida e a medida real a empresa aceita sem voltar ao cliente? O responsável pela obra assina a medição?",
      "r": "**Como validar:** tolerância em milímetros e regra de assinatura anotadas. **Por quê:** acima da tolerância a medição fica \"Requer reaprovação\"; a assinatura muda o caminho de conclusão da medição. **Fonte:** manual-11-servicos, 1.2; regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
      "s": "d",
      "campo": "Tolerância e assinatura"
     },
     {
      "t": "O consultor perguntou: as equipes de instalação são próprias ou terceirizadas, quantos serviços cada uma faz por dia e como os terceirizados são pagos?",
      "r": "**Como validar:** lista de equipes com tipo, capacidade e líder. **Por quê:** o tipo da equipe define execução própria ou terceirizada; a capacidade é usada pelo Cockpit para não sobrecarregar a agenda. **Fonte:** manual-11-servicos, 1.1 e 2.3.",
      "s": "d",
      "campo": "Equipes de campo"
     },
     {
      "t": "O consultor perguntou: a empresa faz vistoria depois de toda instalação? Quantos dias depois? Como o cliente dá o aceite hoje?",
      "r": "**Como validar:** regra de vistoria e prazo anotados. **Por quê:** a vistoria só nasce sozinha se a **Geração automática de vistoria (dias)** for preenchida; ela vem vazia. **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites; manual-11-servicos, 2.4.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: como chegam hoje os chamados de assistência, como se decide se está na garantia e quais prioridades e prazos a empresa pratica?",
      "r": "**Como validar:** tipos, prioridades, origens e motivos de chamado listados. **Por quê:** viram os cadastros da aba **Assistência**; garantia se decide pela regra da empresa, não pelo pedido do cliente. **Fonte:** manual-11-servicos, 1.2; roteiro Serviços 07.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: existem medições ou serviços sem pedido (reformas, visitas técnicas avulsas)? Quem organiza a agenda das equipes hoje?",
      "r": "**Como validar:** casos avulsos e responsável pela agenda registrados. **Por quê:** existe **Medição avulsa (sem pedido)** e o Cockpit de Campo concentra a agenda. **Fonte:** regra-servicos-medicao-nasce-do-pedido; manual-11-servicos, 2.6.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Configure com o coordenador de obras, usando as decisões da etapa 1. Cada parâmetro muda o comportamento da cadeia; explique o efeito de cada um antes de ligar. Termine com uma obra real escolhida para o treinamento.",
    "passos": [
     {
      "t": "As **Equipes de Campo** foram cadastradas com tipo, especialidade, capacidade diária, líder, fornecedor (se terceirizada) e membros.",
      "r": "**Como validar:** as equipes aparecem no Cockpit de Campo. **Por quê:** equipe interna não gera pagamento; a terceirizada paga o fornecedor vinculado. **Fonte:** manual-11-servicos, 1.1; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "d"
     },
     {
      "t": "Os parâmetros de Serviços foram ajustados com o cliente: conferência de medição, assinatura do responsável pela obra, tolerância de divergência e geração automática de vistoria.",
      "r": "**Como validar:** registre na OS o valor escolhido para cada parâmetro. **Por quê:** cada um muda a cadeia: aguardar conferência, exigir assinatura, pedir reaprovação, criar vistoria sozinha. **Fonte:** manual-11-servicos, 1.2.",
      "s": "d",
      "campo": "Parâmetros definidos"
     },
     {
      "t": "Os conferentes foram cadastrados e vinculados a participantes, diferentes dos técnicos que medem.",
      "r": "**Como validar:** um conferente aparece na lista de **Conferentes**. **Por quê:** sem conferente vinculado e diferente de quem mediu, a medição não é aprovada. **Fonte:** regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
      "s": "d"
     },
     {
      "t": "Os cadastros de **Assistência** (tipo, prioridade, origem e motivo) e de **Esquadrias** foram ajustados com os nomes que a equipe reconhece no campo.",
      "r": "**Como validar:** abra uma nova assistência e confira as listas. **Por quê:** cadastros padronizados permitem que os painéis mostrem causas e custo de garantia confiáveis. **Fonte:** manual-11-servicos, 1.2; roteiro Serviços 08.",
      "s": "d"
     },
     {
      "t": "O consultor conferiu as dependências de outros módulos: pedidos com itens de esquadria, obras cadastradas, produção da obra concluída e instaladores terceirizados como fornecedores.",
      "r": "**Como validar:** cada dependência marcada com responsável. **Por quê:** a medição importa os itens do pedido, e a instalação depende do produto pronto. **Fonte:** manual-11-servicos, Parte 1; apostila, Módulo Serviços e Instalação.",
      "s": "d",
      "campo": "Pendências de outros módulos"
     },
     {
      "t": "O consultor escolheu, com o coordenador, um pedido real com poucos itens para percorrer a cadeia inteira no treinamento.",
      "r": "**Como validar:** o pedido tem obra, itens de esquadria e ainda não tem medição. **Por quê:** a cadeia tem várias passagens por botão; um caso pequeno permite chegar até a assistência no mesmo treinamento. **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine na ordem da obra: medição, conferência, instalação, vistoria e assistência, e só depois Cockpit e painéis. Junte medidor, conferente e líder de instalação na mesma sessão, porque cada um passa o bastão para o outro. Mostre em cada passagem qual botão leva à próxima etapa.",
    "passos": [
     {
      "t": "O consultor criou a medição do pedido real em `Serviços › Medições › Nova Medição` com **Usar este registro**, importou os itens com o **Nº vãos**, preencheu **Empresa** e **Técnico Responsável**, salvou e depois agendou.",
      "r": "**Como validar:** a medição ganha número e fica \"Agendada\". **Por quê:** **Empresa** e **Técnico Responsável** não vêm do pedido; o botão **Agendar** só aparece na medição já salva. **Fonte:** procedimento-agendar-medicao-do-pedido; regra-servicos-botao-agendar-so-na-medicao-salva.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao medidor o caminho **Iniciar**, **Medir vãos** (largura e altura em mm) e **Concluir medição** com a assinatura do responsável pela obra.",
      "r": "**Como validar:** a medição fica \"Aguardando Conferência\". **Por quê:** com **Exigir assinatura** ligado, o **Finalizar** da tela de edição só mostra erro. **Fonte:** regra-servicos-aprovacao-da-medicao-exige-conferente-diferente; funcional-servicos-medicoes-instalacoes-vistorias-assistencias.",
      "s": "d"
     },
     {
      "t": "O conferente, com o próprio usuário, revisou e aprovou a medição, e o consultor mostrou o que acontece quando a medida passa da tolerância.",
      "r": "**Como validar:** a medição fica Aprovada. **Por quê:** quem mediu não aprova a própria medição; acima da tolerância a medição pede reaprovação do cliente. **Fonte:** regra-servicos-aprovacao-da-medicao-exige-conferente-diferente; manual-11-servicos, 1.2.",
      "s": "d"
     },
     {
      "t": "O consultor gerou a instalação pela medição aprovada com **Gerar Instalação**, escolheu a equipe de campo e explicou execução própria ou terceirizada.",
      "r": "**Como validar:** a instalação aparece em `Serviços › Instalações` como Agendada. **Por quê:** aprovar a medição não cria a instalação; só vãos realmente medidos podem ser instalados. **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites; manual-11-servicos, 2.3.",
      "s": "d"
     },
     {
      "t": "O líder de instalação executou a instalação: marcou cada vão como Conforme ou Não conforme, anexou foto, usou **Pausar** e concluiu.",
      "r": "**Como validar:** aparece \"Instalação concluída!\" e o checklist mostra conferidos e conformes. **Por quê:** **Concluir instalação** só libera com os itens obrigatórios conformes. **Fonte:** manual-11-servicos, 2.3; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "d"
     },
     {
      "t": "O consultor criou a vistoria da instalação concluída, explicou os resultados Aprovada, Aprovada com Ressalvas e Reprovada, e registrou o aceite do cliente depois de concluir.",
      "r": "**Como validar:** a vistoria mostra resultado e aceite. **Por quê:** na vistoria o aceite só é aceito depois de concluir; ressalvas precisam citar produto, ambiente e problema. **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites; roteiro Serviços 06.",
      "s": "d"
     },
     {
      "t": "O consultor gerou uma assistência técnica pela vistoria com ressalvas, preencheu tipo, prioridade e motivo, registrou o aceite **antes** de **Resolver** e mostrou o **Laudo (PDF)**.",
      "r": "**Como validar:** a AT fica resolvida com a solução registrada em **Solução + Custos**. **Por quê:** a AT não nasce sozinha; na AT a ordem do aceite é inversa à da vistoria. **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites; manual-11-servicos, 2.5.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao coordenador o **Cockpit de Campo** (agenda por equipe e fila \"A agendar\") e o pipeline operacional do **Dashboard Serviços**.",
      "r": "**Como validar:** o coordenador agenda um serviço da fila e identifica um gargalo. **Por quê:** o Cockpit respeita a capacidade de cada equipe e o pipeline mostra serviços parados em cada etapa. **Fonte:** manual-11-servicos, 2.1 e 2.6.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Dê um segundo pedido real e peça para a equipe percorrer a cadeia sozinha, cada um no seu papel e com o próprio usuário. Você observa. Anote em qual passagem por botão a equipe hesitou: é ali que vão surgir os chamados.",
    "passos": [
     {
      "t": "O medidor criou, salvou e agendou sozinho a medição de um pedido, preenchendo Empresa e Técnico Responsável.",
      "r": "**Como validar:** a medição está \"Agendada\" com os itens importados. **Por quê:** é o primeiro documento da cadeia; erro aqui segue até a instalação. **Fonte:** procedimento-agendar-medicao-do-pedido.",
      "s": "d"
     },
     {
      "t": "O medidor concluiu a medição com assinatura, e o conferente explicou por que o medidor não pode aprovar a própria medição.",
      "r": "**Como validar:** a medição passa por \"Aguardando Conferência\" e é aprovada pelo conferente. **Por quê:** a conferência por outra pessoa é o controle contra esquadria fabricada com medida errada. **Fonte:** regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
      "s": "d"
     },
     {
      "t": "O coordenador gerou a instalação pela medição aprovada e a agendou para uma equipe no Cockpit, respeitando a capacidade.",
      "r": "**Como validar:** a instalação aparece na linha da equipe no calendário. **Por quê:** a instalação não nasce sozinha; quem esquece o botão deixa a obra parada em \"aprovadas sem instalação\". **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites; manual-11-servicos, 2.1.",
      "s": "d"
     },
     {
      "t": "O líder de instalação executou e concluiu a instalação com checklist e fotos, e abriu a vistoria a partir dela.",
      "r": "**Como validar:** instalação Concluída e vistoria criada. **Por quê:** sem geração automática, a vistoria depende da ação do usuário. **Fonte:** manual-11-servicos, 2.3 e 2.4.",
      "s": "d"
     },
     {
      "t": "O responsável pela assistência explicou a ordem dos aceites (vistoria: depois de concluir; AT: antes de resolver) e abriu um chamado manual com tipo e prioridade corretos.",
      "r": "**Como validar:** chamado salvo com número e status Aberta. **Por quê:** a inversão da ordem do aceite é o erro mais provável no início. **Fonte:** regra-servicos-passagens-por-botao-e-ordem-dos-aceites; manual-11-servicos, 2.5.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "Combine a data a partir da qual toda medição nova é feita no Flow. Nas primeiras semanas, olhe o pipeline operacional com o coordenador toda semana: as passagens por botão esquecidas aparecem ali como serviços parados.",
    "passos": [
     {
      "t": "Ficou decidido, com data, como entram as obras em andamento: medições já feitas no papel, instalações agendadas e chamados abertos.",
      "r": "**Como validar:** decisão registrada na OS com responsável. **Por quê:** obra pela metade fora do Flow não aparece no Cockpit nem nos painéis. **Fonte:** apostila, preparação para o go-live.",
      "s": "d",
      "campo": "Data de corte e obras em andamento"
     },
     {
      "t": "Os parâmetros de Serviços foram revisados com o coordenador depois do treinamento e confirmados para produção.",
      "r": "**Como validar:** a tela de parâmetros bate com o registrado na OS. **Por quê:** a tolerância, a conferência e a vistoria automática decididas no papel podem mudar depois de ver a operação. **Fonte:** manual-11-servicos, 1.2.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor acompanhou com o coordenador: medições paradas aguardando conferência, aprovadas sem instalação, instalações concluídas sem vistoria e assistências fora do prazo.",
      "r": "**Como validar:** revisão semanal do pipeline operacional registrada na OS. **Por quê:** cada passagem da cadeia é por botão, e esquecimentos viram serviços parados. **Fonte:** manual-11-servicos, 2.1; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "d",
      "campo": "Pontos da revisão semanal"
     },
     {
      "t": "O financeiro sabe onde aprovar os pagamentos de instaladores terceirizados em **Aprovações**.",
      "r": "**Como validar:** o responsável abre a tela de **Aprovações** de Serviços. **Por quê:** a instalação terceirizada gera pagamento ao fornecedor da equipe; a interna não. **Fonte:** manual-11-servicos, 2.7; regra-servicos-passagens-por-botao-e-ordem-dos-aceites.",
      "s": "d"
     },
     {
      "t": "O critério de encerramento foi cumprido: pelo menos uma obra real percorreu medição, aprovação, instalação e vistoria no Flow, com o cliente operando sozinho.",
      "r": "**Como validar:** o key user mostra a obra com todos os documentos encadeados. **Por quê:** Serviços é o último elo da cadeia operacional; com ele estável, o projeto pode seguir para Projetos e Obras ou para o encerramento. **Fonte:** apostila, Módulo Serviços e Instalação; Método Faktory.",
      "s": "d",
      "campo": "Obra usada no aceite"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Medidor, conferente, coordenador e líder de instalação percorrem a cadeia de uma obra real sem ajuda do consultor.",
    "s": "d"
   },
   {
    "t": "Equipes, conferentes e parâmetros refletem a forma de trabalho do cliente e estão registrados na OS.",
    "s": "d"
   },
   {
    "t": "Toda medição nova, a partir da data de corte, é feita e aprovada no Flow.",
    "s": "d"
   },
   {
    "t": "A agenda das equipes é organizada no Cockpit de Campo, respeitando a capacidade.",
    "s": "d"
   },
   {
    "t": "Vistorias e assistências registram aceite, ressalvas e solução, e o coordenador acompanha o pipeline operacional toda semana.",
    "s": "d"
   }
  ],
  "atencao": [
   "Esperar o botão **Agendar** na medição nova: ele só aparece depois de salvar.",
   "Esquecer **Empresa** e **Técnico Responsável** na medição: não vêm do pedido.",
   "Ligar a conferência sem cadastrar conferente vinculado e diferente de quem mede: nenhuma medição é aprovada.",
   "Achar que aprovar a medição cria a instalação ou que a vistoria reprovada cria a assistência: as duas passagens são por botão.",
   "Esperar a vistoria automática sem preencher **Geração automática de vistoria (dias)**: o parâmetro vem vazio.",
   "Tentar finalizar a medição pelo **Finalizar** da tela de edição com assinatura exigida: o caminho é Iniciar, Medir vãos e Concluir medição.",
   "Gerar instalação de medição com vãos cancelados: só vãos realmente medidos podem ser instalados."
  ],
  "naoValidado": [
   "Aceite da assistência técnica: o plano de validação de Serviços (06, Laudo e aceite) pede o aceite na AT resolvida; no teste da regra-servicos-passagens-por-botao-e-ordem-dos-aceites o aceite precisou vir antes de **Resolver**. Confira na tela.",
   "Conclusão da medição: o manual-11-servicos (2.2) diz para medir todos os vãos e clicar em **Salvar** para ir à conferência; a regra-servicos-aprovacao-da-medicao-exige-conferente-diferente diz que, com assinatura exigida, o caminho é **Iniciar**, **Medir vãos** e **Concluir medição**. Confira com os parâmetros do cliente.",
   "Passagens automáticas: o plano de validação diz que medição aprovada gera instalação e instalação concluída gera vistoria; a regra-servicos-passagens-por-botao-e-ordem-dos-aceites diz que as passagens são por botão e só a vistoria pode nascer sozinha, se o parâmetro estiver preenchido.",
   "Tela de configurações: o manual-11-servicos usa `Configurações › Config. Serviços` com a aba **Conferentes**; o roteiro Serviços 08 lista abas diferentes (com **Medição**, sem **Conferentes**) e a regra cita `Serviços › Configurações › Conferentes`. Confira o menu da versão do cliente.",
   "A seção de Serviços da apostila do consultor está marcada \"Rever\" no original; a sequência de implantação (após Vendas, Produção e Expedição) deve ser confirmada com a coordenação de implantação."
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
  "titulo": "Implantação de Expedição",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação da Expedição, do pedido faturado até a entrega confirmada. Serve ao consultor iniciante e ao experiente.",
  "objetivo": "Ao final, o cliente libera pedidos faturados, monta cargas pela ocupação do veículo, faz os checkpoints de separação, conferência e carregamento e confirma a entrega sozinho. Também sabe tratar uma ocorrência e decidir entre re-expedir ou cancelar. A Expedição fecha o ciclo do pedido: é aqui que a obra recebe o que foi vendido e produzido.",
  "rodape": "Checklist de implantação · Expedição · fontes: apostila do consultor (Módulo Expedição), manual-09-expedicao, regra-vendas-liberar-para-expedicao-so-em-pedido-faturado, procedimento-montar-carga-e-liberar-para-expedicao, roteiros de expedição 01, 04 e 05 · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Vendas e Faturamento estão em uso: o cliente já fatura pedidos com nota.",
    "r": "**Como validar:** abra `Vendas > Pedidos de Venda` e confira pedidos com status **Faturado**. **Por quê:** **Liberar para Expedição** só existe no menu `⋯` de pedido Faturado. **Fonte:** regra-vendas-liberar-para-expedicao-so-em-pedido-faturado; apostila (Módulo Expedição: implantar após Vendas, Faturamento, Produção e Estoque).",
    "s": "d"
   },
   {
    "t": "Produção e Estoque estão implantados, e as ordens de produção são concluídas no sistema.",
    "r": "**Como validar:** peça uma OP recente com status **Produzido**. **Por quê:** item fabricado sem OP concluída aparece como **Produção pendente** na montagem da carga. **Fonte:** manual-09-expedicao#008; regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.",
    "s": "d"
   },
   {
    "t": "Os produtos têm peso e os clientes têm CEP no cadastro.",
    "r": "**Como validar:** abra por amostra 3 produtos e 3 participantes. **Por quê:** o peso alimenta a ocupação do veículo e o CEP alimenta o mapa e os filtros por região. **Fonte:** manual-09-expedicao#002.",
    "s": "d",
    "campo": "Cadastros com peso ou CEP faltando"
   },
   {
    "t": "O cliente levantou os dados da frota e dos motoristas: placa, tipo, capacidade em kg e m³, comprimento máximo, CNH, categoria e validade.",
    "r": "**Como validar:** peça a lista antes da reunião de preparação. **Por quê:** capacidade em kg e m³ é obrigatória no veículo, e a CNH vencida gera alerta. **Fonte:** manual-09-expedicao#003 e #004.",
    "s": "d",
    "campo": "Responsável pelo levantamento da frota"
   },
   {
    "t": "Os usuários da expedição têm acesso ao módulo e às permissões de liberação e de ocorrência.",
    "r": "**Como validar:** entre com o usuário do expedidor e confira o menu lateral da Expedição, incluindo **Aguardando Re-Expedição**. **Por quê:** sem permissão, os botões de decisão não aparecem. **Fonte:** roteiro-expedicao-05-re-expedicao-e-devolucoes#003.",
    "s": "d"
   },
   {
    "t": "Existe almoxarifado central ativo, e o cliente confere o saldo antes de finalizar a nota.",
    "r": "**Como validar:** abra `Estoque > Locais`. **Por quê:** sem local ativo a nota não finaliza; na v1.22.13 a finalização gerou a saída **Expedição (PV)** mesmo sem saldo. **Fonte:** regra-estoque-almoxarifado-central-ativo-e-pre-requisito; regra-faturamento-finalizar-nf-requisitos.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Faça a conversa com quem despacha de verdade: o responsável pela expedição, um motorista e alguém do comercial. Vá até o pátio se puder. O objetivo é saber como a mercadoria sai hoje, não mostrar telas.",
    "passos": [
     {
      "t": "O consultor perguntou: a entrega é com frota própria, terceirizada ou retirada pelo cliente? Quantos veículos e motoristas existem?",
      "r": "**Como validar:** a resposta está registrada com o número de veículos e motoristas. **Por quê:** define o tamanho dos cadastros e se o app do motorista será usado. **Fonte:** manual-09-expedicao#002.",
      "s": "d",
      "campo": "Frota e motoristas"
     },
     {
      "t": "O consultor perguntou: hoje vocês separam, conferem e carregam volume a volume? Usam etiqueta ou romaneio em papel?",
      "r": "**Como validar:** ficou decidido quais etapas a empresa realmente faz. **Por quê:** essa resposta define quais checkpoints ligar nos **Parâmetros**. Ligar etapa que ninguém faz trava a carga. **Fonte:** manual-09-expedicao#005.",
      "s": "d",
      "campo": "Checkpoints que a empresa usa"
     },
     {
      "t": "O consultor perguntou: quem decide o que vai em cada carga e como escolhe o veículo? Juntam entregas por região?",
      "r": "**Como validar:** o critério de montagem (região, prazo, ocupação) está anotado. **Por quê:** a tela de montagem filtra por cidade, raio e CEP e mostra a ocupação do veículo. **Fonte:** manual-09-expedicao#007 e #008.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: como a entrega é comprovada hoje? Há canhoto, foto ou assinatura? Quem registra?",
      "r": "**Como validar:** ficou definido se a confirmação será pelo app **Minhas Entregas** (foto e assinatura) ou pelo ERP. **Por quê:** a confirmação pelo ERP fica marcada como sem foto. **Fonte:** manual-09-expedicao#004 e #010.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quais problemas acontecem na entrega (cliente ausente, avaria, recusa) e o que se faz com o material que volta?",
      "r": "**Como validar:** há uma lista de ocorrências reais e de quem decide re-entregar ou cancelar. **Por quê:** essa lista vira os **Tipos de Ocorrência** e define quais bloqueiam a entrega. **Fonte:** roteiro-expedicao-01-cadastros-e-parametros#021; roteiro-expedicao-05-re-expedicao-e-devolucoes#001.",
      "s": "d",
      "campo": "Ocorrências mais comuns"
     },
     {
      "t": "O consultor perguntou: há peças longas (perfis de 6 m) ou restrição de dias e horários de entrega?",
      "r": "**Como validar:** comprimento máximo dos veículos e janelas de entrega anotados. **Por quê:** o veículo tem campo de comprimento máximo e existem **Janelas de Entrega**. **Fonte:** manual-09-expedicao#002 e #003.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Prepare o ambiente com o responsável pela expedição ao seu lado: ele cadastra, você orienta. Combine as decisões de ocorrência com comercial e estoque antes de gravar, porque elas mudam o caminho do pedido.",
    "passos": [
     {
      "t": "As dependências estão prontas: pedidos sendo faturados com nota, OPs concluídas, almoxarifado central ativo, produtos com peso e clientes com CEP.",
      "r": "**Como validar:** confira um pedido real de ponta a ponta antes do treino. **Por quê:** a Expedição só recebe pedido **Faturado** e acusa **Produção pendente** sem OP concluída. **Fonte:** apostila (Módulo Expedição); regra-vendas-liberar-para-expedicao-so-em-pedido-faturado; manual-09-expedicao#008.",
      "s": "d"
     },
     {
      "t": "O cliente cadastrou os tipos de veículo e os veículos, com capacidade em kg e m³ e comprimento máximo.",
      "r": "**Como validar:** `Expedição > Configurações > Veículos` mostra a frota com kg e m³. **Por quê:** a capacidade alimenta o **Resumo da Carga** na montagem. **Fonte:** manual-09-expedicao#003.",
      "s": "d"
     },
     {
      "t": "O cliente cadastrou os motoristas com CNH, categoria e validade.",
      "r": "**Como validar:** `Expedição > Configurações > Motoristas` sem CNH vencida. **Por quê:** o motorista é obrigatório para montar a carga e o sistema alerta CNH vencida. **Fonte:** manual-09-expedicao#004; procedimento-montar-carga-e-liberar-para-expedicao.",
      "s": "d"
     },
     {
      "t": "Os **Parâmetros** têm ligados só os checkpoints que a empresa faz (Separação, Conferência, Carregamento).",
      "r": "**Como validar:** o fluxo resultante na tela bate com a resposta da etapa 1. **Por quê:** cada checkpoint ligado exige apontamento de todos os volumes antes de iniciar a rota. **Fonte:** manual-09-expedicao#005.",
      "s": "d"
     },
     {
      "t": "Os **Tipos de Ocorrência** foram cadastrados, e a opção **Bloqueia finalização** foi decidida com comercial, estoque e expedição.",
      "r": "**Como validar:** cada tipo bloqueante tem um dono para a decisão de re-expedir ou cancelar. **Por quê:** ocorrência bloqueante devolve o pedido para **Aguardando Re-Expedição**. **Fonte:** roteiro-expedicao-01-cadastros-e-parametros#021.",
      "s": "d",
      "campo": "Tipos bloqueantes e responsável pela decisão"
     },
     {
      "t": "As **Janelas de Entrega** refletem os dias e horários reais de entrega.",
      "r": "**Como validar:** compare com a resposta da etapa 1. **Por quê:** é cadastro necessário do módulo. **Fonte:** manual-09-expedicao#002.",
      "s": "d"
     },
     {
      "t": "Ficou combinado quem libera o pedido para expedição (Vendas ou Faturamento) e quem monta a carga.",
      "r": "**Como validar:** os nomes estão no registro da OS. **Por quê:** a liberação acontece no pedido, em `Vendas > Pedidos de Venda`, e não na tela da Expedição. **Fonte:** manual-09-expedicao#007.",
      "s": "d",
      "campo": "Responsável pela liberação e pela montagem"
     },
     {
      "t": "Há ao menos dois pedidos reais faturados, de regiões próximas, separados para o treino.",
      "r": "**Como validar:** os pedidos aparecem com status **Faturado**. **Por quê:** o treino usa dados do cliente e permite juntar entregas na mesma carga. **Fonte:** manual-09-expedicao#012; apostila (Parte I: como conduzir o projeto).",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine na ordem do caminho físico da mercadoria e mostre o efeito em Vendas e Estoque a cada passo. Use os pedidos reais separados na preparação. Quem opera é o cliente; você fala menos e observa mais.",
    "passos": [
     {
      "t": "O consultor apresentou a sequência completa antes de abrir telas: pedido faturado, liberar, montar carga, fechar, separar, conferir, carregar, iniciar rota, confirmar entrega.",
      "r": "**Como validar:** o cliente repete a sequência com as palavras dele. **Por quê:** é o ciclo da carga (Em montagem, Fechada, Em rota, Entregue) que ele vai acompanhar na **Visão Geral**. **Fonte:** manual-09-expedicao#001 e #006.",
      "s": "d"
     },
     {
      "t": "O cliente liberou um pedido real faturado em `Vendas > Pedidos de Venda`, pelo menu `⋯`, e viu o status virar **Lib. Expedição**.",
      "r": "**Como validar:** aparece a mensagem de pedido liberado. Mostre também que em pedido Em aberto o item não existe e que depois vira **Reverter Liberação**. **Fonte:** regra-vendas-liberar-para-expedicao-so-em-pedido-faturado; manual-09-expedicao#007.",
      "s": "d"
     },
     {
      "t": "O cliente montou uma carga em **+ Montar Nova Carga** com os dois pedidos, escolheu o veículo pelo **Resumo da Carga** e informou data de saída e motorista.",
      "r": "**Como validar:** a carga nasce **Em Montagem**. **Por quê:** ligar a escolha do veículo à ocupação real de peso e volume. Data prevista de saída e Motorista são obrigatórios. **Fonte:** manual-09-expedicao#008; procedimento-montar-carga-e-liberar-para-expedicao.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o caso de **Produção pendente** e a autorização com justificativa, explicando que fica registrada com o usuário.",
      "r": "**Como validar:** o cliente diz quem na empresa pode autorizar. **Por quê:** autorizar sem critério esconde OP não concluída. **Fonte:** manual-09-expedicao#008.",
      "s": "d",
      "campo": "Quem pode autorizar montagem com produção pendente"
     },
     {
      "t": "O cliente fechou a carga, imprimiu romaneio e etiquetas e apontou os checkpoints bipando os volumes até concluir todos.",
      "r": "**Como validar:** aparece **Todos os checkpoints concluídos** e o botão **Iniciar Rota**. Mostre **Reabrir** para ajustes. **Fonte:** manual-09-expedicao#008 e #009.",
      "s": "d"
     },
     {
      "t": "O cliente iniciou a rota e confirmou uma entrega informando quem recebeu; o consultor mostrou a mesma confirmação no app **Minhas Entregas**.",
      "r": "**Como validar:** a carga fica **Entregue**. **Por quê:** pelo ERP a entrega aparece como confirmada sem foto; pelo app, com foto e assinatura. **Fonte:** manual-09-expedicao#004 e #010.",
      "s": "d"
     },
     {
      "t": "O consultor simulou uma ocorrência bloqueante em outra entrega e levou o cliente até **Aguardando Re-Expedição** para decidir re-expedir ou cancelar.",
      "r": "**Como validar:** o cliente encontra o pedido na fila. **Por quê:** o pedido não some; espera uma decisão comercial. **Fonte:** roteiro-expedicao-04-entrega#025; roteiro-expedicao-05-re-expedicao-e-devolucoes#001.",
      "s": "d"
     },
     {
      "t": "O consultor explicou a devolução: a confirmação muda a entrega para **Devolvido** e cria pendência de estoque por produto, sem entrada automática.",
      "r": "**Como validar:** o cliente abre **Pendências de Estoque (Devolução)** e diz quem trata. **Por quê:** é a ligação da Expedição com o Estoque. **Fonte:** roteiro-expedicao-05-re-expedicao-e-devolucoes#014 e #016.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a aba **Indicadores** da Visão Geral com o resultado do treino: entregas no prazo, ocorrências, ocupação e entregas por motorista.",
      "r": "**Como validar:** o cliente escolhe o período e lê os números do treino. **Por quê:** é com eles que o gestor acompanha a expedição. **Fonte:** manual-09-expedicao#011.",
      "s": "d",
      "campo": "Data do treinamento"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "Agora o cliente faz sem ajuda, com outro pedido real. Você só observa e anota onde ele hesitou. Uma etapa só termina quando ele compreende, executa e valida.",
    "passos": [
     {
      "t": "O cliente explicou por que o botão **Liberar para Expedição** não aparece num pedido Em aberto e o que fazer.",
      "r": "**Como validar:** a resposta cita que o pedido precisa estar Faturado. **Por quê:** é a dúvida mais frequente do módulo. **Fonte:** regra-vendas-liberar-para-expedicao-so-em-pedido-faturado; faq-perguntas-frequentes.",
      "s": "d"
     },
     {
      "t": "O cliente montou sozinho uma carga e justificou a escolha do veículo pela ocupação de peso e volume.",
      "r": "**Como validar:** o **Resumo da Carga** não passa da capacidade. **Por quê:** carga mal dimensionada gera nova viagem. **Fonte:** manual-09-expedicao#008.",
      "s": "d"
     },
     {
      "t": "O expedidor fechou a carga e apontou os checkpoints ligados, bipando ou confirmando os volumes, e iniciou a rota.",
      "r": "**Como validar:** a carga fica **Em Rota**. **Por quê:** mostra que ele domina a parte física do processo. **Fonte:** manual-09-expedicao#009.",
      "s": "d"
     },
     {
      "t": "O cliente confirmou uma entrega e registrou uma ocorrência não bloqueante em outra, explicando a diferença entre as duas.",
      "r": "**Como validar:** a ocorrência informativa não manda o pedido para re-expedição. **Por quê:** tipo bloqueante usado só como observação muda o fluxo do pedido. **Fonte:** roteiro-expedicao-04-entrega#025.",
      "s": "d"
     },
     {
      "t": "O responsável comercial tomou a decisão de um pedido em **Aguardando Re-Expedição** e explicou o critério.",
      "r": "**Como validar:** ele conferiu ocorrência, foto e situação do material antes de decidir. **Por quê:** a decisão envolve material, pedido, cliente e estoque. **Fonte:** roteiro-expedicao-05-re-expedicao-e-devolucoes#004.",
      "s": "d"
     },
     {
      "t": "O cliente explicou que confirmar a devolução não devolve o saldo sozinho e mostrou onde o estoque trata a pendência.",
      "r": "**Como validar:** ele abre **Pendências de Estoque (Devolução)**. **Fonte:** roteiro-expedicao-05-re-expedicao-e-devolucoes#016.",
      "s": "d"
     },
     {
      "t": "O gestor leu os **Indicadores** de um período e apontou o motorista ou a ocorrência que merece atenção.",
      "r": "**Como validar:** a leitura bate com o que aconteceu no treino. **Fonte:** manual-09-expedicao#011.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "No go-live, a primeira carga real é acompanhada de perto. Combine com o responsável da expedição o que olhar todo dia nas primeiras semanas e só libere o módulo seguinte quando o ciclo fechar sem ajuda.",
    "passos": [
     {
      "t": "Todos os veículos e motoristas ativos estão cadastrados, e os motoristas que vão usar o app **Minhas Entregas** já entraram com o usuário deles.",
      "r": "**Como validar:** cada motorista abre o app no celular. **Por quê:** sem o app, toda confirmação vira registro sem foto. **Fonte:** manual-09-expedicao#004 e #010.",
      "s": "d"
     },
     {
      "t": "A primeira carga real saiu pelo sistema, do pedido liberado à entrega confirmada, com o consultor acompanhando.",
      "r": "**Como validar:** a carga aparece **Entregue** na **Visão Geral**. **Fonte:** apostila (Parte II: treinamentos, go-live e encerramento).",
      "s": "d",
      "campo": "Data da primeira carga real"
     },
     {
      "t": "Nas primeiras semanas, o responsável confere todo dia as cargas paradas em **Em montagem** ou **Fechada** e os pedidos liberados que não entraram em carga.",
      "r": "**Como validar:** a **Visão Geral** não tem cargas antigas paradas sem motivo. **Por quê:** carga parada costuma ser checkpoint ligado que ninguém aponta. **Fonte:** manual-09-expedicao#006.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, a fila **Aguardando Re-Expedição** e as **Pendências de Estoque (Devolução)** são tratadas toda semana, com dono definido.",
      "r": "**Como validar:** não há pedido esquecido na fila. **Por quê:** pedido sem decisão fica fora do acompanhamento comercial. **Fonte:** roteiro-expedicao-05-re-expedicao-e-devolucoes#001.",
      "s": "d"
     },
     {
      "t": "O gestor revisa as autorizações de montagem com produção pendente e as justificativas registradas.",
      "r": "**Como validar:** cada autorização tem justificativa coerente. **Por quê:** muitas autorizações indicam OP não concluída no sistema. **Fonte:** manual-09-expedicao#008.",
      "s": "d"
     },
     {
      "t": "O saldo de estoque é conferido antes de finalizar as notas dos pedidos que vão para a expedição.",
      "r": "**Como validar:** não aparecem saldos negativos depois das primeiras cargas. **Por quê:** na v1.22.13 a finalização da nota gerou saída mesmo sem saldo. **Fonte:** regra-faturamento-finalizar-nf-requisitos.",
      "s": "d"
     },
     {
      "t": "Critério para liberar o módulo seguinte: duas semanas de cargas fechando o ciclo sem ajuda e indicadores lidos pelo gestor; se o cliente implanta Projetos e Obras, as fases de separação, conferência, carregamento e entrega já alimentam o **Andamento das Obras**.",
      "r": "**Como validar:** o consultor confere uma obra com entregas no **Andamento das Obras**. **Fonte:** manual-12-projetos-e-tarefas#007; apostila (Módulo Projetos e Obras).",
      "s": "d",
      "campo": "Data de liberação do próximo módulo"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "O cliente libera, monta, fecha, aponta checkpoints e confirma entregas sozinho, com pedidos reais.",
    "s": "d"
   },
   {
    "t": "Os checkpoints ligados nos Parâmetros são exatamente os que a empresa faz na prática.",
    "s": "d"
   },
   {
    "t": "Ocorrências bloqueantes têm dono e a fila de re-expedição é tratada com rotina definida.",
    "s": "d"
   },
   {
    "t": "O estoque trata as devoluções pelas pendências, sem esperar entrada automática.",
    "s": "d"
   },
   {
    "t": "O gestor acompanha a operação pelos Indicadores da Visão Geral.",
    "s": "d"
   }
  ],
  "atencao": [
   "**Liberar para Expedição** só existe no menu `⋯` de pedido **Faturado**; o aviso da tela **Montar Nova Carga** manda clicar nesse botão, mas ele não fica na Expedição (regra-vendas-liberar-para-expedicao-so-em-pedido-faturado).",
   "Ligar checkpoints que a empresa não faz trava as cargas em **Fechada**, porque todos os volumes precisam ser apontados antes de iniciar a rota (manual-09-expedicao#005 e #009).",
   "Tipo de ocorrência bloqueante usado só para observação manda o pedido para re-expedição sem necessidade (roteiro-expedicao-04-entrega#025).",
   "Confirmar a devolução não cria entrada de estoque: sem rotina nas **Pendências de Estoque (Devolução)**, o saldo fica errado (roteiro-expedicao-05-re-expedicao-e-devolucoes#016).",
   "Autorizar montagem com **Produção pendente** sem critério esconde OP não concluída; a justificativa fica registrada com o usuário (manual-09-expedicao#008).",
   "Hoje o sistema ainda pode avisar **item sem ordem de produção vinculada** mesmo quando a OP existe; confira a OP antes de concluir que há erro (procedimento-montar-carga-e-liberar-para-expedicao).",
   "Produto sem peso e cliente sem CEP deixam a ocupação do veículo e o mapa sem sentido (manual-09-expedicao#002).",
   "Na v1.22.13 a finalização da nota gerou a saída **Expedição (PV)** mesmo sem saldo; oriente conferir o saldo antes de finalizar (regra-faturamento-finalizar-nf-requisitos)."
  ],
  "naoValidado": [
   "Movimento de estoque na finalização da nota: na v1.22.12 não houve saída e na v1.22.13 houve saída **Expedição (PV)**. Confira na versão do cliente antes de ensinar (regra-faturamento-finalizar-nf-requisitos; faq-limitacoes-conhecidas-v1-22-12, FAT-4).",
   "Re-expedição, devolução e as permissões de liberação e ocorrência vêm só dos roteiros de treinamento (marcados como possivelmente desatualizados); o manual-09 não cobre esse fluxo. Confira na tela antes de ensinar.",
   "O aviso **item sem ordem de produção vinculada** com OP existente foi visto em teste (procedimento-montar-carga-e-liberar-para-expedicao), enquanto o manual-09 descreve **Produção pendente** só para OP não concluída. Confira na tela qual aviso aparece."
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
  "etiqueta": "Consultor · Implantação · Projetos e Obras",
  "titulo": "Implantação de Projetos e Obras",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação de Projetos e Obras, em que cada obra vira o centro de controle de vendas, produção, campo e resultado.",
  "objetivo": "Ao final, o cliente cadastra cada obra com etapas e resultado previsto, vincula pedidos e documentos à obra e lê sozinho o Painel Financeiro, o Andamento das Obras e o Plano de Resultado. Ele sabe investigar uma diferença no documento de origem, sem mexer no painel. Para uma indústria de esquadrias, é aqui que se descobre se a obra deu margem.",
  "rodape": "Checklist de implantação · Projetos e Obras · fontes: apostila do consultor (Módulo Projetos e Obras), manual-12-projetos-e-tarefas, procedimento-cadastrar-cliente-produto-e-obra, regra-vendas-editar-pedido-somente-em-aberto, faq-limitacoes-conhecidas (FIN-4), roteiros de projetos 02 a 04 · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Vendas, Compras, Produção, Estoque e Financeiro estão implantados e em uso.",
    "r": "**Como validar:** confira pedidos, OPs e títulos reais dos últimos dias. **Por quê:** o projeto só mostra resultado com os documentos desses módulos ligados a ele. **Fonte:** apostila (Módulo Projetos e Obras: implantar após Vendas, Compras, Produção, Estoque e Financeiro).",
    "s": "d"
   },
   {
    "t": "Os clientes das obras estão cadastrados como participantes com **É Cliente?** ligado.",
    "r": "**Como validar:** procure 3 clientes de obras ativas em `Cadastros > Participantes`. **Por quê:** o projeto pede **Cliente**. **Fonte:** procedimento-cadastrar-cliente-produto-e-obra.",
    "s": "d"
   },
   {
    "t": "O local de estoque de cada obra, quando existir, está ativo e é da mesma empresa das ordens de produção.",
    "r": "**Como validar:** confira o local nas obras com estoque próprio. **Por quê:** local de outra empresa impede o apontamento; local inativo bloqueia a nota. **Fonte:** manual-12-projetos-e-tarefas#002; regra-faturamento-finalizar-nf-requisitos; regra-estoque-almoxarifado-central-ativo-e-pre-requisito.",
    "s": "d"
   },
   {
    "t": "O cliente separou a lista das obras ativas com cliente, orçamento, datas, endereço e responsável.",
    "r": "**Como validar:** a lista está com o consultor antes da preparação. **Por quê:** esses dados formam o cadastro do projeto. **Fonte:** manual-12-projetos-e-tarefas#002.",
    "s": "d",
    "campo": "Responsável pela lista de obras"
   },
   {
    "t": "Quem vai acompanhar as obras (gerente de obras, financeiro, diretoria) tem acesso ao módulo Projetos.",
    "r": "**Como validar:** cada um abre `Projetos > Todos os Projetos`. **Por quê:** os painéis são lidos por perfis diferentes. **Fonte:** manual-12-projetos-e-tarefas#001.",
    "s": "d"
   },
   {
    "t": "Se a empresa usa medição e instalação, o módulo Serviços está em uso ou planejado no cronograma.",
    "r": "**Como validar:** confira no cronograma. **Por quê:** o painel mostra medições em aberto como pendência da obra, e o endereço da obra é usado na medição. **Fonte:** manual-12-projetos-e-tarefas#002 e #006.",
    "s": "d"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Converse com quem responde pela obra e com quem apura o resultado: gerente de obras, financeiro e, se possível, o dono. Peça para ver a planilha de controle de obras que eles usam hoje.",
    "passos": [
     {
      "t": "O consultor perguntou: como vocês controlam as obras hoje? Planilha, pasta, sistema? O que define uma obra: um contrato, um orçamento, um endereço?",
      "r": "**Como validar:** ficou anotado o que vira um projeto no Flow. **Por quê:** o projeto é o guarda-chuva da obra; definir errado espalha documentos em projetos diferentes. **Fonte:** manual-12-projetos-e-tarefas#002.",
      "s": "d",
      "campo": "O que é uma obra para o cliente"
     },
     {
      "t": "O consultor perguntou: que código vocês usam para identificar a obra? O número do orçamento serve?",
      "r": "**Como validar:** o padrão de código está decidido. **Por quê:** **Código** é obrigatório e não pode repetir. **Fonte:** manual-12-projetos-e-tarefas#002; procedimento-cadastrar-cliente-produto-e-obra.",
      "s": "d",
      "campo": "Padrão de código da obra"
     },
     {
      "t": "O consultor perguntou: quais fases vocês acompanham numa obra (medição, produção, instalação, vistoria)? Quem cobra cada uma?",
      "r": "**Como validar:** há uma lista de estágios e etapas padrão. **Por quê:** ela vira as **Etapas** e **Estágios** do projeto. **Fonte:** manual-12-projetos-e-tarefas#003.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: como vocês sabem hoje se uma obra deu lucro? Calculam margem prevista no orçamento e comparam no fim?",
      "r": "**Como validar:** ficou claro se o cliente quer usar **Plano de Resultado** com previsto e realizado. **Por quê:** sem previsto, o painel não tem com o que comparar. **Fonte:** roteiro-projetos-03-plano-de-resultado-e-financeiro#005.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: compras de perfis, vidros e acessórios são feitas por obra? E as contas a pagar, são ligadas à obra?",
      "r": "**Como validar:** a resposta define quais documentos precisam carregar o projeto. **Por quê:** só o que é ligado ao projeto entra no realizado. **Fonte:** roteiro-projetos-03-plano-de-resultado-e-financeiro#008.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: vocês contratam por área (m²)? Precisam acompanhar peça a peça o que foi entregue?",
      "r": "**Como validar:** ficou decidido se o cliente usará **Andamento das Obras** e custo por m². **Por quê:** sem área contratada, o custo por m² fica indisponível. **Fonte:** plano-projetos#070; manual-12-projetos-e-tarefas#007.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Prepare com o gerente de obras e o financeiro juntos. O cuidado principal é a ligação entre pedido e obra: decida agora quem informa o projeto e em que momento, porque depois de faturar não dá mais para ajustar.",
    "passos": [
     {
      "t": "As dependências estão prontas: pedidos, OPs, compras e títulos em uso, clientes cadastrados e locais de estoque ativos e da empresa certa.",
      "r": "**Como validar:** confira um pedido real com OP e título. **Por quê:** o projeto reúne documentos desses módulos. **Fonte:** apostila (Módulo Projetos e Obras); manual-12-projetos-e-tarefas#002.",
      "s": "d"
     },
     {
      "t": "Ficou definido que o vendedor informa o **Projeto (opcional)** no pedido enquanto ele está Em aberto, antes de faturar.",
      "r": "**Como validar:** a regra está combinada com Vendas e registrada na OS. **Por quê:** pedido Faturado só tem Visualizar; o projeto não pode mais ser ajustado. **Fonte:** regra-vendas-editar-pedido-somente-em-aberto; faq-perguntas-frequentes.",
      "s": "d",
      "campo": "Quem informa o projeto no pedido"
     },
     {
      "t": "O cliente cadastrou as obras ativas com Nome do Projeto, Código, Status, Cliente, Responsável, datas, orçamento e endereço da obra.",
      "r": "**Como validar:** `Projetos > Todos os Projetos` mostra as obras com o status certo. **Por quê:** endereço é usado na medição e orçamento alimenta o painel. **Fonte:** manual-12-projetos-e-tarefas#002; procedimento-cadastrar-cliente-produto-e-obra.",
      "s": "d"
     },
     {
      "t": "Os estágios e as etapas padrão foram cadastrados nas obras, na ordem real do processo.",
      "r": "**Como validar:** abra **Etapas** numa obra e confira a ordem. **Por quê:** é a sequência que a equipe vai acompanhar. **Fonte:** manual-12-projetos-e-tarefas#003.",
      "s": "d"
     },
     {
      "t": "Nas obras em que o cliente quer medir resultado, os **Resultados Previstos** (margem) e as linhas de receita e despesa previstas foram informados.",
      "r": "**Como validar:** reabra a obra e confira os valores gravados. **Por quê:** o previsto é a referência do **Plano de Resultado**. **Fonte:** manual-12-projetos-e-tarefas#002; plano-projetos#015.",
      "s": "d"
     },
     {
      "t": "Se houver importação de projetos, o cliente pesquisou código e nome antes e importou poucos registros para conferir.",
      "r": "**Como validar:** não há projeto duplicado na lista. **Por quê:** repetir o lote cria duplicidade. **Fonte:** roteiro-projetos-04-comparacao-e-integracoes#008 e #010.",
      "s": "d"
     },
     {
      "t": "O financeiro sabe que não deve lançar à mão um título que o pedido da obra já gera.",
      "r": "**Como validar:** combine a regra com o financeiro. **Por quê:** título manual e título gerado para o mesmo recebível somam em dobro no **Painel Financeiro de Projetos**. **Fonte:** regra-financeiro-titulo-manual-e-gerado-duplicam-a-receita.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine com uma obra real do cliente, de preferência uma em andamento com pedido, produção e financeiro. Mostre que cada número do painel vem de um documento de outro módulo e leve o cliente até esse documento.",
    "passos": [
     {
      "t": "O consultor apresentou a sequência: venda, criação da obra, planejamento, execução, acompanhamento e resultado, ligando cada fase ao módulo de origem.",
      "r": "**Como validar:** o cliente diz de onde vem o valor vendido, o faturado e o custo. **Por quê:** é a visão da obra como centro de resultado. **Fonte:** apostila (Processos fiscal, de expedição e de projetos e obras).",
      "s": "d"
     },
     {
      "t": "O cliente cadastrou uma obra nova real e as etapas dela, com estágios.",
      "r": "**Como validar:** a obra aparece em **Todos os Projetos** com o status escolhido. **Por quê:** é o primeiro passo de toda obra nova. **Fonte:** manual-12-projetos-e-tarefas#002 e #003.",
      "s": "d"
     },
     {
      "t": "O cliente abriu um pedido Em aberto dessa obra e informou o **Projeto (opcional)** antes de faturar.",
      "r": "**Como validar:** o pedido aparece no painel da obra. **Por quê:** é a ligação que mais falha na operação. **Fonte:** regra-vendas-editar-pedido-somente-em-aberto.",
      "s": "d"
     },
     {
      "t": "O consultor percorreu o **Painel Financeiro do Projeto** de uma obra em andamento: orçamento, avisos, pendências e os cards de vendido, faturado, a faturar, a receber, a pagar e resultado.",
      "r": "**Como validar:** o cliente clica numa pendência e chega ao documento. **Por quê:** o painel aponta, o documento resolve. **Fonte:** manual-12-projetos-e-tarefas#006.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o **Andamento das Obras**: avanço físico, linha do tempo das peças e divergências.",
      "r": "**Como validar:** o cliente explica uma divergência e como tratar (vincular ao item ou marcar como peça extra). **Por quê:** liga Vendas, Produção e Expedição peça a peça. **Fonte:** manual-12-projetos-e-tarefas#007.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o **Plano de Resultado** com previsto, realizado e desvio, ordenando pelo maior desvio.",
      "r": "**Como validar:** o cliente abre a linha de maior desvio e procura o documento ligado. **Por quê:** é como se encontra o que comeu a margem. **Fonte:** roteiro-projetos-03-plano-de-resultado-e-financeiro#005 e #006.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou o **Dashboard Projetos** e o **Comparar Obras** com duas obras parecidas do cliente.",
      "r": "**Como validar:** o cliente aponta as obras que precisam de atenção. **Por quê:** é a visão da carteira para a diretoria. **Fonte:** manual-12-projetos-e-tarefas#008; roteiro-projetos-04-comparacao-e-integracoes#001.",
      "s": "d",
      "campo": "Data do treinamento"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "O cliente faz sem ajuda, com outra obra. Você só pergunta e observa. O ponto principal é ver se ele corrige a origem e não o painel.",
    "passos": [
     {
      "t": "O gerente de obras cadastrou sozinho uma obra com código no padrão combinado e as etapas padrão.",
      "r": "**Como validar:** código não repetido e etapas na ordem certa. **Fonte:** manual-12-projetos-e-tarefas#002 e #003.",
      "s": "d"
     },
     {
      "t": "O vendedor explicou por que o projeto precisa estar no pedido antes de faturar e o que acontece se esquecer.",
      "r": "**Como validar:** ele cita que pedido Faturado só tem Visualizar. **Fonte:** regra-vendas-editar-pedido-somente-em-aberto.",
      "s": "d"
     },
     {
      "t": "O cliente leu o painel de uma obra e disse quanto falta faturar, quanto falta receber e qual o resultado.",
      "r": "**Como validar:** os números batem com os documentos da obra. **Fonte:** manual-12-projetos-e-tarefas#006.",
      "s": "d"
     },
     {
      "t": "Diante de um **A faturar** negativo, o cliente explicou a causa provável: a nota ou o título carregam o projeto e o pedido não.",
      "r": "**Como validar:** ele vai ao pedido conferir o projeto. **Por quê:** é uma limitação conhecida, e a correção é na origem. **Fonte:** faq-limitacoes-conhecidas-v1-22-12 (FIN-4).",
      "s": "d"
     },
     {
      "t": "O cliente investigou uma diferença no documento de origem (pedido, OP, título ou registro de campo) sem alterar o previsto para igualar ao realizado.",
      "r": "**Como validar:** ele mostra o documento que explica a diferença. **Por quê:** o previsto é a referência do planejamento. **Fonte:** roteiro-projetos-02-paineis-e-andamento-das-obras#008; roteiro-projetos-03-plano-de-resultado-e-financeiro#012.",
      "s": "d"
     },
     {
      "t": "O cliente explicou que uma transferência entre locais de estoque não é compra nova da obra.",
      "r": "**Como validar:** ele confere o tipo do movimento antes de concluir. **Fonte:** roteiro-projetos-03-plano-de-resultado-e-financeiro#008.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "No go-live, toda obra nova nasce no Flow e todo pedido sai com projeto. Nas primeiras semanas, revise com o gerente de obras e o financeiro as obras ativas uma vez por semana.",
    "passos": [
     {
      "t": "Todas as obras ativas estão cadastradas, com status, responsável e etapas.",
      "r": "**Como validar:** os indicadores de **Todos os Projetos** batem com a lista do cliente. **Fonte:** manual-12-projetos-e-tarefas#005.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o consultor conferiu se os pedidos novos saem com projeto e se aparecem pendências de pedido sem faturamento.",
      "r": "**Como validar:** confira os pedidos da semana no painel das obras. **Por quê:** pedido sem projeto some do resultado da obra. **Fonte:** manual-12-projetos-e-tarefas#006; regra-vendas-editar-pedido-somente-em-aberto.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o financeiro conferiu se não há título duplicado (manual e gerado) nas obras.",
      "r": "**Como validar:** compare o painel com o Extrato. **Por quê:** a duplicidade infla receita no painel. **Fonte:** regra-financeiro-titulo-manual-e-gerado-duplicam-a-receita.",
      "s": "d"
     },
     {
      "t": "O gerente de obras revisa toda semana as obras que precisam de atenção no **Dashboard Projetos** e as divergências do **Andamento das Obras**.",
      "r": "**Como validar:** há uma rotina com dia e responsável. **Fonte:** manual-12-projetos-e-tarefas#007 e #008.",
      "s": "d",
      "campo": "Dia e responsável da revisão semanal"
     },
     {
      "t": "A primeira obra concluída no sistema teve o resultado lido com o cliente no **Plano de Resultado**.",
      "r": "**Como validar:** o cliente diz o que mudaria no próximo orçamento. **Por quê:** é o ganho prático do módulo. **Fonte:** roteiro-projetos-03-plano-de-resultado-e-financeiro#013.",
      "s": "d"
     },
     {
      "t": "Critério para liberar o módulo seguinte: pedidos saindo com projeto por duas semanas e painéis lidos sem ajuda; então libere Tarefas, que usa as obras para organizar as atividades das equipes.",
      "r": "**Como validar:** o consultor registra a liberação na OS. **Fonte:** apostila (Módulo Tarefas: implantar após Projetos e Obras e CRM).",
      "s": "d",
      "campo": "Data de liberação do próximo módulo"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Toda obra ativa está cadastrada com código, cliente, responsável, etapas e, quando combinado, resultado previsto.",
    "s": "d"
   },
   {
    "t": "Os pedidos saem com o projeto informado antes do faturamento.",
    "s": "d"
   },
   {
    "t": "O cliente lê o Painel Financeiro, o Andamento das Obras e o Plano de Resultado sem ajuda.",
    "s": "d"
   },
   {
    "t": "Diferenças são investigadas e corrigidas no documento de origem, não no painel.",
    "s": "d"
   },
   {
    "t": "Há rotina semanal de revisão das obras com responsável definido.",
    "s": "d"
   }
  ],
  "atencao": [
   "Pedido faturado sem projeto não pode mais ser ajustado: o **Projeto (opcional)** só é editável com o pedido Em aberto (regra-vendas-editar-pedido-somente-em-aberto).",
   "Hoje o painel ainda mostra **A faturar** negativo quando só a nota ou o título carregam o projeto e o pedido não (faq-limitacoes-conhecidas-v1-22-12, FIN-4).",
   "Título lançado à mão junto com o título gerado pelo pedido soma em dobro no **Painel Financeiro de Projetos** (regra-financeiro-titulo-manual-e-gerado-duplicam-a-receita).",
   "Cada projeto tem um único local de estoque, que precisa ser da mesma empresa das OPs e estar ativo; senão o apontamento ou a nota não finalizam (manual-12-projetos-e-tarefas#002; regra-faturamento-finalizar-nf-requisitos).",
   "Ajustar o previsto para ficar igual ao realizado apaga a referência do planejamento (roteiro-projetos-03-plano-de-resultado-e-financeiro#012).",
   "Repetir uma importação de projetos cria duplicidade; pesquise antes e importe poucos registros para conferir (roteiro-projetos-04-comparacao-e-integracoes#010).",
   "Implantar Projetos antes de Vendas, Compras, Produção, Estoque e Financeiro estarem em uso deixa os painéis vazios e tira a confiança do cliente no módulo (apostila, Módulo Projetos e Obras)."
  ],
  "naoValidado": [
   "A apostila cita **diário de obra** e **planejar as necessidades de materiais** no checklist do módulo, mas o manual-12, os roteiros e as regras não mostram essas telas. A seção da apostila está marcada para rever. Confira na tela antes de prometer ao cliente.",
   "Caminho do cadastro: o procedimento usa `Cadastros > Projetos > Novo Projeto`; o manual-12 usa o menu lateral do módulo Projetos, `Cadastros > Projetos` e **+ Novo Projeto**. Confira na tela qual caminho ensinar.",
   "Linhas de receita e despesa previstas no cadastro da obra vêm do plano de validação (plano-projetos#015); o manual-12 só cita a margem em **Resultados Previstos**. Confira na tela.",
   "Os roteiros de projetos estão marcados como possivelmente desatualizados (versão a definir). Confira na tela os nomes de **Plano de Resultado** e **Comparar Obras** antes do treino."
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
  "titulo": "Implantação de Tarefas",
  "subtitulo": "Checklist para o consultor conduzir e verificar a implantação do módulo Tarefas, que organiza as atividades das equipes em quadros com responsável, prazo e andamento.",
  "objetivo": "Ao final, o cliente monta quadros com listas, cria cartões com responsável, prioridade e término previsto, cobra os atrasos e usa recorrências e modelos para o que se repete. Cada pessoa acompanha o próprio trabalho em Minhas Tarefas. Numa indústria de esquadrias, o módulo dá ritmo às atividades da obra e dos departamentos.",
  "rodape": "Checklist de implantação · Tarefas · fontes: apostila do consultor (Módulo Tarefas), manual-12-projetos-e-tarefas, regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel, procedimento-criar-quadro-e-cartao-em-tarefas, funcional-tarefas-quadros-listas-e-cartoes, faq-limitacoes-conhecidas, roteiros de tarefas 03 a 05 · Harness Faktory Flow",
  "prerequisitos": [
   {
    "t": "Os processos que vão usar Tarefas (Projetos e Obras, CRM ou outro) já estão implantados.",
    "r": "**Como validar:** confira no cronograma e na OS. **Por quê:** Tarefas organiza atividades de processos que já existem no Flow. **Fonte:** apostila (Módulo Tarefas: implantar após os processos que usarão o gerenciamento de atividades).",
    "s": "d"
   },
   {
    "t": "Todas as pessoas que vão receber tarefas são usuários do Flow com acesso ao módulo.",
    "r": "**Como validar:** procure cada pessoa em **Adicionar responsável** de um cartão de teste. **Por quê:** só usuário pode ser responsável, e o cartão só chega em **Minhas Tarefas** com responsável. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel; manual-12-projetos-e-tarefas#009.",
    "s": "d"
   },
   {
    "t": "Os usuários sabem abrir o módulo pelo menu de módulos.",
    "r": "**Como validar:** cada usuário abre Tarefas sozinho. **Por quê:** hoje a busca Ctrl+K ainda não encontra o módulo Tarefas; é defeito reportado. **Fonte:** faq-limitacoes-conhecidas-v1-22-12; funcional-tarefas-quadros-listas-e-cartoes.",
    "s": "d"
   },
   {
    "t": "O consultor conferiu se o cliente tem a versão PRO antes de prometer automações.",
    "r": "**Como validar:** confira a licença com o comercial da Faktory. **Por quê:** as automações de Tarefas existem só na versão PRO. **Fonte:** roteiro-tarefas-04-etiquetas-modelos-e-automacoes#010.",
    "s": "d",
    "campo": "Licença do cliente"
   },
   {
    "t": "Há um responsável no cliente por definir os quadros e cobrar o uso (coordenador, gerente de obras ou gestor de área).",
    "r": "**Como validar:** o nome está na OS. **Por quê:** sem quem cobre, o quadro vira lista abandonada. **Fonte:** apostila (Módulo Tarefas: fluxo criação, responsável e prazo, execução, acompanhamento, conclusão).",
    "s": "d",
    "campo": "Responsável pelos quadros"
   }
  ],
  "fluxos": [
   {
    "titulo": "1. Entendimento do cenário do cliente",
    "intro": "Converse com quem distribui e cobra trabalho: gestores de área e o gerente de obras. Peça para ver como as atividades são passadas hoje (grupo de mensagem, planilha, quadro na parede).",
    "passos": [
     {
      "t": "O consultor perguntou: como vocês passam e cobram as atividades hoje? Onde fica registrado quem é o responsável e o prazo?",
      "r": "**Como validar:** o meio atual está anotado. **Por quê:** é o que o Tarefas substitui; o fluxo é criação, responsável e prazo, execução, acompanhamento e conclusão. **Fonte:** apostila (Módulo Tarefas).",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: vocês querem um quadro por departamento, por obra ou por processo? Quem participa de cada um?",
      "r": "**Como validar:** a estrutura de quadros está desenhada no papel. **Por quê:** é a decisão que mais afeta o uso; o manual sugere um quadro por departamento ou por obra. **Fonte:** manual-12-projetos-e-tarefas#004.",
      "s": "d",
      "campo": "Estrutura de quadros definida"
     },
     {
      "t": "O consultor perguntou: quais fases uma atividade atravessa até ficar pronta? (por exemplo: a fazer, em andamento, concluído)",
      "r": "**Como validar:** as listas padrão estão definidas. **Por quê:** o quadro novo nasce sem listas; elas são criadas em **+ Adicionar lista**. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: que atividades se repetem toda semana ou todo mês? (conferência de estoque, revisão de indicadores, inspeção de equipamentos)",
      "r": "**Como validar:** há uma lista de candidatas a recorrência. **Por quê:** recorrência é para o que se repete, não para obra com começo e fim. **Fonte:** roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#005.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: toda obra segue o mesmo cronograma de atividades? Quem monta esse cronograma hoje?",
      "r": "**Como validar:** ficou decidido se vale criar um modelo. **Por quê:** o modelo repete listas, tarefas, checklists, responsáveis, etiquetas e dependências. **Fonte:** roteiro-tarefas-04-etiquetas-modelos-e-automacoes#003.",
      "s": "d"
     },
     {
      "t": "O consultor perguntou: quem precisa ver a carga de trabalho da equipe e os atrasos? Com que frequência?",
      "r": "**Como validar:** o gestor que vai usar o **Dashboard** está identificado. **Por quê:** o Dashboard mostra atrasadas, vencendo em 7 dias e carga por responsável. **Fonte:** manual-12-projetos-e-tarefas#010.",
      "s": "d"
     }
    ]
   },
   {
    "titulo": "2. Preparação da implantação",
    "intro": "Monte a estrutura com o responsável pelos quadros, sem encher de tarefas fictícias. Comece pequeno: um ou dois quadros reais que a equipe vai usar já na semana seguinte.",
    "passos": [
     {
      "t": "As dependências estão prontas: usuários cadastrados com acesso, obras cadastradas em Projetos (se os quadros forem por obra) e licença conferida.",
      "r": "**Como validar:** confira uma obra real e um usuário de cada área. **Por quê:** o cartão pode ser vinculado a pedido ou obra, e o modelo pede o projeto ao criar o quadro. **Fonte:** manual-12-projetos-e-tarefas#009; roteiro-tarefas-04-etiquetas-modelos-e-automacoes#007.",
      "s": "d"
     },
     {
      "t": "O cliente criou os primeiros quadros reais em **Novo Quadro**, com Nome do Quadro e Tipo, e as listas combinadas.",
      "r": "**Como validar:** **Meus Quadros** mostra os quadros com as listas. **Por quê:** o quadro nasce sem listas. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; funcional-tarefas-quadros-listas-e-cartoes.",
      "s": "d"
     },
     {
      "t": "Ficou combinado o uso de **Prioridade** e **Término Previsto**: o que é urgente e como se define o prazo.",
      "r": "**Como validar:** a regra está escrita na OS. **Por quê:** o prazo é o campo **Término Previsto** (não existe Prazo), e é ele que gera os atrasos no Dashboard. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "Ficou combinada a regra: nenhum cartão fica sem responsável.",
      "r": "**Como validar:** o responsável pelos quadros concorda em cobrar isso. **Por quê:** o cartão nasce sem responsável e só aparece em **Minhas Tarefas** depois de **Adicionar responsável**. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "Se a empresa repete o cronograma das obras, o cliente montou um modelo com listas e tarefas na ordem certa e publicou a versão.",
      "r": "**Como validar:** o modelo aparece publicado. **Por quê:** modelo não publicado não pode ser usado para criar ou aplicar quadros. **Fonte:** roteiro-tarefas-04-etiquetas-modelos-e-automacoes#004 e #006.",
      "s": "d"
     },
     {
      "t": "As etiquetas foram definidas com poucos nomes, que a equipe entende do mesmo jeito.",
      "r": "**Como validar:** a lista de etiquetas está registrada. **Por quê:** etiquetas entram nos modelos e ajudam a filtrar. **Fonte:** roteiro-tarefas-04-etiquetas-modelos-e-automacoes#003.",
      "s": "d",
      "campo": "Etiquetas definidas"
     }
    ]
   },
   {
    "titulo": "3. Condução do treinamento",
    "intro": "Treine com atividades reais da semana do cliente, criadas na hora. Primeiro com o gestor, depois com quem executa. Mostre sempre o lado de quem recebe a tarefa em Minhas Tarefas.",
    "passos": [
     {
      "t": "O consultor apresentou o fluxo: criar a tarefa, definir responsável e prazo, executar, acompanhar e concluir, e mostrou como abrir o módulo pelo menu de módulos.",
      "r": "**Como validar:** o cliente repete o fluxo e abre o módulo sozinho. **Por quê:** hoje a busca Ctrl+K ainda não encontra o módulo Tarefas. **Fonte:** apostila (Módulo Tarefas); faq-limitacoes-conhecidas-v1-22-12.",
      "s": "d"
     },
     {
      "t": "O gestor criou um cartão real em **+ Adicionar tarefa** e preencheu **Prioridade**, **Término Previsto** e **Adicionar responsável**.",
      "r": "**Como validar:** o sistema confirma o responsável. **Por quê:** é o mínimo para a tarefa ser cobrada. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "O responsável abriu **Minhas Tarefas** no usuário dele e encontrou o cartão, com os contadores de em andamento, atrasadas, urgentes e concluídas.",
      "r": "**Como validar:** o cartão aparece para o responsável. **Por quê:** ligar a criação pelo gestor ao trabalho de quem executa. **Fonte:** roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#001; manual-12-projetos-e-tarefas#010.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou a aba **Checklists** e a aba **Comentários**, com menção @nome para notificar um colega, e o vínculo do cartão com uma obra ou pedido.",
      "r": "**Como validar:** aparece a confirmação de comentário adicionado. **Por quê:** a conversa fica no cartão e não no grupo de mensagens. **Fonte:** funcional-tarefas-quadros-listas-e-cartoes; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "O cliente moveu o cartão entre listas, trocou a visualização (Kanban, lista, tabela, calendário, Gantt) e usou **Filtros** por responsável.",
      "r": "**Como validar:** o cartão muda de lista. **Por quê:** é assim que o andamento aparece para todos. **Fonte:** funcional-tarefas-quadros-listas-e-cartoes; manual-12-projetos-e-tarefas#009.",
      "s": "d"
     },
     {
      "t": "O cliente arquivou um cartão concluído e o restaurou em **Arquivadas**.",
      "r": "**Como validar:** o cartão volta e o cliente revisa status, prazo e responsável. **Por quê:** arquivado fica só em consulta. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas; roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#010 e #011.",
      "s": "d"
     },
     {
      "t": "O consultor criou com o cliente uma recorrência para uma atividade real da lista da etapa 1, com **Tornar recorrente**.",
      "r": "**Como validar:** o próximo dia de execução está correto. **Por quê:** cada execução gera uma nova tarefa com histórico próprio. **Fonte:** roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#005 e #012.",
      "s": "d"
     },
     {
      "t": "Se houver modelo, o cliente criou o quadro de uma obra real a partir dele, informou o projeto e a data de início e revisou as datas.",
      "r": "**Como validar:** o quadro nasce com listas, tarefas, responsáveis e prazos. **Por quê:** o cronograma da obra deixa de ser montado à mão. **Fonte:** roteiro-tarefas-04-etiquetas-modelos-e-automacoes#007.",
      "s": "d"
     },
     {
      "t": "O consultor mostrou ao gestor o **Dashboard**: tarefas atrasadas, vencendo em 7 dias e carga por responsável.",
      "r": "**Como validar:** o gestor clica em atrasadas e abre a lista. **Por quê:** a correção é feita na tarefa de origem, não no dashboard. **Fonte:** manual-12-projetos-e-tarefas#010; roteiro-tarefas-05-dashboard-de-tarefas#003.",
      "s": "d",
      "campo": "Data do treinamento"
     }
    ]
   },
   {
    "titulo": "4. Validação do aprendizado",
    "intro": "O cliente faz sem ajuda, com atividades reais. Você observa e pergunta. Confira os dois lados: o gestor que distribui e a pessoa que executa.",
    "passos": [
     {
      "t": "O gestor criou sozinho um quadro novo com listas e um cartão com responsável, prioridade e término previsto.",
      "r": "**Como validar:** o cartão aparece em **Minhas Tarefas** do responsável. **Fonte:** procedimento-criar-quadro-e-cartao-em-tarefas.",
      "s": "d"
     },
     {
      "t": "O cliente explicou por que um cartão não aparece em **Minhas Tarefas** e resolveu.",
      "r": "**Como validar:** a resposta é: falta responsável; usar **Adicionar responsável**. **Por quê:** é a dúvida mais comum do módulo. **Fonte:** faq-perguntas-frequentes; regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "Quem executa atualizou o próprio cartão: marcou itens do checklist, comentou e moveu para a lista seguinte.",
      "r": "**Como validar:** o histórico do cartão mostra as mudanças. **Fonte:** funcional-tarefas-quadros-listas-e-cartoes.",
      "s": "d"
     },
     {
      "t": "O gestor encontrou as tarefas atrasadas da equipe e explicou o motivo de uma delas, corrigindo a tarefa de origem.",
      "r": "**Como validar:** ele usa **Atrasadas** em Minhas Tarefas ou o card do Dashboard. **Fonte:** roteiro-tarefas-05-dashboard-de-tarefas#003.",
      "s": "d"
     },
     {
      "t": "O cliente explicou quando usar recorrência e quando não usar.",
      "r": "**Como validar:** ele cita atividade periódica como exemplo certo e obra com começo e fim como exemplo errado. **Fonte:** roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#005.",
      "s": "d"
     },
     {
      "t": "Se houver modelo, o cliente explicou que precisa publicar nova versão depois de alterar e que aplicar em quadro preenchido pode duplicar tarefas.",
      "r": "**Como validar:** a resposta cita os dois cuidados. **Fonte:** roteiro-tarefas-04-etiquetas-modelos-e-automacoes#006 e #008.",
      "s": "d",
      "campo": "Dúvidas registradas"
     }
    ]
   },
   {
    "titulo": "5. Preparação para utilização e go-live",
    "intro": "No go-live, a equipe para de passar tarefas pelo canal antigo. Combine com o responsável pelos quadros a data de corte e acompanhe as primeiras semanas pelo Dashboard.",
    "passos": [
     {
      "t": "Foi definida a data a partir da qual as atividades são passadas só pelo Tarefas.",
      "r": "**Como validar:** a data está na OS e foi comunicada à equipe. **Por quê:** dois canais ao mesmo tempo esvaziam o quadro. **Fonte:** apostila (Parte II: treinamentos, go-live e encerramento).",
      "s": "d",
      "campo": "Data de corte do canal antigo"
     },
     {
      "t": "Nas primeiras semanas, o responsável confere toda semana se há cartões sem responsável ou sem término previsto.",
      "r": "**Como validar:** filtre o quadro por responsável vazio. **Por quê:** cartão sem responsável não chega a ninguém, e sem término previsto não gera atraso. **Fonte:** regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.",
      "s": "d"
     },
     {
      "t": "Nas primeiras semanas, o gestor acompanha no **Dashboard** as atrasadas e a carga por responsável.",
      "r": "**Como validar:** o gestor exporta ou mostra o Dashboard na reunião da equipe. **Por quê:** mostra quem está sobrecarregado. **Fonte:** manual-12-projetos-e-tarefas#010.",
      "s": "d"
     },
     {
      "t": "As recorrências combinadas estão gerando as tarefas nos dias previstos.",
      "r": "**Como validar:** confira a primeira execução de cada recorrência. **Fonte:** roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#005.",
      "s": "d"
     },
     {
      "t": "Os quadros de obras encerradas têm as tarefas antigas arquivadas.",
      "r": "**Como validar:** os quadros ativos mostram só trabalho em andamento. **Fonte:** roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#012.",
      "s": "d"
     },
     {
      "t": "Critério para liberar o módulo seguinte ou encerrar: duas semanas de uso real, sem cartões órfãos e com atrasos cobrados pelo Dashboard; então revise pendências e formalize o encerramento.",
      "r": "**Como validar:** pendências revisadas e OS aprovadas. **Por quê:** a métrica é o uso com autonomia, não o número de reuniões. **Fonte:** apostila (Parte II: treinamentos, go-live e encerramento).",
      "s": "d",
      "campo": "Data de liberação ou encerramento"
     }
    ]
   }
  ],
  "resultado": [
   {
    "t": "Os quadros reais estão criados, com listas que refletem as fases da atividade.",
    "s": "d"
   },
   {
    "t": "Todo cartão tem responsável e término previsto, e cada pessoa trabalha por Minhas Tarefas.",
    "s": "d"
   },
   {
    "t": "O gestor cobra atrasos pelo Dashboard e corrige na tarefa de origem.",
    "s": "d"
   },
   {
    "t": "Atividades periódicas estão em recorrência e, se combinado, o cronograma de obra sai de um modelo publicado.",
    "s": "d"
   },
   {
    "t": "O canal antigo de passar tarefas foi abandonado na data combinada.",
    "s": "d"
   }
  ],
  "atencao": [
   "O cartão nasce sem responsável e não aparece em **Minhas Tarefas** até alguém usar **Adicionar responsável** (regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel).",
   "O prazo é o campo **Término Previsto**; não existe campo Prazo. Sem ele, a tarefa nunca aparece como atrasada (regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel).",
   "Hoje a busca Ctrl+K ainda não encontra o módulo Tarefas; é defeito reportado. Ensine abrir pelo menu de módulos (faq-limitacoes-conhecidas-v1-22-12).",
   "Recorrência usada para obra com começo e fim gera tarefas que ninguém faz (roteiro-tarefas-03-minhas-tarefas-recorrencias-e-arquivo#005).",
   "Aplicar um modelo em quadro já preenchido pode duplicar tarefas; modelo alterado precisa de nova versão publicada (roteiro-tarefas-04-etiquetas-modelos-e-automacoes#006 e #008).",
   "Automações existem só na versão PRO; não prometa sem conferir a licença (roteiro-tarefas-04-etiquetas-modelos-e-automacoes#010).",
   "Implantar Tarefas antes dos processos que ele organiza vira um quadro sem dono; implante depois de Projetos e Obras ou CRM (apostila, Módulo Tarefas)."
  ],
  "naoValidado": [
   "Quadro inicial: o manual-12 diz que o quadro **Tarefas Gerais** já existe com 3 listas; o procedimento e a regra dizem que numa conta nova aparece Nenhum quadro ainda e que o quadro novo nasce sem listas. Confira na tela do cliente.",
   "Modelos: o roteiro manda abrir **Modelos** no menu Tarefas; o menu listado no manual-12 não tem esse item e mostra o botão **A partir de Modelo** em Meus Quadros. Confira o caminho na tela.",
   "Nome da tela de arquivados: **Arquivadas** no manual e na base funcional, **Tarefas Arquivadas** no roteiro. Confira na tela.",
   "Criar o cartão: **+ Adicionar tarefa** na base funcional; no manual-12, o **+** da coluna e **Adicionar**. Confira o rótulo na tela.",
   "A apostila cita consultar tarefas por equipe; as fontes de tela só mostram filtro por responsável e carga por responsável. Confira se existe visão por equipe."
  ],
  "video": {
   "id": "consultor-10-tarefas",
   "titulo": "Quadro, cartão, regras e colaboração",
   "resumo": "O conceito e as regras de negócio do fluxo, com as telas reais do Faktory Flow."
  }
 }
];
