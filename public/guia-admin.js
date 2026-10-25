/* Faktory Flow — aba "Painel" (somente administradores): progresso dos checklists de todos os usuários e os
   problemas que cada um registrou, com indicadores, gráficos, mapa de calor e exportação (Excel, PDF e o relatório
   de problemas com imagens). Dados: /api/checklists-admin (exige o perfil Administrador) e /checklists/manifest.json.
   A aba nasce escondida em guia-abas.js; este arquivo mostra quando a sessão confirma o perfil. */
(() => {
  const painel = document.getElementById('painel-admin');
  if (!painel || !window.ffSessao) return;

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const svg = (d, cls = '') => `<svg ${cls ? `class="${cls}" ` : ''}viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">${d}</svg>`;
  const ICONE = {
    atualizar: '<path d="M21 12a9 9 0 1 1-2.64-6.36L21 8"/><path d="M21 3v5h-5"/>',
    planilha: '<path d="M4 3h12l4 4v14H4z"/><path d="M16 3v5h5M8 12h8M8 16h8M12 9v10"/>',
    pdf: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    imagem: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    busca: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    seta: '<polyline points="6 9 12 15 18 9"/>',
  };
  // Cores dos gráficos (validadas com o validate_palette do skill de dataviz: azul e lima passam em todas as checagens)
  const COR = { concluido: '#1D6FB0', andamento: '#8F9A0E' };
  // Escala do mapa de calor: um tom só, do claro ao escuro, com o número escrito em cada célula
  const ESCALA = [
    { ate: 24, fundo: '#E3EEF8', tinta: '#13293D' },
    { ate: 49, fundo: '#B8D3EC', tinta: '#13293D' },
    { ate: 74, fundo: '#7FAFDA', tinta: '#13293D' },
    { ate: 99, fundo: '#3F86C4', tinta: '#FFFFFF' },
    { ate: 100, fundo: '#154F80', tinta: '#FFFFFF' },
  ];
  const corDe = (pct) => ESCALA.find((e) => pct <= e.ate) || ESCALA[ESCALA.length - 1];

  const DIA = 86400000;
  const fmtData = (d) => (d ? new Date(d).toLocaleDateString('pt-BR') : '—');
  const fmtDataHora = (d) => (d ? new Date(d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '—');
  const pct = (v) => `${Math.round(v)}%`;
  const plural = (n, um, varios) => `${n.toLocaleString('pt-BR')} ${n === 1 ? um : varios}`;
  const relativo = (d) => {
    if (!d) return 'nunca';
    const dias = Math.floor((Date.now() - new Date(d).getTime()) / DIA);
    if (dias <= 0) return 'hoje';
    if (dias === 1) return 'ontem';
    if (dias < 30) return `há ${dias} dias`;
    return fmtData(d);
  };

  const estado = {
    dados: null, manifest: null, carregando: false, erro: '',
    filtros: { busca: '', papel: '', grupo: '', periodo: '0' },
    ordem: { col: 'media', dir: -1 },
    aberto: null,
    prob: { busca: '', chave: '', usuario: '', limite: 24 },
    etapas: {}, // chave -> estrutura do checklist (seções e textos das etapas), carregada quando preciso
  };

  /* ---------- Mostrar a aba só para administradores ---------- */
  window.ffSessao.then((usuario) => {
    const admin = Boolean(usuario?.permissoes?.includes('gerenciar_usuarios'));
    if (!admin) {
      painel.remove();
      if (location.hash === '#admin') window.ffIrParaAba?.('guia');
      return;
    }
    document.querySelectorAll('[data-so-admin]').forEach((el) => { el.hidden = false; });
    painel.innerHTML = `<div class="ad"><p class="pnl-carregando">Carregando o painel…</p></div>`;
    if (location.hash === '#admin') carregar();
    document.addEventListener('ff:aba', (e) => { if (e.detail?.aba === 'admin' && !estado.dados && !estado.carregando) carregar(); });
  });

  async function carregar() {
    estado.carregando = true;
    estado.erro = '';
    render();
    try {
      const [r, m] = await Promise.all([
        fetch('/api/checklists-admin', { credentials: 'same-origin', cache: 'no-store' }),
        fetch('/checklists/manifest.json', { cache: 'no-cache' }),
      ]);
      if (r.status === 401) return window.ffIrParaLogin?.();
      if (r.status === 403) throw new Error('Seu perfil não tem acesso a este painel.');
      if (!r.ok) throw new Error('Não foi possível carregar os dados do painel. Tente de novo.');
      estado.dados = await r.json();
      estado.manifest = m.ok ? await m.json() : { grupos: [], itens: [] };
    } catch (erro) {
      estado.erro = erro.message || 'Não foi possível carregar o painel.';
    } finally {
      estado.carregando = false;
      render();
    }
  }

  /* ---------- Cálculos (sempre a partir dos filtros) ---------- */
  function calcular() {
    const { dados, manifest, filtros } = estado;
    // só os checklists que gravam progresso (os de validação QA são páginas estáticas, sem chave)
    const itens = manifest.itens.filter((i) => i.chave && (!filtros.grupo || i.grupo === filtros.grupo));
    const porChave = new Map(itens.map((i) => [i.chave, i]));
    const termo = filtros.busca.trim().toLowerCase();
    const usuarios = dados.usuarios.filter((u) => (!filtros.papel || u.papel === filtros.papel)
      && (!termo || `${u.nome} ${u.login}`.toLowerCase().includes(termo)));
    const idsUsuarios = new Set(usuarios.map((u) => u.id));
    const desde = Number(filtros.periodo) ? Date.now() - Number(filtros.periodo) * DIA : 0;
    const progresso = dados.progresso.filter((p) => idsUsuarios.has(p.usuario) && porChave.has(p.chave)
      && new Date(p.atualizadoEm).getTime() >= desde);
    const iniciado = (p) => p.pct > 0 || p.marcados > 0;
    const problemas = dados.problemas.filter((p) => idsUsuarios.has(p.usuario) && porChave.has(p.chave)
      && new Date(p.atualizadoEm).getTime() >= desde);

    const porUsuario = new Map(usuarios.map((u) => [u.id, { u, linhas: [], problemas: 0, imagens: 0, ultima: null }]));
    for (const p of progresso) {
      const reg = porUsuario.get(p.usuario);
      reg.linhas.push(p);
      reg.imagens += p.anexos;
      if (!reg.ultima || p.atualizadoEm > reg.ultima) reg.ultima = p.atualizadoEm;
    }
    for (const p of problemas) porUsuario.get(p.usuario).problemas += 1;
    const linhasUsuarios = [...porUsuario.values()].map((r) => {
      const ini = r.linhas.filter(iniciado);
      return {
        ...r,
        iniciados: ini.length,
        concluidos: ini.filter((p) => p.pct >= 100).length,
        media: ini.length ? ini.reduce((s, p) => s + p.pct, 0) / ini.length : 0,
      };
    });

    const porChecklist = itens.map((m) => {
      const linhas = progresso.filter((p) => p.chave === m.chave && iniciado(p));
      return {
        m,
        iniciados: linhas.length,
        concluidos: linhas.filter((p) => p.pct >= 100).length,
        media: linhas.length ? linhas.reduce((s, p) => s + p.pct, 0) / linhas.length : 0,
        problemas: problemas.filter((p) => p.chave === m.chave).length,
      };
    });

    const iniciados = progresso.filter(iniciado);
    const ativos = usuarios.filter((u) => u.ativo);
    const comInicio = linhasUsuarios.filter((r) => r.iniciados > 0);
    const atividade = Array.from({ length: 30 }, (_, k) => {
      const dia = new Date(); dia.setHours(0, 0, 0, 0); dia.setDate(dia.getDate() - (29 - k));
      const fim = dia.getTime() + DIA;
      return { dia, n: progresso.filter((p) => { const t = new Date(p.atualizadoEm).getTime(); return t >= dia.getTime() && t < fim; }).length };
    });
    return {
      itens, porChave, usuarios, progresso, problemas, linhasUsuarios, porChecklist, atividade,
      kpi: {
        ativos: ativos.length,
        usuarios: usuarios.length,
        comInicio: comInicio.length,
        media: iniciados.length ? iniciados.reduce((s, p) => s + p.pct, 0) / iniciados.length : 0,
        concluidos: iniciados.filter((p) => p.pct >= 100).length,
        andamento: iniciados.filter((p) => p.pct < 100).length,
        problemas: problemas.length,
        checklistsComProblema: new Set(problemas.map((p) => `${p.usuario}|${p.chave}`)).size,
        imagens: progresso.reduce((s, p) => s + p.anexos, 0),
      },
    };
  }

  /* ---------- Desenho ---------- */
  function render() {
    if (estado.carregando && !estado.dados) { painel.innerHTML = '<div class="ad"><p class="pnl-carregando">Carregando o painel…</p></div>'; return; }
    if (estado.erro && !estado.dados) {
      painel.innerHTML = `<div class="ad"><div class="pnl-vazio"><strong>${esc(estado.erro)}</strong><button type="button" class="pnl-btn" data-acao="atualizar">${svg(ICONE.atualizar)}Tentar de novo</button></div></div>`;
      return;
    }
    if (!estado.dados) return;
    const c = calcular();
    const { grupos } = estado.manifest;
    const f = estado.filtros;
    const rolagem = scrollY;
    painel.innerHTML = `
      <div class="ad">
        <header class="pnl-cabeca">
          <div>
            <span class="pnl-eyebrow">Somente administradores</span>
            <h1>Painel dos checklists</h1>
            <p>Progresso de todos os usuários e os problemas registrados nos checklists. Dados de ${esc(fmtDataHora(estado.dados.geradoEm))}.</p>
          </div>
          <div class="pnl-cabeca-acoes">
            <button type="button" class="pnl-btn pnl-btn--sec" data-acao="atualizar" ${estado.carregando ? 'disabled' : ''}>${svg(ICONE.atualizar)}${estado.carregando ? 'Atualizando…' : 'Atualizar'}</button>
            <div class="pnl-exportar">
              <button type="button" class="pnl-btn" data-acao="menu-exportar" aria-haspopup="menu" aria-expanded="false">${svg(ICONE.planilha)}Exportar relatório${svg(ICONE.seta, 'pnl-seta')}</button>
              <div class="pnl-menu" role="menu" hidden>
                <button type="button" role="menuitem" data-exportar="progresso">${svg(ICONE.planilha)}<span>Progresso por usuário<small>Excel (CSV), um checklist por linha</small></span></button>
                <button type="button" role="menuitem" data-exportar="problemas">${svg(ICONE.planilha)}<span>Problemas registrados<small>Excel (CSV), com a etapa de cada um</small></span></button>
                <button type="button" role="menuitem" data-exportar="pdf">${svg(ICONE.pdf)}<span>Relatório do painel<small>PDF com indicadores, checklists, usuários e problemas</small></span></button>
                <button type="button" role="menuitem" data-exportar="html">${svg(ICONE.imagem)}<span>Problemas com imagens<small>HTML para o time de desenvolvimento</small></span></button>
              </div>
            </div>
          </div>
        </header>
        <p class="pnl-aviso" role="status" aria-live="polite"></p>

        <div class="pnl-filtros" role="search">
          <label class="pnl-campo pnl-campo--busca">${svg(ICONE.busca)}<input type="search" data-filtro="busca" value="${esc(f.busca)}" placeholder="Buscar usuário por nome ou login" aria-label="Buscar usuário"></label>
          <label class="pnl-campo"><span>Perfil</span><select data-filtro="papel">
            <option value="">Todos</option>
            ${[['admin', 'Administrador'], ['consultor', 'Consultor'], ['estagiario', 'Estagiário']].map(([v, t]) => `<option value="${v}" ${f.papel === v ? 'selected' : ''}>${t}</option>`).join('')}
          </select></label>
          <label class="pnl-campo"><span>Checklists</span><select data-filtro="grupo">
            <option value="">Todos os grupos</option>
            ${grupos.filter((g) => estado.manifest.itens.some((i) => i.grupo === g.id && i.chave)).map((g) => `<option value="${esc(g.id)}" ${f.grupo === g.id ? 'selected' : ''}>${esc(g.nome)}</option>`).join('')}
          </select></label>
          <label class="pnl-campo"><span>Atividade</span><select data-filtro="periodo">
            ${[['0', 'Todo o período'], ['7', 'Últimos 7 dias'], ['30', 'Últimos 30 dias'], ['90', 'Últimos 90 dias']].map(([v, t]) => `<option value="${v}" ${f.periodo === v ? 'selected' : ''}>${t}</option>`).join('')}
          </select></label>
        </div>

        ${kpis(c)}

        <div class="pnl-grade">
          <section class="pnl-cartao pnl-cartao--alto" aria-labelledby="pnl-t-checklists">
            <header class="pnl-cartao-cabeca"><h2 id="pnl-t-checklists">Progresso médio por checklist</h2><p>Entre quem começou cada checklist. Passe o mouse para ver os números.</p></header>
            ${graficoChecklists(c)}
          </section>
          <div class="pnl-coluna">
            <section class="pnl-cartao" aria-labelledby="pnl-t-situacao">
              <header class="pnl-cartao-cabeca"><h2 id="pnl-t-situacao">Situação dos checklists iniciados</h2></header>
              ${graficoSituacao(c)}
            </section>
            <section class="pnl-cartao" aria-labelledby="pnl-t-atividade">
              <header class="pnl-cartao-cabeca"><h2 id="pnl-t-atividade">Atividade nos últimos 30 dias</h2><p>Checklists gravados por dia (a última gravação de cada um).</p></header>
              ${graficoAtividade(c)}
            </section>
          </div>
        </div>

        <section class="pnl-cartao" aria-labelledby="pnl-t-usuarios">
          <header class="pnl-cartao-cabeca"><h2 id="pnl-t-usuarios">Usuários</h2><p>Clique numa pessoa para ver cada checklist dela.</p></header>
          ${tabelaUsuarios(c)}
        </section>

        <section class="pnl-cartao" aria-labelledby="pnl-t-mapa">
          <header class="pnl-cartao-cabeca"><h2 id="pnl-t-mapa">Mapa de progresso</h2><p>Cada célula é o progresso de uma pessoa num checklist. Passe o mouse para ver o nome do checklist.</p></header>
          ${mapa(c)}
        </section>

        <section class="pnl-cartao" aria-labelledby="pnl-t-problemas">
          <header class="pnl-cartao-cabeca"><h2 id="pnl-t-problemas">Problemas registrados</h2><p>O que cada pessoa marcou como problema nas etapas, com o registro e as imagens anexadas.</p></header>
          ${problemas(c)}
        </section>
        <div class="pnl-dica" role="tooltip" hidden></div>
      </div>`;
    scrollTo({ top: rolagem, behavior: 'instant' });
    preencherEtapas(c);
  }

  function kpis(c) {
    const k = c.kpi;
    const tile = (valor, rotulo, detalhe) => `<div class="pnl-kpi"><strong>${valor}</strong><span>${rotulo}</span>${detalhe ? `<small>${detalhe}</small>` : ''}</div>`;
    return `<div class="pnl-kpis">
      ${tile(k.ativos.toLocaleString('pt-BR'), 'Usuários ativos', `${plural(k.usuarios, 'usuário', 'usuários')} no filtro`)}
      ${tile(k.comInicio.toLocaleString('pt-BR'), 'Começaram checklists', k.usuarios ? `${pct((k.comInicio / k.usuarios) * 100)} dos usuários` : '')}
      ${tile(pct(k.media), 'Progresso médio', 'dos checklists iniciados')}
      ${tile(k.concluidos.toLocaleString('pt-BR'), 'Checklists concluídos', `${plural(k.andamento, 'em andamento', 'em andamento')}`)}
      ${tile(k.problemas.toLocaleString('pt-BR'), 'Problemas registrados', `em ${plural(k.checklistsComProblema, 'checklist', 'checklists')}`)}
      ${tile(k.imagens.toLocaleString('pt-BR'), 'Imagens anexadas', 'nas etapas dos checklists')}
    </div>`;
  }

  function graficoChecklists(c) {
    const linhas = c.porChecklist.filter((r) => r.iniciados > 0).sort((a, b) => b.media - a.media || b.iniciados - a.iniciados);
    const semInicio = c.porChecklist.length - linhas.length;
    if (!linhas.length) return '<p class="pnl-vazio-texto">Ninguém começou um checklist neste filtro.</p>';
    return `<ol class="pnl-barras">${linhas.map((r) => `
      <li data-dica="${esc(`<strong>${esc(r.m.titulo)}</strong><br>${plural(r.iniciados, 'pessoa começou', 'pessoas começaram')} · ${plural(r.concluidos, 'concluiu', 'concluíram')}<br>Progresso médio ${pct(r.media)} · ${plural(r.problemas, 'problema', 'problemas')}`)}">
        <span class="pnl-barras-rotulo"><span class="pnl-barras-area">${esc(r.m.area || '')}</span>${esc(r.m.titulo)}</span>
        <span class="pnl-barras-trilho"><span class="pnl-barras-barra" style="width:${Math.max(r.media, 1.5)}%"></span></span>
        <span class="pnl-barras-valor">${pct(r.media)}<small>${r.iniciados}</small></span>
      </li>`).join('')}</ol>
      <p class="pnl-nota">O número menor é quantas pessoas começaram.${semInicio ? ` ${plural(semInicio, 'checklist que ninguém começou fica', 'checklists que ninguém começou ficam')} fora da lista.` : ''}</p>`;
  }

  function graficoSituacao(c) {
    const { concluidos, andamento } = c.kpi;
    const total = concluidos + andamento;
    if (!total) return '<p class="pnl-vazio-texto">Nenhum checklist iniciado neste filtro.</p>';
    const seg = (n, cor, rotulo) => (n ? `<span class="pnl-pilha-seg" style="flex:${n};background:${cor}" data-dica="${esc(`<strong>${rotulo}</strong><br>${plural(n, 'checklist', 'checklists')} · ${pct((n / total) * 100)}`)}"></span>` : '');
    return `<div class="pnl-pilha" role="img" aria-label="${concluidos} concluídos e ${andamento} em andamento">
        ${seg(concluidos, COR.concluido, 'Concluídos')}${seg(andamento, COR.andamento, 'Em andamento')}
      </div>
      <ul class="pnl-legenda">
        <li><span class="pnl-chave" style="background:${COR.concluido}"></span>Concluídos <strong>${concluidos}</strong> <small>${pct((concluidos / total) * 100)}</small></li>
        <li><span class="pnl-chave" style="background:${COR.andamento}"></span>Em andamento <strong>${andamento}</strong> <small>${pct((andamento / total) * 100)}</small></li>
      </ul>`;
  }

  function graficoAtividade(c) {
    const max = Math.max(1, ...c.atividade.map((d) => d.n));
    const total = c.atividade.reduce((s, d) => s + d.n, 0);
    return `<div class="pnl-colunas" role="img" aria-label="${total} checklists gravados nos últimos 30 dias">
        ${c.atividade.map((d) => `<span class="pnl-colunas-dia" data-dica="${esc(`<strong>${d.dia.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}</strong><br>${plural(d.n, 'checklist gravado', 'checklists gravados')}`)}"><span class="pnl-colunas-barra${d.n ? '' : ' pnl-colunas-barra--zero'}" style="height:${d.n ? Math.max(6, (d.n / max) * 100) : 0}%"></span></span>`).join('')}
      </div>
      <div class="pnl-colunas-eixo"><span>${fmtData(c.atividade[0].dia)}</span><span>${fmtData(c.atividade[15].dia)}</span><span>hoje</span></div>
      <p class="pnl-nota">${plural(total, 'checklist gravado', 'checklists gravados')} no período · maior dia: ${max === 1 && !total ? 0 : max}</p>`;
  }

  function tabelaUsuarios(c) {
    if (!c.linhasUsuarios.length) return '<p class="pnl-vazio-texto">Nenhum usuário neste filtro.</p>';
    const { col, dir } = estado.ordem;
    const chave = {
      nome: (r) => r.u.nome.toLowerCase(), papel: (r) => r.u.papelNome, iniciados: (r) => r.iniciados, concluidos: (r) => r.concluidos,
      media: (r) => r.media, problemas: (r) => r.problemas, imagens: (r) => r.imagens, ultima: (r) => (r.ultima ? new Date(r.ultima).getTime() : 0),
    }[col];
    const linhas = [...c.linhasUsuarios].sort((a, b) => { const x = chave(a), y = chave(b); return (x > y ? 1 : x < y ? -1 : 0) * dir; });
    const th = (id, rotulo, num) => `<th scope="col" class="${num ? 'pnl-num' : ''}" aria-sort="${col === id ? (dir > 0 ? 'ascending' : 'descending') : 'none'}"><button type="button" data-ordem="${id}">${rotulo}${col === id ? (dir > 0 ? ' ↑' : ' ↓') : ''}</button></th>`;
    return `<div class="pnl-tabela-rolagem"><table class="pnl-tabela">
      <thead><tr>${th('nome', 'Pessoa')}${th('papel', 'Perfil')}${th('iniciados', 'Começou', 1)}${th('concluidos', 'Concluiu', 1)}${th('media', 'Progresso médio')}${th('problemas', 'Problemas', 1)}${th('imagens', 'Imagens', 1)}${th('ultima', 'Última atividade')}</tr></thead>
      <tbody>${linhas.map((r) => {
        const aberto = estado.aberto === r.u.id;
        return `<tr class="pnl-linha${aberto ? ' pnl-linha--aberta' : ''}${r.u.ativo ? '' : ' pnl-linha--inativa'}" data-usuario="${esc(r.u.id)}" tabindex="0" aria-expanded="${aberto}">
          <td><span class="pnl-pessoa"><span class="pnl-avatar" aria-hidden="true">${esc(iniciais(r.u.nome))}</span><span><strong>${esc(r.u.nome)}</strong><small>${esc(r.u.login)}${r.u.ativo ? '' : ' · inativo'}</small></span></span></td>
          <td><span class="pnl-papel pnl-papel--${esc(r.u.papel)}">${esc(r.u.papelNome)}</span></td>
          <td class="pnl-num">${r.iniciados}</td>
          <td class="pnl-num">${r.concluidos}</td>
          <td><span class="pnl-mini"><span class="pnl-mini-trilho"><span style="width:${r.media}%"></span></span><b>${r.iniciados ? pct(r.media) : '—'}</b></span></td>
          <td class="pnl-num">${r.problemas ? `<span class="pnl-selo">${r.problemas}</span>` : '0'}</td>
          <td class="pnl-num">${r.imagens}</td>
          <td title="${esc(fmtDataHora(r.ultima))}">${esc(relativo(r.ultima))}</td>
        </tr>${aberto ? `<tr class="pnl-detalhe"><td colspan="8">${detalheUsuario(r, c)}</td></tr>` : ''}`;
      }).join('')}</tbody></table></div>`;
  }

  const iniciais = (nome) => String(nome).split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';

  function detalheUsuario(r, c) {
    if (!r.linhas.length) return '<p class="pnl-vazio-texto">Esta pessoa ainda não gravou nenhum checklist neste filtro.</p>';
    const linhas = [...r.linhas].sort((a, b) => b.pct - a.pct);
    return `<ul class="pnl-detalhe-lista">${linhas.map((p) => {
      const m = c.porChave.get(p.chave);
      const probs = c.problemas.filter((x) => x.usuario === r.u.id && x.chave === p.chave).length;
      return `<li><span class="pnl-detalhe-titulo"><small>${esc(m.area || '')}</small>${esc(m.titulo)}</span>
        <span class="pnl-mini pnl-mini--largo"><span class="pnl-mini-trilho"><span style="width:${p.pct}%"></span></span><b>${pct(p.pct)}</b></span>
        <span class="pnl-detalhe-meta">${plural(p.marcados, 'etapa marcada', 'etapas marcadas')} de ${m.etapas ?? '—'} · ${probs ? `<button type="button" class="pnl-link" data-ver-problemas="${esc(r.u.id)}|${esc(p.chave)}">${plural(probs, 'problema', 'problemas')}</button>` : 'sem problemas'} · ${plural(p.anexos, 'imagem', 'imagens')} · ${esc(relativo(p.atualizadoEm))}</span></li>`;
    }).join('')}</ul>`;
  }

  function mapa(c) {
    const pessoas = c.linhasUsuarios.filter((r) => r.linhas.length).sort((a, b) => b.media - a.media);
    const colunas = c.itens.filter((m) => c.progresso.some((p) => p.chave === m.chave));
    if (!pessoas.length || !colunas.length) return '<p class="pnl-vazio-texto">Sem progresso gravado neste filtro.</p>';
    const grupoNome = Object.fromEntries(estado.manifest.grupos.map((g) => [g.id, g.nome]));
    const celula = (r, m) => {
      const p = r.linhas.find((x) => x.chave === m.chave);
      if (!p) return `<td class="pnl-mapa-vazio" data-dica="${esc(`<strong>${esc(r.u.nome)}</strong><br>${esc(m.titulo)}<br>Não começou`)}"><span aria-label="não começou">·</span></td>`;
      const cor = corDe(p.pct);
      return `<td style="background:${cor.fundo};color:${cor.tinta}" data-dica="${esc(`<strong>${esc(r.u.nome)}</strong><br>${esc(m.titulo)}<br>${pct(p.pct)} · ${plural(p.marcados, 'etapa marcada', 'etapas marcadas')} · ${esc(relativo(p.atualizadoEm))}`)}">${p.pct}</td>`;
    };
    return `<div class="pnl-mapa-rolagem"><table class="pnl-mapa">
      <thead><tr><th scope="col" class="pnl-mapa-canto">Pessoa</th>${colunas.map((m, i) => `<th scope="col" data-dica="${esc(`<strong>${esc(m.titulo)}</strong><br>${esc(grupoNome[m.grupo] || '')}`)}"><span>${i + 1}</span></th>`).join('')}</tr></thead>
      <tbody>${pessoas.map((r) => `<tr><th scope="row">${esc(r.u.nome)}</th>${colunas.map((m) => celula(r, m)).join('')}</tr>`).join('')}</tbody>
    </table></div>
    <div class="pnl-mapa-rodape">
      <ul class="pnl-legenda pnl-legenda--escala" aria-label="Escala do progresso">
        ${ESCALA.map((e, i) => `<li><span class="pnl-chave" style="background:${e.fundo}"></span>${i === 0 ? '1–24%' : i === ESCALA.length - 1 ? '100%' : `${ESCALA[i - 1].ate + 1}–${e.ate}%`}</li>`).join('')}
        <li><span class="pnl-chave pnl-chave--vazia">·</span>não começou</li>
      </ul>
      <details class="pnl-mapa-chave"><summary>Ver a lista numerada dos checklists</summary><ol>${colunas.map((m) => `<li>${esc(m.titulo)}</li>`).join('')}</ol></details>
    </div>`;
  }

  /* Problemas com os filtros da própria seção (texto, checklist e pessoa), do mais recente para o mais antigo.
     A tela e a exportação da seção usam a mesma lista. */
  function problemasFiltrados(c) {
    const pf = estado.prob;
    const termo = pf.busca.trim().toLowerCase();
    const nomeDe = Object.fromEntries(estado.dados.usuarios.map((u) => [u.id, u]));
    return c.problemas.filter((p) => (!pf.chave || p.chave === pf.chave) && (!pf.usuario || p.usuario === pf.usuario)
      && (!termo || `${p.problema} ${p.registro} ${c.porChave.get(p.chave)?.titulo} ${nomeDe[p.usuario]?.nome}`.toLowerCase().includes(termo)))
      .sort((a, b) => (a.atualizadoEm < b.atualizadoEm ? 1 : -1));
  }

  function problemas(c) {
    const pf = estado.prob;
    const nomeDe = Object.fromEntries(estado.dados.usuarios.map((u) => [u.id, u]));
    const lista = problemasFiltrados(c);
    const chavesComProblema = c.itens.filter((m) => c.problemas.some((p) => p.chave === m.chave));
    const pessoasComProblema = c.usuarios.filter((u) => c.problemas.some((p) => p.usuario === u.id));
    const filtros = `<div class="pnl-filtros pnl-filtros--prob">
        <label class="pnl-campo pnl-campo--busca">${svg(ICONE.busca)}<input type="search" data-prob="busca" value="${esc(pf.busca)}" placeholder="Buscar no texto dos problemas" aria-label="Buscar problemas"></label>
        <label class="pnl-campo"><span>Checklist</span><select data-prob="chave"><option value="">Todos</option>${chavesComProblema.map((m) => `<option value="${esc(m.chave)}" ${pf.chave === m.chave ? 'selected' : ''}>${esc(m.titulo)}</option>`).join('')}</select></label>
        <label class="pnl-campo"><span>Pessoa</span><select data-prob="usuario"><option value="">Todas</option>${pessoasComProblema.map((u) => `<option value="${esc(u.id)}" ${pf.usuario === u.id ? 'selected' : ''}>${esc(u.nome)}</option>`).join('')}</select></label>
      </div>`;
    if (!c.problemas.length) return `${filtros}<p class="pnl-vazio-texto">Nenhum problema registrado neste filtro.</p>`;
    if (!lista.length) return `${filtros}<p class="pnl-vazio-texto">Nenhum problema com esses filtros.</p>`;
    const visiveis = lista.slice(0, pf.limite);
    const imagens = lista.reduce((s, p) => s + p.anexos.length, 0);
    return `${filtros}<div class="pnl-prob-barra">
        <p class="pnl-contagem">${plural(lista.length, 'problema', 'problemas')} · ${plural(new Set(lista.map((p) => p.usuario)).size, 'pessoa', 'pessoas')} · ${plural(imagens, 'imagem', 'imagens')}</p>
        <div class="pnl-exportar">
          <button type="button" class="pnl-btn" data-acao="menu-exportar" aria-haspopup="menu" aria-expanded="false">${svg(ICONE.pdf)}Exportar ${lista.length === c.problemas.length ? 'todos os problemas' : `estes ${lista.length} problemas`}${svg(ICONE.seta, 'pnl-seta')}</button>
          <div class="pnl-menu" role="menu" hidden>
            <button type="button" role="menuitem" data-exportar="prob-pdf">${svg(ICONE.pdf)}<span>PDF com as imagens<small>Nome, checklist, etapa, problema, registro e as imagens de cada um</small></span></button>
            <button type="button" role="menuitem" data-exportar="prob-html">${svg(ICONE.imagem)}<span>Relatório com imagens (HTML)<small>Abre em qualquer navegador; clique na imagem para ampliar</small></span></button>
            <button type="button" role="menuitem" data-exportar="prob-excel">${svg(ICONE.planilha)}<span>Planilha (Excel)<small>Uma linha por problema, com links das imagens</small></span></button>
          </div>
        </div>
      </div>
      <div class="pnl-probs">${visiveis.map((p) => {
        const m = c.porChave.get(p.chave);
        const u = nomeDe[p.usuario];
        return `<article class="pnl-prob">
          <header><span class="pnl-prob-checklist"><small>${esc(m.area || '')}</small>${esc(m.titulo)}</span><span class="pnl-prob-quem"><span class="pnl-avatar pnl-avatar--p" aria-hidden="true">${esc(iniciais(u?.nome || '?'))}</span>${esc(u?.nome || '—')} · ${esc(fmtDataHora(p.atualizadoEm))}</span></header>
          <p class="pnl-prob-etapa" data-etapa="${esc(p.chave)}|${esc(p.item)}"><span class="pnl-prob-secao"></span><span class="pnl-prob-texto">Etapa ${esc(p.item)}</span></p>
          <blockquote>${esc(p.problema)}</blockquote>
          ${p.registro ? `<p class="pnl-prob-registro"><strong>Registro:</strong> ${esc(p.registro)}</p>` : ''}
          ${p.anexos.length ? `<div class="pnl-prob-imagens">${p.anexos.map((a) => `<a href="/api/checklists-admin?anexo=${encodeURIComponent(a.id)}" target="_blank" rel="noopener" title="${esc(a.nome || 'Imagem anexada')}"><img src="/api/checklists-admin?anexo=${encodeURIComponent(a.id)}" alt="${esc(a.nome || 'Imagem anexada ao problema')}" loading="lazy"></a>`).join('')}</div>` : ''}
        </article>`;
      }).join('')}</div>
      ${lista.length > visiveis.length ? `<button type="button" class="pnl-btn pnl-btn--sec pnl-mais" data-acao="mais-problemas">Mostrar mais ${Math.min(24, lista.length - visiveis.length)} de ${lista.length - visiveis.length}</button>` : ''}`;
  }

  /* Textos das etapas: vêm do HTML de cada checklist (o mesmo que a pessoa preencheu), carregado só quando preciso. */
  async function estruturaDe(chave) {
    if (estado.etapas[chave]) return estado.etapas[chave];
    const m = estado.manifest.itens.find((i) => i.chave === chave);
    const R = window.ffRelatorioProblemas;
    if (!m || !R) return (estado.etapas[chave] = { etapas: {}, ordem: [] });
    estado.etapas[chave] = fetch(`/checklists/${m.arquivo}`, { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.text() : ''))
      .then((html) => R.etapasDo(new DOMParser().parseFromString(html, 'text/html')))
      .catch(() => ({ etapas: {}, ordem: [] }));
    return estado.etapas[chave];
  }
  function preencherEtapas() {
    painel.querySelectorAll('[data-etapa]').forEach(async (el) => {
      const [chave, item] = el.dataset.etapa.split('|');
      const e = (await estruturaDe(chave)).etapas?.[item];
      if (!e || !el.isConnected) return;
      el.querySelector('.pnl-prob-secao').textContent = e.secao || '';
      el.querySelector('.pnl-prob-texto').textContent = e.etapa || `Etapa ${item}`;
    });
  }

  /* ---------- Interação ---------- */
  painel.addEventListener('input', (e) => {
    const alvo = e.target;
    if (alvo.dataset.filtro === 'busca') { estado.filtros.busca = alvo.value; atualizarMantendoFoco(alvo); }
    if (alvo.dataset.prob === 'busca') { estado.prob.busca = alvo.value; estado.prob.limite = 24; atualizarMantendoFoco(alvo); }
  });
  painel.addEventListener('change', (e) => {
    const alvo = e.target;
    if (alvo.dataset.filtro && alvo.dataset.filtro !== 'busca') { estado.filtros[alvo.dataset.filtro] = alvo.value; render(); }
    if (alvo.dataset.prob && alvo.dataset.prob !== 'busca') { estado.prob[alvo.dataset.prob] = alvo.value; estado.prob.limite = 24; render(); }
  });
  let espera;
  function atualizarMantendoFoco(campo) {
    clearTimeout(espera);
    espera = setTimeout(() => {
      const seletor = campo.dataset.filtro ? `[data-filtro="${campo.dataset.filtro}"]` : `[data-prob="${campo.dataset.prob}"]`;
      const pos = campo.selectionStart;
      render();
      const novo = painel.querySelector(seletor);
      if (novo) { novo.focus(); novo.setSelectionRange(pos, pos); }
    }, 180);
  }

  painel.addEventListener('click', (e) => {
    const alvo = e.target.closest('button, tr[data-usuario]');
    if (!alvo) return;
    if (alvo.dataset.acao === 'atualizar') { carregar(); return; }
    if (alvo.dataset.acao === 'mais-problemas') { estado.prob.limite += 24; render(); return; }
    if (alvo.dataset.acao === 'menu-exportar') { alternarMenu(alvo); return; }
    if (alvo.dataset.exportar) { fecharMenu(); exportar(alvo.dataset.exportar); return; }
    if (alvo.dataset.ordem) {
      const col = alvo.dataset.ordem;
      estado.ordem = { col, dir: estado.ordem.col === col ? -estado.ordem.dir : (col === 'nome' || col === 'papel' ? 1 : -1) };
      render();
      return;
    }
    if (alvo.dataset.verProblemas) {
      const [usuario, chave] = alvo.dataset.verProblemas.split('|');
      Object.assign(estado.prob, { usuario, chave, busca: '', limite: 24 });
      render();
      painel.querySelector('#pnl-t-problemas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (alvo.matches('tr[data-usuario]')) {
      estado.aberto = estado.aberto === alvo.dataset.usuario ? null : alvo.dataset.usuario;
      render();
    }
  });
  painel.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('tr[data-usuario]')) { e.preventDefault(); e.target.click(); }
    if (e.key === 'Escape') fecharMenu();
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.pnl-exportar')) fecharMenu(); });
  function alternarMenu(botao) {
    const menu = botao.nextElementSibling;
    const abrir = menu.hidden;
    menu.hidden = !abrir;
    botao.setAttribute('aria-expanded', String(abrir));
    if (abrir) menu.querySelector('button')?.focus();
  }
  function fecharMenu() {
    painel.querySelectorAll('.pnl-menu').forEach((m) => { m.hidden = true; });
    painel.querySelectorAll('[data-acao="menu-exportar"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  }

  /* Dica ao passar o mouse (gráficos e mapa) */
  painel.addEventListener('mouseover', (e) => {
    const alvo = e.target.closest('[data-dica]');
    const dica = painel.querySelector('.pnl-dica');
    if (!dica) return;
    if (!alvo) { dica.hidden = true; return; }
    dica.innerHTML = alvo.dataset.dica;
    dica.hidden = false;
    posicionar(dica, e);
  });
  painel.addEventListener('mousemove', (e) => {
    const dica = painel.querySelector('.pnl-dica');
    if (dica && !dica.hidden) posicionar(dica, e);
  });
  painel.addEventListener('mouseleave', () => { const d = painel.querySelector('.pnl-dica'); if (d) d.hidden = true; });
  function posicionar(dica, e) {
    const larg = dica.offsetWidth, alt = dica.offsetHeight;
    let x = e.clientX + 16, y = e.clientY + 16;
    if (x + larg > innerWidth - 8) x = e.clientX - larg - 16;
    if (y + alt > innerHeight - 8) y = e.clientY - alt - 16;
    dica.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
  }

  const avisar = (texto) => { const a = painel.querySelector('.pnl-aviso'); if (a) a.textContent = texto; };

  /* ---------- Exportação ---------- */
  const hoje = () => new Date().toISOString().slice(0, 10);
  function baixar(nome, blob) {
    if (window.ffRelatorioProblemas?.baixar) { window.ffRelatorioProblemas.baixar(nome, blob); return; }
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), { href: url, download: nome });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  // CSV com ponto e vírgula e BOM: abre direto no Excel em português, com acentos
  const celulaCsv = (v) => { const s = String(v ?? ''); return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const csv = (linhas) => new Blob(['﻿' + linhas.map((l) => l.map(celulaCsv).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' });

  async function exportar(tipo) {
    const c = calcular();
    const nomeDe = Object.fromEntries(estado.dados.usuarios.map((u) => [u.id, u]));
    const grupoNome = Object.fromEntries(estado.manifest.grupos.map((g) => [g.id, g.nome]));
    try {
      if (tipo === 'progresso') {
        const linhas = [['Pessoa', 'Login', 'Perfil', 'Ativo', 'Grupo', 'Checklist', 'Progresso (%)', 'Etapas marcadas', 'Etapas do checklist', 'Problemas', 'Imagens', 'Validador', 'Última gravação']];
        for (const p of [...c.progresso].sort((a, b) => (nomeDe[a.usuario].nome.localeCompare(nomeDe[b.usuario].nome)))) {
          const u = nomeDe[p.usuario], m = c.porChave.get(p.chave);
          linhas.push([u.nome, u.login, u.papelNome, u.ativo ? 'sim' : 'não', grupoNome[m.grupo] || '', m.titulo, p.pct, p.marcados, m.etapas ?? '',
            c.problemas.filter((x) => x.usuario === p.usuario && x.chave === p.chave).length, p.anexos, p.validador, fmtDataHora(p.atualizadoEm)]);
        }
        baixar(`painel-checklists-progresso-${hoje()}.csv`, csv(linhas));
        avisar(`Planilha de progresso exportada (${plural(linhas.length - 1, 'linha', 'linhas')}).`);
      } else if (tipo === 'problemas' || tipo === 'prob-excel') {
        const lista = tipo === 'problemas' ? c.problemas : problemasFiltrados(c);
        if (!lista.length) { avisar('Nenhum problema para exportar neste filtro.'); return; }
        avisar('Juntando os textos das etapas…');
        const linhas = [['Pessoa', 'Login', 'Perfil', 'Checklist', 'Seção', 'Etapa', 'Resultado esperado', 'Problema', 'Registro', 'Imagens', 'Links das imagens (com login de administrador)', 'Gravado em']];
        for (const p of lista) {
          const e = (await estruturaDe(p.chave)).etapas?.[p.item] || {};
          const u = nomeDe[p.usuario];
          linhas.push([u.nome, u.login, u.papelNome, c.porChave.get(p.chave).titulo, e.secao || '', e.etapa || `Etapa ${p.item}`, e.esperado || '', p.problema, p.registro,
            p.anexos.length, p.anexos.map((a) => `${location.origin}/api/checklists-admin?anexo=${a.id}`).join(' '), fmtDataHora(p.atualizadoEm)]);
        }
        baixar(`painel-checklists-problemas-${hoje()}.csv`, csv(linhas));
        avisar(`Planilha de problemas exportada (${plural(linhas.length - 1, 'problema', 'problemas')}).`);
      } else if (tipo === 'pdf') {
        await exportarPdf(c, nomeDe);
      } else if (tipo === 'html') {
        await exportarHtml(c, nomeDe, c.problemas, true);
      } else if (tipo === 'prob-html') {
        await exportarHtml(c, nomeDe, problemasFiltrados(c));
      } else if (tipo === 'prob-pdf') {
        await exportarProblemasPdf(c, nomeDe, problemasFiltrados(c));
      }
    } catch (erro) {
      avisar(erro.message || 'Não foi possível exportar.');
    }
  }

  /* Dados dos relatórios de problemas (HTML e PDF com a identidade do sistema): pessoa, checklist, etapa, resultado
     esperado, problema, registro e as imagens. No HTML as imagens vão no formato original; no PDF, em JPEG. */
  const nomeDoFiltro = (c, nomeDe, todos) => {
    if (todos) return 'todos os problemas do painel';
    const pf = estado.prob;
    return [pf.busca && `texto "${pf.busca}"`, pf.chave && c.porChave.get(pf.chave)?.titulo, pf.usuario && nomeDe[pf.usuario]?.nome].filter(Boolean).join(' · ') || 'todos os problemas';
  };
  async function imagemComoDataUrl(id) {
    try {
      const r = await fetch(`/api/checklists-admin?anexo=${encodeURIComponent(id)}`, { credentials: 'same-origin' });
      if (!r.ok) return null;
      const blob = await r.blob();
      return await new Promise((ok, falha) => { const f = new FileReader(); f.onload = () => ok(f.result); f.onerror = falha; f.readAsDataURL(blob); });
    } catch { return null; }
  }
  /* Imagem em JPEG para o PDF (o jsPDF não lê WebP), com no máximo 1400 px de largura e fundo branco. */
  async function imagemJpeg(src) {
    const img = await new Promise((ok, falha) => { const i = new Image(); i.onload = () => ok(i); i.onerror = falha; i.src = src; });
    const escala = Math.min(1, 1400 / img.naturalWidth);
    const tela = Object.assign(document.createElement('canvas'), { width: Math.round(img.naturalWidth * escala), height: Math.round(img.naturalHeight * escala) });
    const ctx = tela.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, tela.width, tela.height);
    ctx.drawImage(img, 0, 0, tela.width, tela.height);
    return { src: tela.toDataURL('image/jpeg', 0.86), w: tela.width, h: tela.height };
  }
  let logoCache;
  async function logo() {
    if (logoCache !== undefined) return logoCache;
    try {
      const src = await (async () => {
        const r = await fetch('/assets/Logo%20Faktory%20Flow.png');
        if (!r.ok) throw new Error();
        const blob = await r.blob();
        return new Promise((ok, falha) => { const f = new FileReader(); f.onload = () => ok(f.result); f.onerror = falha; f.readAsDataURL(blob); });
      })();
      const img = await new Promise((ok, falha) => { const i = new Image(); i.onload = () => ok(i); i.onerror = falha; i.src = src; });
      logoCache = { src, w: img.naturalWidth, h: img.naturalHeight };
    } catch { logoCache = null; }
    return logoCache;
  }
  async function dadosDoRelatorio(c, nomeDe, lista, formato, todos) {
    const problemas = [];
    let n = 0;
    for (const p of lista) {
      avisar(`Juntando os problemas e as imagens… ${++n} de ${lista.length}`);
      const e = (await estruturaDe(p.chave)).etapas?.[p.item] || {};
      const u = nomeDe[p.usuario] || { nome: '—', login: '', papelNome: '' };
      const m = c.porChave.get(p.chave);
      const imagens = [];
      for (const a of p.anexos) {
        const src = await imagemComoDataUrl(a.id);
        if (!src) continue;
        imagens.push(formato === 'pdf' ? { ...(await imagemJpeg(src).catch(() => null)), nome: a.nome } : { src, nome: a.nome });
      }
      problemas.push({
        pessoa: { nome: u.nome, login: u.login, papelNome: u.papelNome },
        checklist: { titulo: m.titulo, area: m.area || '' },
        secao: e.secao || '', etapa: e.etapa || `Etapa ${p.item}`, esperado: e.esperado || '',
        problema: p.problema, registro: p.registro, atualizadoEm: p.atualizadoEm,
        imagens: imagens.filter((i) => i && i.src),
      });
    }
    return { geradoEm: Date.now(), filtro: nomeDoFiltro(c, nomeDe, todos), logo: await logo(), problemas };
  }

  async function exportarHtml(c, nomeDe, lista, todos = false) {
    if (!window.ffRelatorioAdmin) throw new Error('O gerador do relatório não carregou. Recarregue a página.');
    if (!lista.length) { avisar('Nenhum problema para exportar neste filtro.'); return; }
    const dados = await dadosDoRelatorio(c, nomeDe, lista, 'html', todos);
    baixar(`problemas-checklists-${hoje()}.html`, new Blob([window.ffRelatorioAdmin.html(dados)], { type: 'text/html;charset=utf-8' }));
    const imagens = dados.problemas.reduce((s, p) => s + p.imagens.length, 0);
    avisar(`Relatório HTML exportado: ${plural(lista.length, 'problema', 'problemas')} com ${plural(imagens, 'imagem', 'imagens')}.`);
  }

  async function exportarProblemasPdf(c, nomeDe, lista) {
    if (!window.ffRelatorioAdmin) throw new Error('O gerador do relatório não carregou. Recarregue a página.');
    if (!lista.length) { avisar('Nenhum problema para exportar neste filtro.'); return; }
    const dados = await dadosDoRelatorio(c, nomeDe, lista, 'pdf');
    dados.aoProgredir = (k, total) => avisar(`Montando o PDF… problema ${k} de ${total}`);
    const { blob, paginas } = await window.ffRelatorioAdmin.pdf(dados);
    baixar(`problemas-checklists-${hoje()}.pdf`, blob);
    const imagens = dados.problemas.reduce((s, p) => s + p.imagens.length, 0);
    avisar(`PDF exportado: ${plural(lista.length, 'problema', 'problemas')} com ${plural(imagens, 'imagem', 'imagens')} (${plural(paginas, 'página', 'páginas')}).`);
  }

  async function exportarPdf(c, nomeDe) {
    const J = window.jspdf?.jsPDF;
    if (!J) throw new Error('O gerador de PDF ainda não carregou. Tente de novo em alguns segundos.');
    avisar('Gerando o PDF…');
    const doc = new J({ unit: 'pt', format: 'a4' });
    const L = doc.internal.pageSize.getWidth(), A = doc.internal.pageSize.getHeight(), M = 40;
    let y = M;
    const azul = [29, 111, 176], tinta = [19, 41, 61], cinza = [75, 96, 115], linha = [216, 227, 236];
    const quebra = (alt) => { if (y + alt > A - M) { doc.addPage(); y = M; } };
    const texto = (t, x, tam = 10, cor = tinta, estilo = 'normal', larg = L - 2 * M) => {
      doc.setFont('helvetica', estilo); doc.setFontSize(tam); doc.setTextColor(...cor);
      const partes = doc.splitTextToSize(String(t ?? ''), larg);
      quebra(partes.length * tam * 1.25);
      doc.text(partes, x, y + tam);
      y += partes.length * tam * 1.25;
    };
    const titulo = (t) => { y += 14; quebra(30); doc.setDrawColor(...azul); doc.setLineWidth(2); doc.line(M, y, M + 28, y); y += 6; texto(t, M, 14, tinta, 'bold'); y += 4; };
    const tabela = (cab, linhas, larguras) => {
      const desenhar = (cels, negrito) => {
        doc.setFont('helvetica', negrito ? 'bold' : 'normal'); doc.setFontSize(8.5);
        const quebradas = cels.map((v, i) => doc.splitTextToSize(String(v ?? ''), larguras[i] - 6));
        const alt = Math.max(...quebradas.map((q) => q.length)) * 10.5 + 6;
        quebra(alt);
        let x = M;
        quebradas.forEach((q, i) => { doc.setTextColor(...(negrito ? cinza : tinta)); doc.text(q, x + 3, y + 11); x += larguras[i]; });
        y += alt;
        doc.setDrawColor(...linha); doc.setLineWidth(0.5); doc.line(M, y, L - M, y);
      };
      desenhar(cab, true);
      linhas.forEach((l) => desenhar(l, false));
    };

    const k = c.kpi, f = estado.filtros;
    const filtros = [f.busca && `busca "${f.busca}"`, f.papel && `perfil ${f.papel}`, f.grupo && estado.manifest.grupos.find((g) => g.id === f.grupo)?.nome, f.periodo !== '0' && `últimos ${f.periodo} dias`].filter(Boolean).join(' · ') || 'todos os usuários e checklists';
    doc.setFillColor(...azul); doc.rect(0, 0, L, 6, 'F');
    texto('Painel dos checklists · Faktory Flow', M, 18, tinta, 'bold'); // a fonte padrão do PDF não tem o travessão
    texto(`Gerado em ${fmtDataHora(Date.now())} · dados de ${fmtDataHora(estado.dados.geradoEm)} · filtro: ${filtros}`, M, 9, cinza);
    titulo('Indicadores');
    tabela(['Usuários ativos', 'Começaram', 'Progresso médio', 'Concluídos', 'Em andamento', 'Problemas', 'Imagens'],
      [[k.ativos, k.comInicio, pct(k.media), k.concluidos, k.andamento, k.problemas, k.imagens]], Array(7).fill((L - 2 * M) / 7));
    titulo('Checklists');
    tabela(['Checklist', 'Começaram', 'Concluíram', 'Progresso médio', 'Problemas'],
      c.porChecklist.filter((r) => r.iniciados).sort((a, b) => b.media - a.media).map((r) => [r.m.titulo, r.iniciados, r.concluidos, pct(r.media), r.problemas]),
      [255, 60, 60, 75, 65]);
    titulo('Usuários');
    tabela(['Pessoa', 'Perfil', 'Começou', 'Concluiu', 'Progresso médio', 'Problemas', 'Última atividade'],
      [...c.linhasUsuarios].sort((a, b) => b.media - a.media).map((r) => [`${r.u.nome} (${r.u.login})`, r.u.papelNome, r.iniciados, r.concluidos, r.iniciados ? pct(r.media) : '—', r.problemas, fmtData(r.ultima)]),
      [150, 70, 50, 50, 70, 55, 70]);
    if (c.problemas.length) {
      titulo(`Problemas registrados (${c.problemas.length})`);
      for (const p of c.problemas) {
        const e = (await estruturaDe(p.chave)).etapas?.[p.item] || {};
        quebra(60);
        texto(`${c.porChave.get(p.chave).titulo} · ${nomeDe[p.usuario].nome} · ${fmtDataHora(p.atualizadoEm)}`, M, 8.5, cinza, 'bold');
        texto(e.etapa || `Etapa ${p.item}`, M, 9.5, tinta, 'bold');
        texto(p.problema, M + 10, 9.5, tinta, 'normal', L - 2 * M - 10);
        if (p.registro) texto(`Registro: ${p.registro}`, M + 10, 8.5, cinza, 'normal', L - 2 * M - 10);
        if (p.anexos.length) texto(`${plural(p.anexos.length, 'imagem anexada', 'imagens anexadas')} (veja no relatório com imagens)`, M + 10, 8.5, cinza, 'italic');
        y += 8;
      }
    }
    const paginas = doc.getNumberOfPages();
    for (let i = 1; i <= paginas; i++) {
      doc.setPage(i); doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(...cinza);
      doc.text(`Faktory Flow · Painel dos checklists · página ${i} de ${paginas}`, M, A - 20);
    }
    baixar(`painel-checklists-${hoje()}.pdf`, doc.output('blob'));
    avisar(`PDF exportado (${plural(paginas, 'página', 'páginas')}).`);
  }
})();
