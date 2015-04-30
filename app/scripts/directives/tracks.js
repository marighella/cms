'use strict';

angular.module('cmsApp')
  .directive('tracks', function () {
    return {
      restrict: 'E',
      replace: true,
      require : '?tracks',
      controller: 'UploadCtrl',
      scope: {
        tracks: '='
      },
      link: function(scope) {
        scope.updateFiles = function(fileList){
          scope.uploadFiles(fileList, function(result){
            scope.tracks.push({ title: result.basename, mp3: result.link });
          });
        };
        scope.tracks = [];
      },
      template: '<div class="tracks">'+
                    '<input type="file" multiple onchange="angular.element(this).scope().updateFiles(this.files);" />'+
                    '<div ng-repeat="track in tracks" class="track">'+
                        '<input ng-model="track.title" class="title"/>'+
                        '<input ng-model="track.mp3" class="mp3"/>'+
                        '<input ng-model="track.ogg" class="ogg"/>'+
                    '</div>'+
                '</div>'
    };
  });
