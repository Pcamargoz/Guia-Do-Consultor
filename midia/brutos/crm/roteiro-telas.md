# Roteiro de telas cruas — módulo `crm` — v02

- Autor: Producer. Revisão: Director (nomes no glossário, fontes, borrões). Status: v02 com os ajustes de fonte pedidos na validação `07-relatorios-validacao/brutos-crm-vendas_geral_validacao-roteiro-telas_v01.md`.
- Destino no repo (montagem pelo Lead): `midia/brutos/crm/roteiro-telas.md`. Id do módulo conforme `lib/conteudo/base/indice.json`: `crm`.
- Ambiente: staging do Faktory Flow v1.23.2, empresa de teste METALURGICA TEST, dados fictícios, gravado em 04/11/2026 (~23:17–23:30 UTC-3). Login feito pelo Pedro.
- Captura: 1920×1200, 30 fps, H.264, sem áudio. **Recorte recomendado `crop=1920:1080:0:80`** (tira abas, barra de endereço e barra de tarefas). Tempos abaixo são do arquivo bruto, ±3 s, conferidos com o mapa do Editor (`05-projetos-edicao/mapa-brutos_crm-vendas_v01.md`).
- Registros fictícios criados: lead "Marcenaria Exemplo Ltda" (código 18) e oportunidade OPO-000013. Detalhes e áreas A–F: `manifesto.md`.
- Fontes das telas: Harness `conhecimento/glossario/telas.yaml` (`crm.leads`, `crm.pipeline`, `crm.funis-vendas`).

## Vídeo 1 — `crm_bruto_c03-c07_v01.mp4` (130,7 s)

| Início–fim (s) | Tela (glossário) | O que acontece | Campos / regras que aparecem (fonte) | Usar? | Áreas sensíveis |
|---|---|---|---|---|---|
| 0–44 | Navegação inicial | Preparação antes de entrar no CRM | — | descartar | A, B |
| 44–54 | CRM (menu lateral e botão do topo) | Acesso ao CRM | Caminho `CRM › Vendas › Leads` (`crm.leads`) | sim | A, B; caixas 360,560,560,290 e 1460,540,290,310 |
| ~45–50 | CRM › Vendas › Leads › Lista de Leads | Lista com 4 leads de teste já existentes | Botão Novo Lead; colunas com Responsável (`crm.leads`) | sim, com borrão | A, B, C, D |
| ~55 | CRM › Vendas › Leads › Kanban de Leads | Funil "Qualificação de Leads" vazio | Funil do tipo Leads (`crm.funis-vendas`) | sim | A, B |
| ~75–130 | CRM › Vendas › Pipeline | Etapa "Novo Lead" com 2 oportunidades de terceiros (antes da conversão) | Pipeline por etapas (`crm.pipeline`; `funcional-crm-leads-pipeline-e-oportunidades`) | só com borrão | A, B, E |

## Vídeo 2 — `crm_bruto_c04-c07_v01.mp4` (300,2 s)

| Início–fim (s) | Tela (glossário) | O que acontece | Campos / regras que aparecem (fonte) | Usar? | Áreas sensíveis |
|---|---|---|---|---|---|
| 0–31 | Lista de Leads | Espera antes do clique | — | descartar | A, B, C, D |
| 31–37 | Lista de Leads | Clique em **Novo Lead** | botão Novo Lead (`crm.leads`) | sim | A, B |
| 37–106 | Novo Lead (painel) | Preenche Tipo = Pessoa Jurídica, Razão Social/Nome = Marcenaria Exemplo Ltda, Origem do Lead = Indicação, Temperatura = Morno | campos Origem do Lead, Temperatura, Responsável (`crm.leads`) | sim | A, B, C; caixas 1435,530,450,56 e 360,570,600,280 (78–84 s) |
| 106–125 | Novo Lead | Toast vermelho de erro do Responsável, com ID de usuário | — | **descartar** | F |
| 125–141 | Novo Lead → Lista | Salvar e toast "Registro salvo com sucesso!" (~138 s) | botão Salvar (`crm.leads`) | sim | A, B, C, D; caixas 360,622,560,225 e 1460,560,290,290 |
| 141–171 | Lista de Leads | Transição até a edição | — | descartar | A, B, C, D |
| 171–221 | Editar Lead › Informações CRM | Budget Estimado = R$ 50.000,00 e switches "Autoridade de decisão confirmada", "Necessidade claramente identificada", "Prazo/timeline definido" | BANT (`crm.leads`; `funcional-crm-leads-pipeline-e-oportunidades`). Pode haver 1ª tentativa com 5.000.000,00: **não usar** essa parte | sim | A, B, C |
| 211,7–216,7 | Kanban de Leads | Abertura do Kanban e do "Mover lead" | — | sim | 1435,530,450,56 |
| 225–246 | Kanban de Leads, funil "Qualificação de Leads" | Move de Inbound para **MQL (60%)**; diálogo "Mover lead" com Cancelar/Confirmar; toast "Lead movido!"; BANT visível em 240–246 s | condição para converter: etapa com probabilidade ≥ 60 % (`regra-crm-converter-lead-exige-etapa-60-e-bant-completo`) | sim | A, B |
| 251,5–267 | Lead › menu ⋯ › Converter | Menu ⋯ (Converter, Histórico, Tags, Atividades, Inscrever em cadência, Desqualificar, Excluir); diálogo "Converter Lead em Participante"; "Converter Lead"; toast "Lead convertido com sucesso!" | conversão exige BANT completo + etapa ≥ 60 % (`regra-crm-converter-lead-exige-etapa-60-e-bant-completo`). O bloqueio **não** foi gravado | sim | 360,615,600,250; painel lateral de 1460,560 em diante; 360,570,560,280; 1460,540,290,310 |
| 273–281 | CRM › Vendas › Pipeline, "Funil de vendas principal" | Card Marcenaria Exemplo Ltda, OPO-000013, R$ 50.000,00, na etapa Novo Lead | a conversão cria a oportunidade sozinha, na etapa "Novo Lead", com o valor do Budget (`regra-crm-conversao-cria-a-oportunidade-sozinha`). **PENDÊNCIA:** os 5 % de probabilidade foram observados na tela e não têm fonte no Harness (pergunta ao Pedro) | sim | 300,262,1580,366 e 430,162,165,36 (outros cards) |
| 281–300 | Pipeline | Final da gravação | — | descartar | A, B, E |

## Prints (pasta `prints/` no repo)

| Arquivo | Tela | Uso |
|---|---|---|
| prints/crm_c03_01.png | Lista de Leads | A, B, C, D |
| prints/crm_c03_02.png | Kanban de Leads vazio | A, B |
| prints/crm_c04_01.png | Novo Lead (Tipo) | A, B |
| prints/crm_c04_02.png | Lista com "Registro salvo com sucesso!" | A, B, C, D |
| prints/crm_c05_01.png | Editar Lead › Informações CRM (BANT) | A, B, C |
| prints/crm_c05_02.png | Diálogo "Mover lead" | A, B |
| prints/crm_c06_01.png | Diálogo "Converter Lead em Participante" | A, B |
| prints/crm_c07_01.png | Pipeline antes da conversão | A, B, E |
| prints/crm_c07_02.png | Pipeline com OPO-000013 | A, B, E |

## Observações para quem for editar
- Áreas fixas: A (nome real do usuário no cabeçalho) e B (selo do tenant/URL) aparecem o tempo todo.
- Parte dos cliques foi automática e o cursor nem sempre aparece: destaques de clique precisam ser feitos na edição.
- Versão na tela v1.23.2; o glossário foi validado em v1.22.12 (confiança B em parte das telas).
- Sem áudio: a narração (voz L/VoiceStudio) não foi gravada.
