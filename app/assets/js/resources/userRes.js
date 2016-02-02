module.exports = ['Restangular', function(Restangular) {
  var resPath = 'users';
  return {
    index: function() {
      // console.log('here');
      var baseUsers = Restangular.all(resPath);
      return baseUsers.getList();
    },

    create: function(user) {
      var baseUsers = Restangular.all(resPath);
      return baseUsers.post(user); // TODO: .then to broadcast events
    },

    currentUser: function() {
      var baseUsers = Restangular.all(resPath);
      return baseUsers.doGET('current');
    }
  }
}];
