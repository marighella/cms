'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:searchForm
 * @description
 * # searchForm
 */
angular.module('cmsApp')
  .directive('searchForm',  function(){
  var filter = {
    year: '',
    month: '',
    title: '',
    search: function(){}
  };


  return {
      restrict: 'E',
      require : '?filter',
      replace: true,
      scope: {
        filter: '=',
      },
      templateUrl: 'views/post/include/search-form.html',
      link: function(scope, el){
        scope.filter = angular.extend(filter, scope.filter);

        scope.clearSearch = function(){
          scope.filter.title = '';
          scope.filter.search();
        };

        el.on('submit',function(){
          scope.submited = true;
        });
      }
    };
  });
