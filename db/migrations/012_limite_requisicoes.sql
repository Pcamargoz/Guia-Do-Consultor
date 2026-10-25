-- Limite de requisições por IP (rate limit) da API. Contagem por janela fixa: cada linha é (regra + IP, início da
-- janela) e o número de requisições nela. Fica no banco porque no Vercel cada requisição pode cair numa instância
-- diferente da função, então contar na memória não funcionaria. Linhas com mais de 2 horas são apagadas pela própria API.
CREATE TABLE IF NOT EXISTS limite_requisicoes (
  chave    text        NOT NULL,
  janela   timestamptz NOT NULL,
  contagem integer     NOT NULL DEFAULT 0,
  PRIMARY KEY (chave, janela)
);
CREATE INDEX IF NOT EXISTS limite_requisicoes_janela ON limite_requisicoes (janela);
