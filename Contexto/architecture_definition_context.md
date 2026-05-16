# Definição de Arquitetura

> **Como preencher:** registre aqui o padrão arquitetural adotado para este sistema e a justificativa da escolha. Seja direto — o objetivo é que qualquer pessoa do time entenda como o sistema está estruturado e por que.
> **Caminho:** `02-systems/{sistema}/architecture/architecture-definition.md`
> **Divergências dos padrões organizacionais** devem ser registradas como ADR em `architecture/adr/`.

---

## Padrão Arquitetural Adotado

**Padrão:** Monólito de SPA em React com lógica de estado local.

**Justificativa:** Este projeto é um jogo educativo leve entregue como uma aplicação cliente única. Não há necessidade de backend, persistência de usuário ou serviços distribuídos. A arquitetura SPA reduz complexidade, permite iteração rápida e mantém a responsabilidade de renderização e lógica de jogo dentro do navegador.

---

## Como o Sistema está Organizado

O código está organizado como uma aplicação de frontend em React, com uma separação clara entre a camada de apresentação, a lógica de estado e os dados do puzzle. O componente `Crossword` orquestra a renderização do tabuleiro, do painel de pistas, dos controles de dica/reinício e da camada de vitória. A lógica de jogo reside no hook customizado `useCrossword`, enquanto o conteúdo das pistas e da grade está em `src/data/puzzleData.ts`.

O projeto não faz chamadas a APIs externas; todo o cálculo e verificação de respostas são feitos localmente no cliente. Essa estrutura é adequada para este protótipo educacional e mantém o aplicativo fácil de entender e manter.

---

## Decisões Arquiteturais Importantes

| Decisão | O que foi decidido | Justificativa |
|---|---|---|
| Arquitetura | SPA React com Vite | Simplicidade, rápida iteração e experiência interativa no browser sem backend. |
| Estado | Estado local com hook `useCrossword` | O jogo não requer persistência ou coordenação entre múltiplos usuários. |
| Dados | Puzzle estático definido em `src/data/puzzleData.ts` | Facilita a manutenção do conteúdo e evita dependência de APIs externas. |
| UI | Componentes reutilizáveis para célula, pistas e grade | Permite separar apresentação de lógica de jogo e facilita ajustes visuais. |

---

## Diagramas

> Não há diagramas C4 gerados neste repositório. A arquitetura é descrita diretamente neste documento.

---

> **Lembrete:** este documento descreve a intenção arquitetural. Quando houver divergência entre o que está aqui e o que está no código, o código deve ser corrigido — ou este documento deve ser atualizado com um ADR justificando a mudança.
