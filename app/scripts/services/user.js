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
  .factory('User', function() {
    return {
      info: function() {
        return {
          name: 'Rodrigo',
        };
      },
      organizations: function() {
        return [{
          login: 'brasil-de-fato',
          id: 8516140,
          avatar_url: 'https://avatars.githubusercontent.com/u/8516140?v=2'
        },{
          login:'movimento-sem-terra',
          id: 7000646,
          avatar_url: 'https://avatars.githubusercontent.com/u/7000646?v=2'
        }];
      }
    };
  });
