# Roteiro de telas cruas — módulo `vendas` — v02

- Autor: Producer. Revisão: Director (nomes no glossário, fontes, borrões). Status: v02 com os ajustes de fonte pedidos na validação `07-relatorios-validacao/brutos-crm-vendas_geral_validacao-roteiro-telas_v01.md`.
- Destino no repo (montagem pelo Lead): `midia/brutos/vendas/roteiro-telas.md`. Id do módulo conforme `lib/conteudo/base/indice.json`: `vendas`.
- Ambiente: staging do Faktory Flow v1.23.2, empresa de teste METALURGICA TEST, dados fictícios, gravado em 04/11/2026 23:33:10–23:39:30 (UTC-3). Login feito pelo Pedro.
- Captura: `vendas_bruto_v01.mp4`, 380,27 s, 1920×1200, 30 fps, H.264, sem áudio. **Recorte recomendado `crop=1920:1080:0:80`**. A barra de status do Chrome (URL do staging, canto inferior esquerdo) fica dentro do recorte. Tempos do arquivo bruto, ±3 s, conferidos com o mapa do Editor.
- Registro fictício criado: pedido PV-000013 para Marcenaria Exemplo Ltda, R$ 1.000,00. Detalhes e áreas A–I: `manifesto.md`.
- Fontes das telas: Harness `conhecimento/glossario/telas.yaml` (`vendas.pedidos-de-venda`, `vendas.novo-pedido`), fonte `funcional-vendas-pedidos-de-venda`.

| Início–fim (s) | Tela (glossário) | O que acontece | Campos / regras que aparecem (fonte) | Usar? | Áreas sensíveis |
|---|---|---|---|---|---|
| 0–22 | CRM › Vendas › Pipeline | Sobra da gravação anterior, com oportunidades e valores de terceiros | — | **descartar** | I |
| 22–38 | Seletor de módulos → Vendas | Troca de módulo (seletor em 25–35 s) | — | só com borrão (Editor evita até 38 s) | A, B |
| 38–52 | Vendas › Pedidos de Venda | Lista com filtro "Em Aberto", só PV-000012 (40,5; 44; 53,8 s); clique em **+ Novo Pedido** (~52 s) | botões + Novo Pedido, Filtros; campo Status (`vendas.pedidos-de-venda`) | sim | A, B; status bar ~45 s |
| 53–70 | Novo Pedido | Empresa vazia ("Selecione a empresa"); CFOP cinza com "Selecione a empresa e o cliente primeiro" (58,5–62,5 s) | CFOP depende de Empresa e Cliente (`vendas.novo-pedido`, mensagem do glossário) | sim só 58,5–62,5; resto descartar | A, B, C, D |
| 70–150 | Novo Pedido | Dropdowns de Empresa, Cliente e Projeto abertos com nomes e CPFs; Projeto aberto por engano | — | **descartar** | C, D, E, F, G |
| 150–185 | Novo Pedido (cabeçalho) | Cabeçalho preenchido: Empresa METALURGICA TEST, Cliente Marcenaria Exemplo Ltda, Vendedor, Condição de Pagamento; avisos amarelos "Cliente sem IE…" e "Cliente sem UF configurada" | campos Empresa, Cliente, Vendedor, Condição de Pagamento (`vendas.novo-pedido`) | sim | A, B, F (1340,316,525,56), G (318,316,505,56) |
| ~185 | Novo Pedido › CFOP | CFOP 5101-0 e aviso "Nenhum CFOP deste pedido gera financeiro — sem parcelas e sem título a receber" | **Observado na tela, divergente da regra:** o Harness trata o 5101 como CFOP que gera financeiro, mas aqui o 5101-0 não gerou parcelas (pergunta ao Pedro) | sim | A, B, F, G |
| ~195–200 | Novo Pedido › CFOP | Troca para 5102; as parcelas aparecem | observado na tela: com 5102 as parcelas aparecem | sim | A, B, F, G |
| 200–237 | Novo Pedido › Itens | Produto AMORTECEDOR; painel Dados do Item (Peso, Cor NAT, Descrição Complementar desativada) em 205–230 s; botão Aplicar | botão Aplicar (`vendas.novo-pedido`) | sim | A, B, F, G |
| ~237–250 | Novo Pedido › Itens | Item entra com valor 0,00 e é corrigido na linha para 100,00 (qtd 10, R$ 1.000,00) | — | usar só o resultado (~250 s) | A, B, F, G |
| ~250–255 | Novo Pedido › Itens | Caixa e selo "Impostos não calculados", que não bloqueiam o salvar | mensagem "Impostos não calculados no item" (`faturamento.nova-nfe`; aqui observada no pedido) | sim | A, B, F |
| 255–308 | Novo Pedido › Parcelas | 2 × R$ 500,00; Meio Pagamento, Portador Caixa Geral, Conta Bancária ("Nenhuma conta emissora configurada"); toasts "aplicado nas demais parcelas" (~290 s); Conta de Fluxo de Caixa 1.1.1 (~305 s), que é obrigatória | campos Meio Pagamento, Portador, Conta de Fluxo de Caixa (`vendas.novo-pedido`) | sim | A, B |
| 308–313 | Novo Pedido › Resumo | Resumo e **Salvar e Permanecer** (310,8 s) | botão Salvar e Permanecer (`vendas.novo-pedido`) | sim | A, B |
| 313–337 | Editar Pedido de Venda → Lista | Toast "Pedido PV-000013 criado…" com toast laranja de aviso fiscal (CPF/CNPJ do participante) no canto superior direito; lista com PV-000013 "Em aberto" / "Sem títulos" (~325–332 s) | mensagem "Pedido PV-xxxxxx criado" (`vendas.novo-pedido`); coluna TÍTULOS: o pedido fica "Sem títulos" até gerar os títulos (`funcional-vendas-pedidos-de-venda`) | sim, cobrindo o toast laranja | A, B, toast laranja; status bar ~327 s |
| 333–340 | Vendas › Pedidos de Venda | Lápis **Editar pedido** no PV-000013 (~335 s) | botão Editar pedido (`vendas.pedidos-de-venda`) | sim | A, B |
| 340–370 | Vendas › Pedidos de Venda, filtro "Todos" | Lista completa; olho **Visualizar pedido** num pedido faturado (~360 s) | botão Visualizar pedido (`vendas.pedidos-de-venda`) | só com borrão | A, B, H (300,716,1135,364) |
| 370–380 | Novo Pedido vazio | Volta a um Novo Pedido em branco | — | **descartar** | A, B |

## Prints (pasta `prints/` no repo)

| Arquivo | Offset | Tela | Áreas |
|---|---|---|---|
| prints/vendas_c03_01.png | 45 s | Lista "Em Aberto" (só PV-000012) | A, B |
| prints/vendas_c03_02.png | 60 s | Novo Pedido vazio, CFOP bloqueado | A, B |
| prints/vendas_c04_01.png | 185 s | CFOP 5101-0 + aviso de financeiro | A, B, F, G |
| prints/vendas_c04_02.png | 195 s | CFOP 5102 | A, B, F, G |
| prints/vendas_c05_01.png | 210 s | Dados do Item | A, B |
| prints/vendas_c05_02.png | 255 s | Item R$ 1.000,00 + "Impostos não calculados" | A, B |
| prints/vendas_c06_01.png | 290 s | Parcelas + toast "aplicado nas demais parcelas" | A, B |
| prints/vendas_c06_02.png | 312 s | Conta de Fluxo de Caixa 1.1.1 | A, B |
| prints/vendas_c07_01.png | 318 s | Toast PV-000013 + toast laranja fiscal | A, B, toast laranja |
| prints/vendas_c07_02.png | 327 s | Lista PV-000013 Em aberto / Sem títulos | A, B (status bar) |
| prints/vendas_c08_01.png | 335 s | Hover em Editar pedido | A, B |
| prints/vendas_c08_02.png | 360 s | Filtro "Todos" + Visualizar pedido | A, B, H |

## Observações para quem for editar
- Faixa fixa de status/URL (0,1040,660,40) e o cabeçalho (A, B) aparecem o tempo todo.
- Trechos a evitar: 0–38 s, 70–150 s (dropdowns), 237–250 s (valor errado) e 370–380 s. O toast laranja (313–337 s) precisa ser coberto.
- Divergência registrada: CFOP 5101-0 sem financeiro na tela, contra a regra do Harness. Não usar como regra até o Pedro responder.
- Versão na tela v1.23.2; o glossário de Vendas tem confiança B (validado em v1.22.12).
