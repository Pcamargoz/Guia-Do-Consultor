# Descobertas — QA/DevOps

## 2026-11-04 · qa-devops · Ambiente
- Descoberta: Node 22, Docker, psql, ffmpeg, Chromium/Playwright e uv disponíveis na nuvem; sem librosa/whisper/moviepy. `staging`, `dev` e `flow.faktory.com.br` respondem HTTP 200.
- Evidência: `curl -w %{http_code}` e `which` em 04/11/2026.
- Impacto: dá para testar e subir o Docker na nuvem; o login no ERP não (regra do Harness).
- Próximo passo: testes de visibilidade (../04-visibilidade-e-permissoes.md#testes-obrigatórios-qa).
