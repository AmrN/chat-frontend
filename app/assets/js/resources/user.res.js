module.exports = ['$resource', 'constants', function($resource, constants) {
  var resPath = constants.apiBaseUrl + '/users';

  return $resource(resPath + '/:userId', {userId: '@id'}, {
        'update': { method:'PATCH' },
        'current': { method: 'GET', url: resPath + '/current' }
    });
}];
