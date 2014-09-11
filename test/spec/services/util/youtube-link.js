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

  describe('#getEmbed ', function() {
    it('should get embed from youtube link', function(){
      var youtube = 'https://www.youtube.com/watch?v=hnKzRMqmPEo';
      var expectedEmbed =  '<p style="text-align: center;"><iframe allowfullscreen="" name="coverVideo" frameborder="0" height="360" src="//www.youtube.com/embed/' +
                          'hnKzRMqmPEo' +
                          '" width="640"></iframe></p>';
      var embed = YoutubeLinkUtil.link(youtube).getEmbed();
      expect(embed).toBe(expectedEmbed);
    });
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
