'use strict';

describe('Service: GithubOrganization', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var organization;
  beforeEach(inject(function (_GithubOrganization_) {
    organization = _GithubOrganization_;
  }));

  it('should do something', function () {
    expect(!!organization).toBe(true);
  });

});
