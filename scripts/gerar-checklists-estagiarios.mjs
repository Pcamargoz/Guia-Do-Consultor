/* Gera os checklists da Trilha do Estagiário (dados-checklists-estagiarios.mjs) e do Consultor
   (dados-checklist-consultor.mjs + dados-fluxos-consultor.mjs), mais o public/checklists/manifest.json que alimenta a aba "Checklist" do guia.
   Visual em checklist-modelo/estilo.css, comportamento em checklist-modelo/comportamento.js.
   Cada checklist é um HTML independente (abre offline e guarda o progresso no navegador).
   Saída: <raiz>/estagiarios/, <raiz>/consultores/ e <raiz>/manifest.json, em public/checklists (servido pelo guia) e Checklists (cópia de trabalho).
   Uso: node scripts/gerar-checklists-estagiarios.mjs   (depois: node scripts/validar-checklists.mjs) */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { CHECKLISTS, ONBOARDING, META } from './dados-checklists-estagiarios.mjs';
import { CONSULTOR } from './dados-checklist-consultor.mjs';
import { FLUXOS } from './dados-fluxos-consultor.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(AQUI, '..');
const raizes = ['public/checklists', 'Checklists'].filter((d) => existsSync(path.join(RAIZ, d)));
const CSS = await readFile(path.join(AQUI, 'checklist-modelo/estilo.css'), 'utf8');
const JS = await readFile(path.join(AQUI, 'checklist-modelo/comportamento.js'), 'utf8');
const LOGO = `data:image/png;base64,${(await readFile(path.join(RAIZ, 'public/assets/Logo Faktory Flow.png'))).toString('base64')}`;
const FONTES = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';

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
  lista: svg('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/>'),
  ok: svg('<path d="M20 6 9 17l-5-5"/>'),
  alerta: svg('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>'),
  pendente: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  imprimir: svg('<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>'),
  limpar: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
  tema: svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
  nota: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
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

const contarPassos = (c) => [...(c.prerequisitos || []), ...(c.fluxos || c.etapas || []).flatMap((f) => f.passos), ...(c.resultado || [])];

/* ---------- Peças do HTML ---------- */
const legenda = `<div class="legenda" aria-label="Legenda da origem das informações">Origem de cada etapa: ${selo('v')} conferi no sistema ${selo('d')} vem dos roteiros, não foi executado ${selo('n')} ainda por confirmar</div>`;

function item(id, p, rotuloRes) {
  const res = p.r ? `<span class="res"><b>${rotuloRes}:</b> ${fmt(p.r)}</span>` : '';
  const campo = p.campo ? `<input class="reg" type="text" data-reg="${esc(id)}" placeholder="${esc(p.campo)}" aria-label="${esc(p.campo)}">` : '';
  return `<li class="item"><label><input type="checkbox" data-id="${esc(id)}"><span class="txt"><span class="acao">${fmt(p.t)}</span>${res}</span>${selo(p.s)}</label>${campo}</li>`;
}

function topo(subtitulo, marca) {
  return `
<header class="topo">
  <img src="${LOGO}" alt="Faktory Flow" width="120" height="36">
  <div class="marca"><strong>${esc(marca)}</strong><span>${esc(subtitulo)}</span></div>
  <div class="espaco"></div>
  <button class="btn" id="btnImprimir" type="button" title="Imprimir ou salvar em PDF">${ICONE.imprimir}<span>Imprimir</span></button>
  <button class="btn" id="btnLimpar" type="button" title="Desmarcar tudo">${ICONE.limpar}<span>Recomeçar</span></button>
  <button class="btn" id="btnTema" type="button" aria-label="Alternar tema claro/escuro" title="Alternar tema">${ICONE.tema}</button>
</header>
<div class="barra" role="progressbar" aria-label="Progresso do checklist"><i id="barraFill"></i></div>`;
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
<meta name="color-scheme" content="light dark">
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
<script>${JS}</script>
</body>
</html>
`;
}

const blocoAnotacoes = (placeholder) => `<section class="secao no-print-notas" id="s-notas"><h2>${ICONE.nota}Minhas dúvidas e anotações</h2><textarea id="notas" placeholder="${esc(placeholder)}"></textarea><p class="dica">Fica salvo só neste navegador.</p></section>`;

function checklist(c, opcoes = {}) {
  const rotuloRes = opcoes.rotuloRes || 'Resultado';
  const passos = contarPassos(c);
  const verificados = passos.filter((p) => p.s === 'v').length;
  const fluxos = c.fluxos.map((f, fi) => `
    <div class="fluxo" id="fx-${fi + 1}" data-grupo>
      <h3>${esc(f.titulo)} <span class="cont"></span></h3>
      ${f.onde ? `<div class="onde">${ICONE.mapa}<span>Onde: ${fmt(f.onde)}</span></div>` : ''}
      ${f.intro ? `<p class="intro">${fmt(f.intro)}</p>` : ''}
      <ul class="itens">${f.passos.map((p, pi) => item(`f${fi + 1}-${pi + 1}`, p, rotuloRes)).join('')}</ul>
    </div>`).join('');
  const pend = (c.naoValidado || []).map((a) => `<li>${ICONE.pendente}<span>${fmt(a)}</span></li>`).join('');

  const indice = [
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
    chips: `<span class="chip">${ICONE.lista}<b id="contagem">0 de ${passos.length}</b> etapas</span><span class="chip">${ICONE.alvo}<b>${verificados}</b> de ${passos.length} conferidas no sistema</span>`,
  })}

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
      <ul class="itens">${e.passos.map((p, pi) => item(`e${ei + 1}-${pi + 1}`, p, 'Resultado')).join('')}</ul>
    </div>`).join('');
  const trilha = CHECKLISTS.map((c, i) => `
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

<section class="secao" id="s-trilha"><h2><span class="n">4</span>Checklists da trilha</h2><p class="dica" style="margin:-4px 0 12px">Abra na ordem. O progresso aparece aqui quando você já abriu o checklist neste navegador.</p><ol class="trilha">${trilha}</ol></section>

${blocoAnotacoes('Dúvidas gerais, combinados com o supervisor, acessos que faltam…')}

<div class="concluido" id="concluido" role="status">${ICONE.ok}Onboarding concluído. Combine com seu supervisor as primeiras tarefas reais.</div>`;

  return documento({ titulo: o.titulo, chave: 'ff-estagiario:onboarding', corpo, indice, subtitulo: 'Onboarding', marca: 'Trilha do Estagiário', rodape: META.rodape });
}

/* ---------- Catálogo e manifest ---------- */
const GRUPOS = [
  { id: 'consultor', nome: 'Fluxos do consultor', desc: 'Testes funcionais ponta a ponta: faça, confira o reflexo no módulo seguinte e anote os registros.' },
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
const resumoEtapas = (c) => { const p = contarPassos(c); return { etapas: p.length, verificadas: p.filter((x) => x.s === 'v').length }; };

const consultores = [CONSULTOR, ...FLUXOS];
[ONBOARDING, ...CHECKLISTS, ...consultores].forEach((c) => conferir(c, c.arquivo));
const ids = [ONBOARDING, ...CHECKLISTS, ...consultores].map((c) => c.arquivo);
if (new Set(ids).size !== ids.length) throw new Error('arquivos de saída repetidos');

const manifest = {
  grupos: GRUPOS,
  itens: [
    ...consultores.map((c) => ({ grupo: 'consultor', id: c.id, area: c.etiqueta.replace(/^Consultor · /, ''), titulo: c.titulo, resumo: c.objetivo, arquivo: `consultores/${c.arquivo}`, chave: `ff-consultor:${c.id}`, ...resumoEtapas(c) })),
    { grupo: 'estagiario', id: 'onboarding', area: '00 · Comece por aqui', titulo: ONBOARDING.titulo, resumo: ONBOARDING.objetivo, arquivo: `estagiarios/${ONBOARDING.arquivo}`, chave: 'ff-estagiario:onboarding', ...resumoEtapas(ONBOARDING) },
    ...CHECKLISTS.map((c) => ({ grupo: 'estagiario', id: c.id, area: `${c.arquivo.slice(0, 2)} · ${c.etiqueta.split(' · ').pop()}`, titulo: c.titulo, resumo: c.resumo, arquivo: `estagiarios/${c.arquivo}`, chave: `ff-estagiario:${c.id}`, ...resumoEtapas(c) })),
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
