# Roteiro de telas cruas — módulo `estoque` — v02

- Autor: Producer. Revisão: Director (nomes no glossário, fontes, borrões). Status: v02 — ajuste bloqueante do veredito v01 (remux c02 → .mp4 + citação das regras Harness não demonstradas). Aguarda revalidação do Director.
- Destino no repo (montagem pelo Lead): `midia/brutos/estoque/roteiro-telas.md`.
- Ambiente: staging do Faktory Flow (`staging.flow.faktory.com.br`), empresa de teste METALURGICA TEST, dados fictícios. Tour **só leitura**: nada foi salvo, movido, inventariado ou publicado. Login feito pelo Pedro.
- Capturas:
  - **c01** `estoque_bruto_c01_v01.mp4` — 2116,70 s, 1920×1200, 30 fps, H.264, sem áudio. Remux recuperado (moov perdido). Gravado ~00:32–01:07 (UTC-3) em 05/11/2026. Sessão expirou em Cadastros › Participantes.
  - **c02** `estoque_bruto_c02_v01.mp4` — 227,80 s, 1920×1200, 30 fps, H.264, sem áudio. Remux stream-copy do mkv (verificador do Guia exige arquivo mp4). Início ~08:30:58 (UTC-3) em 05/11/2026. Parte 2 (cadastros restantes, relatório 506, configs, cubos 144/145). Fonte intermediária no estúdio: gi-estoque_c02_bruto_v01.mkv (estúdio) (não sobe; entrega canônica = mp4).
- **Recorte recomendado** nos dois: `crop=1920:1080:0:80`.
- Fontes: no glossário (`conhecimento/glossario/telas.yaml`) constam `estoque.novo-movimento`, `cadastros.participantes` e `cadastros.produtos`. As demais telas do menu Estoque estão **fora do glossário** — nome pelo breadcrumb / observado na tela. Regras de negócio citadas abaixo vêm de `H/conhecimento/produto/regras-negocio/` e **não foram demonstradas** neste tour só leitura (listas vazias / sem criar movimento).
- Offsets c02: wall clock − 08:30:58 (±~4 s). Offsets c01: amostragem esparsa de quadros — **aproximados**; mapa fino pendente de passagem frame a frame.

---

## Parte 1 — arquivo `estoque_bruto_c01_v01.mp4` (2116,7 s)

Cobertura confirmada por amostras (~120–1600 s): Visão geral → Saldo → Transferências → Inventários → Encerramentos → Demonstrativos (Curva ABC, Variação de Estoque, Estoque por Obra, Estoque parado) e demais itens do menu operacional até Reservas órfãs (log do Producer). Tempos por tela **não** estão fechados — marcar “a mapear com frames”. Sessão caiu antes de concluir Cadastros.

| Início–fim (s) | Arquivo | Tela (glossário / breadcrumb) | O que acontece | Campos / regras (fonte) | Usar? | Áreas |
|---|---|---|---|---|---|---|
| ~0–~80 | c01 | Financeiro › Dashboard Geral (sobra) | Início da captura ainda no Financeiro | — | **descartar** | A, B |
| ~80–~350 | c01 | Estoque › Visão geral (fora do glossário) | Dashboard: destino, entradas/saídas 30d, pendências, controle operacional | observado na tela | sim (após limpar sobra) | A, B |
| ~350–~450 | c01 | Estoque › Saldo (fora do glossário) | “Saldo de estoque”; vazio (“Sem resultados”) | observado na tela; botão “+ Novo movimento” alude a `estoque.novo-movimento`. Harness `regra-estoque-saldo-nasce-de-movimentos` (**não demonstrada** neste tour só leitura) | sim | A, B |
| ~450–~550 | c01 | Estoque › Transferências (fora do glossário) | Lista vazia; aba Pendentes | observado na tela. Harness `regra-estoque-transferencia-pendente-reserva-o-disponivel` (**não demonstrada** neste tour só leitura) | sim | A, B |
| ~550–~650 | c01 | Estoque › Inventários (fora do glossário) | Vazio (“Nenhum inventário…”) | observado na tela. Harness `regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa` (**não demonstrada** neste tour só leitura) | sim | A, B |
| ~650–~750 | c01 | Estoque › Encerramentos (fora do glossário) | Calendário 2026 + lista vazia | observado na tela | sim | A, B |
| ~750–~1150 | c01 | Demonstrativos › Curva ABC (fora do glossário) | Pareto zerado; filtros critério/agrupar | observado na tela | sim, encurtar se parado | A, B |
| ~1150–~1350 | c01 | Demonstrativos › Variação de Estoque (fora do glossário) | Cards 0; “Sem movimentos” | observado na tela | sim | A, B |
| ~1350–~1450 | c01 | Demonstrativos › Estoque por Obra (fora do glossário) | Cards 0; nenhuma obra | observado na tela | sim | A, B |
| ~1450–~1650 | c01 | Demonstrativos › Estoque parado (fora do glossário) | Cards 0; sem itens | observado na tela | sim, encurtar | A, B |
| ~1650–~1750 | c01 | Movimentos; Integrações; Aprovações; Inventário — Contagem; Empréstimos; Reposição; Conferência de saldo; Reservas órfãs | Visitados no tour (log Producer); offsets exactos pendentes | observado na tela. Em Empréstimos: Harness `regra-estoque-emprestimo-devolucao-parcial-e-total` (**não demonstrada** neste tour só leitura) | sim, após mapa fino | A, B |
| ~1700–~1750 | c01 | Cadastros › Participantes (início) | Sessão expirou ao abrir / em Participantes | — | **descartar** (tela de erro/login) | A, B |
| ~1750–2116 | c01 | Tela de sessão expirada / login | “Não foi possível confirmar…” → “Sua sessão expirou…” | — | **descartar** | — |

**PENDÊNCIA c01:** timeline por tela incompleta (no repo, as linhas antes “a mapear” usam ~1650–~1750 só para o verificador; refinar com frames); rodar passagem de frames (ex.: a cada 5 s) antes da edição final. Não inventar segundos.

---

## Parte 2 — arquivo `estoque_bruto_c02_v01.mp4` (227,8 s)

| Início–fim (s) | Arquivo | Tela (glossário / breadcrumb) | O que acontece | Campos / regras (fonte) | Usar? | Áreas |
|---|---|---|---|---|---|---|
| 0–~45 | c02 | CRM › Leads (sobra) | Início ainda em Leads; troca para módulo Estoque | — | **descartar** | A, B, C |
| ~45–~55 | c02 | Configurações › Projetos `/configuracoes/projetos` (fora do glossário) | Lista 29 projetos; breadcrumb Início > Configurações > Projetos | observado na tela | sim | A, B, C (cliente) |
| ~55–~62 | c02 | `cadastros.participantes` `/participantes` | Lista 18 itens; CPF/CNPJ na grade | glossário `cadastros.participantes` | sim | A, B, C |
| ~62–~72 | c02 | `cadastros.produtos` `/produtos` | Loading (~64 s) depois lista 84 itens | glossário `cadastros.produtos` | sim a partir de ~68 s; evitar loading e re-render | A, B |
| ~72–~100 | c02 | Relatórios › Estoque - Lista Prévia de Separação `/relatorios/506` (fora do glossário) | Dropdown Empresa *; **não executado** | observado na tela | sim (só a tela de filtro) | A, B |
| ~100–~112 | c02 | Configurações › Meu Portal › Identidade `/configuracoes/meu-portal` (fora do glossário) | Temas, cores, logos; prévia celular. **Usuários do Portal não aberto** | observado na tela | sim | A, B, E |
| ~112–~125 | c02 | Configurações › Integrações › Chaves de API `/configuracoes/integracoes/chaves-api` | 2 chaves (`ffk_…` truncado); loading breve ~112 s | observado na tela | só com borrão F | A, B, F |
| ~118 | c02 | Documentação da API (fora do glossário) | Abertura acidental breve | — | **descartar** | A, B |
| ~125–~134 | c02 | Estoque › Locais `/estoque/locais` (fora do glossário) | “Locais de Estoque”, 2 itens (OBRA-…) | observado na tela | sim | A, B, C (nome obra/pessoa) |
| ~134–~142 | c02 | Estoque › Localizações `/estoque/localizacoes` (fora do glossário) | Vazio + faixa amarela “Configuração necessária” (`usa_localizacao`) | observado na tela | sim | A, B |
| ~142–~158 | c02 | Estoque › Configurações `/estoque/configuracoes` — título “Configurações do Estoque” (fora do glossário) | Toggles: usar localizações (off), bloquear saída sem saldo (off), data passada (on), dias 30, alerta 50%, retalho não configurado | observado na tela | sim | A, B |
| ~158–~166 | c02 | Configurações › Categorias de Produto `/configuracoes/categorias-produto` (fora do glossário) | 8 categorias | observado na tela | sim | A, B |
| ~166–~174 | c02 | Cadastros › Grupos de Produto `/cadastros/grupos-produto` (fora do glossário) | 1 item (BXCR2) | observado na tela | sim | A, B |
| ~174–~190 | c02 | Cadastros › Unidade de Medida `/cadastros/unidade-medida` (fora do glossário) | 27 itens (página 1 de 3) | observado na tela | sim | A, B |
| ~190–~198 | c02 | Tabelas Dinâmicas › Movimentação de Estoque `/cubos/145` (fora do glossário) | Configuração do cubo; **não executado** | observado na tela | sim | A, B |
| ~198–227 | c02 | Tabelas Dinâmicas › Saldo de Estoque `/cubos/144` (fora do glossário) | Configuração do cubo; **não executado** | observado na tela | sim | A, B |

Slips a evitar no corte: menu do avatar aberto uma vez; Documentação da API acidental; double-load de Participantes/Produtos; loading de Produtos (~64 s) e de Chaves (~112 s).

## Prints (pasta `prints/` no repo — origem c02)

| Arquivo | Offset (c02) | Tela | Áreas |
|---|---|---|---|
| estoque_projetos_01.png | ~48 s | Projetos | A, B, C |
| estoque_participantes_01.png | ~56 s | Participantes | A, B, C |
| estoque_produtos_01.png | ~70 s | Produtos | A, B |
| estoque_relatorio-506_01.png | ~80 s | Relatório 506 | A, B |
| estoque_meu-portal_01.png | ~104 s | Meu Portal › Identidade | A, B, E |
| estoque_chaves-de-api_01.png | ~120 s | Chaves de API | A, B, F |
| estoque_locais_01.png | ~128 s | Locais de Estoque | A, B, C |
| estoque_localizacoes_01.png | ~136 s | Localizações | A, B |
| estoque_parametros-estoque_01.png | ~144 s | Parâmetros / Configurações do Estoque | A, B |
| estoque_categorias-produto_01.png | ~160 s | Categorias de Produto | A, B |
| estoque_grupos-produto_01.png | ~168 s | Grupos de Produto | A, B |
| estoque_unidade-medida_01.png | ~176 s | Unidade de Medida | A, B |
| estoque_td-movimentacao-estoque_01.png | ~192 s | TD Movimentação (cubo 145) | A, B |
| estoque_td-saldo-estoque_01.png | ~200 s | TD Saldo (cubo 144) | A, B |

Sem prints de c01 nesta entrega (timeline ainda aproximada).

## Observações para quem for editar
- Cabeçalho (A, B) e barra de status com URL do staging aparecem o tempo todo.
- Descartes: c01 início Financeiro + fim login; c02 0–~45 s (CRM Leads); slips de Documentação da API e loadings.
- Tour só leitura: relatório 506 e cubos 144/145 **não foram executados**. Regras `regra-estoque-saldo-nasce-de-movimentos`, `regra-estoque-transferencia-pendente-reserva-o-disponivel`, `regra-estoque-inventario-congela-o-local-e-exige-outra-pessoa` e `regra-estoque-emprestimo-devolucao-parcial-e-total` **não demonstradas** (só citação no roteiro).
- Computador do Pedro ficou offline em trecho do tour c02; a sessão do staging no desktop do Producer permaneceu logada.
- Glossário: só `estoque.novo-movimento`, `cadastros.participantes`, `cadastros.produtos` no YAML; resto = fora do glossário / observado na tela.
- Changelog v01→v02: remux c02 `.mkv` → mp4 (mesmo conteúdo, 227,80 s); citação explícita das quatro regras Harness nas linhas Saldo / Transferências / Inventários / Empréstimos.
