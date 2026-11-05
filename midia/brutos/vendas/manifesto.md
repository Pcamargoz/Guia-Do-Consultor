# gi-vendas — manifesto do Producer v01

- Status: entregue, aguardando revisão do Director
- Data: 2026-11-04 23:40 (UTC-3)
- Para: Editor (cópia ao Director)
- Ambiente: staging do Faktory Flow v1.23.2, empresa de teste METALURGICA TEST. Login feito pelo Pedro; criação de registros fictícios autorizada pelo Pedro em 04/11 (log do Producer 23:18).
- Captura: ffmpeg x11grab, 1920×1200, 30 fps, H.264. Prints e vídeo: use crop=1920:1080:0:80. Conferido nos quadros: o recorte tira abas, barra de endereço do Chrome e a barra de tarefas (relógio). A **barra de status do Chrome** (URL no canto inferior esquerdo ao passar o mouse em links) fica DENTRO do recorte.
- Offsets: horário − 23:33:10 (início real). Conferidos com quadros a cada 5 s (±3 s).

## Gravação bruta

| arquivo | cena(s) | início–fim | duração (ffprobe) | resolução | origem | licença | áreas a borrar |
|---|---|---|---|---|---|---|---|
| vendas_bruto_v01.mp4 | c03–c08 (G1–G6) | 0–380 s (23:33:10–23:39:30) | 380,27 s | 1920×1200, 30 fps | captura x11grab do staging, dados fictícios, autorização do Pedro 04/11 | interna Faktory Flow, dados de teste | A–I |

### Marcações (offset em s)
| trecho | cena | início | fim | observação |
|---|---|---|---|---|
| EVITAR: CRM › Pipeline (sobra da gravação anterior) | — | 0 | ~22 | oportunidades e valores de terceiros (área I) |
| G1: seletor de módulos → Vendas → Pedidos de Venda "Em Aberto" | c03 | ~22 | ~52 | seletor 25–35 s; lista só com PV-000012 40–50 s; clique em + Novo Pedido ~52 s |
| G2: cabeçalho (Empresa, Cliente, Vendedor, Condição, CFOP) | c04 | ~53 | ~200 | CFOP cinza "Selecione a empresa e o cliente primeiro" ~55–130 s; CFOP 5101-0 + aviso de financeiro ~185 s; 5102 ~195 s |
| EVITAR: cliques confusos (Projeto aberto por engano com busca "Marcenaria", Esc; Vendedor reaberto) | c04 | ~70 | ~100 | também contém dropdowns C/D/E |
| G3: produto AMORTECEDOR, Dados do Item, Aplicar, item | c05 | ~200 | ~255 | Dados do Item 205–230 s; item com 0,00 ~237 s; corrigido para 100,00 (qtd 10, R$ 1.000,00) ~250 s; "Impostos não calculados" ~250–255 s |
| G4: parcelas, meio, portador, conta bancária, fluxo de caixa | c06 | ~255 | ~308 | 2 × R$ 500,00; toasts "aplicado nas demais parcelas" ~290 s; Conta de Fluxo 1.1.1 ~305 s |
| G5: Salvar e Permanecer → toast PV-000013 + aviso fiscal → lista | c07 | ~308 | ~332 | toast ~315 s (tela "Editar Pedido de Venda"); lista Em aberto / Sem títulos ~325–332 s |
| G6: lápis "Editar pedido" no PV-000013; filtro "Todos"; olho no faturado | c08 | ~333 | ~380 | hover lápis ~335 s; "Todos" a partir de ~340 s; olho "Visualizar pedido" no faturado ~360 s; últimos ~10 s voltam a um Novo Pedido vazio (não usar) |

## Prints (1920×1080 PNG, crop 0:80)

| arquivo | cena | offset | conteúdo | áreas a borrar |
|---|---|---|---|---|
| prints/vendas_c03_01.png | c03 | 45 s | lista filtrada Em Aberto (só PV-000012) | A, B |
| prints/vendas_c03_02.png | c03/c04 | 60 s | Novo Pedido vazio, CFOP bloqueado | A, B |
| prints/vendas_c04_01.png | c04 | 185 s | CFOP 5101-0 + aviso "nenhum CFOP gera financeiro", lista de CFOPs | A, B, F, G |
| prints/vendas_c04_02.png | c04 | 195 s | CFOP 5102 escolhido | A, B, F, G |
| prints/vendas_c05_01.png | c05 | 210 s | painel Dados do Item (Peso, Cor NAT, Descrição Complementar desativada) | A, B (fundo desfocado) |
| prints/vendas_c05_02.png | c05 | 255 s | item R$ 1.000,00 + "Impostos não calculados" | A, B |
| prints/vendas_c06_01.png | c06 | 290 s | parcelas, Portador Caixa Geral, toast "aplicado nas demais parcelas" | A, B |
| prints/vendas_c06_02.png | c06 | 312 s | Conta de Fluxo de Caixa 1.1.1, parcelas conferem | A, B |
| prints/vendas_c07_01.png | c07 | 318 s | toast "Pedido PV-000013 criado" + toast laranja fiscal | A, B |
| prints/vendas_c07_02.png | c07 | 327 s | lista PV-000013 Em aberto / Sem títulos | A, B (status bar com URL embaixo) |
| prints/vendas_c08_01.png | c08 | 335 s | hover lápis "Editar pedido" no PV-000013 | A, B |
| prints/vendas_c08_02.png | c08 | 360 s | filtro "Todos", olho "Visualizar pedido" no faturado | A, B, H |

Origem de todos: a gravação acima; licença interna Faktory Flow, dados de teste.

## Observações (dado observado)
- Empresa veio vazia ("Selecione a empresa"); escolhida METALURGICA TEST.
- CFOP fica cinza ("Selecione a empresa e o cliente primeiro") até escolher o Cliente Marcenaria Exemplo Ltda; avisos amarelos "Cliente sem IE…" e "Cliente sem UF configurada".
- CFOP 5101-0 mostra "Nenhum CFOP deste pedido gera financeiro — sem parcelas e sem título a receber"; com 5102 as parcelas aparecem.
- Item entrou com valor 0,00 e foi corrigido na linha para 100,00 (qtd 10, R$ 1.000,00).
- "Impostos não calculados" apareceu (caixa e selo) e não bloqueou o salvar.
- Conta Bancária: "Nenhuma conta emissora configurada".
- Ao salvar: toast "Pedido PV-000013 criado…" e toast laranja de aviso fiscal (CPF/CNPJ do participante). Pedido criado: PV-000013, URL /vendas/pedidos/novo?id=1700.

## Áreas a borrar (posições no quadro 1920×1080 já recortado)
- A: cabeçalho, canto superior direito (~x 1640–1920, y 0–60): nome completo real do usuário, cargo e avatar. Vídeo todo.
- B: selo do tenant "METALURGICA TEST" no cabeçalho (~x 1480–1650, y 25–60), vídeo todo; e barra de status do Chrome (canto inferior esquerdo, ~x 0–600, y 1040–1080) com a URL do staging quando aparece (ex.: ~45 s, ~327 s). A barra de endereço fica fora do recorte.
- C: dropdown de Empresa (~55–65 s): nome real + CPF e outra empresa com CNPJ.
- D: dropdown de Cliente (~65–80 s): nomes e CPFs de pessoas.
- E: dropdown de Projeto (~70–80 s) com nomes.
- F: campo Vendedor com nome e CPF (ex.: "Pedro - 587…") a partir de ~95 s até o fim do cabeçalho visível (~250 s) (~x 1440–1920, y ~355–380).
- G: CNPJ da METALURGICA TEST no campo Empresa (~x 340–830, y ~355–380), ~60–250 s.
- H: lista "Todos" (~340–375 s): nomes de clientes, projetos e valores de outros pedidos. Manter só PV-000013/Marcenaria.
- I (novo): Pipeline do CRM nos primeiros ~22 s, com oportunidades e valores de terceiros — cortar.
- Recomendação: CORTAR os trechos de dropdown (C, D, E; ~55–100 s) e o início 0–22 s em vez de só borrar.

## Pendências
- Os brutos originais contêm A–I sem borrão. Subir brutos (borrados ou não) ao repositório público Guia-Do-Consultor está em aberto com o Director/Pedro; o Producer não faz commit/push.
- Narração voz L ausente (Voice Studio indisponível).
- Cursor e destaques de clique a reforçar na edição.
