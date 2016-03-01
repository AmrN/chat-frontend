var app = require('angular').module('myApp');

app.directive("home", require("./home"));
app.directive("logout", require("./logout"));
app.directive("newChatroom", require("./new-chatroom"));
