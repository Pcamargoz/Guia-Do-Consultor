/* Faktory Flow — Editor de módulos do Guia do Consultor.
   CRUD de módulos e de suas listas (etapas, boas práticas, checklist) e marcação
   de status (Rever / Aprovado / Reprovado) com data, compartilhados via /api.
   Substitui renderizarCards, aplicarFiltros, abrirModal e fecharModal do guia;
   sem servidor, o guia continua funcionando em modo leitura com o conteúdo original. */
(() => {
  const API = '/api';
  const STATUS = {
    rever:     { label: 'Rever',     icon: '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 4 3 10 9 10"/>' },
    aprovado:  { label: 'Aprovado',  icon: '<polyline points="20 6 9 17 4 12"/>' },
    reprovado: { label: 'Reprovado', icon: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' },
  };
  const LISTS = [
    { key: 'fluxo', titulo: 'Etapas do Fluxo', singular: 'etapa', classe: 'ed-lista--fluxo' },
    { key: 'boasPraticas', titulo: 'Boas Práticas', singular: 'boa prática', classe: 'ed-lista--praticas' },
    { key: 'checklist', titulo: 'Checklist de Validação', singular: 'item do checklist', classe: 'ed-lista--checklist' },
  ];
  const TAG_LABELS = { vendas: 'Comercial', fiscal: 'Fiscal', operacao: 'Operação', gestao: 'Gestão' };
  const TAG_CLASSES = { vendas: 'tag-integracao', fiscal: 'tag-requisito', operacao: 'tag-validacao', gestao: 'tag-integracao' };
  const TEXT_FIELDS = [
    ['objetivo', 'Objetivo do módulo', true],
    ['papel', 'Papel na operação', true],
    ['quando', 'Quando implantar', true],
    ['prerequisito', 'Pré-requisito (opcional)', false],
    ['fluxoDesc', 'Descrição do fluxo', false],
    ['treinamento', 'Condução do treinamento', true],
  ];

  const originais = structuredClone(modulos);
  const state = { online: false, podeEditar: false, editando: null, sujo: false, abertoId: null, filtroStatus: 'todos', filtroPacote: 'todos' };
  // Só consultores e administradores editam; estagiários veem tudo em modo leitura.
  const editavel = () => state.online && state.podeEditar;

  /* ---------- Utilidades ---------- */
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (paths, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const dataHora = (iso) => iso ? new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
  const dataCurta = (iso) => iso ? new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) : '';
  const texto = (item) => typeof item === 'string' ? item : item.texto;
  const byId = (id) => modulos.find((m) => m.id === id);
  const iconeDe = (mod) => icones[mod.icone] || icones.tarefas;
  const corDe = (mod) => /^#[0-9a-f]{6}$/i.test(mod.cor) ? mod.cor : '#3478A7';

  // Conteúdo original (strings) → formato com id/status, usado no modo leitura.
  const normalizar = (mod, i) => ({
    ...mod,
    status: mod.status !== undefined ? mod.status : (mod.revisao ? 'rever' : null),
    statusEm: mod.statusEm ?? null,
    historico: mod.historico || [],
    ...Object.fromEntries(LISTS.map(({ key }) => [key, (mod[key] || []).map((it, n) =>
      typeof it === 'string' ? { id: `${mod.id || i}-${key}-${n}`, texto: it, status: null, statusEm: null } : it)])),
  });

  async function api(method, url, body) {
    const res = await fetch(`${API}/${url}`, {
      method, headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined, cache: 'no-store',
    });
    let data = {};
    try { data = await res.json(); } catch { /* resposta sem corpo */ }
    if (res.status === 401) return window.ffIrParaLogin();
    if (!res.ok) { const err = new Error(data.erro || `Falha na comunicação (${res.status}).`); err.status = res.status; err.data = data; throw err; }
    return data;
  }

  /* ---------- Avisos ---------- */
  const toastBox = document.createElement('div');
  toastBox.className = 'ed-toasts';
  toastBox.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastBox);
  function toast(msg, tipo = 'ok') {
    const el = document.createElement('div');
    el.className = `ed-toast ed-toast--${tipo}`;
    el.textContent = msg;
    toastBox.appendChild(el);
    setTimeout(() => { el.classList.add('ed-toast--saindo'); setTimeout(() => el.remove(), 300); }, tipo === 'erro' ? 6000 : 3200);
  }

  /* ---------- Componentes de status ---------- */
  function chipStatus(obj, { curto = false } = {}) {
    if (!obj.status) return '';
    const s = STATUS[obj.status];
    const quando = obj.statusEm ? (curto ? dataCurta(obj.statusEm) : dataHora(obj.statusEm)) : 'material original';
    const por = !curto && obj.statusPor ? ` · ${esc(obj.statusPor)}` : '';
    return `<span class="ed-status ed-status--${obj.status}">${svg(s.icon)}${s.label}<time ${obj.statusEm ? `datetime="${esc(obj.statusEm)}"` : ''}>${esc(quando)}${por}</time></span>`;
  }

  function botoesStatus(alvo, atual, { compacto = false } = {}) {
    if (!editavel()) return '';
    return `<div class="ed-seg${compacto ? ' ed-seg--compacto' : ''}" role="group" aria-label="Marcar status">${
      Object.entries(STATUS).map(([k, s]) => `<button type="button" class="ed-seg-btn ed-seg-btn--${k}" data-status="${k}" data-alvo="${esc(alvo)}" aria-pressed="${atual === k}" title="${atual === k ? 'Remover marcação' : `Marcar como ${s.label}`}">${svg(s.icon)}<span${compacto ? ' class="ed-sr"' : ''}>${s.label}</span></button>`).join('')
    }</div>`;
  }

  function resumoItens(mod) {
    const itens = LISTS.flatMap(({ key }) => mod[key] || []);
    const conta = (s) => itens.filter((i) => i.status === s).length;
    const partes = Object.keys(STATUS).map((k) => [k, conta(k)]).filter(([, n]) => n);
    if (!partes.length) return '';
    return `<span class="ed-resumo" title="Itens marcados neste módulo">${partes.map(([k, n]) => `<span class="ed-resumo-item ed-resumo-item--${k}">${svg(STATUS[k].icon)}${n}</span>`).join('')}</span>`;
  }

  /* ---------- Barra de ferramentas da seção Módulos ---------- */
  const secao = document.getElementById('modulos');
  const barra = document.createElement('div');
  barra.className = 'ed-toolbar';
  secao.querySelector('.header').after(barra);

  barra.innerHTML = '<div class="ed-filtros" role="group" aria-label="Filtrar por status"></div><div class="ed-toolbar-acoes"></div><div class="ed-pacotes" hidden></div>';
  const barraFiltros = barra.querySelector('.ed-filtros');
  const barraAcoes = barra.querySelector('.ed-toolbar-acoes');
  const barraPacotes = barra.querySelector('.ed-pacotes');

  /* Filtro por pacote: mostra só os módulos do pacote e as horas de cada um dentro dele. */
  function pacoteFiltrado() {
    const H = window.ffHoras;
    return state.filtroPacote === 'todos' || !H?.estado.carregado ? null : H.estado.pacotes.find((p) => p.id === state.filtroPacote) || null;
  }

  function renderPacotes() {
    const H = window.ffHoras;
    if (!H?.estado.carregado || !H.estado.pacotes.length) { barraPacotes.hidden = true; return; }
    barraPacotes.hidden = false;
    const pacote = pacoteFiltrado();
    const opcoes = [{ id: 'todos', nome: 'Todos os pacotes' }, ...H.estado.pacotes];
    let resumo = '';
    if (pacote) {
      const t = H.totalPacote(pacote, modulos);
      const dif = t.total - t.tabela;
      const comparativo = !dif ? 'igual à tabela de preços'
        : `${H.formatar(Math.abs(dif))} ${dif > 0 ? 'acima' : 'abaixo'} da tabela (${pacote.precos.Premium[0]}h)`;
      resumo = `
        <div class="ed-pacote-resumo" aria-live="polite">
          <div class="ed-pacote-total">${svg(relogio)}<div><span>Tempo total previsto · ${esc(pacote.nome)}</span><strong>${H.formatar(t.total, { vazio: '0h' })}</strong><small class="ed-pacote-comp${dif ? (dif > 0 ? ' ed-pacote-comp--acima' : ' ed-pacote-comp--abaixo') : ''}">${esc(comparativo)}</small></div></div>
          <dl class="ed-pacote-partes">
            <div><dt><span class="pc-amostra pc-cor--modulos" aria-hidden="true"></span>Módulos (${t.porModulo.length})</dt><dd>${H.formatar(t.minutosModulos, { vazio: '0h' })}</dd></div>
            <div><dt><span class="pc-amostra pc-cor--etapas" aria-hidden="true"></span>Etapas de implantação</dt><dd>${H.formatar(t.minutosEtapas, { vazio: '0h' })}</dd></div>
            <div><dt><span class="pc-amostra pc-cor--recursos" aria-hidden="true"></span>Recursos gerais</dt><dd>${H.formatar(t.minutosRecursos, { vazio: '0h' })}</dd></div>
          </dl>
          <button type="button" class="ed-btn" data-ver-pacote="${esc(pacote.id)}">Ver pacote completo</button>
        </div>`;
    }
    barraPacotes.innerHTML = `
      <div class="ed-pacotes-linha">
        <span class="ed-pacotes-rotulo" id="ed-pacotes-rotulo">${svg(relogio)}Horas por pacote</span>
        <div class="ed-pacotes-opcoes" role="radiogroup" aria-labelledby="ed-pacotes-rotulo">
          ${opcoes.map((p) => `<button type="button" role="radio" class="ed-pacote-opcao" data-filtro-pacote="${esc(p.id)}" aria-checked="${state.filtroPacote === p.id}">${esc(p.nome)}</button>`).join('')}
        </div>
      </div>${resumo}`;
  }
  let acoesChave = null;

  function renderBarra() {
    renderPacotes();
    const contagem = (s) => modulos.filter((m) => (s === 'sem' ? !m.status : m.status === s)).length;
    const filtros = [['todos', 'Todos', modulos.length], ['rever', 'Rever', contagem('rever')], ['aprovado', 'Aprovados', contagem('aprovado')], ['reprovado', 'Reprovados', contagem('reprovado')], ['sem', 'Sem status', contagem('sem')]];
    barraFiltros.innerHTML = filtros.map(([k, l, n]) => `<button type="button" class="ed-filtro${state.filtroStatus === k ? ' ativo' : ''}" data-filtro-status="${k}" aria-pressed="${state.filtroStatus === k}">${k !== 'todos' && k !== 'sem' ? svg(STATUS[k].icon) : ''}${l}<span class="ed-conta">${n}</span></button>`).join('');
    // As ações só mudam quando a conexão ou a permissão mudam.
    const chave = `${state.online}-${state.podeEditar}`;
    if (acoesChave === chave) return;
    acoesChave = chave;
    if (editavel()) {
      barraAcoes.innerHTML = `<button type="button" class="ed-btn ed-btn--primario" data-acao="novo">${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>')}Novo módulo</button>`;
    } else if (state.online) {
      barraAcoes.innerHTML = `<span class="ed-leitura">${svg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>')}Somente leitura — seu perfil permite visualizar e exportar</span>`;
    } else {
      barraAcoes.innerHTML = `<span class="ed-offline">${svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>')}Modo leitura — servidor indisponível no momento</span>`;
    }
  }

  barra.addEventListener('click', (e) => {
    const f = e.target.closest('[data-filtro-status]');
    if (f) { state.filtroStatus = f.dataset.filtroStatus; renderBarra(); aplicarFiltros(); return; }
    const p = e.target.closest('[data-filtro-pacote]');
    if (p) {
      state.filtroPacote = p.dataset.filtroPacote;
      // O pacote filtrado passa a ser o de referência: cards e checklists mostram as horas dele.
      if (state.filtroPacote !== 'todos') window.ffHoras.definirRef(state.filtroPacote); else aplicarFiltros();
      return;
    }
    const ver = e.target.closest('[data-ver-pacote]');
    if (ver) {
      window.ffIrParaAba?.('pacotes');
      setTimeout(() => document.querySelector(`[data-pacote-card="${CSS.escape(ver.dataset.verPacote)}"]`)?.scrollIntoView({ block: 'start' }), 150);
      return;
    }
    if (e.target.closest('[data-acao="novo"]') && editavel()) abrirEditor(null);
  });

  /* ---------- Métricas do topo ---------- */
  function atualizarMetricas() {
    const numeros = document.querySelectorAll('.metrica .numero');
    const valores = { 0: modulos.length, 2: modulos.filter((m) => m.status === 'rever').length };
    Object.entries(valores).forEach(([i, v]) => {
      const el = numeros[i];
      if (!el) return;
      el.dataset.final = String(v);
      if (!el.hasAttribute('aria-label')) el.textContent = String(v); // não atropela o contador animado
    });
  }

  /* ---------- Cards ---------- */
  window.aplicarFiltros = function () {
    let lista = modulos;
    if (state.filtroStatus !== 'todos') lista = lista.filter((m) => (state.filtroStatus === 'sem' ? !m.status : m.status === state.filtroStatus));
    const pacote = pacoteFiltrado();
    if (pacote) lista = lista.filter((m) => pacote.modulos.includes(m.id));
    if (buscaAtual) {
      lista = lista.filter((m) => [m.nome, m.objetivo, m.subtitulo, ...LISTS.flatMap(({ key }) => (m[key] || []).map(texto))]
        .some((t) => (t || '').toLowerCase().includes(buscaAtual)));
    }
    renderizarCards(lista);
  };

  window.renderizarCards = function (lista) {
    const grid = document.getElementById('modulosGrid');
    grid.innerHTML = '';
    if (!lista.length) {
      grid.innerHTML = `<div class="ed-vazio">${pacoteFiltrado() && !(state.filtroStatus !== 'todos' || buscaAtual)
        ? 'Nenhum módulo do guia faz parte deste pacote.' : 'Nenhum módulo encontrado para os filtros aplicados.'}</div>`;
    }
    lista.forEach((mod) => {
      const card = document.createElement('div');
      card.className = `modulo-card${mod.status ? ` ed-card--${mod.status}` : ''}`;
      card.dataset.id = mod.id;
      card.setAttribute('aria-label', `${mod.nome}${mod.status ? ` — ${STATUS[mod.status].label}` : ''}`);
      card.onclick = () => abrirModal(mod);
      const obj = mod.objetivo || '';
      card.innerHTML = `
        <div class="modulo-card-header">
          <div class="modulo-icon" style="background: ${corDe(mod)}18; color: ${corDe(mod)};">${iconeDe(mod)}</div>
          <div class="ed-card-titulo">
            <div class="subtitulo">${esc(mod.subtitulo)}</div>
            <h3>${esc(mod.nome)}</h3>
          </div>
        </div>
        <div class="modulo-card-body">
          <p class="objetivo">${esc(obj.substring(0, 120))}${obj.length > 120 ? '...' : ''}</p>
          ${mod.status ? `<div class="ed-card-status">${chipStatus(mod, { curto: true })}</div>` : ''}
          <div class="tags">
            ${mod.tags.map((t) => `<span class="tag ${TAG_CLASSES[t] || 'tag-integracao'}">${esc(TAG_LABELS[t] || t)}</span>`).join('')}
            ${resumoItens(mod)}
            ${horasCard(mod)}
          </div>
        </div>`;
      grid.appendChild(card);
    });
    if (editavel() && state.filtroStatus === 'todos' && state.filtroPacote === 'todos' && !buscaAtual) {
      const novo = document.createElement('button');
      novo.type = 'button';
      novo.className = 'ed-card-novo';
      novo.innerHTML = `${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>')}<span>Adicionar módulo</span>`;
      novo.onclick = () => abrirEditor(null);
      grid.appendChild(novo);
    }
    renderBarra();
    atualizarMetricas();
  };

  /* ---------- Modal: visualização ---------- */
  const overlay = document.getElementById('modalOverlay');
  const header = document.getElementById('modalHeader');
  const corpo = document.getElementById('modalBody');

  function cabecalho(mod, titulo) {
    header.innerHTML = `
      <div class="modulo-icon" style="background: ${corDe(mod)}18; color: ${corDe(mod)};">${iconeDe(mod)}</div>
      <div class="ed-modal-titulo">
        <div class="subtitulo">${esc(titulo || mod.subtitulo)}</div>
        <h2>${esc(mod.nome || 'Novo módulo')}</h2>
      </div>
      <button class="modal-close" type="button" aria-label="Fechar">✕</button>`;
    header.querySelector('.modal-close').onclick = () => fecharModal();
  }

  function listaView({ key, titulo, classe }, mod) {
    const itens = mod[key] || [];
    if (!itens.length) return `<div class="secao"><div class="secao-titulo">${titulo}</div><p class="ed-nada">Nenhum item cadastrado.</p></div>`;
    return `<div class="secao"><div class="secao-titulo">${titulo}</div>
      <ol class="ed-lista ${classe}">${itens.map((it, n) => `
        <li class="ed-item${it.status ? ` ed-item--${it.status}` : ''}">
          <span class="ed-item-num">${n + 1}</span>
          <div class="ed-item-texto"><span>${esc(it.texto)}</span>${chipStatus(it)}</div>
          ${botoesStatus(it.id, it.status, { compacto: true })}
        </li>`).join('')}
      </ol></div>`;
  }

  /* ---------- Checklist com horas por pacote ---------- */
  const relogio = '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>';

  function checklistView(mod) {
    const H = window.ffHoras;
    const itens = mod.checklist || [];
    const pacotes = H?.estado.carregado ? H.pacotesDoModulo(mod.id) : [];
    const pacote = pacotes.length ? H.pacoteParaModulo(mod.id) : null;
    const titulo = '<div class="secao-titulo">Checklist de Validação</div>';

    const painel = pacote ? `
      <div class="hr-painel">
        <div class="hr-total" aria-live="polite">
          <span class="hr-total-icone">${svg(relogio)}</span>
          <div>
            <span class="hr-total-rotulo">Tempo total de implantação</span>
            <strong class="hr-total-valor">${H.formatar(H.totalModulo(mod, pacote.id), { vazio: '0h' })}</strong>
            <span class="hr-total-contexto">Pacote ${esc(pacote.nome)} · base Premium, até 5 usuários · horas do módulo inteiro</span>
            <button type="button" class="hr-ir-pacotes" data-ir-pacotes="${esc(pacote.id)}">${editavel() ? 'Editar horas na aba Pacotes e Horas' : 'Ver na aba Pacotes e Horas'}</button>
          </div>
        </div>
        <div class="hr-pacotes" role="radiogroup" aria-label="Pacote usado nas horas">
          ${pacotes.map((p) => `<button type="button" class="hr-pacote" role="radio" aria-checked="${p.id === pacote.id}" data-pacote-ref="${esc(p.id)}">
            <span>${esc(p.nome)}</span><strong>${H.formatar(H.totalModulo(mod, p.id), { vazio: '0h' })}</strong></button>`).join('')}
        </div>
      </div>`
      : `<p class="hr-aviso">${H?.estado.carregado
        ? 'Este módulo não faz parte de nenhum pacote de implantação, então não há horas previstas.'
        : 'Carregando horas de implantação…'}</p>`;

    if (!itens.length) return `<div class="secao">${titulo}${painel}<p class="ed-nada">Nenhum item cadastrado.</p></div>`;
    return `<div class="secao secao--checklist">${titulo}${painel}
      <ol class="ed-lista ed-lista--checklist">${itens.map((it, n) => `
        <li class="ed-item${it.status ? ` ed-item--${it.status}` : ''}">
          <span class="ed-item-num">${n + 1}</span>
          <div class="ed-item-texto"><span>${esc(it.texto)}</span>${chipStatus(it)}</div>
          ${botoesStatus(it.id, it.status, { compacto: true })}
        </li>`).join('')}
      </ol></div>`;
  }

  function reabrirMantendoRolagem(mod) {
    const rolagem = overlay.scrollTop;
    abrirModal(byId(mod.id) || mod);
    overlay.scrollTop = rolagem;
  }

  function horasCard(mod) {
    const H = window.ffHoras;
    if (!H?.estado.carregado) return '';
    const pacote = H.pacoteParaModulo(mod.id);
    if (!pacote) return '';
    const minutos = H.totalModulo(mod, pacote.id);
    const filtrado = pacoteFiltrado();
    const parte = filtrado ? Math.round((minutos / (H.totalPacote(filtrado, modulos).total || 1)) * 100) : null;
    return `<span class="hr-card" title="Tempo total de implantação no pacote ${esc(pacote.nome)}${parte != null ? ` (${parte}% do total do pacote)` : ''}">${svg(relogio)}${H.formatar(minutos, { vazio: '0h' })}<small>${parte != null ? `${parte}% do pacote` : esc(pacote.nome)}</small></span>`;
  }

  function historicoView(mod) {
    const h = mod.historico || [];
    if (!h.length) return '';
    const nomes = { rever: 'Rever', aprovado: 'Aprovado', reprovado: 'Reprovado', limpo: 'Status removido', editado: 'Editado', criado: 'Criado', importado: 'Importado', horas: 'Horas' };
    return `<details class="ed-historico"><summary>Histórico de alterações <span class="ed-conta">${h.length}</span></summary>
      <ol>${h.map((e) => `<li class="ed-hist ed-hist--${esc(e.acao)}">
        <time datetime="${esc(e.em)}">${esc(dataHora(e.em))}</time>
        <strong>${esc(nomes[e.acao] || e.acao)}</strong>
        <span>${esc(e.detalhe || '')}${e.autor ? ` — ${esc(e.autor)}` : ''}</span>
      </li>`).join('')}</ol></details>`;
  }

  window.abrirModal = function (modRef) {
    const mod = byId(modRef.id) || modRef;
    state.abertoId = mod.id;
    state.editando = null;
    state.sujo = false;
    cabecalho(mod);
    const quemQuando = mod.status
      ? `${STATUS[mod.status].label} ${mod.statusEm ? `em <time datetime="${esc(mod.statusEm)}">${esc(dataHora(mod.statusEm))}</time>` : 'no material original'}${mod.statusPor ? ` por ${esc(mod.statusPor)}` : ''}`
      : 'Sem marcação de status';

    corpo.innerHTML = `
      <div class="ed-barra-modal">
        <div class="ed-status-bloco">
          <span class="ed-rotulo">Status do módulo</span>
          ${editavel() ? botoesStatus('modulo', mod.status) : chipStatus(mod)}
          <span class="ed-quando">${quemQuando}</span>
        </div>
        ${editavel() ? `<div class="ed-acoes">
          <button type="button" class="ed-btn" data-acao="editar">${svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>')}Editar</button>
          <button type="button" class="ed-btn ed-btn--perigo" data-acao="excluir">${svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>')}Excluir</button>
        </div>` : ''}
      </div>
      <div class="secao"><div class="secao-titulo">Objetivo do Módulo</div><p>${esc(mod.objetivo)}</p></div>
      <div class="secao"><div class="secao-titulo">Papel na Operação</div><p>${esc(mod.papel)}</p></div>
      <div class="secao"><div class="secao-titulo">Quando Implantar</div><p>${esc(mod.quando)}</p></div>
      ${mod.prerequisito ? `<div class="secao"><div class="secao-titulo">Pré-requisito</div><div class="alerta alerta-atencao"><span class="icone">!</span><span>${esc(mod.prerequisito)}</span></div></div>` : ''}
      ${mod.fluxo?.length ? `<div class="secao"><div class="secao-titulo">Fluxo Operacional</div>
        <div class="fluxo-mapa" data-acao="fluxo" tabindex="0" role="button">
          <span class="fluxo-mapa-hint">Clique para detalhes</span>
          <div class="mapa"><div class="mapa-raiz">Fluxo ${esc(mod.nome)}</div>
            <div class="mapa-ramos"><div class="mapa-ramos-conector"></div><div class="mapa-ramo">Etapas</div></div>
            <div class="mapa-folhas">${mod.fluxo.map((it, i) => `<div class="mapa-folha${i === mod.fluxo.length - 1 ? ' destaque' : ''}${it.status ? ` ed-folha--${it.status}` : ''}">${it.status ? svg(STATUS[it.status].icon, 'ed-folha-icone') : ''}${esc(it.texto)}</div>`).join('')}</div>
          </div></div></div>` : ''}
      ${listaView(LISTS[0], mod)}
      <div class="secao"><div class="secao-titulo">Condução do Treinamento</div><p>${esc(mod.treinamento)}</p></div>
      ${listaView(LISTS[1], mod)}
      ${checklistView(mod)}
      ${historicoView(mod)}`;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Horas: trocar o pacote de referência e editar a duração de um item da checklist.
  corpo.addEventListener('click', (e) => {
    if (state.editando !== null) return;
    const mod = byId(state.abertoId);
    if (!mod) return;
    const pacote = e.target.closest('[data-pacote-ref]');
    if (pacote) { window.ffHoras.definirRef(pacote.dataset.pacoteRef); return; }
    const irPacotes = e.target.closest('[data-ir-pacotes]');
    if (irPacotes) {
      fecharModal(undefined, true);
      window.ffIrParaAba?.('pacotes');
      setTimeout(() => document.querySelector(`[data-pacote-card="${CSS.escape(irPacotes.dataset.irPacotes)}"]`)?.scrollIntoView({ block: 'start' }), 150);
    }
  });

  const reRenderizarHoras = () => {
    aplicarFiltros();
    if (state.abertoId && state.editando === null && overlay.classList.contains('active') && !corpo.querySelector('.hr-form input:not(:disabled)')) {
      const atual = byId(state.abertoId);
      if (atual) reabrirMantendoRolagem(atual);
    }
  };
  document.addEventListener('ff:pacotes', reRenderizarHoras);
  document.addEventListener('ff:pacote-ref', reRenderizarHoras);

  corpo.addEventListener('click', async (e) => {
    const alvo = e.target.closest('[data-status], [data-acao]');
    if (!alvo || state.editando !== null) return;
    const mod = byId(state.abertoId);
    if (!mod) return;

    if (alvo.dataset.status) {
      const atual = alvo.dataset.alvo === 'modulo' ? mod.status : LISTS.flatMap(({ key }) => mod[key]).find((i) => i.id === alvo.dataset.alvo)?.status;
      const novo = atual === alvo.dataset.status ? null : alvo.dataset.status;
      alvo.closest('.ed-seg').classList.add('ed-seg--salvando');
      try {
        const { modulo } = await api('POST', `modulos?id=${encodeURIComponent(mod.id)}&acao=status`, { alvo: alvo.dataset.alvo, status: novo });
        substituir(modulo);
        const rolagem = overlay.scrollTop;
        abrirModal(modulo);
        overlay.scrollTop = rolagem;
        aplicarFiltros();
        toast(novo ? `Marcado como ${STATUS[novo].label}.` : 'Marcação removida.');
      } catch (err) {
        alvo.closest('.ed-seg')?.classList.remove('ed-seg--salvando');
        toast(err.message, 'erro');
      }
      return;
    }

    switch (alvo.dataset.acao) {
      case 'fluxo': abrirFluxo(`${mod.nome} — Fluxo Operacional`, mod.fluxoDesc || '', mod.fluxo.map((i) => i.texto)); break;
      case 'editar': abrirEditor(mod); break;
      case 'excluir': confirmarExclusao(alvo, mod); break;
    }
  });
  corpo.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.fluxo-mapa[data-acao="fluxo"]')) { e.preventDefault(); e.target.click(); }
  });

  function confirmarExclusao(botao, mod) {
    const acoes = botao.closest('.ed-acoes');
    acoes.innerHTML = `<span class="ed-confirma" role="alert">Excluir “${esc(mod.nome)}” e todo o seu histórico?</span>
      <button type="button" class="ed-btn ed-btn--perigo-forte" data-confirma="sim">Sim, excluir</button>
      <button type="button" class="ed-btn" data-confirma="nao">Cancelar</button>`;
    acoes.querySelector('[data-confirma="nao"]').focus();
    acoes.onclick = async (ev) => {
      const r = ev.target.closest('[data-confirma]')?.dataset.confirma;
      if (!r) return;
      ev.stopPropagation();
      if (r === 'nao') { abrirModal(mod); return; }
      try {
        await api('DELETE', `modulos?id=${encodeURIComponent(mod.id)}`);
        modulos.splice(modulos.findIndex((m) => m.id === mod.id), 1);
        fecharModal(undefined, true);
        aplicarFiltros();
        toast(`Módulo “${mod.nome}” excluído.`);
      } catch (err) { toast(err.message, 'erro'); }
    };
  }

  /* ---------- Modal: edição (criar/alterar) ---------- */
  function linhaItem(it, singular) {
    return `<li class="ed-linha" data-id="${esc(it.id || '')}">
      <span class="ed-linha-num" aria-hidden="true"></span>
      <input type="text" class="ed-input" value="${esc(it.texto || '')}" maxlength="400" aria-label="Texto da ${esc(singular)}" placeholder="Descreva a ${esc(singular)}">
      <div class="ed-linha-acoes">
        <button type="button" class="ed-icone-btn" data-mover="-1" aria-label="Mover para cima" title="Mover para cima">${svg('<polyline points="18 15 12 9 6 15"/>')}</button>
        <button type="button" class="ed-icone-btn" data-mover="1" aria-label="Mover para baixo" title="Mover para baixo">${svg('<polyline points="6 9 12 15 18 9"/>')}</button>
        <button type="button" class="ed-icone-btn ed-icone-btn--perigo" data-remover aria-label="Remover ${esc(singular)}" title="Remover">${svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')}</button>
      </div>
    </li>`;
  }

  function abrirEditor(modRef) {
    const mod = modRef ? byId(modRef.id) : { nome: '', subtitulo: '', icone: 'tarefas', cor: '#3478A7', tags: ['gestao'], fluxo: [], boasPraticas: [], checklist: [] };
    state.editando = modRef ? mod.id : 'novo';
    state.abertoId = modRef ? mod.id : null;
    state.sujo = false;
    cabecalho(mod, modRef ? 'Editando módulo' : 'Criar módulo');

    corpo.innerHTML = `
      <form class="ed-form" novalidate>
        <div class="ed-grid">
          <label class="ed-campo ed-campo--largo"><span>Nome do módulo <abbr title="obrigatório">*</abbr></span>
            <input name="nome" class="ed-input" required maxlength="80" value="${esc(mod.nome)}" aria-describedby="erroNome">
            <small id="erroNome" class="ed-erro" hidden>Informe o nome do módulo.</small></label>
          <label class="ed-campo"><span>Subtítulo</span><input name="subtitulo" class="ed-input" maxlength="60" value="${esc(mod.subtitulo)}" placeholder="Ex.: Operação"></label>
          <label class="ed-campo"><span>Ícone</span><select name="icone" class="ed-input">${Object.keys(icones).map((k) => `<option value="${k}"${k === mod.icone ? ' selected' : ''}>${k}</option>`).join('')}</select></label>
          <label class="ed-campo ed-campo--cor"><span>Cor</span><input name="cor" type="color" value="${esc(corDe(mod))}"></label>
          <fieldset class="ed-campo ed-campo--largo ed-tags"><legend>Categorias</legend>
            ${Object.entries(TAG_LABELS).map(([k, l]) => `<label class="ed-check"><input type="checkbox" name="tags" value="${k}"${mod.tags.includes(k) ? ' checked' : ''}><span>${l}</span></label>`).join('')}
          </fieldset>
          ${TEXT_FIELDS.map(([k, l]) => `<label class="ed-campo ed-campo--largo"><span>${l}</span><textarea name="${k}" class="ed-input" rows="${k === 'treinamento' ? 4 : 2}" maxlength="${k === 'treinamento' ? 4000 : 2000}">${esc(mod[k] || '')}</textarea></label>`).join('')}
        </div>
        ${LISTS.map(({ key, titulo, singular }) => `
          <fieldset class="ed-lista-edit" data-lista="${key}" data-singular="${esc(singular)}">
            <legend>${titulo} <span class="ed-conta">${(mod[key] || []).length}</span></legend>
            <ol class="ed-linhas">${(mod[key] || []).map((it) => linhaItem(it, singular)).join('')}</ol>
            <button type="button" class="ed-btn ed-btn--adicionar" data-adicionar>${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>')}Adicionar ${esc(singular)}</button>
            <p class="ed-dica">Dica: Enter adiciona um novo item logo abaixo. Itens vazios são descartados.</p>
          </fieldset>`).join('')}
        <div class="ed-rodape">
          <button type="button" class="ed-btn" data-cancelar>Cancelar</button>
          <button type="submit" class="ed-btn ed-btn--primario">${svg('<polyline points="20 6 9 17 4 12"/>')}${modRef ? 'Salvar alterações' : 'Criar módulo'}</button>
        </div>
      </form>`;

    const form = corpo.querySelector('.ed-form');
    form.addEventListener('input', () => { state.sujo = true; atualizarContagens(form); });
    form.addEventListener('click', (e) => {
      const linha = e.target.closest('.ed-linha');
      if (e.target.closest('[data-remover]')) { linha.remove(); state.sujo = true; atualizarContagens(form); return; }
      const mover = e.target.closest('[data-mover]');
      if (mover) {
        const irmao = mover.dataset.mover === '-1' ? linha.previousElementSibling : linha.nextElementSibling;
        if (irmao) { mover.dataset.mover === '-1' ? irmao.before(linha) : irmao.after(linha); mover.focus(); state.sujo = true; atualizarContagens(form); }
        return;
      }
      if (e.target.closest('[data-adicionar]')) { adicionarLinha(e.target.closest('.ed-lista-edit')); return; }
      if (e.target.closest('[data-cancelar]')) { cancelarEdicao(); }
    });
    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.matches('.ed-linha .ed-input')) {
        e.preventDefault();
        adicionarLinha(e.target.closest('.ed-lista-edit'), e.target.closest('.ed-linha'));
      }
    });
    form.addEventListener('submit', (e) => { e.preventDefault(); salvar(form, modRef ? mod : null); });
    atualizarContagens(form);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    form.querySelector('[name="nome"]').focus();
  }

  function adicionarLinha(fieldset, depoisDe) {
    const tmp = document.createElement('template');
    tmp.innerHTML = linhaItem({ texto: '' }, fieldset.dataset.singular).trim();
    const nova = tmp.content.firstElementChild;
    depoisDe ? depoisDe.after(nova) : fieldset.querySelector('.ed-linhas').appendChild(nova);
    nova.querySelector('input').focus();
    state.sujo = true;
    atualizarContagens(fieldset.closest('form'));
  }

  function atualizarContagens(form) {
    form.querySelectorAll('.ed-lista-edit').forEach((fs) => {
      const linhas = fs.querySelectorAll('.ed-linha');
      linhas.forEach((l, i) => { l.querySelector('.ed-linha-num').textContent = i + 1; });
      fs.querySelector('legend .ed-conta').textContent = linhas.length;
    });
  }

  function lerForm(form) {
    const fd = new FormData(form);
    const mod = { tags: fd.getAll('tags') };
    ['nome', 'subtitulo', 'icone', 'cor', ...TEXT_FIELDS.map(([k]) => k)].forEach((k) => { mod[k] = (fd.get(k) || '').toString().trim(); });
    form.querySelectorAll('.ed-lista-edit').forEach((fs) => {
      mod[fs.dataset.lista] = [...fs.querySelectorAll('.ed-linha')]
        .map((l) => ({ id: l.dataset.id || undefined, texto: l.querySelector('input').value.trim() }))
        .filter((i) => i.texto);
    });
    return mod;
  }

  async function salvar(form, existente) {
    const dados = lerForm(form);
    const erro = form.querySelector('#erroNome');
    const nome = form.querySelector('[name="nome"]');
    if (!dados.nome) { erro.hidden = false; nome.setAttribute('aria-invalid', 'true'); nome.focus(); return; }
    erro.hidden = true; nome.removeAttribute('aria-invalid');

    const botao = form.querySelector('[type="submit"]');
    botao.disabled = true;
    botao.classList.add('ed-btn--carregando');
    try {
      const { modulo } = existente
        ? await api('PUT', `modulos?id=${encodeURIComponent(existente.id)}`, { rev: existente.rev, modulo: dados })
        : await api('POST', 'modulos', { modulo: dados });
      existente ? substituir(modulo) : modulos.push(modulo);
      state.sujo = false;
      aplicarFiltros();
      abrirModal(modulo);
      toast(existente ? 'Alterações salvas.' : `Módulo “${modulo.nome}” criado.`);
    } catch (err) {
      botao.disabled = false;
      botao.classList.remove('ed-btn--carregando');
      if (err.status === 409 && err.data?.modulo) {
        substituir(err.data.modulo);
        aplicarFiltros();
        toast(`${err.message} Suas alterações não foram salvas; reabra a edição para aplicá-las novamente.`, 'erro');
        state.sujo = false;
        abrirModal(err.data.modulo);
      } else {
        toast(err.message, 'erro');
      }
    }
  }

  function cancelarEdicao() {
    if (state.sujo && !confirm('Descartar as alterações não salvas?')) return;
    state.sujo = false;
    const id = state.editando;
    state.editando = null;
    id && id !== 'novo' ? abrirModal(byId(id)) : fecharModal(undefined, true);
  }

  function substituir(mod) {
    const i = modulos.findIndex((m) => m.id === mod.id);
    if (i >= 0) modulos[i] = mod;
    avisarModulos();
  }

  // A aba "Pacotes e Horas" recalcula os totais quando os módulos mudam.
  const avisarModulos = () => document.dispatchEvent(new CustomEvent('ff:modulos', { detail: { modulos } }));

  window.fecharModal = function (event, forcar) {
    if (event && event.target !== event.currentTarget) return;
    if (!overlay.classList.contains('active')) return;
    if (!forcar && state.editando !== null && state.sujo && !confirm('Descartar as alterações não salvas?')) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    state.editando = null;
    state.sujo = false;
    state.abertoId = null;
  };

  /* ---------- Carga e sincronização ---------- */
  function aplicarLista(lista) {
    modulos.splice(0, modulos.length, ...lista);
    aplicarFiltros();
    avisarModulos();
    if (state.abertoId && state.editando === null && overlay.classList.contains('active')) {
      const atual = byId(state.abertoId);
      if (atual) { const r = overlay.scrollTop; abrirModal(atual); overlay.scrollTop = r; }
    }
  }

  async function carregar({ silencioso = false } = {}) {
    try {
      const { modulos: lista } = await api('GET', 'modulos');
      const mudou = !state.online || JSON.stringify(lista) !== JSON.stringify(modulos);
      state.online = true;
      if (mudou && state.editando === null) aplicarLista(lista);
    } catch (err) {
      if (!silencioso || state.online) {
        if (state.online) toast('Conexão com o servidor perdida. Modo leitura ativado.', 'erro');
        state.online = false;
        if (!modulos.some((m) => m.historico)) modulos.splice(0, modulos.length, ...originais.map(normalizar));
        aplicarFiltros();
      }
    }
  }

  // Estado inicial imediato (conteúdo original), depois dados compartilhados do servidor.
  modulos.splice(0, modulos.length, ...originais.map(normalizar));
  renderBarra();
  window.ffSessao.then((usuario) => {
    state.podeEditar = Boolean(usuario?.permissoes?.includes('editar'));
    carregar();
  });
  setInterval(() => { if (document.visibilityState === 'visible') carregar({ silencioso: true }); }, 30000);
  addEventListener('focus', () => carregar({ silencioso: true }));
  addEventListener('beforeunload', (e) => { if (state.sujo) { e.preventDefault(); e.returnValue = ''; } });
})();
