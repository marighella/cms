'use strict';

describe('Directive: dynamicRequired', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('#need', function() {
    it('should put default required when do not have field "need"', inject(function ($compile) {

      scope.field = {
      
      };
      element = angular.element('<input dynamic-required="field"/>');
      element = $compile(element)(scope);
      expect(element.attr('ng-required')).toBe('field.required');
    }));

    it('should put need expression', inject(function ($compile) {
      scope.field = {
        need: {
          field: 'section',
          equal: true,
          value: 'tv'
        }
      };
      element = angular.element('<input dynamic-required="field"/>');
      element = $compile(element)(scope);
      expect(element.attr('ng-required')).toBe('entity.section===\'tv\'');
    }));

    it('should put need expression ', inject(function ($compile) {
      scope.field = {
        need: {
          field: 'section',
          equal: false,
          value: 'tv'
        }
      };
      element = angular.element('<input dynamic-required="field"/>');
      element = $compile(element)(scope);
      expect(element.attr('ng-required')).toBe('entity.section!==\'tv\'');
    }));
  });

});
