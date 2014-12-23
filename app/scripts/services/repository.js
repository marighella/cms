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
      list: function(user, filter){
        return Github.content.posts(user, filter);
      },
      get: function(post){
        return Github.content.post(post);
      },
      save: function(user, post, year, month, sha){
        return Github.content.save(user, post, year, month, sha);
      }
    };

    var skelleton = {
      get: function(user){
        return Github.content.skelleton(user);
      }
    };
    var tags = {
      get: function(user){
        return Github.content.tagsFile(user);
      }
    };

    return {
      post: post,
      organization: Github.organization,
      skelleton: skelleton,
      tagsFile: tags
    };
  });
