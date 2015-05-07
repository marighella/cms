'use strict';

describe('Directive: Cover', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    $rootScope.user = { organization: { id: 1 } };

    scope = $rootScope.$new();
    scope.entity = {};

    element = angular.element('<cover image="entity[\'cover\']" />');
    element = $compile(element)(scope);
  }));

  describe('upload button',function(){
    it('should exists', function(){
      var input = element[0].querySelectorAll('input[type="file"]');

      expect(input.length).toBe(1);
    });

    it('should get a link to stream', inject(function($httpBackend, ENV){
      $httpBackend.when('POST', ENV.upload)
       .respond({link: 'http://farm9.staticflickr.com/8796/17306389125_7f60267c76_b.jpg' });

      var barScope = element.find('input').scope();

      var list = { 0:{ name: '1.jpg' } };
      barScope.updateFiles(list);


      $httpBackend.flush();
      scope.$digest();

      expect(scope.entity.cover).toBe('http://farm9.staticflickr.com/8796/17306389125_7f60267c76_b.jpg');
    }));
  });
});
