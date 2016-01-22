var $ = require("jquery");
var animateScrollTop = require('./animateScrollTop');

module.exports = ["$parse", function($parse) {
    return {
        restrict: 'A',
        scope: {
            scrollTo: "@",
            scrollToCb: "@"
        },
        link: function(scope, $elm,attr) {
            var scrollTo = scope.scrollTo;
            console.log(scrollTo);
            $elm.on('click', function(e) {
                e.preventDefault();

                scope.$parent.$apply(function() {
                  $parse(scope.scrollToCb)(scope.$parent);
                });

                animateScrollTop(Math.round($(scope.scrollTo).offset().top - 120));
            });
        }
      }

}];
