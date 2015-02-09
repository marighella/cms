'use strict';

describe('Directive: post', function () {
  // load the directive's module
  beforeEach(module('cmsApp'));
  beforeEach(module('templates'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $q, Repository) {
    var deferred = $q.defer();
    Repository.content.get = function() {
      deferred.resolve({metadata: {tags: [{tag: 'saude'}, {tag: 'juventude'}]}});
      return deferred.promise;
    };
    scope = $rootScope.$new();
  }));

  it('should list tags in common with related post', inject(function($compile, _) {
    scope.related = {
      link: 'related post url'
    };
   
    scope.coverField = false;

    element = angular.element('<post post="releated" tags="tags" cover-field="cover"></post>');
    element = $compile(element)(scope);

    scope.$digest();

    var tagElements = _.chain(element.find('span'))
    .map(function(elem){
       return angular.element(elem);
    })
    .filter(function (elem) {
       return elem.hasClass('tag');
    })
    .value();

    expect(tagElements.length).toBe(2);
    expect(tagElements[0].text()).toContain('saude');
    expect(tagElements[1].text()).toContain('juventude');
  }));

  it('should highlight tags in common on related posts', inject(function ($compile, _) {
    scope.releated = {
      link: 'related post url'
    };
    scope.tags = [{tag: 'saude'}, 
                  {tag: 'encontro'}];
    scope.coverField = false;
    
    element = angular.element('<post post="releated" tags="tags" cover-field="cover"></post>');
    element = $compile(element)(scope);

    scope.$digest();

    var tagElements = _.chain(element.find('span'))
    .map(function(elem){
       return angular.element(elem);
    })
    .filter(function (elem) {
       return elem.hasClass('tag') && elem.hasClass('selected');
    })
    .value();

    expect(tagElements.length).toBe(1);
    expect(tagElements[0].text()).toContain('saude');
  }));

  it('should update related tag highlighting when post tags change', inject(function ($compile, _) {
    scope.releated = {
      link: 'related post url'
    };
    scope.tags = [{tag: 'saude'}, 
                  {tag: 'encontro'}];
    scope.coverField = false;
    
    element = angular.element('<post post="releated" tags="tags" cover-field="cover"></post>');
    element = $compile(element)(scope);

    scope.$digest();

    scope.tags = [{tag: 'saude'}, 
                  {tag: 'encontro'},
                  {tag: 'juventude'}];

    scope.$digest();
    
    var tagElements = _.chain(element.find('span'))
    .map(function(elem){
       return angular.element(elem);
    })
    .filter(function (elem) {
       return elem.hasClass('tag') && elem.hasClass('selected');
    })
    .value();

    expect(tagElements.length).toBe(2);
    expect(tagElements[0].text()).toContain('saude');
    expect(tagElements[1].text()).toContain('juventude');
  }));

});
