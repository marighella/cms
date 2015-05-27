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
            scope.tracks.push({ title: result.basename, mp3: result.embed });
          });
        };
        scope.tracks = scope.tracks || [];
      },
      template: '<div class="tracks">'+
                    '<div class="upload btn btn-default btn-block">'+
                      '<span><i class="fa fa-upload"></i> Adicionar músicas </span>'+
                      '<input  accept="audio/*" type="file" multiple onchange="angular.element(this).scope().updateFiles(this.files);" />'+
                    '</div>'+
                    '<div ng-repeat="track in tracks" class="track">'+
                        '<input ng-model="track.title" class="title form-control"/>'+
                        '<input ng-model="track.mp3" readonly="true" class="mp3"/>'+
                        '<input ng-model="track.ogg" readonly="true" class="ogg"/>'+
                    '</div>'+
                '</div>'
    };
  });
