/* Comportamento dos checklists: progresso, anel, índice lateral, modo "dentro do guia" e imagens anexadas.
   Dentro do site (logado) o progresso e as imagens ficam na conta de cada usuário; o navegador guarda uma cópia
   para abrir rápido e para funcionar sem rede. Fora do site (arquivo baixado) tudo fica só no navegador. */
(function(){
  var raiz = document.documentElement;
  var CHAVE = raiz.getAttribute('data-chave');
  var ENC = encodeURIComponent(CHAVE);
  var API = '/api/checklists-progresso?chave=' + ENC;
  var API_ANEXOS = '/api/checklists-anexos';
  function ler(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function guardar(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function apagar(k){try{localStorage.removeItem(k);}catch(e){}}
  function $(id){return document.getElementById(id);}

  try { if (window.top !== window.self || /[?&]embed=1/.test(location.search)) raiz.classList.add('embed'); } catch(e) { raiz.classList.add('embed'); }
  var dentro = raiz.classList.contains('embed') && window.parent !== window;

  var tema = ler('ff-checklist:tema');
  if (tema) raiz.setAttribute('data-theme', tema);
  if ($('btnTema')) $('btnTema').addEventListener('click', function(){
    var atual = raiz.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var novo = atual === 'dark' ? 'light' : 'dark';
    raiz.setAttribute('data-theme', novo); guardar('ff-checklist:tema', novo);
  });

  var caixas = [].slice.call(document.querySelectorAll('input[type=checkbox][data-id]'));
  var regs = [].slice.call(document.querySelectorAll('input[data-reg]'));
  var notas = $('notas');
  var validador = $('validador');
  var CIRC = 327;
  var obs = {}; /* observações de problema por etapa */
  var anexos = {}; /* imagens por etapa: id da etapa -> [{ id, nome, tipo, tamanho }] */
  var pctAtual = 0;
  var nuvem = { ativa: false, usuario: null, timer: null, enviando: false, reenviar: false, pendente: false };

  function contar(escopo){
    var cx = escopo.querySelectorAll('input[type=checkbox][data-id]'), f = 0;
    for (var i = 0; i < cx.length; i++) if (cx[i].checked) f++;
    return [f, cx.length];
  }

  function atualizar(){
    var total = caixas.length, feitos = caixas.filter(function(c){return c.checked;}).length;
    var pct = total ? Math.round(feitos * 100 / total) : 0;
    pctAtual = pct;
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

  /* ---------- Estado: ler, aplicar e salvar ---------- */
  function lerLocal(){
    try { return JSON.parse(ler(CHAVE) || '{}') || {}; } catch(e) { return {}; }
  }
  function temConteudo(est){
    return !!(est && (Object.keys(est.marcados || {}).length || Object.keys(est.regs || {}).length || Object.keys(est.obs || {}).length || (est.validador || '').trim() || (est.notas || '').trim()));
  }

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
    var ancora = item.querySelector('.anexos');
    if (ancora) item.insertBefore(ta, ancora); else item.appendChild(ta);
    obs[id] = ta; marcarProblema(item, ta);
    if (!texto) ta.focus();
  }
  [].forEach.call(document.querySelectorAll('.flag'), function(b){
    b.addEventListener('click', function(){ abrirObs(b.getAttribute('data-flag')); });
  });

  function aplicarEstado(est){
    est = est || {};
    Object.keys(obs).forEach(function(k){ obs[k].remove(); delete obs[k]; });
    [].forEach.call(document.querySelectorAll('.com-problema'), function(i){ i.classList.remove('com-problema'); });
    [].forEach.call(document.querySelectorAll('.flag'), function(b){ b.setAttribute('aria-pressed', 'false'); });
    caixas.forEach(function(c){ c.checked = !!(est.marcados && est.marcados[c.getAttribute('data-id')]); });
    regs.forEach(function(r){ r.value = (est.regs && est.regs[r.getAttribute('data-reg')]) || ''; });
    if (notas) notas.value = est.notas || '';
    if (validador) validador.value = est.validador || '';
    Object.keys(est.obs || {}).forEach(function(k){ if (document.querySelector('input[data-id="' + k + '"]')) abrirObs(k, est.obs[k]); });
  }

  function salvar(){
    var marcados = {}, campos = {}, notasObs = {};
    caixas.forEach(function(c){ if (c.checked) marcados[c.getAttribute('data-id')] = 1; });
    regs.forEach(function(r){ if (r.value) campos[r.getAttribute('data-reg')] = r.value; });
    Object.keys(obs).forEach(function(k){ if (obs[k].value.trim()) notasObs[k] = obs[k].value; });
    guardar(CHAVE, JSON.stringify({ marcados: marcados, regs: campos, obs: notasObs, validador: validador ? validador.value : '', notas: notas ? notas.value : '', t: Date.now() }));
    atualizar();
    if (nuvem.ativa) agendarEnvio();
  }

  if (validador) validador.addEventListener('input', salvar);
  caixas.forEach(function(c){ c.addEventListener('change', salvar); });
  regs.forEach(function(r){ r.addEventListener('input', salvar); });
  if (notas) notas.addEventListener('input', salvar);

  /* ---------- Conta do usuário: sincronização ---------- */
  var TEXTOS = { local: 'Salvo só neste navegador', salvando: 'Salvando…', salvo: 'Salvo na sua conta', erro: 'Sem conexão: tentarei de novo' };
  function situacao(estado){
    var el = $('sinc');
    if (el) { el.textContent = TEXTOS[estado]; el.title = TEXTOS[estado]; el.setAttribute('data-estado', estado); }
    if (dentro) window.parent.postMessage({ ffChecklist: true, sinc: { estado: estado, texto: TEXTOS[estado] } }, location.origin);
  }
  function agendarEnvio(imediato){
    nuvem.pendente = true; situacao('salvando');
    clearTimeout(nuvem.timer);
    nuvem.timer = setTimeout(enviar, imediato ? 0 : 700);
  }
  function enviar(urgente){
    if (!nuvem.ativa) return;
    if (nuvem.enviando) { nuvem.reenviar = true; return; }
    nuvem.enviando = true; nuvem.pendente = false;
    fetch(API, { method: 'PUT', credentials: 'same-origin', keepalive: !!urgente, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dados: lerLocal(), pct: pctAtual }) })
      .then(function(r){
        if (r.status === 401) { nuvem.ativa = false; raiz.classList.remove('nuvem'); situacao('local'); return; }
        if (!r.ok) throw new Error(String(r.status));
        if (!nuvem.reenviar && !nuvem.pendente) situacao('salvo');
      })
      .catch(function(){ nuvem.pendente = true; situacao('erro'); clearTimeout(nuvem.timer); nuvem.timer = setTimeout(enviar, 15000); })
      .then(function(){ nuvem.enviando = false; if (nuvem.reenviar) { nuvem.reenviar = false; enviar(); } });
  }
  function enviarAgora(){ if (nuvem.ativa && nuvem.pendente) { clearTimeout(nuvem.timer); enviar(true); } }
  document.addEventListener('visibilitychange', function(){ if (document.visibilityState === 'hidden') enviarAgora(); });
  window.addEventListener('pagehide', enviarAgora);
  window.addEventListener('online', function(){ if (nuvem.ativa && nuvem.pendente) agendarEnvio(true); });

  function iniciarNuvem(){
    fetch(API, { credentials: 'same-origin', cache: 'no-store' })
      .then(function(r){ if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function(srv){
        nuvem.ativa = true; nuvem.usuario = srv.usuario; raiz.classList.add('nuvem');
        /* A cópia local só vale para o usuário que a gravou (outra pessoa no mesmo navegador não herda o progresso). */
        var dono = ler(CHAVE + ':uid');
        var valida = !dono || dono === srv.usuario;
        var local = valida ? lerLocal() : {};
        guardar(CHAVE + ':uid', srv.usuario);
        if (srv.dados && (srv.dados.t || 0) >= (local.t || 0)) {
          aplicarEstado(srv.dados); guardar(CHAVE, JSON.stringify(srv.dados)); atualizar(); situacao('salvo');
        } else if (temConteudo(local)) {
          agendarEnvio(true); /* trabalho feito antes da conta (ou offline) sobe para a conta */
        } else {
          if (!valida) { aplicarEstado({}); apagar(CHAVE); atualizar(); }
          situacao('salvo');
        }
        (srv.anexos || []).forEach(function(a){ (anexos[a.item] = anexos[a.item] || []).push(a); });
        renderAnexos();
      })
      .catch(function(){ situacao('local'); });
  }

  /* ---------- Imagens anexadas às etapas ---------- */
  function itemDe(id){ var c = document.querySelector('input[data-id="' + id + '"]'); return c ? c.closest('.item') : null; }
  function idDe(item){ return item.querySelector('input[data-id]').getAttribute('data-id'); }
  function urlAnexo(a){ return API_ANEXOS + '?id=' + encodeURIComponent(a.id); }

  function renderAnexos(){
    [].forEach.call(document.querySelectorAll('.item'), function(item){
      var id = idDe(item), lista = anexos[id] || [], ul = item.querySelector('.anexos');
      var botao = item.querySelector('.anexo-btn');
      if (botao) { botao.setAttribute('data-n', String(lista.length)); botao.classList.toggle('tem', lista.length > 0); botao.querySelector('.n-anexos').textContent = lista.length ? String(lista.length) : ''; }
      if (!lista.length) { if (ul) ul.remove(); return; }
      if (!ul) { ul = document.createElement('ul'); ul.className = 'anexos'; ul.setAttribute('aria-label', 'Imagens desta etapa'); item.appendChild(ul); }
      ul.textContent = '';
      lista.forEach(function(a){
        var li = document.createElement('li'); li.className = 'anexo';
        var ver = document.createElement('button'); ver.type = 'button'; ver.className = 'anexo-ver'; ver.setAttribute('aria-label', 'Ampliar imagem' + (a.nome ? ': ' + a.nome : ''));
        var img = document.createElement('img'); img.loading = 'lazy'; img.alt = a.nome || 'Imagem anexada'; img.src = urlAnexo(a);
        ver.appendChild(img); ver.addEventListener('click', function(){ abrirImagem(a); });
        var x = document.createElement('button'); x.type = 'button'; x.className = 'anexo-x'; x.setAttribute('aria-label', 'Remover imagem'); x.title = 'Remover imagem'; x.textContent = '×';
        x.addEventListener('click', function(){ removerAnexo(id, a); });
        li.appendChild(ver); li.appendChild(x); ul.appendChild(li);
      });
    });
  }

  /* Reduz a imagem no navegador (lado maior 1600 px, WebP/JPEG) para caber no limite e economizar espaço. */
  function reduzir(arquivo){
    return new Promise(function(ok, falha){
      if (arquivo.size <= 350000 && /^image\/(png|jpeg|webp)$/.test(arquivo.type)) { ok(arquivo); return; }
      var url = URL.createObjectURL(arquivo), img = new Image();
      img.onerror = function(){ URL.revokeObjectURL(url); falha(new Error('Formato de imagem não suportado. Use PNG, JPEG ou WebP.')); };
      img.onload = function(){
        URL.revokeObjectURL(url);
        var f = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
        var c = document.createElement('canvas'); c.width = Math.max(1, Math.round(img.naturalWidth * f)); c.height = Math.max(1, Math.round(img.naturalHeight * f));
        var g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height);
        var tentativas = [['image/webp', 0.85], ['image/jpeg', 0.85], ['image/jpeg', 0.7], ['image/jpeg', 0.55]], i = 0;
        (function proxima(){
          if (i >= tentativas.length) { falha(new Error('Imagem muito grande mesmo reduzida. Tente um recorte menor.')); return; }
          var t = tentativas[i++];
          c.toBlob(function(b){
            if (!b || b.type !== t[0]) { proxima(); return; }
            if (b.size > 1400000) { proxima(); return; }
            ok(b);
          }, t[0], t[1]);
        })();
      };
      img.src = url;
    });
  }

  function subir(id, blob, nome){
    return fetch(API_ANEXOS + '?chave=' + ENC + '&item=' + encodeURIComponent(id), {
      method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': blob.type, 'X-Nome': encodeURIComponent(nome || 'imagem') }, body: blob,
    }).then(function(r){
      return r.json().catch(function(){ return {}; }).then(function(j){ if (!r.ok) throw new Error(j.erro || 'Não foi possível anexar a imagem.'); return j; });
    }).then(function(j){ (anexos[id] = anexos[id] || []).push(j.anexo); renderAnexos(); return j.anexo; });
  }
  function anexar(id, arquivo){
    aviso('Enviando imagem…');
    return reduzir(arquivo).then(function(blob){ return subir(id, blob, arquivo.name); })
      .then(function(){ aviso('Imagem anexada'); })
      .catch(function(e){ aviso(e.message || 'Não foi possível anexar a imagem.'); });
  }
  function enviarImagens(id, arquivos){
    var imagens = [].slice.call(arquivos).filter(function(f){ return /^image\//.test(f.type); });
    if (!imagens.length) { aviso('Escolha um arquivo de imagem'); return; }
    var fila = Promise.resolve();
    imagens.forEach(function(f){ fila = fila.then(function(){ return anexar(id, f); }); });
  }
  function removerAnexo(id, a){
    if (!confirm('Remover esta imagem da etapa?')) return;
    fetch(API_ANEXOS + '?id=' + encodeURIComponent(a.id), { method: 'DELETE', credentials: 'same-origin' }).then(function(r){
      if (!r.ok) throw new Error();
      anexos[id] = (anexos[id] || []).filter(function(x){ return x.id !== a.id; }); renderAnexos(); aviso('Imagem removida');
    }).catch(function(){ aviso('Não foi possível remover a imagem.'); });
  }

  var seletor = null, alvoSeletor = null;
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.anexo-btn'); if (!b) return;
    if (!seletor) {
      seletor = document.createElement('input'); seletor.type = 'file'; seletor.accept = 'image/png,image/jpeg,image/webp,image/gif'; seletor.multiple = true; seletor.hidden = true;
      seletor.addEventListener('change', function(){ if (alvoSeletor && seletor.files.length) enviarImagens(alvoSeletor, seletor.files); seletor.value = ''; });
      document.body.appendChild(seletor);
    }
    alvoSeletor = b.getAttribute('data-anexo'); seletor.click();
  });

  /* Colar print (Ctrl+V) e arrastar arquivos para uma etapa. */
  var itemAtivo = null;
  function lembrar(e){ var i = e.target.closest && e.target.closest('.item'); if (i) itemAtivo = i; }
  document.addEventListener('focusin', lembrar);
  document.addEventListener('pointerover', lembrar);
  document.addEventListener('paste', function(e){
    if (!nuvem.ativa || !e.clipboardData || !e.clipboardData.files.length) return;
    var imagens = [].filter.call(e.clipboardData.files, function(f){ return /^image\//.test(f.type); });
    if (!imagens.length) return;
    var foco = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.item') : null;
    var alvo = foco || itemAtivo;
    e.preventDefault();
    if (!alvo) { aviso('Clique na etapa e cole de novo (Ctrl+V)'); return; }
    enviarImagens(idDe(alvo), imagens);
  });
  document.addEventListener('dragover', function(e){
    if (!nuvem.ativa || !e.dataTransfer || [].indexOf.call(e.dataTransfer.types || [], 'Files') < 0) return;
    var i = e.target.closest && e.target.closest('.item'); if (!i) return;
    e.preventDefault(); i.classList.add('solta');
  });
  document.addEventListener('dragleave', function(e){ var i = e.target.closest && e.target.closest('.item'); if (i) i.classList.remove('solta'); });
  document.addEventListener('drop', function(e){
    var i = e.target.closest && e.target.closest('.item'); if (!i) return;
    i.classList.remove('solta');
    if (!nuvem.ativa || !e.dataTransfer || !e.dataTransfer.files.length) return;
    e.preventDefault(); enviarImagens(idDe(i), e.dataTransfer.files);
  });

  /* Ampliar: dentro do guia a página-mãe mostra a imagem (o iframe tem a altura de todo o conteúdo). */
  var visor = null;
  function abrirImagem(a){
    if (dentro) { window.parent.postMessage({ ffChecklist: true, imagem: { src: urlAnexo(a), nome: a.nome || '' } }, location.origin); return; }
    if (!visor) {
      visor = document.createElement('dialog'); visor.className = 'visor-img';
      visor.innerHTML = '<img alt=""><form method="dialog"><button class="btn" autofocus>Fechar</button></form>';
      visor.addEventListener('click', function(e){ if (e.target === visor) visor.close(); });
      document.body.appendChild(visor);
    }
    var img = visor.querySelector('img'); img.src = urlAnexo(a); img.alt = a.nome || 'Imagem anexada';
    if (visor.showModal) visor.showModal(); else window.open(urlAnexo(a), '_blank');
  }

  /* ---------- Recomeçar, imprimir, relatório ---------- */
  function recomecar(){
    if (!confirm('Desmarcar todas as etapas e apagar anotações, registros e imagens anexadas deste checklist?')) return;
    clearTimeout(nuvem.timer); nuvem.pendente = false;
    aplicarEstado({});
    apagar(CHAVE); anexos = {}; renderAnexos(); atualizar();
    if (nuvem.ativa) {
      situacao('salvando');
      fetch(API, { method: 'DELETE', credentials: 'same-origin' }).then(function(r){ if (!r.ok) throw new Error(); situacao('salvo'); })
        .catch(function(){ situacao('erro'); aviso('Não foi possível apagar na conta. Tente de novo.'); });
    }
  }
  if ($('btnLimpar')) $('btnLimpar').addEventListener('click', recomecar);
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
        var n = (anexos[id] || []).length;
        if (n) linhas.push('  - 📎 ' + n + (n === 1 ? ' imagem anexada' : ' imagens anexadas') + ' (ficam na sua conta, no checklist)');
      });
      t.push('\n## ' + titulo + '\n' + linhas.join('\n'));
    });
    if (probs.length) t.splice(2, 0, '\n## Problemas encontrados (' + probs.length + ')\n' + probs.map(function(p){ return '- ' + p; }).join('\n'));
    if (notas && notas.value.trim()) t.push('\n## Anotações\n' + notas.value.trim());
    return t.join('\n');
  }
  function aviso(msg){
    if (dentro) { window.parent.postMessage({ ffChecklist: true, aviso: msg }, location.origin); return; }
    var a = $('aviso'); if (!a) return;
    a.textContent = msg; a.classList.add('on');
    clearTimeout(aviso.t); aviso.t = setTimeout(function(){ a.classList.remove('on'); }, 2600);
  }
  function copiarRelatorio(){
    var md = relatorio();
    function legado(){
      var ta = document.createElement('textarea'); ta.value = md; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch(e) {}
      ta.remove(); aviso(ok ? 'Relatório copiado' : 'Não foi possível copiar');
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(md).then(function(){ aviso('Relatório copiado'); }, legado); else legado();
  }
  if ($('btnRelatorio')) $('btnRelatorio').addEventListener('click', copiarRelatorio);

  /* ---------- Exportar só os problemas, exportar o checklist preenchido e importar ---------- */
  var REL = window.ffRelatorioProblemas;
  var FORMATO = 'faktory-flow-checklist';
  var tituloChecklist = texto(document.querySelector('.hero h1')) || document.title;
  function baixarArquivo(nome, blob){
    /* Dentro do guia quem baixa é a página-mãe (o clique do usuário aconteceu lá). */
    if (dentro) window.parent.postMessage({ ffChecklist: true, baixar: { nome: nome, blob: blob } }, location.origin);
    else REL.baixar(nome, blob);
  }
  function contagem(){ return { feitos: caixas.filter(function(c){ return c.checked; }).length, total: caixas.length }; }
  var ocupado = false;
  function exportarProblemas(){
    if (ocupado) return;
    salvar();
    var est = lerLocal();
    if (!Object.keys(est.obs || {}).length) { aviso('Nenhum problema registrado neste checklist'); return; }
    ocupado = true; aviso('Montando o relatório de problemas…');
    REL.problemasDe(REL.etapasDo(document), est, nuvem.ativa ? anexos : {}, urlAnexo).then(function(problemas){
      var c = contagem();
      var html = REL.montarHtml({ geradoEm: Date.now(), autor: est.validador, checklists: [{ titulo: tituloChecklist, area: texto(document.querySelector('.hero .etiqueta')), validador: est.validador, atualizadoEm: est.t, feitos: c.feitos, total: c.total, problemas: problemas }] });
      baixarArquivo('problemas-' + REL.slug(tituloChecklist) + '-' + REL.hoje() + '.html', new Blob([html], { type: 'text/html;charset=utf-8' }));
      aviso(problemas.length + (problemas.length === 1 ? ' problema exportado' : ' problemas exportados'));
    }).catch(function(){ aviso('Não foi possível montar o relatório.'); }).then(function(){ ocupado = false; });
  }
  function exportarPreenchido(){
    if (ocupado) return;
    salvar();
    ocupado = true; aviso('Preparando o arquivo…');
    var lista = [];
    if (nuvem.ativa) Object.keys(anexos).forEach(function(id){ (anexos[id] || []).forEach(function(a){ lista.push({ item: id, a: a }); }); });
    Promise.all(lista.map(function(x){ return REL.imagemDataUrl(urlAnexo(x.a)).then(function(src){ return src ? { item: x.item, nome: x.a.nome || '', tipo: x.a.tipo, dados: src.slice(src.indexOf(',') + 1) } : null; }); }))
      .then(function(imgs){
        var arq = { formato: FORMATO, versao: 1, chave: CHAVE, titulo: tituloChecklist, exportadoEm: new Date().toISOString(), dados: lerLocal(), anexos: imgs.filter(Boolean) };
        baixarArquivo('checklist-' + REL.slug(tituloChecklist) + '-' + REL.hoje() + '.json', new Blob([JSON.stringify(arq)], { type: 'application/json' }));
        aviso('Checklist exportado' + (arq.anexos.length ? ' com ' + arq.anexos.length + (arq.anexos.length === 1 ? ' imagem' : ' imagens') : ''));
      }).catch(function(){ aviso('Não foi possível exportar o checklist.'); }).then(function(){ ocupado = false; });
  }
  function blobDe(base64, tipo){
    var bin = atob(base64), bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new Blob([bytes], { type: tipo });
  }
  function importarPreenchido(arq){
    if (!arq || arq.formato !== FORMATO || !arq.dados || typeof arq.dados !== 'object') { aviso('Este arquivo não é um checklist exportado pelo Guia'); return; }
    if (arq.chave !== CHAVE) { aviso('Este arquivo é do checklist "' + (arq.titulo || arq.chave) + '". Abra esse checklist para importar.'); return; }
    var imgs = (arq.anexos || []).filter(function(a){ return a && a.dados && itemDe(a.item); });
    var msg = 'Importar "' + (arq.titulo || tituloChecklist) + '"' + (arq.exportadoEm ? ', exportado em ' + new Date(arq.exportadoEm).toLocaleString('pt-BR') : '') + '?\n\nAs marcações, registros, problemas e anotações de agora serão trocados pelos do arquivo.' + (imgs.length ? ' As ' + imgs.length + ' imagens do arquivo serão acrescentadas às etapas.' : '');
    if (!confirm(msg)) return;
    var d = arq.dados;
    aplicarEstado({ marcados: d.marcados, regs: d.regs, obs: d.obs, validador: d.validador, notas: d.notas });
    salvar();
    if (!imgs.length) { aviso('Checklist importado'); return; }
    if (!nuvem.ativa) { aviso('Checklist importado. As imagens só entram com o checklist aberto pelo Guia (logado).'); return; }
    var feitas = 0, puladas = 0, fila = Promise.resolve();
    imgs.forEach(function(a){
      fila = fila.then(function(){
        var blob = blobDe(a.dados, a.tipo || 'image/png');
        var repetida = (anexos[a.item] || []).some(function(x){ return x.nome === a.nome && Number(x.tamanho) === blob.size; });
        if (repetida) { puladas++; return; }
        return subir(a.item, blob, a.nome).then(function(){ feitas++; aviso('Importando imagens… ' + feitas + ' de ' + imgs.length); });
      }).catch(function(e){ puladas++; aviso(e.message || 'Uma imagem não pôde ser importada.'); });
    });
    fila.then(function(){ aviso('Checklist importado' + (feitas ? ' com ' + feitas + (feitas === 1 ? ' imagem' : ' imagens') : '') + (puladas ? ' (' + puladas + ' já existia' + (puladas === 1 ? '' : 'm') + ' ou não coube)' : '')); });
  }
  function lerArquivo(arquivo){
    if (!arquivo) return;
    arquivo.text().then(function(t){ importarPreenchido(JSON.parse(t)); }).catch(function(){ aviso('Não foi possível ler o arquivo. Escolha o .json exportado pelo checklist.'); });
  }
  if ($('btnProblemas')) $('btnProblemas').addEventListener('click', exportarProblemas);
  if ($('btnExportar')) $('btnExportar').addEventListener('click', exportarPreenchido);
  if ($('btnImportar')) $('btnImportar').addEventListener('click', function(){
    var inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.addEventListener('change', function(){ lerArquivo(inp.files[0]); });
    inp.click();
  });
  /* Menu "Exportar" do topo (página aberta fora do guia). */
  var menu = $('menuExportar');
  if (menu) {
    var abreMenu = menu.querySelector('[aria-haspopup]');
    var fechaMenu = function(){ menu.classList.remove('on'); abreMenu.setAttribute('aria-expanded', 'false'); };
    abreMenu.addEventListener('click', function(e){ e.stopPropagation(); var on = !menu.classList.contains('on'); menu.classList.toggle('on', on); abreMenu.setAttribute('aria-expanded', String(on)); if (on) menu.querySelector('[role=menuitem]').focus(); });
    menu.addEventListener('click', function(e){ if (e.target.closest('[role=menuitem]')) fechaMenu(); });
    document.addEventListener('click', function(e){ if (!menu.contains(e.target)) fechaMenu(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && menu.classList.contains('on')) { fechaMenu(); abreMenu.focus(); } });
  }

  /* Índice lateral: destaca a seção visível. */
  var links = [].slice.call(document.querySelectorAll('.indice a'));
  if (links.length && 'IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function(entradas){
      entradas.forEach(function(e){
        if (!e.isIntersecting) return;
        links.forEach(function(a){ a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id)); });
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    links.forEach(function(a){ var alvo = document.getElementById(a.getAttribute('href').slice(1)); if (alvo) observador.observe(alvo); });
  }

  /* Onboarding: progresso de cada checklist (da conta; sem conta, o deste navegador). */
  var progs = [].slice.call(document.querySelectorAll('[data-prog]'));
  progs.forEach(function(el){
    var v = ler('ff-estagiario:' + el.getAttribute('data-prog') + ':pct');
    el.textContent = v === null ? 'não iniciado' : v + '%';
  });
  if (progs.length && location.protocol.indexOf('http') === 0) {
    fetch('/api/checklists-progresso?lista=1', { credentials: 'same-origin', cache: 'no-store' }).then(function(r){ return r.ok ? r.json() : null; }).then(function(res){
      if (!res) return;
      var mapa = {}; res.itens.forEach(function(i){ mapa[i.chave] = i.pct; });
      progs.forEach(function(el){
        var k = 'ff-estagiario:' + el.getAttribute('data-prog');
        el.textContent = (k in mapa) ? mapa[k] + '%' : 'não iniciado';
      });
    }).catch(function(){});
  }

  /* Dentro do guia (iframe): a página-mãe rola; aqui só informamos altura e seções e recebemos comandos. */
  if (dentro) {
    var enviarMedidas = function(){
      var secoes = [].map.call(document.querySelectorAll('.indice a'), function(a){
        var alvo = document.getElementById(a.getAttribute('href').slice(1));
        return alvo ? { rotulo: a.querySelector('span').textContent, top: Math.round(alvo.getBoundingClientRect().top + window.pageYOffset) } : null;
      }).filter(Boolean);
      window.parent.postMessage({ ffChecklist: true, altura: Math.ceil(document.body.getBoundingClientRect().height), secoes: secoes }, location.origin);
    };
    if ('ResizeObserver' in window) new ResizeObserver(enviarMedidas).observe(document.body);
    window.addEventListener('load', enviarMedidas);
    window.addEventListener('message', function(e){
      if (e.origin !== location.origin || !e.data || !e.data.ffAcao) return;
      if (e.data.ffAcao === 'relatorio') copiarRelatorio();
      else if (e.data.ffAcao === 'problemas') exportarProblemas();
      else if (e.data.ffAcao === 'exportar') exportarPreenchido();
      else if (e.data.ffAcao === 'importar') importarPreenchido(e.data.arquivo);
      else if (e.data.ffAcao === 'recomecar') recomecar();
      else if (e.data.ffAcao === 'imprimir') window.print();
    });
    enviarMedidas();
  }

  /* Início: mostra já o que está salvo no navegador; depois a conta confirma ou atualiza. */
  aplicarEstado(lerLocal());
  atualizar();
  if (location.protocol.indexOf('http') === 0) iniciarNuvem(); else situacao('local');
})();
