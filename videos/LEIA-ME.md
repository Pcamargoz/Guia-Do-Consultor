# Vídeos de fluxo do Guia do Consultor

Vídeos animados com narração (voz clonada do consultor Pedro) e legenda que explicam cada fluxo do Faktory Flow: o conceito, as regras de negócio e as telas reais do ambiente de teste. Ficam na aba **Vídeos de fluxo** do Guia e dentro do checklist de cada fluxo.

> **Retomando em outra sessão do Claude Code?** Leia primeiro a seção [Estado e plano](#estado-e-plano-para-retomar), depois [Como retomar](#como-retomar-passo-a-passo). A narração e o visual de cada trecho dos 12 vídeos estão em [ROTEIROS.md](ROTEIROS.md).

## Estado e plano (para retomar)

Atualizado em 22/10/2026, 16h10. Os 12 roteiros estão escritos e todas as telas foram gravadas no DEV (v1.22.13). Só falta **voz + render** de cada vídeo, que roda sozinho numa fila (`scripts/lote.mjs`). O usuário aprovou a prévia de áudio do piloto ("está perfeito"): manter voz, música e mixagem.

| # | Vídeo (`roteiros/<id>.json`) | Trechos / telas | Voz | Render / publicado | Onde aparece no Guia |
|---|---|---|---|---|---|
| 1 | `fluxo-1-vendas` — Fluxo 1 · Vendas (piloto) | 17 / 8 | pronta | **publicado** (2 min 46 s, 0 pretos, −14,2 LUFS) | Fluxos do estagiário · Fluxo 1 + checklist `estagiarios/fluxo-principal-vendas.html` |
| 2 | `consultor-03-comercial` — do lead ao pedido | 17 / 8 | não | não | Consultores · Fluxo 03 + checklist 03 |
| 3 | `consultor-07-faturamento` — do pedido à nota finalizada | 16 / 7 | não | não | Consultores · Fluxo 07 e estagiário · Fluxo 2 |
| 4 | `consultor-08-financeiro` — títulos, baixa e saldos | 15 / 6 | não | não | Consultores · Fluxo 08 e estagiário · Fluxo 3 |
| 5 | `consultor-01-suprimentos` — da solicitação ao pagamento | 15 / 6 | não | não | Consultores · Fluxo 01 |
| 6 | `consultor-02-servicos` — da medição à assistência | 13 / 4 | não | não | Consultores · Fluxo 02 |
| 7 | `consultor-04-estoque` — movimento, transferência, inventário | 15 / 6 | não | não | Consultores · Fluxo 04 |
| 8 | `consultor-05-producao` — da estrutura ao acabado | 13 / 4 | não | não | Consultores · Fluxo 05 |
| 9 | `consultor-06-expedicao` — da carga à entrega | 13 / 4 | não | não | Consultores · Fluxo 06 |
| 10 | `consultor-09-projetos` — a obra que amarra os documentos | 12 / 3 | não | não | Consultores · Fluxo 09 |
| 11 | `consultor-10-tarefas` — quadro, cartão e responsável | 14 / 5 | não | não | Consultores · Fluxo 10 |
| 12 | `consultor-fluxo-completo` — do lead à gestão (reaproveita telas dos outros) | 16 / 8 | não | não | Consultores · Teste completo |

A fila roda nessa ordem. Ritmo medido na CPU: **~5 min por frase** de voz (um vídeo = 35 a 50 frases ≈ 3 a 4 h) + ~15 min de render. Cada vídeo, ao terminar o render, é publicado sozinho em `../public/videos/<id>.mp4/.jpg/.vtt`, marcado "pronto" no `../public/videos/manifest.json` e os checklists são regenerados com o bloco "Vídeo do fluxo".

### O que ainda precisa ser feito (em ordem)

1. **Deixar a fila terminar** os 12 vídeos (ou reiniciá-la, ver abaixo). Para ver o andamento: `tasklist | findstr node` e o arquivo de saída do lote, ou `public/audio/<id>/tempos.json` (trechos já narrados).
2. **A cada vídeo publicado:** assistir (ou pelo menos olhar quadros com `npx remotion still`), conferir a linha `checagem:` do render (0 trechos pretos, volume perto de −14 LUFS) e fazer **commit + push** no repositório do Guia (`public/videos/<id>.*`, `public/videos/manifest.json`, `public/checklists/`, `Checklists/` não entra). O usuário pede commit + push ao terminar, sem testes extras.
3. **Depois do último vídeo:** gerar o pacote novo da equipe do Harness de Documentação: `powershell -ExecutionPolicy Bypass -File "..\..\Harness Arquitetura para documentação Fakflow\empacotar-equipe.ps1"` (o usuário pediu para gerar só quando os vídeos terminarem).
4. **Limpeza do DEV** (não feita, precisa de autorização do usuário para o que for fiscal): lista em `../docs/pendencias-checklists.md`, seção "Limpeza", item "Gravação dos vídeos de fluxo (22/10)": PV-000035 e a NF-020 finalizada, títulos NF-020 /001 /002 /003 e a baixa de R$ 50,00, saída de estoque 000026 (saldo −1 do item 3639 Branco Neve Epóxi), OPO-000018, lead "TESTE FLUXO CONSULTOR - Vídeo Comercial", cartão de tarefa arquivado.
5. **Opcional, se o usuário pedir:** vídeos próprios para os Fluxos 2 e 3 do estagiário (hoje reaproveitam os vídeos 07 e 08 dos consultores); reaproveitar a voz para a trilha 00–15 do estagiário.

### Decisões já tomadas (não refazer)

- **Voz:** a do próprio consultor Pedro, clonada no VoiceStudio local (`voz.json` → `voz/referencia-pedro-curta.wav`, 8 s, com o `ref_text` exato). A referência de 18 s estourava o limite de 600 s por geração e derrubava o motor. Reserva escolhida pelo usuário: `voz-masculina.json` (voz desenhada "male, middle-aged, low pitch", seed 7). `voz/` não vai para o git.
- **Música:** sintetizada (`musica/gerar_musica.py`, sem direitos de terceiros), uma cópia por vídeo em `public/musica/<id>.wav` (não vai para o git; recriar com `python -I musica/gerar_musica.py out/musica-bruta.wav 240` + o filtro do LEIA-ME da apresentação do harness, ou copiar `fluxo-1-vendas.wav`).
- **Estilo:** regras do lemo-opuscar (Living Screencast, DIRECTOR.md) e do pdoom-video aplicadas em `src/FluxoVideo.tsx`: legenda frase a frase, spotlight, cursor contínuo, wipes, pílula de capítulo, cliques e whoosh sintetizados (`musica/gerar_sfx.py`), −14 LUFS.
- **Conteúdo:** toda regra citada tem fonte na base do Harness de Documentação (`regra_negocio`, `funcional`, manual oficial, roteiro de treinamento ou `metodologia`). Contexto de cada fluxo: `faktory-doc kb buscar "<pergunta>" --cliente cliente-teste` na pasta do harness (o MCP `faktory-doc` não carrega no Claude Code desta pasta).

## Como retomar (passo a passo)

1. **VoiceStudio aberto** (app desktop, motor em `http://127.0.0.1:3900`). Conferir: `curl http://127.0.0.1:3900/model/status` (o modelo carrega sozinho no primeiro pedido, 1 a 4 min; "idle" é normal).
2. **Reiniciar a fila** (o cache reaproveita tudo o que já foi narrado; vídeo já publicado é renderizado de novo, então tire da lista os que já têm `../public/videos/<id>.mp4`):

```powershell
cd "C:\Users\Pedro Santos\Desktop\HTML PARA MANUAL DO USUARIO\videos"
node scripts/lote.mjs fluxo-1-vendas consultor-03-comercial consultor-07-faturamento consultor-08-financeiro consultor-01-suprimentos consultor-02-servicos consultor-04-estoque consultor-05-producao consultor-06-expedicao consultor-09-projetos consultor-10-tarefas consultor-fluxo-completo
```

   No Claude Code, rodar em segundo plano (`run_in_background`) e esperar a notificação; não fazer polling.
3. **Um vídeo só:** `node scripts/narrar.mjs <id>` e depois `node scripts/render.mjs <id>` (rascunho rápido: `--rascunho`).
4. **Se a voz falhar:** "HTTP 503 … more than 600s" = frase pesada demais (dividir a frase no roteiro); "ECONNREFUSED 3900" = motor caiu (reabrir o VoiceStudio; pouca RAM derruba o motor, fechar Edge/Spotify ajuda); voz ruim = usar a reserva com `node scripts/narrar.mjs <id> --voz voz-masculina.json` (gera outro cache).
5. **Regravar uma tela** (precisa do login do usuário no DEV): `npm run gravar` abre o Chrome com perfil próprio (`.perfil-gravacao/`); **o usuário faz o login**; os comandos vão por `node scripts/cmd.mjs '{"acao":"..."}'` (ações: goto, url, texto, arvore, clicar, preencher, escolher, tecla, esperar, rolar, rolarAte, arrastar, captura com `ocultar` e `alvos`). Regras do DEV: `../docs/testes/_regras-comuns.md` (dados "TESTE FLUXO CONSULTOR", nunca transmitir nota, Faturar e Finalizar NF só com autorização do usuário).

## Como um vídeo é feito

| Passo | Comando | O que faz |
|---|---|---|
| 1. Roteiro | `roteiros/<id>.json` | Trechos (cena + fala). Cenas: abertura, status, regra, tela, alertas, fechamento. Em `tela`: `captura`, `focos` (índices das caixas), `caixasExtras`, `borrar`, `rotulo` |
| 2. Telas | `npm run gravar` + `scripts/cmd.mjs` | Capturas 1920×1080 com a posição dos elementos em `capturas/<id>/` (fora do git; só nesta máquina) |
| 3. Voz | `npm run narrar -- <id>` | VoiceStudio local, frase por frase (`scripts/frases.mjs`), cache em `public/audio/<id>/frases/` |
| 4. Dados | `node scripts/preparar.mjs <id>` | Junta roteiro, tempos da voz e capturas em `src/gerado/<id>.json` e copia as telas para `public/telas/<id>/` |
| 5. Render | `npm run render -- <id>` | Remotion → `../public/videos/<id>.mp4` + `.jpg` + `.vtt`, −14 LUFS, checagem de pretos e volume, regenera os checklists |
| Fila | `node scripts/lote.mjs <ids…>` | Passos 3 a 5 para vários vídeos, um por vez |

Prévia: `npm run studio`. Um quadro: `npx remotion still src/index.ts <id> out/q.png --frame=<n>`. Vídeo novo: criar o roteiro, gravar as telas, `node scripts/preparar.mjs <id>`, importar `src/gerado/<id>.json` em `src/Root.tsx`, copiar a música e incluir o vídeo em `../public/videos/manifest.json` e, se houver checklist, o campo `video` nos dados (`../scripts/dados-*.mjs`).

## O que não vai para o git

`.perfil-gravacao/` (sessão do DEV), `capturas/` (brutas), `voz/` (gravação pessoal da voz clonada), `public/audio/**.wav` e `public/musica/*.wav` (regeneráveis), `out/`. Atenção: o `preparar.mjs` precisa de `capturas/<id>/` — em outra máquina, as telas teriam de ser regravadas (as do git, em `public/telas/`, não guardam a posição dos elementos).

## Dados de teste

Gravações só no ambiente de teste, com registros "TESTE FLUXO CONSULTOR". Nomes de outras pessoas e o usuário logado ficam ocultos (`ocultar` na captura, `borrar` no roteiro). O que foi criado no DEV está em `../docs/pendencias-checklists.md` (Limpeza).

## Achados da gravação que já foram para a base do harness

Na v1.22.13: a Empresa não vem preenchida no Novo Pedido; Dados do Item muda conforme o material; finalizar a NF gera os títulos ("NF - nnn") **e baixa o estoque mesmo sem saldo** (defeito, deixou −1); o residual da baixa parcial usa o próximo número de parcela livre; a natureza da operação da cotação define o CFOP; em Serviços as passagens são por botão e o aceite da AT vem antes do Resolver (diverge do plano de validação).
