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

  describe('prepare post to save on draft mode', function (){
    beforeEach(inject(function (_PostUtil_) {
      PostUtil = _PostUtil_;

      PostUtil.generateFileName = function(){
        return '2014-03-04-ola-ola-ola.md';
      };
    }));

    it('should exists', function (){
      expect(!!PostUtil.preparePost).toBeTruthy();
    });

    it('should return post with published set as false', function() {
      var metadata = {};
      var body = '';

      var post = PostUtil.preparePost(metadata, body);

      expect(post.metadata.published).toBe(false);
      expect(post.filename).toBe('2014-03-04-ola-ola-ola.md');
    });
  });

  describe('the way to work with of file', function (){
    it('should exists', function (){
      expect(!!PostUtil.prepareListOfFiles).toBeTruthy();
    });

    it('should cover image inside array of files', function() {
      var post = { imagesHd: 'image.jpg'};
      var coverImageField = 'imagesHd';

      var listOfFiles = PostUtil.prepareListOfFiles(post, coverImageField);

      var result = {thumbnail: 'image.jpg', desc: 'cover', type: 'cover'};
      expect(listOfFiles[0]).toEqual(result);
    });

    it('should return list of files on metadata', function() {
      var post = { files: [{thumbnail: '1.jpg', desc: 'image', type: 'image'}] };
      var listOfFiles = PostUtil.prepareListOfFiles(post);

      var result = {thumbnail: '1.jpg', desc: 'image', type: 'image'};
      expect(listOfFiles[0]).toEqual(result);
    });

    it('should return list of files on metadata', function() {
      var post = { cover: 'img.jpg', files: [{thumbnail: '1.jpg', desc: 'image', type: 'image'}] };
      var listOfFiles = PostUtil.prepareListOfFiles(post, 'cover');

      var result = [{thumbnail: 'img.jpg', desc: 'cover', type: 'cover'},
      {thumbnail: '1.jpg', desc: 'image', type: 'image'}];

      result.forEach(function(element){
        expect(listOfFiles).toContain(element);
      });
    });

    it('should not add cover twice', function() {
      var post = { cover: 'img.jpg',
                   files: [
                     { thumbnail: '1.jpg', desc: 'image', type: 'image'},
                     { thumbnail: 'img.jpg', desc: 'image', type: 'cover'}
                   ] };
      var listOfFiles = PostUtil.prepareListOfFiles(post, 'cover');

      expect(listOfFiles.length).toBe(2);
    });
  });

  describe('the format title name', function (){
    it('should exists', function (){
      expect(!!PostUtil.generateFileName).toBeTruthy();
    });

    it('should return post name if it exists', function() {
      var post = {filename: 'test post'};

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe(post.filename);
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
