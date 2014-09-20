'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, PostUtil, Repository) {

    $scope.draft = function(form){
      form.$submitted = true;
      var post = {
        metadata: $scope.entity,
        body: $scope.body
      };
      post.filename = PostUtil.generateFileName(post);
      post.metadata.published = false;

      Repository.post.save($rootScope.user, post);
    };

    // entity to edit
    $scope.entity = {
      date: (new Date()).toString(),
    };

    $scope.body = '';

    // fields description of entity
    $scope.fields = $rootScope.user.skelleton;
  });
