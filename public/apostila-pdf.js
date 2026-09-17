/* Faktory Flow — Modo de exportação da Apostila para PDF.
   Ativado com ?pdf=1 (usado pelo gerador em docker). Cada página do sistema (.page) vira
   exatamente uma folha A4: o conteúdo que não cabe passa para duas colunas e/ou tem a escala
   reduzida só o necessário. Insere cabeçalho, rodapé "Página X de N" e corrige o sumário.
   Ao terminar, sinaliza window.ffPdfPronto = true. */
(() => {
  // Dentro da aba "Apostila" do Guia, o botão de exportar já está no cabeçalho do Guia.
  try { if (window.self !== window.top) document.documentElement.classList.add('ff-embutida'); } catch { /* origem diferente */ }

  if (!new URLSearchParams(location.search).has('pdf')) return;

  const root = document.documentElement;
  root.classList.add('ff-pdf');

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'apostila-pdf.css';
  document.head.appendChild(css);
  const cssPronto = new Promise((r) => { css.onload = css.onerror = r; });

  const ESCALA_MINIMA = 0.5;
  const COLUNAS_ABAIXO_DE = 0.82; // se couber só com escala menor que isso, tenta duas colunas

  const normalizar = (el) => {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.badge-rever').forEach((b) => b.remove());
    return clone.textContent.replace(/^\s*\d+\.\s*/, '').replace(/\s+/g, ' ').trim().toLowerCase();
  };
  const ALIASES = { 'conclusão do guia': 'encerramento do guia' };

  /* ---------- Sumário: número real da folha de cada título ---------- */
  function corrigirSumario(paginas) {
    const titulos = [...document.querySelectorAll('.page:not(.capa) h1, .page h2.subtitulo-secao, .page h3.subtitulo-menor')]
      .filter((h) => !h.closest('.page').querySelector('.sumario'));
    const chaves = titulos.map(normalizar);
    let cursor = 0;
    document.querySelectorAll('.sumario-item').forEach((item) => {
      const titulo = normalizar(item.querySelector('.titulo'));
      const alvo = ALIASES[titulo] || titulo;
      let idx = chaves.findIndex((c, i) => i >= cursor && c === alvo);
      if (idx < 0) idx = chaves.findIndex((c, i) => i >= cursor && c.includes(alvo));
      if (idx < 0) return;
      cursor = idx + 1;
      const numero = paginas.indexOf(titulos[idx].closest('.page')) + 1;
      const campo = item.querySelector('.pagina');
      if (campo && numero > 0) campo.textContent = String(numero);
    });
  }

  /* ---------- Encaixe do conteúdo em uma folha ---------- */
  function aplicarEscala(conteudo, largura, escala) {
    conteudo.style.zoom = String(escala);
    conteudo.style.width = `${largura / escala}px`;
  }

  // Maior escala (entre ESCALA_MINIMA e 1) em que a altura do conteúdo cabe na área útil.
  function maiorEscalaQueCabe(conteudo, largura, alturaUtil) {
    aplicarEscala(conteudo, largura, 1);
    if (conteudo.getBoundingClientRect().height <= alturaUtil) return 1;
    let baixo = ESCALA_MINIMA;
    let alto = 1;
    for (let i = 0; i < 14; i += 1) {
      const meio = (baixo + alto) / 2;
      aplicarEscala(conteudo, largura, meio);
      if (conteudo.getBoundingClientRect().height <= alturaUtil) baixo = meio; else alto = meio;
    }
    return baixo;
  }

  function encaixar(pagina) {
    const conteudo = document.createElement('div');
    conteudo.className = 'pdf-conteudo';
    while (pagina.firstChild) conteudo.appendChild(pagina.firstChild);
    pagina.appendChild(conteudo);

    const estilo = getComputedStyle(pagina);
    const largura = pagina.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
    const alturaUtil = pagina.clientHeight - parseFloat(estilo.paddingTop) - parseFloat(estilo.paddingBottom);

    let escala = maiorEscalaQueCabe(conteudo, largura, alturaUtil);
    let colunas = false;
    if (escala < COLUNAS_ABAIXO_DE && !pagina.querySelector('.sumario')) {
      conteudo.classList.add('pdf-conteudo--colunas');
      const escalaColunas = maiorEscalaQueCabe(conteudo, largura, alturaUtil);
      if (escalaColunas > escala + 0.04) { escala = escalaColunas; colunas = true; } else conteudo.classList.remove('pdf-conteudo--colunas');
    }
    aplicarEscala(conteudo, largura, escala);
    return { escala: Math.round(escala * 100) / 100, colunas };
  }

  /* ---------- Cabeçalho e rodapé ---------- */
  function decorar(paginas) {
    let parte = '';
    paginas.forEach((pagina, i) => {
      const secao = pagina.querySelector('.titulo-pagina .numero-secao');
      if (secao) parte = secao.textContent.trim();
      if (pagina.classList.contains('capa')) return;
      const cabecalho = document.createElement('div');
      cabecalho.className = 'pdf-cabecalho';
      cabecalho.innerHTML = '<span>Apostila do Consultor — Faktory Flow</span><strong></strong>';
      cabecalho.querySelector('strong').textContent = pagina.classList.contains('pagina-final') ? '' : parte;
      const rodape = document.createElement('div');
      rodape.className = 'pdf-rodape';
      rodape.innerHTML = `<span>Faktory Flow · Material de uso interno</span><strong>Página ${i + 1} de ${paginas.length}</strong>`;
      pagina.append(cabecalho, rodape);
    });
  }

  const imagensProntas = () => Promise.all([...document.images].map((img) =>
    img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await Promise.all([cssPronto, imagensProntas(), document.fonts.ready]);
      const paginas = [...document.querySelectorAll('.page')];
      corrigirSumario(paginas);
      const relatorio = paginas.map((p, i) => (p.classList.contains('capa') ? { pagina: 1, capa: true } : { pagina: i + 1, ...encaixar(p) }));
      decorar(paginas);
      root.dataset.paginas = String(paginas.length);
      window.ffPdfRelatorio = relatorio;
    } catch (err) {
      window.ffPdfErro = String(err && err.message || err);
      console.error(err);
    } finally {
      window.ffPdfPronto = true;
    }
  });
})();
