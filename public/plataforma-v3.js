/* ==========================================================================
   Faktory Flow — Plataforma de aprendizagem v3 (redesign claro, 06/11/2026)
   Página Inicial (vitrine dos módulos), página do módulo (hub das duas jornadas) e as jornadas
   Guia Inicial / Guia do Consultor como trilhas por fase. Componentes "burros": recebem o resumo de
   /api/conteudo e o progresso já carregados por guia-abas.js. Sem innerHTML com dados, sem CSS/JS externo (CSP).
   Motion: CSS + Web Animations + IntersectionObserver + View Transitions (PlataformaUI.transicao).
   ========================================================================== */
(function () {
  'use strict';
  const UI = window.PlataformaUI;
  if (!UI) return;
  const reduzido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const txt = (v) => (v == null ? '' : String(v));
  const corValida = (c) => (/^#[0-9a-f]{3,8}$/i.test(String(c || '')) ? c : '#3478A7');
  let seq = 0;
  const uid = (p) => `${p}-${++seq}`;

  function h(tag, props, ...filhos) {
    const el = document.createElement(tag);
    const p = props || {};
    if (p.className) el.className = p.className;
    if (p.id) el.id = p.id;
    if (p.text != null) el.textContent = txt(p.text);
    if (p.attrs) for (const [k, v] of Object.entries(p.attrs)) if (v != null && v !== false) el.setAttribute(k, v === true ? '' : String(v));
    if (p.data) for (const [k, v] of Object.entries(p.data)) if (v != null && v !== false) el.dataset[k] = v === true ? '' : String(v);
    if (p.style) for (const [k, v] of Object.entries(p.style)) el.style.setProperty(k, String(v));
    if (p.on) for (const [k, fn] of Object.entries(p.on)) el.addEventListener(k, fn);
    for (const f of filhos.flat(Infinity)) if (f != null && f !== false && f !== '') el.append(f instanceof Node ? f : document.createTextNode(String(f)));
    return el;
  }
  const ic = (nome) => UI.icone(nome);

  /* ---------- Ícones ilustrados dos módulos (grid 32, duas camadas: preenchimento suave + traço) ---------- */
  const F = 'fill="currentColor" fill-opacity=".16" stroke="none"';
  const ICONES = {
    'primeiros-passos': `<path ${F} d="M6 26c4-1 6-4 9-7s6-5 11-5v12H6z"/><path d="M6 26c4-1 6-4 9-7s6-5 11-5"/><path d="M22 5v10"/><path d="M22 5l6 2.5-6 2.5"/><circle cx="8" cy="24.5" r="1.4"/><path d="M12 21.5l.8-.8M15.5 18.5l.8-.7M19 16l.9-.5" stroke-dasharray="0.5 2.5"/>`,
    fundacao: `<path ${F} d="M5 22l11 5 11-5-11-5z"/><path d="M5 22l11 5 11-5"/><path d="M5 17l11 5 11-5"/><path d="M5 12l11 5 11-5-11-5z"/><path d="M16 7v5" opacity=".5"/>`,
    crm: `<path ${F} d="M5 7h22l-8 10v8l-6 2V17z"/><path d="M5 7h22l-8 10v8l-6 2V17z"/><circle cx="11" cy="11" r="1.3"/><circle cx="16" cy="11" r="1.3"/><circle cx="21" cy="11" r="1.3"/><path d="M16 14.5v0"/>`,
    cem: `<rect ${F} x="3.5" y="6" width="11" height="9" rx="2"/><rect ${F} x="17.5" y="17" width="11" height="9" rx="2"/><rect x="3.5" y="6" width="11" height="9" rx="2"/><rect x="17.5" y="17" width="11" height="9" rx="2"/><path d="M9 15v4a2 2 0 0 0 2 2h6.5"/><path d="M23 17v-4a2 2 0 0 0-2-2h-6.5"/><path d="M15 19l2.5 2-2.5 2M17 9l-2.5 2 2.5 2"/>`,
    vendas: `<path ${F} d="M8 9h20l-2.5 10H10z"/><path d="M3 5h3.5L10 19h15.5L28 9H7.6"/><circle cx="12" cy="25" r="2"/><circle cx="23" cy="25" r="2"/><path d="M14 13h8M15 16h6"/>`,
    compras: `<path ${F} d="M7 11h18l-1.5 15h-15z"/><path d="M7 11h18l-1.5 15h-15z"/><path d="M12 11V8a4 4 0 0 1 8 0v3"/><path d="M16 15v6M13.5 18.5L16 21l2.5-2.5"/>`,
    recebimento: `<path ${F} d="M5 13l11-5 11 5v11l-11 5-11-5z"/><path d="M5 13l11-5 11 5v11l-11 5-11-5z"/><path d="M5 13l11 5 11-5M16 18v11"/><path d="M16 2v8M13 7l3 3 3-3"/>`,
    estoque: `<path ${F} d="M4 27V11l12-6 12 6v16z"/><path d="M4 27V11l12-6 12 6v16"/><path d="M8 27V15h16v12"/><path d="M8 20h16"/><rect x="11" y="16.5" width="4" height="3.5" rx=".5"/><rect x="17" y="21.5" width="4" height="5.5" rx=".5"/><rect x="11" y="21.5" width="4" height="5.5" rx=".5"/>`,
    producao: `<path ${F} d="M3 27V14l7 4v-4l7 4v-4l7 4V6h5v21z"/><path d="M3 27V14l7 4v-4l7 4v-4l7 4V6h5v21z"/><path d="M3 27h26"/><rect x="7" y="21" width="3" height="3" rx=".5"/><rect x="14" y="21" width="3" height="3" rx=".5"/><path d="M26.5 3v1.5" opacity=".6"/>`,
    servicos: `<path ${F} d="M19.5 5.5a6 6 0 0 0-7.6 7.6L4.6 20.4a2.6 2.6 0 0 0 3.7 3.7l7.3-7.3a6 6 0 0 0 7.6-7.6l-3.7 3.7-3.3-.4-.4-3.3z"/><path d="M19.5 5.5a6 6 0 0 0-7.6 7.6L4.6 20.4a2.6 2.6 0 0 0 3.7 3.7l7.3-7.3a6 6 0 0 0 7.6-7.6l-3.7 3.7-3.3-.4-.4-3.3z"/><circle cx="6.5" cy="22.2" r=".8"/><path d="M22 20l5 5M24.5 18.5l2 2"/>`,
    projetos: `<path ${F} d="M6 27V12l8-4v19z"/><path d="M6 27V12l8-4v19"/><path d="M14 27V15h9v12"/><path d="M3 27h26"/><path d="M9 15h2M9 19h2M9 23h2M17 19h3M17 23h3"/><path d="M23 15V4h-9M23 4l5 3M20 4v4" opacity=".75"/>`,
    expedicao: `<path ${F} d="M3 8h15v14H3zM18 13h6l4 5v4H18z"/><path d="M3 8h15v14H3z"/><path d="M18 13h6l4 5v4H18"/><circle cx="8.5" cy="23.5" r="2.5"/><circle cx="23" cy="23.5" r="2.5"/><path d="M6 12h7M6 15.5h5"/>`,
    faturamento: `<path ${F} d="M8 3h11l6 6v20H8z"/><path d="M8 3h11l6 6v20H8z"/><path d="M19 3v6h6"/><path d="M12 14h9M12 18h9M12 22h5"/><circle cx="21.5" cy="23.5" r="3.5" fill="currentColor" fill-opacity=".25"/><path d="M21.5 22v3M20.3 23.5h2.4"/>`,
    fiscal: `<path ${F} d="M7 4h18v24l-3-2-3 2-3-2-3 2-3-2-3 2z"/><path d="M7 4h18v24l-3-2-3 2-3-2-3 2-3-2-3 2z"/><circle cx="12.5" cy="11" r="1.6"/><circle cx="19.5" cy="18" r="1.6"/><path d="M20 10l-8 9"/><path d="M11 23h10" opacity=".6"/>`,
    financeiro: `<rect ${F} x="3" y="8" width="26" height="17" rx="3"/><rect x="3" y="8" width="26" height="17" rx="3"/><path d="M3 13h26"/><path d="M7 20h5"/><circle cx="23" cy="20" r="2.2"/><circle cx="20" cy="20" r="2.2"/><path d="M8 5h16" opacity=".6"/>`,
    tarefas: `<rect ${F} x="3" y="5" width="7.5" height="22" rx="1.8"/><rect x="3" y="5" width="7.5" height="22" rx="1.8"/><rect x="12.3" y="5" width="7.5" height="16" rx="1.8"/><rect x="21.5" y="5" width="7.5" height="11" rx="1.8"/><path d="M5 9.5h3.5M5 13h3.5M14.3 9.5h3.5M23.5 9.5h3.5"/><path d="M14.5 15l1.3 1.3 2.5-2.5"/>`,
    relatorios: `<rect ${F} x="4" y="4" width="24" height="24" rx="3"/><rect x="4" y="4" width="24" height="24" rx="3"/><path d="M9 23v-5M14 23v-9M19 23v-6M24 23V10"/><path d="M8 13l5-4 5 3 6-5" opacity=".7"/>`,
    alumina: `<path ${F} d="M16 3l2.6 7.4L26 13l-7.4 2.6L16 23l-2.6-7.4L6 13l7.4-2.6z"/><path d="M16 3l2.6 7.4L26 13l-7.4 2.6L16 23l-2.6-7.4L6 13l7.4-2.6z"/><path d="M25 21l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z"/><path d="M7 22l.6 1.4L9 24l-1.4.6L7 26l-.6-1.4L5 24l1.4-.6z"/>`,
    'fluxo-completo': `<circle ${F} cx="16" cy="16" r="11"/><circle cx="7" cy="9" r="3"/><circle cx="25" cy="9" r="3"/><circle cx="25" cy="23" r="3"/><circle cx="7" cy="23" r="3"/><path d="M10 9h12M25 12v8M22 23H10M7 20v-8"/><path d="M20 7.5l2 1.5-2 1.5M26.5 18l-1.5 2-1.5-2M12 24.5L10 23l2-1.5M5.5 14L7 12l1.5 2"/>`,
  };
  const SVG = 'http://www.w3.org/2000/svg';
  const cacheIc = new Map();
  /** Ícone ilustrado do módulo (SVG estático deste arquivo, nunca dado externo). */
  function iconeModulo(id) {
    const chave = ICONES[id] ? id : 'fluxo-completo';
    if (!cacheIc.has(chave)) {
      const doc = new DOMParser().parseFromString(`<svg xmlns="${SVG}">${ICONES[chave]}</svg>`, 'image/svg+xml');
      const svg = document.createElementNS(SVG, 'svg');
      for (const [k, v] of Object.entries({ viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', class: 'v3-ic' })) svg.setAttribute(k, v);
      [...doc.documentElement.childNodes].forEach((n) => svg.append(document.importNode(n, true)));
      cacheIc.set(chave, svg);
    }
    return cacheIc.get(chave).cloneNode(true);
  }

  /* ---------- Fases do processo da empresa (doc 05) ---------- */
  const FASES = [
    { id: 'comece', titulo: 'Comece aqui', texto: 'Como o sistema funciona e os cadastros que todos os módulos usam.', ids: ['primeiros-passos', 'fundacao'] },
    { id: 'comercial', titulo: 'Comercial', texto: 'Do primeiro contato com o cliente ao pedido de venda.', ids: ['crm', 'cem', 'vendas'] },
    { id: 'operacao', titulo: 'Suprimentos e operação', texto: 'Comprar, receber, guardar, produzir, instalar e entregar.', ids: ['compras', 'recebimento', 'estoque', 'producao', 'servicos', 'projetos', 'expedicao'] },
    { id: 'fiscal', titulo: 'Fiscal e financeiro', texto: 'Nota fiscal, tributos, contas a pagar e a receber.', ids: ['faturamento', 'fiscal', 'financeiro'] },
    { id: 'gestao', titulo: 'Gestão', texto: 'Acompanhar o trabalho da equipe e analisar os números.', ids: ['tarefas', 'relatorios', 'alumina'] },
    { id: 'completo', titulo: 'Visão completa', texto: 'O caminho de ponta a ponta, juntando os módulos.', ids: ['fluxo-completo'] },
  ];
  function agrupar(modulos) {
    const usados = new Set();
    const fases = FASES.map((f) => ({ ...f, mods: f.ids.map((id) => modulos.find((m) => m.id === id)).filter((m) => m && !usados.has(m.id) && usados.add(m.id)) }));
    const resto = modulos.filter((m) => !usados.has(m.id));
    if (resto.length) fases.push({ id: 'outros', titulo: 'Outros', texto: '', mods: resto });
    return fases.filter((f) => f.mods.length);
  }

  /* ---------- Materiais ---------- */
  const doMod = (m, jornada) => (m.materiais || []).filter((x) => x.jornada === jornada);
  const disponiveis = (lista) => lista.filter((x) => x.status === 'disponivel');
  const TIPO = { video: ['video', 'Vídeo'], manual: ['manual', 'Guia'], checklist: ['checklist', 'Checklist'], fluxo: ['fluxo', 'Fluxo'], tela: ['tela', 'Telas'], regra: ['regra', 'Regras'] };
  /** Estado do módulo na jornada (dados reais: materiais publicados + progresso salvo do checklist). */
  function estadoDe(m, jornada, progresso) {
    const mats = doMod(m, jornada);
    const p = Math.max(0, Math.min(1, Number(progresso && progresso[m.id]) || 0));
    if (m.status === 'em-preparacao' || !disponiveis(mats).length) return { id: 'preparacao', rotulo: 'Em preparação', p };
    if (jornada === 'inicial' && p >= 1) return { id: 'concluido', rotulo: 'Concluído', p };
    if (jornada === 'inicial' && p > 0) return { id: 'andamento', rotulo: `${Math.round(p * 100)}% concluído`, p };
    return { id: 'disponivel', rotulo: 'Disponível', p };
  }
  /** Para onde o material leva: âncora interna, página de checklist ou a página de leitura do módulo (vídeos). */
  function destinoMaterial(mat, m) {
    if (mat.status !== 'disponivel') return null;
    const u = txt(mat.url);
    if (u.startsWith('#')) return u;
    if (u.startsWith('/checklists/')) return u;
    return `#${mat.jornada}/${m.id}`;
  }

  /* ---------- Movimento: revelar ao entrar na tela, barras de progresso que enchem ---------- */
  function revelar(raiz, seletor) {
    const itens = [...raiz.querySelectorAll(seletor)];
    if (reduzido() || !('IntersectionObserver' in window)) { itens.forEach((e) => e.setAttribute('data-v3-visto', '')); return; }
    raiz.setAttribute('data-v3-anima', '');
    let lote = 0, zerar = 0;
    const io = new IntersectionObserver((ents) => {
      ents.filter((e) => e.isIntersecting).forEach((e) => {
        io.unobserve(e.target);
        const atraso = Math.min(lote++, 8) * 55;
        clearTimeout(zerar); zerar = setTimeout(() => { lote = 0; }, 140);
        setTimeout(() => e.target.setAttribute('data-v3-visto', ''), atraso);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    itens.forEach((e) => io.observe(e));
  }
  function barra(p, rotulo) {
    const pc = Math.round(Math.max(0, Math.min(1, p)) * 100);
    const preenchida = h('span', { className: 'v3-barra__fill' });
    preenchida.style.setProperty('--p', String(pc / 100));
    return h('span', { className: 'v3-barra', attrs: { role: 'progressbar', 'aria-label': rotulo, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pc } }, preenchida);
  }
  /** Navega com View Transition (quando há), mantendo o roteador único (hash). */
  function irPara(origem, href) {
    if (!href) return;
    if (href.startsWith('#')) UI.transicao(origem, () => { location.hash = href; });
    else window.location.assign(href);
  }
  const fundoVivo = () => h('div', { className: 'v3-fundo', attrs: { 'aria-hidden': 'true' } },
    h('span', { className: 'v3-fundo__luz v3-fundo__luz--a' }), h('span', { className: 'v3-fundo__luz v3-fundo__luz--b' }), h('span', { className: 'v3-fundo__luz v3-fundo__luz--c' }),
    (() => {
      const svg = document.createElementNS(SVG, 'svg');
      svg.setAttribute('viewBox', '0 0 1200 400'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('class', 'v3-fundo__fios');
      ['M-20 300 C 200 220, 380 360, 600 260 S 980 120, 1220 200', 'M-20 340 C 240 280, 420 400, 660 300 S 1000 180, 1220 260', 'M-20 120 C 180 60, 420 180, 640 110 S 1020 20, 1220 80'].forEach((d, i) => {
        const p = document.createElementNS(SVG, 'path'); p.setAttribute('d', d); p.setAttribute('class', `v3-fio v3-fio--${i + 1}`); svg.append(p);
      });
      return svg;
    })());

  /* ======================================================================
     PÁGINA INICIAL — vitrine dos módulos
     ====================================================================== */
  function renderPaginaInicial(el, resumo, opcoes = {}) {
    el.classList.add('pl-raiz', 'v3', 'v3-inicio');
    el.classList.remove('pl-escuro', 'pl-inicio');
    if (resumo == null) { UI.estadoCarregando(el, { tipo: 'cards', texto: 'Carregando módulos…' }); return; }
    if (resumo.erro) { UI.estadoErro(el, { mensagem: resumo.erro.mensagem, status: resumo.erro.status, onTentar: opcoes.onTentar }); return; }
    const modulos = [...(resumo.modulos || [])].sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));
    if (!modulos.length) { UI.estadoVazio(el, 'Seu perfil ainda não tem módulos liberados. Peça ao administrador para revisar a visibilidade.'); return; }
    el.replaceChildren();
    el.removeAttribute('aria-busy');
    const progresso = opcoes.progresso || {};
    const tot = (j) => modulos.reduce((s, m) => s + doMod(m, j).length, 0);
    const disp = (j) => modulos.reduce((s, m) => s + disponiveis(doMod(m, j)).length, 0);
    const permitida = (j) => !(window.Plataforma && window.Plataforma.lerRota) || window.Plataforma.lerRota(`#${j}`).area === j;
    const idH1 = uid('v3-h1');
    el.setAttribute('aria-labelledby', idH1);

    const caminho = (j) => {
      const inicial = j === 'inicial';
      return h('a', { className: `v3-caminho v3-caminho--${j}`, attrs: { href: `#${j}` }, on: { click: (e) => { e.preventDefault(); irPara(e.currentTarget, `#${j}`); } } },
        h('span', { className: 'v3-caminho__ic' }, ic(inicial ? 'primeiros-passos' : 'manual')),
        h('span', { className: 'v3-caminho__txt' },
          h('strong', { text: inicial ? 'Guia Inicial' : 'Guia do Consultor' }),
          h('span', { text: inicial ? 'Para quem está começando: conceitos, telas guiadas e checklist por módulo.' : 'Para quem implanta: regras com fonte, configurações, validações e erros comuns.' }),
          h('small', null, h('b', { text: disp(j) }), ` de ${tot(j)} materiais publicados`)),
        h('span', { className: 'v3-caminho__seta' }, ic('seta')));
    };

    const hero = h('header', { className: 'v3-hero' }, fundoVivo(),
      h('div', { className: 'v3-hero__conteudo' },
        h('h1', { className: 'v3-hero__titulo', id: idH1 }, 'Aprenda o ', h('span', { className: 'v3-marca', text: 'Faktory Flow' }), ' do seu jeito'),
        h('p', { className: 'v3-hero__texto', text: 'Escolha um caminho de aprendizagem ou explore um módulo. Cada módulo reúne, num só lugar, o que o iniciante precisa para usar e o que o consultor precisa para implantar.' }),
        h('div', { className: 'v3-caminhos' }, ['inicial', 'consultor'].filter(permitida).map(caminho))));

    const fases = agrupar(modulos);
    const idsFase = new Map(fases.map((f) => [f.id, uid(`v3-fase-${f.id}`)]));
    const navFases = h('nav', { className: 'v3-fases-nav', attrs: { 'aria-label': 'Fases do processo' } },
      h('ol', null, fases.map((f, i) => h('li', null, h('a', { attrs: { href: `#${idsFase.get(f.id)}` }, on: { click: (e) => { e.preventDefault(); const alvo = document.getElementById(idsFase.get(f.id)); alvo && alvo.scrollIntoView({ behavior: reduzido() ? 'auto' : 'smooth', block: 'start' }); } } },
        h('span', { className: 'v3-fases-nav__n', text: i + 1 }), h('span', { text: f.titulo }),
        h('span', { className: 'v3-fases-nav__pontos', attrs: { 'aria-hidden': 'true' } }, f.mods.map((m) => h('i', { style: { '--c': corValida(m.cor) } }))))))));

    const card = (m) => {
      const ini = doMod(m, 'inicial'), con = doMod(m, 'consultor');
      const est = estadoDe(m, 'inicial', progresso);
      const href = `#inicio/${encodeURIComponent(m.id)}`;
      return h('li', { className: 'v3-item' }, h('a', {
        className: 'v3-card', attrs: { href }, data: { estado: est.id }, style: { '--c': corValida(m.cor) },
        on: { click: (e) => { e.preventDefault(); irPara(e.currentTarget.querySelector('.v3-card__ic'), href); } }
      },
      h('span', { className: 'v3-card__brilho', attrs: { 'aria-hidden': 'true' } }),
      h('span', { className: 'v3-card__topo' },
        h('span', { className: 'v3-card__ic' }, iconeModulo(m.id)),
        est.id === 'preparacao' ? h('span', { className: 'v3-selo v3-selo--prep' }, ic('relogio'), 'Em preparação')
          : est.id === 'concluido' ? h('span', { className: 'v3-selo v3-selo--ok' }, ic('checklist'), 'Concluído')
            : est.id === 'andamento' ? h('span', { className: 'v3-selo v3-selo--andamento', text: est.rotulo }) : null),
      h('span', { className: 'v3-card__titulo', text: m.titulo }),
      m.subtitulo ? h('span', { className: 'v3-card__sub', text: m.subtitulo }) : null,
      h('span', { className: 'v3-card__rodape' },
        h('span', { className: 'v3-card__meta' }, h('i', { className: 'v3-ponto v3-ponto--inicial' }), h('span', null, h('b', { text: disponiveis(ini).length }), ` de ${ini.length} · Inicial`)),
        h('span', { className: 'v3-card__meta' }, h('i', { className: 'v3-ponto v3-ponto--consultor' }), h('span', null, h('b', { text: disponiveis(con).length }), ` de ${con.length} · Consultor`)),
        h('span', { className: 'v3-card__seta', attrs: { 'aria-hidden': 'true' } }, ic('seta'))),
      est.p > 0 ? barra(est.p, `Progresso em ${m.titulo}`) : null));
    };

    const vitrine = h('section', { className: 'v3-vitrine', attrs: { 'aria-labelledby': uid('v3-vit') } },
      h('div', { className: 'v3-secao-cab' },
        h('h2', { id: el.getAttribute('aria-labelledby') + '-vit', text: 'Explore os módulos' }),
        h('p', { text: 'Organizados na ordem em que a empresa trabalha. Clique em um módulo para ver tudo o que existe sobre ele.' })),
      navFases,
      fases.map((f) => h('section', { className: 'v3-fase', id: idsFase.get(f.id), attrs: { 'aria-labelledby': `${idsFase.get(f.id)}-t`, tabindex: -1 } },
        h('div', { className: 'v3-fase__cab' }, h('h3', { id: `${idsFase.get(f.id)}-t`, text: f.titulo }), f.texto ? h('p', { text: f.texto }) : null),
        h('ul', { className: 'v3-grade' }, f.mods.map(card)))));
    vitrine.setAttribute('aria-labelledby', `${idH1}-vit`);
    vitrine.querySelector('h2').id = `${idH1}-vit`;

    el.append(hero, vitrine);
    revelar(el, '.v3-item, .v3-fase__cab, .v3-caminho');
  }

  /* ======================================================================
     PÁGINA DO MÓDULO — hub com as duas jornadas
     ====================================================================== */
  function renderHubModulo(el, modulo, opcoes = {}) {
    el.classList.add('pl-raiz', 'v3', 'v3-hub');
    el.classList.remove('pl-escuro', 'pl-inicio');
    if (modulo == null) { UI.estadoCarregando(el, { tipo: 'lista', texto: 'Carregando módulo…' }); return; }
    if (modulo.erro) { UI.estadoErro(el, { mensagem: modulo.erro.mensagem, status: modulo.erro.status, onTentar: opcoes.onTentar }); return; }
    el.replaceChildren();
    el.removeAttribute('aria-busy');
    const m = modulo;
    const cor = corValida(m.cor);
    const progresso = opcoes.progresso || {};
    const permitida = (j) => !(window.Plataforma && window.Plataforma.lerRota) || window.Plataforma.lerRota(`#${j}`).area === j;

    const fase = FASES.find((f) => f.ids.includes(m.id));
    const hero = h('header', { className: 'v3-hub__hero', style: { '--c': cor } },
      h('span', { className: 'v3-hub__marca', attrs: { 'aria-hidden': 'true' } }, iconeModulo(m.id)),
      h('span', { className: 'v3-hub__ic' }, iconeModulo(m.id)),
      h('div', { className: 'v3-hub__nomes' },
        h('h1', { className: 'v3-hub__titulo', text: m.titulo }),
        m.subtitulo ? h('p', { className: 'v3-hub__sub', text: m.subtitulo }) : null,
        fase ? h('p', { className: 'v3-hub__fase' }, 'Fase ', h('b', { text: fase.titulo }), ` · ${fase.texto}`) : null));

    const coluna = (j) => {
      const inicial = j === 'inicial';
      const mats = doMod(m, j);
      const est = estadoDe(m, j, progresso);
      const idT = uid('v3-col');
      const item = (mat) => {
        const destino = destinoMaterial(mat, m);
        const [nomeIc, nomeTipo] = TIPO[mat.tipo] || ['manual', 'Material'];
        const dentro = [h('span', { className: 'v3-mat__ic' }, ic(nomeIc)),
          h('span', { className: 'v3-mat__txt' }, h('strong', { text: mat.titulo }), h('small', { text: nomeTipo })),
          mat.status === 'disponivel' ? h('span', { className: 'v3-mat__ir', attrs: { 'aria-hidden': 'true' } }, ic('seta')) : h('span', { className: 'v3-selo v3-selo--prep' }, ic('relogio'), 'Em preparação')];
        return h('li', null, destino
          ? h('a', { className: 'v3-mat', attrs: { href: destino }, on: { click: (e) => { if (destino.startsWith('#')) { e.preventDefault(); irPara(e.currentTarget, destino); } } } }, dentro)
          : h('div', { className: 'v3-mat', data: { prep: true } }, dentro));
      };
      const principal = `#${j}/${encodeURIComponent(m.id)}`;
      return h('section', { className: `v3-col v3-col--${j}`, attrs: { 'aria-labelledby': idT } },
        h('div', { className: 'v3-col__cab' },
          h('span', { className: 'v3-col__ic' }, ic(inicial ? 'primeiros-passos' : 'manual')),
          h('div', null, h('h2', { id: idT, text: inicial ? 'Guia Inicial' : 'Guia do Consultor' }), h('p', { text: inicial ? 'Conhecer e usar o módulo, passo a passo.' : 'Implantar, configurar, validar e orientar o cliente.' }))),
        inicial ? h('div', { className: 'v3-col__prog' }, h('span', { text: est.id === 'preparacao' ? 'Materiais em preparação' : `Seu progresso: ${Math.round(est.p * 100)}%` }), barra(est.p, `Progresso no Guia Inicial de ${m.titulo}`)) : null,
        h('ul', { className: 'v3-mats' }, mats.length ? mats.map(item) : h('li', null, h('div', { className: 'v3-mat', data: { prep: true } }, h('span', { className: 'v3-mat__ic' }, ic('relogio')), h('span', { className: 'v3-mat__txt' }, h('strong', { text: 'Materiais em preparação' }))))),
        est.id !== 'preparacao'
          ? h('a', { className: `v3-botao ${inicial ? 'v3-botao--primario' : 'v3-botao--secundario'}`, attrs: { href: principal }, on: { click: (e) => { e.preventDefault(); irPara(e.currentTarget, principal); } } },
            inicial ? (est.p > 0 ? 'Continuar estudando' : 'Começar pelo Guia Inicial') : 'Abrir no Guia do Consultor', ic('seta'))
          : null);
    };
    const colunas = h('div', { className: 'v3-hub__colunas' }, ['inicial', 'consultor'].filter(permitida).map(coluna));

    // Navegação para os vizinhos na ordem da trilha (dados do resumo).
    const lista = (opcoes.modulos || []).slice().sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));
    const i = lista.findIndex((x) => x.id === m.id);
    const viz = (x, rot) => (x ? h('a', { className: 'v3-viz', attrs: { href: `#inicio/${encodeURIComponent(x.id)}` }, style: { '--c': corValida(x.cor) },
      on: { click: (e) => { e.preventDefault(); irPara(e.currentTarget, `#inicio/${encodeURIComponent(x.id)}`); } } },
    h('small', { text: rot }), h('span', { className: 'v3-viz__ic' }, iconeModulo(x.id)), h('strong', { text: x.titulo })) : h('span'));
    const vizinhos = i >= 0 ? h('nav', { className: 'v3-vizinhos', attrs: { 'aria-label': 'Outros módulos' } }, viz(lista[i - 1], 'Módulo anterior'), viz(lista[i + 1], 'Próximo módulo')) : null;

    el.append(...[hero, colunas, vizinhos].filter(Boolean));
    revelar(el, '.v3-col, .v3-mats li, .v3-viz');
  }

  /* ======================================================================
     JORNADAS — Guia Inicial (trilha com progresso) e Guia do Consultor (índice)
     ====================================================================== */
  function renderJornada(el, { jornada = 'inicial', modulos, progresso = {}, erro, onTentar } = {}) {
    el.classList.add('pl-raiz', 'v3', 'v3-jornada', `v3-jornada--${jornada}`);
    el.classList.remove('pl-claro', 'pl-jornada');
    if (erro) { UI.estadoErro(el, { mensagem: erro.mensagem, status: erro.status, onTentar }); return; }
    if (modulos == null) { UI.estadoCarregando(el, { tipo: 'lista', texto: 'Carregando…' }); return; }
    const lista = [...modulos].sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));
    if (!lista.length) { UI.estadoVazio(el, 'Seu perfil ainda não tem módulos liberados nesta jornada.'); return; }
    el.replaceChildren();
    el.removeAttribute('aria-busy');
    const inicial = jornada === 'inicial';
    const estados = new Map(lista.map((m) => [m.id, estadoDe(m, jornada, progresso)]));
    const ativos = lista.filter((m) => estados.get(m.id).id !== 'preparacao');
    const concl = lista.filter((m) => estados.get(m.id).id === 'concluido').length;
    const andam = lista.filter((m) => estados.get(m.id).id === 'andamento').length;
    const media = ativos.length ? ativos.reduce((s, m) => s + estados.get(m.id).p, 0) / ativos.length : 0;
    const proximo = inicial ? (lista.find((m) => estados.get(m.id).id === 'andamento') || lista.find((m) => estados.get(m.id).id === 'disponivel')) : null;
    const idH1 = uid('v3-j');

    const hero = h('header', { className: 'v3-jhero' }, fundoVivo(),
      h('div', { className: 'v3-jhero__conteudo' },
        h('h1', { id: idH1, text: inicial ? 'Guia Inicial' : 'Guia do Consultor' }),
        h('p', { className: 'v3-jhero__texto', text: inicial
          ? 'Sua trilha de capacitação no Faktory Flow, na ordem em que a empresa trabalha. Em cada módulo: o conceito, as telas guiadas com imagens e um checklist para marcar o que você já domina.'
          : 'A central de quem implanta: regras de negócio com fonte, configurações, fluxos, validações e os erros que mais aparecem em cada módulo.' }),
        inicial ? h('dl', { className: 'v3-numeros' },
          h('div', null, h('dt', { text: 'Concluídos' }), h('dd', { text: concl })),
          h('div', null, h('dt', { text: 'Em andamento' }), h('dd', { text: andam })),
          h('div', null, h('dt', { text: 'Disponíveis para estudar' }), h('dd', { text: ativos.length })),
          h('div', { className: 'v3-numeros__barra' }, h('dt', { text: `Progresso na trilha: ${Math.round(media * 100)}%` }), h('dd', null, barra(media, 'Progresso na trilha'))))
          : h('label', { className: 'v3-busca' }, ic('busca'), h('span', { className: 'pl-sr', text: 'Filtrar módulos' }),
            h('input', { attrs: { type: 'search', placeholder: 'Filtrar módulos (ex.: estoque, nota, pedido)', autocomplete: 'off' } }))));

    // Próximo passo recomendado (Guia Inicial): o primeiro em andamento; senão o primeiro disponível.
    let destaque = null;
    if (proximo) {
      const e = estados.get(proximo.id);
      const mats = disponiveis(doMod(proximo, 'inicial'));
      const href = `#inicial/${encodeURIComponent(proximo.id)}`;
      destaque = h('a', { className: 'v3-proximo', attrs: { href }, style: { '--c': corValida(proximo.cor) }, on: { click: (ev) => { ev.preventDefault(); irPara(ev.currentTarget.querySelector('.v3-proximo__ic'), href); } } },
        h('span', { className: 'v3-proximo__ic' }, iconeModulo(proximo.id)),
        h('span', { className: 'v3-proximo__txt' },
          h('small', { text: e.id === 'andamento' ? 'Continue de onde parou' : 'Seu próximo passo' }),
          h('strong', { text: proximo.titulo }),
          proximo.subtitulo ? h('span', { text: proximo.subtitulo }) : null,
          h('span', { className: 'v3-proximo__mats' }, mats.slice(0, 4).map((x) => h('span', { className: 'v3-tag' }, ic((TIPO[x.tipo] || ['manual'])[0]), (TIPO[x.tipo] || [0, 'Material'])[1])))),
        h('span', { className: 'v3-proximo__cta' }, e.id === 'andamento' ? 'Continuar' : 'Começar', ic('seta')),
        e.p > 0 ? barra(e.p, `Progresso em ${proximo.titulo}`) : null);
    }

    const etapa = (m) => {
      const e = estados.get(m.id);
      const mats = doMod(m, jornada);
      const href = `#${jornada}/${encodeURIComponent(m.id)}`;
      const tipos = ['video', 'manual', 'checklist', 'fluxo', 'regra'].map((t) => {
        const doTipo = mats.filter((x) => x.tipo === t);
        if (!doTipo.length) return null;
        const ok = doTipo.some((x) => x.status === 'disponivel');
        return h('span', { className: 'v3-tag', data: { prep: !ok } }, ic((TIPO[t] || ['manual'])[0]), TIPO[t][1], ok ? null : h('span', { className: 'pl-sr', text: ' (em preparação)' }));
      });
      return h('li', { className: 'v3-etapa', data: { estado: e.id, proximo: proximo === m, busca: `${txt(m.titulo)} ${txt(m.subtitulo)} ${m.id}`.toLowerCase() }, style: { '--c': corValida(m.cor) } },
        h('span', { className: 'v3-etapa__no', attrs: { 'aria-hidden': 'true' } }, e.id === 'concluido' ? ic('checklist') : null),
        h('a', { className: 'v3-etapa__card', attrs: { href }, on: { click: (ev) => { ev.preventDefault(); irPara(ev.currentTarget.querySelector('.v3-etapa__ic'), href); } } },
          h('span', { className: 'v3-etapa__ic' }, iconeModulo(m.id)),
          h('span', { className: 'v3-etapa__txt' },
            h('strong', { text: m.titulo }),
            m.subtitulo ? h('span', { className: 'v3-etapa__sub', text: m.subtitulo }) : null,
            h('span', { className: 'v3-etapa__tags' }, tipos)),
          h('span', { className: 'v3-etapa__lado' },
            h('span', { className: `v3-selo v3-selo--${e.id === 'preparacao' ? 'prep' : e.id === 'concluido' ? 'ok' : e.id === 'andamento' ? 'andamento' : 'disp'}` }, e.id === 'preparacao' ? ic('relogio') : null,
              inicial ? e.rotulo : (e.id === 'preparacao' ? 'Em preparação' : `${disponiveis(mats).length} de ${mats.length} publicados`)),
            inicial && e.p > 0 ? barra(e.p, `Progresso em ${m.titulo}`) : null),
          h('span', { className: 'v3-etapa__seta', attrs: { 'aria-hidden': 'true' } }, ic('seta'))));
    };
    const fases = agrupar(lista);
    const trilha = h('ol', { className: 'v3-trilha' }, fases.map((f, i) => h('li', { className: 'v3-tfase' },
      h('div', { className: 'v3-tfase__cab' }, h('span', { className: 'v3-tfase__n', attrs: { 'aria-hidden': 'true' }, text: i + 1 }),
        h('div', null, h('h2', { text: f.titulo }), f.texto ? h('p', { text: f.texto }) : null)),
      h('ol', { className: 'v3-etapas' }, f.mods.map(etapa)))));
    const vazioBusca = h('p', { className: 'v3-vazio', attrs: { hidden: true, role: 'status' }, text: 'Nenhum módulo com esse nome.' });
    el.setAttribute('aria-labelledby', idH1);
    el.append(...[hero, destaque, trilha, vazioBusca].filter(Boolean));
    const campo = el.querySelector('.v3-busca input');
    if (campo) campo.addEventListener('input', () => {
      const q = campo.value.trim().toLowerCase();
      let n = 0;
      el.querySelectorAll('.v3-etapa').forEach((li) => { const ok = !q || li.dataset.busca.includes(q); li.hidden = !ok; if (ok) n++; });
      el.querySelectorAll('.v3-tfase').forEach((f) => { f.hidden = !f.querySelector('.v3-etapa:not([hidden])'); });
      vazioBusca.hidden = n > 0;
    });
    revelar(el, '.v3-etapa, .v3-tfase__cab, .v3-proximo');
  }

  window.PlataformaV3 = Object.freeze({ renderPaginaInicial, renderHubModulo, renderJornada, iconeModulo, FASES, versao: '2026-11-06-v3' });
})();
