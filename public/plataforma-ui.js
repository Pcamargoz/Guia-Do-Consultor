/* ==========================================================================
   Faktory Flow — Plataforma de conhecimento: componentes de UI (FE-20261104-01)
   Segue contrato-componentes.md v1 + contrato-componentes-v2.md (Lead, 2026-11-04).
   Componentes "burros" do §4, expostos em window.PlataformaUI. Não buscam dados:
   recebem o que window.Plataforma (plataforma-dados.js) carrega.
   Fluxo de navegação (decisão do Lead, UI v1): o componente emite `plataforma:abrir`
   {modulo, jornada} (cancelável) → quem ouve é a camada de dados, que chama
   Plataforma.irPara({area, modulo}) → irPara emite `plataforma:rota`, que o guia-abas.js
   ouve. Fallback: se ninguém der preventDefault em `plataforma:abrir`, este arquivo chama
   Plataforma.irPara direto — o roteador continua único (v2 §6).
   Segurança (v2 §4): nenhum dado passa por innerHTML. Todo texto entra por
   textContent/createElement; texto inline [{t, marca, href}] vira nós (marcas negrito,
   italico, link, tela, codigo); string vira texto literal (sem parser de `**`).
   href: só relativo começando com "/", "./" ou "#" (nunca "//") ou https:.
   Ícones: fonte única do mapa em PlataformaUI.icones (SVG estáticos deste arquivo).
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
  /** Regra do Lead (UI v1): aceita relativo começando com "/", "./" ou "#" (mas nunca "//")
   *  ou https:. Recusa todo o resto: javascript:, data:, http:, mailto:, "//host", "../x", "x.html", "?x". */
  function urlSegura(v) {
    if (typeof v !== 'string') return null;
    const u = v.trim();
    if (!u || /[\u0000-\u001f\u007f\s\\]/.test(u)) return null; // controle, espaços e barra invertida
    if (u.startsWith('//')) return null;                          // relativo a protocolo = outro domínio
    if (u.startsWith('/') || u.startsWith('./') || u.startsWith('#')) return u;
    if (/^https:\/\/[^/]/i.test(u)) {
      try { return new URL(u).protocol === 'https:' ? u : null; } catch { return null; }
    }
    return null;
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
  // tela = nome/caminho de tela do Flow (glossário do Harness); codigo = campo, valor ou código (JetBrains Mono)
  const MARCAS = { negrito: ['strong'], italico: ['em'], codigo: ['code', 'pl-marca-codigo'], tela: ['span', 'pl-marca-tela'] };
  /** Aceita [{t, marca?, href?}] (formato v2) ou string. String vira texto literal (sem parser de `**`). */
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
        marcas.forEach((m) => {
          if (!MARCAS[m]) return;
          const [tag, cls] = MARCAS[m];
          const e = document.createElement(tag);
          if (cls) e.className = cls;
          e.append(no); no = e;
        });
        if (parte.href || marcas.includes('link')) no = link(parte.href, no, 'pl-link') || no; // href inseguro: fica só o texto
        frag.append(no);
      });
      return frag;
    }
    frag.append(txt(valor)); // literal: "**x**" aparece como digitado
    return frag;
  }
  const temTexto = (v) => (Array.isArray(v) ? v.some((p) => p && txt(typeof p === 'string' ? p : p.t).trim()) : txt(v).trim() !== '');

  /* ---------- ícones: FONTE ÚNICA do mapa (decisão do Lead, UI v1). Exposto em PlataformaUI.icones;
     o Lead remove a cópia `const icones` do index.html ao integrar. Traço 2 px, viewBox 24. ---------- */
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
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    tentar: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    // v2.1: casa da aba/menu "Página Inicial" (substitui o SVG próprio do guia-abas.js; mesma silhueta e traço 2 px).
    inicio: '<path d="m3 10.5 9-7.5 9 7.5"/><path d="M5 9v10.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V9"/><path d="M10 20v-6h4v6"/>'
  };
  const ATRS_SVG = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
  const ICONES_SVG = Object.freeze(Object.fromEntries(Object.entries(ICONES).filter(([k]) => k !== '_padrao').map(([k, d]) => [k, `<svg ${ATRS_SVG}>${d}</svg>`])));
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
              h('button', { className: 'pl-card__abrir', attrs: { type: 'button', 'aria-expanded': 'false', 'aria-controls': idPainel } },
                h('span', { text: modulo.titulo }),
                h('span', { className: 'pl-card__seta', attrs: { 'aria-hidden': 'true' } }, icone('seta')))),
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
    // v2.2: no toque o painel começa fechado; o nome do módulo abre/fecha (antes começava aberto em todos os cards).
    if (!mqHover.matches) card.setAttribute('data-fechado', '');
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
  // Card com hover (v2.2): o painel abre como folha presa ao fim do cabeçalho (--pl-cab), por cima do resumo
  // e, se precisar, da linha de baixo. O card fica com a altura natural (sem espaço reservado vazio).
  function alturas(grade) {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      grade.querySelectorAll('.pl-card').forEach((card) => {
        if (!mqHover.matches) { card.style.removeProperty('--pl-cab'); return; }
        const cab = card.querySelector('.pl-card__cab');
        if (cab) card.style.setProperty('--pl-cab', `${Math.ceil(cab.offsetTop + cab.offsetHeight + 10)}px`);
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

  /* ---------- Caminhos de aprendizagem (v2.2) ----------
     As duas jornadas no topo da Página Inicial (R-A10, doc 12 P4): para quem é, o que tem e quanto já está publicado.
     Jornada oculta para o perfil (Plataforma.lerRota devolve outra área) não aparece. Textos descrevem a plataforma,
     não o Faktory Flow — por isso não precisam de fonte do Harness. */
  const CAMINHOS = {
    inicial: {
      icone: 'primeiros-passos', cta: 'Começar pela trilha',
      texto: 'Para quem está começando no Faktory Flow. Cada módulo em passos curtos: o que é, como acessar e a operação básica.',
      itens: [['video', 'Vídeo introdutório'], ['manual', 'Manual visual resumido'], ['checklist', 'Atividade e checklist']]
    },
    consultor: {
      icone: 'manual', cta: 'Abrir a central',
      texto: 'Para quem implanta e orienta o cliente: regras de negócio com fonte, fluxos, configurações e validações de cada módulo.',
      itens: [['regra', 'Regras de negócio'], ['fluxo', 'Roteiros de implantação'], ['checklist', 'Validações funcionais']]
    }
  };
  function renderCaminhos(modulos) {
    const permitida = (j) => !(window.Plataforma && typeof window.Plataforma.lerRota === 'function') || window.Plataforma.lerRota(`#${j}`).area === j;
    const jornadas = Object.keys(CAMINHOS).filter(permitida);
    if (!jornadas.length) return null;
    return h('ul', { className: 'pl-caminhos', attrs: { 'aria-label': 'Caminhos de aprendizagem' } }, jornadas.map((j) => {
      const c = CAMINHOS[j];
      const mats = modulos.flatMap((m) => materiaisDe(m, j));
      const disp = mats.filter((m) => m.status === 'disponivel').length;
      return h('li', null, h('a', { className: 'pl-caminho', attrs: { href: `#${j}` }, data: { jornada: j } },
        h('div', { className: 'pl-caminho__topo' },
          h('span', { className: 'pl-caminho__ic' }, icone(c.icone)),
          h('div', null, h('h2', { className: 'pl-caminho__titulo', text: JORNADAS[j].nome }), h('p', { className: 'pl-caminho__sobre', text: JORNADAS[j].sub }))),
        h('p', { className: 'pl-caminho__texto', text: c.texto }),
        h('ul', { className: 'pl-caminho__itens', attrs: { 'aria-label': `O que tem no ${JORNADAS[j].nome}` } }, c.itens.map(([ic, t]) => h('li', null, icone(ic), t))),
        h('div', { className: 'pl-caminho__pe' },
          h('p', { className: 'pl-caminho__conta' }, mats.length ? [h('strong', { text: disp }), ` de ${mats.length} materiais publicados`] : 'Materiais em preparação'),
          h('span', { className: 'pl-caminho__cta', attrs: { 'aria-hidden': 'true' } }, c.cta, icone('seta')))));
    }));
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
      h('h1', { className: 'pl-hero__titulo', id: idH1, text: 'Página Inicial' }),
      h('p', { className: 'pl-hero__texto', text: 'Aprenda o Faktory Flow no seu ritmo: comece pela trilha do Guia Inicial, aprofunde no Guia do Consultor ou vá direto a um módulo.' }),
      h('p', { className: 'pl-hero__numeros' }, h('strong', { text: modulos.length }), ' módulos, ', h('strong', { text: disp }), ' materiais disponíveis e ', h('strong', { text: total - disp }), ' em preparação.'));
    const caminhos = renderCaminhos(modulos);
    const idMods = uid('pl-mods');
    const tituloMods = h('div', { className: 'pl-secao-titulo' },
      h('h2', { id: idMods, text: 'Explore por módulo' }),
      h('p', { text: 'Passe o mouse ou toque no nome para ver os materiais de cada jornada.' }));
    // Rota da trilha: decorativa (aria-hidden); a grade abaixo traz a mesma ordem de forma acessível.
    const rota = h('ol', { className: 'pl-rota', attrs: { 'aria-hidden': 'true' }, style: { '--n': modulos.length } },
      modulos.map((m) => h('li', { data: { modulo: m.id, prep: m.status === 'em-preparacao' }, style: { '--pl-cor': corValida(m.cor) || '#3478A7' } },
        h('span', { className: 'pl-rota__no' }), h('span', { className: 'pl-rota__num', text: ordemFmt(m.ordem) }))));
    const grade = h('ul', { className: 'pl-grade', attrs: { 'aria-labelledby': idMods } }, modulos.map((m) => h('li', null, renderCardModulo(m))));
    el.append(hero, caminhos, tituloMods, rota, grade);
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
    const inicial = jornada === 'inicial';
    const prog = (m) => Math.max(0, Math.min(1, Number(progresso[m.id]) || 0));
    const proximo = lista.find((m) => materiaisDe(m, jornada).some((x) => x.status === 'disponivel') && prog(m) < 1);
    const media = lista.length ? lista.reduce((s, m) => s + prog(m), 0) / lista.length : 0;

    const barraTotal = h('span');
    barraTotal.style.setProperty('--p', String(media));
    const busca = inicial ? null : h('label', { className: 'pl-busca' }, icone('busca'),
      h('span', { className: 'pl-sr', text: 'Filtrar módulos' }),
      h('input', { attrs: { type: 'search', placeholder: 'Filtrar módulos (ex.: estoque, nota, pedido)', autocomplete: 'off' } }));
    const hero = h('header', { className: 'pl-jornada__hero' },
      h('h1', { text: JORNADAS[jornada].nome }),
      h('p', { text: inicial
        ? 'Uma trilha em etapas, na ordem em que a empresa trabalha. Em cada módulo: o conceito, as telas principais com imagens guiadas e um checklist para marcar o que você já domina.'
        : 'A central de quem implanta: regras de negócio com fonte, fluxos operacionais, configurações, validações e erros comuns de cada módulo.' }),
      h('div', { className: 'pl-jornada__barra' },
        inicial ? h('div', { className: 'pl-jornada__total' },
          h('span', null, 'Seu progresso na trilha: ', h('strong', { text: `${Math.round(media * 100)}%` })),
          h('div', { className: 'pl-progresso', attrs: { role: 'progressbar', 'aria-label': 'Progresso na trilha', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(media * 100) } }, barraTotal)) : busca,
        inicial && proximo ? h('a', { className: 'pl-continuar', attrs: { href: `#inicial/${encodeURIComponent(proximo.id)}` } },
          icone('seta'), h('span', null, media > 0 ? 'Continuar' : 'Começar', h('small', { text: proximo.titulo }))) : null));

    const passo = (m) => {
      const mats = materiaisDe(m, jornada);
      const disp = mats.filter((x) => x.status === 'disponivel').length;
      const p = prog(m);
      const pc = Math.round(p * 100);
      const icon = h('span', { className: 'pl-passo__icone' }, icone(m.icone || m.id));
      const barra = h('span');
      barra.style.setProperty('--p', String(p));
      const prep = m.status === 'em-preparacao' || !mats.length;
      const tipos = ['video', 'manual', 'checklist', 'fluxo'].map((t) => {
        const doTipo = mats.filter((x) => x.tipo === t);
        if (!doTipo.length) return null;
        const ok = doTipo.some((x) => x.status === 'disponivel');
        return h('span', { className: 'pl-passo__tag', data: { prep: !ok } }, icone(t), { video: 'Vídeo', manual: 'Manual', checklist: 'Checklist', fluxo: 'Fluxo' }[t], ok ? null : h('span', { className: 'pl-sr', text: ' (em preparação)' }));
      });
      return h('li', { className: 'pl-passo', style: { '--pl-cor': corValida(m.cor) || '#3478A7' }, data: { status: prep ? 'em-preparacao' : 'disponivel', proximo: inicial && proximo === m, busca: `${txt(m.titulo)} ${txt(m.subtitulo)} ${m.id}`.toLowerCase() } },
        icon,
        h('div', null,
          h('h3', { className: 'pl-passo__nome' },
            h('a', { className: 'pl-passo__abrir', attrs: { href: `#${jornada}/${encodeURIComponent(m.id)}` }, text: m.titulo,
              on: { click: (e) => { e.preventDefault(); emitirAbrir(icon, { modulo: m.id, jornada }); } } })),
          m.subtitulo ? h('p', { className: 'pl-passo__sub', text: m.subtitulo }) : null,
          h('div', { className: 'pl-passo__tags' }, tipos),
          h('div', { className: 'pl-passo__meta' }, prep ? chip('em-preparacao') : h('span', { text: `${disp} de ${mats.length} materiais publicados` }), inicial ? h('span', { text: `${pc}% concluído` }) : null),
          inicial ? h('div', { className: 'pl-progresso', attrs: { role: 'progressbar', 'aria-label': `Progresso em ${txt(m.titulo)}`, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pc } }, barra) : null),
        h('span', { className: 'pl-card__ordem', attrs: { 'aria-hidden': 'true' }, text: ordemFmt(m.ordem) }));
    };

    // Fases = ordem do fluxo da empresa (doc 05). Módulo fora da lista cai em "Outros".
    const usados = new Set();
    const fases = FASES.map((f) => ({ ...f, mods: lista.filter((m) => f.ids.includes(m.id) && !usados.has(m.id) && usados.add(m.id)) }));
    const resto = lista.filter((m) => !usados.has(m.id));
    if (resto.length) fases.push({ titulo: 'Outros', texto: '', mods: resto });
    const ol = h('ol', { className: 'pl-fases' }, fases.filter((f) => f.mods.length).map((f) => h('li', { className: 'pl-fase' },
      h('div', { className: 'pl-fase__cab' }, h('h2', { text: f.titulo }), f.texto ? h('p', { text: f.texto }) : null),
      h('ol', { className: 'pl-trilha' }, f.mods.map(passo)))));
    const vazioBusca = h('p', { className: 'pl-jornada__vazio-busca', attrs: { hidden: true, role: 'status' }, text: 'Nenhum módulo com esse nome.' });
    el.append(hero, ol, vazioBusca);
    if (busca) {
      busca.querySelector('input').addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        let n = 0;
        el.querySelectorAll('.pl-passo').forEach((li) => { const ok = !q || li.dataset.busca.includes(q); li.toggleAttribute('data-oculto-busca', !ok); if (ok) n++; });
        el.querySelectorAll('.pl-fase').forEach((f) => { f.hidden = !f.querySelector('.pl-passo:not([data-oculto-busca])'); });
        vazioBusca.hidden = n > 0;
      });
    }
    anunciar(el, `${JORNADAS[jornada].nome}: ${lista.length} módulos.`);
  }
  const FASES = [
    { titulo: 'Comece aqui', texto: 'Como o sistema funciona e os cadastros que tudo usa.', ids: ['primeiros-passos', 'fundacao'] },
    { titulo: 'Comercial', texto: 'Do primeiro contato ao pedido de venda.', ids: ['crm', 'cem', 'vendas'] },
    { titulo: 'Suprimentos e operação', texto: 'Comprar, receber, guardar, produzir, instalar e entregar.', ids: ['compras', 'recebimento', 'estoque', 'producao', 'servicos', 'projetos', 'expedicao'] },
    { titulo: 'Fiscal e financeiro', texto: 'Nota fiscal, impostos, contas a pagar e a receber.', ids: ['faturamento', 'fiscal', 'financeiro'] },
    { titulo: 'Gestão', texto: 'Acompanhar o trabalho e analisar os números.', ids: ['tarefas', 'relatorios', 'alumina'] },
    { titulo: 'Visão completa', texto: 'O caminho de ponta a ponta, juntando os módulos.', ids: ['fluxo-completo'] }
  ];

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
      const leg = urlSegura(b.legendas_url || b.legenda); // v3: legendas_url (.vtt)
      // Intro não tem fala e já traz o texto na imagem: a legenda fica disponível, mas desligada.
      if (leg) v.append(h('track', { attrs: { kind: 'captions', srclang: 'pt-BR', label: 'Português', src: leg, default: !/\/intro-[^/]+\.vtt$/.test(leg) } }));
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
    const secoes = [...(detalhe.secoes || [])];
    limpar(el);
    el.removeAttribute('aria-busy');

    const ouvintes = new Map();
    const ctx = {
      progresso: opcoes.progresso || {},
      ouvirChecklist: (chave, fn) => { if (!ouvintes.has(chave)) ouvintes.set(chave, []); ouvintes.get(chave).push(fn); }
    };
    el.addEventListener('plataforma:checklist', (e) => (ouvintes.get(e.detail.chave) || []).forEach((fn) => fn(e.detail.feitos.length)));

    // v2.2: a trilha de navegação fica na barra do topo (shell); aqui o cabeçalho troca de jornada no mesmo módulo.
    const nav = null;
    const selos = [];
    if (mod.status === 'em-preparacao') selos.push(chip('em-preparacao'));
    if (mod.oculto) selos.push(chipOculto());
    const guia = opcoes.guia && Array.isArray(opcoes.guia.capitulos) ? opcoes.guia : null;
    const capsGuia = guia ? guia.capitulos.filter((c) => jornada === 'consultor' || (c.nivel || 'basico') === 'basico') : [];
    const nPassos = capsGuia.reduce((s, c) => s + (c.passos || []).length, 0);
    const nImagens = capsGuia.reduce((s, c) => s + (c.passos || []).filter((p) => p.imagem).length, 0);
    const trocar = h('nav', { className: 'pl-troca', attrs: { 'aria-label': 'Profundidade do conteúdo' } },
      ['inicial', 'consultor'].map((j) => h('a', {
        className: 'pl-troca__op', attrs: { href: `#${j}/${encodeURIComponent(mod.id)}`, 'aria-current': j === jornada ? 'page' : null }
      }, icone(j === 'inicial' ? 'primeiros-passos' : 'manual'), h('span', null, h('strong', { text: JORNADAS[j].nome }), h('small', { text: j === 'inicial' ? 'Conhecer e usar' : 'Implantar e orientar' })))));
    const fatos = h('ul', { className: 'pl-modulo__fatos', attrs: { 'aria-label': 'Neste módulo' } },
      h('li', null, h('strong', { text: secoes.length }), plural(secoes.length, ' seção', ' seções').replace(/^\d+/, '')),
      guia ? h('li', null, h('strong', { text: nImagens }), ' telas ilustradas') : null,
      guia ? h('li', null, h('strong', { text: nPassos }), ' passos guiados') : null);
    const cab = h('header', { className: 'pl-modulo__cab', style: { '--pl-cor': corValida(mod.cor) || '#3478A7' } },
      h('span', { className: 'pl-modulo__marca', attrs: { 'aria-hidden': 'true' } }, icone(mod.icone || mod.id)),
      h('div', { className: 'pl-modulo__topo' },
        h('span', { className: 'pl-card__icone' }, icone(mod.icone || mod.id)),
        h('div', { className: 'pl-modulo__nomes' },
          h('h1', { className: 'pl-modulo__titulo', text: mod.titulo }),
          mod.subtitulo ? h('p', { className: 'pl-modulo__sub', text: mod.subtitulo }) : null,
          selos.length ? h('div', { className: 'pl-card__selos' }, selos) : null)),
      h('div', { className: 'pl-modulo__rodape' }, fatos, trocar));

    // O guia visual entra como seção logo depois da primeira (apresentação / visão funcional).
    if (guia && capsGuia.length) {
      secoes.splice(Math.min(1, secoes.length), 0, { id: 'guia-visual', titulo: jornada === 'inicial' ? 'Guia visual: conheça o módulo' : 'Guia visual ilustrado', _guia: true });
    }

    const comSumario = true;
    const grade = h('div', { className: `pl-modulo__grade${comSumario ? ' pl-modulo__grade--sumario' : ''}` });
    const base = `pl-sec-${txt(mod.id)}`.replace(/[^a-z0-9_-]/gi, '-');
    const ids = secoes.map((s, i) => `${base}-${txt(s.id) || i}`.replace(/[^a-z0-9_-]/gi, '-'));
    const vazia = (s) => !s._guia && (s.status === 'em-preparacao' || !(s.blocos || []).some((b) => b && BLOCOS[b.tipo]));
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
        s._guia
          ? renderGuiaVisual(guia, capsGuia, { jornada, modulo: mod, modulos: opcoes.modulos || [] })
          : prep
            ? h('div', { className: 'pl-prep' }, h('span', { className: 'pl-prep__ic' }, icone('relogio')),
              h('div', null, h('strong', { text: 'Em preparação' }), h('p', { text: s.mensagem || 'Este conteúdo ainda está sendo produzido e aparece aqui assim que for publicado.' })))
            : (s.blocos || []).map((b) => renderBloco(b, ctx)),
        fontesSecao(s.fontes)));
    });
    grade.append(lista);
    el.append(...[nav, cab, grade].filter(Boolean));
    if (comSumario) espiarSumario(grade);
    // Link de material que aponta para esta mesma página (ex.: "Guia visual ilustrado") → rola até o guia.
    const secGuia = el.querySelector('.pl-secao[data-secao="guia-visual"]');
    if (secGuia) {
      el.querySelectorAll(`a.pl-link-card[href="#${jornada}/${encodeURIComponent(mod.id)}"]`).forEach((a) => a.addEventListener('click', (e) => {
        e.preventDefault();
        secGuia.scrollIntoView({ behavior: reduzido() ? 'auto' : 'smooth', block: 'start' });
        secGuia.focus({ preventScroll: true });
      }));
    }
    const nPrep = secoes.filter(vazia).length;
    anunciar(el, `${txt(mod.titulo)}, ${JORNADAS[jornada].nome}: ${plural(secoes.length, 'seção', 'seções')}${nPrep ? `, ${nPrep} em preparação` : ''}.`);
  }

  /* ---------- Sumário que acompanha a leitura (v2.2) ---------- */
  function espiarSumario(grade) {
    const links = new Map([...grade.querySelectorAll('.pl-sumario a')].map((a) => [a.getAttribute('href').slice(1), a]));
    if (!links.size || !('IntersectionObserver' in window)) return;
    const visiveis = new Set();
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => (e.isIntersecting ? visiveis.add(e.target.id) : visiveis.delete(e.target.id)));
      const atual = [...links.keys()].find((id) => visiveis.has(id));
      if (!atual) return;
      links.forEach((a, id) => { if (id === atual) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }, { rootMargin: '-20% 0px -65% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---------- Guia visual ilustrado (contrato-guia-visual.md) ----------
     Conceitos → palavras do módulo → mapa no fluxo → capítulos com passos e capturas reais anotadas
     (marcadores numerados, destaque, zoom). Tudo por textContent/createElement; URLs passam por urlSegura. */
  const pct = (v) => Math.max(0, Math.min(100, Number(v) || 0));
  const caixaValida = (c) => c && ['x', 'y', 'w', 'h'].every((k) => Number.isFinite(Number(c[k]))) && Number(c.w) > 0 && Number(c.h) > 0;
  const EVIDENCIA = { 'captura-real': 'Tela real do sistema', base: 'Conferido na base do Harness', 'a-conferir-na-tela': 'A conferir na tela' };

  let ampliador = null;
  function ampliar(src, alt, legenda) {
    if (!ampliador) {
      ampliador = h('dialog', { className: 'pl-amplia', attrs: { 'aria-label': 'Imagem ampliada' } });
      ampliador.addEventListener('click', (e) => { if (e.target === ampliador || e.target.closest('.pl-amplia__fechar')) ampliador.close(); });
      document.body.append(ampliador);
    }
    const img = h('img', { attrs: { alt: alt || '' } });
    img.src = src;
    ampliador.replaceChildren(
      h('button', { className: 'pl-amplia__fechar', attrs: { type: 'button', 'aria-label': 'Fechar imagem ampliada' } }, '×'),
      h('figure', null, img, legenda ? h('figcaption', { text: legenda }) : null));
    if (typeof ampliador.showModal === 'function') ampliador.showModal(); else window.open(src, '_blank', 'noopener');
  }

  function figuraAnotada(p) {
    const src = urlSegura(p.imagem);
    if (!src) return null;
    const w = Number(p.largura) || 1600, hgt = Number(p.altura) || 900;
    const img = h('img', { attrs: { alt: txt(p.alt) || txt(p.titulo), loading: 'lazy', decoding: 'async', width: w, height: hgt } });
    img.src = src;
    const camada = h('div', { className: 'pl-anota__camada', attrs: { 'aria-hidden': 'true' } });
    if (caixaValida(p.destaque)) {
      const d = p.destaque;
      camada.append(h('span', { className: 'pl-anota__destaque', style: { left: `${pct(d.x)}%`, top: `${pct(d.y)}%`, width: `${pct(d.w)}%`, height: `${pct(d.h)}%` } }));
    }
    // Marcadores v2: moldura em volta do alvo (caixa) + selo numerado FORA dela (lado), sem cobrir a informação.
    // v1 (só x,y): selo no ponto — mantido para guias antigos.
    const LADOS = ['cima', 'baixo', 'esquerda', 'direita'];
    const alvo = (m, i, ref) => {
      const n = m.n ?? i + 1;
      if (caixaValida(m.caixa)) {
        const c = ref ? ref(m.caixa) : m.caixa;
        if (!c) return null;
        return h('span', { className: 'pl-anota__alvo', data: { lado: LADOS.includes(m.lado) ? m.lado : 'cima' },
          style: { left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, height: `${c.h}%`, '--i': i } },
          h('span', { className: 'pl-anota__selo', text: n }));
      }
      if (ref || !Number.isFinite(Number(m.x)) || !Number.isFinite(Number(m.y))) return null;
      return h('span', { className: 'pl-anota__marca', style: { left: `${pct(m.x)}%`, top: `${pct(m.y)}%`, '--i': i }, text: n });
    };
    (p.marcadores || []).forEach((m, i) => { const no = alvo(m, i); if (no) camada.append(no); });
    // Molduras só depois que a imagem chega (antes apareciam soltas sobre o fundo escuro do carregamento).
    const pronto = () => tela.removeAttribute('data-carregando');
    img.addEventListener('load', pronto, { once: true });
    img.addEventListener('error', pronto, { once: true });
    const tela = h('button', { className: 'pl-anota__tela', data: { carregando: !img.complete }, attrs: { type: 'button', 'aria-label': `Ampliar a tela: ${txt(p.alt) || txt(p.titulo)}` },
      on: { click: () => ampliar(src, txt(p.alt), txt(p.titulo)) } }, img, camada,
      h('span', { className: 'pl-anota__lupa', attrs: { 'aria-hidden': 'true' } }, icone('tela'), 'Ampliar'));
    let zoom = null;
    if (caixaValida(p.zoom)) {
      const z = p.zoom;
      zoom = h('div', { className: 'pl-anota__zoom', attrs: { role: 'img', 'aria-label': `Detalhe ampliado: ${txt(p.titulo)}` },
        style: {
          'background-image': `url("${src.replace(/"/g, '%22')}")`,
          'background-size': `${(100 / pct(z.w)) * 100}% auto`,
          'background-position': `${pct(z.w) >= 100 ? 0 : (pct(z.x) / (100 - pct(z.w))) * 100}% ${pct(z.h) >= 100 ? 0 : (pct(z.y) / (100 - pct(z.h))) * 100}%`,
          'aspect-ratio': `${pct(z.w) * w} / ${pct(z.h) * hgt}`
        } });
      // As mesmas molduras numeradas dentro do zoom (coordenadas convertidas para o recorte; fora dele, some).
      const noZoom = (c) => {
        const x0 = Math.max(c.x, z.x), y0 = Math.max(c.y, z.y);
        const x1 = Math.min(c.x + c.w, z.x + z.w), y1 = Math.min(c.y + c.h, z.y + z.h);
        if (x1 <= x0 || y1 <= y0) return null;
        return { x: ((x0 - z.x) / z.w) * 100, y: ((y0 - z.y) / z.h) * 100, w: ((x1 - x0) / z.w) * 100, h: ((y1 - y0) / z.h) * 100 };
      };
      const camZoom = h('div', { className: 'pl-anota__camada', attrs: { 'aria-hidden': 'true' } });
      (p.marcadores || []).forEach((m, i) => { const no = alvo(m, i, (c) => noZoom({ x: pct(c.x), y: pct(c.y), w: pct(c.w), h: pct(c.h) })); if (no) camZoom.append(no); });
      if (camZoom.childElementCount) zoom.append(camZoom);
    }
    const legenda = (p.marcadores || []).filter((m) => temTexto(m.rotulo));
    return h('figure', { className: `pl-anota${zoom ? ' pl-anota--zoom' : ''}` },
      h('div', { className: 'pl-anota__palco' }, tela, zoom),
      legenda.length ? h('figcaption', null, h('ol', { className: `pl-anota__legenda${legenda.some((m) => temTexto(m.explicacao)) ? ' pl-anota__legenda--rica' : ''}` }, legenda.map((m, i) => h('li', null,
        h('span', { className: 'pl-anota__num', attrs: { 'aria-hidden': 'true' }, text: m.n ?? i + 1 }),
        h('span', { className: 'pl-anota__item' }, h('strong', { text: m.rotulo }), temTexto(m.explicacao) ? h('span', { text: m.explicacao }) : null))))) : null);
  }

  function nomeModulo(id, modulos) {
    const m = (modulos || []).find((x) => x.id === id);
    return { id, titulo: m ? m.titulo : id, cor: corValida(m && m.cor) || '#3478A7', icone: (m && m.icone) || id };
  }

  function renderGuiaVisual(guia, capitulos, { jornada, modulo, modulos }) {
    const raiz = h('div', { className: 'pl-guia' });
    const idg = uid('pl-guia');
    // aviso honesto de status (aprovação é humana — Harness)
    if (guia.status !== 'aprovado') {
      raiz.append(h('p', { className: 'pl-guia__status' }, icone('alerta'),
        h('span', null, h('strong', { text: guia.status === 'revisao' ? 'Em revisão. ' : 'Rascunho. ' }),
          'Feito com telas reais e com a base do Harness; aguarda a conferência final na tela do sistema e a aprovação da equipe.')));
    }
    if (temTexto(guia.resumo)) raiz.append(h('p', { className: 'pl-guia__resumo', text: guia.resumo }));

    // Conceitos: lista editorial com ícones (não cartões iguais)
    const conceitos = (guia.conceitos || []).filter((c) => temTexto(c.titulo));
    if (conceitos.length) {
      raiz.append(h('section', { className: 'pl-guia__bloco', attrs: { 'aria-labelledby': `${idg}-c` } },
        h('h3', { className: 'pl-guia__h', id: `${idg}-c`, text: 'Entenda primeiro' }),
        h('ul', { className: 'pl-conceitos' }, conceitos.map((c) => h('li', { className: 'pl-conceito' },
          h('span', { className: 'pl-conceito__ic' }, icone(ICONES[c.icone] ? c.icone : (modulo.icone || modulo.id))),
          h('div', null, h('h4', { text: c.titulo }), h('p', { text: c.texto })))))));
    }

    // Mapa: de onde vem e para onde vai
    const mapa = guia.mapa;
    if (mapa && ((mapa.antes || []).length || (mapa.depois || []).length)) {
      const no = (m, atual) => h('li', { className: `pl-mapa__no${atual ? ' pl-mapa__no--atual' : ''}`, style: { '--pl-cor': m.cor } },
        h('span', { className: 'pl-mapa__ic' }, icone(m.icone)), h('span', { text: m.titulo }));
      raiz.append(h('section', { className: 'pl-guia__bloco', attrs: { 'aria-labelledby': `${idg}-m` } },
        h('h3', { className: 'pl-guia__h', id: `${idg}-m`, text: 'Onde ele entra no fluxo da empresa' }),
        h('ol', { className: 'pl-mapa', attrs: { 'aria-label': 'Sequência de módulos' } },
          (mapa.antes || []).map((id) => no(nomeModulo(id, modulos))),
          no({ ...nomeModulo(modulo.id, modulos), titulo: modulo.titulo }, true),
          (mapa.depois || []).map((id) => no(nomeModulo(id, modulos)))),
        temTexto(mapa.texto) ? h('p', { className: 'pl-guia__nota', text: mapa.texto }) : null));
    }

    // Palavras do módulo
    const palavras = (guia.palavras || []).filter((p) => temTexto(p.termo));
    if (palavras.length) {
      raiz.append(h('section', { className: 'pl-guia__bloco', attrs: { 'aria-labelledby': `${idg}-p` } },
        h('h3', { className: 'pl-guia__h', id: `${idg}-p`, text: 'Palavras que você vai ver na tela' }),
        h('dl', { className: 'pl-palavras' }, palavras.map((p) => h('div', null, h('dt', { text: p.termo }), h('dd', { text: p.definicao }))))));
    }

    // Capítulos: índice + passos ilustrados
    if (capitulos.length) {
      const idsCap = capitulos.map((c, i) => `${idg}-cap-${i}`);
      raiz.append(h('nav', { className: 'pl-caps', attrs: { 'aria-label': 'Capítulos do guia' } },
        h('ol', null, capitulos.map((c, i) => h('li', null, h('a', { attrs: { href: `#${idsCap[i]}` }, on: { click: (e) => { e.preventDefault(); document.getElementById(idsCap[i])?.scrollIntoView({ behavior: reduzido() ? 'auto' : 'smooth', block: 'start' }); } } },
          h('span', { className: 'pl-caps__n', text: i + 1 }), h('span', { text: c.titulo }),
          c.nivel === 'avancado' ? h('span', { className: 'pl-chip pl-chip--neutro pl-chip--mini', text: 'Consultor' }) : null))))));
      capitulos.forEach((c, i) => {
        const passos = (c.passos || []).filter((p) => temTexto(p.titulo) || p.imagem);
        raiz.append(h('section', { className: 'pl-cap', id: idsCap[i], attrs: { 'aria-labelledby': `${idsCap[i]}-t`, tabindex: -1 } },
          h('header', { className: 'pl-cap__cab' },
            h('span', { className: 'pl-cap__n', attrs: { 'aria-hidden': 'true' }, text: `Capítulo ${i + 1}` }),
            h('h3', { className: 'pl-cap__titulo', id: `${idsCap[i]}-t`, text: c.titulo }),
            temTexto(c.objetivo) ? h('p', { className: 'pl-cap__obj', text: c.objetivo }) : null,
            temTexto(c.onde) ? h('p', { className: 'pl-onde' }, h('span', { className: 'pl-onde__rot', text: 'Onde: ' }), h('span', { className: 'pl-marca-tela', text: c.onde })) : null),
          h('ol', { className: 'pl-passos-guia' }, passos.map((p, k) => h('li', { className: 'pl-passo-guia' },
            h('span', { className: 'pl-passo-guia__n', attrs: { 'aria-hidden': 'true' }, text: k + 1 }),
            h('div', { className: 'pl-passo-guia__corpo' },
              h('h4', { className: 'pl-passo-guia__titulo' }, h('span', { className: 'pl-sr', text: `Passo ${k + 1}: ` }), txt(p.titulo)),
              temTexto(p.texto) ? h('p', { text: p.texto }) : null,
              figuraAnotada(p),
              temTexto(p.dica) ? h('p', { className: 'pl-nota-guia pl-nota-guia--dica' }, icone('checklist'), h('span', null, h('strong', { text: 'Dica: ' }), p.dica)) : null,
              temTexto(p.atencao) ? h('p', { className: 'pl-nota-guia pl-nota-guia--atencao' }, icone('alerta'), h('span', null, h('strong', { text: 'Atenção: ' }), p.atencao)) : null,
              p.evidencia === 'a-conferir-na-tela' ? h('span', { className: 'pl-chip pl-chip--prep pl-chip--mini' }, icone('relogio'), EVIDENCIA[p.evidencia]) : null))))));
      });
    }

    // Bloco do consultor
    const k = jornada === 'consultor' && guia.consultor;
    if (k) {
      const grupos = [];
      const txtItem = (t) => (typeof t === 'string' ? t : txt(t && (t.texto || t.titulo)));
      if ((k.configuracoes || []).length) grupos.push(h('div', { className: 'pl-cons__g pl-cons__g--largo' }, h('h4', { text: 'Configurações que o módulo precisa' }),
        h('dl', { className: 'pl-cons__config' }, k.configuracoes.map((c) => h('div', null,
          h('dt', null, h('span', { text: txtItem(c.item || c.titulo || c) }), temTexto(c.onde) ? h('span', { className: 'pl-marca-tela', text: c.onde }) : null),
          temTexto(c.porque) ? h('dd', { text: c.porque }) : null)))));
      if ((k.integracoes || []).length) grupos.push(h('div', { className: 'pl-cons__g pl-cons__g--largo' }, h('h4', { text: 'Como este módulo afeta os outros' }),
        h('ul', { className: 'pl-cons__integra' }, k.integracoes.map((x) => h('li', null,
          h('span', { className: 'pl-cons__seta' }, h('strong', { text: txtItem(x.acao || x.titulo || x) }), icone('seta'), h('span', { text: txt(x.modulo) })),
          temTexto(x.efeito) ? h('span', { className: 'pl-cons__efeito', text: x.efeito }) : null)))));
      if ((k.roteiroDemonstracao || []).length) grupos.push(h('div', { className: 'pl-cons__g pl-cons__g--largo' }, h('h4', { text: 'Roteiro para demonstrar ao cliente' }),
        h('ol', { className: 'pl-cons__demo' }, k.roteiroDemonstracao.map((d) => h('li', null, h('strong', { text: txtItem(d.passo || d.titulo || d) }), temTexto(d.mostrar) ? h('span', { text: d.mostrar }) : null)))));
      if ((k.implantacao || []).length) grupos.push(h('div', { className: 'pl-cons__g' }, h('h4', { text: 'Ao implantar, confira' }), h('ul', { className: 'pl-cons__lista' }, k.implantacao.map((t) => h('li', null, icone('checklist'), h('span', { text: typeof t === 'string' ? t : t.texto }))))));
      if ((k.errosComuns || []).length) grupos.push(h('div', { className: 'pl-cons__g' }, h('h4', { text: 'Erros comuns' }), h('ul', { className: 'pl-cons__lista pl-cons__lista--erro' }, k.errosComuns.map((e) => h('li', null, icone('alerta'), h('span', null, h('strong', { text: e.titulo }), temTexto(e.texto) ? ` ${e.texto}` : null))))));
      if ((k.perguntasDoCliente || []).length) grupos.push(h('div', { className: 'pl-cons__g pl-cons__g--largo' }, h('h4', { text: 'Perguntas que o cliente faz' }),
        k.perguntasDoCliente.map((q) => h('details', { className: 'pl-faq' }, h('summary', { text: q.pergunta }), h('p', { text: q.resposta })))));
      if (grupos.length) raiz.append(h('section', { className: 'pl-guia__bloco pl-cons', attrs: { 'aria-labelledby': `${idg}-k` } }, h('h3', { className: 'pl-guia__h', id: `${idg}-k`, text: 'Para o consultor' }), h('div', { className: 'pl-cons__grade' }, grupos)));
    }

    const fontes = guia.fontes || [];
    if (fontes.length) raiz.append(h('details', { className: 'pl-fontes' }, h('summary', { text: plural(fontes.length, 'fonte do guia', 'fontes do guia') }), h('ul', null, fontes.map((f) => h('li', null, h('code', { text: f }))))));
    return raiz;
  }

  /* ---------- painel de Visibilidade (admin; contrato §4 + v2) ---------- */
  const PERFIS_VIS = [['estagiario', 'Estagiário'], ['consultor', 'Consultor']];
  const GRUPOS_VIS = [
    ['area', 'Áreas', 'Ocultar uma área esconde a aba e faz o servidor recusar o conteúdo dela.'],
    ['tipo', 'Tipos de material', 'Vale para todos os módulos: o material some dos cards e das páginas.'],
    ['modulo', 'Módulos', 'O módulo some da Página Inicial e das duas jornadas.']
  ];
  // Nomes das chaves: módulos = títulos do mapa do Engineer (doc 05); áreas/tipos = nome da aba/material.
  // Quem integra pode trocar por opcoes.nomes { chave: 'Nome' }.
  const NOMES_VIS = {
    'area:guia-inicial': 'Guia Inicial', 'area:guia-consultor': 'Guia do Consultor', 'area:pacotes': 'Pacotes',
    'area:checklists': 'Checklists', 'area:videos': 'Vídeos', 'area:apostila': 'Apostila', 'area:acervo': 'Acervo',
    'tipo:video': 'Vídeos', 'tipo:manual': 'Manuais', 'tipo:checklist': 'Checklists', 'tipo:fluxo': 'Fluxos',
    'modulo:primeiros-passos': 'Primeiros passos', 'modulo:fundacao': 'Cadastros e Fundação', 'modulo:crm': 'CRM',
    'modulo:cem': 'Integração CEM', 'modulo:vendas': 'Vendas', 'modulo:compras': 'Compras', 'modulo:recebimento': 'Recebimento',
    'modulo:estoque': 'Estoque', 'modulo:producao': 'Produção', 'modulo:servicos': 'Serviços e Instalação',
    'modulo:projetos': 'Projetos e Obras', 'modulo:expedicao': 'Expedição', 'modulo:faturamento': 'Faturamento',
    'modulo:fiscal': 'Fiscal', 'modulo:financeiro': 'Financeiro', 'modulo:tarefas': 'Tarefas',
    'modulo:relatorios': 'Relatórios e Análises', 'modulo:alumina': 'Alumina — IA', 'modulo:fluxo-completo': 'Visão do fluxo completo'
  };
  const ICONE_VIS = { 'area:apostila': 'manual', 'area:videos': 'video', 'area:checklists': 'checklist', 'tipo:video': 'video', 'tipo:manual': 'manual', 'tipo:checklist': 'checklist', 'tipo:fluxo': 'fluxo' };
  const fmtQuando = (d) => { try { return new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' }); } catch { return ''; } };
  const metaVis = (it) => (it.atualizado_em
    ? `Alterado por ${txt(it.atualizado_por_nome) || 'administrador'} em ${fmtQuando(it.atualizado_em)}`
    : 'Valor inicial, nunca alterado');
  const resumoPerfis = (it) => {
    if (!it.visivel) return 'Oculto para estagiários e consultores';
    const nomes = PERFIS_VIS.filter(([p]) => (it.perfis || []).includes(p)).map(([, n]) => n.toLowerCase());
    return nomes.length ? `Visível para ${nomes.join(' e ')}` : 'Sem perfil marcado: só administradores veem';
  };

  /**
   * @param itens   lista de GET /api/visibilidade?todos=1 [{chave, visivel, perfis, atualizado_por_nome, atualizado_em}]
   *                | null (carregando) | { erro: {status, mensagem} }
   * @param opcoes  { onSalvar(item) → Promise<item | {erro}>, onTentar?, desabilitado?: boolean | string, nomes?: {chave: nome} }
   *                Sem onSalvar (ou desabilitado) o painel fica só leitura. Admin sempre vê tudo (regra do servidor).
   */
  function renderPainelVisibilidade(el, itens, opcoes = {}) {
    el.classList.add('pl-raiz', 'pl-claro', 'pl-vis');
    if (itens == null) { estadoCarregando(el, { tipo: 'lista', quantidade: 6, texto: 'Carregando a visibilidade…' }); return; }
    if (!Array.isArray(itens)) {
      const e = itens.erro || {};
      estadoErro(el, { mensagem: e.mensagem, status: e.status, onTentar: opcoes.onTentar });
      return;
    }
    if (!itens.length) { estadoVazio(el, 'Nenhuma regra de visibilidade cadastrada. Sem regras, todos os perfis veem tudo.'); return; }
    limpar(el);
    el.removeAttribute('aria-busy');
    const nomes = { ...NOMES_VIS, ...(opcoes.nomes || {}) };
    const nomeDe = (c) => nomes[c] || txt(c).replace(/^[a-z]+:/, '').replace(/-/g, ' ');
    const salvarFn = typeof opcoes.onSalvar === 'function' ? opcoes.onSalvar : null;
    const somenteLeitura = !salvarFn || !!opcoes.desabilitado;
    const estado = new Map(itens.filter((i) => i && typeof i.chave === 'string').map((i) => [i.chave, { ...i, perfis: [...(i.perfis || [])] }]));
    const linhas = new Map(); // chave -> {li, atualizar}
    const idBase = uid('pl-vis');

    async function salvar(chave, novo, origem) {
      const ln = linhas.get(chave);
      const anterior = estado.get(chave);
      ln.ocupado(true, 'Salvando…');
      let r;
      try { r = await salvarFn({ chave, visivel: novo.visivel, perfis: [...novo.perfis] }); } catch (e) { r = { erro: { status: 0, mensagem: e && e.message } }; }
      if (!r || r.erro) {
        const msg = (r && r.erro && r.erro.mensagem) || 'A alteração não foi salva. Confira a conexão e tente de novo.';
        ln.ocupado(false);
        ln.atualizar(anterior);
        ln.erro(msg, () => salvar(chave, novo, origem));
        if (chave === 'area:apostila' && !origem) desenharDestaque(msg);
        return;
      }
      const salvo = { ...anterior, ...r, perfis: [...(r.perfis || novo.perfis)] };
      estado.set(chave, salvo);
      ln.ocupado(false);
      ln.atualizar(salvo, true);
      atualizarContagens();
      if (chave === 'area:apostila') desenharDestaque();
      anunciar(el, `${nomeDe(chave)}: ${resumoPerfis(salvo)}. Salvo.`);
      if (origem && origem.isConnected && !origem.disabled) origem.focus({ preventScroll: true });
      else if (chave === 'area:apostila' && !origem) { const art = destaque.querySelector('.pl-vis-destaque'); if (art) art.focus({ preventScroll: true }); }
    }

    function pedir(chave, novo, origem) {
      if (somenteLeitura) return;
      const atual = estado.get(chave);
      const ocultaArea = chave.startsWith('area:') && atual.visivel && !novo.visivel;
      if (ocultaArea) linhas.get(chave).confirmar(novo, origem);
      else salvar(chave, novo, origem);
    }

    function linha(it) {
      const chave = it.chave;
      const id = `${idBase}-${chave.replace(/[^a-z0-9-]/gi, '-')}`;
      const nome = nomeDe(chave);
      const li = h('li', { className: 'pl-vis-item', data: { chave } });
      const meta = h('p', { className: 'pl-vis-item__meta' });
      const resumo = h('p', { className: 'pl-vis-item__resumo', id: `${id}-r` });
      const sw = h('button', { className: 'pl-switch', id: `${id}-sw`, attrs: { type: 'button', role: 'switch', 'aria-describedby': `${id}-r` } },
        h('span', { className: 'pl-switch__trilho', attrs: { 'aria-hidden': 'true' } }, h('span', { className: 'pl-switch__bola' })),
        h('span', { className: 'pl-switch__txt' }),
        h('span', { className: 'pl-sr', text: ` ${nome}` }));
      const caixas = PERFIS_VIS.map(([p, rot]) => {
        const cb = h('input', { id: `${id}-${p}`, attrs: { type: 'checkbox', value: p } });
        return [p, cb, h('label', { className: 'pl-vis-perfil', attrs: { for: cb.id } }, cb, h('span', null, rot, h('span', { className: 'pl-sr', text: ` vê ${nome}` })))];
      });
      const situacao = h('div', { className: 'pl-vis-item__sit', attrs: { 'aria-live': 'polite' } });
      const confirmacao = h('div', { className: 'pl-vis-confirma', attrs: { hidden: true, role: 'group', 'aria-labelledby': `${id}-c` } });
      anexar(li, [
        h('div', { className: 'pl-vis-item__nome' }, h('span', { className: 'pl-vis-item__ic' }, icone(ICONE_VIS[chave] || (chave.startsWith('modulo:') ? chave.slice(7) : '_padrao'))),
          h('div', null, h('p', { className: 'pl-vis-item__titulo', id: `${id}-t`, text: nome }), resumo, meta)),
        h('div', { className: 'pl-vis-item__ctrl' },
          h('div', { className: 'pl-vis-perfis', attrs: { role: 'group', 'aria-label': `Perfis que veem ${nome}` } }, caixas.map((c) => c[2])),
          sw),
        situacao, confirmacao]);

      const ler = () => ({ visivel: sw.getAttribute('aria-checked') === 'true', perfis: caixas.filter((c) => c[1].checked).map((c) => c[0]) });
      function atualizar(v, salvo) {
        sw.setAttribute('aria-checked', String(!!v.visivel));
        sw.querySelector('.pl-switch__txt').textContent = v.visivel ? 'Visível' : 'Oculto';
        caixas.forEach(([p, cb]) => { cb.checked = (v.perfis || []).includes(p); });
        li.dataset.visivel = String(!!v.visivel);
        resumo.textContent = resumoPerfis(v);
        meta.textContent = metaVis(v);
        if (salvo) {
          situacao.replaceChildren(h('span', { className: 'pl-vis-ok' }, icone('checklist'), 'Salvo'));
          li.dataset.salvo = '';
          window.setTimeout(() => { delete li.dataset.salvo; if (situacao.querySelector('.pl-vis-ok')) situacao.replaceChildren(); }, 2600);
        }
      }
      function ocupado(sim, texto) {
        li.toggleAttribute('aria-busy', sim);
        [sw, ...caixas.map((c) => c[1])].forEach((c) => { c.disabled = sim || somenteLeitura; });
        if (sim) situacao.replaceChildren(h('span', { className: 'pl-vis-salvando' }, h('span', { className: 'pl-vis-giro', attrs: { 'aria-hidden': 'true' } }), texto));
      }
      function erro(msg, tentar) {
        situacao.replaceChildren(h('div', { className: 'pl-vis-erro', attrs: { role: 'alert' } },
          icone('alerta'), h('span', { text: msg }),
          h('button', { className: 'pl-botao pl-botao--sec', attrs: { type: 'button' }, on: { click: tentar } }, icone('tentar'), h('span', { text: 'Tentar de novo' }))));
      }
      function confirmar(novo, origem) {
        const cancelar = () => { confirmacao.hidden = true; confirmacao.replaceChildren(); atualizar(estado.get(chave)); delete li.dataset.confirmando; origem && origem.focus(); };
        const ok = h('button', { className: 'pl-botao pl-botao--perigo', attrs: { type: 'button' }, on: { click: () => { confirmacao.hidden = true; confirmacao.replaceChildren(); delete li.dataset.confirmando; salvar(chave, novo, origem); } } }, `Ocultar ${nome}`);
        confirmacao.replaceChildren(
          h('p', { id: `${id}-c` }, h('strong', { text: `Ocultar ${nome} para estagiários e consultores?` }), ' Quem não é administrador deixa de ver a área, e o servidor passa a recusar o conteúdo dela.'),
          h('div', { className: 'pl-vis-confirma__acoes' }, ok, h('button', { className: 'pl-botao pl-botao--sec', attrs: { type: 'button' }, on: { click: cancelar } }, 'Cancelar')));
        confirmacao.onkeydown = (e) => { if (e.key === 'Escape') { e.preventDefault(); cancelar(); } };
        confirmacao.hidden = false;
        li.dataset.confirmando = '';
        ok.focus();
      }
      sw.addEventListener('click', () => { const v = ler(); pedir(chave, { visivel: !v.visivel, perfis: v.perfis }, sw); });
      caixas.forEach(([, cb]) => cb.addEventListener('change', () => pedir(chave, ler(), cb)));
      atualizar(it);
      ocupado(false);
      linhas.set(chave, { li, atualizar, ocupado, erro, confirmar });
      return li;
    }

    // Destaque: apostila (em standby quando oculta) com Reativar
    const destaque = h('div', { className: 'pl-vis-destaque-slot' });
    function desenharDestaque(msgErro) {
      const ap = estado.get('area:apostila');
      if (!ap) { destaque.replaceChildren(); return; }
      const standby = !ap.visivel;
      const idT = `${idBase}-apostila`;
      const card = h('article', { className: 'pl-vis-destaque', data: { standby }, attrs: { 'aria-labelledby': idT, tabindex: -1 } },
        h('span', { className: 'pl-vis-destaque__ic' }, icone('manual')),
        h('div', { className: 'pl-vis-destaque__txt' },
          h('div', { className: 'pl-vis-destaque__cab' }, h('h3', { id: idT, text: nomeDe('area:apostila') }),
            standby ? h('span', { className: 'pl-chip pl-chip--prep' }, icone('relogio'), 'Em standby') : chip('disponivel')),
          h('p', { text: standby
            ? 'Oculta para estagiários e consultores. Enquanto estiver em standby, os endereços da apostila respondem 404.'
            : `${resumoPerfis(ap)}.` }),
          h('p', { className: 'pl-vis-item__meta', text: metaVis(ap) })));
      if (standby) {
        const perfis = ap.perfis && ap.perfis.length ? ap.perfis : PERFIS_VIS.map((p) => p[0]);
        const b = h('button', { className: 'pl-botao pl-botao--primario pl-vis-destaque__acao', attrs: { type: 'button', 'aria-describedby': idT } }, icone('tentar'), h('span', { text: 'Reativar' }));
        b.disabled = somenteLeitura;
        b.addEventListener('click', () => {
          b.disabled = true;
          b.setAttribute('aria-busy', 'true');
          b.lastChild.textContent = 'Reativando…';
          salvar('area:apostila', { visivel: true, perfis }, null);
        });
        card.append(b);
        if (msgErro) card.append(h('p', { className: 'pl-vis-erro pl-vis-destaque__erro', attrs: { role: 'alert' } }, icone('alerta'), h('span', { text: `A apostila continua em standby. ${msgErro}` })));
      }
      destaque.replaceChildren(card);
    }

    const contagens = [];
    function atualizarContagens() { contagens.forEach(([pref, el2]) => { const g = [...estado.values()].filter((i) => i.chave.startsWith(`${pref}:`)); el2.textContent = `${g.filter((i) => i.visivel && i.perfis.length).length} de ${g.length} visíveis`; }); }

    const idTit = `${idBase}-titulo`;
    const raiz = h('section', { className: 'pl-vis__painel', attrs: { 'aria-labelledby': idTit } },
      h('header', { className: 'pl-vis__cab' },
        h('h2', { id: idTit, text: 'Visibilidade' }),
        h('p', { text: 'Escolha o que estagiários e consultores veem. Administradores sempre veem tudo.' })),
      somenteLeitura ? h('p', { className: 'pl-vis-leitura', attrs: { role: 'note' } }, icone('oculto'),
        typeof opcoes.desabilitado === 'string' ? opcoes.desabilitado : 'Somente leitura: seu perfil pode ver as regras, mas não alterá-las.') : null,
      destaque,
      GRUPOS_VIS.map(([pref, titulo, ajuda]) => {
        const lista = [...estado.values()].filter((i) => i.chave.startsWith(`${pref}:`));
        if (!lista.length) return null;
        const idG = `${idBase}-${pref}`;
        const cont = h('span', { className: 'pl-vis-grupo__cont' });
        contagens.push([pref, cont]);
        return h('section', { className: 'pl-vis-grupo', attrs: { 'aria-labelledby': idG } },
          h('div', { className: 'pl-vis-grupo__cab' }, h('h3', { id: idG, text: titulo }), cont),
          h('p', { className: 'pl-vis-grupo__ajuda', text: ajuda }),
          h('ul', { className: 'pl-vis-lista' }, lista.map(linha)));
      }));
    desenharDestaque();
    atualizarContagens();
    el.append(raiz);
    if (somenteLeitura) el.dataset.somenteLeitura = '';
    else delete el.dataset.somenteLeitura;
    anunciar(el, `Visibilidade: ${plural(estado.size, 'regra', 'regras')}${estado.get('area:apostila') && !estado.get('area:apostila').visivel ? ', apostila em standby' : ''}.`);
  }

  /* ---------- reação a mudanças de preferência ---------- */
  mqHover.addEventListener?.('change', () => document.querySelectorAll('.pl-card').forEach((c) => c._plAplicar && c._plAplicar()));

  window.PlataformaUI = Object.freeze({
    renderPaginaInicial,
    renderCardModulo,
    renderJornada,
    renderModulo,
    renderPainelVisibilidade,
    estadoCarregando,
    estadoErro,
    estadoVazio,
    transicao,
    // Fonte única do mapa de ícones (nome -> <svg> completo, mesmo formato da cópia do index.html).
    // Nomes de módulo: os 19 ids do mapa (vendas, faturamento, …). icone(nome) devolve o SVGElement.
    icones: ICONES_SVG,
    icone,
    // utilitários de texto seguro, para o Lead/Engineer reaproveitarem (ex.: painel de Visibilidade)
    texto: Object.freeze({ inline, urlSegura }),
    contrato: 'v2',
    versao: '2026-11-05-ui-v2.2'
  });
})();
