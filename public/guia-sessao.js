/* Faktory Flow — Sessão do usuário no Guia.
   Busca o usuário logado (/api/auth/eu), mostra nome e perfil no cabeçalho,
   oferece "Sair" e, para administradores, o botão "Usuários".
   Expõe window.ffSessao (Promise com o usuário ou null se a API estiver indisponível). */
(() => {
  const irParaLogin = () => {
    const voltar = location.pathname + location.search + location.hash;
    location.replace(`/login?voltar=${encodeURIComponent(voltar)}`);
    return new Promise(() => {}); // interrompe o fluxo até a navegação
  };

  window.ffIrParaLogin = irParaLogin;
  window.ffSessao = fetch('/api/auth/eu', { cache: 'no-store' })
    .then(async (res) => {
      if (res.status === 401) return irParaLogin();
      if (!res.ok) throw new Error(String(res.status));
      return (await res.json()).usuario;
    })
    .catch(() => null);

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const iniciais = (nome) => nome.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';

  window.ffSessao.then((usuario) => {
    const topo = document.querySelector('.ab-topo');
    if (!topo || !usuario) return;
    const conta = document.createElement('div');
    conta.className = 'ab-conta';
    conta.innerHTML = `
      ${usuario.permissoes.includes('gerenciar_usuarios') ? `
        <button type="button" class="ab-btn ab-btn--sec" data-acao="usuarios">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>Usuários</span>
        </button>` : ''}
      <div class="ab-usuario" title="${esc(usuario.login)}">
        <span class="ab-avatar" aria-hidden="true">${esc(iniciais(usuario.nome))}</span>
        <span class="ab-usuario-textos">
          <strong>${esc(usuario.nome)}</strong>
          <span class="ab-papel ab-papel--${esc(usuario.papel)}">${esc(usuario.papelNome)}</span>
        </span>
      </div>
      <button type="button" class="ab-btn ab-btn--sec ab-sair" data-acao="sair" aria-label="Sair do sistema">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Sair</span>
      </button>`;
    topo.appendChild(conta);

    conta.addEventListener('click', async (e) => {
      const acao = e.target.closest('[data-acao]')?.dataset.acao;
      if (acao === 'usuarios') document.dispatchEvent(new CustomEvent('ff:abrir-usuarios'));
      if (acao === 'sair') {
        e.target.closest('button').disabled = true;
        await fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }).catch(() => {});
        location.replace('/login');
      }
    });
  });
})();
