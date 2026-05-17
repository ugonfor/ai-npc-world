# @ugonfor/ai-npc-world-server

LLM proxy server for [ai-npc-world](https://github.com/ugonfor/ai-npc-world). Talks to Google Gemini, exposes a small HTTP API the game client uses for NPC dialogue, weather, and a shared world-NPC roster.

Zero npm dependencies — uses Node 18+ built-ins only.

## Install & run

```bash
npm install -g @ugonfor/ai-npc-world-server

GOOGLE_API_KEY=your_key ai-npc-world-server
```

Or run from source:

```bash
git clone https://github.com/ugonfor/ai-npc-world.git
cd ai-npc-world/packages/server
GOOGLE_API_KEY=your_key npm start
```

Server listens on `127.0.0.1:8787` by default. Override with `PORT` / `HOST`.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `GOOGLE_API_KEY` | (required) | Google AI Studio key for Gemini |
| `PORT` | `8787` | Listen port |
| `HOST` | `127.0.0.1` | Listen host (auto `0.0.0.0` on Cloud Run) |
| `MODEL_CHAIN` | `gemini-2.5-flash,gemini-3-flash-preview,gemini-2.5-flash-lite,gemma-4-31b-it` | Fallback chain |
| `ALLOWED_ORIGINS` | `http://localhost:4000,...` | CORS allowlist (comma-separated) |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window per IP |
| `RATE_LIMIT_MAX` | `90` | Requests per window |
| `MAX_BODY_BYTES` | `1000000` | Max request body size |
| `PROXY_AUTH_TOKEN` | (none) | Optional shared secret; if set, clients must send `Authorization: Bearer <token>` |
| `OPENWEATHER_API_KEY` | (none) | Optional, enables `/api/weather` |
| `TURNSTILE_SECRET_KEY` | (none) | Optional Cloudflare Turnstile verification |
| `SHARED_STATE_FILE` | `/tmp/playground-shared-state.json` | World-NPC roster persistence |
| `AUDIT_LOG_BUCKET` | (none) | Optional GCS bucket for prompt/response audit logs |

## Endpoints

- `POST /api/npc-chat` — non-streaming NPC reply
- `POST /api/npc-chat-stream` — streaming NPC reply (SSE)
- `GET  /api/world-npcs` — fetch shared world-NPC roster
- `POST /api/world-npcs` — update shared world-NPC roster
- `GET  /api/weather` — Seoul weather snapshot (when `OPENWEATHER_API_KEY` set)

## Docker

```bash
docker build -t ai-npc-world-server .
docker run -e GOOGLE_API_KEY=your_key -p 8787:8787 ai-npc-world-server
```

## Firebase rules

`firebase-rules.json` ships with reference rules for the multiplayer/memory features (host election, NPC sync, shared memory). Apply them in your Firebase Realtime Database project if you want multiplayer.

## License

MIT
