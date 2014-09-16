'use strict';
/* jshint undef:false */

angular.module('cmsApp')
  .directive('ckEditor', function () {
    return {
      require : '?ngModel',
      link : function($scope, element, attr, ngModel) {
        var ck = window.CKEDITOR.replace(element[0]);

        CKEDITOR.plugins.addExternal('youtube', '/ckeditor-plugins/youtube/', 'plugin.js');

        ck.config.extraPlugins = 'youtube,justify,image2';
        ck.config.language = 'pt-BR';
        ck.config.height = '100%';

        if(!ngModel) {
          return;
        }

        ck.on('maximize', function() {
          window.scrollTo(0, 0);
        });

        ck.on('pasteState', function() {
          $scope.$apply(function() {
            ngModel.$setViewValue(ck.getData());
          });
        });

        ngModel.$render = function() {
          ck.setData(ngModel.$viewValue);
        };
      }
    };
  });
