'use strict';
/* jshint camelcase: false */
/* global getSlug */

/**
 * @ngdoc service
 * @name cmsApp.Content
 * @description
 * # Content
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
.factory('GithubContent', function ($q, Resource, PostUtil, DateUtil) {

  function promiseGithub(address, then, error){
    var deferred = $q.defer();
    var promise = deferred.promise;
    var github = Resource.github;
    then = then || function(data){return data;};
    error = error || function(error){return error.responseJSON.message;};

    github.get(address,{
      cache: false
    }).error(function(code){
      return deferred.reject(error(code));
    }).then(function(data){
      return deferred.resolve(then(data));
    });
    return promise;
  }

  return {
    skelleton: function(repository){
      var address = ['repos',repository.full_name,'contents/skelleton.json?ref=master'].join('/');
      var then = function(data){
        return PostUtil.decodeContent(data.content);
      };
      var error = function(error){
        console.log(error);
        var message = error.responseJSON.message;
        if(error.status === 404) {
          message = 'Não achei um metadado no seu repositório, usarei o meu padrão!';
        }

        return message;
      };

      return promiseGithub(address, then, error);
    },
    tagsFile: function(user){
      var address = ['repos',user.repository.full_name,'contents/tags.json?ref=gh-pages'].join('/');
      var then = function(data){
        return PostUtil.decodeContent(data.content);
      };

      return promiseGithub(address, then);
    },
  };
});
