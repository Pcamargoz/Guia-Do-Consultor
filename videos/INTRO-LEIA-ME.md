# Vídeos de introdução de módulo (padrão "intro")

Piloto: `intro-vendas` (prévia em `out/intro-vendas-previa.mp4`, ainda não publicada e sem revisão humana).

## Padrão

- **Sem narração.** Música instrumental sintetizada (`musica/gerar_musica_intro.py`, só numpy, sem direitos de terceiros), chill house a 120 BPM. A 120 BPM, 1 tempo = 15 quadros e 1 compasso = 2 s, então os cortes caem exatamente na grade.
- **Ensina pela tela.** Câmera virtual (zoom/pan suave) no que importa, clique sintético (ponto azul + onda limão, porque a gravação quase não mostra o cursor), realce limão em campo ou linha, cortes secos que tiram o tempo morto.
- **Texto curto e estratégico:** 5 a 7 chamadas de 2 a 6 palavras, no momento da ação. Nada de legenda descrevendo tudo. O texto só diz o que aparece na tela. Nome de botão vai entre aspas, escrito como está na tela (ex.: “Salvar e Permanecer”).
- **Durações:** total de 45 a 75 s. Abertura de até 4 s (nome do módulo + uma linha). Fechamento de até 5 s ("Próximo passo: Guia Inicial › <Módulo>").
- **Entrega:** 1920×1080, 30 fps, H.264 + AAC, −14 LUFS integrado, pico real de até −1 dBFS.
- **Identidade:** azul #3478A7, céu #6FA8CF, limão #D5DD26, tinta #13293D. Fontes Plus Jakarta Sans (títulos) e Inter (texto).
- **Dados sensíveis:** todo trecho é recortado (`crop=1920:1080:0:80`) e borrado no corte. Borrar sempre o cabeçalho do usuário e o selo do tenant, a barra de status do Chrome e o que o roteiro de telas listar. Se um quadro ainda mostra nome, CPF, CNPJ, e-mail ou valor de terceiros, o trecho sai do vídeo. As caixas são conferidas olhando os quadros extraídos.

## Arquivos

| Caminho | O que é |
|---|---|
| `public/intro/<modulo>/cortes.json` | trechos do bruto (entrada/saída em s), caixas de borrão e o motivo de cada escolha |
| `public/intro/<modulo>/<id>.mp4` | um clipe limpo por trecho (gerado, sem áudio) |
| `scripts/cortar-intro.mjs` | gera os clipes a partir do `cortes.json` (o bruto em `../midia/brutos/` não é alterado) |
| `roteiros/intro-<modulo>.json` | cenas (início, duração, ponto do clipe), câmera `{t,x,y,zoom}`, cliques `{t,x,y}`, realces, textos `{t,ate,texto,posicao}`, abertura, fechamento e música |
| `src/IntroVideo.tsx` | composição genérica que lê o roteiro |
| `src/Root.tsx` | registra `intro-vendas` (as composições antigas continuam iguais) |
| `musica/gerar_musica_intro.py` | trilha: intro só com pad e piano, groove a partir de `--entrada`, acorde final em `--final` e uma cauda que termina em silêncio |
| `public/musica/intro-<modulo>.wav` | trilha já em −14 LUFS (fora do git, pelo `.gitignore`) |

Coordenadas de câmera, cliques e realces usam o quadro 1920×1080 já recortado. Os tempos dentro de uma cena contam a partir do início dela.

## Como reproduzir (Vendas)

```bash
cd videos
npm ci
node scripts/cortar-intro.mjs vendas
C:/Faktory/venv-transcricao/Scripts/python.exe -I musica/gerar_musica_intro.py public/musica/intro-vendas-bruta.wav 47 --bpm 120 --entrada 4 --final 42 --acentos 29
ffmpeg -y -i public/musica/intro-vendas-bruta.wav -af volume=-1.2dB -c:a pcm_s16le public/musica/intro-vendas.wav   # ganho medido com ebur128 para dar -14 LUFS
npx remotion render src/index.ts intro-vendas out/intro-vendas-previa.mp4 --codec=h264 --audio-codec=aac --audio-bitrate=192k
node scripts/qa.mjs out/intro-vendas-previa.mp4 --folha out/intro-vendas-folha.jpg
```

O `qa.mjs` funciona sem narração. O único "silêncio" que ele mostra é a cauda dos últimos 1,5 s, que é intencional.

## Próximos módulos

1. Ler o `roteiro-telas.md` e o `manifesto.md` do bruto. Extrair quadros (`ffmpeg -ss <s> -i bruto -frames:v 1 -vf crop=1920:1080:0:80`) e olhar cada um para achar o instante exato dos cliques. Os tempos do roteiro de telas têm margem de ±3 s: no de Vendas, o clique em + Novo Pedido estava em 57 s, e não em 52 s.
2. Escrever `public/intro/<modulo>/cortes.json` e rodar `cortar-intro.mjs`. Depois, conferir os borrões nos quadros dos clipes.
3. Escrever `roteiros/intro-<modulo>.json`, gerar a música com a duração do vídeo e registrar a composição no `Root.tsx`, como a `intro-vendas`.

| Situação | Módulos |
|---|---|
| Com bruto em `midia/brutos/` | crm (`crm_bruto_c03-c07_v01.mp4`, `crm_bruto_c04-c07_v01.mp4`), financeiro (`financeiro_bruto_v01.mp4`) |
| Feito (prévia) | vendas |
| **Pendentes, sem gravação** | primeiros-passos, fundacao, cem, compras, recebimento, estoque, producao, servicos, projetos, expedicao, faturamento, fiscal, tarefas, relatorios, alumina, fluxo-completo |

Os 16 pendentes precisam primeiro de uma gravação no staging, com dados fictícios e login feito pelo Pedro, e de um roteiro de telas.
