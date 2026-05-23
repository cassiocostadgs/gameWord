import React, { useState, useEffect, useRef } from 'react';
import { generateInitialGrid, GRID_ROWS, GRID_COLS, clues, Clue } from '../data/puzzleData';
import { saveGameHistory } from '../services/gameHistory';

export const TOTAL_HINTS = 3;

export function useCrossword() {
  const [grid, setGrid] = useState(generateInitialGrid());
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'row' | 'col'>('row');
  const [isCompleted, setIsCompleted] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(TOTAL_HINTS);
  const [hintedCells, setHintedCells] = useState<Set<string>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [historySaved, setHistorySaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer: start on first input, stop on completion
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timerStarted && !isCompleted) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerStarted, isCompleted]);

  // Win condition check after every grid change
  useEffect(() => {
    const nonBlock = grid.flat().filter(c => !c.isBlock);
    if (nonBlock.length > 0 && nonBlock.every(c => c.letter !== '' && c.letter === c.answer)) {
      setIsCompleted(true);
    }
  }, [grid]);

  const totalCells = grid.flat().filter(c => !c.isBlock).length;
  const correctCells = grid.flat().filter(c => !c.isBlock && c.letter !== '' && c.letter === c.answer).length;

  useEffect(() => {
    if (!isCompleted || historySaved) return;

    const gameHistory = {
      durationSeconds: elapsedSeconds,
      hintsUsed: TOTAL_HINTS - hintsLeft,
      totalCells,
      correctCells,
      completedAt: new Date().toISOString(),
    };

    saveGameHistory(gameHistory)
      .then(() => setHistorySaved(true))
      .catch(error => {
        console.error('Falha ao salvar histórico de jogo no Supabase:', error);
      });
  }, [isCompleted, historySaved, elapsedSeconds, hintsLeft, totalCells, correctCells]);

  const setCell = (row: number, col: number, letter: string) => {
    if (grid[row][col].isBlock) return;
    setGrid(prev => {
      const next = prev.map(r => r.map(c => ({ ...c })));
      next[row][col].letter = letter.toUpperCase();
      return next;
    });
  };

  const getNextCell = (r: number, c: number, d: 'row' | 'col') => {
    if (d === 'row') {
      if (c + 1 < GRID_COLS && !grid[r][c + 1].isBlock) return { row: r, col: c + 1 };
    } else {
      if (r + 1 < GRID_ROWS && !grid[r + 1][c].isBlock) return { row: r + 1, col: c };
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

  const startTimer = () => {
    if (!timerStarted) setTimerStarted(true);
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    startTimer();
    const newLetter = value.toUpperCase().slice(-1);
    setCell(row, col, newLetter);
    if (newLetter) {
      const next = getNextCell(row, col, direction);
      if (next.row !== row || next.col !== col) setActiveCell(next);
    }
  };

  const handleKeyDown = (row: number, col: number, e: React.KeyboardEvent) => {
    startTimer();
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
      setActiveCell(getNextCell(row, col, 'row'));
      setDirection('row');
    } else if (e.key === 'ArrowLeft') {
      setActiveCell(getPrevCell(row, col, 'row'));
      setDirection('row');
    } else if (e.key === 'ArrowDown') {
      setActiveCell(getNextCell(row, col, 'col'));
      setDirection('col');
    } else if (e.key === 'ArrowUp') {
      setActiveCell(getPrevCell(row, col, 'col'));
      setDirection('col');
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (activeCell.row === row && activeCell.col === col) {
      setDirection(d => (d === 'row' ? 'col' : 'row'));
    } else {
      setActiveCell({ row, col });
      const isRowStart = clues.some(c => c.row === row && c.col === col && c.direction === 'row');
      const isColStart = clues.some(c => c.row === row && c.col === col && c.direction === 'col');
      if (isColStart && !isRowStart) setDirection('col');
      else if (isRowStart && !isColStart) setDirection('row');
    }
  };

  const handleClueClick = (clue: Clue) => {
    setActiveCell({ row: clue.row, col: clue.col });
    setDirection(clue.direction);
  };

  const getActiveWordCells = (): Set<string> => {
    const findClue = (dir: 'row' | 'col') =>
      clues.find(c => {
        if (c.direction !== dir) return false;
        return dir === 'row'
          ? c.row === activeCell.row && activeCell.col >= c.col && activeCell.col < c.col + c.answer.length
          : c.col === activeCell.col && activeCell.row >= c.row && activeCell.row < c.row + c.answer.length;
      });

    const activeClue = findClue(direction) ?? findClue(direction === 'row' ? 'col' : 'row');
    const cells = new Set<string>();
    if (activeClue) {
      for (let i = 0; i < activeClue.answer.length; i++) {
        const r = activeClue.direction === 'row' ? activeClue.row : activeClue.row + i;
        const c = activeClue.direction === 'col' ? activeClue.col : activeClue.col + i;
        cells.add(`${r}-${c}`);
      }
    }
    return cells;
  };

  const useHint = () => {
    if (hintsLeft <= 0 || isCompleted) return;
    startTimer();

    const activeWordCellIds = getActiveWordCells();
    const unsolvedInWord = [...activeWordCellIds].filter(id => {
      const [r, c] = id.split('-').map(Number);
      return grid[r][c].letter !== grid[r][c].answer;
    });

    const unsolvedAnywhere = grid.flat()
      .filter(c => !c.isBlock && c.letter !== c.answer)
      .map(c => c.id);

    const targets = unsolvedInWord.length > 0 ? unsolvedInWord : unsolvedAnywhere;
    if (targets.length === 0) return;

    const chosenId = targets[Math.floor(Math.random() * targets.length)];
    const [r, c] = chosenId.split('-').map(Number);

    setHintsLeft(h => h - 1);
    setHintedCells(prev => new Set([...prev, chosenId]));
    setGrid(prev => {
      const next = prev.map(row => row.map(cell => ({ ...cell })));
      next[r][c].letter = next[r][c].answer;
      return next;
    });
  };

  const resetGame = () => {
    setGrid(generateInitialGrid());
    setActiveCell({ row: 0, col: 0 });
    setDirection('row');
    setIsCompleted(false);
    setHintsLeft(TOTAL_HINTS);
    setHintedCells(new Set());
    setElapsedSeconds(0);
    setTimerStarted(false);
    setHistorySaved(false);
  };

  return {
    grid,
    activeCell,
    direction,
    isCompleted,
    hintsLeft,
    hintedCells,
    elapsedSeconds,
    totalCells,
    correctCells,
    handleCellChange,
    handleKeyDown,
    handleCellClick,
    handleClueClick,
    useHint,
    getActiveWordCells,
    resetGame,
  };
}
