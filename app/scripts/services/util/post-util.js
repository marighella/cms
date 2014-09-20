'use strict';
/* globals escape */

/**
 * @ngdoc service
 * @name cmsApp.Dateutil
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .service('PostUtil', function PostUtil(DateUtil) {
    this.decodeContent = function(content){
      return decodeURIComponent(escape(atob(content)));
    };
    this.load = function(content){
      var post = {};
      var parts = decodeURIComponent(escape(atob(content))).split('---');

      post.body = parts.pop().replace(/^\n/, '');
      post.metadata = window.jsyaml.load(parts.pop());
      post.createdTime = DateUtil.fromISO8601(post.metadata.date).toMilliseconds();

      return post;
    };
  });
