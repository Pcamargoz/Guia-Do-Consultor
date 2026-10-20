/* Valida os checklists gerados e a integração com o guia (critérios de aceite verificáveis, sem navegador).
   Confere: manifest × arquivos, scripts embutidos, ids únicos, contagem de etapas, links do onboarding, regra de download,
   cópia de trabalho idêntica e arquivos do guia. Sai com código 1 se algo falhar.
   Uso: node scripts/validar-checklists.mjs */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(RAIZ, 'public/checklists');
const COPIA = path.join(RAIZ, 'Checklists');
const falhas = [];
const ok = [];
const checar = (condicao, rotulo, detalhe = '') => { (condicao ? ok : falhas).push(condicao ? rotulo : `${rotulo}${detalhe ? ` — ${detalhe}` : ''}`); return !!condicao; };
const ler = (p) => readFile(p, 'utf8');
const ultimoScript = (html) => html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));

const manifest = JSON.parse(await ler(path.join(PUB, 'manifest.json')));
checar(manifest.grupos?.length === 3, 'manifest tem os 3 grupos');
const gruposValidos = new Set(manifest.grupos.map((g) => g.id));

/* Regra de download: lida do próprio arquivo da rota */
const rota = await ler(path.join(RAIZ, 'lib/rotas/checklists-download.js'));
const regra = rota.match(/ARQUIVO_VALIDO = (\/.+\/);/);
const permitido = regra ? new Function(`return ${regra[1]}`)() : null;
checar(!!permitido, 'rota de download expõe ARQUIVO_VALIDO');

const ids = new Set();
const resumo = [];
for (const i of manifest.itens) {
  const rotulo = i.arquivo;
  for (const campo of ['grupo', 'id', 'area', 'titulo', 'resumo', 'arquivo']) checar(i[campo], `${rotulo}: campo ${campo}`);
  checar(gruposValidos.has(i.grupo), `${rotulo}: grupo conhecido`);
  checar(!ids.has(i.arquivo), `${rotulo}: arquivo único no manifest`); ids.add(i.arquivo);
  checar(permitido?.test(i.arquivo), `${rotulo}: aceito pela rota de download`);
  const caminho = path.join(PUB, i.arquivo);
  if (!checar(existsSync(caminho), `${rotulo}: arquivo existe`)) continue;
  const html = await ler(caminho);
  try { new Function(i.grupo === 'qa' ? html.slice(html.indexOf('<script>\n/* =') + 8, html.lastIndexOf('</script>')) : ultimoScript(html)); ok.push(`${rotulo}: script válido`); }
  catch (e) { falhas.push(`${rotulo}: script com erro — ${e.message}`); }
  if (i.grupo === 'qa') continue;

  const corpo = html.slice(0, html.lastIndexOf("<script>"));
  const dataIds = [...corpo.matchAll(/data-id="([^"]+)"/g)].map((m) => m[1]);
  checar(new Set(dataIds).size === dataIds.length, `${rotulo}: ids de etapa únicos`);
  checar(dataIds.length === i.etapas, `${rotulo}: etapas do manifest = caixas no HTML`, `${i.etapas} × ${dataIds.length}`);
  checar(html.includes(`data-chave="${i.chave}"`), `${rotulo}: chave de progresso do manifest`);
  /* a legenda do herói traz um selo de cada tipo */
  const contarSelos = (c) => (html.match(new RegExp(`class="selo st-${c}"`, 'g')) || []).length - 1;
  const selos = { v: contarSelos('v'), d: contarSelos('d'), n: contarSelos('n') };
  checar(selos.v === i.verificadas, `${rotulo}: verificadas do manifest = selos`, `${i.verificadas} × ${selos.v}`);
  checar(!/undefined|\[object Object\]|NaN/.test(html), `${rotulo}: sem "undefined/NaN" no texto`);
  checar((html.match(/<h1>/g) || []).length === 1, `${rotulo}: um único h1`);
  for (const m of html.matchAll(/href="([^"#]+\.html)"/g)) checar(existsSync(path.join(path.dirname(caminho), m[1])), `${rotulo}: link ${m[1]} existe`);
  resumo.push([i.arquivo, i.etapas, selos.v, selos.d, selos.n]);
}

/* Cópia de trabalho idêntica */
if (existsSync(COPIA)) {
  const arquivos = (await readdir(COPIA, { recursive: true })).filter((f) => !f.startsWith('.') && (f.endsWith('.html') || f.endsWith('.json')));
  let diferentes = 0;
  for (const f of arquivos) {
    const outro = path.join(PUB, f);
    if (!existsSync(outro) || (await ler(outro)) !== (await ler(path.join(COPIA, f)))) diferentes++;
  }
  checar(diferentes === 0, 'Checklists/ idêntica a public/checklists/', `${diferentes} diferentes`);
}

/* Guia */
const index = await ler(path.join(RAIZ, 'public/index.html'));
for (const arq of ['guia-checklists.css', 'guia-checklists.js', 'guia-abas.css', 'guia-abas.js']) {
  checar(index.includes(arq) && existsSync(path.join(RAIZ, 'public', arq)), `index.html carrega ${arq}`);
}
try { execFileSync(process.execPath, ['--check', path.join(RAIZ, 'public/guia-checklists.js')]); ok.push('guia-checklists.js: sintaxe'); }
catch (e) { falhas.push(`guia-checklists.js: sintaxe — ${e.message.split('\n')[0]}`); }
const css = await ler(path.join(RAIZ, 'public/guia-checklists.css'));
checar((css.match(/{/g) || []).length === (css.match(/}/g) || []).length, 'guia-checklists.css: chaves balanceadas');
checar(css.includes('prefers-reduced-motion'), 'guia-checklists.css respeita prefers-reduced-motion');
checar(!/\.ck-(item|lista|toolbar)/.test(await ler(path.join(RAIZ, 'public/guia-abas.css'))), 'guia-abas.css sem estilos antigos de checklist');

console.log('\nEtapas por checklist (total · verificadas · documentação · não validadas)');
for (const [a, t, v, d, n] of resumo) console.log(`  ${a.padEnd(52)} ${String(t).padStart(3)} · ${String(v).padStart(3)} · ${String(d).padStart(3)} · ${String(n).padStart(3)}`);
console.log(`\n${ok.length} verificações passaram, ${falhas.length} falharam.`);
if (falhas.length) { console.log(falhas.map((f) => `  ✗ ${f}`).join('\n')); process.exit(1); }
