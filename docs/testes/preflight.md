# Pré-voo (1 minuto)

Rode antes de disparar qualquer agente. Critério de aceite: **todos os itens verdes**.

## 1. Sessão

Na aba `seed`, via `javascript_tool`:

```js
(() => { const p = k => { try { return JSON.parse(k || '{}').state || {}; } catch { return {}; } };
  const s = p(sessionStorage.getItem('auth-storage'));
  return { url: location.href, logado: s.isAuthenticated, usuario: s.user && s.user.email, empresa: s.tenant && (s.tenant.nome || s.tenant.name),
           versao: (document.body.innerText.match(/v\d+\.\d+\.\d+/) || [])[0] }; })()
```

- `logado: true`, empresa **METALURGICA TEST**, usuário `pedro.santos`. Anote a `versao`: ela muda com deploys e derruba a sessão.
- Só existe **uma** aba do Faktory aberta no navegador (`tabs_context`).

## 2. Configuração mínima do ambiente (estado de 19/10/2026)

Confirme que ainda existe; se não, o brief diz o que fazer.

| Item | Onde | Estado conhecido |
|---|---|---|
| Unidade de medida **PÇ** | Cadastros > Unidade de Medida | criada |
| Almoxarifado central ativo | Estoque > Locais (`ALM-TESTE`) | criado |
| Conta bancária de teste | Financeiro > Configurações > Contas Bancárias (`TESTE FLUXO CONSULTOR`) | criada, padrão de boleto; **não** é emissora |
| Conferente | Serviços > Configurações > Conferentes | `pedro.santos` ↔ participante 00001; técnico de teste = participante 108 |
| Conferência física | Recebimento > Configurações > Parâmetros | ligada |
| Geração automática de vistoria | Serviços > Configurações > Parâmetros | 1 dia |
| Template de checklist de instalação "TESTE FLUXO CONSULTOR" | Serviços > Configurações > Instalação | ativo (entra em toda instalação nova) |
| Faixa de alçada de desconto | Vendas > Configurações > Alçadas de Desconto | inativa |

## 3. Registros de teste que já existem

Cliente 106 e 109, fornecedor 107, técnico 108, PV-000033, OP-000109, MED-000012 e 000013, INS-000003, VIST-000001, AT-000002, NF-019 (finalizada), carga 20261000001, SC-000289, COT-000013, PC-000009, NR-000013, OPO-000011/12/15. Detalhes e ordem de limpeza em [../pendencias-checklists.md](../pendencias-checklists.md).

## 4. Fila e brief

`npm run checklists:lacunas`, escolha o brief da tabela do [README](README.md) e dispare **um** agente.
