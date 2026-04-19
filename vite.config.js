import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        about:    resolve(__dirname, 'pages/about.html'),
        skills:   resolve(__dirname, 'pages/skills.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        lab:      resolve(__dirname, 'pages/lab.html'),
        journey:  resolve(__dirname, 'pages/journey.html'),
        contact:  resolve(__dirname, 'pages/contact.html'),
      },
    },
  },
});
