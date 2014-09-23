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
    $scope.state = 'default';

    function save(form, publish){
      var year = $routeParams.year;
      var month = $routeParams.month;
      var sha = $routeParams.sha;

      $scope.$broadcast('submited');

      if(!form.$invalid){
        $scope.state = (publish) ? 'publishing' : 'saving';
        var post = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, publish);

        Repository.post.save($rootScope.user, post, year, month, sha)
        .then(function(){
          $scope.state = 'default';
          $location.path('/post/search');
        });
      }
    }

    $scope.draft = function(form){
      save(form,false);
    };

    $scope.publish = function(form){
      save(form,true);
    };

    $scope.load = function(){
      var post = {
        url: $routeParams.url
      };

      if(!!post.url){
        Repository.post.get(post).then(function(post){
          $scope.entity = post.metadata;
          $scope.body   = post.body;
          $scope.filename = post.filename;
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
