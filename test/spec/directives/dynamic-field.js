'use strict';

describe('Directive: dynamicField', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should remove tag after compile once', inject(function ($compile) {
    scope.field = {

    };
    element = angular.element('<input dynamic-field="field"/>');
    element = $compile(element)(scope);
    expect(element.attr('dynamic-field')).toBeFalsy();
  }));

  describe('dynamic field to fill name', function() {
    it('should put name  when have field "name"', inject(function ($compile) {
      scope.field = {
        name: 'guime'
      };

      element = angular.element('<input dynamic-field="field"/>');
      element = $compile(element)(scope);
      expect(element.attr('name')).toBe('guime');
    }));
  });

  describe('dynamic field to fill ng-show', function() {
    it('should put nothing required when do not have "need" field', inject(function ($compile) {
      scope.field = {
      
      };
      element = angular.element('<input dynamic-field="field"/>');
      element = $compile(element)(scope);
      expect(element.attr('ng-show')).toBeFalsy();
    }));


    describe('when have a "need" field', function() {
      it('should put ng-show with condition equal', inject(function ($compile) {
        scope.field = {
          need: {
            field: 'section',
            equal: true,
            value: 'tv'
          }
        };
        element = angular.element('<input dynamic-field="field"/>');
        element = $compile(element)(scope);
        expect(element.attr('ng-show')).toBe('entity.section===\'tv\'');
      }));

      it('should put ng-show with condition not equal', inject(function ($compile) {
        scope.field = {
          need: {
            field: 'section',
            equal: false,
            value: 'tv'
          }
        };
        element = angular.element('<input dynamic-field="field"/>');
        element = $compile(element)(scope);
        expect(element.attr('ng-show')).toBe('entity.section!==\'tv\'');
      }));
      it('should put ng-show with condition equal, when value is an array', inject(function($compile){
        scope.field = {
          need: {
            field: 'section',
            equal: true,
            value: ['tv', 'featured-news']
          }
        };
        element = angular.element('<input dynamic-field="field"/>');
        element = $compile(element)(scope);
        expect(element.attr('ng-show')).toBe('entity.section===\'tv\'&&entity.section===\'featured-news\'');
      }));
    });
  });

  describe('dynamic field to fill ng-required', function() {
    it('should put default required when do not have field "need"', inject(function ($compile) {
      scope.field = {
      
      };
      element = angular.element('<input dynamic-field="field"/>');
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
      element = angular.element('<input dynamic-field="field"/>');
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

      element = angular.element('<input dynamic-field="field"/>');
      element = $compile(element)(scope);
      expect(element.attr('ng-required')).toBe('entity.section!==\'tv\'');
    }));
  });

});
