# Validação manual dos checklists

Os checklists da aba **Checklist** do guia foram escritos para pessoas validarem no ambiente de teste. Cada etapa diz **o que fazer** e o que **conferir** no módulo seguinte, e traz o selo da origem: *Verificado* (já visto no sistema), *Documentação* (vem dos roteiros, ninguém executou) ou *Não validado*. O objetivo da validação manual é transformar *Documentação* e *Não validado* em *Verificado*, ou achar o que diverge.

## Quem, onde e com quê

- **Ambiente de teste** (nunca produção): dev (`https://dev.flow.faktory.com.br`, empresa METALURGICA TEST) ou staging. Confira o selo da empresa no topo antes de começar.
- **Uma pessoa por vez** no mesmo conjunto de registros e uma aba só do sistema: a sessão cai com várias abas e em atualizações.
- Regras de segurança em todos os fluxos: **não transmitir nota fiscal** sem o responsável fiscal; e-mails só para `@tuamaeaquelaursa.com`; nomeie o que criar com "TESTE FLUXO CONSULTOR"; não mexa em registros de outras pessoas.

## Passo a passo

1. Abra o guia, aba **Checklist**, e escolha o fluxo (a ordem sugerida está nos nomes: 01 a 10). O checklist abre dentro do guia; **Baixar** gera um HTML que funciona offline.
2. Escreva seu nome em **"Quem está validando"** (fim da página).
3. Cumpra os **pré-requisitos**; sem eles, vários passos falham por motivo de configuração, não de defeito.
4. Execute etapa por etapa. Ao terminar e conferir o resultado, **marque a caixa**. Anote o **número do registro** criado no campo ao lado da etapa.
5. Se algo divergir, clique em **Problema** na etapa e escreva *esperado × obtido*, a mensagem de erro e o nº do registro. A etapa fica em vermelho e o contador de problemas sobe.
6. Se um passo não puder ser feito (falta de permissão, de dado ou de configuração), **não marque**: registre o motivo em Problema com "BLOQUEADO:" no começo.
7. Ao final, clique em **Relatório** (topo): o resultado é copiado em Markdown (progresso, etapas, registros, problemas e anotações). Cole no chamado ou e-mail.
8. O progresso fica salvo **no seu navegador**. **Recomeçar** apaga tudo, inclusive os problemas.

## Consolidar

Quem consolida os relatórios:

- troca o selo da etapa para `'v'` em `scripts/dados-*.mjs` quando **duas** pessoas, ou uma pessoa e o responsável pelo módulo, confirmam;
- acrescenta os defeitos em `scripts/dados-cenarios-checklists.mjs` (para os planos de QA) e em `docs/pendencias-checklists.md`;
- roda `npm run checklists` (gera, valida e confere as cópias) e faz o commit;
- registra no relatório o que foi criado, para a limpeza do ambiente (lista em [pendencias-checklists.md](pendencias-checklists.md)).

## Ordem sugerida

| Ordem | Fluxo | Dependência |
|---|---|---|
| 1 | 01 Suprimentos · 03 Comercial · 02 Serviços | já executados por agente: só confirmar |
| 2 | 04 Estoque · 05 Produção · 06 Expedição | precisam de saldo e do almoxarifado central |
| 3 | 07 Faturamento e fiscal · 08 Financeiro | precisam de pedido faturado e de meios de pagamento conferidos |
| 4 | 09 Projetos e obra · 10 Tarefas | independentes; 09 melhora com pedidos ligados à obra |
