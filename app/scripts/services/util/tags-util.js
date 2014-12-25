'use strict';

/**
 * @ngdoc service
 * @name cmsApp.ReleatedPosts
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .service('TagsUtil', function TagsUtil(_) {
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

    this.getPostsByTags = function(selectedTags, allTagsWithPosts){
      var allPosts = _.values(_.pick(allTagsWithPosts, selectedTags));
      var result = intersection.apply(this, allPosts);

      return result;
    };
  });
