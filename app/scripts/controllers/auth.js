'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, oauth, User, Organization) {

    $scope.getRepositories = function(organization){
      if(!!organization){
        $timeout(function(){
          $scope.user.repositories = Organization.get(organization).repositories();
          $scope.user.organization = angular.fromJson(organization);
        },0);
      }else{
        $timeout(function(){
          $scope.user.organization = undefined;
          $scope.user.repositories = [];
        },0);
      }
    };

    $scope.authenticate =  function(){
      oauth.popup('github', function(error, response) {
        if(error) {
          return window.alert(error);
        }
        $rootScope.github = response;
        $timeout(function(){
          var user = User.info();
          $scope.user = user;
        },0);
      });
    };
  });
