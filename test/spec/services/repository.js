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
    var Content;
    beforeEach(inject(function (_GithubContent_) {
      Content = _GithubContent_;
      var content = _GithubContent_;
      content.posts = function (){
        return [1,2,3];
      };
    }));

    it('should return a list of posts', function (){
      expect(Repository.post.list().length).toBe(3);
    });

  });

});
