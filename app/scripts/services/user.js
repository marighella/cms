/* jshint camelcase: false */
'use strict';

/**
 * @ngdoc service
 * @name cmsApp.user
 * @description
 * # user
 * Service in the cmsApp.
 */
angular.module('cmsApp')
  .factory('User', function(organization) {
    return {
      info: function() {
        return {
          name: 'Rodrigo',
        };
      },
      organization: organization
    };
  });
