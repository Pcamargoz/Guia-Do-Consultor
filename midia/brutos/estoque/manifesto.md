# estoque — manifesto do Producer v02 (montado no repo)

- Status: v02 pronta; aguarda revalidação do Director (veredito v01: APROVADO COM AJUSTES)
- Data: 2026-11-05 08:40 (UTC-3)
- Ambiente: staging do Faktory Flow, empresa de teste METALURGICA TEST. Login feito pelo Pedro. Tour só leitura, sem registros criados.
- Captura: ffmpeg x11grab, 1920×1200, 30 fps, H.264. Use `crop=1920:1080:0:80` (barra de status do Chrome fica no recorte).
- Offsets c02: horário − 08:30:58 (início). c01: amostra esparsa — mapa fino pendente.
- Changelog v01→v02: remux gi-estoque_c02_bruto_v01.mkv (estúdio) → `estoque_bruto_c02_v01.mp4` (stream copy, 227,80 s; verificador do Guia exige arquivo mp4); roteiro cita regras Harness não demonstradas.

## Gravações brutas

| arquivo | cena | início–fim | duração (ffprobe) | resolução | origem | licença | áreas a borrar |
|---|---|---|---|---|---|---|---|
| estoque_bruto_c01_v01.mp4 | c01 — tour operacional (Visão geral → Reservas órfãs; cadastro interrompido) | ~00:32–01:07 (UTC-3); arquivo 0–2116,7 s | **2116,70 s** | 1920×1200, 30 fps, H.264 | remux recuperado do x11grab staging; dados fictícios; autorização do Pedro | interna Faktory Flow, dados de teste | A–C (listas quando houver); fim = login (descartar) |
| estoque_bruto_c02_v01.mp4 | c02 — cadastros, relatório 506, configs, TD 144/145 | ~08:30:58–08:34:46 (UTC-3); arquivo 0–227,8 s | **227,80 s** | 1920×1200, 30 fps, H.264, sem áudio | remux stream-copy do mkv (x11grab staging); dados fictícios; autorização do Pedro | interna Faktory Flow, dados de teste | A–F |

Tabela de trechos e prints: `roteiro-telas.md`. **14 prints** PNG 1920×1080 (só c02). Destino no repo: `midia/brutos/estoque/`. Entrega canônica do c02 = mp4; o mkv intermediário fica só no estúdio (não sobe no repo).

## Regras Harness citadas (não demonstradas neste tour)

| id | tela no roteiro | demonstrada? |
|---|---|---|
| `regra-estoque-saldo-nasce-de-movimentos` | Estoque › Saldo | não (lista vazia; só leitura) |
| `regra-estoque-transferencia-pendente-reserva-o-disponivel` | Estoque › Transferências | não |
| `regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa` | Estoque › Inventários | não |
| `regra-estoque-emprestimo-devolucao-parcial-e-total` | Estoque › Empréstimos | não |

## Áreas a borrar (quadro 1920×1080 recortado)
- **A:** nome real do usuário, cargo e avatar no cabeçalho (~x 1640–1920, y 0–60). Vídeo todo.
- **B:** selo do tenant METALURGICA TEST (~x 1480–1650, y 25–60) e barra de status do Chrome com a URL do staging (~x 0–600, y 1040–1080). Vídeo todo.
- **C:** PII em listas — Participantes (razão social, CPF/CNPJ); Projetos (nome/cliente); Locais (nome de obra/pessoa). Posição da grade varia; conferir no print. CRM Leads no início do c02 (descartar) também tem C.
- **D:** não aplicável neste módulo (sem contas bancárias).
- **E:** Meu Portal — se houver e-mails/contatos nas abas não visitadas; Identidade (visitada) é sobretudo tema/cores (baixo risco). Usuários do Portal **não aberto**.
- **F:** Chaves de API — prefixos truncados `ffk_…` (teste-CRM, Teste Pedro); marcar por precaução.
- **G:** não aplicável (sem Plugboleto/CNPJ empresa nesta captura).
- Recomendação de corte: c01 0–~80 s (Financeiro) e ~1750–fim (sessão/login); c02 0–~45 s (CRM Leads) + slips Documentação da API / loadings.

## Pendências
- Brutos sem borrão no arquivo (padrão Pedro/repo: brutos cruas; borrão na edição). Producer não faz commit/push.
- **PENDÊNCIA:** timeline c01 aproximada — falta passagem frame a frame antes da edição.
- **PENDÊNCIA:** Meu Portal › Usuários do Portal não aberto.
- **PENDÊNCIA:** Relatório 506 e cubos 144/145 não executados (só tela de configuração/filtro).
- Glossário: telas do menu Estoque em maioria fora de `telas.yaml` (só `estoque.novo-movimento` + cadastros participantes/produtos).
- Desktop do usuário ficou offline em trecho do c02; sessão no staging do Producer permaneceu.
