import React from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame,
} from 'remotion';

// Vídeo de fluxo do Guia do Consultor. Palco 1920×1080 a 30 fps.
// Os dados vêm de src/gerado/<id>.json (scripts/preparar.mjs): cada trecho tem a fala, a cena e o tempo medido da voz.
export const FPS = 30;

export type Caixa = { x: number; y: number; w: number; h: number } | null;
export type Trecho = {
  id: string; cena: 'abertura' | 'status' | 'regra' | 'tela' | 'alertas' | 'fechamento';
  fala: string; inicio: number; duracao: number; fala_s: number; audio: string | null;
  destaque?: number; cadeado?: boolean; etapas?: string[]; tituloCena?: string;
  n?: number; titulo?: string; texto?: string; icone?: string; fonte?: string;
  imagem?: string; caixas?: Caixa[]; foco?: number; focos?: number[]; rotulo?: string; borrar?: { x: number; y: number; w: number; h: number }[];
  itens?: string[]; topicos?: string[];
  legendas?: { texto: string; ini: number; fim: number }[] | null;
};
export type Dados = { id: string; titulo: string; subtitulo: string; trilha: string; proximo: string; icone?: string; trechos: Trecho[]; duracaoTotal: number };

const C = {
  fundo: '#F3F8FC', fundo2: '#EAF3F9', azul: '#3478A7', azulEsc: '#1C4867', tinta: '#143650',
  azulClaro: '#6FA8CF', linha: '#C7DEEE', limao: '#D5DD26', limaoTinta: '#1E2A05', limaoSuave: '#F6F8D4',
  branco: '#FFFFFF', suave: '#5B7A93', alerta: '#E08A1E', alertaSuave: '#FFF4E3', ok: '#1F9D63',
};
const FONTE = '"Segoe UI Variable Display", "Segoe UI", system-ui, sans-serif';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const suave = Easing.bezier(0.45, 0, 0.55, 1);
const rampa = (t: number, a: number, d = 0.6) => interpolate(t, [a, a + d], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
const mola = (t: number, a: number, damping = 16) =>
  spring({ frame: Math.round((t - a) * FPS), fps: FPS, config: { damping, stiffness: 110, mass: 0.9 } });
const useT = () => useCurrentFrame() / FPS;

// ---------- ícones (traço, estilo lucide) ----------
const Ico: React.FC<{ d: string; size?: number; cor?: string; w?: number }> = ({ d, size = 48, cor = C.azul, w = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={cor} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
    dangerouslySetInnerHTML={{ __html: d }} />
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

// ---------- fundo ----------
const Fundo: React.FC = () => {
  const t = useT();
  const a = Math.sin(t * 0.25) * 40, b = Math.cos(t * 0.2) * 50;
  return (
    <AbsoluteFill style={{ background: `linear-gradient(160deg, ${C.fundo} 0%, #FFFFFF 55%, ${C.fundo2} 100%)` }}>
      <div style={{ position: 'absolute', width: 900, height: 900, borderRadius: '50%', left: -300 + a, top: -380 + b,
        background: 'radial-gradient(circle, rgba(111,168,207,0.22), rgba(111,168,207,0) 70%)' }} />
      <div style={{ position: 'absolute', width: 760, height: 760, borderRadius: '50%', right: -260 - a, bottom: -320 - b,
        background: 'radial-gradient(circle, rgba(213,221,38,0.18), rgba(213,221,38,0) 70%)' }} />
    </AbsoluteFill>
  );
};

// ---------- abertura ----------
const Abertura: React.FC<{ d: Dados; dur: number }> = ({ d, dur }) => {
  const t = useT();
  const v = mola(t, 0.2), v2 = mola(t, 0.6), v3 = mola(t, 1.0);
  const sai = 1 - rampa(t, dur - 0.5, 0.5);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', opacity: sai, fontFamily: FONTE }}>
      <Img src={staticFile('logo_faktory_flow.png')} style={{ height: 92, opacity: v, transform: `translateY(${(1 - v) * 20}px)`, marginBottom: 44 }} />
      <div style={{ opacity: v2, transform: `translateY(${(1 - v2) * 24}px)`, background: C.limaoSuave, color: C.limaoTinta,
        border: `2px solid ${C.limao}`, borderRadius: 999, padding: '10px 26px', fontSize: 28, fontWeight: 600, marginBottom: 30 }}>{d.trilha}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 34, opacity: v3, transform: `scale(${0.92 + 0.08 * v3})` }}>
        <div style={{ width: 132, height: 132, borderRadius: 34, background: C.azul, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 18px 40px rgba(52,120,167,0.35)', transform: `rotate(${(1 - v3) * -8}deg)` }}>
          <Ico d={ICONES[d.icone ?? 'carrinho'] ?? ICONES.carrinho} size={76} cor="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 104, fontWeight: 700, color: C.tinta, letterSpacing: -2, lineHeight: 1 }}>{d.titulo}</div>
          <div style={{ fontSize: 44, color: C.suave, marginTop: 14 }}>{d.subtitulo}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- linha do tempo de status ----------
const STATUS = ['Em aberto', 'Faturado', 'Lib. Expedição', 'Entregue'];
const LinhaStatus: React.FC<{ bloco: Trecho[]; dur: number }> = ({ bloco, dur }) => {
  const t = useT();
  const entra = rampa(t, 0, 0.7), sai = 1 - rampa(t, dur - 0.45, 0.45);
  // posição do "pedido" na linha: trecho 1 parado no 0; trecho 2 anda de 1 a destaque ao longo da fala
  const t2 = bloco[1] ? bloco[1].inicio - bloco[0].inicio : Infinity;
  const alvo = bloco[1]?.destaque ?? 0;
  const pos = t < t2 ? 0 : interpolate(t, [t2 + 0.3, t2 + Math.max(1.5, (bloco[1].fala_s) * 0.62)], [0.0001, alvo], { ...clamp, easing: suave });
  const trava = rampa(t, t2 + 0.6, 0.5);
  const etapas = bloco[0].etapas ?? STATUS;
  const X0 = etapas.length > 4 ? 240 : 300, X1 = 1920 - X0, passo = (X1 - X0) / (etapas.length - 1), Y = 560;
  const comSelos = bloco.some((r) => r.cadeado);
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, opacity: entra * sai }}>
      <div style={{ position: 'absolute', top: 150, width: '100%', textAlign: 'center', fontSize: 58, fontWeight: 700, color: C.tinta }}>
        {bloco[0].tituloCena ?? 'A vida do pedido de venda'}
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute' }}>
        <line x1={X0} y1={Y} x2={X1} y2={Y} stroke={C.linha} strokeWidth={10} strokeLinecap="round" />
        <line x1={X0} y1={Y} x2={X0 + passo * pos} y2={Y} stroke={C.azul} strokeWidth={10} strokeLinecap="round" />
      </svg>
      {etapas.map((s, i) => {
        const v = mola(t, 0.3 + i * 0.18);
        const ativo = pos >= i - 0.02;
        return (
          <div key={s} style={{ position: 'absolute', left: X0 + passo * i, top: Y, transform: `translate(-50%,-50%) scale(${0.6 + 0.4 * v})`, opacity: v,
            display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: ativo ? C.azul : C.branco, border: `6px solid ${ativo ? C.azul : C.linha}`,
              boxShadow: ativo ? '0 0 0 10px rgba(52,120,167,0.15)' : 'none' }} />
            <div style={{ position: 'absolute', top: 82, whiteSpace: 'nowrap', fontSize: 36, fontWeight: 600, color: ativo ? C.tinta : C.suave }}>{s}</div>
          </div>
        );
      })}
      {/* edição: livre em Em aberto; trava depois (só nos vídeos que marcam "cadeado") */}
      {comSelos && <div style={{ position: 'absolute', left: X0, top: Y - 190, transform: 'translateX(-50%)', opacity: rampa(t, 1.0, 0.6),
        display: 'flex', alignItems: 'center', gap: 12, background: '#E7F6EE', color: C.ok, border: `2px solid ${C.ok}`, borderRadius: 18, padding: '12px 22px', fontSize: 30, fontWeight: 600 }}>
        <Ico d={ICONES.aberto} size={34} cor={C.ok} /> Pode editar tudo
      </div>}
      {bloco[1]?.cadeado && (
        <div style={{ position: 'absolute', left: X0 + passo * 2, top: Y - 190, transform: `translateX(-50%) scale(${0.85 + 0.15 * trava})`, opacity: trava,
          display: 'flex', alignItems: 'center', gap: 12, background: C.alertaSuave, color: '#9A5B0B', border: `2px solid ${C.alerta}`, borderRadius: 18, padding: '12px 22px', fontSize: 30, fontWeight: 600 }}>
          <Ico d={ICONES.cadeado} size={34} cor={C.alerta} /> Daqui em diante: só visualizar
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- cartão de regra ----------
const Regra: React.FC<{ r: Trecho; dur: number }> = ({ r, dur }) => {
  const t = useT();
  const v = mola(t, 0.05), sai = rampa(t, dur - 0.4, 0.4);
  const vi = mola(t, 0.35, 12);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', fontFamily: FONTE }}>
      <div style={{ width: 1360, background: C.branco, borderRadius: 40, padding: '64px 72px', display: 'flex', gap: 56, alignItems: 'center',
        boxShadow: '0 30px 80px rgba(20,54,80,0.14)', border: `2px solid ${C.linha}`,
        opacity: v * (1 - sai), transform: `translateX(${(1 - v) * 120 - sai * 120}px) rotate(${(1 - v) * 1.5}deg)` }}>
        <div style={{ width: 200, height: 200, flex: '0 0 200px', borderRadius: 48, background: C.fundo2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: `scale(${0.7 + 0.3 * vi}) rotate(${(1 - vi) * -12}deg)` }}>
          <Ico d={ICONES[r.icone ?? 'cfop']} size={112} cor={C.azul} w={1.7} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-block', background: C.limao, color: C.limaoTinta, borderRadius: 999, padding: '6px 20px', fontSize: 26, fontWeight: 700, marginBottom: 20 }}>
            Regra {r.n}
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, color: C.tinta, lineHeight: 1.1, letterSpacing: -1 }}>{r.titulo}</div>
          <div style={{ fontSize: 36, color: '#33536D', marginTop: 22, lineHeight: 1.35, opacity: rampa(t, 0.6, 0.6) }}>{r.texto}</div>
          <div style={{ fontSize: 20, color: C.suave, marginTop: 28, opacity: rampa(t, 1.0, 0.6) }}>Fonte: base de conhecimento do Harness · {r.fonte}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- tela com câmera, destaque e cursor ----------
const S0 = 0.8; // escala da captura no palco
const OX = (1920 - 1920 * S0) / 2, OY = 118;
const Z = 1.4;
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

// Regras do estilo Living Screencast (lemo-opuscar): zoom sempre >= 1, push-in no ponto da ação, drift lento enquanto a
// voz fala, cursor com mola que nunca teleporta (continua de onde parou na tela anterior), pequeno "empurrão" no clique,
// foco por spotlight (escurece em volta, sem borrar texto) e som em toda ação visível.
const Tela: React.FC<{ r: Trecho; dur: number; cursorIni?: { x: number; y: number } | null }> = ({ r, cursorIni }) => {
  const t = useT();
  const { caixas, focos, ini, fatia } = tempoDosFocos(r);
  const entra = rampa(t, 0, 0.3);
  const idx = Math.min(focos.length - 1, Math.max(0, Math.floor((t - ini) / fatia)));
  const tf = ini + idx * fatia; // início do foco atual
  const atual = caixas[focos[idx]];
  const anterior = idx === 0 ? undefined : caixas[focos[idx - 1]];
  const c0 = idx === 0 ? { tx: 0, ty: 0, z: 1 } : camPara(anterior), c1 = camPara(atual);
  const k = interpolate(t, [tf, tf + 1.1], [0, 1], { ...clamp, easing: suave });
  const drift = 1 + 0.022 * interpolate(t, [tf + 1.1, tf + fatia + 1.1], [0, 1], clamp);
  const z = (c0.z + (c1.z - c0.z) * k) * drift;
  const cam = { tx: (c0.tx + (c1.tx - c0.tx) * k) * drift - (drift - 1) * 960, ty: (c0.ty + (c1.ty - c0.ty) * k) * drift - (drift - 1) * 540, z };
  // cursor com mola: do foco anterior (ou de onde parou na tela anterior) até o foco atual, e clica
  const p0 = centro(anterior) ?? cursorIni ?? { x: 1180, y: 760 };
  const p1 = centro(atual) ?? p0;
  const kc = mola(t, tf + 0.2, 18);
  const cx = p0.x + (p1.x - p0.x) * kc, cy = p0.y + (p1.y - p0.y) * kc - Math.sin(Math.min(1, kc) * Math.PI) * 36;
  const clique = t - (tf + 1.25);
  const anel = atual ? rampa(t, tf + 1.0, 0.4) : 0;
  const pulso = 0.5 + 0.5 * Math.sin((t - tf) * 4);
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, opacity: entra }}>
      {focos.map((_, i) => (
        <Sequence key={`c${i}`} from={Math.round((ini + i * fatia + 1.25) * FPS)} durationInFrames={6}>
          <Audio src={staticFile('sfx/clique.wav')} volume={0.32} />
        </Sequence>
      ))}
      {r.rotulo && (
        <div style={{ position: 'absolute', top: 34, left: '50%', transform: `translateX(-50%) translateY(${(1 - mola(t, 0.1)) * -20}px)`,
          background: C.tinta, color: '#fff', borderRadius: 999, padding: '12px 30px', fontSize: 32, fontWeight: 600, whiteSpace: 'nowrap',
          boxShadow: '0 10px 28px rgba(20,54,80,0.25)' }}>{r.rotulo}</div>
      )}
      <div style={{ position: 'absolute', left: OX, top: OY, width: 1920, height: 1080, transform: `scale(${S0 * (0.97 + 0.03 * entra)})`, transformOrigin: '0 0',
        borderRadius: 26, overflow: 'hidden', boxShadow: '0 40px 90px rgba(20,54,80,0.22)', border: `3px solid ${C.linha}`, background: '#fff' }}>
        <div style={{ position: 'absolute', width: 1920, height: 1080, transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.z})`, transformOrigin: '0 0' }}>
          <Img src={staticFile(r.imagem!)} style={{ width: 1920, height: 1080 }} />
          {(r.borrar ?? []).map((b, i) => (
            <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.w, height: b.h, backdropFilter: 'blur(9px)', background: 'rgba(247,248,250,0.55)' }} />
          ))}
          {atual && (
            <div style={{ position: 'absolute', left: atual.x - 10, top: atual.y - 10, width: atual.w + 20, height: atual.h + 20, borderRadius: 14,
              border: `4px solid ${C.limao}`, opacity: anel,
              boxShadow: `0 0 0 ${6 + 6 * pulso}px rgba(213,221,38,${0.25 + 0.15 * pulso}), 0 0 0 4000px rgba(12,36,56,${0.16 * anel})` }} />
          )}
          {atual && (
            <div style={{ position: 'absolute', left: cx, top: cy, width: 0, height: 0 }}>
              {clique > 0 && clique < 0.7 && (
                <div style={{ position: 'absolute', left: -40 * (0.3 + clique), top: -40 * (0.3 + clique), width: 80 * (0.3 + clique), height: 80 * (0.3 + clique),
                  borderRadius: '50%', border: `4px solid ${C.azul}`, opacity: 1 - clique / 0.7 }} />
              )}
              <svg width={44} height={44} viewBox="0 0 24 24" style={{ position: 'absolute', left: -4, top: -2, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
                transform: `scale(${clique > 0 && clique < 0.25 ? 0.86 + 0.14 * (clique / 0.25) : 1})` }}>
                <path d="M4 2 L4 19 L9 14.5 L12.2 21.5 L15 20.2 L11.9 13.4 L18.5 13.2 Z" fill="#fff" stroke="#143650" strokeWidth={1.4} strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- alertas ----------
const Alertas: React.FC<{ r: Trecho; dur: number }> = ({ r, dur }) => {
  const t = useT();
  const sai = 1 - rampa(t, dur - 0.4, 0.4);
  const itens = r.itens ?? [];
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, opacity: rampa(t, 0, 0.5) * sai, alignItems: 'center', paddingTop: 120 }}>
      <div style={{ fontSize: 60, fontWeight: 700, color: C.tinta, display: 'flex', alignItems: 'center', gap: 18 }}>
        <Ico d={ICONES.alerta} size={64} cor={C.alerta} /> Cuidados
      </div>
      <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 28, width: 1300 }}>
        {itens.map((it, i) => {
          const a = r.fala_s * (0.1 + i * 0.29);
          const v = mola(t, a);
          return (
            <div key={i} style={{ background: C.branco, borderLeft: `12px solid ${C.alerta}`, borderRadius: 24, padding: '30px 40px', fontSize: 38, color: C.tinta,
              boxShadow: '0 16px 40px rgba(20,54,80,0.10)', opacity: v, transform: `translateY(${(1 - v) * 40}px)`, display: 'flex', gap: 24, alignItems: 'center' }}>
              <span style={{ fontSize: 34, fontWeight: 700, color: C.alerta, width: 40 }}>{i + 1}</span>{it}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- fechamento ----------
const Fechamento: React.FC<{ d: Dados; r: Trecho; dur: number }> = ({ d, r }) => {
  const t = useT();
  const topicos = r.topicos ?? [];
  const tProx = r.fala_s * 0.72;
  return (
    <AbsoluteFill style={{ fontFamily: FONTE, alignItems: 'center', paddingTop: 140, opacity: rampa(t, 0, 0.5) }}>
      <div style={{ fontSize: 62, fontWeight: 700, color: C.tinta }}>Resumindo</div>
      <div style={{ marginTop: 50, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {topicos.map((tp, i) => {
          const v = mola(t, 0.4 + i * (r.fala_s * 0.17));
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 26, fontSize: 46, color: C.tinta, opacity: v, transform: `translateX(${(1 - v) * -50}px)` }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${v})` }}>
                <Ico d={ICONES.check} size={40} cor="#fff" w={3} />
              </div>{tp}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 70, opacity: rampa(t, tProx, 0.6), transform: `translateY(${(1 - rampa(t, tProx, 0.6)) * 20}px)`,
        display: 'flex', alignItems: 'center', gap: 16, background: C.azul, color: '#fff', borderRadius: 999, padding: '18px 36px', fontSize: 36, fontWeight: 600 }}>
        Próximo vídeo: {d.proximo} <Ico d={ICONES.seta} size={36} cor="#fff" />
      </div>
      <Img src={staticFile('logo_faktory_flow.png')} style={{ position: 'absolute', bottom: 70, height: 64, opacity: rampa(t, tProx + 0.4, 0.6) }} />
    </AbsoluteFill>
  );
};

// ---------- legendas ----------
const pedacos = (fala: string) => {
  const frases = fala.match(/[^.!?:]+[.!?:]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [fala];
  const out: string[] = [];
  for (const f of frases) {
    if (f.length <= 78) { out.push(f); continue; }
    let atual = '';
    for (const parte of f.split(/(?<=,)\s+/)) {
      if ((atual + ' ' + parte).trim().length > 78 && atual) { out.push(atual.trim()); atual = parte; } else atual = (atual + ' ' + parte).trim();
    }
    if (atual) out.push(atual);
  }
  return out;
};
// Legendas (regras do lemo-opuscar): uma frase por vez, sincronizada com o tempo medido de cada frase da narração;
// fica na tela pelo menos max(1,8 s, fala + 0,6 s) ou até a próxima; pílula de vidro fosco; sobe quando o destaque
// da tela está na parte de baixo, para não cobrir o elemento de que se está falando.
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
  const o = Math.min(rampa(t, c.ini, 0.18), 1 - rampa(t, fimVisivel - 0.2, 0.2));
  // destaque embaixo? então a legenda vai para o alto
  const r = d.trechos.find((x) => t >= x.inicio && t < x.inicio + x.duracao);
  const alvo = r?.cena === 'tela' ? r.caixas?.[(r.focos ?? [r.foco ?? 0])[0]] : null;
  const emCima = alvo ? OY + (alvo.y + alvo.h) * S0 > 1080 - 200 : false;
  return (
    <div style={{ position: 'absolute', [emCima ? 'top' : 'bottom']: emCima ? 112 : 40, width: '100%', display: 'flex', justifyContent: 'center', fontFamily: FONTE }}>
      <div style={{ maxWidth: 1500, background: 'rgba(16,40,60,0.62)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.18)',
        color: '#fff', fontSize: 38, lineHeight: 1.3, padding: '14px 32px', borderRadius: 999, textAlign: 'center',
        boxShadow: '0 12px 30px rgba(12,36,56,0.25)', opacity: o, transform: `translateY(${(1 - o) * 8}px)` }}>{c.texto}</div>
    </div>
  );
};

// ---------- moldura fixa ----------
const Moldura: React.FC<{ d: Dados }> = ({ d }) => {
  const t = useT();
  const r = d.trechos.find((x) => t >= x.inicio && t < x.inicio + x.duracao);
  const mostra = r && r.cena !== 'abertura' && r.cena !== 'fechamento' && r.cena !== 'tela' ? 1 : 0;
  // pílula de capítulo (01 a 04), sempre no canto, também nas telas
  const cap = r ? CAPITULO[r.cena] : undefined;
  const iniCap = r ? (d.trechos.find((x) => CAPITULO[x.cena] === cap)?.inicio ?? 0) : 0;
  const vCap = cap ? mola(t, iniCap + 0.2) : 0;
  return (
    <>
      <div style={{ position: 'absolute', left: 48, top: 40, display: 'flex', alignItems: 'center', gap: 18, opacity: mostra, fontFamily: FONTE }}>
        <Img src={staticFile('logo_faktory_flow.png')} style={{ height: 44 }} />
        <div style={{ background: C.limaoSuave, border: `2px solid ${C.limao}`, color: C.limaoTinta, borderRadius: 999, padding: '6px 18px', fontSize: 24, fontWeight: 600 }}>{d.titulo}</div>
      </div>
      {cap && (
        <div style={{ position: 'absolute', right: 48, top: 44, fontFamily: FONTE, background: 'rgba(20,54,80,0.9)', color: '#fff', borderRadius: 999,
          padding: '8px 20px', fontSize: 22, fontWeight: 700, letterSpacing: 0.4, opacity: vCap, transform: `translateY(${(1 - vCap) * -14}px)` }}>
          <span style={{ color: C.limao }}>{cap.slice(0, 2)}</span>{cap.slice(2)}
        </div>
      )}
      <div style={{ position: 'absolute', left: 0, bottom: 0, height: 8, width: `${(t / d.duracaoTotal) * 100}%`, background: C.azul }} />
    </>
  );
};

// ---------- trilha: música com abaixamento sob a voz ----------
const MUSICA_BASE = 0.2, MUSICA_SOB_VOZ = 0.075;
const volumeMusica = (d: Dados) => (f: number) => {
  const t = f / FPS;
  let fala = 0;
  for (const r of d.trechos) {
    const a = r.inicio, b = r.inicio + r.fala_s;
    fala = Math.max(fala, Math.min(rampa(t, a - 0.35, 0.35), 1 - rampa(t, b, 0.6)));
  }
  const fade = Math.min(rampa(t, 0, 1.5), 1 - rampa(t, d.duracaoTotal - 2.5, 2.4));
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

// Transições (lemo-opuscar: wipes, nunca dissolve): círculo que revela o capítulo novo; entre telas seguidas, whip-pan
// lateral com um pouco de desfoque de movimento. Cada passagem tem um whoosh baixo.
const Transicao: React.FC<{ tipo: 'circulo' | 'whip' | 'nenhuma'; children: React.ReactNode }> = ({ tipo, children }) => {
  const t = useT();
  const p = interpolate(t, [0, tipo === 'whip' ? 0.42 : 0.6], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (tipo === 'nenhuma' || p >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
  if (tipo === 'whip') return <AbsoluteFill style={{ transform: `translateX(${(1 - p) * 1920}px)`, filter: `blur(${(1 - p) * 10}px)` }}>{children}</AbsoluteFill>;
  return <AbsoluteFill style={{ clipPath: `circle(${p * 120}% at 50% 50%)` }}>{children}</AbsoluteFill>;
};

const CAPITULO: Partial<Record<Trecho['cena'], string>> = { status: '01 · Conceito', regra: '02 · Regras de negócio', tela: '03 · Na tela', alertas: '04 · Cuidados' };

export const FluxoVideo: React.FC<{ dados: Dados; musica?: string }> = ({ dados: d, musica }) => {
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
      const sobra = r.cena === 'fechamento' ? 1.5 : 0.6; // o bloco seguinte entra por cima com o wipe
      const dur = fim - r.inicio + sobra;
      const tipo = !ant ? 'nenhuma' : ant.cena === 'tela' && r.cena === 'tela' ? 'whip' : 'circulo';
      return (
        <Sequence key={r.id} from={Math.round(r.inicio * FPS)} durationInFrames={Math.round(dur * FPS)}>
          {ant && <Sequence durationInFrames={15}><Audio src={staticFile('sfx/whoosh.wav')} volume={0.18} /></Sequence>}
          <Transicao tipo={tipo}>
            {r.cena === 'abertura' && <Abertura d={d} dur={dur} />}
            {r.cena === 'status' && <LinhaStatus bloco={b} dur={dur} />}
            {r.cena === 'regra' && <Regra r={r} dur={dur} />}
            {r.cena === 'tela' && <Tela r={r} dur={dur} cursorIni={ant?.cena === 'tela' ? fimDoCursor(ant) : null} />}
            {r.cena === 'alertas' && <Alertas r={r} dur={dur} />}
            {r.cena === 'fechamento' && <Fechamento d={d} r={r} dur={dur} />}
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
