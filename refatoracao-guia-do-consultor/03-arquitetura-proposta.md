# 03 — Arquitetura proposta (Fase 2)

## Princípios

1. **Evoluir, não substituir sem motivo.** O Guia continua HTML/CSS/JS sem build, uma Vercel Function e
   PostgreSQL. Isso mantém deploy no plano Hobby, a CSP estrita e o Docker atual. Não migrar para
   React/Next agora (ver decisão em [07](07-design-e-motion.md#decisão-de-bibliotecas)).
2. **Uma base, duas jornadas** (R-A70): o conhecimento é gerado uma vez a partir das fontes do Harness e
   apresentado de dois jeitos.
3. **Nada inventado** (R-A63, regras do Harness): campo sem fonte → seção "Em preparação".
4. **Segurança no servidor** (R-A83): visibilidade aplicada no middleware e na API, não só escondendo botões.
5. **Preservar** (R-A92): o guia antigo vira **Acervo**, intacto, acessível por perfil.

## Navegação

```
┌───────────────────────────────────────────────────────────────────────────┐
│  Página Inicial  │  Guia Inicial  │  Guia do Consultor  │ Ferramentas ▾ │ 👤 │
└───────────────────────────────────────────────────────────────────────────┘
 Ferramentas: Pacotes e Horas · Checklists · Vídeos de fluxo · Apostila (standby) · Acervo · Painel (admin)
```

| Rota (hash) | Área | Conteúdo |
|---|---|---|
| `#inicio` (padrão) | **Página Inicial** | Hero + grade de cards de todos os módulos; hover revela os materiais por jornada |
| `#inicial` | **Guia Inicial** | Trilha ordenada (Primeiros passos → Cadastros → CRM → Vendas → … → Visão do fluxo completo) com progresso |
| `#inicial/<modulo>` | Módulo no Guia Inicial | As 8 seções de R-A21 |
| `#consultor` | **Guia do Consultor** | Fundamentos da implantação + índice dos módulos com busca |
| `#consultor/<modulo>` | Módulo no Guia do Consultor | As 10 seções de R-A31, com sumário lateral fixo |
| `#consultor/fundamentos` | Fundamentos | Método Faktory, etapas da implantação, diagnóstico de problemas, biblioteca de processos (vindos do acervo) |
| `#pacotes`, `#checklist`, `#videos`, `#apostila`, `#admin` | Ferramentas | Abas atuais preservadas |
| `#acervo` | Acervo | O guia antigo completo, sem alterações, para rastreabilidade |

Transição entre áreas com **View Transitions API** (`document.startViewTransition`) e fallback sem
animação; o card clicado "voa" para o cabeçalho do módulo (`view-transition-name` compartilhado).

## Base de conhecimento compartilhada

### Fluxo de geração

```
Harness-Arquitetura-Flow ──(workflows do Harness)──► scripts/dados-checklists-*.mjs
                                                    videos/roteiros/*.json
                                                    videos/public/telas/*.png
                                                    public/checklists/manifest.json
                                                    public/videos/manifest.json
                                                           │
                                     scripts/gerar-base-conhecimento.mjs
                                                           │
                                                           ▼
                                      lib/conteudo/base-conhecimento.js   (gerado, versionado)
                                                           │
                                  /api/conteudo  ← filtra por perfil e visibilidade
                                                           │
                         ┌─────────────────────────────────┴───────────────────────┐
                    Guia Inicial (apresentação didática)          Guia do Consultor (apresentação técnica)
```

- O gerador **não copia texto à mão**: lê as fontes acima e monta, por módulo, os blocos de cada jornada.
- O conteúdo editável dos módulos no banco (`modulos.dados`, editor atual) continua valendo: o Guia do
  Consultor lê `objetivo`, `papel`, `quando`, `fluxo`, `treinamento`, `boasPraticas` de `/api/modulos`.
- As capturas são servidas de `public/telas/<video>/<captura>.png` (cópia idêntica de `videos/public/telas`;
  o git deduplica blobs iguais, então não pesa no repositório).

### Modelo de dados (R-A71)

```jsonc
// Módulo
{
  "id": "vendas",                     // id da plataforma (= id do banco quando existir)
  "nome": "Vendas", "area": "Comercial", "cor": "#1976D2", "icone": "vendas",
  "ordemTrilha": 4, "resumo": "…",
  "conexoes": ["crm", "faturamento", "financeiro", "producao", "expedicao"],
  "inicial":   { /* apresentação, comoAcessar[], operacoes[], atividade, telas[], atencao[], aprendizado[] */ },
  "consultor": { /* visao, regras[], fluxos[], implantacao, configuracoes[], validacoes[], integracoes[], problemas[] */ },
  "materiais": ["vendas:video-inicial", "vendas:manual-inicial", "vendas:checklist-implantacao", …]
}

// Material
{
  "id": "vendas:checklist-implantacao",
  "modulo": "vendas",
  "tipo": "video | manual | checklist | fluxo | telas | regra | apostila",
  "jornada": "inicial | consultor | ambas",
  "nivel": "basico | intermediario | avancado",
  "titulo": "…", "resumo": "…",
  "url": "/checklists/consultores/implantacao-04-vendas.html",
  "status": "publicado | em-preparacao | revisao | arquivado",
  "versao": "1.22.13", "atualizadoEm": "2026-10-29",
  "responsavel": "Gestora de produto / Harness",
  "fontes": ["regra-vendas-cfop-depende-de-empresa-e-cliente"],
  "evidencia": "confirmado_na_tela | documento | nao_conferido",
  "relacionados": ["vendas:video-consultor", "faturamento:checklist-implantacao"]
}
```

`status = em-preparacao` é exibido como estado claro na interface (critério de aceite).

## API nova

| Rota | Método | Quem | O quê |
|---|---|---|---|
| `/api/conteudo` | GET | logado | Resumo dos módulos e materiais **já filtrados** por perfil e visibilidade (alimenta Página Inicial e índices) |
| `/api/conteudo?modulo=<id>&jornada=inicial\|consultor` | GET | logado | Detalhe do módulo na jornada; 403 se a jornada/módulo estiver oculto para o perfil |
| `/api/visibilidade` | GET | logado | Mapa efetivo de visibilidade do usuário (para esconder abas) |
| `/api/visibilidade?todos=1` | GET | admin | Lista completa com metadados (quem alterou, quando) |
| `/api/visibilidade` | PUT | admin | `{ chave, visivel, perfis[] }` — grava e registra histórico |

Progresso do Guia Inicial reutiliza `/api/checklists-progresso` com chave `inicial:<modulo>`
(`dados.marcados` = itens do checklist de aprendizado), o que já aparece no Painel do administrador.

## Migrações novas

- `013_visibilidade.sql` — tabela `visibilidade` + histórico + valores iniciais (ver [04](04-visibilidade-e-permissoes.md)).
- Nenhuma migration apaga ou altera dados existentes. A apostila não é removida: só ganha `visivel = false`.

## Arquivos previstos (dono entre parênteses — ver [10](10-fases-agentes-coordenacao.md))

| Arquivo | Dono |
|---|---|
| `db/migrations/013_visibilidade.sql`, `lib/visibilidade.js`, `lib/rotas/visibilidade.js`, `lib/rotas/conteudo.js`, `api/index.js`, `middleware.js` | Arquitetura |
| `scripts/gerar-base-conhecimento.mjs`, `lib/conteudo/base-conhecimento.js` | Especialista funcional |
| `public/plataforma.css`, `public/plataforma-*.js`, `public/guia-abas.js`, `public/index.html` (só sidebar e `<head>`) | UI/UX |
| `public/manuais/**`, `docs/manuais/**` | Documentação |
| `videos/roteiros/inicial-*.json`, `videos/**` | Audiovisual |
| `scripts/testar-*.mjs`, `docker-compose.yml`, `README.md` | QA/DevOps |
