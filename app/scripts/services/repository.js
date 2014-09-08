'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Repository
 * @description
 * # Repository
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('Repository', function (Github) {

    var post = {
      list: function(){
        return Github.content.posts();
      }
    };

    return {
      post: post,
      organization: Github.organization
    };
  });
