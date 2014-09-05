'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, oauth, User) {

    $scope.getRepositories = function(organization){
      $timeout(function(){
        $scope.user.repositories = User.organization.get(organization).repositories();
        $scope.user.organization = angular.fromJson(organization);
      },0);
    };

    $scope.authenticate =  function(){
      oauth.popup('github', function(error, response) {
        if(error) {
          return window.alert(error);
        }
        $rootScope.github = response;

        $timeout(function(){
          $scope.user = User.info();
          $scope.user.organizations = User.organization.list();
          $scope.user.repositories = [];
        },0);
      });
    };
  });
