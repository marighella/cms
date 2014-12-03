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

  it( 'deve salvar na mesma pasta de origem da data de criação', function(){
    var user = {repository: {full_name: 'Gabas'}};
    var post = {filename: 'arquivo.md', createdDate: '2014-01-30'};
    var sha = 'abcd3';
    var promise = Content.save(user, post, sha );
    promise.then(function (address){
      expect(address).toBe('repos/Gabas/contents/_posts/2014/01/arquivo.md');
    });
    rootScope.$digest();
  });
});
