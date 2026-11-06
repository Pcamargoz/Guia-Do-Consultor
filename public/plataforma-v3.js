/* ==========================================================================
   Faktory Flow — Plataforma de aprendizagem v4 "linha de fluxo" (06/11/2026; o arquivo mantém o nome v3)
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

  const SVG = 'http://www.w3.org/2000/svg';
  /** Ilustração do módulo (plataforma-icones.js); sem o arquivo, cai no ícone simples da UI. */
  const iconeModulo = (id) => (window.PlataformaIcones ? window.PlataformaIcones.modulo(id) : UI.icone(id));

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

  /* ---------- Movimento ---------- */
  /** Entrada ao aparecer na tela. O conteúdo é sempre visível por padrão: a animação (WAAPI) só roda por cima,
      então um navegador lento, aba oculta ou falha de observador nunca deixa a página em branco. */
  function revelar(raiz, seletor) {
    if (reduzido() || !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    let lote = 0, zerar = 0;
    const io = new IntersectionObserver((ents) => {
      ents.filter((e) => e.isIntersecting).forEach((e) => {
        io.unobserve(e.target);
        e.target.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }],
          { duration: 620, delay: Math.min(lote++, 7) * 55, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' });
        clearTimeout(zerar); zerar = setTimeout(() => { lote = 0; }, 160);
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.04 });
    raiz.querySelectorAll(seletor).forEach((e) => io.observe(e));
  }
  function barra(p, rotulo) {
    const pc = Math.round(Math.max(0, Math.min(1, p)) * 100);
    const preenchida = h('span', { className: 'v3-barra__fill', style: { '--p': String(pc / 100) } });
    return h('span', { className: 'v3-barra', attrs: { role: 'progressbar', 'aria-label': rotulo, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pc } }, preenchida);
  }
  /** Um traço por material: cheio = publicado, vazio = em preparação. */
  function tracos(lista, rotulo) {
    const d = disponiveis(lista).length;
    return h('span', { className: 'v3-tracos' },
      h('span', { className: 'v3-tracos__nome', text: rotulo }),
      h('span', { className: 'v3-tracos__fila', attrs: { 'aria-hidden': 'true' } }, lista.map((x) => h('i', { data: { on: x.status === 'disponivel' } }))),
      h('span', { className: 'v3-tracos__n' }, h('b', { text: d }), `/${lista.length}`),
      h('span', { className: 'pl-sr', text: ` materiais publicados em ${rotulo}` }));
  }
  /** Anel de progresso real (0–1). */
  function anel(p, rotulo) {
    const pc = Math.round(Math.max(0, Math.min(1, p)) * 100);
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 120 120'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'v3-anel__svg');
    ['v3-anel__fundo', 'v3-anel__valor'].forEach((c) => {
      const k = document.createElementNS(SVG, 'circle');
      for (const [a, v] of Object.entries({ cx: 60, cy: 60, r: 52, pathLength: 100, class: c })) k.setAttribute(a, v);
      svg.append(k);
    });
    return h('span', { className: 'v3-anel', style: { '--p': String(pc) }, attrs: { role: 'img', 'aria-label': `${rotulo}: ${pc}%` } }, svg,
      h('span', { className: 'v3-anel__n', attrs: { 'aria-hidden': 'true' } }, h('b', { text: pc }), '%'));
  }
  /** Navega com View Transition (quando há), mantendo o roteador único (hash). */
  function irPara(origem, href) {
    if (!href) return;
    // Na página do módulo o palco já tem o nome da transição: repetir o nome faria o navegador cancelá-la.
    if (href.startsWith('#')) UI.transicao(document.querySelector('.v3-hub__palco') ? null : origem, () => { location.hash = href; });
    else window.location.assign(href);
  }
  const clicarIr = (href, alvo) => (e) => { e.preventDefault(); irPara(alvo ? e.currentTarget.querySelector(alvo) : e.currentTarget, href); };
  /** Marca de concluído (traço único, lê bem em tamanho pequeno). */
  function visto() {
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('viewBox', '0 0 16 16'); svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '2.4');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round'); svg.setAttribute('aria-hidden', 'true');
    const p = document.createElementNS(SVG, 'path'); p.setAttribute('d', 'M3.500 8.500l3 3 6-7'); svg.append(p);
    return svg;
  }
  const permitida = (j) => !(window.Plataforma && window.Plataforma.lerRota) || window.Plataforma.lerRota(`#${j}`).area === j;
  const hrefModulo = (id) => `#inicio/${encodeURIComponent(id)}`;

  /** Luz que acompanha o ponteiro nos cartões (só com mouse e movimento permitido). Delegado: um ouvinte por página. */
  function ligarLuz(raiz, seletor) {
    if (reduzido() || !window.matchMedia('(hover: hover)').matches) return;
    let quadro = 0;
    raiz.addEventListener('pointermove', (e) => {
      const c = e.target.closest && e.target.closest(seletor);
      if (!c || quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    }, { passive: true });
  }

  /** Fundo da página: luz suave e a grade de blocos da marca (decorativo, parado com movimento reduzido). */
  const ceu = () => h('div', { className: 'v3-ceu', attrs: { 'aria-hidden': 'true' } },
    h('span', { className: 'v3-ceu__luz v3-ceu__luz--a' }), h('span', { className: 'v3-ceu__luz v3-ceu__luz--b' }), h('span', { className: 'v3-ceu__grade' }));

  /** Linha de fases: navega entre as fases e acompanha a rolagem. Substitui a régua 00–18.
      `medidor(fase)` opcional devolve 0–1 (progresso real da fase); sem ele, mostra os módulos da fase como pontos. */
  function linhaDeFases(raiz, fases, ids, medidor) {
    const itens = new Map();
    const nav = h('nav', { className: 'v3-linha', attrs: { 'aria-label': 'Fases do processo' } },
      h('ol', null, fases.map((f, i) => {
        const a = h('a', { attrs: { href: `#${ids.get(f.id)}` }, on: { click: (e) => {
          e.preventDefault();
          const alvo = document.getElementById(ids.get(f.id));
          if (!alvo) return;
          alvo.scrollIntoView({ behavior: reduzido() ? 'auto' : 'smooth', block: 'start' });
          alvo.focus({ preventScroll: true });
        } } },
        h('span', { className: 'v3-linha__nome' }, h('span', { className: 'v3-linha__n', text: i + 1 }), h('span', { text: f.titulo })),
        medidor
          ? h('span', { className: 'v3-linha__medidor', attrs: { 'aria-hidden': 'true' } }, h('i', { style: { '--p': String(medidor(f)) } }))
          : h('span', { className: 'v3-linha__pontos', attrs: { 'aria-hidden': 'true' } }, f.mods.map((m) => h('i', { style: { '--c': corValida(m.cor) } }))));
        itens.set(f.id, a);
        return h('li', { style: { '--peso': String(f.mods.length) } }, a);
      })));
    if ('IntersectionObserver' in window) {
      const fila = nav.querySelector('ol');
      const ativar = (id) => itens.forEach((a, k) => {
        if (k === id) {
          a.setAttribute('aria-current', 'true');
          if (fila.scrollWidth > fila.clientWidth) fila.scrollTo({ left: a.parentElement.offsetLeft - 16, behavior: reduzido() ? 'auto' : 'smooth' });
        } else a.removeAttribute('aria-current');
      });
      const io = new IntersectionObserver((ents) => {
        ents.filter((e) => e.isIntersecting).forEach((e) => ativar(e.target.dataset.fase));
      }, { rootMargin: '-30% 0px -60% 0px' });
      requestAnimationFrame(() => raiz.querySelectorAll('[data-fase]').forEach((s) => io.observe(s)));
    }
    return nav;
  }

  /* ======================================================================
     PÁGINA INICIAL
     ====================================================================== */
  /** Horizonte de fábrica: cada coluna é uma fase e cada bloco um módulo real. Atalho de mouse/toque; os mesmos
      destinos existem nos cartões abaixo, por isso fica fora da ordem do teclado e do leitor de tela. */
  function horizonte(fases) {
    const padrao = 'Os módulos, fase a fase';
    const legenda = h('p', { className: 'v3-sky__legenda', text: padrao });
    let ordem = 0;
    const bloco = (m) => {
      const href = hrefModulo(m.id);
      return h('a', { className: 'v3-sky__bloco', attrs: { href, tabindex: -1 }, data: { prep: m.status === 'em-preparacao' }, style: { '--c': corValida(m.cor), '--i': String(ordem++) },
        on: { click: clicarIr(href), pointerenter: () => { legenda.textContent = m.titulo; }, pointerleave: () => { legenda.textContent = padrao; } } }, iconeModulo(m.id));
    };
    // Torres de até 4 blocos: uma fase longa vira um galpão largo, não uma coluna solta.
    const torres = (mods) => { const t = []; for (let i = 0; i < mods.length; i += 4) t.push(mods.slice(i, i + 4)); return t; };
    const colunas = fases.map((f) => h('div', { className: 'v3-sky__fase' }, torres(f.mods).map((t) => h('div', { className: 'v3-sky__col' }, t.map(bloco)))));
    return h('div', { className: 'v3-sky', attrs: { 'aria-hidden': 'true' } }, h('div', { className: 'v3-sky__cena' }, colunas), legenda);
  }

  /** Largura de cada cartão (em 6 colunas) conforme a quantidade de módulos da fase: é o que quebra a grade repetida. */
  const MOSAICO = { 1: [6], 2: [3, 3], 3: [2, 2, 2], 4: [3, 3, 3, 3], 5: [3, 3, 2, 2, 2], 6: [2, 2, 2, 2, 2, 2], 7: [3, 3, 2, 2, 2, 3, 3] };
  const larguras = (n) => MOSAICO[n] || Array(n).fill(2);

  function cartaoModulo(m, largura, progresso) {
    const ini = doMod(m, 'inicial'), con = doMod(m, 'consultor');
    const est = estadoDe(m, 'inicial', progresso);
    const href = hrefModulo(m.id);
    const selo = est.id === 'preparacao' ? h('span', { className: 'v3-selo v3-selo--prep' }, ic('relogio'), 'Em preparação')
      : est.id === 'concluido' ? h('span', { className: 'v3-selo v3-selo--ok' }, visto(), 'Concluído')
        : est.id === 'andamento' ? h('span', { className: 'v3-selo v3-selo--andamento', text: est.rotulo }) : null;
    return h('li', { className: 'v3-item', style: { '--span': String(largura) } }, h('a', {
      className: `v3-card ${largura >= 3 ? 'v3-card--largo' : ''}`, attrs: { href }, data: { estado: est.id }, style: { '--c': corValida(m.cor) }, on: { click: clicarIr(href, '.v3-card__palco') } },
    h('span', { className: 'v3-card__luz', attrs: { 'aria-hidden': 'true' } }),
    h('span', { className: 'v3-card__palco' }, iconeModulo(m.id)),
    h('span', { className: 'v3-card__corpo' },
      selo ? h('span', { className: 'v3-card__selo' }, selo) : null,
      h('span', { className: 'v3-card__titulo', text: m.titulo }),
      m.subtitulo ? h('span', { className: 'v3-card__sub', text: m.subtitulo }) : null,
      h('span', { className: 'v3-card__rodape' }, ini.length ? tracos(ini, 'Guia Inicial') : null, con.length ? tracos(con, 'Consultor') : null)),
    h('span', { className: 'v3-card__seta', attrs: { 'aria-hidden': 'true' } }, ic('seta')),
    est.p > 0 ? barra(est.p, `Progresso em ${m.titulo}`) : null));
  }

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
    const idH1 = uid('v3-h1');
    el.setAttribute('aria-labelledby', idH1);
    const fases = agrupar(modulos);
    const ids = new Map(fases.map((f) => [f.id, uid(`v3-fase-${f.id}`)]));

    const caminho = (j) => {
      const inicial = j === 'inicial';
      const href = `#${j}`;
      return h('a', { className: `v3-caminho v3-caminho--${j}`, attrs: { href }, on: { click: clicarIr(href) } },
        h('span', { className: 'v3-caminho__ic' }, ic(inicial ? 'primeiros-passos' : 'manual')),
        h('span', { className: 'v3-caminho__txt' },
          h('strong', { text: inicial ? 'Guia Inicial' : 'Guia do Consultor' }),
          h('span', { text: inicial ? 'Para quem está começando: conceitos, telas guiadas e checklist por módulo.' : 'Para quem implanta: regras com fonte, configurações, validações e erros comuns.' }),
          h('small', null, h('b', { text: disp(j) }), ` de ${tot(j)} materiais publicados`)),
        h('span', { className: 'v3-caminho__seta', attrs: { 'aria-hidden': 'true' } }, ic('seta')));
    };

    const hero = h('header', { className: 'v3-hero' },
      h('div', { className: 'v3-hero__texto' },
        h('h1', { className: 'v3-hero__titulo', id: idH1 }, 'Aprenda o ', h('span', { className: 'v3-marca', text: 'Faktory Flow' }), ' na ordem em que a empresa trabalha'),
        h('p', { className: 'v3-hero__sub', text: 'Do primeiro contato com o cliente à nota fiscal: cada módulo reúne o que o iniciante precisa para usar e o que o consultor precisa para implantar.' })),
      horizonte(fases),
      h('div', { className: 'v3-caminhos' }, ['inicial', 'consultor'].filter(permitida).map(caminho)));

    const idVit = `${idH1}-vit`;
    const vitrine = h('section', { className: 'v3-vitrine', attrs: { 'aria-labelledby': idVit } },
      h('div', { className: 'v3-secao-cab' },
        h('h2', { id: idVit, text: 'Explore os módulos' }),
        h('p', { text: 'Clique em um módulo para ver tudo o que existe sobre ele, nas duas jornadas.' })),
      linhaDeFases(el, fases, ids),
      fases.map((f, i) => {
        const w = larguras(f.mods.length);
        return h('section', { className: 'v3-fase', id: ids.get(f.id), data: { fase: f.id }, attrs: { 'aria-labelledby': `${ids.get(f.id)}-t`, tabindex: -1 } },
          h('div', { className: 'v3-fase__cab' },
            h('span', { className: 'v3-fase__n', attrs: { 'aria-hidden': 'true' }, text: i + 1 }),
            h('h3', { id: `${ids.get(f.id)}-t`, text: f.titulo }),
            f.texto ? h('p', { text: f.texto }) : null),
          h('ul', { className: 'v3-grade' }, f.mods.map((m, k) => cartaoModulo(m, w[k], progresso))));
      }));

    el.append(ceu(), hero, vitrine);
    ligarLuz(el, '.v3-card');
    revelar(el, '.v3-item, .v3-fase__cab, .v3-caminho');
  }

  /* ======================================================================
     PÁGINA DO MÓDULO — as duas jornadas
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
    const fase = FASES.find((f) => f.ids.includes(m.id));

    const hero = h('header', { className: 'v3-hub__hero', style: { '--c': cor } },
      h('div', { className: 'v3-hub__nomes' },
        fase ? h('p', { className: 'v3-hub__fase' }, h('b', { text: fase.titulo }), ` · ${fase.texto}`) : null,
        h('h1', { className: 'v3-hub__titulo', text: m.titulo }),
        m.subtitulo ? h('p', { className: 'v3-hub__sub', text: m.subtitulo }) : null),
      h('span', { className: 'v3-hub__palco' }, iconeModulo(m.id)));

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
          ? h('a', { className: `v3-botao ${inicial ? 'v3-botao--primario' : 'v3-botao--secundario'}`, attrs: { href: principal }, on: { click: clicarIr(principal) } },
            inicial ? (est.p > 0 ? 'Continuar estudando' : 'Começar pelo Guia Inicial') : 'Abrir no Guia do Consultor', ic('seta'))
          : null);
    };
    const colunas = h('div', { className: 'v3-hub__colunas' }, ['inicial', 'consultor'].filter(permitida).map(coluna));

    // Navegação para os vizinhos na ordem da trilha (dados do resumo).
    const lista = (opcoes.modulos || []).slice().sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));
    const i = lista.findIndex((x) => x.id === m.id);
    const viz = (x, rot) => (x ? h('a', { className: 'v3-viz', attrs: { href: hrefModulo(x.id) }, style: { '--c': corValida(x.cor) }, on: { click: clicarIr(hrefModulo(x.id)) } },
      h('small', { text: rot }), h('span', { className: 'v3-viz__ic' }, iconeModulo(x.id)), h('strong', { text: x.titulo })) : h('span'));
    const vizinhos = i >= 0 ? h('nav', { className: 'v3-vizinhos', attrs: { 'aria-label': 'Outros módulos' } }, viz(lista[i - 1], 'Módulo anterior'), viz(lista[i + 1], 'Próximo módulo')) : null;

    el.append(...[ceu(), hero, colunas, vizinhos].filter(Boolean));
    revelar(el, '.v3-col, .v3-mats li, .v3-viz');
  }

  /* ======================================================================
     JORNADAS — Guia Inicial (trilha com progresso) e Guia do Consultor (índice)
     ====================================================================== */
  /** Próximo passo do Guia Inicial: os materiais reais do módulo, na ordem sugerida pelo guia. */
  function missao(m, e) {
    const href = `#inicial/${encodeURIComponent(m.id)}`;
    const ordem = ['video', 'manual', 'tela', 'fluxo', 'checklist'];
    const mats = doMod(m, 'inicial').slice().sort((a, b) => ordem.indexOf(a.tipo) - ordem.indexOf(b.tipo));
    const passo = (mat) => {
      const destino = destinoMaterial(mat, m);
      const [nomeIc, nomeTipo] = TIPO[mat.tipo] || ['manual', 'Material'];
      const dentro = [h('span', { className: 'v3-passo__ic' }, ic(mat.status === 'disponivel' ? nomeIc : 'relogio')),
        h('span', { className: 'v3-passo__txt' }, h('strong', { text: nomeTipo }), h('small', { text: mat.status === 'disponivel' ? mat.titulo : 'Em preparação' }))];
      return h('li', null, destino
        ? h('a', { className: 'v3-passo', attrs: { href: destino }, on: { click: (ev) => { if (destino.startsWith('#')) { ev.preventDefault(); irPara(ev.currentTarget, destino); } } } }, dentro)
        : h('div', { className: 'v3-passo', data: { prep: true } }, dentro));
    };
    return h('section', { className: 'v3-missao', style: { '--c': corValida(m.cor) }, attrs: { 'aria-label': 'Seu próximo passo' } },
      h('span', { className: 'v3-missao__palco' }, iconeModulo(m.id)),
      h('div', { className: 'v3-missao__corpo' },
        h('p', { className: 'v3-missao__rotulo', text: e.id === 'andamento' ? 'Continue de onde parou' : 'Comece por aqui' }),
        h('h2', { text: m.titulo }),
        m.subtitulo ? h('p', { className: 'v3-missao__sub', text: m.subtitulo }) : null,
        e.p > 0 ? barra(e.p, `Progresso em ${m.titulo}`) : null,
        h('a', { className: 'v3-botao v3-botao--primario', attrs: { href }, on: { click: clicarIr(href) } }, e.id === 'andamento' ? 'Continuar estudando' : 'Começar o módulo', ic('seta'))),
      h('ol', { className: 'v3-passos' }, mats.map(passo)));
  }

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
    const fases = agrupar(lista);
    const ids = new Map(fases.map((f) => [f.id, uid(`v3-t-${f.id}`)]));
    const progressoFase = (f) => {
      const v = f.mods.filter((m) => estados.get(m.id).id !== 'preparacao');
      return v.length ? v.reduce((s, m) => s + estados.get(m.id).p, 0) / v.length : 0;
    };

    const hero = h('header', { className: 'v3-jhero' },
      h('div', { className: 'v3-jhero__texto' },
        h('h1', { id: idH1, text: inicial ? 'Guia Inicial' : 'Guia do Consultor' }),
        h('p', { className: 'v3-jhero__sub', text: inicial
          ? 'Sua trilha de capacitação no Faktory Flow, na ordem em que a empresa trabalha. Em cada módulo: o conceito, as telas guiadas e um checklist para marcar o que você já domina.'
          : 'A central de quem implanta: regras de negócio com fonte, configurações, fluxos, validações e os erros que mais aparecem em cada módulo.' }),
        inicial ? null : h('label', { className: 'v3-busca' }, ic('busca'), h('span', { className: 'pl-sr', text: 'Filtrar módulos' }),
          h('input', { attrs: { type: 'search', placeholder: 'Filtrar módulos (ex.: estoque, nota, pedido)', autocomplete: 'off' } }))),
      inicial ? h('div', { className: 'v3-placar' },
        anel(media, 'Progresso na trilha'),
        h('dl', null,
          h('div', null, h('dt', { text: 'Concluídos' }), h('dd', { text: concl })),
          h('div', null, h('dt', { text: 'Em andamento' }), h('dd', { text: andam })),
          h('div', null, h('dt', { text: 'Para estudar' }), h('dd', { text: Math.max(0, ativos.length - concl - andam) })))) : null);

    const etapa = (m, posicao) => {
      const e = estados.get(m.id);
      const mats = doMod(m, jornada);
      const href = `#${jornada}/${encodeURIComponent(m.id)}`;
      const tipos = ['video', 'manual', 'checklist', 'fluxo', 'regra'].map((t) => {
        const doTipo = mats.filter((x) => x.tipo === t);
        if (!doTipo.length) return null;
        const ok = doTipo.some((x) => x.status === 'disponivel');
        return h('span', { className: 'v3-tag', data: { prep: !ok } }, ic(ok ? (TIPO[t] || ['manual'])[0] : 'relogio'), TIPO[t][1], ok ? null : h('span', { className: 'pl-sr', text: ' (em preparação)' }));
      });
      const seloId = e.id === 'preparacao' ? 'prep' : e.id === 'concluido' ? 'ok' : e.id === 'andamento' ? 'andamento' : 'disp';
      return h('li', { className: 'v3-etapa', data: { estado: e.id, proximo: proximo === m, busca: `${txt(m.titulo)} ${txt(m.subtitulo)} ${m.id}`.toLowerCase() }, style: { '--c': corValida(m.cor), '--r': String(posicao + 1), '--p': String(Math.round(e.p * 100)) } },
        h('span', { className: 'v3-etapa__no', attrs: { 'aria-hidden': 'true' } }, e.id === 'concluido' ? visto() : e.id === 'preparacao' ? ic('relogio') : null),
        h('a', { className: 'v3-etapa__card', attrs: { href }, on: { click: clicarIr(href, '.v3-etapa__palco') } },
          h('span', { className: 'v3-etapa__palco' }, iconeModulo(m.id)),
          h('span', { className: 'v3-etapa__txt' },
            h('strong', { text: m.titulo }),
            m.subtitulo ? h('span', { className: 'v3-etapa__sub', text: m.subtitulo }) : null,
            h('span', { className: 'v3-etapa__tags' }, tipos),
            h('span', { className: 'v3-etapa__estado' },
              h('span', { className: `v3-selo v3-selo--${seloId}` }, e.id === 'concluido' ? visto() : e.id === 'preparacao' ? ic('relogio') : null,
                inicial ? e.rotulo : (e.id === 'preparacao' ? 'Em preparação' : `${disponiveis(mats).length} de ${mats.length} publicados`)),
              inicial && e.p > 0 ? barra(e.p, `Progresso em ${m.titulo}`) : null)),
          h('span', { className: 'v3-etapa__seta', attrs: { 'aria-hidden': 'true' } }, ic('seta'))));
    };

    /** Fração da espinha acesa na fase: módulos concluídos em sequência, a partir do primeiro. */
    const feitoAte = (f) => {
      const i = f.mods.findIndex((m) => estados.get(m.id).id !== 'concluido');
      return i < 0 ? 1 : i / f.mods.length;
    };
    const trilha = h('ol', { className: 'v3-trilha' }, fases.map((f, i) => {
      const v = f.mods.filter((m) => estados.get(m.id).id !== 'preparacao').length;
      const c = f.mods.filter((m) => estados.get(m.id).id === 'concluido').length;
      const resumo = inicial ? (v ? `${c} de ${v} ${v === 1 ? 'módulo concluído' : 'módulos concluídos'}` : 'Em preparação') : `${f.mods.length} ${f.mods.length === 1 ? 'módulo' : 'módulos'}`;
      return h('li', { className: 'v3-tfase', id: ids.get(f.id), data: { fase: f.id, completa: inicial && v > 0 && c === v }, attrs: { tabindex: -1 } },
        h('div', { className: 'v3-tfase__cab' },
          h('span', { className: 'v3-tfase__n', attrs: { 'aria-hidden': 'true' }, text: i + 1 }),
          h('div', { className: 'v3-tfase__nomes' }, h('h2', { text: f.titulo }), f.texto ? h('p', { text: f.texto }) : null),
          h('span', { className: 'v3-tfase__resumo', text: resumo })),
        h('ol', { className: 'v3-etapas', style: { '--feito': String(feitoAte(f)) } }, f.mods.map(etapa)));
    }));

    const vazioBusca = h('p', { className: 'v3-vazio', attrs: { hidden: true, role: 'status' }, text: 'Nenhum módulo com esse nome.' });
    el.setAttribute('aria-labelledby', idH1);
    el.append(...[ceu(), hero, proximo ? missao(proximo, estados.get(proximo.id)) : null, linhaDeFases(el, fases, ids, inicial ? progressoFase : null), trilha, vazioBusca].filter(Boolean));
    const campo = el.querySelector('.v3-busca input');
    if (campo) campo.addEventListener('input', () => {
      const q = campo.value.trim().toLowerCase();
      let n = 0;
      el.querySelectorAll('.v3-etapa').forEach((li) => { const ok = !q || li.dataset.busca.includes(q); li.hidden = !ok; if (ok) n++; });
      el.querySelectorAll('.v3-tfase').forEach((f) => { f.hidden = !f.querySelector('.v3-etapa:not([hidden])'); });
      vazioBusca.hidden = n > 0;
    });
    ligarLuz(el, '.v3-etapa__card');
    revelar(el, '.v3-etapa, .v3-tfase__cab, .v3-missao');
  }

  window.PlataformaV3 = Object.freeze({ renderPaginaInicial, renderHubModulo, renderJornada, iconeModulo, FASES, versao: '2026-11-06-v4' });
})();
