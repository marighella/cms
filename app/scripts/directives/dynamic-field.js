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
      var queries = [];
      var values =[];

      if(need){
        var requiredField = need.field;
        if(typeof need.value === "string")
          values.push(need.value);    
        else 
          values = need.value;

        for(var i=0; i < values.length; i++){
          var requiredValue = values[i];
          var condition     = (need.equal) ? '===' : '!==';
          queries[i] = ['entity.',requiredField,condition,'\'',requiredValue,'\''].join('');
        }
       
        var query = queries.join('&&');
        element.attr('ng-required', query);
        element.attr('ng-show', query);
      
      }else {
        element.attr('ng-required', 'field.required');
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

          element.removeAttr('dynamic-field');
          $compile(element)(scope);
        }
      }
    };
  });
