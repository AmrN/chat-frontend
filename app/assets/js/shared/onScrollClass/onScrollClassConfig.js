module.exports = [function() {
  var defaults = {
    reverse: false,
    offset: 150,
    add: "",
    remove: ""
  };

  this.config = {};

  this.$get = function() {
    return angular.extend(defaults, this.config);
  }
}];
