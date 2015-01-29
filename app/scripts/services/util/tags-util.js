'use strict';
/* globals getSlug */

/**
 * @ngdoc service
 * @name cmsApp.ReleatedPosts
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .factory('TagsUtil', function($q, _) {
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
      var deferred = $q.defer();
      var tags = _.map(allTags, function(e){
        if(e.toLowerCase().match(query)){
          return {tag: e};
        }
        return false;
      });
      deferred.resolve(_.compact(tags));

      return deferred.promise;
    };

    var getPostsByTags = function(selectedTags){
      var postsByTag = _.pick(tagsFile, selectedTags);
      var allPosts = _.values(postsByTag);
      if(selectedTags.length > 1){
        return intersection.apply(this, allPosts);
      }
      return _.countBy(_.flatten(allPosts));
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
      return _.map(sortable, function(element){ return element[0];});
    };

    var factory = function(file){
      tagsFile = file || {};
      allTags  = _.keys(tagsFile);
      return {
        search: search,
        getPostsByTags: getPostsByTags,
        getReleatedPosts: getReleatedPosts
      };
    };
    return factory;
  });
