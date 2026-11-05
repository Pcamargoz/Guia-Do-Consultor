# Descobertas — documentação C (guias visuais: faturamento, fiscal, financeiro, tarefas, fluxo-completo, relatórios, alumina)

## 2026-11-05 · documentacao-c · Guias visuais (contrato-guia-visual v1)

- Descoberta: 7 `guia.json` gerados em `public/manuais/<modulo>/`, todos `status: "rascunho"`. 38 capturas tratadas
  (recorte, borrão, 1600 px, webp q82) em `public/manuais/<modulo>/img/`. Nenhuma imagem inventada; nenhum commit.
- Evidência: MCP `faktory-doc` (`harness_contexto(documento)`, `kb_search`, `kb_get_source`, `glossary_lookup`,
  client_id = null); base `lib/conteudo/base/<modulo>.json`; roteiros `videos/roteiros/*.json` (caixas de foco de
  `videos/src/gerado/*.json` usadas para medir marcadores); `midia/brutos/financeiro/{manifesto,roteiro-telas}.md`.
  Prévias com marcadores/destaques desenhados por ffmpeg conferidas uma a uma (fora do repo).
- Impacto: Guia Inicial ganha capítulos `basico` ilustrados em 4 módulos; Guia do Consultor ganha capítulos
  `avancado` + bloco `consultor` em 5 módulos.
- Próximo passo / pedido: capturas no staging (lista abaixo) e validação na tela antes de qualquer aprovação.

### Por módulo

| Módulo | Conceitos | Palavras | Capítulos (básico/avançado) | Passos | Passos com imagem | Imagens |
|---|---|---|---|---|---|---|
| faturamento | 5 | 9 | 4 (2/2) | 11 | 11 | 10 |
| financeiro | 5 | 10 | 4 (2/2) | 12 | 12 | 12 |
| tarefas | 5 | 10 | 3 (2/1) | 6 | 6 | 6 |
| fluxo-completo | 5 | 9 | 4 (3/1) | 10 | 9 | 9 |
| fiscal | 5 | 9 | 4 (2/2) | 10 | 1 | 1 |
| relatorios | 2 | 0 | 0 | 0 | 0 | 0 |
| alumina | 2 | 0 | 0 | 0 | 0 | 0 |

Fontes das capturas: `videos/public/telas/consultor-07-faturamento`, `consultor-08-financeiro`, `consultor-10-tarefas`,
`consultor-fluxo-completo`, `compra-em-nome-do-cliente` (25, 26) e `midia/brutos/financeiro/prints/` (dashboard,
contas a pagar, extrato, fluxo de caixa, contas bancárias, meios de pagamento, planos de conta).

Borrões aplicados: selo do tenant, avatar e nome do usuário, barra de URL do staging, CNPJ (Empresa), Cliente/Vendedor
da NF-e (traziam documento), CPF do técnico (fora do recorte da medição), valores em R$, nome/agência/conta das contas
bancárias, nome de pessoa no contrato, descrição da conta no Receber/Extrato. Texto dos guias sem valores nem dados de terceiros.

### Divergências e pontos a conferir na tela
- Faturamento: menu/glossário "Notas Fiscais" × título da tela "Documentos Fiscais".
- Fiscal: caminho dos cadastros — painel Fiscal › Classificação Fiscal (roteiro-fiscal-01/02) × Fiscal › Configurações
  (manual-08, FIS C). Onboarding: pendência obrigatória bloqueia (roteiro-fiscal-01#004) × só informa (checklist de
  implantação). "Diagnóstico Fiscal" (checklist) × "Diagnóstico do Seed", restrito ao suporte (roteiro-fiscal-01#008).
- Financeiro: Gerar Títulos em pedido Entregue já faturado; saldo inicial do Fluxo de Caixa; exclusão de título
  permanente × lógica (já registradas na base). Capturas em duas versões (1.22.13 e 1.23.2).
- Tarefas: quadro padrão "Tarefas Gerais" (manual-12) × quadro novo sem listas (procedimento); ícone de arquivar no
  cabeçalho do cartão não identificado com certeza na captura (marcador não colocado).
- Fluxo completo: o pedido do responsável lista "Expedição → Faturamento"; a base diz que Liberar para Expedição só
  existe em pedido Faturado (regra-vendas-liberar-para-expedicao-so-em-pedido-faturado). O guia segue a base.
- Relatórios e Alumina: seções da Apostila marcadas "Rever"; sem regra/funcional na base. Só conceitos com fonte.

### Capturas necessárias no staging (resumo; detalhe em `pendencias` de cada guia)
- Faturamento: nota autorizada (DANFE/XML/e-mail/CC-e), cancelamento, NFS-e, Certificados (Configuração Guiada).
- Fiscal: painel Fiscal, Editar CFOP, NCM + NCM por Estado, Textos Fiscais, Onboarding Fiscal, aba de impostos do item,
  Regras Fiscais de Serviço, Escrituração SPED.
- Financeiro: Estornar, diálogo Pagar, Painel Financeiro de Projetos, Boleto/PIX (homologação).
- Tarefas: diálogo Novo Quadro, Dashboard, Mover para outra lista/Arquivar no cartão.
- Fluxo completo: converter lead, Gerar Pedido de Venda, pedido de compra/nota de recebimento, Montar Nova Carga,
  movimentos de OP no estoque.
- Relatórios: menu Relatórios, Tabelas Dinâmicas (Executar/Exportar). Alumina: chat, ação com confirmação, usuário sem permissão.

### Não verificado
- Nenhum passo foi conferido na tela do Flow nesta tarefa (sem sessão no staging). Todos os passos são
  `captura-real` (captura existente), `base` ou `a-conferir-na-tela` (2 passos do Fiscal); os documentos continuam rascunho.
- Renderização no `PlataformaUI` (bloco guia-visual) não foi testada no navegador.

## 2026-11-05 · documentacao-c · Revisão v2 dos marcadores (contrato-guia-visual, seção "v2 dos marcadores")

- Descoberta: todos os passos com imagem de faturamento, fiscal, financeiro, tarefas e fluxo-completo passaram para
  marcadores v2 (`caixa` + `lado` + `rotulo` + `explicacao`), no máximo 5 por passo, sem `destaque` junto de zoom.
  Textos dos passos reescritos no imperativo (o que fazer + o que observar). Relatórios e Alumina sem imagem: intocados.
- Números: faturamento 12 passos/40 marcadores/6 zooms (+1 passo: menu do pedido faturado); fiscal 9 passos com
  imagem/36 marcadores/1 zoom (+4 passos e 6 imagens novas); financeiro 14/55/1 (+2 passos: Painel Financeiro de
  Projetos e PIX); tarefas 7/25/1 (+1 passo: Dashboard); fluxo-completo 9/30/3.
- Imagens novas (todas de capturas reais, 1600 px, webp q82): fiscal `02-impostos-nao-calculados-detalhe` (recorte
  ampliado de `consultor-07-faturamento/03-nova-nfe.png`), `03-painel-fiscal`, `04-classificacao-fiscal-detalhe`,
  `05-onboarding-fiscal`, `06-onboarding-obrigatorios-detalhe`, `07-diagnostico-fiscal`, `08-escrituracao-sped`;
  financeiro `13-pix`, `14-painel-financeiro-de-projetos`; tarefas `07-dashboard` (staging v1.23.2, 05/11/2026,
  `videos/capturas/guias-staging/`). Nenhuma delas mostra valor, conta, chave ou nome de pessoa; não foi preciso borrar.
- Não usadas: `faturamento-notas` e `financeiro-dashboard` (nomes de clientes e valores em R$ sem borrão);
  `financeiro-contas-pagar` (sem o diálogo Pagar); `faturamento-dashboard`, `tarefas-quadros`, `inicio-dashboard` (sem passo que precise).
- Evidência: prévias com caixas e números desenhados (ffmpeg) em `C:\Users\PEDROS~2\AppData\Local\Temp\guias-previa-c\`,
  conferidas uma a uma, inclusive os recortes de zoom (altura ≤ 420 px a 800 px de largura). JSON validado com node;
  toda imagem citada existe e bate com `largura`/`altura`.
- Divergências resolvidas pela tela (staging v1.23.2): Faturamento — menu "Notas Fiscais" e título "Documentos Fiscais"
  são a mesma tela; Fiscal — "Diagnóstico Fiscal" é o nome do menu (endereço diagnostico-seed, só consulta, usado pelo suporte).
- Divergências reduzidas: caminho dos cadastros fiscais (Painel Fiscal › Classificação Fiscal confirmado; falta conferir
  se Fiscal › Configurações › NCM/CFOP ainda existe); Onboarding (a tela diz que pendência obrigatória bloqueia o go-live).
- Divergências novas: Liberar para Expedição — só Faturado (regra-vendas-…) × Faturado ou Encerrado (oficial-ven-a-regras#002);
  aba "Conciliação" na tela PIX × "não existe Conciliação no menu" (regra-financeiro-baixa-atualiza-saldos-e-extrato).
- Não verificado: ícone de arquivar no cabeçalho do cartão de Tarefas (sem marcador); renderização no PlataformaUI
  não testada no navegador (proibido nesta tarefa). Nada conferido em tela com sessão; tudo segue `rascunho`. Sem commit.
