var $ = require("jquery");
var getScrollTop = require('./getScrollTop');
var raf = require('raf');

module.exports = [function () {
    return {
      restrict: "A",
      scope: {
        toFix: "=",
        fixClass: "="
      },
      link: function(scope, element, attrs) {
              var elemsToFix = $(scope.toFix);
              var $element = $(element);


              var lastPageYOffset = 0;

              function render() {
                if (getScrollTop() != lastPageYOffset) {
                  angular.forEach(elemsToFix, function(elem) {
                    var $elem = $(elem);
                    if (getScrollTop() >= $element.offset().top + $element.height()) {
                        $elem.addClass(scope.fixClass);

                    } else {
                        $elem.removeClass(scope.fixClass);
                    }
                  //  scope.$apply();
                  });

                  lastPageYOffset = getScrollTop();
                }
                raf(render);
              }

              raf(render);

          }
      }
}];
