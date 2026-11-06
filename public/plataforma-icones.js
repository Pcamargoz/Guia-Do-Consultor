/* ==========================================================================
   Faktory Flow — Ilustrações dos 19 módulos (grid 96, SVG estático, nunca dado externo).
   Camadas por classe, coloridas em plataforma-v3.css pela cor do módulo (--c):
     fi-a tinta suave · fi-b tinta média · fi-c cor cheia · fi-w branco · fi-y lima da marca · fi-n sem traço
   Partes com classe m-* são as que se movem no hover/foco (animação contextual de cada módulo).
   Expõe window.PlataformaIcones.modulo(id) → SVGElement novo (clone do cache).
   ========================================================================== */
(function () {
  'use strict';
  const SVG = 'http://www.w3.org/2000/svg';

  /** Placa isométrica com espessura (módulo Fundação). */
  const placa = (y, cor, extra = '') => `<g class="${extra}"><path class="${cor}" d="M16 ${y + 16}v8l32 16 32-16v-8L48 ${y + 32}z"/><path class="${cor}" d="M48 ${y}l32 16-32 16-32-16z"/></g>`;

  const ILUSTRACOES = {
    'primeiros-passos': `
      <circle class="fi-y fi-n m-sol" cx="74" cy="22" r="9"/>
      <path class="fi-a fi-n" d="M4 80c12-3 18-16 30-24s22-5 30-13 14-6 28-4v50H4z"/>
      <path class="fi-b fi-n" d="M4 88c14-1 24-13 40-15s30 2 48-9v24H4z"/>
      <path d="M6 87c14-1 24-13 38-15s30 2 46-8"/>
      <g class="m-trilha"><circle class="fi-c fi-n" cx="20" cy="80" r="2.4"/><circle class="fi-c fi-n" cx="32" cy="72" r="2.4"/><circle class="fi-c fi-n" cx="45" cy="66" r="2.4"/><circle class="fi-c fi-n" cx="56" cy="65" r="2.4"/></g>
      <path d="M64 66V28"/>
      <path class="fi-c m-bandeira" d="M64 28l20 7-20 8z"/>`,
    fundacao: `
      ${placa(50, 'fi-a')}${placa(31, 'fi-b', 'm-sobe-1')}${placa(12, 'fi-c', 'm-sobe-2')}
      <g class="m-sobe-2"><circle class="fi-w" cx="48" cy="28" r="5"/><path d="M34 28l5-2.5M62 28l-5-2.5" /></g>`,
    crm: `
      <g class="m-cai"><circle class="fi-c" cx="34" cy="11" r="5"/><circle class="fi-y" cx="49" cy="8" r="5"/><circle class="fi-b" cx="63" cy="12" r="5"/></g>
      <path class="fi-a" d="M12 26h72L58 58v20l-20 9V58z"/>
      <ellipse class="fi-w" cx="48" cy="26" rx="36" ry="7"/>
      <path d="M24 40h48M34 50h28" opacity=".55"/>
      <path d="M44 66h8M44 74h8" opacity=".55"/>`,
    cem: `
      <rect class="fi-a" x="6" y="22" width="38" height="52" rx="5"/>
      <rect class="fi-w" x="13" y="29" width="24" height="38" rx="1.5"/>
      <path d="M25 29v38M13 48h24"/>
      <path class="fi-b fi-n" d="M16 32h7L16 44z"/>
      <rect class="fi-w" x="52" y="34" width="38" height="46" rx="5"/>
      <path class="fi-c fi-n" d="M52 39a5 5 0 0 1 5-5h28a5 5 0 0 1 5 5v5H52z"/>
      <path d="M60 54h22M60 62h22M60 70h13"/>
      <g class="m-troca"><path d="M28 13c8-7 26-7 36 3"/><path d="M66 8l-1 9-9-2"/></g>
      <g class="m-troca-2"><circle class="fi-y" cx="48" cy="58" r="8"/><path d="M44 58h8M49 55l3 3-3 3"/></g>`,
    vendas: `
      <g class="m-carrinho">
        <rect class="fi-c m-pula" x="33" y="14" width="19" height="19" rx="2.5"/><path class="m-pula" d="M42.5 14v7"/>
        <rect class="fi-y m-pula-2" x="54" y="20" width="15" height="13" rx="2"/>
        <path class="fi-a" d="M22 32h60l-9 32H30z"/>
        <path d="M6 16h11l13 48h43"/>
        <path d="M37 44h34M40 53h27" opacity=".55"/>
        <circle class="fi-w" cx="36" cy="76" r="7"/><circle class="fi-w" cx="68" cy="76" r="7"/>
        <circle class="fi-c fi-n" cx="36" cy="76" r="2"/><circle class="fi-c fi-n" cx="68" cy="76" r="2"/>
      </g>`,
    compras: `
      <path class="fi-a" d="M20 34h52l6 52H14z"/>
      <path d="M32 44V26a14 14 0 0 1 28 0v18"/>
      <circle class="fi-c fi-n" cx="32" cy="44" r="2.6"/><circle class="fi-c fi-n" cx="60" cy="44" r="2.6"/>
      <path d="M26 60h22M26 69h14" opacity=".55"/>
      <g class="m-etiqueta"><path class="fi-y" d="M56 52h20l12 13-12 13H56z"/><circle class="fi-w" cx="63" cy="65" r="3"/><path d="M71 60v10" opacity=".55"/></g>`,
    recebimento: `
      <g class="m-desce"><path class="fi-c" d="M39 6h18v20h11L48 48 28 26h11z"/></g>
      <path class="fi-a" d="M14 48l34 15 34-15v30L48 92 14 78z"/>
      <path d="M48 63v29"/>
      <path class="fi-w" d="M14 48L5 37l34-14 9 9-34 16zM82 48l9-11-34-14-9 9 34 16z"/>
      <circle class="fi-y" cx="74" cy="76" r="11"/><path d="M68.5 76l4 4.2 7.2-8"/>`,
    estoque: `
      <path d="M10 90V8M86 90V8"/>
      <path class="fi-w" d="M10 34h76v5H10zM10 62h76v5H10zM10 85h76v5H10z"/>
      <rect class="fi-b" x="17" y="13" width="20" height="21" rx="2"/><path d="M27 13v7"/>
      <rect class="fi-a" x="41" y="19" width="16" height="15" rx="2"/>
      <rect class="fi-y" x="61" y="15" width="18" height="19" rx="2"/>
      <rect class="fi-a" x="17" y="44" width="16" height="18" rx="2"/>
      <g class="m-desliza"><rect class="fi-c" x="37" y="41" width="24" height="21" rx="2"/><path d="M49 41v8"/></g>
      <rect class="fi-b" x="20" y="71" width="24" height="14" rx="2"/>
      <rect class="fi-a" x="50" y="69" width="16" height="16" rx="2"/>`,
    producao: `
      <g class="m-fumaca"><circle class="fi-b fi-n" cx="78" cy="13" r="4"/><circle class="fi-a fi-n" cx="86" cy="6" r="3"/></g>
      <path class="fi-a" d="M8 86V44l21 13V44l21 13V44l21 13V20h14v66z"/>
      <path d="M71 28h14" opacity=".55"/>
      <rect class="fi-w" x="54" y="66" width="9" height="9" rx="1.5"/><rect class="fi-w" x="69" y="66" width="9" height="9" rx="1.5"/>
      <g class="m-gira"><circle class="fi-dente" cx="30" cy="68" r="15"/><circle class="fi-c" cx="30" cy="68" r="12"/><circle class="fi-w" cx="30" cy="68" r="4.5"/></g>`,
    servicos: `
      <rect class="fi-a" x="10" y="9" width="54" height="76" rx="3"/>
      <rect class="fi-w" x="18" y="17" width="38" height="60"/>
      <path d="M37 17v60M18 47h38"/>
      <path class="fi-b fi-n" d="M21 20h13L21 40z"/>
      <path d="M6 90h60" opacity=".55"/>
      <g class="m-chave"><path class="fi-c" d="M87 47a13 13 0 0 1-17 16L52 81a6.5 6.5 0 0 1-9-9l18-18a13 13 0 0 1 16-17l-9 9 2 7 7 2z"/><circle class="fi-y fi-n" cx="48" cy="76" r="2.2"/></g>`,
    projetos: `
      <path class="fi-a" d="M10 88V50h36v38z"/>
      <path class="fi-w" d="M17 58h8v8h-8zM31 58h8v8h-8zM17 72h8v8h-8zM31 72h8v16h-8z"/>
      <path d="M4 88h88"/>
      <path d="M64 88V16M72 88V16M64 74l8-8-8-8 8-8-8-8 8-8-8-8"/>
      <path class="fi-c" d="M22 16h66v6H22z"/>
      <path d="M68 16V6L28 16M68 6l18 10"/>
      <g class="m-gancho"><path d="M36 22v18"/><rect class="fi-y" x="27" y="40" width="18" height="10" rx="1.5"/></g>`,
    expedicao: `
      <path class="fi-y" d="M76 4c-7 0-12 5-12 11.5C64 24 76 34 76 34s12-10 12-18.500C88 9 83 4 76 4z"/>
      <circle class="fi-w" cx="76" cy="15" r="4"/>
      <g class="m-caminhao">
        <rect class="fi-a" x="6" y="28" width="50" height="38" rx="3"/>
        <path d="M14 38h24M14 47h16" opacity=".55"/>
        <path class="fi-c" d="M56 40h16l14 15v11H56z"/>
        <path class="fi-w" d="M63 46h7l7 9H63z"/>
        <circle class="fi-w m-roda" cx="24" cy="70" r="7.500"/><circle class="fi-w m-roda" cx="70" cy="70" r="7.500"/>
      </g>
      <path class="m-estrada" d="M2 86h92" stroke-dasharray="9 7"/>`,
    faturamento: `
      <g class="m-imprime">
        <path class="fi-w" d="M24 6h48v60H24z"/>
        <path d="M33 17h20M33 27h30M33 37h30" opacity=".7"/>
        <path d="M33 47v8M37 47v8M43 47v8M47 47v8M53 47v8M59 47v8M63 47v8"/>
      </g>
      <path class="fi-c" d="M8 58a6 6 0 0 1 6-6h68a6 6 0 0 1 6 6v22H8z"/>
      <path class="fi-a" d="M22 72h52v16H22z"/>
      <circle class="fi-y fi-n m-led" cx="77" cy="62" r="3.200"/>
      <path d="M30 80h36" opacity=".55"/>`,
    fiscal: `
      <path class="fi-a" d="M12 6h46l18 18v66H12z"/>
      <path class="fi-w" d="M58 6v18h18z"/>
      <circle class="fi-w" cx="27" cy="33" r="5"/><circle class="fi-w" cx="46" cy="50" r="5"/>
      <path d="M49 28L24 55"/>
      <path d="M22 68h24M22 77h16" opacity=".55"/>
      <g class="m-carimbo"><circle class="fi-c" cx="70" cy="42" r="7.500"/><path class="fi-c" d="M66 49h8l2 12H64z"/><rect class="fi-y" x="52" y="61" width="36" height="10" rx="2.500"/></g>
      <path class="m-marca" d="M56 80h28" stroke-width="3"/>`,
    financeiro: `
      <path class="fi-a" d="M8 58v24c0 4 9 8 20 8s20-4 20-8V58z"/>
      <ellipse class="fi-b" cx="28" cy="58" rx="20" ry="8"/>
      <path d="M8 67c0 4 9 8 20 8s20-4 20-8M8 75c0 4 9 8 20 8s20-4 20-8" opacity=".6"/>
      <path class="fi-a" d="M50 72v10c0 4 8 8 19 8s19-4 19-8V72z"/>
      <ellipse class="fi-c" cx="69" cy="72" rx="19" ry="7.500"/>
      <g class="m-moeda"><circle class="fi-y" cx="60" cy="27" r="16"/><circle cx="60" cy="27" r="11" opacity=".4"/><path d="M65 21.500h-7a3 3 0 0 0 0 6h4.500a3 3 0 0 1 0 6H55M60 18v18"/></g>`,
    tarefas: `
      <rect class="fi-a" x="6" y="10" width="84" height="76" rx="7"/>
      <path d="M34 10v76M62 10v76" opacity=".4"/>
      <rect class="fi-w" x="12" y="20" width="16" height="14" rx="2"/>
      <rect class="fi-w" x="12" y="39" width="16" height="14" rx="2"/>
      <rect class="fi-b" x="12" y="58" width="16" height="14" rx="2"/>
      <g class="m-cartao"><rect class="fi-c" x="40" y="26" width="16" height="16" rx="2.500"/></g>
      <rect class="fi-w" x="40" y="48" width="16" height="14" rx="2"/>
      <rect class="fi-y" x="68" y="20" width="16" height="16" rx="2.500"/>
      <path class="m-check" pathLength="1" d="M71.500 28.500l3.500 3.500 6-7"/>
      <rect class="fi-w" x="68" y="42" width="16" height="14" rx="2"/>`,
    relatorios: `
      <rect class="fi-w" x="8" y="8" width="80" height="80" rx="7"/>
      <path d="M18 76h60" opacity=".55"/>
      <rect class="fi-b m-barra" x="22" y="52" width="11" height="24" rx="2"/>
      <rect class="fi-c m-barra m-barra--2" x="38" y="38" width="11" height="38" rx="2"/>
      <rect class="fi-a m-barra m-barra--3" x="54" y="58" width="11" height="18" rx="2"/>
      <path d="M20 40l18-13 16 8 22-17"/>
      <circle class="fi-y" cx="76" cy="18" r="5"/>`,
    alumina: `
      <path class="fi-a" d="M14 22h54a9 9 0 0 1 9 9v32a9 9 0 0 1-9 9H38L20 88V72h-6a9 9 0 0 1-9-9V31a9 9 0 0 1 9-9z"/>
      <path class="fi-c m-brilho" d="M38 28l5 14 14 5-14 5-5 14-5-14-14-5 14-5z"/>
      <path class="fi-y m-brilho-2" d="M78 6l3.500 10.500L92 20l-10.500 3.500L78 34l-3.500-10.500L64 20l10.500-3.500z"/>
      <circle class="fi-b fi-n m-brilho-3" cx="62" cy="58" r="3.500"/>`,
    'fluxo-completo': `
      <path class="m-fluxo" d="M22 22h52a10 10 0 0 1 10 10v32a10 10 0 0 1-10 10H22a10 10 0 0 1-10-10V32a10 10 0 0 1 10-10z" stroke-dasharray="6 6"/>
      <circle class="fi-c" cx="20" cy="24" r="10"/><circle class="fi-y" cx="76" cy="24" r="10"/>
      <circle class="fi-b" cx="76" cy="72" r="10"/><circle class="fi-a" cx="20" cy="72" r="10"/>
      <path class="fi-b fi-n" d="M38 58V46h9V36h11v22z"/>
      <path d="M38 58V46h9V36h11v22z"/>`,
  };

  const cache = new Map();
  /** Ilustração do módulo. Id desconhecido cai na do fluxo completo. */
  function modulo(id) {
    const chave = ILUSTRACOES[id] ? id : 'fluxo-completo';
    if (!cache.has(chave)) {
      const doc = new DOMParser().parseFromString(`<svg xmlns="${SVG}">${ILUSTRACOES[chave]}</svg>`, 'image/svg+xml');
      const svg = document.createElementNS(SVG, 'svg');
      const attrs = { viewBox: '0 0 96 96', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false', class: `fi fi--${chave}` };
      for (const [k, v] of Object.entries(attrs)) svg.setAttribute(k, v);
      [...doc.documentElement.childNodes].forEach((n) => svg.append(document.importNode(n, true)));
      cache.set(chave, svg);
    }
    return cache.get(chave).cloneNode(true);
  }

  window.PlataformaIcones = Object.freeze({ modulo, ids: Object.freeze(Object.keys(ILUSTRACOES)) });
})();
