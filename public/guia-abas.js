/* Faktory Flow — Abas da plataforma de conhecimento (FE-20261104-01, contrato de componentes v2 §6).
   Áreas (doc 03 da refatoração): "Página Inicial" (#inicio, padrão), "Guia Inicial" (#inicial[/<modulo>]),
   "Guia do Consultor" (#consultor[/<modulo>]), as ferramentas atuais (#pacotes, #checklist, #videos, #apostila),
   o "Acervo" (#acervo: o guia antigo intacto) e, só para administradores, o "Painel" (#admin, com a seção Visibilidade).
   - Roteador único: window.Plataforma (plataforma-dados.js). Este arquivo só OUVE "plataforma:rota" e navega com
     Plataforma.irPara; os hashes antigos (#guia, #metodo, #dashboard…, #pc-nome-*, #ck-*) são aliases de lá.
   - Antes do 1º desenho chama Plataforma.visibilidade(): área oculta para o perfil some das abas e do menu, e o
     roteador manda o endereço dela para o início (ex.: estagiário em #guia, #metodo, #acervo ou #apostila).
     O servidor continua recusando o conteúdo oculto; aqui é só apresentação.
   - Desenho das áreas novas: window.PlataformaUI (plataforma-ui.js), componentes "burros" alimentados aqui.
   - Ao trocar de aba dispara o evento "ff:aba" (detail.aba = área) no document, como antes. */
(() => {
  const PDF = '/downloads/Apostila-do-Consultor-Faktory-Flow.pdf';
  const PDF_NOME = 'Apostila-do-Consultor-Faktory-Flow.pdf';
  const main = document.querySelector('.main');
  const sidebar = document.querySelector('.sidebar');
  const P = window.Plataforma;
  const UI = window.PlataformaUI;
  if (!main || !sidebar || !P || !UI) return;

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${d}</svg>`;
  const icone = {
    inicio: UI.icones.inicio,
    inicial: UI.icones['primeiros-passos'],
    consultor: UI.icones.manual,
    acervo: svg('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'),
    pacotes: svg('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>'),
    checklist: svg('<path d="m9 11 2 2 4-4"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/><path d="M15 3h6v6"/><path d="m14 10 7-7"/>'),
    videos: svg('<rect x="2" y="5" width="20" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/>'),
    apostila: svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/>'),
    baixar: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    planilha: svg('<path d="M4 3h12l4 4v14H4z"/><path d="M16 3v5h5M8 12h8M8 16h8M12 9v10"/>'),
    externo: svg('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),
    admin: svg('<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="5" rx="1"/><rect x="12" y="8" width="3" height="9" rx="1"/><rect x="17" y="5" width="3" height="12" rx="1"/>'),
    estudo: svg('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20"/><path d="M9 7h7M9 10h5"/>'),
  };
  const ABAS = [
    { id: 'inicio', rotulo: 'Página Inicial' },
    { id: 'inicial', rotulo: 'Guia Inicial' },
    { id: 'consultor', rotulo: 'Guia do Consultor' },
    { id: 'pacotes', rotulo: 'Pacotes e Horas' },
    { id: 'checklist', rotulo: 'Checklist' },
    { id: 'videos', rotulo: 'Vídeos de fluxo' },
    { id: 'apostila', rotulo: 'Apostila' },
    { id: 'acervo', rotulo: 'Acervo', titulo: 'Acervo: o guia antigo completo, sem alterações' },
    { id: 'admin', rotulo: 'Painel', titulo: 'Painel do administrador: visibilidade, progresso e problemas dos checklists', soAdmin: true },
  ];
  const NOVAS = ['inicio', 'inicial', 'consultor'];

  /* ---------- Cabeçalho com abas ---------- */
  const topo = document.createElement('header');
  topo.className = 'ab-topo';
  topo.innerHTML = `
    <div class="ab-abas" role="tablist" aria-label="Conteúdo">
      ${ABAS.map((a) => `<button type="button" class="ab-aba" role="tab" id="aba-${a.id}" aria-controls="painel-${a.id}" data-aba="${a.id}" aria-label="${a.titulo || a.rotulo}" title="${a.titulo || a.rotulo}"${a.soAdmin ? ' hidden data-so-admin' : ''}>${icone[a.id]}<span>${a.rotulo}</span></button>`).join('')}
    </div>
    <div class="ab-acoes">
      <a class="ab-btn ab-btn--destaque" href="/apostila" target="_blank" rel="noopener" data-so-apostila hidden aria-label="Estudar em nova aba" title="Grifos, anotações e checklist ficam disponíveis na apostila aberta em nova aba">${icone.estudo}<span>Estudar em nova aba</span>${icone.externo}</a>
      <button type="button" class="ab-btn" data-so-pacotes data-exportar-pacotes="pdf" hidden title="Gerar relatório dos pacotes em PDF">${icone.baixar}<span>Exportar PDF</span></button>
      <button type="button" class="ab-btn ab-btn--sec" data-so-pacotes data-exportar-pacotes="excel" hidden title="Baixar relatório dos pacotes para Excel">${icone.planilha}<span>Exportar Excel</span></button>
      <a class="ab-btn ab-btn--sec" href="${PDF}" download="${PDF_NOME}" data-so-guia hidden title="Baixar a apostila em PDF" aria-label="Exportar PDF">${icone.baixar}<span>Exportar PDF</span></a>
    </div>`;

  const comoPainel = (painel, id) => {
    painel.id = `painel-${id}`;
    painel.classList.add('ab-painel', `ab-painel--${id}`);
    painel.setAttribute('role', 'tabpanel');
    painel.setAttribute('aria-labelledby', `aba-${id}`);
    painel.removeAttribute('aria-label');
    painel.hidden = true;
    return painel;
  };
  const criarPainel = (id, tag = 'section') => comoPainel(document.createElement(tag), id);

  // Pontos de montagem do index.html saem do <main> antes de o resto (o guia antigo) virar o Acervo.
  const pontos = {};
  for (const id of ['painel-inicio', 'painel-inicial', 'painel-consultor', 'painel-visibilidade']) {
    const el = document.getElementById(id);
    if (el) { el.remove(); pontos[id] = el; }
  }

  main.prepend(topo);
  const paineis = {};
  for (const id of NOVAS) paineis[id] = comoPainel(pontos[`painel-${id}`] || document.createElement('section'), id);
  paineis.acervo = criarPainel('acervo', 'div');
  while (topo.nextSibling) paineis.acervo.appendChild(topo.nextSibling);
  for (const id of NOVAS) main.appendChild(paineis[id]);
  main.appendChild(paineis.acervo);
  for (const id of ['pacotes', 'checklist', 'videos', 'apostila']) main.appendChild(paineis[id] = criarPainel(id));
  // Aba Painel = grupo com a seção Visibilidade (#painel-visibilidade, desenhada pelo guia-admin.js) e a seção dos
  // checklists (#painel-admin). O guia-admin.js troca o conteúdo inteiro de #painel-admin, por isso a Visibilidade
  // fica ao lado, não dentro. O tabpanel é o grupo (#aba-painel-admin); os ids que o guia-admin.js procura não mudam.
  paineis.admin = criarPainel('admin', 'div');
  paineis.admin.id = 'aba-painel-admin';
  topo.querySelector('#aba-admin').setAttribute('aria-controls', paineis.admin.id);
  const painelAdmin = document.createElement('section');
  painelAdmin.id = 'painel-admin';
  painelAdmin.setAttribute('aria-label', 'Progresso e problemas dos checklists');
  if (pontos['painel-visibilidade']) paineis.admin.append(pontos['painel-visibilidade']);
  paineis.admin.append(painelAdmin);
  main.appendChild(paineis.admin);

  /* ---------- Itens no menu lateral ---------- */
  const navItem = (aba, texto) => {
    const a = document.createElement('a');
    a.className = `nav-item ab-nav-${aba}`;
    a.href = `#${aba}`;
    a.dataset.abaNav = aba;
    a.innerHTML = `${icone[aba]}${texto}`;
    return a;
  };
  const tituloSecao = (texto) => {
    const d = document.createElement('div');
    d.className = 'nav-section';
    d.textContent = texto;
    return d;
  };
  const navs = {
    inicio: navItem('inicio', 'Página Inicial'),
    inicial: navItem('inicial', 'Guia Inicial'),
    consultor: navItem('consultor', 'Guia do Consultor'),
    pacotes: navItem('pacotes', 'Pacotes e Horas'),
    checklist: navItem('checklist', 'Checklist'),
    videos: navItem('videos', 'Vídeos de fluxo'),
    apostila: navItem('apostila', 'Apostila do Consultor'),
    acervo: navItem('acervo', 'Acervo'),
    admin: navItem('admin', 'Painel do administrador'),
  };
  navs.admin.hidden = true;
  navs.admin.dataset.soAdmin = '';
  // O que já existia no menu (seções do guia antigo) é o Acervo: some junto com a área quando ela é oculta.
  const itensAcervo = [...sidebar.querySelectorAll('.nav-section, .nav-item')];
  itensAcervo.forEach((el) => { el.classList.remove('active'); el.dataset.acervo = ''; });
  const primeiroAcervo = itensAcervo[0];
  const antes = (el) => (primeiroAcervo ? primeiroAcervo.before(el) : sidebar.append(el));
  const tituloFerramentas = tituloSecao('Ferramentas');
  tituloFerramentas.dataset.grupoNav = 'ferramentas';
  [navs.inicio, navs.inicial, navs.consultor, tituloFerramentas, navs.pacotes, navs.checklist, navs.videos,
    navs.apostila, navs.admin].forEach(antes);
  const tituloAcervo = tituloSecao('Acervo');
  tituloAcervo.dataset.acervo = '';
  antes(tituloAcervo);
  antes(navs.acervo);
  navs.acervo.dataset.acervo = '';

  /* ---------- Visibilidade por perfil (só apresentação) ----------
     Depende de .nav-item[hidden]/.nav-section[hidden]/.ab-aba[hidden] { display:none !important }
     em guia-abas.css — senão display:flex do .nav-item anula o atributo hidden (bug v3.8). */
  const permitida = (area) => area === 'inicio' || area === 'admin' || P.lerRota(`#${area}`).area === area;
  const AREAS_FERRAMENTAS = ['pacotes', 'checklist', 'videos', 'apostila'];
  function aplicarPerfil() {
    for (const a of ABAS) {
      if (a.soAdmin) continue;
      const ok = permitida(a.id);
      topo.querySelector(`[data-aba="${a.id}"]`).hidden = !ok;
      if (navs[a.id]) navs[a.id].hidden = !ok;
    }
    // Título do grupo só se sobrar ao menos um item visível no grupo.
    tituloFerramentas.hidden = !AREAS_FERRAMENTAS.some(permitida);
    const acervo = permitida('acervo');
    sidebar.querySelectorAll('[data-acervo]').forEach((el) => { el.hidden = !acervo; });
  }

  /* ---------- Desenho das áreas novas (PlataformaUI) ---------- */
  let resumo = null; // Promise do resumo (cacheada; erro não fica no cache)
  const carregarResumo = (forcar) => {
    if (!resumo || forcar) resumo = P.carregarResumo().then((r) => { if (!r || r.erro) resumo = null; return r || { erro: { status: 0, mensagem: 'Sem resposta do servidor.' } }; });
    return resumo;
  };
  const geracao = {}; // descarta respostas atrasadas quando a rota já mudou
  function novoAlvo(area) {
    const alvo = document.createElement('div');
    paineis[area].replaceChildren(alvo);
    geracao[area] = (geracao[area] || 0) + 1;
    const minha = geracao[area];
    return { alvo, valida: () => geracao[area] === minha };
  }

  async function desenhar(rota, forcar = false) {
    const area = rota.area;
    const { alvo, valida } = novoAlvo(area);
    const tentar = () => desenhar(rota, true);
    if (area === 'inicio') {
      UI.renderPaginaInicial(alvo, null);
      const r = await carregarResumo(forcar);
      if (valida()) UI.renderPaginaInicial(alvo, r, { onTentar: tentar });
      return;
    }
    if (rota.modulo) {
      UI.renderModulo(alvo, null);
      const d = await P.carregarModulo(rota.modulo, area);
      if (valida()) UI.renderModulo(alvo, d, { onTentar: tentar });
      return;
    }
    UI.renderJornada(alvo, { jornada: area, modulos: null });
    const r = await carregarResumo(forcar);
    if (!valida()) return;
    if (r.erro) UI.renderJornada(alvo, { jornada: area, erro: r.erro, onTentar: tentar });
    else UI.renderJornada(alvo, { jornada: area, modulos: r.modulos || [] });
  }

  /* ---------- Troca de abas ---------- */
  let atual = null;
  let chaveAtual = '';
  let rolagemAcervo = 0;

  function rolarAte(secao) {
    if (!secao) return;
    requestAnimationFrame(() => document.getElementById(secao)?.scrollIntoView({ block: 'start' }));
  }

  // Telas estreitas: a fila de abas rola sozinha (estilo no index.html); mantém a aba ativa à vista.
  function centralizarAba() {
    const fila = topo.querySelector('.ab-abas');
    const ativa = fila.querySelector('[aria-selected="true"]');
    if (!ativa || ativa.hidden || fila.scrollWidth <= fila.clientWidth) return;
    const f = fila.getBoundingClientRect(), a = ativa.getBoundingClientRect();
    fila.scrollLeft += (a.left + a.width / 2) - (f.left + f.width / 2);
  }
  addEventListener('resize', centralizarAba);

  function mostrar(rota) {
    const aba = paineis[rota.area] ? rota.area : 'inicio';
    const chave = `${aba}/${rota.modulo || ''}`;
    if (chave === chaveAtual) { rolarAte(rota.secao); return; }
    const trocouAba = aba !== atual;
    if (atual === 'acervo' && trocouAba) rolagemAcervo = scrollY;
    atual = aba;
    chaveAtual = chave;

    if (aba === 'apostila' && !paineis.apostila.firstChild) {
      paineis.apostila.innerHTML = `<iframe class="ab-frame" src="/apostila" title="Apostila do Consultor — Faktory Flow" loading="lazy"></iframe>`;
    }
    if (NOVAS.includes(aba)) desenhar({ ...rota, area: aba });
    for (const [id, painel] of Object.entries(paineis)) painel.hidden = id !== aba;
    document.body.classList.toggle('ab-modo-apostila', aba === 'apostila');
    topo.querySelectorAll('.ab-aba').forEach((b) => {
      const ativo = b.dataset.aba === aba;
      b.setAttribute('aria-selected', ativo);
      b.tabIndex = ativo ? 0 : -1;
    });
    centralizarAba();
    topo.querySelectorAll('[data-so-apostila]').forEach((el) => { el.hidden = aba !== 'apostila'; });
    topo.querySelectorAll('[data-so-pacotes]').forEach((el) => { el.hidden = aba !== 'pacotes'; });
    // PDF da apostila: só no Acervo e na Apostila, e só se a apostila não estiver em standby para o perfil.
    topo.querySelectorAll('[data-so-guia]').forEach((el) => { el.hidden = !(['acervo', 'apostila'].includes(aba) && permitida('apostila')); });
    sidebar.querySelectorAll('.nav-item').forEach((n) => {
      if (n.dataset.abaNav) n.classList.toggle('active', n.dataset.abaNav === aba && aba !== 'acervo');
      else if (aba !== 'acervo') n.classList.remove('active');
    });
    if (aba === 'acervo' && !sidebar.querySelector('.nav-item.active:not([data-aba-nav])')) {
      sidebar.querySelector('.nav-item[data-acervo]:not([data-aba-nav])')?.classList.add('active');
    }

    if (trocouAba || NOVAS.includes(aba)) scrollTo({ top: aba === 'acervo' ? rolagemAcervo : 0, behavior: 'instant' });
    rolarAte(rota.secao);
    if (trocouAba) document.dispatchEvent(new CustomEvent('ff:aba', { detail: { aba } }));
  }

  // Navegação: sempre pelo roteador único. Aceita área ("pacotes") ou alias antigo ("guia").
  const irPara = (aba) => P.irPara(P.lerRota(`#${aba}`));
  window.ffIrParaAba = irPara;

  topo.addEventListener('click', (e) => {
    const b = e.target.closest('[data-aba]');
    if (b) irPara(b.dataset.aba);
  });
  topo.querySelector('.ab-abas').addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    // só as abas visíveis (as ocultas para o perfil e a do administrador ficam fora)
    const visiveis = ABAS.filter((a) => !topo.querySelector(`[data-aba="${a.id}"]`).hidden);
    const i = visiveis.findIndex((a) => a.id === atual);
    const proximo = { ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: visiveis.length - 1 }[e.key];
    const destino = visiveis[(proximo + visiveis.length) % visiveis.length].id;
    irPara(destino);
    mostrar(P.lerRota(`#${destino}`)); // foco imediato: o evento do roteador chega depois e não redesenha
    topo.querySelector(`[data-aba="${atual}"]`).focus();
  });

  // Itens do menu: os das áreas navegam pelo roteador; os do guia antigo abrem o Acervo antes de rolar até a seção.
  sidebar.addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    if (item.dataset.abaNav) { e.preventDefault(); irPara(item.dataset.abaNav); return; }
    if (atual !== 'acervo') {
      mostrar({ area: 'acervo' }); // já visível para o scrollToSection do item, que roda em seguida
      irPara('acervo');
    }
  }, true);

  // Único gatilho de troca de área: o evento do roteador (plataforma-dados.js). Até o 1º desenho, nada é mostrado.
  let pronto = false;
  window.addEventListener('plataforma:rota', (e) => { if (pronto) mostrar(e.detail || { area: 'inicio' }); });

  // Menu montado já no DOM: esconde itens até o mapa de visibilidade (evita flash do menu completo).
  sidebar.dataset.abPerfil = 'pendente';

  (async () => {
    await P.visibilidade(); // aplica o mapa do perfil no roteador; erro de rede não bloqueia (o servidor protege)
    aplicarPerfil();
    delete sidebar.dataset.abPerfil;
    pronto = true;
    mostrar(P.lerRota(location.hash));
    // A aba do administrador só aparece quando guia-admin.js confere a sessão (then registrado antes deste):
    // centraliza de novo depois disso.
    Promise.resolve(window.ffSessao).then(() => requestAnimationFrame(centralizarAba));
  })();
})();
