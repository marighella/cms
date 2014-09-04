'use strict';

/**
 * @ngdoc service
 * @name cmsApp.user
 * @description
 * # user
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .factory('user', function($q) {
    return {
      info: function() {
        return {
          name: 'Rodrigo',
        };
      },
      organizations: function() {
        return [{
          login: 'mm',
          id: 1,
          avatarUrl: ''
        }];
      }
    };
  });
