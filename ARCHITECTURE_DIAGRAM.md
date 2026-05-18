# Diagrama da Arquitetura - IA Crossword

## Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                              │
│                   (Ponto de Entrada)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   Crossword Component                        │
│              (Orquestrador Principal do Jogo)                │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  useCrossword Hook                                   │   │
│  │  (Lógica de Estado e Negócio do Jogo)               │   │
│  │  - Grid state                                        │   │
│  │  - Active cell e direction                           │   │
│  │  - Controle de dicas                                 │   │
│  │  - Timer e progresso                                 │   │
│  │  - Verificação de respostas                          │   │
│  └──────────────────────────────────────────────────────┘   │
│           ▲                                ▲                  │
│           │                                │                  │
│    ┌──────┴──────────┐            ┌────────┴──────────┐     │
│    │                 │            │                   │     │
│    ▼                 ▼            ▼                   ▼     │
│  ┌─────────┐    ┌──────────┐  ┌──────────┐    ┌──────────┐ │
│  │  Cell   │    │  Clues   │  │ Controls │    │  Timer   │ │
│  │Component│    │Component │  │          │    │  Display │ │
│  └─────────┘    └──────────┘  └──────────┘    └──────────┘ │
└──────────┬─────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│              puzzleData.ts (Data Layer)                      │
│         - GRID_COLS e GRID_ROWS (dimensões)                │
│         - initialGrid (estado inicial do puzzle)             │
│         - clues (pistas horizontais e verticais)             │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Dados

```
┌──────────────────────────────────────────────────────────────┐
│ 1. USER INTERACTION (Mouse/Keyboard)                         │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  handleCellClick()          │
        │  handleKeyDown()            │
        │  handleCellChange()         │
        │  handleClueClick()          │
        │  useHint()                  │
        └────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  useCrossword Hook          │
        │  (Atualiza estado)          │
        └────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Validação de Respostas    │
        │  - Verifica acertos        │
        │  - Atualiza progresso      │
        └────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │  Componentes Renderizam    │
        │  - Cell                    │
        │  - Clues                   │
        │  - Stats Bar               │
        └────────────────────────────┘
```

## Estrutura de Componentes

```
App
└── Crossword
    ├── Header
    │   ├── Title (Brain Icon + "IA Crossword")
    │   └── Subtitle
    ├── Stats Bar
    │   ├── Timer
    │   ├── Progress (correctCells / totalCells)
    │   └── Hints Counter
    ├── Game Board
    │   └── Cell[] (Grid de células)
    ├── Clues Panel
    │   ├── Horizontal Clues
    │   └── Vertical Clues
    ├── Controls
    │   ├── Hint Button (Lightbulb Icon)
    │   └── Reset Button (RotateCcw Icon)
    └── Win Modal
        └── Completed message + Timer
```

## Fluxo de Estado (useCrossword Hook)

```
┌────────────────────────────────────┐
│      Estado Interno Hook           │
├────────────────────────────────────┤
│ • grid: string[][]                 │  ◄─── puzzleData.initialGrid
│ • activeCell: [row, col] | null    │
│ • direction: 'across' | 'down'     │
│ • isCompleted: boolean             │
│ • hintsLeft: number                │
│ • hintedCells: Set<string>         │
│ • elapsedSeconds: number           │
│ • totalCells: number               │
│ • correctCells: number             │
└────────────────────────────────────┘
         ▲                  │
         │                  ▼
    Métodos            Retornados
    ├─ handleCellChange
    ├─ handleKeyDown
    ├─ handleCellClick
    ├─ handleClueClick
    ├─ useHint
    ├─ getActiveWordCells
    └─ resetGame
```

## Fluxo de Validação

```
┌──────────────────────────────┐
│  Usuário digita na célula    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ handleCellChange()           │
│ - Atualiza grid              │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Valida resposta              │
│ - Compara com resposta correta│
│ - Incrementa correctCells    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ Verifica se ganhou           │
│ (correctCells === totalCells)│
│ - Mostra Win Modal           │
│ - Exibe tempo final          │
└──────────────────────────────┘
```

## Dependências Entre Arquivos

```
App.tsx
  └── src/components/Crossword/index.tsx
       ├── src/hooks/useCrossword.ts
       │    └── src/data/puzzleData.ts
       ├── src/components/Crossword/Cell.tsx
       ├── src/components/Crossword/Clues.tsx
       ├── src/components/Crossword/Crossword.css
       └── Libraries Externas
            ├── framer-motion (Animações)
            ├── lucide-react (Icons)
            └── Tailwind CSS (Estilos)
```

## Padrões Utilizados

| Padrão | Onde | Propósito |
|--------|------|-----------|
| **Custom Hook** | `useCrossword` | Centraliza lógica de jogo e estado |
| **Component Composition** | `Cell`, `Clues` | Reutilização e separação de responsabilidades |
| **Controlled Components** | `Cell` input | React controla o estado das células |
| **Data Layer** | `puzzleData.ts` | Separação de dados de lógica |
| **Context/Props** | Passagem de props | Comunicação entre componentes |

## Fluxo Completo de Execução

1. **Inicialização**
   - App.tsx renderiza Crossword
   - useCrossword inicializa com puzzleData
   - Grid é montado com estado inicial

2. **Interação do Usuário**
   - Clica numa célula → `handleCellClick()`
   - Digita resposta → `handleCellChange()`
   - Clica em dica → `handleClueClick()` + navegação
   - Pressiona hints → `useHint()` revela célula

3. **Validação**
   - Cada entrada é validada em tempo real
   - `correctCells` é atualizado
   - Progress bar reflete o progresso

4. **Conclusão**
   - Quando `correctCells === totalCells`
   - Modal de vitória é exibido
   - Tempo final é mostrado
   - Opção para resetar jogo
