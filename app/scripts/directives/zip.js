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
            console.log(result);
            scope.downloadLink = result.link;
          });
        };
      },
      template: '<div class="album">'+
                    '<input type="file" accept=".zip, .rar" onchange="angular.element(this).scope().updateFile(this.files);" />'+
                '</div>'
    };
  });
