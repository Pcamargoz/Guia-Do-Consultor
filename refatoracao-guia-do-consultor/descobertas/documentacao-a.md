# Descobertas — documentacao-a (guias visuais: primeiros-passos, fundacao, crm, cem, vendas, compras)

## 2026-11-05 · documentacao-a · Guias visuais do grupo A (contrato v1 + marcadores v2)
- Descoberta: os 6 `public/manuais/<modulo>/guia.json` foram escritos e todos os marcadores estão no formato v2
  (`caixa` + `lado` + `explicacao`, no máximo 5 por passo, `zoom` onde os itens são pequenos ou próximos). Fundação ficou
  sem nenhuma captura própria.

  | Módulo | Conceitos | Palavras | Capítulos (básico/avançado) | Passos | Passos com imagem | Imagens | Marcadores |
  |---|---|---|---|---|---|---|---|
  | primeiros-passos | 5 | 8 | 4 (4/0) | 9 | 4 | 2 | 17 |
  | fundacao | 5 | 7 | 3 (2/1) | 11 | 0 | 0 | 0 |
  | crm | 5 | 9 | 5 (4/1) | 12 | 10 | 10 | 36 |
  | cem | 5 | 8 | 5 (2/3) | 13 | 6 | 4 | 16 |
  | vendas | 5 | 10 | 4 (3/1) | 20 | 12 | 11 | 39 |
  | compras | 5 | 9 | 5 (4/1) | 10 | 6 | 5 | 24 |

- Evidência:
  - Fontes: MCP `faktory-doc` (`harness_contexto(documento)`, `glossary_lookup` dos nomes de vendas/crm/compras,
    `kb_search` de integração CEM e navegação: `oficial-int-*`, `roteiro-vendas-01-pedido-de-venda#035`,
    `roteiro-geral-07-primeiros-passos-e-navegacao#003/#006`, `manual-00-inicio-e-navegacao#004`,
    `faq-limitacoes-conhecidas-v1-22-12#015`); `lib/conteudo/base/<modulo>.json` (regras com fonte);
    `scripts/dados-checklists-estagiarios.mjs` e `scripts/dados-checklists-implantacao.mjs`; `videos/roteiros/fluxo-1-vendas.json`;
    `midia/brutos/{crm,vendas}/roteiro-telas.md`.
  - Capturas: `videos/public/telas/{fluxo-1-vendas,consultor-03-comercial,consultor-01-suprimentos,compra-em-nome-do-cliente}`
    (v1.22.13) e `midia/brutos/{crm,vendas}/prints` (v1.23.2). Cada uma olhada antes; borrões com ffmpeg (selo do tenant,
    nome/avatar do usuário, barra de status com URL, CNPJ/CPF, nomes de pessoas/empresas em listas, valores de listas e cards).
    Saída 1600×900 webp q82. Script de borrão e de prévia em `%TEMP%\guias-previa\tool\` (fora do repo).
  - Conferência: prévias com `drawbox` nas caixas + número no `lado` e recorte do zoom, olhadas uma a uma; ajustes feitos
    onde o número cobria dado (vendas 2.2 e 2.8, crm 3.2, compras 2.2, cem 1.2).
  - O passo de exemplo do coordenador (vendas, cap. 1, "Leia a linha do pedido") não foi alterado.
- Impacto: Guia Inicial e Guia do Consultor passam a ter tour ilustrado nos 5 módulos com captura; Fundação só tem texto
  com fonte.
- Decisões tomadas (para revisão):
  - Valores monetários de pedidos de teste foram mantidos dentro dos formulários (parcelas, resumo, budget) por serem
    necessários para explicar a tela; valores em listas e cards foram borrados.
  - Primeiros passos usa 2 capturas da lista Vendas › Pedidos de Venda (exemplo de lista citado pela própria trilha).
    Trocar por capturas neutras se o coordenador preferir.
- Divergências registradas (todas em `pendencias` e em `atencao` "a conferir na tela"):
  - Vendas: CFOP 5101-0 "não gera financeiro" na gravação de 04/11 × base (5101 gera financeiro); quando aparecem
    Gerar Títulos e Liberar para Expedição; toast "criado" × "atualizado" (captura usada é de uma 2ª gravação).
  - CRM: janela Converter Lead (manual-02-crm: escolhe funil/etapa/valor) × captura e teste (sem escolha, nasce em Novo Lead);
    caminho e trava do ganho; probabilidade de 5% em Novo Lead sem fonte.
  - CEM: licença PRO (Mobi e Faturamento em Nível); caminho de Níveis de Faturamento (a captura v1.22.13 mostra o grupo
    Configurações, a favor da gestora); cor/medida na reimportação; falha na importação; tipo de arquivo.
  - Compras: status Em Aberto × Em Edição; momento do desdobro do PC parcial; rótulo de Parâmetros de Compras.
  - Fundação: caminho do NCM; tipo dos meios de pagamento; rótulos do CFOP "gera financeiro" e da sincronização do emitente.
- Próximo passo / pedido para o coordenador — CAPTURAS no staging:
  - Primeiros passos: tela Início; painel Abrir menu de módulos; Ctrl+K com "pedido"; sino de Notificações e menu do usuário; GLOBAIS expandido.
  - Fundação: Cadastros › Participantes (lista; Novo com Dados Gerais e "Erros de validação"; Receita / Despesa; Classificação;
    Contato); Cadastros › Produtos (lista e Classificações Fiscais); Cadastros › Projetos (lista e formulário); consultor:
    Configurações › Empresas, Faturamento › Configurações › Certificados, Segurança › Perfis de Acesso/Usuários,
    Categorias de Produto, Fiscal › Configurações › CFOP.
  - CRM: Painéis › Visão Geral; menu ⋮ do lead; bloqueio ao converter (<60% ou BANT incompleto); aba Itens com Dados do Item;
    Ganha/Marcar como Ganha e Gerar Pedido de Venda (Empresa e CFOP); Atividades e Agenda.
  - Integração CEM: Padrões de Integração (Todos completos e aba Pedido de Venda); janelas Importar CEM Mobi, Importar do
    CEM Desktop e Importar Arquivo; pedido gerado pela importação; cartão CEM Desktop com dispositivo pareado.
  - Vendas: Dashboard Vendas; Demonstrativos › Carteira de Pedidos; Metas de Vendas e Simulador de comissão; Aprovações;
    ⋯ › Faturar (Nova NF-e + Selecionar Itens para Importar, sem transmitir); menu ⋯ de pedido Faturado e Lib. Expedição;
    toast "Pedido PV-xxxxxx criado".
  - Compras: Dashboard Compras; Nova Solicitação (com Dados do Item/Cor); menu ⋯ da solicitação; lista Pedidos de Compra e
    seu ⋯; passos Itens a Cotar e Cotação; Sugestão de Compra; Aprovações; Parâmetros de Compras e Faixas de Alçada.
- Não verificado: nenhuma tela foi conferida ao vivo no Flow nesta tarefa (só capturas existentes). Os guias seguem `status: rascunho`.

## 2026-11-05 · documentacao-a · Capturas do staging v1.23.2 integradas (v2)
- Descoberta: 8 capturas de `videos/capturas/guias-staging/` entraram nos guias, já no padrão v2 e conferidas por prévia
  (molduras, número no lado e recorte do zoom). Borrões extras: nome na saudação e valores da Início; razão social,
  nome fantasia e CPF/CNPJ em Participantes; linhas inteiras de Empresas (razão, CNPJ, e-mail, telefone); valores em
  Pedidos de Compra.
  - primeiros-passos: `03-inicio` (Início) nos passos "Confira a tela Início", "Reconheça o cabeçalho" e "Reconheça o menu
    lateral" (saíram as capturas de Vendas desses dois últimos). "Lendo uma lista" continua com Vendas › Pedidos de Venda
    (mostra o filtro padrão).
  - fundacao: `01-participantes`, `02-produtos`, `03-empresas` (antes sem nenhuma imagem).
  - crm: `11-atividades`, passo novo "Acompanhe as atividades" (cap. 4).
  - compras: `06-dashboard` (passo novo no cap. 1), `07-cotacoes` (passo novo no início do cap. 3),
    `08-pedidos-de-compra` (passo novo no início do cap. 4, renomeado "Acompanhando o pedido de compra").
  - crm-pipeline e compras-solicitacoes não substituíram as capturas atuais (as atuais mostram o card e o menu ⋯); ficaram
    só como fonte/confirmação.
- Evidência (staging v1.23.2, 05/11/2026): botões + Novo Participante, + Novo Produto, + Nova Empresa, + Nova Atividade,
  + Nova Cotação; caminho Configurações › Empresas; Atividades sem coluna de lead/cliente; Dashboard Compras com
  "Total PC este mês" e "Status dos Pedidos de Compra" (Em aberto, Recebido); produtos de teste com NCM 99999999.
  Textos e `pendencias` atualizados com essa evidência.
- Totais agora: primeiros-passos 9 passos/5 com imagem/3 imagens; fundacao 11/3/3; crm 13/11/11; cem 13/6/4; vendas 20/12/11;
  compras 13/9/8.
- Próximo passo / pedido: capturas que ainda faltam continuam nas `pendencias` de cada guia (formulários de Participante e
  Produto, Projetos, Ctrl+K, menu de módulos, Agenda, Padrões de Integração, janelas de importação CEM, Dashboard/Carteira/
  Aprovações/Faturar de Vendas, Nova Solicitação, ⋯ do pedido de compra, Itens a Cotar/Cotação).

## 2026-11-06 · documentacao-a · Capricho (iniciante + consultor veterano, contrato v2 + v2.1)
- Descoberta: 17 capturas novas do staging (v1.23.2, 05/11) entraram nos guias, todas olhadas antes e borradas com ffmpeg
  (saudação com nome, valores em R$ da Início e do Dashboard Vendas, nomes de clientes e valores na lista de pedidos,
  nomes de pessoas, clientes e orçamentos em Projetos, listas esmaecidas atrás dos formulários). Saída 1600×900 webp q82.
  Bloco `consultor` v2.1 (`configuracoes`, `integracoes`, `roteiroDemonstracao`) preenchido nos 6 módulos, com fonte.

  | Módulo | Passos (com imagem) | Básicos (com imagem) | Imagens novas | Config. | Integrações | Demonstração |
  |---|---|---|---|---|---|---|
  | primeiros-passos | 11 (10) | 11 (10) | 04-menu-de-modulos, 05-busca, 06-notificacoes, 07-globais | 3 | 3 | 7 |
  | fundacao | 14 (8) | 8 (7) | 04-novo-participante, 05-novo-produto, 06-projetos | 10 | 7 | 7 |
  | crm | 15 (13) | 11 (11) | 12-agenda, 13-aprovacoes-de-desconto | 6 | 5 | 8 |
  | cem | 13 (6) | 5 (3) | — (nenhuma captura nova é da integração) | 8 | 6 | 7 |
  | vendas | 21 (17) | 15 (15) | 12-dashboard, 13-demonstrativos, 14-metas, 15-aprovacoes | 7 | 7 | 8 |
  | compras | 15 (13) | 11 (11) | 09-nova-solicitacao, 10-sugestao, 11-aprovacoes, 12-followup | 6 | 7 | 7 |

- Passos novos para o iniciante: "Abra e feche um grupo do menu", "Conheça o bloco GLOBAIS" (primeiros-passos);
  "Clique em + Novo Participante e conheça os Dados Gerais", "Escolha a conta de fluxo e o papel do participante",
  "Clique em + Novo Produto e preencha os Dados Básicos", "Preencha as Classificações Fiscais e salve" (fundacao);
  "Veja a sua semana na Agenda", "Acompanhe as aprovações de desconto" (crm); "Leia os cartões do Dashboard" (vendas);
  "Conheça o formulário Nova Solicitação de Compra", "Acompanhe as entregas no Follow-up" (compras). Passos que eram só
  texto ganharam imagem: grade de módulos, Ctrl+K, sino, projetos, Dashboard/Demonstrativos/Metas/Aprovações de Vendas,
  Sugestão e Aprovações de Compras.
- Evidência: `harness_contexto(documento)`; `kb_search` (aprovação de desconto CRM, Follow-up, Painel de Controle/Alertas,
  Agenda, Sugestão de Compra, Projetos, participante, Metas/Demonstrativos) — ids usados: `manual-02-crm#017`, `plano-crm#028/#034/#111`,
  `roteiro-crm-02…#007`, `roteiro-crm-07…#004`, `manual-04-compras#008/#009`, `plano-compras#023/#024/#094`, `roteiro-compras-04…#022/#025`,
  `roteiro-compras-06…#016/#072`, `oficial-com-b-processos#005`, `roteiro-geral-04-avisos-e-alertas#019/#020`,
  `manual-12-projetos-e-tarefas#002`, `roteiro-projetos-01…#009`, `funcional-cadastros-participante-produto-e-projeto#000/#001`,
  `manual-01-cadastros-base#002`, `oficial-cad-a-regras#000`, `manual-03-vendas#012`, `plano-vendas#063`,
  `roteiro-vendas-03-metas-de-vendas#007`, `oficial-ven-c-implantacao#009`; checklists de implantação (fundação, CRM, CEM,
  vendas, compras, recebimento). Prévias com molduras, número no lado e recorte do zoom olhadas para cada passo novo.
  JSON validado: imagens existem, ≤ 5 marcadores, todos com caixa/lado/explicacao, todo item do consultor com fonte, `status: rascunho`.
- Divergências novas (em `pendencias`): chave Ativo do novo participante (trilha × captura); caminho de Projetos (menu ×
  caminho no alto); caminho das regras de Aprovações de Desconto do CRM (plano × roteiro); cartão "Conversão" da Agenda ×
  "taxa de conclusão"; faixas da Carteira de Pedidos (base × card); nome do Dashboard (menu × título × caminho); colunas da
  Sugestão de Compra (roteiro com valores × tela sem valores); painel Módulos com 16 itens no staging (Config. Interna, Implantação).
- Continua sem imagem (falta captura): preferências do usuário (primeiros-passos); seções Endereço/Contato do participante
  (fundacao); janelas de importação e pedido importado (cem); vários passos avançados.
- Não verificado: nada foi conferido ao vivo no Flow nesta rodada (só capturas). Guias seguem `status: rascunho`.
