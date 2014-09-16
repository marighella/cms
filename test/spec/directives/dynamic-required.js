'use strict';

describe('Directive: dynamicRequired', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dynamic-required></dynamic-required>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dynamicRequired directive');
  }));
});
