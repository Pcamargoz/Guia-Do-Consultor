# 04 — Visibilidade e permissões (R-A80 a R-A83)

## Modelo

Tabela `visibilidade`:

| Coluna | Tipo | Significado |
|---|---|---|
| `chave` | text PK | `area:<id>`, `tipo:<id>` ou `modulo:<id>` |
| `visivel` | boolean | Liga/desliga para todos os perfis não-admin |
| `perfis` | text[] | Perfis que enxergam quando `visivel = true` (`estagiario`, `consultor`) |
| `atualizado_por` | bigint → usuarios | Quem mudou |
| `atualizado_em` | timestamptz | Quando |

Tabela `visibilidade_historico` (chave, antes, depois, usuário, data) para auditoria.

**Regra efetiva:** um item é visível ao usuário se `papel = admin` **ou** (`visivel` **e** `papel ∈ perfis`).
Um material só é visível se a **área** da jornada, o **módulo** e o **tipo** forem visíveis.
Administrador sempre vê tudo (com selo "oculto para os outros perfis") para poder revisar.

## Chaves e valores iniciais

| Chave | Controla | Inicial |
|---|---|---|
| `area:guia-inicial` | Aba Guia Inicial | visível · estagiário, consultor |
| `area:guia-consultor` | Aba Guia do Consultor | visível · estagiário, consultor *(admin pode restringir a consultor)* |
| `area:pacotes` | Pacotes e Horas | visível · estagiário, consultor (como hoje) |
| `area:checklists` | Aba Checklists | visível · todos |
| `area:videos` | Aba Vídeos de fluxo | visível · todos |
| `area:apostila` | Apostila antiga (HTML + PDF + Modo Estudo) | **oculta (standby)** |
| `area:acervo` | Guia antigo preservado | visível · consultor |
| `tipo:video` · `tipo:manual` · `tipo:checklist` · `tipo:fluxo` | Materiais por tipo em toda a plataforma | visíveis · todos |
| `modulo:<id>` (17 módulos) | Um módulo inteiro nas duas jornadas | visível · todos |

Os valores iniciais preservam o comportamento de hoje, exceto a apostila (standby, pedido R-A81).

## Onde a regra é aplicada

| Camada | Como |
|---|---|
| **Middleware** (`middleware.js`) | Para caminhos de conteúdo — `/apostila`, `/downloads/*`, `/videos/*`, `/checklists/*`, `/manuais/*` — descobre o material pelo caminho (mapa gerado da base), confere a visibilidade do perfil do token e responde **404** quando oculto (não revela que existe). Cache em memória de 30 s; se o banco falhar, usa os valores iniciais (apostila continua oculta). Requer `export const config = { runtime: 'nodejs' }` para usar `pg` no Routing Middleware do Vercel. |
| **API** | `/api/conteudo` filtra; `/api/pacotes` responde 403 se `area:pacotes` oculta; `/api/checklists-download` confere `tipo:checklist`; `/api/estudo` e `/api/duvidas` da apostila conferem `area:apostila`. |
| **Interface** | Esconde abas, cards e materiais ocultos; admin vê com selo. Nunca é a única barreira. |

## Tela de administração

Nova seção **Visibilidade** no Painel do administrador:
- grupos: Áreas, Tipos de material, Módulos;
- cada linha: interruptor visível/oculto + seletores de perfil (Estagiário, Consultor) + "alterado por X em DD/MM";
- apostila destacada como **"Em standby"** com botão **Reativar** (sem apagar grifos, notas, dúvidas ou PDF);
- confirmação antes de ocultar uma área inteira; feedback imediato; histórico consultável.

## Testes obrigatórios (QA)

`scripts/testar-visibilidade.mjs` (no padrão de `testar-seguranca.mjs`):
1. Estagiário com `area:apostila` oculta → `GET /apostila` e `GET /downloads/Apostila…pdf` = 404.
2. Admin → 200 nos mesmos caminhos.
3. Ocultar `modulo:estoque` → `/videos/consultor-04-estoque.mp4` = 404 e `/api/conteudo` sem Estoque para não-admin.
4. Reativar → volta a 200, sem perda de dados (`estudo_*`, `duvidas` intactos).
5. `PUT /api/visibilidade` por consultor = 403; por admin = 200 e grava histórico.
6. Valores persistem após reiniciar o contêiner.
