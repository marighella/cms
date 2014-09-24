'use strict';

angular.module('cmsApp')
  .controller('UploadCtrl', function (_, $scope, Image, $timeout) {

    $scope.images = [];

    $scope.$on('filesLoaded', function(event, args) {
      $scope.images = args;
    });

    function createImg(data){
      return {
        link : data.link,
        thumbnail: data.thumbnail,
        title: data.title
      };
    }

    $scope.uploadImage = function(files) {
      files.forEach(function(file){
        if (!!file) {
          Image.send(file)
          .success(function(data) {
            console.log(data);
          }).error(function(error, status) {
            console.log(error);
          });
        }
      });
    };

  });
