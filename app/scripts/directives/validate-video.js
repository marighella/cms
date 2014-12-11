'use strict';

angular.module('cmsApp').
  directive('validateVideo', function(YoutubeLinkUtil) {
  return {
    restrict: 'A',
    link: function (scope, el) {
      el.bind('blur', function() {
        var url = el.val();
        var pattern = YoutubeLinkUtil.pattern();
        var invalid = !pattern.exec(url);
        el.toggleClass('invalid-format', invalid);
        el.toggleClass('valid-format', !invalid);
      });

      scope.$on('$destroy', function() {
        el.unbind('submited blur');
      });
    }
  };
});
