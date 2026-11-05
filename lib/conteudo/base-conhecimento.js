/* GERADO por scripts/gerar-base-conhecimento.mjs — não edite à mão.
   Fontes: Harness Faktory Flow (conhecimento/) e dados do Guia gerados do Harness. Cada bloco cita "fontes".
   Para atualizar: node scripts/gerar-base-conhecimento.mjs --harness <pasta do Harness> */
export const BASE = {
 "versao": "2026-11-04",
 "gerado_de": {
  "mapa": "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
  "harness": "harness:conhecimento/"
 },
 "modulos": [
  {
   "id": "primeiros-passos",
   "ordem": 0,
   "titulo": "Primeiros passos",
   "subtitulo": "Entrar, trocar de módulo, buscar telas e ler listas.",
   "cor": null,
   "icone": null,
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
    "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
   ],
   "materiais": [
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "primeiros-passos:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/00_Manual_Inicio_e_navegacao_Timbrado.docx"
     ],
     "id": "primeiros-passos:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": "/checklists/estagiarios/00-onboarding-estagiario.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
     ],
     "id": "primeiros-passos:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Onboarding do estagiário",
     "status": "disponivel"
    },
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": "/checklists/estagiarios/01-primeiros-passos-navegacao.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
     ],
     "id": "primeiros-passos:checklist-inicial-2",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Primeiros passos e navegação",
     "status": "disponivel"
    },
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": "#inicial/primeiros-passos",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#geral.seletor-modulos"
     ],
     "id": "primeiros-passos:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "primeiros-passos:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Vídeo avançado",
     "status": "em-preparacao"
    },
    {
     "modulo": "primeiros-passos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/00_Manual_Inicio_e_navegacao_Timbrado.docx"
     ],
     "id": "primeiros-passos:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Onboarding do estagiário",
        "texto": "Seu roteiro para aprender o Faktory Flow aos poucos: primeiro a navegação, depois cada módulo na ordem do fluxo da empresa — do primeiro contato com o cliente até o dinheiro no caixa.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Organizar suas primeiras semanas: o que pedir antes de começar, a ordem recomendada dos checklists e os combinados de segurança. Ao final, você deve saber encontrar qualquer tela, criar os seus registros de treino, consultar o que já existe sem alterar nada e explicar como um pedido passa pelos módulos.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Primeiros passos e navegação",
        "texto": "O básico que vale para todas as telas do Faktory Flow. Nada aqui altera dados.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Encontrar qualquer tela do sistema, entender o que aparece no topo e no menu, e ler uma lista (filtros, colunas, ações) sem alterar nenhum registro.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
       "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "Antes do primeiro dia",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Saber qual ambiente usar para treinar (endereço do staging ou do dev) e qual empresa selecionar.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ter o navegador atualizado e, de preferência, uma tela larga: as listas ficam espremidas em janelas pequenas.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "Semana 1 — Navegação e cadastros",
        "onde": null,
        "intro": "Objetivo: sentir-se à vontade nas telas. Os únicos registros que você cria são os de treino, no início de cada checklist.",
        "passos": [
         {
          "texto": "Concluir o checklist **01 · Primeiros passos e navegação**.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir `GLOBAIS > Treinamento > Minhas Trilhas` e ver se há trilha obrigatória para você.",
          "nota": "A Central de Treinamento mostra trilhas, pontos e progresso.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "1. Entrar e conferir onde você está",
        "onde": "tela `Início`",
        "intro": null,
        "passos": [
         {
          "texto": "Fazer login e conferir o **selo da empresa** no topo da tela.",
          "nota": "Aparece o aviso \"Empresa selecionada automaticamente\" e o nome da empresa no selo.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Conferir a versão do sistema no rodapé do menu lateral (ex.: `Faktory Flow v1.22.11`).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler os blocos da tela Início: `Alertas urgentes`, `Tarefas do dia` e `Resumo do negócio`.",
          "nota": "Cada alerta é um atalho para a tela já filtrada (ex.: pedidos aguardando faturamento → Pedidos de Venda).",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Esperar o aviso \"Verificando permissões...\" sumir antes de clicar em algo.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "2. Trocar de módulo",
        "onde": "botão de grade `Abrir menu de módulos` (canto superior esquerdo)",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir o menu de módulos, digitar o nome em `Buscar módulo...` e escolher.",
          "nota": "O topo do menu lateral passa a mostrar \"MÓDULO\" com o nome escolhido. A tecla Esc fecha o painel.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Reconhecer os 15 módulos: Vendas, Compras, CRM, Recebimento, Estoque, Produção, Serviços, Financeiro, Fiscal, Faturamento, Expedição, Projetos, Tarefas, Config. Interna e Implantação.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir os grupos com seta (`>`) do menu lateral: Configurações, Relatórios e Tabelas Dinâmicas vêm fechados e escondem telas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Usar `Recolher menu` (seta `<`) quando precisar de mais espaço para uma lista.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Achar uma tela pela busca",
        "onde": "campo `Pesquisar funcionalidades...` ou Ctrl+K",
        "intro": null,
        "passos": [
         {
          "texto": "Pressionar Ctrl+K e digitar \"pedido\".",
          "nota": "Aparecem sugestões como Pedidos de Compra e Pedidos de Venda. Use ↑↓ e Enter.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Lembrar que a busca encontra **telas**, não registros: para achar um pedido pelo número, use a pesquisa dentro da lista.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Ler uma lista",
        "onde": "qualquer lista, por exemplo `Vendas > Pedidos de Venda`",
        "intro": null,
        "passos": [
         {
          "texto": "Identificar os botões do topo: `Mais...` (Colunas e Exportar para Excel), `Filtros` e `+ Novo`.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Conferir o **filtro padrão** antes de concluir que algo não existe (ex.: Pedidos de Venda abre só com Status \"Em Aberto\").",
          "nota": "Ao trocar o Status para \"Todos\", a lista mostra também pedidos faturados e cancelados.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Usar `Pesquisar...`, a paginação (\"Exibindo 1 a N de N itens\") e o botão `Atualizar Página`.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir o menu `...` ou `⋮` de uma linha e separar o que é consulta (Histórico, Ver Timeline) do que altera dados (Excluir, Converter, Finalizar). Feche com Esc sem clicar.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Notificações, ajuda e preferências",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Abrir o sino de `Notificações` e ver as abas Geral e Solicitações.",
          "nota": "A lista pode mostrar \"0 notificações\" por um instante antes de carregar; espere.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Achar o botão `?` (manuais de ajuda) no canto das listas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "No menu do usuário, conhecer `Modo Escuro` e `Densidade`. Não use `Configurar E-mail (SMTP)`.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "6. Saber o que é administração",
        "onde": "bloco `GLOBAIS` no fim do menu lateral",
        "intro": null,
        "passos": [
         {
          "texto": "Percorrer Painel de Controle, Configurações, Segurança, Treinamento, Aplicativos e Assinatura **só lendo**.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir `GLOBAIS > Treinamento > Minhas Trilhas` e ver suas trilhas obrigatórias (trilhas e quiz da Central de Treinamento).",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
       "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Seletor de módulos (ícone de grade)",
          "nota": "ícone de grade (canto superior esquerdo)",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#geral.seletor-modulos"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#geral.seletor-modulos"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#geral.seletor-modulos"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "Antes de começar — Por que a sua conta vem zerada",
        "onde": null,
        "intro": "No Faktory Flow, cada módulo usa o que o anterior criou: lead, cliente, pedido, compra, estoque, produção, serviços, nota e títulos. Uma empresa nova não tem nada disso, então cada checklist começa com **Preparar seus dados**: você cria o registro de que ele precisa e anota o número.",
        "passos": [
         {
          "texto": "Entender a ordem: o que você criar no checklist 02 (cliente, produto, obra) é usado no 04 (pedido), que alimenta 05 a 13. Por isso a trilha segue a numeração.",
          "nota": null,
          "selo": "documento"
         },
         {
          "texto": "Combinar com o supervisor os **cadastros-base** que só um consultor configura: unidade de medida, almoxarifado central ativo, condição e meio de pagamento (que não seja boleto sem conta emissora), plano de contas, conta bancária, CFOP e NCM do produto, técnico e conferente de serviços.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Dar o nome **TESTE ESTAGIÁRIO - …** a tudo o que você criar e anotar o número de cada registro nos campos dos checklists: o checklist **15** reúne todos.",
          "nota": null,
          "selo": "documento"
         },
         {
          "texto": "Se um botão não aparecer ou o sistema negar permissão, anotar em **Problema** e avisar o supervisor: pode ser permissão do seu perfil ou cadastro-base faltando.",
          "nota": null,
          "selo": "documento"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "link",
        "material": "primeiros-passos:checklist-inicial",
        "titulo": "Onboarding do estagiário",
        "status": "disponivel",
        "url": "/checklists/estagiarios/00-onboarding-estagiario.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "link",
        "material": "primeiros-passos:checklist-inicial-2",
        "titulo": "Primeiros passos e navegação",
        "status": "disponivel",
        "url": "/checklists/estagiarios/01-primeiros-passos-navegacao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
       "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:primeiros-passos",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Primeiros passos e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: tela `Início`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: botão de grade `Abrir menu de módulos` (canto superior esquerdo)"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: campo `Pesquisar funcionalidades...` ou Ctrl+K"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: qualquer lista, por exemplo `Vendas > Pedidos de Venda`"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: bloco `GLOBAIS` no fim do menu lateral"
         },
         {
          "id": "executei-6",
          "texto": "Executei: Antes do primeiro dia"
         },
         {
          "id": "executei-7",
          "texto": "Executei: Antes de começar — Por que a sua conta vem zerada"
         },
         {
          "id": "executei-8",
          "texto": "Executei: Semana 1 — Navegação e cadastros"
         },
         {
          "id": "executei-9",
          "texto": "Executei: Semana 2 — O lado comercial"
         },
         {
          "id": "executei-10",
          "texto": "Executei: Semana 3 — Suprimentos e operação"
         },
         {
          "id": "executei-11",
          "texto": "Executei: Semana 4 — Gestão"
         },
         {
          "id": "executei-12",
          "texto": "Executei: Semana 5 — Os fluxos dos módulos mais maduros (grupo \"Fluxos principais do estagiário\" da biblioteca)"
         },
         {
          "id": "executei-13",
          "texto": "Executei: 1. Entrar e conferir onde você está"
         },
         {
          "id": "executei-14",
          "texto": "Executei: 2. Trocar de módulo"
         },
         {
          "id": "executei-15",
          "texto": "Executei: 3. Achar uma tela pela busca"
         },
         {
          "id": "executei-16",
          "texto": "Executei: 4. Ler uma lista"
         },
         {
          "id": "executei-17",
          "texto": "Executei: 5. Notificações, ajuda e preferências"
         },
         {
          "id": "executei-18",
          "texto": "Executei: 6. Saber o que é administração"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
       "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:primeiros-passos",
        "total": 20,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "primeiros-passos:checklist-inicial",
        "titulo": "Onboarding do estagiário",
        "status": "disponivel",
        "url": "/checklists/estagiarios/00-onboarding-estagiario.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING"
        ]
       },
       {
        "tipo": "link",
        "material": "primeiros-passos:checklist-inicial-2",
        "titulo": "Primeiros passos e navegação",
        "status": "disponivel",
        "url": "/checklists/estagiarios/01-primeiros-passos-navegacao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#navegacao"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "00 Manual Inicio e navegacao",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/00_Manual_Inicio_e_navegacao_Timbrado.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/00_Manual_Inicio_e_navegacao_Timbrado.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#ONBOARDING",
       "guia:scripts/dados-checklists-estagiarios.mjs#navegacao",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/00_Manual_Inicio_e_navegacao_Timbrado.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "fundacao",
   "ordem": 1,
   "titulo": "Cadastros e Fundação",
   "subtitulo": "Participantes (clientes, fornecedores), produtos e projetos.",
   "cor": null,
   "icone": null,
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:scripts/dados-checklists-estagiarios.mjs#cadastros",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
   ],
   "materiais": [
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fundacao:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/01_Manual_Cadastros_Base_Timbrado.docx"
     ],
     "id": "fundacao:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": "/checklists/estagiarios/02-cadastros-basicos.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
     ],
     "id": "fundacao:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Cadastros básicos",
     "status": "disponivel"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": "#inicial/fundacao",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#cadastros.participantes",
      "harness:conhecimento/glossario/telas.yaml#cadastros.produtos",
      "harness:conhecimento/glossario/telas.yaml#cadastros.projetos"
     ],
     "id": "fundacao:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-01-fundacao.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
     ],
     "id": "fundacao:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação da Fundação: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fundacao:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Vídeo avançado",
     "status": "em-preparacao"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": "#consultor/fundacao",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-crm-formulario-do-lead-secoes-e-campos.md",
      "harness:conhecimento/produto/regras-negocio/regra-geral-os-dados-pertencem-a-empresa-e-uma-empresa-nova-comeca-vazia.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-item-parametrico-da-estrutura-exige-cor.md"
     ],
     "id": "fundacao:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "fundacao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/01_Manual_Cadastros_Base_Timbrado.docx"
     ],
     "id": "fundacao:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Cadastros básicos",
        "texto": "Clientes, fornecedores, leads, produtos e obras são cadastros compartilhados por todos os módulos.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Localizar e ler os cadastros que todos os processos usam — participante, produto e projeto/obra — e entender por que um erro de cadastro aparece depois na nota fiscal, no financeiro e na produção.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Consultar um participante",
        "onde": "`Cadastros > Participantes` (aparece no menu de vários módulos)",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir a lista e pesquisar pelo nome do cliente.",
          "nota": "Se não existir, a tela mostra \"Nenhum participante encontrado\".",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir o participante e percorrer as seções: Dados Gerais, Receita / Despesa, Classificação, Endereço, Contato, Contas bancárias, Documentos, Observações, Dados CRM e Informações CRM.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Na seção **Classificação**, ver as chaves É Cliente?, É Fornecedor?, É Funcionário?, É Transportadora?, É Vendedor? e Prospect/Lead.",
          "nota": "Você entende que cliente, fornecedor e lead do CRM são o **mesmo cadastro**, só com chaves diferentes.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Na seção **Contato**, ver quem recebe e-mails de Notas Fiscais, Boletos, Vendas e avisos de entrega/serviços.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Conhecer o formulário de novo participante (sem salvar)",
        "onde": "botão `Novo` da lista de participantes",
        "intro": null,
        "passos": [
         {
          "texto": "Identificar os campos obrigatórios: **Tipo (PF/PJ)** e **Razão Social / Nome**.",
          "nota": "Ao tentar salvar vazio, os campos ficam vermelhos e aparece \"Erros de validação\".",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Digitar um CEP e ver o endereço ser preenchido sozinho.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Sair sem salvar (seta voltar ou Cancelar).",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Consultar um produto",
        "onde": "`Cadastros > Produtos`",
        "intro": null,
        "passos": [
         {
          "texto": "No estoque, abrir o produto pelo código em `Estoque > Saldo` e ler classificação, unidade, categoria, NCM, dimensões e pesos.",
          "nota": "A ficha mostra também o total em estoque, o custo médio e a situação (Ativo).",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Consultar um projeto/obra",
        "onde": "`Cadastros > Projetos`",
        "intro": null,
        "passos": [
         {
          "texto": "Na lista de Pedidos de Venda, ver a coluna PROJETO: ela mostra a obra de cada pedido (ex.: \"ORC-26-08-0003 - Obra Le Jardin\").",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Participantes",
          "nota": "<qualquer módulo> › Cadastros › Participantes",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#cadastros.participantes"
          ]
         },
         {
          "texto": "Produtos",
          "nota": "Cadastros › Produtos",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#cadastros.produtos"
          ]
         },
         {
          "texto": "Projetos",
          "nota": "Cadastros › Projetos › Novo Projeto",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#cadastros.projetos"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#cadastros.participantes",
         "harness:conhecimento/glossario/telas.yaml#cadastros.produtos",
         "harness:conhecimento/glossario/telas.yaml#cadastros.projetos"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#cadastros.participantes",
       "harness:conhecimento/glossario/telas.yaml#cadastros.produtos",
       "harness:conhecimento/glossario/telas.yaml#cadastros.projetos"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: cadastrar cliente, produto e obra de treino",
        "onde": "`Cadastros > Participantes`, `Cadastros > Produtos` e `Cadastros > Projetos`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. Este checklist cria o cliente, o produto e a obra que os checklists seguintes (vendas, estoque, produção, serviços) vão usar: anote o código de cada um. Nas consultas dos blocos abaixo, procure pelos registros que você acabou de criar. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Em `Cadastros > Participantes`, criar um participante: em **Dados Gerais**, **Tipo (PF/PJ)**, **Razão Social / Nome** (\"TESTE ESTAGIÁRIO - Cliente\") e **CPF/CNPJ** fictício; em **Endereço**, **CEP** e **Número**; em **Classificação**, ligar **É Cliente?**; em **Contato > Adicionar Contato**, um e-mail de teste. Clicar em `Salvar`.",
          "nota": "Mensagem \"Registro salvo com sucesso!\". Também são obrigatórios a **Inscrição Estadual / RG** (Dados Gerais), Bairro, Estado e Cidade (o CEP preenche o endereço). Documento repetido é recusado (troque o número); se o CEP trouxer um bairro curto, como \"Sé\", digite um bairro com 3 letras ou mais.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "No mesmo participante, preencher a **Conta de Fluxo de Caixa Receita** (seção **Receita / Despesa**) e a **Inscrição Estadual / RG** (seção **Dados Gerais**, obrigatória; \"ISENTO\" serve no treino).",
          "nota": "O pedido de venda usa esses dados: sem eles o financeiro do pedido fica incompleto.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Cadastros > Produtos`, criar um produto \"TESTE ESTAGIÁRIO - Produto\": **Descrição**, **Categoria do Produto** e, na seção **Classificações Fiscais**, **Unidade de Medida** (cadastrada na empresa com a mesma sigla), **NCM** e **Origem da Mercadoria**. Clicar em `Salvar` (há também `Salvar e Incluir Novo`).",
          "nota": "São 5 campos obrigatórios (os 5 citados). Unidade com sigla diferente (\"PÇ\" ≠ \"PC\") faz o pedido falhar só ao salvar.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Cadastros > Projetos`, criar uma obra: **Nome do Projeto** \"TESTE ESTAGIÁRIO - Obra\", **Código**, **Status**, **Cliente** (o seu) e **Responsável**. Clicar em `Salvar`.",
          "nota": "Mensagem \"Registro salvo com sucesso!\". Nome do Projeto e Código são obrigatórios; código repetido é recusado.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       },
       {
        "tipo": "link",
        "material": "fundacao:checklist-inicial",
        "titulo": "Cadastros básicos",
        "status": "disponivel",
        "url": "/checklists/estagiarios/02-cadastros-basicos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:fundacao",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Cadastros e Fundação e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Cadastros > Participantes`, `Cadastros > Produtos` e `Cadastros > Projetos`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Cadastros > Participantes` (aparece no menu de vários módulos)"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: botão `Novo` da lista de participantes"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: `Cadastros > Produtos`"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: `Cadastros > Projetos`"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 1. Preparar seus dados: cadastrar cliente, produto e obra de treino"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 2. Consultar um participante"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 3. Conhecer o formulário de novo participante (sem salvar)"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 4. Consultar um produto"
         },
         {
          "id": "executei-10",
          "texto": "Executei: 5. Consultar um projeto/obra"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:fundacao",
        "total": 12,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Formulário do lead: Informações CRM é a seção da origem e da temperatura",
        "texto": "O **Novo Lead** é o cadastro completo de participante. As seções, na ordem, são Dados Gerais, Receita / Despesa, Classificação, Endereço, Contato, Contas bancárias, Documentos, Observações, **Dados CRM** e **Informações CRM**. **Origem do Lead**, **Temperatura**, **Responsável**, **Budget Estimado**, **Produto de Interesse** e as chaves do BANT ficam em **Informações CRM**. **Dados CRM** é outra seção (Setor de Atuação, CREA / CAU, Linha Preferida, Cor Predominante, Tipo de Vidro Preferido, Obras Simultâneas, Nível PBQPH, % Comissão). Obrigatórios: **Tipo (PF/PJ)** e **Razão Social / Nome**.",
        "confirmar": "CRM › Vendas › Leads › Lista de Leads › Novo Lead.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-crm-formulario-do-lead-secoes-e-campos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Os dados pertencem à empresa, e uma empresa nova começa vazia",
        "texto": "Clientes, produtos, pedidos, estoque e demais registros pertencem à **empresa**, não ao usuário: quem entra numa empresa vê tudo o que já existe nela. Uma empresa nova começa **vazia** e cada módulo usa o que o anterior criou (lead, participante, pedido, compra, estoque, produção, serviços, nota e títulos). Os cadastros-base (unidade de medida com a mesma sigla do produto, almoxarifado central ativo, condição e meio de pagamento, plano de contas, conta bancária, CFOP e NCM) são configurados por um consultor.",
        "confirmar": "Qualquer lista de uma empresa recém-criada.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-geral-os-dados-pertencem-a-empresa-e-uma-empresa-nova-comeca-vazia.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Item paramétrico da estrutura exige cor",
        "texto": "Ao salvar a estrutura de produto, um item de material paramétrico (perfil, chapa) sem **cor** é recusado com \"Selecione a cor do produto — obrigatória para este tipo de material\". A mensagem cita um identificador interno em vez do código do item. Na entrada de estoque do material, a cor também deve ser informada para o saldo bater.",
        "confirmar": "Produção › Configurações › Estrutura de produto.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-item-parametrico-da-estrutura-exige-cor.md"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-crm-formulario-do-lead-secoes-e-campos.md",
       "harness:conhecimento/produto/regras-negocio/regra-geral-os-dados-pertencem-a-empresa-e-uma-empresa-nova-comeca-vazia.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-item-parametrico-da-estrutura-exige-cor.md"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "etapa",
        "titulo": "1. Empresa e regime",
        "onde": "`Minha Assinatura` e `Configurações > Empresas`",
        "intro": "Tudo começa na empresa: o regime e o endereço dela decidem os impostos de cada pedido e nota. Faça com o cliente e com os dados do contador na mão.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Certificado digital, série e homologação",
        "onde": "`Faturamento > Configurações > Certificados`",
        "intro": "Sem certificado e série não existe nota. Este bloco deixa a empresa pronta para emitir, mas sempre em homologação até o fim dos testes.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Perfis e usuários",
        "onde": "`Segurança > Perfis de Acesso` e `Segurança > Usuários`",
        "intro": "Cada pessoa entra com o perfil da sua função. Faça antes dos cadastros para o próprio cliente executar o resto do roteiro com o usuário dele.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Participantes: clientes, fornecedores e vendedores",
        "onde": "`Cadastros > Participantes`",
        "intro": "Cliente, fornecedor, vendedor e lead são o mesmo cadastro, com chaves diferentes. Cadastre um cliente real com o cliente olhando e mostre onde cada dado vai parar.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Categorias, unidades, NCM, cores e produtos",
        "onde": "grupo `Configurações` do módulo (`Categorias de Produto`, `Unidade de Medida`, `Cores`), `Fiscal > Configurações > NCM` e `Cadastros > Produtos`",
        "intro": "A categoria decide como o preço é calculado e o tipo do material. Acerte com o cliente antes de cadastrar produtos e muito antes de lançar saldo.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Condições e meios de pagamento, contas e portadores",
        "onde": "`Vendas > Configurações > Condições de Pagamento` e o grupo `Configurações` do Financeiro (`Contas Bancárias`, `Portadores`, `Planos de Conta`, `Meios de Pagamento`)",
        "intro": "O pedido já nasce com parcelas, meio de pagamento e conta. Estes cadastros vêm antes do primeiro pedido, mesmo que o Financeiro seja implantado depois.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. CFOPs de saída",
        "onde": "`Fiscal > Configurações > CFOP`",
        "intro": "O CFOP decide se o pedido exige condição e parcelas, se a nota gera título e se mexe no estoque. Revise com o contador antes do primeiro pedido.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Carga inicial de produtos e participantes",
        "onde": "listagem de `Cadastros > Produtos` e de `Cadastros > Participantes`, menu “Mais…”",
        "intro": "Com os cadastros de apoio prontos, traga a base do cliente: produtos primeiro, depois participantes e contatos.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "9. Prova em uso real: obra e pedido de teste",
        "onde": "`Cadastros > Projetos` e `Vendas > Pedidos de Venda > + Novo Pedido`",
        "intro": "Um cadastro só está certo quando funciona no documento. Monte um pedido de teste com tudo o que foi cadastrado; cada erro aqui aponta o cadastro a corrigir.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação da Fundação: roteiro prático com o cliente",
        "texto": "Ao final, o cliente viu a própria empresa configurada em homologação, cada usuário entrando com o perfil certo e um pedido de teste salvo com o cliente, o produto, a condição de pagamento e o CFOP que ele mesmo cadastrou. O administrador do cliente sabe convidar um usuário, cadastrar um cliente e um produto e corrigir um cadastro recusado.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Empresa e regime",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "2. Certificado digital, série e homologação",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "3. Perfis e usuários",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "4. Participantes: clientes, fornecedores e vendedores",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "5. Categorias, unidades, NCM, cores e produtos",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "6. Condições e meios de pagamento, contas e portadores",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "7. CFOPs de saída",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "8. Carga inicial de produtos e participantes",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "9. Prova em uso real: obra e pedido de teste",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "link",
        "material": "fundacao:checklist-implantacao",
        "titulo": "Implantação da Fundação: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-01-fundacao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "O cliente entregou com antecedência: cartão CNPJ, CNAE, IE, IM e regime de cada empresa (conferidos com o contador), o certificado digital A1 de cada CNPJ emitente, a série e o número da última NF-e, a lista de usuários com e-mail exclusivo e função, e as bases de clientes, fornecedores e produtos.",
          "nota": "**Confira:** a lista de documentos pedida antes do kickoff. **Fonte:** Fundação C, pré-requisitos do cliente.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "A versão contratada aceita o regime de todas as empresas e cabe o número de empresas e de usuários previstos.",
          "nota": "**Confira:** em `Minha Assinatura`. Lucro Presumido, Lucro Real e excesso de sublimite não gravam nas versões Starter e Standard; convite pendente ocupa vaga. **Fonte:** CAD-EMP-005, CAD-EMP-019; Fundação D, seção 1.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "A licença e os módulos foram liberados pela Faktory e o administrador do cliente consegue entrar.",
          "nota": "**Confira:** os módulos contratados aparecem sem cadeado no menu. Módulo fora do plano responde “Módulo não contratado” e se resolve no comercial. **Fonte:** Fundação C, pré-requisitos técnicos; Fundação D, seção 1.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Decisão tomada com o cliente: como ele vende cada tipo de material (por unidade, por peso ou por área).",
          "nota": "**Confira:** a resposta anotada na ata do kickoff. É a decisão que define o “Preço calculado por” de cada categoria. **Fonte:** Fundação C, questionário P1; CAD-PRO-020, CAD-CAT-001.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Cada empresa salva sem aviso, com regime conferido pelo contador, certificado válido, série configurada e ambiente em homologação.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Todos os usuários previstos entram com o perfil certo e não há convite pendente esquecido.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Categorias aprovadas pelo cliente (tipo e Preço calculado por), unidades, NCMs, condições, meios, contas, portadores e plano de contas cadastrados.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Carga de produtos e participantes com a quantidade igual à da origem e amostra conferida.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Um pedido de teste salvo com o cliente, o produto, a obra, a condição e o CFOP do roteiro.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "O administrador do cliente cadastrou sozinho um participante e um produto.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste ou homologação; registros com “TESTE FLUXO CONSULTOR”. Nota fiscal só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Senha do certificado e de usuário quem digita é o cliente; o consultor não pede nem guarda.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "O CNPJ da empresa não muda depois de salvo e o tipo da categoria trava quando algum produto tem saldo: confira antes de salvar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Todo usuário vê todas as empresas; hoje o sistema ainda não restringe acesso por filial. Também não existe tabela de preço por cliente: registre como lacuna na ata.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Não use o NCM “99999999 À classificar” como padrão de nada.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Unidade com sigla diferente da do produto (“PÇ” × “PC”) só aparece como erro ao salvar o pedido.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Cadastro é compartilhado: mudar um participante ou produto afeta notas, títulos, compras e produção.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Convite pendente ocupa vaga na licença: cancele os que não forem usados.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Nome da opção que sincroniza o emitente com o provedor na tela de Certificados: a gestora marca como não confirmado. Conferir na tela antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Rótulo do campo do CFOP que diz se ele gera financeiro: a gestora marca como não confirmado. Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Caminho do NCM: o Manual 01 indica `Fiscal > Configurações > NCM`; a gestora lista a tela no grupo de cadastros. Conferir no menu.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         },
         {
          "texto": "Tipo dos meios de pagamento: a gestora diz que os meios de fábrica já vêm com o código SEFAZ; no teste do fluxo completo “Duplicata Mercantil” foi tratada como boleto ao gerar títulos. Conferir o tipo de cada meio na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "fundacao:checklist-inicial",
        "titulo": "Cadastros básicos",
        "status": "disponivel",
        "url": "/checklists/estagiarios/02-cadastros-basicos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#cadastros"
        ]
       },
       {
        "tipo": "link",
        "material": "fundacao:checklist-implantacao",
        "titulo": "Implantação da Fundação: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-01-fundacao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como cadastrar cliente, produto e obra",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-cadastrar-cliente-produto-e-obra.md"
          ]
         },
         {
          "texto": "01 Manual Cadastros Base",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/01_Manual_Cadastros_Base_Timbrado.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-cadastrar-cliente-produto-e-obra.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/01_Manual_Cadastros_Base_Timbrado.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#cadastros",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fundacao",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-cadastrar-cliente-produto-e-obra.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/01_Manual_Cadastros_Base_Timbrado.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "crm",
   "ordem": 2,
   "titulo": "CRM",
   "subtitulo": "Funil, lista e Kanban de leads, conversão.",
   "cor": "#7b1fa2",
   "icone": "crm",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#crm",
    "guia:scripts/dados-checklists-estagiarios.mjs#crm",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
   ],
   "materiais": [
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "crm:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/02_Manual_CRM_Timbrado.docx"
     ],
     "id": "crm:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": "/checklists/estagiarios/03-crm-leads-oportunidades.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#crm"
     ],
     "id": "crm:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "CRM: leads e oportunidades",
     "status": "disponivel"
    },
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": "#inicial/crm",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#crm.funis-vendas",
      "harness:conhecimento/glossario/telas.yaml#crm.leads",
      "harness:conhecimento/glossario/telas.yaml#crm.pipeline",
      "guia:videos/roteiros/consultor-03-comercial.json"
     ],
     "id": "crm:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-02-crm.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
     ],
     "id": "crm:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de CRM: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "crm",
     "duracao_s": 220,
     "url": "/videos/consultor-03-comercial.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-03-comercial.json"
     ],
     "id": "crm:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Comercial: do lead ao pedido de venda",
     "status": "disponivel"
    },
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": "#consultor/crm",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-crm-conversao-cria-a-oportunidade-sozinha.md",
      "harness:conhecimento/produto/regras-negocio/regra-crm-converter-lead-exige-etapa-60-e-bant-completo.md",
      "harness:conhecimento/produto/regras-negocio/regra-crm-formulario-do-lead-secoes-e-campos.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.md",
      "guia:videos/roteiros/consultor-03-comercial.json"
     ],
     "id": "crm:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "crm",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/02_Manual_CRM_Timbrado.docx"
     ],
     "id": "crm:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "CRM: leads e oportunidades",
        "texto": "A porta de entrada do processo comercial: do primeiro contato até a oportunidade pronta para virar pedido.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Cadastrar leads de treino na sua conta do CRM, consultar o funil comercial, movimentá-los no Kanban e entender as regras para converter um lead.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#crm"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: cadastrar leads de treino",
        "onde": "botão `Novo Lead`",
        "intro": "**Faça este bloco primeiro.** A sua conta no CRM começa sem leads, e os blocos seguintes (filtros, Kanban, menu do lead, conversão) precisam dos seus leads para funcionar. O formulário é o cadastro completo de participante: preencha só o necessário. Se ele pedir CNPJ/CPF ou CEP, use números fictícios (documento repetido é recusado, então troque o número se aparecer o aviso); se o CEP trouxer um bairro curto, como \"Sé\", digite um bairro com 3 letras ou mais. Use um e-mail de teste, nunca o de um cliente real.",
        "passos": [
         {
          "texto": "Preencher **Tipo (PF/PJ)** e **Razão Social / Nome** começando por \"TESTE ESTAGIÁRIO\" (ex.: \"TESTE ESTAGIÁRIO - Maria 1\").",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Na seção **Informações CRM**, preencher Origem do Lead, Temperatura e Responsável (deixe **você** como Responsável).",
          "nota": "Só **Tipo (PF/PJ)** e **Razão Social / Nome** são obrigatórios. Não confunda com a seção **Dados CRM**, logo acima: ela tem Setor de Atuação, CREA/CAU e preferências do cliente, e não é necessária agora. O Budget Estimado e as chaves Autoridade, Necessidade e Prazo (o BANT) também ficam em Informações CRM.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Clicar em `Salvar`.",
          "nota": "Mensagem \"Registro salvo com sucesso!\" e o lead aparece na lista com Status \"Novo\".",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Conferir na lista se a Temperatura gravou como você escolheu.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Cadastrar um **segundo** lead de treino (\"TESTE ESTAGIÁRIO - Maria 2\") com **outra Temperatura** (ex.: Quente), repetindo os passos acima.",
          "nota": "Com dois leads de temperaturas diferentes, os filtros, o Kanban e o menu do lead têm o que mostrar. Os dois aparecem na Lista de Leads e no Kanban de Leads, na primeira coluna (Inbound). No teste, escolher Quente gravou Morno uma vez: por isso existe o passo de conferir a Temperatura na lista.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "2. Entender o funil",
        "onde": "`CRM > Painéis > Visão Geral`",
        "intro": null,
        "passos": [
         {
          "texto": "Ler a \"Jornada do cliente\": Leads Novos → Qualificando → Oportunidades → Valor em Jogo.",
          "nota": "Cada cartão leva à lista de leads ou ao Pipeline.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler a faixa de alerta (leads aguardando qualificação, atividades atrasadas).",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Consultar leads",
        "onde": "`CRM > Vendas > Leads > Lista de Leads`",
        "intro": "Agora você já tem os seus leads de treino (bloco 1) para ver nas listas.",
        "passos": [
         {
          "texto": "Usar os filtros rápidos: Status (Novo, Em Qualificação, Qualificado, Convertido, Desqualificado), Temperatura (Frio a Urgente), Só minhas e Tag.",
          "nota": "Dica: com Só minhas ligado, devem ficar só os seus leads de treino.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Alternar entre **Lista** e **Kanban** no topo da tela.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir o menu `⋮` de um lead e reconhecer: Converter, Histórico, Tags, Atividades, Desqualificar e Excluir. Feche com Esc.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Movimentar o lead no Kanban",
        "onde": "`CRM > Vendas > Leads > Kanban de Leads`",
        "intro": null,
        "passos": [
         {
          "texto": "Reconhecer as etapas e seus percentuais: Inbound 10%, Pesquisado 25%, Conectado 40%, MQL 60%, SQL 80%, Demo agendada 90%.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Arrastar o card do seu lead para a próxima etapa e clicar em **Confirmar** no diálogo \"Mover lead\".",
          "nota": "O card fica na nova coluna e a mudança entra no histórico do lead.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Entender a conversão (com o supervisor)",
        "onde": "menu `⋮ > Converter` do lead",
        "intro": null,
        "passos": [
         {
          "texto": "Saber as duas regras: o lead precisa estar numa etapa de **60% ou mais** e com o **BANT completo** (budget, autoridade, necessidade e prazo).",
          "nota": "Sem isso, o sistema avisa o que falta e não converte.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver com o supervisor onde o BANT é preenchido: `Editar Lead` > Budget Estimado e as chaves Autoridade, Necessidade e Prazo/timeline.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber o que a conversão faz: o lead fica \"convertido\", o participante passa a ter **\"É Cliente?\"** ligado e uma **oportunidade é criada sozinha** no Pipeline (valor = budget). O pedido é criado depois, em Vendas.",
          "nota": "Mensagem \"Lead convertido com sucesso!\". O aviso não menciona a oportunidade: procure no Pipeline.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "6. Oportunidades e atividades",
        "onde": "`CRM > Vendas > Pipeline` e `CRM > Vendas > Atividades`",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir o Pipeline, escolher a aba do funil (\"Funil de vendas principal\") e ver as oportunidades por etapa.",
          "nota": "Cada card mostra valor, probabilidade, \"hoje na etapa\" e o menu ⋮ (Editar, Marcar como Ganha, Marcar como Perdida, Pausar, Cancelar).",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir uma oportunidade (⋮ > Editar) e ver as abas Detalhes, Itens, Atividades e Histórico.",
          "nota": "O Histórico registra a criação na conversão e cada mudança de etapa.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir Atividades e Agenda e ver as atividades da semana e as atrasadas.",
          "nota": "A lista de atividades não diz de qual lead/cliente é cada uma.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#crm"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Funis de Vendas",
          "nota": "CRM › Configurações › Funis de Vendas",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#crm.funis-vendas"
          ]
         },
         {
          "texto": "Leads",
          "nota": "CRM › Vendas › Leads",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#crm.leads"
          ]
         },
         {
          "texto": "Pipeline",
          "nota": "CRM › Vendas › Pipeline",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#crm.pipeline"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#crm.funis-vendas",
         "harness:conhecimento/glossario/telas.yaml#crm.leads",
         "harness:conhecimento/glossario/telas.yaml#crm.pipeline"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#crm.funis-vendas",
       "harness:conhecimento/glossario/telas.yaml#crm.leads",
       "harness:conhecimento/glossario/telas.yaml#crm.pipeline"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da captação do lead ao acompanhamento pós-venda.",
        "etapas": [
         "Captação de Leads",
         "Qualificação",
         "Negociação",
         "Conversão em Pedido de Venda",
         "Pós-venda e Acompanhamento"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#crm"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "crm:checklist-inicial",
        "titulo": "CRM: leads e oportunidades",
        "status": "disponivel",
        "url": "/checklists/estagiarios/03-crm-leads-oportunidades.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#crm"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:crm",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo CRM e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: botão `Novo Lead`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `CRM > Painéis > Visão Geral`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `CRM > Vendas > Leads > Lista de Leads`"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: `CRM > Vendas > Leads > Kanban de Leads`"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: menu `⋮ > Converter` do lead"
         },
         {
          "id": "acessar-6",
          "texto": "Sei acessar: `CRM > Vendas > Pipeline` e `CRM > Vendas > Atividades`"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 1. Preparar seus dados: cadastrar leads de treino"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 2. Entender o funil"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 3. Consultar leads"
         },
         {
          "id": "executei-10",
          "texto": "Executei: 4. Movimentar o lead no Kanban"
         },
         {
          "id": "executei-11",
          "texto": "Executei: 5. Entender a conversão (com o supervisor)"
         },
         {
          "id": "executei-12",
          "texto": "Executei: 6. Oportunidades e atividades"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#crm"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:crm",
        "total": 14,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Gerenciar o relacionamento com clientes, do primeiro contato ao pós-venda.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Porta de entrada do processo comercial. Oportunidades são convertidas em pedidos de venda.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Antes do módulo de Vendas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — CRM: leads, Kanban, conversão e pipeline",
        "texto": "CRM › Vendas › Leads (Lista de Leads e Kanban de Leads), Pipeline, Atividades, Agenda e Aprovações; CRM › Painéis (Visão Geral, Dashboard Executivo, Resultado do Mês). Botão **Novo Lead**. Menu `⋯` do lead: Converter, Histórico, Tags, Atividades, Desqualificar e Excluir.",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-crm-leads-pipeline-e-oportunidades.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#crm",
       "harness:conhecimento/produto/funcional/funcional-crm-leads-pipeline-e-oportunidades.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "A conversão cria a oportunidade e marca o participante como cliente",
        "texto": "**Converter Lead** mostra \"Lead convertido com sucesso!\", deixa o lead como convertido, liga **É Cliente?** no participante e cria **sozinha** uma oportunidade no Pipeline (etapa \"Novo Lead\", valor igual ao Budget Estimado), sem avisar disso. As atividades do lead não migram para a oportunidade. O Valor estimado passa a ser a soma dos itens quando itens são adicionados.",
        "confirmar": "CRM › Vendas › Pipeline após converter.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-crm-conversao-cria-a-oportunidade-sozinha.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Converter lead: etapa de 60% ou mais e BANT completo",
        "texto": "O lead só converte quando está numa etapa do Kanban de **60% ou mais** (MQL, SQL…) **e** com o **BANT completo**: **Budget Estimado** e as chaves **Autoridade de decisão confirmada**, **Necessidade claramente identificada** e **Prazo/timeline definido**. Sem isso o sistema avisa o que falta e não converte. As duas condições existem juntas: não há conflito entre as fontes que citam só uma delas.",
        "confirmar": "CRM › Vendas › Leads › Kanban de Leads e Editar Lead › Informações CRM.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-crm-converter-lead-exige-etapa-60-e-bant-completo.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Formulário do lead: Informações CRM é a seção da origem e da temperatura",
        "texto": "O **Novo Lead** é o cadastro completo de participante. As seções, na ordem, são Dados Gerais, Receita / Despesa, Classificação, Endereço, Contato, Contas bancárias, Documentos, Observações, **Dados CRM** e **Informações CRM**. **Origem do Lead**, **Temperatura**, **Responsável**, **Budget Estimado**, **Produto de Interesse** e as chaves do BANT ficam em **Informações CRM**. **Dados CRM** é outra seção (Setor de Atuação, CREA / CAU, Linha Preferida, Cor Predominante, Tipo de Vidro Preferido, Obras Simultâneas, Nível PBQPH, % Comissão). Obrigatórios: **Tipo (PF/PJ)** e **Razão Social / Nome**.",
        "confirmar": "CRM › Vendas › Leads › Lista de Leads › Novo Lead.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-crm-formulario-do-lead-secoes-e-campos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Gerar Pedido de Venda a partir da oportunidade: CFOP sem financeiro",
        "texto": "No painel da oportunidade ganha, **Gerar Pedido de Venda** pede **Empresa** e **CFOP**. Com um CFOP que **gera financeiro** (como 5101 ou 6101) o sistema recusa, dizendo que Condição de Pagamento, Plano de Conta e Parcelas são obrigatórios, campos que o formulário do handoff não tem. Com um CFOP que **não** gera financeiro (como 5910-1) o pedido nasce com cliente, item e valor da oportunidade; depois basta abrir o pedido, trocar o CFOP e escolher a condição de pagamento, e as parcelas são geradas.",
        "confirmar": "CRM › Vendas › Pipeline › oportunidade ganha › Gerar Pedido de Venda. Vendas › Pedidos de Venda para o pedido gerado.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Itens viram o valor da oportunidade",
        "texto": "Na aba Itens, aplique o quadro Dados do Item antes de salvar. O Valor estimado passa a ser a soma dos itens.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-03-comercial.json#06",
         "harness-id:funcional-crm-leads-pipeline-e-oportunidades"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-crm-conversao-cria-a-oportunidade-sozinha.md",
       "harness:conhecimento/produto/regras-negocio/regra-crm-converter-lead-exige-etapa-60-e-bant-completo.md",
       "harness:conhecimento/produto/regras-negocio/regra-crm-formulario-do-lead-secoes-e-campos.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.md",
       "guia:videos/roteiros/consultor-03-comercial.json#06",
       "harness-id:funcional-crm-leads-pipeline-e-oportunidades"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da captação do lead ao acompanhamento pós-venda.",
        "etapas": [
         "Captação de Leads",
         "Qualificação",
         "Negociação",
         "Conversão em Pedido de Venda",
         "Pós-venda e Acompanhamento"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Cadastro do lead",
        "onde": "`CRM > Vendas > Leads > Novo Lead`",
        "intro": "Tudo começa no contato ainda não qualificado. Mostre ao cliente que o lead já é o cadastro completo do participante.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Qualificação: BANT e Kanban de Leads",
        "onde": "`Editar Lead > Informações CRM` e `CRM > Vendas > Leads > Kanban de Leads`",
        "intro": "Antes de converter, o lead precisa provar que é um negócio real. Comece pela trava, para o cliente ver por que a qualificação existe.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Conversão do lead",
        "onde": "`CRM > Vendas > Leads` > `⋮ > Converter`",
        "intro": "A conversão faz três coisas de uma vez, e só uma delas é avisada na tela. Mostre cada reflexo.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Oportunidade no Pipeline: itens, atividades e etapas",
        "onde": "`CRM > Vendas > Pipeline` > clique no card",
        "intro": "É aqui que o vendedor trabalha o negócio no dia a dia. Os itens são obrigatórios para ganhar e viram os itens do pedido.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Ganhar (e perder) a oportunidade",
        "onde": "`CRM > Vendas > Pipeline` > painel da oportunidade ou `⋯` do card",
        "intro": "Mostre a trava do item numa segunda oportunidade e encerre a principal como ganha. A segunda oportunidade serve também para mostrar a perda.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Gerar o pedido de venda",
        "onde": "painel da oportunidade ganha > `Gerar Pedido de Venda`",
        "intro": "É a passagem do CRM para Vendas. Demonstre de propósito a recusa com CFOP de venda e depois o caminho que funciona.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Resultado nos painéis do CRM",
        "onde": "`CRM > Painéis`, `CRM > Visão Geral` e `Clientes > Visão 360°`",
        "intro": "Feche mostrando ao gestor onde ele acompanha o funil, o ganho e a perda do teste.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#crm",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de CRM: roteiro prático com o cliente",
        "texto": "Ao final, o cliente terá visto um lead virar oportunidade, a oportunidade ganha virar pedido de venda em `Vendas > Pedidos de Venda` e o resultado aparecer nos painéis do CRM. Ele saberá repetir o caminho e conhecerá as três travas do fluxo: BANT e etapa de 60% para converter, item para ganhar e CFOP para gerar o pedido.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Cadastro do lead",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "2. Qualificação: BANT e Kanban de Leads",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "3. Conversão do lead",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "4. Oportunidade no Pipeline: itens, atividades e etapas",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "5. Ganhar (e perder) a oportunidade",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "6. Gerar o pedido de venda",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "7. Resultado nos painéis do CRM",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "link",
        "material": "crm:checklist-implantacao",
        "titulo": "Implantação de CRM: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-02-crm.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente o funil de vendas. Demonstre cadastro de oportunidades, registro de atividades e conversão. Mostre como o CRM auxilia no pós-venda.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm",
       "guia:db/migrations/002_modulos_iniciais.sql#crm"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "**Funil de Vendas** com etapas conferidas e **Funil de Leads** cadastrados (sem o primeiro não existe Pipeline; sem o segundo não existe Kanban de Leads). Tipos de Atividade, Origens de Lead, Temperaturas e Motivos de Perda cadastrados.",
          "nota": "**Confira:** `CRM > Configurações` e remova etapas de teste esquecidas no fim do funil. **Fonte:** manual-02-crm, Parte 1; Fluxo comercial (pré-requisitos).",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Dados de contato de teste: razão social começando por \"TESTE FLUXO CONSULTOR\", CNPJ/CPF fictício **ainda não usado** e e-mail de caixa pública temporária.",
          "nota": "**Confira:** o sistema recusa documento repetido. **Fonte:** Fluxo comercial (pré-requisitos).",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Produto de teste com unidade válida e preço de tabela.",
          "nota": "**Confira:** `Cadastros > Produtos`. **Fonte:** Fluxo comercial (pré-requisitos).",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Para o pedido nascer completo: participante com **Conta de Fluxo de Caixa Receita** e Inscrição Estadual/RG preenchidas (o formulário do lead não exige), condição de pagamento cadastrada e um CFOP que **não** gera financeiro disponível (ex.: 5910-1).",
          "nota": "**Confira:** com o consultor responsável pela configuração fiscal. **Fonte:** Fluxo comercial (pré-requisitos); regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "O lead de teste foi qualificado (BANT e etapa de 60%), convertido, e o participante ficou marcado como cliente.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "A oportunidade nasceu sozinha no Pipeline, recebeu item, atividade e mudança de etapa, e foi marcada como ganha.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "O pedido de venda foi gerado a partir da oportunidade, completado com CFOP de venda e condição de pagamento, e aparece em Vendas como \"A faturar\".",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "O ganho e a perda do teste aparecem nos painéis do CRM.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Cadastrar contato ou oportunidade",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#crm"
          ]
         },
         {
          "texto": "Movimentar oportunidades no funil",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#crm"
          ]
         },
         {
          "texto": "Registrar atividades e acompanhamentos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#crm"
          ]
         },
         {
          "texto": "Converter oportunidade em pedido de venda",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#crm"
          ]
         },
         {
          "texto": "Consultar histórico e visão do cliente",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#crm"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm",
       "guia:db/migrations/002_modulos_iniciais.sql#crm"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Porta de entrada do processo comercial. Oportunidades são convertidas em pedidos de venda.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#crm"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#crm"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "**Segurança do ambiente:** use só ambiente de teste, registros com \"TESTE FLUXO CONSULTOR\" e e-mail de caixa temporária; nota fiscal só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "**Gerar Pedido de Venda** recusa CFOP que gera financeiro: use um CFOP sem financeiro e ajuste o pedido depois. Valide a passagem com o consultor responsável pela configuração fiscal antes de treinar o cliente.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Hoje o sistema ainda deixa o botão **Gerar Pedido de Venda** disponível depois de gerar, e o painel da oportunidade pode parar de abrir: anote o nº do pedido e não clique de novo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "**Ganha** não pede confirmação. **Reverter ganho** não remove a oportunidade de Pós-Venda criada ao ganhar, e ganhar de novo cria outra: reverta antes de gerar o pedido.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Recolher e reabrir a seção **Informações CRM** no formulário do lead apaga a origem escolhida.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Hoje datas de fechamento e de previsão podem aparecer 1 dia antes do informado, e a Temperatura do lead pode mudar sozinha: confira na tela.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "As atividades do lead não vão para a oportunidade, e o pedido gerado não herda vendedor nem condição de pagamento.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Ganha não pede confirmação: se clicar sem querer, use Reverter ganho.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-03-comercial.json#14"
          ]
         },
         {
          "texto": "Desconto em R$ acima da alçada vai para aprovação de outro usuário.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-03-comercial.json#14"
          ]
         },
         {
          "texto": "Reverta o ganho antes de gerar o pedido, nunca depois.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-03-comercial.json#14"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-03-comercial.json#14"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Janela **Converter Lead**: o manual-02-crm (2.2) diz que ela permite escolher o funil, a etapa inicial (padrão Prospecção) e o valor; no teste de 19/10 (Fluxo comercial) a oportunidade nasceu sozinha na etapa \"Novo Lead\" com o valor do Budget. Conferir na tela qual etapa o cliente verá.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Como ganhar: o manual-02-crm (2.5) indica `⋯ do card > Marcar como Ganha`, com a mensagem \"Oportunidade marcada como ganha!\" e a exigência de ao menos um item; o Fluxo comercial registra o botão **Ganha** no painel da oportunidade, sem citar a exigência do item. Conferir o caminho e a trava antes de demonstrar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         },
         {
          "texto": "Probabilidade: o manual-02-crm (2.3) diz que ela muda sozinha conforme a etapa; no teste o percentual do card só atualizou ao recarregar e, no ganho, a etapa e a probabilidade não foram para 100%.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm",
       "guia:videos/roteiros/consultor-03-comercial.json#14"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "crm:video-consultor",
        "titulo": "Comercial: do lead ao pedido de venda",
        "status": "disponivel",
        "url": "/videos/consultor-03-comercial.mp4",
        "duracao_s": 220,
        "poster": "/videos/consultor-03-comercial.jpg",
        "legenda": "/videos/consultor-03-comercial.vtt",
        "resumo": "As quatro regras que travam o CRM e o caminho real, do Kanban à oportunidade ganha.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-03-comercial.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-03-comercial.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "crm:checklist-inicial",
        "titulo": "CRM: leads e oportunidades",
        "status": "disponivel",
        "url": "/checklists/estagiarios/03-crm-leads-oportunidades.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#crm"
        ]
       },
       {
        "tipo": "link",
        "material": "crm:checklist-implantacao",
        "titulo": "Implantação de CRM: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-02-crm.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como cadastrar um lead e convertê-lo em oportunidade",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-cadastrar-lead-e-converter-em-oportunidade.md"
          ]
         },
         {
          "texto": "02 Manual CRM",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/02_Manual_CRM_Timbrado.docx"
          ]
         },
         {
          "texto": "01-leads",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/01-leads.docx"
          ]
         },
         {
          "texto": "02-pipeline-de-oportunidades",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/02-pipeline-de-oportunidades.docx"
          ]
         },
         {
          "texto": "03-atividades-e-agenda",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/03-atividades-e-agenda.docx"
          ]
         },
         {
          "texto": "04-clientes-e-visao-360",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/04-clientes-e-visao-360.docx"
          ]
         },
         {
          "texto": "05-projetos-de-obra",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/05-projetos-de-obra.docx"
          ]
         },
         {
          "texto": "06-engajamento",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/06-engajamento.docx"
          ]
         },
         {
          "texto": "07-configurar-o-crm",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/07-configurar-o-crm.docx"
          ]
         },
         {
          "texto": "08-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/CRM/08-paineis-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-cadastrar-lead-e-converter-em-oportunidade.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/02_Manual_CRM_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/01-leads.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/02-pipeline-de-oportunidades.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/03-atividades-e-agenda.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/04-clientes-e-visao-360.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/05-projetos-de-obra.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/06-engajamento.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/07-configurar-o-crm.docx",
         "harness:conhecimento/Roteiros Treinamento/CRM/08-paineis-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#crm",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-crm",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-cadastrar-lead-e-converter-em-oportunidade.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/02_Manual_CRM_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/01-leads.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/02-pipeline-de-oportunidades.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/03-atividades-e-agenda.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/04-clientes-e-visao-360.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/05-projetos-de-obra.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/06-engajamento.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/07-configurar-o-crm.docx",
       "harness:conhecimento/Roteiros Treinamento/CRM/08-paineis-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "cem",
   "ordem": 3,
   "titulo": "Integração CEM",
   "subtitulo": "Consultor · Implantação · Integração CEM",
   "cor": null,
   "icone": null,
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
   ],
   "materiais": [
    {
     "modulo": "cem",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "cem:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "cem",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "cem:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "cem",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-03-integracao-cem.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
     ],
     "id": "cem:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação da Integração CEM: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "cem",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "cem:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Vídeo avançado",
     "status": "em-preparacao"
    },
    {
     "modulo": "cem",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "cem:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "etapa",
        "titulo": "1. Escolher o sistema de integração",
        "onde": "`Vendas > Configurações > Configurar integração`",
        "intro": "A primeira escolha decide por onde o orçamento entra. Faça com o administrador do cliente, porque só ele acessa esta tela.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Conectar o CEM (Desktop ou Mobi)",
        "onde": "`Vendas > Configurações > Configurar integração` (cards de pareamento ou `Configuração CEM Mobi`)",
        "intro": "O CEM Desktop conversa com o Flow por um agente instalado na empresa; o CEM Mobi, pela configuração da integração. Faça só o caminho do cliente.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Padrões de Integração",
        "onde": "`Vendas > Configurações > Padrões de Integração`",
        "intro": "O CEM manda itens que o Flow ainda não conhece. Os Padrões dizem com que NCM, unidade, categoria, CFOP e condição o produto e o pedido nascem. Padrões completos são importação sem parada.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Importar um orçamento real (CEM Desktop)",
        "onde": "`Vendas > Pedidos de Venda > Importar CEM`",
        "intro": "Agora o cliente importa a obra real escolhida. Ele conduz o mouse; o consultor explica cada etapa da janela `Importar do CEM Desktop`. Para CEM Mobi ou arquivo, use o bloco 5.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Importar pelo CEM Mobi ou por arquivo",
        "onde": "`Vendas > Pedidos de Venda > Importar CEM Mobi` ou `Importar Arquivo`",
        "intro": "Faça este bloco no lugar do bloco 4 quando o cliente usa CEM Mobi ou importa arquivo. O resultado é o mesmo: um pedido de venda Em aberto.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Ler com o cliente o pedido que nasceu da importação",
        "onde": "`Vendas > Pedidos de Venda` (pedido importado) e `Cadastros`",
        "intro": "É aqui que o cliente entende o que a integração faz. Abra o pedido gerado e compare, campo a campo, com o orçamento no CEM.",
        "passos_total": 6,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. O que trava a importação",
        "onde": "janela de importação em `Vendas > Pedidos de Venda`",
        "intro": "Demonstre de propósito os bloqueios mais comuns, para o cliente saber se a correção é no CEM ou nos Padrões.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Revisão do orçamento e reimportação",
        "onde": "`Vendas > Pedidos de Venda > Importar CEM` (ou `Importar CEM Mobi`)",
        "intro": "Orçamento muda depois de fechado. Mostre ao cliente o que cada tipo de revisão provoca, porque o pedido antigo nunca é alterado sozinho.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "9. Faturamento em Nível (só quando contratado)",
        "onde": "`Vendas > Configurações > Configurar integração` (card `Faturamento em Nível`), `Níveis de Faturamento` e `Templates de Rateio`",
        "intro": "Faça este bloco só se o cliente vai dividir a obra em níveis (por exemplo, material, esquadria e instalação). A regra de rateio precisa estar definida com o fiscal, o contador e o financeiro.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação da Integração CEM: roteiro prático com o cliente",
        "texto": "Ao final, o cliente importou sozinho uma obra fechada no CEM e sabe conferir no pedido gerado os itens, os preços, o desconto, os impostos, o cliente e a obra. Ele sabe o que trava uma importação, onde corrigir (no CEM ou nos Padrões) e o que acontece quando o orçamento é revisado depois de integrado.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Escolher o sistema de integração",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "2. Conectar o CEM (Desktop ou Mobi)",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "3. Padrões de Integração",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "4. Importar um orçamento real (CEM Desktop)",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "5. Importar pelo CEM Mobi ou por arquivo",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "6. Ler com o cliente o pedido que nasceu da importação",
          "nota": "6 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "7. O que trava a importação",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "8. Revisão do orçamento e reimportação",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "9. Faturamento em Nível (só quando contratado)",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "link",
        "material": "cem:checklist-implantacao",
        "titulo": "Implantação da Integração CEM: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-03-integracao-cem.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Fundação concluída: empresa, CFOPs, plano de contas, condições de pagamento, categorias, NCMs e unidades cadastrados.",
          "nota": "**Confira:** o checklist da Fundação assinado. O pedido importado já precisa de condição de pagamento e plano de contas. **Fonte:** README da cadeia comercial, ordem de implantação; Integração B, fluxo de configuração.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Decidido com o cliente: qual sistema de origem (CEM Desktop, CEM Mobi, PrefSuite ou arquivo), qual o modo do código dos produtos e se vai usar Faturamento em Nível.",
          "nota": "**Confira:** as decisões na ata. O sistema escolhido decide qual botão de importação aparece; o modo do código deve ser decidido antes da primeira obra. **Fonte:** README da cadeia comercial, decisões X3 e X4; INT-DSK-014.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "CEM Desktop: máquina Windows onde fica o banco do CEM, com acesso de administrador e o agente FaktoryFlow Agent instalado.",
          "nota": "**Confira:** o agente aberto mostrando o código de pareamento. **Fonte:** Integração C, etapa 2; Fundação C, etapa 6.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Uma obra **fechada** no CEM, real e do cliente, escolhida para a importação de teste; clientes do CEM com CPF/CNPJ e cidade corretos.",
          "nota": "**Confira:** com o orçamentista do cliente. A integração só trabalha com obras fechadas; cidade e UF vêm só do CEM. **Fonte:** roteiro Vendas 01, localizar a obra; INT-GER-009, INT-GER-039.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Sistema de integração escolhido e conectado (dispositivo pareado ou CEM Mobi `Conectado`).",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Padrões de Integração com o selo `Todos completos` e os padrões do pedido de venda preenchidos.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Uma obra real importada sem erro, com o total do pedido igual ao do CEM e os produtos novos criados com os padrões certos.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "O cliente explicou sozinho de onde vêm os itens, o preço, o desconto, os impostos, o cliente e a obra do pedido importado.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Uma revisão de orçamento reimportada (Desktop ou Mobi) e o cliente sabe o que fazer com o pedido antigo.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Faturamento em Nível, se contratado: níveis e template cadastrados e uma obra importada com um pedido por nível.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste ou homologação; pedidos e registros de teste com “TESTE FLUXO CONSULTOR”. Nota fiscal só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "A integração só traz obras **fechadas** no CEM e traz a obra inteira: não há escolha de itens.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Clique uma única vez em `Gerar Pedido de Venda` ou `Importar Pedido` e aguarde.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Revisão que troca cor ou medida duplica o item: o pedido antigo continua e precisa ser cancelado ou ajustado à mão.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Hoje o sistema ainda não reativa sozinho um cliente inativo com o mesmo documento: reative antes de importar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Saneie o cadastro de clientes no CEM (CPF/CNPJ, cidade e UF) antes do go-live: esses dados vêm só da origem.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Não use o NCM “99999999 À classificar” nos Padrões e não inative uma categoria usada num padrão.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "O agente do CEM Desktop precisa ficar ligado: “Nenhum agente desktop online” é máquina desligada ou serviço parado.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Licença: os roteiros Vendas 01 e 06 dizem que CEM Mobi e Faturamento em Nível são só da versão PRO; a gestora diz que a configuração da integração não é PRO e não marca o Faturamento em Nível como PRO. Conferir na tela e na licença do cliente.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Caminho de `Níveis de Faturamento`: o roteiro Vendas 06 indica `Vendas > Integrações > Níveis de Faturamento`; a gestora indica o grupo `Configurações` de Vendas. Conferir no menu.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Correção de medida, cor ou vidro: o roteiro Vendas 01 orienta cancelar e reimportar o pedido completo; a gestora diz que CEM Desktop e Mobi reimportam só o saldo e que a troca de cor ou medida entra como item novo. Conferir na tela antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Marcas de e-mail do contato criado pela integração: uma regra diz todas ligadas, inclusive compras (INT-GER-032); outra diz compras desligado (INT-MOB-011). A aba `Contato` dos Padrões só vale para a importação por arquivo. Conferir no contato criado.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Falha durante a importação: uma regra diz que o pedido é cancelado (INT-GER-023); outras dizem que tudo é excluído, sem deixar pedido (INT-GER-041, INT-NIV-013). Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Tipo de arquivo: a descrição da opção `Arquivos` fala em .txt; a regra aceita só XML e JSON. Conferir a mensagem na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         },
         {
          "texto": "Esquadria sem cor, altura ou largura: a regra diz que a importação recusa antes de gravar; a gestora registra que hoje a recusa vem do pedido. Conferir em qual etapa aparece.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "cem:checklist-implantacao",
        "titulo": "Implantação da Integração CEM: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-03-integracao-cem.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-integracao-cem",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
      ]
     }
    ]
   }
  },
  {
   "id": "vendas",
   "ordem": 4,
   "titulo": "Vendas",
   "subtitulo": "Pedidos, status, novo pedido, metas e comissões.",
   "cor": "#1976d2",
   "icone": "vendas",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#vendas",
    "guia:scripts/dados-checklists-estagiarios.mjs#vendas",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
   ],
   "materiais": [
    {
     "modulo": "vendas",
     "duracao_s": 188,
     "url": "/videos/fluxo-1-vendas.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/fluxo-1-vendas.json"
     ],
     "id": "vendas:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vendas: o ciclo do pedido de venda",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/03_Manual_Vendas_Timbrado.docx"
     ],
     "id": "vendas:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": "/checklists/estagiarios/04-vendas-pedidos.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
     ],
     "id": "vendas:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Vendas: pedidos de venda",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": "/checklists/estagiarios/fluxo-principal-vendas.html",
     "fontes": [
      "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-vendas"
     ],
     "id": "vendas:fluxo-principal",
     "tipo": "fluxo",
     "jornada": "inicial",
     "titulo": "Fluxo principal de Vendas: do pedido à operação",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": "#inicial/vendas",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#vendas.condicoes-pagamento",
      "harness:conhecimento/glossario/telas.yaml#vendas.pedidos-de-venda",
      "harness:conhecimento/glossario/telas.yaml#vendas.novo-pedido",
      "guia:videos/roteiros/fluxo-1-vendas.json"
     ],
     "id": "vendas:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-04-vendas.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
     ],
     "id": "vendas:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Vendas: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": 220,
     "url": "/videos/consultor-03-comercial.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-03-comercial.json"
     ],
     "id": "vendas:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Comercial: do lead ao pedido de venda",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": "#consultor/vendas",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido.md",
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.md",
      "harness:conhecimento/produto/regras-negocio/regra-servicos-medicao-nasce-do-pedido.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-aprovacoes-cobrem-comissao-e-desconto.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-cfop-depende-de-empresa-e-cliente.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-editar-pedido-somente-em-aberto.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-titulos-quando-esta-habilitado.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-parcelas-recalcular-e-recalcular-parcelas.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-pedido-fica-faturado-ao-salvar-a-nota.md",
      "guia:videos/roteiros/consultor-03-comercial.json"
     ],
     "id": "vendas:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "vendas",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/03_Manual_Vendas_Timbrado.docx"
     ],
     "id": "vendas:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Vendas: pedidos de venda",
        "texto": "O pedido de venda é onde o fluxo operacional começa: dele saem produção, serviços, expedição, nota e títulos.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Encontrar pedidos e entender cada status, conhecer o formulário de pedido sem salvar e ler os indicadores comerciais (dashboard, carteira, metas e comissões).",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "vendas:video-inicial",
        "titulo": "Vendas: o ciclo do pedido de venda",
        "status": "disponivel",
        "url": "/videos/fluxo-1-vendas.mp4",
        "duracao_s": 188,
        "poster": "/videos/fluxo-1-vendas.jpg",
        "legenda": "/videos/fluxo-1-vendas.vtt",
        "resumo": "O que é o pedido, os status, as quatro regras que mais travam e o pedido criado na tela.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/fluxo-1-vendas.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/fluxo-1-vendas.json"
      ]
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Consultar pedidos",
        "onde": "`Vendas > Pedidos de Venda`",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir a lista e notar que ela começa filtrada em Status **\"Em Aberto\"** (e volta para esse filtro quando você sai e entra de novo).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Trocar o Status para \"Todos\" e conhecer os demais: Aprovação pendente, Encerrado, Faturado, Lib. Expedição, Entregue e Cancelado.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Filtros`, buscar por Cliente, Vendedor, Projeto ou Número do Pedido (ex.: PV-000001).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler as colunas **TÍTULOS** (Gerados / Sem títulos) e **NOTA FISCAL**.",
          "nota": "Você identifica se o pedido já tem títulos no financeiro e nota emitida.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Conhecer o formulário de pedido (sem salvar)",
        "onde": "botão `+ Novo Pedido`",
        "intro": null,
        "passos": [
         {
          "texto": "Clicar em **Salvar** com tudo vazio e ler os avisos de Empresa (\"Campo obrigatório\") e Cliente (\"Cliente é obrigatório\").",
          "nota": "Nada é gravado. Empresa e Cliente não têm asterisco: o aviso só aparece ao salvar.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver que o **CFOP** fica bloqueado até escolher empresa e cliente (e vem filtrado pelo estado do cliente) e que a **Conta de Fluxo de Caixa** é obrigatória.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Percorrer os blocos Itens do Pedido, Parcelas do Pedido (meio de pagamento e portador), Informações adicionais e Resumo do Pedido.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Sair com **Cancelar** (se o primeiro clique não funcionar, os avisos mudaram o botão de lugar: clique de novo).",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Ler os indicadores",
        "onde": "`Vendas > Dashboard Vendas`",
        "intro": null,
        "passos": [
         {
          "texto": "Escolher um período (Hoje, Esta semana, Este mês, Este ano) e clicar em **Aplicar**.",
          "nota": "Os cartões (Total em vendas, Ticket médio, Em aberto, Pendentes de faturamento) são recalculados.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que o bloco \"Crescimento vs. período anterior\" **não segue** o filtro de datas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Vendas > Demonstrativos > Carteira de Pedidos`, ler A faturar, A expedir, Em carga, Expedido, Entregue e o aging por dias.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Metas e comissões",
        "onde": "`Vendas > Metas de Vendas` e `Vendas > Controle de Comissão`",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir o painel de Metas: % da meta, projeção, ritmo necessário por dia e cenários pessimista/realista/otimista.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Usar o **Simulador** de comissão: valor 10.000, comissão 5%, Simular.",
          "nota": "Comissão estimada R$ 500,00, liberada no recebimento. O simulador não grava nada.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver em `Comissões` os estágios Previstas, A pagar, Em fechamento, Pagas e Estornadas.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "6. Ver aprovações pendentes",
        "onde": "`Vendas > Aprovações`",
        "intro": null,
        "passos": [
         {
          "texto": "Ver documento, solicitante, valor, tipo e tempo de espera **sem clicar em Aprovar**.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Condições de Pagamento",
          "nota": "Vendas › Configurações › Condições de Pagamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#vendas.condicoes-pagamento"
          ]
         },
         {
          "texto": "Pedidos de Venda",
          "nota": "Vendas › Pedidos de Venda",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#vendas.pedidos-de-venda"
          ]
         },
         {
          "texto": "Novo Pedido",
          "nota": "Vendas › Pedidos de Venda › + Novo Pedido",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#vendas.novo-pedido"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#vendas.condicoes-pagamento",
         "harness:conhecimento/glossario/telas.yaml#vendas.pedidos-de-venda",
         "harness:conhecimento/glossario/telas.yaml#vendas.novo-pedido"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#vendas.condicoes-pagamento",
       "harness:conhecimento/glossario/telas.yaml#vendas.pedidos-de-venda",
       "harness:conhecimento/glossario/telas.yaml#vendas.novo-pedido"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da importação do orçamento à liberação para os módulos operacionais.",
        "etapas": [
         "Projeto no CEM",
         "Integração do orçamento",
         "Pedido de venda",
         "Faturamento",
         "Geração da NF",
         "Contas a Receber",
         "Liberação para Serviços, Produção e Expedição"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#vendas"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: criar um pedido de venda de treino",
        "onde": "`Vendas > Pedidos de Venda > + Novo Pedido`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. Este pedido é a base de quase todo o resto (compras, produção, serviços, expedição, nota e financeiro): faça com calma e anote o número. Use o cliente, o produto e a obra do checklist 02. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Em **Novo Pedido** (é uma página, não um painel), preencher **Empresa**, **Cliente** (o seu de treino), **Vendedor**, **Condição de Pagamento** e, se quiser, **Projeto (opcional)** (a sua obra). Escolher o **CFOP**.",
          "nota": "Escolha a Empresa primeiro (na versão 1.22.13 ela não vem mais preenchida). O CFOP só libera depois de Empresa e Cliente (\"Selecione a empresa e o cliente primeiro\") e vem filtrado pelo estado do cliente. Ao escolher o cliente pode aparecer \"Cliente sem IE informado e não marcado como não contribuinte.\".",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Adicionar o item: ao **escolher o produto** na lista abre o diálogo **Dados do Item**; preencher Altura (mm), Largura (mm), Comprimento (mm), Peso e Cor e clicar em **Aplicar**.",
          "nota": "Pode aparecer o quadro \"Impostos não calculados no item\" com o motivo (ex.: CST de PIS/COFINS ausente na NCM). O pedido salva mesmo assim.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Na parcela, escolher o **Meio Pagamento** e o **Portador**; no Resumo, a **Conta de Fluxo de Caixa** (obrigatória) de venda.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Clicar em **Salvar e Permanecer** (no topo; também há **Salvar** e **Cancelar**).",
          "nota": "Mensagem \"Pedido PV-xxxxxx criado\". Na lista: Em aberto, \"Sem títulos\" e Nota Fiscal \"—\".",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "link",
        "material": "vendas:checklist-inicial",
        "titulo": "Vendas: pedidos de venda",
        "status": "disponivel",
        "url": "/checklists/estagiarios/04-vendas-pedidos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "link",
        "material": "vendas:fluxo-principal",
        "titulo": "Fluxo principal de Vendas: do pedido à operação",
        "status": "disponivel",
        "url": "/checklists/estagiarios/fluxo-principal-vendas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#vendas",
       "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-vendas"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:vendas",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Vendas e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Vendas > Pedidos de Venda > + Novo Pedido`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Vendas > Pedidos de Venda`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: botão `+ Novo Pedido`"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: `Vendas > Dashboard Vendas`"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: `Vendas > Metas de Vendas` e `Vendas > Controle de Comissão`"
         },
         {
          "id": "acessar-6",
          "texto": "Sei acessar: `Vendas > Aprovações`"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 1. Preparar seus dados: criar um pedido de venda de treino"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 2. Consultar pedidos"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 3. Conhecer o formulário de pedido (sem salvar)"
         },
         {
          "id": "executei-10",
          "texto": "Executei: 4. Ler os indicadores"
         },
         {
          "id": "executei-11",
          "texto": "Executei: 5. Metas e comissões"
         },
         {
          "id": "executei-12",
          "texto": "Executei: 6. Ver aprovações pendentes"
         },
         {
          "id": "video",
          "texto": "Assisti ao vídeo introdutório"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas",
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/fluxo-1-vendas.json"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#vendas",
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/fluxo-1-vendas.json"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:vendas",
        "total": 15,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Gerenciar o processo comercial, da criação do pedido ao faturamento. Integrado ao CEM, importa orçamentos sem redigitação.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Inicia o fluxo operacional. Alimenta Faturamento, Fiscal, Financeiro, Produção e Expedição.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após configuração dos cadastros básicos e, preferencialmente, com integração CEM configurada.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Vendas: lista de pedidos e formulário de pedido",
        "texto": "Vendas › Pedidos de Venda. Botão **+ Novo Pedido** (abre uma página, não um painel). Outras telas do módulo: Aprovações, Metas de Vendas, Controle de Comissão, Dashboard Vendas e Demonstrativos (Carteira de Pedidos, Vendas por Período).",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-vendas-pedidos-de-venda.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#vendas",
       "harness:conhecimento/produto/funcional/funcional-vendas-pedidos-de-venda.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Faturar abre uma nova NF-e ligada ao pedido",
        "texto": "**Faturar** no menu `⋯` do pedido abre a \"Nova NF-e — Venda de Mercadoria\" com empresa, cliente, vendedor, CFOP, condição e parcelas do pedido; o número do pedido fica vinculado e não pode ser alterado. O diálogo **Selecionar Itens para Importar** abre sozinho e a nota vem vazia até importar os itens (com \"Recalcular impostos\"). As **Observações Internas** ficam em \"Observações e Informações Adicionais\". O transporte vem como \"9 - Sem Transporte\". Botões: Importar Itens do Pedido, Dados da NF-e, Cancelar, Salvar e Permanecer e Salvar.",
        "confirmar": "Vendas › Pedidos de Venda › `⋯` › Faturar.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Finalizar a NF-e gera os títulos das parcelas",
        "texto": "Ao **Finalizar NF** de uma nota que veio do pedido, o sistema cria sozinho em **Financeiro › Contas a Receber** um título por parcela, com o **Documento** \"NF - <número da nota>\" e os vencimentos e valores das parcelas do pedido. No pedido, a coluna **TÍTULOS** passa a \"Gerados\" e a coluna **NOTA FISCAL** mostra a nota. O menu `⋯` do pedido faturado troca o **Gerar Títulos** por \"Pedido já faturado\", desabilitado, e mostra \"Já faturado: Este pedido já possui nota fiscal emitida\".",
        "confirmar": "Faturamento › Notas Fiscais › `⋯` › Finalizar NF; depois Financeiro › Contas a Receber (pesquisar \"NF - <número>\") e Vendas › Pedidos de Venda (limpar o filtro Status).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A OP copia produto e medidas do pedido, mas não a quantidade",
        "texto": "Em **Produção › Ordens de produção › Nova OP**, ao escolher **Pedido de venda** e **Item do pedido**, o sistema copia produto, cor e medidas, mas **não** a quantidade, que precisa ser informada. A **Empresa** é obrigatória (a dica diz que ela herda do pedido, mas não herda). O **Número da OP** deve ficar vazio: o sistema numera. Tipo de operação \"Fabricação\" e a linha de produção já vêm preenchidos. Não use Esc no painel: ele fecha e perde o formulário.",
        "confirmar": "Produção › Ordens de produção › Nova OP.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A medição nasce de um pedido e pede Empresa e Técnico",
        "texto": "Em **Serviços › Medições › Nova Medição**, **Usar este registro** no pedido traz **Cliente** e **Projeto**; **Empresa** (obrigatória) e **Técnico Responsável** (obrigatório) não vêm do pedido. Opcionais: Equipe de Campo, Data de Agendamento e Duração Prevista (HH:mm). O diálogo **Importar Itens do Pedido** pede os itens e o **Nº vãos** de cada um. Existe também **Medição avulsa (sem pedido)**. A página tem as abas Dados Gerais, Vãos, Fotos e Histórico.",
        "confirmar": "Serviços › Medições › Nova Medição.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-servicos-medicao-nasce-do-pedido.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Vendas › Aprovações cobre comissão e desconto",
        "texto": "A tela **Vendas › Aprovações** lista só solicitações de **comissão** e de **desconto**, com as colunas DOCUMENTO, SOLICITANTE, VALOR, TIPO, ESPERA e AÇÕES. Um pedido **sem desconto** não gera aprovação. O desconto do item é o campo **Desconto**, em R$, e aparece no Resumo como \"Descontos\" reduzindo o Total. Quem solicita não vê a própria solicitação, e o botão **Aprovar** da linha aprova com um clique.",
        "confirmar": "Vendas › Aprovações e o item do pedido.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-aprovacoes-cobrem-comissao-e-desconto.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "No Novo Pedido, o CFOP só libera depois de Empresa e Cliente",
        "texto": "Em **Novo Pedido** (uma página) o campo **CFOP** fica bloqueado com \"Selecione a empresa e o cliente primeiro\" e, depois de escolhidos, só oferece CFOPs coerentes com o estado do cliente. Empresa, Cliente, Vendedor e CFOP não têm asterisco, mas o sistema cobra ao salvar. No Resumo, a **Conta de Fluxo de Caixa** é obrigatória.",
        "confirmar": "Vendas › Pedidos de Venda › + Novo Pedido.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-cfop-depende-de-empresa-e-cliente.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Só o pedido em aberto pode ser editado",
        "texto": "Na lista de pedidos, o **lápis** (Editar pedido) da coluna Ações abre o pedido **Em aberto** para edição. O menu `⋯` do pedido não tem \"Editar\". Pedido **Faturado** ou **Entregue** só tem **Visualizar** (o olho), então campos como **Projeto (opcional)** precisam ser ajustados antes de faturar.",
        "confirmar": "Vendas › Pedidos de Venda: coluna Ações do pedido em aberto e do pedido entregue.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-editar-pedido-somente-em-aberto.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Gerar Pedido de Venda a partir da oportunidade: CFOP sem financeiro",
        "texto": "No painel da oportunidade ganha, **Gerar Pedido de Venda** pede **Empresa** e **CFOP**. Com um CFOP que **gera financeiro** (como 5101 ou 6101) o sistema recusa, dizendo que Condição de Pagamento, Plano de Conta e Parcelas são obrigatórios, campos que o formulário do handoff não tem. Com um CFOP que **não** gera financeiro (como 5910-1) o pedido nasce com cliente, item e valor da oportunidade; depois basta abrir o pedido, trocar o CFOP e escolher a condição de pagamento, e as parcelas são geradas.",
        "confirmar": "CRM › Vendas › Pipeline › oportunidade ganha › Gerar Pedido de Venda. Vendas › Pedidos de Venda para o pedido gerado.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Quando Gerar Títulos está habilitado no pedido",
        "texto": "No menu `⋯` do pedido, **Gerar Títulos** fica habilitado em pedido **Em aberto** ou **Entregue** que ainda não tem títulos. Fica desabilitado quando o pedido está **Faturado** ou **Lib. Expedição** (\"Pedido já faturado\") e quando o pedido já tem títulos, caso em que a tela não explica o motivo. Gera um título por parcela.",
        "confirmar": "Vendas › Pedidos de Venda › menu `⋯` e coluna TÍTULOS (Gerados / Sem títulos).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-titulos-quando-esta-habilitado.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Liberar para Expedição só existe em pedido Faturado",
        "texto": "O item **Liberar para Expedição** do menu `⋯` aparece somente em pedido **Faturado**. Em pedido Em aberto ou Entregue não existe, e em pedido **Lib. Expedição** vira **Reverter Liberação**. O aviso da tela Montar Nova Carga manda clicar nesse botão no pedido, mas ele só está no menu do pedido faturado.",
        "confirmar": "Vendas › Pedidos de Venda › menu `⋯` de pedidos em status diferentes.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Condição de pagamento e os botões Recalcular",
        "texto": "Trocar a **Condição de Pagamento** regenera as parcelas sozinho. O botão **Recalcular** redivide o total por igual, mantém datas e quantidade e mostra o aviso \"Parcelas recalculadas com base no total do pedido\". O botão **Recalcular Parcelas**, no Resumo, só redivide os valores, sem aviso e sem regenerar datas nem quantidade, embora a dica diga \"conforme a condição de pagamento\".",
        "confirmar": "Vendas › Pedidos de Venda › Editar pedido, bloco Parcelas do Pedido e Resumo do Pedido (sem salvar).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-parcelas-recalcular-e-recalcular-parcelas.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "O pedido passa a Faturado quando a nota é salva",
        "texto": "No menu `⋯` do pedido, **Faturar** abre uma nova NF-e. Assim que a nota é **salva** (por exemplo com **Salvar e Permanecer**), o pedido muda para **Faturado** e a coluna **NOTA FISCAL** da lista é preenchida, mesmo que a nota ainda esteja **Em Aberto**.",
        "confirmar": "Vendas › Pedidos de Venda: o Status do pedido e a coluna NOTA FISCAL. Faturamento › Notas Fiscais: o status real da nota (o filtro padrão é Em Aberto).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-pedido-fica-faturado-ao-salvar-a-nota.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Converter exige 60% e BANT completo",
        "texto": "Lead numa etapa do Kanban de 60% ou mais e com o BANT completo: Budget, Autoridade, Necessidade e Prazo.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-03-comercial.json#04",
         "harness-id:regra-crm-converter-lead-exige-etapa-60-e-bant-completo"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A conversão cria a oportunidade sozinha",
        "texto": "A oportunidade nasce no Pipeline, na etapa Novo Lead, com o valor do Budget. As atividades do lead não vão junto.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-03-comercial.json#05",
         "harness-id:regra-crm-conversao-cria-a-oportunidade-sozinha"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Itens viram o valor da oportunidade",
        "texto": "Na aba Itens, aplique o quadro Dados do Item antes de salvar. O Valor estimado passa a ser a soma dos itens.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-03-comercial.json#06",
         "harness-id:funcional-crm-leads-pipeline-e-oportunidades"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido.md",
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.md",
       "harness:conhecimento/produto/regras-negocio/regra-servicos-medicao-nasce-do-pedido.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-aprovacoes-cobrem-comissao-e-desconto.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-cfop-depende-de-empresa-e-cliente.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-editar-pedido-somente-em-aberto.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-pedido-da-oportunidade-exige-cfop-sem-financeiro.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-titulos-quando-esta-habilitado.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-parcelas-recalcular-e-recalcular-parcelas.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-pedido-fica-faturado-ao-salvar-a-nota.md",
       "guia:videos/roteiros/consultor-03-comercial.json#04",
       "harness-id:regra-crm-converter-lead-exige-etapa-60-e-bant-completo",
       "guia:videos/roteiros/consultor-03-comercial.json#05",
       "harness-id:regra-crm-conversao-cria-a-oportunidade-sozinha",
       "guia:videos/roteiros/consultor-03-comercial.json#06",
       "harness-id:funcional-crm-leads-pipeline-e-oportunidades"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da importação do orçamento à liberação para os módulos operacionais.",
        "etapas": [
         "Projeto no CEM",
         "Integração do orçamento",
         "Pedido de venda",
         "Faturamento",
         "Geração da NF",
         "Contas a Receber",
         "Liberação para Serviços, Produção e Expedição"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. O pedido: importado ou digitado",
        "onde": "`Vendas > Pedidos de Venda` (pedido importado ou `+ Novo Pedido`)",
        "intro": "O pedido é onde a operação começa: dele saem produção, expedição, nota e títulos. Use o pedido importado no roteiro da Integração CEM ou digite um com o cliente, com um item de cada categoria.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Ler a lista e ajustar antes de faturar",
        "onde": "`Vendas > Pedidos de Venda`",
        "intro": "Só o pedido Em aberto é editável. Mostre como achar o pedido, ler a situação dele e corrigir enquanto ainda dá.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Alçada de desconto",
        "onde": "`Vendas > Configurações > Alçadas de Desconto` e `Vendas > Aprovações`",
        "intro": "Se o cliente controla desconto, configure a alçada e faça um desconto passar pela aprovação. Sem faixa cadastrada não há alçada.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Títulos pelo pedido e o financeiro nascendo",
        "onde": "menu `⋯ > Gerar Títulos` do pedido e `Financeiro > Contas a Receber`",
        "intro": "Use o pedido A para mostrar a venda que gera o contas a receber antes da nota (venda antecipada, sinal). O pedido B será faturado no bloco 5: nunca faça os dois no mesmo pedido.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Faturar e ver a nota nascer",
        "onde": "menu `⋯ > Faturar` do pedido e `Faturamento > Notas Fiscais`",
        "intro": "Agora o pedido B vira nota. O consultor mostra a nota nascendo do pedido e os títulos nascendo da nota, sem transmitir.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Encerrar e cancelar na ordem certa",
        "onde": "menu `⋯` do pedido (`Encerrar`, `Cancelar`) e `Financeiro > Contas a Receber`",
        "intro": "Desfazer tem ordem: nota, depois títulos, depois pedido. Demonstre as recusas de propósito para o cliente nunca ficar travado.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Liberar para expedição e ver nos indicadores",
        "onde": "menu `⋯ > Liberar para Expedição` do pedido, `Vendas > Dashboard Vendas` e `Vendas > Demonstrativos > Carteira de Pedidos`",
        "intro": "Para quem contratou Expedição, o pedido só entra na fila de carga quando alguém libera. Feche mostrando os pedidos do roteiro nos indicadores.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Comissões, metas e contrato (só se contratados)",
        "onde": "`Vendas > Controle de Comissão`, `Vendas > Metas de Vendas` e `Vendas > Contratos de Fornecimento`",
        "intro": "Faça cada passo só se o recurso foi contratado. Regime e base da comissão precisam ser decididos antes da primeira nota real.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#vendas",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Vendas: roteiro prático com o cliente",
        "texto": "Ao final, o cliente criou e ajustou um pedido, viu um desconto passar pela aprovação, gerou títulos num pedido e faturou outro, e encontrou o título e a nota em cada módulo. Ele sabe por que o sistema recusa cancelar um pedido faturado ou com títulos e qual a ordem para desfazer.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. O pedido: importado ou digitado",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "2. Ler a lista e ajustar antes de faturar",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "3. Alçada de desconto",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "4. Títulos pelo pedido e o financeiro nascendo",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "5. Faturar e ver a nota nascer",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "6. Encerrar e cancelar na ordem certa",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "7. Liberar para expedição e ver nos indicadores",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "8. Comissões, metas e contrato (só se contratados)",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "link",
        "material": "vendas:checklist-implantacao",
        "titulo": "Implantação de Vendas: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-04-vendas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Priorize exemplos reais da empresa. O fluxo pode ser adaptado (ex: usar status \"Encerrado\" e gerar títulos antes do \"Faturado\"). O importante é que os usuários compreendam a lógica do processo.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas",
       "guia:db/migrations/002_modulos_iniciais.sql#vendas"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Fundação concluída: cliente, vendedor, produtos com unidade válida, condições e meios de pagamento, portador, plano de contas e CFOPs de venda revisados com o contador.",
          "nota": "**Confira:** o checklist da Fundação assinado e um pedido de teste já salvo. **Fonte:** README da cadeia comercial, ordem de implantação; procedimento Criar pedido de venda.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Decidido com o cliente: quem gera o contas a receber, o pedido (Gerar Títulos) ou a nota.",
          "nota": "**Confira:** a decisão na ata. Se o pedido gerou os títulos, a nota não gera de novo e o pedido fica com os valores travados. **Fonte:** README da cadeia comercial, decisão X2; Manual 03 Vendas, 2.3.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Ambiente fiscal em **homologação** e almoxarifado central ativo em `Estoque > Locais`.",
          "nota": "**Confira:** a faixa “Ambiente NF-e: HOMOLOGAÇÃO” na nota e o local ativo. Sem local de estoque a nota não finaliza. **Fonte:** teste do fluxo completo, pré-requisitos; procedimento Faturar o pedido e finalizar a nota.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Dois usuários de teste: o vendedor e um aprovador de desconto diferente dele.",
          "nota": "**Confira:** os dois entram e o aprovador vê `Vendas > Aprovações`. O vendedor não aprova o próprio desconto. **Fonte:** Vendas C, etapa 3.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Um pedido criado (ou importado), ajustado e salvo, com parcelas pela condição de pagamento.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Um desconto acima da alçada passou por Aprovação pendente e foi aprovado por outro usuário.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Um pedido gerou títulos e outro foi faturado; o título e a nota foram encontrados no Financeiro e no Faturamento.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "As recusas de cancelamento foram demonstradas e um pedido foi cancelado na ordem nota → títulos → pedido.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Um pedido faturado foi liberado para expedição (quem tem Expedição) e aparece no Dashboard e na Carteira de Pedidos.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Nenhuma nota foi transmitida sem o responsável fiscal.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Importar orçamento do CEM (quando aplicável)",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#vendas"
          ]
         },
         {
          "texto": "Cadastrar e aprovar pedido de venda",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#vendas"
          ]
         },
         {
          "texto": "Realizar faturamento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#vendas"
          ]
         },
         {
          "texto": "Compreender integração com Faturamento, Financeiro, Serviços, Produção e Expedição",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#vendas"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas",
       "guia:db/migrations/002_modulos_iniciais.sql#vendas"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Inicia o fluxo operacional. Alimenta Faturamento, Fiscal, Financeiro, Produção e Expedição.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#vendas"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#vendas"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste ou homologação; pedidos com “TESTE FLUXO CONSULTOR”. Nota fiscal só é transmitida com o responsável fiscal: o roteiro só finaliza.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Não gere títulos pelo pedido e fature o mesmo pedido: escolha um caminho com o cliente (pedido ou nota) e mantenha.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "O pedido vira Faturado ao **salvar** a nota, mesmo com ela Em Aberto: confira o status da nota em `Faturamento > Notas Fiscais`.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Encerrado não volta e não cancela: use só quando a venda está fechada sem nota.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Ordem para desfazer: cancelar a nota → excluir ou estornar os títulos → cancelar o pedido (motivo com 10 caracteres ou mais).",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Pedido com títulos só aceita mudar observações e vendedor.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Hoje o campo “% Comissão” do vendedor só aparece no participante quando o cliente tem o módulo CRM; sem CRM, use regra por vendedor.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Há pedidos com o mesmo número em empresas ou séries diferentes e pedidos desdobrados (ex.: PV-000395/2): confira cliente e valor.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Ganha não pede confirmação: se clicar sem querer, use Reverter ganho.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-03-comercial.json#14"
          ]
         },
         {
          "texto": "Desconto em R$ acima da alçada vai para aprovação de outro usuário.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-03-comercial.json#14"
          ]
         },
         {
          "texto": "Reverta o ganho antes de gerar o pedido, nunca depois.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-03-comercial.json#14"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-03-comercial.json#14"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Quando aparece **Gerar Títulos**: a gestora diz só em pedido Em aberto; o teste do fluxo completo viu a opção desabilitada em Faturado e Lib. Expedição (“Pedido já faturado”) e de volta depois de Entregue; o procedimento cita Em aberto ou Entregue sem títulos. Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Quando aparece **Liberar para Expedição**: a gestora diz pedido Faturado ou Encerrado; o teste do fluxo completo diz que a opção só aparece depois de faturado. Conferir com um pedido Encerrado.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Encerrado e nota: a gestora mostra que um pedido Encerrado ainda pode receber nota (vira Faturado); o Manual 03 Vendas diz que Encerrar conclui o pedido sem faturar o saldo. Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Saída de estoque na nota: a gestora diz que o CFOP que movimenta estoque baixa o estoque na nota; no teste do fluxo completo a finalização da nota não gerou saída de estoque. Conferir em `Estoque > Movimentos`.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         },
         {
          "texto": "Numeração do pedido: a gestora indica, como inferência, que informar à mão o primeiro número faz os seguintes seguirem automáticos. Conferir antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas",
       "guia:videos/roteiros/consultor-03-comercial.json#14"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "vendas:video-consultor",
        "titulo": "Comercial: do lead ao pedido de venda",
        "status": "disponivel",
        "url": "/videos/consultor-03-comercial.mp4",
        "duracao_s": 220,
        "poster": "/videos/consultor-03-comercial.jpg",
        "legenda": "/videos/consultor-03-comercial.vtt",
        "resumo": "As quatro regras que travam o CRM e o caminho real, do Kanban à oportunidade ganha.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-03-comercial.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-03-comercial.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "vendas:checklist-inicial",
        "titulo": "Vendas: pedidos de venda",
        "status": "disponivel",
        "url": "/checklists/estagiarios/04-vendas-pedidos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#vendas"
        ]
       },
       {
        "tipo": "link",
        "material": "vendas:fluxo-principal",
        "titulo": "Fluxo principal de Vendas: do pedido à operação",
        "status": "disponivel",
        "url": "/checklists/estagiarios/fluxo-principal-vendas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-vendas"
        ]
       },
       {
        "tipo": "link",
        "material": "vendas:checklist-implantacao",
        "titulo": "Implantação de Vendas: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-04-vendas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como ajustar o pedido antes de faturar",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-ajustar-o-pedido-antes-de-faturar.md"
          ]
         },
         {
          "texto": "Como criar um pedido de venda",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-criar-pedido-de-venda.md"
          ]
         },
         {
          "texto": "Como faturar o pedido e finalizar a nota sem transmitir",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-faturar-o-pedido-e-finalizar-a-nota.md"
          ]
         },
         {
          "texto": "Como gerar os títulos do pedido e receber",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-gerar-titulos-e-receber.md"
          ]
         },
         {
          "texto": "Como liberar o pedido e montar a carga",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-montar-carga-e-liberar-para-expedicao.md"
          ]
         },
         {
          "texto": "03 Manual Vendas",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/03_Manual_Vendas_Timbrado.docx"
          ]
         },
         {
          "texto": "01-pedido-de-venda",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/vendas/01-pedido-de-venda.docx"
          ]
         },
         {
          "texto": "02-contratos-de-fornecimento",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/vendas/02-contratos-de-fornecimento.docx"
          ]
         },
         {
          "texto": "03-metas-de-vendas",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/vendas/03-metas-de-vendas.docx"
          ]
         },
         {
          "texto": "04-comissoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/vendas/04-comissoes.docx"
          ]
         },
         {
          "texto": "05-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/vendas/05-paineis-e-demonstrativos.docx"
          ]
         },
         {
          "texto": "06-configuracoes-e-integracoes-de-vendas",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/vendas/06-configuracoes-e-integracoes-de-vendas.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-ajustar-o-pedido-antes-de-faturar.md",
         "harness:conhecimento/produto/procedimentos/procedimento-criar-pedido-de-venda.md",
         "harness:conhecimento/produto/procedimentos/procedimento-faturar-o-pedido-e-finalizar-a-nota.md",
         "harness:conhecimento/produto/procedimentos/procedimento-gerar-titulos-e-receber.md",
         "harness:conhecimento/produto/procedimentos/procedimento-montar-carga-e-liberar-para-expedicao.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/03_Manual_Vendas_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/vendas/01-pedido-de-venda.docx",
         "harness:conhecimento/Roteiros Treinamento/vendas/02-contratos-de-fornecimento.docx",
         "harness:conhecimento/Roteiros Treinamento/vendas/03-metas-de-vendas.docx",
         "harness:conhecimento/Roteiros Treinamento/vendas/04-comissoes.docx",
         "harness:conhecimento/Roteiros Treinamento/vendas/05-paineis-e-demonstrativos.docx",
         "harness:conhecimento/Roteiros Treinamento/vendas/06-configuracoes-e-integracoes-de-vendas.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#vendas",
       "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-vendas",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-vendas",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-ajustar-o-pedido-antes-de-faturar.md",
       "harness:conhecimento/produto/procedimentos/procedimento-criar-pedido-de-venda.md",
       "harness:conhecimento/produto/procedimentos/procedimento-faturar-o-pedido-e-finalizar-a-nota.md",
       "harness:conhecimento/produto/procedimentos/procedimento-gerar-titulos-e-receber.md",
       "harness:conhecimento/produto/procedimentos/procedimento-montar-carga-e-liberar-para-expedicao.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/03_Manual_Vendas_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/vendas/01-pedido-de-venda.docx",
       "harness:conhecimento/Roteiros Treinamento/vendas/02-contratos-de-fornecimento.docx",
       "harness:conhecimento/Roteiros Treinamento/vendas/03-metas-de-vendas.docx",
       "harness:conhecimento/Roteiros Treinamento/vendas/04-comissoes.docx",
       "harness:conhecimento/Roteiros Treinamento/vendas/05-paineis-e-demonstrativos.docx",
       "harness:conhecimento/Roteiros Treinamento/vendas/06-configuracoes-e-integracoes-de-vendas.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "compras",
   "ordem": 5,
   "titulo": "Compras",
   "subtitulo": "Solicitação, cotação, pedido de compra e linha do tempo.",
   "cor": "#00838f",
   "icone": "compras",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#compras",
    "guia:scripts/dados-checklists-estagiarios.mjs#compras",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
   ],
   "materiais": [
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "compras:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/04_Manual_Compras_Timbrado.docx"
     ],
     "id": "compras:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": "/checklists/estagiarios/05-compras.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#compras"
     ],
     "id": "compras:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Compras: da necessidade ao pedido",
     "status": "disponivel"
    },
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": "#inicial/compras",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#compras.solicitacoes",
      "guia:videos/roteiros/consultor-01-suprimentos.json"
     ],
     "id": "compras:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-08-compras.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
     ],
     "id": "compras:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Compras: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "compras",
     "duracao_s": 203,
     "url": "/videos/consultor-01-suprimentos.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-01-suprimentos.json"
     ],
     "id": "compras:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Suprimentos: da solicitação ao pagamento",
     "status": "disponivel"
    },
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": "#consultor/compras",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-compras-gerar-pedido-de-compra-abre-o-novo-pedido.md",
      "harness:conhecimento/produto/regras-negocio/regra-compras-natureza-da-operacao-define-o-cfop.md",
      "harness:conhecimento/produto/regras-negocio/regra-recebimento-a-mesma-nota-tem-dois-numeros.md",
      "guia:videos/roteiros/consultor-01-suprimentos.json"
     ],
     "id": "compras:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "compras",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/04_Manual_Compras_Timbrado.docx"
     ],
     "id": "compras:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Compras: da necessidade ao pedido",
        "texto": "O caminho do material: alguém precisa → cotação com fornecedores → pedido de compra → entrega no Recebimento.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Entender a sequência de documentos de compra (SC → COT → PC), onde consultar cada um, ler a linha do tempo do pedido e saber o que acontece depois da entrega.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#compras"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Conhecer o menu na ordem do processo",
        "onde": "módulo `Compras`",
        "intro": null,
        "passos": [
         {
          "texto": "Ver que os itens do menu seguem o processo: Solicitações → Sugestão → Cotações → Pedidos → Aprovações → Contratos de Entrega → Follow-up de Entregas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir o `Dashboard Compras` e ler os cartões (solicitações em aberto, cotações ativas, pedidos em aberto, total do mês) e o bloco de pedidos recentes.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Consultar os documentos de compra",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Em `Solicitações de Compra`, localizar uma SC e abrir o menu `⋯`.",
          "nota": "Opções Gerar Cotação, Gerar Pedido de Compra e Excluir. A solicitação não tem etapa de aprovação.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Cotações de Compra`, abrir uma cotação e percorrer o assistente: Dados Gerais, Itens a Cotar, Cotação (fornecedores) e Comparação.",
          "nota": "A Natureza da Operação escolhida define o CFOP do pedido.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Pedidos de Compra`, abrir um pedido e ler fornecedor, itens, CFOP, entrega prevista e parcelas.",
          "nota": "O status da lista (\"Em Aberto\") pode diferir do da tela de edição (\"Em Edição\").",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir `⋯ > Linha do tempo` do pedido.",
          "nota": "Mostra SC, cotação, pedido, nota de recebimento e título, cada um com seu status.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Sugestão e aprovação",
        "onde": "`Compras > Sugestão de Compra` e `Compras > Aprovações`",
        "intro": null,
        "passos": [
         {
          "texto": "Em `Sugestão de Compra`, ler a fórmula \"falta líquida = mínimo − disponível\" **sem gerar solicitações**.",
          "nota": "Só aparecem itens com estoque mínimo cadastrado.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Compras > Aprovações`, ver os pedidos aguardando alçada.",
          "nota": "A aprovação por alçada vem desligada: sem ela o pedido já nasce pronto para receber.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#compras"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Solicitações de Compra",
          "nota": "Compras › Solicitações de Compra",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#compras.solicitacoes"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#compras.solicitacoes"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#compras.solicitacoes"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da identificação da necessidade ao recebimento da mercadoria.",
        "etapas": [
         "Necessidade de Compra",
         "Cotação",
         "Comparação de Fornecedores",
         "Pedido de Compra",
         "Acompanhamento da Entrega",
         "Recebimento da Mercadoria"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#compras"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: criar uma solicitação e um pedido de compra",
        "onde": "`Cadastros > Participantes` e `Compras > Solicitações de Compra`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A compra precisa de um fornecedor, que é o mesmo cadastro de participante com outra chave ligada. Anote os números: o checklist 06 (recebimento) parte do seu pedido de compra. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Cadastrar um participante \"TESTE ESTAGIÁRIO - Fornecedor\" com **É Fornecedor?** ligado, como no checklist 02.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Compras > Solicitações de Compra > Nova Solicitação`: **Empresa**, data de necessidade, produto e quantidade. Salvar.",
          "nota": "SC \"Em Aberto\". Produto de chapa ou perfil pede a **Cor** ao ser escolhido (diálogo \"Dados do Item\" > Aplicar). Projeto em branco faz a entrada cair no almoxarifado central.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "No menu `⋯` da solicitação, escolher **Gerar Pedido de Compra** (a cotação é opcional). Abre o **Novo Pedido de Compra** com o produto já preenchido: informar **Fornecedor**, **Comprador**, **Condição de Pagamento**, **CFOP** (obrigatório) e o **Valor Unitário**; conferir a **Conta de Fluxo de Caixa** sugerida e clicar em **Salvar**.",
          "nota": "Nasce o PC \"Em Aberto\" e \"Sem títulos\"; na linha do tempo a SC aparece como Concluída. Sem CFOP o diálogo \"Campos Obrigatórios Não Preenchidos\" avisa \"CFOP é obrigatório\" (o rótulo não tem asterisco).",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Se o supervisor pedir a cotação: `⋯ > Gerar Cotação` (Empresa e Natureza da Operação), fornecedor com data de entrega e condição de pagamento, proposta preenchida e então **Gerar Pedido de Compra**.",
          "nota": "Ao gerar o pedido, a solicitação e a cotação aparecem como Concluída na linha do tempo.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       },
       {
        "tipo": "link",
        "material": "compras:checklist-inicial",
        "titulo": "Compras: da necessidade ao pedido",
        "status": "disponivel",
        "url": "/checklists/estagiarios/05-compras.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#compras"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:compras",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Compras e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Cadastros > Participantes` e `Compras > Solicitações de Compra`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: módulo `Compras`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `Compras > Sugestão de Compra` e `Compras > Aprovações`"
         },
         {
          "id": "executei-4",
          "texto": "Executei: 1. Preparar seus dados: criar uma solicitação e um pedido de compra"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 2. Conhecer o menu na ordem do processo"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 3. Consultar os documentos de compra"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 4. Sugestão e aprovação"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#compras"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:compras",
        "total": 9,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Gerenciar aquisição de materiais — cotações, comparação de fornecedores, pedidos e acompanhamento de entregas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Recebe demandas de Produção, Estoque ou solicitações manuais. Segue para Recebimento, Financeiro e Fiscal.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Estoque e Produção.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Compras e Recebimento: solicitação, cotação, pedido e nota",
        "texto": "Compras › Solicitações de Compra, Sugestão de Compra, Cotações, Pedidos de Compra, Aprovações, Contratos de Entrega e Follow-up de Entregas. Recebimento › Notas de Recebimento e a fila de conferência (menu \"Aprovações\").",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-compras-solicitacoes-pedidos-e-recebimento.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#compras",
       "harness:conhecimento/produto/funcional/funcional-compras-solicitacoes-pedidos-e-recebimento.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Gerar Pedido de Compra da solicitação abre o Novo Pedido de Compra",
        "texto": "No menu `⋯` da solicitação (SC), **Gerar Pedido de Compra** não grava direto: abre **Novo Pedido de Compra** com o produto já preenchido, onde se informa **Fornecedor**, **Comprador**, **Condição de Pagamento**, **CFOP** (obrigatório, sem asterisco), o **Valor Unitário** e se confere a **Conta de Fluxo de Caixa** sugerida. A cotação é opcional. Ao salvar, o pedido fica \"Em Aberto\" e \"Sem títulos\", e a solicitação aparece como Concluída na linha do tempo. Produto de chapa ou perfil pede a **Cor** na solicitação.",
        "confirmar": "Compras › Solicitações de Compra › `⋯` › Gerar Pedido de Compra.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-compras-gerar-pedido-de-compra-abre-o-novo-pedido.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Na cotação, a Natureza da Operação define o CFOP do pedido de compra",
        "texto": "A cotação (Compras › Cotações de Compra) é um assistente de quatro passos: **Dados Gerais**, **Itens a Cotar**, **Cotação** (propostas dos fornecedores) e **Comparação** (análise e vencedor). Em Dados Gerais, a **Natureza da Operação** (obrigatória: Consumo, Produção, Revenda ou Ativo Imobilizado) \"define o CFOP do pedido de compra automaticamente, conforme a origem do fornecedor\" (ex.: Produção → 2101). Na Comparação escolhe-se o critério (Regra das Configurações, Menor Preço ou Menor Prazo, por fornecedor ou por item) e **Aplicar Melhor Opção**; nada é gravado antes disso. **Gerar Pedido de Compra** cria um pedido por fornecedor vencedor. A cotação é opcional.",
        "confirmar": "Compras › Cotações de Compra › Visualizar cotação.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-compras-natureza-da-operacao-define-o-cfop.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A nota de recebimento tem dois números",
        "texto": "No menu `⋯` do pedido de compra, **Gerar Nota de Recebimento** abre a página **Nova Nota de Recebimento** já preenchida a partir do pedido (Empresa, Fornecedor, CFOP, Pedido de Compra, Condição de Pagamento, itens e Conta de Fluxo de Caixa). A mesma nota aparece como \"NF-<número do fornecedor>\" na lista de Recebimento e como \"NR-<número interno>\" na conferência, no pedido de compra e no título. A lista de notas abre com Status \"Em Aberto\". A conferência física fica no menu como \"Aprovações\".",
        "confirmar": "Compras › Pedidos de Compra › `⋯` e Recebimento › Notas de Recebimento.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-recebimento-a-mesma-nota-tem-dois-numeros.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Sem almoxarifado central, nada entra",
        "texto": "A entrada do recebimento vai para o almoxarifado central ativo. Sem ele, o sistema bloqueia.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-01-suprimentos.json#07",
         "harness-id:regra-estoque-almoxarifado-central-ativo-e-pre-requisito"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-compras-gerar-pedido-de-compra-abre-o-novo-pedido.md",
       "harness:conhecimento/produto/regras-negocio/regra-compras-natureza-da-operacao-define-o-cfop.md",
       "harness:conhecimento/produto/regras-negocio/regra-recebimento-a-mesma-nota-tem-dois-numeros.md",
       "guia:videos/roteiros/consultor-01-suprimentos.json#07",
       "harness-id:regra-estoque-almoxarifado-central-ativo-e-pre-requisito"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da identificação da necessidade ao recebimento da mercadoria.",
        "etapas": [
         "Necessidade de Compra",
         "Cotação",
         "Comparação de Fornecedores",
         "Pedido de Compra",
         "Acompanhamento da Entrega",
         "Recebimento da Mercadoria"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Solicitação de compra manual",
        "onde": "`Compras > Solicitações de Compra > Nova Solicitação`",
        "intro": "A compra começa pela necessidade. Mostre ao cliente que a solicitação registra o que falta, sem fornecedor e sem preço, e que ela não tem etapa de aprovação.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Sugestão de compra (se o cliente usa estoque mínimo)",
        "onde": "`Compras > Sugestão de Compra`",
        "intro": "Para quem repõe insumos por estoque mínimo, a sugestão cria as solicitações sozinha. Pule o bloco se o cliente não usa estoque mínimo.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Cotação com fornecedores",
        "onde": "`⋯ > Gerar Cotação` da SC ou `Compras > Cotações de Compra`",
        "intro": "A cotação compara fornecedores e define o vencedor de cada item. É um assistente de quatro passos: Dados Gerais, Itens a Cotar, Cotação e Comparação.",
        "passos_total": 7,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Gerar o pedido de compra",
        "onde": "`Gerar Pedido de Compra` na comparação e `Compras > Pedidos de Compra`",
        "intro": "O pedido é o compromisso com o fornecedor. Mostre os dois caminhos: pela cotação (um pedido por vencedor) e direto da solicitação, sem cotação.",
        "passos_total": 6,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Aprovação por alçada (se o cliente usa)",
        "onde": "`Compras > Configurações > Faixas de Alçada` e `Compras > Aprovações`",
        "intro": "A alçada segura o pedido acima de um valor até alguém aprovar. Ligue a chave só depois das faixas cadastradas. Pule o bloco se o cliente não aprova compras.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Enviar o pedido e acompanhar a entrega",
        "onde": "`Compras > Pedidos de Compra`, `Compras > Follow-up de Entregas` e `Dashboard Compras`",
        "intro": "Com o pedido aprovado, o comprador envia ao fornecedor e acompanha o prazo até a mercadoria chegar.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Reflexo no Recebimento e no Financeiro",
        "onde": "`Compras > Pedidos de Compra > ⋯` e `Financeiro > Contas a Pagar`",
        "intro": "O pedido termina no Recebimento. Mostre onde nasce o título a pagar conforme a decisão da ata (pelo pedido ou pela nota) e o que trava o cancelamento.",
        "passos_total": 6,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#compras",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Compras: roteiro prático com o cliente",
        "texto": "Ao final, o cliente viu uma necessidade de material virar pedido de compra aprovado, nota de recebimento e título a pagar, e sabe repetir cada passo sozinho. Ele também viu o sistema recusar o que não pode: preço zero, item sem vencedor, autor aprovando o próprio pedido e cancelamento com nota ativa.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Solicitação de compra manual",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "2. Sugestão de compra (se o cliente usa estoque mínimo)",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "3. Cotação com fornecedores",
          "nota": "7 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "4. Gerar o pedido de compra",
          "nota": "6 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "5. Aprovação por alçada (se o cliente usa)",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "6. Enviar o pedido e acompanhar a entrega",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "7. Reflexo no Recebimento e no Financeiro",
          "nota": "6 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "link",
        "material": "compras:checklist-implantacao",
        "titulo": "Implantação de Compras: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-08-compras.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente solicitações, cotações, pedidos e acompanhamento. Demonstre integração com Recebimento, Financeiro e Estoque.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras",
       "guia:db/migrations/002_modulos_iniciais.sql#compras"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Fundação concluída e assinada; módulo Compras ativo (Compras PRO só se usar Contratos de Entrega).",
          "nota": "**Confira:** checklist da Fundação assinado e `Minha Assinatura`. **Fonte:** COM D, seção 1; COM-GER-004.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Fornecedor de teste com **É Fornecedor?** e **Conta a Pagar** ligados, **Conta de Fluxo de Caixa Despesa** preenchida e contato com **E-mail Compras** (use um e-mail interno da equipe).",
          "nota": "**Confira:** o cadastro do participante. **Fonte:** fluxo antigo de suprimentos (pré-requisito); COM-RFQ-004, COM-COT-019.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Insumo de teste com NCM, unidade, categoria com \"Preço calculado por\", embalagem e fator; perfil e esquadria com as características da categoria (cor, medidas).",
          "nota": "**Confira:** abra o produto. Sem NCM a solicitação não entra na cotação. **Fonte:** COM-COT-003, COM-SC-001, COM-SC-003.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "CFOPs de entrada (1xxx/2xxx, e 3xxx se importa) das naturezas usadas, com \"gera financeiro\" decidido com o contador; condições de pagamento com parcelas; meios de pagamento.",
          "nota": "**Confira:** a lista de CFOPs assinada pelo contador. **Fonte:** README de Suprimentos, decisão S1; COM-COT-010, COM-PC-002.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Decisões registradas em ata: títulos a pagar **pelo pedido ou pela nota** (nunca pelos dois) e se haverá **aprovação por alçada**. A alçada vem desligada.",
          "nota": "**Confira:** a ata. **Fonte:** README de Suprimentos, decisões S2 e S3; fluxo antigo de suprimentos (pré-requisito).",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "`Compras > Configurações > Parâmetros de Compras` revisados: \"Regras de Melhor Opção\" e \"Critérios de preço na Cotação\". Deixe \"Usar aprovação por alçada\" desligado até o bloco 5.",
          "nota": "**Confira:** a tela de parâmetros. **Fonte:** COM C, etapa 2; COM-PAR-001, COM-COT-008.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Dois usuários de teste: o comprador e um aprovador (quem cria o pedido não aprova).",
          "nota": "**Confira:** `Segurança > Perfis de Acesso`. **Fonte:** COM-ALC-007 (D-661); COM C, etapa 10.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Uma SC manual virou cotação com dois fornecedores, vencedor por item e pedido de compra, e outra SC virou pedido direto.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Se a alçada é usada: o pedido acima da faixa esperou aprovação, o autor não aprovou e outro usuário aprovou.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "O pedido gerou a nota de recebimento, e a entrega parcial criou o PC residual.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Um título só por parcela nasceu, pelo pedido ou pela nota, conforme a ata.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "A Linha do tempo do PC mostra SC → COT → PC → NR → título.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "O cliente viu o sistema recusar: perfil sem comprimento, item sem vencedor, preço zero e cancelamento com nota ativa.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Gerar solicitação de compra",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#compras"
          ]
         },
         {
          "texto": "Realizar cotação com fornecedores",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#compras"
          ]
         },
         {
          "texto": "Emitir pedido de compra",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#compras"
          ]
         },
         {
          "texto": "Acompanhar entrega dos materiais",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#compras"
          ]
         },
         {
          "texto": "Compreender integração com Produção, Recebimento, Financeiro e Estoque",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#compras"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras",
       "guia:db/migrations/002_modulos_iniciais.sql#compras"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Recebe demandas de Produção, Estoque ou solicitações manuais. Segue para Recebimento, Financeiro e Fiscal.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#compras"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#compras"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste. Nomeie os registros com \"TESTE FLUXO CONSULTOR\" e use e-mails internos da equipe em **Enviar por e-mail**: o envio chega de verdade ao fornecedor.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Gerar o pedido conclui a SC e a cotação automaticamente. Depois que o pedido é recebido, Cancelar e Excluir ficam desabilitados: planeje a limpeza.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Títulos a pagar nascem **pelo pedido ou pela nota, nunca pelos dois**. Com títulos gerados, os itens e parcelas do pedido travam.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Ligue \"Usar aprovação por alçada\" só depois das faixas e da carga de pedidos em aberto; senão os pedidos importados ficam pendentes. Cadastre dois aprovadores por faixa.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Hoje o sistema ainda mostra o crédito de imposto de entrada com sinal negativo no pedido de compra (COM-PC-018). Avise o cliente que confere impostos no PC.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Hoje o sistema ainda não envia o pedido de compra por e-mail a partir da tela do pedido: use **Baixar PDF**.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "A sugestão de compra só lista itens com **estoque mínimo** cadastrado e apura pelo produto, não pela cor ou medida.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "A nota fiscal de devolução que nasce do Recebimento só é transmitida com o responsável fiscal do cliente.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Finalizar a nota de recebimento não pode ser desfeito.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-01-suprimentos.json#14"
          ]
         },
         {
          "texto": "O meio de pagamento da parcela não chega ao Pagar: informe de novo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-01-suprimentos.json#14"
          ]
         },
         {
          "texto": "A Sugestão de Compra só lista itens com estoque mínimo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-01-suprimentos.json#14"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-01-suprimentos.json#14"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Status do pedido de compra: a trilha de estagiários (conferida na tela) viu \"Em Aberto\" na lista e \"Em Edição\" na tela de edição; a gestora lista só Em aberto, Recebido e Cancelado (COM-PC-004). Conferir na tela antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Momento do desdobro do PC parcial: a gestora diz que **salvar** a nota já desdobra (REC-NR-009); o checklist D de Compras descreve gerar a nota parcial **e finalizar**. Conferir em que momento o `PC-nnnn/2` aparece.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Caminho dos parâmetros: o fluxo antigo cita `Compras > Configurações > Parâmetros`; a gestora, `Compras > Configurações > Parâmetros de Compras`. Conferir o rótulo do menu.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         },
         {
          "texto": "Não conferidos na tela pelo fluxo antigo: aprovação por alçada ligada (rótulos dos botões da fila de aprovação estão pendentes na gestora), **Enviar por e-mail**, **Importar resposta do fornecedor**, Follow-up de Entregas e a sugestão gerando SCs.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras",
       "guia:videos/roteiros/consultor-01-suprimentos.json#14"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "compras:video-consultor",
        "titulo": "Suprimentos: da solicitação ao pagamento",
        "status": "disponivel",
        "url": "/videos/consultor-01-suprimentos.mp4",
        "duracao_s": 203,
        "poster": "/videos/consultor-01-suprimentos.jpg",
        "legenda": "/videos/consultor-01-suprimentos.vtt",
        "resumo": "Cotação opcional, a natureza da operação que define o CFOP, a nota com dois números e a linha do tempo do pedido.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-01-suprimentos.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-01-suprimentos.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "compras:checklist-inicial",
        "titulo": "Compras: da necessidade ao pedido",
        "status": "disponivel",
        "url": "/checklists/estagiarios/05-compras.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#compras"
        ]
       },
       {
        "tipo": "link",
        "material": "compras:checklist-implantacao",
        "titulo": "Implantação de Compras: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-08-compras.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como ir da solicitação de compra à nota de recebimento",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-criar-solicitacao-pedido-de-compra-e-nota-de-recebimento.md"
          ]
         },
         {
          "texto": "04 Manual Compras",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/04_Manual_Compras_Timbrado.docx"
          ]
         },
         {
          "texto": "01-integracao-de-estoque-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/01-integracao-de-estoque-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "02-solicitacao-de-compra-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/02-solicitacao-de-compra-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "03-cotacao-de-compra-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/03-cotacao-de-compra-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "04-sugestao-de-compra-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/04-sugestao-de-compra-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "05-contratos-de-entrega-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/05-contratos-de-entrega-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "06-follow-up-de-entregas-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/06-follow-up-de-entregas-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "07-pedidos-de-compra",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/07-pedidos-de-compra.docx"
          ]
         },
         {
          "texto": "08-aprovacoes-e-configuracoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/08-aprovacoes-e-configuracoes.docx"
          ]
         },
         {
          "texto": "09-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/compras/09-paineis-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-criar-solicitacao-pedido-de-compra-e-nota-de-recebimento.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/04_Manual_Compras_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/01-integracao-de-estoque-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/02-solicitacao-de-compra-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/03-cotacao-de-compra-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/04-sugestao-de-compra-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/05-contratos-de-entrega-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/06-follow-up-de-entregas-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/07-pedidos-de-compra.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/08-aprovacoes-e-configuracoes.docx",
         "harness:conhecimento/Roteiros Treinamento/compras/09-paineis-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#compras",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-compras",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-criar-solicitacao-pedido-de-compra-e-nota-de-recebimento.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/04_Manual_Compras_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/01-integracao-de-estoque-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/02-solicitacao-de-compra-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/03-cotacao-de-compra-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/04-sugestao-de-compra-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/05-contratos-de-entrega-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/06-follow-up-de-entregas-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/07-pedidos-de-compra.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/08-aprovacoes-e-configuracoes.docx",
       "harness:conhecimento/Roteiros Treinamento/compras/09-paineis-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "recebimento",
   "ordem": 6,
   "titulo": "Recebimento",
   "subtitulo": "Notas de recebimento, conferência e reflexos.",
   "cor": "#5d4037",
   "icone": "recebimento",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#recebimento",
    "guia:scripts/dados-checklists-estagiarios.mjs#recebimento",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
   ],
   "materiais": [
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "recebimento:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/05_Manual_Recebimento_Timbrado.docx"
     ],
     "id": "recebimento:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": "/checklists/estagiarios/06-recebimento.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
     ],
     "id": "recebimento:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Recebimento de mercadorias",
     "status": "disponivel"
    },
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": "#inicial/recebimento",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#recebimento.nova-nota",
      "guia:videos/roteiros/consultor-01-suprimentos.json"
     ],
     "id": "recebimento:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-09-recebimento.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
     ],
     "id": "recebimento:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Recebimento: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "recebimento",
     "duracao_s": 203,
     "url": "/videos/consultor-01-suprimentos.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-01-suprimentos.json"
     ],
     "id": "recebimento:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Suprimentos: da solicitação ao pagamento",
     "status": "disponivel"
    },
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": "#consultor/recebimento",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-recebimento-a-mesma-nota-tem-dois-numeros.md",
      "guia:videos/roteiros/consultor-01-suprimentos.json"
     ],
     "id": "recebimento:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "recebimento",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/05_Manual_Recebimento_Timbrado.docx"
     ],
     "id": "recebimento:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Recebimento de mercadorias",
        "texto": "Quando o fornecedor entrega: a nota entra, o material é conferido e o sistema atualiza estoque e contas a pagar.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Localizar notas de recebimento, entender a conferência física e saber o que a finalização da nota provoca no estoque, no pedido de compra e no financeiro.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Ler o painel do recebimento",
        "onde": "`Recebimento > Dashboard Recebimento`",
        "intro": null,
        "passos": [
         {
          "texto": "Ver a fila de notas a conferir, os pedidos esperados e os cartões \"Recebido no período\" e \"Notas em aberto\".",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver os cartões \"Títulos a gerar\" e \"Parcelas a vencer\".",
          "nota": "\"Parcelas a vencer\" leva a Financeiro > Contas a Pagar.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Consultar notas de recebimento",
        "onde": "`Recebimento > Notas de Recebimento`",
        "intro": null,
        "passos": [
         {
          "texto": "Ler os cartões Total, Em Aberto, Finalizadas e Canceladas e trocar o filtro **Status** (abre em \"Em Aberto\").",
          "nota": "Uma nota finalizada só aparece depois de limpar o filtro. Os cartões seguem o filtro.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Reconhecer que a mesma nota tem **dois números**: \"NF-<número do fornecedor>\" na lista e \"NR-<número interno>\" na conferência, no pedido e no título.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir o menu `⋮` de uma nota em aberto.",
          "nota": "Opções Finalizar, Imprimir Etiquetas (só depois da conferência), Cancelar e Excluir.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber as origens de uma nota: gerada pelo pedido de compra, por XML ou avulsa.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Entender a conferência física",
        "onde": "menu `Recebimento > Aprovações` (é a fila de conferências)",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir a fila e ler os cartões (Aguardando conferência, Em conferência, Conferidas hoje) e as abas **sem iniciar**.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que o botão **Conferir** já inicia a conferência e que o responsável fica registrado na nota.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que a conferência registra a quantidade de cada item e só termina com **Concluir Conferência**.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Saber o que a finalização provoca",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Ler o aviso da finalização: \"movimenta estoque e gera títulos a pagar… não pode ser desfeita\".",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Depois de finalizada por outra pessoa, conferir o movimento \"Recebimento (NR)\" em `Estoque > Movimentos` e o título em `Financeiro > Contas a Pagar`.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Nova Nota de Recebimento",
          "nota": "Compras › Pedidos de Compra › ⋯ › Gerar Nota de Recebimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#recebimento.nova-nota"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#recebimento.nova-nota"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#recebimento.nova-nota"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da importação da nota fiscal à geração das contas a pagar.",
        "etapas": [
         "Importação da NF",
         "Conferência dos Produtos",
         "Validação das Divergências",
         "Finalização do Recebimento",
         "Entrada no Estoque",
         "Geração das Contas a Pagar"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: gerar a nota de recebimento do seu pedido de compra",
        "onde": "`Compras > Pedidos de Compra`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A nota de recebimento nasce do pedido de compra do checklist 05. **Não finalize** a nota: a finalização movimenta estoque e financeiro (veja o bloco \"Saber o que a finalização provoca\"). Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "No pedido de compra do checklist 05 (`Compras > Pedidos de Compra`), abrir o menu `⋯` e escolher **Gerar Nota de Recebimento**. Abre a página **Nova Nota de Recebimento** já preenchida a partir do pedido (**Empresa**, **Fornecedor**, **CFOP**, **Pedido de Compra (opcional)**, **Condição de Pagamento**, os itens e, no Resumo, a **Conta de Fluxo de Caixa**). Conferir e clicar em **Salvar** (ou em **Cancelar** para sair).",
          "nota": "Os outros campos podem ficar em branco: Projeto, Material de terceiro (cliente), Nº NF-e / NFS-e (\"deixe em branco para nota gerencial\"), Série, Data de Emissão, Natureza da Operação e Chave de Acesso NF-e (44 posições). O menu do pedido em aberto tem: Baixar PDF, Linha do tempo, Gerar Nota de Recebimento, Gerar Título a Pagar, Cancelar e Excluir. Depois, a coluna **NOTA DE RECEBIMENTO** da lista de pedidos mostra \"NR-0000xx\"; em `Recebimento > Notas de Recebimento` a nota aparece como \"NF-<número do fornecedor>\" e na fila de conferência como \"NR-<número interno>\": é a mesma nota.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       },
       {
        "tipo": "link",
        "material": "recebimento:checklist-inicial",
        "titulo": "Recebimento de mercadorias",
        "status": "disponivel",
        "url": "/checklists/estagiarios/06-recebimento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:recebimento",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Recebimento e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Compras > Pedidos de Compra`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Recebimento > Dashboard Recebimento`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `Recebimento > Notas de Recebimento`"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: menu `Recebimento > Aprovações` (é a fila de conferências)"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 1. Preparar seus dados: gerar a nota de recebimento do seu pedido de compra"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 2. Ler o painel do recebimento"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 3. Consultar notas de recebimento"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 4. Entender a conferência física"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 5. Saber o que a finalização provoca"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:recebimento",
        "total": 11,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Controlar entrada de mercadorias — importação da NF do fornecedor, conferência e integração com Estoque, Compras, Financeiro e Fiscal.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Valida a entrega do fornecedor. Atualiza estoque, gera contas a pagar e finaliza pedido de compra.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Compras.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Compras e Recebimento: solicitação, cotação, pedido e nota",
        "texto": "Compras › Solicitações de Compra, Sugestão de Compra, Cotações, Pedidos de Compra, Aprovações, Contratos de Entrega e Follow-up de Entregas. Recebimento › Notas de Recebimento e a fila de conferência (menu \"Aprovações\").",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-compras-solicitacoes-pedidos-e-recebimento.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#recebimento",
       "harness:conhecimento/produto/funcional/funcional-compras-solicitacoes-pedidos-e-recebimento.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "A nota de recebimento tem dois números",
        "texto": "No menu `⋯` do pedido de compra, **Gerar Nota de Recebimento** abre a página **Nova Nota de Recebimento** já preenchida a partir do pedido (Empresa, Fornecedor, CFOP, Pedido de Compra, Condição de Pagamento, itens e Conta de Fluxo de Caixa). A mesma nota aparece como \"NF-<número do fornecedor>\" na lista de Recebimento e como \"NR-<número interno>\" na conferência, no pedido de compra e no título. A lista de notas abre com Status \"Em Aberto\". A conferência física fica no menu como \"Aprovações\".",
        "confirmar": "Compras › Pedidos de Compra › `⋯` e Recebimento › Notas de Recebimento.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-recebimento-a-mesma-nota-tem-dois-numeros.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A cotação é opcional",
        "texto": "Da solicitação dá para ir direto ao pedido. Gerar Pedido de Compra abre o Novo Pedido para completar e salvar.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-01-suprimentos.json#04",
         "harness-id:regra-compras-gerar-pedido-de-compra-abre-o-novo-pedido"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A natureza da operação define o CFOP",
        "texto": "Na cotação, a Natureza da Operação (Consumo, Produção, Revenda ou Ativo) define o CFOP do pedido de compra.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-01-suprimentos.json#05",
         "harness-id:regra-compras-natureza-da-operacao-define-o-cfop"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Sem almoxarifado central, nada entra",
        "texto": "A entrada do recebimento vai para o almoxarifado central ativo. Sem ele, o sistema bloqueia.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-01-suprimentos.json#07",
         "harness-id:regra-estoque-almoxarifado-central-ativo-e-pre-requisito"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-recebimento-a-mesma-nota-tem-dois-numeros.md",
       "guia:videos/roteiros/consultor-01-suprimentos.json#04",
       "harness-id:regra-compras-gerar-pedido-de-compra-abre-o-novo-pedido",
       "guia:videos/roteiros/consultor-01-suprimentos.json#05",
       "harness-id:regra-compras-natureza-da-operacao-define-o-cfop",
       "guia:videos/roteiros/consultor-01-suprimentos.json#07",
       "harness-id:regra-estoque-almoxarifado-central-ativo-e-pre-requisito"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da importação da nota fiscal à geração das contas a pagar.",
        "etapas": [
         "Importação da NF",
         "Conferência dos Produtos",
         "Validação das Divergências",
         "Finalização do Recebimento",
         "Entrada no Estoque",
         "Geração das Contas a Pagar"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Preparar o recebimento: conferência e busca de notas",
        "onde": "`Recebimento > Configurações > Parâmetros de Recebimento` e `Recebimento > Distribuição DFe`",
        "intro": "Antes da primeira nota, ligue com o cliente só o que ele vai usar. Todos os parâmetros nascem desligados.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Receber o XML: DF-e ou arquivo",
        "onde": "`Recebimento > Aguardando manifestação` e `Recebimento > Notas de Recebimento > Importar XML`",
        "intro": "A nota do fornecedor chega pelo DF-e (PRO) ou por arquivo XML. Mostre os dois caminhos e como a nota se liga ao pedido de compra.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Nota a partir do pedido de compra",
        "onde": "`Compras > Pedidos de Compra > ⋯ > Gerar Nota de Recebimento`",
        "intro": "Sem XML em mãos, a nota nasce do próprio pedido. É o caminho conferido na tela e o mais usado no treinamento.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Entrega parcial: desdobro do pedido",
        "onde": "`Compras > Pedidos de Compra`",
        "intro": "Fornecedor que entrega em partes é comum. Mostre que o saldo não se perde: vira um pedido filho.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Conferência física e divergências",
        "onde": "fila de conferências: `Recebimento > Aprovações` (fluxo antigo) ou `Recebimento > Conferências` (gestora)",
        "intro": "Com a conferência ligada, alguém conta o que chegou antes da entrada. Use uma nota com dois itens para mostrar uma contagem igual e uma divergente.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Finalizar: estoque e título a pagar nascem",
        "onde": "`Recebimento > Notas de Recebimento > ⋮ > Finalizar`",
        "intro": "A finalização é o momento que muda o estoque e o financeiro. Faça com o cliente e confira os reflexos nos outros módulos.",
        "passos_total": 6,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Cancelamento e devolução ao fornecedor",
        "onde": "`Recebimento > Notas de Recebimento > ⋮`",
        "intro": "Feche mostrando como desfazer uma entrada errada e como devolver mercadoria. A NF-e de devolução só é transmitida com o responsável fiscal.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#recebimento",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Recebimento: roteiro prático com o cliente",
        "texto": "Ao final, o cliente viu uma nota de fornecedor entrar, ser vinculada ao pedido, conferida e finalizada, e viu nascer a entrada no estoque e o título a pagar. Ele sabe tratar entrega parcial, cancelar uma nota e gerar a devolução, e sabe o que o sistema recusa.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Preparar o recebimento: conferência e busca de notas",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "2. Receber o XML: DF-e ou arquivo",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "3. Nota a partir do pedido de compra",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "4. Entrega parcial: desdobro do pedido",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "5. Conferência física e divergências",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "6. Finalizar: estoque e título a pagar nascem",
          "nota": "6 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "7. Cancelamento e devolução ao fornecedor",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "link",
        "material": "recebimento:checklist-implantacao",
        "titulo": "Implantação de Recebimento: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-09-recebimento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente importação da NF-e, conferência, tratamento de divergências e finalização. Demonstre integração automática com Estoque, Compras, Financeiro e Fiscal.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento",
       "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Roteiro de Compras concluído: pelo menos dois pedidos de compra aprovados (um deles de 100 unidades, para a entrega parcial).",
          "nota": "**Confira:** `Compras > Pedidos de Compra`, status \"Em Aberto\" e sem alçada pendente. **Fonte:** REC-NR-007; trilha de estagiários 06.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "**Almoxarifado central ativo** em `Estoque > Locais` na empresa que recebe (é onde a nota dá entrada).",
          "nota": "**Confira:** a lista de locais. **Fonte:** fluxo antigo de suprimentos (pré-requisito); README de Suprimentos, S6.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "CFOPs de entrada com \"Gera Financeiro\" e \"Movimenta Estoque\" decididos com o contador; plano de contas e conta de fluxo no fornecedor ou na empresa.",
          "nota": "**Confira:** `Recebimento > Configurações > CFOP`. Sem plano de contas não nasce título. **Fonte:** REC C, etapa 1; REC-NR-016, REC-FIN-007.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Produtos comprados com unidade de estoque, **embalagem e fator**; unidades de medida com as siglas que os fornecedores usam no XML.",
          "nota": "**Confira:** abra dois produtos e a tela de unidades. **Fonte:** REC-FIN-001, REC-XML-007.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Para buscar notas na SEFAZ: Recebimento **PRO** e **certificado A1** da empresa enviado ao Flow. Sem PRO, use só a importação de XML por arquivo.",
          "nota": "**Confira:** `Minha Assinatura` e `Configurações > Certificados`. **Fonte:** README de Suprimentos, S4; REC-DFE-001, REC-DFE-009.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Decisões da ata: títulos pelo pedido ou pela nota; conferência física sim ou não, e se trava a finalização.",
          "nota": "**Confira:** a ata. **Fonte:** README de Suprimentos, S2 e S5; REC C, perguntas R6 e R10.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Para devolução: Faturamento com série de NF-e configurada.",
          "nota": "**Confira:** a série no Faturamento. **Fonte:** REC-DEV-001/002.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Uma nota entrou por XML (DF-e ou arquivo) e outra pelo pedido de compra, com os dois números (NF e NR) anotados.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "A entrega parcial criou o `PC-nnnn/2` com o saldo.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "A conferência registrou uma contagem igual e uma divergente.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "A finalização gerou a entrada \"Recebimento (NR)\" no almoxarifado central e o título a pagar com o documento NR.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Um título só por parcela, pela nota ou pelo pedido conforme a ata.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "O cliente viu o sistema recusar: XML repetido, quantidade acima do pedido, finalizar sem conferência e cancelar com título pago.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Importar NF de fornecedor",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
          ]
         },
         {
          "texto": "Conferir itens recebidos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
          ]
         },
         {
          "texto": "Registrar divergências ou avarias",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
          ]
         },
         {
          "texto": "Finalizar recebimento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
          ]
         },
         {
          "texto": "Compreender integração com Compras, Estoque, Financeiro e Fiscal",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento",
       "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Valida a entrega do fornecedor. Atualiza estoque, gera contas a pagar e finaliza pedido de compra.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#recebimento"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste. Nomeie os registros com \"TESTE FLUXO CONSULTOR\". Nota fiscal de devolução só é transmitida com o responsável fiscal do cliente.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "**Responder à SEFAZ** (manifestação) é fiscal e não se desfaz: faça só com o responsável fiscal e numa nota de teste.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "**Finalizar** não pode ser desfeito: movimenta estoque e gera títulos. O caminho de volta é cancelar com motivo, e só depois de estornar pagamentos.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "A mesma nota tem dois números: \"NF-<fornecedor>\" na lista e \"NR-<interno>\" na conferência, no pedido e no título. Anote os dois.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "A lista de notas abre filtrada em \"Em Aberto\": a nota finalizada some até limpar o filtro.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Iniciar a conferência trava a nota com o seu usuário; para destravar, use **Liberar** na fila.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Hoje o sistema ainda dá entrada com custo cheio (com IPI e ICMS-ST, sem descontar crédito), diferente da decisão de produto. Avise o cliente que confere custo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Não existe importador de notas antigas: as notas já recebidas no sistema anterior entram como saldo de estoque e título a pagar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Finalizar a nota de recebimento não pode ser desfeito.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-01-suprimentos.json#14"
          ]
         },
         {
          "texto": "O meio de pagamento da parcela não chega ao Pagar: informe de novo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-01-suprimentos.json#14"
          ]
         },
         {
          "texto": "A Sugestão de Compra só lista itens com estoque mínimo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-01-suprimentos.json#14"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-01-suprimentos.json#14"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Nome da fila de conferência: o fluxo antigo e a trilha de estagiários (conferidos na tela) usam `Recebimento > Aprovações`; a gestora usa `Recebimento > Conferências`, visível só com \"Usar Conferência Física\". Conferir o rótulo do menu.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Quantidade que entra no estoque com divergência: a regra oficial diz que entra a quantidade da **nota** (REC-CON-004, D-196); o da gestora indica que o código pode dar entrada na quantidade **conferida**. Conferir na tela com a nota de 8 de 10.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Custo da entrada: REC-FIN-004 diz custo sem o tributo recuperável no regime normal; o README de Suprimentos (S8) e o Estoque dizem que hoje entra cheio (WI #30480). Conferir o custo médio antes de explicar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Momento do desdobro do PC: REC-NR-009 diz que **salvar** a nota já desdobra; o checklist D de Compras descreve gerar a nota parcial **e finalizar**. Conferir quando o `PC-nnnn/2` aparece.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Nome da caixa do DF-e: a gestora usa \"Aguardando manifestação\"; a trilha de estagiários cita \"Notas pendentes\". Conferir o menu.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Conferência física como PRO: a gestora diz que, sem PRO, os parâmetros ficam inertes (D-198); o fluxo antigo trata só como parâmetro. Conferir a licença do cliente.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         },
         {
          "texto": "Não conferidos na tela pelo fluxo antigo: DF-e, importação de XML, divergência e avaria na conferência, cancelamento e devolução.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento",
       "guia:videos/roteiros/consultor-01-suprimentos.json#14"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "recebimento:video-consultor",
        "titulo": "Suprimentos: da solicitação ao pagamento",
        "status": "disponivel",
        "url": "/videos/consultor-01-suprimentos.mp4",
        "duracao_s": 203,
        "poster": "/videos/consultor-01-suprimentos.jpg",
        "legenda": "/videos/consultor-01-suprimentos.vtt",
        "resumo": "Cotação opcional, a natureza da operação que define o CFOP, a nota com dois números e a linha do tempo do pedido.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-01-suprimentos.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-01-suprimentos.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "recebimento:checklist-inicial",
        "titulo": "Recebimento de mercadorias",
        "status": "disponivel",
        "url": "/checklists/estagiarios/06-recebimento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#recebimento"
        ]
       },
       {
        "tipo": "link",
        "material": "recebimento:checklist-implantacao",
        "titulo": "Implantação de Recebimento: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-09-recebimento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como ir da solicitação de compra à nota de recebimento",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-criar-solicitacao-pedido-de-compra-e-nota-de-recebimento.md"
          ]
         },
         {
          "texto": "05 Manual Recebimento",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/05_Manual_Recebimento_Timbrado.docx"
          ]
         },
         {
          "texto": "01-notas-de-recebimento-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/recebimento/01-notas-de-recebimento-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "02-notas-pendentes-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/recebimento/02-notas-pendentes-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "03-controle-de-terceiros-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/recebimento/03-controle-de-terceiros-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "04-conferencias-e-inspecao",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/recebimento/04-conferencias-e-inspecao.docx"
          ]
         },
         {
          "texto": "05-configuracoes-de-recebimento",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/recebimento/05-configuracoes-de-recebimento.docx"
          ]
         },
         {
          "texto": "06-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/recebimento/06-paineis-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-criar-solicitacao-pedido-de-compra-e-nota-de-recebimento.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/05_Manual_Recebimento_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/recebimento/01-notas-de-recebimento-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/recebimento/02-notas-pendentes-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/recebimento/03-controle-de-terceiros-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/recebimento/04-conferencias-e-inspecao.docx",
         "harness:conhecimento/Roteiros Treinamento/recebimento/05-configuracoes-de-recebimento.docx",
         "harness:conhecimento/Roteiros Treinamento/recebimento/06-paineis-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#recebimento",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-recebimento",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-criar-solicitacao-pedido-de-compra-e-nota-de-recebimento.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/05_Manual_Recebimento_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/recebimento/01-notas-de-recebimento-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/recebimento/02-notas-pendentes-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/recebimento/03-controle-de-terceiros-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/recebimento/04-conferencias-e-inspecao.docx",
       "harness:conhecimento/Roteiros Treinamento/recebimento/05-configuracoes-de-recebimento.docx",
       "harness:conhecimento/Roteiros Treinamento/recebimento/06-paineis-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "estoque",
   "ordem": 7,
   "titulo": "Estoque",
   "subtitulo": "Visão geral, saldo por local, extrato e tipos de movimento.",
   "cor": "#455a64",
   "icone": "estoque",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#estoque",
    "guia:scripts/dados-checklists-estagiarios.mjs#estoque",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
   ],
   "materiais": [
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "estoque:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/06_Manual_Estoque_Timbrado.docx"
     ],
     "id": "estoque:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": "/checklists/estagiarios/07-estoque.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
     ],
     "id": "estoque:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Estoque: saldo e movimentos",
     "status": "disponivel"
    },
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": "#inicial/estoque",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#estoque.novo-movimento",
      "guia:videos/roteiros/consultor-04-estoque.json"
     ],
     "id": "estoque:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-10-estoque.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
     ],
     "id": "estoque:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Estoque: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "estoque",
     "duracao_s": 183,
     "url": "/videos/consultor-04-estoque.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-04-estoque.json"
     ],
     "id": "estoque:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Estoque: movimento, reserva e inventário",
     "status": "disponivel"
    },
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": "#consultor/estoque",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md",
      "harness:conhecimento/produto/regras-negocio/regra-estoque-emprestimo-devolucao-parcial-e-total.md",
      "harness:conhecimento/produto/regras-negocio/regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa.md",
      "harness:conhecimento/produto/regras-negocio/regra-estoque-saldo-nasce-de-movimentos.md",
      "harness:conhecimento/produto/regras-negocio/regra-estoque-transferencia-pendente-reserva-o-disponivel.md",
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-requisitos.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.md",
      "guia:videos/roteiros/consultor-04-estoque.json"
     ],
     "id": "estoque:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "estoque",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/06_Manual_Estoque_Timbrado.docx"
     ],
     "id": "estoque:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Estoque: saldo e movimentos",
        "texto": "O saldo nunca é digitado: ele é a soma das entradas e saídas que vêm de compras, produção, vendas e ajustes.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Consultar quanto existe de cada material, em qual local e variação (cor e medidas), e rastrear de onde veio cada movimento.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Ler a visão geral",
        "onde": "`Estoque > Visão geral`",
        "intro": null,
        "passos": [
         {
          "texto": "Escolher empresa, obra e período (Hoje, 7, 30 ou 90 dias).",
          "nota": "Os indicadores (valor em estoque, saúde do estoque, necessidade de reposição) são recalculados.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler o bloco \"Pendências de hoje\": saldos negativos, empréstimos vencidos, inventários e encerramentos.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Consultar o saldo de um material",
        "onde": "`Estoque > Saldo`",
        "intro": null,
        "passos": [
         {
          "texto": "Pesquisar pelo código ou descrição do produto.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Achar a linha certa: cada produto aparece uma vez por **local** e por **variação** (cor + comprimento).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler SALDO, RESERVADA, CUSTO MÉDIO e VALOR TOTAL.",
          "nota": "O número da coluna RESERVADA abre as reservas daquela posição.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Usar `Mais filtros` para filtrar por obra, propriedade (Própria/Cliente) e atributos físicos.",
          "nota": "Os filtros ficam salvos no seu navegador; use \"Limpar filtros\" se algo \"sumir\".",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Ver o extrato do produto",
        "onde": "clique no código do produto na tela Saldo",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir a aba **Posições** e ver o saldo por local.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir a aba **Histórico** e ler data, número, tipo, quantidade e motivo de cada movimento.",
          "nota": "Você vê de onde veio o material (ex.: \"Entrada de produto acabado por conclusão da OP...\").",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Rastrear movimentos",
        "onde": "`Estoque > Movimentos`",
        "intro": null,
        "passos": [
         {
          "texto": "Filtrar por produto, local ou data.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Reconhecer as origens: Recebimento (NR), Requisição (baixa em OP), OP - Conclusão e Estorno.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir um movimento e ler origem, destino e itens, **sem clicar em Estornar**.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "6. Conhecer os tipos de movimento (sem salvar)",
        "onde": "`+ Novo Movimento`",
        "intro": null,
        "passos": [
         {
          "texto": "Ler a descrição dos 8 tipos: Entrada manual, Ajuste positivo, Ajuste negativo, Transferência, Requisição, Devolução de uso, Empréstimo e Descarte.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Sair com **Cancelar (Esc)**.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Novo Movimento",
          "nota": "Estoque › Movimentos › + Novo Movimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#estoque.novo-movimento"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#estoque.novo-movimento"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#estoque.novo-movimento"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da entrada de mercadorias à reposição automática.",
        "etapas": [
         "Entrada de Mercadorias",
         "Controle de Saldo",
         "Reserva de Materiais",
         "Movimentações",
         "Consumo pela Produção ou Faturamento",
         "Reposição Automática"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#estoque"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: dar entrada no seu produto",
        "onde": "`Estoque > Movimentos > + Novo Movimento`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. O saldo nunca é digitado: ele nasce de movimentos. Sem uma entrada, o seu produto aparece com saldo zero. Precisa existir um **almoxarifado central ativo** em `Estoque > Locais`. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Em **Novo Movimento**, escolher o **Tipo** \"Entrada manual\", a **Empresa** (obrigatória, não vem preenchida) e o **Local de destino**; na linha do item, o **Produto**, a **Quantidade** e o **Custo unit.**. Salvar com **Salvar** (atalho **Ctrl+S**; há também **Salvar e novo**).",
          "nota": "Tipos disponíveis: Entrada manual, Ajuste positivo, Ajuste negativo, Transferência, Requisição, Devolução de uso, Empréstimo e Descarte. Movimento numerado na lista; saldo e custo médio do produto atualizados.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir `Estoque > Saldo`, pesquisar o seu produto no campo \"Buscar na lista: produto, código, local...\" e conferir o **Saldo** e o **Valor total**.",
          "nota": "O saldo é igual à quantidade que você deu entrada.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "link",
        "material": "estoque:checklist-inicial",
        "titulo": "Estoque: saldo e movimentos",
        "status": "disponivel",
        "url": "/checklists/estagiarios/07-estoque.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:estoque",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Estoque e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Estoque > Movimentos > + Novo Movimento`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Estoque > Visão geral`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `Estoque > Saldo`"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: clique no código do produto na tela Saldo"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: `Estoque > Movimentos`"
         },
         {
          "id": "acessar-6",
          "texto": "Sei acessar: `+ Novo Movimento`"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 1. Preparar seus dados: dar entrada no seu produto"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 2. Ler a visão geral"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 3. Consultar o saldo de um material"
         },
         {
          "id": "executei-10",
          "texto": "Executei: 4. Ver o extrato do produto"
         },
         {
          "id": "executei-11",
          "texto": "Executei: 5. Rastrear movimentos"
         },
         {
          "id": "executei-12",
          "texto": "Executei: 6. Conhecer os tipos de movimento (sem salvar)"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:estoque",
        "total": 14,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Controlar movimentação de materiais. No Faktory Flow, o estoque é controlado por características (cor, largura, altura, comprimento), ideal para esquadrias.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Módulo central. Integra-se a Compras, Recebimento, Produção, Vendas e Faturamento. Saldos atualizados automaticamente.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após configuração dos cadastros de produtos e antes de Compras, Produção e Recebimento.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Estoque: movimentos, saldo, transferência, inventário e empréstimo",
        "texto": "Estoque › Visão geral (bloco Pendências de hoje), Saldo, Movimentos, Transferências, Inventário (com Aprovações › Inventários), Empréstimos, Reposição, Locais, Encerramentos e Demonstrativos. Compras › Sugestão de Compra recebe a falta líquida da reposição.",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-estoque-movimentos-saldo-transferencia-inventario.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#estoque",
       "harness:conhecimento/produto/funcional/funcional-estoque-movimentos-saldo-transferencia-inventario.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Um almoxarifado central ativo é pré-requisito de produção e de nota",
        "texto": "Sem um **almoxarifado central ativo** (Estoque › Locais) o sistema bloqueia a conclusão da ordem de produção (\"Conclusão bloqueada\"), a entrada do produto acabado e a finalização da nota fiscal. Um projeto com local de estoque próprio deve ter esse local ativo.",
        "confirmar": "Estoque › Locais.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Empréstimo entre locais e devoluções",
        "texto": "O **Empréstimo** sai do local de origem com uma data prevista de devolução e aparece como aberto. A devolução pode ser parcial (progresso em %) e depois total; devolver mais do que foi emprestado é recusado. Ao devolver tudo o valor do material volta ao que era antes, nos dois locais. Um empréstimo passado do prazo aparece como vencido.",
        "confirmar": "Estoque › Empréstimos.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-emprestimo-devolucao-parcial-e-total.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Inventário congela o local e exige outra pessoa para recontar e aprovar",
        "texto": "Iniciar um inventário fotografa o saldo e **congela o local**: movimentos e um segundo inventário no mesmo local são recusados. A contagem é cega. A segunda contagem tem de ser feita por **outra pessoa** (\"deve ser feita por outra pessoa\"), e a aprovação do inventário também, regra que vale até para Super Usuário (o botão Aprovar fica desabilitado). Cancelar o inventário com motivo libera o local sem gerar ajuste. Os parâmetros \"bloquear saída que invade reserva\" e \"empenhar material de OP\" não existem na versão 1.22.12.",
        "confirmar": "Estoque › Inventário e Estoque › Aprovações › Inventários.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "O saldo de estoque nunca é digitado: nasce de movimentos",
        "texto": "O saldo vem de movimentos: **Entrada manual**, **Ajuste positivo**, **Ajuste negativo**, **Transferência**, **Requisição**, **Devolução de uso**, **Empréstimo** e **Descarte** (os tipos do Novo Movimento), além das entradas de recebimento e de produto acabado. No Novo Movimento, **Empresa** é obrigatória e não vem preenchida, o campo é **Local de destino** e a coluna do valor é **Custo unit.**. Salvar com **Salvar** (atalho Ctrl+S) ou **Salvar e novo**. Um movimento pode ser estornado, o que cria o movimento \"Estorno\" e marca o original como Estornado.",
        "confirmar": "Estoque › Movimentos › + Novo Movimento e Estoque › Saldo.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-saldo-nasce-de-movimentos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Transferência pendente reserva a quantidade",
        "texto": "Uma transferência em rascunho (número **TRF-**) **não** baixa o saldo da origem, mas reserva a quantidade: o **disponível** desce enquanto o saldo continua igual. O número da coluna **Reservada** do Saldo abre a reserva. Origem igual ao destino, quantidade zero ou negativa e transferência sem produto são recusados. Confirmar baixa a origem e sobe o destino pelo mesmo valor e consome a reserva; excluir a transferência pendente libera a reserva. Depois de confirmada, os botões Confirmar e Excluir somem.",
        "confirmar": "Estoque › Transferências e Estoque › Saldo (a coluna Reservada vem oculta por padrão).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-transferencia-pendente-reserva-o-disponivel.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Finalizar NF: o que precisa existir",
        "texto": "**Finalizar NF** pede confirmação (\"a nota ficará disponível apenas para visualização\") e deixa a nota **Finalizada** sem transmitir. Precisa de um **almoxarifado central ativo** (ou de local de estoque ativo no projeto); sem isso o sistema responde \"Não foi possível resolver o local de estoque…\" ou \"O projeto … não tem local de estoque ativo\". Se o produto não tem NCM com CST de PIS/COFINS de saída, a nota mostra o quadro \"Impostos não calculados no item\" com o motivo, mas ainda pode ser salva.",
        "confirmar": "Faturamento › Notas Fiscais › `⋯` › Finalizar NF; faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" na nota.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-requisitos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Marcar produzido gera a entrada do produto acabado",
        "texto": "Em `Mais ações › Marcar produzido`, a OP vai para **Produzido** e nasce o movimento \"Entrada de produto acabado (OP)\" no almoxarifado central, com a quantidade e o custo da OP. O custo da OP mostra estimado e realizado (materiais e mão de obra). Um apontamento de tempo que ficou aberto continua aberto mesmo com a OP produzida, e \"Cancelar OP\" continua habilitado numa OP Produzida.",
        "confirmar": "Produção › Ordens de produção, Estoque › Movimentos e `Mais ações › Custo da OP`.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.md"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md",
       "harness:conhecimento/produto/regras-negocio/regra-estoque-emprestimo-devolucao-parcial-e-total.md",
       "harness:conhecimento/produto/regras-negocio/regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa.md",
       "harness:conhecimento/produto/regras-negocio/regra-estoque-saldo-nasce-de-movimentos.md",
       "harness:conhecimento/produto/regras-negocio/regra-estoque-transferencia-pendente-reserva-o-disponivel.md",
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-requisitos.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.md"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da entrada de mercadorias à reposição automática.",
        "etapas": [
         "Entrada de Mercadorias",
         "Controle de Saldo",
         "Reserva de Materiais",
         "Movimentações",
         "Consumo pela Produção ou Faturamento",
         "Reposição Automática"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Locais e almoxarifado central",
        "onde": "`Estoque > Locais` e `Estoque > Configurações > Parâmetros de Estoque`",
        "intro": "Tudo no estoque acontece num local. Comece garantindo o almoxarifado central em cada empresa, porque é nele que a nota de recebimento e a produção dão entrada.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Saldo inicial na data de corte",
        "onde": "`Estoque > Saldo > Mais > Importar saldo`",
        "intro": "O saldo de abertura entra por planilha, antes de qualquer compra ou nota no Flow. Faça com um arquivo de teste de poucas linhas.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Entradas e saídas manuais",
        "onde": "`Estoque > Movimentos > + Novo Movimento`",
        "intro": "Os movimentos manuais cobrem o que não vem de documento: entrada avulsa, ajuste, descarte. Mostre também que movimento não se edita: corrige-se por estorno.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Entradas e saídas automáticas",
        "onde": "`Estoque > Movimentos`",
        "intro": "A maior parte do estoque se move sozinha, pelos documentos dos outros módulos. Mostre ao cliente onde ver cada origem.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Saldo e extrato",
        "onde": "`Estoque > Saldo` e o código do produto",
        "intro": "É a tela que o cliente mais vai consultar. Ensine a achar a linha certa e a ler de onde veio cada quantidade.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Transferência e reserva",
        "onde": "`Estoque > Transferências` e coluna `Reservada` do Saldo",
        "intro": "A transferência mostra a diferença entre saldo e disponível: enquanto pendente, ela reserva a quantidade na origem.",
        "passos_total": 7,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Inventário com ajuste",
        "onde": "`Estoque > Inventário` e `Estoque > Aprovações > Inventários`",
        "intro": "O inventário confere o físico contra o sistema e ajusta a diferença. Ele congela o local e exige pessoas diferentes para contar e aprovar.",
        "passos_total": 6,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Empréstimo entre locais (se o cliente usa)",
        "onde": "`Estoque > Empréstimos`",
        "intro": "Para quem empresta material entre locais ou obras com data de volta. Pule o bloco se o cliente não usa.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "9. Reposição e balanço final",
        "onde": "`Estoque > Reposição`, `Compras > Sugestão de Compra` e `Estoque > Reservas órfãs`",
        "intro": "Feche provando que tudo o que foi feito fecha no saldo e ligando o estoque ao Compras pela reposição.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#estoque",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Estoque: roteiro prático com o cliente",
        "texto": "Ao final, o cliente sabe que o saldo nunca é digitado: ele nasce de movimentos, e cada um deixa rastro no extrato. Ele viu o saldo inicial entrar, as travas de saldo, reserva e inventário funcionarem e o balanço do produto fechar em quantidade e valor.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Locais e almoxarifado central",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "2. Saldo inicial na data de corte",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "3. Entradas e saídas manuais",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "4. Entradas e saídas automáticas",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "5. Saldo e extrato",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "6. Transferência e reserva",
          "nota": "7 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "7. Inventário com ajuste",
          "nota": "6 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "8. Empréstimo entre locais (se o cliente usa)",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "9. Reposição e balanço final",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "link",
        "material": "estoque:checklist-implantacao",
        "titulo": "Implantação de Estoque: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-10-estoque.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente saldo por características, movimentações, reservas, transferências, inventário e reposição automática. Demonstre consulta de saldos e integração com a operação.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque",
       "guia:db/migrations/002_modulos_iniciais.sql#estoque"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Fundação concluída: **tipo de categoria** final, **unidade de estoque** e **fator de embalagem** de cada produto conferidos, e cores cadastradas.",
          "nota": "**Confira:** amostra de produtos. Depois do saldo, o tipo da categoria trava. **Fonte:** README de Suprimentos, ordem 3; CAD-CAT-004, EST-SLD-003.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Produto de teste de **uso controlado em estoque**, com **Origem da Mercadoria** preenchida e preço de custo no cadastro.",
          "nota": "**Confira:** o cadastro do produto. Sem origem, o salvar avisa só no fim; sem custo, a sobra do inventário trava a aprovação. **Fonte:** fluxo antigo de estoque (pré-requisito e atenção); EST-INV-008.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Três usuários de teste: quem cria e quem confirma a transferência; dois contadores e um aprovador do inventário.",
          "nota": "**Confira:** `Segurança > Perfis de Acesso`. A regra vale até para Super Usuário. **Fonte:** README de Suprimentos, S9; EST-INV-004 a 007.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Data de corte combinada com o cliente, depois da contagem física e das últimas notas do sistema antigo, e a planilha de saldo com custo aceito pela contabilidade.",
          "nota": "**Confira:** a ata. **Fonte:** README de Suprimentos, S7; EST C, etapa 4.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Saber se o cliente usa inventário (PRO), localizações (PRO) e empréstimo, e quem pode retirar material reservado.",
          "nota": "**Confira:** `Minha Assinatura` e a ata. **Fonte:** EST C, etapas 3 e 5; EST-MOV-010.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Cada empresa tem almoxarifado central ativo, e o saldo inicial entrou na data de corte conferido contra a planilha.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Entrada manual, ajustes e estorno mudaram o saldo e ficaram no extrato.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "A entrada da nota de recebimento apareceu como \"Recebimento (NR)\" no almoxarifado central.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "A transferência pendente reservou o disponível e a confirmada moveu o saldo entre os locais.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "O inventário congelou o local, exigiu outras pessoas e gerou o ajuste da diferença.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "O balanço do produto fechou em quantidade e valor e não sobraram reservas órfãs.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Consultar saldos dos produtos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#estoque"
          ]
         },
         {
          "texto": "Realizar movimentações e transferências",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#estoque"
          ]
         },
         {
          "texto": "Entender reservas de materiais",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#estoque"
          ]
         },
         {
          "texto": "Executar inventários e ajustes",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#estoque"
          ]
         },
         {
          "texto": "Compreender integração com Compras, Recebimento, Produção, Vendas e Faturamento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#estoque"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque",
       "guia:db/migrations/002_modulos_iniciais.sql#estoque"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Módulo central. Integra-se a Compras, Recebimento, Produção, Vendas e Faturamento. Saldos atualizados automaticamente.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#estoque"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#estoque"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste. Nomeie os registros com \"TESTE FLUXO CONSULTOR\" e não deixe inventário aberto em empresa de produção: ele congela o local.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "**Ctrl+S salva** o movimento. **Importar saldo**, **Estornar**, **Aprovar inventário** e aprovar **Encerramentos** alteram o estoque e não têm desfazer.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Nada se lança antes do saldo inicial nas mesmas variações: o retroativo é recusado e o custo médio se perde.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "A 2ª contagem e a aprovação do inventário exigem **outra pessoa**, até para Super Usuário: crie os usuários antes.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Transferência e Empréstimo existem como tipo de movimento **e** como telas próprias: use um só caminho por teste.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Não existe item \"Reservas\" no menu: a reserva está na coluna RESERVADA do Saldo (vem oculta por padrão) e na aba Reservas do produto.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Hoje o sistema ainda dá entrada da nota com custo cheio (com IPI e ICMS-ST, sem descontar crédito). Avise o cliente que confere custo médio.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Os avisos na tela não somem sozinhos e podem cobrir botões: feche-os antes de continuar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Sem almoxarifado central ativo, recebimento, produção e nota travam.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-04-estoque.json#14"
          ]
         },
         {
          "texto": "A segunda contagem do inventário diz prossiga, mas recusa o mesmo usuário.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-04-estoque.json#14"
          ]
         },
         {
          "texto": "Material reservado ainda pode sair: confira o disponível.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-04-estoque.json#14"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-04-estoque.json#14"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Saída sobre material reservado: o fluxo antigo (conferido na tela, v1.22.12) viu a requisição passar sobre 3 unidades reservadas, deixando o disponível negativo; a gestora diz que retirar reserva alheia exige a permissão a permissão de retirar material reservado e mostra mensagem de recusa (EST-MOV-010, D-285). Conferir antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Parâmetros de Estoque: o fluxo antigo diz que na v1.22.12 só existe \"bloquear saída sem saldo\"; a gestora lista também \"Permitir movimento com data passada\", \"Dias máximos para movimento retroativo\", \"Usar localizações por local\", alerta de fator e retalho mínimo. Conferir a tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Caminhos de menu: o fluxo antigo usa `Estoque > Locais` e `Estoque > Inventário`; a gestora usa `Estoque > Configurações > Locais` e `Estoque > Inventários`. Conferir os rótulos.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Extrato da transferência: o fluxo antigo esperava saída e entrada com o mesmo número TRF-, mas viu um movimento único com origem e destino. Conferir como aparece antes de explicar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Inventário como PRO: a gestora marca inventário e localizações como PRO; o fluxo antigo executou o inventário sem citar licença. Conferir a assinatura do cliente.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Custo da entrada pela nota: hoje entra com IPI e ICMS-ST e sem crédito (EST-SLD-004, README S8), o que diverge das decisões D-199/D-465 (WI #30480). Conferir o custo médio depois da NR.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         },
         {
          "texto": "Não conferidos na tela: importação de saldo inicial, ajustes positivo e negativo, mês encerrado, auditoria e aprovação do inventário, regra criar × confirmar da transferência e Reservas órfãs.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque",
       "guia:videos/roteiros/consultor-04-estoque.json#14"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "estoque:video-consultor",
        "titulo": "Estoque: movimento, reserva e inventário",
        "status": "disponivel",
        "url": "/videos/consultor-04-estoque.mp4",
        "duracao_s": 183,
        "poster": "/videos/consultor-04-estoque.jpg",
        "legenda": "/videos/consultor-04-estoque.vtt",
        "resumo": "Movimentos, transferência, reserva, inventário e empréstimo.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-04-estoque.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-04-estoque.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "estoque:checklist-inicial",
        "titulo": "Estoque: saldo e movimentos",
        "status": "disponivel",
        "url": "/checklists/estagiarios/07-estoque.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#estoque"
        ]
       },
       {
        "tipo": "link",
        "material": "estoque:checklist-implantacao",
        "titulo": "Implantação de Estoque: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-10-estoque.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como dar entrada manual no estoque",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-dar-entrada-manual-no-estoque.md"
          ]
         },
         {
          "texto": "06 Manual Estoque",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/06_Manual_Estoque_Timbrado.docx"
          ]
         },
         {
          "texto": "01-movimentos-de-estoque-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/01-movimentos-de-estoque-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "02-transferencias-de-estoque-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/02-transferencias-de-estoque-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "03-inventarios-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/03-inventarios-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "04-emprestimos-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/04-emprestimos-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "05-encerramentos-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/05-encerramentos-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "06-reposicao-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/06-reposicao-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "07-visao-geral-e-saldos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/07-visao-geral-e-saldos.docx"
          ]
         },
         {
          "texto": "08-locais-localizacoes-e-parametros",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/08-locais-localizacoes-e-parametros.docx"
          ]
         },
         {
          "texto": "09-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/estoque/09-paineis-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-dar-entrada-manual-no-estoque.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/06_Manual_Estoque_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/01-movimentos-de-estoque-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/02-transferencias-de-estoque-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/03-inventarios-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/04-emprestimos-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/05-encerramentos-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/06-reposicao-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/07-visao-geral-e-saldos.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/08-locais-localizacoes-e-parametros.docx",
         "harness:conhecimento/Roteiros Treinamento/estoque/09-paineis-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#estoque",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-estoque",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-dar-entrada-manual-no-estoque.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/06_Manual_Estoque_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/01-movimentos-de-estoque-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/02-transferencias-de-estoque-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/03-inventarios-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/04-emprestimos-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/05-encerramentos-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/06-reposicao-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/07-visao-geral-e-saldos.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/08-locais-localizacoes-e-parametros.docx",
       "harness:conhecimento/Roteiros Treinamento/estoque/09-paineis-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "producao",
   "ordem": 8,
   "titulo": "Produção",
   "subtitulo": "Ordem de produção, painéis, alertas e reflexo no estoque.",
   "cor": "#ef6c00",
   "icone": "producao",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#producao",
    "guia:scripts/dados-checklists-estagiarios.mjs#producao",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
   ],
   "materiais": [
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "producao:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/07_Manual_Producao_Timbrado.docx"
     ],
     "id": "producao:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": "/checklists/estagiarios/08-producao.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#producao"
     ],
     "id": "producao:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Produção: ordens e apontamentos",
     "status": "disponivel"
    },
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": "#inicial/producao",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#producao.nova-op",
      "guia:videos/roteiros/consultor-05-producao.json"
     ],
     "id": "producao:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-11-producao.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
     ],
     "id": "producao:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Produção: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "producao",
     "duracao_s": 173,
     "url": "/videos/consultor-05-producao.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-05-producao.json"
     ],
     "id": "producao:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Produção: da estrutura ao produto acabado",
     "status": "disponivel"
    },
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": "#consultor/producao",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-item-parametrico-da-estrutura-exige-cor.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.md",
      "harness:conhecimento/produto/regras-negocio/regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.md",
      "guia:videos/roteiros/consultor-05-producao.json"
     ],
     "id": "producao:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "producao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/07_Manual_Producao_Timbrado.docx"
     ],
     "id": "producao:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Produção: ordens e apontamentos",
        "texto": "A fábrica: a ordem de produção (OP) nasce do pedido ou da obra, consome material do estoque e entrega o produto acabado.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Consultar ordens de produção, entender status e alertas, acompanhar o chão de fábrica e ver como a produção aparece no estoque — sem apontar nem alterar OPs.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#producao"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Ler a visão geral",
        "onde": "`Produção > Visão geral`",
        "intro": null,
        "passos": [
         {
          "texto": "Ler Ritmo do dia, OPs bloqueadas por material e a lista \"Insumos que mais travam\".",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver Obras em produção, Fila de entrada, Funil de OPs por etapa e OPs em risco.",
          "nota": "A tela se atualiza sozinha a cada 3 minutos (\"Atualizar agora\" força).",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Consultar ordens de produção",
        "onde": "`Produção > Ordens de produção`",
        "intro": null,
        "passos": [
         {
          "texto": "Filtrar por projeto, tipo de operação (Fabricação, Corte, Beneficiamento) e status (Em aberto, Em execução, Pausada, Produzido, Cancelada).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Passar o mouse sobre os selos de alerta: Conclusão bloqueada, Conclusão travada, Material não baixado, Estoque não creditado.",
          "nota": "O texto explica a causa (ex.: obra sem local de estoque ativo).",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir uma OP em execução pelo **olho (Visualizar OP)** e ler número, produto, projeto, pedido de venda, processo, quantidade e status.",
          "nota": "Abre um painel \"somente leitura\".",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Ver os detalhes da OP pelo menu",
        "onde": "`Mais ações` da linha da OP",
        "intro": "A OP não tem abas: cada detalhe abre por um item do menu.",
        "passos": [
         {
          "texto": "Abrir **Etapas de execução da OP** e ler o processo e as etapas (ex.: usinagem → montagem → embalagem). Feche sem salvar.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir **Apontamentos** e ler quem apontou cada etapa, início e fim. Não use \"Iniciar\".",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir **Materiais necessários** e ver as requisições da OP.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir **Linha do tempo** (planejado × real por etapa) e **Custo da OP** (estimado × realizado).",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Acompanhar o chão de fábrica",
        "onde": "`Produção > Painel de fábrica`",
        "intro": null,
        "passos": [
         {
          "texto": "Alternar as visões **Cards**, **Lista** e **Timeline** e ler os contadores Ordens, No prazo e Atrasadas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em cada card, ler a etapa atual, as unidades e o % de etapas, **sem clicar em \"Apontar\"**.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "6. Entender de onde vêm as OPs",
        "onde": "`Produção > Integração de Produção`",
        "intro": null,
        "passos": [
         {
          "texto": "Abrir uma integração processada e ler o resumo.",
          "nota": "Ex.: \"Gerou 1 OP de montagem · 13 OPs de corte (1 por perfil) · 38 requisições de material\", a partir das esquadrias de uma obra.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "7. Ver a produção no estoque",
        "onde": "`Estoque > Movimentos`",
        "intro": null,
        "passos": [
         {
          "texto": "Encontrar um movimento \"Baixa de componente em OP\" (origem Requisição).",
          "nota": "É o material consumido pela OP.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Encontrar um movimento \"Entrada de produto acabado (OP)\" (origem OP - Conclusão).",
          "nota": "É o produto pronto entrando no estoque quando a OP é concluída.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#producao"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Nova Ordem de produção",
          "nota": "Produção › Ordens de produção › Nova OP",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#producao.nova-op"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#producao.nova-op"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#producao.nova-op"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Do pedido aprovado à liberação do produto finalizado.",
        "etapas": [
         "Pedido de Venda",
         "Ordem de Produção",
         "Planejamento",
         "Separação de Materiais",
         "Produção",
         "Apontamento das Etapas",
         "Conclusão da Ordem",
         "Liberação para Instalação ou Expedição"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#producao"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: abrir uma ordem de produção",
        "onde": "`Produção > Ordens de produção > Nova OP`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A OP precisa de um produto (checklist 02); se o produto tiver **estrutura de produto** (cadastrada por um consultor), as requisições de material nascem sozinhas ao salvar. Só abra a OP: apontar, baixar material e concluir é trabalho do chão de fábrica e do consultor. Se faltar permissão ou cadastro-base (botão que não aparece, processo, linha de produção, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "No menu de módulos (grade no canto superior esquerdo), abrir **Produção** (abre em Ordens de produção) e clicar em **Nova OP**, no topo à direita.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Deixar o **Número da OP** vazio (o sistema numera), as datas vazias e manter o **Tipo de operação** \"Fabricação\" e a **Linha de produção** como vieram.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em **Produto**, digitar parte do nome e escolher o seu produto. No diálogo \"Dados do Item\", preencher só o que quiser e clicar em **Aplicar**.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Escolher a **Empresa** (obrigatória, apesar da dica de que herda do pedido) e informar a **Quantidade** (ex.: 2). Opcional: escolher o seu **Pedido de venda** e o **Item do pedido** (copia produto, cor e medidas, mas não a quantidade).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Clicar em **Salvar**, no rodapé. Não use Esc: ele fecha o painel e perde o formulário.",
          "nota": "Mensagem \"Registro salvo com sucesso!\"; a lista ganha uma linha OP-0000NN \"Em aberto\". Em tela estreita a lista mostra só \"#id\": use tela larga. Produto sem estrutura avisa \"OP sem requisições da estrutura\": é esperado no treino.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "link",
        "material": "producao:checklist-inicial",
        "titulo": "Produção: ordens e apontamentos",
        "status": "disponivel",
        "url": "/checklists/estagiarios/08-producao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#producao"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:producao",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Produção e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Produção > Ordens de produção > Nova OP`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Produção > Visão geral`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `Produção > Ordens de produção`"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: `Mais ações` da linha da OP"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: `Produção > Painel de fábrica`"
         },
         {
          "id": "acessar-6",
          "texto": "Sei acessar: `Produção > Integração de Produção`"
         },
         {
          "id": "acessar-7",
          "texto": "Sei acessar: `Estoque > Movimentos`"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 1. Preparar seus dados: abrir uma ordem de produção"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 2. Ler a visão geral"
         },
         {
          "id": "executei-10",
          "texto": "Executei: 3. Consultar ordens de produção"
         },
         {
          "id": "executei-11",
          "texto": "Executei: 4. Ver os detalhes da OP pelo menu"
         },
         {
          "id": "executei-12",
          "texto": "Executei: 5. Acompanhar o chão de fábrica"
         },
         {
          "id": "executei-13",
          "texto": "Executei: 6. Entender de onde vêm as OPs"
         },
         {
          "id": "executei-14",
          "texto": "Executei: 7. Ver a produção no estoque"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#producao"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:producao",
        "total": 16,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Transformar pedidos de venda em ordens de produção, organizando planejamento, consumo de materiais e etapas produtivas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Recebe pedidos aprovados de Vendas. Controla fabricação, materiais e custos.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Vendas e Estoque.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Produção: ordens de produção, requisições, apontamento e separação",
        "texto": "Produção › Ordens de produção (botão **Nova OP**), Separação de materiais, Painel de fábrica e Configurações (etapas, processos, linhas e estrutura de produto). Menu `⋯` da OP: Materiais necessários, Etapas de execução da OP, Apontamentos, Custo da OP, Linha do tempo e Mais ações (Marcar produzido, Cancelar OP).",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-producao-ordens-de-producao-e-separacao.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#producao",
       "harness:conhecimento/produto/funcional/funcional-producao-ordens-de-producao-e-separacao.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Um almoxarifado central ativo é pré-requisito de produção e de nota",
        "texto": "Sem um **almoxarifado central ativo** (Estoque › Locais) o sistema bloqueia a conclusão da ordem de produção (\"Conclusão bloqueada\"), a entrada do produto acabado e a finalização da nota fiscal. Um projeto com local de estoque próprio deve ter esse local ativo.",
        "confirmar": "Estoque › Locais.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Item paramétrico da estrutura exige cor",
        "texto": "Ao salvar a estrutura de produto, um item de material paramétrico (perfil, chapa) sem **cor** é recusado com \"Selecione a cor do produto — obrigatória para este tipo de material\". A mensagem cita um identificador interno em vez do código do item. Na entrada de estoque do material, a cor também deve ser informada para o saldo bater.",
        "confirmar": "Produção › Configurações › Estrutura de produto.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-item-parametrico-da-estrutura-exige-cor.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Marcar produzido gera a entrada do produto acabado",
        "texto": "Em `Mais ações › Marcar produzido`, a OP vai para **Produzido** e nasce o movimento \"Entrada de produto acabado (OP)\" no almoxarifado central, com a quantidade e o custo da OP. O custo da OP mostra estimado e realizado (materiais e mão de obra). Um apontamento de tempo que ficou aberto continua aberto mesmo com a OP produzida, e \"Cancelar OP\" continua habilitado numa OP Produzida.",
        "confirmar": "Produção › Ordens de produção, Estoque › Movimentos e `Mais ações › Custo da OP`.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A OP copia produto e medidas do pedido, mas não a quantidade",
        "texto": "Em **Produção › Ordens de produção › Nova OP**, ao escolher **Pedido de venda** e **Item do pedido**, o sistema copia produto, cor e medidas, mas **não** a quantidade, que precisa ser informada. A **Empresa** é obrigatória (a dica diz que ela herda do pedido, mas não herda). O **Número da OP** deve ficar vazio: o sistema numera. Tipo de operação \"Fabricação\" e a linha de produção já vêm preenchidos. Não use Esc no painel: ele fecha e perde o formulário.",
        "confirmar": "Produção › Ordens de produção › Nova OP.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "As requisições da OP nascem da estrutura ao salvar",
        "texto": "Se o produto tem **estrutura de produto**, ao salvar a OP as requisições de material são criadas sozinhas (quantidade da estrutura vezes a quantidade da OP), sem usar \"Importar da estrutura\"; reimportar não duplica. Sem estrutura aparece o aviso \"OP sem requisições da estrutura\". Baixar o material pelo menu `⋯ › Materiais necessários` (**Baixar**) gera o status \"Atendida Parcialmente\" ou \"Atendida\" e o movimento \"Baixa de componente em OP\"; **Estornar** a baixa informa o motivo e devolve o saldo.",
        "confirmar": "Produção › Ordens de produção › `⋯` › Materiais necessários e Estoque › Movimentos.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.md"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-item-parametrico-da-estrutura-exige-cor.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-marcar-produzido-gera-entrada-do-produto-acabado.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-op-copia-o-item-do-pedido-mas-nao-a-quantidade.md",
       "harness:conhecimento/produto/regras-negocio/regra-producao-requisicoes-nascem-da-estrutura-ao-salvar.md"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Do pedido aprovado à liberação do produto finalizado.",
        "etapas": [
         "Pedido de Venda",
         "Ordem de Produção",
         "Planejamento",
         "Separação de Materiais",
         "Produção",
         "Apontamento das Etapas",
         "Conclusão da Ordem",
         "Liberação para Instalação ou Expedição"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Estrutura do produto",
        "onde": "`Produção > Configurações > Estrutura de produto`",
        "intro": "A estrutura diz o que cada unidade consome. Sem ela a OP nasce sem requisições e o estoque não sabe o que baixar.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Ordem de produção a partir do pedido",
        "onde": "`Produção > Ordens de produção > + Nova OP`",
        "intro": "O pedido não tem botão para gerar OP: ela é criada no módulo Produção e vinculada ao pedido e ao item.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Requisições e baixa de material",
        "onde": "`Mais ações > Materiais necessários`",
        "intro": "Cada baixa tira o insumo do estoque. Mostre o reflexo em Estoque a cada movimento.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Apontamento: iniciar e finalizar",
        "onde": "botão `▶` da linha da OP, `Mais ações > Apontamentos` e `Produção > Terminal de apontamento`",
        "intro": "O apontamento registra quem trabalhou, em que etapa e por quanto tempo. Hoje a finalização ainda é recusada: mostre o início e explique o defeito.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Marcar produzido e entrada do produto acabado",
        "onde": "`Mais ações > Marcar produzido` e `Estoque > Movimentos`",
        "intro": "É a passagem da Produção para o Estoque: o produto acabado entra no almoxarifado com o custo da OP.",
        "passos_total": 6,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Acompanhamento da fábrica",
        "onde": "`Produção > Painel de fábrica`, `Produção > Separação de materiais` e `Produção > Visão geral`",
        "intro": "Feche mostrando onde o PCP e o gestor acompanham as OPs no dia a dia.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#producao",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Produção: roteiro prático com o cliente",
        "texto": "Ao final, o cliente terá visto uma OP nascer do pedido com etapas e materiais da estrutura, baixar os insumos, registrar o início do trabalho e creditar o produto acabado no estoque com custo. Ele saberá repetir o caminho e conhecerá os alertas que travam a conclusão.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Estrutura do produto",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "2. Ordem de produção a partir do pedido",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "3. Requisições e baixa de material",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "4. Apontamento: iniciar e finalizar",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "5. Marcar produzido e entrada do produto acabado",
          "nota": "6 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "6. Acompanhamento da fábrica",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "link",
        "material": "producao:checklist-implantacao",
        "titulo": "Implantação de Produção: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-11-producao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente criação de ordens, planejamento, apontamentos e conclusão. Demonstre acompanhamento do progresso e indicadores.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao",
       "guia:db/migrations/002_modulos_iniciais.sql#producao"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "**Etapas de produção**, **processo** e **linha de produção** cadastrados, e o processo informado no produto (**Processo de produção padrão**).",
          "nota": "**Confira:** `Produção > Configurações` e `Cadastros > Produtos`. Sem processo no produto a OP não tem etapas, não aparece no Painel de fábrica e o terminal não deixa apontar. **Fonte:** manual-07-producao, Parte 1 e 1.1.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Insumos da estrutura **com saldo** e **almoxarifado central ativo** na empresa da OP (ou local da obra na mesma empresa).",
          "nota": "**Confira:** `Estoque > Saldo` e `Estoque > Locais`. Sem local ativo a OP não conclui (selo \"Conclusão bloqueada\"). **Fonte:** Fluxo de produção (pré-requisitos); manual-07-producao, 2.4.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Pedido de venda de teste (\"TESTE FLUXO CONSULTOR\") com o produto de teste, e um funcionário cadastrado para apontar.",
          "nota": "**Confira:** o pedido em `Vendas > Pedidos de Venda` e o funcionário em `Cadastros > Participantes`. **Fonte:** Fluxo de produção (pré-requisitos); procedimento-criar-ordem-de-producao-do-pedido.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Saldo dos insumos e do produto acabado anotados antes de começar.",
          "nota": "**Confira:** `Estoque > Saldo`. **Fonte:** Fluxo de produção (pré-requisitos).",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "A OP nasceu do pedido com as etapas do processo e as requisições da estrutura.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "As baixas e o estorno de material bateram com `Estoque > Movimentos` e o saldo dos insumos.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Marcar produzido creditou o produto acabado no almoxarifado com a quantidade e o custo da OP.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "O cliente sabe que hoje a finalização do apontamento ainda é recusada e como registrar o caso para o suporte.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Gerar ordem de produção a partir de pedido",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#producao"
          ]
         },
         {
          "texto": "Planejar e acompanhar produção",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#producao"
          ]
         },
         {
          "texto": "Realizar apontamentos das etapas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#producao"
          ]
         },
         {
          "texto": "Consultar andamento das ordens",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#producao"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Estoque, Compras e Expedição",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#producao"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao",
       "guia:db/migrations/002_modulos_iniciais.sql#producao"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Recebe pedidos aprovados de Vendas. Controla fabricação, materiais e custos.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#producao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#producao"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "**Segurança do ambiente:** use só ambiente de teste e registros com \"TESTE FLUXO CONSULTOR\"; nota fiscal só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Hoje o sistema ainda recusa a finalização do apontamento (\"A data/hora de fim não pode ser no futuro\"): não ensine a finalização como funcionando; anote o horário e avise o suporte.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "No painel da Nova OP, **Esc** fecha e perde o formulário. A **Empresa** é obrigatória, apesar da dica dizer que herda do pedido.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "**Marcar produzido**, **Pausar OP**, **Cancelar OP**, **Replicar OP** e **Gerar OS de instalação** gravam dados. **Cancelar OP** com movimentos de estoque os estorna e continua habilitado numa OP Produzida.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Na lista, **Iniciar produção** muda a OP para \"Em execução\" com um clique.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Antes da baixa, o selo de disponibilidade pode descontar duas vezes a reserva da própria OP (ex.: \"2 disponível · falta 6\" com 10 em estoque): confira o saldo em `Estoque > Saldo`.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "A **Fila de exceções** tem o botão **Reprocessar**: não reprocesse sem o suporte.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "OP de produto sem processo não tem etapas, não aparece no Painel de fábrica e não aceita apontamento no terminal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Iniciar produção muda a OP para Em execução com um clique.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-05-producao.json#12"
          ]
         },
         {
          "texto": "Defeito reportado: o apontamento pode recusar a finalização (erro de data futura). Anote o horário e avise o suporte.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-05-producao.json#12"
          ]
         },
         {
          "texto": "Fila de exceções: não reprocesse sem o suporte.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-05-producao.json#12"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-05-producao.json#12"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Entrada do produto acabado: o manual-07-producao (2.4) diz que o apontamento finalizado na última etapa dá entrada do acabado e baixa os componentes (movimentos \"OP – Conclusão\" e \"Requisição\"); no teste (Fluxo de produção) o apontamento não finalizou e a entrada veio de **Marcar produzido**, com o movimento \"Entrada de produto acabado (OP)\". Conferir na tela qual caminho o cliente vai usar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Origem da OP: o manual-07-producao (2.1) diz que normalmente as OPs nascem sozinhas pela Integração de Produção (pedido ou projeto vindo do CEM); o procedimento e o teste mostram a OP criada à mão em **Nova OP** com o pedido. Conferir como o cliente recebe os pedidos.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Submeter, aprovar, rejeitar e reabrir apontamento não foram testados, porque dependem de o apontamento finalizar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         },
         {
          "texto": "Reimportar da estrutura numa OP com item manual não foi testado.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao",
       "guia:videos/roteiros/consultor-05-producao.json#12"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "producao:video-consultor",
        "titulo": "Produção: da estrutura ao produto acabado",
        "status": "disponivel",
        "url": "/videos/consultor-05-producao.mp4",
        "duracao_s": 173,
        "poster": "/videos/consultor-05-producao.jpg",
        "legenda": "/videos/consultor-05-producao.vtt",
        "resumo": "Estrutura, ordem de produção, apontamento e entrada do acabado.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-05-producao.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-05-producao.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "producao:checklist-inicial",
        "titulo": "Produção: ordens e apontamentos",
        "status": "disponivel",
        "url": "/checklists/estagiarios/08-producao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#producao"
        ]
       },
       {
        "tipo": "link",
        "material": "producao:checklist-implantacao",
        "titulo": "Implantação de Produção: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-11-producao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como criar uma ordem de produção a partir do pedido",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-criar-ordem-de-producao-do-pedido.md"
          ]
         },
         {
          "texto": "07 Manual Producao",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/07_Manual_Producao_Timbrado.docx"
          ]
         },
         {
          "texto": "01-ordens-de-producao-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/01-ordens-de-producao-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "02-painel-de-fabrica-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/02-painel-de-fabrica-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "03-terminal-de-apontamento-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/03-terminal-de-apontamento-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "04-separacao-de-materiais-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/04-separacao-de-materiais-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "05-integracao-de-producao-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/05-integracao-de-producao-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "06-planejamento-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/06-planejamento-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "07-equipe-externa-com-sistemas-tecnicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/07-equipe-externa-com-sistemas-tecnicos.docx"
          ]
         },
         {
          "texto": "08-cadastros-e-estrutura-produtiva",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/08-cadastros-e-estrutura-produtiva.docx"
          ]
         },
         {
          "texto": "09-visao-geral-demanda-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/producao/09-visao-geral-demanda-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-criar-ordem-de-producao-do-pedido.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/07_Manual_Producao_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/01-ordens-de-producao-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/02-painel-de-fabrica-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/03-terminal-de-apontamento-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/04-separacao-de-materiais-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/05-integracao-de-producao-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/06-planejamento-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/07-equipe-externa-com-sistemas-tecnicos.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/08-cadastros-e-estrutura-produtiva.docx",
         "harness:conhecimento/Roteiros Treinamento/producao/09-visao-geral-demanda-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#producao",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-producao",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-criar-ordem-de-producao-do-pedido.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/07_Manual_Producao_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/01-ordens-de-producao-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/02-painel-de-fabrica-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/03-terminal-de-apontamento-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/04-separacao-de-materiais-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/05-integracao-de-producao-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/06-planejamento-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/07-equipe-externa-com-sistemas-tecnicos.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/08-cadastros-e-estrutura-produtiva.docx",
       "harness:conhecimento/Roteiros Treinamento/producao/09-visao-geral-demanda-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "servicos",
   "ordem": 9,
   "titulo": "Serviços e Instalação",
   "subtitulo": "Medição → instalação → vistoria → assistência técnica.",
   "cor": "#ad1457",
   "icone": "servicos",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#servicos",
    "guia:scripts/dados-checklists-estagiarios.mjs#servicos",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
   ],
   "materiais": [
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "servicos:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/11_Manual_Servicos_Timbrado.docx"
     ],
     "id": "servicos:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": "/checklists/estagiarios/09-servicos-campo.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
     ],
     "id": "servicos:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Serviços de campo",
     "status": "disponivel"
    },
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": "#inicial/servicos",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#servicos.nova-medicao",
      "guia:videos/roteiros/consultor-02-servicos.json"
     ],
     "id": "servicos:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-12-servicos.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
     ],
     "id": "servicos:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Serviços: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "servicos",
     "duracao_s": 168,
     "url": "/videos/consultor-02-servicos.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-02-servicos.json"
     ],
     "id": "servicos:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Serviços de campo: da medição à assistência",
     "status": "disponivel"
    },
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": "#consultor/servicos",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.md",
      "harness:conhecimento/produto/regras-negocio/regra-servicos-botao-agendar-so-na-medicao-salva.md",
      "harness:conhecimento/produto/regras-negocio/regra-servicos-medicao-nasce-do-pedido.md",
      "harness:conhecimento/produto/regras-negocio/regra-servicos-passagens-por-botao-e-ordem-dos-aceites.md",
      "guia:videos/roteiros/consultor-02-servicos.json"
     ],
     "id": "servicos:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "servicos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/11_Manual_Servicos_Timbrado.docx"
     ],
     "id": "servicos:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Serviços de campo",
        "texto": "Tudo o que acontece na obra do cliente depois da venda, na sequência Medição → Instalação → Vistoria → Assistência.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Ler o painel de serviços, consultar medições e entender como uma medição nasce de um pedido de venda e o que vem depois dela.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Ler o painel de serviços",
        "onde": "`Serviços > Dashboard Serviços`",
        "intro": null,
        "passos": [
         {
          "texto": "Escolher o período (Hoje, 7 dias, 30 dias) e ler os cartões: Agendados, Em execução, Concluídos, Fora do prazo.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler o **Pipeline operacional**: Medições a executar → Aprovadas sem instalação → Instalações a executar → Concluídas sem vistoria → Vistorias a executar → Assistências abertas.",
          "nota": "Estágios em âmbar são gargalos.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler os Alertas operacionais e a Carga por equipe.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Consultar medições",
        "onde": "`Serviços > Medições`",
        "intro": null,
        "passos": [
         {
          "texto": "Filtrar por Status: Em aberto, Agendada, Em Execução, Aguardando Conferência, Aprovada, Reprovada, Cancelada.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler a coluna **% MEDIDO** (vãos medidos sobre o total).",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Entender de onde vem a medição (sem salvar)",
        "onde": "`+ Nova Medição`",
        "intro": null,
        "passos": [
         {
          "texto": "Ver que a nova medição começa escolhendo um **pedido de venda**: cliente, obra e itens vêm preenchidos.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver a opção **Medição avulsa (sem pedido)**: obrigatórios Empresa, Cliente e Técnico Responsável.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Sair sem clicar em \"Usar este registro\" nem em \"Salvar\".",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "5. Conhecer as equipes",
        "onde": "`Serviços > Configurações > Equipes de Campo`",
        "intro": null,
        "passos": [
         {
          "texto": "Ver as equipes, o tipo, a capacidade diária e o status.",
          "nota": "Para abrir uma equipe use o lápis (clicar na linha não abre).",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "6. Instalação, vistoria e assistência",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Saber a sequência: a medição aprovada **não** cria a instalação sozinha (botão \"Gerar Instalação\"); a instalação concluída gera a vistoria só se a geração automática estiver ligada; a assistência vem do botão \"Gerar Assistência Técnica\" da vistoria.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir as listas de Instalações, Vistorias e Assistência Técnica e ler os status.",
          "nota": "Vistoria: aprovada, aprovada com ressalvas ou reprovada; o aceite do cliente só vale depois de concluir. Assistência: o aceite é registrado antes de resolver.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Nova Medição",
          "nota": "Serviços › Medições › Nova Medição",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#servicos.nova-medicao"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#servicos.nova-medicao"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#servicos.nova-medicao"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da venda à assistência técnica pós-instalação.",
        "etapas": [
         "Venda",
         "Medição em Obra",
         "Aprovação das Medidas",
         "Produção",
         "Agendamento da Instalação",
         "Execução do Serviço",
         "Vistoria",
         "Assistência Técnica"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#servicos"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: agendar uma medição do seu pedido",
        "onde": "`Serviços > Medições > + Nova Medição`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A medição nasce do pedido de venda do checklist 04. Os vãos, as fotos e a assinatura só existem depois que um técnico mede: no seu treino a medição ficará agendada. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Em `Serviços > Medições`, clicar em **Nova Medição** e em **Usar este registro** no seu pedido de venda (ou em **Medição avulsa (sem pedido)**). No diálogo **Importar Itens do Pedido**, marque os itens e o **Nº vãos** de cada um (ou **Cancelar**). Preencher **Empresa** (obrigatória, não vem do pedido) e **Técnico Responsável** (obrigatório); **Cliente** e **Projeto** vêm do pedido; opcionais: **Equipe de Campo**, **Data de Agendamento** e **Duração Prevista (HH:mm)**. Clicar em **Salvar** e, na medição já salva, em **Agendar**.",
          "nota": "A página tem as abas Dados Gerais, Vãos, Fotos e Histórico. O botão **Agendar** só existe na medição já salva: o formulário novo mostra apenas Voltar, Salvar e Trocar pedido, mesmo com a Data de Agendamento preenchida. Medição numerada, \"Agendada\" depois de Agendar.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "link",
        "material": "servicos:checklist-inicial",
        "titulo": "Serviços de campo",
        "status": "disponivel",
        "url": "/checklists/estagiarios/09-servicos-campo.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:servicos",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Serviços e Instalação e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Serviços > Medições > + Nova Medição`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Serviços > Dashboard Serviços`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `Serviços > Medições`"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: `+ Nova Medição`"
         },
         {
          "id": "acessar-5",
          "texto": "Sei acessar: `Serviços > Configurações > Equipes de Campo`"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 1. Preparar seus dados: agendar uma medição do seu pedido"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 2. Ler o painel de serviços"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 3. Consultar medições"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 4. Entender de onde vem a medição (sem salvar)"
         },
         {
          "id": "executei-10",
          "texto": "Executei: 5. Conhecer as equipes"
         },
         {
          "id": "executei-11",
          "texto": "Executei: 6. Instalação, vistoria e assistência"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:servicos",
        "total": 13,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Controlar atividades fora da fábrica — medição em obra, instalação, vistoria e assistência técnica.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Conecta processos comercial, produtivo e operacional. Acompanha a execução em campo.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Vendas, Produção e Expedição.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Serviços: medições, instalações, vistorias e assistências",
        "texto": "Serviços › Medições, Instalações, Vistorias, Assistências, Planejamento, Diário de Obra e Configurações (Parâmetros, Conferentes). A medição nasce em **Nova Medição** (lista de pedidos com **Usar este registro**, ou **Medição avulsa (sem pedido)**).",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-servicos-medicoes-instalacoes-vistorias-assistencias.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#servicos",
       "harness:conhecimento/produto/funcional/funcional-servicos-medicoes-instalacoes-vistorias-assistencias.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Aprovar a medição exige um conferente diferente de quem mediu",
        "texto": "A medição concluída com a assinatura do responsável pela obra fica \"Aguardando Conferência\". A aprovação exige um **conferente** (Serviços › Configurações › Conferentes) vinculado a um participante e **diferente** de quem mediu. Com \"Exigir assinatura\" ligado, o Finalizar da tela de edição só mostra erro: o caminho é Medir vãos, Iniciar e Concluir medição.",
        "confirmar": "Serviços › Medições › Medir vãos e Serviços › Configurações › Conferentes.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "O botão Agendar só existe na medição já salva",
        "texto": "O formulário de uma nova medição mostra apenas Voltar, **Salvar** e Trocar pedido, mesmo com a **Data de Agendamento** preenchida. O botão **Agendar** aparece na medição já salva, e então ela fica \"Agendada\".",
        "confirmar": "Serviços › Medições, antes e depois de salvar.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-servicos-botao-agendar-so-na-medicao-salva.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A medição nasce de um pedido e pede Empresa e Técnico",
        "texto": "Em **Serviços › Medições › Nova Medição**, **Usar este registro** no pedido traz **Cliente** e **Projeto**; **Empresa** (obrigatória) e **Técnico Responsável** (obrigatório) não vêm do pedido. Opcionais: Equipe de Campo, Data de Agendamento e Duração Prevista (HH:mm). O diálogo **Importar Itens do Pedido** pede os itens e o **Nº vãos** de cada um. Existe também **Medição avulsa (sem pedido)**. A página tem as abas Dados Gerais, Vãos, Fotos e Histórico.",
        "confirmar": "Serviços › Medições › Nova Medição.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-servicos-medicao-nasce-do-pedido.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Serviços de campo: passagens por botão e a ordem dos aceites",
        "texto": "A cadeia medição → instalação → vistoria → assistência técnica anda **por botão**: a medição **Aprovada** mostra **Gerar Instalação** (aprovar não cria a instalação); a instalação concluída mostra **Ver Vistoria** quando a vistoria já existe; a vistoria reprovada ou aprovada com ressalvas oferece **Gerar Assistência Técnica** (a AT não nasce sozinha). Só a vistoria pode nascer sozinha, quando **Geração automática de vistoria (dias)** está preenchida nos parâmetros (vem vazia, desligada). A instalação concluída mostra o checklist (Conferidos e Conformes) e, com equipe interna, \"Equipe interna: a instalação não gera pagamento\". Na **vistoria**, o aceite do cliente só é aceito **depois** de concluir; na **assistência técnica**, registre o aceite **antes** de **Resolver** (ordem inversa).",
        "confirmar": "Serviços › Medições, Instalações, Vistorias e Assistência Técnica (botões no cabeçalho de cada documento).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-servicos-passagens-por-botao-e-ordem-dos-aceites.md"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.md",
       "harness:conhecimento/produto/regras-negocio/regra-servicos-botao-agendar-so-na-medicao-salva.md",
       "harness:conhecimento/produto/regras-negocio/regra-servicos-medicao-nasce-do-pedido.md",
       "harness:conhecimento/produto/regras-negocio/regra-servicos-passagens-por-botao-e-ordem-dos-aceites.md"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da venda à assistência técnica pós-instalação.",
        "etapas": [
         "Venda",
         "Medição em Obra",
         "Aprovação das Medidas",
         "Produção",
         "Agendamento da Instalação",
         "Execução do Serviço",
         "Vistoria",
         "Assistência Técnica"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Medição: criar e agendar a partir do pedido",
        "onde": "`Serviços > Medições > + Nova Medição`",
        "intro": "O trabalho de campo começa no pedido vendido. A medição traz cliente, obra e vãos do pedido; a empresa e o técnico são preenchidos aqui.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Medição: medir os vãos e concluir",
        "onde": "aba `Vãos` da medição e ação `Medir vãos` na lista de medições",
        "intro": "O técnico lança as medidas reais. Com a assinatura exigida, a conclusão tem um caminho certo: mostre o errado primeiro.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Medição: aprovar com outro conferente",
        "onde": "`Serviços > Medições` (medição \"Aguardando Conferência\")",
        "intro": "A conferência é o controle de qualidade da medição. Demonstre a trava antes de aprovar.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Instalação",
        "onde": "botão `Gerar Instalação` da medição e `Serviços > Instalações`",
        "intro": "A instalação nasce da medição aprovada e leva os vãos medidos como checklist.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Vistoria",
        "onde": "`Ver Vistoria` na instalação ou `Serviços > Vistorias > + Nova Vistoria`",
        "intro": "A vistoria confere a obra entregue. Na vistoria, o aceite do cliente vem **depois** de concluir.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Assistência técnica",
        "onde": "botão `Gerar Assistência Técnica` da vistoria",
        "intro": "A assistência trata o que ficou pendente. Ela não nasce sozinha, e aqui o aceite vem **antes** de resolver.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Gestão de campo",
        "onde": "`Serviços > Cockpit de Campo`, `Serviços > Dashboard Serviços` e `Serviços > Minha Equipe Agora`",
        "intro": "Feche mostrando ao gestor onde ele acompanha as equipes e o resultado dos serviços.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#servicos",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Serviços: roteiro prático com o cliente",
        "texto": "Ao final, o cliente terá visto um pedido virar medição aprovada, instalação concluída com checklist, vistoria com aceite e assistência técnica resolvida, todas ligadas ao mesmo pedido e cliente. Ele saberá que as passagens são por botão e em que ordem registrar os aceites.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Medição: criar e agendar a partir do pedido",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "2. Medição: medir os vãos e concluir",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "3. Medição: aprovar com outro conferente",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "4. Instalação",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "5. Vistoria",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "6. Assistência técnica",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "7. Gestão de campo",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "link",
        "material": "servicos:checklist-implantacao",
        "titulo": "Implantação de Serviços: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-12-servicos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente medição em campo (medidas, fotos, observações, assinaturas). Demonstre acompanhamento da instalação (agenda, equipe, checklist, registro fotográfico, aceite). Apresente vistoria e assistência técnica (histórico, atendimentos, evidências).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos",
       "guia:db/migrations/002_modulos_iniciais.sql#servicos"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Dois usuários: o **técnico** (participante Funcionário) que mede e o **conferente**, vinculado a outro participante em **Conferentes**.",
          "nota": "**Confira:** a aba Conferentes das configurações de Serviços. Quem confere não pode ser quem mediu. **Fonte:** Fluxo de serviços de campo (pré-requisitos); regra-servicos-aprovacao-da-medicao-exige-conferente-diferente.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "**Equipe de campo** com o técnico como membro. Para testar pagamento de instalação: equipe **Terceirizada** com fornecedor (equipe interna não gera pagamento).",
          "nota": "**Confira:** `Serviços > Configurações > Equipes de Campo`. **Fonte:** Fluxo de serviços de campo (pré-requisitos); manual-11-servicos, 1.1.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Parâmetros decididos com o cliente: **Exigir conferência de medição**, **Exigir assinatura do responsável pela obra**, **Geração automática de vistoria** (vem vazia = desligada), garantia e prazos. Template de checklist de instalação e, para a assistência, tipos, origens e motivos.",
          "nota": "**Confira:** `Configurações > Config. Serviços`, abas Parâmetros, Instalação, Assistência e Geral. **Fonte:** Fluxo de serviços de campo (pré-requisitos); manual-11-servicos, 1.2.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Pedido de venda de teste (\"TESTE FLUXO CONSULTOR\") com itens de esquadria e, se quiser ver o Diário de Obra, com **Projeto (obra)**. Nomes fictícios para o responsável da obra e para o cliente nos aceites.",
          "nota": "**Confira:** o pedido em `Vendas > Pedidos de Venda`. **Fonte:** Fluxo de serviços de campo (pré-requisitos).",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Medição, instalação, vistoria e assistência técnica estão ligadas ao mesmo pedido e cliente de teste.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "A medição foi aprovada por um conferente diferente de quem mediu, e a trava foi demonstrada.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Os aceites foram registrados na ordem certa: depois de concluir a vistoria e antes de resolver a assistência.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "O Dashboard Serviços refletiu as conclusões (quantidade e m²).",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Realizar medição em obra e registrar informações",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         },
         {
          "texto": "Comparar medidas com o pedido vendido",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         },
         {
          "texto": "Organizar agenda das equipes",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         },
         {
          "texto": "Registrar checklist, fotos e aceite",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         },
         {
          "texto": "Realizar vistoria e abertura de assistência técnica",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         },
         {
          "texto": "Consultar histórico",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Produção, Expedição, Faturamento e Projetos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#servicos"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos",
       "guia:db/migrations/002_modulos_iniciais.sql#servicos"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Conecta processos comercial, produtivo e operacional. Acompanha a execução em campo.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#servicos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#servicos"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "**Segurança do ambiente:** use só ambiente de teste, registros com \"TESTE FLUXO CONSULTOR\" e nomes fictícios nas assinaturas e aceites; nota fiscal só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Três passagens são **por botão**: Gerar Instalação, Gerar Assistência Técnica e, opcional, Gerar OS de instalação a partir da OP. Só a vistoria pode nascer sozinha, com a Geração automática de vistoria preenchida.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Só se instala vão realmente medido: com todos os vãos cancelados, o sistema avisa que não há vão medido para instalar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Hoje datas e horas aparecem em UTC em vários pontos (vistoria, aceite, cockpit): confira o horário antes de concluir que há atraso.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "O template de checklist entra em **toda** instalação nova da empresa: desative o de teste no fim.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Mensagens (toasts) podem cobrir os botões do cabeçalho: feche-as antes de clicar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "No cadastro do técnico, o CEP preenche o endereço, mas hoje o formulário só aceita depois de redigitar o Endereço.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Datas e horas aparecem em UTC em vários pontos: confira antes de achar que há atraso.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-02-servicos.json#12"
          ]
         },
         {
          "texto": "O template de checklist entra em toda instalação nova da empresa.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-02-servicos.json#12"
          ]
         },
         {
          "texto": "Mensagens podem cobrir os botões do cabeçalho: feche antes de clicar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-02-servicos.json#12"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-02-servicos.json#12"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Concluir a medição: o manual-11-servicos (2.2) diz para lançar os vãos e clicar em **Salvar**, e então a medição vai para aguardando conferência; o teste (Fluxo de serviços de campo) e a regra de conferência dizem que, com \"Exigir assinatura\", o caminho é **Medir vãos** > **Iniciar medição** > **Concluir medição** e que o Finalizar da edição dá erro. Conferir com os parâmetros do cliente.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Aceite da assistência técnica: o plano de validação de Serviços pede o aceite na AT resolvida; no teste o aceite precisou vir antes de **Resolver**. Conferir na tela antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Caminho dos conferentes: o Fluxo de serviços de campo cita `Serviços > Configurações > Conferentes`; o manual-11-servicos cita `Configurações > Config. Serviços`, aba **Conferentes**. Conferir o menu na versão do cliente.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         },
         {
          "texto": "Pagamento de instalação com equipe terceirizada, aplicativo de campo `/campo` e Diário de Obra com projeto não foram testados.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos",
       "guia:videos/roteiros/consultor-02-servicos.json#12"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "servicos:video-consultor",
        "titulo": "Serviços de campo: da medição à assistência",
        "status": "disponivel",
        "url": "/videos/consultor-02-servicos.mp4",
        "duracao_s": 168,
        "poster": "/videos/consultor-02-servicos.jpg",
        "legenda": "/videos/consultor-02-servicos.vtt",
        "resumo": "Empresa e técnico na medição, o conferente diferente, as passagens por botão e a ordem dos aceites.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-02-servicos.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-02-servicos.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "servicos:checklist-inicial",
        "titulo": "Serviços de campo",
        "status": "disponivel",
        "url": "/checklists/estagiarios/09-servicos-campo.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#servicos"
        ]
       },
       {
        "tipo": "link",
        "material": "servicos:checklist-implantacao",
        "titulo": "Implantação de Serviços: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-12-servicos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como criar e agendar uma medição",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-agendar-medicao-do-pedido.md"
          ]
         },
         {
          "texto": "11 Manual Servicos",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/11_Manual_Servicos_Timbrado.docx"
          ]
         },
         {
          "texto": "01-planejamento-e-equipe-agora",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/01-planejamento-e-equipe-agora.docx"
          ]
         },
         {
          "texto": "02-equipes-de-campo-e-aplicativo",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/02-equipes-de-campo-e-aplicativo.docx"
          ]
         },
         {
          "texto": "03-diario-de-obra",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/03-diario-de-obra.docx"
          ]
         },
         {
          "texto": "04-medicoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/04-medicoes.docx"
          ]
         },
         {
          "texto": "05-instalacoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/05-instalacoes.docx"
          ]
         },
         {
          "texto": "06-vistorias",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/06-vistorias.docx"
          ]
         },
         {
          "texto": "07-assistencia-tecnica",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/07-assistencia-tecnica.docx"
          ]
         },
         {
          "texto": "08-configuracoes-e-notificacoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/08-configuracoes-e-notificacoes.docx"
          ]
         },
         {
          "texto": "09-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/servicos/09-paineis-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-agendar-medicao-do-pedido.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/11_Manual_Servicos_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/01-planejamento-e-equipe-agora.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/02-equipes-de-campo-e-aplicativo.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/03-diario-de-obra.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/04-medicoes.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/05-instalacoes.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/06-vistorias.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/07-assistencia-tecnica.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/08-configuracoes-e-notificacoes.docx",
         "harness:conhecimento/Roteiros Treinamento/servicos/09-paineis-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#servicos",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-servicos",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-agendar-medicao-do-pedido.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/11_Manual_Servicos_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/01-planejamento-e-equipe-agora.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/02-equipes-de-campo-e-aplicativo.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/03-diario-de-obra.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/04-medicoes.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/05-instalacoes.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/06-vistorias.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/07-assistencia-tecnica.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/08-configuracoes-e-notificacoes.docx",
       "harness:conhecimento/Roteiros Treinamento/servicos/09-paineis-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "projetos",
   "ordem": 10,
   "titulo": "Projetos e Obras",
   "subtitulo": "A obra como centro de custo e resultado.",
   "cor": "#00695c",
   "icone": "projetos",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#projetos",
    "guia:scripts/dados-checklists-estagiarios.mjs#projetos",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
   ],
   "materiais": [
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "projetos:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx"
     ],
     "id": "projetos:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": "/checklists/estagiarios/10-projetos-obras.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
     ],
     "id": "projetos:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Projetos e obras",
     "status": "disponivel"
    },
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:videos/roteiros/consultor-09-projetos.json"
     ],
     "id": "projetos:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "em-preparacao"
    },
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-14-projetos.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
     ],
     "id": "projetos:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Projetos: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "projetos",
     "duracao_s": 147,
     "url": "/videos/consultor-09-projetos.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-09-projetos.json"
     ],
     "id": "projetos:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Projetos e obras",
     "status": "disponivel"
    },
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": "#consultor/projetos",
     "fontes": [
      "guia:videos/roteiros/consultor-09-projetos.json"
     ],
     "id": "projetos:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "projetos",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx"
     ],
     "id": "projetos:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Projetos e obras",
        "texto": "Na indústria de esquadrias, o \"projeto\" é a obra: ele amarra pedido, produção, compras, estoque, serviços, notas e financeiro.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Localizar uma obra, ver o que está ligado a ela e ler os indicadores de progresso e resultado.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Achar a obra de um pedido",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Na lista de Pedidos de Venda, ler a coluna PROJETO.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em Nova Medição, ver que cada pedido mostra a obra vinculada (ou \"Sem obra vinculada\").",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Do cadastro da obra à análise de resultado.",
        "etapas": [
         "Cadastro da Obra",
         "Planejamento de Materiais",
         "Compras e Produção",
         "Execução da Obra",
         "Acompanhamento Operacional",
         "Controle Financeiro",
         "Encerramento e Análise de Resultado"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#projetos"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: ligar a sua obra ao seu pedido",
        "onde": "`Vendas > Pedidos de Venda` (pedido em aberto)",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A obra amarra pedido, compras, serviços, notas e financeiro. Ligue a sua obra (checklist 02) ao seu pedido (checklist 04) **antes de faturar**. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Em `Vendas > Pedidos de Venda`, abrir o seu pedido em aberto pelo **lápis** (\"Editar pedido\", coluna Ações), escolher no campo **Projeto (opcional)** a sua obra de treino e clicar em **Salvar e Permanecer**.",
          "nota": "A coluna PROJETO da lista passa a mostrar a obra, sem pedir CFOP nem condição. O menu `⋯` do pedido não tem \"Editar\". Pedido Entregue ou Faturado só tem **Visualizar** (o olho): faça isto antes de faturar.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       },
       {
        "tipo": "link",
        "material": "projetos:checklist-inicial",
        "titulo": "Projetos e obras",
        "status": "disponivel",
        "url": "/checklists/estagiarios/10-projetos-obras.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:projetos",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Projetos e Obras e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: `Vendas > Pedidos de Venda` (pedido em aberto)"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: módulo `Projetos`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: `Financeiro > Painel Financeiro de Projetos`"
         },
         {
          "id": "executei-4",
          "texto": "Executei: 1. Preparar seus dados: ligar a sua obra ao seu pedido"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 2. Achar a obra de um pedido"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 3. Consultar a carteira de obras"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 4. Ler o painel financeiro da obra"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:projetos",
        "total": 9,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Centralizar informações das obras — do planejamento à conclusão. Transforma cada obra em centro de controle e resultado.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Conecta todos os processos da obra. Evita informações espalhadas em planilhas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Vendas, Compras, Produção, Estoque e Financeiro.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#projetos"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "O campo Projeto liga os documentos",
        "texto": "Pedido, OP, solicitação de compra, medição e títulos se ligam à obra pelo campo Projeto. A lista de pedidos mostra a coluna PROJETO.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-09-projetos.json#04",
         "harness-id:funcional-cadastros-participante-produto-e-projeto"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Ligue o projeto antes de faturar",
        "texto": "Só o pedido Em aberto é editado. Depois de faturado ou entregue, não dá mais para ligar a obra.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-09-projetos.json#05",
         "harness-id:regra-vendas-editar-pedido-somente-em-aberto"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Estágios são fases; etapas são passos",
        "texto": "Estágio é a fase macro; etapa é o passo acompanhado, que pode pertencer a um estágio. Ficam nos botões da linha do projeto.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-09-projetos.json#06",
         "harness-id:manual-12-projetos-e-tarefas"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Obra com estoque próprio precisa de local ativo",
        "texto": "Se o projeto tem local de estoque, ele precisa estar ativo, senão a nota e a produção da obra travam.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-09-projetos.json#07",
         "harness-id:regra-estoque-almoxarifado-central-ativo-e-pre-requisito"
        ]
       }
      ],
      "fontes": [
       "guia:videos/roteiros/consultor-09-projetos.json#04",
       "harness-id:funcional-cadastros-participante-produto-e-projeto",
       "guia:videos/roteiros/consultor-09-projetos.json#05",
       "harness-id:regra-vendas-editar-pedido-somente-em-aberto",
       "guia:videos/roteiros/consultor-09-projetos.json#06",
       "harness-id:manual-12-projetos-e-tarefas",
       "guia:videos/roteiros/consultor-09-projetos.json#07",
       "harness-id:regra-estoque-almoxarifado-central-ativo-e-pre-requisito"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Do cadastro da obra à análise de resultado.",
        "etapas": [
         "Cadastro da Obra",
         "Planejamento de Materiais",
         "Compras e Produção",
         "Execução da Obra",
         "Acompanhamento Operacional",
         "Controle Financeiro",
         "Encerramento e Análise de Resultado"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Cadastrar a obra",
        "onde": "`Cadastros > Projetos > Novo Projeto`",
        "intro": "A obra vem antes de qualquer documento: é o guarda-chuva que vai receber pedido, produção, medição, nota e títulos.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Estágios e etapas",
        "onde": "botões `Estágios` e `Etapas` na linha da obra",
        "intro": "Estágios são as fases macro; etapas são os passos acompanhados. Eles servem de filtro nos documentos de compra e produção da obra.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Ligar o pedido e a medição à obra",
        "onde": "`Vendas > Pedidos de Venda` e `Serviços > Medições > + Nova Medição`",
        "intro": "O pedido é o primeiro documento ligado à obra e precisa receber o projeto antes de faturar. A medição herda a obra do pedido.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Produção e compras da obra",
        "onde": "`Produção > Ordens de produção > Nova OP` e `Compras > Solicitações de Compra`",
        "intro": "Mostre que produção e compras também carregam a obra, com o filtro de estágio e etapa, para o custo chegar ao painel.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Nota e títulos da obra",
        "onde": "menu `⋯ > Faturar` do pedido e `Financeiro > Contas a Receber`",
        "intro": "A nota com projeto movimenta o estoque da obra. É aqui que aparece o pré-requisito do local de estoque do projeto.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Painéis da obra: previsto × realizado",
        "onde": "`Financeiro > Painel Financeiro de Projetos` e módulo `Projetos`",
        "intro": "Com os documentos ligados, leia os painéis com o cliente e prove que os números batem com a origem.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Diário e ciclo de vida da obra",
        "onde": "`Projetos > Diário de Obra` e ações da linha da obra",
        "intro": "Termine mostrando como registrar o dia a dia da obra e como encerrá-la sem perder o histórico.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#projetos",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Projetos: roteiro prático com o cliente",
        "texto": "Ao final, o cliente terá visto uma obra de teste receber os documentos dos outros módulos e os painéis mostrarem números coerentes com eles. Saberá cadastrar uma obra, ligar o pedido antes de faturar e ler o Painel Financeiro de Projetos.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Cadastrar a obra",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "2. Estágios e etapas",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "3. Ligar o pedido e a medição à obra",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "4. Produção e compras da obra",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "5. Nota e títulos da obra",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "6. Painéis da obra: previsto × realizado",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "7. Diário e ciclo de vida da obra",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "link",
        "material": "projetos:checklist-implantacao",
        "titulo": "Implantação de Projetos: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-14-projetos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente cadastro da obra (cliente, responsável, datas, endereço, orçamento, etapas). Demonstre planejamento de materiais (previsto, comprado, recebido, consumido). Apresente painel operacional e financeiro (orçamento vs. realizado, margem, diário de obra).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos",
       "guia:db/migrations/002_modulos_iniciais.sql#projetos"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Um cliente de teste cadastrado em `Cadastros > Participantes`, com **É Cliente?** ligado.",
          "nota": "**Confira:** o participante aparece no seletor **Cliente** do Novo Projeto. **Fonte:** procedimento-cadastrar-cliente-produto-e-obra.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Um **local de estoque do projeto** ativo em `Estoque > Locais`, ou o almoxarifado central ativo, para finalizar a nota com a obra.",
          "nota": "**Confira:** o local ativo e da mesma empresa das ordens de produção. A nota com projeto movimenta só o local do projeto. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\" (pré-requisito); regra-estoque-almoxarifado-central-ativo-e-pre-requisito; manual-12-projetos-e-tarefas#002.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Produto de teste, condição de pagamento e permissão para criar projetos, estágios e etapas.",
          "nota": "**Confira:** o consultor consegue abrir **+ Novo Projeto** e os botões **Estágios** e **Etapas** da lista. **Fonte:** fluxo antigo \"Fluxo de projetos e obras\" (pré-requisito).",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "A obra de teste foi cadastrada com código único e aparece em Todos os Projetos.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Pedido, medição, OP, solicitação de compra, nota e títulos estão ligados à obra e aparecem nas abas e filtros.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "O Painel Financeiro de Projetos mostra vendido, faturado, a receber e resultado coerentes com os documentos.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "O cliente sabe que o projeto vai no pedido antes de faturar.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Criar e configurar nova obra",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Organizar fases e etapas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Planejar necessidades de materiais",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Acompanhar compras, produção, estoque e serviços",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Consultar receitas, custos e margem",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Usar diário de obra",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Identificar diferenças entre previsto e realizado",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Compras, Produção, Estoque, Financeiro, Serviços e CRM",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#projetos"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos",
       "guia:db/migrations/002_modulos_iniciais.sql#projetos"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Conecta todos os processos da obra. Evita informações espalhadas em planilhas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#projetos"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#projetos"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste, com registros \"TESTE FLUXO CONSULTOR\". A nota da obra só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Ligue o projeto no **pedido**, antes de faturar: depois de faturado o pedido só tem Visualizar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Hoje o painel ainda mostra \"A faturar\" negativo quando só a nota ou o título carrega o projeto e o pedido não.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Cada projeto tem um único local de estoque, e ele precisa ser da mesma empresa das ordens de produção; sem ele a nota não finaliza.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Excluir uma obra é definitivo e leva junto estágios, etapas e resultado previsto: prefira inativar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Trocar o cliente de uma obra que já tem pedido e nota: confirme com o time antes.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Postar no Diário de Obra grava dados: use só a obra de teste.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Pedido sem projeto não aparece no painel da obra.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-09-projetos.json#11"
          ]
         },
         {
          "texto": "Título manual e gerado do mesmo pedido duplicam o painel.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-09-projetos.json#11"
          ]
         },
         {
          "texto": "O painel conta o que foi faturado e recebido, não só o vendido.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-09-projetos.json#11"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-09-projetos.json#11"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Caminho do cadastro: o fluxo antigo e o procedimento citam `Cadastros > Projetos > Novo Projeto`; o manual-12-projetos-e-tarefas cita o menu lateral do módulo Projetos (`Cadastros > Projetos`) com o botão **+ Novo Projeto**.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Caminho do painel: o fluxo antigo cita `Financeiro > Painel Financeiro de Projetos`; o manual-12-projetos-e-tarefas o coloca no menu do módulo Projetos ou no **Ver Painel** do cartão da obra.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Estágios com peso e conclusão com data vêm só do fluxo antigo (plano de QA); o manual-12-projetos-e-tarefas descreve estágio sem peso e etapa com estágio opcional.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "Diário de Obra: o fluxo antigo cita `Projetos > Diário de Obra`, mas o menu de Projetos descrito no manual-12-projetos-e-tarefas não lista esse item.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         },
         {
          "texto": "O módulo Projetos (Todos os Projetos, plano de resultado, andamento, dashboard e diário) não foi aberto no sistema; só o cadastro de projeto, o pedido com projeto, a nota com projeto e o painel financeiro foram vistos.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos",
       "guia:videos/roteiros/consultor-09-projetos.json#11"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "projetos:video-consultor",
        "titulo": "Projetos e obras",
        "status": "disponivel",
        "url": "/videos/consultor-09-projetos.mp4",
        "duracao_s": 147,
        "poster": "/videos/consultor-09-projetos.jpg",
        "legenda": "/videos/consultor-09-projetos.vtt",
        "resumo": "Cadastro, estágios, painéis e diário de obra.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-09-projetos.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-09-projetos.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "projetos:checklist-inicial",
        "titulo": "Projetos e obras",
        "status": "disponivel",
        "url": "/checklists/estagiarios/10-projetos-obras.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#projetos"
        ]
       },
       {
        "tipo": "link",
        "material": "projetos:checklist-implantacao",
        "titulo": "Implantação de Projetos: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-14-projetos.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "12 Manual Projetos e Tarefas",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx"
          ]
         },
         {
          "texto": "01-cadastro-e-acompanhamento-de-projetos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/projetos/01-cadastro-e-acompanhamento-de-projetos.docx"
          ]
         },
         {
          "texto": "02-paineis-e-andamento-das-obras",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/projetos/02-paineis-e-andamento-das-obras.docx"
          ]
         },
         {
          "texto": "03-plano-de-resultado-e-financeiro",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/projetos/03-plano-de-resultado-e-financeiro.docx"
          ]
         },
         {
          "texto": "04-comparacao-e-integracoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/projetos/04-comparacao-e-integracoes.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/projetos/01-cadastro-e-acompanhamento-de-projetos.docx",
         "harness:conhecimento/Roteiros Treinamento/projetos/02-paineis-e-andamento-das-obras.docx",
         "harness:conhecimento/Roteiros Treinamento/projetos/03-plano-de-resultado-e-financeiro.docx",
         "harness:conhecimento/Roteiros Treinamento/projetos/04-comparacao-e-integracoes.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#projetos",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-projetos",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/projetos/01-cadastro-e-acompanhamento-de-projetos.docx",
       "harness:conhecimento/Roteiros Treinamento/projetos/02-paineis-e-andamento-das-obras.docx",
       "harness:conhecimento/Roteiros Treinamento/projetos/03-plano-de-resultado-e-financeiro.docx",
       "harness:conhecimento/Roteiros Treinamento/projetos/04-comparacao-e-integracoes.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "expedicao",
   "ordem": 11,
   "titulo": "Expedição",
   "subtitulo": "Liberação, carga, checkpoints, rota e entrega.",
   "cor": "#0277bd",
   "icone": "expedicao",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#expedicao",
    "guia:scripts/dados-checklists-estagiarios.mjs#expedicao",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
   ],
   "materiais": [
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "expedicao:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/09_Manual_Expedicao_Timbrado.docx"
     ],
     "id": "expedicao:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": "/checklists/estagiarios/11-expedicao.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
     ],
     "id": "expedicao:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Expedição e entregas",
     "status": "disponivel"
    },
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:videos/roteiros/consultor-06-expedicao.json"
     ],
     "id": "expedicao:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "em-preparacao"
    },
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-13-expedicao.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
     ],
     "id": "expedicao:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Expedição: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "expedicao",
     "duracao_s": 161,
     "url": "/videos/consultor-06-expedicao.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-06-expedicao.json"
     ],
     "id": "expedicao:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Expedição: da carga à entrega",
     "status": "disponivel"
    },
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": "#consultor/expedicao",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.md",
      "guia:videos/roteiros/consultor-06-expedicao.json"
     ],
     "id": "expedicao:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "expedicao",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/09_Manual_Expedicao_Timbrado.docx"
     ],
     "id": "expedicao:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Expedição e entregas",
        "texto": "Do pedido faturado até a mercadoria na mão do cliente: liberar, montar a carga, conferir no pátio e entregar.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Entender as etapas da expedição e acompanhar o status de cargas e entregas, sabendo o que cada botão faz.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Ver o que pode ser expedido",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Em Pedidos de Venda, filtrar o Status \"Lib. Expedição\".",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que **Liberar para Expedição** (menu `⋯` do pedido) só aparece depois que o pedido é faturado.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Na Carteira de Pedidos (Vendas > Demonstrativos), ler A expedir, Em carga, Expedido e Entregue.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Entender a montagem da carga (sem montar)",
        "onde": "`Expedição > Montar Nova Carga`",
        "intro": null,
        "passos": [
         {
          "texto": "Ver as abas \"Por pedido de venda\" e \"Por ordem de produção\" e o filtro \"Exibir apenas pedidos explicitamente liberados\".",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler os campos: veículo (peso e volume), **Data prevista de saída**, **Motorista** e Observações.",
          "nota": "O resumo mostra a ocupação do veículo (ex.: 23/360 kg).",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que \"Autorizar montagem apesar do bloqueio de produção\" só se usa com aprovação.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Acompanhar uma carga",
        "onde": "detalhe da carga",
        "intro": null,
        "passos": [
         {
          "texto": "Reconhecer o ciclo: **Em Montagem → Fechada → (Separação, Conferência, Carregamento) → Em Rota → Entregue**.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler o bloco de checkpoints: cada volume é bipado ou confirmado na Separação, na Conferência e no Carregamento.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler o **Histórico da Carga** (quem fez cada etapa e quando).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ver os documentos disponíveis: Romaneio, Romaneio de itens, PDF e Etiquetas.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Do pedido faturado à confirmação de recebimento.",
        "etapas": [
         "Pedido Faturado",
         "Montagem da Carga",
         "Separação dos Produtos",
         "Conferência",
         "Carregamento",
         "Entrega",
         "Confirmação de Recebimento"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: montar a carga do seu pedido",
        "onde": "menu `⋯` do pedido e `Expedição > Montar Nova Carga`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A expedição só aceita pedido **faturado**: faça antes o bloco de preparar do checklist 12. O motorista precisa ter CNH válida. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "No menu `⋯` do pedido **Faturado** (checklist 12), escolher **Liberar para Expedição**.",
          "nota": "Em pedido Em aberto ou Entregue o item não existe; em pedido Faturado aparece habilitado; em pedido \"Lib. Expedição\" vira \"Reverter Liberação\". O aviso da tela Montar Nova Carga manda clicar em \"Liberar para Expedição\" no pedido, mas o botão só existe no menu `⋯` do pedido Faturado.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Em `Expedição`, clicar em **Montar Nova Carga**: marcar o seu pedido em **Pedidos disponíveis**, escolher o **Veículo**, a **Data prevista de saída** e o **Motorista** (obrigatórios) e clicar em **Montar Carga**.",
          "nota": "Carga \"Em Montagem\". O número do botão é o contador de pedidos marcados. Pode avisar \"item sem ordem de produção vinculada\" mesmo com OP.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       },
       {
        "tipo": "link",
        "material": "expedicao:checklist-inicial",
        "titulo": "Expedição e entregas",
        "status": "disponivel",
        "url": "/checklists/estagiarios/11-expedicao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:expedicao",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Expedição e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: menu `⋯` do pedido e `Expedição > Montar Nova Carga`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Expedição > Montar Nova Carga`"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: detalhe da carga"
         },
         {
          "id": "executei-4",
          "texto": "Executei: 1. Preparar seus dados: montar a carga do seu pedido"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 2. Ver o que pode ser expedido"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 3. Entender a montagem da carga (sem montar)"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 4. Acompanhar uma carga"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:expedicao",
        "total": 9,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Organizar a entrega dos produtos — montagem da carga, conferência, carregamento e transporte.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Recebe pedidos faturados e autorizados. Integra-se a Vendas, Faturamento, Estoque e Produção.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Vendas, Faturamento, Produção e Estoque.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Liberar para Expedição só existe em pedido Faturado",
        "texto": "O item **Liberar para Expedição** do menu `⋯` aparece somente em pedido **Faturado**. Em pedido Em aberto ou Entregue não existe, e em pedido **Lib. Expedição** vira **Reverter Liberação**. O aviso da tela Montar Nova Carga manda clicar nesse botão no pedido, mas ele só está no menu do pedido faturado.",
        "confirmar": "Vendas › Pedidos de Venda › menu `⋯` de pedidos em status diferentes.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Os checkpoints são os da empresa",
        "texto": "Separação, Conferência e Carregamento ligam em Expedição › Configurações › Parâmetros. Ligue só o que a empresa usa.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-06-expedicao.json#05",
         "harness-id:manual-09-expedicao"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Fechou a carga, começa a bipagem",
        "texto": "Fechar Carga libera os checkpoints. Com todos completos, Iniciar Rota coloca a carga Em Rota.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-06-expedicao.json#06",
         "harness-id:manual-09-expedicao"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Ocorrência bloqueante volta à fila",
        "texto": "A entrega fica com ocorrência e o pedido volta para Aguardando Re-Expedição. A devolução confirmada cria pendências de estoque.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-06-expedicao.json#07",
         "harness-id:roteiro-expedicao-05-re-expedicao-e-devolucoes"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.md",
       "guia:videos/roteiros/consultor-06-expedicao.json#05",
       "harness-id:manual-09-expedicao",
       "guia:videos/roteiros/consultor-06-expedicao.json#06",
       "guia:videos/roteiros/consultor-06-expedicao.json#07",
       "harness-id:roteiro-expedicao-05-re-expedicao-e-devolucoes"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Do pedido faturado à confirmação de recebimento.",
        "etapas": [
         "Pedido Faturado",
         "Montagem da Carga",
         "Separação dos Produtos",
         "Conferência",
         "Carregamento",
         "Entrega",
         "Confirmação de Recebimento"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Cadastros da expedição",
        "onde": "`Expedição > Configurações`",
        "intro": "Antes da primeira carga, mostre ao cliente o que a montagem usa: veículo, motorista, checkpoints e tipos de ocorrência. Sem isso a carga não fecha ou a ocupação não aparece.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Liberar o pedido faturado",
        "onde": "`Vendas > Pedidos de Venda`, menu `⋯` do pedido",
        "intro": "A expedição começa no pedido. Mostre primeiro que a liberação não existe antes de faturar e depois libere o pedido de teste.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Montar a carga",
        "onde": "`Expedição > Visão Geral > + Montar Nova Carga`",
        "intro": "Com o pedido na fila, monte a carga escolhendo o veículo pela ocupação. É aqui que o cliente vê peso e volume contra a capacidade.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Fechar a carga e fazer os checkpoints",
        "onde": "detalhe da carga",
        "intro": "Fechar a carga libera os checkpoints do pátio. O cliente executa a bipagem com o consultor, volume a volume.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Rota e entrega",
        "onde": "detalhe da carga e `Apontamentos do Motorista`",
        "intro": "A saída trava os checkpoints e a entrega fecha o ciclo. Termine conferindo o reflexo no pedido de Vendas.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Ocorrência na rota",
        "onde": "`Apontamentos do Motorista > Ocorrência` e `Expedição > Ocorrências`",
        "intro": "Use uma segunda carga de teste, já em rota, para mostrar o que acontece quando a entrega não sai como previsto.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Devolução e re-expedição",
        "onde": "`Expedição > Aguardando Re-Expedição` e `Expedição > Pendências de Estoque (Devolução)`",
        "intro": "Feche o roteiro mostrando a devolução e a passagem para o Estoque, que não é automática.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#expedicao",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Expedição: roteiro prático com o cliente",
        "texto": "Ao final, o cliente terá visto um pedido faturado virar carga, passar pelos checkpoints do pátio e chegar a Entregue com histórico, e saberá repetir sozinho. Também terá visto o que acontece numa ocorrência bloqueante e numa devolução, e por que o saldo do estoque não volta sozinho.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Cadastros da expedição",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "2. Liberar o pedido faturado",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "3. Montar a carga",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "4. Fechar a carga e fazer os checkpoints",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "5. Rota e entrega",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "6. Ocorrência na rota",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "7. Devolução e re-expedição",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "link",
        "material": "expedicao:checklist-implantacao",
        "titulo": "Implantação de Expedição: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-13-expedicao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente criação de cargas, organização por veículo, conferência, carregamento e acompanhamento. Demonstre registro de confirmação de entrega e histórico.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao",
       "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Um pedido de venda de teste **Faturado**, com nota finalizada e sem transmitir (marcado \"TESTE FLUXO CONSULTOR\").",
          "nota": "**Confira:** em `Vendas > Pedidos de Venda`, o status **Faturado**. A tela de montagem só lista pedidos liberados, e a liberação só existe em pedido faturado. **Fonte:** fluxo antigo \"Fluxo de expedição\" (pré-requisito); regra-vendas-liberar-para-expedicao-so-em-pedido-faturado.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Frota cadastrada: pelo menos um **veículo** com capacidade de peso e volume e um **motorista** com CNH válida.",
          "nota": "**Confira:** em `Expedição > Configurações > Veículos` e `Motoristas`. CNH vencida exige justificativa para fechar a carga. **Fonte:** fluxo antigo \"Fluxo de expedição\" (pré-requisito); manual-09-expedicao#003 e #004.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Endereço de entrega no cadastro do cliente e peso no cadastro do produto.",
          "nota": "**Confira:** o endereço aparece no resumo da carga; o peso alimenta a ocupação do veículo. **Fonte:** fluxo antigo \"Fluxo de expedição\" (pré-requisito); manual-09-expedicao#002.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Checkpoints da empresa definidos: quais etapas (Separação, Conferência, Carregamento) o cliente vai usar.",
          "nota": "**Confira:** em `Expedição > Configurações > Parâmetros`. **Fonte:** manual-09-expedicao#005.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "O pedido faturado foi liberado, entrou numa carga, passou pelos checkpoints e chegou a **Entregue**, com todo o caminho no Histórico da Carga.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "A Carteira de Pedidos de Vendas mostra o pedido entregue com o número da carga.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Uma ocorrência bloqueante devolveu o pedido à fila de re-expedição e a devolução gerou pendência de estoque sem mexer no saldo.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "O cliente montou e fechou uma carga sozinho, escolhendo o veículo pela ocupação.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Montar carga com pedidos faturados",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
          ]
         },
         {
          "texto": "Realizar conferência e carregamento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
          ]
         },
         {
          "texto": "Acompanhar status das entregas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
          ]
         },
         {
          "texto": "Registrar confirmação de recebimento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Estoque, Produção e Faturamento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao",
       "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Recebe pedidos faturados e autorizados. Integra-se a Vendas, Faturamento, Estoque e Produção.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#expedicao"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste, com registros \"TESTE FLUXO CONSULTOR\". A nota fiscal do pedido só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "**Liberar para Expedição** só aparece no pedido **Faturado**, e o aviso da tela de montagem não diz isso: fature antes.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Montar, fechar, **Iniciar Rota**, **Entregue** e cancelar carga alteram a operação. O link de rastreamento e os avisos podem chegar ao cliente final: use e-mail de teste e revogue o link.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Hoje a carga ainda pode avisar \"item sem ordem de produção vinculada\" mesmo com a OP existente: confira a OP antes de carregar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "A devolução **não** devolve o saldo ao estoque sozinha: depende da entrada manual e da baixa da pendência.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "**Gerar Títulos** do pedido fica desabilitado em Faturado e Lib. Expedição (\"Pedido já faturado\") e volta depois de Entregue: combine com o Financeiro quando gerar.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Motorista com CNH vencida trava o fechamento sem justificativa: confira a validade antes do dia da implantação.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Motorista com CNH vencida exige justificativa para fechar a carga.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-06-expedicao.json#12"
          ]
         },
         {
          "texto": "A carga pode avisar produção pendente mesmo com a OP vinculada.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-06-expedicao.json#12"
          ]
         },
         {
          "texto": "Devolução não sobe o saldo: trate a pendência de estoque.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-06-expedicao.json#12"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-06-expedicao.json#12"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Caminho dos cadastros: o fluxo antigo cita `Expedição > Cadastros`; o manual-09-expedicao usa `Expedição > Configurações` (Veículos, Motoristas, Parâmetros, Tipos de Ocorrência). O menu lateral tem os dois itens: conferir na tela onde fica cada cadastro.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Caminho da montagem: o fluxo antigo e o procedimento citam `Expedição > Montar Nova Carga`; o manual-09-expedicao usa `Expedição > Visão Geral > + Montar Nova Carga`.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Produção pendente: o manual-09-expedicao descreve a opção **Autorizar montagem apesar do bloqueio de produção** com justificativa; o fluxo antigo e o \"Teste do fluxo completo\" registram o aviso \"item sem ordem de produção vinculada\" mesmo com OP (defeito). Conferir na tela qual aviso aparece e se a autorização existe.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Mensagem dos checkpoints: o fluxo antigo registra \"Todos os checkpoints concluídos! Carga pronta para sair\"; o manual-09-expedicao cita só \"Todos os checkpoints concluídos\".",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         },
         {
          "texto": "Ocorrências, devolução, re-expedição, pendências de estoque e o app do motorista ainda não foram executados no sistema: os blocos 6 e 7 vêm do plano de QA de Expedição pelo fluxo antigo.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao",
       "guia:videos/roteiros/consultor-06-expedicao.json#12"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "expedicao:video-consultor",
        "titulo": "Expedição: da carga à entrega",
        "status": "disponivel",
        "url": "/videos/consultor-06-expedicao.mp4",
        "duracao_s": 161,
        "poster": "/videos/consultor-06-expedicao.jpg",
        "legenda": "/videos/consultor-06-expedicao.vtt",
        "resumo": "Carga, entrega, ocorrência e devolução.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-06-expedicao.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-06-expedicao.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "expedicao:checklist-inicial",
        "titulo": "Expedição e entregas",
        "status": "disponivel",
        "url": "/checklists/estagiarios/11-expedicao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#expedicao"
        ]
       },
       {
        "tipo": "link",
        "material": "expedicao:checklist-implantacao",
        "titulo": "Implantação de Expedição: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-13-expedicao.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como liberar o pedido e montar a carga",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-montar-carga-e-liberar-para-expedicao.md"
          ]
         },
         {
          "texto": "09 Manual Expedicao",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/09_Manual_Expedicao_Timbrado.docx"
          ]
         },
         {
          "texto": "01-cadastros-e-parametros",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/01-cadastros-e-parametros.docx"
          ]
         },
         {
          "texto": "02-cargas",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/02-cargas.docx"
          ]
         },
         {
          "texto": "03-separacao-conferencia-e-carregamento",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/03-separacao-conferencia-e-carregamento.docx"
          ]
         },
         {
          "texto": "04-entrega",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/04-entrega.docx"
          ]
         },
         {
          "texto": "05-re-expedicao-e-devolucoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/05-re-expedicao-e-devolucoes.docx"
          ]
         },
         {
          "texto": "06-roteirizacao",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/06-roteirizacao.docx"
          ]
         },
         {
          "texto": "07-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/expedicao/07-paineis-e-demonstrativos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-montar-carga-e-liberar-para-expedicao.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/09_Manual_Expedicao_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/01-cadastros-e-parametros.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/02-cargas.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/03-separacao-conferencia-e-carregamento.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/04-entrega.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/05-re-expedicao-e-devolucoes.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/06-roteirizacao.docx",
         "harness:conhecimento/Roteiros Treinamento/expedicao/07-paineis-e-demonstrativos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#expedicao",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-expedicao",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-montar-carga-e-liberar-para-expedicao.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/09_Manual_Expedicao_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/01-cadastros-e-parametros.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/02-cargas.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/03-separacao-conferencia-e-carregamento.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/04-entrega.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/05-re-expedicao-e-devolucoes.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/06-roteirizacao.docx",
       "harness:conhecimento/Roteiros Treinamento/expedicao/07-paineis-e-demonstrativos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "faturamento",
   "ordem": 12,
   "titulo": "Faturamento",
   "subtitulo": "Notas fiscais NF-e/NFS-e, status e cuidados.",
   "cor": "#f57f17",
   "icone": "faturamento",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#faturamento",
    "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
   ],
   "materiais": [
    {
     "modulo": "faturamento",
     "duracao_s": 198,
     "url": "/videos/consultor-07-faturamento.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-07-faturamento.json"
     ],
     "id": "faturamento:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Faturamento: do pedido à nota finalizada",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx"
     ],
     "id": "faturamento:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": "/checklists/estagiarios/12-faturamento-fiscal.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
     ],
     "id": "faturamento:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Faturamento e Fiscal (consulta)",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": "/checklists/estagiarios/fluxo-principal-faturamento.html",
     "fontes": [
      "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-faturamento-estagiario"
     ],
     "id": "faturamento:fluxo-principal",
     "tipo": "fluxo",
     "jornada": "inicial",
     "titulo": "Fluxo principal de Faturamento: do pedido à nota finalizada",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": "#inicial/faturamento",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#faturamento.notas-fiscais",
      "harness:conhecimento/glossario/telas.yaml#faturamento.nova-nfe",
      "guia:videos/roteiros/consultor-07-faturamento.json"
     ],
     "id": "faturamento:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-05-faturamento.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
     ],
     "id": "faturamento:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Faturamento: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": 198,
     "url": "/videos/consultor-07-faturamento.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-07-faturamento.json"
     ],
     "id": "faturamento:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Faturamento: do pedido à nota finalizada",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": 230,
     "url": "/videos/compra-em-nome-do-cliente.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/compra-em-nome-do-cliente.json"
     ],
     "id": "faturamento:video-consultor-2",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Compra em nome do cliente: Faturamento em Nível e Contrato de Fornecimento",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": "#consultor/faturamento",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md",
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido.md",
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md",
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-requisitos.md",
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-lista-de-notas-filtro-padrao-e-menu.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-pedido-fica-faturado-ao-salvar-a-nota.md",
      "guia:videos/roteiros/consultor-07-faturamento.json",
      "guia:videos/roteiros/compra-em-nome-do-cliente.json"
     ],
     "id": "faturamento:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "faturamento",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx"
     ],
     "id": "faturamento:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Faturamento e Fiscal (consulta)",
        "texto": "Onde o pedido vira nota fiscal. Aqui o estagiário consulta; emissão e transmissão são feitas por quem é responsável.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Encontrar uma nota fiscal, entender seus status e saber quais ações têm efeito fiscal e nunca devem ser feitas em treino.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "faturamento:video-inicial",
        "titulo": "Faturamento: do pedido à nota finalizada",
        "status": "disponivel",
        "url": "/videos/consultor-07-faturamento.mp4",
        "duracao_s": 198,
        "poster": "/videos/consultor-07-faturamento.jpg",
        "legenda": "/videos/consultor-07-faturamento.vtt",
        "resumo": "Faturar o pedido, conferir a nota e finalizar sem transmitir.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-07-faturamento.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-07-faturamento.json"
      ]
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Consultar notas fiscais",
        "onde": "`Faturamento > Notas Fiscais` (o módulo já abre nesta tela)",
        "intro": null,
        "passos": [
         {
          "texto": "Escolher a aba **NF-e** (produto) ou **NFS-e** (serviço).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Trocar o filtro **Status** (abre em \"Em Aberto\") e o filtro **Ambiente** (Homologação/Produção).",
          "nota": "Notas autorizadas e canceladas só aparecem com o Status certo.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Pesquisar por número ou cliente.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Conhecer as ações de uma nota (sem executar)",
        "onde": "menu `...` da linha",
        "intro": null,
        "passos": [
         {
          "texto": "Reconhecer as opções: Editar, Finalizar NF, Preview da DANFE, Duplicar, Ver Timeline, Anexos e Excluir.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Identificar o botão **Transmitir** (avião de papel) direto na linha e saber que ele envia a nota à SEFAZ.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Saber como o pedido vira nota",
        "onde": "menu `⋯ > Faturar` do pedido",
        "intro": null,
        "passos": [
         {
          "texto": "Saber que a nota nasce do pedido: `⋯ > Faturar` importa os itens e abre \"Nova NF-e\" com cliente, CFOP e parcelas do pedido.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que, ao salvar a nota, o pedido já aparece como \"Faturado\" — mesmo com a nota ainda Em Aberto. Confira sempre o status da nota.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Reconhecer o quadro \"Impostos não calculados no item\" e o motivo que ele mostra (ex.: CST de PIS/COFINS ausente na NCM): é assunto do fiscal.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Notas Fiscais",
          "nota": "Faturamento › Notas Fiscais",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#faturamento.notas-fiscais"
          ]
         },
         {
          "texto": "Nova NF-e",
          "nota": "Vendas › Pedidos de Venda › ⋯ › Faturar",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#faturamento.nova-nfe"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#faturamento.notas-fiscais",
         "harness:conhecimento/glossario/telas.yaml#faturamento.nova-nfe"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#faturamento.notas-fiscais",
       "harness:conhecimento/glossario/telas.yaml#faturamento.nova-nfe"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da geração da nota fiscal à liberação para expedição.",
        "etapas": [
         "Pedido de Venda",
         "Geração da NF-e/NFS-e",
         "Cálculo dos impostos",
         "Transmissão à SEFAZ/Prefeitura",
         "Autorização",
         "Contas a Receber",
         "Baixa de Estoque",
         "Liberação para Expedição"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: faturar o seu pedido (sem transmitir)",
        "onde": "menu `⋯ > Faturar` do pedido",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. Só faça com **autorização do supervisor** e com a faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" visível: a nota nunca pode ser transmitida no treino. O produto precisa de NCM com CST de PIS/COFINS de saída, senão a nota sai com \"Impostos não calculados\". Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "No seu pedido, abrir `⋯ > Faturar`: abre a nova nota com a faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" e o diálogo **Selecionar Itens para Importar** (importe os itens do pedido). Em **Observações e Informações Adicionais**, preencher as **Observações Internas** e clicar em **Salvar e Permanecer** (também há **Salvar** e **Cancelar**).",
          "nota": "O pedido passa a \"Faturado\" com a coluna NOTA FISCAL preenchida, mesmo com a nota ainda Em Aberto. Pode aparecer o aviso \"NCM-Estado não configurado para o produto\" (UF de origem e de destino): peça ao supervisor, ele pode bloquear a nota. **Não clique** em Transmitir.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "link",
        "material": "faturamento:checklist-inicial",
        "titulo": "Faturamento e Fiscal (consulta)",
        "status": "disponivel",
        "url": "/checklists/estagiarios/12-faturamento-fiscal.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "link",
        "material": "faturamento:fluxo-principal",
        "titulo": "Fluxo principal de Faturamento: do pedido à nota finalizada",
        "status": "disponivel",
        "url": "/checklists/estagiarios/fluxo-principal-faturamento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-faturamento-estagiario"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
       "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-faturamento-estagiario"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:faturamento",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Faturamento e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: menu `⋯ > Faturar` do pedido"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Faturamento > Notas Fiscais` (o módulo já abre nesta tela)"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: menu `...` da linha"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: módulo `Fiscal`"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 1. Preparar seus dados: faturar o seu pedido (sem transmitir)"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 2. Consultar notas fiscais"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 3. Conhecer as ações de uma nota (sem executar)"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 4. Saber como o pedido vira nota"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 5. Saber onde ficam os cadastros fiscais"
         },
         {
          "id": "video",
          "texto": "Assisti ao vídeo introdutório"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-07-faturamento.json"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-07-faturamento.json"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:faturamento",
        "total": 12,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Emitir documentos fiscais (NF-e/NFS-e), transmitir aos órgãos fiscais e integrar com Financeiro, Estoque e Expedição.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Conecta a área comercial às etapas fiscais e operacionais.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após o módulo de Vendas e configuração das regras fiscais (CFOP, NCM, impostos, certificado digital).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Faturamento: notas fiscais e a nova NF-e",
        "texto": "Faturamento › Notas Fiscais (abas NF-e e NFS-e). A nota nasce do pedido pelo menu `⋯ › Faturar` do pedido, em Vendas › Pedidos de Venda, e abre em /faturamento/notas/novo.",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-faturamento-notas-fiscais.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#faturamento",
       "harness:conhecimento/produto/funcional/funcional-faturamento-notas-fiscais.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Um almoxarifado central ativo é pré-requisito de produção e de nota",
        "texto": "Sem um **almoxarifado central ativo** (Estoque › Locais) o sistema bloqueia a conclusão da ordem de produção (\"Conclusão bloqueada\"), a entrada do produto acabado e a finalização da nota fiscal. Um projeto com local de estoque próprio deve ter esse local ativo.",
        "confirmar": "Estoque › Locais.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Faturar abre uma nova NF-e ligada ao pedido",
        "texto": "**Faturar** no menu `⋯` do pedido abre a \"Nova NF-e — Venda de Mercadoria\" com empresa, cliente, vendedor, CFOP, condição e parcelas do pedido; o número do pedido fica vinculado e não pode ser alterado. O diálogo **Selecionar Itens para Importar** abre sozinho e a nota vem vazia até importar os itens (com \"Recalcular impostos\"). As **Observações Internas** ficam em \"Observações e Informações Adicionais\". O transporte vem como \"9 - Sem Transporte\". Botões: Importar Itens do Pedido, Dados da NF-e, Cancelar, Salvar e Permanecer e Salvar.",
        "confirmar": "Vendas › Pedidos de Venda › `⋯` › Faturar.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Finalizar a NF-e gera os títulos das parcelas",
        "texto": "Ao **Finalizar NF** de uma nota que veio do pedido, o sistema cria sozinho em **Financeiro › Contas a Receber** um título por parcela, com o **Documento** \"NF - <número da nota>\" e os vencimentos e valores das parcelas do pedido. No pedido, a coluna **TÍTULOS** passa a \"Gerados\" e a coluna **NOTA FISCAL** mostra a nota. O menu `⋯` do pedido faturado troca o **Gerar Títulos** por \"Pedido já faturado\", desabilitado, e mostra \"Já faturado: Este pedido já possui nota fiscal emitida\".",
        "confirmar": "Faturamento › Notas Fiscais › `⋯` › Finalizar NF; depois Financeiro › Contas a Receber (pesquisar \"NF - <número>\") e Vendas › Pedidos de Venda (limpar o filtro Status).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Finalizar NF: o que precisa existir",
        "texto": "**Finalizar NF** pede confirmação (\"a nota ficará disponível apenas para visualização\") e deixa a nota **Finalizada** sem transmitir. Precisa de um **almoxarifado central ativo** (ou de local de estoque ativo no projeto); sem isso o sistema responde \"Não foi possível resolver o local de estoque…\" ou \"O projeto … não tem local de estoque ativo\". Se o produto não tem NCM com CST de PIS/COFINS de saída, a nota mostra o quadro \"Impostos não calculados no item\" com o motivo, mas ainda pode ser salva.",
        "confirmar": "Faturamento › Notas Fiscais › `⋯` › Finalizar NF; faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" na nota.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-requisitos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Lista de notas: filtro padrão Em Aberto e menu da nota",
        "texto": "A lista em **Faturamento › Notas Fiscais** abre com o Status **Em Aberto**, e os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas seguem esse filtro: uma nota finalizada ou autorizada só aparece trocando o filtro. As abas são **NF-e** (produto) e **NFS-e** (serviço). O menu `⋯` da nota tem Editar, **Finalizar NF**, Preview da DANFE (abre em nova aba), Duplicar, Ver Timeline, Anexos e Excluir; o avião de papel da linha é **Transmitir**.",
        "confirmar": "Faturamento › Notas Fiscais.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-lista-de-notas-filtro-padrao-e-menu.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "O pedido passa a Faturado quando a nota é salva",
        "texto": "No menu `⋯` do pedido, **Faturar** abre uma nova NF-e. Assim que a nota é **salva** (por exemplo com **Salvar e Permanecer**), o pedido muda para **Faturado** e a coluna **NOTA FISCAL** da lista é preenchida, mesmo que a nota ainda esteja **Em Aberto**.",
        "confirmar": "Vendas › Pedidos de Venda: o Status do pedido e a coluna NOTA FISCAL. Faturamento › Notas Fiscais: o status real da nota (o filtro padrão é Em Aberto).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-pedido-fica-faturado-ao-salvar-a-nota.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Os níveis somam 100%",
        "texto": "No rateio, a soma dos níveis fecha exatamente em cem por cento. Em Um pedido por nível, cada nível vira um pedido.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/compra-em-nome-do-cliente.json#05",
         "harness-id:roteiro-vendas-01-pedido-de-venda#012"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Encerrar não fatura",
        "texto": "Encerrar conclui um pedido Em aberto sem faturar o saldo. É o destino do pedido do material do cliente.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/compra-em-nome-do-cliente.json#06",
         "harness-id:manual-03-vendas#010"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Compra do cliente não é conta a pagar",
        "texto": "O pedido de compra vinculado ao contrato é por conta do cliente: não gera títulos a pagar da indústria.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/compra-em-nome-do-cliente.json#07",
         "harness-id:roteiro-vendas-02-contratos-de-fornecimento#023"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Registrar não é emitir a nota",
        "texto": "Registrar faturamento movimenta o saldo do contrato. A NF-e é feita depois, pelo pedido de venda.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/compra-em-nome-do-cliente.json#08",
         "harness-id:roteiro-vendas-02-contratos-de-fornecimento#033"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-estoque-almoxarifado-central-ativo-e-pre-requisito.md",
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-faturar-abre-nova-nfe-ligada-ao-pedido.md",
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md",
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-requisitos.md",
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-lista-de-notas-filtro-padrao-e-menu.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-pedido-fica-faturado-ao-salvar-a-nota.md",
       "guia:videos/roteiros/compra-em-nome-do-cliente.json#05",
       "harness-id:roteiro-vendas-01-pedido-de-venda#012",
       "guia:videos/roteiros/compra-em-nome-do-cliente.json#06",
       "harness-id:manual-03-vendas#010",
       "guia:videos/roteiros/compra-em-nome-do-cliente.json#07",
       "harness-id:roteiro-vendas-02-contratos-de-fornecimento#023",
       "guia:videos/roteiros/compra-em-nome-do-cliente.json#08",
       "harness-id:roteiro-vendas-02-contratos-de-fornecimento#033"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da geração da nota fiscal à liberação para expedição.",
        "etapas": [
         "Pedido de Venda",
         "Geração da NF-e/NFS-e",
         "Cálculo dos impostos",
         "Transmissão à SEFAZ/Prefeitura",
         "Autorização",
         "Contas a Receber",
         "Baixa de Estoque",
         "Liberação para Expedição"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Faturar o pedido",
        "onde": "`Vendas > Pedidos de Venda`, menu `⋯ > Faturar`",
        "intro": "A nota nasce do pedido: o cliente vê que não redigita nada. Vem primeiro porque tudo o que a nota carrega (cliente, CFOP, parcelas) foi decidido no pedido.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Conferir a nota: CFOP, impostos, parcelas e transporte",
        "onde": "tela da nova NF-e",
        "intro": "Aqui o faturista aprende a ler a nota antes de salvar. Erro de cadastro achado agora não vira nota rejeitada nem título errado depois.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Salvar e ver o pedido virar Faturado",
        "onde": "`Faturamento > Notas Fiscais` e `Vendas > Pedidos de Venda`",
        "intro": "Salvar cria a nota Em Aberto, ainda sem nada enviado à SEFAZ. O cliente vê na hora o reflexo no pedido e aprende a achar a nota na lista.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Transmitir em homologação com o responsável fiscal",
        "onde": "botão **Transmitir** (avião de papel) na linha da nota, em `Faturamento > Notas Fiscais`",
        "intro": "Só com o responsável fiscal ao lado e a faixa de homologação visível. O cliente vê o pré-voo, a autorização e o que fazer numa rejeição.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. DANFE, XML, e-mail e carta de correção",
        "onde": "menu `⋯` da nota autorizada",
        "intro": "Com a nota autorizada, o faturista entrega o documento ao cliente final e aprende a corrigir o que a lei permite sem cancelar.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Reflexos da nota no financeiro, no estoque e nos painéis",
        "onde": "`Financeiro > Contas a Receber`, `Estoque > Movimentos`, `Vendas > Pedidos de Venda`",
        "intro": "A nota é o documento que movimenta: gera título, baixa estoque e entra nos indicadores. O cliente vê cada efeito no módulo de destino.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Cancelamento na ordem certa",
        "onde": "menu `⋯ > Cancelar` da nota autorizada",
        "intro": "Use a segunda nota de teste, autorizada como no bloco 4. A ordem é: estornar o recebimento, tirar o pedido da carga, cancelar a nota e, se for o caso, cancelar o pedido.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Nota gerencial e NFS-e (quando o cliente usar)",
        "onde": "menu `⋯ > Finalizar NF`, menu `⋯ > Faturar serviços (NFS-e)` do pedido e aba **NFS-e** de `Faturamento > Notas Fiscais`",
        "intro": "Só se o cliente usa nota gerencial (sem SEFAZ) ou presta serviço. A NFS-e segue um passo a mais que a NF-e: salvar, finalizar e transmitir.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#faturamento",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Faturamento: roteiro prático com o cliente",
        "texto": "Ao final, o faturista do cliente terá visto um pedido virar nota autorizada em homologação, os títulos nascendo da nota e uma segunda nota cancelada na ordem certa. Ele saberá ler o quadro de impostos, o pré-voo e a rejeição, e saberá o que só o responsável fiscal pode fazer.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Faturar o pedido",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "2. Conferir a nota: CFOP, impostos, parcelas e transporte",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "3. Salvar e ver o pedido virar Faturado",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "4. Transmitir em homologação com o responsável fiscal",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "5. DANFE, XML, e-mail e carta de correção",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "6. Reflexos da nota no financeiro, no estoque e nos painéis",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "7. Cancelamento na ordem certa",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "8. Nota gerencial e NFS-e (quando o cliente usar)",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "link",
        "material": "faturamento:checklist-implantacao",
        "titulo": "Implantação de Faturamento: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-05-faturamento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Use um pedido previamente cadastrado. Demonstre da geração da nota até a autorização. Explique carta de correção, cancelamento, inutilização e contingência.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento",
       "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Fundação concluída: empresa com regime, IE e endereço com cidade do IBGE, certificado A1 válido e **série e próximo número da NF-e** continuando o sistema antigo.",
          "nota": "**Confira:** `Configurações > Empresas` e `Faturamento > Configurações > Certificados` (botão \"Configuração Guiada\"). O número é dado na transmissão e nunca volta: série errada colide com a numeração antiga (rejeição 539). **Fonte:** FAT C, pré-requisitos; FAT-TRA-002; README da cadeia, decisão X5.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Ambiente fiscal em **Homologação**: a nota mostra a faixa \"Ambiente NF-e: HOMOLOGAÇÃO — sem validade fiscal\".",
          "nota": "**Confira:** a faixa na primeira nota e a coluna Ambiente em `Faturamento > Notas Fiscais`. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos; FAT-GER-002.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Dois pedidos de venda de teste \"TESTE FLUXO CONSULTOR\" Em aberto, **sem títulos gerados**, com CFOP que gera financeiro, condição de pagamento e plano de contas: um para transmitir, outro para cancelar.",
          "nota": "**Confira:** em `Vendas > Pedidos de Venda`, coluna TÍTULOS \"Sem títulos\" e NOTA FISCAL \"—\". **Fonte:** README da cadeia, teste ponta a ponta (passos 3 e 7); FAT-TIT-001.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "**Almoxarifado central ativo** em `Estoque > Locais` (ou local de estoque da obra).",
          "nota": "**Confira:** sem ele \"Finalizar NF\" recusa com \"Não foi possível resolver o local de estoque…\". **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "CFOPs revisados com o contador (\"Gera Financeiro\", \"Movimenta Estoque\", \"Devolução\") e NCM do produto com CST de PIS/COFINS de saída (roteiro de Fiscal feito antes).",
          "nota": "**Confira:** `Faturamento > Configurações > CFOP` e o NCM do produto. Sem o CST, a nota sai com o quadro \"Impostos não calculados\". **Fonte:** FAT C, etapa 2; fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Responsável fiscal do cliente presente e perfis definidos: o Faturista emite e transmite, mas não cancela, não emite CC-e nem inutiliza; quem cancela usa Supervisor Fiscal (ou perfil próprio).",
          "nota": "**Confira:** `Segurança > Perfis de Acesso` e o usuário do responsável fiscal. **Fonte:** README da cadeia, decisão X8; FAT C, etapa 6.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Decidido quem gera o contas a receber: o pedido ou a nota.",
          "nota": "**Confira:** ata do kickoff. Se o pedido gerou os títulos, a nota não gera de novo. **Fonte:** README da cadeia, decisão X2; FAT-TIT-001.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "O pedido virou nota com cliente, itens, CFOP, parcelas e transporte corretos, e o pedido ficou \"Faturado\".",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "A NF-e foi autorizada em homologação com o número da série configurada, com o responsável fiscal presente.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Os títulos nasceram da nota (ou do pedido, conforme a decisão X2), sem duplicar, e os reflexos no estoque e nos painéis foram conferidos ou anotados.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "DANFE, XML, e-mail e CC-e funcionaram na nota autorizada.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "A segunda nota foi cancelada na ordem certa: títulos excluídos, estoque estornado, pedido de volta.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Os bloqueios (plano de contas, pré-voo, cancelamento com título recebido e com justificativa curta) foram demonstrados.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Gerar NF-e ou NFS-e a partir de um pedido",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
          ]
         },
         {
          "texto": "Transmitir e acompanhar retorno da autorização",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
          ]
         },
         {
          "texto": "Emitir DANFE e XML",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
          ]
         },
         {
          "texto": "Realizar carta de correção e cancelamento (quando aplicável)",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
          ]
         },
         {
          "texto": "Compreender impactos nos módulos Financeiro, Estoque e Expedição",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento",
       "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Conecta a área comercial às etapas fiscais e operacionais.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#faturamento"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só ambiente de teste (homologação) e registros com \"TESTE FLUXO CONSULTOR\". **Nota fiscal só é transmitida, cancelada ou corrigida com o responsável fiscal do cliente.**",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "**Transmitir** fica a um clique na linha (avião de papel) e é irreversível, mesmo em homologação. **Excluir** está no mesmo menu de Ver Timeline e Anexos.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "O pedido fica \"Faturado\" assim que a nota é **salva**, mesmo Em Aberto: confira sempre o status da nota.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "A lista de notas abre filtrada em \"Em Aberto\"; os cartões de totais seguem esse filtro. Nota autorizada ou cancelada só aparece trocando o Status.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Série errada antes da primeira transmissão colide com a numeração antiga (rejeição 539). O número dado na transmissão nunca volta.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Hoje o sistema ainda recalcula a devolução pelas regras atuais, sem espelhar os tributos da nota original: confira os valores com o contador.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Pedido de contrato de fornecimento só vira nota depois do faturamento no contrato: \"Este pedido está vinculado ao Contrato de Fornecimento #N…\".",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Transmissão em lote: não venda como PRO; hoje o sistema libera em todas as versões.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "O avião de papel na linha é Transmitir: é irreversível, mesmo em homologação.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-07-faturamento.json#12"
          ]
         },
         {
          "texto": "Excluir fica no mesmo menu de Ver Timeline e Anexos.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-07-faturamento.json#12"
          ]
         },
         {
          "texto": "Transmitir, cancelar e inutilizar: só o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-07-faturamento.json#12"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-07-faturamento.json#12"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "No nível, use um CFOP que gere financeiro.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/compra-em-nome-do-cliente.json#34"
          ]
         },
         {
          "texto": "O cliente do pedido é o mesmo do contrato.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/compra-em-nome-do-cliente.json#34"
          ]
         },
         {
          "texto": "A origem do abatimento não muda.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/compra-em-nome-do-cliente.json#34"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/compra-em-nome-do-cliente.json#34"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Estoque na nota: a gestora diz que a autorização ou a finalização baixa o estoque (FAT-TRA-008, FAT B). No fluxo antigo (conferido em 19/10/2026), a finalização não gerou movimento em `Estoque > Movimentos`. Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Finalizar NF: o fluxo antigo trata \"Finalizar NF\" como etapa para encerrar a nota sem transmitir. A gestora diz que a nota finalizada é gerencial, não vai à SEFAZ e depois só pode ser cancelada (FAT-FIN-001/002/004, FAT B). Conferir na tela se uma nota finalizada ainda pode ser transmitida, antes de ensinar a ordem.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Títulos da nota: a gestora diz que a nota gera os títulos na autorização ou na finalização (FAT-TIT-001). No fluxo antigo, a nota finalizada não teve título conferido e os títulos do teste vieram de \"Gerar Títulos\" do pedido depois de Entregue. Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Histórico da nota: a gestora espera evento no histórico depois da autorização (FAT D). No fluxo antigo, \"Ver Timeline\" apareceu vazia. Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         },
         {
          "texto": "Transmissão, rejeição, CC-e, cancelamento, reenvio de e-mail, NFS-e e Dashboard Faturamento ainda não foram executados na tela: os nomes de ação vêm do código lido pela gestora.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento",
       "guia:videos/roteiros/consultor-07-faturamento.json#12",
       "guia:videos/roteiros/compra-em-nome-do-cliente.json#34"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "faturamento:video-consultor",
        "titulo": "Faturamento: do pedido à nota finalizada",
        "status": "disponivel",
        "url": "/videos/consultor-07-faturamento.mp4",
        "duracao_s": 198,
        "poster": "/videos/consultor-07-faturamento.jpg",
        "legenda": "/videos/consultor-07-faturamento.vtt",
        "resumo": "Faturar o pedido, conferir a nota e finalizar sem transmitir.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-07-faturamento.json"
        ]
       },
       {
        "tipo": "video",
        "material": "faturamento:video-consultor-2",
        "titulo": "Compra em nome do cliente: Faturamento em Nível e Contrato de Fornecimento",
        "status": "disponivel",
        "url": "/videos/compra-em-nome-do-cliente.mp4",
        "duracao_s": 230,
        "poster": "/videos/compra-em-nome-do-cliente.jpg",
        "legenda": "/videos/compra-em-nome-do-cliente.vtt",
        "resumo": "Obra com rateio 40/60: o seu pedido segue o fluxo normal, o do material é encerrado e vira saldo no contrato, abatido pelas compras do cliente.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/compra-em-nome-do-cliente.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-07-faturamento.json",
       "guia:videos/roteiros/compra-em-nome-do-cliente.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "faturamento:checklist-inicial",
        "titulo": "Faturamento e Fiscal (consulta)",
        "status": "disponivel",
        "url": "/checklists/estagiarios/12-faturamento-fiscal.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "link",
        "material": "faturamento:fluxo-principal",
        "titulo": "Fluxo principal de Faturamento: do pedido à nota finalizada",
        "status": "disponivel",
        "url": "/checklists/estagiarios/fluxo-principal-faturamento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-faturamento-estagiario"
        ]
       },
       {
        "tipo": "link",
        "material": "faturamento:checklist-implantacao",
        "titulo": "Implantação de Faturamento: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-05-faturamento.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como faturar o pedido e finalizar a nota sem transmitir",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-faturar-o-pedido-e-finalizar-a-nota.md"
          ]
         },
         {
          "texto": "08 Manual Faturamento e Fiscal",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx"
          ]
         },
         {
          "texto": "01-notas-fiscais",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/faturamento/01-notas-fiscais.docx"
          ]
         },
         {
          "texto": "02-calculos-de-impostos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/faturamento/02-calculos-de-impostos.docx"
          ]
         },
         {
          "texto": "03-paineis-e-demonstrativos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/faturamento/03-paineis-e-demonstrativos.docx"
          ]
         },
         {
          "texto": "04-controle-de-terceiros",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/faturamento/04-controle-de-terceiros.docx"
          ]
         },
         {
          "texto": "05-configuracoes-fiscais-e-envios",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/faturamento/05-configuracoes-fiscais-e-envios.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-faturar-o-pedido-e-finalizar-a-nota.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/faturamento/01-notas-fiscais.docx",
         "harness:conhecimento/Roteiros Treinamento/faturamento/02-calculos-de-impostos.docx",
         "harness:conhecimento/Roteiros Treinamento/faturamento/03-paineis-e-demonstrativos.docx",
         "harness:conhecimento/Roteiros Treinamento/faturamento/04-controle-de-terceiros.docx",
         "harness:conhecimento/Roteiros Treinamento/faturamento/05-configuracoes-fiscais-e-envios.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
       "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-faturamento-estagiario",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-faturamento",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-faturar-o-pedido-e-finalizar-a-nota.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/faturamento/01-notas-fiscais.docx",
       "harness:conhecimento/Roteiros Treinamento/faturamento/02-calculos-de-impostos.docx",
       "harness:conhecimento/Roteiros Treinamento/faturamento/03-paineis-e-demonstrativos.docx",
       "harness:conhecimento/Roteiros Treinamento/faturamento/04-controle-de-terceiros.docx",
       "harness:conhecimento/Roteiros Treinamento/faturamento/05-configuracoes-fiscais-e-envios.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "fiscal",
   "ordem": 13,
   "titulo": "Fiscal",
   "subtitulo": "Notas fiscais NF-e/NFS-e, status e cuidados.",
   "cor": "#c62828",
   "icone": "fiscal",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#fiscal",
    "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
   ],
   "materiais": [
    {
     "modulo": "fiscal",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fiscal:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "fiscal",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx"
     ],
     "id": "fiscal:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "fiscal",
     "duracao_s": null,
     "url": "/checklists/estagiarios/12-faturamento-fiscal.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
     ],
     "id": "fiscal:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Faturamento e Fiscal (consulta)",
     "status": "disponivel"
    },
    {
     "modulo": "fiscal",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-06-fiscal.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
     ],
     "id": "fiscal:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação do Fiscal: roteiro prático com o cliente e o contador",
     "status": "disponivel"
    },
    {
     "modulo": "fiscal",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fiscal:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Vídeo avançado",
     "status": "em-preparacao"
    },
    {
     "modulo": "fiscal",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx"
     ],
     "id": "fiscal:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Faturamento e Fiscal (consulta)",
        "texto": "Onde o pedido vira nota fiscal. Aqui o estagiário consulta; emissão e transmissão são feitas por quem é responsável.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Encontrar uma nota fiscal, entender seus status e saber quais ações têm efeito fiscal e nunca devem ser feitas em treino.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Consultar notas fiscais",
        "onde": "`Faturamento > Notas Fiscais` (o módulo já abre nesta tela)",
        "intro": null,
        "passos": [
         {
          "texto": "Escolher a aba **NF-e** (produto) ou **NFS-e** (serviço).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler os cartões Total, Em Aberto, Autorizadas, Canceladas e Rejeitadas.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Trocar o filtro **Status** (abre em \"Em Aberto\") e o filtro **Ambiente** (Homologação/Produção).",
          "nota": "Notas autorizadas e canceladas só aparecem com o Status certo.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Pesquisar por número ou cliente.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Conhecer as ações de uma nota (sem executar)",
        "onde": "menu `...` da linha",
        "intro": null,
        "passos": [
         {
          "texto": "Reconhecer as opções: Editar, Finalizar NF, Preview da DANFE, Duplicar, Ver Timeline, Anexos e Excluir.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Identificar o botão **Transmitir** (avião de papel) direto na linha e saber que ele envia a nota à SEFAZ.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Saber como o pedido vira nota",
        "onde": "menu `⋯ > Faturar` do pedido",
        "intro": null,
        "passos": [
         {
          "texto": "Saber que a nota nasce do pedido: `⋯ > Faturar` importa os itens e abre \"Nova NF-e\" com cliente, CFOP e parcelas do pedido.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Saber que, ao salvar a nota, o pedido já aparece como \"Faturado\" — mesmo com a nota ainda Em Aberto. Confira sempre o status da nota.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Reconhecer o quadro \"Impostos não calculados no item\" e o motivo que ele mostra (ex.: CST de PIS/COFINS ausente na NCM): é assunto do fiscal.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da configuração fiscal à conferência dos impostos.",
        "etapas": [
         "Configuração Fiscal",
         "Venda",
         "Faturamento",
         "Compra",
         "Recebimento",
         "Conferência dos Impostos"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: faturar o seu pedido (sem transmitir)",
        "onde": "menu `⋯ > Faturar` do pedido",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. Só faça com **autorização do supervisor** e com a faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" visível: a nota nunca pode ser transmitida no treino. O produto precisa de NCM com CST de PIS/COFINS de saída, senão a nota sai com \"Impostos não calculados\". Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "No seu pedido, abrir `⋯ > Faturar`: abre a nova nota com a faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" e o diálogo **Selecionar Itens para Importar** (importe os itens do pedido). Em **Observações e Informações Adicionais**, preencher as **Observações Internas** e clicar em **Salvar e Permanecer** (também há **Salvar** e **Cancelar**).",
          "nota": "O pedido passa a \"Faturado\" com a coluna NOTA FISCAL preenchida, mesmo com a nota ainda Em Aberto. Pode aparecer o aviso \"NCM-Estado não configurado para o produto\" (UF de origem e de destino): peça ao supervisor, ele pode bloquear a nota. **Não clique** em Transmitir.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "link",
        "material": "fiscal:checklist-inicial",
        "titulo": "Faturamento e Fiscal (consulta)",
        "status": "disponivel",
        "url": "/checklists/estagiarios/12-faturamento-fiscal.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:fiscal",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Fiscal e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: menu `⋯ > Faturar` do pedido"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Faturamento > Notas Fiscais` (o módulo já abre nesta tela)"
         },
         {
          "id": "acessar-3",
          "texto": "Sei acessar: menu `...` da linha"
         },
         {
          "id": "acessar-4",
          "texto": "Sei acessar: módulo `Fiscal`"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 1. Preparar seus dados: faturar o seu pedido (sem transmitir)"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 2. Consultar notas fiscais"
         },
         {
          "id": "executei-7",
          "texto": "Executei: 3. Conhecer as ações de uma nota (sem executar)"
         },
         {
          "id": "executei-8",
          "texto": "Executei: 4. Saber como o pedido vira nota"
         },
         {
          "id": "executei-9",
          "texto": "Executei: 5. Saber onde ficam os cadastros fiscais"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:fiscal",
        "total": 11,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Centralizar e automatizar cálculos tributários. Reduzir erros e divergências entre pedido e nota fiscal.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Motor tributário do Faktory Flow. Usado por todos os processos que envolvem impostos.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "No início da implantação dos processos fiscais, antes de Vendas, Compras e Faturamento.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Faturamento: notas fiscais e a nova NF-e",
        "texto": "Faturamento › Notas Fiscais (abas NF-e e NFS-e). A nota nasce do pedido pelo menu `⋯ › Faturar` do pedido, em Vendas › Pedidos de Venda, e abre em /faturamento/notas/novo.",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-faturamento-notas-fiscais.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal",
       "harness:conhecimento/produto/funcional/funcional-faturamento-notas-fiscais.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da configuração fiscal à conferência dos impostos.",
        "etapas": [
         "Configuração Fiscal",
         "Venda",
         "Faturamento",
         "Compra",
         "Recebimento",
         "Conferência dos Impostos"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Empresa e regime",
        "onde": "`Configurações > Empresas`",
        "intro": "O regime da empresa é a primeira decisão do motor de impostos: sem ele nada calcula. Vem antes de CFOP e NCM porque muda o caminho inteiro (CSOSN ou CST).",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. CFOP e textos fiscais",
        "onde": "`Fiscal > Configurações > CFOP` (também em `Faturamento > Configurações > CFOP`) e `Fiscal > Configurações > Textos Fiscais`",
        "intro": "O CFOP carrega os CSTs padrão e liga ou desliga cada imposto. Aqui se completam os campos fiscais dos CFOPs que o Faturamento já revisou quanto a financeiro e estoque.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. NCM e regras de tributação por estado",
        "onde": "`Fiscal > Configurações > NCM` (modal \"NCM por Estado\" na mesma tela)",
        "intro": "O NCM traz as alíquotas e os CSTs de cada produto; o NCM por Estado traz as exceções por UF de destino (ST, DIFAL, benefício). É a planilha do contador entrando no sistema.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Onboarding e Diagnóstico Fiscal",
        "onde": "`Fiscal > Onboarding Fiscal` e `Fiscal > Diagnóstico Fiscal`",
        "intro": "Depois de configurar, o sistema confere a empresa e as tabelas. O cliente aprende que \"liberado\" no Onboarding não garante cálculo certo: só os testes dos blocos seguintes garantem.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Provar o cálculo no pedido de venda",
        "onde": "`Vendas > Pedidos de Venda > Novo Pedido`",
        "intro": "O motor de impostos é chamado ao salvar o pedido, ao alterar um item e no \"Recalcular\". O contador confere os valores na aba de impostos do item, operação por operação.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Provar o cálculo na nota",
        "onde": "menu `⋯ > Faturar` do pedido e `Faturamento > Notas Fiscais`",
        "intro": "Na nota, o cálculo é refeito ao importar os itens e ao trocar o CFOP. O contador vê o ajuste manual e a transmissão em homologação de cada operação.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. O aviso quando falta configuração",
        "onde": "pedido de venda ou nota de teste, aba de impostos do item",
        "intro": "O consultor provoca a falta de cadastro de propósito para o cliente reconhecer o aviso, saber onde corrigir e ver o \"Recalcular\" funcionar.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Serviço, obrigações acessórias e perfis",
        "onde": "`Fiscal > Regras Fiscais de Serviço`, `Fiscal > Escrituração SPED`, `Fiscal > Sintegra`, `Fiscal > GNRE`",
        "intro": "Fecha o roteiro com o que não é cálculo de mercadoria: ISS e retenções do serviço, quem entrega cada obrigação e quem pode mexer nos cadastros fiscais.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação do Fiscal: roteiro prático com o cliente e o contador",
        "texto": "Ao final, o cliente e o contador terão visto cada operação típica (venda interna, interestadual, a não contribuinte, com ST, serviço) calculada sem aviso no item e com valores conferidos. Eles saberão onde cada resposta do contador entra no sistema e como ler o aviso de imposto não calculado.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Empresa e regime",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "2. CFOP e textos fiscais",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "3. NCM e regras de tributação por estado",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "4. Onboarding e Diagnóstico Fiscal",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "5. Provar o cálculo no pedido de venda",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "6. Provar o cálculo na nota",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "7. O aviso quando falta configuração",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "8. Serviço, obrigações acessórias e perfis",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "link",
        "material": "fiscal:checklist-implantacao",
        "titulo": "Implantação do Fiscal: roteiro prático com o cliente e o contador",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-06-fiscal.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente cadastros fiscais: NCM, CFOP, CST/CSOSN, CEST, perfis fiscais, textos fiscais, regras de tributação. Demonstre aplicação dos impostos no pedido de venda. Apresente faturamento e envio à SEFAZ. Finalize com compras e recebimentos (impostos de entrada).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal",
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Fundação concluída: empresas com regime, CNAE, IE e endereço com IBGE; produtos com NCM, origem e categoria; participantes com UF, IE e as marcas \"Não Contribuinte\" e \"Produtor Rural\" revisadas.",
          "nota": "**Confira:** checklist da Fundação assinado e uma amostra de 10 clientes. **Fonte:** FIS C, pré-requisitos; FIS D, seção 2 (FIS-CTX-007).",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "**Contador do cliente presente**, com a planilha \"NCM × tributação\" e a lista de CFOPs por operação (CST/CSOSN de ICMS, IPI, PIS, COFINS, CBS, IBS).",
          "nota": "**Confira:** documentos recebidos antes da sessão. O consultor não decide tributação: toda alíquota, CST, MVA e benefício vem do contador. **Fonte:** FIS C, \"Do cliente e do contador\".",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Módulo `fiscal` na licença e versão compatível com o regime de todas as empresas; cliente ciente do que é PRO (Escrituração SPED, Perfil SUFRAMA, Mapa de Apuração, MDF-e).",
          "nota": "**Confira:** *Minha Assinatura* e o menu Fiscal sem cadeado. **Fonte:** FIS C, comerciais; FIS D, seção 1.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Ambiente fiscal em **Homologação** (faixa \"Ambiente NF-e: HOMOLOGAÇÃO\" na nota).",
          "nota": "**Confira:** a faixa na nota de teste. **Fonte:** fluxo antigo \"Fluxo de faturamento e fiscal\", pré-requisitos.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Clientes de teste \"TESTE FLUXO CONSULTOR\" para cada operação: PJ com IE na mesma UF, PJ com IE em outra UF e PF não contribuinte em outra UF.",
          "nota": "**Confira:** UF, IE e \"Não Contribuinte\" de cada um. **Fonte:** FIS D, seção 3.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Pré-requisito",
        "texto": "Informações fiscais alinhadas com o cliente e contador (regime tributário, regras, NCM, CFOP, CST/CSOSN).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal",
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Todas as empresas com regime, tipo de atividade, PIS/COFINS e CBS/IBS conferidos pelo contador.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "CFOPs, NCMs e linhas de NCM por Estado das operações do cliente cadastrados conforme a planilha assinada pelo contador.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Onboarding Fiscal sem pendência obrigatória em cada empresa.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Cada operação típica calculada no pedido e na nota sem aviso no item e com valores conferidos; uma NF-e de cada transmitida em homologação.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "O cliente reconheceu o quadro \"Impostos não calculados no item\" e os avisos de MVA, CST e regime, e corrigiu com \"Recalcular\".",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Obrigações acessórias combinadas por escrito e lacunas comunicadas ao contador.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Cadastrar e consultar informações fiscais",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         },
         {
          "texto": "Compreender regras tributárias",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         },
         {
          "texto": "Identificar cálculo de impostos na venda",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         },
         {
          "texto": "Emitir notas com configurações cadastradas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         },
         {
          "texto": "Realizar compras com cálculo de impostos de entrada",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         },
         {
          "texto": "Conferir divergências fiscais no recebimento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Faturamento, Compras, Recebimento e Financeiro",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal",
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Motor tributário do Faktory Flow. Usado por todos os processos que envolvem impostos.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#fiscal"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só ambiente de teste (homologação) e registros com \"TESTE FLUXO CONSULTOR\". **Nota fiscal só é transmitida com o responsável fiscal do cliente.** O consultor não decide tributação: tudo vem do contador.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "O documento salva com imposto zerado e aviso no item quando falta cadastro: o teste não passa só porque salvou.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "\"CBS (%)\" e \"IBS (%)\" preenchidos com 8,80 e 17,70 em 2026 fazem o imposto sair dezenas de vezes maior.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "A lista padrão de CFOP não traz CST de ICMS, PIS e COFINS: empresa do Presumido ou do Real fica com aviso \"Sem CST\" até preencher.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "O Onboarding ainda diz que as pendências \"bloqueiam a liberação para operar\"; hoje ele só informa, e \"liberado\" não garante cálculo certo.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Hoje o sistema ainda não leva para a nota o texto fiscal ligado ao NCM, ao estado ou ao perfil SUFRAMA, e usa 12% de alíquota interestadual em todas as UFs: conferir com o contador.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Não usar CFOP 59xx/69xx (exceto 5949/6949) em NF-e de mercadoria sem testar: hoje ainda dispara ISS.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Item sem CST: o checklist D da gestora diz que a transmissão é barrada; o documento B da gestora (D-31344.4) diz que a transmissão pede confirmação (\"Transmitir mesmo assim?\"); o Faturamento C lista \"Item N: ICMS CST/CSOSN obrigatório\" no pré-voo. Conferir na tela qual comportamento vale.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Aviso \"NCM-Estado não configurado para o produto\": visto na tela pela trilha dos estagiários (pode bloquear a nota), mas não está nas mensagens da gestora, que diz que sem NCM × Estado o DIFAL usa a alíquota do NCM. Conferir na tela se bloqueia.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         },
         {
          "texto": "Nenhuma tela do módulo Fiscal (CFOP, NCM, Textos Fiscais, Onboarding, Diagnóstico, SPED) foi aberta nos fluxos antigos: os rótulos de campos vêm do código lido pela gestora. Conferir na tela antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "fiscal:checklist-inicial",
        "titulo": "Faturamento e Fiscal (consulta)",
        "status": "disponivel",
        "url": "/checklists/estagiarios/12-faturamento-fiscal.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#faturamento"
        ]
       },
       {
        "tipo": "link",
        "material": "fiscal:checklist-implantacao",
        "titulo": "Implantação do Fiscal: roteiro prático com o cliente e o contador",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-06-fiscal.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "08 Manual Faturamento e Fiscal",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx"
          ]
         },
         {
          "texto": "01-painel-onboarding-e-diagnostico",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/fiscal/01-painel-onboarding-e-diagnostico.docx"
          ]
         },
         {
          "texto": "02-cadastros-fiscais",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/fiscal/02-cadastros-fiscais.docx"
          ]
         },
         {
          "texto": "03-regras-fiscais-de-servicos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/fiscal/03-regras-fiscais-de-servicos.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/fiscal/01-painel-onboarding-e-diagnostico.docx",
         "harness:conhecimento/Roteiros Treinamento/fiscal/02-cadastros-fiscais.docx",
         "harness:conhecimento/Roteiros Treinamento/fiscal/03-regras-fiscais-de-servicos.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#faturamento",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-fiscal",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/08_Manual_Faturamento_e_Fiscal_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/fiscal/01-painel-onboarding-e-diagnostico.docx",
       "harness:conhecimento/Roteiros Treinamento/fiscal/02-cadastros-fiscais.docx",
       "harness:conhecimento/Roteiros Treinamento/fiscal/03-regras-fiscais-de-servicos.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "financeiro",
   "ordem": 14,
   "titulo": "Financeiro",
   "subtitulo": "Contas a receber e a pagar, fluxo de caixa e DRE.",
   "cor": "#2e7d32",
   "icone": "financeiro",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#financeiro",
    "guia:scripts/dados-checklists-estagiarios.mjs#financeiro",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
   ],
   "materiais": [
    {
     "modulo": "financeiro",
     "duracao_s": 184,
     "url": "/videos/consultor-08-financeiro.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-08-financeiro.json"
     ],
     "id": "financeiro:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Financeiro: do título ao fluxo de caixa",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/10_Manual_Financeiro_Timbrado.docx"
     ],
     "id": "financeiro:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": "/checklists/estagiarios/13-financeiro.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
     ],
     "id": "financeiro:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Financeiro (consulta)",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": "/checklists/estagiarios/fluxo-principal-financeiro.html",
     "fontes": [
      "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-financeiro-estagiario"
     ],
     "id": "financeiro:fluxo-principal",
     "tipo": "fluxo",
     "jornada": "inicial",
     "titulo": "Fluxo principal do Financeiro: do título ao fluxo de caixa",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": "#inicial/financeiro",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-receber",
      "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-pagar",
      "guia:videos/roteiros/consultor-08-financeiro.json"
     ],
     "id": "financeiro:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-07-financeiro.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
     ],
     "id": "financeiro:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação do Financeiro: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": 184,
     "url": "/videos/consultor-08-financeiro.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-08-financeiro.json"
     ],
     "id": "financeiro:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Financeiro: do título ao fluxo de caixa",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": "#consultor/financeiro",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md",
      "harness:conhecimento/produto/regras-negocio/regra-financeiro-baixa-atualiza-saldos-e-extrato.md",
      "harness:conhecimento/produto/regras-negocio/regra-financeiro-baixa-parcial-cria-titulo-residual.md",
      "harness:conhecimento/produto/regras-negocio/regra-financeiro-contas-a-receber-filtro-padrao-em-aberto.md",
      "harness:conhecimento/produto/regras-negocio/regra-financeiro-estornar-baixa-restaura-o-titulo.md",
      "harness:conhecimento/produto/regras-negocio/regra-financeiro-meio-de-pagamento-boleto-exige-conta-emissora.md",
      "harness:conhecimento/produto/regras-negocio/regra-financeiro-titulo-manual-e-gerado-duplicam-a-receita.md",
      "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-titulos-quando-esta-habilitado.md",
      "guia:videos/roteiros/consultor-08-financeiro.json"
     ],
     "id": "financeiro:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "financeiro",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/10_Manual_Financeiro_Timbrado.docx"
     ],
     "id": "financeiro:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Financeiro (consulta)",
        "texto": "O financeiro recebe os títulos que nascem das vendas, das notas e dos recebimentos de compra.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Consultar títulos a receber e a pagar, entender de onde eles vêm e ler o fluxo de caixa e os demonstrativos.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "financeiro:video-inicial",
        "titulo": "Financeiro: do título ao fluxo de caixa",
        "status": "disponivel",
        "url": "/videos/consultor-08-financeiro.mp4",
        "duracao_s": 184,
        "poster": "/videos/consultor-08-financeiro.jpg",
        "legenda": "/videos/consultor-08-financeiro.vtt",
        "resumo": "Gerar os títulos, receber e ler o fluxo de caixa.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-08-financeiro.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-08-financeiro.json"
      ]
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Partir dos indicadores da tela Início",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Ler \"Títulos a receber em aberto\" e \"Títulos a pagar em aberto\" em Tarefas do dia.",
          "nota": "O atalho leva a Financeiro > Contas a Receber.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Ler Recebido no mês, A receber e A pagar no Resumo do negócio.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Contas a Receber",
          "nota": "Financeiro › Contas a Receber",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-receber"
          ]
         },
         {
          "texto": "Contas a Pagar",
          "nota": "Financeiro › Contas a Pagar",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-pagar"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-receber",
         "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-pagar"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-receber",
       "harness:conhecimento/glossario/telas.yaml#financeiro.contas-a-pagar"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da geração automática de títulos à análise de resultado.",
        "etapas": [
         "Pedido de Venda/NF",
         "Geração automática dos títulos",
         "Cobrança (boleto/PIX)",
         "Recebimento ou pagamento",
         "Conciliação bancária",
         "Fluxo de Caixa",
         "DRE e Resultado por Obra"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: gerar os títulos do seu pedido",
        "onde": "menu `⋯ > Gerar Títulos` do pedido e `Financeiro > Contas a Receber`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. Os títulos nascem do pedido e dependem de uma conta bancária e de um meio de pagamento configurados. Se o meio da parcela for do tipo **Boleto**, o sistema exige conta emissora: avise o supervisor. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "No seu pedido, abrir `⋯ > Gerar Títulos` e confirmar.",
          "nota": "Um título por parcela. O item fica habilitado em pedido Em aberto ou Entregue sem títulos; fica desabilitado quando o pedido está Faturado (\"Pedido já faturado\") ou já tem títulos (sem explicação na tela).",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir `Financeiro > Contas a Receber`, limpar o filtro **Status** (ele vem em \"Em aberto\") e pesquisar o **Documento** do seu pedido (ex.: PV-000033).",
          "nota": "Colunas: PARTICIPANTE, DOCUMENTO, PARCELA, DATA DE VENCIMENTO, STATUS, VALOR TOTAL e AÇÕES. Valor e vencimento iguais à parcela; a coluna TÍTULOS do pedido passa a \"Gerados\".",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
        ]
       },
       {
        "tipo": "link",
        "material": "financeiro:checklist-inicial",
        "titulo": "Financeiro (consulta)",
        "status": "disponivel",
        "url": "/checklists/estagiarios/13-financeiro.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
        ]
       },
       {
        "tipo": "link",
        "material": "financeiro:fluxo-principal",
        "titulo": "Fluxo principal do Financeiro: do título ao fluxo de caixa",
        "status": "disponivel",
        "url": "/checklists/estagiarios/fluxo-principal-financeiro.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-financeiro-estagiario"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#financeiro",
       "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-financeiro-estagiario"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:financeiro",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Financeiro e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: menu `⋯ > Gerar Títulos` do pedido e `Financeiro > Contas a Receber`"
         },
         {
          "id": "acessar-2",
          "texto": "Sei acessar: `Financeiro > Contas a Receber` e `Contas a Pagar`"
         },
         {
          "id": "executei-3",
          "texto": "Executei: 1. Preparar seus dados: gerar os títulos do seu pedido"
         },
         {
          "id": "executei-4",
          "texto": "Executei: 2. Partir dos indicadores da tela Início"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 3. Consultar títulos"
         },
         {
          "id": "executei-6",
          "texto": "Executei: 4. Ler a visão de gestão"
         },
         {
          "id": "video",
          "texto": "Assisti ao vídeo introdutório"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro",
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-08-financeiro.json"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#financeiro",
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-08-financeiro.json"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:financeiro",
        "total": 9,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Gerenciar movimentações financeiras — contas a receber, contas a pagar, cobranças, pagamentos, conciliação bancária e fluxo de caixa.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Recebe informações de Vendas, Faturamento, Compras e Recebimento. Elimina lançamentos manuais.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após Vendas, Faturamento e configurações financeiras (plano de contas, contas bancárias, meios e condições de pagamento).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Financeiro: Contas a Receber, Contas a Pagar, Saldos e Fluxo de Caixa",
        "texto": "Financeiro › Contas a Receber, Contas a Pagar (com a aba Pagamentos), Saldos, Extrato, Fluxo de Caixa, DRE, Budget vs Realizado e Painel Financeiro de Projetos. Configurações: Contas Bancárias, Meios de Pagamento, Planos de Conta, Portadores, Instruções Bancárias e Boleto.",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#financeiro",
       "harness:conhecimento/produto/funcional/funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Finalizar a NF-e gera os títulos das parcelas",
        "texto": "Ao **Finalizar NF** de uma nota que veio do pedido, o sistema cria sozinho em **Financeiro › Contas a Receber** um título por parcela, com o **Documento** \"NF - <número da nota>\" e os vencimentos e valores das parcelas do pedido. No pedido, a coluna **TÍTULOS** passa a \"Gerados\" e a coluna **NOTA FISCAL** mostra a nota. O menu `⋯` do pedido faturado troca o **Gerar Títulos** por \"Pedido já faturado\", desabilitado, e mostra \"Já faturado: Este pedido já possui nota fiscal emitida\".",
        "confirmar": "Faturamento › Notas Fiscais › `⋯` › Finalizar NF; depois Financeiro › Contas a Receber (pesquisar \"NF - <número>\") e Vendas › Pedidos de Venda (limpar o filtro Status).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A baixa atualiza Saldos e Extrato na hora",
        "texto": "Receber um título aumenta, na hora, o saldo da conta bancária em **Financeiro › Saldos** exatamente pelo valor baixado, e o **Extrato** da conta mostra o crédito do dia. Estornar a baixa reduz o saldo na mesma medida. Pagar um título em Contas a Pagar (campos Conta Bancária, Data Pagamento, valores, Meio de Pagamento e Valor Pago) diminui o saldo e cria o débito no Extrato. Não existe item \"Conciliação\" no menu; o mais próximo é o Extrato.",
        "confirmar": "Financeiro › Saldos e Extrato, antes e depois de cada baixa.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-financeiro-baixa-atualiza-saldos-e-extrato.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Baixa parcial cria um título residual",
        "texto": "Em **Receber** (Financeiro › Contas a Receber), informar um **Valor Recebido** menor que o do título gera \"Baixa parcial realizada; título residual criado\": o original fica **Recebido** e nasce um título com o saldo, no mesmo vencimento, com o **próximo número de parcela livre** (/002 quando o título era único; na v1.22.13, numa nota de duas parcelas, o residual da /001 nasceu como /003). A soma dos dois é o valor original. A baixa total do residual mostra \"Título recebido com sucesso\".",
        "confirmar": "Financeiro › Contas a Receber, após a baixa.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-financeiro-baixa-parcial-cria-titulo-residual.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Contas a Receber abre filtrada em Em aberto",
        "texto": "A lista **Financeiro › Contas a Receber** vem com o filtro **Status** em \"Em aberto\", então títulos recebidos só aparecem limpando o filtro. Colunas: PARTICIPANTE, DOCUMENTO, PARCELA, DATA DE VENCIMENTO, STATUS, VALOR TOTAL e AÇÕES. O DOCUMENTO do título gerado é o número do pedido de venda.",
        "confirmar": "Financeiro › Contas a Receber.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-financeiro-contas-a-receber-filtro-padrao-em-aberto.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Estornar a baixa devolve o título a Em aberto",
        "texto": "**Estornar** uma baixa volta o título a **Em aberto** e limpa os dados do recebimento. Estornar a baixa parcial devolve o título ao valor original e o residual **/002** deixa de existir. Em janelas estreitas o diálogo de estorno pode abrir fora da área visível.",
        "confirmar": "Financeiro › Contas a Receber › título recebido › Estornar.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-financeiro-estornar-baixa-restaura-o-titulo.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Meio de pagamento do tipo Boleto exige conta emissora",
        "texto": "Ao **Gerar Títulos**, se o meio de pagamento da parcela é do tipo **Boleto**, o sistema exige uma conta bancária emissora de boletos e recusa com \"Parcela 1: meio de pagamento Boleto exige uma conta bancária…\". A mensagem diz Boleto mesmo quando o meio se chama \"Duplicata Mercantil\" e está cadastrado como tipo Boleto. Os tipos disponíveis em Configurações › Meios de Pagamento são Cartão de Crédito/Débito, Dinheiro, PIX, Boleto, Transferência, Cheque e Outros. Mudar o tipo altera o que sai na nota e é decisão do responsável fiscal.",
        "confirmar": "Financeiro › Configurações › Meios de Pagamento (campo Tipo) e Vendas › Pedidos de Venda › Gerar Títulos.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-financeiro-meio-de-pagamento-boleto-exige-conta-emissora.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Título manual e título gerado do mesmo pedido duplicam a receita",
        "texto": "Se existem um título lançado à mão e o título gerado pelo pedido para o mesmo recebível, a **DRE**, o **Painel Financeiro de Projetos** e o card \"Recebido no mês\" somam os dois. O card **Recebido no mês** do Início também soma o valor original do título numa baixa parcial (baixa de 400 de um título de 865 somou 865).",
        "confirmar": "Financeiro › DRE, Painel Financeiro de Projetos e a tela Início, conferindo contra o Extrato.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-financeiro-titulo-manual-e-gerado-duplicam-a-receita.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Quando Gerar Títulos está habilitado no pedido",
        "texto": "No menu `⋯` do pedido, **Gerar Títulos** fica habilitado em pedido **Em aberto** ou **Entregue** que ainda não tem títulos. Fica desabilitado quando o pedido está **Faturado** ou **Lib. Expedição** (\"Pedido já faturado\") e quando o pedido já tem títulos, caso em que a tela não explica o motivo. Gera um título por parcela.",
        "confirmar": "Vendas › Pedidos de Venda › menu `⋯` e coluna TÍTULOS (Gerados / Sem títulos).",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-titulos-quando-esta-habilitado.md"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-faturamento-finalizar-nf-gera-os-titulos.md",
       "harness:conhecimento/produto/regras-negocio/regra-financeiro-baixa-atualiza-saldos-e-extrato.md",
       "harness:conhecimento/produto/regras-negocio/regra-financeiro-baixa-parcial-cria-titulo-residual.md",
       "harness:conhecimento/produto/regras-negocio/regra-financeiro-contas-a-receber-filtro-padrao-em-aberto.md",
       "harness:conhecimento/produto/regras-negocio/regra-financeiro-estornar-baixa-restaura-o-titulo.md",
       "harness:conhecimento/produto/regras-negocio/regra-financeiro-meio-de-pagamento-boleto-exige-conta-emissora.md",
       "harness:conhecimento/produto/regras-negocio/regra-financeiro-titulo-manual-e-gerado-duplicam-a-receita.md",
       "harness:conhecimento/produto/regras-negocio/regra-vendas-gerar-titulos-quando-esta-habilitado.md"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da geração automática de títulos à análise de resultado.",
        "etapas": [
         "Pedido de Venda/NF",
         "Geração automática dos títulos",
         "Cobrança (boleto/PIX)",
         "Recebimento ou pagamento",
         "Conciliação bancária",
         "Fluxo de Caixa",
         "DRE e Resultado por Obra"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Contas, meios de pagamento e plano de contas",
        "onde": "`Financeiro > Configurações` (Contas Bancárias, Meios de Pagamento, Planos de Conta) e `Financeiro > Saldos`",
        "intro": "Antes de qualquer título, o cliente vê onde o dinheiro vai cair: a conta bancária, o tipo do meio de pagamento e a conta analítica do plano. Vem primeiro porque é o que trava a geração dos títulos.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Títulos nascendo do pedido",
        "onde": "`Vendas > Pedidos de Venda`, menu `⋯ > Gerar Títulos`",
        "intro": "Quando o cliente cobra antes de faturar (decisão X2), os títulos nascem do pedido. O cliente vê uma parcela virar um título e o pedido marcar \"Gerados\".",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Títulos nascendo da nota",
        "onde": "`Financeiro > Contas a Receber`",
        "intro": "No caminho mais comum, quem gera o título é a nota. O cliente vê a passagem do Faturamento para o Financeiro e entende por que não há título em dobro.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Receber: total e parcial",
        "onde": "`Financeiro > Contas a Receber`, ação **Receber**",
        "intro": "O recebimento é o momento em que o dinheiro entra. O cliente vê a baixa parcial criar o residual e o saldo da conta subir na hora.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Boleto e PIX em homologação (quando contratados)",
        "onde": "`Financeiro > Configurações > Boleto` e `Financeiro > PIX`",
        "intro": "Só se o cliente contratou cobrança registrada ou PIX. Tudo em homologação, banco por banco, antes de virar para produção.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Contas a pagar vindas da compra",
        "onde": "`Financeiro > Contas a Pagar`",
        "intro": "O lado da compra: a nota de recebimento finalizada gera os títulos a pagar. O cliente paga um deles e vê o saldo descer.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Extrato e conciliação",
        "onde": "`Financeiro > Extrato`",
        "intro": "Conciliar é baixar pela data e pela conta do extrato do banco. O cliente vê a Mesa de Conciliação e escolhe, por conta, se baixa à mão ou pela conciliação.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "8. Saldos, fluxo de caixa e DRE",
        "onde": "`Financeiro > Saldos`, `Financeiro > Fluxo de Caixa`, `Financeiro > DRE`",
        "intro": "O fechamento do roteiro: o mesmo dinheiro tem de aparecer igual nos saldos, no fluxo de caixa, na DRE e nos painéis.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "9. Estorno e exclusão",
        "onde": "`Financeiro > Contas a Receber`, ações **Estornar** e excluir",
        "intro": "Corrigir é parte da operação. O cliente aprende a diferença entre estornar uma baixa errada e excluir um título, e vê o que o sistema protege.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#financeiro",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação do Financeiro: roteiro prático com o cliente",
        "texto": "Ao final, o financeiro do cliente terá visto um título nascer do pedido e outro da nota, recebido um deles em duas partes, pago um título da compra e conferido o mesmo dinheiro em Saldos, Extrato, Fluxo de Caixa e DRE. Ele saberá estornar uma baixa e saberá o que o sistema recusa.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Contas, meios de pagamento e plano de contas",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "2. Títulos nascendo do pedido",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "3. Títulos nascendo da nota",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "4. Receber: total e parcial",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "5. Boleto e PIX em homologação (quando contratados)",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "6. Contas a pagar vindas da compra",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "7. Extrato e conciliação",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "8. Saldos, fluxo de caixa e DRE",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "9. Estorno e exclusão",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "link",
        "material": "financeiro:checklist-implantacao",
        "titulo": "Implantação do Financeiro: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-07-financeiro.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Use situações reais. Demonstre da geração automática à baixa, conciliação e demonstrativos. Relacione lançamentos aos processos que os originaram.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro",
       "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Módulo `financeiro` contratado; versão **PRO** se o cliente quer PIX, pagamentos eletrônicos, DDA ou Open Finance.",
          "nota": "**Confira:** menus sem cadeado em `Financeiro`. Sem o módulo, nenhuma nota gera título. **Fonte:** FIN C, comerciais; FAT-TIT-007.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Plano de contas analítico, contas bancárias, portadores, condições e meios de pagamento feitos na Fundação; saldo inicial das contas **ainda não preenchido**.",
          "nota": "**Confira:** `Financeiro > Configurações`. O saldo inicial entra só na carga, depois dos testes. **Fonte:** FIN C, pré-requisitos e etapa 2; README da cadeia, decisão X7.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Participante de teste com **Conta de Fluxo de Caixa Receita/Despesa** preenchida.",
          "nota": "**Confira:** no cadastro do participante. Ela decide em que linha do fluxo de caixa o valor cai. **Fonte:** fluxo antigo \"Fluxo financeiro\", pré-requisitos.",
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Pedido de venda de teste \"TESTE FLUXO CONSULTOR\" sem títulos e a nota autorizada do roteiro de Faturamento (de um pedido sem títulos); nota de recebimento finalizada do roteiro de Recebimento.",
          "nota": "**Confira:** coluna TÍTULOS \"Sem títulos\" no pedido e o número da nota e da NR. **Fonte:** README da cadeia, teste ponta a ponta; FIN D, E2E-1 e E2E-8.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Decisões tomadas: quem gera o contas a receber (pedido ou nota) e como se dá baixa em cada conta (à mão, pelo boleto ou pela conciliação).",
          "nota": "**Confira:** ata do kickoff. Escolher um caminho por conta evita baixar duas vezes. **Fonte:** README da cadeia, decisão X2; FIN C, Q5 e Q9.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "Títulos gerados pelo pedido com valor e vencimento iguais às parcelas.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Títulos nascidos da nota autorizada, sem duplicar os do pedido.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Baixa parcial, baixa total e estorno refletidos em Contas a Receber, Saldos e Extrato.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Título a pagar da compra pago e refletido no saldo e no Extrato.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Extrato importado, um movimento conciliado e a conciliação desfeita.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Fluxo de Caixa, DRE e Saldos conferidos entre si; diferenças anotadas.",
          "nota": null,
          "selo": "conferido-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Boleto e PIX emitidos e baixados em homologação, quando contratados.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Consultar contas a receber e a pagar",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
          ]
         },
         {
          "texto": "Realizar recebimentos e pagamentos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
          ]
         },
         {
          "texto": "Consultar fluxo de caixa e demonstrativos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Faturamento, Compras e Recebimento",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro",
       "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Recebe informações de Vendas, Faturamento, Compras e Recebimento. Elimina lançamentos manuais.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#financeiro"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só ambiente de teste e conta de teste, com registros \"TESTE FLUXO CONSULTOR\". Baixar, pagar, estornar e gerar boleto ou PIX movimentam dinheiro de verdade. Nota fiscal só é transmitida com o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Meio de pagamento de tipo Boleto sem conta emissora trava \"Gerar Títulos\"; a mensagem diz \"Boleto\" mesmo quando o meio se chama \"Duplicata Mercantil\".",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Título manual e título gerado do mesmo pedido duplicam DRE, painel e \"Recebido no mês\": use um só caminho.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Baixa parcial cria o residual `/002`: não é duplicidade.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Hoje o card \"Recebido no mês\" ainda soma o valor original do título numa baixa parcial: confira o card contra o Extrato.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "O \"Saldo Inicial\" da conta não tem data: com migração de histórico, ele é o saldo antes do primeiro movimento migrado, não o de hoje.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Em janelas estreitas, o diálogo de **Estornar** pode abrir fora da área visível.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Receber, pagar e estornar movem saldo: só conta e valor de teste.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-08-financeiro.json#14"
          ]
         },
         {
          "texto": "Título manual e título gerado do mesmo pedido duplicam a receita.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-08-financeiro.json#14"
          ]
         },
         {
          "texto": "Confira o card Recebido no mês contra o Extrato.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-08-financeiro.json#14"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-08-financeiro.json#14"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Quando \"Gerar Títulos\" fica habilitado: no fluxo antigo (conferido em 20/10/2026) a opção fica desabilitada em Faturado e Lib. Expedição e volta depois de Entregue. A gestora diz que o pedido gera títulos quando está Em aberto, sem nota ainda (FIN B; VEN-TIT). Conferir na tela antes de ensinar se um pedido Entregue e já faturado pode gerar títulos.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Saldo inicial do Fluxo de Caixa: a gestora diz saldo cadastrado da conta + movimentos até a véspera (FIN-IND-002). No fluxo antigo, o saldo inicial absorveu o movimento do mês (inicial negativo, final zero). Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Excluir título: o fluxo antigo diz que excluir (lixeira) é permanente; a gestora diz que é exclusão lógica (FIN-EXC-001). Conferir na tela.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         },
         {
          "texto": "Títulos nascendo da nota, boleto, PIX, importação de extrato e Mesa de Conciliação ainda não foram executados na tela; os nomes de botão vêm do código lido pela gestora.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro",
       "guia:videos/roteiros/consultor-08-financeiro.json#14"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "financeiro:video-consultor",
        "titulo": "Financeiro: do título ao fluxo de caixa",
        "status": "disponivel",
        "url": "/videos/consultor-08-financeiro.mp4",
        "duracao_s": 184,
        "poster": "/videos/consultor-08-financeiro.jpg",
        "legenda": "/videos/consultor-08-financeiro.vtt",
        "resumo": "Gerar os títulos, receber e ler o fluxo de caixa.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-08-financeiro.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-08-financeiro.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "financeiro:checklist-inicial",
        "titulo": "Financeiro (consulta)",
        "status": "disponivel",
        "url": "/checklists/estagiarios/13-financeiro.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#financeiro"
        ]
       },
       {
        "tipo": "link",
        "material": "financeiro:fluxo-principal",
        "titulo": "Fluxo principal do Financeiro: do título ao fluxo de caixa",
        "status": "disponivel",
        "url": "/checklists/estagiarios/fluxo-principal-financeiro.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-financeiro-estagiario"
        ]
       },
       {
        "tipo": "link",
        "material": "financeiro:checklist-implantacao",
        "titulo": "Implantação do Financeiro: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-07-financeiro.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como gerar os títulos do pedido e receber",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-gerar-titulos-e-receber.md"
          ]
         },
         {
          "texto": "10 Manual Financeiro",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/10_Manual_Financeiro_Timbrado.docx"
          ]
         },
         {
          "texto": "01-contas-a-receber",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/01-contas-a-receber.docx"
          ]
         },
         {
          "texto": "02-contas-a-pagar",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/02-contas-a-pagar.docx"
          ]
         },
         {
          "texto": "03-dre",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/03-dre.docx"
          ]
         },
         {
          "texto": "04-fluxo-de-caixa",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/04-fluxo-de-caixa.docx"
          ]
         },
         {
          "texto": "05-saldos-e-extrato",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/05-saldos-e-extrato.docx"
          ]
         },
         {
          "texto": "06-dashboard-financeiro",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/06-dashboard-financeiro.docx"
          ]
         },
         {
          "texto": "07-transferencias",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/07-transferencias.docx"
          ]
         },
         {
          "texto": "08-pix",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/08-pix.docx"
          ]
         },
         {
          "texto": "09-budget-versus-realizado",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/09-budget-versus-realizado.docx"
          ]
         },
         {
          "texto": "10-cadastros-financeiros",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/financeiro/10-cadastros-financeiros.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-gerar-titulos-e-receber.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/10_Manual_Financeiro_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/01-contas-a-receber.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/02-contas-a-pagar.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/03-dre.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/04-fluxo-de-caixa.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/05-saldos-e-extrato.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/06-dashboard-financeiro.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/07-transferencias.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/08-pix.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/09-budget-versus-realizado.docx",
         "harness:conhecimento/Roteiros Treinamento/financeiro/10-cadastros-financeiros.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#financeiro",
       "guia:scripts/dados-fluxos-estagiarios.mjs#fluxo-financeiro-estagiario",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-financeiro",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-gerar-titulos-e-receber.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/10_Manual_Financeiro_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/01-contas-a-receber.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/02-contas-a-pagar.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/03-dre.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/04-fluxo-de-caixa.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/05-saldos-e-extrato.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/06-dashboard-financeiro.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/07-transferencias.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/08-pix.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/09-budget-versus-realizado.docx",
       "harness:conhecimento/Roteiros Treinamento/financeiro/10-cadastros-financeiros.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "tarefas",
   "ordem": 15,
   "titulo": "Tarefas",
   "subtitulo": "Organizar e acompanhar atividades da equipe.",
   "cor": "#00897b",
   "icone": "tarefas",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#tarefas",
    "guia:scripts/dados-checklists-estagiarios.mjs#tarefas",
    "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
   ],
   "materiais": [
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "tarefas:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx"
     ],
     "id": "tarefas:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": "/checklists/estagiarios/14-tarefas.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
     ],
     "id": "tarefas:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Tarefas: quadros e cartões",
     "status": "disponivel"
    },
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": "#inicial/tarefas",
     "fontes": [
      "harness:conhecimento/glossario/telas.yaml#tarefas.quadros",
      "guia:videos/roteiros/consultor-10-tarefas.json"
     ],
     "id": "tarefas:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "disponivel"
    },
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": "/checklists/consultores/implantacao-15-tarefas.html",
     "fontes": [
      "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
     ],
     "id": "tarefas:checklist-implantacao",
     "tipo": "checklist",
     "jornada": "consultor",
     "titulo": "Implantação de Tarefas: roteiro prático com o cliente",
     "status": "disponivel"
    },
    {
     "modulo": "tarefas",
     "duracao_s": 158,
     "url": "/videos/consultor-10-tarefas.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-10-tarefas.json"
     ],
     "id": "tarefas:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Tarefas",
     "status": "disponivel"
    },
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": "#consultor/tarefas",
     "fontes": [
      "harness:conhecimento/produto/regras-negocio/regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.md",
      "guia:videos/roteiros/consultor-10-tarefas.json"
     ],
     "id": "tarefas:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "tarefas",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md",
      "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx"
     ],
     "id": "tarefas:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Tarefas: quadros e cartões",
        "texto": "Quadros com listas e cartões para acompanhar quem faz o quê e até quando.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Usar o módulo Tarefas para acompanhar suas atividades: achar seus cartões, atualizar o andamento e registrar comentários.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Achar suas tarefas",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Abrir o módulo Tarefas pelo menu de módulos (a busca Ctrl+K por \"tarefa\" não encontra o módulo).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Abrir **Minhas Tarefas** e ver o que está atribuído a você.",
          "nota": "Mostra o cartão de treino depois que você se coloca como responsável.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Trabalhar num cartão",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "No cartão, usar o checklist (aba **Checklists > + Nova checklist > Criar > + Novo item > Adicionar**) e os comentários (aba **Comentários > Comentar**).",
          "nota": "O comentário mostra o toast \"Comentário adicionado!\"; no teste o autor apareceu como \"Usuário\".",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Mover o cartão entre as listas pelo ícone **Mover para outra lista** (arrastar com o mouse também existe, mas não foi testado).",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Arquivar o cartão de teste no fim, pelo cabeçalho do cartão.",
          "nota": "Ele passa para **Tarefas > Arquivadas**, onde há o botão **Restaurar**.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Telas do módulo (glossário do Harness)",
        "itens": [
         {
          "texto": "Quadros e cartões",
          "nota": "Tarefas › Meus Quadros",
          "selo": null,
          "fontes": [
           "harness:conhecimento/glossario/telas.yaml#tarefas.quadros"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/glossario/telas.yaml#tarefas.quadros"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/glossario/telas.yaml#tarefas.quadros"
      ]
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da criação da tarefa à conclusão.",
        "etapas": [
         "Criação da Tarefa",
         "Definição do Responsável e Prazo",
         "Execução da Atividade",
         "Acompanhamento",
         "Conclusão"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: criar o seu primeiro cartão",
        "onde": "módulo `Tarefas`",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. A tela \"Minhas Tarefas\" começa vazia: ela só mostra o que está atribuído a você. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Abrir o módulo Tarefas pelo menu de módulos e ver **Meus Quadros**.",
          "nota": "A busca Ctrl+K por \"tarefa\" não encontra o módulo. Numa conta zerada aparece \"Nenhum quadro ainda\".",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Sem quadro, clicar em **Novo Quadro**, informar o **Nome do Quadro** (\"TESTE ESTAGIÁRIO - quadro de treino\") e o **Tipo** Avulso e clicar em **Criar Quadro**. Abrir o quadro e criar as listas em **+ Adicionar lista** (ex.: \"A fazer\" e \"Feito\").",
          "nota": "O quadro nasce sem listas. Se o seu supervisor já combinou um quadro, use o dele.",
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Na lista \"A fazer\", clicar em **+ Adicionar tarefa** e criar o cartão \"TESTE ESTAGIÁRIO - cartão 1\". Abrir o cartão, definir **Prioridade** e **Término Previsto** (não existe campo \"Prazo\") e, em **Adicionar responsável**, escolher **você**.",
          "nota": "O cartão nasce Pendente e Média. O responsável **não** vem preenchido: sem ele o cartão não aparece em **Minhas Tarefas**.",
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       },
       {
        "tipo": "link",
        "material": "tarefas:checklist-inicial",
        "titulo": "Tarefas: quadros e cartões",
        "status": "disponivel",
        "url": "/checklists/estagiarios/14-tarefas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:tarefas",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Tarefas e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: módulo `Tarefas`"
         },
         {
          "id": "executei-2",
          "texto": "Executei: 1. Preparar seus dados: criar o seu primeiro cartão"
         },
         {
          "id": "executei-3",
          "texto": "Executei: 2. Achar suas tarefas"
         },
         {
          "id": "executei-4",
          "texto": "Executei: 3. Trabalhar num cartão"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:tarefas",
        "total": 6,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Organizar e acompanhar atividades das equipes. Controlar responsabilidades, prazos e andamento através de quadros visuais.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Organiza fluxo de trabalho com quadros, colunas e cartões. Cada tarefa pode ter responsável, prazo, prioridade, checklist, comentários, anexos e histórico.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após os processos que utilizarão o gerenciamento de atividades (Projetos e Obras, CRM, etc.).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Caminho — Tarefas: quadros, listas e cartões",
        "texto": "Abrir o módulo Tarefas pelo menu de módulos. Hoje a busca Ctrl+K ainda não o encontra: é defeito reportado (ver faq-limitacoes-conhecidas-v1-22-12), não comportamento esperado; a busca de funcionalidades é global. Telas: Meus Quadros, **Minhas Tarefas** e Arquivadas.",
        "fontes": [
         "harness:conhecimento/produto/funcional/funcional-tarefas-quadros-listas-e-cartoes.md"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#tarefas",
       "harness:conhecimento/produto/funcional/funcional-tarefas-quadros-listas-e-cartoes.md"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "O cartão só aparece em Minhas Tarefas com responsável",
        "texto": "Um quadro novo (Novo Quadro: Nome do Quadro e Tipo, como Avulso) nasce **sem listas**: elas são criadas em **+ Adicionar lista**, e o cartão em **+ Adicionar tarefa**. O cartão nasce Pendente, prioridade Média e **sem responsável**; só aparece em **Minhas Tarefas** depois de **Adicionar responsável**. O prazo é o campo **Término Previsto** (não existe \"Prazo\"). O cartão se move pelo ícone \"Mover para outra lista\" e se arquiva no cabeçalho (Tarefas › Arquivadas tem **Restaurar**). O módulo é aberto pelo menu de módulos; hoje a busca Ctrl+K ainda não o encontra, mas isso é defeito reportado (ver faq-limitacoes-conhecidas-v1-22-12), não regra.",
        "confirmar": "Tarefas › Meus Quadros e Minhas Tarefas.",
        "confianca": "B",
        "fontes": [
         "harness:conhecimento/produto/regras-negocio/regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.md"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "O prazo é o Término Previsto",
        "texto": "Não existe um campo Prazo: a data limite do cartão é o Término Previsto.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-10-tarefas.json#06",
         "harness-id:funcional-tarefas-quadros-listas-e-cartoes"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "Arquivar não apaga",
        "texto": "O cartão arquivado sai das listagens e vai para Tarefas › Arquivadas, com o botão Restaurar.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-10-tarefas.json#07",
         "harness-id:funcional-tarefas-quadros-listas-e-cartoes"
        ]
       }
      ],
      "fontes": [
       "harness:conhecimento/produto/regras-negocio/regra-tarefas-cartao-so-aparece-em-minhas-tarefas-com-responsavel.md",
       "guia:videos/roteiros/consultor-10-tarefas.json#06",
       "harness-id:funcional-tarefas-quadros-listas-e-cartoes",
       "guia:videos/roteiros/consultor-10-tarefas.json#07"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da criação da tarefa à conclusão.",
        "etapas": [
         "Criação da Tarefa",
         "Definição do Responsável e Prazo",
         "Execução da Atividade",
         "Acompanhamento",
         "Conclusão"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "1. Abrir o módulo e criar o quadro",
        "onde": "`Tarefas > Meus Quadros`",
        "intro": "Comece pelo quadro: é nele que a equipe vai ver o trabalho. Mostre primeiro como chegar ao módulo.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "2. Criar as listas",
        "onde": "dentro do quadro, **+ Adicionar lista**",
        "intro": "As listas representam as fases do trabalho. Crie com o cliente as que a equipe vai usar e mostre as regras de lista.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "3. Cartão com responsável e prazo",
        "onde": "lista do quadro e detalhe da tarefa",
        "intro": "O cartão é a atividade distribuída. Sem responsável ele não chega a ninguém; sem Término Previsto não há atraso para cobrar.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "4. Minhas Tarefas e Dashboard",
        "onde": "`Tarefas > Minhas Tarefas` e `Tarefas > Dashboard`",
        "intro": "Mostre o outro lado: o que o executor vê e o que o gestor acompanha.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "5. Status e regras do cartão",
        "onde": "detalhe da tarefa",
        "intro": "Percorra o ciclo do cartão e demonstre as regras que impedem concluir trabalho que ainda depende de outro.",
        "passos_total": 4,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "6. Colaboração e visões",
        "onde": "abas do detalhe da tarefa e visões do quadro",
        "intro": "Mostre como a equipe conversa dentro do cartão em vez de usar mensagens soltas, e como o gestor vê o mesmo quadro de jeitos diferentes.",
        "passos_total": 5,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "etapa",
        "titulo": "7. Arquivar e restaurar",
        "onde": "cabeçalho do cartão e `Tarefas > Arquivadas`",
        "intro": "Feche o roteiro limpando o quadro de teste sem apagar nada.",
        "passos_total": 3,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#tarefas",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Implantação de Tarefas: roteiro prático com o cliente",
        "texto": "Ao final, o cliente terá montado um quadro da equipe, distribuído um cartão com responsável e Término Previsto e visto esse cartão chegar a Minhas Tarefas e ao Dashboard. Saberá comentar, mencionar, anexar e arquivar sem perder histórico.",
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Blocos do roteiro de implantação",
        "itens": [
         {
          "texto": "1. Abrir o módulo e criar o quadro",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "2. Criar as listas",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "3. Cartão com responsável e prazo",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "4. Minhas Tarefas e Dashboard",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "5. Status e regras do cartão",
          "nota": "4 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "6. Colaboração e visões",
          "nota": "5 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "7. Arquivar e restaurar",
          "nota": "3 passos",
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "link",
        "material": "tarefas:checklist-implantacao",
        "titulo": "Implantação de Tarefas: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-15-tarefas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente criação de quadros e colunas. Demonstre criação de cartões (responsáveis, prazos, prioridades, checklists, anexos, comentários). Apresente recursos de acompanhamento (painel, filtros, indicadores de atraso). Finalize com modelos e automações.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas",
       "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Pré-requisitos",
        "itens": [
         {
          "texto": "Licença do módulo Tarefas ativa para a empresa do cliente.",
          "nota": "**Confira:** o módulo **Tarefas** aparece no ícone de grade (menu de módulos). **Fonte:** fluxo antigo \"Fluxo de tarefas\" (pré-requisito); manual-12-projetos-e-tarefas#001.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Dois usuários de teste: o gestor que cria o quadro e um executor que será o responsável do cartão, com uma segunda sessão aberta.",
          "nota": "**Confira:** os dois aparecem na busca de **+ Adicionar responsável**. **Fonte:** fluxo antigo \"Fluxo de tarefas\" (pré-requisito).",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Combinado com o cliente como os quadros serão organizados (um por departamento ou por obra) e quais listas cada um terá.",
          "nota": "**Confira:** os nomes das listas antes de criar. **Fonte:** manual-12-projetos-e-tarefas#004.",
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
      ]
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Resultado esperado",
        "itens": [
         {
          "texto": "O quadro de teste tem listas criadas pelo cliente e um cartão com responsável, prioridade e Término Previsto.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "O cartão apareceu em Minhas Tarefas do executor e no Dashboard do gestor.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "O sistema impediu concluir o cartão com subtarefa aberta e reabrir o cancelado.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Comentário com menção, checklist, anexo e vínculo funcionaram, e o cartão arquivado foi restaurado com tudo.",
          "nota": null,
          "selo": "documento",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Criar quadros e organizar tarefas por etapas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         },
         {
          "texto": "Criar cartões com responsáveis, prazos e prioridades",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         },
         {
          "texto": "Usar checklists e comentários",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         },
         {
          "texto": "Acompanhar atividades pendentes e atrasadas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         },
         {
          "texto": "Consultar tarefas por usuário ou equipe",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         },
         {
          "texto": "Usar modelos para processos repetitivos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         },
         {
          "texto": "Compreender integração com Projetos e Obras, CRM e demais processos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas",
       "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Organiza fluxo de trabalho com quadros, colunas e cartões. Cada tarefa pode ter responsável, prazo, prioridade, checklist, comentários, anexos e histórico.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#tarefas"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Atenção",
        "itens": [
         {
          "texto": "Só em ambiente de teste, com quadros e cartões \"TESTE FLUXO CONSULTOR\" e usuários de teste como responsáveis.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Hoje a busca Ctrl+K ainda não encontra o módulo Tarefas: abra pelo menu de módulos (é defeito reportado, não regra).",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Cartão sem responsável não aparece em Minhas Tarefas: o erro mais comum na implantação é criar cartões e esquecer o responsável.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "O prazo é o **Término Previsto**; sem ele o cartão nunca aparece como atrasado.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Mover, comentar ou mencionar em cartão de outra pessoa avisa os responsáveis: não use usuários reais no teste.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Automações e recorrências criam cartões e enviam notificações sozinhas: só teste com destinatários de teste.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Arquivar só se desfaz por **Restaurar** em `Tarefas > Arquivadas`.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Defeito reportado: a busca Ctrl+K ainda não encontra o módulo. Enquanto isso, abra pelo menu de módulos.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-10-tarefas.json#13"
          ]
         },
         {
          "texto": "O cartão novo não tem responsável: atribua sempre.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-10-tarefas.json#13"
          ]
         },
         {
          "texto": "O autor de comentário pode aparecer como Usuário.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-10-tarefas.json#13"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-10-tarefas.json#13"
        ]
       },
       {
        "tipo": "lista",
        "rotulo": "A conferir na tela",
        "itens": [
         {
          "texto": "Quadro padrão: o procedimento registra que numa conta nova aparece \"Nenhum quadro ainda\" e que o quadro nasce sem listas; o manual-12-projetos-e-tarefas diz que o quadro **Tarefas Gerais** (padrão) já existe com as listas A Fazer, Em Andamento e Concluído. Conferir na tela do cliente.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Criar o cartão: o procedimento cita **+ Adicionar tarefa**; o manual-12-projetos-e-tarefas cita o **+** da coluna e o botão **Adicionar**.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Limite de trabalho (WIP), dependências, cancelamento, anexos acima de 10 MB e arquivar o quadro vêm só do fluxo antigo (plano de QA de Tarefas) e não foram executados no sistema.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Vincular o cartão a pedido ou obra: o fluxo antigo marcou como não validado; o manual-12-projetos-e-tarefas descreve o **Vincular**. Conferir na tela antes de ensinar.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         },
         {
          "texto": "Nomes de status: o fluxo antigo usa Pendente, Em andamento, Em revisão, Concluída e Cancelada; o manual-12-projetos-e-tarefas só cita listas (A Fazer, Em Andamento, Concluído). Conferir os status reais no detalhe da tarefa.",
          "nota": null,
          "selo": "a-conferir-na-tela",
          "fontes": [
           "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
          ]
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas",
       "guia:videos/roteiros/consultor-10-tarefas.json#13"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "tarefas:video-consultor",
        "titulo": "Tarefas",
        "status": "disponivel",
        "url": "/videos/consultor-10-tarefas.mp4",
        "duracao_s": 158,
        "poster": "/videos/consultor-10-tarefas.jpg",
        "legenda": "/videos/consultor-10-tarefas.vtt",
        "resumo": "Quadro, cartão, regras e colaboração.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-10-tarefas.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-10-tarefas.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "tarefas:checklist-inicial",
        "titulo": "Tarefas: quadros e cartões",
        "status": "disponivel",
        "url": "/checklists/estagiarios/14-tarefas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#tarefas"
        ]
       },
       {
        "tipo": "link",
        "material": "tarefas:checklist-implantacao",
        "titulo": "Implantação de Tarefas: roteiro prático com o cliente",
        "status": "disponivel",
        "url": "/checklists/consultores/implantacao-15-tarefas.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       },
       {
        "tipo": "fontes",
        "rotulo": "Fontes no Harness",
        "itens": [
         {
          "texto": "Como criar um quadro e um cartão em Tarefas",
          "nota": "Procedimento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/produto/procedimentos/procedimento-criar-quadro-e-cartao-em-tarefas.md"
          ]
         },
         {
          "texto": "12 Manual Projetos e Tarefas",
          "nota": "Manual oficial",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx"
          ]
         },
         {
          "texto": "01-quadros-kanban",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/tarefas/01-quadros-kanban.docx"
          ]
         },
         {
          "texto": "02-tarefas-checklists-e-apontamentos",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/tarefas/02-tarefas-checklists-e-apontamentos.docx"
          ]
         },
         {
          "texto": "03-minhas-tarefas-recorrencias-e-arquivo",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/tarefas/03-minhas-tarefas-recorrencias-e-arquivo.docx"
          ]
         },
         {
          "texto": "04-etiquetas-modelos-e-automacoes",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/tarefas/04-etiquetas-modelos-e-automacoes.docx"
          ]
         },
         {
          "texto": "05-dashboard-de-tarefas",
          "nota": "Roteiro de treinamento",
          "selo": null,
          "fontes": [
           "harness:conhecimento/Roteiros Treinamento/tarefas/05-dashboard-de-tarefas.docx"
          ]
         }
        ],
        "fontes": [
         "harness:conhecimento/produto/procedimentos/procedimento-criar-quadro-e-cartao-em-tarefas.md",
         "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx",
         "harness:conhecimento/Roteiros Treinamento/tarefas/01-quadros-kanban.docx",
         "harness:conhecimento/Roteiros Treinamento/tarefas/02-tarefas-checklists-e-apontamentos.docx",
         "harness:conhecimento/Roteiros Treinamento/tarefas/03-minhas-tarefas-recorrencias-e-arquivo.docx",
         "harness:conhecimento/Roteiros Treinamento/tarefas/04-etiquetas-modelos-e-automacoes.docx",
         "harness:conhecimento/Roteiros Treinamento/tarefas/05-dashboard-de-tarefas.docx"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#tarefas",
       "guia:scripts/dados-checklists-implantacao.mjs#implantacao-tarefas",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
       "harness:conhecimento/produto/procedimentos/procedimento-criar-quadro-e-cartao-em-tarefas.md",
       "harness:conhecimento/Manuais_Faktory_Flow_Timbrados/12_Manual_Projetos_e_Tarefas_Timbrado.docx",
       "harness:conhecimento/Roteiros Treinamento/tarefas/01-quadros-kanban.docx",
       "harness:conhecimento/Roteiros Treinamento/tarefas/02-tarefas-checklists-e-apontamentos.docx",
       "harness:conhecimento/Roteiros Treinamento/tarefas/03-minhas-tarefas-recorrencias-e-arquivo.docx",
       "harness:conhecimento/Roteiros Treinamento/tarefas/04-etiquetas-modelos-e-automacoes.docx",
       "harness:conhecimento/Roteiros Treinamento/tarefas/05-dashboard-de-tarefas.docx"
      ]
     }
    ]
   }
  },
  {
   "id": "relatorios",
   "ordem": 16,
   "titulo": "Relatórios e Análises",
   "subtitulo": "Dos dados dos módulos à exportação e compartilhamento.",
   "cor": "#283593",
   "icone": "relatorios",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
   ],
   "materiais": [
    {
     "modulo": "relatorios",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "relatorios:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "relatorios",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "relatorios:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "relatorios",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "relatorios:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Vídeo avançado",
     "status": "em-preparacao"
    },
    {
     "modulo": "relatorios",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "relatorios:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Dos dados dos módulos à exportação e compartilhamento.",
        "etapas": [
         "Dados dos Módulos",
         "Criação do Relatório",
         "Aplicação de Filtros",
         "Análise das Informações",
         "Exportação ou Compartilhamento"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Transformar dados em informações estratégicas. Criar relatórios personalizados, tabelas dinâmicas e acompanhar indicadores.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Consolida informações de todos os módulos. Permite cruzar dados e gerar análises completas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após os principais módulos operacionais, com dados já cadastrados e movimentações realizadas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Dos dados dos módulos à exportação e compartilhamento.",
        "etapas": [
         "Dados dos Módulos",
         "Criação do Relatório",
         "Aplicação de Filtros",
         "Análise das Informações",
         "Exportação ou Compartilhamento"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente construtor de relatórios (seleção, filtros, agrupamentos). Demonstre tabelas dinâmicas. Apresente relatórios financeiros (DRE, receitas, custos, despesas). Finalize com exportação (Excel, PDF, CSV) e compartilhamento.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Criar relatório com informações do sistema",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         },
         {
          "texto": "Aplicar filtros, agrupamentos e totais",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         },
         {
          "texto": "Usar tabelas dinâmicas",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         },
         {
          "texto": "Consultar informações de diferentes módulos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         },
         {
          "texto": "Exportar em Excel, PDF ou CSV",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         },
         {
          "texto": "Compartilhar relatórios",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Compras, Produção, Estoque, Faturamento, Fiscal, Financeiro e Projetos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Consolida informações de todos os módulos. Permite cruzar dados e gerar análises completas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#relatorios"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       }
      ],
      "fontes": [
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
      ]
     }
    ]
   }
  },
  {
   "id": "alumina",
   "ordem": 17,
   "titulo": "Alumina — IA",
   "subtitulo": "Da pergunta do usuário à execução registrada.",
   "cor": "#6a1b9a",
   "icone": "alumina",
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:db/migrations/002_modulos_iniciais.sql#alumina"
   ],
   "materiais": [
    {
     "modulo": "alumina",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "alumina:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "alumina",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "alumina:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "alumina",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "alumina:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Vídeo avançado",
     "status": "em-preparacao"
    },
    {
     "modulo": "alumina",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "alumina:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da pergunta do usuário à execução registrada.",
        "etapas": [
         "Pergunta do Usuário",
         "Consulta das Informações",
         "Análise dos Dados",
         "Sugestão de Ação",
         "Confirmação",
         "Execução Registrada"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#alumina"
      ]
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Assistente inteligente dentro do Faktory Flow. Consultar informações, realizar análises e executar ações por comandos em linguagem natural (texto ou voz).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Papel no fluxo",
        "texto": "Camada inteligente sobre os módulos. Respeita permissões do usuário. Ações que alteram dados só executam após confirmação.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Quando implantar",
        "texto": "Após os principais módulos operacionais, com dados suficientes para consultas.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#alumina"
      ]
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "fluxo",
        "titulo": "Da pergunta do usuário à execução registrada.",
        "etapas": [
         "Pergunta do Usuário",
         "Consulta das Informações",
         "Análise dos Dados",
         "Sugestão de Ação",
         "Confirmação",
         "Execução Registrada"
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#alumina"
      ]
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Orientação de treinamento",
        "texto": "Apresente perguntas por texto ou voz. Exemplos: \"Quais pedidos estão pendentes de faturamento?\", \"Qual foi o faturamento deste mês?\", \"Quais títulos estão vencidos?\", \"Como está a margem de uma obra?\". Demonstre interpretação, respostas, gráficos e sugestões. Apresente execução de ações assistidas (sempre com confirmação). Finalize com recursos de segurança (permissões, registros, restrições).",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#alumina"
      ]
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Checklist do módulo",
        "itens": [
         {
          "texto": "Realizar perguntas por texto ou voz",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         },
         {
          "texto": "Consultar informações dos módulos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         },
         {
          "texto": "Interpretar respostas e gráficos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         },
         {
          "texto": "Solicitar sugestões de ações",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         },
         {
          "texto": "Compreender processo de confirmação",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         },
         {
          "texto": "Entender permissões e segurança",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         },
         {
          "texto": "Compreender integração com Vendas, Financeiro, Compras, Produção, Estoque, Projetos, CRM e demais módulos",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:db/migrations/002_modulos_iniciais.sql#alumina"
          ]
         }
        ],
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#alumina"
      ]
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Relação com os outros módulos",
        "texto": "Camada inteligente sobre os módulos. Respeita permissões do usuário. Ações que alteram dados só executam após confirmação.",
        "fontes": [
         "guia:db/migrations/002_modulos_iniciais.sql#alumina"
        ]
       }
      ],
      "fontes": [
       "guia:db/migrations/002_modulos_iniciais.sql#alumina"
      ]
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       }
      ],
      "fontes": [
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
      ]
     }
    ]
   }
  },
  {
   "id": "fluxo-completo",
   "ordem": 18,
   "titulo": "Visão do fluxo completo",
   "subtitulo": "Como um pedido passa por todos os módulos.",
   "cor": null,
   "icone": null,
   "fontes": [
    "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
    "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
   ],
   "materiais": [
    {
     "modulo": "fluxo-completo",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fluxo-completo:video-inicial",
     "tipo": "video",
     "jornada": "inicial",
     "titulo": "Vídeo introdutório",
     "status": "em-preparacao"
    },
    {
     "modulo": "fluxo-completo",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fluxo-completo:manual-inicial",
     "tipo": "manual",
     "jornada": "inicial",
     "titulo": "Manual visual resumido",
     "status": "em-preparacao"
    },
    {
     "modulo": "fluxo-completo",
     "duracao_s": null,
     "url": "/checklists/estagiarios/15-visao-fluxo-completo.html",
     "fontes": [
      "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
     ],
     "id": "fluxo-completo:checklist-inicial",
     "tipo": "checklist",
     "jornada": "inicial",
     "titulo": "Visão do fluxo completo",
     "status": "disponivel"
    },
    {
     "modulo": "fluxo-completo",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:videos/roteiros/consultor-fluxo-completo.json"
     ],
     "id": "fluxo-completo:telas",
     "tipo": "tela",
     "jornada": "inicial",
     "titulo": "Principais telas",
     "status": "em-preparacao"
    },
    {
     "modulo": "fluxo-completo",
     "duracao_s": 157,
     "url": "/videos/consultor-fluxo-completo.mp4",
     "fontes": [
      "guia:public/videos/manifest.json",
      "guia:videos/roteiros/consultor-fluxo-completo.json"
     ],
     "id": "fluxo-completo:video-consultor",
     "tipo": "video",
     "jornada": "consultor",
     "titulo": "Do pedido à gestão",
     "status": "disponivel"
    },
    {
     "modulo": "fluxo-completo",
     "duracao_s": null,
     "url": "#consultor/fluxo-completo",
     "fontes": [
      "guia:videos/roteiros/consultor-fluxo-completo.json"
     ],
     "id": "fluxo-completo:regras",
     "tipo": "regra",
     "jornada": "consultor",
     "titulo": "Regras de negócio",
     "status": "disponivel"
    },
    {
     "modulo": "fluxo-completo",
     "duracao_s": null,
     "url": null,
     "fontes": [
      "guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md"
     ],
     "id": "fluxo-completo:manual-consultor",
     "tipo": "manual",
     "jornada": "consultor",
     "titulo": "Manual do consultor",
     "status": "em-preparacao"
    }
   ],
   "jornadas": {
    "inicial": [
     {
      "id": "apresentacao",
      "titulo": "Apresentação",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "texto",
        "rotulo": "Visão do fluxo completo",
        "texto": "Um mapa para seguir um pedido de verdade pelo sistema e ver onde cada etapa aparece.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       },
       {
        "tipo": "texto",
        "rotulo": "Objetivo",
        "texto": "Seguir um pedido existente pelos módulos e reconhecer, em cada tela, o sinal de que ele avançou.",
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
      ]
     },
     {
      "id": "video",
      "titulo": "Vídeo introdutório",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "manual",
      "titulo": "Manual visual resumido",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "2. Do contato ao pedido",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "CRM: o lead é cadastrado, avança no Kanban e é convertido (vira participante \"convertido\").",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Vendas: o pedido de venda é criado para o cliente; a coluna PROJETO mostra a obra.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "3. Do pedido à operação",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Serviços: a medição nasce do pedido de venda e mostra a obra.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Produção: a OP consome material (movimento \"Baixa de componente em OP\") e entrega o produto acabado (\"Entrada de produto acabado (OP)\").",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Compras e Recebimento: o pedido de compra entregue vira nota de recebimento, entra no estoque e gera contas a pagar.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Produção: a OP é criada à mão em Produção > Nova OP, escolhendo o pedido de venda e o item.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Expedição: depois de faturado, o pedido é liberado (\"Lib. Expedição\"), entra numa carga e é entregue.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       },
       {
        "tipo": "passos",
        "titulo": "4. Da nota ao resultado",
        "onde": null,
        "intro": null,
        "passos": [
         {
          "texto": "Faturamento: `⋯ > Faturar` no pedido gera a nota; ela aparece em Notas Fiscais e a coluna NOTA FISCAL do pedido é preenchida.",
          "nota": null,
          "selo": "conferido-na-tela"
         },
         {
          "texto": "Financeiro: a coluna TÍTULOS do pedido mostra \"Gerados\" e os títulos aparecem em Contas a Receber.",
          "nota": null,
          "selo": "conferido-na-tela"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
      ]
     },
     {
      "id": "telas",
      "titulo": "Principais telas",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "fluxo",
      "titulo": "Fluxo operacional básico",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "atividade",
      "titulo": "Atividade prática",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "passos",
        "titulo": "1. Preparar seus dados: reunir os registros que você criou",
        "onde": "campos de registro dos checklists 03 a 13",
        "intro": "A sua empresa de treino começa **zerada**: cada módulo usa o que o anterior criou. Este checklist percorre o caminho do pedido usando **os seus** registros. Junte aqui os números anotados nos checklists anteriores; o que faltar, volte e crie, ou use um pedido indicado pelo supervisor. Se faltar permissão ou cadastro-base (botão que não aparece, CFOP, plano de contas, meio de pagamento, unidade de medida, almoxarifado), anote a mensagem em **Problema** e chame o supervisor: a empresa de treino começa zerada e os cadastros-base são feitos por um consultor.",
        "passos": [
         {
          "texto": "Anotar o **lead** que você criou (checklist 03) e o **pedido de venda** (checklist 04).",
          "nota": null,
          "selo": "documento"
         },
         {
          "texto": "Anotar o **pedido de compra** (05) e a **nota de recebimento** (06).",
          "nota": null,
          "selo": "documento"
         },
         {
          "texto": "Anotar o **movimento de estoque** (07), a **OP** (08) e a **medição** (09).",
          "nota": null,
          "selo": "documento"
         },
         {
          "texto": "Anotar a **obra** (10), a **carga** (11), a **nota** (12) e os **títulos** (13).",
          "nota": null,
          "selo": "documento"
         }
        ],
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       },
       {
        "tipo": "link",
        "material": "fluxo-completo:checklist-inicial",
        "titulo": "Visão do fluxo completo",
        "status": "disponivel",
        "url": "/checklists/estagiarios/15-visao-fluxo-completo.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
      ]
     },
     {
      "id": "checklist",
      "titulo": "Checklist de aprendizado",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "checklist-aprendizado",
        "chave": "inicial:fluxo-completo",
        "itens": [
         {
          "id": "entendi",
          "texto": "Entendi o que é o módulo Visão do fluxo completo e para que serve"
         },
         {
          "id": "acessar-1",
          "texto": "Sei acessar: campos de registro dos checklists 03 a 13"
         },
         {
          "id": "executei-2",
          "texto": "Executei: 1. Preparar seus dados: reunir os registros que você criou"
         },
         {
          "id": "executei-3",
          "texto": "Executei: 2. Do contato ao pedido"
         },
         {
          "id": "executei-4",
          "texto": "Executei: 3. Do pedido à operação"
         },
         {
          "id": "executei-5",
          "texto": "Executei: 4. Da nota ao resultado"
         },
         {
          "id": "checklist",
          "texto": "Concluí o checklist prático"
         }
        ],
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md",
       "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
      ]
     },
     {
      "id": "progresso",
      "titulo": "Progresso",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "progresso",
        "chave": "inicial:fluxo-completo",
        "total": 7,
        "api": "/api/checklists-progresso",
        "fontes": [
         "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
        ]
       }
      ],
      "fontes": [
       "guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md"
      ]
     }
    ],
    "consultor": [
     {
      "id": "visao",
      "titulo": "Visão funcional",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "regras",
      "titulo": "Regras de negócio",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "regra",
        "titulo": "Cada passagem tem um botão",
        "texto": "Gerar Pedido de Venda, Gerar Instalação, Faturar, Liberar para Expedição, Gerar Títulos: quase nada acontece sozinho.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-fluxo-completo.json#04",
         "harness-id:regra-servicos-passagens-por-botao-e-ordem-dos-aceites"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "O que nasce sozinho",
        "texto": "A oportunidade nasce da conversão; as requisições, da OP; os títulos, da nota finalizada; a entrada do acabado, do Produzido.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-fluxo-completo.json#05",
         "harness-id:regra-faturamento-finalizar-nf-gera-os-titulos"
        ]
       },
       {
        "tipo": "regra",
        "titulo": "A ordem importa",
        "texto": "Ajuste e ligue o pedido à obra antes de faturar; libere para expedição só depois de faturar; reverta o ganho antes de gerar o pedido.",
        "confirmar": null,
        "confianca": null,
        "fontes": [
         "guia:videos/roteiros/consultor-fluxo-completo.json#06",
         "harness-id:regra-vendas-editar-pedido-somente-em-aberto"
        ]
       }
      ],
      "fontes": [
       "guia:videos/roteiros/consultor-fluxo-completo.json#04",
       "harness-id:regra-servicos-passagens-por-botao-e-ordem-dos-aceites",
       "guia:videos/roteiros/consultor-fluxo-completo.json#05",
       "harness-id:regra-faturamento-finalizar-nf-gera-os-titulos",
       "guia:videos/roteiros/consultor-fluxo-completo.json#06",
       "harness-id:regra-vendas-editar-pedido-somente-em-aberto"
      ]
     },
     {
      "id": "fluxos",
      "titulo": "Fluxos operacionais",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "implantacao",
      "titulo": "Procedimentos de implantação",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "configuracoes",
      "titulo": "Configurações importantes",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "validacoes",
      "titulo": "Validações funcionais",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "integracoes",
      "titulo": "Integrações e dependências",
      "status": "em-preparacao",
      "blocos": [],
      "fontes": []
     },
     {
      "id": "problemas",
      "titulo": "Problemas recorrentes",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "lista",
        "rotulo": "Cuidados (vídeo)",
        "itens": [
         {
          "texto": "Transmitir, cancelar e inutilizar nota: só o responsável fiscal.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-fluxo-completo.json#15"
          ]
         },
         {
          "texto": "Confira o saldo antes de finalizar a nota: ela baixa mesmo sem estoque.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-fluxo-completo.json#15"
          ]
         },
         {
          "texto": "Use só dados de teste, e registre o que criou para limpar depois.",
          "nota": null,
          "selo": null,
          "fontes": [
           "guia:videos/roteiros/consultor-fluxo-completo.json#15"
          ]
         }
        ],
        "fontes": [
         "guia:videos/roteiros/consultor-fluxo-completo.json#15"
        ]
       }
      ],
      "fontes": [
       "guia:videos/roteiros/consultor-fluxo-completo.json#15"
      ]
     },
     {
      "id": "videos",
      "titulo": "Vídeos avançados",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "video",
        "material": "fluxo-completo:video-consultor",
        "titulo": "Do pedido à gestão",
        "status": "disponivel",
        "url": "/videos/consultor-fluxo-completo.mp4",
        "duracao_s": 157,
        "poster": "/videos/consultor-fluxo-completo.jpg",
        "legenda": "/videos/consultor-fluxo-completo.vtt",
        "resumo": "O fluxo inteiro, do CRM aos indicadores.",
        "fontes": [
         "guia:public/videos/manifest.json",
         "guia:videos/roteiros/consultor-fluxo-completo.json"
        ]
       }
      ],
      "fontes": [
       "guia:public/videos/manifest.json",
       "guia:videos/roteiros/consultor-fluxo-completo.json"
      ]
     },
     {
      "id": "complementares",
      "titulo": "Materiais complementares",
      "status": "disponivel",
      "blocos": [
       {
        "tipo": "link",
        "material": "fluxo-completo:checklist-inicial",
        "titulo": "Visão do fluxo completo",
        "status": "disponivel",
        "url": "/checklists/estagiarios/15-visao-fluxo-completo.html",
        "duracao_s": null,
        "poster": null,
        "legenda": null,
        "resumo": null,
        "fontes": [
         "guia:scripts/dados-checklists-estagiarios.mjs#fluxo"
        ]
       },
       {
        "tipo": "link",
        "titulo": "Apostila do Consultor (PDF)",
        "url": "/downloads/Apostila-do-Consultor-Faktory-Flow.pdf",
        "visibilidade": "area:apostila",
        "fontes": [
         "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
        ]
       }
      ],
      "fontes": [
       "guia:scripts/dados-checklists-estagiarios.mjs#fluxo",
       "guia:public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf"
      ]
     }
    ]
   }
  }
 ],
 "caminhos": {
  "/checklists/estagiarios/00-onboarding-estagiario.html": [
   {
    "modulo": "primeiros-passos",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/01-primeiros-passos-navegacao.html": [
   {
    "modulo": "primeiros-passos",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/02-cadastros-basicos.html": [
   {
    "modulo": "fundacao",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-01-fundacao.html": [
   {
    "modulo": "fundacao",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/03-crm-leads-oportunidades.html": [
   {
    "modulo": "crm",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-02-crm.html": [
   {
    "modulo": "crm",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-03-comercial.mp4": [
   {
    "modulo": "crm",
    "tipo": "video"
   },
   {
    "modulo": "vendas",
    "tipo": "video"
   }
  ],
  "/videos/consultor-03-comercial.jpg": [
   {
    "modulo": "crm",
    "tipo": "video"
   },
   {
    "modulo": "vendas",
    "tipo": "video"
   }
  ],
  "/videos/consultor-03-comercial.vtt": [
   {
    "modulo": "crm",
    "tipo": "video"
   },
   {
    "modulo": "vendas",
    "tipo": "video"
   }
  ],
  "/checklists/consultores/implantacao-03-integracao-cem.html": [
   {
    "modulo": "cem",
    "tipo": "checklist"
   }
  ],
  "/videos/fluxo-1-vendas.mp4": [
   {
    "modulo": "vendas",
    "tipo": "video"
   }
  ],
  "/videos/fluxo-1-vendas.jpg": [
   {
    "modulo": "vendas",
    "tipo": "video"
   }
  ],
  "/videos/fluxo-1-vendas.vtt": [
   {
    "modulo": "vendas",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/04-vendas-pedidos.html": [
   {
    "modulo": "vendas",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/fluxo-principal-vendas.html": [
   {
    "modulo": "vendas",
    "tipo": "fluxo"
   }
  ],
  "/checklists/consultores/implantacao-04-vendas.html": [
   {
    "modulo": "vendas",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/05-compras.html": [
   {
    "modulo": "compras",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-08-compras.html": [
   {
    "modulo": "compras",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-01-suprimentos.mp4": [
   {
    "modulo": "compras",
    "tipo": "video"
   },
   {
    "modulo": "recebimento",
    "tipo": "video"
   }
  ],
  "/videos/consultor-01-suprimentos.jpg": [
   {
    "modulo": "compras",
    "tipo": "video"
   },
   {
    "modulo": "recebimento",
    "tipo": "video"
   }
  ],
  "/videos/consultor-01-suprimentos.vtt": [
   {
    "modulo": "compras",
    "tipo": "video"
   },
   {
    "modulo": "recebimento",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/06-recebimento.html": [
   {
    "modulo": "recebimento",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-09-recebimento.html": [
   {
    "modulo": "recebimento",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/07-estoque.html": [
   {
    "modulo": "estoque",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-10-estoque.html": [
   {
    "modulo": "estoque",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-04-estoque.mp4": [
   {
    "modulo": "estoque",
    "tipo": "video"
   }
  ],
  "/videos/consultor-04-estoque.jpg": [
   {
    "modulo": "estoque",
    "tipo": "video"
   }
  ],
  "/videos/consultor-04-estoque.vtt": [
   {
    "modulo": "estoque",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/08-producao.html": [
   {
    "modulo": "producao",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-11-producao.html": [
   {
    "modulo": "producao",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-05-producao.mp4": [
   {
    "modulo": "producao",
    "tipo": "video"
   }
  ],
  "/videos/consultor-05-producao.jpg": [
   {
    "modulo": "producao",
    "tipo": "video"
   }
  ],
  "/videos/consultor-05-producao.vtt": [
   {
    "modulo": "producao",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/09-servicos-campo.html": [
   {
    "modulo": "servicos",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-12-servicos.html": [
   {
    "modulo": "servicos",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-02-servicos.mp4": [
   {
    "modulo": "servicos",
    "tipo": "video"
   }
  ],
  "/videos/consultor-02-servicos.jpg": [
   {
    "modulo": "servicos",
    "tipo": "video"
   }
  ],
  "/videos/consultor-02-servicos.vtt": [
   {
    "modulo": "servicos",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/10-projetos-obras.html": [
   {
    "modulo": "projetos",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-14-projetos.html": [
   {
    "modulo": "projetos",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-09-projetos.mp4": [
   {
    "modulo": "projetos",
    "tipo": "video"
   }
  ],
  "/videos/consultor-09-projetos.jpg": [
   {
    "modulo": "projetos",
    "tipo": "video"
   }
  ],
  "/videos/consultor-09-projetos.vtt": [
   {
    "modulo": "projetos",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/11-expedicao.html": [
   {
    "modulo": "expedicao",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-13-expedicao.html": [
   {
    "modulo": "expedicao",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-06-expedicao.mp4": [
   {
    "modulo": "expedicao",
    "tipo": "video"
   }
  ],
  "/videos/consultor-06-expedicao.jpg": [
   {
    "modulo": "expedicao",
    "tipo": "video"
   }
  ],
  "/videos/consultor-06-expedicao.vtt": [
   {
    "modulo": "expedicao",
    "tipo": "video"
   }
  ],
  "/videos/consultor-07-faturamento.mp4": [
   {
    "modulo": "faturamento",
    "tipo": "video"
   }
  ],
  "/videos/consultor-07-faturamento.jpg": [
   {
    "modulo": "faturamento",
    "tipo": "video"
   }
  ],
  "/videos/consultor-07-faturamento.vtt": [
   {
    "modulo": "faturamento",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/12-faturamento-fiscal.html": [
   {
    "modulo": "faturamento",
    "tipo": "checklist"
   },
   {
    "modulo": "fiscal",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/fluxo-principal-faturamento.html": [
   {
    "modulo": "faturamento",
    "tipo": "fluxo"
   }
  ],
  "/checklists/consultores/implantacao-05-faturamento.html": [
   {
    "modulo": "faturamento",
    "tipo": "checklist"
   }
  ],
  "/videos/compra-em-nome-do-cliente.mp4": [
   {
    "modulo": "faturamento",
    "tipo": "video"
   }
  ],
  "/videos/compra-em-nome-do-cliente.jpg": [
   {
    "modulo": "faturamento",
    "tipo": "video"
   }
  ],
  "/videos/compra-em-nome-do-cliente.vtt": [
   {
    "modulo": "faturamento",
    "tipo": "video"
   }
  ],
  "/checklists/consultores/implantacao-06-fiscal.html": [
   {
    "modulo": "fiscal",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-08-financeiro.mp4": [
   {
    "modulo": "financeiro",
    "tipo": "video"
   }
  ],
  "/videos/consultor-08-financeiro.jpg": [
   {
    "modulo": "financeiro",
    "tipo": "video"
   }
  ],
  "/videos/consultor-08-financeiro.vtt": [
   {
    "modulo": "financeiro",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/13-financeiro.html": [
   {
    "modulo": "financeiro",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/fluxo-principal-financeiro.html": [
   {
    "modulo": "financeiro",
    "tipo": "fluxo"
   }
  ],
  "/checklists/consultores/implantacao-07-financeiro.html": [
   {
    "modulo": "financeiro",
    "tipo": "checklist"
   }
  ],
  "/checklists/estagiarios/14-tarefas.html": [
   {
    "modulo": "tarefas",
    "tipo": "checklist"
   }
  ],
  "/checklists/consultores/implantacao-15-tarefas.html": [
   {
    "modulo": "tarefas",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-10-tarefas.mp4": [
   {
    "modulo": "tarefas",
    "tipo": "video"
   }
  ],
  "/videos/consultor-10-tarefas.jpg": [
   {
    "modulo": "tarefas",
    "tipo": "video"
   }
  ],
  "/videos/consultor-10-tarefas.vtt": [
   {
    "modulo": "tarefas",
    "tipo": "video"
   }
  ],
  "/checklists/estagiarios/15-visao-fluxo-completo.html": [
   {
    "modulo": "fluxo-completo",
    "tipo": "checklist"
   }
  ],
  "/videos/consultor-fluxo-completo.mp4": [
   {
    "modulo": "fluxo-completo",
    "tipo": "video"
   }
  ],
  "/videos/consultor-fluxo-completo.jpg": [
   {
    "modulo": "fluxo-completo",
    "tipo": "video"
   }
  ],
  "/videos/consultor-fluxo-completo.vtt": [
   {
    "modulo": "fluxo-completo",
    "tipo": "video"
   }
  ]
 },
 "pendencias": [
  "crm: 8 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "vendas: 8 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "compras: 6 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "recebimento: 6 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "estoque: 6 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "producao: 4 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "servicos: 4 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "projetos: 3 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "expedicao: 4 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "faturamento: 7 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "financeiro: 6 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "tarefas: 5 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).",
  "fluxo-completo: 8 captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03)."
 ]
};

export default BASE;
