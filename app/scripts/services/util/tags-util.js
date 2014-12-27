'use strict';

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
      var deferred = $q.defer();
      var tags = _.map(allTags, function(e){
        if(e.match(query)){
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
      var result = intersection.apply(this, allPosts);

      if(_.keys(result).length < 3){


        var newerByTag = {};
        _.each(postsByTag, function(element){
          newerByTag[element[0]] = 0;
        });

        result = _.extend(newerByTag, result);
      }

      return result;
    };

    var factory = function(file){
      tagsFile = file;
      allTags  = _.keys(tagsFile);
      return {
        search: search,
        getPostsByTags: getPostsByTags
      };
    };
    return factory;
  });
