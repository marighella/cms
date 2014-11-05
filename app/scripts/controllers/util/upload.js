'use strict';
/*jshint camelcase: false */

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, $http, $rootScope, Resource, _) {

    var FormDataObject = function(data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
        fd.append(key, value);
      });
      return fd;
    };

    $scope.uploadFiles = function(files) {
      var IMAGE_SERVICE_URL = 'http://mst-image-service.herokuapp.com/upload';
      $rootScope.$broadcast('prepared-to-upload', { length: files.length });
      _.each(files, function(file){
        $http({
          url: IMAGE_SERVICE_URL,
          method: 'POST',
          transformRequest: FormDataObject,
          headers: {
            'Content-Type': undefined
          },
          data : {
            'organization': $rootScope.user.organization.id,
            'myfile': file
          }
        }).success(function(data) {
          $rootScope.$broadcast('upload-file', { file: data  });
        }).error(function(error) {
          console.log(error);
        });
      });
    };

  });
