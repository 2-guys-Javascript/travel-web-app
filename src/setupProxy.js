// 본 파일은 다른 url로의 요청을 보낼 때 CORS 문제를 해결해주기 위한 것입니다.
// 특정 함수(미들웨어)를 만들고 해당 미들웨어를 module.exports로 내보내어 많은 요청에 적용될 수 있게합니다.

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v6',
    createProxyMiddleware({
      target: 'https://v6.exchangerate-api.com',
      changeOrigin: true,
    })
  );
};
