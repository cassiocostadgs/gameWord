# Software Design Description (SDD)

## 1. Visão Geral

- Aplicação: jogo de cruzadinha educativa sobre inteligência artificial.
- Nome de referência: `IA Crossword`.
- Plataforma: web browser.
- Tecnologias: `React`, `TypeScript`, `Vite`, `framer-motion`, `lucide-react`.

## 2. Objetivo

Fornecer um jogo de palavras cruzadas que:
- ensina conceitos de IA;
- permite interação via teclado e mouse;
- controla tempo, progresso e dicas;
- oferece feedback visual e animações.

## 3. Escopo

### Inclui
- grade de 9 linhas × 10 colunas com células bloqueadas e respostas;
- lista de dicas horizontais e verticais;
- navegação por setas e clique;
- mecanismo de dicas;
- indicador de progresso e timer;
- overlay de vitória;
- reinício do jogo.

### Não inclui
- persistência entre sessões;
- múltiplos puzzles;
- backend ou login de usuário;
- editor de puzzle.

---

## 4. Requisitos

### 4.1 Requisitos funcionais

1. Exibir grid de palavras cruzadas:
   - `GRID_ROWS = 9`, `GRID_COLS = 10`.
   - Células com `isBlock = true` são espaços vazios.
   - Células com `isBlock = false` aceitam letras.

2. Renderizar dicas:
   - Separar em `Horizontal` e `Vertical`.
   - Cliques em uma dica movem o foco para sua célula inicial.

3. Seleção de célula:
   - Clique na célula ativa alterna direção entre `row` e `col`.
   - Clique em outra célula seleciona essa célula.

4. Inserção de letras:
   - Cada célula aceita 1 caractere.
   - Letras são convertidas para maiúsculas.
   - Após digitar, o foco avança para próxima célula na direção ativa.

5. Navegação com teclado:
   - `ArrowRight` e `ArrowLeft` definem direção `row`.
   - `ArrowDown` e `ArrowUp` definem direção `col`.
   - `Backspace` limpa a letra atual ou volta para a anterior se já estiver vazia.

6. Feedback visual:
   - Destaque de célula ativa.
   - Destaque da palavra ativa (`isInActiveWord`).
   - Indicação de acerto, erro e dica aplicada.

7. Dicas:
   - Máximo de `TOTAL_HINTS = 3`.
   - Botão de dica revela uma letra correta de uma palavra ativa, ou de qualquer célula incorreta se a palavra ativa já estiver correta.
   - Botão desabilitado quando `hintsLeft === 0` ou jogo concluído.

8. Timer:
   - Começa no primeiro input do usuário.
   - Para ao completar o puzzle.

9. Condição de vitória:
   - O jogo é concluído quando todas as células não bloqueadas têm `letter === answer`.
   - Exibe overlay de vitória com tempo e dicas usadas.

10. Reset:
   - `resetGame()` retorna o jogo ao estado inicial.

### 4.2 Requisitos não funcionais

- Interface responsiva e com animações suaves.
- Performance adequada mesmo com lógica de renderização de grid.
- Código organizado em componentes reutilizáveis e hook customizado.
- Compatibilidade com navegador moderno via Vite/ESM.

---

## 5. Arquitetura e Componentes

### 5.1 Visão de alto nível

Fluxo:
- `App.tsx` → `Crossword`
- `Crossword` usa `useCrossword`
- `useCrossword` controla estado/negócio
- `Cell` e `Clues` representam UI
- `puzzleData.ts` fornece dados do puzzle

### 5.2 Componentes principais

| Componente / Módulo | Responsabilidade |
|---|---|
| `App.tsx` | Raiz da aplicação |
| `src/components/Crossword/index.tsx` | UI principal do jogo |
| `src/components/Crossword/Cell.tsx` | Renderiza célula de grid |
| `src/components/Crossword/Clues.tsx` | Renderiza lista de dicas |
| `src/hooks/useCrossword.ts` | Estado e regras do jogo |
| `src/data/puzzleData.ts` | Definição do puzzle e geração de grid |

### 5.3 Arquitetura de camadas

- Apresentação: `Crossword`, `Cell`, `Clues`
- Lógica de domínio: `useCrossword`
- Dados: `puzzleData`

---

## 6. Modelo de Dados

### `Clue`

```ts
export type WordDirection = 'row' | 'col';

export interface Clue {
  number: number;
  direction: WordDirection;
  text: string;
  answer: string;
  row: number;
  col: number;
}
```

### Célula da grade

Cada célula tem:
- `id: string` — ex. `"2-3"`
- `answer: string`
- `letter: string`
- `isBlock: boolean`
- `number: number | null`

### Puzzle

- `clues: Clue[]` — lista de 8 pistas.
- `GRID_ROWS = 9`
- `GRID_COLS = 10`

---

## 7. Fluxos de Uso

### 7.1 Iniciar jogo
- `Crossword` monta com `generateInitialGrid()`.
- timer = 0, `activeCell = {0,0}`, `direction = 'row'`.

### 7.2 Preencher célula
- Usuário digita no componente `Cell`.
- `handleCellChange` chama `setCell`.
- Avança para próxima célula válida na direção ativa.

### 7.3 Mudar direção
- Clique na mesma célula ativa alterna `row` ↔ `col`.
- Clique em outra célula define direção com base em pistas de início.

### 7.4 Navegação por teclado
- Setas movem foco dentro da direção.
- `Backspace` apaga e retrocede.

### 7.5 Usar dica
- `useHint()`:
  - se a palavra ativa ainda tiver letras incorretas, escolhe uma delas;
  - caso contrário, escolhe uma letra incorreta em outro lugar.
  - decrementa `hintsLeft`;
  - marca a célula em `hintedCells`;
  - preenche a letra correta.

### 7.6 Finalizar
- `useEffect` de verificação de vitória observa `grid`.
- Se todas as células não bloqueadas estiverem corretas, `isCompleted = true`.
- Overlay de vitória aparece.

---

## 8. Regras de Negócio

- Apenas células não bloqueadas podem ser editadas.
- Letras válidas são armazenadas em maiúsculas.
- `getActiveWordCells()` determina células da palavra atualmente ativa com base em `activeCell` e `direction`.
- O timer só roda enquanto o jogo não estiver concluído.
- Dica não pode ser usada com `hintsLeft = 0` ou após conclusão.
- Ao resetar, todos os estados retornam ao inicial.

---

## 9. Detalhes de Implementação

### `useCrossword.ts`

Responsabilidades:
- estado de `grid`, `activeCell`, `direction`, `isCompleted`, `hintsLeft`, `hintedCells`, `elapsedSeconds`
- controle de timer com `useEffect` e `setInterval`
- lógica de navegação de células com `getNextCell()` / `getPrevCell()`
- determinação da palavra ativa com `getActiveWordCells()`
- lógica de dicas e reinício

### `Cell.tsx`

- foca automaticamente o input quando `isActive`
- calcula classes:
  - `correct`
  - `error`
  - `hinted`
  - `active`
  - `word-highlight`
- usa `framer-motion` para animações de erro e efeito de conclusão

### `Clues.tsx`

- separa pistas por `row` e `col`
- destaca pista ativa com base em `activeCell`
- notifica `onClueClick`

---

## 10. Interfaces e UX

### Layout principal
- Header com título e subtítulo
- Barra de estatísticas com tempo, progresso e botões
- Board + painel de dicas
- Overlay de vitória

### Estados de UI
- Normal
- Palavra ativa destacada
- Erro no input
- Letra revelada por dica
- Jogo concluído

---

## 11. Testes e Validação

Sugestões de cenários:

1. Renderização inicial:
   - grade correta
   - `totalCells` e `correctCells` iniciais
2. Digitação e navegação:
   - letra maiúscula
   - foco avança
   - setas atualizam `activeCell`
3. Dica:
   - decrementa `hintsLeft`
   - preenche letra correta
4. Vitória:
   - `isCompleted = true` no preenchimento correto
   - overlay aparece
5. Reset:
   - estado volta a inicial
   - timer zera

---

## 12. Dependências e Ambiente

- `react` `^19.2.0`
- `react-dom` `^19.2.0`
- `framer-motion` `^12.23.24`
- `lucide-react` `^0.554.0`
- `vite`, `typescript`, `@vitejs/plugin-react`

---

## 13. Observações e Melhorias Futuras

Possíveis extensões:
- múltiplos puzzles e seleção de nível
- persistência local (`localStorage`)
- suporte a encaixe de palavras mais complexo
- acessibilidade aprimorada (aria labels, navegação por tab)
- relatório de performance e histórico de tempos
