'use strict';
/*jshint camelcase: false */


describe('Service: GithubContent', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var Content, Resource, DateUtil, rootScope;

  beforeEach(inject(function (_GithubContent_, _Resource_, _PostUtil_, _$rootScope_, _DateUtil_) {
    Content = _GithubContent_;
    Resource = _Resource_;
    rootScope = _$rootScope_;
    DateUtil = _DateUtil_;

    _PostUtil_.serialize = function (){ return 'ola mundo'; };
    Resource.isProduction = true;
    Resource.github = {
      put: function(address){
        var then = function(callback){
          callback(address);
        };
        return {
          then: then,
          error: function(){ return this; }
        };
      }
    };
  }));

  it('should do something', function () {
    expect(!!Content).toBe(true);
  });

  it( 'should save in the same folder of creation', function(){
    var repository = {full_name: 'my-repository'};
    var post = {filename: 'arquivo.md', metadata: { created_date: '2014-01-30'}};
    var sha = 'abcd3';
    var promise = Content.save(repository, post, sha );
    promise.then(function (address){
      expect(address).toBe('repos/my-repository/contents/_posts/2014/01/arquivo.md');
    });
    rootScope.$digest();
  });
  
});
