/* Configurações do sistema: destinatários das dúvidas e, para administradores,
   a limpeza das movimentações (mantém usuários e o conteúdo de módulos e pacotes). */
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
    </form>
    <section class="cfg-limpeza" aria-labelledby="cfg-limpeza-titulo" hidden>
      <h3 id="cfg-limpeza-titulo">Limpar dados do sistema</h3>
      <p>Apaga de uma vez todas as movimentações: Modo Estudo, dúvidas, históricos e marcações de status.
        Os usuários e o conteúdo dos módulos e pacotes continuam como estão.</p>
      <ul class="cfg-limpeza-lista" data-resumo></ul>
      <label for="cfg-confirmacao">Digite <strong>LIMPAR</strong> para confirmar</label>
      <input id="cfg-confirmacao" type="text" autocomplete="off" spellcheck="false" placeholder="LIMPAR">
      <p class="cfg-limpeza-status" role="status" aria-live="polite"></p>
      <button type="button" class="cfg-limpar" data-limpar>Limpar movimentações</button>
    </section>`;
  document.body.append(dialogo);
  const formulario = dialogo.querySelector('form');
  const mensagem = dialogo.querySelector('.cfg-mensagem');
  const botaoSalvar = formulario.querySelector('[type="submit"]');
  const limpeza = dialogo.querySelector('.cfg-limpeza');
  const resumoLista = limpeza.querySelector('[data-resumo]');
  const confirmacao = limpeza.querySelector('#cfg-confirmacao');
  const statusLimpeza = limpeza.querySelector('.cfg-limpeza-status');
  const botaoLimpar = limpeza.querySelector('[data-limpar]');
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  async function api(metodo, corpo, url = '/api/configuracoes-estudo') {
    const resposta = await fetch(url, {
      method: metodo, cache: 'no-store', credentials: 'same-origin',
      headers: corpo ? { 'Content-Type': 'application/json' } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível carregar as configurações.');
    return dados;
  }

  function mostrarResumo(itens) {
    resumoLista.innerHTML = itens.map((i) => `<li><span>${esc(i.rotulo)}</span><strong>${i.total}</strong></li>`).join('');
  }

  /* A limpeza só existe para administradores; a API confere o perfil de novo a cada chamada. */
  async function carregarLimpeza() {
    const usuario = await window.ffSessao;
    limpeza.hidden = !usuario?.permissoes?.includes('gerenciar_usuarios');
    if (limpeza.hidden) return;
    confirmacao.value = '';
    statusLimpeza.textContent = '';
    try { mostrarResumo((await api('GET', null, '/api/manutencao')).resumo.itens); }
    catch { resumoLista.innerHTML = '<li><span>Não foi possível contar as movimentações.</span></li>'; }
  }

  botaoLimpar.addEventListener('click', async () => {
    if (confirmacao.value.trim().toUpperCase() !== 'LIMPAR') {
      statusLimpeza.textContent = 'Digite LIMPAR para confirmar.';
      confirmacao.focus();
      return;
    }
    if (!confirm('Apagar todas as movimentações do sistema? Usuários e conteúdo dos módulos e pacotes são mantidos.')) return;
    botaoLimpar.disabled = true;
    statusLimpeza.textContent = 'Limpando…';
    try {
      const { removidos } = await api('POST', { confirmacao: 'LIMPAR' }, '/api/manutencao');
      mostrarResumo(removidos.itens.map((i) => ({ ...i, total: 0 })));
      confirmacao.value = '';
      statusLimpeza.textContent = `${removidos.total} registro(s) removido(s). Recarregue a página para ver o sistema limpo.`;
    } catch (erro) { statusLimpeza.textContent = erro.message; }
    finally { botaoLimpar.disabled = false; }
  });

  document.addEventListener('ff:abrir-configuracoes', async () => {
    mensagem.textContent = 'Carregando…';
    dialogo.showModal();
    try {
      const dados = await api('GET');
      formulario.elements.emails.value = dados.destinatarios.join('\n');
      mensagem.textContent = '';
      formulario.elements.emails.focus();
    } catch (erro) { mensagem.textContent = erro.message; }
    await carregarLimpeza();
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
