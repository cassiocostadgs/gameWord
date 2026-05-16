# Instruções para Testar IA Crossword

## Visão Geral do Projeto

**IA Crossword** é um jogo educativo de palavras cruzadas temático sobre Inteligência Artificial, desenvolvido com React e TypeScript. O aplicativo corre no navegador como uma SPA (Single Page Application) sem dependência de backend.

**Objetivo:** Ajudar estudantes e entusiastas de IA a memorizar conceitos por meio de um jogo interativo de palavras cruzadas.

---

## Stack de Tecnologia

| Componente | Tecnologia | Versão |
|---|---|---|
| Linguagem | TypeScript | ~5.8.2 |
| Framework UI | React | ^19.2.0 |
| Build Tool | Vite | ^6.2.0 |
| Animações | framer-motion | ^12.23.24 |
| Ícones | lucide-react | ^0.554.0 |
| Gerenciador de pacotes | npm | Compatível com Node.js 22+ |

---

## Estrutura de Pastas

```
gameWord/
├── src/
│   ├── components/
│   │   └── Crossword/
│   │       ├── index.tsx           (componente principal do jogo)
│   │       ├── Cell.tsx             (célula individual do tabuleiro)
│   │       ├── Clues.tsx            (painel de pistas)
│   │       └── Crossword.css        (estilos do jogo)
│   ├── hooks/
│   │   └── useCrossword.ts          (lógica de estado do jogo)
│   ├── data/
│   │   └── puzzleData.ts            (definição das pistas e respostas)
│   ├── App.tsx                      (raiz da aplicação)
│   └── index.tsx                    (ponto de entrada)
├── Contexto/                        (documentação do projeto)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Como Rodar o Projeto

### Instalação
```bash
npm install
```

### Desenvolvimento Local
```bash
npm run dev
```
A aplicação estará disponível em `http://localhost:5173` (ou porta indicada pelo Vite).

### Build para Produção
```bash
npm run build
```

### Visualizar Build
```bash
npm run preview
```

---

## Pontos-Chave do Código

### Hook `useCrossword` (`src/hooks/useCrossword.ts`)
Gerencia todo o estado do jogo:
- **`grid`**: matriz 9x10 com células do tabuleiro
- **`activeCell`**: célula atualmente selecionada
- **`direction`**: navegação horizontal ('row') ou vertical ('col')
- **`isCompleted`**: status de conclusão do jogo
- **`hintsLeft`**: número de dicas restantes (máx: 3)
- **`elapsedSeconds`**: timer do jogo (inicia ao primeiro input)

### Componente `Crossword` (`src/components/Crossword/index.tsx`)
Renderiza:
- Header com título e ícone de cérebro
- Barra de status (timer, progresso, dicas, reset)
- Tabuleiro da grade
- Painel de pistas (horizontal e vertical)
- Modal de vitória com estatísticas

### Dados do Puzzle (`src/data/puzzleData.ts`)
Define:
- 8 pistas totais (4 horizontais, 4 verticais)
- Termos de IA: MODELO, DADOS, PROMPT, REDE, TOKEN, NEURAL, TREINO, BIAS
- Validação de interseções entre palavras cruzadas

---

## O Que Testar

### ✅ Funcionalidade do Tabuleiro
- [ ] Clicar em uma célula a torna ativa
- [ ] Digitar uma letra preenche a célula automaticamente
- [ ] Tecla `Backspace` remove a letra e volta para célula anterior
- [ ] Setas de direção navegam entre células
- [ ] Navegação respeita células bloqueadas
- [ ] Clique duplo em célula ativa alterna entre horizontal/vertical

### ✅ Dinâmica das Pistas
- [ ] Clicar em pista seleciona a palavra correspondente
- [ ] Palavra ativa é destacada no tabuleiro
- [ ] Pista ativa fica destacada no painel

### ✅ Sistema de Dicas
- [ ] Disponíveis até 3 dicas
- [ ] Clique em "Dica" preenche uma letra correta da palavra ativa
- [ ] Dica distingue-se visualmente de letras digitadas pelo jogador
- [ ] Botão desabilita quando dicas esgotam ou jogo termina
- [ ] Contador de dicas atualiza corretamente

### ✅ Timer e Progresso
- [ ] Timer inicia ao primeiro input
- [ ] Formato: MM:SS
- [ ] Barra de progresso reflete % de letras corretas
- [ ] Contador exibe X/Total de letras preenchidas

### ✅ Condição de Vitória
- [ ] Modal aparece quando todas as letras estão corretas
- [ ] Exibe tempo total e dicas usadas
- [ ] Botão "Jogar Novamente" reinicia o jogo

### ✅ Reset
- [ ] Botão reset limpa o tabuleiro
- [ ] Timer e dicas retornam ao estado inicial
- [ ] Modal de vitória desaparece

### ✅ Responsividade
- [ ] Layout funciona em mobile (< 768px)
- [ ] Tabuleiro se redimensiona proporcionalmente
- [ ] Painel de pistas aparece abaixo em mobile
- [ ] Botões e ícones são acessíveis ao toque

### ✅ Validação de Erros
- [ ] Letras incorretas são destacadas em vermelho com animação
- [ ] Letras corretas via input ficam verdes
- [ ] Letras via dica ficam em amarelo/âmbar

---

## Arquitetura e Decisões

| Aspecto | Decisão | Motivo |
|---|---|---|
| **Estado** | Local em hook `useCrossword` | Jogo não requer persistência ou sincronização. |
| **Dados** | Estáticos em `puzzleData.ts` | Puzzle é controlado e não muda dinamicamente. |
| **Backend** | Nenhum | Aplicação cliente-only, sem necessidade de servidor. |
| **Estilos** | CSS direto + Tailwind (inline) | Simplicidade e performance. |
| **Animações** | framer-motion | Feedback visual sem comprometer performance. |

---

## Exemplos de Testes Manuais

### Teste 1: Completar Palavra Horizontalmente
1. Clique na célula (0,0) - primeira célula de MODELO
2. Digite: M, O, D, E, L, O
3. Valide: Palavra MODELO aparece verde

### Teste 2: Usar Dica
1. Clique em célula aleatória
2. Pressione "Dica" 3 vezes
3. Valide: Contador reduz para 0, botão fica desabilitado

### Teste 3: Navegar por Teclado
1. Pressione seta → para avançar horizontalmente
2. Pressione seta ↓ para descer verticalmente
3. Pressione seta ← para voltar
4. Pressione Backspace na célula inicial (não deve voltar)

### Teste 4: Vitória
1. Preencha todas as palavras corretamente (manual ou com dicas)
2. Valide: Modal de vitória aparece com tempo e dicas usadas
3. Clique "Jogar Novamente": jogo reseta

### Teste 5: Responsividade
1. Abra DevTools (F12)
2. Ative modo responsivo (Ctrl+Shift+M)
3. Teste em: iPhone SE (375px), iPad (768px), Desktop (1920px)
4. Valide: Layout se adapta sem quebras

---

## Validações Críticas

### Performance
- [ ] Não há atraso ao digitar
- [ ] Animações são suaves (60 FPS)
- [ ] Sem vazamento de memória (DevTools → Memory)

### Acessibilidade
- [ ] Tabuleiro navegável por teclado
- [ ] Ícones têm labels descritivos
- [ ] Contraste de cores adequado

### Bugs Comuns a Verificar
- [ ] Clique duplo em célula alterna corretamente entre horizontal/vertical
- [ ] Backspace não quebra ao voltar de célula de interseção
- [ ] Dica não preenche letra já correta
- [ ] Timer não reinicia ao clicar em Reset
- [ ] Modal de vitória não aparece com resposta parcial

---

## Recursos Úteis

- **DevTools React**: Inspecione componentes e estado
- **Network tab**: Confirme que não há chamadas de API
- **Console**: Verifique ausência de erros/warnings
- **Lighthouse**: Teste performance e acessibilidade

---

## Próximos Passos

Para melhorias futuras:
1. Gerar puzzles dinamicamente a partir de um dataset
2. Adicionar leaderboard local (localStorage)
3. Exportar resultado como imagem
4. Adicionar modo "Endless" com puzzles aleatórios
5. Suporte a idiomas multilíngues

