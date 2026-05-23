CREATE TABLE public.game_history (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  duration_seconds integer NOT NULL,
  hints_used integer NOT NULL,
  total_cells integer NOT NULL,
  correct_cells integer NOT NULL,
  completed_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);
