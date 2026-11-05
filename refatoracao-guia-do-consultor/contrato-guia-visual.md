# Contrato — Guia visual ilustrado por módulo (v1, 05/11/2026)

Cada módulo ganha um **guia visual** que conduz um iniciante pelo sistema: primeiro os **conceitos** (o que é,
para que serve, palavras do módulo, como se liga aos outros), depois um **tour guiado** por capítulos, com muitas
**capturas reais anotadas** (marcadores numerados, destaque, zoom e legenda). O mesmo arquivo alimenta o Guia
Inicial (capítulos `nivel: "basico"`) e o Guia do Consultor (todos os capítulos + `consultor`).

Renderizado por `PlataformaUI` (bloco `guia-visual`). **Só dados** — nenhum HTML dentro dos textos.

## Arquivos

```
public/manuais/<modulo>/guia.json          o guia (este contrato)
public/manuais/<modulo>/img/<nn>-<slug>.webp  capturas tratadas (1600 px de largura, webp q≈82; recorte e borrão já aplicados)
```

`<modulo>` = id do índice (`lib/conteudo/base/indice.json`): primeiros-passos, fundacao, crm, cem, vendas, compras,
recebimento, estoque, producao, servicos, projetos, expedicao, faturamento, fiscal, financeiro, tarefas, relatorios,
alumina, fluxo-completo.

## Formato de `guia.json`

```jsonc
{
  "modulo": "vendas",
  "titulo": "Vendas — guia visual",
  "resumo": "1–2 frases: o que a pessoa vai aprender.",
  "versaoSistema": "1.22.x conforme a fonte da captura",
  "atualizadoEm": "2026-11-05",
  "status": "rascunho",                 // rascunho | revisao | aprovado  (aprovação é humana)
  "conceitos": [                         // 3–6 cartões; linguagem simples; cada um com fonte
    { "titulo": "O que é o pedido de venda", "texto": "…", "icone": "vendas", "fontes": ["regra-…" ] }
  ],
  "palavras": [                          // mini-glossário do módulo (nomes de interface do glossário do Harness)
    { "termo": "Pedido de Venda", "definicao": "…", "fontes": ["…"] }
  ],
  "mapa": {                              // o módulo no fluxo da empresa (opcional)
    "antes": ["crm"], "depois": ["faturamento", "financeiro"], "texto": "…", "fontes": ["…"]
  },
  "capitulos": [
    {
      "id": "conhecer-a-tela",
      "titulo": "Conhecendo a lista de pedidos",
      "nivel": "basico",                 // basico (Guia Inicial + Consultor) | avancado (só Consultor)
      "objetivo": "O que a pessoa consegue fazer ao fim do capítulo.",
      "onde": "Vendas › Pedidos de Venda", // caminho no formato do Flow (glossário)
      "passos": [
        {
          "titulo": "Abra a lista de pedidos",
          "texto": "1–2 frases no imperativo. Nomes de interface exatamente como na tela.",
          "imagem": "/manuais/vendas/img/01-lista.webp",
          "alt": "Descrição objetiva da captura para leitor de tela",
          "largura": 1600, "altura": 900,
          "marcadores": [ { "n": 1, "x": 12.5, "y": 30.2, "rotulo": "Botão + Novo Pedido" } ],  // x,y em % da imagem (centro do marcador)
          "destaque": { "x": 10, "y": 25, "w": 20, "h": 10 },   // % — retângulo realçado (opcional)
          "zoom": { "x": 60, "y": 20, "w": 30, "h": 25 },       // % — recorte ampliado ao lado (opcional)
          "dica": "Opcional: atalho ou boa prática (com fonte).",
          "atencao": "Opcional: erro comum/bloqueio do sistema (com fonte).",
          "evidencia": "captura-real",   // captura-real | base | a-conferir-na-tela
          "fontes": ["videos/public/telas/fluxo-1-vendas/xx.png", "regra-…#chunk"]
        }
      ]
    }
  ],
  "consultor": {                          // só no Guia do Consultor (opcional)
    "implantacao": ["Pontos que o consultor confere ao implantar, com fonte"],
    "perguntasDoCliente": [ { "pergunta": "…", "resposta": "…", "fontes": ["…"] } ],
    "errosComuns": [ { "titulo": "…", "texto": "…", "fontes": ["…"] } ]
  },
  "fontes": ["lista consolidada de fonte_id/chunk_id do Harness e caminhos das capturas"],
  "pendencias": ["o que falta: capturas, divergências, itens a conferir na tela"]
}
```

## Regras (Harness)

1. **Nada inventado.** Todo conceito, regra, nome de tela/botão/campo/status vem do MCP `faktory-doc`
   (`kb_search`, `kb_get_source`, `glossary_lookup`), dos roteiros/checklists do repositório ou da captura.
   Sem fonte → não entra, ou vai para `pendencias`.
2. **Capturas só reais**: `videos/public/telas/**`, `midia/brutos/*/prints/**` ou novas capturas do staging feitas
   pelo coordenador. Antes de usar, **olhe a imagem** e borre nome de usuário/avatar, tenant, CNPJ, CPF, e-mail,
   telefone, endereço, nomes de pessoas/empresas reais e valores (ffmpeg `boxblur`). Se não der para limpar, não use.
3. Marcadores e destaques precisam cair **exatamente** sobre o elemento: meça na imagem final (coordenadas em %).
4. Linguagem: pt-BR, "você", frases curtas, imperativo nos passos (regras/escopo-e-estilo do Harness).
5. Divergência entre fontes → mostrar as duas em `atencao` com "a conferir na tela" e listar em `pendencias`.
6. Sem dados pessoais/comerciais em texto.

## v2 dos marcadores (05/11/2026, pedido do responsável) — OBRIGATÓRIO daqui em diante

Problema da v1: círculos numerados em cima do elemento escondiam a informação ("Em aberto", "Sem títulos"),
empilhavam em itens próximos e a legenda só repetia o nome. Exemplo corrigido: `public/manuais/vendas/guia.json`,
capítulo 1, passo "Leia a linha do pedido".

```jsonc
"marcadores": [
  {
    "n": 1,
    "rotulo": "Status",                                   // nome curto, como na tela
    "explicacao": "Em que etapa o pedido está. Um pedido recém-salvo aparece como Em aberto.", // 1 frase didática, com fonte
    "caixa": { "x": 73.1, "y": 66.4, "w": 5.4, "h": 5 },  // % da imagem: moldura EM VOLTA do elemento (com 4–8 px de folga)
    "lado": "baixo"                                       // cima | baixo | esquerda | direita — onde o número fica, FORA da moldura,
  }                                                       // num lugar vazio da tela (nunca em cima de outro dado)
],
"zoom": { "x": 72, "y": 60.4, "w": 26, "h": 19 }          // recorte que contém TODAS as molduras + espaço para os números
```

Regras v2:
1. Toda marcação usa `caixa` + `lado` + `explicacao` (x/y soltos só em guias antigos).
2. Elementos pequenos ou próximos (largura < ~8% da imagem, ou 3+ itens numa faixa) → `zoom` obrigatório. Com zoom, a tela
   inteira mostra só as molduras (contexto) e o zoom, em largura total, mostra os números — então o zoom precisa ter
   folga para os números do `lado` escolhido.
3. No máximo 5 marcadores por passo; mais que isso → divida em dois passos (mesma imagem com zooms diferentes ou recortes).
4. Ordem dos números = ordem em que a pessoa olha/age na tela (esquerda→direita, cima→baixo, ou a sequência do procedimento).
5. `destaque` (escurece o resto) só quando o passo é sobre UMA área; não combine com muitos marcadores.
6. Texto do passo: diga o que fazer e o que observar; a `explicacao` diz o que cada item significa para quem nunca viu o sistema.
   Nada sem fonte (base do Harness, roteiros, checklists, captura).
7. Confira desenhando a prévia (ffmpeg `drawbox` nas caixas + número no lado) e OLHANDO o resultado, inclusive do recorte de zoom.
