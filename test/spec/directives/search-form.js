'use strict';

describe('Directive: searchForm', function () {

  // load the directive's module
  beforeEach(module('cmsApp'));
  beforeEach(module('templates'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should add default behavior when the filter sent was empty', inject(function ($compile) {
    scope.filter = {};
    element = angular.element('<search-form filter="filter"></search-form>');
    element = $compile(element)(scope);
    
    scope.$digest();

    expect(scope.filter.title).toEqual('');
    expect(scope.filter.month).toEqual('');
    expect(scope.filter.year).toEqual('');
    expect(typeof scope.filter.search).toBe('function');
  }));

  it('should clean title filter when clearSearch is invoked', inject(function ($compile) {
    scope.filter = { title: 'Rodrigo', search: function(){} };
    spyOn(scope.filter, 'search');


    element = angular.element('<search-form filter="filter"></search-form>');
    element = $compile(element)(scope);
    
    scope.$digest();
    
    expect(scope.filter.title).toEqual('Rodrigo');
    element.find('a').triggerHandler('click');
    expect(scope.filter.search).toHaveBeenCalled();
    expect(scope.filter.title).toEqual('');
  }));

});
