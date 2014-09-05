'use strict';

describe('Service: organization', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var organization;
  beforeEach(inject(function (_organization_) {
    organization = _organization_;
  }));

  it('should do something', function () {
    expect(!!organization).toBe(true);
  });

});
