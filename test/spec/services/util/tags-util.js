'use strict';
/*jshint camelcase: false */

describe('Service: TagsUtil', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var TagsUtil;
  beforeEach(inject(function (_TagsUtil_) {
    TagsUtil = _TagsUtil_;
  }));

  it('should do something', function () {
    expect(!!TagsUtil).toBe(true);
  });

  describe('give a tag-posts file and a set of tags', function (){
    var tagsWithPosts, factory;

    beforeEach(function () {
      tagsWithPosts = {'Banana':['dois','tres', 'sete'],
        'Cianureto':['tres','sete'],
        'Manga':['dois','quatro'],
        'Maca':['quatro', 'seis', 'sete']};
      factory = new TagsUtil(tagsWithPosts);
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Manga','Banana','Cianureto'];
      expect(factory.getPostsByTags(tags, tagsWithPosts)).toEqual({'sete':1, 'dois':1, 'tres': 1});
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca'];
      expect(factory.getPostsByTags(tags, tagsWithPosts)).toEqual({'sete':1});
    });

    it('should get at least 3 result', function(){
      var tags = ['Banana','Maca'];
      expect(factory.getPostsByTags(tags, tagsWithPosts)).toEqual({'dois':1, 'tres': 0, 'quatro': 0});
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca','Cianureto'];
      expect(factory.getPostsByTags(tags, tagsWithPosts)).toEqual({'sete':3,'tres':1});
    });
  });
});
