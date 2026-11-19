-- Processo de Líderes — gestão (19/11/2026): permissões granulares dos estagiários por quadro, configuração do
-- administrador (teto de permissões e limites dos alertas) e orientações do administrador ao líder.
-- Regras em lib/lideres-regras.js (permissões) e lib/lideres-gerencial.js (indicadores e alertas). Reexecutar é seguro.

-- Permissões de cada estagiário no quadro. '{}' = permissões padrão (as mesmas de antes desta migration).
ALTER TABLE lideres_integrantes ADD COLUMN IF NOT EXISTS permissoes jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Configuração do administrador: chave 'teto' (o máximo que um líder pode conceder) e 'alertas' (limites).
CREATE TABLE IF NOT EXISTS lideres_config (
  chave          text        PRIMARY KEY CHECK (chave IN ('teto', 'alertas')),
  valor          jsonb       NOT NULL,
  atualizado_por bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  atualizado_em  timestamptz NOT NULL DEFAULT now()
);

-- Orientações do administrador ao líder de um quadro. Não somem ao serem vistas: ficam pendentes até o líder
-- marcar como tratadas (lida_em = confirmação de leitura; tratada_em = encerramento).
CREATE TABLE IF NOT EXISTS lideres_orientacoes (
  id          bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quadro_id   bigint      NOT NULL REFERENCES lideres_quadros (id) ON DELETE CASCADE,
  lider_id    bigint      NOT NULL REFERENCES usuarios (id) ON DELETE CASCADE,
  autor_id    bigint      REFERENCES usuarios (id) ON DELETE SET NULL,
  prioridade  text        NOT NULL DEFAULT 'normal' CHECK (prioridade IN ('normal', 'alta', 'critica')),
  mensagem    text        NOT NULL CHECK (char_length(mensagem) BETWEEN 3 AND 2000),
  tarefas     bigint[]    NOT NULL DEFAULT '{}',
  alerta      text        CHECK (alerta IS NULL OR char_length(alerta) <= 120),
  lida_em     timestamptz,
  tratada_em  timestamptz,
  nota        text        NOT NULL DEFAULT '' CHECK (char_length(nota) <= 1000),
  criado_em   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lideres_orientacoes_lider ON lideres_orientacoes (lider_id, tratada_em, criado_em DESC);
CREATE INDEX IF NOT EXISTS lideres_orientacoes_quadro ON lideres_orientacoes (quadro_id, criado_em DESC);

-- Novos tipos de notificação: orientação recebida, orientação tratada (avisa quem enviou) e permissões alteradas.
ALTER TABLE lideres_notificacoes DROP CONSTRAINT IF EXISTS lideres_notificacoes_tipo_check;
ALTER TABLE lideres_notificacoes ADD CONSTRAINT lideres_notificacoes_tipo_check CHECK (tipo IN (
  'atribuicao', 'prazo_proximo', 'atraso', 'revisao', 'aprovada', 'ajuste', 'mencao', 'entrada', 'saida',
  'orientacao', 'orientacao_tratada', 'permissoes'));

-- Índices para os indicadores gerenciais (entregas e criações por período).
CREATE INDEX IF NOT EXISTS lideres_tarefas_concluido ON lideres_tarefas (concluido_em) WHERE concluido_em IS NOT NULL;
CREATE INDEX IF NOT EXISTS lideres_tarefas_criado ON lideres_tarefas (criado_em);
CREATE INDEX IF NOT EXISTS lideres_historico_tarefa_recente ON lideres_historico (tarefa_id, criado_em DESC) WHERE tarefa_id IS NOT NULL;

-- Auditoria do que não pertence a um quadro (teto de permissões e limites dos alertas, alterados pelo admin).
ALTER TABLE lideres_historico ALTER COLUMN quadro_id DROP NOT NULL;
