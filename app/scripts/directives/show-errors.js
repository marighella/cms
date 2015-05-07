'use strict';

//font: http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/
angular.module('cmsApp').
  directive('showErrors', function() {
  var getParent = function(element, parent){
    if(element.is(parent)){
      return element;
    } else if( element.is('html')){
      return false;
    }
    return getParent(element.parent(), parent);
  };

  return {
    restrict: 'EA',
    require:  '^form',
    priority: 100,
    link: function (scope, inputEl, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputNgEl = angular.element(inputEl);
      var inputName = inputNgEl.attr('name');

      var toggleClassByElement = function(element, toggle){
        var divField = getParent(window.$(element), '.field');
        divField.toggleClass('has-error', toggle);
        element.toggleClass('has-error', toggle);
      };

      var toggleClass = function(){
        if(!formCtrl[inputName]){
          return;
        }
        var toggle = formCtrl[inputName].$invalid;
        
        toggleClassByElement(inputEl, toggle);
      };

      // only apply the has-error class after the user leaves the text box
      inputNgEl.bind('blur', function() {
        toggleClass();
      });

      scope.$on('submited', function() {
        toggleClass();
      });

      scope.$on('$destroy', function() {
        inputEl.unbind('submited blur');
      });
    }
  };
});
