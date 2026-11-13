/* Faktory Flow — Metodologia (refatoracao-guia-do-consultor/14-metodologia.md).
   Telas das quatro seções, desenhadas a partir de GET /api/conteudo (fonte única: `recursos` de cada módulo e `videos`
   da biblioteca) e do manual institucional (/metodologia/manual-faktory-flow.json):
     catálogo (Metodologia do Consultor) · página do módulo (vídeo, checklist e manual) · Manuais de Apoio · leitor do
     manual · Biblioteca de Vídeos · player · Metodologia Faktory Flow.
   Sem dependências e sem HTML vindo dos dados (textContent sempre). CSP script-src 'self'.
   Expõe window.Metodologia = { desenhar(area, alvo, rota, ctx), buscar(), indice() }.
   ctx (guia-abas.js) = { resumo: () => Promise, valida: () => boolean, irPara(rota) }. */
(() => {
  const UI = window.PlataformaUI;
  const P = window.Plataforma;
  if (!UI || !P) return;

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
        else el.setAttribute(k, v === true ? '' : String(v));
      }
    }
    anexar(el, filhos);
    return el;
  }
  function anexar(el, filhos) {
    for (const f of filhos.flat(Infinity)) {
      if (f == null || f === false) continue;
      el.append(f instanceof Node ? f : document.createTextNode(String(f)));
    }
    return el;
  }
  const ic = (nome) => UI.icone(nome);
  const ilustracao = (id) => (window.PlataformaIcones ? window.PlataformaIcones.modulo(id) : ic(id));
  const reduzido = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const semAcento = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const corValida = (c) => (/^#[0-9a-f]{6}$/i.test(String(c || '')) ? c : '#3478A7');
  const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;
  const tempo = (s) => { const t = Math.max(0, Math.floor(s || 0)); return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
  const duracao = (s) => (s ? `${Math.floor(s / 60)} min ${String(Math.round(s % 60)).padStart(2, '0')} s` : '');
  const data = (d) => { if (!d) return ''; const x = new Date(`${String(d).slice(0, 10)}T12:00:00`); return Number.isNaN(x.getTime()) ? '' : x.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }); };
  const ir = (rota) => P.irPara(rota);
  const TIPOS = [['video', 'Vídeo completo', 'video'], ['checklist', 'Checklist de implantação', 'checklist'], ['manual', 'Manual de apoio', 'manual']];
  /* Áreas do catálogo: na ordem em que a operação da empresa acontece, com nomes neutros. É organização, não trilha:
     nenhum grupo diz por onde começar (pedido do responsável, 13/11/2026). */
  const FASES = [
    { id: 'base', titulo: 'Base do sistema', texto: 'Navegação e os cadastros que os outros módulos usam.', ids: ['primeiros-passos', 'fundacao'] },
    { id: 'comercial', titulo: 'Comercial', texto: 'Do primeiro contato com o cliente ao pedido de venda.', ids: ['crm', 'cem', 'vendas'] },
    { id: 'operacao', titulo: 'Suprimentos e operação', texto: 'Comprar, receber, guardar, produzir, instalar e entregar.', ids: ['compras', 'recebimento', 'estoque', 'producao', 'servicos', 'projetos', 'expedicao'] },
    { id: 'fiscal', titulo: 'Fiscal e financeiro', texto: 'Nota fiscal, tributos, contas a pagar e a receber.', ids: ['faturamento', 'fiscal', 'financeiro'] },
    { id: 'gestao', titulo: 'Gestão e análise', texto: 'Acompanhar o trabalho da equipe e analisar os números.', ids: ['tarefas', 'relatorios', 'alumina'] },
    { id: 'completo', titulo: 'Visão de ponta a ponta', texto: 'Como os módulos se ligam numa operação completa.', ids: ['fluxo-completo'] },
  ];
  const SITUACAO = { aprovado: 'Aprovado', revisao: 'Em revisão', rascunho: 'Rascunho' };

  function agrupar(modulos) {
    const usados = new Set();
    const grupos = FASES.map((f) => ({ ...f, mods: f.ids.map((id) => modulos.find((m) => m.id === id)).filter((m) => m && !usados.has(m.id) && usados.add(m.id)) }));
    const resto = modulos.filter((m) => !usados.has(m.id));
    if (resto.length) grupos.push({ id: 'outros', titulo: 'Outros módulos', texto: '', mods: resto });
    return grupos.filter((g) => g.mods.length);
  }

  /** Estado de um recurso para a interface: disponivel | revisar | preparacao | oculto. */
  function estadoRecurso(r) {
    if (!r) return { id: 'oculto', rotulo: 'Indisponível para o seu perfil' };
    if (r.status !== 'disponivel') return { id: 'preparacao', rotulo: 'Em preparação' };
    if (r.revisar) return { id: 'revisar', rotulo: `Revisar: feito na v${r.versaoSistema}` };
    return { id: 'disponivel', rotulo: 'Disponível' };
  }
  const completos = (m) => TIPOS.every(([t]) => m.recursos?.[t]?.status === 'disponivel');

  /* ---------- estados de página ---------- */
  function carregando(alvo, texto) {
    alvo.replaceChildren(h('div', { className: 'mt-carregando', role: 'status', 'aria-live': 'polite' },
      h('span', { className: 'mt-carregando__barra', 'aria-hidden': 'true' }), h('span', { text: texto || 'Carregando…' })));
  }
  function falha(alvo, erro, tentar) {
    const e = (erro && erro.erro) || erro || {};
    alvo.replaceChildren(h('div', { className: 'mt-vazio mt-vazio--erro', role: 'alert' },
      h('span', { className: 'mt-vazio__ic' }, ic('alerta')),
      h('h2', { text: e.status === 403 ? 'Conteúdo restrito ao seu perfil' : e.status === 404 ? 'Não encontramos este conteúdo' : 'Não foi possível carregar' }),
      h('p', { text: e.mensagem || 'Confira a conexão e tente de novo.' }),
      tentar ? h('button', { className: 'mt-botao', type: 'button', on: { click: tentar } }, ic('tentar'), 'Tentar de novo') : null));
  }
  function vazio(texto, acao) {
    return h('div', { className: 'mt-vazio' }, h('span', { className: 'mt-vazio__ic' }, ic('relogio')), h('p', { text: texto }), acao || null);
  }

  /* Movimento (movimento.js): revelar na rolagem, uma vez, com stagger curto. As limpezas saem na troca de tela. */
  const MOV = window.FFMovimento || null;
  const limpezas = [];
  function entrar(raiz) {
    if (!MOV) return;
    limpezas.push(MOV.revelar(raiz));
  }
  let ultimoModulo = null; // para o elemento compartilhado na volta ao catálogo

  /* Títulos com as palavras subindo por máscara (movimento.js); sem movimento, o título fica como está. */
  const titulo1 = (el, opcoes) => (MOV ? MOV.palavras(el, opcoes) : el);

  /* ---------- cabeçalho comum das seções claras ---------- */
  function cabecalho(titulo, texto, extra) {
    return h('header', { className: 'mt-cab' },
      h('div', { className: 'mt-cab__txt' }, titulo1(h('h1', { className: 'mt-cab__titulo', text: titulo })), texto ? h('p', { className: 'mt-cab__lead mov-foco', text: texto }) : null),
      extra || null);
  }

  /** Número que sobe até o valor real quando a tela abre. */
  function contador(n) {
    const el = h('strong', { text: n, 'aria-label': String(n) });
    if (MOV) MOV.contar(el, n, { atraso: 260 });
    return el;
  }

  /** Cobertura real dos materiais (não é métrica decorativa: diz o que existe e o que falta). */
  function cobertura(modulos) {
    const total = modulos.length;
    return h('dl', { className: 'mt-cobertura', 'aria-label': 'Materiais publicados', 'data-revela': '' },
      TIPOS.map(([t, nome, icone]) => {
        const n = modulos.filter((m) => m.recursos?.[t]?.status === 'disponivel').length;
        return h('div', { className: 'mt-cobertura__item', style: { '--p': total ? n / total : 0 } },
          h('dt', null, ic(icone), nome), h('dd', null, contador(n), ` de ${total}`),
          h('span', { className: 'mt-cobertura__trilho', 'aria-hidden': 'true' }, h('i')));
      }));
  }

  /* ============================================================
     1. Metodologia do Consultor — catálogo de módulos
     ============================================================ */
  function linhaRecurso(m, tipo, nome, icone, progresso) {
    const r = m.recursos?.[tipo];
    const e = estadoRecurso(r);
    let detalhe = e.id === 'preparacao' ? 'Em preparação' : e.id === 'oculto' ? 'Indisponível' : '';
    if (r && r.status === 'disponivel') {
      if (tipo === 'checklist') detalhe = progresso != null ? `${r.itens} itens · ${progresso}% feito` : `${r.itens} itens`;
      if (tipo === 'manual') detalhe = `${plural(r.passos, 'passo', 'passos')} · ${plural(r.telas, 'tela', 'telas')}`;
      if (tipo === 'video') detalhe = duracao(r.duracao_s);
    }
    return h('li', { className: 'mt-rec', data: { estado: e.id } },
      h('span', { className: 'mt-rec__ic' }, ic(icone)),
      h('span', { className: 'mt-rec__nome', text: nome }),
      h('span', { className: 'mt-rec__det', text: detalhe }),
      tipo === 'checklist' && progresso ? h('span', { className: 'mt-rec__barra', style: { '--p': progresso / 100 }, 'aria-hidden': 'true' }) : null);
  }

  function cartao(m, progresso) {
    const p = m.recursos?.checklist ? progresso[m.recursos.checklist.chave] : null;
    const cor = corValida(m.cor);
    const nomeId = `mt-c-${m.id}`;
    const abrirModulo = (e) => {
      const card = e.currentTarget;
      if (MOV) { MOV.nomear(card.querySelector('.mt-card__palco'), 'mt-palco'); MOV.nomear(card.querySelector('.mt-card__titulo'), 'mt-titulo'); }
      ir({ area: 'metodologia', modulo: m.id });
    };
    const li = h('li', { className: 'mt-card-item', data: { flip: m.id } },
      h('button', { className: 'mt-card', type: 'button', style: { '--c': cor }, 'aria-labelledby': nomeId,
        data: { completo: completos(m) }, on: { click: abrirModulo } },
      h('span', { className: 'mt-card__palco', 'aria-hidden': 'true' }, h('span', { className: 'fi-wrap fi' }, ilustracao(m.id))),
      h('span', { className: 'mt-card__corpo' },
        h('span', { className: 'mt-card__titulo', id: nomeId, text: m.titulo }),
        m.subtitulo ? h('span', { className: 'mt-card__sub', text: m.subtitulo }) : null),
      h('ul', { className: 'mt-card__recs', 'aria-label': 'Materiais' }, TIPOS.map(([t, nome, i]) => linhaRecurso(m, t, nome.split(' ')[0], i, t === 'checklist' ? p : null))),
      m.oculto ? h('span', { className: 'mt-selo mt-selo--oculto' }, ic('oculto'), 'Oculto para os outros perfis') : null,
      h('span', { className: 'mt-card__seta', 'aria-hidden': 'true' }, ic('seta'))));
    // Voltando do módulo: o cartão dele recebe os nomes e a ilustração "volta" para o lugar.
    if (MOV && ultimoModulo === m.id) { MOV.nomear(li.querySelector('.mt-card__palco'), 'mt-palco'); MOV.nomear(li.querySelector('.mt-card__titulo'), 'mt-titulo'); }
    return li;
  }

  async function catalogo(alvo, ctx) {
    carregando(alvo, 'Carregando os módulos…');
    const [r, progresso] = await Promise.all([ctx.resumo(), P.progressoResumo()]);
    if (!ctx.valida()) return;
    if (!r || r.erro) { falha(alvo, r, () => catalogo(alvo, { ...ctx, resumo: () => ctx.resumo(true) })); return; }
    const modulos = r.modulos || [];
    let filtro = 'todos';
    let termo = '';
    const grade = h('div', { className: 'mt-grupos' });
    const contagem = h('p', { className: 'mt-contagem', 'aria-live': 'polite' });
    const passa = (m) => {
      if (termo && !semAcento(`${m.titulo} ${m.subtitulo || ''}`).includes(termo)) return false;
      if (filtro === 'completos') return completos(m);
      if (filtro === 'pendentes') return !completos(m);
      if (filtro === 'revisar') return TIPOS.some(([t]) => m.recursos?.[t]?.revisar);
      return true;
    };
    function desenharGrade() {
      const lista = modulos.filter(passa);
      contagem.textContent = `${plural(lista.length, 'módulo', 'módulos')}`;
      if (!lista.length) { grade.replaceChildren(vazio('Nenhum módulo com esse filtro. Limpe a busca ou escolha outro filtro.')); return; }
      grade.replaceChildren(...agrupar(lista).map((g) => h('section', { className: 'mt-grupo', 'aria-labelledby': `mt-g-${g.id}` },
        h('div', { className: 'mt-grupo__cab', 'data-revela': '' }, h('h2', { id: `mt-g-${g.id}`, text: g.titulo }), g.texto ? h('p', { text: g.texto }) : null,
          h('span', { className: 'mt-grupo__n', text: plural(g.mods.length, 'módulo', 'módulos') })),
        h('ul', { className: 'mt-cards', 'data-revela-lista': '' }, g.mods.map((m) => cartao(m, progresso))))));
    }
    // Filtrar ou buscar: os cartões que ficam deslizam até o lugar novo (FLIP); na primeira vez, revelam na rolagem.
    let primeiraVez = true;
    function redesenhar() {
      if (primeiraVez || !MOV) { desenharGrade(); primeiraVez = false; return; }
      MOV.layout(grade, desenharGrade);
    }
    const FILTROS = [['todos', 'Todos'], ['completos', 'Com os 3 materiais'], ['pendentes', 'Com material em preparação'], ['revisar', 'Para revisar']];
    const filtros = h('div', { className: 'mt-segmento', role: 'group', 'aria-label': 'Filtrar módulos' },
      FILTROS.map(([id, rot]) => h('button', { type: 'button', className: 'mt-segmento__op', 'aria-pressed': String(id === filtro), data: { filtro: id },
        on: { click: (e) => { filtro = id; filtros.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === id))); trilho?.mover(); redesenhar(); e.currentTarget.focus(); } } }, rot)));
    let trilho = null;
    const busca = h('label', { className: 'mt-busca-local' }, ic('busca'),
      h('span', { className: 'mt-sr', text: 'Filtrar módulos pelo nome' }),
      h('input', { type: 'search', placeholder: 'Filtrar módulos…', autocomplete: 'off', on: { input: (e) => { termo = semAcento(e.target.value.trim()); redesenhar(); } } }));
    const relatorio = h('button', { type: 'button', className: 'mt-botao mt-botao--sec', on: { click: (e) => relatorioGeral(e.currentTarget, modulos) } }, ic('alerta'), 'Relatório de problemas');
    alvo.replaceChildren(h('div', { className: 'mt-pagina' },
      cabecalho('Metodologia do Consultor',
        'Todos os módulos do Faktory Flow, agrupados por área na ordem em que a operação acontece. Abra qualquer um, na ordem que a implantação pedir: cada módulo reúne o vídeo completo, o checklist de implantação e o manual de apoio.',
        cobertura(modulos)),
      h('div', { className: 'mt-barra' }, busca, filtros, relatorio),
      contagem, grade));
    redesenhar();
    if (MOV) { trilho = MOV.indicador(filtros, '[aria-pressed="true"]', 'mt-segmento__trilho'); limpezas.push(trilho.destruir); }
    ultimoModulo = null;
  }

  /* ============================================================
     2. Página do módulo
     ============================================================ */
  async function paginaModulo(alvo, rota, ctx) {
    carregando(alvo, 'Carregando o módulo…');
    const [r, progresso] = await Promise.all([ctx.resumo(), P.progressoResumo()]);
    if (!ctx.valida()) return;
    if (!r || r.erro) { falha(alvo, r, () => paginaModulo(alvo, rota, ctx)); return; }
    const modulos = r.modulos || [];
    const i = modulos.findIndex((m) => m.id === rota.modulo);
    if (i < 0) { falha(alvo, { status: 404, mensagem: 'Este módulo não existe ou não está liberado para o seu perfil.' }); return; }
    const m = modulos[i];
    const cor = corValida(m.cor);
    const relacionados = (r.videos || []).filter((v) => v.modulos.includes(m.id));
    const primeiro = TIPOS.find(([t]) => m.recursos?.[t]?.status === 'disponivel')?.[0] || 'video';
    let aba = rota.secao && TIPOS.some(([t]) => t === rota.secao) ? rota.secao : primeiro;

    const painel = h('div', { className: 'mt-modulo__painel', role: 'tabpanel', id: `mt-pn-${m.id}` });
    const abas = h('div', { className: 'mt-recursos', role: 'tablist', 'aria-label': `Materiais de ${m.titulo}` },
      TIPOS.map(([t, nome, icone]) => {
        const e = estadoRecurso(m.recursos?.[t]);
        const rec = m.recursos?.[t];
        const pc = t === 'checklist' && rec ? progresso[rec.chave] : null;
        let meta = e.rotulo;
        if (rec && rec.status === 'disponivel') {
          if (t === 'checklist') meta = `${rec.itens} itens${pc != null ? ` · ${pc}% feito` : ''}`;
          if (t === 'manual') meta = `${plural(rec.capitulos, 'capítulo', 'capítulos')} · ${SITUACAO[rec.situacao] || 'Rascunho'}`;
          if (t === 'video') meta = duracao(rec.duracao_s);
          if (rec.revisar) meta += ` · revisar (v${rec.versaoSistema})`;
        }
        return h('button', { type: 'button', role: 'tab', className: 'mt-recurso', id: `mt-tab-${t}`, 'aria-controls': painel.id, data: { tipo: t, estado: e.id },
          on: { click: () => trocar(t), keydown: (ev) => setas(ev, t) } },
          h('span', { className: 'mt-recurso__ic' }, ic(icone)),
          h('span', { className: 'mt-recurso__txt' }, h('span', { className: 'mt-recurso__nome', text: nome }), h('span', { className: 'mt-recurso__meta', text: meta })));
      }));
    function setas(ev, t) {
      const ordem = TIPOS.map(([x]) => x);
      const k = ordem.indexOf(t);
      const alvoTab = { ArrowRight: ordem[(k + 1) % 3], ArrowLeft: ordem[(k + 2) % 3], Home: ordem[0], End: ordem[2] }[ev.key];
      if (!alvoTab) return;
      ev.preventDefault();
      trocar(alvoTab);
      abas.querySelector(`[data-tipo="${alvoTab}"]`).focus();
    }
    let destruir = null;
    let marcador = null;
    function trocar(t) {
      aba = t;
      ultimoModulo = m.id;
      abas.querySelectorAll('[role="tab"]').forEach((b) => { const on = b.dataset.tipo === t; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
      marcador?.mover();
      painel.setAttribute('aria-labelledby', `mt-tab-${t}`);
      if (destruir) { destruir(); destruir = null; }
      const rec = m.recursos?.[t];
      painel.replaceChildren();
      if (t === 'video') destruir = painelVideo(painel, m, rec, relacionados);
      else if (t === 'checklist') destruir = painelChecklist(painel, m, rec);
      else painelManual(painel, m, rec, modulos, ctx);
      if (!reduzido() && painel.animate) painel.animate([{ transform: 'translateY(8px)' }, { transform: 'none' }], { duration: 360, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
    const anterior = modulos[i - 1];
    const proximo = modulos[i + 1];
    const vizinho = (x, rot, dir) => (x ? h('button', { type: 'button', className: `mt-vizinho mt-vizinho--${dir}`, on: { click: () => ir({ area: 'metodologia', modulo: x.id }) } },
      h('span', { className: 'mt-vizinho__rot', text: rot }), h('span', { className: 'mt-vizinho__nome', text: x.titulo })) : h('span'));
    alvo.replaceChildren(h('div', { className: 'mt-pagina mt-modulo', style: { '--c': cor } },
      h('nav', { className: 'mt-volta', 'aria-label': 'Navegação' },
        h('button', { type: 'button', className: 'mt-link', on: { click: () => ir({ area: 'metodologia' }) } }, ic('voltar'), 'Metodologia do Consultor')),
      h('header', { className: 'mt-modulo__cab' },
        h('span', { className: 'mt-modulo__palco', 'aria-hidden': 'true', style: MOV ? { 'view-transition-name': 'mt-palco' } : null }, h('span', { className: 'fi-wrap fi' }, ilustracao(m.id))),
        h('div', { className: 'mt-modulo__txt' },
          titulo1(h('h1', { className: 'mt-modulo__titulo', text: m.titulo, style: MOV ? { 'view-transition-name': 'mt-titulo' } : null }), { atraso: 180 }),
          m.subtitulo ? h('p', { className: 'mt-modulo__lead mov-foco', text: m.subtitulo }) : null,
          m.oculto ? h('span', { className: 'mt-selo mt-selo--oculto' }, ic('oculto'), 'Oculto para os outros perfis') : null)),
      abas, painel,
      h('nav', { className: 'mt-vizinhos', 'aria-label': 'Outros módulos' }, vizinho(anterior, 'Módulo anterior', 'ant'), vizinho(proximo, 'Próximo módulo', 'prox'))));
    trocar(aba);
    if (MOV) { marcador = MOV.indicador(abas, '[aria-selected="true"]', 'mt-recursos__marca'); limpezas.push(marcador.destruir); }
    return () => { if (destruir) destruir(); };
  }

  function painelVideo(painel, m, rec, relacionados) {
    if (rec && rec.status === 'disponivel') {
      const player = criarPlayer(rec);
      painel.append(h('div', { className: 'mt-painel-video' }, player.el, capitulosLista(rec, player)));
      return player.destruir;
    }
    painel.append(h('div', { className: 'mt-producao' },
      h('div', { className: 'mt-producao__txt' },
        h('h2', { text: rec ? 'Vídeo completo em produção' : 'Vídeo indisponível para o seu perfil' }),
        h('p', { text: rec
          ? `O vídeo completo de ${m.titulo} vai mostrar todas as funcionalidades do módulo, as configurações, os fluxos e as principais regras de negócio, numa sequência só. Ele entra aqui assim que for gravado e aprovado.`
          : 'Fale com o administrador se você precisa deste material.' })),
      relacionados.length ? h('div', { className: 'mt-producao__rel' },
        h('h3', { text: 'Enquanto isso, na Biblioteca de Vídeos' }),
        h('ul', null, relacionados.map((v) => h('li', null, h('button', { type: 'button', className: 'mt-rel', on: { click: () => ir({ area: 'videos', modulo: v.id }) } },
          v.poster ? h('img', { src: v.poster, alt: '', loading: 'lazy', width: 160, height: 90 }) : h('span', { className: 'mt-rel__sem' }, ic('video')),
          h('span', null, h('strong', { text: v.titulo }), h('span', { text: duracao(v.duracao_s) }))))))) : null));
    return null;
  }

  /* ---------- checklist embutido (o mesmo HTML gerado dos checklists, com progresso na conta) ---------- */
  function painelChecklist(painel, m, rec) {
    if (!rec || rec.status !== 'disponivel') {
      painel.append(vazio(rec ? `O checklist de implantação de ${m.titulo} está em preparação.` : 'Checklist indisponível para o seu perfil.'));
      return null;
    }
    const frame = h('iframe', { className: 'mt-frame', title: rec.titulo, src: `${rec.url}?embed=1`, scrolling: 'no' });
    const sinc = h('span', { className: 'mt-sinc', role: 'status', 'aria-live': 'polite' });
    const acao = (nome) => () => frame.contentWindow?.postMessage({ ffAcao: nome }, location.origin);
    const menu = menuExportar(acao);
    const seletor = h('input', { type: 'file', accept: '.json,application/json', hidden: true });
    seletor.addEventListener('change', async () => {
      const arq = seletor.files[0];
      seletor.value = '';
      if (!arq) return;
      try { frame.contentWindow?.postMessage({ ffAcao: 'importar', arquivo: JSON.parse(await arq.text()) }, location.origin); } catch { avisar('Não foi possível ler o arquivo. Escolha o .json exportado pelo checklist.'); }
    });
    painel.append(h('div', { className: 'mt-ck' },
      h('div', { className: 'mt-ck__barra' },
        h('div', { className: 'mt-ck__info' }, h('strong', { text: rec.titulo }),
          h('span', { text: `${rec.itens} itens em ${plural(rec.grupos.length, 'bloco', 'blocos')} · gerado do Harness em ${data(rec.atualizadoEm)}` })),
        sinc,
        h('div', { className: 'mt-ck__acoes' }, menu.el,
          h('button', { type: 'button', className: 'mt-botao mt-botao--sec mt-botao--ic', title: 'Importar um checklist preenchido (.json)', 'aria-label': 'Importar um checklist preenchido', on: { click: () => seletor.click() } }, ic('baixar')),
          h('button', { type: 'button', className: 'mt-botao mt-botao--sec mt-botao--ic', title: 'Recomeçar (apaga marcações e anotações)', 'aria-label': 'Recomeçar este checklist', on: { click: acao('recomecar') } }, ic('tentar')),
          h('a', { className: 'mt-botao mt-botao--sec mt-botao--ic', href: rec.url, target: '_blank', rel: 'noopener', title: 'Abrir em nova aba', 'aria-label': 'Abrir o checklist em nova aba' }, ic('externo')),
          seletor)),
      frame));
    const aoMensagem = (e) => {
      if (e.origin !== location.origin || e.source !== frame.contentWindow || !e.data?.ffChecklist) return;
      if (e.data.altura) frame.style.height = `${e.data.altura}px`;
      if (e.data.aviso) avisar(e.data.aviso);
      if (e.data.sinc) { sinc.textContent = e.data.sinc.texto; sinc.dataset.estado = e.data.sinc.estado; }
      if (e.data.baixar?.blob instanceof Blob) window.ffRelatorioProblemas?.baixar(String(e.data.baixar.nome || 'checklist').replace(/[\\/:*?"<>|]+/g, '-').slice(0, 120), e.data.baixar.blob);
      if (e.data.imagem && /^\/api\/checklists-anexos\?id=\d+$/.test(e.data.imagem.src)) ampliar(e.data.imagem.src, e.data.imagem.nome);
    };
    window.addEventListener('message', aoMensagem);
    return () => { window.removeEventListener('message', aoMensagem); menu.destruir(); };
  }

  function menuExportar(acao) {
    const id = `mt-menu-${Math.random().toString(36).slice(2, 8)}`;
    const lista = h('div', { className: 'mt-menu__lista', role: 'menu', id, 'aria-label': 'Exportar' },
      [['problemas', 'alerta', 'Só os problemas', 'Relatório com as imagens, para o desenvolvimento'],
        ['exportar', 'manual', 'Checklist preenchido', 'Arquivo .json com tudo o que você fez, para importar'],
        ['relatorio', 'copiar', 'Copiar relatório', 'Texto em Markdown, sem as imagens']]
        .map(([a, i, t, d]) => h('button', { type: 'button', role: 'menuitem', className: 'mt-menu__item', on: { click: () => { fechar(); acao(a)(); } } }, ic(i), h('span', null, h('strong', { text: t }), h('small', { text: d })))));
    const botao = h('button', { type: 'button', className: 'mt-botao mt-botao--sec', 'aria-haspopup': 'menu', 'aria-expanded': 'false', 'aria-controls': id,
      on: { click: (e) => { e.stopPropagation(); abrir(!el.classList.contains('on')); } } }, ic('baixar'), 'Exportar');
    const el = h('div', { className: 'mt-menu' }, botao, lista);
    function abrir(on) { el.classList.toggle('on', on); botao.setAttribute('aria-expanded', String(on)); if (on) lista.querySelector('button').focus(); }
    function fechar() { abrir(false); }
    const fora = (e) => { if (!el.contains(e.target)) fechar(); };
    const esc = (e) => { if (e.key === 'Escape' && el.classList.contains('on')) { fechar(); botao.focus(); } };
    document.addEventListener('click', fora);
    document.addEventListener('keydown', esc);
    return { el, destruir: () => { document.removeEventListener('click', fora); document.removeEventListener('keydown', esc); } };
  }

  /* ---------- manual (guia visual integral: todos os capítulos + bloco do consultor) ---------- */
  async function painelManual(painel, m, rec, modulos, ctx, opcoes = {}) {
    if (!rec || rec.status !== 'disponivel') {
      painel.append(vazio(rec ? `O manual de apoio de ${m.titulo} está em preparação.` : 'Manual indisponível para o seu perfil.'));
      return;
    }
    const meta = h('div', { className: 'mt-manual__meta' },
      h('span', { className: `mt-chip mt-chip--${rec.situacao}` }, SITUACAO[rec.situacao] || 'Rascunho'),
      rec.versaoSistema ? h('span', { className: 'mt-chip' }, `Sistema v${rec.versaoSistema}`) : null,
      rec.atualizadoEm ? h('span', { className: 'mt-chip' }, `Atualizado em ${data(rec.atualizadoEm)}`) : null,
      rec.revisar ? h('span', { className: 'mt-chip mt-chip--revisar' }, ic('alerta'), 'Feito em versão anterior: revisar') : null,
      h('span', { className: 'mt-manual__acoes' },
        opcoes.naBiblioteca
          ? h('button', { type: 'button', className: 'mt-botao mt-botao--sec', on: { click: () => ir({ area: 'metodologia', modulo: m.id, secao: 'manual' }) } }, ic(m.id), 'Ir ao módulo')
          : h('button', { type: 'button', className: 'mt-botao mt-botao--sec', on: { click: () => ir({ area: 'manuais', modulo: m.id }) } }, ic('manual'), 'Abrir na biblioteca'),
        h('button', { type: 'button', className: 'mt-botao mt-botao--sec', title: 'Imprimir ou salvar em PDF', on: { click: imprimir } }, ic('baixar'), 'PDF')));
    const corpo = h('div', { className: 'mt-manual__corpo' });
    painel.append(h('article', { className: 'mt-manual', 'aria-label': rec.titulo }, meta, corpo));
    carregando(corpo, 'Carregando o manual…');
    const guia = await P.carregarGuia(m.id);
    if (!corpo.isConnected) return;
    if (!guia) { corpo.replaceChildren(vazio('Não foi possível abrir este manual agora. Tente de novo em instantes.')); return; }
    corpo.replaceChildren(UI.renderGuiaVisual(guia, guia.capitulos || [], { jornada: 'consultor', modulo: m, modulos }));
    if (opcoes.foco) requestAnimationFrame(() => focarTexto(corpo, opcoes.foco));
  }

  function imprimir() {
    document.body.classList.add('mt-imprimindo');
    const fim = () => { document.body.classList.remove('mt-imprimindo'); removeEventListener('afterprint', fim); };
    addEventListener('afterprint', fim);
    print();
  }

  function focarTexto(raiz, texto) {
    const n = semAcento(texto);
    const el = [...raiz.querySelectorAll('h2, h3, h4, dt, summary, strong, .pl-passo-guia__titulo')].find((x) => semAcento(x.textContent).includes(n));
    if (!el) return;
    const bloco = el.closest('.pl-passo-guia, .pl-conceito, details, section, li') || el;
    if (bloco.tagName === 'DETAILS') bloco.open = true;
    bloco.scrollIntoView({ block: 'center', behavior: reduzido() ? 'auto' : 'smooth' });
    bloco.classList.add('mt-achado');
    setTimeout(() => bloco.classList.remove('mt-achado'), 2600);
  }

  /* ============================================================
     3. Manuais de Apoio — biblioteca e leitor
     ============================================================ */
  async function manuais(alvo, rota, ctx) {
    carregando(alvo, 'Carregando os manuais…');
    const r = await ctx.resumo();
    if (!ctx.valida()) return;
    if (!r || r.erro) { falha(alvo, r, () => manuais(alvo, rota, ctx)); return; }
    const modulos = r.modulos || [];
    if (rota.modulo) {
      const m = modulos.find((x) => x.id === rota.modulo);
      if (!m) { falha(alvo, { status: 404, mensagem: 'Este manual não existe ou não está liberado para o seu perfil.' }); return; }
      const painel = h('div');
      alvo.replaceChildren(h('div', { className: 'mt-pagina mt-leitor', style: { '--c': corValida(m.cor) } },
        h('nav', { className: 'mt-volta', 'aria-label': 'Navegação' },
          h('button', { type: 'button', className: 'mt-link', on: { click: () => ir({ area: 'manuais' }) } }, ic('voltar'), 'Manuais de Apoio')),
        h('header', { className: 'mt-leitor__cab' },
          h('span', { className: 'mt-leitor__ic', 'aria-hidden': 'true' }, h('span', { className: 'fi-wrap fi' }, ilustracao(m.id))),
          h('div', null, titulo1(h('h1', { text: m.recursos?.manual?.titulo || `${m.titulo} — manual de apoio` })),
            m.recursos?.manual?.resumo ? h('p', { className: 'mt-cab__lead', text: m.recursos.manual.resumo }) : null)),
        painel));
      await painelManual(painel, m, m.recursos?.manual, modulos, ctx, { naBiblioteca: true, foco: window.__mtFoco });
      window.__mtFoco = null;
      return;
    }
    let termo = '';
    let filtro = 'todos';
    const corpo = h('div', { className: 'mt-tabela-wrap' });
    const disponiveis = modulos.filter((m) => m.recursos?.manual);
    function desenhar() {
      const lista = disponiveis.filter((m) => {
        const rec = m.recursos.manual;
        if (termo && !semAcento(`${m.titulo} ${rec.titulo} ${rec.resumo || ''}`).includes(termo)) return false;
        if (filtro === 'disponiveis') return rec.status === 'disponivel';
        if (filtro === 'preparacao') return rec.status !== 'disponivel';
        if (filtro === 'revisar') return Boolean(rec.revisar);
        return true;
      });
      if (!lista.length) { corpo.replaceChildren(vazio('Nenhum manual com esse filtro.')); return; }
      corpo.replaceChildren(h('ul', { className: 'mt-docs', 'data-revela-lista': '' }, lista.map((m) => {
        const rec = m.recursos.manual;
        const ok = rec.status === 'disponivel';
        return h('li', { className: 'mt-doc', data: { flip: m.id, estado: estadoRecurso(rec).id }, style: { '--c': corValida(m.cor) } },
          h('span', { className: 'mt-doc__ic', 'aria-hidden': 'true' }, ic(m.id)),
          h('div', { className: 'mt-doc__txt' },
            h('h2', { className: 'mt-doc__titulo' }, ok
              ? h('button', { type: 'button', className: 'mt-doc__abrir', on: { click: () => ir({ area: 'manuais', modulo: m.id }) } }, rec.titulo)
              : h('span', { text: `${m.titulo} — manual de apoio` })),
            h('p', { className: 'mt-doc__mod', text: m.titulo }),
            ok && rec.resumo ? h('p', { className: 'mt-doc__resumo', text: rec.resumo }) : null),
          h('dl', { className: 'mt-doc__fatos' },
            ok ? [h('div', null, h('dt', { text: 'Conteúdo' }), h('dd', { text: `${plural(rec.capitulos, 'capítulo', 'capítulos')} · ${plural(rec.telas, 'tela', 'telas')}` })),
              h('div', null, h('dt', { text: 'Versão' }), h('dd', { text: rec.versaoSistema ? `v${rec.versaoSistema}` : '—' })),
              h('div', null, h('dt', { text: 'Atualizado' }), h('dd', { text: data(rec.atualizadoEm) || '—' })),
              h('div', null, h('dt', { text: 'Situação' }), h('dd', { text: rec.revisar ? 'Revisar' : (SITUACAO[rec.situacao] || 'Rascunho') }))]
              : h('div', null, h('dt', { text: 'Situação' }), h('dd', { text: 'Em preparação' }))),
          h('div', { className: 'mt-doc__acoes' },
            h('button', { type: 'button', className: 'mt-link', on: { click: () => ir({ area: 'metodologia', modulo: m.id, secao: 'manual' }) } }, 'Ir ao módulo', ic('seta'))));
      })));
      entrar(corpo);
    }
    let primeira = true;
    const redesenharDocs = () => { if (primeira || !MOV) { desenhar(); primeira = false; return; } MOV.layout(corpo, desenhar); };
    const FILTROS = [['todos', 'Todos'], ['disponiveis', 'Disponíveis'], ['revisar', 'Para revisar'], ['preparacao', 'Em preparação']];
    const filtros = h('div', { className: 'mt-segmento', role: 'group', 'aria-label': 'Filtrar manuais' },
      FILTROS.map(([id, rot]) => h('button', { type: 'button', className: 'mt-segmento__op', 'aria-pressed': String(id === filtro), data: { filtro: id },
        on: { click: () => { filtro = id; filtros.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === id))); trilhoDocs?.mover(); redesenharDocs(); } } }, rot)));
    let trilhoDocs = null;
    const n = disponiveis.filter((m) => m.recursos.manual.status === 'disponivel').length;
    alvo.replaceChildren(h('div', { className: 'mt-pagina' },
      cabecalho('Manuais de Apoio', `Os manuais dos módulos, os mesmos da Metodologia do Consultor. ${n} de ${disponiveis.length} publicados. Leia aqui, imprima ou salve em PDF.`),
      h('div', { className: 'mt-barra' },
        h('label', { className: 'mt-busca-local' }, ic('busca'), h('span', { className: 'mt-sr', text: 'Buscar manual por nome ou módulo' }),
          h('input', { type: 'search', placeholder: 'Buscar manual ou módulo…', autocomplete: 'off', on: { input: (e) => { termo = semAcento(e.target.value.trim()); redesenharDocs(); } } })),
        filtros),
      corpo));
    redesenharDocs();
    if (MOV) { trilhoDocs = MOV.indicador(filtros, '[aria-pressed="true"]', 'mt-segmento__trilho'); limpezas.push(trilhoDocs.destruir); }
  }

  /* ============================================================
     4. Biblioteca de Vídeos e player
     ============================================================ */
  async function videos(alvo, rota, ctx) {
    carregando(alvo, 'Carregando os vídeos…');
    const r = await ctx.resumo();
    if (!ctx.valida()) return null;
    if (!r || r.erro) { falha(alvo, r, () => videos(alvo, rota, ctx)); return null; }
    const lista = r.videos || [];
    const modulos = r.modulos || [];
    const nomeMod = (id) => modulos.find((m) => m.id === id)?.titulo || id;
    if (rota.modulo) {
      const v = lista.find((x) => x.id === rota.modulo);
      if (!v) { falha(alvo, { status: 404, mensagem: 'Este vídeo não existe ou não está liberado para o seu perfil.' }); return null; }
      const player = criarPlayer(v, { inicio: window.__mtTempo });
      window.__mtTempo = null;
      const outros = lista.filter((x) => x.id !== v.id).slice(0, 6);
      alvo.replaceChildren(h('div', { className: 'mt-pagina mt-assistir' },
        h('nav', { className: 'mt-volta', 'aria-label': 'Navegação' },
          h('button', { type: 'button', className: 'mt-link', on: { click: () => ir({ area: 'videos' }) } }, ic('voltar'), 'Biblioteca de Vídeos')),
        h('div', { className: 'mt-assistir__grade' },
          h('div', { className: 'mt-assistir__principal' }, player.el,
            h('div', { className: 'mt-assistir__info' },
              titulo1(h('h1', { text: v.titulo }), { atraso: 120 }),
              h('p', { className: 'mt-assistir__meta' }, [duracao(v.duracao_s), v.modulos.length ? v.modulos.map(nomeMod).join(' · ') : null, v.revisar ? `gravado na v${v.versaoSistema}` : null].filter(Boolean).join('  ·  ')),
              v.resumo ? h('p', { className: 'mt-assistir__resumo', text: v.resumo }) : null,
              v.modulos.length ? h('div', { className: 'mt-assistir__mods' }, v.modulos.map((id) => h('button', { type: 'button', className: 'mt-chip mt-chip--link', on: { click: () => ir({ area: 'metodologia', modulo: id }) } }, ic(id), nomeMod(id)))) : null)),
          h('aside', { className: 'mt-assistir__lado', 'aria-label': 'Capítulos e outros vídeos' },
            capitulosLista(v, player),
            outros.length ? h('section', { className: 'mt-outros' }, h('h2', { text: 'Outros vídeos' }),
              h('ul', null, outros.map((x) => h('li', null, h('button', { type: 'button', className: 'mt-rel', on: { click: () => ir({ area: 'videos', modulo: x.id }) } },
                x.poster ? h('img', { src: x.poster, alt: '', loading: 'lazy', width: 160, height: 90 }) : h('span', { className: 'mt-rel__sem' }, ic('video')),
                h('span', null, h('strong', { text: x.titulo }), h('span', { text: duracao(x.duracao_s) }))))))) : null))));
      return player.destruir;
    }
    let termo = '';
    const grade = h('ul', { className: 'mt-videos', 'data-revela-lista': '' });
    function desenhar() {
      const vis = lista.filter((v) => !termo || semAcento(`${v.titulo} ${v.resumo || ''} ${v.modulos.map(nomeMod).join(' ')}`).includes(termo));
      if (!vis.length) { grade.replaceChildren(h('li', null, vazio(lista.length ? 'Nenhum vídeo com essa busca.' : 'Nenhum vídeo publicado para o seu perfil.'))); return; }
      grade.replaceChildren(...vis.map((v) => h('li', { data: { flip: v.id } },
        h('button', { type: 'button', className: 'mt-video', on: { click: () => ir({ area: 'videos', modulo: v.id }) } },
          h('span', { className: 'mt-video__capa' },
            v.poster ? h('img', { src: v.poster, alt: '', loading: 'lazy', width: 640, height: 360 }) : h('span', { className: 'mt-rel__sem' }, ic('video')),
            h('span', { className: 'mt-video__play', 'aria-hidden': 'true' }, ic('video')),
            v.duracao_s ? h('span', { className: 'mt-video__dur', text: tempo(v.duracao_s) }) : null),
          h('span', { className: 'mt-video__txt' },
            h('strong', { className: 'mt-video__titulo', text: v.titulo }),
            v.resumo ? h('span', { className: 'mt-video__resumo', text: v.resumo }) : null,
            h('span', { className: 'mt-video__mods', text: [v.modulos.map(nomeMod).join(' · '), plural(v.capitulos.length, 'capítulo', 'capítulos')].filter(Boolean).join('  ·  ') }))))));
      entrar(grade);
    }
    alvo.replaceChildren(h('div', { className: 'mt-pagina' },
      cabecalho('Biblioteca de Vídeos', `Os vídeos de fluxo já publicados, com narração, legenda e capítulos. Os vídeos completos de cada módulo entram aqui e na Metodologia do Consultor conforme forem gravados.`),
      h('div', { className: 'mt-barra' },
        h('label', { className: 'mt-busca-local' }, ic('busca'), h('span', { className: 'mt-sr', text: 'Buscar vídeo' }),
          h('input', { type: 'search', placeholder: 'Buscar por assunto ou módulo…', autocomplete: 'off', on: { input: (e) => { termo = semAcento(e.target.value.trim()); if (MOV) MOV.layout(grade, desenhar); else desenhar(); } } }))),
      grade));
    desenhar();
    return null;
  }

  function capitulosLista(v, player) {
    if (!v.capitulos || !v.capitulos.length) return null;
    const itens = v.capitulos.map((c, i) => {
      const novoGrupo = !i || v.capitulos[i - 1].grupo !== c.grupo;
      return h('li', { className: `mt-cap${novoGrupo && c.grupo !== c.titulo ? ' mt-cap--grupo' : ''}`, data: novoGrupo && c.grupo !== c.titulo ? { grupo: c.grupo } : null },
        h('button', { type: 'button', className: 'mt-cap__btn', on: { click: () => player.irPara(c.t, true) } },
          h('span', { className: 'mt-cap__t', text: tempo(c.t) }), h('span', { className: 'mt-cap__titulo', text: c.titulo })));
    });
    const lista = h('ol', { className: 'mt-caps__lista' }, itens);
    player.aoTempo((t) => {
      let k = -1;
      v.capitulos.forEach((c, i) => { if (t + 0.25 >= c.t) k = i; });
      itens.forEach((li, i) => { if (i === k) li.setAttribute('aria-current', 'true'); else li.removeAttribute('aria-current'); });
    });
    return h('section', { className: 'mt-caps', 'aria-label': 'Capítulos do vídeo' }, h('h2', { text: 'Capítulos' }), lista);
  }

  /** Player próprio: play, tempo, barra com marcas dos capítulos, velocidade, legenda, volume, tela cheia e teclado. */
  function criarPlayer(v, opcoes = {}) {
    const video = h('video', { className: 'mt-player__video', preload: 'metadata', playsinline: true, poster: v.poster || null, src: v.url });
    if (v.legendas) video.append(h('track', { kind: 'captions', srclang: 'pt-BR', label: 'Português', src: v.legendas }));
    const ouvintes = [];
    const btn = (rotulo, icone, fn, extra = {}) => h('button', { type: 'button', className: 'mt-player__btn', 'aria-label': rotulo, title: rotulo, on: { click: fn }, ...extra }, icone);
    const svgPlay = () => svg('<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>');
    const svgPausa = () => svg('<rect x="6.5" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/>');
    const svgSom = () => svg('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/>');
    const svgMudo = () => svg('<path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 4 6M21 9l-4 6"/>');
    const svgCheia = () => svg('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>');
    const svgCc = () => svg('<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M10.5 10.2a2.2 2.2 0 1 0 0 3.6M17 10.2a2.2 2.2 0 1 0 0 3.6"/>');
    const bPlay = btn('Reproduzir', svgPlay(), () => alternar());
    const tAtual = h('span', { className: 'mt-player__tempo', text: '0:00' });
    const tTotal = h('span', { className: 'mt-player__tempo mt-player__tempo--total', text: v.duracao_s ? tempo(v.duracao_s) : '0:00' });
    const barra = h('input', { type: 'range', className: 'mt-player__barra', min: 0, max: Math.round((v.duracao_s || 1) * 10), step: 1, value: 0, 'aria-label': 'Posição no vídeo' });
    const marcas = h('span', { className: 'mt-player__marcas', 'aria-hidden': 'true' });
    const capAtual = h('span', { className: 'mt-player__cap', 'aria-live': 'off' });
    const VELOCIDADES = [0.75, 1, 1.25, 1.5, 2];
    const bVel = h('button', { type: 'button', className: 'mt-player__btn mt-player__vel', 'aria-label': 'Velocidade: 1x', title: 'Velocidade', on: { click: () => {
      const i = VELOCIDADES.indexOf(video.playbackRate);
      video.playbackRate = VELOCIDADES[(i + 1) % VELOCIDADES.length];
    } } }, '1x');
    const bCc = v.legendas ? btn('Ativar legenda em texto', svgCc(), () => legenda(), { 'aria-pressed': 'false' }) : null;
    const bSom = btn('Silenciar', svgSom(), () => { video.muted = !video.muted; });
    const bCheia = btn('Tela cheia', svgCheia(), () => telaCheia());
    const grande = h('button', { type: 'button', className: 'mt-player__grande', 'aria-label': 'Reproduzir o vídeo', on: { click: () => alternar() } }, svgPlay());
    const el = h('div', { className: 'mt-player', tabindex: 0, 'aria-label': `Player: ${v.titulo}. Espaço reproduz ou pausa, setas avançam e voltam 5 segundos, F tela cheia.`, data: { estado: 'parado' } },
      video, grande,
      h('div', { className: 'mt-player__controles' },
        h('div', { className: 'mt-player__linha' }, marcas, barra),
        h('div', { className: 'mt-player__fila' }, bPlay, h('span', { className: 'mt-player__tempos' }, tAtual, ' / ', tTotal), capAtual,
          h('span', { className: 'mt-player__espaco' }), bVel, bCc, bSom, bCheia)));
    function svg(d) { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', '2'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round'); s.setAttribute('aria-hidden', 'true'); s.innerHTML = d; return s; }
    function alternar() { if (video.paused) video.play().catch(() => {}); else video.pause(); }
    function irPara(t, tocar) { video.currentTime = Math.max(0, t); if (tocar && video.paused) video.play().catch(() => {}); el.focus({ preventScroll: true }); }
    function legenda() {
      const tr = video.textTracks && video.textTracks[0];
      if (!tr) return;
      const on = tr.mode !== 'showing';
      tr.mode = on ? 'showing' : 'hidden';
      bCc.setAttribute('aria-pressed', String(on));
      bCc.setAttribute('aria-label', on ? 'Desativar legenda em texto' : 'Ativar legenda em texto');
    }
    function telaCheia() {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else (el.requestFullscreen ? el.requestFullscreen() : video.webkitEnterFullscreen?.());
    }
    function marcarCapitulos(total) {
      marcas.replaceChildren(...(v.capitulos || []).filter((c) => c.t > 0.5).map((c) => h('i', { style: { left: `${(c.t / total) * 100}%` } })));
    }
    video.addEventListener('loadedmetadata', () => {
      const total = video.duration || v.duracao_s || 1;
      barra.max = Math.round(total * 10);
      tTotal.textContent = tempo(total);
      marcarCapitulos(total);
      if (video.textTracks && video.textTracks[0]) video.textTracks[0].mode = 'hidden'; // a legenda já vem queimada no vídeo
      if (opcoes.inicio) video.currentTime = opcoes.inicio;
    });
    marcarCapitulos(v.duracao_s || 1);
    let arrastando = false;
    barra.addEventListener('input', () => { arrastando = true; tAtual.textContent = tempo(barra.value / 10); pintar(barra.value / barra.max); });
    barra.addEventListener('change', () => { arrastando = false; video.currentTime = barra.value / 10; });
    const pintar = (p) => el.style.setProperty('--prog', String(p));
    video.addEventListener('timeupdate', () => {
      const t = video.currentTime;
      if (!arrastando) { barra.value = Math.round(t * 10); tAtual.textContent = tempo(t); pintar(t / (video.duration || v.duracao_s || 1)); }
      const c = [...(v.capitulos || [])].reverse().find((x) => t + 0.25 >= x.t);
      capAtual.textContent = c ? c.titulo : '';
      ouvintes.forEach((fn) => fn(t));
    });
    const estado = () => {
      el.dataset.estado = video.paused ? (video.currentTime > 0 ? 'pausado' : 'parado') : 'tocando';
      bPlay.replaceChildren(video.paused ? svgPlay() : svgPausa());
      bPlay.setAttribute('aria-label', video.paused ? 'Reproduzir' : 'Pausar');
      bPlay.title = bPlay.getAttribute('aria-label');
    };
    video.addEventListener('play', estado);
    video.addEventListener('pause', estado);
    video.addEventListener('ended', estado);
    video.addEventListener('click', alternar);
    video.addEventListener('ratechange', () => { bVel.textContent = `${video.playbackRate}x`.replace('.', ','); bVel.setAttribute('aria-label', `Velocidade: ${bVel.textContent}`); });
    video.addEventListener('volumechange', () => { bSom.replaceChildren(video.muted ? svgMudo() : svgSom()); bSom.setAttribute('aria-label', video.muted ? 'Ativar o som' : 'Silenciar'); });
    video.addEventListener('error', () => { el.dataset.estado = 'erro'; grande.replaceChildren(ic('alerta')); grande.setAttribute('aria-label', 'Não foi possível carregar o vídeo'); });
    el.addEventListener('keydown', (e) => {
      if (e.target !== el && e.target !== video) return;
      const k = e.key.toLowerCase();
      if (k === ' ' || k === 'k') { e.preventDefault(); alternar(); }
      else if (k === 'arrowright') { e.preventDefault(); video.currentTime += 5; }
      else if (k === 'arrowleft') { e.preventDefault(); video.currentTime -= 5; }
      else if (k === 'f') { e.preventDefault(); telaCheia(); }
      else if (k === 'm') { e.preventDefault(); video.muted = !video.muted; }
      else if (k === 'c' && bCc) { e.preventDefault(); legenda(); }
    });
    return { el, irPara, aoTempo: (fn) => ouvintes.push(fn), destruir: () => { video.pause(); video.removeAttribute('src'); video.load(); } };
  }

  /* ============================================================
     5. Metodologia Faktory Flow — manual institucional
     ============================================================ */
  let manualFF = null;
  async function carregarManualFF() {
    if (manualFF) return manualFF;
    try {
      const r = await fetch('/metodologia/manual-faktory-flow.json', { credentials: 'same-origin', cache: 'no-cache' });
      if (r.status === 401 && window.ffIrParaLogin) { window.ffIrParaLogin(); return null; }
      if (!r.ok) return { erro: { status: r.status, mensagem: r.status === 404 ? 'A Metodologia Faktory Flow não está liberada para o seu perfil.' : `Não foi possível carregar (erro ${r.status}).` } };
      const j = await r.json();
      if (!j || !Array.isArray(j.frentes)) return { erro: { status: 500, mensagem: 'O manual veio num formato inesperado.' } };
      manualFF = j;
      return j;
    } catch { return { erro: { status: 0, mensagem: 'Sem conexão com o servidor. Tente de novo.' } }; }
  }

  /** Texto com `Menu > Tela` em crase vira destaque de tela (sem HTML). */
  function textoRico(t) {
    const partes = String(t || '').split(/(`[^`]+`)/g).filter(Boolean);
    return partes.map((p) => (p.startsWith('`') && p.endsWith('`') ? h('span', { className: 'ff-tela', text: p.slice(1, -1) }) : p));
  }

  function bloco(b) {
    switch (b.tipo) {
      case 'paragrafo': return h('p', { className: 'ff-p' }, textoRico(b.texto));
      case 'lista': return h('ul', { className: 'ff-lista' }, (b.itens || []).map((i) => h('li', null, textoRico(i))));
      case 'passos': return h('ol', { className: 'ff-passos' }, (b.itens || []).map((i) => h('li', null,
        h('strong', { className: 'ff-passos__t' }, textoRico(i.titulo)), i.texto ? h('p', null, textoRico(i.texto)) : null)));
      case 'tabela': return h('div', { className: 'ff-tabela', role: 'region', 'aria-label': (b.colunas || []).join(', '), tabindex: 0 },
        h('table', null,
          h('thead', null, h('tr', null, (b.colunas || []).map((c) => h('th', { scope: 'col' }, textoRico(c))))),
          h('tbody', null, (b.linhas || []).map((l) => h('tr', null, l.map((c, k) => (k === 0 ? h('th', { scope: 'row' }, textoRico(c)) : h('td', null, textoRico(c)))))))));
      case 'aviso': return h('aside', { className: `ff-aviso ff-aviso--${b.nivel === 'atencao' ? 'atencao' : 'info'}`, role: 'note' },
        ic(b.nivel === 'atencao' ? 'alerta' : 'manual'), h('p', null, textoRico(b.texto)));
      case 'citacao': return h('figure', { className: 'ff-citacao' }, h('blockquote', null, h('p', null, textoRico(b.texto))), b.autor ? h('figcaption', { text: b.autor }) : null);
      default: return b.texto ? h('p', { className: 'ff-p' }, textoRico(b.texto)) : null;
    }
  }

  /* Pedido do responsável (13/11/2026): por enquanto a área fica vazia, só com "Em desenvolvimento".
     O manual escrito continua em /metodologia/manual-faktory-flow.json; para publicar de novo, troque para false. */
  const FF_EM_DESENVOLVIMENTO = true;

  function ffEmDesenvolvimento(alvo) {
    alvo.replaceChildren(h('div', { className: 'ff' },
      h('header', { className: 'ff-abertura ff-abertura--vazia' },
        h('div', { className: 'ff-abertura__luz', 'aria-hidden': 'true' }),
        h('p', { className: 'ff-abertura__marca' }, h('span', { className: 'ff-ponto', 'aria-hidden': 'true' }), 'Manual principal da implantação'),
        h('h1', { className: 'ff-abertura__titulo' },
          h('span', { className: 'ff-linha' }, h('span', { text: 'Metodologia' })),
          h('span', { className: 'ff-linha ff-linha--lima' }, h('span', { text: 'Faktory Flow' }))),
        h('p', { className: 'ff-dev', role: 'status' }, h('span', { className: 'ff-dev__ponto', 'aria-hidden': 'true' }), 'Em desenvolvimento'))));
    return null;
  }

  async function metodologiaFF(alvo, rota, ctx) {
    if (FF_EM_DESENVOLVIMENTO) return ffEmDesenvolvimento(alvo);
    alvo.replaceChildren(h('div', { className: 'ff' }, h('div', { className: 'mt-carregando mt-carregando--escuro', role: 'status' }, h('span', { className: 'mt-carregando__barra', 'aria-hidden': 'true' }), 'Carregando a Metodologia Faktory Flow…')));
    const man = await carregarManualFF();
    if (!ctx.valida()) return null;
    if (!man || man.erro) { const box = h('div', { className: 'mt-pagina' }); alvo.replaceChildren(box); falha(box, man, () => { manualFF = null; metodologiaFF(alvo, rota, ctx); }); return null; }
    const secoes = man.frentes.flatMap((f) => f.secoes.map((s) => ({ ...s, frente: f })));
    const idSec = (s) => `ff-${s.id}`;
    const indice = h('nav', { className: 'ff-indice', 'aria-label': 'Neste manual' },
      man.frentes.map((f) => h('div', { className: 'ff-indice__frente' },
        h('p', { className: 'ff-indice__frente-titulo', text: f.titulo }),
        h('ol', null, f.secoes.map((s) => h('li', null, h('a', { href: `#${idSec(s)}`, data: { sec: s.id }, on: { click: (e) => { e.preventDefault(); rolar(s.id); } } }, s.titulo)))))));
    function rolar(id) {
      const el = document.getElementById(`ff-${id}`);
      if (el) { el.scrollIntoView({ behavior: reduzido() ? 'auto' : 'smooth', block: 'start' }); el.focus({ preventScroll: true }); }
    }
    const conteudo = man.frentes.map((f, fi) => h('section', { className: 'ff-frente', 'aria-labelledby': `ff-f-${f.id}` },
      h('header', { className: 'ff-frente__cab', 'data-revela': '' },
        h('span', { className: 'ff-frente__n', 'aria-hidden': 'true', text: fi + 1 }),
        h('div', null, titulo1(h('h2', { id: `ff-f-${f.id}`, className: 'ff-frente__titulo mov-palavras--revela', text: f.titulo })), f.resumo ? h('p', { text: f.resumo }) : null)),
      f.secoes.map((s) => h('section', { className: 'ff-secao', id: idSec(s), tabindex: -1, 'aria-labelledby': `${idSec(s)}-t`, 'data-revela-lista': '', data: { status: s.status } },
        h('h3', { className: 'ff-secao__titulo', id: `${idSec(s)}-t`, text: s.titulo }),
        s.resumo ? h('p', { className: 'ff-secao__resumo', text: s.resumo }) : null,
        s.status !== 'disponivel' ? h('p', { className: 'ff-aviso ff-aviso--info' }, ic('relogio'), h('span', { text: 'Seção em preparação: a base de conhecimento ainda não cobre este tema.' })) : null,
        (s.blocos || []).map(bloco),
        (s.fontes || []).length ? h('details', { className: 'ff-fontes' }, h('summary', { text: plural(s.fontes.length, 'fonte na base do Harness', 'fontes na base do Harness') }),
          h('ul', null, s.fontes.map((x) => h('li', null, h('code', { text: x }))))) : null))));
    const glossario = (man.glossario || []).length ? h('section', { className: 'ff-glossario', 'aria-labelledby': 'ff-glossario-t' },
      h('h2', { id: 'ff-glossario-t', className: 'ff-frente__titulo', text: 'Glossário da implantação' }),
      h('dl', { 'data-revela-lista': '' }, man.glossario.map((g) => h('div', null, h('dt', { text: g.termo }), h('dd', { text: g.definicao }))))) : null;
    const disponiveis = secoes.filter((s) => s.status === 'disponivel').length;
    const progresso = h('div', { className: 'ff-progresso', 'aria-hidden': 'true' }, h('i'));
    alvo.replaceChildren(h('div', { className: 'ff' }, progresso,
      h('header', { className: 'ff-abertura' },
        h('div', { className: 'ff-abertura__luz', 'aria-hidden': 'true' }),
        h('p', { className: 'ff-abertura__marca' }, h('span', { className: 'ff-ponto', 'aria-hidden': 'true' }), 'Manual principal da implantação'),
        // título em duas linhas que sobem por máscara (o momento autoral da área)
        h('h1', { className: 'ff-abertura__titulo' },
          h('span', { className: 'ff-linha' }, h('span', { text: 'Metodologia' })),
          h('span', { className: 'ff-linha ff-linha--lima' }, h('span', { text: 'Faktory Flow' }))),
        man.resumo ? h('p', { className: 'ff-abertura__lead', text: man.resumo }) : null,
        h('dl', { className: 'ff-abertura__fatos' },
          h('div', null, h('dt', { text: 'Frentes' }), h('dd', { text: man.frentes.map((f) => f.titulo).join(' e ') })),
          h('div', null, h('dt', { text: 'Seções' }), h('dd', { text: `${disponiveis} de ${secoes.length} publicadas` })),
          h('div', null, h('dt', { text: 'Versão' }), h('dd', { text: `${man.versao || '1.0'} · ${data(man.atualizadoEm)}${man.status === 'rascunho' ? ' · rascunho em validação' : ''}` }))),
        h('div', { className: 'ff-abertura__acoes' },
          man.frentes.map((f) => h('button', { type: 'button', className: 'ff-botao', on: { click: () => rolar(f.secoes[0]?.id) } }, f.titulo, ic('seta'))),
          h('button', { type: 'button', className: 'ff-botao ff-botao--sec', on: { click: imprimir } }, ic('baixar'), 'Salvar em PDF'))),
      h('div', { className: 'ff-corpo' }, indice, h('div', { className: 'ff-texto' }, conteudo, glossario))));
    // índice acompanha a leitura
    const links = [...indice.querySelectorAll('a')];
    let obs = null;
    if ('IntersectionObserver' in window) {
      obs = new IntersectionObserver((ents) => ents.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace(/^ff-/, '');
        links.forEach((a) => (a.dataset.sec === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      }), { rootMargin: '-20% 0px -70% 0px' });
      alvo.querySelectorAll('.ff-secao').forEach((s) => obs.observe(s));
    }
    if (rota.secao) requestAnimationFrame(() => rolar(rota.secao));
    if (window.__mtFoco) { const f = window.__mtFoco; window.__mtFoco = null; requestAnimationFrame(() => focarTexto(alvo, f)); }
    // Leitura guiada pela rolagem: a linha de lima mostra quanto do manual já passou; a luz do topo anda mais devagar
    // que o texto (parallax discreto, só enquanto a abertura está na tela). rAF + passivo; sai na troca de tela.
    const corpo = alvo.querySelector('.ff-corpo');
    const luz = alvo.querySelector('.ff-abertura__luz');
    const abertura = alvo.querySelector('.ff-abertura');
    let pedido = 0;
    const aoRolar = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(() => {
        pedido = 0;
        const r = corpo.getBoundingClientRect();
        const total = Math.max(1, r.height - innerHeight * 0.6);
        const p = Math.min(1, Math.max(0, -r.top / total));
        progresso.style.setProperty('--p', p.toFixed(4));
        progresso.classList.toggle('on', r.top < innerHeight * 0.4);
        if (luz && !(MOV && MOV.reduzido())) {
          const a = abertura.getBoundingClientRect();
          if (a.bottom > 0) luz.style.transform = `translate3d(0, ${(-a.top * 0.35).toFixed(1)}px, 0)`;
        }
      });
    };
    addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
    return () => { if (obs) obs.disconnect(); removeEventListener('scroll', aoRolar); cancelAnimationFrame(pedido); };
  }

  /* ============================================================
     Relatório de problemas de todos os checklists (mesmo formato do checklist)
     ============================================================ */
  async function relatorioGeral(botao, modulos) {
    const R = window.ffRelatorioProblemas;
    if (!R || botao.disabled) return;
    botao.disabled = true;
    avisar('Juntando os problemas dos seus checklists…');
    try {
      const r = await fetch('/api/checklists-progresso?problemas=1', { credentials: 'same-origin', cache: 'no-store' });
      if (r.status === 401) throw new Error('Entre no Guia para gerar o relatório.');
      if (!r.ok) throw new Error('Não foi possível ler os seus checklists. Tente de novo.');
      const recs = modulos.filter((m) => m.recursos?.checklist?.status === 'disponivel').map((m) => ({ m, rec: m.recursos.checklist }));
      const lista = (await r.json()).itens.filter((p) => recs.some((x) => x.rec.chave === p.chave));
      if (!lista.length) { avisar('Nenhum problema registrado nos checklists dos módulos'); return; }
      const checklists = [];
      for (const p of lista) {
        const { m, rec } = recs.find((x) => x.rec.chave === p.chave);
        const html = await fetch(rec.url, { credentials: 'same-origin' }).then((x) => (x.ok ? x.text() : ''));
        const estrutura = R.etapasDo(new DOMParser().parseFromString(html, 'text/html'));
        const porEtapa = {};
        for (const a of p.anexos) (porEtapa[a.item] ||= []).push(a);
        const problemas = await R.problemasDe(estrutura, p.dados, porEtapa, (a) => `/api/checklists-anexos?id=${encodeURIComponent(a.id)}`);
        checklists.push({ titulo: rec.titulo, area: m.titulo, validador: p.dados?.validador, atualizadoEm: p.atualizadoEm, feitos: Object.keys(p.dados?.marcados || {}).length, total: estrutura.ordem.length || rec.itens, problemas });
        avisar(`Juntando os problemas… ${checklists.length} de ${lista.length}`);
      }
      const total = checklists.reduce((s, c) => s + c.problemas.length, 0);
      R.baixar(`problemas-checklists-${R.hoje()}.html`, new Blob([R.montarHtml({ geradoEm: Date.now(), autor: checklists.find((c) => c.validador)?.validador, checklists })], { type: 'text/html;charset=utf-8' }));
      avisar(`${plural(total, 'problema exportado', 'problemas exportados')} de ${plural(checklists.length, 'checklist', 'checklists')}`);
    } catch (e) {
      avisar(e.message || 'Não foi possível montar o relatório.');
    } finally {
      botao.disabled = false;
    }
  }

  /* ---------- aviso e ampliar imagem ---------- */
  let avisoEl = null;
  let tAviso = null;
  function avisar(msg) {
    if (!avisoEl) { avisoEl = h('div', { className: 'mt-aviso', role: 'status', 'aria-live': 'polite' }); document.body.append(avisoEl); }
    avisoEl.textContent = msg;
    avisoEl.classList.add('on');
    clearTimeout(tAviso);
    tAviso = setTimeout(() => avisoEl.classList.remove('on'), 2800);
  }
  let dlg = null;
  function ampliar(src, nome) {
    if (!dlg) {
      dlg = h('dialog', { className: 'mt-imagem', 'aria-label': 'Imagem anexada' }, h('img', { alt: '' }),
        h('form', { method: 'dialog' }, h('button', { className: 'mt-botao', text: 'Fechar' })));
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
      document.body.append(dlg);
    }
    const img = dlg.querySelector('img');
    img.src = src;
    img.alt = nome || 'Imagem anexada';
    dlg.showModal?.();
  }

  /* ============================================================
     Busca global da Metodologia (módulos, manuais, capítulos de vídeo, manual institucional)
     ============================================================ */
  let indiceBusca = null;
  async function indice() {
    if (indiceBusca) return indiceBusca;
    const r = await P.carregarResumo();
    const mods = (r && !r.erro && r.modulos) || [];
    const itens = [];
    const add = (tipo, titulo, texto, rota, foco, onde) => { if (titulo) itens.push({ tipo, titulo: String(titulo), onde: onde || '', rota, foco, chave: semAcento(`${titulo} ${texto || ''} ${onde || ''}`) }); };
    for (const m of mods) add('Módulo', m.titulo, m.subtitulo, { area: 'metodologia', modulo: m.id }, null, 'Metodologia do Consultor');
    for (const v of (r && r.videos) || []) {
      add('Vídeo', v.titulo, v.resumo, { area: 'videos', modulo: v.id }, null, 'Biblioteca de Vídeos');
      for (const c of v.capitulos || []) if (c.titulo !== c.grupo) add('Capítulo de vídeo', c.titulo, c.grupo, { area: 'videos', modulo: v.id }, { tempo: c.t }, v.titulo);
    }
    await Promise.all(mods.filter((m) => m.recursos?.manual?.status === 'disponivel').map(async (m) => {
      const g = await P.carregarGuia(m.id);
      if (!g) return;
      const rota = { area: 'manuais', modulo: m.id };
      const onde = `Manual · ${m.titulo}`;
      (g.conceitos || []).forEach((c) => add('Conceito', c.titulo, c.texto, rota, c.titulo, onde));
      (g.palavras || []).forEach((p) => add('Palavra da tela', p.termo, p.definicao, rota, p.termo, onde));
      (g.capitulos || []).forEach((c) => { add('Capítulo', c.titulo, c.objetivo, rota, c.titulo, onde); (c.passos || []).forEach((p) => add('Passo', p.titulo, `${c.titulo} ${p.texto || ''}`, rota, p.titulo, onde)); });
      const k = g.consultor || {};
      (k.configuracoes || []).forEach((c) => add('Configuração', c.item || c.titulo, `${c.onde || ''} ${c.porque || ''}`, rota, c.item || c.titulo, onde));
      (k.errosComuns || []).forEach((e) => add('Erro comum', e.titulo, e.texto, rota, e.titulo, onde));
      (k.perguntasDoCliente || []).forEach((q) => add('Pergunta do cliente', q.pergunta, q.resposta, rota, q.pergunta, onde));
    }));
    const man = FF_EM_DESENVOLVIMENTO ? null : await carregarManualFF();
    if (man && !man.erro) {
      for (const f of man.frentes) for (const s of f.secoes) {
        add('Metodologia Faktory Flow', s.titulo, `${s.resumo || ''} ${(s.blocos || []).map((b) => b.texto || (b.itens || []).map((i) => (typeof i === 'string' ? i : `${i.titulo} ${i.texto || ''}`)).join(' ')).join(' ')}`, { area: 'metodologia-ff', secao: s.id }, null, f.titulo);
      }
      for (const g of man.glossario || []) add('Glossário', g.termo, g.definicao, { area: 'metodologia-ff' }, g.termo, 'Metodologia Faktory Flow');
    }
    indiceBusca = itens;
    return itens;
  }
  function buscar(q) {
    const termos = semAcento(q).split(/\s+/).filter(Boolean);
    if (!indiceBusca || !termos.length) return [];
    const peso = (i) => (semAcento(i.titulo).startsWith(termos[0]) ? 3 : semAcento(i.titulo).includes(termos[0]) ? 2 : 0) + (i.tipo === 'Módulo' ? 1 : 0);
    return indiceBusca.filter((i) => termos.every((t) => i.chave.includes(t))).sort((a, b) => peso(b) - peso(a)).slice(0, 14);
  }
  /** Abre um resultado da busca: rota + foco (tempo do vídeo ou trecho do texto). */
  function abrir(res) {
    if (res.foco && typeof res.foco === 'object' && 'tempo' in res.foco) window.__mtTempo = res.foco.tempo;
    else if (res.foco) window.__mtFoco = res.foco;
    ir(res.rota);
  }

  /* ============================================================
     Entrada: guia-abas.js chama desenhar(area, alvo, rota, ctx)
     ============================================================ */
  let destruirAtual = null;
  async function desenhar(area, alvo, rota, ctx) {
    if (destruirAtual) { try { destruirAtual(); } catch { /* nada */ } destruirAtual = null; }
    while (limpezas.length) { const f = limpezas.pop(); try { if (typeof f === 'function') f(); } catch { /* nada */ } }
    let fim = null;
    if (area === 'metodologia') fim = rota.modulo ? await paginaModulo(alvo, rota, ctx) : await catalogo(alvo, ctx);
    else if (area === 'manuais') fim = await manuais(alvo, rota, ctx);
    else if (area === 'videos') fim = await videos(alvo, rota, ctx);
    else if (area === 'metodologia-ff') fim = await metodologiaFF(alvo, rota, ctx);
    if (typeof fim === 'function') destruirAtual = fim;
    if (ctx.valida()) entrar(alvo);
  }
  document.addEventListener('ff:visibilidade-salva', () => { indiceBusca = null; });

  window.Metodologia = Object.freeze({ desenhar, indice, buscar, abrir, avisar });
})();
