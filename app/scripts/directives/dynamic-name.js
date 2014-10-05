'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:dynamicName
 * @description
 * # dyunamic-name
 */
/* jshint undef: false */
/* jshint camelcase: false */
angular.module('cmsApp')
.directive('dynamicName',function($compile){

  return {
    restrict:'A',
    link: {
      post: function postLink(scope, element, attrs){
        element.attr('name', attrs.dynamicName);
        element.removeAttr('dynamic-name');
        $compile(element)(scope);
      }
    }
  };
});
