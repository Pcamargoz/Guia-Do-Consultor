import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from 'remotion';
import '@fontsource-variable/inter';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';

// Vídeo de introdução de módulo (padrão "intro"): sem narração, música instrumental, poucos textos curtos.
// Tudo vem do roteiro (roteiros/intro-<modulo>.json): cenas com o clipe já cortado e borrado (scripts/cortar-intro.mjs),
// câmera virtual por quadros-chave, cliques sintéticos (a gravação quase não mostra o cursor), realces e textos.
// Tempos das cenas em segundos do vídeo; tempos dentro da cena (câmera, cliques, textos) contam do início da cena.

export type Ponto = { t: number; x: number; y: number; zoom: number };
export type Clique = { t: number; x: number; y: number; tipo?: 'clique' | 'hover' };
export type Realce = { t: number; ate: number; x: number; y: number; w: number; h: number };
export type Texto = { t: number; ate: number; texto: string; posicao?: 'inf-esq' | 'inf-dir' | 'sup-esq' | 'sup-dir'; tela?: boolean };
export type Cena = {
  id: string; clipe: string; inicio: number; duracao: number; desde: number; entrada?: 'zoom' | 'deslize' | 'corte';
  camera: Ponto[]; cliques?: Clique[]; realces?: Realce[]; textos?: Texto[];
};
export type RoteiroIntro = {
  id: string; modulo: string; fps: number; duracao: number;
  musica: { arquivo: string; bpm: number; entrada: number; final: number; acentos?: number[] };
  // sem rótulo pequeno acima do título (o padrão de design proíbe kicker/eyebrow): o contexto vai numa linha menor abaixo
  abertura: { duracao: number; titulo: string; linha: string };
  fechamento: { inicio: number; duracao: number; titulo: string; linha: string };
  transicao_s: number; cenas: Cena[];
};

// identidade Faktory Flow
const K = { azul: '#3478A7', ceu: '#6FA8CF', lima: '#D5DD26', tinta: '#13293D', fundo: '#F3F7FA', branco: '#FFFFFF' };
const DISPLAY = '"Plus Jakarta Sans", "Inter Variable", system-ui, sans-serif';
const SANS = '"Inter Variable", "Segoe UI", system-ui, sans-serif';
const W = 1920, H = 1080;
const suave = Easing.bezier(0.45, 0, 0.2, 1);

// câmera: interpolação suave entre quadros-chave, presa às bordas para nunca mostrar fora do quadro
function camera(pts: Ponto[], t: number) {
  const ts = pts.map((p) => p.t);
  const op = { easing: suave, extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };
  const z = pts.length > 1 ? interpolate(t, ts, pts.map((p) => p.zoom), op) : pts[0].zoom;
  let x = pts.length > 1 ? interpolate(t, ts, pts.map((p) => p.x), op) : pts[0].x;
  let y = pts.length > 1 ? interpolate(t, ts, pts.map((p) => p.y), op) : pts[0].y;
  x = Math.min(Math.max(x, W / 2 / z), W - W / 2 / z);
  y = Math.min(Math.max(y, H / 2 / z), H - H / 2 / z);
  return { x, y, z };
}
const naTela = (c: { x: number; y: number; z: number }, px: number, py: number) => ({ sx: W / 2 + (px - c.x) * c.z, sy: H / 2 + (py - c.y) * c.z });

const CliqueFx: React.FC<{ c: Clique; t: number; cam: { x: number; y: number; z: number } }> = ({ c, t, cam }) => {
  const d = t - c.t;
  if (d < -0.45 || d > 0.85) return null;
  const { sx, sy } = naTela(cam, c.x, c.y);
  const hover = c.tipo === 'hover';
  const chega = interpolate(d, [-0.45, 0], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const onda = interpolate(d, [0, 0.7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const some = interpolate(d, [0.5, 0.85], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const aperta = d >= 0 && d < 0.18 ? 0.82 : 1;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, pointerEvents: 'none', opacity: some }}>
      {/* ponto de mira: chega um pouco antes do clique */}
      <div style={{ position: 'absolute', left: sx - 15, top: sy - 15, width: 30, height: 30, borderRadius: 15,
        background: 'rgba(52,120,167,.28)', border: `3px solid ${K.azul}`, boxShadow: '0 4px 14px rgba(19,41,61,.25)',
        transform: `scale(${(0.4 + 0.6 * chega) * aperta})`, opacity: chega }} />
      {!hover && d >= 0 && (
        <div style={{ position: 'absolute', left: sx - 70, top: sy - 70, width: 140, height: 140, borderRadius: 70,
          border: `5px solid ${K.lima}`, transform: `scale(${0.2 + 0.8 * onda})`, opacity: 1 - onda }} />
      )}
      {hover && d >= 0 && (
        <div style={{ position: 'absolute', left: sx - 34, top: sy - 34, width: 68, height: 68, borderRadius: 34,
          border: `4px solid ${K.lima}`, opacity: 0.5 + 0.5 * Math.sin(d * 9) }} />
      )}
    </div>
  );
};

const RealceFx: React.FC<{ r: Realce; t: number; cam: { x: number; y: number; z: number } }> = ({ r, t, cam }) => {
  if (t < r.t - 0.1 || t > r.ate + 0.4) return null;
  const ent = interpolate(t, [r.t, r.t + 0.45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const sai = interpolate(t, [r.ate, r.ate + 0.35], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const a = naTela(cam, r.x - 8, r.y - 6);
  const w = (r.w + 16) * cam.z, h = (r.h + 12) * cam.z;
  return (
    <div style={{ position: 'absolute', left: a.sx, top: a.sy, width: w, height: h, borderRadius: 10 * cam.z,
      border: `${3.5}px solid ${K.lima}`, boxShadow: `0 0 0 ${6 * ent}px rgba(213,221,38,.22)`,
      opacity: ent * sai, transform: `scale(${1.06 - 0.06 * ent})`, transformOrigin: 'center' }} />
  );
};

const CenaClipe: React.FC<{ cena: Cena; fps: number; trans: number }> = ({ cena, fps, trans }) => {
  const frame = useCurrentFrame();
  // a Sequence começa meia transição antes do início da cena: t é o tempo da cena (0 = início nominal)
  const t = frame / fps - trans / 2;
  const cam = camera(cena.camera, t);
  const ent = cena.entrada ?? 'zoom';
  const p = ent === 'corte' ? 1 : interpolate(t, [-trans / 2, trans / 2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const entrada: React.CSSProperties = ent === 'deslize'
    ? { transform: `translateX(${(1 - p) * 140}px)`, opacity: p }
    : ent === 'zoom' ? { transform: `scale(${1.06 - 0.06 * p})`, opacity: p, filter: p < 1 ? `blur(${(1 - p) * 8}px)` : undefined } : {};
  return (
    <AbsoluteFill style={{ ...entrada, transformOrigin: '50% 50%' }}>
      <AbsoluteFill style={{ background: K.branco, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H, transformOrigin: '0 0',
          transform: `translate(${W / 2 - cam.x * cam.z}px, ${H / 2 - cam.y * cam.z}px) scale(${cam.z})` }}>
          <OffthreadVideo src={staticFile(cena.clipe)} trimBefore={Math.max(0, Math.round((cena.desde - trans / 2) * fps))} muted
            style={{ width: W, height: H }} />
        </div>
        {(cena.realces ?? []).map((r, i) => <RealceFx key={i} r={r} t={t} cam={cam} />)}
        {(cena.cliques ?? []).map((c, i) => <CliqueFx key={i} c={c} t={t} cam={cam} />)}
        {/* vinheta leve: segura o olho no centro sem escurecer a interface */}
        <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, rgba(19,41,61,0) 62%, rgba(19,41,61,.10) 100%)' }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Chamada: React.FC<{ tx: Texto; tAbs: number; inicioAbs: number }> = ({ tx, tAbs, inicioAbs }) => {
  const { fps } = useVideoConfig();
  const d = tAbs - inicioAbs;
  const fim = tx.ate - tx.t;
  if (d < 0 || d > fim + 0.5) return null;
  const s = spring({ frame: Math.round(d * fps), fps, config: { damping: 200, mass: 0.9 }, durationInFrames: 18 });
  const sai = interpolate(d, [fim, fim + 0.4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) });
  const pos = tx.posicao ?? 'inf-esq';
  const lado: React.CSSProperties = {
    ...(pos.startsWith('inf') ? { bottom: 84 } : { top: 84 }),
    ...(pos.endsWith('esq') ? { left: 84 } : { right: 84 }),
  };
  return (
    <div style={{ position: 'absolute', ...lado, opacity: 1 - sai, transform: `translateY(${sai * 16}px)` }}>
      <div style={{ display: 'flex', alignItems: 'stretch', background: 'rgba(19,41,61,.94)', borderRadius: 18, overflow: 'hidden',
        boxShadow: '0 18px 48px rgba(19,41,61,.32)', clipPath: `inset(0 ${(1 - s) * 100}% 0 0 round 18px)` }}>
        <div style={{ width: 10, background: K.lima }} />
        <div style={{ padding: '22px 34px 24px 28px', overflow: 'hidden' }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 52, lineHeight: 1.1, color: K.branco, letterSpacing: '-0.015em',
            whiteSpace: 'nowrap', transform: `translateY(${(1 - s) * 40}px)` }}>
            {tx.tela ? <span style={{ color: K.lima }}>“{tx.texto}”</span> : tx.texto}
          </div>
        </div>
      </div>
    </div>
  );
};

const Formas: React.FC<{ t: number }> = ({ t }) => (
  <>
    <div style={{ position: 'absolute', right: -160 + Math.sin(t * 0.6) * 10, top: -200, width: 640, height: 640, borderRadius: 120,
      background: K.ceu, opacity: 0.16, transform: `rotate(${12 + t * 2}deg)` }} />
    <div style={{ position: 'absolute', left: -120, bottom: -260 + Math.cos(t * 0.5) * 10, width: 560, height: 560, borderRadius: 110,
      background: K.lima, opacity: 0.18, transform: `rotate(${-10 - t * 1.5}deg)` }} />
  </>
);

const Abertura: React.FC<{ a: RoteiroIntro['abertura'] }> = ({ a }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const mola = (atraso: number) => spring({ frame: frame - Math.round(atraso * fps), fps, config: { damping: 200 }, durationInFrames: 22 });
  const linha = interpolate(t, [0.55, 1.2], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: K.fundo, overflow: 'hidden' }}>
      <Formas t={t} />
      <Img src={staticFile('logo_faktory_flow.png')} style={{ position: 'absolute', left: 140, top: 110, width: 250, opacity: mola(0.05) }} />
      <div style={{ position: 'absolute', left: 140, top: 360 }}>
        <div style={{ overflow: 'hidden', paddingBottom: 8 }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 200, lineHeight: 1.0, color: K.tinta, letterSpacing: '-0.035em',
            transform: `translateY(${(1 - mola(0.25)) * 210}px)` }}>{a.titulo}</div>
        </div>
        <div style={{ height: 14, width: 260 * linha, background: K.lima, borderRadius: 7, marginTop: 6 }} />
        <div style={{ overflow: 'hidden', marginTop: 34 }}>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 48, color: K.tinta, opacity: 0.85,
            transform: `translateY(${(1 - mola(0.7)) * 60}px)` }}>{a.linha}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Fechamento: React.FC<{ f: RoteiroIntro['fechamento'] }> = ({ f }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const mola = (atraso: number) => spring({ frame: frame - Math.round(atraso * fps), fps, config: { damping: 200 }, durationInFrames: 22 });
  const entra = interpolate(t, [0, 0.45], [0, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ background: K.fundo, overflow: 'hidden', clipPath: `circle(${entra * 140}% at 50% 50%)` }}>
      <Formas t={t + 3} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 104, color: K.tinta, letterSpacing: '-0.03em',
            transform: `translateY(${(1 - mola(0.35)) * 120}px)` }}>{f.titulo}</div>
        </div>
        <div style={{ height: 12, width: 220 * mola(0.6), background: K.lima, borderRadius: 6, marginTop: 22 }} />
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 46, color: K.tinta, opacity: 0.8 * mola(0.75), marginTop: 30,
          transform: `translateY(${(1 - mola(0.75)) * 30}px)` }}>{f.linha}</div>
        <Img src={staticFile('logo_faktory_flow.png')} style={{ width: 230, marginTop: 80, opacity: mola(0.95) }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const IntroVideo: React.FC<{ roteiro: RoteiroIntro }> = ({ roteiro }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tAbs = frame / fps;
  const tr = roteiro.transicao_s;
  const f = (s: number) => Math.round(s * fps);
  return (
    <AbsoluteFill style={{ background: K.fundo }}>
      <Sequence durationInFrames={f(roteiro.abertura.duracao + tr / 2)}>
        <Abertura a={roteiro.abertura} />
      </Sequence>
      {roteiro.cenas.map((c) => (
        <Sequence key={c.id} from={f(c.inicio - tr / 2)} durationInFrames={f(c.duracao + tr)}>
          <CenaClipe cena={c} fps={fps} trans={tr} />
        </Sequence>
      ))}
      {/* textos numa camada própria: podem atravessar o corte entre duas cenas da mesma ideia */}
      {roteiro.cenas.flatMap((c) => (c.textos ?? []).map((tx, i) => (
        <Chamada key={`${c.id}-${i}`} tx={tx} tAbs={tAbs} inicioAbs={c.inicio + tx.t} />
      )))}
      <Sequence from={f(roteiro.fechamento.inicio)} durationInFrames={f(roteiro.fechamento.duracao)}>
        <Fechamento f={roteiro.fechamento} />
      </Sequence>
      <Audio src={staticFile(roteiro.musica.arquivo)} />
    </AbsoluteFill>
  );
};
