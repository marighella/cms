'use strict';
/*jshint camelcase: false */

angular.module('cmsApp')
  .controller('UploadCtrl', function ($scope, oauth, $rootScope, $timeout, _ /* , $http, $rootScope, Resource, _ */) {
    var FormDataObject = function(data) {
      var fd = new FormData();
      angular.forEach(data, function(value, key) {
        fd.append(key, value);
      });
      return fd;
    };

    this.flickr = {
      isLogged: function() {
        return !!$rootScope.user.flickr;
      },
      authenticate: function(){
        if (this.isLogged()) {
          return true;
        }
        oauth.initialize('ajba6gVGrmvbHNoXFnBTUbidAZ8');
        oauth.popup('flickr', function(error, success) {
          if(error) {
            return window.alert(error);
          }
          $timeout(function() {
            $rootScope.user.flickr = success;
          });
        });
      },
      upload: function(files){
        var URL = 'services/upload/';

        _.each(files, function(file){

          var fd = new FormDataObject({'photo': file, 'description': 'From CMS'});

          $rootScope.user.flickr.post(URL, {
            data: fd,
            processData: false,
            contentType: false
          }).done(function(result, arroz, feijao){
            console.log('done', result, arroz, feijao);
          }).error(function(result, arroz, feijao){
            console.log('error', result, arroz, feijao);
          });
        });
      }
    };

    this.upload = { length: 0, done: 0, working: function() { return this.length !== this.done;  } };
    $scope.upload = this.upload;
    $scope.flickr = this.flickr;

    $scope.uploadFiles = function(files, service) {
      console.log('service: ', service);

      $scope[service].upload(files);
      $rootScope.$broadcast('prepared-to-upload', { length: files.length });

      return files;
    };


    $scope.$on('upload-file', function() {
      $scope.upload.done = $scope.upload.done + 1;
    });

    $scope.$on('prepared-to-upload', function(event, args) {
      $scope.upload.length = args.length;
      $scope.upload.done = 0;
    });

  });
