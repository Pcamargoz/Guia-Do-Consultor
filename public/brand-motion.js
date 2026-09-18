/* Faktory Flow — camada de movimento e microinterações.
   Só adiciona classes, variáveis CSS e elementos decorativos (aria-hidden).
   Não altera textos, IDs nem os scripts existentes das páginas. */
(() => {
  // No modo de exportação para PDF (?pdf=1) nenhum efeito visual é aplicado.
  if (document.documentElement.classList.contains('ff-pdf')) return;
  const body = document.body;
  const isGuide = body.classList.contains('ff-guide');
  const reduceQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const fineQuery = matchMedia('(hover: hover) and (pointer: fine)');
  const motionOn = () => !reduceQuery.matches;

  /* ---------- Acessibilidade: elementos clicáveis sem foco de teclado ---------- */
  const makeOperable = (el) => {
    if (el.hasAttribute('tabindex') || el.matches('a[href], button')) return;
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      el.click();
    });
  };

  const enhanceGuideA11y = () => {
    document.querySelectorAll('.nav-item, .fluxo-mapa, .accordion-header, .modulo-card').forEach(makeOperable);
    document.querySelectorAll('.accordion-header').forEach((header) => {
      const sync = () => header.setAttribute('aria-expanded', header.parentElement.classList.contains('open'));
      sync();
      header.addEventListener('click', sync);
    });
  };

  /* ---------- Fundo vivo ---------- */
  const buildStage = () => {
    const stage = document.createElement('div');
    stage.className = 'ff-stage';
    stage.setAttribute('aria-hidden', 'true');
    const kinds = ['lime', 'blue', 'sky'];
    let html = '<div class="ff-blob ff-blob--a"></div><div class="ff-blob ff-blob--b"></div><div class="ff-blob ff-blob--c"></div>';
    for (let i = 0; i < 14; i++) {
      const size = 14 + ((i * 37) % 46);
      const duration = 18 + ((i * 13) % 20);
      html += `<span class="ff-sq ff-sq--${kinds[i % 3]}" style="--x:${(i * 71) % 100}%;--s:${size}px;--d:${duration}s;--delay:-${(i * 7) % duration}s;--o:${0.12 + ((i * 5) % 20) / 100};--sway:${((i % 2) ? -1 : 1) * (30 + i * 6)}px;--turn:${(i % 2 ? -1 : 1) * 360}deg"></span>`;
    }
    stage.innerHTML = html;
    body.prepend(stage);

    const progress = document.createElement('div');
    progress.className = 'ff-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.prepend(progress);

    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      ticking = false;
    };
    addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  };

  /* ---------- Scroll reveal com stagger ---------- */
  let revealObserver = null;
  const setupReveal = () => {
    if (!motionOn() || !('IntersectionObserver' in window)) return;

    revealObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      visible.forEach((entry, i) => {
        const el = entry.target;
        revealObserver.unobserve(el);
        el.style.setProperty('--ff-delay', `${Math.min(i, 8) * 90}ms`);
        el.classList.add('ff-in');
        // Libera o elemento das propriedades de transição após a entrada.
        setTimeout(() => el.style.removeProperty('--ff-delay'), 2200);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    const guideTargets = '.main section:not(#dashboard) > .header, .accordion, .processo-card, .diagnostico-step, .main section > .alerta, .main section > .tabela, .footer';
    const bookTargets = '.page:not(.capa) .titulo-pagina, .ficha-bloco, .sumario, .modulo-bloco, .callout, .fluxo-impresso, .fluxo-vertical, .page > .tabela, h2.subtitulo-secao, .anotacoes, .grid-duas-colunas, .pagina-final > *';
    document.querySelectorAll(isGuide ? guideTargets : bookTargets).forEach((el) => observe(el));
    if (!isGuide) document.querySelectorAll('.page:not(.capa)').forEach((el) => observe(el, 'ff-reveal--big'));
  };

  const observe = (el, variant) => {
    if (!revealObserver || el.classList.contains('ff-reveal')) return;
    // Nunca esconder algo que já está na tela quando o script roda.
    if (el.getBoundingClientRect().top < innerHeight * 0.92) return;
    el.querySelectorAll('.mapa-etapa, .mapa-conector-h, .mapa-folha, .fluxo-etapa, .fluxo-seta, .sumario-item, .fluxo-vertical-item')
      .forEach((child, i) => child.style.setProperty('--i', Math.min(i, 24)));
    el.classList.add('ff-reveal');
    if (variant) el.classList.add(variant);
    revealObserver.observe(el);
  };

  /* Cards de módulo são recriados a cada filtro: entram em cascata. */
  const watchModuleGrid = () => {
    const grid = document.getElementById('modulosGrid');
    if (!grid) return;
    let seen = false;
    const prepare = () => {
      const cards = grid.querySelectorAll('.modulo-card');
      cards.forEach((card, i) => {
        makeOperable(card);
        if (!seen || !motionOn()) return;
        card.animate([
          { opacity: 0, transform: 'perspective(900px) translateY(70px) rotateX(28deg) scale(.85)', filter: 'blur(8px)' },
          { opacity: 1, transform: 'perspective(900px) translateY(-6px) rotateX(-3deg) scale(1.02)', filter: 'blur(0)', offset: 0.7 },
          { opacity: 1, transform: 'perspective(900px)', filter: 'blur(0)' }
        ], { duration: 850, delay: Math.min(i, 12) * 60, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
      });
    };
    new MutationObserver(prepare).observe(grid, { childList: true });
    // Primeira renderização: anima só quando a grade entra na tela.
    if (motionOn() && 'IntersectionObserver' in window) {
      const once = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        once.disconnect();
        seen = true;
        prepare();
      }, { threshold: 0.05 });
      once.observe(grid);
    } else {
      grid.querySelectorAll('.modulo-card').forEach(makeOperable);
    }
  };

  /* ---------- Fluxos em linha: esconde o conector que sobra na ponta quando a linha quebra ---------- */
  const tidyFlowRows = () => {
    const rows = document.querySelectorAll('.mapa-linha');
    if (!rows.length || !('ResizeObserver' in window)) return;
    const sameLine = (a, b) => a.offsetTop < b.offsetTop + b.offsetHeight && b.offsetTop < a.offsetTop + a.offsetHeight;
    const tidy = (row) => {
      const links = row.querySelectorAll(':scope > .mapa-conector-h');
      links.forEach((c) => c.classList.remove('ff-quebra-fim', 'ff-quebra-inicio'));
      if (!row.offsetWidth || getComputedStyle(row).flexDirection.startsWith('column')) return;
      links.forEach((c) => {
        const prev = c.previousElementSibling;
        const next = c.nextElementSibling;
        if (!prev || !next) return;
        if (!sameLine(c, prev)) c.classList.add('ff-quebra-inicio');
        else if (!sameLine(c, next)) c.classList.add('ff-quebra-fim');
      });
    };
    // Roda dentro do próprio callback (após o layout): esconder um conector não muda o tamanho da linha.
    const ro = new ResizeObserver((entries) => entries.forEach((e) => tidy(e.target)));
    rows.forEach((row) => ro.observe(row));
    // A troca para a fonte web muda a largura das etapas sem mudar o tamanho da linha.
    document.fonts?.ready.then(() => rows.forEach(tidy));
  };

  /* ---------- Contador das métricas (termina exatamente no texto original) ---------- */
  const countUp = () => {
    if (!motionOn()) return;
    document.querySelectorAll('.metrica .numero').forEach((el, i) => {
      const original = el.textContent;
      const match = original.match(/^(\d+)(.*)$/);
      if (!match) return;
      const target = Number(match[1]);
      const suffix = match[2];
      const start = performance.now() + 950 + i * 100;
      const duration = 1400;
      el.setAttribute('aria-label', original);
      const step = (now) => {
        const t = Math.max(0, Math.min(1, (now - start) / duration));
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = t < 1 ? `${Math.round(target * eased)}${suffix}` : (el.dataset.final ?? original);
        if (t < 1) requestAnimationFrame(step);
        else el.removeAttribute('aria-label');
      };
      el.textContent = `0${suffix}`;
      requestAnimationFrame(step);
    });
  };

  /* ---------- Inclinação 3D + reflexo, botões magnéticos e ripple ---------- */
  const setupPointerFx = () => {
    const tiltSel = '.modulo-card, .metrica';
    const magnetSel = '.toolbar-btn';
    const rippleSel = '.toolbar-btn, .nav-item, .accordion-header';
    let frame = 0;

    document.addEventListener('pointermove', (e) => {
      if (!motionOn() || !fineQuery.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const tilt = e.target.closest?.(tiltSel);
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const strength = tilt.classList.contains('metrica') ? 14 : 10;
          tilt.style.setProperty('--tx', `${(px - 0.5) * strength}deg`);
          tilt.style.setProperty('--ty', `${(0.5 - py) * strength}deg`);
          tilt.style.setProperty('--gx', `${px * 100}%`);
          tilt.style.setProperty('--gy', `${py * 100}%`);
        }
        const magnet = e.target.closest?.(magnetSel);
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          magnet.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.28}px`);
          magnet.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.4}px`);
        }
      });
    }, { passive: true });

    document.addEventListener('pointerout', (e) => {
      [tiltSel, magnetSel].forEach((sel) => {
        const el = e.target.closest?.(sel);
        if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
        ['--tx', '--ty', '--mx', '--my'].forEach((p) => el.style.removeProperty(p));
      });
    });

    document.addEventListener('pointerdown', (e) => {
      const el = e.target.closest?.(rippleSel);
      if (!el || !motionOn()) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--rx', `${e.clientX - r.left}px`);
      el.style.setProperty('--ry', `${e.clientY - r.top}px`);
      el.classList.remove('ff-rippling');
      void el.offsetWidth; // reinicia a animação
      el.classList.add('ff-rippling');
    });
    document.addEventListener('animationend', (e) => {
      if (e.animationName === 'ff-ripple') e.target.classList.remove('ff-rippling');
    });
  };

  /* ---------- Parallax suave do fundo ---------- */
  const setupParallax = () => {
    const stage = document.querySelector('.ff-stage');
    if (!stage) return;
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking || !motionOn()) return;
      ticking = true;
      requestAnimationFrame(() => {
        stage.style.transform = `translate3d(0, ${-Math.min(scrollY * 0.04, 120)}px, 0)`;
        ticking = false;
      });
    }, { passive: true });
  };

  /* Impressão: garante tudo visível. */
  addEventListener('beforeprint', () => {
    document.querySelectorAll('.ff-reveal:not(.ff-in)').forEach((el) => el.classList.add('ff-in'));
  });

  const start = () => {
    buildStage();
    if (isGuide) { enhanceGuideA11y(); watchModuleGrid(); countUp(); tidyFlowRows(); }
    setupReveal();
    setupPointerFx();
    setupParallax();
    reduceQuery.addEventListener?.('change', () => {
      if (reduceQuery.matches) document.querySelectorAll('.ff-reveal').forEach((el) => el.classList.add('ff-in'));
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
