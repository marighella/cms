'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostsearchCtrl
 * @description
 * # PostsearchCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostsearchCtrl', function ($scope, DateUtil) {
    $scope.filter = {
      month: DateUtil.now.getMonth(),
      year: DateUtil.now.getYear()
    };
  });
