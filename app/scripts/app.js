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
    'ngTagsInput',
    'satellizer',
    'ngMessages',
    'ngMaterial',
    'textAngular',
  ])
  .config(function ($routeProvider, $authProvider, ENV) {
    $routeProvider
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .when('/posts', {
        templateUrl: 'views/post/search.html',
        controller: 'PostSearchCtrl'
      })
      .when('/post', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl'
      })
      .when('/post/:id', {
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
  .run(['$rootScope', '$location', '$http', 'ENV', function ($rootScope, $location, $http, ENV) {
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
      var jwt = window.localStorage['jwt_marighella'];
      var user = window.localStorage['user'];
      var path = $location.path();

      if (!jwt || !user) {
        $location.path('/auth').replace();
        return false;
      } else {
        user = JSON.parse(user);
        $rootScope.user = user;
        $rootScope.repository = user.repository;

        if(path === '/auth') {
          $location.path('/post').replace();
          return false;
        }

        return true;
      }
    });
  }]);
