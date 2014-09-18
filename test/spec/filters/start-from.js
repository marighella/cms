'use strict';

describe('Filter: startFrom', function () {

  // load the filter's module
  beforeEach(module('cmsApp'));

  var startFrom;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($filter) {
    startFrom = $filter('startFrom');
  }));

  it('should return the input prefixed with "startFrom filter:"', function () {
    expect(typeof startFrom([0])).toBe('object');
  });
});
