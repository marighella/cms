'use strict';
/*jshint camelcase: false */

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
  describe('catch year and month from created date', function (){
    beforeEach(inject(function (_DateUtil_) {
        _DateUtil_.now = {
          getYear: function(){ return 2001; },
          getMonth: function(){ return 0; }
        };
      })
    );
    it('should get currently year and month to a new post', function(){
      var post = {};
      expect(PostUtil.getYearMonthCreated(post)).toBe('2001/01');
    });

    it('should get year and month from a existent post', function(){
      var post = {created_date: '2012-01-14' };
      expect(PostUtil.getYearMonthCreated(post)).toBe('2012/01');
    });

  });
  describe('load post from markdown', function (){
    beforeEach(inject(function (_PostUtil_) {
      PostUtil = _PostUtil_;

      PostUtil.decodeContent = function(c){
        return c;
      };
    }));

    it('should load text', function(){
      var md = '---\ntitle: Rodrigo\n---Texto em HTML com dash';
      var post = PostUtil.load(md);

      expect(post.metadata.title).toBe('Rodrigo');
      expect(post.body).toBe('Texto em HTML com dash');
    });

    it('should load text with triple dash inside body', function(){
      var md = '---\ntitle: Rodrigo\n---Texto em HTML com dash\n---\nFim do Texto';
      var post = PostUtil.load(md);

      expect(post.metadata.title).toBe('Rodrigo');
      expect(post.body).toBe('Texto em HTML com dash\n---\nFim do Texto');
    });
  });

  describe('default params on metadata', function (){
    beforeEach(inject(function (_PostUtil_) {
      PostUtil = _PostUtil_;

      PostUtil.generateFileName = function(){
        return '2014-03-04-ola-ola-ola.md';
      };
    }));

    it('should add default layout', function() {
      var metadata = {
          date: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
          title: 'test titulo de post'
      };
      var body = '';

      var post = PostUtil.preparePost(metadata, body);

      expect(post.metadata.layout).toBe('post');
    });
  });

  describe('prepare post to save on draft mode', function (){
    var DateUtil;
    beforeEach(inject(function (_PostUtil_, _DateUtil_) {
      PostUtil = _PostUtil_;
      DateUtil = _DateUtil_;

      PostUtil.generateFileName = function(){
        return '2014-03-04-ola-ola-ola.md';
      };
    }));

    it('should get created date from a existing post', function (){
      var metadata= {
        created_date: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
        title: 'test titulo de post'
      };
      var post = PostUtil.preparePost(metadata,' ');
      expect(post.metadata.created_date).toBe('Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)');
    });

    it('should get created date from a new post', function (){
      DateUtil.toISO8601= function (){ return 'Tue Jul 20 2012 14:13:34 GMT-0300 (BRT)';};
      var metadata= {
        title: 'test titulo de post'
      };
      var post = PostUtil.preparePost(metadata,' ');
      expect(post.metadata.created_date).toBe('Tue Jul 20 2012 14:13:34 GMT-0300 (BRT)');
    });

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

  describe('the way to work with files', function (){
    it('should exists', function (){
      expect(!!PostUtil.prepareListOfFiles).toBeTruthy();
    });

    it('should cover image inside array of files', function() {
      var post = { imagesHd: 'image.jpg'};
      var coverImageField = 'imagesHd';

      var listOfFiles = PostUtil.prepareListOfFiles(post, coverImageField);

      var result = {thumbnail: 'image.jpg', small: 'image.jpg'};
      expect(listOfFiles[0]).toEqual(result);
    });

    it('should return list of files on metadata', function() {
      var post = { files: [{thumbnail: '1.jpg', small: '1.jpg'}] };
      var listOfFiles = PostUtil.prepareListOfFiles(post);

      var result = {thumbnail: '1.jpg', small: '1.jpg'};
      expect(listOfFiles[0]).toEqual(result);
    });

    it('should return list of files on metadata', function() {
      var post = { cover: 'img.jpg', files: [{thumbnail: '1.jpg', small: '1.jpg'}] };
      var listOfFiles = PostUtil.prepareListOfFiles(post, 'cover');

      var result = [{thumbnail: 'img.jpg', small: 'img.jpg'},
      {thumbnail: '1.jpg', small: '1.jpg'}];

      result.forEach(function(element){
        expect(listOfFiles).toContain(element);
      });
    });

    it('should not add cover twice', function() {
      var post = { cover: 'img.jpg',
                   files: [
                     { thumbnail: '1.jpg', small: '1.jpg'},
                     { thumbnail: 'img.jpg', small: 'img.jpg'}
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
          title: '%#\'test titulo de post com áéíóúã^'
        }
      };

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe('2014-07-15-test-titulo-de-post-com-aeioua.md');
    });

    it('should remove space before number from title to generate the filename', function() {

      var post = {
        metadata: {
          date: 'Tue Jul 15 2014 14:13:34 GMT-0300 (BRT)',
          title: 'Olá 2012, como vai 3 de voces'
        }
      };

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe('2014-07-15-ola-2012-como-vai-3-de-voces.md');
    });

    it('should remove any number of white spaces to generate the filename', function() {

      var post = {
        metadata: {
          date: '2014-09-30T14:20:58-03:00',
          title: 'Alta nos aluguéis é a principal responsável por falta de moradia'
        }
      };

      var filename = PostUtil.generateFileName(post);

      expect(filename).toBe('2014-09-30-alta-nos-alugueis-e-a-principal-responsavel-por-falta-de-moradia.md');
    });
  });

});
