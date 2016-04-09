module.exports = ['chatroomsACSvc', 'chatroomRes', '$rootScope', function(chatroomsACSvc, chatroomRes, $rootScope) {
  var openedRooms = {};
  var that = this;
  this.openRoom = function(chatroomId) {
    if (openedRooms[chatroomId]) {
      return openedRooms[chatroomId];
    }
    var chatroomObj = {};
    chatroomObj.chatroom = chatroomRes.get({chatroomId: chatroomId});
    chatroomObj.messages = chatroomRes.queryMessages({chatroomId: chatroomId});

    chatroomObj.chatroom.$promise.then(function() {
      chatroomsACSvc.subscribe(chatroomId);
      chatroomObj._listenerDeregistration = $rootScope.$on('chatroom_' + chatroomId + '.received', function(e, data) {
        chatroomObj.messages.push(data);
      });

      openedRooms[chatroomId] = chatroomObj;
      $rootScope.$broadcast('chatroom.opened', chatroomObj.chatroom);
    });
    return chatroomObj;
  }

  this.closeRoom = function(chatroomId) {
    var chatroomObj = openedRooms[chatroomId];
    chatroomsACSvc.unsubscribe(chatroomId);
    chatroomObj._listenerDeregistration();
    delete openedRooms[chatroomId];
  }

  this.sendMessage = function(chatroomId, content) {
    chatroomsACSvc.speak(chatroomId, content);
  }

  this.loadOlderMessages = function(chatroomId) {
    var chatroom = openedRooms[chatroomId];
    var oldestId = angular.isDefined(chatroom.messages[0]) ? chatroom.messages[0].id : null;
    var messagesToPrepend = chatroomRes.queryMessages({beforeId: oldestId, chatroomId: chatroomId}, function() {
      for (var i = messagesToPrepend.length - 1; i >= 0; i--) {
        chatroom.messages.unshift(messagesToPrepend[i]);
      }
    });
  }


  $rootScope.$on('auth.logout.success', function() {
    for (var roomId in openedRooms) {
      if (openedRooms.hasOwnProperty(roomId)) {
        that.closeRoom(roomId);
      }
    }
  })
}];
