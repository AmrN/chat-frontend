module.exports = ['constants', 'notifSvc', 'chatroomSvc', '$rootScope', 'userRes', '$state', '$timeout', function(constants, notifSvc, chatroomSvc, $rootScope, userRes, $state, $timeout) {
  return {
    scope: true,
    replace: true,
    templateUrl: constants.templatesBaseUrl + 'chatroom/chatroom.tpl.html',
    link: function($scope, element) {
      var chatroomId = $scope.stateParams.chatroomId;
      $scope.chatroomId = chatroomId;

      var shouldScroll = true;

      var chatroomObj = chatroomSvc.openRoom(chatroomId);
      $scope.chatroom = chatroomObj.chatroom;
      $scope.messages = chatroomObj.messages;
      $scope.chatroom.$promise.then(function() {
        if ($scope.chatroom.oneToOne) {
          $scope.acquaintance = userRes.get(
            {userId: $scope.chatroom.acquaintanceship.acquaintanceId}
          );
        }
      });

      $scope.currentMessage = {};
      $scope.sendMessage = function() {
        chatroomSvc.sendMessage(chatroomId, $scope.currentMessage.content);
        $scope.currentMessage = {};
      }

      $scope.loadOlderMessages = function() {
        chatroomSvc.loadOlderMessages(chatroomId);
      }

      $scope.subscribe = function() {
        $scope.chatroom.$subscribe(function() {
          $rootScope.$broadcast('chatroom.subscribe', $scope.chatroom);
        });
      }
      $scope.unsubscribe = function() {
        $scope.chatroom.$unsubscribe(function() {
          $rootScope.$broadcast('chatroom.unsubscribe', $scope.chatroom);
        });
      }

      $scope.addFriend = function(friendId) {
        $scope.acquaintance.$friend(function() {
          $rootScope.$broadcast('user.friended', $scope.acquaintance);
        });
      }

      $scope.removeFriend = function(friendId) {

        $scope.acquaintance.$unfriend(function() {
          $rootScope.$broadcast('user.unfriended', $scope.acquaintance);
        });
      }

      $scope.openUserChatroom = function(userId) {
        var acquaintanceship = userRes.acquaintanceship({userId: userId}, function() {
          $state.go('home.chat.chatrooms', {chatroomId: acquaintanceship.chatroomId});
        });
      }

      $scope.processKeyInput = function(ev) {
        if (ev.keyCode == 13 && !ev.shiftKey)  {
          ev.stopPropagation(); $scope.sendMessage();
        }
      }

      $scope.scrollMessagesContainer = function() {
        $timeout(function() {
          var messagesContainer = $(element).find('.CR_messages').eq(0);
          var maxScroll = messagesContainer[0].scrollHeight - messagesContainer.innerHeight();
          var unscrolledDistance = maxScroll - messagesContainer.scrollTop();

          if (shouldScroll || unscrolledDistance < messagesContainer.innerHeight()) {
                  messagesContainer.scrollTop(maxScroll);
                  shouldScroll = false;
          }
        }, 0);
      }
    }
  }
}];
