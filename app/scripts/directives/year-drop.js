'use strict';

angular.module('cmsApp')
  .directive('yearDrop', function () {
    var currentYear = new Date().getFullYear();
    return {
      require : '?ngModel',
      link: function(scope,element,attrs){
        scope.years = [];
        for (var i = +attrs.offset; i < +attrs.range + 1; i++){
          scope.years.push(currentYear + i);
        }
        scope.selected = currentYear;
      },
      template: '<select ng-model="filter.year" class="form-control" ng-change="find()" ng-options="y for y in years"></select>'
    };
  });
