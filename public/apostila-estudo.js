/* Modo Estudo da apostila. O conteúdo impresso permanece intacto; o estado pessoal vive na API. */
(() => {
  if (new URLSearchParams(location.search).has('pdf')) return;
  const paginas = [...document.querySelectorAll('.page')];
  const alternar = document.querySelector('[data-estudo-alternar]');
  if (!paginas.length || !alternar) return;

  const URL_ESTUDO = '/api/estudo?documento=apostila';
  const cores = ['amarelo', 'verde', 'azul', 'rosa'];
  const estado = { marcacoes: [], itens: [], duvidas: [], progresso: {}, ativo: false, selecao: null, editor: null, pagina: 0, salvando: Promise.resolve() };
  const itensDom = new Map();
  const paginasLidas = new Set();
  const nomes = { grifo: 'Grifo', nota: 'Anotação', comentario: 'Comentário', favorito: 'Favorito' };
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const resumo = (s, n = 120) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);

  async function api(metodo, sufixo = '', corpo) {
    const resposta = await fetch(URL_ESTUDO + sufixo, {
      method: metodo, credentials: 'same-origin', cache: 'no-store',
      headers: corpo ? { 'Content-Type': 'application/json' } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    if (resposta.status === 401) {
      if (window.self === window.top) location.replace(`/login?voltar=${encodeURIComponent(location.pathname)}`);
      throw new Error('Sessão encerrada. Entre novamente no sistema.');
    }
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível salvar.');
    return dados;
  }

  const interfaceEstudo = document.createElement('div');
  interfaceEstudo.className = 'estudo-ui no-print';
  interfaceEstudo.innerHTML = `
    <div class="estudo-menu" hidden role="toolbar" aria-label="Ferramentas de estudo">
      <button type="button" data-marcar="grifo">Grifar</button>
      <button type="button" data-marcar="nota">Anotar</button>
      <button type="button" data-marcar="comentario">Comentar</button>
      <button type="button" data-marcar="favorito">Favoritar</button>
    </div>
    <button type="button" class="estudo-abrir-painel" aria-expanded="false" hidden>Minhas Anotações <span data-contagem></span><span data-respostas></span></button>
    <aside class="estudo-painel" aria-label="Minhas Anotações" hidden>
      <div class="estudo-painel-topo"><h2>Minhas Anotações</h2><button type="button" data-fechar-painel aria-label="Fechar painel">×</button></div>
      <p class="estudo-aviso" role="status" aria-live="polite"></p>
      <div class="estudo-progresso"><strong>Progresso da Apostila</strong><progress max="100" value="0"></progress><span data-progresso>0%</span><small data-itens-resumo></small></div>
      <button type="button" class="estudo-continuar" hidden>Continuar de onde parei</button>
      <form class="estudo-editor" hidden>
        <h3 data-editor-titulo></h3><p data-editor-trecho></p>
        <label data-cor-label>Cor <select name="cor"><option value="amarelo">Amarelo</option><option value="verde">Verde</option><option value="azul">Azul</option><option value="rosa">Rosa</option></select></label>
        <label data-rotulo-label>Classificar como <select name="rotulo"><option value="comentario">Comentário pessoal</option><option value="duvida">Dúvida para enviar</option></select></label>
        <label data-texto-label>Texto <textarea name="texto" rows="4" maxlength="4000"></textarea></label>
        <div class="estudo-editor-acoes"><button type="button" data-cancelar>Cancelar</button><button type="submit">Salvar</button></div>
      </form>
      <div class="estudo-lista"></div>
    </aside>`;
  document.body.append(interfaceEstudo);
  const menu = interfaceEstudo.querySelector('.estudo-menu');
  const painel = interfaceEstudo.querySelector('.estudo-painel');
  const editor = interfaceEstudo.querySelector('.estudo-editor');
  const lista = interfaceEstudo.querySelector('.estudo-lista');
  const aviso = interfaceEstudo.querySelector('.estudo-aviso');
  const secaoPagina = paginas.map((pagina, i) => resumo(pagina.querySelector('.titulo-pagina h1, h1, h2')?.textContent, 100) || `Página ${i + 1}`);

  function informar(mensagem) { aviso.textContent = mensagem; }
  function abrirPainel() {
    painel.hidden = false;
    interfaceEstudo.querySelector('.estudo-abrir-painel').setAttribute('aria-expanded', 'true');
  }
  function fecharPainel() {
    painel.hidden = true;
    interfaceEstudo.querySelector('.estudo-abrir-painel').setAttribute('aria-expanded', 'false');
  }
  function nosTexto(pagina) {
    const nos = [];
    const walker = document.createTreeWalker(pagina, NodeFilter.SHOW_TEXT, {
      acceptNode(no) {
        return no.parentElement?.closest('.estudo-controle, script, style') || !no.nodeValue
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) nos.push(walker.currentNode);
    return nos;
  }
  function deslocamento(nos, container, offset) {
    let total = 0;
    for (const no of nos) {
      if (no === container) return total + offset;
      if (container.nodeType === Node.ELEMENT_NODE && container.contains(no)) {
        const anterior = document.createRange();
        anterior.setStart(container, 0);
        anterior.setEnd(container, offset);
        if (!anterior.intersectsNode(no)) return total;
      }
      total += no.length;
    }
    return total;
  }
  function ancoraSelecao() {
    const selecao = window.getSelection();
    if (!selecao || selecao.isCollapsed || !selecao.rangeCount) return null;
    const range = selecao.getRangeAt(0);
    const pagina = range.startContainer.parentElement?.closest('.page');
    if (!pagina || pagina !== range.endContainer.parentElement?.closest('.page')) return null;
    const indice = paginas.indexOf(pagina);
    const nos = nosTexto(pagina);
    const inicio = deslocamento(nos, range.startContainer, range.startOffset);
    const fim = deslocamento(nos, range.endContainer, range.endOffset);
    if (fim <= inicio || fim - inicio > 600) return null;
    return { ancora: { bloco: `p${indice}`, inicio, fim }, trecho: resumo(range.toString(), 600), pagina: indice + 1, secao: secaoPagina[indice] };
  }
  function rangeDaAncora(ancora) {
    const indice = Number(String(ancora?.bloco || '').match(/^p(\d+)$/)?.[1]);
    const pagina = paginas[indice];
    if (!pagina) return null;
    const nos = nosTexto(pagina);
    const range = document.createRange();
    let cursor = 0;
    let inicio = false;
    for (const no of nos) {
      const proximo = cursor + no.length;
      if (!inicio && ancora.inicio < proximo) { range.setStart(no, ancora.inicio - cursor); inicio = true; }
      if (inicio && ancora.fim <= proximo) { range.setEnd(no, ancora.fim - cursor); return range; }
      cursor = proximo;
    }
    return null;
  }
  function desenharMarcacoes() {
    if (!window.CSS?.highlights || !window.Highlight) return;
    for (const cor of cores) CSS.highlights.delete(`estudo-${cor}`);
    CSS.highlights.delete('estudo-outros');
    if (!estado.ativo) return;
    const grupos = Object.fromEntries([...cores, 'outros'].map((cor) => [cor, []]));
    for (const marcacao of estado.marcacoes) {
      const range = rangeDaAncora(marcacao.ancora);
      if (range) grupos[marcacao.tipo === 'grifo' ? marcacao.cor : 'outros'].push(range);
    }
    for (const [cor, ranges] of Object.entries(grupos)) if (ranges.length) CSS.highlights.set(`estudo-${cor}`, new Highlight(...ranges));
  }
  function atualizarProgresso() {
    const concluidos = estado.itens.filter((item) => item.concluido).length;
    const total = itensDom.size;
    const percentual = total ? Math.round((concluidos / total) * 100) : Math.round((paginasLidas.size / paginas.length) * 100);
    interfaceEstudo.querySelector('progress').value = percentual;
    interfaceEstudo.querySelector('[data-progresso]').textContent = `${percentual}%`;
    interfaceEstudo.querySelector('[data-itens-resumo]').textContent = `${concluidos} de ${total} itens concluídos · ${paginasLidas.size} de ${paginas.length} páginas vistas`;
    interfaceEstudo.querySelector('[data-contagem]').textContent = estado.marcacoes.length ? `(${estado.marcacoes.length})` : '';
    const respondidas = estado.duvidas.filter((d) => d.status === 'respondida').length;
    interfaceEstudo.querySelector('[data-respostas]').textContent = respondidas ? ` · ${respondidas} resposta${respondidas === 1 ? '' : 's'}` : '';
  }
  async function carregarMinhasDuvidas() {
    try {
      const resposta = await fetch('/api/duvidas?escopo=minhas', { cache: 'no-store', credentials: 'same-origin' });
      if (!resposta.ok) return;
      estado.duvidas = (await resposta.json()).duvidas;
      renderLista();
    } catch { /* estado pessoal permanece disponível mesmo se a fila falhar */ }
  }
  function renderLista() {
    lista.replaceChildren();
    const porSecao = new Map();
    for (const marcacao of estado.marcacoes) {
      const secao = marcacao.secao || `Página ${marcacao.pagina || 1}`;
      if (!porSecao.has(secao)) porSecao.set(secao, []);
      porSecao.get(secao).push(marcacao);
    }
    for (const [secao, marcacoes] of porSecao) {
      const titulo = document.createElement('h3'); titulo.textContent = secao; lista.append(titulo);
      for (const marcacao of marcacoes) {
        const linha = document.createElement('div'); linha.className = 'estudo-registro';
        const duvida = estado.duvidas.find((d) => d.marcacaoId === marcacao.id);
        linha.innerHTML = `<span class="estudo-tipo estudo-tipo--${esc(marcacao.cor)}">${marcacao.tipo === 'comentario' && marcacao.rotulo === 'duvida' ? 'Dúvida' : nomes[marcacao.tipo] || 'Marcação'}</span>
          <button type="button" data-ir="${esc(marcacao.id)}"></button><p></p>
          ${duvida ? `<div class="estudo-resposta"><strong>${duvida.status === 'respondida' ? 'Respondida' : duvida.padrinho ? 'Em atendimento' : 'Aguardando atendimento'}</strong>${duvida.padrinho ? `<small> por ${esc(duvida.padrinho)}</small>` : ''}${duvida.resposta ? `<p>${esc(duvida.resposta)}</p>` : ''}</div>` : marcacao.rotulo === 'duvida' ? '<small class="estudo-rascunho">Rascunho · use “Enviar dúvidas” para encaminhar</small>' : ''}
          ${duvida ? '' : `<div><button type="button" data-editar="${esc(marcacao.id)}">Editar</button><button type="button" data-excluir="${esc(marcacao.id)}">Excluir</button></div>`}`;
        linha.querySelector('[data-ir]').textContent = resumo(marcacao.trecho) || `Página ${marcacao.pagina}`;
        linha.querySelector('p').textContent = marcacao.texto || '';
        lista.append(linha);
      }
    }
    const checklist = document.createElement('h3'); checklist.textContent = 'Checklist da Apostila'; lista.append(checklist);
    const pendentes = [...itensDom].filter(([chave]) => estado.itens.some((item) => item.chave === chave && (item.concluido || item.observacao)));
    if (!estado.marcacoes.length && !pendentes.length) {
      const vazio = document.createElement('p'); vazio.className = 'estudo-vazio'; vazio.textContent = 'Selecione um trecho ou marque um item para começar.'; lista.prepend(vazio);
    }
    for (const [chave, li] of pendentes) {
      const item = estado.itens.find((x) => x.chave === chave);
      const linha = document.createElement('div'); linha.className = 'estudo-registro';
      linha.innerHTML = `<button type="button" data-ir-item="${esc(chave)}"></button><p></p><button type="button" data-observar="${esc(chave)}">Observação</button>`;
      linha.querySelector('[data-ir-item]').textContent = `${item.concluido ? '✓ ' : ''}${resumo(item.texto || li.dataset.estudoTexto)}`;
      linha.querySelector('p').textContent = item.observacao || '';
      lista.append(linha);
    }
    atualizarProgresso();
  }
  function prepararChecklists() {
    paginas.forEach((pagina, i) => {
      pagina.querySelectorAll('.checklist-impresso li').forEach((li, j) => {
        const chave = `p${i}-i${j}`;
        const texto = resumo(li.textContent, 600);
        const controle = document.createElement('span'); controle.className = 'estudo-controle';
        controle.innerHTML = `<input type="checkbox" aria-label="Concluir item: ${esc(texto)}"><button type="button" aria-label="Observação para este item">Anotar</button>`;
        li.prepend(controle);
        li.dataset.estudoItem = chave;
        li.dataset.estudoTexto = texto;
        itensDom.set(chave, li);
      });
    });
  }
  function restaurarChecklists() {
    for (const [chave, li] of itensDom) li.querySelector('input').checked = !!estado.itens.find((item) => item.chave === chave)?.concluido;
  }
  function aplicarModo(ativo) {
    estado.ativo = ativo;
    document.body.classList.toggle('estudo-ativo', ativo);
    alternar.textContent = ativo ? 'Modo Leitura' : 'Ativar Modo Estudo';
    interfaceEstudo.querySelector('.estudo-abrir-painel').hidden = !ativo;
    if (!ativo) { fecharPainel(); menu.hidden = true; editor.hidden = true; }
    desenharMarcacoes();
  }
  function salvarProgresso(dados) {
    estado.salvando = estado.salvando.catch(() => {}).then(async () => {
      const resposta = await api('PUT', '&acao=progresso', dados);
      estado.progresso = resposta.progresso;
    });
    estado.salvando.catch((erro) => informar(erro.message));
  }
  function abrirEditor(tipo, registro = null, chave = null) {
    estado.editor = { tipo, registro, chave, selecao: estado.selecao };
    editor.reset();
    editor.hidden = false;
    abrirPainel();
    const trecho = chave ? itensDom.get(chave)?.dataset.estudoTexto : registro?.trecho || estado.selecao?.trecho;
    editor.querySelector('[data-editor-titulo]').textContent = chave ? 'Observação do item' : `${registro ? 'Editar' : 'Nova'} ${nomes[tipo]?.toLowerCase() || 'anotação'}`;
    editor.querySelector('[data-editor-trecho]').textContent = trecho || '';
    editor.querySelector('[data-cor-label]').hidden = chave || !['grifo'].includes(tipo);
    editor.querySelector('[data-rotulo-label]').hidden = chave || tipo !== 'comentario';
    editor.querySelector('[data-texto-label]').hidden = !chave && !['nota', 'comentario'].includes(tipo);
    editor.elements.cor.value = registro?.cor || 'amarelo';
    editor.elements.rotulo.value = registro?.rotulo || 'comentario';
    editor.elements.texto.value = chave ? estado.itens.find((item) => item.chave === chave)?.observacao || '' : registro?.texto || '';
    if (!editor.querySelector('[data-texto-label]').hidden) editor.elements.texto.focus(); else editor.elements.cor.focus();
  }
  function navegar(pagina, ancora, bloco) {
    const destino = ancora ? rangeDaAncora(ancora) : null;
    const trecho = bloco?.match(/^p(\d+)-b(\d+)$/);
    const elemento = trecho ? paginas[Number(trecho[1])]?.querySelectorAll('p, h1, h2, h3, h4, li')[Number(trecho[2])] : null;
    (destino?.startContainer.parentElement || elemento || paginas[Math.max(0, (pagina || 1) - 1)])?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    fecharPainel();
  }

  document.addEventListener('selectionchange', () => {
    if (!estado.ativo) return;
    const ancora = ancoraSelecao();
    estado.selecao = ancora;
    if (!ancora) { menu.hidden = true; return; }
    const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
    menu.style.left = `${Math.max(8, Math.min(innerWidth - 290, range.left))}px`;
    menu.style.top = `${Math.max(8, range.top - 48)}px`;
    menu.hidden = false;
  });
  menu.addEventListener('mousedown', (e) => e.preventDefault());
  menu.addEventListener('click', async (e) => {
    const tipo = e.target.closest('[data-marcar]')?.dataset.marcar;
    if (!tipo || !estado.selecao) return;
    menu.hidden = true;
    if (tipo === 'favorito') {
      try {
        const { marcacao } = await api('POST', '&acao=marcacao', { tipo, ...estado.selecao });
        estado.marcacoes.push(marcacao); desenharMarcacoes(); renderLista(); informar(`${nomes[tipo]} salvo.`);
      } catch (erro) { informar(erro.message); abrirPainel(); }
    } else abrirEditor(tipo);
  });
  alternar.addEventListener('click', () => {
    aplicarModo(!estado.ativo);
    salvarProgresso({ modoEstudo: estado.ativo });
    if (estado.ativo) { dispatchEvent(new Event('scroll')); carregarMinhasDuvidas(); }
  });
  interfaceEstudo.querySelector('.estudo-abrir-painel').addEventListener('click', () => { if (painel.hidden) { abrirPainel(); carregarMinhasDuvidas(); } else fecharPainel(); });
  interfaceEstudo.querySelector('[data-fechar-painel]').addEventListener('click', fecharPainel);
  interfaceEstudo.querySelector('[data-cancelar]').addEventListener('click', () => { editor.hidden = true; estado.editor = null; });
  interfaceEstudo.querySelector('.estudo-continuar').addEventListener('click', () => navegar(estado.progresso.ultimaPagina, null, estado.progresso.ultimoBloco));
  editor.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { tipo, registro, chave } = estado.editor || {};
    if (!tipo) return;
    try {
      if (chave) {
        const li = itensDom.get(chave);
        const antigo = estado.itens.find((item) => item.chave === chave);
        const { item } = await api('PUT', '&acao=item', { chave, concluido: !!antigo?.concluido, observacao: editor.elements.texto.value, texto: li.dataset.estudoTexto, pagina: paginas.indexOf(li.closest('.page')) + 1, secao: secaoPagina[paginas.indexOf(li.closest('.page'))] });
        estado.itens = [...estado.itens.filter((x) => x.chave !== chave), item];
      } else if (registro) {
        const { marcacao } = await api('PATCH', `&id=${encodeURIComponent(registro.id)}`, { cor: editor.elements.cor.value, texto: editor.elements.texto.value, ...(tipo === 'comentario' ? { rotulo: editor.elements.rotulo.value } : {}) });
        estado.marcacoes = estado.marcacoes.map((x) => x.id === marcacao.id ? marcacao : x);
      } else {
        const { marcacao } = await api('POST', '&acao=marcacao', { tipo, ...estado.editor.selecao, cor: editor.elements.cor.value, texto: editor.elements.texto.value, ...(tipo === 'comentario' ? { rotulo: editor.elements.rotulo.value } : {}) });
        estado.marcacoes.push(marcacao);
      }
      editor.hidden = true; estado.editor = null; desenharMarcacoes(); renderLista(); informar('Salvo automaticamente.');
    } catch (erro) { informar(erro.message); }
  });
  lista.addEventListener('click', async (e) => {
    const botao = e.target.closest('button');
    if (!botao) return;
    const id = botao.dataset.ir || botao.dataset.editar || botao.dataset.excluir;
    const registro = estado.marcacoes.find((x) => x.id === id);
    if (botao.dataset.ir && registro) navegar(registro.pagina, registro.ancora);
    if (botao.dataset.editar && registro) abrirEditor(registro.tipo, registro);
    if (botao.dataset.excluir && registro) {
      try { await api('DELETE', `&id=${encodeURIComponent(id)}`); estado.marcacoes = estado.marcacoes.filter((x) => x.id !== id); desenharMarcacoes(); renderLista(); informar('Marcação excluída.'); }
      catch (erro) { informar(erro.message); }
    }
    if (botao.dataset.irItem) navegar(paginas.indexOf(itensDom.get(botao.dataset.irItem).closest('.page')) + 1);
    if (botao.dataset.observar) abrirEditor('nota', null, botao.dataset.observar);
  });
  document.addEventListener('change', async (e) => {
    const li = e.target.closest?.('[data-estudo-item]');
    if (!li || e.target.type !== 'checkbox') return;
    const chave = li.dataset.estudoItem;
    const indice = paginas.indexOf(li.closest('.page'));
    const antigo = estado.itens.find((item) => item.chave === chave);
    try {
      const { item } = await api('PUT', '&acao=item', { chave, concluido: e.target.checked, observacao: antigo?.observacao || '', texto: li.dataset.estudoTexto, pagina: indice + 1, secao: secaoPagina[indice] });
      estado.itens = [...estado.itens.filter((x) => x.chave !== chave), item]; renderLista();
    } catch (erro) { e.target.checked = !!antigo?.concluido; informar(erro.message); abrirPainel(); }
  });
  document.addEventListener('click', (e) => {
    const li = e.target.closest?.('[data-estudo-item]');
    if (li && e.target.matches('.estudo-controle button')) abrirEditor('nota', null, li.dataset.estudoItem);
  });
  let temporizador;
  addEventListener('scroll', () => {
    if (!estado.ativo) return;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
      let indice = 0;
      for (let i = 0; i < paginas.length; i++) if (paginas[i].getBoundingClientRect().top < innerHeight * .5) indice = i;
      const blocos = [...paginas[indice].querySelectorAll('p, h1, h2, h3, h4, li')];
      let bloco = 0;
      for (let j = 0; j < blocos.length; j++) if (blocos[j].getBoundingClientRect().top < innerHeight * .5) bloco = j;
      if (estado.pagina === indice && estado.bloco === bloco && paginasLidas.has(indice + 1)) return;
      estado.pagina = indice; estado.bloco = bloco; paginasLidas.add(indice + 1);
      salvarProgresso({ ultimaPagina: indice + 1, ultimaSecao: secaoPagina[indice], ultimoBloco: `p${indice}-b${bloco}`, paginasLidas: [...paginasLidas] });
      atualizarProgresso();
    }, 500);
  }, { passive: true });

  async function iniciar() {
    try {
      prepararChecklists();
      const dados = await api('GET');
      estado.marcacoes = dados.marcacoes; estado.itens = dados.itens; estado.progresso = dados.progresso;
      (dados.progresso.paginasLidas || []).forEach((p) => paginasLidas.add(p));
      restaurarChecklists(); renderLista(); aplicarModo(!!dados.progresso.modoEstudo);
      carregarMinhasDuvidas();
      alternar.hidden = false;
      const continuar = interfaceEstudo.querySelector('.estudo-continuar');
      if (dados.progresso.ultimaPagina > 1) {
        continuar.hidden = false; continuar.textContent = `Continuar da página ${dados.progresso.ultimaPagina}`;
      }
      if (!window.CSS?.highlights || !window.Highlight) informar('Este navegador não oferece suporte a grifos. Use uma versão atual do Chrome ou Edge.');
    } catch (erro) { alternar.hidden = false; alternar.disabled = true; alternar.textContent = 'Modo Estudo indisponível'; alternar.title = erro.message; informar(erro.message); }
  }
  iniciar();
  addEventListener('ff:duvidas-enviadas', carregarMinhasDuvidas);
  addEventListener('focus', carregarMinhasDuvidas);
  setInterval(() => { if (estado.ativo && !document.hidden) carregarMinhasDuvidas(); }, 30000);
})();
