/* Faktory Flow — Horas de implantação (compartilhado pelo modal dos módulos e pela aba de pacotes).
   Estrutura: Pacote → Módulos (horas preenchidas por módulo em cada pacote) + etapas + recursos → total do pacote.
   As tarefas (funcionalidades) e os itens da checklist não têm horas próprias: só descrição, prioridade e nível.
   O total do card é a soma direta do que foi preenchido; a tabela de preços só serve de comparativo.
   Faixas de usuários: a primeira faixa (até 5 usuários) de cada fluxo é o PAI. Nas faixas seguintes,
   módulos sem valor próprio são calculados a partir dele — ver derivarModulos().
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

  const inteiro = (x) => (Number.isFinite(Number(x)) && x != null && x !== '' ? Number(x) : null);

  /** Valor salvo para exatamente este cenário (null se não houver). */
  function valorSalvo(pacote, moduloId, fluxo, faixa) {
    const v = pacote?.horasModulos?.[moduloId];
    if (typeof v === 'number') return fluxo === 'Premium' && faixa === 0 ? v : null;
    return inteiro(v?.[fluxo]?.[faixa]);
  }

  /** Horas do PAI (primeira faixa, até 5 usuários) do fluxo; sem valor no fluxo, usa a base Premium. */
  function valorPai(pacote, moduloId, fluxo) {
    return valorSalvo(pacote, moduloId, fluxo, 0) ?? valorSalvo(pacote, moduloId, 'Premium', 0) ?? 0;
  }

  const somar = (lista) => lista.reduce((s, e) => s + e.minutos, 0);

  /**
   * Horas dos módulos em uma faixa de usuários, calculadas a partir do pai (até 5 usuários):
   *  1. O pacote cresce na mesma proporção da tabela de preços entre as faixas
   *     (ex.: 80h → 88h = +10%), aplicada ao total do pai (módulos + etapas + recursos).
   *  2. Etapas de implantação e recursos gerais não dependem do nº de usuários: ficam iguais.
   *  3. Todo o acréscimo vai para os módulos (treinamento e acompanhamento crescem com os usuários),
   *     dividido na proporção das horas de cada módulo no pai.
   *  4. Arredonda de 5 em 5 minutos e ajusta a sobra no maior módulo, para a soma fechar exata.
   * Módulos com valor salvo para aquela faixa mantêm o valor digitado.
   * Retorna Map(moduloId → { minutos, origem: 'proprio' | 'pai' | 'calculado', pai }).
   */
  function derivarModulos(pacote, fluxo = 'Premium', faixa = 0) {
    const ids = pacote?.modulos || [];
    const saida = new Map();
    const pais = ids.map((id) => valorPai(pacote, id, fluxo));
    if (faixa === 0) {
      ids.forEach((id, i) => {
        const proprio = valorSalvo(pacote, id, fluxo, 0);
        saida.set(id, { minutos: proprio ?? pais[i], origem: proprio != null ? 'proprio' : 'pai', pai: pais[i] });
      });
      return saida;
    }
    const tab0 = Number(pacote.precos?.[fluxo]?.[0]);
    const tabN = Number(pacote.precos?.[fluxo]?.[faixa]);
    const crescimento = tab0 > 0 && tabN > 0 ? tabN / tab0 : 1;
    const fixas = somar(pacote.etapas || []);
    const somaPais = pais.reduce((a, b) => a + b, 0);
    const acrescimo = (somaPais + fixas) * (crescimento - 1);
    const alvo = somaPais + acrescimo;
    const brutos = pais.map((p) => (somaPais ? (p * alvo) / somaPais : alvo / (ids.length || 1)));
    const valores = brutos.map((v) => Math.max(0, Math.round(v / 5) * 5));
    const resto = Math.round(alvo / 5) * 5 - valores.reduce((a, b) => a + b, 0);
    if (resto && valores.length) {
      const i = valores.indexOf(Math.max(...valores));
      valores[i] = Math.max(0, valores[i] + resto);
    }
    ids.forEach((id, i) => {
      const proprio = valorSalvo(pacote, id, fluxo, faixa);
      saida.set(id, { minutos: proprio ?? valores[i], origem: proprio != null ? 'proprio' : 'calculado', pai: pais[i] });
    });
    return saida;
  }

  /** Horas do módulo no pacote para o cenário (fluxo + faixa): o valor salvo, o do pai ou o calculado. */
  function valorModulo(pacote, moduloId, fluxo = 'Premium', faixa = 0) {
    return derivarModulos(pacote, fluxo, faixa).get(moduloId)?.minutos ?? 0;
  }

  const totalModulo = (modulo, pacoteId, fluxo, faixa) => {
    const pacote = estado.pacotes.find((p) => p.id === pacoteId);
    return valorModulo(pacote, modulo?.id ?? modulo, fluxo, faixa) ?? 0;
  };

  /** O módulo tem valor SALVO especificamente para este cenário? */
  function temValorProprio(pacote, moduloId, fluxo = 'Premium', faixa = 0) {
    return valorSalvo(pacote, moduloId, fluxo, faixa) != null;
  }

  /** Total do pacote: soma direta das horas preenchidas (módulos do cenário + etapas + recursos).
      A tabela de preços não entra na conta; só no comparativo. */
  function totalPacote(pacote, modulos, fluxo = 'Premium', faixa = 0) {
    const etapas = pacote.etapas.filter((e) => e.grupo === 'etapa');
    const recursos = pacote.etapas.filter((e) => e.grupo === 'recurso');
    const derivados = derivarModulos(pacote, fluxo, faixa);
    const porModulo = pacote.modulos
      .map((id) => modulos.find((m) => m.id === id))
      .filter(Boolean)
      .map((m) => {
        const d = derivados.get(m.id) || { minutos: 0, origem: 'pai', pai: 0 };
        return {
          id: m.id, nome: m.nome, cor: m.cor,
          minutos: d.minutos, pai: d.pai, origem: d.origem,
          proprio: d.origem === 'proprio',
          itens: (m.checklist || []).length,
        };
      });
    const minutosEtapas = somar(etapas);
    const minutosRecursos = somar(recursos);
    const minutosModulos = porModulo.reduce((s, m) => s + m.minutos, 0);
    return {
      etapas, recursos, porModulo, minutosEtapas, minutosRecursos, minutosModulos,
      minutosEtapasBase: minutosEtapas, minutosRecursosBase: minutosRecursos,
      total: minutosEtapas + minutosRecursos + minutosModulos,
      // Comparação com o pai (até 5 usuários) para explicar o cálculo das demais faixas.
      minutosModulosPai: porModulo.reduce((s, m) => s + m.pai, 0),
      calculados: porModulo.filter((m) => m.origem === 'calculado').length,
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
    valorModulo, temValorProprio, valorPai, derivarModulos,
  };

  window.ffSessao?.then((usuario) => { if (usuario) carregar(); });
})();
