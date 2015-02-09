'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, $location, oauth, User, Resource, Repository) {
    $scope.user = { logged: false,
                organization: false,
                repositories: [] };
    $scope.finish = function(repository){
      if(!!repository){
        var obj = angular.fromJson(repository);
        $scope.user.repository = obj;
        $rootScope.user = $scope.user;
        $rootScope.repository = $scope.user.repository;
        $location.path('/post/search');
      }
    };
    $scope.isOrgSelected = function(organization){
      if(!$scope.user.organization){
        return false;
      }

      return $scope.user.organization.login === organization.login;
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
          $scope.user.logged = true;
        },0);
      });
    };
  });
