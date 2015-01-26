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
    skelleton: function(repository){
      var address = ['repos',repository.full_name,'contents/skelleton.json?ref=master'].join('/');
      var then = function(data){
        return PostUtil.decodeContent(data.content);
      };
      return promiseGithub(address, then);
    },
    load: function (postUrl, repository) {
      var address = ['repos',repository.full_name,'contents/',postUrl].join('/');
      var then = function(data){
        var post = PostUtil.load(data.content);
        post.filename = data.name;
        return post;
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
    tagsFile: function(user){
      var address = ['repos',user.repository.full_name,'contents/tags.json?ref=gh-pages'].join('/');
      var then = function(data){
        return PostUtil.decodeContent(data.content);
      };

      return promiseGithub(address, then);
    },

    posts: function (repository, filter) {
      var address = ['search/code?q=', 'title'].join('');
      var path = ['+path:','_posts', filter.year].join('/');
      var repo = ['+repo:', repository.full_name].join('');
      var filename = ['+filename', 'md'].join(':');
      var order = '&sort=updated&order=desc';

      if (filter.title.length > 0){
        filename = ['+filename', getSlug(filter.title)].join(':');
      }

      if (DateUtil.isValidMonth(filter.month)){
        var month = DateUtil.parseMonth(filter.month);
        path = [path, month].join('/');
      }

      var url = [address, filename, path, repo, order].join('');
      
      var then = function (data){
        data.items =  data.items.sort(function(a,b){
          var date_a =  new Date(a.name.substring(0,10));
          var date_b = new Date(b.name.substring(0,10));
          return date_b - date_a;
        });
        return data.items;
      };
      return promiseGithub(url, then);
    },

    save: function(repository, post, sha) {
      var obj = PostUtil.serialize(post);
      var commit = JSON.stringify({
        sha: sha,
        content: btoa(obj),
        message: 'commit from cms'
      });

      var yearMonth = PostUtil.getYearMonthCreated(post);
      var address = ['repos',repository.full_name,'contents/_posts', yearMonth, post.filename].join('/');

      var deferred = $q.defer();
      var promise = deferred.promise;
      var github = Resource.github;

      if(!!Resource.isProduction){
        github.put(address, {
          data: commit,
          cache: false
        }).error(function(status, message){
          console.log(status, message);
        }).then(function(data){
          return deferred.resolve(data);
        });
      }else{
        PostUtil.downloadMarkdown(post);
        deferred.resolve();
      }

      return promise;
    }
  };
});
