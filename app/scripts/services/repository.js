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

    var content = {
      list: function(repository, filter){
        return Github.content.posts(repository, filter);
      },
      get: function(post, repository){
        if(post.url){
          return Github.content.post(post);
        }else{
          return Github.content.load(post, repository);
        }
      },
      save: function(repository, post, year, month, sha){
        return Github.content.save(repository, post, year, month, sha);
      },
      search: function(repository, filter){
        return Github.content.search(repository, filter);
      }
    };
    var tags = {
      get: function(user){
        return Github.content.tagsFile(user);
      }
    };
    var skelleton = {
      get: function(repository){
        return Github.content.skelleton(repository);
      }
    };

    return {
      content: content,
      organization: Github.organization,
      skelleton: skelleton,
      tagsFile: tags
    };
  });
