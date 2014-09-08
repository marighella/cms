'use strict';

describe('Service: organization', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var organization;
  beforeEach(inject(function (_Organization_) {
    organization = _Organization_;
  }));

  it('should do something', function () {
    expect(!!organization).toBe(true);
  });

});
