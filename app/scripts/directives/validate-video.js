'use strict';

angular.module('cmsApp').
  directive('validateVideo', function(YoutubeLinkUtil) {
  return {
    restrict: 'A',
    require: '^?form',
    link: function (scope, el, attrs, formCtrl) {

      var setInputValid = function(inputName, valid){
        if(!formCtrl){
          return;
        }
        formCtrl[inputName].$setValidity('video-url-format',valid);
      };
      var getValidUrl = function(url){
        return YoutubeLinkUtil.link(url).getValidUrl();
      };

      el.bind('blur', function() {
        var url = el.val();
        var pattern = YoutubeLinkUtil.pattern();
        var valid = !!pattern.exec(url);
        var inputName = el.attr('name');

        el.toggleClass('invalid-format', !valid);
        el.toggleClass('valid-format', valid);

        setInputValid(inputName, valid);

        if(valid){
          el.val(getValidUrl(url));
        }
      });

      scope.$on('$destroy', function() {
        el.unbind('submited blur');
      });
    }
  };
});
