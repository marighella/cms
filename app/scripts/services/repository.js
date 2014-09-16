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

    var repositorie = {
      get: function(repositorie){
        return Github.content.skelleton(repositorie);
      }
    };

    return {
      post: post,
      organization: Github.organization,
      skelleton: repositorie
    };
  });
