'use strict';

describe('Directive: Tracks', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    $rootScope.user = { organization: { id: 1 } };

    scope = $rootScope.$new();
    scope.entity = {};


    element = angular.element('<tracks tracks="entity[\'tracks\']" />');
    element = $compile(element)(scope);
  }));

  describe('the first step',function(){
    it('should not a track', function () {
      scope.$digest();
      var inputs = element[0].querySelectorAll('.track');

      expect(inputs.length).toBe(0);
    });
  });

  describe('upload button',function(){
    it('should exists', function(){
      var input = element[0].querySelectorAll('input[type="file"]');


      expect(input.length).toBe(1);
    });

    it('should get a link to stream', inject(function($httpBackend, ENV){
      $httpBackend.when('POST', ENV.upload)
       .respond({title: '1.mp3', link: 'https://link.com/download/?m=1.mp3'});

      var barScope = element.find('input').scope();

      var list = { 0:{ name: '1.mp3' } };
      barScope.updateFiles(list);


      $httpBackend.flush();
      scope.$digest();

      expect(scope.entity.tracks.length).toBe(1);
      expect(scope.entity.tracks[0].title).toBe('1.mp3');
      expect(scope.entity.tracks[0].mp3).toBe('https://link.com/download/?m=1.mp3');
    }));
  });

  it('should show old values', function(){
    scope.entity.tracks = [{title: 'pizza'}, {title:'bolo'}];

    scope.$digest();
    var inputTitle = angular.element(element[0].querySelectorAll('.track input.title'));

    expect(inputTitle.val()).toBe('pizza');
  });
});
