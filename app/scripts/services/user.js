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
  .factory('User', function(_, Organization) {

    return {
      info: function() {

        var organizations = _.map(Organization.list(), function(element){
          return Organization.get().org(element.id);
        });

        var result = {
          name: 'Rodrigo',
          organizations: organizations,
          repositories: []
        };

        return result;
      },
    };
  });
