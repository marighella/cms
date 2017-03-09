'use strict';

angular.module('cmsApp')
  .directive('yearDrop', function () {
    var currentYear = new Date().getFullYear();
    return {
      require : '?ngModel',
      replace: true,
      scope: {
        filter: '=',
        change: '&',
        disabled: '='
      },
      link: function(scope,element,attrs){
        scope.years = [];
        for (var i = +attrs.offset; i < +attrs.range + 1; i++){
          scope.years.push(currentYear + i);
        }
        scope.selected = currentYear;
      },
      template: '<md-select ng-model="filter.year" ng-disabled="disabled" ng-change="change()"> <md-option ng-value="year" ng-repeat="year in years">{{ year }}</md-option> </md-select>'
    };
  });
