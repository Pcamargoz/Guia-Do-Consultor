# Edição de vídeo: reaproveitamento e ajustes dos intros (06/11/2026)

Worktree `HTML-MANUAL-centralizado`. Sem commit, sem publicação e sem narração.

## 1. Inventário e decisão por vídeo

Regra usada: vídeo de consultor tem narração, regras e 3 min. Ele ajuda, mas não é um intro. Por isso entra como **vídeo de apoio**, com rótulo próprio, e o material `<modulo>:video-inicial` continua em preparação.

### Publicados em `public/videos/` (com manifesto)

| Vídeo | Já estava em | Decisão | Vínculo novo |
|---|---|---|---|
| `fluxo-1-vendas` | Vendas, Guia Inicial | Mantido | nenhum |
| `consultor-01-suprimentos` | Compras e Recebimento, Consultor | Apoio | Compras e Recebimento, Inicial |
| `consultor-02-servicos` | Serviços, Consultor | Apoio | Serviços, Inicial |
| `consultor-03-comercial` | CRM e Vendas, Consultor | Apoio | CRM, Inicial |
| `consultor-04-estoque` | Estoque, Consultor | Apoio | Estoque, Inicial |
| `consultor-05-producao` | Produção, Consultor | Apoio | Produção, Inicial |
| `consultor-06-expedicao` | Expedição, Consultor | Apoio | Expedição, Inicial |
| `consultor-07-faturamento` | Faturamento, Inicial e Consultor | Apoio em Fiscal: o vídeo trata da nota e do que é do responsável fiscal, não da configuração tributária | Fiscal, Inicial e Consultor |
| `consultor-08-financeiro` | Financeiro, Inicial e Consultor | Mantido | nenhum |
| `consultor-09-projetos` | Projetos, Consultor | Apoio | Projetos, Inicial |
| `consultor-10-tarefas` | Tarefas, Consultor | Apoio | Tarefas, Inicial |
| `consultor-fluxo-completo` | Fluxo completo, Consultor | Apoio | Fluxo completo, Inicial |
| `compra-em-nome-do-cliente` | Faturamento, Consultor | Apoio: é um cenário de implantação que começa em Vendas › Configurações | Vendas, Consultor |

### Sem vínculo, de propósito

| Vídeo | Motivo |
|---|---|
| `public/videos/intro-vendas`, `intro-crm` | Arquivos estão lá, mas sem entrada no manifesto: aguardam aprovação do responsável |
| `videos/out/intro-*` | Não publicados, aguardam aprovação |
| `midia/brutos/**` | Material cru, sem borrão: nunca vai para aluno |

### Módulos que seguem sem nenhum vídeo

Primeiros passos, Cadastros e Fundação, e Integração CEM (`compra-em-nome-do-cliente` mostra a importação do CEM Mobi, mas não ensina a integração). Relatórios e Alumina ficam em preparação por decisão do Lead.

## 2. Como um material vira disponível

`public/videos/manifest.json` com `status: pronto` + `.mp4` em `public/videos/` + id em `lib/conteudo/mapa-modulos.js` + `node scripts/gerar-base-conhecimento.mjs --harness <pasta do Harness>`. A base em `lib/conteudo/base/` é gerada.

Mudança feita:
- `mapa-modulos.js`: campo novo `videosApoio: { inicial?, consultor? }`, separado de `videoInicial` e `videosConsultor`. A decisão não está no doc 05, que o cabeçalho do mapa diz transcrever.
- `montar.js`: `materialApoio` cria `<modulo>:video-apoio` e `<modulo>:video-consultor-apoio`, com título "(vídeo de apoio)" e aviso no resumo. Só entra vídeo publicado.
- Vídeo de apoio não gera o item "Assisti ao vídeo introdutório", então o total do progresso salvo não muda. Sem intro próprio, a seção do Guia Inicial se chama "Vídeo de apoio". Vídeo de apoio também não traz regras e cuidados para a página do consultor.

Resultado: 141 → 154 materiais, 112 → 125 disponíveis. Os 16 `video-inicial` em preparação continuam em preparação.

Quando um intro for aprovado: acrescentar a entrada no manifesto, trocar `videoInicial` do módulo para `intro-<modulo>` e gerar a base. O apoio continua ao lado e o aviso de "em preparação" some sozinho.

## 3. Para decidir (responsável)

- Vendas, Faturamento e Financeiro já usam vídeo narrado de 3 min na seção "Vídeo introdutório", com o item "Assisti ao vídeo introdutório". Não mudei: trocar para apoio tiraria um item do checklist de quem já marcou. Quando `intro-vendas` for aprovado, `fluxo-1-vendas` pode virar apoio.
- Em Fiscal, o título vem da primeira ocorrência no manifesto ("Faturamento: do pedido à nota finalizada"). Os dois vínculos de Fiscal apontam para o mesmo vídeo.

## 4. Ajustes nos intros prontos

Nada publicado: os arquivos estão em `videos/out/`, aguardando aprovação. Os roteiros anteriores estão guardados em `videos/out/roteiros-antes-v2/`.

| Arquivo | O que mudou | QA |
|---|---|---|
| `intro-estoque-v2.mp4` | "Almoxarifados…" entra depois do deslize e sai antes da troca de cena; mesma folga em "Entradas, saídas e transferências."; "Configurações do Estoque" sem aspas | aprovado, 45 s, −14 LUFS, pico −2,3 dBFS |
| `intro-financeiro-v2.mp4` | "Budget vs Realizado" sem aspas | aprovado, 47,5 s, −14,1 LUFS, pico −1,6 dBFS |
| `intro-crm-v2.mp4` | ver abaixo | aprovado, 50 s, −14 LUFS, pico −1,1 dBFS |

As aspas saíram tirando `tela: true` do roteiro. A regra do `INTRO-LEIA-ME.md` é aspas só em nome de botão, e os dois casos são nomes de tela.

**CRM.** O que parecia borrão vinha de três fontes:
1. O desfoque do próprio Flow atrás do painel lateral: a câmera agora enquadra só o painel.
2. Caixas largas demais: agora cobrem só o nome e o valor (`resp_nome_novo`, `resp_nome_editar`, `budget_valor`). A cena de Origem do Lead não tem dado no formulário e ficou sem borrão ali.
3. O esqueleto de carregamento depois de Salvar: a cena foi dividida em `c3a-salvar` e `c3b-lista`. Isso também tirou o relance do formulário ao fechar, em torno de 2,9 s do clipe. Sobra cerca de 0,3 s de esqueleto, junto do botão "Salvando...".

Os clipes novos têm sufixo `-v2`; os antigos continuam na pasta. No v2 o trecho ficou mais longo, e quando o aviso de sucesso saía o nome do usuário reaparecia: pego na conferência dos quadros antes do render final e coberto com o cabeçalho borrado a partir de 6,55 s do clipe.

`public/videos/intro-crm.mp4` é a versão anterior, com o esqueleto e o relance. Se o v2 for aprovado, publique o v2 no lugar.

## 5. Brutos novos

- Lote c01 de 06/11: saiu espremido em x0–1600, com faixa vazia até 1920 (avatar 32×38 px). O coordenador regravou tudo como c02, em 1920×1080 nativo.
- `videos/out/intro-compras-previa.mp4`, a partir da c02: 46 s, QA aprovada. Faltam revisão humana e publicação. A coluna Projeto de Solicitações de Compra tem nome de pessoa e foi borrada.
- Compras usa `lento` (1,22 a 2,13×) para esticar telas paradas até a duração da cena. O maior é o Dashboard, de 3,1 s. Não há movimento real na tela, mas isso é esticar material: decisão do responsável se fica.
- Como o `cortar-intro.mjs` fixa `crop=1920:1080:0:80`, os clipes de Compras foram cortados por um script temporário, a partir de `public/intro/compras/cortes.json`. Mudança de uma linha que torna o corte reproduzível (linha `const partes` de `scripts/cortar-intro.mjs`):

```js
const partes = [`[0:v]${cfg.recorte ?? 'crop=1920:1080:0:80'}${c.lento ? `,setpts=${c.lento}*PTS` : ''},fps=30,setsar=1[b0]`];
```

| Módulo | Bruto | Telas | Situação |
|---|---|---|---|
| compras | c02, 39 s | 6 | prévia pronta |
| primeiros-passos | c02, 30 s | 6 | a fazer; saudação com nome e valores do Resumo do negócio |
| producao | c02, 31 s | 5 | a fazer; borrar a coluna Projeto inteira em Ordens de produção |
| servicos, projetos, expedicao | c02, 31 s | 5 | a fazer |
| fiscal, tarefas | c02, 25 s | 4 | a fazer |
| recebimento | c02, 25 s | 4 | a fazer |
| fundacao | c02, 19 s | 3 | a fazer; curto |
| cem | c01 nativa, 12 s | 2 | pendência: curto demais para um intro, sem esticar |

Com 4 ou 5 telas de cerca de 6 s, o intro fica entre 33 e 40 s, abaixo do mínimo de 45 s do padrão, a menos que se estique ou se grave mais. Em todas as listas, conferir colunas com nome de pessoa antes de renderizar, e olhar o clipe inteiro: a gravação rola a página no meio de algumas telas (em Follow-up de Entregas da c01, 38 px).
