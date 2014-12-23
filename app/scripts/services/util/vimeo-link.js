'use strict';

angular.module('cmsApp')
  .factory('VimeoLinkUtil', function () {
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
        var videoId =  videoFromUrl(videoUrl);

        var responsePromise = $http.jsonp( 'http://vimeo.com/api/v2/video/' + videoId + '.json');

        responsePromise.success(function(data) {
          console.dir(data);

          return "ccc";
        });
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
