# Glossário do Projeto

> **Como preencher:** registre aqui todos os termos do domínio de negócio que qualquer pessoa do time precisa conhecer para trabalhar neste projeto. Ordene alfabeticamente.
> **Caminho:** `02-systems/{sistema}/overview/glossary.md`
> **Regra de ouro:** se alguém de fora do negócio não entendesse um termo nas conversas, nos requisitos ou nas telas, ele deve estar aqui.

---

## Termos do Domínio

| Termo | Tradução EN | Definição | Evitar (sinônimos incorretos) |
|---|---|---|---|
| AI | Artificial Intelligence | Tema central das pistas do jogo, representando conceitos de aprendizado de máquina e modelos inteligentes. | Inteligência de máquina |
| Bias | Bias | Viés sistemático que pode distorcer as respostas de um modelo de IA. No jogo, é a palavra da pista 8. | Tendência simples |
| Clue | Clue | Definição apresentada ao jogador para orientar o preenchimento de uma palavra no tabuleiro. | Pista vaga |
| Dica | Hint | Recurso limitado que preenche automaticamente uma letra correta no tabuleiro para ajudar o jogador. | Ajuda ilimitada |
| Puzzle | Puzzle | Conjunto completo de palavras cruzadas, composto por grade, pistas, letras e regras de preenchimento. | Quebra-cabeça genérico |
| Palavra ativa | Active word | Sequência de células selecionada atualmente, destacada quando o usuário navega pela grade. | Palavra não relacionada |

---

## Status e Ciclos de Vida

> Liste os status de cada entidade principal do sistema e o fluxo entre eles. Essencial para que o time entenda as transições permitidas e as regras de negócio associadas.

### Puzzle

O ciclo do jogo vai da inicialização da grade até a conclusão de todas as palavras.

| Status | Descrição | Transições permitidas |
|---|---|---|
| Não iniciado | Tabuleiro gerado, mas o jogador ainda não começou a preencher letras. | → Em progresso |
| Em progresso | O jogador está preenchendo palavras e o timer está ativo. | → Concluído |
| Concluído | Todas as letras corretas foram preenchidas e o jogo foi finalizado. | N/A |

### Dica

O ciclo da dica reflete o uso limitado do recurso no jogo.

| Status | Descrição | Transições permitidas |
|---|---|---|
| Disponível | O jogador ainda tem dicas restantes para usar. | → Usada |
| Usada | A dica já foi consumida e não pode ser reutilizada. | N/A |

---

## Relações Entre Termos

> Descreva como os principais conceitos se relacionam — hierarquias, dependências e regras de associação. Uma frase por relação é suficiente.
> **Exemplo:** _"Um Pedido contém 1 ou mais Itens de Pedido. Um Item de Pedido pertence a exatamente 1 Pedido e referencia 1 Produto."_

- Um `Puzzle` contém uma grade de letras e um conjunto de `Clues` para serem resolvidos.
- Uma `Clue` define uma palavra posicionada horizontalmente ou verticalmente na grade.
- Uma `Célula` pode pertencer a até duas `Palavras` cruzadas e deve obedecer à letra correta em cada interseção.

---

## Siglas e Abreviações

> Apenas siglas do negócio ou da empresa — não registre siglas técnicas universais.

| Sigla | Significado | Contexto de uso |
|---|---|---|
| AI | Inteligência Artificial | Tema das pistas e do jogo. |
| SPA | Single Page Application | Arquitetura do aplicativo frontend. |

---

## Histórico de Alterações

> Mudanças de nomenclatura afetam o time inteiro — registre para rastreabilidade.

| Data | Termo | Alteração | Motivo |
|---|---|---|---|
| 2026-05-16 | Glossário inicial | Adicionado | Definição dos termos do jogo de palavras cruzadas de IA. |
