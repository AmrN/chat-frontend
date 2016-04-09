module.exports = ['constants', 'chatroomSvc', '$state', function(constants, chatroomSvc, $state) {
  return {
    scope: true,
    replace: true,
    templateUrl: constants.templatesBaseUrl + 'opened-chatrooms/opened-chatrooms.tpl.html',
    link: function($scope, element) {
      $scope.openedRooms = [];
      $scope.currentRoomId = null;

      $scope.$on('chatroom.opened', function(e, chatroom) {
          $scope.openedRooms.unshift(chatroom);
      });

      $scope.closeRoom = function(roomId) {
        chatroomSvc.closeRoom(roomId);
        removeOpenedRoom(roomId);

        if ($state.is('home.chat.chatrooms', {chatroomId: roomId})) {
          if ($scope.openedRooms.length > 0) {
            $state.go('home.chat.chatrooms', {chatroomId: $scope.openedRooms[0].id})
          } else {
            $state.go('home');
          }
        }
      };

      $scope.openRoom = function(roomId) {
        $state.go('home.chat.chatrooms', {chatroomId: roomId});
      }

      function removeOpenedRoom(roomId) {
        var rooms = $scope.openedRooms;
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].id == roomId) {
            rooms.splice(i, 1);
            break;
          }
        }
      }
    }
  }
}];
