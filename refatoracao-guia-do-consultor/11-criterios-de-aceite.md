# 11 — Critérios de aceite

A refatoração só está concluída quando todos os itens estiverem marcados, cada um com evidência
(teste, print ou log) registrada em `descobertas/qa-devops.md`.

- [ ] A página principal se chama **"Página Inicial"**.
- [ ] **Todos os módulos** identificados (ver [05](05-mapa-de-modulos.md)) aparecem como cards.
- [ ] Existem as jornadas **Guia Inicial** e **Guia do Consultor**.
- [ ] Materiais organizados por **módulo** e **nível**, com metadados (módulo, tipo, público, nível, versão, data, status, responsável, relações).
- [ ] Controles administrativos de visibilidade funcionam e **persistem no banco**.
- [ ] Conteúdo oculto **não abre por URL direta nem pela API** para quem não tem permissão.
- [ ] A **apostila antiga** está preservada e **em standby**; reativar não perde dados.
- [ ] Checklists e vídeos de fluxo continuam disponíveis conforme as permissões.
- [ ] Documentos com **capturas reais e fiéis** ao sistema (versão registrada).
- [ ] Vídeos concluídos com **narração (voz L), edição, legendas e projeto reutilizável**, aprovados no `qa.mjs`.
- [ ] Animações funcionais, com **`prefers-reduced-motion`** respeitado.
- [ ] Aplicação **responsiva** (1440 / 768 / 390 px testados no navegador).
- [ ] Antigas seções (metodologia, processos, implantação, conclusão) **fora da navegação principal**, com o conteúdo incorporado e os originais no Acervo.
- [ ] Módulos sem material mostram **"Em preparação"**, nunca conteúdo inventado.
- [ ] Sem regressões críticas (testes automáticos existentes e novos passando).
- [ ] Serviços no **Docker local** funcionando (front, API, banco), volumes preservados.
- [ ] Relatório final entregue e projeto **pronto para homologação**.
