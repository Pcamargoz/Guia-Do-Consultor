# 15 — Linguagem de movimento da Metodologia (13/11/2026)

Pedido do responsável: animações premium no nível dos sites da Apple, sem perder a identidade da marca e sem
atrapalhar o trabalho. Código: `public/movimento.js` (utilitário) e a seção "Movimento" de `public/metodologia.css`.

## Decisão técnica

Recursos nativos do navegador, sem biblioteca nova (mantém a decisão D2: sem build, CSP `script-src 'self'`):

| Referência pedida | O que usamos no lugar | Por quê |
|---|---|---|
| GSAP (timelines, ScrollTrigger) | Web Animations API + IntersectionObserver + `animation-timeline: view()` | Mesmo efeito, sem 70 KB e sem segundo motor de animação |
| Motion / Motion Primitives (molas, layout) | Curva `linear()` de mola + FLIP (`FFMovimento.layout`) | O projeto não usa React |
| View transitions de página | View Transitions API com salvaguarda de 200 ms | Elemento compartilhado nativo |
| Lenis (rolagem suave) | Não usado | Brigaria com o checklist embutido (iframe alto) e os cabeçalhos fixos |
| React Bits / Magic UI (texto) | Palavras por máscara, foco por desfoque, contadores | Só paleta e fontes da marca; sem texto em degradê |

## Tokens

- Durações: 160 ms resposta · 320 ms estado · 420 ms layout · 640–900 ms momento autoral.
- Curvas: `--mov-ease` (saída exponencial) e `--mov-mola` (mola suave, 4% de passagem, sem quicar).

## Onde cada coisa aparece

| Tela | Movimento |
|---|---|
| Troca de seção | O conteúdo sai em 170 ms e o novo chega em 420 ms; menu e topo ficam parados |
| Cartão → módulo | A ilustração e o título viajam do cartão para o cabeçalho, e voltam ao sair (elemento compartilhado) |
| Catálogo, manuais, vídeos | Grupos e listas aparecem na rolagem, em sequência curta (no máximo 360 ms de atraso); filtrar faz os cartões deslizarem até o lugar novo |
| Filtros e abas do módulo | Indicador deslizante (pílula branca nos filtros; anel na cor do módulo nas abas) |
| Botões, cartões, player | Resposta de pressão (escala .975 com mola) |
| Títulos | Palavras sobem por máscara; o texto de abertura sai do desfoque; os contadores sobem até o valor real |
| Metodologia Faktory Flow | Título em duas linhas por máscara, luz com parallax discreto, linha de leitura em lima, traço de lima nos títulos das seções e passos que se desenham com a rolagem |

## Regras

- Conteúdo nunca fica escondido sem JavaScript: as regras só valem com `html.mov`, que o script põe.
- Segurança: se o navegador não desenhar (aba em segundo plano), tudo aparece em até 4 s e a troca de tela não espera a animação.
- `prefers-reduced-motion`: sem movimento espacial; mudanças de estado continuam visíveis.
- Telas de trabalho (checklist, formulários, tabelas, Pacotes e Horas) não ganham coreografia: só resposta imediata.
