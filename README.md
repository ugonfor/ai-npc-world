# ai-npc-world

> A living village of AI NPCs that remember you.

`ai-npc-world` is a drop-in browser engine for AI-driven open-world villages. You get a 3D town with autonomous NPCs that have moods, needs, schedules, and a real conversational memory — backed by an LLM (Google Gemini by default) and synced across visitors via Firebase. The village runs in real time, even when you're not looking.

**Live demo:** [ugonfor.kr/playground](https://ugonfor.kr/playground)

## Why

Most AI NPC demos are one-off chat boxes. This is different:

- **NPCs remember you.** Conversations are persisted and recalled. Come back tomorrow and Yujin will mention the bread you brought yesterday.
- **The world keeps living without you.** Time is 1:1 with real Seoul time, weather mirrors real Seoul weather, NPCs walk to work, eat, get tired.
- **No numbers.** No affinity bars, no XP, no shop. Relationships show through tone, posture, and what NPCs choose to tell you.
- **Multiplayer-aware.** Other visitors appear as characters with names. NPC memory is shared — Hyogon remembers what *anyone* did.

## Packages

This repo is a monorepo with two npm packages:

| Package | What it is |
|---|---|
| [`@ugonfor/ai-npc-world`](./packages/core) | Browser engine. Three.js renderer, NPC AI, multiplayer client, UI. |
| [`@ugonfor/ai-npc-world-server`](./packages/server) | Node.js LLM proxy. Talks to Google Gemini; zero npm deps. |

## Quick start (CDN)

The fastest path: load from a CDN, init with your config.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ugonfor/ai-npc-world/styles/playground.css" />

<!-- copy the DOM scaffold from examples/basic/index.html into <body> -->

<script src="https://cdn.jsdelivr.net/npm/@ugonfor/ai-npc-world"></script>
<script>
  PlaygroundWorld.init({
    llmApiUrl: 'https://your-llm-proxy.example.com/api/npc-chat',
    firebase: {
      apiKey: '...',
      authDomain: '...',
      databaseURL: '...',
      projectId: '...',
    },
    locale: 'en',
  });
</script>
```

You'll also need the LLM proxy running somewhere — see [packages/server](./packages/server).

## Quick start (local)

```bash
git clone https://github.com/ugonfor/ai-npc-world.git
cd ai-npc-world
npm install
npm run build

# in one terminal: the LLM proxy
GOOGLE_API_KEY=your_gemini_key npm start --workspace=@ugonfor/ai-npc-world-server

# in another: the example page
npx serve examples/basic -l 4000
```

Open http://localhost:4000.

See [examples/basic/README.md](./examples/basic/README.md) for Firebase wiring.

## `init(config)` options

| Field | Type | Required | Purpose |
|---|---|---|---|
| `llmApiUrl` | `string` | recommended | URL of your LLM proxy. Without it, NPCs fall back to canned lines. |
| `firebase` | `object` | optional | Firebase Realtime DB config. Without it, the village is single-player. |
| `locale` | `'en' \| 'ko'` | optional | UI language (default: `'en'`). |
| `turnstileSiteKey` | `string` | optional | Cloudflare Turnstile site key for proxy auth. |

## Architecture

```
┌────────────────────┐      ┌──────────────────────┐      ┌────────────┐
│ browser            │      │ LLM proxy            │      │ Gemini API │
│ @ugonfor/          │────► │ @ugonfor/            │────► │            │
│ ai-npc-world       │      │ ai-npc-world-server  │      └────────────┘
│ (Three.js + UI)    │      │ (Node, zero deps)    │
└─────────┬──────────┘      └──────────────────────┘
          │
          ▼
┌────────────────────┐
│ Firebase RTDB      │
│ (multiplayer,      │
│  shared NPC memory)│
└────────────────────┘
```

- **Host authority:** the first player becomes the simulation host and runs NPC AI; auto-succession when the host leaves.
- **Shared memory:** every NPC interaction is persisted under `playground/npc-memory/{npcId}` and recalled on future conversations.
- **Structured LLM output:** Gemini returns `{ reply, suggestions, tags }`; action tags like `[follow]` or `[guide:cafe]` drive in-world behavior.

## Project status

`v0.1.0` — first public release. Pulled out of [ugonfor/ugonfor.github.io](https://github.com/ugonfor/ugonfor.github.io) where it was developed as a personal homepage feature. Expect rough edges. PRs welcome.

## Contributing

```bash
npm install
npm run build           # build all workspaces
npm run dev             # vite watch for packages/core
```

Open issues and PRs at https://github.com/ugonfor/ai-npc-world.

## License

MIT — see [LICENSE](./LICENSE).
