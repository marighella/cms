'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:dynamicRequired
 * @description
 * # dynamicRequired
 */
angular.module('cmsApp')
  .directive('dynamicShow', function ($compile) {
    return {
      restrict:'A',
      scope: {
        field: '=field'
      },
      link: {
        post: function (scope, element, attrs) {

          var field = scope.field || false;
          if(!field){
            return;
          }

          var need = field.need || false;

          if(need){
             var requiredField = need.field;
             var requiredValue = need.value;
             var condition     = (need.equal) ? '===' : '!==';
             var query = ['entity.',requiredField,condition,'\'',requiredValue,'\''].join('');

             element.attr('ng-show', query);
          }

          element.removeAttr('dynamic-show');
          $compile(element)(scope);
        }
      }
    };
  });
