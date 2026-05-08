export type WordDirection = 'row' | 'col';

export interface Clue {
  number: number;
  direction: WordDirection;
  text: string;
  answer: string;
  row: number;
  col: number;
}

/*
  Grid layout (9 rows × 10 cols):

       0    1    2    3    4    5    6    7    8    9
  0:  [M]  [O]  [D]  [E]  [L]  [O]  .    .    .    .    ← 1H MODELO
  1:   .    .   [A]   .    .    .    .    .    .    .    ← 2V DADOS (col 2)
  2:   .    .   [D]  [P]  [R]  [O]  [M]  [P]  [T]  .    ← 3H PROMPT, 4V REDE (col 4)
  3:   .   [T]  [O]  [K]  [E]  [N]  .    .    .    .    ← 5H TOKEN, 6V NEURAL (col 5)
  4:   .    .   [S]   .   [D]  [E]  .    .    .    .
  5:   .    .    .    .   [E]  [U]  .    .    .    .
  6:   .    .    .    .   [T]  [R]  [E]  [I]  [N]  [O]  ← 7H TREINO
  7:   .    .    .   [B]  [I]  [A]  [S]  .    .    .    ← 8H BIAS
  8:   .    .    .    .    .   [L]  .    .    .    .

  Intersections (all verified):
    (0,2) MODELO[2]=D  ∩  DADOS[0]=D  ✓
    (2,4) PROMPT[1]=R  ∩  REDE[0]=R   ✓
    (3,2) TOKEN[1]=O   ∩  DADOS[3]=O  ✓
    (3,4) TOKEN[3]=E   ∩  REDE[1]=E   ✓
    (3,5) TOKEN[4]=N   ∩  NEURAL[0]=N ✓
    (6,5) TREINO[1]=R  ∩  NEURAL[3]=R ✓
    (7,5) BIAS[2]=A    ∩  NEURAL[4]=A ✓
*/

export const clues: Clue[] = [
  {
    number: 1, direction: 'row',
    text: 'Conjunto de parâmetros treinados para fazer previsões e tomar decisões',
    answer: 'MODELO', row: 0, col: 0,
  },
  {
    number: 2, direction: 'col',
    text: 'Informações brutas usadas para ensinar uma inteligência artificial',
    answer: 'DADOS', row: 0, col: 2,
  },
  {
    number: 3, direction: 'row',
    text: 'Instrução ou pergunta que você digita para interagir com uma IA como o ChatGPT',
    answer: 'PROMPT', row: 2, col: 3,
  },
  {
    number: 4, direction: 'col',
    text: 'Estrutura formada por neurônios artificiais organizados em camadas',
    answer: 'REDE', row: 2, col: 4,
  },
  {
    number: 5, direction: 'row',
    text: 'Unidade mínima de texto processada por modelos de linguagem como o GPT',
    answer: 'TOKEN', row: 3, col: 1,
  },
  {
    number: 6, direction: 'col',
    text: 'Tipo de rede de aprendizado profundo inspirada no funcionamento do cérebro humano',
    answer: 'NEURAL', row: 3, col: 5,
  },
  {
    number: 7, direction: 'row',
    text: 'Processo de ensinar um modelo de IA usando exemplos e ajustando seus parâmetros',
    answer: 'TREINO', row: 6, col: 4,
  },
  {
    number: 8, direction: 'row',
    text: 'Viés ou tendência sistemática que pode distorcer as respostas de um modelo de IA',
    answer: 'BIAS', row: 7, col: 3,
  },
];

export const GRID_ROWS = 9;
export const GRID_COLS = 10;

export const generateInitialGrid = () => {
  const grid = Array.from({ length: GRID_ROWS }, (_, r) =>
    Array.from({ length: GRID_COLS }, (_, c) => ({
      id: `${r}-${c}`,
      answer: '',
      letter: '',
      isBlock: true,
      number: null as number | null,
    }))
  );

  clues.forEach(clue => {
    for (let i = 0; i < clue.answer.length; i++) {
      const r = clue.direction === 'row' ? clue.row : clue.row + i;
      const c = clue.direction === 'col' ? clue.col : clue.col + i;

      grid[r][c].answer = clue.answer[i];
      grid[r][c].isBlock = false;

      if (i === 0 && grid[r][c].number === null) {
        grid[r][c].number = clue.number;
      }
    }
  });

  return grid;
};
