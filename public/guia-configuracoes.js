/* Configurações compartilhadas do Modo Estudo: destinatários das dúvidas. */
(() => {
  const dialogo = document.createElement('dialog');
  dialogo.className = 'cfg-dialogo';
  dialogo.setAttribute('aria-labelledby', 'cfg-titulo');
  dialogo.innerHTML = `
    <form class="cfg-form">
      <div class="cfg-topo"><h2 id="cfg-titulo">Configurações do sistema</h2><button type="button" data-fechar aria-label="Fechar">×</button></div>
      <p>Destinatários das dúvidas da apostila</p>
      <label for="cfg-emails">E-mails que receberão as dúvidas</label>
      <textarea id="cfg-emails" name="emails" rows="6" placeholder="email@empresa.com\noutro@empresa.com" spellcheck="false" required></textarea>
      <small>Um endereço por linha. Consultores e administradores podem atualizar esta lista.</small>
      <small>As dúvidas são atendidas no sistema. O botão “Enviar dúvidas” abre apenas um rascunho de aviso no aplicativo de e-mail padrão. Para usar o Outlook, defina-o como padrão no Windows.</small>
      <p class="cfg-mensagem" role="status" aria-live="polite"></p>
      <div class="cfg-acoes"><button type="button" data-fechar>Cancelar</button><button type="submit">Salvar destinatários</button></div>
    </form>`;
  document.body.append(dialogo);
  const formulario = dialogo.querySelector('form');
  const mensagem = dialogo.querySelector('.cfg-mensagem');
  const botaoSalvar = formulario.querySelector('[type="submit"]');

  async function api(metodo, corpo) {
    const resposta = await fetch('/api/configuracoes-estudo', {
      method: metodo, cache: 'no-store', credentials: 'same-origin',
      headers: corpo ? { 'Content-Type': 'application/json' } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível carregar as configurações.');
    return dados;
  }

  document.addEventListener('ff:abrir-configuracoes', async () => {
    mensagem.textContent = 'Carregando…';
    dialogo.showModal();
    try {
      const dados = await api('GET');
      formulario.elements.emails.value = dados.destinatarios.join('\n');
      mensagem.textContent = '';
      formulario.elements.emails.focus();
    } catch (erro) { mensagem.textContent = erro.message; }
  });
  dialogo.addEventListener('click', (e) => { if (e.target === dialogo || e.target.closest('[data-fechar]')) dialogo.close(); });
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const destinatarios = formulario.elements.emails.value.split(/[\n,;]+/).map((x) => x.trim()).filter(Boolean);
    if (!destinatarios.length) { mensagem.textContent = 'Informe ao menos um destinatário.'; return; }
    botaoSalvar.disabled = true;
    mensagem.textContent = 'Salvando…';
    try {
      const dados = await api('PUT', { destinatarios });
      formulario.elements.emails.value = dados.destinatarios.join('\n');
      mensagem.textContent = 'Destinatários salvos.';
    } catch (erro) { mensagem.textContent = erro.message; }
    finally { botaoSalvar.disabled = false; }
  });
})();
