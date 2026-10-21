# Checklists — pendências de validação

Situação em 19/10/2026. Faktory Flow v1.22.11 → v1.22.12. Validações feitas no staging (FESQUA 2026) e no dev (METALURGICA TEST e uma empresa com massa de cliente).

## Como retomar

1. Faça login no ambiente de teste numa aba do navegador integrado.
2. Rode **um agente por vez, nessa aba**. A sessão caiu em todas as rodadas:
   - 16/10 no staging, junto com a faixa "Sistema em atualização";
   - 16/10 no dev, com 5 abas abertas;
   - 19/10 no dev, com 3 abas de contas diferentes, junto com a troca de versão para v1.22.12.
3. Regras para os agentes:
   - nunca abrir `/login` nem clicar em "Sair";
   - não recarregar a página em sequência;
   - se cair no login, parar e avisar.
4. Depois de validar uma etapa, troque o selo dela para `s: 'v'` em `scripts/dados-checklists-estagiarios.mjs` ou `scripts/dados-checklist-consultor.mjs` e rode `node scripts/gerar-checklists-estagiarios.mjs`.
5. Cenários novos para os planos de QA vão em `scripts/dados-cenarios-checklists.mjs`. Para gravá-los, rode `node scripts/atualizar-cenarios-checklists.mjs`.

Os relatórios completos de cada rodada ficaram fora do repositório. Os pontos principais deles já estão nos checklists e nesta lista.

## Teste de fluxo do consultor (dev, METALURGICA TEST)

| Etapa | Situação em 19/10/2026 |
|---|---|
| CRM: lead → BANT → conversão | ✅ lead/participante 106 convertido |
| Pedido de venda | ✅ PV-000033 (depois de cadastrar a unidade "PÇ") |
| Medição | ✅ MED-000012 medida e assinada. A aprovação exige um conferente **diferente** de quem mediu: falta outro usuário vinculado a outro participante |
| Produção | ✅ OP-000109 produzida e com entrada no almoxarifado. O apontamento #182 não finaliza (defeito de horário) |
| Nota fiscal | ✅ NF-019 finalizada, **não transmitida** |
| Expedição | ✅ carga 20261000001 entregue |
| Títulos do pedido | ✅ (20/10) PV-000033/001, R$ 865,38, depois de trocar o tipo do meio "Duplicata Mercantil" de Boleto para **Outros** (antes exigia conta emissora). **Decisão pendente do fiscal:** o tipo pode alimentar o código de pagamento da nota |
| Baixa / gestão | ✅ baixa parcial (400,00 + residual 465,38), estorno, baixa total, Saldos, Extrato, Fluxo de Caixa, DRE e Painel conferidos. O título manual "TESTE-FLUXO-PV33" **duplica** o recebível do pedido: estorne e exclua |

### Registros e configurações para limpar (dev, METALURGICA TEST)
- Cadastros: lead/participante 106; projeto TESTE-FLUXO-01; unidade de medida "PÇ" (já existia "PC").
- Operação: PV-000033; MED-000012; OP-000109 (apontamento #182 aberto); NF-019 (finalizada, homologação); carga 20261000001.
- Financeiro: título manual TESTE-FLUXO-PV33 (baixado).
- Configurações: almoxarifado ALM-TESTE; conta bancária "TESTE FLUXO CONSULTOR" (definida como padrão para boleto); vínculo do usuário pedro.santos ao participante 00001 em Conferentes.

## Telas ainda não abertas

| Módulo | Falta validar | Checklist afetado |
|---|---|---|
| Cadastros | Detalhe e formulário de Participantes, Produtos e Projetos | 02 |
| CRM | Pipeline, Atividades, Agenda, Clientes/Visão 360°, Projetos de Obra, Dashboard Executivo | 03 |
| Vendas | Detalhe de um pedido existente; caminho do pedido até a nota | 04, 12, 15 |
| Compras | Todas as telas por dentro (só o menu foi visto) | 05 |
| Recebimento | Notas de Recebimento, conferência por dentro, Notas pendentes/DFe, Controle de Terceiros | 06 |
| Estoque | Transferências, Inventário, Empréstimos, Encerramentos, Reposição, Locais, Demonstrativos | 07 |
| Produção | Painel do planejamento, Desempenho, Inteligência/IA, demonstrativos | 08 |
| Serviços | Detalhe da medição, Instalações, Vistorias, Assistência, Cockpit, Diário de Obra, app `/campo` | 09 |
| Projetos | Módulo inteiro | 10 |
| Expedição | Módulo inteiro | 11 |
| Faturamento/Fiscal | "+ Nova NF-e", detalhe da nota, aba NFS-e, telas do Fiscal | 12 |
| Financeiro | Módulo inteiro (só o menu foi lido) | 13 |
| Tarefas | Módulo inteiro | 14 |

## Defeitos e dúvidas para o time

- O CEP preenche o bairro "Sé", e o sistema recusa ao salvar ("Bairro deve ter pelo menos 3 caracteres").
- A Temperatura do lead muda sozinha ao salvar.
- O erro de unidade de medida só aparece no Salvar do pedido.
- O aviso de boleto continua depois de trocar o meio de pagamento.
- No item de esquadria, as dimensões estão rotuladas em mm, mas os valores parecem metros.
- No Budget, digitar "100000" vira R$ 100.000,00.
- Kanban de leads: o card cai uma coluna antes de onde é solto, e clicar fora do diálogo cancela sem aviso.
- Pedidos de venda com o mesmo número na lista "Todos" (dev); no staging, o filtro "Todos" dá erro.
- Estoque: vidros com área em mm² rotulada como m²; saldo negativo valorizado de forma inconsistente; encerramento de set/2026 duplicado.
- Serviços: rótulos "(HORAS)" em campos de tolerância; nenhum usuário vinculado como conferente.
- Recebimento: a conferência aparece no menu como "Aprovações".
- Faturamento: os cartões do topo não seguem o filtro de status.
- Segurança: a tela de Usuários mostra "Limite 2/10" com 4 usuários listados.
- Produção: o apontamento não finaliza ("A data/hora de fim não pode ser no futuro"; a API recebe o horário correto em UTC) e continua aberto depois da OP produzida.
- OP: a Empresa é obrigatória, mas a dica diz que ela herda do pedido; o Item do pedido não copia a quantidade.
- Faturamento: o pedido fica "Faturado" com a nota ainda em aberto; o número da nota é consumido numa finalização que falhou; a Timeline da nota fica vazia; finalizar a nota não gera saída de estoque.
- Expedição: avisa "item sem ordem de produção vinculada" mesmo com OP; "Liberar para Expedição" só aparece depois de faturar, e o aviso da tela não diz isso.
- Financeiro: "Duplicata Mercantil" cadastrada como Boleto; o Fluxo de Caixa mostra saldo inicial negativo após a baixa.
- Gestão: o Dashboard de Vendas mostra "0 faturados" com o pedido entregue; o painel da obra mostra "A faturar" negativo.
- Sessão: cai em atualizações do sistema e com várias abas. Confirmar com o time de produto se é esperado.

## Fluxos por processo (consultor)

Os 10 fluxos têm checklist para **validação manual por pessoas** (aba Checklist do guia). A validação por agentes foi pausada em 20/10/2026 a pedido do time: primeiro a documentação, depois a validação humana.

| Fluxo | Origem do conteúdo |
|---|---|
| 01 · Suprimentos | executado no dev em 19/10 (SC-000289 → COT-000013 → PC-000009 → NR-000013 → título pago) |
| 02 · Serviços de campo | executado no dev em 19/10 (MED-000013 → INS-000003 → VIST-000001 → AT-000002) |
| 03 · Comercial | executado até o ganho da oportunidade; a geração do pedido pela oportunidade ficou bloqueada |
| 04 · Estoque, 05 · Produção, 06 · Expedição | roteiros dos planos de QA + o que foi visto (caminho feliz da expedição e da OP) — **a validar por pessoas** |
| 07 · Faturamento e fiscal | execução parcial de 19/10 (nota finalizada sem transmitir) + decisões do responsável fiscal |
| 08 · Financeiro | baixa parcial/total e estorno executados em 20/10; "Gerar Títulos" do pedido bloqueado pelo tipo do meio de pagamento |
| 09 · Projetos e obra, 10 · Tarefas | roteiros dos planos de QA — **a validar por pessoas** |

Como as pessoas validam e devolvem o resultado: [validacao-manual.md](validacao-manual.md).

## Limpeza do ambiente de teste (dev, METALURGICA TEST)

- **Suprimentos:** fornecedor 107; SC-000289; COT-000013; PC-000009; NR-000013 (NF fictícia 990001/900); movimento de estoque 000005; título NR-000013/001 (pago); parâmetro "Usar Conferência Física" (ligado).
- **Serviços:** técnico 108; equipe id 18; MED-000013; INS-000003; VIST-000001; AT-000002; MED-000012 antiga (reprovar/excluir); categoria de checklist TFC01; **template de checklist obrigatório "TESTE FLUXO CONSULTOR" (desativar)**; vistoria automática = 1 dia.
- **Financeiro (20/10):** o título manual TESTE-FLUXO-PV33 foi estornado, baixado em parte (R$ 300,00) e o residual /002 (R$ 565,38) baixado: o cadastro tem os títulos /001 e /002 recebidos. A exclusão (lixeira) **não** foi feita. Saldo da conta "TESTE FLUXO CONSULTOR" ≈ R$ 365,38 antes e +865,38 depois. **Atualização (20/10, agente de validação):** o meio "Duplicata Mercantil" foi trocado de Boleto para **Outros** (para desfazer: Meios de Pagamento > editar > Tipo = Boleto; efeito na nota não verificado, decisão do fiscal). Foram criados o título gerado PV-000033/001 (R$ 865,38, recebido; campo Projeto = TESTE FLUXO CONSULTOR) e as baixas do teste; a conta "TESTE FLUXO CONSULTOR" está com R$ 1.230,76. Para limpar: estornar e excluir TESTE-FLUXO-PV33/001 e /002; estornar PV-000033/001.
- **Fluxo comercial (20/10, agente de validação) — parcial:** o handoff gerou o PV-000034 (R$ 8.653,80) só com CFOP sem financeiro (5910-1); com CFOP de venda falha e nenhuma configuração resolve (precisa de correção no produto). A obra foi criada. **Falta** a aprovação de desconto por segundo usuário: criar na empresa de teste um Vendedor e um Supervisor de Vendas/Gerente Geral. **Defeitos:** D12 (filtro de CFOP), D13 (toast de erro depois do pedido e botão que permite duplicar), D14 (alto: painel da oportunidade não abre depois do pedido), D15 (Criar Projeto de Obra pede cliente já preenchido), D16 (obra sem vínculo com a oportunidade), D17 (reverter ganho não remove a oportunidade de Pós-Venda e ganhar de novo duplica), D18 (datas deslocadas em 1 dia). **Limpar:** PV-000034 (id 1567, CFOP 6101, condição 30 Dias), obra "TESTE FLUXO CONSULTOR - Obra Comercial", OPO-000013/014/017 (Pós-Venda), OPO-000016 e OPO-000012 (ganhas). Nenhuma configuração de empresa foi alterada. CFOPs que geram financeiro: 5101, 5102, 5102-2, 5116, 5117, 5122, 5123, 5124 e 5922; não geram: 5901, 5902, 5910, 5911, 5912, 5915, 5916, 5917, 5923 e 5152. (D12: o filtro "Gerar Financeiro = Não" da lista de CFOP não filtra.)
- **Fluxo de estoque (20/10, agente de validação) — parcial:** comprovados transferência (TRF-000001, mov 000006), estorno (000007/000008), reposição e sugestão de compra, empréstimo (000009 a 000011, devoluções parcial e total) e o balanço final (10 PT / R$ 500). O inventário foi aberto, contado e cancelado (000001 e 000002, sem ajuste); **falta** auditar e aprovar com um segundo usuário (a regra de separação vale até para Super Usuário). Não testados: ajustes positivo e negativo, mês encerrado, reserva por cor e local, consumo parcial da reserva, contagem pelo celular. **Defeitos:** D1 (alta: os parâmetros "invade reserva" e "empenhar OP" não existem na v1.22.12 e a saída passa sobre material reservado, disponível −2), D3 ("Empréstimos vencidos" 0 na Visão geral contra 1 no Controle operacional), D5 (avisos não somem e cobrem botões), D6 (a 2ª contagem diz "prossiga" mas o sistema recusa), D2 (motivo da transferência não aparece no movimento), D4 (empréstimo 100% devolvido ainda "1 dia atrasada"), D7 (4 contra 5 aparece como "Bateu" no inventário Simples), D8 (erros mostram ids internos), D9 (dezenas de POST de csp-report por navegação), D10 (Origem da Mercadoria só avisa depois de Salvar). **Configurações alteradas:** novo local ALM-TESTE-2 (inativar para desfazer); Origem da Mercadoria de P-PAR-431PH passou de vazia para "0 - Nacional" e **não volta a vazio pela tela**; coluna Reservada ligada no Saldo (só no navegador); "bloquear saída sem saldo" e estoque mínimo foram ligados e devolvidos ao original. **Registros a limpar:** TRF-000001 a 000003, movimentos 000006 a 000011, empréstimo 000009, inventários 000001 e 000002 (cancelados).
- **Blocos "Preparar seus dados" (21/10, agente de validação) — feito:** conferidos no DEV os passos de pedido de compra direto da solicitação (SC-000290 → PC-000010), obra no pedido (PV-000034, pelo lápis "Editar pedido"), quadro e cartão de Tarefas (quadro id 48) e os dois leads do CRM; os textos dos checklists 03, 05, 10 e 14 foram corrigidos com os rótulos reais. **Defeitos novos:** (CRM) escolher Temperatura "Quente" gravou "Morno" uma vez; (Tarefas) o autor do comentário aparece como "Usuário", o cartão nasce sem responsável e não existe campo "Prazo" (é "Término Previsto"); (Compras) o Status do pedido continua "Em Edição" depois de salvo (a lista mostra "Em Aberto") e o CFOP é obrigatório sem asterisco; a aba do navegador embutido abre com 558 px, em layout mobile. **Não diferenciado:** o filtro "Só minhas", porque os 6 leads do DEV têm o mesmo responsável. **Limpar:** PC-000010 antes da SC-000290, o Projeto do PV-000034 (limpar o campo), o quadro id 48 e os leads "TESTE ESTAGIÁRIO - Maria 1" e "Maria 2".
- **Fluxo de produção (21/10, agente de validação) — parcial (resultado final):** a OP-000110 (qtd 2, produto 3638 com estrutura de 2 itens) foi criada com as requisições nascendo sozinhas ao salvar, baixa parcial e total, estorno com motivo, conclusão e entrada do produto acabado (movimento 000024, 2 un, R$ 500,00). Saldos no ALM-TESTE: parafuso 10 → 2, chapa 10 → 6 → 4 (depois da separação), produto acabado 0 → 2; custo estimado R$ 532,00 e realizado R$ 500,00 (mão de obra R$ 0,00 porque o apontamento não fecha). Separação: OP-000111 e SEP-000001 (chapa separada, falta do parafuso registrada). Fila de exceções igual antes e depois (14). **Defeitos:** D12 persiste (apontamento #183 não finaliza: fim em UTC correto recusado com "não pode ser no futuro"); D23 (OP concluída com apontamento aberto e "Cancelar OP" habilitado numa OP Produzida); "disponível/falta" desconta duas vezes a reserva da própria OP (2 disponível · falta 6 com 10 em estoque); /separacao mostra o id interno em vez do número da OP; "Registrar falta" já vem com motivo e não há reverter; o primeiro clique no cartão da lista de separação não abre. **Não testado:** criar etapas e processo, segunda estrutura sobreposta, feriados, requisição em OP Produzida, aprovar/rejeitar/reabrir apontamento (dependem de finalizar), duplo clique na separação, painel de fábrica. **Limpar:** SEP-000001, OP-000111, OP-000110, apontamento #183 (aberto), movimentos 000018 a 000024 e a baixa da separação, estrutura do 3638 e produtos 3638 e 3639. O texto abaixo é o estado anterior, da preparação: o limite de uso e depois o fechamento da aba logada interromperam o brief. Feito: produtos 3638 "TESTE FLUXO CONSULTOR - PRODUTO ACABADO ESTRUTURA" e 3639 "TESTE FLUXO CONSULTOR - INSUMO CHAPA" (custo R$ 25); entrada manual 000018 de 10 chapas em ALM-TESTE; estrutura do 3638 com 2 itens (parafuso P-PAR-431PH × 4 e chapa × 2), com o erro "Selecione a cor do produto" confirmado. **Falta:** criar a OP (produto 3638, Empresa METALURGICA TEST, quantidade 2, processo "Cortar vidros"), baixa dos insumos, apontamento, conclusão, custo e fila de exceções. Observações: o erro de cor cita o id interno (#1292); clicar em "BRANCO" selecionou "AZ-FRA"; a fila de exceções diz "nenhum almoxarifado central ativo" embora ALM-TESTE exista. Para limpar: lixeira da estrutura do 3638 e uma saída de 10 chapas em ALM-TESTE.
- **Defeitos novos do financeiro:** (D-F1) o card "Recebido no mês" do Início soma o valor original do título numa baixa parcial (esperado +400, obtido +865; o estorno tirou 865); (D26) o Fluxo de Caixa mostra Saldo Inicial = −(entradas − saídas do mês) e Saldo Final 0, reproduzido 3 vezes; (D27) pedido Entregue sem "Editar" impede ligar o pedido ao projeto, e o painel mostra "A faturar" negativo.
- **Comercial:** faixa de alçada de desconto criada e desativada; oportunidades OPO-000011, 12 e 15; clientes 106 e 109; leads de teste.
