'use strict';

describe('Controller: PostCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.fields = {};
    scope.user = { skelleton: []};

    PostCreateCtrl = $controller('PostCreateCtrl', {
      $scope: scope,
      $rootScope: scope
    });
  }));
});
