'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($rootScope, $scope) {

    $scope.save =  function(form){
      form.$submitted = true;
    };

    // entity to edit
    $scope.entity = {
      date: (new Date()).toString(),
      body: ''
    };

    // fields description of entity
    $scope.fields = $rootScope.user.skelleton;
  });
