# basic example

A minimal HTML page that drops the `ai-npc-world` engine into a div and starts the game.

## Run

From the repo root:

```bash
npm install
npm run build                        # builds packages/core/dist
cp examples/basic/firebase.config.example.js examples/basic/firebase.config.js
# (optional) edit firebase.config.js with your Firebase + LLM proxy URL

# serve the examples folder (any static server works)
npx serve examples/basic -l 4000
```

Open http://localhost:4000.

## Wire up the LLM proxy (optional but recommended)

In another terminal:

```bash
GOOGLE_API_KEY=your_gemini_key npm start --workspace=@ugonfor/ai-npc-world-server
```

Then in `firebase.config.js` set `llmApiUrl: 'http://127.0.0.1:8787/api/npc-chat'`.

## Wire up Firebase (optional, for multiplayer)

1. Create a Firebase Realtime Database project.
2. Apply the rules in `packages/server/firebase-rules.json`.
3. Uncomment the `firebase` block in `firebase.config.js` with your project values.
