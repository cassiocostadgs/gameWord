export type WordDirection = 'row' | 'col';

export interface Clue {
  number: number;
  direction: WordDirection;
  text: string;
  answer: string;
  row: number;
  col: number;
}

export const clues: Clue[] = [
  { number: 1, direction: 'row', text: 'Gerenciador de pacotes padrão do ecossistema JS', answer: 'NPM', row: 0, col: 0 },
  { number: 3, direction: 'row', text: 'Abreviação comum para desenvolvedor', answer: 'DEV', row: 2, col: 0 },
  { number: 1, direction: 'col', text: 'Ambiente de execução Javascript server-side', answer: 'NODE', row: 0, col: 0 },
];

export const GRID_SIZE = 4;

export const generateInitialGrid = () => {
  const grid = Array.from({ length: GRID_SIZE }, (_, r) => 
    Array.from({ length: GRID_SIZE }, (_, c) => ({
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
      
      if (i === 0) {
        grid[r][c].number = clue.number;
      }
    }
  });

  return grid;
};
