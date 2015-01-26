'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, $q, PostUtil, Repository, TagsUtil) {

    $scope.state = 'default';
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.cover = '';
    $scope.editorLoaded = false;
    $scope.fields = $rootScope.user.skelleton || [];
    $scope.files = [];
    $scope.tags = new TagsUtil();

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

    $scope.$on('ckeditor.ready', function(){
      $scope.editorLoaded = true;
    });

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
          /*jshint camelcase: false */
          post.metadata[$scope.coverField.name] = $scope.cover;
          post.metadata.releated_posts = getReleatedPosts();

          Repository.content.save($rootScope.repository, post, sha)
          .then(function(){
            $scope.state = 'default';
            $location.path('/post/search');
          });
        });
      }
    };

    var loadTagsFile = function(){
      Repository.tagsFile.get($scope.user).then(function(result){
        $scope.tags = new TagsUtil(angular.fromJson(result));
      });
    };

    var getReleatedPosts = function(){
      return $scope.tags.getReleatedPosts($scope.entity.tags, { postToRemove: $scope.filename });
    };

    $scope.load = function(){
      var post = {
        url: $routeParams.url
      };

      loadTagsFile();

      if(!!post.url){
        $scope.state = 'loading';

        Repository.content.get(post).then(function(post){
          $scope.entity = post.metadata;
          $scope.body   = post.body;
          $scope.filename = post.filename;
          $scope.files  = PostUtil.prepareListOfFiles(post.metadata, $scope.coverField.name);
          $scope.cover = post.metadata[$scope.coverField.name];
          $scope.state = 'default';
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
