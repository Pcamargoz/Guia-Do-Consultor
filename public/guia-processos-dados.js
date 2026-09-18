/* Conteúdo original da Biblioteca de Processos — usado sem servidor (modo leitura). */
window.ffProcessosOriginais = [
  {
    "id": "proc-1",
    "nome": "Processo Comercial (CRM e Vendas)",
    "descricao": "Início da jornada do cliente. Do primeiro contato à venda efetivada.",
    "detalhe": "Início da jornada do cliente dentro do Faktory Flow. Do primeiro contato à venda efetivada.",
    "etapas": [
      {
        "id": "proc1-e1",
        "texto": "Lead"
      },
      {
        "id": "proc1-e2",
        "texto": "Oportunidade"
      },
      {
        "id": "proc1-e3",
        "texto": "Negociação"
      },
      {
        "id": "proc1-e4",
        "texto": "Orçamento"
      },
      {
        "id": "proc1-e5",
        "texto": "Aprovação"
      },
      {
        "id": "proc1-e6",
        "texto": "Pedido de Venda"
      }
    ],
    "status": null,
    "historico": []
  },
  {
    "id": "proc-2",
    "nome": "Processo de Compras",
    "descricao": "Garantir materiais necessários para a operação.",
    "detalhe": "Garantir que a empresa tenha os materiais necessários para a operação, mantendo controle sobre solicitações, fornecedores, pedidos e recebimentos.",
    "etapas": [
      {
        "id": "proc2-e1",
        "texto": "Necessidade"
      },
      {
        "id": "proc2-e2",
        "texto": "Solicitação de Compra",
        "curto": "Solicitação"
      },
      {
        "id": "proc2-e3",
        "texto": "Cotação"
      },
      {
        "id": "proc2-e4",
        "texto": "Pedido de Compra"
      },
      {
        "id": "proc2-e5",
        "texto": "Recebimento"
      },
      {
        "id": "proc2-e6",
        "texto": "Entrada no Estoque"
      }
    ],
    "status": null,
    "historico": []
  },
  {
    "id": "proc-3",
    "nome": "Processo de Produção",
    "descricao": "Transformar o pedido aprovado em produto fabricado.",
    "detalhe": "Transformar o pedido aprovado em produto fabricado, garantindo controle das etapas de fabricação e acompanhamento da execução.",
    "etapas": [
      {
        "id": "proc3-e1",
        "texto": "Pedido de Venda"
      },
      {
        "id": "proc3-e2",
        "texto": "Ordem de Produção"
      },
      {
        "id": "proc3-e3",
        "texto": "Separação de Materiais",
        "curto": "Separação"
      },
      {
        "id": "proc3-e4",
        "texto": "Fabricação"
      },
      {
        "id": "proc3-e5",
        "texto": "Conferência"
      },
      {
        "id": "proc3-e6",
        "texto": "Produto Finalizado"
      }
    ],
    "status": null,
    "historico": []
  },
  {
    "id": "proc-4",
    "nome": "Processo Financeiro",
    "descricao": "Controlar movimentações, pagamentos, recebimentos e resultado.",
    "detalhe": "Controlar todas as movimentações relacionadas a pagamentos, recebimentos e acompanhamento do resultado da empresa.",
    "etapas": [
      {
        "id": "proc4-e1",
        "texto": "Venda/Faturamento"
      },
      {
        "id": "proc4-e2",
        "texto": "Geração de Títulos"
      },
      {
        "id": "proc4-e3",
        "texto": "Recebimento ou Pagamento",
        "curto": "Recebimento/Pagamento"
      },
      {
        "id": "proc4-e4",
        "texto": "Baixa Financeira"
      },
      {
        "id": "proc4-e5",
        "texto": "Análise de Resultado"
      }
    ],
    "status": null,
    "historico": []
  },
  {
    "id": "proc-5",
    "nome": "Processo Fiscal",
    "descricao": "Garantir que as operações estejam configuradas para cálculo de impostos e emissão de documentos fiscais.",
    "detalhe": "Garantir que as operações realizadas pela empresa estejam corretamente configuradas para cálculo de impostos e emissão dos documentos fiscais.",
    "etapas": [
      {
        "id": "proc5-e1",
        "texto": "Configuração Fiscal"
      },
      {
        "id": "proc5-e2",
        "texto": "Venda/Compra"
      },
      {
        "id": "proc5-e3",
        "texto": "Cálculo Tributário"
      },
      {
        "id": "proc5-e4",
        "texto": "Emissão Fiscal"
      },
      {
        "id": "proc5-e5",
        "texto": "Conferência"
      }
    ],
    "alertaTitulo": "O consultor NÃO define regras tributárias.",
    "alerta": "A configuração deve ser validada pelo responsável fiscal.",
    "status": null,
    "historico": []
  },
  {
    "id": "proc-6",
    "nome": "Processo de Expedição",
    "descricao": "Controlar entrega dos produtos ao cliente após faturamento.",
    "detalhe": "Controlar o processo de entrega dos produtos ao cliente após a finalização da venda e faturamento.",
    "etapas": [
      {
        "id": "proc6-e1",
        "texto": "Pedido Faturado"
      },
      {
        "id": "proc6-e2",
        "texto": "Montagem da Carga"
      },
      {
        "id": "proc6-e3",
        "texto": "Separação"
      },
      {
        "id": "proc6-e4",
        "texto": "Conferência"
      },
      {
        "id": "proc6-e5",
        "texto": "Transporte"
      },
      {
        "id": "proc6-e6",
        "texto": "Entrega"
      }
    ],
    "status": null,
    "historico": []
  },
  {
    "id": "proc-7",
    "nome": "Processo de Projetos e Obras",
    "descricao": "Organizar execução de obras. A obra é tratada como centro de acompanhamento.",
    "detalhe": "Organizar a execução de obras, permitindo acompanhar materiais, custos, produção, serviços e resultado financeiro.",
    "etapas": [
      {
        "id": "proc7-e1",
        "texto": "Venda"
      },
      {
        "id": "proc7-e2",
        "texto": "Criação da Obra"
      },
      {
        "id": "proc7-e3",
        "texto": "Planejamento"
      },
      {
        "id": "proc7-e4",
        "texto": "Execução"
      },
      {
        "id": "proc7-e5",
        "texto": "Acompanhamento"
      },
      {
        "id": "proc7-e6",
        "texto": "Resultado"
      }
    ],
    "status": null,
    "historico": []
  }
];
