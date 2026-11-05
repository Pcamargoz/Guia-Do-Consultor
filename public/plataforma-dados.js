/* Faktory Flow — dados da plataforma de conhecimento (contrato-componentes.md v1, §3).
   Cliente de /api/conteudo e /api/visibilidade + roteador de hash. Sem dependências, sem script inline (CSP).
   Expõe window.Plataforma:
     carregarResumo()              → Promise<Resumo | { erro: { status, mensagem } }>
     carregarModulo(id, jornada)   → Promise<Detalhe | { erro }>
     visibilidade()                → Promise<{ itens } | { erro }>        (admin: visibilidade({ todos: true }) → lista)
     salvarVisibilidade(item)      → Promise<item | { erro }>             (PUT, só admin)
     rota                          → { area, modulo? } atual; evento window "plataforma:rota" (detail = rota)
     lerRota(hash), irPara(rota)   → utilitários do roteador
   As promessas nunca rejeitam: erro de rede ou HTTP vira { erro: { status, mensagem } } (status 0 = sem conexão). */
(() => {
  const AREAS = ['inicio', 'inicial', 'consultor', 'acervo', 'pacotes', 'checklist', 'videos', 'apostila', 'admin'];
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

  const carregarResumo = () => pedir('/api/conteudo');

  function carregarModulo(id, jornada) {
    if (!SEGMENTO.test(String(id || '')) || !JORNADAS.includes(jornada)) return Promise.resolve(erro(400, 'Módulo ou jornada inválidos.'));
    return pedir(`/api/conteudo?modulo=${encodeURIComponent(id)}&jornada=${encodeURIComponent(jornada)}`);
  }

  const visibilidade = ({ todos = false } = {}) => pedir(todos ? '/api/visibilidade?todos=1' : '/api/visibilidade');

  function salvarVisibilidade(item) {
    if (!item || typeof item.chave !== 'string') return Promise.resolve(erro(400, 'Item de visibilidade inválido.'));
    const { chave, visivel, perfis } = item;
    return pedir('/api/visibilidade', { metodo: 'PUT', corpo: { chave, visivel, perfis } });
  }

  /* ---------- Roteador de hash: #inicio · #inicial[/<modulo>] · #consultor[/<modulo>|/fundamentos] · ferramentas ---------- */
  function lerRota(hash) {
    const partes = String(hash || '').replace(/^#\/?/, '').split('/').filter(Boolean).map((p) => { try { return decodeURIComponent(p).toLowerCase(); } catch { return ''; } });
    const area = AREAS.includes(partes[0]) ? partes[0] : 'inicio';
    const rota = { area };
    if ((area === 'inicial' || area === 'consultor') && partes[1] && SEGMENTO.test(partes[1])) rota.modulo = partes[1];
    return rota;
  }

  const hashDe = (rota) => `#${rota.area}${rota.modulo ? `/${rota.modulo}` : ''}`;

  function irPara(rota) {
    const destino = lerRota(hashDe(rota || { area: 'inicio' }));
    if (location.hash !== hashDe(destino)) location.hash = hashDe(destino);
    else atualizar();
  }

  const Plataforma = { carregarResumo, carregarModulo, visibilidade, salvarVisibilidade, lerRota, irPara, rota: lerRota(location.hash) };

  function atualizar() {
    Plataforma.rota = lerRota(location.hash);
    window.dispatchEvent(new CustomEvent('plataforma:rota', { detail: { ...Plataforma.rota } }));
  }

  window.addEventListener('hashchange', atualizar);
  window.Plataforma = Plataforma;
})();
