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

      el.bind('blur', function() {
        var url = el.val();
        var pattern = YoutubeLinkUtil.pattern();
        var invalid = !pattern.exec(url);
        var inputName = el.attr('name');

        el.toggleClass('invalid-format', invalid);
        el.toggleClass('valid-format', !invalid);

        setInputValid(inputName, !invalid);
      });

      scope.$on('$destroy', function() {
        el.unbind('submited blur');
      });
    }
  };
});
