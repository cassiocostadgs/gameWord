# Restrições e Decisões Técnicas

> **Como preencher:** registre aqui o que não deve ser usado neste projeto e por quê. Restrições sem justificativa são ignoradas — registre o motivo com clareza.
> **Caminho:** `02-systems/{sistema}/architecture/tech-restrictions.md`
> **Importante:** restrições que exigem mais contexto ou que divergem dos padrões organizacionais devem virar um ADR em `architecture/adr/`.

---

## Tecnologias Proibidas

> Liste tecnologias, bibliotecas, frameworks ou abordagens que não devem ser usados neste projeto, independentemente do contexto.

| O que não usar | Motivo | Alternativa recomendada |
|---|---|---|
| Backend obrigatório | O produto é cliente-only e não depende de servidor para o jogo. | Manter como SPA React estático. |
| Banco de dados | Não há persistência de usuário ou pontuação necessária. | Estado local em React. |
| APIs externas de geração de puzzles | O puzzle é definido pelo código e deve permanecer controlado. | Puzzle estático em `src/data/puzzleData.ts`. |

---

## Restrições de Ambiente

> Limitações impostas pelo ambiente do cliente, infraestrutura existente ou políticas da organização.

| Restrição | Descrição | Impacto no projeto |
|---|---|---|
| Execução no browser | O aplicativo deve rodar em navegadores modernos sem servidor adicional. | Deve ser uma aplicação cliente-only com bundling estático. |
| Dependência de infraestrutura | Não há ambiente de nuvem ou backend configurado para este protótipo. | Não usar serviços externos obrigatórios. |

---

## Restrições de Segurança e Compliance

> Requisitos obrigatórios de segurança, privacidade ou regulação que condicionam as decisões técnicas.

| Requisito | Descrição | Como é atendido |
|---|---|---|
| Privacidade | Não há coleta de dados pessoais no escopo atual. | O aplicativo permanece local e sem formulários de usuário. |
| Integridade | O conteúdo do puzzle não deve ser alterado de forma imprevisível. | Puzzle estático no código-fonte. |

---

## Decisões Tomadas e Não Reverter

> Escolhas técnicas já feitas e consolidadas que não devem ser questionadas sem um ADR. Diferente de proibições — são decisões que já custaram tempo e que reverter teria custo alto.

| Decisão | Contexto | Por que não reverter |
|---|---|---|
| Arquitetura SPA React | O jogo foi desenvolvido como aplicação de frontend única. | Reverter para backend complexo adicionaria custo indevido. |
| Dados estáticos de puzzle | As palavras cruzadas são definidas em `src/data/puzzleData.ts`. | Usar geração dinâmica exigiria validação adicional e aumento de escopo. |
| Estado local em hook | A lógica de jogo e o controle de dicas foram implementados em `useCrossword`. | Mover para estado global aumenta complexidade sem benefício claro. |
