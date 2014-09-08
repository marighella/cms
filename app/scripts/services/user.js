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
  .factory('User', function(_, Github) {

    return {
      info: function() {

        var organizations = _.map(Github.organization.list(), function(element){
          return Github.organization.get().org(element.id);
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
