'use strict';

angular.module('cmsApp')
  .directive('post', function($rootScope, PromiseUtil, ENV){

  return {
      restrict: 'E',
      require : '?id',
      replace: true,
      scope: {
        id: '=',
        weight: '=',
      },
      templateUrl: 'views/post/include/post.html',
      link: function(scope){
        var url = ENV.api.news.get.replace(":id", scope.id);
        scope.loading = true;

        PromiseUtil
          .request(url)
          .then(function(result){
            scope.post = result;
            scope.loading = false;
          });
      }
    };
  });
