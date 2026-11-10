# Descobertas — documentação D (prints que faltavam, pendências e guia de Relatórios)

## 2026-11-06 · documentacao-d · staging v1.23.2, empresa de teste METALURGICA TEST

- Descoberta: 27 prints novos com marcadores v2, 1 guia novo (Relatórios, 3 capítulos, 13 passos) e pendências atualizadas em
  8 guias. Todos os guias seguem `status: "rascunho"`. Nenhum commit.
- Evidência: gravador local em 127.0.0.1:3998, só leitura. Cada print foi olhado antes e depois do borrão. Prévias com moldura,
  número e zoom desenhadas por ffmpeg e conferidas uma a uma (fora do repositório). `node` validou os 19 `guia.json`: toda
  `imagem` existe, moldura dentro da imagem e do zoom, no máximo 5 marcadores por passo, 0 erros.
- Impacto: primeiros-passos, fundacao, recebimento, projetos, expedicao, fluxo-completo e relatorios ficam sem passo sem imagem.
- Próximo passo: decisões e autorizações listadas abaixo. Revisão humana antes de qualquer aprovação.

### O que mudou por guia

| Guia | Prints novos | Passos ilustrados | Passos novos |
|---|---|---|---|
| primeiros-passos | 1 | Conheça as preferências do usuário | — |
| fundacao | 7 | os 6 pedidos | Veja quem recebe os e-mails do contato |
| recebimento | 2 | Ligue a conferência física; Conheça a conferência | — |
| projetos | 2 | Garanta o local de estoque da obra | Conheça o painel Novo Projeto |
| expedicao | 1 | Ligue só os checkpoints que a empresa usa | — |
| fluxo-completo | 1 | Escolha quem gera os títulos | — |
| cem | 2 | Complete os Padrões de Integração | Preencha a aba Pedido de Venda |
| relatorios | 11 | 13 passos, 2 deles reaproveitam imagem | guia novo |
| alumina | 0 | — | pendência registrada; nenhum passo de uso |

### Pendências resolvidas pela tela

- Recebimento: a fila é Recebimento › Conferências (título Fila de Conferências). `/recebimento/aprovacoes` dá Página não encontrada.
- Fundação: chave Ativo do novo participante vem ligada; NCM em Fiscal › Configurações › NCM e também em Configurações de
  Faturamento e Recebimento; rótulo do CFOP é Gera Financeiro; Duplicata Mercantil aparece com Tipo Boleto em Meios de Pagamento.
- CEM: Níveis de Faturamento fica em Vendas › Configurações.
- Primeiros passos: Configurar relatórios (Painel de Controle) abre a página Relatórios.
- Fluxo completo e Projetos: Painel Financeiro de Projetos aparece nos menus Projetos e Financeiro (mesma tela, `/projetos/painel`).
  Isso corrige a nota de 05/11, que pedia para atualizar a trilha e o checklist.

### Divergências para a fila de correção (não mexi em `conhecimento/fila-de-correcao.md`)

| Fonte | O que diz | O que a tela mostra (06/11/2026, v1.23.2) |
|---|---|---|
| manual-05-recebimento#004 e trilha do estagiário | fila no menu Aprovações | Conferências; endereço Aprovações não existe no Recebimento |
| trilha do estagiário (cadastros) | chave Ativo pode vir desligada | vem ligada |
| trilha e regra-crm-formulario-do-lead-secoes-e-campos | seção Informações CRM | só Dados CRM, no novo e no já salvo |
| trilha (cadastros) | e-mails de Notas Fiscais, Boletos, Vendas e avisos | também E-mail Compras e Recebe avisos de Serviços |
| checklist de implantação (Fundação) | Mais… › Importar … via Excel | Importar Dados (bate com manual-01-cadastros-base#009) |
| roteiro-geral-01#007 | Configurações › Segurança › Perfis de Acesso | grupo global Segurança › Perfis de Acesso |
| roteiro-expedicao-01#023 | Abra Configurar | Configurações › Parâmetros |
| roteiro-geral-02#004 | Relatórios do módulo e Ver todos os relatórios | grupo lista os relatórios direto; lista completa em Painel de Controle › Configurar relatórios |
| roteiro-geral-02#008 | Ações: Executar, Editar, Ajustar com Alumina, Excluir | em Padrão do sistema: Executar, Duplicar como base, Editar, Ajustar com Alumina |
| checklist CEM (não usar NCM 99999999) | selo só com padrão certo | selo Todos completos aparece com tipos em 99999999 |

Fora dos módulos pedidos, sem alterar o guia: a Carteira de Pedidos mostra os recortes A faturar, A expedir e Outros / Manual
(Vendas tem pendência sobre as faixas). O subtítulo da tela ainda cita em carga, expedido, entregue e re-expedição.

### Ficou sem print, e por quê

- Precisa de autorização do responsável (grava dados ou exige ligar parâmetro):
  - Recebimento: tela de conferência de uma nota e fila com notas (exige Usar Conferência Física ligada).
  - CEM: pedido gerado pela importação, Quantidade maior, Cor ou medida trocada, Desfazer (exigem importar e cancelar).
  - Relatórios: construtor, compartilhamento e Minhas Exportações com arquivo (exigem criar ou exportar).
- Fora do limite de só leitura (botão de importação não clicado): janela Importar CEM Mobi; Importar XML do Recebimento.
- Segredo na tela: Configurar integração mostra URL da API e API Key. Li só o texto dos rótulos e não capturei. A imagem antiga
  `public/manuais/cem/img/01-configurar-integracao.webp` já traz os campos borrados (conferido).
- Dados pessoais: Segurança › Usuários mostra nomes e e-mails. Abri, não usei; o passo usa Perfis de Acesso.
- Sem tela para mostrar: CEM › Diagnostique o bloqueio pela origem (texto de diagnóstico, sem tela única).
- Tabelas Dinâmicas: não reaberta (ver incidente).
- Alumina: sem painel funcional. Nada de uso foi escrito.

### Incidente de sessão

Depois de abrir `/cubos`, o Flow passou a mostrar "Não foi possível confirmar seu acesso", com Tentar novamente e Entrar novamente,
inclusive em `/dashboard`. Cliquei uma vez em Tentar novamente, sem efeito, e não cliquei em Entrar novamente. Parei de navegar.
Minutos depois a sessão voltou sem ação minha. A causa não foi apurada: pode ter sido a tela `/cubos` ou outro uso do mesmo login.
Não reabri `/cubos` para não derrubar a sessão de novo.

### Ações na tela que vale saber

Nada foi salvo, exportado nem importado. Abri e saí sem salvar: Novo Participante (com Adicionar Contato), painel de um participante
salvo, Novo Projeto, Editar CFOP e o assistente de Certificados (sem escolher empresa). Abri os menus Mais… e ⋯ sem clicar nas opções.
Escolhi a Empresa em `/relatorios/186`, o que executou o relatório: o cartão Execuções no mês pode ter subido.

### Base

Não precisa regerar nada por minha causa, mas `lib/conteudo/base` não foi tocada: se o Guia lê resumos gerados dali, o coordenador decide.
