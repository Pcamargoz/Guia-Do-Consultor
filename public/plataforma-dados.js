/* Faktory Flow — dados da plataforma de conhecimento (contrato-componentes.md v1/v2, §3).
   Cliente de /api/conteudo e /api/visibilidade + roteador de hash. Sem dependências, sem script inline (CSP).
   Expõe window.Plataforma:
     carregarResumo()              → Promise<Resumo | { erro: { status, mensagem } }>  (cache em memória; invalidado ao salvar visibilidade)
     carregarModulo(id, jornada)   → Promise<Detalhe | { erro }>
     visibilidade()                → Promise<{ itens } | { erro }>        (admin: visibilidade({ todos: true }) → lista)
                                     o mapa { chave: boolean } do perfil logado também passa a valer no roteador
     aplicarVisibilidade(itens)    → usa um mapa { chave: boolean } já carregado no roteador (mesmo efeito)
     salvarVisibilidade(item)      → Promise<item | { erro }>             (PUT, só admin; invalida o cache do resumo)
     invalidarResumo()             → descarta o cache de carregarResumo()
     rota                          → { area, modulo?, secao? } atual; evento window "plataforma:rota" (detail = rota)
     lerRota(hash), irPara(rota)   → utilitários do roteador (o ÚNICO roteador de hash da página)
     ALIASES                       → hashes antigos aceitos (guia-abas.js, guia antigo, âncoras internas)
   Escuta `plataforma:abrir` (emitido pela UI) e chama irPara; dá preventDefault para a UI não navegar de novo.
   As promessas nunca rejeitam: erro de rede ou HTTP vira { erro: { status, mensagem } } (status 0 = sem conexão). */
(() => {
  // Metodologia (doc 14): #metodologia[/<modulo>] · #manuais[/<modulo>] · #videos[/<modulo>] · #metodologia-ff[/<secao>].
  // Pacotes e Horas e o Painel continuam como ferramentas. As áreas antigas viram aliases (ALIASES_AREA).
  const AREAS = ['metodologia', 'manuais', 'videos', 'metodologia-ff', 'pacotes', 'admin'];
  const AREA_INICIAL = 'metodologia';
  const AREAS_COM_MODULO = ['metodologia', 'manuais', 'videos'];
  // Área antiga → área nova (o módulo, quando vem no endereço, é mantido).
  const ALIASES_AREA = Object.freeze({ inicio: 'metodologia', inicial: 'metodologia', consultor: 'metodologia', checklist: 'metodologia', acervo: 'metodologia-ff', apostila: 'metodologia-ff' });
  const JORNADAS = ['inicial', 'consultor'];
  const SEGMENTO = /^[a-z0-9-]{1,60}$/;
  const TEMPO_LIMITE_MS = 15000;

  const erro = (status, mensagem) => ({ erro: { status, mensagem } });

  async function pedir(url, { metodo = 'GET', corpo } = {}) {
    const controle = typeof AbortController === 'function' ? new AbortController() : null;
    const relogio = controle ? setTimeout(() => controle.abort(), TEMPO_LIMITE_MS) : null;
    try {
      const resposta = await fetch(url, {
        method: metodo,
        credentials: 'same-origin',
        cache: 'no-store',
        headers: corpo === undefined ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: corpo === undefined ? undefined : JSON.stringify(corpo),
        signal: controle?.signal,
      });
      if (resposta.status === 401 && typeof window.ffIrParaLogin === 'function') return window.ffIrParaLogin();
      let dados = null;
      try { dados = await resposta.json(); } catch { dados = null; }
      if (!resposta.ok) {
        const mensagem = (dados && typeof dados.erro === 'string' && dados.erro) || `Não foi possível carregar (erro ${resposta.status}).`;
        return erro(resposta.status, mensagem);
      }
      return dados;
    } catch (e) {
      return erro(0, e?.name === 'AbortError' ? 'O servidor demorou a responder. Tente de novo.' : 'Sem conexão com o servidor. Tente de novo.');
    } finally {
      if (relogio) clearTimeout(relogio);
    }
  }

  /* Cache do resumo: a UI chama carregarResumo várias vezes; depois de salvar a Visibilidade o conteúdo
     filtrado pode mudar, então invalidamos. Erros não ficam em cache. */
  let prometeResumo = null;
  const invalidarResumo = () => { prometeResumo = null; };
  function carregarResumo() {
    if (!prometeResumo) {
      prometeResumo = pedir('/api/conteudo').then((r) => {
        if (r && r.erro) prometeResumo = null;
        return r;
      });
    }
    return prometeResumo;
  }

  function carregarModulo(id, jornada) {
    if (!SEGMENTO.test(String(id || '')) || !JORNADAS.includes(jornada)) return Promise.resolve(erro(400, 'Módulo ou jornada inválidos.'));
    return pedir(`/api/conteudo?modulo=${encodeURIComponent(id)}&jornada=${encodeURIComponent(jornada)}`);
  }

  /** Guia visual do módulo (public/manuais/<id>/guia.json). Sem guia, oculto ou inválido → null (a página segue sem ele). */
  async function carregarGuia(id) {
    if (!SEGMENTO.test(String(id || ''))) return null;
    const r = await pedir(`/manuais/${encodeURIComponent(id)}/guia.json`);
    return r && !r.erro && typeof r === 'object' && Array.isArray(r.capitulos) ? r : null;
  }

  /* ---------- Progresso do checklist de aprendizado (Guia Inicial) ----------
     Reaproveita /api/checklists-progresso (doc 03): chave "inicial:<modulo>", dados.marcados = { itemId: 1 }, pct 0–100.
     Erros viram {} / [] (a página segue; o progresso só não aparece). */
  const CHAVE_PROG = /^[a-z0-9:_-]{3,80}$/;
  async function progressoResumo() {
    const r = await pedir('/api/checklists-progresso?lista=1');
    if (!r || r.erro || !Array.isArray(r.itens)) return {};
    return Object.fromEntries(r.itens.filter((i) => typeof i.chave === 'string').map((i) => [i.chave, Number(i.pct) || 0]));
  }
  async function progresso(chave) {
    if (!CHAVE_PROG.test(String(chave || ''))) return [];
    const r = await pedir(`/api/checklists-progresso?chave=${encodeURIComponent(chave)}`);
    const m = r && !r.erro && r.dados && r.dados.marcados;
    return m && typeof m === 'object' ? Object.keys(m) : [];
  }
  async function salvarProgresso(chave, feitos, total) {
    if (!CHAVE_PROG.test(String(chave || ''))) return erro(400, 'Checklist inválido.');
    const marcados = Object.fromEntries((feitos || []).map((id) => [String(id), 1]));
    const pct = total > 0 ? Math.round((Object.keys(marcados).length * 100) / total) : 0;
    return pedir(`/api/checklists-progresso?chave=${encodeURIComponent(chave)}`, { metodo: 'PUT', corpo: { dados: { marcados, t: Date.now() }, pct } });
  }

  async function visibilidade({ todos = false } = {}) {
    const r = await pedir(todos ? '/api/visibilidade?todos=1' : '/api/visibilidade');
    if (!todos && r && !r.erro && r.itens && typeof r.itens === 'object') aplicarVisibilidade(r.itens);
    return r;
  }

  async function salvarVisibilidade(item) {
    if (!item || typeof item.chave !== 'string') return erro(400, 'Item de visibilidade inválido.');
    const { chave, visivel, perfis } = item;
    const r = await pedir('/api/visibilidade', { metodo: 'PUT', corpo: { chave, visivel, perfis } });
    if (r && !r.erro) invalidarResumo();
    return r;
  }

  /* ---------- Roteador de hash: #inicio · #inicial[/<modulo>] · #consultor[/<modulo>] · ferramentas ----------
     Único roteador da página (review v1 do Lead, item 6): guia-abas.js passa a ouvir "plataforma:rota".
     Hashes antigos continuam valendo (aliases). `secao` = âncora dentro da área (rolar até ela, sem trocar de área).
     Alias aprovado (Lead v3.4→v3.5): `#consultor/fundamentos` → `{ area: 'acervo', secao: 'metodo' }`. */
  const AREAS_COM_SECAO = ['metodologia-ff', 'pacotes', 'admin'];
  const SECAO = /^[A-Za-z0-9_-]{1,80}$/;
  // Hash antigo → rota. Fontes: public/guia-abas.js (aba "guia" = guia antigo, que vira o Acervo — doc 03) e
  // public/index.html (seções do guia antigo, roladas por scrollToSection: ids dashboard … conclusao).
  const ALIASES = Object.freeze({
    guia: Object.freeze({ area: 'metodologia-ff' }),
    ...Object.fromEntries(['dashboard', 'parte1', 'metodo', 'modulos', 'processos', 'diagnostico', 'conclusao']
      .map((id) => [id, Object.freeze({ area: 'metodologia-ff' })])),
  });
  // Âncoras internas que já mudam o hash hoje: #pc-nome-<id> (guia-pacotes.js) e #ck-<n> (relatório de problemas).
  const ALIASES_PREFIXO = Object.freeze([[/^pc-nome-[A-Za-z0-9_-]{1,72}$/, 'pacotes'], [/^ck-\d{1,4}$/, 'metodologia']]);

  /* Perfil (v3): área oculta para o perfil logado não abre; o roteador manda para o início, sem mensagem de erro
     (ex.: estagiário com link antigo #guia → Acervo, que é só de consultor por padrão → #inicio).
     O mapa vem de GET /api/visibilidade (efetivo para o perfil; admin recebe tudo true). Enquanto ele não chega,
     o roteador não filtra: quem renderiza deve chamar Plataforma.visibilidade() antes do 1º desenho, e o servidor
     continua recusando o conteúdo oculto (403/404). Área sem chave de visibilidade (inicio, admin) não é filtrada aqui. */
  const CHAVE_DA_AREA = Object.freeze({
    metodologia: 'area:metodologia', manuais: 'area:manuais', videos: 'area:videos', 'metodologia-ff': 'area:metodologia-ff', pacotes: 'area:pacotes',
  });
  let mapaVisibilidade = null;
  const areaPermitida = (area) => !mapaVisibilidade || !Object.hasOwn(CHAVE_DA_AREA, area) || mapaVisibilidade[CHAVE_DA_AREA[area]] === true;

  const decodificar = (p) => { try { return decodeURIComponent(p); } catch { return ''; } };

  function lerRota(hash) {
    const rota = lerRotaSemPerfil(hash);
    if (areaPermitida(rota.area)) return rota;
    const outra = AREAS.find((a) => a !== 'admin' && areaPermitida(a));
    return { area: outra || AREA_INICIAL };
  }

  function lerRotaSemPerfil(hash) {
    const brutas = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean).map(decodificar);
    const partes = brutas.map((p) => p.toLowerCase());
    if (partes.length === 1 && Object.hasOwn(ALIASES, partes[0])) return { ...ALIASES[partes[0]] };
    if (partes.length === 1) {
      const prefixo = ALIASES_PREFIXO.find(([re]) => re.test(brutas[0]));
      if (prefixo) return { area: prefixo[1], secao: brutas[0] };
    }
    // Lead: #consultor/fundamentos → a metodologia institucional (antes: acervo/método).
    if (partes[0] === 'consultor' && partes[1] === 'fundamentos') return { area: 'metodologia-ff' };
    const pedida = Object.hasOwn(ALIASES_AREA, partes[0]) ? ALIASES_AREA[partes[0]] : partes[0];
    const area = AREAS.includes(pedida) ? pedida : AREA_INICIAL;
    const rota = { area };
    if (AREAS_COM_MODULO.includes(area) && partes[1] && SEGMENTO.test(partes[1])) rota.modulo = partes[1];
    if (AREAS_COM_SECAO.includes(area) && pedida === partes[0] && brutas[1] && SECAO.test(brutas[1])) rota.secao = brutas[1];
    return rota;
  }

  const hashDe = (rota) => `#${rota.area}${rota.modulo ? `/${rota.modulo}` : ''}${rota.secao ? `/${rota.secao}` : ''}`;

  /* Endereço limpo (pedido do responsável em 12/11/2026): a rota vive em history.state, nunca na barra de endereço.
     O "voltar" do navegador continua funcionando (popstate); um endereço antigo com # abre a tela certa e é limpo. */
  const ENDERECO = () => location.pathname + location.search;
  const rotaDoHistorico = () => {
    const r = window.history && window.history.state && window.history.state.ffRota;
    return r && typeof r === 'object' && typeof r.area === 'string' ? lerRota(hashDe(r)) : null;
  };
  function gravar(rota, novaEntrada) {
    if (!window.history || typeof window.history.replaceState !== 'function') return;
    const estado = { ...(window.history.state || {}), ffRota: { ...rota } };
    if (novaEntrada) window.history.pushState(estado, '', ENDERECO());
    else window.history.replaceState(estado, '', ENDERECO());
  }
  function rotaInicial() {
    const rota = location.hash && location.hash.length > 1 ? lerRota(location.hash) : (rotaDoHistorico() || { area: AREA_INICIAL });
    gravar(rota, false);
    return rota;
  }

  function irPara(rota) {
    const destino = lerRota(hashDe(rota || { area: AREA_INICIAL }));
    if (!mesmaRota(destino, Plataforma.rota)) gravar(destino, true);
    atualizar(destino);
  }

  const mesmaRota = (a, b) => Boolean(a && b) && hashDe(a) === hashDe(b);

  /** Passa a usar o mapa de visibilidade do perfil no roteador; se a rota atual ficou proibida, vai ao início em silêncio. */
  function aplicarVisibilidade(itens) {
    if (!itens || typeof itens !== 'object' || Array.isArray(itens)) return;
    mapaVisibilidade = Object.freeze(Object.fromEntries(Object.entries(itens).filter(([, v]) => typeof v === 'boolean')));
    const nova = lerRota(hashDe(Plataforma.rota));
    if (mesmaRota(nova, Plataforma.rota)) return;
    // troca a rota sem criar entrada no histórico (o "voltar" não leva de novo à área oculta)
    gravar(nova, false);
    atualizar(nova);
  }

  const Plataforma = { carregarResumo, carregarModulo, carregarGuia, progressoResumo, progresso, salvarProgresso, visibilidade, aplicarVisibilidade, salvarVisibilidade, invalidarResumo, lerRota, irPara, ALIASES, rota: null };
  Plataforma.rota = rotaInicial();

  function atualizar(rota) {
    Plataforma.rota = rota || rotaDoHistorico() || { area: AREA_INICIAL };
    window.dispatchEvent(new CustomEvent('plataforma:rota', { detail: { ...Plataforma.rota } }));
  }

  /** UI emite `plataforma:abrir` { modulo, jornada }; este é o dono da navegação (contrato v2). */
  function aoAbrir(ev) {
    const d = ev && ev.detail;
    if (!d || typeof d !== 'object') return;
    if (typeof ev.preventDefault === 'function') ev.preventDefault();
    const area = typeof d.jornada === 'string' ? d.jornada : (typeof d.area === 'string' ? d.area : null);
    if (!area) return;
    const destino = { area };
    if (typeof d.modulo === 'string' && d.modulo) destino.modulo = d.modulo;
    if (typeof d.secao === 'string' && d.secao) destino.secao = d.secao;
    irPara(destino);
  }

  // Link interno com # (ex.: href="#manuais/crm"): vira rota e o endereço volta a ficar limpo.
  window.addEventListener('hashchange', () => {
    if (!location.hash || location.hash.length < 2) return;
    const rota = lerRota(location.hash);
    gravar(rota, false);
    atualizar(rota);
  });
  window.addEventListener('popstate', () => atualizar(rotaDoHistorico() || { area: AREA_INICIAL }));
  window.addEventListener('plataforma:abrir', aoAbrir);
  window.Plataforma = Plataforma;
})();
