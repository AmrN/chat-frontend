require('angular');
require('angular-route');
require('angular-ui-router');
require('angular-animate');
// require('restangular');
require('angular-resource');
require('jquery');
// require('lodash');
// restangular needs this alias
// _.contains = _.includes;

var app = angular.module('myApp', ['ui.router','ngAnimate', 'ngResource']);

require('./application.constants');
require("./components");
require("./shared");
require("./resources");
require("./action-cable");
require("./application.config");
