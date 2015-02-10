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

    function getOrganization(organization){
      var orgDeferred = $q.defer();
      var orgPromisse = orgDeferred.promise;
      var github = Resource.github;

      github.get('orgs/'+organization.login).then(function(data){
        return orgDeferred.resolve(data);
      });
      return orgPromisse;
    }

    function getRepository(organization, repositoryName){
      var orgDeferred = $q.defer();
      var orgPromisse = orgDeferred.promise;
      var github = Resource.github;

      github.get('repos/'+organization.login+'/'+repositoryName).then(function(data){
        return orgDeferred.resolve(data);
      });
      return orgPromisse;
    }

    function listRepositories(organization){
      var deferred = $q.defer();
      var promise = deferred.promise;
      var github = Resource.github;

      github.get('orgs/'+organization.login+'/repos').then(function(data){
        return deferred.resolve(data);
      });

      return promise;
    }

    function listOrganizations(){
      var listOrgDeferred = $q.defer();
      var listOrgPromisse = listOrgDeferred.promise;
      var github = Resource.github;


      github.get('user/orgs').then(function(data){
        listOrgDeferred.resolve(data);
      });

      listOrgPromisse.then(function(listOrg){
        _.each(listOrg, function(element, index){
          element.ready = false;
          var orgPromisse = getOrganization(element);

          orgPromisse.then(function(data){
            angular.extend(listOrg[index], data);
            element.ready = true;
          });
        });

        return listOrg;
      });

      return listOrgPromisse;
    }

    function jekyllFiles(organization) {
      var address = ['search/code?q=', '_config', '+in:path'].join('');
      var repo = ['+user:', organization.login].join('');
      var extension = ['+extension', 'yml'].join(':');
      var order = '&sort=updated&order=desc';

      var url = [address, extension, repo, order].join('');

      var orgDeferred = $q.defer();
      var orgPromisse = orgDeferred.promise;
      var github = Resource.github;

      github.get(url).then(function(data){
        return orgDeferred.resolve(data);
      });
      return orgPromisse;
    }

    return {
      list: function() {
        return listOrganizations();
      },
      get: function(organization){
        return {
          repositories: function(){
            return listRepositories(organization);
          },
          org: function(){
            return getOrganization(organization);
          },
          repository: function(repositoryName){
            return getRepository(organization, repositoryName);
          }
        };
      },
      searchJekyllFiles: jekyllFiles
    };
  });
