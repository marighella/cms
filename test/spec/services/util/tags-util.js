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
    var tagsWithPosts;

    beforeEach(function () {
      tagsWithPosts = {'Banana':['dois','tres', 'sete'],
        'Cianureto':['tres','sete'],
        'Manga':['dois','quatro'],
        'Maca':['quatro', 'seis', 'sete']};
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Manga','Banana','Cianureto'];
      expect(TagsUtil.getPostsByTags(tags, tagsWithPosts)).toEqual({'sete':1, 'dois':1, 'tres': 1});
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca'];
      expect(TagsUtil.getPostsByTags(tags, tagsWithPosts)).toEqual({'sete':1});
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca','Cianureto'];
      expect(TagsUtil.getPostsByTags(tags, tagsWithPosts)).toEqual({'sete':3,'tres':1});
    });
  });
});
