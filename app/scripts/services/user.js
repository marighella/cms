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
          result.organizations = [];
          _.each(value, function(org){
            Github.organization.searchJekyllFiles(org)
            .then(function(searchResult){
              if(searchResult.total_count > 0){
                var repositories = [];
                _.each(searchResult.items, function(item){
                  repositories.push(item.repository.name);
                });

                org.repositories = _.uniq(repositories);

                result.organizations.push(org);
              }
            });
          });
        });

        return result;
      }
    };
  });
