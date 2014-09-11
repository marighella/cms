'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:PostcreatectrlCtrl
 * @description
 * # PostcreatectrlCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp')
  .controller('PostCreateCtrl', function ($scope) {
    $scope.formTemplate = {
      'first': {
        'type': 'text',
        'label': 'First Name'
      },
      'last': {
        'type': 'text',
        'label': 'Last Name'
      },
      'submit': {
        'type': 'submit'
      },
    };
  });
