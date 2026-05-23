export interface GameHistoryPayload {
  durationSeconds: number;
  hintsUsed: number;
  totalCells: number;
  correctCells: number;
  completedAt: string;
}

export async function saveGameHistory(history: GameHistoryPayload) {
  const response = await fetch('/api/game-history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(history),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Falha ao salvar histórico de jogo: ${errorText}`);
  }

  return response.json();
}
