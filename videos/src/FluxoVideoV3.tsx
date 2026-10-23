import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, continueRender, delayRender, interpolate, spring, staticFile, useCurrentFrame,
} from 'remotion';
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
  n?: number; titulo?: string; texto?: string; icone?: string; fonte?: string;
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
const Fundo: React.FC = () => {
  const t = useT();
  const w = (2 * Math.PI * t) / 30;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
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
            <Palavras t={t} a={f(14)} texto={d.titulo} />
          </div>
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
  const pos = t < t2 ? 0 : interpolate(t, [t2 + 0.3, t2 + Math.max(1.5, bloco[1].fala_s * 0.62)], [0.0001, alvo], { ...clamp, easing: E.move });
  const trava = mola(t, t2 + 0.6);
  const etapas = bloco[0].etapas ?? STATUS;
  const X0 = etapas.length > 4 ? 240 : 300, X1 = 1920 - X0, passo = (X1 - X0) / (etapas.length - 1), Y = 600;
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
              <circle cx={X0 + passo * i} cy={Y} r={16 * cheio} fill={C.primary} />
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
      <div style={{ position: 'absolute', left: X0 + passo * pos, top: Y - 112, transform: `translateX(-50%) scale(${mola(t, f(20))})`,
        width: 64, height: 76, borderRadius: 12, background: C.surface, boxShadow: SOMBRA_CARTAO, border: `2px solid ${C.primary}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <Ico d={ICONES.cadeado} size={32} cor={C.alerta} desenho={prog(t, t2 + 0.6, f(12), E.linha)} /> Daqui em diante: só visualizar
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- cartão de regra: numeral gigante atrás, ícone desenhado, título por máscara e marcador limão ----------
// draw-svg-trace (video-shotcraft): o contorno do cartão se desenha em 24 quadros; o fundo e a sombra entram depois,
// e o conteúdo começa quando o traço está quase fechado.
const Regra: React.FC<{ r: Trecho; dur: number }> = ({ r, dur }) => {
  const t0 = useT();
  const traco = prog(t0, 0, f(24), E.linha);
  const t = t0 - f(14); // o conteúdo do cartão anda depois do traço
  const sai = prog(t0, dur - f(9), f(9), E.sai);
  const cheio = prog(t0, f(18), f(12));
  const marca = prog(t, f(26), f(10), Easing.linear);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <SomEm em={f(2)} src="sfx/tick.wav" volume={0.22} />
      <div style={{ position: 'absolute', left: 120, top: 120, fontSize: 340, fontWeight: 300, color: C.line, letterSpacing: '-0.04em', lineHeight: 1,
        opacity: prog(t0, 0, f(14)) * (1 - sai), transform: `translateY(${(1 - prog(t0, 0, f(20))) * 40}px)` }}>
        {String(r.n ?? 1).padStart(2, '0')}
      </div>
      <div style={{ position: 'absolute', left: 280, top: 300, width: 1360, background: `rgba(255,255,255,${cheio})`, borderRadius: 28, padding: '60px 68px', display: 'flex', gap: 56,
        alignItems: 'flex-start', boxShadow: `0 1px 2px rgba(19,24,32,${0.06 * cheio}), 0 12px 32px rgba(19,24,32,${0.1 * cheio})`,
        opacity: 1 - sai, transform: `translateY(${-sai * 20}px)` }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', opacity: 1 - cheio * 0.85 }}>
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
          <div style={{ fontSize: 54, fontWeight: 700, color: C.ink, lineHeight: 1.12, letterSpacing: '-0.015em' }}>
            <Palavras t={t} a={f(10)} texto={r.titulo ?? ''} passo={f(2)} marca={marca} />
          </div>
          <div style={{ fontSize: 32, fontWeight: 450, color: '#2C3644', marginTop: 24, lineHeight: 1.4, opacity: prog(t, f(22), f(14)),
            transform: `translateY(${(1 - prog(t, f(22), f(16))) * 14}px)` }}>{r.texto}</div>
          <div style={{ fontFamily: MONO, fontSize: 18, color: C.ink2, marginTop: 30, paddingTop: 14, borderTop: `1px solid ${C.line}`, opacity: prog(t, f(34), f(14)) }}>
            FONTE · {r.fonte}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- tela com câmera, destaque e cursor ----------
const S0 = 0.8; // escala da captura no palco
const OX = (1920 - 1920 * S0) / 2, OY = 132;
const Z = 1.5; // zoom do push-in (o máximo seguro é 2,2)
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
const camNoTempo = (r: Trecho, tt: number, focos: number[], caixas: Caixa[], ini: number, fatia: number, adianta: number): Cam => {
  const idx = Math.min(focos.length - 1, Math.max(0, Math.floor((tt - ini) / fatia)));
  const tc = ini + idx * fatia + f(6);
  const c0 = idx === 0 ? { tx: 0, ty: 0, z: 1 } : camPara(caixas[focos[idx - 1]]), c1 = camPara(caixas[focos[idx]]);
  const k = interpolate(tt, [tc, tc + FIM_VOO], [0, 1], { ...clamp, easing: VOO });
  const hop = 1 - 0.08 * Math.sin(Math.PI * k);
  const drift = 1 + Math.min(0.012, 0.004 * Math.max(0, tt - tc - 1.2));
  // impacto: punch de zoom (+12% em 6 quadros, volta em 5) logo depois de os cantos fecharem
  const imp = r.impacto === idx ? tc + FIM_VOO + 0.5 : Infinity;
  const punch = tt < imp ? 0 : tt < imp + f(6) ? Easing.in(Easing.cubic)((tt - imp) / f(6)) * 0.12 : Math.max(0, 0.12 - ((tt - imp - f(6)) / f(5)) * 0.04);
  const m = hop * drift * (1 + punch);
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

const Tela: React.FC<{ r: Trecho; dur: number; cursorIni?: { x: number; y: number } | null; adianta?: number }> = ({ r, cursorIni, adianta = 0 }) => {
  const t = useT();
  const base = tempoDosFocos(r);
  const { caixas, focos } = base;
  // com a abertura de capítulo, a cena começa `adianta` segundos depois da voz: os focos andam juntos com a fala
  const ini = Math.max(0.25, base.ini - adianta), fatia = Math.max(0.8, (Math.max(base.ini + 1, r.fala_s) - adianta - ini) / Math.max(1, focos.length));
  const entra = prog(t, 0, f(12));
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
  const spot = atual ? prog(t, trava, f(12), E.linha) * (1 - interpolate(t, [r.fala_s - adianta, r.fala_s - adianta + f(12)], [0, 1], clamp)) : 0;
  const segs = (r.rotulo ?? '').split('›').map((s) => s.trim()).filter(Boolean);
  const escala = S0 * (0.96 + 0.04 * mola(t, 0)); // a janela assenta no lugar, centrada
  const zt = cam.z;
  const imp = r.impacto === idx ? trava + 0.5 : Infinity;
  const flash = t >= imp && t < imp + f(3) ? 0.55 : 0;
  const circulo = Number.isFinite(imp) ? prog(t, imp + f(4), f(10), E.linha) : 0;
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: entra }}>
      {focos.map((_, i) => <SomEm key={`c${i}`} em={tClique(i)} src="sfx/clique.wav" volume={0.3} />)}
      {r.impacto !== undefined && focos[r.impacto] !== undefined && (
        <SomEm em={ini + r.impacto * fatia + f(6) + FIM_VOO + 0.5} src="sfx/whoosh.wav" volume={0.32} />
      )}
      {segs.length > 0 && (
        <div style={{ position: 'absolute', top: 48, left: OX, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(24px)', border: '1px solid rgba(19,24,32,.08)', borderRadius: 999, padding: '10px 22px', boxShadow: SOMBRA_CARTAO,
          fontFamily: MONO, fontSize: 24, fontWeight: 500, color: C.ink, whiteSpace: 'nowrap', opacity: prog(t, f(6), f(10)) }}>
          {segs.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ color: C.ink2, opacity: prog(t, f(10) + i * f(6), f(8)), margin: '0 8px' }}>›</span>}
              <Revela t={t} a={f(8) + i * f(6)} style={{ color: i === segs.length - 1 ? C.primary : C.ink }}>{s}</Revela>
            </React.Fragment>
          ))}
        </div>
      )}
      <div style={{ position: 'absolute', left: (1920 - 1920 * escala) / 2, top: OY, width: 1920, height: 1080, transform: `scale(${escala})`, transformOrigin: '0 0',
        borderRadius: 24, overflow: 'hidden', boxShadow: SOMBRA_JANELA, background: '#fff' }}>
        <div style={{ position: 'absolute', width: 1920, height: 1080, filter: desfoque > 0.3 ? `blur(${desfoque.toFixed(2)}px)` : undefined }}>
          <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.z})`, transformOrigin: '0 0' }}>
            <Img src={staticFile(r.imagem!)} style={{ width: 1920, height: 1080 }} />
            {(r.borrar ?? []).map((b, i) => (
              <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, backdropFilter: 'blur(9px)', background: 'rgba(247,248,250,0.55)' }} />
            ))}
            {atual && spot > 0 && (
              <div style={{ position: 'absolute', left: atual.x - 8 / zt, top: atual.y - 8 / zt, width: atual.w + 16 / zt, height: atual.h + 16 / zt, borderRadius: 10 / zt,
                background: 'rgba(52,120,167,0.075)', boxShadow: `0 0 0 4000px rgba(19,24,32,${0.24 * spot})` }} />
            )}
            {atual && <Cantos c={atual} t={t} a={trava} z={zt} />}
            {atual && r.nomes?.[idx] && <Rotulo c={atual} t={t} a={trava + f(5)} z={zt} texto={r.nomes[idx]!} />}
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
    </AbsoluteFill>
  );
};

// ---------- cuidados: triângulo desenhado, um cartão por armadilha com fio lateral ----------
const Alertas: React.FC<{ r: Trecho; dur: number; adianta?: number }> = ({ r, dur, adianta = 0 }) => {
  const t = useT();
  const sai = prog(t, dur - f(9), f(9), E.sai);
  const itens = r.itens ?? [];
  return (
    <AbsoluteFill style={{ fontFamily: SANS, opacity: 1 - sai }}>
      <SomEm em={0} src="sfx/alerta.wav" volume={0.35} />
      <div style={{ position: 'absolute', left: 160, top: 170, display: 'flex', alignItems: 'center', gap: 22 }}>
        <Ico d={ICONES.alerta} size={72} cor={C.alerta} w={2} desenho={prog(t, f(4), f(14), E.linha)} />
        <div style={{ fontSize: 64, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}><Revela t={t} a={f(6)}>Cuidados</Revela></div>
      </div>
      <div style={{ position: 'absolute', left: 160, top: 320, width: 1480, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {itens.map((it, i) => {
          const a = Math.max(0.2, r.fala_s * (0.1 + i * 0.29) - adianta);
          const v = mola(t, a);
          return (
            <div key={i} style={{ background: C.surface, borderLeft: `8px solid ${C.alerta}`, borderRadius: 18, padding: '28px 40px', fontSize: 36, color: C.ink,
              boxShadow: SOMBRA_CARTAO, opacity: Math.min(1, v * 1.5), transform: `translateY(${(1 - v) * 24}px)`, display: 'flex', gap: 28, alignItems: 'center' }}>
              <SomEm em={a} src="sfx/tick.wav" volume={0.18} />
              <span style={{ fontFamily: MONO, fontSize: 28, fontWeight: 600, color: C.alertaTexto, width: 48 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ lineHeight: 1.3 }}>{it}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- fechamento: três tópicos com check desenhado, parede com as telas do vídeo e o próximo vídeo ----------
const Fechamento: React.FC<{ d: Dados; r: Trecho; dur: number }> = ({ d, r }) => {
  const t = useT();
  const topicos = r.topicos ?? [];
  const tProx = r.fala_s * 0.72;
  const telas = [...new Set(d.trechos.filter((x) => x.imagem).map((x) => x.imagem!))].slice(0, 6);
  return (
    <AbsoluteFill style={{ fontFamily: SANS }}>
      <div style={{ position: 'absolute', left: 160, top: 170, fontSize: 64, fontWeight: 700, color: C.ink, letterSpacing: '-0.02em' }}>
        <Revela t={t} a={f(4)}>Resumindo</Revela>
      </div>
      <div style={{ position: 'absolute', left: 160, top: 320, width: 820, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {topicos.map((tp, i) => {
          const a = 0.4 + i * (r.fala_s * 0.17);
          const v = mola(t, a);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, fontSize: 42, fontWeight: 600, color: C.ink, lineHeight: 1.2 }}>
              <SomEm em={a + f(6)} src="sfx/check.wav" volume={0.2} />
              <div style={{ width: 64, height: 64, flex: '0 0 64px', borderRadius: '50%', background: C.ok, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: `scale(${v})` }}>
                <Ico d={ICONES.check} size={38} cor="#fff" w={3} desenho={prog(t, a + f(4), f(10), E.linha)} />
              </div>
              <Revela t={t} a={a + f(2)}>{tp}</Revela>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 1060, top: 250, width: 720, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {telas.map((src, i) => {
          const v = mola(t, f(8) + i * f(5));
          return (
            <div key={src} style={{ aspectRatio: '16 / 9', borderRadius: 14, overflow: 'hidden', boxShadow: SOMBRA_CARTAO, background: '#fff',
              opacity: Math.min(1, v * 1.5), transform: `translateY(${(1 - v) * 24}px) rotate(${(i % 2 ? 1 : -1) * 0.6}deg)` }}>
              <Img src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }} />
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 160, bottom: 200, display: 'flex', alignItems: 'center', gap: 22, opacity: prog(t, tProx, f(14)),
        transform: `translateY(${(1 - prog(t, tProx, f(16))) * 20}px)` }}>
        <div style={{ fontFamily: MONO, fontSize: 22, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink2 }}>Próximo vídeo</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: C.primary, color: '#fff', borderRadius: 999, padding: '16px 34px', fontSize: 34, fontWeight: 600,
          boxShadow: '0 16px 36px rgba(52,120,167,0.30)' }}>
          {d.proximo} <Ico d={ICONES.seta} size={34} cor="#fff" desenho={prog(t, tProx + f(8), f(10), E.linha)} />
        </div>
      </div>
      <Img src={staticFile('logo_faktory_flow.png')} style={{ position: 'absolute', right: 140, bottom: 196, height: 60, opacity: prog(t, tProx + 0.4, f(14)) }} />
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
  const emCima = alvo ? OY + (alvo.y + alvo.h) * S0 > 1080 * 0.75 : false;
  return (
    <div style={{ position: 'absolute', [emCima ? 'top' : 'bottom']: emCima ? 120 : 44, width: '100%', display: 'flex', justifyContent: 'center', fontFamily: SANS }}>
      <div style={{ maxWidth: 1400, background: 'rgba(19,24,32,0.72)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.14)',
        color: '#fff', fontSize: 38, fontWeight: 600, letterSpacing: '-0.005em', lineHeight: 1.25, padding: '14px 34px', borderRadius: 20, textAlign: 'center',
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
const volumeMusica = (d: Dados) => (fr: number) => {
  const t = fr / FPS;
  let fala = 0;
  for (const r of d.trechos) {
    const a = r.inicio, b = r.inicio + r.fala_s;
    fala = Math.max(fala, Math.min(prog(t, a - 0.2, 0.2, Easing.linear), 1 - prog(t, b, 0.4, Easing.linear)));
  }
  const fade = Math.min(prog(t, 0, 1.5, Easing.linear), 1 - prog(t, d.duracaoTotal - 2.5, 2.4, Easing.linear));
  return (MUSICA_BASE - (MUSICA_BASE - MUSICA_SOB_VOZ) * fala) * fade;
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
const Transicao: React.FC<{ tipo: 'circulo' | 'whip' | 'nenhuma'; children: React.ReactNode }> = ({ tipo, children }) => {
  const t = useT();
  const dw = f(24);
  const p = prog(t, 0, tipo === 'whip' ? dw : f(22), tipo === 'whip' ? FREIO : E.entra);
  if (tipo === 'nenhuma' || p >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  if (tipo === 'whip') {
    const v = (p - prog(t - 1 / FPS, 0, dw, FREIO)) * 1920; // px por quadro
    return <AbsoluteFill style={{ transform: `translateX(${(1 - p) * 1920}px)`, filter: `blur(${Math.min(14, v * 0.09).toFixed(2)}px)` }}>{children}</AbsoluteFill>;
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
  return (
    <AbsoluteFill>
      <Fundo />
      {bs.map((b, i) => {
        const r = b[0];
        const ant = bs[i - 1]?.[0];
        const fim = b[b.length - 1].inicio + b[b.length - 1].duracao;
        const sobra = r.cena === 'fechamento' ? 1.5 : 0.75; // o bloco seguinte entra por cima com o wipe
        const dur = fim - r.inicio + sobra;
        const tipo = !ant ? 'nenhuma' : ant.cena === 'tela' && r.cena === 'tela' ? 'whip' : 'circulo';
        // primeiro bloco de um capítulo: abre com o título grande, e o conteúdo entra um pouco depois
        const cap = CAPITULO[r.cena];
        const abre = cap !== undefined && cap !== (ant ? CAPITULO[ant.cena] : undefined);
        const atraso = abre ? ABRE_CAP.conteudo : 0;
        return (
          <Sequence key={r.id} from={Math.round(r.inicio * FPS)} durationInFrames={Math.round(dur * FPS)}>
            {ant && <Sequence durationInFrames={15}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.2} /></Sequence>}
            <Transicao tipo={tipo}>
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
      {musica && <Audio src={staticFile(musica)} volume={volumeMusica(d)} />}
      <Moldura d={d} />
      <Legenda d={d} />
    </AbsoluteFill>
  );
};
