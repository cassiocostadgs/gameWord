import React from 'react';
import './Crossword.css';
import { Cell } from './Cell';
import { Clues } from './Clues';
import { useCrossword } from '../../hooks/useCrossword';
import { GRID_SIZE } from '../../data/puzzleData';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Crossword() {
  const {
    grid,
    activeCell,
    direction,
    isCompleted,
    handleCellChange,
    handleKeyDown,
    handleCellClick,
    handleClueClick
  } = useCrossword();

  return (
    <div className="crossword-container">
      <header className="crossword-header relative inline-block">
        <AnimatePresence>
          {isCompleted && (
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-6 -right-8 text-yellow-500"
            >
              <Sparkles size={36} />
            </motion.div>
          )}
        </AnimatePresence>
        <h1>Tech Crossword</h1>
        <p className="text-muted-foreground">Preencha a grade com os termos de desenvolvimento.</p>
      </header>

      <div className="crossword-layout">
        <main className="crossword-board" style={{ '--grid-size': GRID_SIZE } as React.CSSProperties}>
          {grid.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <Cell
                key={cell.id}
                id={cell.id}
                letter={cell.letter}
                answer={cell.answer}
                isBlock={cell.isBlock}
                number={cell.number}
                isActive={activeCell.row === rowIndex && activeCell.col === colIndex}
                isCompleted={isCompleted}
                onChange={(val) => handleCellChange(rowIndex, colIndex, val)}
                onKeyDown={(e) => handleKeyDown(rowIndex, colIndex, e)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))
          )}
        </main>

        <Clues 
          onClueClick={handleClueClick} 
          activeDirection={direction} 
          activeCell={activeCell} 
        />
      </div>
    </div>
  );
}
