'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, $q, _, R, PostUtil, Repository, TagsUtil) {

    $rootScope.cleanAlerts();
    this.state = 'default';
    this.entity = {
      date: (new Date()).toString(),
    };
    this.body = '';
    this.cover = '';
    this.editorLoaded = false;
    this.fields = $rootScope.user.skelleton || [];
    this.files = [];
    this.releatedPosts = [];
    this.suggestedPosts = [];
    this.tags = new TagsUtil();
    this.coverField = undefined;
    this.videoField = undefined;
    this._index = undefined;


    this.removeImage = function (imageIndex){
      if(window.confirm('Deseja realmente remover este item?')){
        this.files.splice(imageIndex, 1);
      }
    };

    this.getVideoUrl = function(entity){
      var field = this.videoField;

      if(!!field && !!field.name){
        return entity[field.name];
      }
      return '';
    };

    this.save = function(form, action){
      if(action !== 'publish' && action !== 'draft'){
        return;
      }
      var publish = (action === 'publish');
      var sha = $routeParams.sha;
      var self = this;

      $rootScope.$broadcast('submited');

      if(!form.$invalid){
        this.state = (publish) ? 'publishing' : 'saving';
        var videoUrl = this.getVideoUrl(this.entity);
        PostUtil.preparePost(this.entity, this.body, this.filename, this.files, publish, videoUrl)
          .then(function(post){
            /*jshint camelcase: false */
            post.metadata[self.coverField.name] = self.cover;
            post.metadata.releated_posts = self.releatedPosts;

            Repository.content.save($rootScope.repository, post, sha)
              .then(function(){
                $rootScope.cleanAlerts();
                self.state = 'default';
                $location.path('/post/search');
              })
              .catch(function(error) {
                self.state = 'default';
                $rootScope.addError(error);
              });
          });
      } else {
        var inputs = form.$error.required || [];
        var inputNames = [];
        inputs.forEach(function(input) {
          var field = self.fields.filter( function(field) {
            return field.name === input.$name;
          });
          inputNames.push(field.title);
        });

        var message = 'Os campos: ' + inputNames.join(', ') + ' precisam ser preenchidos.';

        this.addWarning(message);
      }
    };

    this.loadTagsFile = function(loadTagsFileCallback){
      loadTagsFileCallback = loadTagsFileCallback || function(){};
      var self = this;
      Repository.tagsFile.get($rootScope.user)
        .then(function(result){
          self.tags = new TagsUtil(angular.fromJson(result));
          loadTagsFileCallback();
        });
    };

    this.removeReleatedPost = function(post){
      var index = this.releatedPosts.indexOf(post);
      if( index >= 0 ){
        this.releatedPosts.splice(index, 1);
      }
    };

    this.addReleatedPost = function(post){
      var index = $scope.releatedPosts.indexOf(post);
      if( index >= 0 ){
        this.removeReleatedPost(post);
      }else{
        this.releatedPosts.push(post);
      }
    };

    this.isPostReleated = function(post){
      return this.releatedPosts.filter( function(e) {
        return e === post;
      });
    };

    this.getReleatedPosts = function(tags){
      return this.tags.getReleatedPosts(tags, { postToRemove: $scope.filename });
    };

    this.fillSuggestedPosts = function(){
        var tags = this.entity.tags || [];
        var suggestedPosts = [];
        var self = this;
        tags.forEach(function(tag){
          suggestedPosts.push(self.getReleatedPosts([tag]));
        });

        this.suggestedPosts = _.uniq(_.flatten(suggestedPosts));
    };

    this.fillReleatedPosts = function(){
      var tags = this.entity.tags || [];
      if(tags.length === 0 ){
        this.suggestedPosts = [];
        this.releatedPosts = [];
      }else{
        var releatedPosts = this.getReleatedPosts(tags);
        this.fillSuggestedPosts();

        if(tags.length > 1){
          this.releatedPosts = _.union(releatedPosts, this.releatedPosts);
        }
      }
    };

    this.load = function(){
      var post = {
        path: $routeParams.path
      };

      if(!!post.path){
        this.state = 'loading';
        var self = this;
        Repository.content.get(post.path, $rootScope.repository)
          .then(function(post){
            /*jshint camelcase: false */
            self.entity = post.metadata;
            self.body   = post.body;
            self.filename = post.filename;
            self.files  = PostUtil.prepareListOfFiles(post.metadata, self.coverField.name);
            self.cover = post.metadata[self.coverField.name];
            self.releatedPosts = post.metadata.releated_posts || [];
            self.state = 'default';

            self.loadTagsFile(function(){
              self.fillSuggestedPosts();
            });
          });
      }else{
        this.loadTagsFile();
      }
    };

    this.toggleCover = function(newCover) {
      if (this.cover === newCover) {
        this.cover = null;
        return;
      }

      this.cover = newCover;
    };

    this.init = function() {
      var self = this;
      this.fields.forEach(function(element){
        if( element.type.view === 'cover'){
          self.coverField = element;
        }
        else if(element.type.view === 'video'){
          self.videoField = element;
        }
      });

      $scope.$on('upload-file', function(event, args) {
        self.files.push(args.file);
      });

      $scope.$on('ckeditor.ready', function(){
        self.editorLoaded = true;
      });
      this.load();
    };

    this.init();
  });
