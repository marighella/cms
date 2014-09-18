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
  .factory('Github', function (GithubOrganization, GithubContent, GithubUser) {

    return {
      organization: GithubOrganization,
      content: GithubContent,
      user: GithubUser
    };
  });
