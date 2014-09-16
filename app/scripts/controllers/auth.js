'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, $location, oauth, User, Repository) {
    $scope.finish = function(repository){
      if(!!repository){
        $scope.user.repository = repository;
        $scope.user.skelleton = Repository.skelleton.get(repository);
        $rootScope.user = $scope.user;
        $location.path('/post/search');
      }
    };

    $scope.getRepositories = function(organization){
      if(!!organization){
        $scope.user.repositories = Repository.organization.get(organization).repositories();
        $scope.user.organization = angular.fromJson(organization);
      }else{
        $scope.user.organization = undefined;
        $scope.user.repositories = [];
      }
    };

    $scope.authenticate =  function(){
        $timeout(function(){
          $scope.user = User.info();
        },0);
    /* oauth.popup('github', function(error, response) {
        if(error) {
          return window.alert(error);
        }
        $rootScope.github = response;
        $timeout(function(){
          $scope.user = User.info();
        },0);
      });
      */
    };
  });
