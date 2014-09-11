'use strict';

describe('Directive: youtube', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<youtube url="http://www.youtube.com/watch?v=UViv0FQJrgo"></youtube>');
    element = $compile(element)(scope);
    expect(element.text()).toMatch('');
  }));
});
