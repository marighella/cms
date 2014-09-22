'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, PostUtil, Repository) {
    $scope.state = 'saved';

    $scope.draft = function(form){
      $scope.state = 'saving';
      if(!form.$invalid){
        var post = PostUtil.prepareDraftPost($scope.entity, $scope.body);

        Repository.post.save($rootScope.user, post)
        .then(function(){
          $scope.state = 'saved';
          $location.path('/post/search');
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
