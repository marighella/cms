'use strict';

describe('Controller: PostCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('cmsApp'));

  var PostcreatectrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PostcreatectrlCtrl = $controller('PostCreateCtrl', {
      $scope: scope
    });
  }));
});
