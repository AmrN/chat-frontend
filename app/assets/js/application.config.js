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
}]);

// configuring restangular
app.config(['RestangularProvider', 'constants', function(RestangularProvider, constants) {
  var rp = RestangularProvider;
  var humps = require('humps');

  rp.setBaseUrl(constants.apiBaseUrl);

  // camelize server response
  rp.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
    return humps.camelizeKeys(data);
  });

  // decamilize data sent to server
  rp.addRequestInterceptor(function (data, operation, what, url, response, deferred) {
    // console.log("in interceptor:\n" + "data: " + data + "\noperation: " + operation + "\nwhat: " + what + "\nurl: " + url + "\nresponse: " + response + "\ndeferred: " + deferred);
    return humps.decamelizeKeys(data);
  });

}]);


// configuring onScrollClass
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
