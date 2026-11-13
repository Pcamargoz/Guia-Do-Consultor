# 14 — Metodologia (prompt-mestre de 12/11/2026)

Substitui a direção dos docs 03, 05 e 12 na navegação: **Página Inicial, Guia Inicial, Guia do Consultor, Acervo e
trilhas deixam de ser áreas**. Tudo vira **METODOLOGIA**, com quatro seções. Os dados antigos não são apagados.

## Critério de aceite (resumo do prompt)

1. Menu principal "Metodologia" com: Metodologia do Consultor (catálogo), Manuais de Apoio, Biblioteca de Vídeos e
   Metodologia Faktory Flow (área institucional em lima, `--brand-accent #D5DD26`, o "verde neon" oficial).
2. Um módulo = **um vídeo completo + um checklist integral + um manual de apoio**, servidos por uma fonte única.
3. Bibliotecas de vídeos e de manuais consomem os mesmos recursos dos módulos (não geram nada novo).
4. Manual institucional com as duas frentes (gestão do setor; metodologia de uso e implantação), só com conteúdo da
   base do Harness.
5. Materiais ausentes aparecem como "Em preparação"; materiais gravados em versão anterior do sistema aparecem como
   "Revisar: feito na vX".
6. Visibilidade e permissões preservadas (servidor recusa o que estiver oculto; admin publica/oculta).

## Fonte única: `recursos` de cada módulo

Gerada por `lib/conteudo/montar.js` (campo `recursos` no índice e no `GET /api/conteudo`):

| Recurso | De onde vem | Observação |
|---|---|---|
| `video` | `MAPA_MODULOS[].video` (um id de `public/videos/manifest.json`) | **Hoje `null` nos 19 módulos** (decisão do responsável, 12/11/2026: nenhum vídeo existente vira vídeo do módulo; os vídeos completos serão gravados). Quando houver, capítulos e legenda vêm de `videos/src/gerado/<id>.json` |
| `checklist` | `MAPA_MODULOS[].implantacao` (checklist de implantação gerado do Harness) | Progresso por usuário em `/api/checklists-progresso` (chave `ff-implantacao:<id>`), problemas, exportar |
| `manual` | `public/manuais/<id>/guia.json` | Manual integral = todos os capítulos (básico + consultor) e o bloco "Para o consultor" |

A **Biblioteca de Vídeos** usa `base.videos`: os vídeos já publicados (13), com capítulos e os módulos a que se ligam.

## Navegação e rotas

**O endereço não mostra rotas** (pedido do responsável, 12/11/2026): a rota vive em `history.state` e a barra de
endereço fica só no domínio. Voltar e avançar do navegador funcionam; um link antigo com `#…` abre a tela certa e o
endereço é limpo em seguida. As rotas abaixo são internas (`Plataforma.irPara`).

| Rota | Tela |
|---|---|
| `#metodologia` | Metodologia do Consultor: catálogo de módulos (cards, busca, filtro por situação dos materiais) |
| `#metodologia/<modulo>` | Página do módulo: vídeo, checklist e manual, cada um com versão e situação |
| `#manuais[/<modulo>]` | Biblioteca de manuais e leitor do manual (imprimir/salvar em PDF) |
| `#videos[/<modulo>]` | Biblioteca de vídeos e player (velocidade, tela cheia, legenda, capítulos) |
| `#metodologia-ff[/<secao>]` | Metodologia Faktory Flow: manual institucional |

Hashes antigos viram aliases: `#inicio`, `#inicial`, `#consultor` → `#metodologia`; `#inicio|inicial|consultor/<m>`
→ `#metodologia/<m>`; `#acervo`, `#apostila`, `#guia`… → `#metodologia-ff`; `#checklist` → `#metodologia`.
Ferramentas fora da Metodologia continuam: Pacotes e Horas e o Painel do administrador.

## Visibilidade

Chaves novas (migração `014_metodologia.sql`, `ON CONFLICT DO NOTHING`): `area:metodologia`, `area:manuais`,
`area:metodologia-ff`. `area:videos` passa a ser a Biblioteca de Vídeos. As chaves antigas (`area:guia-inicial`,
`area:guia-consultor`, `area:acervo`, `area:checklists`, `area:apostila`) ficam no banco, sem uso na navegação.

## Preservado sem exibir

Trilha do estagiário (00–15), fluxos principais 1–3, Guia Inicial por módulo, Acervo (guia antigo), apostila: os
arquivos e o progresso salvo continuam no repositório e no banco; só saem da navegação.
