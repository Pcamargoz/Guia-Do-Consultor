// Renderiza um vídeo de fluxo e publica no Guia do Consultor.
// Uso: node scripts/render.mjs fluxo-1-vendas [--rascunho]
// 1. preparar.mjs (tempos medidos da narração) · 2. Remotion → out/<id>-master.mp4
// 3. versão para a web em ../public/videos/<id>.mp4 (H.264 yuv420p, AAC, faststart) e a capa <id>.jpg
// 4. atualiza a duração no ../public/videos/manifest.json
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GUIA = path.resolve(RAIZ, '..', 'public', 'videos');
const id = process.argv[2];
if (!id) { console.error('uso: node scripts/render.mjs <id> [--rascunho]'); process.exit(1); }
const rascunho = process.argv.includes('--rascunho');
const roda = (cmd, args) => execFileSync(cmd, args, { cwd: RAIZ, stdio: 'inherit', shell: process.platform === 'win32' });

roda('node', ['scripts/preparar.mjs', id]);
const dados = JSON.parse(fs.readFileSync(path.join(RAIZ, 'src', 'gerado', `${id}.json`), 'utf8'));
fs.mkdirSync(path.join(RAIZ, 'out'), { recursive: true });
const master = path.join(RAIZ, 'out', `${id}-${rascunho ? 'rascunho' : 'master'}.mp4`);
roda('npx', ['remotion', 'render', 'src/index.ts', id, master, ...(rascunho ? ['--scale=0.5', '--crf=28'] : []), '--log=error']);
if (rascunho) { console.log(`rascunho: ${master}`); process.exit(0); }

fs.mkdirSync(GUIA, { recursive: true });
const web = path.join(GUIA, `${id}.mp4`);
// volume de entrega em -14 LUFS (DIRECTOR.md do lemo-opuscar)
roda('ffmpeg', ['-y', '-loglevel', 'error', '-i', master, '-vf', 'scale=in_range=full:out_range=tv,format=yuv420p',
  '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11',
  '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow', '-crf', '24', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', web]);

// checagens antes de publicar: quadros pretos e volume integrado
const checar = (args) => { try { return execFileSync('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] }).toString(); } catch (e) { return String(e.stderr ?? e); } };
const pretos = (checar(['-hide_banner', '-i', web, '-vf', 'blackdetect=d=0.5:pix_th=0.08', '-an', '-f', 'null', '-']).match(/black_start/g) ?? []).length;
const lufs = checar(['-hide_banner', '-i', web, '-af', 'ebur128', '-f', 'null', '-']).match(/I:\s+(-?[\d.]+) LUFS/g)?.pop();
console.log(`checagem: ${pretos} trecho(s) preto(s) de 0,5 s ou mais · volume ${lufs ?? 'não medido'}`);
if (pretos > 0) console.warn('ATENÇÃO: há quadros pretos no vídeo; confira antes de publicar.');

// legenda .vtt (as mesmas frases queimadas no vídeo), para o player do Guia
const hms = (s) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = (s % 60).toFixed(3).padStart(6, '0'); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${x}`; };
const cues = dados.trechos.flatMap((t) => (t.legendas ?? []).map((l) => ({ ini: t.inicio + l.ini, fim: t.inicio + l.fim + 0.6, texto: l.texto })));
cues.forEach((c, i) => { if (cues[i + 1]) c.fim = Math.min(Math.max(c.fim, c.ini + 1.8), cues[i + 1].ini); });
fs.writeFileSync(path.join(GUIA, `${id}.vtt`), 'WEBVTT\n\n' + cues.map((c) => `${hms(c.ini)} --> ${hms(c.fim)}\n${c.texto}\n`).join('\n'));
// capa: o quadro do título (2,5 s)
roda('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '2.5', '-i', master, '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '3', path.join(GUIA, `${id}.jpg`)]);

const seg = Math.round(dados.duracaoTotal);
const duracao = `${Math.floor(seg / 60)} min ${String(seg % 60).padStart(2, '0')} s`;
const arqManifest = path.join(GUIA, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(arqManifest, 'utf8'));
for (const t of manifest.trilhas) for (const v of t.videos) if (v.id === id) { v.duracao = duracao; v.status = 'pronto'; }
fs.writeFileSync(arqManifest, JSON.stringify(manifest, null, 2) + '\n');
const mb = (fs.statSync(web).size / 1048576).toFixed(1);
console.log(`publicado: public/videos/${id}.mp4 (${mb} MB, ${duracao})`);
// o bloco "Vídeo do fluxo" do checklist só aparece quando o mp4 existe: regenera e valida os checklists
execFileSync('node', ['scripts/gerar-checklists-estagiarios.mjs'], { cwd: path.resolve(RAIZ, '..'), stdio: 'inherit' });
execFileSync('node', ['scripts/validar-checklists.mjs'], { cwd: path.resolve(RAIZ, '..'), stdio: 'inherit' });
