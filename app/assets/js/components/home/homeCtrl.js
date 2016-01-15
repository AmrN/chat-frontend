module.exports = ["$scope", function($scope) {
  $scope.navbarToggled = false
  $scope.setNavbarToggled = function(state) {
    $scope.navbarToggled = state;
  }
}];
