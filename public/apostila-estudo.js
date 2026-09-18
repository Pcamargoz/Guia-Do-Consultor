/* Modo Estudo da apostila. O conteúdo impresso permanece intacto; o estado pessoal vive na API.
   Disponível somente com a apostila aberta na própria aba (dentro do Guia ela é apenas leitura).
   Ferramentas na paleta lateral: Selecionar, Grifar (4 cores), Anotar, Comentar/Dúvida, Favoritar e Borracha.
   Com uma ferramenta ativa, basta selecionar o texto: a ação é aplicada ao soltar o mouse. */
(() => {
  if (new URLSearchParams(location.search).has('pdf')) return;
  let embutida = false;
  try { embutida = window.self !== window.top; } catch { embutida = true; }
  if (embutida) return; // dentro do Guia: somente leitura

  const paginas = [...document.querySelectorAll('.page')];
  const alternar = document.querySelector('[data-estudo-alternar]');
  if (!paginas.length || !alternar) return;

  const URL_ESTUDO = '/api/estudo?documento=apostila';
  const CORES = { amarelo: '#F5C518', verde: '#3FA34D', azul: '#2F8FD8', rosa: '#E0569B' };
  const cores = Object.keys(CORES);
  const nomes = { grifo: 'Grifo', nota: 'Anotação', comentario: 'Comentário', favorito: 'Favorito' };
  const estado = {
    marcacoes: [], itens: [], duvidas: [], progresso: {}, ativo: false, selecao: null, editor: null,
    pagina: 0, bloco: 0, salvando: Promise.resolve(), ferramenta: 'selecionar',
    cor: (() => { try { return cores.includes(localStorage.getItem('ff-estudo-cor')) ? localStorage.getItem('ff-estudo-cor') : 'amarelo'; } catch { return 'amarelo'; } })(),
  };
  const itensDom = new Map();
  const paginasLidas = new Set();
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const resumo = (s, n = 120) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);
  const svg = (d, t = 18) => `<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    selecionar: '<path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/>',
    grifo: '<path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>',
    nota: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    comentario: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    favorito: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    borracha: '<path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l10-10a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4L13 19"/><path d="M22 21H7"/><path d="m5 11 9 9"/>',
    painel: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h7M9 11h5"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    livro: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  };
  const FERRAMENTAS = [
    { id: 'selecionar', nome: 'Selecionar', dica: 'Selecione o texto e escolha a ação no menu', atalho: 'Esc' },
    { id: 'grifo', nome: 'Grifar', dica: 'Selecione o texto para grifar', atalho: 'G' },
    { id: 'nota', nome: 'Anotar', dica: 'Selecione o texto para criar uma anotação', atalho: 'A' },
    { id: 'comentario', nome: 'Comentar', dica: 'Selecione o texto para comentar ou registrar uma dúvida', atalho: 'C' },
    { id: 'favorito', nome: 'Favoritar', dica: 'Selecione o texto para favoritar', atalho: 'F' },
    { id: 'borracha', nome: 'Borracha', dica: 'Clique em um grifo ou marcação para removê-lo', atalho: 'E' },
  ];

  // Cursor personalizado de cada ferramenta (o marca-texto usa a cor escolhida).
  const cursorSvg = (d, cor, preenchimento = 'none') => {
    const svgCursor = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="${preenchimento}" stroke="${cor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><g stroke="#fff" stroke-width="4.4">${d}</g>${d}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svgCursor)}") 3 24, crosshair`;
  };

  async function api(metodo, sufixo = '', corpo) {
    const resposta = await fetch(URL_ESTUDO + sufixo, {
      method: metodo, credentials: 'same-origin', cache: 'no-store',
      headers: corpo ? { 'Content-Type': 'application/json' } : {},
      body: corpo ? JSON.stringify(corpo) : undefined,
    });
    if (resposta.status === 401) {
      location.replace(`/login?voltar=${encodeURIComponent(location.pathname)}`);
      throw new Error('Sessão encerrada. Entre novamente no sistema.');
    }
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível salvar.');
    return dados;
  }

  /* ---------- Interface ---------- */
  const interfaceEstudo = document.createElement('div');
  interfaceEstudo.className = 'estudo-ui no-print';
  interfaceEstudo.innerHTML = `
    <div class="estudo-menu" hidden role="toolbar" aria-label="Ações para o texto selecionado">
      ${cores.map((c) => `<button type="button" class="estudo-menu-cor" data-marcar="grifo" data-cor="${c}" title="Grifar em ${c}" aria-label="Grifar em ${c}"><span style="background:${CORES[c]}"></span></button>`).join('')}
      <span class="estudo-menu-sep" aria-hidden="true"></span>
      <button type="button" data-marcar="nota">${svg(I.nota, 14)}Anotar</button>
      <button type="button" data-marcar="comentario">${svg(I.comentario, 14)}Comentar</button>
      <button type="button" data-marcar="favorito">${svg(I.favorito, 14)}Favoritar</button>
    </div>

    <nav class="estudo-paleta" aria-label="Ferramentas de estudo" hidden>
      <div class="estudo-paleta-grupo" role="radiogroup" aria-label="Ferramenta">
        ${FERRAMENTAS.map((f) => `<button type="button" class="estudo-ferramenta" role="radio" aria-checked="${f.id === 'selecionar'}" data-ferramenta="${f.id}" aria-label="${f.nome} (${f.atalho})">${svg(I[f.id])}<span class="estudo-dica"><strong>${f.nome}</strong> · ${f.atalho}<small>${f.dica}</small></span></button>`).join('')}
      </div>
      <div class="estudo-cores" role="radiogroup" aria-label="Cor do grifo" hidden>
        ${cores.map((c) => `<button type="button" class="estudo-cor" role="radio" aria-checked="${c === estado.cor}" data-cor="${c}" aria-label="${c[0].toUpperCase()}${c.slice(1)}" title="${c[0].toUpperCase()}${c.slice(1)}" style="--cor:${CORES[c]}"></button>`).join('')}
      </div>
      <span class="estudo-paleta-sep" aria-hidden="true"></span>
      <button type="button" class="estudo-ferramenta estudo-abrir-painel" aria-expanded="false" aria-label="Minhas Anotações">${svg(I.painel)}<span class="estudo-badge" data-contagem hidden></span><span class="estudo-dica"><strong>Minhas Anotações</strong><small data-respostas>Grifos, anotações, checklist e progresso</small></span></button>
      <div class="estudo-anel" data-anel title="Progresso da apostila" role="img" aria-label="Progresso da apostila: 0%"><span data-progresso-mini>0%</span></div>
      <button type="button" class="estudo-ferramenta" data-enviar-duvidas aria-label="Enviar dúvidas">${svg(I.email)}<span class="estudo-dica"><strong>Enviar dúvidas</strong><small>Encaminha suas dúvidas para atendimento</small></span></button>
    </nav>

    <div class="estudo-toast" role="status" aria-live="polite" hidden></div>

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
  const paleta = interfaceEstudo.querySelector('.estudo-paleta');
  const painel = interfaceEstudo.querySelector('.estudo-painel');
  const editor = interfaceEstudo.querySelector('.estudo-editor');
  const lista = interfaceEstudo.querySelector('.estudo-lista');
  const aviso = interfaceEstudo.querySelector('.estudo-aviso');
  const toast = interfaceEstudo.querySelector('.estudo-toast');
  const botaoPainel = interfaceEstudo.querySelector('.estudo-abrir-painel');
  const secaoPagina = paginas.map((pagina, i) => resumo(pagina.querySelector('.titulo-pagina h1, h1, h2')?.textContent, 100) || `Página ${i + 1}`);

  let temporizadorToast;
  function informar(mensagem) {
    aviso.textContent = mensagem;
    if (!mensagem) return;
    toast.textContent = mensagem;
    toast.hidden = false;
    clearTimeout(temporizadorToast);
    temporizadorToast = setTimeout(() => { toast.hidden = true; }, 3200);
  }
  function abrirPainel() { painel.hidden = false; botaoPainel.setAttribute('aria-expanded', 'true'); }
  function fecharPainel() { painel.hidden = true; botaoPainel.setAttribute('aria-expanded', 'false'); }

  /* ---------- Âncoras de texto ---------- */
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
  /** Posição (página + deslocamento no texto) do ponto clicado — usada pela borracha. */
  function posicaoNoPonto(x, y) {
    const caret = document.caretPositionFromPoint?.(x, y);
    const no = caret ? caret.offsetNode : document.caretRangeFromPoint?.(x, y)?.startContainer;
    const offset = caret ? caret.offset : document.caretRangeFromPoint?.(x, y)?.startOffset;
    const pagina = no?.parentElement?.closest?.('.page') || no?.closest?.('.page');
    if (!pagina || no.nodeType !== Node.TEXT_NODE) return null;
    return { indice: paginas.indexOf(pagina), deslocamento: deslocamento(nosTexto(pagina), no, offset) };
  }

  function desenharMarcacoes() {
    if (!window.CSS?.highlights || !window.Highlight) return;
    for (const cor of cores) CSS.highlights.delete(`estudo-${cor}`);
    CSS.highlights.delete('estudo-outros');
    CSS.highlights.delete('estudo-favorito');
    if (!estado.ativo) return;
    const grupos = Object.fromEntries([...cores, 'outros', 'favorito'].map((cor) => [cor, []]));
    for (const marcacao of estado.marcacoes) {
      const range = rangeDaAncora(marcacao.ancora);
      if (!range) continue;
      const grupo = marcacao.tipo === 'grifo' ? marcacao.cor : marcacao.tipo === 'favorito' ? 'favorito' : 'outros';
      grupos[grupo].push(range);
    }
    for (const [grupo, ranges] of Object.entries(grupos)) if (ranges.length) CSS.highlights.set(`estudo-${grupo}`, new Highlight(...ranges));
  }

  /* ---------- Progresso e painel ---------- */
  function atualizarProgresso() {
    const concluidos = estado.itens.filter((item) => item.concluido).length;
    const total = itensDom.size;
    const percentual = total ? Math.round((concluidos / total) * 100) : Math.round((paginasLidas.size / paginas.length) * 100);
    interfaceEstudo.querySelector('progress').value = percentual;
    interfaceEstudo.querySelector('[data-progresso]').textContent = `${percentual}%`;
    interfaceEstudo.querySelector('[data-progresso-mini]').textContent = `${percentual}%`;
    const anel = interfaceEstudo.querySelector('[data-anel]');
    anel.style.setProperty('--progresso', `${percentual * 3.6}deg`);
    anel.setAttribute('aria-label', `Progresso da apostila: ${percentual}% · ${concluidos} de ${total} itens`);
    anel.title = `Progresso: ${percentual}% · ${concluidos} de ${total} itens da checklist · ${paginasLidas.size} de ${paginas.length} páginas vistas`;
    interfaceEstudo.querySelector('[data-itens-resumo]').textContent = `${concluidos} de ${total} itens concluídos · ${paginasLidas.size} de ${paginas.length} páginas vistas`;
    const contagem = interfaceEstudo.querySelector('[data-contagem]');
    contagem.textContent = estado.marcacoes.length;
    contagem.hidden = !estado.marcacoes.length;
    const respondidas = estado.duvidas.filter((d) => d.status === 'respondida').length;
    interfaceEstudo.querySelector('[data-respostas]').textContent = respondidas
      ? `${respondidas} dúvida${respondidas === 1 ? '' : 's'} respondida${respondidas === 1 ? '' : 's'}`
      : 'Grifos, anotações, checklist e progresso';
    botaoPainel.classList.toggle('estudo-ferramenta--aviso', respondidas > 0);
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
        const classeCor = marcacao.tipo === 'grifo' ? marcacao.cor : marcacao.tipo;
        linha.innerHTML = `<span class="estudo-tipo estudo-tipo--${esc(classeCor)}">${marcacao.tipo === 'comentario' && marcacao.rotulo === 'duvida' ? 'Dúvida' : nomes[marcacao.tipo] || 'Marcação'}</span>
          <button type="button" data-ir="${esc(marcacao.id)}"></button><p></p>
          ${duvida ? `<div class="estudo-resposta"><strong>${duvida.status === 'respondida' ? 'Respondida' : duvida.padrinho ? 'Em atendimento' : 'Aguardando atendimento'}</strong>${duvida.padrinho ? `<small> por ${esc(duvida.padrinho)}</small>` : ''}${duvida.resposta ? `<p>${esc(duvida.resposta)}</p>` : ''}</div>` : marcacao.rotulo === 'duvida' ? '<small class="estudo-rascunho">Rascunho · use “Enviar dúvidas” na paleta para encaminhar</small>' : ''}
          ${duvida ? '' : `<div><button type="button" data-editar="${esc(marcacao.id)}">Editar</button><button type="button" data-excluir="${esc(marcacao.id)}">Excluir</button></div>`}`;
        linha.querySelector('[data-ir]').textContent = resumo(marcacao.trecho) || `Página ${marcacao.pagina}`;
        linha.querySelector('p').textContent = marcacao.texto || '';
        lista.append(linha);
      }
    }
    const checklist = document.createElement('h3'); checklist.textContent = 'Checklist da Apostila'; lista.append(checklist);
    const concluidos = estado.itens.filter((item) => item.concluido).length;
    const resumoChecklist = document.createElement('p'); resumoChecklist.className = 'estudo-checklist-resumo';
    resumoChecklist.textContent = `${concluidos} de ${itensDom.size} itens concluídos`;
    lista.append(resumoChecklist);
    const marcados = [...itensDom].filter(([chave]) => estado.itens.some((item) => item.chave === chave && (item.concluido || item.observacao)));
    if (!estado.marcacoes.length && !marcados.length) {
      const vazio = document.createElement('p'); vazio.className = 'estudo-vazio';
      vazio.textContent = 'Escolha uma ferramenta na paleta à direita e selecione um trecho para começar.';
      lista.prepend(vazio);
    }
    for (const [chave, li] of marcados) {
      const item = estado.itens.find((x) => x.chave === chave);
      const linha = document.createElement('div'); linha.className = 'estudo-registro';
      linha.innerHTML = `<button type="button" data-ir-item="${esc(chave)}"></button><p></p><button type="button" data-observar="${esc(chave)}">Observação</button>`;
      linha.querySelector('[data-ir-item]').textContent = `${item.concluido ? '✓ ' : ''}${resumo(item.texto || li.dataset.estudoTexto)}`;
      linha.querySelector('p').textContent = item.observacao || '';
      lista.append(linha);
    }
    atualizarProgresso();
  }

  /* ---------- Checklists ---------- */
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

  /* ---------- Ferramentas ---------- */
  function escolherFerramenta(id) {
    estado.ferramenta = id;
    paleta.querySelectorAll('[data-ferramenta]').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.ferramenta === id)));
    paleta.querySelector('.estudo-cores').hidden = id !== 'grifo';
    for (const f of FERRAMENTAS) document.body.classList.toggle(`estudo-ferramenta-${f.id}`, f.id === id);
    const cursores = {
      grifo: cursorSvg(I.grifo, CORES[estado.cor]),
      nota: cursorSvg(I.nota, '#1C4867'),
      comentario: cursorSvg(I.comentario, '#1C4867'),
      favorito: cursorSvg(I.favorito, '#C99A00', '#F5C518'),
      borracha: cursorSvg(I.borracha, '#B42318'),
    };
    document.body.style.setProperty('--estudo-cursor', cursores[id] || 'auto');
    document.body.style.setProperty('--estudo-cor-atual', CORES[estado.cor]);
    menu.hidden = true;
    const f = FERRAMENTAS.find((x) => x.id === id);
    if (id !== 'selecionar') informar(`${f.nome}: ${f.dica.toLowerCase()}.`);
  }
  function escolherCor(cor) {
    estado.cor = cor;
    try { localStorage.setItem('ff-estudo-cor', cor); } catch { /* sem storage */ }
    paleta.querySelectorAll('.estudo-cor').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.cor === cor)));
    if (estado.ferramenta === 'grifo') escolherFerramenta('grifo');
  }

  async function criarDireto(tipo, selecao, extras = {}) {
    try {
      const { marcacao } = await api('POST', '&acao=marcacao', { tipo, ...selecao, ...extras });
      estado.marcacoes.push(marcacao);
      desenharMarcacoes(); renderLista();
      informar(`${nomes[tipo]} salvo.`);
    } catch (erro) { informar(erro.message); }
  }

  async function excluirMarcacao(registro) {
    try {
      await api('DELETE', `&id=${encodeURIComponent(registro.id)}`);
      estado.marcacoes = estado.marcacoes.filter((x) => x.id !== registro.id);
      desenharMarcacoes(); renderLista();
      informar(`${nomes[registro.tipo] || 'Marcação'} removido.`);
    } catch (erro) { informar(erro.message); }
  }

  /** Com uma ferramenta ativa, a ação acontece ao soltar a seleção. */
  function aplicarFerramenta() {
    const selecao = ancoraSelecao();
    if (!selecao) return;
    const ferramenta = estado.ferramenta;
    estado.selecao = selecao;
    window.getSelection().removeAllRanges();
    if (ferramenta === 'grifo') criarDireto('grifo', selecao, { cor: estado.cor });
    else if (ferramenta === 'favorito') criarDireto('favorito', selecao);
    else if (ferramenta === 'nota' || ferramenta === 'comentario') abrirEditor(ferramenta);
  }

  function apagarNoPonto(x, y) {
    const posicao = posicaoNoPonto(x, y);
    if (!posicao) return;
    const candidatas = estado.marcacoes
      .filter((m) => m.ancora?.bloco === `p${posicao.indice}` && m.ancora.inicio <= posicao.deslocamento && posicao.deslocamento <= m.ancora.fim)
      .filter((m) => !estado.duvidas.some((d) => d.marcacaoId === m.id))
      .sort((a, b) => (a.ancora.fim - a.ancora.inicio) - (b.ancora.fim - b.ancora.inicio));
    if (candidatas.length) excluirMarcacao(candidatas[0]);
    else informar('Nenhuma marcação sua neste ponto.');
  }

  function aplicarModo(ativo) {
    estado.ativo = ativo;
    document.body.classList.toggle('estudo-ativo', ativo);
    alternar.innerHTML = ativo
      ? `${svg(I.livro)}<span>Voltar ao Modo Leitura</span>`
      : `${svg(I.livro)}<span>Ativar Modo Estudo</span>`;
    alternar.setAttribute('aria-pressed', String(ativo));
    alternar.classList.toggle('estudo-ativar--ativo', ativo);
    paleta.classList.toggle('estudo-paleta--repouso', !ativo);
    if (!ativo) { fecharPainel(); menu.hidden = true; editor.hidden = true; escolherFerramenta('selecionar'); }
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
    editor.elements.cor.value = registro?.cor || estado.cor;
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

  /* ---------- Eventos ---------- */
  document.addEventListener('selectionchange', () => {
    if (!estado.ativo || estado.ferramenta !== 'selecionar') return;
    const ancora = ancoraSelecao();
    estado.selecao = ancora;
    if (!ancora) { menu.hidden = true; return; }
    const range = window.getSelection().getRangeAt(0).getBoundingClientRect();
    menu.hidden = false;
    const largura = menu.offsetWidth || 360;
    menu.style.left = `${Math.max(8, Math.min(innerWidth - largura - 8, range.left + range.width / 2 - largura / 2))}px`;
    menu.style.top = `${range.top > 60 ? range.top - 52 : range.bottom + 10}px`;
  });
  document.addEventListener('pointerup', (e) => {
    if (!estado.ativo || !e.target.closest?.('.page') || e.target.closest('.estudo-controle')) return;
    if (estado.ferramenta === 'borracha') { apagarNoPonto(e.clientX, e.clientY); return; }
    if (estado.ferramenta !== 'selecionar') setTimeout(aplicarFerramenta, 0);
  });
  menu.addEventListener('mousedown', (e) => e.preventDefault());
  menu.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-marcar]');
    const tipo = botao?.dataset.marcar;
    if (!tipo || !estado.selecao) return;
    menu.hidden = true;
    const selecao = estado.selecao;
    window.getSelection().removeAllRanges();
    if (tipo === 'grifo') criarDireto('grifo', selecao, { cor: botao.dataset.cor || estado.cor });
    else if (tipo === 'favorito') criarDireto('favorito', selecao);
    else abrirEditor(tipo);
  });
  function ativarEstudo() {
    if (estado.ativo) return;
    aplicarModo(true);
    salvarProgresso({ modoEstudo: true });
    dispatchEvent(new Event('scroll'));
    carregarMinhasDuvidas();
  }
  paleta.addEventListener('click', (e) => {
    if (e.target.closest('button')) ativarEstudo();
    const ferramenta = e.target.closest('[data-ferramenta]')?.dataset.ferramenta;
    if (ferramenta) { escolherFerramenta(ferramenta === estado.ferramenta && ferramenta !== 'selecionar' ? 'selecionar' : ferramenta); return; }
    const cor = e.target.closest('.estudo-cor')?.dataset.cor;
    if (cor) { escolherCor(cor); return; }
    if (e.target.closest('.estudo-abrir-painel')) { if (painel.hidden) { abrirPainel(); carregarMinhasDuvidas(); } else fecharPainel(); }
  });
  document.addEventListener('keydown', (e) => {
    if (!estado.ativo || e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'Escape') { escolherFerramenta('selecionar'); fecharPainel(); return; }
    const mapa = { g: 'grifo', a: 'nota', c: 'comentario', f: 'favorito', e: 'borracha', v: 'selecionar' };
    const ferramenta = mapa[e.key.toLowerCase()];
    if (ferramenta) { e.preventDefault(); escolherFerramenta(ferramenta); }
  });
  alternar.addEventListener('click', () => {
    aplicarModo(!estado.ativo);
    salvarProgresso({ modoEstudo: estado.ativo });
    if (estado.ativo) { dispatchEvent(new Event('scroll')); carregarMinhasDuvidas(); }
  });
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
        const indice = paginas.indexOf(li.closest('.page'));
        const { item } = await api('PUT', '&acao=item', { chave, concluido: !!antigo?.concluido, observacao: editor.elements.texto.value, texto: li.dataset.estudoTexto, pagina: indice + 1, secao: secaoPagina[indice] });
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
  lista.addEventListener('click', (e) => {
    const botao = e.target.closest('button');
    if (!botao) return;
    const id = botao.dataset.ir || botao.dataset.editar || botao.dataset.excluir;
    const registro = estado.marcacoes.find((x) => x.id === id);
    if (botao.dataset.ir && registro) navegar(registro.pagina, registro.ancora);
    if (botao.dataset.editar && registro) abrirEditor(registro.tipo, registro);
    if (botao.dataset.excluir && registro) excluirMarcacao(registro);
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
      informar(item.concluido ? 'Item concluído.' : 'Item desmarcado.');
    } catch (erro) { e.target.checked = !!antigo?.concluido; informar(erro.message); }
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
      paleta.hidden = false;
      const continuar = interfaceEstudo.querySelector('.estudo-continuar');
      if (dados.progresso.ultimaPagina > 1) {
        continuar.hidden = false; continuar.textContent = `Continuar da página ${dados.progresso.ultimaPagina}`;
      }
      if (!window.CSS?.highlights || !window.Highlight) informar('Este navegador não oferece suporte a grifos. Use uma versão atual do Chrome ou Edge.');
    } catch (erro) {
      alternar.hidden = false; alternar.disabled = true;
      alternar.innerHTML = `${svg(I.livro)}<span>Modo Estudo indisponível</span>`;
      alternar.title = erro.message; informar(erro.message);
    }
  }
  escolherFerramenta('selecionar');
  iniciar();
  addEventListener('ff:duvidas-enviadas', carregarMinhasDuvidas);
  addEventListener('focus', carregarMinhasDuvidas);
  setInterval(() => { if (estado.ativo && !document.hidden) carregarMinhasDuvidas(); }, 30000);
})();
