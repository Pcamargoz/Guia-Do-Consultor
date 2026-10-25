/* Faktory Flow — relatórios de problemas do Painel do administrador, com a identidade do sistema (logo, cores de
   brand-system.css, Plus Jakarta Sans e Inter). Dois formatos com o mesmo conteúdo:
   - html(dados): um arquivo único, com imagens e logo embutidas, sumário, busca e filtro por pessoa, ampliação das
     imagens e estilo de impressão;
   - pdf(dados): A4 com cabeçalho da marca, indicadores, sumário e um cartão por problema com as imagens.
   dados = { geradoEm, filtro, logo: { src, w, h } | null, problemas: [{ pessoa: { nome, login, papelNome },
             checklist: { titulo, area }, secao, etapa, esperado, problema, registro, atualizadoEm,
             imagens: [{ src, nome, w, h }] }] } */
(() => {
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dataHora = (d) => (d ? new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—');
  const plural = (n, um, varios) => `${n.toLocaleString('pt-BR')} ${n === 1 ? um : varios}`;
  const iniciais = (nome) => String(nome || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';

  function resumo(problemas) {
    const porPessoa = new Map(), porChecklist = new Map();
    for (const p of problemas) {
      const kp = p.pessoa.login;
      porPessoa.set(kp, { pessoa: p.pessoa, n: (porPessoa.get(kp)?.n || 0) + 1 });
      const kc = p.checklist.titulo;
      porChecklist.set(kc, { checklist: p.checklist, n: (porChecklist.get(kc)?.n || 0) + 1 });
    }
    return {
      pessoas: [...porPessoa.values()].sort((a, b) => b.n - a.n || a.pessoa.nome.localeCompare(b.pessoa.nome)),
      checklists: [...porChecklist.values()].sort((a, b) => b.n - a.n || a.checklist.titulo.localeCompare(b.checklist.titulo)),
      imagens: problemas.reduce((s, p) => s + p.imagens.length, 0),
    };
  }

  /* ================= HTML ================= */
  const CSS = `
:root{--azul-950:#0C2438;--azul-800:#1B4F75;--azul-700:#245F8A;--azul:#3478A7;--azul-grafico:#1D6FB0;--azul-suave:#E6F1F8;--azul-linha:#C7DEEE;
--lima:#D5DD26;--lima-texto:#6B7300;--lima-tinta:#1E2A05;--lima-suave:#F6F8D4;--papel:#F2F6FA;--superficie:#fff;--superficie-alt:#F7FAFC;
--tinta:#13293D;--mudo:#4B6073;--linha:#D8E3EC;--linha-forte:#B3C6D6;--laranja:#E07B00;--laranja-texto:#8A4B00;--laranja-suave:#FFF4E5;
--fonte-titulo:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;--fonte:'Inter','Segoe UI',system-ui,-apple-system,sans-serif;
--sombra:0 2px 6px rgb(12 36 56/.06),0 8px 20px rgb(12 36 56/.06);--sombra-forte:0 24px 60px rgb(12 36 56/.2)}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--papel);color:var(--tinta);font:15px/1.55 var(--fonte)}
.pagina{max-width:1120px;margin:0 auto;padding:28px 20px 56px}
.topo{position:relative;overflow:hidden;isolation:isolate;padding:30px 34px;border-radius:24px;color:#fff;box-shadow:var(--sombra-forte);
background:linear-gradient(135deg,var(--azul-950),var(--azul-800) 62%,var(--azul-700))}
.topo::before{content:"";position:absolute;z-index:-1;right:-90px;top:-120px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgb(213 221 38/.34),transparent 68%)}
.topo-linha{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px}
.marca{display:inline-flex;align-items:center;padding:10px 16px;border-radius:16px;background:#fff;box-shadow:0 0 0 3px rgb(213 221 38/.85)}
.marca img{display:block;height:44px;width:auto}
.selo{display:inline-flex;padding:5px 12px;border-radius:999px;background:rgb(213 221 38/.16);color:var(--lima);font:800 11.5px var(--fonte-titulo);letter-spacing:.1em;text-transform:uppercase}
h1{margin:22px 0 0;font:800 clamp(1.8rem,3.4vw,2.5rem)/1.1 var(--fonte-titulo);letter-spacing:-.025em}
.topo p{margin:8px 0 0;color:rgb(255 255 255/.84)}
.kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0}
.kpi{position:relative;overflow:hidden;padding:16px 18px;border:1px solid var(--linha);border-radius:16px;background:var(--superficie);box-shadow:var(--sombra)}
.kpi::before{content:"";position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,var(--azul),var(--lima))}
.kpi strong{display:block;color:var(--azul-950);font:800 2rem/1.05 var(--fonte-titulo);letter-spacing:-.02em}
.kpi span{color:var(--mudo);font:700 13px var(--fonte-titulo)}
.cartao{margin:0 0 16px;padding:20px 22px;border:1px solid var(--linha);border-radius:16px;background:var(--superficie);box-shadow:var(--sombra)}
h2{margin:0 0 12px;color:var(--azul-950);font:800 1.15rem/1.25 var(--fonte-titulo)}
.sumario{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.sumario ol{margin:0;padding:0;list-style:none;display:grid;gap:6px}
.sumario li{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border-radius:10px;background:var(--superficie-alt)}
.sumario li b{display:inline-grid;place-items:center;min-width:26px;height:22px;padding:0 7px;border-radius:999px;background:var(--laranja-suave);border:1px solid var(--laranja);color:var(--laranja-texto);font:800 12px var(--fonte-titulo)}
.quem{display:inline-flex;align-items:center;gap:8px;min-width:0}
.quem small{color:var(--mudo)}
.avatar{display:inline-grid;place-items:center;flex:none;width:28px;height:28px;border-radius:50%;background:var(--azul-800);color:var(--lima);font:800 11px var(--fonte-titulo)}
.filtros{display:flex;flex-wrap:wrap;gap:10px;margin:4px 0 14px}
.campo{display:inline-flex;align-items:center;gap:8px;min-height:42px;padding:0 12px;border:1px solid var(--linha-forte);border-radius:12px;background:#fff;color:var(--mudo);font:600 13px var(--fonte)}
.campo:focus-within{border-color:var(--azul);box-shadow:0 0 0 4px rgb(52 120 167/.22)}
.campo input,.campo select{border:0;background:none;color:var(--tinta);font:500 14px var(--fonte);outline:none;min-width:0}
.campo--busca{flex:1 1 280px}.campo--busca input{flex:1}
.contagem{margin:0 0 12px;color:var(--mudo);font:700 13px var(--fonte-titulo)}
.grupo{margin:22px 0 10px;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
.grupo h3{margin:0;color:var(--azul-950);font:800 1.05rem/1.3 var(--fonte-titulo)}
.grupo small{color:var(--mudo);font:700 11px var(--fonte-titulo);letter-spacing:.06em;text-transform:uppercase}
.probs{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:12px}
.prob{display:grid;gap:8px;align-content:start;padding:16px 18px;border:1px solid var(--linha);border-left:4px solid var(--laranja);border-radius:12px;background:#fff;break-inside:avoid}
.prob-cab{display:flex;align-items:center;justify-content:space-between;gap:10px}
.num{padding:3px 9px;border-radius:999px;background:var(--azul-950);color:var(--lima);font:800 11.5px var(--fonte-titulo)}
.data{color:var(--mudo);font-size:12.5px}
.quem-prob{display:flex;align-items:center;gap:10px}
.quem-prob strong{display:block;font:700 14px var(--fonte-titulo)}
.quem-prob small{color:var(--mudo);font-size:12px}
.papel{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:999px;background:var(--azul-suave);border:1px solid var(--azul-linha);color:var(--azul-800);font:700 11px var(--fonte-titulo)}
.secao{color:var(--azul-700);font:700 11.5px var(--fonte-titulo)}
.etapa{margin:0;font:600 14px/1.45 var(--fonte)}
.esperado{margin:0;color:var(--mudo);font-size:13px}
.esperado b{color:var(--tinta)}
blockquote{margin:0;padding:10px 12px;border-radius:8px;background:var(--laranja-suave);color:var(--tinta);font-size:14.5px;line-height:1.5;white-space:pre-wrap}
.registro{margin:0;color:var(--mudo);font-size:13px}
.imagens{display:flex;flex-wrap:wrap;gap:8px}
.imagens button{padding:0;border:1px solid var(--linha);border-radius:8px;background:none;overflow:hidden;cursor:zoom-in;width:120px;height:84px}
.imagens img{width:100%;height:100%;object-fit:cover;display:block}
.vazio{padding:18px;border-radius:12px;background:var(--superficie-alt);color:var(--mudo)}
.rodape{margin-top:28px;padding-top:14px;border-top:1px solid var(--linha);color:var(--mudo);font-size:12.5px;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}
dialog{max-width:min(1200px,96vw);max-height:94vh;padding:0;border:0;border-radius:16px;box-shadow:var(--sombra-forte);background:#000}
dialog::backdrop{background:rgb(12 36 56/.78)}
dialog img{display:block;max-width:min(1200px,96vw);max-height:88vh}
dialog p{margin:0;padding:8px 14px;background:var(--azul-950);color:#fff;font-size:13px}
[hidden]{display:none!important}
@media (max-width:720px){.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.sumario{grid-template-columns:1fr}.topo{padding:24px 20px}}
@media print{body{background:#fff;font-size:12px}.pagina{max-width:none;padding:0}.filtros,dialog{display:none!important}
.topo{box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}.kpi,.cartao,.prob{box-shadow:none}
.prob,.kpi,.selo,.num,blockquote,.avatar{-webkit-print-color-adjust:exact;print-color-adjust:exact}.probs{grid-template-columns:1fr 1fr}
.imagens button{width:auto;height:auto;max-width:100%}.imagens img{max-height:260px;width:auto;object-fit:contain}}`;

  const SCRIPT = `(function(){
var busca=document.getElementById('f-busca'),pessoa=document.getElementById('f-pessoa'),cont=document.getElementById('contagem');
function filtrar(){var t=(busca.value||'').toLowerCase(),p=pessoa.value,n=0;
document.querySelectorAll('.prob').forEach(function(el){var ok=(!p||el.dataset.pessoa===p)&&(!t||el.textContent.toLowerCase().indexOf(t)>=0);el.hidden=!ok;if(ok)n++;});
document.querySelectorAll('.bloco').forEach(function(b){b.hidden=!b.querySelector('.prob:not([hidden])');});
cont.textContent=n+(n===1?' problema':' problemas');}
busca.addEventListener('input',filtrar);pessoa.addEventListener('change',filtrar);
var d=document.querySelector('dialog');
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.imagens button');if(!b)return;var i=b.querySelector('img');
d.querySelector('img').src=i.src;d.querySelector('img').alt=i.alt;d.querySelector('p').textContent=i.alt;if(d.showModal)d.showModal();});
d.addEventListener('click',function(){d.close();});})();`;

  function html(dados) {
    const { problemas } = dados;
    const r = resumo(problemas);
    // agrupado por checklist, na ordem do que tem mais problemas
    const blocos = r.checklists.map(({ checklist }) => ({ checklist, itens: problemas.filter((p) => p.checklist.titulo === checklist.titulo) }));
    let n = 0;
    const cartao = (p) => {
      n++;
      return `<article class="prob" data-pessoa="${esc(p.pessoa.login)}">
  <div class="prob-cab"><span class="num">P${n}</span><span class="data">${esc(dataHora(p.atualizadoEm))}</span></div>
  <div class="quem-prob"><span class="avatar" aria-hidden="true">${esc(iniciais(p.pessoa.nome))}</span><span><strong>${esc(p.pessoa.nome)}<span class="papel">${esc(p.pessoa.papelNome)}</span></strong><small>${esc(p.pessoa.login)}</small></span></div>
  ${p.secao ? `<span class="secao">${esc(p.secao)}</span>` : ''}
  <p class="etapa">${esc(p.etapa)}</p>
  ${p.esperado ? `<p class="esperado"><b>Resultado esperado:</b> ${esc(p.esperado)}</p>` : ''}
  <blockquote>${esc(p.problema)}</blockquote>
  ${p.registro ? `<p class="registro"><b>Registro:</b> ${esc(p.registro)}</p>` : ''}
  ${p.imagens.length ? `<div class="imagens">${p.imagens.map((im) => `<button type="button" aria-label="Ampliar imagem"><img src="${im.src}" alt="${esc(im.nome || `Imagem anexada por ${p.pessoa.nome}`)}"></button>`).join('')}</div>` : ''}
</article>`;
    };
    return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Problemas registrados nos checklists · Faktory Flow</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap">
<style>${CSS}</style></head>
<body><div class="pagina">
<header class="topo">
  <div class="topo-linha">${dados.logo ? `<span class="marca"><img src="${dados.logo.src}" alt="Faktory Flow"></span>` : ''}<span class="selo">Painel do administrador</span></div>
  <h1>Problemas registrados nos checklists</h1>
  <p>Gerado em ${esc(dataHora(dados.geradoEm))} · filtro: ${esc(dados.filtro)}</p>
</header>
<section class="kpis" aria-label="Resumo">
  <div class="kpi"><strong>${problemas.length}</strong><span>${problemas.length === 1 ? 'Problema' : 'Problemas'}</span></div>
  <div class="kpi"><strong>${r.pessoas.length}</strong><span>${r.pessoas.length === 1 ? 'Pessoa' : 'Pessoas'}</span></div>
  <div class="kpi"><strong>${r.checklists.length}</strong><span>${r.checklists.length === 1 ? 'Checklist' : 'Checklists'}</span></div>
  <div class="kpi"><strong>${r.imagens}</strong><span>${r.imagens === 1 ? 'Imagem' : 'Imagens'}</span></div>
</section>
<section class="cartao sumario" aria-label="Sumário">
  <div><h2>Por pessoa</h2><ol>${r.pessoas.map(({ pessoa, n: k }) => `<li><span class="quem"><span class="avatar" aria-hidden="true">${esc(iniciais(pessoa.nome))}</span><span>${esc(pessoa.nome)} <small>${esc(pessoa.papelNome)}</small></span></span><b>${k}</b></li>`).join('')}</ol></div>
  <div><h2>Por checklist</h2><ol>${r.checklists.map(({ checklist, n: k }) => `<li><span>${esc(checklist.titulo)}</span><b>${k}</b></li>`).join('')}</ol></div>
</section>
<section class="cartao" aria-label="Problemas">
  <h2>Problemas</h2>
  <div class="filtros">
    <label class="campo campo--busca">Buscar <input id="f-busca" type="search" placeholder="Texto do problema, etapa, registro…"></label>
    <label class="campo">Pessoa <select id="f-pessoa"><option value="">Todas</option>${r.pessoas.map(({ pessoa }) => `<option value="${esc(pessoa.login)}">${esc(pessoa.nome)}</option>`).join('')}</select></label>
  </div>
  <p class="contagem" id="contagem">${plural(problemas.length, 'problema', 'problemas')}</p>
  ${blocos.map((b) => `<div class="bloco"><div class="grupo">${b.checklist.area ? `<small>${esc(b.checklist.area)}</small>` : ''}<h3>${esc(b.checklist.titulo)}</h3></div><div class="probs">${b.itens.map(cartao).join('')}</div></div>`).join('') || '<p class="vazio">Nenhum problema.</p>'}
</section>
<footer class="rodape"><span>Faktory Flow · Guia do Consultor · Painel do administrador</span><span>${plural(problemas.length, 'problema', 'problemas')} · ${plural(r.imagens, 'imagem', 'imagens')}</span></footer>
</div>
<dialog aria-label="Imagem ampliada"><img alt=""><p></p></dialog>
<script>${SCRIPT}</script>
</body></html>`;
  }

  /* ================= PDF ================= */
  // A fonte padrão do PDF (Helvetica, WinAnsi) não tem setas, ≠, ⋯ nem emoji: troca pelo equivalente legível e tira o resto
  const TROCAS = { '≠': '<>', '→': '->', '←': '<-', '↔': '<->', '⇄': '<->', '↑': '^', '↓': 'v', '⋯': '...', '⋮': '...', '−': '-', '≈': '~', '≥': '>=', '≤': '<=',
    '✓': 'ok', '★': '*', '▶': '>', '①': '(1)', '②': '(2)', '③': '(3)', '④': '(4)', '⑤': '(5)', '⑥': '(6)' };
  const WINANSI = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ';
  const paraPdf = (t) => [...String(t ?? '').normalize('NFC')].map((ch) => {
    if (TROCAS[ch] !== undefined) return TROCAS[ch];
    const c = ch.codePointAt(0);
    return c <= 255 || WINANSI.includes(ch) ? ch : '';
  }).join('').replace(/[ \t]{2,}/g, ' ');

  async function pdf(dadosOriginais) {
    // todos os textos passam pelo filtro de caracteres antes de ir para o PDF
    const dados = { ...dadosOriginais, filtro: paraPdf(dadosOriginais.filtro), problemas: dadosOriginais.problemas.map((p) => ({
      ...p, pessoa: { nome: paraPdf(p.pessoa.nome), login: paraPdf(p.pessoa.login), papelNome: paraPdf(p.pessoa.papelNome) },
      checklist: { titulo: paraPdf(p.checklist.titulo), area: paraPdf(p.checklist.area) },
      secao: paraPdf(p.secao), etapa: paraPdf(p.etapa), esperado: paraPdf(p.esperado), problema: paraPdf(p.problema), registro: paraPdf(p.registro),
      imagens: p.imagens.map((im) => ({ ...im, nome: paraPdf(im.nome) })),
    })) };
    const J = window.jspdf?.jsPDF;
    if (!J) throw new Error('O gerador de PDF ainda não carregou. Tente de novo em alguns segundos.');
    const { problemas } = dados;
    const r = resumo(problemas);
    const doc = new J({ unit: 'pt', format: 'a4' });
    const L = doc.internal.pageSize.getWidth(), A = doc.internal.pageSize.getHeight(), M = 40, W = L - 2 * M;
    const C = {
      azul950: [12, 36, 56], azul800: [27, 79, 117], azul: [52, 120, 167], azulSuave: [230, 241, 248], azulLinha: [199, 222, 238],
      lima: [213, 221, 38], limaTexto: [107, 115, 0], tinta: [19, 41, 61], mudo: [75, 96, 115], linha: [216, 227, 236],
      superficieAlt: [247, 250, 252], laranja: [224, 123, 0], laranjaSuave: [255, 244, 229], laranjaTexto: [138, 75, 0], branco: [255, 255, 255],
    };
    const TOPO = 58; // altura reservada para o cabeçalho das páginas seguintes
    let y = 0;
    const fonte = (tam, estilo = 'normal', cor = C.tinta) => { doc.setFont('helvetica', estilo); doc.setFontSize(tam); doc.setTextColor(...cor); };
    const cabecalhoPagina = () => {
      doc.setFillColor(...C.azul950); doc.rect(0, 0, L, 34, 'F');
      doc.setFillColor(...C.lima); doc.rect(0, 34, L, 2, 'F');
      if (dados.logo) {
        const lh = 18, lw = lh * (dados.logo.w / dados.logo.h);
        doc.setFillColor(...C.branco); doc.roundedRect(M, 8, lw + 8, lh + 4, 4, 4, 'F');
        doc.addImage(dados.logo.src, 'PNG', M + 4, 10, lw, lh);
      }
      fonte(9, 'bold', C.branco); doc.text('Problemas registrados nos checklists', dados.logo ? M + 64 : M, 21);
      fonte(8, 'normal', [190, 205, 218]); doc.text(dataHora(dados.geradoEm), L - M, 21, { align: 'right' });
    };
    const novaPagina = () => { doc.addPage(); cabecalhoPagina(); y = TOPO; };
    const cabe = (alt) => { if (y + alt > A - M - 10) novaPagina(); };
    const linhasDe = (t, tam, larg, estilo = 'normal') => { doc.setFont('helvetica', estilo); doc.setFontSize(tam); return doc.splitTextToSize(String(t ?? ''), larg); };

    // ---- capa: faixa da marca ----
    const altCapa = 150;
    doc.setFillColor(...C.azul950); doc.rect(0, 0, L, altCapa, 'F');
    doc.setFillColor(...C.azul800); doc.circle(L - 40, 10, 120, 'F');
    doc.setFillColor(...C.lima); doc.rect(0, altCapa, L, 4, 'F');
    if (dados.logo) {
      const lw = 110, lh = lw * (dados.logo.h / dados.logo.w);
      doc.setFillColor(...C.branco); doc.roundedRect(M, 26, lw + 20, lh + 14, 8, 8, 'F');
      doc.addImage(dados.logo.src, 'PNG', M + 10, 33, lw, lh);
    }
    fonte(8.5, 'bold', C.lima); doc.text('PAINEL DO ADMINISTRADOR', L - M, 44, { align: 'right' });
    fonte(22, 'bold', C.branco); doc.text('Problemas registrados nos checklists', M, 112);
    fonte(9, 'normal', [200, 214, 226]); doc.text(doc.splitTextToSize(`Gerado em ${dataHora(dados.geradoEm)} · filtro: ${dados.filtro}`, W), M, 132);
    y = altCapa + 22;

    // ---- indicadores ----
    const kpis = [[problemas.length, problemas.length === 1 ? 'Problema' : 'Problemas'], [r.pessoas.length, r.pessoas.length === 1 ? 'Pessoa' : 'Pessoas'],
      [r.checklists.length, r.checklists.length === 1 ? 'Checklist' : 'Checklists'], [r.imagens, r.imagens === 1 ? 'Imagem' : 'Imagens']];
    const kw = (W - 3 * 10) / 4;
    kpis.forEach(([v, rot], i) => {
      const x = M + i * (kw + 10);
      doc.setFillColor(...C.branco); doc.setDrawColor(...C.linha); doc.setLineWidth(0.8); doc.roundedRect(x, y, kw, 58, 8, 8, 'FD');
      doc.setFillColor(...C.azul); doc.rect(x + 1, y + 1, kw / 2 - 1, 3, 'F'); doc.setFillColor(...C.lima); doc.rect(x + kw / 2, y + 1, kw / 2 - 1, 3, 'F');
      fonte(22, 'bold', C.azul950); doc.text(String(v), x + 12, y + 34);
      fonte(9, 'bold', C.mudo); doc.text(rot, x + 12, y + 49);
    });
    y += 76;

    // ---- sumário por pessoa e por checklist ----
    const lista = (titulo, itens, x, larg) => {
      let yy = y;
      fonte(11, 'bold', C.azul950); doc.text(titulo, x, yy + 11); yy += 20;
      for (const it of itens) {
        const partes = linhasDe(it.rotulo, 9, larg - 50);
        const alt = partes.length * 11 + 10;
        doc.setFillColor(...C.superficieAlt); doc.roundedRect(x, yy, larg, alt, 5, 5, 'F');
        fonte(9, 'normal', C.tinta); doc.text(partes, x + 8, yy + 13);
        doc.setFillColor(...C.laranjaSuave); doc.setDrawColor(...C.laranja); doc.setLineWidth(0.7); doc.roundedRect(x + larg - 34, yy + alt / 2 - 8, 26, 16, 8, 8, 'FD');
        fonte(8.5, 'bold', C.laranjaTexto); doc.text(String(it.n), x + larg - 21, yy + alt / 2 + 3, { align: 'center' });
        yy += alt + 4;
      }
      return yy;
    };
    const metade = (W - 16) / 2;
    const fimA = lista('Por pessoa', r.pessoas.map((p) => ({ rotulo: `${p.pessoa.nome} · ${p.pessoa.papelNome}`, n: p.n })), M, metade);
    const fimB = lista('Por checklist', r.checklists.map((c) => ({ rotulo: c.checklist.titulo, n: c.n })), M + metade + 16, metade);
    y = Math.max(fimA, fimB) + 10;

    // ---- um cartão por problema ----
    let n = 0;
    for (const p of problemas) {
      n++;
      dados.aoProgredir?.(n, problemas.length);
      const largTexto = W - 34;
      const blocos = [];
      if (p.secao) blocos.push({ t: p.secao, tam: 8.5, estilo: 'bold', cor: C.azul });
      blocos.push({ t: p.etapa, tam: 10, estilo: 'bold', cor: C.tinta });
      if (p.esperado) blocos.push({ t: `Resultado esperado: ${p.esperado}`, tam: 8.5, estilo: 'normal', cor: C.mudo });
      const medidos = blocos.map((b) => ({ ...b, linhas: linhasDe(b.t, b.tam, largTexto, b.estilo) }));
      const probLinhas = linhasDe(p.problema, 10, largTexto - 20);
      const regLinhas = p.registro ? linhasDe(`Registro: ${p.registro}`, 8.5, largTexto) : [];
      const altTexto = 50 + medidos.reduce((s, b) => s + b.linhas.length * b.tam * 1.3 + 3, 0) + probLinhas.length * 13 + 18 + regLinhas.length * 11 + 8;
      y += 12;
      cabe(Math.min(altTexto, A - TOPO - M));
      const y0 = y, pagina0 = doc.getNumberOfPages();
      // cabeçalho do cartão: número, checklist, pessoa e data
      fonte(8, 'bold', C.mudo); doc.text(`${p.checklist.area ? `${p.checklist.area.toUpperCase()} · ` : ''}${p.checklist.titulo}`.slice(0, 120), M + 16, y + 16);
      doc.setFillColor(...C.azul950); doc.roundedRect(L - M - 34, y + 7, 26, 14, 7, 7, 'F');
      fonte(7.5, 'bold', C.lima); doc.text(`P${n}`, L - M - 21, y + 17, { align: 'center' });
      doc.setFillColor(...C.azul800); doc.circle(M + 27, y + 36, 11, 'F');
      fonte(8, 'bold', C.lima); doc.text(iniciais(p.pessoa.nome), M + 27, y + 39, { align: 'center' });
      fonte(10, 'bold', C.tinta); doc.text(p.pessoa.nome, M + 44, y + 34);
      fonte(8, 'normal', C.mudo); doc.text(`${p.pessoa.login} · ${p.pessoa.papelNome} · ${dataHora(p.atualizadoEm)}`, M + 44, y + 45);
      y += 58;
      for (const b of medidos) {
        fonte(b.tam, b.estilo, b.cor);
        for (const ln of b.linhas) { cabe(b.tam * 1.3); doc.text(ln, M + 16, y + b.tam); y += b.tam * 1.3; }
        y += 3;
      }
      // o problema em destaque
      const altProb = probLinhas.length * 13 + 14;
      cabe(Math.min(altProb, A - TOPO - M));
      doc.setFillColor(...C.laranjaSuave); doc.roundedRect(M + 16, y + 2, largTexto, altProb, 5, 5, 'F');
      fonte(10, 'normal', C.tinta);
      let yp = y + 15;
      for (const ln of probLinhas) { if (yp > A - M - 10) { novaPagina(); yp = y + 13; } doc.text(ln, M + 26, yp); yp += 13; }
      y = yp + 6;
      if (regLinhas.length) { fonte(8.5, 'normal', C.mudo); for (const ln of regLinhas) { cabe(11); doc.text(ln, M + 16, y + 9); y += 11; } }
      // imagens anexadas
      for (const im of p.imagens) {
        const larg = Math.min(largTexto, im.w), alt = larg * (im.h / im.w), maxAlt = A - TOPO - M - 40;
        const [lf, af] = alt > maxAlt ? [larg * (maxAlt / alt), maxAlt] : [larg, alt];
        y += 8;
        cabe(af + 16);
        doc.addImage(im.src, 'JPEG', M + 16, y, lf, af);
        doc.setDrawColor(...C.linha); doc.setLineWidth(0.6); doc.rect(M + 16, y, lf, af);
        y += af + 3;
        if (im.nome) { fonte(7.5, 'italic', C.mudo); doc.text(im.nome, M + 16, y + 8); y += 11; }
      }
      y += 10;
      // moldura do cartão e a barra laranja; se o cartão passou de página, só a barra, no trecho da última página
      if (doc.getNumberOfPages() === pagina0) {
        doc.setDrawColor(...C.linha); doc.setLineWidth(0.8); doc.roundedRect(M, y0, W, y - y0, 8, 8, 'S');
        doc.setFillColor(...C.laranja); doc.rect(M, y0 + 4, 3.5, y - y0 - 8, 'F');
      } else {
        doc.setFillColor(...C.laranja); doc.rect(M, TOPO, 3.5, Math.max(0, y - TOPO - 4), 'F');
      }
    }

    // rodapé em todas as páginas
    const paginas = doc.getNumberOfPages();
    for (let i = 1; i <= paginas; i++) {
      doc.setPage(i);
      doc.setDrawColor(...C.linha); doc.setLineWidth(0.6); doc.line(M, A - 30, L - M, A - 30);
      fonte(7.5, 'normal', C.mudo);
      doc.text('Faktory Flow · Guia do Consultor · Painel do administrador', M, A - 18);
      doc.text(`página ${i} de ${paginas}`, L - M, A - 18, { align: 'right' });
    }
    return { blob: doc.output('blob'), paginas };
  }

  window.ffRelatorioAdmin = { html, pdf };
})();
