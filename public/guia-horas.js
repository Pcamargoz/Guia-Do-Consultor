/* Faktory Flow — Horas de implantação (compartilhado pelo modal dos módulos e pela aba de pacotes).
   Estrutura: Pacote → Módulos → itens da checklist (minutos por pacote) → total do módulo → total do pacote.
   Horas editáveis ficam na base Premium · até 5 usuários; demais fluxos/faixas são proporcionais à tabela de preços.
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

  const minutosItem = (item, pacoteId) => Number(item?.minutos?.[pacoteId] ?? 0);
  const totalModulo = (modulo, pacoteId) => (modulo?.checklist || []).reduce((s, it) => s + minutosItem(it, pacoteId), 0);

  function totalPacote(pacote, modulos) {
    const etapas = pacote.etapas.filter((e) => e.grupo === 'etapa');
    const recursos = pacote.etapas.filter((e) => e.grupo === 'recurso');
    const somar = (lista) => lista.reduce((s, e) => s + e.minutos, 0);
    const porModulo = pacote.modulos
      .map((id) => modulos.find((m) => m.id === id))
      .filter(Boolean)
      .map((m) => ({ id: m.id, nome: m.nome, cor: m.cor, minutos: totalModulo(m, pacote.id), itens: (m.checklist || []).length }));
    const minutosEtapas = somar(etapas);
    const minutosRecursos = somar(recursos);
    const minutosModulos = porModulo.reduce((s, m) => s + m.minutos, 0);
    return {
      etapas, recursos, porModulo, minutosEtapas, minutosRecursos, minutosModulos,
      total: minutosEtapas + minutosRecursos + minutosModulos,
      tabela: (pacote.precos.Premium?.[0] ?? 0) * 60,
    };
  }

  /** Fator de proporção para outro fluxo/faixa (null se o pacote não existe nesse fluxo). */
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
    pacoteRef, definirRef, pacotesDoModulo, pacoteParaModulo, minutosItem, totalModulo, totalPacote, fator,
  };

  window.ffSessao?.then((usuario) => { if (usuario) carregar(); });
})();
