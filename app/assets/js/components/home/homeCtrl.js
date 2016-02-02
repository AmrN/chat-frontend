module.exports = ["$scope", '$state', "actionCableSvc", "$interval", "authSvc", "userRes", "constants", function($scope, $state, actionCableSvc, $interval, authSvc, userRes, constants) {

  $scope.guest = {};
  $scope.user = {};
  $scope.registerUser = {};

  $scope.users = [];
  $scope.getUsers = function() {
    $scope.users = userRes.index().$object;
  }

  $scope.register = function() {
    userRes.create({user: $scope.registerUser});
    $scope.registerUser = {};
  }

  $scope.loginGuest = function() {
    // actionCableSvc.createConsumer('http://localhost:3000/cable',
    //   {username: $scope.user.username});

    // actionCableSvc.createConsumer(constants.cableBaseUrl,
    //   {username: $scope.guest.username});

    // handle = $interval(function() {
    //   // console.log('in handler');
    //   if (actionCableSvc.connected()) {
    //     $state.go('chatroom');
    //   }
    //   console.log('actioncable.connected?: ' + actionCableSvc.connected());
    //
    // }, 100);
    //
    // $scope.$on('$destroy', function() {
    //   $interval.cancel(handle);
    //   // console.log('here');
    // });
    authSvc.loginGuest($scope.guest.username);
  }

  $scope.loginUser = function() {
    // console.log(authSvc);
    authSvc.login($scope.user.username, $scope.user.password, $scope.user.rememberMe);
  };

  $scope.logout = function() {
    authSvc.logout();
  }

  $scope.$on('auth.login.success', function() {
    // console.log('in success');
    $scope.loggedInUser = authSvc.currentUser();
    console.log($scope.loggedInUser);
    actionCableSvc.createConsumer(constants.cableBaseUrl,
      {auth_token: authSvc.getToken()});

    // $state.go('chatroom');
  });
}];
