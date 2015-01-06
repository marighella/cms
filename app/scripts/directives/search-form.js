'use strict';

var directive = function(){
  var filter = {
    year: '',
    month: '',
    title: '',
    search: function(){}
  };
  //
  return {
      restrict: 'AE',
      require : '?filter',
      scope: {
        filter: '=',
      },
      templateUrl: 'views/post/include/search-form.html',
      link: function(scope, el){
        scope.filter = angular.extend(filter, scope.filter);

        scope.clearSearch = function(){
          scope.filter.title = '';
          scope.submited = false;
          scope.submit();
        };

        el.on('submit',function(){
          scope.submited = true;
        });
      }
    };
};

angular.module('cmsApp')
  .directive('searchForm', directive);
