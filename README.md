# Guia do Consultor — Faktory Flow

Guia do Consultor e Apostila de implantação do Faktory Flow, com login, perfis de acesso e edição colaborativa dos módulos.

- **Front-end:** HTML/CSS/JS em `public/` (sem framework)
- **API:** uma única Vercel Function (`api/index.js`) que despacha todas as rotas `/api/*` para os handlers em `lib/rotas/` — cabe no limite de funções do plano Hobby
- **Banco:** PostgreSQL no [Neon](https://neon.tech)
- **Proteção:** `middleware.js` exige login em todas as páginas, inclusive no PDF

## Perfis de acesso

| Perfil | Ver guia e apostila | Exportar PDF | Editar módulos, etapas e status | Responder dúvidas | Gerenciar usuários | Limpar dados |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Administrador** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Consultor** | ✅ | ✅ | ✅ | ✅ | — | — |
| **Estagiário** | ✅ | ✅ | — | — | — | — |

O administrador principal vem das variáveis de ambiente. Os demais usuários são criados pelo botão **Usuários**, no cabeçalho do guia.

### Limpar dados do sistema

Em **Configurações**, o administrador vê o bloco *Limpar dados do sistema*: com uma confirmação (digitar `LIMPAR`),
apaga de uma vez todas as movimentações — Modo Estudo (grifos, notas, checklists e progresso), dúvidas enviadas e
respondidas, histórico dos módulos e dos pacotes e as marcações de status (Rever/Aprovado/Reprovado).
**Não** apaga usuários nem o conteúdo dos módulos e pacotes. A ação roda em uma transação e não tem desfazer.

## Pacotes e horas de implantação

A aba **Pacotes e Horas** mostra, para cada um dos 8 pacotes (Starter → Enterprise):
- módulos contemplados;
- distribuição das horas entre etapas, módulos e recursos;
- tempo total previsto comparado à tabela de preços;
- funcionalidades incluídas;
- horas por fluxo (Premium/Rápida) e faixa de usuários.

Estrutura: **Pacote → Módulos → itens da Checklist de Validação (horas por pacote) → total do módulo → total do pacote.**

- As horas iniciais vêm da planilha `docs/Comparativo_Flow_com_Distribuicao_de_Horas_1 (2).xlsx` (aba *Distribuicao por Pacote*), na base Premium · até 5 usuários. Os demais fluxos e faixas são proporcionais à tabela de preços.
- Consultores e administradores editam a duração de cada item no modal do módulo, e das etapas e recursos no card do pacote. Os totais recalculam na hora e cada alteração fica no histórico.
- Para regenerar as horas iniciais a partir da planilha:
  1. atualize `db/dados/planilha-horas.json` e `db/dados/mapa-checklist.json`;
  2. rode `node scripts/gerar-horas.mjs` (cria uma migration nova se o banco já estiver em produção).

## Deploy no Vercel

1. **Importe o repositório** no Vercel (*Add New → Project*). As configurações de build já estão no `vercel.json`, então não altere nada.
2. **Conecte o Neon:** *Storage → Connect Database → Neon*. A integração cria a variável `DATABASE_URL` automaticamente.
3. **Crie as variáveis** em *Settings → Environment Variables*, para Production e Preview:

   | Variável | Valor |
   |---|---|
   | `SESSION_SECRET` | texto aleatório com 32+ caracteres (veja abaixo) |
   | `ADMIN_USERNAME` | seu login de administrador (ex.: `pedro`) |
   | `ADMIN_PASSWORD` | sua senha de administrador (mínimo 8 caracteres) |
   | `ADMIN_NOME` | *(opcional)* nome exibido, ex.: `Pedro Santos` |

   Para gerar o `SESSION_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
   ```
4. **Faça o deploy.** O build (`npm run vercel-build`) roda as migrations de `db/migrations`, cria as tabelas, carrega os 15 módulos iniciais e cria ou atualiza o administrador.

> Para trocar a senha do administrador, altere `ADMIN_PASSWORD` no Vercel e faça um novo deploy.
> Trocar o `SESSION_SECRET` desconecta todos os usuários.

## Rodar localmente (Docker)

```bash
cp .env.example .env        # preencha SESSION_SECRET e ADMIN_PASSWORD
docker compose -p faktory-manual up -d
```

Acesse http://localhost:8081. O ambiente sobe um PostgreSQL local, aplica as migrations e imita o Vercel (middleware + `/api` + `public/`).

## Atualizar o PDF da apostila

O botão **Exportar PDF** baixa `public/downloads/Apostila-do-Consultor-Faktory-Flow.pdf`, gerado com Chromium (Gotenberg) e paginado em A4. Depois de alterar `public/apostila.html`:

```bash
docker compose -p faktory-manual --profile pdf run --rm gerar-pdf
```

Depois, faça commit do PDF atualizado.

## Estrutura

```
api/index.js    Função única do Vercel (rewrite /api/* → api/index)
lib/rotas/      Handlers de cada rota: auth (login/logout/eu), modulos, processos, pacotes, usuarios, estudo, duvidas, manutencao...
lib/            Regras compartilhadas: sessão, senha (scrypt), banco, permissões
db/migrations/  SQL versionado (aplicado em ordem, uma única vez)
db/dados/       Dados da planilha de horas e mapa checklist ↔ funcionalidades
public/         Site: guia (index.html), apostila, login, CSS/JS, PDF
scripts/        migrar.mjs, dev-server.mjs, gerar-pdf-apostila.mjs, gerar-horas.mjs
middleware.js   Exige login antes de servir qualquer página
```

## Segurança

- Senhas com `scrypt` e sal aleatório. Nunca são armazenadas em texto.
- Sessão em cookie `HttpOnly`, `SameSite=Lax` e `Secure` (em HTTPS), assinado com HMAC-SHA256 e válido por 12 h.
- Trocar senha, perfil ou status, ou fazer logout, invalida as sessões abertas do usuário.
- Bloqueio de 15 min após 5 senhas incorretas.
- Permissões verificadas no servidor a cada requisição, com o perfil lido do banco.
- Alterações só são aceitas em JSON e da própria origem (proteção contra CSRF).
