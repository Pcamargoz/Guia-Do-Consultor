/* Gera lib/conteudo/base/ (índice + um JSON por módulo + carregar.js) a partir do Harness Faktory Flow
   (somente leitura) e dos dados já gerados do Harness que estão no Guia (checklists, roteiros de vídeo,
   manifests, seed dos módulos).
   Uso:
     node scripts/gerar-base-conhecimento.mjs --harness <pasta Harness-Arquitetura-Flow> [--versao AAAA-MM-DD] [--saida <pasta>] [--verificar]
   (ou HARNESS_DIR=<pasta> no ambiente). --verificar não grava: sai com código 1 se algum arquivo da base
   versionada estiver desatualizado, faltando ou sobrando.
   Nada é inventado: cada bloco cita `fontes`; sem fonte → "em-preparacao". Ver refatoracao-guia-do-consultor/03 e 05. */
import { readdir, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { carregarGuia, carregarHarness } from '../lib/conteudo/fontes.js';
import { montarBase } from '../lib/conteudo/montar.js';
import { montarDetalhe, montarResumo } from '../lib/conteudo/consultas.js';
import { validarDetalhe, validarResumo } from '../lib/conteudo/contrato.js';
import { VALORES_INICIAIS } from '../lib/visibilidade.js';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PADRAO_SAIDA = path.join(RAIZ, 'lib/conteudo/base');
const ID_SEGURO = /^[a-z0-9-]+$/;

export function hojeBrt(agora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(agora);
}

const comoJson = (x) => `${JSON.stringify(x, null, 1)}\n`;

/** Índice = base sem jornadas nem conteúdo retido (é o que o resumo precisa). */
export function indiceDaBase(base) {
  return { ...base, modulos: base.modulos.map(({ jornadas, retido, ...m }) => m) };
}

/**
 * Base → arquivos da pasta lib/conteudo/base/ ({ nome: texto }):
 *   indice.json · <modulo>.json ({ versao, id, jornadas, retido? }) · carregar.js (imports estáticos) · LEIA-ME.md
 */
export function serializarBase(base) {
  const arquivos = {};
  for (const m of base.modulos) if (!ID_SEGURO.test(m.id) || m.id === 'indice') throw new Error(`id de módulo inválido para arquivo: "${m.id}"`);
  arquivos['indice.json'] = comoJson(indiceDaBase(base));
  for (const m of base.modulos) {
    arquivos[`${m.id}.json`] = comoJson({ versao: base.versao, id: m.id, jornadas: m.jornadas, ...(m.retido ? { retido: m.retido } : {}) });
  }
  arquivos['carregar.js'] = `/* GERADO por scripts/gerar-base-conhecimento.mjs — não edite à mão.
   import() estático de cada JSON: carga sob demanda e o rastreador de arquivos da Vercel inclui todos no deploy. */
export const carregarIndiceJson = () => import('./indice.json', { with: { type: 'json' } });

export const MODULOS = Object.freeze({
${base.modulos.map((m) => `  '${m.id}': () => import('./${m.id}.json', { with: { type: 'json' } }),`).join('\n')}
});
`;
  arquivos['LEIA-ME.md'] = `# Base de conhecimento (GERADA — não edite à mão)

Gerada por \`node scripts/gerar-base-conhecimento.mjs --harness <pasta do Harness>\` (versão ${base.versao}).
Fontes: Harness Faktory Flow (conhecimento/) e dados do Guia gerados do Harness. Cada bloco cita \`fontes\`.

- \`indice.json\`: versão, módulos (cabeçalho + materiais), caminhos protegidos e pendências. Basta para o resumo.
- \`<modulo>.json\`: as jornadas (seções e blocos) de um módulo, lidas só quando o módulo é aberto.
  \`retido\` = conteúdo semente de módulo em preparação, guardado e nunca servido.
- \`carregar.js\`: import() estático de cada arquivo (lib/conteudo/base.js usa).

Conferir sem gravar: \`node scripts/gerar-base-conhecimento.mjs --harness <pasta> --verificar\`.
`;
  return arquivos;
}

/** Confere que a base produz respostas válidas no contrato para todos os perfis, módulos e jornadas. */
export function validarBaseContraContrato(base) {
  const erros = [];
  const indice = indiceDaBase(base);
  for (const papel of ['admin', 'consultor', 'estagiario']) {
    erros.push(...validarResumo(montarResumo(indice, { papel, itens: VALORES_INICIAIS }), { admin: papel === 'admin' }).map((e) => `resumo(${papel}) ${e}`));
  }
  for (const m of base.modulos) {
    for (const jornada of ['inicial', 'consultor']) {
      for (const papel of ['admin', 'consultor', 'estagiario']) {
        const r = montarDetalhe(indice, { modulo: m.id, jornada, papel, itens: VALORES_INICIAIS, conteudo: { id: m.id, jornadas: m.jornadas } });
        if (r.status === 403 && papel !== 'admin') continue;
        if (r.status !== 200) erros.push(`detalhe(${m.id}/${jornada}/${papel}): status ${r.status}`);
        else erros.push(...validarDetalhe(r.corpo).map((e) => `detalhe(${m.id}/${jornada}/${papel}) ${e}`));
      }
    }
  }
  return erros;
}

export async function gerar({ harness, versao, raizGuia = RAIZ }) {
  const [h, g] = await Promise.all([carregarHarness(harness), carregarGuia(raizGuia)]);
  return montarBase({ harness: h, guia: g, versao });
}

async function versaoAtual(saida) {
  try { return JSON.parse(await readFile(path.join(saida, 'indice.json'), 'utf8')).versao || null; } catch { return null; }
}

async function lerPasta(saida) {
  try { return await readdir(saida); } catch { return []; }
}

/** Compara os arquivos esperados com a pasta: { desatualizados, faltando, sobrando }. */
export async function compararPasta(saida, arquivos) {
  const existentes = await lerPasta(saida);
  const desatualizados = [];
  const faltando = [];
  for (const [nome, texto] of Object.entries(arquivos)) {
    if (!existentes.includes(nome)) { faltando.push(nome); continue; }
    if ((await readFile(path.join(saida, nome), 'utf8')) !== texto) desatualizados.push(nome);
  }
  const sobrando = existentes.filter((n) => !(n in arquivos));
  return { desatualizados, faltando, sobrando };
}

async function main() {
  const { values } = parseArgs({ options: { harness: { type: 'string' }, versao: { type: 'string' }, saida: { type: 'string' }, verificar: { type: 'boolean', default: false } } });
  const harness = values.harness || process.env.HARNESS_DIR;
  if (!harness) throw new Error('Informe a pasta do Harness: --harness <pasta Harness-Arquitetura-Flow> ou HARNESS_DIR.');
  const saida = path.resolve(values.saida || PADRAO_SAIDA);
  const versao = values.versao || (values.verificar ? await versaoAtual(saida) : null) || hojeBrt();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(versao)) throw new Error('--versao deve ser AAAA-MM-DD.');

  const base = await gerar({ harness: path.resolve(harness), versao });
  const erros = validarBaseContraContrato(base);
  if (erros.length) {
    console.error(`✖ A base não respeita o contrato (${erros.length} erro(s)):\n  ${erros.slice(0, 30).join('\n  ')}`);
    process.exit(1);
  }
  const arquivos = serializarBase(base);
  const materiais = base.modulos.flatMap((m) => m.materiais);
  const secoes = base.modulos.flatMap((m) => [...m.jornadas.inicial, ...m.jornadas.consultor]);
  const bytes = Object.fromEntries(Object.entries(arquivos).map(([n, t]) => [n, Buffer.byteLength(t)]));
  const jsonModulos = Object.entries(bytes).filter(([n]) => n.endsWith('.json') && n !== 'indice.json').map(([, b]) => b);
  const kb = (b) => `${(b / 1024).toFixed(1)} KB`;
  const resumo = `${base.modulos.length} módulos · ${materiais.length} materiais (${materiais.filter((m) => m.status === 'disponivel').length} disponíveis) · ${secoes.length} seções (${secoes.filter((s) => s.status === 'em-preparacao').length} em preparação) · ${Object.keys(base.caminhos).length} caminhos protegidos · ${base.pendencias.length} pendência(s)`;
  const tamanhos = `índice ${kb(bytes['indice.json'])} · módulos ${kb(Math.min(...jsonModulos))}–${kb(Math.max(...jsonModulos))} (total ${kb(jsonModulos.reduce((a, b) => a + b, 0))})`;
  const rel = path.relative(RAIZ, saida) || '.';

  if (values.verificar) {
    const { desatualizados, faltando, sobrando } = await compararPasta(saida, arquivos);
    if (desatualizados.length || faltando.length || sobrando.length) {
      console.error(`✖ ${rel}/ está desatualizada. Rode o gerador.`);
      if (desatualizados.length) console.error(`  desatualizados: ${desatualizados.join(', ')}`);
      if (faltando.length) console.error(`  faltando: ${faltando.join(', ')}`);
      if (sobrando.length) console.error(`  sobrando: ${sobrando.join(', ')}`);
      process.exit(1);
    }
    console.log(`✔ Base em dia (${versao}): ${resumo}\n  ${tamanhos}`);
    return;
  }
  await mkdir(saida, { recursive: true });
  const { sobrando } = await compararPasta(saida, arquivos);
  for (const nome of sobrando) if (/^[a-z0-9-]+\.json$/.test(nome)) await rm(path.join(saida, nome));
  for (const [nome, texto] of Object.entries(arquivos)) await writeFile(path.join(saida, nome), texto);
  console.log(`✔ ${rel}/ (${versao}): ${Object.keys(arquivos).length} arquivos · ${resumo}\n  ${tamanhos}`);
  for (const p of base.pendencias) console.log(`  · pendência: ${p}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => { console.error(err.message); process.exit(1); });
}
