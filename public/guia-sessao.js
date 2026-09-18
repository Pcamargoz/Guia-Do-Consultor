/* Faktory Flow — Sessão do usuário no Guia.
   Busca o usuário logado (/api/auth/eu), mostra nome e perfil no cabeçalho,
   agrupa Usuários, Dúvidas recebidas, Configurações e Sair num menu no avatar.
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
    const icone = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${d}</svg>`;
    const itens = [
      usuario.permissoes.includes('gerenciar_usuarios') && { acao: 'usuarios', rotulo: 'Usuários', dica: 'Contas e perfis de acesso', d: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
      usuario.permissoes.includes('editar') && { acao: 'duvidas', rotulo: 'Dúvidas recebidas', dica: 'Atendimento das dúvidas da apostila', d: '<path d="M4 5h16v11H8l-4 4V5Z"/><path d="M9 9h6M9 12h4"/>' },
      usuario.permissoes.includes('editar') && { acao: 'configuracoes', rotulo: 'Configurações', dica: 'E-mail de suporte e preferências', d: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1.2 1.6V21H10.2v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.6 15 1.7 1.7 0 0 0 3 13.8H3v-3.6h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88L4.2 7.06 7.06 4.2l.06.06A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10.2 3H13.8A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.6 1.2h.1v3.6H21A1.7 1.7 0 0 0 19.4 15Z"/>' },
    ].filter(Boolean);

    // Ações de conta e administração ficam num menu no avatar, deixando o cabeçalho só com as abas.
    const conta = document.createElement('div');
    conta.className = 'ab-conta';
    conta.innerHTML = `
      <button type="button" class="ab-usuario" aria-haspopup="menu" aria-expanded="false" aria-controls="ab-menu-conta" title="${esc(usuario.login)}">
        <span class="ab-avatar" aria-hidden="true">${esc(iniciais(usuario.nome))}</span>
        <span class="ab-usuario-textos">
          <strong>${esc(usuario.nome)}</strong>
          <span class="ab-papel ab-papel--${esc(usuario.papel)}">${esc(usuario.papelNome)}</span>
        </span>
        ${icone('<polyline points="6 9 12 15 18 9"/>').replace('<svg', '<svg class="ab-seta"')}
      </button>
      <div class="ab-menu" id="ab-menu-conta" role="menu" aria-label="Conta" hidden>
        <div class="ab-menu-cabeca"><strong>${esc(usuario.nome)}</strong><small>${esc(usuario.login)}</small></div>
        ${itens.map((i) => `<button type="button" role="menuitem" data-acao="${i.acao}">${icone(i.d)}<span>${i.rotulo}<small>${i.dica}</small></span></button>`).join('')}
        ${itens.length ? '<hr>' : ''}
        <button type="button" role="menuitem" class="ab-sair" data-acao="sair">${icone('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>')}<span>Sair do sistema</span></button>
      </div>`;
    topo.appendChild(conta);

    const gatilho = conta.querySelector('.ab-usuario');
    const menu = conta.querySelector('.ab-menu');
    const opcoes = () => [...menu.querySelectorAll('[role="menuitem"]')];
    const abrir = (foco = false) => {
      menu.hidden = false; gatilho.setAttribute('aria-expanded', 'true');
      if (foco) opcoes()[0]?.focus();
    };
    const fechar = (devolverFoco = false) => {
      if (menu.hidden) return;
      menu.hidden = true; gatilho.setAttribute('aria-expanded', 'false');
      if (devolverFoco) gatilho.focus();
    };
    gatilho.addEventListener('click', () => (menu.hidden ? abrir() : fechar()));
    gatilho.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(true); }
    });
    menu.addEventListener('keydown', (e) => {
      const lista = opcoes();
      const i = lista.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); fechar(true); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); lista[(i + 1) % lista.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); lista[(i - 1 + lista.length) % lista.length].focus(); }
      else if (e.key === 'Tab') fechar();
    });
    document.addEventListener('click', (e) => { if (!conta.contains(e.target)) fechar(); });

    menu.addEventListener('click', async (e) => {
      const botao = e.target.closest('[data-acao]');
      const acao = botao?.dataset.acao;
      if (!acao) return;
      if (acao !== 'sair') fechar();
      if (acao === 'usuarios') document.dispatchEvent(new CustomEvent('ff:abrir-usuarios'));
      if (acao === 'configuracoes') document.dispatchEvent(new CustomEvent('ff:abrir-configuracoes'));
      if (acao === 'duvidas') document.dispatchEvent(new CustomEvent('ff:abrir-duvidas'));
      if (acao === 'sair') {
        botao.disabled = true;
        botao.querySelector('span').textContent = 'Saindo…';
        await fetch('/api/auth/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }).catch(() => {});
        location.replace('/login');
      }
    });
  });
})();
