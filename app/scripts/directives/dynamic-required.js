'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:dynamicRequired
 * @description
 * # dynamicRequired
 */
angular.module('cmsApp')
  .directive('dynamicRequired', function ($compile) {
    return {
      restrict:'A',
      scope: {
        field: '=field'
      },
      link: {
        post: function(scope, element) {

          var field = scope.field || false;
          if (!field) {
            return;
          }

          var need = angular.isObject(field.need) ? field.need : false;

          if(need){
             var requiredField = need.field;
             var requiredValue = need.value;
             var condition     = (need.equal) ? '===' : '!==';
             var query = ['entity.',requiredField,condition,'\'',requiredValue,'\''].join('');

             element.attr('ng-required', query);
          }else {
             element.attr('ng-required', 'field.required');
          }

          element.removeAttr('dynamic-required');
          $compile(element)(scope);
        }
      }
    };
  });
