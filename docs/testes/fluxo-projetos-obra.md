# Brief: fluxo de projetos e obra

**Relatório:** `45-fluxo-projetos-obra.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

O módulo Projetos nunca foi aberto na prática. Provar que a obra amarra pedido, produção, compras, estoque, serviços, nota e financeiro, e que os painéis refletem isso.

## Critério de aceite

1. Obra de teste com cliente, endereço e **estágios/etapas** cadastrados (a existente `TESTE-FLUXO-01` pode ser usada), vista em `Projetos > Todos os Projetos` e no Dashboard de Projetos.
2. Um **pedido novo ligado à obra** (Vendas > Novo Pedido com Projeto preenchido), com medição, OP e nota vinculadas à mesma obra, e o local de estoque do projeto (`Estoque > Locais`) que a nota com projeto exige.
3. Painéis conferidos com números: Painel Financeiro da obra (`/projetos/painel`), Progresso e Material, Plano de Resultado (previsto × realizado), aba de Produção/Campo/Compras e Andamento.
4. **Diário de Obra:** uma postagem de teste feita e vista (ou o impedimento documentado), e o diário aparecendo a partir do módulo Serviços.
5. **Comparar Obras** com a obra de teste e outra existente.
6. Regra "custo = destinado/comprometido; receita = nota autorizada" confirmada ou contestada com os números do teste.

## Roteiro

1. Ler o plano `public/checklists/validacao-projetos-faktory-flow.html` (roteiros 01 a 05 e 12) e `07-teste-fluxo-consultor.md` (D27: "A faturar" negativo).
2. Cadastrar/ajustar a obra, os estágios e as etapas; criar o local de estoque do projeto.
3. Criar o pedido ligado à obra e percorrer medição → OP → nota (finalizar sem transmitir) → títulos, só até onde o ambiente permitir.
4. Percorrer os painéis do item 3 do critério de aceite, anotando valores.
5. Diário de Obra e Comparar Obras.

## Entrega

Relatório conforme as regras comuns, com tabela "painel × valor esperado × valor obtido".
