'use strict';

angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, _, PostUtil, PromiseUtil, ENV) {

    $scope.cleanAlerts();
    $scope.state = 'default';
    $scope.entity = {
      date: new Date(),
      tags: [],
      title: ''
    };
    $scope.body = '';
    $scope.fields = [];
    $scope.files = [];
    $scope.relatedPosts = [];
    $scope.suggestedPosts = [];
    $scope.videoField = undefined;
    $scope.currentNavItem = 'metadata';
    $scope.id = undefined;
    $scope.filename = '';

    $scope.fields.forEach(function(element){
      if(element.type.view === 'video'){
        $scope.videoField = element;
      }
    });

    $scope.$on('preview-file', function(event, args) {
      const file = args.file;
      file.getImage = function(){
        if(!this.uploaded){
          return this.preview;
        }

        return this.uploaded.small;
      };
      $scope.files.push(file);
    });

    $scope.$on('upload-file', function(event, args) {
      const uploaded = args.file;
      angular.forEach($scope.files, function(file) {
        if(file.file_id === uploaded.file_id){
          file.uploaded = uploaded.uploaded;
          delete file.preview;
        }
      });
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

        $scope.showError(message);
      }
    };

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
