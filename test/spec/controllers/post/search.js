'use strict';

describe('Controller: PostSearchCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Repository) {
    scope = $rootScope.$new();
    scope.user = {};
    scope.repository = {};

    Repository.content = {
      list: function(){
        return {
          then: function(){
          }
        };
      }
    };
    Repository.skelleton = {
      get: function(){
        return {
          then: function(){
          }
        };
      }
    };
    PostsearchCtrl = $controller('PostSearchCtrl', {
      $scope: scope,
      $rootScope: scope
    });
  }));

  describe('default filter', function (){
    it('should exists', function (){
      expect(!!scope.filter).toBeTruthy();
    });

    it('should have a current month', function () {
      var month = (new Date()).getMonth();
      expect(scope.filter.month).toBe(month);
    });

    it('should have a current year', function () {
      var year = (new Date()).getFullYear();
      expect(scope.filter.year).toBe(year);
    });
  });
});
