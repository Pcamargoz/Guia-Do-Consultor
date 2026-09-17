/* Faktory Flow — Abas do Guia do Consultor: "Guia" e "Apostila".
   Cabeçalho com as abas + botão de exportar PDF; a apostila abre dentro do guia
   (iframe carregado só na primeira visita). Endereço direto: index.html#apostila */
(() => {
  const PDF = '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf';
  const PDF_NOME = 'Apostila-do-Consultor-Faktory-Flow.pdf';
  const main = document.querySelector('.main');
  const sidebar = document.querySelector('.sidebar');
  if (!main || !sidebar) return;

  const icone = {
    guia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    apostila: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>',
    baixar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    externo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  };

  /* ---------- Cabeçalho com abas ---------- */
  const topo = document.createElement('header');
  topo.className = 'ab-topo';
  topo.innerHTML = `
    <div class="ab-abas" role="tablist" aria-label="Conteúdo">
      <button type="button" class="ab-aba" role="tab" id="aba-guia" aria-controls="painel-guia" data-aba="guia">${icone.guia}<span>Guia do Consultor</span></button>
      <button type="button" class="ab-aba" role="tab" id="aba-apostila" aria-controls="painel-apostila" data-aba="apostila">${icone.apostila}<span>Apostila</span></button>
    </div>
    <div class="ab-acoes">
      <a class="ab-btn ab-btn--sec" href="/apostila" target="_blank" rel="noopener" data-so-apostila>${icone.externo}<span>Abrir em nova aba</span></a>
      <a class="ab-btn" href="${PDF}" download="${PDF_NOME}">${icone.baixar}<span>Exportar PDF</span></a>
    </div>`;
  main.prepend(topo);

  // Conteúdo atual do guia vira o painel "Guia".
  const painelGuia = document.createElement('div');
  painelGuia.id = 'painel-guia';
  painelGuia.className = 'ab-painel';
  painelGuia.setAttribute('role', 'tabpanel');
  painelGuia.setAttribute('aria-labelledby', 'aba-guia');
  while (topo.nextSibling) painelGuia.appendChild(topo.nextSibling);
  main.appendChild(painelGuia);

  const painelApostila = document.createElement('section');
  painelApostila.id = 'painel-apostila';
  painelApostila.className = 'ab-painel ab-painel--apostila';
  painelApostila.setAttribute('role', 'tabpanel');
  painelApostila.setAttribute('aria-labelledby', 'aba-apostila');
  painelApostila.hidden = true;
  main.appendChild(painelApostila);

  /* ---------- Item no menu lateral ---------- */
  const referencia = [...sidebar.querySelectorAll('.nav-section')].find((s) => s.textContent.trim() === 'Referência');
  const navApostila = document.createElement('a');
  navApostila.className = 'nav-item ab-nav-apostila';
  navApostila.href = '#apostila';
  navApostila.innerHTML = `${icone.apostila}Apostila do Consultor`;
  (referencia ? referencia.nextElementSibling : sidebar.lastElementChild).after(navApostila);

  /* ---------- Troca de abas ---------- */
  let atual = null;
  let rolagemGuia = 0;

  function mostrar(aba, { foco = false } = {}) {
    if (aba === atual) return;
    if (atual === 'guia') rolagemGuia = scrollY;
    atual = aba;
    const apostila = aba === 'apostila';

    if (apostila && !painelApostila.firstChild) {
      painelApostila.innerHTML = `<iframe class="ab-frame" src="/apostila" title="Apostila do Consultor — Faktory Flow" loading="lazy"></iframe>`;
    }
    painelGuia.hidden = apostila;
    painelApostila.hidden = !apostila;
    document.body.classList.toggle('ab-modo-apostila', apostila);
    topo.querySelectorAll('.ab-aba').forEach((b) => {
      const ativo = b.dataset.aba === aba;
      b.setAttribute('aria-selected', ativo);
      b.tabIndex = ativo ? 0 : -1;
    });
    topo.querySelectorAll('[data-so-apostila]').forEach((el) => { el.hidden = !apostila; });
    sidebar.querySelectorAll('.nav-item').forEach((n) => n.classList.toggle('active', apostila ? n === navApostila : n.classList.contains('active') && n !== navApostila));
    if (!apostila && !sidebar.querySelector('.nav-item.active')) sidebar.querySelector('.nav-item')?.classList.add('active');

    scrollTo({ top: apostila ? 0 : rolagemGuia, behavior: 'instant' });
    if (foco) topo.querySelector(`[data-aba="${aba}"]`).focus();
  }

  const abaDoEndereco = () => (location.hash === '#apostila' ? 'apostila' : 'guia');
  function irPara(aba) {
    if (aba === 'apostila') { if (location.hash !== '#apostila') location.hash = 'apostila'; }
    else if (location.hash === '#apostila') history.pushState(null, '', location.pathname + location.search);
    mostrar(aba);
  }

  topo.addEventListener('click', (e) => {
    const b = e.target.closest('[data-aba]');
    if (b) irPara(b.dataset.aba);
  });
  topo.querySelector('.ab-abas').addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    irPara(atual === 'guia' ? 'apostila' : 'guia');
    topo.querySelector(`[data-aba="${atual}"]`).focus();
  });

  // Itens do menu do guia voltam para a aba Guia antes de rolar até a seção.
  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    if (item === navApostila) { e.preventDefault(); irPara('apostila'); return; }
    if (atual === 'apostila') {
      history.pushState(null, '', location.pathname + location.search);
      mostrar('guia');
    }
  }, true);

  addEventListener('hashchange', () => mostrar(abaDoEndereco()));
  addEventListener('popstate', () => mostrar(abaDoEndereco()));
  mostrar(abaDoEndereco());
})();
