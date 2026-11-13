/* ==========================================================================
   Faktory Flow — Glifos da Metodologia (grade 24, SVG estático, nunca dado externo).
   Desenho próprio em duas camadas + destaque:
     g-f  preenchimento suave (cor atual, baixa opacidade)
     (sem classe) traço 1,6 px arredondado
     g-a  destaque preenchido · g-as destaque em traço  → cor em --g-acento (lima da marca no escuro)
   Expõe window.MetodologiaGlifos.glifo(nome) → SVGElement novo e .tem(nome).
   ========================================================================== */
(function () {
  'use strict';
  const SVG = 'http://www.w3.org/2000/svg';

  const G = {
    'primeiros-passos': `
      <path class="g-f" d="M5.5 4h11l-2.5 3.5L16.5 11h-11z"/>
      <path d="M5.5 21V4h11l-2.5 3.5L16.5 11h-11"/>
      <path class="g-as" d="M9.5 20.5c2.5 0 3.5-2.5 6-2.5" stroke-dasharray="1.2 2.4"/>
      <circle class="g-a" cx="19" cy="17.5" r="1.6"/>`,
    fundacao: `
      <rect class="g-f" x="3" y="15" width="18" height="5.5" rx="1"/>
      <rect x="3" y="4" width="18" height="16.5" rx="1.6"/>
      <path d="M3 9.5h18M3 15h18M9 4v5.5M15 4v5.5M12 9.5V15M7.5 15v5.5M16.5 15v5.5"/>
      <rect class="g-a" x="9.8" y="4.8" width="4.4" height="3.9" rx=".6"/>`,
    crm: `
      <path class="g-f" d="M3.5 8h17l-6.5 7v5.5l-4-2V15z"/>
      <path d="M3.5 8h17l-6.5 7v5.5l-4-2V15z"/>
      <circle class="g-a" cx="7.5" cy="4" r="1.4"/><circle class="g-a" cx="12" cy="3.4" r="1.4"/><circle class="g-a" cx="16.5" cy="4" r="1.4"/>`,
    cem: `
      <path class="g-f" d="M6 8h12v3a6 6 0 0 1-12 0z"/>
      <path d="M9 3.5V8M15 3.5V8"/><path d="M6 8h12v3a6 6 0 0 1-12 0z"/><path d="M12 17v4"/>
      <path class="g-as" d="M12.8 9.6 11 12.2h2.2L11.4 15"/>`,
    vendas: `
      <path class="g-f" d="M3 12.2V4.6A1.6 1.6 0 0 1 4.6 3h7.6l8.4 8.4a1.7 1.7 0 0 1 0 2.4l-6.8 6.8a1.7 1.7 0 0 1-2.4 0z"/>
      <path d="M3 12.2V4.6A1.6 1.6 0 0 1 4.6 3h7.6l8.4 8.4a1.7 1.7 0 0 1 0 2.4l-6.8 6.8a1.7 1.7 0 0 1-2.4 0z"/>
      <circle class="g-a" cx="8" cy="8" r="1.9"/>`,
    compras: `
      <path class="g-f" d="M4.5 8.5h15l-1 11.6a1 1 0 0 1-1 .9h-11a1 1 0 0 1-1-.9z"/>
      <path d="M4.5 8.5h15l-1 11.6a1 1 0 0 1-1 .9h-11a1 1 0 0 1-1-.9z"/>
      <path d="M8.5 11V7a3.5 3.5 0 0 1 7 0v4"/>
      <path class="g-as" d="M9.3 15.3l1.9 1.9 3.6-3.7"/>`,
    recebimento: `
      <path class="g-f" d="M3 14h5l1.5 2.5h5L16 14h5v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <path d="M3 14h5l1.5 2.5h5L16 14h5v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <path d="M3 14l2.2-5H8M21 14l-2.2-5H16"/>
      <path class="g-as" d="M12 3v8.5M9 8.8l3 3 3-3"/>`,
    estoque: `
      <path d="M3.5 21V3M20.5 21V3M3.5 12h17M3.5 20.5h17"/>
      <rect class="g-f" x="6" y="6" width="5" height="6" rx=".8"/><rect x="6" y="6" width="5" height="6" rx=".8"/>
      <rect class="g-a" x="13" y="8" width="4.5" height="4" rx=".8"/>
      <rect class="g-f" x="11.5" y="14.5" width="6" height="6" rx=".8"/><rect x="11.5" y="14.5" width="6" height="6" rx=".8"/>`,
    producao: `
      <path class="g-f" d="M3 21v-9.5l5 3v-3l5 3V5h6v16z"/>
      <path d="M3 21v-9.5l5 3v-3l5 3V5h6v16"/><path d="M2 21h20"/>
      <path d="M6.5 18h1.5M10.5 18h1.5"/>
      <circle class="g-a" cx="16" cy="2.4" r="1.2"/><rect class="g-a" x="15" y="16" width="2" height="2.5" rx=".4"/>`,
    servicos: `
      <rect class="g-f" x="3" y="9" width="18" height="11.5" rx="2"/>
      <rect x="3" y="9" width="18" height="11.5" rx="2"/>
      <path d="M9 9V6.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V9M3 14h18"/>
      <rect class="g-a" x="10.4" y="12.3" width="3.2" height="3.4" rx=".7"/>`,
    projetos: `
      <path d="M3 3v18h18"/>
      <rect class="g-f" x="6.5" y="5" width="7" height="3.2" rx="1.2"/><rect x="6.5" y="5" width="7" height="3.2" rx="1.2"/>
      <rect class="g-a" x="10" y="10.4" width="9" height="3.2" rx="1.2"/>
      <rect class="g-f" x="7.5" y="15.8" width="6" height="3.2" rx="1.2"/><rect x="7.5" y="15.8" width="6" height="3.2" rx="1.2"/>`,
    expedicao: `
      <path class="g-f" d="M2.5 6.5a1 1 0 0 1 1-1H14v11H2.5z"/>
      <path d="M2.5 16.5v-10a1 1 0 0 1 1-1H14v11"/><path d="M14 9h4l3.5 3.8v3.7H14"/><path d="M8.5 16.5h7"/>
      <circle cx="6.5" cy="17.5" r="2"/><circle cx="17.5" cy="17.5" r="2"/>
      <path class="g-a" d="M15.6 10.6h1.9l1.9 2.1h-3.8z"/>`,
    faturamento: `
      <path class="g-f" d="M5 3h14v18l-2.3-1.5-2.4 1.5-2.3-1.5L9.7 21l-2.4-1.5L5 21z"/>
      <path d="M5 3h14v18l-2.3-1.5-2.4 1.5-2.3-1.5L9.7 21l-2.4-1.5L5 21z"/>
      <path d="M8.5 7.5h7M8.5 11h7"/>
      <path class="g-as" d="M8.5 15h3.5"/><circle class="g-a" cx="15.3" cy="15" r="1.2"/>`,
    fiscal: `
      <path class="g-f" d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/>
      <path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/>
      <path class="g-as" d="M9.6 14.6l4.8-4.8"/><circle class="g-a" cx="9.8" cy="10" r="1.2"/><circle class="g-a" cx="14.2" cy="14.4" r="1.2"/>`,
    financeiro: `
      <ellipse class="g-f" cx="9" cy="6" rx="6" ry="2.5"/>
      <ellipse cx="9" cy="6" rx="6" ry="2.5"/>
      <path d="M3 6v8.5C3 15.9 5.7 17 9 17"/><path d="M3 10.2c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6"/>
      <path class="g-as" d="M12 20.5l3.5-3.5 2.5 2.5 3.5-4M18.8 15.5h2.7v2.7"/>`,
    tarefas: `
      <rect class="g-f" x="3" y="3" width="18" height="18" rx="3"/>
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M11.5 8.5h6M11.5 15.5h6"/><rect x="6.5" y="14" width="3" height="3" rx=".8"/>
      <path class="g-as" d="M6.4 8.6l1.3 1.3 2.2-2.4"/>`,
    relatorios: `
      <rect class="g-f" x="3" y="3" width="18" height="18" rx="3"/>
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <path d="M8 17v-4M16 17v-6"/><path class="g-as" d="M12 17V7.5"/>`,
    alumina: `
      <path class="g-f" d="M10 3.5l1.7 4.6a2 2 0 0 0 1.2 1.2l4.6 1.7-4.6 1.7a2 2 0 0 0-1.2 1.2L10 18.5l-1.7-4.6a2 2 0 0 0-1.2-1.2L2.5 11l4.6-1.7a2 2 0 0 0 1.2-1.2z"/>
      <path d="M10 3.5l1.7 4.6a2 2 0 0 0 1.2 1.2l4.6 1.7-4.6 1.7a2 2 0 0 0-1.2 1.2L10 18.5l-1.7-4.6a2 2 0 0 0-1.2-1.2L2.5 11l4.6-1.7a2 2 0 0 0 1.2-1.2z"/>
      <path class="g-a" d="M18.5 2.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/><circle class="g-a" cx="19" cy="18.5" r="1.3"/>`,
    'fluxo-completo': `
      <circle class="g-f" cx="5.5" cy="6" r="2.5"/><circle cx="5.5" cy="6" r="2.5"/>
      <circle cx="18.5" cy="6" r="2.5"/>
      <path d="M8 6h8M18.5 8.5v7M16 18H8.5a3 3 0 0 1-3-3V8.5"/>
      <circle class="g-a" cx="18.5" cy="18" r="2.6"/>`,
    // materiais do módulo
    video: `
      <rect class="g-f" x="2.5" y="5" width="19" height="14" rx="3.2"/>
      <rect x="2.5" y="5" width="19" height="14" rx="3.2"/>
      <path class="g-a" d="M10 9.3v5.4a.5.5 0 0 0 .75.43l4.6-2.7a.5.5 0 0 0 0-.86l-4.6-2.7A.5.5 0 0 0 10 9.3z"/>`,
    checklist: `
      <rect class="g-f" x="4.5" y="4.5" width="15" height="17" rx="2.5"/>
      <rect x="4.5" y="4.5" width="15" height="17" rx="2.5"/>
      <rect x="9" y="2.5" width="6" height="3.5" rx="1"/>
      <path class="g-as" d="M8.6 13.4l2.3 2.3 4.6-4.7"/>`,
    manual: `
      <path class="g-f" d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1z"/>
      <path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6.5v13"/>
      <path class="g-as" d="M15 10h3M15 13.5h2"/>`,
  };

  const cache = new Map();
  function glifo(nome) {
    if (!G[nome]) return null;
    if (!cache.has(nome)) {
      const doc = new DOMParser().parseFromString(`<svg xmlns="${SVG}">${G[nome]}</svg>`, 'image/svg+xml');
      const svg = document.createElementNS(SVG, 'svg');
      const a = { viewBox: '0 0 24 24', class: 'mt-glifo', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', 'data-glifo': nome };
      for (const [k, v] of Object.entries(a)) svg.setAttribute(k, v);
      [...doc.documentElement.childNodes].forEach((n) => svg.append(document.importNode(n, true)));
      cache.set(nome, svg);
    }
    return cache.get(nome).cloneNode(true);
  }
  window.MetodologiaGlifos = Object.freeze({ glifo, tem: (n) => Object.prototype.hasOwnProperty.call(G, n), nomes: Object.freeze(Object.keys(G)) });
})();
