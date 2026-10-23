/* Relatório de problemas dos checklists: um HTML único, com as imagens dentro, para mandar ao time de desenvolvimento.
   Usado pelo checklist (scripts/checklist-modelo/comportamento.js, que recebe este arquivo embutido pelo gerador) e pela
   biblioteca do guia (guia-checklists.js, que junta os problemas de todos os checklists do usuário). */
(function(){
  if (window.ffRelatorioProblemas) return;

  function esc(v){ return String(v == null ? '' : v).replace(/[&<>"']/g, function(c){ return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function texto(el){ return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; }
  function tituloDe(h){
    if (!h) return '';
    var c = h.cloneNode(true);
    [].forEach.call(c.querySelectorAll('.n, .cont, svg'), function(x){ x.remove(); });
    return texto(c);
  }

  /* Etapas de um checklist (a página aberta ou o HTML baixado do servidor): seção, texto, resultado esperado e campo de registro. */
  function etapasDo(doc){
    var etapas = {}, ordem = [];
    [].forEach.call(doc.querySelectorAll('.item input[type=checkbox][data-id]'), function(c){
      var item = c.closest('.item'), id = c.getAttribute('data-id'), grupo = item.closest('[data-grupo]');
      var reg = item.querySelector('.reg');
      var res = item.querySelector('.res');
      var esperado = '';
      if (res) { var r = res.cloneNode(true), b = r.querySelector('b'); if (b) b.remove(); esperado = texto(r); }
      etapas[id] = { secao: grupo ? tituloDe(grupo.querySelector('h2, h3')) : '', etapa: texto(item.querySelector('.acao')), esperado: esperado, campo: reg ? reg.getAttribute('aria-label') || '' : '' };
      ordem.push(id);
    });
    return { titulo: texto(doc.querySelector('.hero h1')), etiqueta: texto(doc.querySelector('.hero .etiqueta')), etapas: etapas, ordem: ordem };
  }

  /* Imagem anexada como data: URL, para o relatório abrir em qualquer computador sem login. */
  function imagemDataUrl(url){
    return fetch(url, { credentials: 'same-origin' })
      .then(function(r){ if (!r.ok) throw new Error(String(r.status)); return r.blob(); })
      .then(function(b){ return new Promise(function(ok, falha){ var f = new FileReader(); f.onload = function(){ ok(f.result); }; f.onerror = falha; f.readAsDataURL(b); }); })
      .catch(function(){ return null; });
  }

  /* Problemas de um checklist a partir do estado salvo (dados.obs, dados.regs) e das imagens de cada etapa. */
  function problemasDe(estrutura, dados, anexosPorEtapa, urlAnexo){
    var obs = (dados && dados.obs) || {}, regs = (dados && dados.regs) || {};
    var ids = estrutura.ordem.filter(function(id){ return obs[id] && String(obs[id]).trim(); });
    Object.keys(obs).forEach(function(id){ if (ids.indexOf(id) < 0 && String(obs[id]).trim()) ids.push(id); });
    return Promise.all(ids.map(function(id){
      var e = estrutura.etapas[id] || { secao: '', etapa: 'Etapa que não existe mais nesta versão do checklist (' + id + ')', esperado: '', campo: '' };
      var lista = (anexosPorEtapa && anexosPorEtapa[id]) || [];
      return Promise.all(lista.map(function(a){ return imagemDataUrl(urlAnexo(a)).then(function(src){ return { src: src, nome: a.nome || '' }; }); }))
        .then(function(imagens){
          return { id: id, secao: e.secao, etapa: e.etapa, esperado: e.esperado, campo: e.campo, registro: regs[id] || '', problema: String(obs[id]).trim(), imagens: imagens.filter(function(i){ return i.src; }), faltaram: imagens.filter(function(i){ return !i.src; }).length };
        });
    }));
  }

  function data(d){ try { return new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }); } catch(e) { return ''; } }

  /* HTML do relatório. checklists: [{ titulo, area, validador, atualizadoEm, feitos, total, problemas: [...] }] */
  function montarHtml(o){
    var cks = o.checklists.filter(function(c){ return c.problemas.length; });
    var total = cks.reduce(function(s, c){ return s + c.problemas.length; }, 0);
    var imagens = cks.reduce(function(s, c){ return s + c.problemas.reduce(function(t, p){ return t + p.imagens.length; }, 0); }, 0);
    var n = 0;
    var resumo = cks.length > 1 ? '<nav class="sumario" aria-label="Checklists com problemas"><h2>Checklists</h2><ol>' + cks.map(function(c, i){
      return '<li><a href="#ck-' + (i + 1) + '"><span>' + esc(c.area ? c.area + ' · ' : '') + esc(c.titulo) + '</span><b>' + c.problemas.length + '</b></a></li>';
    }).join('') + '</ol></nav>' : '';
    var corpo = cks.map(function(c, i){
      var meta = [c.validador ? 'Validado por ' + esc(c.validador) : '', c.atualizadoEm ? 'Atualizado em ' + esc(data(c.atualizadoEm)) : '', c.total ? esc(c.feitos + ' de ' + c.total + ' etapas feitas') : ''].filter(Boolean).join(' · ');
      return '<section class="ck" id="ck-' + (i + 1) + '"><header><span class="area">' + esc(c.area || 'Checklist') + '</span><h2>' + esc(c.titulo) + '</h2>' + (meta ? '<p class="meta">' + meta + '</p>' : '') + '</header>' +
        c.problemas.map(function(p){
          n++;
          var figs = p.imagens.map(function(im, k){
            return '<figure><button type="button" class="ver" data-src="' + k + '" aria-label="Ampliar imagem"><img src="' + im.src + '" alt="' + esc(im.nome || 'Imagem anexada') + '"></button>' + (im.nome ? '<figcaption>' + esc(im.nome) + '</figcaption>' : '') + '</figure>';
          }).join('');
          return '<article class="prob"><div class="cab"><span class="num">P' + n + '</span>' + (p.secao ? '<span class="secao">' + esc(p.secao) + '</span>' : '') + '</div>' +
            '<h3>' + esc(p.etapa) + '</h3>' +
            '<dl>' + (p.esperado ? '<div><dt>Resultado esperado</dt><dd>' + esc(p.esperado) + '</dd></div>' : '') +
            (p.registro ? '<div><dt>' + esc(p.campo || 'Registro') + '</dt><dd class="mono">' + esc(p.registro) + '</dd></div>' : '') + '</dl>' +
            '<div class="obs"><strong>Problema encontrado</strong><p>' + esc(p.problema) + '</p></div>' +
            (figs ? '<div class="imgs">' + figs + '</div>' : '') +
            (p.faltaram ? '<p class="aviso-img">' + p.faltaram + (p.faltaram === 1 ? ' imagem não pôde ser incluída' : ' imagens não puderam ser incluídas') + '.</p>' : '') +
            '</article>';
        }).join('') + '</section>';
    }).join('');
    var titulo = cks.length === 1 ? 'Problemas: ' + cks[0].titulo : 'Relatório de problemas dos checklists';
    var vazio = '<p class="vazio">Nenhum problema registrado. Use o botão <b>Problema</b> numa etapa do checklist para descrever o que aconteceu.</p>';
    return '<!DOCTYPE html>\n<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<title>' + esc(titulo) + ' · Faktory Flow</title><style>' + CSS + '</style></head><body>' +
      '<header class="topo"><div><span class="eyebrow">Faktory Flow · Relatório para o desenvolvimento</span><h1>' + esc(titulo) + '</h1>' +
      '<p>Gerado em ' + esc(data(o.geradoEm || Date.now())) + (o.autor ? ' por ' + esc(o.autor) : '') + '. Cada item é uma etapa de checklist em que o teste encontrou um problema, com a descrição e as imagens anexadas.</p></div>' +
      '<dl class="numeros"><div><dt>Problemas</dt><dd>' + total + '</dd></div><div><dt>Checklists</dt><dd>' + cks.length + '</dd></div><div><dt>Imagens</dt><dd>' + imagens + '</dd></div></dl>' +
      '<button type="button" class="imprimir" onclick="window.print()">Imprimir ou salvar em PDF</button></header>' +
      '<main>' + (total ? resumo + corpo : vazio) + '</main>' +
      '<dialog class="visor"><img alt=""><form method="dialog"><button>Fechar</button></form></dialog>' +
      '<script>' + SCRIPT + '<\/script></body></html>\n';
  }

  var CSS = [
    ':root{--p:#3478A7;--p900:#143650;--p950:#0C2438;--lima:#D5DD26;--ink:#13293D;--muted:#4B6073;--line:#D8E3EC;--bad:#B42318;--bad-bg:#FDECEA;--canvas:#F2F6FA;color-scheme:light}',
    '*{box-sizing:border-box}body{margin:0;background:var(--canvas);color:var(--ink);font:15px/1.6 Inter,"Segoe UI",system-ui,sans-serif;-webkit-font-smoothing:antialiased}',
    '.topo{display:grid;gap:18px;padding:32px max(16px,calc(50% - 470px));background:linear-gradient(135deg,var(--p950),#1C4867 62%,#255C83);color:#fff}',
    '.eyebrow{font:800 11.5px "Segoe UI",system-ui,sans-serif;letter-spacing:.11em;text-transform:uppercase;color:var(--lima)}',
    'h1{margin:6px 0 0;font:800 clamp(1.6rem,3.4vw,2.3rem)/1.15 "Segoe UI",system-ui,sans-serif;letter-spacing:-.02em}.topo p{margin:10px 0 0;max-width:68ch;color:rgb(255 255 255/.84)}',
    '.numeros{display:flex;flex-wrap:wrap;gap:10px;margin:0}.numeros div{min-width:110px;padding:10px 16px;border-radius:12px;background:rgb(255 255 255/.12);border:1px solid rgb(255 255 255/.22)}',
    '.numeros dt{font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.8}.numeros dd{margin:0;font:800 28px/1.1 "Segoe UI",system-ui,sans-serif;color:var(--lima)}',
    '.imprimir{justify-self:start;min-height:42px;padding:0 18px;border:0;border-radius:999px;background:var(--lima);color:#1E2A05;font:700 14px "Segoe UI",system-ui,sans-serif;cursor:pointer}',
    'main{width:min(940px,calc(100% - 32px));margin:24px auto 48px;display:grid;gap:22px}',
    '.sumario{padding:18px 20px;border:1px solid var(--line);border-radius:16px;background:#fff}.sumario h2{margin:0 0 8px;font-size:15px}.sumario ol{margin:0;padding:0;list-style:none;display:grid;gap:4px}',
    '.sumario a{display:flex;justify-content:space-between;gap:12px;padding:6px 10px;border-radius:8px;color:var(--p900);text-decoration:none}.sumario a:hover{background:#EAF3F9}.sumario b{color:var(--bad)}',
    '.ck{display:grid;gap:14px}.ck>header{padding:4px 4px 0}.area{font:800 11px "Segoe UI",system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#255C83}',
    '.ck h2{margin:2px 0 0;font:800 1.35rem/1.25 "Segoe UI",system-ui,sans-serif;color:var(--p950)}.meta{margin:4px 0 0;color:var(--muted);font-size:13px}',
    '.prob{padding:18px 20px;border:1px solid var(--line);border-left:4px solid var(--bad);border-radius:14px;background:#fff;break-inside:avoid-page}',
    '.cab{display:flex;flex-wrap:wrap;align-items:center;gap:8px}.num{padding:1px 9px;border-radius:999px;background:var(--bad);color:#fff;font:800 12px "Segoe UI",system-ui,sans-serif}',
    '.secao{color:var(--muted);font-size:12.5px;font-weight:600}.prob h3{margin:8px 0 0;font-size:16px;line-height:1.4;color:var(--p950)}',
    '.prob dl{margin:10px 0 0;display:grid;gap:6px}.prob dl div{display:grid;grid-template-columns:170px 1fr;gap:10px}.prob dt{color:var(--muted);font-size:13px;font-weight:700}.prob dd{margin:0;font-size:14px}',
    '.mono{font-family:Consolas,"JetBrains Mono",monospace}@media (max-width:600px){.prob dl div{grid-template-columns:1fr;gap:0}}',
    '.obs{margin-top:12px;padding:12px 14px;border-radius:10px;background:var(--bad-bg)}.obs strong{color:var(--bad);font-size:12px;letter-spacing:.06em;text-transform:uppercase}',
    '.obs p{margin:4px 0 0;white-space:pre-wrap;overflow-wrap:anywhere}',
    '.imgs{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px;margin-top:14px}figure{margin:0}',
    '.ver{display:block;width:100%;padding:0;border:1px solid var(--line);border-radius:10px;background:#fff;cursor:zoom-in;overflow:hidden}.ver img{display:block;width:100%;height:auto}',
    'figcaption{margin-top:4px;color:var(--muted);font-size:12px;overflow-wrap:anywhere}.aviso-img{margin:8px 0 0;color:var(--muted);font-size:12.5px}',
    '.vazio{padding:40px 20px;border:1px dashed #B3C6D6;border-radius:16px;text-align:center;color:var(--muted)}',
    '.visor{max-width:min(94vw,1400px);padding:12px;border:0;border-radius:14px}.visor::backdrop{background:rgb(7 24 40/.8)}.visor img{display:block;max-width:100%;max-height:82vh;margin:0 auto 10px}',
    '.visor form{text-align:right}.visor button{min-height:38px;padding:0 16px;border:0;border-radius:999px;background:var(--p900);color:#fff;font-weight:700;cursor:pointer}',
    ':focus-visible{outline:3px solid var(--lima);outline-offset:2px}',
    '@media print{body{background:#fff}.topo{background:none;color:var(--ink);padding:0 0 12px;border-bottom:2px solid var(--p)}.topo p{color:var(--muted)}.eyebrow{color:#255C83}',
    '.numeros div{border-color:var(--line);background:none}.numeros dd{color:var(--p900)}.imprimir,.sumario{display:none}main{width:auto;margin:16px 0}.prob{box-shadow:none}.ver{border:1px solid #ccc}}',
  ].join('\n');

  var SCRIPT = "document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.ver');if(!b)return;var d=document.querySelector('.visor');var i=b.querySelector('img');d.querySelector('img').src=i.src;d.querySelector('img').alt=i.alt;if(d.showModal)d.showModal();});document.querySelector('.visor').addEventListener('click',function(e){if(e.target===e.currentTarget)e.currentTarget.close();});";

  function slug(v){ return String(v || 'checklist').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'checklist'; }
  function hoje(){ var d = new Date(), p = function(x){ return String(x).padStart(2, '0'); }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function baixar(nome, blob){
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = nome; a.style.display = 'none';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 60000);
  }

  window.ffRelatorioProblemas = { etapasDo: etapasDo, problemasDe: problemasDe, montarHtml: montarHtml, imagemDataUrl: imagemDataUrl, baixar: baixar, slug: slug, hoje: hoje };
})();
