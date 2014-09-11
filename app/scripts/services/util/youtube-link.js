'use strict';

angular.module('cmsApp')
  .factory('YoutubeLinkUtil', function () {
    var YOUTUBE_ID = /(?:youtube\.(?:com|com\.br)\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    function videoFromUrl(url){
      if(!url){
        return '';
      }
      return YOUTUBE_ID.exec(url)[1];
    }

    function embedFromUrl(url) {
      if(!url){
        return '';
      }
      return '<p style="text-align: center;"><iframe allowfullscreen="" name="coverVideo" frameborder="0" height="360" src="//www.youtube.com/embed/' +
              videoFromUrl(url) +
              '" width="640"></iframe></p>';
    }

    var factory = {
      pattern: function(){
        return YOUTUBE_ID;
      },
      link: function(youtubeUrl){
        return {
          getId: function(){
            return videoFromUrl(youtubeUrl);
          },

          getEmbed: function(){
            return embedFromUrl(youtubeUrl);
          }
        };
      }
    };

    return factory;
  });
