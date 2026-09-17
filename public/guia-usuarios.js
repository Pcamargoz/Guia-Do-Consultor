/* Faktory Flow — Painel de usuários (somente administradores).
   Lista, cria, edita perfil/nome/status, redefine senha e exclui usuários via /api/usuarios. */
(() => {
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const dataHora = (iso) => iso ? new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Nunca';
  const icone = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const I = {
    fechar: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    mais: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    editar: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    lixo: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    cadeado: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  };

  let estado = { usuarios: [], papeis: [], eu: null, editando: null };

  const dialogo = document.createElement('dialog');
  dialogo.className = 'us-dialogo';
  dialogo.setAttribute('aria-labelledby', 'us-titulo');
  document.body.appendChild(dialogo);

  async function api(method, url, body) {
    const res = await fetch(`/api/${url}`, {
      method, cache: 'no-store',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const dados = await res.json().catch(() => ({}));
    if (res.status === 401) return window.ffIrParaLogin();
    if (!res.ok) throw new Error(dados.erro || `Falha na comunicação (${res.status}).`);
    return dados;
  }

  const nomePapel = (id) => estado.papeis.find((p) => p.id === id)?.nome || id;
  const descricaoPapel = {
    admin: 'Acesso total, incluindo gerenciar usuários.',
    consultor: 'Vê, exporta o PDF e edita módulos, etapas e status.',
    estagiario: 'Somente visualiza o guia e a apostila e exporta o PDF.',
  };

  function formulario(u) {
    const novo = !u;
    return `
      <form class="us-form" novalidate>
        <h3>${novo ? 'Novo usuário' : `Editar ${esc(u.nome || u.login)}`}</h3>
        <div class="us-form-grid">
          <label class="ed-campo"><span>Login ${novo ? '<abbr title="obrigatório">*</abbr>' : ''}</span>
            <input class="ed-input" name="login" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="60" ${novo ? 'required' : `value="${esc(u.login)}" disabled`}>
            ${novo ? '<small class="us-ajuda">3 a 60 caracteres, sem espaços. Não pode ser alterado depois.</small>' : ''}
          </label>
          <label class="ed-campo"><span>Nome</span>
            <input class="ed-input" name="nome" maxlength="80" autocomplete="off" value="${esc(u?.nome || '')}">
          </label>
          <label class="ed-campo"><span>Perfil de acesso</span>
            <select class="ed-input" name="papel">
              ${estado.papeis.map((p) => `<option value="${p.id}"${(u?.papel || 'estagiario') === p.id ? ' selected' : ''}>${esc(p.nome)}</option>`).join('')}
            </select>
            <small class="us-ajuda" data-descricao-papel>${esc(descricaoPapel[u?.papel || 'estagiario'])}</small>
          </label>
          <label class="ed-campo"><span>${novo ? 'Senha <abbr title="obrigatório">*</abbr>' : 'Nova senha'}</span>
            <input class="ed-input" name="senha" type="password" autocomplete="new-password" maxlength="200" ${novo ? 'required' : 'placeholder="Deixe em branco para manter"'}>
            <small class="us-ajuda">Mínimo de 8 caracteres.${novo ? '' : ' Ao trocar, a pessoa precisa entrar de novo.'}</small>
          </label>
          ${novo ? '' : `<label class="ed-check us-ativo"><input type="checkbox" name="ativo"${u.ativo ? ' checked' : ''}><span>Usuário ativo (pode fazer login)</span></label>`}
        </div>
        <p class="us-erro" role="alert" hidden></p>
        <div class="us-form-acoes">
          <button type="button" class="ed-btn" data-cancelar>Cancelar</button>
          <button type="submit" class="ed-btn ed-btn--primario">${icone('<polyline points="20 6 9 17 4 12"/>')}${novo ? 'Criar usuário' : 'Salvar'}</button>
        </div>
      </form>`;
  }

  function linha(u) {
    const eu = String(u.id) === String(estado.eu?.id);
    const bloqueadoEdicao = u.gerenciadoPorEnv;
    return `
      <tr class="${u.ativo ? '' : 'us-inativo'}">
        <td data-rotulo="Usuário">
          <strong>${esc(u.nome || u.login)}</strong>${eu ? ' <span class="us-voce">você</span>' : ''}
          <span class="us-login">${esc(u.login)}</span>
        </td>
        <td data-rotulo="Perfil"><span class="ab-papel ab-papel--${esc(u.papel)}">${esc(nomePapel(u.papel))}</span></td>
        <td data-rotulo="Status">${u.ativo ? '<span class="us-status us-status--ativo">Ativo</span>' : '<span class="us-status">Inativo</span>'}</td>
        <td data-rotulo="Último login">${esc(dataHora(u.ultimoLoginEm))}</td>
        <td class="us-acoes-celula">
          ${bloqueadoEdicao
            ? `<span class="us-env" title="Definido nas variáveis de ambiente do Vercel">${icone(I.cadeado)}Vercel</span>`
            : `<button type="button" class="ed-icone-btn" data-editar="${esc(u.id)}" aria-label="Editar ${esc(u.login)}" title="Editar">${icone(I.editar)}</button>
               ${eu ? '' : `<button type="button" class="ed-icone-btn ed-icone-btn--perigo" data-excluir="${esc(u.id)}" aria-label="Excluir ${esc(u.login)}" title="Excluir">${icone(I.lixo)}</button>`}`}
        </td>
      </tr>`;
  }

  function render({ mensagem } = {}) {
    const u = estado.editando === 'novo' ? null : estado.usuarios.find((x) => x.id === estado.editando);
    dialogo.innerHTML = `
      <div class="us-cabecalho">
        <div>
          <h2 id="us-titulo">Usuários e perfis de acesso</h2>
          <p>${estado.usuarios.length} usuário(s) cadastrado(s)</p>
        </div>
        <button type="button" class="modal-close" data-fechar aria-label="Fechar">${icone(I.fechar)}</button>
      </div>
      <div class="us-corpo">
        ${mensagem ? `<p class="us-mensagem" role="status">${esc(mensagem)}</p>` : ''}
        ${estado.editando ? formulario(u) : `
          <div class="us-barra">
            <ul class="us-legenda">
              ${estado.papeis.map((p) => `<li><span class="ab-papel ab-papel--${esc(p.id)}">${esc(p.nome)}</span>${esc(descricaoPapel[p.id] || '')}</li>`).join('')}
            </ul>
            <button type="button" class="ed-btn ed-btn--primario" data-novo>${icone(I.mais)}Novo usuário</button>
          </div>
          <div class="us-tabela-envoltorio">
            <table class="us-tabela">
              <thead><tr><th>Usuário</th><th>Perfil</th><th>Status</th><th>Último login</th><th><span class="ed-sr">Ações</span></th></tr></thead>
              <tbody>${estado.usuarios.map(linha).join('')}</tbody>
            </table>
          </div>`}
      </div>`;
    dialogo.querySelector('.us-form [name="login"]:not([disabled]), .us-form [name="nome"]')?.focus();
  }

  async function carregar(mensagem) {
    const dados = await api('GET', 'usuarios');
    estado.usuarios = dados.usuarios;
    estado.papeis = dados.papeis;
    render({ mensagem });
  }

  dialogo.addEventListener('click', async (e) => {
    if (e.target === dialogo || e.target.closest('[data-fechar]')) { dialogo.close(); return; }
    if (e.target.closest('[data-novo]')) { estado.editando = 'novo'; render(); return; }
    if (e.target.closest('[data-cancelar]')) { estado.editando = null; render(); return; }
    const editar = e.target.closest('[data-editar]');
    if (editar) { estado.editando = editar.dataset.editar; render(); return; }
    const excluir = e.target.closest('[data-excluir]');
    if (excluir) {
      const alvo = estado.usuarios.find((x) => x.id === excluir.dataset.excluir);
      const celula = excluir.closest('td');
      celula.innerHTML = `<span class="us-confirma">Excluir?</span>
        <button type="button" class="ed-btn ed-btn--perigo-forte" data-confirmar-exclusao="${esc(alvo.id)}">Sim</button>
        <button type="button" class="ed-btn" data-cancelar>Não</button>`;
      celula.querySelector('[data-cancelar]').focus();
      return;
    }
    const confirmar = e.target.closest('[data-confirmar-exclusao]');
    if (confirmar) {
      confirmar.disabled = true;
      try {
        await api('DELETE', `usuarios?id=${encodeURIComponent(confirmar.dataset.confirmarExclusao)}`);
        await carregar('Usuário excluído.');
      } catch (err) { render({ mensagem: err.message }); }
    }
  });

  dialogo.addEventListener('change', (e) => {
    if (e.target.name === 'papel') {
      const ajuda = dialogo.querySelector('[data-descricao-papel]');
      if (ajuda) ajuda.textContent = descricaoPapel[e.target.value] || '';
    }
  });

  dialogo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const erro = form.querySelector('.us-erro');
    const botao = form.querySelector('[type="submit"]');
    const novo = estado.editando === 'novo';
    const f = form.elements;
    const corpo = { nome: f.nome.value.trim(), papel: f.papel.value };
    if (novo) { corpo.login = f.login.value.trim(); corpo.senha = f.senha.value; }
    else {
      if (f.senha.value) corpo.senha = f.senha.value;
      corpo.ativo = f.ativo.checked;
    }
    if (novo && !corpo.login) { erro.textContent = 'Informe o login.'; erro.hidden = false; f.login.focus(); return; }
    if ((novo || corpo.senha) && (corpo.senha || '').length < 8) { erro.textContent = 'A senha precisa ter pelo menos 8 caracteres.'; erro.hidden = false; f.senha.focus(); return; }

    botao.disabled = true;
    try {
      if (novo) await api('POST', 'usuarios', corpo);
      else await api('PATCH', `usuarios?id=${encodeURIComponent(estado.editando)}`, corpo);
      estado.editando = null;
      await carregar(novo ? `Usuário “${corpo.login}” criado.` : 'Alterações salvas.');
    } catch (err) {
      erro.textContent = err.message;
      erro.hidden = false;
      botao.disabled = false;
    }
  });

  document.addEventListener('ff:abrir-usuarios', async () => {
    estado.eu = await window.ffSessao;
    estado.editando = null;
    dialogo.innerHTML = '<p class="us-carregando">Carregando usuários…</p>';
    dialogo.showModal();
    try { await carregar(); } catch (err) { dialogo.innerHTML = `<p class="us-carregando">${esc(err.message)}</p>`; }
  });
})();
