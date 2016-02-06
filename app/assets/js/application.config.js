var app = require("angular").module("myApp");


// configuring routes
app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider",
 function($urlRouterProvider, $locationProvider, $stateProvider) {
  // $routeProvider
  //  .when('/', {
  //   templateUrl: 'assets/js/components/home/home.html',
  //   controller: 'HomeCtrl',
  // })

  var templatesBaseUrl = 'assets/js/components/';
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: templatesBaseUrl + 'home/home.html',
      controller: 'HomeCtrl'
    })
    .state('chatroom', {
      url: '/chatroom',
      templateUrl: templatesBaseUrl + 'chatroom/chatroom.html',
      controller: 'ChatroomCtrl'
    })
    .state('about', {
      url: '/about',
      resolve: {
        promiseObj: ['$timeout', function($timeout) {
          return $timeout(function() {console.log('in here')}, 3000);
        }]
      },
      template: 'about template'
    })

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

// configuing authentication
app.config(['authSvcProvider', 'constants', function(authSvcProvider, constants) {
  authSvcProvider.config = {
    authTokenUrl: constants.apiBaseUrl + "/auth/auth_token"
  }
}]);

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authHttpInterceptor');
  $httpProvider.interceptors.push('camelHttpInterceptor');
}]);


// configuring onScrollClass
app.config(["onScrollClassConfigProvider",
 function(onScrollClassConfigProvider) {
   onScrollClassConfigProvider.config = {
     offset: 420
   }
}]);

app.run(["$rootScope", "$timeout", "notifSvc", function($rootScope, $timeout, notifSvc) {
  $rootScope.pageLoaded = false;
  $rootScope.loadTimeoutReached = false;

  $rootScope.setPageLoaded = function(bool) {
    $rootScope.pageLoaded = bool;
  }

  $timeout(function() {
    $rootScope.loadTimeoutReached = true;
  }, 2000);
  $rootScope.notifications = notifSvc.get('global');
}]);
