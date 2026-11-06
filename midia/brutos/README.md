# midia/brutos/ — gravações brutas por módulo

Material cru do Estúdio Audiovisual, aprovado pelo Video Director, para outra IA (ou pessoa) editar depois. **Não é material publicado.** Os vídeos estão como foram gravados: sem corte, sem crop e sem borrão (aceito pelo Pedro). Antes de qualquer uso público, aplicar o recorte, os descartes e os borrões indicados no `roteiro-telas.md` e no `manifesto.md` de cada módulo.

A pasta fica fora do deploy (`.vercelignore`). Valide com `node scripts/verificar-midia-brutos.mjs`.

## Índice (ordem do menu, `lib/conteudo/base/indice.json`)

| # | id | Módulo | Status |
|---|----|--------|--------|
| 0 | `primeiros-passos` | Primeiros passos | pendente |
| 1 | `fundacao` | Cadastros e Fundação | pendente |
| 2 | `crm` | CRM | **presente** |
| 3 | `cem` | Integração CEM | pendente |
| 4 | `vendas` | Vendas | **presente** |
| 5 | `compras` | Compras | pendente |
| 6 | `recebimento` | Recebimento | pendente |
| 7 | `estoque` | Estoque | **presente** |
| 8 | `producao` | Produção | pendente |
| 9 | `servicos` | Serviços e Instalação | pendente |
| 10 | `projetos` | Projetos e Obras | pendente |
| 11 | `expedicao` | Expedição | pendente |
| 12 | `faturamento` | Faturamento | pendente |
| 13 | `fiscal` | Fiscal | pendente |
| 14 | `financeiro` | Financeiro | **presente** |
| 15 | `tarefas` | Tarefas | pendente |
| 16 | `relatorios` | Relatórios e Análises | pendente |
| 17 | `alumina` | Alumina — IA | pendente |
| 18 | `fluxo-completo` | Visão do fluxo completo | pendente |

## Como usar

Cada pasta `midia/brutos/<id>/` tem:

- **vídeo(s) `.mp4`**: captura bruta 1920×1200, 30 fps, H.264, sem áudio. Recorte recomendado `crop=1920:1080:0:80`.
- **`roteiro-telas.md`**: tabela trecho a trecho com **início–fim em segundos do arquivo bruto** (±3 s), tela, o que aparece, regra com fonte do Harness, se usa ou descarta, e as áreas a borrar.
- **`manifesto.md`**: origem de cada arquivo, licença/uso, áreas sensíveis (A, B, C…) com coordenadas e observações do Producer.
- **`prints/`**: capturas de tela citadas no roteiro e no manifesto.

Para editar: abra o `roteiro-telas.md`, corte só os trechos marcados "sim", aplique o recorte e os borrões das áreas listadas e confira as regras com as fontes citadas.

## Convenção de nomes

- Pasta = `id` do módulo no índice (sem número): `crm/`, `vendas/`.
- Vídeo: `<id>_bruto_vNN.mp4`; quando há mais de uma gravação, `<id>_bruto_cNN-cMM_vNN.mp4` (cenas cobertas). `vNN` = versão do arquivo de origem no estúdio.
- Prints: `prints/<id>_cNN_MM.png` (cena NN, print MM); quando a origem é por tela e não por cena (Financeiro), `prints/<id>_<tela>_MM.png`.
- Roteiro e manifesto: sempre `roteiro-telas.md` e `manifesto.md`.

Origem (estúdio, `02-gravacoes-brutas/`): `gi-<id>_<cenas>_bruto_vNN.mp4`, `gi-<id>_cNN-pMM_print_vNN.png`, `gi-<id>_geral_roteiro-telas_vNN.md`, `gi-<id>_geral_manifesto_vNN.md`.

| Módulo | Origem | Repo |
|---|---|---|
| crm | `gi-crm_geral_roteiro-telas_v02.md` | `crm/roteiro-telas.md` |
| crm | `gi-crm_geral_manifesto_v01.md` | `crm/manifesto.md` |
| crm | `gi-crm_c03-c07_bruto_v01.mp4` | `crm/crm_bruto_c03-c07_v01.mp4` (vídeo 1) |
| crm | `gi-crm_c04-c07_bruto_v01.mp4` | `crm/crm_bruto_c04-c07_v01.mp4` (vídeo 2) |
| crm | `gi-crm_cNN-pMM_print_v01.png` | `crm/prints/crm_cNN_MM.png` |
| vendas | `gi-vendas_geral_roteiro-telas_v02.md` | `vendas/roteiro-telas.md` |
| vendas | `gi-vendas_geral_manifesto_v01.md` | `vendas/manifesto.md` |
| vendas | `gi-vendas_c03-c08_bruto_v01.mp4` | `vendas/vendas_bruto_v01.mp4` |
| vendas | `gi-vendas_cNN-pMM_print_v01.png` | `vendas/prints/vendas_cNN_MM.png` |
| financeiro | `gi-financeiro_geral_roteiro-telas_v02.md` | `financeiro/roteiro-telas.md` |
| financeiro | `gi-financeiro_geral_manifesto_v02.md` | `financeiro/manifesto.md` |
| financeiro | `gi-financeiro_geral_bruto_v01.mp4` | `financeiro/financeiro_bruto_v01.mp4` |
| financeiro | `gi-financeiro_<tela>-pMM_print_v01.png` | `financeiro/prints/financeiro_<tela>_MM.png` |
| estoque | `gi-estoque_geral_roteiro-telas_v02.md` | `estoque/roteiro-telas.md` |
| estoque | `gi-estoque_geral_manifesto_v02.md` | `estoque/manifesto.md` |
| estoque | `gi-estoque_c01_bruto_v01.mp4` | `estoque/estoque_bruto_c01_v01.mp4` |
| estoque | `gi-estoque_c02_bruto_v01.mp4` | `estoque/estoque_bruto_c02_v01.mp4` (`.mkv` do estúdio não sobe) |
| estoque | `gi-estoque_<tela>-pMM_print_v01.png` | `estoque/prints/estoque_<tela>_MM.png` |

## Trechos a descartar (segundos do bruto)

**CRM — vídeo 1 (`crm_bruto_c03-c07_v01.mp4`)**
- 0–44: navegação inicial antes de entrar no CRM.

**CRM — vídeo 2 (`crm_bruto_c04-c07_v01.mp4`)**
- 0–31: espera antes do clique.
- 106–125: toast vermelho de erro do Responsável, com ID de usuário (sensível).
- 141–171: transição até a edição.
- 281–300: final da gravação.

**Vendas (`vendas_bruto_v01.mp4`)**
- 0–22: sobra da gravação anterior, com oportunidades e valores de terceiros (sensível).
- 53–70: descartar tudo, exceto 58,5–62,5 (CFOP bloqueado).
- 70–150: dropdowns de Empresa, Cliente e Projeto com nomes e CPFs (sensível).
- 370–380: volta a um Novo Pedido em branco.

**Financeiro (`financeiro_bruto_v01.mp4`)**
- 0–57: sobra do módulo Vendas.
- 317–412: telas de Projetos (fora do Financeiro).
- 887–912: volta ao Dashboard Geral (repetida).

Obs.: o bruto do Financeiro tem 912,4 s. Estoque já montado (c01+c02); próximo módulo a gravar a definir com o Director.

**Estoque — vídeo 1 (`estoque_bruto_c01_v01.mp4`)**
- ~0–~80: sobra do Financeiro.
- ~1750–fim: sessão expirada / login (descartar).
- Timeline fina por tela ainda pendente (offsets aproximados).

**Estoque — vídeo 2 (`estoque_bruto_c02_v01.mp4`)**
- 0–~45: sobra de CRM › Leads.
- Slip Documentação da API (~118 s) e loadings longos: evitar no corte.

## Pendências de cobertura

- **Financeiro:** Painel Financeiro de Projetos será gravado junto com o módulo projetos.
- **Estoque:** timeline c01 aproximada (falta passagem frame a frame antes da edição).
- **Estoque:** Meu Portal › Usuários do Portal não aberto.
- **Estoque:** Relatório 506 e cubos 144/145 não executados (só tela de configuração/filtro).

## Pendências de regra para o Pedro

1. **CRM — 5 % de probabilidade:** a oportunidade criada na conversão nasce em "Novo Lead" com o valor do Budget (fonte `regra-crm-conversao-cria-a-oportunidade-sozinha`), mas os 5 % foram só observados na tela e não têm fonte no Harness. Está certo nascer com 5 %?
2. **Vendas — CFOP 5101-0:** o Harness trata o 5101 como CFOP que gera financeiro, mas na tela o 5101-0 não gerou parcelas (só o 5102 gerou). Registrado como observado na tela e divergente da regra. O 5101-0 deveria gerar financeiro?
