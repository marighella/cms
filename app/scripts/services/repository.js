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
      },
      search: function(value, repository){
        return Github.content.search(value, repository);
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
