# Roteiro de telas cruas — módulo `financeiro` — v02

- Autor: Producer. Revisão: Director (nomes no glossário, fontes, borrões). Status: v02 com os ajustes da validação `07-relatorios-validacao/brutos-financeiro_geral_validacao-roteiro-telas_v01.md`. A v01 não sobe.
- Destino no repo (montagem pelo Lead): `midia/brutos/financeiro/roteiro-telas.md`. Id do módulo conforme `lib/conteudo/base/indice.json`: `financeiro`.
- Ambiente: staging do Faktory Flow, empresa de teste METALURGICA TEST, dados fictícios. Gravado em 05/11/2026 00:12:08–00:27:20 (UTC-3). Tour **só leitura**: nada foi salvo, recebido, pago ou estornado. Login feito pelo Pedro.
- Captura: `financeiro_bruto_v01.mp4`, 912,43 s, 1920×1200, 30 fps, H.264, sem áudio. **Recorte recomendado `crop=1920:1080:0:80`**. Tempos do arquivo bruto, conferidos pelo breadcrumb em quadros a cada 5 s (±3 s).
- Fontes: o glossário (`conhecimento/glossario/telas.yaml`) só tem `financeiro.contas-a-receber` e `financeiro.contas-a-pagar`, com a fonte `funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`. Essa fonte também cobre Saldos, Extrato e Fluxo de Caixa. As outras telas estão marcadas como "fora do glossário" e "observado na tela"; o nome usado é o breadcrumb.

| Início–fim (s) | Tela (glossário / breadcrumb) | O que acontece | Campos / regras que aparecem (fonte) | Usar? | Áreas sensíveis |
|---|---|---|---|---|---|
| 0–57 | Vendas › Pedidos | Sobra do módulo anterior; seletor de módulos aberto em ~20 s | — | **descartar** | A, B, C |
| 57–72 | Financeiro › Dashboard Geral | Carrega (~60 s, mapa vazio) e mostra os cards de totais | observado na tela | sim, a partir de ~63 s | A, B |
| 72–83 | `financeiro.contas-a-receber` | Cards de totais e lista de títulos | colunas PARTICIPANTE, DOCUMENTO, PARCELA, DATA DE VENCIMENTO, STATUS, VALOR TOTAL; botão Receber; filtro Status vem com "Em aberto" por padrão (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`, `regra-financeiro-contas-a-receber-filtro-padrao-em-aberto`) | sim | A, B, C (lista) |
| 83–122 | `financeiro.contas-a-pagar` | Cards e lista; troca de abas (~95–120 s) | aba Pagamentos; botão Pagar (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`) | sim | A, B, C |
| 122–137 | Financeiro › Transferências (fora do glossário) | Lista de transferências | observado na tela | sim | A, B |
| 137–157 | Financeiro › Devoluções (fora do glossário) | Lista vazia ("Nenhum resultado") | observado na tela | sim | A, B |
| 157–177 | Financeiro › Extrato | Extrato bancário; menu de período aberto (~170 s) | Saldos, Extrato e Fluxo de Caixa (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`) | sim | A, B, D (nome/conta bancária) |
| 177–217 | Financeiro › Pix (fora do glossário) | "Pix ainda não configurado"; abas percorridas | observado na tela | sim, sem repetir abas | A, B |
| 217–237 | Financeiro › Saldos | Carrega (~220 s) e mostra os cards de contas e saldos por plano | Saldos (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`) | sim, a partir de ~223 s | A, B, D |
| 237–277 | Financeiro › Fluxo Caixa | Fluxo de caixa por período | Fluxo de Caixa (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`) | sim | A, B |
| 277–297 | Financeiro › Budget › Comparativo (fora do glossário) | Budget × realizado | observado na tela | sim | A, B |
| 297–317 | Financeiro › Dre (fora do glossário) | DRE | observado na tela | sim | A, B |
| 317–412 | Projetos › Painel; Participantes; Produtos; Configurações › Projetos | Atalhos do menu que saem do Financeiro | — | **descartar** (são de Projetos/Cadastros) | A, B, C |
| 412–432 | Relatórios › Extrato - Movimentação Financeira | Relatório | observado na tela | sim | A, B, C |
| 432–442 | Relatórios › Financeiro - Fluxo de Caixa Simples | Relatório | observado na tela | sim | A, B |
| 442–462 | Relatórios › Financeiro - Follow Up de Contas… | Relatório | observado na tela | sim | A, B, C |
| 462–472 | Relatórios › Financeiro - Visão Geral | Relatório | observado na tela | sim | A, B |
| 472–482 | Relatórios › Fluxo de Caixa - Previsto | Relatório | observado na tela | sim | A, B |
| 482–492 | Relatórios › Resumo de Fluxo de Caixa | Relatório | observado na tela | sim | A, B |
| 492–537 | Relatórios › Resumo Financeiro | Relatório (tempo parado longo) | observado na tela | sim, encurtar | A, B |
| 537–582 | Configurações › Meu Portal | Configuração do portal | observado na tela | sim | A, B, E |
| 582–592 | Configurações › Meu Portal › Usuários | Lista vazia ("Nenhum cliente tem acesso ao portal ainda") | observado na tela | sim (seguro) | A, B |
| 592–612 | Configurações › Integrações › Chaves de API | Lista de chaves | observado na tela | só com borrão | A, B, F (chaves/tokens) |
| 612–622 | Configurações › Integrações › Documentação da API | Documentação | observado na tela | sim | A, B |
| 622–647 | Configurações › Contas Bancárias | Lista de contas | campo Conta Bancária (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`) | só com borrão | A, B, D |
| 647–667 | Configurações › Meios Pagamento | Lista de meios | campo Meio de Pagamento; boleto exige conta emissora (`funcional-financeiro-receber-pagar-saldos-e-fluxo-de-caixa`, `regra-financeiro-meio-de-pagamento-boleto-exige-conta-emissora`) | sim | A, B |
| 667–687 | Configurações › Instruções Bancárias | Lista | observado na tela | sim | A, B |
| 687–707 | Configurações › Bancos | Lista de bancos | observado na tela | sim | A, B |
| 707–727 | Configurações › Bancos › Gerenciar (Webservice Bancos) | Lista de bancos e switches, sem credenciais | observado na tela | sim (seguro) | A, B |
| 727–757 | Configurações › Planos Conta | Árvore do plano de contas | observado na tela | sim | A, B |
| 757–777 | Configurações › Budget | Cadastro de budget | observado na tela | sim | A, B |
| 777–797 | Configurações › Portadores (/configuracoes/portadores) | Lista com 7 portadores | observado na tela | sim | A, B |
| 797–832 | Configurações › Plugboleto (Boleto) | Abas Assistente, Padrões e Avançadas; bloco Empresa com CNPJ, Razão Social, E-mail e Endereço | observado na tela; boleto exige conta emissora (`regra-financeiro-meio-de-pagamento-boleto-exige-conta-emissora`) | **só com borrão** | A, B, G |
| 832–852 | Tabelas Dinâmicas › Conciliação Bancária (/cubos) | Cubo | observado na tela | sim | A, B, C |
| 852–857 | Tabelas Dinâmicas › Contas a Pagar | Cubo | observado na tela | sim | A, B, C |
| 857–867 | Tabelas Dinâmicas › Contas a Pagar por Obra | Cubo | observado na tela | sim | A, B, C |
| 867–877 | Tabelas Dinâmicas › Contas a Receber | Cubo | observado na tela | sim | A, B, C |
| 877–887 | Tabelas Dinâmicas › Transferências Bancárias | Cubo | observado na tela | sim | A, B |
| 887–912 | Financeiro › Dashboard Geral | Volta ao início | — | **descartar** (repetida) | A, B |

## Prints (pasta `prints/` no repo)

| Arquivo | Offset | Tela | Áreas |
|---|---|---|---|
| prints/financeiro_dashboard-geral_01.png | 67 s | Dashboard Geral | A, B |
| prints/financeiro_contas-a-receber_01.png | 80 s | Contas a Receber | A, B, C |
| prints/financeiro_contas-a-pagar_01.png | 92 s | Contas a Pagar | A, B, C |
| prints/financeiro_transferencias_01.png | 127 s | Transferências | A, B |
| prints/financeiro_devolucoes_01.png | 147 s | Devoluções | A, B |
| prints/financeiro_extrato_01.png | 167 s | Extrato | A, B, D |
| prints/financeiro_pix_01.png | 187 s | Pix | A, B |
| prints/financeiro_saldos_01.png | 227 s | Saldos | A, B, D |
| prints/financeiro_fluxo-de-caixa_01.png | 252 s | Fluxo de Caixa | A, B |
| prints/financeiro_budget-comparativo_01.png | 287 s | Budget › Comparativo | A, B |
| prints/financeiro_dre_01.png | 307 s | DRE | A, B |
| prints/financeiro_relatorios-extrato-movimentacao_01.png | 422 s | Relatório Extrato - Movimentação | A, B, C |
| prints/financeiro_relatorios-resumo-financeiro_01.png | 512 s | Relatório Resumo Financeiro | A, B |
| prints/financeiro_config-meu-portal_01.png | 562 s | Meu Portal | A, B, E |
| prints/financeiro_config-chaves-de-api_01.png | 602 s | Chaves de API | A, B, F |
| prints/financeiro_config-contas-bancarias_01.png | 632 s | Contas Bancárias | A, B, D |
| prints/financeiro_config-meios-de-pagamento_01.png | 657 s | Meios de Pagamento | A, B |
| prints/financeiro_config-instrucoes-bancarias_01.png | 677 s | Instruções Bancárias | A, B |
| prints/financeiro_config-bancos_01.png | 697 s | Bancos | A, B |
| prints/financeiro_config-planos-de-conta_01.png | 742 s | Planos de Conta | A, B |
| prints/financeiro_config-budget_01.png | 767 s | Budget (configuração) | A, B |
| prints/financeiro_config-portadores_01.png | 787 s | Portadores | A, B |
| prints/financeiro_config-boleto_01.png | 812 s | Boleto (Plugboleto) | A, B, G |
| prints/financeiro_tabelas-dinamicas-conciliacao-bancaria_01.png | 842 s | TD Conciliação Bancária | A, B, C |

## Observações para quem for editar
- O cabeçalho (A, B) e a barra de status com URL aparecem o tempo todo.
- Trechos a evitar: 0–57 s (Vendas), 317–412 s (fora do Financeiro) e 887–912 s (repetição). Também os carregamentos em ~60 s e ~220 s.
- O tour foi só leitura. Nenhuma regra de baixa (Receber/Pagar/Estornar) foi executada, então mensagens como "Título recebido com sucesso" não aparecem.
- Só Contas a Receber e Contas a Pagar estão no glossário (confiança B). As outras telas foram nomeadas pelo breadcrumb.
- As regras de baixa (baixa parcial, estorno, saldos e extrato atualizados, título manual × gerado) existem no Harness, mas **não foram gravadas, porque o tour foi só leitura**.
- Chaves de API (592–612 s): a lista mostra só o prefixo truncado (`ffk_…`). F fica marcada por precaução, sem bloquear o uso.
- **PENDÊNCIA:** o item "Painel Financeiro de Projetos" aparece no menu do Financeiro, mas não foi gravado. Gravar no Financeiro ou no módulo Projetos.
- Boxes C e D conferidos em pixels (1920×1080): veja o manifesto v02.
