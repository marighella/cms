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
    function promiseGithub(address, then){
      var deferred = $q.defer();
      var promise = deferred.promise;
      var github = Resource.github;
      then = then || function(data){return data;};

      github.get(address,{
          cache: false
      }).then(function(data){
        return deferred.resolve(then(data));
      });

      return promise;
    }

    return {
      skelleton: function(user){
        var address = ['repos',user.repository.full_name,'contents/skelleton.json?ref=master'].join('/');
        var then = function(data){
          return PostUtil.decodeContent(data.content);
        };

        return promiseGithub(address, then);
      },
      post: function (post) {
        var then = function(data){
          var post = PostUtil.load(data.content);
          post.filename = data.name;
          return post;
        };

        return promiseGithub(post.url, then);
      },
      posts: function (user, filter) {
        var yearMonth = DateUtil.format(new Date(filter.year, filter.month));
        var address = ['repos',user.repository.full_name,'contents/_posts', yearMonth].join('/');

        return promiseGithub(address);
      },
      save: function(user, post, sha) {
        var obj = PostUtil.serialize(post);
        var commit = JSON.stringify({
          sha: sha,
          content: btoa(obj),
          message: 'commit from cms'
        });

        var yearMonth = DateUtil.format(new Date());
        var address = ['repos',user.repository.full_name,'contents/_posts', yearMonth, post.filename].join('/');

        var deferred = $q.defer();
        var promise = deferred.promise;
        var github = Resource.github;

        github.put(address, {
          data: commit,
          cache: false
        }).error(function(status, message){
          console.log(status, message);
        }).then(function(data){
          return deferred.resolve(data);
        });

        return promise;
      }
    };
  });
