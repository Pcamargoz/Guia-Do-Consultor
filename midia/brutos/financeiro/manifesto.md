# gi-financeiro — manifesto do Producer v02

- Status: entregue, aguardando revisão do Director
- Data: 2026-11-05 00:31 (UTC-3). v02 com os ajustes da validação do Director; a v01 não sobe.
- Ambiente: staging do Faktory Flow, empresa de teste METALURGICA TEST. Login feito pelo Pedro. Tour só leitura, sem registros criados.
- Captura: ffmpeg x11grab, 1920×1200, 30 fps, H.264. Use crop=1920:1080:0:80 (a barra de status do Chrome fica dentro do recorte).
- Offsets: horário − 00:12:08 (início). Conferidos pelo breadcrumb em quadros a cada 5 s (±3 s).

## Gravação bruta

| arquivo | cena | início–fim | duração (ffprobe) | resolução | origem | licença | áreas a borrar |
|---|---|---|---|---|---|---|---|
| financeiro_bruto_v01.mp4 | geral (tour do menu Financeiro) | 0–912 s (00:12:08–00:27:20) | 912,43 s | 1920×1200, 30 fps | captura x11grab do staging, dados fictícios, autorização do Pedro | interna Faktory Flow, dados de teste | A–G |

A tabela de trechos e a de prints estão em `roteiro-telas.md`. Os 24 prints são PNG 1920×1080 recortados.

## Áreas a borrar (quadro 1920×1080 recortado)
- A: nome real do usuário, cargo e avatar no cabeçalho (~x 1640–1920, y 0–60). Vídeo todo.
- B: selo do tenant METALURGICA TEST (~x 1480–1650, y 25–60) e barra de status do Chrome com a URL do staging (~x 0–600, y 1040–1080). Vídeo todo.
- C (conferido no print contas-a-receber, 80 s): coluna PARTICIPANTE x 356–731, y 484–956 (x,y,w,h = 356,484,375,472). Nomes de terceiros em todas as linhas. Valores na coluna VALOR TOTAL x 1480–1635, y 484–956, se for preciso. O mesmo vale para Contas a Pagar, os relatórios e Tabelas Dinâmicas (posição varia), e para Vendas › Pedidos (0–57 s, descartar).
- D (conferido no print config-contas-bancarias, 632 s): linhas da tabela x 291–1350, y 328–478 (x,y,w,h = 291,328,1059,150), com descrição, banco, agência e conta. Em Extrato e Saldos, os cards de conta (posição varia).
- E: Meu Portal (537–582 s), se houver nomes ou e-mails. Usuários (582–592 s) está vazio: sem área.
- F: Chaves de API (592–612 s), só o prefixo truncado `ffk_…`, marcada por precaução. Webservice Bancos (707–727 s) não mostra credenciais: sem área.
- G: Boleto/Plugboleto (797–832 s), bloco Empresa com CNPJ, Razão Social, E-mail e Endereço.
- Recomendação: cortar 0–57 s, 317–412 s e 887–912 s.

## Pendências
- Os brutos têm A–G sem borrão (o Pedro aceitou que os brutos fiquem sem borrão no repo). O Producer não faz commit/push.
- C e D conferidos em pixels; E, F e G conferidos pelo Director.
- PENDÊNCIA: "Painel Financeiro de Projetos" aparece no menu, mas não foi gravado (gravar no Financeiro ou em Projetos).
- Regras de baixa: não gravadas (só leitura).
