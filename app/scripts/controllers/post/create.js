'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope, $location, $routeParams, PostUtil, Repository, _) {
    $scope.state = 'default';
    $scope.entity = {
      date: (new Date()).toString(),
    };
    $scope.body = '';
    $scope.cover = '';
    $scope.fields = $rootScope.user.skelleton;

    function save(form, publish){
      var year = $routeParams.year;
      var month = $routeParams.month;
      var sha = $routeParams.sha;

      $scope.$broadcast('submited');

      if(!form.$invalid){
        $scope.state = (publish) ? 'publishing' : 'saving';
        var post = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, publish);
        post.metadata[$scope.coverField.name] = $scope.cover;

        Repository.post.save($rootScope.user, post, year, month, sha)
        .then(function(){
          $scope.state = 'default';
          $location.path('/post/search');
        });
      }
    }

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

          var coverField = _.find($scope.fields, function(element){
            return element.type.view === 'cover';
          });

          $scope.cover = post.metadata[coverField.name];
          $scope.coverField = coverField;
        });
      }
    };

    // Set of Photos
    $scope.photos = [
      'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_n.jpg',
      'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_n.jpg',
      'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_n.jpg',
      'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_n.jpg',
      'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_n.jpg',
      'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_n.jpg'
    ];

  });
