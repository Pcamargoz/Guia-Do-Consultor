# Vídeos de fluxo do Guia do Consultor

Vídeos animados com narração e legenda que explicam cada fluxo do Faktory Flow (conceito, regras de negócio e telas reais). Ficam na aba **Vídeos de fluxo** do Guia e dentro do checklist de cada fluxo.

Regras de conteúdo e roteiro: Harness de Documentação (`harness/regras/videos-de-fluxo.md`, prompt MCP `roteirizar-video`, `docs/producao-de-videos.md`). Toda regra citada no vídeo tem fonte na base do harness.

## Como um vídeo é feito

| Passo | Comando | O que faz |
|---|---|---|
| 1. Roteiro | `roteiros/<id>.json` | Trechos (cena + fala). Cenas: abertura, status, regra, tela, alertas, fechamento |
| 2. Telas | `npm run gravar` | Abre o Chrome com perfil próprio no DEV; **a pessoa faz o login**; os comandos (`node scripts/cmd.mjs '{...}'`) navegam e capturam em 1920×1080 com a posição dos elementos |
| 3. Voz | `npm run narrar -- <id>` | VoiceStudio local (127.0.0.1:3900), frase por frase, com cache; voz em `voz.json` |
| 4. Dados | `node scripts/preparar.mjs <id>` | Junta roteiro, tempos da voz e capturas em `src/gerado/<id>.json` |
| 5. Render | `npm run render -- <id>` | Remotion → `../public/videos/<id>.mp4` + `.jpg` + `.vtt`, −14 LUFS, checagens, e regenera os checklists |

Prévia: `npm run studio`. Rascunho rápido: `node scripts/render.mjs <id> --rascunho`.

## O que não vai para o git

`.perfil-gravacao/` (sessão do DEV), `capturas/` (brutas), `voz/` (gravação pessoal da voz clonada), `public/audio/**.wav` e `public/musica/*.wav` (regeneráveis), `out/`.

## Dados de teste

Gravações só no ambiente de teste, com registros "TESTE FLUXO CONSULTOR". Nomes de outras pessoas e o usuário logado ficam ocultos (`ocultar` na captura, `borrar` no roteiro). O que foi criado no DEV está em `docs/pendencias-checklists.md` (Limpeza).
