module.exports = ['constants', 'authSvc', 'userRes', function(constants, authSvc, userRes) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'home/friends.tpl.html',
    link: function($scope) {
      $scope.currentUser = authSvc.currentUser();
      $scope.friends = [];
      $scope.currentUser.then(function(user) {
        $scope.currentUser = user;
         $scope.friends = userRes.query_friends({userId: $scope.currentUser.id});
      });

      $scope.$on('user.friended', function(e, user) {
        $scope.friends.push(user);
      });

      $scope.$on('user.unfriended', function(e, user) {
        for (var i=0; i < $scope.friends.length; i++) {
          var friend = $scope.friends[i];
          if (friend.id == user.id) {
            $scope.friends.splice(i, 1);
            break;
          }
        }
      });
    }
  }
}];
