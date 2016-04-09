module.exports = function() {
  // authTokenUrl
  this.config = {};

  this.$get = ['$http', '$rootScope', 'authStorageSvc', 'userRes', '$q', function($http, $rootScope, authStorageSvc, userRes, $q) {
    var config = this.config;

    var Auth = function() {
      this.user = null;
    };

    Auth.prototype.login = function(username, password, rememberMe) {
      var authObj = {auth: {username: username, password: password}}
      var authTokenUrl = config.authTokenUrl;
      // authStorageSvc.clearAuthStorage();
      this.logout();
      $http.post(authTokenUrl, authObj).then(
        function(successResponse) {
          var authToken = successResponse.data['jwt'];
          // console.log('token = ' + authToken);
          authStorageSvc.setToken(authToken, rememberMe);
          $rootScope.$broadcast('auth.login.success');
        },
        function(errorResponse) {
          $rootScope.$broadcast('auth.login.error');
        }
      );
    };

    Auth.prototype.loginGuest = function(guestName) {
      this.logout();
      // we log guests in by creating a new user
      var user = new userRes({username: guestName});
      user.$save(function() {
        var authToken = user['jwt'];
        authStorageSvc.setToken(authToken);
        $rootScope.$broadcast('auth.login.success');
      });

      // userRes.create({user: {username: guestName}}).then(
      //   function(userResponse) {
      //     // when the server creates a guest, it returns a jwt token with it
      //     var authToken = userResponse['jwt'];
      //     authStorageSvc.setToken(authToken);
      //     $rootScope.$broadcast('auth.login.success')
      //   }
      // );
    };

    Auth.prototype.logout = function() {
      // localStorage.removeItem('auth_token');
      if (this.loggedIn()) {
        authStorageSvc.clearAuthStorage();
        $rootScope.$broadcast('auth.logout.success');
      }
    };

    Auth.prototype.loggedIn = function() {
      var token = authStorageSvc.getToken();
      if (token) {
        return true;
      }
      return false;
    };

    Auth.prototype.getToken = function() {
      return authStorageSvc.getToken();
    };

    Auth.prototype.currentUser = function() {
      // return authStorageSvc.currentUser();
      var user = authStorageSvc.getUser();
      if (!user) {
        var token = authStorageSvc.getToken();
        if (token) {

          user = userRes.current(function(currentUser) {
            authStorageSvc.setUser(currentUser);
          });
        }
      }
      if (user.$promise) {
        user = user.$promise;
      }
      return $q.when(user);
    };

    return new Auth();
  }]
};
