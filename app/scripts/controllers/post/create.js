'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, $q, PostUtil, Repository, TagsUtil, _) {

    $scope.state = 'default';
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.cover = '';
    $scope.editorLoaded = false;
    $scope.fields = $rootScope.user.skelleton || [];
    $scope.files = [];
    $scope.releatedPosts = [];
    $scope.suggestedPosts = [];
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
          post.metadata.releated_posts = getReleatedPosts($scope.entity.tags);

          Repository.content.save($rootScope.repository, post, sha)
          .then(function(){
            $scope.state = 'default';
            $location.path('/post/search');
          });
        });
      }
    };

    var loadTagsFile = function(then){
      then = then || function(){};
      Repository.tagsFile.get($scope.user).then(function(result){
        $scope.tags = new TagsUtil(angular.fromJson(result));
        then();
      });
    };

    var getReleatedPosts = function(tags){
      return $scope.tags.getReleatedPosts(tags, { postToRemove: $scope.filename });
    };

    var fillReleatedPosts = function(){
      $scope.releatedPosts = getReleatedPosts($scope.entity.tags);

      var suggestedPosts = []; 
      $scope.entity.tags.forEach(function(tag){
        suggestedPosts.push(getReleatedPosts([tag]));
      });

      $scope.suggestedPosts = _.difference(_.flatten(suggestedPosts), $scope.releatedPosts);
    };

    $scope.fillReleatedPosts = fillReleatedPosts;

    $scope.load = function(){
      var post = {
        url: $routeParams.url
      };

      if(!!post.url){
        $scope.state = 'loading';

        Repository.content.get(post).then(function(post){
          $scope.entity = post.metadata;
          $scope.body   = post.body;
          $scope.filename = post.filename;
          $scope.files  = PostUtil.prepareListOfFiles(post.metadata, $scope.coverField.name);
          $scope.cover = post.metadata[$scope.coverField.name];

          loadTagsFile(function(){
            fillReleatedPosts();
            $scope.state = 'default';
          });
        });
      }else{
        loadTagsFile();
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
