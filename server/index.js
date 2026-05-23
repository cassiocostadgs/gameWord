import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 4000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_KEY must be configured in the environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/game-history', async (req, res) => {
  const { durationSeconds, hintsUsed, totalCells, correctCells, completedAt } = req.body;

  if (
    typeof durationSeconds !== 'number' ||
    typeof hintsUsed !== 'number' ||
    typeof totalCells !== 'number' ||
    typeof correctCells !== 'number' ||
    typeof completedAt !== 'string'
  ) {
    return res.status(400).json({ error: 'Payload inválido para histórico de jogo.' });
  }

  // Map incoming camelCase fields to snake_case columns in the database
  const { data, error } = await supabase
    .from('game_history')
    .insert([{
      duration_seconds: durationSeconds,
      hints_used: hintsUsed,
      total_cells: totalCells,
      correct_cells: correctCells,
      completed_at: completedAt,
    }]);

  if (error) {
    console.error('Supabase insert error:', error);
    return res.status(500).json({ error: 'Falha ao salvar histórico de jogo.' });
  }

  res.status(201).json(data);
});

app.listen(port, () => {
  console.log(`Supabase proxy server running on http://localhost:${port}`);
});
