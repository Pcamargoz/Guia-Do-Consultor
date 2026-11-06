# Faktory Flow — Plataforma de aprendizagem (Guia do Consultor)

Resumo do que está em `refatoracao-guia-do-consultor/00-requisitos.md` e `07-design-e-motion.md`, para orientar decisões de interface.

## Register

product (com momentos de marca na Página Inicial e no Guia Inicial)

## Users

- Colaboradores novos, estagiários e iniciantes no ERP: aprendem aos poucos, no horário de trabalho, em notebook ou celular.
- Consultores: precisam de profundidade para implantar, configurar, validar e orientar o cliente.

## Product purpose

Plataforma de treinamento, capacitação, documentação e consulta do Faktory Flow. A Página Inicial é descoberta e navegação, não biblioteca. O Guia Inicial ensina a conhecer e usar. O Guia do Consultor ensina a implantar e validar.

Quem entra precisa entender rápido: por onde começar, qual módulo está estudando, o que está disponível, quanto avançou e qual o próximo passo.

## Brand personality

Claro, confiável, industrial com capricho. Branco, azul e verde, com o lima da marca só em destaques. Cada módulo mantém a própria cor.

## Anti-references

- Template de painel administrativo ou grade genérica de cartões iguais.
- Fundo azul-escuro pesado na área de módulos e listas enormes no hover.
- Indicador falso, número decorativo ou funcionalidade que não existe.

## Accessibility

WCAG AA, navegação completa por teclado com foco visível, alternativa ao hover no toque, `prefers-reduced-motion` respeitado.

## Constraints

HTML, CSS e JS sem build, com CSP (`script-src 'self'`). Decisão D2 do doc 12: sem React, Tailwind ou biblioteca de animação; os padrões delas servem só de referência.
