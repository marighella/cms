'use strict';

angular.module('cmsApp')
  .controller('AuthCtrl', function ($scope) {
    $scope.authenticate =  function(){
      window.alert('teste');
    };
  });
