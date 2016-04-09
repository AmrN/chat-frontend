module.exports = ['constants', 'authSvc', '$state', 'notifSvc', 'actionCableSvc',  function(constants, authSvc, $state, notifSvc, actionCableSvc) {
  return {
    scope: true,
    replace: true,
    templateUrl: constants.templatesBaseUrl + 'home/logout.tpl.html',
    link: function($scope) {
      $scope.logout = function() {
        authSvc.logout();
        actionCableSvc.disconnect();
        notifSvc.add('global', {message: 'You have logged out'}, 4000);
        $state.go('welcome');
      }
    }
  }
}];
