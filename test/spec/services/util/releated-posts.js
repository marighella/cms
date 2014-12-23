'use strict';
/*jshint camelcase: false */

describe('Service: ReleatedPosts', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var ReleatedPosts;
  beforeEach(inject(function (_ReleatedPosts_) {
    ReleatedPosts = _ReleatedPosts_;
  }));

  it('should do something', function () {
    expect(!!ReleatedPosts).toBe(true);
  });

  describe('give a tag-posts file and a set of tags', function (){
    beforeEach(inject(function (_Repository_) {
        _Repository_.tagsFile = {'Banana':['dois','tres', 'sete'],
                                 'Cianureto':['tres','sete'],
                                 'Manga':['dois','quatro'],
                                 'Maca':['quatro', 'seis', 'sete']};

      })
    );
    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Manga','Banana','Cianureto'];
      expect(ReleatedPosts.getPostsByTags(tags)).toEqual({'sete':1, 'dois':1, 'tres': 1});
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca'];
      expect(ReleatedPosts.getPostsByTags(tags)).toEqual({'sete':1});
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca','Cianureto'];
      expect(ReleatedPosts.getPostsByTags(tags)).toEqual({'sete':3,'tres':1});
    });
  });
});
