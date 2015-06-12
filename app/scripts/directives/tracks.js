'use strict';

angular.module('cmsApp')
  .directive('tracks', function ($timeout, $q, $rootScope, $http, ENV, _) {
    return {
      restrict: 'E',
      replace: true,
      require : '?tracks',
      controller: 'UploadCtrl',
      scope: {
        tracks: '='
      },
      link: function(scope) {
        scope.addTracks = function(fileList){
          var deferred = $q.defer();

          deferred.promise.then(function(){
            _.each(fileList, function(file){
              scope.previewTracks.push({title: file.name, file: file, uploaded: false});
            });
            scope.showUpload = true;
          });

          deferred.resolve();
        };

        scope.removeTrack = function(track){
          var index  = scope.previewTracks.indexOf(track);

          if(track.uploaded){
            $http({
              url: ENV.upload,
              method: 'DELETE',
              data : {
                'organization': $rootScope.user.organization.id,
                'url': track.mp3
              }
            }).success(function(data) {
              console.log(data);
            }).error(function(error) {
              console.log(error);
              $rootScope.addError('Desculpa, algo de errado aconteceu ao remover a trilha do album.');
            });
          }
          return scope.previewTracks.pop(index);
        };

        scope.showUpload = false;
        scope.uploading  = 0;

        scope.uploadTracks = function(){
          scope.uploading = 0;
          _.each(scope.previewTracks, function(track){
            if(!track.uploaded){
              scope.uploading += 1;

              scope.uploadFile(track.file, function(result){
                track.mp3 = result.embed;
                track.uploaded = true;
                scope.uploading -= 1;
              });
            }
          });
        };

        scope.tracks = scope.tracks || [];
        scope.previewTracks = [];

        _.each(scope.tracks, function(track){
          track.uploaded = true;
          scope.previewTracks.push(track);
        });

      },
      template: '<div class="tracks">'+
                    '<div class="upload btn btn-default btn-block">'+
                      '<span><i class="fa fa-music"></i> Adicionar músicas </span>'+
                      '<input  accept="audio/*" type="file" multiple onchange="angular.element(this).scope().addTracks(this.files);" />'+
                    '</div>'+
                    '<ul ui-sortable="{ handle: \'> .order\' }" ng-model="previewTracks">'+
                      '<li ng-repeat="track in previewTracks" class="track {{ track.uploaded ? \'uploaded\' : \'new\'   }}">'+
                          '{{ $index + 1 | leadingZero }}'+
                          '<i class="fa fa-sort order"></i>'+
                          '<input ng-model="track.title" class="title form-control"/>'+
                          '<input ng-model="track.mp3" readonly="true" class="mp3"/>'+
                          '<input ng-model="track.ogg" readonly="true" class="ogg"/>'+
                          '<i class="fa fa-times remove" ng-click="removeTrack(track)"></i>'+
                      '</li>'+
                    '</ul>'+
                    '<button class="upload btn btn-default btn-block" ng-if="showUpload" ng-click="uploadTracks()" ng-disable="uploading == 0">'+
                      '<span ng-if="uploading == 0">'+
                          '<i class="fa fa-upload"></i> Upload'+
                      '</span>'+
                      '<span ng-if="uploading > 0">'+
                          '<i class="fa fa-cog fa-spin" ></i>'+
                          'Subindo o arquivo...'+
                      '</span>'+
                    '</button>'+
                '</div>'
    };
  });
