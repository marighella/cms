'use strict';
/* jshint camelcase: false */
/* global getSlug */

angular.module('cmsApp')
.factory('NewsServiceContent', function ($q, $http, ENV, DateUtil, PromiseUtil) {

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

      return PromiseUtil.request(url);
    },
    load: function (postId, repository) {
      var url  = ENV.news.get;
      url =  url.replace(/:id/, postId);
      return PromiseUtil.request(url);
    },
    save: function(repository, post) {
      post.metadata.date = DateUtil.toISO8601(post.metadata.date);
      var obj = angular.toJson(post);
      var url = ENV.news.save;

      return PromiseUtil.request(url, 'POST', obj);
    },
    update: function(repository, post) {
      post.metadata.date = DateUtil.toISO8601(post.metadata.date);
      var obj = angular.toJson(post);
      var url = ENV.news.update;

      url =  url.replace(/:id/, post._id);

      return PromiseUtil.request(url, 'PUT', obj);
    }
  };
});
