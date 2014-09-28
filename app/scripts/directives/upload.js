'use strict';

angular.module('cmsApp')
  .directive('upload', function () {
    return {
      restrict: 'A',
      controller: 'UploadCtrl',
      scope: {},
      link: function(scope, el){
        el.bind('change', function(event){
          var files = event.target.files;
          scope.uploadFiles(files);
          event.target.value = '';
        });

        scope.$on('$destroy', function() {
          el.unbind('change');
        });
      }
    };
  });
