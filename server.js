// add package
// yarn add express http-proxy-middleware
// add package.json scripts ⇨ "dev:custom": "node server.js",

const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const API_URL = 'http://localhost:8000'; //apiの向き先
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // proxy endpoint
  server.use(
    '/api', // 設定したパスが含んだリクエストをプロキシする
    createProxyMiddleware({
      target: API_URL,
      pathRewrite: {
        '^/api': '/api',
      },
      changeOrigin: true,
    })
  );

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
