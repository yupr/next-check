import express, { Request, Response } from 'express';
import next from 'next';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const API_URL = 'http://localhost:8000';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(
    '/api', // 設定したパスが含んだリクエストをプロキシ
    createProxyMiddleware({
      target: API_URL,
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api',
      },
    })
  );

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, (err?: unknown) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
