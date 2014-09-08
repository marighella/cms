'use strict';

/**
 * @ngdoc service
 * @name cmsApp.Content
 * @description
 * # Content
 * Factory in the cmsApp.
 */
angular.module('cmsApp')
  .factory('GithubContent', function () {
    return {
      posts: function () {
        return [
          {
           sha: '#3456',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
        ];
      }
    };
  });
