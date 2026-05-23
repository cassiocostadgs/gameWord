<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1aZxr69zSUF1ghw62RQsFUFRo1yV-NWhK

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Create a `.env` file from `.env.example` and fill in your Supabase Cloud values
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Run the backend proxy server:
   `npm run server`
4. Run the frontend app:
   `npm run dev`

## Supabase Cloud Setup

1. Create a project at https://app.supabase.com.
2. In the project, go to Settings → API.
3. Copy the `Project URL` into `SUPABASE_URL` and `VITE_SUPABASE_URL`.
4. Copy the `Service Role Key` into `SUPABASE_SERVICE_KEY`.
5. Copy the `anon public` key into `VITE_SUPABASE_ANON_KEY`.

## Test the history endpoint

With `npm run server` running, use:

```bash
curl -v -X POST http://localhost:4000/api/game-history \
  -H "Content-Type: application/json" \
  -d '{"durationSeconds":120,"hintsUsed":1,"totalCells":42,"correctCells":42,"completedAt":"2026-05-23T12:00:00Z"}'
```

If the request succeeds, the response JSON is your evidence of insertion.
