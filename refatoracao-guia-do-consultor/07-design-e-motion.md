# 07 — Design e motion (R-A40 a R-A44, R-C*)

## Direção visual escolhida

**"Editorial técnico com profundidade"**: base clara do Guia (legibilidade para leitura longa) com uma
**Página Inicial em Dark Premium** (hero escuro em azul profundo `--brand-primary-950` com iluminação em
degradê azul→céu e brilho lima). Uma direção só, aplicada com consistência (R-C20):

| Elemento | Decisão |
|---|---|
| Paleta | Tokens existentes de `brand-system.css` (azul `#3478A7`, céu `#6FA8CF`, lima `#D5DD26`, tinta `#13293D`). Cor própria por módulo (já existe em `modulos.dados.cor`) usada em ícone, brilho e borda do card. Lima nunca como texto sobre branco (`--brand-accent-text` para isso) |
| Tipografia | **Plus Jakarta Sans** (display, 700–800, tracking negativo nos títulos grandes) + **Inter** (texto). Já carregadas. Escala fluida com `clamp()` |
| Forma | Raio 16 px nos cards, 999 px em chips; bordas de 1 px translúcidas; sombras em camadas coloridas pela cor do módulo |
| Profundidade | Gradientes radiais por trás do hero, "spotlight" que segue o cursor no card (variáveis CSS `--mx/--my`), borda com `conic-gradient` animada no hover |
| Iconografia | SVG de traço 2 px (padrão já usado; compatível com Lucide), um ícone por módulo |
| Estados | Skeleton com shimmer em todo carregamento; vazio; erro com ação de tentar de novo; **"Em preparação"** com ícone de relógio e texto claro |

Tokens novos com prefixo `--pl-*` (plataforma) em `public/plataforma.css`, derivados dos tokens da marca.

## Cards de módulo (Página Inicial)

1. **Entrada:** revelação escalonada (stagger 40 ms) ao entrar na viewport (IntersectionObserver).
2. **Hover/foco:** elevação (`translateY(-6px)`), spotlight, borda animada; o ícone sobe e cede espaço ao
   painel de materiais, que desliza com:
   - 🎬 Vídeo introdutório · 📘 Manual resumido · ✅ Checklist → **Guia Inicial**
   - 🧭 Conteúdo avançado · 🎥 Vídeos avançados → **Guia do Consultor**
   - cada item com estado: *Disponível* / *Em preparação*.
3. **Teclado e toque:** o mesmo painel abre no foco e no toque (não depende de hover); botões reais.
4. **Clique:** transição cinematográfica (View Transitions) do card para o cabeçalho do módulo.

## Decisão de bibliotecas

| Biblioteca | Decisão | Motivo |
|---|---|---|
| CSS + **Web Animations API** + **View Transitions API** + IntersectionObserver | **Adotar** | Sem build, cabe na CSP (`script-src 'self'`), zero KB extra, suporte amplo; fallback simples |
| Motion (motion.dev, versão vanilla) | Avaliar depois | Útil para springs/layout animations; exigiria copiar o bundle para `public/vendor/` (CSP). Só se a WAAPI não bastar |
| GSAP + ScrollTrigger | Não agora | Justificável só para timelines longas por scroll; licença hoje gratuita, mas aumenta o peso |
| Lenis | **Não adotar** | Rolagem suave sequestrada piora acessibilidade e conflita com a rolagem do guia |
| Lottie / Rive | Não agora | Sem animações prontas da marca; avaliar para ícones animados quando houver arquivos |
| Three.js | Não adotar | Nenhuma necessidade 3D real (R-A42, R-C30) |
| React, Tailwind, shadcn, Radix | Não no Guia | Exigiriam build e reescrita; ficam no Frontend Design Harness para projetos com React |
| **Remotion** | **Adotar (já existe)** | Motor de vídeo v6 em `videos/` |

## Acessibilidade e responsividade

- `prefers-reduced-motion: reduce` → sem stagger, sem spotlight, transições instantâneas, View Transitions desligadas.
- Contraste AA (tokens já calculados), foco visível (anel lima sobre azul), alvos ≥ 44 px, navegação
  por teclado nos cards (setas na grade), `aria-live` nos estados de carregamento.
- Grade: 4 colunas ≥ 1280 px, 3 ≥ 960, 2 ≥ 640, 1 coluna no celular (painel de materiais sempre visível no toque).
- QA visual com Playwright em 1440 / 768 / 390 px, console sem erros, checagem de landmarks/alt/contraste.

## Integração com os vídeos

Os mesmos tokens alimentam o motor de vídeo (cores, fontes, raio, ícones), mantendo os dois ambientes
separados: o web lê `public/plataforma.css`; o Remotion lê um `tokens.json` exportado do mesmo lugar
(proposto no Frontend Design Harness, em `Harness-Architecture`).
