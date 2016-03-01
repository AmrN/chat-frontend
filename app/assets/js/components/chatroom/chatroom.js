module.exports = ['constants', 'notifSvc', 'chatroomsACSvc', 'chatroomRes',  function(constants, notifSvc, chatroomsACSvc, chatroomRes) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'chatroom/chatroom.tpl.html',
    link: function($scope) {
      var chatroomId = $scope.stateParams.chatroomId;
      $scope.chatroom = chatroomRes.get({chatroomId: chatroomId});
      chatroomsACSvc.subscribe(chatroomId);

      $scope.messages = [];
      $scope.$on('chatroom_' + chatroomId + '.received', function(e, data) {
        // console.log(chatroomId);
        $scope.messages.push(data);
      });

      $scope.$on('$destroy', function() {
        chatroomsACSvc.unsubscribe(chatroomId);
      });


      $scope.currentMessage = {};
      $scope.sendMessage = function() {
        chatroomsACSvc.speak(chatroomId, $scope.currentMessage.content);
        $scope.currentMessage = {};
      }

      $scope.loadOlderMessages = function() {
        var oldestId = angular.isDefined($scope.messages[0]) ? $scope.messages[0].id : null;
        var messagesToPrepend = chatroomRes.queryMessages({beforeId: oldestId, chatroomId: chatroomId}, function() {
          $scope.messages = messagesToPrepend.concat($scope.messages);
        });
      }
    }
  }
}];
