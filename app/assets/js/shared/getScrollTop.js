// var skrollr = require('skrollr');

var getScrollTop;

// var skrollrInstance = skrollr.get();
// if (skrollrInstance) {
//   getScrollTop = skrollrInstance.getScrollTop;
// } else {
  getScrollTop = function() {
      return window.pageYOffset;
    }
// }

module.exports = getScrollTop;
