'use strict';

/**
 * @ngdoc overview
 * @name cmsApp
 * @description
 * # cmsApp
 *
 * Main module of the application.
 */
angular
  .module('cmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/post/search', {
        templateUrl: 'views/post/search.html',
        controller: 'PostSearchCtrl'
      })
      .otherwise({
        redirectTo: '/auth'
      });
  })
  .filter('startFrom', function() {
    return function(input, start) {
      return input.slice(start);
    };
  });
