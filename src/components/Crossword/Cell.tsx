import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CellProps {
  id: string;
  letter: string;
  answer: string;
  isBlock: boolean;
  number: number | null;
  isActive: boolean;
  isInActiveWord: boolean;
  isHinted: boolean;
  isCompleted: boolean;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onClick: () => void;
}

export const Cell: React.FC<CellProps> = ({
  letter, answer, isBlock, number, isActive, isInActiveWord, isHinted, isCompleted,
  onChange, onKeyDown, onClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) inputRef.current.focus();
  }, [isActive]);

  if (isBlock) return <div className="cell-wrapper block" />;

  const isCorrect = isCompleted || (letter !== '' && letter === answer);
  const isError = !isHinted && letter !== '' && letter !== answer && !isCompleted;

  const classes = [
    'cell-input',
    isCorrect && isHinted ? 'hinted' : '',
    isCorrect && !isHinted ? 'correct' : '',
    isError ? 'error' : '',
    isActive ? 'active' : '',
    isInActiveWord && !isActive ? 'word-highlight' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="cell-wrapper">
      {number !== null && <span className="cell-number">{number}</span>}
      <motion.input
        ref={inputRef}
        type="text"
        maxLength={1}
        value={letter}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        onClick={onClick}
        className={classes}
        animate={
          isCompleted
            ? { scale: [1, 1.18, 1], transition: { duration: 0.35, delay: Math.random() * 0.25 } }
            : isError
              ? { x: [-3, 3, -3, 3, 0], transition: { duration: 0.25 } }
              : {}
        }
      />
    </div>
  );
};
