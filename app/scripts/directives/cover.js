'use strict';

angular.module('cmsApp')
  .directive('cover', function () {
    return {
      restrict: 'E',
      replace: true,
      require : '?image',
      controller: 'UploadCtrl',
      scope: {
        image: '='
      },
      link: function(scope) {

        scope.loading = false;

        scope.$on('imageToBeCover', function(event, image) {
          scope.image = image;
        });

        scope.remove = function(){
          scope.image = '';
        };
        scope.updateFiles = function(fileList){
          scope.loading = true;
          scope.uploadFiles(fileList, function(result){
            scope.image = result.link;
            scope.loading = false;
          });
        };
      },
      template: '<div>'+
                    '<div class="upload btn btn-default btn-block" ng-disabled="loading" ng-show="!image" >'+
                      '<span>'+
                        '<i class="fa fa-upload"></i>'+
                        ' Adicionar '+
                      '</span>'+
                      '<input accept="image/*" type="file" onchange="angular.element(this).scope().updateFiles(this.files);" />'+
                    '</div>'+
                    '<img ng-src="{{ image }}" ng-show="!!image"/>'+
                    '<button class="btn btn-xs btn-danger btn-delete-thumb" ng-show="!!image" ng-click="remove()">X</button>'+
                '</div>'
    };
  });
