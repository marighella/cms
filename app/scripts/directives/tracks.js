'use strict';

angular.module('cmsApp')
  .directive('tracks', function () {
    return {
      restrict: 'E',
      replace: true,
      require : '?tracks',
      scope: {
        tracks: '='
      },
      link: function(scope,element,attrs){
        scope.add = function() {
          scope.tracks.push({});
        };

        scope.tracks = [{}];
      },
      template: '<div class="tracks">'+
                    '<button class="add" ng-click="add()"></button>'+
                    '<div ng-repeat="track in tracks" class="track">'+
                        '<input ng-model="track.title" class="title"/>'+
                        '<input ng-model="track.mp3" class="mp3"/>'+
                        '<input ng-model="track.ogg" class="ogg"/>'+
                    '</div>'+
                '</div>'
    };
  });
