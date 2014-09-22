'use strict';

//font: http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/
angular.module('cmsApp').
  directive('showErrors', function() {
  return {
    restrict: 'A',
    require:  '^form',
    link: function (scope, el, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputEl   = el[0].querySelector('input, select, textarea');
      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');

      var toggleClass = function(){
        if(!formCtrl[inputName]){
          return;
        }
        var toggle = formCtrl[inputName].$invalid;

        window.$(el.parent().get(0)).toggleClass('has-error', toggle);
        el.toggleClass('has-error', toggle);
      };

      // only apply the has-error class after the user leaves the text box
      inputNgEl.bind('blur', function() {
        toggleClass();
      });

      scope.$on('submited', function() {
        toggleClass();
      });
    }
  };
});
