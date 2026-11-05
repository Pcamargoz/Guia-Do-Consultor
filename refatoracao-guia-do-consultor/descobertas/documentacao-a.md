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
