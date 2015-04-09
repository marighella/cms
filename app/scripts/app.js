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
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/post/search', {
        templateUrl: 'views/post/search.html',
        controller: 'PostSearchCtrl',
        controllerAs: 'postSearchCtrl'
      })
      .when('/post/:year/:month', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl',
        controllerAs: 'postCreateCtrl'
      })
      .when('/post/:year/:month/:sha/:path*', {
        templateUrl: 'views/post/create.html',
        controller: 'PostCreateCtrl',
        controllerAs: 'postCreateCtrl'
      })
      .otherwise({
        redirectTo: '/auth'
      });
  })
  .run(['$rootScope', '$location', '$http', 'Resource','ENV', 'Repository', function ($rootScope, $location, $http, Resource, ENV, Repository) {
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

    $rootScope.loadSkelleton = function(){
      Repository.skelleton.get($rootScope.repository)
      .then(function(result){
        $rootScope.user.skelleton = angular.fromJson(result);
      }).catch(function(error){
        $rootScope.addWarning(error);
        $http.get('default-skelleton.json')
        .success(function(data) {
          $rootScope.user.skelleton = angular.fromJson(data);
        });
      });
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
