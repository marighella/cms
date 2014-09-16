'use strict';

angular.module('cmsApp')
  .directive('expand', function () {
    return {
      restrict: 'A',
      link: function(scope, el){
        var expandInput = function() {
          var textArea = el[0];
          while (textArea.rows > 1 && textArea.scrollHeight < textArea.offsetHeight) {
            textArea.rows--;
          }
          var h=0;
          while (textArea.scrollHeight > textArea.offsetHeight && h!==textArea.offsetHeight) {
            h=textArea.offsetHeight;
            textArea.rows++;
          }
        };

        el.bind('keyup', function(){
          expandInput();
        });

        scope.$watch(function(){
          return el[0].value;
        }, function(){
            expandInput();
          });
      }
    };
  });
