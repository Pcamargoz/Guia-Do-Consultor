-- Processo de Líderes (19/11/2026): quadros Kanban por líder (consultor) com seus estagiários.
-- Nenhum quadro inicial: os quadros são criados pelo administrador na tela. Os integrantes vêm da tabela usuarios.
-- Regras de acesso em lib/lideres-regras.js (checadas no servidor, em toda chamada da API /api/lideres).
-- Só cria tabelas, índices e a chave de visibilidade; reexecutar é seguro.

CREATE TABLE IF NOT EXISTS lideres_quadros (
  id            bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome          text        NOT NULL CHECK (char_length(nome) BETWEEN 2 AND 80),
  descricao     text        NOT NULL DEFAULT '' CHECK (char_length(descricao) <= 600),
  lider_id      bigint      NOT NULL REFERENCES usuarios (id) ON DELETE RESTRICT,
  cor           text        NOT NULL DEFAULT '#D5DD26' CHECK (cor ~ '^#[0-9A-Fa-f]{6}$'),
  icone         text        NOT NULL DEFAULT 'alvo' CHECK (icone ~ '^[a-z-]{2,30}$'),
  status        text        NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'arquivado')),
  -- incrementado a cada mudança no quadro ou nas tarefas: o polling só recarrega quando muda
  versao        bigint      NOT NULL DEFAULT 1,
  criado_por    bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  criado_em     timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lideres_quadros_lider ON lideres_quadros (lider_id);

-- Estagiários do quadro (o líder fica em lideres_quadros.lider_id).
CREATE TABLE IF NOT EXISTS lideres_integrantes (
  quadro_id     bigint      NOT NULL REFERENCES lideres_quadros (id) ON DELETE CASCADE,
  usuario_id    bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  adicionado_em timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (quadro_id, usuario_id)
);
CREATE INDEX IF NOT EXISTS lideres_integrantes_usuario ON lideres_integrantes (usuario_id);

CREATE TABLE IF NOT EXISTS lideres_tarefas (
  id              bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quadro_id       bigint      NOT NULL REFERENCES lideres_quadros (id) ON DELETE CASCADE,
  titulo          text        NOT NULL CHECK (char_length(titulo) BETWEEN 2 AND 140),
  descricao       text        NOT NULL DEFAULT '' CHECK (char_length(descricao) <= 4000),
  responsavel_id  bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  prioridade      text        NOT NULL DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta', 'urgente')),
  status          text        NOT NULL DEFAULT 'a_fazer' CHECK (status IN ('a_fazer', 'em_andamento', 'em_revisao', 'concluido')),
  ordem           integer     NOT NULL DEFAULT 0,
  prazo           date,
  bloqueada       boolean     NOT NULL DEFAULT false,
  motivo_bloqueio text        NOT NULL DEFAULT '' CHECK (char_length(motivo_bloqueio) <= 300),
  criado_por      bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  criado_em       timestamptz NOT NULL DEFAULT now(),
  atualizado_em   timestamptz NOT NULL DEFAULT now(),
  concluido_em    timestamptz
);
CREATE INDEX IF NOT EXISTS lideres_tarefas_quadro ON lideres_tarefas (quadro_id, status, ordem);
CREATE INDEX IF NOT EXISTS lideres_tarefas_responsavel ON lideres_tarefas (responsavel_id) WHERE status <> 'concluido';

CREATE TABLE IF NOT EXISTS lideres_checklist (
  id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tarefa_id  bigint      NOT NULL REFERENCES lideres_tarefas (id) ON DELETE CASCADE,
  texto      text        NOT NULL CHECK (char_length(texto) BETWEEN 1 AND 200),
  feito      boolean     NOT NULL DEFAULT false,
  ordem      integer     NOT NULL DEFAULT 0,
  feito_por  bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  feito_em   timestamptz,
  criado_em  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lideres_checklist_tarefa ON lideres_checklist (tarefa_id, ordem);

CREATE TABLE IF NOT EXISTS lideres_comentarios (
  id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tarefa_id  bigint      NOT NULL REFERENCES lideres_tarefas (id) ON DELETE CASCADE,
  autor_id   bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  texto      text        NOT NULL CHECK (char_length(texto) BETWEEN 1 AND 2000),
  criado_em  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lideres_comentarios_tarefa ON lideres_comentarios (tarefa_id, criado_em);

-- Notificações internas. `chave` evita repetir avisos gerados automaticamente (prazo próximo, atraso).
CREATE TABLE IF NOT EXISTS lideres_notificacoes (
  id          bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  usuario_id  bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  tipo        text        NOT NULL CHECK (tipo IN ('atribuicao', 'prazo_proximo', 'atraso', 'revisao', 'aprovada', 'ajuste', 'mencao', 'entrada', 'saida')),
  quadro_id   bigint      REFERENCES lideres_quadros (id) ON DELETE CASCADE,
  tarefa_id   bigint      REFERENCES lideres_tarefas (id) ON DELETE CASCADE,
  texto       text        NOT NULL CHECK (char_length(texto) <= 300),
  autor_id    bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  chave       text        UNIQUE,
  lida_em     timestamptz,
  criado_em   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lideres_notificacoes_usuario ON lideres_notificacoes (usuario_id, criado_em DESC);
CREATE INDEX IF NOT EXISTS lideres_notificacoes_nao_lidas ON lideres_notificacoes (usuario_id) WHERE lida_em IS NULL;

-- Histórico / auditoria: movimentações das tarefas e mudanças nos quadros. Nunca é apagado pela aplicação
-- (só some junto com o quadro, quando o administrador exclui um quadro arquivado).
CREATE TABLE IF NOT EXISTS lideres_historico (
  id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quadro_id  bigint      NOT NULL REFERENCES lideres_quadros (id) ON DELETE CASCADE,
  tarefa_id  bigint,
  autor_id   bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  acao       text        NOT NULL CHECK (acao ~ '^[a-z_]{2,40}$'),
  detalhes   jsonb       NOT NULL DEFAULT '{}'::jsonb,
  criado_em  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lideres_historico_tarefa ON lideres_historico (tarefa_id, criado_em);
CREATE INDEX IF NOT EXISTS lideres_historico_quadro ON lideres_historico (quadro_id, criado_em DESC);

-- Área no menu (chave de visibilidade), visível aos dois perfis. ON CONFLICT: nunca sobrescreve o admin.
INSERT INTO visibilidade (chave, visivel, perfis) VALUES
  ('area:lideres', true, ARRAY['estagiario', 'consultor']::text[])
ON CONFLICT (chave) DO NOTHING;
