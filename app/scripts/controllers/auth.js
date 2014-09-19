'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, $location, oauth, User, Resource, Repository) {
    $scope.finish = function(repository){
      if(!!repository){
        var obj = angular.fromJson(repository);
        $scope.user.repository = obj;
        $scope.user.skelleton = Repository.skelleton.get(obj);
        $rootScope.user = $scope.user;
        $location.path('/post/search');
      }
    };

    $scope.getRepositories = function(organization){
      $scope.user.organization = undefined;
      $scope.user.repositories = [];

      if(!!organization){
        var obj = angular.fromJson(organization);
        $scope.user.organization = obj;

        Repository.organization.get(obj)
          .repositories().then(function(result){
            $scope.user.repositories = result;
          });
      }
    };

    $scope.authenticate =  function(){
      oauth.popup('github', function(error, response) {
        if(error) {
          return window.alert(error);
        }

        Resource.github = response;
        $timeout(function(){
          $scope.user = User.info();
        },0);
      });
    };
  });
