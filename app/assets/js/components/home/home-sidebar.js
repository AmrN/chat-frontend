module.exports = ['constants', function(constants, authSvc) {
  return {
    scope: true,
    replace: true,
    templateUrl: constants.templatesBaseUrl + 'home/home-sidebar.tpl.html',
    link: function($scope) {

      $scope.chosenPane = "friends";
    }
  }
}];
