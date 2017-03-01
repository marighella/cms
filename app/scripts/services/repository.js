'use strict';

angular.module('cmsApp')
  .factory('Repository', function (Github, NewsServiceContent) {

    var newsService = {
      search: function(repository, filter){
        return NewsServiceContent.search(repository, filter);
      },
      list: function(repository, filter){
        return NewsServiceContent.search(repository, filter);
      },
      get: function(post, repository){
        return NewsServiceContent.load(post, repository);
      },
      save: function(repository, post){
        if(!!post._id){
          return NewsServiceContent.update(repository, post);
        }
        return NewsServiceContent.save(repository, post);
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
      content: newsService,
      organization: Github.organization,
      skelleton: skelleton,
      tagsFile: tags
    };
  });
