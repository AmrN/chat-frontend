var $ = require("jquery");

module.exports = ["$window", "onScrollClassConfig", function ($window, onScrollClassConfig) {
    return {
      restrict: "A",
      scope: {
        onScrollClass: "@",
      },
      link: function(scope, element, attrs) {
              var config = angular.copy(onScrollClassConfig);
              angular.extend(config, scope.$eval(scope.onScrollClass));
              // console.log(config);
              var reverse = config.reverse;
              var offset = config.offset;
              var classToAdd = config.add;
              var classToRemove = config.remove;
              var $element = $(element);

              $($window).on("scroll", function() {
                  if (this.pageYOffset >= $element.offset().top - offset) {
                      $element.addClass(classToAdd);
                      $element.removeClass(classToRemove);
                  } else if (reverse) {
                      $element.addClass(classToRemove);
                      $element.removeClass(classToAdd);
                  }
                //  scope.$apply();
                });

          }
      }
}];
