module.exports = ['constants', 'authSvc', '$state', 'notifSvc', 'chatroomRes', 'actionCableSvc', function(constants, authSvc, $state, notifSvc, chatroomRes, actionCableSvc) {
  return {
    scope: true,
    templateUrl: constants.templatesBaseUrl + 'home/home.tpl.html',
    link: function($scope) {
      if (!authSvc.loggedIn()) {
        notifSvc.add('global', {message: 'Please login first'}, 4000);
        $state.go('welcome');
      }


      actionCableSvc.createConsumer(constants.cableBaseUrl, {auth_token: authSvc.getToken()});

      $scope.rooms = chatroomRes.query(function() {
        console.log(JSON.stringify($scope.rooms));
      });
      $scope.$on('chatroom.created', function(e, chatroom) {
        $scope.rooms.push(chatroom);
      });

      $scope.responseFormatter = function(data) {
        return {results: data};
      }
      $scope.searchObjSelected = function(data) {
        var chatroom = data.originalObject;
        $state.go('home.chatrooms', {chatroomId: chatroom.id});
      }
    }
  }
}];
