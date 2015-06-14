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

  describe('add track action',function(){

    it('should exists', function(){
      var input = element[0].querySelectorAll('input[type="file"]');
      expect(input.length).toBe(1);
    });

    it('should add a list with tracks', function(){
      var scope = element.find('input').scope();

      var list = { 0:{ name: '1.mp3' } };
      scope.addTracks(list);
      scope.$digest();

      var tracks = element[0].querySelectorAll('.track');
      expect(tracks.length).toBe(1);
    });

    it('should show old values', inject(function($compile){
      scope.entity.tracks = [{title: 'pizza'}, {title:'bolo'}];
      element = angular.element('<tracks tracks="entity[\'tracks\']" />');
      element = $compile(element)(scope);

      scope.$digest();
      var inputTitle = angular.element(element[0].querySelectorAll('.track input.title'));

      expect(inputTitle.val()).toBe('pizza');
    }));
  });

  describe('remove button',function(){
    beforeEach(inject(function ($httpBackend, ENV) {
      $httpBackend.whenDELETE(ENV.upload)
      .respond(201, 'Ok..');
    }));

    it('should call API to remove on serve when the track was uploaded', inject(function($httpBackend, $compile, ENV){
      scope.entity.tracks = [{title: 'pizza' , mp3: 'link'}, {title:'bolo', mp3: 'second-link'}];
      element = angular.element('<tracks tracks="entity[\'tracks\']" />');
      element = $compile(element)(scope);

      scope.$digest();

      var firstTrackRemove = element[0].querySelector('.track:first-child .remove');

      $httpBackend.expectDELETE(new RegExp(ENV.upload))
       .respond(201, 'Ok..');

      firstTrackRemove.click();

      $httpBackend.flush();
    }));

    it('should remove files before upload', inject(function($compile){
      scope.entity.tracks = [];
      element = angular.element('<tracks tracks="entity[\'tracks\']" />');
      element = $compile(element)(scope);

      var list = { 0:{ name: '1.mp3' } };
      element.find('input').scope().addTracks(list);
      scope.$digest();


      var firstTrackRemove = element[0].querySelector('.track:first-child .remove');

      firstTrackRemove.click();
      scope.$digest();

      var tracks = element[0].querySelectorAll('.track');
      expect(tracks.length).toBe(0);
    }));
  });
});
