var $ = require("jquery");

module.exports = {
  add: function(a, b) {
    $("body").css("background-color", "teal");
    return a + b;
  }
};
