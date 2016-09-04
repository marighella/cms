/* jshint camelcase: false */
'use strict';

angular.module('cmsApp')
  .factory('Resource', function() {

    return {
      github: '',
      connection: '',
      isProduction: false
    };
  });
