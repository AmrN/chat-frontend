var app = require('angular').module('myApp');

app.provider("authSvc", require("./authSvc"));
app.factory("authHttpInterceptor", require("./authHttpInterceptor"));
app.service("authStorageSvc", require("./authStorageSvc"));
