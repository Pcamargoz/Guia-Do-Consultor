/* Monta a base de conhecimento a partir das fontes já carregadas (função pura, sem disco).
   Regra de ouro (R-A63, regras do Harness): nada inventado. Cada bloco cita `fontes`;
   seção sem bloco com fonte → status "em-preparacao". Os únicos textos escritos aqui são rótulos de
   interface (títulos de seção, "Sei acessar: …"), nunca conteúdo do produto.
   Texto corrido sai em trechos [{ t, marca?, href? }] (texto-inline.js): nenhum HTML vem dos dados.
   Módulo com `emPreparacao` no mapa: tudo em preparação; o conteúdo montado fica em `retido` (não é servido). */
const MOTIVO_EM_PREPARACAO = 'Decisão do Lead (review v1, item 5): módulo em preparação; conteúdo semente guardado sem exibir.';
import { FONTE_MAPA, FONTE_PLANO_VIDEOS, MAPA_MODULOS, SECOES } from './mapa-modulos.js';
import { estruturarBloco, textoPuro } from './texto-inline.js';

export const STATUS = { disponivel: 'disponivel', preparacao: 'em-preparacao' };
const SELOS = { v: 'conferido-na-tela', d: 'documento', n: 'nao-conferido' };
const FONTE_SEED = 'guia:db/migrations/002_modulos_iniciais.sql';
const FONTE_MANIFEST_VIDEOS = 'guia:public/videos/manifest.json';
const FONTE_ESTAGIARIOS = 'guia:scripts/dados-checklists-estagiarios.mjs';
const FONTE_FLUXOS = 'guia:scripts/dados-fluxos-estagiarios.mjs';
const FONTE_IMPLANTACAO = 'guia:scripts/dados-checklists-implantacao.mjs';

const unicos = (lista) => [...new Set(lista.filter(Boolean))];
const naoVazio = (t) => typeof t === 'string' && t.trim() !== '';
const selo = (s) => SELOS[s] || null;

/** "3 min 08 s" → 188; "45 s" → 45; inválido → null. */
export function duracaoEmSegundos(texto) {
  if (typeof texto !== 'string') return null;
  const m = /^(?:(\d+)\s*min)?\s*(?:(\d+)\s*s)?$/.exec(texto.trim());
  if (!m || (!m[1] && !m[2])) return null;
  return Number(m[1] || 0) * 60 + Number(m[2] || 0);
}

function indexarVideos(manifest) {
  const videos = {};
  for (const trilha of manifest?.trilhas || []) for (const v of trilha.videos || []) if (!videos[v.id]) videos[v.id] = v;
  return videos;
}

/** Monta a base. `fontes` = { harness, guia } (ver fontes.js); `versao` = data AAAA-MM-DD. */
export function montarBase({ harness, guia, versao, mapa = MAPA_MODULOS }) {
  const videos = indexarVideos(guia.manifestVideos);
  const publicos = new Set(guia.publicos || []);
  const trilhas = new Map((guia.estagiarios.CHECKLISTS || []).map((c) => [c.id, { ...c, fonte: `${FONTE_ESTAGIARIOS}#${c.id}` }]));
  if (guia.estagiarios.ONBOARDING) trilhas.set('onboarding', { ...guia.estagiarios.ONBOARDING, id: 'onboarding', fluxos: guia.estagiarios.ONBOARDING.etapas || [], fonte: `${FONTE_ESTAGIARIOS}#ONBOARDING` });
  const fluxosPrincipais = new Map((guia.fluxosPrincipais || []).map((f) => [f.id, { ...f, fonte: `${FONTE_FLUXOS}#${f.id}` }]));
  const implantacoes = new Map((guia.implantacao || []).map((c) => [c.id, { ...c, fonte: `${FONTE_IMPLANTACAO}#${c.id}` }]));
  const pendencias = [];
  const caminhos = {};

  const registrarCaminho = (url, modulo, tipo) => {
    if (!url || !url.startsWith('/')) return;
    const lista = caminhos[url] || (caminhos[url] = []);
    if (!lista.some((d) => d.modulo === modulo && d.tipo === tipo)) lista.push({ modulo, tipo });
  };

  const modulos = mapa.map((def) => {
    const doHarness = (lista) => lista.filter((d) => d.modulos.some((m) => def.harness.includes(m)));
    const seed = def.banco ? guia.seed?.[def.banco] || null : null;
    const fonteSeed = seed ? `${FONTE_SEED}#${def.banco}` : null;
    const trilhasMod = def.trilha.map((id) => trilhas.get(id)).filter(Boolean);
    const fluxoPrincipal = def.fluxoPrincipal ? fluxosPrincipais.get(def.fluxoPrincipal) : null;
    const impl = def.implantacao ? implantacoes.get(def.implantacao) : null;
    const regrasHarness = doHarness(harness.regras);
    const funcionais = doHarness(harness.funcional);
    const procedimentos = doHarness(harness.procedimentos);
    const glossario = harness.glossario.filter((t) => def.harness.includes(t.modulo));
    const manuais = harness.manuais.filter((m) => m.modulos.some((x) => def.harness.includes(x)));
    const roteirosTreino = harness.roteirosTreinamento.filter((r) => r.modulos.some((x) => def.harness.includes(x)));

    for (const id of def.trilha) if (!trilhas.has(id)) pendencias.push(`${def.id}: trilha "${id}" do doc 05 não encontrada nos dados do estagiário.`);
    if (def.implantacao && !impl) pendencias.push(`${def.id}: checklist "${def.implantacao}" do doc 05 não encontrado.`);
    if (def.banco && !seed) pendencias.push(`${def.id}: módulo "${def.banco}" não está no seed do banco.`);

    /* ---------- Materiais ---------- */
    const materiais = [];
    const material = (m) => { materiais.push({ modulo: def.id, duracao_s: null, url: null, fontes: [], ...m }); return m.id; };
    const materialVideo = (id, jornada, sufixo) => {
      const v = videos[id];
      const url = `/videos/${id}.mp4`;
      const pronto = v && v.status === 'pronto' && publicos.has(url);
      if (v && !pronto) pendencias.push(`${def.id}: vídeo "${id}" está no manifest mas sem .mp4 publicado ou status ≠ pronto.`);
      const roteiro = guia.roteiros[id];
      if (pronto) for (const ext of ['mp4', 'jpg', 'vtt']) if (publicos.has(`/videos/${id}.${ext}`)) registrarCaminho(`/videos/${id}.${ext}`, def.id, 'video');
      return material({
        id: `${def.id}:${sufixo}`, tipo: 'video', jornada,
        titulo: v?.titulo || roteiro?.subtitulo || roteiro?.titulo || id,
        status: pronto ? STATUS.disponivel : STATUS.preparacao,
        url: pronto ? url : null,
        duracao_s: pronto ? duracaoEmSegundos(v.duracao) : null,
        fontes: unicos([v ? FONTE_MANIFEST_VIDEOS : null, roteiro?.fonte]),
        _video: id, _resumo: v?.resumo || null,
      });
    };

    // Guia Inicial
    if (def.videoInicial) materialVideo(def.videoInicial, 'inicial', 'video-inicial');
    else material({ id: `${def.id}:video-inicial`, tipo: 'video', jornada: 'inicial', titulo: 'Vídeo introdutório', status: STATUS.preparacao, fontes: [FONTE_PLANO_VIDEOS] });
    material({ id: `${def.id}:manual-inicial`, tipo: 'manual', jornada: 'inicial', titulo: 'Manual visual resumido', status: STATUS.preparacao, fontes: unicos([FONTE_PLANO_VIDEOS, ...manuais.map((m) => m.fonte)]) });
    for (const [i, t] of trilhasMod.entries()) {
      const pasta = '/checklists/estagiarios/';
      const url = `${pasta}${t.arquivo}`;
      const ok = publicos.has(url);
      if (ok) registrarCaminho(url, def.id, 'checklist');
      material({ id: `${def.id}:checklist-inicial${i ? `-${i + 1}` : ''}`, tipo: 'checklist', jornada: 'inicial', titulo: t.titulo, status: ok ? STATUS.disponivel : STATUS.preparacao, url: ok ? url : null, fontes: [t.fonte] });
    }
    if (fluxoPrincipal) {
      const url = `/checklists/estagiarios/${fluxoPrincipal.arquivo}`;
      const ok = publicos.has(url);
      if (ok) registrarCaminho(url, def.id, 'fluxo');
      material({ id: `${def.id}:fluxo-principal`, tipo: 'fluxo', jornada: 'inicial', titulo: fluxoPrincipal.titulo, status: ok ? STATUS.disponivel : STATUS.preparacao, url: ok ? url : null, fontes: [fluxoPrincipal.fonte] });
    }
    // Telas: cenas `tela` dos roteiros do vídeo inicial; sem ele, dos vídeos do consultor.
    const videosTelas = def.videoInicial ? [def.videoInicial] : def.videosConsultor;
    const cenasTela = videosTelas.flatMap((vid) => (guia.roteiros[vid]?.trechos || []).filter((t) => t.cena === 'tela' && t.captura).map((t) => ({ ...t, _video: vid, _fonte: `${guia.roteiros[vid].fonte}#${t.id}` })));
    const telasPublicadas = cenasTela.filter((t) => publicos.has(`/telas/${t._video}/${t.captura}.png`));
    if (cenasTela.length && telasPublicadas.length < cenasTela.length) {
      pendencias.push(`${def.id}: ${cenasTela.length - telasPublicadas.length} captura(s) de tela fora de public/telas (copiar de videos/public/telas — doc 03).`);
    }
    if (cenasTela.length || glossario.length) {
      const temTelas = glossario.length > 0 || telasPublicadas.length > 0;
      material({ id: `${def.id}:telas`, tipo: 'tela', jornada: 'inicial', titulo: 'Principais telas', status: temTelas ? STATUS.disponivel : STATUS.preparacao, url: temTelas ? `#inicial/${def.id}` : null, fontes: unicos([...glossario.map((g) => g.fonte), ...cenasTela.map((t) => guia.roteiros[t._video].fonte)]) });
    }

    // Guia do Consultor
    if (impl) {
      const url = `/checklists/consultores/${impl.arquivo}`;
      const ok = publicos.has(url);
      if (ok) registrarCaminho(url, def.id, 'checklist');
      material({ id: `${def.id}:checklist-implantacao`, tipo: 'checklist', jornada: 'consultor', titulo: impl.titulo, status: ok ? STATUS.disponivel : STATUS.preparacao, url: ok ? url : null, fontes: [impl.fonte] });
    }
    def.videosConsultor.forEach((vid, i) => materialVideo(vid, 'consultor', i ? `video-consultor-${i + 1}` : 'video-consultor'));
    if (!def.videosConsultor.length) material({ id: `${def.id}:video-consultor`, tipo: 'video', jornada: 'consultor', titulo: 'Vídeo avançado', status: STATUS.preparacao, fontes: [FONTE_PLANO_VIDEOS] });
    const cartoesRegra = def.videosConsultor.flatMap((vid) => (guia.roteiros[vid]?.trechos || []).filter((t) => t.cena === 'regra').map((t) => ({ ...t, _fonte: `${guia.roteiros[vid].fonte}#${t.id}` })));
    if (regrasHarness.length || cartoesRegra.length) {
      material({ id: `${def.id}:regras`, tipo: 'regra', jornada: 'consultor', titulo: 'Regras de negócio', status: STATUS.disponivel, url: `#consultor/${def.id}`, fontes: unicos([...regrasHarness.map((r) => r.fonte), ...cartoesRegra.map((c) => c._fonte.split('#')[0])]) });
    }
    material({ id: `${def.id}:manual-consultor`, tipo: 'manual', jornada: 'consultor', titulo: 'Manual do consultor', status: STATUS.preparacao, fontes: unicos([FONTE_PLANO_VIDEOS, ...manuais.map((m) => m.fonte)]) });

    const blocoMaterial = (id) => {
      const m = materiais.find((x) => x.id === id);
      return { tipo: m.tipo === 'video' ? 'video' : 'link', material: m.id, titulo: m.titulo, status: m.status, url: m.url, duracao_s: m.duracao_s, poster: m._video && m.url ? `/videos/${m._video}.jpg` : null, legenda: m._video && m.url && publicos.has(`/videos/${m._video}.vtt`) ? `/videos/${m._video}.vtt` : null, resumo: m._resumo || null, fontes: m.fontes };
    };

    /* ---------- Guia Inicial: 8 seções ---------- */
    const passosDe = (fluxo, fonte, soConferidos) => {
      const passos = (fluxo.passos || []).filter((p) => !soConferidos || p.s === 'v').map((p) => ({ texto: p.t, nota: p.r || null, selo: selo(p.s) }));
      return passos.length ? { tipo: 'passos', titulo: fluxo.titulo, onde: fluxo.onde || null, intro: fluxo.intro || null, passos, fontes: [fonte] } : null;
    };
    const inicial = {
      apresentacao: trilhasMod.flatMap((t) => [
        naoVazio(t.subtitulo) && { tipo: 'texto', rotulo: t.titulo, texto: t.subtitulo, fontes: [t.fonte] },
        naoVazio(t.objetivo) && { tipo: 'texto', rotulo: 'Objetivo', texto: t.objetivo, fontes: [t.fonte] },
      ]).filter(Boolean),
      video: materiais.filter((m) => m.jornada === 'inicial' && m.tipo === 'video' && m.status === STATUS.disponivel).map((m) => blocoMaterial(m.id)),
      manual: trilhasMod.flatMap((t) => (t.fluxos || []).filter((f) => !f.preparar).map((f) => passosDe(f, t.fonte, true))).filter(Boolean),
      telas: [
        ...(glossario.length ? [{ tipo: 'lista', rotulo: 'Telas do módulo (glossário do Harness)', itens: glossario.map((g) => ({ texto: g.nome, nota: g.caminho || null, selo: null, fontes: [g.fonte] })), fontes: unicos(glossario.map((g) => g.fonte)) }] : []),
        ...telasPublicadas.map((t) => ({ tipo: 'tela', titulo: t.rotulo || null, legenda: t.fala || null, url: `/telas/${t._video}/${t.captura}.png`, fontes: [t._fonte] })),
      ],
      fluxo: seed && Array.isArray(seed.fluxo) && seed.fluxo.length
        ? [{ tipo: 'fluxo', titulo: seed.fluxoDesc || null, etapas: seed.fluxo.map((e) => e.texto).filter(naoVazio), fontes: [fonteSeed] }]
        : [],
      atividade: trilhasMod.flatMap((t) => (t.fluxos || []).filter((f) => f.preparar).map((f) => passosDe(f, t.fonte, false))).filter(Boolean)
        .concat(materiais.filter((m) => m.jornada === 'inicial' && ['checklist', 'fluxo'].includes(m.tipo) && m.status === STATUS.disponivel).map((m) => blocoMaterial(m.id))),
      checklist: [],
      progresso: [],
    };
    const itensAprendizado = [];
    if (trilhasMod.length) {
      const fontesTrilha = trilhasMod.map((t) => t.fonte);
      itensAprendizado.push({ id: 'entendi', texto: `Entendi o que é o módulo ${def.titulo} e para que serve`, fontes: [FONTE_MAPA, ...fontesTrilha] });
      for (const onde of unicos(trilhasMod.flatMap((t) => (t.fluxos || []).map((f) => f.onde)))) itensAprendizado.push({ id: `acessar-${itensAprendizado.length}`, texto: `Sei acessar: ${onde}`, fontes: fontesTrilha });
      for (const t of trilhasMod) for (const f of t.fluxos || []) itensAprendizado.push({ id: `executei-${itensAprendizado.length}`, texto: `Executei: ${f.titulo}`, fontes: [t.fonte] });
      if (inicial.video.length) itensAprendizado.push({ id: 'video', texto: 'Assisti ao vídeo introdutório', fontes: inicial.video.flatMap((b) => b.fontes) });
      if (materiais.some((m) => m.jornada === 'inicial' && m.tipo === 'checklist' && m.status === STATUS.disponivel)) itensAprendizado.push({ id: 'checklist', texto: 'Concluí o checklist prático', fontes: fontesTrilha });
      inicial.checklist.push({ tipo: 'checklist-aprendizado', chave: `inicial:${def.id}`, itens: itensAprendizado.map((i) => ({ id: i.id, texto: i.texto })), fontes: unicos([FONTE_MAPA, ...itensAprendizado.flatMap((i) => i.fontes)]) });
      inicial.progresso.push({ tipo: 'progresso', chave: `inicial:${def.id}`, total: itensAprendizado.length, api: '/api/checklists-progresso', fontes: [FONTE_MAPA] });
    }

    /* ---------- Guia do Consultor: 10 seções ---------- */
    const textoSeed = (campo, rotulo) => (seed && naoVazio(seed[campo]) ? { tipo: 'texto', rotulo, texto: seed[campo], fontes: [fonteSeed] } : null);
    const listaSeed = (campo, rotulo) => (seed && Array.isArray(seed[campo]) && seed[campo].some((i) => naoVazio(i.texto))
      ? { tipo: 'lista', rotulo, itens: seed[campo].filter((i) => naoVazio(i.texto)).map((i) => ({ texto: i.texto, nota: null, selo: null, fontes: [fonteSeed] })), fontes: [fonteSeed] } : null);
    const listaChecklist = (lista, rotulo, fonte, seloFixo) => (Array.isArray(lista) && lista.length
      ? { tipo: 'lista', rotulo, itens: lista.map((i) => (typeof i === 'string' ? { texto: i, nota: null, selo: seloFixo || null, fontes: [fonte] } : { texto: i.t, nota: i.r || null, selo: seloFixo || selo(i.s), fontes: [fonte] })), fontes: [fonte] } : null);
    const idsRegras = new Set(regrasHarness.map((r) => r.id));
    const titulosRegras = new Set();
    const alertas = def.videosConsultor.flatMap((vid) => (guia.roteiros[vid]?.trechos || []).filter((t) => t.cena === 'alertas' && Array.isArray(t.itens)).map((t) => ({ ...t, _fonte: `${guia.roteiros[vid].fonte}#${t.id}` })));

    const consultor = {
      visao: [
        textoSeed('objetivo', 'Objetivo'), textoSeed('papel', 'Papel no fluxo'), textoSeed('quando', 'Quando implantar'),
        ...funcionais.filter((f) => naoVazio(f.secoes.Caminho)).map((f) => ({ tipo: 'texto', rotulo: `Caminho — ${f.titulo}`, texto: f.secoes.Caminho, fontes: [f.fonte] })),
      ].filter(Boolean),
      regras: [
        ...regrasHarness.map((r) => { titulosRegras.add(r.titulo); return { tipo: 'regra', titulo: r.titulo, texto: r.secoes.Regra || null, confirmar: r.secoes['Como confirmar na tela'] || null, confianca: r.confianca, fontes: [r.fonte] }; }),
        ...cartoesRegra.filter((c) => !idsRegras.has(c.fonte) && !titulosRegras.has(c.titulo) && (titulosRegras.add(c.titulo), true))
          .map((c) => ({ tipo: 'regra', titulo: c.titulo, texto: c.texto || null, confirmar: null, confianca: null, fontes: unicos([c._fonte, c.fonte ? `harness-id:${c.fonte}` : null]) })),
      ].filter((b) => naoVazio(b.texto)),
      fluxos: [
        ...(inicial.fluxo.length ? inicial.fluxo : []),
        ...(impl?.fluxos || []).map((f) => ({ tipo: 'etapa', titulo: f.titulo, onde: f.onde || null, intro: f.intro || null, passos_total: (f.passos || []).length, fontes: [impl.fonte] })),
      ],
      implantacao: [
        impl && naoVazio(impl.objetivo) && { tipo: 'texto', rotulo: impl.titulo, texto: impl.objetivo, fontes: [impl.fonte] },
        impl && { tipo: 'lista', rotulo: 'Blocos do roteiro de implantação', itens: (impl.fluxos || []).map((f) => ({ texto: f.titulo, nota: `${(f.passos || []).length} passos`, selo: null, fontes: [impl.fonte] })), fontes: [impl.fonte] },
        ...(impl ? materiais.filter((m) => m.id === `${def.id}:checklist-implantacao` && m.status === STATUS.disponivel).map((m) => blocoMaterial(m.id)) : []),
        textoSeed('treinamento', 'Orientação de treinamento'),
      ].filter(Boolean),
      configuracoes: [listaChecklist(impl?.prerequisitos, 'Pré-requisitos', impl?.fonte), textoSeed('prerequisito', 'Pré-requisito')].filter(Boolean),
      validacoes: [listaChecklist(impl?.resultado, 'Resultado esperado', impl?.fonte), listaSeed('checklist', 'Checklist do módulo')].filter(Boolean),
      integracoes: [textoSeed('papel', 'Relação com os outros módulos')].filter(Boolean),
      problemas: [
        listaChecklist(impl?.atencao, 'Atenção', impl?.fonte),
        ...alertas.map((a) => ({ tipo: 'lista', rotulo: 'Cuidados (vídeo)', itens: a.itens.map((t) => ({ texto: t, nota: null, selo: null, fontes: [a._fonte] })), fontes: [a._fonte] })),
        listaChecklist(impl?.naoValidado, 'A conferir na tela', impl?.fonte, 'a-conferir-na-tela'),
      ].filter(Boolean),
      videos: materiais.filter((m) => m.jornada === 'consultor' && m.tipo === 'video' && m.status === STATUS.disponivel).map((m) => blocoMaterial(m.id)),
      complementares: [
        ...materiais.filter((m) => ['checklist', 'fluxo'].includes(m.tipo) && m.status === STATUS.disponivel).map((m) => blocoMaterial(m.id)),
        ...(guia.publicos || []).filter((p) => p.startsWith('/downloads/')).map((url) => ({ tipo: 'link', titulo: 'Apostila do Consultor (PDF)', url, visibilidade: 'area:apostila', fontes: [`guia:public${url}`] })),
        ...(procedimentos.length || manuais.length || roteirosTreino.length ? [{
          tipo: 'fontes', rotulo: 'Fontes no Harness',
          itens: [
            ...procedimentos.map((p) => ({ texto: p.titulo, nota: 'Procedimento', selo: null, fontes: [p.fonte] })),
            ...manuais.map((m) => ({ texto: m.arquivo.replace(/_Timbrado\.docx$/, '').replace(/_/g, ' '), nota: 'Manual oficial', selo: null, fontes: [m.fonte] })),
            ...roteirosTreino.map((r) => ({ texto: r.arquivo.replace(/\.docx$/, ''), nota: 'Roteiro de treinamento', selo: null, fontes: [r.fonte] })),
          ],
          fontes: unicos([...procedimentos, ...manuais, ...roteirosTreino].map((x) => x.fonte)),
        }] : []),
      ],
    };

    const secoes = (jornada, blocos) => SECOES[jornada].map(([id, titulo]) => {
      const lista = (blocos[id] || []).filter(Boolean).map(estruturarBloco);
      return { id, titulo, status: lista.length ? STATUS.disponivel : STATUS.preparacao, blocos: lista, fontes: unicos(lista.flatMap((b) => b.fontes || [])) };
    });

    const materiaisLimpos = materiais.map(({ _video, _resumo, ...m }) => ({ ...m, titulo: textoPuro(m.titulo) }));
    const subtitulo = textoPuro(trilhasMod.find((t) => naoVazio(t.resumo))?.resumo || seed?.fluxoDesc || impl?.etiqueta || null);
    const jornadas = { inicial: secoes('inicial', inicial), consultor: secoes('consultor', consultor) };
    const cabecalho = {
      id: def.id,
      ordem: def.ordem,
      titulo: textoPuro(def.titulo),
      cor: seed?.cor || null,
      icone: seed?.icone || null,
      fontes: unicos([FONTE_MAPA, fonteSeed, ...trilhasMod.map((t) => t.fonte), impl?.fonte]),
    };
    if (def.emPreparacao) {
      pendencias.push(`${def.id}: em preparação por decisão do Lead (review v1, item 5); conteúdo semente guardado em "retido".`);
      const vazia = (jornada) => SECOES[jornada].map(([id, titulo]) => ({ id, titulo, status: STATUS.preparacao, blocos: [], fontes: [] }));
      return {
        ...cabecalho,
        subtitulo: null,
        em_preparacao: true,
        materiais: materiaisLimpos.map((m) => ({ ...m, status: STATUS.preparacao, url: null, duracao_s: null })),
        jornadas: { inicial: vazia('inicial'), consultor: vazia('consultor') },
        retido: { motivo: MOTIVO_EM_PREPARACAO, subtitulo, materiais: materiaisLimpos, jornadas },
      };
    }
    return { ...cabecalho, subtitulo, em_preparacao: false, materiais: materiaisLimpos, jornadas };
  });

  return { versao, gerado_de: { mapa: FONTE_MAPA, harness: 'harness:conhecimento/' }, modulos, caminhos, pendencias };
}
