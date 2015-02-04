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
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTagsInput',
    'ui.bootstrap',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.helpers.dateParser',
    'mgcrea.ngStrap.timepicker',
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
      .when('/post/:year/:month', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl'
      })
      .when('/post/:year/:month/:sha/:url*', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl'
      })
      .otherwise({
        redirectTo: '/auth'
      });
  })
  .run(['$rootScope', '$location', 'Resource','ENV', function ($rootScope, $location, Resource, ENV) {
    $rootScope.alerts = [];
    $rootScope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    $rootScope.$on('$locationChangeStart', function () {
      $rootScope.error = null;
      if (!Resource.github) {
        $location.path('/auth').replace();
        return false;
      }
    });

    Resource.isProduction = (ENV.name === 'production');
  }]);
