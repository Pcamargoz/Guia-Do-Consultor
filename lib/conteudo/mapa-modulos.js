/* Mapa de módulos da plataforma × fontes reais.
   Transcrição fiel da tabela de refatoracao-guia-do-consultor/05-mapa-de-modulos.md (17 módulos numerados,
   "Primeiros passos" na posição 0 e "Visão do fluxo completo"). Mudou o doc 05? Mude aqui e gere a base de novo.
   Sem conteúdo aqui: só ligações entre ids. Os textos vêm das fontes (Harness e dados do Guia). */

export const FONTE_MAPA = 'guia:refatoracao-guia-do-consultor/05-mapa-de-modulos.md';
export const FONTE_PLANO_VIDEOS = 'guia:refatoracao-guia-do-consultor/08-producao-videos-e-manuais.md';

/**
 * Campos:
 * - banco: id em `modulos` (seed db/migrations/002_modulos_iniciais.sql) ou null
 * - trilha: ids de CHECKLISTS (scripts/dados-checklists-estagiarios.mjs); 'onboarding' = ONBOARDING
 * - fluxoPrincipal: id em FLUXOS_PRINCIPAIS (scripts/dados-fluxos-estagiarios.mjs) ou null
 * - implantacao: id em CHECKLISTS_IMPLANTACAO (scripts/dados-checklists-implantacao.mjs) ou null
 * - videoInicial / videosConsultor: ids de public/videos/manifest.json
 * - harness: valores de `modulos:` no frontmatter do Harness que pertencem a este módulo
 */
export const MAPA_MODULOS = [
  { ordem: 0, id: 'primeiros-passos', titulo: 'Primeiros passos', banco: null, trilha: ['onboarding', 'navegacao'], fluxoPrincipal: null, implantacao: null, videoInicial: null, videosConsultor: [], harness: ['inicio'] },
  { ordem: 1, id: 'fundacao', titulo: 'Cadastros e Fundação', banco: null, trilha: ['cadastros'], fluxoPrincipal: null, implantacao: 'implantacao-fundacao', videoInicial: null, videosConsultor: [], harness: ['cadastros'] },
  { ordem: 2, id: 'crm', titulo: 'CRM', banco: 'crm', trilha: ['crm'], fluxoPrincipal: null, implantacao: 'implantacao-crm', videoInicial: null, videosConsultor: ['consultor-03-comercial'], harness: ['crm'] },
  { ordem: 3, id: 'cem', titulo: 'Integração CEM', banco: null, trilha: [], fluxoPrincipal: null, implantacao: 'implantacao-integracao-cem', videoInicial: null, videosConsultor: [], harness: [] },
  { ordem: 4, id: 'vendas', titulo: 'Vendas', banco: 'vendas', trilha: ['vendas'], fluxoPrincipal: 'fluxo-vendas', implantacao: 'implantacao-vendas', videoInicial: 'fluxo-1-vendas', videosConsultor: ['consultor-03-comercial'], harness: ['vendas'] },
  { ordem: 5, id: 'compras', titulo: 'Compras', banco: 'compras', trilha: ['compras'], fluxoPrincipal: null, implantacao: 'implantacao-compras', videoInicial: null, videosConsultor: ['consultor-01-suprimentos'], harness: ['compras'] },
  { ordem: 6, id: 'recebimento', titulo: 'Recebimento', banco: 'recebimento', trilha: ['recebimento'], fluxoPrincipal: null, implantacao: 'implantacao-recebimento', videoInicial: null, videosConsultor: ['consultor-01-suprimentos'], harness: ['recebimento'] },
  { ordem: 7, id: 'estoque', titulo: 'Estoque', banco: 'estoque', trilha: ['estoque'], fluxoPrincipal: null, implantacao: 'implantacao-estoque', videoInicial: null, videosConsultor: ['consultor-04-estoque'], harness: ['estoque'] },
  { ordem: 8, id: 'producao', titulo: 'Produção', banco: 'producao', trilha: ['producao'], fluxoPrincipal: null, implantacao: 'implantacao-producao', videoInicial: null, videosConsultor: ['consultor-05-producao'], harness: ['producao'] },
  { ordem: 9, id: 'servicos', titulo: 'Serviços e Instalação', banco: 'servicos', trilha: ['servicos'], fluxoPrincipal: null, implantacao: 'implantacao-servicos', videoInicial: null, videosConsultor: ['consultor-02-servicos'], harness: ['servicos'] },
  { ordem: 10, id: 'projetos', titulo: 'Projetos e Obras', banco: 'projetos', trilha: ['projetos'], fluxoPrincipal: null, implantacao: 'implantacao-projetos', videoInicial: null, videosConsultor: ['consultor-09-projetos'], harness: ['projetos'] },
  { ordem: 11, id: 'expedicao', titulo: 'Expedição', banco: 'expedicao', trilha: ['expedicao'], fluxoPrincipal: null, implantacao: 'implantacao-expedicao', videoInicial: null, videosConsultor: ['consultor-06-expedicao'], harness: ['expedicao'] },
  { ordem: 12, id: 'faturamento', titulo: 'Faturamento', banco: 'faturamento', trilha: ['faturamento'], fluxoPrincipal: 'fluxo-faturamento-estagiario', implantacao: 'implantacao-faturamento', videoInicial: 'consultor-07-faturamento', videosConsultor: ['consultor-07-faturamento', 'compra-em-nome-do-cliente'], harness: ['faturamento'] },
  { ordem: 13, id: 'fiscal', titulo: 'Fiscal', banco: 'fiscal', trilha: ['faturamento'], fluxoPrincipal: null, implantacao: 'implantacao-fiscal', videoInicial: null, videosConsultor: [], harness: ['fiscal'] },
  { ordem: 14, id: 'financeiro', titulo: 'Financeiro', banco: 'financeiro', trilha: ['financeiro'], fluxoPrincipal: 'fluxo-financeiro-estagiario', implantacao: 'implantacao-financeiro', videoInicial: 'consultor-08-financeiro', videosConsultor: ['consultor-08-financeiro'], harness: ['financeiro'] },
  { ordem: 15, id: 'tarefas', titulo: 'Tarefas', banco: 'tarefas', trilha: ['tarefas'], fluxoPrincipal: null, implantacao: 'implantacao-tarefas', videoInicial: null, videosConsultor: ['consultor-10-tarefas'], harness: ['tarefas'] },
  { ordem: 16, id: 'relatorios', titulo: 'Relatórios e Análises', banco: 'relatorios', trilha: [], fluxoPrincipal: null, implantacao: null, videoInicial: null, videosConsultor: [], harness: [] },
  { ordem: 17, id: 'alumina', titulo: 'Alumina — IA', banco: 'alumina', trilha: [], fluxoPrincipal: null, implantacao: null, videoInicial: null, videosConsultor: [], harness: [] },
  { ordem: 18, id: 'fluxo-completo', titulo: 'Visão do fluxo completo', banco: null, trilha: ['fluxo'], fluxoPrincipal: null, implantacao: null, videoInicial: null, videosConsultor: ['consultor-fluxo-completo'], harness: [] },
];

export const IDS_MODULOS = MAPA_MODULOS.map((m) => m.id);

/** Seções de cada jornada, na ordem do doc 05 (Guia Inicial = R-A21; Guia do Consultor = R-A31). */
export const SECOES = {
  inicial: [
    ['apresentacao', 'Apresentação'],
    ['video', 'Vídeo introdutório'],
    ['manual', 'Manual visual resumido'],
    ['telas', 'Principais telas'],
    ['fluxo', 'Fluxo operacional básico'],
    ['atividade', 'Atividade prática'],
    ['checklist', 'Checklist de aprendizado'],
    ['progresso', 'Progresso'],
  ],
  consultor: [
    ['visao', 'Visão funcional'],
    ['regras', 'Regras de negócio'],
    ['fluxos', 'Fluxos operacionais'],
    ['implantacao', 'Procedimentos de implantação'],
    ['configuracoes', 'Configurações importantes'],
    ['validacoes', 'Validações funcionais'],
    ['integracoes', 'Integrações e dependências'],
    ['problemas', 'Problemas recorrentes'],
    ['videos', 'Vídeos avançados'],
    ['complementares', 'Materiais complementares'],
  ],
};
