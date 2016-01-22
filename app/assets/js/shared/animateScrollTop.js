// var skrollr = require('skrollr');
var $ = require('jquery');

var animateScrollTop;

// var skrollrInstance = skrollr.get();
// if (skrollrInstance) {
//   animateScrollTop = skrollrInstance.animateTo;
// } else {
  animateScrollTop = function(top) {
    $('html, body').stop().animate({scrollTop: top}, 'slow');
  }
// }

module.exports = animateScrollTop;
