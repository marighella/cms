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

  it('should clean filter when clearSearch is invoked', inject(function ($compile) {
    scope.filter = { title: 'Rodrigo' };

    element = angular.element('<search-form filter="filter"></search-form>');
    element = $compile(element)(scope);
    
    scope.$digest();
    
    expect(scope.filter.title).toEqual('Rodrigo');
    element.find('a').triggerHandler('click');
    expect(scope.filter.title).toEqual('');
  }));

  describe('give any action has been called', function(){
    it('should block the options to the user until finish the search', inject(function ($compile) {
      scope.filter = { title: 'Marighella'};

      element = angular.element('<search-form filter="filter"></search-form>');
      element = $compile(element)(scope);

      scope.$digest();

      element.find('button').triggerHandler('click');
      expect(element.hasClass('disabled')).toBeTruthy();
    }));

    it('should relase the blocked on options to the user when finished the search', inject(function ($compile, $q) {
      var deferred = $q.defer();
      var search = function(){ 
        return deferred.promise;
      };
      scope.filter = { title: 'Lélia', search: search };

      element = angular.element('<search-form filter="filter"></search-form>');
      element = $compile(element)(scope);

      scope.$digest();

      element.find('button').triggerHandler('click');
      expect(element.hasClass('disabled')).toBeTruthy();

      deferred.resolve();

      scope.$digest();
      expect(element.hasClass('disabled')).toBeFalsy();
    }));
  });

});
