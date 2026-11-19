/* Faktory Flow — Processo de Líderes (#lideres). Quadros Kanban de cada líder (consultor) com seus estagiários.
   Dados: /api/lideres (lib/rotas/lideres.js). As regras de acesso são do servidor; aqui só escondemos o que o papel
   não pode fazer. Sem dependências e sem HTML vindo dos dados (textContent sempre). CSP script-src 'self'.
   Rotas: #lideres (lista de quadros) · #lideres/q-<id> (quadro) · #lideres/q-<id>-t-<id> (quadro com a tarefa aberta).
   Expõe window.Lideres = { desenhar(raiz, rota, ctx), iniciarSino(onde), abrirLink(quadroId, tarefaId) }.
   Movimento: movimento.js (revelar, FLIP, palavras, contar); respeita prefers-reduced-motion. */
(() => {
  const P = window.Plataforma;
  if (!P) return;
  const MOV = window.FFMovimento || null;
  const reduzido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilitários ---------- */
  function h(tag, props, ...filhos) {
    const el = document.createElement(tag);
    if (props) {
      for (const [k, v] of Object.entries(props)) {
        if (v == null || v === false) continue;
        if (k === 'className') el.className = v;
        else if (k === 'text') el.textContent = String(v);
        else if (k === 'on') for (const [ev, fn] of Object.entries(v)) el.addEventListener(ev, fn);
        else if (k === 'style') for (const [p, val] of Object.entries(v)) el.style.setProperty(p, val);
        else if (k === 'data') for (const [d, val] of Object.entries(v)) el.dataset[d] = String(val);
        else if (k === 'value') el.value = v;
        else if (k === 'checked' || k === 'selected' || k === 'disabled') el[k] = Boolean(v);
        else el.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (const f of filhos.flat(Infinity)) {
      if (f == null || f === false) continue;
      el.append(f instanceof Node ? f : document.createTextNode(String(f)));
    }
    return el;
  }
  const semAcento = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
  const iniciais = (nome) => String(nome || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join('').toUpperCase() || '?';
  const corValida = (c) => (/^#[0-9a-f]{6}$/i.test(String(c || '')) ? c : '#D5DD26');
  const dataCurta = (d) => { if (!d) return ''; const x = new Date(`${String(d).slice(0, 10)}T12:00:00`); return Number.isNaN(x.getTime()) ? '' : x.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''); };
  const dataLonga = (d) => { if (!d) return ''; const x = new Date(d); return Number.isNaN(x.getTime()) ? '' : x.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', ''); };
  const dataHora = (d) => { const x = new Date(d); return Number.isNaN(x.getTime()) ? '' : x.toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).replace('.', ''); };
  function relativo(d) {
    const x = new Date(d); if (Number.isNaN(x.getTime())) return '';
    const s = Math.round((Date.now() - x.getTime()) / 1000);
    if (s < 60) return 'agora';
    if (s < 3600) return `há ${Math.floor(s / 60)} min`;
    if (s < 86400) return `há ${Math.floor(s / 3600)} h`;
    if (s < 172800) return 'ontem';
    return dataCurta(x.toISOString());
  }
  const diasAte = (prazo, hoje) => Math.round((new Date(`${prazo}T12:00:00`) - new Date(`${hoje}T12:00:00`)) / 86400000);

  /* ---------- ícones (traço 2 px, viewBox 24; texto fixo deste arquivo, nunca dado) ---------- */
  const D = {
    alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    foguete: '<path d="M5 15c-1.5 1.3-2 4-2 6 2 0 4.7-.5 6-2"/><path d="M9 15 6 12c1.2-4.6 5.4-9 12-9 0 6.6-4.4 10.8-9 12Z"/><circle cx="14.5" cy="9.5" r="1.6"/>',
    engrenagem: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
    grafico: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
    pessoas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.4a6.5 6.5 0 0 1 3.5 5.6"/>',
    escudo: '<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6Z"/><path d="m9 12 2 2 4-4"/>',
    raio: '<path d="M13 2 4 14h7l-1 8 9-12h-7Z"/>',
    livro: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20"/>',
    caixa: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    bandeira: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    lideres: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/>',
    mais: '<path d="M12 5v14M5 12h14"/>',
    editar: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    lixo: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
    sino: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    alerta: '<path d="M12 3 2 20h20Z"/><path d="M12 10v4M12 17h.01"/>',
    bloqueio: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    checklist: '<path d="m4 7 2 2 3-3M4 15l2 2 3-3"/><path d="M13 8h7M13 16h7"/>',
    comentario: '<path d="M4 5h16v11H9l-5 4z"/>',
    historico: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    voltar: '<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>',
    seta: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    mover: '<path d="M5 9 2 12l3 3M19 9l3 3-3 3M9 5l3-3 3 3M9 19l3 3 3-3M2 12h20M12 2v20"/>',
    kanban: '<rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="10" rx="1.5"/><rect x="17" y="4" width="4" height="13" rx="1.5"/>',
    painel: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    usuario: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    enviar: '<path d="M4 12 20 4l-6 16-3-7z"/><path d="m11 13 9-9"/>',
    arquivo: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4"/>',
    filtro: '<path d="M3 5h18l-7 8v6l-4 2v-8Z"/>',
    pontos: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
    aprovar: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/>',
    ajuste: '<path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 4v5h5"/>',
    sair: '<path d="M9 12h12M17 8l4 4-4 4"/><path d="M14 4H5v16h9"/>',
    entrar: '<path d="M3 12h12M11 8l4 4-4 4"/><path d="M10 4h9v16h-9"/>',
    mencao: '<circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1"/>',
    megafone: '<path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/>',
    cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    ajustes: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    subir: '<path d="m6 14 6-6 6 6"/>',
    descer: '<path d="m6 10 6 6 6-6"/>',
    igual: '<path d="M6 12h12"/>',
    gerencial: '<path d="M3 20h18"/><rect x="5" y="11" width="3" height="6" rx="1"/><rect x="10.5" y="7" width="3" height="10" rx="1"/><rect x="16" y="4" width="3" height="13" rx="1"/>',
    olho: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  };
  const ICONES_QUADRO = ['alvo', 'foguete', 'engrenagem', 'grafico', 'pessoas', 'escudo', 'raio', 'livro', 'caixa', 'bandeira'];
  const CORES = [['#D5DD26', 'Lima'], ['#3478A7', 'Azul'], ['#6FA8CF', 'Celeste'], ['#2BB3C0', 'Ciano'], ['#3FB57A', 'Verde'], ['#F2A93B', 'Âmbar'], ['#E86A5C', 'Coral'], ['#E36FA8', 'Rosa'], ['#8B7CF6', 'Violeta'], ['#8A9BAD', 'Grafite']];
  function ic(nome, classe) {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '2'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true'); if (classe) s.setAttribute('class', classe);
    s.innerHTML = D[nome] || D.alvo;
    return s;
  }

  const COLUNAS = [['a_fazer', 'A Fazer'], ['em_andamento', 'Em Andamento'], ['em_revisao', 'Em Revisão'], ['concluido', 'Concluído']];
  const NOME_COL = Object.fromEntries(COLUNAS);
  const PRIORIDADES = [['urgente', 'Urgente'], ['alta', 'Alta'], ['media', 'Média'], ['baixa', 'Baixa']];
  const NOME_PRIO = Object.fromEntries(PRIORIDADES);
  const PESO_PRIO = { urgente: 0, alta: 1, media: 2, baixa: 3 };

  /* ---------- API ---------- */
  async function api(metodo, query = '', corpo) {
    const ctl = new AbortController();
    const relogio = setTimeout(() => ctl.abort(), 15000);
    try {
      const r = await fetch(`/api/lideres${query ? `?${query}` : ''}`, {
        method: metodo, credentials: 'same-origin', cache: 'no-store', signal: ctl.signal,
        headers: corpo === undefined ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: corpo === undefined ? undefined : JSON.stringify(corpo),
      });
      if (r.status === 401 && typeof window.ffIrParaLogin === 'function') { window.ffIrParaLogin(); return { erro: { status: 401, mensagem: 'Sessão expirada.' } }; }
      let d = null; try { d = await r.json(); } catch { d = null; }
      if (!r.ok) return { erro: { status: r.status, mensagem: (d && d.erro) || `Não foi possível concluir (erro ${r.status}).` } };
      return d || {};
    } catch (e) {
      return { erro: { status: 0, mensagem: e?.name === 'AbortError' ? 'O servidor demorou a responder. Tente de novo.' : 'Sem conexão com o servidor. Tente de novo.' } };
    } finally { clearTimeout(relogio); }
  }
  let euPromessa = null;
  const sessao = () => {
    if (!euPromessa) euPromessa = Promise.resolve(window.ffSessao || fetch('/api/auth/eu', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)).then((d) => d?.usuario || null)).catch(() => null);
    return euPromessa;
  };

  /* ---------- avisos (toast) e anúncio para leitor de tela ---------- */
  let regiaoAviso = null;
  function avisar(msg, tipo = 'ok') {
    if (!regiaoAviso) { regiaoAviso = h('div', { className: 'ld-avisos', role: 'status', 'aria-live': 'polite' }); document.body.append(regiaoAviso); }
    const t = h('div', { className: `ld-aviso ld-aviso--${tipo}` }, ic(tipo === 'erro' ? 'alerta' : 'check'), h('span', { text: msg }));
    regiaoAviso.append(t);
    setTimeout(() => { t.classList.add('ld-aviso--saindo'); setTimeout(() => t.remove(), 300); }, tipo === 'erro' ? 5200 : 3200);
  }
  let anunciador = null;
  function anunciar(msg) {
    if (!anunciador) { anunciador = h('div', { className: 'ld-sr', 'aria-live': 'assertive' }); document.body.append(anunciador); }
    anunciador.textContent = ''; setTimeout(() => { anunciador.textContent = msg; }, 30);
  }

  /* ---------- estados ---------- */
  const carregando = (texto) => h('div', { className: 'ld-carregando', role: 'status' }, h('span', { className: 'ld-carregando__barra', 'aria-hidden': 'true' }), h('span', { text: texto }));
  function falha(erro, tentar) {
    const e = erro?.erro || erro || {};
    return h('div', { className: 'ld-vazio ld-vazio--erro', role: 'alert' }, h('span', { className: 'ld-vazio__ic' }, ic('alerta')),
      h('h2', { text: e.status === 404 ? 'Quadro não encontrado' : e.status === 403 ? 'Sem acesso para o seu perfil' : 'Não foi possível carregar' }),
      h('p', { text: e.status === 404 ? 'Ele não existe mais ou você não faz parte dele.' : e.mensagem || 'Confira a conexão e tente de novo.' }),
      h('div', { className: 'ld-vazio__acoes' },
        tentar ? h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: tentar } }, 'Tentar de novo') : null,
        e.status === 404 ? h('button', { type: 'button', className: 'ld-botao', on: { click: () => P.irPara({ area: 'lideres' }) } }, ic('voltar'), 'Ver meus quadros') : null));
  }
  const avatar = (nome, classe = '') => h('span', { className: `ld-av ${classe}`, 'aria-hidden': 'true', text: iniciais(nome) });

  /* ============================================================
     Estado da tela
     ============================================================ */
  const est = {
    raiz: null, eu: null, quadroId: null, dados: null, vista: 'kanban', painelId: null, painel: null,
    filtros: { termo: '', resp: '', prio: '', status: '', prazo: '' }, timer: null, versao: null, arrastando: false, limpar: [],
  };
  function limparTela() {
    clearInterval(est.timer); est.timer = null;
    while (est.limpar.length) { try { est.limpar.pop()(); } catch { /* nada */ } }
    fecharPainel(true);
  }

  /* ============================================================
     Entrada (guia-abas.js) — raiz = painel da área, que este arquivo controla
     ============================================================ */
  async function desenhar(raiz, rota) {
    est.raiz = raiz;
    est.eu = await sessao();
    if (rota?.secao === 'gerencial') { document.title = 'Visão Gerencial · Processo de Líderes — Faktory Flow'; return gerencial(raiz); }
    if (rota?.secao === 'orientacoes') { document.title = 'Orientações · Processo de Líderes — Faktory Flow'; return centralOrientacoes(raiz); }
    const m = /^q-(\d{1,18})(?:-t-(\d{1,18}))?$/.exec(rota?.secao || '');
    if (!m) { document.title = 'Processo de Líderes — Faktory Flow'; return lista(raiz); }
    const [, qid, tid] = m;
    if (est.quadroId === qid && est.dados && raiz.contains(est.no)) { if (tid) abrirPainel(tid); return null; }
    return quadro(raiz, qid, tid);
  }

  /* ============================================================
     1. Lista de quadros
     ============================================================ */
  async function lista(raiz) {
    limparTela();
    est.quadroId = null; est.dados = null;
    const casca = h('div', { className: 'ld' }, carregando('Carregando os quadros…'));
    raiz.replaceChildren(casca);
    const r = await api('GET');
    if (est.raiz !== raiz || est.quadroId) return null;
    if (r.erro) { casca.replaceChildren(h('div', { className: 'ld-corpo' }, falha(r, () => lista(raiz)))); return null; }
    const eu = est.eu || {};
    const ativos = r.quadros.filter((q) => q.status === 'ativo');
    const arquivados = r.quadros.filter((q) => q.status === 'arquivado');
    const soma = (k) => ativos.reduce((s, q) => s + (q.numeros[k] || 0), 0);
    const abertas = ativos.reduce((s, q) => s + q.numeros.total - q.numeros.concluidas, 0);
    let aba = 'ativo';
    let termo = '';

    const fato = (n, rotulo, mod) => h('div', { className: `ld-fato${mod ? ` ld-fato--${mod}` : ''}` }, h('dt', { text: rotulo }), h('dd', null, h('span', { 'data-contar': String(n), text: String(n) })));
    const abertura = h('header', { className: 'ld-abertura' },
      h('div', { className: 'ld-abertura__luz', 'aria-hidden': 'true' }),
      h('p', { className: 'ld-marca' }, h('span', { className: 'ld-ponto', 'aria-hidden': 'true' }), 'Faktory Flow · Liderança'),
      h('h1', { className: 'ld-titulo' }, titulo(h('span', { text: 'Processo de' })), ' ', MOV ? MOV.palavras(h('span', { className: 'ld-titulo__lima', text: 'Líderes' }), { atraso: 110 }) : h('span', { className: 'ld-titulo__lima', text: 'Líderes' })),
      h('p', { className: 'ld-lead', text: eu.papel === 'estagiario'
        ? 'Os quadros de que você participa: suas tarefas, o que o seu líder espera e o que já foi aprovado.'
        : 'Cada líder conduz seus estagiários num quadro próprio: tarefas distribuídas, revisão e aprovação, prazos e impedimentos à vista.' }),
      h('dl', { className: 'ld-fatos' },
        fato(ativos.length, ativos.length === 1 ? 'Quadro ativo' : 'Quadros ativos'),
        fato(abertas, 'Tarefas abertas'),
        fato(soma('revisao'), 'Em revisão', soma('revisao') ? 'lima' : ''),
        fato(soma('atrasadas'), 'Atrasadas', soma('atrasadas') ? 'alerta' : ''),
        eu.papel === 'estagiario' ? fato(soma('minhas'), 'Comigo agora') : null),
      r.podeCriar ? h('div', { className: 'ld-abertura__acoes' }, h('button', { type: 'button', className: 'ld-botao', on: { click: () => modalQuadro(null, () => lista(raiz)) } }, ic('mais'), 'Novo quadro')) : null);

    const grade = h('div', { className: 'ld-quadros' });
    const segmento = arquivados.length && eu.papel !== 'estagiario'
      ? h('div', { className: 'ld-segmento', role: 'group', 'aria-label': 'Quais quadros mostrar' },
        [['ativo', `Ativos · ${ativos.length}`], ['arquivado', `Arquivados · ${arquivados.length}`]].map(([id, t]) => h('button', { type: 'button', className: 'ld-segmento__op', 'aria-pressed': String(id === aba), data: { aba: id },
          on: { click: (e) => { aba = id; segmento.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.aba === aba))); trilho?.mover(); redesenhar(); e.currentTarget.focus(); } } }, t)))
      : null;
    const busca = r.quadros.length > 3 ? h('label', { className: 'ld-busca' }, ic('busca'), h('span', { className: 'ld-sr', text: 'Filtrar quadros' }),
      h('input', { type: 'search', placeholder: 'Filtrar por quadro ou líder…', autocomplete: 'off', on: { input: (e) => { termo = semAcento(e.target.value.trim()); if (MOV) MOV.layout(grade, redesenhar); else redesenhar(); } } })) : null;

    function redesenhar() {
      const lista = (aba === 'ativo' ? ativos : arquivados).filter((q) => !termo || semAcento(`${q.nome} ${q.descricao} ${q.liderNome}`).includes(termo));
      if (!r.quadros.length) {
        grade.replaceChildren(h('div', { className: 'ld-vazio ld-vazio--grande' },
          h('span', { className: 'ld-vazio__ic' }, ic('lideres')),
          h('h2', { text: r.podeCriar ? 'Nenhum quadro ainda' : eu.papel === 'estagiario' ? 'Você ainda não está em nenhum quadro' : 'Nenhum quadro criado ainda' }),
          h('p', { text: r.podeCriar ? 'Crie o primeiro quadro escolhendo o líder (consultor ou administrador) e os estagiários que ele vai acompanhar.' : eu.papel === 'estagiario' ? 'Quando o administrador incluir você no quadro do seu líder, ele aparece aqui e você recebe uma notificação.' : 'Os quadros são montados pelo administrador. Quando você for líder de um, ele aparece aqui.' }),
          r.podeCriar ? h('button', { type: 'button', className: 'ld-botao', on: { click: () => modalQuadro(null, () => lista(raiz)) } }, ic('mais'), 'Criar o primeiro quadro') : null));
        return;
      }
      if (!lista.length) { grade.replaceChildren(h('p', { className: 'ld-nada', text: termo ? 'Nenhum quadro com esse nome ou líder.' : 'Nenhum quadro aqui.' })); return; }
      grade.replaceChildren(...lista.map((q, i) => cartaoQuadro(q, i)));
    }
    const ferramentas = segmento || busca ? h('div', { className: 'ld-ferramentas' }, segmento, busca) : null;
    const secaoCab = r.quadros.length ? h('header', { className: 'ld-secao-cab', 'data-revela': '' },
      h('p', { className: 'ld-secao-cab__olho', text: eu.papel === 'estagiario' ? 'Seus quadros' : 'Quadros' }),
      h('h2', { text: eu.papel === 'estagiario' ? 'Onde você está trabalhando' : 'Cada líder, um quadro' })) : null;
    casca.replaceChildren(navArea('quadros'), abertura, h('div', { className: 'ld-corpo' }, secaoCab, ferramentas, grade));
    const trilho = segmento && MOV ? MOV.indicador(segmento, '[aria-pressed="true"]', 'ld-segmento__ind') : null;
    if (trilho) est.limpar.push(() => trilho.destruir());
    redesenhar();
    revelar(casca);
    casca.querySelectorAll('[data-contar]').forEach((el, i) => MOV?.contar(el, el.dataset.contar, { atraso: 200 + i * 80 }));
    return null;
  }

  function cartaoQuadro(q, i) {
    const n = q.numeros;
    const pct = n.total ? Math.round((n.concluidas * 100) / n.total) : 0;
    const abrir = () => P.irPara({ area: 'lideres', secao: `q-${q.id}` });
    const card = h('article', { className: `ld-qcard${q.status === 'arquivado' ? ' ld-qcard--arquivado' : ''}`, style: { '--cor': corValida(q.cor), '--k': String(i) }, 'data-flip': `q${q.id}`, 'data-revela': '',
      on: { pointermove: (e) => { const b = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', `${e.clientX - b.left}px`); e.currentTarget.style.setProperty('--my', `${e.clientY - b.top}px`); } } },
      h('div', { className: 'ld-qcard__topo' },
        h('span', { className: 'ld-qcard__ic' }, ic(q.icone)),
        h('div', { className: 'ld-qcard__selos' },
          q.status === 'arquivado' ? h('span', { className: 'ld-selo', text: 'Arquivado' }) : null,
          q.souLider ? h('span', { className: 'ld-selo ld-selo--lima', text: 'Você lidera' }) : null)),
      h('h2', { className: 'ld-qcard__nome' }, h('a', { href: `#lideres/q-${q.id}`, on: { click: (e) => { e.preventDefault(); abrir(); } } }, q.nome)),
      q.descricao ? h('p', { className: 'ld-qcard__desc', text: q.descricao }) : h('p', { className: 'ld-qcard__desc ld-qcard__desc--vazia', text: 'Sem descrição.' }),
      h('div', { className: 'ld-qcard__progresso' },
        h('div', { className: 'ld-barra', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-label': 'Conclusão do quadro' }, h('span', { style: { '--p': `${pct}%` } })),
        h('p', null, h('strong', { text: `${pct}%` }), ` concluído · ${n.concluidas} de ${plural(n.total, 'tarefa', 'tarefas')}`)),
      h('footer', { className: 'ld-qcard__rodape' },
        h('span', { className: 'ld-qcard__lider' }, avatar(q.liderNome), h('span', null, h('small', { text: 'Líder' }), h('strong', { text: q.liderNome }))),
        h('span', { className: 'ld-qcard__chips' },
          h('span', { className: 'ld-chip', title: 'Estagiários no quadro' }, ic('pessoas'), String(n.estagiarios)),
          n.revisao ? h('span', { className: 'ld-chip ld-chip--lima', title: 'Aguardando revisão' }, ic('aprovar'), String(n.revisao)) : null,
          n.atrasadas ? h('span', { className: 'ld-chip ld-chip--alerta', title: 'Tarefas atrasadas' }, ic('relogio'), String(n.atrasadas)) : null,
          n.minhas ? h('span', { className: 'ld-chip ld-chip--azul', title: 'Abertas com você' }, ic('usuario'), String(n.minhas)) : null)));
    card.addEventListener('click', (e) => { if (!e.target.closest('a, button')) abrir(); });
    return card;
  }

  const titulo = (el) => (MOV ? MOV.palavras(el) : el);
  function revelar(raiz) { if (MOV) est.limpar.push(MOV.revelar(raiz)); }

  /* ============================================================
     2. Quadro (Kanban + Painel)
     ============================================================ */
  async function carregarQuadro(id) { return api('GET', `quadro=${encodeURIComponent(id)}`); }

  async function quadro(raiz, id, tarefaAbrir) {
    limparTela();
    est.quadroId = id; est.dados = null; est.vista = 'kanban';
    est.filtros = filtrosVazios();
    if (filtrosPendentes && filtrosPendentes.quadroId === String(id)) { Object.assign(est.filtros, filtrosPendentes.filtros); filtrosPendentes = null; }
    const casca = h('div', { className: 'ld ld--quadro' }, carregando('Abrindo o quadro…'));
    est.no = casca;
    raiz.replaceChildren(casca);
    const r = await carregarQuadro(id);
    if (est.quadroId !== id || est.raiz !== raiz) return null;
    if (r.erro) { casca.replaceChildren(h('div', { className: 'ld-corpo' }, falha(r, () => quadro(raiz, id, tarefaAbrir)))); return null; }
    est.dados = r; est.versao = r.quadro.versao;
    document.title = `${r.quadro.nome} · Processo de Líderes — Faktory Flow`;
    montarQuadro(casca);
    if (tarefaAbrir) {
      abrirPainel(tarefaAbrir);
      // o endereço volta a ser só o quadro (fechar o painel e reabrir pelo link funciona de novo)
      try { const s = { ...(history.state || {}), ffRota: { area: 'lideres', secao: `q-${id}` } }; history.replaceState(s, '', location.pathname + location.search); P.rota = { area: 'lideres', secao: `q-${id}` }; } catch { /* nada */ }
    }
    iniciarPolling();
    return null;
  }

  function montarQuadro(casca) {
    const { quadro: q, lider, estagiarios, permissoes: perm } = est.dados;
    casca.style.setProperty('--cor', corValida(q.cor));
    const cab = h('header', { className: 'ld-qcab' },
      h('div', { className: 'ld-qcab__luz', 'aria-hidden': 'true' }),
      h('button', { type: 'button', className: 'ld-volta', on: { click: () => P.irPara({ area: 'lideres' }) } }, ic('voltar'), 'Quadros'),
      h('div', { className: 'ld-qcab__linha' },
        h('span', { className: 'ld-qcab__ic' }, ic(q.icone)),
        h('div', { className: 'ld-qcab__txt' },
          titulo(h('h1', { className: 'ld-qcab__nome', text: q.nome })),
          q.descricao ? h('p', { className: 'ld-qcab__desc', text: q.descricao }) : null),
        h('div', { className: 'ld-qcab__acoes' },
          perm.gerir ? h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => modalQuadro(est.dados, () => recarregar(true)) } }, ic('editar'), 'Editar quadro') : null,
          perm.criar ? h('button', { type: 'button', className: 'ld-botao', on: { click: () => modalTarefa() } }, ic('mais'), 'Nova tarefa') : null)),
      h('div', { className: 'ld-qcab__gente' },
        h('div', { className: 'ld-pessoa' }, avatar(lider?.nome, 'ld-av--lider'), h('span', null, h('small', { text: 'Líder' }), h('strong', { text: lider?.nome || '—' }))),
        h('div', { className: 'ld-equipe' },
          h('small', { text: estagiarios.length ? plural(estagiarios.length, 'estagiário', 'estagiários') : 'Sem estagiários' }),
          h('div', { className: 'ld-pilha' }, estagiarios.slice(0, 8).map((p) => h('span', { className: 'ld-av ld-av--p', title: p.nome, text: iniciais(p.nome) })),
            estagiarios.length > 8 ? h('span', { className: 'ld-av ld-av--p ld-av--mais', text: `+${estagiarios.length - 8}` }) : null)),
        perm.lider ? h('span', { className: 'ld-selo ld-selo--lima', text: 'Você lidera este quadro' }) : null,
        !perm.operar && est.eu?.papel === 'consultor' && q.status === 'ativo' ? h('span', { className: 'ld-selo', text: 'Leitura e comentários' }) : null),
      q.status === 'arquivado' ? h('p', { className: 'ld-faixa', role: 'note' }, ic('arquivo'), 'Quadro arquivado: só leitura.') : null,
      h('div', { className: 'ld-vistas', role: 'tablist', 'aria-label': 'Visualização' },
        [['kanban', 'Kanban', 'kanban'], perm.indicadores ? ['painel', 'Painel do quadro', 'painel'] : null, perm.equipe ? ['equipe', 'Gerenciar Equipe', 'pessoas'] : null].filter(Boolean).map(([id, t, i]) => h('button', { type: 'button', role: 'tab', className: 'ld-vistas__op', id: `ld-vista-${id}`, 'aria-selected': String(est.vista === id), 'aria-controls': 'ld-vista', data: { vista: id },
          on: { click: () => trocarVista(id) } }, ic(i), t))));
    const vista = h('div', { id: 'ld-vista', role: 'tabpanel', 'aria-labelledby': `ld-vista-${est.vista}`, className: 'ld-vista' });
    if (!['kanban', ...(perm.indicadores ? ['painel'] : []), ...(perm.equipe ? ['equipe'] : [])].includes(est.vista)) est.vista = 'kanban';
    casca.replaceChildren(faixaOrientacoes(q.id), cab, h('div', { className: 'ld-corpo ld-corpo--quadro' }, vista));
    const ind = MOV ? MOV.indicador(cab.querySelector('.ld-vistas'), '[aria-selected="true"]', 'ld-vistas__ind') : null;
    if (ind) est.limpar.push(() => ind.destruir());
    est.indVista = ind;
    desenharVista();
    revelar(casca);
  }

  function trocarVista(id) {
    if (est.vista === id) return;
    est.vista = id;
    est.no.querySelectorAll('.ld-vistas__op').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.vista === id)));
    est.no.querySelector('#ld-vista')?.setAttribute('aria-labelledby', `ld-vista-${id}`);
    est.indVista?.mover();
    const fazer = () => desenharVista();
    if (MOV && document.startViewTransition && !reduzido()) MOV.transicao(fazer); else fazer();
  }

  function desenharVista() {
    const alvo = est.no?.querySelector('#ld-vista');
    if (!alvo || !est.dados) return;
    if (est.vista === 'painel' && est.dados.dashboard) alvo.replaceChildren(dashboard());
    else if (est.vista === 'equipe') { equipe(alvo); return; }
    else alvo.replaceChildren(barraFiltros(), kanban());
    revelar(alvo);
  }

  /** Recarrega o quadro mantendo filtros, vista e o painel aberto. */
  async function recarregar(forcar = false) {
    const id = est.quadroId;
    const r = await carregarQuadro(id);
    if (est.quadroId !== id) return;
    if (r.erro) {
      if (r.erro.status === 404) { avisar('Você não tem mais acesso a este quadro.', 'erro'); P.irPara({ area: 'lideres' }); }
      return;
    }
    const mudouCab = forcar || JSON.stringify([r.quadro, r.lider, r.estagiarios, r.permissoes]) !== JSON.stringify([est.dados.quadro, est.dados.lider, est.dados.estagiarios, est.dados.permissoes]);
    est.dados = r; est.versao = r.quadro.versao;
    if (mudouCab) { montarQuadro(est.no); return; }
    if (est.vista !== 'kanban') { if (est.vista === 'painel') desenharVista(); return; }
    const k = est.no.querySelector('.ld-kanban');
    if (k) { if (MOV) MOV.layout(k, () => preencherKanban(k)); else preencherKanban(k); }
  }

  /* ---------- filtros e busca ---------- */
  function barraFiltros() {
    const { estagiarios, lider } = est.dados;
    const f = est.filtros;
    const pessoas = [...estagiarios, ...(lider ? [lider] : [])];
    const sel = (chave, rotulo, opcoes) => h('label', { className: 'ld-filtro' }, h('span', { className: 'ld-sr', text: rotulo }),
      h('select', { 'aria-label': rotulo, on: { change: (e) => { f[chave] = e.target.value; aplicarFiltros(); } } },
        opcoes.map(([v, t]) => h('option', { value: v, selected: f[chave] === v }, t))));
    const busca = h('label', { className: 'ld-busca ld-busca--quadro' }, ic('busca'), h('span', { className: 'ld-sr', text: 'Buscar tarefas' }),
      h('input', { type: 'search', placeholder: 'Buscar tarefas…', autocomplete: 'off', value: f.termo, on: { input: (e) => { f.termo = e.target.value; aplicarFiltros(); } } }));
    const limpar = h('button', { type: 'button', className: 'ld-limpar', hidden: true, on: { click: () => { est.filtros = filtrosVazios(); desenharVista(); } } }, ic('fechar'), 'Limpar');
    const doAlerta = f.ids ? h('span', { className: 'ld-filtro-alerta', role: 'status' }, ic('alerta'), h('span', { text: f.rotuloIds || 'Tarefas do alerta' }), h('strong', { text: String(f.ids.length) }),
      h('button', { type: 'button', 'aria-label': 'Remover o filtro do alerta', on: { click: () => { f.ids = null; f.rotuloIds = ''; desenharVista(); } } }, ic('fechar'))) : null;
    return h('div', { className: 'ld-filtros', role: 'search', 'aria-label': 'Filtrar tarefas do quadro' },
      doAlerta,
      busca,
      h('span', { className: 'ld-filtros__ic', 'aria-hidden': 'true' }, ic('filtro')),
      sel('resp', 'Responsável', [['', 'Todos os responsáveis'], ...(est.eu ? [['eu', 'Comigo']] : []), ['nenhum', 'Sem responsável'], ...pessoas.map((p) => [p.id, p.nome])]),
      sel('prio', 'Prioridade', [['', 'Toda prioridade'], ...PRIORIDADES]),
      sel('status', 'Status', [['', 'Todo status'], ...COLUNAS, ['bloqueada', 'Com impedimento']]),
      sel('prazo', 'Prazo', [['', 'Qualquer prazo'], ['atrasadas', 'Atrasadas'], ['hoje', 'Vence hoje'], ['semana', 'Próximos 7 dias'], ['sem', 'Sem prazo']]),
      limpar);
  }
  function passaFiltro(t) {
    const f = est.filtros;
    const hoje = est.dados.hoje;
    if (f.ids && !f.ids.includes(t.id)) return false;
    if (f.termo && !semAcento(`${t.titulo} ${t.descricao} ${t.responsavelNome || ''}`).includes(semAcento(f.termo.trim()))) return false;
    if (f.resp === 'eu' && t.responsavelId !== est.eu?.id) return false;
    if (f.resp === 'nenhum' && t.responsavelId) return false;
    if (f.resp && !['eu', 'nenhum'].includes(f.resp) && t.responsavelId !== f.resp) return false;
    if (f.prio && t.prioridade !== f.prio) return false;
    if (f.status === 'bloqueada' && !t.bloqueada) return false;
    if (f.status && f.status !== 'bloqueada' && t.status !== f.status) return false;
    if (f.prazo === 'atrasadas' && !t.atrasada) return false;
    if (f.prazo === 'hoje' && t.prazo !== hoje) return false;
    if (f.prazo === 'semana' && (!t.prazo || diasAte(t.prazo, hoje) < 0 || diasAte(t.prazo, hoje) > 7)) return false;
    if (f.prazo === 'sem' && t.prazo) return false;
    return true;
  }
  const filtrando = () => Object.entries(est.filtros).some(([k, v]) => k !== 'rotuloIds' && Boolean(v));
  const filtrosVazios = () => ({ termo: '', resp: '', prio: '', status: '', prazo: '', ids: null, rotuloIds: '' });
  let filtrosPendentes = null;
  /** Abre um quadro já filtrado (usado pela Visão Gerencial: "Ver tarefas" de um alerta ou de um indicador). */
  function abrirQuadroFiltrado(quadroId, filtros) {
    filtrosPendentes = { quadroId: String(quadroId), filtros };
    P.irPara({ area: 'lideres', secao: `q-${quadroId}` });
  }
  function aplicarFiltros() {
    const k = est.no.querySelector('.ld-kanban');
    if (!k) return;
    if (MOV) MOV.layout(k, () => preencherKanban(k)); else preencherKanban(k);
    const limpar = est.no.querySelector('.ld-limpar');
    if (limpar) limpar.hidden = !filtrando();
  }

  /* ---------- Kanban ---------- */
  const minhaTarefa = (t) => t.responsavelId && est.eu && t.responsavelId === String(est.eu.id);
  /** Espelho da regra do servidor (lib/lideres-regras.js), só para a tela; o servidor confere de novo. */
  function destinos(t) {
    const { quadro: q, permissoes: perm } = est.dados;
    if (q.status !== 'ativo') return [];
    if (perm.operar) return COLUNAS.map(([c]) => c).filter((c) => c !== t.status);
    if (est.eu?.papel === 'estagiario' && minhaTarefa(t)) {
      const m = perm.minhas || {};
      const base = m.mover ? ({ a_fazer: ['em_andamento'], em_andamento: ['a_fazer', 'em_revisao'] })[t.status] || [] : [];
      return m.concluir && ['em_andamento', 'em_revisao'].includes(t.status) ? [...base, 'concluido'] : base;
    }
    return [];
  }
  const podeReordenar = (t) => est.dados.quadro.status === 'ativo' && (est.dados.permissoes.operar || (est.eu?.papel === 'estagiario' && est.dados.permissoes.minhas?.mover && minhaTarefa(t) && ['a_fazer', 'em_andamento'].includes(t.status)));
  const podeArrastar = (t) => destinos(t).length > 0 || podeReordenar(t);

  function kanban() {
    const k = h('div', { className: 'ld-kanban', 'aria-label': 'Quadro Kanban. Use Alt + setas para mover a tarefa em foco; Enter abre a tarefa.' });
    preencherKanban(k);
    ligarArrasto(k);
    return k;
  }

  function preencherKanban(k) {
    const { tarefas, permissoes: perm, quadro: q } = est.dados;
    const visiveis = tarefas.filter(passaFiltro);
    const colunas = COLUNAS.filter(([c]) => !est.filtros.status || est.filtros.status === 'bloqueada' || est.filtros.status === c);
    k.style.setProperty('--ncol', String(colunas.length));
    k.replaceChildren(...colunas.map(([c, nome]) => {
      const daCol = visiveis.filter((t) => t.status === c).sort((a, b) => a.ordem - b.ordem || Number(a.id) - Number(b.id));
      const total = tarefas.filter((t) => t.status === c).length;
      const lista = h('ol', { className: 'ld-col__lista', data: { status: c }, 'aria-label': `${nome}: ${plural(daCol.length, 'tarefa', 'tarefas')}` }, daCol.map(cartao));
      return h('section', { className: `ld-col ld-col--${c}`, data: { status: c }, 'aria-labelledby': `ld-col-${c}` },
        h('header', { className: 'ld-col__cab' },
          h('span', { className: 'ld-col__ponto', 'aria-hidden': 'true' }),
          h('h2', { id: `ld-col-${c}`, className: 'ld-col__nome', text: nome }),
          h('span', { className: 'ld-col__n', title: filtrando() ? `${daCol.length} de ${total} com os filtros` : `${total} tarefas`, text: filtrando() && daCol.length !== total ? `${daCol.length}/${total}` : String(total) }),
          perm.operar && q.status === 'ativo' && c !== 'concluido' ? h('button', { type: 'button', className: 'ld-col__mais', 'aria-label': `Nova tarefa em ${nome}`, title: `Nova tarefa em ${nome}`, on: { click: () => modalTarefa(c) } }, ic('mais')) : null),
        lista,
        daCol.length ? null : h('p', { className: 'ld-col__vazia', text: filtrando() ? 'Nada com esses filtros.' : c === 'em_revisao' ? 'Nada aguardando revisão.' : c === 'concluido' ? 'Nenhuma tarefa aprovada ainda.' : 'Nenhuma tarefa aqui.' }));
    }));
  }

  function prazoChip(t) {
    if (!t.prazo) return null;
    const hoje = est.dados.hoje;
    const d = diasAte(t.prazo, hoje);
    const mod = t.status === 'concluido' ? '' : t.atrasada ? 'alerta' : d <= 1 ? 'aviso' : '';
    const txt = t.status !== 'concluido' && t.atrasada ? `Atrasada · ${dataCurta(t.prazo)}` : t.status !== 'concluido' && d === 0 ? 'Vence hoje' : t.status !== 'concluido' && d === 1 ? 'Vence amanhã' : dataCurta(t.prazo);
    return h('span', { className: `ld-chip${mod ? ` ld-chip--${mod}` : ''}`, title: `Prazo: ${dataLonga(`${t.prazo}T12:00:00`)}` }, ic('calendario'), txt);
  }

  function cartao(t) {
    const pode = podeArrastar(t);
    const li = h('li', { className: `ld-card${t.atrasada ? ' ld-card--atrasada' : ''}${t.bloqueada ? ' ld-card--bloqueada' : ''}${minhaTarefa(t) ? ' ld-card--minha' : ''}${pode ? ' ld-card--movel' : ''}`,
      tabindex: '0', 'data-id': t.id, 'data-flip': `t${t.id}`, 'data-prioridade': t.prioridade,
      'aria-label': `${t.titulo}. ${NOME_PRIO[t.prioridade]}. ${t.responsavelNome ? `Responsável: ${t.responsavelNome}.` : 'Sem responsável.'}${t.atrasada ? ' Atrasada.' : ''}${t.bloqueada ? ' Com impedimento.' : ''}`,
      on: { keydown: (e) => teclaCartao(e, t), click: (e) => { if (!e.target.closest('button') && !est.arrastou) abrirPainel(t.id); } } },
      h('div', { className: 'ld-card__topo' },
        h('span', { className: `ld-prio ld-prio--${t.prioridade}` }, h('i', { 'aria-hidden': 'true' }), NOME_PRIO[t.prioridade]),
        t.bloqueada ? h('span', { className: 'ld-chip ld-chip--alerta ld-chip--mini', title: t.motivoBloqueio || 'Impedimento' }, ic('bloqueio'), 'Impedida') : null,
        destinos(t).length ? h('button', { type: 'button', className: 'ld-card__menu', 'aria-label': `Mover "${t.titulo}"`, 'aria-haspopup': 'menu', on: { click: (e) => { e.stopPropagation(); menuMover(e.currentTarget, t); } } }, ic('pontos')) : null),
      h('h3', { className: 'ld-card__titulo', text: t.titulo }),
      t.descricao ? h('p', { className: 'ld-card__desc', text: t.descricao }) : null,
      h('div', { className: 'ld-card__meta' },
        prazoChip(t),
        t.checklist.total ? h('span', { className: `ld-chip${t.checklist.feitos === t.checklist.total ? ' ld-chip--ok' : ''}`, title: 'Checklist' }, ic('checklist'), `${t.checklist.feitos}/${t.checklist.total}`) : null,
        t.comentarios ? h('span', { className: 'ld-chip', title: 'Comentários' }, ic('comentario'), String(t.comentarios)) : null),
      h('footer', { className: 'ld-card__rodape' },
        t.responsavelNome ? h('span', { className: 'ld-card__resp' }, avatar(t.responsavelNome, 'ld-av--p'), h('span', { text: t.responsavelNome.split(/\s+/).slice(0, 2).join(' ') }))
          : h('span', { className: 'ld-card__resp ld-card__resp--vazio' }, h('span', { className: 'ld-av ld-av--p ld-av--vazio', 'aria-hidden': 'true' }, ic('usuario')), 'Sem responsável'),
        h('time', { className: 'ld-card__data', dateTime: t.criadoEm, title: `Criada em ${dataHora(t.criadoEm)}`, text: dataCurta(t.criadoEm) })));
    if (t.checklist.total) li.style.setProperty('--ck', `${Math.round((t.checklist.feitos * 100) / t.checklist.total)}%`);
    return li;
  }

  /* ---------- mover: menu, teclado e arrastar ---------- */
  async function mover(t, para, posicao, comentario) {
    const de = t.status;
    const antes = est.dados.tarefas.map((x) => ({ ...x }));
    // otimista: muda já na tela, desfaz se o servidor recusar
    const daCol = est.dados.tarefas.filter((x) => x.status === para && x.id !== t.id).sort((a, b) => a.ordem - b.ordem);
    daCol.splice(posicao == null ? daCol.length : Math.min(posicao, daCol.length), 0, t);
    t.status = para;
    daCol.forEach((x, i) => { x.ordem = i + 1; });
    redesenharKanban();
    const r = await api('POST', `acao=mover&tarefa=${t.id}`, { status: para, ...(posicao == null ? {} : { posicao }), ...(comentario ? { comentario } : {}) });
    if (r.erro) {
      est.dados.tarefas = antes; redesenharKanban();
      avisar(r.erro.mensagem, 'erro');
      return false;
    }
    Object.assign(est.dados.tarefas.find((x) => x.id === t.id) || {}, r.tarefa);
    if (de !== para) {
      const msg = para === 'em_revisao' ? 'Enviada para revisão. O líder foi avisado.' : de === 'em_revisao' && para === 'concluido' ? 'Tarefa aprovada.' : de === 'em_revisao' ? 'Ajuste pedido ao responsável.' : `Movida para ${NOME_COL[para]}.`;
      avisar(msg); anunciar(`${t.titulo}: ${msg}`);
    }
    recarregar();
    if (est.painelId === t.id) carregarPainel(t.id);
    return true;
  }
  function redesenharKanban() {
    const k = est.no?.querySelector('.ld-kanban');
    if (!k) return;
    if (MOV) MOV.layout(k, () => preencherKanban(k)); else preencherKanban(k);
  }
  function focarCartao(id) { requestAnimationFrame(() => est.no?.querySelector(`.ld-card[data-id="${id}"]`)?.focus({ preventScroll: false })); }

  function teclaCartao(e, t) {
    if (e.key === 'Enter' || e.key === ' ') { if (e.target === e.currentTarget) { e.preventDefault(); abrirPainel(t.id); } return; }
    if (!e.altKey || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    const ordemCols = COLUNAS.map(([c]) => c);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const passo = e.key === 'ArrowRight' ? 1 : -1;
      const ok = destinos(t);
      let i = ordemCols.indexOf(t.status) + passo;
      while (i >= 0 && i < ordemCols.length && !ok.includes(ordemCols[i])) i += passo;
      if (i < 0 || i >= ordemCols.length) { anunciar('Não é possível mover para esse lado.'); return; }
      mover(t, ordemCols[i]).then(() => focarCartao(t.id));
    } else {
      if (!podeReordenar(t)) { anunciar('Você não pode reordenar esta tarefa.'); return; }
      const col = est.dados.tarefas.filter((x) => x.status === t.status).sort((a, b) => a.ordem - b.ordem);
      const i = col.findIndex((x) => x.id === t.id) + (e.key === 'ArrowDown' ? 1 : -1);
      if (i < 0 || i >= col.length) return;
      mover(t, t.status, i).then(() => { focarCartao(t.id); anunciar(`Posição ${i + 1} de ${col.length} em ${NOME_COL[t.status]}.`); });
    }
  }

  function menuMover(botao, t) {
    document.querySelector('.ld-menu')?.remove();
    const fechar = () => { menu.remove(); document.removeEventListener('pointerdown', fora, true); botao.setAttribute('aria-expanded', 'false'); };
    const fora = (e) => { if (!menu.contains(e.target) && e.target !== botao) fechar(); };
    const rotulo = (c) => (t.status === 'em_revisao' && c === 'concluido' ? 'Aprovar (Concluído)' : t.status === 'em_revisao' && c === 'em_andamento' ? 'Pedir ajuste (Em Andamento)' : c === 'em_revisao' ? 'Enviar para revisão' : NOME_COL[c]);
    const menu = h('div', { className: 'ld-menu', role: 'menu', 'aria-label': 'Mover para' },
      h('p', { className: 'ld-menu__t', text: 'Mover para' }),
      destinos(t).map((c) => h('button', { type: 'button', role: 'menuitem', className: `ld-menu__op ld-menu__op--${c}`, on: { click: () => { fechar(); mover(t, c).then(() => focarCartao(t.id)); } } }, h('span', { className: `ld-ponto-col ld-ponto-col--${c}`, 'aria-hidden': 'true' }), rotulo(c))));
    document.body.append(menu);
    const b = botao.getBoundingClientRect();
    const larg = 230;
    menu.style.left = `${Math.max(8, Math.min(innerWidth - larg - 8, b.right - larg))}px`;
    menu.style.top = `${Math.min(innerHeight - menu.offsetHeight - 8, b.bottom + 6)}px`;
    botao.setAttribute('aria-expanded', 'true');
    menu.querySelector('button')?.focus();
    menu.addEventListener('keydown', (e) => {
      const ops = [...menu.querySelectorAll('button')];
      const i = ops.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); fechar(); botao.focus(); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); ops[(i + (e.key === 'ArrowDown' ? 1 : -1) + ops.length) % ops.length].focus(); }
      if (e.key === 'Tab') fechar();
    });
    setTimeout(() => document.addEventListener('pointerdown', fora, true));
  }

  /** Arrastar e soltar com Pointer Events (mouse: começa ao mover 6 px; toque: pressionar e segurar 320 ms). */
  function ligarArrasto(k) {
    k.addEventListener('pointerdown', (e) => {
      const card = e.target.closest('.ld-card');
      if (!card || e.button !== 0 || e.target.closest('button, a, input, select, textarea')) return;
      const t = est.dados.tarefas.find((x) => x.id === card.dataset.id);
      if (!t || !podeArrastar(t)) return;
      const toque = e.pointerType !== 'mouse';
      const x0 = e.clientX, y0 = e.clientY;
      let ativo = false, fantasma = null, marcador = null, alvoCol = null, alvoPos = 0, offX = 0, offY = 0, segurar = null, rolar = null;
      est.arrastou = false;
      const ok = new Set([t.status, ...destinos(t)]);
      if (!podeReordenar(t)) ok.delete(t.status);

      const comecar = () => {
        ativo = true; est.arrastando = true; est.arrastou = true;
        const r = card.getBoundingClientRect();
        offX = x0 - r.left; offY = y0 - r.top;
        fantasma = card.cloneNode(true);
        fantasma.className += ' ld-card--fantasma';
        fantasma.removeAttribute('data-flip'); fantasma.setAttribute('aria-hidden', 'true');
        fantasma.style.width = `${r.width}px`;
        document.body.append(fantasma);
        marcador = h('li', { className: 'ld-marcador', 'aria-hidden': 'true', style: { height: `${r.height}px` } });
        card.classList.add('ld-card--origem');
        k.classList.add('ld-kanban--arrastando');
        k.querySelectorAll('.ld-col').forEach((c) => c.classList.toggle('ld-col--proibida', !ok.has(c.dataset.status)));
        if (toque) document.addEventListener('touchmove', travarToque, { passive: false });
        if (navigator.vibrate && toque) navigator.vibrate(8);
      };
      const travarToque = (ev) => ev.preventDefault();
      const mexer = (ev) => {
        if (!ativo) {
          const dist = Math.hypot(ev.clientX - x0, ev.clientY - y0);
          if (toque) { if (dist > 8) cancelar(); return; }
          if (dist < 6) return;
          comecar();
        }
        ev.preventDefault();
        fantasma.style.transform = `translate3d(${ev.clientX - offX}px, ${ev.clientY - offY}px, 0) rotate(${reduzido() ? 0 : 1.6}deg)`;
        // rolagem automática do Kanban na horizontal (celular) e da página na vertical
        clearInterval(rolar);
        const kr = k.getBoundingClientRect();
        const dx = ev.clientX < kr.left + 40 ? -14 : ev.clientX > kr.right - 40 ? 14 : 0;
        const dy = ev.clientY < 80 ? -14 : ev.clientY > innerHeight - 80 ? 14 : 0;
        if (dx || dy) rolar = setInterval(() => { k.scrollLeft += dx; scrollBy(0, dy); }, 16);
        fantasma.style.visibility = 'hidden';
        const sob = document.elementFromPoint(ev.clientX, ev.clientY);
        fantasma.style.visibility = '';
        const col = sob?.closest('.ld-col');
        k.querySelectorAll('.ld-col--alvo').forEach((c) => c.classList.remove('ld-col--alvo'));
        if (!col || !ok.has(col.dataset.status)) { alvoCol = null; marcador.remove(); return; }
        col.classList.add('ld-col--alvo');
        const listaEl = col.querySelector('.ld-col__lista');
        const outros = [...listaEl.querySelectorAll('.ld-card:not(.ld-card--origem)')];
        let pos = outros.findIndex((c) => { const b = c.getBoundingClientRect(); return ev.clientY < b.top + b.height / 2; });
        if (pos < 0) pos = outros.length;
        alvoCol = col.dataset.status; alvoPos = pos;
        if (outros[pos]) listaEl.insertBefore(marcador, outros[pos]); else listaEl.append(marcador);
      };
      const terminar = (soltou) => {
        clearTimeout(segurar); clearInterval(rolar);
        removeEventListener('pointermove', mexer); removeEventListener('pointerup', aoSoltar); removeEventListener('pointercancel', aoCancelar);
        document.removeEventListener('touchmove', travarToque);
        if (!ativo) return;
        fantasma?.remove(); marcador?.remove();
        card.classList.remove('ld-card--origem');
        k.classList.remove('ld-kanban--arrastando');
        k.querySelectorAll('.ld-col--alvo, .ld-col--proibida').forEach((c) => c.classList.remove('ld-col--alvo', 'ld-col--proibida'));
        est.arrastando = false;
        setTimeout(() => { est.arrastou = false; }, 50);
        if (!soltou || !alvoCol) return;
        // posição em relação à coluna inteira (com filtros, a lista na tela pode ter menos cartões)
        const naTela = [...k.querySelectorAll(`.ld-col__lista[data-status="${alvoCol}"] .ld-card:not(.ld-card--origem)`)].map((c) => c.dataset.id);
        const depoisDe = naTela[alvoPos - 1];
        const col = est.dados.tarefas.filter((x) => x.status === alvoCol && x.id !== t.id).sort((a, b) => a.ordem - b.ordem);
        const posicao = depoisDe ? col.findIndex((x) => x.id === depoisDe) + 1 : naTela[0] ? Math.max(0, col.findIndex((x) => x.id === naTela[0])) : 0;
        if (alvoCol === t.status && col.findIndex((x) => x.id === t.id) === posicao) return;
        const atual = est.dados.tarefas.filter((x) => x.status === t.status).sort((a, b) => a.ordem - b.ordem).findIndex((x) => x.id === t.id);
        if (alvoCol === t.status && atual === posicao) return;
        mover(t, alvoCol, posicao);
      };
      const aoSoltar = () => terminar(true);
      const aoCancelar = () => terminar(false);
      const cancelar = () => terminar(false);
      addEventListener('pointermove', mexer, { passive: false });
      addEventListener('pointerup', aoSoltar);
      addEventListener('pointercancel', aoCancelar);
      if (toque) segurar = setTimeout(comecar, 320);
    });
    // contexto do toque longo: sem menu do navegador sobre o cartão
    k.addEventListener('contextmenu', (e) => { if (e.target.closest('.ld-card--movel')) e.preventDefault(); });
  }

  /* ============================================================
     3. Painel lateral da tarefa
     ============================================================ */
  function abrirPainel(id) {
    if (!est.dados) return;
    const voltarFoco = document.activeElement;
    if (!est.painel) {
      const veu = h('div', { className: 'ld-painel-veu', on: { click: () => fecharPainel() } });
      const aside = h('aside', { className: 'ld-painel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ld-painel-titulo', tabindex: '-1',
        on: { keydown: (e) => prenderFoco(e, aside) } });
      document.body.append(veu, aside);
      est.painel = { veu, aside, voltarFoco };
      requestAnimationFrame(() => { veu.classList.add('ld-painel-veu--aberto'); aside.classList.add('ld-painel--aberto'); });
      document.body.classList.add('ld-sem-rolagem');
    }
    est.painelId = String(id);
    carregarPainel(String(id), true);
  }
  // Esc fecha o painel mesmo quando o foco saiu dele (ex.: depois de um botão que redesenha o conteúdo).
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !est.painel || e.defaultPrevented || document.querySelector('dialog[open], .ld-menu, .ld-notifs')) return;
    e.preventDefault(); fecharPainel();
  });
  function fecharPainel(imediato = false) {
    const p = est.painel;
    if (!p) return;
    est.painel = null; est.painelId = null;
    document.body.classList.remove('ld-sem-rolagem');
    const tirar = () => { p.veu.remove(); p.aside.remove(); };
    if (imediato || reduzido()) tirar();
    else { p.veu.classList.remove('ld-painel-veu--aberto'); p.aside.classList.remove('ld-painel--aberto'); setTimeout(tirar, 320); }
    if (!imediato && p.voltarFoco?.isConnected) p.voltarFoco.focus();
  }
  function prenderFoco(e, raiz) {
    if (e.key !== 'Tab') return;
    const f = [...raiz.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((x) => !x.disabled && x.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  }

  async function carregarPainel(id, primeira = false) {
    const p = est.painel;
    if (!p) return;
    if (primeira) p.aside.replaceChildren(h('div', { className: 'ld-painel__cab' }, h('span', { className: 'ld-painel__quadro', text: est.dados.quadro.nome }), botaoFechar()), carregando('Abrindo a tarefa…'));
    const r = await api('GET', `tarefa=${encodeURIComponent(id)}`);
    if (est.painel !== p || est.painelId !== id) return;
    if (r.erro) { p.aside.replaceChildren(h('div', { className: 'ld-painel__cab' }, h('span', { className: 'ld-painel__quadro', text: est.dados.quadro.nome }), botaoFechar()), falha(r.erro.status === 404 ? { status: 0, mensagem: 'A tarefa não existe mais ou saiu do seu alcance.' } : r)); return; }
    // não atrapalha quem está digitando um comentário
    const rascunho = p.aside.querySelector('.ld-compor textarea')?.value || '';
    const rolagem = p.aside.querySelector('.ld-painel__corpo')?.scrollTop || 0;
    p.dados = r;
    p.aside.replaceChildren(...conteudoPainel(r));
    const ta = p.aside.querySelector('.ld-compor textarea');
    if (ta && rascunho) ta.value = rascunho;
    const corpo = p.aside.querySelector('.ld-painel__corpo');
    if (corpo) corpo.scrollTop = rolagem;
    if (primeira || document.activeElement === document.body) p.aside.focus({ preventScroll: true });
  }
  const botaoFechar = () => h('button', { type: 'button', className: 'ld-icone-btn', 'aria-label': 'Fechar a tarefa', title: 'Fechar (Esc)', on: { click: () => fecharPainel() } }, ic('fechar'));

  async function salvarCampo(id, corpo, msg) {
    const r = await api('PATCH', `tarefa=${id}`, corpo);
    if (r.erro) { avisar(r.erro.mensagem, 'erro'); carregarPainel(id); return false; }
    const t = est.dados.tarefas.find((x) => x.id === id);
    if (t) Object.assign(t, r.tarefa);
    if (msg) avisar(msg);
    carregarPainel(id);
    redesenharKanban();
    return true;
  }

  function conteudoPainel(r) {
    const t = r.tarefa;
    const perm = r.permissoes;
    const pode = (campo) => perm.editar.includes(campo);
    const { estagiarios, lider, hoje } = est.dados;
    const pessoas = [...estagiarios, ...(lider ? [lider] : [])];

    /* cabeçalho: quadro, status e ações de fluxo */
    const cab = h('div', { className: 'ld-painel__cab' },
      h('span', { className: 'ld-painel__quadro' }, h('i', { 'aria-hidden': 'true' }), est.dados.quadro.nome),
      perm.excluir ? h('button', { type: 'button', className: 'ld-icone-btn ld-icone-btn--perigo', 'aria-label': 'Excluir tarefa', title: 'Excluir tarefa', on: { click: () => excluirTarefa(t) } }, ic('lixo')) : null,
      botaoFechar());

    const tituloEl = pode('titulo')
      ? h('textarea', { id: 'ld-painel-titulo', className: 'ld-painel__titulo ld-editavel', rows: '1', maxlength: '140', 'aria-label': 'Título da tarefa', value: t.titulo,
        on: { input: (e) => autoAltura(e.target), blur: (e) => { const v = e.target.value.trim(); if (v.length >= 2 && v !== t.titulo) salvarCampo(t.id, { titulo: v }, 'Título salvo.'); else e.target.value = t.titulo; },
          keydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); e.target.blur(); } } } })
      : h('h2', { id: 'ld-painel-titulo', className: 'ld-painel__titulo', tabindex: '-1', text: t.titulo });
    requestAnimationFrame(() => { if (tituloEl.tagName === 'TEXTAREA') autoAltura(tituloEl); });

    const status = h('div', { className: 'ld-painel__status' },
      h('span', { className: `ld-status ld-status--${t.status}` }, h('i', { 'aria-hidden': 'true' }), NOME_COL[t.status]),
      t.atrasada ? h('span', { className: 'ld-chip ld-chip--alerta' }, ic('relogio'), 'Atrasada') : null,
      t.bloqueada ? h('span', { className: 'ld-chip ld-chip--alerta' }, ic('bloqueio'), 'Com impedimento') : null);

    const fluxo = acoesDeFluxo(t, perm);

    /* campos */
    const campo = (rotulo, icone, conteudo) => h('div', { className: 'ld-campo' }, h('dt', null, ic(icone), rotulo), h('dd', null, conteudo));
    const respSel = pode('responsavel_id')
      ? h('select', { className: 'ld-campo__sel', 'aria-label': 'Responsável', on: { change: (e) => salvarCampo(t.id, { responsavel_id: e.target.value || null }, e.target.value ? 'Tarefa distribuída.' : 'Responsável removido.') } },
        h('option', { value: '' }, 'Sem responsável'), pessoas.map((p) => h('option', { value: p.id, selected: p.id === t.responsavelId }, p.id === lider?.id ? `${p.nome} (líder)` : p.nome)))
      : h('span', { className: 'ld-campo__val' }, t.responsavelNome ? [avatar(t.responsavelNome, 'ld-av--p'), t.responsavelNome] : 'Sem responsável');
    const prioSel = pode('prioridade')
      ? h('select', { className: 'ld-campo__sel', 'aria-label': 'Prioridade', on: { change: (e) => salvarCampo(t.id, { prioridade: e.target.value }, 'Prioridade atualizada.') } }, PRIORIDADES.map(([v, n]) => h('option', { value: v, selected: v === t.prioridade }, n)))
      : h('span', { className: `ld-prio ld-prio--${t.prioridade}` }, h('i', { 'aria-hidden': 'true' }), NOME_PRIO[t.prioridade]);
    const prazoIn = pode('prazo')
      ? h('input', { type: 'date', className: 'ld-campo__sel', 'aria-label': 'Prazo', value: t.prazo || '', on: { change: (e) => salvarCampo(t.id, { prazo: e.target.value || null }, e.target.value ? 'Prazo definido.' : 'Prazo removido.') } })
      : h('span', { className: 'ld-campo__val' }, t.prazo ? `${dataLonga(`${t.prazo}T12:00:00`)}${t.status !== 'concluido' && !t.atrasada ? ` · ${diasAte(t.prazo, hoje) === 0 ? 'hoje' : diasAte(t.prazo, hoje) === 1 ? 'amanhã' : `em ${diasAte(t.prazo, hoje)} dias`}` : ''}` : 'Sem prazo');
    const campos = h('dl', { className: 'ld-campos' },
      campo('Responsável', 'usuario', respSel),
      campo('Prioridade', 'alerta', prioSel),
      campo('Prazo', 'calendario', prazoIn),
      campo('Criada', 'relogio', h('span', { className: 'ld-campo__val', text: dataHora(t.criadoEm) })),
      t.concluidoEm ? campo('Concluída', 'aprovar', h('span', { className: 'ld-campo__val', text: dataHora(t.concluidoEm) })) : null);

    /* descrição */
    const desc = pode('descricao')
      ? h('textarea', { className: 'ld-desc ld-editavel', rows: '3', maxlength: '4000', placeholder: 'Descreva o que precisa ser feito, o critério de pronto e onde estão os materiais…', 'aria-label': 'Descrição', value: t.descricao,
        on: { input: (e) => autoAltura(e.target), blur: (e) => { const v = e.target.value.trim(); if (v !== t.descricao) salvarCampo(t.id, { descricao: v }, 'Descrição salva.'); } } })
      : h('p', { className: `ld-desc${t.descricao ? '' : ' ld-desc--vazia'}`, text: t.descricao || 'Sem descrição.' });
    requestAnimationFrame(() => { if (desc.tagName === 'TEXTAREA') autoAltura(desc); });

    return [cab, h('div', { className: 'ld-painel__corpo' },
      h('div', { className: 'ld-painel__topo' }, status, tituloEl, fluxo),
      impedimento(t, perm),
      campos,
      secao('Descrição', 'editar', desc),
      secao('Checklist', 'checklist', checklist(r), r.checklist.length ? `${r.checklist.filter((c) => c.feito).length}/${r.checklist.length}` : ''),
      secao('Comentários', 'comentario', comentarios(r), r.comentarios.length ? String(r.comentarios.length) : ''),
      secao('Histórico', 'historico', historico(r)))];
  }
  const secao = (t, icone, conteudo, contagem) => h('section', { className: 'ld-psec' }, h('h3', { className: 'ld-psec__t' }, ic(icone), t, contagem ? h('span', { className: 'ld-psec__n', text: contagem }) : null), conteudo);
  function autoAltura(el) { el.style.height = 'auto'; el.style.height = `${el.scrollHeight + 2}px`; }

  function acoesDeFluxo(t, perm) {
    const ok = perm.mover || [];
    const caixa = h('div', { className: 'ld-fluxo' });
    const botao = (para, rotulo, icone, mod = '') => h('button', { type: 'button', className: `ld-botao ${mod}`, on: { click: () => mover(est.dados.tarefas.find((x) => x.id === t.id) || t, para) } }, ic(icone), rotulo);
    if (est.dados.permissoes.operar && t.status === 'em_revisao') {
      const nota = h('div', { className: 'ld-nota', hidden: true },
        h('label', { className: 'ld-rotulo', for: 'ld-nota-ajuste', text: 'O que precisa ser ajustado?' }),
        h('textarea', { id: 'ld-nota-ajuste', rows: '3', maxlength: '2000', placeholder: 'Ex.: faltou anexar a planilha final de produtos.' }),
        h('div', { className: 'ld-nota__acoes' },
          h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => { nota.hidden = true; } } }, 'Cancelar'),
          h('button', { type: 'button', className: 'ld-botao ld-botao--aviso', on: { click: () => { const txt = nota.querySelector('textarea').value.trim(); if (!txt) { nota.querySelector('textarea').focus(); avisar('Escreva o ajuste para o estagiário entender.', 'erro'); return; } mover(est.dados.tarefas.find((x) => x.id === t.id) || t, 'em_andamento', null, txt); } } }, ic('ajuste'), 'Devolver para ajuste')));
      caixa.append(
        h('p', { className: 'ld-fluxo__dica', text: 'Esta tarefa aguarda a sua revisão.' }),
        h('div', { className: 'ld-fluxo__botoes' },
          botao('concluido', 'Aprovar', 'aprovar'),
          h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => { nota.hidden = false; nota.querySelector('textarea').focus(); } } }, ic('ajuste'), 'Pedir ajuste')),
        nota);
      return caixa;
    }
    if (!est.dados.permissoes.operar) {
      if (t.status === 'em_revisao' && perm.atualizar && ok.includes('concluido')) { caixa.append(h('div', { className: 'ld-fluxo__botoes' }, botao('concluido', 'Concluir', 'aprovar'))); return caixa; }
      if (t.status === 'em_revisao' && perm.atualizar) { caixa.append(h('p', { className: 'ld-fluxo__dica ld-fluxo__dica--lima' }, ic('relogio'), 'Enviada para revisão. Aguarde a aprovação ou o pedido de ajuste do líder.')); return caixa; }
      if (t.status === 'concluido' && perm.atualizar) { caixa.append(h('p', { className: 'ld-fluxo__dica ld-fluxo__dica--lima' }, ic('aprovar'), 'Aprovada pelo líder.')); return caixa; }
      const bts = [];
      if (ok.includes('em_andamento') && t.status === 'a_fazer') bts.push(botao('em_andamento', 'Iniciar tarefa', 'seta'));
      if (ok.includes('em_revisao')) bts.push(botao('em_revisao', 'Enviar para revisão', 'enviar'));
      if (ok.includes('concluido')) bts.push(botao('concluido', 'Concluir', 'aprovar', ok.includes('em_revisao') ? 'ld-botao--sec' : ''));
      if (ok.includes('a_fazer')) bts.push(botao('a_fazer', 'Voltar para A Fazer', 'voltar', 'ld-botao--sec'));
      if (bts.length) caixa.append(h('div', { className: 'ld-fluxo__botoes' }, bts));
      else if (!perm.atualizar) caixa.append(h('p', { className: 'ld-fluxo__dica', text: est.eu?.papel === 'consultor' ? 'Só o líder do quadro altera esta tarefa. Você pode comentar.' : 'Esta tarefa é de outra pessoa. Você pode comentar.' }));
      return caixa;
    }
    if (ok.length) {
      caixa.append(h('label', { className: 'ld-mover' }, h('span', { text: 'Mover para' }),
        h('select', { 'aria-label': 'Mover para', on: { change: (e) => { if (e.target.value) mover(est.dados.tarefas.find((x) => x.id === t.id) || t, e.target.value); } } },
          h('option', { value: '' }, NOME_COL[t.status]), ok.map((c) => h('option', { value: c }, NOME_COL[c])))));
    }
    return caixa;
  }

  function impedimento(t, perm) {
    const pode = perm.editar.includes('bloqueada');
    if (t.bloqueada) {
      return h('div', { className: 'ld-imped', role: 'note' }, ic('bloqueio'),
        h('div', null, h('strong', { text: 'Impedimento sinalizado' }), h('p', { text: t.motivoBloqueio || 'Sem motivo informado.' })),
        pode ? h('button', { type: 'button', className: 'ld-botao ld-botao--sec ld-botao--mini', on: { click: () => salvarCampo(t.id, { bloqueada: false }, 'Impedimento removido.') } }, 'Resolvido') : null);
    }
    if (!pode || t.status === 'concluido') return null;
    const form = h('form', { className: 'ld-imped-form', hidden: true, on: { submit: (e) => { e.preventDefault(); const v = form.querySelector('textarea').value.trim(); if (!v) { avisar('Descreva o impedimento para o líder entender.', 'erro'); return; } salvarCampo(t.id, { bloqueada: true, motivo_bloqueio: v }, 'Impedimento sinalizado. Ele aparece no cartão para o líder.'); } } },
      h('label', { className: 'ld-rotulo', for: 'ld-imped-motivo', text: 'O que está impedindo?' }),
      h('textarea', { id: 'ld-imped-motivo', rows: '2', maxlength: '300', placeholder: 'Ex.: aguardando o acesso do cliente ao ambiente.' }),
      h('div', { className: 'ld-nota__acoes' },
        h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => { form.hidden = true; abrir.hidden = false; } } }, 'Cancelar'),
        h('button', { type: 'submit', className: 'ld-botao ld-botao--aviso' }, ic('bloqueio'), 'Sinalizar')));
    const abrir = h('button', { type: 'button', className: 'ld-link-imped', on: { click: () => { form.hidden = false; abrir.hidden = true; form.querySelector('textarea').focus(); } } }, ic('bloqueio'), 'Sinalizar impedimento');
    return h('div', null, abrir, form);
  }

  function checklist(r) {
    const t = r.tarefa;
    const pode = r.permissoes.atualizar;
    const gerir = r.permissoes.checklistGerir;
    const feitos = r.checklist.filter((c) => c.feito).length;
    const pct = r.checklist.length ? Math.round((feitos * 100) / r.checklist.length) : 0;
    const itens = h('ul', { className: 'ld-ck' }, r.checklist.map((c) => h('li', { className: `ld-ck__item${c.feito ? ' ld-ck__item--feito' : ''}` },
      h('label', null,
        h('input', { type: 'checkbox', checked: c.feito, disabled: !pode,
          on: { change: async (e) => {
            const li = e.target.closest('li'); li.classList.toggle('ld-ck__item--feito', e.target.checked);
            const x = await api('PATCH', `item=${c.id}`, { feito: e.target.checked });
            if (x.erro) { avisar(x.erro.mensagem, 'erro'); e.target.checked = !e.target.checked; li.classList.toggle('ld-ck__item--feito', e.target.checked); return; }
            const tt = est.dados.tarefas.find((y) => y.id === t.id);
            if (tt) { tt.checklist.feitos += e.target.checked ? 1 : -1; redesenharKanban(); }
            carregarPainel(t.id);
          } } }),
        h('span', { className: 'ld-ck__caixa', 'aria-hidden': 'true' }, ic('check')),
        h('span', { className: 'ld-ck__txt', text: c.texto })),
      c.feito && c.feitoPor ? h('small', { className: 'ld-ck__por', text: `${c.feitoPor.split(/\s+/)[0]} · ${relativo(c.feitoEm)}` }) : null,
      gerir ? h('button', { type: 'button', className: 'ld-icone-btn ld-icone-btn--mini', 'aria-label': `Remover item "${c.texto}"`, on: { click: async () => { const x = await api('DELETE', `item=${c.id}`); if (x.erro) avisar(x.erro.mensagem, 'erro'); else { const tt = est.dados.tarefas.find((y) => y.id === t.id); if (tt) { tt.checklist.total -= 1; if (c.feito) tt.checklist.feitos -= 1; redesenharKanban(); } carregarPainel(t.id); } } } }, ic('fechar')) : null)));
    const novo = gerir ? h('form', { className: 'ld-ck__novo', on: { submit: async (e) => {
      e.preventDefault();
      const inp = e.currentTarget.querySelector('input'); const v = inp.value.trim(); if (!v) return;
      const x = await api('POST', `acao=checklist&tarefa=${t.id}`, { texto: v });
      if (x.erro) { avisar(x.erro.mensagem, 'erro'); return; }
      const tt = est.dados.tarefas.find((y) => y.id === t.id); if (tt) { tt.checklist.total += 1; redesenharKanban(); }
      await carregarPainel(t.id);
      est.painel?.aside.querySelector('.ld-ck__novo input')?.focus();
    } } }, h('input', { type: 'text', maxlength: '200', placeholder: 'Adicionar item ao checklist…', 'aria-label': 'Novo item do checklist' }), h('button', { type: 'submit', className: 'ld-icone-btn', 'aria-label': 'Adicionar item' }, ic('mais'))) : null;
    return h('div', null,
      r.checklist.length ? h('div', { className: 'ld-barra ld-barra--fina', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-label': 'Checklist concluído' }, h('span', { style: { '--p': `${pct}%` } })) : null,
      r.checklist.length ? itens : h('p', { className: 'ld-nada', text: gerir ? 'Quebre a tarefa em passos para o estagiário marcar.' : 'Sem itens de checklist.' }),
      novo);
  }

  /* comentários com @menção (autocompletar entre quem participa do quadro) */
  function textoComMencoes(txt, mencionaveis) {
    const logins = new Set(mencionaveis.map((m) => m.login.toLowerCase()));
    const p = h('p', { className: 'ld-com__txt' });
    let ultimo = 0;
    for (const m of String(txt).matchAll(/(^|[^\w.@-])@([a-zA-Z0-9._-]{3,60})/g)) {
      const ini = m.index + m[1].length;
      const login = m[2].replace(/[.]+$/, '');
      if (!logins.has(login.toLowerCase())) continue;
      p.append(txt.slice(ultimo, ini), h('mark', { className: 'ld-mencao', text: `@${login}`, title: mencionaveis.find((x) => x.login.toLowerCase() === login.toLowerCase())?.nome }));
      ultimo = ini + 1 + login.length;
    }
    p.append(txt.slice(ultimo));
    return p;
  }
  function comentarios(r) {
    const t = r.tarefa;
    const lista = r.comentarios.length
      ? h('ol', { className: 'ld-coms' }, r.comentarios.map((c) => h('li', { className: `ld-com${c.autorId === String(est.eu?.id) ? ' ld-com--meu' : ''}` },
        avatar(c.autorNome, 'ld-av--p'),
        h('div', { className: 'ld-com__corpo' },
          h('p', { className: 'ld-com__cab' }, h('strong', { text: c.autorNome }), est.dados.lider?.id === c.autorId ? h('span', { className: 'ld-selo ld-selo--mini ld-selo--lima', text: 'Líder' }) : null,
            h('time', { dateTime: c.criadoEm, title: dataHora(c.criadoEm), text: relativo(c.criadoEm) })),
          textoComMencoes(c.texto, r.mencionaveis)))))
      : h('p', { className: 'ld-nada', text: 'Nenhum comentário ainda.' });
    if (!r.permissoes.comentar) return lista;
    const ta = h('textarea', { rows: '2', maxlength: '2000', placeholder: 'Escreva um comentário. Use @ para mencionar alguém.', 'aria-label': 'Novo comentário', 'aria-autocomplete': 'list', 'aria-controls': 'ld-mencoes' });
    const sugestoes = h('ul', { id: 'ld-mencoes', className: 'ld-mencoes', role: 'listbox', hidden: true });
    let opcoes = [], ativo = 0, inicio = -1;
    const fechar = () => { sugestoes.hidden = true; opcoes = []; ta.removeAttribute('aria-activedescendant'); };
    const escolher = (m) => {
      const antes = ta.value.slice(0, inicio), depois = ta.value.slice(ta.selectionStart);
      ta.value = `${antes}@${m.login} ${depois}`;
      const pos = antes.length + m.login.length + 2;
      ta.setSelectionRange(pos, pos); ta.focus(); fechar();
    };
    const marcar = () => { [...sugestoes.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === ativo))); if (sugestoes.children[ativo]) ta.setAttribute('aria-activedescendant', sugestoes.children[ativo].id); };
    ta.addEventListener('input', () => {
      autoAltura(ta);
      const ate = ta.value.slice(0, ta.selectionStart);
      const m = /(^|\s)@([\w.-]{0,30})$/.exec(ate);
      if (!m) { fechar(); return; }
      inicio = ate.length - m[2].length - 1;
      const q = semAcento(m[2]);
      opcoes = r.mencionaveis.filter((x) => x.id !== String(est.eu?.id) && (semAcento(x.nome).includes(q) || x.login.toLowerCase().includes(q))).slice(0, 6);
      if (!opcoes.length) { fechar(); return; }
      ativo = 0;
      sugestoes.replaceChildren(...opcoes.map((x, i) => h('li', { id: `ld-men-${i}`, role: 'option', className: 'ld-mencoes__op', on: { mousedown: (e) => { e.preventDefault(); escolher(x); } } }, avatar(x.nome, 'ld-av--p'), h('span', null, h('strong', { text: x.nome }), h('small', { text: `@${x.login}` })))));
      sugestoes.hidden = false; marcar();
    });
    ta.addEventListener('keydown', (e) => {
      if (!sugestoes.hidden && opcoes.length) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); ativo = (ativo + (e.key === 'ArrowDown' ? 1 : -1) + opcoes.length) % opcoes.length; marcar(); return; }
        if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); escolher(opcoes[ativo]); return; }
        if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); fechar(); return; }
      }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); form.requestSubmit(); }
    });
    ta.addEventListener('blur', () => setTimeout(fechar, 150));
    const form = h('form', { className: 'ld-compor', on: { submit: async (e) => {
      e.preventDefault();
      const v = ta.value.trim(); if (!v) { ta.focus(); return; }
      const b = form.querySelector('button[type="submit"]'); b.disabled = true;
      const x = await api('POST', `acao=comentario&tarefa=${t.id}`, { texto: v });
      b.disabled = false;
      if (x.erro) { avisar(x.erro.mensagem, 'erro'); return; }
      ta.value = '';
      const tt = est.dados.tarefas.find((y) => y.id === t.id); if (tt) { tt.comentarios += 1; redesenharKanban(); }
      await carregarPainel(t.id);
      const ultimo = est.painel?.aside.querySelector('.ld-coms li:last-child');
      if (ultimo && !reduzido()) ultimo.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
    } } }, avatar(est.eu?.nome, 'ld-av--p'), h('div', { className: 'ld-compor__campo' }, ta, sugestoes,
      h('div', { className: 'ld-compor__rodape' }, h('small', { text: 'Ctrl + Enter envia' }), h('button', { type: 'submit', className: 'ld-botao ld-botao--mini' }, ic('enviar'), 'Comentar'))));
    return h('div', null, lista, form);
  }

  function historico(r) {
    if (!r.historico.length) return h('p', { className: 'ld-nada', text: 'Sem movimentações ainda.' });
    const frase = (x) => {
      const d = x.detalhes || {};
      switch (x.acao) {
        case 'criada': return 'criou a tarefa';
        case 'atribuida': return d.para ? `distribuiu para ${d.paraNome || 'um integrante'}` : 'removeu o responsável';
        case 'movida': return `moveu de ${NOME_COL[d.de] || d.de} para ${NOME_COL[d.para] || d.para}`;
        case 'aprovada': return 'aprovou a tarefa';
        case 'ajuste': return `pediu ajuste${d.nota ? `: "${d.nota}"` : ''}`;
        case 'prioridade': return `mudou a prioridade de ${d.de} para ${d.para}`;
        case 'prazo': return d.para ? `definiu o prazo para ${dataLonga(`${d.para}T12:00:00`)}` : 'removeu o prazo';
        case 'bloqueada': return `sinalizou impedimento${d.motivo ? `: "${d.motivo}"` : ''}`;
        case 'desbloqueada': return 'resolveu o impedimento';
        case 'editada': return `editou ${(d.campos || []).map((c) => (c === 'titulo' ? 'o título' : 'a descrição')).join(' e ')}`;
        case 'checklist': return `${d.feito ? 'concluiu' : 'reabriu'} "${d.item}" no checklist`;
        default: return x.acao.replace(/_/g, ' ');
      }
    };
    const ICONE_H = { criada: 'mais', atribuida: 'usuario', movida: 'seta', aprovada: 'aprovar', ajuste: 'ajuste', prioridade: 'alerta', prazo: 'calendario', bloqueada: 'bloqueio', desbloqueada: 'check', editada: 'editar', checklist: 'checklist' };
    return h('ol', { className: 'ld-hist' }, r.historico.map((x) => h('li', { className: `ld-hist__item ld-hist__item--${x.acao}` },
      h('span', { className: 'ld-hist__ic' }, ic(ICONE_H[x.acao] || 'historico')),
      h('p', null, h('strong', { text: x.autorNome }), ` ${frase(x)}`, h('time', { dateTime: x.criadoEm, title: dataHora(x.criadoEm), text: relativo(x.criadoEm) })))));
  }

  async function excluirTarefa(t) {
    if (!(await confirmar({ titulo: 'Excluir esta tarefa?', texto: `"${t.titulo}" sai do quadro com o checklist e os comentários. O registro da exclusão fica no histórico do quadro.`, acao: 'Excluir tarefa', perigo: true }))) return;
    const r = await api('DELETE', `tarefa=${t.id}`);
    if (r.erro) { avisar(r.erro.mensagem, 'erro'); return; }
    fecharPainel();
    est.dados.tarefas = est.dados.tarefas.filter((x) => x.id !== t.id);
    redesenharKanban();
    avisar('Tarefa excluída.');
    recarregar();
  }

  /* ============================================================
     4. Modais (dialog nativo: foco preso e Esc já vêm do navegador)
     ============================================================ */
  function dialogo(classe, titulo, corpo, rodape) {
    const d = h('dialog', { className: `ld-modal ${classe || ''}`, 'aria-labelledby': 'ld-modal-t' },
      h('div', { className: 'ld-modal__cab' }, h('h2', { id: 'ld-modal-t', text: titulo }), h('button', { type: 'button', className: 'ld-icone-btn', 'aria-label': 'Fechar', on: { click: () => fecharDialogo(d) } }, ic('fechar'))),
      h('div', { className: 'ld-modal__corpo' }, corpo),
      rodape ? h('div', { className: 'ld-modal__rodape' }, rodape) : null);
    d.addEventListener('cancel', (e) => { e.preventDefault(); fecharDialogo(d); });
    d.addEventListener('click', (e) => { if (e.target === d) fecharDialogo(d); });
    document.body.append(d);
    d.showModal();
    return d;
  }
  function fecharDialogo(d, valor) {
    if (!d.open) return;
    d.dispatchEvent(new CustomEvent('ld:fechar', { detail: valor }));
    if (reduzido()) { d.close(); d.remove(); return; }
    d.classList.add('ld-modal--saindo');
    setTimeout(() => { d.close(); d.remove(); }, 200);
  }
  function confirmar({ titulo: t, texto, acao, perigo }) {
    return new Promise((ok) => {
      let resposta = false;
      const d = dialogo('ld-modal--confirmar', t, h('p', { className: 'ld-modal__texto', text: texto }),
        [h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => fecharDialogo(d) } }, 'Cancelar'),
          h('button', { type: 'button', className: `ld-botao${perigo ? ' ld-botao--perigo' : ''}`, on: { click: () => { resposta = true; fecharDialogo(d); } } }, acao)]);
      d.addEventListener('ld:fechar', () => ok(resposta));
    });
  }
  const erroCampo = (form, nome, msg) => {
    const c = form.querySelector(`[name="${nome}"]`);
    const caixa = c?.closest('.ld-f');
    const alvo = caixa?.querySelector('.ld-f__erro');
    if (alvo) alvo.textContent = msg || '';
    caixa?.classList.toggle('ld-f--erro', Boolean(msg));
    if (c && 'setAttribute' in c) { if (msg) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid'); }
    return !msg;
  };
  /** Erro some assim que a pessoa corrige o campo. */
  const limparAoEditar = (form) => ['input', 'change'].forEach((ev) => form.addEventListener(ev, (e) => { if (e.target.name) erroCampo(form, e.target.name, ''); }));
  const campoForm = (rotulo, controle, ajuda, obrig) => h('div', { className: 'ld-f' },
    h('label', { className: 'ld-f__rot', for: controle.id }, rotulo, obrig ? h('span', { className: 'ld-f__obrig', 'aria-hidden': 'true', text: ' *' }) : null),
    controle, ajuda ? h('small', { className: 'ld-f__ajuda', text: ajuda }) : null, h('small', { className: 'ld-f__erro', 'aria-live': 'polite' }));

  /** Criar ou editar quadro (só admin). `dados` = resposta do GET do quadro, ou null para criar. */
  async function modalQuadro(dados, depois) {
    const u = await api('GET', 'acao=usuarios');
    if (u.erro) { avisar(u.erro.mensagem, 'erro'); return; }
    const q = dados?.quadro || null;
    const marcados = new Set((dados?.estagiarios || []).map((e) => e.id));
    let cor = q?.cor || CORES[0][0];
    let icone = q?.icone || 'alvo';
    // integrante que ficou inativo continua aparecendo para o admin poder tirar
    const estagiarios = [...u.estagiarios, ...(dados?.estagiarios || []).filter((e) => !u.estagiarios.some((x) => x.id === e.id))];
    const consultores = [...u.consultores, ...(dados?.lider && !u.consultores.some((x) => x.id === dados.lider.id) ? [dados.lider] : [])];

    const nome = h('input', { id: 'ld-q-nome', name: 'nome', type: 'text', maxlength: '80', required: true, autocomplete: 'off', value: q?.nome || '', placeholder: 'Ex.: Implantação — Metalúrgica Alfa' });
    const desc = h('textarea', { id: 'ld-q-desc', name: 'descricao', rows: '3', maxlength: '600', value: q?.descricao || '', placeholder: 'Objetivo do quadro, cliente ou frente de trabalho.' });
    const lider = h('select', { id: 'ld-q-lider', name: 'lider_id', required: true },
      h('option', { value: '' }, consultores.length ? 'Escolha quem lidera' : 'Nenhum consultor ou administrador ativo'),
      consultores.map((c) => h('option', { value: c.id, selected: c.id === dados?.lider?.id }, c.papel === 'admin' ? `${c.nome} (administrador)` : c.nome)));
    const filtroEst = h('input', { type: 'search', className: 'ld-f__filtro', placeholder: 'Filtrar estagiários…', 'aria-label': 'Filtrar estagiários', autocomplete: 'off' });
    const contagem = h('span', { className: 'ld-f__cont' });
    const atualizarContagem = () => { contagem.textContent = marcados.size ? `${marcados.size} selecionado${marcados.size === 1 ? '' : 's'}` : 'Nenhum selecionado'; };
    const listaEst = h('div', { id: 'ld-q-est', className: 'ld-escolha', role: 'group', 'aria-label': 'Estagiários do quadro' },
      estagiarios.length ? estagiarios.map((e) => h('label', { className: 'ld-escolha__op', data: { busca: semAcento(`${e.nome} ${e.login}`) } },
        h('input', { type: 'checkbox', name: 'estagiarios', value: e.id, checked: marcados.has(e.id), on: { change: (ev) => { if (ev.target.checked) marcados.add(e.id); else marcados.delete(e.id); atualizarContagem(); } } }),
        avatar(e.nome, 'ld-av--p'), h('span', null, h('strong', { text: e.nome }), h('small', { text: `@${e.login}` })), h('span', { className: 'ld-escolha__check', 'aria-hidden': 'true' }, ic('check'))))
        : h('p', { className: 'ld-nada', text: 'Nenhum estagiário ativo cadastrado. Crie as contas em Usuários (menu da conta).' }));
    filtroEst.addEventListener('input', () => { const t = semAcento(filtroEst.value.trim()); listaEst.querySelectorAll('.ld-escolha__op').forEach((l) => { l.hidden = Boolean(t) && !l.dataset.busca.includes(t); }); });
    atualizarContagem();
    const cores = h('div', { className: 'ld-cores', role: 'radiogroup', 'aria-label': 'Cor do quadro' }, CORES.map(([c, n]) => h('label', { className: 'ld-cores__op', title: n, style: { '--c': c } },
      h('input', { type: 'radio', name: 'cor', value: c, checked: c === cor, on: { change: () => { cor = c; previa(); } } }), h('span', { className: 'ld-sr', text: n }))));
    const icones = h('div', { className: 'ld-icones', role: 'radiogroup', 'aria-label': 'Ícone do quadro' }, ICONES_QUADRO.map((i) => h('label', { className: 'ld-icones__op', title: i },
      h('input', { type: 'radio', name: 'icone', value: i, checked: i === icone, on: { change: () => { icone = i; previa(); } } }), ic(i), h('span', { className: 'ld-sr', text: i }))));
    let status = q?.status || 'ativo';
    const statusSeg = q ? h('div', { className: 'ld-segmento ld-segmento--form', role: 'radiogroup', 'aria-label': 'Status do quadro' },
      [['ativo', 'Ativo'], ['arquivado', 'Arquivado']].map(([v, t]) => h('label', { className: 'ld-segmento__op' }, h('input', { type: 'radio', name: 'status', value: v, checked: v === status, on: { change: () => { status = v; excluir.hidden = status !== 'arquivado' || q.status !== 'arquivado'; } } }), t))) : null;
    const amostra = h('div', { className: 'ld-previa', 'aria-hidden': 'true' });
    function previa() { amostra.style.setProperty('--cor', cor); amostra.replaceChildren(h('span', { className: 'ld-qcard__ic' }, ic(icone)), h('strong', { text: nome.value.trim() || 'Nome do quadro' })); }
    nome.addEventListener('input', previa);
    previa();
    const erroGeral = h('p', { className: 'ld-erro-geral', role: 'alert', hidden: true });
    const form = h('form', { id: 'ld-form-quadro', className: 'ld-form', novalidate: true },
      amostra, erroGeral,
      campoForm('Nome do quadro', nome, null, true),
      campoForm('Descrição', desc, 'Até 600 caracteres.'),
      campoForm('Líder (consultor ou administrador)', lider, 'Só o líder distribui, prioriza, aprova e devolve tarefas neste quadro.', true),
      h('div', { className: 'ld-f' }, h('div', { className: 'ld-f__rot ld-f__rot--linha' }, h('span', { id: 'ld-q-est-rot', text: 'Estagiários' }), contagem), filtroEst, listaEst, h('small', { className: 'ld-f__erro', 'aria-live': 'polite' })),
      h('div', { className: 'ld-f ld-f--duplo' },
        h('div', null, h('p', { className: 'ld-f__rot', text: 'Cor' }), cores),
        h('div', null, h('p', { className: 'ld-f__rot', text: 'Ícone' }), icones)),
      statusSeg ? h('div', { className: 'ld-f' }, h('p', { className: 'ld-f__rot', text: 'Status' }), statusSeg, h('small', { className: 'ld-f__ajuda', text: 'Arquivado: o quadro sai da lista dos estagiários e fica só leitura.' })) : null);
    listaEst.setAttribute('aria-labelledby', 'ld-q-est-rot');
    const excluir = h('button', { type: 'button', className: 'ld-botao ld-botao--perigo-sec', hidden: !(q && q.status === 'arquivado'), on: { click: async () => {
      if (!(await confirmar({ titulo: 'Excluir o quadro?', texto: `"${q.nome}" e todas as tarefas, comentários e o histórico dele serão apagados. Isso não pode ser desfeito.`, acao: 'Excluir definitivamente', perigo: true }))) return;
      const r = await api('DELETE', `quadro=${q.id}`);
      if (r.erro) { avisar(r.erro.mensagem, 'erro'); return; }
      fecharDialogo(d); avisar('Quadro excluído.'); P.irPara({ area: 'lideres' }); if (!dados) depois?.();
    } } }, ic('lixo'), 'Excluir quadro');
    const salvar = h('button', { type: 'submit', form: 'ld-form-quadro', className: 'ld-botao' }, ic('check'), q ? 'Salvar alterações' : 'Criar quadro');
    limparAoEditar(form);
    const d = dialogo('ld-modal--largo', q ? 'Editar quadro' : 'Novo quadro', form, [excluir, h('span', { className: 'ld-espaco' }), h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => fecharDialogo(d) } }, 'Cancelar'), salvar]);
    nome.focus();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      erroGeral.hidden = true;
      const n = nome.value.trim();
      let ok = erroCampo(form, 'nome', n.length < 2 ? 'Dê um nome com pelo menos 2 letras.' : '');
      ok = erroCampo(form, 'lider_id', lider.value ? '' : 'Escolha o líder do quadro.') && ok;
      if (!ok) { form.querySelector('[aria-invalid="true"]')?.focus(); return; }
      const corpo = { nome: n, descricao: desc.value.trim(), lider_id: lider.value, estagiarios: [...marcados], cor, icone, ...(q ? { status } : {}) };
      salvar.disabled = true;
      const r = q ? await api('PATCH', `quadro=${q.id}`, corpo) : await api('POST', 'acao=quadro', corpo);
      salvar.disabled = false;
      if (r.erro) { erroGeral.textContent = r.erro.mensagem; erroGeral.hidden = false; return; }
      fecharDialogo(d);
      avisar(q ? 'Quadro atualizado.' : 'Quadro criado. O líder e os estagiários foram avisados.');
      if (!q) P.irPara({ area: 'lideres', secao: `q-${r.quadro.id}` });
      else depois?.();
    });
  }

  /** Nova tarefa (líder/admin). */
  function modalTarefa(colunaInicial = 'a_fazer') {
    const { estagiarios, lider, permissoes: pq } = est.dados;
    const lider_ = pq.operar; // líder/admin: todos os campos
    const m = pq.minhas || {};
    const titulo = h('input', { id: 'ld-t-titulo', name: 'titulo', type: 'text', maxlength: '140', required: true, autocomplete: 'off', placeholder: 'Ex.: Cadastrar a tabela de produtos do cliente' });
    const desc = h('textarea', { id: 'ld-t-desc', name: 'descricao', rows: '3', maxlength: '4000', placeholder: 'O que fazer, critério de pronto e onde estão os materiais.' });
    const resp = h('select', { id: 'ld-t-resp', name: 'responsavel_id' }, h('option', { value: '' }, 'Sem responsável (distribuir depois)'),
      estagiarios.map((p) => h('option', { value: p.id }, p.nome)), lider ? h('option', { value: lider.id }, `${lider.nome} (líder)`) : null);
    let prioridade = 'media';
    const prio = h('div', { className: 'ld-segmento ld-segmento--form ld-segmento--prio', role: 'radiogroup', 'aria-label': 'Prioridade' },
      [...PRIORIDADES].reverse().map(([v, n]) => h('label', { className: `ld-segmento__op ld-segmento__op--${v}` }, h('input', { type: 'radio', name: 'prioridade', value: v, checked: v === prioridade, on: { change: () => { prioridade = v; } } }), h('i', { 'aria-hidden': 'true' }), n)));
    const prazo = h('input', { id: 'ld-t-prazo', name: 'prazo', type: 'date', min: est.dados.hoje });
    const coluna = h('select', { id: 'ld-t-col', name: 'status' }, COLUNAS.filter(([c]) => c !== 'concluido').map(([c, n]) => h('option', { value: c, selected: c === colunaInicial }, n)));
    const ck = h('textarea', { id: 'ld-t-ck', name: 'checklist', rows: '3', placeholder: 'Um item por linha (opcional)' });
    const erroGeral = h('p', { className: 'ld-erro-geral', role: 'alert', hidden: true });
    const form = h('form', { id: 'ld-form-tarefa', className: 'ld-form', novalidate: true }, erroGeral,
      campoForm('Título', titulo, null, true),
      campoForm('Descrição', desc),
      h('div', { className: 'ld-f ld-f--duplo' },
        lider_ || m.atribuir ? campoForm('Responsável', resp, 'Quem recebe é avisado na hora.') : h('div', { className: 'ld-f' }, h('p', { className: 'ld-f__rot', text: 'Responsável' }), h('p', { className: 'ld-f__fixo' }, avatar(est.eu?.nome, 'ld-av--p'), 'Você')),
        campoForm('Prazo', prazo, 'Avisos de prazo próximo e de atraso saem sozinhos.')),
      lider_ || m.prioridade ? h('div', { className: 'ld-f' }, h('p', { className: 'ld-f__rot', text: 'Prioridade' }), prio) : null,
      h('div', { className: lider_ ? 'ld-f ld-f--duplo' : 'ld-f' }, lider_ ? campoForm('Coluna', coluna) : null, campoForm('Checklist', ck, 'Até 30 itens.')),
      lider_ ? null : h('p', { className: 'ld-f__ajuda', text: 'A tarefa começa em A Fazer e o seu líder é avisado.' }));
    if (!lider_ && m.atribuir) resp.value = String(est.eu?.id || '');
    const salvar = h('button', { type: 'submit', form: 'ld-form-tarefa', className: 'ld-botao' }, ic('mais'), 'Criar tarefa');
    limparAoEditar(form);
    const d = dialogo('ld-modal--largo', 'Nova tarefa', form, [h('span', { className: 'ld-espaco' }), h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => fecharDialogo(d) } }, 'Cancelar'), salvar]);
    titulo.focus();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      erroGeral.hidden = true;
      const t = titulo.value.trim();
      if (!erroCampo(form, 'titulo', t.length < 2 ? 'Escreva um título com pelo menos 2 letras.' : '')) { titulo.focus(); return; }
      const itens = ck.value.split('\n').map((x) => x.trim()).filter(Boolean);
      if (!erroCampo(form, 'checklist', itens.length > 30 ? 'Até 30 itens.' : itens.some((x) => x.length > 200) ? 'Cada item pode ter até 200 caracteres.' : '')) return;
      salvar.disabled = true;
      const corpo = { titulo: t, descricao: desc.value.trim(), prazo: prazo.value || null, checklist: itens };
      if (lider_ || m.atribuir) corpo.responsavel_id = resp.value || null;
      if (lider_ || m.prioridade) corpo.prioridade = prioridade;
      if (lider_) corpo.status = coluna.value;
      const r = await api('POST', `acao=tarefa&quadro=${est.quadroId}`, corpo);
      salvar.disabled = false;
      if (r.erro) { erroGeral.textContent = r.erro.mensagem; erroGeral.hidden = false; return; }
      fecharDialogo(d);
      est.dados.tarefas.push(r.tarefa);
      if (est.vista !== 'kanban') trocarVista('kanban'); else redesenharKanban();
      avisar(r.tarefa.responsavelId ? 'Tarefa criada e distribuída.' : 'Tarefa criada.');
      recarregar();
      requestAnimationFrame(() => { const c = est.no?.querySelector(`.ld-card[data-id="${r.tarefa.id}"]`); if (c) { c.classList.add('ld-card--nova'); c.scrollIntoView({ block: 'nearest', behavior: reduzido() ? 'auto' : 'smooth' }); } });
    });
  }

  /* ============================================================
     5. Painel do quadro (dashboard com dados reais)
     ============================================================ */
  function dashboard() {
    const d = est.dados.dashboard;
    const kpi = (n, rotulo, mod, dica) => h('div', { className: `ld-kpi${mod ? ` ld-kpi--${mod}` : ''}`, 'data-revela': '' },
      h('span', { className: 'ld-kpi__n', 'data-contar': String(n), text: String(n) }), h('span', { className: 'ld-kpi__r', text: rotulo }), dica ? h('small', { text: dica }) : null);
    const R = 54, C = 2 * Math.PI * R;
    const anel = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    anel.setAttribute('viewBox', '0 0 140 140'); anel.setAttribute('class', 'ld-anel__svg'); anel.setAttribute('aria-hidden', 'true');
    anel.innerHTML = `<circle cx="70" cy="70" r="${R}" class="ld-anel__fundo"/><circle cx="70" cy="70" r="${R}" class="ld-anel__valor" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"/>`;
    const valor = anel.querySelector('.ld-anel__valor');
    requestAnimationFrame(() => requestAnimationFrame(() => { valor.style.strokeDashoffset = String(C * (1 - d.pctConclusao / 100)); }));
    const maxBarra = Math.max(1, ...d.porEstagiario.map((p) => p.total));
    const colunas = [['pendentes', 'A Fazer', 'a_fazer'], ['emAndamento', 'Em Andamento', 'em_andamento'], ['emRevisao', 'Em Revisão', 'em_revisao'], ['concluidas', 'Concluído', 'concluido']];
    const pessoas = [...d.porEstagiario].sort((a, b) => b.total - a.total || a.nome.localeCompare(b.nome, 'pt-BR'));
    return h('div', { className: 'ld-dash' },
      h('div', { className: 'ld-kpis', 'data-revela-lista': '' },
        kpi(d.total, 'Tarefas no quadro'),
        kpi(d.pendentes, 'Pendentes', '', 'em A Fazer'),
        kpi(d.emAndamento, 'Em andamento', 'azul'),
        kpi(d.emRevisao, 'Em revisão', d.emRevisao ? 'lima' : ''),
        kpi(d.concluidas, 'Concluídas', 'ok'),
        kpi(d.atrasadas, 'Atrasadas', d.atrasadas ? 'alerta' : '', d.bloqueadas ? `${plural(d.bloqueadas, 'com impedimento', 'com impedimento')}` : null)),
      h('div', { className: 'ld-dash__grade' },
        h('section', { className: 'ld-dcard ld-anel', 'data-revela': '', 'aria-labelledby': 'ld-d-conc' },
          h('h2', { id: 'ld-d-conc', className: 'ld-dcard__t', text: 'Conclusão do quadro' }),
          h('div', { className: 'ld-anel__caixa' }, anel, h('p', { className: 'ld-anel__pct' }, h('strong', { 'data-contar': String(d.pctConclusao), text: String(d.pctConclusao) }), h('span', { text: '%' }))),
          h('p', { className: 'ld-dcard__nota', text: d.total ? `${d.concluidas} de ${plural(d.total, 'tarefa aprovada', 'tarefas aprovadas')}.` : 'Nenhuma tarefa criada ainda.' }),
          h('div', { className: 'ld-faixa-col', role: 'img', 'aria-label': colunas.map(([k, n]) => `${n}: ${d[k]}`).join(', ') },
            colunas.map(([k, , c]) => (d[k] ? h('span', { className: `ld-faixa-col__seg ld-faixa-col__seg--${c}`, style: { flex: String(d[k]) }, title: `${NOME_COL[c]}: ${d[k]}` }) : null))),
          h('ul', { className: 'ld-legenda' }, colunas.map(([k, n, c]) => h('li', null, h('span', { className: `ld-ponto-col ld-ponto-col--${c}`, 'aria-hidden': 'true' }), n, h('strong', { text: String(d[k]) }))))),
        h('section', { className: 'ld-dcard', 'data-revela': '', 'aria-labelledby': 'ld-d-dist' },
          h('h2', { id: 'ld-d-dist', className: 'ld-dcard__t', text: 'Distribuição por estagiário' }),
          pessoas.length ? h('ol', { className: 'ld-dist' }, pessoas.map((p) => {
            const pctP = p.total ? Math.round((p.concluidas * 100) / p.total) : 0;
            return h('li', { className: 'ld-dist__item' },
              avatar(p.nome, 'ld-av--p'),
              h('div', { className: 'ld-dist__info' },
                h('p', { className: 'ld-dist__cab' }, h('strong', { text: p.nome }), h('span', { text: p.total ? `${pctP}% concluído` : 'Sem tarefas' })),
                h('div', { className: 'ld-dist__barra', style: { '--larg': `${(p.total / maxBarra) * 100}%` }, role: 'img', 'aria-label': `${p.nome}: ${p.concluidas} concluídas, ${p.abertas} abertas, ${p.atrasadas} atrasadas` },
                  p.concluidas ? h('span', { className: 'ld-dist__seg ld-dist__seg--ok', style: { flex: String(p.concluidas) } }) : null,
                  p.abertas - p.atrasadas > 0 ? h('span', { className: 'ld-dist__seg', style: { flex: String(p.abertas - p.atrasadas) } }) : null,
                  p.atrasadas ? h('span', { className: 'ld-dist__seg ld-dist__seg--alerta', style: { flex: String(p.atrasadas) } }) : null),
                h('p', { className: 'ld-dist__nums' }, h('span', null, h('i', { className: 'ld-dist__dot ld-dist__dot--ok' }), plural(p.concluidas, 'concluída', 'concluídas')), h('span', null, h('i', { className: 'ld-dist__dot' }), plural(p.abertas, 'aberta', 'abertas')), p.atrasadas ? h('span', { className: 'ld-dist__alerta' }, h('i', { className: 'ld-dist__dot ld-dist__dot--alerta' }), plural(p.atrasadas, 'atrasada', 'atrasadas')) : null)));
          })) : h('p', { className: 'ld-nada', text: 'Nenhum estagiário neste quadro.' }),
          d.semResponsavel ? h('p', { className: 'ld-dcard__nota' }, ic('usuario'), `${plural(d.semResponsavel, 'tarefa sem responsável', 'tarefas sem responsável')} para distribuir.`) : null)));
  }

  /* ============================================================
     Navegação da área: Quadros · Visão Gerencial (admin) · Orientações (líderes e admin)
     ============================================================ */
  function navArea(atual) {
    const papel = est.eu?.papel;
    if (papel === 'estagiario') return null;
    const item = (id, rotulo, icone, secao, extra) => h('a', { href: `#lideres${secao ? `/${secao}` : ''}`, className: 'ld-area-nav__op', 'aria-current': atual === id ? 'page' : null,
      on: { click: (e) => { e.preventDefault(); P.irPara({ area: 'lideres', ...(secao ? { secao } : {}) }); } } }, ic(icone), rotulo, extra || null);
    const n = sino.orient.total;
    return h('nav', { className: 'ld-area-nav', 'aria-label': 'Processo de Líderes' },
      item('quadros', 'Quadros', 'kanban', ''),
      papel === 'admin' ? item('gerencial', 'Visão Gerencial', 'gerencial', 'gerencial') : null,
      item('orientacoes', 'Orientações', 'megafone', 'orientacoes', h('span', { className: 'ld-area-nav__n', hidden: !n, text: String(n) })));
  }

  /** Faixa discreta para o líder com orientações pendentes (some quando todas são tratadas). */
  function faixaOrientacoes() {
    const el = h('div', { className: 'ld-faixa-orient', 'data-ld-orient': '', hidden: true });
    atualizarFaixa(el);
    return el;
  }
  function atualizarFaixa(el) {
    const o = sino.orient;
    el.hidden = !o.total;
    if (!o.total) { el.replaceChildren(); return; }
    el.classList.toggle('ld-faixa-orient--critico', o.criticas > 0);
    el.replaceChildren(ic('megafone'),
      h('p', null, h('strong', { text: o.criticas ? `${plural(o.criticas, 'orientação crítica', 'orientações críticas')} do administrador` : `${plural(o.total, 'orientação', 'orientações')} do administrador` }),
        ` ${o.total === 1 ? 'aguarda' : 'aguardam'} o seu tratamento${o.naoLidas ? ` · ${plural(o.naoLidas, 'não lida', 'não lidas')}` : ''}.`),
      h('button', { type: 'button', className: 'ld-botao ld-botao--mini', on: { click: () => P.irPara({ area: 'lideres', secao: 'orientacoes' }) } }, 'Abrir', ic('seta')));
  }

  /* ============================================================
     7. Gerenciar Equipe — permissões dos estagiários do quadro
     ============================================================ */
  async function equipe(alvo) {
    alvo.replaceChildren(carregando('Carregando a equipe…'));
    const r = await api('GET', `acao=equipe&quadro=${est.quadroId}`);
    if (est.vista !== 'equipe' || !alvo.isConnected) return;
    if (r.erro) { alvo.replaceChildren(falha(r, () => equipe(alvo))); return; }
    const grupos = [...new Set(r.catalogo.map((p) => p.grupo))];
    const bloqueadas = r.catalogo.filter((p) => !r.teto[p.id]);

    const linha = (m, p) => {
      const ligado = m.efetivas[p.id];
      const travada = !r.teto[p.id];
      const id = `ld-perm-${m.id}-${p.id}`;
      const chave = h('button', { type: 'button', id, role: 'switch', className: `ld-chave${p.critica ? ' ld-chave--critica' : ''}`, 'aria-checked': String(ligado), disabled: travada,
        'aria-describedby': `${id}-d`, on: { click: () => alternar(m, p, chave) } }, h('span', { className: 'ld-chave__bola', 'aria-hidden': 'true' }));
      return h('li', { className: `ld-perm${travada ? ' ld-perm--travada' : ''}` },
        h('div', { className: 'ld-perm__txt' },
          h('label', { for: id, className: 'ld-perm__nome' }, p.nome, p.critica ? h('span', { className: 'ld-selo ld-selo--mini ld-selo--aviso', text: 'Sensível' }) : null),
          h('small', { id: `${id}-d`, text: travada ? `${p.texto} Bloqueada pelo administrador.` : p.texto })),
        travada ? h('span', { className: 'ld-perm__trava', title: 'Bloqueada pelo administrador (teto de permissões)' }, ic('cadeado')) : null,
        chave);
    };

    async function alternar(m, p, chave) {
      const valor = chave.getAttribute('aria-checked') !== 'true';
      if (valor && p.critica && !(await confirmar({ titulo: `Liberar "${p.nome}" para ${m.nome.split(/\s+/)[0]}?`, texto: `${p.texto} Use com estagiários que já dominam o fluxo do quadro. A alteração fica registrada no histórico.`, acao: 'Liberar' }))) return;
      chave.setAttribute('aria-checked', String(valor));
      chave.disabled = true;
      const x = await api('PATCH', `acao=equipe&quadro=${est.quadroId}`, { usuario_id: m.id, permissoes: { [p.id]: valor } });
      chave.disabled = false;
      if (x.erro) { chave.setAttribute('aria-checked', String(!valor)); avisar(x.erro.mensagem, 'erro'); return; }
      avisar(`${valor ? 'Liberado' : 'Retirado'}: ${p.nome.toLowerCase()} para ${m.nome.split(/\s+/)[0]}.`);
      anunciar(`${p.nome} ${valor ? 'ligada' : 'desligada'} para ${m.nome}.`);
      equipe(alvo);
    }

    const cartao = (m, i) => h('article', { className: 'ld-membro', 'data-revela': '', style: { '--k': String(i) } },
      h('header', { className: 'ld-membro__cab' },
        avatar(m.nome),
        h('div', { className: 'ld-membro__id' }, h('h3', { text: m.nome }), h('small', { text: `@${m.login}${m.ativo ? '' : ' · conta inativa'}` })),
        h('div', { className: 'ld-membro__nums' },
          h('span', { className: 'ld-chip', title: 'Tarefas abertas com ele' }, ic('kanban'), `${m.numeros.abertas} abertas`),
          h('span', { className: 'ld-chip ld-chip--ok', title: 'Concluídas neste quadro' }, ic('aprovar'), `${m.numeros.concluidas} concluídas`),
          m.numeros.atrasadas ? h('span', { className: 'ld-chip ld-chip--alerta' }, ic('relogio'), `${m.numeros.atrasadas} atrasadas`) : null),
        h('div', { className: 'ld-membro__acoes' },
          h('span', { className: `ld-selo${m.personalizado ? ' ld-selo--lima' : ''}`, text: m.personalizado ? 'Personalizado' : 'Padrão' }),
          m.personalizado ? h('button', { type: 'button', className: 'ld-link', on: { click: async () => {
            if (!(await confirmar({ titulo: 'Voltar ao padrão?', texto: `As permissões de ${m.nome} voltam ao padrão do quadro (movimentar cards, comentar e ver indicadores).`, acao: 'Restaurar padrão' }))) return;
            const x = await api('PATCH', `acao=equipe&quadro=${est.quadroId}`, { usuario_id: m.id, restaurar: true });
            if (x.erro) { avisar(x.erro.mensagem, 'erro'); return; }
            avisar('Permissões restauradas.'); equipe(alvo);
          } } }, 'Restaurar padrão') : null)),
      h('div', { className: 'ld-membro__grupos' },
        h('section', { className: 'ld-pgrupo' }, h('h4', { text: 'Acesso' }),
          h('ul', { className: 'ld-perms' }, h('li', { className: 'ld-perm ld-perm--fixa' },
            h('div', { className: 'ld-perm__txt' }, h('span', { className: 'ld-perm__nome', text: 'Ver as tarefas do quadro' }), h('small', { text: 'Sempre: vem de ser integrante do quadro (quem inclui ou tira é o administrador).' })),
            h('span', { className: 'ld-perm__fixo' }, ic('olho'), 'Sempre')))),
        grupos.map((g) => h('section', { className: 'ld-pgrupo' }, h('h4', { text: g }),
          h('ul', { className: 'ld-perms' }, r.catalogo.filter((p) => p.grupo === g).map((p) => linha(m, p)))))));

    const frase = (x) => {
      const nomes = (ids) => ids.map((k) => (r.catalogo.find((p) => p.id === k)?.nome || k).toLowerCase()).join(', ');
      if (x.restaurou) return `restaurou o padrão de ${x.usuarioNome}`;
      return [x.ganhou?.length ? `liberou ${nomes(x.ganhou)}` : '', x.perdeu?.length ? `retirou ${nomes(x.perdeu)}` : ''].filter(Boolean).join(' e ') + ` para ${x.usuarioNome}`;
    };
    alvo.replaceChildren(h('div', { className: 'ld-eq' },
      h('header', { className: 'ld-eq__cab' },
        h('div', null, h('h2', { text: 'Gerenciar Equipe' }),
          h('p', { text: 'Defina o que cada estagiário pode fazer neste quadro. As mudanças valem na hora, ficam registradas e o estagiário é avisado.' })),
        bloqueadas.length ? h('p', { className: 'ld-eq__teto' }, ic('cadeado'), `Fechado pelo administrador: ${bloqueadas.map((p) => p.nome.toLowerCase()).join(', ')}.`) : null),
      r.membros.length ? h('div', { className: 'ld-membros' }, r.membros.map(cartao))
        : h('div', { className: 'ld-vazio' }, h('span', { className: 'ld-vazio__ic' }, ic('pessoas')), h('h2', { text: 'Sem estagiários neste quadro' }), h('p', { text: 'O administrador inclui os estagiários em "Editar quadro".' })),
      h('section', { className: 'ld-eq__hist', 'aria-labelledby': 'ld-eq-hist' },
        h('h3', { id: 'ld-eq-hist' }, ic('historico'), 'Histórico de permissões'),
        r.historico.length ? h('ol', { className: 'ld-hist' }, r.historico.map((x) => h('li', { className: 'ld-hist__item' },
          h('span', { className: 'ld-hist__ic' }, ic('cadeado')),
          h('p', null, h('strong', { text: x.autorNome }), ` ${frase(x)}`, h('time', { dateTime: x.criadoEm, title: dataHora(x.criadoEm), text: relativo(x.criadoEm) })))))
          : h('p', { className: 'ld-nada', text: 'Nenhuma alteração ainda: todos estão no padrão.' }))));
    revelar(alvo);
  }

  /* ============================================================
     8. Visão Gerencial (administrador)
     ============================================================ */
  const g = { filtros: { dias: 30, de: '', ate: '', quadro: '', responsavel: '' }, ordem: 'situacao', todosAlertas: false, orientFiltro: 'pendentes' };
  const NIVEL = { critico: 'Crítico', atencao: 'Atenção', informativo: 'Informativo' };
  const SITUACAO = { pendente: 'Pendente', lida: 'Lida', tratada: 'Tratada' };
  const PRIO_ORIENT = { normal: 'Normal', alta: 'Alta', critica: 'Crítica' };
  const dias1 = (n) => (n == null ? '—' : `${String(n).replace('.', ',')} ${n === 1 ? 'dia' : 'dias'}`);

  async function gerencial(raiz) {
    limparTela();
    est.quadroId = null; est.dados = null;
    const casca = h('div', { className: 'ld ld--gerencial' });
    raiz.replaceChildren(casca);
    if (est.eu?.papel !== 'admin') { casca.replaceChildren(navArea('gerencial'), h('div', { className: 'ld-corpo' }, falha({ status: 403, mensagem: 'A Visão Gerencial é exclusiva dos administradores.' }))); return null; }
    const f = g.filtros;
    const hoje = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
    const menos = (n) => new Date(Date.parse(`${hoje}T12:00:00Z`) - n * 864e5).toISOString().slice(0, 10);
    const de = f.dias ? menos(f.dias - 1) : f.de;
    const ate = f.dias ? hoje : f.ate;
    const corpo = h('div', { className: 'ld-corpo ld-g' }, carregando('Reunindo os números da equipe…'));
    casca.replaceChildren(navArea('gerencial'), cabecalhoGerencial(), corpo);
    const q = new URLSearchParams({ acao: 'gerencial', de, ate, ...(f.quadro ? { quadro: f.quadro } : {}), ...(f.responsavel ? { responsavel: f.responsavel } : {}) });
    const [r, o] = await Promise.all([api('GET', q.toString()), api('GET', 'acao=orientacoes')]);
    if (!casca.isConnected) return null;
    if (r.erro) { corpo.replaceChildren(falha(r, () => gerencial(raiz))); return null; }
    const ctx = { r, o: o.erro ? { enviadas: [] } : o, raiz };
    corpo.replaceChildren(
      barraGerencial(r, raiz),
      fileiraQuadros(r, raiz),
      r.equipe ? secaoEquipe(r) : '',
      secaoAlertas(ctx),
      kpis(r),
      h('div', { className: 'ld-g__duas' }, graficoEvolucao(r), cartaoPrazo(r)),
      comparativo(ctx),
      distribuicao(r),
      orientacoesEnviadas(ctx),
      comoCalculamos(r));
    revelar(corpo);
    corpo.querySelectorAll('[data-contar]').forEach((el, i) => MOV?.contar(el, el.dataset.contar, { atraso: 120 + i * 50 }));
    return null;
  }

  function cabecalhoGerencial() {
    return h('header', { className: 'ld-gcab' },
      h('div', { className: 'ld-gcab__luz', 'aria-hidden': 'true' }),
      h('div', { className: 'ld-gcab__txt' },
        h('p', { className: 'ld-secao-cab__olho', text: 'Visão Gerencial' }),
        titulo(h('h1', { className: 'ld-gcab__titulo', text: 'Como está a equipe' })),
        h('p', { className: 'ld-gcab__lead', text: 'O que exige atenção, como estão as entregas e onde agir, com os dados reais de todos os quadros.' })),
      h('div', { className: 'ld-gcab__acoes' },
        h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => modalConfig() } }, ic('ajustes'), 'Ajustar alertas e permissões')));
  }

  function barraGerencial(r, raiz) {
    const f = g.filtros;
    const per = h('div', { className: 'ld-segmento', role: 'group', 'aria-label': 'Período' },
      [[7, '7 dias'], [30, '30 dias'], [90, '90 dias'], [0, 'Personalizado']].map(([d, t]) => h('button', { type: 'button', className: 'ld-segmento__op', 'aria-pressed': String(f.dias === d), data: { d },
        on: { click: () => { f.dias = d; if (!d) { f.de = r.periodo.de; f.ate = r.periodo.ate; } gerencial(raiz); } } }, t)));
    const datas = !f.dias ? h('div', { className: 'ld-g__datas' },
      h('label', null, h('span', { text: 'De' }), h('input', { type: 'date', value: f.de || r.periodo.de, max: r.hoje, on: { change: (e) => { f.de = e.target.value; gerencial(raiz); } } })),
      h('label', null, h('span', { text: 'Até' }), h('input', { type: 'date', value: f.ate || r.periodo.ate, max: r.hoje, on: { change: (e) => { f.ate = e.target.value; gerencial(raiz); } } }))) : null;
    const sel = (chave, rotulo, opcoes) => h('label', { className: 'ld-filtro' }, h('span', { className: 'ld-sr', text: rotulo }),
      h('select', { 'aria-label': rotulo, on: { change: (e) => { f[chave] = e.target.value; gerencial(raiz); } } }, opcoes.map(([v, t]) => h('option', { value: v, selected: f[chave] === v }, t))));
    const filtrado = f.quadro || f.responsavel;
    setTimeout(() => { if (MOV && per.isConnected) { const ind = MOV.indicador(per, '[aria-pressed="true"]', 'ld-segmento__ind'); est.limpar.push(() => ind.destruir()); } });
    return h('div', { className: 'ld-g__barra', role: 'search', 'aria-label': 'Filtros da Visão Gerencial' },
      per, datas,
      sel('quadro', 'Quadro', [['', 'Todos os quadros'], ...r.filtros.opcoes.quadros.map((q) => [q.id, q.nome])]),
      sel('responsavel', 'Responsável', [['', 'Todas as pessoas'], ...r.filtros.opcoes.responsaveis.map((p) => [p.id, p.nome])]),
      filtrado ? h('button', { type: 'button', className: 'ld-limpar', on: { click: () => { f.quadro = ''; f.responsavel = ''; gerencial(raiz); } } }, ic('fechar'), 'Limpar') : null,
      h('p', { className: 'ld-g__periodo' }, `${dataLonga(`${r.periodo.de}T12:00:00`)} a ${dataLonga(`${r.periodo.ate}T12:00:00`)}`, h('small', { text: ` · comparado aos ${r.periodo.dias} dias anteriores` })));
  }

  /* ---------- quadros dos líderes (atalho de filtro) e desempenho individual da equipe ---------- */
  function fileiraQuadros(r, raiz) {
    const f = g.filtros;
    const op = (id, nome, sub, cor) => h('button', { type: 'button', className: 'ld-qchip', 'aria-pressed': String((f.quadro || '') === id), style: cor ? { '--cor': corValida(cor) } : null,
      on: { click: () => { f.quadro = id; f.responsavel = ''; gerencial(raiz); } } },
      cor ? h('i', { 'aria-hidden': 'true' }) : ic('kanban'), h('span', null, h('strong', { text: nome }), sub ? h('small', { text: sub }) : null));
    return h('nav', { className: 'ld-qchips', 'aria-label': 'Ver por quadro de líder' },
      op('', 'Todos os quadros', `${r.filtros.opcoes.quadros.length} ativos`),
      r.filtros.opcoes.quadros.map((q) => op(q.id, q.nome, q.lider ? `Líder: ${q.lider}` : '', q.cor)));
  }

  function secaoEquipe(r) {
    const e = r.equipe;
    if (!e) return null;
    const num = (n, rot, mod, dica) => h('div', { className: `ld-pnum${mod && n ? ` ld-pnum--${mod}` : ''}`, title: dica || null }, h('dt', { text: rot }), h('dd', { text: n == null ? '—' : String(n).replace('.', ',') }));
    const cartao = (p) => {
      const total = p.a_fazer + p.em_andamento + p.em_revisao;
      return h('article', { className: `ld-pessoa-g${p.papel === 'lider' ? ' ld-pessoa-g--lider' : ''}`, tabindex: '0', role: 'button', 'aria-label': `${p.nome}: abrir as tarefas no quadro`,
        on: { click: () => abrirQuadroFiltrado(e.quadro.id, { resp: p.id }), keydown: (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); abrirQuadroFiltrado(e.quadro.id, { resp: p.id }); } } } },
        h('header', { className: 'ld-pessoa-g__cab' },
          avatar(p.nome, p.papel === 'lider' ? 'ld-av--lider' : ''),
          h('div', null, h('strong', { text: p.nome }), h('small', { text: p.papel === 'lider' ? 'Líder do quadro' : 'Estagiário' })),
          p.atrasadas ? h('span', { className: 'ld-nivel ld-nivel--critico' }, h('i', { 'aria-hidden': 'true' }), plural(p.atrasadas, 'atrasada', 'atrasadas'))
            : p.abertas || p.concluidas ? h('span', { className: 'ld-nivel ld-nivel--ok' }, h('i', { 'aria-hidden': 'true' }), 'Em dia') : h('span', { className: 'ld-nivel ld-nivel--zero' }, 'Sem tarefas')),
        h('dl', { className: 'ld-pnums' },
          num(p.concluidas, 'concluídas no período', 'ok'),
          num(p.em_andamento, 'em andamento'),
          num(p.em_revisao, 'em revisão', 'lima'),
          num(p.a_fazer, 'a fazer'),
          num(p.atrasadas, 'atrasadas', 'alerta'),
          num(p.impedimentos, 'com impedimento', 'aviso'),
          num(p.noPrazo == null ? null : `${p.noPrazo}%`, 'prazo cumprido', '', p.basePrazo ? `${p.basePrazo} concluídas com prazo no período` : 'Nenhuma concluída com prazo no período'),
          num(p.tempoMedio, 'dias até concluir (média)')),
        total ? h('div', { className: 'ld-gkpi__pilha', role: 'img', 'aria-label': `${p.a_fazer} a fazer, ${p.em_andamento} em andamento, ${p.em_revisao} em revisão` },
          ['a_fazer', 'em_andamento', 'em_revisao'].map((c) => (p[c] ? h('span', { className: `ld-faixa-col__seg ld-faixa-col__seg--${c}`, style: { flex: String(p[c]) } }) : null))) : null,
        h('p', { className: 'ld-pessoa-g__rodape' }, total ? `${p.fatia}% das tarefas abertas do quadro` : 'Nenhuma tarefa aberta', h('span', null, 'Ver tarefas', ic('seta'))));
    };
    return h('section', { className: 'ld-gsec', 'aria-labelledby': 'ld-g-equipe', 'data-revela': '', style: { '--cor': corValida(e.quadro.cor) } },
      h('header', { className: 'ld-gsec__cab' },
        h('div', null, h('h2', { id: 'ld-g-equipe' }, 'Desempenho da equipe · ', h('span', { className: 'ld-g-equipe__q', text: e.quadro.nome })),
          h('p', { text: `Líder ${e.quadro.lider.nome} e cada estagiário, com os cartões reais do quadro. "Concluídas" e "prazo cumprido" contam o período escolhido; o resto é a situação de hoje. Clique numa pessoa para ver as tarefas dela.` }))),
      h('div', { className: 'ld-pessoas-g' }, e.pessoas.map(cartao)),
      e.semResponsavel ? h('p', { className: 'ld-dcard__nota' }, ic('usuario'), `${plural(e.semResponsavel, 'tarefa aberta sem responsável', 'tarefas abertas sem responsável')} neste quadro.`) : null);
  }

  /* ---------- alertas ---------- */
  function secaoAlertas({ r, raiz }) {
    const c = r.contagemAlertas;
    const lista = g.todosAlertas ? r.alertas : r.alertas.slice(0, 4);
    const cab = h('header', { className: 'ld-gsec__cab' },
      h('div', null, h('h2', { id: 'ld-g-alertas', text: 'Precisa de atenção' }), h('p', { text: 'Situações detectadas por regras objetivas, com limites que você ajusta.' })),
      h('div', { className: 'ld-niveis', 'aria-label': 'Alertas por nível' },
        ['critico', 'atencao', 'informativo'].map((n) => h('span', { className: `ld-nivel ld-nivel--${n}${c[n] ? '' : ' ld-nivel--zero'}` }, h('i', { 'aria-hidden': 'true' }), `${c[n]} ${NIVEL[n].toLowerCase()}`))));
    if (!r.alertas.length) {
      return h('section', { className: 'ld-gsec ld-gsec--alertas', 'aria-labelledby': 'ld-g-alertas', 'data-revela': '' }, cab,
        h('div', { className: 'ld-tudo-certo' }, h('span', { className: 'ld-vazio__ic' }, ic('aprovar')), h('div', null, h('strong', { text: 'Nada exige atenção agora.' }), h('p', { text: 'Sem tarefas vencidas, paradas ou concentradas além dos limites configurados.' }))));
    }
    return h('section', { className: 'ld-gsec ld-gsec--alertas', 'aria-labelledby': 'ld-g-alertas', 'data-revela': '' }, cab,
      h('ol', { className: 'ld-alertas' }, lista.map((a) => h('li', { className: `ld-alerta ld-alerta--${a.nivel}`, style: { '--cor': corValida(a.quadro.cor) } },
        h('div', { className: 'ld-alerta__topo' },
          h('span', { className: `ld-nivel ld-nivel--${a.nivel}` }, h('i', { 'aria-hidden': 'true' }), NIVEL[a.nivel]),
          h('span', { className: 'ld-alerta__onde' }, h('i', { 'aria-hidden': 'true' }), a.quadro.nome, h('small', { text: ` · líder ${a.lider.nome}` }))),
        h('h3', { className: 'ld-alerta__titulo', text: a.titulo }),
        h('dl', { className: 'ld-alerta__det' },
          h('div', null, h('dt', { text: 'Por que' }), h('dd', { text: a.porque })),
          h('div', null, h('dt', { text: 'Impacto' }), h('dd', { text: a.impacto })),
          h('div', null, h('dt', { text: 'Ação sugerida' }), h('dd', { text: a.acao }))),
        h('div', { className: 'ld-alerta__acoes' },
          a.tarefas.length ? h('button', { type: 'button', className: 'ld-botao ld-botao--sec ld-botao--mini', on: { click: () => abrirQuadroFiltrado(a.quadro.id, { ids: a.tarefas, rotuloIds: a.titulo }) } }, ic('olho'), `Ver ${plural(a.tarefas.length, 'tarefa', 'tarefas')}`) : null,
          h('button', { type: 'button', className: 'ld-botao ld-botao--mini', on: { click: () => modalOrientacao({ quadro: a.quadro, lider: a.lider, alerta: a }, () => gerencial(raiz)) } }, ic('megafone'), 'Enviar orientação ao líder'))))),
      r.alertas.length > 4 ? h('button', { type: 'button', className: 'ld-link ld-link--centro', on: { click: () => { g.todosAlertas = !g.todosAlertas; gerencial(raiz); } } }, g.todosAlertas ? 'Mostrar só os principais' : `Ver todos os ${r.alertas.length} alertas`) : null);
  }

  /* ---------- indicadores principais ---------- */
  function variacao(atual, anterior, { menorMelhor = false, sufixo = '' } = {}) {
    if (anterior == null || atual == null) return h('span', { className: 'ld-var ld-var--neutra', text: 'sem base anterior' });
    const d = Math.round((atual - anterior) * 10) / 10;
    if (!d) return h('span', { className: 'ld-var ld-var--neutra' }, ic('igual'), 'igual ao período anterior');
    const bom = menorMelhor ? d < 0 : d > 0;
    return h('span', { className: `ld-var ${bom ? 'ld-var--boa' : 'ld-var--ruim'}` }, ic(d > 0 ? 'subir' : 'descer'), `${d > 0 ? '+' : ''}${String(d).replace('.', ',')}${sufixo} vs. anterior (${String(anterior).replace('.', ',')}${sufixo})`);
  }
  function kpis(r) {
    const s = r.resumo;
    const k = (pergunta, valor, rotulo, rodape, mod, sufixo = '') => h('article', { className: `ld-gkpi${mod ? ` ld-gkpi--${mod}` : ''}` },
      h('p', { className: 'ld-gkpi__pergunta', text: pergunta }),
      h('p', { className: 'ld-gkpi__valor' }, valor == null ? h('span', { text: '—' }) : Number.isInteger(valor) ? h('span', { 'data-contar': String(valor), text: String(valor) }) : h('span', { text: String(valor).replace('.', ',') }), sufixo ? h('small', { text: sufixo }) : null),
      h('p', { className: 'ld-gkpi__rotulo', text: rotulo }),
      rodape);
    const barra = h('div', { className: 'ld-gkpi__pilha', role: 'img', 'aria-label': `${s.abertas.a_fazer} a fazer, ${s.abertas.em_andamento} em andamento, ${s.abertas.em_revisao} em revisão` },
      ['a_fazer', 'em_andamento', 'em_revisao'].map((c) => (s.abertas[c] ? h('span', { className: `ld-faixa-col__seg ld-faixa-col__seg--${c}`, style: { flex: String(s.abertas[c]) } }) : null)));
    return h('section', { className: 'ld-gkpis', 'aria-label': 'Indicadores principais', 'data-revela-lista': '' },
      k('Quanto trabalho está em aberto?', s.abertas.total, 'tarefas abertas', h('div', null, barra, h('p', { className: 'ld-gkpi__nota', text: `${s.abertas.a_fazer} a fazer · ${s.abertas.em_andamento} em andamento · ${s.abertas.em_revisao} em revisão` }))),
      k('Estamos entregando mais que antes?', s.concluidas.periodo, 'concluídas no período', variacao(s.concluidas.periodo, s.concluidas.anterior), 'lima'),
      k('O que entrou, está saindo?', s.pctConclusao, 'das criadas no período já concluídas', h('p', { className: 'ld-gkpi__nota', text: s.criadas.periodo ? `${s.criadas.concluidasDelas} de ${s.criadas.periodo} tarefas criadas no período` : 'Nenhuma tarefa criada no período' }), '', s.pctConclusao == null ? '' : '%'),
      k('Onde já perdemos o prazo?', s.atrasadas, 'tarefas vencidas', h('p', { className: 'ld-gkpi__nota', text: `${s.atrasadasAlta} de alta prioridade · ${s.proximas} vencem em até ${plural(r.config.diasProximo, 'dia', 'dias')}` }), s.atrasadas ? 'alerta' : ''),
      k('Quanto tempo leva uma entrega?', s.tempoMedio.periodo, 'tempo médio até concluir', variacao(s.tempoMedio.periodo, s.tempoMedio.anterior, { menorMelhor: true, sufixo: ' d' }), '', s.tempoMedio.periodo == null ? '' : ' dias'),
      k('O que é crítico está andando?', s.altaPrioridade.abertas, 'abertas de alta prioridade', h('p', { className: 'ld-gkpi__nota', text: `${plural(s.altaPrioridade.urgentes, 'urgente', 'urgentes')} · ${plural(s.bloqueadas, 'com impedimento', 'com impedimento')}` }), s.altaPrioridade.urgentes ? 'aviso' : ''));
  }

  /* ---------- evolução das entregas (SVG próprio, sem biblioteca): barras agrupadas criadas × concluídas ---------- */
  function graficoEvolucao(r) {
    const serie = r.serie;
    const porSemana = r.periodo.dias > 14;
    const W = 640, H = 220, ML = 30, MB = 28, MT = 14;
    const max = Math.max(1, ...serie.map((b) => Math.max(b.concluidas, b.criadas)));
    const passo = (W - ML) / serie.length;
    const larg = Math.max(4, Math.min(26, passo * 0.3));
    const y = (v) => MT + (H - MT - MB) * (1 - v / max);
    const ns = 'http://www.w3.org/2000/svg';
    const el = (tag, attrs, texto) => { const e = document.createElementNS(ns, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v)); if (texto != null) e.textContent = texto; return e; };
    const total = (k) => serie.reduce((s, b) => s + b[k], 0);
    const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, class: 'ld-evo__svg', role: 'img', 'aria-label': `Por ${porSemana ? 'semana' : 'dia'}: ${total('concluidas')} tarefas concluídas e ${total('criadas')} criadas no período.` });
    const marcas = [...new Set([0, Math.round(max / 2), max])];
    for (const v of marcas) svg.append(el('line', { x1: ML, x2: W, y1: y(v), y2: y(v), class: 'ld-evo__grade' }), el('text', { x: ML - 8, y: y(v) + 4, class: 'ld-evo__eixo', 'text-anchor': 'end' }, String(v)));
    const cada = Math.max(1, Math.ceil(serie.length / 8));
    serie.forEach((b, i) => {
      const cx = ML + passo * i + passo / 2;
      const barra = (v, x, classe) => el('rect', { x, y: y(v), width: larg, height: Math.max((H - MT - MB) * (v / max), v ? 2 : 0), rx: Math.min(4, larg / 2), class: classe, style: `--i:${i}` });
      const g1 = el('g', { class: 'ld-evo__grupo', tabindex: '0' });
      g1.append(el('title', {}, `${porSemana ? 'Semana de ' : ''}${dataCurta(b.de)}${b.de !== b.ate ? ` a ${dataCurta(b.ate)}` : ''}: ${b.concluidas} concluídas, ${b.criadas} criadas`),
        el('rect', { x: cx - passo / 2 + 2, y: MT, width: passo - 4, height: H - MT - MB, class: 'ld-evo__alvo', rx: 6 }),
        barra(b.criadas, cx - larg - 1.5, 'ld-evo__criadas'), barra(b.concluidas, cx + 1.5, 'ld-evo__concluidas'));
      svg.append(g1);
      if (i % cada === 0 && (serie.length - 1 - i >= cada / 2 || i === 0)) svg.append(el('text', { x: cx, y: H - 8, class: 'ld-evo__eixo', 'text-anchor': 'middle' }, dataCurta(b.de)));
    });
    const saldo = total('criadas') - total('concluidas');
    return h('section', { className: 'ld-gsec ld-dcard', 'aria-labelledby': 'ld-g-evo', 'data-revela': '' },
      h('header', { className: 'ld-gsec__cab ld-gsec__cab--compacto' },
        h('div', null, h('h2', { id: 'ld-g-evo', text: 'Evolução das entregas' }),
          h('p', { text: `Criadas e concluídas por ${porSemana ? 'semana' : 'dia'}. ${saldo > 0 ? `Entraram ${saldo} a mais do que saíram: o estoque de trabalho cresceu.` : saldo < 0 ? `Saíram ${-saldo} a mais do que entraram: o estoque de trabalho diminuiu.` : 'Entrou o mesmo tanto que saiu.'}` })),
        h('ul', { className: 'ld-legenda ld-legenda--linha' },
          h('li', null, h('span', { className: 'ld-leg ld-leg--criadas', 'aria-hidden': 'true' }), 'Criadas', h('strong', { text: String(total('criadas')) })),
          h('li', null, h('span', { className: 'ld-leg ld-leg--barra', 'aria-hidden': 'true' }), 'Concluídas', h('strong', { text: String(total('concluidas')) })))),
      h('div', { className: 'ld-evo' }, svg));
  }

  function cartaoPrazo(r) {
    const s = r.resumo;
    const R = 46, C = 2 * Math.PI * R;
    const anel = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    anel.setAttribute('viewBox', '0 0 120 120'); anel.setAttribute('class', 'ld-anel__svg'); anel.setAttribute('aria-hidden', 'true');
    anel.innerHTML = `<circle cx="60" cy="60" r="${R}" class="ld-anel__fundo"/><circle cx="60" cy="60" r="${R}" class="ld-anel__valor" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}"/>`;
    const v = anel.querySelector('.ld-anel__valor');
    requestAnimationFrame(() => requestAnimationFrame(() => { v.style.strokeDashoffset = String(C * (1 - (s.noPrazo.pct || 0) / 100)); }));
    return h('section', { className: 'ld-gsec ld-dcard ld-anel', 'aria-labelledby': 'ld-g-prazo', 'data-revela': '' },
      h('h2', { id: 'ld-g-prazo', className: 'ld-dcard__t', text: 'Entregas no prazo' }),
      h('div', { className: 'ld-anel__caixa ld-anel__caixa--p' }, anel, h('p', { className: 'ld-anel__pct' }, s.noPrazo.pct == null ? h('strong', { text: '—' }) : [h('strong', { 'data-contar': String(s.noPrazo.pct), text: String(s.noPrazo.pct) }), h('span', { text: '%' })])),
      h('p', { className: 'ld-dcard__nota', text: s.noPrazo.base ? `Das ${s.noPrazo.base} concluídas que tinham prazo.` : 'Nenhuma tarefa com prazo concluída no período.' }),
      h('dl', { className: 'ld-mini-dl' },
        h('div', null, h('dt', { text: 'Tempo médio' }), h('dd', { text: dias1(s.tempoMedio.periodo) })),
        h('div', null, h('dt', { text: 'Mediana' }), h('dd', { text: dias1(s.tempoMedio.mediana) }))));
  }

  /* ---------- comparativo entre quadros ---------- */
  function comparativo({ r, raiz }) {
    const d = r.destaques;
    const ORDENS = [['situacao', 'Situação'], ['abertas', 'Pendências'], ['atrasadas', 'Atrasos'], ['concluidas', 'Entregas'], ['evolucao', 'Evolução']];
    const peso = { critico: 0, atencao: 1, informativo: 2 };
    const ordenar = (lista) => [...lista].sort((a, b) => {
      if (g.ordem === 'situacao') return (peso[a.nivel] ?? 3) - (peso[b.nivel] ?? 3) || b.atrasadas - a.atrasadas || b.cargaPonderada - a.cargaPonderada;
      if (g.ordem === 'abertas') return b.cargaPonderada - a.cargaPonderada;
      if (g.ordem === 'atrasadas') return b.atrasadas - a.atrasadas || b.criticas - a.criticas;
      if (g.ordem === 'concluidas') return b.ritmo - a.ritmo || b.concluidas - a.concluidas;
      return (b.ritmo - b.ritmoAnterior) - (a.ritmo - a.ritmoAnterior);
    });
    const destaque = (rotulo, q, texto, mod, icone) => h('button', { type: 'button', className: `ld-destaque${mod ? ` ld-destaque--${mod}` : ''}`, disabled: !q, style: q ? { '--cor': corValida(q.cor) } : null,
      on: { click: () => q && abrirQuadroFiltrado(q.id, mod === 'alerta' ? { prazo: 'atrasadas' } : {}) } },
      h('span', { className: 'ld-destaque__rot' }, ic(icone), rotulo),
      h('strong', { text: q ? q.nome : '—' }),
      h('small', { text: q ? texto(q) : mod === 'lima' ? `Precisa de ${d.minimoEvolucao}+ entregas no período para comparar` : 'Nenhum no momento' }));
    const tendencia = (q) => {
      const dif = Math.round((q.ritmo - q.ritmoAnterior) * 10) / 10;
      return h('span', { className: `ld-var ${dif > 0 ? 'ld-var--boa' : dif < 0 ? 'ld-var--ruim' : 'ld-var--neutra'}`, title: `Ritmo ponderado por estagiário/semana: ${String(q.ritmo).replace('.', ',')} agora, ${String(q.ritmoAnterior).replace('.', ',')} antes` },
        ic(dif > 0 ? 'subir' : dif < 0 ? 'descer' : 'igual'), String(q.concluidas));
    };
    const corpo = h('div', { className: 'ld-tabela', role: 'table', 'aria-label': 'Comparativo entre quadros' },
      h('div', { className: 'ld-tabela__cab', role: 'row' },
        ['Quadro', 'Situação', 'Abertas', 'Atrasadas', 'Alta prior.', 'Concluídas', 'No prazo', 'Carga/estag.'].map((t) => h('span', { role: 'columnheader', text: t }))),
      ordenar(r.quadros).map((q) => h('div', { className: 'ld-tabela__linha', role: 'row', tabindex: '0', style: { '--cor': corValida(q.cor) },
        on: { click: (e) => { if (!e.target.closest('button')) abrirQuadroFiltrado(q.id, {}); }, keydown: (e) => { if (e.key === 'Enter') abrirQuadroFiltrado(q.id, {}); } } },
        h('span', { role: 'cell', className: 'ld-tabela__quadro' }, h('i', { 'aria-hidden': 'true' }), h('span', null, h('strong', { text: q.nome }), h('small', { text: `${q.lider.nome} · ${plural(q.estagiarios, 'estagiário', 'estagiários')}` }))),
        h('span', { role: 'cell', 'data-rot': 'Situação' }, h('span', { className: `ld-nivel ${q.nivel ? `ld-nivel--${q.nivel}` : 'ld-nivel--ok'}` }, h('i', { 'aria-hidden': 'true' }), q.situacao)),
        h('span', { role: 'cell', 'data-rot': 'Abertas', text: String(q.abertas) }),
        h('span', { role: 'cell', 'data-rot': 'Atrasadas' }, q.atrasadas ? h('button', { type: 'button', className: 'ld-cel-link ld-cel-link--alerta', title: 'Ver as atrasadas', on: { click: () => abrirQuadroFiltrado(q.id, { prazo: 'atrasadas' }) } }, String(q.atrasadas)) : '0'),
        h('span', { role: 'cell', 'data-rot': 'Alta prioridade' }, q.criticas ? h('button', { type: 'button', className: 'ld-cel-link', title: 'Ver as urgentes', on: { click: () => abrirQuadroFiltrado(q.id, { prio: 'urgente' }) } }, String(q.criticas)) : '0'),
        h('span', { role: 'cell', 'data-rot': 'Concluídas' }, tendencia(q)),
        h('span', { role: 'cell', 'data-rot': 'No prazo', text: q.noPrazo == null ? '—' : `${q.noPrazo}%` }),
        h('span', { role: 'cell', 'data-rot': 'Carga por estagiário', title: 'Peso das abertas (baixa 1, média 2, alta 3, urgente 4) por estagiário', text: String(q.cargaPorEstagiario).replace('.', ',') }))));
    const ord = h('div', { className: 'ld-segmento ld-segmento--mini', role: 'group', 'aria-label': 'Ordenar por' },
      ORDENS.map(([id, t]) => h('button', { type: 'button', className: 'ld-segmento__op', 'aria-pressed': String(g.ordem === id), on: { click: () => { g.ordem = id; gerencial(raiz); } } }, t)));
    return h('section', { className: 'ld-gsec', 'aria-labelledby': 'ld-g-comp', 'data-revela': '' },
      h('header', { className: 'ld-gsec__cab' }, h('div', null, h('h2', { id: 'ld-g-comp', text: 'Comparativo entre quadros' }), h('p', { text: 'Clique num quadro ou num número para abrir as tarefas já filtradas.' })), ord),
      h('div', { className: 'ld-destaques' },
        destaque('Mais pendências', d.maisPendencias, (q) => `${q.abertas} abertas · carga ${String(q.cargaPorEstagiario).replace('.', ',')} por estagiário`, '', 'kanban'),
        destaque('Mais entregas', d.maisEntregas, (q) => `${q.concluidas} concluídas · ${q.noPrazo == null ? 'sem prazo definido' : `${q.noPrazo}% no prazo`}`, 'ok', 'aprovar'),
        destaque('Melhor evolução', d.melhorEvolucao, (q) => `ritmo ${String(q.ritmo).replace('.', ',')} vs. ${String(q.ritmoAnterior).replace('.', ',')} antes`, 'lima', 'subir'),
        destaque('Mais atrasos', d.maisAtrasos, (q) => `${plural(q.atrasadas, 'tarefa vencida', 'tarefas vencidas')}`, 'alerta', 'relogio')),
      d.lideresComCriticas.length ? h('p', { className: 'ld-criticos' }, ic('alerta'), h('strong', { text: 'Líderes com tarefas críticas para os próximos dias: ' }),
        d.lideresComCriticas.map((l, i) => [i ? ', ' : '', h('span', { text: `${l.nome} (${l.tarefas})` })])) : null,
      r.quadros.length ? corpo : h('p', { className: 'ld-nada', text: 'Nenhum quadro ativo com esses filtros.' }));
  }

  /* ---------- distribuição por pessoa ---------- */
  function distribuicao(r) {
    const max = Math.max(1, ...r.pessoas.map((p) => p.carga));
    return h('section', { className: 'ld-gsec ld-dcard', 'aria-labelledby': 'ld-g-dist', 'data-revela': '' },
      h('header', { className: 'ld-gsec__cab ld-gsec__cab--compacto' },
        h('div', null, h('h2', { id: 'ld-g-dist', text: 'Distribuição de tarefas entre as pessoas' }), h('p', { text: 'Carga aberta ponderada pela prioridade e participação no total. Clique para filtrar a visão por pessoa.' }))),
      r.pessoas.length ? h('ol', { className: 'ld-dist ld-dist--g' }, r.pessoas.map((p) => h('li', null, h('button', { type: 'button', className: 'ld-dist__item ld-dist__btn', on: { click: () => { g.filtros.responsavel = p.id; gerencial(est.raiz); } } },
        avatar(p.nome, 'ld-av--p'),
        h('div', { className: 'ld-dist__info' },
          h('p', { className: 'ld-dist__cab' }, h('strong', { text: p.nome }), h('span', { text: `${p.participacao}% da carga aberta` })),
          h('div', { className: 'ld-dist__barra', style: { '--larg': `${(p.carga / max) * 100}%` }, role: 'img', 'aria-label': `${p.nome}: carga ${p.carga}` },
            p.abertas - p.atrasadas > 0 ? h('span', { className: 'ld-dist__seg', style: { flex: String(p.abertas - p.atrasadas) } }) : null,
            p.atrasadas ? h('span', { className: 'ld-dist__seg ld-dist__seg--alerta', style: { flex: String(p.atrasadas) } }) : null),
          h('p', { className: 'ld-dist__nums' },
            h('span', null, `${p.abertas} abertas`), h('span', null, `${p.concluidas} concluídas no período`),
            p.noPrazo != null ? h('span', null, `${p.noPrazo}% no prazo`) : null,
            p.atrasadas ? h('span', { className: 'ld-dist__alerta' }, `${p.atrasadas} atrasadas`) : null,
            h('span', { className: 'ld-dist__quadros', text: p.quadros.join(' · ') }))))))) : h('p', { className: 'ld-nada', text: 'Nenhuma tarefa distribuída com esses filtros.' }),
      r.semResponsavel ? h('p', { className: 'ld-dcard__nota' }, ic('usuario'), `${plural(r.semResponsavel, 'tarefa aberta sem responsável', 'tarefas abertas sem responsável')}.`) : null);
  }

  /* ---------- orientações enviadas (acompanhamento) ---------- */
  function linhaTempo(o) {
    const passo = (feito, rotulo, quando) => h('li', { className: feito ? 'ld-tempo__feito' : '' }, h('i', { 'aria-hidden': 'true' }), h('span', { text: rotulo }), quando ? h('time', { dateTime: quando, title: dataHora(quando), text: relativo(quando) }) : null);
    return h('ol', { className: 'ld-tempo', 'aria-label': 'Andamento da orientação' },
      passo(true, 'Enviada', o.criadoEm), passo(Boolean(o.lidaEm), 'Lida', o.lidaEm), passo(Boolean(o.tratadaEm), 'Tratada', o.tratadaEm));
  }
  function cartaoOrientacao(o, { recebida = false, aoMudar } = {}) {
    const art = h('article', { className: `ld-orient ld-orient--${o.prioridade} ld-orient--${o.situacao}`, style: { '--cor': corValida(o.quadroCor) } },
      h('header', { className: 'ld-orient__cab' },
        h('span', { className: `ld-prio-o ld-prio-o--${o.prioridade}` }, h('i', { 'aria-hidden': 'true' }), PRIO_ORIENT[o.prioridade]),
        h('span', { className: 'ld-alerta__onde' }, h('i', { 'aria-hidden': 'true' }), o.quadroNome),
        h('span', { className: `ld-situacao ld-situacao--${o.situacao}`, text: SITUACAO[o.situacao] })),
      h('p', { className: 'ld-orient__de' }, recebida ? `De ${o.autorNome}` : `Para ${o.liderNome}`, h('time', { dateTime: o.criadoEm, title: dataHora(o.criadoEm), text: ` · ${relativo(o.criadoEm)}` })),
      h('p', { className: 'ld-orient__msg', text: o.mensagem }),
      o.tarefas.length ? h('ul', { className: 'ld-orient__tarefas', 'aria-label': 'Tarefas vinculadas' }, o.tarefas.map((t) => h('li', null,
        h('button', { type: 'button', className: 'ld-cel-link', on: { click: () => abrirLink(o.quadroId, t.id) } }, ic('kanban'), t.titulo, t.status === 'concluido' ? h('small', { text: ' · concluída' }) : null)))) : null,
      o.nota ? h('p', { className: 'ld-orient__nota' }, h('strong', { text: 'Retorno do líder: ' }), o.nota) : null,
      linhaTempo(o));
    if (recebida && o.situacao !== 'tratada') {
      const nota = h('textarea', { rows: '2', maxlength: '1000', placeholder: 'O que foi feito? (opcional, o administrador vê este retorno)', 'aria-label': 'Retorno ao administrador' });
      const caixa = h('div', { className: 'ld-nota', hidden: true }, nota,
        h('div', { className: 'ld-nota__acoes' },
          h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => { caixa.hidden = true; botao.hidden = false; } } }, 'Cancelar'),
          h('button', { type: 'button', className: 'ld-botao', on: { click: async (e) => {
            e.currentTarget.disabled = true;
            const x = await api('POST', `acao=orientacao_tratada&id=${o.id}`, { nota: nota.value.trim() });
            if (x.erro) { avisar(x.erro.mensagem, 'erro'); e.currentTarget.disabled = false; return; }
            avisar('Orientação tratada. O administrador foi avisado.');
            pulsar(); aoMudar?.();
          } } }, ic('check'), 'Confirmar tratamento')));
      const botao = h('button', { type: 'button', className: 'ld-botao ld-botao--mini', on: { click: () => { caixa.hidden = false; botao.hidden = true; nota.focus(); } } }, ic('check'), 'Marcar como tratada');
      art.append(h('div', { className: 'ld-orient__acoes' }, botao), caixa);
    }
    return art;
  }
  function orientacoesEnviadas({ o, raiz }) {
    const todas = o.enviadas || [];
    const pend = todas.filter((x) => x.situacao !== 'tratada');
    const lista = g.orientFiltro === 'pendentes' ? pend : todas;
    const seg = h('div', { className: 'ld-segmento ld-segmento--mini', role: 'group', 'aria-label': 'Quais orientações' },
      [['pendentes', `Em aberto · ${pend.length}`], ['todas', `Todas · ${todas.length}`]].map(([id, t]) => h('button', { type: 'button', className: 'ld-segmento__op', 'aria-pressed': String(g.orientFiltro === id), on: { click: () => { g.orientFiltro = id; gerencial(raiz); } } }, t)));
    return h('section', { className: 'ld-gsec', 'aria-labelledby': 'ld-g-orient', 'data-revela': '' },
      h('header', { className: 'ld-gsec__cab' }, h('div', null, h('h2', { id: 'ld-g-orient', text: 'Orientações aos líderes' }), h('p', { text: 'Acompanhe o que foi enviado: lida, tratada e o retorno de cada líder.' })), seg),
      lista.length ? h('div', { className: 'ld-orients' }, lista.slice(0, 12).map((x) => cartaoOrientacao(x)))
        : h('p', { className: 'ld-nada', text: g.orientFiltro === 'pendentes' ? 'Nenhuma orientação em aberto.' : 'Nenhuma orientação enviada ainda. Use "Enviar orientação ao líder" num alerta.' }));
  }

  function comoCalculamos(r) {
    const c = r.config;
    return h('details', { className: 'ld-como' },
      h('summary', null, ic('ajustes'), 'Como os números e os alertas são calculados'),
      h('ul', null,
        h('li', { text: 'Tudo vem das tarefas reais: criação, conclusão, prazo, prioridade, status e a última atividade (movimentação, comentário, checklist ou edição).' }),
        h('li', { text: 'Carga e ritmo são ponderados pela prioridade (baixa 1, média 2, alta 3, urgente 4) e divididos pelo número de estagiários do quadro: um quadro grande não parece pior só por ter mais gente ou mais tarefas.' }),
        h('li', { text: `"Melhor evolução" compara o ritmo do período com o anterior e só considera quadros com ${r.destaques.minimoEvolucao} ou mais entregas, para evitar conclusões com pouco volume.` }),
        h('li', { text: `Limites atuais: prazo próximo em ${plural(c.diasProximo, 'dia', 'dias')}; crítico com ${c.atrasoCritico}+ vencidas ou alta prioridade atrasada há ${c.diasAtrasoCritico}+ dias; acúmulo acima de ${c.cargaPorEstagiario} abertas por estagiário; parada sem atividade há ${c.diasParada}+ dias; concentração acima de ${c.pctConcentracao}% (com ${c.minConcentracao}+ abertas); atrasos subindo duas semanas seguidas com alta de ${c.crescimentoMin}+.` })));
  }

  /* ---------- ajustes do administrador: teto de permissões e limites dos alertas ---------- */
  async function modalConfig() {
    const r = await api('GET', 'acao=config');
    if (r.erro) { avisar(r.erro.mensagem, 'erro'); return; }
    const teto = { ...r.teto };
    const tetoLista = h('ul', { className: 'ld-perms' }, r.catalogo.map((p) => {
      const chave = h('button', { type: 'button', role: 'switch', className: `ld-chave${p.critica ? ' ld-chave--critica' : ''}`, 'aria-checked': String(teto[p.id]), 'aria-label': p.nome,
        on: { click: () => { teto[p.id] = !teto[p.id]; chave.setAttribute('aria-checked', String(teto[p.id])); } } }, h('span', { className: 'ld-chave__bola', 'aria-hidden': 'true' }));
      return h('li', { className: 'ld-perm' }, h('div', { className: 'ld-perm__txt' }, h('span', { className: 'ld-perm__nome' }, p.nome, p.critica ? h('span', { className: 'ld-selo ld-selo--mini ld-selo--aviso', text: 'Sensível' }) : null), h('small', { text: p.texto })), chave);
    }));
    const campos = Object.entries(r.limites).map(([k, [min, max, rot]]) => h('label', { className: 'ld-limite' },
      h('span', { text: rot }), h('input', { type: 'number', name: k, min: String(min), max: String(max), step: '1', value: String(r.alertas[k]), required: true, inputmode: 'numeric' }),
      h('small', { text: `${min} a ${max} · padrão ${r.padroes.alertas[k]}` })));
    const erro = h('p', { className: 'ld-erro-geral', role: 'alert', hidden: true });
    const form = h('form', { id: 'ld-form-config', className: 'ld-form', novalidate: true }, erro,
      h('section', { className: 'ld-cfg' }, h('h3', { text: 'Teto de permissões' }), h('p', { className: 'ld-f__ajuda', text: 'O máximo que um líder pode liberar aos estagiários. Desligar aqui retira a permissão de todos na hora, mesmo de quem já tinha.' }), tetoLista),
      h('section', { className: 'ld-cfg' }, h('h3', { text: 'Limites dos alertas' }), h('p', { className: 'ld-f__ajuda', text: 'Ajuste para o tamanho da equipe e evitar avisos desnecessários.' }), h('div', { className: 'ld-limites' }, campos)));
    const salvar = h('button', { type: 'submit', form: 'ld-form-config', className: 'ld-botao' }, ic('check'), 'Salvar ajustes');
    const d = dialogo('ld-modal--largo', 'Ajustar alertas e permissões', form, [h('span', { className: 'ld-espaco' }), h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => fecharDialogo(d) } }, 'Cancelar'), salvar]);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const alertas = Object.fromEntries([...form.querySelectorAll('input[type=number]')].map((i) => [i.name, Number(i.value)]));
      const retirando = r.catalogo.filter((p) => r.teto[p.id] && !teto[p.id]);
      if (retirando.length && !(await confirmar({ titulo: 'Fechar permissões para todos os quadros?', texto: `${retirando.map((p) => p.nome).join(', ')} deixa(m) de valer imediatamente para todos os estagiários, mesmo onde o líder já tinha liberado.`, acao: 'Fechar e salvar', perigo: true }))) return;
      salvar.disabled = true;
      const x = await api('PATCH', 'acao=config', { teto, alertas });
      salvar.disabled = false;
      if (x.erro) { erro.textContent = x.erro.mensagem; erro.hidden = false; return; }
      fecharDialogo(d); avisar('Ajustes salvos e registrados.');
      if (P.rota?.secao === 'gerencial') gerencial(est.raiz);
    });
  }

  /* ---------- enviar orientação ao líder ---------- */
  async function modalOrientacao({ quadro: q, lider, alerta }, depois) {
    let tarefas = alerta?.tarefasDetalhe || [];
    if (!alerta) {
      const r = await api('GET', `quadro=${q.id}`);
      if (r.erro) { avisar(r.erro.mensagem, 'erro'); return; }
      tarefas = r.tarefas.filter((t) => t.status !== 'concluido').map((t) => ({ id: t.id, titulo: t.titulo }));
    }
    const marcadas = new Set(alerta ? tarefas.map((t) => t.id) : []);
    let prioridade = alerta?.nivel === 'critico' ? 'critica' : alerta?.nivel === 'atencao' ? 'alta' : 'normal';
    const msg = h('textarea', { id: 'ld-o-msg', name: 'mensagem', rows: '5', maxlength: '2000', required: true,
      value: alerta ? `${alerta.titulo}.\n\n${alerta.acao}` : '' });
    const prio = h('div', { className: 'ld-segmento ld-segmento--form ld-segmento--orient', role: 'radiogroup', 'aria-label': 'Prioridade da orientação' },
      [['normal', 'Normal'], ['alta', 'Alta'], ['critica', 'Crítica']].map(([v, n]) => h('label', { className: `ld-segmento__op ld-segmento__op--${v}` }, h('input', { type: 'radio', name: 'prioridade', value: v, checked: v === prioridade, on: { change: () => { prioridade = v; } } }), h('i', { 'aria-hidden': 'true' }), n)));
    const lista = tarefas.length ? h('div', { className: 'ld-escolha ld-escolha--uma' }, tarefas.map((t) => h('label', { className: 'ld-escolha__op' },
      h('input', { type: 'checkbox', checked: marcadas.has(t.id), on: { change: (e) => { if (e.target.checked) marcadas.add(t.id); else marcadas.delete(t.id); } } }),
      h('span', null, h('strong', { text: t.titulo })), h('span', { className: 'ld-escolha__check', 'aria-hidden': 'true' }, ic('check')))))
      : h('p', { className: 'ld-nada', text: 'Nenhuma tarefa aberta neste quadro.' });
    const erro = h('p', { className: 'ld-erro-geral', role: 'alert', hidden: true });
    const form = h('form', { id: 'ld-form-orient', className: 'ld-form', novalidate: true },
      h('div', { className: 'ld-destino' }, avatar(lider.nome, 'ld-av--lider'), h('div', null, h('small', { text: 'Para o líder' }), h('strong', { text: lider.nome }), h('span', { text: q.nome }))),
      alerta ? h('p', { className: `ld-alerta-ref ld-alerta-ref--${alerta.nivel}` }, ic('alerta'), h('span', null, h('strong', { text: `${NIVEL[alerta.nivel]}: ` }), alerta.porque)) : null,
      erro,
      h('div', { className: 'ld-f' }, h('p', { className: 'ld-f__rot', text: 'Prioridade' }), prio, h('small', { className: 'ld-f__ajuda', text: 'Crítica e alta ficam destacadas para o líder até ele marcar como tratada.' })),
      campoForm('Mensagem', msg, 'O líder vê seu nome, a mensagem e as tarefas vinculadas.', true),
      h('div', { className: 'ld-f' }, h('p', { className: 'ld-f__rot', text: `Tarefas vinculadas (${tarefas.length})` }), lista));
    const enviar = h('button', { type: 'submit', form: 'ld-form-orient', className: 'ld-botao' }, ic('enviar'), 'Enviar orientação');
    limparAoEditar(form);
    const d = dialogo('ld-modal--largo', 'Enviar orientação ao líder', form, [h('span', { className: 'ld-espaco' }), h('button', { type: 'button', className: 'ld-botao ld-botao--sec', on: { click: () => fecharDialogo(d) } }, 'Cancelar'), enviar]);
    msg.focus();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const texto = msg.value.trim();
      if (!erroCampo(form, 'mensagem', texto.length < 3 ? 'Escreva a orientação para o líder.' : '')) { msg.focus(); return; }
      enviar.disabled = true;
      const x = await api('POST', 'acao=orientacao', { quadro_id: q.id, mensagem: texto, prioridade, tarefas: [...marcadas], ...(alerta ? { alerta: alerta.id } : {}) });
      enviar.disabled = false;
      if (x.erro) { erro.textContent = x.erro.mensagem; erro.hidden = false; return; }
      fecharDialogo(d); avisar(`Orientação enviada a ${lider.nome.split(/\s+/)[0]}.`);
      depois?.();
    });
  }

  /* ============================================================
     9. Central de Orientações (líderes; o admin também vê as enviadas)
     ============================================================ */
  let abaOrient = 'pendentes';
  async function centralOrientacoes(raiz) {
    limparTela();
    est.quadroId = null; est.dados = null;
    const casca = h('div', { className: 'ld ld--orient' });
    const corpo = h('div', { className: 'ld-corpo ld-co' }, carregando('Carregando as orientações…'));
    casca.replaceChildren(navArea('orientacoes'),
      h('header', { className: 'ld-gcab ld-gcab--compacto' },
        h('div', { className: 'ld-gcab__luz', 'aria-hidden': 'true' }),
        h('div', { className: 'ld-gcab__txt' },
          h('p', { className: 'ld-secao-cab__olho', text: 'Orientações' }),
          titulo(h('h1', { className: 'ld-gcab__titulo', text: 'Do administrador para você' })),
          h('p', { className: 'ld-gcab__lead', text: 'Orientações sobre os quadros que você lidera. Elas ficam aqui até você marcar como tratadas, mesmo depois de lidas.' }))),
      corpo);
    raiz.replaceChildren(casca);
    const r = await api('GET', 'acao=orientacoes');
    if (!casca.isConnected) return null;
    if (r.erro) { corpo.replaceChildren(falha(r, () => centralOrientacoes(raiz))); return null; }
    // confirmação de leitura: o que aparece na tela como pendente passa a "lida"
    const naoLidas = r.recebidas.filter((o) => o.situacao === 'pendente');
    if (naoLidas.length) Promise.all(naoLidas.map((o) => api('POST', `acao=orientacao_lida&id=${o.id}`))).then(() => pulsar());
    const pend = r.recebidas.filter((o) => o.situacao !== 'tratada');
    const trat = r.recebidas.filter((o) => o.situacao === 'tratada');
    const abas = [['pendentes', `Pendentes · ${pend.length}`], ['tratadas', `Tratadas · ${trat.length}`], ...(r.admin ? [['enviadas', `Enviadas por mim e pela equipe · ${r.enviadas.length}`]] : [])];
    if (!abas.some(([id]) => id === abaOrient)) abaOrient = 'pendentes';
    const seg = h('div', { className: 'ld-segmento', role: 'group', 'aria-label': 'Quais orientações' },
      abas.map(([id, t]) => h('button', { type: 'button', className: 'ld-segmento__op', 'aria-pressed': String(abaOrient === id), on: { click: () => { abaOrient = id; centralOrientacoes(raiz); } } }, t)));
    const lista = abaOrient === 'pendentes' ? pend : abaOrient === 'tratadas' ? trat : r.enviadas;
    const ordem = { critica: 0, alta: 1, normal: 2 };
    const ordenada = abaOrient === 'pendentes' ? [...lista].sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade] || b.criadoEm.localeCompare(a.criadoEm)) : lista;
    corpo.replaceChildren(h('div', { className: 'ld-ferramentas' }, seg),
      ordenada.length ? h('div', { className: 'ld-orients ld-orients--central' }, ordenada.map((o) => cartaoOrientacao(o, { recebida: abaOrient !== 'enviadas', aoMudar: () => centralOrientacoes(raiz) })))
        : h('div', { className: 'ld-vazio' }, h('span', { className: 'ld-vazio__ic' }, ic(abaOrient === 'pendentes' ? 'aprovar' : 'megafone')),
          h('h2', { text: abaOrient === 'pendentes' ? 'Tudo tratado' : 'Nada por aqui' }),
          h('p', { text: abaOrient === 'pendentes' ? 'Nenhuma orientação aguardando você.' : abaOrient === 'tratadas' ? 'As orientações tratadas aparecem aqui, com o seu retorno.' : 'As orientações enviadas aos líderes aparecem aqui.' })));
    const ind = MOV ? MOV.indicador(seg, '[aria-pressed="true"]', 'ld-segmento__ind') : null;
    if (ind) est.limpar.push(() => ind.destruir());
    revelar(corpo);
    return null;
  }


  /* ============================================================
     6. Sincronização (polling leve) e notificações
     ============================================================ */
  const INTERVALO_QUADRO = 20000;
  const INTERVALO_SINO = 45000;
  function iniciarPolling() {
    clearInterval(est.timer);
    est.timer = setInterval(pulsar, INTERVALO_QUADRO);
  }
  let pulsando = false;
  async function pulsar() {
    if (document.hidden || pulsando) return;
    pulsando = true;
    try {
      const q = est.quadroId;
      const r = await api('GET', `acao=pulso${q ? `&quadro=${q}` : ''}`);
      if (r.erro) { if (r.erro.status === 404 && q && est.quadroId === q) { avisar('Você não tem mais acesso a este quadro.', 'erro'); P.irPara({ area: 'lideres' }); } return; }
      sino.contar(r.naoLidas);
      sino.orientar(r.orientacoes);
      if (q && est.quadroId === q && r.versao !== est.versao && !est.arrastando && !document.querySelector('dialog[open]')) {
        await recarregar();
        const ativo = document.activeElement;
        const digitando = est.painel && ativo && est.painel.aside.contains(ativo) && /^(TEXTAREA|INPUT|SELECT)$/.test(ativo.tagName);
        if (est.painelId && !digitando) carregarPainel(est.painelId);
      }
    } finally { pulsando = false; }
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden && (est.timer || sino.ativo)) pulsar(); });

  const ICONE_NOTIF = { atribuicao: 'usuario', prazo_proximo: 'relogio', atraso: 'alerta', revisao: 'enviar', aprovada: 'aprovar', ajuste: 'ajuste', mencao: 'mencao', entrada: 'entrar', saida: 'sair', orientacao: 'megafone', orientacao_tratada: 'check', permissoes: 'cadeado' };
  const sino = {
    ativo: false, botao: null, painel: null, n: 0, timer: null, orient: { total: 0, criticas: 0, altas: 0, naoLidas: 0 },
    /** Orientações pendentes do líder: não somem ao serem vistas; o sino ganha um anel quando há crítica. */
    orientar(o) {
      if (!o || !this.botao) return;
      const antes = this.orient.total;
      this.orient = o;
      this.botao.classList.toggle('ld-sino--critico', o.criticas > 0);
      this.botao.classList.toggle('ld-sino--orientacao', o.total > 0 && !o.criticas);
      document.querySelectorAll('[data-ld-orient]').forEach((el) => atualizarFaixa(el));
      document.querySelectorAll('.ld-area-nav__n').forEach((el) => { el.textContent = String(o.total); el.hidden = !o.total; });
      if (o.total > antes && antes >= 0 && o.criticas && !reduzido()) this.botao.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(12deg)' }, { transform: 'rotate(-9deg)' }, { transform: 'rotate(0)' }], { duration: 600 });
    },
    contar(n) {
      if (!this.botao) return;
      const antes = this.n; this.n = Number(n) || 0;
      const b = this.botao.querySelector('.ld-sino__n');
      b.textContent = this.n > 99 ? '99+' : String(this.n);
      b.hidden = !this.n;
      this.botao.setAttribute('aria-label', this.n ? `Notificações: ${plural(this.n, 'não lida', 'não lidas')}` : 'Notificações');
      if (this.n > antes && !reduzido()) b.animate([{ transform: 'scale(.4)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'cubic-bezier(.34,1.56,.64,1)' });
    },
  };
  function iniciarSino(onde) {
    if (sino.ativo || !onde) return;
    sino.ativo = true;
    sino.botao = h('button', { type: 'button', className: 'ld-sino', 'aria-haspopup': 'dialog', 'aria-expanded': 'false', 'aria-label': 'Notificações', title: 'Notificações do Processo de Líderes',
      on: { click: () => (sino.painel ? fecharNotifs() : abrirNotifs()) } }, ic('sino'), h('span', { className: 'ld-sino__n', hidden: true }));
    onde.append(sino.botao);
    pulsar();
    sino.timer = setInterval(() => { if (!est.timer) pulsar(); }, INTERVALO_SINO);
  }
  function fecharNotifs() {
    sino.painel?.remove(); sino.painel = null;
    sino.botao?.setAttribute('aria-expanded', 'false');
    document.removeEventListener('pointerdown', foraNotifs, true);
  }
  function foraNotifs(e) { if (sino.painel && !sino.painel.contains(e.target) && !sino.botao.contains(e.target)) fecharNotifs(); }
  async function abrirNotifs() {
    const painel = h('div', { className: 'ld-notifs', role: 'dialog', 'aria-label': 'Notificações', tabindex: '-1',
      on: { keydown: (e) => { if (e.key === 'Escape') { fecharNotifs(); sino.botao.focus(); } } } }, carregando('Carregando…'));
    sino.painel = painel;
    document.body.append(painel);
    posicionarNotifs();
    sino.botao.setAttribute('aria-expanded', 'true');
    setTimeout(() => document.addEventListener('pointerdown', foraNotifs, true));
    const r = await api('GET', 'acao=notificacoes');
    if (sino.painel !== painel) return;
    if (r.erro) { painel.replaceChildren(h('p', { className: 'ld-notifs__vazio', text: r.erro.mensagem })); return; }
    sino.contar(r.naoLidas);
    const marcarTodas = h('button', { type: 'button', className: 'ld-notifs__todas', disabled: !r.naoLidas, on: { click: async () => {
      const x = await api('POST', 'acao=lidas', { todas: true });
      if (x.erro) { avisar(x.erro.mensagem, 'erro'); return; }
      sino.contar(x.naoLidas);
      painel.querySelectorAll('.ld-notif--nova').forEach((n) => n.classList.remove('ld-notif--nova'));
      marcarTodas.disabled = true;
    } } }, ic('check'), 'Marcar todas como lidas');
    const o = sino.orient;
    const blocoOrient = o.total ? h('button', { type: 'button', className: `ld-notifs__orient${o.criticas ? ' ld-notifs__orient--critico' : ''}`, on: { click: () => { fecharNotifs(); P.irPara({ area: 'lideres', secao: 'orientacoes' }); } } },
      h('span', { className: 'ld-notif__ic' }, ic('megafone')),
      h('span', { className: 'ld-notif__txt' }, h('strong', { text: `${plural(o.total, 'orientação pendente', 'orientações pendentes')}` }),
        h('small', { text: o.criticas ? `${plural(o.criticas, 'crítica', 'críticas')} · ficam aqui até você marcar como tratadas` : 'Do administrador · ficam aqui até você marcar como tratadas' })),
      ic('seta')) : null;
    painel.replaceChildren(
      h('div', { className: 'ld-notifs__cab' }, h('h2', { text: 'Notificações' }), marcarTodas),
      blocoOrient,
      r.itens.length ? h('ol', { className: 'ld-notifs__lista' }, r.itens.map((n) => h('li', null,
        h('button', { type: 'button', className: `ld-notif ld-notif--${n.tipo}${n.lida ? '' : ' ld-notif--nova'}`, on: { click: async () => {
          if (!n.lida) { api('POST', 'acao=lidas', { ids: [n.id] }).then((x) => { if (!x.erro) sino.contar(x.naoLidas); }); }
          fecharNotifs();
          if (n.tipo === 'orientacao') { P.irPara({ area: 'lideres', secao: 'orientacoes' }); return; }
          if (n.tipo === 'orientacao_tratada' && est.eu?.papel === 'admin') { P.irPara({ area: 'lideres', secao: 'gerencial' }); return; }
          if (n.quadroId) abrirLink(n.quadroId, n.tipo === 'saida' ? null : n.tarefaId);
        } } },
          h('span', { className: 'ld-notif__ic' }, ic(ICONE_NOTIF[n.tipo] || 'sino')),
          h('span', { className: 'ld-notif__txt' }, h('span', { text: n.texto }),
            h('small', null, n.quadroNome ? h('span', { className: 'ld-notif__quadro', style: { '--cor': corValida(n.quadroCor) } }, n.quadroNome) : null, h('time', { dateTime: n.criadoEm, text: relativo(n.criadoEm) })))))))
        : h('div', { className: 'ld-notifs__vazio' }, ic('sino'), h('p', { text: 'Nada novo por aqui.' }), h('small', { text: 'Atribuições, revisões, prazos e menções aparecem aqui.' })));
    painel.focus();
  }
  function posicionarNotifs() {
    if (!sino.painel || !sino.botao) return;
    const b = sino.botao.getBoundingClientRect();
    const larg = Math.min(380, innerWidth - 16);
    sino.painel.style.width = `${larg}px`;
    sino.painel.style.left = `${Math.max(8, Math.min(innerWidth - larg - 8, b.right - larg))}px`;
    sino.painel.style.top = `${b.bottom + 8}px`;
  }
  addEventListener('resize', posicionarNotifs);

  /** Link de notificação: abre o quadro (e a tarefa). Se o quadro já está aberto, só abre o painel. */
  function abrirLink(quadroId, tarefaId) {
    if (est.quadroId === String(quadroId) && est.dados && P.rota?.area === 'lideres') { if (tarefaId) abrirPainel(String(tarefaId)); return; }
    P.irPara({ area: 'lideres', secao: tarefaId ? `q-${quadroId}-t-${tarefaId}` : `q-${quadroId}` });
  }

  // Ao sair da área: para o polling do quadro e fecha o painel (o sino continua).
  document.addEventListener('ff:aba', (e) => { if (e.detail?.aba !== 'lideres') { limparTela(); est.quadroId = null; est.dados = null; } });

  window.Lideres = Object.freeze({ desenhar, iniciarSino, abrirLink });
})();
