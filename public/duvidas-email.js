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
    const resumir = (valor, limite = 420) => {
      const texto = String(valor || '').replace(/\s+/g, ' ').trim();
      return texto.length > limite ? `${texto.slice(0, limite - 1)}…` : texto;
    };
    const plural = duvidas.length === 1 ? 'dúvida' : 'dúvidas';
    const linhas = [
      'FAKTORY FLOW  |  APOSTILA DO CONSULTOR',
      '========================================', '',
      `Olá, equipe. ${autor} enviou ${duvidas.length} nova${duvidas.length === 1 ? '' : 's'} ${plural} pelo Modo Estudo.`,
      'As perguntas já estão salvas no sistema e aguardam atendimento.', '',
      'RESUMO DO ENVIO',
      `Usuário: ${autor}`,
      `Quantidade: ${duvidas.length}`,
      `Data: ${new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date())}`, '',
    ];
    duvidas.forEach((duvida, indice) => {
      const link = `${location.origin}/?duvida=${encodeURIComponent(duvida.id)}`;
      linhas.push(
        `DÚVIDA ${String(indice + 1).padStart(2, '0')}`,
        '----------------------------------------',
        `Seção: ${duvida.secao || 'Apostila'}`,
        `Página: ${duvida.pagina || 'não identificada'}`,
        duvida.texto ? `Pergunta: ${resumir(duvida.texto)}` : 'Pergunta registrada na apostila.',
        duvida.trecho ? `Trecho de referência: “${resumir(duvida.trecho, 260)}”` : '',
        '',
        'ABRIR, ASSUMIR E RESPONDER',
        link,
        '',
      );
    });
    linhas.push(
      '========================================',
      'Este e-mail funciona como aviso. Publique a resposta pelo link acima para que ela apareça automaticamente na apostila do usuário.',
      '', 'Faktory Flow',
    );
    return linhas.filter((linha, indice, todas) => linha !== '' || todas[indice - 1] !== '').join('\r\n');
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
      const assunto = `[Apostila] ${envio.enviadas.length} nova${envio.enviadas.length === 1 ? ' dúvida' : 's dúvidas'} — ${envio.autor}`;
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
