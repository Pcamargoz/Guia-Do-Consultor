/* Faktory Flow — Modo de exportação da Apostila para PDF.
   Ativado com ?pdf=1 (usado pelo gerador em docker). Carrega a folha de impressão
   e o Paged.js para paginar em A4 com cabeçalho, rodapé, "página X de Y" e sumário
   com números de página reais. Ao terminar, sinaliza window.ffPdfPronto = true. */
(() => {
  // Dentro da aba "Apostila" do Guia, o botão de exportar já está no cabeçalho do Guia.
  try { if (window.self !== window.top) document.documentElement.classList.add('ff-embutida'); } catch { /* origem diferente */ }

  if (!new URLSearchParams(location.search).has('pdf')) return;

  const root = document.documentElement;
  root.classList.add('ff-pdf');
  window.PagedConfig = { auto: false };

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'apostila-pdf.css';
  document.head.appendChild(css);

  const carregarScript = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    document.head.appendChild(s);
  });
  const pagedJs = carregarScript('https://cdn.jsdelivr.net/npm/pagedjs@0.4.3/dist/paged.polyfill.js');

  const normalizar = (el) => {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.badge-rever').forEach((b) => b.remove());
    return clone.textContent.replace(/^\s*\d+\.\s*/, '').replace(/\s+/g, ' ').trim().toLowerCase();
  };
  const ALIASES = { 'conclusão do guia': 'encerramento do guia' };

  // Liga cada item do sumário ao título correspondente (varredura em ordem, para títulos repetidos).
  function ligarSumario() {
    const titulos = [...document.querySelectorAll('.page:not(.capa) h1, .page h2.subtitulo-secao, .page h3.subtitulo-menor')]
      .filter((h) => !h.closest('.page').querySelector('.sumario'));
    const chaves = titulos.map(normalizar);
    let cursor = 0;
    let ligados = 0;
    document.querySelectorAll('.sumario-item').forEach((item, n) => {
      const alvo = ALIASES[normalizar(item.querySelector('.titulo'))] || normalizar(item.querySelector('.titulo'));
      let idx = chaves.findIndex((c, i) => i >= cursor && c === alvo);
      if (idx < 0) idx = chaves.findIndex((c, i) => i >= cursor && c.includes(alvo));
      if (idx < 0) return;
      const titulo = titulos[idx];
      titulo.id ||= `sumario-${n + 1}`;
      item.setAttribute('href', `#${titulo.id}`);
      cursor = idx + 1;
      ligados += 1;
    });
    root.dataset.sumarioLigado = `${ligados}/${document.querySelectorAll('.sumario-item').length}`;
  }

  const imagensProntas = () => Promise.all([...document.images].map((img) =>
    img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));
  const cssPronto = new Promise((r) => { css.onload = css.onerror = r; });

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await Promise.all([cssPronto, imagensProntas(), document.fonts.ready]);
      ligarSumario();
      // O Paged.js lê quebras por seletor, sem cascata: remove a quebra fixa "uma .page por folha" do estilo original.
      document.querySelectorAll('head style').forEach((s) => {
        s.textContent = s.textContent.replace(/page-break-after:\s*always;?/g, '');
      });
      document.querySelectorAll('.page').forEach((p) => {
        if (p.matches('.capa, .pagina-final') || p.querySelector(':scope > .titulo-pagina')) p.classList.add('ff-capitulo');
      });
      await pagedJs;
      await new window.Paged.Previewer().preview();
      root.dataset.paginas = document.querySelectorAll('.pagedjs_page').length;
    } catch (err) {
      // Sem Paged.js o Chromium ainda imprime usando as regras @page da folha de impressão.
      window.ffPdfErro = String(err && err.message || err);
      console.error(err);
    } finally {
      window.ffPdfPronto = true;
    }
  });
})();
