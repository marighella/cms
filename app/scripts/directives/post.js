'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:searchForm
 * @description
 * # searchForm
 */
angular.module('cmsApp')
  .directive('post',  function($rootScope, Repository){


  return {
      restrict: 'E',
      require : '?post',
      replace: true,
      scope: {
        post: '=',
      },
      templateUrl: 'views/post/include/post.html',
      link: function(scope){
        scope.loading = false;
        console.log(scope.post);

        Repository.content.get(scope.post, $rootScope.repository).then(function(result){
          scope.post = result;
          scope.loading = true;
        });
      }
    };
  });
