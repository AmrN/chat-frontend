module.exports = ['constants', '$rootScope', function(constants, $rootScope) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'global-notifications/global-notifications.tpl.html'
    // link: function($scope) {
    //   $scope.globalNotifications = $rootScope.globalNotifications;
    //   console.log($scope.globalNotifications);
    //   console.log('here');
    // }
  }
}];
