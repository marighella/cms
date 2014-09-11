'use strict';

/**
 * @ngdoc directive
 * @name cmsApp.directive:youtube
 * @description
 * # youtube
 */
/* jshint undef: false */
/* jshint camelcase: false */
//font: http://blog.oxrud.com/posts/creating-youtube-directive/
angular.module('cmsApp')
  .directive('youtube', function ($window, YoutubeLinkUtil) {
    return {
      restrict: 'E',
      scope: {
        url: '@'
      },
      template: '<div></div>',
      link: function(scope, element) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;

        function createPlayer(){
          return new YT.Player(element.children()[0], {
            playerVars: {
              autoplay: 0,
              html5: 1,
              theme: 'light',
              modesbranding: 0,
              color: 'white',
              iv_load_policy: 3,
              showinfo: 1,
              controls: 1
            },
            height: '350px',
            width: '100%',
            videoId: YoutubeLinkUtil.link(scope.url).getId()
          });
        }

        function ensureServiceIsReady(){
          if (!player){
            $window.onYouTubeIframeAPIReady();
          }
        }

        $window.onYouTubeIframeAPIReady = function() {
          player = createPlayer();
        };

        scope.$watch('url', function(newValue, oldValue) {
          if (!newValue || newValue === oldValue) {
            return;
          }
          ensureServiceIsReady();
          if(player.cueVideoById){
            player.cueVideoById(YoutubeLinkUtil.link(newValue).getId());
          }
        });
      },
    };
  });
