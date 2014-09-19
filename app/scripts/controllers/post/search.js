'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostsearchCtrl
 * @description
 * # PostsearchCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostSearchCtrl', function ($rootScope, $scope, DateUtil, Repository) {
    $scope.posts = [];
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.filter = {
      month: DateUtil.now.getMonth(),
      year: DateUtil.now.getYear()
    };

    Repository.post.list($rootScope.user, $scope.filter).then(function(result){
      $scope.posts = result;
    });

  });
