'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Content
 * @description
 * # Content
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('GithubUser', function (Resource, $q) {
    return {
      getAuth: function () {
        var deferred = $q.defer();
        var res = Resource.github;

        res.get('user').then(function(data){
          deferred.resolve(data);
        });

        return deferred.promise;
      }
    };
  });
