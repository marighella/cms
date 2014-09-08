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
           sha: '#1',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#2',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#3',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#4',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#5',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#6',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#7',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
          {
           sha: '#8',
           name: '2014-10-10-opa.md',
           year: 2014,
           month: 10
          },
        ];
      }
    };
  });
