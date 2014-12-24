'use strict';

var directive = function(){
  //
  function link(scope, el){
    scope.clearSearch = function(){
      scope.searchValue= '';
      scope.submited = false;
      scope.$apply();
      scope.submit();
    };
    //
    el.on('submit',function(){
      scope.submited = true;
    });
  }
  //
  return {
      restrict: 'A',
      require : '?searchValue',
      scope: {
        submit: '&',
        searchValue: '='
      },
      templateUrl: '/views/post/include/search-form.html',
      link: link
    };
};

angular.module('cmsApp')
  .directive('searchForm', directive);
