var app = require('angular').module('myApp');

app.controller("HomeCtrl", require("./home/homeCtrl"));
app.controller('ChatroomCtrl', require('./chatroom/chatroom'));
require('./welcome');
