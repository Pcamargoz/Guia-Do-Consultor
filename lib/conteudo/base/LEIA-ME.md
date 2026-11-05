# Base de conhecimento (GERADA — não edite à mão)

Gerada por `node scripts/gerar-base-conhecimento.mjs --harness <pasta do Harness>` (versão 2026-11-04).
Fontes: Harness Faktory Flow (conhecimento/) e dados do Guia gerados do Harness. Cada bloco cita `fontes`.

- `indice.json`: versão, módulos (cabeçalho + materiais), caminhos protegidos e pendências. Basta para o resumo.
- `<modulo>.json`: as jornadas (seções e blocos) de um módulo, lidas só quando o módulo é aberto.
  `retido` = conteúdo semente de módulo em preparação, guardado e nunca servido.
- `carregar.js`: import() estático de cada arquivo (lib/conteudo/base.js usa).

Conferir sem gravar: `node scripts/gerar-base-conhecimento.mjs --harness <pasta> --verificar`.
