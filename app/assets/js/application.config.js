var app = require("angular").module("myApp");


// configuring routes
app.config(["$urlRouterProvider", "$locationProvider", "$stateProvider", "constants",
 function($urlRouterProvider, $locationProvider, $stateProvider, constants) {

  var templatesBaseUrl = constants.templatesBaseUrl;
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('welcome', {
      url: '/',
      template: '<welcome></welcome>'
    })
    // .state('home', {
    //   url: '/',
    //   templateUrl: templatesBaseUrl + 'home/home.html',
    //   controller: 'HomeCtrl'
    // })
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

app.run(["$rootScope", "$stateParams", "notifSvc",  function($rootScope, $stateParams, notifSvc) {
  $rootScope.notifications = notifSvc.get('global');
  $rootScope.stateParams = $stateParams;
}]);
