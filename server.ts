import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Port 3000 is required by AI Studio runtime environment behind Nginx
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000;
const host = '0.0.0.0';

// Parse JSON body
app.use(express.json());

// API health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const publicPath = path.resolve(__dirname, 'public');

  // If built dist directory exists, serve static production files
  if (fs.existsSync(distPath)) {
    console.log(`Serving static production build from ${distPath}`);
    app.use(express.static(distPath));
    
    // Also serve public files directly if needed
    if (fs.existsSync(publicPath)) {
      app.use(express.static(publicPath));
    }

    // SPA fallback: any GET route not matching a static file returns index.html
    app.get('*', (_req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('index.html not found. Run npm run build first.');
      }
    });
  } else {
    // In development mode, mount Vite middleware
    console.log('Running with Vite development middleware...');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, host, () => {
    console.log(`VELOOP Rewards server listening on http://${host}:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
