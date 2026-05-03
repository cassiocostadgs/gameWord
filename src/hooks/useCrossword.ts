import { useState, useCallback } from 'react';
import { generateInitialGrid, GRID_SIZE, clues, Clue } from '../data/puzzleData';

export function useCrossword() {
  const [grid, setGrid] = useState(generateInitialGrid());
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'row' | 'col'>('row');
  const [isCompleted, setIsCompleted] = useState(false);

  const checkWinCondition = (currentGrid: typeof grid) => {
    let won = true;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (!currentGrid[r][c].isBlock) {
          if (currentGrid[r][c].letter !== currentGrid[r][c].answer) {
            won = false;
          }
        }
      }
    }
    setIsCompleted(won);
  };

  const setCell = (row: number, col: number, letter: string) => {
    if (grid[row][col].isBlock) return;
    
    setGrid(prev => {
      const next = prev.map(r => r.map(c => ({ ...c })));
      next[row][col].letter = letter.toUpperCase();
      
      checkWinCondition(next);
      return next;
    });
  };

  const getNextCell = (r: number, c: number, d: 'row' | 'col') => {
    let currR = r;
    let currC = c;
    
    if (d === 'row') {
      if (currC + 1 < GRID_SIZE && !grid[currR][currC + 1].isBlock) return { row: currR, col: currC + 1 };
    } else {
      if (currR + 1 < GRID_SIZE && !grid[currR + 1][currC].isBlock) return { row: currR + 1, col: currC };
    }
    return { row: r, col: c };
  };

  const getPrevCell = (r: number, c: number, d: 'row' | 'col') => {
    if (d === 'row') {
      if (c - 1 >= 0 && !grid[r][c - 1].isBlock) return { row: r, col: c - 1 };
    } else {
      if (r - 1 >= 0 && !grid[r - 1][c].isBlock) return { row: r - 1, col: c };
    }
    return { row: r, col: c };
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newLetter = value.toUpperCase().slice(-1);
    setCell(row, col, newLetter);
    if (newLetter) {
      const next = getNextCell(row, col, direction);
      if (next.row !== row || next.col !== col) {
        setActiveCell(next);
      }
    }
  };

  const handleKeyDown = (row: number, col: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!grid[row][col].letter) {
        const prev = getPrevCell(row, col, direction);
        if (prev.row !== row || prev.col !== col) {
          setActiveCell(prev);
          setCell(prev.row, prev.col, '');
        }
      } else {
        setCell(row, col, '');
      }
    } else if (e.key === 'ArrowRight') {
      const next = getNextCell(row, col, 'row');
      setActiveCell(next);
      setDirection('row');
    } else if (e.key === 'ArrowLeft') {
      const prev = getPrevCell(row, col, 'row');
      setActiveCell(prev);
      setDirection('row');
    } else if (e.key === 'ArrowDown') {
      const next = getNextCell(row, col, 'col');
      setActiveCell(next);
      setDirection('col');
    } else if (e.key === 'ArrowUp') {
      const prev = getPrevCell(row, col, 'col');
      setActiveCell(prev);
      setDirection('col');
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (activeCell.row === row && activeCell.col === col) {
      setDirection(d => d === 'row' ? 'col' : 'row');
    } else {
      setActiveCell({ row, col });
      const isStartOfRowWord = clues.some(c => c.row === row && c.col === col && c.direction === 'row');
      const isStartOfColWord = clues.some(c => c.row === row && c.col === col && c.direction === 'col');
      if (isStartOfColWord && !isStartOfRowWord) {
        setDirection('col');
      } else if (isStartOfRowWord && !isStartOfColWord) {
        setDirection('row');
      }
    }
  };
  
  const handleClueClick = (clue: Clue) => {
    setActiveCell({ row: clue.row, col: clue.col });
    setDirection(clue.direction);
  }

  return {
    grid,
    activeCell,
    direction,
    isCompleted,
    handleCellChange,
    handleKeyDown,
    handleCellClick,
    handleClueClick
  };
}
