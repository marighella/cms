/* jshint camelcase: false */
'use strict';

/**
 * @ngdoc service
 * @name cmsApp.organization
 * @description
 * # organization
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('GithubOrganization', function ($q, _, Resource) {

    function listOrganizations(){
      var listOrgDeferred = $q.defer();
      var listOrgPromisse = listOrgDeferred.promise;
      var github = Resource.github;


      github.get('user/orgs').then(function(data){
        listOrgDeferred.resolve(data);
      });

      listOrgPromisse.then(function(listOrg){
        _.each(listOrg, function(element, index){
          var orgDeferred = $q.defer();
          var orgPromisse = orgDeferred.promise;

          github.get('orgs/'+element.login).then(function(data){
            orgDeferred.resolve(data);
          });

          orgPromisse.then(function(data){
            angular.extend(listOrg[index], data);
          });
        });


        return listOrg;
      });

      return listOrgPromisse;
    }

    return {
      list: function() {
        return listOrganizations();
      },
      get: function(){
        return {
          repositories: function(){
            return [];
          },
          org: function(id){
            return _.find([], function(element){
              return (element.id === id);
            });
          }
        };
      }
    };
  });
