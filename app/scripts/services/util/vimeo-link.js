'use strict';

angular.module('cmsApp')
  .factory('VimeoLinkUtil', function ($http, $q) {
    var VIMEO_REGEX = /(player\.)?vimeo\.com(\/video)?\/(\d+)/;

    function videoFromUrl(url){
      if(!url){
        return '';
      }
      return VIMEO_REGEX.exec(url)[3];
    }

    function getDefaultUrlToVideo(videoUrl){
      var VALID_URL = 'vimeo.com/';
      var id        = videoFromUrl(videoUrl);

      return VALID_URL + id;
    }

    function getVideoThumbnailUrl(videoUrl){
      if (videoUrl) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http.get('http://vimeo.com/api/oembed.json?url=' + videoUrl)
        .success(function(data) {
          return deferred.resolve(data.thumbnail_url);
        });

        return promise;
      }
    }

    var factory = {
      pattern: function(){
        return VIMEO_REGEX;
      },
      link: function(url){
        return {
          getId: function(){
            return videoFromUrl(url);
          },
          getValidUrl: function(){
            if (VIMEO_REGEX.test(url)) { return getDefaultUrlToVideo(url); }
            else { return false; }
          },
          getVideoThumbnailUrl: function(){
            return getVideoThumbnailUrl(url);
          }
        };
      }
    };

    return factory;
  });
