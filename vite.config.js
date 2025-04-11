import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    middlewareMode: false,
    setup: (app) => {
      app.use((req, res, next) => {
        if (req.url === '/proof') {
          res.sendFile('/proof.html', { root: './public' });
        } else {
          next();
        }
      });
    },
  },
})
  