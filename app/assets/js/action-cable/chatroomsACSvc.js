module.exports =  ['actionCableSvc', '$rootScope', function(actionCableSvc,  $rootScope) {
  var channels = {};
  var channelObj = function(id) {
    return {
      id: id,
      connected: function() {
        // alert('connected');
      },
      disconnected: function() {
        // alert('disconnected');
      },
      received: function(data) {
        var _this = this;
        $rootScope.$apply(function() {
          $rootScope.$broadcast('chatroom_' + _this.id + '.received', data);
          // alert(JSON.stringify(data));
        });

      },
      speak: function(content) {
        this.perform('speak', {message: {content: content}});
      }
    }

  }

  this.subscribe = function(chatroomId) {
    var app = actionCableSvc.getApp();
    channels[chatroomId] = app.subscriptions.create({channel: 'ChatroomsChannel', 'chatroom_id': chatroomId}, channelObj(chatroomId));
  }

  this.unsubscribe = function(chatroomId) {
    var app = actionCableSvc.getApp();
    app.subscriptions.remove(channels[chatroomId]);
    delete channels[chatroomId];
  }

  this.speak = function(chatroomId, content) {
    channels[chatroomId].speak(content);
  }
}];
