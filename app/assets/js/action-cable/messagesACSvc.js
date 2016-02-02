module.exports =  ['actionCableSvc', '$rootScope', function(actionCableSvc,  $rootScope) {
  var channel;
  var channelObj = {
    connected: function() {
      // alert('connected');
    },
    disconnected: function() {
      // alert('disconnected');
    },
    received: function(data) {
      // alert(JSON.stringify(data));
      $rootScope.$apply(function() {
        $rootScope.$broadcast('messagesChannel.received', data);
      });

    },
    speak: function(content) {
      this.perform('speak', {message: {content: content}});
    }
  }

  this.subscribe = function() {
    var app = actionCableSvc.getApp();
    channel = app.subscriptions.create('MessagesChannel', channelObj);
  }

  this.unsubscribe = function() {
    var app = actionCableSvc.getApp();
    app.subscriptions.remove(channel);
    chanenl = null;
  }

  this.speak = function(content) {
    channel.speak(content);
  }
}];
