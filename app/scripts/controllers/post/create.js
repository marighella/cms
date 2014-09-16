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
      video: 'http://www.youtube.com/watch?v=UViv0FQJrgo',
      cover: 'http://farm6.staticflickr.com/5552/14934144587_2c2b186d58_n.jpg',
      date: '2014-09-10T11:52:11-03:00',
      body: '<p><strong>Hello World</strong></p>'
    };

    // fields description of entity
    $scope.fields = $rootScope.user.skelleton;
  });
