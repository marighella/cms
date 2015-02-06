'use strict';
/* global getSlug */

/**
 * @ngdoc directive
 * @name cmsApp.directive:searchForm
 * @description
 * # searchForm
 */
angular.module('cmsApp')
  .directive('post', function($rootScope, Repository, _){


  return {
      restrict: 'E',
      require : '?post',
      replace: true,
      scope: {
        postUrl: '=',
        tags: '='
      },
      templateUrl: 'views/post/include/post.html',
      link: function(scope){
        scope.loading = false;
        scope.tags = scope.tags || [];
        scope.checkTag = function (tag) {
          return _.find(scope.tags, function (t) {return getSlug(t.tag) === getSlug(tag.tag);});
        };

        console.log(scope.postUrl);

        Repository.content.get(scope.postUrl, $rootScope.repository).then(function(result){
          scope.post = result;
          scope.loading = true;
        });
      }
    };
  });
