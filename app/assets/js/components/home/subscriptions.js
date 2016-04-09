module.exports = ['constants', 'authSvc', function(constants, authSvc) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'home/subscriptions.tpl.html',
    link: function($scope) {
      authSvc.currentUser().then(function(currentUser) {
        $scope.currentUser = currentUser;
      });

      $scope.$on('chatroom.subscribe', function(e, subscribedRoom) {
        $scope.currentUser.subscriptions.push(subscribedRoom);
      });

      $scope.$on('chatroom.unsubscribe', function(e, unsubscribedRoom) {
        for (var i=0; i < $scope.currentUser.subscriptions.length; i++) {
          var chatroom = $scope.currentUser.subscriptions[i];
          if (chatroom.id == unsubscribedRoom.id) {
            $scope.currentUser.subscriptions.splice(i, 1);
            break;
          }
        }
      });
    }
  }
}];
