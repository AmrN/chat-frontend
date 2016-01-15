var app = require("angular").module("myApp");

app.config(["$routeProvider", "$locationProvider",
 function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'assets/js/components/home/home.html',
    controller: 'HomeCtrl',
  })

  // configure html5 to get links working on jsfiddle
  // $locationProvider.html5Mode(true);
}]);

app.run(["$rootScope", function($rootScope) {
  $rootScope.pageLoaded = false;
  $rootScope.setPageLoaded = function(bool) {
    $rootScope.pageLoaded = bool;
  }
}]);
