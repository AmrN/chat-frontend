var ActionCable = require('./action_cable');

module.exports = [ function() {
  var app;

  this.createConsumer = function(url, params) {
    url = urlWithParams(url, params);
    app = ActionCable.createConsumer(url);
    // console.log(app);
  }

  this.disconnect = function() {
    // TODO: figure out a way to do this correctly
    this.getApp().connection.close();
    this.getApp().connection.disconnect();
    this.getApp().connectionMonitor.stop();
    app = null;
  }

  this.getApp = function() {
    // console.log('here');
    return app;
  }

  this.connected = function() {
    return !this.getApp().connection.disconnected;
  }



  function urlWithParams(url, paramsObj) {
    if (paramsObj) {
      url += '?' + objToUrlParams(paramsObj);
    }
    return url;
  }

  function objToUrlParams(obj) {
    var str = "";
    for (var key in obj) {
      if (str != "") {
          str += "&"
      }
      str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
  }
}];
