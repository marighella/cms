'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, PostUtil, Repository, YoutubeLinkUtil) {
    $scope.state = 'default';
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.cover = '';
    $scope.fields = $rootScope.user.skelleton || [];
    $scope.files = [];

    $scope.fields.every(function(element){
      if( element.type.view === 'cover'){
        $scope.coverField = element;
        return false;
      }
      return true;
    });

    $scope.$on('upload-file', function(event, args) {
      $scope.files.push(args.file);
    });

    $scope.removeImage = function (imageIndex){
      if(window.confirm('Deseja realmente remover este item?')){
         $scope.files.splice(imageIndex, 1);
      }
    };

    $scope.save = function(form, action){
      if(action !== 'publish' && action !== 'draft'){
        return;
      }
      var publish = (action === 'publish');
      var sha = $routeParams.sha;

      $scope.$broadcast('submited');

      if(!form.$invalid){
        $scope.entity.video_thumbnail = $scope.getVideoThumbnailUrl($scope.entity.video);
        $scope.state = (publish) ? 'publishing' : 'saving';
        var post = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, $scope.files, publish);
        post.metadata[$scope.coverField.name] = $scope.cover;

        Repository.post.save($rootScope.user, post, sha)
        .then(function(){
          $scope.state = 'default';
          $location.path('/post/search');
        });
      }
    };

    var loadTagsFile = function(){
      Repository.tagsFile.get($scope.user).then(function(result){
        $rootScope.user.tags = angular.fromJson(result);
        console.log($rootScope.user.tags);
      });
    };

    $scope.load = function(){
      loadTagsFile();
      var post = {
        url: $routeParams.url
      };

      if(!!post.url){
        Repository.post.get(post).then(function(post){
          $scope.entity = post.metadata;
          $scope.body   = post.body;
          $scope.filename = post.filename;
          $scope.files  = PostUtil.prepareListOfFiles(post.metadata, $scope.coverField.name);
          $scope.cover = post.metadata[$scope.coverField.name];
        });
      }
    };

    $scope.toggleCover = function(newCover) {
      if ($scope.cover === newCover) {
        $scope.cover = null;
        return;
      }

      $scope.cover = newCover;
    };

    $scope.getVideoThumbnailUrl = function(videoUrl) {
      return YoutubeLinkUtil.link(videoUrl).getVideoThumbnailUrl();
    };
  });
