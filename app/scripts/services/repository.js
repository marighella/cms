'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Repository
 * @description
 * # Repository
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('Repository', function (Github, NewsServiceContent) {

    var github = {
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
    };
    var newsService = {
      search: function(repository, filter){
        return NewsServiceContent.posts(repository, filter);
      },
      list: function(repository, filter){
        return NewsServiceContent.posts(repository, filter);
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
      content: angular.extend(github,newsService),
      organization: Github.organization,
      skelleton: skelleton,
      tagsFile: tags
    };
  });
