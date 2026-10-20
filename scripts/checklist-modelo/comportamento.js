/* Comportamento dos checklists: progresso salvo no navegador, anel de progresso, índice lateral e modo "dentro do guia". */
(function(){
  var raiz = document.documentElement;
  var CHAVE = raiz.getAttribute('data-chave');
  function ler(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function guardar(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function apagar(k){try{localStorage.removeItem(k);}catch(e){}}
  function $(id){return document.getElementById(id);}

  try { if (window.top !== window.self || /[?&]embed=1/.test(location.search)) raiz.classList.add('embed'); } catch(e) { raiz.classList.add('embed'); }

  var tema = ler('ff-checklist:tema');
  if (tema) raiz.setAttribute('data-theme', tema);
  if ($('btnTema')) $('btnTema').addEventListener('click', function(){
    var atual = raiz.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var novo = atual === 'dark' ? 'light' : 'dark';
    raiz.setAttribute('data-theme', novo); guardar('ff-checklist:tema', novo);
  });

  var estado = {};
  try { estado = JSON.parse(ler(CHAVE) || '{}') || {}; } catch(e) { estado = {}; }
  var caixas = [].slice.call(document.querySelectorAll('input[type=checkbox][data-id]'));
  var regs = [].slice.call(document.querySelectorAll('input[data-reg]'));
  var notas = $('notas');
  var CIRC = 327;

  function contar(escopo){
    var cx = escopo.querySelectorAll('input[type=checkbox][data-id]'), f = 0;
    for (var i = 0; i < cx.length; i++) if (cx[i].checked) f++;
    return [f, cx.length];
  }

  function atualizar(){
    var total = caixas.length, feitos = caixas.filter(function(c){return c.checked;}).length;
    var pct = total ? Math.round(feitos * 100 / total) : 0;
    if ($('barraFill')) $('barraFill').style.transform = 'scaleX(' + (pct / 100) + ')';
    if ($('anelValor')) $('anelValor').style.strokeDashoffset = String(CIRC * (1 - pct / 100));
    if ($('anelPct')) $('anelPct').textContent = pct + '%';
    if ($('pct')) $('pct').textContent = pct + '%';
    if ($('contagem')) $('contagem').textContent = feitos + ' de ' + total;
    [].forEach.call(document.querySelectorAll('[data-grupo]'), function(g){
      var c = contar(g), alvo = g.querySelector('.cont');
      if (alvo) alvo.textContent = c[0] + '/' + c[1];
      var link = g.id && document.querySelector('.indice a[href="#' + g.id + '"]');
      if (link) { link.querySelector('em').textContent = c[0] + '/' + c[1]; link.classList.toggle('feito', c[1] > 0 && c[0] === c[1]); }
    });
    if ($('concluido')) $('concluido').classList.toggle('on', total > 0 && feitos === total);
    var nProb = Object.keys(obs).filter(function(k){ return obs[k].value.trim(); }).length;
    if ($('problemas')) $('problemas').textContent = String(nProb);
    if ($('chipProblemas')) $('chipProblemas').classList.toggle('tem', nProb > 0);
    guardar(CHAVE + ':pct', String(pct));
  }

  var obs = {}; /* observações de problema por etapa */
  var validador = $('validador');

  function salvar(){
    var marcados = {}, campos = {}, notasObs = {};
    caixas.forEach(function(c){ if (c.checked) marcados[c.getAttribute('data-id')] = 1; });
    regs.forEach(function(r){ if (r.value) campos[r.getAttribute('data-reg')] = r.value; });
    Object.keys(obs).forEach(function(k){ if (obs[k].value.trim()) notasObs[k] = obs[k].value; });
    guardar(CHAVE, JSON.stringify({ marcados: marcados, regs: campos, obs: notasObs, validador: validador ? validador.value : '', notas: notas ? notas.value : '' }));
    atualizar();
  }

  /* Problema por etapa: o botão ⚑ abre um campo "esperado × obtido". */
  function marcarProblema(item, ta){
    var tem = ta.value.trim() !== '';
    item.classList.toggle('com-problema', tem);
    var b = item.querySelector('.flag'); if (b) b.setAttribute('aria-pressed', String(tem));
  }
  function abrirObs(id, texto){
    if (obs[id]) { obs[id].focus(); return; }
    var item = document.querySelector('input[data-id="' + id + '"]').closest('.item');
    var ta = document.createElement('textarea');
    ta.className = 'obs'; ta.setAttribute('aria-label', 'Problema nesta etapa');
    ta.placeholder = 'O que aconteceu? Esperado × obtido, mensagem de erro, nº do registro…';
    ta.value = texto || '';
    ta.addEventListener('input', function(){ marcarProblema(item, ta); salvar(); });
    item.appendChild(ta); obs[id] = ta; marcarProblema(item, ta);
    if (!texto) ta.focus();
  }
  [].forEach.call(document.querySelectorAll('.flag'), function(b){
    b.addEventListener('click', function(){ abrirObs(b.getAttribute('data-flag')); });
  });

  Object.keys(estado.obs || {}).forEach(function(k){ if (document.querySelector('input[data-id="' + k + '"]')) abrirObs(k, estado.obs[k]); });
  if (validador) { validador.value = estado.validador || ''; validador.addEventListener('input', salvar); }
  caixas.forEach(function(c){
    c.checked = !!(estado.marcados && estado.marcados[c.getAttribute('data-id')]);
    c.addEventListener('change', salvar);
  });
  regs.forEach(function(r){ r.value = (estado.regs && estado.regs[r.getAttribute('data-reg')]) || ''; r.addEventListener('input', salvar); });
  if (notas) { notas.value = estado.notas || ''; notas.addEventListener('input', salvar); }

  if ($('btnLimpar')) $('btnLimpar').addEventListener('click', function(){
    if (!confirm('Desmarcar todas as etapas e apagar anotações e registros deste checklist?')) return;
    caixas.forEach(function(c){ c.checked = false; });
    regs.forEach(function(r){ r.value = ''; });
    if (notas) notas.value = '';
    if (validador) validador.value = '';
    Object.keys(obs).forEach(function(k){ obs[k].remove(); delete obs[k]; });
    [].forEach.call(document.querySelectorAll('.com-problema'), function(i){ i.classList.remove('com-problema'); });
    apagar(CHAVE); atualizar();
  });
  if ($('btnImprimir')) $('btnImprimir').addEventListener('click', function(){ window.print(); });

  /* Relatório de validação em Markdown, pronto para colar num chamado ou e-mail. */
  function texto(el){ return el.textContent.replace(/\s+/g, ' ').trim(); }
  function tituloDe(h){
    var c = h.cloneNode(true);
    [].forEach.call(c.querySelectorAll('.n, .cont, svg'), function(x){ x.remove(); });
    return texto(c);
  }
  function relatorio(){
    var t = [], probs = [];
    t.push('# ' + texto(document.querySelector('.hero h1')));
    t.push('Validação em ' + new Date().toLocaleDateString('pt-BR') + (validador && validador.value ? ' por ' + validador.value : '') + ' · ' + $('contagem').textContent + ' etapas (' + $('anelPct').textContent + ' concluído)');
    [].forEach.call(document.querySelectorAll('main .secao[data-grupo], main .fluxo[data-grupo]'), function(g){
      var h = g.querySelector('h2, h3'); if (!h) return;
      var titulo = tituloDe(h), linhas = [];
      [].forEach.call(g.querySelectorAll('.item'), function(i){
        var c = i.querySelector('input[type=checkbox]'), id = c.getAttribute('data-id');
        var r = i.querySelector('.reg'), o = obs[id] && obs[id].value.trim(), acao = texto(i.querySelector('.acao'));
        linhas.push('- [' + (c.checked ? 'x' : ' ') + '] ' + acao + (r && r.value ? ' → ' + r.getAttribute('aria-label') + ': ' + r.value : ''));
        if (o) { o = o.replace(/\n+/g, ' '); linhas.push('  - ⚑ PROBLEMA: ' + o); probs.push(titulo + ' — ' + acao + ' → ' + o); }
      });
      t.push('\n## ' + titulo + '\n' + linhas.join('\n'));
    });
    if (probs.length) t.splice(2, 0, '\n## Problemas encontrados (' + probs.length + ')\n' + probs.map(function(p){ return '- ' + p; }).join('\n'));
    if (notas && notas.value.trim()) t.push('\n## Anotações\n' + notas.value.trim());
    return t.join('\n');
  }
  function aviso(msg){
    var a = $('aviso'); if (!a) return;
    a.textContent = msg; a.classList.add('on');
    clearTimeout(aviso.t); aviso.t = setTimeout(function(){ a.classList.remove('on'); }, 2600);
  }
  if ($('btnRelatorio')) $('btnRelatorio').addEventListener('click', function(){
    var md = relatorio();
    function legado(){
      var ta = document.createElement('textarea'); ta.value = md; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch(e) {}
      ta.remove(); aviso(ok ? 'Relatório copiado' : 'Não foi possível copiar');
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(md).then(function(){ aviso('Relatório copiado'); }, legado); else legado();
  });

  /* Índice lateral: destaca a seção visível. */
  var links = [].slice.call(document.querySelectorAll('.indice a'));
  if (links.length && 'IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entradas){
      entradas.forEach(function(e){
        if (!e.isIntersecting) return;
        links.forEach(function(a){ a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)); });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    links.forEach(function(a){ var alvo = document.getElementById(a.getAttribute('href').slice(1)); if (alvo) obs.observe(alvo); });
  }

  /* Onboarding: progresso de cada checklist já aberto neste navegador. */
  [].forEach.call(document.querySelectorAll('[data-prog]'), function(el){
    var v = ler('ff-estagiario:' + el.getAttribute('data-prog') + ':pct');
    el.textContent = v === null ? 'não iniciado' : v + '%';
  });
  atualizar();
})();
