import React from 'react';
import { clues, Clue } from '../../data/puzzleData';

interface CluesProps {
  onClueClick: (clue: Clue) => void;
  activeDirection: 'row' | 'col';
  activeCell: { row: number, col: number };
}

export const Clues: React.FC<CluesProps> = ({ onClueClick, activeDirection, activeCell }) => {
  const rowClues = clues.filter(c => c.direction === 'row');
  const colClues = clues.filter(c => c.direction === 'col');

  const isActive = (clue: Clue) => {
    return activeDirection === clue.direction &&
      activeCell.row >= clue.row && activeCell.row < clue.row + (clue.direction === 'col' ? clue.answer.length : 1) &&
      activeCell.col >= clue.col && activeCell.col < clue.col + (clue.direction === 'row' ? clue.answer.length : 1);
  };

  return (
    <aside className="crossword-clues">
      <div className="clues-group">
        <h3>Horizontal</h3>
        <ul>
          {rowClues.map(clue => (
            <li 
              key={`${clue.number}-${clue.direction}`}
              className={`clue-item ${isActive(clue) ? 'active' : ''}`}
              onClick={() => onClueClick(clue)}
            >
              <strong>{clue.number}.</strong> {clue.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="clues-group">
        <h3>Vertical</h3>
        <ul>
          {colClues.map(clue => (
            <li 
              key={`${clue.number}-${clue.direction}`}
              className={`clue-item ${isActive(clue) ? 'active' : ''}`}
              onClick={() => onClueClick(clue)}
            >
              <strong>{clue.number}.</strong> {clue.text}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
