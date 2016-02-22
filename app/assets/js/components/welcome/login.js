module.exports = ['constants', 'authSvc', 'notifSvc', function(constants, authSvc, notifSvc) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'welcome/login.tpl.html',
    link: function($scope) {
      $scope.user = {};

      $scope.loginUser = function() {
        // console.log(authSvc);
        authSvc.login($scope.user.username, $scope.user.password, $scope.user.rememberMe);
      };

      $scope.$on('auth.login.success', function() {
        $scope.loggedInUser = authSvc.currentUser();
        // console.log($scope.loggedInUser);
        // actionCableSvc.createConsumer(constants.cableBaseUrl,
        //   {auth_token: authSvc.getToken()});

        notifSvc.add('global', {message: 'logged in successfully :)', class: 'success'}, 4000);
        // $state.go('chatroom');
      });

      $scope.$on('auth.login.error', function() {
        // console.log('login error');
        notifSvc.add('global', {message: "login failed :(", class: 'error'}, 6000);
      });
    }
  }
}];
