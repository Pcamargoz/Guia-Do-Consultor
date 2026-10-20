# Brief: exploração de leitura para a trilha do estagiário

**Relatório:** `47-exploracao-trilha.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

Converter em "Verificado" as etapas da trilha que ainda são `doc` ou `n/v` e que só exigem **leitura** de telas. A lista exata é [lacunas.md](lacunas.md) (regenerar com `npm run checklists:lacunas`).

## Critério de aceite

Para cada etapa de leitura de [lacunas.md](lacunas.md) dos checklists **02, 03 (seção 6), 05, 06, 10, 13 e 14**:

- a tela foi aberta e a informação do checklist confere (nome exato dos botões, abas e filtros);
- onde diferir, o texto correto está anotado ("o checklist diz X, a tela mostra Y");
- nenhum registro foi criado ou alterado (**somente leitura**; abrir "Novo" e cancelar é permitido).

## Roteiro

1. Ler [lacunas.md](lacunas.md) e agrupar por módulo para percorrer cada módulo uma vez só: Cadastros, CRM (Pipeline, Atividades, Agenda), Compras, Recebimento, Projetos, Financeiro e Tarefas.
2. Para cada etapa: abrir a tela, conferir o texto da etapa, marcar `confere | diverge | não encontrado` e anotar o detalhe.
3. Registrar também, por módulo: caminho do menu e URL, filtros padrão, botões perigosos e termos que confundem iniciantes.

## Entrega

Tabela por checklist: etapa · resultado · observação. Ao final, a lista de etapas que podem passar a `'v'` e a lista de textos a corrigir.
