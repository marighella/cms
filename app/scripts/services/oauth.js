'use strict';

/**
 * @ngdoc service
 * @name cmsApp.oauth
 * @description
 * # oauth
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('oauth', function () {
    var OAuth = window.OAuth;
    OAuth.initialize('Szfec4hwKtUV3-BPVLEdvP93fUM');
    return OAuth;
  });
