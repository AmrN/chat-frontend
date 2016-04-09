module.exports = ['constants', 'chatroomRes', function(constants, chatroomRes) {
  return {
    scope: true,
    replace: true,
    templateUrl: constants.templatesBaseUrl + 'home/chat.tpl.html',
    link: function($scope) {
      $scope.rooms = chatroomRes.query();
      $scope.$on('chatroom.created', function(e, chatroom) {
        $scope.rooms.push(chatroom);
      });
    }
  }
}];
