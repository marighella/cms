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
      terminal:true,
      link: function postLink(scope, element, attrs) {
        var field = scope.$eval(attrs.dynamicRequired);

        if(field.need){
         if(field.need.equal){
           element.attr('ng-required', 'entity.section === \'tv\'');
         }else if(field.need.notEqual){
           element.attr('ng-required', 'entity.section !== \'tv\'');
         }
        }else {
           element.attr('ng-required', 'field.required');
        }

        element.removeAttr('dynamic-required');
        $compile(element)(scope);
      }
    };
  });
