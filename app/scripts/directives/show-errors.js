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
      console.log(el[0], inputEl);
      // convert the native text box element to an angular element
      //
      var inputNgEl = angular.element(inputEl);
      // get the name on the text box so we know the property to check
      // on the form controller
      var inputName = inputNgEl.attr('name');

      // only apply the has-error class after the user leaves the text box
      inputNgEl.bind('blur', function() {
        console.log(inputName);

        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      });
    }
  };
});
