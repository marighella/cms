'use strict';

describe('Service: PostUtil', function () {

  // load the service's module
  beforeEach(module('cmsApp'));

  // instantiate service
  var PostUtil;
  beforeEach(inject(function (_PostUtil_) {
    PostUtil = _PostUtil_;
  }));

  it('should do something', function () {
    expect(!!PostUtil).toBe(true);
  });

  describe('the format title name', function (){
    it('should exists', function (){
      expect(!!PostUtil.generateFileName).toBeTruthy();
    });

    it('should return post name if it exists', function() {
      var post = {name: 'test post'};

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe(post.name);
    });

    it('should generate the filename for a new post', function() {
      var post = {
        metadata: {
          date: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
          title: 'test titulo de post'
        }
      };

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post.md');
    });

    it('should remove special chars from title to generate the filename', function() {

      var post = {
        metadata: {
          date: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
          title: '%#\'test titulo de post^'
        }
      };

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post.md');
    });

    it('should remove space before number from title to generate the filename', function() {

      var post = {
        metadata: {
          date: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
          title: 'Olá 2012, como vai 3 de voces'
        }
      };

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe('2014-07-15-ol-2012-como-vai-3-de-voces.md');
    });
  });

});
