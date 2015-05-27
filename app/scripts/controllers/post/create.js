'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, $q, _, PostUtil, Repository, TagsUtil) {

    $scope.cleanAlerts();
    $scope.state = 'default';
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.editorLoaded = false;
    $scope.fields = $rootScope.user.skelleton || [];
    $scope.files = [];
    $scope.releatedPosts = [];
    $scope.suggestedPosts = [];
    $scope.tags = new TagsUtil();
    $scope.videoField = undefined;

    $scope.fields.forEach(function(element){
      if(element.type.view === 'video'){
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
    $scope.imageToCover = function (imageIndex){
      var cover = $scope.files[imageIndex];
      $scope.$broadcast('imageToBeCover', cover.link);
    };

    $scope.$on('ckeditor.ready', function(){
      $scope.editorLoaded = true;
    });

    var getVideoUrl = function(){
      var field = $scope.videoField;

      if(!!field && !!field.name){
        return $scope.entity[field.name];
      }
      return '';
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
        var videoUrl = getVideoUrl();
        var promise = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, $scope.files, publish, videoUrl);
        promise.then(function(post){
          /*jshint camelcase: false */
          post.metadata.releated_posts = $scope.releatedPosts;

          Repository.content.save($rootScope.repository, post, sha)
          .then(function(){
            $scope.cleanAlerts();
            $scope.state = 'default';
            $location.path('/post/search');
          })
          .catch(function(error) {
            $scope.state = 'default';
            $scope.addError(error);
          });
        });
      } else {
        var inputs = form.$error.required || [];
        var inputNames = [];
        inputs.forEach(function(input) {
          var field = _.find($scope.fields, function(field) {
            return field.name === input.$name;
          });
          inputNames.push(field.title);
        });

        var message = 'Os campos: ' + inputNames.join(', ') + ' precisam ser preenchidos.';

        $scope.addWarning(message);
      }
    };

    var loadTagsFile = function(then){
      then = then || function(){};
      Repository.tagsFile.get($scope.user).then(function(result){
        $scope.tags = new TagsUtil(angular.fromJson(result));
        then();
      });
    };

    var removeReleatedPost = function(post){
      var index = $scope.releatedPosts.indexOf(post);
      if( index >= 0 ){
        $scope.releatedPosts.splice(index, 1);
      }
    };
    var addReleatedPost = function(post){
      var index = $scope.releatedPosts.indexOf(post);
      if( index >= 0 ){
        removeReleatedPost(post);
      }else{
        $scope.releatedPosts.push(post);
      }
    };
    var isPostReleated = function(post){
      return _.find($scope.releatedPosts, function(e){ return e === post; });
    };
    $scope.addReleatedPost = addReleatedPost;
    $scope.removeReleatedPost = removeReleatedPost;
    $scope.isPostReleated = isPostReleated;

    var getReleatedPosts = function(tags){
      return $scope.tags.getReleatedPosts(tags, { postToRemove: $scope.filename });
    };

    var fillSuggestedPosts = function(){
        var tags = $scope.entity.tags || [];
        var suggestedPosts = [];
        tags.forEach(function(tag){
          suggestedPosts.push(getReleatedPosts([tag]));
        });

        $scope.suggestedPosts = _.uniq(_.flatten(suggestedPosts));
    };

    var fillReleatedPosts = function(){
      var tags = $scope.entity.tags || [];
      if(tags.length === 0 ){
        $scope.suggestedPosts = [];
        $scope.releatedPosts = [];
      }else{
        var releatedPosts = getReleatedPosts(tags);
        fillSuggestedPosts();

        if(tags.length > 1){
          $scope.releatedPosts = _.union(releatedPosts, $scope.releatedPosts);
        }
      }
    };

    $scope.fillReleatedPosts = fillReleatedPosts;

    $scope.load = function(){
      var post = {
        path: $routeParams.path
      };

      if(!!post.path){
        $scope.state = 'loading';

        Repository.content.get(post.path, $rootScope.repository)
        .then(function(post){
          /*jshint camelcase: false */
          $scope.entity = post.metadata;
          $scope.body   = post.body;
          $scope.filename = post.filename;
          $scope.files  = PostUtil.prepareListOfFiles(post.metadata);
          $scope.releatedPosts = post.metadata.releated_posts || [];
          $scope.state = 'default';

          loadTagsFile(function(){
            fillSuggestedPosts();
          });
        });
      }else{
        loadTagsFile();
      }
    };
  });
