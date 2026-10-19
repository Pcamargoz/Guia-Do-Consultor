/* Gera os checklists resumidos da Trilha do Estagiário (scripts/dados-checklists-estagiarios.mjs) e o checklist
   de teste de fluxo do consultor (scripts/dados-checklist-consultor.mjs).
   Cada checklist vira um HTML independente (abre offline, marca as etapas e guarda o progresso no navegador).
   Saída: <raiz>/estagiarios/ e <raiz>/consultores/, em public/checklists (servido pelo guia) e Checklists (cópia de trabalho).
   Uso: node scripts/gerar-checklists-estagiarios.mjs */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { CHECKLISTS, ONBOARDING, META } from './dados-checklists-estagiarios.mjs';
import { CONSULTOR } from './dados-checklist-consultor.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const raizes = ['public/checklists', 'Checklists'].filter((d) => existsSync(path.join(RAIZ, d)));
const LOGO = `data:image/png;base64,${(await readFile(path.join(RAIZ, 'public/assets/Logo Faktory Flow.png'))).toString('base64')}`;

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* **negrito** e `Menu > Tela` dentro dos textos */
const fmt = (v) => esc(v).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<span class="ui">$1</span>');

const STATUS = {
  v: { rotulo: 'Verificado no sistema', curto: 'Verificado', classe: 'st-v' },
  d: { rotulo: 'Baseado na documentação', curto: 'Documentação', classe: 'st-d' },
  n: { rotulo: 'Ainda não validado', curto: 'Não validado', classe: 'st-n' },
};
const selo = (s) => {
  const st = STATUS[s] || STATUS.d;
  return `<span class="selo ${st.classe}" title="${st.rotulo}">${st.curto}</span>`;
};

const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONE = {
  alvo: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
  lista: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>'),
  passos: svg('<path d="M4 17h4v-4h4V9h4V5h4"/>'),
  ok: svg('<path d="M20 6 9 17l-5-5"/>'),
  alerta: svg('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'),
  pendente: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  imprimir: svg('<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>'),
  limpar: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
  tema: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
  nota: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
  mapa: svg('<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/>'),
};

const CSS = `
:root{
  --brand:#2e7dae;--brand-forte:#1e5375;--brand-suave:#eef6fb;--lima:#c4d62e;
  --bg:#f4f7fa;--surface:#fff;--surface-2:#f8fafc;--borda:#e2e8f0;--borda-forte:#cbd5e1;
  --texto:#0f172a;--texto-2:#475569;--texto-3:#64748b;
  --ok:#15803d;--ok-bg:#dcfce7;--doc:#1d4ed8;--doc-bg:#dbeafe;--nao:#b45309;--nao-bg:#fef3c7;
  --alerta:#b45309;--alerta-bg:#fffbeb;--alerta-borda:#fcd34d;
  --r:12px;--ease-out:cubic-bezier(.22,1,.36,1);--ease-spring:cubic-bezier(.34,1.56,.64,1);--sombra:0 1px 2px rgba(15,23,42,.06),0 1px 3px rgba(15,23,42,.04);
}
:root[data-theme="dark"]{
  --brand:#79b6da;--brand-forte:#aed3ea;--brand-suave:#132c40;
  --bg:#0b1220;--surface:#111c2e;--surface-2:#16233a;--borda:#233553;--borda-forte:#31456a;
  --texto:#e8eef7;--texto-2:#a7b8d0;--texto-3:#8fa3bd;
  --ok:#4ade80;--ok-bg:#0f3322;--doc:#93c5fd;--doc-bg:#172a4d;--nao:#fbbf24;--nao-bg:#3b2c10;
  --alerta:#fbbf24;--alerta-bg:#2a2210;--alerta-borda:#78551b;--sombra:0 1px 2px rgba(0,0,0,.4);
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --brand:#79b6da;--brand-forte:#aed3ea;--brand-suave:#132c40;
  --bg:#0b1220;--surface:#111c2e;--surface-2:#16233a;--borda:#233553;--borda-forte:#31456a;
  --texto:#e8eef7;--texto-2:#a7b8d0;--texto-3:#8fa3bd;
  --ok:#4ade80;--ok-bg:#0f3322;--doc:#93c5fd;--doc-bg:#172a4d;--nao:#fbbf24;--nao-bg:#3b2c10;
  --alerta:#fbbf24;--alerta-bg:#2a2210;--alerta-borda:#78551b;--sombra:0 1px 2px rgba(0,0,0,.4);
}}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Segoe UI Variable Text","Segoe UI",Inter,system-ui,-apple-system,Arial,sans-serif;font-size:15px;line-height:1.55;color:var(--texto);background:var(--bg);-webkit-font-smoothing:antialiased}
button,input,textarea{font:inherit;color:inherit}
button{cursor:pointer;background:none;border:0}
a{color:var(--brand)}
:focus-visible{outline:2px solid var(--brand);outline-offset:2px;border-radius:6px}
svg{width:18px;height:18px;flex:none}

.topo{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:12px;padding:10px 24px;background:color-mix(in srgb,var(--surface) 90%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--borda)}
.topo img{height:30px;width:auto}
.topo .marca{display:flex;flex-direction:column;line-height:1.2;padding-left:12px;border-left:1px solid var(--borda)}
.topo .marca strong{font-size:13.5px}
.topo .marca span{font-size:11px;color:var(--texto-3);text-transform:uppercase;letter-spacing:.06em;font-weight:600}
.topo .espaco{flex:1}
.btn{display:inline-flex;align-items:center;gap:6px;height:34px;padding:0 12px;border-radius:8px;border:1px solid var(--borda);background:var(--surface);font-size:13px;font-weight:600;color:var(--texto-2)}
.btn:hover{border-color:var(--borda-forte);color:var(--texto)}
.btn svg{width:16px;height:16px}
.barra{height:4px;background:var(--borda)}
.barra i{display:block;height:100%;transform:scaleX(0);transform-origin:left;background:linear-gradient(90deg,var(--brand-forte),var(--brand) 60%,var(--lima));transition:transform .45s var(--ease-out)}

main{max-width:880px;margin:0 auto;padding:28px 16px 64px}
.cab{margin-bottom:20px}
.etiqueta{display:inline-block;font-size:11.5px;font-weight:800;letter-spacing:.09em;text-transform:uppercase;color:var(--brand);margin-bottom:6px}
.cab h1{font-size:clamp(24px,4vw,32px);line-height:1.2;letter-spacing:-.02em}
.cab p{color:var(--texto-2);margin-top:8px;max-width:70ch}
.resumo{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}
.resumo .chip{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:var(--surface);border:1px solid var(--borda);font-size:13px;color:var(--texto-2)}
.resumo .chip b{color:var(--texto);font-variant-numeric:tabular-nums}

.legenda{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;font-size:12.5px;color:var(--texto-3);margin:14px 0 4px}
.selo{display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;white-space:nowrap}
.st-v{background:var(--ok-bg);color:var(--ok)}
.st-d{background:var(--doc-bg);color:var(--doc)}
.st-n{background:var(--nao-bg);color:var(--nao)}

.secao{background:var(--surface);border:1px solid var(--borda);border-radius:var(--r);box-shadow:var(--sombra);padding:20px 22px;margin-top:16px}
.secao > h2{display:flex;align-items:center;gap:10px;font-size:17px;letter-spacing:-.01em;margin-bottom:12px}
.secao > h2 .n{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:var(--brand-suave);color:var(--brand);font-size:13px;font-weight:800}
.secao > h2 .cont{margin-left:auto;font-size:12.5px;font-weight:600;color:var(--texto-3);font-variant-numeric:tabular-nums}
.secao > p{color:var(--texto-2)}

.fluxo + .fluxo{margin-top:18px;padding-top:16px;border-top:1px dashed var(--borda)}
.fluxo h3{font-size:15px;margin-bottom:2px}
.fluxo h3 .cont{margin-left:6px;font-size:12px;font-weight:600;color:var(--texto-3);font-variant-numeric:tabular-nums}
.fluxo .onde{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;color:var(--texto-3);margin-bottom:8px}
.fluxo .onde svg{width:14px;height:14px}
.fluxo .intro{font-size:13.5px;color:var(--texto-2);margin-bottom:8px}

.itens{list-style:none;display:grid;gap:6px}
.item label{display:grid;grid-template-columns:22px 1fr auto;gap:10px;align-items:start;padding:9px 10px;border-radius:10px;border:1px solid transparent;cursor:pointer;transition:background .15s,border-color .15s}
.item label:hover{background:var(--surface-2);border-color:var(--borda)}
.item input{appearance:none;width:20px;height:20px;margin-top:1px;border:2px solid var(--borda-forte);border-radius:6px;background:var(--surface);display:grid;place-items:center;cursor:pointer;transition:all .15s}
.item input:checked{background:var(--brand);border-color:var(--brand)}
.item input:checked::after{content:"";width:5px;height:10px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:translateY(-1px) rotate(45deg)}
.item .txt{min-width:0}
.item .acao{display:block}
.item .res{display:block;font-size:13px;color:var(--texto-3);margin-top:2px}
.item .res b{color:var(--ok);font-weight:700}
.item input:checked ~ .txt .acao{color:var(--texto-3);text-decoration:line-through;text-decoration-color:var(--borda-forte)}
.item .reg{display:block;width:calc(100% - 42px);margin:2px 0 4px 42px;height:32px;padding:0 10px;border-radius:8px;border:1px solid var(--borda);background:var(--surface-2);font-size:13px}
.item .reg:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 25%,transparent)}
.ui{font-family:inherit;font-weight:650;color:var(--texto);background:var(--surface-2);border:1px solid var(--borda);border-radius:5px;padding:0 5px;white-space:nowrap}

.atencao{list-style:none;display:grid;gap:8px}
.atencao li{display:flex;gap:10px;padding:10px 12px;border-radius:10px;background:var(--alerta-bg);border:1px solid var(--alerta-borda);font-size:14px}
.atencao li svg{color:var(--alerta);margin-top:2px}
.pendencias{list-style:none;display:grid;gap:6px}
.pendencias li{display:flex;gap:10px;font-size:14px;color:var(--texto-2)}
.pendencias li svg{color:var(--nao);margin-top:2px}

textarea{width:100%;min-height:96px;resize:vertical;padding:10px 12px;border-radius:10px;border:1px solid var(--borda);background:var(--surface-2);line-height:1.5}
textarea:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 25%,transparent)}
.dica{font-size:12.5px;color:var(--texto-3);margin-top:6px}

.trilha{list-style:none;display:grid;gap:8px;counter-reset:t}
.trilha a{display:grid;grid-template-columns:34px 1fr auto;gap:12px;align-items:center;padding:12px 14px;border:1px solid var(--borda);border-radius:10px;text-decoration:none;color:var(--texto);background:var(--surface-2)}
.trilha a:hover{border-color:var(--brand)}
.trilha .num{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--brand-suave);color:var(--brand);font-weight:800}
.trilha small{display:block;color:var(--texto-3);font-size:12.5px}
.trilha .prog{font-size:12.5px;font-weight:700;color:var(--texto-3);font-variant-numeric:tabular-nums}

.rodape{margin-top:28px;font-size:12.5px;color:var(--texto-3);text-align:center}
.concluido{display:none;margin-top:16px;padding:14px 16px;border-radius:var(--r);background:var(--ok-bg);color:var(--ok);font-weight:700;align-items:center;gap:10px}
.concluido.on{display:flex}

/* Movimento: entrada em cascata, hover "float", check com "pop" e conclusão com "bounceIn". */
@keyframes ff-sobe{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes ff-pop{0%{transform:scale(.6)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
@keyframes ff-entra{0%{opacity:0;transform:scale(.92)}60%{opacity:1;transform:scale(1.02)}100%{transform:scale(1)}}
.cab,.secao{animation:ff-sobe .5s var(--ease-out) both}
.secao:nth-of-type(2){animation-delay:.05s}.secao:nth-of-type(3){animation-delay:.1s}.secao:nth-of-type(4){animation-delay:.15s}
.secao:nth-of-type(5){animation-delay:.2s}.secao:nth-of-type(n+6){animation-delay:.25s}
.secao{transition:transform .25s var(--ease-out),box-shadow .25s var(--ease-out)}
.item label{transition:background .15s,border-color .15s,transform .2s var(--ease-out)}
.item label:hover{transform:translateX(3px)}
.item input:checked{animation:ff-pop .32s var(--ease-spring)}
.btn{transition:transform .2s var(--ease-spring),border-color .15s,color .15s}
.btn:hover{transform:translateY(-2px)}.btn:active{transform:translateY(0) scale(.97)}
.trilha a{transition:transform .25s var(--ease-out),border-color .2s,box-shadow .25s}
.trilha a:hover{transform:translateY(-2px);box-shadow:0 8px 20px -10px color-mix(in srgb,var(--brand) 45%,transparent)}
.trilha .num{transition:transform .25s var(--ease-spring)}.trilha a:hover .num{transform:scale(1.08) rotate(-4deg)}
.concluido.on{animation:ff-entra .5s var(--ease-spring) both}
.topo{background:color-mix(in srgb,var(--surface) 72%,transparent);-webkit-backdrop-filter:saturate(180%) blur(16px);backdrop-filter:saturate(180%) blur(16px)}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}

@media (max-width:640px){
  .topo{padding:10px 16px}.topo .marca{display:none}.btn span{display:none}.btn{width:34px;justify-content:center;padding:0}
  .secao{padding:16px}
  .item label{grid-template-columns:22px 1fr}.item .selo{grid-column:2;justify-self:start}
}
@media print{
  .topo,.barra,.no-print{display:none!important}
  body{background:#fff;font-size:12.5px}
  main{padding:0;max-width:none}
  .secao{box-shadow:none;break-inside:avoid-page;padding:12px 14px}
  .item label{padding:4px 0}
  .item input{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  textarea{min-height:120px}
}`;

/* Progresso, persistência local e tema — o mesmo script serve checklists e onboarding. */
const JS = `
(function(){
  var CHAVE = document.documentElement.getAttribute('data-chave');
  function ler(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function guardar(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function apagar(k){try{localStorage.removeItem(k);}catch(e){}}

  var tema = ler('ff-estagiario:tema');
  if (tema) document.documentElement.setAttribute('data-theme', tema);
  var btnTema = document.getElementById('btnTema');
  if (btnTema) btnTema.addEventListener('click', function(){
    var atual = document.documentElement.getAttribute('data-theme') ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var novo = atual === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', novo);
    guardar('ff-estagiario:tema', novo);
  });

  var estado = {};
  try { estado = JSON.parse(ler(CHAVE) || '{}') || {}; } catch(e) { estado = {}; }
  var caixas = [].slice.call(document.querySelectorAll('input[type=checkbox][data-id]'));
  var notas = document.getElementById('notas');
  var regs = [].slice.call(document.querySelectorAll('input[data-reg]'));

  function atualizar(){
    var total = caixas.length, feitos = caixas.filter(function(c){return c.checked;}).length;
    var pct = total ? Math.round(feitos * 100 / total) : 0;
    var fill = document.getElementById('barraFill'); if (fill) fill.style.transform = 'scaleX(' + (pct / 100) + ')';
    var p = document.getElementById('pct'); if (p) p.textContent = pct + '%';
    var c = document.getElementById('contagem'); if (c) c.textContent = feitos + ' de ' + total;
    [].forEach.call(document.querySelectorAll('[data-grupo]'), function(g){
      var cx = g.querySelectorAll('input[type=checkbox][data-id]'), f = 0;
      for (var i = 0; i < cx.length; i++) if (cx[i].checked) f++;
      var alvo = g.querySelector('.cont'); if (alvo) alvo.textContent = f + '/' + cx.length;
    });
    var fim = document.getElementById('concluido'); if (fim) fim.classList.toggle('on', total > 0 && feitos === total);
    guardar(CHAVE + ':pct', String(pct));
  }
  function salvar(){
    var marcados = {};
    caixas.forEach(function(c){ if (c.checked) marcados[c.getAttribute('data-id')] = 1; });
    var dados = { marcados: marcados };
    if (notas) dados.notas = notas.value;
    dados.regs = {};
    regs.forEach(function(r){ if (r.value) dados.regs[r.getAttribute('data-reg')] = r.value; });
    guardar(CHAVE, JSON.stringify(dados));
    atualizar();
  }
  caixas.forEach(function(c){
    c.checked = !!(estado.marcados && estado.marcados[c.getAttribute('data-id')]);
    c.addEventListener('change', salvar);
  });
  if (notas) { notas.value = estado.notas || ''; notas.addEventListener('input', salvar); }
  regs.forEach(function(r){ r.value = (estado.regs && estado.regs[r.getAttribute('data-reg')]) || ''; r.addEventListener('input', salvar); });

  var btnLimpar = document.getElementById('btnLimpar');
  if (btnLimpar) btnLimpar.addEventListener('click', function(){
    if (!confirm('Desmarcar todas as etapas e apagar as anotações deste checklist?')) return;
    caixas.forEach(function(c){ c.checked = false; });
    if (notas) notas.value = '';
    regs.forEach(function(r){ r.value = ''; });
    apagar(CHAVE); atualizar();
  });
  var btnImprimir = document.getElementById('btnImprimir');
  if (btnImprimir) btnImprimir.addEventListener('click', function(){ window.print(); });

  /* Onboarding: mostra o progresso de cada checklist já aberto neste navegador. */
  [].forEach.call(document.querySelectorAll('[data-prog]'), function(el){
    var v = ler('ff-estagiario:' + el.getAttribute('data-prog') + ':pct');
    el.textContent = v === null ? 'não iniciado' : v + '%';
  });
  atualizar();
})();`;

function topo(subtitulo, marca) {
  return `
<header class="topo">
  <img src="${LOGO}" alt="Faktory Flow" width="120" height="36">
  <div class="marca"><strong>${esc(marca)}</strong><span>${esc(subtitulo)}</span></div>
  <div class="espaco"></div>
  <button class="btn" id="btnImprimir" type="button" title="Imprimir ou salvar em PDF">${ICONE.imprimir}<span>Imprimir</span></button>
  <button class="btn" id="btnLimpar" type="button" title="Desmarcar tudo">${ICONE.limpar}<span>Recomeçar</span></button>
  <button class="btn" id="btnTema" type="button" aria-label="Alternar tema claro/escuro" title="Alternar tema">${ICONE.tema}</button>
</header>
<div class="barra" role="progressbar" aria-label="Progresso do checklist"><i id="barraFill"></i></div>`;
}

function documento({ titulo, chave, corpo, subtitulo, marca = 'Trilha do Estagiário', rodape = META.rodape }) {
  return `<!DOCTYPE html>
<html lang="pt-BR" data-chave="${esc(chave)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${esc(titulo)} · Faktory Flow</title>
<style>${CSS}</style>
</head>
<body>
${topo(subtitulo, marca)}
<main>
${corpo}
<p class="rodape">${esc(rodape)}</p>
</main>
<script>${JS}</script>
</body>
</html>
`;
}

const legenda = `<div class="legenda" aria-label="Legenda da origem das informações">Origem de cada etapa: ${selo('v')} abri e conferi no sistema · ${selo('d')} vem dos roteiros de validação, não foi executado · ${selo('n')} precisa ser confirmado com o supervisor</div>`;

/* campo: rótulo de um campo de texto livre ao lado da etapa (ex.: número do registro criado no teste). */
function item(id, texto, resultado, status, campo) {
  return `<li class="item"><label><input type="checkbox" data-id="${esc(id)}"><span class="txt"><span class="acao">${fmt(texto)}</span>${resultado ? `<span class="res"><b>Resultado:</b> ${fmt(resultado)}</span>` : ''}</span>${selo(status)}</label>${campo ? `<input class="reg" type="text" data-reg="${esc(id)}" placeholder="${esc(campo)}" aria-label="${esc(campo)}">` : ''}</li>`;
}

function checklist(c, opcoes = {}) {
  const contar = (lista) => lista.length;
  const totalPassos = c.fluxos.reduce((s, f) => s + f.passos.length, 0);
  const verificados = [...c.prerequisitos, ...c.fluxos.flatMap((f) => f.passos)].filter((p) => p.s === 'v').length;
  const total = c.prerequisitos.length + totalPassos;

  const pre = c.prerequisitos.map((p, i) => item(`pre-${i + 1}`, p.t, null, p.s)).join('');
  const fluxos = c.fluxos.map((f, fi) => `
    <div class="fluxo" data-grupo>
      <h3>${esc(f.titulo)} <span class="cont"></span></h3>
      ${f.onde ? `<div class="onde">${ICONE.mapa}<span>Onde: ${fmt(f.onde)}</span></div>` : ''}
      ${f.intro ? `<p class="intro">${fmt(f.intro)}</p>` : ''}
      <ul class="itens">${f.passos.map((p, pi) => item(`f${fi + 1}-${pi + 1}`, p.t, p.r, p.s, p.campo)).join('')}</ul>
    </div>`).join('');
  const resultado = c.resultado.map((r, i) => item(`res-${i + 1}`, r.t, null, r.s)).join('');
  const atencao = c.atencao.map((a) => `<li>${ICONE.alerta}<span>${fmt(a)}</span></li>`).join('');
  const pend = (c.naoValidado || []).map((a) => `<li>${ICONE.pendente}<span>${fmt(a)}</span></li>`).join('');

  const corpo = `
<section class="cab">
  <span class="etiqueta">${esc(c.etiqueta)}</span>
  <h1>${esc(c.titulo)}</h1>
  <p>${fmt(c.subtitulo)}</p>
  <div class="resumo">
    <span class="chip">${ICONE.lista}<b id="contagem">0 de ${contar(c.prerequisitos) + totalPassos + c.resultado.length}</b> etapas marcadas</span>
    <span class="chip">${ICONE.ok}<b id="pct">0%</b> concluído</span>
    <span class="chip">${ICONE.alvo}<b>${verificados}</b> de ${total} passos conferidos no sistema</span>
  </div>
  ${legenda}
</section>

<section class="secao"><h2><span class="n">1</span>Objetivo</h2><p>${fmt(c.objetivo)}</p></section>

<section class="secao" data-grupo><h2><span class="n">2</span>Pré-requisitos <span class="cont"></span></h2><ul class="itens">${pre}</ul></section>

<section class="secao"><h2><span class="n">3</span>Passo a passo</h2>${fluxos}</section>

<section class="secao" data-grupo><h2><span class="n">4</span>Resultado esperado <span class="cont"></span></h2><p class="dica" style="margin:-4px 0 10px">Marque quando conseguir confirmar cada ponto.</p><ul class="itens">${resultado}</ul></section>

<section class="secao"><h2><span class="n">5</span>Pontos de atenção</h2><ul class="atencao">${atencao}</ul></section>

${pend ? `<section class="secao"><h2>${ICONE.pendente}Ainda não validado na prática</h2><p class="dica" style="margin:-4px 0 10px">Estas partes não puderam ser conferidas na exploração do sistema. Confirme com seu supervisor antes de seguir.</p><ul class="pendencias">${pend}</ul></section>` : ''}

<section class="secao no-print-notas"><h2>${ICONE.nota}Minhas dúvidas e anotações</h2><textarea id="notas" placeholder="Anote dúvidas para levar ao supervisor, números de registros que você consultou, atalhos que descobriu…"></textarea><p class="dica">Fica salvo só neste navegador.</p></section>

<div class="concluido" id="concluido" role="status">${ICONE.ok}${esc(opcoes.fim || 'Checklist concluído. Volte ao onboarding e siga para o próximo módulo.')}</div>`;

  return documento({ titulo: c.titulo, chave: `ff-${opcoes.prefixo || 'estagiario'}:${c.id}`, corpo, subtitulo: c.etiqueta, marca: opcoes.marca, rodape: opcoes.rodape });
}

function onboarding(o) {
  const etapas = o.etapas.map((e, ei) => `
    <div class="fluxo" data-grupo>
      <h3>${esc(e.titulo)} <span class="cont"></span></h3>
      ${e.intro ? `<p class="intro">${fmt(e.intro)}</p>` : ''}
      <ul class="itens">${e.passos.map((p, pi) => item(`e${ei + 1}-${pi + 1}`, p.t, p.r, p.s, p.campo)).join('')}</ul>
    </div>`).join('');
  const trilha = CHECKLISTS.map((c, i) => `
    <li><a href="${esc(c.arquivo)}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span><strong>${esc(c.titulo)}</strong><small>${esc(c.resumo)}</small></span><span class="prog" data-prog="${esc(c.id)}">não iniciado</span></a></li>`).join('');
  const atencao = o.atencao.map((a) => `<li>${ICONE.alerta}<span>${fmt(a)}</span></li>`).join('');

  const corpo = `
<section class="cab">
  <span class="etiqueta">Comece por aqui</span>
  <h1>${esc(o.titulo)}</h1>
  <p>${fmt(o.subtitulo)}</p>
  <div class="resumo">
    <span class="chip">${ICONE.lista}<b id="contagem">0</b> etapas marcadas</span>
    <span class="chip">${ICONE.ok}<b id="pct">0%</b> do onboarding</span>
  </div>
  ${legenda}
</section>

<section class="secao"><h2><span class="n">1</span>Objetivo</h2><p>${fmt(o.objetivo)}</p></section>

<section class="secao"><h2><span class="n">2</span>Regras de ouro</h2><ul class="atencao">${atencao}</ul></section>

<section class="secao"><h2><span class="n">3</span>Sequência recomendada</h2>${etapas}</section>

<section class="secao"><h2><span class="n">4</span>Checklists da trilha</h2><p class="dica" style="margin:-4px 0 12px">Abra na ordem. O progresso aparece aqui quando os arquivos estão na mesma pasta e são abertos neste navegador.</p><ol class="trilha">${trilha}</ol></section>

<section class="secao"><h2>${ICONE.nota}Minhas dúvidas e anotações</h2><textarea id="notas" placeholder="Dúvidas gerais, combinados com o supervisor, acessos que faltam…"></textarea><p class="dica">Fica salvo só neste navegador.</p></section>

<div class="concluido" id="concluido" role="status">${ICONE.ok}Onboarding concluído. Combine com seu supervisor as primeiras tarefas reais.</div>`;

  return documento({ titulo: o.titulo, chave: 'ff-estagiario:onboarding', corpo, subtitulo: 'Onboarding' });
}

const saidas = {
  estagiarios: [[ONBOARDING.arquivo, onboarding(ONBOARDING)], ...CHECKLISTS.map((c) => [c.arquivo, checklist(c)])],
  consultores: [[CONSULTOR.arquivo, checklist(CONSULTOR, {
    prefixo: 'consultor', marca: 'Teste de Fluxo · Consultor', rodape: CONSULTOR.rodape,
    fim: 'Fluxo concluído. Registre os defeitos encontrados e limpe os registros de teste.',
  })]],
};
for (const raiz of raizes) {
  for (const [pasta, arquivos] of Object.entries(saidas)) {
    await mkdir(path.join(RAIZ, raiz, pasta), { recursive: true });
    for (const [nome, html] of arquivos) await writeFile(path.join(RAIZ, raiz, pasta, nome), html, 'utf8');
  }
}
console.log(`Gerados: ${saidas.estagiarios.length} da trilha do estagiário e ${saidas.consultores.length} do consultor, em ${raizes.join(' e ')}.`);
