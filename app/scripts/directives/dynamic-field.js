'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:dynamicRequired
 * @description
 * # dynamicRequired
 */
angular.module('cmsApp')
  .directive('dynamicField', function ($compile, _) {

    function addDynamicRequired(element, field){
      var need = field.need;

      if(need){
        var requiredField = need.field;
        var queries = [];
        var values = _.flatten([need.value]);

        values.forEach(function(element){
          var requiredValue = element;
          var condition     = (need.equal) ? '===' : '!==';
          queries.push(['entity.', requiredField, condition, '\'', requiredValue, '\''].join(''));
        });

        var query = queries.join((need.equal) ? '||' : '&&');

        if(field.required){
          element.attr('ng-required', query);
        }
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
          addDynamicRequired(element, field);

          element.removeAttr('dynamic-field');
          $compile(element)(scope);
        }
      }
    };
  });
