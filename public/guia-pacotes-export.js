/* Exportação da aba Pacotes e Horas.
   PDF: abre uma composição A4 própria para impressão/salvamento em PDF.
   Excel: gera um Workbook XML compatível com Excel, com abas e estilos da Faktory Flow. */
(() => {
  const H = window.ffHoras;
  const botoes = [...document.querySelectorAll('[data-exportar-pacotes]')];
  if (!H || !botoes.length) return;

  const html = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const xml = (valor) => String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[c]));
  const pct = (parte, total) => (total ? Math.round((parte / total) * 100) : 0);
  const dataArquivo = () => new Date().toISOString().slice(0, 10);
  const slug = (valor) => String(valor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');

  function obterDados() {
    const origem = window.ffPacotesExportacao?.obterDados();
    if (!origem || !H.estado.carregado || !origem.pacotes?.length) throw new Error('Os pacotes ainda estão carregando. Aguarde alguns segundos e tente novamente.');
    const pacotes = origem.pacotes.map((pacote) => {
      const fator = H.fator(pacote, origem.cenario.fluxo, origem.cenario.faixa);
      return {
        pacote, fator, disponivel: fator != null,
        totais: H.totalPacote(pacote, origem.modulos, origem.cenario.fluxo, origem.cenario.faixa),
      };
    });
    return {
      ...origem, pacotes,
      cenarioTexto: `${origem.cenario.fluxo} · ${origem.faixa}`,
      geradoEm: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date()),
    };
  }

  function tabelaHtml(cabecalhos, linhas, classe = '') {
    if (!linhas.length) return '<p class="vazio">Nenhum item cadastrado.</p>';
    return `<table class="${classe}"><thead><tr>${cabecalhos.map((x) => `<th>${html(x)}</th>`).join('')}</tr></thead><tbody>${linhas.map((linha) => `<tr>${linha.map((celula) => `<td>${celula}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }

  function pacotePdf(item) {
    const { pacote: p, totais: t, disponivel, fator } = item;
    if (!disponivel) return `<section class="pacote"><header class="pacote-topo"><div><span class="nivel">${html(p.nivel)}</span><h2>${html(p.nome)}</h2></div><strong class="indisponivel">Indisponível neste fluxo</strong></header><p>Este pacote não possui horas cadastradas para o cenário selecionado.</p></section>`;
    const escalar = (minutos) => Math.round(((fator ?? 1) * minutos) / 5) * 5;
    const modulos = t.porModulo.map((m) => [html(m.nome), html(H.formatar(m.minutos, { vazio: '0h' })), `${pct(m.minutos, t.total)}%`, m.proprio ? 'Valor próprio' : 'Calculado']);
    const etapas = t.etapas.map((e) => [html(e.texto), html(H.formatar(escalar(e.minutos), { vazio: '0h' }))]);
    const recursos = t.recursos.map((e) => [html(e.texto), html(H.formatar(escalar(e.minutos), { vazio: '0h' }))]);
    const funcionalidades = p.funcionalidades.map((f) => [html(f.modulo || 'Geral'), html(f.funcionalidade), html(f.nivel), html(f.complexidade)]);
    const diferenca = t.total - t.tabela;
    return `<section class="pacote">
      <header class="pacote-topo"><div><span class="nivel">${html(p.nivel)}</span><h2>${html(p.nome)}</h2><p>${t.porModulo.length} módulos · ${p.funcionalidades.length} funcionalidades</p></div><div class="total"><span>Tempo total previsto</span><strong>${html(H.formatar(t.total, { vazio: '0h' }))}</strong><small>${diferenca === 0 ? 'Igual à tabela de preços' : `${html(H.formatar(Math.abs(diferenca)))} ${diferenca > 0 ? 'acima' : 'abaixo'} da tabela`}</small></div></header>
      <div class="metricas"><div><span>Etapas</span><strong>${html(H.formatar(t.minutosEtapas, { vazio: '0h' }))}</strong></div><div><span>Módulos</span><strong>${html(H.formatar(t.minutosModulos, { vazio: '0h' }))}</strong></div><div><span>Recursos</span><strong>${html(H.formatar(t.minutosRecursos, { vazio: '0h' }))}</strong></div><div><span>Tabela de preços</span><strong>${html(H.formatar(t.tabela, { vazio: '0h' }))}</strong></div></div>
      <h3>Módulos contemplados</h3>${tabelaHtml(['Módulo', 'Duração', '% do total', 'Origem'], modulos)}
      <div class="duas-colunas"><div><h3>Etapas de implantação</h3>${tabelaHtml(['Etapa', 'Duração'], etapas)}</div><div><h3>Recursos gerais</h3>${tabelaHtml(['Recurso', 'Duração'], recursos)}</div></div>
      <h3>Funcionalidades incluídas</h3>${tabelaHtml(['Módulo', 'Funcionalidade', 'Nível', 'Prioridade'], funcionalidades, 'funcionalidades')}
    </section>`;
  }

  function exportarPdf(dados) {
    const janela = window.open('', '_blank');
    if (!janela) throw new Error('O navegador bloqueou a janela do relatório. Permita pop-ups para gerar o PDF.');
    janela.opener = null;
    const resumo = dados.pacotes.map(({ pacote: p, totais: t, disponivel }) => [html(p.nome), html(p.nivel), disponivel ? html(H.formatar(t.total, { vazio: '0h' })) : 'Indisponível', disponivel ? html(H.formatar(t.tabela, { vazio: '0h' })) : '—']);
    const documento = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Pacotes e Horas - ${html(dados.cenarioTexto)}</title><style>
      @page{size:A4 landscape;margin:12mm}*{box-sizing:border-box}body{margin:0;color:#102f46;font:10pt/1.45 Arial,sans-serif;background:#fff}h1,h2,h3,p{margin-top:0}h1{max-width:650px;margin:24px 0 10px;font-size:34pt;line-height:1.04;letter-spacing:-1.5px}h2{margin:4px 0;font-size:22pt;line-height:1.1}h3{margin:18px 0 7px;font-size:11pt;color:#174e72}.capa{min-height:175mm;page-break-after:always;display:flex;flex-direction:column}.marca{display:flex;align-items:center;gap:12px;font-weight:800;font-size:15pt}.simbolo{display:grid;grid-template-columns:repeat(2,14px);gap:3px}.simbolo i{display:block;width:14px;height:14px;background:#3478a7}.simbolo i:first-child{background:#d5dd26}.cenario{display:inline-flex;align-self:flex-start;margin:8px 0 24px;padding:7px 12px;border-radius:99px;background:#f6f8d4;color:#173e59;font-weight:700}.introducao{max-width:720px;color:#526977;font-size:12pt}.resumo{margin-top:auto}.pacote{page-break-after:always}.pacote:last-child{page-break-after:auto}.pacote-topo{display:flex;justify-content:space-between;gap:24px;padding-bottom:12px;border-bottom:1px solid #d8e2e9}.pacote-topo p{margin:4px 0;color:#526977}.nivel{display:inline-block;padding:3px 9px;border-radius:99px;background:#3478a7;color:#fff;font-size:8pt;font-weight:800;text-transform:uppercase;letter-spacing:.6px}.total{text-align:right}.total span,.total small{display:block;color:#526977}.total strong{display:block;font-size:25pt;color:#0d3854}.indisponivel{align-self:center;color:#526977}.metricas{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:14px 0}.metricas div{padding:10px 12px;border:1px solid #d8e2e9;border-radius:8px;background:#f4f8fb}.metricas span{display:block;color:#526977;font-size:8pt;text-transform:uppercase;letter-spacing:.4px}.metricas strong{display:block;margin-top:2px;font-size:14pt}.duas-colunas{display:grid;grid-template-columns:1fr 1fr;gap:18px}table{width:100%;border-collapse:collapse;font-size:8.5pt}thead{display:table-header-group}th{padding:7px 8px;background:#0d3854;color:#fff;text-align:left}td{padding:6px 8px;border-bottom:1px solid #d8e2e9;vertical-align:top}tbody tr:nth-child(even){background:#f4f8fb}.funcionalidades{font-size:8pt}.vazio{padding:10px;border:1px dashed #b7c8d4;color:#526977}.rodape{margin-top:auto;padding-top:12px;color:#637986;font-size:8pt}.resumo table{font-size:10pt}.resumo td,.resumo th{padding:9px 10px}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
    </style></head><body><section class="capa"><div class="marca"><span class="simbolo"><i></i><i></i><i></i><i></i></span>Faktory Flow</div><h1>Pacotes e Distribuição de Horas</h1><p class="introducao">Relatório consolidado com a distribuição das horas, módulos contemplados, etapas, recursos e funcionalidades de cada pacote.</p><span class="cenario">${html(dados.cenarioTexto)}</span><div class="resumo"><h3>Visão geral</h3>${tabelaHtml(['Pacote', 'Nível', 'Tempo previsto', 'Tabela de preços'], resumo)}</div><p class="rodape">Gerado em ${html(dados.geradoEm)} · Guia do Consultor Faktory Flow</p></section>${dados.pacotes.map(pacotePdf).join('')}</body></html>`;
    janela.document.open(); janela.document.write(documento); janela.document.close();
    setTimeout(() => { janela.focus(); janela.print(); }, 450);
  }

  const celula = (valor, estilo = '') => {
    const numero = typeof valor === 'number' && Number.isFinite(valor);
    return `<Cell${estilo ? ` ss:StyleID="${estilo}"` : ''}><Data ss:Type="${numero ? 'Number' : 'String'}">${xml(numero ? valor : (valor ?? ''))}</Data></Cell>`;
  };
  function planilha(nome, titulo, cabecalhos, linhas, larguras) {
    return `<Worksheet ss:Name="${xml(nome.slice(0, 31))}"><Table>${larguras.map((w) => `<Column ss:AutoFitWidth="0" ss:Width="${w}"/>`).join('')}<Row ss:Height="30">${`<Cell ss:StyleID="Titulo" ss:MergeAcross="${cabecalhos.length - 1}"><Data ss:Type="String">${xml(titulo)}</Data></Cell>`}</Row><Row>${cabecalhos.map((x) => celula(x, 'Cabecalho')).join('')}</Row>${linhas.map((linha) => `<Row>${linha.map((x) => celula(x)).join('')}</Row>`).join('')}</Table><WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><FreezePanes/><FrozenNoSplit/><SplitHorizontal>2</SplitHorizontal><TopRowBottomPane>2</TopRowBottomPane><ProtectObjects>False</ProtectObjects><ProtectScenarios>False</ProtectScenarios></WorksheetOptions></Worksheet>`;
  }

  function exportarExcel(dados) {
    const resumo = [], modulos = [], etapas = [], funcionalidades = [], precos = [];
    for (const { pacote: p, totais: t, disponivel, fator } of dados.pacotes) {
      resumo.push([p.nome, p.nivel, dados.cenario.fluxo, dados.faixa, disponivel ? t.minutosEtapas : '', disponivel ? t.minutosModulos : '', disponivel ? t.minutosRecursos : '', disponivel ? t.total : '', disponivel ? H.formatar(t.total, { vazio: '0h' }) : 'Indisponível', disponivel ? t.tabela / 60 : '', p.funcionalidades.length]);
      if (disponivel) {
        for (const m of t.porModulo) modulos.push([p.nome, m.nome, m.minutos, H.formatar(m.minutos, { vazio: '0h' }), pct(m.minutos, t.total), m.proprio ? 'Valor próprio do cenário' : 'Calculado']);
        const escalar = (minutos) => Math.round(((fator ?? 1) * minutos) / 5) * 5;
        for (const e of [...t.etapas.map((x) => ({ ...x, tipo: 'Etapa de implantação' })), ...t.recursos.map((x) => ({ ...x, tipo: 'Recurso geral' }))]) {
          const minutos = escalar(e.minutos);
          etapas.push([p.nome, e.tipo, e.texto, e.detalhe || '', minutos, H.formatar(minutos, { vazio: '0h' })]);
        }
      }
      for (const f of p.funcionalidades) funcionalidades.push([p.nome, f.modulo || 'Geral', f.funcionalidade, f.nivel, f.complexidade]);
      for (const fluxo of H.estado.fluxos) H.estado.faixas.forEach((faixa, i) => precos.push([p.nome, fluxo, faixa, p.precos[fluxo]?.[i] ?? '']));
    }
    const titulo = `Pacotes e Horas — ${dados.cenarioTexto}`;
    const workbook = `<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Faktory Flow</Author><Title>${xml(titulo)}</Title><Created>${new Date().toISOString()}</Created></DocumentProperties><Styles><Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Center"/><Font ss:FontName="Arial" ss:Size="10"/><Borders/><Interior/><NumberFormat/><Protection/></Style><Style ss:ID="Titulo"><Alignment ss:Vertical="Center"/><Font ss:FontName="Arial" ss:Size="15" ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#0D3854" ss:Pattern="Solid"/></Style><Style ss:ID="Cabecalho"><Alignment ss:Vertical="Center" ss:WrapText="1"/><Font ss:FontName="Arial" ss:Size="10" ss:Bold="1" ss:Color="#1E2A05"/><Interior ss:Color="#D5DD26" ss:Pattern="Solid"/><Borders><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#B7BF10"/></Borders></Style></Styles>${planilha('Resumo', titulo, ['Pacote', 'Nível', 'Fluxo', 'Faixa de usuários', 'Etapas (min)', 'Módulos (min)', 'Recursos (min)', 'Total (min)', 'Total formatado', 'Tabela (h)', 'Funcionalidades'], resumo, [150, 70, 70, 120, 75, 80, 80, 75, 95, 75, 90])}${planilha('Módulos', titulo, ['Pacote', 'Módulo', 'Minutos', 'Duração', '% do total', 'Origem'], modulos, [150, 160, 70, 80, 80, 145])}${planilha('Etapas e recursos', titulo, ['Pacote', 'Tipo', 'Item', 'Detalhe', 'Minutos', 'Duração'], etapas, [145, 115, 190, 220, 70, 80])}${planilha('Funcionalidades', titulo, ['Pacote', 'Módulo', 'Funcionalidade', 'Nível', 'Prioridade'], funcionalidades, [145, 145, 300, 75, 80])}${planilha('Tabela de preços', titulo, ['Pacote', 'Fluxo', 'Faixa de usuários', 'Horas'], precos, [150, 80, 130, 70])}</Workbook>`;
    const blob = new Blob([`\uFEFF${workbook}`], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `Pacotes-e-Horas-${slug(dados.cenarioTexto)}-${dataArquivo()}.xls`;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  for (const botao of botoes) botao.addEventListener('click', () => {
    const formato = botao.dataset.exportarPacotes;
    const rotulo = botao.querySelector('span');
    const original = rotulo?.textContent;
    botao.disabled = true;
    if (rotulo) rotulo.textContent = 'Gerando…';
    try {
      const dados = obterDados();
      if (formato === 'pdf') exportarPdf(dados); else exportarExcel(dados);
      window.ffPacotesAviso?.(`Relatório em ${formato === 'pdf' ? 'PDF' : 'Excel'} preparado para ${dados.cenarioTexto}.`);
    } catch (erro) {
      window.ffPacotesAviso?.(erro.message, 'erro');
      if (!window.ffPacotesAviso) window.alert(erro.message);
    } finally {
      botao.disabled = false;
      if (rotulo) rotulo.textContent = original;
    }
  });
})();
