# Brief: fluxo de produção com estrutura de produto

**Relatório:** `44-fluxo-producao-estrutura.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

A OP de teste (OP-000109) saiu sem requisições porque o produto não tem estrutura (BOM). Provar o ciclo completo com estrutura: OP → materiais necessários → requisição/baixa → apontamento → conclusão → entrada do produto acabado, e rever o defeito do apontamento.

## Critério de aceite

1. Um produto de teste com **estrutura de produto** e **processo** (`Produção > Configurações > Estrutura de produto` e `Processos de produção`) criado ou escolhido entre os existentes, com insumos que tenham saldo no almoxarifado central.
2. Uma OP desse produto com **Materiais necessários** preenchidos pela estrutura ("Importar da estrutura"), a **baixa** dos insumos e o saldo antes/depois conferidos em `Estoque > Saldo` e `Movimentos` ("Baixa de componente em OP").
3. Apontamento **iniciado e finalizado**; resultado do defeito "A data/hora de fim não pode ser no futuro" reproduzido de novo (anote horário do navegador × resposta da API). Se finalizar funcionar, registre o que mudou.
4. OP concluída e "Entrada de produto acabado (OP)" no estoque com a quantidade certa; custo da OP (`Mais ações > Custo da OP`) e linha do tempo conferidos.
5. **Separação de materiais** (`Produção > Separação de materiais`): gerar uma lista para a OP e abri-la no app `/separacao` (sem usar "Sair").
6. Fila de exceções (`Produção > Fila de exceções`) conferida antes e depois: o teste não deve criar pendências novas.

## Roteiro

1. Ler `22-dev-producao-a-financeiro.md` (menu e telas de Produção) e `07-teste-fluxo-consultor.md` (D11, D12, D23).
2. Criar/escolher produto, estrutura e processo; criar a OP com **Empresa** e **Quantidade** preenchidas.
3. Executar os itens 2 a 6 do critério de aceite.
4. PCP: abrir `Planejamento > PCP` e conferir se a OP aparece no backlog (não arrastar cards).

## Entrega

Relatório conforme as regras comuns, com a tabela de saldos antes → depois por insumo.
