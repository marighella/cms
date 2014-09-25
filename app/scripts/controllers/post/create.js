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
    $scope.fields = $rootScope.user.skelleton;
    $scope.files = [];


    $scope.fields.every(function(element){
      if( element.type.view === 'cover'){
        $scope.coverField = element;
        return false;
      }
      return true;
    });

    function save(form, publish){
      var year = $routeParams.year;
      var month = $routeParams.month;
      var sha = $routeParams.sha;

      $scope.$broadcast('submited');

      if(!form.$invalid){
        $scope.state = (publish) ? 'publishing' : 'saving';
        var post = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, $scope.files, publish);
        post.metadata[$scope.coverField.name] = $scope.cover;

        Repository.post.save($rootScope.user, post, year, month, sha)
        .then(function(){
          $scope.state = 'default';
          $location.path('/post/search');
        });
      }
    }

    $scope.$on('upload-file', function(event, args) {
      $scope.files.push(args.file);
    });

    $scope.draft = function(form){
      save(form,false);
    };

    $scope.publish = function(form){
      save(form,true);
    };

    $scope.load = function(){
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
  });
