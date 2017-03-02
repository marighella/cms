'use strict';

angular.module('cmsApp')
  .factory('Repository', function (NewsServiceContent) {

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
        if(!!post.id){
          return NewsServiceContent.update(repository, post);
        }
        return NewsServiceContent.save(repository, post);
      }
    };

    return {
      content: newsService,
      skelleton: skelleton,
      tagsFile: tags
    };
  });
