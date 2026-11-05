# 05 — Mapa de módulos × fontes reais

Cada módulo da plataforma e de onde vem o seu conteúdo. "—" significa **sem fonte hoje**: a seção
correspondente aparece como **"Em preparação"**.

| # trilha | Módulo (id) | Banco `modulos` | Trilha do estagiário (Guia Inicial) | Checklist de implantação (Consultor) | Vídeo inicial | Vídeo(s) do consultor | Regras em roteiro |
|---|---|---|---|---|---|---|---|
| 0 | Primeiros passos (`primeiros-passos`) | — | `00-onboarding`, `01-primeiros-passos-navegacao` | — | — | — | — |
| 1 | Cadastros e Fundação (`fundacao`) | — | `02-cadastros-basicos` | `implantacao-01-fundacao` | — | — | — |
| 2 | CRM (`crm`) | `crm` | `03-crm-leads-oportunidades` | `implantacao-02-crm` | — | `consultor-03-comercial` | sim |
| 3 | Integração CEM (`cem`) | — | — | `implantacao-03-integracao-cem` | — | — | — |
| 4 | Vendas (`vendas`) | `vendas` | `04-vendas-pedidos` + fluxo principal Vendas | `implantacao-04-vendas` | `fluxo-1-vendas` ✅ | `consultor-03-comercial` | sim |
| 5 | Compras (`compras`) | `compras` | `05-compras` | `implantacao-08-compras` | — | `consultor-01-suprimentos` | sim |
| 6 | Recebimento (`recebimento`) | `recebimento` | `06-recebimento` | `implantacao-09-recebimento` | — | `consultor-01-suprimentos` | sim |
| 7 | Estoque (`estoque`) | `estoque` | `07-estoque` | `implantacao-10-estoque` | — | `consultor-04-estoque` | sim |
| 8 | Produção (`producao`) | `producao` | `08-producao` | `implantacao-11-producao` | — | `consultor-05-producao` | sim |
| 9 | Serviços e Instalação (`servicos`) | `servicos` | `09-servicos-campo` | `implantacao-12-servicos` | — | `consultor-02-servicos` | sim |
| 10 | Projetos e Obras (`projetos`) | `projetos` | `10-projetos-obras` | `implantacao-14-projetos` | — | `consultor-09-projetos` | sim |
| 11 | Expedição (`expedicao`) | `expedicao` | `11-expedicao` | `implantacao-13-expedicao` | — | `consultor-06-expedicao` | sim |
| 12 | Faturamento (`faturamento`) | `faturamento` | `12-faturamento-fiscal` + fluxo principal Faturamento | `implantacao-05-faturamento` | `consultor-07-faturamento` ✅ | `consultor-07-faturamento`, `compra-em-nome-do-cliente` | sim |
| 13 | Fiscal (`fiscal`) | `fiscal` | `12-faturamento-fiscal` (parte fiscal) | `implantacao-06-fiscal` | — | — | — |
| 14 | Financeiro (`financeiro`) | `financeiro` | `13-financeiro` + fluxo principal Financeiro | `implantacao-07-financeiro` | `consultor-08-financeiro` ✅ | `consultor-08-financeiro` | sim |
| 15 | Tarefas (`tarefas`) | `tarefas` | `14-tarefas` | `implantacao-15-tarefas` | — | `consultor-10-tarefas` | sim |
| 16 | Relatórios e Análises (`relatorios`) | `relatorios` | — | — | — | — | — |
| 17 | Alumina — IA (`alumina`) | `alumina` (marcado para revisão) | — | — | — | — | — |
| — | Visão do fluxo completo (`fluxo-completo`) | — | `15-visao-fluxo-completo` | — | — | `consultor-fluxo-completo` | — |

## Como cada seção é preenchida

### Guia Inicial (R-A21)

| Seção | Fonte |
|---|---|
| 1. Apresentação simplificada | `subtitulo` e `objetivo` da trilha do estagiário; "como se conecta" a partir de `conexoes` |
| 2. Vídeo introdutório | Vídeo inicial da tabela; senão **Em preparação** (roteiro a produzir — ver [08](08-producao-videos-e-manuais.md)) |
| 3. Manual visual resumido | Blocos da trilha (`titulo`, `onde` = caminho do menu, passos marcados `v`) + capturas; exportável em PDF |
| 4. Principais telas | Cenas `tela` dos roteiros (captura real + rótulo do menu + legenda falada) |
| 5. Fluxo operacional básico | `fluxo` do módulo no banco, como diagrama animado |
| 6. Atividade prática | Bloco `preparar: true` da trilha ("Preparar seus dados…") + link do checklist |
| 7. Checklist de aprendizado | Gerado: entendi o módulo · sei acessar (cada `onde`) · executei cada bloco · assisti ao vídeo · concluí o checklist prático |
| 8. Progresso | `checklist_progresso` chave `inicial:<modulo>` |

### Guia do Consultor (R-A31)

| Seção | Fonte |
|---|---|
| 1. Visão funcional | Banco: `objetivo`, `papel`, `quando` |
| 2. Regras de negócio | Cartões `regra` dos roteiros (título, texto, **fonte**) + passos "Explique ao cliente" do checklist de implantação, com a fonte citada |
| 3. Fluxos operacionais | Banco `fluxo` + blocos do checklist de implantação (título, `onde`, `intro`) |
| 4. Procedimentos de implantação | Checklist de implantação (objetivo, nº de passos por bloco, link) + banco `treinamento` + Método Faktory (acervo) |
| 5. Configurações importantes | `prerequisitos` do checklist de implantação (Confira/Fonte) + banco `prerequisito` |
| 6. Validações funcionais | `resultado` do checklist de implantação + banco `checklist` |
| 7. Integrações e dependências | `conexoes` + banco `papel` |
| 8. Problemas recorrentes | `atencao` + cartões `alertas` dos roteiros + `naoValidado` marcado **"a conferir na tela"** |
| 9. Vídeos avançados | Vídeos do consultor da tabela |
| 10. Materiais complementares | Checklist HTML, trilha do estagiário relacionada, apostila (se ativa), fontes do Harness citadas |
