'use strict';

describe('Service: Repository', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var Repository;
  beforeEach(inject(function (_Repository_) {
    Repository = _Repository_;
  }));

  it('should do something', function () {
    expect(!!Repository).toBe(true);
  });

  describe('content from github', function (){
    beforeEach(inject(function (_NewsServiceContent_) {
      var defaultFunction = function (){
        return [1,2,3];
      };
      _NewsServiceContent_.search = defaultFunction;
    }));

    it('should return a list of posts', function (){
      expect(Repository.content.list().length).toBe(3);
    });

  });

});
