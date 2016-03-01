module.exports = ['$resource', 'constants', function($resource, constants) {
  var resPath = constants.apiBaseUrl + '/chatrooms';

  return $resource(resPath + '/:chatroomId', {chatroomId: '@id'}, {
        'update': { method:'PATCH' },
        'queryMessages': { method:'GET', url: resPath + '/:chatroomId' + '/messages', isArray: true}
    });
}];
