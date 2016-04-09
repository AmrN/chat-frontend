module.exports = ['$resource', 'constants', function($resource, constants) {
  var resPath = constants.apiBaseUrl + '/users';

  return $resource(resPath + '/:userId', {userId: '@id'}, {
        'update': { method:'PATCH' },
        'current': { method: 'GET', url: resPath + '/current' },
        'friend': { method: 'POST', url: resPath + '/:userId/friendships'},
        'unfriend': { method: 'DELETE', url: resPath + '/:userId/friendships'},
        'query_friends': { method: 'GET', url: resPath + '/:userId/friends', isArray: true },
        'acquaintanceship': { method: 'GET', url: resPath + '/:userId/acquaintanceship'}
    });
}];
