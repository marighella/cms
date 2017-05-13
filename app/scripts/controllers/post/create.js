'use strict';

angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, _, PostUtil, TagsUtil, PromiseUtil, ENV) {

    $scope.cleanAlerts();
    $scope.state = 'default';
    $scope.entity = {
      date: new Date(),
      tags: [],
      title: 'Titulo da notícia'
    };
    $scope.body = '';
    $scope.fields = [];
    $scope.files = [];
    $scope.relatedPosts = [];
    $scope.suggestedPosts = [];
    $scope.tags = new TagsUtil();
    $scope.videoField = undefined;
    $scope.currentNavItem = 'metadata';
    $scope.id = undefined;
    $scope.filename = '';

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

    var getVideoUrl = function(){
      var field = $scope.videoField;

      if(!!field && !!field.name){
        return $scope.entity[field.name];
      }
      return '';
    };

    $scope.save = function(form){
      var publish = $scope.entity.published;
      var sha = $routeParams.sha;

      $scope.$broadcast('submited');

      if(!form.$invalid){
        $scope.state = (publish) ? 'publishing' : 'saving';
        var videoUrl = getVideoUrl();
        var promise = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, $scope.files, publish, videoUrl);
        promise.then(function(post){
          post.id = $scope.id;
          /*jshint camelcase: false */
          post.metadata.related_posts = $scope.relatedPosts;

          var url = ENV.api.news.save;
          var method = 'POST';

          if(!!post.id){
            url = ENV.api.news.update.replace(':id', post.id);
            method = 'PUT';
          }

          PromiseUtil
            .request(url, method, post)
            .then(function(){
              $scope.showAlert('Salvo com sucesso!');
              $scope.state = 'default';
            })
            .catch(function(error) {
              $scope.showError('Erro ao salvar', error);
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

    var removeReleatedPost = function(post){
      var index = $scope.relatedPosts.indexOf(post);
      if( index >= 0 ){
        $scope.relatedPosts.splice(index, 1);
      }
    };

    var addReleatedPost = function(post){
      var index = $scope.relatedPosts.indexOf(post);
      if( index >= 0 ){
        removeReleatedPost(post);
      }else{
        $scope.relatedPosts.push(post);
      }
    };

    var isPostReleated = function(post){
      return _.find($scope.relatedPosts, function(e){ return e === post; });
    };

    $scope.addReleatedPost = addReleatedPost;
    $scope.removeReleatedPost = removeReleatedPost;
    $scope.isPostReleated = isPostReleated;

    var getRelatedPosts = function(tags){
      return $scope.tags.getRelatedPosts(tags, { postToRemove: $scope.filename });
    };

    var fillSuggestedPosts = function(){
        var tags = $scope.entity.tags || [];
        var suggestedPosts = [];
        tags.forEach(function(tag){
          suggestedPosts.push(getRelatedPosts([tag]));
        });

        $scope.suggestedPosts = _.uniq(_.flatten(suggestedPosts));
    };

    var fillReleatedPosts = function(){
      var tags = $scope.entity.tags || [];
      if(tags.length === 0 ){
        $scope.suggestedPosts = [];
        $scope.relatedPosts = [];
      }else{
        var relatedPosts = getRelatedPosts(tags);
        fillSuggestedPosts();

        if(tags.length > 1){
          $scope.relatedPosts = _.union(relatedPosts, $scope.relatedPosts);
        }
      }
    };

    $scope.fillReleatedPosts = fillReleatedPosts;

    $scope.loadSkelleton = function(){
      return PromiseUtil
        .request(ENV.api.skelleton)
        .then(function(result){
          $rootScope.user.skelleton = angular.fromJson(result);
          $scope.fields = $rootScope.user.skelleton;
        });
    };

    $scope.loadPost = function(post){
      $scope.state = 'loading';
      var url = ENV.api.news.get.replace(":id", post.id)

      PromiseUtil
        .request(url)
        .then(function(post){
          /*jshint camelcase: false */
          $scope.entity = post.metadata;
          $scope.id = post.id;
          $scope.body   = post.body;
          $scope.filename = post.filename;
          $scope.files  = PostUtil.prepareListOfFiles(post.metadata);
          $scope.relatedPosts = post.metadata.related_posts || [];
          $scope.state = 'default';
        });
    }

    $scope.load = function(){
      $scope
        .loadSkelleton()
        .then(function(){
          if(!!$routeParams.id){
            $scope.loadPost({
              id: $routeParams.id
            });
          }
        });
    };
  });
