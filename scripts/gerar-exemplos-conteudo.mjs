/* Gera os JSON de EXEMPLO (dados fictícios) no formato exato do contrato-componentes.md v1, para o UI/UX
   trabalhar sem banco. Usa o mesmo montador da base real com fontes fictícias (scripts/testes/fixtures).
   Uso: node scripts/gerar-exemplos-conteudo.mjs [--saida <pasta>]   (padrão: ./exemplos, fora do git) */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { montarBase } from '../lib/conteudo/montar.js';
import { montarDetalhe, montarResumo } from '../lib/conteudo/consultas.js';
import { listaAdmin, mapaEfetivo, mesclarComPadrao, validarAtualizacao, itemAdmin } from '../lib/visibilidade.js';
import { carregarPlataforma } from './testes/apoio/carregar-plataforma.mjs';
import { guiaFicticio, harnessFicticio, MAPA_FICTICIO, VERSAO_FICTICIA } from './testes/fixtures/fontes-ficticias.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Linhas fictícias da tabela `visibilidade` (o que o admin já mudou). */
export const LINHAS_FICTICIAS = [
  { chave: 'modulo:estoque', visivel: true, perfis: ['consultor'], atualizado_por_nome: 'Admin Exemplo', atualizado_em: '2026-11-04T13:05:00.000Z' },
  { chave: 'modulo:relatorios', visivel: false, perfis: ['estagiario', 'consultor'], atualizado_por_nome: 'Admin Exemplo', atualizado_em: '2026-11-04T13:06:00.000Z' },
];
const SEM_VIDEOS = [...LINHAS_FICTICIAS, { chave: 'tipo:video', visivel: false, perfis: ['estagiario', 'consultor'], atualizado_por_nome: 'Admin Exemplo', atualizado_em: '2026-11-04T13:07:00.000Z' }];
const TUDO_OCULTO = mesclarComPadrao([]).filter((i) => i.chave.startsWith('modulo:')).map((i) => ({ ...i, visivel: false }));

const erroCliente = (r) => ({ erro: { status: r.status, mensagem: r.corpo.erro } });
const detalhe = (base, args) => { const r = montarDetalhe(base, args); return r.status === 200 ? r.corpo : erroCliente(r); };

export function montarExemplos() {
  const base = montarBase({ harness: harnessFicticio(), guia: guiaFicticio(), versao: VERSAO_FICTICIA, mapa: MAPA_FICTICIO });
  const ex = {};
  const resumo = (papel, itens) => montarResumo(base, { papel, itens });

  // Página Inicial / cards de módulo (§1 resumo)
  ex['resumo-admin'] = resumo('admin', LINHAS_FICTICIAS);
  ex['resumo-consultor'] = resumo('consultor', LINHAS_FICTICIAS);
  ex['resumo-estagiario'] = resumo('estagiario', LINHAS_FICTICIAS);
  ex['resumo-estagiario-sem-videos'] = resumo('estagiario', SEM_VIDEOS);
  ex['resumo-vazio'] = resumo('estagiario', TUDO_OCULTO);

  // Guia Inicial e Guia do Consultor (§1 detalhe)
  ex['modulo-vendas-inicial-estagiario'] = detalhe(base, { modulo: 'vendas', jornada: 'inicial', papel: 'estagiario', itens: LINHAS_FICTICIAS });
  ex['modulo-vendas-inicial-estagiario-sem-videos'] = detalhe(base, { modulo: 'vendas', jornada: 'inicial', papel: 'estagiario', itens: SEM_VIDEOS });
  ex['modulo-vendas-consultor-consultor'] = detalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'consultor', itens: LINHAS_FICTICIAS });
  ex['modulo-vendas-consultor-admin'] = detalhe(base, { modulo: 'vendas', jornada: 'consultor', papel: 'admin', itens: LINHAS_FICTICIAS });
  ex['modulo-estoque-consultor-consultor'] = detalhe(base, { modulo: 'estoque', jornada: 'consultor', papel: 'consultor', itens: LINHAS_FICTICIAS });
  ex['modulo-relatorios-inicial-admin'] = detalhe(base, { modulo: 'relatorios', jornada: 'inicial', papel: 'admin', itens: LINHAS_FICTICIAS });

  // Erros (forma devolvida por window.Plataforma)
  ex['erro-403-modulo-oculto'] = detalhe(base, { modulo: 'estoque', jornada: 'inicial', papel: 'estagiario', itens: LINHAS_FICTICIAS });
  ex['erro-404-modulo-inexistente'] = detalhe(base, { modulo: 'modulo-que-nao-existe', jornada: 'inicial', papel: 'consultor', itens: LINHAS_FICTICIAS });
  ex['erro-400-jornada-invalida'] = detalhe(base, { modulo: 'vendas', jornada: 'avancada', papel: 'consultor', itens: LINHAS_FICTICIAS });
  ex['erro-0-sem-conexao'] = { erro: { status: 0, mensagem: 'Sem conexão com o servidor. Tente de novo.' } };

  // Visibilidade (§2)
  ex['visibilidade-estagiario'] = { itens: mapaEfetivo(LINHAS_FICTICIAS, 'estagiario') };
  ex['visibilidade-consultor'] = { itens: mapaEfetivo(LINHAS_FICTICIAS, 'consultor') };
  ex['visibilidade-admin'] = { itens: mapaEfetivo(LINHAS_FICTICIAS, 'admin') };
  ex['visibilidade-todos-admin'] = listaAdmin(LINHAS_FICTICIAS);
  const put = validarAtualizacao({ chave: 'area:apostila', visivel: true, perfis: ['consultor'] });
  ex['visibilidade-put-200'] = itemAdmin({ ...put.item, atualizado_por_nome: 'Admin Exemplo', atualizado_em: '2026-11-04T13:10:00.000Z' });
  ex['visibilidade-put-400'] = { erro: { status: 400, mensagem: validarAtualizacao({ chave: 'area:inexistente', visivel: true, perfis: [] }).erro } };
  ex['visibilidade-put-403'] = { erro: { status: 403, mensagem: 'Apenas administradores podem alterar a visibilidade.' } };

  // Roteador de hash (§3)
  const { Plataforma } = carregarPlataforma();
  ex.rotas = ['', '#inicio', '#inicial', '#inicial/vendas', '#consultor', '#consultor/estoque', '#consultor/fundamentos', '#pacotes', '#checklist', '#videos', '#apostila', '#admin', '#acervo', '#qualquer-outra-coisa', '#inicial/<script>']
    .map((hash) => ({ hash, rota: { ...Plataforma.lerRota(hash) } }));
  return ex;
}

const LEIA_ME = `# Exemplos — FE-20261104-01 (DADOS FICTÍCIOS)

Todos os textos, nomes ("Admin Exemplo", "Cliente Exemplo Ltda") e regras são **fictícios**, marcados "(fictício)".
Formato: contrato-componentes.md v1. Gerado por \`node scripts/gerar-exemplos-conteudo.mjs\` (mesmo montador da base real).
Cada arquivo é exatamente o que \`window.Plataforma\` resolve (sucesso = corpo da API; erro = \`{ erro: { status, mensagem } }\`).
A API devolve erro como \`{ "erro": "mensagem" }\` com o status HTTP; o cliente converte.

Cenário de visibilidade (linhas fictícias do admin): \`modulo:estoque\` só para consultor; \`modulo:relatorios\` oculto para todos;
\`area:apostila\` oculta (valor inicial do doc 04). Em "sem-videos", \`tipo:video\` também oculto.

| Arquivo | Chamada | Perfil | O que mostra |
|---|---|---|---|
| resumo-admin.json | GET /api/conteudo | admin | tudo; relatorios com \`oculto: true\` |
| resumo-consultor.json | GET /api/conteudo | consultor | sem relatorios |
| resumo-estagiario.json | GET /api/conteudo | estagiário | sem estoque e relatorios |
| resumo-estagiario-sem-videos.json | GET /api/conteudo | estagiário | materiais de vídeo removidos |
| resumo-vazio.json | GET /api/conteudo | estagiário | todos os módulos ocultos → \`modulos: []\` |
| modulo-vendas-inicial-estagiario.json | GET /api/conteudo?modulo=vendas&jornada=inicial | estagiário | Guia Inicial, 8 seções |
| modulo-vendas-inicial-estagiario-sem-videos.json | idem | estagiário | seção "video" vira em-preparacao |
| modulo-vendas-consultor-consultor.json | ...&jornada=consultor | consultor | Guia do Consultor, 10 seções, sem o link da apostila |
| modulo-vendas-consultor-admin.json | ...&jornada=consultor | admin | inclui link da apostila (\`visibilidade: "area:apostila"\`) |
| modulo-estoque-consultor-consultor.json | ...modulo=estoque&jornada=consultor | consultor | módulo parcial (vídeo em preparação) |
| modulo-relatorios-inicial-admin.json | ...modulo=relatorios&jornada=inicial | admin | módulo sem conteúdo: tudo em-preparacao, \`oculto: true\` |
| erro-403-modulo-oculto.json | ...modulo=estoque | estagiário | 403 |
| erro-404-modulo-inexistente.json | ...modulo=modulo-que-nao-existe | — | 404 |
| erro-400-jornada-invalida.json | ...jornada=avancada | — | 400 |
| erro-0-sem-conexao.json | qualquer | — | falha de rede (status 0) |
| visibilidade-{estagiario,consultor,admin}.json | GET /api/visibilidade | cada perfil | mapa efetivo \`{ itens }\` |
| visibilidade-todos-admin.json | GET /api/visibilidade?todos=1 | admin | lista do painel (chaves nunca alteradas têm autor/data null) |
| visibilidade-put-200.json | PUT /api/visibilidade {chave:"area:apostila", visivel:true, perfis:["consultor"]} | admin | item salvo |
| visibilidade-put-400.json | PUT com chave inválida | admin | 400 |
| visibilidade-put-403.json | PUT | consultor/estagiário | 403 |
| rotas.json | location.hash → Plataforma.rota | — | roteador de hash |

Blocos das seções (\`secoes[].blocos[].tipo\`): texto, lista, passos, video, link, tela, fluxo, etapa, regra,
checklist-aprendizado, progresso, fontes. Todo bloco tem \`fontes\`. Bloco ligado a material tem \`material\` (id).
`;

async function main() {
  const { values } = parseArgs({ options: { saida: { type: 'string' } } });
  const saida = path.resolve(values.saida || path.join(RAIZ, 'exemplos'));
  await mkdir(saida, { recursive: true });
  const ex = montarExemplos();
  for (const [nome, corpo] of Object.entries(ex)) await writeFile(path.join(saida, `${nome}.json`), `${JSON.stringify(corpo, null, 2)}\n`);
  await writeFile(path.join(saida, 'LEIA-ME.md'), LEIA_ME);
  console.log(`✔ ${Object.keys(ex).length} exemplos + LEIA-ME.md em ${saida}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => { console.error(err); process.exit(1); });
}
