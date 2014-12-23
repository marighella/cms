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
      return $scope.searchValue &&  $scope.searchValue.length > 3;
    };

    $scope.disableFilters = function(){
      $('.filters select').attr('disabled','disabled');
      $('#clearButton').show();
    };

    $scope.enableFilters = function(){
      $('.filters select').removeAttr('disabled');
      $('#clearButton').hide();
    };
    $scope.clearSearch = function(){
      $scope.searchValue = '';
      $scope.search();
    };

    $scope.search = function(searchValue){
      if(!$scope.canStartFilter()){
        $scope.enableFilters();
        $scope.find();
        return;
      }
      $scope.disableFilters();
      var result  = [];
      Repository.post.search(searchValue, $scope.user.repository).then(function(response){
        result = response.items;
        result =  result.sort(function(a,b){
          return new Date(b.name.substring(0,10)) - new Date(a.name.substring(0,10));
        });
        $scope.updateView(result);
      });
    };


    $scope.updateView = function(posts){
      $scope.currentPage = 1;
      $scope.posts = posts || $scope.posts;
      $scope.loadElements();
    };

    $scope.loadElements = function(){
      var start = ($scope.currentPage - 1) * $scope.maxSize;
      var limit = $scope.maxSize;
      var toLoad = $scope.posts.slice(start, start+limit);
      toLoad.forEach(function(element){
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
        $scope.updateView(result.reverse());
      });
    };

    $scope.find();
    $scope.loadSkelleton();
  });
