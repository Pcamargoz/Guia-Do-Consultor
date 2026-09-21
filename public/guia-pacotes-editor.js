/* Faktory Flow — Editor de módulos e tarefas de um pacote (aba "Pacotes e Horas").
   Horas ficam no MÓDULO (tempo para implantar o módulo inteiro naquele pacote).
   Tarefas (funcionalidades) têm só descrição, prioridade (Alta/Média/Baixa) e nível (Standard/Pro).
   Também permite adicionar/remover módulos do Guia e grupos de tarefas sem módulo no Guia.
   Salva tudo de uma vez em PUT /api/pacotes?id=… (com controle de revisão). */
(() => {
  const H = window.ffHoras;
  if (!H) return;

  const PRIORIDADES = ['Alta', 'Média', 'Baixa'];
  const NIVEIS = ['Standard', 'Pro'];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    cima: '<polyline points="18 15 12 9 6 15"/>',
    baixo: '<polyline points="6 9 12 15 18 9"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    mais: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    lixo: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    relogio: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5"/><path d="M9 2h6"/>',
  };
  const modulosGuia = () => (typeof modulos !== 'undefined' ? modulos : []);
  const nomeModulo = (id) => modulosGuia().find((m) => m.id === id)?.nome || id;
  /** Horas originais da planilha: soma dos itens da checklist do módulo naquele pacote. */
  const horasPlanilha = (moduloId, pacoteId) => (modulosGuia().find((m) => m.id === moduloId)?.checklist || [])
    .reduce((soma, it) => soma + Number(it?.minutos?.[pacoteId] ?? 0), 0);
  const temPlanilha = (pacoteId) => modulosGuia().some((m) => (m.checklist || []).some((it) => it?.minutos?.[pacoteId] != null));
  const campoHoras = (bloco) => bloco.querySelector('.pe-minutos');
  const blocosComHoras = () => [...dialog.querySelectorAll('.pe-bloco')].filter(campoHoras);
  const minutosDoCampo = (campo) => H.interpretar(campo.value);

  let pacote = null, sujo = false, salvando = false, contador = 0;

  const dialog = document.createElement('dialog');
  dialog.className = 'gt-dialog pe-dialog';
  dialog.setAttribute('aria-labelledby', 'pe-titulo');
  document.body.append(dialog);

  /* ---------- Estrutura: blocos (módulo do Guia ou grupo livre) com tarefas ---------- */
  function blocosDoPacote(p) {
    const blocos = [];
    const porModulo = new Map();
    for (const id of p.modulos) {
      const bloco = { moduloId: id, nome: nomeModulo(id), minutos: Number(p.horasModulos?.[id] ?? 0), tarefas: [] };
      porModulo.set(id, bloco);
      blocos.push(bloco);
    }
    const livres = new Map();
    for (const f of p.funcionalidades) {
      let bloco = f.moduloId ? porModulo.get(f.moduloId) : livres.get(f.modulo);
      if (!bloco && f.moduloId) { // tarefa de um módulo que não estava na lista: o módulo entra no pacote
        bloco = { moduloId: f.moduloId, nome: f.modulo, minutos: 0, tarefas: [] };
        porModulo.set(f.moduloId, bloco);
        blocos.push(bloco);
      }
      if (!bloco) { bloco = { moduloId: null, nome: f.modulo, minutos: 0, tarefas: [] }; livres.set(f.modulo, bloco); }
      // Nome do grupo na planilha (ex.: "IA (Alumina)") prevalece sobre o nome do módulo no Guia.
      if (f.moduloId && bloco.tarefas.length === 0) bloco.nome = f.modulo;
      bloco.tarefas.push(f);
    }
    return [...blocos, ...livres.values()];
  }

  const linhaTarefa = (t = {}) => `
    <li class="pe-tarefa" data-id="${esc(t.id || '')}">
      <span class="ed-linha-num" aria-hidden="true"></span>
      <input type="text" class="ed-input pe-descricao" value="${esc(t.funcionalidade || '')}" maxlength="200" placeholder="Descrição da tarefa" aria-label="Descrição da tarefa">
      <select class="ed-input pe-prioridade" aria-label="Prioridade">${PRIORIDADES.map((x) => `<option${(t.complexidade || 'Média') === x ? ' selected' : ''}>${x}</option>`).join('')}</select>
      <select class="ed-input pe-nivel" aria-label="Nível">${NIVEIS.map((x) => `<option${(t.nivel || 'Standard') === x ? ' selected' : ''}>${x}</option>`).join('')}</select>
      <div class="ed-linha-acoes">
        <button type="button" class="ed-icone-btn" data-mover="-1" aria-label="Mover tarefa para cima" title="Mover para cima">${svg(I.cima)}</button>
        <button type="button" class="ed-icone-btn" data-mover="1" aria-label="Mover tarefa para baixo" title="Mover para baixo">${svg(I.baixo)}</button>
        <button type="button" class="ed-icone-btn ed-icone-btn--perigo" data-remover-tarefa aria-label="Remover tarefa" title="Remover tarefa">${svg(I.x)}</button>
      </div>
    </li>`;

  function blocoHtml(b) {
    const chave = `pe-b${++contador}`;
    const guia = Boolean(b.moduloId);
    return `
      <section class="pe-bloco${guia ? '' : ' pe-bloco--livre'}" data-modulo-id="${esc(b.moduloId || '')}" aria-labelledby="${chave}">
        <header class="pe-bloco-topo">
          <div class="pe-bloco-nome">
            ${guia
              ? `<h3 id="${chave}">${esc(nomeModulo(b.moduloId))}</h3><label class="pe-grupo-rotulo">Nome nas tarefas <input type="text" class="ed-input pe-nome" value="${esc(b.nome)}" maxlength="60"></label>`
              : `<label class="pe-grupo-rotulo" id="${chave}">Grupo sem módulo no Guia <input type="text" class="ed-input pe-nome" value="${esc(b.nome)}" maxlength="60" placeholder="Ex.: Integrações" required></label>`}
          </div>
          ${guia ? `<label class="pe-horas">${svg(I.relogio)}<span>Tempo de implantação</span>
            <input type="text" class="ed-input pe-minutos" value="${esc(H.formatar(b.minutos, { vazio: '0h' }))}" autocomplete="off" aria-describedby="pe-ajuda-horas"></label>` : '<span class="pe-sem-horas">Sem horas (grupo livre)</span>'}
          <div class="pe-bloco-acoes">
            <button type="button" class="ed-icone-btn" data-mover-bloco="-1" aria-label="Mover ${guia ? 'módulo' : 'grupo'} para cima" title="Mover para cima">${svg(I.cima)}</button>
            <button type="button" class="ed-icone-btn" data-mover-bloco="1" aria-label="Mover ${guia ? 'módulo' : 'grupo'} para baixo" title="Mover para baixo">${svg(I.baixo)}</button>
            <button type="button" class="ed-icone-btn ed-icone-btn--perigo" data-remover-bloco aria-label="Remover ${guia ? 'módulo' : 'grupo'} do pacote" title="Remover do pacote">${svg(I.lixo)}</button>
          </div>
        </header>
        <ol class="pe-tarefas">${b.tarefas.map(linhaTarefa).join('')}</ol>
        <button type="button" class="ed-btn ed-btn--adicionar pe-add-tarefa" data-add-tarefa>${svg(I.mais)}Adicionar tarefa</button>
      </section>`;
  }

  function opcoesModulos() {
    const presentes = new Set([...dialog.querySelectorAll('.pe-bloco[data-modulo-id]')].map((b) => b.dataset.moduloId).filter(Boolean));
    const livres = modulosGuia().filter((m) => !presentes.has(m.id));
    const select = dialog.querySelector('[data-novo-modulo]');
    select.innerHTML = livres.length
      ? `<option value="">Escolha um módulo do Guia…</option>${livres.map((m) => `<option value="${esc(m.id)}">${esc(m.nome)}</option>`).join('')}`
      : '<option value="">Todos os módulos do Guia já estão no pacote</option>';
    select.disabled = !livres.length;
    dialog.querySelector('[data-add-modulo]').disabled = !livres.length;
  }

  function somaModulos() {
    let minutos = 0, invalidas = 0;
    for (const b of dialog.querySelectorAll('.pe-bloco')) {
      const campo = campoHoras(b);
      if (!campo) continue;
      const v = minutosDoCampo(campo);
      if (v == null) invalidas += 1; else minutos += v;
    }
    return { minutos, invalidas };
  }

  /** Mesma conta do card: módulos + etapas + recursos, comparada à tabela de preços (base Premium). */
  function atualizarResumo() {
    const blocos = [...dialog.querySelectorAll('.pe-bloco')];
    const { minutos, invalidas } = somaModulos();
    const tarefas = dialog.querySelectorAll('.pe-tarefa').length;
    const modulosNoPacote = blocos.filter((b) => b.dataset.moduloId).length;
    const t = H.totalPacote(pacote, modulosGuia());
    const fixas = t.minutosEtapas + t.minutosRecursos;
    const total = minutos + fixas;
    const tabela = (pacote.precos.Premium?.[0] ?? 0) * 60;
    const diferenca = total - tabela;
    const comparativo = !tabela ? ''
      : !diferenca ? '<span class="pe-igual">igual à tabela de preços</span>'
        : `<span class="pe-alerta">${H.formatar(Math.abs(diferenca))} ${diferenca > 0 ? 'acima' : 'abaixo'} da tabela (${H.formatar(tabela)})</span>`;
    dialog.querySelector('[data-resumo]').innerHTML = `<span><strong>${modulosNoPacote}</strong> módulo(s) · <strong>${tarefas}</strong> tarefa(s)</span>
      <span>módulos <strong>${H.formatar(minutos, { vazio: '0h' })}</strong> + etapas e recursos <strong>${H.formatar(fixas, { vazio: '0h' })}</strong> = total <strong>${H.formatar(total, { vazio: '0h' })}</strong> · ${comparativo}${invalidas ? ` <span class="pe-alerta">(${invalidas} hora(s) inválida(s))</span>` : ''}</span>`;
    const ajustar = dialog.querySelector('[data-ajustar-tabela]');
    if (ajustar) ajustar.disabled = !tabela || !diferenca || invalidas > 0 || !modulosNoPacote;
    blocos.forEach((b) => b.querySelectorAll('.pe-tarefa').forEach((l, i) => { l.querySelector('.ed-linha-num').textContent = i + 1; }));
    opcoesModulos();
  }

  function abrir(pacoteId) {
    pacote = H.estado.pacotes.find((p) => p.id === pacoteId);
    if (!pacote) return;
    sujo = false;
    dialog.innerHTML = `
      <div class="gt-cabecalho">
        <div><h2 id="pe-titulo">Módulos e tarefas</h2><p>Pacote ${esc(pacote.nome)} · horas na base Premium, até 5 usuários</p></div>
        <button type="button" class="gt-fechar" data-fechar aria-label="Fechar">×</button>
      </div>
      <form class="pe-form" novalidate>
        <div class="gt-campos pe-corpo">
          <p class="pe-explica">As <strong>horas</strong> são do módulo inteiro (quanto tempo leva para implantá-lo neste pacote). As <strong>tarefas</strong> não têm horas: só descrição, prioridade e nível.</p>
          <p id="pe-ajuda-horas" class="ed-sr">Formatos aceitos: 1h30, 45min, 2 (horas).</p>
          <div class="pe-blocos">${blocosDoPacote(pacote).map(blocoHtml).join('')}</div>
          <div class="pe-adicionar">
            <label class="pe-add-modulo"><span>Adicionar módulo do Guia</span>
              <span class="pe-add-linha"><select class="ed-input" data-novo-modulo></select>
              <button type="button" class="ed-btn" data-add-modulo>${svg(I.mais)}Adicionar</button></span></label>
            <button type="button" class="ed-btn" data-add-grupo>${svg(I.mais)}Novo grupo sem módulo no Guia</button>
          </div>
          <div class="pe-ferramentas">
            <span class="pe-ferramentas-titulo">Horas dos módulos</span>
            <div class="pe-ferramentas-acoes">
              <button type="button" class="ed-btn" data-ajustar-tabela title="Distribui proporcionalmente entre os módulos até o total do pacote bater com a tabela de preços">${svg(I.relogio)}Ajustar para bater com a tabela</button>
              ${temPlanilha(pacote.id) ? `<button type="button" class="ed-btn" data-restaurar-planilha title="Volta às horas originais da planilha de distribuição de horas">${svg(I.relogio)}Restaurar horas da planilha</button>` : ''}
            </div>
            <p class="pe-ferramentas-dica">Os valores entram nos campos acima; confira e clique em <strong>Salvar pacote</strong>.</p>
          </div>
        </div>
        <p class="gt-erro" role="alert" hidden></p>
        <div class="gt-rodape pe-rodape">
          <span class="pe-resumo" data-resumo aria-live="polite"></span>
          <button type="button" class="ed-btn" data-fechar>Cancelar</button>
          <button type="submit" class="ed-btn ed-btn--primario">Salvar pacote</button>
        </div>
      </form>`;
    atualizarResumo();
    dialog.showModal();
    dialog.querySelector('.pe-minutos, .pe-descricao')?.focus();
  }

  function fechar(forcar = false) {
    if (salvando) return;
    if (!forcar && sujo && !confirm('Descartar as alterações não salvas deste pacote?')) return;
    dialog.close();
    pacote = null;
  }

  function adicionarTarefa(bloco, depoisDe) {
    const tmp = document.createElement('template');
    tmp.innerHTML = linhaTarefa().trim();
    const nova = tmp.content.firstElementChild;
    depoisDe ? depoisDe.after(nova) : bloco.querySelector('.pe-tarefas').append(nova);
    sujo = true;
    atualizarResumo();
    nova.querySelector('.pe-descricao').focus();
  }

  function adicionarBloco(b) {
    const tmp = document.createElement('template');
    tmp.innerHTML = blocoHtml(b).trim();
    const novo = tmp.content.firstElementChild;
    dialog.querySelector('.pe-blocos').append(novo);
    sujo = true;
    atualizarResumo();
    novo.scrollIntoView({ block: 'nearest' });
    (novo.querySelector('.pe-minutos') || novo.querySelector('.pe-nome')).focus();
  }

  dialog.addEventListener('input', () => { sujo = true; atualizarResumo(); });
  dialog.addEventListener('change', () => { sujo = true; });
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); fechar(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('.pe-descricao')) { e.preventDefault(); adicionarTarefa(e.target.closest('.pe-bloco'), e.target.closest('.pe-tarefa')); }
  });
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-fechar]')) { fechar(); return; }
    const bloco = e.target.closest('.pe-bloco');
    if (e.target.closest('[data-add-tarefa]')) { adicionarTarefa(bloco); return; }
    const tarefa = e.target.closest('.pe-tarefa');
    if (e.target.closest('[data-remover-tarefa]')) { tarefa.remove(); sujo = true; atualizarResumo(); return; }
    const mover = e.target.closest('[data-mover]');
    if (mover) {
      const irmao = mover.dataset.mover === '-1' ? tarefa.previousElementSibling : tarefa.nextElementSibling;
      if (irmao) { mover.dataset.mover === '-1' ? irmao.before(tarefa) : irmao.after(tarefa); sujo = true; atualizarResumo(); mover.focus(); }
      return;
    }
    const moverBloco = e.target.closest('[data-mover-bloco]');
    if (moverBloco) {
      const irmao = moverBloco.dataset.moverBloco === '-1' ? bloco.previousElementSibling : bloco.nextElementSibling;
      if (irmao) { moverBloco.dataset.moverBloco === '-1' ? irmao.before(bloco) : irmao.after(bloco); sujo = true; moverBloco.focus(); }
      return;
    }
    if (e.target.closest('[data-remover-bloco]')) {
      const n = bloco.querySelectorAll('.pe-tarefa').length;
      const nome = bloco.querySelector('h3')?.textContent || bloco.querySelector('.pe-nome')?.value || 'grupo';
      if (n && !confirm(`Remover “${nome}” do pacote junto com ${n} tarefa(s)?`)) return;
      bloco.remove(); sujo = true; atualizarResumo();
      return;
    }
    if (e.target.closest('[data-add-modulo]')) {
      const select = dialog.querySelector('[data-novo-modulo]');
      if (!select.value) { select.focus(); return; }
      adicionarBloco({ moduloId: select.value, nome: nomeModulo(select.value), minutos: 0, tarefas: [] });
      return;
    }
    if (e.target.closest('[data-add-grupo]')) { adicionarBloco({ moduloId: null, nome: '', minutos: 0, tarefas: [] }); return; }
    if (e.target.closest('[data-restaurar-planilha]')) {
      for (const b of blocosComHoras()) {
        const campo = campoHoras(b);
        if (campo) campo.value = H.formatar(horasPlanilha(b.dataset.moduloId, pacote.id), { vazio: '0h' });
      }
      sujo = true;
      atualizarResumo();
      return;
    }
    if (e.target.closest('[data-ajustar-tabela]')) ajustarParaTabela();
  });

  /** Distribui a diferença entre os módulos até total (módulos + etapas + recursos) = tabela de preços. */
  function ajustarParaTabela() {
    const blocos = blocosComHoras();
    if (!blocos.length) return;
    const erro = dialog.querySelector('.gt-erro');
    const t = H.totalPacote(pacote, modulosGuia());
    const alvo = (pacote.precos.Premium?.[0] ?? 0) * 60 - (t.minutosEtapas + t.minutosRecursos);
    if (alvo < 0) {
      erro.textContent = 'As etapas e os recursos sozinhos já passam do total da tabela; ajuste-os antes no card do pacote.';
      erro.hidden = false;
      return;
    }
    const atuais = blocos.map((b) => minutosDoCampo(campoHoras(b)) ?? 0);
    const soma = atuais.reduce((a, b) => a + b, 0);
    // Com horas: mantém a proporção entre os módulos. Sem horas ainda: divide por igual.
    const brutos = atuais.map((v) => (soma ? (v * alvo) / soma : alvo / blocos.length));
    // Arredonda de 5 em 5 minutos e joga a sobra no maior módulo, para o total fechar exatamente.
    const valores = brutos.map((v) => Math.max(0, Math.round(v / 5) * 5));
    const resto = alvo - valores.reduce((a, b) => a + b, 0);
    if (resto) {
      const i = valores.indexOf(Math.max(...valores));
      valores[i] = Math.max(0, valores[i] + resto);
    }
    blocos.forEach((b, i) => { campoHoras(b).value = H.formatar(valores[i], { vazio: '0h' }); });
    erro.hidden = true;
    sujo = true;
    atualizarResumo();
  }

  dialog.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!pacote || salvando) return;
    const erro = dialog.querySelector('.gt-erro');
    const falhar = (msg, campo) => { erro.textContent = msg; erro.hidden = false; campo?.focus(); campo?.setAttribute('aria-invalid', 'true'); };
    dialog.querySelectorAll('[aria-invalid]').forEach((c) => c.removeAttribute('aria-invalid'));
    erro.hidden = true;

    const modulosPayload = [];
    const funcionalidades = [];
    const nomesLivres = new Set();
    for (const bloco of dialog.querySelectorAll('.pe-bloco')) {
      const moduloId = bloco.dataset.moduloId || null;
      const nomeCampo = bloco.querySelector('.pe-nome');
      const nome = nomeCampo.value.trim() || (moduloId ? nomeModulo(moduloId) : '');
      if (!nome) return falhar('Dê um nome ao grupo de tarefas sem módulo no Guia.', nomeCampo);
      if (moduloId) {
        const campo = bloco.querySelector('.pe-minutos');
        const minutos = H.interpretar(campo.value);
        if (minutos == null || minutos > 60000) return falhar(`Horas inválidas em ${nomeModulo(moduloId)}. Use 1h30, 45min ou 2.`, campo);
        modulosPayload.push({ moduloId, minutos });
      } else {
        if (nomesLivres.has(nome.toLowerCase())) return falhar(`Já existe um grupo chamado “${nome}”.`, nomeCampo);
        nomesLivres.add(nome.toLowerCase());
      }
      for (const linha of bloco.querySelectorAll('.pe-tarefa')) {
        const descricao = linha.querySelector('.pe-descricao').value.trim();
        if (!descricao) continue; // tarefas vazias são descartadas
        funcionalidades.push({
          id: linha.dataset.id || undefined, modulo: nome, moduloId, funcionalidade: descricao,
          complexidade: linha.querySelector('.pe-prioridade').value, nivel: linha.querySelector('.pe-nivel').value,
        });
      }
    }

    salvando = true;
    const botao = dialog.querySelector('[type="submit"]');
    botao.disabled = true;
    botao.classList.add('ed-btn--carregando');
    try {
      const res = await fetch(`/api/pacotes?id=${encodeURIComponent(pacote.id)}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rev: pacote.rev, modulos: modulosPayload, funcionalidades }),
      });
      const dados = await res.json().catch(() => ({}));
      if (res.status === 401) { window.ffIrParaLogin?.(); return; }
      if (!res.ok) {
        if (res.status === 409) await H.carregar();
        throw new Error(dados.erro || 'Não foi possível salvar o pacote.');
      }
      salvando = false;
      sujo = false;
      fechar(true);
      H.substituirPacote(dados.pacote);
      window.ffPacotesAviso?.(`Pacote ${dados.pacote.nome} salvo. Total previsto: ${H.formatar(H.totalPacote(dados.pacote, modulosGuia()).total, { vazio: '0h' })}.`);
    } catch (err) {
      falhar(err.message);
    } finally {
      salvando = false;
      botao.disabled = false;
      botao.classList.remove('ed-btn--carregando');
    }
  });

  window.ffEditorPacote = { abrir };
})();
