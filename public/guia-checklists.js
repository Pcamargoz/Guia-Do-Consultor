/* Biblioteca de checklists do guia: lê /checklists/manifest.json (gerado por scripts/gerar-checklists-estagiarios.mjs),
   mostra cards com progresso do usuário, filtros e busca, e abre cada checklist dentro do próprio guia (ou baixa o HTML). */
(() => {
  const painel = document.getElementById('painel-checklist');
  if (!painel) return;

  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const icones = {
    busca: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'),
    baixar: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>'),
    abrir: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
    voltar: svg('<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>'),
    relatorio: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>'),
    recomecar: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
    externo: svg('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/>'),
    consultor: svg('<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.5 6H13a3 3 0 0 1 3 3v.5M8.5 18H13a3 3 0 0 0 3-3v-.5"/>'),
    estagiario: svg('<path d="m2 9 10-5 10 5-10 5Z"/><path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5"/>'),
    qa: svg('<path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6Z"/><path d="m9 12 2 2 4-4"/>'),
  };
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (v) => String(v ?? '').toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[̀-ͯ]/g, '');
  /* Progresso: o da conta do usuário (servidor) tem prioridade; sem conta, o deste navegador. */
  let daConta = null;
  const progresso = (chave) => {
    if (daConta && chave in daConta) return daConta[chave];
    try { const v = chave && localStorage.getItem(`${chave}:pct`); return v === null || v === undefined ? null : Number(v); } catch { return null; }
  };
  const carregarProgresso = () => fetch('/api/checklists-progresso?lista=1', { credentials: 'same-origin', cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((res) => { if (res) daConta = Object.fromEntries(res.itens.map((i) => [i.chave, i.pct])); })
    .catch(() => {});

  painel.innerHTML = '<div class="ckx"><p class="ckx-carregando" role="status">Carregando checklists…</p></div>';
  const raiz = painel.firstElementChild;

  Promise.all([
    fetch('/checklists/manifest.json', { cache: 'no-cache' }).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
    carregarProgresso(),
  ])
    .then(([manifesto]) => iniciar(manifesto))
    .catch(() => { raiz.innerHTML = '<p class="ckx-vazio">Não foi possível carregar a lista de checklists. Atualize a página e tente de novo.</p>'; });

  function iniciar({ grupos, itens }) {
    const total = itens.filter((i) => i.etapas);
    const etapas = total.reduce((s, i) => s + i.etapas, 0);
    const verificadas = total.reduce((s, i) => s + i.verificadas, 0);
    const pctVerificado = etapas ? Math.round((verificadas * 100) / etapas) : 0;
    let filtro = 'todos';
    let busca = '';
    let aberto = null;
    let rolagem = 0;
    let secoes = [];

    raiz.innerHTML = `
      <section class="ckx-lista">
        <header class="ckx-hero">
          <div>
            <span class="ckx-eyebrow">Biblioteca</span>
            <h1>Checklists do sistema</h1>
            <p>Fluxos de teste para consultores, trilha de integração para estagiários e os planos completos de validação. Abra aqui mesmo ou baixe o HTML. Aqui dentro o seu progresso e as imagens que você anexar às etapas ficam salvos na sua conta, em qualquer computador.</p>
          </div>
          <dl class="ckx-stats">
            <div><dt>Checklists</dt><dd>${itens.length}</dd></div>
            <div><dt>Etapas</dt><dd>${etapas}</dd></div>
            <div><dt>Conferidas no sistema</dt><dd>${pctVerificado}%</dd></div>
          </dl>
        </header>
        <div class="ckx-barra">
          <label class="ckx-busca">${icones.busca}<input type="search" data-busca placeholder="Buscar por área, fluxo ou módulo…" aria-label="Buscar checklists"></label>
          <div class="ckx-filtros" role="group" aria-label="Filtrar por tipo" data-filtros></div>
        </div>
        <p class="ckx-contagem" data-contagem aria-live="polite"></p>
        <div class="ckx-grade" data-grade></div>
      </section>
      <section class="ckx-visor" data-visor hidden>
        <div class="ckx-visor-topo">
          <button type="button" class="ckx-btn ckx-btn--sec" data-voltar>${icones.voltar}<span>Biblioteca</span></button>
          <strong data-visor-titulo></strong>
          <span class="ckx-sinc" data-sinc role="status" aria-live="polite"></span>
          <label class="ckx-ir" data-ir hidden><span class="ckx-sr">Ir para a seção</span>
            <select data-ir-select aria-label="Ir para a seção"><option value="">Ir para…</option></select>
          </label>
          <span class="ckx-visor-acoes">
            <button type="button" class="ckx-btn ckx-btn--sec" data-acao="relatorio" title="Copiar o relatório de validação (Markdown)">${icones.relatorio}<span>Relatório</span></button>
            <button type="button" class="ckx-btn ckx-btn--sec ckx-btn--icone" data-acao="recomecar" aria-label="Recomeçar este checklist" title="Recomeçar (apaga marcações e anotações)">${icones.recomecar}</button>
            <a class="ckx-btn ckx-btn--sec ckx-btn--icone" data-visor-nova target="_blank" rel="noopener" aria-label="Abrir em nova aba" title="Abrir em nova aba">${icones.externo}</a>
            <a class="ckx-btn" data-visor-baixar title="Baixar o HTML">${icones.baixar}<span>Baixar</span></a>
          </span>
        </div>
        <iframe class="ckx-frame" data-frame title="Checklist" scrolling="no"></iframe>
      </section>
      <div class="ckx-aviso" data-aviso role="status" aria-live="polite"></div>
      <dialog class="ckx-imagem" data-imagem aria-label="Imagem anexada">
        <img alt="" data-imagem-img>
        <form method="dialog"><a class="ckx-btn ckx-btn--sec" data-imagem-abrir target="_blank" rel="noopener">Abrir em nova aba</a><button class="ckx-btn" autofocus>Fechar</button></form>
      </dialog>`;

    const $ = (s) => raiz.querySelector(s);
    const lista = $('.ckx-lista');
    const visor = $('[data-visor]');
    const frame = $('[data-frame]');
    const grade = $('[data-grade]');
    const filtros = $('[data-filtros]');

    const urlAbrir = (i) => `/checklists/${i.arquivo.replace(/\.html$/, '')}`;
    const urlBaixar = (i) => `/api/checklists-download?arquivo=${encodeURIComponent(i.arquivo)}`;

    function renderFiltros() {
      const contar = (g) => itens.filter((i) => g === 'todos' || i.grupo === g).length;
      filtros.innerHTML = [{ id: 'todos', nome: 'Todos' }, ...grupos].map((g) =>
        `<button type="button" class="ckx-chip" data-filtro="${esc(g.id)}" aria-pressed="${g.id === filtro}">${esc(g.nome)}<em>${contar(g.id)}</em></button>`).join('');
    }

    function card(i, n) {
      const pct = progresso(i.chave);
      const meta = i.etapas ? `<span>${i.etapas} etapas</span><span class="ckx-ok">${i.verificadas} conferidas</span>` : '<span>Plano completo</span>';
      const barra = pct !== null ? `<div class="ckx-prog" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Seu progresso"><i style="transform:scaleX(${pct / 100})"></i><b>${pct}%</b></div>` : '';
      return `
        <article class="ckx-card" data-grupo="${esc(i.grupo)}" style="--i:${n}">
          <div class="ckx-card-topo"><span class="ckx-ico">${icones[i.grupo] || icones.qa}</span><span class="ckx-area">${esc(i.area)}</span></div>
          <h3>${esc(i.titulo)}</h3>
          <p>${esc(i.resumo)}</p>
          <div class="ckx-meta">${meta}</div>
          ${barra}
          <div class="ckx-acoes">
            <button type="button" class="ckx-btn" data-abrir="${esc(i.arquivo)}">${icones.abrir}<span>${pct ? 'Continuar' : 'Abrir'}</span></button>
            <a class="ckx-btn ckx-btn--sec ckx-btn--icone" href="${urlBaixar(i)}" download="${esc(i.arquivo.split('/').pop())}" aria-label="Baixar ${esc(i.titulo)}" title="Baixar HTML">${icones.baixar}</a>
          </div>
        </article>`;
    }

    function renderGrade() {
      const termo = norm(busca.trim());
      const visiveis = itens.filter((i) => (filtro === 'todos' || i.grupo === filtro) && norm(`${i.area} ${i.titulo} ${i.resumo}`).includes(termo));
      $('[data-contagem]').textContent = `${visiveis.length} ${visiveis.length === 1 ? 'checklist' : 'checklists'}`;
      if (!visiveis.length) { grade.innerHTML = '<p class="ckx-vazio">Nenhum checklist corresponde à busca. Tente outro termo.</p>'; return; }
      let n = 0;
      grade.innerHTML = grupos.map((g) => {
        const doGrupo = visiveis.filter((i) => i.grupo === g.id);
        if (!doGrupo.length) return '';
        return `<section class="ckx-grupo"><h2>${esc(g.nome)}<small>${esc(g.desc)}</small></h2><div class="ckx-cards">${doGrupo.map((i) => card(i, n++)).join('')}</div></section>`;
      }).join('');
    }

    function abrir(arquivo) {
      const i = itens.find((x) => x.arquivo === arquivo);
      if (!i) return;
      aberto = i;
      rolagem = scrollY;
      $('[data-visor-titulo]').textContent = i.titulo;
      $('[data-visor-nova]').href = urlAbrir(i);
      $('[data-visor-baixar]').href = urlBaixar(i);
      $('[data-visor-baixar]').setAttribute('download', i.arquivo.split('/').pop());
      frame.style.height = '';
      $('[data-ir]').hidden = true;
      frame.src = urlAbrir(i);
      lista.hidden = true;
      visor.hidden = false;
      scrollTo({ top: 0 });
    }

    function fechar() {
      if (!aberto) return;
      const arquivo = aberto.arquivo;
      aberto = null;
      frame.removeAttribute('src');
      secoes = [];
      $('[data-sinc]').textContent = '';
      visor.hidden = true;
      lista.hidden = false;
      renderGrade();
      scrollTo({ top: rolagem });
      raiz.querySelector(`[data-abrir="${CSS.escape(arquivo)}"]`)?.focus({ preventScroll: true });
      // O checklist acabou de salvar na conta: atualiza as barras de progresso dos cartões.
      carregarProgresso().then(() => { if (!aberto) renderGrade(); });
    }

    /* Mensagens do checklist embutido: altura (sem rolagem interna), seções e avisos. */
    let tAviso;
    const avisar = (msg) => {
      const el = $('[data-aviso]');
      el.textContent = msg; el.classList.add('on');
      clearTimeout(tAviso); tAviso = setTimeout(() => el.classList.remove('on'), 2600);
    };
    window.addEventListener('message', (e) => {
      if (e.origin !== location.origin || e.source !== frame.contentWindow || !e.data?.ffChecklist) return;
      if (e.data.altura) frame.style.height = `${e.data.altura}px`;
      if (e.data.secoes) {
        secoes = e.data.secoes;
        const sel = $('[data-ir-select]');
        sel.innerHTML = '<option value="">Ir para…</option>' + secoes.map((s, n) => `<option value="${n}">${esc(s.rotulo)}</option>`).join('');
        $('[data-ir]').hidden = !secoes.length;
      }
      if (e.data.aviso) avisar(e.data.aviso);
      if (e.data.sinc) {
        const el = $('[data-sinc]');
        el.textContent = e.data.sinc.texto;
        el.dataset.estado = e.data.sinc.estado;
      }
      if (e.data.imagem && /^\/api\/checklists-anexos\?id=\d+$/.test(e.data.imagem.src)) {
        const dlg = $('[data-imagem]');
        $('[data-imagem-img]').src = e.data.imagem.src;
        $('[data-imagem-img]').alt = e.data.imagem.nome || 'Imagem anexada';
        $('[data-imagem-abrir]').href = e.data.imagem.src;
        dlg.showModal?.();
      }
    });
    $('[data-imagem]').addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });
    $('[data-ir-select]').addEventListener('change', (e) => {
      const s = secoes[Number(e.target.value)];
      e.target.value = '';
      if (!s) return;
      const topoFrame = frame.getBoundingClientRect().top + scrollY;
      scrollTo({ top: topoFrame + s.top - 150, behavior: 'smooth' });
    });

    raiz.addEventListener('click', (e) => {
      const ac = e.target.closest('[data-acao]');
      if (ac) { frame.contentWindow?.postMessage({ ffAcao: ac.dataset.acao }, location.origin); return; }
      const f = e.target.closest('[data-filtro]');
      if (f) { filtro = f.dataset.filtro; renderFiltros(); renderGrade(); return; }
      const a = e.target.closest('[data-abrir]');
      if (a) { abrir(a.dataset.abrir); return; }
      if (e.target.closest('[data-voltar]')) fechar();
    });
    $('[data-busca]').addEventListener('input', (e) => { busca = e.target.value; renderGrade(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && aberto && !painel.hidden) fechar(); });
    document.addEventListener('ff:aba', (e) => { if (e.detail?.aba === 'checklist' && !aberto) renderGrade(); });

    renderFiltros();
    renderGrade();
  }
})();
