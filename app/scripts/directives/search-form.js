'use strict';

var directive = function(){
  //
  return {
      restrict: 'AE',
      require : '?filter',
      scope: {
        submit: '&',
        filter: '=',
        changeDate: '&'
      },
      templateUrl: '/views/post/include/search-form.html',
      link: function(scope, el){
        scope.clearSearch = function(){
          scope.filter.title= '';
          scope.submited = false;
          scope.submit();
        };
        //
        el.on('submit',function(){
          scope.submited = true;
        });
      }
    };
};

angular.module('cmsApp')
  .directive('searchForm', directive);
