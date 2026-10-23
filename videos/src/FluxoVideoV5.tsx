import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, continueRender, delayRender, interpolate, random, spring, staticFile, useCurrentFrame,
} from 'remotion';
import { noise2D } from '@remotion/noise';
import { fitTextOnNLines, measureText } from '@remotion/layout-utils';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';

// Vídeo de fluxo do Guia do Consultor. Palco 1920×1080 a 30 fps.
// Os dados vêm de src/gerado/<id>.json (scripts/preparar.mjs): cada trecho tem a fala, a cena e o tempo medido da voz.
// Linguagem visual (estudo de 23/10/2026 dos repositórios lemo-opuscar, mg-styles-15, pdoom-video e coleções de
// explicativos, ver docs/producao-de-videos.md no Harness): estilo suíço com um acento por papel, texto que entra por
// máscara (nunca fade), ícones desenhados por traço, câmera em mola mais lenta que os objetos, som em cada ação.
export const FPS = 30;

export type Caixa = { x: number; y: number; w: number; h: number } | null;
export type Trecho = {
  id: string; cena: 'abertura' | 'status' | 'regra' | 'tela' | 'alertas' | 'fechamento';
  fala: string; inicio: number; duracao: number; fala_s: number; audio: string | null;
  destaque?: number; cadeado?: boolean; etapas?: string[]; tituloCena?: string;
  n?: number; titulo?: string; texto?: string; icone?: string; fonte?: string; critica?: boolean;
  imagem?: string; caixas?: Caixa[]; foco?: number; focos?: number[]; rotulo?: string; nomes?: (string | null)[]; impacto?: number; borrar?: { x: number; y: number; w: number; h: number }[];
  itens?: string[]; topicos?: string[];
  legendas?: { texto: string; ini: number; fim: number }[] | null;
};
export type Dados = { id: string; titulo: string; subtitulo: string; trilha: string; proximo: string; icone?: string; trechos: Trecho[]; duracaoTotal: number };

// Um significado por cor, o filme inteiro: azul da marca = estado atual e foco; limão da marca = marcador (não existe
// na interface do Flow, então acha o olho em qualquer tela); laranja = cuidado; verde = concluído.
const C = {
  bg: '#F4F6F9', surface: '#FFFFFF', ink: '#131820', ink2: '#5A6474', line: '#E2E6EC',
  primary: '#3478A7', primaryEsc: '#1C4867', secondary: '#0F8B8D', ok: '#1E9E5A',
  alerta: '#E8590C', alertaTexto: '#B54708', alertaSuave: '#FFF4EC', spot: '#D5DD26', spotTinta: '#1E2A05', spotSuave: '#F6F8D4',
};
const SANS = '"Inter Variable", "Segoe UI", system-ui, sans-serif';
const MONO = '"JetBrains Mono", Consolas, monospace';
const SOMBRA_CARTAO = '0 1px 2px rgba(19,24,32,.06), 0 12px 32px rgba(19,24,32,.10)';
const SOMBRA_JANELA = '0 30px 80px rgba(19,24,32,.18)';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const E = {
  entra: Easing.bezier(0.16, 1, 0.3, 1), sai: Easing.bezier(0.7, 0, 0.84, 0),
  move: Easing.bezier(0.7, 0, 0.2, 1), linha: Easing.bezier(0.65, 0, 0.35, 1),
};
const prog = (t: number, a: number, d = 0.53, ease = E.entra) => interpolate(t, [a, a + d], [0, 1], { ...clamp, easing: ease });
const MOLA = { objeto: { stiffness: 250, damping: 23, mass: 1 }, cursor: { stiffness: 110, damping: 18, mass: 1 }, camera: { stiffness: 45, damping: 13, mass: 1 } };
const mola = (t: number, a: number, config = MOLA.objeto) => spring({ frame: Math.round((t - a) * FPS), fps: FPS, config });
const useT = () => useCurrentFrame() / FPS;
const f = (n: number) => n / FPS; // frames → segundos

// As fontes ficam no projeto (não baixam na hora do render): o primeiro quadro espera elas carregarem.
const useFontes = () => {
  const [h] = React.useState(() => delayRender('fontes'));
  React.useEffect(() => {
    Promise.all([document.fonts.load('700 40px "Inter Variable"'), document.fonts.load('500 24px "JetBrains Mono"'), document.fonts.load('600 24px "JetBrains Mono"')])
      .then(() => continueRender(h), () => continueRender(h));
  }, [h]);
};

// ---------- tipografia em movimento ----------
// Texto entra subindo de baixo da linha de base, recortado (clip-reveal).
const Revela: React.FC<{ t: number; a: number; d?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ t, a, d = f(16), children, style }) => {
  const p = prog(t, a, d);
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.12em', marginBottom: '-0.12em', ...style }}>
      <span style={{ display: 'inline-block', transform: `translateY(${(1 - p) * 115}%)` }}>{children}</span>
    </span>
  );
};
// marca (0..1): marcador limão passando por baixo das palavras, da primeira à última
const Palavras: React.FC<{ t: number; a: number; texto: string; passo?: number; marca?: number }> = ({ t, a, texto, passo = f(3), marca }) => {
  const ws = texto.split(' ');
  return (
    <>{ws.map((w, i) => {
      const enche = marca === undefined ? 0 : Math.min(1, Math.max(0, marca * ws.length - i));
      const fundo: React.CSSProperties = marca === undefined ? {} : {
        backgroundImage: 'linear-gradient(rgba(213,221,38,0.7), rgba(213,221,38,0.7))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 82%', backgroundSize: `${enche * 100}% 0.34em`,
      };
      return <React.Fragment key={i}><Revela t={t} a={a + i * passo} style={fundo}>{w}</Revela>{' '}</React.Fragment>;
    })}</>
  );
};

// Tipografia cinética: cada palavra cai no lugar vinda de cima, maior e girada, numa mola com sobra (damping 11);
// o marcador limão passa por baixo depois que todas assentam.
const PalavrasCineticas: React.FC<{ t: number; a: number; texto: string; marca?: number }> = ({ t, a, texto, marca }) => {
  const ws = texto.split(' ');
  return (
    <>{ws.map((w, i) => {
      const s = mola(t, a + i * f(3), { stiffness: 170, damping: 11, mass: 1 });
      const enche = marca === undefined ? 0 : Math.min(1, Math.max(0, marca * ws.length - i));
      return (
        <React.Fragment key={i}>
          <span style={{ display: 'inline-block', opacity: Math.min(1, s * 2), transformOrigin: '50% 100%',
            transform: `translateY(${(1 - s) * -70}px) scale(${1.5 - 0.5 * s}) rotate(${(1 - s) * (i % 2 ? 9 : -9)}deg)`,
            backgroundImage: 'linear-gradient(rgba(213,221,38,0.7), rgba(213,221,38,0.7))', backgroundRepeat: 'no-repeat', backgroundPosition: '0 85%',
            backgroundSize: `${enche * 100}% 0.32em` }}>{w}</span>{' '}
        </React.Fragment>
      );
    })}</>
  );
};

// ---------- ícones (traço, estilo lucide), desenhados pelo comprimento do traço ----------
const Ico: React.FC<{ d: string; size?: number; cor?: string; w?: number; desenho?: number }> = ({ d, size = 48, cor = C.primary, w = 2, desenho = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
    style={{ strokeDasharray: 1, strokeDashoffset: 1 - desenho }}
    dangerouslySetInnerHTML={{ __html: d.replace(/<(path|circle|rect|line|polyline|polygon)/g, '<$1 pathLength="1"') }} />
);
const ICONES: Record<string, string> = {
  carrinho: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
  cfop: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
  caixa: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  lapis: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  nota: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/>',
  alerta: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>',
  cadeado: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  aberto: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  seta: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  funil: '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  estrela: '<path d="M11.5 2.6a.6.6 0 0 1 1 0l2.6 5.3 5.8.8a.6.6 0 0 1 .4 1l-4.2 4.1 1 5.8a.6.6 0 0 1-.9.6L12 17.5l-5.2 2.7a.6.6 0 0 1-.9-.6l1-5.8L2.7 9.7a.6.6 0 0 1 .4-1l5.8-.8Z"/>',
  caminhao: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  fabrica: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1M12 18h1M7 18h1"/>',
  tarefa: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
  obra: '<path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-6h6v6"/>',
  estoque: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  ferramenta: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  compra: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
};

// ---------- fundo: papel com grade de pontos e duas manchas da cor primária em deriva lenta (loop de 30 s) ----------
// Formas da marca flutuando em três profundidades, com deriva orgânica por ruído (@remotion/noise); as mais perto
// andam mais (paralaxe). Contornos finos e baixa opacidade: dão vida sem disputar com o conteúdo.
const FORMAS = [
  { tipo: 'anel', x: 1580, y: 210, r: 150, cor: C.primary, op: 0.09, prof: 1.0 },
  { tipo: 'anel', x: 230, y: 860, r: 210, cor: C.primary, op: 0.07, prof: 0.6 },
  { tipo: 'quad', x: 1720, y: 820, r: 46, cor: C.spot, op: 0.35, prof: 1.4 },
  { tipo: 'quad', x: 140, y: 260, r: 30, cor: C.spot, op: 0.3, prof: 1.2 },
  { tipo: 'cruz', x: 1260, y: 940, r: 22, cor: C.primary, op: 0.22, prof: 0.8 },
  { tipo: 'cruz', x: 620, y: 120, r: 18, cor: C.primary, op: 0.18, prof: 0.5 },
  { tipo: 'anel', x: 980, y: 1010, r: 70, cor: C.spot, op: 0.25, prof: 1.6 },
] as const;
const Fundo: React.FC = () => {
  const t = useT();
  const w = (2 * Math.PI * t) / 30;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        {FORMAS.map((s, i) => {
          const dx = noise2D(`fx${i}`, t * 0.06, 0) * 60 * s.prof, dy = noise2D(`fy${i}`, 0, t * 0.06) * 40 * s.prof;
          const giro = t * 6 * s.prof * (i % 2 ? 1 : -1);
          const x = s.x + dx, y = s.y + dy;
          if (s.tipo === 'anel') return <circle key={i} cx={x} cy={y} r={s.r} fill="none" stroke={s.cor} strokeOpacity={s.op} strokeWidth={3} strokeDasharray="2 14" transform={`rotate(${giro} ${x} ${y})`} />;
          if (s.tipo === 'quad') return <rect key={i} x={x - s.r / 2} y={y - s.r / 2} width={s.r} height={s.r} rx={6} fill="none" stroke={s.cor} strokeOpacity={s.op * 2} strokeWidth={3} transform={`rotate(${giro} ${x} ${y})`} />;
          return <path key={i} d={`M ${x - s.r} ${y} H ${x + s.r} M ${x} ${y - s.r} V ${y + s.r}`} stroke={s.cor} strokeOpacity={s.op} strokeWidth={3} strokeLinecap="round" transform={`rotate(${giro} ${x} ${y})`} />;
        })}
      </svg>
      <AbsoluteFill style={{ backgroundImage: `radial-gradient(${C.line} 1.6px, transparent 1.6px)`, backgroundSize: '48px 48px',
        backgroundPosition: '24px 24px', maskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, #000 30%, transparent 100%)', opacity: 0.9 }} />
      <div style={{ position: 'absolute', width: 1100, height: 1100, borderRadius: '50%', left: -420 + Math.sin(w) * 60, top: -520 + Math.cos(w) * 50,
        background: 'radial-gradient(circle, rgba(52,120,167,0.10), rgba(52,120,167,0) 65%)' }} />
      <div style={{ position: 'absolute', width: 1000, height: 1000, borderRadius: '50%', right: -380 - Math.sin(w) * 50, bottom: -460 - Math.cos(w) * 60,
        background: 'radial-gradient(circle, rgba(213,221,38,0.12), rgba(213,221,38,0) 65%)' }} />
    </AbsoluteFill>
  );
};

const SomEm: React.FC<{ em: number; src: string; volume: number }> = ({ em, src, volume }) => (
  <Sequence from={Math.max(0, Math.round(em * FPS))} durationInFrames={15}><Audio src={staticFile(src)} volume={volume} /></Sequence>
);

// Sons do v5 (musica/gerar_sfx_v5.py): todos normalizados no mesmo nível, então o volume é 10^(dB/20) com dB relativos
// à voz. `pico` é o quadro do pico dentro do arquivo: o som é alinhado pelo pico (riser pelo fim, swoosh pela
// passagem), não pelo começo do arquivo, e nunca é cortado antes de acabar.
const SONS = {
  riser: { pico: 39, dur: 40 }, 'sub-boom': { pico: 1, dur: 54 }, 'swoosh-whip': { pico: 12, dur: 21 }, swoosh: { pico: 10, dur: 18 },
  'whoosh-ar': { pico: 14, dur: 24 }, 'swish-a': { pico: 4, dur: 9 }, 'swish-b': { pico: 5, dur: 9 }, 'pop-a': { pico: 0, dur: 3 }, 'pop-b': { pico: 0, dur: 3 },
  'ding-vidro': { pico: 0, dur: 42 }, 'baque-a': { pico: 0, dur: 9 }, 'baque-b': { pico: 0, dur: 9 }, clac: { pico: 0, dur: 6 }, cintilacao: { pico: 1, dur: 15 },
  'baque-tique': { pico: 0, dur: 8 },
} as const;
type NomeSom = keyof typeof SONS;
const Som: React.FC<{ em: number; nome: NomeSom; db: number }> = ({ em, nome, db }) => {
  const s = SONS[nome];
  const de = Math.round(em * FPS) - s.pico;
  return (
    <Sequence from={Math.max(0, de)} durationInFrames={s.dur + 2}>
      <Audio src={staticFile(`sfx/${nome}.wav`)} volume={10 ** (db / 20)} startFrom={de < 0 ? -de : 0} />
    </Sequence>
  );
};

// Abertura em três cortes (video-shotcraft trailer-grammar e beat-cut): três cortes secos de 9 quadros no campo de
// impacto, cada vez mais perto (1,0 / 1,6 / 2,4) com empurrão linear de 1 -> 1,04, depois 6 quadros de tinta em silêncio.
// O resto do vídeo começa no quadro 33. A camada copiada leva o `borrar` junto (dado pessoal nunca aparece).
export const ABERTURA_FRIA = 33;
const AberturaFria: React.FC<{ d: Dados }> = ({ d }) => {
  const q = useCurrentFrame();
  const r = d.trechos.find((x) => x.cena === 'tela' && x.impacto !== undefined && x.imagem) ?? d.trechos.find((x) => x.cena === 'tela' && x.imagem);
  if (!r) return <AbsoluteFill style={{ background: C.ink }} />;
  const focos = r.focos ?? [r.foco ?? 0];
  const c = r.caixas?.[focos[r.impacto ?? 0]] ?? null;
  const k = Math.floor(q / 9);
  if (k >= 3) return <AbsoluteFill style={{ background: C.ink }} />;
  const z = [1, 1.6, 2.4][k] * (1 + 0.04 * (q % 9) / 9);
  const ox = c ? c.x + c.w / 2 : 960, oy = c ? c.y + c.h / 2 : 540;
  return (
    <AbsoluteFill style={{ background: C.ink, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 1920, height: 1080, transformOrigin: `${ox}px ${oy}px`,
        transform: `translate(${(960 - ox) * Math.min(1, k)}px, ${(540 - oy) * Math.min(1, k)}px) scale(${z})` }}>
        <Img src={staticFile(r.imagem!)} style={{ width: 1920, height: 1080 }} />
        {(r.borrar ?? []).map((b, i) => (
          <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, backdropFilter: 'blur(9px)', background: 'rgba(247,248,250,0.55)' }} />
        ))}
      </div>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, rgba(19,24,32,0) 55%, rgba(19,24,32,0.45) 100%)' }} />
    </AbsoluteFill>
  );
};

// Palavra-guia gigante (video-shotcraft lead-word-zoom-assemble): a primeira palavra do título nasce enorme no centro,
// avança mais um pouco, encolhe e desliza até o lugar dela; as outras entram empurradas de 0,5em.
const TituloGuia: React.FC<{ t: number; a: number; texto: string; esquerda: number; topo: number }> = ({ t, a, texto, esquerda, topo }) => {
  const ws = texto.split(' ');
  const q = (t - a) * FPS;
  const medida = (w: string) => measureText({ text: w, fontFamily: SANS, fontSize: 112, fontWeight: 700, letterSpacing: '-0.025em', validateFontIsLoaded: false }).width;
  const larg0 = medida(ws[0]);
  if (ws.length < 2 || ws[0].length > 14) return <Palavras t={t} a={a} texto={texto} />;
  const s0 = Math.min(2.3, 1600 / larg0);
  const cresce = interpolate(q, [0, 12], [1, 1.06], { ...clamp, easing: Easing.bezier(0.25, 1, 0.5, 1) });
  const desce = interpolate(q, [12, 36], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0, 0.05, 1) });
  const escala = (s0 * cresce) * (1 - desce) + 1 * desce;
  const dx = (960 - (esquerda + larg0 / 2)) * (1 - desce), dy = (540 - (topo + 59)) * (1 - desce);
  const blur = interpolate(q, [0, 6], [8, 0], clamp);
  return (
    <>
      <span style={{ display: 'inline-block', opacity: q < 0 ? 0 : 1, transformOrigin: '50% 60%', filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
        transform: `translate(${dx}px, ${dy}px) scale(${escala})`, position: 'relative', zIndex: 2 }}>{ws[0]}</span>{' '}
      {ws.slice(1).map((w, i) => {
        const p = interpolate(q, [18 + i * 4, 30 + i * 4], [0, 1], { ...clamp, easing: Easing.bezier(0.22, 0.8, 0.36, 1) });
        return <React.Fragment key={i}><span style={{ display: 'inline-block', opacity: Math.min(1, p * 6), transform: `translateX(${(1 - p) * 0.5}em)` }}>{w}</span>{' '}</React.Fragment>;
      })}
    </>
  );
};

// ---------- abertura: logo, rótulo da trilha em mono, título palavra a palavra e o fio de acento ----------
const Abertura: React.FC<{ d: Dados; dur: number }> = ({ d, dur }) => {
  const t = useT();
  const sai = prog(t, dur - f(10), f(10), E.sai);
  const tile = mola(t, f(8));
  const fio = prog(t, f(30), f(18), E.linha);
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: 1 - sai, transform: `translateY(${-sai * 30}px)` }}>
      <Img src={staticFile('logo_faktory_flow.png')} style={{ position: 'absolute', left: 160, top: 120, height: 64, opacity: prog(t, f(6), f(14)),
        transform: `translateY(${(1 - prog(t, f(6), f(14))) * 16}px)` }} />
      <div style={{ position: 'absolute', left: 160, top: 360, display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ width: 168, height: 168, flex: '0 0 168px', borderRadius: 40, background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 24px 48px rgba(52,120,167,0.30)', transform: `scale(${0.6 + 0.4 * tile})`, opacity: Math.min(1, tile * 1.4) }}>
          <Ico d={ICONES[d.icone ?? 'carrinho'] ?? ICONES.carrinho} size={92} cor="#fff" w={1.8} desenho={prog(t, f(14), f(20), E.linha)} />
        </div>
        <div>
          <div style={{ fontFamily: MONO, fontWeight: 600, fontSize: 24, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink2,
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: C.spot, transform: `scale(${mola(t, f(10))})` }} />
            <Revela t={t} a={f(10)}>{d.trilha}</Revela>
          </div>
          <div style={{ fontSize: 112, fontWeight: 700, color: C.ink, letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: 1450 }}>
            <TituloGuia t={t} a={0} texto={d.titulo} esquerda={160 + 168 + 48} topo={360 + 51} />
          </div>
          <Som em={0} nome="sub-boom" db={-8} />
          <Som em={f(12)} nome="swish-a" db={-16} />
          <div style={{ height: 6, width: 420 * fio, background: C.primary, borderRadius: 3, margin: '34px 0 30px' }} />
          <div style={{ fontSize: 40, fontWeight: 500, color: C.ink2, letterSpacing: '-0.005em', maxWidth: 1300 }}>
            <Palavras t={t} a={f(36)} texto={d.subtitulo} passo={f(2)} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- conceito: linha de status com o "documento" que percorre a linha ----------
const STATUS = ['Em aberto', 'Faturado', 'Lib. Expedição', 'Entregue'];
const LinhaStatus: React.FC<{ bloco: Trecho[]; dur: number; adianta?: number }> = ({ bloco, dur, adianta = 0 }) => {
  const t = useT();
  const sai = prog(t, dur - f(9), f(9), E.sai);
  // posição do documento: trecho 1 parado no início; trecho 2 anda até o destaque ao longo da fala
  const t2 = bloco[1] ? Math.max(0.3, bloco[1].inicio - bloco[0].inicio - adianta) : Infinity;
  const alvo = bloco[1]?.destaque ?? 0;
  const etapas = bloco[0].etapas ?? STATUS;
  const X0 = etapas.length > 4 ? 240 : 300, X1 = 1920 - X0, passo = (X1 - X0) / (etapas.length - 1), Y = 600;
  // Documento vivo (video-shotcraft sakuga-timing-shift; lemo dark-keynote): antecipação de 8 quadros (recua 18 px e
  // se agacha), disparada em out(poly 4) por 24 quadros, passa 40 px do alvo e volta em mola, pousa achatado.
  const T0 = t2 + 0.3, T1 = T0 + f(8), T2 = T1 + f(24);
  const docX = (tt: number) => {
    if (tt < T0 || !bloco[1]) return 0;
    if (tt < T1) return -18 * prog(tt, T0, f(8), E.entra);
    const destino = alvo * passo;
    if (tt < T2) { const k = interpolate(tt, [T1, T2], [0, 1], { ...clamp, easing: Easing.out(Easing.poly(4)) }); return -18 + (destino + 40 + 18) * k; }
    return destino + 40 - 40 * mola(tt, T2, { stiffness: 250, damping: 15, mass: 1 });
  };
  const px = docX(t), vDoc = Math.abs(px - docX(t - 1 / FPS));
  const pos = Math.max(0, px / passo);
  const trava = mola(t, T2);
  const antecipa = t >= T0 && t < T1 ? prog(t, T0, f(8), E.entra) : 0;
  const pousa = t >= T2 && t < T2 + f(4) ? 1 : t >= T2 + f(4) ? 1 - mola(t, T2 + f(4)) : 0;
  const sx = 1 - 0.06 * antecipa - 0.08 * pousa + Math.min(0.3, 0.002 * vDoc), sy = 1 + 0.06 * antecipa + 0.07 * pousa - Math.min(0.1, 0.0007 * vDoc);
  const base = prog(t, f(6), f(24), E.linha);
  const comSelos = bloco.some((r) => r.cadeado);
  const atual = Math.min(etapas.length - 1, Math.floor(pos + 0.02));
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: 1 - sai }}>
      <div style={{ position: 'absolute', left: 160, top: 170, right: 160, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 64, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>
          <Palavras t={t} a={f(2)} texto={bloco[0].tituloCena ?? 'A vida do pedido de venda'} />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 500, color: C.ink2, opacity: prog(t, f(16)) }}>
          {String(atual + 1).padStart(2, '0')} / {String(etapas.length).padStart(2, '0')}
        </div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <line x1={X0} y1={Y} x2={X0 + (X1 - X0) * base} y2={Y} stroke={C.line} strokeWidth={8} strokeLinecap="round" />
        <line x1={X0} y1={Y} x2={X0 + passo * pos} y2={Y} stroke={C.primary} strokeWidth={8} strokeLinecap="round" />
        {etapas.map((s, i) => {
          const a = f(12) + i * f(5);
          const ativo = pos >= i - 0.02;
          // o traço do círculo desenha; o miolo enche quando o documento chega no status
          const anel = prog(t, a, f(10), E.linha), cheio = interpolate(pos, [i - 0.25, i], [0, 1], clamp) * prog(t, a + f(10), f(6));
          return (
            <g key={s}>
              <circle cx={X0 + passo * i} cy={Y} r={30} fill={C.surface} stroke={ativo ? C.primary : C.line} strokeWidth={6} pathLength={1}
                strokeDasharray={1} strokeDashoffset={1 - anel} transform={`rotate(-90 ${X0 + passo * i} ${Y})`} />
              <circle cx={X0 + passo * i} cy={Y} r={16 * cheio * (1 + 0.35 * Math.sin(Math.PI * cheio))} fill={C.primary} />
              {/* onda de ativação: dois anéis que se abrem quando o status acende */}
              {cheio > 0 && cheio < 1 && [0, 0.35].map((d) => {
                const k = Math.max(0, Math.min(1, (cheio - d) / (1 - d)));
                return <circle key={d} cx={X0 + passo * i} cy={Y} r={30 + 70 * k} fill="none" stroke={d ? C.spot : C.primary} strokeOpacity={0.6 * (1 - k)} strokeWidth={6 * (1 - k) + 1} />;
              })}
              {ativo && i === atual && <circle cx={X0 + passo * i} cy={Y} r={44} fill="none" stroke={C.primary} strokeOpacity={0.18} strokeWidth={10} />}
            </g>
          );
        })}
      </svg>
      {etapas.map((s, i) => {
        const ativo = pos >= i - 0.02;
        return (
          <div key={s} style={{ position: 'absolute', left: X0 + passo * i, top: Y + 64, transform: 'translateX(-50%)', whiteSpace: 'nowrap',
            fontSize: 36, fontWeight: 600, color: ativo ? C.ink : C.ink2, opacity: ativo ? 1 : 0.35 + 0.65 * 0 }}>
            <Revela t={t} a={f(18) + i * f(5)}>{s}</Revela>
          </div>
        );
      })}
      {/* o documento que percorre a linha: motivo recorrente do vídeo */}
      {bloco[1] && <Som em={T1 + f(4)} nome="swoosh" db={-14} />}
      {bloco[1] && <Som em={T2} nome="baque-a" db={-12} />}
      {vDoc > 12 && (
        <svg width={1920} height={1080} style={{ position: 'absolute', pointerEvents: 'none' }}>
          {[-28, -18, -8, 0, 8, 18, 28].map((dy, i) => (
            <line key={i} x1={X0 + px - 40 - (i % 2 ? 12 : 0)} y1={Y - 74 + dy} x2={X0 + px - 40 - 1.6 * vDoc * (i % 3 ? 0.8 : 1)} y2={Y - 74 + dy}
              stroke={C.primary} strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
          ))}
        </svg>
      )}
      <div style={{ position: 'absolute', left: X0 + px, top: Y - 112, transform: `translateX(-50%) scale(${mola(t, f(20))}) scale(${sx}, ${sy})`, transformOrigin: '50% 100%',
        width: 64, height: 76, borderRadius: 12, background: C.surface, boxShadow: SOMBRA_CARTAO, border: `2px solid ${C.primary}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', filter: vDoc > 8 ? `blur(${Math.min(3, 0.02 * vDoc).toFixed(2)}px)` : undefined }}>
        <Ico d={ICONES.cfop} size={36} cor={C.primary} />
      </div>
      {comSelos && <div style={{ position: 'absolute', left: X0, top: Y - 250, transform: `translateX(-20%) translateY(${(1 - mola(t, 1.0)) * 20}px)`, opacity: mola(t, 1.0),
        display: 'flex', alignItems: 'center', gap: 12, background: '#E8F6EE', color: C.ok, borderRadius: 14, padding: '12px 22px', fontSize: 28, fontWeight: 600, boxShadow: SOMBRA_CARTAO }}>
        <Ico d={ICONES.aberto} size={32} cor={C.ok} desenho={prog(t, 1.0, f(12), E.linha)} /> Pode editar tudo
      </div>}
      {bloco[1]?.cadeado && (
        <div style={{ position: 'absolute', left: X0 + passo * 2, top: Y - 250, transform: `translateX(-50%) translateY(${(1 - trava) * 20}px)`, opacity: trava,
          display: 'flex', alignItems: 'center', gap: 12, background: C.alertaSuave, color: C.alertaTexto, borderRadius: 14, padding: '12px 22px', fontSize: 28, fontWeight: 600,
          boxShadow: SOMBRA_CARTAO, borderLeft: `6px solid ${C.alerta}` }}>
          <Ico d={ICONES.cadeado} size={32} cor={C.alerta} desenho={prog(t, T2, f(12), E.linha)} /> Daqui em diante: só visualizar
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- cartão de regra: numeral gigante atrás, ícone desenhado, título por máscara e marcador limão ----------
// draw-svg-trace (video-shotcraft): o contorno do cartão se desenha em 24 quadros; o fundo e a sombra entram depois,
// e o conteúdo começa quando o traço está quase fechado.
// Slam da regra crítica (video-shotcraft slam-entrance B, impact-feedback): só na regra com `critica`. O cartão paira
// colado na lente (2,75 -> 2,6, desfocado, 5°), cai em in(quad) até 0,965 no quadro 15 e assenta em mola 260/14; no
// impacto, anel de choque de 120 -> 1500 px, 14 lascas, tremor de 18 px que seca em 5 quadros e flash de 2 quadros.
const IMPACTO_SLAM = f(15);
const Choque: React.FC<{ q: number; cx: number; cy: number }> = ({ q, cx, cy }) => {
  if (q < 0 || q > 18) return null;
  const abre = interpolate(q, [0, 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) }), some = interpolate(q, [0, 16], [1, 0], clamp);
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', pointerEvents: 'none' }}>
      <circle cx={cx} cy={cy} r={60 + 690 * abre} fill="none" stroke="#fff" strokeOpacity={some} strokeWidth={9 - 7.5 * abre}
        style={{ filter: 'drop-shadow(0 0 18px rgba(213,221,38,0.8))' }} />
      {Array.from({ length: 14 }, (_, i) => {
        const ang = random(`lasca-a-${i}`) * 2 * Math.PI, dist = 280 + 300 * random(`lasca-d-${i}`);
        const k = interpolate(q, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
        const x = cx + Math.cos(ang) * dist * k, y = cy + Math.sin(ang) * dist * k, tam = 10 + 14 * random(`lasca-t-${i}`);
        return <rect key={i} x={x - tam / 2} y={y - tam / 4} width={tam} height={tam / 2} rx={2} fill={i % 2 ? C.primary : C.spot}
          opacity={interpolate(q, [0, 14], [1, 0], clamp)} transform={`rotate(${q * 25 * (i % 2 ? 1 : -1) + i * 30} ${x} ${y})`} />;
      })}
    </svg>
  );
};

const Regra: React.FC<{ r: Trecho; dur: number }> = ({ r, dur }) => {
  const t0 = useT();
  const slam = !!r.critica;
  const traco = slam ? 1 : prog(t0, 0, f(24), E.linha);
  const t = t0 - (slam ? IMPACTO_SLAM + f(3) : f(14)); // o conteúdo do cartão anda depois do traço (ou do impacto)
  const sai = prog(t0, dur - f(9), f(9), E.sai);
  const cheio = slam ? 1 : prog(t0, f(18), f(12));
  const marca = prog(t, f(30), f(10), Easing.linear);
  // maior tamanho que cabe em duas linhas na coluna do cartão (sem estourar), entre 46 e 72 px
  const tamTitulo = React.useMemo(() => Math.max(46, fitTextOnNLines({ text: r.titulo ?? '', maxLines: 2, maxBoxWidth: 1000, fontFamily: SANS,
    fontWeight: 700, letterSpacing: '-0.02em', maxFontSize: 72, validateFontIsLoaded: false }).fontSize), [r.titulo]);
  const num = mola(t0 - (slam ? IMPACTO_SLAM : 0), 0, { stiffness: 90, damping: 14, mass: 1 }); // o numeral gigante atravessa a tela e freia
  // pose do cartão no slam
  const q = t0 * FPS;
  let esc = 1, borra = 0, opac = 1, giro = 0;
  if (slam) {
    if (q < 9) { esc = 2.75 - 0.15 * (q / 9); borra = 10; opac = 0.55; giro = 5; }
    else if (q < 15) { const k = Easing.in(Easing.quad)((q - 9) / 6); esc = 2.6 + (0.965 - 2.6) * k; borra = 10 * (1 - k); opac = 0.55 + 0.45 * k; giro = 5 * (1 - k); }
    else esc = 0.965 + 0.035 * mola(t0, IMPACTO_SLAM, { stiffness: 260, damping: 14, mass: 1 });
  }
  const qi = q - 15, tremor = slam && qi >= 0 && qi < 5 ? 18 * Math.exp(-qi / 1.7) : 0;
  const ang = random(`tremor-regra-${Math.floor(q)}`) * 2 * Math.PI;
  return (
    <AbsoluteFill style={{ fontFamily: SANS, transform: tremor ? `translate(${Math.cos(ang) * tremor * 0.6}px, ${Math.sin(ang) * tremor}px)` : undefined }}>
      {slam ? <><Som em={IMPACTO_SLAM} nome="sub-boom" db={-6} /><Som em={IMPACTO_SLAM} nome="clac" db={-8} /></> : <SomEm em={f(2)} src="sfx/tick.wav" volume={0.22} />}
      <div style={{ position: 'absolute', left: 120, top: 120, fontSize: 340, fontWeight: 300, color: C.line, letterSpacing: '-0.04em', lineHeight: 1,
        opacity: Math.min(1, num * 1.5) * (1 - sai), transform: `translateX(${(1 - num) * -520}px) scale(${1.25 - 0.25 * num})`, transformOrigin: 'left top' }}>
        {String(r.n ?? 1).padStart(2, '0')}
      </div>
      <div style={{ position: 'absolute', left: 280, top: 300, width: 1360, background: `rgba(255,255,255,${cheio})`, borderRadius: 28, padding: '60px 68px', display: 'flex', gap: 56,
        alignItems: 'flex-start', boxShadow: `0 1px 2px rgba(19,24,32,${0.06 * cheio}), 0 12px 32px rgba(19,24,32,${0.1 * cheio})`,
        opacity: (1 - sai) * opac, transform: `translateY(${-sai * 20}px) scale(${esc}) rotate(${giro}deg)`, filter: borra > 0.2 ? `blur(${borra}px)` : undefined }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', opacity: slam ? (q < 15 ? 1 : Math.max(0.15, 1 - (q - 15) / 10)) : 1 - cheio * 0.85 }}>
          <rect x={1} y={1} width="calc(100% - 2px)" height="calc(100% - 2px)" rx={28} fill="none" stroke={C.primary} strokeWidth={3}
            pathLength={1} strokeDasharray={1} strokeDashoffset={1 - traco} />
        </svg>
        <div style={{ width: 168, height: 168, flex: '0 0 168px', borderRadius: 36, background: '#EAF2F8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Ico d={ICONES[r.icone ?? 'cfop'] ?? ICONES.cfop} size={96} cor={C.primary} w={1.7} desenho={prog(t, f(8), f(16), E.linha)} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.primary, marginBottom: 18 }}>
            <Revela t={t} a={f(6)}>Regra {String(r.n ?? 1).padStart(2, '0')}</Revela>
          </div>
          <div style={{ fontSize: tamTitulo, fontWeight: 700, color: C.ink, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            <PalavrasCineticas t={t} a={f(8)} texto={r.titulo ?? ''} marca={marca} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 450, color: '#2C3644', marginTop: 24, lineHeight: 1.4, opacity: prog(t, f(22), f(14)),
            transform: `translateY(${(1 - prog(t, f(22), f(16))) * 14}px)` }}>{r.texto}</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: C.ink2, marginTop: 30, paddingTop: 14, borderTop: `1px solid ${C.line}`, opacity: prog(t, f(34), f(14)) }}>
            FONTE · {r.fonte}
          </div>
        </div>
      </div>
      {slam && <Choque q={q - 15} cx={960} cy={560} />}
      {slam && q >= 15 && q < 17 && <AbsoluteFill style={{ background: '#fff', opacity: 0.5 }} />}
    </AbsoluteFill>
  );
};

// ---------- tela com câmera, destaque e cursor ----------
const S0 = 0.76; // escala da captura no palco
const BARRA = 64; // barra do aplicativo em volta do print (px da captura)
const OX = (1920 - 1920 * S0) / 2, OY = 112;
const Z = 1.3; // zoom do push-in: a lupa faz a ampliação, a câmera mantém o contexto
type Cam = { tx: number; ty: number; z: number };
const camPara = (c: Caixa | undefined): Cam => {
  if (!c) return { tx: 0, ty: 0, z: 1 };
  const fx = c.x + c.w / 2, fy = c.y + c.h / 2;
  const tx = Math.min(0, Math.max(1920 - Z * 1920, 960 - Z * fx));
  const ty = Math.min(0, Math.max(1080 - Z * 1080, 540 - Z * fy));
  return { tx, ty, z: Z };
};
// Linha do tempo dos focos de uma tela: 0,7 s de visão geral; depois cada foco divide o resto da fala.
export const tempoDosFocos = (r: Trecho) => {
  const caixas = r.caixas ?? [];
  const focos = (r.focos ?? [r.foco ?? 0]).filter((i) => caixas[i]);
  const ini = 0.7, fim = Math.max(ini + 1, r.fala_s);
  const fatia = (fim - ini) / Math.max(1, focos.length);
  return { caixas, focos, ini, fatia };
};
const centro = (c: Caixa | undefined) => (c ? { x: c.x + c.w / 2, y: c.y + c.h / 2 } : null);

// Tela v3 (video-shotcraft: cursor-flyover, scanline-annotate-focus, speed-ramp-freeze; lemo-opuscar: Living Screencast).
// - Câmera voa entre focos em 20 quadros (bezier .55,0,.18,1), recua 8% no meio do voo ("hop"), ganha desfoque pela
//   velocidade real (só acima de 8 px por quadro, no máximo 8 px) e recua para a visão geral quando a voz termina.
// - O cursor sai 2 quadros antes da câmera e chega 6 antes; o clique cai com a câmera já parada.
// - O foco é marcado por cantos em L que fecham em mola (15/210) e, se o roteiro trouxer `nomes`, por um rótulo mono
//   digitado (2,2 caracteres por quadro) com o nome do campo como aparece na tela.
// - `impacto` (índice do foco) marca o momento mais importante do vídeo: flash, punch de zoom e círculo de marcador.
const VOO = Easing.bezier(0.55, 0, 0.18, 1);
const FIM_VOO = f(20);
const CHEGA_GOLPE = 0.6; // s depois de a câmera parar no foco do impacto
const fatorCrash = (q: number, zAlvo: number) => {
  if (q < 0) return 1;
  const pre = interpolate(q, [0, 6], [0, -0.03], { ...clamp, easing: Easing.out(Easing.quad) });
  const vai = interpolate(q, [6, 12], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const volta = interpolate(q, [57, 75], [0, 1], { ...clamp, easing: E.move });
  return (1 + pre) * (1 + (zAlvo / Z - 1) * vai * (1 - volta));
};
const camNoTempo = (r: Trecho, tt: number, focos: number[], caixas: Caixa[], ini: number, fatia: number, adianta: number): Cam => {
  const idx = Math.min(focos.length - 1, Math.max(0, Math.floor((tt - ini) / fatia)));
  const tc = ini + idx * fatia + f(6);
  const c0 = idx === 0 ? { tx: 0, ty: 0, z: 1 } : camPara(caixas[focos[idx - 1]]), c1 = camPara(caixas[focos[idx]]);
  const k = interpolate(tt, [tc, tc + FIM_VOO], [0, 1], { ...clamp, easing: VOO });
  const hop = 1 - 0.08 * Math.sin(Math.PI * k);
  const drift = 1 + Math.min(0.012, 0.004 * Math.max(0, tt - tc - 1.2));
  // impacto: punch de zoom (+12% em 6 quadros, volta em 5) logo depois de os cantos fecharem
  // crash zoom com freio (video-shotcraft crash-zoom-punch): recua 3% em 6 quadros, avança em 6 quadros (in cubic)
  // até cobrir o campo, segura pelo menos 45 quadros e volta em 18; o tremor da chegada fica na janela (Tela)
  const c = caixas[focos[idx]];
  const golpe = r.impacto === idx && c ? tc + FIM_VOO + CHEGA_GOLPE : Infinity;
  const crash = Number.isFinite(golpe) && c ? fatorCrash((tt - golpe) * FPS + 12, Math.min(1.8, Math.max(1.6, (0.7 * 1920) / (c.w + 40)))) : 1;
  const m = hop * drift * crash;
  let cam = { tx: 960 * (1 - m) + m * (c0.tx + (c1.tx - c0.tx) * k), ty: 540 * (1 - m) + m * (c0.ty + (c1.ty - c0.ty) * k), z: m * (c0.z + (c1.z - c0.z) * k) };
  // recuo final para a visão geral quando a voz da tela termina
  const kr = interpolate(tt, [r.fala_s - adianta, r.fala_s - adianta + f(24)], [0, 1], { ...clamp, easing: E.move });
  cam = { tx: cam.tx * (1 - kr), ty: cam.ty * (1 - kr), z: cam.z + (1 - cam.z) * kr };
  return cam;
};

const Cantos: React.FC<{ c: NonNullable<Caixa>; t: number; a: number; z: number }> = ({ c, t, a, z }) => {
  const s = mola(t, a, { stiffness: 210, damping: 15, mass: 1 });
  if (t < a) return null;
  const off = (76 * (1 - s)) / z, braco = (26 + 14 * (1 - s)) / z, esp = 4 / z, pad = 8 / z;
  const L = (x: number, y: number, sx: number, sy: number, k: number) => (
    <div key={k} style={{ position: 'absolute', left: x, top: y, width: braco, height: braco, opacity: Math.min(1, s * 1.4),
      borderLeft: sx < 0 ? `${esp}px solid ${C.primary}` : undefined, borderRight: sx > 0 ? `${esp}px solid ${C.primary}` : undefined,
      borderTop: sy < 0 ? `${esp}px solid ${C.primary}` : undefined, borderBottom: sy > 0 ? `${esp}px solid ${C.primary}` : undefined,
      transform: `translate(${sx * off}px, ${sy * off}px)` }} />
  );
  const x0 = c.x - pad, y0 = c.y - pad, x1 = c.x + c.w + pad - braco, y1 = c.y + c.h + pad - braco;
  return <>{[L(x0, y0, -1, -1, 0), L(x1, y0, 1, -1, 1), L(x0, y1, -1, 1, 2), L(x1, y1, 1, 1, 3)]}</>;
};

const Rotulo: React.FC<{ c: NonNullable<Caixa>; t: number; a: number; z: number; texto: string }> = ({ c, t, a, z, texto }) => {
  const n = Math.max(0, Math.floor((t - a) * FPS * 2.2));
  if (n <= 0) return null;
  const acima = c.y > 70;
  return (
    <div style={{ position: 'absolute', left: c.x - 8 / z, [acima ? 'top' : 'top']: acima ? c.y - 52 / z : c.y + c.h + 14 / z, fontFamily: MONO, fontSize: 20 / z,
      fontWeight: 600, color: '#fff', background: C.ink, borderRadius: 8 / z, padding: `${6 / z}px ${12 / z}px`, whiteSpace: 'nowrap', boxShadow: SOMBRA_CARTAO }}>
      <span style={{ color: C.spot }}>›</span> {texto.slice(0, n)}{n < texto.length ? <span style={{ opacity: 0.6 }}>▍</span> : null}
    </div>
  );
};

// Tela v4: o sistema numa janela de aplicativo que entra em 3D e inclina na direção do foco; cada campo em foco salta
// para fora numa lupa ampliada ligada ao campo por uma linha (padrão das melhores demos de produto). A câmera dá menos
// zoom (a lupa faz a ampliação) e mantém o contexto da tela à vista.
const Lupa: React.FC<{ r: Trecho; c: NonNullable<Caixa>; t: number; a: number; some: number; escala: number; esq: number; cam: Cam; nome?: string | null }> = (
  { r, c, t, a, some, escala, esq, cam, nome }) => {
  if (t < a) return null;
  // nada de lupa sobre área borrada (dado pessoal): a lupa mostra o print original
  const toca = (r.borrar ?? []).some((b) => b.x < c.x + c.w + 18 && b.x + b.w > c.x - 18 && b.y < c.y + c.h + 18 && b.y + b.h > c.y - 18);
  if (toca) return null;
  const PAD = 18, rw = c.w + 2 * PAD, rh = c.h + 2 * PAD;
  const L = Math.min(2.2, 640 / rw, 240 / rh);
  if (L < 1.25) return null; // área grande demais: a câmera já mostra bem
  const lw = rw * L, lh = rh * L;
  // centro do campo no palco
  const fx = esq + escala * (cam.tx + cam.z * (c.x + c.w / 2)), fy = OY + escala * (BARRA + cam.ty + cam.z * (c.y + c.h / 2));
  const fw = escala * cam.z * c.w;
  const lado = fx < 960 ? 1 : -1;
  const lx = Math.min(1880 - lw, Math.max(40, lado > 0 ? fx + fw / 2 + 70 : fx - fw / 2 - 70 - lw));
  const ly = Math.min(1080 - 170 - lh, Math.max(150, fy - lh / 2 - 60));
  const p = mola(t, a, { stiffness: 180, damping: 14, mass: 1 });
  const vis = Math.min(1, p * 1.6) * (1 - some);
  const linha = prog(t, a, f(10), E.linha) * (1 - some);
  const ax = lado > 0 ? lx : lx + lw, ay = ly + lh / 2; // ponto da lupa mais perto do campo
  const bx = fx + (lado > 0 ? fw / 2 : -fw / 2);
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <path d={`M ${bx} ${fy} C ${bx + lado * 60} ${fy}, ${ax - lado * 60} ${ay}, ${ax} ${ay}`} fill="none" stroke={C.primary} strokeWidth={3}
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - linha} strokeLinecap="round" />
        <circle cx={bx} cy={fy} r={7 * linha} fill={C.primary} />
        <circle cx={bx} cy={fy} r={14 * linha} fill="none" stroke={C.primary} strokeOpacity={0.3} strokeWidth={4} />
      </svg>
      <div style={{ position: 'absolute', left: lx, top: ly, width: lw, height: lh, borderRadius: 18, overflow: 'hidden', opacity: vis,
        transformOrigin: lado > 0 ? 'left center' : 'right center',
        transform: `perspective(1600px) rotateY(${lado * (1 - p) * -28}deg) scale(${0.35 + 0.65 * p}) rotate(${lado * -1.2 * p}deg)`,
        boxShadow: '0 34px 70px rgba(19,24,32,0.30), 0 0 0 3px #fff, 0 0 0 6px rgba(52,120,167,0.9)',
        backgroundImage: `url(${staticFile(r.imagem!)})`, backgroundSize: `${1920 * L}px ${1080 * L}px`, backgroundPosition: `${-(c.x - PAD) * L}px ${-(c.y - PAD) * L}px` }} />
      {nome && (
        <div style={{ position: 'absolute', left: lx + 6, top: ly - 50, opacity: vis, transform: `translateY(${(1 - p) * 14}px)`, fontFamily: MONO, fontSize: 22, fontWeight: 600,
          color: '#fff', background: C.ink, borderRadius: 10, padding: '8px 16px', whiteSpace: 'nowrap', boxShadow: SOMBRA_CARTAO }}>
          <span style={{ color: C.spot }}>›</span> {nome.slice(0, Math.max(0, Math.floor((t - a - f(4)) * FPS * 2.2)))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Tela: React.FC<{ r: Trecho; dur: number; cursorIni?: { x: number; y: number } | null; adianta?: number }> = ({ r, cursorIni, adianta = 0 }) => {
  const t = useT();
  const base = tempoDosFocos(r);
  const { caixas, focos } = base;
  // com a abertura de capítulo, a cena começa `adianta` segundos depois da voz: os focos andam juntos com a fala
  const ini = Math.max(0.25, base.ini - adianta), fatia = Math.max(0.8, (Math.max(base.ini + 1, r.fala_s) - adianta - ini) / Math.max(1, focos.length));
  const idx = Math.min(focos.length - 1, Math.max(0, Math.floor((t - ini) / fatia)));
  const tc = ini + idx * fatia + f(6); // início do voo da câmera para o foco atual
  const atual = caixas[focos[idx]];
  const anterior = idx === 0 ? undefined : caixas[focos[idx - 1]];
  const cam = camNoTempo(r, t, focos, caixas, ini, fatia, adianta);
  const antes = camNoTempo(r, t - 1 / FPS, focos, caixas, ini, fatia, adianta);
  // o zoom pesa pouco na velocidade: o punch do impacto não deve borrar a tela
  const vel = Math.hypot(cam.tx - antes.tx, cam.ty - antes.ty) + Math.abs(cam.z - antes.z) * 250;
  const desfoque = vel > 8 ? Math.min(8, (vel - 8) * 0.09) : 0;
  // cursor: sai 2 quadros antes da câmera, chega 6 antes, em arco
  const p0 = centro(anterior) ?? cursorIni ?? { x: 1180, y: 760 };
  const p1 = centro(atual) ?? p0;
  const kc = interpolate(t, [tc - f(2), tc + FIM_VOO - f(6)], [0, 1], { ...clamp, easing: VOO });
  const cx = p0.x + (p1.x - p0.x) * kc, cy = p0.y + (p1.y - p0.y) * kc - Math.sin(kc * Math.PI) * 36;
  const tClique = (i: number) => ini + i * fatia + f(6) + FIM_VOO + f(6);
  const clique = t - tClique(idx);
  const trava = tc + FIM_VOO; // a câmera parou: cantos fecham
  const fimFala = r.fala_s - adianta;
  const spot = atual ? prog(t, trava, f(12), E.linha) * (1 - interpolate(t, [fimFala, fimFala + f(12)], [0, 1], clamp)) : 0;
  const segs = (r.rotulo ?? '').split('›').map((s) => s.trim()).filter(Boolean);
  const zt = cam.z;
  const imp = r.impacto === idx ? trava + CHEGA_GOLPE : Infinity;
  const flash = t >= imp && t < imp + f(3) ? 0.55 : 0;
  // tremor da chegada do crash: 14 px que secam em 6 quadros, direção determinística
  const qg = (t - imp) * FPS, amp = qg >= 0 && qg < 6 ? 14 * Math.exp(-qg / 1.8) : 0, angT = random(`tremor-tela-${r.id}-${Math.floor(qg)}`) * 2 * Math.PI;
  // inclinação de curva: a janela inclina para o lado do voo (média da velocidade horizontal dos últimos quadros)
  const vx = [1, 2, 3, 4].reduce((s, k) => s + (camNoTempo(r, t - (k - 1) / FPS, focos, caixas, ini, fatia, adianta).tx - camNoTempo(r, t - k / FPS, focos, caixas, ini, fatia, adianta).tx), 0) / 4;
  // o crash do impacto também muda a câmera: ali a janela fica reta (a inclinação é só dos voos entre focos)
  const noCrash = Number.isFinite(imp) && t > imp - 0.6 && t < imp + 2.6;
  const rotZ = noCrash || Math.abs(vx) < 4 ? 0 : Math.max(-2.2, Math.min(2.2, -0.035 * vx));
  const circulo = Number.isFinite(imp) ? prog(t, imp + f(4), f(10), E.linha) : 0;
  // janela em 3D: entra inclinada vindo de baixo, assenta em mola e depois inclina de leve na direção do cursor
  const e = mola(t, 0, { stiffness: 110, damping: 15, mass: 1 });
  const escala = S0 * (0.9 + 0.1 * e);
  const esq = (1920 - 1920 * escala) / 2;
  const rx = 22 * (1 - e) + 2.2 * ((cy - 540) / 540) * e, ry = -18 * (1 - e) - 3 * ((cx - 960) / 960) * e;
  // a lupa some antes do próximo voo da câmera
  const proxVoo = ini + (idx + 1) * fatia + f(6);
  const someLupa = Math.max(prog(t, proxVoo - f(8), f(8), E.sai), interpolate(t, [fimFala, fimFala + f(10)], [0, 1], clamp));
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      {focos.map((_, i) => <SomEm key={`c${i}`} em={tClique(i)} src="sfx/clique.wav" volume={0.3} />)}
      {focos.map((_, i) => <SomEm key={`l${i}`} em={ini + i * fatia + f(6) + FIM_VOO + 0.15} src="sfx/tick.wav" volume={0.16} />)}
      {r.impacto !== undefined && focos[r.impacto] !== undefined && (
        <><Som em={ini + r.impacto * fatia + f(6) + FIM_VOO + CHEGA_GOLPE - f(10)} nome="whoosh-ar" db={-14} />
          <Som em={ini + r.impacto * fatia + f(6) + FIM_VOO + CHEGA_GOLPE} nome="sub-boom" db={-6} />
          <Som em={ini + r.impacto * fatia + f(6) + FIM_VOO + CHEGA_GOLPE} nome="clac" db={-10} /></>
      )}
      {segs.length > 0 && (
        <div style={{ position: 'absolute', top: 40, left: OX, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(24px)', border: '1px solid rgba(19,24,32,.08)', borderRadius: 999, padding: '10px 22px', boxShadow: SOMBRA_CARTAO,
          fontFamily: MONO, fontSize: 24, fontWeight: 500, color: C.ink, whiteSpace: 'nowrap', opacity: prog(t, f(6), f(10)),
          transform: `translateY(${(1 - mola(t, f(4))) * -30}px)` }}>
          {segs.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: C.ink2, opacity: prog(t, f(10) + i * f(6), f(8)), margin: '0 8px' }}>›</span>}
              <Revela t={t} a={f(8) + i * f(6)} style={{ color: i === segs.length - 1 ? C.primary : C.ink }}>{s}</Revela>
            </React.Fragment>
          ))}
        </div>
      )}
      <AbsoluteFill style={{ perspective: 2600, perspectiveOrigin: '50% 40%' }}>
        <div style={{ position: 'absolute', left: esq, top: OY + 160 * (1 - e), width: 1920 * escala, height: (1080 + BARRA) * escala, opacity: Math.min(1, e * 1.8),
          transform: `translate(${Math.cos(angT) * amp}px, ${Math.sin(angT) * amp}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rotZ}deg)`, transformOrigin: '50% 50%' }}>
          <div style={{ position: 'absolute', width: 1920, height: 1080 + BARRA, transform: `scale(${escala})`, transformOrigin: '0 0', borderRadius: 26, overflow: 'hidden',
            boxShadow: SOMBRA_JANELA, background: '#fff', border: '1px solid rgba(19,24,32,0.10)' }}>
            {/* barra do aplicativo */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: BARRA, background: '#EEF1F5', borderBottom: '1px solid rgba(19,24,32,0.08)',
              display: 'flex', alignItems: 'center', gap: 14, padding: '0 28px' }}>
              {['#E5726B', '#E9B949', '#5DBB6A'].map((cor) => <div key={cor} style={{ width: 18, height: 18, borderRadius: '50%', background: cor, opacity: 0.85 }} />)}
              <div style={{ marginLeft: 640, display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 12, padding: '8px 26px', fontFamily: MONO,
                fontSize: 22, color: C.ink2, border: '1px solid rgba(19,24,32,0.06)' }}>
                <Ico d={ICONES.cadeado} size={22} cor={C.ink2} /> Faktory Flow{segs[0] ? ` · ${segs[0]}` : ''}
              </div>
            </div>
            <div style={{ position: 'absolute', top: BARRA, width: 1920, height: 1080, overflow: 'hidden', filter: desfoque > 0.3 ? `blur(${desfoque.toFixed(2)}px)` : undefined }}>
              <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.z})`, transformOrigin: '0 0' }}>
                <Img src={staticFile(r.imagem!)} style={{ width: 1920, height: 1080 }} />
                {(r.borrar ?? []).map((b, i) => (
                  <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, backdropFilter: 'blur(9px)', background: 'rgba(247,248,250,0.55)' }} />
                ))}
                {atual && spot > 0 && (
                  <div style={{ position: 'absolute', left: atual.x - 8 / zt, top: atual.y - 8 / zt, width: atual.w + 16 / zt, height: atual.h + 16 / zt, borderRadius: 10 / zt,
                    background: 'rgba(52,120,167,0.075)', boxShadow: `0 0 0 4000px rgba(19,24,32,${0.3 * spot})` }} />
                )}
                {atual && <Cantos c={atual} t={t} a={trava} z={zt} />}
                {atual && circulo > 0 && (
                  <svg style={{ position: 'absolute', left: atual.x - 40 / zt, top: atual.y - 30 / zt, overflow: 'visible' }} width={atual.w + 80 / zt} height={atual.h + 60 / zt}>
                    <defs><filter id={`tremido-${r.id}`}><feTurbulence baseFrequency="0.04" numOctaves={2} seed={3} /><feDisplacementMap in="SourceGraphic" scale={6 / zt} /></filter></defs>
                    <ellipse cx={(atual.w + 80 / zt) / 2} cy={(atual.h + 60 / zt) / 2} rx={(atual.w + 64 / zt) / 2} ry={(atual.h + 44 / zt) / 2} fill="none" stroke={C.spot}
                      strokeWidth={7 / zt} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circulo} filter={`url(#tremido-${r.id})`}
                      transform={`rotate(-4 ${(atual.w + 80 / zt) / 2} ${(atual.h + 60 / zt) / 2})`} />
                  </svg>
                )}
                {atual && (
                  <div style={{ position: 'absolute', left: cx, top: cy, width: 0, height: 0 }}>
                    {clique > 0 && clique < f(18) && (
                      <div style={{ position: 'absolute', left: -40 * (0.3 + 1.2 * clique / f(18)), top: -40 * (0.3 + 1.2 * clique / f(18)),
                        width: 80 * (0.3 + 1.2 * clique / f(18)), height: 80 * (0.3 + 1.2 * clique / f(18)), borderRadius: '50%', border: `2px solid ${C.primary}`,
                        opacity: 0.6 * (1 - clique / f(18)) }} />
                    )}
                    <svg width={40} height={40} viewBox="0 0 24 24" style={{ position: 'absolute', left: -4, top: -2, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.28))',
                      transform: `scale(${clique > 0 && clique < f(3) ? 0.9 : 1})` }}>
                      <path d="M4 2 L4 19 L9 14.5 L12.2 21.5 L15 20.2 L11.9 13.4 L18.5 13.2 Z" fill={C.ink} stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            {flash > 0 && <AbsoluteFill style={{ background: '#fff', opacity: flash }} />}
          </div>
        </div>
      </AbsoluteFill>
      {atual && e > 0.95 && Math.abs(rotZ) < 0.3 && r.impacto !== idx && (
        <Lupa r={r} c={atual} t={t} a={trava + 0.15} some={someLupa} escala={escala} esq={esq} cam={cam} nome={r.nomes?.[idx]} />
      )}
    </AbsoluteFill>
  );
};

// ---------- cuidados: carimbo, cartões que batem e se montam, ângulo holandês na entrada ----------
// lemo news-package (carimbo de 1,9x em 5 quadros, -8°, anel que se abre) e kino-montage (batida seca com tremor que
// seca); product-card-progressive-assemble (barra, depois corpo, depois texto); a cena entra torta (-3,5°) e endireita
// quando o primeiro cuidado pousa: "o problema foi nomeado".
const Alertas: React.FC<{ r: Trecho; dur: number; adianta?: number }> = ({ r, dur, adianta = 0 }) => {
  const t = useT();
  const sai = prog(t, dur - f(9), f(9), E.sai);
  const itens = r.itens ?? [];
  const chegada = (i: number) => Math.max(0.35, r.fala_s * (0.1 + i * 0.29) - adianta);
  const endireita = mola(t, chegada(0) + f(5), { stiffness: 110, damping: 16, mass: 1 });
  const tCar = f(16); // carimbo cai depois que o triângulo se desenha
  const qc = (t - tCar) * FPS;
  const carimbo = qc < 0 ? 0 : interpolate(qc, [0, 5], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const tremTit = qc >= 5 && qc < 10 ? 6 * Math.exp(-(qc - 5) / 1.7) : 0;
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: 1 - sai, transform: `rotate(${-3.5 * (1 - endireita)}deg)`, transformOrigin: '50% 50%' }}>
      <Som em={chegada(0) + f(5)} nome="baque-a" db={-10} />
      <Som em={tCar + f(5)} nome="baque-b" db={-10} />
      <Som em={tCar + f(5)} nome="clac" db={-12} />
      <div style={{ position: 'absolute', left: 160, top: 170, display: 'flex', alignItems: 'center', gap: 22, transform: `translateX(${tremTit * (qc % 2 ? 1 : -1)}px)` }}>
        <Ico d={ICONES.alerta} size={72} cor={C.alerta} w={2} desenho={prog(t, f(2), f(12), E.linha)} />
        <div style={{ fontSize: 64, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}><Revela t={t} a={f(4)}>Cuidados</Revela></div>
        {qc >= 0 && (
          <div style={{ position: 'relative', marginLeft: 26 }}>
            <div style={{ border: `4px double ${C.alerta}`, outline: `2px solid ${C.alerta}`, outlineOffset: 4, color: C.alertaTexto, fontWeight: 800, fontSize: 34,
              letterSpacing: '0.08em', padding: '6px 18px', borderRadius: 8, transform: `rotate(-8deg) scale(${1.9 - 0.9 * carimbo})`, opacity: Math.min(1, carimbo * 2.5),
              background: 'rgba(255,244,236,0.85)' }}>ATENÇÃO</div>
            {qc >= 5 && qc < 17 && (
              <svg width={400} height={400} style={{ position: 'absolute', left: -110, top: -170, overflow: 'visible', pointerEvents: 'none' }}>
                <ellipse cx={200} cy={200} rx={180 * interpolate(qc, [5, 17], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })} ry={120 * interpolate(qc, [5, 17], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })}
                  fill="none" stroke={C.alerta} strokeWidth={1.5} strokeOpacity={interpolate(qc, [5, 17], [1, 0], clamp)} />
              </svg>
            )}
          </div>
        )}
      </div>
      <div style={{ position: 'absolute', left: 160, top: 320, width: 1480, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {itens.map((it, i) => {
          const a = chegada(i);
          const q = (t - a) * FPS;
          const bate = interpolate(q, [0, 5], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
          const dt = Math.max(0, (q - 5) / FPS), trem = q >= 5 && q < 11 ? 8 * Math.exp(-14 * dt) * (Math.floor(q) % 2 ? 1 : -1) : 0;
          const barra = prog(t, a, f(6), E.entra), corpo = prog(t, a + f(3), f(8), E.entra);
          const ws = it.split(' ');
          return (
            <div key={i} style={{ position: 'relative', borderRadius: 18, transform: `translateX(${(1 - bate) * 1400 + trem}px)`, opacity: q < 0 ? 0 : 1 }}>
              <Som em={a + f(5)} nome={i % 2 ? 'baque-b' : 'baque-a'} db={-12 - i} />
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: C.alerta, borderRadius: '18px 0 0 18px', transform: `scaleY(${barra})` }} />
              <div style={{ background: C.surface, borderRadius: 18, padding: '28px 40px 28px 48px', fontSize: 36, color: C.ink, boxShadow: SOMBRA_CARTAO,
                clipPath: `inset(0 ${(1 - corpo) * 100}% 0 0 round 18px)`, display: 'flex', gap: 28, alignItems: 'center' }}>
                <span style={{ fontFamily: MONO, fontSize: 28, fontWeight: 600, color: C.alertaTexto, width: 48 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ lineHeight: 1.3 }}>
                  {ws.map((w, k) => {
                    const p = prog(t, a + f(8) + k * f(2.4), f(20), E.entra);
                    return <React.Fragment key={k}><span style={{ display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 0.38}em)`,
                      filter: p < 0.98 ? `blur(${(9 * (1 - p)).toFixed(2)}px)` : undefined }}>{w}</span>{' '}</React.Fragment>;
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Varredura de luz única (lemo dark-keynote; list-stack-press): faixa macia de 360 px a 14°, linear em 14 quadros.
const Brilho: React.FC<{ t: number; a: number; largura: number }> = ({ t, a, largura }) => {
  const p = interpolate(t, [a, a + f(14)], [0, 1], clamp);
  if (p <= 0 || p >= 1) return null;
  return <div style={{ position: 'absolute', top: '-60%', bottom: '-60%', width: 360, left: -500 + (largura + 1000) * p, transform: 'rotate(14deg)',
    background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.32), rgba(255,255,255,0))', pointerEvents: 'none' }} />;
};

// ---------- fechamento: tópicos, parede de telas em 3D e a foto de família ----------
// Foto de família (aesthetic-rules Q8; assemble-then-type-flyin): cada capítulo manda um representante que voa até
// o bloco do próximo vídeo, com chegadas cada vez mais rápidas; com todos no lugar, o logo carimba com anel e flash,
// e 25 quadros depois uma luz passa por ele. Riser -> impacto -> ding de vidro.
const Fechamento: React.FC<{ d: Dados; r: Trecho; dur: number }> = ({ d, r }) => {
  const t = useT();
  const topicos = r.topicos ?? [];
  const tProx = r.fala_s * 0.72;
  const telas = [...new Set(d.trechos.filter((x) => x.imagem).map((x) => x.imagem!))].slice(0, 6);
  const imp = d.trechos.find((x) => x.cena === 'tela' && x.impacto !== undefined && x.imagem);
  const cImp = imp?.caixas?.[(imp.focos ?? [imp.foco ?? 0])[imp.impacto ?? 0]] ?? null;
  const regra = d.trechos.find((x) => x.cena === 'regra' && x.critica) ?? d.trechos.find((x) => x.cena === 'regra');
  const tFoto = tProx + 0.3; // início da montagem
  const qf = (t - tFoto) * FPS;
  const CHEGADAS = [0, 8, 13, 16];
  const reps = [
    { x: 160, y: 700, de: [-360, 40] as const, el: <div style={{ width: 64, height: 76, borderRadius: 14, background: C.surface, border: `3px solid ${C.primary}`, boxShadow: SOMBRA_CARTAO, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ico d={ICONES.cfop} size={36} cor={C.primary} /></div> },
    { x: 262, y: 694, de: [0, -380] as const, el: <div style={{ fontSize: 84, fontWeight: 300, color: C.primary, lineHeight: 1, letterSpacing: '-0.04em' }}>{String(regra?.n ?? 1).padStart(2, '0')}</div> },
    { x: 400, y: 698, de: [420, -60] as const, el: imp && cImp ? (
      <div style={{ width: 180, height: 90, borderRadius: 14, overflow: 'hidden', boxShadow: '0 18px 40px rgba(19,24,32,0.28), 0 0 0 3px #fff, 0 0 0 5px rgba(52,120,167,0.9)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0',
          transform: `scale(${Math.min(180 / (cImp.w + 40), 90 / (cImp.h + 40))}) translate(${-(cImp.x - 20)}px, ${-(cImp.y - 20)}px)` }}>
          <Img src={staticFile(imp.imagem!)} style={{ width: 1920, height: 1080 }} />
          {(imp.borrar ?? []).map((b, i) => <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, backdropFilter: 'blur(9px)', background: 'rgba(247,248,250,0.55)' }} />)}
        </div>
      </div>) : null },
    { x: 610, y: 708, de: [60, 360] as const, el: <Ico d={ICONES.alerta} size={64} cor={C.alerta} w={2} /> },
  ];
  const sobra = Easing.bezier(0.34, 1.56, 0.64, 1);
  const carimbo = qf >= 34 ? 1.15 - 0.15 * interpolate(qf, [34, 40], [0, 1], clamp) : 1;
  const anel = interpolate(qf, [34, 48], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const empurra = interpolate(qf, [0, 34], [1, 1.04], clamp);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <Som em={tFoto + f(34)} nome="riser" db={-10} />
      <Som em={tFoto + f(34)} nome="sub-boom" db={-6} />
      <Som em={tFoto + f(59)} nome="ding-vidro" db={-12} />
      <Som em={tFoto + f(59)} nome="cintilacao" db={-18} />
      {CHEGADAS.map((c, i) => <Som key={i} em={tFoto + f(c + 8)} nome={i % 2 ? 'swish-b' : 'swish-a'} db={-18 - i} />)}
      <AbsoluteFill style={{ transform: `scale(${empurra})`, transformOrigin: '30% 70%' }}>
        <div style={{ position: 'absolute', left: 160, top: 170, fontSize: 64, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>
          <Revela t={t} a={f(4)}>Resumindo</Revela>
        </div>
        <div style={{ position: 'absolute', left: 160, top: 300, width: 820, display: 'flex', flexDirection: 'column', gap: 30 }}>
          {topicos.map((tp, i) => {
            const a = 0.4 + i * (r.fala_s * 0.17);
            const v = mola(t, a);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, fontSize: 40, fontWeight: 600, color: C.ink, lineHeight: 1.2 }}>
                <Som em={a + f(6)} nome={i % 2 ? 'pop-b' : 'pop-a'} db={-16 - 1.5 * i} />
                <div style={{ width: 60, height: 60, flex: '0 0 60px', borderRadius: '50%', background: C.ok, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `scale(${v})` }}>
                  <Ico d={ICONES.check} size={36} cor="#fff" w={3} desenho={prog(t, a + f(4), f(10), E.linha)} />
                </div>
                <Revela t={t} a={a + f(2)}>{tp}</Revela>
              </div>
            );
          })}
        </div>
        {/* parede de telas em 3D */}
        <div style={{ position: 'absolute', left: 1040, top: 220, width: 760, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, perspective: 1800,
          transform: `rotateY(${-10 + 4 * Math.sin(t * 0.4)}deg) rotateX(4deg)`, transformStyle: 'preserve-3d' }}>
          {telas.map((src, i) => {
            const v = mola(t, f(6) + i * f(4), { stiffness: 120, damping: 13, mass: 1 });
            return (
              <div key={src} style={{ aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', boxShadow: '0 20px 44px rgba(19,24,32,0.22)', background: '#fff',
                border: '3px solid #fff', opacity: Math.min(1, v * 1.5),
                transform: `translateZ(${(1 - v) * -900}px) translateX(${(1 - v) * (i % 2 ? 260 : -260)}px) rotateY(${(1 - v) * (i % 2 ? -50 : 50)}deg) rotate(${(i % 2 ? 1 : -1) * 0.8}deg)` }}>
                <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }} />
              </div>
            );
          })}
        </div>
        {/* representantes de cada capítulo */}
        {reps.map((rp, i) => {
          if (!rp.el) return null;
          const q = qf - CHEGADAS[i];
          if (q < 0) return null;
          const k = interpolate(q, [0, 16], [0, 1], { ...clamp, easing: sobra });
          const kr = interpolate(q, [4, 20], [0, 1], { ...clamp, easing: sobra });
          return (
            <div key={i} style={{ position: 'absolute', left: rp.x + rp.de[0] * (1 - k), top: rp.y + rp.de[1] * (1 - k), opacity: Math.min(1, q / 3),
              transform: `rotate(${(i % 2 ? 7 : -7) * (1 - kr)}deg)` }}>{rp.el}</div>
          );
        })}
        <div style={{ position: 'absolute', left: 160, bottom: 190, display: 'flex', alignItems: 'center', gap: 22, opacity: prog(t, tProx, f(14)),
          transform: `translateY(${(1 - prog(t, tProx, f(16))) * 20}px)` }}>
          <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink2 }}>Próximo vídeo</div>
          <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 16, background: C.primary, color: '#fff', borderRadius: 999,
            padding: '16px 34px', fontSize: 34, fontWeight: 600, boxShadow: '0 16px 36px rgba(52,120,167,0.30)' }}>
            {d.proximo} <Ico d={ICONES.seta} size={34} cor="#fff" desenho={prog(t, tProx + f(8), f(10), E.linha)} />
            <Brilho t={t} a={tFoto + f(59)} largura={700} />
          </div>
        </div>
        <div style={{ position: 'absolute', right: 140, bottom: 186, height: 72, opacity: prog(t, tProx + 0.4, f(14)), transform: `scale(${carimbo})`, transformOrigin: 'center' }}>
          <Img src={staticFile('logo_faktory_flow.png')} style={{ height: 72 }} />
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', WebkitMaskImage: `url(${staticFile('logo_faktory_flow.png')})`, WebkitMaskSize: '100% 100%',
            maskImage: `url(${staticFile('logo_faktory_flow.png')})`, maskSize: '100% 100%' }}>
            <Brilho t={t} a={tFoto + f(61)} largura={300} />
          </div>
          {anel > 0 && anel < 1 && (
            <svg width={10} height={10} style={{ position: 'absolute', left: '50%', top: '50%', overflow: 'visible', pointerEvents: 'none' }}>
              <circle cx={0} cy={0} r={220 * anel} fill="none" stroke={C.spot} strokeWidth={1.5} strokeOpacity={1 - anel} />
            </svg>
          )}
        </div>
      </AbsoluteFill>
      {qf >= 34 && qf < 36 && <AbsoluteFill style={{ background: '#fff', opacity: 0.4 }} />}
    </AbsoluteFill>
  );
};

// ---------- legendas ----------
const pedacos = (fala: string) => {
  const frases = fala.match(/[^.!?:]+[.!?:]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [fala];
  const out: string[] = [];
  for (const fr of frases) {
    if (fr.length <= 78) { out.push(fr); continue; }
    let atual = '';
    for (const parte of fr.split(/(?<=,)\s+/)) {
      if ((atual + ' ' + parte).trim().length > 78 && atual) { out.push(atual.trim()); atual = parte; } else atual = (atual + ' ' + parte).trim();
    }
    if (atual) out.push(atual);
  }
  return out;
};
// Legendas (lemo-opuscar): uma frase por vez, no tempo medido de cada frase da narração; fica pelo menos
// max(1,8 s, fala + 0,6 s) ou até a próxima; sobe quando o destaque da tela está embaixo, para não cobrir o elemento.
const cuesDe = (r: Trecho) => {
  if (r.legendas?.length) return r.legendas.map((l) => ({ texto: l.texto, ini: r.inicio + l.ini, fim: r.inicio + l.fim }));
  const ps = pedacos(r.fala);
  const total = ps.reduce((s, p) => s + p.length, 0);
  let acc = 0;
  return ps.map((p) => { const ini = r.inicio + (acc / total) * r.fala_s; acc += p.length; return { texto: p, ini, fim: r.inicio + (acc / total) * r.fala_s }; });
};
const Legenda: React.FC<{ d: Dados }> = ({ d }) => {
  const t = useT();
  const cues = React.useMemo(() => d.trechos.flatMap(cuesDe), [d]);
  const i = cues.findIndex((c, k) => t >= c.ini && t < Math.min(Math.max(c.fim + 0.6, c.ini + 1.8), cues[k + 1]?.ini ?? Infinity));
  if (i < 0) return null;
  const c = cues[i];
  const fimVisivel = Math.min(Math.max(c.fim + 0.6, c.ini + 1.8), cues[i + 1]?.ini ?? Infinity);
  const o = Math.min(prog(t, c.ini, f(5)), 1 - prog(t, fimVisivel - f(5), f(5), E.sai));
  const r = d.trechos.find((x) => t >= x.inicio && t < x.inicio + x.duracao);
  const alvo = r?.cena === 'tela' ? r.caixas?.[(r.focos ?? [r.foco ?? 0])[0]] : null;
  const emCima = alvo ? OY + (BARRA + alvo.y + alvo.h) * S0 > 1080 * 0.75 : false;
  return (
    <div style={{ position: 'absolute', [emCima ? 'top' : 'bottom']: emCima ? 120 : 44, width: '100%', display: 'flex', justifyContent: 'center', fontFamily: SANS }}>
      <div style={{ maxWidth: 1560, background: 'rgba(19,24,32,0.74)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)',
        color: '#fff', fontSize: 46, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.22, padding: '14px 38px', borderRadius: 20, textAlign: 'center',
        boxShadow: '0 12px 30px rgba(19,24,32,0.22)', opacity: o, transform: `translateY(${(1 - o) * 10}px)` }}>{c.texto}</div>
    </div>
  );
};

// ---------- moldura fixa: marca, pílula do capítulo e barra de progresso ----------
const Moldura: React.FC<{ d: Dados }> = ({ d }) => {
  const t = useT();
  const r = d.trechos.find((x) => t >= x.inicio && t < x.inicio + x.duracao);
  const mostra = r && r.cena !== 'abertura' && r.cena !== 'fechamento' && r.cena !== 'tela' ? 1 : 0;
  const cap = r ? CAPITULO[r.cena] : undefined;
  const iniCap = r ? (d.trechos.find((x) => CAPITULO[x.cena] === cap)?.inicio ?? 0) : 0;
  // a pílula assume quando o título grande do capítulo (CapituloAbre) termina de encolher até ela
  const vCap = cap ? prog(t, iniCap + ABRE_CAP.pousa, f(3), Easing.linear) : 0;
  return (
    <>
      <div style={{ position: 'absolute', left: 160, top: 64, display: 'flex', alignItems: 'center', gap: 18, opacity: mostra, fontFamily: SANS }}>
        <Img src={staticFile('logo_faktory_flow.png')} style={{ height: 40 }} />
        <div style={{ width: 1, height: 28, background: C.line }} />
        <div style={{ fontSize: 22, fontWeight: 600, color: C.ink2 }}>{d.titulo}</div>
      </div>
      {cap && (
        <div style={{ position: 'absolute', right: 64, top: 52, display: 'flex', alignItems: 'center', gap: 12, background: C.ink, color: '#fff', borderRadius: 999,
          padding: '10px 22px', opacity: vCap }}>
          <span style={{ fontFamily: MONO, fontSize: 22, fontWeight: 600, color: C.spot }}>{cap.slice(0, 2)}</span>
          <span style={{ fontFamily: SANS, fontSize: 20, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{cap.slice(5)}</span>
        </div>
      )}
      <div style={{ position: 'absolute', left: 0, bottom: 0, height: 6, width: `${(t / d.duracaoTotal) * 100}%`, background: C.primary }} />
    </>
  );
};

// ---------- trilha: música com abaixamento sob a voz (ducking de ~10 dB) ----------
const MUSICA_BASE = 0.2, MUSICA_SOB_VOZ = 0.062;
// respiros: antes de cada golpe a música vai a zero em 2 quadros e volta em 4 depois (lemo DIRECTOR §6)
const volumeMusica = (d: Dados, respiros: [number, number][]) => (fr: number) => {
  const t = fr / FPS;
  let fala = 0;
  for (const r of d.trechos) {
    const a = r.inicio, b = r.inicio + r.fala_s;
    fala = Math.max(fala, Math.min(prog(t, a - 0.2, 0.2, Easing.linear), 1 - prog(t, b, 0.4, Easing.linear)));
  }
  const fade = Math.min(prog(t, 0, 1.5, Easing.linear), 1 - prog(t, d.duracaoTotal - 2.5, 2.4, Easing.linear));
  const corte = respiros.reduce((m, [a, b]) => Math.max(m, Math.min(prog(t, a, f(2), Easing.linear), 1 - prog(t, b, f(4), Easing.linear))), 0);
  return (MUSICA_BASE - (MUSICA_BASE - MUSICA_SOB_VOZ) * fala) * fade * (1 - corte);
};

// agrupa trechos de status seguidos num bloco só (a linha do tempo continua)
const blocos = (ts: Trecho[]) => {
  const out: Trecho[][] = [];
  for (const r of ts) {
    const ult = out[out.length - 1];
    if (ult && r.cena === 'status' && ult[0].cena === 'status') ult.push(r); else out.push([r]);
  }
  return out;
};

// Transições (wipes, nunca dissolve): círculo que nasce da pílula do capítulo (canto superior direito); entre telas
// seguidas, whip com freio (video-shotcraft shot-transitions B): 70% do caminho no primeiro terço e cauda longa,
// com desfoque proporcional à velocidade. Cada passagem tem um whoosh baixo.
const FREIO = Easing.bezier(0.2, 0.9, 0.25, 1);
// As cenas não têm fundo próprio (o Fundo é global). Durante a passagem, a cena que entra ganha o papel por baixo,
// para a cena que sai não aparecer pelos vazios; o papel some quando a cena anterior termina (sobra de 0,75 s).
const Cobertura: React.FC = () => {
  const t = useT();
  const o = 1 - prog(t, f(20), f(4), Easing.linear);
  return o > 0 ? <AbsoluteFill style={{ background: C.bg, opacity: o }} /> : null;
};
// Painel (troca de capítulo): duas faixas inclinadas da marca, azul e depois limão, varrem a tela da esquerda para a
// direita; a cena nova aparece atrás da segunda faixa.
const Painel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useT();
  const pa = prog(t, 0, f(22), E.move), pb = prog(t, f(4), f(22), E.move);
  if (pb >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  const LARG = 45, INCL = 9; // largura da faixa e inclinação, em % da tela
  const xa = -LARG - INCL + (100 + 2 * LARG + 2 * INCL) * pa, xb = -LARG - INCL + (100 + 2 * LARG + 2 * INCL) * pb;
  const faixa = (x: number) => `polygon(${x - LARG + INCL}% 0, ${x + INCL}% 0, ${x - INCL}% 100%, ${x - LARG - INCL}% 100%)`;
  const xc = xb - LARG;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `polygon(0 0, ${xc + INCL}% 0, ${xc - INCL}% 100%, 0 100%)` }}>{children}</AbsoluteFill>
      <AbsoluteFill style={{ background: C.spot, clipPath: faixa(xb) }} />
      <AbsoluteFill style={{ background: C.primary, clipPath: faixa(xa) }} />
    </AbsoluteFill>
  );
};

const Transicao: React.FC<{ tipo: 'circulo' | 'whip' | 'painel' | 'nenhuma'; uid: string; children: React.ReactNode }> = ({ tipo, uid, children }) => {
  const t = useT();
  const dw = f(30);
  if (tipo === 'painel') return <Painel>{children}</Painel>;
  const p = prog(t, 0, tipo === 'whip' ? dw : f(22), tipo === 'whip' ? FREIO : E.entra);
  if (tipo === 'nenhuma' || p >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  if (tipo === 'whip') {
    // borrão só na direção do movimento (feGaussianBlur horizontal): o texto não "lava" como no blur comum
    const v = (p - prog(t - 1 / FPS, 0, dw, FREIO)) * 1920; // px por quadro
    const sx = v > 8 ? Math.min(64, 0.085 * v) : 0;
    const id = `whip-${uid}`;
    return (
      <AbsoluteFill style={{ transform: `translateX(${(1 - p) * 1920}px)`, filter: sx > 0.3 ? `url(#${id})` : undefined }}>
        <svg width={0} height={0} style={{ position: 'absolute' }}>
          <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${sx.toFixed(2)} 0`} edgeMode="duplicate" />
          </filter>
        </svg>
        {children}
      </AbsoluteFill>
    );
  }
  return <AbsoluteFill style={{ clipPath: `circle(${p * 230}% at 92% 6%)` }}>{children}</AbsoluteFill>;
};

// title-demote-to-label (video-shotcraft): o capítulo nasce grande no centro, segura 18 quadros e encolhe em 26 até
// virar a pílula do canto; o conteúdo da cena começa a entrar 12 quadros depois do início da descida.
const ABRE_CAP = { segura: f(18), desce: f(26), pousa: f(44), conteudo: f(30) };
const CapituloAbre: React.FC<{ cap: string }> = ({ cap }) => {
  const t = useT();
  if (t > ABRE_CAP.pousa + f(4)) return null;
  const k = interpolate(t, [ABRE_CAP.segura, ABRE_CAP.pousa], [0, 1], { ...clamp, easing: Easing.bezier(0.6, 0, 0.18, 1) });
  const num = cap.slice(0, 2), rot = cap.slice(5);
  const largPilula = 2 * 22 * 0.62 + 12 + rot.length * 20 * 0.72 + 44; // estimativa da largura da pílula da Moldura
  const fx = 1920 - 64 - largPilula / 2, fy = 52 + 22;
  const s = 1 + (0.24 - 1) * k;
  const painel = 1 - prog(t, ABRE_CAP.segura, f(12), Easing.linear);
  const entra = prog(t, 0, f(10));
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill style={{ background: C.bg, opacity: painel }} />
      <div style={{ position: 'absolute', left: 960 + (fx - 960) * k, top: 540 + (fy - 540) * k, transform: `translate(-50%, -50%) scale(${s})`,
        display: 'flex', alignItems: 'center', gap: 28, background: k > 0.6 ? C.ink : 'transparent', borderRadius: 999, padding: '20px 44px',
        opacity: t > ABRE_CAP.pousa ? 1 - prog(t, ABRE_CAP.pousa, f(4), Easing.linear) : 1, whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: MONO, fontSize: 84, fontWeight: 600, color: k > 0.6 ? C.spot : C.primary }}><Revela t={t} a={0}>{num}</Revela></span>
        <span style={{ fontFamily: SANS, fontSize: 84, fontWeight: 700, letterSpacing: k > 0.6 ? '0.06em' : '-0.02em', textTransform: k > 0.6 ? 'uppercase' : 'none',
          color: k > 0.6 ? '#fff' : C.ink, opacity: entra }}><Palavras t={t} a={f(3)} texto={rot} /></span>
      </div>
    </AbsoluteFill>
  );
};

const CAPITULO: Partial<Record<Trecho['cena'], string>> = { status: '01 · Conceito', regra: '02 · Regras de negócio', tela: '03 · Na tela', alertas: '04 · Cuidados' };

export const FluxoVideo: React.FC<{ dados: Dados; musica?: string }> = ({ dados: d, musica }) => {
  useFontes();
  const bs = blocos(d.trechos);
  // onde o cursor terminou em cada tela, para a seguinte continuar dali (o cursor nunca teleporta)
  const fimDoCursor = (r: Trecho) => { const { caixas, focos } = tempoDosFocos(r); return centro(caixas[focos[focos.length - 1]]); };
  // respiros da música (em tempo do vídeo depois da abertura fria): antes do crash, no ar do slam e antes da foto de família
  const respiros: [number, number][] = [];
  bs.forEach((b, i) => {
    const r = b[0], ant = bs[i - 1]?.[0], cap = CAPITULO[r.cena];
    const atraso = cap !== undefined && cap !== (ant ? CAPITULO[ant.cena] : undefined) ? ABRE_CAP.conteudo : 0;
    if (r.cena === 'tela' && r.impacto !== undefined) {
      const base = tempoDosFocos(r);
      const ini = Math.max(0.25, base.ini - atraso), fatia = Math.max(0.8, (Math.max(base.ini + 1, r.fala_s) - atraso - ini) / Math.max(1, base.focos.length));
      const golpe = r.inicio + atraso + ini + r.impacto * fatia + f(6) + FIM_VOO + CHEGA_GOLPE;
      respiros.push([golpe - 0.5, golpe + f(6)]);
    }
    if (r.cena === 'regra' && r.critica) respiros.push([r.inicio + atraso, r.inicio + atraso + IMPACTO_SLAM]);
    if (r.cena === 'fechamento') { const tf = r.inicio + r.fala_s * 0.72 + 0.3; respiros.push([tf - 0.6, tf + f(34)]); }
  });
  const somPassagem: Record<string, { nome: NomeSom; db: number }> = { whip: { nome: 'swoosh-whip', db: -10 }, painel: { nome: 'swoosh', db: -12 }, circulo: { nome: 'whoosh-ar', db: -12 } };
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={ABERTURA_FRIA}>
        <AberturaFria d={d} />
        {[0, 9, 18].map((q, k) => <Som key={q} em={f(q)} nome="baque-tique" db={-10 + k} />)}
      </Sequence>
      <Sequence from={ABERTURA_FRIA}>
      <Fundo />
      {bs.map((b, i) => {
        const r = b[0];
        const ant = bs[i - 1]?.[0];
        const fim = b[b.length - 1].inicio + b[b.length - 1].duracao;
        const sobra = r.cena === 'fechamento' ? 1.5 : 0.75; // o bloco seguinte entra por cima com o wipe
        const dur = fim - r.inicio + sobra;
        // primeiro bloco de um capítulo: abre com o título grande, e o conteúdo entra um pouco depois
        const cap = CAPITULO[r.cena];
        const abre = cap !== undefined && cap !== (ant ? CAPITULO[ant.cena] : undefined);
        // capítulo novo ou fechamento: painéis da marca; tela para tela: whip com freio; dentro do capítulo: círculo
        const tipo = !ant ? 'nenhuma' : abre || r.cena === 'fechamento' ? 'painel' : ant.cena === 'tela' && r.cena === 'tela' ? 'whip' : 'circulo';
        const atraso = abre ? ABRE_CAP.conteudo : 0;
        return (
          <Sequence key={r.id} from={Math.round(r.inicio * FPS)} durationInFrames={Math.round(dur * FPS)}>
            {ant && tipo !== 'nenhuma' && <Som em={f(3)} nome={somPassagem[tipo].nome} db={somPassagem[tipo].db} />}
            <Transicao tipo={tipo} uid={r.id}>
              {ant && <Cobertura />}
              <Sequence from={Math.round(atraso * FPS)}>
                {r.cena === 'abertura' && <Abertura d={d} dur={dur} />}
                {r.cena === 'status' && <LinhaStatus bloco={b} dur={dur - atraso} adianta={atraso} />}
                {r.cena === 'regra' && <Regra r={r} dur={dur - atraso} />}
                {r.cena === 'tela' && <Tela r={r} dur={dur - atraso} adianta={atraso} cursorIni={ant?.cena === 'tela' ? fimDoCursor(ant) : null} />}
                {r.cena === 'alertas' && <Alertas r={r} dur={dur - atraso} adianta={atraso} />}
                {r.cena === 'fechamento' && <Fechamento d={d} r={r} dur={dur} />}
              </Sequence>
              {abre && <CapituloAbre cap={cap} />}
            </Transicao>
          </Sequence>
        );
      })}
      {d.trechos.filter((r) => r.audio).map((r) => (
        <Sequence key={`a${r.id}`} from={Math.round(r.inicio * FPS)}>
          <Audio src={staticFile(r.audio!)} />
        </Sequence>
      ))}
      {musica && <Audio src={staticFile(musica)} volume={volumeMusica(d, respiros)} />}
      <Moldura d={d} />
      <Legenda d={d} />
      </Sequence>
    </AbsoluteFill>
  );
};
