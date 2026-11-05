/* ==========================================================================
   Faktory Flow — Plataforma de conhecimento: componentes de UI (FE-20261104-01)
   Segue contrato-componentes.md v1 + contrato-componentes-v2.md (Lead, 2026-11-04).
   Componentes "burros" do §4, expostos em window.PlataformaUI. Não buscam dados:
   recebem o que window.Plataforma (plataforma-dados.js) carrega e emitem
   `plataforma:abrir` {modulo, jornada}; se ninguém cancelar o evento, chamam
   Plataforma.irPara({area, modulo}) — o roteador continua único (v2 §6).
   Segurança (v2 §4): nenhum dado passa por innerHTML. Todo texto entra por
   textContent/createElement; texto inline [{t, marca, href}] vira nós; href só
   relativo ou https:. Ícones são SVG estáticos deste arquivo, montados por createElementNS.
   Sem bibliotecas, sem script inline, sem CDN (CSP script-src 'self').
   Motion: CSS (tokens --pl-spring-*) + Web Animations API + View Transitions + IntersectionObserver.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- utilitários ---------- */
  const mqReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduzido = () => mqReduzido.matches;
  const corValida = (c) => (/^#[0-9a-f]{3,8}$/i.test(String(c || '')) ? c : '');
  let seq = 0;
  const uid = (p) => `${p}-${++seq}`;
  const JORNADAS = {
    inicial: { nome: 'Guia Inicial', sub: 'Trilha de Capacitação' },
    consultor: { nome: 'Guia do Consultor', sub: 'Central avançada' }
  };
  const STATUS = { disponivel: 'Disponível', 'em-preparacao': 'Em preparação' };
  const txt = (v) => (v == null ? '' : String(v));

  /** Cria elemento. props: className, id, text, attrs{}, data{}, style{--var: v}, on{evento: fn}. Filhos: Node | string | array | null. */
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
    anexar(el, filhos);
    return el;
  }
  function anexar(el, filhos) {
    for (const f of filhos.flat(Infinity)) {
      if (f == null || f === false || f === '') continue;
      el.append(f instanceof Node ? f : document.createTextNode(String(f)));
    }
    return el;
  }

  /* ---------- URLs (v2 §4: só relativo ou https:) ---------- */
  /** Devolve a URL se for segura (relativa sem esquema, ou https:), senão null. */
  function urlSegura(v) {
    if (typeof v !== 'string') return null;
    const u = v.trim();
    if (!u || /[\u0000-\u001f\u007f\s\\]/.test(u)) return null; // controle, espaços e barra invertida
    if (u.startsWith('//')) return null;                          // relativo a protocolo = outro domínio
    if (/^[a-z][a-z0-9+.-]*:/i.test(u)) {                         // tem esquema: só https
      try { return new URL(u).protocol === 'https:' ? u : null; } catch { return null; }
    }
    return u; // relativo: /x, ./x, ../x, x.html, #x, ?x
  }
  const externa = (u) => /^https:/i.test(u) && (() => { try { return new URL(u).origin !== location.origin; } catch { return true; } })();
  function link(href, conteudo, className) {
    const seguro = urlSegura(href);
    if (!seguro) return null;
    const a = h('a', { className, attrs: { href: seguro } }, conteudo);
    if (externa(seguro)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.append(h('span', { className: 'pl-sr', text: ' (abre em nova aba)' }));
    }
    return a;
  }

  /* ---------- texto inline (v2 §4) ---------- */
  const MARCAS = { negrito: 'strong', italico: 'em', codigo: 'code' };
  /** Aceita [{t, marca?, href?}] (formato v2) ou string. Na string, **trecho** vira negrito
   *  (tolerância: os exemplos do Engineer ainda trazem "**Vendas > Pedidos**" em `regra.confirmar`). */
  function inline(valor) {
    const frag = document.createDocumentFragment();
    if (Array.isArray(valor)) {
      valor.forEach((parte) => {
        if (parte == null) return;
        if (typeof parte === 'string') { frag.append(parte); return; }
        const t = txt(parte.t);
        if (!t) return;
        const marcas = Array.isArray(parte.marca) ? parte.marca : [parte.marca];
        let no = document.createTextNode(t);
        marcas.forEach((m) => { if (MARCAS[m]) { const e = document.createElement(MARCAS[m]); e.append(no); no = e; } });
        if (parte.href || marcas.includes('link')) no = link(parte.href, no, 'pl-link') || no; // href inseguro: fica só o texto
        frag.append(no);
      });
      return frag;
    }
    const s = txt(valor);
    s.split(/(\*\*[^*]+\*\*)/g).forEach((pedaco) => {
      if (!pedaco) return;
      const m = /^\*\*([^*]+)\*\*$/.exec(pedaco);
      frag.append(m ? h('strong', { text: m[1] }) : document.createTextNode(pedaco));
    });
    return frag;
  }
  const temTexto = (v) => (Array.isArray(v) ? v.some((p) => p && txt(typeof p === 'string' ? p : p.t).trim()) : txt(v).trim() !== '');

  /* ---------- ícones (traço 2 px; os de módulo reaproveitam os do index.html) ---------- */
  const ICONES = {
    vendas: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    faturamento: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    financeiro: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    crm: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    producao: '<path d="M2 20h20"/><path d="M5 20V8l5 4V8l5 4V8l4 4v8"/>',
    compras: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    recebimento: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    estoque: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>',
    expedicao: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    servicos: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    projetos: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/>',
    fiscal: '<path d="M9 11H3v10h6V11zM21 3h-6v18h6V3zM15 7H9v14h6V7z"/>',
    relatorios: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    tarefas: '<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    alumina: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'primeiros-passos': '<path d="M4 22V4a1 1 0 0 1 1-1h11l-2 4 2 4H5"/>',
    fundacao: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    cem: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'fluxo-completo': '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h5a4 4 0 0 1 4 4v5"/>',
    _padrao: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    video: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="m10 9 5 3-5 3Z"/>',
    manual: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    checklist: '<path d="m9 11 2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="2"/>',
    fluxo: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h5a4 4 0 0 1 4 4v5"/>',
    tela: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    regra: '<path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    oculto: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>',
    seta: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    alerta: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/>',
    vazio: '<path d="M3 7h18l-2 13H5z"/><path d="M8 7V5a4 4 0 0 1 8 0v2"/>',
    tentar: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>'
  };
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const cacheIcone = new Map();
  /** SVG estático deste arquivo (nunca dado externo), parseado como XML e clonado. */
  function icone(nome) {
    const chave = ICONES[nome] ? nome : '_padrao';
    if (!cacheIcone.has(chave)) {
      const doc = new DOMParser().parseFromString(`<svg xmlns="${SVG_NS}">${ICONES[chave]}</svg>`, 'image/svg+xml');
      const svg = document.createElementNS(SVG_NS, 'svg');
      const a = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' };
      for (const [k, v] of Object.entries(a)) svg.setAttribute(k, v);
      [...doc.documentElement.childNodes].forEach((n) => svg.append(document.importNode(n, true)));
      cacheIcone.set(chave, svg);
    }
    return cacheIcone.get(chave).cloneNode(true);
  }

  const chip = (status) => {
    const prep = status === 'em-preparacao';
    return h('span', { className: `pl-chip ${prep ? 'pl-chip--prep' : 'pl-chip--ok'}` }, prep ? icone('relogio') : null, STATUS[status] || STATUS.disponivel);
  };
  const chipOculto = (texto) => h('span', { className: 'pl-chip pl-chip--oculto' }, icone('oculto'), texto || 'Oculto para os outros perfis');

  /** Emite `plataforma:abrir`; se ninguém der preventDefault, navega pelo roteador único (Plataforma.irPara). */
  function emitirAbrir(origem, detalhe) {
    transicao(origem, () => {
      const ev = new CustomEvent('plataforma:abrir', { detail: detalhe, cancelable: true });
      const seguir = window.dispatchEvent(ev);
      if (seguir && window.Plataforma && typeof window.Plataforma.irPara === 'function') {
        window.Plataforma.irPara({ area: detalhe.jornada, modulo: detalhe.modulo });
      }
    });
  }

  /** Executa `fn` dentro de uma View Transition, quando suportada e com movimento permitido.
   *  O elemento de origem recebe o nome `pl-modulo-cab`, casando com o cabeçalho do módulo. */
  function transicao(origem, fn) {
    if (!document.startViewTransition || reduzido()) { fn(); return; }
    if (origem) origem.style.viewTransitionName = 'pl-modulo-cab';
    const vt = document.startViewTransition(() => {
      if (origem) origem.style.viewTransitionName = '';
      fn();
    });
    vt.finished.catch(() => {}).finally(() => { if (origem) origem.style.viewTransitionName = ''; });
  }

  /* ---------- região aria-live compartilhada por contêiner ---------- */
  function anunciar(el, texto) {
    let st = el.querySelector(':scope > .pl-status');
    if (!st) {
      st = h('p', { className: 'pl-status pl-sr', attrs: { role: 'status', 'aria-live': 'polite' } });
      el.prepend(st);
    }
    st.textContent = '';
    window.setTimeout(() => { st.textContent = texto; }, 60); // atraso curto para o leitor de tela perceber a troca
  }
  function limpar(el, ...classes) {
    const st = el.querySelector(':scope > .pl-status');
    el.replaceChildren(...(st ? [st] : []));
    el.classList.add('pl-raiz', ...classes);
  }

  /* ---------- estados genéricos ---------- */
  function estadoCarregando(el, opcoes = {}) {
    const tipo = opcoes.tipo || 'cards';
    const n = opcoes.quantidade || (tipo === 'cards' ? 8 : 4);
    limpar(el);
    el.setAttribute('aria-busy', 'true');
    const esq = (mod) => h('div', { className: `pl-esq ${mod}` });
    const bloco = h('div', { attrs: { 'aria-hidden': 'true' } });
    if (tipo === 'cards') {
      anexar(bloco, [esq('pl-esq--titulo'), esq('pl-esq--linha pl-esq--curta'),
        h('ul', { className: 'pl-grade pl-grade--esq' }, Array.from({ length: n }, () => h('li', null, esq('pl-esq--card'))))]);
    } else {
      anexar(bloco, [esq('pl-esq--titulo'), Array.from({ length: n }, () => [esq('pl-esq--linha'), esq('pl-esq--linha pl-esq--curta')])]);
    }
    el.append(bloco);
    anunciar(el, opcoes.texto || 'Carregando conteúdo…');
  }

  // Títulos por status do erro do contrato ({ erro: {status, mensagem} }). A mensagem vem dos dados.
  const TITULO_ERRO = { 0: 'Sem conexão com o servidor', 400: 'Endereço inválido', 403: 'Conteúdo restrito ao seu perfil', 404: 'Conteúdo não encontrado' };
  /** @param {{mensagem?: string, status?: number, onTentar?: Function}} opcoes
   *  status 0/5xx (ou ausente): botão "Tentar de novo". 400/403/404: tentar não resolve → link para a Página Inicial. */
  function estadoErro(el, { mensagem, status, onTentar } = {}) {
    limpar(el);
    el.removeAttribute('aria-busy');
    const definitivo = [400, 403, 404].includes(Number(status));
    const caixa = h('div', { className: 'pl-aviso pl-aviso--erro', attrs: { role: 'alert' } },
      h('span', { className: 'pl-aviso__icone' }, icone('alerta')),
      h('p', { className: 'pl-aviso__titulo', text: TITULO_ERRO[status] || 'O conteúdo não carregou' }),
      h('p', { className: 'pl-aviso__texto', text: mensagem || 'A resposta do servidor não chegou. Confira sua conexão e use Tentar de novo.' }));
    if (definitivo) {
      caixa.append(h('a', { className: 'pl-botao pl-botao--primario', attrs: { href: '#inicio' } }, 'Voltar à Página Inicial'));
    } else if (typeof onTentar === 'function') {
      caixa.append(h('button', { className: 'pl-botao pl-botao--primario', attrs: { type: 'button' }, on: { click: onTentar } }, icone('tentar'), h('span', { text: 'Tentar de novo' })));
    }
    el.append(caixa);
  }

  function estadoVazio(el, texto) {
    limpar(el);
    el.removeAttribute('aria-busy');
    el.append(h('div', { className: 'pl-aviso' },
      h('span', { className: 'pl-aviso__icone' }, icone('vazio')),
      h('p', { className: 'pl-aviso__titulo', text: 'Ainda não há conteúdo para você' }),
      h('p', { className: 'pl-aviso__texto', text: texto || 'Seu perfil ainda não tem conteúdo liberado aqui.' })));
    anunciar(el, texto || 'Nenhum conteúdo disponível.');
  }

  /* ---------- card de módulo ---------- */
  const ordemFmt = (n) => (n != null && Number.isFinite(+n) ? String(+n).padStart(2, '0') : '');
  const materiaisDe = (modulo, jornada) => (modulo.materiais || []).filter((m) => m.jornada === jornada);

  /** Módulo do resumo (contrato §1 + v2): {id, ordem, titulo, subtitulo, cor, icone, status, oculto, materiais[]} */
  function renderCardModulo(modulo) {
    const cor = corValida(modulo.cor) || '#3478A7';
    const idPainel = uid('pl-painel');
    const idTitulo = uid('pl-titulo');
    const todos = modulo.materiais || [];
    const disp = todos.filter((m) => m.status === 'disponivel').length;

    const grupo = (jornada) => {
      const lista = materiaisDe(modulo, jornada);
      const itens = lista.length
        ? lista.map((m) => h('li', { className: 'pl-material' }, h('span', { className: 'pl-material__ic' }, icone(m.tipo)), h('span', { className: 'pl-material__nome', text: m.titulo }), chip(m.status)))
        : [h('li', { className: 'pl-material' }, h('span', { className: 'pl-material__ic' }, icone('relogio')), h('span', { className: 'pl-material__nome', text: 'Materiais' }), chip('em-preparacao'))];
      return h('div', { className: 'pl-painel__grupo' },
        h('button', { className: 'pl-jornada-btn', attrs: { type: 'button' }, data: { jornada } },
          h('span', null, JORNADAS[jornada].nome, h('span', { className: 'pl-sr', text: `: abrir ${txt(modulo.titulo)}` })), icone('seta')),
        h('ul', { className: 'pl-materiais', attrs: { 'aria-label': `Materiais do ${JORNADAS[jornada].nome}` } }, itens));
    };
    const medidor = h('dl', { className: 'pl-medidor' }, ['inicial', 'consultor'].map((j) => {
      const l = materiaisDe(modulo, j);
      const d = l.filter((m) => m.status === 'disponivel').length;
      return h('div', null, h('dt', { text: JORNADAS[j].nome }),
        h('dd', null, h('span', { className: 'pl-sr', text: l.length ? `${d} de ${l.length} disponíveis` : 'em preparação' }),
          h('span', { className: 'pl-pontos', attrs: { 'aria-hidden': 'true' } }, l.length ? l.map((m) => h('span', { data: { ok: m.status === 'disponivel' } })) : h('span', { data: { vazio: true } }))));
    }));
    const selos = [];
    if (modulo.status === 'em-preparacao') selos.push(chip('em-preparacao'));
    if (modulo.oculto) selos.push(chipOculto());

    const card = h('article', { className: 'pl-card', data: { modulo: modulo.id, status: modulo.status || 'disponivel', oculto: !!modulo.oculto }, style: { '--pl-cor': cor }, attrs: { 'aria-labelledby': idTitulo } },
      h('span', { className: 'pl-card__borda', attrs: { 'aria-hidden': 'true' } }),
      h('span', { className: 'pl-card__sup', attrs: { 'aria-hidden': 'true' } }, h('span', { className: 'pl-card__marca' }, icone(modulo.icone || modulo.id))),
      h('div', { className: 'pl-card__corpo' },
        h('div', { className: 'pl-card__cab' },
          h('span', { className: 'pl-card__icone' }, icone(modulo.icone || modulo.id)),
          h('div', { className: 'pl-card__nomes' },
            h('h3', { className: 'pl-card__titulo', id: idTitulo },
              h('button', { className: 'pl-card__abrir', attrs: { type: 'button', 'aria-expanded': 'false', 'aria-controls': idPainel }, text: modulo.titulo })),
            modulo.subtitulo ? h('p', { className: 'pl-card__sub', text: modulo.subtitulo }) : null),
          h('span', { className: 'pl-card__ordem', attrs: { 'aria-hidden': 'true' }, text: ordemFmt(modulo.ordem) })),
        selos.length ? h('div', { className: 'pl-card__selos' }, selos) : null,
        h('p', { className: 'pl-card__resumo' }, todos.length ? [h('strong', { text: disp }), ` de ${todos.length} materiais disponíveis`] : 'Materiais em preparação'),
        medidor),
      h('div', { className: 'pl-painel', id: idPainel, attrs: { role: 'group', 'aria-label': `Materiais de ${txt(modulo.titulo)}` } }, grupo('inicial'), grupo('consultor')));

    ligarCard(card, modulo);
    return card;
  }

  function ligarCard(card, modulo) {
    const botao = card.querySelector('.pl-card__abrir');
    const painel = card.querySelector('.pl-painel');
    let fixado = false;
    let dentro = false;

    const aplicar = () => {
      const tocar = !mqHover.matches;
      const aberto = tocar ? !card.hasAttribute('data-fechado') : (fixado || dentro || card.contains(document.activeElement));
      const antes = card.hasAttribute('data-aberto');
      card.toggleAttribute('data-aberto', aberto && !tocar);
      if (antes !== card.hasAttribute('data-aberto')) card.dispatchEvent(new CustomEvent('pl:card', { bubbles: true, detail: { modulo: modulo.id, aberto: card.hasAttribute('data-aberto') } }));
      botao.setAttribute('aria-expanded', String(aberto));
      painel.inert = !aberto;
      painel.hidden = tocar && !aberto;
    };
    card._plAplicar = aplicar;

    botao.addEventListener('click', () => {
      if (!mqHover.matches) card.toggleAttribute('data-fechado');
      else fixado = !fixado;
      aplicar();
    });
    card.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { dentro = true; aplicar(); } });
    card.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { dentro = false; aplicar(); } });
    card.addEventListener('focusin', aplicar);
    card.addEventListener('focusout', (e) => {
      if (!card.contains(e.relatedTarget)) { fixado = false; window.requestAnimationFrame(aplicar); }
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && card.hasAttribute('data-aberto')) { fixado = false; dentro = false; botao.focus(); card.toggleAttribute('data-aberto', false); botao.setAttribute('aria-expanded', 'false'); painel.inert = true; card.dispatchEvent(new CustomEvent('pl:card', { bubbles: true, detail: { modulo: modulo.id, aberto: false } })); }
    });

    // spotlight (--mx/--my) só com mouse e movimento permitido
    let quadro = 0;
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || reduzido() || quadro) return;
      quadro = window.requestAnimationFrame(() => {
        quadro = 0;
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    card.querySelectorAll('.pl-jornada-btn').forEach((b) => {
      b.addEventListener('click', () => emitirAbrir(card.querySelector('.pl-card__cab'), { modulo: modulo.id, jornada: b.dataset.jornada }));
    });
    aplicar();
  }

  /* ---------- teclado na grade (setas, Home/End) com tabindex itinerante ---------- */
  function ligarGrade(grade) {
    const botoes = () => [...grade.querySelectorAll('.pl-card__abrir')];
    const colunas = () => getComputedStyle(grade).gridTemplateColumns.split(' ').filter(Boolean).length || 1;
    botoes().forEach((b, i) => { b.tabIndex = i === 0 ? 0 : -1; });
    grade.addEventListener('focusin', (e) => {
      if (!e.target.classList.contains('pl-card__abrir')) return;
      botoes().forEach((b) => { b.tabIndex = b === e.target ? 0 : -1; });
    });
    grade.addEventListener('keydown', (e) => {
      if (!e.target.classList.contains('pl-card__abrir')) return;
      const lista = botoes();
      const i = lista.indexOf(e.target);
      const c = colunas();
      const destino = { ArrowRight: i + 1, ArrowLeft: i - 1, ArrowDown: i + c, ArrowUp: i - c, Home: 0, End: lista.length - 1 }[e.key];
      if (destino === undefined) return;
      e.preventDefault();
      const alvo = lista[Math.max(0, Math.min(lista.length - 1, destino))];
      if (alvo) alvo.focus();
    });
  }

  /* ---------- entrada escalonada (IntersectionObserver + WAAPI) ---------- */
  // Card com hover: o painel sobe por cima do resumo. Cada card ganha altura mínima = cabeçalho + painel
  // (a linha da grade estica até o maior card dela), assim o painel nunca cobre o título.
  function alturas(grade) {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      grade.querySelectorAll('.pl-card').forEach((card) => {
        if (!mqHover.matches) { card.style.removeProperty('--pl-card-min'); return; }
        const cab = card.querySelector('.pl-card__cab');
        const painel = card.querySelector('.pl-painel');
        if (cab && painel) card.style.setProperty('--pl-card-min', `${Math.ceil(cab.offsetTop + cab.offsetHeight + 10 + painel.offsetHeight)}px`);
      });
    };
    const agendar = () => { if (!quadro) quadro = requestAnimationFrame(medir); };
    medir();
    if ('ResizeObserver' in window) new ResizeObserver(agendar).observe(grade);
    mqHover.addEventListener?.('change', agendar);
    document.fonts?.ready.then(agendar);
  }
  const tokenCss = (nome, padrao) => getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || padrao;
  let easingOk = null;
  function easingMola(nome) { // linear() do token; cai para cubic-bezier se o navegador não aceitar
    const v = tokenCss(`--pl-spring-${nome}`, '');
    if (easingOk === null) { try { document.createElement('div').animate([], { duration: 1, easing: v || 'x' }); easingOk = true; } catch { easingOk = false; } }
    return easingOk && v ? v : tokenCss('--pl-spring-fallback', 'ease-out');
  }
  function entrada(grade, rota) {
    const cards = [...grade.querySelectorAll('.pl-card')];
    if (reduzido() || !('IntersectionObserver' in window) || !Element.prototype.animate) {
      cards.forEach((c) => c.setAttribute('data-visto', ''));
      return;
    }
    if (rota) {
      rota.setAttribute('data-entrada', '');
      [...rota.children].forEach((li, i) => li.firstElementChild.animate(
        [{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'none' }],
        { duration: parseInt(tokenCss('--pl-spring-rapida-dur', '480'), 10), delay: 120 + i * 40, easing: easingMola('rapida'), fill: 'backwards' }));
    }
    const durMedia = parseInt(tokenCss('--pl-spring-media-dur', '770'), 10);
    grade.setAttribute('data-entrada', '');
    let lote = 0;
    let zerar = 0;
    const io = new IntersectionObserver((entradas) => {
      entradas.filter((en) => en.isIntersecting).forEach((en) => {
        const c = en.target;
        io.unobserve(c);
        const atraso = lote++ * 40; // stagger 40 ms dentro de cada lote visível
        window.clearTimeout(zerar);
        zerar = window.setTimeout(() => { lote = 0; }, 120);
        const anim = c.animate(
          [{ opacity: 0, transform: 'translateY(18px) scale(.98)' }, { opacity: 1, transform: 'none' }],
          { duration: durMedia, delay: atraso, easing: easingMola('media'), fill: 'backwards' }
        );
        c.setAttribute('data-visto', '');
        anim.finished.catch(() => {});
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
    cards.forEach((c) => io.observe(c));
  }

  /* ---------- Página Inicial ---------- */
  /**
   * @param {HTMLElement} el contêiner
   * @param {object|null|undefined} resumo Resumo (contrato §1/v2); null/undefined = carregando;
   *        { erro: {status, mensagem} } = erro; { modulos: [] } = vazio.
   * @param {{onTentar?: Function}} [opcoes]
   */
  function renderPaginaInicial(el, resumo, opcoes = {}) {
    el.classList.add('pl-raiz', 'pl-escuro', 'pl-inicio');
    if (resumo == null) { estadoCarregando(el, { tipo: 'cards', texto: 'Carregando módulos…' }); return; }
    if (resumo.erro) {
      estadoErro(el, { mensagem: resumo.erro.mensagem, status: resumo.erro.status, onTentar: opcoes.onTentar || (() => window.dispatchEvent(new CustomEvent('plataforma:tentar', { detail: { area: 'inicio' } }))) });
      return;
    }
    const modulos = [...(resumo.modulos || [])].sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));
    if (!modulos.length) { estadoVazio(el, 'Seu perfil ainda não tem módulos liberados. Peça ao administrador para revisar a visibilidade.'); return; }

    limpar(el);
    el.removeAttribute('aria-busy');
    const total = modulos.reduce((s, m) => s + (m.materiais || []).length, 0);
    const disp = modulos.reduce((s, m) => s + (m.materiais || []).filter((x) => x.status === 'disponivel').length, 0);
    const idH1 = uid('pl-h1');
    el.setAttribute('aria-labelledby', idH1);

    const hero = h('header', { className: 'pl-hero' },
      h('span', { className: 'pl-hero__selo', text: 'Faktory Flow' }),
      h('h1', { className: 'pl-hero__titulo', id: idH1, text: 'Página Inicial' }),
      h('p', { className: 'pl-hero__texto', text: 'Escolha um módulo para começar pelo Guia Inicial ou aprofundar no Guia do Consultor.' }),
      h('p', { className: 'pl-hero__numeros' }, h('strong', { text: modulos.length }), ' módulos, ', h('strong', { text: disp }), ' materiais disponíveis e ', h('strong', { text: total - disp }), ' em preparação.'));
    // Rota da trilha: decorativa (aria-hidden); a grade abaixo traz a mesma ordem de forma acessível.
    const rota = h('ol', { className: 'pl-rota', attrs: { 'aria-hidden': 'true' }, style: { '--n': modulos.length } },
      modulos.map((m) => h('li', { data: { modulo: m.id, prep: m.status === 'em-preparacao' }, style: { '--pl-cor': corValida(m.cor) || '#3478A7' } },
        h('span', { className: 'pl-rota__no' }), h('span', { className: 'pl-rota__num', text: ordemFmt(m.ordem) }))));
    const grade = h('ul', { className: 'pl-grade', attrs: { 'aria-label': 'Módulos' } }, modulos.map((m) => h('li', null, renderCardModulo(m))));
    el.append(hero, rota, grade);
    ligarGrade(grade);
    const nos = new Map([...rota.children].map((li) => [li.dataset.modulo, li]));
    grade.addEventListener('pl:card', (e) => { const li = nos.get(e.detail.modulo); if (li) li.toggleAttribute('data-ativo', e.detail.aberto); });
    alturas(grade);
    entrada(grade, rota);
    anunciar(el, `${modulos.length} módulos carregados.`);
  }

  /* ---------- Jornada (Guia Inicial / Guia do Consultor) ---------- */
  /** @param {{jornada:'inicial'|'consultor', modulos?: object[]|null, progresso?: Record<string, number>, erro?: {status, mensagem}, onTentar?: Function}} p */
  function renderJornada(el, { jornada = 'inicial', modulos, progresso = {}, erro, onTentar } = {}) {
    if (!JORNADAS[jornada]) jornada = 'inicial';
    el.classList.add('pl-raiz', 'pl-claro', 'pl-jornada');
    if (erro) { estadoErro(el, { mensagem: erro.mensagem, status: erro.status, onTentar }); return; }
    if (modulos == null) { estadoCarregando(el, { tipo: 'lista', texto: `Carregando ${JORNADAS[jornada].nome}…` }); return; }
    const lista = [...modulos].sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));
    if (!lista.length) { estadoVazio(el, 'Seu perfil ainda não tem módulos liberados nesta jornada.'); return; }
    limpar(el);
    el.removeAttribute('aria-busy');
    const cab = h('header', { className: 'pl-jornada__cab' },
      h('span', { className: 'pl-sobretitulo', text: JORNADAS[jornada].sub }),
      h('h1', { className: 'pl-jornada__titulo', text: JORNADAS[jornada].nome }));
    const ol = h('ol', { className: 'pl-trilha' }, lista.map((m) => {
      const mats = materiaisDe(m, jornada);
      const disp = mats.filter((x) => x.status === 'disponivel').length;
      const p = Math.max(0, Math.min(1, Number(progresso[m.id]) || 0));
      const pct = Math.round(p * 100);
      const icon = h('span', { className: 'pl-passo__icone' }, icone(m.icone || m.id));
      const barra = h('span');
      barra.style.setProperty('--p', String(p));
      const prep = m.status === 'em-preparacao' || !mats.length;
      return h('li', { className: 'pl-passo', style: { '--pl-cor': corValida(m.cor) || '#3478A7' }, data: { status: prep ? 'em-preparacao' : 'disponivel' } },
        icon,
        h('div', null,
          h('h2', { className: 'pl-passo__nome' },
            h('a', { className: 'pl-passo__abrir', attrs: { href: `#${jornada}/${encodeURIComponent(m.id)}` }, text: m.titulo,
              on: { click: (e) => { e.preventDefault(); emitirAbrir(icon, { modulo: m.id, jornada }); } } })),
          h('div', { className: 'pl-passo__meta' }, prep ? chip('em-preparacao') : h('span', { text: `${disp} de ${mats.length} materiais disponíveis` }), h('span', { text: `${pct}% concluído` })),
          h('div', { className: 'pl-progresso', attrs: { role: 'progressbar', 'aria-label': `Progresso em ${txt(m.titulo)}`, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pct } }, barra)),
        h('span', { className: 'pl-card__ordem', attrs: { 'aria-hidden': 'true' }, text: ordemFmt(m.ordem) }));
    }));
    el.append(cab, ol);
    anunciar(el, `${JORNADAS[jornada].nome}: ${lista.length} módulos.`);
  }

  /* ---------- Página do módulo: blocos tipados (v2 §3) ---------- */
  const duracaoFmt = (s) => {
    const n = Math.round(Number(s));
    if (!Number.isFinite(n) || n <= 0) return '';
    const m = Math.floor(n / 60), r = n % 60;
    return m ? `${m} min${r ? ` ${r} s` : ''}` : `${r} s`;
  };
  const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
  const SELOS_PASSO = { 'conferido-na-tela': 'Conferido na tela' };
  const CONFIANCA = { alta: 'Confiança alta', media: 'Confiança média', baixa: 'Confiança baixa' };
  const tipoMaterial = (id) => { const t = txt(id).split(':')[1] || ''; return ['video', 'manual', 'checklist', 'fluxo', 'tela'].find((k) => t.startsWith(k)) || 'manual'; };

  const titulo3 = (t) => (temTexto(t) ? h('h3', { className: 'pl-bloco__titulo' }, inline(t)) : null);
  const onde = (o) => (temTexto(o) ? h('p', { className: 'pl-onde' }, h('span', { className: 'pl-onde__rot', text: 'Onde: ' }), h('span', { className: 'pl-onde__cam' }, inline(o))) : null);
  const seloItem = (s) => (s ? h('span', { className: 'pl-chip pl-chip--ok pl-chip--mini', text: SELOS_PASSO[s] || txt(s).replace(/-/g, ' ') }) : null);
  const itemLista = (i) => (i && typeof i === 'object' && !Array.isArray(i)
    ? h('li', null, h('span', null, inline(i.texto)), temTexto(i.nota) ? h('span', { className: 'pl-nota' }, inline(i.nota)) : null, seloItem(i.selo))
    : h('li', null, inline(i)));
  const prepLinha = (rotulo) => h('div', { className: 'pl-prep pl-prep--linha' }, h('span', { className: 'pl-prep__ic' }, icone('relogio')), h('div', null, h('strong', { text: rotulo }), h('p', { text: 'Em preparação. Aparece aqui assim que for publicado.' })));

  const BLOCOS = {
    texto: (b) => h('div', { className: 'pl-bloco pl-bloco--texto' },
      temTexto(b.rotulo) ? h('p', { className: 'pl-bloco__rotulo' }, inline(b.rotulo)) : null,
      h('p', null, inline(b.texto))),
    lista: (b) => h('div', { className: 'pl-bloco pl-bloco--lista' }, titulo3(b.rotulo || b.titulo), h('ul', null, (b.itens || []).map(itemLista))),
    passos: (b) => h('div', { className: 'pl-bloco pl-bloco--passos' },
      titulo3(b.titulo), onde(b.onde), temTexto(b.intro) ? h('p', null, inline(b.intro)) : null,
      h('ol', { className: 'pl-passos' }, (b.passos || b.itens || []).map(itemLista))),
    etapa: (b) => h('div', { className: 'pl-bloco pl-bloco--etapa' },
      titulo3(b.titulo), onde(b.onde), temTexto(b.intro) ? h('p', null, inline(b.intro)) : null,
      Number(b.passos_total) > 0 ? h('p', { className: 'pl-nota', text: `${plural(Number(b.passos_total), 'passo', 'passos')} no roteiro` }) : null),
    fluxo: (b) => {
      const etapas = b.etapas || b.itens || [];
      const nome = temTexto(b.titulo) ? (Array.isArray(b.titulo) ? b.titulo.map((p) => txt(p && p.t)).join('') : txt(b.titulo)) : 'Fluxo';
      return h('div', { className: 'pl-bloco pl-bloco--fluxo' }, temTexto(b.titulo) ? h('p', { className: 'pl-bloco__rotulo' }, inline(b.titulo)) : null,
        h('ol', { className: 'pl-fluxo', attrs: { 'aria-label': nome } }, etapas.map((e) => h('li', null, inline(e)))));
    },
    regra: (b) => h('aside', { className: 'pl-bloco pl-regra', attrs: { 'aria-label': 'Regra de negócio' } },
      h('div', { className: 'pl-regra__cab' }, h('span', { className: 'pl-regra__ic' }, icone('regra')), titulo3(b.titulo),
        CONFIANCA[b.confianca] ? h('span', { className: 'pl-chip pl-chip--neutro pl-chip--mini', text: CONFIANCA[b.confianca] }) : null),
      temTexto(b.texto) ? h('p', null, inline(b.texto)) : null,
      temTexto(b.confirmar) ? h('p', { className: 'pl-regra__confirmar' }, h('span', { className: 'pl-regra__rot', text: 'Como confirmar: ' }), inline(b.confirmar)) : null),
    video: (b) => {
      const url = urlSegura(b.url);
      if (b.status === 'em-preparacao' || !url) return prepLinha(txt(b.titulo) || 'Vídeo');
      const v = h('video', { className: 'pl-video', attrs: { controls: true, preload: 'none', 'aria-label': txt(b.titulo) || 'Vídeo' } });
      const poster = urlSegura(b.poster);
      if (poster) v.poster = poster;
      v.src = url;
      const leg = urlSegura(b.legenda);
      if (leg) v.append(h('track', { attrs: { kind: 'captions', srclang: 'pt-BR', label: 'Português', src: leg, default: true } }));
      const dur = duracaoFmt(b.duracao_s);
      return h('figure', { className: 'pl-bloco pl-bloco--video' }, v,
        h('figcaption', null, h('strong', { text: b.titulo }), dur ? h('span', { className: 'pl-nota', text: dur }) : null, temTexto(b.resumo) ? h('span', null, inline(b.resumo)) : null));
    },
    link: (b) => {
      const tipo = tipoMaterial(b.material);
      const restrito = b.visibilidade ? chipOculto('Visível conforme o perfil') : null;
      const corpo = [h('span', { className: 'pl-link-card__ic' }, icone(tipo)),
        h('span', { className: 'pl-link-card__txt' }, h('strong', null, inline(b.titulo)), temTexto(b.resumo) ? h('span', { className: 'pl-nota' }, inline(b.resumo)) : null,
          duracaoFmt(b.duracao_s) ? h('span', { className: 'pl-nota', text: duracaoFmt(b.duracao_s) }) : null)];
      if (b.status === 'em-preparacao') return h('div', { className: 'pl-bloco pl-link-card', data: { prep: true } }, corpo, chip('em-preparacao'), restrito);
      const a = link(b.url, corpo, 'pl-bloco pl-link-card');
      if (!a) return h('div', { className: 'pl-bloco pl-link-card', data: { prep: true } }, corpo, h('span', { className: 'pl-chip pl-chip--prep', text: 'Link indisponível' }), restrito); // URL fora da regra (só relativo/https)
      a.append(h('span', { className: 'pl-link-card__seta', attrs: { 'aria-hidden': 'true' } }, icone('seta')));
      if (restrito) a.append(restrito);
      return a;
    },
    tela: (b) => {
      const url = urlSegura(b.url);
      const nome = temTexto(b.titulo) ? txt(Array.isArray(b.titulo) ? b.titulo.map((p) => p && p.t).join('') : b.titulo) : 'Tela do sistema';
      const fig = h('figure', { className: 'pl-bloco pl-tela' });
      const falha = () => fig.replaceChildren(h('div', { className: 'pl-tela__falta' }, icone('tela'), h('span', { text: `Imagem indisponível: ${nome}` })), legenda());
      const legenda = () => h('figcaption', null, h('strong', { text: nome }), temTexto(b.legenda) ? h('span', null, inline(b.legenda)) : null);
      if (!url) { falha(); return fig; }
      const img = h('img', { attrs: { alt: nome, loading: 'lazy', decoding: 'async' }, on: { error: falha } });
      img.src = url;
      return anexar(fig, [img, legenda()]);
    },
    'checklist-aprendizado': (b, ctx) => {
      const marcados = new Set((ctx.progresso && ctx.progresso[b.chave]) || []);
      const id = uid('pl-ck');
      const fs = h('fieldset', { className: 'pl-bloco pl-checklist', data: { chave: b.chave } },
        h('legend', { className: 'pl-bloco__titulo', text: 'Marque o que você já domina' }),
        (b.itens || []).map((it) => {
          const cb = h('input', { id: `${id}-${txt(it.id)}`, attrs: { type: 'checkbox', value: txt(it.id) } });
          cb.checked = marcados.has(it.id);
          return h('label', { className: 'pl-checklist__item', attrs: { for: cb.id } }, cb, h('span', null, inline(it.texto)));
        }));
      fs.addEventListener('change', (e) => {
        if (!(e.target instanceof HTMLInputElement)) return;
        const feitos = [...fs.querySelectorAll('input:checked')].map((i) => i.value);
        // componente "burro": só avisa; quem salva é window.Plataforma (proposta de evento para o contrato)
        fs.dispatchEvent(new CustomEvent('plataforma:checklist', { bubbles: true, detail: { chave: b.chave, item: e.target.value, marcado: e.target.checked, feitos } }));
      });
      return fs;
    },
    progresso: (b, ctx) => {
      const total = Math.max(0, Number(b.total) || 0);
      const feitos = Math.min(total, ((ctx.progresso && ctx.progresso[b.chave]) || []).length);
      const barra = h('span');
      const valor = h('span', { className: 'pl-progresso__valor' });
      const pb = h('div', { className: 'pl-progresso pl-progresso--grande', attrs: { role: 'progressbar', 'aria-label': 'Seu progresso neste módulo', 'aria-valuemin': 0, 'aria-valuemax': total } }, barra);
      const atualizar = (n) => {
        pb.setAttribute('aria-valuenow', String(n));
        pb.setAttribute('aria-valuetext', `${n} de ${total} itens`);
        barra.style.setProperty('--p', String(total ? n / total : 0));
        valor.textContent = `${n} de ${total} itens do checklist`;
      };
      atualizar(feitos);
      ctx.ouvirChecklist(b.chave, atualizar);
      return h('div', { className: 'pl-bloco pl-bloco--progresso', data: { chave: b.chave } }, valor, pb);
    },
    fontes: (b) => h('details', { className: 'pl-bloco pl-fontes-bloco' },
      h('summary', null, inline(b.rotulo || 'Fontes')),
      h('ul', null, (b.itens || []).map(itemLista)))
  };

  function renderBloco(b, ctx) {
    if (!b || !BLOCOS[b.tipo]) return null; // tipo desconhecido: ignora sem quebrar a página
    try {
      const no = BLOCOS[b.tipo](b, ctx);
      if (no && b.visibilidade && b.tipo !== 'link') { no.dataset.visibilidade = b.visibilidade; no.append(chipOculto('Visível conforme o perfil')); }
      return no;
    } catch (erro) {
      console.warn('[PlataformaUI] bloco ignorado', b.tipo, erro);
      return null;
    }
  }
  const fontesSecao = (f) => (f && f.length
    ? h('details', { className: 'pl-fontes' }, h('summary', { text: plural(f.length, 'fonte', 'fontes') }), h('ul', null, f.map((x) => h('li', null, h('code', { text: x })))))
    : null);

  /**
   * @param detalhe  { modulo: {id, ordem, titulo, subtitulo, cor, icone, status, oculto}, jornada, secoes: [{id, titulo, status, blocos, fontes}] }
   *                 | null (carregando) | { erro: {status, mensagem} }
   * @param opcoes   { onTentar?: Function, progresso?: Record<chave, string[]> }  (progresso: ids marcados por chave do checklist)
   */
  function renderModulo(el, detalhe, opcoes = {}) {
    el.classList.add('pl-raiz', 'pl-claro', 'pl-modulo');
    if (detalhe == null) { estadoCarregando(el, { tipo: 'lista', texto: 'Carregando módulo…' }); return; }
    if (detalhe.erro) { estadoErro(el, { mensagem: detalhe.erro.mensagem, status: detalhe.erro.status, onTentar: opcoes.onTentar || detalhe.onTentar }); return; }
    const mod = typeof detalhe.modulo === 'string' ? { id: detalhe.modulo, titulo: detalhe.modulo } : (detalhe.modulo || {});
    const jornada = JORNADAS[detalhe.jornada] ? detalhe.jornada : 'inicial';
    const secoes = detalhe.secoes || [];
    limpar(el);
    el.removeAttribute('aria-busy');

    const ouvintes = new Map();
    const ctx = {
      progresso: opcoes.progresso || {},
      ouvirChecklist: (chave, fn) => { if (!ouvintes.has(chave)) ouvintes.set(chave, []); ouvintes.get(chave).push(fn); }
    };
    el.addEventListener('plataforma:checklist', (e) => (ouvintes.get(e.detail.chave) || []).forEach((fn) => fn(e.detail.feitos.length)));

    const nav = h('nav', { attrs: { 'aria-label': 'Você está em' } },
      h('ol', { className: 'pl-trilha-nav' },
        h('li', null, h('a', { attrs: { href: '#inicio' }, text: 'Página Inicial' })),
        h('li', null, h('a', { attrs: { href: `#${jornada}` }, text: JORNADAS[jornada].nome })),
        h('li', { attrs: { 'aria-current': 'page' }, text: mod.titulo })));

    const selos = [];
    if (mod.status === 'em-preparacao') selos.push(chip('em-preparacao'));
    if (mod.oculto) selos.push(chipOculto());
    const cab = h('header', { className: 'pl-modulo__cab', style: { '--pl-cor': corValida(mod.cor) || '#3478A7' } },
      h('span', { className: 'pl-card__icone' }, icone(mod.icone || mod.id)),
      h('div', { className: 'pl-modulo__nomes' },
        h('span', { className: 'pl-sobretitulo', text: JORNADAS[jornada].nome }),
        h('h1', { className: 'pl-modulo__titulo', text: mod.titulo }),
        mod.subtitulo ? h('p', { className: 'pl-modulo__sub', text: mod.subtitulo }) : null,
        selos.length ? h('div', { className: 'pl-card__selos' }, selos) : null));

    const comSumario = jornada === 'consultor';
    const grade = h('div', { className: `pl-modulo__grade${comSumario ? ' pl-modulo__grade--sumario' : ''}` });
    const base = `pl-sec-${txt(mod.id)}`.replace(/[^a-z0-9_-]/gi, '-');
    const ids = secoes.map((s, i) => `${base}-${txt(s.id) || i}`.replace(/[^a-z0-9_-]/gi, '-'));
    const vazia = (s) => s.status === 'em-preparacao' || !(s.blocos || []).some((b) => b && BLOCOS[b.tipo]);
    if (comSumario && secoes.length) {
      const idSum = `${base}-sumario`;
      const sum = h('nav', { className: 'pl-sumario', attrs: { 'aria-labelledby': idSum } },
        h('h2', { id: idSum, text: 'Sumário' }),
        h('ol', null, secoes.map((s, i) => h('li', null, h('a', { attrs: { href: `#${ids[i]}` }, data: { prep: vazia(s) } }, txt(s.titulo), vazia(s) ? h('span', { className: 'pl-sr', text: ' (em preparação)' }) : null)))));
      sum.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#pl-sec-"]');
        if (!a) return;
        e.preventDefault(); // não mexe no hash do roteador
        const alvo = document.getElementById(a.getAttribute('href').slice(1));
        if (alvo) { alvo.scrollIntoView({ behavior: reduzido() ? 'auto' : 'smooth', block: 'start' }); alvo.focus({ preventScroll: true }); }
      });
      grade.append(sum);
    }
    const lista = h('div', { className: 'pl-secoes' });
    if (!secoes.length) lista.append(h('div', { className: 'pl-aviso' }, h('p', { className: 'pl-aviso__titulo', text: 'Ainda não há conteúdo para você' })));
    secoes.forEach((s, i) => {
      const prep = vazia(s);
      lista.append(h('section', { className: 'pl-secao', id: ids[i], attrs: { tabindex: -1, 'aria-labelledby': `${ids[i]}-t` }, data: { status: prep ? 'em-preparacao' : 'disponivel', secao: s.id } },
        h('div', { className: 'pl-secao__cab' },
          h('span', { className: 'pl-secao__num', attrs: { 'aria-hidden': 'true' }, text: i + 1 }),
          h('h2', { className: 'pl-secao__titulo', id: `${ids[i]}-t`, text: s.titulo }),
          prep ? chip('em-preparacao') : null),
        prep
          ? h('div', { className: 'pl-prep' }, h('span', { className: 'pl-prep__ic' }, icone('relogio')),
            h('div', null, h('strong', { text: 'Em preparação' }), h('p', { text: s.mensagem || 'Este conteúdo ainda está sendo produzido e aparece aqui assim que for publicado.' })))
          : (s.blocos || []).map((b) => renderBloco(b, ctx)),
        fontesSecao(s.fontes)));
    });
    grade.append(lista);
    el.append(nav, cab, grade);
    const nPrep = secoes.filter(vazia).length;
    anunciar(el, `${txt(mod.titulo)}, ${JORNADAS[jornada].nome}: ${plural(secoes.length, 'seção', 'seções')}${nPrep ? `, ${nPrep} em preparação` : ''}.`);
  }

  /* ---------- reação a mudanças de preferência ---------- */
  mqHover.addEventListener?.('change', () => document.querySelectorAll('.pl-card').forEach((c) => c._plAplicar && c._plAplicar()));

  window.PlataformaUI = Object.freeze({
    renderPaginaInicial,
    renderCardModulo,
    renderJornada,
    renderModulo,
    estadoCarregando,
    estadoErro,
    estadoVazio,
    transicao,
    // utilitários de texto seguro, para o Lead/Engineer reaproveitarem (ex.: painel de Visibilidade)
    texto: Object.freeze({ inline, urlSegura }),
    contrato: 'v2',
    versao: '2026-11-04-ui-v1'
  });
})();
