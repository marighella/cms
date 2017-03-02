'use strict';
/* global getSlug */

angular.module('cmsApp')
  .directive('post', function($rootScope, PromiseUtil, _){


  return {
      restrict: 'E',
      require : '?post',
      replace: true,
      scope: {
        postUrl: '=',
        tags: '=',
        coverField: '='
      },
      templateUrl: 'views/post/include/post.html',
      link: function(scope){
        scope.coverField = scope.coverField || {name:''};
        scope.loading = false;
        scope.tags = scope.tags || [];
        scope.checkTag = function (tag) {
          return _.find(scope.tags, function (t) {return getSlug(t.tag) === getSlug(tag.tag);});
        };

        PromiseUtil
          .request(scope.postUrl)
          .then(function(result){
            scope.post = result;
            scope.loading = true;
          });
      }
    };
  });
