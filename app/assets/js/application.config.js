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
    .state('home', {
      url: '/home',
      template: '<home></home>'
    })
    .state('home.chat', {
      url: '/chat',
      template: '<chat></chat>'
    })
    .state('home.chat.chatrooms', {
      url: '/chatrooms/:chatroomId',
      template: '<chatroom></chatroom>'
    })
    .state('home.chat.newchatroom', {
      url: '/newchatroom',
      template: '<new-chatroom></new-chatroom>'
    })
    // .state('home', {
    //   url: '/',
    //   templateUrl: templatesBaseUrl + 'home/home.html',
    //   controller: 'HomeCtrl'
    // })
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
  // $httpProvider.interceptors.push('jsonApiHttpInterceptor');
}]);

app.run(["$rootScope", "$stateParams", "notifSvc",  function($rootScope, $stateParams, notifSvc) {
  $rootScope.globalNotifications = notifSvc.get('global');
  $rootScope.stateParams = $stateParams;
}]);
