module.exports = ['constants', 'userRes', 'notifSvc', function(constants, userRes, notifSvc) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'welcome/register.tpl.html',
    link: function($scope) {
      $scope.user = {};

      $scope.registerUser = function() {
        var user = new userRes($scope.user);
        user.$save().then(function() {
          notifSvc.add('global', {message: 'Your account has been created successfully', class: 'success'}, 4000);
        }, function() {
          notifSvc.add('global', {message: "Registration failed :(", class: 'error'}, 4000);
        });

        $scope.user = {};
      }
    }
  }
}];
