var $ = require("jquery");
var skrollr = require("skrollr");

var isMobile = (function() {
  return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
})();

module.exports = [function () {
    return {
        restrict: "A",
        scope: {
          skrollr: "@"
        },
        link: function(scope, element, attrs) {
          if (!isMobile) {
            skrollr.get().init();
            // skrollrInstance.init();
          }
        }
      }
}];
