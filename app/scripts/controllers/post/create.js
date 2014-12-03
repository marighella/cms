'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, PostUtil, Repository, DateUtil) {
    $scope.state = 'default';
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.cover = '';
    $scope.fields = $rootScope.user.skelleton;
    $scope.files = [];
    $scope.upload = { length: 0, done: 0, working: function() { return this.length !== this.done;  } };


    $scope.fields.every(function(element){
      if( element.type.view === 'cover'){
        $scope.coverField = element;
        return false;
      }
      return true;
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
        var post = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, $scope.files, publish);
        post.metadata[$scope.coverField.name] = $scope.cover;

        Repository.post.save($rootScope.user, post, sha)
        .then(function(){
          $scope.state = 'default';
          $location.path('/post/search');
        });
      }
    };

    $scope.$on('upload-file', function(event, args) {
      $scope.files.push(args.file);
      $scope.upload.done = $scope.upload.done + 1;
    });

    $scope.$on('prepared-to-upload', function(event, args) {
      $scope.upload.length = args.length;
      $scope.upload.done = 0;
    });

    $scope.remove_image = function (image_index){
      if(confirm("Deseja realmente remover este item?")){
       $scope.files.splice(image_index, 1);
      }
    }
    $scope.load = function(){
      var post = {
        url: $routeParams.url
      };

      if(!!post.url){
        Repository.post.get(post).then(function(post){
          $scope.entity = post.metadata;
          $scope.body   = post.body;
          $scope.filename = post.filename;
          debugger
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
