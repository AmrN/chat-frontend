module.exports = ['constants', 'authSvc', '$state', 'notifSvc', 'chatroomRes', 'actionCableSvc', function(constants, authSvc, $state, notifSvc, chatroomRes, actionCableSvc) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'home/home.tpl.html',
    link: function($scope) {
      if (!authSvc.loggedIn()) {
        notifSvc.add('global', {message: 'Please login first'}, 4000);
        $state.go('welcome');
      }

      else {
        actionCableSvc.createConsumer(constants.cableBaseUrl, {auth_token: authSvc.getToken()});

        $scope.responseFormatter = function(data) {
          return {results: data};
        }
        $scope.searchObjSelected = function(data) {
          var chatroom = data.originalObject;
          $state.go('home.chat.chatrooms', {chatroomId: chatroom.id});
        }
      }
    }
  }
}];
