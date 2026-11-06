# 01 — Diagnóstico do Guia atual (Fase 1)

Levantamento feito em 04/11/2026 no branch `claude/magical-edison-xe74he`, sem alterar código.

## Stack

| Camada | Como é hoje |
|---|---|
| Front-end | HTML/CSS/JS **sem framework e sem build**, em `public/`. Página principal `public/index.html` (~1.670 linhas, com os 15 módulos embutidos num `<script>`) + ~20 scripts `guia-*.js` carregados com `defer` |
| Design system | `public/brand-system.css` (tokens da logo: azul `#3478A7`, céu `#6FA8CF`, lima `#D5DD26`; tipografia Plus Jakarta Sans + Inter; escala de espaço de 4 px) e `public/brand-motion.js` |
| API | **Uma única Vercel Function** (`api/index.js`) que despacha `/api/*` para `lib/rotas/*.js` (limite de funções do plano Hobby) |
| Banco | PostgreSQL (Neon em produção, `postgres:16-alpine` no Docker). Migrations em `db/migrations/001…012`, aplicadas por `scripts/migrar.mjs` com advisory lock |
| Sessão | Cookie `ff_sessao` assinado com HMAC (`lib/token.js`), payload `{ sub, papel, v, exp }`, 12 h. `exigirUsuario()` recarrega o usuário do banco a cada chamada |
| Perfis | `lib/permissoes.js`: **admin** (ver, exportar, editar, gerenciar_usuarios), **consultor** (ver, exportar, editar), **estagiário** (ver, exportar) |
| Proteção de páginas | `middleware.js` (Vercel Routing Middleware): tudo exige login, exceto login e assets públicos. **Não há controle por conteúdo** — qualquer logado abre qualquer arquivo de `public/` |
| Segurança extra | CSP estrita em `vercel.json` (`script-src 'self' 'unsafe-inline'`, sem CDN de script), rate limit por IP (`lib/limite.js`, migration 012), CSRF por origem (`verificarOrigem`) |
| Local | `docker-compose.yml` (projeto `faktory-manual`): `db` (volume `faktory-manual-banco`), `app` (node:22, porta **8081→3000**, roda migrations + `scripts/dev-server.mjs`), perfil `pdf` (nginx + Gotenberg) para gerar o PDF da apostila |

## Abas e funcionalidades atuais (`public/guia-abas.js`)

| Aba | Arquivo | Observação |
|---|---|---|
| Guia do Consultor | `index.html` | Seções: Visão Geral, A Implantação, Método Faktory, Todos os Módulos (cards + modal), Biblioteca de Processos, Diagnóstico de Problemas, Conclusão |
| Pacotes e Horas | `guia-pacotes*.js`, `guia-horas*` | 8 pacotes, horas por módulo/fluxo/faixa, exportação PDF/Excel, editor |
| Checklist | `guia-checklists.js` + `public/checklists/` | Manifesto com 3 grupos: 15 checklists de implantação do consultor, 3 fluxos principais do estagiário, 16 da trilha do estagiário. Progresso por usuário (`checklist_progresso`) com anexos de imagem |
| Vídeos de fluxo | `guia-videos.js` + `public/videos/manifest.json` | **15 vídeos prontos** (≈ 3 min cada, MP4 + JPG + VTT, 352 MB) em 3 trilhas |
| Apostila | `public/apostila.html` (iframe) + PDF em `public/downloads/` | Modo Estudo (grifos, notas), dúvidas por e-mail |
| Painel (admin) | `guia-admin*.js` | Progresso e problemas dos checklists de todos, exportação |
| Menu do avatar | `guia-sessao.js`, `guia-usuarios.js`, `guia-configuracoes.js`, `guia-duvidas.js` | Usuários, dúvidas recebidas, configurações, limpar dados |

Editor de módulos (`guia-editor.js`): consultores e admins editam os 15 módulos guardados em
`modulos.dados` (jsonb: objetivo, papel, quando, prerequisito, fluxo, treinamento, boasPraticas,
checklist), com status Rever/Aprovado/Reprovado e histórico.

## Rotas da API

`auth/eu`, `auth/login`, `auth/logout`, `configuracoes-estudo`, `checklists-admin`, `checklists-anexos`,
`checklists-download`, `checklists-progresso`, `duvidas`, `estudo`, `guia-textos`, `manutencao`,
`modulos`, `pacotes`, `processos`, `usuarios`.

## Motor de vídeo (`videos/`)

- Remotion **4.0.537** + React 19; composições `FluxoVideo.tsx` → `FluxoVideoV6.tsx` (v6 é o padrão, "sem engasgos").
- Scripts: `gravar-telas.mjs` (Playwright; URL padrão `https://dev.flow.faktory.com.br`), `narrar.mjs`
  (Voice Studio, voz L — `voz/referencia-voz-l.wav`, `voz*.json`), `frases.mjs`, `engasgos.mjs`, `quadros.mjs`,
  `preparar.mjs`, `render.mjs`, `remotion-em-partes.mjs`, `lote.mjs`, `qa.mjs` (pretos, imagem parada,
  engasgos, silêncio, volume −14 LUFS, pico), `conferir_narracao.py`.
- Música e efeitos **sintetizados** (`musica/gerar_musica.py`, `gerar_sfx*.py`, `public/sfx/*.wav`).
- 13 roteiros JSON em `videos/roteiros/` com cenas `abertura`, `status`, `regra` (título, texto, **fonte**),
  `tela` (captura, rótulo do menu, focos, nomes), `alertas`, `fechamento`.
- 90 cenas de tela com **capturas reais** em `videos/public/telas/<video>/` (23 MB).
- `MELHORIAS-PENDENTES.md` lista o que melhorar na próxima refação.

## Ferramentas disponíveis no ambiente de nuvem (testado)

| Ferramenta | Situação |
|---|---|
| Node 22, npm, Docker, psql, ffmpeg | Instalados |
| Chromium + Playwright | Pré-instalados (`require('playwright')`) |
| Python 3 + numpy | Sim; **sem** librosa, whisper, moviepy |
| `uv` | Sim (usado para o MCP `faktory-doc`) |
| Rede para `staging/dev/flow.faktory.com.br` | **Liberada** (HTTP 200) após ajuste do responsável |
| Login no Faktory Flow | **Não disponível** na nuvem (ver [09](09-pendencias-e-como-retomar.md)) |
| Voice Studio | Só no Mac do responsável |

## Problemas e riscos encontrados

1. **Sem controle de conteúdo por perfil/visibilidade**: o middleware só confere login. Arquivos de
   `public/videos`, `public/checklists` e o PDF da apostila abrem por URL direta para qualquer logado.
2. **Módulos duplicados** entre `index.html` (array `modulos`) e o banco (`002_modulos_iniciais.sql`);
   o editor substitui as funções do HTML quando a API responde.
3. **Página monolítica**: seções de metodologia, processos, diagnóstico e conclusão vivem na mesma página
   com navegação por rolagem — conflita com R-A91.
4. **Sem trilha de capacitação** com progresso por módulo; o progresso existe só por checklist.
5. **Vídeos só para consultor**: não há vídeo introdutório curto do Guia Inicial; os "fluxos do estagiário"
   reutilizam vídeos de ~3 min de Vendas, Faturamento e Financeiro.
6. Relatórios e Alumina (IA) não têm checklist, roteiro nem vídeo → devem aparecer como **"Em preparação"**.
