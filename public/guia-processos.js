/* Biblioteca de Processos: cards compartilhados, edição e status para consultores/administradores. */
(() => {
  const grid = document.getElementById('processosGrid');
  const barra = document.getElementById('processosBarra');
  if (!grid || !barra) return;
  const originais = structuredClone(window.ffProcessosOriginais || []);
  let processos = originais, online = false, podeEditar = false, filtro = 'todos', aberto = null, editando = false, ocupado = false;
  const esc = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const nomeStatus = { rever: 'Rever', aprovado: 'Aprovado', reprovado: 'Reprovado' };
  const permitido = () => online && podeEditar;
  const processo = (id) => processos.find((p) => p.id === id);
  const data = (valor) => valor ? new Date(valor).toLocaleString('pt-BR') : '';

  async function api(metodo, rota, corpo) {
    const res = await fetch(`/api/processos${rota}`, { method: metodo, cache: 'no-store', headers: corpo ? { 'Content-Type': 'application/json' } : undefined, body: corpo ? JSON.stringify(corpo) : undefined });
    let json = {};
    try { json = await res.json(); } catch { /* resposta vazia */ }
    if (res.status === 401) { window.ffIrParaLogin?.(); throw new Error('Sessão expirada.'); }
    if (!res.ok) { const erro = new Error(json.erro || `Erro ${res.status}.`); erro.status = res.status; erro.processo = json.processo; throw erro; }
    return json;
  }
  function aviso(mensagem, erro = false) {
    const el = document.createElement('div');
    el.className = `pr-aviso${erro ? ' pr-aviso--erro' : ''}`;
    el.setAttribute('role', erro ? 'alert' : 'status');
    el.textContent = mensagem;
    document.body.append(el);
    setTimeout(() => el.remove(), 4800);
  }
  function badge(p) { return p.status ? `<span class="ed-status ed-status--${p.status}">${nomeStatus[p.status]}${p.statusEm ? ` · ${esc(data(p.statusEm))}` : ''}</span>` : '<span class="pr-sem-status">Sem status</span>'; }
  function mapa(p) { return `<span class="fluxo-mapa-hint">Ver detalhes</span><span class="mapa-simples"><span class="mapa-linha">${(p.etapas || []).map((e, i) => `${i ? '<span class="mapa-conector-h" aria-hidden="true"></span>' : ''}<span class="mapa-etapa${i === p.etapas.length - 1 ? ' destaque' : ''}">${esc(e.curto || e.texto)}</span>`).join('')}</span></span>`; }
  function render() {
    const filtros = [['todos','Todos'],['rever','Rever'],['aprovado','Aprovados'],['reprovado','Reprovados'],['sem','Sem status']];
    barra.innerHTML = `<div class="pr-filtros" aria-label="Filtrar processos por status">${filtros.map(([id,nome]) => `<button type="button" class="ed-filtro${filtro === id ? ' ativo' : ''}" data-filtro="${id}" aria-pressed="${filtro === id}">${nome}<span class="ed-conta">${id === 'todos' ? processos.length : processos.filter((p) => id === 'sem' ? !p.status : p.status === id).length}</span></button>`).join('')}</div><div class="pr-acoes">${permitido() ? '<button type="button" class="ed-btn ed-btn--primario" data-novo>Novo processo</button>' : online ? '<span class="ed-leitura">Somente leitura</span>' : '<span class="ed-offline">Modo leitura · servidor indisponível</span>'}</div>`;
    const lista = processos.filter((p) => filtro === 'todos' || (filtro === 'sem' ? !p.status : p.status === filtro));
    grid.innerHTML = lista.length ? lista.map((p) => `<article class="processo-card pr-card" data-id="${esc(p.id)}"><div class="pr-card-cabecalho"><h4>${esc(p.nome)}</h4>${badge(p)}</div><p class="descricao">${esc(p.descricao)}</p><button type="button" class="fluxo-mapa pr-mapa" data-abrir="${esc(p.id)}" aria-label="Ver detalhes de ${esc(p.nome)}">${mapa(p)}</button>${p.alertaTitulo || p.alerta ? `<div class="alerta alerta-importante pr-alerta"><span class="icone">!</span><span><strong>${esc(p.alertaTitulo)}</strong> ${esc(p.alerta)}</span></div>` : ''}${permitido() ? `<div class="pr-card-acoes"><button type="button" class="ed-btn" data-editar="${esc(p.id)}">Editar</button><button type="button" class="ed-btn" data-mover="${esc(p.id)}" data-direcao="-1" aria-label="Mover ${esc(p.nome)} para cima" ${processos.indexOf(p) === 0 ? 'disabled' : ''}>↑</button><button type="button" class="ed-btn" data-mover="${esc(p.id)}" data-direcao="1" aria-label="Mover ${esc(p.nome)} para baixo" ${processos.indexOf(p) === processos.length - 1 ? 'disabled' : ''}>↓</button></div>` : ''}</article>`).join('') : '<p class="ed-vazio">Nenhum processo neste filtro.</p>';
  }
  const dialog = document.createElement('dialog');
  dialog.className = 'pr-dialog';
  dialog.setAttribute('aria-label', 'Detalhes do processo');
  document.body.append(dialog);
  function abrir(id, modo = 'ver') { aberto = id; editando = modo === 'editar'; desenharDialogo(); dialog.showModal(); }
  function fechar() { if (ocupado) return; dialog.close(); aberto = null; editando = false; }
  function desenharDialogo() {
    const p = processo(aberto);
    if (editando && permitido()) { editor(p); return; }
    editando = false;
    if (!p) return;
    dialog.innerHTML = `<div class="pr-dialog-head"><div><small>Biblioteca de Processos</small><h2>${esc(p.nome)}</h2></div><button type="button" class="pr-fechar" data-fechar aria-label="Fechar">×</button></div><div class="pr-dialog-body"><div class="pr-status-linha">${badge(p)}${p.statusPor ? `<span>Por ${esc(p.statusPor)}</span>` : ''}</div><p>${esc(p.detalhe || p.descricao)}</p><h3>Etapas do fluxo</h3><ol class="pr-etapas-view">${(p.etapas || []).map((e) => `<li>${esc(e.texto)}</li>`).join('')}</ol>${p.alertaTitulo || p.alerta ? `<div class="alerta alerta-importante"><span class="icone">!</span><span><strong>${esc(p.alertaTitulo)}</strong> ${esc(p.alerta)}</span></div>` : ''}${permitido() ? `<div class="pr-status-editor"><strong>Status</strong>${[['rever','Rever'],['aprovado','Aprovado'],['reprovado','Reprovado'],['','Limpar']].map(([v,n]) => `<button type="button" class="ed-btn${p.status === (v || null) ? ' pr-selecionado' : ''}" data-status="${v}">${n}</button>`).join('')}</div><div class="pr-dialog-acoes"><button type="button" class="ed-btn ed-btn--primario" data-editar="${esc(p.id)}">Editar processo</button><button type="button" class="ed-btn ed-btn--perigo" data-excluir>Excluir</button></div>` : ''}<details class="ed-historico"><summary>Histórico de alterações</summary><ol>${p.historico?.length ? p.historico.map((h) => `<li class="pr-hist"><time>${esc(data(h.em))}</time><strong>${esc(h.acao)}</strong><span>${esc(h.detalhe)}</span><small>${esc(h.autor)}</small></li>`).join('') : '<li>Nenhuma alteração registrada.</li>'}</ol></details></div>`;
  }
  function novaEtapa(texto = '', id = '') { const el = document.createElement('div'); el.className = 'pr-etapa-edit'; el.dataset.id = id; el.innerHTML = `<input type="text" maxlength="120" value="${esc(texto)}" aria-label="Texto da etapa"><button type="button" class="ed-icone-btn" data-etapa-cima aria-label="Mover etapa para cima">↑</button><button type="button" class="ed-icone-btn" data-etapa-baixo aria-label="Mover etapa para baixo">↓</button><button type="button" class="ed-icone-btn ed-icone-btn--perigo" data-etapa-remover aria-label="Remover etapa">×</button>`; return el; }
  function editor(p) {
    dialog.innerHTML = `<div class="pr-dialog-head"><div><small>${p ? 'Editar processo' : 'Novo processo'}</small><h2>${esc(p?.nome || 'Novo processo')}</h2></div><button type="button" class="pr-fechar" data-fechar aria-label="Fechar">×</button></div><form id="prForm" class="pr-form"><label>Nome do processo <input name="nome" maxlength="100" required value="${esc(p?.nome)}"></label><label>Descrição do card <textarea name="descricao" maxlength="500" rows="2">${esc(p?.descricao)}</textarea></label><label>Resumo completo <textarea name="detalhe" maxlength="2000" rows="4">${esc(p?.detalhe)}</textarea></label><div><strong>Etapas do fluxo</strong><p>Adicione ao menos duas etapas. Use as setas para ordenar.</p><div id="prEtapas" class="pr-etapas-edit"></div><button type="button" class="ed-btn ed-btn--adicionar" data-etapa-adicionar>+ Adicionar etapa</button></div><label>Título do alerta <input name="alertaTitulo" maxlength="200" value="${esc(p?.alertaTitulo)}"></label><label>Texto do alerta <textarea name="alerta" maxlength="1000" rows="2">${esc(p?.alerta)}</textarea></label><p class="pr-erro" id="prErro" role="alert" hidden></p><div class="pr-dialog-acoes"><button type="button" class="ed-btn" data-cancelar>Cancelar</button><button type="submit" class="ed-btn ed-btn--primario">Salvar processo</button></div></form>`;
    const container = dialog.querySelector('#prEtapas');
    (p?.etapas || [{texto:''},{texto:''}]).forEach((e) => container.append(novaEtapa(e.texto, e.id)));
  }
  function editarAtual(id) { aberto = id; editando = true; desenharDialogo(); if (!dialog.open) dialog.showModal(); }
  async function carregar() {
    try { const dados = await api('GET', ''); online = true; processos = dados.processos; render(); if (dialog.open && !editando) desenharDialogo(); }
    catch { online = false; if (!processos.length) processos = originais; render(); }
  }
  async function mover(id, delta) {
    if (!permitido() || ocupado) return;
    const ids = processos.map((p) => p.id), i = ids.indexOf(id), j = i + delta;
    if (i < 0 || j < 0 || j >= ids.length) return;
    [ids[i],ids[j]] = [ids[j],ids[i]];
    ocupado = true;
    try { const dados = await api('POST','?acao=ordem',{ids}); processos = dados.processos; render(); }
    catch (e) { aviso(e.message, true); }
    finally { ocupado = false; }
  }
  barra.addEventListener('click', (e) => { const b = e.target.closest('[data-filtro]'); if (b) { filtro = b.dataset.filtro; render(); } else if (e.target.closest('[data-novo]') && permitido()) abrir(null,'editar'); });
  grid.addEventListener('click', (e) => { const moverBtn = e.target.closest('[data-mover]'); if (moverBtn) return mover(moverBtn.dataset.mover, Number(moverBtn.dataset.direcao)); const editar = e.target.closest('[data-editar]'); if (editar && permitido()) return abrir(editar.dataset.editar,'editar'); const ver = e.target.closest('[data-abrir]'); if (ver) abrir(ver.dataset.abrir); });
  dialog.addEventListener('click', async (e) => {
    if (e.target.closest('[data-fechar], [data-cancelar]')) { if (editando && aberto) { editando = false; desenharDialogo(); } else fechar(); return; }
    if (e.target.closest('[data-editar]') && permitido()) { editarAtual(aberto); return; }
    const area = dialog.querySelector('#prEtapas');
    if (area && permitido()) {
      if (e.target.closest('[data-etapa-adicionar]')) { if (area.children.length < 30) { area.append(novaEtapa()); area.lastElementChild.querySelector('input').focus(); } return; }
      const item = e.target.closest('.pr-etapa-edit');
      if (item) {
        if (e.target.closest('[data-etapa-remover]')) { item.remove(); return; }
        if (e.target.closest('[data-etapa-cima]') && item.previousElementSibling) { area.insertBefore(item, item.previousElementSibling); item.querySelector('input').focus(); return; }
        if (e.target.closest('[data-etapa-baixo]') && item.nextElementSibling) { area.insertBefore(item.nextElementSibling, item); item.querySelector('input').focus(); return; }
      }
    }
    if (!permitido() || ocupado) return;
    const status = e.target.closest('[data-status]');
    if (status) { ocupado = true; try { const dados = await api('POST',`?id=${encodeURIComponent(aberto)}&acao=status`,{status:status.dataset.status || null}); processos = processos.map((p) => p.id === aberto ? dados.processo : p); render(); desenharDialogo(); } catch(err) { aviso(err.message,true); } finally { ocupado = false; } return; }
    if (e.target.closest('[data-excluir]')) {
      if (!window.confirm('Excluir este processo e seu histórico?')) return;
      ocupado = true;
      try { await api('DELETE',`?id=${encodeURIComponent(aberto)}`); processos = processos.filter((p) => p.id !== aberto); ocupado = false; fechar(); render(); aviso('Processo excluído.'); }
      catch(err) { aviso(err.message,true); } finally { ocupado = false; }
    }
  });
  dialog.addEventListener('submit', async (e) => {
    if (e.target.id !== 'prForm') return;
    e.preventDefault();
    if (!permitido() || ocupado) return;
    const form = e.target, campos = new FormData(form), atual = processo(aberto);
    const dados = Object.fromEntries(['nome','descricao','detalhe','alertaTitulo','alerta'].map((k) => [k,String(campos.get(k) || '').trim()]));
    dados.etapas = [...form.querySelectorAll('.pr-etapa-edit')].map((el) => ({id:el.dataset.id || undefined,texto:el.querySelector('input').value.trim()})).filter((e) => e.texto);
    const erro = form.querySelector('#prErro');
    if (dados.etapas.length < 2) { erro.textContent = 'Informe pelo menos duas etapas.'; erro.hidden = false; return; }
    ocupado = true; form.querySelector('[type="submit"]').disabled = true;
    try {
      const resposta = await api(atual ? 'PUT' : 'POST', atual ? `?id=${encodeURIComponent(atual.id)}` : '', atual ? {rev:atual.rev,processo:dados} : {processo:dados});
      if (atual) processos = processos.map((p) => p.id === atual.id ? resposta.processo : p); else processos = [...processos,resposta.processo];
      aberto = resposta.processo.id; editando = false; render(); desenharDialogo(); aviso('Processo salvo.');
    } catch(err) {
      if (err.status === 409 && err.processo) { processos = processos.map((p) => p.id === err.processo.id ? err.processo : p); render(); }
      erro.textContent = err.message; erro.hidden = false;
    } finally { ocupado = false; form.querySelector('[type="submit"]')?.removeAttribute('disabled'); }
  });
  dialog.addEventListener('cancel', (e) => { if (ocupado) e.preventDefault(); else { aberto = null; editando = false; } });
  render();
  window.ffSessao?.then((usuario) => { podeEditar = Boolean(usuario?.permissoes?.includes('editar')); carregar(); });
  setInterval(() => { if (document.visibilityState === 'visible' && !editando) carregar(); }, 30000);
})();
