# Testes do Faktory Flow com agentes

Modelo de trabalho do Harness aplicado aos checklists: **entender → especificar → planejar → executar → validar → entregar → registrar**. Nada é executado sem critério de aceite; nada vira "Verificado" sem evidência.

## Antes de ter acesso (já feito)

- A fila do que falta está em [lacunas.md](lacunas.md) (`npm run checklists:lacunas` atualiza).
- Cada fluxo tem um brief pronto nesta pasta. O brief só traz o que é específico; as regras comuns ficam em [_regras-comuns.md](_regras-comuns.md) (lidas pelo agente, não repetidas no prompt: economiza contexto).
- O pré-voo de 1 minuto está em [preflight.md](preflight.md).

## Rodar um teste

1. Abra **uma aba** logada no ambiente de teste e rode o [pré-voo](preflight.md). Se falhar, pare.
2. Dispare **um agente por vez** (a sessão do ambiente cai com várias abas e em atualizações). Prompt completo:

   ```text
   Leia docs/testes/_regras-comuns.md e docs/testes/<brief>.md e execute o brief na aba seed.
   ```

3. O agente grava o relatório a cada etapa (o caminho vem no brief). Se cair por limite de uso ou sessão, retome com `SendMessage` no mesmo agente: o trabalho já está salvo.
4. Valide a entrega contra o critério de aceite do brief: status `done | partial | blocked`, evidência (nº dos registros, prints) e itens em aberto.
5. **Registrar:** troque `s: 'd'|'n'` por `'v'` nas etapas comprovadas (`scripts/dados-*.mjs`), acrescente defeitos e cenários (`scripts/dados-cenarios-checklists.mjs`), rode `npm run checklists` (gera, valida e confere cópias) e faça o commit.

## Briefs

| Prioridade | Brief | Por que | Destrava |
|---|---|---|---|
| 1 | [fluxo-financeiro.md](fluxo-financeiro.md) | "Gerar Títulos" do pedido está bloqueado (meio de pagamento tratado como boleto) | Checklist 13 e fluxo do consultor etapa 7 |
| 2 | [fluxo-comercial-handoff.md](fluxo-comercial-handoff.md) | Oportunidade ganha não gera pedido | Fluxo comercial etapa 6 |
| 3 | [fluxo-estoque.md](fluxo-estoque.md) | Transferência, inventário e empréstimo nunca foram abertos | Checklist 07 |
| 4 | [fluxo-producao-estrutura.md](fluxo-producao-estrutura.md) | OP com estrutura (requisições e baixas) e defeito do apontamento | Checklist 08 |
| 5 | [fluxo-projetos-obra.md](fluxo-projetos-obra.md) | Módulo Projetos inteiro sem validação | Checklist 10 |
| 6 | [fluxo-expedicao-ocorrencias.md](fluxo-expedicao-ocorrencias.md) | Ocorrência, devolução e app do motorista | Checklist 11 |
| 7 | [exploracao-trilha.md](exploracao-trilha.md) | Leitura das telas que ainda estão como "documentação" | Checklists 02, 05, 06, 10, 13, 14 |

## Limites de uso

O plano da sessão já bloqueou agentes duas vezes (limite de uso, não erro do sistema). Rode no máximo 2 agentes seguidos, prefira briefs pequenos e deixe os relatórios em arquivo para retomar sem repetir contexto.
