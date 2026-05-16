# Detalhamento do Escopo Macro do Projeto

> **Caminho:** `03_systems/{sistema}/product/scope_features_context.md`
> **Limite:** 250 linhas. Se ultrapassar, divida por domínio de negócio em arquivos separados.
> **Próximo passo:** cada feature listada aqui vira uma spec em `specs/{modulo}/{feature}/spec_context.md`.

---

## Visão Geral do Produto

Aplicativo educativo de palavras cruzadas com foco em Inteligência Artificial. O produto resolve a necessidade de tornar a revisão de termos de IA mais prática e envolvente, usando um tabuleiro interativo no navegador.

---

## Roadmap

> Liste os módulos na sequência de entrega. Preencha após definir os módulos abaixo.

| Ordem | ID | Módulo | O que entrega ao negócio |
|---|---|---|---|
| 1 | MODULE-001 | Jogo interativo de palavras cruzadas | Entrega a experiência principal de aprendizado e retenção de conceitos. |
| 2 | MODULE-002 | Feedback e assistência | Entrega suporte ao usuário com progresso e dicas. |
| 3 | MODULE-003 | Interface e apresentação | Entrega usabilidade, responsividade e animações. |

---

## Módulos e Features

---

### MODULE-001 — Jogo interativo de palavras cruzadas

> Este módulo oferece a experiência principal de jogo, permitindo que o usuário preencha o tabuleiro e navegue entre as palavras.

#### FEATURE-001 — Tabuleiro de palavras cruzadas

O tabuleiro exibe uma grade de 9x10 com células bloqueadas e preenchíveis. O jogador pode inserir letras, avançar automaticamente para a próxima célula e ver o estado atual do jogo.

#### FEATURE-002 — Pistas temáticas de IA

O painel de pistas lista definições sobre termos de Inteligência Artificial organizados em horizontais e verticais. Clicar em uma pista seleciona automaticamente a palavra correspondente no tabuleiro.

---

### MODULE-002 — Feedback de progresso e assistência

> Este módulo traz indicadores de desempenho e mecanismos de ajuda para o jogador se orientar durante o jogo.

#### FEATURE-003 — Indicadores de tempo e progresso

Mostra o tempo decorrido, o número de letras corretas e uma barra de progresso responsiva. Isso ajuda o usuário a acompanhar a evolução da partida.

#### FEATURE-004 — Dicas limitadas e reinício

Fornece até 3 dicas que preenchem letras corretas automaticamente e inclui um botão para reiniciar o jogo a qualquer momento.

---

### MODULE-003 — Interface visual e experiência

> Este módulo garante que o aplicativo tenha boa aparência e funcione bem em diferentes tamanhos de tela.

#### FEATURE-005 — UI responsiva e animações

Implementa estilos, layout adaptável e animações suaves com `framer-motion` para melhorar a experiência de uso, sem comprometer a performance.

---

## Fora do Escopo

| Item excluído | Motivo |
|---|---|
| Persistência de pontuação e progresso | Não há backend ou armazenamento de usuário. |
| Autenticação de usuário | O jogo deve ser acessado sem cadastro. |
| Geração dinâmica de puzzles | O puzzle é estático e definido no código. |
| Integração com APIs externas | O app deve permanecer leve e independente. |
