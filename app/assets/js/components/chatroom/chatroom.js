module.exports = ["$scope", "messagesACSvc", "actionCableSvc", function($scope, messagesACSvc, actionCableSvc) {
  $scope.messages = [];
  $scope.currentMessage = {};

  messagesACSvc.subscribe();

  $scope.$on('messagesChannel.received', function(e, data) {
    // console.log(data.message);
    $scope.messages.push(data);
  });

  $scope.$on('$destroy', function() {
    messagesACSvc.unsubscribe();
  });

  $scope.sendMessage = function() {
    messagesACSvc.speak($scope.currentMessage.content);
    $scope.currentMessage = {};
    console.log('connected: ' + actionCableSvc.connected());
  }
}];
