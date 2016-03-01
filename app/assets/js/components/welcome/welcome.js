module.exports = ['constants', 'authSvc', '$state', function(constants, authSvc, $state) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'welcome/welcome.tpl.html',
    link: function($scope) {
      if (authSvc.loggedIn()) {
        $state.go('home');
      }
    }
  }
}];
