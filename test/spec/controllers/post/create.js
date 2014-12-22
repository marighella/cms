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

  describe('section video', function (){
    it('should get youtube thumbnail url', function (){
      var videoUrl = 'http://www.youtube.com/watch?v=KQQrHH4RrNc';
      var videoThumbnail = scope.getVideoThumbnailUrl(videoUrl);
      expect(videoThumbnail).toBe('http://img.youtube.com/vi/KQQrHH4RrNc/0.jpg');
    });
  });
});
