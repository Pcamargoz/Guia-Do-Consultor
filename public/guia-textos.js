/* Edição dos textos fixos do Guia. O conteúdo original do HTML é a versão de leitura e restauração. */
(() => {
  const IDs = ['dashboard', 'parte1', 'metodo', 'modulos', 'processos', 'diagnostico', 'conclusao'];
  const campos = [];
  const grupos = new Map();
  const secoes = new Map();
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  let dados = {}, rev = 1, online = false, podeEditar = false, aberto = null, salvando = false;

  function grupo(id, titulo, secao, container, seletor) {
    const elementos = [...container.querySelectorAll(seletor)].filter((el) => !el.closest('.fluxo-mapa') && el.textContent.trim());
    if (!elementos.length) return;
    const itens = elementos.map((el, indice) => {
      const campo = { chave: `${secao}/${id}-${indice + 1}`, el, original: el.textContent.replace(/\s+/g, ' ').trim(), html: el.innerHTML, grupo: id };
      campos.push(campo);
      return campo;
    });
    grupos.set(`${secao}/${id}`, { titulo, secao, itens });
  }

  for (const id of IDs) {
    const secao = document.getElementById(id);
    if (!secao) continue;
    secoes.set(id, secao);
    const cabecalho = secao.querySelector(':scope > .header');
    if (cabecalho) grupo('cabecalho', 'Título e apresentação', id, cabecalho, 'h2, p');
    if (id === 'dashboard') grupo('indicadores', 'Rótulos dos indicadores', id, secao, '.metrica .rotulo');
    if (id === 'parte1') {
      [...secao.querySelectorAll(':scope > .accordion')].forEach((card, indice) => {
        grupo(`card-${indice + 1}`, card.querySelector('.accordion-header > span:first-child')?.textContent.trim() || `Card ${indice + 1}`, id, card, '.accordion-header > span:first-child, .accordion-body-inner p, .accordion-body-inner h4, .accordion-body-inner li, .accordion-body-inner td, .accordion-body-inner th, .accordion-body-inner .alerta > span:last-child');
      });
    }
    if (id === 'metodo') continue;
    if (id === 'modulos') grupo('orientacoes', 'Orientações sobre módulos', id, secao, ':scope > .alerta > span:last-child');
    if (id === 'diagnostico' || id === 'conclusao') {
      [...secao.querySelectorAll(':scope > .processo-card, :scope > div > .processo-card')].forEach((card, indice) => {
        grupo(`card-${indice + 1}`, card.querySelector('h4')?.textContent.trim() || `Card ${indice + 1}`, id, card, 'h4, .descricao, .diagnostico-content h5, .diagnostico-content li, .diagnostico-content p, .diagnostico-content td, .diagnostico-content th, .alerta > span:last-child');
      });
      const aviso = secao.querySelector(':scope > .alerta > span:last-child');
      if (aviso) grupo('aviso', 'Aviso final', id, aviso.parentElement, ':scope > span:last-child');
    }
  }

  // Compartilha o registro com o editor de fluxos (guia-fluxos.js): mesmos dados e mesma revisão.
  const avisar = () => document.dispatchEvent(new CustomEvent('ff:guia-textos', { detail: { dados, rev, online, podeEditar } }));
  document.addEventListener('ff:guia-textos-salvo', (e) => { dados = e.detail.dados; rev = e.detail.rev; aplicar(); });

  function aplicar() {
    for (const campo of campos) {
      const valor = dados[campo.chave];
      if (typeof valor === 'string') campo.el.textContent = valor;
      else campo.el.innerHTML = campo.html;
    }
  }

  const dialog = document.createElement('dialog');
  dialog.className = 'gt-dialog';
  dialog.setAttribute('aria-label', 'Editar textos do Guia');
  document.body.append(dialog);

  function controles() {
    document.querySelectorAll('.gt-editar').forEach((b) => b.remove());
    if (!online || !podeEditar) return;
    for (const [id, secao] of secoes) {
      const header = secao.querySelector(':scope > .header');
      if (!header) continue;
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'gt-editar gt-editar-secao';
      botao.textContent = 'Editar textos';
      botao.setAttribute('aria-label', `Editar textos de ${header.querySelector('h2')?.textContent || id}`);
      botao.onclick = () => abrir(id);
      header.append(botao);
      if (id === 'parte1') {
        [...secao.querySelectorAll(':scope > .accordion')].forEach((card, indice) => {
          const alvo = card.querySelector('.accordion-header');
          if (!alvo) return;
          const editar = document.createElement('button');
          editar.type = 'button';
          editar.className = 'gt-editar gt-editar-card';
          editar.textContent = 'Editar';
          editar.setAttribute('aria-label', `Editar texto de ${alvo.querySelector('span')?.textContent || 'card'}`);
          editar.onclick = (e) => { e.stopPropagation(); abrir(id, `card-${indice + 1}`); };
          alvo.insertBefore(editar, alvo.querySelector('.seta'));
        });
      }
      if (id === 'diagnostico' || id === 'conclusao') {
        [...secao.querySelectorAll(':scope > .processo-card, :scope > div > .processo-card')].forEach((card, indice) => {
          const editar = document.createElement('button');
          editar.type = 'button';
          editar.className = 'gt-editar gt-editar-bloco';
          editar.textContent = 'Editar';
          editar.setAttribute('aria-label', `Editar texto de ${card.querySelector('h4')?.textContent || 'card'}`);
          editar.onclick = () => abrir(id, `card-${indice + 1}`);
          card.prepend(editar);
        });
      }
    }
  }

  function abrir(secao, grupoId = null) {
    if (!online || !podeEditar) return;
    const selecionados = grupoId ? [grupos.get(`${secao}/${grupoId}`)].filter(Boolean) : [...grupos.values()].filter((g) => g.secao === secao);
    if (!selecionados.length) return;
    aberto = { secao, selecionados };
    const titulo = secoes.get(secao)?.querySelector(':scope > .header h2')?.textContent || 'Guia';
    dialog.innerHTML = `<div class="gt-cabecalho"><div><h2>Editar textos</h2><p>${esc(titulo)}</p></div><button type="button" class="gt-fechar" data-fechar aria-label="Fechar">×</button></div><form id="gt-form"><div class="gt-campos">${selecionados.map((g) => `<fieldset><legend>${esc(g.titulo)}</legend>${g.itens.map((c, i) => `<div class="gt-campo"><label for="gt-${esc(c.chave.replace(/\W/g, '-'))}">${c.el.matches('h2, h4, h5, .accordion-header > span:first-child') ? 'Título' : c.el.matches('th') ? 'Cabeçalho da tabela' : `Texto ${i + 1}`}</label><textarea id="gt-${esc(c.chave.replace(/\W/g, '-'))}" data-chave="${esc(c.chave)}" maxlength="5000" rows="${Math.min(6, Math.max(2, Math.ceil((dados[c.chave] || c.original).length / 90)))}">${esc(dados[c.chave] ?? c.original)}</textarea><button type="button" class="gt-restaurar" data-restaurar="${esc(c.chave)}">Restaurar original</button></div>`).join('')}</fieldset>`).join('')}</div><p class="gt-erro" role="alert" hidden></p><div class="gt-rodape"><button type="button" class="ed-btn" data-fechar>Cancelar</button><button type="submit" class="ed-btn ed-btn--primario">Salvar alterações</button></div></form>`;
    dialog.showModal();
  }
  function fechar() { if (salvando) return; dialog.close(); aberto = null; }
  dialog.addEventListener('click', (e) => {
    if (e.target.closest('[data-fechar]')) { fechar(); return; }
    const restaurar = e.target.closest('[data-restaurar]');
    if (restaurar) {
      const campo = campos.find((c) => c.chave === restaurar.dataset.restaurar);
      dialog.querySelector(`[data-chave="${restaurar.dataset.restaurar}"]`).value = campo.original;
    }
  });
  dialog.addEventListener('cancel', (e) => { if (salvando) e.preventDefault(); else aberto = null; });
  dialog.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!aberto || salvando || !online || !podeEditar) return;
    const alteracoes = {}, erro = dialog.querySelector('.gt-erro');
    for (const textarea of dialog.querySelectorAll('[data-chave]')) {
      const campo = campos.find((c) => c.chave === textarea.dataset.chave);
      const valor = textarea.value.trim();
      if (!valor) { erro.textContent = 'Preencha todos os textos antes de salvar.'; erro.hidden = false; textarea.focus(); return; }
      if (valor !== (dados[campo.chave] ?? campo.original)) alteracoes[campo.chave] = valor === campo.original ? null : valor;
    }
    if (!Object.keys(alteracoes).length) { fechar(); return; }
    salvando = true;
    dialog.querySelector('[type="submit"]').disabled = true;
    try {
      const res = await fetch('/api/guia-textos', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rev, alteracoes }) });
      const json = await res.json();
      if (!res.ok) throw Object.assign(new Error(json.erro || 'Não foi possível salvar os textos.'), { status: res.status });
      dados = json.dados;
      rev = json.rev;
      aplicar();
      avisar();
      fecharDepois();
    } catch (err) {
      erro.textContent = err.message;
      erro.hidden = false;
      if (err.status === 409) await carregar();
      if (err.status === 401) window.ffIrParaLogin?.();
    } finally { salvando = false; dialog.querySelector('[type="submit"]')?.removeAttribute('disabled'); }
  });
  function fecharDepois() { dialog.close(); aberto = null; }

  async function carregar() {
    try {
      const res = await fetch('/api/guia-textos', { cache: 'no-store' });
      if (res.status === 401) return window.ffIrParaLogin?.();
      if (!res.ok) throw new Error('Servidor indisponível.');
      const json = await res.json();
      dados = json.dados || {};
      rev = json.rev || 1;
      online = true;
      aplicar();
    } catch { online = false; }
    controles();
    avisar();
  }

  window.ffSessao?.then((usuario) => {
    podeEditar = Boolean(usuario?.permissoes?.includes('editar'));
    if (usuario) carregar();
  });
  setInterval(() => { if (document.visibilityState === 'visible' && !dialog.open) carregar(); }, 45000);
})();
