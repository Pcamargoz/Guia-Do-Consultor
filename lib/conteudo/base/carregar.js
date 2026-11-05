/* GERADO por scripts/gerar-base-conhecimento.mjs — não edite à mão.
   import() estático de cada JSON: carga sob demanda e o rastreador de arquivos da Vercel inclui todos no deploy. */
export const carregarIndiceJson = () => import('./indice.json', { with: { type: 'json' } });

export const MODULOS = Object.freeze({
  'primeiros-passos': () => import('./primeiros-passos.json', { with: { type: 'json' } }),
  'fundacao': () => import('./fundacao.json', { with: { type: 'json' } }),
  'crm': () => import('./crm.json', { with: { type: 'json' } }),
  'cem': () => import('./cem.json', { with: { type: 'json' } }),
  'vendas': () => import('./vendas.json', { with: { type: 'json' } }),
  'compras': () => import('./compras.json', { with: { type: 'json' } }),
  'recebimento': () => import('./recebimento.json', { with: { type: 'json' } }),
  'estoque': () => import('./estoque.json', { with: { type: 'json' } }),
  'producao': () => import('./producao.json', { with: { type: 'json' } }),
  'servicos': () => import('./servicos.json', { with: { type: 'json' } }),
  'projetos': () => import('./projetos.json', { with: { type: 'json' } }),
  'expedicao': () => import('./expedicao.json', { with: { type: 'json' } }),
  'faturamento': () => import('./faturamento.json', { with: { type: 'json' } }),
  'fiscal': () => import('./fiscal.json', { with: { type: 'json' } }),
  'financeiro': () => import('./financeiro.json', { with: { type: 'json' } }),
  'tarefas': () => import('./tarefas.json', { with: { type: 'json' } }),
  'relatorios': () => import('./relatorios.json', { with: { type: 'json' } }),
  'alumina': () => import('./alumina.json', { with: { type: 'json' } }),
  'fluxo-completo': () => import('./fluxo-completo.json', { with: { type: 'json' } }),
});
