'use strict';

angular.module('cmsApp')
  .controller('PostSearchCtrl', function ($rootScope, $scope, $location, DateUtil, PromiseUtil, ENV) {
    $scope.cleanAlerts();
    $scope.posts = [];
    $scope.maxSize = 5;
    $scope.currentPage = 1;
    $scope.ready = false;
    $scope.filter = {
      month: DateUtil.now.getMonth(),
      year: DateUtil.now.getYear(),
      title: '',
      search: function(){
        var data = {
          month: DateUtil.parseMonth(this.month),
          year: this.year,
          title: this.title
        }

        var promise = PromiseUtil
          .request(ENV.api.news.search, 'GET', data)
          .then(function(result){
            $scope.updateView(result);
          });

        return promise
      }
    };

    $scope.organization = $rootScope.user.organization;

    $scope.canStartFilter = function(){
      return $scope.filter.title &&  $scope.filter.title.length > 3;
    };

    $scope.updateView = function(posts){
      $scope.currentPage = 1;
      $scope.posts = posts || $scope.posts;
    };

    $scope.ready = function(){
      return !!$rootScope.user.skelleton;
    };

    $scope.create = function(){
      $location.path('/post');
    };

    $scope.edit = function(post){
      $location.path('/post/'+post.id);
    };

    $scope.load = function(){
      $scope.filter.search();
      $scope.loadSkelleton();
    };

    $scope.loadSkelleton = function(){
      return PromiseUtil
        .request(ENV.api.skelleton)
        .then(function(result){
          $rootScope.user.skelleton = angular.fromJson(result);
        });
    };

    $scope.load();
  });
