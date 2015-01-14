'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:searchForm
 * @description
 * # searchForm
 */
angular.module('cmsApp')
  .directive('searchForm',  function($q, DateUtil){

  var filter = {
    year: '',
    month: '',
    title: '',
    search: function(){ return $q.defer().promise;  }
  };

  var search = function(element, scope, filter){
     return function(){
       element.toggleClass('disabled', true);
       scope.loading = true;

       filter.search().then(function(){
         scope.loading = false;
         element.toggleClass('disabled', false);
       });
     };
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
        scope.loading = false;

        scope.search = search(el, scope, scope.filter);
        scope.clearSearch = function(){
          scope.filter.title = '';
          scope.filter.month = DateUtil.now.getMonth();
          scope.filter.year = DateUtil.now.getYear();
          scope.search();
        };

        el.on('submit',function(){
          scope.submited = true;
        });
      }
    };
  });
