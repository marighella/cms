'use strict';
/*jshint camelcase: false */

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, $http, $rootScope, Resource, ENV, _) {
    this.upload = { length: 0, done: 0, working: function() { return this.length !== this.done;  } };
    $scope.upload = this.upload;

    var FormDataObject = function(data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
        fd.append(key, value);
      });
      return fd;
    };
    var call = function(file){
      return $http({
        url: ENV.upload,
        method: 'POST',
        transformRequest: FormDataObject,
        headers: {
          'Content-Type': undefined
        },
        data : {
          'organization': $rootScope.user.organization.id,
          'myfile': file
        }
      });
    };

    $scope.uploadFile = function(file, successCallback) {
      call(file)
      .success(function(data) {
        if(!!successCallback){
          successCallback(data);
        }
      }).error(function(error) {
        console.log(error);
        $rootScope.addError('Desculpa, algo de errado aconteceu ao adicionar o arquivo na notícia.');
      });
    };

    $scope.uploadFiles = function(files, successCallback) {
      $rootScope.$broadcast('prepared-to-upload', { length: files.length });
      _.each(files, function(file){
        call(file)
        .success(function(data) {
          console.log(data);
          $rootScope.$broadcast('upload-file', { file: data  });
          if(!!successCallback){
            successCallback(data);
          }
        }).error(function(error) {
          console.log(error);
          $rootScope.addError('Desculpa, algo de errado aconteceu ao adicionar o arquivo na notícia.');
        });
      });
    };

    $scope.$on('upload-file', function() {
      $scope.upload.done = $scope.upload.done + 1;
    });

    $scope.$on('prepared-to-upload', function(event, args) {
      $scope.upload.length = args.length;
      $scope.upload.done = 0;
    });

  });
