'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostsearchCtrl
 * @description
 * # PostsearchCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostSearchCtrl', function ($rootScope, $scope, $location, DateUtil, Repository) {
    $scope.posts = [];
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.user = $rootScope.user;
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

    $scope.create = function(){
      var year = $scope.filter.year;
      var month = $scope.filter.month;
      $location.path('/post/'+year+'/'+month);
    };

    $scope.find = function(){
      Repository.post.list($rootScope.user, $scope.filter).then(function(result){
        $scope.posts = result.reverse();
        $scope.pageChanged();
      });
    };

    $scope.find();

  });
