module.exports = ["$scope", '$state', "actionCableSvc", "$interval", "authSvc", "userRes", "constants", "notifSvc", function($scope, $state, actionCableSvc, $interval, authSvc, userRes, constants, notifSvc) {

  $scope.guest = {};
  $scope.user = {};
  $scope.registerUser = {};

  $scope.users = [];
  $scope.getUsers = function() {
    $scope.users = userRes.query();
  }

  $scope.register = function() {
    var user = new userRes($scope.registerUser);
    user.$save();

    // userRes.create({user: $scope.registerUser});
    $scope.registerUser = {};
  }

  $scope.loginGuest = function() {
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

    notifSvc.add('global', {message: 'logged in successfully :)', class: 'success'}, 6000);
    // $state.go('chatroom');
  });

  $scope.$on('auth.login.error', function() {
    notifSvc.add('global', {message: "login failed :(", class: 'error'}, 6000);
  })

  $scope.$on('auth.logout.success', function() {
    notifSvc.add('global', {message: "Bye Bye :'(", class: 'success'}, 6000);
  })
}];
