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
        var userPromise = Github.user.getAuth();
        var organizationsPromisse = Github.organization.list();

        var result = {
          info: '',
          organizations: [],
          repositories: []
        };

        userPromise.then(function(value){
          result.info = value;
        });

        organizationsPromisse.then(function(value){
          result.organizations = value;
        });

        return result;
      }
    };
  });
