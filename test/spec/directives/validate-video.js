'use strict';

describe('Directive: validate-video', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  
  describe('Videos from VIMEO', function () {
    it('should replace a embed string to a valid vimeo url', inject(function ($compile) { element = angular.element('<input type="text" class="form-control" validate-video/>');
      var iframeYoutube = '<iframe src="//player.vimeo.com/video/44000619" width="1280" height="720" frameborder="0" title="Redes auto-sustent&aacute;veis: alimentos agroecol&oacute;gicos no litoral norte do RS" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      element.val(iframeYoutube);

      element = $compile(element)(scope);

      element.triggerHandler('blur');

      expect(element.val()).toBe('vimeo.com/44000619');
      expect(element.hasClass('valid-format')).toBeTruthy();
      expect(element.hasClass('invalid-format')).toBeFalsy();
    }));

    it('should make input valid when its a video url', inject(function ($compile) {
      element = angular.element('<input type="text" class="form-control" validate-video/>');
      element.val('vimeo.com/44000619');
      element = $compile(element)(scope);

      element.triggerHandler('blur');

      expect(element.hasClass('valid-format')).toBeTruthy();
      expect(element.hasClass('invalid-format')).toBeFalsy();
    }));
  });

  describe('Videos from YOUTUBE', function () {
    it('should replace a embed string to a valid youtube url', inject(function ($compile) { element = angular.element('<input type="text" class="form-control" validate-video/>');
      var iframeYoutube = '<iframe width="420" height="315" src="//www.youtube.com/embed/b7OXqKbjhTA" frameborder="0" allowfullscreen></iframe>';
      element.val(iframeYoutube);

      element = $compile(element)(scope);

      element.triggerHandler('blur');

      expect(element.val()).toBe('www.youtube.com/watch?v=b7OXqKbjhTA');
      expect(element.hasClass('valid-format')).toBeTruthy();
      expect(element.hasClass('invalid-format')).toBeFalsy();
    }));

    it('should make input invalid when its not a video url', inject(function ($compile) {
      element = angular.element('<input type="text" class="form-control" validate-video/>');
      element.val('http://www.google.com.br');
      element = $compile(element)(scope);

      element.triggerHandler('blur');
      expect(element.hasClass('invalid-format')).toBeTruthy();
      expect(element.hasClass('valid-format')).toBeFalsy();
    }));

    it('should make input valid when its a video url', inject(function ($compile) {
      element = angular.element('<input type="text" class="form-control" validate-video/>');
      element.val('www.youtube.com/watch?v=KQQrHH4RrNc');
      element = $compile(element)(scope);

      element.triggerHandler('blur');
      expect(element.hasClass('valid-format')).toBeTruthy();
      expect(element.hasClass('invalid-format')).toBeFalsy();
    }));
  });
});
