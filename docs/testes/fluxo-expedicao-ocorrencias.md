# Brief: expedição — ocorrência, devolução e re-expedição

**Relatório:** `46-fluxo-expedicao-ocorrencias.md` · **Regras:** [_regras-comuns.md](_regras-comuns.md)

## Objetivo

O caminho feliz da expedição foi validado (carga 20261000001 entregue). Falta o que dá errado e o que acontece depois: ocorrência na rota, devolução, re-expedição, rastreamento ao cliente e documentos.

## Critério de aceite

1. Uma **carga nova** com um pedido faturado de teste que passe por **Ocorrência** (tipo de ocorrência da frota) no apontamento do motorista, com o estado da carga e do pedido depois.
2. **Devolução** e **Aguardando Re-Expedição**: o pedido volta para a fila e pode entrar numa nova carga; o reflexo no estoque (`Pendências de Estoque (Devolução)`) é conferido.
3. **Link de rastreamento** gerado para o cliente de teste (e-mail @tuamaeaquelaursa.com), revogado em seguida; o que o link mostra descrito (sem abrir outra aba: apenas o que o sistema informa).
4. **Romaneio, Romaneio de itens e Etiquetas** abertos (prévia) com os dados da carga; o que sai para impressão descrito.
5. **App do motorista** (`/motorista`) e **Roteirização** abertos só para leitura; o que exigir mapa externo fica registrado.
6. Cadastros da frota (veículos, motoristas, tipos de ocorrência) lidos; a CNH vencida do único motorista registrada como pré-requisito.

## Roteiro

1. Ler a etapa 5 de `07-teste-fluxo-consultor.md` e as telas já mapeadas em `22-dev-producao-a-financeiro.md`.
2. Preparar um segundo pedido faturado de teste (use o fluxo de `scripts/dados-checklist-consultor.mjs`; a nota é finalizada, nunca transmitida).
3. Executar os critérios 1 a 4 na ordem; depois 5 e 6 só com leitura.

## Entrega

Relatório conforme as regras comuns.
