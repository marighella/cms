'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:dynamicRequired
 * @description
 * # dynamicRequired
 */
angular.module('cmsApp')
  .directive('dynamicField', function ($compile) {

    function addDynamicName(element, field){
      element.attr('name', field.name);
    }

    function addDynamicRequired(element, field){
      var need = field.need;

      if(need){
        var requiredField = need.field;
        var requiredValue = need.value;
        var condition     = (need.equal) ? '===' : '!==';
        var query = ['entity.',requiredField,condition,'\'',requiredValue,'\''].join('');

        element.attr('ng-required', query);
      }else {
        element.attr('ng-required', 'field.required');
      }
    }

    function addDynamicShow(element, field){
      var need = field.need;

      if(need){
        var requiredField = need.field;
        var requiredValue = need.value;
        var condition     = (need.equal) ? '===' : '!==';
        var query = ['entity.',requiredField,condition,'\'',requiredValue,'\''].join('');

        element.attr('ng-show', query);
      }
    }

  
    return {
      restrict:'A',
      terminal:true,
      priority:1000,
      link: function postLink(scope, element, attrs) {
        var field = scope.$eval(attrs.dynamicField);

        if(field){
          addDynamicName(element, field);
          addDynamicRequired(element, field);
          addDynamicShow(element, field);

          element.removeAttr('dynamic-field');
          $compile(element)(scope);
        }
      }
    };
  });
