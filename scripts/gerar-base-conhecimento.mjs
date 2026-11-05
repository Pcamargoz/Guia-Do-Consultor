/* Gera lib/conteudo/base-conhecimento.js a partir do Harness Faktory Flow (somente leitura) e dos dados
   já gerados do Harness que estão no Guia (checklists, roteiros de vídeo, manifests, seed dos módulos).
   Uso:
     node scripts/gerar-base-conhecimento.mjs --harness <pasta Harness-Arquitetura-Flow> [--versao AAAA-MM-DD] [--saida <arquivo>] [--verificar]
   (ou HARNESS_DIR=<pasta> no ambiente). --verificar não grava: sai com código 1 se a base versionada estiver desatualizada.
   Nada é inventado: cada bloco cita `fontes`; sem fonte → "em-preparacao". Ver refatoracao-guia-do-consultor/03 e 05. */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { carregarGuia, carregarHarness } from '../lib/conteudo/fontes.js';
import { montarBase } from '../lib/conteudo/montar.js';
import { montarDetalhe, montarResumo } from '../lib/conteudo/consultas.js';
import { validarDetalhe, validarResumo } from '../lib/conteudo/contrato.js';
import { VALORES_INICIAIS } from '../lib/visibilidade.js';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PADRAO_SAIDA = path.join(RAIZ, 'lib/conteudo/base-conhecimento.js');

export function hojeBrt(agora = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(agora);
}

export function serializarBase(base) {
  return `/* GERADO por scripts/gerar-base-conhecimento.mjs — não edite à mão.
   Fontes: Harness Faktory Flow (conhecimento/) e dados do Guia gerados do Harness. Cada bloco cita "fontes".
   Para atualizar: node scripts/gerar-base-conhecimento.mjs --harness <pasta do Harness> */
export const BASE = ${JSON.stringify(base, null, 1)};

export default BASE;
`;
}

/** Confere que a base produz respostas válidas no contrato para todos os perfis, módulos e jornadas. */
export function validarBaseContraContrato(base) {
  const erros = [];
  for (const papel of ['admin', 'consultor', 'estagiario']) {
    erros.push(...validarResumo(montarResumo(base, { papel, itens: VALORES_INICIAIS }), { admin: papel === 'admin' }).map((e) => `resumo(${papel}) ${e}`));
  }
  for (const m of base.modulos) {
    for (const jornada of ['inicial', 'consultor']) {
      const r = montarDetalhe(base, { modulo: m.id, jornada, papel: 'admin', itens: VALORES_INICIAIS });
      if (r.status !== 200) erros.push(`detalhe(${m.id}/${jornada}): status ${r.status}`);
      else erros.push(...validarDetalhe(r.corpo).map((e) => `detalhe(${m.id}/${jornada}) ${e}`));
    }
  }
  return erros;
}

export async function gerar({ harness, versao, raizGuia = RAIZ }) {
  const [h, g] = await Promise.all([carregarHarness(harness), carregarGuia(raizGuia)]);
  return montarBase({ harness: h, guia: g, versao });
}

async function versaoAtual(saida) {
  try { return /"versao": "([^"]+)"/.exec(await readFile(saida, 'utf8'))?.[1] || null; } catch { return null; }
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
  const texto = serializarBase(base);
  const materiais = base.modulos.flatMap((m) => m.materiais);
  const secoes = base.modulos.flatMap((m) => [...m.jornadas.inicial, ...m.jornadas.consultor]);
  const resumo = `${base.modulos.length} módulos · ${materiais.length} materiais (${materiais.filter((m) => m.status === 'disponivel').length} disponíveis) · ${secoes.length} seções (${secoes.filter((s) => s.status === 'em-preparacao').length} em preparação) · ${Object.keys(base.caminhos).length} caminhos protegidos · ${base.pendencias.length} pendência(s)`;

  if (values.verificar) {
    let atual = '';
    try { atual = await readFile(saida, 'utf8'); } catch { /* sem arquivo */ }
    if (atual !== texto) { console.error(`✖ ${path.relative(RAIZ, saida)} está desatualizada. Rode o gerador.`); process.exit(1); }
    console.log(`✔ Base em dia (${versao}): ${resumo}`);
    return;
  }
  await writeFile(saida, texto);
  console.log(`✔ ${path.relative(RAIZ, saida)} (${versao}): ${resumo}`);
  for (const p of base.pendencias) console.log(`  · pendência: ${p}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => { console.error(err.message); process.exit(1); });
}
