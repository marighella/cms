'use strict';

angular.module('cmsApp').
  directive('validateVideo', function(YoutubeLinkUtil, VimeoLinkUtil) {
  return {
    restrict: 'A',
    require: '^?form',
    link: function (scope, el, attrs, formCtrl) {

      var setInputValid = function(inputName, valid){
        if(!formCtrl){
          return;
        }
        formCtrl[inputName].$setValidity('required',valid);
      };
      var getValidYoutubeUrl = function(url){
        return YoutubeLinkUtil.link(url).getValidUrl();
      };
      var getValidVimeoUrl = function(url){
        return VimeoLinkUtil.link(url).getValidUrl();
      };

      var checkPatternYoutube = function(url){
        var pattern = YoutubeLinkUtil.pattern();
        var valid = !!pattern.exec(url);

        return valid;
      };

      var checkPatternVimeo = function(url){
        var pattern = VimeoLinkUtil.pattern();
        var valid = !!pattern.exec(url);

        return valid;
      };


      el.bind('blur', function() {
        var url = el.val();
        if( ( url || "" ).trim().length === 0 ) {
          return;
        }

        var inputName = el.attr('name');
        var validYoutube = checkPatternYoutube(url);
        var validVimeo   = checkPatternVimeo(url);
        var valid        = validYoutube || validVimeo;

        el.toggleClass('invalid-format', !valid);
        el.toggleClass('valid-format', valid);

        setInputValid(inputName, valid);

        if(validYoutube){
          el.val(getValidYoutubeUrl(url));
        }else if(validVimeo){
          el.val(getValidVimeoUrl(url));
        }
      });

      scope.$on('$destroy', function() {
        el.unbind('submited blur');
      });
    }
  };
});
