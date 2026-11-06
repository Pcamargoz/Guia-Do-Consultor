// Publica um vídeo de introdução na plataforma: ../public/videos/intro-<modulo>.{mp4,jpg,vtt}.
// Uso: node scripts/publicar-intro.mjs <modulo> <render.mp4> <segundo-da-capa>
// - mp4: vídeo recomprimido para a web (H.264 high, CRF 20, faststart); o áudio é copiado (já está em -14 LUFS).
// - jpg: capa a partir de um quadro representativo, 1280 px de largura.
// - vtt: as chamadas de texto do roteiro nos tempos em que aparecem (vídeo sem narração: a faixa é a descrição do que se lê na tela),
//   mais a abertura e o fechamento.
// O manifest.json não é alterado aqui (entrada escrita à mão, no formato das outras).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [modulo, render, capaS] = process.argv.slice(2);
if (!modulo || !render || !capaS) { console.error('uso: node scripts/publicar-intro.mjs <modulo> <render.mp4> <segundo-da-capa>'); process.exit(1); }
const r = JSON.parse(fs.readFileSync(`roteiros/intro-${modulo}.json`, 'utf8'));
const dest = path.resolve('../public/videos');
const base = path.join(dest, `intro-${modulo}`);

execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', render, '-map', '0:v:0', '-map', '0:a:0',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-r', '30',
  '-c:a', 'copy', '-movflags', '+faststart', `${base}.mp4`], { stdio: 'inherit' });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(capaS), '-i', render, '-frames:v', '1',
  '-vf', 'scale=1280:-2', '-q:v', '3', `${base}.jpg`], { stdio: 'inherit' });

const ts = (s) => {
  const ms = Math.round(s * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), sec = Math.floor((ms % 60000) / 1000), mil = ms % 1000;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(mil).padStart(3, '0')}`;
};
const deixas = [{ de: 0.3, ate: r.abertura.duracao, texto: `${r.abertura.titulo}\n${r.abertura.linha}` }];
for (const c of r.cenas) for (const t of c.textos ?? []) {
  deixas.push({ de: c.inicio + t.t, ate: Math.min(c.inicio + t.ate + 0.4, r.fechamento.inicio), texto: t.tela ? `“${t.texto}”` : t.texto });
}
deixas.push({ de: r.fechamento.inicio + 0.3, ate: r.fechamento.inicio + r.fechamento.duracao, texto: `${r.fechamento.titulo}\n${r.fechamento.linha}` });
deixas.sort((a, b) => a.de - b.de);
const vtt = ['WEBVTT', '', ...deixas.flatMap((d) => [`${ts(d.de)} --> ${ts(d.ate)}`, d.texto, ''])].join('\n');
fs.writeFileSync(`${base}.vtt`, vtt);

const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', `${base}.mp4`]).toString());
console.log(`publicado ${base}.{mp4,jpg,vtt} · ${dur.toFixed(1)} s · ${(fs.statSync(`${base}.mp4`).size / 1e6).toFixed(1)} MB · ${deixas.length} deixas`);
