/* Valida a estrutura de mídia bruta (midia/brutos/) contra lib/conteudo/base/indice.json.
   Uso: node scripts/verificar-midia-brutos.mjs [raiz]
   Exit 1 só se houver erros (pendências não falham). */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EXT_MIDIA = /\.(mp4|png|jpe?g)$/i;
const NOME_ROTEIRO = 'roteiro-telas.md';
const NOME_MANIFESTO = 'manifesto.md';
/** `<id>_bruto_vNN.mp4` — id em minúsculas/hífen, versão com pelo menos 2 dígitos. */
export const NOME_MP4 = /^[a-z0-9_-]+_bruto_v\d{2,}\.mp4$/i;

/** Citação resolve para dentro da pasta do módulo? (bloqueia ../ e absoluto). */
export function citacaoDentroDoModulo(pastaModulo, citado) {
  if (citado == null) return false;
  const raw = String(citado).trim();
  if (!raw || path.isAbsolute(raw) || /^[a-zA-Z]:[\\/]/.test(raw)) return false;
  // barra inicial estilo Unix também é absoluta em relação à pasta
  if (raw.startsWith('/') || raw.startsWith('\\')) return false;
  const alvo = path.resolve(pastaModulo, raw);
  const raiz = path.resolve(pastaModulo);
  return alvo === raiz || alvo.startsWith(raiz + path.sep);
}

/** Converte "0", "44", "211,7", "1:30", "01:02:03", "~55" em segundos (number) ou null. */
export function parseTempo(raw) {
  if (raw == null) return null;
  let s = String(raw).trim();
  if (!s) return null;
  s = s.replace(/^~+/, '').trim();
  if (!s) return null;
  // hh:mm:ss ou mm:ss
  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(s)) {
    const partes = s.split(':').map(Number);
    if (partes.some((n) => Number.isNaN(n))) return null;
    if (partes.length === 3) return partes[0] * 3600 + partes[1] * 60 + partes[2];
    return partes[0] * 60 + partes[1];
  }
  // segundos com vírgula ou ponto decimal
  const num = Number(s.replace(',', '.'));
  return Number.isFinite(num) ? num : null;
}

/** Quebra "0–44", "31-37", "211,7–216,7", "~45–50", "1:00–1:30" em {inicio, fim}. */
export function parseIntervalo(celula) {
  if (celula == null) return null;
  let s = String(celula).trim();
  if (!s || s === '—' || s === '-') return null;
  // remove anotação "(s)" residual
  s = s.replace(/\(s\)\s*$/i, '').trim();
  // separadores: en-dash, em-dash, hyphen
  const m = s.match(/^(.+?)\s*[–—−-]\s*(.+)$/);
  if (m) {
    return { inicioRaw: m[1].trim(), fimRaw: m[2].trim(), inicio: parseTempo(m[1]), fim: parseTempo(m[2]) };
  }
  // tempo único (sem intervalo) — sem início/fim para comparar
  const t = parseTempo(s);
  if (t == null) return { inicioRaw: s, fimRaw: null, inicio: null, fim: null, unico: true, invalido: true };
  return { inicioRaw: s, fimRaw: null, inicio: t, fim: null, unico: true };
}

function normalizaCabecalho(h) {
  return String(h || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** Detecta índices das colunas início/fim (separadas ou combinadas "Início–fim"). */
export function mapearColunasTempo(headers) {
  const norms = headers.map(normalizaCabecalho);
  let inicio = -1;
  let fim = -1;
  let combinada = -1;
  for (let i = 0; i < norms.length; i++) {
    const h = norms[i];
    if (/(inicio|início)/.test(h) && /(fim)/.test(h)) combinada = i;
    else if (/^(inicio|início)\b/.test(h) || h === 'inicio' || h === 'início') inicio = i;
    else if (/^fim\b/.test(h) || h === 'fim') fim = i;
  }
  // "Início–fim (s)" sem acento já normalizado
  if (combinada < 0) {
    for (let i = 0; i < norms.length; i++) {
      if (norms[i].includes('inicio') && norms[i].includes('fim')) combinada = i;
    }
  }
  return { inicio, fim, combinada };
}

function parseLinhaTabela(linha) {
  // | a | b | c |  → células
  const t = linha.trim();
  if (!t.startsWith('|')) return null;
  const partes = t.split('|').slice(1, -1).map((c) => c.trim());
  return partes.length ? partes : null;
}

function ehSeparador(celulas) {
  return celulas.every((c) => /^:?-{3,}:?$/.test(c.replace(/\s/g, '')));
}

/** Extrai intervalos de tempo de um markdown de roteiro (tabelas). */
export function extrairTemposDoRoteiro(md) {
  const linhas = String(md).split(/\r?\n/);
  const tempos = [];
  let cols = null;
  let novaSecao = false;
  for (const linha of linhas) {
    const celulas = parseLinhaTabela(linha);
    if (!celulas) {
      cols = null;
      continue;
    }
    if (ehSeparador(celulas)) continue;
    if (!cols) {
      const mapa = mapearColunasTempo(celulas);
      if (mapa.combinada >= 0 || (mapa.inicio >= 0 && mapa.fim >= 0)) {
        cols = mapa;
        novaSecao = true; // cada tabela (ex.: Vídeo 1, Vídeo 2) reinicia a contagem
        continue;
      }
      cols = null;
      continue;
    }
    let intervalo = null;
    if (cols.combinada >= 0) {
      intervalo = parseIntervalo(celulas[cols.combinada] ?? '');
    } else {
      const iRaw = celulas[cols.inicio] ?? '';
      const fRaw = celulas[cols.fim] ?? '';
      intervalo = {
        inicioRaw: iRaw,
        fimRaw: fRaw,
        inicio: parseTempo(iRaw),
        fim: parseTempo(fRaw),
      };
    }
    if (!intervalo) continue;
    tempos.push({ ...intervalo, linha: linha.trim(), reinicia: novaSecao });
    novaSecao = false;
  }
  return tempos;
}

/** Nomes .mp4/.png/.jpg em backticks ou links relativos markdown. */
export function extrairArquivosCitados(md) {
  const achados = new Set();
  const texto = String(md);
  for (const m of texto.matchAll(/`([^`\n]+)`/g)) {
    const nome = m[1].trim();
    if (EXT_MIDIA.test(nome) && !/[\\/]/.test(nome.replace(/^\.\//, ''))) {
      // aceita só o basename (ou caminho relativo simples dentro da pasta)
      achados.add(nome.replace(/^\.\//, ''));
    } else if (EXT_MIDIA.test(nome)) {
      achados.add(nome.replace(/^\.\//, ''));
    }
  }
  for (const m of texto.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const alvo = m[1].trim().replace(/^\.\//, '');
    if (EXT_MIDIA.test(alvo) && !alvo.startsWith('http://') && !alvo.startsWith('https://') && !alvo.startsWith('/')) {
      achados.add(alvo);
    }
  }
  // células de tabela que são só um nome de arquivo de mídia
  for (const linha of texto.split(/\r?\n/)) {
    const celulas = parseLinhaTabela(linha);
    if (!celulas || ehSeparador(celulas)) continue;
    for (const c of celulas) {
      const nome = c.replace(/^\*\*?|\*\*?$/g, '').trim();
      if (EXT_MIDIA.test(nome) && !/\s/.test(nome) && !nome.startsWith('http')) {
        achados.add(nome.replace(/^\.\//, ''));
      }
    }
  }
  return [...achados];
}

function lerIdsIndice(raiz) {
  const indicePath = path.join(raiz, 'lib/conteudo/base/indice.json');
  if (!existsSync(indicePath)) {
    throw new Error(`índice não encontrado: ${indicePath}`);
  }
  const indice = JSON.parse(readFileSync(indicePath, 'utf8'));
  const ids = (indice.modulos || []).map((m) => m.id);
  if (!ids.length) throw new Error('indice.json sem módulos');
  return ids;
}

function listarEntradas(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true });
}

/**
 * @param {string} raiz — raiz do repo Guia-Do-Consultor
 * @returns {{ erros: string[], pendencias: string[], ok: boolean, modulos: object }}
 */
export function verificarMidiaBrutos(raiz) {
  const erros = [];
  const pendencias = [];
  const ids = lerIdsIndice(raiz);
  const idsSet = new Set(ids);
  const brutos = path.join(raiz, 'midia', 'brutos');
  const detalhe = {};

  if (!existsSync(brutos)) {
    for (const id of ids) {
      pendencias.push(`módulo \`${id}\`: pasta midia/brutos/${id}/ ainda não existe`);
      detalhe[id] = { status: 'pendencia', motivo: 'pasta ausente' };
    }
    return { erros, pendencias, ok: true, modulos: detalhe };
  }

  const entradas = listarEntradas(brutos);
  for (const ent of entradas) {
    if (ent.name === 'README.md' || ent.name.startsWith('.')) continue;
    const full = path.join(brutos, ent.name);
    if (ent.isFile()) {
      // arquivo solto (ex.: ROTEIRO.md na raiz de brutos) — erro
      erros.push(`midia/brutos/${ent.name}: arquivo não permitido na raiz de brutos (só README.md e pastas <id>/)`);
      continue;
    }
    if (!ent.isDirectory()) continue;
    if (!idsSet.has(ent.name)) {
      erros.push(`midia/brutos/${ent.name}/: nome não é id de módulo do índice (ids válidos vêm de lib/conteudo/base/indice.json, sem número)`);
    }
  }

  for (const id of ids) {
    const pasta = path.join(brutos, id);
    if (!existsSync(pasta) || !statSync(pasta).isDirectory()) {
      pendencias.push(`módulo \`${id}\`: pasta midia/brutos/${id}/ ainda não existe`);
      detalhe[id] = { status: 'pendencia', motivo: 'pasta ausente' };
      continue;
    }

    const filhos = listarEntradas(pasta);
    const nomes = new Set(filhos.map((f) => f.name));
    const mp4s = filhos.filter((f) => f.isFile() && /\.mp4$/i.test(f.name)).map((f) => f.name);
    const temRoteiro = nomes.has(NOME_ROTEIRO);
    const temManifesto = nomes.has(NOME_MANIFESTO);
    const printsDir = path.join(pasta, 'prints');
    const temPrints = existsSync(printsDir) && statSync(printsDir).isDirectory();
    const pngs = temPrints
      ? readdirSync(printsDir).filter((n) => /\.(png|jpe?g)$/i.test(n))
      : [];

    const faltando = [];
    if (!temRoteiro) faltando.push(NOME_ROTEIRO);
    if (!temManifesto) faltando.push(NOME_MANIFESTO);
    if (!temPrints) faltando.push('prints/');
    else if (!pngs.length) faltando.push('prints/*.png (pasta vazia)');

    // v3.4: pasta sem .mp4 = pendência (gravação ainda não chegou), não erro
    if (!mp4s.length) {
      pendencias.push(`módulo \`${id}\`: pasta midia/brutos/${id}/ sem .mp4`);
    } else {
      for (const m of mp4s) {
        // Padrão *_bruto_vNN.mp4 (charset seguro); o id do módulo deve aparecer no nome
        // (aceita crm_bruto_v01.mp4 e gi-crm_c03-c07_bruto_v01.mp4 do estúdio).
        const okNome = NOME_MP4.test(m) && m.toLowerCase().includes(id.toLowerCase());
        if (!okNome) {
          erros.push(`midia/brutos/${id}/${m}: nome fora do padrão \`*_bruto_vNN.mp4\` com o id do módulo (ex.: ${id}_bruto_v01.mp4)`);
        }
      }
    }

    if (faltando.length) {
      erros.push(`midia/brutos/${id}/: incompleta — falta ${faltando.join(', ')}`);
      detalhe[id] = { status: 'erro', faltando };
      // ainda valida o que existir
    }

    // nomes errados de roteiro/manifesto (ex.: ROTEIRO.md) quando o canônico falta
    for (const f of filhos) {
      if (!f.isFile()) continue;
      const n = f.name;
      if (/^roteiro/i.test(n) && n !== NOME_ROTEIRO) {
        erros.push(`midia/brutos/${id}/${n}: use o nome canônico \`${NOME_ROTEIRO}\``);
      }
      if (/^manifesto/i.test(n) && n !== NOME_MANIFESTO && !/\.(mp4|png|jpe?g)$/i.test(n)) {
        erros.push(`midia/brutos/${id}/${n}: use o nome canônico \`${NOME_MANIFESTO}\``);
      }
    }

    const citados = new Set();
    const docs = [];
    if (temRoteiro) docs.push({ nome: NOME_ROTEIRO, texto: readFileSync(path.join(pasta, NOME_ROTEIRO), 'utf8') });
    if (temManifesto) docs.push({ nome: NOME_MANIFESTO, texto: readFileSync(path.join(pasta, NOME_MANIFESTO), 'utf8') });

    for (const doc of docs) {
      for (const arq of extrairArquivosCitados(doc.texto)) {
        citados.add(arq);
        if (!citacaoDentroDoModulo(pasta, arq)) {
          erros.push(`midia/brutos/${id}/: \`${doc.nome}\` cita \`${arq}\` fora da pasta do módulo (../ ou absoluto bloqueados)`);
          continue;
        }
        const alvo = path.join(pasta, arq);
        // também aceita em prints/ se o cite for só o basename e estiver em prints/
        const emPrints = path.join(printsDir, path.basename(arq));
        const existe =
          existsSync(alvo) ||
          (temPrints && !arq.includes('/') && existsSync(emPrints)) ||
          (temPrints && arq.startsWith('prints/') && existsSync(path.join(pasta, arq)));
        if (!existe) {
          // se citou basename de png e está em prints/
          const soNome = path.basename(arq);
          const fallbackPrint = temPrints && EXT_MIDIA.test(soNome) && existsSync(path.join(printsDir, soNome));
          if (!fallbackPrint) {
            erros.push(`midia/brutos/${id}/: \`${doc.nome}\` cita \`${arq}\` que não existe na pasta do módulo`);
          }
        }
      }
    }

    if (temRoteiro) {
      const md = docs.find((d) => d.nome === NOME_ROTEIRO).texto;
      const tempos = extrairTemposDoRoteiro(md);
      let ultimoInicio = null;
      for (const t of tempos) {
        if (t.reinicia) ultimoInicio = null; // nova tabela / novo vídeo bruto
        if (t.unico) {
          // tempo pontual (~55): só exige parseável; não compara início<fim
          if (t.invalido || t.inicio == null) {
            erros.push(`midia/brutos/${id}/roteiro-telas.md: tempo inválido "${t.inicioRaw}"`);
          } else if (ultimoInicio != null && t.inicio + 1e-9 < ultimoInicio) {
            erros.push(`midia/brutos/${id}/roteiro-telas.md: tempos não crescentes (${t.inicioRaw} depois de ${ultimoInicio}s)`);
          }
          if (t.inicio != null) ultimoInicio = t.inicio;
          continue;
        }
        if (t.inicio == null || t.fim == null) {
          erros.push(`midia/brutos/${id}/roteiro-telas.md: tempo inválido "${t.inicioRaw}–${t.fimRaw}"`);
          continue;
        }
        if (!(t.inicio < t.fim)) {
          erros.push(`midia/brutos/${id}/roteiro-telas.md: início deve ser < fim ("${t.inicioRaw}–${t.fimRaw}")`);
        }
        if (ultimoInicio != null && t.inicio + 1e-9 < ultimoInicio) {
          erros.push(`midia/brutos/${id}/roteiro-telas.md: tempos não crescentes (início ${t.inicioRaw} depois de ${ultimoInicio}s)`);
        }
        ultimoInicio = t.inicio;
      }
      detalhe[id] = {
        ...(detalhe[id] || {}),
        status: detalhe[id]?.status === 'erro' ? 'erro' : 'ok',
        mp4s: mp4s.length,
        prints: pngs.length,
        trechos: tempos.length,
        citados: [...citados],
      };
    } else if (!detalhe[id]) {
      detalhe[id] = { status: faltando.length ? 'erro' : 'ok' };
    }
  }

  return { erros, pendencias, ok: erros.length === 0, modulos: detalhe };
}

function relatorioPt(r) {
  const linhas = [];
  linhas.push(`Verificação midia/brutos/: ${r.ok ? 'OK' : 'COM ERROS'}`);
  linhas.push(`  erros: ${r.erros.length} · pendências: ${r.pendencias.length}`);
  if (r.erros.length) {
    linhas.push('Erros:');
    for (const e of r.erros) linhas.push(`  - ${e}`);
  }
  if (r.pendencias.length) {
    linhas.push('Pendências (não falham):');
    for (const p of r.pendencias) linhas.push(`  - ${p}`);
  }
  return linhas.join('\n');
}

const esteArquivo = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === esteArquivo) {
  const raiz = path.resolve(process.argv[2] || path.join(path.dirname(esteArquivo), '..'));
  try {
    const r = verificarMidiaBrutos(raiz);
    console.log(relatorioPt(r));
    process.exit(r.ok ? 0 : 1);
  } catch (err) {
    console.error(`Falha ao verificar mídia bruta: ${err.message}`);
    process.exit(2);
  }
}
