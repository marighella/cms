'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, _, oauth, User) {

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
        var user = User.info();
        user.repositories = [];
        var organizations = User.organization.list();
        organizations = _.map(organizations, function(element){
          return User.organization.get().org(element.id);
        });

        user.organizations = organizations;

        $timeout(function(){
          $scope.user = user;
        },0);
      });
    };
  });
