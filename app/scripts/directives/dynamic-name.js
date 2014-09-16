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
    terminal:true,
    priority:2000,
    link:function(scope,element,attrs){
      element.attr('name', scope.$eval(attrs.dynamicName));
      element.removeAttr('dynamic-name');
      $compile(element)(scope);
    }
  };
});
