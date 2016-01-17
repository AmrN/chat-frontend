var app = require('angular').module('myApp');
app.provider("onScrollClassConfig", require("./onScrollClassConfig"));
app.directive("onScrollClass", require("./onScrollClassDirective"));
