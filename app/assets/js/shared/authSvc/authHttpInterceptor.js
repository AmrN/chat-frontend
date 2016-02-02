module.exports = ['authStorageSvc', function(authStorageSvc) {
  return {
    request: function(config) {
      // need to use injector to work around circular dependency issues
      // var authSvc = $injector.get('authSvc').$get();
      authToken = authStorageSvc.getToken();
      if (authToken) {
        config.headers['Authorization'] = 'Bearer ' + authToken;
      }
      return config;
    }
  }
}];
