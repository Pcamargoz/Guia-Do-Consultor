/* Faktory Flow — linguagem de movimento da Metodologia (refatoracao-guia-do-consultor/15-movimento.md).
   Utilitários pequenos sobre APIs nativas (View Transitions, Web Animations, IntersectionObserver), sem dependências:
   o projeto não tem build e a CSP só aceita scripts do próprio site (decisão D2).
     transicao(fn)              troca de tela com View Transition (fallback: só executa fn)
     nomear(el, nome)           dá um view-transition-name a um elemento só durante a próxima troca
     revelar(raiz, opcoes)      revela na rolagem os [data-revela] e [data-revela-lista] (com stagger), uma vez só
     layout(raiz, fn)           FLIP: anima a mudança de layout dos [data-flip] depois de fn() redesenhar
     indicador(grupo, ativo)    pílula/sublinhado que desliza até o item ativo (abas, filtros)
     pressao(raiz)              resposta de toque/clique em botões (escala curta com mola)
   Conteúdo nunca fica escondido sem JS: a classe html.mov só entra quando o script roda e o usuário não pediu
   movimento reduzido; sem IntersectionObserver tudo aparece. */
(() => {
  const raizDoc = document.documentElement;
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const reduzido = () => mq.matches;
  const aplicarClasse = () => raizDoc.classList.toggle('mov', !reduzido());
  aplicarClasse();
  mq.addEventListener?.('change', aplicarClasse);

  /* Curvas: saída exponencial (chegadas confiantes) e mola suave (leve passagem do ponto, sem quicar). */
  const EASE = 'cubic-bezier(.16, 1, .3, 1)';
  const MOLA = 'linear(0, .12 3%, .42 9%, .74 16%, .93 23%, 1.025 31%, 1.04 37%, 1.02 46%, 1.003 58%, .999 72%, 1)';
  const suportaLinear = (() => { try { return CSS.supports('animation-timing-function', MOLA); } catch { return false; } })();
  const mola = suportaLinear ? MOLA : EASE;
  const DUR = { rapido: 160, base: 320, layout: 420, cena: 640 };

  /* ---------- troca de tela ---------- */
  let emTroca = null;
  function transicao(fn) {
    if (!document.startViewTransition || reduzido() || document.hidden) { const r = fn(); return Promise.resolve(r); }
    if (emTroca) { try { emTroca.skipTransition(); } catch { /* nada */ } }
    // fn roda uma vez só: pela transição ou, se o navegador não desenhar a tempo (aba em segundo plano, painel
    // escondido), pela salvaguarda. A troca de tela nunca fica esperando uma animação.
    let rodou = false;
    let resultado;
    const rodar = () => { if (!rodou) { rodou = true; resultado = Promise.resolve(fn()); } return resultado; };
    // Espera o desenho da tela nova, mas nunca mais que 450 ms (a tela não pode "travar" esperando dados).
    const vt = document.startViewTransition(() => Promise.race([rodar(), new Promise((ok) => setTimeout(ok, 450))]));
    emTroca = vt;
    const salvaguarda = setTimeout(() => { if (!rodou) { try { vt.skipTransition(); } catch { /* nada */ } rodar(); } }, 200);
    vt.finished.finally(() => { clearTimeout(salvaguarda); if (emTroca === vt) emTroca = null; limparNomes(); }).catch(() => {});
    vt.ready.catch(() => {});
    return vt.updateCallbackDone.catch(() => {});
  }
  const nomeados = new Set();
  function nomear(el, nome) {
    if (!el) return;
    el.style.viewTransitionName = nome;
    nomeados.add(el);
  }
  function limparNomes() { nomeados.forEach((el) => { el.style.viewTransitionName = ''; }); nomeados.clear(); }

  /* ---------- revelar na rolagem ---------- */
  function revelar(raiz, { margem = '0px 0px -8% 0px', passo = 45, maxAtraso = 360 } = {}) {
    const alvos = [...raiz.querySelectorAll('[data-revela]:not(.visto), [data-revela-lista]:not(.visto)')];
    if (!alvos.length) return () => {};
    if (reduzido() || !('IntersectionObserver' in window)) { alvos.forEach((el) => el.classList.add('visto')); return () => {}; }
    let lote = [];
    let agendado = false;
    const soltar = () => {
      agendado = false;
      // quem entra junto na tela entra em sequência (ordem do documento), com atraso total limitado
      lote.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      lote.forEach((el, i) => {
        const filhos = el.hasAttribute('data-revela-lista') ? [...el.children] : [];
        el.style.setProperty('--mov-atraso', `${Math.min(i * passo, maxAtraso)}ms`);
        filhos.forEach((f, k) => f.style.setProperty('--mov-atraso', `${Math.min(i * passo + k * passo, maxAtraso + 240)}ms`));
        el.classList.add('visto');
      });
      lote = [];
    };
    const io = new IntersectionObserver((ents) => {
      for (const e of ents) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        lote.push(e.target);
      }
      if (lote.length && !agendado) { agendado = true; requestAnimationFrame(soltar); }
    }, { rootMargin: margem, threshold: 0.08 });
    alvos.forEach((el) => io.observe(el));
    // Segurança: se a aba ficou em segundo plano ou o observador não respondeu, nada fica escondido.
    const seguro = setTimeout(() => alvos.forEach((el) => el.classList.add('visto')), 4000);
    return () => { io.disconnect(); clearTimeout(seguro); };
  }

  /* ---------- layout animado (FLIP) ---------- */
  function layout(raiz, fn) {
    if (reduzido()) { fn(); return; }
    const antes = new Map([...raiz.querySelectorAll('[data-flip]')].map((el) => [el.dataset.flip, el.getBoundingClientRect()]));
    fn();
    const depois = [...raiz.querySelectorAll('[data-flip]')];
    depois.forEach((el, i) => {
      el.classList.add('visto');
      el.querySelectorAll('[data-revela], [data-revela-lista]').forEach((x) => x.classList.add('visto'));
      const a = antes.get(el.dataset.flip);
      const b = el.getBoundingClientRect();
      if (a) {
        const dx = a.left - b.left;
        const dy = a.top - b.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: DUR.layout, easing: mola });
      } else {
        el.animate([{ transform: 'scale(.96)', opacity: 0.4 }, { transform: 'none', opacity: 1 }], { duration: DUR.base, delay: Math.min(i * 18, 160), easing: EASE, fill: 'backwards' });
      }
    });
  }

  /* ---------- indicador deslizante ---------- */
  function indicador(grupo, seletorAtivo, classe = 'mov-indicador') {
    if (!grupo) return () => {};
    let el = grupo.querySelector(`:scope > .${classe}`);
    if (!el) { el = document.createElement('span'); el.className = classe; el.setAttribute('aria-hidden', 'true'); grupo.prepend(el); }
    const mover = (animar) => {
      const ativo = grupo.querySelector(seletorAtivo);
      if (!ativo) { el.style.opacity = '0'; return; }
      const g = grupo.getBoundingClientRect();
      const a = ativo.getBoundingClientRect();
      const destino = `translate(${a.left - g.left + grupo.scrollLeft}px, ${a.top - g.top + grupo.scrollTop}px)`;
      el.style.width = `${a.width}px`;
      el.style.height = `${a.height}px`;
      el.style.opacity = '1';
      const de = el.style.transform;
      el.style.transform = destino;
      if (animar && de && de !== destino && !reduzido()) el.animate([{ transform: de }, { transform: destino }], { duration: DUR.base, easing: mola });
    };
    mover(false);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => mover(false)) : null;
    if (ro) ro.observe(grupo);
    return { mover: () => mover(true), destruir: () => ro && ro.disconnect() };
  }

  /* ---------- resposta de pressão ---------- */
  function pressao(raiz) {
    const seletor = '.mt-botao, .mt-segmento__op, .mt-recurso, .mt-card, .mt-video, .mt-rel, .mt-vizinho, .ff-botao, .mt-player__btn, .mt-cap__btn, .mt-chip--link';
    const aoApertar = (e) => {
      const b = e.target.closest && e.target.closest(seletor);
      if (!b || reduzido() || b.disabled) return;
      b.animate([{ transform: 'scale(1)' }, { transform: 'scale(.975)' }], { duration: 90, easing: 'ease-out', fill: 'forwards', composite: 'add' });
      const soltar = () => {
        b.animate([{ transform: 'scale(.975)' }, { transform: 'scale(1)' }], { duration: DUR.base, easing: mola, composite: 'add' });
        b.getAnimations().forEach((a) => { if (a.effect && a.effect.getComputedTiming().fill === 'forwards') a.cancel(); });
      };
      b.addEventListener('pointerup', soltar, { once: true });
      b.addEventListener('pointerleave', soltar, { once: true });
    };
    raiz.addEventListener('pointerdown', aoApertar);
    return () => raiz.removeEventListener('pointerdown', aoApertar);
  }

  /* ---------- texto ----------
     palavras(el): cada palavra do título sobe por trás de uma máscara, em sequência curta. O texto continua um texto
     só para leitores de tela (as palavras ficam em spans dentro do mesmo elemento, com os espaços originais). */
  function palavras(el, { atraso = 0 } = {}) {
    if (!el || el.dataset.movPalavras) return el;
    el.dataset.movPalavras = '';
    const partes = el.textContent.split(/(\s+)/);
    el.replaceChildren(...partes.map((p, i) => {
      if (/^\s+$/.test(p) || !p) return document.createTextNode(p);
      const m = document.createElement('span');
      m.className = 'mov-palavra';
      const dentro = document.createElement('span');
      dentro.textContent = p;
      dentro.style.setProperty('--i', String(Math.floor(i / 2)));
      if (atraso) dentro.style.setProperty('--d', `${atraso}ms`);
      m.append(dentro);
      return m;
    }));
    return el;
  }
  /** contar(el, valor): o número sobe de 0 até o valor (dado real), com saída exponencial. */
  function contar(el, valor, { duracao = 900, atraso = 0 } = {}) {
    if (!el) return;
    const fim = Number(valor) || 0;
    if (reduzido() || !fim) { el.textContent = String(fim); return; }
    const ini = performance.now() + atraso;
    el.textContent = '0';
    const passo = (agora) => {
      const t = Math.min(1, Math.max(0, (agora - ini) / duracao));
      const e = 1 - Math.pow(2, -10 * t);
      el.textContent = String(Math.round(fim * (t >= 1 ? 1 : e)));
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
    setTimeout(() => { el.textContent = String(fim); }, atraso + duracao + 400); // aba em segundo plano: o valor final chega
  }

  window.FFMovimento = Object.freeze({ transicao, nomear, revelar, layout, indicador, pressao, palavras, contar, reduzido, EASE, mola, DUR });
})();
