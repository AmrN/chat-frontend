module.exports = ['$timeout', function($timeout) {
  var notifications = {};
  var notif_id = 0;

  this.get = function(identifier) {
    return getNotifByIdentifier(identifier);
  };

  this.add = function(identifier, messageObj, expiryTime) {
    var newId = ++notif_id;
    var notifArr = getNotifByIdentifier(identifier);
    messageObj['_notif_id'] = newId;
    notifArr.push(messageObj);

    if (expiryTime) {
      $timeout(function() {
        var index = null;
        for (var i = 0; i < notifArr.length; i++) {
          if (notifArr[i]['_notif_id'] == newId) {
            index = i;
            break;
          }
        }
        if (index != null) {
          notifArr.splice(index, 1);
        }
      }, expiryTime);
    }
  }

  // returns (or creates if it doesn't exist) a notifications array by identifier
  getNotifByIdentifier = function(identifier) {
    notifications[identifier] = notifications[identifier] || [];
    return notifications[identifier];
  }
}];
