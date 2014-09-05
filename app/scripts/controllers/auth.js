'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, $timeout, oauth, User) {
    $scope.authenticate =  function(){
      oauth.popup('github', function(err, res) {
        if(err) {
          return window.alert(err);
        }
        $rootScope.github = res;

        $timeout(function(){
          $scope.user = User.info();
          $scope.user.orgs = User.organizations();
        },0);
      });
    };
  });
