import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CellProps {
  id: string;
  letter: string;
  answer: string;
  isBlock: boolean;
  number: number | null;
  isActive: boolean;
  isCompleted: boolean;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({
  id, letter, answer, isBlock, number, isActive, isCompleted, onChange, onKeyDown, onClick
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  if (isBlock) {
    return <div className="cell-wrapper block"></div>;
  }

  const isCorrect = isCompleted || (letter !== '' && letter === answer);
  const isError = letter !== '' && letter !== answer && !isCompleted;

  return (
    <div className="cell-wrapper">
      {number && <span className="cell-number">{number}</span>}
      <motion.input
        ref={inputRef}
        type="text"
        maxLength={1}
        value={letter}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onClick={onClick}
        className={`cell-input 
          ${isCorrect ? 'correct' : ''} 
          ${isError ? 'error' : ''} 
          ${isActive ? 'active' : ''}
        `}
        animate={
          isCompleted 
            ? { scale: [1, 1.1, 1], transition: { duration: 0.3 } } 
            : isError 
              ? { x: [-2, 2, -2, 2, 0], transition: { duration: 0.2 } } 
              : {}
        }
      />
    </div>
  );
};
