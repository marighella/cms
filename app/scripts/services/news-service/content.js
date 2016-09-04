'use strict';
/* jshint camelcase: false */
/* global getSlug */

angular.module('cmsApp')
.factory('NewsServiceContent', function ($q, $http, ENV, DateUtil) {

  function promise(address, method, data, then, error){
    var deferred   = $q.defer();
    var promise    = deferred.promise;
    var connection = $http;

    method = method ||'GET';
    data = data || {};
    then = then || function(data){return data;};
    error = error || function(error){return error;};

    var request = undefined;

    if(method === 'POST'){
      request = connection.post(address, data);
    }else{
      request = connection.get(address);
    }

    request.then(
      function successCallback(response){
        return deferred.resolve(then(response.data));
      },
      function errorCallback(response){
        return deferred.reject(error(response.code));
      }
    );

    return promise;
  }

  return {
    search: function (repository, filter) {
      var url = ENV.news.search;
      var filters = 'year='+filter.year;

      if (DateUtil.isValidMonth(filter.month)){
        var month = 'month='+DateUtil.parseMonth(filter.month);
        filters = [filters, month].join('&');
      }

      if(filter.title){
        filters += '&title='+getSlug(filter.title);
      }

      return promise(url);
    },
    load: function (postId, repository) {
      var url  = ENV.news.get;
      url =  url.replace(/:id/, postId);
      return promise(url);
    },
    save: function(repository, post) {
      post.metadata.date = DateUtil.toISO8601(post.metadata.date);
      var obj = angular.toJson(post);
      var url = ENV.news.save;

      return promise(url, 'POST', obj);
    },
    update: function(repository, post) {
      post.metadata.date = DateUtil.toISO8601(post.metadata.date);
      var obj = JSON.stringify(post);
      var url = ENV.news.update;

      url =  url.replace(/:id/, post._id);

      return promise(url, 'PUT', obj);
    }
  };
});
