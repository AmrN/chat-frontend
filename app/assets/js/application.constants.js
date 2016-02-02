var app = require("angular").module("myApp");

var serverBaseUrl = 'http://192.168.1.3:3000';
app.constant('constants', {
  serverBaseUrl: serverBaseUrl,
  apiBaseUrl   : serverBaseUrl + '/api',
  cableBaseUrl : serverBaseUrl + '/cable'
});
