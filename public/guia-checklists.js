/* Biblioteca dos checklists independentes disponibilizados no projeto. */
(() => {
  const painel = document.getElementById('painel-checklist');
  if (!painel) return;

  const icones = {
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>',
    baixar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  };
  const QA = 'Validação dos módulos (QA)';
  const CONSULTOR = 'Teste de fluxo do consultor';
  const ESTAGIARIO = 'Trilha do estagiário';
  const GRUPOS = [
    { nome: CONSULTOR, desc: 'Roteiro para testar o fluxo funcional completo, do pedido de venda até a gestão, num ambiente de teste.' },
    { nome: ESTAGIARIO, desc: 'Checklists curtos para a integração de estagiários. Comece pelo onboarding (00) e siga a numeração.' },
    { nome: QA, desc: 'Planos completos de validação e homologação de cada módulo.' },
  ];
  const est = (n, area, nome, arquivo) => ({ grupo: ESTAGIARIO, area: `${n} · ${area}`, nome, arquivo: `estagiarios/${arquivo}` });
  const dados = [
    { grupo: CONSULTOR, area: 'Fluxo completo', nome: 'Teste do fluxo: do pedido à gestão', arquivo: 'consultores/teste-fluxo-pedido-ate-gestao.html' },
    est('00', 'Comece por aqui', 'Onboarding do estagiário', '00-onboarding-estagiario.html'),
    est('01', 'Navegação', 'Primeiros passos e navegação', '01-primeiros-passos-navegacao.html'),
    est('02', 'Cadastros', 'Cadastros básicos', '02-cadastros-basicos.html'),
    est('03', 'CRM', 'CRM: leads e oportunidades', '03-crm-leads-oportunidades.html'),
    est('04', 'Vendas', 'Vendas: pedidos de venda', '04-vendas-pedidos.html'),
    est('05', 'Compras', 'Compras: da necessidade ao pedido', '05-compras.html'),
    est('06', 'Recebimento', 'Recebimento de mercadorias', '06-recebimento.html'),
    est('07', 'Estoque', 'Estoque: saldo e movimentos', '07-estoque.html'),
    est('08', 'Produção', 'Produção: ordens e apontamentos', '08-producao.html'),
    est('09', 'Serviços', 'Serviços de campo', '09-servicos-campo.html'),
    est('10', 'Projetos', 'Projetos e obras', '10-projetos-obras.html'),
    est('11', 'Expedição', 'Expedição e entregas', '11-expedicao.html'),
    est('12', 'Faturamento e Fiscal', 'Faturamento e Fiscal (consulta)', '12-faturamento-fiscal.html'),
    est('13', 'Financeiro', 'Financeiro (consulta)', '13-financeiro.html'),
    est('14', 'Tarefas', 'Tarefas: quadros e cartões', '14-tarefas.html'),
    est('15', 'Integração', 'Visão do fluxo completo', '15-visao-fluxo-completo.html'),
    { grupo: QA, area: 'CRM', nome: 'Validação do CRM', arquivo: 'validacao-crm-v2-faktory-flow.html' },
    { grupo: QA, area: 'Compras', nome: 'Validação de Compras', arquivo: 'validacao-compras-faktory-flow.html' },
    { grupo: QA, area: 'Estoque', nome: 'Validação de Estoque', arquivo: 'validacao-estoque-faktory-flow.html' },
    { grupo: QA, area: 'Expedição', nome: 'Validação de Expedição', arquivo: 'validacao-expedicao-faktory-flow.html' },
    { grupo: QA, area: 'Produção', nome: 'Validação da Produção', arquivo: 'validacao-producao-v2-faktory-flow.html' },
    { grupo: QA, area: 'Projetos', nome: 'Validação de Projetos', arquivo: 'validacao-projetos-faktory-flow.html' },
    { grupo: QA, area: 'Recebimento', nome: 'Validação de Recebimento', arquivo: 'validacao-recebimento-faktory-flow.html' },
    { grupo: QA, area: 'Serviços', nome: 'Validação de Serviços', arquivo: 'validacao-servicos-v2-faktory-flow.html' },
    { grupo: QA, area: 'Tarefas', nome: 'Validação de Tarefas', arquivo: 'validacao-tarefas-faktory-flow.html' },
  ];
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const esc = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  painel.innerHTML = `
    <header class="ck-header">
      <h1>Checklists do sistema</h1>
      <p>Baixe o checklist que você vai usar. Cada arquivo abre como uma ferramenta HTML independente no navegador e guarda o progresso nele.</p>
    </header>
    <div class="ck-toolbar">
      <label class="ck-busca">${svg(icones.busca)}<input type="search" data-busca placeholder="Buscar por área ou checklist…" aria-label="Buscar checklists"></label>
      <span class="ck-contagem" data-contagem aria-live="polite"></span>
    </div>
    <div class="ck-lista" data-lista></div>`;

  const lista = painel.querySelector('[data-lista]');
  const busca = painel.querySelector('[data-busca]');
  const contagem = painel.querySelector('[data-contagem]');

  function render() {
    const termo = busca.value.trim().toLocaleLowerCase('pt-BR');
    const filtrados = dados.filter((item) => `${item.grupo} ${item.area} ${item.nome}`.toLocaleLowerCase('pt-BR').includes(termo));
    contagem.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'checklist disponível' : 'checklists disponíveis'}`;
    if (!filtrados.length) {
      lista.innerHTML = '<p class="ck-vazio">Nenhum checklist corresponde à busca. Tente outro termo.</p>';
      return;
    }
    lista.innerHTML = GRUPOS.map((g) => {
      const itens = filtrados.filter((item) => item.grupo === g.nome);
      if (!itens.length) return '';
      return `
      <h2 class="ck-grupo">${esc(g.nome)}<small>${esc(g.desc)}</small></h2>` + itens.map((item) => `
      <article class="ck-item">
        <div class="ck-item-topo"><span class="ck-icone">${svg(icones.lista)}</span></div>
        <div class="ck-item-info"><span class="ck-area">${esc(item.area)}</span><h2>${esc(item.nome)}</h2><p>Checklist interativo independente em HTML.</p></div>
        <a class="ck-baixar" href="/api/checklists-download?arquivo=${encodeURIComponent(item.arquivo)}" download="${esc(item.arquivo.split('/').pop())}">${svg(icones.baixar)}Baixar checklist HTML</a>
      </article>`).join('');
    }).join('');
  }

  busca.addEventListener('input', render);
  render();
})();
