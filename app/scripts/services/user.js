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

    var filterByJekyllRepository = function(result, org){
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
    };

    return {
      info: function() {
        var userPromise = Github.user.getAuth();

        var result = {
          info: '',
          organizations: [],
          repositories: []
        };

        userPromise.then(function(user){
          result.info = user;
          var organizationsPromisse = Github.organization.list();
          organizationsPromisse.then(function(orgs){
            var orgMoreMe = _.union(orgs, [user]);
            _.each(orgMoreMe, function(org){
              filterByJekyllRepository(result, org);
            });
          });
        });


        return result;
      }
    };
  });
