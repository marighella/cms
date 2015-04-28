'use strict';

describe('Directive: Tracks', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.entity = {};

    element = angular.element('<tracks tracks="entity[\'tracks\']" />');
    element = $compile(element)(scope);
  }));

  describe('the first step',function(){
    it('should have only one track', function () {
      scope.$digest();
      var inputs = element[0].querySelectorAll('.track');

      expect(inputs.length).toBe(1);
    });

    it('should have only a add button', function() {
      var inputs = element.find('button');
      expect(inputs.length).toBe(1);
      expect(inputs.hasClass('add')).toBeTruthy();
    });
  });

  describe('add button',function(){
    it('should add a new entry on tracks', function(){
      element.find('button').triggerHandler('click');

      var inputs = element[0].querySelectorAll('.track');
      expect(inputs.length).toBe(2);
    });
  });

  describe('edit fields',function(){
    it('should edit the first track', function(){

      scope.$digest();
      var inputTitle = angular.element(element[0].querySelectorAll('.track input.title'));
      var inputMP3 = angular.element(element[0].querySelectorAll('.track input.mp3'));
      var inputOGG = angular.element(element[0].querySelectorAll('.track input.ogg'));

      inputTitle.val('Teste').triggerHandler('input');
      inputMP3.val('Teste musica').triggerHandler('input');
      inputOGG.val('Teste ogg').triggerHandler('input');

      var track = scope.entity.tracks[0];

      expect(track.title).toBe('Teste');
      expect(track.mp3).toBe('Teste musica');
      expect(track.ogg).toBe('Teste ogg');

    });
  });

  it('should show old values', function(){
    scope.entity.tracks = [{title: 'pizza'}, {title:'bolo'}];

    scope.$digest();
    var inputTitle = angular.element(element[0].querySelectorAll('.track input.title'));

    expect(inputTitle.val()).toBe('pizza');
  });
});
