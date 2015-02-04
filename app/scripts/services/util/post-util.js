'use strict';
/* globals escape, unescape, getSlug */

/**
 * @ngdoc service
 * @name cmsApp.Dateutil
 * @description
 * # Dateutil
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .service('PostUtil', function PostUtil($http, $q, DateUtil, _, YoutubeLinkUtil, VimeoLinkUtil) {
    
    function formatDate(post) {
      var today = new Date(post.metadata.date);
      return today.toISOString().split('T')[0];
    }

    function getVideoThumbnailUrl(videoUrl) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(YoutubeLinkUtil.link(videoUrl).getValidUrl()){
        deferred.resolve(YoutubeLinkUtil.link(videoUrl).getVideoThumbnailUrl());
      }
      else if(VimeoLinkUtil.link(videoUrl).getValidUrl()){
        deferred.resolve(VimeoLinkUtil.link(videoUrl).getVideoThumbnailUrl());
      }else{
        deferred.resolve('');
      }

      return promise;
    }

    function compilePost(post){
      return encodeURIComponent(['---', window.jsyaml.dump(post.metadata), '---', post.body].join('\n'));
    }

    this.downloadMarkdown = function(post){
      window.open('data:application/octet-stream;charset=utf-8,filename='+post.filename+','+ compilePost(post),
                 post.filename);
    };
    this.decodeContent = function(content){
      return decodeURIComponent(escape(atob(content)));
    };
    this.load = function(content){
      var post = {};
      var parts = this.decodeContent(content).split('---');
      parts = _.compact(parts);
      var metadata = parts.shift();
      var body  = parts.join('---');

      post.body = body.replace(/^\n/, '');
      post.metadata = window.jsyaml.load(metadata);

      return post;
    };
    this.getYearMonthCreated = function(post){
      /*jshint camelcase: false */
      var date = new Date(DateUtil.now.getYear(), DateUtil.now.getMonth());
      return  DateUtil.format(post.created_date || date);
    };
    this.serialize = function(post){
      post.metadata.date = DateUtil.toISO8601(post.metadata.date);
      return unescape(compilePost(post));
    };
    this.generateFileName =  function(post) {
      if(!!post.filename){
        return post.filename;
      }
      return formatDate(post)+'-'+this.formatName(post.metadata.title)+'.md';
    };
    this.formatName = function(title){
      return getSlug(title);
    };
    this.preparePost = function(metadata, body, filename, files, toPublish, videoUrl){
      /*jshint camelcase: false */
      var deferred = $q.defer();
      var promise = deferred.promise;

      var post = {
        metadata: metadata,
        body: body,
        filename: filename
      };

      post.filename = this.generateFileName(post);
      post.metadata.layout = 'post';
      post.metadata.files = files;
      post.metadata.created_date =  post.metadata.created_date || DateUtil.toISO8601(new Date());
      post.metadata.published = (toPublish === true);

      if(videoUrl){
        getVideoThumbnailUrl(videoUrl)
        .then(function(videoThumbnail){
          if(!!videoThumbnail){
            post.metadata.video_thumbnail = videoThumbnail;
          }
          return deferred.resolve(post);
        });
      }else{
        deferred.resolve(post);
      }
      return promise;
    };

    this.prepareListOfFiles =  function(metadata, coverImageField){
      var files = [];

      if(coverImageField){
        var cover = _.find(metadata.files, function(element){
          return element.small ===  metadata[coverImageField];
        });

        if(!cover){
          cover = { thumbnail: metadata[coverImageField], small: metadata[coverImageField] };
          files.push(cover);
        }
      }

      files.push(metadata.files);
      return _.flatten(files);
    };
  });
