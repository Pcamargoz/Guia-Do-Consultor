/* Abre um rascunho no cliente de e-mail padrão com as dúvidas pessoais da apostila. */
(() => {
  const botoes = [...document.querySelectorAll('[data-enviar-duvidas]')];
  if (!botoes.length) return;

  async function ler(url) {
    const resposta = await fetch(url, { cache: 'no-store', credentials: 'same-origin' });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível preparar o e-mail.');
    return dados;
  }

  function montarCorpo(duvidas, autor) {
    const linhas = [
      'Olá,', '',
      'Segue a relação de dúvidas registradas no Modo Estudo da Apostila do Consultor.', '',
      `Usuário: ${autor}`,
      `Total de dúvidas: ${duvidas.length}`,
      `Apostila: ${location.origin}/apostila`, '',
    ];
    duvidas.forEach((duvida, indice) => {
      linhas.push(
        `${indice + 1}. Página ${duvida.pagina || 'não identificada'} — ${duvida.secao || 'Apostila'}`,
        `Trecho: ${duvida.trecho || 'Sem trecho selecionado'}`,
        `Dúvida: ${duvida.texto}`, '',
      );
    });
    linhas.push('Atenciosamente,', autor);
    return linhas.join('\r\n');
  }

  for (const botao of botoes) botao.addEventListener('click', async () => {
    const textoOriginal = botao.querySelector('span')?.textContent || botao.textContent;
    botao.disabled = true;
    if (botao.querySelector('span')) botao.querySelector('span').textContent = 'Preparando…';
    else botao.textContent = 'Preparando…';
    try {
      const [estudo, configuracoes] = await Promise.all([
        ler('/api/estudo?documento=apostila&acao=duvidas'),
        ler('/api/configuracoes-estudo'),
      ]);
      if (!estudo.duvidas.length) throw new Error('Ainda não há dúvidas marcadas no Modo Estudo.');
      if (!configuracoes.destinatarios.length) throw new Error('Nenhum destinatário foi configurado. Peça a um consultor ou administrador para adicionar os e-mails em Configurações.');
      const assunto = `Dúvidas da Apostila do Consultor — ${estudo.autor}`;
      const corpo = montarCorpo(estudo.duvidas, estudo.autor);
      const destino = `mailto:${configuracoes.destinatarios.join(',')}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      window.top.location.href = destino;
    } catch (erro) { window.alert(erro.message); }
    finally {
      botao.disabled = false;
      if (botao.querySelector('span')) botao.querySelector('span').textContent = textoOriginal;
      else botao.textContent = textoOriginal;
    }
  });
})();
