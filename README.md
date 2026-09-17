# Guia do Consultor — Faktory Flow

Guia do Consultor e Apostila de implantação do Faktory Flow, com login, perfis de acesso e edição colaborativa dos módulos.

- **Front-end:** HTML/CSS/JS em `public/` (sem framework)
- **API:** Vercel Functions em `api/` (Node.js)
- **Banco:** PostgreSQL no [Neon](https://neon.tech)
- **Proteção:** `middleware.js` exige login em todas as páginas, inclusive no PDF

## Perfis de acesso

| Perfil | Ver guia e apostila | Exportar PDF | Editar módulos, etapas e status | Gerenciar usuários |
|---|:---:|:---:|:---:|:---:|
| **Administrador** | ✅ | ✅ | ✅ | ✅ |
| **Consultor** | ✅ | ✅ | ✅ | — |
| **Estagiário** | ✅ | ✅ | — | — |

O administrador principal vem das variáveis de ambiente. Os demais usuários são criados pelo botão **Usuários**, no cabeçalho do guia.

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
api/            Funções do Vercel: auth (login/logout/eu), modulos, usuarios
lib/            Regras compartilhadas: sessão, senha (scrypt), banco, permissões
db/migrations/  SQL versionado (aplicado em ordem, uma única vez)
public/         Site: guia (index.html), apostila, login, CSS/JS, PDF
scripts/        migrar.mjs, dev-server.mjs, gerar-pdf-apostila.mjs
middleware.js   Exige login antes de servir qualquer página
```

## Segurança

- Senhas com `scrypt` e sal aleatório. Nunca são armazenadas em texto.
- Sessão em cookie `HttpOnly`, `SameSite=Lax` e `Secure` (em HTTPS), assinado com HMAC-SHA256 e válido por 12 h.
- Trocar senha, perfil ou status, ou fazer logout, invalida as sessões abertas do usuário.
- Bloqueio de 15 min após 5 senhas incorretas.
- Permissões verificadas no servidor a cada requisição, com o perfil lido do banco.
- Alterações só são aceitas em JSON e da própria origem (proteção contra CSRF).
