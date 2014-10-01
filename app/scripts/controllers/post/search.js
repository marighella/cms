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
    $scope.pageChanged = function(){
      var start = ($scope.currentPage - 1) * $scope.maxSize;
      var limit = $scope.maxSize;
      var postsOnPage = $scope.posts.slice(start, start+limit);

      postsOnPage.forEach(function(element){
        if(!element.metadata){
          Repository.post.get(element).then(function(result){
            angular.extend(element, result);
          });
        }
      });
    };

    $scope.find = function(){
      Repository.post.list($rootScope.user, $scope.filter).then(function(result){
        $scope.posts = result.reverse();
        $scope.pageChanged();
      });
    };

    $scope.find();

  });
