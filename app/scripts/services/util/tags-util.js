'use strict';
/* globals getSlug */

angular.module('cmsApp')
  .factory('TagsUtil', function($q, _, ENV, PromiseUtil) {
    var intersection = function(array){
      if (!array) {
        return [];
      }

      var result = [];
      var argsLength = arguments.length;
      var args = arguments;
      var header = 0;
      var finished = false;

      while(!finished){
        for( var i = header; i < argsLength; i++){
          if( i !== header ){
            var inter = _.intersection(args[header], args[i]);
            result.push(inter);
          }
        }

        header++;
        finished = (header === argsLength);
      }

      var agroups = _.flatten(result);

      return _.countBy(agroups);
    };
    var tagsFile = {};
    var allTags  = {};

    var search = function(query){
      query = (!!query) ? query.toLowerCase() : '';
      var promise = PromiseUtil
        .request(ENV.api.tags, 'GET', {query: query})
        .then(function(result){
          return _.map(result, function(tag){
            return tag.toLowerCase().match(query);
          });
        });

      return promise;
    };

    var getPostsByTags = function(selectedTags){
      var postsByTag = _.pick(tagsFile, function(value, key){
        return _.find(selectedTags, function(item){
          return getSlug(key) === getSlug(item);
        });
      });

      var allPosts = _.values(postsByTag);
      if(selectedTags.length > 1){
        return intersection.apply(this, allPosts);
      }
      return _.countBy(_.last(_.flatten(allPosts),10));
    };

    var getReleatedPosts = function(tags, options){
      options = options || { postToRemove: false };
      var tagsWithSlug = _.map(tags, function(e){ return getSlug(e.tag || e);} );
      var postsByTags =  getPostsByTags(tagsWithSlug);

      var sortable = [];
      for (var post in postsByTags){
        if(!options.postToRemove || !post.match(options.postToRemove)){
          sortable.push([post, postsByTags[post] || 0]);
        }
      }

      sortable = sortable.sort(function(a, b) {return b[1] - a[1];});

      var result = _.map(sortable, function(element){ return element[0];});

      return result.slice(0,5);
    };

    var factory = function(){
      return {
        search: search,
        getPostsByTags: getPostsByTags,
        getReleatedPosts: getReleatedPosts
      };
    };
    return factory;
  });
