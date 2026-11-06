# 00 — Requisitos consolidados

O responsável (Pedro) enviou três prompts-mestre em 04/11/2026. Este documento os organiza em
requisitos numerados, sem perder nenhuma exigência. Os códigos (`R-…`) são usados nos outros documentos
e nos critérios de aceite.

---

## A. Prompt 1 — Reestruturação total da plataforma de conhecimento

### A.1 Diretriz principal
- **R-A01** Não é um redesign do Guia: é transformar a aplicação inteira em plataforma de **treinamento,
  capacitação, documentação e consulta operacional** do Faktory Flow.
- **R-A02** Dois públicos: (1) colaboradores novos, estagiários e iniciantes no ERP; (2) consultores que
  precisam de profundidade em processos, regras de negócio, implantação e validações.
- **R-A03** As duas jornadas **compartilham a mesma base de conhecimento**, com profundidades diferentes.
- **R-A04** Aproveitar arquitetura existente, Harness, skills, repositórios, documentos, regras, MCP e
  motores audiovisuais. Arquitetura escalável, excelente UX, materiais de qualidade profissional.

### A.2 Navegação — três áreas
- **R-A10 Página Inicial.** A atual "Guia do Consultor" passa a se chamar **Página Inicial**: porta de
  entrada, apresentação moderna de todos os módulos em **cards interativos**.
- **R-A11** Cada card: identidade visual própria, ícone, nome oficial, descrição resumida, animação de
  entrada, hover, **prévia dos materiais**, acesso às **duas jornadas**.
- **R-A12** No hover, experiência animada mostrando as opções de aprendizado (ex.: Vendas → vídeo
  introdutório, manual resumido, checklist, conteúdo avançado), cada uma direcionada à jornada certa.
- **R-A13** A Página Inicial **não** é biblioteca de documentos: é descoberta e navegação visual.
- **R-A20 Guia Inicial — Trilha de Capacitação.** Para novos colaboradores: compreender o ERP aos poucos,
  conhecer módulos e operações fundamentais. Didático, visual, prático e progressivo.
- **R-A21** Cada módulo do Guia Inicial: (1) apresentação simplificada; (2) vídeo introdutório com motion;
  (3) manual visual resumido; (4) demonstração das principais telas; (5) fluxo operacional básico;
  (6) exercícios práticos quando aplicável; (7) checklist de aprendizado; (8) indicador de progresso e conclusão.
- **R-A22** Não presumir conhecimento prévio; linguagem simples, exemplos reais, demonstrações práticas.
  Responder: o que é o módulo, para que serve, como acessar, principais telas, operações básicas,
  conexão com os outros módulos. Sem todas as regras/configurações avançadas.
- **R-A23** Exemplo Vendas: assistir vídeo → consultar manual resumido → executar atividade orientada →
  concluir checklist. Padrão adaptado a cada módulo.
- **R-A30 Guia do Consultor — Central avançada.** Reconstruída praticamente do zero, reaproveitando só o
  que for útil e alinhado.
- **R-A31** Cada módulo: (1) visão funcional; (2) regras de negócio reais (código, Harness, materiais da
  equipe); (3) fluxos operacionais; (4) procedimentos de implantação; (5) configurações importantes;
  (6) validações funcionais (checklists); (7) integrações e dependências; (8) problemas recorrentes;
  (9) vídeos avançados; (10) materiais complementares.
- **R-A32 Princípio:** o Guia Inicial ensina a **conhecer e usar**; o Guia do Consultor ensina a
  **compreender, implantar, configurar, orientar e validar** junto ao cliente. Não repetir os mesmos
  documentos nas duas áreas.

### A.3 Design
- **R-A40** Projeto completo de UI/UX; nada de interface administrativa genérica. Referências:
  plataformas educacionais premium, dashboards tecnológicos, motion avançado.
- **R-A41** Base na identidade Faktory Flow; explorar gradientes e iluminação, cards modernos,
  transições fluidas, tipografia expressiva, microinterações, profundidade, animações por scroll,
  feedback visual, ilustrações tecnológicas, skeleton loading, transições entre páginas.
- **R-A42** Avaliar Framer Motion/Motion, GSAP, ScrollTrigger, Lenis, Lottie, Rive, Three.js (só se
  agregar), Remotion e skills do Harness — **sem instalar tudo**; escolher por desempenho, manutenção e
  compatibilidade.
- **R-A43** Cards: elevação no hover, bordas/iluminação animadas, transição ícone↔conteúdo, expansão para
  materiais, prévia animada, transição cinematográfica para a página interna.
- **R-A44** Mobile e `prefers-reduced-motion` obrigatórios.

### A.4 Vídeos
- **R-A50** Reconstruir os materiais audiovisuais com o motor do Harness, suas skills e repositórios;
  avaliar o **Voice Studio** da máquina do responsável.
- **R-A51** Gravar telas reais numa sessão autenticada do Faktory Flow fornecida pelo responsável.
- **R-A52 Guia Inicial:** curtos, didáticos, essenciais, narrados em pt-BR, gravações reais, motion, sequência
  lógica; zoom dinâmico, destaque de botões, cursor animado, setas, textos, cortes precisos, transições,
  narração sincronizada. **Nunca tela parada enquanto a narração continua.**
- **R-A53 Guia do Consultor:** processos completos — configurações, implantação, relação entre módulos,
  validações, regras, procedimentos, situações reais; podem ser mais longos.
- **R-A54** Padrão de produção: estudar → objetivos → roteiro → cenas → captura → narração (Voice Studio)
  → montagem no motor → animações → sincronia → revisão → exportação → **preservar projeto editável**.
- **R-A55** Sem dados sensíveis de clientes. Se Voice Studio/motor indisponíveis: registrar o impedimento;
  alternativa só se preservar qualidade e editabilidade.

### A.5 Documentação (manuais)
- **R-A60** Identidade editorial profissional; nada de texto + imagem sem tratamento.
- **R-A61 Manuais iniciais:** poucas páginas, objetivos, acessíveis, fluxos simples, prints reais,
  etapas numeradas, destaques de ação, elementos gráficos consistentes.
- **R-A62 Manuais do consultor:** aprofundados, implantação, regras verificadas, fluxogramas, mapas de
  processo, prints contextualizados, quadros de atenção, checklists, relações entre funcionalidades.
- **R-A63** Prints **somente de telas reais** do Faktory Flow, fiéis à versão analisada; recortes, zoom,
  setas, numeração de campos, destaques, legendas, anotações.
- **R-A64** Visualização integrada na plataforma e **exportação em PDF** sempre que possível.

### A.6 Base de conhecimento compartilhada
- **R-A70** Mesma fonte, apresentações diferentes; reaproveitamento entre jornadas sem duplicar arquivos.
- **R-A71** Modelo com metadados: módulo, tipo de material, público-alvo, nível, versão, data de
  atualização, status de publicação, responsável, relacionamentos.
- **R-A72** Permitir expansão e atualização contínua.

### A.7 Administração de conteúdos
- **R-A80** Admin controla visibilidade de: Guia Inicial, Guia do Consultor, módulos específicos,
  apostilas, manuais, vídeos, checklists, vídeos de fluxo, pacote de horas e demais funcionalidades.
- **R-A81** **Apostila antiga em standby:** ocultar e reativar sem perder dados.
- **R-A82** Persistência no banco; respeito às permissões da aplicação.
- **R-A83** Usuário sem autorização **não acessa** conteúdo restrito por URL direta nem pela API.

### A.8 Conteúdos antigos
- **R-A90** Revisar e classificar: relevantes, desatualizados, duplicados, reaproveitáveis, a reescrever, a arquivar.
- **R-A91** Metodologia, biblioteca de processos, implantação e conclusão **deixam de ser itens isolados da
  navegação**; o conhecimento útil vai para as jornadas e módulos.
- **R-A92** Preservar os originais para referência e rastreabilidade.

### A.9 Subagentes e fases
- **R-A100** Subagentes: Arquitetura; UI/UX; Especialista funcional; Documentação; Audiovisual; QA/DevOps.
- **R-A101** Descobertas compartilhadas em **arquivos estruturados no projeto**; Harness como fonte central;
  nada de edição simultânea do mesmo arquivo sem coordenação.
- **R-A102** Fases 1 a 7: Diagnóstico → Nova arquitetura → Redesign → Conteúdos didáticos → Conteúdos
  avançados → Testes e validação → Docker local (ver [10](10-fases-agentes-coordenacao.md)).
- **R-A103** Docker: analisar Dockerfiles/Compose, dependências, serviços, **preservar volumes**, migrações
  seguras, subir, ver logs, validar front/back/banco. **Nenhum comando destrutivo.** Informar endereços locais.
- **R-A104** Relatório final: funcionalidades, materiais, testes, limitações, instruções de validação no Docker.

---

## B. Prompt 2 — Agente de produção audiovisual, motion design e edição

- **R-B01** Papel: Senior Motion Designer, Video Editor, Creative Director, Audio Engineer, AI Video
  Production Engineer. Arquitetura **automatizada, modular e reutilizável**.
- **R-B02** Entradas aceitas: gravações de tela, vídeos brutos, narrações, áudio/música, imagens,
  documentos/roteiros/fluxogramas, screenshots, identidade visual, instruções em linguagem natural.
- **R-B10 Repositórios a estudar:** Remotion e **remotion-dev/skills (oficiais — preferir a elas)**;
  Motion Canvas; Manim; FFmpeg; MoviePy; Auto-Editor; PySceneDetect; gitethanwoo/video-editing;
  agamm/video-agent; real-simple-labs/agentic-video-editing; joshcirre/editing-videos;
  social-media-skills/video-editing-skill; Melvynx/video-agent-skills; clonn/awesome-agent-video-skills
  (catálogo); Blender; Lottie; GSAP; Three.js; Fabric.js; Whisper; faster-whisper; Demucs; librosa; Audacity.
- **R-B11** Classificar cada ferramenta por maturidade, licença, segurança, compatibilidade e benefício.
- **R-B20 Skills próprias** (`video-production-harness/skills/…`): creative-direction, video-editor,
  remotion-engine, motion-graphics, cinematic-transitions, screen-recording, audio-engineering, voice-sync,
  beat-sync, subtitle-engine, color-grading, typography-animation, visual-storytelling, ui-demonstration,
  tutorial-production, asset-management, video-rendering, video-quality-assurance. Cada uma com SKILL.md
  executável, objetivo, ferramentas, pré-requisitos, procedimento, exemplos, scripts, critérios de
  qualidade, erros, integração, referências. **Carregamento progressivo de contexto.**
- **R-B30 Padrão visual:** kinetic typography, text reveal, zoom suave, pan, parallax, morphing, máscaras,
  motion blur, profundidade, ícones animados, continuidade espacial, easing/spring; J/L-cuts, match cuts,
  speed ramp, zoom direcional, cortes na música, B-roll, split screen, overlays, destaques de UI —
  **sem excesso que prejudique a compreensão**.
- **R-B40 Vídeos de software/ERP:** 12 regras — gravações reais; nunca inventar telas; zoom legível;
  destacar botões/campos; animar o porquê; cursor visível; destaque sincronizado à fala; transição não
  esconde informação; gráficos para regras; identidade do produto; sem dados sensíveis; **nada de
  alteração em produção sem autorização**. "Ensinar, não só impressionar."
- **R-B50 Sincronização com narração:** NARRAÇÃO → ANÁLISE → TRANSCRIÇÃO+TIMESTAMPS → ASSUNTOS → CENAS →
  PLANEJAMENTO → ANIMAÇÕES/GRAVAÇÕES → SINCRONIZAÇÃO → RENDER → QA → FINAL. A voz dita a duração;
  **nunca acelerar explicação importante para caber numa transição**.
- **R-B60 Sincronização musical:** BPM, batidas, transientes, intensidade, destaques, silêncios, pontos de
  transição; sincronizar em momentos estratégicos; música nunca compete com a voz; só música licenciada
  ou fornecida.
- **R-B70 Processo:** Discovery → Creative Direction → Storyboard (objetivo, narração, início/fim, visuais,
  animações, transições, áudio) → Assets → Produção → Pós de áudio → Render → QA (sincronia, cenas,
  transições, legibilidade, pretos, integridade, duração, resolução, fps, som, fidelidade, correção).
- **R-B80 Presets:** 1920×1080, 16:9, 30/60 fps, MP4 H.264 + AAC, SRT; presets horizontal, vertical,
  demo de software e educacional; projetos editáveis preservados.
- **R-B90 Segurança:** conferir existência/README/SKILL.md/licença/dependências/scripts; nada de script
  remoto sem inspeção; preferir local e gratuito; não sobrescrever projetos; **não inventar resultados**.
- **R-B100 Entregáveis:** relatório de repositórios, matriz de ferramentas, skills instaladas, skills
  próprias, estrutura do harness, documentação, pipelines, templates, componentes, presets, checklist de QA
  e **exemplo funcional** de vídeo com comandos de reprodução.

---

## C. Prompt 3 — Agente de Frontend Design Engineering & UI/UX

- **R-C01** Mentalidade de Senior Frontend Engineer, Product Designer, UI/UX, Creative Developer, Motion
  Designer, Design System Architect, Accessibility e Performance Engineer.
- **R-C10 Skills a estudar:** anthropics/skills `frontend-design` (obrigatória para direção visual);
  nextlevelbuilder/ui-ux-pro-max-skill; vercel-labs/agent-skills (`web-design-guidelines`,
  `vercel-react-best-practices`, `vercel-composition-patterns`, Next.js); shadcn/ui (skill e CLI);
  finfin/awesome-frontend-skills (catálogo).
- **R-C11 Tecnologias:** Tailwind, Radix, React Aria, Lucide, Motion, GSAP, Three.js, R3F, Lenis, Lottie,
  Recharts, TanStack Table/Query, Zustand, Playwright, axe-core, Storybook — verificar licença,
  atualidade, API e compatibilidade **antes** de integrar.
- **R-C20 Estilos:** Minimalist Premium, Bento, Glassmorphism, Editorial, Swiss, Dark Premium, SaaS Modern,
  Neo-Brutalism, Futuristic, Interactive Storytelling — **escolher uma direção e manter consistência**.
- **R-C30 Motion:** page transitions, stagger, reveals por scroll, microinterações, layout transitions,
  hover, navegação animada, cards expansíveis, modais animados, skeleton, progresso, gráficos interativos,
  parallax controlado, SVG, transições de estado. Toda animação com propósito; `prefers-reduced-motion`;
  Motion para componentes, GSAP só com justificativa, Three.js só se precisar de 3D.
- **R-C40 ERP/SaaS:** dashboards, financeiro, CRM, kanban, projetos, implantação, treinamentos, tarefas,
  relatórios, admin, chamados, clientes; sidebars, filtros, tabelas ordenáveis, paginação, seleção múltipla,
  busca, kanban, calendário, timeline, modais, dashboards configuráveis, gráficos, status, feedback,
  confirmações, estados vazios, loading, erros.
- **R-C50 Estrutura** `frontend-design-harness/` com AGENTS.md, DESIGN.md, README.md e as skills
  frontend-design, ui-ux-pro-max, design-system, visual-direction, typography, color-theory,
  layout-composition, responsive-design, accessibility, react-best-practices, component-architecture,
  shadcn-ui, tailwind-design, motion-design, gsap-animation, threejs-experiences, dashboard-design,
  data-visualization, form-experience, frontend-performance, browser-testing, visual-qa; pastas
  design-tokens, components, patterns, templates, references, scripts, examples. Reutilizar skills
  existentes, sem duplicar; carregamento progressivo.
- **R-C60 Processo:** Discovery (framework, linguagem, pastas, libs, design system, componentes,
  convenções, público, objetivos, a11y) → Direção visual (documentada no DESIGN.md) → Protótipo
  (desktop/tablet/mobile; loading, erro, vazio, sucesso) → Implementação → Refinamento → **QA no navegador**
  (rodar, screenshots, interações, breakpoints, console, a11y, corrigir, repetir). **Não afirmar validação
  visual sem testar.**
- **R-C70 Instalação:** `npx skills add …` e `npx shadcn@latest add skills` como ponto de partida; ler
  scripts antes; não sobrescrever skills existentes.
- **R-C80 Integração com o audiovisual:** reutilizar tokens, tipografia, identidade, SVGs, animações,
  paletas, layouts, ícones e gráficos nos vídeos (Remotion/Motion Canvas), mantendo responsabilidades
  separadas e integração modular.
- **R-C90 Entregáveis:** relatório de skills, matriz de relevância/compatibilidade, skills instaladas,
  design system, biblioteca de componentes, templates, padrões de animação, guia de acessibilidade,
  estrutura de testes visuais e **demo funcional** (dashboard com navegação, cards, gráficos, filtros e
  transições, dados demonstrativos) + resultados de testes e limitações.

---

## D. Mensagens complementares do responsável (mesma conversa)

- **R-D01** No Mac do responsável, em `Downloads/flow`, existe a pasta com a arquitetura do Harness e todo
  o conteúdo do Faktory Flow, para produzir o conteúdo. (O mesmo Harness está no GitHub:
  `Pcamargoz/Harness-Arquitetura-Flow`.)
- **R-D02** Absorver todo o Harness do repositório e usá-lo como base da refatoração.
- **R-D03** Ambiente a acessar: **https://staging.flow.faktory.com.br** — para gerar os vídeos de todas as
  telas, focados no objetivo da plataforma.
- **R-D04** Domínios liberados na rede do ambiente (confirmado: staging, dev e produção respondem 200).
- **R-D05** Login: **não** compartilhar senha com o agente (regra do Harness — ver [09](09-pendencias-e-como-retomar.md)).
