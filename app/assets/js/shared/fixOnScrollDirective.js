var $ = require("jquery");

module.exports = ["$window", function ($window) {
    return {
      restrict: "A",
      scope: {
        toFix: "=",
        fixClass: "="
      },
      link: function(scope, element, attrs) {
              var elemsToFix = $(scope.toFix);
              var $element = $(element);
              $($window).on("scroll", function() {
                angular.forEach(elemsToFix, function(elem) {
                  var $elem = $(elem);
                  if (this.pageYOffset >= $element.offset().top + $element.height()) {
                      $elem.addClass(scope.fixClass);

                  } else {
                      $elem.removeClass(scope.fixClass);
                  }
                //  scope.$apply();
                });
              });
          }
      }
}];
