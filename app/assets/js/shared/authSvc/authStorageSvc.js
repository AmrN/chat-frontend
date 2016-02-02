module.exports = [function() {
    this.getToken = function() {
      var token = sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
      return token;
    };

    this.setToken = function(token, rememberMe) {
      this.clearAuthStorage();
      sessionStorage.setItem('auth_token', token);
      if (rememberMe) {
        localStorage.setItem('auth_token', token);
      }
    };

    this.removeToken = function() {
      sessionStorage.removeItem('auth_token');
      localStorage.removeItem('auth_token');
    };

    this.getUser = function() {
      var user = sessionStorage.getItem('current_user') || localStorage.getItem('current_user');
      return user;
    };

    this.setUser = function(user) {
      sessionStorage.setItem('current_user', user);
      if (this.remembered()) {
        localStorage.setItem('current_user', user);
      }
    };

    this.removeUser = function() {
      sessionStorage.removeItem('current_user');
      localStorage.removeItem('current_user');
    };

    this.clearAuthStorage = function() {
      this.removeToken();
      this.removeUser();
    };

    this.remembered = function() {
      return !!(localStorage.getItem('auth_token'));
    }

}];
