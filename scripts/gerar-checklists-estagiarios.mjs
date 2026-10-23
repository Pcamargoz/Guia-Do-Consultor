/* Gera os checklists da Trilha do Estagiário (dados-checklists-estagiarios.mjs) e do Consultor
   (dados-checklist-consultor.mjs + dados-fluxos-consultor.mjs), mais o public/checklists/manifest.json que alimenta a aba "Checklist" do guia.
   Visual em checklist-modelo/estilo.css, comportamento em checklist-modelo/comportamento.js.
   Cada checklist é um HTML independente (abre offline e guarda o progresso no navegador; dentro do guia, logado, o progresso e as imagens anexadas ficam na conta de cada usuário).
   Saída: <raiz>/estagiarios/, <raiz>/consultores/ e <raiz>/manifest.json, em public/checklists (servido pelo guia) e Checklists (cópia de trabalho).
   Uso: node scripts/gerar-checklists-estagiarios.mjs   (depois: node scripts/validar-checklists.mjs) */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { CHECKLISTS, ONBOARDING, META } from './dados-checklists-estagiarios.mjs';
import { CONSULTOR } from './dados-checklist-consultor.mjs';
import { FLUXOS } from './dados-fluxos-consultor.mjs';
import { FLUXOS_OPERACAO } from './dados-fluxos-operacao.mjs';
import { FLUXOS_GESTAO } from './dados-fluxos-gestao.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(AQUI, '..');
const raizes = ['public/checklists', 'Checklists'].filter((d) => existsSync(path.join(RAIZ, d)));
const CSS = await readFile(path.join(AQUI, 'checklist-modelo/estilo.css'), 'utf8');
const JS = await readFile(path.join(AQUI, 'checklist-modelo/comportamento.js'), 'utf8');
/* Montagem do relatório de problemas: o mesmo arquivo que a biblioteca do guia usa, embutido para o checklist baixado. */
const JS_RELATORIO = await readFile(path.join(RAIZ, 'public/checklists-relatorio.js'), 'utf8');
const LOGO = `data:image/png;base64,${(await readFile(path.join(RAIZ, 'public/assets/Logo Faktory Flow.png'))).toString('base64')}`;
const FONTES = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';

/* O bloco "Vídeo do fluxo" só entra quando o vídeo já foi publicado em public/videos (videos/scripts/render.mjs). */
const temVideo = (c) => Boolean(c.video && existsSync(path.join(RAIZ, 'public/videos', `${c.video.id}.mp4`)));

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* **negrito** e `Menu > Tela` dentro dos textos */
const fmt = (v) => esc(v).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<span class="ui">$1</span>');

const STATUS = {
  v: { rotulo: 'Verificado no sistema', curto: 'Verificado', classe: 'st-v' },
  d: { rotulo: 'Baseado na documentação', curto: 'Documentação', classe: 'st-d' },
  n: { rotulo: 'Ainda não validado', curto: 'Não validado', classe: 'st-n' },
};
const selo = (s) => `<span class="selo ${STATUS[s].classe}" title="${STATUS[s].rotulo}">${STATUS[s].curto}</span>`;

const svg = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICONE = {
  alvo: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
  bandeira: svg('<path d="M4 22V4"/><path d="M4 4h13l-2 4 2 4H4"/>'),
  obra: svg('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z"/>'),
  clipe: svg('<path d="m21.4 11.1-9.2 9.2a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5"/>'),
  copiar: svg('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>'),
  baixar: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>'),
  importar: svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>'),
  arquivo: svg('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M9 14l2 2 4-4"/>'),
  lista: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>'),
  ok: svg('<path d="M20 6 9 17l-5-5"/>'),
  alerta: svg('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'),
  pendente: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  imprimir: svg('<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>'),
  limpar: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
  tema: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
  nota: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
  play: svg('<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/>'),
  mapa: svg('<path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/>'),
};

/* ---------- Validação dos dados (falha cedo, com o local do erro) ---------- */
function conferir(c, rotulo) {
  const erro = (m) => { throw new Error(`${rotulo}: ${m}`); };
  const passo = (p, onde) => {
    if (!p.t || typeof p.t !== 'string') erro(`${onde} sem texto`);
    if (!STATUS[p.s]) erro(`${onde} com selo inválido (${p.s}): ${p.t.slice(0, 40)}`);
  };
  for (const [i, p] of (c.prerequisitos || []).entries()) passo(p, `pré-requisito ${i + 1}`);
  for (const [i, f] of (c.fluxos || c.etapas || []).entries()) {
    if (!f.titulo || !(f.passos || []).length) erro(`fluxo ${i + 1} sem título ou sem passos`);
    f.passos.forEach((p, j) => passo(p, `fluxo ${i + 1}, passo ${j + 1}`));
  }
  for (const [i, p] of (c.resultado || []).entries()) passo(p, `resultado ${i + 1}`);
}

const todosPassos = (c) => [...(c.prerequisitos || []), ...(c.fluxos || c.etapas || []).flatMap((f) => f.passos), ...(c.resultado || [])];
/* Etapas marcadas com `dev: true` estão em desenvolvimento no sistema: aparecem com uma faixa "não testar" e ficam fora da contagem. */
const contarPassos = (c) => todosPassos(c).filter((p) => !p.dev);

/* ---------- Peças do HTML ---------- */
const legenda = `<div class="legenda" aria-label="Legenda da origem das informações">Origem de cada etapa: ${selo('v')} conferi no sistema ${selo('d')} vem dos roteiros, não foi executado ${selo('n')} ainda por confirmar</div>`;

function item(id, p, rotuloRes) {
  const res = p.r ? `<span class="res"><b>${rotuloRes}:</b> ${fmt(p.r)}</span>` : '';
  if (p.dev) {
    return `<li class="dev-item"><div class="dev-faixa" role="note">${ICONE.obra}<strong>Em desenvolvimento</strong><span>Não é para testar: esta parte do sistema ainda está sendo construída. Pule esta etapa; ela não conta no seu progresso.</span></div><div class="dev-texto"><span class="acao">${fmt(p.t)}</span>${res}</div></li>`;
  }
  const campo = p.campo ? `<input class="reg" type="text" data-reg="${esc(id)}" placeholder="${esc(p.campo)}" aria-label="${esc(p.campo)}">` : '';
  return `<li class="item"><label><input type="checkbox" data-id="${esc(id)}"><span class="txt"><span class="acao">${fmt(p.t)}</span>${res}</span>${selo(p.s)}</label>${campo}<button type="button" class="flag" data-flag="${esc(id)}" aria-pressed="false" title="Registrar um problema nesta etapa">${ICONE.bandeira}Problema</button><button type="button" class="anexo-btn" data-anexo="${esc(id)}" data-n="0" title="Anexar imagem (ou cole um print com Ctrl+V)">${ICONE.clipe}Anexar<span class="n-anexos"></span></button></li>`;
}

function topo(subtitulo, marca) {
  return `
<header class="topo">
  <img src="${LOGO}" alt="Faktory Flow" width="120" height="36">
  <div class="marca"><strong>${esc(marca)}</strong><span>${esc(subtitulo)}</span></div>
  <div class="espaco"></div>
  <span class="sinc" id="sinc" role="status" aria-live="polite"></span>
  <div class="menu" id="menuExportar">
    <button class="btn" type="button" aria-haspopup="menu" aria-expanded="false" aria-controls="menuExportarLista" title="Exportar os problemas ou o checklist preenchido">${ICONE.baixar}<span>Exportar</span></button>
    <div class="menu-lista" id="menuExportarLista" role="menu" aria-label="Exportar">
      <button type="button" role="menuitem" id="btnProblemas">${ICONE.bandeira}<b>Só os problemas</b><small>Relatório com as imagens, para o desenvolvimento</small></button>
      <button type="button" role="menuitem" id="btnExportar">${ICONE.arquivo}<b>Checklist preenchido</b><small>Arquivo .json com tudo o que você fez, para importar</small></button>
      <button type="button" role="menuitem" id="btnRelatorio">${ICONE.copiar}<b>Copiar relatório</b><small>Texto em Markdown, sem as imagens</small></button>
    </div>
  </div>
  <button class="btn" id="btnImportar" type="button" title="Importar um checklist preenchido (.json)">${ICONE.importar}<span>Importar</span></button>
  <button class="btn" id="btnImprimir" type="button" title="Imprimir ou salvar em PDF">${ICONE.imprimir}<span>Imprimir</span></button>
  <button class="btn" id="btnLimpar" type="button" title="Desmarcar tudo">${ICONE.limpar}<span>Recomeçar</span></button>
  <button class="btn" id="btnTema" type="button" aria-label="Alternar tema claro/escuro" title="Alternar tema">${ICONE.tema}</button>
</header>
<div class="barra" role="progressbar" aria-label="Progresso do checklist"><i id="barraFill"></i></div>
<div class="aviso" id="aviso" role="status" aria-live="polite"></div>`;
}

const anel = `<div class="anel" role="img" aria-label="Progresso do checklist">
  <svg viewBox="0 0 120 120"><circle class="trilho" cx="60" cy="60" r="52" fill="none" stroke-width="10"/><circle id="anelValor" class="valor" cx="60" cy="60" r="52" fill="none" stroke-width="10"/></svg>
  <div class="centro"><b id="anelPct">0%</b><small>concluído</small></div>
</div>`;

function heroi({ etiqueta, titulo, subtitulo, chips }) {
  return `<section class="hero"><div>
  <span class="etiqueta">${esc(etiqueta)}</span>
  <h1>${esc(titulo)}</h1>
  <p>${fmt(subtitulo)}</p>
  <div class="resumo">${chips}</div>
</div>${anel}</section>${legenda}`;
}

function documento({ titulo, chave, corpo, indice, subtitulo, marca, rodape }) {
  const links = indice.map((i) => `<a href="#${i.id}"><span>${esc(i.rotulo)}</span><em>${i.grupo ? '0/0' : ''}</em></a>`).join('');
  return `<!DOCTYPE html>
<html lang="pt-BR" data-chave="${esc(chave)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)} · Faktory Flow</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTES}">
<style>${CSS}</style>
</head>
<body>
${topo(subtitulo, marca)}
<div class="shell">
<nav class="indice" aria-label="Neste checklist"><h2>Neste checklist</h2>${links}</nav>
<main>
${corpo}
<p class="rodape">${esc(rodape)}</p>
</main>
</div>
<script>${JS_RELATORIO}</script>
<script>${JS}</script>
</body>
</html>
`;
}

const blocoAnotacoes = (placeholder) => `<section class="secao no-print-notas" id="s-notas"><h2>${ICONE.nota}Minhas dúvidas e anotações</h2><label class="validador">Quem está validando <input id="validador" type="text" placeholder="Seu nome (vai no relatório)" autocomplete="name"></label><textarea id="notas" placeholder="${esc(placeholder)}"></textarea><p class="dica">No Guia, fica salvo na sua conta; no arquivo baixado, só neste navegador. Use <b>Exportar</b> no topo para baixar só os problemas (com as imagens) ou o checklist preenchido, e <b>Importar</b> para carregar um checklist exportado.</p></section>`;

function checklist(c, opcoes = {}) {
  const rotuloRes = opcoes.rotuloRes || 'Resultado';
  const passos = contarPassos(c);
  const verificados = passos.filter((p) => p.s === 'v').length;
  const fluxos = c.fluxos.map((f, fi) => `
    <div class="fluxo" id="fx-${fi + 1}" data-grupo>
      <h3>${esc(f.titulo)} <span class="cont"></span></h3>
      ${f.onde ? `<div class="onde">${ICONE.mapa}<span>Onde: ${fmt(f.onde)}</span></div>` : ''}
      ${f.intro ? `<p class="intro">${fmt(f.intro)}</p>` : ''}
      <ul class="itens">${f.passos.map((p, pi) => item(`f${f.chave ?? (f.preparar ? 'p' : fi + 1 - c.fluxos.slice(0, fi).filter((x) => x.preparar).length)}-${pi + 1}`, p, rotuloRes)).join('')}</ul>
    </div>`).join('');
  const pend = (c.naoValidado || []).map((a) => `<li>${ICONE.pendente}<span>${fmt(a)}</span></li>`).join('');

  const indice = [
    ...(temVideo(c) ? [{ id: 's-video', rotulo: 'Vídeo do fluxo' }] : []),
    { id: 's-objetivo', rotulo: 'Objetivo' },
    { id: 's-pre', rotulo: 'Pré-requisitos', grupo: true },
    ...c.fluxos.map((f, i) => ({ id: `fx-${i + 1}`, rotulo: f.titulo.replace(/^\d+\.\s*/, ''), grupo: true })),
    { id: 's-resultado', rotulo: 'Resultado esperado', grupo: true },
    { id: 's-atencao', rotulo: 'Pontos de atenção' },
    { id: 's-notas', rotulo: 'Anotações' },
  ];

  const corpo = `
${heroi({
    etiqueta: c.etiqueta, titulo: c.titulo, subtitulo: c.subtitulo,
    chips: `<span class="chip">${ICONE.lista}<b id="contagem">0 de ${passos.length}</b> etapas</span><span class="chip">${ICONE.alvo}<b>${verificados}</b> de ${passos.length} conferidas no sistema</span><span class="chip" id="chipProblemas">${ICONE.bandeira}<b id="problemas">0</b> problemas</span>`,
  })}
${temVideo(c) ? `
<section class="secao secao-video" id="s-video"><h2>${ICONE.play}Vídeo do fluxo: ${esc(c.video.titulo)}</h2><p>${fmt(c.video.resumo)} Assista antes de começar: ele explica o conceito e as regras de negócio que os passos abaixo cobram.</p><video controls preload="none" playsinline poster="/videos/${esc(c.video.id)}.jpg" src="/videos/${esc(c.video.id)}.mp4"></video><p class="dica">Também está na aba <b>Vídeos de fluxo</b> do Guia do Consultor. A legenda vem embutida: dá para assistir sem som.</p></section>` : ''}
<section class="secao" id="s-objetivo"><h2><span class="n">1</span>Objetivo</h2><p>${fmt(c.objetivo)}</p></section>

<section class="secao" id="s-pre" data-grupo><h2><span class="n">2</span>Pré-requisitos <span class="cont"></span></h2><ul class="itens">${c.prerequisitos.map((p, i) => item(`pre-${i + 1}`, p, rotuloRes)).join('')}</ul></section>

<section class="secao" id="s-passos"><h2><span class="n">3</span>Passo a passo</h2>${fluxos}</section>

<section class="secao" id="s-resultado" data-grupo><h2><span class="n">4</span>Resultado esperado <span class="cont"></span></h2><p class="dica" style="margin:-4px 0 10px">Marque quando conseguir confirmar cada ponto.</p><ul class="itens">${c.resultado.map((r, i) => item(`res-${i + 1}`, r, rotuloRes)).join('')}</ul></section>

<section class="secao" id="s-atencao"><h2><span class="n">5</span>Pontos de atenção</h2><ul class="atencao">${c.atencao.map((a) => `<li>${ICONE.alerta}<span>${fmt(a)}</span></li>`).join('')}</ul></section>

${pend ? `<section class="secao"><h2>${ICONE.pendente}Ainda não validado na prática</h2><p class="dica" style="margin:-4px 0 10px">Estas partes não puderam ser conferidas. ${esc(opcoes.avisoPendente || 'Confirme com seu supervisor antes de seguir.')}</p><ul class="pendencias">${pend}</ul></section>` : ''}

${blocoAnotacoes(opcoes.placeholderNotas || 'Anote dúvidas para levar ao supervisor, números de registros que você consultou, atalhos que descobriu…')}

<div class="concluido" id="concluido" role="status">${ICONE.ok}${esc(opcoes.fim || 'Checklist concluído. Volte ao onboarding e siga para o próximo módulo.')}</div>`;

  return documento({ titulo: c.titulo, chave: `ff-${opcoes.prefixo || 'estagiario'}:${c.id}`, corpo, indice, subtitulo: c.etiqueta, marca: opcoes.marca || 'Trilha do Estagiário', rodape: opcoes.rodape || META.rodape });
}

function onboarding(o) {
  const passos = contarPassos(o);
  const etapas = o.etapas.map((e, ei) => `
    <div class="fluxo" id="fx-${ei + 1}" data-grupo>
      <h3>${esc(e.titulo)} <span class="cont"></span></h3>
      ${e.intro ? `<p class="intro">${fmt(e.intro)}</p>` : ''}
      <ul class="itens">${e.passos.map((p, pi) => item(`e${e.preparar ? 'p' : ei + 1 - o.etapas.slice(0, ei).filter((x) => x.preparar).length}-${pi + 1}`, p, 'Resultado')).join('')}</ul>
    </div>`).join('');
  const trilha = CHECKLISTS.filter((c) => !c.etiqueta.startsWith('Fluxo principal')).map((c, i) => `
    <li><a href="${esc(c.arquivo)}"><span class="num">${String(i + 1).padStart(2, '0')}</span><span><strong>${esc(c.titulo)}</strong><small>${esc(c.resumo)}</small></span><span class="prog" data-prog="${esc(c.id)}">não iniciado</span></a></li>`).join('');

  const indice = [
    { id: 's-objetivo', rotulo: 'Objetivo' },
    { id: 's-regras', rotulo: 'Regras de ouro' },
    ...o.etapas.map((e, i) => ({ id: `fx-${i + 1}`, rotulo: e.titulo, grupo: true })),
    { id: 's-trilha', rotulo: 'Checklists da trilha' },
    { id: 's-notas', rotulo: 'Anotações' },
  ];

  const corpo = `
${heroi({
    etiqueta: 'Comece por aqui', titulo: o.titulo, subtitulo: o.subtitulo,
    chips: `<span class="chip">${ICONE.lista}<b id="contagem">0 de ${passos.length}</b> etapas</span><span class="chip">${ICONE.ok}<b id="pct">0%</b> do onboarding</span>`,
  })}

<section class="secao" id="s-objetivo"><h2><span class="n">1</span>Objetivo</h2><p>${fmt(o.objetivo)}</p></section>

<section class="secao" id="s-regras"><h2><span class="n">2</span>Regras de ouro</h2><ul class="atencao">${o.atencao.map((a) => `<li>${ICONE.alerta}<span>${fmt(a)}</span></li>`).join('')}</ul></section>

<section class="secao" id="s-etapas"><h2><span class="n">3</span>Sequência recomendada</h2>${etapas}</section>

<section class="secao" id="s-trilha"><h2><span class="n">4</span>Checklists da trilha</h2><p class="dica" style="margin:-4px 0 12px">Abra na ordem. O progresso aparece aqui quando você já abriu o checklist (dentro do guia ele fica salvo na sua conta).</p><ol class="trilha">${trilha}</ol></section>

${blocoAnotacoes('Dúvidas gerais, combinados com o supervisor, acessos que faltam…')}

<div class="concluido" id="concluido" role="status">${ICONE.ok}Onboarding concluído. Combine com seu supervisor as primeiras tarefas reais.</div>`;

  return documento({ titulo: o.titulo, chave: 'ff-estagiario:onboarding', corpo, indice, subtitulo: 'Onboarding', marca: 'Trilha do Estagiário', rodape: META.rodape });
}

/* ---------- Catálogo e manifest ---------- */
const GRUPOS = [
  { id: 'consultor', nome: 'Fluxos do consultor', desc: 'Testes funcionais ponta a ponta: faça, confira o reflexo no módulo seguinte e anote os registros.' },
  { id: 'fluxos', nome: 'Fluxos principais do estagiário', desc: 'Vendas, Faturamento e Financeiro, os módulos mais maduros, do começo ao fim com os seus registros. Faça depois do onboarding e dos checklists 01 a 04.' },
  { id: 'estagiario', nome: 'Trilha do estagiário', desc: 'Checklists curtos para a integração. Comece pelo onboarding (00) e siga a numeração.' },
  { id: 'qa', nome: 'Validação dos módulos (QA)', desc: 'Planos completos de validação e homologação de cada módulo, com os achados já registrados.' },
];
const QA = [
  ['CRM', 'Validação do CRM', 'validacao-crm-v2-faktory-flow.html'], ['Compras', 'Validação de Compras', 'validacao-compras-faktory-flow.html'],
  ['Estoque', 'Validação de Estoque', 'validacao-estoque-faktory-flow.html'], ['Expedição', 'Validação de Expedição', 'validacao-expedicao-faktory-flow.html'],
  ['Produção', 'Validação da Produção', 'validacao-producao-v2-faktory-flow.html'], ['Projetos', 'Validação de Projetos', 'validacao-projetos-faktory-flow.html'],
  ['Recebimento', 'Validação de Recebimento', 'validacao-recebimento-faktory-flow.html'], ['Serviços', 'Validação de Serviços', 'validacao-servicos-v2-faktory-flow.html'],
  ['Tarefas', 'Validação de Tarefas', 'validacao-tarefas-faktory-flow.html'],
];
const resumoEtapas = (c) => {
  const p = contarPassos(c);
  const dev = todosPassos(c).filter((x) => x.dev).length;
  return { etapas: p.length, verificadas: p.filter((x) => x.s === 'v').length, ...(dev ? { emDesenvolvimento: dev } : {}) };
};

const consultores = [CONSULTOR, ...FLUXOS, ...FLUXOS_OPERACAO, ...FLUXOS_GESTAO];
[ONBOARDING, ...CHECKLISTS, ...consultores].forEach((c) => conferir(c, c.arquivo));
const ids = [ONBOARDING, ...CHECKLISTS, ...consultores].map((c) => c.arquivo);
if (new Set(ids).size !== ids.length) throw new Error('arquivos de saída repetidos');

const ehFluxoPrincipal = (c) => c.etiqueta.startsWith('Fluxo principal');
const itemEstagiario = (c) => ({ grupo: ehFluxoPrincipal(c) ? 'fluxos' : 'estagiario', id: c.id, area: ehFluxoPrincipal(c) ? `Fluxo ${CHECKLISTS.filter(ehFluxoPrincipal).indexOf(c) + 1} · ${c.etiqueta.split(' · ').pop()}` : `${c.arquivo.slice(0, 2)} · ${c.etiqueta.split(' · ').pop()}`, titulo: c.titulo, resumo: c.resumo, arquivo: `estagiarios/${c.arquivo}`, chave: `ff-estagiario:${c.id}`, ...resumoEtapas(c) });

const manifest = {
  grupos: GRUPOS,
  itens: [
    ...consultores.map((c) => ({ grupo: 'consultor', id: c.id, area: c.etiqueta.replace(/^Consultor · /, ''), titulo: c.titulo, resumo: c.objetivo, arquivo: `consultores/${c.arquivo}`, chave: `ff-consultor:${c.id}`, ...resumoEtapas(c) })),
    /* Os fluxos principais (Vendas, Faturamento e Financeiro, os módulos mais maduros) formam um grupo próprio, numerado de 1 a 3, acima da trilha. */
    ...CHECKLISTS.filter(ehFluxoPrincipal).map(itemEstagiario),
    { grupo: 'estagiario', id: 'onboarding', area: '00 · Comece por aqui', titulo: ONBOARDING.titulo, resumo: ONBOARDING.objetivo, arquivo: `estagiarios/${ONBOARDING.arquivo}`, chave: 'ff-estagiario:onboarding', ...resumoEtapas(ONBOARDING) },
    ...CHECKLISTS.filter((c) => !ehFluxoPrincipal(c)).map(itemEstagiario),
    ...QA.map(([area, titulo, arquivo]) => ({ grupo: 'qa', id: arquivo.replace(/^validacao-|-faktory-flow\.html$/g, ''), area, titulo, resumo: 'Plano de validação com roteiros, critérios e achados registrados.', arquivo })),
  ],
};

const saidas = {
  estagiarios: [[ONBOARDING.arquivo, onboarding(ONBOARDING)], ...CHECKLISTS.map((c) => [c.arquivo, checklist(c)])],
  consultores: consultores.map((c) => [c.arquivo, checklist(c, {
    prefixo: 'consultor', marca: 'Fluxos do Consultor', rodape: c.rodape, rotuloRes: 'Conferir',
    fim: 'Fluxo concluído. Registre os defeitos encontrados e limpe os registros de teste.',
    avisoPendente: 'Valide no ambiente de teste antes de usar em um cliente.',
    placeholderNotas: 'Anote defeitos (com os passos para reproduzir), números de registros criados e o que precisa de configuração…',
  })]),
};
for (const raiz of raizes) {
  for (const [pasta, arquivos] of Object.entries(saidas)) {
    await mkdir(path.join(RAIZ, raiz, pasta), { recursive: true });
    for (const [nome, html] of arquivos) await writeFile(path.join(RAIZ, raiz, pasta, nome), html, 'utf8');
  }
  await writeFile(path.join(RAIZ, raiz, 'manifest.json'), `${JSON.stringify(manifest, null, 1)}\n`, 'utf8');
}
console.log(`Gerados: ${saidas.estagiarios.length} da trilha do estagiário e ${saidas.consultores.length} do consultor, mais o manifest (${manifest.itens.length} itens), em ${raizes.join(' e ')}.`);
