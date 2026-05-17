import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'PlaygroundWorld',
      fileName: (format) => {
        if (format === 'iife') return 'ai-npc-world.iife.js';
        if (format === 'es') return 'ai-npc-world.mjs';
        return `ai-npc-world.${format}.js`;
      },
      formats: ['iife', 'es'],
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        exports: 'named',
      },
    },
  },
});
