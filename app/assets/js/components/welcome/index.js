var app = require('angular').module('myApp');

app.directive("welcome", require("./welcome"));
app.directive("login", require("./login"));
app.directive("register", require("./register"));
app.directive("guestLogin", require("./guest-login"));
