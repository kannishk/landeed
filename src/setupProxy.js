// src/setupProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    `http://api.timezonedb.com/v2.1/get-time-zone?key=I1D9WHY762ZI&format=json&by=zone&zone=${selectedTimeZone}`,
    createProxyMiddleware({
      target: "landeed.vercel.com", // Specify your backend server URL here
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' from the request path
      },
    })
  );
};
