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
      terminal:true,
      priority:1000,
      link: function postLink(scope, element, attrs) {
        var field = scope.$eval(attrs.dynamicShow);
        if(!field){
          return;
        }
        var need = field.need;

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
    };
  });
