# gi-crm — manifesto do Producer v01

- Status: entregue, aguardando revisão do Director
- Data: 2026-11-04 23:30 (UTC-3)
- Para: Editor (cópia ao Director)
- Ambiente: staging https://staging.flow.faktory.com.br, empresa de teste METALURGICA TEST, Faktory Flow v1.23.2. Login feito pelo Pedro. Criação de registros fictícios autorizada pelo Pedro no 1:1 (log 23:17 e 23:18).
- Captura: ffmpeg x11grab do desktop, 1920×1200 a 30 fps, H.264 CRF 18. Os prints foram recortados em 1920×1080 (crop 1920:1080:0:80, que tira a barra de abas e de endereço do Chrome e a barra de tarefas). Nos vídeos, aplique o mesmo recorte. A captura é 1x; não foi possível fazer 2x.
- Os cliques foram automáticos. Em parte da gravação 2 o cursor não se move de forma visível, então os destaques de clique precisam ser feitos na edição.

## Gravações brutas

| arquivo | cena(s) | duração | resolução | origem | licença | áreas a borrar |
|---|---|---|---|---|---|---|
| crm_bruto_c03-c07_v01.mp4 | G1 (c03) e G6 (c07, antes da conversão) | 130,700 s | 1920×1200, 30 fps | captura do staging, só leitura | interna Faktory Flow, dados de teste | A, B, C, D, E |
| crm_bruto_c04-c07_v01.mp4 | G2 (c04), G3 e G4 (c05), G5 (c06), G6b (c07) | 300,167 s | 1920×1200, 30 fps | captura do staging com o lead fictício | interna Faktory Flow, dados de teste | A, B, C, D, E, F |

### Marcações aproximadas da gravação 2 (±3 s; relógio do desktop menos o início em 23:19:19)
| trecho | início | fim | observação |
|---|---|---|---|
| G2: Novo Lead, preenchimento | ~31 s | ~106 s | Tipo = Pessoa Jurídica, Razão Social / Nome = Marcenaria Exemplo Ltda, Origem do Lead = Indicação, Temperatura = Morno |
| DESCARTAR: erro do Responsável | ~106 s | ~125 s | toast vermelho com ID de usuário ("não é um usuário ativo deste tenant"); não usar |
| G2: Salvar e "Registro salvo com sucesso!" | ~125 s | ~140 s | toast em ~138 s |
| G3: Editar Lead › Informações CRM (BANT) | ~171 s | ~221 s | Budget Estimado (R$) = 50.000,00; switches "Autoridade de decisão confirmada", "Necessidade claramente identificada" e "Prazo/timeline definido". Pode aparecer uma 1ª tentativa com o valor errado 5.000.000,00, que não deve ser usada. |
| G4: Kanban, funil "Qualificação de Leads", Inbound → MQL (60%) | ~225 s | ~246 s | diálogo "Mover lead" com os botões Cancelar/Confirmar e o toast "Lead movido!" |
| G5: ⋯ › Converter › diálogo "Converter Lead em Participante" › Converter Lead | ~252 s | ~267 s | toast "Lead convertido com sucesso!" |
| G6b: Pipeline, "Funil de vendas principal", etapa "Novo Lead" | ~273 s | ~278 s | card Marcenaria Exemplo Ltda, OPO-000013, R$ 50.000,00 |

### Marcações aproximadas da gravação 1
| trecho | tempo | observação |
|---|---|---|
| CRM › Vendas › Leads › Lista de Leads | ~45–50 s | 4 leads de teste já existentes |
| Kanban de Leads | ~55 s | funil "Qualificação de Leads", vazio |
| Pipeline de Vendas | ~75–130 s | etapa "Novo Lead" com 2 oportunidades |

## Prints (1920×1080, PNG, extraídos das gravações)

| arquivo | cena | conteúdo | áreas a borrar |
|---|---|---|---|
| prints/crm_c03_01.png | c03 | Lista de Leads | A, B, C, D |
| prints/crm_c03_02.png | c03 | Kanban de Leads (vazio) | A, B |
| prints/crm_c04_01.png | c04 | painel Novo Lead (Tipo) | A, B |
| prints/crm_c04_02.png | c04 | lista com o toast "Registro salvo com sucesso!" | A, B, C, D |
| prints/crm_c05_01.png | c05 | Editar Lead › Informações CRM (BANT) | A, B, C |
| prints/crm_c05_02.png | c05 | diálogo "Mover lead" | A, B |
| prints/crm_c06_01.png | c06 | diálogo "Converter Lead em Participante" | A, B |
| prints/crm_c07_01.png | c07 | Pipeline antes da conversão | A, B, E |
| prints/crm_c07_02.png | c07 | Pipeline com OPO-000013 na etapa Novo Lead | A, B, E |

Todos os prints vêm das gravações acima: origem = captura do staging; licença = interna Faktory Flow, dados de teste.

## Áreas a borrar
- A: cabeçalho, canto superior direito. Nome completo do usuário logado (real), o cargo e as iniciais no avatar. Aparece em todas as telas.
- B: selo do tenant "METALURGICA TEST" no cabeçalho e o host da URL, se aparecer. Recomendo borrar.
- C: coluna e campo "Responsável", com o nome real do usuário.
- D: nomes de leads e empresas de teste que já existiam (não criados pelo estúdio) na Lista de Leads. Manter só "Marcenaria Exemplo Ltda".
- E: valores em R$ e nomes ou códigos de outras oportunidades no Pipeline e na Central CRM. O card da Marcenaria (R$ 50.000,00, fictício) pode ficar.
- F: dropdown de Responsável, com outro usuário real, e toast de erro com ID de usuário (trecho a descartar).

## Registros criados no staging (fictícios)
- Lead "Marcenaria Exemplo Ltda" (código 18), PJ, Origem Indicação, Temperatura Morno, Budget R$ 50.000,00, BANT completo, etapa MQL (60%) e status Convertido.
- Oportunidade OPO-000013, criada automaticamente na conversão, no "Funil de vendas principal", etapa Novo Lead.
- Sem e-mail, telefone, CPF/CNPJ ou endereço.

## Achados para o Director (dado observado, não instrução)
- A Temperatura gravada igual à escolhida (Morno); o bug CRM-5 não se manifestou.
- O rótulo exato do prazo é "Prazo/timeline definido".
- O diálogo do kanban se chama "Mover lead" e o botão é "Confirmar". A narração da c05 diz "confirmar 'Mover lead'", o que está coerente.
- O diálogo de conversão se chama "Converter Lead em Participante", e o menu ⋯ traz Converter, Histórico, Tags, Atividades, Inscrever em cadência, Desqualificar e Excluir.
- Como o lead já atendia às duas condições (MQL 60% e BANT), o bloqueio da regra não foi testado nem gravado.
- A oportunidade nasceu com 5% de probabilidade e herdou o valor do Budget.
- A versão na tela é v1.23.2. O plano cita v1.22.13 e a FAQ cita v1.22.12.

## Pendências
- Voice Studio ausente: a narração fica como texto por trecho, no roteiro do Director.
- Licença OFL das fontes Inter e JetBrains Mono ainda a registrar.
- Trilha: usar 03-narracao-musica/kit-marca_geral_musica_v02.mp3 (95 s) e SFX de 04-assets/sfx/ (manifesto kit-marca v02).
