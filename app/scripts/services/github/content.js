'use strict';
/*jshint camelcase: false */

/**
 * @ngdoc service
 * @name cmsApp.Content
 * @description
 * # Content
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('GithubContent', function ($q, Resource, PostUtil, DateUtil) {
    return {
      skelleton: function(user){
        var deferred = $q.defer();
        var promise = deferred.promise;
        var github = Resource.github;
        var address = ['repos',user.repository.full_name,'contents/skelleton.json?ref=master'].join('/');

        github.get(address, { type: 'GET' }).then(function(data){
          var skelleton = PostUtil.decodeContent(data.content);
          return deferred.resolve(skelleton);
        });

        return promise;
      },
      post: function (post) {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var github = Resource.github;

        github.get(post.git_url).then(function(data){
          var post = PostUtil.load(data.content);

          return deferred.resolve(post);
        });
        
        return promise;
      },
      posts: function (user, filter) {
        var yearMonth = DateUtil.format(filter.year, filter.month);
        var address = ['repos',user.repository.full_name,'contents/_posts', yearMonth].join('/');

        var deferred = $q.defer();
        var promise = deferred.promise;
        var github = Resource.github;

        github.get(address).then(function(data){
          return deferred.resolve(data);
        });

        return promise;
      },
      save: function(post) {
        console.log(post);
      }
    };
  });
