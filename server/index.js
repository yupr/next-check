const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
// const morgan = require('morgan');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const API_URL = 'http://localhost:8000';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(
    '/api', // 設定したパスが含んだリクエストをプロキシする
    createProxyMiddleware({
      target: API_URL,
      logLevel: 'debug',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v1',
        // '/api' ⇨ 'http://localhost:8000/api/v1'
      },
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
