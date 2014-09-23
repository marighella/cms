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

    function save(form, publish){
      var year = $routeParams.year;
      var month = $routeParams.month;
      var sha = $routeParams.sha;

      $scope.$broadcast('submited');

      if(!form.$invalid){
        $scope.state = (publish) ? 'publishing' : 'saving';
        var post = PostUtil.preparePost($scope.entity, $scope.body, $scope.filename, publish);

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
        });
      }
    };

    // entity to edit
    $scope.entity = {
      date: (new Date()).toString(),
    };

    $scope.body = '';

    // Set of Photos
    $scope.photos = [
      {src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_c.jpg', desc: 'Image 01'},
      {src: 'http://farm9.staticflickr.com/8449/7918424278_4835c85e7a_c.jpg', desc: 'Image 02'},
      {src: 'http://farm9.staticflickr.com/8457/7918424412_bb641455c7_c.jpg', desc: 'Image 03'},
      {src: 'http://farm9.staticflickr.com/8179/7918424842_c79f7e345c_c.jpg', desc: 'Image 04'},
      {src: 'http://farm9.staticflickr.com/8315/7918425138_b739f0df53_c.jpg', desc: 'Image 05'},
      {src: 'http://farm9.staticflickr.com/8461/7918425364_fe6753aa75_c.jpg', desc: 'Image 06'}
    ];
    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
      return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
      $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
      $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
      $scope._Index = index;
    };



    // fields description of entity
    $scope.fields = $rootScope.user.skelleton;
  });
