/* Aba "Vídeos de fluxo" do guia: lê /videos/manifest.json (um grupo por trilha), mostra os cards e toca o vídeo
   num player dentro do painel. Os vídeos são gerados pelo projeto videos/ (Remotion + narração + música). */
(() => {
  const painel = document.getElementById('painel-videos');
  if (!painel) return;

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icones = {
    play: svg('<path d="m7 4 13 8-13 8Z"/>'),
    lista: svg('<path d="m9 11 2 2 4-4"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>'),
    fechar: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    relogio: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  };
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  painel.innerHTML = '<div class="vdx"><p class="vdx-carregando" role="status">Carregando vídeos…</p></div>';
  const raiz = painel.firstElementChild;

  const card = (v) => {
    const pronto = v.status === 'pronto';
    return `<article class="vdx-card${pronto ? '' : ' vdx-card--breve'}">
      <button type="button" class="vdx-capa" ${pronto ? `data-tocar="${esc(v.id)}"` : 'disabled'} aria-label="${pronto ? `Assistir: ${esc(v.titulo)}` : `${esc(v.titulo)} (em produção)`}">
        ${pronto ? `<img src="/videos/${esc(v.id)}.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="vdx-play">${icones.play}</span>` : '<span class="vdx-breve">Em produção</span>'}
      </button>
      <div class="vdx-info">
        <span class="vdx-num">${esc(v.numero)}</span>
        <h3>${esc(v.titulo)}</h3>
        <p>${esc(v.resumo)}</p>
        <div class="vdx-acoes">
          ${pronto && v.duracao ? `<span class="vdx-dur">${icones.relogio}${esc(v.duracao)}</span>` : ''}
          ${v.checklist ? `<a class="vdx-link" href="#checklist" data-checklist="${esc(v.checklist)}">${icones.lista}Abrir o checklist do fluxo</a>` : ''}
        </div>
      </div>
    </article>`;
  };

  fetch('/videos/manifest.json', { cache: 'no-cache' })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((m) => {
      raiz.innerHTML = `
        <header class="vdx-topo">
          <h1>Vídeos de fluxo</h1>
          <p>Vídeos curtos, com narração e legenda, que explicam cada fluxo do Faktory Flow: o conceito, as regras de negócio e o caminho nas telas. Feitos a partir da base de conhecimento do Harness e das telas reais do ambiente de teste.</p>
        </header>
        ${m.trilhas.map((t) => `<section class="vdx-trilha" aria-labelledby="vdx-${esc(t.id)}">
          <h2 id="vdx-${esc(t.id)}">${esc(t.nome)}</h2>
          <p class="vdx-desc">${esc(t.descricao)}</p>
          <div class="vdx-grade">${t.videos.map(card).join('')}</div>
        </section>`).join('')}
        <div class="vdx-player" hidden role="dialog" aria-modal="true" aria-label="Vídeo">
          <div class="vdx-player-caixa">
            <button type="button" class="vdx-fechar" aria-label="Fechar vídeo">${icones.fechar}</button>
            <video controls playsinline preload="metadata"></video>
            <p class="vdx-player-titulo"></p>
          </div>
        </div>`;
      const todos = m.trilhas.flatMap((t) => t.videos);
      const player = raiz.querySelector('.vdx-player');
      const video = player.querySelector('video');
      const fechar = () => { video.pause(); player.hidden = true; document.body.classList.remove('vdx-aberto'); };
      raiz.addEventListener('click', (e) => {
        const b = e.target.closest('[data-tocar]');
        if (b) {
          const v = todos.find((x) => x.id === b.dataset.tocar);
          video.poster = `/videos/${v.id}.jpg`;
          video.src = `/videos/${v.id}.mp4`;
          // a legenda já vem queimada no vídeo; a faixa .vtt fica disponível (desligada) para leitores de tela e busca
          video.querySelector('track')?.remove();
          video.insertAdjacentHTML('beforeend', `<track kind="captions" srclang="pt-BR" label="Português" src="/videos/${esc(v.id)}.vtt">`);
          player.querySelector('.vdx-player-titulo').textContent = `${v.numero} · ${v.titulo}`;
          player.hidden = false;
          document.body.classList.add('vdx-aberto');
          video.play().catch(() => {});
          player.querySelector('.vdx-fechar').focus();
          return;
        }
        if (e.target.closest('.vdx-fechar') || e.target === player) { fechar(); return; }
        const l = e.target.closest('[data-checklist]');
        if (l) {
          e.preventDefault();
          // abre o checklist na aba Checklist (o guia-checklists.js escuta este evento)
          window.ffIrParaAba?.('checklist');
          document.dispatchEvent(new CustomEvent('ff:abrir-checklist', { detail: { arquivo: l.dataset.checklist } }));
        }
      });
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && !player.hidden) fechar(); });
      document.addEventListener('ff:aba', (e) => { if (e.detail.aba !== 'videos' && !player.hidden) fechar(); });
    })
    .catch(() => { raiz.innerHTML = '<p class="vdx-carregando">Não foi possível carregar a lista de vídeos agora. Recarregue a página.</p>'; });
})();
