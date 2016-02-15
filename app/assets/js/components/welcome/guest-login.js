module.exports = ['constants', 'authSvc', function(constants, authSvc) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'welcome/guest-login.tpl.html',
    link: function($scope) {
      $scope.guest = {};
      $scope.loginGuest = function() {
        authSvc.loginGuest($scope.guest.username);
      }
    }
  }
}];
