// Corta os trechos de um vídeo de introdução a partir do bruto, com recorte e borrões.
// Uso: node scripts/cortar-intro.mjs <modulo> [id1,id2]   (lê public/intro/<modulo>/cortes.json; o bruto nunca é alterado)
// Cada corte vira public/intro/<modulo>/<id>.mp4: 1920x1080, 30 fps, H.264 sem áudio.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const modulo = process.argv[2];
if (!modulo) { console.error('uso: node scripts/cortar-intro.mjs <modulo>'); process.exit(1); }
const pasta = path.resolve('public/intro', modulo);
const cfg = JSON.parse(fs.readFileSync(path.join(pasta, 'cortes.json'), 'utf8'));
// cada corte pode vir de outro bruto do mesmo módulo ("fonte" no corte; senão vale a do arquivo)
const brutoDe = (c) => { const b = path.resolve('..', c.fonte ?? cfg.fonte); if (!fs.existsSync(b)) { console.error('bruto não encontrado:', b); process.exit(1); } return b; };
const so = process.argv[3] ? new Set(process.argv[3].split(',')) : null; // opcional: só estes ids

for (const c of cfg.cortes) {
  if (so && !so.has(c.id)) continue;
  const bruto = brutoDe(c);
  // borrão por caixa: recorta a área, desfoca forte e cola de volta (opcionalmente só a partir de um instante)
  const partes = [`[0:v]${cfg.recorte ?? 'crop=1920:1080:0:80'}${c.lento ? `,setpts=${c.lento}*PTS` : ''},fps=30,setsar=1[b0]`];
  let atual = 'b0';
  c.borrar.forEach((b, i) => {
    const nome = typeof b === 'string' ? b : b.caixa;
    const desde = typeof b === 'string' ? null : b.desde;
    const ate = typeof b === 'string' ? null : b.ate;
    const k = cfg.caixas[nome];
    const en = desde != null ? `:enable='gte(t,${desde})'` : ate != null ? `:enable='lt(t,${ate})'` : '';
    partes.push(`[${atual}]split[s${i}a][s${i}b]`);
    partes.push(`[s${i}b]crop=${k.w}:${k.h}:${k.x}:${k.y},gblur=sigma=22:steps=3,eq=brightness=0.02[z${i}]`);
    partes.push(`[s${i}a][z${i}]overlay=${k.x}:${k.y}${en}[b${i + 1}]`);
    atual = `b${i + 1}`;
  });
  const saida = path.join(pasta, `${c.id}.mp4`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(c.in), '-to', String(c.out), '-i', bruto,
    '-filter_complex', partes.join(';'), '-map', `[${atual}]`, '-an',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-g', '15', '-bf', '0', '-movflags', '+faststart', saida], { stdio: 'inherit' });
  console.log('ok', c.id, (c.out - c.in).toFixed(2), 's');
}
