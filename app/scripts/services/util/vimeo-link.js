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
        return "http://img.youtube.com/vi/" + videoId + "/0.jpg";
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
            return getDefaultUrlToVideo(url);
          },
          getVideoThumbnailUrl: function(){
            return getVideoThumbnailUrl(youtubeUrl);
          }
        };
      }
    };

    return factory;
  });
