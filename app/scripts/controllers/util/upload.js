'use strict';
/*jshint camelcase: false */

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, $timeout, $http, $rootScope, Resource, ENV) {
    var FormDataObject = function(data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
        fd.append(key, value);
      });
      return fd;
    };

    var randomHash = function () {
      const N = 256;
      const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return Array.apply(null, Array(N)).map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
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
      })
      .then(function(response){
        return response.data;
      });;
    };

    $scope.uploadFile = function(file, successCallback) {
      call(file)
        .then(function(data) {
          if(!!successCallback){
            successCallback(data);
          }
        })
        .error(function(error) {
          console.log(error);
          $rootScope.addError('Desculpa, algo de errado aconteceu ao adicionar o arquivo na notícia.');
        });
    };

    $scope.uploadFiles = function(files, successCallback) {
      angular.forEach(files, function(file){
        file['file_id'] = randomHash();

        const reader = new FileReader();
        reader.onload = (event) => {
          file.preview = event.target.result;
        };
				reader.readAsDataURL(file);

        $timeout(function(){
            $rootScope.$broadcast('preview-file', { file: file  });
        }, 500);

        call(file)
          .then(function(data) {
            file.uploaded = data;
            $rootScope.$broadcast('upload-file', { file: file  });

            if(!!successCallback){
              successCallback(data);
            }
          })
          .catch(function(error) {
            console.error(error);
            $rootScope.$broadcast('error-upload-file', { file: file  });
            $rootScope.showError('Desculpa, algo de errado aconteceu ao adicionar o arquivo na notícia.');
          });
      });
    };
  });
