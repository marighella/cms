'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, PostUtil, Repository) {
    $scope.state = 'saved';

    $scope.draft = function(form){
      var year = $routeParams.year;
      var month = $routeParams.month;
      var sha = $routeParams.sha;
      $scope.state = 'saving';

      if(!form.$invalid){
        var post = PostUtil.prepareDraftPost($scope.entity, $scope.body);

        Repository.post.save($rootScope.user, post, year, month, sha)
        .then(function(){
          $scope.state = 'saved';
          $location.path('/post/search');
        });
      }
    };

    $scope.load = function(){
      var post = {
        url: $routeParams.url
      };

      if(!!post.url){
        Repository.post.get(post).then(function(post){
          $scope.entity = post.metadata;
          $scope.body   = post.body;
        });
      }
    };

    // entity to edit
    $scope.entity = {
      date: (new Date()).toString(),
    };

    $scope.body = '';

    // fields description of entity
    $scope.fields = $rootScope.user.skelleton;
  });
