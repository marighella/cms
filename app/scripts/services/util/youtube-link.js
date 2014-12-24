'use strict';

angular.module('cmsApp')
  .factory('YoutubeLinkUtil', function () {
    var YOUTUBE_REGEX = /(?:youtube\.(?:com|com\.br)\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;

    function videoFromUrl(url){
      if(!url){
        return '';
      }
      return YOUTUBE_REGEX.exec(url)[1];
    }

    function getDefaultUrlToVideo(videoUrl){
      var VALID_URL = 'www.youtube.com/watch?v=';
      var id        = videoFromUrl(videoUrl);

      return VALID_URL + id;
    }

    function getVideoThumbnailUrl(videoUrl){
      if (videoUrl) {
        var videoId =  videoFromUrl(videoUrl);

        return 'http://img.youtube.com/vi/' + videoId + '/0.jpg';
      }
    }

    var factory = {
      pattern: function(){
        return YOUTUBE_REGEX;
      },
      link: function(youtubeUrl){
        return {
          getId: function(){
            return videoFromUrl(youtubeUrl);
          },
          getValidUrl: function(){
            if (YOUTUBE_REGEX.test(youtubeUrl)) { return getDefaultUrlToVideo(youtubeUrl); }
            else { return false; }
          },
          getVideoThumbnailUrl: function(){
            return getVideoThumbnailUrl(youtubeUrl);
          }
        };
      }
    };

    return factory;
  });
