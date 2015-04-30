'use strict';

angular.module('cmsApp')
  .directive('zip', function () {
    return {
      restrict: 'E',
      replace: true,
      require : '?downloadLink',
      controller: 'UploadCtrl',
      scope: {
        downloadLink: '='
      },
      link: function(scope) {
        scope.updateFile = function(files){
          scope.uploadFiles(files, function(result){
            scope.downloadLink = result.link;
          });
        };
      },
      template: '<div class="zip">'+
                  '<div class="upload btn btn-default btn-block" ng-hide="downloadLink">'+
                    '<span><i class="fa fa-upload"></i> Adicionar album zipado</span>'+
                    '<input type="file" accept=".zip, .rar" onchange="angular.element(this).scope().updateFile(this.files);" />'+
                  '</div>'+
                  '<input class="form-control" ng-model="downloadLink" readonly="true" ng-show="downloadLink"/>'+
                '</div>'
    };
  });
