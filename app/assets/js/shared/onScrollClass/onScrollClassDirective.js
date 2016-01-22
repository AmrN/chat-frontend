var $ = require("jquery");
var getScrollTop = require('../getScrollTop');
var raf = require('raf');


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
              var classToAddObj = config.add;
              var classToRemoveObj = config.remove;
              var $element = $(element);

              var lastPageYOffset = 0;

              function render() {
                if (getScrollTop() != lastPageYOffset) {
                  if (this.pageYOffset >= $element.offset().top - offset) {
                      if (angular.isObject(classToAddObj)) {
                        angular.forEach(classToAddObj, function(classToAdd, target) {
                          console.log("target: " + target + " ,classToAdd: " + classToAdd);
                          $(target).addClass(classToAdd);
                        });
                      } else {
                        $element.addClass(classToAddObj);
                      }

                      if (angular.isObject(classToRemoveObj)) {
                        angular.forEach(classToRemoveObj, function(classToRemove, target) {
                          $(target).removeClass(classToRemove);
                        });
                      } else {
                        $element.removeClass(classToRemoveObj);
                      }
                  } else if (reverse) {
                      if (angular.isObject(classToAddObj)) {
                        angular.forEach(classToAddObj, function(classToAdd, target) {
                          $(target).removeClass(classToAdd);
                        });
                      } else {
                        $element.removeClass(classToAddObj);
                      }

                      if (angular.isObject(classToRemoveObj)) {
                        angular.forEach(classToRemoveObj, function(classToRemove, target) {
                          $(target).addClass(classToRemove);
                        });
                      } else {
                        $element.addClass(classToRemoveObj);
                      }
                  }
                  lastPageYOffset = getScrollTop();
                }

                raf(render);
              }

              raf(render);

          }
      }
}];
