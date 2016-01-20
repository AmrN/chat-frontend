var app = require('angular').module('myApp');
app.directive("fixOnScroll", require("./fixOnScrollDirective"));
app.directive("scrollOnClick", require("./scrollOnClickDirective"));
app.directive("scrollFollow", require("./scrollFollowDirective"));
// app.directive("parallax", require("./parallaxDirective"));


require("./onScrollClass");
