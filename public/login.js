/* Faktory Flow — Tela de login. */
(() => {
  const form = document.querySelector('.lg-form');
  const alerta = form.querySelector('.lg-alerta');
  const botao = form.querySelector('.lg-entrar');
  const cartao = document.querySelector('.lg-cartao');
  const campos = { login: form.elements.login, senha: form.elements.senha };

  // Só aceita destinos internos (evita redirecionamento para outros sites).
  const destino = (() => {
    const voltar = new URLSearchParams(location.search).get('voltar') || '/';
    return voltar.startsWith('/') && !voltar.startsWith('//') && !voltar.startsWith('/\\') && !voltar.startsWith('/login') ? voltar : '/';
  })();

  function mostrarErro(mensagem, campo) {
    alerta.textContent = mensagem;
    alerta.hidden = false;
    Object.values(campos).forEach((c) => c.removeAttribute('aria-invalid'));
    if (campo) { campo.setAttribute('aria-invalid', 'true'); campo.focus(); }
    cartao.classList.remove('lg-erro');
    void cartao.offsetWidth;
    cartao.classList.add('lg-erro');
  }

  form.querySelector('.lg-ver').addEventListener('click', (e) => {
    const visivel = campos.senha.type === 'password';
    campos.senha.type = visivel ? 'text' : 'password';
    e.currentTarget.setAttribute('aria-pressed', String(visivel));
    e.currentTarget.setAttribute('aria-label', visivel ? 'Ocultar senha' : 'Mostrar senha');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = campos.login.value.trim();
    const senha = campos.senha.value;
    if (!login) return mostrarErro('Informe seu login.', campos.login);
    if (!senha) return mostrarErro('Informe sua senha.', campos.senha);

    botao.disabled = true;
    botao.classList.add('carregando');
    botao.querySelector('.lg-entrar-texto').textContent = 'Entrando…';
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
      });
      const dados = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(dados.erro || 'Não foi possível entrar. Tente novamente.');
      alerta.className = 'lg-alerta lg-alerta--ok';
      alerta.textContent = `Bem-vindo(a), ${dados.usuario.nome}!`;
      alerta.hidden = false;
      location.replace(destino);
    } catch (err) {
      alerta.className = 'lg-alerta';
      mostrarErro(err.message === 'Failed to fetch' ? 'Sem conexão com o servidor. Verifique sua internet.' : err.message, campos.senha);
      campos.senha.select();
      botao.disabled = false;
      botao.classList.remove('carregando');
      botao.querySelector('.lg-entrar-texto').textContent = 'Entrar';
    }
  });

  campos.login.focus();
})();
