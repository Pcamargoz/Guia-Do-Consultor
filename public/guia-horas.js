/* Faktory Flow — Horas de implantação (compartilhado pelo modal dos módulos e pela aba de pacotes).
   Estrutura: Pacote → Módulos (horas preenchidas por módulo em cada pacote) + etapas + recursos → total do pacote.
   As tarefas (funcionalidades) e os itens da checklist não têm horas próprias: só descrição, prioridade e nível.
   O total do card é a soma direta do que foi preenchido; a tabela de preços só serve de comparativo.
   Eventos: "ff:pacotes" (pacotes carregados/alterados) e "ff:pacote-ref" (pacote de referência mudou). */
(() => {
  const CHAVE_REF = 'ff-pacote-ref';
  const emitir = (nome, detail) => document.dispatchEvent(new CustomEvent(nome, { detail }));

  const estado = { pacotes: [], faixas: [], fluxos: ['Premium', 'Rápida'], carregado: false, erro: null };

  /* ---------- Formatação e leitura de durações ---------- */
  function formatar(minutos, { vazio = '—' } = {}) {
    if (minutos == null || Number.isNaN(minutos)) return vazio;
    const total = Math.round(minutos);
    const h = Math.floor(total / 60);
    const m = total % 60;
    if (!h) return `${m}min`;
    return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`;
  }

  /** Aceita "1h30", "1h", "90min", "45m", "1:30", "1,5", "1.5h", "2". Retorna minutos inteiros ou null. */
  function interpretar(texto) {
    const t = String(texto ?? '').trim().toLowerCase().replace(/\s+/g, '').replace(',', '.');
    if (!t) return null;
    let m;
    if ((m = t.match(/^(\d+):([0-5]?\d)$/))) return Number(m[1]) * 60 + Number(m[2]);
    if ((m = t.match(/^(\d+(?:\.\d+)?)h(?:(\d{1,2})(?:m|min)?)?$/))) return Math.round(Number(m[1]) * 60) + Number(m[2] || 0);
    if ((m = t.match(/^(\d+)(?:m|min|mins|minutos?)$/))) return Number(m[1]);
    if ((m = t.match(/^(\d+(?:\.\d+)?)$/))) return Math.round(Number(m[1]) * 60); // número puro = horas
    return null;
  }

  /* ---------- Pacote de referência ---------- */
  function lerRef() { try { return localStorage.getItem(CHAVE_REF); } catch { return null; } }
  function pacoteRef() {
    const id = lerRef();
    return estado.pacotes.find((p) => p.id === id) || estado.pacotes[estado.pacotes.length - 1] || null;
  }
  function definirRef(id) {
    try { localStorage.setItem(CHAVE_REF, id); } catch { /* sem storage */ }
    emitir('ff:pacote-ref', { id });
  }

  /* ---------- Cálculos ---------- */
  const pacotesDoModulo = (moduloId) => estado.pacotes.filter((p) => p.modulos.includes(moduloId));

  /** Pacote usado para exibir as horas de um módulo: o de referência, se incluir o módulo; senão o primeiro que inclua. */
  function pacoteParaModulo(moduloId) {
    const ref = pacoteRef();
    if (ref?.modulos.includes(moduloId)) return ref;
    return pacotesDoModulo(moduloId)[0] || null;
  }

  /** Horas do módulo no pacote para o cenário (fluxo + faixa). Só o valor preenchido:
      o do próprio cenário, ou o da base se aquele cenário ainda não tiver horas próprias.
      Não multiplica pela tabela de preços. */
  function valorModulo(pacote, moduloId, fluxo = 'Premium', faixa = 0) {
    const v = pacote?.horasModulos?.[moduloId];
    const inteiro = (x) => (Number.isFinite(Number(x)) && x != null && x !== '' ? Number(x) : null);
    if (typeof v === 'number') return v;
    if (!v || typeof v !== 'object') return 0;
    const direto = inteiro(v[fluxo]?.[faixa]);
    if (direto != null) return direto;
    return inteiro(v.Premium?.[0]) ?? 0;
  }

  const totalModulo = (modulo, pacoteId, fluxo, faixa) => {
    const pacote = estado.pacotes.find((p) => p.id === pacoteId);
    return valorModulo(pacote, modulo?.id ?? modulo, fluxo, faixa) ?? 0;
  };

  /** O módulo tem valor SALVO especificamente para este cenário (não o da base reutilizado)? */
  function temValorProprio(pacote, moduloId, fluxo = 'Premium', faixa = 0) {
    const v = pacote?.horasModulos?.[moduloId];
    if (typeof v === 'number') return fluxo === 'Premium' && faixa === 0;
    return Number.isFinite(Number(v?.[fluxo]?.[faixa])) && v?.[fluxo]?.[faixa] != null && v?.[fluxo]?.[faixa] !== '';
  }

  /** Total do pacote: soma direta das horas preenchidas (módulos do cenário + etapas + recursos).
      A tabela de preços não entra na conta; só no comparativo. */
  function totalPacote(pacote, modulos, fluxo = 'Premium', faixa = 0) {
    const etapas = pacote.etapas.filter((e) => e.grupo === 'etapa');
    const recursos = pacote.etapas.filter((e) => e.grupo === 'recurso');
    const somar = (lista) => lista.reduce((s, e) => s + e.minutos, 0);
    const porModulo = pacote.modulos
      .map((id) => modulos.find((m) => m.id === id))
      .filter(Boolean)
      .map((m) => ({
        id: m.id, nome: m.nome, cor: m.cor,
        minutos: valorModulo(pacote, m.id, fluxo, faixa),
        proprio: temValorProprio(pacote, m.id, fluxo, faixa),
        itens: (m.checklist || []).length,
      }));
    const minutosEtapas = somar(etapas);
    const minutosRecursos = somar(recursos);
    const minutosModulos = porModulo.reduce((s, m) => s + m.minutos, 0);
    return {
      etapas, recursos, porModulo, minutosEtapas, minutosRecursos, minutosModulos,
      minutosEtapasBase: minutosEtapas, minutosRecursosBase: minutosRecursos,
      total: minutosEtapas + minutosRecursos + minutosModulos,
      base: (pacote.precos.Premium?.[0] ?? 0) * 60,
      tabela: (pacote.precos[fluxo]?.[faixa] ?? 0) * 60,
    };
  }

  /** Null se o pacote não tem preço nesse fluxo/faixa (card indisponível). Não escala horas. */
  function fator(pacote, fluxo, faixa) {
    const base = pacote.precos.Premium?.[0];
    const alvo = pacote.precos[fluxo]?.[faixa];
    return base && alvo ? alvo / base : null;
  }

  /* ---------- Carga ---------- */
  let carregando = null;
  function carregar() {
    carregando ||= fetch('/api/pacotes', { cache: 'no-store' })
      .then(async (res) => {
        if (res.status === 401) return window.ffIrParaLogin?.();
        const dados = await res.json();
        if (!res.ok) throw new Error(dados.erro || 'Não foi possível carregar os pacotes.');
        Object.assign(estado, { pacotes: dados.pacotes, faixas: dados.faixas, fluxos: dados.fluxos, carregado: true, erro: null });
        emitir('ff:pacotes', { pacotes: estado.pacotes });
      })
      .catch((err) => { estado.erro = err.message; emitir('ff:pacotes', { erro: err.message }); })
      .finally(() => { carregando = null; });
    return carregando;
  }

  function substituirPacote(pacote) {
    const i = estado.pacotes.findIndex((p) => p.id === pacote.id);
    if (i >= 0) estado.pacotes[i] = pacote;
    emitir('ff:pacotes', { pacotes: estado.pacotes });
  }

  window.ffHoras = {
    estado, formatar, interpretar, carregar, substituirPacote,
    pacoteRef, definirRef, pacotesDoModulo, pacoteParaModulo, totalModulo, totalPacote, fator,
    valorModulo, temValorProprio,
  };

  window.ffSessao?.then((usuario) => { if (usuario) carregar(); });
})();
