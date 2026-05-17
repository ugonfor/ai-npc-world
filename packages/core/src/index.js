import { startPlaygroundWorld } from './main.js';

let started = false;

export const PlaygroundWorld = {
  init(config = {}) {
    if (started) {
      console.warn('[ai-npc-world] init() already called; ignoring repeat call.');
      return;
    }
    started = true;

    if (config.firebase) window.PG_FIREBASE_CONFIG = config.firebase;
    if (config.llmApiUrl) window.PG_LLM_API_URL = config.llmApiUrl;
    if (config.turnstileSiteKey) window.PG_TURNSTILE_SITE_KEY = config.turnstileSiteKey;
    if (config.locale) {
      try { localStorage.setItem('playground_lang', config.locale); } catch { /* storage blocked */ }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startPlaygroundWorld, { once: true });
    } else {
      startPlaygroundWorld();
    }
  },
};

if (typeof window !== 'undefined') {
  window.PlaygroundWorld = PlaygroundWorld;
}

export default PlaygroundWorld;
