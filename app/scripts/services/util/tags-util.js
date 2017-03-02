'use strict';
/* globals getSlug */

angular.module('cmsApp')
  .factory('TagsUtil', function($q, _, ENV, PromiseUtil) {
    var search = function(query){
      query = (!!query) ? query.toLowerCase() : '';

      return PromiseUtil
        .request(ENV.api.tags, 'GET', {q: query})
        .then(function(result){
          return _.map(result, function(tag){
            return tag.toLowerCase().match(query);
          });
        });
    };

    var getRelatedPosts = function(tags){
      return PromiseUtil
        .request(ENV.api.news.related, 'GET', {tags: tags})
        .then(function(result){
          console.log(result);
          return result;
        });
    };

    return function(){
      return {
        search: search,
        getRelatedPosts: getRelatedPosts
      };
    };
  });
