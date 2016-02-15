module.exports = ['constants', 'userRes', function(constants, userRes) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'welcome/register.tpl.html',
    link: function($scope) {
      $scope.user = {};

      $scope.registerUser = function() {
        var user = new userRes($scope.user);
        user.$save();

        // userRes.create({user: $scope.registerUser});
        $scope.registerUser = {};
      }
    }
  }
}];
