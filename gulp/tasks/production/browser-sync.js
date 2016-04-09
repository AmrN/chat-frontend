var gulp        = require("gulp");
var browsersync = require("browser-sync");
var proxyMiddleware = require('http-proxy-middleware');
var config      = require("../../config").browsersync.production;
var historyApiFallback = require('connect-history-api-fallback');

var proxy = proxyMiddleware('/api', {
                target: 'http://localhost:3000',
                changeOrigin: true   // for vhosted sites, changes host header to match to target's host
            });
config.server.middleware = [proxy, historyApiFallback()];

gulp.task("browsersync:production", ["build:production"], function() {
  browsersync(config);
});
