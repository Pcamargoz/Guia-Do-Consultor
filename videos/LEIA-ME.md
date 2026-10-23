# Vídeos de fluxo do Guia do Consultor

Vídeos animados com narração e legenda que explicam cada fluxo do Faktory Flow: o conceito, as regras de negócio e as telas reais do ambiente de teste. Ficam na aba **Vídeos de fluxo** do Guia e dentro do checklist de cada fluxo.

> **Retomando em outra sessão do Claude Code?** Leia primeiro [Estado e plano](#estado-e-plano-para-retomar), depois [Como retomar](#como-retomar-passo-a-passo). A narração e o visual de cada trecho dos 12 vídeos estão em [ROTEIROS.md](ROTEIROS.md).

## Estado e plano (para retomar)

Atualizado em 23/10/2026. Estação nova: `C:\Users\pedro\OneDrive\Desktop\Guia-Do-Consultor` (RTX 3050, VoiceStudio 0.5.6 com o modelo OmniVoice na GPU). O usuário aprovou a **voz L fixa** e o **visual novo** (prévia do Comercial) e pediu para narrar de novo e publicar os 12 vídeos, o piloto por último.

A fila de produção grava o andamento em `out/producao.log` (fora do git): primeiro narra os 12, depois renderiza e publica um por vez. Ordem: 03 Comercial → 07 Faturamento → 08 Financeiro → 01 Suprimentos → 02 Serviços → 04 Estoque → 05 Produção → 06 Expedição → 09 Projetos → 10 Tarefas → Fluxo completo → Fluxo 1 · Vendas (piloto). Ritmo medido: **~3 min de narração** e **~12 min de render** por vídeo.

| # | Vídeo (`roteiros/<id>.json`) | Trechos / telas | Onde aparece no Guia |
|---|---|---|---|
| 1 | `fluxo-1-vendas` — Fluxo 1 · Vendas (piloto, refeito com a voz L) | 17 / 8 | Fluxos do estagiário · Fluxo 1 + checklist `estagiarios/fluxo-principal-vendas.html` |
| 2 | `consultor-03-comercial` — do lead ao pedido | 17 / 8 | Consultores · Fluxo 03 + checklist 03 |
| 3 | `consultor-07-faturamento` — do pedido à nota finalizada | 16 / 7 | Consultores · Fluxo 07 e estagiário · Fluxo 2 |
| 4 | `consultor-08-financeiro` — títulos, baixa e saldos | 15 / 6 | Consultores · Fluxo 08 e estagiário · Fluxo 3 |
| 5 | `consultor-01-suprimentos` — da solicitação ao pagamento | 15 / 6 | Consultores · Fluxo 01 |
| 6 | `consultor-02-servicos` — da medição à assistência | 13 / 4 | Consultores · Fluxo 02 |
| 7 | `consultor-04-estoque` — movimento, transferência, inventário | 15 / 6 | Consultores · Fluxo 04 |
| 8 | `consultor-05-producao` — da estrutura ao acabado | 13 / 4 | Consultores · Fluxo 05 |
| 9 | `consultor-06-expedicao` — da carga à entrega | 13 / 4 | Consultores · Fluxo 06 |
| 10 | `consultor-09-projetos` — a obra que amarra os documentos | 12 / 3 | Consultores · Fluxo 09 |
| 11 | `consultor-10-tarefas` — quadro, cartão e responsável | 14 / 5 | Consultores · Fluxo 10 |
| 12 | `consultor-fluxo-completo` — do lead à gestão (reaproveita telas dos outros) | 16 / 8 | Consultores · Teste completo |

Cada vídeo, ao terminar o render, é publicado sozinho em `../public/videos/<id>.mp4/.jpg/.vtt`, marcado "pronto" no `../public/videos/manifest.json`, e os checklists são regenerados com o bloco "Vídeo do fluxo".

### O que ainda precisa ser feito (em ordem)

1. **Deixar a fila terminar** (`tudo pronto` no fim de `out/producao.log`). Se ela parar, veja [Como retomar](#como-retomar-passo-a-passo): a narração e os blocos de render já prontos não são refeitos.
2. **Conferir cada vídeo publicado:** a linha `checagem:` do log (0 trechos pretos, volume perto de −14 LUFS) e alguns quadros.
3. **Commit + push** no repositório do Guia, quando o usuário pedir (`public/videos/`, `public/checklists/`, `videos/`; `Checklists/` não entra).
4. **Pacote da equipe do Harness de Documentação**, depois do último vídeo: `powershell -ExecutionPolicy Bypass -File "C:\Users\pedro\OneDrive\Desktop\Harness-Arquitetura-Flow\empacotar-equipe.ps1"`.
5. **Limpeza do DEV** (não feita; o que for fiscal precisa de autorização do usuário): lista em `../docs/pendencias-checklists.md`, seção "Limpeza", item "Gravação dos vídeos de fluxo (22/10)".
6. **Opcional, se o usuário pedir:** vídeos próprios para os Fluxos 2 e 3 do estagiário (hoje reaproveitam os vídeos 07 e 08 dos consultores).

### Decisões já tomadas (não refazer)

- **Voz:** **voz L fixa**, escolhida pelo usuário em 23/10/2026 entre 14 vozes desenhadas. `voz.json` clona a amostra `voz/referencia-voz-l.wav` (12,6 s, com o `ref_text` exato). Não use voz só desenhada (`instruct` + `seed`): o timbre muda a cada frase, e o usuário recusou isso. A voz clonada antiga do consultor está em `voz-pedro.json` (a referência dela ficou na estação antiga). `voz/` não vai para o git.
- **Visual (v2, aprovado em 23/10/2026):** `src/FluxoVideo.tsx` segue a especificação tirada dos repositórios lemo-opuscar, mg-styles-15, pdoom-video e das coleções de explicativos (resumo em `docs/producao-de-videos.md` do Harness). Inter e JetBrains Mono locais (`@fontsource`); azul da marca para foco, limão da marca como marcador, laranja para cuidado, verde para concluído; texto que entra por máscara, ícones desenhados pelo traço, câmera em mola mais lenta que os objetos, caminho de menu em mono, parede de telas no fechamento.
- **Som:** música sintetizada (`musica/gerar_musica.py`) e efeitos sintetizados (`musica/gerar_sfx.py`: clique, whoosh, tick, check, alerta), sem direitos de terceiros. Entrega em −14 LUFS.
- **Render em blocos:** nesta estação um render longo é encerrado de fora no meio, sem erro. `scripts/remotion-em-partes.mjs` renderiza blocos de 15 s, cada um num processo próprio, com nova tentativa e retomada, e junta o vídeo sem recompressão com o áudio inteiro. O `render.mjs` já usa isso.
- **Telas:** as capturas brutas (`capturas/`) ficaram na estação antiga. O `preparar.mjs` reaproveita as telas de `public/telas/` e as posições dos elementos que estão em `src/gerado/<id>.json`.
- **Conteúdo:** toda regra citada tem fonte na base do Harness de Documentação (`regra_negocio`, `funcional`, manual oficial, roteiro de treinamento ou `metodologia`).

## Como retomar (passo a passo)

1. **VoiceStudio aberto** (app desktop, motor em `http://127.0.0.1:3900`). Conferir: `curl http://127.0.0.1:3900/health` deve mostrar `cuda`.
2. **Reiniciar o que faltar.** A narração tem cache por frase e o render retoma os blocos prontos:

```powershell
cd "C:\Users\pedro\OneDrive\Desktop\Guia-Do-Consultor\videos"
node scripts/lote.mjs <ids que ainda não têm ..\public\videos\<id>.mp4>
```

   No Claude Code, rodar em segundo plano (`run_in_background`) e esperar a notificação; não fazer polling. Não narre enquanto renderiza: o render copia `public/` no começo e a narração mexe nela.
3. **Um vídeo só:** `node scripts/narrar.mjs <id>` e depois `node scripts/render.mjs <id>` (rascunho rápido: `--rascunho`; publicar um master pronto em `out/`: `--usar-master`).
4. **Se a voz falhar:** "ECONNREFUSED 3900" = motor caiu (reabrir o VoiceStudio). Antes de narrar vídeos inteiros com uma voz nova, gere várias frases seguidas e peça para o usuário ouvir.
5. **Regravar uma tela** (precisa do login do usuário no DEV): `npm run gravar` abre o Chrome com perfil próprio (`.perfil-gravacao/`); **o usuário faz o login**; os comandos vão por `node scripts/cmd.mjs '{"acao":"..."}'` (ações: goto, url, texto, arvore, clicar, preencher, escolher, tecla, esperar, rolar, rolarAte, arrastar, captura com `ocultar` e `alvos`). Regras do DEV: `../docs/testes/_regras-comuns.md` (dados "TESTE FLUXO CONSULTOR", nunca transmitir nota, Faturar e Finalizar NF só com autorização do usuário).

## Como um vídeo é feito

| Passo | Comando | O que faz |
|---|---|---|
| 1. Roteiro | `roteiros/<id>.json` | Trechos (cena + fala). Cenas: abertura, status, regra, tela, alertas, fechamento. Em `tela`: `captura`, `focos` (índices das caixas), `caixasExtras`, `borrar`, `rotulo` |
| 2. Telas | `npm run gravar` + `scripts/cmd.mjs` | Capturas 1920×1080 com a posição dos elementos em `capturas/<id>/` (fora do git; só na máquina que gravou) |
| 3. Voz | `npm run narrar -- <id>` | VoiceStudio local, frase por frase (`scripts/frases.mjs`), cache em `public/audio/<id>/frases/` |
| 4. Dados | `node scripts/preparar.mjs <id>` | Junta roteiro, tempos da voz e capturas em `src/gerado/<id>.json` e copia as telas para `public/telas/<id>/` |
| 5. Render | `npm run render -- <id>` | Remotion em blocos (`remotion-em-partes.mjs`) → `../public/videos/<id>.mp4` + `.jpg` + `.vtt`, −14 LUFS, checagem de pretos e volume, regenera os checklists |
| Fila | `node scripts/lote.mjs <ids…>` | Passos 3 a 5 para vários vídeos, um por vez |

Prévia: `npm run studio`. Um quadro: `npx remotion still src/index.ts <id> out/q.png --frame=<n>`. Vídeo novo: criar o roteiro, gravar as telas, `node scripts/preparar.mjs <id>`, importar `src/gerado/<id>.json` em `src/Root.tsx`, copiar a música e incluir o vídeo em `../public/videos/manifest.json` e, se houver checklist, o campo `video` nos dados (`../scripts/dados-*.mjs`).

## O que não vai para o git

`.perfil-gravacao/` (sessão do DEV), `capturas/` (brutas), `voz/` (gravação pessoal da voz clonada), `public/audio/**.wav` e `public/musica/*.wav` (regeneráveis), `out/`. Sem `capturas/<id>/`, o `preparar.mjs` usa as telas de `public/telas/` e as posições já gravadas em `src/gerado/<id>.json`; só uma tela nova ou trocada precisa ser gravada de novo.

## Dados de teste

Gravações só no ambiente de teste, com registros "TESTE FLUXO CONSULTOR". Nomes de outras pessoas e o usuário logado ficam ocultos (`ocultar` na captura, `borrar` no roteiro). O que foi criado no DEV está em `../docs/pendencias-checklists.md` (Limpeza).

## Achados da gravação que já foram para a base do harness

Na v1.22.13: a Empresa não vem preenchida no Novo Pedido; Dados do Item muda conforme o material; finalizar a NF gera os títulos ("NF - nnn") **e baixa o estoque mesmo sem saldo** (defeito, deixou −1); o residual da baixa parcial usa o próximo número de parcela livre; a natureza da operação da cotação define o CFOP; em Serviços as passagens são por botão e o aceite da AT vem antes do Resolver (diverge do plano de validação).
