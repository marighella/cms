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
              scope.tracks.push({title: file.name, file: file, uploaded: false});
            });
            scope.showUpload = true;
          });

          deferred.resolve();
        };

        scope.removeTrack = function(index){
          var track  = scope.tracks[index];

          if(track.uploaded){
            $http.delete(
              ENV.upload,
              {params : {
                'organization': $rootScope.user.organization.id,
                'url': track.mp3
              }}
            ).success(function(data) {
              console.log(data);
            }).error(function(error) {
              console.log(error);
              $rootScope.addError('Desculpa, algo de errado aconteceu ao remover a trilha do album.');
            });
          }
          var result = scope.tracks.splice(index, 1);

          if(scope.tracks.length === 0){
            scope.showUpload = false;
          }

          return result;
        };

        scope.showUpload = false;
        scope.uploading  = 0;

        scope.uploadTracks = function(){
          scope.uploading = 0;
          _.each(scope.tracks, function(track){
            if(!track.uploaded){
              scope.uploading += 1;

              scope.uploadFile(track.file, function(result){
                track.uploaded = true;
                track.file = '';
                track.mp3  = result.embed;
                scope.uploading -= 1;

                if(scope.uploading === 0){
                  scope.showUpload = false;
                }
              });
            }
          });
        };

        scope.tracks = scope.tracks || [];

        _.each(scope.tracks, function(track){
          track.uploaded = true;
        });

      },
      template: '<div class="tracks">'+
                    '<div class="upload btn btn-default btn-block">'+
                      '<span><i class="fa fa-music"></i> Adicionar músicas </span>'+
                      '<input  accept="audio/*" type="file" multiple onchange="angular.element(this).scope().addTracks(this.files);" />'+
                    '</div>'+
                    '<ul ui-sortable="{ handle: \'> .order\' }" ng-model="tracks">'+
                      '<li ng-repeat="track in tracks" class="track {{ track.uploaded ? \'uploaded\' : \'new\'   }}">'+
                          '{{ $index + 1 | leadingZero }}'+
                          '<i class="fa fa-arrows order"></i>'+
                          '<input ng-model="track.title" class="title form-control"/>'+
                          '<input ng-model="track.mp3" readonly="true" class="mp3"/>'+
                          '<input ng-model="track.ogg" readonly="true" class="ogg"/>'+
                          '<i class="fa fa-times remove" ng-click="removeTrack($index)"></i>'+
                      '</li>'+
                    '</ul>'+
                    '<button class="upload btn btn-default btn-block" ng-if="showUpload" ng-click="uploadTracks()" ng-disable="uploading == 0">'+
                      '<span ng-if="uploading == 0">'+
                          '<i class="fa fa-upload"></i> Upload'+
                      '</span>'+
                      '<span ng-if="uploading > 0">'+
                          '<i class="fa fa-cog fa-spin" ></i>'+
                          ' Subindo o arquivo... {{ uploading  }}'+
                      '</span>'+
                    '</button>'+
                '</div>'
    };
  });
