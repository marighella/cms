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
    'satellizer',
  ])
  .config(function ($routeProvider, $authProvider, ENV) {
    $routeProvider
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/post/search', {
        templateUrl: 'views/post/search.html',
        controller: 'PostSearchCtrl'
      })
      .when('/post', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl'
      })
      .when('/post/:_id', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl'
      })
      .otherwise({
        redirectTo: '/auth'
      });

    $authProvider.github({
      clientId: ENV.github_api_key,
      responseType: 'token',
      scope: ['public_repo', 'user:email'],
    });

  })
  .run(['$rootScope', '$location', '$http', 'ENV', 'Repository', function ($rootScope, $location, $http, ENV, Repository) {
    $rootScope.alerts = [];

    $rootScope.addError = function(message) {
       $rootScope.alerts.push({msg: message, type: 'danger'});
    };

    $rootScope.addWarning = function(message) {
       $rootScope.alerts.push({msg: message, type: 'warning'});
    };

    $rootScope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    $rootScope.cleanAlerts = function() {
      $rootScope.alerts = [];
    };

    $rootScope.$on('$locationChangeStart', function () {
      $rootScope.error = null;
      if (!$rootScope.user) {
        $location.path('/auth').replace();
        return false;
      }
    });
  }]);
