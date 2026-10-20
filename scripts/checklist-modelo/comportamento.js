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
    guardar(CHAVE + ':pct', String(pct));
  }

  function salvar(){
    var marcados = {}, campos = {};
    caixas.forEach(function(c){ if (c.checked) marcados[c.getAttribute('data-id')] = 1; });
    regs.forEach(function(r){ if (r.value) campos[r.getAttribute('data-reg')] = r.value; });
    guardar(CHAVE, JSON.stringify({ marcados: marcados, regs: campos, notas: notas ? notas.value : '' }));
    atualizar();
  }

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
    apagar(CHAVE); atualizar();
  });
  if ($('btnImprimir')) $('btnImprimir').addEventListener('click', function(){ window.print(); });

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
