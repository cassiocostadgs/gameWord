# contexto.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build (outputs to dist/)
npm run preview  # preview production build locally
```

No test runner or linter is configured.

## Architecture

This is a single-page React + TypeScript + Vite app implementing a Portuguese-language AI-themed crossword puzzle.

**Data flow:**

```
src/data/puzzleData.ts
  └─ defines 8 AI-themed clues + generateGrid() → Cell[][]
       ↓
src/hooks/useCrossword.ts
  └─ manages all game state (grid, activeCell, direction, timer, hints, win)
       ↓
src/components/Crossword/index.tsx   ← orchestrates the UI
  ├─ Cell.tsx                        ← individual grid cell (input + animations)
  └─ Clues.tsx                       ← clue sidebar with active highlighting
```

**Key state logic lives entirely in `useCrossword.ts`.** It owns:
- Active cell + direction (horizontal/vertical) with arrow-key navigation
- Letter input validation and grid mutation
- 3-hint budget (reveals correct letter for active cell, marks cell as `hinted`)
- Timer (starts on first keypress, stops on win)
- Win detection (all non-black cells correctly filled)

**Cell states** (`Cell` type in `puzzleData.ts`): each cell has `value`, `correctValue`, `isBlack`, `isCorrect`, `isHinted`, `hasError`.

**Game state machine** (tracked inside the hook): `inactive → inProgress → completed`.

## Styling

Tailwind CSS is loaded via CDN in `index.html` — there is no PostCSS/Tailwind config file. Custom styles (grid layout, cell states, animations, purple/blue gradient theme) live in `src/components/Crossword/Crossword.css`.

## Dependencies

- `framer-motion` — cell animations (correct/hinted/error states)
- `lucide-react` — icons in the UI
- Gemini API key support is wired into `vite.config.ts` (`VITE_GEMINI_API_KEY`) but not used in the current codebase
