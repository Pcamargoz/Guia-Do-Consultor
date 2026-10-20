/* Lista, por checklist, as etapas ainda sem selo "Verificado" — a fila de testes pronta para os agentes.
   Gera docs/testes/lacunas.md a partir dos mesmos dados dos checklists (nada é copiado à mão).
   Uso: node scripts/lacunas-checklists.mjs */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { CHECKLISTS, ONBOARDING } from './dados-checklists-estagiarios.mjs';
import { CONSULTOR } from './dados-checklist-consultor.mjs';
import { FLUXOS } from './dados-fluxos-consultor.mjs';
import { FLUXOS_OPERACAO } from './dados-fluxos-operacao.mjs';
import { FLUXOS_GESTAO } from './dados-fluxos-gestao.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROTULO = { d: 'doc', n: 'n/v' };
const limpar = (t) => t.replace(/\*\*|`/g, '').replace(/\s+/g, ' ').trim();

function lacunas(c) {
  const blocos = [];
  const pre = (c.prerequisitos || []).filter((p) => p.s !== 'v');
  if (pre.length) blocos.push({ titulo: 'Pré-requisitos', passos: pre });
  for (const f of c.fluxos || c.etapas || []) {
    const passos = f.passos.filter((p) => p.s !== 'v');
    if (passos.length) blocos.push({ titulo: f.titulo, onde: f.onde, passos });
  }
  const res = (c.resultado || []).filter((p) => p.s !== 'v');
  if (res.length) blocos.push({ titulo: 'Resultado esperado', passos: res });
  return blocos;
}

const todos = [...CHECKLISTS, ...[CONSULTOR, ...FLUXOS, ...FLUXOS_OPERACAO, ...FLUXOS_GESTAO], ONBOARDING];
let total = 0;
const secoes = [];
for (const c of todos) {
  const blocos = lacunas(c);
  const n = blocos.reduce((s, b) => s + b.passos.length, 0);
  if (!n) continue;
  total += n;
  secoes.push(`## ${c.titulo}  \`${c.arquivo}\` — ${n} etapa(s)\n\n${blocos.map((b) =>
    `**${b.titulo}**${b.onde ? ` · ${limpar(b.onde)}` : ''}\n${b.passos.map((p) => `- [ ] (${ROTULO[p.s]}) ${limpar(p.t)}${p.r ? ` → _${limpar(p.r)}_` : ''}`).join('\n')}`).join('\n\n')}`);
}

const saida = `# Fila de testes: etapas ainda sem "Verificado"

Gerado por \`node scripts/lacunas-checklists.mjs\` — ${total} etapas em ${secoes.length} checklists. \`doc\` = vem dos roteiros, \`n/v\` = não validado.
Ao validar uma etapa, mude \`s\` para \`'v'\` no arquivo de dados do checklist e rode \`npm run checklists\`. Regras e briefs em [README.md](README.md).

${secoes.join('\n\n')}
`;
await mkdir(path.join(RAIZ, 'docs/testes'), { recursive: true });
await writeFile(path.join(RAIZ, 'docs/testes/lacunas.md'), saida, 'utf8');
console.log(`docs/testes/lacunas.md: ${total} etapas em ${secoes.length} checklists`);
