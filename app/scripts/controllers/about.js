'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
