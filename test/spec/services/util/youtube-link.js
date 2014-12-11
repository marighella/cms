'use strict';

describe('Service: YoutubeLinkUtil', function () {

  beforeEach(module('cmsApp'));

  var YoutubeLinkUtil;
  beforeEach(inject(function (_YoutubeLinkUtil_) {
    YoutubeLinkUtil = _YoutubeLinkUtil_;
  }));

  it('service should exist', function () {
    expect(!!YoutubeLinkUtil).toBe(true);
  });

  describe('#getLinkId ', function() {
    it('should get id from many kind of links', function(){

      var links = ['http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index',
        'http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0',
        'http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s',
        'http://www.youtube.com/embed/0zM3nApSvMg?rel=0',
        'http://www.youtube.com/watch?v=0zM3nApSvMg',
        'http://www.youtube.com.br/watch?v=0zM3nApSvMg',
        'https://www.youtube.com/watch?v=0zM3nApSvMg&list=UUmQojAcMgS-mkTAjGccZqrQ',
        'http://youtu.be/0zM3nApSvMg'];


      links.forEach(function(youtube){
        var id =  YoutubeLinkUtil.link(youtube).getId();
        expect(id).toBe('0zM3nApSvMg');
      });
    });
  });
});
