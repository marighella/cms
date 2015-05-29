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

  describe('give a lot of tag-posts file', function (){
    var tagsWithPosts, factory;

    beforeEach(function () {
      tagsWithPosts = {'Banana':['dois','tres', 'sete'],
        'Cianureto':['tres','sete'],
        'Manga':['dois','quatro'],
        'Apollo':['onze','doze'],
        'Maca':['quatro', 'seis', 'sete']};

      factory = new TagsUtil(tagsWithPosts);
    });

    it('should search by name without casesensitive', inject(function($rootScope){
      var query = 'MaNgA'; //Search by Manga
      factory.search(query).then(function(result){
        expect(result).toEqual([{tag:'Manga'}]);
      });
      $rootScope.$digest();
    }));

    it('should return all tags matched', inject(function($rootScope){
      var query = 'M'; //Search by Manga
      factory.search(query).then(function(result){
        expect(result)
          .toEqual(jasmine.objectContaining([{tag: 'Manga'}, {tag: 'Maca'}]));
      });
      $rootScope.$digest();
    }));
  });

  describe('give a tag-posts file and a set of tags', function (){
    var tagsWithPosts, factory;

    beforeEach(function () {
      tagsWithPosts = {'Banana':['dois','tres', 'sete'],
        'Cianureto':['tres','sete'],
        'Manga':['dois','quatro'],
        'Apollo':['onze','doze'],
        'Maca':['quatro', 'seis', 'sete']};

      factory = new TagsUtil(tagsWithPosts);
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Manga','Banana','Cianureto'];
      expect(factory.getPostsByTags(tags))
        .toEqual(jasmine.objectContaining({'sete':1, 'dois':1, 'tres': 1}));
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca'];
      expect(factory.getPostsByTags(tags))
        .toEqual(jasmine.objectContaining({'sete':1}));
    });

    it('should get the posts with more relevance to a set of tags', function(){
      var tags = ['Banana','Maca','Cianureto'];
      expect(factory.getPostsByTags(tags))
        .toEqual(jasmine.objectContaining({'sete':3,'tres':1}));
    });
  });

  describe('give a releated posts', function (){
    var tagsWithPosts, factory;

    beforeEach(function () {
      tagsWithPosts = {'banana':['dois','tres', 'sete'],
        'cianureto':['tres','sete'],
        'manga':['dois','quatro'],
        'apollo':['onze','doze'],
        'maca':['quatro', 'seis', 'sete']};

      factory = new TagsUtil(tagsWithPosts);
    });

    it('should return the list of posts releated', function(){
      var tags = ['Manga','Banana','Cianureto'];
      expect(factory.getReleatedPosts(tags))
        .toEqual(['tres', 'sete', 'dois']);
    });

    it('should return the list of posts releated without except', function(){
      var tags = ['Manga','Banana','Cianureto'];
      expect(factory.getReleatedPosts(tags, {postToRemove: 'dois'}))
        .toEqual([ 'tres', 'sete' ]);
    });

    it('should return two posts when a single posts was send', function(){
      var tags = ['Manga'];
      expect(factory.getReleatedPosts(tags))
        .toEqual([ 'dois', 'quatro' ]);
    });
  });

  describe('limit releated posts', function (){
    var tagsWithPosts, factory;
    beforeEach(function () {
      tagsWithPosts = {'banana':['dois','tres', 'sete', 'vinte', 'dez'],
        'cianureto':['tres','sete', 'vinte'],
        'manga':['dois','quatro', 'vinte'],
        'apollo':['onze','doze', 'cinco', 'vinte'],
        'bolo':['onze','doze', 'cinco', 'vinte'],
        'coca':['onze','doze', 'dez', 'vinte'],
        'fanta':['onze','doze', 'treze'],
        'maca':['quatro', 'seis', 'sete']};

      factory = new TagsUtil(tagsWithPosts);
    });

    it('should return maximum 5 results', function(){
      var tags = ['banana','bolo', 'apollo', 'coca', 'maca'];
      expect(factory.getReleatedPosts(tags).length)
        .toEqual(5);
    });
  });
});
