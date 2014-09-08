'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Repository
 * @description
 * # Repository
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('Repository', function (GithubContent) {

    var post = {
      list: function(){
        return GithubContent.posts;
      }
    };

    return {
      post: post
    };
  });
