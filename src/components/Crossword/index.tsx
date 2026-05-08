import React from 'react';
import './Crossword.css';
import { Cell } from './Cell';
import { Clues } from './Clues';
import { useCrossword, TOTAL_HINTS } from '../../hooks/useCrossword';
import { GRID_COLS } from '../../data/puzzleData';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Timer, Target, RotateCcw, Brain } from 'lucide-react';

function formatTime(s: number): string {
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

export default function Crossword() {
  const {
    grid, activeCell, direction, isCompleted,
    hintsLeft, hintedCells, elapsedSeconds, totalCells, correctCells,
    handleCellChange, handleKeyDown, handleCellClick, handleClueClick,
    useHint, getActiveWordCells, resetGame,
  } = useCrossword();

  const activeWordCells = getActiveWordCells();
  const progressPct = totalCells > 0 ? (correctCells / totalCells) * 100 : 0;

  return (
    <div className="crossword-container">
      <header className="crossword-header">
        <div className="header-title-row">
          <Brain size={30} className="header-brain" />
          <h1>IA Crossword</h1>
        </div>
        <p className="header-subtitle">
          Teste seus conhecimentos sobre Inteligência Artificial
        </p>
      </header>

      <div className="stats-bar">
        <div className="stat-item">
          <Timer size={14} />
          <span className="stat-value">{formatTime(elapsedSeconds)}</span>
        </div>
        <div className="stat-item stat-progress">
          <Target size={14} />
          <span className="stat-value">{correctCells}/{totalCells}</span>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
        <button
          className={`hint-btn${hintsLeft === 0 ? ' hint-disabled' : ''}`}
          onClick={useHint}
          disabled={hintsLeft === 0 || isCompleted}
          title="Revelar uma letra da palavra ativa"
        >
          <Lightbulb size={14} />
          <span>Dica ({hintsLeft})</span>
        </button>
        <button className="reset-btn" onClick={resetGame} title="Reiniciar jogo">
          <RotateCcw size={14} />
        </button>
      </div>

      <div className="crossword-layout">
        <main
          className="crossword-board"
          style={{ '--grid-cols': GRID_COLS } as React.CSSProperties}
        >
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
                isInActiveWord={activeWordCells.has(cell.id)}
                isHinted={hintedCells.has(cell.id)}
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

      <AnimatePresence>
        {isCompleted && (
          <motion.div
            className="win-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="win-card"
              initial={{ scale: 0.55, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            >
              <div className="win-emoji">🎉</div>
              <h2 className="win-title">Parabéns!</h2>
              <p className="win-subtitle">Você completou o puzzle de IA!</p>
              <div className="win-stats">
                <div className="win-stat-item">
                  <span className="win-stat-label">⏱ Tempo</span>
                  <span className="win-stat-value">{formatTime(elapsedSeconds)}</span>
                </div>
                <div className="win-stat-item">
                  <span className="win-stat-label">💡 Dicas usadas</span>
                  <span className="win-stat-value">{TOTAL_HINTS - hintsLeft} / {TOTAL_HINTS}</span>
                </div>
              </div>
              <button className="play-again-btn" onClick={resetGame}>
                <RotateCcw size={16} />
                Jogar Novamente
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
