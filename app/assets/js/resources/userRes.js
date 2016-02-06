module.exports = ['$resource', 'constants', function($resource, constants) {
  var resPath = constants.apiBaseUrl + '/users';

  return $resource(resPath + '/:userId', {userId: '@id'}, {
        'update': { method:'PATCH' },
        'current': { method: 'GET', url: resPath + '/current' }
    });


  // return {
  //   index: function() {
  //     // console.log('here');
  //     var baseUsers = Restangular.all(resPath);
  //     return baseUsers.getList();
  //   },
  //
  //   create: function(user) {
  //     var baseUsers = Restangular.all(resPath);
  //     return baseUsers.post(user); // TODO: .then to broadcast events
  //   },
  //
  //   currentUser: function() {
  //     var baseUsers = Restangular.all(resPath);
  //     return baseUsers.doGET('current');
  //   }
  // }
}];
