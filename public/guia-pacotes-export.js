/* Exportação da aba Pacotes e Horas.
   PDF: gera e baixa uma composição A4 com jsPDF, sem abrir a tela de impressão.
   Excel: gera um Workbook XML compatível com Excel, com abas e estilos da Faktory Flow. */
(() => {
  const H = window.ffHoras;
  const botoes = [...document.querySelectorAll('[data-exportar-pacotes]')];
  if (!H || !botoes.length) return;

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

  const carregarLogo = () => new Promise((resolve, reject) => {
    const imagem = new Image();
    imagem.onload = () => resolve(imagem);
    imagem.onerror = () => reject(new Error('Não foi possível carregar a logo da Faktory Flow.'));
    imagem.src = '/assets/Logo%20Faktory%20Flow.png';
  });

  async function exportarPdf(dados) {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF) throw new Error('O gerador de PDF não foi carregado. Atualize a página e tente novamente.');
    const logo = await carregarLogo();
    const doc = new JsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
    const C = { marinho: [13, 56, 84], azul: [52, 120, 167], lima: [213, 221, 38], tinta: [16, 47, 70], texto: [72, 96, 112], linha: [216, 226, 233], fundo: [244, 248, 251], branco: [255, 255, 255] };
    const margem = 14, largura = 297, limite = 194;
    let y = 0;
    const cor = (tipo, valor) => doc[tipo](...valor);
    const texto = (valor, x, yy, tamanho = 9, negrito = false, opcoes = {}) => {
      cor('setTextColor', opcoes.cor || C.tinta); doc.setFont('helvetica', negrito ? 'bold' : 'normal'); doc.setFontSize(tamanho);
      doc.text(String(valor ?? ''), x, yy, opcoes);
    };
    const logoNoTopo = (x = margem, yy = 8, w = 42) => doc.addImage(logo, 'PNG', x, yy, w, w * (logo.naturalHeight / logo.naturalWidth), undefined, 'FAST');
    const cabecalhoPagina = () => {
      logoNoTopo(margem, 7, 30);
      texto(dados.cenarioTexto, largura - margem, 15, 8, true, { align: 'right', cor: C.azul });
      cor('setDrawColor', C.linha); doc.setLineWidth(.35); doc.line(margem, 23, largura - margem, 23); y = 29;
    };
    const novaPagina = (continuacao = '') => {
      doc.addPage(); cabecalhoPagina();
      if (continuacao) { texto(continuacao, margem, y, 9, true, { cor: C.texto }); y += 7; }
    };
    const tituloSecao = (titulo) => { if (y > limite - 12) novaPagina(); texto(titulo, margem, y, 11, true, { cor: C.marinho }); y += 5; };
    const tabela = (titulo, cabecalhos, linhas, larguras) => {
      tituloSecao(titulo);
      const totalLarguras = larguras.reduce((a, b) => a + b, 0);
      const desenharCabecalho = () => {
        let x = margem; cor('setFillColor', C.marinho); doc.rect(margem, y, totalLarguras, 8, 'F');
        cabecalhos.forEach((cabecalho, i) => { texto(cabecalho, x + 2, y + 5.2, 7.5, true, { cor: C.branco }); x += larguras[i]; }); y += 8;
      };
      if (!linhas.length) { texto('Nenhum item cadastrado.', margem + 2, y + 5, 8, false, { cor: C.texto }); y += 9; return; }
      desenharCabecalho();
      linhas.forEach((linha, indice) => {
        const quebradas = linha.map((valor, i) => doc.splitTextToSize(String(valor ?? ''), Math.max(8, larguras[i] - 4)));
        const h = Math.max(7, Math.max(...quebradas.map((x) => x.length)) * 3.6 + 3);
        if (y + h > limite) { novaPagina(`${titulo} · continuação`); desenharCabecalho(); }
        if (indice % 2) { cor('setFillColor', C.fundo); doc.rect(margem, y, totalLarguras, h, 'F'); }
        let x = margem;
        quebradas.forEach((linhasCelula, i) => { texto(linhasCelula, x + 2, y + 4.5, 7.4, false, { cor: C.tinta }); x += larguras[i]; });
        cor('setDrawColor', C.linha); doc.setLineWidth(.2); doc.line(margem, y + h, margem + totalLarguras, y + h); y += h;
      });
      y += 5;
    };

    logoNoTopo(margem, 12, 52);
    texto('Pacotes e', margem, 58, 30, true, { cor: C.marinho });
    texto('Distribuição de Horas', margem, 70, 30, true, { cor: C.marinho });
    texto('Relatório consolidado de implantação', margem, 80, 13, false, { cor: C.texto });
    cor('setFillColor', [246, 248, 212]); doc.roundedRect(margem, 87, 74, 11, 5.5, 5.5, 'F');
    texto(dados.cenarioTexto, margem + 6, 94, 9, true, { cor: C.marinho }); y = 112;
    tabela('Visão geral', ['Pacote', 'Nível', 'Tempo previsto', 'Tabela de preços'], dados.pacotes.map(({ pacote: p, totais: t, disponivel }) => [p.nome, p.nivel, disponivel ? H.formatar(t.total, { vazio: '0h' }) : 'Indisponível', disponivel ? H.formatar(t.tabela, { vazio: '0h' }) : '—']), [100, 42, 57, 56]);
    texto(`Gerado em ${dados.geradoEm}`, margem, 199, 7.5, false, { cor: C.texto });

    for (const { pacote: p, totais: t, disponivel } of dados.pacotes) {
      novaPagina();
      cor('setFillColor', C.azul); doc.roundedRect(margem, y, 27, 7, 3.5, 3.5, 'F'); texto(p.nivel, margem + 13.5, y + 4.8, 7, true, { align: 'center', cor: C.branco });
      y += 14; texto(p.nome, margem, y, 22, true, { cor: C.marinho });
      if (!disponivel) { y += 10; texto('Este pacote não possui horas cadastradas para o cenário selecionado.', margem, y, 10, false, { cor: C.texto }); continue; }
      texto('Tempo total previsto', largura - margem, y - 7, 8, false, { align: 'right', cor: C.texto });
      texto(H.formatar(t.total, { vazio: '0h' }), largura - margem, y + 2, 23, true, { align: 'right', cor: C.marinho });
      y += 9; texto(`${t.porModulo.length} módulos · ${p.funcionalidades.length} funcionalidades`, margem, y, 8.5, false, { cor: C.texto }); y += 8;
      const metricas = [['Etapas', t.minutosEtapas], ['Módulos', t.minutosModulos], ['Recursos', t.minutosRecursos], ['Tabela de preços', t.tabela]];
      metricas.forEach(([rotulo, minutos], i) => { const x = margem + i * 66; cor('setFillColor', C.fundo); doc.roundedRect(x, y, 62, 17, 3, 3, 'F'); texto(rotulo, x + 4, y + 6, 7, false, { cor: C.texto }); texto(H.formatar(minutos, { vazio: '0h' }), x + 4, y + 13, 12, true, { cor: C.marinho }); }); y += 25;
      tabela('Módulos contemplados', ['Módulo', 'Duração', '% do total', 'Origem'], t.porModulo.map((m) => [m.nome, H.formatar(m.minutos, { vazio: '0h' }), `${pct(m.minutos, t.total)}%`, ({ proprio: 'Fixado para a faixa', calculado: 'Calculado de até 5 usuários', pai: 'Faixa-pai (até 5 usuários)' })[m.origem] || '']), [112, 43, 43, 57]);
      tabela('Etapas de implantação', ['Etapa', 'Duração'], t.etapas.map((e) => [e.texto, H.formatar(e.minutos, { vazio: '0h' })]), [210, 45]);
      tabela('Recursos gerais', ['Recurso', 'Duração'], t.recursos.map((e) => [e.texto, H.formatar(e.minutos, { vazio: '0h' })]), [210, 45]);
      tabela('Funcionalidades incluídas', ['Módulo', 'Funcionalidade', 'Nível', 'Prioridade'], p.funcionalidades.map((f) => [f.modulo || 'Geral', f.funcionalidade, f.nivel, f.complexidade]), [50, 140, 30, 35]);
    }

    const paginas = doc.getNumberOfPages();
    for (let i = 1; i <= paginas; i += 1) {
      doc.setPage(i); cor('setDrawColor', C.linha); doc.setLineWidth(.25); doc.line(margem, 202, largura - margem, 202);
      texto('Faktory Flow · Guia do Consultor', margem, 207, 7, false, { cor: C.texto });
      texto(`Página ${i} de ${paginas}`, largura - margem, 207, 7, false, { align: 'right', cor: C.texto });
    }
    doc.save(`Pacotes-e-Horas-${slug(dados.cenarioTexto)}-${dataArquivo()}.pdf`);
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
    for (const { pacote: p, totais: t, disponivel } of dados.pacotes) {
      resumo.push([p.nome, p.nivel, dados.cenario.fluxo, dados.faixa, disponivel ? t.minutosEtapas : '', disponivel ? t.minutosModulos : '', disponivel ? t.minutosRecursos : '', disponivel ? t.total : '', disponivel ? H.formatar(t.total, { vazio: '0h' }) : 'Indisponível', disponivel ? t.tabela / 60 : '', p.funcionalidades.length]);
      if (disponivel) {
        for (const m of t.porModulo) modulos.push([p.nome, m.nome, m.minutos, H.formatar(m.minutos, { vazio: '0h' }), pct(m.minutos, t.total), ({ proprio: 'Fixado para a faixa', calculado: 'Calculado de até 5 usuários', pai: 'Faixa-pai (até 5 usuários)' })[m.origem] || '']);
        for (const e of [...t.etapas.map((x) => ({ ...x, tipo: 'Etapa de implantação' })), ...t.recursos.map((x) => ({ ...x, tipo: 'Recurso geral' }))]) {
          etapas.push([p.nome, e.tipo, e.texto, e.detalhe || '', e.minutos, H.formatar(e.minutos, { vazio: '0h' })]);
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

  for (const botao of botoes) botao.addEventListener('click', async () => {
    const formato = botao.dataset.exportarPacotes;
    const rotulo = botao.querySelector('span');
    const original = rotulo?.textContent;
    botao.disabled = true;
    if (rotulo) rotulo.textContent = 'Gerando…';
    try {
      const dados = obterDados();
      if (formato === 'pdf') await exportarPdf(dados); else exportarExcel(dados);
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
