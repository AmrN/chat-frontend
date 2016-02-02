var $ = require("jquery");
var getScrollTop = require('./getScrollTop');
var raf = require('raf');



module.exports = [function () {
    return {
      restrict: "A",
      scope: {
        scrollFollow: "@",
        scrollFollowTarget: "@",
        scrollFollowActiveClass: "@",
        scrollFollowOffset: "@"
      },
      link: function(scope, element, attrs) {
              var $inner = $(element).find(scope.scrollFollow);
              var $target = $(scope.scrollFollowTarget);
              var activeClass = scope.scrollFollowActiveClass;
              var currentChosen = null;
              var offset = angular.isDefined(scope.scrollFollowOffset) ?
                scope.scrollFollowOffset : 0;

              // var didScroll = false;
              // $($window).on("scroll", function() {
              //   didScroll = true;
              // });
              //
              // setInterval(function() {
              //   if (didScroll) {
              //     didScroll = false;
              //     var current = -1;
              //     angular.forEach($target, function(elem) {
              //       var $elem = $(elem);
              //       if (this.pageYOffset >= $elem.offset().top - offset) {
              //           current++;
              //       }
              //     });
              //     if (current >= 0 && current != currentChosen) {
              //       $inner.removeClass(activeClass);
              //       $inner.eq(current).addClass(activeClass);
              //       currentChosen = current;
              //     }
              //   }
              // }, 250);

              var lastPageYOffset = 0;

              function render() {
                if (getScrollTop() != lastPageYOffset) {
                  var current = -1;
                  angular.forEach($target, function(elem) {
                    var $elem = $(elem);
                    console.log(this);
                    if (pageYOffset >= $elem.offset().top - offset) {
                        current++;
                    }
                  });
                  if (current >= 0 && current != currentChosen) {
                    $inner.removeClass(activeClass);
                    $inner.eq(current).addClass(activeClass);
                    alert("chosen: " + current);
                    currentChosen = current;
                  }

                  lastPageYOffset = getScrollTop();
                }
                raf(render);
              }

              raf(render);
          }
      }
}];
