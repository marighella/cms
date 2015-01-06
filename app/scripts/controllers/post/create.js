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
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.cover = '';
    $scope.fields = $rootScope.user.skelleton || [];
    $scope.files = [];

    $scope.fields.forEach(function(element){
      if( element.type.view === 'cover'){
        $scope.coverField = element;
      }
      else if(element.type.view === 'video'){
        $scope.videoField = element;
      }
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
        $scope.state = (publish) ? 'publishing' : 'saving';
        var videoUrl = $scope.entity[$scope.videoField.name];
        var promise = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, $scope.files, publish, videoUrl);
        promise.then(function(post){
          post.metadata[$scope.coverField.name] = $scope.cover;

          Repository.content.save($rootScope.repository, post, sha)
          .then(function(){
            $scope.state = 'default';
            $location.path('/post/search');
          });
        });
      }
    };

    $scope.load = function(){
      var post = {
        url: $routeParams.url
      };

      if(!!post.url){
        Repository.content.get(post).then(function(post){
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
  });
