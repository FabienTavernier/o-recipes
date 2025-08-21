/// <reference types="vitest/config" />
// ci-dessus on importe les types de Vitest,
// utile pour récupérer la propriété `test` pour configurer l'environnement de test
// NOTE ne pas oublier le `/` à la fin de la balise
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    globals: true,
    // spécifier l'environnement
    environment: 'jsdom',
    // charge des outils supplémentaires
    setupFiles: ['./setupTests.ts'],
  },
});
