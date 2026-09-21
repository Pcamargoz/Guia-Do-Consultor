/* Fila de dúvidas: consultores e administradores assumem e respondem dentro do sistema. */
(() => {
  const dialogo = document.createElement('dialog');
  dialogo.className = 'duv-dialogo';
  dialogo.setAttribute('aria-labelledby', 'duv-titulo');
  dialogo.innerHTML = `<div class="duv-topo"><div><h2 id="duv-titulo">Dúvidas recebidas</h2><p>Assuma uma dúvida para responder ao usuário na apostila.</p></div><button type="button" data-fechar aria-label="Fechar">×</button></div>
    <div class="duv-direta" data-duvida-direta hidden><div><strong>Dúvida aberta pelo e-mail</strong><span>Você já está no atendimento indicado no aviso.</span></div><button type="button" data-ver-fila>Ver fila completa</button></div>
    <div class="duv-filtros" role="group" aria-label="Filtrar dúvidas"><button type="button" data-filtro="aberta">Abertas</button><button type="button" data-filtro="respondida">Respondidas</button><button type="button" data-filtro="todas">Todas</button></div>
    <p class="duv-status" role="status" aria-live="polite"></p><div class="duv-lista"></div>`;
  document.body.append(dialogo);
  const lista = dialogo.querySelector('.duv-lista');
  const status = dialogo.querySelector('.duv-status');
  const idInicial = new URLSearchParams(location.search).get('duvida');
  const estado = { duvidas: [], filtro: 'aberta', eu: null, alvo: /^\d+$/.test(idInicial || '') ? idInicial : null };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  async function api(url, method = 'GET', corpo) {
    const resposta = await fetch(url, {
      method, cache: 'no-store', credentials: 'same-origin',
      headers: corpo ? { 'Content-Type': 'application/json' } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível atualizar a fila.');
    return dados;
  }

  function render() {
    const visiveis = estado.duvidas.filter((d) => estado.filtro === 'todas' || d.status === estado.filtro);
    dialogo.querySelector('[data-duvida-direta]').hidden = !estado.alvo;
    dialogo.querySelectorAll('[data-filtro]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === estado.filtro)));
    if (!visiveis.length) { lista.innerHTML = '<p class="duv-vazio">Nenhuma dúvida nesta categoria.</p>'; return; }
    lista.innerHTML = visiveis.map((d) => {
      const minha = d.padrinhoId === String(estado.eu?.id);
      return `<article class="duv-card${d.id === estado.alvo ? ' duv-card--destacada' : ''}" data-duvida="${esc(d.id)}"${d.id === estado.alvo ? ' tabindex="-1"' : ''}>
        <div class="duv-meta"><span class="duv-situacao duv-situacao--${esc(d.status)}">${d.status === 'respondida' ? 'Respondida' : d.padrinhoId ? 'Em atendimento' : 'Aguardando padrinho'}</span><span>Página ${esc(d.pagina || '?')} · ${esc(d.secao || 'Apostila')}</span></div>
        <h3>${esc(d.autor)}</h3>
        ${d.trecho ? `<blockquote>${esc(d.trecho)}</blockquote>` : ''}
        <p class="duv-pergunta">${esc(d.texto)}</p>
        ${d.padrinho ? `<p class="duv-padrinho">Padrinho: ${esc(d.padrinho)}</p>` : ''}
        ${d.status === 'respondida' ? `<div class="duv-resposta"><strong>Resposta</strong><p>${esc(d.resposta)}</p></div>` : `
          <div class="duv-acoes">
            ${!d.padrinhoId && d.autorId !== String(estado.eu?.id) ? '<button type="button" data-assumir>Assumir dúvida</button>' : ''}
            ${minha ? '<button type="button" data-abrir-resposta>Responder</button>' : ''}
            ${(minha || estado.eu?.papel === 'admin') && d.padrinhoId ? '<button type="button" data-liberar>Liberar</button>' : ''}
          </div>
          ${minha ? `<form class="duv-form" hidden><label>Resposta ao usuário<textarea name="resposta" rows="4" maxlength="4000" required></textarea></label><div><button type="button" data-cancelar>Cancelar</button><button type="submit">Publicar resposta</button></div></form>` : ''}`}
      </article>`;
    }).join('');
    if (estado.alvo) requestAnimationFrame(() => {
      const alvo = lista.querySelector(`[data-duvida="${estado.alvo}"]`);
      alvo?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      alvo?.focus({ preventScroll: true });
    });
  }

  async function carregar(mensagem = '') {
    status.textContent = mensagem || 'Carregando dúvidas…';
    try {
      const sufixo = estado.alvo ? `?id=${encodeURIComponent(estado.alvo)}` : '';
      estado.duvidas = (await api(`/api/duvidas${sufixo}`)).duvidas;
      render();
      status.textContent = mensagem || (estado.alvo && !estado.duvidas.length ? 'Esta dúvida não foi encontrada.' : '');
    } catch (erro) { status.textContent = erro.message; }
  }

  async function abrirFilaCompleta(filtro = 'aberta') {
    estado.alvo = null;
    estado.filtro = filtro;
    const url = new URL(location.href); url.searchParams.delete('duvida'); history.replaceState(null, '', url);
    await carregar();
  }

  document.addEventListener('ff:abrir-duvidas', async (evento) => {
    const id = String(evento.detail?.id || '');
    if (/^\d+$/.test(id)) { estado.alvo = id; estado.filtro = 'todas'; }
    estado.eu = await window.ffSessao;
    dialogo.showModal();
    await carregar();
  });
  dialogo.addEventListener('click', async (e) => {
    if (e.target === dialogo || e.target.closest('[data-fechar]')) { dialogo.close(); return; }
    if (e.target.closest('[data-ver-fila]')) { await abrirFilaCompleta(); return; }
    const filtro = e.target.closest('[data-filtro]');
    if (filtro) {
      if (estado.alvo) await abrirFilaCompleta(filtro.dataset.filtro);
      else { estado.filtro = filtro.dataset.filtro; render(); }
      return;
    }
    const card = e.target.closest('[data-duvida]');
    if (!card) return;
    const id = card.dataset.duvida;
    if (e.target.closest('[data-abrir-resposta]')) { card.querySelector('.duv-form').hidden = false; card.querySelector('textarea').focus(); return; }
    if (e.target.closest('[data-cancelar]')) { card.querySelector('.duv-form').hidden = true; return; }
    const acao = e.target.closest('[data-assumir]') ? 'assumir' : e.target.closest('[data-liberar]') ? 'liberar' : null;
    if (!acao) return;
    const botao = e.target.closest('button'); botao.disabled = true;
    try { await api(`/api/duvidas?acao=${acao}&id=${encodeURIComponent(id)}`, 'POST'); await carregar(acao === 'assumir' ? 'Dúvida assumida.' : 'Dúvida liberada.'); }
    catch (erro) { status.textContent = erro.message; botao.disabled = false; }
  });
  dialogo.addEventListener('submit', async (e) => {
    if (!e.target.matches('.duv-form')) return;
    e.preventDefault();
    const id = e.target.closest('[data-duvida]').dataset.duvida;
    const botao = e.target.querySelector('[type="submit"]'); botao.disabled = true;
    try {
      await api(`/api/duvidas?acao=responder&id=${encodeURIComponent(id)}`, 'POST', { resposta: e.target.elements.resposta.value });
      await carregar('Resposta publicada na apostila do usuário.');
    } catch (erro) { status.textContent = erro.message; botao.disabled = false; }
  });
  if (estado.alvo) queueMicrotask(() => document.dispatchEvent(new CustomEvent('ff:abrir-duvidas', { detail: { id: estado.alvo } })));
})();
