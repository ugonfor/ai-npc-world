// Copy this file to firebase.config.js and fill in your values.
// firebase.config.js is gitignored so your real keys never get committed.
//
// llmApiUrl is required for AI dialogue. Run the proxy locally:
//   GOOGLE_API_KEY=your_key npx @ugonfor/ai-npc-world-server
// or skip it — the game still works, NPCs just fall back to canned lines.
//
// firebase is optional. Without it, the village is single-player.

window.AI_NPC_WORLD_CONFIG = {
  llmApiUrl: 'http://127.0.0.1:8787/api/npc-chat',

  // firebase: {
  //   apiKey: 'YOUR_API_KEY',
  //   authDomain: 'YOUR_PROJECT.firebaseapp.com',
  //   databaseURL: 'https://YOUR_PROJECT.firebaseio.com',
  //   projectId: 'YOUR_PROJECT',
  // },
};
