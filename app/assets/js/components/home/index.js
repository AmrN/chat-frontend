var app = require('angular').module('myApp');

app.directive("home", require("./home"));
app.directive("logout", require("./logout"));
app.directive("newChatroom", require("./new-chatroom"));
app.directive("subscriptions", require("./subscriptions"));
app.directive("friends", require("./friends"));
app.directive("chat", require("./chat"));
app.directive("homeSidebar", require("./home-sidebar"));
