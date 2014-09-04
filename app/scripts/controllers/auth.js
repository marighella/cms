'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($rootScope, $scope, oauth) {
    $scope.authenticate =  function(){
      oauth.popup('github', function(err, res) {
        if(err) {
          return window.alert(err);
        }
        $rootScope.github = res;
      });
    };
  });
