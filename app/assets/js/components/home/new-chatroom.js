module.exports = ['constants', 'chatroomRes', 'notifSvc', '$state', '$rootScope', function(constants, chatroomRes, notifSvc, $state, $rootScope) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'home/new-chatroom.tpl.html',
    link: function($scope) {
      $scope.chatroom = {};
      $scope.createChatroom = function() {
        var newChatroom = new chatroomRes($scope.chatroom);
        newChatroom.$save(function() {
          notifSvc.add('global', {message: 'chatroom created successfully'}, 4000);
          $rootScope.$broadcast('chatroom.created', newChatroom);
          $state.go('home.chatrooms', {chatroomId: newChatroom.id});
        }, function() {
          notifSvc.add('global', {message: "Coudln't create chatroom"}, 4000);
        });
      }
    }
  }
}];
