/* Gera db/migrations/003_pacotes_e_horas.sql a partir de:
     db/dados/planilha-horas.json  (extraído de docs/Comparativo_Flow_com_Distribuicao_de_Horas_1 (2).xlsx)
     db/dados/mapa-checklist.json  (itens da Checklist de Validação ↔ funcionalidades da planilha)
   Reproduz a aba "Distribuicao por Pacote" da planilha na base Premium · até 5 usuários:
     total do pacote → blocos (frações sobre 16h, redistribuídas quando o bloco não existe no pacote)
     → horas por módulo → horas por item da checklist (proporcional ao peso).
   Uso: node scripts/gerar-horas.mjs */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const ler = async (rel) => JSON.parse(await readFile(path.join(RAIZ, rel), 'utf8'));
const planilha = await ler('db/dados/planilha-horas.json');
const mapa = await ler('db/dados/mapa-checklist.json');

const ARREDONDAR_MIN = 5;
const slug = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const funcionalidades = planilha.funcionalidades.filter((f) => f.modulo !== 'Implantação');

/* ---------- Itens atuais da checklist (mesmos ids da migration 002) ---------- */
const guia = await readFile(path.join(RAIZ, 'public/index.html'), 'utf8');
let trecho = guia.slice(guia.indexOf('const modulos = ['), guia.indexOf('/* ==================== RENDERIZAR'));
trecho = trecho.slice(0, trecho.lastIndexOf('];') + 2).replace('const modulos =', 'return');
const modulosGuia = new Function(trecho)();
const itensDoModulo = Object.fromEntries(modulosGuia.map((m) => [m.id, m.checklist.map((texto, n) => ({ id: `${m.id}-checklist-${n + 1}`, texto }))]));
const nomeDoModulo = Object.fromEntries(modulosGuia.map((m) => [m.id, m.nome]));

for (const [id, funcs] of Object.entries(mapa.itens)) {
  for (const f of funcs) {
    if (!funcionalidades.some((x) => x.funcionalidade === f)) throw new Error(`Funcionalidade inexistente no mapa (${id}): ${f}`);
  }
}

/* ---------- Blocos da planilha (horas base calibradas em 16h) ---------- */
const BLOCOS = [
  { chave: 'ra', etapa: 'RA - Reunião de Alinhamento', base: 0.5, fixo: true },
  { chave: 'cem', etapa: 'Configuração de integração (CEM) + Validação de dados', base: 0.5, fixo: true },
  { chave: 'vendas', base: 2, modulos: ['Vendas'] },
  { chave: 'fatfis', base: 2, modulos: ['Faturamento', 'Fiscal'] },
  { chave: 'financeiro', base: 2, modulos: ['Financeiro'] },
  { chave: 'duvidas', etapa: 'Dúvidas + simulação de fluxo', base: 1, fixo: true },
  { chave: 'golive', etapa: 'Go-live', base: 4, fixo: true },
  { chave: 'encerramento', etapa: 'Encerramento + feedback', base: 1, fixo: true },
  { chave: 'outros', base: 3, modulos: null }, // demais módulos
];
const conferirBase = BLOCOS.map((b) => b.base).join();
if (conferirBase !== planilha.blocosBase16h.map((b) => b.horasBase).join()) throw new Error('Blocos base diferentes da planilha.');

const PRINCIPAIS = ['Vendas', 'Faturamento', 'Fiscal', 'Financeiro'];

function calcularPacote(nomePacote, ordem) {
  const incluidas = funcionalidades.filter((f) => f.pacotes.includes(nomePacote));
  const pesoModulo = (m) => incluidas.filter((f) => f.modulo === m).reduce((s, f) => s + f.peso, 0);
  const modulosPlanilha = [...new Set(incluidas.map((f) => f.modulo))];
  const outros = modulosPlanilha.filter((m) => !PRINCIPAIS.includes(m));

  const precoBase = planilha.precos[nomePacote].Premium[0];
  const pesoBloco = (b) => (b.fixo ? 1 : (b.modulos || outros).reduce((s, m) => s + pesoModulo(m), 0));
  const presentes = BLOCOS.filter((b) => pesoBloco(b) > 0);
  const somaFracoes = presentes.reduce((s, b) => s + b.base / 16, 0);
  const horasBloco = (b) => (pesoBloco(b) > 0 ? (b.base / 16 / somaFracoes) * precoBase : 0);

  // Horas exatas (em minutos) de cada folha: etapas fixas, recursos sem módulo e itens da checklist.
  const folhas = [];
  for (const b of BLOCOS) {
    const horas = horasBloco(b);
    if (!horas) continue;
    if (b.fixo) { folhas.push({ tipo: 'etapa', bloco: b.chave, id: b.chave, texto: b.etapa, minutos: horas * 60 }); continue; }
    const doBloco = b.modulos || outros;
    const pesoTotal = pesoBloco(b);
    for (const m of doBloco) {
      const w = pesoModulo(m);
      if (!w) continue;
      const minutosModulo = (horas * 60 * w) / pesoTotal;
      const moduloId = mapa.modulosPlanilha[m];
      if (!moduloId) {
        const nomes = incluidas.filter((f) => f.modulo === m).map((f) => f.funcionalidade);
        folhas.push({ tipo: 'recurso', bloco: b.chave, id: `recurso-${slug(m)}`, texto: m, detalhe: nomes.join(', '), minutos: minutosModulo });
        continue;
      }
      const itens = itensDoModulo[moduloId];
      const doModulo = incluidas.filter((f) => f.modulo === m);
      const ligadas = new Map(); // funcionalidade → itens que a citam
      for (const it of itens) for (const f of mapa.itens[it.id] || []) ligadas.set(f, [...(ligadas.get(f) || []), it.id]);
      const pesos = Object.fromEntries(itens.map((it) => [it.id, 1]));
      for (const f of doModulo) {
        const alvos = ligadas.get(f.funcionalidade) || itens.map((it) => it.id);
        for (const alvo of alvos) pesos[alvo] += f.peso / alvos.length;
      }
      const somaPesos = Object.values(pesos).reduce((s, v) => s + v, 0);
      for (const it of itens) {
        folhas.push({ tipo: 'item', bloco: b.chave, moduloId, id: it.id, texto: it.texto, minutos: (minutosModulo * pesos[it.id]) / somaPesos });
      }
    }
  }

  // Arredondamento hierárquico pelo maior resto, em blocos de 5 min: cada nível preserva a soma do nível acima
  // (pacote → blocos → módulos/recursos → itens), então o total bate exatamente com a tabela de preços.
  const distribuir = (totalUnidades, partes) => {
    const exatas = partes.map((p) => p.valor);
    const soma = exatas.reduce((x, y) => x + y, 0) || 1;
    const ideais = exatas.map((v) => (v / soma) * totalUnidades);
    const base = ideais.map(Math.floor);
    let faltam = totalUnidades - base.reduce((x, y) => x + y, 0);
    ideais.map((v, i) => [v - base[i], i]).sort((x, y) => y[0] - x[0]).forEach(([, i]) => { if (faltam > 0) { base[i] += 1; faltam -= 1; } });
    return base;
  };
  const U = ARREDONDAR_MIN;
  const grupos = new Map(); // bloco → (grupo módulo/recurso/etapa → folhas)
  for (const f of folhas) {
    const bloco = f.bloco;
    if (!grupos.has(bloco)) grupos.set(bloco, new Map());
    const chave = f.tipo === 'item' ? f.moduloId : f.id;
    const g = grupos.get(bloco);
    g.set(chave, [...(g.get(chave) || []), f]);
  }
  const blocosLista = [...grupos.entries()].map(([bloco, g]) => ({ bloco, g, valor: [...g.values()].flat().reduce((x, f) => x + f.minutos, 0) }));
  const unidadesBloco = distribuir(Math.round((precoBase * 60) / U), blocosLista);
  blocosLista.forEach((bl, i) => {
    const gruposLista = [...bl.g.values()].map((fs) => ({ fs, valor: fs.reduce((x, f) => x + f.minutos, 0) }));
    const unidadesGrupo = distribuir(unidadesBloco[i], gruposLista);
    gruposLista.forEach((gr, k) => {
      const unidadesFolha = distribuir(unidadesGrupo[k], gr.fs.map((f) => ({ valor: f.minutos })));
      gr.fs.forEach((f, n) => { f.minutos = unidadesFolha[n] * U; });
    });
  });
  const total = folhas.reduce((s, f) => s + f.minutos, 0);
  if (total !== precoBase * 60) throw new Error(`Total de ${nomePacote} não fecha: ${total} ≠ ${precoBase * 60}`);

  const modulosIds = [...new Set(folhas.filter((f) => f.tipo === 'item').map((f) => f.moduloId))];
  return {
    id: slug(nomePacote),
    ordem,
    nome: nomePacote,
    nivel: nomePacote === 'Starter' ? 'Essencial' : nomePacote.includes('Pro') || nomePacote === 'Enterprise' ? 'Pro' : 'Standard',
    precos: planilha.precos[nomePacote],
    modulos: modulosIds,
    funcionalidades: incluidas.map((f) => ({
      modulo: f.modulo, moduloId: mapa.modulosPlanilha[f.modulo] || null, funcionalidade: f.funcionalidade,
      nivel: f.nivel, complexidade: f.complexidade, peso: f.peso,
    })),
    etapas: folhas.filter((f) => f.tipo !== 'item').map((f) => ({
      id: f.id, grupo: f.tipo, texto: f.texto, ...(f.detalhe ? { detalhe: f.detalhe } : {}), minutos: f.minutos,
    })),
    itens: folhas.filter((f) => f.tipo === 'item'),
  };
}

const pacotes = planilha.pacotes.map((nome, i) => calcularPacote(nome, i + 1));

/* ---------- Minutos por item, por pacote ---------- */
const minutosPorItem = {};
for (const p of pacotes) for (const it of p.itens) (minutosPorItem[it.id] ??= {})[p.id] = it.minutos;

/* ---------- SQL ---------- */
const q = (v) => `'${String(v).replace(/'/g, "''")}'`;
const j = (v) => `${q(JSON.stringify(v))}::jsonb`;

let sql = `-- Faktory Flow — pacotes de implantação e horas por item da checklist.
-- GERADO por scripts/gerar-horas.mjs a partir de db/dados/planilha-horas.json e db/dados/mapa-checklist.json.
-- Base das horas: fluxo Premium, até 5 usuários (demais fluxos/faixas são proporcionais à tabela de preços).

CREATE TABLE IF NOT EXISTS pacotes (
  id              text        PRIMARY KEY,
  ordem           integer     NOT NULL,
  nome            text        NOT NULL,
  nivel           text        NOT NULL,
  -- horas da tabela de preços por fluxo e faixa de usuários: {"Premium": [..6], "Rápida": [..6]}
  precos          jsonb       NOT NULL,
  -- ids dos módulos do guia incluídos no pacote
  modulos         jsonb       NOT NULL,
  -- funcionalidades da planilha incluídas no pacote (nível, complexidade, peso)
  funcionalidades jsonb       NOT NULL,
  -- etapas fixas de implantação e recursos sem módulo no guia: [{id, grupo, texto, detalhe?, minutos}]
  etapas          jsonb       NOT NULL,
  rev             integer     NOT NULL DEFAULT 1,
  criado_em       timestamptz NOT NULL DEFAULT now(),
  atualizado_em   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pacotes_historico (
  id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pacote_id  text        NOT NULL REFERENCES pacotes (id) ON DELETE CASCADE,
  em         timestamptz NOT NULL DEFAULT now(),
  detalhe    text        NOT NULL DEFAULT '',
  autor      text        NOT NULL DEFAULT '',
  usuario_id bigint      REFERENCES usuarios (id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS pacotes_historico_por_pacote ON pacotes_historico (pacote_id, em DESC);

`;
for (const p of pacotes) {
  sql += `INSERT INTO pacotes (id, ordem, nome, nivel, precos, modulos, funcionalidades, etapas) VALUES (${q(p.id)}, ${p.ordem}, ${q(p.nome)}, ${q(p.nivel)}, ${j(p.precos)}, ${j(p.modulos)}, ${j(p.funcionalidades)}, ${j(p.etapas)})\n  ON CONFLICT (id) DO NOTHING;\n`;
}

sql += `
-- Minutos previstos por pacote em cada item da Checklist de Validação.
-- Só preenche itens que ainda não têm horas (preserva o que já tiver sido editado).
WITH horas (item_id, minutos) AS (VALUES
${Object.entries(minutosPorItem).map(([id, m]) => `  (${q(id)}, ${j(m)})`).join(',\n')}
)
UPDATE modulos m
SET dados = jsonb_set(m.dados, '{checklist}', (
  SELECT jsonb_agg(
    CASE WHEN h.minutos IS NOT NULL AND NOT (e.item ? 'minutos') THEN e.item || jsonb_build_object('minutos', h.minutos) ELSE e.item END
    ORDER BY e.ordem)
  FROM jsonb_array_elements(m.dados->'checklist') WITH ORDINALITY AS e(item, ordem)
  LEFT JOIN horas h ON h.item_id = e.item->>'id'
))
WHERE jsonb_typeof(m.dados->'checklist') = 'array' AND jsonb_array_length(m.dados->'checklist') > 0;
`;

await writeFile(path.join(RAIZ, 'db/migrations/003_pacotes_e_horas.sql'), sql);

/* ---------- Resumo para conferência ---------- */
const hm = (min) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, '0')}`;
for (const p of pacotes) {
  const porModulo = {};
  for (const it of p.itens) porModulo[it.moduloId] = (porModulo[it.moduloId] || 0) + it.minutos;
  const etapas = p.etapas.filter((e) => e.grupo === 'etapa').reduce((s, e) => s + e.minutos, 0);
  const recursos = p.etapas.filter((e) => e.grupo === 'recurso').reduce((s, e) => s + e.minutos, 0);
  console.log(`\n${p.nome} (${p.nivel}) — ${p.precos.Premium[0]}h · etapas ${hm(etapas)} · recursos ${hm(recursos)} · ${p.funcionalidades.length} funcionalidades`);
  console.log('  ' + Object.entries(porModulo).map(([m, min]) => `${nomeDoModulo[m]} ${hm(min)}`).join(' | '));
}
console.log('\nOK: db/migrations/003_pacotes_e_horas.sql');
