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
| Títulos do pedido | ❌ "Gerar Títulos" exige conta **emissora** de boletos porque "Duplicata Mercantil" está cadastrada como tipo Boleto. Decidir: corrigir o tipo do meio de pagamento ou habilitar conta emissora |
| Baixa / gestão | ✅ testadas com um título manual "TESTE-FLUXO-PV33" (criado pelo agente fora do roteiro). **Estorne e exclua esse título antes de gerar os títulos do pedido**, para não duplicar |

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

| Fluxo | Situação |
|---|---|
| 01 · Suprimentos | ✅ executado em 19/10 (SC-000289 → COT-000013 → PC-000009 → NR-000013 → título pago) |
| 02 · Serviços de campo | ✅ executado em 19/10 (MED-000013 → INS-000003 → VIST-000001 → AT-000002) |
| 03 · Comercial | em teste |
| 04 · Estoque, 05 · Financeiro | a testar |

Para limpar (Suprimentos): fornecedor 107; SC-000289; COT-000013; PC-000009; NR-000013 (NF fictícia 990001/900); movimento de estoque 000005; título NR-000013/001 (pago); parâmetro "Usar Conferência Física" (ligado nesta empresa).

Para limpar (Serviços): técnico 108; equipe id 18; MED-000013; INS-000003; VIST-000001; AT-000002; MED-000012 antiga (reprovar/excluir); categoria de checklist TFC01; **template de checklist obrigatório "TESTE FLUXO CONSULTOR" (desativar)**; vistoria automática = 1 dia.
