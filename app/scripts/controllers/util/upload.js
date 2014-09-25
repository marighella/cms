'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, $http, $rootScope, Resource, _) {

    $scope.images = [];

    $scope.$on('filesLoaded', function(event, args) {
      $scope.images = args;
    });

    var FormDataObject = function(data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
        fd.append(key, value);
      });
      return fd;
    };

    $scope.uploadImage = function(files) {
      var IMAGE_SERVICE_URL = 'http://mst-image-service.herokuapp.com/upload';
      _.each(files, function(file){
        $http({
          url: IMAGE_SERVICE_URL,
          method: 'POST',
          transformRequest: FormDataObject,
          headers: {
            'Content-Type': undefined
          },
          data : {
            'token': Resource.github.access_token,
            'myfile': file
          }
        }).success(function(data) {
          console.log(data);
        }).error(function(error) {
          console.log(error);
        });
      });
    };

  });
