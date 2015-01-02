'use strict';
/*jshint camelcase: false */

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, oauth, $rootScope, _ /* , $http, $rootScope, Resource, _ */) {
    this.upload = { length: 0, done: 0, working: function() { return this.length !== this.done;  } };
    $scope.upload = this.upload;

    var FormDataObject = function(data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
        fd.append(key, value);
      });
      return fd;
    };

    var uploadFlickr = function(flickrAuth, files){
      var URL = 'services/upload/';


      _.each(files, function(file){

        var fd = new FormDataObject({'photo': file, 'description': 'From CMS'});    

        flickrAuth.post(URL, {
          data: fd,
          processData: false,
          contentType: false
        }).done(function(result){
          console.log(result);
        });
      });
    }; 

    $scope.uploadFiles = function(files) {

      if(!$rootScope.user.flickr){
        oauth.initialize('ajba6gVGrmvbHNoXFnBTUbidAZ8');
        oauth.popup('flickr', function(error, success){
          $rootScope.user.flickr = success;
          uploadFlickr($rootScope.user.flickr, files);
        });
      }else{
        uploadFlickr($rootScope.user.flickr, files);
      }

      $rootScope.$broadcast('prepared-to-upload', { length: files.length });
    
      return files;
    /*  var IMAGE_SERVICE_URL = '//mst-image-service.herokuapp.com/upload';
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
      });*/
    };

    $scope.$on('upload-file', function() {
      $scope.upload.done = $scope.upload.done + 1;
    });

    $scope.$on('prepared-to-upload', function(event, args) {
      $scope.upload.length = args.length;
      $scope.upload.done = 0;
    });

  });
