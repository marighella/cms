'use strict';

describe('Directive: Zip', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    $rootScope.user = { organization: { id: 1 } };

    scope = $rootScope.$new();
    scope.entity = {};

    element = angular.element('<zip download-link="entity[\'download\']" />');
    element = $compile(element)(scope);
  }));

  describe('upload button',function(){

    it('should exists', function(){
      var input = element[0].querySelectorAll('input[type="file"]');

      expect(input.length).toBe(1);
    });

    it('should get a link to stream', inject(function($httpBackend, ENV){
      $httpBackend.when('POST', ENV.upload)
       .respond({title: '1.zip', link: 'https://link.com/download/?m=1.zip'});

      var barScope = element.find('input').scope();

      var list = { name: '1.zip' };
      barScope.updateFile(list);


      $httpBackend.flush();
      scope.$digest();

      expect(scope.entity.download).toBe('https://link.com/download/?m=1.zip');
    }));
  });
});
