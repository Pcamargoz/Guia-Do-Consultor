/* Faktory Flow — Aba "Pacotes e Distribuição de Horas".
   Cards por pacote com módulos, distribuição das horas, total previsto (soma das horas preenchidas
   nos módulos + etapas + recursos) comparado à tabela de preços, tarefas incluídas e horas por faixa.
   Tarefas têm só descrição, prioridade (Alta/Média/Baixa) e nível — a prioridade não entra no total.
   Consultores/administradores editam as horas de um módulo clicando nelas e os módulos/tarefas pelo editor. */
(() => {
  const painel = document.getElementById('painel-pacotes');
  const H = window.ffHoras;
  if (!painel || !H) return;

  const CHAVE_CENARIO = 'ff-cenario-horas';
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    relogio: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>',
    camadas: '<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    lista: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
    seta: '<polyline points="9 18 15 12 9 6"/>',
    igual: '<line x1="5" y1="9" x2="19" y2="9"/><line x1="5" y1="15" x2="19" y2="15"/>',
    acima: '<polyline points="18 15 12 9 6 15"/>',
    abaixo: '<polyline points="6 9 12 15 18 9"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  };
  const SERIES = [
    { chave: 'minutosEtapas', nome: 'Etapas de implantação', classe: 'etapas' },
    { chave: 'minutosModulos', nome: 'Módulos', classe: 'modulos' },
    { chave: 'minutosRecursos', nome: 'Recursos gerais', classe: 'recursos' },
  ];

  let podeEditar = false;
  let modulosProntos = false;
  let cenario = { fluxo: 'Premium', faixa: 0 };
  try { cenario = { ...cenario, ...JSON.parse(localStorage.getItem(CHAVE_CENARIO) || '{}') }; } catch { /* padrão */ }
  const abertos = new Set(); // <details> abertos, preservados entre renderizações

  const listaModulos = () => (typeof modulos !== 'undefined' ? modulos : []);
  const pct = (parte, total) => (total ? Math.round((parte / total) * 100) : 0);

  /* ---------- Estrutura fixa da aba ---------- */
  painel.innerHTML = `
    <div class="header pc-header">
      <h2>Pacotes e Distribuição de Horas</h2>
      <p>Quanto tempo cada pacote leva para ser implantado e como as horas se distribuem entre etapas, módulos e recursos.</p>
    </div>
    <div class="pc-controles" role="group" aria-label="Cenário de cálculo">
      <div class="pc-controle">
        <span class="pc-controle-rotulo" id="pc-rotulo-fluxo">Fluxo</span>
        <div class="pc-seg" role="radiogroup" aria-labelledby="pc-rotulo-fluxo" data-controle="fluxo"></div>
      </div>
      <label class="pc-controle">
        <span class="pc-controle-rotulo">Faixa de usuários</span>
        <select class="ed-input pc-faixa" data-controle="faixa"></select>
      </label>
      <p class="pc-nota" data-nota></p>
    </div>
    <div data-conteudo aria-live="polite"></div>`;
  const conteudo = painel.querySelector('[data-conteudo]');

  function renderControles() {
    const fluxos = H.estado.fluxos;
    painel.querySelector('[data-controle="fluxo"]').innerHTML = fluxos.map((f) => `
      <button type="button" role="radio" aria-checked="${cenario.fluxo === f}" class="pc-seg-btn" data-fluxo="${esc(f)}">${esc(f)}</button>`).join('');
    const select = painel.querySelector('[data-controle="faixa"]');
    select.innerHTML = H.estado.faixas.map((f, i) => `<option value="${i}"${cenario.faixa === i ? ' selected' : ''}>${esc(f)}</option>`).join('');
    painel.querySelector('[data-nota]').innerHTML = `${svg(I.info)}<span>${podeEditar
      ? (cenario.faixa === 0
        ? `<strong>Até 5 usuários é a faixa-pai</strong>: as horas preenchidas aqui são a base das demais faixas. Clique nas horas de um módulo para editar. O total do card é a soma de módulos + etapas + recursos.`
        : `<strong>Horas calculadas a partir de até 5 usuários</strong>: o pacote cresce na mesma proporção da tabela de preços; etapas e recursos ficam iguais e o acréscimo vai para os módulos. Os valores com <span aria-hidden="true">*</span> são calculados — clique para fixar um valor só para ${esc(H.estado.faixas[cenario.faixa] || '')}.`)
      : `Cenário ${esc(cenario.fluxo)} · ${esc(H.estado.faixas[cenario.faixa] || 'até 5 usuários')}${cenario.faixa ? ' — horas calculadas a partir de até 5 usuários.' : ' (faixa-pai).'}`}</span>`;
  }

  /* ---------- Blocos visuais ---------- */
  function barraEmpilhada(t) {
    const total = t.total || 1;
    const segmentos = SERIES.filter((s) => t[s.chave] > 0);
    return `
      <div class="pc-pilha" role="img" aria-label="Distribuição: ${SERIES.map((s) => `${s.nome} ${H.formatar(t[s.chave], { vazio: '0h' })}`).join(', ')}">
        ${segmentos.map((s) => `<span class="pc-pilha-seg pc-cor--${s.classe}" style="flex-grow:${t[s.chave]}" title="${esc(s.nome)}: ${H.formatar(t[s.chave], { vazio: '0h' })} (${pct(t[s.chave], total)}%)"></span>`).join('')}
      </div>
      <ul class="pc-legenda">
        ${SERIES.map((s) => `<li><span class="pc-amostra pc-cor--${s.classe}" aria-hidden="true"></span>${esc(s.nome)}<strong>${H.formatar(t[s.chave], { vazio: '0h' })}</strong><small>${pct(t[s.chave], total)}%</small></li>`).join('')}
      </ul>`;
  }

  function comparativoTabela(t, pacote) {
    const tabela = pacote.precos[cenario.fluxo]?.[cenario.faixa];
    if (tabela == null) return '';
    const diferenca = t.total - t.tabela;
    if (!diferenca) return `<span class="pc-comparativo pc-comparativo--igual">${svg(I.igual)}Igual à tabela de preços (${tabela}h)</span>`;
    const acima = diferenca > 0;
    return `<span class="pc-comparativo pc-comparativo--${acima ? 'acima' : 'abaixo'}">${svg(acima ? I.acima : I.abaixo)}${H.formatar(Math.abs(diferenca))} ${acima ? 'acima' : 'abaixo'} da tabela (${tabela}h)</span>`;
  }

  function duracaoEditavel(pacote, etapa) {
    const rotulo = H.formatar(etapa.minutos, { vazio: '0min' });
    return podeEditar
      ? `<button type="button" class="hr-duracao" data-editar-etapa="${esc(etapa.id)}" data-pacote="${esc(pacote.id)}" aria-label="Duração de ${esc(etapa.texto)}: ${rotulo}. Editar">${svg(I.relogio)}<span>${rotulo}</span></button>`
      : `<span class="hr-duracao hr-duracao--leitura">${svg(I.relogio)}<span>${rotulo}</span></span>`;
  }

  function detalhes(pacoteId, chave, titulo, corpo, contagem) {
    const id = `${pacoteId}:${chave}`;
    return `<details class="pc-detalhes" data-detalhe="${esc(id)}"${abertos.has(id) ? ' open' : ''}>
      <summary><span>${titulo}</span>${contagem != null ? `<span class="ed-conta">${contagem}</span>` : ''}${svg(I.seta, 'pc-detalhes-seta')}</summary>
      <div class="pc-detalhes-corpo">${corpo}</div>
    </details>`;
  }

  function cartao(pacote) {
    const t = H.totalPacote(pacote, listaModulos(), cenario.fluxo, cenario.faixa);
    const f = H.fator(pacote, cenario.fluxo, cenario.faixa);
    const funcs = pacote.funcionalidades;
    const pro = funcs.filter((x) => x.nivel === 'Pro').length;
    const maiorModulo = Math.max(1, ...t.porModulo.map((m) => m.minutos));
    const indisponivel = f == null;
    const cenarioTxt = `${cenario.fluxo} · ${H.estado.faixas[cenario.faixa] || ''}`;

    const modulosHtml = t.porModulo.length ? `<ul class="pc-modulos">${t.porModulo.map((m) => `\n      <li><div class="pc-modulo">
        <span class="pc-modulo-nome">${esc(m.nome)}</span>
        <span class="pc-modulo-trilho" aria-hidden="true"><span class="pc-modulo-barra" style="width:${Math.max(2, (m.minutos / maiorModulo) * 100)}%"></span></span>
        ${podeEditar
          ? `<button type="button" class="pc-modulo-horas pc-modulo-horas--editar${m.proprio ? ' pc-modulo-horas--proprio' : ''}" data-editar-modulo="${esc(m.id)}" data-pacote="${esc(pacote.id)}" title="${m.origem === 'proprio' ? `Valor fixado para ${esc(cenarioTxt)}` : m.origem === 'calculado' ? `Calculado a partir de até 5 usuários (${H.formatar(m.pai, { vazio: '0h' })}); clique para fixar um valor só para ${esc(cenarioTxt)}` : `Horas de até 5 usuários (faixa-pai)`}" aria-label="Horas de ${esc(m.nome)} no pacote ${esc(pacote.nome)} (${esc(cenarioTxt)}): ${H.formatar(m.minutos, { vazio: '0h' })}. Editar">${H.formatar(m.minutos, { vazio: '0h' })}${m.origem === 'calculado' ? '<span aria-hidden="true">*</span>' : ''}</button>`
          : `<span class="pc-modulo-horas">${H.formatar(m.minutos, { vazio: '0h' })}</span>`}
        <span class="pc-modulo-pct">${pct(m.minutos, t.total)}%</span>
      </div></li>`).join('')}</ul>` : '<p class="ed-nada">Nenhum módulo do guia neste pacote.</p>';

    const etapasHtml = `<ul class="pc-etapas">${t.etapas.map((e) => `<li><span>${esc(e.texto)}</span>${duracaoEditavel(pacote, e)}</li>`).join('')}</ul>`;
    const recursosHtml = t.recursos.length
      ? `<ul class="pc-etapas">${t.recursos.map((e) => `<li><span>${esc(e.texto)}<small>${esc(e.detalhe || '')}</small></span>${duracaoEditavel(pacote, e)}</li>`).join('')}</ul>`
      : '<p class="ed-nada">Nenhum recurso adicional neste pacote.</p>';

    const porModuloPlanilha = funcs.reduce((acc, x) => ((acc[x.modulo] ||= []).push(x), acc), {});
    const botaoEditor = podeEditar ? `<button type="button" class="ed-btn pc-editar-conteudo" data-editar-conteudo="${esc(pacote.id)}">${svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>')}Editar módulos e tarefas</button>` : '';
    const funcsHtml = Object.entries(porModuloPlanilha).map(([mod, lista]) => `
      <div class="pc-func-grupo"><h4>${esc(mod)} <span class="ed-conta">${lista.length}</span></h4>
        <ul class="pc-funcs">${lista.map((x) => `<li class="pc-func"><span>${esc(x.funcionalidade)}</span><span class="pc-func-meta">${x.nivel === 'Pro' ? '<abbr class="pc-pro" title="Funcionalidade Pro">Pro</abbr>' : ''}<span class="pc-complexidade pc-complexidade--${esc(x.complexidade.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase())}">${esc(x.complexidade)}</span></span></li>`).join('')}</ul>
      </div>`).join('');

    const faixasCurtas = H.estado.faixas.map((x) => x.replace(' usuários', '').replace('até ', 'até '));
    const precosHtml = `<div class="pc-tabela-envoltorio"><table class="pc-tabela">
      <caption class="ed-sr">Horas da tabela de preços por fluxo e faixa de usuários</caption>
      <thead><tr><th scope="col">Fluxo</th>${faixasCurtas.map((x) => `<th scope="col">${esc(x)}</th>`).join('')}</tr></thead>
      <tbody>${H.estado.fluxos.map((fl) => `<tr><th scope="row">${esc(fl)}</th>${H.estado.faixas.map((_, i) => {
        const v = pacote.precos[fl]?.[i];
        const atual = fl === cenario.fluxo && i === cenario.faixa;
        return `<td${atual ? ' class="pc-atual" aria-current="true"' : ''}>${v == null ? '—' : `${v}h`}</td>`;
      }).join('')}</tr>`).join('')}</tbody></table></div>`;

    const historicoHtml = pacote.historico?.length
      ? `<ol class="pc-historico">${pacote.historico.map((h) => `<li><time datetime="${esc(h.em)}">${esc(new Date(h.em).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }))}</time><span>${esc(h.detalhe)}${h.autor ? ` — ${esc(h.autor)}` : ''}</span></li>`).join('')}</ol>`
      : '<p class="ed-nada">Nenhuma alteração registrada neste pacote.</p>';

    return `
      <article class="pc-card pc-card--${esc(pacote.nivel.toLowerCase())}${indisponivel ? ' pc-card--indisponivel' : ''}" data-pacote-card="${esc(pacote.id)}" aria-labelledby="pc-nome-${esc(pacote.id)}">
        <header class="pc-card-topo">
          <div>
            <span class="pc-nivel pc-nivel--${esc(pacote.nivel.toLowerCase())}">${esc(pacote.nivel)}</span>
            <h3 id="pc-nome-${esc(pacote.id)}">${esc(pacote.nome)}</h3>
            <p class="pc-meta">${t.porModulo.length} módulos no guia · ${funcs.length} funcionalidades${pro ? ` (${pro} Pro)` : ''}</p>
          </div>
          <div class="pc-total">
            <span class="pc-total-rotulo">Tempo total previsto</span>
            <strong class="pc-total-valor">${indisponivel ? '—' : H.formatar(t.total, { vazio: '0h' })}</strong>
            ${indisponivel ? `<span class="pc-comparativo">${svg(I.info)}Não disponível no fluxo ${esc(cenario.fluxo)}</span>` : comparativoTabela(t, pacote)}
          </div>
        </header>

        ${indisponivel ? '' : barraEmpilhada(t)}

        <section class="pc-bloco" aria-label="Módulos e horas">
          <h4 class="pc-bloco-titulo">${svg(I.camadas)}Módulos contemplados <span class="pc-bloco-soma">${H.formatar(t.minutosModulos, { vazio: '0h' })}</span></h4>
          ${cenario.faixa > 0 && !indisponivel && t.calculados ? `<p class="pc-derivado">${svg(I.info)}<span>Calculado a partir de até 5 usuários: módulos ${H.formatar(t.minutosModulosPai, { vazio: '0h' })} → <strong>${H.formatar(t.minutosModulos, { vazio: '0h' })}</strong> (+${H.formatar(Math.max(0, t.minutosModulos - t.minutosModulosPai), { vazio: '0h' })}). Etapas e recursos não mudam com o número de usuários.</span></p>` : ''}
          ${indisponivel ? '' : modulosHtml}
          ${botaoEditor}
        </section>

        ${detalhes(pacote.id, 'etapas', `Etapas de implantação · ${H.formatar(t.minutosEtapas, { vazio: '0h' })}`, etapasHtml, t.etapas.length)}
        ${detalhes(pacote.id, 'recursos', `Recursos gerais · ${H.formatar(t.minutosRecursos, { vazio: '0h' })}`, recursosHtml, t.recursos.length)}
        ${detalhes(pacote.id, 'funcs', 'Funcionalidades incluídas', (funcsHtml || '<p class="ed-nada">Nenhuma tarefa cadastrada neste pacote.</p>') + botaoEditor, funcs.length)}
        ${detalhes(pacote.id, 'precos', 'Horas por faixa de usuários', precosHtml)}
        ${detalhes(pacote.id, 'historico', 'Alterações no pacote', historicoHtml, pacote.historico?.length || 0)}

      </article>`;
  }

  function comparativoGeral(pacotes) {
    const linhas = pacotes.map((p) => {
      const t = H.totalPacote(p, listaModulos(), cenario.fluxo, cenario.faixa);
      const f = H.fator(p, cenario.fluxo, cenario.faixa);
      return { p, minutos: f == null ? null : t.total };
    });
    const maior = Math.max(1, ...linhas.map((l) => l.minutos || 0));
    return `
      <section class="pc-geral" aria-labelledby="pc-geral-titulo">
        <h3 id="pc-geral-titulo">${svg(I.relogio)}Comparativo de horas por pacote</h3>
        <ul class="pc-geral-lista">
          ${linhas.map(({ p, minutos }) => `<li>
            <a href="#pc-nome-${esc(p.id)}" class="pc-geral-nome" data-rolar="${esc(p.id)}">${esc(p.nome)}</a>
            <span class="pc-geral-trilho" aria-hidden="true">${minutos == null ? '' : `<span class="pc-geral-barra" style="width:${Math.max(1.5, (minutos / maior) * 100)}%"></span>`}</span>
            <strong class="pc-geral-valor">${minutos == null ? 'Só Premium' : H.formatar(minutos, { vazio: '0h' })}</strong>
          </li>`).join('')}
        </ul>
      </section>`;
  }

  function render() {
    renderControles();
    if (H.estado.erro) {
      conteudo.innerHTML = `<div class="pc-estado pc-estado--erro" role="alert"><p>${esc(H.estado.erro)}</p><button type="button" class="ed-btn" data-recarregar>Tentar novamente</button></div>`;
      return;
    }
    if (!H.estado.carregado || !modulosProntos) {
      conteudo.innerHTML = `<div class="pc-grade" aria-busy="true">${Array.from({ length: 4 }, () => '<div class="pc-card pc-esqueleto"><span></span><span></span><span></span></div>').join('')}</div>`;
      return;
    }
    const pacotes = H.estado.pacotes;
    conteudo.innerHTML = `${comparativoGeral(pacotes)}<div class="pc-grade">${pacotes.map(cartao).join('')}</div>`;
  }

  /* ---------- Interações ---------- */
  painel.addEventListener('click', (e) => {
    const fluxo = e.target.closest('[data-fluxo]');
    if (fluxo) { cenario.fluxo = fluxo.dataset.fluxo; salvarCenario(); render(); return; }
    if (e.target.closest('[data-recarregar]')) { H.carregar(); return; }
    const rolar = e.target.closest('[data-rolar]');
    if (rolar) {
      e.preventDefault();
      painel.querySelector(`[data-pacote-card="${CSS.escape(rolar.dataset.rolar)}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const etapa = e.target.closest('[data-editar-etapa]');
    if (etapa && podeEditar) { editarEtapa(etapa); return; }
    const modulo = e.target.closest('[data-editar-modulo]');
    if (modulo && podeEditar) { editarHorasModulo(modulo); return; }
    const conteudoBtn = e.target.closest('[data-editar-conteudo]');
    if (conteudoBtn && podeEditar) window.ffEditorPacote?.abrir(conteudoBtn.dataset.editarConteudo);
  });

  painel.addEventListener('change', (e) => {
    if (e.target.matches('[data-controle="faixa"]')) { cenario.faixa = Number(e.target.value); salvarCenario(); render(); }
  });
  painel.addEventListener('toggle', (e) => {
    if (!e.target.matches?.('[data-detalhe]')) return;
    if (e.target.open) abertos.add(e.target.dataset.detalhe); else abertos.delete(e.target.dataset.detalhe);
  }, true);

  function salvarCenario() {
    try { localStorage.setItem(CHAVE_CENARIO, JSON.stringify(cenario)); } catch { /* sem storage */ }
  }

  function aviso(msg, tipo = 'ok') {
    const caixa = document.querySelector('.ed-toasts');
    if (!caixa) return;
    const el = document.createElement('div');
    el.className = `ed-toast ed-toast--${tipo}`;
    el.textContent = msg;
    caixa.appendChild(el);
    setTimeout(() => { el.classList.add('ed-toast--saindo'); setTimeout(() => el.remove(), 300); }, tipo === 'erro' ? 6000 : 3200);
  }

  function editarEtapa(botao) {
    const pacote = H.estado.pacotes.find((p) => p.id === botao.dataset.pacote);
    const etapa = pacote?.etapas.find((x) => x.id === botao.dataset.editarEtapa);
    if (!etapa) return;
    const celula = document.createElement('form');
    celula.className = 'hr-form';
    celula.noValidate = true;
    celula.innerHTML = `<input class="hr-input" value="${esc(H.formatar(etapa.minutos, { vazio: '0min' }))}" autocomplete="off" aria-label="Nova duração para ${esc(etapa.texto)}"><small class="hr-ajuda">Ex.: 1h30, 45min, 2</small>`;
    botao.replaceWith(celula);
    const input = celula.querySelector('input');
    input.focus();
    input.select();
    let concluido = false;
    const salvar = async () => {
      if (concluido) return;
      const minutos = H.interpretar(input.value);
      if (minutos == null || minutos > 60000) {
        input.setAttribute('aria-invalid', 'true');
        celula.querySelector('.hr-ajuda').textContent = 'Formato inválido. Use 1h30, 45min ou 2.';
        input.focus();
        return;
      }
      concluido = true;
      input.disabled = true;
      try {
        const res = await fetch(`/api/pacotes?id=${encodeURIComponent(pacote.id)}&acao=minutos`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ etapaId: etapa.id, minutos }),
        });
        const dados = await res.json().catch(() => ({}));
        if (res.status === 401) return window.ffIrParaLogin();
        if (!res.ok) throw new Error(dados.erro || 'Não foi possível salvar a duração.');
        H.substituirPacote(dados.pacote);
        aviso(`Duração salva. Total do ${pacote.nome} (${cenario.fluxo} · ${H.estado.faixas[cenario.faixa] || ''}): ${H.formatar(H.totalPacote(dados.pacote, listaModulos(), cenario.fluxo, cenario.faixa).total, { vazio: '0h' })}.`);
      } catch (err) {
        aviso(err.message, 'erro');
        render();
      }
    };
    celula.addEventListener('submit', (e) => { e.preventDefault(); salvar(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); concluido = true; render(); } });
    input.addEventListener('blur', () => { setTimeout(() => { if (!concluido) salvar(); }, 120); });
  }

  function editarHorasModulo(botao) {
    const pacote = H.estado.pacotes.find((p) => p.id === botao.dataset.pacote);
    const moduloId = botao.dataset.editarModulo;
    const nome = listaModulos().find((m) => m.id === moduloId)?.nome || moduloId;
    if (!pacote) return;
    const atual = H.valorModulo(pacote, moduloId, cenario.fluxo, cenario.faixa);
    const proprio = H.temValorProprio(pacote, moduloId, cenario.fluxo, cenario.faixa);
    const cenarioTxt = `${cenario.fluxo} · ${H.estado.faixas[cenario.faixa] || ''}`;
    const celula = document.createElement('form');
    celula.className = 'hr-form pc-modulo-form';
    celula.noValidate = true;
    celula.innerHTML = `<input class="hr-input" value="${esc(H.formatar(atual, { vazio: '0h' }))}" autocomplete="off" aria-label="Horas de ${esc(nome)} no pacote ${esc(pacote.nome)} (${esc(cenarioTxt)})"><small class="hr-ajuda">${proprio ? 'Ex.: 1h30, 45min, 2' : `Só para ${esc(cenarioTxt)}`}</small>`;
    botao.replaceWith(celula);
    const input = celula.querySelector('input');
    input.focus();
    input.select();
    let concluido = false;
    const salvar = async () => {
      if (concluido) return;
      const minutos = H.interpretar(input.value);
      if (minutos == null || minutos > 60000) {
        input.setAttribute('aria-invalid', 'true');
        celula.querySelector('.hr-ajuda').textContent = 'Formato inválido. Use 1h30, 45min ou 2.';
        input.focus();
        return;
      }
      concluido = true;
      input.disabled = true;
      try {
        const res = await fetch(`/api/pacotes?id=${encodeURIComponent(pacote.id)}&acao=modulo`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ moduloId, minutos, fluxo: cenario.fluxo, faixa: cenario.faixa }),
        });
        const dados = await res.json().catch(() => ({}));
        if (res.status === 401) return window.ffIrParaLogin();
        if (!res.ok) throw new Error(dados.erro || 'Não foi possível salvar as horas do módulo.');
        H.substituirPacote(dados.pacote);
        aviso(`${nome} (${cenarioTxt}): ${H.formatar(minutos, { vazio: '0h' })}. Total do ${pacote.nome}: ${H.formatar(H.totalPacote(dados.pacote, listaModulos(), cenario.fluxo, cenario.faixa).total, { vazio: '0h' })}.`);
      } catch (err) {
        aviso(err.message, 'erro');
        render();
      }
    };
    celula.addEventListener('submit', (e) => { e.preventDefault(); salvar(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); concluido = true; render(); } });
    input.addEventListener('blur', () => { setTimeout(() => { if (!concluido) salvar(); }, 120); });
  }
  window.ffPacotesAviso = aviso;
  window.ffPacotesExportacao = {
    obterDados: () => ({
      cenario: { ...cenario },
      faixa: H.estado.faixas[cenario.faixa] || '',
      pacotes: H.estado.pacotes,
      modulos: listaModulos(),
    }),
  };

  /* ---------- Sincronização ---------- */
  // Não re-renderiza enquanto alguém digita uma duração (formulário ativo); após salvar, o campo fica desabilitado.
  const talvezRenderizar = () => { if (!painel.hidden && !painel.querySelector('.hr-form input:not(:disabled)') && !document.querySelector('.pe-dialog[open]')) render(); };
  document.addEventListener('ff:pacotes', talvezRenderizar);
  document.addEventListener('ff:modulos', () => { modulosProntos = true; talvezRenderizar(); });
  document.addEventListener('ff:aba', (e) => { if (e.detail.aba === 'pacotes') render(); });
  if (listaModulos().some((m) => m.checklist?.some((i) => i.minutos))) modulosProntos = true;

  window.ffSessao?.then((usuario) => {
    podeEditar = Boolean(usuario?.permissoes?.includes('editar'));
    talvezRenderizar();
  });
  render();
})();
