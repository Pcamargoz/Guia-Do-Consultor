/* Biblioteca dos checklists independentes disponibilizados no projeto. */
(() => {
  const painel = document.getElementById('painel-checklist');
  if (!painel) return;

  const icones = {
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>',
    baixar: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
  };
  const dados = [
    { area: 'CRM', nome: 'Validação do CRM', arquivo: 'validacao-crm-v2-faktory-flow.html' },
    { area: 'Compras', nome: 'Validação de Compras', arquivo: 'validacao-compras-faktory-flow.html' },
    { area: 'Estoque', nome: 'Validação de Estoque', arquivo: 'validacao-estoque-faktory-flow.html' },
    { area: 'Expedição', nome: 'Validação de Expedição', arquivo: 'validacao-expedicao-faktory-flow.html' },
    { area: 'Produção', nome: 'Validação da Produção', arquivo: 'validacao-producao-v2-faktory-flow.html' },
    { area: 'Projetos', nome: 'Validação de Projetos', arquivo: 'validacao-projetos-faktory-flow.html' },
    { area: 'Recebimento', nome: 'Validação de Recebimento', arquivo: 'validacao-recebimento-faktory-flow.html' },
    { area: 'Serviços', nome: 'Validação de Serviços', arquivo: 'validacao-servicos-v2-faktory-flow.html' },
    { area: 'Tarefas', nome: 'Validação de Tarefas', arquivo: 'validacao-tarefas-faktory-flow.html' },
  ];
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const esc = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  painel.innerHTML = `
    <header class="ck-header">
      <h1>Checklists do sistema</h1>
      <p>Baixe o checklist da área que você vai validar. Cada arquivo abre como uma ferramenta HTML independente no navegador.</p>
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
    const filtrados = dados.filter((item) => `${item.area} ${item.nome}`.toLocaleLowerCase('pt-BR').includes(termo));
    contagem.textContent = `${filtrados.length} ${filtrados.length === 1 ? 'checklist disponível' : 'checklists disponíveis'}`;
    if (!filtrados.length) {
      lista.innerHTML = '<p class="ck-vazio">Nenhum checklist corresponde à busca. Tente outro termo.</p>';
      return;
    }
    lista.innerHTML = filtrados.map((item) => `
      <article class="ck-item">
        <div class="ck-item-topo"><span class="ck-icone">${svg(icones.lista)}</span></div>
        <div class="ck-item-info"><span class="ck-area">${esc(item.area)}</span><h2>${esc(item.nome)}</h2><p>Checklist interativo independente em HTML.</p></div>
        <a class="ck-baixar" href="/checklists/${encodeURIComponent(item.arquivo)}" download="${esc(item.arquivo)}">${svg(icones.baixar)}Baixar checklist HTML</a>
      </article>`).join('');
  }

  busca.addEventListener('input', render);
  render();
})();
