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

app.config(["onScrollClassConfigProvider",
 function(onScrollClassConfigProvider) {
   onScrollClassConfigProvider.config = {
     offset: 420
   }
}]);

app.run(["$rootScope", "$timeout", function($rootScope, $timeout) {
  $rootScope.pageLoaded = false;
  $rootScope.loadTimeoutReached = false;

  $rootScope.setPageLoaded = function(bool) {
    $rootScope.pageLoaded = bool;
  }

  $timeout(function() {
    $rootScope.loadTimeoutReached = true;
  }, 2000);
}]);
