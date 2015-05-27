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
.factory('NewsServiceContent', function ($q, ENV, Resource, DateUtil) {

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
    posts: function (repository, filter) {
      var url = ENV.news.search;
      var filters = 'year='+filter.year;

      if (DateUtil.isValidMonth(filter.month)){
        var month = 'month='+DateUtil.parseMonth(filter.month);
        filters = [filters, month].join('&');
      }

      if(filter.title){
        filters += '&title='+getSlug(filter.title);
      }

      url = url.replace(/:organization_fullname/, repository.full_name).replace(/:filters/, filters);

      return promiseGithub(url);
    },
    load: function (postUrl, repository) {
      var url  = ENV.news.get;
      url =  url.replace(/:organization_fullname/, repository.full_name).replace(/:path/, postUrl);
      var then = function(data){
        var post = data;
        post.filename = data.name;
        return post;
      };
      return promiseGithub(url, then);
    }
  };
});
