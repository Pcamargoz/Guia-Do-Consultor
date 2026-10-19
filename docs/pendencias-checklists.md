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

## Teste de fluxo do consultor

| Etapa | Situação |
|---|---|
| CRM: lead → BANT → conversão | Executado no dev. O lead/participante código 106 está convertido. |
| Pedido de venda | Preenchido, mas o salvamento foi **bloqueado**: a unidade "PÇ" do produto não está cadastrada na empresa METALURGICA TEST. **Decidir:** cadastrar a unidade (é configuração) ou usar outro produto com unidade válida, por exemplo o de um pedido já faturado, como o PV-000032. |
| Obra, medição, OP, estoque, expedição, nota (finalizar sem transmitir), títulos e gestão | Não executados. |

Para limpar depois do teste: lead/participante código 106 "TESTE FLUXO CONSULTOR - Cliente Metalurgica" (dev, METALURGICA TEST). No staging, confira se existe o lead "TESTE ESTAGIÁRIO - exploração": em 16/10 o salvamento coincidiu com a queda da sessão.

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
- Sessão: cai em atualizações do sistema e com várias abas. Confirmar com o time de produto se é esperado.
