'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostsearchCtrl
 * @description
 * # PostsearchCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostSearchCtrl', function ($scope, DateUtil, Repository) {
    $scope.posts = Repository.post.list();
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.filter = {
      month: DateUtil.now.getMonth(),
      year: DateUtil.now.getYear()
    };

  });
