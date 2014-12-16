'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostsearchCtrl
 * @description
 * # PostsearchCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostSearchCtrl', function ($rootScope, $scope, $location, DateUtil, PostUtil, Repository) {
    $scope.posts = [];
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.ready = false;
    $scope.filter = {
      month: DateUtil.now.getMonth(),
      year: DateUtil.now.getYear(),
      title: '' 
    };

    $scope.canStartFilter = function(){
      return $scope.filter.title.length > 3 ;
    };

    $scope.search = function(){
      if(!$scope.canStartFilter()){
        return;
      }
      var titleSlug = PostUtil.formatName($scope.filter.title); 
      var result  = [];

      $scope.posts.forEach(function(element){
        if(element.name.match(titleSlug)){
          result.push(element);
        }
      });

      $scope.filteredPosts = result;
      $scope.pageChanged();
    };

    $scope.getPosts = function(){
      if($scope.canStartFilter()){
        return $scope.filteredPosts;
      }
      return $scope.posts;
    };

    $scope.pageChanged = function(){
      var start = ($scope.currentPage - 1) * $scope.maxSize;
      var limit = $scope.maxSize;
      var postsOnPage = $scope.posts.slice(start, start+limit);

      if($scope.canStartFilter()){
        postsOnPage = $scope.filteredPosts.slice(start, start+limit);
      }

      postsOnPage.forEach(function(element){
        if(!element.metadata){
          Repository.post.get(element).then(function(result){
            angular.extend(element, result);
          });
        }
      });
    };

    $scope.loadSkelleton = function(){
      Repository.skelleton.get($scope.user).then(function(result){
        $rootScope.user.skelleton = angular.fromJson(result);
        $scope.ready = true;
      });
    };

    $scope.create = function(){
      var year = $scope.filter.year;
      var month = $scope.filter.month;
      $location.path('/post/'+year+'/'+month);
    };

    $scope.edit = function(post){
      var year = $scope.filter.year;
      var month = $scope.filter.month;
      $location.path('/post/'+year+'/'+month+'/'+post.sha+'/'+post.url);
    };

    $scope.find = function(){
      Repository.post.list($rootScope.user, $scope.filter).then(function(result){
        $scope.posts = result.reverse();
        $scope.pageChanged();
      });
    };

    $scope.find();
    $scope.loadSkelleton();
  });
