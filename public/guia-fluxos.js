/* Faktory Flow — Edição dos fluxos (mapas) fixos do Guia: Condução do Projeto, Metodologia da
   Implantação e Metodologia de Análise. O HTML original é a versão de leitura e de restauração;
   as edições ficam no mesmo registro de /api/guia-textos, em chaves "secao/fluxo-N" (JSON).
   Os dados e a revisão chegam de guia-textos.js pelo evento "ff:guia-textos". */
(() => {
  const SECOES = ['parte1', 'metodo', 'diagnostico'];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const limpo = (t) => String(t || '').replace(/\s+/g, ' ').trim();
  let dados = {}, rev = 1, online = false, podeEditar = false, aberto = null, salvando = false;

  /* ---------- Leitura dos fluxos originais do HTML ---------- */
  const fluxos = [];
  for (const id of SECOES) {
    const secao = document.getElementById(id);
    if (!secao) continue;
    secao.querySelectorAll('.fluxo-mapa[onclick]').forEach((el, i) => {
      const m = (el.getAttribute('onclick') || '').match(/abrirFluxo\('([^']*)',\s*'([^']*)',\s*\[([^\]]*)\]\)/);
      if (!m) return;
      const etapas = [...m[3].matchAll(/'([^']*)'/g)].map((x) => x[1]);
      const simples = !el.querySelector('.mapa-raiz');
      const primeiraLinha = el.querySelector('.mapa-linha');
      const original = {
        titulo: m[1], descricao: m[2], etapas,
        ...(simples ? {} : { raiz: limpo(el.querySelector('.mapa-raiz')?.textContent), ramo: limpo(el.querySelector('.mapa-ramo')?.textContent) }),
      };
      fluxos.push({
        chave: `${id}/fluxo-${i + 1}`, el, original, simples, html: el.innerHTML,
        // Mantém o visual original: numeração e quantidade de etapas por linha no mapa simples.
        numerado: simples && /^\d+\.\s/.test(limpo(el.querySelector('.mapa-etapa')?.textContent)),
        porLinha: simples ? Math.max(2, primeiraLinha?.querySelectorAll('.mapa-etapa').length || 6) : 0,
      });
      el.removeAttribute('onclick');
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
    });
  }
  if (!fluxos.length) return;

  const atual = (f) => {
    try { return dados[f.chave] ? { ...f.original, ...JSON.parse(dados[f.chave]) } : f.original; } catch { return f.original; }
  };

  /* ---------- Desenho do mapa ---------- */
  function desenhar(f) {
    const editado = Boolean(dados[f.chave]);
    if (!editado) f.el.innerHTML = f.html;
    else {
      const d = atual(f);
      const hint = '<span class="fluxo-mapa-hint">Clique para detalhes</span>';
      if (f.simples) {
        const linhas = [];
        for (let i = 0; i < d.etapas.length; i += f.porLinha) linhas.push(d.etapas.slice(i, i + f.porLinha).map((t, j) => ({ t, n: i + j })));
        f.el.innerHTML = `${hint}<div class="mapa-simples">${linhas.map((linha) => `<div class="mapa-linha">${linha.map(({ t, n }, j) =>
          `${j ? '<span class="mapa-conector-h"></span>' : ''}<span class="mapa-etapa${n === d.etapas.length - 1 ? ' destaque' : ''}">${f.numerado ? `${n + 1}. ` : ''}${esc(t)}</span>`).join('')}</div>`).join('')}</div>`;
      } else {
        f.el.innerHTML = `${hint}<div class="mapa"><div class="mapa-raiz">${esc(d.raiz)}</div><div class="mapa-ramos"><div class="mapa-ramos-conector"></div><div class="mapa-ramo">${esc(d.ramo)}</div></div><div class="mapa-folhas">${d.etapas.map((t, n) => `<div class="mapa-folha${n === d.etapas.length - 1 ? ' destaque' : ''}">${esc(t)}</div>`).join('')}</div></div>`;
      }
    }
    f.el.setAttribute('aria-label', `${atual(f).titulo}: ver detalhes do fluxo`);
    if (online && podeEditar) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'gf-editar';
      botao.dataset.editarFluxo = f.chave;
      botao.innerHTML = `${svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>')}<span>Editar fluxo</span>`;
      botao.setAttribute('aria-label', `Editar fluxo ${atual(f).titulo}`);
      f.el.prepend(botao);
    }
  }
  const desenharTodos = () => fluxos.forEach(desenhar);

  for (const f of fluxos) {
    f.el.addEventListener('click', (e) => {
      if (e.target.closest('[data-editar-fluxo]')) { e.stopPropagation(); abrir(f); return; }
      const d = atual(f);
      window.abrirFluxo?.(d.titulo, d.descricao, d.etapas);
    });
    f.el.addEventListener('keydown', (e) => {
      if (e.target !== f.el || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      f.el.click();
    });
  }

  /* ---------- Editor ---------- */
  const dialog = document.createElement('dialog');
  dialog.className = 'gt-dialog gf-dialog';
  dialog.setAttribute('aria-label', 'Editar fluxo');
  document.body.append(dialog);

  const linha = (texto = '') => `<li class="ed-linha">
      <span class="ed-linha-num" aria-hidden="true"></span>
      <input type="text" class="ed-input" value="${esc(texto)}" maxlength="120" aria-label="Texto da etapa" placeholder="Descreva a etapa">
      <div class="ed-linha-acoes">
        <button type="button" class="ed-icone-btn" data-mover="-1" aria-label="Mover para cima" title="Mover para cima">${svg('<polyline points="18 15 12 9 6 15"/>')}</button>
        <button type="button" class="ed-icone-btn" data-mover="1" aria-label="Mover para baixo" title="Mover para baixo">${svg('<polyline points="6 9 12 15 18 9"/>')}</button>
        <button type="button" class="ed-icone-btn ed-icone-btn--perigo" data-remover aria-label="Remover etapa" title="Remover">${svg('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')}</button>
      </div>
    </li>`;

  function renumerar() {
    const linhas = dialog.querySelectorAll('.ed-linha');
    linhas.forEach((l, i) => { l.querySelector('.ed-linha-num').textContent = i + 1; });
    const conta = dialog.querySelector('[data-conta-etapas]');
    if (conta) conta.textContent = linhas.length;
  }

  function preencher(d) {
    const form = dialog.querySelector('form');
    form.elements.titulo.value = d.titulo || '';
    form.elements.descricao.value = d.descricao || '';
    if (form.elements.raiz) form.elements.raiz.value = d.raiz || '';
    if (form.elements.ramo) form.elements.ramo.value = d.ramo || '';
    dialog.querySelector('.ed-linhas').innerHTML = d.etapas.map((t) => linha(t)).join('');
    renumerar();
  }

  function abrir(f) {
    if (!online || !podeEditar) return;
    aberto = f;
    const d = atual(f);
    dialog.innerHTML = `
      <div class="gt-cabecalho"><div><h2>Editar fluxo</h2><p>${esc(d.titulo)}</p></div><button type="button" class="gt-fechar" data-fechar aria-label="Fechar">×</button></div>
      <form class="gf-form" novalidate>
        <div class="gt-campos">
          <fieldset><legend>Resumo (janela “Clique para detalhes”)</legend>
            <div class="gt-campo"><label for="gf-titulo">Título</label><input id="gf-titulo" name="titulo" class="ed-input" maxlength="150" required></div>
            <div class="gt-campo"><label for="gf-descricao">Descrição</label><textarea id="gf-descricao" name="descricao" class="ed-input" rows="3" maxlength="1000"></textarea></div>
          </fieldset>
          ${f.simples ? '' : `<fieldset><legend>Mapa</legend>
            <div class="gt-campo"><label for="gf-raiz">Texto central</label><input id="gf-raiz" name="raiz" class="ed-input" maxlength="80"></div>
            <div class="gt-campo"><label for="gf-ramo">Rótulo do ramo</label><input id="gf-ramo" name="ramo" class="ed-input" maxlength="80"></div>
          </fieldset>`}
          <fieldset class="ed-lista-edit"><legend>Etapas <span class="ed-conta" data-conta-etapas>0</span></legend>
            <ol class="ed-linhas"></ol>
            <button type="button" class="ed-btn ed-btn--adicionar" data-adicionar>${svg('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>')}Adicionar etapa</button>
            <p class="ed-dica">A última etapa aparece em destaque. Enter adiciona uma etapa logo abaixo; etapas vazias são descartadas.${f.numerado ? ' A numeração é automática.' : ''}</p>
          </fieldset>
        </div>
        <p class="gt-erro" role="alert" hidden></p>
        <div class="gt-rodape">
          ${dados[f.chave] ? '<button type="button" class="ed-btn gf-restaurar" data-restaurar>Restaurar original</button>' : ''}
          <button type="button" class="ed-btn" data-fechar>Cancelar</button>
          <button type="submit" class="ed-btn ed-btn--primario">Salvar fluxo</button>
        </div>
      </form>`;
    preencher(d);
    dialog.showModal();
    dialog.querySelector('#gf-titulo').focus();
  }

  function adicionar(depoisDe) {
    const tmp = document.createElement('template');
    tmp.innerHTML = linha().trim();
    const nova = tmp.content.firstElementChild;
    depoisDe ? depoisDe.after(nova) : dialog.querySelector('.ed-linhas').append(nova);
    renumerar();
    nova.querySelector('input').focus();
  }

  function fechar() { if (salvando) return; dialog.close(); aberto = null; }

  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-fechar]')) { fechar(); return; }
    if (e.target.closest('[data-adicionar]')) { adicionar(); return; }
    if (e.target.closest('[data-restaurar]')) { salvar(null); return; }
    const l = e.target.closest('.ed-linha');
    if (e.target.closest('[data-remover]')) { l.remove(); renumerar(); return; }
    const mover = e.target.closest('[data-mover]');
    if (mover) {
      const irmao = mover.dataset.mover === '-1' ? l.previousElementSibling : l.nextElementSibling;
      if (irmao) { mover.dataset.mover === '-1' ? irmao.before(l) : irmao.after(l); mover.focus(); renumerar(); }
    }
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('.ed-linha .ed-input')) { e.preventDefault(); adicionar(e.target.closest('.ed-linha')); }
  });
  dialog.addEventListener('cancel', (e) => { if (salvando) e.preventDefault(); else aberto = null; });
  dialog.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = dialog.querySelector('form');
    const erro = dialog.querySelector('.gt-erro');
    const d = {
      titulo: form.elements.titulo.value.trim(),
      descricao: form.elements.descricao.value.trim(),
      ...(aberto.simples ? {} : { raiz: form.elements.raiz.value.trim(), ramo: form.elements.ramo.value.trim() }),
      etapas: [...dialog.querySelectorAll('.ed-linha input')].map((i) => i.value.trim()).filter(Boolean),
    };
    const falha = !d.titulo ? ['Informe o título do fluxo.', form.elements.titulo]
      : d.etapas.length < 2 ? ['O fluxo precisa de pelo menos duas etapas.', dialog.querySelector('[data-adicionar]')]
        : d.etapas.length > 20 ? ['Use no máximo 20 etapas.', null] : null;
    if (falha) { erro.textContent = falha[0]; erro.hidden = false; falha[1]?.focus(); return; }
    // Igual ao original: remove a edição (volta ao conteúdo do HTML).
    salvar(JSON.stringify(d) === JSON.stringify(aberto.original) ? null : JSON.stringify(d));
  });

  async function salvar(valor) {
    const f = aberto;
    if (!f || salvando) return;
    if ((dados[f.chave] ?? null) === valor) { fechar(); return; }
    const erro = dialog.querySelector('.gt-erro');
    salvando = true;
    dialog.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    try {
      const res = await fetch('/api/guia-textos', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rev, alteracoes: { [f.chave]: valor } }) });
      const json = await res.json().catch(() => ({}));
      if (res.status === 401) { window.ffIrParaLogin?.(); return; }
      if (!res.ok) throw Object.assign(new Error(json.erro || 'Não foi possível salvar o fluxo.'), { status: res.status });
      dados = json.dados; rev = json.rev;
      document.dispatchEvent(new CustomEvent('ff:guia-textos-salvo', { detail: { dados, rev } }));
      desenhar(f);
      salvando = false;
      fechar();
    } catch (err) {
      erro.textContent = err.status === 409 ? `${err.message} Recarregamos a versão atual; revise e salve novamente.` : err.message;
      erro.hidden = false;
      if (err.status === 409) await recarregar();
    } finally {
      salvando = false;
      dialog.querySelectorAll('button').forEach((b) => { b.disabled = false; });
    }
  }

  async function recarregar() {
    try {
      const res = await fetch('/api/guia-textos', { cache: 'no-store' });
      if (!res.ok) return;
      const json = await res.json();
      dados = json.dados || {}; rev = json.rev || 1;
      document.dispatchEvent(new CustomEvent('ff:guia-textos-salvo', { detail: { dados, rev } }));
      desenharTodos();
      if (aberto && dialog.open) preencher(atual(aberto));
    } catch { /* mantém o que está na tela */ }
  }

  document.addEventListener('ff:guia-textos', (e) => {
    ({ dados, rev, online, podeEditar } = e.detail);
    if (!dialog.open) desenharTodos();
  });
})();
