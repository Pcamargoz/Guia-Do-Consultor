/* DADOS FICTÍCIOS — fontes de mentira no mesmo formato que lib/conteudo/fontes.js devolve.
   Usados nos testes e para gerar os JSON de exemplo do contrato (trabalho/engineer/FE-20261104-01/exemplos/).
   Nenhum texto aqui é regra real do Faktory Flow: tudo é marcado "(fictício)". */
import { MAPA_MODULOS } from '../../../lib/conteudo/mapa-modulos.js';

export const VERSAO_FICTICIA = '2026-11-04';

/** Três módulos reais do mapa (ids, ordem e títulos do doc 05), com conteúdo fictício:
    vendas = completo (com Markdown leve, placeholder <x> e um link inseguro, para o conversor de trechos)
    estoque = só consultor + passos de estagiário · relatorios = em preparação por decisão, com semente guardada. */
export const MAPA_FICTICIO = MAPA_MODULOS.filter((m) => ['vendas', 'estoque', 'relatorios'].includes(m.id));

export function harnessFicticio() {
  const regra = (id, titulo, modulos, texto, confirmar) => ({
    id, titulo, modulos, confianca: 'media', status: 'vigente',
    secoes: { Regra: texto, 'Como confirmar na tela': confirmar, Evidência: 'Exemplo fictício.' },
    fonte: `harness:conhecimento/produto/regras-negocio/${id}.md`,
  });
  return {
    regras: [
      regra('regra-exemplo-pedido-aprovado', 'Pedido aprovado não volta a rascunho (fictício)', ['vendas'], 'Exemplo fictício: depois de aprovado, o pedido só pode ser cancelado.', 'Abra **Vendas > Pedidos**, pesquise "PV - <número>" e tente editar um pedido *aprovado* em `Vendas > Pedidos` e confira o campo `Situação` = `APROVADO` (fictício). Veja [o vídeo](/videos/fluxo-1-vendas.mp4) e [isto](javascript:alert(1)).'),
      regra('regra-exemplo-saldo-por-local', 'Saldo é controlado por local (fictício)', ['estoque'], 'Exemplo fictício: cada local de estoque tem saldo próprio.', null),
    ],
    funcional: [{ id: 'funcional-exemplo-vendas', titulo: 'Pedidos de venda (fictício)', modulos: ['vendas'], secoes: { Caminho: '`Vendas > Pedidos` (fictício)' }, fonte: 'harness:conhecimento/produto/funcional/funcional-exemplo-vendas.md' }],
    procedimentos: [{ id: 'proc-exemplo-vendas', titulo: 'Emitir pedido de exemplo (fictício)', modulos: ['vendas'], secoes: {}, fonte: 'harness:conhecimento/produto/procedimentos/proc-exemplo-vendas.md' }],
    faq: [],
    metodologia: [],
    glossario: [
      { id: 'tela-exemplo-pedidos', nome: 'Lista de pedidos (fictício)', modulo: 'vendas', caminho: 'Vendas > Pedidos', fonte: 'harness:conhecimento/glossario/telas.yaml#tela-exemplo-pedidos' },
      { id: 'tela-exemplo-saldo', nome: 'Saldo por local (fictício)', modulo: 'estoque', caminho: 'Estoque > Saldo', fonte: 'harness:conhecimento/glossario/telas.yaml#tela-exemplo-saldo' },
    ],
    manuais: [{ arquivo: 'Manual_Exemplo_Vendas_Timbrado.docx', modulos: ['vendas'], fonte: 'harness:conhecimento/Manuais_Faktory_Flow_Timbrados/Manual_Exemplo_Vendas_Timbrado.docx' }],
    roteirosTreinamento: [],
  };
}

export function guiaFicticio() {
  return {
    estagiarios: {
      CHECKLISTS: [
        {
          id: 'vendas', arquivo: 'vendas.html', titulo: 'Vendas (fictício)', resumo: 'Pedidos de exemplo do começo ao fim (fictício).',
          subtitulo: 'Você vai criar um pedido de teste (fictício).', objetivo: 'Entender o ciclo de um pedido fictício.',
          fluxos: [
            { titulo: 'Abrir a lista de pedidos', onde: 'Vendas > Pedidos', intro: 'Tela de exemplo.', passos: [{ t: 'Abra a lista de pedidos (fictício).', r: 'A lista aparece.', s: 'v' }, { t: 'Passo ainda não conferido (fictício).', s: 'n' }] },
            { preparar: true, titulo: 'Criar um pedido de teste', onde: 'Vendas > Novo pedido', passos: [{ t: 'Escolha o cliente "Cliente Exemplo Ltda" (fictício).', s: 'd' }] },
          ],
        },
        {
          id: 'estoque', arquivo: 'estoque.html', titulo: 'Estoque (fictício)', resumo: 'Consultar saldo de um produto de exemplo (fictício).',
          fluxos: [{ titulo: 'Consultar saldo', onde: 'Estoque > Saldo', passos: [{ t: 'Procure o produto "Perfil Exemplo 001" (fictício).', r: 'O saldo aparece por local.', s: 'v' }] }],
        },
      ],
      ONBOARDING: null,
    },
    fluxosPrincipais: [{ id: 'fluxo-vendas', arquivo: 'fluxo-vendas.html', titulo: 'Fluxo principal de Vendas (fictício)' }],
    implantacao: [
      {
        id: 'implantacao-vendas', arquivo: 'implantacao-vendas.html', titulo: 'Implantação de Vendas (fictício)', objetivo: 'Deixar o comercial de exemplo pronto (fictício).',
        prerequisitos: [{ t: 'Clientes de exemplo cadastrados (fictício).', s: 'd' }],
        fluxos: [{ titulo: 'Configurar tabela de preço', onde: 'Vendas > Configurações', passos: [{ t: 'Crie a tabela "Exemplo 2026" (fictício).', s: 'v' }] }],
        resultado: ['Um pedido fictício aprovado.'], atencao: [{ t: 'Não use dados reais de clientes (fictício).', s: 'd' }], naoValidado: ['Campo de comissão (fictício).'],
      },
      {
        id: 'implantacao-estoque', arquivo: 'implantacao-estoque.html', titulo: 'Implantação de Estoque (fictício)',
        prerequisitos: [], fluxos: [{ titulo: 'Cadastrar locais', onde: 'Estoque > Locais', passos: [{ t: 'Crie o local "Depósito Exemplo" (fictício).', s: 'n' }] }],
        resultado: [], atencao: [], naoValidado: [],
      },
    ],
    roteiros: {
      'fluxo-1-vendas': {
        id: 'fluxo-1-vendas', titulo: 'Vendas', subtitulo: 'Do pedido à aprovação (fictício)', fonte: 'guia:videos/roteiros/fluxo-1-vendas.json',
        trechos: [
          { id: 'abertura', cena: 'abertura' },
          { id: 'tela-lista', cena: 'tela', captura: 'lista-pedidos', rotulo: 'Lista de pedidos (fictício)', fala: 'Aqui ficam os pedidos de exemplo.' },
          { id: 'tela-novo', cena: 'tela', captura: 'novo-pedido', rotulo: 'Novo pedido (fictício)', fala: 'Criando um pedido de exemplo.' },
        ],
      },
      'consultor-03-comercial': {
        id: 'consultor-03-comercial', titulo: 'Comercial', subtitulo: 'Regras do comercial (fictício)', fonte: 'guia:videos/roteiros/consultor-03-comercial.json',
        trechos: [
          { id: 'regra-1', cena: 'regra', titulo: 'Desconto acima do limite pede aprovação (fictício)', texto: 'Exemplo fictício de cartão de regra.', fonte: 'regra-exemplo-desconto' },
          { id: 'alertas', cena: 'alertas', itens: ['Confira o cliente antes de aprovar (fictício).'] },
        ],
      },
    },
    manifestVideos: {
      trilhas: [
        { id: 'fluxos', videos: [{ id: 'fluxo-1-vendas', titulo: 'Vendas — do pedido à aprovação (fictício)', resumo: 'Vídeo de exemplo.', duracao: '3 min 08 s', status: 'pronto' }] },
        { id: 'consultores', videos: [
          { id: 'consultor-03-comercial', titulo: 'Comercial para consultores (fictício)', resumo: 'Vídeo de exemplo.', duracao: '4 min 30 s', status: 'pronto' },
          { id: 'consultor-04-estoque', titulo: 'Estoque para consultores (fictício)', duracao: '2 min', status: 'roteiro' },
        ] },
      ],
    },
    seed: {
      vendas: { nome: 'Vendas', cor: '#1976d2', icone: 'vendas', objetivo: 'Registrar pedidos de exemplo (fictício).', papel: 'Liga o CRM ao faturamento (fictício).', quando: 'Depois dos cadastros (fictício).', prerequisito: 'Clientes cadastrados (fictício).', fluxoDesc: 'Do orçamento ao pedido aprovado (fictício).', treinamento: 'Mostre um pedido completo (fictício).', fluxo: [{ texto: 'Orçamento' }, { texto: 'Pedido' }, { texto: 'Aprovação' }], checklist: [{ texto: 'Pedido de teste aprovado (fictício).' }] },
      estoque: { nome: 'Estoque', cor: '#455a64', icone: 'estoque', objetivo: 'Controlar saldos de exemplo (fictício).' },
      relatorios: { nome: 'Relatórios', cor: '#283593', icone: 'relatorios', objetivo: 'Conteúdo semente de relatórios (fictício): guardado, não exibido.', fluxoDesc: 'Relatórios de exemplo (fictício).' },
    },
    publicos: [
      '/checklists/consultores/implantacao-vendas.html',
      '/checklists/estagiarios/estoque.html',
      '/checklists/estagiarios/fluxo-vendas.html',
      '/checklists/estagiarios/vendas.html',
      '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf',
      '/telas/fluxo-1-vendas/lista-pedidos.png',
      '/videos/consultor-03-comercial.jpg',
      '/videos/consultor-03-comercial.mp4',
      '/videos/fluxo-1-vendas.jpg',
      '/videos/fluxo-1-vendas.mp4',
      '/videos/fluxo-1-vendas.vtt',
    ],
  };
}
