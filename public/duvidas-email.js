/* Registra as dúvidas no sistema e abre um rascunho de aviso no cliente de e-mail padrão. */
(() => {
  const botoes = [...document.querySelectorAll('[data-enviar-duvidas]')];
  if (!botoes.length) return;

  async function chamar(url, method = 'GET') {
    const resposta = await fetch(url, { method, cache: 'no-store', credentials: 'same-origin' });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível preparar o e-mail.');
    return dados;
  }

  function montarCorpo(duvidas, autor) {
    const linhas = [
      'Olá,', '',
      'Novas dúvidas foram registradas no Modo Estudo da Apostila do Consultor.',
      'O atendimento e a resposta acontecem dentro do sistema.', '',
      `Usuário: ${autor}`,
      `Novas dúvidas: ${duvidas.length}`,
      `Acesse: ${location.origin}/`,
      'No cabeçalho, abra “Dúvidas recebidas” para assumir e responder.', '',
    ];
    duvidas.forEach((duvida, indice) => {
      linhas.push(
        `${indice + 1}. Página ${duvida.pagina || 'não identificada'} — ${duvida.secao || 'Apostila'}`,
      );
    });
    linhas.push('', 'Este e-mail é apenas um aviso. Responda pelo sistema para que a resposta apareça na apostila do usuário.');
    return linhas.join('\r\n');
  }

  for (const botao of botoes) botao.addEventListener('click', async () => {
    const textoOriginal = botao.querySelector('span')?.textContent || botao.textContent;
    let enviadas = 0;
    botao.disabled = true;
    if (botao.querySelector('span')) botao.querySelector('span').textContent = 'Preparando…';
    else botao.textContent = 'Preparando…';
    try {
      const envio = await chamar('/api/duvidas?acao=enviar', 'POST');
      if (!envio.enviadas.length) throw new Error('Não há novas dúvidas para enviar. As dúvidas anteriores continuam disponíveis no sistema.');
      enviadas = envio.enviadas.length;
      window.dispatchEvent(new CustomEvent('ff:duvidas-enviadas'));
      const configuracoes = await chamar('/api/configuracoes-estudo');
      if (!configuracoes.destinatarios.length) throw new Error(`${envio.enviadas.length} dúvida(s) salva(s) no sistema. Configure os destinatários para abrir o aviso por e-mail.`);
      const assunto = `Novas dúvidas da Apostila — ${envio.autor}`;
      const corpo = montarCorpo(envio.enviadas, envio.autor);
      const destino = `mailto:${configuracoes.destinatarios.join(',')}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      window.top.location.href = destino;
    } catch (erro) { window.alert(enviadas && !erro.message.includes('salva(s) no sistema') ? `${enviadas} dúvida(s) salva(s) no sistema. O aviso por e-mail não pôde ser aberto: ${erro.message}` : erro.message); }
    finally {
      botao.disabled = false;
      if (botao.querySelector('span')) botao.querySelector('span').textContent = textoOriginal;
      else botao.textContent = textoOriginal;
    }
  });
})();
