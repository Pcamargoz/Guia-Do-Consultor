# Produção de mídia: situação e validação na tela (novembro de 2026)

Ambiente de validação: staging, empresa de teste METALURGICA TEST, Faktory Flow v1.23.2. Só leitura.

## Intros do Guia Inicial

| Módulo | Render | Checagem automática | Publicado em `public/videos/` | Aprovação humana |
|---|---|---|---|---|
| Vendas | `videos/out/intro-vendas-v2.mp4` (47 s) | aprovado | sim, sem commit | aguardando |
| CRM | `videos/out/intro-crm.mp4` (50 s) | aprovado | sim, sem commit | aguardando |
| Estoque | `videos/out/intro-estoque.mp4` (45 s) | aprovado | não | aguardando |
| Financeiro | `videos/out/intro-financeiro.mp4` (47,5 s) | aprovado | não | aguardando |

Pontos da revisão dos quadros, para decisão do responsável:
- CRM: nas cenas de formulário, a área borrada toma quase toda a tela.
- Estoque: a chamada "Almoxarifados" aparece cortada numa transição.
- Estoque e Financeiro: "Configurações do Estoque" e "Budget vs Realizado" aparecem entre aspas.

O índice da base ainda marca o intro de CRM e Estoque como em preparação: só muda depois da aprovação.

## Gravações novas (06/11/2026)

`videos/scripts/gravar-video.mjs`: vídeo real 1920×1080 nativo, 30 fps, em `midia/brutos/<modulo>/`. Usa o perfil `.perfil-gravacao`, recusa sobrescrever bruto e não preenche campos. Sem cursor na imagem: o clique é sintético no `IntroVideo`.

- Tours só de leitura, cena `c02`: primeiros-passos, fundacao, compras, recebimento, producao, servicos, projetos, expedicao, fiscal, tarefas. Cada pasta tem `roteiro-telas.md`, `manifesto.md` e `prints/`. `scripts/verificar-midia-brutos.mjs`: OK.
- A cena `c01` dessas pastas saiu espremida (escala 1,2 do Chrome); apagar depois que a edição confirmar que não a usa.
- `cem`: só 12 s (abertura da importação). A lista de orçamentos não carregou. Insuficiente para um intro completo.
- Sem gravação: faturamento (já tem vídeo no Guia Inicial), relatorios, alumina e fluxo-completo (montar a partir dos outros).
- O Flow aceita um login por usuário: logar em outro lugar derruba a sessão do gravador.
- Produção: a lista de Ordens de produção mostra nomes de pessoas na coluna Projeto; borrar sempre.
- Tarefas: `/tarefas/avulsas` caiu em `/tarefas/46` na gravação. Serviços: `/servicos` abre `/upgrade/ai` (divergência já registrada no doc 13), por isso o tour começa em Cockpit de Campo.

## Primeiros passos: pendências conferidas na tela

| Pendência do guia | Resultado (06/11/2026, staging, v1.23.2) |
|---|---|
| Menu do usuário | Confirmado na tela: Conta do Usuário, Configurar E-mail (SMTP), Modo Claro, Densidade: Confortável, Personalizar avatar, Sair do Sistema. O item de tema mostra o modo oposto ao atual (Modo Claro com a tela escura). Print ainda não tirado: fazer no gravador, com o nome do usuário borrado. |
