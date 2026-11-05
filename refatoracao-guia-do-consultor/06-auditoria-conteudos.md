# 06 — Auditoria dos conteúdos antigos (R-A90 a R-A92)

Classificação: **Relevante** (continua como está) · **Reaproveitar** (entra na nova estrutura, adaptado) ·
**Reescrever** · **Desatualizado** · **Duplicado** · **Arquivar** (vai para o Acervo, preservado).

## Página do Guia (`public/index.html`)

| Conteúdo | Classificação | Destino |
|---|---|---|
| Visão Geral (busca + 4 métricas fixas "15 módulos", "7 etapas", "5 para revisão", "100%") | **Desatualizado** (números fixos no HTML) | Substituído pela Página Inicial com contagens reais vindas de `/api/conteudo` |
| A Implantação (o que é implantar, papel do consultor, responsabilidades, condução) | **Reaproveitar** | Guia do Consultor › Fundamentos da implantação |
| Método Faktory (mapa das etapas) | **Reaproveitar** + confrontar com `conhecimento/implantacao/` (metodologia, confiança B) | Fundamentos + seção 4 de cada módulo |
| Todos os Módulos (cards + modal com objetivo, papel, quando, fluxo, treinamento, boas práticas, checklist) | **Reaproveitar** (o conteúdo vive no banco e no editor) | Página Inicial (cards) e Guia do Consultor (seções 1, 3, 4, 6) |
| Array `modulos` embutido no HTML | **Duplicado** do banco (`002_modulos_iniciais.sql`) | Fica só no Acervo como fallback do editor |
| Biblioteca de Processos (`guia-processos*.js`, tabela `processos`) | **Reaproveitar** | Fundamentos › Processos; cada processo ligado aos módulos |
| Diagnóstico de Problemas | **Reaproveitar** | Fundamentos + seção 8 (problemas recorrentes) dos módulos |
| Conclusão | **Arquivar** | Acervo |
| Navegação por rolagem dessas seções na barra lateral | **Remover da navegação principal** (R-A91) | Acervo mantém a navegação interna |

## Abas e materiais

| Material | Classificação | Destino |
|---|---|---|
| Pacotes e Horas | **Relevante** | Ferramentas › Pacotes e Horas (com controle `area:pacotes`) |
| 15 checklists de implantação do consultor | **Relevante** (refeitos em 29/10/2026 a partir das regras da gestora) | Guia do Consultor (seções 4–6) e aba Checklists |
| 16 checklists da trilha do estagiário | **Relevante** (conferidos na tela em 16/10/2026, v1.22.11) — **revalidar** na versão atual (≥ 1.22.13) | Guia Inicial (seções 3, 6, 7) e aba Checklists |
| 3 fluxos principais do estagiário | **Relevante** | Guia Inicial de Vendas, Faturamento e Financeiro |
| 15 vídeos de fluxo (motor v6) | **Relevante** para o consultor; **não servem** como vídeo introdutório curto do Guia Inicial (≈ 3 min, regras de consultor) | Guia do Consultor (seção 9) e aba Vídeos; `MELHORIAS-PENDENTES.md` vale para a próxima refação |
| Apostila do Consultor (HTML, PDF, Modo Estudo, dúvidas) | **Arquivar em standby** (R-A81) — dados preservados | Ferramentas › Apostila, oculta por padrão |
| Fluxos do consultor antigos | Já **arquivados** (tag git `checklists-consultor-v1`) | Sem ação |
| `public/checklists/validacao-*.html` citados nas fontes | Verificar se ainda existem | — |

## Lacunas (conteúdo que precisa ser produzido)

1. Vídeos introdutórios curtos do Guia Inicial — **todos os módulos** (vendas/faturamento/financeiro têm
   apenas o vídeo de ~3 min).
2. Integração CEM, Fiscal, Relatórios, Alumina: sem vídeo; Relatórios e Alumina sem checklist nem trilha.
3. Manuais visuais resumidos (Guia Inicial) e manuais completos (Consultor) em formato editorial com PDF.
4. Revalidação na tela dos passos `d`/`n` da trilha e dos itens `naoValidado` dos checklists de implantação.
5. Alumina marcada "para revisão completa" no banco.

## Preservação

- Nada é apagado. O guia antigo continua inteiro em `#acervo` e no git.
- O conteúdo editado no banco (módulos, processos, textos) segue sendo a fonte das seções equivalentes.
