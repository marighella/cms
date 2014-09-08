'use strict';

describe('Service: GithubContent', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var Content;
  beforeEach(inject(function (_GithubContent_) {
    Content = _GithubContent_;
  }));

  it('should do something', function () {
    expect(!!Content).toBe(true);
  });

});
