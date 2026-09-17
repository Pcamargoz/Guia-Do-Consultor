/* Faktory Flow — Abas do Guia do Consultor: "Guia", "Pacotes e Horas" e "Apostila".
   Cabeçalho com as abas + botão de exportar PDF; a apostila abre dentro do guia
   (iframe carregado só na primeira visita). Endereços diretos: #pacotes e #apostila.
   Ao trocar de aba dispara o evento "ff:aba" (detail.aba) no document. */
(() => {
  const PDF = '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf';
  const PDF_NOME = 'Apostila-do-Consultor-Faktory-Flow.pdf';
  const main = document.querySelector('.main');
  const sidebar = document.querySelector('.sidebar');
  if (!main || !sidebar) return;

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${d}</svg>`;
  const icone = {
    guia: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
    pacotes: svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>'),
    apostila: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/>'),
    baixar: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    externo: svg('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),
  };
  const ABAS = [
    { id: 'guia', rotulo: 'Guia do Consultor' },
    { id: 'pacotes', rotulo: 'Pacotes e Horas' },
    { id: 'apostila', rotulo: 'Apostila' },
  ];

  /* ---------- Cabeçalho com abas ---------- */
  const topo = document.createElement('header');
  topo.className = 'ab-topo';
  topo.innerHTML = `
    <div class="ab-abas" role="tablist" aria-label="Conteúdo">
      ${ABAS.map((a) => `<button type="button" class="ab-aba" role="tab" id="aba-${a.id}" aria-controls="painel-${a.id}" data-aba="${a.id}">${icone[a.id]}<span>${a.rotulo}</span></button>`).join('')}
    </div>
    <div class="ab-acoes">
      <a class="ab-btn ab-btn--sec" href="/apostila" target="_blank" rel="noopener" data-so-apostila>${icone.externo}<span>Abrir em nova aba</span></a>
      <a class="ab-btn" href="${PDF}" download="${PDF_NOME}">${icone.baixar}<span>Exportar PDF</span></a>
    </div>`;
  main.prepend(topo);

  const criarPainel = (id, tag = 'section') => {
    const painel = document.createElement(tag);
    painel.id = `painel-${id}`;
    painel.className = `ab-painel ab-painel--${id}`;
    painel.setAttribute('role', 'tabpanel');
    painel.setAttribute('aria-labelledby', `aba-${id}`);
    return painel;
  };

  // Conteúdo atual do guia vira o painel "Guia".
  const paineis = { guia: criarPainel('guia', 'div') };
  while (topo.nextSibling) paineis.guia.appendChild(topo.nextSibling);
  main.appendChild(paineis.guia);
  for (const id of ['pacotes', 'apostila']) {
    paineis[id] = criarPainel(id);
    paineis[id].hidden = true;
    main.appendChild(paineis[id]);
  }

  /* ---------- Itens no menu lateral ---------- */
  const secao = (nome) => [...sidebar.querySelectorAll('.nav-section')].find((s) => s.textContent.trim() === nome);
  const navItem = (aba, texto) => {
    const a = document.createElement('a');
    a.className = `nav-item ab-nav-${aba}`;
    a.href = `#${aba}`;
    a.dataset.abaNav = aba;
    a.innerHTML = `${icone[aba]}${texto}`;
    return a;
  };
  const navs = { pacotes: navItem('pacotes', 'Pacotes e Horas'), apostila: navItem('apostila', 'Apostila do Consultor') };
  const modulos = secao('Módulos');
  (modulos ? modulos.nextElementSibling : sidebar.lastElementChild).after(navs.pacotes);
  const referencia = secao('Referência');
  (referencia ? referencia.nextElementSibling : sidebar.lastElementChild).after(navs.apostila);

  /* ---------- Troca de abas ---------- */
  let atual = null;
  let rolagemGuia = 0;

  function mostrar(aba, { foco = false } = {}) {
    if (!paineis[aba] || aba === atual) return;
    if (atual === 'guia') rolagemGuia = scrollY;
    atual = aba;

    if (aba === 'apostila' && !paineis.apostila.firstChild) {
      paineis.apostila.innerHTML = `<iframe class="ab-frame" src="/apostila" title="Apostila do Consultor — Faktory Flow" loading="lazy"></iframe>`;
    }
    for (const [id, painel] of Object.entries(paineis)) painel.hidden = id !== aba;
    document.body.classList.toggle('ab-modo-apostila', aba === 'apostila');
    topo.querySelectorAll('.ab-aba').forEach((b) => {
      const ativo = b.dataset.aba === aba;
      b.setAttribute('aria-selected', ativo);
      b.tabIndex = ativo ? 0 : -1;
    });
    topo.querySelectorAll('[data-so-apostila]').forEach((el) => { el.hidden = aba !== 'apostila'; });
    sidebar.querySelectorAll('.nav-item').forEach((n) => {
      if (aba !== 'guia') n.classList.toggle('active', n.dataset.abaNav === aba);
      else if (n.dataset.abaNav) n.classList.remove('active');
    });
    if (aba === 'guia' && !sidebar.querySelector('.nav-item.active')) sidebar.querySelector('.nav-item')?.classList.add('active');

    scrollTo({ top: aba === 'guia' ? rolagemGuia : 0, behavior: 'instant' });
    if (foco) topo.querySelector(`[data-aba="${aba}"]`).focus();
    document.dispatchEvent(new CustomEvent('ff:aba', { detail: { aba } }));
  }

  const abaDoEndereco = () => {
    const hash = location.hash.replace('#', '');
    return paineis[hash] && hash !== 'guia' ? hash : 'guia';
  };
  function irPara(aba) {
    if (aba !== 'guia') { if (location.hash !== `#${aba}`) location.hash = aba; }
    else if (location.hash) history.pushState(null, '', location.pathname + location.search);
    mostrar(aba);
  }
  window.ffIrParaAba = irPara;

  topo.addEventListener('click', (e) => {
    const b = e.target.closest('[data-aba]');
    if (b) irPara(b.dataset.aba);
  });
  topo.querySelector('.ab-abas').addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const i = ABAS.findIndex((a) => a.id === atual);
    const proximo = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: ABAS.length - 1 }[e.key];
    irPara(ABAS[(proximo + ABAS.length) % ABAS.length].id);
    topo.querySelector(`[data-aba="${atual}"]`).focus();
  });

  // Itens do menu: os das abas trocam de aba; os demais voltam ao Guia antes de rolar até a seção.
  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    if (item.dataset.abaNav) { e.preventDefault(); irPara(item.dataset.abaNav); return; }
    if (atual !== 'guia') {
      history.pushState(null, '', location.pathname + location.search);
      mostrar('guia');
    }
  }, true);

  addEventListener('hashchange', () => mostrar(abaDoEndereco()));
  addEventListener('popstate', () => mostrar(abaDoEndereco()));
  mostrar(abaDoEndereco());
})();
